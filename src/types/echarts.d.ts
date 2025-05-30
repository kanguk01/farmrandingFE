declare module 'echarts-for-react' {
  import { EChartsOption } from 'echarts';
  import { Component } from 'react';

  interface ReactEChartsProps {
    option: EChartsOption;
    style?: React.CSSProperties;
    className?: string;
    theme?: string;
    onChartReady?: (chart: any) => void;
    onEvents?: Record<string, (params: any) => void>;
    opts?: {
      renderer?: 'canvas' | 'svg';
      width?: number;
      height?: number;
    };
  }

  export default class ReactECharts extends Component<ReactEChartsProps> {}
} 