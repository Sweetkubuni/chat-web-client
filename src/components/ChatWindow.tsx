import { createSignal, onMount } from "solid-js";
import ChatBody, { ListElem, MessageType } from "./ChatBody";
import ChatFooter from "./ChatFooter";
import "./ChatWindow.css";
import { usernames } from '../testdata/data.js';

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
    /*   {
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
       },*/
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
      command: Command.SEND_MESSAGE,
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
    let WEBSOCKET_URL : string = process.env.WEBSOCKET_URL!;
    let fullURL : string = `ws://` + WEBSOCKET_URL +`/chat?username=${username}`;
    console.debug('connecting to ' + fullURL);
    // Create WebSocket connection.
    socket = new WebSocket(fullURL);


    // Connection opened
    socket.addEventListener("open", (event) => {
      const subscribeMessage = {
        command: Command.SUBSCRIBE,
        channel: "general"
      }

      const jsonData = JSON.stringify(subscribeMessage);

      socket.send(jsonData);

      const messageData: ListElem = {
        content: {
          username: "client"!,
          content: "...Welcome!..."
        },
        type: MessageType.SPECIAL_REQUEST
      }

      addMessage(messageData);
    });

    // Listen for messages
    socket.onmessage = (event) => {
      const message: Message = JSON.parse(event.data);
      const content: Content = JSON.parse(message.content);

      if (content.username == username) {
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

    // Listen for Closing issues
    socket.onclose = function (event) {
      let msg : string = "";
      let msgType: MessageType = MessageType.SPECIAL_REQUEST;

      let errorMessage = function (arg: string) {
        msg = arg;
        msgType = MessageType.ERROR;
      };
      switch (event.code) {
        case 1000:
          msg = "Good Bye! Closing...";
          break;
        case 1001:
          errorMessage("connection closed due to server going down...");
          break;
        case 10002:
          errorMessage("connection closed due to protocol error");
          break;
        case 10003:
          errorMessage("connection closed due to incorrect data...");
          break;
        case 1004:
          errorMessage("rejected connection...");
          break;
        case 1005:
          console.log("no status code present");
          break;
        case 1006:
          errorMessage("closed abnormally no close control frame...");
          break;
        case 1007:
          errorMessage("connection closed due to inconsistent message type ...");
          break;
        case 1008:
          errorMessage("connection closed due to policy violated...");
          break;
        case 1009:
          errorMessage("connection closed due to message too large...");
          break;
        case 1010:
          errorMessage("connection closed due to extension not recieved...");
          break;
        case 1011:
          errorMessage("server terminating connection...");
          break;
        case 1015:
          errorMessage("failure to perform TLS handshake...");
          break;
        default:
          errorMessage("unknown error...");
          break;

      }

      const messageData: ListElem = {
        content: {
          username: "client",
          content: msg,
        },
        type: msgType
      }

      addMessage(messageData);
    }

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
