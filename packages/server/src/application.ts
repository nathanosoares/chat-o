import { CommonApplication, PacketManager } from "@chat-o/common";
import { Server } from "http";
import SendMessageListener from "./listeners/send-message-listener";

export default class Application extends CommonApplication {
  constructor(readonly server: Server, packetManger: PacketManager) {
    super(packetManger);
  }

  bootstrap() {
    super.bootstrap();

    this.packetManger.registerListener(new SendMessageListener());
  }
}
