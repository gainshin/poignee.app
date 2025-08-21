import React, { useEffect } from 'react';
import { Users, Globe, Clock, MessageCircle, Phone, Mail, Share2, Heart, Calendar } from 'lucide-react';
import { GlassCard } from '../components/GlassCard';
import { useAppStore } from '../stores/useAppStore';
import { mockFamilyMembers, mockMemories, mockDashboardSummary } from '../services/mockData';
import { formatDate, getMemoryTypeIcon, truncateText } from '../utils/helpers';
import { motion } from 'framer-motion';

const FamilyConnection: React.FC = () => {
  const { familyMembers, setFamilyMembers, memories, dashboardSummary } = useAppStore();

  useEffect(() => {
    setFamilyMembers(mockFamilyMembers);
  }, [setFamilyMembers]);

  const getLocalTime = (timezone: string) => {
    const options: Intl.DateTimeFormatOptions = {
      timeZone: timezone,
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    };
    return new Intl.DateTimeFormat('zh-TW', options).format(new Date());
  };

  const getRelationshipLabel = (relationship: string) => {
    const labels: Record<string, string> = {
      son: '兒子',
      daughter: '女兒',
      grandchild: '孫子/孫女',
      spouse: '配偶',
      sibling: '兄弟姐妹',
      caregiver: '照護者',
      other: '其他'
    };
    return labels[relationship] || relationship;
  };

  const sharedMemories = memories.filter(m => m.shared_with_family);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <GlassCard>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold gradient-text">家人連結</h1>
            <p className="text-gray-600">與家人保持聯繫，分享美好時光</p>
          </div>
          <Users className="w-8 h-8 text-purple-500" />
        </div>
      </GlassCard>

      {/* Daily Summary */}
      {dashboardSummary && (
        <GlassCard>
          <div className="mb-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-500" />
              今日摘要 - 與家人分享
            </h2>
          </div>
          
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 mb-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-600">對話次數</p>
                <p className="text-2xl font-bold">{dashboardSummary.today_conversations} 次</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">整體心情</p>
                <p className="text-2xl font-bold">{dashboardSummary.overall_mood}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">記錄回憶</p>
                <p className="text-2xl font-bold">{dashboardSummary.today_memories} 則</p>
              </div>
            </div>
            
            {dashboardSummary.recent_highlights.length > 0 && (
              <div>
                <p className="text-sm font-semibold mb-2">今日亮點：</p>
                <ul className="space-y-1">
                  {dashboardSummary.recent_highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <Heart className="w-4 h-4 text-pink-500 mt-0.5" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          
          <button className="w-full glass-button py-3 flex items-center justify-center gap-2">
            <Share2 className="w-5 h-5" />
            <span>分享今日摘要給家人</span>
          </button>
        </GlassCard>
      )}

      {/* Family Members */}
      <div>
        <h2 className="text-xl font-semibold mb-4">家庭成員</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {familyMembers.map((member) => (
            <motion.div
              key={member.id}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <GlassCard>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-semibold">{member.name}</h3>
                    <p className="text-sm text-gray-600">{getRelationshipLabel(member.relationship)}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Globe className="w-4 h-4" />
                      <span>{member.timezone.split('/')[1]}</span>
                    </div>
                    <div className="flex items-center gap-1 text-lg font-semibold">
                      <Clock className="w-4 h-4" />
                      <span>{getLocalTime(member.timezone)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                  <span>偏好語言：</span>
                  <span className="font-medium">
                    {member.preferred_language === 'zh-TW' ? '繁體中文' : 
                     member.preferred_language === 'en-US' ? 'English' : 
                     member.preferred_language}
                  </span>
                </div>
                
                {member.contact_info && (
                  <div className="flex gap-2 pt-3 border-t border-white/20">
                    {member.contact_info.phone && (
                      <button className="flex-1 glass-button py-2 flex items-center justify-center gap-1">
                        <Phone className="w-4 h-4" />
                        <span className="text-xs">電話</span>
                      </button>
                    )}
                    {member.contact_info.email && (
                      <button className="flex-1 glass-button py-2 flex items-center justify-center gap-1">
                        <Mail className="w-4 h-4" />
                        <span className="text-xs">郵件</span>
                      </button>
                    )}
                    {member.contact_info.messaging_app && (
                      <button className="flex-1 glass-button py-2 flex items-center justify-center gap-1">
                        <MessageCircle className="w-4 h-4" />
                        <span className="text-xs">訊息</span>
                      </button>
                    )}
                  </div>
                )}
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Shared Memories */}
      <div>
        <h2 className="text-xl font-semibold mb-4">分享的回憶</h2>
        {sharedMemories.length === 0 ? (
          <GlassCard>
            <p className="text-center text-gray-500 py-8">還沒有分享任何回憶給家人</p>
          </GlassCard>
        ) : (
          <div className="space-y-4">
            {sharedMemories.map((memory) => (
              <GlassCard key={memory.id}>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{getMemoryTypeIcon(memory.memory_type)}</span>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{memory.title}</h3>
                    <p className="text-gray-600 text-sm mb-2">{truncateText(memory.content, 100)}</p>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span>{formatDate(memory.created_date)}</span>
                      {memory.location && <span>📍 {memory.location}</span>}
                      <span className="text-green-600">✓ 已分享</span>
                    </div>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        )}
      </div>

      {/* Communication Tips */}
      <GlassCard>
        <h3 className="font-semibold mb-3">溝通小提醒</h3>
        <ul className="space-y-2 text-sm text-gray-600">
          <li className="flex items-start gap-2">
            <span className="text-green-500">•</span>
            <span>David 在溫哥華，現在是早上時間，適合聯繫</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500">•</span>
            <span>美玲偏好在晚上 8 點接收每日摘要</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500">•</span>
            <span>系統會自動翻譯訊息，讓溝通無障礙</span>
          </li>
        </ul>
      </GlassCard>
    </div>
  );
};

export default FamilyConnection;