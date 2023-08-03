import { createSignal, onCleanup, onMount } from "solid-js";
import MaskInSvg from "./MaskInSvg";
import MaskInD3 from "./MaskInD3";
import AllShapesD3 from "./AllShapesD3";
import CirclesSinD3 from "./CirclesSinD3";
import { resetWindowSize } from "./utils";
import SinCosD3 from "./SinCosD3";
import CircularRink from "./CircularRink";
import D3ScatterPlot from "./D3ScatterPlot";
import AnimatedD3ScatterPlot from "./AnimatedD3ScatterPlot";
import MenuD3ScatterPlot from "./MenuD3ScatterPlot";

const NAME_COMPONENT_MAPPER = {
  "svg-mask": { name: "Masking in Svg", component: MaskInSvg },
  "d3-mask": { name: "Masking in D3", component: MaskInD3 },
  "d3-all-shapes": { name: "All Shapes in D3", component: AllShapesD3 },
  "d3-sin-circles": { name: "Sin Circles in D3", component: CirclesSinD3 },
  "d3-sin-cos": { name: "Sin Cos in D3", component: SinCosD3 },
  "d3-ring": { name: "Circular Rink in D3", component: CircularRink },
  "d3-scatter-plot": { name: "D3 Scatter Plot", component: D3ScatterPlot },
  "animated-d3-scatter-plot": {
    name: "Animated D3 Scatter Plot",
    component: AnimatedD3ScatterPlot,
  },
  "menu-d3-scatter-plot": {
    name: "Menu D3 Scatter Plot",
    component: MenuD3ScatterPlot,
  },
};

// export const [windowSize, setWindowSize] = createSignal({
//   HEIGHT: Math.min(window.innerHeight, 700),
//   WIDTH: Math.min(window.innerWidth, 1200),
// });

// const { HEIGHT, WIDTH } = windowSize();
// const resetWindowSize = () =>
//   setWindowSize({
//     HEIGHT: Math.min(window.innerHeight, 700),
//     WIDTH: Math.min(window.innerWidth, 1200),
//   });

const DataVisualization = () => {
  const [compName, selectCompName] = createSignal("svg-mask");

  onMount(() => {
    window.addEventListener("resize", resetWindowSize);
  });

  onCleanup(() => {
    window.removeEventListener("resize", resetWindowSize);
  });

  return (
    <div class="data-visualization">
      <div class="fs-2 fw-bold">Data Visualization</div>
      <div class="d-flex mt-3 flex-rows justify-content-center">
        <label for="comp-selector" class="p-2">
          Select Component
        </label>
        <select
          class="form-select w-25"
          value={compName()}
          id="comp-selector"
          onChange={(e) => selectCompName(e.target.value)}
        >
          {Object.entries(NAME_COMPONENT_MAPPER).map(([id, { name }]) => (
            <option
              class="m-2 p-2"
              value={id}
              style={{ margin: "10px", "line-height": "40px" }}
            >
              {name}
            </option>
          ))}
        </select>
      </div>
      {NAME_COMPONENT_MAPPER?.[compName()]?.component}
    </div>
  );
};

export default DataVisualization;
