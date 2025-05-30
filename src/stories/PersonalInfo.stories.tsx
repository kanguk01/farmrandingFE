import type { Meta, StoryObj } from '@storybook/react';
import PersonalInfo from '../components/common/PersonalInfo';
import type { PersonalInfoData } from '../components/common/PersonalInfo';

const meta: Meta<typeof PersonalInfo> = {
  title: 'Components/PersonalInfo',
  component: PersonalInfo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    data: {
      description: '개인 정보 데이터',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleData: PersonalInfoData = {
  name: '강욱',
  farmName: '강욱팜',
  location: '○○도 □□시 △△동',
};

export const Default: Story = {
  args: {
    data: sampleData,
  },
};

export const RealData: Story = {
  args: {
    data: {
      name: '김농부',
      farmName: '김농부네 딸기농장',
      location: '경상북도 안동시 풍천면',
    },
  },
};

export const LongText: Story = {
  args: {
    data: {
      name: '이다영',
      farmName: '이다영네 유기농 친환경 무농약 농장',
      location: '전라남도 화순군 남면 월곡리',
    },
  },
};

export const ShortText: Story = {
  args: {
    data: {
      name: '최',
      farmName: '최네농장',
      location: '서울시',
    },
  },
}; 