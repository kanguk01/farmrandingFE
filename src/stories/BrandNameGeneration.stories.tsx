import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import BrandNameGeneration from '../pages/BrandNameGeneration/BrandNameGeneration';

const meta: Meta<typeof BrandNameGeneration> = {
  title: 'pages/BrandNameGeneration',
  component: BrandNameGeneration,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: '선택된 키워드를 바탕으로 브랜드명을 생성하고 타이핑 애니메이션으로 표시하는 페이지입니다.',
      },
    },
  },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof BrandNameGeneration>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: '브랜드명 생성 과정을 보여주는 기본 스토리입니다. 로딩 → 타이핑 애니메이션 → 완료 과정을 확인할 수 있습니다.',
      },
    },
  },
}; 