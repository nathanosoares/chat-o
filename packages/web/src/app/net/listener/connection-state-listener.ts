import {
  ConnectionState,
  ConnectionStateClientboundPacket,
  LoginServerboundPacket,
  PacketHandler,
  PrepareMessagesRequestServerboundPacket,
} from "@chat-o/common";
import PrepareMessagesListener from "./prepare-messages-listener";
import ServerPacketListener from "../server-packet-listener";

export default class ConnectionStateListener extends ServerPacketListener {
  @PacketHandler(ConnectionStateClientboundPacket)
  on(packet: ConnectionStateClientboundPacket) {
    if (packet.state == undefined) {
      return;
    }

    this.connection.setState(packet.state);

    switch (this.connection.getState()) {
      case ConnectionState.HANDSHAKE: {
        this.connection.sendPacket(new LoginServerboundPacket("username"));
        break;
      }
      case ConnectionState.PREPARING_MESSAGES: {
        this.connection.registerListener(
          new PrepareMessagesListener(this.application, this.connection)
        );
        this.connection.sendPacket(
          new PrepareMessagesRequestServerboundPacket()
        );
        break;
      }
      case ConnectionState.IN_CHAT: {
        console.log("Uhuu!");
        break;
      }
    }
  }
}
