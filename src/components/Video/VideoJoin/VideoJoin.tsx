import { createSignal } from "solid-js";
import { ListElem, MessageType } from "~/components/Chat/ChatBody/ChatBody";
import { Slider, SliderProvider } from "solid-slider";
import LiveKitHelper from "~/lib/livekit/livekit-helper";
import { usernames } from "~/testdata/data";
import "./VideoJoin.css";
import "solid-slider/slider.css";

enum Command {
  SUBSCRIBE = 0,
  UNSUBSCRIBE = 1,
  SEND_MESSAGE = 2,
}

interface Message {
  command: Command;
  channel: string;
  content: string;
}

interface Content {
  username: string;
  message: string;
}

export default function VideoJoin({
  livekitHelper,
}: {
  livekitHelper: LiveKitHelper;
}) {
  //TODO: replace userId with correct one when auth done
  let socket: WebSocket;
  let containerRef: any;
  const userId = Math.floor(Math.random() * 25);
  const username = usernames[userId];

  const [messages, setMessages] = createSignal<Array<ListElem>>([]);

  const addMessage = async (message: ListElem) => {
    setMessages([...messages(), message]);
    if (messages().length > 10) {
      const tempMessages = [...messages()];
      tempMessages.shift();
      setMessages(tempMessages);
    }
  };
  const toggleVideo = async (message: ListElem) => {
    await livekitHelper.toggleVideo();
  };

  const toggleAudio = async (message: ListElem) => {
    await livekitHelper.toggleAudio();
  };

  const sendMessage = async (msg: string) => {
    if (livekitHelper.enterText(msg)) {
      const content: Content = {
        username: username,
        message: msg,
      };
      addMessage({
        content: {
          username: content.username,
          content: content.message,
        },
        type: MessageType.SEND,
      });
    }
  };

  const handleData = (msg: Uint8Array, participant: string) => {
    addMessage({
      content: {
        username: participant,
        content: new TextDecoder().decode(msg),
      },
      type: MessageType.SEND,
    });
  };

  return (
    <SliderProvider>
      <Slider options={{ loop: true }}>
        <div class="join-window" id="joins-area">
          <div id="join-element" class="grid-style"></div>
          <div class="video-action">
            <div id="item-current-user" class="action-item action-item-bg">
              <i class="fas fa-light fa-microphone"></i>
            </div>
          </div>
        </div>

        <div class="join-window" id="joins-area">
          <div id="join-element" class="grid-style"></div>
          <div class="video-action">
            <div class="action-item action-item-bg">
              <i class="fas fa-light fa-microphone"></i>
            </div>
          </div>
        </div>

        <div class="join-window" id="joins-area">
          <div id="join-element" class="grid-style"></div>
          <div class="video-action">
            <div class="action-item action-item-bg">
              <i class="fas fa-light fa-microphone"></i>
            </div>
          </div>
        </div>

        <div class="join-window" id="joins-area">
          <div id="join-element" class="grid-style"></div>
          <div class="video-action">
            <div class="action-item action-item-bg">
              <i class="fas fa-light fa-microphone"></i>
            </div>
          </div>
        </div>

        <div class="join-window" id="joins-area">
          <div id="join-element" class="grid-style"></div>
          <div class="video-action">
            <div class="action-item action-item-bg">
              <i class="fas fa-light fa-microphone"></i>
            </div>
          </div>
        </div>
        <div class="join-window" id="joins-area">
          <div id="join-element" class="grid-style"></div>
          <div class="video-action">
            <div class="action-item action-item-bg">
              <i class="fas fa-light fa-microphone"></i>
            </div>
          </div>
        </div>
        <div class="join-window" id="joins-area">
          <div id="join-element" class="grid-style"></div>
          <div class="video-action">
            <div class="action-item action-item-bg">
              <i class="fas fa-light fa-microphone"></i>
            </div>
          </div>
        </div>
      </Slider>
      {/*<SliderButton prev>Previous</SliderButton>*/}
      {/*<SliderButton next>Next</SliderButton>*/}
    </SliderProvider>
  );
}
