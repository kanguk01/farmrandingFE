import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import miniLogo from '../../assets/miniLogo.svg';
import card1 from '../../assets/card1.svg';
import card2 from '../../assets/card2.svg';
import background from '../../assets/background.svg';
import iconPeople1 from '../../assets/icon-people1.svg';
import iconPeople2 from '../../assets/icon-people2.svg';
import iconPeople3 from '../../assets/icon-people3.svg';
import FruitInfiniteRow from '../../components/common/FruitInfiniteRow';
import Testimonial from '../../components/common/Testimonial';
import logo from '../../assets/logo.svg';
import chevronUp from '../../assets/icon-ChevronUp.svg';
import kakaoLogin from '../../assets/kakaoLogin.svg';

// 과일 이미지 import - 최적화된 버전 사용 + 우선순위별로 정렬
import fruit1 from '../../assets/fruit-optimized/image 13.svg'; // 183KB
import fruit2 from '../../assets/fruit-optimized/image 30.svg'; // 184KB  
import fruit3 from '../../assets/fruit-optimized/image 17.svg'; // 260KB
import fruit4 from '../../assets/fruit-optimized/Garlic.svg'; // 490KB

// 빠른 로딩용 기본 이미지들 (4개씩 3줄 = 12개)
const fastLoadingFruits = [fruit1, fruit2, fruit3, fruit4];

// 나머지 이미지들 (점진적 로딩용)
import fruit5 from '../../assets/fruit-optimized/Chili Pepper.svg'; // 517KB
import fruit6 from '../../assets/fruit-optimized/Avocado from Recraft.svg'; // 539KB
import fruit7 from '../../assets/fruit-optimized/Watermelon.svg'; // 558KB
import fruit8 from '../../assets/fruit-optimized/Grape.svg'; // 564KB

const mediumLoadingFruits = [fruit5, fruit6, fruit7, fruit8];

// 큰 이미지들 (마지막 로딩)
import fruit9 from '../../assets/fruit-optimized/Potato from Recraft.svg'; // 734KB
import fruit10 from '../../assets/fruit-optimized/Pumpkin from Recraft.svg'; // 785KB
import fruit11 from '../../assets/fruit-optimized/Lemon.svg'; // 806KB
import fruit12 from '../../assets/fruit-optimized/Asparagus from Recraft.svg'; // 844KB

const slowLoadingFruits = [fruit9, fruit10, fruit11, fruit12];

// 모든 과일 (점진적 확장)
const allFruits = [...fastLoadingFruits, ...mediumLoadingFruits, ...slowLoadingFruits];

const fruitImages = [
  fruit1, fruit2, fruit3, fruit4, fruit5, fruit6, fruit7, fruit8, fruit9, fruit10, fruit11, fruit12
];

// 랜딩페이지 전체 래퍼 - 완전히 흰색 배경
const LandingPageWrapper = styled.div`
  width: 100vw;
  min-height: 100vh;
  background: #FFFFFF !important;
  position: relative;
  overflow-x: hidden;
`;

const PageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #FFFFFF;
  position: relative;
  padding: 56px 16px 140px 16px;
  box-sizing: border-box;
  
  /* 모바일 퍼스트 */
  @media (min-width: 768px) {
    padding: 56px 32px 140px 32px;
  }
  
  /* 데스크탑 */
  @media (min-width: 1024px) {
    padding: 56px 40px 140px 40px;
  }
`;

const LandingHeader = styled.header`
  width: 100vw;
  height: 56px;
  background: #fff;
  border-bottom: 1px solid #f0f0f0;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
`;

const HeaderContent = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  
  /* 태블릿 */
  @media (min-width: 768px) {
    padding: 0 32px;
  }
  
  /* 데스크탑 */
  @media (min-width: 1024px) {
    padding: 0 40px;
  }
`;

const LogoButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const NavMenu = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;

