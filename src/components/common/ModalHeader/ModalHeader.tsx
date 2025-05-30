import React from 'react';
import styled from 'styled-components';
import iconClose from '../../../assets/icon-close.svg';

const MODAL_HEADER_WIDTH = 375;
const MODAL_HEADER_HEIGHT = 56;

const HeaderContainer = styled.header`
  width: 100%;
  max-width: ${MODAL_HEADER_WIDTH}px;
  height: ${MODAL_HEADER_HEIGHT}px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  border-bottom: 1px solid #d9d9d9;
  box-sizing: border-box;
  padding: 0 16px;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const Title = styled.div`
  flex: 1;
  text-align: center;
  font-size: 18px;
  font-weight: 700;
  color: #222;
  letter-spacing: -0.02em;
  line-height: 1;
`;

interface ModalHeaderProps {
  title: string;
  onClickClose: () => void;
  right?: React.ReactNode;
}

const ModalHeader: React.FC<ModalHeaderProps> = ({ title, onClickClose, right }) => {
  return (
    <HeaderContainer role="banner" aria-label="모달 헤더">
      <IconButton onClick={onClickClose} aria-label="닫기">
        <img src={iconClose} alt="닫기" width={24} height={24} />
      </IconButton>
      <Title>{title}</Title>
      <div style={{ width: 40, display: 'flex', justifyContent: 'flex-end' }}>{right}</div>
    </HeaderContainer>
  );
};

export default ModalHeader; 