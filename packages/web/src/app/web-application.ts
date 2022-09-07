import { CommonApplication, HandshakeServerboundPacket, Message, PacketManager } from "@chat-o/common";
import { BufferStream } from "buffer-stream-js";
import { createStore, SetStoreFunction } from "solid-js/store";
import ConnectionStateListener from "./net/listener/connection-state-listener";
import LoginListener from "./net/listener/login-listener";
import ServerConnection from "./net/server-connection";

interface Store {
  messages: Message[];
  connected: boolean;
}

export default class WebApplication extends CommonApplication {
  socket?: WebSocket;
  clientUid?: string;

  private _store: Store;
  private _setStore: SetStoreFunction<Store>;

  constructor(packetManager: PacketManager) {
    super(packetManager);

    [this._store, this._setStore] = createStore<Store>({
      messages: [],
      connected: false,
    });
  }

  bootstrap(): void {
    super.bootstrap();

    this.socket = new WebSocket(`ws://localhost:8080`);

    this.socket.addEventListener("open", () => {
      if (!this.socket) return;

      console.log("Connected!");

      const connection = new ServerConnection(this.socket, this);

      connection.registerListener(new LoginListener(this, connection));
      connection.registerListener(new ConnectionStateListener(this, connection));

      this.socket.onmessage = async (message) => {
        const buffer = await message.data.arrayBuffer();
        const bufferStream = new BufferStream(buffer);

        const packetId = bufferStream.readUInt8();
        const packetClass = this.packetManager.getPacketById(packetId);
        if (!packetClass) return;

        const packet = new packetClass();
        packet.read(bufferStream);

        connection.queuePacket(packet);
      };

      connection.sendPacket(new HandshakeServerboundPacket());

      this._setStore("connected", true);
    });
  }

  get connected(): boolean {
    return this._store.connected;
  }

  get messages(): Message[] {
    return this._store.messages;
  }

  addMessages(...messages: Message[]) {
    this._setStore("messages", (prev) => [...prev,...messages]);
  }
}
