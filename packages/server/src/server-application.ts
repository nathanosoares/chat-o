import { CommonApplication, PacketManager } from "@chat-o/common";
import { Server } from "http";
import Person from "./domain/person";
import Http from "./http";

export default class ServerApplication extends CommonApplication {
  private persons: Set<Person> = new Set();

  private http: Http | undefined;

  constructor(packetManger: PacketManager) {
    super(packetManger);
  }

  listen(port: number): Http {
    this.http = new Http(this);
    this.http.startHttpServer(port);

    return this.http;
  }

  addPerson(person: Person): void {
    this.persons.add(person);
  }
}