const NavButton = styled.button`
  background: none;
  border: none;
  font-size: 14px;
  color: #333;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 8px;
  transition: background 0.2s;
  
  &:hover {
    background: #f5f5f5;
  }
`;

const HeroSection = styled.section`
  width: 100%;
  min-height: 300px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 0 32px 0;
  
  /* 태블릿 */
  @media (min-width: 768px) {
    min-height: 380px;
    padding: 48px 0 40px 0;
  }
  
  /* 데스크탑 */
  @media (min-width: 1024px) {
    min-height: 450px;
    padding: 60px 0 48px 0;
  }
  
  /* 대형 화면 */
  @media (min-width: 1440px) {
    min-height: 520px;
    padding: 80px 0 60px 0;
  }
`;

const BgLogo = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 220px;
  height: 320px;
  opacity: 0.08;
  transform: translate(-50%, -50%);
  pointer-events: none;
  
  /* 태블릿 */
  @media (min-width: 768px) {
    width: 280px;
    height: 408px;
    opacity: 0.1;
  }
  
  /* 데스크탑 */
  @media (min-width: 1024px) {
    width: 340px;
    height: 496px;
    opacity: 0.12;
  }
  
  /* 대형 화면 */
  @media (min-width: 1440px) {
    width: 400px;
    height: 584px;
    opacity: 0.15;
  }
`;

const MainTitle = styled.h1`
  font-family: 'Jalnan 2', sans-serif !important;
  font-size: 36px;
  color: #1F41BB;
  text-align: center;
  margin: 0 0 16px 0;
  z-index: 2;
  
  /* 태블릿 */
  @media (min-width: 768px) {
    font-size: 44px;
    margin: 0 0 20px 0;
  }
  
  /* 데스크탑 */
  @media (min-width: 1024px) {
    font-size: 52px;
    margin: 0 0 24px 0;
  }
  
  /* 대형 화면 */
  @media (min-width: 1440px) {
    font-size: 60px;
    margin: 0 0 28px 0;
  }
`;

const SubTitle = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 18px;
  color: #252525;
  text-align: center;
  z-index: 2;
  line-height: 1.5;
  margin-bottom: 32px;
  
  /* 태블릿 */
  @media (min-width: 768px) {
    font-size: 20px;
    line-height: 1.6;
    margin-bottom: 40px;
  }
  
  /* 데스크탑 */
  @media (min-width: 1024px) {
    font-size: 22px;
    line-height: 1.6;
    margin-bottom: 48px;
  }
  
  /* 대형 화면 */
  @media (min-width: 1440px) {
    font-size: 24px;
    line-height: 1.7;
    margin-bottom: 56px;
  }
`;

const HighlightText = styled.span`
  color: #1F41BB;
  font-weight: 600;
  font-size: 1.1em;
  
  /* 태블릿 */
  @media (min-width: 768px) {
    font-size: 1.15em;
  }
  
  /* 데스크탑 */
  @media (min-width: 1024px) {
    font-size: 1.2em;
  }
  
  /* 대형 화면 */
  @media (min-width: 1440px) {
    font-size: 1.25em;
  }
`;

const BrandText = styled.span`
  color: #1F41BB;
  font-weight: 700;
  font-size: 1.15em;
  
  /* 태블릿 */
  @media (min-width: 768px) {
    font-size: 1.2em;
  }
  
  /* 데스크탑 */
  @media (min-width: 1024px) {
    font-size: 1.25em;
  }
  
  /* 대형 화면 */
  @media (min-width: 1440px) {
    font-size: 1.3em;
  }
`;

const FruitSection = styled.section`
  width: 100vw;
  background: transparent;
  padding: 0 0 32px 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
  overflow: hidden;
  margin-left: -16px;
  margin-right: -16px;
  min-height: 270px;
  
  /* 태블릿에서도 전체 너비 */
  @media (min-width: 768px) {
    margin-left: -32px;
    margin-right: -32px;
    min-height: 330px;
  }
  
  /* 데스크탑에서도 전체 너비 */
  @media (min-width: 1024px) {
    margin-left: -40px;
    margin-right: -40px;
    min-height: 330px;
  }
`;

