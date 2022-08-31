import { Packet } from "../packet";

export abstract class ClientBoundPacket extends Packet {
  constructor(readonly clientId: string) {
    super();
  }
}
