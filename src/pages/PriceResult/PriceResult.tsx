import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import * as echarts from 'echarts';
import iconCancel from '../../assets/icon-cancel.svg';
import iconGraph from '../../assets/icon-graph.svg';

// 애니메이션
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pulsePrice = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

const PageContainer = styled.div`
  width: 100%;
  height: 874px;
  background: #F4FAFF;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Header = styled.div`
  width: 100%;
  height: 47px;
  background: #F4FAFF;
  display: flex;
  align-items: center;
  padding: 0;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  left: 15px;
  top: 0;
  width: 42px;
  height: 42px;
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;

  &:hover {
    opacity: 0.7;
  }

  &:active {
    opacity: 0.5;
  }
`;

const CloseIcon = styled.img`
  width: 21px;
  height: 21px;
`;

const ContentArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  padding-top: 40px;
  flex: 1;
  overflow-y: auto;
`;

const TitleSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 320px;
  animation: ${fadeIn} 0.8s ease-out;
`;

const Title = styled.h1`
  font-family: 'Jalnan 2', sans-serif;
  font-weight: 400;
  font-size: 24px;
  line-height: 1.67;
  letter-spacing: 4.17%;
  text-align: center;
  color: #000000;
  margin: 0;
  white-space: pre-line;
`;

const PriceSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 320px;
  animation: ${slideInUp} 0.8s ease-out 0.2s both;
`;

const PriceHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
`;

const PriceIcon = styled.img`
  width: 16px;
  height: 16px;
  filter: brightness(0) saturate(100%) invert(25%) sepia(98%) saturate(1653%) hue-rotate(221deg) brightness(96%) contrast(91%);
`;

const PriceLabel = styled.span`
  font-family: 'Jalnan 2', sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 1.18;
  color: #000000;
`;

const PriceDisplay = styled.div`
  width: 100%;
  height: 60px;
  background: #FFFFFF;
  border: none;
  border-radius: 8px;
  box-shadow: 0px 8px 24px 0px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(31, 65, 187, 0.03) 0%, rgba(79, 70, 229, 0.03) 100%);
    border-radius: 8px;
  }
`;

const PriceValue = styled.span`
  font-family: 'Jalnan 2', sans-serif;
  font-weight: 400;
  font-size: 24px;
  line-height: 1.2;
  color: #1F41BB;
  position: relative;
  z-index: 1;
  animation: ${pulsePrice} 2s ease-in-out infinite;
`;

const ChartSection = styled.div`
  width: 320px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  animation: ${slideInUp} 0.8s ease-out 0.4s both;
`;

const ChartTitle = styled.h3`
  font-family: 'Jalnan 2', sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 1.2;
  color: #1F41BB;
  margin: 0;
  text-align: center;
`;

const LegendContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 12px;
`;

const ChartContainer = styled.div`
  width: 100%;
  height: 260px;
  background: #FFFFFF;
  border-radius: 12px;
  box-shadow: 0px 8px 24px 0px rgba(0, 0, 0, 0.08);
  padding: 16px;
  box-sizing: border-box;
`;

const ChartWrapper = styled.div`
  width: 100%;
  height: 200px;
`;

const ButtonSection = styled.div`
  width: 320px;
  display: flex;
  gap: 16px;
  padding-bottom: 40px;
  animation: ${slideInUp} 0.8s ease-out 0.6s both;
`;

const ActionButton = styled.button<{ variant: 'secondary' | 'primary' }>`
  flex: 1;
  height: 56px;
  background: ${props => props.variant === 'primary' ? '#1F41BB' : '#9E9E9E'};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s ease;
  }

  &:hover {
    background: ${props => props.variant === 'primary' ? '#1A3AA0' : '#757575'};
    transform: translateY(-2px);
    box-shadow: 0 8px 24px ${props => props.variant === 'primary' ? 'rgba(31, 65, 187, 0.3)' : 'rgba(158, 158, 158, 0.3)'};
    
    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(0);
  }
`;

const ButtonText = styled.span`
  font-family: 'Jalnan 2', sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 1.18;
  color: #FFFFFF;
  position: relative;
  z-index: 1;
`;

