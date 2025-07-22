import React, { useState, useEffect } from 'react';
import { ChevronRight, Lock, CheckCircle } from 'lucide-react';
import { Button } from './UnifiedButton';
import ModuleCard from './ModuleCard';
import './ProgressiveContent.css';

/**
 * Progressive Content Display System
 * Reveals content step by step as students advance through learning path
 */
const ProgressiveContent = ({
  children,
  unlockCondition,
  unlockMessage = 'Complete the previous steps to unlock this content',
  isUnlocked = false,
  showPreview = true,
  onUnlock,
  className = ''
}) => {
  const [revealed, setRevealed] = useState(isUnlocked);

  useEffect(() => {
    if (isUnlocked && !revealed) {
      setRevealed(true);
      if (onUnlock) onUnlock();
    }
  }, [isUnlocked, revealed, onUnlock]);

  if (!revealed && !showPreview) {
    return null;
  }

  return (
    <div className={`progressive-content ${revealed ? 'unlocked' : 'locked'} ${className}`}>
      {!revealed && (
        <div className="progressive-content__overlay">
          <div className="progressive-content__lock">
            <Lock size={32} />
            <p>{unlockMessage}</p>
          </div>
        </div>
      )}
      
      <div className={`progressive-content__body ${!revealed ? 'blurred' : ''}`}>
        {children}
      </div>
      
      {revealed && (
        <div className="progressive-content__unlocked">
          <CheckCircle size={16} />
          <span>Content Unlocked!</span>
        </div>
      )}
    </div>
  );
};

/**
 * Step-by-step content reveal system
 */
export const StepByStepContent = ({
  steps,
  currentStep = 0,
  onStepComplete,
  className = ''
}) => {
  const [completedSteps, setCompletedSteps] = useState(new Set());
  const [activeStep, setActiveStep] = useState(currentStep);

  const handleStepComplete = (stepIndex) => {
    const newCompleted = new Set(completedSteps);
    newCompleted.add(stepIndex);
    setCompletedSteps(newCompleted);
    
    if (stepIndex === activeStep && stepIndex < steps.length - 1) {
      setActiveStep(stepIndex + 1);
    }
    
    if (onStepComplete) {
      onStepComplete(stepIndex, newCompleted);
    }
  };

  return (
    <div className={`step-by-step-content ${className}`}>
      <div className="step-progress">
        {steps.map((_, index) => (
          <div
            key={index}
            className={`step-indicator ${
              completedSteps.has(index) ? 'completed' :
              index === activeStep ? 'active' :
              index < activeStep ? 'available' : 'locked'
            }`}
          >
            {completedSteps.has(index) ? (
              <CheckCircle size={20} />
            ) : (
              <span>{index + 1}</span>
            )}
          </div>
        ))}
      </div>
      
      <div className="steps-container">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`step-content ${
              index <= activeStep ? 'visible' : 'hidden'
            } ${completedSteps.has(index) ? 'completed' : ''}`}
          >
            {step.component || step.content}
            
            {index === activeStep && !completedSteps.has(index) && (
              <Button
                onClick={() => handleStepComplete(index)}
                className="step-complete-btn"
              >
                {step.completeText || 'Continue'}
                <ChevronRight size={16} />
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * Expandable content sections with controlled reveal
 */
export const ExpandableSection = ({
  title,
  children,
  defaultExpanded = false,
  unlockCondition = true,
  previewLines = 2,
  className = ''
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const [canExpand, setCanExpand] = useState(unlockCondition);

  useEffect(() => {
    setCanExpand(unlockCondition);
  }, [unlockCondition]);

  return (
    <ModuleCard className={`expandable-section ${className}`}>
      <div className="expandable-section__header">
        <h3>{title}</h3>
        {canExpand ? (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            icon={<ChevronRight size={16} className={isExpanded ? 'rotated' : ''} />}
          >
            {isExpanded ? 'Collapse' : 'Expand'}
          </Button>
        ) : (
          <Lock size={20} className="section-locked" />
        )}
      </div>
      
      <div className={`expandable-section__content ${
        isExpanded ? 'expanded' : 'collapsed'
      } ${!canExpand ? 'locked' : ''}`}>
        {canExpand ? children : (
          <div className="preview-content">
            <p>Complete previous sections to unlock this content...</p>
          </div>
        )}
      </div>
    </ModuleCard>
  );
};

/**
 * Knowledge Gate - blocks content until prerequisites are met
 */
export const KnowledgeGate = ({
  children,
  prerequisites = [],
  completedPrereqs = [],
  gateMessage,
  showProgress = true,
  className = ''
}) => {
  const isUnlocked = prerequisites.every(prereq => completedPrereqs.includes(prereq));
  const progress = prerequisites.length > 0 ? (completedPrereqs.filter(p => prerequisites.includes(p)).length / prerequisites.length) * 100 : 100;

  if (!isUnlocked) {
    return (
      <ModuleCard className={`knowledge-gate locked ${className}`}>
        <div className="gate-content">
          <Lock size={48} className="gate-icon" />
          <h3>Knowledge Gate</h3>
          <p>{gateMessage || 'Complete the following to unlock this content:'}</p>
          
          <ul className="prerequisites-list">
            {prerequisites.map((prereq, index) => (
              <li key={index} className={completedPrereqs.includes(prereq) ? 'completed' : 'pending'}>
                {completedPrereqs.includes(prereq) ? (
                  <CheckCircle size={16} />
                ) : (
                  <Lock size={16} />
                )}
                {prereq}
              </li>
            ))}
          </ul>
          
          {showProgress && (
            <div className="gate-progress">
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${progress}%` }} />
              </div>
              <span className="progress-text">{Math.round(progress)}% Complete</span>
            </div>
          )}
        </div>
      </ModuleCard>
    );
  }

  return (
    <div className={`knowledge-gate unlocked ${className}`}>
      {children}
    </div>
  );
};

export default ProgressiveContent;
