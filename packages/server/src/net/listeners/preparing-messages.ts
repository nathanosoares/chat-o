import {
  PacketHandler,
  PrepareMessagesFinishClientboundPacket,
  PrepareMessagesReadyServerboundPacket,
  PrepareMessagesRequestServerboundPacket,
  PrepareMessagesSnapshotClientboundPacket,
} from "@chat-o/common";
import { ConnectionState } from "@chat-o/common";
import ClientPacketListener from "../client-packet-listener";

export default class PreparingMessagesListener extends ClientPacketListener {
  @PacketHandler()
  onRequest(packet: PrepareMessagesRequestServerboundPacket) {
    if (this.connection.getState() != ConnectionState.PREPARING_MESSAGES) {
      return;
    }

    const messages = [];
    for (let i = 0; i < 10; i++) {
      messages.push(`${i} - Duis elit excepteur laboris amet esse in id sit non deserunt nostrud.`);
    }

    this.connection.sendPacket(new PrepareMessagesSnapshotClientboundPacket(messages));

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
