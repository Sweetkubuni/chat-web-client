import type { FC } from "react";
import "./RoomCard.css";

interface RoomCardProps {}

const RoomCard: FC<RoomCardProps> = ({}) => {
  return (
    <div class="room-card">
        <a class="card-link" href="/">
            <div class="room-card-thumbnail" />
        </a>
        <a href="/">
            <div class="room-card-title">Video Title</div>
        </a>
    </div>
  );
};
export default RoomCard;
