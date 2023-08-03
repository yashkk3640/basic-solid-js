import {
  createContext,
  createEffect,
  createSignal,
  useContext,
} from "solid-js";
import LoginScreen from "../LoginScreen";

const NOOP = (_) => _;
const initContext = {
  username: NOOP,
  role: NOOP,
  setUsername: NOOP,
  setRole: NOOP,
};
export const UserContext = createContext(initContext);

const UserContextProvider = (props) => {
  const userInfo = JSON.parse(localStorage.getItem("logged-in-user") || "{}");
  const [username, setUsername] = createSignal(userInfo.username || "");
  const [role, setRole] = createSignal(userInfo.role || "");

  const logout = () => {
    setUsername("");
    setRole("");
    localStorage.setItem("logged-in-user");
  };

  createEffect(() => {
    const userInfo = JSON.stringify({ username: username(), role: role() });
    localStorage.setItem("logged-in-user", userInfo);
  });

  //   const login = (username, password) => {
  //     if (username === "admin" && password === "test123") {
  //       setUsername("admin");
  //       setRole("user");
  //       localStorage.setItem("logged-in-user", JSON.stringify({ user }));
  //     } else if (username === "ykhatri" && password === "ykhatri123") {
  //       setUsername("ykhatri");
  //       setRole("admin");
  //     }
  //   };

  return (
    <UserContext.Provider
      value={{ username, setUsername, role, setRole, logout }}
    >
      {username()?.trim() ? props.children : <LoginScreen />}
    </UserContext.Provider>
  );
};

export default UserContextProvider;

export const useUserContext = () => useContext(UserContext);
