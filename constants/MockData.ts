export type SupplementTier = 'Basic' | 'Advanced' | 'Premium' | 'Flagship';

export interface Supplement {
  id: string;
  nameZh: string;
  nameEn: string;
  tier: SupplementTier;
  pricePerPill: number;
  pillsPerDay: number;
  packType: string;
  description: string;
  benefits: string[];
}

export interface Order {
  id: string;
  date: string;
  status: 'paid' | 'reviewing' | 'approved' | 'shipped';
  total: number;
  items: number;
}

export const MOCK_SUPPLEMENTS: Supplement[] = [
  {
    id: 's1',
    nameZh: '維生素D3',
    nameEn: 'Vitamin D3',
    tier: 'Basic',
    pricePerPill: 1.2,
    pillsPerDay: 1,
    packType: '每日一包',
    description: '促進鈣吸收，維持骨骼健康',
    benefits: ['骨骼健康', '免疫支持', '情緒調節'],
  },
  {
    id: 's2',
    nameZh: '鎂',
    nameEn: 'Magnesium',
    tier: 'Basic',
    pricePerPill: 1.2,
    pillsPerDay: 1,
    packType: '每日一包',
    description: '改善睡眠品質，舒緩肌肉緊張',
    benefits: ['睡眠改善', '肌肉放鬆', '神經系統支持'],
  },
  {
    id: 's3',
    nameZh: '維生素B群',
    nameEn: 'Vitamin B Complex',
    tier: 'Advanced',
    pricePerPill: 1.8,
    pillsPerDay: 1,
    packType: '每日一包',
    description: '提升能量代謝，支持神經健康',
    benefits: ['能量提升', '神經健康', '新陳代謝'],
  },
  {
    id: 's4',
    nameZh: '輔酶Q10',
    nameEn: 'CoQ10',
    tier: 'Advanced',
    pricePerPill: 1.8,
    pillsPerDay: 1,
    packType: '每日一包',
    description: '強效抗氧化，支持心臟健康',
    benefits: ['心臟健康', '抗氧化', '細胞能量'],
  },
  {
    id: 's5',
    nameZh: '維生素C',
    nameEn: 'Vitamin C',
    tier: 'Basic',
    pricePerPill: 1.2,
    pillsPerDay: 1,
    packType: '每日一包',
    description: '增強免疫力，促進膠原蛋白合成',
    benefits: ['免疫增強', '抗氧化', '皮膚健康'],
  },
  {
    id: 's6',
    nameZh: '鋅',
    nameEn: 'Zinc',
    tier: 'Basic',
    pricePerPill: 1.2,
    pillsPerDay: 1,
    packType: '每日一包',
    description: '支持免疫功能，促進傷口愈合',
    benefits: ['免疫支持', '傷口癒合', '荷爾蒙平衡'],
  },
];

export const MOCK_ORDERS: Order[] = [
  {
    id: 'ZP-2024-0312',
    date: '2024-03-12',
    status: 'shipped',
    total: 1247,
    items: 6,
  },
  {
    id: 'ZP-2024-0215',
    date: '2024-02-15',
    status: 'shipped',
    total: 892,
    items: 4,
  },
  {
    id: 'ZP-2024-0401',
    date: '2024-04-01',
    status: 'reviewing',
    total: 1560,
    items: 6,
  },
];

export const TIER_PRICES: Record<SupplementTier, number> = {
  Basic: 1.2,
  Advanced: 1.8,
  Premium: 4.0,
  Flagship: 5.8,
};

export const AI_FEE_PER_DAY = 3;
export const PACKAGING_FEE_PER_DAY = 1;

export const DURATION_OPTIONS = [
  { months: 1, label: '1個月', discount: 0, discountLabel: '原價' },
  { months: 2, label: '2個月', discount: 0.1, discountLabel: '9折' },
  { months: 3, label: '3個月', discount: 0.15, discountLabel: '85折' },
];

export const HOW_IT_WORKS_STEPS = [
  {
    step: '01',
    title: '填寫問卷',
    desc: '回答關於您的健康目標、生活方式及用藥狀況',
    icon: 'clipboard-list',
  },
  {
    step: '02',
    title: 'AI分析',
    desc: '我們的AI系統根據您的數據生成個人化配方',
    icon: 'cpu',
  },
  {
    step: '03',
    title: '藥劑師審核',
    desc: '持牌藥劑師全面審核您的專屬配方',
    icon: 'user-check',
  },
  {
    step: '04',
    title: '日本製造發貨',
    desc: '在日本GMP工廠生產，直送您的門前',
    icon: 'package',
  },
];

export const QUESTIONNAIRE_STEPS = [
  { id: 1, title: '基本資料', subtitle: '告訴我們關於您的基本資訊' },
  { id: 2, title: '健康目標', subtitle: '您希望透過補充劑達到什麼目標？' },
  { id: 3, title: '生活方式', subtitle: '您的日常生活習慣如何？' },
  { id: 4, title: '醫療與用藥', subtitle: '目前的健康狀況及用藥情況' },
  { id: 5, title: '確認提交', subtitle: '確認您的資料並提交' },
];

export const ORDER_STATUS_STEPS = [
  { key: 'paid', label: '已付款', icon: 'check-circle' },
  { key: 'reviewing', label: '藥劑師審核', icon: 'search' },
  { key: 'approved', label: '審核通過', icon: 'shield-check' },
  { key: 'shipped', label: '發貨', icon: 'package' },
];
