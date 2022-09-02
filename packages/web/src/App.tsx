import { SendMessageClientBoundPacket } from "@chat-o/common";
import { BufferStream } from "buffer-stream-js";
import {
  Component,
  createMemo,
  createSignal,
  onMount,
  Show,
  useContext,
} from "solid-js";
import { SocketContext, socketStore } from "./net/socket-contexts";

// const socket = new WebSocket(`ws://localhost:8080/`);

// socket.onopen = (event) => console.log("Connected!", event);
// socket.onmessage = (message) => console.log("message", message);
// socket.onerror = (error) => console.error("Error", error);
// socket.onclose = (event) => console.log("Disconnected!", event);

// function handleSendMessageClick() {
//   const packet = new SendMessageClientBoundPacket(
//     "20f72bf7-0f7f-40fa-968c-11ce3cc13d92",
//     "Olá"
//   );

//   const buffer = BufferStream.alloc(512);
//   buffer.writeUInt(0x1);
//   packet.write(buffer);

//   socket.send(buffer.getLeftBuffer());
// }

// function handleShakeScreenClick() {}

const ChatListItem: Component = (props) => {
  const socketContext = useContext(SocketContext);
  return (
    <div class="hover:bg-slate-100 cursor-pointer flex">
      <div class="shrink-0 self-center mx-3">
        <img
          src="https://api.lorem.space/image/face?w=100&h=100"
          class="rounded-full h-14 w-14"
        />
      </div>

      <div class="overflow-hidden border-t py-3 pr-2">
        <p class="truncate">John Doe</p>
        <p class="truncate">
          Ut ullamco aliqua est non ad eiusmod Lorem est amet ut.
        </p>
      </div>
    </div>
  );
};

const ChatMessageItem: Component = () => {
  return (
    <div class={`relative bg-slate-400 rounded mt-1 p-2`}>
      Elit ex Lorem magna nostrud mollit sit qui nostrud tempor voluptate.
    </div>
  );
};

const App: Component = () => {
  const [message, setMessage] = createSignal<string>("");

  const socketContext = useContext(SocketContext);
  // const isConnected = createMemo(() => socketStore.connected);

  onMount(() => {
    socketContext.connect();
  });

  return (
    <>
      <Show when={socketContext.isConnected()} fallback={<div>Loading...</div>}>
        <div class="bg-slate-50 h-screen max-w-5xl m-auto relative flex flex-col">
          <div class="flex grow">
            <div class="w-80 shrink-0 border-b">
              <ChatListItem />
              <ChatListItem />
              <ChatListItem />
            </div>
            <div class="bg-slate-600 grow flex flex-col">
              <div class="grow flex p-8">
                <div class="grow flex flex-col justify-end">
                  <div class="chat-messages left">
                    <ChatMessageItem />
                  </div>
                  <div class="chat-messages right">
                    <ChatMessageItem />
                    <ChatMessageItem />
                    <ChatMessageItem />
                  </div>
                  <div class="chat-messages left">
                    <ChatMessageItem />
                  </div>
                </div>
              </div>

              <div class="flex grow-0 w-full p-4 bg-slate-400">
                <div class="grow p-2 rounded bg-white">
                  <div
                    class="w-full outline-0 max-h-32 overflow-y-scroll whitespace-pre-wrap break-all"
                    contentEditable={true}
                    role={"textbox"}
                    spellcheck={true}
                    onInput={(e) => {
                      setMessage(
                        [...e.target.childNodes.values()]
                          .map((node) => node.textContent)
                          .join("\n")
                      );
                    }}
                  ></div>
                </div>

                <div class="ml-2 shrink-0 flex justify-center items-center">
                  <div class="w-8 h-8 text-center rounded-full flex justify-center items-center cursor-pointer">
                    📨
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Show>
    </>
  );
};

export default App;
