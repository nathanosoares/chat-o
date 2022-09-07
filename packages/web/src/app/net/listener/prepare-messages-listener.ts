import {
  PacketHandler,
  PrepareMessagesFinishClientboundPacket,
  PrepareMessagesReadyServerboundPacket,
  PrepareMessagesSnapshotClientboundPacket,
} from "@chat-o/common";
import ServerPacketListener from "../server-packet-listener";

export default class PrepareMessagesListener extends ServerPacketListener {
  @PacketHandler(PrepareMessagesSnapshotClientboundPacket)
  onSnapshot(packet: PrepareMessagesSnapshotClientboundPacket) {
    this.application.addMessages(...packet.messages);
  }

  @PacketHandler(PrepareMessagesFinishClientboundPacket)
  onFinish(packet: PrepareMessagesFinishClientboundPacket) {
    this.connection.unregisterLister(this);
    this.connection.sendPacket(new PrepareMessagesReadyServerboundPacket());
  }
}
