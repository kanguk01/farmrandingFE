import React from 'react';
import styled from 'styled-components';
import logo from '../../../assets/logo.svg';
import iconMypage from '../../../assets/icon-mypage.svg';

const HeaderContainer = styled.header`
  width: 100vw;
  height: 56px;
  background: #fff;
  border-bottom: 1px solid #f0f0f0;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  box-sizing: border-box;
`;

const LogoButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

interface HeaderProps {
  onClickLogo?: () => void;
  onClickMypage?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onClickLogo, onClickMypage }) => {
  return (
    <HeaderContainer role="banner" aria-label="상단 헤더">
      <LogoButton onClick={onClickLogo} aria-label="메인으로 이동">
        <img src={logo} alt="로고" width={116} height={32} />
      </LogoButton>
      <IconButton onClick={onClickMypage} aria-label="마이페이지로 이동">
        <img src={iconMypage} alt="마이페이지" width={28} height={28} />
      </IconButton>
    </HeaderContainer>
  );
};

export default Header; 