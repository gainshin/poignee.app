# Poignée 伴阮 - 數位陪伴助手

## 專案簡介

Poignée (伴阮) 是一款專為早期至中期失智症患者設計的溫暖、人性化數位陪伴助手。透過 AI 語音互動、記憶日記功能及家庭連結平台，維護患者尊嚴，促進情感交流，同時減輕家庭照護者的負擔。

## 核心價值

- **陪伴而非糾正**：AI 對話溫和、支持，不糾正患者錯誤，維護其尊嚴
- **文化敏感性**：深度融合台灣和加拿大等地的文化、節慶、語言習慣
- **跨世代連結**：透過翻譯和分享功能，幫助分散各地的家庭成員保持緊密聯繫
- **記憶保存與喚醒**：提供便捷的日記功能，記錄生活點滴，並透過 AI 喚醒美好回憶
- **隱私與安全**：在設計上充分考慮用戶隱私和數據安全

## 主要功能

### 1. AI 陪伴 (AI Companion)
- 語音互動對話
- 情緒分析與支持
- 文化適應回應
- 對話歷史記錄

### 2. 記憶日記 (Memory Journal)
- 記錄生活回憶
- 分類管理（日常生活、家庭時光、旅行、美食、節慶、童年）
- 情緒標記
- 家人分享功能

### 3. 家人連結 (Family Connection)
- 每日摘要分享
- 家庭成員管理
- 跨時區支援
- 多語言溝通

### 4. 文化寶庫 (Cultural Content)
- 節慶文化內容
- 懷舊音樂
- 傳統故事
- 互動話題引導

### 5. 情緒追蹤 (Emotion Tracking)
- 心情趨勢圖表
- 情緒分析統計
- 洞察與建議

## 技術架構

### 前端技術
- **React 18** with TypeScript
- **Vite** - 建構工具
- **Tailwind CSS** - 樣式框架
- **Framer Motion** - 動畫效果
- **Zustand** - 狀態管理
- **React Router** - 路由管理
- **Recharts** - 數據視覺化
- **Lucide React** - 圖標庫

### UI/UX 設計
- **Glassmorphism** 視覺風格
- **Mobile-first** 響應式設計
- 流暢的動畫與過渡效果
- 無障礙設計考量

## 安裝與執行

### 環境需求
- Node.js 16+
- npm 或 yarn

### 安裝步驟

1. 安裝依賴套件
```bash
npm install
```

2. 啟動開發伺服器
```bash
npm run dev
```

3. 建構生產版本
```bash
npm run build
```

4. 預覽生產版本
```bash
npm run preview
```

## 專案結構

```
src/
├── components/       # 可重用組件
│   ├── Layout.tsx   # 主要佈局組件
│   └── GlassCard.tsx # 毛玻璃卡片組件
├── pages/           # 頁面組件
│   ├── Dashboard.tsx
│   ├── AICompanion.tsx
│   ├── MemoryJournal.tsx
│   ├── FamilyConnection.tsx
│   ├── CulturalContent.tsx
│   └── EmotionTracking.tsx
├── stores/          # Zustand 狀態管理
│   └── useAppStore.ts
├── services/        # API 服務與模擬數據
│   └── mockData.ts
├── types/           # TypeScript 類型定義
│   └── index.ts
├── utils/           # 工具函數
│   └── helpers.ts
├── App.tsx          # 主應用組件
├── main.tsx         # 應用入口
└── index.css        # 全域樣式
```

## 開發指南

### 添加新功能
1. 在 `types/` 中定義數據類型
2. 在 `stores/` 中添加狀態管理
3. 在 `pages/` 中創建頁面組件
4. 在 `App.tsx` 中配置路由

### 樣式開發
- 使用 Tailwind CSS 進行樣式開發
- 自定義玻璃效果類別在 `index.css` 中定義
- 遵循 Mobile-first 設計原則

### 狀態管理
- 使用 Zustand 進行全域狀態管理
- 保持狀態結構扁平化
- 避免深層嵌套的狀態更新

## 未來擴展

### 計劃功能
- 真實語音識別與合成 (Speech-to-Text / Text-to-Speech)
- 後端 API 整合
- 多語言自動翻譯
- 照片上傳與管理
- 視訊通話功能
- AI 個性化學習

### 技術優化
- Progressive Web App (PWA) 支援
- 離線功能
- 效能優化
- 無障礙功能增強

## 貢獻指南

歡迎貢獻代碼、回報問題或提供建議。請遵循以下步驟：

1. Fork 專案
2. 創建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 開啟 Pull Request

## 授權

本專案採用 MIT 授權條款 - 詳見 LICENSE 文件

## 聯絡資訊

專案維護者：Poignée Team
Email: contact@poignee.app

---

**Poignée 伴阮** - 讓科技帶來溫暖的陪伴 ❤️