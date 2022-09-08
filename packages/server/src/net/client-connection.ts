import { Connection, ConnectionState, ConnectionStateClientboundPacket, Packet } from "@chat-o/common";
import ServerApplication from "../server-application";
import { SocketClient } from "../socket-client";
import ClientPacketListener from "./client-packet-listener";

export default class ClientConnection extends Connection {
  private listeners: Map<any, Object> = new Map();

  private _state: ConnectionState = ConnectionState.DISCONNECTED;

  constructor(readonly uid: string, readonly socketClient: SocketClient, application: ServerApplication) {
    super(application);
  }

  sendPacket(packet: Packet) {
    this.socketClient.sendPacket(packet);
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
