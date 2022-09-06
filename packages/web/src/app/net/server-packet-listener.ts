import { PacketListener } from "@chat-o/common";
import WebApplication from "../web-application";
import ServerConnection from "./server-connection";

export default class ServerPacketListener extends PacketListener<
  WebApplication,
  ServerConnection
> {}
