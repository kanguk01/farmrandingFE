import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import InputField from '../../components/common/InputField/InputField';
import Button from '../../components/common/Button/Button';
import iconCancel from '../../assets/icon-cancel.svg';

const PageContainer = styled.div`
  width: 100%;
  height: 874px;
  background: #F4FAFF;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Header = styled.div`
  width: 100%;
  height: 47px;
  background: #F4FAFF;
  display: flex;
  align-items: center;
  padding: 0;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  left: 15px;
  top: 0;
  width: 42px;
  height: 42px;
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;

  &:hover {
    opacity: 0.7;
  }

  &:active {
    opacity: 0.5;
  }
`;

const CloseIcon = styled.img`
  width: 21px;
  height: 21px;
`;

const ContentArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  padding-top: 51px;
  flex: 1;
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 88px;
  width: 100%;
  max-width: 320px;
`;

const Title = styled.h1`
  font-family: 'Jalnan 2', sans-serif;
  font-weight: 400;
  font-size: 24px;
  line-height: 1.67;
  letter-spacing: 4.17%;
  text-align: left;
  color: #000000;
  margin: 0;
`;

const GapVerificationContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 9px;
  width: 100%;
`;

const GapLabel = styled.label`
  font-family: 'Jalnan 2', sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 1.18;
  color: #000000;
  margin: 0;
`;

const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  width: 100%;
`;

const NumberInputWrapper = styled.div`
  position: relative;
  width: 258px;
  height: 33px;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0px 8px 24px 0px rgba(0, 0, 0, 0.15);
`;

const NumberInput = styled.input`
  width: 100%;
  height: 100%;
  background: transparent;
  border: none;
  outline: none;
  padding: 0 7px;
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 1.21;
  color: #000000;
  box-sizing: border-box;

  &::placeholder {
    color: #9c9c9c;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const VerifyButton = styled.button`
  width: 50px;
  height: 33px;
  background: #1F41BB;
  border: none;
  border-radius: 8px;
  box-shadow: 0px 8px 24px 0px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s ease;

  &:hover {
    background: #1a3a9e;
  }

  &:active {
    background: #163285;
  }

  &:disabled {
    background: #9e9e9e;
    cursor: not-allowed;
  }
`;

const VerifyButtonText = styled.span`
  font-family: 'Jalnan 2', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 1.18;
  color: #ffffff;
`;

const VerificationStatus = styled.div<{ $isVisible: boolean; $isSuccess: boolean }>`
  margin-top: 12px;
  padding: 12px 16px;
  background: ${props => props.$isSuccess ? '#E8F5E8' : '#FFE8E8'};
  border-radius: 8px;
  border: 1px solid ${props => props.$isSuccess ? '#4CAF50' : '#F44336'};
  opacity: ${props => props.$isVisible ? 1 : 0};
  visibility: ${props => props.$isVisible ? 'visible' : 'hidden'};
  transition: all 0.3s ease-in-out;
`;

const StatusText = styled.p<{ $isSuccess: boolean }>`
  font-family: 'Jalnan 2', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 1.4;
  color: ${props => props.$isSuccess ? '#2E7D32' : '#C62828'};
  margin: 0;
  text-align: center;
`;

const ButtonContainer = styled.div`
  position: absolute;
  bottom: 114px;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 300px;
  padding: 0 16px;
  box-sizing: border-box;
  display: flex;
  justify-content: stretch;
  align-items: stretch;
  gap: 32px;
`;

const SkipButton = styled.button`
  flex: 1;
  padding: 17px;
  background: #9E9E9E;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s ease;

  &:hover {
    background: #757575;
  }

  &:active {
    background: #616161;
  }
`;

const NextButton = styled.button<{ $disabled: boolean }>`
  flex: 1;
  padding: 17px;
  background: ${props => props.$disabled ? '#CCCCCC' : '#1F41BB'};
  border: none;
  border-radius: 8px;
  cursor: ${props => props.$disabled ? 'not-allowed' : 'pointer'};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s ease;

  &:hover {
    background: ${props => props.$disabled ? '#CCCCCC' : '#1a3a9e'};
  }

  &:active {
    background: ${props => props.$disabled ? '#CCCCCC' : '#163285'};
  }
`;

const ButtonText = styled.span`
  font-family: 'Jalnan 2', sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 1.18;
  color: #ffffff;
