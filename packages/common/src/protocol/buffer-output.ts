export abstract class BufferOutput {
  abstract writeString(value: string): void;

  abstract writeNumber(value: number): void;
}