const ServiceSection = styled.section`
  width: 100%;
  padding: 32px 0;
  background: transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  
  /* 태블릿 */
  @media (min-width: 768px) {
    padding: 48px 0;
    gap: 40px;
  }
  
  /* 데스크탑 - 가로 배치 */
  @media (min-width: 1024px) {
    padding: 64px 0;
    flex-direction: row;
    justify-content: center;
    gap: 48px;
    align-items: flex-start;
  }
  
  /* 대형 화면 */
  @media (min-width: 1440px) {
    padding: 80px 0;
    gap: 64px;
  }
`;

const ServiceBlock = styled.div`
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  
  /* 태블릿 */
  @media (min-width: 768px) {
    max-width: 450px;
    gap: 24px;
  }
  
  /* 데스크탑 - 가로 배치용 */
  @media (min-width: 1024px) {
    width: 45%;
    max-width: 480px;
    gap: 24px;
  }
  
  /* 대형 화면 */
  @media (min-width: 1440px) {
    width: 42%;
    max-width: 520px;
    gap: 28px;
  }
`;

const ServiceTitle = styled.h2`
  font-family: 'Jalnan 2', sans-serif !important;
  font-size: 20px;
  color: #1F41BB;
  margin: 0;
  text-align: center;
  line-height: 1.4;
  
  /* 태블릿 */
  @media (min-width: 768px) {
    font-size: 22px;
    line-height: 1.4;
  }
  
  /* 데스크탑 */
  @media (min-width: 1024px) {
    font-size: 24px;
    line-height: 1.3;
  }
  
  /* 대형 화면 */
  @media (min-width: 1440px) {
    font-size: 26px;
    line-height: 1.3;
  }
`;

const ServiceCardImg = styled.img`
  width: 100%;
  max-width: 400px;
  height: auto;
  display: block;
  margin: 0 auto;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  
  /* 태블릿 */
  @media (min-width: 768px) {
    max-width: 450px;
    border-radius: 16px;
    box-shadow: 0 6px 24px rgba(0, 0, 0, 0.1);
  }
  
  /* 데스크탑 */
  @media (min-width: 1024px) {
    max-width: 480px;
    border-radius: 20px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
    
    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
    }
  }
  
  /* 대형 화면 */
  @media (min-width: 1440px) {
    max-width: 520px;
    border-radius: 24px;
  }
`;

const TestimonialSection = styled.section`
  width: 100%;
  padding: 48px 0 64px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  position: relative;
  min-height: 400px;
  
  /* 태블릿 */
  @media (min-width: 768px) {
    padding: 64px 0 80px 0;
    gap: 48px;
    min-height: 500px;
  }
  
  /* 데스크탑 - 그리드 레이아웃 */
  @media (min-width: 1024px) {
    padding: 80px 0 100px 0;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto;
    gap: 48px 32px;
    justify-items: center;
    align-items: start;
    max-width: 1000px;
    margin: 0 auto;
    min-height: 400px;
    
    /* 첫 번째 후기 - 왼쪽 상단 */
    & > *:nth-child(1) {
      grid-column: 1;
      grid-row: 1;
      justify-self: end;
    }
    
    /* 두 번째 후기 - 오른쪽 전체 (세로로 중앙 배치) */
    & > *:nth-child(2) {
      grid-column: 2;
      grid-row: 1 / 3;
      align-self: center;
      justify-self: start;
    }
    
    /* 세 번째 후기 - 왼쪽 하단 */
    & > *:nth-child(3) {
      grid-column: 1;
      grid-row: 2;
      justify-self: end;
    }
  }
  
  /* 대형 화면 */
  @media (min-width: 1440px) {
    padding: 100px 0 120px 0;
    gap: 56px 40px;
    max-width: 1200px;
  }
`;

const ScrollToTopWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  margin-top: 48px;
  
  /* 태블릿 */
  @media (min-width: 768px) {
    margin-top: 64px;
  }
  
  /* 데스크탑 */
  @media (min-width: 1024px) {
    margin-top: 80px;
  }
  
  /* 대형 화면 */
  @media (min-width: 1440px) {
    margin-top: 100px;
  }
`;

const ScrollToTopButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  border: none;
  background: rgba(31, 65, 187, 0.1);
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 10;
  
  &:hover {
    transform: scale(1.1) translateY(-2px);
    background: rgba(31, 65, 187, 0.2);
    box-shadow: 0 8px 24px rgba(31, 65, 187, 0.15);
  }
  
  &:active {
    transform: scale(1.05) translateY(-1px);
  }
  
  /* 태블릿 */
  @media (min-width: 768px) {
    width: 64px;
    height: 64px;
  }
  
  /* 데스크탑 */
  @media (min-width: 1024px) {
    width: 72px;
    height: 72px;
    
    &:hover {
      transform: scale(1.15) translateY(-4px);
      box-shadow: 0 12px 32px rgba(31, 65, 187, 0.2);
    }
  }
  
  /* 대형 화면 */
  @media (min-width: 1440px) {
    width: 80px;
    height: 80px;
  }
`;

const ScrollToTopIcon = styled.img`
  width: 24px;
  height: 24px;
  pointer-events: none;
  transition: all 0.3s ease;
  
  /* 태블릿 */
  @media (min-width: 768px) {
    width: 28px;
    height: 28px;
  }
  
  /* 데스크탑 */
  @media (min-width: 1024px) {
    width: 32px;
    height: 32px;
  }
  
  /* 대형 화면 */
  @media (min-width: 1440px) {
    width: 36px;
    height: 36px;
  }
  
  ${ScrollToTopButton}:hover & {
    transform: translateY(-1px);
  }
`;

const RelativeBgSection = styled.div`
  position: relative;
  width: 100%;
  min-height: 1200px;
  padding-bottom: 120px;
  overflow: hidden;

  .section-bg-img {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 1;
    z-index: 0;
    pointer-events: none;
    user-select: none;
    object-fit: cover;
  }

  & > *:not(.section-bg-img) {
    position: relative;
    z-index: 1;
  }
`;

const KakaoLoginButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 240px;
  height: 40px;
  background: #FEE500;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 10;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 0px;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
    background: #FCDC00;
  }
  
  &:active {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }
  
  /* 태블릿 */
  @media (min-width: 768px) {
    max-width: 260px;
    height: 40px;
    padding: 0px;
  }
  
  /* 데스크탑 */
  @media (min-width: 1024px) {
    max-width: 300px;
    height: 44px;
    padding: 0px;
  }
  
  /* 대형 화면 */
  @media (min-width: 1440px) {
    max-width: 240px;
    height: 40px;
    padding: 0px;
  }
`;

const KakaoLoginImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  pointer-events: none;
  max-width: 264px;
  max-height: 32px;
  
  /* 태블릿 */
  @media (min-width: 768px) {
    max-width: 300px;
    max-height: 32px;
  }
  
  /* 데스크탑 */
  @media (min-width: 1024px) {
    max-width: 316px;
    max-height: 32px;
  }
  
  /* 대형 화면 */
  @media (min-width: 1440px) {
    max-width: 332px;
    max-height: 32px;
  }
`;

