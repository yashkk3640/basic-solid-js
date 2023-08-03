import {
  csv,
  select,
  dispatch,
  //   scaleLinear,
  //   extent,
  //   axisLeft,
  //   axisBottom,
  //   transition,
} from "d3";
import { createEffect } from "solid-js";
import { scatterPlot } from "./scatterPlot";
const csvUrl = [
  "https://gist.githubusercontent.com/",
  "curran/", // User
  "a08a1080b88344b0c8a7/", // Id of the Gist
  "raw/0e7a9b0a5d22642a06d3d5b9bcbad9890c8ee534/", // commit
  "iris.csv", // File name
].join("");

const parseRow = (d) => {
  d.sepal_length = +d.sepal_length;
  d.sepal_width = +d.sepal_width;
  d.petal_length = +d.petal_length;
  d.petal_width = +d.petal_width;
  return d;
};

const menu = () => {
  let id;
  let labelText;
  let options;
  const listeners = dispatch("change");
  // <label for="cars">Choose a car:</label>

  // <select name="cars" id="cars">
  //   <option value="volvo">Volvo</option>
  //   <option value="saab">Saab</option>
  //   <option value="mercedes">Mercedes</option>
  //   <option value="audi">Audi</option>
  // </select>
  const my = (selection) => {
    selection
      .selectAll("label")
      .data([null])
      .join("label")
      .attr("for", id)
      .text(labelText);

    selection
      .selectAll("select")
      .data([null])
      .join("select")
      .attr("id", id)
      .on("change", (event) => {
        listeners.call("change", null, event.target.value);
      })
      .selectAll("option")
      .data(options)
      .join("option")
      .attr("value", (d) => d.value)
      .text((d) => d.text);
  };

  my.id = function (_) {
    return arguments.length ? ((id = _), my) : id;
  };

  my.labelText = function (_) {
    return arguments.length ? ((labelText = _), my) : labelText;
  };

  my.options = function (_) {
    return arguments.length ? ((options = _), my) : options;
  };

  my.on = function () {
    var value = listeners.on.apply(listeners, arguments);
    return value === listeners ? my : value;
  };

  return my;
};

const HEIGHT = Math.min(window.innerHeight, 700);
const WIDTH = Math.min(window.innerWidth, 1200);

const MenuD3ScatterPlot = () => {
  //   const WIDTH = window.innerWidth;
  //   const HEIGHT = window.innerHeight;

  let divRef;

  createEffect(async () => {
    const svg = select(divRef)
      .append("svg")
      .attr("width", WIDTH)
      .attr("height", HEIGHT);

    const menuContainer = select(divRef)
      .append("div")
      .attr("class", "menu-container");

    const xMenu = menuContainer.append("div");
    const yMenu = menuContainer.append("div");

    const data = await csv(csvUrl, parseRow);

    const plot = scatterPlot(WIDTH, HEIGHT)
      .width(WIDTH)
      .height(HEIGHT)
      .data(data)
      .xValue((d) => d.petal_width)
      .yValue((d) => d.sepal_length)
      .margin({
        top: 20,
        right: 20,
        bottom: 40,
        left: 50,
      })
      .radius(5);

    svg.call(plot);

    const options = [
      { value: "petal_width", text: "Petal Width" },
      { value: "sepal_width", text: "Sepal Width" },
      { value: "petal_length", text: "Petal Length" },
      { value: "sepal_length", text: "Sepal Length" },
      { value: "species", text: "Species" },
    ];

    xMenu.call(
      menu()
        .id("x-menu")
        .labelText("X:")
        .options(options)
        .on("change", (column) => {
          svg.call(plot.xValue((d) => d[column]));
        })
    );
    yMenu.call(
      menu()
        .id("y-menu")
        .labelText("Y:")
        .options(options)
        .on("change", (column) => {
          svg.call(plot.yValue((d) => d[column]));
        })
    );
  });

  return <div ref={divRef} class="position-relative my-2"></div>;
};

export default MenuD3ScatterPlot;
