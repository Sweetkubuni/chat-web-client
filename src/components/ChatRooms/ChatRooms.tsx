import "./ChatRooms.css";
import {
  For,
  Match,
  Show,
  Switch,
  createResource,
  createSignal,
} from "solid-js";
import Sidebar from "~/components/Sidebar/Sidebar";
import RoomCard from "~/components/RoomCard/RoomCard";
import IconMenu from "~/images/icons-menu.png";
import MenuPopup from "~/components/Popup/MenuPopup/MenuPopup";
import { Broadcasts, getBroadcasts } from "~/lib/services/broadcasts";

interface ChatRoomsProps {}

const ChatRooms = (props: ChatRoomsProps) => {
  const [showMenu, setShowMenu] = createSignal(false);

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
    const target = event.target as HTMLElement;
    if (document.getElementById("block-menu")) {
      if (target.id !== "block-menu") {
        if (
          target.closest("#block-active") &&
          target.closest("#block-active")?.id == "block-active"
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
            <Show when={showMenu()}>
              <MenuPopup status refreshBroadcasts={refreshData} />
            </Show>
          </div>
          <div>
            <h2>Current Rooms </h2>
          </div>
        </div>

        <Switch>
          <Match when={broadcasts.loading}>Loading...</Match>
          <Match when={(broadcasts() || []).length > 0}>
            <div class="card-section">
              <For each={broadcasts()}>
                {(broadcast) => <RoomCard name={broadcast.name} />}
              </For>
            </div>
          </Match>
          <Match when={broadcasts.error}>Error...</Match>
        </Switch>
      </div>
    </div>
  );
};
export default ChatRooms;
