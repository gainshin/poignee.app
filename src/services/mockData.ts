import { Patient, FamilyMember, MemoryEntry, Conversation, CulturalContent, DashboardSummary, EmotionTrend } from '../types';
import { generateId } from '../utils/helpers';

// Mock current patient data
export const mockPatient: Patient = {
  id: '1',
  name: '王爺爺',
  primary_language: 'zh-TW',
  secondary_language: 'min-nan',
  cultural_background: 'taiwanese',
  location: '台北市',
  care_stage: 'early',
  interests: ['音樂', '園藝', '歷史', '烹飪'],
  medical_notes: '輕度認知障礙，每日服用記憶相關藥物',
  emergency_contacts: [
    {
      name: 'David Wang',
      relationship: '兒子',
      phone: '+1-604-123-4567',
      email: 'david.wang@email.com',
      language: 'en-US',
      timezone: 'America/Vancouver'
    }
  ],
  timezone: 'Asia/Taipei',
  created_date: '2024-01-01T00:00:00Z',
  updated_date: '2024-03-15T10:30:00Z'
};

// Mock family members
export const mockFamilyMembers: FamilyMember[] = [
  {
    id: '1',
    patient_id: '1',
    name: 'David Wang',
    relationship: 'son',
    preferred_language: 'en-US',
    timezone: 'America/Vancouver',
    notification_preferences: {
      daily_summary: true,
      emergency_alerts: true,
      memory_shared: true,
      mood_changes: true,
      preferred_time: '09:00'
    },
    contact_info: {
      email: 'david.wang@email.com',
      phone: '+1-604-123-4567',
      messaging_app: 'whatsapp',
      messaging_id: '+16041234567'
    },
    created_date: '2024-01-01T00:00:00Z',
    updated_date: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    patient_id: '1',
    name: '王美玲',
    relationship: 'daughter',
    preferred_language: 'zh-TW',
    timezone: 'Asia/Taipei',
    notification_preferences: {
      daily_summary: true,
      emergency_alerts: true,
      memory_shared: false,
      mood_changes: true,
      preferred_time: '20:00'
    },
    contact_info: {
      email: 'meiling@email.com',
      phone: '+886-912-345-678',
      messaging_app: 'line',
      messaging_id: 'meiling_wang'
    },
    created_date: '2024-01-01T00:00:00Z',
    updated_date: '2024-01-01T00:00:00Z'
  }
];

// Mock memory entries
export const mockMemories: MemoryEntry[] = [
  {
    id: '1',
    patient_id: '1',
    title: '中秋節家族聚餐',
    content: '昨天是中秋節，全家人聚在一起吃月餅、賞月。孫子們很開心，我們一起唱歌、聊天到很晚。',
    memory_type: 'festival',
    emotional_tone: 'happy',
    location: '台北市大安區',
    people_involved: ['David', '美玲', '小明', '小華'],
    cultural_significance: '中秋節是家人團圓的重要節日',
    shared_with_family: true,
    tags: ['中秋節', '家庭', '團圓'],
    created_date: new Date(Date.now() - 86400000).toISOString(),
    updated_date: new Date(Date.now() - 86400000).toISOString()
  },
  {
    id: '2',
    patient_id: '1',
    title: '公園散步',
    content: '今天天氣很好，去公園散步，看到很多小朋友在玩耍，想起了自己的童年。',
    memory_type: 'daily_life',
    emotional_tone: 'nostalgic',
    location: '大安森林公園',
    shared_with_family: false,
    tags: ['散步', '公園', '童年'],
    created_date: new Date(Date.now() - 172800000).toISOString(),
    updated_date: new Date(Date.now() - 172800000).toISOString()
  }
];

