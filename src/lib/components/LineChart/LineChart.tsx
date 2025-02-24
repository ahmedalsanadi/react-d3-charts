import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { LineChartProps } from './types';

export const LineChart: React.FC<LineChartProps> = ({
  data,
  width = 600,
  height = 400,
  margin = { top: 20, right: 30, bottom: 30, left: 40 },
  xAccessor = (d) => d.x,
  yAccessor = (d) => d.y,
  color = 'steelblue',
  className = '',
}) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || !data.length) return;

    // Clear previous content
    d3.select(svgRef.current).selectAll('*').remove();

    const svg = d3.select(svgRef.current);

    // Create scales
    const xScale = d3.scaleLinear()
      .domain(d3.extent(data, xAccessor) as [number, number])
      .range([margin.left, width - margin.right]);

    const yScale = d3.scaleLinear()
      .domain(d3.extent(data, yAccessor) as [number, number])
      .range([height - margin.bottom, margin.top]);

    // Create line generator
    const line = d3.line<any>()
      .x(d => xScale(xAccessor(d)))
      .y(d => yScale(yAccessor(d)));

    // Add the line path
    svg.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', color)
      .attr('stroke-width', 1.5)
      .attr('d', line);

    // Add axes
    svg.append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(xScale));

    svg.append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(yScale));

  }, [data, width, height, margin, xAccessor, yAccessor, color]);

  return (
    <svg
      ref={svgRef}
      width={width}
      height={height}
      className={className}
    />
  );
};