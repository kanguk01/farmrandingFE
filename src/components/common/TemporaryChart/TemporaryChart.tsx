import React from 'react';
import ReactECharts from 'echarts-for-react';
import styled from 'styled-components';
import type { EChartsOption } from 'echarts';

const ChartContainer = styled.div`
  width: 100%;
  height: 254px;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0px 8px 24px 0px rgba(0, 0, 0, 0.15);
  padding: 16px;
  box-sizing: border-box;
`;

const ChartTitle = styled.h3`
  font-family: 'Jalnan 2', sans-serif;
  font-size: 16px;
  font-weight: 400;
  color: #000000;
  text-align: center;
  margin: 0 0 16px 0;
  line-height: 1.18;
`;

interface TemporaryChartProps {
  title?: string;
  className?: string;
}

const TemporaryChart: React.FC<TemporaryChartProps> = ({ 
  title = '즐겨찾는 작물 가격 동향',
  className 
}) => {
  const option: EChartsOption = {
    grid: {
      left: '10%',
      right: '10%',
      bottom: '20%',
      top: '10%',
    },
    xAxis: {
      type: 'category' as const,
      data: ['Mon\n15', 'Tue\n16', 'Wed\n17', 'Thu\n18', 'Fri\n19', 'Sat\n20', 'Sun\n21', 'Mon\n22'],
      axisLabel: {
        fontSize: 10,
        color: '#9DA3B7',
        lineHeight: 12,
        fontFamily: 'SF Pro Text',
        fontWeight: 500,
      },
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
    },
    yAxis: {
      type: 'value' as const,
      min: 0,
      max: 15000,
      interval: 3000,
      axisLabel: {
        fontSize: 10,
        color: '#9DA3B7',
        fontFamily: 'SF Pro Text',
        fontWeight: 500,
        formatter: (value: number) => {
          if (value === 0) return '0k';
          return `${value / 1000}k`;
        },
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: '#B9C1D9',
          opacity: 0.2,
          width: 1,
        },
      },
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
    },
    series: [
      {
        data: [8000, 9200, 7800, 10500, 9800, 8600, 11200, 10800],
        type: 'line' as const,
        smooth: true,
        lineStyle: {
          color: '#F6543E',
          width: 3,
        },
        symbol: 'circle' as const,
        symbolSize: 6,
        itemStyle: {
          color: '#F6543E',
        },
        areaStyle: {
          color: {
            type: 'linear' as const,
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: 'rgba(246, 84, 62, 0.15)',
              },
              {
                offset: 1,
                color: 'rgba(246, 84, 62, 0)',
              },
            ],
          },
        },
      },
    ],
    tooltip: {
      trigger: 'axis' as const,
      backgroundColor: '#ffffff',
      borderColor: '#F6543E',
      borderWidth: 1,
      textStyle: {
        color: '#000000',
        fontSize: 12,
      },
      formatter: (params: any) => {
        const data = params[0];
        return `${data.name.replace('\n', ' ')}<br/>가격: ${data.value.toLocaleString()}원`;
      },
    },
  };

  return (
    <ChartContainer className={className}>
      <ChartTitle>{title}</ChartTitle>
      <ReactECharts 
        option={option} 
        style={{ height: '200px', width: '100%' }}
        opts={{ renderer: 'svg' }}
      />
    </ChartContainer>
  );
};

export default TemporaryChart; 