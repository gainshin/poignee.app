import React, { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Volume2, Send, Heart, Music, Camera, BookOpen, Sparkles } from 'lucide-react';
import { GlassCard } from '../components/GlassCard';
import { useAppStore } from '../stores/useAppStore';
import { mockConversations } from '../services/mockData';
import { formatTime, getEmotionEmoji, truncateText, generateId } from '../utils/helpers';
import { motion, AnimatePresence } from 'framer-motion';
import { Conversation } from '../types';

const AICompanion: React.FC = () => {
  const { 
    conversations, 
    setConversations, 
    addConversation,
    isRecording, 
    setIsRecording,
    currentTranscript,
    setCurrentTranscript
  } = useAppStore();

  const [inputText, setInputText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    setConversations(mockConversations);
  }, [setConversations]);

  useEffect(() => {
    scrollToBottom();
  }, [conversations]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const emotionalActivities = [
    { icon: Music, label: '聽懷舊音樂', value: 'music' },
    { icon: Camera, label: '看照片', value: 'photos' },
    { icon: BookOpen, label: '聊節慶故事', value: 'stories' },
    { icon: Heart, label: '心靈寧靜', value: 'meditation' }
  ];

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        // Here you would upload the audio and get transcription
        // For demo, we'll use a mock transcription
        handleMockTranscription();
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      // Fallback to text input if microphone is not available
      alert('無法存取麥克風，請使用文字輸入');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
    }
  };

  const handleMockTranscription = () => {
    const mockTranscripts = [
      '今天天氣真好，讓我想起年輕時的春天',
      '我好想念我的家人',
      '可以播放一些老歌給我聽嗎？',
      '我記得小時候過年的情景'
    ];
    const transcript = mockTranscripts[Math.floor(Math.random() * mockTranscripts.length)];
    setCurrentTranscript(transcript);
    processUserInput(transcript);
  };

  const processUserInput = async (text: string) => {
    setIsProcessing(true);
    
    // Simulate AI processing
    setTimeout(() => {
      const mockResponses = [
        '這真是美好的回憶呢！春天的確是個充滿希望的季節。您最喜歡春天的什麼呢？',
        '家人的陪伴總是最溫暖的。要不要跟我分享一些和家人的美好回憶？',
        '當然可以！我來為您播放一些經典老歌。您有特別喜歡的歌手嗎？',
        '過年真是充滿歡樂的時光！您還記得最喜歡的年菜是什麼嗎？'
      ];

      const response = mockResponses[Math.floor(Math.random() * mockResponses.length)];
      
      const newConversation: Conversation = {
        id: generateId(),
        patient_id: '1',
        transcript: text,
        detected_language: 'zh-TW',
        ai_response: response,
        conversation_type: 'casual',
        emotion_analysis: {
          primary_emotion: '懷舊',
          confidence: 0.85,
          sentiment: 'positive'
        },
        duration: 30,
        created_date: new Date().toISOString(),
        updated_date: new Date().toISOString()
      };

      addConversation(newConversation);
      setIsProcessing(false);
      setCurrentTranscript('');
      
      // Play AI response (mock)
      playAIResponse(response);
    }, 2000);
  };

  const playAIResponse = (text: string) => {
    // In a real app, this would use text-to-speech
    console.log('Playing AI response:', text);
  };

  const handleSendMessage = () => {
    if (inputText.trim()) {
      processUserInput(inputText);
      setInputText('');
    }
  };

  const handleActivitySelect = (activity: string) => {
    setSelectedActivity(activity);
    const activityPrompts: Record<string, string> = {
      music: '讓我們來聽一些懷舊的歌曲吧！您想聽台語老歌還是國語經典呢？',
      photos: '看照片是回憶美好時光的好方法。您有什麼特別的照片想分享嗎？',
      stories: '我知道很多有趣的節慶故事。您想聽哪個節日的故事呢？',
      meditation: '讓我們一起放鬆心情。深呼吸，感受當下的寧靜...'
    };
    
    processUserInput(activityPrompts[activity] || '');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <GlassCard>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold gradient-text">AI 陪伴 - 小雨</h1>
            <p className="text-gray-600">我是您的數位陪伴夥伴，隨時在這裡陪您聊天</p>
          </div>
          <Sparkles className="w-8 h-8 text-purple-500 animate-pulse-slow" />
        </div>
      </GlassCard>

      {/* Emotional Support Activities */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {emotionalActivities.map((activity) => (
          <button
            key={activity.value}
            onClick={() => handleActivitySelect(activity.value)}
            className={`glass-button flex flex-col items-center gap-2 py-3 ${
              selectedActivity === activity.value ? 'ring-2 ring-purple-400' : ''
            }`}
          >
            <activity.icon className="w-6 h-6 text-purple-600" />
            <span className="text-sm">{activity.label}</span>
          </button>
        ))}
      </div>

      {/* Conversation History */}
      <GlassCard className="h-96 overflow-y-auto">
        <div className="space-y-4">
          <AnimatePresence>
            {conversations.map((conv) => (
              <motion.div
                key={conv.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-3"
              >
                {/* User message */}
                <div className="flex justify-end">
                  <div className="max-w-xs lg:max-w-md">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl rounded-tr-none px-4 py-3">
                      <p>{conv.transcript}</p>
                    </div>
                    <div className="flex items-center justify-end gap-2 mt-1 text-xs text-gray-500">
                      {conv.emotion_analysis && (
                        <span>{getEmotionEmoji(conv.emotion_analysis.primary_emotion)}</span>
                      )}
                      <span>{formatTime(conv.created_date)}</span>
                    </div>
                  </div>
                </div>

                {/* AI response */}
                <div className="flex justify-start">
                  <div className="max-w-xs lg:max-w-md">
                    <div className="bg-white/50 backdrop-blur-sm rounded-2xl rounded-tl-none px-4 py-3">
                      <p>{conv.ai_response}</p>
                    </div>
                    <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                      <span>小雨</span>
                      <Volume2 className="w-3 h-3" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {isProcessing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="bg-white/50 backdrop-blur-sm rounded-2xl px-4 py-3">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce animation-delay-2000"></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce animation-delay-4000"></span>
                </div>
              </div>
            </motion.div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </GlassCard>

      {/* Input Area */}
      <GlassCard>
        <div className="flex items-center gap-3">
          <button
            onClick={isRecording ? stopRecording : startRecording}
            className={`p-3 rounded-full transition-all duration-300 ${
              isRecording 
                ? 'bg-red-500 text-white animate-pulse' 
                : 'glass-button hover:bg-purple-100'
            }`}
          >
            {isRecording ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
          </button>
          
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder={isRecording ? "正在錄音..." : "輸入訊息或點擊麥克風說話..."}
            className="flex-1 glass-input"
            disabled={isRecording || isProcessing}
          />
          
          <button
            onClick={handleSendMessage}
            disabled={!inputText.trim() || isProcessing}
            className="p-3 rounded-full glass-button hover:bg-purple-100 disabled:opacity-50"
          >
            <Send className="w-6 h-6" />
          </button>
        </div>
        
        {currentTranscript && (
          <div className="mt-3 p-3 bg-white/20 rounded-lg">
            <p className="text-sm text-gray-600">識別內容：{currentTranscript}</p>
          </div>
        )}
      </GlassCard>
    </div>
  );
};

export default AICompanion;