import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import InputField from '../components/common/InputField/InputField';

const meta: Meta<typeof InputField> = {
  title: 'common/InputField',
  component: InputField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof InputField>;

export const Default: Story = {
  args: {
    label: '작물명',
    placeholder: '예 : 토마토',
    variant: 'default',
    onChange: (value) => console.log('입력:', value),
  },
};

export const WithCopyIcon: Story = {
  args: {
    label: '작물명',
    placeholder: '예 : 토마토',
    variant: 'withCopy',
    onChange: (value) => console.log('입력:', value),
    onCopy: () => alert('복사되었습니다!'),
  },
};

export const Large: Story = {
  args: {
    label: '작물명',
    placeholder: '예 : 토마토',
    variant: 'large',
    onChange: (value) => console.log('입력:', value),
    onCopy: () => alert('복사되었습니다!'),
  },
};

export const Calendar: Story = {
  args: {
    label: '작물명',
    variant: 'calendar',
    onChange: (value) => console.log('입력:', value),
    onCalendarClick: () => alert('달력을 열겠습니다!'),
  },
};

export const WithValue: Story = {
  args: {
    label: '작물명',
    placeholder: '예 : 토마토',
    value: '토마토',
    variant: 'default',
    onChange: (value) => console.log('입력:', value),
  },
};

export const Disabled: Story = {
  args: {
    label: '작물명',
    placeholder: '예 : 토마토',
    variant: 'default',
    disabled: true,
    onChange: (value) => console.log('입력:', value),
  },
}; 