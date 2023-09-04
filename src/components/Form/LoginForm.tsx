import { createSignal } from "solid-js";
import { authLogin } from "~/lib/services/auth";
import Avatar from "~/images/img_avatar.png";
import "./Form.css"

interface LoginFormProps {
  onSuccess: () => void;
}

const LoginForm = (props: LoginFormProps) => {
  const [email, setEmail] = createSignal<string>("");
  const [password, setPassword] = createSignal<string>("");
  const [error, setError] = createSignal<string>("");
  const [success, setSuccess] = createSignal<boolean>(false);

  const overlay = document.getElementById("overlay");
  const registerInfo = document.getElementById("register-info");

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
        props.onSuccess();
      }, 1000);
    } catch (error) {
      if (overlay) {
        overlay.style.display = "none";
      }
      setError("Sign in failed");
    }
  };

  return (
    <form class="post-form" id="login">
      <div class="main-form">
        <div class="group-main">
          <input
            class="input-value"
            type="text"
            placeholder="example@blah.com"
            name="username"
            onInput={(event) => setEmail(event.target.value)}
          />
        </div>
        <div class="group-main">
          <input
            class="input-value"
            type="password"
            name="password"
            placeholder="password"
            onInput={(event) => setPassword(event.target.value)}
          />
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
  );
};

export default LoginForm;
