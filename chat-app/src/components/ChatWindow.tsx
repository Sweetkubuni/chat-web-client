import { createSignal, onMount } from "solid-js";
import ChatBody, { ListElem, MessageType } from "./ChatBody";
import ChatFooter from "./ChatFooter";
import "./ChatWindow.css";
import {usernames} from '../testdata/data.js';

enum Command {
    SUBSCRIBE = 0,
    UNSUBSCRIBE = 1,
    SEND_MESSAGE = 2
}

interface Message {
  command: Command,
  channel: string,
  content: string
}

interface Content {
    username: string,
    message: string
}

export default function ChatWindow() {
  //TODO: replace userId with correct one when auth done
  let socket: WebSocket;
  let containerRef: any;
  const userId = Math.floor(Math.random() * 25);
  const username = usernames[userId];

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

    const content: Content = {
        username: username,
        message: msg
    }
    
    const message: Message = {
        command:  Command.SEND_MESSAGE,
        channel: "general",
        content: JSON.stringify(content)
    }

    const jsonData = JSON.stringify(message);

    socket.send(jsonData);

    const messageData: ListElem = {
        content: {
            username: content.username,
            content: content.message
        },
        type: MessageType.SEND
    }

    console.log("Sent Message", jsonData, messageData);
    addMessage(messageData);
  };

  onMount(async () => {
    // Create WebSocket connection.
    socket = new WebSocket(`ws://localhost:3000/chat?username=${username}`);


    // Connection opened
    socket.addEventListener("open", (event) => {
        const subscribeMessage = {
            command: Command.SUBSCRIBE,
            channel: "general"
        }

        const jsonData = JSON.stringify(subscribeMessage);

        socket.send(jsonData);
    });

    // Listen for messages
    socket.onmessage = (event) => {
      const message: Message = JSON.parse(event.data);
      const content: Content = JSON.parse(message.content);

      if(content.username == username){
          return
      }

      const messageData: ListElem = {
          content: {
              username: content?.username!,
              content: content?.message!
          },
          type: MessageType.RECEIVE
      }

      console.log("Message Received", messageData)

      addMessage(messageData);
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
