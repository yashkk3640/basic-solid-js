import { range, select, symbol, symbols } from "d3";
import { createEffect } from "solid-js";

const HEIGHT = 700;
const WIDTH = 1200;

const HALF_H = HEIGHT / 2;
const HALF_W = WIDTH / 2;

const generateShapes = (elem, id, inverted) => {
  const mask = elem.append("mask").attr("id", id);

  mask
    .append("rect")
    .attr("y", 0)
    .attr("width", WIDTH)
    .attr("height", HEIGHT)
    .attr("fill", inverted ? "black" : "white");

  //   mask
  //     .append("circle")
  //     .attr("cy", HALF_H)
  //     .attr("cx", HALF_W)
  //     .attr("r", 250)
  //     .attr("fill", inverted ? "white" : "black");

  const length = symbols.length;
  mask
    .selectAll("g")
    .data(range(length))
    .join((enter) =>
      enter
        .append("g")
        .attr(
          "transform",
          (d) => `translate(${80 + d * (WIDTH / length)},${HEIGHT / 2})`
        )
        .append("path")
        .attr("d", (d) => symbol(symbols[d], 10000)())
        .attr("fill", inverted ? "white" : "black")
    );
};

const AllShapesD3 = () => {
  let divRef;
  createEffect(() => {
    const svg = select(divRef)
      .append("svg")
      .attr("width", WIDTH)
      .attr("height", HEIGHT);

    console.log("widget data error", { divRef, svg });

    generateShapes(svg, "mask-1");
    generateShapes(svg, "mask-2", true);

    svg
      .append("g")
      .selectAll("rect")
      .data(range(HEIGHT / 10))
      .join("rect")
      .attr("y", (pos) => pos * 20)
      .attr("width", WIDTH)
      .attr("height", 10)
      .attr("mask", "url(#mask-1)");

    svg
      .append("g")
      .selectAll("rect")
      .data(range(HEIGHT / 10))
      .join("rect")
      .attr("x", (pos) => pos * 20)
      .attr("width", 10)
      .attr("height", HEIGHT)
      .attr("mask", "url(#mask-2)");
  });
  return <div ref={divRef} class="my-2"></div>;
};

export default AllShapesD3;
