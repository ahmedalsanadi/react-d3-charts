import { HierarchyNode } from 'd3-hierarchy';

export interface TreemapNode {
  name: string;
  value?: number;
  color?: string;
  insights?: string;
  children?: TreemapNode[];
}

export interface TreemapLayoutNode extends HierarchyNode<TreemapNode> {
  x0: number;
  y0: number;
  x1: number;
  y1: number;
}

export interface AdaptiveTreemapProps {
  data: TreemapNode;
  width?: number;
  height?: number;
}
