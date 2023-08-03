import { createSignal } from "solid-js";

export const [windowSize, setWindowSize] = createSignal({
  HEIGHT: Math.min(window.innerHeight, 700),
  WIDTH: Math.min(window.innerWidth, 1200),
});

// const { HEIGHT, WIDTH } = windowSize();
export const resetWindowSize = () => {
  console.log("resize called");
  setWindowSize({
    HEIGHT: Math.min(window.innerHeight, 700),
    WIDTH: Math.min(window.innerWidth, 1200),
  });
};
