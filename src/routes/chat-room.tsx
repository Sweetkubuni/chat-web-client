import Navbar from "~/components/Navbar/Navbar";
import VideoWindow from "~/components/Video/VideoWindow/VideoWindow";
import ChatWindow from "~/components/Chat/ChatWindow/ChatWindow";
import VideoJoin from "~/components/Video/VideoJoin/VideoJoin";
import "@fortawesome/fontawesome-free/css/all.css";
import LiveKitHelper from "~/lib/livekit/livekit-helper";
import "~/styles/chat-room.css";
import { RoomEvent } from "livekit-client";

const state = {
  isFrontFacing: false,
  encoder: new TextEncoder(),
  decoder: new TextDecoder(),
  defaultDevices: new Map<MediaDeviceKind, string>(),
  bitrateInterval: undefined as any,
};
// Instantiate the LiveKitHelper with the server URL, API key, and API secret
const livekitHelper = new LiveKitHelper(
  "ws://localhost:7880",
  "devkey",
  "secret"
);

// Connect to a room
const roomName = "my-first-room";
const accessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTY1NzYwNTMsImlzcyI6ImRldmtleSIsIm5hbWUiOiJ1c2VyMSIsIm5iZiI6MTY5MzMzNjA1Mywic3ViIjoidXNlcjEiLCJ2aWRlbyI6eyJyb29tIjoibXktZmlyc3Qtcm9vbSIsInJvb21Kb2luIjp0cnVlfX0.YjWpmC0OGpP0qzzPi3QIPUHNaXahpq2Joexo96VwwiU";

livekitHelper
  .connectToRoom("ws://localhost:7880", accessToken)
  .then((room) => {
    if (!room) {
      return;
    }
    // Perform actions in the room
    console.log("Connected to room:", roomName);
    window.dispatchEvent(new CustomEvent("ROOM_CONNECTED"));

    // Listen to participant events
    room.on(RoomEvent.ParticipantConnected, (participant) => {
      console.log(`Participant connected: ${participant.identity}`);
    });
    room.on(RoomEvent.DataReceived, (msg, participant) => {
      window.dispatchEvent(
        new CustomEvent(RoomEvent.DataReceived, {
          detail: {
            msg: state.decoder.decode(msg),
            participant: participant,
          },
        })
      );
    });

    room.on(RoomEvent.ParticipantDisconnected, (participant) => {
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
        <Navbar />
        <div class="flex video-live-chat">
          <VideoWindow livekitHelper={livekitHelper} />
          <ChatWindow livekitHelper={livekitHelper} />
        </div>
        <VideoJoin livekitHelper={livekitHelper} />
      </div>
    </main>
  );
}
