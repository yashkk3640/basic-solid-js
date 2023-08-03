import { csv, select, scaleLinear, extent, axisLeft, axisBottom } from "d3";
import { createEffect } from "solid-js";
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
const xValue = (d) => d.petal_length;
const yValue = (d) => d.sepal_length;
const margin = {
  top: 20,
  right: 20,
  bottom: 40,
  left: 50,
};
const radius = 5;

const HEIGHT = Math.min(window.innerHeight, 700);
const WIDTH = Math.min(window.innerWidth, 1200);

const D3ScatterPlot = () => {
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

    const x = scaleLinear()
      .domain(extent(data, xValue))
      .range([margin.left, WIDTH - margin.right]);

    const y = scaleLinear()
      .domain(extent(data, yValue))
      .range([HEIGHT - margin.bottom, margin.top]);

    const marks = data.map((d) => ({
      x: x(xValue(d)),
      y: y(yValue(d)),
    }));

    svg
      .selectAll("circle")
      .data(marks)
      .join("circle")
      .attr("cx", (d) => d.x)
      .attr("cy", (d) => d.y)
      .attr("r", radius);

    svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(axisLeft(y));

    svg
      .append("g")
      .attr("transform", `translate(0,${HEIGHT - margin.bottom})`)
      .call(axisBottom(x));
  });

  return <div ref={divRef} class="my-2"></div>;
};

export default D3ScatterPlot;
