import { BufferOutput } from "../buffer-output";
import { BufferInput } from "../buffer-input";

export abstract class Packet {
  abstract read(buffer: BufferInput): void;

  abstract write(buffer: BufferOutput): void;
}
