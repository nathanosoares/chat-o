import { LoginResponseClientboundPacket, PacketHandler } from "@chat-o/common";
import ServerPacketListener from "../server-packet-listener";

export default class LoginListener extends ServerPacketListener {
  @PacketHandler(LoginResponseClientboundPacket)
  on(packet: LoginResponseClientboundPacket) {
    
  }
}
