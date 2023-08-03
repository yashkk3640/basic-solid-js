import {
  csv,
  select,
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
// const xValue = (d) => d.petal_length;
// const yValue = (d) => d.sepal_length;
// const margin = {
//   top: 20,
//   right: 20,
//   bottom: 40,
//   left: 50,
// };
// const radius = 5;

const HEIGHT = Math.min(window.innerHeight, 700);
const WIDTH = Math.min(window.innerWidth, 1200);

// const scatterPlot = () => {
//   let width;
//   let height;
//   let data;
//   let xValue;
//   let yValue;
//   let margin;
//   let radius;

//   const my = (selection) => {
//     const x = scaleLinear()
//       .domain(extent(data, xValue))
//       .range([margin.left, WIDTH - margin.right]);

//     const y = scaleLinear()
//       .domain(extent(data, yValue))
//       .range([HEIGHT - margin.bottom, margin.top]);

//     const marks = data.map((d) => ({
//       x: x(xValue(d)),
//       y: y(yValue(d)),
//     }));

//     const t = transition().duration(1000);

//     const positionCircles = (circles) => {
//       circles.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
//     };

//     const initializeRadius = (circles) => {
//       circles.attr("r", 0);
//     };
//     const growRadius = (enter) => {
//       enter.transition(t).attr("r", radius);
//     };

//     const circles = selection
//       .selectAll("circle")
//       .data(marks)
//       .join(
//         (enter) =>
//           enter
//             .append("circle")
//             .call(positionCircles)
//             .call(initializeRadius)
//             .call(growRadius),
//         (update) =>
//           update.call((update) =>
//             update
//               .transition(t)
//               .delay((d, i) => i * 10)
//               .call(positionCircles)
//           ),
//         (exit) => exit.remove()
//       );

//     selection
//       .selectAll(".y-axis")
//       .data([null])
//       .join("g")
//       .attr("class", "y-axis")
//       .attr("transform", `translate(${margin.left},0)`)
//       .transition(t)
//       .call(axisLeft(y));

//     selection
//       .selectAll(".x-axis")
//       .data([null])
//       .join("g")
//       .attr("class", "x-axis")
//       .attr("transform", `translate(0,${HEIGHT - margin.bottom})`)
//       .transition(t)
//       .call(axisBottom(x));
//   };

//   my.width = function (_) {
//     return arguments.length ? ((width = +_), my) : WIDTH;
//   };

//   my.height = function (_) {
//     return arguments.length ? ((height = +_), my) : HEIGHT;
//   };

//   my.data = function (_) {
//     return arguments.length ? ((data = _), my) : data;
//   };

//   my.xValue = function (_) {
//     return arguments.length ? ((xValue = _), my) : xValue;
//   };

//   my.yValue = function (_) {
//     return arguments.length ? ((yValue = _), my) : yValue;
//   };

//   my.margin = function (_) {
//     return arguments.length ? ((margin = _), my) : margin;
//   };

//   my.radius = function (_) {
//     return arguments.length ? ((radius = +_), my) : radius;
//   };

//   return my;
// };

const AnimatedD3ScatterPlot = () => {
  //   const WIDTH = window.innerWidth;
  //   const HEIGHT = window.innerHeight;

  let divRef;

  //   const main = async () => {
  //     const data = await csv(csvUrl, parseRow);

  //     const x = scaleLinear()
  //       .domain(extent(data, xValue))
  //       .range([margin.left, WIDTH - margin.right]);

  //     const y = scaleLinear()
  //       .domain(extent(data, yValue))
  //       .range([HEIGHT - margin.bottom, margin.top]);

  //     const marks = data.map((d) => ({
  //       x: x(xValue(d)),
  //       y: y(yValue(d)),
  //     }));

  //     svg
  //       .selectAll("circle")
  //       .data(marks)
  //       .join("circle")
  //       .attr("cx", (d) => d.x)
  //       .attr("cy", (d) => d.y)
  //       .attr("r", radius);

  //     svg
  //       .append("g")
  //       .attr("transform", `translate(${margin.left},0)`)
  //       .call(axisLeft(y));

  //     svg
  //       .append("g")
  //       .attr("transform", `translate(0,${HEIGHT - margin.bottom})`)
  //       .call(axisBottom(x));
  //   };

  createEffect(async () => {
    const svg = select(divRef)
      .append("svg")
      .attr("width", WIDTH)
      .attr("height", HEIGHT);
    // main();
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

    const columns = [
      "petal_width",
      "sepal_width",
      "petal_length",
      "sepal_length",
    ];
    let i = 0;
    setInterval(() => {
      i++;
      plot.xValue((d) => d[columns[i % columns.length]]);
      svg.call(plot);
    }, 3000);
  });

  return <div ref={divRef} class="my-2"></div>;
};

export default AnimatedD3ScatterPlot;
