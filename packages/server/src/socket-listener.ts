import { PacketManager } from "@chat-o/common";
import { BufferStream } from "buffer-stream-js";
import { Socket } from "net";
import Mask from "./net/mask";
import Opcode from "./net/opcode";

function extractOpcodeFromFrame(socket: Socket): number | null {
  const byte = socket.read(1);
  if (!byte) return null;

  return parseInt(byte[0].toString(2).padStart(8, "0").substring(4), 2);
}

function extractDataLengthFromFrame(socket: Socket): number | never {
  const byte = socket.read(1);
  if (!byte) throw Error("Invalid frame");

  const binary = byte[0].toString(2).padStart(8, "0");

  const mask = binary[0];

  if (mask != Mask.MASKED) throw Error("Invalid mask");

  const dataLength = parseInt(binary.substring(1), 2);

  let length;
  if (dataLength <= 125) length = dataLength;
  else if (dataLength == 126) length = socket.read(2).readUint16BE(0);
  else throw new Error("Invalid message length");

  return length;
}

export function socketListener(
  packetManager: PacketManager,
  connectionUid: string,
  socket: Socket
) {
  const opcode = extractOpcodeFromFrame(socket);
  if (opcode != Opcode.BINARY_FRAME) return;

  const length = extractDataLengthFromFrame(socket);
  if (length < 1) return;

  const maskKey = socket.read(4);

  const packetId = socket.read(1)[0] ^ maskKey[0 % 4];
  const packetClass = packetManager.getPacket(packetId);
  if (!packetClass) return;

  const packet = new packetClass();

  const encodedData = socket.read(length - 1);
  if (encodedData) {
    const decoded = Buffer.from(encodedData);
    for (var i = 0; i < decoded.length; i++) {
      decoded[i] = decoded[i] ^ maskKey[(i + 1) % 4];
    }
    packet.read(new BufferStream(decoded));
  }

  packetManager.dispatchClientBoundPacket(connectionUid, packet);
}
