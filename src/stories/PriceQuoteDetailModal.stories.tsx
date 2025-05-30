import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import PriceQuoteDetailModal from '../components/common/PriceQuoteDetailModal/PriceQuoteDetailModal';
import { PriceQuoteHistory } from '../types/priceHistory';

// 5년간 더미 데이터 생성 함수
const generatePriceData = () => {
  const basePrice = 2800;
  const data = [];
  
  for (let year = 2019; year <= 2023; year++) {
    for (let month = 1; month <= 12; month++) {
      const variation = Math.random() * 0.4 - 0.2;
      const seasonalFactor = Math.sin((month - 1) * Math.PI / 6) * 0.15;
      
      const avgPrice = basePrice * (1 + variation + seasonalFactor);
      const minPrice = avgPrice * (0.7 + Math.random() * 0.2);
      const maxPrice = avgPrice * (1.1 + Math.random() * 0.2);
      
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

// Mock 데이터
const mockPriceHistory: PriceQuoteHistory = {
  id: '1',
  request: {
    cropName: '감자',
    variety: '수미',
    grade: '상',
    harvestDate: new Date('2025-05-15')
  },
  result: {
    fairPrice: 2745,
    priceData: generatePriceData()
  },
  createdAt: '2025.05.15',
  unit: 'kg',
  quantity: 1
};

const applePriceHistory: PriceQuoteHistory = {
  id: '2',
  request: {
    cropName: '사과',
    variety: '후지',
    grade: '특',
    harvestDate: new Date('2025-05-14')
  },
  result: {
    fairPrice: 6900,
    priceData: generatePriceData()
  },
  createdAt: '2025.05.15',
  unit: 'kg',
  quantity: 1
};

const asparagusHistory: PriceQuoteHistory = {
  id: '3',
  request: {
    cropName: '아스파라거스',
    variety: '그린아스파라',
    grade: '중',
    harvestDate: new Date('2025-05-14')
  },
  result: {
    fairPrice: 14700,
    priceData: generatePriceData()
  },
  createdAt: '2025.05.14',
  unit: 'kg',
  quantity: 1
};

const meta: Meta<typeof PriceQuoteDetailModal> = {
  title: 'Components/PriceQuoteDetailModal',
  component: PriceQuoteDetailModal,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
가격 제안 상세 정보를 표시하는 모달 컴포넌트입니다.

## 주요 기능
- **하단 슬라이드업**: 모바일 친화적인 하단에서 올라오는 모달
- **상세 정보 표시**: 작물 정보, 등급, 수확일, 기준 수량
- **적정가격 강조**: 펄스 애니메이션으로 적정가격 강조
- **인터랙티브 차트**: ECharts를 사용한 5년간 가격 동향
- **범례 토글**: 최저가/최고가/평균가 표시/숨김 기능

## 차트 기능
- 5년간(2019-2023) 월별 데이터 표시
- 실시간 인터랙션으로 데이터 계열 온/오프
- 호버 시 상세 정보 툴팁 표시
- 부드러운 곡선 그래프

## 애니메이션
- 모달 오버레이 페이드 인/아웃
- 모달 컨테이너 슬라이드 업/다운
- 적정가격 펄스 효과

## 디자인 특징
- 브랜드 컬러 #1F41BB 기반 UI
- 백드롭 블러 효과
- 카드 스타일 정보 섹션
- 반응형 디자인 (최대 402px)
        `
      }
    }
  },
  argTypes: {
    isVisible: {
      control: 'boolean',
      description: '모달 표시 여부'
    },
    priceHistory: {
      control: false,
      description: '가격 제안 이력 데이터'
    },
    onClose: {
      action: 'closed',
      description: '모달 닫기 이벤트'
    }
  }
};

export default meta;
type Story = StoryObj<typeof PriceQuoteDetailModal>;

export const Default: Story = {
  args: {
    isVisible: true,
    priceHistory: mockPriceHistory,
    onClose: action('modal-closed')
  }
};

export const Apple: Story = {
  args: {
    isVisible: true,
    priceHistory: applePriceHistory,
    onClose: action('modal-closed')
  }
};

export const Asparagus: Story = {
  args: {
    isVisible: true,
    priceHistory: asparagusHistory,
    onClose: action('modal-closed')
  }
};

export const Hidden: Story = {
  args: {
    isVisible: false,
    priceHistory: mockPriceHistory,
    onClose: action('modal-closed')
  }
};

export const Interactive: Story = {
  args: {
    isVisible: true,
    priceHistory: mockPriceHistory,
    onClose: action('modal-closed')
  },
  parameters: {
    docs: {
      description: {
        story: '차트 범례를 클릭해서 데이터 계열을 토글할 수 있습니다. 또한 차트 위에 마우스를 올리면 상세 정보를 볼 수 있습니다.'
      }
    }
  }
}; 