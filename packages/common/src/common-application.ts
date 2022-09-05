import {
  ConnectionStateClientboundPacket,
  HandshakeServerboundPacket,
  LoginResponseClientboundPacket,
  LoginServerboundPacket,
  PacketManager,
  PrepareMessagesFinishClientboundPacket,
  PrepareMessagesReadyServerboundPacket,
  PrepareMessagesRequestServerboundPacket,
  PrepareMessagesSnapshotClientboundPacket,
} from "./net";

export class CommonApplication {
  constructor(readonly packetManager: PacketManager) {}

  bootstrap() {
    this.packetManager.registerPacket(0x01, HandshakeServerboundPacket);
    this.packetManager.registerPacket(0x02, LoginServerboundPacket);
    this.packetManager.registerPacket(0x03, PrepareMessagesRequestServerboundPacket);
    this.packetManager.registerPacket(0x04, PrepareMessagesReadyServerboundPacket);

    
    this.packetManager.registerPacket(0x80, LoginResponseClientboundPacket);
    this.packetManager.registerPacket(0x81, PrepareMessagesSnapshotClientboundPacket);
    this.packetManager.registerPacket(0x82, PrepareMessagesFinishClientboundPacket);
    this.packetManager.registerPacket(0x83, ConnectionStateClientboundPacket);
  }
}
