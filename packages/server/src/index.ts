import { PacketManager } from "@chat-o/common";
import { randomUUID } from "crypto";
import { IncomingMessage } from "http";
import { Socket } from "net";
import ServerApplication from "./server-application";
import HandshakeListener from "./net/listeners/handshake-listener";
import ClientConnection from "./net/client-connection";
import { socketListener } from "./socket-listener";

const application = new ServerApplication(new PacketManager());

application.bootstrap();
const http = application.listen(8080);

http.server?.on("upgrade", (req: IncomingMessage, socket: Socket) => {
  http.acceptUpgradeConnection(req, socket);

  const connectionUid = randomUUID();

  console.log(`Client ${connectionUid} connected`);

  const connection = new ClientConnection(connectionUid, socket, application);

  connection.registerListener(new HandshakeListener(application, connection));

  socket.on("readable", () => {
    socketListener(application.packetManager, connection);
    socket.read();
  });
});

["uncaughtException", "unhandledRejection"].forEach((event) =>
  process.on(event, (err) => {
    console.error(`something bad happened! event: ${event}, msg: ${err.stack || err}`);
  })
);
