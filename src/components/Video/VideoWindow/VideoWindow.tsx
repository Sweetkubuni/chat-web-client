import "./VideoWindow.css";
import EndCallIcon from "~/images/end_call.png";
import LiveKitHelper from "~/lib/livekit/livekit-helper";

interface VideoWindowProps {
  livekitHelper: LiveKitHelper;
}
export default function VideoWindow({ livekitHelper }: VideoWindowProps) {
  const toggleAudio = async () => {
    await livekitHelper.toggleAudio();
  };

  const toggleVideo = async () => {
    await livekitHelper.toggleVideo();
  };

  const shareScreen = async () => {
    await livekitHelper.shareScreen();
  };

  const disconnectRoom = async () => {
    await livekitHelper.disconnectRoom();
  };

  return (
    <div id="video-chatroom-container">
      <div id="video-chatroom-area">
        <div class="video-window" id="participants-area">
          <div id="video-element" class="grid-style"></div>
        </div>
        <div id="screenshare-area">
          <div>
            <span id="screenshare-info"> </span>
            <span id="screenshare-resolution"> </span>
          </div>
          <video id="screenshare-video"></video>
        </div>
        <div class="video-action">
          <div
            id="toggle-audio-button"
            class="action-item action-item-bg"
            onclick={toggleAudio}
          >
            <i class="fas fa-light fa-microphone"></i>
          </div>
          <div
            id="toggle-video-button"
            class="action-item action-item-bg"
            onclick={toggleVideo}
          >
            <i class="fas fa-regular fa-video"></i>
          </div>
          <div
            id="share-screen-button"
            class="action-item action-item-bg"
            onclick={shareScreen}
          >
            <i class="fas fa-share"></i>
          </div>
          <div
            id="disconnect-room-button"
            class="action-item"
            onclick={disconnectRoom}
          >
            <img class="end-call-icon" src={EndCallIcon} />
          </div>
        </div>
        <div id="screenshare-area">
          <div>
            <span id="screenshare-info"> </span>
            <span id="screenshare-resolution"> </span>
          </div>
          <video id="screenshare-video"></video>
        </div>
        {/* <div class="chat-window">
          <ChatBody msgs={messages} containerRef={containerRef} />
          <ChatFooter sendMessage={sendMessage} />
        </div> */}
      </div>
    </div>
  );
}
