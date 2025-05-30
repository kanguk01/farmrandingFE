import type { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import PriceResult from '../pages/PriceResult/PriceResult';

const meta: Meta<typeof PriceResult> = {
  title: 'Pages/PriceResult',
  component: PriceResult,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
가격 제안 결과 페이지입니다.

## 주요 기능
- **적정가격 표시**: 5년간 평균가의 평균으로 계산된 적정가격 
- **인터랙티브 차트**: ECharts를 사용한 3개 꺾은선 그래프 (최고가/최저가/평균가)
- **데이터 토글**: 범례 클릭으로 각 데이터 계열 표시/숨김 가능
- **애니메이션**: 단계별 슬라이드 인 효과
- **반응형 디자인**: 모바일 최적화 (최대 402px)

## 차트 기능
- 5년간(2019-2023) 월별 데이터 표시
- 실시간 인터랙션으로 데이터 계열 온/오프
- 호버 시 상세 정보 툴팁 표시
- 부드러운 곡선 그래프

## 디자인 특징
- 브랜드 컬러 #1F41BB 기반 UI
- 그라데이션과 그림자 효과
- 펄스 애니메이션으로 적정가격 강조
- 백드롭 블러와 카드 스타일 디자인
        `
      }
    }
  },
  decorators: [
    (Story) => (
      <BrowserRouter>
        <div style={{ 
          width: '402px', 
          height: '874px', 
          margin: '0 auto',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          overflow: 'hidden'
        }}>
          <Story />
        </div>
      </BrowserRouter>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: '기본 상태',
  parameters: {
    docs: {
      description: {
        story: '감자의 적정가격 결과를 보여주는 기본 상태입니다. 5년간 가격 동향 차트와 함께 계산된 적정가격을 표시합니다.'
      }
    }
  }
};

export const InteractiveChart: Story = {
  name: '인터랙티브 차트',
  parameters: {
    docs: {
      description: {
        story: '차트의 범례를 클릭하여 각 데이터 계열(최고가/최저가/평균가)을 표시하거나 숨길 수 있습니다.'
      }
    }
  },
  play: async ({ canvasElement }) => {
    // 스토리북에서 차트 인터랙션 데모를 위한 플레이 함수
    // 실제 차트가 로드된 후 범례 클릭 시뮬레이션 가능
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Chart loaded and ready for interaction');
  }
}; 