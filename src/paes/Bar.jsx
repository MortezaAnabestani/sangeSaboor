import { useEffect } from "react";
import text from "../components/TextOfBook";
import getWordFrequency from "../components/WordFrequency";
import * as d3 from "d3";

function Bar() {
  useEffect(() => {
    try {
      // دریافت بسامد واژه‌ها
      const frequencyData = getWordFrequency(text);

      // تنظیمات نمودار میله‌ای
      const width = window.innerWidth - 100;
      const height = 600;
      const margin = { top: 40, right: 20, bottom: 50, left: 70 };

      // نمایش پیام در حال پردازش
      document.getElementById("loading").style.display = "block";

      // ایجاد نمودار میله‌ای
      const svg = d3
        .select("#barChart")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      const x = d3
        .scaleBand()
        .range([0, width - margin.left - margin.right])
        .padding(0.1)
        .domain(frequencyData.map((d) => d.word));

      const y = d3
        .scaleLinear()
        .range([height - margin.top - margin.bottom, 0])
        .domain([0, d3.max(frequencyData, (d) => d.count)]);

      svg
        .append("g")
        .attr("transform", `translate(0,${height - margin.top - margin.bottom})`)
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "rotate(-45)")
        .style("text-anchor", "end");

      svg.append("g").call(d3.axisLeft(y));

      const bars = svg
        .selectAll(".bar")
        .data(frequencyData)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", (d) => x(d.word))
        .attr("width", x.bandwidth())
        .attr("y", (d) => y(d.count))
        .attr("height", (d) => height - margin.top - margin.bottom - y(d.count))
        .attr("fill", "#69b3a2")
        .on("mouseover", function (event, d) {
          d3.select(this)
            .transition()
            .duration(200)
            .attr("y", y(d.count) - 10)
            .attr("height", height - margin.top - margin.bottom - y(d.count) + 10)
            .attr("fill", "#2171b5");

          // اضافه کردن متن جدید بالای میله
          svg
            .append("text")
            .attr("class", "label")
            .attr("x", x(d.word) + x.bandwidth() / 2)
            .attr("y", y(d.count) - 15)
            .attr("text-anchor", "middle")
            .attr("font-size", "14px")
            .attr("font-weight", "bold")
            .text(`${d.word}: ${d.count}`);
        })
        .on("mouseout", function (event, d) {
          d3.select(this)
            .transition()
            .duration(200)
            .attr("y", y(d.count))
            .attr("height", height - margin.top - margin.bottom - y(d.count))
            .attr("fill", "#69b3a2");

          // حذف متن هنگام خروج موس
          svg.selectAll(".label").remove();
        });

      // حذف پیام در حال پردازش
      document.getElementById("loading").style.display = "none";
    } catch (e) {
      document.getElementById("error").innerText = "General error: " + e.message;
    }
  }, []);

  return (
    <div>
      <h1 className="title">نمودار میله‌ای</h1>
      <div id="barChart" className="bar-chart"></div>
    </div>
  );
}

export default Bar;
