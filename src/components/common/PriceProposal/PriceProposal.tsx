import React from 'react';
import styled from 'styled-components';
import iconPrice from '../../../assets/icon-price.svg';
import iconTrash from '../../../assets/icon-trash.svg';

const CARD_WIDTH = 360;

const Container = styled.div<{ hasDate: boolean }>`
  display: flex;
  flex-direction: column;
  gap: ${props => props.hasDate ? '17px' : '0px'};
  width: ${CARD_WIDTH}px;
`;

const DateSection = styled.div`
  position: relative;
  width: 276.226px;
  height: 14px;
`;

const DateText = styled.div`
  position: absolute;
  left: 7px;
  top: 0;
  width: 261px;
  height: 14px;
  font-family: 'Jalnan 2', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 1.18;
  letter-spacing: -4.17%;
  color: #9C9C9C;
  display: flex;
  align-items: center;
`;

const DateLine = styled.div`
  position: absolute;
  left: 0;
  top: 16px;
  width: 360px;
  height: 1px;
  background: #9C9C9C;
`;

const ProposalCard = styled.div<{ selected?: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 8px 14px;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0px 4px 28px 0px rgba(0, 0, 0, 0.15);
  box-sizing: border-box;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 2px solid ${props => props.selected ? '#1F41BB' : 'transparent'};

  &:hover {
    box-shadow: 0px 6px 32px 0px rgba(0, 0, 0, 0.2);
    transform: translateY(-1px);
    background: #fafafa;
  }

  &:active {
    transform: translateY(0px);
    box-shadow: 0px 2px 16px 0px rgba(0, 0, 0, 0.1);
  }

  ${props => props.selected && `
    box-shadow: 0px 4px 28px 0px rgba(31, 65, 187, 0.25);
    background: #f8f9ff;
  `}
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex: 1;
  height: 24px;
`;

const ProductNameContainer = styled.div`
  width: 279px;
  height: 24px;
  opacity: 0.8;
  position: relative;
`;

const ProductName = styled.div`
  position: absolute;
  left: 0;
  top: 3.5px;
  width: 82px;
  height: 17px;
  font-family: 'Jalnan 2', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 1.18;
  letter-spacing: -3.57%;
  color: #000000;
  display: flex;
  align-items: center;
`;

const PriceContainer = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  height: 24px;
`;

const PriceIconContainer = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PriceIcon = styled.img`
  width: 24px;
  height: 24px;
`;

const PriceTextContainer = styled.div`
  height: 17px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 65px;
`;

const PriceText = styled.span`
  font-family: 'Jalnan 2', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 1.18;
  letter-spacing: -3.57%;
  color: #000000;
  text-align: center;
  white-space: nowrap;
`;

const TrashButtonContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 2px 3px;
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

export type PriceProposalVariant = 'withDate' | 'withoutDate';

interface PriceProposalProps {
  productName: string;
  price: string;
  date?: string;
  variant?: PriceProposalVariant;
  selected?: boolean;
  onDelete?: () => void;
  onClick?: () => void;
  className?: string;
}

const PriceProposal: React.FC<PriceProposalProps> = ({
  productName,
  price,
  date,
  variant = 'withoutDate',
  selected = false,
  onDelete,
  onClick,
  className,
}) => {
  const showDate = variant === 'withDate' && date;

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete?.();
  };

  const handleCardClick = () => {
    onClick?.();
  };

  return (
    <Container hasDate={!!showDate} className={className}>
      {showDate && (
        <DateSection>
          <DateText>{date}</DateText>
          <DateLine />
        </DateSection>
      )}
      <ProposalCard selected={selected} onClick={handleCardClick}>
        <ContentContainer>
          <ProductNameContainer>
            <ProductName>{productName}</ProductName>
            <PriceContainer>
              <PriceIconContainer>
                <PriceIcon src={iconPrice} alt="원" />
              </PriceIconContainer>
              <PriceTextContainer>
                <PriceText>{price}</PriceText>
              </PriceTextContainer>
            </PriceContainer>
          </ProductNameContainer>
        </ContentContainer>
        <TrashButtonContainer>
          <TrashButton onClick={handleDeleteClick} aria-label="삭제" type="button">
            <TrashIcon src={iconTrash} alt="삭제" />
          </TrashButton>
        </TrashButtonContainer>
      </ProposalCard>
    </Container>
  );
};

export default PriceProposal; 