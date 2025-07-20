import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '../contexts/ProgressContext';
import './UniversalModuleBase.css';

const UniversalModuleBase = ({
  moduleId,
  title,
  subtitle,
  icon: IconComponent,
  steps,
  currentStep = 0,
  completedSteps = new Set(),
  onStepComplete,
  onStepChange,
  children,
  resetProgressCallback,
  customProgress = null
}) => {
  const { completeModule } = useProgress();
  const navigate = useNavigate();

  const handleResetProgress = () => {
    if (resetProgressCallback) {
      resetProgressCallback();
    }
    // Default reset behavior
    localStorage.removeItem(`${moduleId}CompletedSteps`);
  };

  const handleModuleComplete = () => {
    completeModule(moduleId);
    setTimeout(() => navigate('/'), 2000);
  };

  return (
    <div className="universal-module">
      {/* HERO SECTION - Standardized across all modules */}
      <div className="card-hero module-hero-section">
        <div className="hero-icon">
          {IconComponent && <IconComponent className="module-main-icon" />}
        </div>
        <div className="hero-content">
          <h1 className="heading-critical">{title}</h1>
          <p className="module-subtitle">{subtitle}</p>
        </div>
      </div>

      {/* PROGRESS SECTION - Unified design */}
      <div className="card-feature progress-section">
        <div className="progress-header">
          <h2 className="heading-high">Your Progress</h2>
          <div className="progress-stats">
            <span className="completion-badge">
              {completedSteps.size} / {steps.length} Completed
            </span>
            <span className="progress-percentage">
              {Math.round((completedSteps.size / steps.length) * 100)}%
            </span>
          </div>
        </div>

        {/* Visual Progress Bar */}
        <div className="progress-visual">
          <div className="progress-track">
            <div 
              className="progress-fill-enhanced"
              style={{ width: `${(completedSteps.size / steps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Progress Utilities */}
        <div className="progress-utilities">
          <button className="utility-button reset-button" onClick={handleResetProgress}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <polyline points="23 4 23 10 17 10"></polyline>
              <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
            </svg>
            Reset Progress
          </button>
        </div>
      </div>

      {/* NAVIGATION SECTION - Horizontal scrollable steps */}
      <div className="card-content navigation-section">
        <h3 className="heading-medium">Learning Path</h3>
        <div className="step-navigation-container">
          <div className="step-navigation-scroll">
            {steps.map((step, index) => (
              <button
                key={index}
                className={`step-nav-button ${
                  index === currentStep ? 'current' : ''
                } ${completedSteps.has(index) ? 'completed' : ''}`}
                onClick={() => onStepChange && onStepChange(index)}
              >
                <span className="step-nav-number">
                  {completedSteps.has(index) ? '✓' : index + 1}
                </span>
                <span className="step-nav-label">{step.title}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* CONTENT SECTION - Where individual module content renders */}
      <div className="module-content-area">
        {children}
      </div>
    </div>
  );
};

export default UniversalModuleBase;
