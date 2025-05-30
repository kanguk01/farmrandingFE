import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import BrandResult from '../components/common/BrandResult/BrandResult';

const meta: Meta<typeof BrandResult> = {
  title: 'Components/BrandResult',
  component: BrandResult,
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
  argTypes: {
    isPremium: { control: 'boolean' },
    onCopy: { action: 'copied' },
    onDownload: { action: 'downloaded' },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

const mockData = {
  brandName: "하은 감자",
  promotionText: "자연이 키운 진심의 맛",
  story: `한 줄기 햇살이 강원도의 붉은 흙을 비추던 어느 봄날,
하은 농장의 밭 한가운데 작은 씨감자가 심어졌습니다.
그 씨감자는 아무 말 없이, 하지만 누구보다 단단한 마음으로 뿌리를 내렸습니다.

하은 감자는 화학비료 대신 미생물 퇴비,
물 맑고 공기 좋은 고랭지 토양에서 천천히 자랍니다.
더디지만 자연의 속도에 맞춘 그 기다림은,
감자의 속살을 더 단단하고 촉촉하게,
맛은 더 달콤하게 만들어줍니다.

이 감자를 키운 사람은,
도시에서 내려와 흙을 배우기 시작한 청년 농부.
바로 '하은'이라는 이름을 가진 농부는
감자 한 알 한 알에 "정직한 먹거리, 건강한 식탁"이라는 신념을 담습니다.`,
  imageUrl: "https://placehold.co/200x200/4F46E5/ffffff?text=Brand+Logo"
};

export const Default: Story = {
  args: {
    data: mockData,
    isPremium: false,
  },
};

export const Premium: Story = {
  args: {
    data: mockData,
    isPremium: true,
  },
};

export const ShortStory: Story = {
  args: {
    data: {
      ...mockData,
      story: "간단한 브랜드 스토리입니다. 이 정도 길이면 더보기 버튼이 나타나지 않을 수도 있습니다."
    },
    isPremium: false,
  },
};

export const LongBrandName: Story = {
  args: {
    data: {
      ...mockData,
      brandName: "아주 긴 브랜드 이름으로 텍스트 오버플로우를 테스트합니다"
    },
    isPremium: false,
  },
}; 