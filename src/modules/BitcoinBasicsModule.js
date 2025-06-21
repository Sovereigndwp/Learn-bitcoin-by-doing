import React, { useState } from 'react';
import { useProgress } from '../contexts/ProgressContext';
import { Bitcoin, CheckCircle, Trophy } from 'lucide-react';
import '../components/ModuleCommon.css';

const BitcoinBasicsModule = () => {
  const { completeModule } = useProgress();
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(new Set());

  const handleStepComplete = (index) => {
    setCompletedSteps(prev => new Set(prev).add(index));
    if (index === steps.length - 1) {
      completeModule('bitcoin-basics');
    }
    setCurrentStep(index + 1);
  };

  const steps = [
    {
      title: "Introduction",
      type: "intro",
      content: {
        title: "Welcome to Bitcoin Basics",
        text: "Before we dive into the technical details, let's understand what Bitcoin really is and why it matters.\n\nBitcoin is more than just digital money - it's a revolutionary technology that combines cryptography, computer science, and economics to create the world's first truly decentralized digital currency.\n\nIn this module, you'll learn:\n\n1. What problems Bitcoin solves\n2. How Bitcoin works at a high level\n3. Why Bitcoin is different from traditional money\n4. The key innovations that make Bitcoin possible"
      }
    }
  ];

  const renderStep = (step, index) => {
    if (!step) return null;

    switch (step.type) {
      case 'intro':
        return (
          <div className="step-content intro-step">
            <div className="step-icon">
              <Bitcoin size={48} />
            </div>
            <h2>{step.content.title}</h2>
            <p className="intro-text">{step.content.text}</p>
            <button 
              className="continue-button"
              onClick={() => handleStepComplete(index)}
            >
              Start Learning
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="module-container">
      <div className="module-header">
        <h1 className="module-title">
          <Bitcoin className="module-icon" />
          Bitcoin Basics
        </h1>
        {completedSteps.size === steps.length && (
          <div className="completion-badge">
            <Trophy size={24} />
            Completed!
          </div>
        )}
      </div>

      <div className="module-progress">
        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ width: `${(completedSteps.size / steps.length) * 100}%` }}
          />
        </div>
        <span className="progress-text">
          {completedSteps.size} / {steps.length} steps completed
        </span>
      </div>

      <div className="module-content">
        {currentStep < steps.length ? (
          renderStep(steps[currentStep], currentStep)
        ) : (
          <div className="module-complete">
            <div className="complete-icon">
              <CheckCircle size={48} />
            </div>
            <h2>Module Complete!</h2>
            <p>You've completed the Bitcoin Basics module. Ready to dive deeper?</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BitcoinBasicsModule; 