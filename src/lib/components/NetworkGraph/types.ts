export interface NetworkNode {
  id: string;
  label: string;
  description?: string;
  children?: NetworkNode[];
  [key: string]: any;
}

export interface NetworkLink {
  source: string;
  target: string;
}

export interface NetworkGraphProps {
  data: NetworkNode;
  width?: number;
  height?: number;
  nodeRadius?: number;
  parentNodeRadius?: number;
  nodeColor?: string;
  parentNodeColor?: string;
  linkColor?: string;
  linkWidth?: number;
  className?: string;
}

export interface NetworkState {
  expandedNodes: Set<string>;
  selectedNode: NetworkNode | null;
  navigationHistory: NetworkNode[];
  toggleNode: (id: string) => void;
  isExpanded: (id: string) => boolean;
  selectNode: (node: NetworkNode | null) => void;
  navigateBack: () => void;
}