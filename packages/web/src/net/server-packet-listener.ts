import { CommonApplication, PacketListener } from "@chat-o/common";
import ServerConnection from './server-connection';

export default class ServerPacketListener extends PacketListener<CommonApplication, ServerConnection> {}
