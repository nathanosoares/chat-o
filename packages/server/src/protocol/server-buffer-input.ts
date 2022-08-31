import { BufferInput } from "@chat-o/common";

export default class ServerBufferInput extends BufferInput {
  private index = 0;
  constructor(readonly buffer: Buffer) {
    super();
  }

  readString(): string | null {
    const size = this.readSafeInteger();

    if (size == 0) return "";
    if (size > 0) {
      const buffer = this.buffer.subarray(this.index, this.index + size);
      this.index += size;
      return buffer.toString("utf-8");
    }

    return null;
  }

  readSafeInteger(): number {
    const buffer = this.buffer.subarray(this.index, this.index + 64);
    this.index += 64;

    return parseInt(buffer.toString("utf-8"), 2);
  }
}
