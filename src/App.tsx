import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import Home from './pages/Home';
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
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 402px;
  min-height: 100vh;
  background: #F4FAFF;
  position: relative;
  
  @media (max-width: 402px) {
    max-width: 100%;
  }
`;

function App() {
  return (
    <Router>
      <AppContainer>
        <ContentWrapper>
          <Routes>
            <Route path="/" element={<Home />} />
            {/* 추가 페이지 라우트는 여기에 추가 */}
          </Routes>
        </ContentWrapper>
      </AppContainer>
    </Router>
  );
}

export default App;
