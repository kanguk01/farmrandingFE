import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import SearchInput from './SearchInput';

const meta: Meta<typeof SearchInput> = {
  title: 'common/SearchInput',
  component: SearchInput,
};
export default meta;

type Story = StoryObj<typeof SearchInput>;

export const Default: Story = {
  args: {
    placeholder: '작물을 검색해보세요.',
    onSearch: (value) => alert(`검색: ${value}`),
    onChange: (value) => console.log('입력:', value),
  },
};

export const WithValue: Story = {
  args: {
    placeholder: '작물을 검색해보세요.',
    value: '토마토',
    onSearch: (value) => alert(`검색: ${value}`),
    onChange: (value) => console.log('입력:', value),
  },
};

export const CustomPlaceholder: Story = {
  args: {
    placeholder: '농산물명을 입력하세요',
    onSearch: (value) => alert(`검색: ${value}`),
    onChange: (value) => console.log('입력:', value),
  },
}; 