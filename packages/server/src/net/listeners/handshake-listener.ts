import { ConnectionState, HandshakeServerboundPacket, PacketHandler } from "@chat-o/common";
import ClientPacketListener from "../client-packet-listener";

export default class HandshakeListener extends ClientPacketListener {
  @PacketHandler()
  on(packet: HandshakeServerboundPacket) {
    if (this.connection.getState() != ConnectionState.DISCONNECTED) {
      return;
    }

    this.connection.unregisterLister(this);

    this.connection.setState(ConnectionState.HANDSHAKE);
  }
}
