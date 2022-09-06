import { BufferStream } from "buffer-stream-js";
import { ServerboundPacket } from "../serverbound-packet";

export class PrepareMessagesSnapshotClientboundPacket extends ServerboundPacket {
  constructor(public messages: string[] = []) {
    super();
  }

  read(buffer: BufferStream): void {
    const length = buffer.readUInt();

    for (let i = 0; i < length; i++) {
      this.messages.push(buffer.readPackedUtf8String());
    }
  }

  write(buffer: BufferStream): void {
    buffer.writeUInt(this.messages.length);

    for (const message of this.messages) {
      buffer.writePackedUtf8String(message);
    }
  }
}
