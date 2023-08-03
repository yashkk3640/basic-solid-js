import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
// import path from "path"; //
// import devtools from 'solid-devtools/vite';

export default defineConfig({
  // root: path.resolve(__dirname, "src"), //
  plugins: [
    /* 
    Uncomment the following line to enable solid-devtools.
    For more info see https://github.com/thetarnav/solid-devtools/tree/main/packages/extension#readme
    */
    // devtools(),
    solidPlugin(),
  ],
  server: {
    port: 3000,
  },
  build: {
    target: "esnext",
    outDir: "docs", // outDir: "../dist",
  },
});
