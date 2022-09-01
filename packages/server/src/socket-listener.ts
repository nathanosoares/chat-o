import {
  ClientBoundPacket,
  SendMessageClientBoundPacket,
  ShakeScreenClientBoundPacket,
} from "@chat-o/common";
import { BufferStream } from "buffer-stream-js";
import { Socket } from "net";
import Mask from "./net/mask";
import Opcode from "./net/opcode";

const packets = new Map<number, { new (): ClientBoundPacket }>([
  [0x01, SendMessageClientBoundPacket],
  [0x02, ShakeScreenClientBoundPacket],
]);

export function socketListener(connectionUid: string, socket: Socket) {
  const firstByte = socket.read(1);
  if (!firstByte) return;

  const firstByteData = firstByte[0].toString(2).padStart(8, "0");
  const _fin = firstByteData[0];
  const _rsv1 = firstByteData[1];
  const _rsv2 = firstByteData[2];
  const _rsv3 = firstByteData[3];
  const opcode = parseInt(firstByteData.substring(4), 2);

  if (opcode != Opcode.BINARY_FRAME) return;

  const secondByte = socket.read(1);
  const secondByteData = secondByte[0].toString(2).padStart(8, "0");
  const mask = secondByteData[0];

  if (mask != Mask.MASKED) return;

  const dataLength = parseInt(secondByteData.substring(1), 2);

  let length;
  if (dataLength <= 125) length = dataLength;
  else if (dataLength == 126) length = socket.read(2).readUint16BE(0);
  else throw new Error("Invalid message length");

  if (length < 1) return;

  const maskKey = socket.read(4);

  const encodedPacketId = socket.read(1);

  const packetId = encodedPacketId[0] ^ maskKey[0 % 4];

  const packetClass = packets.get(packetId);

  if (!packetClass) return;

  const packet = new packetClass();

  const encodedData = socket.read(length - 1);

  if (encodedData) {
    const decoded = Buffer.from(encodedData);

    for (var i = 0; i < decoded.length; i++) {
      decoded[i] = decoded[i] ^ maskKey[(i + 1) % 4];
    }

    console.log(decoded.toString("utf-8"));
    
    packet.read(new BufferStream(decoded));
  }

  console.log(packet);
}
