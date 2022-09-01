import { BufferStream } from "buffer-stream-js";

export abstract class Packet {
  abstract read(buffer: BufferStream): void;

  abstract write(buffer: BufferStream): void;
}
