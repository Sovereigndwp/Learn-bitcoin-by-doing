import React, { useState } from 'react';
import { useProgress } from '../contexts/ProgressContext';
import './BankingExperience.css';

const BankingExperience = () => {
  const [hasExperienced, setHasExperienced] = useState(false);
  const { completeModule, isModuleCompleted } = useProgress();

  const handleExperienceComplete = () => {
    setHasExperienced(true);
    // Mark a special "banking-intro" completion
    completeModule('banking-intro');
  };

  return (
    <div className="banking-experience-section">
      <div className="experience-container">
        <div className="banking-demo-box">
          <div className="demo-content">
            <h2>Before We Begin:</h2>
            <p>
              Try these real scenarios that millions face daily:
            </p>
            
            <div className="interactive-section">
              <div className="launch-container">
                <a
                  href="https://layer-d.my.canva.site/traditional-banking-decoded-by-dalia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="interactive-demo-link"
                >
                  🏦 Launch Banking Reality Check
                </a>
              </div>
              
              <div className="completion-container">
                <button 
                  className={`completion-button ${hasExperienced ? 'completed' : ''}`}
                  onClick={handleExperienceComplete}
                  disabled={hasExperienced}
                >
                  {hasExperienced ? '✓ Done' : '✓ I\'ve seen the friction'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankingExperience; 