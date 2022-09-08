import { CommonApplication, PacketManager } from "@chat-o/common";
import Person from "./domain/person";
import { Socket } from "./socket";
export default class ServerApplication extends CommonApplication {
  private persons: Set<Person> = new Set();

  readonly socket: Socket;

  constructor(socketPort: number, packetManger: PacketManager) {
    super(packetManger);
    this.socket = new Socket(socketPort, this);
  }

  listen() {
    this.socket.listen();
  }

  addPerson(person: Person): void {
    this.persons.add(person);
  }
}
