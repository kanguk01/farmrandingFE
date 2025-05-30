import React from 'react';
import styled, { keyframes } from 'styled-components';
import iconTrash from '../../../assets/icon-trash.svg';

const IMAGE_SIZE = 72;

// 애니메이션
const slideInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const shimmer = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
  width: 100%;
  max-width: 100%;
  padding: 16px;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(31, 65, 187, 0.08);
  border: 1px solid rgba(31, 65, 187, 0.05);
  box-sizing: border-box;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  animation: ${slideInUp} 0.6s ease-out;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, #1F41BB 0%, #4F46E5 50%, #818CF8 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 32px rgba(31, 65, 187, 0.15);
    border-color: rgba(31, 65, 187, 0.1);
    
    &::before {
      opacity: 1;
    }
  }

  &:active {
    transform: translateY(-2px);
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
  flex: 1;
  min-width: 0;
`;

const ImageContainer = styled.div`
  position: relative;
  flex-shrink: 0;
`;

const ProductImage = styled.img`
  width: ${IMAGE_SIZE}px;
  height: ${IMAGE_SIZE}px;
  border-radius: 12px;
  object-fit: cover;
  background: linear-gradient(135deg, #F8FAFC 0%, #E2E8F0 100%);
  transition: all 0.3s ease;
  
  ${CardContainer}:hover & {
    transform: scale(1.05);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  }
`;

const ImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%);
  border-radius: 12px;
  opacity: 0;
  transition: opacity 0.3s ease;
  
  ${CardContainer}:hover & {
    opacity: 1;
    animation: ${shimmer} 1.5s ease-in-out;
  }
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
  min-width: 0;
`;

const ProductTitle = styled.h3`
  font-family: 'Jalnan 2', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 1.3;
  color: #1E293B;
  margin: 0;
  text-align: left;
  background: linear-gradient(135deg, #1F41BB 0%, #3B82F6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 500;
`;

const ProductDescription = styled.p`
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 1.5;
  color: #64748B;
  margin: 0;
  text-align: left;
  word-break: keep-all;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ActionContainer = styled.div`
  display: flex;
  align-items: flex-start;
  padding-top: 4px;
  flex-shrink: 0;
`;

const TrashButton = styled.button`
  width: 36px;
  height: 36px;
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.2);
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  flex-shrink: 0;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: rgba(239, 68, 68, 0.1);
    border-radius: 50%;
    transition: all 0.3s ease;
    transform: translate(-50%, -50%);
  }

  &:hover {
    background: rgba(239, 68, 68, 0.15);
    border-color: rgba(239, 68, 68, 0.3);
    transform: scale(1.05);
    
    &::before {
      width: 100%;
      height: 100%;
    }
  }

  &:active {
    transform: scale(0.95);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.2);
  }
`;

const TrashIcon = styled.img`
  width: 14px;
  height: 14px;
  filter: brightness(0) saturate(100%) invert(28%) sepia(99%) saturate(3207%) hue-rotate(343deg) brightness(96%) contrast(93%);
  transition: all 0.3s ease;
  position: relative;
  z-index: 1;
  
  ${TrashButton}:hover & {
    transform: scale(1.1);
  }
`;

interface BrandingCardProps {
  title: string;
  description: string;
  imageUrl?: string;
  onDelete?: () => void;
  className?: string;
}

const BrandingCard: React.FC<BrandingCardProps> = ({
  title,
  description,
  imageUrl = 'https://placehold.co/72x72/E8F4FF/1F41BB?text=🌱',
  onDelete,
  className,
}) => {
  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete?.();
  };

  return (
    <CardContainer className={className}>
      <ContentContainer>
        <ImageContainer>
          <ProductImage 
            src={imageUrl} 
            alt={title}
            onError={(e) => {
              e.currentTarget.src = 'https://placehold.co/72x72/E8F4FF/1F41BB?text=🌱';
            }}
          />
          <ImageOverlay />
        </ImageContainer>
        <TextContainer>
          <ProductTitle>{title}</ProductTitle>
          <ProductDescription>{description}</ProductDescription>
        </TextContainer>
      </ContentContainer>
      <ActionContainer>
        <TrashButton 
          onClick={handleDeleteClick} 
          aria-label="삭제"
          type="button"
        >
          <TrashIcon src={iconTrash} alt="삭제" />
        </TrashButton>
      </ActionContainer>
    </CardContainer>
  );
};

export default BrandingCard; 