import React from 'react';
import styled from 'styled-components';
import iconChevronDown from '../../../assets/icon-chevrondown.svg';

const MORE_BUTTON_WIDTH = 320;

const ButtonContainer = styled.button`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: ${MORE_BUTTON_WIDTH}px;
  padding: 8px 112px;
  background: #ffffff;
  border: none;
  border-radius: 0px 0px 8px 8px;
  box-shadow: 0px 16px 24px 0px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  box-sizing: border-box;
  transition: all 0.2s ease;

  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
    box-shadow: 0px 18px 28px 0px rgba(0, 0, 0, 0.18);
  }

  &:active {
    transform: translateY(0px);
    box-shadow: 0px 14px 20px 0px rgba(0, 0, 0, 0.12);
  }

  &:focus {
    outline: 2px solid #1F41BB;
    outline-offset: 2px;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const ChevronIconContainer = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-80px, -50%);
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const ChevronIcon = styled.img`
  width: 20px;
  height: 20px;
  display: block;
`;

const ButtonText = styled.span`
  font-family: 'Jalnan 2', sans-serif;
  font-weight: 400;
  font-size: 10px;
  line-height: 1.18;
  color: #1F41BB;
  text-align: center;
  white-space: nowrap;
  margin: 0;
`;

interface MoreButtonProps {
  children?: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

const MoreButton: React.FC<MoreButtonProps> = ({
  children = '프리미엄 구독하고 더 보기',
  onClick,
  disabled = false,
  className,
}) => {
  const handleClick = () => {
    if (!disabled) {
      onClick?.();
    }
  };

  return (
    <ButtonContainer
      onClick={handleClick}
      disabled={disabled}
      className={className}
      type="button"
      aria-label={children}
    >
      <ChevronIconContainer>
        <ChevronIcon src={iconChevronDown} alt="" />
      </ChevronIconContainer>
      <ButtonText>{children}</ButtonText>
    </ButtonContainer>
  );
};

export default MoreButton; 