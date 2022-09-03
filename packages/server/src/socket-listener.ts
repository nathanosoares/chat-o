import { PacketManager } from "@chat-o/common";
import { BufferStream } from "buffer-stream-js";
import { Socket } from "net";
import ClientConnection from "./net/client-connection";
import Mask from "./net/enum/mask";
import Opcode from "./net/enum/opcode";

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
  else throw new Error("Invalid input message length");

  return length;
}

export function socketListener(packetManager: PacketManager, connection: ClientConnection) {
  const opcode = extractOpcodeFromFrame(connection.socket);
  if (opcode != Opcode.BINARY_FRAME) return;

  const length = extractDataLengthFromFrame(connection.socket);
  if (length < 1) return;

  const maskKey = connection.socket.read(4);

  const packetId = connection.socket.read(1)[0] ^ maskKey[0 % 4];
  const packetClass = packetManager.getPacketById(packetId);
  if (!packetClass) return;

  const packet = new packetClass();

  const encodedData = connection.socket.read(length - 1);
  if (encodedData) {
    const decoded = Buffer.from(encodedData);
    for (var i = 0; i < decoded.length; i++) {
      decoded[i] = decoded[i] ^ maskKey[(i + 1) % 4];
    }
    packet.read(new BufferStream(decoded));
  }

  connection.queuePacket(packet);
}
