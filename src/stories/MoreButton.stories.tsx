import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import MoreButton from '../components/common/MoreButton/MoreButton';

const meta: Meta<typeof MoreButton> = {
  title: 'common/MoreButton',
  component: MoreButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof MoreButton>;

export const Default: Story = {
  args: {
    onClick: () => alert('더보기 버튼이 클릭되었습니다!'),
  },
};

export const CustomText: Story = {
  args: {
    children: '더 많은 상품 보기',
    onClick: () => alert('더 많은 상품을 보여줍니다!'),
  },
};

export const ShortText: Story = {
  args: {
    children: '더보기',
    onClick: () => alert('더보기!'),
  },
};

export const LongText: Story = {
  args: {
    children: '프리미엄 멤버십에 가입하고 무제한으로 더 보기',
    onClick: () => alert('프리미엄 멤버십!'),
  },
};

export const Disabled: Story = {
  args: {
    children: '프리미엄 구독하고 더 보기',
    disabled: true,
    onClick: () => alert('이 버튼은 비활성화되어 있습니다.'),
  },
};

export const InContainer: Story = {
  render: () => (
    <div style={{ 
      width: '375px', 
      height: '200px', 
      background: '#f5f5f5', 
      display: 'flex', 
      flexDirection: 'column',
      justifyContent: 'flex-end',
      position: 'relative'
    }}>
      <div style={{ 
        padding: '20px', 
        background: 'white', 
        textAlign: 'center',
        marginBottom: '0'
      }}>
        <p style={{ margin: '0 0 10px 0', color: '#666' }}>
          이곳에 콘텐츠가 있습니다...
        </p>
      </div>
      <MoreButton 
        onClick={() => alert('컨테이너 안의 더보기 버튼!')}
        style={{ margin: '0 auto' }}
      />
    </div>
  ),
};

export const ButtonStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <h4 style={{ margin: '0 0 10px 0', fontSize: '12px' }}>일반 상태</h4>
        <MoreButton onClick={() => alert('일반 상태')} />
      </div>
      <div style={{ textAlign: 'center' }}>
        <h4 style={{ margin: '0 0 10px 0', fontSize: '12px' }}>비활성화 상태</h4>
        <MoreButton disabled onClick={() => alert('비활성화')} />
      </div>
    </div>
  ),
}; 