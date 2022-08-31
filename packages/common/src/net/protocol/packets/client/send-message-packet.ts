
import { BufferInput } from "../../../buffer-input";
import { BufferOutput } from "../../../buffer-output";
import { ClientBoundPacket } from "../client-bound-packet";

export class SendMessageClientBoundPacket extends ClientBoundPacket {
  private _targetUid: string = "";
  private _text: string = "";

  constructor(readonly clientId: string, targetUid?: string, text?: string) {
    super(clientId);

    this._targetUid = targetUid || "";
    this._text = text || "";
  }

  get targetUid(): string {
    return this._targetUid;
  }

  get text(): string {
    return this._text;
  }

  read(buffer: BufferInput): void {
    this._targetUid = buffer.readString() || "";
    this._text = buffer.readString() || "";
  }

  write(buffer: BufferOutput): void {
    buffer.writeString(this._targetUid);
    buffer.writeString(this._text);
  }
}
