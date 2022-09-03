import { BufferStream } from "buffer-stream-js";
import { ServerboundPacket } from "../serverbound-packet";

export class LoginResponseClientboundPacket extends ServerboundPacket {
  uid: string | undefined;

  constructor(uid?: string) {
    super();
    this.uid = uid;
  }

  read(buffer: BufferStream): void {
    this.uid = buffer.readPackedUtf8String();
  }

  write(buffer: BufferStream): void {
    if (this.uid) {
      buffer.writePackedUtf8String(this.uid);
    }
  }
}
