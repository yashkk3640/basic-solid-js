import { createSignal } from "solid-js";

const Home = () => {
  const [input, setInput] = createSignal("");
  return (
    <div class="d-flex flex-column ">
      <div>Home</div>
      <input
        class="mx-2"
        value={input()}
        onChange={(e) => setInput(e.target.value)}
      />
      <div>
        <button class="col-1 m-2" onClick={() => console.log("input", input())}>
          Log
        </button>
        <button type="button" class="btn btn-primary" data-bs-toggle="button">
          Toggle button
        </button>
        <button
          type="button"
          class="btn btn-secondary active"
          data-bs-toggle="button"
          aria-pressed="true"
        >
          Active toggle button
        </button>
        <button
          type="button"
          class="btn btn-secondary"
          disabled
          data-bs-toggle="button"
        >
          Disabled toggle button
        </button>
      </div>
    </div>
  );
};

export default Home;
