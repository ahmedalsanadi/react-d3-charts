import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { BarChartProps } from './types';

export const BarChart: React.FC<BarChartProps> = ({
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
    const xScale = d3.scaleBand()
      .domain(data.map(xAccessor))
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, yAccessor) as number])
      .range([height - margin.bottom, margin.top]);

    // Add bars
    svg.selectAll('rect')
      .data(data)
      .join('rect')
      .attr('x', d => xScale(xAccessor(d)) as number)
      .attr('y', d => yScale(yAccessor(d)))
      .attr('width', xScale.bandwidth())
      .attr('height', d => height - margin.bottom - yScale(yAccessor(d)))
      .attr('fill', color);

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