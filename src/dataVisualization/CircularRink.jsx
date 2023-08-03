import { range, select } from "d3";
import { createEffect, createSignal } from "solid-js";
import { windowSize } from "./utils";

const HEIGHT = Math.min(window.innerHeight, 700);
const WIDTH = Math.min(window.innerWidth, 1200);

const HALF_H = HEIGHT / 2;
const HALF_W = WIDTH / 2;

const LENGTH = 50;

// const GET_SIN_DATA = (t) =>
//   range(LENGTH).map((d) => ({
//     x: 20 + d * ((WIDTH - 40) / (LENGTH - 1)),
//     y: Math.sin(t + d / (LENGTH / 10)) * (HALF_H / 1.2) + HALF_H,
//   }));

const GET_COS_DATA = (t) =>
  range(LENGTH).map((d) => ({
    x: Math.sin(t + d / (LENGTH / 10)) * (HALF_W / 1.2) + HALF_W,
    y: Math.cos(t - d / (LENGTH / 10)) * (HALF_H / 1.2) + HALF_H,
  }));

const CircularRink = () => {
  let divRef;

  createEffect(() => {
    const svg = select(divRef)
      .append("svg")
      .attr("width", WIDTH)
      .attr("height", HEIGHT);

    // const sinGraph = svg.append("g");
    const cosGraph = svg.append("g");

    let t = 0;
    setInterval(() => {
      //   const sinCircles = sinGraph.selectAll("circle").data(GET_SIN_DATA(t));
      //   sinCircles
      //     .join("circle")
      //     .attr("r", 5)
      //     .attr("cx", (d) => d.x)
      //     .attr("cy", (d) => d.y)
      //     .attr("fill", "red");

      const cosCircles = cosGraph.selectAll("rect").data(GET_COS_DATA(t));

      cosCircles
        .join("rect")
        // .attr("r", 5)
        .attr("height", (d) => (d.x / WIDTH) * 50)
        .attr("width", (d) => (d.y / HEIGHT) * 10)
        .attr("x", (d) => d.x)
        .attr("y", (d) => d.y)
        .attr("fill", "blue");

      t += 0.07;
    }, 100);
  });

  return <div ref={divRef} class="my-2"></div>;
};

export default CircularRink;
