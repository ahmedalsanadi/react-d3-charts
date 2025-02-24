import { create } from 'zustand';
import { NetworkNode, NetworkState } from './types';

export const useNetworkStore = create<NetworkState>((set, get) => ({
  expandedNodes: new Set<string>(),
  selectedNode: null,
  navigationHistory: [],
  
  toggleNode: (id: string) => {
    set((state) => {
      const newExpanded = new Set(state.expandedNodes);
      if (newExpanded.has(id)) {
        newExpanded.delete(id);
      } else {
        newExpanded.add(id);
      }
      return { expandedNodes: newExpanded };
    });
  },
  
  isExpanded: (id: string) => get().expandedNodes.has(id),
  
  selectNode: (node: NetworkNode | null) => {
    set((state) => {
      if (node && node !== state.selectedNode) {
        return {
          selectedNode: node,
          navigationHistory: [...state.navigationHistory, node]
        };
      }
      return state;
    });
  },
  
  navigateBack: () => {
    set((state) => {
      const newHistory = [...state.navigationHistory];
      newHistory.pop(); // Remove current node
      const previousNode = newHistory[newHistory.length - 1] || null;
      return {
        selectedNode: previousNode,
        navigationHistory: newHistory
      };
    });
  }
}));