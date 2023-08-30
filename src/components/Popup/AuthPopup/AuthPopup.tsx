import { createSignal, createEffect, Switch, Match } from "solid-js";
import "./AuthPopup.css";
import LoginForm from "~/components/Form/LoginForm";
import SignUpForm from "~/components/Form/SignUpForm";

interface Status {
  status: boolean;
}
enum AuthMode {
  LOGIN = "login",
  SIGN_UP = "sign_up",
}
export default function AuthPopup(props: Status) {
  const [show, setShow] = createSignal<boolean>(false);
  const [mode, setMode] = createSignal<AuthMode>(AuthMode.LOGIN);

  createEffect(() => {
    setShow(props.status);
  });

  const showLogin = (event: MouseEvent) => {
    event.stopImmediatePropagation();
    setMode(AuthMode.LOGIN);
  };

  const showSignUp = (event: MouseEvent) => {
    event.stopImmediatePropagation();
    setMode(AuthMode.SIGN_UP);
  };

  return (
    <>
      <div class="block" id={show() ? "block-active" : ""}>
        <div class="block-container">
          <div class="content">
            <div class="top-content">
              <div class="title">
                <div
                  class={`title-log ${
                    mode() === AuthMode.LOGIN ? "active" : ""
                  }`}
                  onclick={showLogin}
                >
                  login
                </div>
                <div
                  class={`title-log ${
                    mode() === AuthMode.SIGN_UP ? "active" : ""
                  }`}
                  onclick={showSignUp}
                >
                  sign up
                </div>
              </div>
            </div>
            <Switch>
              <Match when={mode() === AuthMode.LOGIN}>
                <LoginForm onSuccess={() => setShow(false)} />
              </Match>
              <Match when={mode() === AuthMode.SIGN_UP}>
                <SignUpForm onSuccess={() => setMode(AuthMode.LOGIN)} />
              </Match>
            </Switch>
          </div>
        </div>
      </div>
    </>
  );
}
