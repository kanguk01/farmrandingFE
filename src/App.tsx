import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
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
import './App.css';

const AppContainer = styled.div`
  width: 100vw;
  min-height: 100vh;
  background: #F4FAFF;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  font-family: 'Jalnan 2', 'Jalnan', 'Malgun Gothic', '맑은 고딕', 'Apple SD Gothic Neo', 'Noto Sans KR', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
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
  return (
    <Router>
      <AppContainer>
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
