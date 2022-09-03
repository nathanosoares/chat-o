import {
  CommonApplication,
  HandshakeServerboundPacket,
  PacketManager,
} from "@chat-o/common";
import { BufferStream } from "buffer-stream-js";
import { createContext } from "solid-js";
import { createStore, SetStoreFunction } from "solid-js/store";
import ConnectionStateListener from "./listener/connection-state-listener";
import ServerConnection from "./server-connection";

class SocketStore {
  connected: boolean = false;
}

const [socketStore, setSocketStore] = createStore<SocketStore>({
  connected: false,
});

class SocketContextValue {
  private socketStore: SocketStore;
  private setSocketStore: SetStoreFunction<SocketStore>;

  constructor() {
    [this.socketStore, this.setSocketStore] = createStore<SocketStore>(
      new SocketStore()
    );
  }

  connect() {
    const packetManager = new PacketManager();
    const application = new CommonApplication(packetManager);

    application.bootstrap();

    const socket = new WebSocket(`ws://localhost:8080`);

    socket.onopen = (event) => {
      console.log("Connected!", event);

      const connection = new ServerConnection(socket, application);

      connection.registerListener(new ConnectionStateListener(connection));
      connection.sendPacket(new HandshakeServerboundPacket());

      socket.onmessage = async (message) => {
        const buffer = await message.data.arrayBuffer();
        const bufferStream = new BufferStream(buffer);

        const packetId = bufferStream.readUInt();
        const packetClass = packetManager.getPacketById(packetId);
        if (!packetClass) return;

        const packet = new packetClass();
        packet.read(bufferStream);

        connection.queuePacket(packet);
      };

      setSocketStore("connected", true);
    };

    socket.onerror = (error) => console.error(`Error`, error);
    socket.onclose = (event) => console.log("Disconnected!");
  }

  isConnected() {
    return socketStore.connected;
  }
}

export const SocketContext = createContext<SocketContextValue>(
  new SocketContextValue()
);
