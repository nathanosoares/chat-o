import { BufferStream } from "buffer-stream-js";
import { ServerboundPacket } from "../serverbound-packet";

export class PrepareMessagesRequestServerboundPacket extends ServerboundPacket {
  read(buffer: BufferStream): void {}

  write(buffer: BufferStream): void {}
}
