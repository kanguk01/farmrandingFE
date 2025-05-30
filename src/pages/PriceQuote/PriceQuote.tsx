import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import DatePicker from '../../components/common/DatePicker/DatePicker';
import GradeSelector from '../../components/common/GradeSelector/GradeSelector';
import iconCancel from '../../assets/icon-cancel.svg';
import iconCalendar from '../../assets/icon-calendar.svg';
import iconGrade from '../../assets/icon-grade.svg';

// 애니메이션
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const PageContainer = styled.div`
  width: 100%;
  height: 874px;
  background: #F4FAFF;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const PageHeader = styled.div`
  width: 100%;
  height: 47px;
  background: #F4FAFF;
  display: flex;
  align-items: center;
  padding: 0;
  position: relative;
  flex-shrink: 0;
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
  width: 100%;
  max-width: 320px;
  animation: ${fadeIn} 0.8s ease-out;
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
  animation: ${slideInUp} 0.8s ease-out 0.2s both;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
`;

const Label = styled.label`
  font-family: 'Jalnan 2', sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 1.18;
  color: #000000;
`;

const InputContainer = styled.div`
  position: relative;
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
  height: 33px;
  background: #FFFFFF;
  border: none;
  border-radius: 8px;
  box-shadow: 0px 8px 24px 0px rgba(0, 0, 0, 0.15);
  padding: 0 12px;
  box-sizing: border-box;
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 1.21;
  color: #000000;
  transition: all 0.3s ease;

  &::placeholder {
    color: #9C9C9C;
  }

  &:focus {
    outline: none;
    box-shadow: 0px 8px 24px 0px rgba(31, 65, 187, 0.2);
    transform: translateY(-1px);
  }
`;

const GradeContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
`;

const GradeInput = styled.div`
  width: 100%;
  height: 33px;
  background: #FFFFFF;
  border: none;
  border-radius: 8px;
  box-shadow: 0px 8px 24px 0px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 12px;
  box-sizing: border-box;
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 1.21;
  color: #9C9C9C;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0px 8px 24px 0px rgba(31, 65, 187, 0.2);
    transform: translateY(-1px);
  }
`;

const GradeIcon = styled.img`
  width: 20px;
  height: 20px;
  filter: brightness(0) saturate(100%) invert(0%) sepia(0%) saturate(7500%) hue-rotate(75deg) brightness(98%) contrast(100%);
  transition: all 0.3s ease;

  ${GradeInput}:hover & {
    filter: brightness(0) saturate(100%) invert(25%) sepia(98%) saturate(1653%) hue-rotate(221deg) brightness(96%) contrast(91%);
    transform: scale(1.1);
  }
`;

const DateContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
`;

const DateInputContainer = styled.div`
  position: relative;
  width: 100%;
`;

const DateInput = styled.div<{ hasValue: boolean }>`
  width: 100%;
  height: 33px;
  background: #FFFFFF;
  border: none;
  border-radius: 8px;
  box-shadow: 0px 8px 24px 0px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 12px;
  box-sizing: border-box;
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 1.21;
  color: ${props => props.hasValue ? '#000000' : '#9C9C9C'};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0px 8px 24px 0px rgba(31, 65, 187, 0.2);
    transform: translateY(-1px);
  }
`;

const CalendarIcon = styled.img`
  width: 20px;
  height: 20px;
  filter: brightness(0) saturate(100%) invert(0%) sepia(0%) saturate(7500%) hue-rotate(75deg) brightness(98%) contrast(100%);
  transition: all 0.3s ease;

  ${DateInput}:hover & {
    filter: brightness(0) saturate(100%) invert(25%) sepia(98%) saturate(1653%) hue-rotate(221deg) brightness(96%) contrast(91%);
    transform: scale(1.1);
  }
`;

const ButtonContainer = styled.div`
  position: absolute;
  bottom: 114px;
  left: 16px;
  right: 16px;
  max-width: 300px;
  margin: 0 auto;
  box-sizing: border-box;
  animation: ${slideInUp} 0.8s ease-out 0.4s both;
`;

const SubmitButton = styled.button`
  width: 100%;
  height: 56px;
  background: #1F41BB;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s ease;
  }

  &:hover {
    background: #1A3AA0;
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(31, 65, 187, 0.3);
    
    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    background: #E5E7EB;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
    
    &::before {
      display: none;
    }
  }
