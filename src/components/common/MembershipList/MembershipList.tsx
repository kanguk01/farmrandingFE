import React, { useState } from 'react';
import styled from 'styled-components';
import iconSort from '../../../assets/icon-sort.svg';
import iconShield from '../../../assets/icon-shield.svg';
import iconRocket from '../../../assets/icon-rocket.svg';
import iconDiamond from '../../../assets/icon-diamond.svg';

const MembershipContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  max-width: 400px;
  padding: 20px;
  box-sizing: border-box;
`;

const HeaderSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const SortButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: transparent;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  cursor: pointer;
  align-self: flex-start;
  transition: all 0.2s ease;

  &:hover {
    background: #f5f5f5;
    border-color: #1f41bb;
  }

  &:active {
    transform: scale(0.98);
  }
`;

const SortIcon = styled.img`
  width: 16px;
  height: 16px;
`;

const SortText = styled.span`
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 12px;
  color: #000000;
`;

const MembershipGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const MembershipCard = styled.div<{ isRecommended?: boolean; isPremium?: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: ${props => props.isRecommended ? '32px 24px 24px 24px' : '24px'};
  margin-top: ${props => props.isRecommended ? '12px' : '0'};
  background: ${props => {
    if (props.isRecommended) return 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    if (props.isPremium) return 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)';
    return '#ffffff';
  }};
  border-radius: 16px;
  box-shadow: ${props => 
    props.isRecommended || props.isPremium 
      ? '0px 12px 32px rgba(31, 65, 187, 0.25)' 
      : '0px 8px 24px rgba(0, 0, 0, 0.15)'
  };
  border: ${props => 
    props.isRecommended || props.isPremium 
      ? 'none' 
      : '1px solid #f0f0f0'
  };
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${props => 
      props.isRecommended || props.isPremium 
        ? '0px 16px 40px rgba(31, 65, 187, 0.35)' 
        : '0px 12px 32px rgba(0, 0, 0, 0.25)'
    };
  }

  ${props => (props.isRecommended || props.isPremium) && `
    color: white;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(45deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%);
      pointer-events: none;
    }
  `}
`;

const RecommendedBadge = styled.div`
  position: absolute;
  top: -6px;
  right: 20px;
  background: #ff6b6b;
  color: white;
  padding: 6px 14px;
  border-radius: 16px;
  font-family: 'Jalnan 2', sans-serif;
  font-size: 11px;
  font-weight: 400;
  box-shadow: 0px 4px 12px rgba(255, 107, 107, 0.4);
  z-index: 10;
  white-space: nowrap;
`;

const PlanHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
`;

const PlanIconContainer = styled.div<{ planType: 'basic' | 'premium' | 'premium-plus' }>`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  img {
    width: 100%;
    height: 100%;
    filter: ${props => {
      switch (props.planType) {
        case 'basic':
          return 'brightness(0) saturate(100%) invert(27%) sepia(51%) saturate(2878%) hue-rotate(346deg) brightness(104%) contrast(97%)'; // #1f41bb 파란색
        case 'premium':
          return 'brightness(0) saturate(100%) invert(84%) sepia(58%) saturate(2476%) hue-rotate(2deg) brightness(119%) contrast(119%)'; // #ff6b6b 빨간색
        case 'premium-plus':
          return 'brightness(0) saturate(100%) invert(84%) sepia(30%) saturate(1352%) hue-rotate(87deg) brightness(118%) contrast(119%)'; // #ffd700 골드색
        default:
          return 'none';
      }
    }};
    
    ${props => (props.planType === 'premium' || props.planType === 'premium-plus') && `
      filter: brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(7500%) hue-rotate(324deg) brightness(106%) contrast(106%); // 하얀색
    `}
  }
`;

const PlanEmoji = styled.span`
  font-size: 20px;
`;

const PlanTitle = styled.h3<{ isSpecial?: boolean }>`
  font-family: 'Jalnan 2', sans-serif;
  font-weight: 400;
  font-size: 18px;
  line-height: 1.2;
  margin: 0;
  color: ${props => props.isSpecial ? 'inherit' : '#000000'};
`;

const PlanPrice = styled.div<{ isSpecial?: boolean }>`
  font-family: 'Jalnan 2', sans-serif;
  font-weight: 400;
  font-size: 24px;
  line-height: 1.2;
  margin-bottom: 8px;
  color: ${props => props.isSpecial ? 'inherit' : '#1f41bb'};
`;

const PlanDescription = styled.p<{ isSpecial?: boolean }>`
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 13px;
  line-height: 1.4;
  margin: 0 0 16px 0;
  color: ${props => props.isSpecial ? 'rgba(255,255,255,0.9)' : '#666666'};
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const FeatureItem = styled.li<{ isSpecial?: boolean }>`
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 1.3;
  color: ${props => props.isSpecial ? 'rgba(255,255,255,0.95)' : '#333333'};
  display: flex;
  align-items: flex-start;
  gap: 8px;

  &::before {
    content: '•';
    color: ${props => props.isSpecial ? 'rgba(255,255,255,0.8)' : '#1f41bb'};
    font-weight: bold;
    margin-top: 2px;
  }
