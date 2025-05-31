import WebFont from 'webfontloader';

export interface FontLoadOptions {
  timeout?: number;
  fallback?: string;
}

// 강력한 Jalnan 폰트 로더
export const loadJalnanFont = (options: FontLoadOptions = {}): Promise<boolean> => {
  const { timeout = 10000, fallback = 'Noto Sans KR' } = options;

  return new Promise((resolve) => {
    // 1차: WebFont Loader 사용
    WebFont.load({
      custom: {
        families: ['Jalnan', 'JalnanAlt'],
        urls: [
          'https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_four@1.0/JalnanOTF00.woff2',
          'https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_four@1.0/JalnanOTF00.woff2',
          'https://fonts.gstatic.com/ea/jalnan/v1/JalnanOTF.woff2',
        ]
      },
      timeout: timeout,
      active: () => {
        console.log('✅ Jalnan 폰트 로딩 성공 (WebFont Loader)');
        resolve(true);
      },
      inactive: () => {
        console.warn('⚠️ WebFont Loader 실패, 다른 방법 시도...');
        tryAlternativeLoading().then(resolve);
      }
    });

    // 2차: 직접 CSS @font-face 주입
    setTimeout(() => {
      tryAlternativeLoading().then(resolve);
    }, timeout / 2);
  });
};

// 대안 로딩 방법들
const tryAlternativeLoading = async (): Promise<boolean> => {
  // 1. CSS 직접 주입 방법
  const jalnanCSS = `
    @font-face {
      font-family: 'JalnanForce';
      src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_four@1.0/JalnanOTF00.woff2') format('woff2'),
           url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_four@1.0/JalnanOTF00.woff2') format('woff2'),
           url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_four@1.0/JalnanOTF00.woff') format('woff');
      font-weight: normal;
      font-style: normal;
      font-display: swap;
    }
    
    @font-face {
      font-family: 'JalnanGoogleForce';
      src: url('https://fonts.gstatic.com/ea/jalnan/v1/JalnanOTF.woff2') format('woff2'),
           url('https://fonts.gstatic.com/ea/jalnan/v1/JalnanOTF.woff') format('woff');
      font-weight: normal;
      font-style: normal;
      font-display: swap;
    }
  `;

  // 스타일 태그에 직접 삽입
  const styleEl = document.createElement('style');
  styleEl.textContent = jalnanCSS;
  document.head.appendChild(styleEl);

  // 2. FontFace API 사용 (최신 브라우저)
  if ('fonts' in document) {
    try {
      const jalnanFont = new FontFace('JalnanAPI', 
        'url(https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_four@1.0/JalnanOTF00.woff2)'
      );
      
      await jalnanFont.load();
      document.fonts.add(jalnanFont);
      
      console.log('✅ Jalnan 폰트 로딩 성공 (FontFace API)');
      return true;
    } catch (error) {
      console.warn('⚠️ FontFace API 실패:', error);
    }
  }

  // 3. 강제 프리로드
  const preloadLinks = [
    'https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_four@1.0/JalnanOTF00.woff2',
    'https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_four@1.0/JalnanOTF00.woff2',
    'https://fonts.gstatic.com/ea/jalnan/v1/JalnanOTF.woff2'
  ];

  preloadLinks.forEach(url => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = url;
    link.as = 'font';
    link.type = 'font/woff2';
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  });

  // 4. 가시성 확인 후 CSS Variables 업데이트
  setTimeout(() => {
    updateFontVariables();
  }, 1000);

  return true;
};

// CSS Variables 업데이트
const updateFontVariables = () => {
  const fontFamilies = [
    'Jalnan',
    'JalnanForce', 
    'JalnanGoogleForce',
    'JalnanAPI',
    'JalnanAlt',
    'Noto Sans KR',
    'Apple SD Gothic Neo',
    'Malgun Gothic',
    '맑은 고딕',
    'sans-serif'
  ];

  document.documentElement.style.setProperty(
    '--font-jalnan-loaded', 
    fontFamilies.join(', ')
  );

  // 전역적으로 폰트 강제 적용
  const style = document.createElement('style');
  style.textContent = `
    * {
      font-family: ${fontFamilies.join(', ')} !important;
      font-weight: 700 !important;
    }
  `;
  document.head.appendChild(style);

  console.log('🔧 폰트 CSS Variables 업데이트 완료');
};

// 폰트 로딩 상태 체크
export const checkFontLoaded = (): boolean => {
  if (!document.fonts) return false;
  
  const fontChecks = [
    'Jalnan',
    'JalnanForce', 
    'JalnanGoogleForce',
    'JalnanAPI',
    'JalnanAlt'
  ];

  return fontChecks.some(font => document.fonts.check(`16px "${font}"`));
};

// 자동 폰트 로더 (앱 시작시 실행)
export const initJalnanFont = async (): Promise<void> => {
  console.log('🎨 Jalnan 폰트 로더 시작...');
  
  try {
    const loaded = await loadJalnanFont({ timeout: 5000 });
    
    if (loaded) {
      console.log('✅ Jalnan 폰트 로딩 완료');
    } else {
      console.warn('⚠️ Jalnan 폰트 로딩 실패, 백업 폰트 사용');
    }

    // 추가 확인
    setTimeout(() => {
      const isLoaded = checkFontLoaded();
      console.log(`🔍 폰트 로딩 최종 확인: ${isLoaded ? '성공' : '실패'}`);
    }, 2000);

  } catch (error) {
    console.error('❌ 폰트 로더 오류:', error);
  }
}; 