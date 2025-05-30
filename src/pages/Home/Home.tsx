import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../../components/common/Header';
import ServiceCard from '../../components/common/ServiceCard';
import TemporaryChart from '../../components/common/TemporaryChart';

const PageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const ContentArea = styled.div`
  flex: 1;
  padding: 68px 21px 20px;
  overflow-y: auto;
  box-sizing: border-box;
`;

const ServiceCardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 38px;
  margin-bottom: 38px;
`;

const ChartContainer = styled.div`
  width: 100%;
  margin-top: 20px;
`;

interface HomeProps {
  className?: string;
}

const Home: React.FC<HomeProps> = ({ className }) => {
  const navigate = useNavigate();

  const handleBrandingClick = () => {
    console.log('브랜딩 서비스 클릭');
    navigate('/branding');
  };

  const handlePricingClick = () => {
    console.log('가격 예측 서비스 클릭');
    // TODO: 가격 예측 페이지로 라우팅
  };

  const handleLogoClick = () => {
    console.log('로고 클릭');
    // TODO: 메인 페이지 리프레시 또는 스크롤 탑
  };

  const handleMypageClick = () => {
    console.log('마이페이지 클릭');
    navigate('/mypage');
  };

  return (
    <PageContainer className={className}>
      <Header 
        onClickLogo={handleLogoClick}
        onClickMypage={handleMypageClick}
      />
      
      <ContentArea>
        <ServiceCardsContainer>
          <ServiceCard 
            variant="branding" 
            onClick={handleBrandingClick}
          />
          <ServiceCard 
            variant="pricing" 
            onClick={handlePricingClick}
          />
        </ServiceCardsContainer>
        
        <ChartContainer>
          <TemporaryChart title="즐겨찾는 작물 가격 동향" />
        </ChartContainer>
      </ContentArea>
    </PageContainer>
  );
};

export default Home; 