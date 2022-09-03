import { Connection } from "./connection";

export abstract class PacketListener<T extends Connection> {
  constructor(readonly connection: T) {}
}
