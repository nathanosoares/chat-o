import { BufferStream } from "buffer-stream-js";
import { randomUUID } from "crypto";
import { createServer, Server } from "http";
import WebSocket, { WebSocketServer } from "ws";
import ClientConnection from "./net/client-connection";
import HandshakeListener from "./net/listeners/handshake-listener";
import ServerApplication from "./server-application";
import { WsClient } from "./socket-client";

export class Socket {
  private _server: Server;
  private _wss: WebSocketServer;

  constructor(private _port: number, private _application: ServerApplication) {
    this._server = createServer();
    this._wss = new WebSocketServer({ server: this._server });
  }

  listen() {
    this._wss.on("connection", this.onConnection.bind(this));
    this._server.listen(this._port, () => console.log(`Server listening ${this._port}`));
  }

  private onConnection(socket: WebSocket) {
    const connectionUid = randomUUID();
    console.log(`Client ${connectionUid} connected`);

    const wsClient = new WsClient(socket, this._application.packetManager);
    const connection = new ClientConnection(connectionUid, wsClient, this._application);

    connection.registerListener(new HandshakeListener(this._application, connection));

    socket.on("message", this.onMessage.bind(this, connection));
  }

  private onMessage(connection: ClientConnection, data: WebSocket.RawData, isBinary: boolean) {
    if (!isBinary) return;
    if (!(data instanceof Buffer)) return;

    const bufferStream = new BufferStream(data);

    const packetId = bufferStream.readUInt8();
    const packetClass = this._application.packetManager.getPacketById(packetId);

    if (!packetClass) return;

    const packet = new packetClass();
    packet.read(bufferStream);

    connection.queuePacket(packet);
  }
}
