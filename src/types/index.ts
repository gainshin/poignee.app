// Patient Entity
export interface Patient {
  id: string;
  name: string;
  primary_language: string; // e.g., "zh-TW", "en-US", "min-nan"
  secondary_language?: string;
  cultural_background: string; // e.g., "taiwanese", "canadian_chinese"
  location: string;
  care_stage: 'early' | 'middle' | 'late';
  interests: string[];
  medical_notes?: string;
  emergency_contacts: EmergencyContact[];
  timezone: string;
  created_date: string;
  updated_date: string;
}

export interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
  email: string;
  language: string;
  timezone: string;
}

// Conversation Entity
export interface Conversation {
  id: string;
  patient_id: string;
  audio_url?: string;
  transcript: string;
  detected_language: string;
  ai_response: string;
  conversation_type: 'casual' | 'emotional_support' | 'memory_sharing' | 'cultural_discussion';
  emotion_analysis?: EmotionAnalysis;
  cultural_context?: string;
  translated_text?: string;
  location?: Location;
  duration?: number; // in seconds
  created_date: string;
  updated_date: string;
}

export interface EmotionAnalysis {
  primary_emotion: string;
  confidence: number;
  sentiment: 'positive' | 'neutral' | 'negative';
  emotional_keywords?: string[];
}

export interface Location {
  latitude: number;
  longitude: number;
  address?: string;
}

// Memory Entry Entity
export interface MemoryEntry {
  id: string;
  patient_id: string;
  title: string;
  content: string;
  memory_type: 'daily_life' | 'family' | 'travel' | 'food' | 'festival' | 'childhood';
  emotional_tone: 'happy' | 'nostalgic' | 'peaceful' | 'excited' | 'grateful' | 'proud';
  location?: string;
  photos?: string[];
  audio_note?: string;
  people_involved?: string[];
  cultural_significance?: string;
  shared_with_family: boolean;
  tags?: string[];
  created_date: string;
  updated_date: string;
}

// Family Member Entity
export interface FamilyMember {
  id: string;
  patient_id: string;
  name: string;
  relationship: 'son' | 'daughter' | 'grandchild' | 'spouse' | 'sibling' | 'caregiver' | 'other';
  preferred_language: string;
  timezone: string;
  notification_preferences?: NotificationPreferences;
  contact_info?: ContactInfo;
  created_date: string;
  updated_date: string;
}

export interface NotificationPreferences {
  daily_summary: boolean;
  emergency_alerts: boolean;
  memory_shared: boolean;
  mood_changes: boolean;
  preferred_time?: string; // e.g., "09:00"
}

export interface ContactInfo {
  email?: string;
  phone?: string;
  messaging_app?: 'whatsapp' | 'line' | 'wechat' | 'telegram';
  messaging_id?: string;
}

// Cultural Content
export interface CulturalContent {
  id: string;
  category: 'festival' | 'music' | 'story' | 'tradition' | 'food' | 'history';
  title: string;
  description: string;
  image_url?: string;
  content_details?: any; // Flexible for different content types
  cultural_origin: string;
  languages_available: string[];
  tags: string[];
}

// Dashboard Types
export interface DashboardSummary {
  today_conversations: number;
  today_memories: number;
  overall_mood: string;
  reminders: Reminder[];
  recent_highlights: string[];
}

export interface Reminder {
  id: string;
  type: 'medication' | 'appointment' | 'activity' | 'custom';
  title: string;
  time?: string;
  completed: boolean;
}

// Emotion Tracking
export interface EmotionTrend {
  date: string;
  mood: string;
  score: number; // 1-5 scale
}

// Voice Recording States
export interface VoiceRecordingState {
  isRecording: boolean;
  audioBlob?: Blob;
  audioUrl?: string;
  transcript?: string;
  duration: number;
}

// AI Response
export interface AIResponse {
  text: string;
  emotion?: string;
  suggestions?: string[];
  cultural_reference?: string;
}