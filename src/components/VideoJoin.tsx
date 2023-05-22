import { createSignal, onMount } from "solid-js";
import ChatBody, { ListElem, MessageType } from "./ChatBody";
import ChatFooter from "./ChatFooter";
import "./VideoJoin.css";
import { usernames } from "../testdata/data.js";
import LiveKitHelper from "../helper/LiveKitHelper";
enum Command {
  SUBSCRIBE = 0,
  UNSUBSCRIBE = 1,
  SEND_MESSAGE = 2,
}

interface Message {
  command: Command;
  channel: string;
  content: string;
}

interface Content {
  username: string;
  message: string;
}

let livekitHelper: any | undefined;

export default function VideoJoin(props) {
  //TODO: replace userId with correct one when auth done
  let socket: WebSocket;
  let containerRef: any;
  const userId = Math.floor(Math.random() * 25);
  const username = usernames[userId];

  const [messages, setMessages] = createSignal<Array<ListElem>>([]);

  const addMessage = async (message: ListElem) => {
    setMessages([...messages(), message]);
    if (messages().length > 10) {
      const tempMessages = [...messages()];
      tempMessages.shift();
      setMessages(tempMessages);
    }
  };
  const toggleVideo = async (message: ListElem) => {
    livekitHelper.toggleVideo();
  };

  const sendMessage = async (msg: string) => {
    if (livekitHelper.enterText(msg)) {
      const content: Content = {
        username: username,
        message: msg,
      };
      addMessage({
        content: {
          username: content.username,
          content: content.message,
        },
        type: MessageType.SEND,
      });
    }
  };

  const handleData = (msg: string, participant: string) => {
    addMessage({
      content: {
        username: participant,
        content: new TextDecoder().decode(msg),
      },
      type: MessageType.SEND,
    });
  };

  onMount(async () => {
    window.addEventListener("ROOM_CONNECTED", (params: any) => {
      props.livekitHelper.toggleVideo();
    });
  });

  return (
    <div class="join-container">
      {/* <div class="video-container">
        <video id="video-element" class="grid-style" controls></video>
      </div> */}
      <div class="join-window" id="joins-area">
        <div id="join-element" class="grid-style" controls></div>
      </div>
    </div>
  );
}
