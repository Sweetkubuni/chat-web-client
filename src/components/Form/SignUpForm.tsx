import { createSignal } from "solid-js";
import { authRegister } from "~/lib/services/auth";
import "./Form.css";

interface SignUpFormProps {
  onSuccess: () => void;
}

const SignUpForm = (props: SignUpFormProps) => {
  const [email, setEmail] = createSignal<string>("");
  const [username, setUsername] = createSignal<string>("");
  const [password, setPassword] = createSignal<string>("");
  const [error, setError] = createSignal<string>("");
  const [success, setSuccess] = createSignal<boolean>(false);
  const overlay = document.getElementById("overlay");
  const registerInfo = document.getElementById("register-info");

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
        props.onSuccess();
      }, 1000);
    } catch (error) {
      if (overlay) {
        overlay.style.display = "none";
      }
      setError("Sign up failed");
    }
  };

  return (
    <form class="post-form" id="register">
      <div class="main-form">
        <div class="group-main">
          <div class="group-main">
            <input
              class="input-value"
              name="username"
              placeholder="user name"
              onInput={(event) => setUsername(event.target.value)}
            ></input>
          </div>
          <input
            class="input-value"
            type="text"
            placeholder="example@blah.com"
            name="register-username"
            onInput={(event) => setEmail(event.target.value)}
          ></input>
        </div>
        <div class="group-main">
          <input
            class="input-value"
            type="password"
            name="password"
            placeholder="password"
            onInput={(event) => setPassword(event.target.value)}
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
  );
};

export default SignUpForm;
