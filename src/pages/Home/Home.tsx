import React from 'react';
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
import chevronUp from '../../assets/icon-chevronUp.svg';

// 과일 이미지 import
import fruit1 from '../../assets/fruit/Watermelon.svg';
import fruit2 from '../../assets/fruit/Garlic.svg';
import fruit3 from '../../assets/fruit/image 13.svg';
import fruit4 from '../../assets/fruit/image 17.svg';
import fruit5 from '../../assets/fruit/Pumpkin from Recraft.svg';
import fruit6 from '../../assets/fruit/Asparagus from Recraft.svg';
import fruit7 from '../../assets/fruit/image 30.svg';
import fruit8 from '../../assets/fruit/Lemon.svg';
import fruit9 from '../../assets/fruit/Avocado from Recraft.svg';
import fruit10 from '../../assets/fruit/Grape.svg';
import fruit11 from '../../assets/fruit/Potato from Recraft.svg';
import fruit12 from '../../assets/fruit/Chili Pepper.svg';

const fruitImages = [
  fruit1, fruit2, fruit3, fruit4, fruit5, fruit6, fruit7, fruit8, fruit9, fruit10, fruit11, fruit12
];

// 과일 배열 변형 함수
function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

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
  min-height: 340px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px 0 32px 0;
`;

const BgLogo = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 204px;
  height: 297px;
  opacity: 0.08;
  transform: translate(-50%, -50%);
  pointer-events: none;
`;

const MainTitle = styled.h1`
  font-family: 'Jalnan 2', sans-serif !important;
  font-size: 32px;
  color: #1F41BB;
  text-align: center;
  margin: 0 0 12px 0;
  z-index: 2;
`;

const SubTitle = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 18px;
  color: #252525;
  text-align: center;
  z-index: 2;
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
  
  /* 태블릿에서도 전체 너비 */
  @media (min-width: 768px) {
    margin-left: -32px;
    margin-right: -32px;
  }
  
  /* 데스크탑에서도 전체 너비 */
  @media (min-width: 1024px) {
    margin-left: -40px;
    margin-right: -40px;
  }
`;

const ServiceSection = styled.section`
  width: 100%;
  padding: 32px 0 32px 0;
  background: transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ServiceBlock = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 64px;
  &:last-child { margin-bottom: 0; }
`;

const ServiceTitle = styled.h2`
  font-family: 'Jalnan 2', sans-serif !important;
  font-size: 24px;
  color: #1F41BB;
  margin: 0 0 24px 0;
  text-align: center;
`;

const ServiceCardImg = styled.img`
  width: 100%;
  max-width: 331px;
  height: auto;
  display: block;
  margin: 0 auto;
  border-radius: 16px;
`;

const TestimonialSection = styled.section`
  width: 100%;
  padding: 48px 0 64px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 96px;
  position: relative;
  min-height: 400px;
`;

const ScrollToTopWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  margin-top: 64px;
`;

const ScrollToTopButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border: none;
  background: rgba(31, 65, 187, 0.1);
  border-radius: 50%;
  cursor: pointer;
  transition: transform 0.18s, background 0.18s;
  z-index: 10;
  
  &:hover {
    transform: scale(1.1);
    background: rgba(31, 65, 187, 0.2);
  }
`;

const ScrollToTopIcon = styled.img`
  width: 32px;
  height: 32px;
  pointer-events: none;
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

const Home: React.FC = () => {
  const fruitImagesRow1 = fruitImages;
  const fruitImagesRow2 = [...fruitImages].reverse();
  const fruitImagesRow3 = shuffleArray(fruitImages);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
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
            브랜딩과 가격을 입히는 경험,<br />
            팜랜딩에서 시작하세요.
          </SubTitle>
        </HeroSection>

        {/* 섹션 2: 과일/채소 무한 스크롤 */}
        <FruitSection>
          <FruitInfiniteRow images={fruitImagesRow1} direction="left" speed={30} shadow={true} />
          <FruitInfiniteRow images={fruitImagesRow2} direction="right" speed={50} shadow={true} />
          <FruitInfiniteRow images={fruitImagesRow3} direction="left" speed={30} shadow={true} />
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