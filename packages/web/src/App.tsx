import { SendMessageClientBoundPacket } from "@chat-o/common";
import { BufferStream } from "buffer-stream-js";
import { Component, onMount } from "solid-js";

const socket = new WebSocket(`ws://localhost:8080/`);

socket.onopen = (event) => console.log("Connected!", event);
socket.onmessage = (message) => console.log("message", message);
socket.onerror = (error) => console.error(`Error`, error);
socket.onclose = (event) => console.log("Disconnected!", event);

function handleSendMessageClick() {
  const packet = new SendMessageClientBoundPacket(
    "20f72bf7-0f7f-40fa-968c-11ce3cc13d92",
    "Olá"
  );

  const buffer = BufferStream.alloc(512);
  buffer.writeUInt(0x1);
  packet.write(buffer);

  socket.send(buffer.getLeftBuffer());
}

function handleShakeScreenClick() {}

const App: Component = () => {
  return (
    <div>
      <textarea id="textbox" cols="30" rows="10"></textarea>
      <button onclick={handleSendMessageClick}>Enviar 📨</button>
      <button onclick={handleShakeScreenClick}>Chamar atenção</button>
    </div>
  );
};

export default App;
