import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import BrandingCard from '../components/common/BrandingCard/BrandingCard';

const meta: Meta<typeof BrandingCard> = {
  title: 'common/BrandingCard',
  component: BrandingCard,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#F4FAFF' },
        { name: 'white', value: '#ffffff' },
      ],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: '브랜드 제목'
    },
    description: {
      control: 'text',
      description: '브랜드 설명'
    },
    imageUrl: {
      control: 'text',
      description: '브랜드 이미지 URL'
    },
    onClick: {
      action: 'clicked',
      description: '카드 클릭 이벤트'
    },
    onDelete: {
      action: 'deleted',
      description: '삭제 버튼 클릭 이벤트'
    },
    className: {
      control: 'text',
      description: '추가 CSS 클래스'
    }
  }
};

export default meta;
type Story = StoryObj<typeof BrandingCard>;

export const Apple: Story = {
  args: {
    title: '뽀사과',
    description: '한 입에 쏙, 귀여움이 톡!',
    imageUrl: 'https://placehold.co/72x72/ff6b6b/ffffff?text=🍎',
  },
  parameters: {
    docs: {
      description: {
        story: '모던한 디자인의 브랜딩 카드입니다. 호버 시 부드러운 애니메이션과 함께 상승 효과를 확인할 수 있습니다.',
      },
    },
  },
};

export const Potato: Story = {
  args: {
    title: '하은 감자',
    description: '자연이 키운 진심의 맛',
    imageUrl: 'https://placehold.co/72x72/8b4513/ffffff?text=🥔',
  },
  parameters: {
    docs: {
      description: {
        story: '그라데이션 텍스트 효과와 부드러운 그림자를 적용한 카드 디자인입니다.',
      },
    },
  },
};

export const GreenVegetable: Story = {
  args: {
    title: '싱싱초록',
    description: '노지에서 자란 고품질 오이고추, 바로 산지에서 보내드립니다.',
    imageUrl: 'https://placehold.co/72x72/32cd32/ffffff?text=🌶️',
  },
  parameters: {
    docs: {
      description: {
        story: '긴 설명 텍스트를 2줄로 제한하여 깔끔하게 표시하는 기능을 확인할 수 있습니다.',
      },
    },
  },
};

export const Tomato: Story = {
  args: {
    title: '토담토',
    description: '햇살과 정성을 가득 담은 산지직송 대추토마토, 토담토가 전하는 자연 그대로의 달콤함.',
    imageUrl: 'https://placehold.co/72x72/FF6347/ffffff?text=🍅',
  },
  parameters: {
    docs: {
      description: {
        story: '텍스트 말줄임 기능과 함께 모던한 삭제 버튼 디자인을 확인할 수 있습니다.',
      },
    },
  },
};

export const WithoutDelete: Story = {
  args: {
    title: '프리미엄 딸기',
    description: '달콤하고 신선한 프리미엄 딸기입니다.',
    imageUrl: 'https://placehold.co/72x72/E91E63/ffffff?text=🍓',
    // onDelete를 제공하지 않음
  },
  parameters: {
    docs: {
      description: {
        story: '삭제 버튼이 없는 버전입니다. onDelete prop을 제공하지 않으면 삭제 버튼이 표시되지 않습니다.',
      },
    },
  },
}; 