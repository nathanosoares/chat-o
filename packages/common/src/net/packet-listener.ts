import { CommonApplication } from "../common-application";
import { Connection } from "./connection";

export abstract class PacketListener<
  A extends CommonApplication,
  C extends Connection
> {
  constructor(readonly application: A, readonly connection: C) {}
}
