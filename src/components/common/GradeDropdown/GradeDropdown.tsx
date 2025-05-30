import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';

const GRADES = ['특', '상', '중', '하'] as const;
export type Grade = typeof GRADES[number];

const DropdownContainer = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 1000;
`;

const DropdownList = styled.div<{ $isOpen: boolean }>`
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0px 8px 24px 0px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  opacity: ${props => props.$isOpen ? 1 : 0};
  visibility: ${props => props.$isOpen ? 'visible' : 'hidden'};
  transform: ${props => props.$isOpen ? 'translateY(0)' : 'translateY(-10px)'};
  transition: all 0.2s ease-in-out;
  margin-top: 4px;
  width: 100%;
`;

const DropdownItem = styled.button`
  width: 100%;
  padding: 12px 16px;
  background: transparent;
  border: none;
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 1.21;
  color: #000000;
  text-align: left;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background: #f5f5f5;
  }

  &:active {
    background: #e8e8e8;
  }

  &:not(:last-child) {
    border-bottom: 1px solid #f0f0f0;
  }

  &:focus {
    outline: 2px solid #1f41bb;
    outline-offset: -2px;
    background: #f5f5f5;
  }
`;

interface GradeDropdownProps {
  isOpen: boolean;
  onSelect: (grade: Grade) => void;
  onClose: () => void;
  className?: string;
}

const GradeDropdown: React.FC<GradeDropdownProps> = ({
  isOpen,
  onSelect,
  onClose,
  className,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  const handleSelect = (grade: Grade) => {
    onSelect(grade);
    onClose();
  };

  return (
    <DropdownContainer ref={dropdownRef} className={className}>
      <DropdownList $isOpen={isOpen}>
        {GRADES.map((grade) => (
          <DropdownItem
            key={grade}
            onClick={() => handleSelect(grade)}
            type="button"
            aria-label={`등급 ${grade} 선택`}
          >
            {grade}
          </DropdownItem>
        ))}
      </DropdownList>
    </DropdownContainer>
  );
};

export default GradeDropdown; 