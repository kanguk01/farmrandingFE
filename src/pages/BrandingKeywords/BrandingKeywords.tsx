import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import KeywordTag from '../../components/common/KeywordTag/KeywordTag';
import iconCancel from '../../assets/icon-cancel.svg';
import { BRAND_IMAGE_KEYWORDS } from '../../constants/keywords';

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
  padding: 51px 51px 130px 51px;
  flex: 1;
  min-height: 0;
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 300px;
  height: 100%;
`;

const Title = styled.h1`
  font-family: 'Jalnan 2', sans-serif;
  font-weight: 400;
  font-size: 24px;
  line-height: 1.67;
  letter-spacing: 4.17%;
  text-align: center;
  color: #000000;
  margin: 0 0 64px 0;
  white-space: pre-line;
  flex-shrink: 0;
`;

const KeywordContainer = styled.div`
  position: relative;
  flex: 1;
  min-height: 0;
`;

const KeywordGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 23px 12px;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 9px 15px 40px 15px;
  box-sizing: border-box;
  
  /* 스크롤바 스타일링 */
  &::-webkit-scrollbar {
    width: 4px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(31, 65, 187, 0.3);
    border-radius: 2px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: rgba(31, 65, 187, 0.5);
  }
`;

const FadeOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 40px;
  background: linear-gradient(transparent, #F4FAFF);
  pointer-events: none;
  z-index: 1;
`;

const FloatingButtonContainer = styled.div`
  position: fixed;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 320px;
  padding: 0 16px;
  box-sizing: border-box;
  display: flex;
  justify-content: stretch;
  align-items: stretch;
  gap: 12px;
  z-index: 100;
  
  /* 버튼들 위에 그라데이션 배경 추가 */
  &::before {
    content: '';
    position: absolute;
    bottom: -20px;
    left: -20px;
    right: -20px;
    height: 80px;
    background: linear-gradient(transparent, rgba(244, 250, 255, 0.8), #F4FAFF);
    border-radius: 0 0 20px 20px;
    z-index: -1;
  }
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
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  &:hover {
    background: #757575;
    transform: translateY(-1px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
  }

  &:active {
    background: #616161;
    transform: translateY(0);
  }
`;

const NextButton = styled.button<{ $disabled: boolean }>`
  flex: 1;
  padding: 17px;
  background: ${props => props.$disabled ? '#CCCCCC' : '#1F41BB'};
  border: none;
  border-radius: 8px;
  cursor: ${props => props.$disabled ? 'not-allowed' : 'pointer'};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  &:hover {
    background: ${props => props.$disabled ? '#CCCCCC' : '#1a3a9e'};
    transform: ${props => props.$disabled ? 'none' : 'translateY(-1px)'};
    box-shadow: ${props => props.$disabled ? '0 4px 12px rgba(0, 0, 0, 0.1)' : '0 6px 16px rgba(31, 65, 187, 0.2)'};
  }

  &:active {
    background: ${props => props.$disabled ? '#CCCCCC' : '#163285'};
    transform: ${props => props.$disabled ? 'none' : 'translateY(0)'};
  }
`;

const ButtonText = styled.span`
  font-family: 'Jalnan 2', sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 1.18;
  color: #ffffff;
`;

const BrandingKeywords: React.FC = () => {
  const navigate = useNavigate();
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);

  const handleClose = () => {
    navigate('/gap-verification');
  };

  const handleKeywordToggle = (keywordId: string) => {
    setSelectedKeywords(prev => 
      prev.includes(keywordId)
        ? prev.filter(id => id !== keywordId)
        : [...prev, keywordId]
    );
  };

  const handlePrev = () => {
    navigate('/gap-verification');
  };

  const handleNext = () => {
    console.log('선택된 브랜드 키워드:', selectedKeywords);
    navigate('/crop-appeal-keywords', {
      state: {
        brandingKeywords: selectedKeywords
      }
    });
  };

  const isNextDisabled = selectedKeywords.length === 0;

  return (
    <PageContainer>
      <Header>
        <CloseButton onClick={handleClose} aria-label="닫기">
          <CloseIcon src={iconCancel} alt="닫기" />
        </CloseButton>
      </Header>

      <ContentArea>
        <MainContent>
          <Title>{`원하는 브랜드 이미지를\n선택해주세요.`}</Title>
          
          <KeywordContainer>
            <KeywordGrid>
              {BRAND_IMAGE_KEYWORDS.map((keyword) => (
                <KeywordTag
                  key={keyword.id}
                  variant={selectedKeywords.includes(keyword.id) ? 'selected' : 'default'}
                  onClick={() => handleKeywordToggle(keyword.id)}
                >
                  {keyword.label}
                </KeywordTag>
              ))}
            </KeywordGrid>
            <FadeOverlay />
          </KeywordContainer>
        </MainContent>
      </ContentArea>

      <FloatingButtonContainer>
        <PrevButton onClick={handlePrev}>
          <ButtonText>이전</ButtonText>
        </PrevButton>
        <NextButton $disabled={isNextDisabled} onClick={handleNext} disabled={isNextDisabled}>
          <ButtonText>다음</ButtonText>
        </NextButton>
      </FloatingButtonContainer>
    </PageContainer>
  );
};

export default BrandingKeywords; 