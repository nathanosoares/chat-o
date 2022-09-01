import "reflect-metadata";
import { ClientBoundPacket } from "../net";

export const ClientBoundPacketHandler = (): MethodDecorator => {
  return (
    target: Object,
    propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<any>
  ) => {
    var paramtypes = Reflect.getMetadata(
      "design:paramtypes",
      target,
      propertyKey
    );

    if (paramtypes?.length != 2) {
      throw new Error("Invalid packet handler paramenters.");
    }

    if (paramtypes[0] != String) {
      throw new Error(
        "First paramenter need be a type string to receive connectionUid."
      );
    }

    const packetType = paramtypes[1];

    if (!(packetType.prototype instanceof ClientBoundPacket)) {
      throw new Error(
        "Second paramenter need be a type that extends ClientBoundPacket."
      );
    }

    Reflect.defineMetadata("packet_handler", packetType, target, propertyKey);
  };
};

export const ServerBoundPacketHandler = (): MethodDecorator => {
  return (
    target: Object,
    propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<any>
  ) => {
    var paramtypes = Reflect.getMetadata(
      "design:paramtypes",
      target,
      propertyKey
    );

    if (paramtypes?.length != 1) {
      throw new Error("Invalid packet handler paramenters.");
    }

    const packetType = paramtypes[0];

    if (!(packetType.prototype instanceof ServerBoundPacketHandler)) {
      throw new Error(
        "Second paramenter need be a type that extends ServerBoundPacketHandler."
      );
    }

    Reflect.defineMetadata("packet_handler", packetType, target, propertyKey);
  };
};
