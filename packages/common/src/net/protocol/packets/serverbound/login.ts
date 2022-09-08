import { BufferStream } from "buffer-stream-js";
import { ServerboundPacket } from "../serverbound-packet";

export class LoginServerboundPacket extends ServerboundPacket {
  constructor(public username: string) {
    super();
  }

  read(buffer: BufferStream): void {
    this.username = buffer.readPackedUtf8String();
  }

  write(buffer: BufferStream): void {
    buffer.writePackedUtf8String(this.username);
  }
}
