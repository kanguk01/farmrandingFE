import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import Header from './Header';

const meta: Meta<typeof Header> = {
  title: 'common/Header',
  component: Header,
};
export default meta;

type Story = StoryObj<typeof Header>;

export const Default: Story = {
  args: {
    onClickLogo: () => alert('메인으로 이동'),
    onClickMypage: () => alert('마이페이지로 이동'),
  },
}; 