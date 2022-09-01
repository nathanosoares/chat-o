import { ClientBoundPacket } from "../client-bound-packet";
import { BufferStream } from "buffer-stream-js";

export class ShakeScreenClientBoundPacket extends ClientBoundPacket {
  private _targetUid: string = "";

  constructor(targetId?: string) {
    super();

    this._targetUid = targetId || "";
  }

  read(buffer: BufferStream): void {
    this._targetUid = buffer.readUtf8String(36);
  }

  write(buffer: BufferStream): void {
    buffer.writeUtf8String(this._targetUid);
  }
}
