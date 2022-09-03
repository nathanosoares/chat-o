import {
  ConnectionStateClientboundPacket,
  HandshakeServerboundPacket,
  LoginServerboundPacket,
  PacketManager,
  PrepareMessagesFinishClientboundPacket,
  PrepareMessagesReadyServerboundPacket,
  PrepareMessagesRequestServerboundPacket,
  PrepareMessagesSnapshotClientboundPacket,
} from "./net";

export class CommonApplication {
  constructor(readonly packetManger: PacketManager) {}

  bootstrap() {
    this.packetManger.registerPacket(0x01, HandshakeServerboundPacket);
    this.packetManger.registerPacket(0x02, LoginServerboundPacket);
    this.packetManger.registerPacket(0x03, PrepareMessagesRequestServerboundPacket);
    this.packetManger.registerPacket(0x04, PrepareMessagesReadyServerboundPacket);
    this.packetManger.registerPacket(0x05, ConnectionStateClientboundPacket);

    this.packetManger.registerPacket(0x80, LoginServerboundPacket);
    this.packetManger.registerPacket(0x81, PrepareMessagesSnapshotClientboundPacket);
    this.packetManger.registerPacket(0x82, PrepareMessagesFinishClientboundPacket);
  }
}
