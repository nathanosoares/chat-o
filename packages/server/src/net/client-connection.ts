import { Connection, ConnectionState, ConnectionStateClientboundPacket, Packet } from "@chat-o/common";
import { BufferStream } from "buffer-stream-js";
import { Socket } from "net";
import Application from "../application";
import ClientPacketListener from "./client-packet-listener";
import Opcode from "./enum/opcode";

export default class ClientConnection extends Connection {
  private listeners: Map<any, Object> = new Map();

  private _state: ConnectionState = ConnectionState.DISCONNECTED;

  username: string | undefined;

  constructor(readonly uid: string, readonly socket: Socket, application: Application) {
    super(application);
  }

  sendPacket(packet: Packet) {
    const packetId = this.application.packetManger.getPacketByType((packet as any).constructor);

    if (!packetId) {
      throw Error(`Unknow packet: ${packet}`);
    }

    const bufferStream = BufferStream.alloc(512);
    bufferStream.writeUInt8(packetId);
    packet.write(bufferStream);

    const buffer = bufferStream.getLeftBuffer();
    const bufferSize = buffer.length;
    
    let frame: Buffer;
    const firstByte = 0x80 | Opcode.BINARY_FRAME;
    if (bufferSize <= 125) {
      const bytes = [firstByte];
      frame = Buffer.from(bytes.concat(bufferSize));
    } else if (bufferSize <= 2 ** 16) {
      const offsetFourBytes = 4;
      const target = Buffer.allocUnsafe(offsetFourBytes);
      target[0] = firstByte;
      target[1] = 126 | 0x0;
      target.writeUint16BE(bufferSize, 2);
      frame = target;
    } else throw new Error("Invalid output message length");

    this.socket.write(Buffer.concat([frame, buffer], frame.byteLength + bufferSize));
  }

  queuePacket(packet: Packet) {
    for (const listener of this.listeners.values()) {
      for (const methodName of Reflect.ownKeys(Object.getPrototypeOf(listener))) {
        const handler = Reflect.getMetadata("packet_handler", listener, methodName);

        if (packet.constructor === handler) {
          (listener as any)[methodName](packet);
        }
      }
    }
  }

  registerListener(listener: ClientPacketListener) {
    this.unregisterLister(listener);
    this.listeners.set(listener.constructor, listener);
  }

  unregisterLister(listener: ClientPacketListener) {
    this.listeners.delete(listener.constructor);
  }

  setState(state: ConnectionState) {
    this._state = state;
    this.sendPacket(new ConnectionStateClientboundPacket(this._state));
  }

  getState(): ConnectionState {
    return this._state;
  }
}
