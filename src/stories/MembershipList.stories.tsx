import type { Meta, StoryObj } from '@storybook/react';
import MembershipList from '../components/common/MembershipList';
import type { MembershipPlan } from '../components/common/MembershipList';

const meta: Meta<typeof MembershipList> = {
  title: 'Components/MembershipList',
  component: MembershipList,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#f4faff' },
        { name: 'white', value: '#ffffff' },
      ],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    plans: {
      description: '멤버십 플랜 배열',
    },
    onSelectPlan: {
      description: '플랜 선택 핸들러',
      action: 'plan-selected',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const samplePlans: MembershipPlan[] = [
  {
    id: 'free',
    iconType: 'shield',
    title: '일반 회원',
    price: '₩0 /월',
    description: '브랜딩과 가격 제안, 무료로 시작해보세요. 간단히 체험하고 싶은 농장주님께 추천드려요.',
    features: [
      '브랜딩: 최초 5회',
      '가격 제안: 최초 5회',
      '판매글 생성: 제공되지 않음',
      '기본 고객 지원',
    ],
  },
  {
    id: 'premium',
    iconType: 'rocket',
    title: '프리미엄',
    price: '₩4,900 /월',
    description: '브랜딩과 가격 제안을 무제한으로. 꾸준히 사용하는 농장주님께 꼭 맞는 요금제입니다.',
    features: [
      '브랜딩: 무제한',
      '가격 제안: 무제한',
      '판매글 생성: 제공되지 않음',
    ],
    isRecommended: true,
  },
  {
    id: 'premium-plus',
    iconType: 'diamond',
    title: '프리미엄 플러스',
    price: '₩8,900 /월',
    description: '홍보 문구까지 자동으로 완성해드릴게요. 마케팅까지 맡기고 싶은 농장주님께 추천합니다.',
    features: [
      '브랜딩: 무제한',
      '가격 제안: 무제한',
      '판매글 생성: 무제한',
      '감성형 / 실용형 / 쇼핑몰형 등 다양한 문체 지원',
    ],
    isPremium: true,
  },
];

export const Default: Story = {
  args: {
    plans: samplePlans,
  },
};

export const SinglePlan: Story = {
  args: {
    plans: [samplePlans[0]],
  },
};

export const TwoPlans: Story = {
  args: {
    plans: [samplePlans[0], samplePlans[1]],
  },
};

export const CustomPlans: Story = {
  args: {
    plans: [
      {
        id: 'starter',
        emoji: '🌱',
        title: '스타터',
        price: '₩1,900 /월',
        description: '처음 시작하는 농장주님을 위한 특별 요금제입니다.',
        features: [
          '브랜딩: 월 10회',
          '가격 제안: 월 10회',
          '기본 템플릿 제공',
          '이메일 지원',
        ],
      },
      {
        id: 'business',
        emoji: '💼',
        title: '비즈니스',
        price: '₩12,900 /월',
        description: '대규모 농장 운영을 위한 종합 솔루션입니다.',
        features: [
          '모든 기능 무제한',
          'API 접근 권한',
          '고급 분석 도구',
          '24/7 전화 지원',
          '맞춤형 교육 프로그램',
        ],
        isPremium: true,
      },
      {
        id: 'enterprise',
        emoji: '🏢',
        title: '엔터프라이즈',
        price: '문의 필요',
        description: '협동조합이나 대기업을 위한 맞춤형 솔루션입니다.',
        features: [
          '모든 프리미엄 기능',
          '화이트라벨 솔루션',
          '전용 서버',
          '맞춤형 개발',
          '온사이트 교육',
        ],
        isRecommended: true,
      },
    ],
  },
};

export const WithLongFeatures: Story = {
  args: {
    plans: [
      {
        id: 'detailed',
        emoji: '📋',
        title: '상세 플랜',
        price: '₩5,900 /월',
        description: '모든 기능에 대한 상세한 설명이 포함된 플랜입니다. 신중하게 검토하고 싶은 농장주님께 추천드립니다.',
        features: [
          '브랜딩 서비스: AI 기반 로고 생성, 브랜드 가이드라인 제작, 패키지 디자인 템플릿',
          '가격 제안: 시장 분석 기반 최적 가격 책정, 경쟁사 분석, 수익성 리포트',
          '마케팅 지원: SNS 콘텐츠 생성, 블로그 포스팅, 이메일 마케팅 템플릿',
          '고객 관리: CRM 도구, 주문 관리 시스템, 배송 추적',
          '데이터 분석: 매출 분석, 고객 행동 분석, 트렌드 예측',
        ],
      },
    ],
  },
}; 