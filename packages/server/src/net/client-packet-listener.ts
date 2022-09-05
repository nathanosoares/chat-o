import { PacketListener } from "@chat-o/common";
import ServerApplication from "../server-application";
import ClientConnection from "./client-connection";

export default class ClientPacketListener extends PacketListener<ServerApplication, ClientConnection> {}
