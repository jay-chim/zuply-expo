# Zuply 臻沛 — Expo React Native Prototype

個人化健康補充劑 · 香港

## 專案概覽

Zuply 是一家香港個人化健康補充劑公司的 Expo React Native 原型應用程式，採用 TypeScript 開發，全介面使用繁體中文。

## 技術棧

- **框架**: Expo SDK 51 + React Native 0.74
- **導航**: Expo Router (file-based routing)
- **語言**: TypeScript
- **圖示**: @expo/vector-icons (Ionicons)
- **樣式**: StyleSheet API
- **主色調**: #0D9488 (Teal)

## 頁面結構

```
app/
├── _layout.tsx              # Root layout (Stack navigator)
├── (tabs)/
│   ├── _layout.tsx          # Bottom tab navigator
│   ├── index.tsx            # 首頁 (Home)
│   ├── questionnaire.tsx    # 問卷 (Questionnaire - 5 steps)
│   ├── orders.tsx           # 訂單列表 (Order List)
│   └── profile.tsx          # 個人中心 (Profile)
├── formula.tsx              # 配方結果 (Formula Result)
├── cart.tsx                 # 購物車 (Cart)
└── order-status.tsx         # 訂單追蹤 (Order Status)

components/
├── ZuplyLogo.tsx            # Brand logo component
├── TierBadge.tsx            # Supplement tier badge (Basic/Advanced/Premium/Flagship)
├── PrimaryButton.tsx        # Reusable button component
└── SectionHeader.tsx        # Section title component

constants/
├── Colors.ts                # Design tokens: colors, spacing, radius, shadow
└── MockData.ts              # All mock data and types
```

## 快速開始

### 前置需求

- Node.js 18+
- npm 9+
- Expo Go app (iOS / Android)

### 安裝步驟

```bash
# 1. 安裝依賴
cd zuply-expo
npm install

# 2. 啟動開發伺服器
npx expo start

# 3. 掃描 QR Code
# 使用 Expo Go app 掃描終端顯示的 QR Code 即可預覽
```

## 業務邏輯

### 定價
| 等級 | 每粒/日 |
|------|---------|
| Basic | HK$1.2 |
| Advanced | HK$1.8 |
| Premium | HK$4.0 |
| Flagship | HK$5.8 |

附加費用：
- AI 配方費：HK$3/日
- 包裝費：HK$1/日

### 折扣方案
| 訂購時長 | 折扣 |
|----------|------|
| 1 個月 | 原價 |
| 2 個月 | 9折 (10% off) |
| 3 個月 | 85折 (15% off) |

### 包裝規則
- ≤ 6 粒/日 → 每日一包
- ≥ 7 粒/日 → 早晚分包 (AM/PM)

### 配方補充劑 (Mock)
1. 維生素D3 (Basic · HK$1.2)
2. 鎂 (Basic · HK$1.2)
3. 維生素B群 (Advanced · HK$1.8)
4. 輔酶Q10 (Advanced · HK$1.8)
5. 維生素C (Basic · HK$1.2)
6. 鋅 (Basic · HK$1.2)

## 問卷流程 (5 步)
1. **基本資料** — 姓名、年齡、性別、身高、體重
2. **健康目標** — 多選健康目標
3. **生活方式** — 運動、睡眠、飲食習慣
4. **醫療與用藥** — 慢性病、用藥、過敏史
5. **確認提交** — 確認並生成配方

## 訂單追蹤狀態
已付款 → 藥劑師審核 → 審核通過 → 發貨

## 注意事項

- 此為 UI 原型，不含任何真實 API 呼叫
- 所有數據為 Mock 數據
- 設計用於 Expo Go 預覽

---

**Zuply Health Limited 臻沛** · 香港持牌藥行
