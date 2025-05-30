import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import * as echarts from 'echarts';
import { PriceQuoteHistory } from '../../../types/priceHistory';
import iconClose from '../../../assets/icon-close.svg';
import iconGraph from '../../../assets/icon-graph.svg';

// 애니메이션
const slideUp = keyframes`
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
`;

const slideDown = keyframes`
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(100%);
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
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

const ModalOverlay = styled.div<{ isVisible: boolean; isClosing: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(8px);
  z-index: 1000;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  animation: ${props => props.isClosing ? fadeOut : fadeIn} 0.3s ease-out;
  opacity: ${props => props.isVisible ? 1 : 0};
`;

const ModalContainer = styled.div<{ isVisible: boolean; isClosing: boolean }>`
  width: 100%;
  max-width: 402px;
  height: 85vh;
  background: #F4FAFF;
  border-radius: 24px 24px 0 0;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  animation: ${props => props.isClosing ? slideDown : slideUp} 0.4s ease-out;
  transform: ${props => props.isVisible ? 'translateY(0)' : 'translateY(100%)'};
`;

const ModalHeader = styled.div`
  width: 100%;
  height: 60px;
  background: #F4FAFF;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  border-bottom: 1px solid rgba(31, 65, 187, 0.1);
`;

const ModalTitle = styled.h2`
  font-family: 'Jalnan 2', sans-serif;
  font-weight: 400;
  font-size: 18px;
  line-height: 1.2;
  color: #1F41BB;
  margin: 0;
`;

const CloseButton = styled.button`
  width: 32px;
  height: 32px;
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(31, 65, 187, 0.1);
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const CloseIcon = styled.img`
  width: 20px;
  height: 20px;
  filter: brightness(0) saturate(100%) invert(25%) sepia(98%) saturate(1653%) hue-rotate(221deg) brightness(96%) contrast(91%);
`;

const ModalContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 24px 20px 40px 20px;
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const InfoItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: #FFFFFF;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
`;

const InfoLabel = styled.span`
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 14px;
  line-height: 1.2;
  color: #6B7280;
`;

const InfoValue = styled.span`
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 1.2;
  color: #1F2937;
`;

const PriceSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const PriceHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const PriceIcon = styled.img`
  width: 20px;
  height: 20px;
  filter: brightness(0) saturate(100%) invert(25%) sepia(98%) saturate(1653%) hue-rotate(221deg) brightness(96%) contrast(91%);
`;

const PriceLabel = styled.span`
  font-family: 'Jalnan 2', sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 1.18;
  color: #1F41BB;
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
  display: flex;
  flex-direction: column;
  gap: 16px;
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
  height: 280px;
  background: #FFFFFF;
  border-radius: 12px;
  box-shadow: 0px 8px 24px 0px rgba(0, 0, 0, 0.08);
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`;

