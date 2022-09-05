import { CommonApplication } from "../common-application";
import { ConnectionState } from "./connection-state";
import { PacketListener } from "./packet-listener";
import { Packet } from "./protocol/packet";

export abstract class Connection {
  constructor(readonly application: CommonApplication) {}

  abstract setState(state: ConnectionState): void;

  abstract getState(): ConnectionState;

  abstract sendPacket(packet: Packet): void;

  abstract queuePacket(packet: Packet): void;

  abstract registerListener<T extends PacketListener<any, any>>(listener: T): void;

  abstract unregisterLister(listener: PacketListener<any, any>): void;
}
