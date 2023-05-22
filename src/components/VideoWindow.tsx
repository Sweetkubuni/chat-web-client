import { createSignal, onMount } from "solid-js";
import "./VideoWindow.css";

export default function VideoWindow(props) {
  return (
    <div class="container">
      <div class="video-window" id="participants-area">
        <div id="video-element" class="grid-style" controls></div>
      </div>
      {/* <div class="chat-window">
        <ChatBody msgs={messages} containerRef={containerRef} />
        <ChatFooter sendMessage={sendMessage} />
      </div> */}
    </div>
  );
}
