import { range, select } from "d3";
import { createEffect, createSignal } from "solid-js";
import { windowSize } from "./utils";

const HEIGHT = Math.min(window.innerHeight, 700);
const WIDTH = Math.min(window.innerWidth, 1200);

// const { HEIGHT, WIDTH } = windowSize();

const HALF_H = HEIGHT / 2;
const HALF_W = WIDTH / 2;

const LENGTH = 15;

// const GET_Y = (d, t) => Math.sin(t + d * 0.5) * (HALF_H / 1.2) + HALF_H;

const GET_DATA = (t) =>
  range(LENGTH).map((d) => ({
    x: 20 + d * ((WIDTH - 40) / (LENGTH - 1)),
    y: Math.sin(t + d / (LENGTH / 10)) * (HALF_H / 1.2) + HALF_H,
    r: 20 + Math.sin(d * 0.5 + t * 2) * 10,
  }));

const CirclesSinD3 = () => {
  let divRef;
  /**
   * D3 have 2 type of data joins
   *
   * 1:Enter: to insert data in dom
   * 2:Update: update the exiting in dom
   * 3:Exit: exit to remove it from dom (join will do it for us)
   *
   */
  createEffect(() => {
    const svg = select(divRef)
      .append("svg")
      .attr("width", WIDTH)
      .attr("height", HEIGHT);

    // // First Way: in first init enter will add the circles in dom
    // const circles = svg.selectAll("circle").data(DATA);
    // circles.enter().append("circle").attr("r", 20); // "pointer 1"

    let t = 0;
    setInterval(() => {
      // // First Way: and just update those circle in interval
      //   const circles = svg.selectAll("circle").data(DATA);
      // circles.attr("cx", (d) => d.x).attr("cy", (d) => (d) => d.y);

      // Second Way: one other way is to merge circles and "pointer 1" result
      //   circles.merge(circlesEnter).attr(... // in interval

      const circles = svg.selectAll("circle").data(GET_DATA(t));
      circles
        .join("circle")
        .attr("r", (d) => d.r)
        .attr("cx", (d) => d.x)
        .attr("cy", (d) => d.y);

      t += 0.1;
    }, 100);
  });

  return <div ref={divRef} class="my-2"></div>;
};

export default CirclesSinD3;
