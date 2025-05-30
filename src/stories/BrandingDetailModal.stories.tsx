import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import BrandingDetailModal from '../components/common/BrandingDetailModal/BrandingDetailModal';

// Mock 브랜딩 이력 데이터
const mockBrandingHistory = {
  id: '1',
  title: '뽀사과',
  description: '한 입에 쏙, 귀여움이 톡!',
  story: '아이들이 좋아하는 작고 귀여운 사과를 만들고 싶었어요. 기존 사과보다 크기는 작지만, 당도는 더 높고 아삭한 식감이 매력적입니다.\n\n매일 새벽 5시에 일어나 과수원을 돌보며, 하나하나 정성스럽게 키운 사과들입니다. 농약 사용을 최소화하고, 자연 친화적인 방법으로 재배했습니다.\n\n\'뽀사과\'라는 이름은 손녀가 지어줬는데, 정말 사과처럼 볼이 뽀얗고 귀엽다고 해서 붙인 이름이에요.',
  imageUrl: 'https://placehold.co/120x120/ff6b6b/ffffff?text=🍎',
  createdAt: '2025.05.15'
};

const longDescriptionHistory = {
  id: '2',
  title: '하은 감자',
  description: '자연이 키운 진심의 맛. 깨끗한 산골 물과 맑은 공기, 그리고 농부의 정성스러운 손길로 키워낸 프리미엄 감자입니다. 건강한 땅에서 자란 감자는 달콤하고 부드러운 식감으로 가족 모두가 만족할 수 있는 최고의 품질을 자랑합니다.',
  story: '고향 강원도의 깨끗한 고랭지에서 자란 감자입니다. 일교차가 큰 환경에서 자란 덕분에 당도가 높고 포슬포슬한 식감을 자랑해요.\n\n3대째 이어온 감자 농사의 노하우를 바탕으로, 전통 농법과 현대 기술을 조화롭게 접목했습니다. 화학비료 대신 퇴비를 사용하고, 토양의 건강을 최우선으로 생각합니다.\n\n딸 하은이의 이름을 따서 \'하은 감자\'라고 명명했습니다. 하은이가 농업에 관심을 갖고 함께 일할 수 있기를 바라는 마음을 담았어요.',
  imageUrl: 'https://placehold.co/120x120/8B4513/ffffff?text=🥔',
  createdAt: '2025.05.15'
};

const vegetableHistory = {
  id: '3',
  title: '싱싱초록',
  description: '노지에서 자란 고품질 오이고추, 바로 산지에서 보내드립니다.',
  story: '충청남도 논산의 비옥한 땅에서 자란 오이고추입니다. 조부모님 대부터 이어온 씨앗을 사용해 재배하는 토종 오이고추로, 시중에서 찾기 어려운 진짜 맛을 자랑합니다.\n\n농약을 최소한으로 사용하고, 천적 곤충을 활용한 친환경 농법으로 재배합니다. 매일 새벽 이슬을 맞으며 자란 오이고추는 아삭하고 신선함이 오래 지속됩니다.\n\n싱싱하고 초록빛이 아름다워 \'싱싱초록\'이라는 브랜드명을 지었습니다. 소비자들에게 건강하고 신선한 채소를 전달하고 싶은 마음을 담았어요.',
  imageUrl: 'https://placehold.co/120x120/32CD32/ffffff?text=🌶️',
  createdAt: '2025.05.14'
};

const tomatoHistory = {
  id: '4',
  title: '토담토',
  description: '"햇살과 정성을 가득 담은 산지직송 대추토마토, 토담토가 전하는 자연 그대로의 달콤함."',
  story: '전라남도 고흥의 따뜻한 햇살 아래에서 자란 대추토마토입니다. 바닷바람과 충분한 일조량, 그리고 농부의 정성이 만들어낸 최고의 토마토예요.\n\n당도 12브릭스 이상의 고당도 토마토로, 과일처럼 달콤합니다. 하우스가 아닌 노지에서 자연스럽게 익힌 토마토라 영양가도 풍부하고 맛도 진합니다.\n\n\'토마토에 정성을 담다\'는 의미로 \'토담토\'라고 이름 지었습니다. 소비자 분들이 한 입 베어물면 농부의 진심을 느끼실 수 있을 거라 확신합니다.',
  imageUrl: 'https://placehold.co/120x120/FF6347/ffffff?text=🍅',
  createdAt: '2025.05.14'
};

