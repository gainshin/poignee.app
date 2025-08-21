import React, { useState, useEffect } from 'react';
import { Plus, Calendar, MapPin, Tag, Heart, Camera, Mic, Share2 } from 'lucide-react';
import { GlassCard } from '../components/GlassCard';
import { useAppStore } from '../stores/useAppStore';
import { mockMemories } from '../services/mockData';
import { formatDate, getMemoryTypeIcon, getEmotionEmoji, truncateText, generateId } from '../utils/helpers';
import { motion, AnimatePresence } from 'framer-motion';
import { MemoryEntry } from '../types';

const MemoryJournal: React.FC = () => {
  const { memories, setMemories, addMemory } = useAppStore();
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    memory_type: 'daily_life' as MemoryEntry['memory_type'],
    emotional_tone: 'happy' as MemoryEntry['emotional_tone'],
    location: '',
    tags: [] as string[],
    shared_with_family: false
  });
  const [tagInput, setTagInput] = useState('');

  useEffect(() => {
    setMemories(mockMemories);
  }, [setMemories]);

  const memoryTypes = [
    { value: 'daily_life', label: '日常生活' },
    { value: 'family', label: '家庭時光' },
    { value: 'travel', label: '旅行回憶' },
    { value: 'food', label: '美食記憶' },
    { value: 'festival', label: '節慶活動' },
    { value: 'childhood', label: '童年往事' }
  ];

  const emotionalTones = [
    { value: 'happy', label: '開心', emoji: '😊' },
    { value: 'nostalgic', label: '懷念', emoji: '🥺' },
    { value: 'peaceful', label: '平靜', emoji: '😌' },
    { value: 'excited', label: '興奮', emoji: '🤗' },
    { value: 'grateful', label: '感恩', emoji: '🙏' },
    { value: 'proud', label: '驕傲', emoji: '💪' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.content) {
      alert('請填寫標題和內容');
      return;
    }

    const newMemory: MemoryEntry = {
      id: generateId(),
      patient_id: '1',
      title: formData.title,
      content: formData.content,
      memory_type: formData.memory_type,
      emotional_tone: formData.emotional_tone,
      location: formData.location,
      tags: formData.tags,
      shared_with_family: formData.shared_with_family,
      created_date: new Date().toISOString(),
      updated_date: new Date().toISOString()
    };

    addMemory(newMemory);
    setShowAddForm(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      memory_type: 'daily_life',
      emotional_tone: 'happy',
      location: '',
      tags: [],
      shared_with_family: false
    });
    setTagInput('');
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tagInput.trim()]
      });
      setTagInput('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(t => t !== tag)
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <GlassCard>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold gradient-text">記憶日記</h1>
            <p className="text-gray-600">記錄生活中的美好時刻</p>
          </div>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="glass-button flex items-center gap-2 px-4 py-2"
          >
            <Plus className="w-5 h-5" />
            <span>新增回憶</span>
          </button>
        </div>
      </GlassCard>

      {/* Add Memory Form */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <GlassCard>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">記憶標題</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full glass-input"
                    placeholder="為這個回憶取個標題..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">記憶內容</label>
                  <textarea
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    className="w-full glass-input min-h-[120px]"
                    placeholder="詳細描述這個回憶..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">回憶類型</label>
                    <select
                      value={formData.memory_type}
                      onChange={(e) => setFormData({ ...formData, memory_type: e.target.value as any })}
                      className="w-full glass-input"
                    >
                      {memoryTypes.map(type => (
                        <option key={type.value} value={type.value}>
                          {getMemoryTypeIcon(type.value)} {type.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">心情</label>
                    <select
                      value={formData.emotional_tone}
                      onChange={(e) => setFormData({ ...formData, emotional_tone: e.target.value as any })}
                      className="w-full glass-input"
                    >
                      {emotionalTones.map(tone => (
                        <option key={tone.value} value={tone.value}>
                          {tone.emoji} {tone.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    <MapPin className="inline w-4 h-4 mr-1" />
                    地點（選填）
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full glass-input"
                    placeholder="這個回憶發生的地點..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    <Tag className="inline w-4 h-4 mr-1" />
                    標籤
                  </label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                      className="flex-1 glass-input"
                      placeholder="輸入標籤..."
                    />
                    <button
                      type="button"
                      onClick={handleAddTag}
                      className="glass-button px-4"
                    >
                      新增
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.tags.map(tag => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(tag)}
                          className="hover:text-purple-900"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.shared_with_family}
                      onChange={(e) => setFormData({ ...formData, shared_with_family: e.target.checked })}
                      className="w-5 h-5 rounded"
                    />
                    <span className="text-sm">與家人分享</span>
                  </label>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 glass-button bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3"
                  >
                    儲存回憶
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddForm(false);
                      resetForm();
                    }}
                    className="flex-1 glass-button py-3"
                  >
                    取消
                  </button>
                </div>
              </form>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Memory List */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">最近的回憶</h2>
        {memories.length === 0 ? (
          <GlassCard>
            <p className="text-center text-gray-500 py-8">還沒有記錄任何回憶，點擊上方按鈕開始記錄吧！</p>
          </GlassCard>
        ) : (
          <div className="grid gap-4">
            {memories.map((memory) => (
              <motion.div
                key={memory.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <GlassCard>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl">{getMemoryTypeIcon(memory.memory_type)}</span>
                        <h3 className="text-lg font-semibold">{memory.title}</h3>
                        <span className="text-xl">{getEmotionEmoji(memory.emotional_tone)}</span>
                      </div>
                      
                      <p className="text-gray-700 mb-3">{truncateText(memory.content, 150)}</p>
                      
                      <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {formatDate(memory.created_date)}
                        </span>
                        
                        {memory.location && (
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {memory.location}
                          </span>
                        )}
                        
                        {memory.shared_with_family && (
                          <span className="flex items-center gap-1 text-green-600">
                            <Share2 className="w-4 h-4" />
                            已分享
                          </span>
                        )}
                      </div>
                      
                      {memory.tags && memory.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {memory.tags.map(tag => (
                            <span
                              key={tag}
                              className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex gap-2 ml-4">
                      <button className="p-2 hover:bg-white/20 rounded-lg transition-colors">
                        <Camera className="w-5 h-5 text-gray-500" />
                      </button>
                      <button className="p-2 hover:bg-white/20 rounded-lg transition-colors">
                        <Mic className="w-5 h-5 text-gray-500" />
                      </button>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MemoryJournal;