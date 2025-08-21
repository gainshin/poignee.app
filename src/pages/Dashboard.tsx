import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, BookOpen, Users, Calendar, Bell, Sun, Moon, Cloud } from 'lucide-react';
import { GlassCard } from '../components/GlassCard';
import { useAppStore } from '../stores/useAppStore';
import { mockDashboardSummary, mockPatient } from '../services/mockData';
import { getTimeGreeting, formatTime } from '../utils/helpers';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { dashboardSummary, setDashboardSummary, currentPatient, setCurrentPatient } = useAppStore();

  useEffect(() => {
    // Load mock data
    setDashboardSummary(mockDashboardSummary);
    setCurrentPatient(mockPatient);
  }, [setDashboardSummary, setCurrentPatient]);

  const getWeatherIcon = () => {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 18) return <Sun className="w-6 h-6 text-yellow-500" />;
    return <Moon className="w-6 h-6 text-blue-400" />;
  };

  const quickActions = [
    {
      icon: Heart,
      label: '開始對話',
      description: '與小雨聊天',
      onClick: () => navigate('/companion'),
      color: 'from-pink-400 to-red-400'
    },
    {
      icon: BookOpen,
      label: '記錄回憶',
      description: '寫下今天的故事',
      onClick: () => navigate('/memories'),
      color: 'from-blue-400 to-cyan-400'
    },
    {
      icon: Users,
      label: '聯繫家人',
      description: '分享近況',
      onClick: () => navigate('/family'),
      color: 'from-purple-400 to-pink-400'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Welcome Section */}
      <GlassCard animate>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              {getTimeGreeting()}，{currentPatient?.name || '朋友'}！
            </h1>
            <p className="text-gray-600 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {new Date().toLocaleDateString('zh-TW', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                weekday: 'long'
              })}
              <span className="ml-2">{formatTime(new Date())}</span>
            </p>
          </div>
          <div className="flex items-center gap-2">
            {getWeatherIcon()}
            <span className="text-lg">26°C</span>
          </div>
        </div>
      </GlassCard>

      {/* Today's Summary */}
      {dashboardSummary && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <GlassCard animate>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">今日對話</p>
                <p className="text-2xl font-bold">{dashboardSummary.today_conversations} 次</p>
              </div>
              <Heart className="w-8 h-8 text-pink-400" />
            </div>
          </GlassCard>

          <GlassCard animate>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">記錄回憶</p>
                <p className="text-2xl font-bold">{dashboardSummary.today_memories} 則</p>
              </div>
              <BookOpen className="w-8 h-8 text-blue-400" />
            </div>
          </GlassCard>

          <GlassCard animate>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">整體心情</p>
                <p className="text-2xl font-bold">{dashboardSummary.overall_mood}</p>
              </div>
              <Cloud className="w-8 h-8 text-green-400" />
            </div>
          </GlassCard>
        </div>
      )}

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold mb-4">快速開始</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {quickActions.map((action, index) => (
            <GlassCard
              key={index}
              className="cursor-pointer hover:scale-105 transition-transform duration-300"
              animate
            >
              <button
                onClick={action.onClick}
                className="w-full text-left"
              >
                <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${action.color} mb-3`}>
                  <action.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold mb-1">{action.label}</h3>
                <p className="text-sm text-gray-600">{action.description}</p>
              </button>
            </GlassCard>
          ))}
        </div>
      </div>

      {/* Reminders */}
      {dashboardSummary?.reminders && dashboardSummary.reminders.length > 0 && (
        <GlassCard animate>
          <div className="flex items-center gap-2 mb-4">
            <Bell className="w-5 h-5 text-orange-500" />
            <h2 className="text-xl font-semibold">今日提醒</h2>
          </div>
          <div className="space-y-3">
            {dashboardSummary.reminders.map((reminder) => (
              <div
                key={reminder.id}
                className="flex items-center justify-between p-3 bg-white/20 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={reminder.completed}
                    className="w-5 h-5 rounded"
                    readOnly
                  />
                  <div>
                    <p className="font-medium">{reminder.title}</p>
                    {reminder.time && (
                      <p className="text-sm text-gray-600">{reminder.time}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      )}

      {/* Recent Highlights */}
      {dashboardSummary?.recent_highlights && dashboardSummary.recent_highlights.length > 0 && (
        <GlassCard animate>
          <h2 className="text-xl font-semibold mb-4">今日亮點</h2>
          <ul className="space-y-2">
            {dashboardSummary.recent_highlights.map((highlight, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-green-500 mt-1">•</span>
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </GlassCard>
      )}
    </div>
  );
};

export default Dashboard;