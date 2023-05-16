import { Title } from "solid-start";
import ChatWindow from "~/components/ChatWindow";
import VideoWindow from "~/components/VideoWindow";
import Counter from "~/components/Counter";
import "./index.css";


export default function Home() {
  return (
    <main class="flex">
        <VideoWindow class="video-window"/>
        <ChatWindow class="chat-window"/>
    </main>
  );
}
