import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import Home from './pages/Home/Home';
import Branding from './pages/Branding/Branding';
import BrandingKeywords from './pages/BrandingKeywords/BrandingKeywords';
import BrandNameGeneration from './pages/BrandNameGeneration/BrandNameGeneration';
import BrandResult from './pages/BrandResult/BrandResult';
import MyPage from './pages/MyPage/MyPage';
import PriceQuote from './pages/PriceQuote/PriceQuote';
import PriceResult from './pages/PriceResult/PriceResult';
import CropAppealKeywords from './pages/CropAppealKeywords/CropAppealKeywords';
import LogoImageKeywords from './pages/LogoImageKeywords/LogoImageKeywords';
import GapVerification from './pages/GapVerification/GapVerification';
import { checkFontLoaded } from './utils/fontLoader';
import './App.css';

const AppContainer = styled.div<{ $fontLoading: boolean }>`
  width: 100vw;
  min-height: 100vh;
  background: #F4FAFF;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  font-family: var(--font-jalnan-loaded, var(--font-jalnan)) !important;
  font-weight: 800 !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
  
  /* 폰트 로딩 중일 때 애니메이션 적용 */
  ${props => props.$fontLoading && `
    animation: fontLoadForce 3s ease-in-out;
  `}
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 402px;
  min-height: 100vh;
  background: #F4FAFF;
  position: relative;
  overflow-x: hidden;
  
  @media (max-width: 402px) {
    max-width: 100vw;
  }
`;

function App() {
  const [fontLoading, setFontLoading] = useState(true);

  useEffect(() => {
    // 폰트 로딩 상태 체크
    const checkFont = () => {
      const isLoaded = checkFontLoaded();
      console.log(`🔍 앱에서 폰트 확인: ${isLoaded ? '성공' : '실패'}`);
      
      if (isLoaded) {
        setFontLoading(false);
      }
    };

    // 초기 체크
    checkFont();

    // 주기적 체크 (3초간)
    const interval = setInterval(checkFont, 500);
    
    // 3초 후 강제 종료
    const timeout = setTimeout(() => {
      setFontLoading(false);
      clearInterval(interval);
      console.log('🔧 폰트 로딩 애니메이션 종료');
    }, 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <Router>
      <AppContainer $fontLoading={fontLoading}>
        <ContentWrapper>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/branding" element={<Branding />} />
            <Route path="/gap-verification" element={<GapVerification />} />
            <Route path="/branding-keywords" element={<BrandingKeywords />} />
            <Route path="/crop-appeal-keywords" element={<CropAppealKeywords />} />
            <Route path="/logo-image-keywords" element={<LogoImageKeywords />} />
            <Route path="/brand-name-generation" element={<BrandNameGeneration />} />
            <Route path="/brand-result" element={<BrandResult />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/price-quote" element={<PriceQuote />} />
            <Route path="/price-result" element={<PriceResult />} />
            {/* 추가 페이지 라우트는 여기에 추가 */}
          </Routes>
        </ContentWrapper>
      </AppContainer>
    </Router>
  );
}

export default App;
