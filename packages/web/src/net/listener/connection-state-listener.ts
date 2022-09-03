import {
  ConnectionStateServerboundPacket,
  PacketHandler,
  PacketListener,
} from "@chat-o/common";
import ServerConnection from "../server-connection";

export default class ConnectionStateListener extends PacketListener<ServerConnection> {
  @PacketHandler(ConnectionStateServerboundPacket)
  on(packet: ConnectionStateServerboundPacket) {
    console.log('ConnectionStateServerboundPacket');
    
  }
}
