import {
  PacketHandler,
  PacketListener,
  PrepareMessagesFinishClientboundPacket,
  PrepareMessagesReadyServerboundPacket,
  PrepareMessagesSnapshotClientboundPacket,
} from "@chat-o/common";
import ServerPacketListener from "../server-packet-listener";

export default class PrepareMessagesListener extends ServerPacketListener {
  @PacketHandler(PrepareMessagesFinishClientboundPacket)
  onSnapshot(packet: PrepareMessagesSnapshotClientboundPacket) {}

  @PacketHandler(PrepareMessagesFinishClientboundPacket)
  onFinish(packet: PrepareMessagesFinishClientboundPacket) {
    this.connection.unregisterLister(this);
    this.connection.sendPacket(new PrepareMessagesReadyServerboundPacket());
  }
}
