import { Socket } from "net";
import express from "express";
import { IncomingMessage, Server } from "http";
import { createHash } from "crypto";
import ServerApplication from "./server-application";
import bodyParser from "body-parser";

export default class Http {
  private static FACEBOOK_TOKEN = "fed89381-6bce-47c7-81ea-989d09011a17";
  private static WEBSOCKET_MAGIC_STRING_KEY = "258EAFA5-E914-47DA-95CA-C5AB0DC85B11";

  private _server: Server | undefined;

  constructor(readonly application: ServerApplication) {}

  get server(): Server | undefined {
    return this._server;
  }

  startHttpServer(port: number = 8080) {
    const app = express();
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    app.get("/", function (request, response) {
      response.send("Simple WhatsApp Webhook tester</br>There is no front-end, see server.js for implementation!");
    });

    app.get("/webhook", function (request, response) {
      console.log("Incoming webhook: " + JSON.stringify(request.body));
      response.sendStatus(200);
    });

    this._server = app.listen(port, () => console.log(`Server running on port ${port}`));
  }
  
  acceptUpgradeConnection(request: IncomingMessage, socket: Socket) {
    // await new Promise((resolve) => setTimeout(resolve, 2000));

    const { "sec-websocket-key": webClientSocketKey } = request.headers;

    const sha1 = createHash("sha1");
    sha1.update(webClientSocketKey + Http.WEBSOCKET_MAGIC_STRING_KEY);
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
}
