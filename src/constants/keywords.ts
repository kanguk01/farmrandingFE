export interface Keyword {
  id: string;
  label: string;
}

// 브랜드 이미지 키워드 (1단계)
export const BRAND_IMAGE_KEYWORDS: Keyword[] = [
  { id: 'premium', label: '프리미엄' },
  { id: 'affordable', label: '부담없는' },
  { id: 'honest', label: '정직한' },
  { id: 'high-quality', label: '고품질' },
  { id: 'future-oriented', label: '미래 지향적' },
  { id: 'sustainable', label: '지속 가능한' },
  { id: 'transparent-safe', label: '투명-안전한' },
  { id: 'large-scale', label: '규모가 큰' },
  { id: 'direct-trade', label: '직거래 중심' },
  { id: 'heartfelt', label: '정성을 담은' },
  { id: 'small-batch', label: '소량 생산' },
  { id: 'natural', label: '자연 그대로의' },
  { id: 'trustworthy', label: '믿을 수 있는' },
  { id: 'friendly', label: '친근한' },
  { id: 'farm-direct', label: '산지직송의' },
  { id: 'clean', label: '깨끗한' },
];

// 작물 매력 키워드 (2단계)
export const CROP_APPEAL_KEYWORDS: Keyword[] = [
  { id: 'organic', label: '유기농' },
  { id: 'pesticide-free', label: '무농약' },
  { id: 'high-sugar', label: '고당도' },
  { id: 'full-flesh', label: '과육이 알찬' },
  { id: 'soft', label: '부드러운' },
  { id: 'crispy', label: '아삭한 식감' },
  { id: 'fresh', label: '신선한' },
  { id: 'refreshing', label: '상큼한' },
  { id: 'beautiful-shape', label: '모양이 예쁜' },
  { id: 'health-benefits', label: '당뇨-고혈압에 좋은' },
  { id: 'functional', label: '기능성' },
  { id: 'diet', label: '다이어트' },
  { id: 'health-care', label: '건강 관리' },
  { id: 'spicy', label: '매콤한' },
  { id: 'juicy', label: '과즙이 풍부한' },
  { id: 'vitamin-rich', label: '비타민 함유' },
  { id: 'non-gmo', label: '유전자 변형이 없는' },
  { id: 'deep-color', label: '색이 짙은' },
  { id: 'digestible', label: '소화가 잘 되는' },
  { id: 'ugly-crop', label: '못난이 작물' },
  { id: 'antioxidant', label: '항산화 효과' },
];

// 로고 이미지 키워드 (3단계)
export const LOGO_IMAGE_KEYWORDS: Keyword[] = [
  { id: 'illustration', label: '일러스트' },
  { id: 'male-farmer', label: '남자 농부' },
  { id: 'female-farmer', label: '여자 농부' },
  { id: 'family', label: '가족' },
  { id: 'children', label: '어린이' },
  { id: 'realistic', label: '실사화' },
  { id: 'cute', label: '귀여운' },
  { id: 'warm', label: '따뜻한' },
  { id: 'bright', label: '밝은' },
  { id: 'simple', label: '심플한' },
  { id: 'colorful', label: '화려운' },
  { id: 'modern', label: '모던한' },
]; 