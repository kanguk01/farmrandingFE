import React from 'react';
import styled from 'styled-components';

interface TestimonialProps {
  image: string;
  name: string;
  text: string;
  reverse?: boolean;
  bgColor?: string;
  className?: string;
}

const Item = styled.div<{ reverse?: boolean }>`
  display: flex;
  align-items: center;
  gap: 16px;
  flex-direction: ${props => props.reverse ? 'row-reverse' : 'row'};
`;

const Img = styled.img`
  width: 96px;
  height: 96px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
`;

const Bubble = styled.div<{ bgColor: string; reverse?: boolean }>`
  position: relative;
  background: ${props => props.bgColor};
  border: 1px solid #CCCCCC;
  border-radius: 16px;
  padding: 16px;
  flex: 1;
  max-width: 224px;
  color: ${props => props.bgColor === '#2748BE' ? '#fff' : '#252525'};
  font-size: 14px;
  font-family: 'Inter', sans-serif;
  &::before {
    content: '';
    position: absolute;
    top: 14px;
    ${props => props.reverse ? 'right: -11px' : 'left: -11px'};
    width: 12px;
    height: 20px;
    background: ${props => props.bgColor};
    border: 1px solid #CCCCCC;
    ${props => props.reverse ? 
      'border-left: none; transform: skew(15deg);' : 
      'border-right: none; transform: skew(-15deg);'
    }
  }
`;

const Name = styled.div`
  margin-top: 8px;
  font-size: 12px;
  color: #888;
  font-family: 'Inter', sans-serif;
`;

const Testimonial: React.FC<TestimonialProps> = ({
  image, name, text, reverse = false, bgColor = '#fff', className
}) => (
  <Item reverse={reverse} className={className}>
    <Img src={image} alt={name} />
    <Bubble bgColor={bgColor} reverse={reverse}>
      {text}
      <Name>{name}</Name>
    </Bubble>
  </Item>
);

export default Testimonial; 