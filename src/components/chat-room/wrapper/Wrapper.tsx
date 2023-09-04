import "./Wrapper.css";
import Sidebar from "~/components/chat-room/sidebar/Sidebar";
import RoomCard from "~/components/chat-room/room-card/RoomCard";
import { For, Show, createResource, createSignal } from "solid-js";
import IconMenu from "~/images/icons-menu.png";
import MenuPopup from "~/components/MenuPopup";
import { Broadcasts, getBroadcasts } from "~/lib/services/broadcasts";
interface ChatRoomWrapperProps {}

const ChatRoomWrapper = (props: ChatRoomWrapperProps) => {
  const [showMenu, setShowMenu] = createSignal(false);
  const [value, setValue] = createSignal<boolean>(true);
  
  const showMenuPopup = (event: any) => {
    document.addEventListener("click", handleClickMenu);
    setShowMenu(true);
    event.stopImmediatePropagation();
  };
  const [broadcasts, { refetch }] = createResource<Broadcasts[]>(getBroadcasts);
  const refreshData = () => {
    refetch();
  };

  const handleClickMenu = (event: MouseEvent) => {
    if (document.getElementById("block-menu")) {
      if (event.target.id !== "block-menu") {
        if (
          event.target.closest("#block-active") &&
          event.target.closest("#block-active").id == "block-active"
        ) {
          setShowMenu(true);
        } else {
          setShowMenu(false);
        }
      }
    }
  };

  return (
    <div class="chat-room-wrapper">
      <Sidebar refreshBroadcasts={refreshData} />
      <div class="rooms-section">
        <div class="header-section">
          <div class="search-area">
            <input class="search-input" placeholder="Search filter" />
            <img src={IconMenu} class="icon-menu" onclick={showMenuPopup} />
            {showMenu() ? (
              <MenuPopup status={value()} refreshBroadcasts={refreshData} />
            ) : (
              ""
            )}
          </div>
          <div>
            <h2>Current Rooms </h2>
          </div>
        </div>
        <div>
          <Show when={!broadcasts.loading} fallback={<>Loading...</>}>
            {(broadcasts() || []).length > 0 ? (
              <div class="card-section">
                <For each={broadcasts()}>
                  {(broadcast) => (
                    <RoomCard key={broadcast.sid} name={broadcast.name} />
                  )}
                </For>
              </div>
            ) : (
              <div class="no-room">
                <p>No rooms are available right now</p>
              </div>
            )}
          </Show>
          {broadcasts.error && <>Error...</>}
        </div>
      </div>
    </div>
  );
};
export default ChatRoomWrapper;
