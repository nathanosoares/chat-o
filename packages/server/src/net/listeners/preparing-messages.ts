import {
  PacketHandler,
  PrepareMessagesFinishPacket,
  PrepareMessagesReadyPacket,
  PrepareMessagesRequestPacket,
} from "@chat-o/common";
import { ConnectionState } from "@chat-o/common";
import ClientPacketListener from "../client-packet-listener";

export default class PreparingMessagesListener extends ClientPacketListener {
  @PacketHandler()
  onRequest(packet: PrepareMessagesRequestPacket) {
    if (this.connection.getState() != ConnectionState.PREPARING_MESSAGES) {
      return;
    }

    // todo enviar mensagens

    this.connection.sendPacket(new PrepareMessagesFinishPacket());
  }

  @PacketHandler()
  onReady(packet: PrepareMessagesReadyPacket) {
    if (this.connection.getState() != ConnectionState.PREPARING_MESSAGES) {
      return;
    }

    this.connection.setState(ConnectionState.IN_CHAT);
  }
}
