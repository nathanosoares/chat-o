import { BufferStream } from "buffer-stream-js";
import { ConnectionState } from "../../../connection-state";
import { ServerboundPacket } from "../serverbound-packet";

export class ConnectionStateServerboundPacket extends ServerboundPacket {
  state: ConnectionState | undefined;

  constructor(state?: ConnectionState) {
    super();
    this.state = state;
  }

  read(buffer: BufferStream): void {
    this.state = buffer.readUInt8();
  }

  write(buffer: BufferStream): void {
    if (this.state) {
      buffer.writeUInt8(this.state);
    }
  }
}
