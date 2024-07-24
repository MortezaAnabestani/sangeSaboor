import { useEffect } from "react";
import text from "../components/TextOfBook";
import getWordFrequency from "../components/WordFrequency";
import * as d3 from "d3";

function Tree() {
  useEffect(() => {
    try {
      // دریافت بسامد واژه‌ها
      const frequencyData = getWordFrequency(text);

      // تنظیمات نمودار درختی
      const width = window.innerWidth - 100;
      const height = 600;

      // نمایش پیام در حال پردازش
      document.getElementById("loading").style.display = "block";

      // ایجاد نمودار درختی
      const svg = d3
        .select("#treemapChart")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(0,0)`);

      const treemap = d3.treemap().size([width, height]).padding(1);

      const root = d3.hierarchy({ children: frequencyData }).sum((d) => d.count);

      treemap(root);

      // ایجاد طیف رنگی
      const color = d3
        .scaleSequential(d3.interpolateViridis)
        .domain([0, d3.max(frequencyData, (d) => d.count)]);

      const nodes = svg
        .selectAll(".node")
        .data(root.leaves())
        .enter()
        .append("g")
        .attr("class", "node")
        .attr("transform", (d) => `translate(${d.x0},${d.y0})`);

      nodes
        .append("rect")
        .attr("id", (d) => d.data.word)
        .attr("width", (d) => d.x1 - d.x0)
        .attr("height", (d) => d.y1 - d.y0)
        .attr("fill", (d) => color(d.data.count))
        .attr("stroke", "white")
        .style("transition", "all 0.3s ease")
        .on("mouseover", function (event, d) {
          d3.select(this)
            .transition()
            .duration(200)
            .attr("transform", `scale(1.1)`)
            .style("filter", "drop-shadow(4px 8px 10px black)");

          // نمایش متن و مقدار فراوانی
          svg
            .append("text")
            .attr("id", "tooltip")
            .attr("x", d.x0 + (d.x1 - d.x0) / 2)
            .attr("y", d.y0 + (d.y1 - d.y0) / 2)
            .attr("text-anchor", "middle")
            .style("font-size", "12px")
            .style("font-weight", "bold")
            .style("fill", "black")
            .text(`${d.data.word}: ${d.data.count}`);
        })
        .on("mouseout", function (event, d) {
          d3.select(this).transition().duration(200).attr("transform", `scale(1)`).style("filter", "none");

          // حذف متن و مقدار فراوانی
          d3.select("#tooltip").remove();
        });

      nodes
        .append("text")
        .attr("x", 5)
        .attr("y", 20)
        .text((d) => d.data.word)
        .style("fill", "white");

      // حذف پیام در حال پردازش
      document.getElementById("loading").style.display = "none";
    } catch (e) {
      document.getElementById("error").innerText = "General error: " + e.message;
    }
  }, []);

  return (
    <div>
      <h1 className="title">نمودار درختی</h1>
      <div id="treemapChart" className="treemap-chart"></div>
    </div>
  );
}

export default Tree;
