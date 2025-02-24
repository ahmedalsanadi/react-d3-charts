export interface DataPoint {
  x: string;
  y: number;
  [key: string]: any;
}

export interface Margin {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export interface BarChartProps {
  data: DataPoint[];
  width?: number;
  height?: number;
  margin?: Margin;
  xAccessor?: (d: DataPoint) => string;
  yAccessor?: (d: DataPoint) => number;
  color?: string;
  className?: string;
}