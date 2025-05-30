import React from 'react';
import styled from 'styled-components';
import iconBrush from '../../../assets/icon-brush.svg';
import iconMoney from '../../../assets/icon-money.svg';
import iconChevronRight from '../../../assets/icon-chevronright.svg';

const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  padding: 4px 12px;
  width: 100%;
  height: 56px;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.25);
  box-sizing: border-box;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    box-shadow: 0px 6px 20px 0px rgba(0, 0, 0, 0.3);
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0px);
    box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.2);
  }
`;

const IconContainer = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const IconImage = styled.img`
  width: 24px;
  height: 24px;
  object-fit: contain;
`;

const TextContainer = styled.div`
  flex: 1;
  height: auto;
  display: flex;
  flex-direction: column;
  min-width: 0;
`;

const MainText = styled.div`
  font-family: 'Jalnan 2', sans-serif;
  font-weight: 400;
  color: #000000;
  text-align: left;
  line-height: 1.18;
  letter-spacing: -3.57%;
`;

const FirstLine = styled.div`
  font-size: 10px;
  margin-bottom: 2px;
  color: #1F41BB;
`;

const SecondLine = styled.div`
  font-size: 16px;
`;

const ChevronContainer = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const ChevronIcon = styled.img`
  width: 5.5px;
  height: 9.5px;
`;

export type ServiceCardVariant = 'branding' | 'pricing';

interface ServiceCardProps {
  variant: ServiceCardVariant;
  onClick?: () => void;
  className?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  variant,
  onClick,
  className,
}) => {
  const getIconSrc = () => {
    switch (variant) {
      case 'branding':
        return iconBrush;
      case 'pricing':
        return iconMoney;
      default:
        return iconBrush;
    }
  };

  const getTextLines = () => {
    switch (variant) {
      case 'branding':
        return {
          first: '마케팅은 저희가 할게요.',
          second: '내 작물 브랜딩'
        };
      case 'pricing':
        return {
          first: '적정 가격 찾아드릴게요.',
          second: '예상 가격 받아보기'
        };
      default:
        return { first: '', second: '' };
    }
  };

  const getAltText = () => {
    switch (variant) {
      case 'branding':
        return '브랜딩 서비스';
      case 'pricing':
        return '가격 서비스';
      default:
        return '서비스';
    }
  };

  const handleClick = () => {
    onClick?.();
  };

  const textLines = getTextLines();

  return (
    <CardContainer onClick={handleClick} className={className}>
      <IconContainer>
        <IconImage src={getIconSrc()} alt={getAltText()} />
      </IconContainer>
      <TextContainer>
        <MainText>
          <FirstLine>{textLines.first}</FirstLine>
          <SecondLine>{textLines.second}</SecondLine>
        </MainText>
      </TextContainer>
      <ChevronContainer>
        <ChevronIcon src={iconChevronRight} alt="이동" />
      </ChevronContainer>
    </CardContainer>
  );
};

export default ServiceCard; 