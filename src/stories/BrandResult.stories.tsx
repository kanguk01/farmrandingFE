import type { Meta, StoryObj } from '@storybook/react';
import BrandResult from '../components/common/BrandResult';
import type { BrandResultData } from '../components/common/BrandResult';

const meta: Meta<typeof BrandResult> = {
  title: 'Components/BrandResult',
  component: BrandResult,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    data: {
      description: '브랜드 결과 데이터',
    },
    isPremium: {
      description: '프리미엄 사용자 여부',
      control: 'boolean',
    },
    onCopy: {
      description: '복사 버튼 클릭 핸들러',
      action: 'copied',
    },
    onDownload: {
      description: '다운로드 버튼 클릭 핸들러',
      action: 'downloaded',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleData: BrandResultData = {
  brandName: '하은 감자',
  promotionText: '자연이 키운 진심의 맛',
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
감자 한 알 한 알에 "정직한 먹거리, 건강한 식탁"이라는 신념을 담습니다.

감자는 감자지만, 하은 감자는 다릅니다.
껍질째 쪄먹어도 고소하고, 튀겨도 물이 덜 생깁니다.
아이들에게 안심하고 줄 수 있는,
그래서 도시의 젊은 부모들이 먼저 찾는 감자입니다.

지금 당신의 식탁 위에 올라올
그 작은 감자 하나에도,
흙의 시간과 사람의 진심이 고스란히 담겨 있습니다.`,
  imageUrl: 'https://placehold.co/200x200/a4a4a4/ffffff?text=Potato+Brand',
};

export const FreeUser: Story = {
  args: {
    data: sampleData,
    isPremium: false,
  },
};

export const PremiumUser: Story = {
  args: {
    data: sampleData,
    isPremium: true,
  },
};

export const ShortStory: Story = {
  args: {
    data: {
      brandName: '토마토킹',
      promotionText: '빨간 맛의 진수',
      story: '정성으로 키운 달콤한 토마토입니다.',
      imageUrl: 'https://placehold.co/200x200/ff6b6b/ffffff?text=Tomato+King',
    },
    isPremium: false,
  },
};

export const WithoutImage: Story = {
  args: {
    data: {
      brandName: '청정 배추',
      promotionText: '자연이 키운 건강한 배추',
      story: '깨끗한 환경에서 자란 신선한 배추로 김치 만들기에 최적입니다. 농약 없이 키운 안전한 배추입니다.',
    },
    isPremium: true,
  },
}; 