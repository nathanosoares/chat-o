import { Packet } from "../packet";

export abstract class ServerBoundPacket extends Packet {
  constructor() {
    super();
  }
}
