import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { Box } from '@mui/material';

interface Node {
  id: number;
  state: string;
  functionName: string;
}

interface Link {
  source: number;
  target: number;
}

interface GoroutineGraphProps {
  nodes: Node[];
  links: Link[];
}

export const GoroutineGraph: React.FC<GoroutineGraphProps> = ({ nodes, links }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || nodes.length === 0) return;

    const width = 800;
    const height = 600;

    // Clear previous content
    d3.select(svgRef.current).selectAll('*').remove();

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    // Create force simulation
    const simulation = d3.forceSimulation<any>()
      .force('link', d3.forceLink().id((d: any) => d.id).distance(100))
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(width / 2, height / 2));

    // Create links
    const link = svg.append('g')
      .selectAll('line')
      .data(links)
      .enter()
      .append('line')
      .attr('stroke', '#999')
      .attr('stroke-opacity', 0.6)
      .attr('stroke-width', 2);

    // Create nodes
    const node = svg.append('g')
      .selectAll('circle')
      .data(nodes)
      .enter()
      .append('g');

    // Add circles to nodes
    node.append('circle')
      .attr('r', 10)
      .attr('fill', (d: Node) => {
        switch (d.state) {
          case 'RUNNING': return '#4CAF50';
          case 'BLOCKED': return '#F44336';
          case 'WAITING': return '#FFC107';
          default: return '#9E9E9E';
        }
      });

    // Add labels to nodes
    node.append('text')
      .text((d: Node) => d.functionName)
      .attr('x', 15)
      .attr('y', 5)
      .attr('font-size', '12px');

    // Update positions on simulation tick
    simulation.nodes(nodes).on('tick', () => {
      link
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y);

      node
        .attr('transform', (d: any) => `translate(${d.x},${d.y})`);
    });

    simulation.force<d3.ForceLink<any, any>>('link')!.links(links);

    // Add zoom behavior
    const zoom = d3.zoom()
      .scaleExtent([0.1, 4])
      .on('zoom', (event) => {
        svg.selectAll('g').attr('transform', event.transform);
      });

    svg.call(zoom as any);

    // Cleanup
    return () => {
      simulation.stop();
    };
  }, [nodes, links]);

  return (
    <Box sx={{ width: '100%', height: '100%', overflow: 'hidden' }}>
      <svg ref={svgRef} style={{ width: '100%', height: '100%' }} />
    </Box>
  );
};
