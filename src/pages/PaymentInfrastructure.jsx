import React, { useState } from 'react';
import { ActionButton, StepNavigation } from '../components/EnhancedButtons';
import '../components/ModuleCommon.css';

const PaymentInfrastructure = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const paymentSteps = [
    {
      title: "📱 You Swipe Your Card",
      description: "Seems instant, right?",
      detail: "You tap your card at the coffee shop. The screen says 'Approved!' in 2 seconds.",
      hidden: "But 6 different companies just processed this transaction across 3 different countries..."
    },
    {
      title: "🏪 Coffee Shop → Acquirer",
      description: "First stop: Payment processor",
      detail: "Your transaction data goes to the shop's payment processor (like Square or Stripe).",
      hidden: "Fee #1: Processing fee (2.9% + $0.30 per transaction)"
    },
    {
      title: "🏦 Acquirer → Card Network",
      description: "Second stop: Visa/Mastercard",
      detail: "The processor sends your transaction to Visa/Mastercard for authorization.",
      hidden: "Fee #2: Network fee (0.1-0.2% of transaction)"
    },
    {
      title: "🏛️ Card Network → Your Bank",
      description: "Third stop: Authorization",
      detail: "Visa asks your bank: 'Does this person have $5 and are they allowed to spend it?'",
      hidden: "Your bank checks: Account balance, spending limits, fraud patterns, geographic location..."
    },
    {
      title: "✅ Your Bank → Back Through the Chain",
      description: "Fourth stop: Approval flows back",
      detail: "Your bank says 'Yes' and the approval flows back through all the middlemen.",
      hidden: "This whole authorization took 1-2 seconds, but no money has actually moved yet."
    },
    {
      title: "💸 Settlement (The Real Money Movement)",
      description: "Final stop: Money actually moves (later)",
      detail: "The coffee shop gets their money in 1-3 business days through a separate settlement process.",
      hidden: "Fee #3: Settlement fee, currency conversion fees, chargebacks... Total fees can be 3-5% of transaction."
    }
  ];

  const handleNext = () => {
    if (currentStep < paymentSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const currentStepData = paymentSteps[currentStep];

  return (
    <div className="module-container">
      <div className="section-card">
        <h1 className="heading-critical">Payment Infrastructure</h1>
        <p>Every "simple" payment actually involves 6 stops and 3 middlemen. Let's trace your money's journey.</p>
      </div>
      
      <div className="card-feature">
        <h2 className="heading-high">Payment Journey</h2>
        <p>Step {currentStep + 1} of {paymentSteps.length}</p>

        <div className="payment-step-display">
          <div className="step-card">
            <h3 className="heading-medium">{currentStepData.title}</h3>
            <h4 className="step-subtitle">{currentStepData.description}</h4>
            <p className="step-detail">{currentStepData.detail}</p>
            
            <div className="hidden-info">
              <h5>🔍 What's Really Happening:</h5>
              <p className="hidden-detail">{currentStepData.hidden}</p>
            </div>
          </div>
        </div>

        <div className="progress-visualization">
          <div className="progress-dots">
            {paymentSteps.map((_, index) => (
              <div 
                key={index} 
                className={`progress-dot ${
                  index === currentStep ? 'current' : ''
                } ${index < currentStep ? 'completed' : ''}`}
              >
                {index < currentStep ? '✅' : index + 1}
              </div>
            ))}
          </div>
        </div>

        {currentStep === paymentSteps.length - 1 && (
          <div className="concept-card">
            <h3 className="heading-standard">💡 Key Insight</h3>
            <p>Notice the 6 stops & 3 middlemen? That's "friction."</p>
            <p><strong>Link back:</strong> Friction weakens <strong>Money Functions</strong> we learned about earlier - specifically the Medium of Exchange and Unit of Account jobs.</p>
            
            <div className="friction-analysis">
              <h4>What This Friction Creates:</h4>
              <ul>
                <li><strong>Cost:</strong> 3-5% in fees (hidden from you)</li>
                <li><strong>Delay:</strong> Settlement takes 1-3 days</li>
                <li><strong>Control:</strong> Any middleman can block or reverse transactions</li>
                <li><strong>Privacy:</strong> Every transaction is tracked and stored</li>
                <li><strong>Complexity:</strong> Requires 6 different companies to work together</li>
              </ul>
            </div>

            <ActionButton onClick={() => onComplete(2)} variant="primary">
              Next: Digital Scarcity
            </ActionButton>
          </div>
        )}

        {currentStep < paymentSteps.length - 1 && (
          <StepNavigation
            currentStep={currentStep}
            totalSteps={paymentSteps.length}
            onPrevious={handlePrevious}
            onNext={handleNext}
            canGoBack={currentStep > 0}
            nextLabel="Next Step"
          />
        )}
      </div>
    </div>
  );
};

export default PaymentInfrastructure; 