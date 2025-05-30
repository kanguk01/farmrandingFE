import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import MyPageTab from '../components/common/MyPageTab/MyPageTab';

const meta: Meta<typeof MyPageTab> = {
  title: 'common/MyPageTab',
  component: MyPageTab,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof MyPageTab>;

export const BrandingSelected: Story = {
  args: {
    option: 'branding',
    selected: true,
    onClick: () => alert('브랜딩 이력 선택됨!'),
  },
};

export const BrandingUnselected: Story = {
  args: {
    option: 'branding',
    selected: false,
    onClick: () => alert('브랜딩 이력 클릭!'),
  },
};

export const PricingSelected: Story = {
  args: {
    option: 'pricing',
    selected: true,
    onClick: () => alert('가격 제안 이력 선택됨!'),
  },
};

export const PricingUnselected: Story = {
  args: {
    option: 'pricing',
    selected: false,
    onClick: () => alert('가격 제안 이력 클릭!'),
  },
};

export const MembershipSelected: Story = {
  args: {
    option: 'membership',
    selected: true,
    onClick: () => alert('멤버쉽 선택됨!'),
  },
};

export const MembershipUnselected: Story = {
  args: {
    option: 'membership',
    selected: false,
    onClick: () => alert('멤버쉽 클릭!'),
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', gap: '8px' }}>
        <MyPageTab option="branding" selected={true} onClick={() => alert('브랜딩')} />
        <MyPageTab option="pricing" selected={false} onClick={() => alert('가격')} />
        <MyPageTab option="membership" selected={false} onClick={() => alert('멤버쉽')} />
      </div>
      <div style={{ display: 'flex', gap: '8px' }}>
        <MyPageTab option="branding" selected={false} onClick={() => alert('브랜딩')} />
        <MyPageTab option="pricing" selected={true} onClick={() => alert('가격')} />
        <MyPageTab option="membership" selected={false} onClick={() => alert('멤버쉽')} />
      </div>
      <div style={{ display: 'flex', gap: '8px' }}>
        <MyPageTab option="branding" selected={false} onClick={() => alert('브랜딩')} />
        <MyPageTab option="pricing" selected={false} onClick={() => alert('가격')} />
        <MyPageTab option="membership" selected={true} onClick={() => alert('멤버쉽')} />
      </div>
    </div>
  ),
}; 