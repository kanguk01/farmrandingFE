import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import Header from '../../components/common/Header/Header';
import MyPageTabGroup from '../../components/common/MyPageTabGroup/MyPageTabGroup';
import type { MyPageTabOption } from '../../components/common/MyPageTab/MyPageTab';
import BrandingCard from '../../components/common/BrandingCard/BrandingCard';
import PersonalInfo, { type PersonalInfoData } from '../../components/common/PersonalInfo/PersonalInfo';
import iconSort from '../../assets/icon-sort.svg';
import iconBrush from '../../assets/icon-brush.svg';
import iconMoney from '../../assets/icon-money.svg';
import iconDiamond from '../../assets/icon-diamond.svg';

// 애니메이션
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-8px);
  }
`;

const PageContainer = styled.div`
  width: 100%;
  max-width: 402px;
  min-height: 100vh;
  background: #F4FAFF;
  display: flex;
  flex-direction: column;
  position: relative;
  margin: 0 auto;
  overflow-x: hidden;
  box-sizing: border-box;
`;

const ContentArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 16px 40px 16px;
  flex: 1;
  width: 100%;
  box-sizing: border-box;
  max-width: 100%;
  overflow-x: hidden;
`;

const SectionTitle = styled.h2`
  font-family: 'Jalnan 2', sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 1.18;
  letter-spacing: -2%;
  color: #1F41BB;
  margin: 0 0 24px 0;
  align-self: flex-start;
  animation: ${fadeIn} 0.6s ease-out;
`;

const PersonalInfoContainer = styled.div`
  width: 100%;
  max-width: 370px;
  margin-bottom: 48px;
  animation: ${fadeIn} 0.6s ease-out 0.1s both;
  box-sizing: border-box;
`;

const TabContainer = styled.div`
  width: 100%;
  max-width: 100%;
  margin-bottom: 24px;
  animation: ${fadeIn} 0.6s ease-out 0.2s both;
  display: flex;
  justify-content: center;
  overflow-x: hidden;
  box-sizing: border-box;
`;

const HistoryContainer = styled.div`
  width: 100%;
  max-width: 100%;
  background: #FFFFFF;
  border-radius: 16px 16px 0 0;
  box-shadow: 0 -4px 20px rgba(31, 65, 187, 0.08);
  overflow: hidden;
  flex: 1;
  display: flex;
  flex-direction: column;
  animation: ${fadeIn} 0.6s ease-out 0.3s both;
  box-sizing: border-box;
`;

const SortSection = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 20px 20px 16px 20px;
  background: #FFFFFF;
  border-bottom: 1px solid #F0F4F8;
  box-sizing: border-box;
`;

const SortButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  background: rgba(31, 65, 187, 0.08);
  border: 1px solid rgba(31, 65, 187, 0.2);
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: fit-content;

  &:hover {
    background: rgba(31, 65, 187, 0.12);
    border-color: rgba(31, 65, 187, 0.3);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(31, 65, 187, 0.15);
  }

  &:active {
    transform: translateY(0);
  }
`;

const SortIcon = styled.img`
  width: 16px;
  height: 16px;
  flex-shrink: 0;
`;

const SortText = styled.span`
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 13px;
  line-height: 1.2;
  color: #1F41BB;
  white-space: nowrap;
`;

const HistoryListContainer = styled.div`
  padding: 32px 20px 40px 20px;
  display: flex;
  flex-direction: column;
  gap: 40px;
  background: #FFFFFF;
  flex: 1;
  overflow-y: auto;
  box-sizing: border-box;
`;

const DateGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  box-sizing: border-box;
`;

const DateHeader = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 8px;
`;

const DateText = styled.div`
  font-family: 'Jalnan 2', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 1.18;
  color: #6B7280;
  margin-bottom: 8px;
`;

const DateLine = styled.div`
  width: 100%;
  height: 1px;
  background: linear-gradient(90deg, #E5E7EB 0%, rgba(229, 231, 235, 0) 100%);
`;

const CardsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  box-sizing: border-box;
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
  color: #9CA3AF;
  background: #FFFFFF;
  flex: 1;
