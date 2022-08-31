// reference: https://stackoverflow.com/a/45289808
export function toBinary(value: number) {
  if (!Number.isSafeInteger(value)) {
    throw new TypeError("value must be a safe integer");
  }

  const negative = value < 0;
  const twosComplement = negative ? Number.MAX_SAFE_INTEGER + value + 1 : value;
  const signExtend = negative ? "1" : "0";

  return twosComplement.toString(2).padStart(53, "0").padStart(64, signExtend);
}
