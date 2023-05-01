import { createSignal, Switch, Match } from "solid-js";
import { MessageArg } from "./MessageArg";
import "./Message.css";


export default function MessageReceive(props: MessageArg) {
  return (
    <>
			  <li class="message received">
				<div class="message-content">
				  <div class="message-sender">props.username</div>
				  <div class="message-text">props.content</div>
				</div>
			  </li>
    </>
  );
}
