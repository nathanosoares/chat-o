import { CommonApplication, PacketManager } from "@chat-o/common";
import { Server } from "http";

export default class Application extends CommonApplication {
  constructor(readonly server: Server, packetManger: PacketManager) {
    super(packetManger);
  }
}
