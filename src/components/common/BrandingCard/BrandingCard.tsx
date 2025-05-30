import React from 'react';
import styled from 'styled-components';
import iconTrash from '../../../assets/icon-trash.svg';

const CARD_WIDTH = 360;
const IMAGE_SIZE = 72;

const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  gap: 10px;
  width: ${CARD_WIDTH}px;
  padding: 8px;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0px 8px 24px 0px rgba(0, 0, 0, 0.15);
  box-sizing: border-box;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 11px;
  flex: 1;
`;

const ProductImage = styled.img`
  width: ${IMAGE_SIZE}px;
  height: ${IMAGE_SIZE}px;
  border-radius: 4px;
  object-fit: cover;
  background: #f5f5f5;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
  max-width: 261px;
`;

const ProductTitle = styled.h3`
  font-family: 'Jalnan 2', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 1.18;
  letter-spacing: -4.17%;
  color: #000000;
  margin: 0;
  text-align: left;
`;

const ProductDescription = styled.p`
  font-family: 'Jalnan 2', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 1.18;
  letter-spacing: -4.17%;
  color: #000000;
  margin: 0;
  text-align: left;
  word-break: keep-all;
`;

const TrashButton = styled.button`
  width: 16px;
  height: 16px;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  flex-shrink: 0;
  margin-top: 4px;

  &:hover {
    opacity: 0.7;
  }

  &:active {
    opacity: 0.5;
  }

  &:focus {
    outline: 2px solid #ff0000;
    outline-offset: 2px;
  }
`;

const TrashIcon = styled.img`
  width: 10px;
  height: 12px;
  filter: brightness(0) saturate(100%) invert(11%) sepia(96%) saturate(7471%) hue-rotate(3deg) brightness(90%) contrast(135%);
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
  imageUrl = 'https://placehold.co/72x72/e5e5e5/999999?text=IMG',
  onDelete,
  className,
}) => {
  const handleDeleteClick = () => {
    onDelete?.();
  };

  return (
    <CardContainer className={className}>
      <ContentContainer>
        <ProductImage 
          src={imageUrl} 
          alt={title}
          onError={(e) => {
            e.currentTarget.src = 'https://placehold.co/72x72/e5e5e5/999999?text=IMG';
          }}
        />
        <TextContainer>
          <ProductTitle>{title}</ProductTitle>
          <ProductDescription>{description}</ProductDescription>
        </TextContainer>
      </ContentContainer>
      <TrashButton 
        onClick={handleDeleteClick} 
        aria-label="삭제"
        type="button"
      >
        <TrashIcon src={iconTrash} alt="삭제" />
      </TrashButton>
    </CardContainer>
  );
};

export default BrandingCard; 