import { BufferStream } from "buffer-stream-js";
import { ServerboundPacket } from "../serverbound-packet";

export class PrepareMessagesReadyServerboundPacket extends ServerboundPacket {
  read(buffer: BufferStream): void {}

  write(buffer: BufferStream): void {}
}
