import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import KeywordTag from '../components/common/KeywordTag/KeywordTag';

const meta: Meta<typeof KeywordTag> = {
  title: 'common/KeywordTag',
  component: KeywordTag,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof KeywordTag>;

export const Default: Story = {
  args: {
    children: '타이틀',
    variant: 'default',
    onClick: () => console.log('기본 태그 클릭'),
  },
};

export const Hover: Story = {
  args: {
    children: '타이틀',
    variant: 'hover',
    onClick: () => console.log('호버 태그 클릭'),
  },
};

export const Selected: Story = {
  args: {
    children: '타이틀',
    variant: 'selected',
    onClick: () => console.log('선택된 태그 클릭'),
  },
};

export const Disabled: Story = {
  args: {
    children: '타이틀',
    variant: 'default',
    disabled: true,
    onClick: () => console.log('비활성화된 태그 클릭'),
  },
};

export const DifferentTexts: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <KeywordTag variant="default">과일</KeywordTag>
      <KeywordTag variant="hover">채소</KeywordTag>
      <KeywordTag variant="selected">곡물</KeywordTag>
      <KeywordTag variant="default">견과류</KeywordTag>
      <KeywordTag variant="default">유기농</KeywordTag>
    </div>
  ),
};

export const Interactive: Story = {
  render: () => {
    const InteractiveExample = () => {
      const [selectedTags, setSelectedTags] = useState<string[]>([]);
      
      const keywords = ['토마토', '사과', '감자', '오이', '당근', '양파'];
      
      const handleTagClick = (keyword: string) => {
        setSelectedTags(prev => 
          prev.includes(keyword) 
            ? prev.filter(tag => tag !== keyword)
            : [...prev, keyword]
        );
      };
      
      return (
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', maxWidth: '300px' }}>
          {keywords.map(keyword => (
            <KeywordTag
              key={keyword}
              variant={selectedTags.includes(keyword) ? 'selected' : 'default'}
              onClick={() => handleTagClick(keyword)}
            >
              {keyword}
            </KeywordTag>
          ))}
        </div>
      );
    };
    
    return <InteractiveExample />;
  },
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <span style={{ fontSize: '12px', width: '60px' }}>기본:</span>
        <KeywordTag variant="default">타이틀</KeywordTag>
      </div>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <span style={{ fontSize: '12px', width: '60px' }}>호버:</span>
        <KeywordTag variant="hover">타이틀</KeywordTag>
      </div>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <span style={{ fontSize: '12px', width: '60px' }}>선택:</span>
        <KeywordTag variant="selected">타이틀</KeywordTag>
      </div>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <span style={{ fontSize: '12px', width: '60px' }}>비활성:</span>
        <KeywordTag variant="default" disabled>타이틀</KeywordTag>
      </div>
    </div>
  ),
}; 