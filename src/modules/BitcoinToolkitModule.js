import React, { useState } from 'react';
import { useProgress } from '../contexts/ProgressContext';
import { Key, CheckCircle, Trophy } from 'lucide-react';
import '../components/ModuleCommon.css';
import SeedLab from '../components/SeedLab';
import KeyDerivationLab from '../components/KeyDerivationLab';
import AddressCreationLab from '../components/AddressCreationLab';
import TransactionBuilderLab from '../components/TransactionBuilderLab';

const BitcoinToolkitModule = () => {
  const { completeModule, isModuleCompleted } = useProgress();
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(new Set());

  const steps = [
    {
      id: 'seed-lab',
      title: "🗝️ Seed & Wallet Creation Lab",
      type: "interactive-lab",
      component: <div className="white-bg"><SeedLab onComplete={() => handleStepComplete(0)} /></div>
    },
    {
      id: 'key-derivation-lab',
      title: "🔐 Key Derivation Lab",
      type: "interactive-lab",
      component: <div className="white-bg"><KeyDerivationLab onComplete={() => handleStepComplete(1)} /></div>
    },
    {
      id: 'address-creation-lab',
      title: "📬 Address Creation Lab",
      type: "interactive-lab",
      component: <div className="white-bg"><AddressCreationLab onComplete={() => handleStepComplete(2)} /></div>
    },
    {
      id: 'transaction-builder-lab',
      title: "💸 Transaction Builder Lab",
      type: "interactive-lab",
      component: <div className="white-bg"><TransactionBuilderLab onComplete={() => handleStepComplete(3)} /></div>
    },
    {
      id: 'sign-broadcast',
      title: "✒️ Sign & Broadcast",
      type: "interactive-demo",
      content: {
        title: "Sign & Verify",
        description: "Use your private key to sign transactions and prove ownership."
      }
    },
    {
      id: 'visualizer',
      title: "📡 Live Visualizer",
      type: "interactive-demo",
      content: {
        title: "Watch Transactions Flow",
        description: "See how transactions move through the Bitcoin network."
      }
    },
    {
      id: 'compression',
      title: "🗜️ Format & Compression Explorer",
      type: "interactive-demo",
      content: {
        title: "Data Formats Deep Dive",
        description: "Explore how Bitcoin data is compressed and formatted."
      }
    }
  ];

  const handleStepComplete = (stepIndex) => {
    const newCompletedSteps = new Set(completedSteps);
    newCompletedSteps.add(stepIndex);
    setCompletedSteps(newCompletedSteps);

    if (newCompletedSteps.size === steps.length) {
      completeModule('bitcoin-toolkit');
    }
  };

  const renderStep = (step, index) => {
    switch (step.type) {
      case 'interactive-lab':
        if (step.id === 'seed-lab') {
          return (
            <div className="step-content lab-step">
              <h2>{step.content.title}</h2>
              <p className="step-description">{step.content.description}</p>
              {step.component}
            </div>
          );
        }
        if (step.id === 'transaction-builder-lab') {
          return (
            <div className="step-content lab-step">
              <h2>{step.content.title}</h2>
              <p className="step-description">{step.content.description}</p>
              {step.component}
            </div>
          );
        }
        return (
          <div className="step-content lab-step">
            <h2>{step.content.title}</h2>
            <p className="step-description">{step.content.description}</p>
            {/* Lab-specific components will be added here */}
            <button 
              className="continue-button"
              onClick={() => handleStepComplete(index)}
            >
              Complete Lab
            </button>
          </div>
        );

      case 'interactive-demo':
        if (step.id === 'sign-broadcast') {
          return (
            <div className="step-content demo-step">
              <h2>{step.content.title}</h2>
              <p className="step-description">{step.content.description}</p>
              {/* Demo-specific components will be added here */}
              <button 
                className="continue-button"
                onClick={() => handleStepComplete(index)}
              >
                Continue
              </button>
            </div>
          );
        }
        return (
          <div className="step-content demo-step">
            <h2>{step.content.title}</h2>
            <p className="step-description">{step.content.description}</p>
            {/* Demo-specific components will be added here */}
            <button 
              className="continue-button"
              onClick={() => handleStepComplete(index)}
            >
              Continue
            </button>
          </div>
        );

      default:
        return <div>Unknown step type</div>;
    }
  };

  return (
    <div className="module-container">
      <div className="module-header">
        <h1 className="module-title">
          <Key className="module-icon" />
          Hands-On Bitcoin Toolkit
        </h1>
        {isModuleCompleted('bitcoin-toolkit') && (
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

      <div className="module-steps">
        <div className="steps-navigation">
          {steps.map((step, index) => (
            <button
              key={step.id}
              className={`step-nav-button ${currentStep === index ? 'active' : ''} ${completedSteps.has(index) ? 'completed' : ''}`}
              onClick={() => setCurrentStep(index)}
            >
              {completedSteps.has(index) && <CheckCircle size={16} />}
              {step.title}
            </button>
          ))}
        </div>

        <div className="step-content-container">
          {renderStep(steps[currentStep], currentStep)}
        </div>
      </div>
    </div>
  );
};

export default BitcoinToolkitModule; 