import { PacketListener } from "@chat-o/common";
import ClientConnection from "./client-connection";

export default class ClientPacketListener extends PacketListener<ClientConnection> {}
