import { createSignal, onMount } from "solid-js";
import ChatBody, { ListElem, MessageType } from "./ChatBody";
import ChatFooter from "./ChatFooter";
import MessageReceive from "./MessageReceive";
import MessageSent from "./MessageSent";
// import "./ChatWindow.css";

interface Message {
    userId: string,
    content: string
}

export default function ChatWindow() {

    //TODO: replace userId with correct one when auth done
    let socket: WebSocket;
    const userId = Math.floor(Math.random() * 101);

    const [messages, setMessages] = createSignal<Array<ListElem>>([]);


    const addMessage = async (message: ListElem) => {
        setMessages([...messages(), message])
    }

    const sendMessage = async (msg: string) => {

        const message: Message = {
            userId: userId.toString(),
            content: msg
        }

        const json = JSON.stringify(message);

        socket.send(json);

        const messageData: ListElem = {
            content: {
                username: message.userId,
                content: message.content
            },
            type: MessageType.SEND
        };

        console.log("Sent Message", json, messageData);

        addMessage(messageData);
        console.log(messages());
    }

    onMount(async () => {
        // Create WebSocket connection.
        socket = new WebSocket("ws://localhost:3000");

        console.log("Here");

        // Connection opened
        socket.addEventListener("open", (event) => {
        });

        // Listen for messages
        socket.onmessage = (event) => {
            console.log("msg: ", event.data)

            const message: Message = JSON.parse(event.data);

            console.log("Received message", message);

            const messageData: ListElem = {
               content: {
                    username: message.userId,
                    content:  message.content
               },
               type: MessageType.RECEIVE
            };
            addMessage(messageData)
            console.log("Hello: ", messages())
        };
    });

    return <div class="container">
        <div class="chat-window">
            <ChatBody msgs={messages}/>
            <ChatFooter sendMessage={sendMessage}/>
        </div>
    </div>
}
