import { BufferStream } from "buffer-stream-js";
import { ClientBoundPacket } from "../client-bound-packet";

export class SendMessageClientBoundPacket extends ClientBoundPacket {
  private _targetUid: string = "";
  private _text: string = "";

  constructor(targetUid?: string, text?: string) {
    super();

    this._targetUid = targetUid || "";
    this._text = text || "";
  }

  get targetUid(): string {
    return this._targetUid;
  }

  get text(): string {
    return this._text;
  }

  read(buffer: BufferStream): void {
    this._targetUid = buffer.readPackedUtf8String();
    this._text = buffer.readPackedUtf8String();
  }

  write(buffer: BufferStream): void {
    buffer.writePackedUtf8String(this._targetUid);
    buffer.writePackedUtf8String(this._text);
  }
}
