import { createSignal, onCleanup } from "solid-js";

type EventStore = {
  eventData: string;
  setEventData: (data: string) => void;
};

export const EventStore = (() => {
  const [eventData, setEventData] = createSignal("");

  const unsubscribe = () => {
    // Clean up any event listeners or subscriptions here if necessary
  };

  onCleanup(unsubscribe);

  return {
    eventData,
    setEventData,
  };
})();
