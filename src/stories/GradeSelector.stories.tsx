import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import GradeSelector from '../components/common/GradeSelector/GradeSelector';

const meta: Meta<typeof GradeSelector> = {
  title: 'Components/GradeSelector',
  component: GradeSelector,
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

// 기본 GradeSelector
export const Default: Story = {
  name: '기본 등급 선택기',
  render: () => {
    const [selectedGrade, setSelectedGrade] = useState<string>('');
    const [showSelector, setShowSelector] = useState(true);

    return (
      <div style={{ width: '402px', margin: '0 auto' }}>
        {showSelector && (
          <GradeSelector
            selectedGrade={selectedGrade}
            onGradeSelect={(grade) => {
              setSelectedGrade(grade);
              console.log('선택된 등급:', grade);
            }}
            onClose={() => {
              setShowSelector(false);
              // 스토리북에서는 다시 보여주기 위해 재설정
              setTimeout(() => setShowSelector(true), 1000);
            }}
          />
        )}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '작물 등급을 선택할 수 있는 모던한 선택기입니다. 하단에서 슬라이드업 되며, 백드롭 블러 효과가 적용되어 있습니다.',
      },
    },
  },
};

// 특급이 선택된 경우
export const WithSelectedSpecial: Story = {
  name: '특급 선택됨',
  render: () => {
    const [selectedGrade, setSelectedGrade] = useState<string>('특');
    const [showSelector, setShowSelector] = useState(true);

    return (
      <div style={{ width: '402px', margin: '0 auto' }}>
        {showSelector && (
          <GradeSelector
            selectedGrade={selectedGrade}
            onGradeSelect={(grade) => {
              setSelectedGrade(grade);
              console.log('선택된 등급:', grade);
            }}
            onClose={() => {
              setShowSelector(false);
              setTimeout(() => setShowSelector(true), 1000);
            }}
          />
        )}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '특급이 선택된 상태의 등급 선택기입니다. 선택된 등급은 파란색으로 하이라이트되고 흰색 텍스트로 표시됩니다.',
      },
    },
  },
};

// 상급이 선택된 경우
export const WithSelectedHigh: Story = {
  name: '상급 선택됨',
  render: () => {
    const [selectedGrade, setSelectedGrade] = useState<string>('상');
    const [showSelector, setShowSelector] = useState(true);

    return (
      <div style={{ width: '402px', margin: '0 auto' }}>
        {showSelector && (
          <GradeSelector
            selectedGrade={selectedGrade}
            onGradeSelect={(grade) => {
              setSelectedGrade(grade);
              console.log('선택된 등급:', grade);
            }}
            onClose={() => {
              setShowSelector(false);
              setTimeout(() => setShowSelector(true), 1000);
            }}
          />
        )}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '상급이 선택된 상태의 등급 선택기입니다.',
      },
    },
  },
};

// 중급이 선택된 경우 (기본값)
export const WithSelectedMedium: Story = {
  name: '중급 선택됨 (기본)',
  render: () => {
    const [selectedGrade, setSelectedGrade] = useState<string>('중');
    const [showSelector, setShowSelector] = useState(true);

    return (
      <div style={{ width: '402px', margin: '0 auto' }}>
        {showSelector && (
          <GradeSelector
            selectedGrade={selectedGrade}
            onGradeSelect={(grade) => {
              setSelectedGrade(grade);
              console.log('선택된 등급:', grade);
            }}
            onClose={() => {
              setShowSelector(false);
              setTimeout(() => setShowSelector(true), 1000);
            }}
          />
        )}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '중급이 선택된 상태입니다. 등급을 선택하지 않으면 자동으로 중급으로 설정됩니다.',
      },
    },
  },
};

// 하급이 선택된 경우
export const WithSelectedLow: Story = {
  name: '하급 선택됨',
  render: () => {
    const [selectedGrade, setSelectedGrade] = useState<string>('하');
    const [showSelector, setShowSelector] = useState(true);

    return (
      <div style={{ width: '402px', margin: '0 auto' }}>
        {showSelector && (
          <GradeSelector
            selectedGrade={selectedGrade}
            onGradeSelect={(grade) => {
              setSelectedGrade(grade);
              console.log('선택된 등급:', grade);
            }}
            onClose={() => {
              setShowSelector(false);
              setTimeout(() => setShowSelector(true), 1000);
            }}
          />
        )}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '하급이 선택된 상태의 등급 선택기입니다.',
      },
    },
  },
};

export const ModernDesign: Story = {
  name: '모던한 디자인 특징',
  render: () => {
    const [selectedGrade, setSelectedGrade] = useState<string>('');
    const [showSelector, setShowSelector] = useState(true);

    return (
      <div style={{ width: '402px', margin: '0 auto' }}>
        {showSelector && (
          <GradeSelector
            selectedGrade={selectedGrade}
            onGradeSelect={(grade) => {
              setSelectedGrade(grade);
              console.log('선택된 등급:', grade);
            }}
            onClose={() => {
              setShowSelector(false);
              setTimeout(() => setShowSelector(true), 1000);
            }}
          />
        )}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '모던한 디자인 특징들: 그라데이션 헤더, 백드롭 블러, 슬라이드업 애니메이션, 펄스 애니메이션, 리플 효과, 둥근 모서리',
      },
    },
  },
};

export const InteractiveFeatures: Story = {
  name: '인터랙티브 기능',
  render: () => {
    const [selectedGrade, setSelectedGrade] = useState<string>('중');
    const [showSelector, setShowSelector] = useState(true);

    return (
      <div style={{ width: '402px', margin: '0 auto' }}>
        {showSelector && (
          <GradeSelector
            selectedGrade={selectedGrade}
            onGradeSelect={(grade) => {
              setSelectedGrade(grade);
              console.log('선택된 등급:', grade);
            }}
            onClose={() => {
              setShowSelector(false);
              setTimeout(() => setShowSelector(true), 1000);
            }}
          />
        )}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '인터랙티브 기능들: 등급 버튼 호버 효과, 클릭 시 펄스 애니메이션, 리플 효과, 오버레이 클릭으로 닫기, 설명 텍스트',
      },
    },
  },
}; 