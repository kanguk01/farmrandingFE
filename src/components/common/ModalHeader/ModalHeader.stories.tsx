import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import ModalHeader from './ModalHeader';

const meta: Meta<typeof ModalHeader> = {
  title: 'common/ModalHeader',
  component: ModalHeader,
};
export default meta;

type Story = StoryObj<typeof ModalHeader>;

export const Default: Story = {
  args: {
    title: '모달 타이틀',
    onClickClose: () => alert('닫기'),
  },
};

export const WithAction: Story = {
  args: {
    title: '액션 모달',
    onClickClose: () => alert('닫기'),
    right: <button style={{background:'none',border:'none',color:'#1F41BB',fontWeight:700,fontSize:16,cursor:'pointer'}}>저장</button>,
  },
}; 