import type { FC } from "react";
import "./Wrapper.css";
import Sidebar from "~/components/chat-room/sidebar/Sidebar";
import RoomCard from "~/components/chat-room/room-card/RoomCard";
import {createSignal} from "solid-js";
import IconMenu from "~/images/icons-menu.png";
import MenuPopup from "~/components/MenuPopup";

interface ChatRoomWrapperProps {}

const ChatRoomWrapper: FC<ChatRoomWrapperProps> = ({}) => {
  const [showMenu, setShowMenu] = createSignal(false);
  const [value, setValue] = createSignal<boolean>(true);

  const showMenuPopup = (event:any) => {
    document.addEventListener('click', handleClickMenu);
    setShowMenu(true);
    event.stopImmediatePropagation();
  }

  const handleClickMenu = (event: MouseEvent) => {
    if (document.getElementById('block-menu')) {
      if(event.target.id !== 'block-menu'){
        if (event.target.closest('#block-active') && event.target.closest('#block-active').id == 'block-active'){
          setShowMenu(true);
        } else {
          setShowMenu(false);
        }
      }
    }

  };

  return (
    <div class="chat-room-wrapper">
      <Sidebar />
      <div class="rooms-section">
        <div class="header-section">
          <div class="search-area">
            <input class="search-input" placeholder="Search filter" />
            <img src={IconMenu} class="icon-menu" onclick={showMenuPopup}/>
            {showMenu() ?
                <MenuPopup status={value()} />
                : ''}
          </div>
          <h2>Current Rooms</h2>
        </div>
        <div>
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
