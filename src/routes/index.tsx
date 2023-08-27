import "@fortawesome/fontawesome-free/css/all.css";
import { Title, createRouteData } from "solid-start";
import ChatWindow from "~/components/ChatWindow";
import VideoWindow from "~/components/VideoWindow";
import VideoJoin from "~/components/VideoJoin";
import Navbar from "~/components/Navbar";
import "./index.css";
import LiveKitHelper from "../helper/LiveKitHelper";
import ChatRoomWrapper from "~/components/chat-room/wrapper/Wrapper";
import LoadingIcon from "~/images/loading.png";

export default function Home() {
  return (
    <main>
      <ChatRoomWrapper />
      <div id="overlay" style="display:none;">
        <div class="overlay-content">
          <img class="loading-icon" src={LoadingIcon} />
          <p id="register-info">Please wait...</p>
        </div>
      </div>
    </main>
  );
}
