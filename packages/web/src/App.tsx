import {
  Component,
  createSignal,
  For,
  onMount,
  Show,
  useContext,
} from "solid-js";
import { SocketContext } from "./net/socket-contexts";

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
            <div class="bg-slate-600 w-full flex flex-col justify-end">
              <div class="flex-[1_1_0] w-full relative min-h-0">
                <div class="overflow-y-scroll p-8 max-h-full h-full flex flex-col-reverse">
                  <div class="chat-messages left">
                    <For
                      each={Array.from(Array(15).keys())}
                      fallback={<div>Loading...</div>}
                    >
                      {() => <ChatMessageItem />}
                    </For>
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

              {/* <div class="flex shrink-0 w-full p-4 bg-slate-400"> */}
              <div class="p-4 bg-slate-400 flex shrink-0">
                <div class="grow p-2 rounded bg-white">
                  <div
                    class="w-full outline-0 max-h-32 overflow-y-scroll whitespace-pre-wrap break-all"
                    contentEditable={true}
                    role={"textbox"}
                    spellcheck={true}
                    // onInput={(e) => {
                    //   setMessage(
                    //     [...e.target.childNodes.values()]
                    //       .map((node) => node.textContent)
                    //       .join("\n")
                    //   );
                    // }}
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
