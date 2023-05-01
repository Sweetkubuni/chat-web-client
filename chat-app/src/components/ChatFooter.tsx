export default function ChatFooter(props: any) {
    let input : any;
    return ( 
    <div class="chat-footer">
        <input type="text" class="message-input" placeholder="Type your message here..." ref={input} />
        <button class="send-button" onClick={() => { if(!input.value.trim()) return;  props.setMsg(input.value); input.value = "";} }>Send</button>
    </div> 
  );
}