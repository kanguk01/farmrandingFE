import React from 'react';
import styled, { keyframes, css } from 'styled-components';

interface FruitInfiniteRowProps {
  images: string[];
  direction: 'left' | 'right';
  speed?: number; // 초 단위
  height?: number;
  shadow?: boolean;
  className?: string;
}

const getScrollKeyframes = (direction: 'left' | 'right') => keyframes`
  0% { transform: translateX(${direction === 'left' ? '0%' : '-66.666%'}); }
  100% { transform: translateX(${direction === 'left' ? '-33.333%' : '0%'}); }
`;

const RowContainer = styled.div<{ height: number }>`
  width: 100%;
  overflow: visible;
  height: ${props => props.height}px;
  display: flex;
  align-items: center;
  background: transparent;
  position: relative;
`;

const ImagesTrack = styled.div<{
  direction: 'left' | 'right';
  speed: number;
}>`
  display: flex;
  gap: 20px;
  width: max-content;
  animation: ${({ direction }) => getScrollKeyframes(direction)}
    ${({ speed }) => speed}s linear infinite;
  will-change: transform;
`;

const FruitImg = styled.img<{ shadow: boolean }>`
  width: auto;
  height: 80px;
  object-fit: contain;
  background: transparent;
  border: none;
  flex-shrink: 0;
  ${props =>
    props.shadow &&
    css`
      filter: drop-shadow(3px 4px 2px rgba(0,0,0,0.6));
    `}
`;

const FruitInfiniteRow: React.FC<FruitInfiniteRowProps> = ({
  images,
  direction,
  speed = 20,
  height = 108,
  shadow = true,
  className
}) => {
  // 6배로 반복해서 완전히 끊김 없는 효과
  const rowImages = [...images, ...images, ...images, ...images, ...images, ...images];
  
  return (
    <RowContainer height={height} className={className}>
      <ImagesTrack direction={direction} speed={speed}>
        {rowImages.map((img, idx) => (
          <FruitImg 
            key={`${img}-${idx}`} 
            src={img} 
            alt="과일" 
            shadow={shadow} 
            draggable={false} 
          />
        ))}
      </ImagesTrack>
    </RowContainer>
  );
};

export default FruitInfiniteRow; 