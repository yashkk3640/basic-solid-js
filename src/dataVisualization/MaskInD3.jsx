import { range, select } from "d3";
import { createEffect } from "solid-js";

const HEIGHT = 700;
const WIDTH = 1200;

const HALF_H = HEIGHT / 2;
const HALF_W = WIDTH / 2;

const MaskInD3 = () => {
  let maskD3Ref;
  createEffect(() => {
    // console.log("widget data error", { maskD3Ref });
    const svg = select(maskD3Ref)
      .append("svg")
      .attr("width", WIDTH)
      .attr("height", HEIGHT);

    console.log("widget data error", { maskD3Ref, svg });

    const mask1 = svg.append("mask").attr("id", "circle-1");

    mask1
      .append("rect")
      .attr("y", 0)
      .attr("width", WIDTH)
      .attr("height", HEIGHT)
      .attr("fill", "black");

    mask1
      .append("circle")
      .attr("cy", HALF_H)
      .attr("cx", HALF_W)
      .attr("r", 250)
      .attr("fill", "white");

    const mask2 = svg.append("mask").attr("id", "circle-2");

    mask2
      .append("rect")
      .attr("y", 0)
      .attr("width", WIDTH)
      .attr("height", HEIGHT)
      .attr("fill", "white");

    mask2
      .append("circle")
      .attr("cy", HALF_H)
      .attr("cx", HALF_W)
      .attr("r", 250)
      .attr("fill", "black");

    svg
      .append("g")
      .selectAll("rect")
      .data(range(HEIGHT / 10))
      .join("rect")
      .attr("y", (pos) => pos * 20)
      .attr("width", WIDTH)
      .attr("height", 10)
      .attr("mask", "url(#circle-1)");

    svg
      .append("g")
      .selectAll("rect")
      .data(range(HEIGHT / 10))
      .join("rect")
      .attr("x", (pos) => pos * 20)
      .attr("width", 10)
      .attr("height", HEIGHT)
      .attr("mask", "url(#circle-2)");

    // <svg width={WIDTH} height={HEIGHT}>
    //   <mask id="circle-1">
    //     <rect y={0} width={WIDTH} height={HEIGHT} fill="black"></rect>
    //     <circle cy={HALF_H} cx={HALF_W} r={250} fill="white" />
    //   </mask>
    //   <mask id="circle-2">
    //     <rect y={0} width={WIDTH} height={HEIGHT} fill="white"></rect>
    //     <circle cy={HALF_H} cx={HALF_W} r={250} fill="black" />
    //   </mask>
    //   {Array.from({ length: HEIGHT / 10 }).map((_, pos) => (
    //     <rect y={pos * 20} width={WIDTH} height={10} mask="url(#circle-1)" />
    //   ))}
    //   {Array.from({ length: WIDTH / 10 }).map((_, pos) => (
    //     <rect x={pos * 20} width={10} height={HEIGHT} mask="url(#circle-2)" />
    //   ))}
    // </svg>
  });
  return <div ref={maskD3Ref} class="my-2"></div>;
};

export default MaskInD3;
