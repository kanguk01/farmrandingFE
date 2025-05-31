import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard/Home';
import BrandingFlow from './pages/BrandingFlow/BrandingFlow';
import BrandResult from './pages/BrandResult/BrandResult';
import MyPage from './pages/MyPage/MyPage';
import PriceQuoteFlow from './pages/PriceQuoteFlow/PriceQuoteFlow';
import './App.css';

const AppContainer = styled.div<{ isLanding: boolean }>`
  width: 100vw;
  min-height: 100vh;
  background: ${props => props.isLanding ? '#FFFFFF' : '#F4FAFF'};
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  font-family: var(--font-jalnan) !important;
  font-weight: 800 !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
`;

const ContentWrapper = styled.div<{ isLanding: boolean }>`
  width: 100%;
  min-height: 100vh;
  background: ${props => props.isLanding ? '#FFFFFF' : '#F4FAFF'};
  position: relative;
  
  /* 랜딩페이지가 아닐 때만 최대 너비 제한 */
  ${props => !props.isLanding && `
    max-width: 402px;
    margin: 0 auto;
    
    @media (max-width: 402px) {
      max-width: 100vw;
    }
  `}
`;

function AppContent() {
  const location = useLocation();
  const isLanding = location.pathname === '/';

  return (
    <AppContainer isLanding={isLanding}>
      <ContentWrapper isLanding={isLanding}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Dashboard />} />
          <Route path="/branding" element={<BrandingFlow />} />
          <Route path="/brand-result" element={<BrandResult />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/price-quote" element={<PriceQuoteFlow />} />
          {/* 추가 페이지 라우트는 여기에 추가 */}
        </Routes>
      </ContentWrapper>
    </AppContainer>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
