import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import MyPageTabGroup from '../components/common/MyPageTabGroup/MyPageTabGroup';
import { MyPageTabOption } from '../components/common/MyPageTab/MyPageTab';

const meta: Meta<typeof MyPageTabGroup> = {
  title: 'common/MyPageTabGroup',
  component: MyPageTabGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof MyPageTabGroup>;

export const BrandingSelected: Story = {
  args: {
    selectedTab: 'branding',
    onTabChange: (tab: MyPageTabOption) => alert(`${tab} 탭 선택됨!`),
  },
};

export const PricingSelected: Story = {
  args: {
    selectedTab: 'pricing',
    onTabChange: (tab: MyPageTabOption) => alert(`${tab} 탭 선택됨!`),
  },
};

export const MembershipSelected: Story = {
  args: {
    selectedTab: 'membership',
    onTabChange: (tab: MyPageTabOption) => alert(`${tab} 탭 선택됨!`),
  },
};

export const Interactive: Story = {
  render: () => {
    const [selectedTab, setSelectedTab] = React.useState<MyPageTabOption>('branding');
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ 
          padding: '12px', 
          background: '#f5f5f5', 
          borderRadius: '8px',
          textAlign: 'center',
          fontFamily: 'Jalnan 2, sans-serif',
          fontSize: '14px'
        }}>
          현재 선택된 탭: {selectedTab === 'branding' ? '브랜딩 이력' : 
                            selectedTab === 'pricing' ? '가격 제안 이력' : '멤버쉽'}
        </div>
        
        <MyPageTabGroup
          selectedTab={selectedTab}
          onTabChange={setSelectedTab}
        />
      </div>
    );
  },
}; 