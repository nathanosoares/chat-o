export abstract class BufferInput {
  abstract readString(): string | null;

  abstract readSafeInteger(): number;
}