const LegendItem = styled.button<{ color: string; isActive: boolean }>`
  display: flex;
  align-items: center;
  gap: 6px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 6px;
  transition: all 0.3s ease;
  opacity: ${props => props.isActive ? 1 : 0.4};

  &:hover {
    background: rgba(31, 65, 187, 0.05);
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const LegendColor = styled.div<{ color: string }>`
  width: 12px;
  height: 12px;
  background: ${props => props.color};
  border-radius: 50%;
  transition: all 0.3s ease;

  ${LegendItem}:hover & {
    transform: scale(1.2);
  }
`;

const LegendText = styled.span`
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 11px;
  line-height: 1.2;
  color: #6B7280;
`;

// 5년간 더미 데이터 (실제로는 API에서 받아올 것)
const generatePriceData = () => {
  const basePrice = 2800; // 감자 기준가
  const data = [];
  
  for (let year = 2019; year <= 2023; year++) {
    for (let month = 1; month <= 12; month++) {
      const variation = Math.random() * 0.4 - 0.2; // ±20% 변동
      const seasonalFactor = Math.sin((month - 1) * Math.PI / 6) * 0.15; // 계절 변동
      
      const avgPrice = basePrice * (1 + variation + seasonalFactor);
      const minPrice = avgPrice * (0.7 + Math.random() * 0.2); // 70-90%
      const maxPrice = avgPrice * (1.1 + Math.random() * 0.2); // 110-130%
      
      data.push({
        date: `${year}-${month.toString().padStart(2, '0')}`,
        minPrice: Math.round(minPrice),
        maxPrice: Math.round(maxPrice),
        avgPrice: Math.round(avgPrice)
      });
    }
  }
  
  return data;
};

const PriceResult: React.FC = () => {
  const navigate = useNavigate();
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.EChartsType | null>(null);
  
  const [priceData] = useState(generatePriceData());
  const [visibleSeries, setVisibleSeries] = useState({
    min: true,
    max: true,
    avg: true
  });

  // 적정가격 계산 (5년 평균가의 평균)
  const fairPrice = Math.round(
    priceData.reduce((sum, item) => sum + item.avgPrice, 0) / priceData.length
  );

  useEffect(() => {
    if (!chartRef.current) return;

    // ECharts 인스턴스 생성
    if (!chartInstance.current) {
      chartInstance.current = echarts.init(chartRef.current, undefined, {
        renderer: 'canvas',
        useDirtyRect: false
      });
    }

    // 차트 옵션 설정
    const option = {
      grid: {
        top: 10,
        right: 20,
        bottom: 40,
        left: 40
      },
      xAxis: {
        type: 'category',
        data: priceData.map(item => item.date),
        axisLabel: {
          fontSize: 10,
          color: '#9DA3B7',
          interval: 11 // 1년마다 표시
        },
        axisLine: {
          lineStyle: {
            color: '#E5E7EB'
          }
        },
        axisTick: {
          show: false
        }
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          fontSize: 10,
          color: '#9DA3B7',
          formatter: (value: number) => `${Math.round(value / 1000)}k`
        },
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        splitLine: {
          lineStyle: {
            color: '#F3F4F6',
            opacity: 0.5
          }
        }
      },
      series: [
        {
          name: '최저가',
          type: 'line',
          data: visibleSeries.min ? priceData.map(item => item.minPrice) : [],
          lineStyle: {
            color: '#10B981',
            width: 2
          },
          itemStyle: {
            color: '#10B981'
          },
          symbol: 'circle',
          symbolSize: 4,
          smooth: true
        },
        {
          name: '최고가',
          type: 'line',
          data: visibleSeries.max ? priceData.map(item => item.maxPrice) : [],
          lineStyle: {
            color: '#F6543E',
            width: 2
          },
          itemStyle: {
            color: '#F6543E'
          },
          symbol: 'circle',
          symbolSize: 4,
          smooth: true
        },
        {
          name: '평균가',
          type: 'line',
          data: visibleSeries.avg ? priceData.map(item => item.avgPrice) : [],
          lineStyle: {
            color: '#1F41BB',
            width: 3
          },
          itemStyle: {
            color: '#1F41BB'
          },
          symbol: 'circle',
          symbolSize: 5,
          smooth: true
        }
      ],
      tooltip: {
        trigger: 'axis',
        backgroundColor: '#FFFFFF',
        borderColor: '#E5E7EB',
        borderWidth: 1,
        textStyle: {
          color: '#374151',
          fontSize: 12
        },
        formatter: (params: any) => {
          const date = params[0]?.axisValue;
          if (!date) return '';
          
          let content = `<div style="font-weight: 600; margin-bottom: 8px;">${date}</div>`;
          
          params.forEach((param: any) => {
            if (param.seriesName && param.value !== null && param.value !== undefined) {
              const seriesKey = param.seriesName === '최저가' ? 'min' : 
                              param.seriesName === '최고가' ? 'max' : 'avg';
              if (visibleSeries[seriesKey]) {
                content += `
                  <div style="display: flex; align-items: center; margin-bottom: 4px;">
                    <div style="width: 8px; height: 8px; background: ${param.color}; border-radius: 50%; margin-right: 8px;"></div>
                    <span style="flex: 1;">${param.seriesName}</span>
                    <span style="font-weight: 600;">${param.value.toLocaleString()}원</span>
                  </div>
                `;
              }
            }
          });
          
          return content;
        }
      }
    };

    chartInstance.current.setOption(option, true); // true를 추가해서 완전히 새로 그림

    // 리사이즈 핸들러
    const handleResize = () => {
      chartInstance.current?.resize();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [priceData, visibleSeries]);

  // 컴포넌트 언마운트 시 차트 정리
  useEffect(() => {
    return () => {
      if (chartInstance.current) {
        chartInstance.current.dispose();
        chartInstance.current = null;
      }
    };
  }, []);

  const handleClose = () => {
    navigate('/');
  };

  const handlePrevious = () => {
    navigate('/price-quote');
  };

  const handleComplete = () => {
    // 가격 제안 이력을 마이페이지에 저장하는 로직
    // TODO: 실제로는 API 호출을 통해 이력 저장
    
    // 마이페이지의 가격 제안 이력 탭으로 이동
    navigate('/mypage', { 
      state: { initialTab: 'pricing' } 
    });
  };

  const toggleSeries = (seriesKey: keyof typeof visibleSeries) => {
    setVisibleSeries(prev => ({
      ...prev,
      [seriesKey]: !prev[seriesKey]
    }));
  };

  return (
    <PageContainer>
      <Header>
        <CloseButton onClick={handleClose} aria-label="닫기">
          <CloseIcon src={iconCancel} alt="닫기" />
        </CloseButton>
      </Header>

      <ContentArea>
        <TitleSection>
          <Title>1 kg 기준{'\n'}감자의{'\n'}적정 가격을 찾아냈어요!</Title>
        </TitleSection>

        <PriceSection>
          <PriceHeader>
            <PriceIcon src={iconGraph} alt="적정가격" />
            <PriceLabel>적정가격</PriceLabel>
          </PriceHeader>
          <PriceDisplay>
            <PriceValue>{fairPrice.toLocaleString()}원</PriceValue>
          </PriceDisplay>
        </PriceSection>

        <ChartSection>
          <ChartTitle>5년간 가격 동향</ChartTitle>
          <LegendContainer>
            <LegendItem
              color="#10B981"
              isActive={visibleSeries.min}
              onClick={() => toggleSeries('min')}
            >
              <LegendColor color="#10B981" />
              <LegendText>최저가</LegendText>
            </LegendItem>
            <LegendItem
              color="#F6543E"
              isActive={visibleSeries.max}
              onClick={() => toggleSeries('max')}
            >
              <LegendColor color="#F6543E" />
              <LegendText>최고가</LegendText>
            </LegendItem>
            <LegendItem
              color="#1F41BB"
              isActive={visibleSeries.avg}
              onClick={() => toggleSeries('avg')}
            >
              <LegendColor color="#1F41BB" />
              <LegendText>평균가</LegendText>
            </LegendItem>
          </LegendContainer>
          <ChartContainer>
            <ChartWrapper ref={chartRef} />
          </ChartContainer>
        </ChartSection>

        <ButtonSection>
          <ActionButton variant="secondary" onClick={handlePrevious}>
            <ButtonText>이전</ButtonText>
          </ActionButton>
          <ActionButton variant="primary" onClick={handleComplete}>
            <ButtonText>완료</ButtonText>
          </ActionButton>
        </ButtonSection>
      </ContentArea>
    </PageContainer>
  );
};

export default PriceResult; 