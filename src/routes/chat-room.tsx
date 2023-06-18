import Navbar from "~/components/Navbar";
import VideoWindow from "~/components/VideoWindow";
import ChatWindow from "~/components/ChatWindow";
import VideoJoin from "~/components/VideoJoin";
import "@fortawesome/fontawesome-free/css/all.css";
import LiveKitHelper from "~/helper/LiveKitHelper";
import "./chat-room.css";
import ChatRoomWrapper from "~/components/chat-room/wrapper/Wrapper";

// Instantiate the LiveKitHelper with the server URL, API key, and API secret
const livekitHelper = new LiveKitHelper(
    "ws://localhost:7880",
    "devkey",
    "secret"
);

// Connect to a room
const roomName = "my-first-room";
const accessToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODk1NjQ3MzksImlzcyI6ImRldmtleSIsIm5hbWUiOiJ1c2VyMiIsIm5iZiI6MTY4NjMyNDczOSwic3ViIjoidXNlcjIiLCJ2aWRlbyI6eyJyb29tIjoibXktZmlyc3Qtcm9vbSIsInJvb21Kb2luIjp0cnVlfX0.OyPOcMRnc-y4weiuGLS1zSU7AqRN9yfQJxZ7oHSfI1M";

livekitHelper
    .connectToRoom("ws://localhost:7880", accessToken)
    .then((room) => {
      // Perform actions in the room
      console.log("Connected to room:", roomName);
      // livekitHelper.toggleVideo();
      window.dispatchEvent(new CustomEvent("ROOM_CONNECTED"));

      // Listen to participant events
      // emitter.emit("PARTICIPANT_CONNECTED", 0);
      room.on("participantConnected", (participant) => {
        console.log(`Participant connected: ${participant.identity}`);
      });
      room.on("dataReceived", (msg: string, participant?: RemoteParticipant) => {
        // handleData(msg, participant);
        window.dispatchEvent(
            new CustomEvent("DATA_RECEIVED", {
              detail: {
                msg: msg,
                participant: participant,
              },
            })
        );
        // emitter.emit("DATA_RECEIVED", (msg, participant));
      });

      room.on("participantDisconnected", (participant) => {
        console.log(`Participant disconnected: ${participant.identity}`);
      });

      // Disconnect from the room after some time
      setTimeout(() => {
        // livekitHelper.disconnectFromRoom();
      }, 5000);
    })
    .catch((error) => {
      console.error("Error connecting to room:", error);
    });

export default function ChatRoomPage() {
  return (
      <main>
        <div class="chat-room-container">
          <Navbar class="navbar" />
          <div class="flex video-live-chat">
            <VideoWindow livekitHelper={livekitHelper} class="video-window" />
            <ChatWindow livekitHelper={livekitHelper} class="chat-window" />
          </div>
          <VideoJoin livekitHelper={livekitHelper} class="video-window" />
        </div>
      </main>
  );
}
