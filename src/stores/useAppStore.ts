import { create } from 'zustand';
import { Patient, Conversation, MemoryEntry, FamilyMember, CulturalContent, DashboardSummary } from '../types';

interface AppState {
  // Current user/patient
  currentPatient: Patient | null;
  setCurrentPatient: (patient: Patient | null) => void;
  
  // Conversations
  conversations: Conversation[];
  addConversation: (conversation: Conversation) => void;
  setConversations: (conversations: Conversation[]) => void;
  
  // Memory entries
  memories: MemoryEntry[];
  addMemory: (memory: MemoryEntry) => void;
  setMemories: (memories: MemoryEntry[]) => void;
  updateMemory: (id: string, updates: Partial<MemoryEntry>) => void;
  
  // Family members
  familyMembers: FamilyMember[];
  setFamilyMembers: (members: FamilyMember[]) => void;
  
  // Cultural content
  culturalContent: CulturalContent[];
  setCulturalContent: (content: CulturalContent[]) => void;
  
  // Dashboard
  dashboardSummary: DashboardSummary | null;
  setDashboardSummary: (summary: DashboardSummary) => void;
  
  // UI State
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
  
  // Voice recording state
  isRecording: boolean;
  setIsRecording: (recording: boolean) => void;
  currentTranscript: string;
  setCurrentTranscript: (transcript: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  // Current patient
  currentPatient: null,
  setCurrentPatient: (patient) => set({ currentPatient: patient }),
  
  // Conversations
  conversations: [],
  addConversation: (conversation) => 
    set((state) => ({ conversations: [conversation, ...state.conversations] })),
  setConversations: (conversations) => set({ conversations }),
  
  // Memory entries
  memories: [],
  addMemory: (memory) => 
    set((state) => ({ memories: [memory, ...state.memories] })),
  setMemories: (memories) => set({ memories }),
  updateMemory: (id, updates) =>
    set((state) => ({
      memories: state.memories.map((m) => (m.id === id ? { ...m, ...updates } : m))
    })),
  
  // Family members
  familyMembers: [],
  setFamilyMembers: (members) => set({ familyMembers: members }),
  
  // Cultural content
  culturalContent: [],
  setCulturalContent: (content) => set({ culturalContent: content }),
  
  // Dashboard
  dashboardSummary: null,
  setDashboardSummary: (summary) => set({ dashboardSummary: summary }),
  
  // UI State
  isLoading: false,
  setIsLoading: (loading) => set({ isLoading: loading }),
  error: null,
  setError: (error) => set({ error }),
  
  // Voice recording
  isRecording: false,
  setIsRecording: (recording) => set({ isRecording: recording }),
  currentTranscript: '',
  setCurrentTranscript: (transcript) => set({ currentTranscript: transcript }),
}))