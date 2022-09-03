import { BufferStream } from "buffer-stream-js";
import { ServerboundPacket } from "../serverbound-packet";

export class LoginServerboundPacket extends ServerboundPacket {
  username: string | undefined;

  read(buffer: BufferStream): void {
    this.username = buffer.readPackedUtf8String();
  }

  write(buffer: BufferStream): void {
    if (this.username) {
      buffer.writePackedUtf8String(this.username);
    }
  }
}
