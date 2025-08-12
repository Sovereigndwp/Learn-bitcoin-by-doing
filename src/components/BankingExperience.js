import React, { useState } from 'react';
import { useProgress } from '../contexts/ProgressContext';
import { ActionButton } from './ui/UnifiedButton';
import './BankingExperience.css';

const BankingExperience = () => {
  const [hasExperienced, setHasExperienced] = useState(false);
  const { completeModule } = useProgress();

  const handleExperienceComplete = () => {
    setHasExperienced(true);
    // Mark a special "banking-intro" completion
    completeModule('banking-intro');
  };

  return (
    <div className="reality-check-container">
      <div className="reality-check-card">
        <div className="reality-check-content">
          <h2 className="reality-check-title">Welcome to Your Bitcoin Journey</h2>
          <p className="reality-check-description">
            Discover the hidden mechanics behind our monetary system through this interactive reality check that reveals what they don't teach you about money:
          </p>
          
          <div className="embed-section">
            <div className="video-embed-container">
              <div className="iframe-wrapper" style={{
                position: 'relative',
                width: '100%',
                height: 0,
                paddingTop: '56.25%',
                paddingBottom: 0,
                overflow: 'hidden',
                borderRadius: 'var(--radius-lg)',
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
              <div className="embed-attribution">
                <a 
                  href="https://www.canva.com/design/DAGsyD129SI/zcetY7618dRB7JFrbhLITQ/view?utm_content=DAGsyD129SI&utm_campaign=designshare&utm_medium=embeds&utm_source=link"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="embed-link"
                >
                  A Reality Check
                </a>
                <span> by Dalia Platt</span>
              </div>
            </div>
            
            <div className="completion-section">
              <ActionButton 
                onClick={handleExperienceComplete}
                disabled={hasExperienced}
                variant={hasExperienced ? "success" : "primary"}
                size="lg"
                className="reality-check-button"
                feedback="visual"
              >
                {hasExperienced ? '✓ Ready to Learn' : '✓ I understand the reality'}
              </ActionButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankingExperience; 