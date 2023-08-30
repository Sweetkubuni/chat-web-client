import { createSignal, onMount } from "solid-js";
import { ListElem, MessageType } from "~/components/Chat/ChatBody/ChatBody";
import "./Navbar.css";
import Avatar from "~/images/img_avatar.png";
import { usernames } from "~/testdata/data";

interface Content {
  username: string;
  message: string;
}

let livekitHelper: any | undefined;

export default function ChatWindow() {
  //TODO: replace userId with correct one when auth done
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
      type: MessageType.SEND,
    });
  };

  onMount(async () => {});

  return (
    <div class="navbar">
      <div class="avatar-pic">
        <img class="avatar" src={Avatar} />
      </div>
    </div>
  );
}
