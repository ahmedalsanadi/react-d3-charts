export interface DataPoint {
  x: number;
  y: number;
  [key: string]: any;
}

export interface Margin {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export interface LineChartProps {
  data: DataPoint[];
  width?: number;
  height?: number;
  margin?: Margin;
  xAccessor?: (d: DataPoint) => number;
  yAccessor?: (d: DataPoint) => number;
  color?: string;
  className?: string;
}