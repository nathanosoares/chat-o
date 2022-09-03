import {
  ConnectionState,
  ConnectionStateClientboundPacket,
  LoginServerboundPacket,
  PacketHandler,
  PacketListener,
  PrepareMessagesRequestServerboundPacket,
} from "@chat-o/common";
import ServerConnection from "../server-connection";
import PrepareMessagesListener from "./prepare-messages-listener";

export default class ConnectionStateListener extends PacketListener<ServerConnection> {
  @PacketHandler(ConnectionStateClientboundPacket)
  on(packet: ConnectionStateClientboundPacket) {
    if (packet.state == undefined) {
      return;
    }

    this.connection.setState(packet.state);

    switch (this.connection.getState()) {
      case ConnectionState.HANDSHAKE: {
        this.connection.sendPacket(new LoginServerboundPacket());
        break;
      }
      case ConnectionState.PREPARING_MESSAGES: {
        this.connection.registerListener(
          new PrepareMessagesListener(this.connection)
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
