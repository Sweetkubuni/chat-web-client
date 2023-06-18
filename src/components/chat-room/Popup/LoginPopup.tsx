import {createSignal, createEffect, Show} from "solid-js";
import "./LoginPopup.css";
import Avatar from "~/images/img_avatar.png";

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

  let overlay = document.getElementById("overlay");
  let registerInfo = document.getElementById("register-info");

  const register = (event) => {
    let usernameElement = document.getElementsByName("register-username");

    // let username = "";
    // if (usernameElement) {
    //     username = usernameElement[0].value;
    //     if (username.length == 0) {
    //         //
    //     }
    // }
    event.stopImmediatePropagation();

    // registerInfo.innerText = "Please wait..."

    overlay.style.display = "flex";

    setTimeout(function() {
      registerInfo.innerText = "Register successfully";
    }, 1000);

    setTimeout(function() {
      overlay.style.display = "none";
      showLogin();
        },3000
    );
  }

  const login = () => {
    overlay.style.display = "flex";
    registerInfo.innerText = "Please wait...";
    setTimeout(function() {
      registerInfo.innerText = "Login successfully";
    }, 1000);
    setTimeout(function() {
          overlay.style.display = "none";
          setValue(false);
          let avatar = document.getElementById("user-avatar");
          avatar.setAttribute("src", Avatar);
        },3000
    );

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
                    <button type="button" class='btn-submit' onclick={login}>
                      <div class='btn-submit-title'>submit</div>
                    </button>
                  </div>
                </form>
              </Show>
              <Show
                  when={signUp()}
              >
                <form action="" class="post-form" id="register">
                  <div class='main-form'>
                    <div class='group-main'>
                      <input
                          class='input-value'
                          type="text"
                          placeholder="example@blah.com"
                          name="register-username"
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
                    <button type="button" id="register-btn" class='btn-submit' onclick={register}>
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
        