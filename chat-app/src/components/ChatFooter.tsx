import { Accessor, Setter } from "solid-js";

interface ListArg {
    sendMessage: (message: string) => Promise<void>
}

export default function ChatFooter(props: ListArg) {
    let input : any;
    return ( 
    <div class="chat-footer">
        <input type="text" class="message-input" placeholder="Type your message here..." ref={input} />
        <button class="send-button" onClick={() => { if(!input.value.trim()) return;  props.sendMessage(input.value); input.value = "";} }>Send</button>
    </div> 
  );
}
