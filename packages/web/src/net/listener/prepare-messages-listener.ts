import {
  PacketHandler,
  PacketListener,
  PrepareMessagesFinishClientboundPacket,
  PrepareMessagesReadyServerboundPacket,
  PrepareMessagesSnapshotClientboundPacket,
} from "@chat-o/common";
import ServerConnection from "../server-connection";

export default class PrepareMessagesListener extends PacketListener<ServerConnection> {
  @PacketHandler(PrepareMessagesFinishClientboundPacket)
  onSnapshot(packet: PrepareMessagesSnapshotClientboundPacket) {
  }

  @PacketHandler(PrepareMessagesFinishClientboundPacket)
  onFinish(packet: PrepareMessagesFinishClientboundPacket) {
    this.connection.unregisterLister(this);
    this.connection.sendPacket(new PrepareMessagesReadyServerboundPacket());
  }
}
