import { PacketManager, Packet } from "@chat-o/common";
import { BufferStream } from "buffer-stream-js";
import { WebSocket } from "ws";

export type SocketClient = WsClient;

abstract class Client {
  constructor(readonly packetManager: PacketManager) {}
  sendPacket(packet: Packet): void {
    const packetId = this.packetManager.getPacketByType((packet as any).constructor);

    if (!packetId) {
      throw Error(`Unknow packet: ${packet}`);
    }

    this.sendPacket0(packetId, packet);
  }

  protected abstract sendPacket0(packetId: number, packet: Packet): void;
}

export class WsClient extends Client {
  constructor(readonly socket: WebSocket, packetManager: PacketManager) {
    super(packetManager);
  }

  sendPacket0(packetId: number, packet: Packet): void {
    const bufferStream = BufferStream.alloc(512);
    bufferStream.writeUInt8(packetId);
    packet.write(bufferStream);

    this.socket.send(bufferStream.getLeftBuffer(), { binary: true });
  }
}
