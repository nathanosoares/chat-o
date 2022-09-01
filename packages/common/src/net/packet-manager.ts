import { Packet } from "./protocol/packet";
import { ClientBoundPacket } from "./protocol/packets/client-bound-packet";
import { ServerBoundPacket } from "./protocol/packets/server-bound-packet";

type PacketConstructor = { new (...args: any[]): Packet };

export class PacketManager {

  private packets = new Map<number, PacketConstructor>();
  private listeners: Array<Object> = [];

  registerPacket(id: number, packetClass: PacketConstructor) {
    this.packets.set(id, packetClass);
  }

  getPacket(id: number): PacketConstructor | undefined {
    return this.packets.get(id);
  }

  registerListener(...listener: Object[]): void {
    this.listeners.push(...listener);
  }

  dispatchServerBoundPacket(packet: ServerBoundPacket) {
    this.dispach(packet, (listener, methodName) =>
      listener[methodName](packet)
    );
  }

  dispatchClientBoundPacket(connectionUid: string, packet: ClientBoundPacket) {
    this.dispach(packet, (listener, methodName) =>
      listener[methodName](connectionUid, packet)
    );
  }

  private dispach(
    packet: Packet,
    callable: (listener: any, methodName: string | symbol) => void
  ) {
    for (const listener of this.listeners) {
      for (const methodName of Reflect.ownKeys(
        Object.getPrototypeOf(listener)
      )) {
        const handler = Reflect.getMetadata(
          "packet_handler",
          listener,
          methodName
        );

        if (packet.constructor === handler) {
          callable(listener, methodName);
        }
      }
    }
  }
}
