import React, { useEffect, useRef, useMemo, useState } from 'react';
import * as d3 from 'd3';
import { ArrowLeft } from 'lucide-react';
import { NetworkGraphProps, NetworkNode, NetworkLink } from './types';
import { useNetworkStore } from './store';

export const NetworkGraph: React.FC<NetworkGraphProps> = ({
  data,
  width = 800,
  height = 600,
  nodeRadius = 20,
  parentNodeRadius = 30,
  nodeColor = '#3b82f6',
  parentNodeColor = '#4f46e5',
  linkColor = '#94a3b8',
  linkWidth = 2,
  className = '',
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [hoveredNode, setHoveredNode] = useState<NetworkNode | null>(null);
  const { toggleNode, isExpanded, selectNode, selectedNode, navigateBack, navigationHistory } = useNetworkStore();

  const processData = (node: NetworkNode): { nodes: NetworkNode[], links: NetworkLink[] } => {
    const nodes: NetworkNode[] = [];
    const links: NetworkLink[] = [];
    
    const processNode = (currentNode: NetworkNode, depth: number = 0, parent: NetworkNode | null = null) => {
      const nodeWithDepth = { ...currentNode, depth };
      nodes.push(nodeWithDepth);
      
      if (parent) {
        links.push({
          source: parent.id,
          target: currentNode.id,
        });
      }
      
      if (currentNode.children && (isExpanded(currentNode.id) || currentNode === selectedNode)) {
        currentNode.children.forEach(child => {
          processNode(child, depth + 1, currentNode);
        });
      }
    };

    const rootNode = selectedNode || node;
    processNode(rootNode);
    return { nodes, links };
  };

  const { nodes, links } = useMemo(
    () => processData(data),
    [data, selectedNode, isExpanded]
  );

  useEffect(() => {
    if (!svgRef.current || !tooltipRef.current) return;

    const svg = d3.select(svgRef.current);
    const tooltip = d3.select(tooltipRef.current);
    
    // Clear previous content
    svg.selectAll('*').remove();

    const g = svg.append('g');

    // Create zoom behavior
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.1, 4])
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
      });

    svg.call(zoom);

    // Create force simulation
    const simulation = d3.forceSimulation<any>(nodes)
      .force('link', d3.forceLink<any, any>(links).id(d => d.id).distance(150))
      .force('charge', d3.forceManyBody().strength(-1000))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(d => 
        d.children ? parentNodeRadius + 20 : nodeRadius + 20
      ));

    // Create links
    const link = g.append('g')
      .selectAll('line')
      .data(links)
      .join('line')
      .attr('stroke', linkColor)
      .attr('stroke-width', linkWidth)
      .attr('stroke-opacity', 0.6);

    // Create node groups
    const node = g.append('g')
      .selectAll('g')
      .data(nodes)
      .join('g')
      .attr('cursor', 'pointer')
      .on('click', (event, d: NetworkNode) => {
        event.stopPropagation();
        if (event.shiftKey && d.children) {
          toggleNode(d.id);
        } else if (d.children) {
          selectNode(d);
        }
      })
      .on('mouseover', (event, d: NetworkNode) => {
        setHoveredNode(d);
        const [x, y] = d3.pointer(event, document.body);
        tooltip
          .style('opacity', 1)
          .style('left', `${x + 10}px`)
          .style('top', `${y - 10}px`);
      })
      .on('mouseout', () => {
        setHoveredNode(null);
        tooltip.style('opacity', 0);
      })
      .call(d3.drag<any, any>()
        .on('start', (event) => {
          if (!event.active) simulation.alphaTarget(0.3).restart();
          event.subject.fx = event.subject.x;
          event.subject.fy = event.subject.y;
        })
        .on('drag', (event) => {
          event.subject.fx = event.x;
          event.subject.fy = event.y;
        })
        .on('end', (event) => {
          if (!event.active) simulation.alphaTarget(0);
          event.subject.fx = null;
          event.subject.fy = null;
        }));

    // Add circles to nodes
    node.append('circle')
      .attr('r', d => d.children ? parentNodeRadius : nodeRadius)
      .attr('fill', d => d.children ? parentNodeColor : nodeColor)
      .attr('stroke', '#fff')
      .attr('stroke-width', 2)
      .attr('opacity', 0.9);

    // Add labels to nodes
    node.append('text')
      .text(d => d.label)
      .attr('x', 0)
      .attr('y', d => (d.children ? parentNodeRadius : nodeRadius) + 20)
      .attr('text-anchor', 'middle')
      .attr('fill', '#1f2937')
      .attr('font-size', '12px')
      .attr('font-weight', d => d.children ? 'bold' : 'normal');

    // Add expandable indicator for nodes with children
    node.filter(d => d.children)
      .append('circle')
      .attr('r', 4)
      .attr('cx', d => (d.children ? parentNodeRadius : nodeRadius) * 0.7)
      .attr('cy', d => -(d.children ? parentNodeRadius : nodeRadius) * 0.7)
      .attr('fill', '#fff')
      .attr('stroke', d => d.children ? parentNodeColor : nodeColor)
      .attr('stroke-width', 2);

    // Update positions on simulation tick
    simulation.on('tick', () => {
      link
        .attr('x1', d => (d.source as any).x)
        .attr('y1', d => (d.source as any).y)
        .attr('x2', d => (d.target as any).x)
        .attr('y2', d => (d.target as any).y);

      node.attr('transform', d => `translate(${d.x},${d.y})`);
    });

    return () => {
      simulation.stop();
    };
  }, [nodes, links, width, height, nodeRadius, parentNodeRadius, nodeColor, parentNodeColor, linkColor, linkWidth]);

  return (
    <div className="relative">
      {navigationHistory.length > 1 && (
        <button
          onClick={navigateBack}
          className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white rounded-md shadow-sm hover:bg-gray-50 border border-gray-200"
        >
          <ArrowLeft size={16} />
          Back
        </button>
      )}
      <svg
        ref={svgRef}
        width={width}
        height={height}
        className={`${className} rounded-lg shadow-inner`}
        style={{ background: '#fff' }}
      />
      <div
        ref={tooltipRef}
        className="absolute pointer-events-none bg-gray-900 text-white px-4 py-2 rounded-md shadow-lg opacity-0 transition-opacity duration-200"
        style={{
          maxWidth: '200px',
          zIndex: 50
        }}
      >
        {hoveredNode && (
          <div>
            <div className="font-semibold">{hoveredNode.label}</div>
            {hoveredNode.description && (
              <div className="text-sm text-gray-300 mt-1">{hoveredNode.description}</div>
            )}
            {hoveredNode.children && (
              <div className="text-sm text-gray-300 mt-1">
                {hoveredNode.children.length} connected node{hoveredNode.children.length !== 1 ? 's' : ''}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};