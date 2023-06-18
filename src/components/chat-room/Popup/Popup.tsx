import { createSignal, createEffect} from "solid-js";
import "./Popup.css";

interface Status{
  status:boolean
}

export default function Popup(props: Status) {
    
    const [value, setValue] = createSignal<boolean>(false);
    

 

    createEffect(() => {
        setValue(props.status)
        console.log(value())

      });
    return (
      <>
        <div class="block"  id={value()?"block-actie" : ""} >
            <div class="block-container">
            <div class="content">
                <div class="top-content">
        <div class="title">
            <div class="title-log">
                <p>login</p>
            </div>
            <div class="sign-up-log">
                <p>sign up</p>
            </div>
            {/*<h5>sign up</h5>*/}
        </div>

         </div>
         <form action="" class="post-form"  id="login">
                <div class='main-form'>
                        <div class='group-main'>     
                        <input
                                class='input-value'
                                type="text"
                                placeholder="example@blah.com"
                                name="username"
                            ></input>
                        </div>
                        <div class='group-main'>
                       
                        <input
                            class='input-value'
                            type="password"
                            name="password"
                            placeholder="password"
                        ></input>
                        </div>
                        <div class='group-main'>

                        <input
                            class='input-value'
                            type="password"
                            name="confirm-password"
                            placeholder="confirm password"
                        ></input>
                        </div>
                </div>
                <div class='btn-form'>
                        <button type="submit" class='btn-submit' onclick={()=>setValue(false)}>
                        <div class='btn-submit-title'>submit</div>
                        </button>               
                 </div>
                </form>
        </div>
     </div>
    </div>
            </>
            );
        }
        