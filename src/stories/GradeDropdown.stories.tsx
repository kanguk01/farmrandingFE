import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import GradeDropdown, { Grade } from '../components/common/GradeDropdown/GradeDropdown';
import styled from 'styled-components';

const Container = styled.div`
  padding: 100px;
  position: relative;
`;

const meta: Meta<typeof GradeDropdown> = {
  title: 'common/GradeDropdown',
  component: GradeDropdown,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <Container>
        <Story />
      </Container>
    ),
  ],
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof GradeDropdown>;

export const Default: Story = {
  args: {
    isOpen: true,
    onSelect: (grade: Grade) => console.log('선택된 등급:', grade),
    onClose: () => console.log('드롭다운 닫기'),
  },
};

export const Interactive = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedGrade, setSelectedGrade] = useState<Grade | ''>('');

  const handleSelect = (grade: Grade) => {
    setSelectedGrade(grade);
    console.log('선택된 등급:', grade);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button 
        onClick={toggleDropdown}
        style={{
          padding: '8px 16px',
          background: '#1f41bb',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          marginBottom: '8px'
        }}
      >
        등급 선택 ({selectedGrade || '선택 안함'})
      </button>
      <GradeDropdown
        isOpen={isOpen}
        onSelect={handleSelect}
        onClose={handleClose}
      />
    </div>
  );
}; 