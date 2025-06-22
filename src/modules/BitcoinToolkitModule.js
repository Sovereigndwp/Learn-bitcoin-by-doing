import React, { useState } from 'react';
import { useProgress } from '../contexts/ProgressContext';
import { Key, Lock, Send, ChartBar, CheckCircle, Trophy } from 'lucide-react';
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
      content: {
        title: "Create Your First Bitcoin Wallet",
        description: "Let's generate a secure seed phrase - the master key to your Bitcoin wallet.",
        steps: [
          "Generate a random 12-word mnemonic",
          "Learn how it becomes a seed",
          "Practice securing your seed phrase"
        ]
      }
    },
    {
      id: 'key-derivation',
      title: "🔐 Private Key → Public Key",
      type: "interactive-demo",
      content: {
        title: "Key Pair Generation",
        description: "Watch how a private key creates a public key through one-way mathematics."
      }
    },
    {
      id: 'address-creation',
      title: "📫 Address Creation",
      type: "interactive-demo",
      content: {
        title: "Create Bitcoin Addresses",
        description: "Transform public keys into different types of Bitcoin addresses."
      }
    },
    {
      id: 'transaction-builder',
      title: "🧩 Transaction Builder Lab",
      type: "interactive-lab",
      content: {
        title: "Build Your First Transaction",
        description: "Learn how Bitcoin transactions work by building one yourself."
      }
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

  const handleStepComplete = (index) => {
    setCompletedSteps(prev => new Set(prev).add(index));
    if (index === steps.length - 1) {
      completeModule('bitcoin-toolkit');
    }
    setCurrentStep(index + 1);
  };

  const renderStep = (step, index) => {
    switch (step.type) {
      case 'interactive-lab':
        if (step.id === 'seed-lab') {
          return (
            <div className="step-content lab-step">
              <h2>{step.content.title}</h2>
              <p className="step-description">{step.content.description}</p>
              <SeedLab onComplete={() => handleStepComplete(index)} />
            </div>
          );
        }
        if (step.id === 'transaction-builder') {
          return (
            <div className="step-content lab-step">
              <h2>{step.content.title}</h2>
              <p className="step-description">{step.content.description}</p>
              <TransactionBuilderLab onComplete={() => handleStepComplete(index)} />
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
        if (step.id === 'key-derivation') {
          return (
            <div className="step-content demo-step">
              <h2>{step.content.title}</h2>
              <p className="step-description">{step.content.description}</p>
              <KeyDerivationLab onComplete={() => handleStepComplete(index)} />
            </div>
          );
        }
        if (step.id === 'address-creation') {
          return (
            <div className="step-content demo-step">
              <h2>{step.content.title}</h2>
              <p className="step-description">{step.content.description}</p>
              <AddressCreationLab onComplete={() => handleStepComplete(index)} />
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
              key={index}
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