`;

const ButtonText = styled.span`
  font-family: 'Jalnan 2', sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 1.18;
  color: #FFFFFF;
  position: relative;
  z-index: 1;
  text-align: center;
  width: 100%;
`;

interface FormData {
  cropName: string;
  variety: string;
  grade: string;
  harvestDate: Date | null;
}

const PriceQuote: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    cropName: '',
    variety: '',
    grade: '',
    harvestDate: null,
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showGradeSelector, setShowGradeSelector] = useState(false);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleDateSelect = (date: Date) => {
    setFormData(prev => ({
      ...prev,
      harvestDate: date
    }));
    setShowDatePicker(false);
  };

  const handleGradeSelect = (grade: string) => {
    setFormData(prev => ({
      ...prev,
      grade: grade
    }));
    setShowGradeSelector(false);
  };

  const handleClose = () => {
    navigate('/');
  };

  const handleNext = () => {
    if (!validateForm()) {
      alert('모든 필수 항목을 입력해주세요.');
      return;
    }
    
    // 결과 페이지로 이동 (실제로는 API 호출 후 결과 받아서 이동)
    navigate('/price-result');
  };

  const isFormValid = () => {
    return formData.cropName.trim() !== '' && 
           formData.variety.trim() !== '' && 
           formData.harvestDate !== null;
  };

  const formatDate = (date: Date | null) => {
    if (!date) return ' 년 / 월 / 일';
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year} / ${month} / ${day}`;
  };

  const getGradeDisplayText = () => {
    if (!formData.grade) return '-';
    const gradeMap: { [key: string]: string } = {
      '특': '특급 (최고급)',
      '상': '상급 (우수)',
      '중': '중급 (보통)',
      '하': '하급 (일반)'
    };
    return gradeMap[formData.grade] || formData.grade;
  };

  const validateForm = () => {
    return isFormValid();
  };

  return (
    <PageContainer>
      <PageHeader>
        <CloseButton onClick={handleClose} aria-label="닫기">
          <CloseIcon src={iconCancel} alt="닫기" />
        </CloseButton>
      </PageHeader>

      <ContentArea>
        <MainContent>
          <Title>내 작물의 적정가,{'\n'}직접 찾아드릴게요.</Title>
          
          <FormContainer>
            <InputGroup>
              <Label>작물명</Label>
              <InputContainer>
                <Input
                  type="text"
                  placeholder="예 : 토마토"
                  value={formData.cropName}
                  onChange={(e) => handleInputChange('cropName', e.target.value)}
                />
              </InputContainer>
            </InputGroup>

            <InputGroup>
              <Label>품종</Label>
              <InputContainer>
                <Input
                  type="text"
                  placeholder="예 : 스테비아 토마토"
                  value={formData.variety}
                  onChange={(e) => handleInputChange('variety', e.target.value)}
                />
              </InputContainer>
            </InputGroup>

            <GradeContainer>
              <Label>등급 (미선택 시 '중'으로 설정됩니다.)</Label>
              <GradeInput onClick={() => setShowGradeSelector(true)}>
                <span>{getGradeDisplayText()}</span>
                <GradeIcon src={iconGrade} alt="등급" />
              </GradeInput>
            </GradeContainer>

            <DateContainer>
              <Label>출하일 / 출하 예정 시기</Label>
              <DateInputContainer>
                <DateInput 
                  hasValue={formData.harvestDate !== null}
                  onClick={() => setShowDatePicker(true)}
                >
                  <span>{formatDate(formData.harvestDate)}</span>
                  <CalendarIcon src={iconCalendar} alt="달력" />
                </DateInput>
              </DateInputContainer>
            </DateContainer>
          </FormContainer>
        </MainContent>
      </ContentArea>

      <ButtonContainer>
        <SubmitButton 
          onClick={handleNext}
          disabled={!isFormValid()}
        >
          <ButtonText>결과 보기</ButtonText>
        </SubmitButton>
      </ButtonContainer>

      {showDatePicker && (
        <DatePicker
          selectedDate={formData.harvestDate}
          onDateSelect={handleDateSelect}
          onClose={() => setShowDatePicker(false)}
        />
      )}

      {showGradeSelector && (
        <GradeSelector
          selectedGrade={formData.grade}
          onGradeSelect={handleGradeSelect}
          onClose={() => setShowGradeSelector(false)}
        />
      )}
    </PageContainer>
  );
};

export default PriceQuote; 