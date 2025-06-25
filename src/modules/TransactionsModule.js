import React, { useState } from 'react';
import { Coins } from 'lucide-react';
import '../components/ModuleCommon.css';

const TransactionsModule = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);

  const transactionSteps = [
    {
      id: 'receiving',
      title: 'Receiving Bitcoin',
      icon: <Coins size={24} />,
      description: 'Learn how to safely receive bitcoin from others',
      interactive: {
        scenario: 'Someone wants to send you bitcoin. Let\'s learn the right way to receive it:',
        details: [
          'Generate a new receiving address (never reuse old ones)',
          'Understand different address formats (Legacy, SegWit, Native SegWit)',
          'Learn when the payment is considered "confirmed"'
        ],
        task: 'Practice generating and verifying receiving addresses'
      }
    },
    {
      id: 'sending',
      title: 'Sending Bitcoin',
      icon: <Coins size={24} />,
      description: 'Master the art of sending bitcoin safely and efficiently',
      interactive: {
        scenario: 'You want to send bitcoin to someone. Let\'s do it right:',
        details: [
          'Verify the recipient\'s address format and validity',
          'Choose between different sending options (urgent vs. cost-saving)',
          'Understand transaction confirmation times'
        ],
        task: 'Practice sending bitcoin with different priority levels'
      }
    },
    {
      id: 'fees',
      title: 'Understanding Fees',
      icon: <Coins size={24} />,
      description: 'Learn how to choose the right fee for your needs',
      interactive: {
        scenario: 'Current network conditions:',
        details: [
          'Low priority: 1 sat/byte (might take hours)',
          'Medium priority: 5 sat/byte (≈30 minutes)',
          'High priority: 10 sat/byte (next block)'
        ],
        task: 'Practice selecting appropriate fees based on urgency'
      }
    },
    {
      id: 'privacy',
      title: 'Transaction Privacy',
      icon: <Coins size={24} />,
      description: 'Best practices for maintaining privacy when transacting',
      interactive: {
        scenario: 'Let\'s learn how to keep your transactions private:',
        details: [
          'Use new addresses for every transaction',
          'Understand coin control and UTXO management',
          'Learn about transaction batching for multiple payments'
        ],
        task: 'Practice privacy-enhancing transaction techniques'
      }
    }
  ];

  const handleNextStep = () => {
    if (currentStep < transactionSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowSuccess(true);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="module-container">
      <div className="module-header">
        <h1 className="module-title">
          <Coins className="module-icon" />
          The Transaction Journey
        </h1>
      </div>
      
      <div className="step-content-container">
        <div className="intro-step">
          <div className="step-icon">
            <Coins size={48} />
          </div>
          <h2>Welcome to The Transaction Workshop!</h2>
          <p className="intro-text">
            Let's learn how Bitcoin transactions work by building one together! 
            Think of a transaction like a recipe - we'll gather ingredients (inputs), 
            plan our meal (outputs), leave a tip (fees), and sign our masterpiece.
          </p>
        </div>

        <div className="transaction-progress">
          {transactionSteps.map((step, index) => (
            <div 
              key={step.id}
              className={`progress-step ${index === currentStep ? 'active' : ''} 
                         ${index < currentStep ? 'completed' : ''}`}
            >
              {step.icon}
              <span>{step.title}</span>
            </div>
          ))}
        </div>

        <div className="transaction-builder">
          <div className="step-content">
            <div className="step-header">
              {transactionSteps[currentStep].icon}
              <h3>{transactionSteps[currentStep].title}</h3>
            </div>
            <p className="step-description">
              {transactionSteps[currentStep].description}
            </p>
            
            <div className="interactive-scenario">
              <h4>{transactionSteps[currentStep].interactive.scenario}</h4>
              <ul className="scenario-details">
                {transactionSteps[currentStep].interactive.details.map((detail, index) => (
                  <li key={index}>{detail}</li>
                ))}
              </ul>
              <div className="task-box">
                <p><strong>Your Task:</strong> {transactionSteps[currentStep].interactive.task}</p>
              </div>
            </div>
          </div>

          {showSuccess ? (
            <div className="success-message">
              <h3>🎉 Congratulations!</h3>
              <p>You've successfully created and signed a Bitcoin transaction!</p>
              <button onClick={() => setCurrentStep(0)} className="restart-button">
                Start Over
              </button>
            </div>
          ) : (
            <div className="navigation-buttons">
              <button 
                onClick={handlePrevStep} 
                disabled={currentStep === 0}
                className="nav-button prev"
              >
                Previous Step
              </button>
              <button 
                onClick={handleNextStep} 
                className="nav-button next"
              >
                {currentStep === transactionSteps.length - 1 ? 'Complete' : 'Next Step'}
              </button>
            </div>
          )}
        </div>

        <div className="learning-tips">
          <h3>💡 Transaction Tips</h3>
          <ul>
            <li>Always double-check the recipient address</li>
            <li>Remember to account for transaction fees</li>
            <li>Keep your private keys secure - they're your digital signature</li>
            <li>Choose appropriate fees based on urgency</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TransactionsModule; 