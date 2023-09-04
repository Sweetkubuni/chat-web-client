import { createSignal, onMount } from "solid-js";
import ChatBody, {
  ListElem,
  MessageType,
} from "~/components/Chat/ChatBody/ChatBody";
import ChatFooter from "~/components/Chat/ChatFooter/ChatFooter";
import { usernames } from "~/testdata/data";
import "./ChatWindow.css";
import LiveKitHelper from "~/lib/livekit/livekit-helper";

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

export default function ChatWindow({
  livekitHelper,
}: {
  livekitHelper: LiveKitHelper;
}) {
  //TODO: replace userId with correct one when auth done
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

  const handleData = (msg: Uint8Array, participant: string) => {
    addMessage({
      content: {
        username: participant,
        content: new TextDecoder().decode(msg),
      },
      type: MessageType.RECEIVE,
    });
  };

  onMount(async () => {
    window.addEventListener("DATA_RECEIVED", (params: any) => {
      const { msg, participant } = params.detail;
      handleData(msg, participant);
    });
  });

  return (
    <div class="container">
      <div class="chat-window">
        <ChatBody msgs={messages} containerRef={containerRef} />
        <ChatFooter sendMessage={sendMessage} />
      </div>
    </div>
  );
}
