import { For, Switch, Match } from "solid-js";
import MessageReceive from "./MessageReceive";
import MessageSent  from "./MessageSent";
import { MessageArg } from "./MessageArg";
import "./ChatBody.css";

enum MessageType {
    SEND,
    RECEIVE
}

export interface ListElem {
    content: MessageArg;
    type: MessageType;
}

export interface ListArg {
    msgs: Array<ListElem>
}

export default function ChatBody(props : ListArg) {
  return (
    <div class="chat-body">
    <ul class="message-list">
      <For each={props.msgs}>
        {
            (msg, i) =>
            <Switch>
                <Match when={msg.type == MessageType.SEND}>
                    <MessageReceive {...msg.content}/>
                </Match>
                <Match when={msg.type == MessageType.RECEIVE}>
                    <MessageSent {...msg.content}/>
                </Match>
            </Switch>
        }
      </For>
    </ul>
    </div>
  );
}
