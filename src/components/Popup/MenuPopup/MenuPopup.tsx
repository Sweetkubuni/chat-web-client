import { createSignal, createEffect, Switch, Match } from "solid-js";
import "./MenuPopup.css";
import CreateVideoPopup from "~/components/Popup/CreateVideo/CreateVideoPopup";
import AuthPopup from "~/components/Popup/AuthPopup/AuthPopup";

interface MenuPopupProps {
  status: boolean;
  refreshBroadcasts: () => void;
}
enum Popup {
  Auth = "AuthPopup",
  CreateVideo = "CreateVideo",
}

export default function MenuPopup(props: MenuPopupProps) {
  const [value, setValue] = createSignal<boolean>(false);
  const [show, setShow] = createSignal(false);
  const [popup, setPopup] = createSignal<Popup>(Popup.Auth);
  let refCreateVideo: HTMLDivElement;
  let refAuth: HTMLDivElement;
  createEffect(() => {
    setValue(props.status);
  });

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
    }
  };

  const handleClickOutsideLoginPopup = (event: MouseEvent) => {
    if (!refAuth.contains(event.target as Node)) {
      setShow(false);
    }
  };

  return (
    <div>
      <div class="block" id={"block-menu"}>
        <ul>
          <li onclick={showCreateVideoPopup}>Boardcast</li>
          <li onclick={showCreateVideoPopup}>Favourites</li>
          <li onclick={showAuthPopup}>Login</li>
        </ul>
      </div>

      <Switch>
        <Match when={show() && popup() === Popup.Auth}>
          <div ref={refAuth!}>
            <AuthPopup status={value()} />
          </div>
        </Match>
        <Match when={show() && popup() === Popup.CreateVideo}>
          <div ref={refCreateVideo!}>
            <CreateVideoPopup
              status={value()}
              refreshBroadcasts={props.refreshBroadcasts}
            />
          </div>
        </Match>
      </Switch>
    </div>
  );
}
