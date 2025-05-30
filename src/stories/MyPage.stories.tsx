import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import MyPage from '../pages/MyPage/MyPage';

const meta: Meta<typeof MyPage> = {
  title: 'Pages/MyPage',
  component: MyPage,
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
          minHeight: '100vh',
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
  name: '완전 개선된 마이페이지',
  parameters: {
    docs: {
      description: {
        story: '가로스크롤 완전 제거, 탭 크기 최적화, 모던한 PersonalInfo 컴포넌트가 적용된 마이페이지입니다.',
      },
    },
  },
};

export const ModernIcons: Story = {
  name: '모던한 아이콘 Empty State',
  parameters: {
    docs: {
      description: {
        story: '이모지를 assets의 SVG 아이콘으로 교체했습니다. 브랜딩(브러시), 가격(돈), 멤버십(다이아몬드) 아이콘이 적용되어 더욱 전문적으로 보입니다.',
      },
    },
  },
};

export const FloatingAnimation: Story = {
  name: '플로팅 애니메이션',
  parameters: {
    docs: {
      description: {
        story: '아이콘 컨테이너에 부드러운 플로팅 애니메이션이 적용되어 생동감 있는 UI를 제공합니다.',
      },
    },
  },
};

export const InteractiveEmptyState: Story = {
  name: '인터랙티브 Empty State',
  parameters: {
    docs: {
      description: {
        story: '호버 시 아이콘이 확대되고 색상이 변하며, 외곽에 그라데이션 테두리가 나타나는 인터랙티브 효과를 확인할 수 있습니다.',
      },
    },
  },
};

export const NoHorizontalScroll: Story = {
  name: '가로스크롤 제거',
  parameters: {
    docs: {
      description: {
        story: '모든 컨테이너의 크기가 최적화되어 가로스크롤이 완전히 제거되었습니다. 402px 내에서 모든 콘텐츠가 완벽하게 배치됩니다.',
      },
    },
  },
};

export const OptimizedTabs: Story = {
  name: '최적화된 탭 시스템',
  parameters: {
    docs: {
      description: {
        story: '탭 크기가 120px로 조정되어 "멤버쉽" 탭이 잘리지 않고 모든 탭이 깔끔하게 표시됩니다.',
      },
    },
  },
};

export const ModernPersonalInfo: Story = {
  name: '모던한 개인정보 섹션',
  parameters: {
    docs: {
      description: {
        story: '완전히 새로워진 PersonalInfo 컴포넌트: 그라데이션 배경, 호버 효과, shimmer 애니메이션, 상단 그라데이션 바 등이 적용되었습니다.',
      },
    },
  },
};

export const ResponsiveDesign: Story = {
  name: '완벽한 반응형 레이아웃',
  parameters: {
    docs: {
      description: {
        story: 'box-sizing: border-box, overflow-x: hidden, 동적 width 조정으로 완벽한 반응형 레이아웃을 구현했습니다.',
      },
    },
  },
};

export const AllFeatures: Story = {
  name: '모든 개선사항 통합',
  parameters: {
    docs: {
      description: {
        story: '가로스크롤 제거 + 탭 최적화 + 모던한 PersonalInfo + 새로운 SVG 아이콘 + 플로팅 애니메이션이 모두 적용된 완성형 마이페이지입니다.',
      },
    },
  },
}; 