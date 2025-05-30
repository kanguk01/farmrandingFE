import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import InputField from '../../components/common/InputField/InputField';
import Button from '../../components/common/Button/Button';
import GradeDropdown, { Grade } from '../../components/common/GradeDropdown';
import iconCancel from '../../assets/icons/icon-cancel.svg';

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
  gap: 14px;
  padding-top: 40px;
  flex: 1;
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 88px;
  width: 320px;
`;

const Title = styled.h1`
  font-family: 'Jalnan 2', sans-serif;
  font-weight: 400;
  font-size: 24px;
  line-height: 1.67;
  letter-spacing: 4.17%;
  text-align: center;
  color: #000000;
  margin: 0;
  white-space: pre-line;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
  width: 100%;
`;

const GradeFieldContainer = styled.div`
  position: relative;
  width: 100%;
`;

const ButtonContainer = styled.div`
  position: absolute;
  bottom: 114px;
  left: 51px;
  width: 300px;
`;

interface BrandingFormData {
  cropName: string;
  variety: string;
  cultivationMethod: string;
  grade: string;
}

const Branding: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<BrandingFormData>({
    cropName: '',
    variety: '',
    cultivationMethod: '',
    grade: '',
  });
  const [isGradeDropdownOpen, setIsGradeDropdownOpen] = useState(false);

  const handleClose = () => {
    navigate('/');
  };

  const handleInputChange = (field: keyof BrandingFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleGradeClick = () => {
    setIsGradeDropdownOpen(!isGradeDropdownOpen);
  };

  const handleGradeSelect = (grade: Grade) => {
    handleInputChange('grade', grade);
  };

  const handleGradeDropdownClose = () => {
    setIsGradeDropdownOpen(false);
  };

  const handleNext = () => {
    console.log('다음 단계:', formData);
    navigate('/gap-verification');
  };

  const isFormValid = formData.cropName.trim() !== '' && 
                     formData.variety.trim() !== '' && 
                     formData.cultivationMethod.trim() !== '';

  return (
    <PageContainer>
      <Header>
        <CloseButton onClick={handleClose} aria-label="닫기">
          <CloseIcon src={iconCancel} alt="닫기" />
        </CloseButton>
      </Header>

      <ContentArea>
        <MainContent>
          <Title>{`당신의 정성이 담긴 작물을\n멋지게 꾸며드릴게요.`}</Title>
          
          <FormContainer>
            <InputField
              label="작물명"
              placeholder="예 : 토마토"
              value={formData.cropName}
              onChange={(value) => handleInputChange('cropName', value)}
              variant="default"
            />
            
            <InputField
              label="품종"
              placeholder="예 : 스테비아 토마토"
              value={formData.variety}
              onChange={(value) => handleInputChange('variety', value)}
              variant="default"
            />
            
            <InputField
              label="재배 방식"
              placeholder="예 : 노지 재배 / 고랭지 재배"
              value={formData.cultivationMethod}
              onChange={(value) => handleInputChange('cultivationMethod', value)}
              variant="default"
            />

            <GradeFieldContainer>
              <InputField
                label="등급  (미선택 시 '중'으로 설정됩니다.)"
                value={formData.grade}
                onChange={(value) => handleInputChange('grade', value)}
                variant="grade"
                onGradeClick={handleGradeClick}
              />
              <GradeDropdown
                isOpen={isGradeDropdownOpen}
                onSelect={handleGradeSelect}
                onClose={handleGradeDropdownClose}
              />
            </GradeFieldContainer>
          </FormContainer>
        </MainContent>
      </ContentArea>

      <ButtonContainer>
        <Button
          variant="primary"
          size="large"
          onClick={handleNext}
          disabled={!isFormValid}
        >
          다음
        </Button>
      </ButtonContainer>
    </PageContainer>
  );
};

export default Branding; 