import React, { useState } from 'react';
import styled from 'styled-components';
import iconDownload from '../../../assets/icon-download.svg';
import iconCopy from '../../../assets/icon-copy.svg';
import MoreButton from '../MoreButton/MoreButton';

const BrandResultCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 48px 21px;
  width: 358px;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0px 8px 24px 0px rgba(0, 0, 0, 0.25);
  box-sizing: border-box;
`;

const ContentFrame = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 25px;
  width: 320px;
`;

const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-self: stretch;
  gap: 4px;
  width: 100%;
`;

const LabelContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-self: stretch;
  gap: 4px;
  width: 100%;
`;

const FieldLabel = styled.span`
  font-family: 'Jalnan 2', sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 1.18;
  text-align: left;
  color: #000000;
  flex: 1;
`;

const CopyButton = styled.button`
  width: 16px;
  height: 16px;
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    opacity: 0.7;
  }

  &:active {
    transform: scale(0.95);
  }
`;

const CopyIcon = styled.img`
  width: 100%;
  height: 100%;
`;

const InputField = styled.div`
  display: flex;
  align-items: center;
  padding: 0px 7px;
  width: 100%;
  height: 33px;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0px 8px 24px 0px rgba(0, 0, 0, 0.15);
  box-sizing: border-box;
`;

const InputText = styled.span`
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 1.21;
  text-align: left;
  color: #9c9c9c;
  width: 100%;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
`;

const BrandImage = styled.img`
  width: 100%;
  height: 100%;
  background: #a4a4a4;
  border-radius: 0;
  object-fit: cover;
`;

const DownloadButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  width: 18px;
  height: 18px;
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    opacity: 0.7;
  }

  &:active {
    transform: scale(0.95);
  }
`;

const DownloadIcon = styled.img`
  width: 100%;
  height: 100%;
`;

const StoryField = styled.div<{ isExpanded: boolean; isPremium: boolean }>`
  display: flex;
  align-items: flex-start;
  padding: 0px 7px;
  width: 100%;
  height: ${props => props.isExpanded ? 'auto' : '45px'};
  min-height: 45px;
  background: #ffffff;
  border-radius: ${props => props.isExpanded || props.isPremium ? '8px' : '8px 8px 0px 0px'};
  box-shadow: 0px 8px 24px 0px rgba(0, 0, 0, 0.15);
  box-sizing: border-box;
`;

const StoryText = styled.span<{ isExpanded: boolean }>`
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 1.21;
  text-align: left;
  color: #9c9c9c;
  width: 100%;
  padding-top: 6px;
  display: ${props => props.isExpanded ? 'block' : '-webkit-box'};
  -webkit-line-clamp: ${props => props.isExpanded ? 'none' : '2'};
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const StoryContainer = styled.div`
  width: 100%;
  position: relative;
`;

export interface BrandResultData {
  brandName: string;
  promotionText: string;
  story: string;
  imageUrl?: string;
}

interface BrandResultProps {
  data: BrandResultData;
  isPremium?: boolean;
  onCopy?: (field: 'brandName' | 'promotionText' | 'story', value: string) => void;
  onDownload?: (imageUrl: string) => void;
  className?: string;
}

const BrandResult: React.FC<BrandResultProps> = ({
  data,
  isPremium = false,
  onCopy,
  onDownload,
  className,
}) => {
  const [isStoryExpanded, setIsStoryExpanded] = useState(false);

  const handleCopy = (field: 'brandName' | 'promotionText' | 'story', value: string) => {
    navigator.clipboard.writeText(value);
    onCopy?.(field, value);
  };

  const handleDownload = () => {
    if (data.imageUrl) {
      onDownload?.(data.imageUrl);
    }
  };

  const handleMoreClick = () => {
    setIsStoryExpanded(!isStoryExpanded);
  };

  const showMoreButton = !isPremium && !isStoryExpanded;

  return (
    <BrandResultCard className={className}>
      <ContentFrame>
        <FieldContainer>
          <LabelContainer>
            <FieldLabel>브랜드명</FieldLabel>
          </LabelContainer>
          <InputField>
            <InputText>{data.brandName}</InputText>
          </InputField>
        </FieldContainer>

        <ImageContainer>
          <BrandImage 
            src={data.imageUrl || 'https://placehold.co/200x200/a4a4a4/ffffff?text=Brand+Image'} 
            alt="브랜드 이미지" 
          />
          <DownloadButton onClick={handleDownload}>
            <DownloadIcon src={iconDownload} alt="다운로드" />
          </DownloadButton>
        </ImageContainer>

        <FieldContainer>
          <LabelContainer>
            <FieldLabel>홍보 문구</FieldLabel>
            <CopyButton onClick={() => handleCopy('promotionText', data.promotionText)}>
              <CopyIcon src={iconCopy} alt="복사" />
            </CopyButton>
          </LabelContainer>
          <InputField>
            <InputText>{data.promotionText}</InputText>
          </InputField>
        </FieldContainer>

        <FieldContainer>
          <LabelContainer>
            <FieldLabel>스토리</FieldLabel>
            <CopyButton onClick={() => handleCopy('story', data.story)}>
              <CopyIcon src={iconCopy} alt="복사" />
            </CopyButton>
          </LabelContainer>
          <StoryContainer>
            <StoryField isExpanded={isStoryExpanded} isPremium={isPremium}>
              <StoryText isExpanded={isStoryExpanded}>
                {data.story}
              </StoryText>
            </StoryField>
            {showMoreButton && (
              <MoreButton 
                text="프리미엄 구독하고 더 보기"
                onClick={handleMoreClick}
              />
            )}
          </StoryContainer>
        </FieldContainer>
      </ContentFrame>
    </BrandResultCard>
  );
};

export default BrandResult; 