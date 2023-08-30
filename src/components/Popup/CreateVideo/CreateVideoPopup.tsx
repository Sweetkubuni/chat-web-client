import { createSignal, createEffect } from "solid-js";
import "./CreateVideoPopup.css";
import UploadIcon from "~/images/upload.png";
import { createBroadcasts } from "~/lib/services/broadcasts";
interface Status {
  status: boolean;
  refreshBroadcasts: () => void;
}

export default function CreateVideoPopup(props: Status) {
  const [value, setValue] = createSignal<boolean>(true);
  const [name, setName] = createSignal<string>("");
  const [loading, setLoading] = createSignal<boolean>(false);
  const [error, setError] = createSignal<string>("");
  const [description, setDescription] = createSignal<string>("");
  createEffect(() => {
    setValue(props.status);
  });

  const handleUpload = async (event: any) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response: any = await createBroadcasts({
        room_name: name(),
        owner: "1",
        description: description(),
        video_source: "",
      });
      setLoading(false);
      if (response.message) {
        setError(response.message);

        return;
      }
      setLoading(false);
      props.refreshBroadcasts();
      reset();
    } catch (error) {
      setLoading(false);
      setError("Something went wrong");
      console.log(error);
    }
  };
  const reset = () => {
    setName("");
    setError("");
    setDescription("");
    setValue(false);
  };

  return (
    <>
      <div class="create-video-block">
        <div class="block" id={value() ? "block-active" : ""}>
          <div class="create-video-container">
            <form class="post-form" id="login" onSubmit={handleUpload}>
              <div class="video-title">
                <input
                  class="input-value"
                  type="text"
                  placeholder="Video Title"
                  onChange={(event) => setName(event.target.value)}
                ></input>
              </div>
              <div>
                <textarea
                  class="video-intro"
                  id="video-description"
                  rows={4}
                  placeholder="Please write a short description of your video..."
                  onChange={(event) => setDescription(event.target.value)}
                />
                <p class="word-count">
                  <span id="character-count">0</span>/200
                </p>
              </div>
              <div class="upload-video-area">
                <img class="upload-icon" src={UploadIcon} />
                <p>Please upload Introduction video</p>
              </div>
              {error() && <p class="error-message">{error()}</p>}
              <button class="upload-btn" type="submit">
                {loading() ? "Loading..." : "Upload"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
