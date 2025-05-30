import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import ServiceCard from '../components/common/ServiceCard/ServiceCard';

const meta: Meta<typeof ServiceCard> = {
  title: 'common/ServiceCard',
  component: ServiceCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof ServiceCard>;

export const Branding: Story = {
  args: {
    variant: 'branding',
    onClick: () => alert('브랜딩 서비스로 이동!'),
  },
};

export const Pricing: Story = {
  args: {
    variant: 'pricing',
    onClick: () => alert('가격 서비스로 이동!'),
  },
};

export const BothCards: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <ServiceCard
        variant="branding"
        onClick={() => alert('브랜딩 서비스 클릭!')}
      />
      <ServiceCard
        variant="pricing"
        onClick={() => alert('가격 서비스 클릭!')}
      />
    </div>
  ),
};

export const Interactive: Story = {
  render: () => {
    const [lastClicked, setLastClicked] = React.useState<string>('');
    
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
          마지막 클릭: {lastClicked || '없음'}
        </div>
        
        <ServiceCard
          variant="branding"
          onClick={() => setLastClicked('브랜딩 서비스')}
        />
        <ServiceCard
          variant="pricing"
          onClick={() => setLastClicked('가격 서비스')}
        />
      </div>
    );
  },
}; 