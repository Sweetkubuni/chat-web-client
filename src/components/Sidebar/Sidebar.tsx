import "./Sidebar.css";
import LiveIcon from "~/images/live.png";
import BookmarkIcon from "~/images/bookmark.png";
import LoginIcon from "~/images/login.png";
import { Match, Switch, createSignal } from "solid-js";
import CreateVideoPopup from "~/components/Popup/CreateVideo/CreateVideoPopup";
import AuthPopup from "~/components/Popup/AuthPopup/AuthPopup";

interface SidebarProps {
  refreshBroadcasts: () => void;
}
enum Popup {
  Auth = "AuthPopup",
  CreateVideo = "CreateVideo",
}
const Sidebar = (props: SidebarProps) => {
  const [show, setShow] = createSignal(false);
  const [popup, setPopup] = createSignal<Popup>(Popup.Auth);
  let refCreateVideo: HTMLDivElement;
  let refAuth: HTMLDivElement;
  const showCreateVideoPopup = (event: MouseEvent) => {
    event.stopImmediatePropagation();
    document.addEventListener("click", handleClickOutsideCreateVideoPopup);
    setShow(true);
    setPopup(Popup.CreateVideo);
  };

  const showAuthPopup = (event: MouseEvent) => {
    event.stopImmediatePropagation();
    document.addEventListener("click", handleClickOutsideLoginPopup);
    setShow(true);
    setPopup(Popup.Auth);
  };

  const handleClickOutsideCreateVideoPopup = (event: MouseEvent) => {
    if (!refCreateVideo.contains(event.target as Node)) {
      setShow(false);
      document.removeEventListener("click", handleClickOutsideCreateVideoPopup);
    }
  };

  const handleClickOutsideLoginPopup = (event: MouseEvent) => {
    if (!refAuth.contains(event.target as Node)) {
      setShow(false);
      document.removeEventListener("click", handleClickOutsideLoginPopup);
    }
  };

  return (
    <div class="chat-room-sidebar">
      <div class="live-icon">
        <img src={LiveIcon} onclick={showCreateVideoPopup} />
      </div>
      <div class="bookmark-icon">
        <img src={BookmarkIcon} onclick={showAuthPopup} />
      </div>
      <div class="login-icon">
        <img id="user-avatar" src={LoginIcon} onclick={showAuthPopup} />
      </div>

      <Switch>
        <Match when={show() && popup() === Popup.Auth}>
          <div ref={refAuth!}>
            <AuthPopup status={true} />
          </div>
        </Match>
        <Match when={show() && popup() === Popup.CreateVideo}>
          <div ref={refCreateVideo!}>
            <CreateVideoPopup
              status={true}
              refreshBroadcasts={props.refreshBroadcasts}
            />
          </div>
        </Match>
      </Switch>
    </div>
  );
};
export default Sidebar;
