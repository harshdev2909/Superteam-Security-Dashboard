"use client"

import { useEffect, useRef } from "react"
import * as d3 from "d3"
import { useTheme } from "next-themes"

interface TransactionGraphProps {
  data: { id: string; source: string; target: string; value: number; type: string }[]
}

export function TransactionGraph({ data }: TransactionGraphProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const { theme } = useTheme()
  const isDarkTheme = theme === "dark"

  useEffect(() => {
    if (!svgRef.current || !data.length) return

    // Clear previous graph
    d3.select(svgRef.current).selectAll("*").remove()

    // Set up dimensions
    const width = svgRef.current.clientWidth
    const height = svgRef.current.clientHeight

    // Create a force simulation
    const simulation = d3
      .forceSimulation()
      .force(
        "link",
        d3
          .forceLink()
          .id((d: any) => d.id)
          .distance(100),
      )
      .force("charge", d3.forceManyBody().strength(-300))
      .force("center", d3.forceCenter(width / 2, height / 2))

    // Create SVG
    const svg = d3.select(svgRef.current)

    // Extract unique nodes from the links
    const nodes: { id: string }[] = []
    const nodeMap = new Map()

    data.forEach((link) => {
      if (!nodeMap.has(link.source)) {
        const node = { id: link.source }
        nodes.push(node)
        nodeMap.set(link.source, node)
      }
      if (!nodeMap.has(link.target)) {
        const node = { id: link.target }
        nodes.push(node)
        nodeMap.set(link.target, node)
      }
    })

    // Create links
    const links = svg
      .append("g")
      .selectAll("line")
      .data(data)
      .enter()
      .append("line")
      .attr("stroke", (link) => {
        if (link.type === "Transfer") return "#ef4444"
        return isDarkTheme ? "#6b7280" : "#9ca3af"
      })
      .attr("stroke-width", (link) => Math.sqrt(link.value) + 1)

    // Create nodes
    const nodeElements = svg
      .append("g")
      .selectAll("circle")
      .data(nodes)
      .enter()
      .append("circle")
      .attr("r", 10)
      .attr("fill", (node) => {
        if (node.id === "Attacker") return "#ef4444"
        if (node.id === "Contract") return "#10b981"
        return isDarkTheme ? "#6b7280" : "#9ca3af"
      })
      .call(d3.drag<SVGCircleElement, any>().on("start", dragstarted).on("drag", dragged).on("end", dragended) as any)

    // Add labels to nodes
    const textElements = svg
      .append("g")
      .selectAll("text")
      .data(nodes)
      .enter()
      .append("text")
      .text((node) => node.id)
      .attr("font-size", 12)
      .attr("dx", 15)
      .attr("dy", 4)
      .attr("fill", isDarkTheme ? "#e5e7eb" : "#374151")

    // Update positions on simulation tick
    simulation.nodes(nodes).on("tick", () => {
      links
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y)

      nodeElements.attr("cx", (d: any) => d.x).attr("cy", (d: any) => d.y)

      textElements.attr("x", (d: any) => d.x).attr("y", (d: any) => d.y)
    })

    simulation.force<d3.ForceLink<any, any>>("link")?.links(data)

    // Drag functions
    function dragstarted(event: any) {
      if (!event.active) simulation.alphaTarget(0.3).restart()
      event.subject.fx = event.subject.x
      event.subject.fy = event.subject.y
    }

    function dragged(event: any) {
      event.subject.fx = event.x
      event.subject.fy = event.y
    }

    function dragended(event: any) {
      if (!event.active) simulation.alphaTarget(0)
      event.subject.fx = null
      event.subject.fy = null
    }

    return () => {
      simulation.stop()
    }
  }, [data, theme])

  return <svg ref={svgRef} width="100%" height="100%" />
}
