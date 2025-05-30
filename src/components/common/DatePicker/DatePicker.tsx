import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import iconChevronLeft from '../../../assets/icon-chevronright.svg';
import iconClose from '../../../assets/icon-close.svg';

// 애니메이션
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(100%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const bounce = keyframes`
  0%, 20%, 53%, 80%, 100% {
    transform: scale(1);
  }
  40%, 43% {
    transform: scale(1.1);
  }
  70% {
    transform: scale(1.05);
  }
  90% {
    transform: scale(1.02);
  }
`;

// 요일 이름
const DAYS = ['일', '월', '화', '수', '목', '금', '토'];
const MONTHS = [
  '1월', '2월', '3월', '4월', '5월', '6월',
  '7월', '8월', '9월', '10월', '11월', '12월'
];

type ViewMode = 'date' | 'month' | 'year';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  z-index: 1000;
  animation: ${fadeIn} 0.3s ease-out;
  backdrop-filter: blur(4px);
`;

const CalendarContainer = styled.div`
  width: 100%;
  max-width: 402px;
  background: #FFFFFF;
  border-radius: 20px 20px 0 0;
  box-shadow: 0 -8px 32px rgba(31, 65, 187, 0.15);
  overflow: hidden;
  animation: ${slideUp} 0.4s ease-out;
  position: relative;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 24px 16px 24px;
  background: linear-gradient(135deg, #1F41BB 0%, #4F46E5 100%);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="20" cy="20" r="2" fill="rgba(255,255,255,0.1)"/><circle cx="80" cy="30" r="1.5" fill="rgba(255,255,255,0.08)"/><circle cx="40" cy="70" r="1" fill="rgba(255,255,255,0.06)"/></svg>');
    opacity: 0.3;
  }
`;

const HeaderTitle = styled.h2`
  font-family: 'Jalnan 2', sans-serif;
  font-weight: 400;
  font-size: 18px;
  line-height: 1.2;
  color: #FFFFFF;
  margin: 0;
  position: relative;
  z-index: 1;
`;

const CloseButton = styled.button`
  width: 32px;
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  position: relative;
  z-index: 1;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const CloseIcon = styled.img`
  width: 16px;
  height: 16px;
  filter: brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(7500%) hue-rotate(109deg) brightness(105%) contrast(105%);
`;

const Navigation = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  background: #F8FAFF;
  border-bottom: 1px solid rgba(31, 65, 187, 0.08);
`;

const NavButton = styled.button`
  width: 40px;
  height: 40px;
  background: #FFFFFF;
  border: 1px solid rgba(31, 65, 187, 0.15);
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(31, 65, 187, 0.08);

  &:hover {
    background: #1F41BB;
    border-color: #1F41BB;
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(31, 65, 187, 0.2);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const NavIcon = styled.img<{ direction: 'left' | 'right' }>`
  width: 16px;
  height: 16px;
  filter: brightness(0) saturate(100%) invert(25%) sepia(98%) saturate(1653%) hue-rotate(221deg) brightness(96%) contrast(91%);
  transform: ${props => props.direction === 'left' ? 'rotate(180deg)' : 'rotate(0deg)'};
  transition: all 0.3s ease;

  ${NavButton}:hover & {
    filter: brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(7500%) hue-rotate(109deg) brightness(105%) contrast(105%);
  }
`;

const MonthYear = styled.div`
  font-family: 'Jalnan 2', sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 1.2;
  color: #1F41BB;
  text-align: center;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 8px;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(31, 65, 187, 0.1);
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const CalendarGrid = styled.div`
  padding: 0 24px 24px 24px;
  background: #FFFFFF;
`;

const DaysHeader = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
  margin-bottom: 12px;
`;

const DayHeader = styled.div<{ isSunday?: boolean; isSaturday?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 12px;
  line-height: 1.2;
  color: ${props => 
    props.isSunday ? '#EF4444' : 
    props.isSaturday ? '#3B82F6' : 
    '#6B7280'
  };
`;

const DaysGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
`;

const DayCell = styled.button<{ 
  isToday?: boolean; 
  isSelected?: boolean; 
  isCurrentMonth?: boolean;
  isSunday?: boolean;
  isSaturday?: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 44px;
  background: ${props => {
    if (props.isSelected) return '#1F41BB';
    if (props.isToday) return 'rgba(31, 65, 187, 0.1)';
    return 'transparent';
  }};
  border: ${props => {
    if (props.isSelected) return '2px solid #1F41BB';
    if (props.isToday) return '2px solid #1F41BB';
    return '2px solid transparent';
  }};
  border-radius: 50%;
  cursor: ${props => props.isCurrentMonth ? 'pointer' : 'default'};
  font-family: 'Inter', sans-serif;
  font-weight: ${props => props.isSelected || props.isToday ? '600' : '400'};
  font-size: 14px;
  line-height: 1.2;
  color: ${props => {
    if (!props.isCurrentMonth) return '#D1D5DB';
    if (props.isSelected) return '#FFFFFF';
    if (props.isSunday) return '#EF4444';
    if (props.isSaturday) return '#3B82F6';
    return '#1F2937';
  }};
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;

  &:hover:not(:disabled) {
    ${props => !props.isSelected && `
      background: rgba(31, 65, 187, 0.08);
      transform: scale(1.1);
    `}
  }

  &:active:not(:disabled) {
    animation: ${bounce} 0.6s ease;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.3;
  }
`;

const TodayIndicator = styled.div`
  position: absolute;
  bottom: 2px;
  left: 50%;
  transform: translateX(-50%);
  width: 4px;
  height: 4px;
  background: #1F41BB;
  border-radius: 50%;
`;

// 연도/월 선택을 위한 그리드
const SelectionGrid = styled.div`
  padding: 24px;
  background: #FFFFFF;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  max-height: 300px;
  overflow-y: auto;
`;

const SelectionCell = styled.button<{ isSelected?: boolean; isCurrent?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 56px;
  background: ${props => {
    if (props.isSelected) return '#1F41BB';
    if (props.isCurrent) return 'rgba(31, 65, 187, 0.1)';
    return '#FFFFFF';
  }};
  border: 2px solid ${props => {
    if (props.isSelected) return '#1F41BB';
    if (props.isCurrent) return '#1F41BB';
    return 'rgba(31, 65, 187, 0.15)';
  }};
  border-radius: 12px;
  cursor: pointer;
  font-family: 'Jalnan 2', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 1.2;
  color: ${props => {
    if (props.isSelected) return '#FFFFFF';
    return '#1F41BB';
  }};
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.isSelected ? '#1F41BB' : 'rgba(31, 65, 187, 0.08)'};
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(31, 65, 187, 0.15);
  }

  &:active {
    transform: translateY(0);
  }
`;

interface DatePickerProps {
  selectedDate: Date | null;
  onDateSelect: (date: Date) => void;
  onClose: () => void;
  minDate?: Date;
  maxDate?: Date;
}

const DatePicker: React.FC<DatePickerProps> = ({
  selectedDate,
  onDateSelect,
  onClose,
  minDate,
  maxDate
}) => {
  const [currentDate, setCurrentDate] = useState(selectedDate || new Date());
  const [viewMode, setViewMode] = useState<ViewMode>('date');
  const today = new Date();

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(newDate.getMonth() - 1);
      } else {
        newDate.setMonth(newDate.getMonth() + 1);
      }
      return newDate;
    });
  };

  const navigateYear = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setFullYear(newDate.getFullYear() - 1);
      } else {
        newDate.setFullYear(newDate.getFullYear() + 1);
      }
      return newDate;
    });
  };

  const handleDateClick = (date: Date) => {
    if (minDate && date < minDate) return;
    if (maxDate && date > maxDate) return;
    
    onDateSelect(date);
  };

  const handleMonthYearClick = () => {
    setViewMode(viewMode === 'date' ? 'month' : 'date');
  };

  const handleYearSelect = (year: number) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setFullYear(year);
      return newDate;
    });
    setViewMode('month');
  };

  const handleMonthSelect = (month: number) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(month);
      return newDate;
    });
    setViewMode('date');
  };

  const getHeaderTitle = () => {
    switch (viewMode) {
      case 'year':
        return '연도 선택';
      case 'month':
        return `${currentDate.getFullYear()}년`;
      default:
        return '날짜 선택';
    }
  };

  const getNavigationContent = () => {
    if (viewMode === 'year') {
      const currentYear = currentDate.getFullYear();
      const startYear = Math.floor(currentYear / 10) * 10;
      
      return (
        <>
          <NavButton onClick={() => {
            const newDate = new Date(currentDate);
            newDate.setFullYear(startYear - 10);
            setCurrentDate(newDate);
          }}>
            <NavIcon src={iconChevronLeft} alt="이전 10년" direction="left" />
          </NavButton>
          <MonthYear onClick={() => setViewMode('month')}>
            {startYear}년대
          </MonthYear>
          <NavButton onClick={() => {
            const newDate = new Date(currentDate);
            newDate.setFullYear(startYear + 10);
            setCurrentDate(newDate);
          }}>
            <NavIcon src={iconChevronLeft} alt="다음 10년" direction="right" />
          </NavButton>
        </>
      );
    }

    if (viewMode === 'month') {
      return (
        <>
          <NavButton onClick={() => navigateYear('prev')}>
            <NavIcon src={iconChevronLeft} alt="이전 년" direction="left" />
          </NavButton>
          <MonthYear onClick={() => setViewMode('year')}>
            {currentDate.getFullYear()}년
          </MonthYear>
          <NavButton onClick={() => navigateYear('next')}>
            <NavIcon src={iconChevronLeft} alt="다음 년" direction="right" />
          </NavButton>
        </>
      );
    }

    return (
      <>
        <NavButton onClick={() => navigateMonth('prev')}>
          <NavIcon src={iconChevronLeft} alt="이전 달" direction="left" />
        </NavButton>
        <MonthYear onClick={handleMonthYearClick}>
          {currentDate.getFullYear()}년 {MONTHS[currentDate.getMonth()]}
        </MonthYear>
        <NavButton onClick={() => navigateMonth('next')}>
          <NavIcon src={iconChevronLeft} alt="다음 달" direction="right" />
        </NavButton>
      </>
    );
  };

  const renderYearSelection = () => {
    const currentYear = currentDate.getFullYear();
    const startYear = Math.floor(currentYear / 10) * 10;
    const years = Array.from({ length: 12 }, (_, i) => startYear - 1 + i);

    return (
      <SelectionGrid>
        {years.map(year => (
          <SelectionCell
            key={year}
            isSelected={year === currentYear}
            isCurrent={year === today.getFullYear()}
            onClick={() => handleYearSelect(year)}
          >
            {year}년
          </SelectionCell>
        ))}
      </SelectionGrid>
    );
  };

  const renderMonthSelection = () => {
    const currentMonth = currentDate.getMonth();
    
    return (
      <SelectionGrid>
        {MONTHS.map((month, index) => (
          <SelectionCell
            key={index}
            isSelected={index === currentMonth}
            isCurrent={
              index === today.getMonth() && 
              currentDate.getFullYear() === today.getFullYear()
            }
            onClick={() => handleMonthSelect(index)}
          >
            {month}
          </SelectionCell>
        ))}
      </SelectionGrid>
    );
  };

  const getDaysInMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startDate = firstDay.getDay();

    const days: Array<{
      date: Date;
      isCurrentMonth: boolean;
      isToday: boolean;
      isSelected: boolean;
      isSunday: boolean;
      isSaturday: boolean;
    }> = [];

    // 이전 달의 마지막 날들
    for (let i = startDate - 1; i >= 0; i--) {
      const date = new Date(year, month, -i);
      days.push({
        date,
        isCurrentMonth: false,
        isToday: false,
        isSelected: false,
        isSunday: date.getDay() === 0,
        isSaturday: date.getDay() === 6,
      });
    }

    // 현재 달의 날들
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      const isToday = date.toDateString() === today.toDateString();
      const isSelected = selectedDate ? date.toDateString() === selectedDate.toDateString() : false;
      
      days.push({
        date,
        isCurrentMonth: true,
        isToday,
        isSelected,
        isSunday: date.getDay() === 0,
        isSaturday: date.getDay() === 6,
      });
    }

    // 다음 달의 시작 날들 (6주 채우기)
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      const date = new Date(year, month + 1, i);
      days.push({
        date,
        isCurrentMonth: false,
        isToday: false,
        isSelected: false,
        isSunday: date.getDay() === 0,
        isSaturday: date.getDay() === 6,
      });
    }

    return days;
  };

  const isDateDisabled = (date: Date) => {
    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;
    return false;
  };

  const renderDateSelection = () => {
    const days = getDaysInMonth();

    return (
      <CalendarGrid>
        <DaysHeader>
          {DAYS.map((day, index) => (
            <DayHeader 
              key={day} 
              isSunday={index === 0}
              isSaturday={index === 6}
            >
              {day}
            </DayHeader>
          ))}
        </DaysHeader>

        <DaysGrid>
          {days.map((day, index) => (
            <DayCell
              key={index}
              isToday={day.isToday}
              isSelected={day.isSelected}
              isCurrentMonth={day.isCurrentMonth}
              isSunday={day.isSunday}
              isSaturday={day.isSaturday}
              disabled={!day.isCurrentMonth || isDateDisabled(day.date)}
              onClick={() => handleDateClick(day.date)}
            >
              {day.date.getDate()}
              {day.isToday && day.isCurrentMonth && !day.isSelected && (
                <TodayIndicator />
              )}
            </DayCell>
          ))}
        </DaysGrid>
      </CalendarGrid>
    );
  };

  return (
    <Overlay onClick={handleOverlayClick}>
      <CalendarContainer>
        <Header>
          <HeaderTitle>{getHeaderTitle()}</HeaderTitle>
          <CloseButton onClick={onClose}>
            <CloseIcon src={iconClose} alt="닫기" />
          </CloseButton>
        </Header>

        <Navigation>
          {getNavigationContent()}
        </Navigation>

        {viewMode === 'date' && renderDateSelection()}
        {viewMode === 'month' && renderMonthSelection()}
        {viewMode === 'year' && renderYearSelection()}
      </CalendarContainer>
    </Overlay>
  );
};

export default DatePicker; 