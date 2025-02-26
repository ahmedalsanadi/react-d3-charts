// src/lib/components/AdaptiveTreemap/AdaptiveTreemap.tsx
import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { TreemapNode, AdaptiveTreemapProps, TreemapLayoutNode } from './types';
import { useTreemapStore } from './store';
import { ZoomIn, ZoomOut } from 'lucide-react';

export const AdaptiveTreemap: React.FC<AdaptiveTreemapProps> = ({
  data,
  width = 800,
  height = 600
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [focusNode, setFocusNode] = useState<TreemapNode | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const { addToHistory, updateFocusZone } = useTreemapStore();

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current)
      .attr("viewBox", [0, 0, width, height]);

    // Clear existing content
    svg.selectAll("*").remove();

    // Create treemap layout
    const treemap = d3.treemap<TreemapNode>()
      .size([width, height])
      .paddingOuter(8)
      .paddingTop(20)
      .paddingInner(4)
      .round(true);

    // Create hierarchy
    const root = d3.hierarchy(data)
      .sum((d) => d.value || 0)
      .sort((a, b) => (b.value || 0) - (a.value || 0)) as TreemapLayoutNode;

    // Apply treemap layout
    treemap(root);

    // Create container for all cells
    const cell = svg.selectAll("g")
      .data(root.descendants())
      .join("g")
      .attr("transform", d => `translate(${d.x0},${d.y0})`);

    // Add rectangles
    cell.append("rect")
      .attr("width", d => d.x1 - d.x0)
      .attr("height", d => d.y1 - d.y0)
      .attr("fill", d => d.data.color || "#69b3a2")
      .attr("opacity", d => d.depth === 0 ? 0 : 0.8)
      .attr("stroke", "#fff")
      .attr("stroke-width", 1)
      .on("mouseover", function(_event, d) {
        // Show context bubble
        const bubble = svg.append("g")
          .attr("class", "context-bubble")
          .attr("transform", `translate(${d.x1},${d.y0})`);

        bubble.append("rect")
          .attr("width", 120)
          .attr("height", 80)
          .attr("fill", "white")
          .attr("stroke", "#ccc")
          .attr("rx", 5);

        bubble.append("text")
          .attr("x", 10)
          .attr("y", 20)
          .text(d.data.name)
          .attr("class", "text-sm font-semibold");

        bubble.append("text")
          .attr("x", 10)
          .attr("y", 40)
          .text(`Value: ${d.value}`)
          .attr("class", "text-sm");

        if (d.data.insights) {
          bubble.append("text")
            .attr("x", 10)
            .attr("y", 60)
            .text(d.data.insights)
            .attr("class", "text-sm italic");
        }
      })
      .on("mouseout", () => {
        svg.selectAll(".context-bubble").remove();
      })
      .on("click", (_event, d) => {
        setFocusNode(d.data);
        addToHistory(d.data);
        updateFocusZone(d.data);
      });

    // Add labels
    cell.append("text")
      .attr("x", 4)
      .attr("y", 16)
      .text(d => d.data.name)
      .attr("class", "text-sm font-semibold")
      .attr("fill", "white");

    // Add focus zone indicator
    if (focusNode) {
      const focusCell = cell.filter(d => d.data === focusNode);
      focusCell.append("rect")
        .attr("class", "focus-indicator")
        .attr("width", d => d.x1 - d.x0)
        .attr("height", d => d.y1 - d.y0)
        .attr("fill", "none")
        .attr("stroke", "#ff0")
        .attr("stroke-width", 2)
        .attr("stroke-dasharray", "5,5");
    }

    // Apply zoom transformation
    svg.attr("transform", `scale(${zoomLevel})`);

    // Cleanup
    return () => {
      svg.selectAll("*").remove();
    };
  }, [data, focusNode, width, height, zoomLevel, addToHistory, updateFocusZone]);

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev * 1.2, 3));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev / 1.2, 0.5));
  };

  return (
    <div className="relative">
      <svg
        ref={svgRef}
        width={width}
        height={height}
        className="w-full h-full"
      />
      <div className="absolute top-4 right-4 flex gap-2">
        <button
          onClick={handleZoomIn}
          className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
          aria-label="zoom in"
        >
          <ZoomIn className="w-6 h-6" />
        </button>
        <button
          onClick={handleZoomOut}
          className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
          aria-label="zoom out"
        >
          <ZoomOut className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};