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
      ref={props.containerRef}
    >
      <ul class="message-list">
        <li class="message-content">
          <div class="message sent">
            <div class="message-sender">David</div>
            <div class="message-text">Good morning</div>
          </div>
        </li>
        <li class="message received">
          <div class="message-content">
            <div class="message-sender">Hellen</div>
            <div class="message-text">Hi, David</div>
          </div>
        </li>
        <li class="message sent">
          <div class="message-content">
            <div class="message-sender">David</div>
            <div class="message-text">How are you today?</div>
            <div class="message-text">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</div>
          </div>
        </li>

        <li class="message received">
          <div class="message-content">
            <div class="message-sender">Hellen</div>
            <div class="message-text">I'm good. What about you?</div>
            <div class="message-text">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters</div>
          </div>
        </li>
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
