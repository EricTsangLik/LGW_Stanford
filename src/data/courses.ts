import { Course } from '../types';

const locations = [
  // Hong Kong Island
  {
    baseId: 'hk-1',
    name: '韓國國際學校(西灣河)',
    address: '西灣河鯉景道55 號',
    region: 'hk',
    image: '/images/hk-1.png'
  },
  {
    baseId: 'hk-2',
    name: '香港真光中學(銅鑼灣)',
    address: '銅鑼灣大坑道50號',
    region: 'hk',
    image: '/images/hk-2.png'
  },
  {
    baseId: 'hk-3',
    name: '聖公會鄧肇堅中學(灣仔)',
    address: '灣仔愛群道9 號',
    region: 'hk',
    image: '/images/hk-3.png'
  },
  {
    baseId: 'hk-4',
    name: '史丹福會(南區)',
    address: '香港南區置富廣場地下',
    region: 'hk',
    image: '/images/hk-4.png'
  },
  {
    baseId: 'hk-5',
    name: '培英中學(薄扶林)',
    address: '香港薄扶林華富道55 號',
    region: 'hk',
    image: '/images/hk-5.png'
  },

  // Kowloon
  {
    baseId: 'kln-1',
    name: '宣道國際學校(荔枝角)',
    address: '荔枝角瓊林街33號',
    region: 'kln',
    image: '/images/kln-1.png'
  },
  {
    baseId: 'kln-2',
    name: '基督教祟真中學(長沙灣)',
    address: '長沙灣荔康街8 號',
    region: 'kln',
    image: '/images/kln-2.png'
  },
  {
    baseId: 'kln-3',
    name: '保良局顏寶鈴書院(土瓜灣)',
    address: '九龍土瓜灣崇安街26 號',
    region: 'kln',
    image: '/images/kln-3.png'
  },
  {
    baseId: 'kln-4',
    name: '香港澳洲國際學校(九龍塘)',
    address: '九龍塘羅福道3 號A',
    region: 'kln',
    image: '/images/kln-4.png'
  },
  {
    baseId: 'kln-5',
    name: '匯基書院(東九龍)',
    address: '順利利安里2 號',
    region: 'kln',
    image: '/images/kln-5.png'
  },
  {
    baseId: 'kln-6',
    name: 'Nord Anglia International School (Kwun Tong)(觀塘)',
    address: '觀塘月華街19 號',
    region: 'kln',
    image: '/images/kln-6.png'
  },
  {
    baseId: 'kln-7',
    name: 'Nord Anglia International School (Lam Tin)(藍田)',
    address: '藍田安田街11 號',
    region: 'kln',
    image: '/images/kln-7.png'
  },
  {
    baseId: 'kln-8',
    name: '法國國際學校(將軍澳)',
    address: '將軍澳唐賢街二十八號',
    region: 'kln',
    image: '/images/kln-8.png'
  },
  {
    baseId: 'kln-9',
    name: '保良局黃永樹小學(將軍澳)',
    address: '將軍澳唐賢街二號',
    region: 'kln',
    image: '/images/kln-9.png'
  },
  {
    baseId: 'kln-10',
    name: '景嶺書院(將軍澳)',
    address: '將軍澳林盛路1 號',
    region: 'kln',
    image: '/images/kln-10.png'
  },

  // New Territories
  {
    baseId: 'nt-1',
    name: '浸信會沙田圍呂明才小學(沙田)',
    address: '沙田圓洲角路8 號',
    region: 'nt',
    image: '/images/nt-1.png'
  },
  {
    baseId: 'nt-2',
    name: '保良局雨川小學(馬鞍山)',
    address: '新界馬鞍山鞍駿街28 號',
    region: 'nt',
    image: '/images/nt-2.png'
  },
  {
    baseId: 'nt-3',
    name: '香港墨爾文國際學校(科學園)',
    address: '大埔科進路3號',
    region: 'nt',
    image: '/images/nt-3.png'
  },
  {
    baseId: 'nt-4',
    name: '大埔舊墟公立學校(寶湖道)(大埔)',
    address: '大埔寶湖道7 號',
    region: 'nt',
    image: '/images/nt-4.png'
  },
  {
    baseId: 'nt-5',
    name: '安基司學校(元朗)',
    address: '元朗錦田北高埔徑1號',
    region: 'nt',
    image: '/images/nt-5.png'
  },
  {
    baseId: 'nt-6',
    name: '梁安琪泳池綜合大樓 (保良局香港道教聯合會圓玄小學旁)(屯門)',
    address: '屯門青山公路青海圍26 號',
    region: 'nt',
    image: '/images/nt-6.png'
  },
  {
    baseId: 'nt-7',
    name: '裘錦秋中學(葵涌)',
    address: '葵涌安捷街1-11 號',
    region: 'nt',
    image: '/images/nt-7.png'
  }
] as const;

const waterBabiesLocations = [
  'nt-1', // 浸信會沙田圍呂明才小學
  'nt-4', // 大埔舊墟公立學校(寶湖道)
  'nt-5', // 安基司學校(元朗)
  'nt-6', // 梁安琪泳池綜合大樓
  'kln-2', // 基督教祟真中學
  'kln-4', // 香港澳洲國際學校
  'kln-6', // Nord Anglia International School (Kwun Tong)
  'hk-1', // 韓國國際學校
  'hk-2'  // 香港真光中學
];

const adultCoursesLocations = [
  'kln-2', // 基督教祟真中學
  'nt-1',  // 浸信會沙田圍呂明才小學
  'kln-9', // 保良局黃永樹小學
  'hk-2'   // 香港真光中學
];

export const regularCourses: Course[] = locations.flatMap(loc => {
  const courses: Course[] = [];

  // Add Waterbabies course only for specific locations
  if (waterBabiesLocations.includes(loc.baseId)) {
    courses.push({
      id: `${loc.baseId}-bb`,
      name: `${loc.name} (Waterbabies)`,
      address: loc.address,
      type: 'regular',
      region: loc.region,
      image: loc.image,
      category: 'bb'
    });
  }

  // Add Child courses for all locations
  courses.push({
    id: `${loc.baseId}-child`,
    name: `${loc.name} (兒童班)`,
    address: loc.address,
    type: 'regular',
    region: loc.region,
    image: loc.image,
    category: 'child'
  });

  // Add Adult course only for specific locations
  if (adultCoursesLocations.includes(loc.baseId)) {
    courses.push({
      id: `${loc.baseId}-adult`,
      name: `${loc.name} (成人班)`,
      address: loc.address,
      type: 'regular',
      region: loc.region,
      image: loc.image,
      category: 'adult'
    });
  }

  return courses;
});

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
