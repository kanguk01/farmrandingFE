import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import iconCancel from '../../assets/icon-cancel.svg';

// 애니메이션 정의
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
`;

const typing = keyframes`
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
`;

const blinkCursor = keyframes`
  from, to {
    border-color: transparent;
  }
  50% {
    border-color: #1F41BB;
  }
`;

const PageContainer = styled.div`
  width: 100%;
  height: 874px;
  background: #F4FAFF;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Header = styled.div`
  width: 100%;
  height: 47px;
  background: #F4FAFF;
  display: flex;
  align-items: center;
  padding: 0;
  position: relative;
  flex-shrink: 0;
`;

const CloseButton = styled.button`
  position: absolute;
  left: 15px;
  top: 0;
  width: 42px;
  height: 42px;
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;

  &:hover {
    opacity: 0.7;
  }

  &:active {
    opacity: 0.5;
  }
`;

const CloseIcon = styled.img`
  width: 21px;
  height: 21px;
`;

const ContentArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 160px 51px 0 51px;
  flex: 1;
  position: relative;
`;

const StatusText = styled.h2<{ $isVisible: boolean }>`
  font-family: 'Jalnan 2', sans-serif;
  font-weight: 400;
  font-size: 24px;
  line-height: 1.67;
  letter-spacing: 4.17%;
  text-align: center;
  color: #000000;
  margin: 0 0 48px 0;
  opacity: ${props => props.$isVisible ? 1 : 0};
  animation: ${props => props.$isVisible ? fadeIn : 'none'} 0.8s ease-out;
  transition: opacity 0.5s ease;
`;

const BrandNameContainer = styled.div`
  position: relative;
  width: 300px;
  min-height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 32px;
`;

const BrandNameCard = styled.div<{ $isVisible: boolean }>`
  width: 280px;
  height: 80px;
  background: #FFFFFF;
  border: 2px solid #1F41BB;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(31, 65, 187, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transform: ${props => props.$isVisible ? 'scale(1)' : 'scale(0.8)'};
  opacity: ${props => props.$isVisible ? 1 : 0};
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  
  &:hover {
    transform: ${props => props.$isVisible ? 'scale(1.02)' : 'scale(0.8)'};
    box-shadow: 0 6px 20px rgba(31, 65, 187, 0.25);
  }
`;

const BrandNameText = styled.span<{ $isTyping: boolean }>`
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 32px;
  line-height: 1.2;
  color: #1F41BB;
  text-align: center;
  white-space: nowrap;
  overflow: visible;
  border-right: ${props => props.$isTyping ? '3px solid #1F41BB' : 'none'};
  animation: ${props => props.$isTyping ? blinkCursor : 'none'} 1s infinite;
`;

const LoadingDots = styled.div`
  display: flex;
  gap: 4px;
  justify-content: center;
  margin-bottom: 24px;
`;

const Dot = styled.div<{ $delay: number }>`
  width: 8px;
  height: 8px;
  background: #1F41BB;
  border-radius: 50%;
  animation: ${pulse} 1.5s infinite;
  animation-delay: ${props => props.$delay}s;
`;

