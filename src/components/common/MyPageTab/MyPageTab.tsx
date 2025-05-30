import React from 'react';
import styled from 'styled-components';

const TabButton = styled.button<{ selected: boolean }>`
  width: 120px;
  height: 70px;
  background: ${props => props.selected ? '#FFFFFF' : '#F4FAFF'};
  border: ${props => props.selected ? '0 !important' : '1px solid #D9D9D9'};
  border-radius: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  box-sizing: border-box;
  flex: 1;
  min-width: 100px;

  &:hover {
    background: #FFFFFF;
    border: 0 !important;
  }

  &:active {
    transform: scale(0.98);
  }

  &:focus {
    outline: none;
    border: 0 !important;
  }
`;

const TabText = styled.span<{ selected: boolean }>`
  font-family: 'Jalnan 2', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 1.18;
  letter-spacing: -2%;
  color: ${props => props.selected ? '#1F41BB' : '#000000'};
  text-align: center;
  transition: color 0.2s ease;
  white-space: nowrap;

  ${TabButton}:hover & {
    color: #1F41BB;
  }
`;

export type MyPageTabOption = 'branding' | 'pricing' | 'membership';

interface MyPageTabProps {
  option: MyPageTabOption;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
}

const MyPageTab: React.FC<MyPageTabProps> = ({
  option,
  selected = false,
  onClick,
  className,
}) => {
  const getTabText = () => {
    switch (option) {
      case 'branding':
        return '브랜딩 이력';
      case 'pricing':
        return '가격 제안 이력';
      case 'membership':
        return '멤버쉽';
      default:
        return '';
    }
  };

  const handleClick = () => {
    onClick?.();
  };

  return (
    <TabButton
      selected={selected}
      onClick={handleClick}
      className={className}
      type="button"
      aria-pressed={selected}
    >
      <TabText selected={selected}>
        {getTabText()}
      </TabText>
    </TabButton>
  );
};

export default MyPageTab;