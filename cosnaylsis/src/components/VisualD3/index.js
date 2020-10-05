import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

function VisualD3(data) {
  const d3Container = useRef(null);

  useEffect(function handleD3() {
    if (data && d3Container.current) {
      const div = d3.select(d3Container.current);

      const update = div
        .append("svg")
        .attr("width", 300)
        .attr("height", 300)
        .style("border", "1px solid black")
        .append("text")
        .attr("fill", "green")
        .attr("x", 50)
        .attr("y", 50)
        .text("Hello D3")

      update.exit()
        .remove();

    }
  }, [data]);

  return (
    <div
      className="VisualD3"
      ref={d3Container}
    />
  );
}

export default VisualD3;