import { Component, createContext, VoidComponent, VoidProps } from "solid-js";
import { createStore } from "solid-js/store";

interface ISocketContextValue {
  connect(): void;
  isConnected(): boolean;
}

interface ISocketStore {
  connected: boolean;
}

export const [socketStore, setSocketStore] = createStore<ISocketStore>({
  connected: false,
});

export const SocketContext = createContext<ISocketContextValue>({
  connect() {
    const socket = new WebSocket(`ws://localhost:8080`);

    socket.onopen = (event) => {
      console.log("Connected!", event);
      setSocketStore("connected", true);
      
    };
    socket.onmessage = (message) => console.log("Message", message);
    socket.onerror = (error) => console.error(`Error`, error);
    socket.onclose = (event) => console.log("Disconnected!");
  },

  isConnected() {
    return socketStore.connected;
  }
});
