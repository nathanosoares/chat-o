import {
  PacketManager,
  SendMessageClientBoundPacket,
  ShakeScreenClientBoundPacket,
} from "./net";

export abstract class CommonApplication {
  constructor(readonly packetManger: PacketManager) {}

  bootstrap() {
    this.packetManger.registerPacket(0x1, SendMessageClientBoundPacket);
    this.packetManger.registerPacket(0x2, ShakeScreenClientBoundPacket);
  }
}
