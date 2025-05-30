import React from 'react';
import styled, { keyframes } from 'styled-components';
import iconClose from '../../../assets/icon-close.svg';

// 애니메이션
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(100%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  z-index: 1000;
  animation: ${fadeIn} 0.3s ease-out;
  backdrop-filter: blur(4px);
`;

const SelectorContainer = styled.div`
  width: 100%;
  max-width: 402px;
  background: #FFFFFF;
  border-radius: 20px 20px 0 0;
  box-shadow: 0 -8px 32px rgba(31, 65, 187, 0.15);
  overflow: hidden;
  animation: ${slideUp} 0.4s ease-out;
  position: relative;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 24px 16px 24px;
  background: linear-gradient(135deg, #1F41BB 0%, #4F46E5 100%);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="20" cy="20" r="2" fill="rgba(255,255,255,0.1)"/><circle cx="80" cy="30" r="1.5" fill="rgba(255,255,255,0.08)"/><circle cx="40" cy="70" r="1" fill="rgba(255,255,255,0.06)"/></svg>');
    opacity: 0.3;
  }
`;

const HeaderTitle = styled.h2`
  font-family: 'Jalnan 2', sans-serif;
  font-weight: 400;
  font-size: 18px;
  line-height: 1.2;
  color: #FFFFFF;
  margin: 0;
  position: relative;
  z-index: 1;
`;

const CloseButton = styled.button`
  width: 32px;
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  position: relative;
  z-index: 1;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const CloseIcon = styled.img`
  width: 16px;
  height: 16px;
  filter: brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(7500%) hue-rotate(109deg) brightness(105%) contrast(105%);
`;

const GradeList = styled.div`
  padding: 32px 24px 40px 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const GradeOption = styled.button<{ isSelected?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 56px;
  background: ${props => props.isSelected ? '#1F41BB' : '#FFFFFF'};
  border: 2px solid ${props => props.isSelected ? '#1F41BB' : 'rgba(31, 65, 187, 0.15)'};
  border-radius: 12px;
  cursor: pointer;
  font-family: 'Jalnan 2', sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 1.2;
  color: ${props => props.isSelected ? '#FFFFFF' : '#1F41BB'};
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover:not(:disabled) {
    ${props => !props.isSelected && `
      background: rgba(31, 65, 187, 0.08);
      border-color: rgba(31, 65, 187, 0.3);
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(31, 65, 187, 0.15);
    `}
  }

  &:active:not(:disabled) {
    animation: ${pulse} 0.3s ease;
  }
`;

const GradeText = styled.span`
  position: relative;
  z-index: 1;
`;

const GradeDescription = styled.div`
  padding: 0 24px 24px 24px;
  text-align: center;
`;

const Description = styled.p`
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 1.5;
  color: #6B7280;
  margin: 0;
`;

interface GradeSelectorProps {
  selectedGrade: string;
  onGradeSelect: (grade: string) => void;
  onClose: () => void;
}

const GradeSelector: React.FC<GradeSelectorProps> = ({
  selectedGrade,
  onGradeSelect,
  onClose
}) => {
  const grades = [
    { value: '특', label: '특급 (최고급)' },
    { value: '상', label: '상급 (우수)' },
    { value: '중', label: '중급 (보통)' },
    { value: '하', label: '하급 (일반)' }
  ];

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleGradeSelect = (grade: string) => {
    onGradeSelect(grade);
    onClose();
  };

  return (
    <Overlay onClick={handleOverlayClick}>
      <SelectorContainer>
        <Header>
          <HeaderTitle>등급 선택</HeaderTitle>
          <CloseButton onClick={onClose}>
            <CloseIcon src={iconClose} alt="닫기" />
          </CloseButton>
        </Header>

        <GradeList>
          {grades.map((grade) => (
            <GradeOption
              key={grade.value}
              isSelected={selectedGrade === grade.value}
              onClick={() => handleGradeSelect(grade.value)}
            >
              <GradeText>{grade.label}</GradeText>
            </GradeOption>
          ))}
        </GradeList>

        <GradeDescription>
          <Description>
            미선택 시 자동으로 '중급'으로 설정됩니다.<br />
            더 정확한 가격 책정을 위해 등급을 선택해주세요.
          </Description>
        </GradeDescription>
      </SelectorContainer>
    </Overlay>
  );
};

export default GradeSelector; 