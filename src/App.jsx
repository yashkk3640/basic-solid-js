import styles from "./App.module.css";
import About from "./about";
import Contact from "./contact";
import Home from "./home";
import { Router, Routes, Route, A } from "@solidjs/router";
import "bootstrap/dist/css/bootstrap.min.css";
import Grid from "./grid";

function App() {
  return (
    <Router>
      <div class={styles.App}>
        <header class={styles.header}>
          <div>
            Edit <code>src/App.jsx</code> and save to reload.
          </div>
          <a
            class={styles.link}
            href="https://github.com/solidjs/solid"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn Solid
          </a>
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
        </header>

        <Routes>
          <Route path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route path="/grid" component={Grid} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
