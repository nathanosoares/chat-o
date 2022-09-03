import { BufferStream } from "buffer-stream-js";
import { ServerboundPacket } from "../serverbound-packet";

export class PrepareMessagesFinishClientboundPacket extends ServerboundPacket {
  read(buffer: BufferStream): void {}

  write(buffer: BufferStream): void {
    buffer.writePackedUtf8String("false");
  }
}
