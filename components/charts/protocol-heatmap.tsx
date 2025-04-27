"use client";

import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { useTheme } from "next-themes";

interface ProtocolFrequencyData {
  protocol: string;
  category: string;
  count: number;
}

interface ProtocolHeatmapProps {
  data: ProtocolFrequencyData[];
}

export function ProtocolHeatmap({ data }: ProtocolHeatmapProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const { theme } = useTheme();
  const isDarkTheme = theme === "dark";

  useEffect(() => {
    if (!svgRef.current || !data.length) return;

    const drawHeatmap = () => {
      // Clear previous chart
      d3.select(svgRef.current).selectAll("*").remove();

      // Set up dimensions
      const margin = { top: 30, right: 30, bottom: 100, left: 120 };
      const width = svgRef.current.clientWidth - margin.left - margin.right;
      const height = svgRef.current.clientHeight - margin.top - margin.bottom;

      // Get unique protocols and categories
      const protocols = Array.from(new Set(data.map((d) => d.protocol)));
      const categories = Array.from(new Set(data.map((d) => d.category)));

      // Create scales
      const x = d3.scaleBand().domain(categories).range([0, width]).padding(0.05);
      const y = d3.scaleBand().domain(protocols).range([0, height]).padding(0.05);
      const color = d3
        .scaleSequential()
        .interpolator(d3.interpolateGreens)
        .domain([0, d3.max(data, (d) => d.count) || 10]);

      // Create SVG
      const svg = d3
        .select(svgRef.current)
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      // Add X axis
      svg
        .append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end")
        .style("font-size", "12px")
        .style("fill", isDarkTheme ? "#e0e0e0" : "#333333");

      // Add Y axis
      svg
        .append("g")
        .call(d3.axisLeft(y))
        .selectAll("text")
        .style("font-size", "12px")
        .style("fill", isDarkTheme ? "#e0e0e0" : "#333333");

      // Add title
      svg
        .append("text")
        .attr("x", width / 2)
        .attr("y", -10)
        .attr("text-anchor", "middle")
        .style("font-size", "14px")
        .style("fill", isDarkTheme ? "#e0e0e0" : "#333333")
        .text("Exploit Frequency by Protocol and Category");

      // Create tooltip
      const tooltip = d3
        .select("body")
        .append("div")
        .style("position", "absolute")
        .style("visibility", "hidden")
        .style("background-color", isDarkTheme ? "#1f2937" : "#ffffff")
        .style("border", "1px solid #d1d5db")
        .style("border-radius", "6px")
        .style("padding", "8px")
        .style("font-size", "12px")
        .style("pointer-events", "none")
        .style("z-index", "10");

      // Add squares
      svg
        .selectAll()
        .data(data)
        .enter()
        .append("rect")
        .attr("x", (d) => x(d.category) || 0)
        .attr("y", (d) => y(d.protocol) || 0)
        .attr("width", x.bandwidth())
        .attr("height", y.bandwidth())
        .style("fill", (d) => color(d.count))
        .style("stroke", isDarkTheme ? "#374151" : "#e5e7eb")
        .style("stroke-width", 1)
        .on("mouseover", (event, d) => {
          tooltip.style("visibility", "visible").html(`
            <strong>${d.protocol}</strong><br/>
            Category: ${d.category}<br/>
            Exploits: ${d.count}
          `);
        })
        .on("mousemove", (event) => {
          tooltip.style("top", event.pageY - 10 + "px").style("left", event.pageX + 10 + "px");
        })
        .on("mouseout", () => {
          tooltip.style("visibility", "hidden");
        });

      // Add count text
      svg
        .selectAll()
        .data(data)
        .enter()
        .append("text")
        .attr("x", (d) => (x(d.category) || 0) + x.bandwidth() / 2)
        .attr("y", (d) => (y(d.protocol) || 0) + y.bandwidth() / 2)
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle")
        .style("font-size", "12px")
        .style("fill", (d) => (d.count > 5 ? "#ffffff" : isDarkTheme ? "#e0e0e0" : "#333333"))
        .text((d) => d.count);

      return () => {
        tooltip.remove();
      };
    };

    drawHeatmap();

    // Add resize observer
    const resizeObserver = new ResizeObserver(() => {
      drawHeatmap();
    });
    resizeObserver.observe(svgRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, [data, theme]);

  return <svg ref={svgRef} style={{ width: "100%", height: "100%" }} />;
}