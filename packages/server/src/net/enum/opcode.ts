enum Opcode {
  CONTINUATION_FRAME = 0x0,
  TEXT_FRAME = 0x1,
  BINARY_FRAME = 0x2,
  CONNECTION_CLOSE = 0x8,
  PING = 0x9,
  PONG = 0xa,
}

export default Opcode;