`;

const EmptyIconContainer = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(31, 65, 187, 0.1) 0%, rgba(79, 70, 229, 0.05) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
  position: relative;
  transition: all 0.3s ease;
  animation: ${float} 3s ease-in-out infinite;

  &::before {
    content: '';
    position: absolute;
    top: -4px;
    left: -4px;
    right: -4px;
    bottom: -4px;
    border-radius: 50%;
    background: linear-gradient(135deg, rgba(31, 65, 187, 0.2) 0%, rgba(79, 70, 229, 0.1) 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    transform: scale(1.05);
    
    &::before {
      opacity: 1;
    }
  }
`;

const EmptyIcon = styled.img`
  width: 32px;
  height: 32px;
  object-fit: contain;
  filter: brightness(0) saturate(100%) invert(25%) sepia(98%) saturate(1653%) hue-rotate(221deg) brightness(96%) contrast(91%);
  transition: all 0.3s ease;
  position: relative;
  z-index: 1;

  ${EmptyIconContainer}:hover & {
    transform: scale(1.1);
    filter: brightness(0) saturate(100%) invert(43%) sepia(96%) saturate(1352%) hue-rotate(221deg) brightness(99%) contrast(94%);
  }
`;

const EmptyTitle = styled.div`
  font-family: 'Jalnan 2', sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 1.4;
  color: #6B7280;
  margin-bottom: 8px;
`;

const EmptyDescription = styled.div`
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 1.5;
  color: #9CA3AF;
`;

// Mock 데이터 타입 정의
interface BrandingHistory {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  createdAt: string;
}

type SortType = 'latest' | 'oldest' | 'name';

const MyPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState<MyPageTabOption>('branding');
  const [sortType, setSortType] = useState<SortType>('latest');

  // Mock 브랜딩 이력 데이터
  const brandingHistory: BrandingHistory[] = [
    {
      id: '1',
      title: '뽀사과',
      description: '한 입에 쏙, 귀여움이 톡!',
      imageUrl: 'https://placehold.co/72x72/ff6b6b/ffffff?text=🍎',
      createdAt: '2025.05.15'
    },
    {
      id: '2',
      title: '하은 감자',
      description: '자연이 키운 진심의 맛',
      imageUrl: 'https://placehold.co/72x72/8B4513/ffffff?text=🥔',
      createdAt: '2025.05.15'
    },
    {
      id: '3',
      title: '싱싱초록',
      description: '노지에서 자란 고품질 오이고추, 바로 산지에서 보내드립니다.',
      imageUrl: 'https://placehold.co/72x72/32CD32/ffffff?text=🌶️',
      createdAt: '2025.05.14'
    },
    {
      id: '4',
      title: '토담토',
      description: '"햇살과 정성을 가득 담은 산지직송 대추토마토, 토담토가 전하는 자연 그대로의 달콤함."',
      imageUrl: 'https://placehold.co/72x72/FF6347/ffffff?text=🍅',
      createdAt: '2025.05.14'
    }
  ];

  // PersonalInfo 데이터
  const personalData: PersonalInfoData = {
    name: "기요미",
    farmName: "기요미 하은팜",
    location: "○○도 □□시 △△동"
  };

  const handleTabChange = (tab: MyPageTabOption) => {
    setSelectedTab(tab);
  };

  const handleSort = () => {
    const sortOptions: SortType[] = ['latest', 'oldest', 'name'];
    const currentIndex = sortOptions.indexOf(sortType);
    const nextIndex = (currentIndex + 1) % sortOptions.length;
    setSortType(sortOptions[nextIndex]);
  };

  const getSortButtonText = () => {
    switch (sortType) {
      case 'latest': return '최신순';
      case 'oldest': return '오래된순';
      case 'name': return '이름순';
      default: return '정렬';
    }
  };

  const getSortedHistory = () => {
    const historyCopy = [...brandingHistory];
    
    switch (sortType) {
      case 'latest':
        return historyCopy.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      case 'oldest':
        return historyCopy.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
      case 'name':
        return historyCopy.sort((a, b) => a.title.localeCompare(b.title));
      default:
        return historyCopy;
    }
  };

  const getGroupedHistory = () => {
    const sortedHistory = getSortedHistory();
    const grouped: { [date: string]: BrandingHistory[] } = {};
    
    sortedHistory.forEach(item => {
      if (!grouped[item.createdAt]) {
        grouped[item.createdAt] = [];
      }
      grouped[item.createdAt].push(item);
    });
    
    return grouped;
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleMypageClick = () => {
    // 이미 마이페이지에 있으므로 아무것도 하지 않거나 스크롤 탑
    window.scrollTo(0, 0);
  };

  const handleDeleteBranding = (id: string) => {
    console.log(`브랜딩 ${id} 삭제`);
    // TODO: 실제 삭제 로직 구현
  };

  const renderBrandingContent = () => {
    const groupedHistory = getGroupedHistory();
    const dateKeys = Object.keys(groupedHistory);

    if (dateKeys.length === 0) {
      return (
        <EmptyState>
          <EmptyIconContainer>
            <EmptyIcon src={iconBrush} alt="브랜딩" />
          </EmptyIconContainer>
          <EmptyTitle>브랜딩 이력이 없습니다</EmptyTitle>
          <EmptyDescription>
            첫 번째 브랜드를 만들어보세요!<br />
            홈에서 브랜딩 서비스를 시작할 수 있습니다.
          </EmptyDescription>
        </EmptyState>
      );
    }

    return (
      <HistoryListContainer>
        {dateKeys.map(date => (
          <DateGroup key={date}>
            <DateHeader>
              <DateText>{date}</DateText>
              <DateLine />
            </DateHeader>
            <CardsList>
              {groupedHistory[date].map(item => (
                <BrandingCard
                  key={item.id}
                  title={item.title}
                  description={item.description}
                  imageUrl={item.imageUrl}
                  onDelete={() => handleDeleteBranding(item.id)}
                />
              ))}
            </CardsList>
          </DateGroup>
        ))}
      </HistoryListContainer>
    );
  };

  const renderTabContent = () => {
    switch (selectedTab) {
      case 'branding':
        return renderBrandingContent();
      case 'pricing':
        return (
          <EmptyState>
            <EmptyIconContainer>
              <EmptyIcon src={iconMoney} alt="가격" />
            </EmptyIconContainer>
            <EmptyTitle>가격 제안 이력이 없습니다</EmptyTitle>
            <EmptyDescription>
              아직 가격 제안 기능이 준비되지 않았습니다.<br />
              곧 업데이트될 예정입니다!
            </EmptyDescription>
          </EmptyState>
        );
      case 'membership':
        return (
          <EmptyState>
            <EmptyIconContainer>
              <EmptyIcon src={iconDiamond} alt="멤버십" />
            </EmptyIconContainer>
            <EmptyTitle>멤버십 정보가 없습니다</EmptyTitle>
            <EmptyDescription>
              프리미엄 멤버십으로 업그레이드하면<br />
              더 많은 기능을 이용할 수 있습니다.
            </EmptyDescription>
          </EmptyState>
        );
      default:
        return null;
    }
  };

  return (
    <PageContainer>
      <Header 
        onClickLogo={handleLogoClick}
        onClickMypage={handleMypageClick}
      />
      
      <ContentArea>
        <SectionTitle>개인 정보</SectionTitle>
        <PersonalInfoContainer>
          <PersonalInfo data={personalData} />
        </PersonalInfoContainer>

        <TabContainer>
          <MyPageTabGroup
            selectedTab={selectedTab}
            onTabChange={handleTabChange}
          />
        </TabContainer>

        <HistoryContainer>
          {selectedTab === 'branding' && (
            <SortSection>
              <SortButton onClick={handleSort}>
                <SortIcon src={iconSort} alt="정렬" />
                <SortText>{getSortButtonText()}</SortText>
              </SortButton>
            </SortSection>
          )}
          
          {renderTabContent()}
        </HistoryContainer>
      </ContentArea>
    </PageContainer>
  );
};

export default MyPage; 