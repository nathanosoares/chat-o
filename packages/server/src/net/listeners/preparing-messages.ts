import {
  PacketHandler,
  PrepareMessagesFinishClientboundPacket,
  PrepareMessagesReadyServerboundPacket,
  PrepareMessagesRequestServerboundPacket,
} from "@chat-o/common";
import { ConnectionState } from "@chat-o/common";
import ClientPacketListener from "../client-packet-listener";

export default class PreparingMessagesListener extends ClientPacketListener {
  @PacketHandler()
  onRequest(packet: PrepareMessagesRequestServerboundPacket) {
    if (this.connection.getState() != ConnectionState.PREPARING_MESSAGES) {
      return;
    }

    // todo enviar mensagens

    this.connection.sendPacket(new PrepareMessagesFinishClientboundPacket());
  }

  @PacketHandler()
  onReady(packet: PrepareMessagesReadyServerboundPacket) {
    if (this.connection.getState() != ConnectionState.PREPARING_MESSAGES) {
      return;
    }

    this.connection.setState(ConnectionState.IN_CHAT);
  }
}
