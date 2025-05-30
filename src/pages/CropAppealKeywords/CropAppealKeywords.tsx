import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import KeywordTag from '../../components/common/KeywordTag/KeywordTag';
import iconCancel from '../../assets/icon-cancel.svg';
import { CROP_APPEAL_KEYWORDS } from '../../constants/keywords';

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
  padding: 51px 51px 0 51px;
  flex: 1;
  min-height: 0;
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 100%;
  max-height: calc(874px - 47px - 51px - 114px - 32px);
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
  padding: 9px 15px 40px 15px;
  box-sizing: border-box;
  
  /* 스크롤바 숨기기 */
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
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
  transition: background 0.2s ease;

  &:hover {
    background: #757575;
  }

  &:active {
    background: #616161;
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
  transition: background 0.2s ease;

  &:hover {
    background: ${props => props.$disabled ? '#CCCCCC' : '#1a3a9e'};
  }

  &:active {
    background: ${props => props.$disabled ? '#CCCCCC' : '#163285'};
  }
`;

const ButtonText = styled.span`
  font-family: 'Jalnan 2', sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 1.18;
  color: #ffffff;
`;

interface LocationState {
  brandingKeywords?: string[];
}

const CropAppealKeywords: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);

  // 이전 페이지에서 받아온 키워드들
  const state = location.state as LocationState;
  const brandingKeywords = state?.brandingKeywords || [];

  const handleClose = () => {
    navigate('/branding-keywords');
  };

  const handleKeywordToggle = (keywordId: string) => {
    setSelectedKeywords(prev => 
      prev.includes(keywordId)
        ? prev.filter(id => id !== keywordId)
        : [...prev, keywordId]
    );
  };

  const handlePrev = () => {
    navigate('/branding-keywords');
  };

  const handleNext = () => {
    console.log('선택된 작물 매력 키워드:', selectedKeywords);
    navigate('/logo-image-keywords', {
      state: {
        brandingKeywords: brandingKeywords,
        cropKeywords: selectedKeywords
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
          <Title>{`작물이 가진 매력을\n선택해주세요.`}</Title>
          
          <KeywordContainer>
            <KeywordGrid>
              {CROP_APPEAL_KEYWORDS.map((keyword) => (
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

      <ButtonContainer>
        <PrevButton onClick={handlePrev}>
          <ButtonText>이전</ButtonText>
        </PrevButton>
        <NextButton $disabled={isNextDisabled} onClick={handleNext} disabled={isNextDisabled}>
          <ButtonText>다음</ButtonText>
        </NextButton>
      </ButtonContainer>
    </PageContainer>
  );
};

export default CropAppealKeywords; 