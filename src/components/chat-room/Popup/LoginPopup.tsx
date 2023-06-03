import {createSignal, createEffect, Show} from "solid-js";
import "./LoginPopup.css";

interface Status{
  status:boolean
}

export default function LoginPopup(props: Status) {
    
    const [value, setValue] = createSignal<boolean>(false);
    

 

    createEffect(() => {
        setValue(props.status)
        // console.log(value())
      });

    const [loggedIn, setLoggedIn] = createSignal(true);
    const showLogin = () => {
        setLoggedIn(true);
        setSignUp(false);
    }
    const [signUp, setSignUp] = createSignal(false);
    const showSignUp = () => {
        setLoggedIn(false);
        setSignUp(true);
    }
    return (
      <>
        <div class="block"  id={value()?"block-active" : ""} >
            <div class="block-container">
            <div class="content">
                <div class="top-content">
                    <div class="title">
                <div class={loggedIn()?"title-log border-surround" : "title-log"} onclick={showLogin}>
                    <p>login</p>
                </div>
                <div class={signUp()?"sign-up-log border-surround" : "sign-up-log"} onclick={showSignUp}>
                    <p>sign up</p>
                </div>
            {/*<h5>sign up</h5>*/}
        </div>

         </div>
                <Show
                    when={loggedIn()}
                >
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
            </div>
            <div class='btn-form'>
                <button type="submit" class='btn-submit' onclick={()=>setValue(false)}>
                    <div class='btn-submit-title'>submit</div>
                </button>
            </div>
            </form>
                </Show>
                <Show
                    when={signUp()}
                >
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
                </Show>
        </div>
     </div>
    </div>
            </>
            );
        }
        