# React D3 Charts

A modern, lightweight React charting library built with D3.js.

## Features

- 📊 Line Charts
- 📊 Bar Charts
- 🕸️ Interactive Network Graphs
- 🎨 Customizable colors and dimensions
- 📱 Responsive design
- 🔧 TypeScript support
- ⚡️ Zero dependencies (except React and D3)

## Installation

```bash
npm install @yourusername/react-d3-charts
```

## Usage

### Line Chart

```tsx
import { LineChart } from '@yourusername/react-d3-charts';

const data = [
  { x: 0, y: 10 },
  { x: 1, y: 15 },
  { x: 2, y: 35 },
  { x: 3, y: 25 },
];

function App() {
  return (
    <LineChart
      data={data}
      width={600}
      height={400}
      color="#3b82f6"
    />
  );
}
```

### Bar Chart

```tsx
import { BarChart } from '@yourusername/react-d3-charts';

const data = [
  { x: 'A', y: 10 },
  { x: 'B', y: 15 },
  { x: 'C', y: 35 },
  { x: 'D', y: 25 },
];

function App() {
  return (
    <BarChart
      data={data}
      width={600}
      height={400}
      color="#10b981"
    />
  );
}
```

### Network Graph

```tsx
import { NetworkGraph } from '@yourusername/react-d3-charts';

const data = {
  id: 'root',
  label: 'Root',
  children: [
    {
      id: 'group1',
      label: 'Group 1',
      children: [
        { id: 'node1', label: 'Node 1' },
        { id: 'node2', label: 'Node 2' },
      ],
    },
    // ... more nodes
  ],
};

function App() {
  return (
    <NetworkGraph
      data={data}
      width={800}
      height={600}
      nodeColor="#6366f1"
    />
  );
}
```

## API Reference

### LineChart Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| data | LineDataPoint[] | required | Array of data points |
| width | number | 600 | Chart width |
| height | number | 400 | Chart height |
| margin | Margin | { top: 20, right: 30, bottom: 30, left: 40 } | Chart margins |
| xAccessor | (d: DataPoint) => number | d => d.x | Function to access x values |
| yAccessor | (d: DataPoint) => number | d => d.y | Function to access y values |
| color | string | 'steelblue' | Line color |
| className | string | '' | Additional CSS classes |

### BarChart Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| data | BarDataPoint[] | required | Array of data points |
| width | number | 600 | Chart width |
| height | number | 400 | Chart height |
| margin | Margin | { top: 20, right: 30, bottom: 30, left: 40 } | Chart margins |
| xAccessor | (d: DataPoint) => string | d => d.x | Function to access x values |
| yAccessor | (d: DataPoint) => number | d => d.y | Function to access y values |
| color | string | 'steelblue' | Bar color |
| className | string | '' | Additional CSS classes |

### NetworkGraph Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| data | NetworkNode | required | Root node of the network |
| width | number | 800 | Graph width |
| height | number | 600 | Graph height |
| nodeRadius | number | 20 | Radius of nodes |
| nodeColor | string | '#3b82f6' | Color of nodes |
| linkColor | string | '#94a3b8' | Color of links |
| linkWidth | number | 2 | Width of links |
| className | string | '' | Additional CSS classes |

## License

MIT