import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import PriceProposal from '../components/common/PriceProposal/PriceProposal';

const meta: Meta<typeof PriceProposal> = {
  title: 'common/PriceProposal',
  component: PriceProposal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof PriceProposal>;

export const WithDate: Story = {
  args: {
    productName: '아스파라거스',
    price: '34,500 원',
    date: '2025.05.15.',
    variant: 'withDate',
    onDelete: () => alert('아스파라거스 제안이 삭제되었습니다!'),
  },
};

export const WithoutDate: Story = {
  args: {
    productName: '아스파라거스',
    price: '34,500 원',
    variant: 'withoutDate',
    onDelete: () => alert('아스파라거스 제안이 삭제되었습니다!'),
  },
};

export const DifferentProducts: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <PriceProposal
        productName="토마토"
        price="15,000 원"
        date="2025.05.16."
        variant="withDate"
        onDelete={() => alert('토마토 삭제')}
      />
      <PriceProposal
        productName="상추"
        price="8,500 원"
        variant="withoutDate"
        onDelete={() => alert('상추 삭제')}
      />
      <PriceProposal
        productName="감자"
        price="12,000 원"
        variant="withoutDate"
        onDelete={() => alert('감자 삭제')}
      />
    </div>
  ),
};

export const SameDateGroup: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <PriceProposal
        productName="브로콜리"
        price="18,000 원"
        date="2025.05.15."
        variant="withDate"
        onDelete={() => alert('브로콜리 삭제')}
      />
      <PriceProposal
        productName="양배추"
        price="9,500 원"
        variant="withoutDate"
        onDelete={() => alert('양배추 삭제')}
      />
      <PriceProposal
        productName="당근"
        price="11,200 원"
        variant="withoutDate"
        onDelete={() => alert('당근 삭제')}
      />
    </div>
  ),
};

export const MultipleDate: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <PriceProposal
        productName="사과"
        price="25,000 원"
        date="2025.05.14."
        variant="withDate"
        onDelete={() => alert('사과 삭제')}
      />
      <PriceProposal
        productName="배"
        price="30,000 원"
        variant="withoutDate"
        onDelete={() => alert('배 삭제')}
      />
      
      <div style={{ marginTop: '8px' }}>
        <PriceProposal
          productName="딸기"
          price="45,000 원"
          date="2025.05.15."
          variant="withDate"
          onDelete={() => alert('딸기 삭제')}
        />
        <div style={{ marginTop: '12px' }}>
          <PriceProposal
            productName="블루베리"
            price="28,000 원"
            variant="withoutDate"
            onDelete={() => alert('블루베리 삭제')}
          />
        </div>
      </div>
      
      <div style={{ marginTop: '8px' }}>
        <PriceProposal
          productName="오이"
          price="7,500 원"
          date="2025.05.16."
          variant="withDate"
          onDelete={() => alert('오이 삭제')}
        />
      </div>
    </div>
  ),
};

export const LongProductName: Story = {
  args: {
    productName: '프리미엄 유기농 체리토마토',
    price: '52,000 원',
    date: '2025.05.15.',
    variant: 'withDate',
    onDelete: () => alert('프리미엄 체리토마토 삭제'),
  },
};

export const HighPrice: Story = {
  args: {
    productName: '송이버섯',
    price: '180,000 원',
    date: '2025.05.15.',
    variant: 'withDate',
    onDelete: () => alert('송이버섯 삭제'),
  },
};

export const Selected: Story = {
  args: {
    productName: '아스파라거스',
    price: '34,500 원',
    date: '2025.05.15.',
    variant: 'withDate',
    selected: true,
    onClick: () => alert('아스파라거스 선택됨!'),
    onDelete: () => alert('아스파라거스 삭제'),
  },
};

export const Interactive: Story = {
  render: () => {
    const [selectedId, setSelectedId] = React.useState<string | null>('item-1');
    
    const items = [
      { id: 'item-1', name: '토마토', price: '15,000 원', date: '2025.05.16.' },
      { id: 'item-2', name: '상추', price: '8,500 원' },
      { id: 'item-3', name: '감자', price: '12,000 원' },
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {items.map((item, index) => (
          <PriceProposal
            key={item.id}
            productName={item.name}
            price={item.price}
            date={item.date}
            variant={index === 0 ? 'withDate' : 'withoutDate'}
            selected={selectedId === item.id}
            onClick={() => setSelectedId(item.id)}
            onDelete={() => {
              alert(`${item.name} 삭제`);
              if (selectedId === item.id) {
                setSelectedId(null);
              }
            }}
          />
        ))}
      </div>
    );
  },
}; 