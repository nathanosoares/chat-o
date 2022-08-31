export abstract class BufferInput {
  abstract readString(): string | null;

  abstract readNumber(): number;
}
