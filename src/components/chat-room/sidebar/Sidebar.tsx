import type { FC } from "react";
import "./Sidebar.css/";
import LiveIcon from "~/images/live.png";
import BookmarkIcon from "~/images/bookmark.png";
import LoginIcon from "~/images/login.png";
import {createSignal, createEffect, Show, onCleanup, onMount} from "solid-js";
import LoginPopup from "../Popup/LoginPopup";
import CreateVideoPopup from "../Popup/CreateVideoPopup";

interface SidebarProps {}

const Sidebar: FC<SidebarProps> = ({}) => {
  const [value, setValue] = createSignal<boolean>(true);
    let ref: HTMLDivElement;
    const [show, setShow] = createSignal(false);
    const [showCreateVideo, setShowCreateVideo] = createSignal(false);

    const handleClick = (event: MouseEvent) => {
        if(!ref.contains(event.target)) {
            setShow(false);
        }
    };

    const showCreateVideoPopup = (event:any) => {
        document.addEventListener('click', handleClickCreateVideo);
        setShowCreateVideo(true);
        event.stopImmediatePropagation();
    }

    const handleClickCreateVideo = (event: MouseEvent) => {
        if(!ref.contains(event.target)) {
            setShowCreateVideo(false);
        }
    };

    const showPopup = (event:any) => {
        document.addEventListener('click', handleClick);
        setShow(true);
        event.stopImmediatePropagation();
    }

  return (
    <div class="chat-room-sidebar">
        <div class="live-icon">
            <img src={LiveIcon} onclick={showCreateVideoPopup} />
        </div>
        <div class="bookmark-icon">
            <img src={BookmarkIcon} onclick={showPopup} />
        </div>
        <div class="login-icon">
            <img src={LoginIcon} onclick={showPopup} />
        </div>
        <div ref={ref!}>
            {show() ? <LoginPopup status={value()} /> : ''}
        </div>
        <div ref={ref!}>
            {showCreateVideo() ? <CreateVideoPopup status={value()} /> : ''}
        </div>
    </div>
  );
};
export default Sidebar;
