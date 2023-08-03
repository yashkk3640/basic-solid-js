import { range, select } from "d3";
import { createEffect, createSignal } from "solid-js";
import { windowSize } from "./utils";

const HEIGHT = Math.min(window.innerHeight, 700);
const WIDTH = Math.min(window.innerWidth, 1200);

const HALF_H = HEIGHT / 2;
const HALF_W = WIDTH / 2;

const LENGTH = 100;

const GET_SIN_DATA = (t) =>
  range(LENGTH).map((d) => ({
    x: 20 + d * ((WIDTH - 40) / (LENGTH - 1)),
    y: Math.sin(t + d / (LENGTH / 10)) * (HALF_H / 1.2) + HALF_H,
  }));

const GET_COS_DATA = (t) =>
  range(LENGTH).map((d) => ({
    x: 20 + d * ((WIDTH - 40) / (LENGTH - 1)),
    y: Math.cos(t + d / (LENGTH / 10)) * (HALF_H / 1.2) + HALF_H,
  }));

const GET_TAN_DATA = (t) =>
  range(LENGTH).map((d) => ({
    x: 20 + d * ((WIDTH - 40) / (LENGTH - 1)),
    y:
      (Math.sin(t + d / (LENGTH / 10)) * (HALF_H / 1.2) +
        HALF_H +
        Math.cos(t + d / (LENGTH / 10)) * (HALF_H / 1.2) +
        HALF_H) /
      2,
  }));

const GET_ROUND_DATA = (t) =>
  range(LENGTH).map((d) => {
    const x = 20 + d * ((WIDTH - 40) / (LENGTH - 1));
    const halfL = LENGTH / 2;
    let midY = ((d + t * 200) % LENGTH) * (HEIGHT - 20);
    if (midY > halfL * (HEIGHT - 20)) {
      midY = LENGTH * (HEIGHT - 20) - midY;
    }
    // console.log("widget data error", { d, t, midY, y: midY / 50 });
    const y = 20 + midY / (halfL + 10); // 20 + Math.abs(t - (d % LENGTH)) * WIDTH; // (d + t) ** 2;
    return { x, y };
  });

const SinCosD3 = () => {
  let divRef;

  createEffect(() => {
    const svg = select(divRef)
      .append("svg")
      .attr("width", WIDTH)
      .attr("height", HEIGHT);

    const sinGraph = svg.append("g");
    const cosGraph = svg.append("g");
    const tanGraph = svg.append("g");
    const roundGraph = svg.append("g");

    let t = 0;
    setInterval(() => {
      const sinCircles = sinGraph.selectAll("circle").data(GET_SIN_DATA(t));
      sinCircles
        .join("circle")
        .attr("r", 5)
        .attr("cx", (d) => d.x)
        .attr("cy", (d) => d.y)
        .attr("fill", "red");

      const cosCircles = cosGraph.selectAll("circle").data(GET_COS_DATA(t));

      cosCircles
        .join("circle")
        .attr("r", 5)
        .attr("cx", (d) => d.x)
        .attr("cy", (d) => d.y)
        .attr("fill", "blue");

      const tanCircles = tanGraph.selectAll("circle").data(GET_TAN_DATA(t));

      tanCircles
        .join("circle")
        .attr("r", 5)
        .attr("cx", (d) => d.x)
        .attr("cy", (d) => d.y)
        .attr("fill", "green");

      const roundCircles = roundGraph
        .selectAll("circle")
        .data(GET_ROUND_DATA(t));

      roundCircles
        .join("circle")
        .attr("r", 5)
        .attr("cx", (d) => d.x)
        .attr("cy", (d) => d.y)
        .attr("fill", "gray");

      t += 0.07;
    }, 100);
  });

  return <div ref={divRef} class="my-2"></div>;
};

export default SinCosD3;
