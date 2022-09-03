import { ConnectionState, LoginServerboundPacket, PacketHandler, PacketListener } from "@chat-o/common";
import ClientPacketListener from "../client-packet-listener";
import PreparingMessagesListener from "./preparing-messages";

export default class LoginListener extends ClientPacketListener {
  @PacketHandler()
  on(packet: LoginServerboundPacket) {
    if (this.connection.getState() != ConnectionState.HANDSHAKE) {
      return;
    }

    this.connection.username = packet.username;

    this.connection.unregisterLister(this);
    this.connection.registerListener(new PreparingMessagesListener(this.connection));

    this.connection.setState(ConnectionState.PREPARING_MESSAGES);
  }
}
