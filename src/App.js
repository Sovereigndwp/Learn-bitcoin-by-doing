import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ProgressProvider } from './contexts/ProgressContext';
import { NotificationProvider } from './components/NotificationSystem';
import { LanguageProvider } from './contexts/LanguageContext';
import Homepage from './components/Homepage';
import ModuleLayout from './components/ModuleLayout';
import AboutMe from './components/AboutMe';
import './styles/globalTheme.css';
import './styles/hierarchicalSystem.css'; /* Professional visual hierarchy system */
import './styles/modernComponents.css';
import './styles/modernInteractions.css';
import './components/EnhancedButtons.css';
import './components/NotificationSystem.css';
import './App.css';

/* GlobalContrast.css MUST be imported last to override everything */
import './styles/GlobalContrast.css';

// Import unified navigation components
import ModulePage from './components/ModulePage';
import LessonView from './components/LessonView';

function App() {
  return (
    <LanguageProvider>
      <ProgressProvider>
        <NotificationProvider>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/about" element={<ModuleLayout><AboutMe /></ModuleLayout>} />
              
              {/* Module overview pages */}
              <Route path="/module/:moduleId" element={<ModuleLayout><ModulePage /></ModuleLayout>} />
              
              {/* Unified lesson view pages - all modules use the same navigation system */}
              <Route path="/module/:moduleId/:lessonId/:viewId" element={<ModuleLayout><LessonView /></ModuleLayout>} />
            </Routes>
          </div>
        </Router>
        </NotificationProvider>
      </ProgressProvider>
    </LanguageProvider>
  );
}

export default App;
