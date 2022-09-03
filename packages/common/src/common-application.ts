import {
  ConnectionStateServerboundPacket,
  HandshakeServerboundPacket,
  LoginServerboundPacket,
  PacketManager,
  PrepareMessagesFinishPacket,
  PrepareMessagesReadyPacket,
  PrepareMessagesRequestPacket,
  PrepareMessagesSnapshotPacket,
} from "./net";

export class CommonApplication {
  constructor(readonly packetManger: PacketManager) {}

  bootstrap() {
    this.packetManger.registerPacket(0x01, HandshakeServerboundPacket);
    this.packetManger.registerPacket(0x02, LoginServerboundPacket);
    this.packetManger.registerPacket(0x03, PrepareMessagesRequestPacket);
    this.packetManger.registerPacket(0x04, PrepareMessagesReadyPacket);
    this.packetManger.registerPacket(0x05, ConnectionStateServerboundPacket);

    this.packetManger.registerPacket(0x80, LoginServerboundPacket);
    this.packetManger.registerPacket(0x81, PrepareMessagesSnapshotPacket);
    this.packetManger.registerPacket(0x82, PrepareMessagesFinishPacket);
  }
}
