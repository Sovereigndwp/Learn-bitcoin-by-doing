import React, { useState, useEffect } from 'react';
import { useProgress } from '../../contexts/ProgressContext';
import './ProgressCounter.css';

/**
 * Unified Progress Counter Component
 * Provides consistent progress tracking across all modules
 */

// Main ProgressCounter Component
const ProgressCounter = ({
  moduleId,
  totalSteps = 0,
  currentStep = 0,
  variant = 'default',
  size = 'md',
  showPercentage = true,
  showSteps = true,
  showLabel = true,
  animated = true,
  className = '',
  onStepComplete,
  disabled = false,
  ...props
}) => {
  const { getModuleProgress, completeModule } = useProgress();
  const [animatedProgress, setAnimatedProgress] = useState(0);
  
  // Use provided step values directly (simplified for now)
  const percentage = totalSteps > 0 ? Math.round((currentStep / totalSteps) * 100) : 0;
  
  // Animate progress changes
  useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => {
        setAnimatedProgress(percentage);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setAnimatedProgress(percentage);
    }
  }, [percentage, animated]);
  
  // Handle step completion
  const handleStepComplete = () => {
    if (disabled || currentStep >= totalSteps) return;
    
    const newStep = currentStep + 1;
    
    if (onStepComplete) {
      onStepComplete(newStep, totalSteps);
    }
  };
  
  const baseClasses = [
    'progress-counter',
    `progress-counter--${variant}`,
    `progress-counter--${size}`,
    disabled && 'progress-counter--disabled',
    className
  ].filter(Boolean).join(' ');
  
  return (
    <div className={baseClasses} {...props}>
      {showLabel && (
        <div className="progress-counter__label">
          Progress
        </div>
      )}
      
      <div className="progress-counter__container">
        <div className="progress-counter__track">
          <div 
            className="progress-counter__fill"
            style={{ width: `${animatedProgress}%` }}
          />
        </div>
        
        <div className="progress-counter__info">
          {showSteps && (
            <span className="progress-counter__steps">
              {currentStep}/{totalSteps}
            </span>
          )}
          
          {showPercentage && (
            <span className="progress-counter__percentage">
              {percentage}%
            </span>
          )}
        </div>
      </div>
      
      {currentStep < totalSteps && !disabled && (
        <button 
          className="progress-counter__next-btn"
          onClick={handleStepComplete}
          aria-label="Complete next step"
        >
          Next Step
        </button>
      )}
    </div>
  );
};

// Circular Progress Counter
const CircularProgressCounter = ({
  moduleId,
  totalSteps = 0,
  currentStep = 0,
  size = 100,
  strokeWidth = 8,
  showPercentage = true,
  className = '',
  ...props
}) => {
  const percentage = totalSteps > 0 ? (currentStep / totalSteps) * 100 : 0;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;
  
  return (
    <div className={`circular-progress-counter ${className}`} {...props}>
      <svg width={size} height={size} className="circular-progress-counter__svg">
        <circle
          className="circular-progress-counter__track"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          className="circular-progress-counter__fill"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: offset,
            transform: 'rotate(-90deg)',
            transformOrigin: '50% 50%',
          }}
        />
      </svg>
      
      {showPercentage && (
        <div className="circular-progress-counter__text">
          <span className="circular-progress-counter__percentage">
            {Math.round(percentage)}%
          </span>
        </div>
      )}
    </div>
  );
};

// Mini Progress Counter for inline use
const MiniProgressCounter = ({
  moduleId,
  totalSteps = 0,
  currentStep = 0,
  className = '',
  ...props
}) => {
  const percentage = totalSteps > 0 ? (currentStep / totalSteps) * 100 : 0;
  
  return (
    <div className={`mini-progress-counter ${className}`} {...props}>
      <div className="mini-progress-counter__track">
        <div 
          className="mini-progress-counter__fill"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="mini-progress-counter__text">
        {currentStep}/{totalSteps}
      </span>
    </div>
  );
};

// Step-by-Step Progress Counter with individual step indicators
const StepProgressCounter = ({
  moduleId,
  totalSteps = 0,
  currentStep = 0,
  stepLabels = [],
  variant = 'dots',
  className = '',
  onStepClick,
  disabled = false,
  ...props
}) => {
  const steps = Array.from({ length: totalSteps }, (_, index) => ({
    number: index + 1,
    completed: index < currentStep,
    current: index === currentStep - 1,
    label: stepLabels[index] || `Step ${index + 1}`
  }));
  
  const handleStepClick = (stepNumber) => {
    if (disabled || !onStepClick) return;
    onStepClick(stepNumber);
  };
  
  return (
    <div className={`step-progress-counter step-progress-counter--${variant} ${className}`} {...props}>
      {steps.map((step, index) => (
        <div 
          key={step.number}
          className={[
            'step-progress-counter__step',
            step.completed && 'step-progress-counter__step--completed',
            step.current && 'step-progress-counter__step--current',
            disabled && 'step-progress-counter__step--disabled'
          ].filter(Boolean).join(' ')}
          onClick={() => handleStepClick(step.number)}
        >
          {variant === 'dots' && (
            <div className="step-progress-counter__dot">
              {step.completed ? '✓' : step.number}
            </div>
          )}
          
          {variant === 'numbers' && (
            <div className="step-progress-counter__number">
              {step.number}
            </div>
          )}
          
          {variant === 'labels' && (
            <div className="step-progress-counter__label-container">
              <div className="step-progress-counter__dot">
                {step.completed ? '✓' : step.number}
              </div>
              <span className="step-progress-counter__label">
                {step.label}
              </span>
            </div>
          )}
          
          {index < steps.length - 1 && (
            <div className="step-progress-counter__connector" />
          )}
        </div>
      ))}
    </div>
  );
};

// Module Summary Progress - shows overall module completion
const ModuleProgressSummary = ({
  modules = [],
  className = '',
  ...props
}) => {
  const { isModuleCompleted } = useProgress();
  
  const moduleStats = modules.map(moduleId => {
    const completed = isModuleCompleted(moduleId);
    const percentage = completed ? 100 : 0;
    
    return {
      id: moduleId,
      completed,
      percentage,
      currentStep: completed ? 1 : 0,
      totalSteps: 1
    };
  });
  
  const overallProgress = moduleStats.length > 0 
    ? Math.round(moduleStats.reduce((sum, mod) => sum + mod.percentage, 0) / moduleStats.length)
    : 0;
  
  const completedModules = moduleStats.filter(mod => mod.completed).length;
  
  return (
    <div className={`module-progress-summary ${className}`} {...props}>
      <div className="module-progress-summary__header">
        <h3 className="module-progress-summary__title">Overall Progress</h3>
        <span className="module-progress-summary__stats">
          {completedModules}/{modules.length} modules completed
        </span>
      </div>
      
      <div className="module-progress-summary__overall">
        <div className="module-progress-summary__track">
          <div 
            className="module-progress-summary__fill"
            style={{ width: `${overallProgress}%` }}
          />
        </div>
        <span className="module-progress-summary__percentage">
          {overallProgress}%
        </span>
      </div>
      
      <div className="module-progress-summary__modules">
        {moduleStats.map(module => (
          <div key={module.id} className="module-progress-summary__module">
            <span className="module-progress-summary__module-name">
              {module.id.replace(/([A-Z])/g, ' $1').trim()}
            </span>
            <MiniProgressCounter
              totalSteps={module.totalSteps}
              currentStep={module.currentStep}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

// Export all components
export default ProgressCounter;
export {
  CircularProgressCounter,
  MiniProgressCounter,
  StepProgressCounter,
  ModuleProgressSummary
};
