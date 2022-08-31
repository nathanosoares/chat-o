import { randomUUID } from "crypto";
import { IncomingMessage } from "http";
import { Socket } from "net";
import { startServer, upgradeConnectionHandle } from "./server";
import { socketListener } from "./socket-listener";

const server = startServer();

server.on("upgrade", (req: IncomingMessage, socket: Socket) => {
  upgradeConnectionHandle(req, socket);

  socket.on("readable", () => {
    const connectionUid = randomUUID();
    socketListener(connectionUid, socket);
    socket.read();
  });
});
