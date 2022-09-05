import { BufferStream } from "buffer-stream-js";
import { ServerboundPacket } from "../serverbound-packet";

export class LoginResponseClientboundPacket extends ServerboundPacket {
  uid: string;
  name: string;

  constructor(uid?: string, name?: string) {
    super();
    this.uid = uid || "";
    this.name = name || "";
  }

  read(buffer: BufferStream): void {
    this.uid = buffer.readPackedUtf8String();
    this.name = buffer.readPackedUtf8String();
  }

  write(buffer: BufferStream): void {
    buffer.writePackedUtf8String(this.uid);
    buffer.writePackedUtf8String(this.name);
  }
}
