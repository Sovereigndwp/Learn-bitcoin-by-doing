import React, { useState } from 'react';
import { ArrowLeftRight, Wallet, Send, DollarSign, ShieldCheck } from 'lucide-react';
import '../components/ModuleCommon.css';

const TransactionsModule = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);

  const transactionSteps = [
    {
      id: 'inputs',
      title: 'Gathering Your Coins',
      icon: <Wallet size={24} />,
      description: 'Just like gathering coins from your piggy bank before buying something!',
      interactive: {
        scenario: 'You have 3 previous transactions that sent you Bitcoin:',
        details: [
          '0.5 BTC from your friend Alice',
          '0.3 BTC from selling your old laptop',
          '0.2 BTC from your birthday gift'
        ],
        task: 'Select which "coins" you want to spend in your new transaction'
      }
    },
    {
      id: 'outputs',
      title: 'Planning Your Spending',
      icon: <Send size={24} />,
      description: 'Deciding who gets what, like dividing pizza slices among friends',
      interactive: {
        scenario: 'You want to:',
        details: [
          'Send 0.7 BTC to an online store',
          'Get 0.2 BTC back as change',
          'Leave a small tip for miners (fee)'
        ],
        task: 'Arrange your transaction outputs to match your spending plan'
      }
    },
    {
      id: 'fees',
      title: 'Tipping the Network',
      icon: <DollarSign size={24} />,
      description: 'Like tipping for faster service at a restaurant',
      interactive: {
        scenario: 'Current network conditions:',
        details: [
          'Low priority: 1 sat/byte (might take hours)',
          'Medium priority: 5 sat/byte (≈30 minutes)',
          'High priority: 10 sat/byte (next block)'
        ],
        task: 'Choose your fee based on how quickly you need the transaction confirmed'
      }
    },
    {
      id: 'signing',
      title: 'Making It Official',
      icon: <ShieldCheck size={24} />,
      description: 'Like signing a check - proves these are really your coins to spend',
      interactive: {
        scenario: 'To complete your transaction:',
        details: [
          'Use your private key to sign',
          'Verify all details are correct',
          'Broadcast to the network'
        ],
        task: 'Review and sign your transaction'
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
      setShowSuccess(false);
    }
  };

  return (
    <div className="module-container">
      <div className="module-header">
        <h1 className="module-title">
          <ArrowLeftRight className="module-icon" />
          The Transaction Journey
        </h1>
      </div>
      
      <div className="step-content-container">
        <div className="intro-step">
          <div className="step-icon">
            <ArrowLeftRight size={48} />
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