import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import BrandingCard from '../components/common/BrandingCard/BrandingCard';

const meta: Meta<typeof BrandingCard> = {
  title: 'common/BrandingCard',
  component: BrandingCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof BrandingCard>;

export const Apple: Story = {
  args: {
    title: '뽀하은 사과',
    description: '한 입에 쏙, 귀여움이 톡!',
    imageUrl: 'https://placehold.co/72x72/ff6b6b/ffffff?text=🍎',
    onDelete: () => alert('사과 카드가 삭제되었습니다!'),
  },
};

export const Potato: Story = {
  args: {
    title: '하은 감자',
    description: '자연이 키운 진심의 맛',
    imageUrl: 'https://placehold.co/72x72/8b4513/ffffff?text=🥔',
    onDelete: () => alert('감자 카드가 삭제되었습니다!'),
  },
};

export const GreenVegetable: Story = {
  args: {
    title: '싱싱초록',
    description: '노지에서 자란 고품질 오이고추, 바로 산지에서 보내드립니다.',
    imageUrl: 'https://placehold.co/72x72/32cd32/ffffff?text=🥒',
    onDelete: () => alert('싱싱초록 카드가 삭제되었습니다!'),
  },
};

export const Tomato: Story = {
  args: {
    title: '토담토',
    description: '햇살과 정성을 가득 담은 산지직송 대추토마토, 토담토가 전하는 자연 그대로의 달콤함.',
    imageUrl: 'https://placehold.co/72x72/ff4500/ffffff?text=🍅',
    onDelete: () => alert('토담토 카드가 삭제되었습니다!'),
  },
};

export const WithRealImage: Story = {
  args: {
    title: '신선한 토마토',
    description: '농장에서 직접 가져온 신선한 토마토입니다.',
    imageUrl: 'https://images.unsplash.com/photo-1518977822534-7049a61ee0c2?w=72&h=72&fit=crop&crop=center',
    onDelete: () => alert('토마토 카드가 삭제되었습니다!'),
  },
};

export const LongDescription: Story = {
  args: {
    title: '프리미엄 유기농 채소',
    description: '100% 유기농으로 재배된 프리미엄 채소입니다. 농약을 전혀 사용하지 않고 자연 친화적인 방법으로 키워낸 건강한 채소를 만나보세요.',
    imageUrl: 'https://placehold.co/72x72/228b22/ffffff?text=🥬',
    onDelete: () => alert('유기농 채소 카드가 삭제되었습니다!'),
  },
}; 