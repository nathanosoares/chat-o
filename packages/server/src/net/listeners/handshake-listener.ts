import { ConnectionState, HandshakeServerboundPacket, PacketHandler } from "@chat-o/common";
import ClientPacketListener from "../client-packet-listener";
import LoginListener from "./login-listener";

export default class HandshakeListener extends ClientPacketListener {
  @PacketHandler()
  on(packet: HandshakeServerboundPacket) {
    if (this.connection.getState() != ConnectionState.DISCONNECTED) {
      return;
    }

    this.connection.unregisterLister(this);
    this.connection.registerListener(new LoginListener(this.connection));

    this.connection.setState(ConnectionState.HANDSHAKE);
  }
}
