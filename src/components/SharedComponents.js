import React from 'react';
import { CheckCircle, ArrowRight, ArrowLeft } from 'lucide-react';

// Shared Progress Tracker Component
export const ProgressTracker = ({ currentStep, totalSteps, completedSteps, steps }) => {
  const progressPercentage = ((currentStep + 1) / totalSteps) * 100;
  
  return (
    <div className="progress-section">
      <div className="progress-bar">
        <div 
          className="progress-fill"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
      <span className="progress-text">
        Step {currentStep + 1} of {totalSteps}
      </span>
      
      {steps && (
        <div className="steps-navigation">
          {steps.map((step, index) => (
            <div 
              key={step.id}
              className={`step-indicator ${index === currentStep ? 'active' : ''} ${completedSteps.has(index) ? 'completed' : ''}`}
            >
              <div className="step-number">{index + 1}</div>
              <div className="step-title">{step.title}</div>
              {completedSteps.has(index) && <CheckCircle className="w-4 h-4 text-green-500" />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Shared Module Header Component
export const ModuleHeader = ({ title, description, icon: Icon, progress }) => {
  return (
    <div className="module-header">
      <div className="header-content">
        {Icon && <Icon className="module-icon" size={48} />}
        <div className="header-text">
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
      </div>
      {progress && progress}
    </div>
  );
};

// Shared Navigation Controls
export const NavigationControls = ({ currentStep, totalSteps, onBack, onNext, onHome, completedSteps }) => {
  return (
    <div className="module-controls">
      {currentStep > 0 && (
        <button onClick={onBack} className="navigation-button secondary">
          <ArrowLeft size={20} />
          Previous
        </button>
      )}
      
      <div className="control-spacer" />
      
      {onHome && (
        <button onClick={onHome} className="navigation-button home">
          Return to Homepage
        </button>
      )}
      
      {currentStep < totalSteps - 1 && completedSteps.has(currentStep) && (
        <button onClick={onNext} className="navigation-button primary">
          Next
          <ArrowRight size={20} />
        </button>
      )}
    </div>
  );
};

// Shared Insight Card Component
export const InsightCard = ({ icon: Icon, title, description, className = "" }) => {
  return (
    <div className={`insight-card ${className}`}>
      {Icon && <Icon className="w-6 h-6" />}
      <div>
        <h4>{title}</h4>
        <p>{description}</p>
      </div>
    </div>
  );
};

// Shared Challenge Component
export const ChallengeCard = ({ question, options, onAnswer, userAnswer, correctAnswer, explanation }) => {
  return (
    <div className="challenge-card">
      <h4>{question}</h4>
      
      {!userAnswer && (
        <div className="challenge-options">
          {options.map((option, index) => (
            <button
              key={index}
              className="challenge-option"
              onClick={() => onAnswer(option)}
            >
              {option}
            </button>
          ))}
        </div>
      )}
      
      {userAnswer && (
        <div className="challenge-result">
          <p><strong>Your answer:</strong> {userAnswer}</p>
          {correctAnswer && (
            <p className={userAnswer === correctAnswer ? 'correct' : 'incorrect'}>
              {userAnswer === correctAnswer ? '✅ Correct!' : `❌ Correct answer: ${correctAnswer}`}
            </p>
          )}
          {explanation && (
            <div className="explanation">
              <p><strong>Explanation:</strong> {explanation}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Shared Error Boundary Component
export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Module Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>Something went wrong</h2>
          <p>This module encountered an error. Please refresh the page to try again.</p>
          <button onClick={() => window.location.reload()}>
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Shared Loading Component
export const LoadingSpinner = ({ message = "Loading..." }) => {
  return (
    <div className="loading-spinner">
      <div className="spinner"></div>
      <p>{message}</p>
    </div>
  );
};

// Shared Success Message Component
export const SuccessMessage = ({ title, message, onContinue }) => {
  return (
    <div className="success-message">
      <CheckCircle className="w-8 h-8 text-green-500" />
      <h3>{title}</h3>
      <p>{message}</p>
      {onContinue && (
        <button onClick={onContinue} className="continue-button">
          Continue
        </button>
      )}
    </div>
  );
};

// Interactive Feedback Component
export const FeedbackMessage = ({ type, message, onDismiss, autoHide = true }) => {
  React.useEffect(() => {
    if (autoHide) {
      const timer = setTimeout(() => {
        onDismiss && onDismiss();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [autoHide, onDismiss]);

  const iconMap = {
    success: <CheckCircle className="w-5 h-5 text-green-500" />,
    error: <AlertCircle className="w-5 h-5 text-red-500" />,
    info: <Info className="w-5 h-5 text-blue-500" />,
    warning: <AlertTriangle className="w-5 h-5 text-yellow-500" />
  };

  return (
    <div className={`feedback-message ${type}`}>
      {iconMap[type]}
      <span>{message}</span>
      {onDismiss && (
        <button onClick={onDismiss} className="dismiss-button">
          ×
        </button>
      )}
    </div>
  );
};

// Progress Animation Component
export const ProgressAnimation = ({ progress, total, message }) => {
  const percentage = (progress / total) * 100;
  
  return (
    <div className="progress-animation">
      <div className="progress-message">{message}</div>
      <div className="progress-bar">
        <div 
          className="progress-fill animated" 
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="progress-text">{progress} / {total}</div>
    </div>
  );
};

// Interactive Tooltip Component
export const Tooltip = ({ children, content, position = 'top' }) => {
  const [isVisible, setIsVisible] = React.useState(false);
  
  return (
    <div 
      className="tooltip-container"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div className={`tooltip ${position}`}>
          {content}
        </div>
      )}
    </div>
  );
};
