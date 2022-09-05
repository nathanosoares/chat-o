import ClientConnection from "../net/client-connection";

export default class Person {
  static names = [
    "Alison Rampling",
    "Caroline Wright",
    "Trevor Short",
    "Robert Lewis",
    "Gabrielle Hardacre",
    "Dylan Knox",
    "Sam Stewart",
    "Lucas Burgess",
    "Wanda May",
    "Liam Wilkins",
    "Nicholas Edmunds",
    "Diana Chapman",
    "Sophie Wilkins",
    "Faith Hamilton",
    "Deirdre James",
  ];

  readonly name: string;
  constructor(readonly connection: ClientConnection) {
    this.name = Person.names[Math.floor(Math.random() * Person.names.length)];
  }
}
