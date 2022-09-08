import { PacketManager } from "@chat-o/common";
import ServerApplication from "./server-application";

const application = new ServerApplication(8080, new PacketManager());

application.bootstrap();
application.listen();

["uncaughtException", "unhandledRejection"].forEach((event) =>
  process.on(event, (err) => {
    console.error(`something bad happened! event: ${event}, msg: ${err.stack || err}`);
  })
);
