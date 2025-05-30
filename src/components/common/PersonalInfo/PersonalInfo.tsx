import React from 'react';
import styled from 'styled-components';
import iconProfile from '../../../assets/icon-profile.svg';
import iconFarm from '../../../assets/icon_farm.svg';
import iconLocation from '../../../assets/icon-location.png';

const PersonalInfoCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 12px;
  padding: 12px 0px;
  width: 360px;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0px 8px 24px 0px rgba(0, 0, 0, 0.15);
  box-sizing: border-box;
`;

const InfoRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  align-self: stretch;
  padding: 0px 24px;
  width: 100%;
  box-sizing: border-box;
`;

const LeftSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 32px;
  padding: 0px 4px 0px 0px;
  width: 134px;
  min-width: 134px;
`;

const LabelSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

const IconContainer = styled.div`
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const IconImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const LabelText = styled.span`
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 12px;
  line-height: 1.2;
  letter-spacing: -3.57%;
  color: #000000;
  text-align: center;
  white-space: nowrap;
`;

const Divider = styled.span`
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 1.2;
  letter-spacing: -3.57%;
  color: #000000;
  text-align: center;
  flex-shrink: 0;
`;

const ValueText = styled.span`
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 1.2;
  letter-spacing: -3.57%;
  color: #000000;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
  min-width: 0;
`;

export interface PersonalInfoData {
  name: string;
  farmName: string;
  location: string;
}

interface PersonalInfoProps {
  data: PersonalInfoData;
  className?: string;
}

const PersonalInfo: React.FC<PersonalInfoProps> = ({
  data,
  className,
}) => {
  const infoItems = [
    {
      icon: iconProfile,
      label: '이름',
      value: data.name,
      alt: '프로필'
    },
    {
      icon: iconFarm,
      label: '농가명',
      value: data.farmName,
      alt: '농가'
    },
    {
      icon: iconLocation,
      label: '농가 위치',
      value: data.location,
      alt: '위치'
    }
  ];

  return (
    <PersonalInfoCard className={className}>
      {infoItems.map((item, index) => (
        <InfoRow key={index}>
          <LeftSection>
            <LabelSection>
              <IconContainer>
                <IconImage src={item.icon} alt={item.alt} />
              </IconContainer>
              <LabelText>{item.label}</LabelText>
            </LabelSection>
            <Divider>｜</Divider>
          </LeftSection>
          <ValueText>{item.value}</ValueText>
        </InfoRow>
      ))}
    </PersonalInfoCard>
  );
};

export default PersonalInfo; 