const Home: React.FC = () => {
  const navigate = useNavigate();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleKakaoLogin = () => {
    navigate('/home');
  };

  return (
    <>
      <LandingHeader>
        <HeaderContent>
          <LogoButton onClick={() => window.scrollTo({ top: 0 })}>
            <img src={logo} alt="로고" width={116} height={32} />
          </LogoButton>
          <NavMenu>
            <NavButton onClick={() => scrollToSection('service-section')}>
              서비스
            </NavButton>
            <NavButton onClick={() => scrollToSection('testimonial-section')}>
              후기
            </NavButton>
          </NavMenu>
        </HeaderContent>
      </LandingHeader>
      
      <PageContainer>
        {/* 섹션 1: 메인 타이틀 + 배경로고 */}
        <HeroSection>
          <BgLogo src={miniLogo} alt="배경로고" />
          <MainTitle>팜 랜 딩</MainTitle>
          <SubTitle>
            당신의 작물에<br />
            <HighlightText>브랜딩</HighlightText>과 <HighlightText>가격</HighlightText>을 입히는 경험,<br />
            <BrandText>팜랜딩</BrandText>에서 시작하세요.
          </SubTitle>
          <KakaoLoginButton onClick={handleKakaoLogin}>
            <KakaoLoginImg src={kakaoLogin} alt="카카오 로그인" />
          </KakaoLoginButton>
        </HeroSection>

        {/* 섹션 2: 과일/채소 무한 스크롤 - 순차적 로딩 */}
        <FruitSection>
          <FruitInfiniteRow 
            images={fastLoadingFruits} 
            direction="left" 
            speed={20} 
            shadow={true} 
            rowIndex={0}
          />
          <FruitInfiniteRow 
            images={mediumLoadingFruits} 
            direction="right" 
            speed={20} 
            shadow={true} 
            rowIndex={1}
          />
          <FruitInfiniteRow 
            images={slowLoadingFruits} 
            direction="left" 
            speed={20} 
            shadow={true} 
            rowIndex={2}
          />
        </FruitSection>

        <RelativeBgSection>
          <img src={background} alt="배경 패턴" className="section-bg-img" />
          <ServiceSection id="service-section">
            <ServiceBlock>
              <ServiceTitle>경쟁력을 디자인하는<br />[브랜딩 서비스]</ServiceTitle>
              <ServiceCardImg src={card1} alt="브랜딩 서비스 카드" />
            </ServiceBlock>
            <ServiceBlock>
              <ServiceTitle>내 작물에 맞는<br />[가격 제안 서비스]</ServiceTitle>
              <ServiceCardImg src={card2} alt="가격 제안 서비스 카드" />
            </ServiceBlock>
          </ServiceSection>
          <TestimonialSection id="testimonial-section">
            <Testimonial
              image={iconPeople1}
              name="충남 홍성 청년농부"
              text={'"브랜드 덕분에 직거래 판매가 늘었어요"'}
            />
            <Testimonial
              image={iconPeople2}
              name="경북 김천 캠벨포도 농가"
              text={'"처음 직거래 시작했을 때 가격을\n어떻게 책정할지 몰랐는데 큰 도움이 됐어요."'}
              reverse
              bgColor="#2748BE"
            />
            <Testimonial
              image={iconPeople3}
              name="전남 순천 단호박 농가"
              text={'"판매글 자동 생성 기능 덕에 스마트스토어 등록이 훨씬 쉬워졌어요."'}
            />
          </TestimonialSection>
          <ScrollToTopWrapper>
            <ScrollToTopButton
              onClick={() => {
                // 여러 방법으로 스크롤 시도
                window.scrollTo({ top: 0 });
                document.documentElement.scrollTop = 0;
                document.body.scrollTop = 0;
                
                // React 루트 엘리먼트도 시도
                const rootElement = document.getElementById('root');
                if (rootElement) {
                  rootElement.scrollTop = 0;
                }
              }}
              aria-label="최상단으로"
            >
              <ScrollToTopIcon src={chevronUp} alt="최상단으로" />
            </ScrollToTopButton>
          </ScrollToTopWrapper>
        </RelativeBgSection>
      </PageContainer>
    </>
  );
};

export default Home; 