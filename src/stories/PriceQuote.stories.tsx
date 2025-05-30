import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import PriceQuote from '../pages/PriceQuote/PriceQuote';

const meta: Meta<typeof PriceQuote> = {
  title: 'Pages/PriceQuote',
  component: PriceQuote,
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#F4FAFF' },
        { name: 'white', value: '#ffffff' },
      ],
    },
  },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <div style={{ 
          width: '402px', 
          margin: '0 auto',
          height: '874px',
          background: '#F4FAFF'
        }}>
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: '가격제안 페이지',
  parameters: {
    docs: {
      description: {
        story: '작물의 가격을 제안받을 수 있는 페이지입니다. 작물명, 품종, 등급(특/상/중/하), 출하 예정일을 입력하여 적정 가격을 조회할 수 있습니다.',
      },
    },
  },
};

export const ModernDesign: Story = {
  name: '모던한 디자인',
  parameters: {
    docs: {
      description: {
        story: '기존 브랜딩 페이지와 일관성 있는 디자인이 적용되었습니다. 배경색(#F4FAFF), 헤더 구조, 버튼 위치 등이 통일되었습니다.',
      },
    },
  },
};

export const InteractiveInputs: Story = {
  name: '인터랙티브 입력 필드',
  parameters: {
    docs: {
      description: {
        story: '등급 선택 시 모던한 GradeSelector가 나타나고, 출하 예정일 클릭 시 이쁜 달력이 나타납니다. 등급과 출하일 필드가 통일된 디자인으로 개선되었습니다.',
      },
    },
  },
};

export const FormValidation: Story = {
  name: '폼 유효성 검사',
  parameters: {
    docs: {
      description: {
        story: '필수 항목(작물명, 품종, 출하일)이 모두 입력되어야 "결과 보기" 버튼이 활성화됩니다. 등급은 특/상/중/하 중 선택하며, 선택하지 않으면 자동으로 "중"으로 설정됩니다.',
      },
    },
  },
};

export const CloseButton: Story = {
  name: '닫기 버튼 기능',
  parameters: {
    docs: {
      description: {
        story: '좌상단의 닫기 버튼이 브랜딩 페이지와 동일한 위치와 스타일로 통일되었습니다. 버튼 클릭 시 홈 페이지로 돌아갑니다.',
      },
    },
  },
};

export const AnimatedElements: Story = {
  name: '애니메이션 효과',
  parameters: {
    docs: {
      description: {
        story: '페이지 로드 시 제목과 폼 요소들이 순차적으로 나타나는 fadeIn, slideInUp 애니메이션이 적용되어 있습니다.',
      },
    },
  },
}; 