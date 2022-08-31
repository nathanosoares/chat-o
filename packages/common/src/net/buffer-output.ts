export abstract class BufferOutput {
  abstract writeString(value: string): void;

  abstract writeSafeInteger(value: number): void;
}
