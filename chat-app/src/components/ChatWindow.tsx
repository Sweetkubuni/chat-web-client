import { createSignal, onMount } from "solid-js";
import ChatBody, { ListElem, MessageType } from "./ChatBody";
import ChatFooter from "./ChatFooter";
import "./ChatWindow.css";

interface Message {
  userId: string;
  content: string;
}

export default function ChatWindow() {
  //TODO: replace userId with correct one when auth done
  let socket: WebSocket;
  let containerRef: any;
  const userId = Math.floor(Math.random() * 101);

  const [messages, setMessages] = createSignal<Array<ListElem>>([
    {
      content: {
        username: "Admin",
        content: "This is a message from the admin",
      },
      type: MessageType.ADMIN,
    },
    {
      content: {
        username: "Error Bot",
        content: "This is a message from the error bot",
      },
      type: MessageType.ERROR,
    },
    {
      content: {
        username: "Eric",
        content: "Hey! How are you?!",
      },
      type: MessageType.RECEIVE,
    },
    {
      content: {
        username: "Eric",
        content: "Special Request Message!",
      },
      type: MessageType.SPECIAL_REQUEST,
    },
    {
      content: {
        username: "Admin",
        content: "This is another a message from the admin",
      },
      type: MessageType.ADMIN,
    },
  ]);

  const addMessage = async (message: ListElem) => {
    setMessages([...messages(), message]);
    if (messages().length > 10) {
      const tempMessages = [...messages()];
      tempMessages.shift();
      setMessages(tempMessages);
    }
  };

  const sendMessage = async (msg: string) => {
    const message: Message = {
      userId: userId.toString(),
      content: msg,
    };

    const json = JSON.stringify(message);

    socket.send(json);

    const messageData: ListElem = {
      content: {
        username: message.userId,
        content: message.content,
      },
      type: MessageType.SEND,
    };

    console.log("Sent Message", json, messageData);

    addMessage(messageData);
    console.log(messages());
  };

  onMount(async () => {
    // Create WebSocket connection.
    socket = new WebSocket("ws://localhost:3000");

    console.log("Here");

    // Connection opened
    socket.addEventListener("open", (event) => {});

    // Listen for messages
    socket.onmessage = (event) => {
      console.log("msg: ", event.data);

      const message: Message = JSON.parse(event.data);

      console.log("Received message", message);

      const messageData: ListElem = {
        content: {
          username: message.userId,
          content: message.content,
        },
        type: MessageType.RECEIVE,
      };
      addMessage(messageData);
      console.log("Hello: ", messages());
    };
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
