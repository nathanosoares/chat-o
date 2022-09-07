import { BufferStream } from "buffer-stream-js";
import { Message } from "../../../../dtos";
import { ServerboundPacket } from "../serverbound-packet";

export class PrepareMessagesSnapshotClientboundPacket extends ServerboundPacket {
  constructor(public messages: Message[] = []) {
    super();
  }

  read(buffer: BufferStream): void {
    const length = buffer.readUInt();

    for (let i = 0; i < length; i++) {
      const type = buffer.readPackedUtf8String();

      switch (type) {
        case "text":
          this.messages.push({
            type: type,
            sender: buffer.readPackedUtf8String(),
            body: buffer.readPackedUtf8String(),
          });
          break;
      }
    }
  }

  write(buffer: BufferStream): void {
    buffer.writeUInt(this.messages.length);

    for (const message of this.messages) {
      buffer.writePackedUtf8String(message.type);

      switch (message.type) {
        case "text":
          buffer.writePackedUtf8String(message.sender);
          buffer.writePackedUtf8String(message.body);
          break;
      }
    }
  }
}
