import "reflect-metadata";
import { Packet } from "../net";

export const PacketHandler = (packetType?: any): MethodDecorator => {
  return (
    target: Object,
    propertyKey: string | symbol,
    _descriptor: TypedPropertyDescriptor<any>
  ) => {
    if (!packetType) {
      var paramtypes = Reflect.getMetadata(
        "design:paramtypes",
        target,
        propertyKey
      );

      if (paramtypes?.length != 1) {
        throw new Error(`Invalid packet handler paramenters.`);
      }

      packetType = paramtypes[0];
    }

    if (!(packetType.prototype instanceof Packet)) {
      throw new Error("Second paramenter need be a type that extends Packet.");
    }

    Reflect.defineMetadata("packet_handler", packetType, target, propertyKey);
  };
};
