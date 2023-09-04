import { createSignal, createEffect, Show } from "solid-js";
import "./LoginPopup.css";
import Avatar from "~/images/img_avatar.png";
import { authLogin, authRegister } from "~/lib/services/auth";

interface Status {
  status: boolean;
}

export default function LoginPopup(props: Status) {
  const [value, setValue] = createSignal<boolean>(false);
  const [email, setEmail] = createSignal<string>("");
  const [username, setUsername] = createSignal<string>("");
  const [password, setPassword] = createSignal<string>("");
  const [error, setError] = createSignal<string>("");
  const [success, setSuccess] = createSignal<boolean>(false);

  createEffect(() => {
    setValue(props.status);
  });

  const [loggedIn, setLoggedIn] = createSignal(true);
  const showLogin = () => {
    setLoggedIn(true);
    setSignUp(false);
    setSuccess(false);
  };
  const [signUp, setSignUp] = createSignal(false);
  const showSignUp = () => {
    setLoggedIn(false);
    setSignUp(true);
    setSuccess(false);
  };

  let overlay = document.getElementById("overlay");
  let registerInfo = document.getElementById("register-info");

  const register = async () => {
    setError("");
    setSuccess(false);
    try {
      if (registerInfo && overlay) {
        registerInfo.innerText = "Please wait...";
        overlay.style.display = "flex";
      }

      const data = await authRegister(username(), email(), password());
      if (overlay) {
        overlay.style.display = "none";
      }
      if (!data.userId) {
        setError(data.message || "Sign up failed");
        return;
      }
      setSuccess(true);
      setTimeout(() => {
        showLogin();
      }, 1000);
    } catch (error) {
      if (overlay) {
        overlay.style.display = "none";
      }
      setError("Sign up failed");
    }
  };

  const login = async () => {
    setError("");
    setSuccess(false);
    try {
      if (registerInfo && overlay) {
        registerInfo.innerText = "Please wait...";
        overlay.style.display = "flex";
      }

      const data = await authLogin(email(), password());
      if (overlay) {
        overlay.style.display = "none";
      }

      if (!data.token) {
        setError(data.message || "Sign in failed");
        return;
      }
      // Login success

      setSuccess(true);
      let avatar = document.getElementById("user-avatar");
      avatar && avatar.setAttribute("src", Avatar);
      sessionStorage.setItem("token", data.token);
      setTimeout(() => {
        setValue(false);
      }, 1000);
    } catch (error) {
      if (overlay) {
        overlay.style.display = "none";
      }
      setError("Sign in failed");
    }
  };
  return (
    <>
      <div class="block" id={value() ? "block-active" : ""}>
        <div class="block-container">
          <div class="content">
            <div class="top-content">
              <div class="title">
                <div
                  class={`title-log ${loggedIn() ? "active" : ""}`}
                  onclick={showLogin}
                >
                  login
                </div>
                <div
                  class={`title-log ${signUp() ? "active" : ""}`}
                  onclick={showSignUp}
                >
                  sign up
                </div>
              </div>
            </div>
            <Show when={loggedIn()}>
              <form class="post-form" id="login">
                <div class="main-form">
                  <div class="group-main">
                    <input
                      class="input-value"
                      type="text"
                      placeholder="example@blah.com"
                      name="username"
                      onChange={(event) => setEmail(event.target.value)}
                    ></input>
                  </div>
                  <div class="group-main">
                    <input
                      class="input-value"
                      type="password"
                      name="password"
                      placeholder="password"
                      onChange={(event) => setPassword(event.target.value)}
                    ></input>
                  </div>
                </div>
                {error() && <p class="error-message">{error()}</p>}
                {success() && <p class="success-message">Success!</p>}
                <div class="btn-form">
                  <button type="button" class="btn-submit" onclick={login}>
                    <div class="btn-submit-title">submit</div>
                  </button>
                </div>
              </form>
            </Show>
            <Show when={signUp()}>
              <form class="post-form" id="register">
                <div class="main-form">
                  <div class="group-main">
                    <div class="group-main">
                      <input
                        class="input-value"
                        name="username"
                        placeholder="user name"
                        onChange={(event) => setUsername(event.target.value)}
                      ></input>
                    </div>
                    <input
                      class="input-value"
                      type="text"
                      placeholder="example@blah.com"
                      name="register-username"
                      onChange={(event) => setEmail(event.target.value)}
                    ></input>
                  </div>
                  <div class="group-main">
                    <input
                      class="input-value"
                      type="password"
                      name="password"
                      placeholder="password"
                      onChange={(event) => setPassword(event.target.value)}
                    ></input>
                  </div>
                </div>
                {error() && <p class="error-message">{error()}</p>}
                {success() && <p class="success-message">Success!</p>}
                <div class="btn-form">
                  <button
                    type="button"
                    id="register-btn"
                    class="btn-submit"
                    onclick={register}
                  >
                    <div class="btn-submit-title">submit</div>
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
