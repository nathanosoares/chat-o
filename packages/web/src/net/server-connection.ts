import {
  CommonApplication,
  Connection,
  ConnectionState,
  HandshakeServerboundPacket,
  Packet,
  PacketListener,
} from "@chat-o/common";
import { BufferStream } from "buffer-stream-js";
// import ServerPacketListener from "./server-packet-listener";

export default class ServerConnection extends Connection {
  private listeners: Map<any, Object> = new Map();

  private _state: ConnectionState = ConnectionState.DISCONNECTED;

  constructor(readonly socket: WebSocket, application: CommonApplication) {
    super(application);
  }

  sendPacket(packet: Packet): void {
    const packetId = this.application.packetManger.getPacketByType(
      (packet as any).constructor
    );

    if (!packetId) {
      throw Error(`Unknow packet: ${packet}`);
    }

    const buffer = BufferStream.alloc(512);
    buffer.writeUInt8(packetId);
    packet.write(buffer);
    this.socket.send(buffer.getLeftBuffer());
  }

  queuePacket(packet: Packet) {
    // for (const listener of this.listeners.values()) {
    //   for (const methodName of Reflect.ownKeys(
    //     Object.getPrototypeOf(listener)
    //   )) {
    //     const handler = Reflect.getMetadata(
    //       "packet_handler",
    //       listener,
    //       methodName
    //     );
    //     if (packet.constructor === handler) {
    //       (listener as any)[methodName](packet);
    //     }
    //   }
    // }
  }

  registerListener(listener: PacketListener<any>) {
    this.unregisterLister(listener);
    this.listeners.set(listener.constructor, listener);
  }

  unregisterLister(listener: PacketListener<any>) {
    this.listeners.delete(listener.constructor);
  }

  setState(state: ConnectionState) {
    this._state = state;
  }

  getState(): ConnectionState {
    return this._state;
  }
}
