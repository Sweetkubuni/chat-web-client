import "@fortawesome/fontawesome-free/css/all.css";
import "~/styles/home-page.css";
import ChatRooms from "~/components/ChatRooms/ChatRooms";
import LoadingIcon from "~/images/loading.png";

export default function Home() {
  return (
    <main>
      <ChatRooms />
      <div id="overlay" style="display:none;">
        <div class="overlay-content">
          <img class="loading-icon" src={LoadingIcon} />
          <p id="register-info">Please wait...</p>
        </div>
      </div>
    </main>
  );
}
