import { For, Switch, Match, createEffect, on } from "solid-js";
import MessageReceive from "./MessageReceive";
import MessageSent from "./MessageSent";
import { MessageArg } from "./MessageArg";
import "./ChatBody.css";
import MessageAdmin from "./MessageAdmin";
import MessageError from "./MessageError";
import MessageRequest from "./MessageRequest";

export enum MessageType {
  SEND,
  RECEIVE,
  ADMIN,
  ERROR,
  SPECIAL_REQUEST,
}

export interface ListElem {
  content: MessageArg;
  type: MessageType;
}

export interface ListArg {
  msgs: () => Array<ListElem>;
  containerRef: any;
}

export default function ChatBody(props: ListArg) {
  console.log("Messages BODY: ", props.msgs);

  createEffect(
    on(
      () => props.msgs.length,
      () => (props.containerRef.scrollTop = props.containerRef.scrollHeight)
    )
  );

  return (
    <div
      class="chat-body"
      style={{
        "overflow-y": "auto",
      }}
      ref={props.containerRef}
    >
      <ul class="message-list">
        <For each={props.msgs()}>
          {(msg, i) => (
            <Switch>
              <Match when={msg.type == MessageType.SEND}>
                <MessageSent {...msg.content} />
              </Match>
              <Match when={msg.type == MessageType.RECEIVE}>
                <MessageReceive {...msg.content} />
              </Match>
              <Match when={msg.type == MessageType.ADMIN}>
                <MessageAdmin {...msg.content} />
              </Match>
              <Match when={msg.type == MessageType.ERROR}>
                <MessageError {...msg.content} />
              </Match>
              <Match when={msg.type == MessageType.SPECIAL_REQUEST}>
                <MessageRequest {...msg.content} />
              </Match>
            </Switch>
          )}
        </For>
      </ul>
    </div>
  );
}