// Mock conversations
export const mockConversations: Conversation[] = [
  {
    id: '1',
    patient_id: '1',
    transcript: '小雨啊，今天天氣真好，讓我想起小時候和爺爺一起在公園玩耍的日子。',
    detected_language: 'zh-TW',
    ai_response: '哇！聽起來是很美好的回憶呢！您的爺爺一定很疼愛您。您還記得在公園裡最喜歡玩什麼嗎？',
    conversation_type: 'memory_sharing',
    emotion_analysis: {
      primary_emotion: '懷舊',
      confidence: 0.85,
      sentiment: 'positive',
      emotional_keywords: ['想起', '小時候', '爺爺']
    },
    duration: 45,
    created_date: new Date(Date.now() - 3600000).toISOString(),
    updated_date: new Date(Date.now() - 3600000).toISOString()
  },
  {
    id: '2',
    patient_id: '1',
    transcript: '我有點記不清楚今天是星期幾了...',
    detected_language: 'zh-TW',
    ai_response: '沒關係的！今天是個美好的日子呢。有什麼特別想做的事情嗎？我們可以一起聊聊天，或者聽聽您喜歡的音樂。',
    conversation_type: 'emotional_support',
    emotion_analysis: {
      primary_emotion: '困惑',
      confidence: 0.75,
      sentiment: 'neutral',
      emotional_keywords: ['記不清楚']
    },
    duration: 30,
    created_date: new Date(Date.now() - 7200000).toISOString(),
    updated_date: new Date(Date.now() - 7200000).toISOString()
  }
];

// Mock cultural content
export const mockCulturalContent: CulturalContent[] = [
  {
    id: '1',
    category: 'festival',
    title: '春節',
    description: '農曆新年，是華人最重要的傳統節日，象徵著新的開始和家人團聚。',
    image_url: '/images/spring-festival.jpg',
    content_details: {
      traditions: ['貼春聯', '包餃子', '發紅包', '守歲'],
      foods: ['年糕', '餃子', '魚', '湯圓'],
      activities: ['拜年', '舞龍舞獅', '放鞭炮']
    },
    cultural_origin: 'chinese',
    languages_available: ['zh-TW', 'zh-CN', 'en-US'],
    tags: ['節慶', '團圓', '傳統']
  },
  {
    id: '2',
    category: 'music',
    title: '台語老歌',
    description: '經典的台語歌曲，承載著許多人的青春回憶。',
    content_details: {
      songs: ['望春風', '雨夜花', '月夜愁', '四季紅'],
      artists: ['鄧麗君', '江蕙', '陳雷']
    },
    cultural_origin: 'taiwanese',
    languages_available: ['min-nan'],
    tags: ['音樂', '懷舊', '台灣']
  },
  {
    id: '3',
    category: 'story',
    title: '台灣民間故事',
    description: '流傳在台灣的傳統民間故事，富含文化智慧。',
    content_details: {
      stories: ['虎姑婆', '白蛇傳', '廖添丁傳奇'],
      themes: ['勇氣', '智慧', '正義']
    },
    cultural_origin: 'taiwanese',
    languages_available: ['zh-TW', 'min-nan'],
    tags: ['故事', '傳統', '文化']
  }
];

// Mock dashboard summary
export const mockDashboardSummary: DashboardSummary = {
  today_conversations: 5,
  today_memories: 2,
  overall_mood: '平靜愉快',
  reminders: [
    {
      id: '1',
      type: 'medication',
      title: '記得吃藥',
      time: '09:00',
      completed: false
    },
    {
      id: '2',
      type: 'activity',
      title: '下午散步',
      time: '15:00',
      completed: false
    }
  ],
  recent_highlights: [
    '與小雨聊了童年回憶',
    '記錄了中秋節的美好時光',
    '聽了幾首懷舊歌曲'
  ]
};

// Mock emotion trends
export const mockEmotionTrends: EmotionTrend[] = [
  { date: '週一', mood: '開心', score: 4 },
  { date: '週二', mood: '平靜', score: 3 },
  { date: '週三', mood: '懷舊', score: 3 },
  { date: '週四', mood: '開心', score: 4 },
  { date: '週五', mood: '興奮', score: 5 },
  { date: '週六', mood: '平靜', score: 3 },
  { date: '週日', mood: '開心', score: 4 }
];