import { BufferInput } from "@chat-o/common";

export default class ServerBufferInput extends BufferInput {
  constructor(readonly buffer: Buffer) {
    super();
  }

  readString(): string | null {
    const size = this.buffer.readUInt8();

    if (size == 0) return "";

    if (size > 0) {
      const codes = new Array<number>(size);
      for (let i = 0; i < size; i++) {
        codes.push(this.buffer.readUInt8());
      }
      return String.fromCharCode(...codes);
    }

    return null;
  }

  readNumber(): number {
    return this.buffer.readInt16BE();
  }
}
