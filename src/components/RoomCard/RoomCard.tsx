import "./RoomCard.css";

interface RoomCardProps {
  name: string;
}

const RoomCard = (props: RoomCardProps) => {
  return (
    <div class="room-card">
      <a class="card-link" href="/chat-room">
        <div class="room-card-thumbnail" />
      </a>
      <a class="card-title-link" href="/chat-room">
        <div class="room-card-title">{props.name}</div>
      </a>
    </div>
  );
};

export default RoomCard;
