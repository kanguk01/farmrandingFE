import type { Meta, StoryObj } from '@storybook/react';
import TemporaryChart from '../components/common/TemporaryChart';

const meta = {
  title: 'Components/Common/TemporaryChart',
  component: TemporaryChart,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: '차트 제목',
    },
    className: {
      control: 'text',
      description: '추가 CSS 클래스명',
    },
  },
} satisfies Meta<typeof TemporaryChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: '즐겨찾는 작물 가격 동향',
  },
};

export const CustomTitle: Story = {
  args: {
    title: '토마토 가격 동향',
  },
};

export const NoTitle: Story = {
  args: {
    title: '',
  },
}; 