const ActionButtons = styled.div<{ $isVisible: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 300px;
  opacity: ${props => props.$isVisible ? 1 : 0};
  transform: ${props => props.$isVisible ? 'translateY(0)' : 'translateY(20px)'};
  transition: all 0.6s ease;
`;

const RegenerateButton = styled.button`
  padding: 12px 24px;
  background: rgba(31, 65, 187, 0.1);
  border: 2px solid #1F41BB;
  border-radius: 8px;
  color: #1F41BB;
  font-family: 'Jalnan 2', sans-serif;
  font-weight: 400;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #1F41BB;
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(31, 65, 187, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

const ButtonContainer = styled.div`
  position: absolute;
  bottom: 114px;
  left: 51px;
  width: 300px;
  display: flex;
  justify-content: stretch;
  align-items: stretch;
  gap: 32px;
  z-index: 2;
`;

const PrevButton = styled.button`
  flex: 1;
  padding: 17px;
  background: #9E9E9E;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    background: #757575;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(158, 158, 158, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

const NextButton = styled.button<{ $disabled: boolean }>`
  flex: 1;
  padding: 17px;
  background: ${props => props.$disabled ? '#CCCCCC' : 'linear-gradient(135deg, #1F41BB 0%, #4F46E5 100%)'};
  border: none;
  border-radius: 8px;
  cursor: ${props => props.$disabled ? 'not-allowed' : 'pointer'};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    ${props => !props.$disabled && `
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(31, 65, 187, 0.4);
    `}
  }

  &:active {
    transform: ${props => props.$disabled ? 'none' : 'translateY(0)'};
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s;
  }

  &:hover::before {
    left: ${props => props.$disabled ? '-100%' : '100%'};
  }
`;

const ButtonText = styled.span`
  font-family: 'Jalnan 2', sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 1.18;
  color: #ffffff;
  position: relative;
  z-index: 1;
`;

// 브랜드명 생성 로직
const generateBrandName = (selectedKeywords: string[]): string => {
  const brandNames = [
    '하은 감자', '순한 토마토', '자연 그대로', '정성 한 스푼',
    '햇살 농원', '청정 들판', '미소 작물', '황금 수확',
    '정직한 농부', '신선한 아침', '건강한 선택', '자연의 선물',
    '풍성한 들판', '깨끗한 자연', '온정 농장', '정성 가득'
  ];
  
  return brandNames[Math.floor(Math.random() * brandNames.length)];
};

type GenerationStatus = 'generating' | 'complete';

interface LocationState {
  brandingKeywords?: string[];
  cropKeywords?: string[];
  logoKeywords?: string[];
}

const BrandNameGeneration: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [status, setStatus] = useState<GenerationStatus>('generating');
  const [brandName, setBrandName] = useState<string>('');
  const [displayedName, setDisplayedName] = useState<string>('');
  const [isTyping, setIsTyping] = useState(false);

  // 이전 페이지들에서 받아온 키워드들을 합치기
  const state = location.state as LocationState;
  const allSelectedKeywords = [
    ...(state?.brandingKeywords || ['premium', 'honest', 'heartfelt', 'large-scale', 'natural']),
    ...(state?.cropKeywords || ['organic', 'fresh', 'beautiful-shape', 'health-care', 'high-sugar']),
    ...(state?.logoKeywords || ['illustration', 'warm', 'simple', 'cute', 'bright'])
  ];

  const startGeneration = () => {
    setStatus('generating');
    setDisplayedName('');
    setIsTyping(false);
    
    // 브랜드명 생성 시뮬레이션
    setTimeout(() => {
      const newBrandName = generateBrandName(allSelectedKeywords);
      setBrandName(newBrandName);
      setStatus('complete');
      
      // 타이핑 애니메이션 시작
      setTimeout(() => {
        setIsTyping(true);
        let index = 0;
        const typeInterval = setInterval(() => {
          if (index < newBrandName.length) {
            setDisplayedName(newBrandName.slice(0, index + 1));
            index++;
          } else {
            setIsTyping(false);
            clearInterval(typeInterval);
          }
        }, 150);
      }, 500);
    }, 2500);
  };

  useEffect(() => {
    startGeneration();
  }, []);

  const handleClose = () => {
    navigate('/logo-image-keywords');
  };

  const handleRegenerate = () => {
    startGeneration();
  };

  const handlePrev = () => {
    navigate('/logo-image-keywords');
  };

  const handleNext = () => {
    console.log('선택된 브랜드명:', brandName);
    // 브랜드명과 키워드 데이터를 함께 전달
    navigate('/brand-result', {
      state: {
        brandName: brandName,
        selectedKeywords: allSelectedKeywords
      }
    });
  };

  const isNextDisabled = status === 'generating';

  return (
    <PageContainer>
      <Header>
        <CloseButton onClick={handleClose} aria-label="닫기">
          <CloseIcon src={iconCancel} alt="닫기" />
        </CloseButton>
      </Header>

      <ContentArea>
        <StatusText $isVisible={status === 'complete'}>
          브랜드명이 만들어졌어요!
        </StatusText>

        <BrandNameContainer>
          {status === 'generating' ? (
            <>
              <LoadingDots>
                <Dot $delay={0} />
                <Dot $delay={0.2} />
                <Dot $delay={0.4} />
              </LoadingDots>
            </>
          ) : (
            <BrandNameCard $isVisible={status === 'complete'}>
              <BrandNameText $isTyping={isTyping}>
                {displayedName}
              </BrandNameText>
            </BrandNameCard>
          )}
        </BrandNameContainer>

        <ActionButtons $isVisible={status === 'complete'}>
          <RegenerateButton onClick={handleRegenerate}>
            브랜드명 다시 생성하기
          </RegenerateButton>
        </ActionButtons>
      </ContentArea>

      <ButtonContainer>
        <PrevButton onClick={handlePrev}>
          <ButtonText>이전</ButtonText>
        </PrevButton>
        <NextButton $disabled={isNextDisabled} onClick={handleNext} disabled={isNextDisabled}>
          <ButtonText>생성하기</ButtonText>
        </NextButton>
      </ButtonContainer>
    </PageContainer>
  );
};

export default BrandNameGeneration; 