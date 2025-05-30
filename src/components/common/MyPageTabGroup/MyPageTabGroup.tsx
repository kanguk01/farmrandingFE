import React from 'react';
import styled from 'styled-components';
import MyPageTab, { MyPageTabOption } from '../MyPageTab/MyPageTab';

const TabGroupContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: fit-content;
  height: 70px;
`;

interface MyPageTabGroupProps {
  selectedTab: MyPageTabOption;
  onTabChange: (tab: MyPageTabOption) => void;
  className?: string;
}

const MyPageTabGroup: React.FC<MyPageTabGroupProps> = ({
  selectedTab,
  onTabChange,
  className,
}) => {
  const tabs: MyPageTabOption[] = ['branding', 'pricing', 'membership'];

  return (
    <TabGroupContainer className={className}>
      {tabs.map((tab) => (
        <MyPageTab
          key={tab}
          option={tab}
          selected={selectedTab === tab}
          onClick={() => onTabChange(tab)}
        />
      ))}
    </TabGroupContainer>
  );
};

export default MyPageTabGroup; 