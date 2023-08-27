import type { FC } from "react";
import "./RoomCard.css";

interface RoomCardProps {
  name: string;
}

const RoomCard: FC<RoomCardProps> = ({ name }) => {
  return (
    <div class="room-card">
      <a class="card-link" href="/chat-room">
        <div class="room-card-thumbnail" />
      </a>
      <a class="card-title-link" href="/chat-room">
        <div class="room-card-title">{name}</div>
      </a>
    </div>
  );
};
export default RoomCard;
