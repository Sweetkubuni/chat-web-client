import { createSignal, createEffect, Setter } from "solid-js";
import "./MenuPopup.css";
import LoginPopup from "~/components/chat-room/Popup/LoginPopup";
import CreateVideoPopup from "~/components/chat-room/Popup/CreateVideoPopup";

interface MenuPopupProps {
  status: boolean;
  refreshBroadcasts: () => void;
}

export default function MenuPopup(props: MenuPopupProps) {
  const [value, setValue] = createSignal<boolean>(false);
  const [show, setShow] = createSignal(false);
  const [showCreateVideo, setShowCreateVideo] = createSignal(false);
  let refCreateVid: HTMLDivElement;
  createEffect(() => {
    setValue(props.status);
  });

  const showLogin = (event: any) => {
    setShow(true);
    setValue(true);
    event.stopImmediatePropagation();
    var divToHide = document.getElementById("block-menu");
    divToHide.style.display = "none";
  };

  const showCreateVideoPopup = (event: any) => {
    document.addEventListener("click", handleClickCreateVideo);
    setShowCreateVideo(true);
    event.stopImmediatePropagation();
    var divToHide = document.getElementById("block-menu");
    divToHide.style.display = "none";
  };

  const handleClickCreateVideo = (event: MouseEvent) => {
    if (!refCreateVid.contains(event.target)) {
      setShowCreateVideo(false);
    }
  };

  return (
    <div>
      <div class="block" id={"block-menu"}>
        <ul>
          <li onclick={showCreateVideoPopup}>Boardcast</li>
          <li onclick={showCreateVideoPopup}>Favourites</li>
          <li onclick={showLogin}>Login</li>
        </ul>
      </div>
      {/* {showLoginValue() ? <LoginPopup status={value()} /> : ''} */}

      {show() ? <LoginPopup status={value()} /> : ""}
      <div ref={refCreateVid!}>
        {showCreateVideo() ? (
          <CreateVideoPopup
            status={value()}
            refreshBroadcasts={props.refreshBroadcasts}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
