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
      <div className="banking-demo-box">
        <div className="demo-content">
          <h2>Welcome to Your Bitcoin Journey:</h2>
          <p>
            Discover the hidden mechanics behind our monetary system through this interactive reality check that reveals what they don't teach you about money:
          </p>
          
          <div className="interactive-section">
            <div className="canva-embed-container">
              <div style={{
                position: 'relative',
                width: '100%',
                height: 0,
                paddingTop: '56.2500%',
                paddingBottom: 0,
                boxShadow: '0 2px 8px 0 rgba(63,69,81,0.16)',
                marginTop: '1.6em',
                marginBottom: '0.9em',
                overflow: 'hidden',
                borderRadius: '8px',
                willChange: 'transform'
              }}>
                <iframe 
                  loading="lazy" 
                  style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    top: 0,
                    left: 0,
                    border: 'none',
                    padding: 0,
                    margin: 0
                  }}
                  src="https://www.canva.com/design/DAGsyD129SI/zcetY7618dRB7JFrbhLITQ/view?embed"
                  allowFullScreen="allowfullscreen"
                  allow="fullscreen"
                  title="A Reality Check"
                />
              </div>
              <div className="canva-attribution">
                <a 
                  href="https://www.canva.com/design/DAGsyD129SI/zcetY7618dRB7JFrbhLITQ/view?utm_content=DAGsyD129SI&utm_campaign=designshare&utm_medium=embeds&utm_source=link"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="canva-link"
                >
                  A Reality Check
                </a>
                <span> by Dalia Platt</span>
              </div>
            </div>
            
            <div className="completion-container">
              <button 
                className={`completion-button ${hasExperienced ? 'completed' : ''}`}
                onClick={handleExperienceComplete}
                disabled={hasExperienced}
              >
                {hasExperienced ? '✓ Ready to Learn' : '✓ I understand the reality'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankingExperience; 