import { Message } from "@chat-o/common";
import { Component, createMemo, For, Show, useContext } from "solid-js";
import { AppContext } from "../../app/application-context";
import ConversationMessageItem from "./components/conversation/message-item";
import InputBar from "./components/input-bar";

const ChatListItem: Component = (props) => {
  return (
    <div class="hover:bg-slate-100 cursor-pointer flex">
      <div class="shrink-0 self-center mx-3">
        <img src="https://api.lorem.space/image/face?w=100&h=100" class="rounded-full h-14 w-14" />
      </div>

      <div class="overflow-hidden border-t py-3 pr-2">
        <p class="truncate">John Doe</p>
        <p class="truncate">Ut ullamco aliqua est non ad eiusmod Lorem est amet ut.</p>
      </div>
    </div>
  );
};

type ChatMessage = { side: "left" | "right"; messages: Message[] };

const ChatScreen: Component = () => {
  const app = useContext(AppContext);

  const messagesGroups = createMemo<ChatMessage[]>(() => {
    if (!app?.messages) return [];

    const output: ChatMessage[] = [];
    let messages: Message[] = [];
    for (let i = 0; i < app.messages.length; i++) {
      const message = app.messages[i];
      messages.push(message);

      if (i + 1 < app.messages.length) {
        const nextMessage = app.messages[i + 1];
        if (message.sender != nextMessage.sender) {
          output.push({
            side: app.clientUid != message.sender ? "left" : "right",
            messages: [...messages],
          });

          messages = [];
        }
      }
    }

    if (messages.length) {
      output.push({
        side: app.clientUid != messages[0].sender ? "left" : "right",
        messages: [...messages],
      });
    }

    return output.reverse();
  });

  return (
    <>
      <Show when={app?.connected} fallback={<div>Loading...</div>}>
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
                  <For each={messagesGroups()}>
                    {(group) => (
                      <div class={`chat-messages ${group.side}`}>
                        <For each={group.messages}>
                          {(message) => <ConversationMessageItem message={message} />}
                        </For>
                      </div>
                    )}
                  </For>
                </div>
              </div>

              <InputBar />
            </div>
          </div>
        </div>
      </Show>
    </>
  );
};

export default ChatScreen;
