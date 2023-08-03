import styles from "./App.module.css";
import About from "./about";
import Contact from "./contact";
import Home from "./home";
import { Router, Routes, Route, A } from "@solidjs/router";
import "bootstrap/dist/css/bootstrap.min.css";
import Grid from "./grid";
import UserContextProvider, { useUserContext } from "./context/UserContext";
import Mask from "./dataVisualization/MaskInSvg";
import DataVisualization from "./dataVisualization";

const App = () => {
  const { logout } = useUserContext();
  return (
    <Router>
      <div class={styles.App}>
        <header class={styles.header}>
          {/* <a
            class={styles.link}
            href="https://github.com/solidjs/solid"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn Solid
          </a> */}
          <A class={styles.link} href="/">
            Home
          </A>
          <A class={styles.link} href="/about">
            About
          </A>
          <A class={styles.link} href="/contact">
            Contact
          </A>
          <A class={styles.link} href="/Grid">
            Grid
          </A>
          <A class={styles.link} href="/data-visualization-d3">
            D3
          </A>
          <a
            onClick={logout}
            href=""
            class={styles.link}
            rel="noopener noreferrer"
          >
            Logout
          </a>
        </header>

        <Routes>
          <Route path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route path="/grid" component={Grid} />
          <Route path="/data-visualization-d3" component={DataVisualization} />
        </Routes>
      </div>
    </Router>
  );
};

const AppWithContext = () => (
  <UserContextProvider>
    <App />
  </UserContextProvider>
);

export default AppWithContext;
