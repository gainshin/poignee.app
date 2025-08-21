import React, { useEffect, useState } from 'react';
import { Library, Music, BookOpen, Sparkles, Play, ChevronRight, Globe } from 'lucide-react';
import { GlassCard } from '../components/GlassCard';
import { useAppStore } from '../stores/useAppStore';
import { mockCulturalContent } from '../services/mockData';
import { motion } from 'framer-motion';
import { CulturalContent as CulturalContentType } from '../types';

const CulturalContent: React.FC = () => {
  const { culturalContent, setCulturalContent } = useAppStore();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedContent, setSelectedContent] = useState<CulturalContentType | null>(null);

  useEffect(() => {
    setCulturalContent(mockCulturalContent);
  }, [setCulturalContent]);

  const categories = [
    { value: 'all', label: '全部', icon: Library },
    { value: 'festival', label: '節慶', icon: Sparkles },
    { value: 'music', label: '音樂', icon: Music },
    { value: 'story', label: '故事', icon: BookOpen },
  ];

  const filteredContent = selectedCategory === 'all' 
    ? culturalContent 
    : culturalContent.filter(c => c.category === selectedCategory);

  const getCategoryIcon = (category: string) => {
    const icons: Record<string, string> = {
      festival: '🎉',
      music: '🎵',
      story: '📚',
      tradition: '🏮',
      food: '🍜',
      history: '📜'
    };
    return icons[category] || '📝';
  };

  const handleContentSelect = (content: CulturalContentType) => {
    setSelectedContent(content);
  };

  const startConversation = () => {
    if (selectedContent) {
      // Navigate to AI Companion with cultural context
      console.log('Starting conversation about:', selectedContent.title);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <GlassCard>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold gradient-text">文化寶庫</h1>
            <p className="text-gray-600">探索文化記憶，喚醒美好回憶</p>
          </div>
          <Library className="w-8 h-8 text-purple-500" />
        </div>
      </GlassCard>

      {/* Category Filter */}
      <div className="flex gap-3 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setSelectedCategory(cat.value)}
            className={`glass-button flex items-center gap-2 px-4 py-2 whitespace-nowrap ${
              selectedCategory === cat.value ? 'ring-2 ring-purple-400' : ''
            }`}
          >
            <cat.icon className="w-4 h-4" />
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredContent.map((content) => (
          <motion.div
            key={content.id}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <GlassCard 
              className="cursor-pointer"
              animate
            >
              <button
                onClick={() => handleContentSelect(content)}
                className="w-full text-left"
              >
                <div className="flex items-start gap-3">
                  <span className="text-3xl">{getCategoryIcon(content.category)}</span>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-1">{content.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">{content.description}</p>
                    
                    {content.content_details && (
                      <div className="space-y-2">
                        {content.content_details.songs && (
                          <div className="flex flex-wrap gap-2">
                            {content.content_details.songs.slice(0, 3).map((song: string, index: number) => (
                              <span key={index} className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                                {song}
                              </span>
                            ))}
                            {content.content_details.songs.length > 3 && (
                              <span className="text-xs text-gray-500">
                                +{content.content_details.songs.length - 3} 更多
                              </span>
                            )}
                          </div>
                        )}
                        
                        {content.content_details.stories && (
                          <div className="flex flex-wrap gap-2">
                            {content.content_details.stories.slice(0, 2).map((story: string, index: number) => (
                              <span key={index} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                                {story}
                              </span>
                            ))}
                          </div>
                        )}
                        
                        {content.content_details.traditions && (
                          <div className="text-xs text-gray-500">
                            包含 {content.content_details.traditions.length} 個傳統習俗
                          </div>
                        )}
                      </div>
                    )}
                    
                    <div className="flex items-center gap-2 mt-3 text-xs text-gray-500">
                      <Globe className="w-3 h-3" />
                      <span>{content.languages_available.map(lang => 
                        lang === 'zh-TW' ? '繁中' : 
                        lang === 'zh-CN' ? '簡中' : 
                        lang === 'en-US' ? 'EN' :
                        lang === 'min-nan' ? '台語' : lang
                      ).join(', ')}</span>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </button>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {/* Selected Content Detail */}
      {selectedContent && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <GlassCard>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-4xl">{getCategoryIcon(selectedContent.category)}</span>
                <div>
                  <h2 className="text-xl font-bold">{selectedContent.title}</h2>
                  <p className="text-gray-600">{selectedContent.description}</p>
                </div>
              </div>
              
              {selectedContent.content_details && (
                <div className="space-y-3">
                  {selectedContent.content_details.songs && (
                    <div>
                      <h3 className="font-semibold mb-2">精選歌曲</h3>
                      <div className="grid grid-cols-2 gap-2">
                        {selectedContent.content_details.songs.map((song: string, index: number) => (
                          <div key={index} className="flex items-center gap-2 p-2 bg-white/20 rounded-lg">
                            <Play className="w-4 h-4 text-purple-500" />
                            <span className="text-sm">{song}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {selectedContent.content_details.stories && (
                    <div>
                      <h3 className="font-semibold mb-2">熱門故事</h3>
                      <ul className="space-y-1">
                        {selectedContent.content_details.stories.map((story: string, index: number) => (
                          <li key={index} className="flex items-center gap-2 text-sm">
                            <span className="text-blue-500">•</span>
                            <span>{story}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {selectedContent.content_details.traditions && (
                    <div>
                      <h3 className="font-semibold mb-2">傳統習俗</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedContent.content_details.traditions.map((tradition: string, index: number) => (
                          <span key={index} className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm">
                            {tradition}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              <button
                onClick={startConversation}
                className="w-full glass-button bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 flex items-center justify-center gap-2"
              >
                <Sparkles className="w-5 h-5" />
                <span>開始聊聊這個話題</span>
              </button>
            </div>
          </GlassCard>
        </motion.div>
      )}
    </div>
  );
};

export default CulturalContent;