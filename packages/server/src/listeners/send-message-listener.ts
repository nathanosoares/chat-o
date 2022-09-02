import {
  ClientBoundPacketHandler,
  SendMessageClientBoundPacket,
  ShakeScreenClientBoundPacket,
} from "@chat-o/common";

export default class SendMessageListener {
  @ClientBoundPacketHandler()
  onMessage(connectionUid: string, packet: SendMessageClientBoundPacket) {
    console.log("connectionUid", connectionUid);
    console.log("packet", packet);
  }
}
