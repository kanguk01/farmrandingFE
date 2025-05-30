import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import Button, { ButtonProps } from './Button';

const meta: Meta<ButtonProps> = {
  title: 'common/Button',
  component: Button,
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary'],
    },
  },
};
export default meta;

type Story = StoryObj<ButtonProps>;

export const Primary: Story = {
  args: {
    children: '생성하기',
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    children: '이전',
    variant: 'secondary',
  },
};

export const Disabled: Story = {
  args: {
    children: '비활성화',
    disabled: true,
  },
};

export const LongText: Story = {
  args: {
    children: '긴 텍스트 버튼입니다',
    variant: 'primary',
  },
}; 