const ChartWrapper = styled.div`
  width: 100%;
  height: 220px;
  position: relative;
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

interface PriceQuoteDetailModalProps {
  isVisible: boolean;
  priceHistory: PriceQuoteHistory | null;
  onClose: () => void;
}

const PriceQuoteDetailModal: React.FC<PriceQuoteDetailModalProps> = ({
  isVisible,
  priceHistory,
  onClose
}) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.EChartsType | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  const [visibleSeries, setVisibleSeries] = useState({
    min: true,
    max: true,
    avg: true
  });

  useEffect(() => {
    if (!chartRef.current || !priceHistory || !isVisible) return;

    // 모달이 완전히 열릴 때까지 대기
    const initChart = () => {
      if (!chartRef.current) return;

      // 차트 컨테이너 크기 확인
      const containerRect = chartRef.current.getBoundingClientRect();
      if (containerRect.width === 0 || containerRect.height === 0) {
        setTimeout(initChart, 50);
        return;
      }

      if (chartInstance.current) {
        chartInstance.current.dispose();
        chartInstance.current = null;
      }

      chartInstance.current = echarts.init(chartRef.current, undefined, {
        renderer: 'canvas',
        useDirtyRect: false
      });

      const option = {
        animation: false,
        grid: {
          top: 20,
          right: 30,
          bottom: 50,
          left: 50
        },
        xAxis: {
          type: 'category',
          data: priceHistory.result.priceData.map(item => item.date),
          axisLabel: {
            fontSize: 10,
            color: '#9DA3B7',
            interval: 11,
            rotate: 0
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
            data: visibleSeries.min ? priceHistory.result.priceData.map(item => item.minPrice) : [],
            lineStyle: {
              color: '#10B981',
              width: 2
            },
            itemStyle: {
              color: '#10B981'
            },
            symbol: 'circle',
            symbolSize: 4,
            smooth: true,
            showSymbol: false
          },
          {
            name: '최고가',
            type: 'line',
            data: visibleSeries.max ? priceHistory.result.priceData.map(item => item.maxPrice) : [],
            lineStyle: {
              color: '#F6543E',
              width: 2
            },
            itemStyle: {
              color: '#F6543E'
            },
            symbol: 'circle',
            symbolSize: 4,
            smooth: true,
            showSymbol: false
          },
          {
            name: '평균가',
            type: 'line',
            data: visibleSeries.avg ? priceHistory.result.priceData.map(item => item.avgPrice) : [],
            lineStyle: {
              color: '#1F41BB',
              width: 3
            },
            itemStyle: {
              color: '#1F41BB'
            },
            symbol: 'circle',
            symbolSize: 5,
            smooth: true,
            showSymbol: false
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

      chartInstance.current.setOption(option, true);
      chartInstance.current.resize();
    };

    // 모달 애니메이션 완료 후 차트 초기화
    setTimeout(initChart, 500);

    const handleResize = () => {
      chartInstance.current?.resize();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [priceHistory, visibleSeries, isVisible]);

  useEffect(() => {
    return () => {
      if (chartInstance.current) {
        chartInstance.current.dispose();
        chartInstance.current = null;
      }
    };
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 400);
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const toggleSeries = (seriesKey: keyof typeof visibleSeries) => {
    setVisibleSeries(prev => ({
      ...prev,
      [seriesKey]: !prev[seriesKey]
    }));
  };

  const getGradeDisplayText = (grade: string) => {
    const gradeMap: { [key: string]: string } = {
      '특': '특급(최고급)',
      '상': '상급(우수)',
      '중': '중급(보통)',
      '하': '하급(일반)'
    };
    return gradeMap[grade] || grade;
  };

  const formatDate = (date: Date) => {
    return `${date.getFullYear()}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getDate().toString().padStart(2, '0')}.`;
  };

  // 모달이 열릴 때 차트 리사이즈
  useEffect(() => {
    if (isVisible && chartInstance.current) {
      setTimeout(() => {
        chartInstance.current?.resize();
      }, 300); // 모달 애니메이션 이후
    }
  }, [isVisible]);

  if (!isVisible || !priceHistory) return null;

  return (
    <ModalOverlay isVisible={isVisible} isClosing={isClosing} onClick={handleOverlayClick}>
      <ModalContainer isVisible={isVisible} isClosing={isClosing}>
        <ModalHeader>
          <ModalTitle>가격 제안 상세</ModalTitle>
          <CloseButton onClick={handleClose} aria-label="닫기">
            <CloseIcon src={iconClose} alt="닫기" />
          </CloseButton>
        </ModalHeader>

        <ModalContent>
          <InfoSection>
            <InfoItem>
              <InfoLabel>작물명</InfoLabel>
              <InfoValue>{priceHistory.request.cropName}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>품종</InfoLabel>
              <InfoValue>{priceHistory.request.variety}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>등급</InfoLabel>
              <InfoValue>{getGradeDisplayText(priceHistory.request.grade)}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>수확일</InfoLabel>
              <InfoValue>{formatDate(priceHistory.request.harvestDate)}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>기준 수량</InfoLabel>
              <InfoValue>{priceHistory.quantity}{priceHistory.unit}</InfoValue>
            </InfoItem>
          </InfoSection>

          <PriceSection>
            <PriceHeader>
              <PriceIcon src={iconGraph} alt="적정가격" />
              <PriceLabel>적정가격</PriceLabel>
            </PriceHeader>
            <PriceDisplay>
              <PriceValue>{priceHistory.result.fairPrice.toLocaleString()}원</PriceValue>
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
        </ModalContent>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default PriceQuoteDetailModal; 