`;

interface GapVerificationData {
  gapNumber: string;
  isVerified: boolean;
  verificationMessage: string;
}

type VerificationStatus = 'idle' | 'loading' | 'success' | 'error';

const GapVerification: React.FC = () => {
  const navigate = useNavigate();
  const [gapData, setGapData] = useState<GapVerificationData>({
    gapNumber: '',
    isVerified: false,
    verificationMessage: '',
  });
  const [verificationStatus, setVerificationStatus] = useState<VerificationStatus>('idle');

  const handleClose = () => {
    navigate('/branding');
  };

  const handleInputChange = (value: string) => {
    setGapData(prev => ({
      ...prev,
      gapNumber: value,
    }));
    // 인풋이 변경되면 이전 인증 상태 초기화
    if (verificationStatus !== 'idle') {
      setVerificationStatus('idle');
      setGapData(prev => ({
        ...prev,
        isVerified: false,
        verificationMessage: '',
      }));
    }
  };

  const handleVerify = async () => {
    if (!gapData.gapNumber.trim()) {
      setVerificationStatus('error');
      setGapData(prev => ({
        ...prev,
        verificationMessage: '인증번호를 입력해주세요.',
      }));
      return;
    }

    setVerificationStatus('loading');
    
    try {
      // TODO: 실제 API 호출로 대체
      await simulateApiCall(gapData.gapNumber);
      
      // 성공적인 응답 시뮬레이션
      setVerificationStatus('success');
      setGapData(prev => ({
        ...prev,
        isVerified: true,
        verificationMessage: '인증되었습니다.',
      }));
    } catch (error) {
      // 실패한 응답 시뮬레이션
      setVerificationStatus('error');
      setGapData(prev => ({
        ...prev,
        isVerified: false,
        verificationMessage: '인증번호를 확인해주세요.',
      }));
    }
  };

  // API 호출 시뮬레이션 함수
  const simulateApiCall = async (gapNumber: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // 간단한 검증 로직 (실제로는 서버에서 검증)
        if (gapNumber.length >= 6) {
          resolve();
        } else {
          reject(new Error('Invalid GAP number'));
        }
      }, 1500); // 1.5초 지연
    });
  };

  const handleSkip = () => {
    // TODO: 다음 단계로 이동 (GAP 인증 없이)
    console.log('GAP 인증 건너뛰기');
    navigate('/branding-keywords');
  };

  const handleNext = () => {
    // TODO: 다음 단계로 이동 (브랜딩 키워드 선택)
    console.log('다음 단계:', gapData);
    navigate('/branding-keywords');
  };

  const isNextDisabled = !gapData.isVerified;

  return (
    <PageContainer>
      <Header>
        <CloseButton onClick={handleClose} aria-label="닫기">
          <CloseIcon src={iconCancel} alt="닫기" />
        </CloseButton>
      </Header>

      <ContentArea>
        <MainContent>
          <Title>이 작물은{'\n'}GAP 인증을 받았나요?</Title>
          
          <GapVerificationContainer>
            <GapLabel>GAP 인증번호  [선택 항목]</GapLabel>
            <InputContainer>
              <NumberInputWrapper>
                <NumberInput
                  type="text"
                  placeholder="-123123"
                  value={gapData.gapNumber}
                  onChange={(e) => handleInputChange(e.target.value)}
                  disabled={verificationStatus === 'loading'}
                />
              </NumberInputWrapper>
              <VerifyButton 
                onClick={handleVerify}
                disabled={verificationStatus === 'loading'}
              >
                <VerifyButtonText>
                  {verificationStatus === 'loading' ? '확인중' : '확인'}
                </VerifyButtonText>
              </VerifyButton>
            </InputContainer>
            
            <VerificationStatus 
              $isVisible={verificationStatus === 'success' || verificationStatus === 'error'}
              $isSuccess={verificationStatus === 'success'}
            >
              <StatusText $isSuccess={verificationStatus === 'success'}>
                {gapData.verificationMessage}
              </StatusText>
            </VerificationStatus>
          </GapVerificationContainer>
        </MainContent>
      </ContentArea>

      <ButtonContainer>
        <SkipButton onClick={handleSkip}>
          <ButtonText>건너뛰기</ButtonText>
        </SkipButton>
        <NextButton $disabled={isNextDisabled} onClick={handleNext} disabled={isNextDisabled}>
          <ButtonText>다음</ButtonText>
        </NextButton>
      </ButtonContainer>
    </PageContainer>
  );
};

export default GapVerification; 