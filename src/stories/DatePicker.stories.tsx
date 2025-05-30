import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import DatePicker from '../components/common/DatePicker/DatePicker';

const meta: Meta<typeof DatePicker> = {
  title: 'Components/DatePicker',
  component: DatePicker,
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: 'rgba(0, 0, 0, 0.5)' },
        { name: 'light', value: '#F2F8FD' },
      ],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 DatePicker
export const Default: Story = {
  name: '기본 달력',
  render: () => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [showPicker, setShowPicker] = useState(true);

    return (
      <div style={{ width: '402px', margin: '0 auto' }}>
        {showPicker && (
          <DatePicker
            selectedDate={selectedDate}
            onDateSelect={(date) => {
              setSelectedDate(date);
              console.log('선택된 날짜:', date);
            }}
            onClose={() => {
              setShowPicker(false);
              // 스토리북에서는 다시 보여주기 위해 재설정
              setTimeout(() => setShowPicker(true), 1000);
            }}
          />
        )}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '모바일 친화적인 이쁜 달력 컴포넌트입니다. 하단에서 슬라이드업 되며, 백드롭 블러 효과가 적용되어 있습니다.',
      },
    },
  },
};

// 오늘 날짜가 선택된 경우
export const WithSelectedDate: Story = {
  name: '날짜 선택됨',
  render: () => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
    const [showPicker, setShowPicker] = useState(true);

    return (
      <div style={{ width: '402px', margin: '0 auto' }}>
        {showPicker && (
          <DatePicker
            selectedDate={selectedDate}
            onDateSelect={(date) => {
              setSelectedDate(date);
              console.log('선택된 날짜:', date);
            }}
            onClose={() => {
              setShowPicker(false);
              setTimeout(() => setShowPicker(true), 1000);
            }}
          />
        )}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '오늘 날짜가 선택된 상태의 달력입니다. 선택된 날짜는 파란색으로 하이라이트되고, 오늘 날짜에는 파란색 테두리가 표시됩니다.',
      },
    },
  },
};

// 최소/최대 날짜 제한
export const WithDateRange: Story = {
  name: '날짜 범위 제한',
  render: () => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [showPicker, setShowPicker] = useState(true);
    
    const today = new Date();
    const maxDate = new Date();
    maxDate.setDate(today.getDate() + 30); // 30일 후까지

    return (
      <div style={{ width: '402px', margin: '0 auto' }}>
        {showPicker && (
          <DatePicker
            selectedDate={selectedDate}
            onDateSelect={(date) => {
              setSelectedDate(date);
              console.log('선택된 날짜:', date);
            }}
            onClose={() => {
              setShowPicker(false);
              setTimeout(() => setShowPicker(true), 1000);
            }}
            minDate={today}
            maxDate={maxDate}
          />
        )}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '오늘부터 30일 후까지만 선택 가능한 달력입니다. 범위를 벗어난 날짜들은 비활성화되어 선택할 수 없습니다.',
      },
    },
  },
};

export const ModernDesign: Story = {
  name: '모던한 디자인 특징',
  render: () => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
    const [showPicker, setShowPicker] = useState(true);

    return (
      <div style={{ width: '402px', margin: '0 auto' }}>
        {showPicker && (
          <DatePicker
            selectedDate={selectedDate}
            onDateSelect={(date) => {
              setSelectedDate(date);
              console.log('선택된 날짜:', date);
            }}
            onClose={() => {
              setShowPicker(false);
              setTimeout(() => setShowPicker(true), 1000);
            }}
          />
        )}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '모던한 디자인 특징들: 그라데이션 헤더, 백드롭 블러, 슬라이드업 애니메이션, 호버 효과, 바운스 애니메이션, 일요일/토요일 색상 구분',
      },
    },
  },
};

export const InteractiveFeatures: Story = {
  name: '인터랙티브 기능',
  render: () => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [showPicker, setShowPicker] = useState(true);

    return (
      <div style={{ width: '402px', margin: '0 auto' }}>
        {showPicker && (
          <DatePicker
            selectedDate={selectedDate}
            onDateSelect={(date) => {
              setSelectedDate(date);
              console.log('선택된 날짜:', date);
            }}
            onClose={() => {
              setShowPicker(false);
              setTimeout(() => setShowPicker(true), 1000);
            }}
          />
        )}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '인터랙티브 기능들: 월 이동 버튼 호버 효과, 날짜 셀 호버 시 확대, 클릭 시 바운스 애니메이션, ESC 키로 닫기, 오버레이 클릭으로 닫기',
      },
    },
  },
}; 