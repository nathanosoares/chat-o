import {
  PacketHandler,
  PrepareMessagesFinishClientboundPacket,
  PrepareMessagesReadyServerboundPacket,
  PrepareMessagesRequestServerboundPacket,
  PrepareMessagesSnapshotClientboundPacket,
  TextMessage,
} from "@chat-o/common";
import { ConnectionState } from "@chat-o/common";
import ClientPacketListener from "../client-packet-listener";

export default class PreparingMessagesListener extends ClientPacketListener {
  @PacketHandler()
  onRequest(packet: PrepareMessagesRequestServerboundPacket) {
    if (this.connection.getState() != ConnectionState.PREPARING_MESSAGES) {
      return;
    }

    const messages: TextMessage[] = [];
    for (let i = 0; i < 3; i++) {
      messages.push({
        sender: "ca27b390-bad7-4855-8f11-257272338966",
        type: "text",
        body: `${i} - Duis elit excepteur laboris amet esse in id sit non deserunt nostrud.`,
      });
    }

    for (let i = 0; i < 4; i++) {
      messages.push({
        sender: "9e687cb5-ff28-4051-a209-793b6295dbb6",
        type: "text",
        body: `${i} - Duis elit excepteur laboris amet esse in id sit non deserunt nostrud.`,
      });
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
