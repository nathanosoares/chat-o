import { Socket } from "net";
import { createServer, IncomingMessage, ServerResponse, Server } from "http";
import { createHash } from "crypto";
import { readFileSync } from "fs";

const WEBSOCKET_MAGIC_STRING_KEY = "258EAFA5-E914-47DA-95CA-C5AB0DC85B11";

export function startServer(port: number = 25665): Server {
  const server = createServer((_request: IncomingMessage, response: ServerResponse) => {
    response.end();
  });

  server.listen(port, () => console.log(`Server running on port ${port}`));

  return server;
}

export async function upgradeConnectionHandle(request: IncomingMessage, socket: Socket) {
  // await new Promise((resolve) => setTimeout(resolve, 2000));

  const { "sec-websocket-key": webClientSocketKey } = request.headers;

  const sha1 = createHash("sha1");
  sha1.update(webClientSocketKey + WEBSOCKET_MAGIC_STRING_KEY);
  const webSocketAccept = sha1.digest("base64");

  const acceptHeaders = [
    "HTTP/1.1 101 Switching Protocols",
    "Upgrade: websocket",
    "Connection: Upgrade",
    `Sec-WebSocket-Accept: ${webSocketAccept}`,
    "",
  ];

  socket.write(acceptHeaders.join("\r\n").concat("\n"));
}
