import type { FC } from "react";
import "./Wrapper.css";
import Sidebar from "~/components/chat-room/sidebar/Sidebar";
import RoomCard from "~/components/chat-room/room-card/RoomCard";
import {createSignal} from "solid-js";

interface ChatRoomWrapperProps {}

const ChatRoomWrapper: FC<ChatRoomWrapperProps> = ({}) => {
  const [value, setValue] = createSignal<boolean>(true);
  return (
    <div class="chat-room-wrapper">
      <Sidebar />
      <div class="rooms-section">
        <div class="header-section">
          <input class="search-input" placeholder="Search filter" />
          <h2>Current Rooms</h2>
        </div>
        <div style="width: 1100px">
          {
            value() ?
                <div class="card-section">
                  <RoomCard />
                  <RoomCard />
                  <RoomCard />
                  <RoomCard />
                  <RoomCard />
                  <RoomCard />
                </div>
                :
                <div class="no-room">
                  <p>No rooms are available right now</p>
                </div>
          }
        </div>
      </div>
    </div>
  );
};
export default ChatRoomWrapper;
