export type Message = TextMessage;

type MessageType = "text";

export interface BaseMessage {
  sender: string;
  type: MessageType;
}

export interface TextMessage extends BaseMessage {
  readonly type: "text";

  readonly body: string;

  readonly previewUrl?: string;
}
