import type { FC } from "react";
import "./RoomCard.css";

interface RoomCardProps {}

const RoomCard: FC<RoomCardProps> = ({}) => {
  return (
    <div class="room-card">
      <div class="room-card-thumbnail" />
      <div class="room-card-title">Video Title</div>
    </div>
  );
};
export default RoomCard;
