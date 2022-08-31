import { randomUUID } from "crypto";
import { IncomingMessage } from "http";
import { Socket } from "net";
import { startServer, upgradeConnectionHandle } from "./server";
import { socketListener } from "./socket-listener";

const server = startServer(8080);

server.on("upgrade", (req: IncomingMessage, socket: Socket) => {
  upgradeConnectionHandle(req, socket);

  const connectionUid = randomUUID();

  console.log(`Client ${connectionUid} connected`);

  socket.on("readable", () => {
    socketListener(connectionUid, socket);
    socket.read();
  });
});
