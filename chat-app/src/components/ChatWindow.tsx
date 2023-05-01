import { createSignal, onMount } from "solid-js";
import ChatBody from "./ChatBody";
import ChatFooter from "./ChatFooter";
import "./ChatWindow.css";

export default function ChatWindow() {
    const [message, setMessage] = createSignal([]);

    onMount(async () => {
        // Create WebSocket connection.
        const socket = new WebSocket("ws://localhost:8080");

        // Connection opened
        socket.addEventListener("open", (event) => {
            socket.send("I have connected");
        });

        // Listen for messages
        socket.addEventListener("message", (event) => {
            console.debug("Message from server ", event.data);
            setMessage(event.data);
        });
    });

    return <div class="container">
        <div class="chat-window">
            <ChatBody />
            <ChatFooter />
        </div>
    </div>
}