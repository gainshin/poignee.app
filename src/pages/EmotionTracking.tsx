import React from 'react';
import { BarChart3, TrendingUp, Heart, Calendar, Info } from 'lucide-react';
import { GlassCard } from '../components/GlassCard';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { mockEmotionTrends } from '../services/mockData';
import { getEmotionEmoji } from '../utils/helpers';

const EmotionTracking: React.FC = () => {
  const emotionStats = {
    mostFrequent: '開心',
    averageScore: 3.7,
    improvement: '+15%',
    totalConversations: 35
  };

  const emotionDistribution = [
    { emotion: '開心', count: 12, percentage: 34 },
    { emotion: '平靜', count: 8, percentage: 23 },
    { emotion: '懷舊', count: 6, percentage: 17 },
    { emotion: '興奮', count: 5, percentage: 14 },
    { emotion: '感恩', count: 4, percentage: 12 }
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload[0]) {
      return (
        <div className="glass-card p-3">
          <p className="font-semibold">{payload[0].payload.date}</p>
          <p className="text-sm">
            心情：{payload[0].payload.mood} {getEmotionEmoji(payload[0].payload.mood)}
          </p>
          <p className="text-sm">分數：{payload[0].value}/5</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <GlassCard>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold gradient-text">情緒追蹤</h1>
            <p className="text-gray-600">了解情緒變化，促進心理健康</p>
          </div>
          <BarChart3 className="w-8 h-8 text-purple-500" />
        </div>
      </GlassCard>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <GlassCard>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">最常見情緒</p>
              <p className="text-xl font-bold">{emotionStats.mostFrequent}</p>
            </div>
            <span className="text-2xl">{getEmotionEmoji(emotionStats.mostFrequent)}</span>
          </div>
        </GlassCard>

        <GlassCard>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">平均心情分數</p>
              <p className="text-xl font-bold">{emotionStats.averageScore}/5</p>
            </div>
            <Heart className="w-8 h-8 text-pink-400" />
          </div>
        </GlassCard>

        <GlassCard>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">本週改善</p>
              <p className="text-xl font-bold text-green-600">{emotionStats.improvement}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-500" />
          </div>
        </GlassCard>

        <GlassCard>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">總對話次數</p>
              <p className="text-xl font-bold">{emotionStats.totalConversations}</p>
            </div>
            <Calendar className="w-8 h-8 text-blue-400" />
          </div>
        </GlassCard>
      </div>

      {/* Weekly Emotion Trend */}
      <GlassCard>
        <h2 className="text-xl font-semibold mb-4">本週心情趨勢</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={mockEmotionTrends}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
            <XAxis 
              dataKey="date" 
              tick={{ fontSize: 12 }}
              stroke="rgba(0,0,0,0.5)"
            />
            <YAxis 
              domain={[0, 5]}
              ticks={[0, 1, 2, 3, 4, 5]}
              tick={{ fontSize: 12 }}
              stroke="rgba(0,0,0,0.5)"
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="score" 
              fill="url(#colorGradient)"
              radius={[8, 8, 0, 0]}
            />
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#ec4899" stopOpacity={0.8} />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </GlassCard>

      {/* Emotion Distribution */}
      <GlassCard>
        <h2 className="text-xl font-semibold mb-4">情緒分布</h2>
        <div className="space-y-3">
          {emotionDistribution.map((item) => (
            <div key={item.emotion} className="flex items-center gap-3">
              <span className="text-2xl w-8">{getEmotionEmoji(item.emotion)}</span>
              <span className="w-16 text-sm font-medium">{item.emotion}</span>
              <div className="flex-1">
                <div className="h-8 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-end pr-2"
                    style={{ width: `${item.percentage}%` }}
                  >
                    <span className="text-white text-xs font-semibold">{item.percentage}%</span>
                  </div>
                </div>
              </div>
              <span className="text-sm text-gray-500 w-12 text-right">{item.count}次</span>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Insights and Recommendations */}
      <GlassCard>
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-blue-500 mt-0.5" />
          <div>
            <h3 className="font-semibold mb-2">洞察與建議</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-green-500">•</span>
                <span>您本週的整體情緒狀態良好，「開心」是最常見的情緒</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">•</span>
                <span>週五的心情分數最高，可能與家人互動或週末期待有關</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">•</span>
                <span>建議繼續保持規律的對話習慣，有助於維持情緒穩定</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">•</span>
                <span>「懷舊」情緒出現頻率適中，顯示記憶回顧對心理健康有正面影響</span>
              </li>
            </ul>
          </div>
        </div>
      </GlassCard>

      {/* Note */}
      <GlassCard>
        <div className="text-center text-sm text-gray-500">
          <p>💡 此為功能示意圖，實際數據將在系統正式運作後自動收集分析</p>
        </div>
      </GlassCard>
    </div>
  );
};

export default EmotionTracking;