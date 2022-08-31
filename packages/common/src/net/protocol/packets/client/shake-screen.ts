import { BufferOutput } from "../../../buffer-output";
import { BufferInput } from "../../../buffer-input";
import { ClientBoundPacket } from "../client-bound-packet";

export class ShakeScreenClientBoundPacket extends ClientBoundPacket {
  private _targetUid: string = "";

  constructor(readonly clientId: string, targetId?: string) {
    super(clientId);

    this._targetUid = targetId || "";
  }

  read(buffer: BufferInput): void {
    this._targetUid = buffer.readString() || "";
  }

  write(buffer: BufferOutput): void {
    buffer.writeString(this._targetUid);
  }
}
