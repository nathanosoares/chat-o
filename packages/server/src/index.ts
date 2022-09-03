import { PacketManager } from "@chat-o/common";
import { randomUUID } from "crypto";
import { IncomingMessage } from "http";
import { Socket } from "net";
import Application from "./application";
import HandshakeListener from "./net/listeners/handshake-listener";
import ClientConnection from "./net/client-connection";
import { startServer, upgradeConnectionHandle } from "./server";
import { socketListener } from "./socket-listener";

const packetManager = new PacketManager();
const server = startServer(8080);

const application = new Application(server, packetManager);

application.bootstrap();

server.on("upgrade", (req: IncomingMessage, socket: Socket) => {
  upgradeConnectionHandle(req, socket);

  const connectionUid = randomUUID();

  console.log(`Client ${connectionUid} connected`);

  const connection = new ClientConnection(connectionUid, socket, application);

  connection.registerListener(new HandshakeListener(connection));

  socket.on("readable", () => {
    socketListener(packetManager, connection);
    socket.read();
  });
});

["uncaughtException", "unhandledRejection"].forEach((event) =>
  process.on(event, (err) => {
    console.error(`something bad happened! event: ${event}, msg: ${err.stack || err}`);
  })
);
