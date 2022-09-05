import {
  ConnectionState,
  LoginResponseClientboundPacket,
  LoginServerboundPacket,
  PacketHandler,
  PacketListener,
} from "@chat-o/common";
import Person from "../../domain/person";
import ClientPacketListener from "../client-packet-listener";
import PreparingMessagesListener from "./preparing-messages";

export default class LoginListener extends ClientPacketListener {
  @PacketHandler()
  on(packet: LoginServerboundPacket) {
    if (this.connection.getState() != ConnectionState.HANDSHAKE) {
      return;
    }

    // Fazer login
    const person = new Person(this.connection);

    this.application.addPerson(person);

    this.connection.sendPacket(new LoginResponseClientboundPacket(this.connection.uid, person.name));

    this.connection.unregisterLister(this);
    this.connection.registerListener(new PreparingMessagesListener(this.application, this.connection));

    this.connection.setState(ConnectionState.PREPARING_MESSAGES);
  }
}
