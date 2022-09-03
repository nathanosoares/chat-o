import { Packet } from "./protocol/packet";

type PacketConstructor = { new (...args: any[]): Packet };

export class PacketManager {
  private packetsById = new Map<number, PacketConstructor>();
  private packetsByType = new Map<PacketConstructor, number>();

  registerPacket(id: number, packetType: PacketConstructor) {
    this.packetsById.set(id, packetType);
    this.packetsByType.set(packetType, id);
  }

  getPacketById(id: number): PacketConstructor | undefined {
    return this.packetsById.get(id);
  }

  getPacketByType(packetType: PacketConstructor): number | undefined {
    return this.packetsByType.get(packetType);
  }
}
