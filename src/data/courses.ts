import { Course } from '../types';

export const regularCourses: Course[] = [
  // Hong Kong Island
  {
    id: 'hk-1',
    name: '韓國國際學校(西灣河)',
    address: '西灣河鯉景道55 號',
    type: 'regular',
    region: 'hk',
    image: '/images/hk-1.png'
  },
  {
    id: 'hk-2',
    name: '香港真光中學(銅鑼灣)',
    address: '銅鑼灣大坑道50號',
    type: 'regular',
    region: 'hk',
    image: '/images/hk-2.png'
  },
  {
    id: 'hk-3',
    name: '聖公會鄧肇堅中學(灣仔)',
    address: '灣仔愛群道9 號',
    type: 'regular',
    region: 'hk',
    image: '/images/hk-3.png'
  },
  {
    id: 'hk-4',
    name: '史丹福會(南區)',
    address: '香港南區置富廣場地下',
    type: 'regular',
    region: 'hk',
    image: '/images/hk-4.png'
  },
  {
    id: 'hk-5',
    name: '培英中學(薄扶林)',
    address: '香港薄扶林華富道55 號',
    type: 'regular',
    region: 'hk',
    image: '/images/hk-5.png'
  },

  // Kowloon
  {
    id: 'kln-1',
    name: '宣道國際學校(荔枝角)',
    address: '荔枝角瓊林街33號',
    type: 'regular',
    region: 'kln',
    image: '/images/kln-1.png'
  },
  {
    id: 'kln-2',
    name: '基督教祟真中學(長沙灣)',
    address: '長沙灣荔康街8 號',
    type: 'regular',
    region: 'kln',
    image: '/images/kln-2.png'
  },
  {
    id: 'kln-3',
    name: '保良局顏寶鈴書院(土瓜灣)',
    address: '九龍土瓜灣崇安街26 號',
    type: 'regular',
    region: 'kln',
    image: '/images/kln-3.png'
  },
  {
    id: 'kln-4',
    name: '香港澳洲國際學校(九龍塘)',
    address: '九龍塘羅福道3 號A',
    type: 'regular',
    region: 'kln',
    image: '/images/kln-4.png'
  },
  {
    id: 'kln-5',
    name: '匯基書院(東九龍)',
    address: '順利利安里2 號',
    type: 'regular',
    region: 'kln',
    image: '/images/kln-5.png'
  },
  {
    id: 'kln-6',
    name: 'Nord Anglia International School (Kwun Tong)(觀塘)',
    address: '觀塘月華街19 號',
    type: 'regular',
    region: 'kln',
    image: '/images/kln-6.png'
  },
  {
    id: 'kln-7',
    name: 'Nord Anglia International School (Lam Tin)(藍田)',
    address: '藍田安田街11 號',
    type: 'regular',
    region: 'kln',
    image: '/images/kln-7.png'
  },
  {
    id: 'kln-8',
    name: '法國國際學校(將軍澳)',
    address: '將軍澳唐賢街二十八號',
    type: 'regular',
    region: 'kln',
    image: '/images/kln-8.png'
  },
  {
    id: 'kln-9',
    name: '保良局黃永樹小學(將軍澳)',
    address: '將軍澳唐賢街二號',
    type: 'regular',
    region: 'kln',
    image: '/images/kln-9.png'
  },
  {
    id: 'kln-10',
    name: '景嶺書院(將軍澳)',
    address: '將軍澳林盛路1 號',
    type: 'regular',
    region: 'kln',
    image: '/images/kln-10.png'
  },

  // New Territories
  {
    id: 'nt-1',
    name: '浸信會沙田圍呂明才小學(沙田)',
    address: '沙田圓洲角路8 號',
    type: 'regular',
    region: 'nt',
    image: '/images/nt-1.png'
  },
  {
    id: 'nt-2',
    name: '保良局雨川小學(馬鞍山)',
    address: '新界馬鞍山鞍駿街28 號',
    type: 'regular',
    region: 'nt',
    image: '/images/nt-2.png'
  },
  {
    id: 'nt-3',
    name: '香港墨爾文國際學校(科學園)',
    address: '大埔科進路3號',
    type: 'regular',
    region: 'nt',
    image: '/images/nt-3.png'
  },
  {
    id: 'nt-4',
    name: '大埔舊墟公立學校(寶湖道)(大埔)',
    address: '大埔寶湖道7 號',
    type: 'regular',
    region: 'nt',
    image: '/images/nt-4.png'
  },
  {
    id: 'nt-5',
    name: '安基司學校(元朗)',
    address: '元朗錦田北高埔徑1號',
    type: 'regular',
    region: 'nt',
    image: '/images/nt-5.png'
  },
  {
    id: 'nt-6',
    name: '梁安琪泳池綜合大樓 (保良局香港道教聯合會圓玄小學旁)(屯門)',
    address: '屯門青山公路青海圍26 號',
    type: 'regular',
    region: 'nt',
    image: '/images/nt-6.png'
  },
  {
    id: 'nt-7',
    name: '裘錦秋中學(葵涌)',
    address: '葵涌安捷街1-11 號',
    type: 'regular',
    region: 'nt',
    image: '/images/nt-7.png'
  }
];

export const divingCourses: Course[] = [
  {
    id: 'diving-child',
    name: '兒童潛水班',
    type: 'diving',
    category: 'child',
    image: '/images/diving-child.png'
  },
  {
    id: 'diving-adult',
    name: '成人潛水班',
    type: 'diving',
    category: 'adult',
    image: '/images/diving-adult.png'
  },
  {
    id: 'diving-elderly',
    name: '長者潛水班',
    type: 'diving',
    category: 'elderly',
    image: '/images/diving-elderly.png'
  }
];
