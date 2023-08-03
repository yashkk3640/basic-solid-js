import { createSignal } from "solid-js";
import { useUserContext } from "./context/UserContext";

const LoginScreen = () => {
  const { username, role, setUsername, setRole } = useUserContext();
  const [user, setUser] = createSignal({ username: "", password: "" });

  const doLogin = () => {
    if (user().username === "admin" && user().password === "test123") {
      setUsername("admin");
      setRole("user");
    } else if (
      user().username === "ykhatri" &&
      user().password === "ykhatri123"
    ) {
      setUsername("ykhatri");
      setRole("admin");
    }
  };

  return (
    <div class="d-flex min-vh-100 align-items-center">
      <div class="d-flex flex-column justify-context-center align-items-center w-100 max-vh-25">
        <div class="fw-bold fs-2 text-opacity-75 text-secondary">Login</div>
        <input
          class="my-2 mx-auto form-control w-25"
          value={user().username}
          placeholder="Enter Username ..."
          onchange={(e) => setUser((u) => ({ ...u, username: e.target.value }))}
        />
        <input
          class="my-2 mx-auto form-control w-25"
          value={user().password}
          placeholder="Enter Password ..."
          onchange={(e) => setUser((u) => ({ ...u, password: e.target.value }))}
        />
        <button
          type="button"
          class="btn btn-secondary active w-25 mx-auto my-2 "
          data-bs-toggle="button"
          aria-pressed="true"
          onClick={doLogin}
        >
          Login
        </button>
        {username()}
      </div>
    </div>
  );
};

export default LoginScreen;