`;

const SelectButton = styled.button<{ isSpecial?: boolean }>`
  margin-top: 16px;
  padding: 12px 24px;
  background: ${props => props.isSpecial ? 'rgba(255,255,255,0.2)' : '#1f41bb'};
  color: ${props => props.isSpecial ? 'white' : 'white'};
  border: ${props => props.isSpecial ? '1px solid rgba(255,255,255,0.3)' : 'none'};
  border-radius: 8px;
  font-family: 'Jalnan 2', sans-serif;
  font-weight: 400;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.isSpecial ? 'rgba(255,255,255,0.3)' : '#1a3aa3'};
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

export interface MembershipPlan {
  id: string;
  emoji?: string;
  iconType?: 'shield' | 'rocket' | 'diamond';
  title: string;
  price: string;
  description: string;
  features: string[];
  isRecommended?: boolean;
  isPremium?: boolean;
}

export type SortType = 'price-asc' | 'price-desc' | 'name' | 'recommended';

interface MembershipListProps {
  plans: MembershipPlan[];
  onSelectPlan?: (planId: string) => void;
  className?: string;
}

const MembershipList: React.FC<MembershipListProps> = ({
  plans,
  onSelectPlan,
  className,
}) => {
  const [sortType, setSortType] = useState<SortType>('recommended');

  const handleSort = () => {
    const sortOptions: SortType[] = ['recommended', 'price-asc', 'price-desc', 'name'];
    const currentIndex = sortOptions.indexOf(sortType);
    const nextIndex = (currentIndex + 1) % sortOptions.length;
    setSortType(sortOptions[nextIndex]);
  };

  const getSortedPlans = () => {
    const plansCopy = [...plans];
    
    switch (sortType) {
      case 'price-asc':
        return plansCopy.sort((a, b) => {
          const priceA = parseInt(a.price.replace(/[^0-9]/g, '')) || 0;
          const priceB = parseInt(b.price.replace(/[^0-9]/g, '')) || 0;
          return priceA - priceB;
        });
      case 'price-desc':
        return plansCopy.sort((a, b) => {
          const priceA = parseInt(a.price.replace(/[^0-9]/g, '')) || 0;
          const priceB = parseInt(b.price.replace(/[^0-9]/g, '')) || 0;
          return priceB - priceA;
        });
      case 'name':
        return plansCopy.sort((a, b) => a.title.localeCompare(b.title));
      case 'recommended':
      default:
        return plansCopy.sort((a, b) => {
          if (a.isRecommended && !b.isRecommended) return -1;
          if (!a.isRecommended && b.isRecommended) return 1;
          if (a.isPremium && !b.isPremium) return -1;
          if (!a.isPremium && b.isPremium) return 1;
          return 0;
        });
    }
  };

  const getSortButtonText = () => {
    switch (sortType) {
      case 'price-asc': return '가격 낮은순';
      case 'price-desc': return '가격 높은순';
      case 'name': return '이름순';
      case 'recommended': return '추천순';
      default: return '정렬';
    }
  };

  const getIconForPlan = (plan: MembershipPlan) => {
    if (plan.iconType) {
      switch (plan.iconType) {
        case 'shield':
          return iconShield;
        case 'rocket':
          return iconRocket;
        case 'diamond':
          return iconDiamond;
      }
    }
    return null;
  };

  const getPlanType = (plan: MembershipPlan): 'basic' | 'premium' | 'premium-plus' => {
    if (plan.isPremium) return 'premium-plus';
    if (plan.isRecommended) return 'premium';
    return 'basic';
  };

  return (
    <MembershipContainer className={className}>
      <HeaderSection>
        <SortButton onClick={handleSort}>
          <SortIcon src={iconSort} alt="정렬" />
          <SortText>{getSortButtonText()}</SortText>
        </SortButton>
      </HeaderSection>

      <MembershipGrid>
        {getSortedPlans().map((plan) => (
          <MembershipCard 
            key={plan.id}
            isRecommended={plan.isRecommended}
            isPremium={plan.isPremium}
          >
            {plan.isRecommended && (
              <RecommendedBadge>추천</RecommendedBadge>
            )}
            
            <PlanHeader>
              {getIconForPlan(plan) ? (
                <PlanIconContainer planType={getPlanType(plan)}>
                  <img src={getIconForPlan(plan)} alt={`${plan.title} 아이콘`} />
                </PlanIconContainer>
              ) : (
                <PlanEmoji>{plan.emoji}</PlanEmoji>
              )}
              <PlanTitle isSpecial={plan.isRecommended || plan.isPremium}>
                {plan.title}
              </PlanTitle>
            </PlanHeader>

            <PlanPrice isSpecial={plan.isRecommended || plan.isPremium}>
              {plan.price}
            </PlanPrice>

            <PlanDescription isSpecial={plan.isRecommended || plan.isPremium}>
              {plan.description}
            </PlanDescription>

            <FeatureList>
              {plan.features.map((feature, index) => (
                <FeatureItem 
                  key={index}
                  isSpecial={plan.isRecommended || plan.isPremium}
                >
                  {feature}
                </FeatureItem>
              ))}
            </FeatureList>

            <SelectButton 
              isSpecial={plan.isRecommended || plan.isPremium}
              onClick={() => onSelectPlan?.(plan.id)}
            >
              선택하기
            </SelectButton>
          </MembershipCard>
        ))}
      </MembershipGrid>
    </MembershipContainer>
  );
};

export default MembershipList; 