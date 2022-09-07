import { Message } from "@chat-o/common";
import { Component } from "solid-js";

const ConversationMessageItem: Component<{ message: Message }> = (props: { message: Message }) => {
  return (
    <div class={`relative bg-slate-400 rounded mt-1 p-2 whitespace-pre-wrap`}>
      {props.message.body}
    </div>
  );
};

export default ConversationMessageItem;
