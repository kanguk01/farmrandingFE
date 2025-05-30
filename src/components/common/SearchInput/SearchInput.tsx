import React from 'react';
import styled from 'styled-components';
import iconSearch from '../../../assets/icon-search.svg';

const SEARCH_INPUT_WIDTH = 366;
const SEARCH_INPUT_HEIGHT = 47;

const SearchContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: ${SEARCH_INPUT_WIDTH}px;
  height: ${SEARCH_INPUT_HEIGHT}px;
`;

const SearchInputField = styled.input`
  width: 100%;
  height: 100%;
  background: #ffffff;
  border: 1px solid rgba(31, 65, 187, 0.5);
  border-radius: 8px;
  padding: 0 60px 0 24px;
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.171875;
  letter-spacing: 0.02em;
  color: #000;
  box-sizing: border-box;
  outline: none;

  &::placeholder {
    color: #6f6f6f;
  }

  &:focus {
    border-color: #1f41bb;
  }
`;

const SearchButton = styled.button`
  position: absolute;
  right: 7px;
  top: 50%;
  transform: translateY(-50%);
  width: 35px;
  height: 32px;
  background: #1f41bb;
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #1a3a9e;
  }

  &:active {
    background: #163285;
    transform: translateY(-50%) scale(0.95);
  }
`;

const SearchIcon = styled.img`
  width: 16px;
  height: 16px;
  filter: brightness(0) invert(1);
`;

interface SearchInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  className?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  placeholder = '작물을 검색해보세요.',
  value = '',
  onChange,
  onSearch,
  className,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange?.(newValue);
  };

  const handleSearchClick = () => {
    onSearch?.(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch?.(value);
    }
  };

  return (
    <SearchContainer className={className}>
      <SearchInputField
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        aria-label="검색어 입력"
      />
      <SearchButton onClick={handleSearchClick} aria-label="검색">
        <SearchIcon src={iconSearch} alt="검색" />
      </SearchButton>
    </SearchContainer>
  );
};

export default SearchInput; 