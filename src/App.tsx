import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import AICompanion from './pages/AICompanion';
import MemoryJournal from './pages/MemoryJournal';
import FamilyConnection from './pages/FamilyConnection';
import CulturalContent from './pages/CulturalContent';
import EmotionTracking from './pages/EmotionTracking';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="companion" element={<AICompanion />} />
          <Route path="memories" element={<MemoryJournal />} />
          <Route path="family" element={<FamilyConnection />} />
          <Route path="culture" element={<CulturalContent />} />
          <Route path="emotions" element={<EmotionTracking />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;