const meta: Meta<typeof BrandingDetailModal> = {
  title: 'Components/BrandingDetailModal',
  component: BrandingDetailModal,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
브랜딩 상세 정보를 표시하는 모달 컴포넌트입니다.

## 주요 기능
- **하단 슬라이드업**: 모바일 친화적인 하단에서 올라오는 모달
- **브랜드 정보 표시**: 브랜드명, 홍보문구, 스토리, 이미지
- **생성일 표시**: 모달 헤더에 생성일 표시
- **이미지 호버 효과**: 샤머 애니메이션과 스케일 효과
- **그라데이션 타이틀**: 브랜드 컬러를 활용한 그라데이션 텍스트

## 콘텐츠 구성
- **브랜드명**: 그라데이션 효과가 적용된 타이틀
- **홍보문구**: 간단한 브랜드 소개 문구
- **브랜드 스토리**: 농부의 진심이 담긴 상세한 이야기

## 디자인 특징
- **중앙 정렬 레이아웃**: 브랜드 이미지와 정보를 중앙에 배치
- **카드 스타일**: 홍보문구와 스토리를 각각 카드 형태로 표시
- **완료 상태 표시**: 하단에 브랜딩 완료 상태 표시

## 애니메이션
- 모달 오버레이 페이드 인/아웃
- 모달 컨테이너 슬라이드 업/다운
- 이미지 호버 시 샤머 효과

## 반응형 디자인
- 최대 402px 너비로 모바일 최적화
- 75vh 높이로 적절한 콘텐츠 영역 확보
        `
      }
    }
  },
  argTypes: {
    isVisible: {
      control: 'boolean',
      description: '모달 표시 여부'
    },
    brandingHistory: {
      control: false,
      description: '브랜딩 이력 데이터'
    },
    onClose: {
      action: 'closed',
      description: '모달 닫기 이벤트'
    }
  }
};

export default meta;
type Story = StoryObj<typeof BrandingDetailModal>;

export const Default: Story = {
  args: {
    isVisible: true,
    brandingHistory: mockBrandingHistory,
    onClose: action('modal-closed')
  }
};

export const LongDescription: Story = {
  args: {
    isVisible: true,
    brandingHistory: longDescriptionHistory,
    onClose: action('modal-closed')
  },
  parameters: {
    docs: {
      description: {
        story: '긴 홍보문구와 상세한 브랜드 스토리가 있는 브랜딩의 상세조회입니다. 텍스트가 카드 영역에서 적절히 래핑되고 스크롤됩니다.'
      }
    }
  }
};

export const Vegetable: Story = {
  args: {
    isVisible: true,
    brandingHistory: vegetableHistory,
    onClose: action('modal-closed')
  },
  parameters: {
    docs: {
      description: {
        story: '오이고추 브랜드의 상세조회입니다. 친환경 농법과 전통 씨앗 사용에 대한 스토리를 확인할 수 있습니다.'
      }
    }
  }
};

export const Tomato: Story = {
  args: {
    isVisible: true,
    brandingHistory: tomatoHistory,
    onClose: action('modal-closed')
  },
  parameters: {
    docs: {
      description: {
        story: '대추토마토 브랜드의 상세조회입니다. 고당도 토마토의 특징과 농부의 정성이 담긴 스토리를 볼 수 있습니다.'
      }
    }
  }
};

export const Hidden: Story = {
  args: {
    isVisible: false,
    brandingHistory: mockBrandingHistory,
    onClose: action('modal-closed')
  }
};

export const Interactive: Story = {
  args: {
    isVisible: true,
    brandingHistory: mockBrandingHistory,
    onClose: action('modal-closed')
  },
  parameters: {
    docs: {
      description: {
        story: '브랜드 이미지에 마우스를 올리면 샤머 효과와 스케일 애니메이션을 볼 수 있습니다. 모달 외부를 클릭하거나 닫기 버튼을 누르면 모달이 닫힙니다. 브랜드명, 홍보문구, 스토리가 모두 표시되어 완전한 브랜딩 정보를 확인할 수 있습니다.'
      }
    }
  }
}; 