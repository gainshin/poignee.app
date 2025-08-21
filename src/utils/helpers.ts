import { format, formatDistanceToNow, parseISO } from 'date-fns';
import { zhTW } from 'date-fns/locale';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Tailwind class merger utility
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Date formatting utilities
export function formatDate(date: string | Date): string {
  const d = typeof date === 'string' ? parseISO(date) : date;
  return format(d, 'yyyy年MM月dd日', { locale: zhTW });
}

export function formatTime(date: string | Date): string {
  const d = typeof date === 'string' ? parseISO(date) : date;
  return format(d, 'HH:mm', { locale: zhTW });
}

export function formatDateTime(date: string | Date): string {
  const d = typeof date === 'string' ? parseISO(date) : date;
  return format(d, 'yyyy年MM月dd日 HH:mm', { locale: zhTW });
}

export function formatRelativeTime(date: string | Date): string {
  const d = typeof date === 'string' ? parseISO(date) : date;
  return formatDistanceToNow(d, { addSuffix: true, locale: zhTW });
}

// Get greeting based on time of day
export function getTimeGreeting(): string {
  const hour = new Date().getHours();
  
  if (hour < 6) return '夜深了';
  if (hour < 9) return '早安';
  if (hour < 12) return '上午好';
  if (hour < 14) return '午安';
  if (hour < 18) return '下午好';
  if (hour < 22) return '晚上好';
  return '夜深了';
}

// Emotion to emoji mapping
export function getEmotionEmoji(emotion: string): string {
  const emotionMap: Record<string, string> = {
    happy: '😊',
    nostalgic: '🥺',
    peaceful: '😌',
    excited: '🤗',
    grateful: '🙏',
    proud: '💪',
    sad: '😢',
    anxious: '😟',
    confused: '😕',
    tired: '😴',
  };
  
  return emotionMap[emotion.toLowerCase()] || '💭';
}

// Memory type to icon mapping
export function getMemoryTypeIcon(type: string): string {
  const typeMap: Record<string, string> = {
    daily_life: '📅',
    family: '👨‍👩‍👧‍👦',
    travel: '✈️',
    food: '🍽️',
    festival: '🎉',
    childhood: '👶',
  };
  
  return typeMap[type] || '📝';
}

// Truncate text with ellipsis
export function truncateText(text: string, maxLength: number = 100): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

// Generate random ID (for demo purposes)
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// Format duration in seconds to MM:SS
export function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// Get current timezone
export function getCurrentTimezone(): string {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

// Calculate age from birthdate
export function calculateAge(birthDate: string): number {
  const birth = new Date(birthDate);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  
  return age;
}