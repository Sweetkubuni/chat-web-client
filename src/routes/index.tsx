import { Title } from "solid-start";
import ChatWindow from "~/components/ChatWindow";
import VideoWindow from "~/components/VideoWindow";
import Navbar from "~/components/Navbar";
import Counter from "~/components/Counter";
import "./index.css";


export default function Home() {
  return (
    <main>
        <Navbar class="navbar"/>
        <div class="flex">
          <VideoWindow class="video-window"/>
          <ChatWindow class="chat-window"/>
        </div>
    </main>
  );
}
