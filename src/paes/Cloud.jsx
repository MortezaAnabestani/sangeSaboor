import React, { useEffect } from "react";
import * as d3 from "d3";
import cloud from "d3-cloud";
import { useSelector } from "react-redux";
import WordFrequency from "../components/WordFrequency";

function Cloud() {
  const data = useSelector((state) => state.newText);

  useEffect(() => {
    try {
      // دریافت بسامد واژه‌ها
      const frequencyData = WordFrequency(data);

      // تنظیمات نمودار ابر کلمات
      const width = window.innerWidth - 100;
      const height = 600;

      // نمایش پیام در حال
      const loadingElement = document.getElementById("loading");
      if (loadingElement) loadingElement.style.display = "block";

      const layout = cloud()
        .size([width, height])
        .words(
          frequencyData.map((d) => ({
            text: d.word,
            size: 2 + d.count * 1.1,
            originalColor: `hsl(${Math.random() * 360}, 100%, 50%)`,
          }))
        ) // تنظیم اندازه کلمات و رنگ اصلی
        .padding(5)
        .rotate(() => ~~(Math.random() * 2) * 90)
        .font("Arial")
        .fontSize((d) => d.size)
        .on("end", draw);

      layout.start();

      function draw(words) {
        try {
          const svg = d3
            .select("#cloudChart")
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", `translate(${width / 2},${height / 2})`);

          const texts = svg
            .selectAll("text")
            .data(words)
            .enter()
            .append("text")
            .style("font-size", (d) => `${d.size}px`)
            .style("fill", (d) => d.originalColor)
            .attr("text-anchor", "middle")
            .attr("transform", (d) => `translate(${[d.x, d.y]})rotate(${d.rotate})`)
            .text((d) => d.text)
            .on("mouseover", function (event, d) {
              d3.select(this)
                .transition()
                .duration(200)
                .style("font-size", d.size * 1.2 + "px")
                .style("fill", d.originalColor);

              texts
                .filter((t) => t !== d)
                .transition()
                .duration(200)
                .style("fill", "lightgrey")
                .style("opacity", 0.5);
            })
            .on("mouseout", function (event, d) {
              d3.select(this)
                .transition()
                .duration(200)
                .style("font-size", d.size + "px")
                .style("fill", d.originalColor);

              texts
                .transition()
                .duration(200)
                .style("fill", (d) => d.originalColor)
                .style("opacity", 1);
            });
        } catch (e) {
          const errorElement = document.getElementById("error");
          if (errorElement) errorElement.innerText = "Error in draw: " + e.message;
          throw e;
        }
      }
    } catch (e) {
      const errorElement = document.getElementById("error");
      if (errorElement) errorElement.innerText = "General error: " + e.message;
    }
  }, [data]);

  return (
    <div>
      <h1 className="title">نمودار ابری</h1>
      <div id="cloudChart" className="word-cloud"></div>
    </div>
  );
}

export default Cloud;
