import React, { useState } from 'react';
import { ContinueButton } from '../../../../components/ui';
import '../../../../components/ModuleCommon.css';

export default function CompareInteractive() {
  const [currentDemo, setCurrentDemo] = useState(0);
  const [userPredictions, setUserPredictions] = useState({});
  const [showReality, setShowReality] = useState(false);

  const scenarios = [
    {
      id: 'control',
      title: 'Who Controls Your Money?',
      setup: 'In February 2022, the Canadian government froze bank accounts of peaceful protesters without court orders...',
      question: "If your money can be frozen for political reasons, do you really own it?",
      options: [
        'Yes, it\'s still mine even if temporarily frozen',
        'No, if it can be frozen, someone else controls it',
        'It depends on the reason for freezing',
        'I never thought about this before'
      ],
      reality: 'Over $7 million in accounts were frozen without court orders. Account holders couldn\'t buy groceries or pay bills.',
      bitcoinSolution: 'Bitcoin cannot be frozen by any government or authority. Your keys = your money.'
    },
    {
      id: 'inflation',
      title: 'The Purchasing Power Problem',
      setup: 'Your grandfather earned $5,000/year in 1970. That same job pays $50,000 today...',
      question: "If wages went up 10x but a house costs 20x more, are we getting richer or poorer?",
      options: [
        'Richer - wages increased 10x',
        'Poorer - things cost more than wage increases',
        'Same - it all balances out',
        'Hard to tell without more data'
      ],
      reality: 'Average home: $23,000 (1970) → $400,000+ (2024). College: $400/year → $25,000/year. Your money buys less every year.',
      bitcoinSolution: 'Bitcoin has a fixed supply of 21 million coins. No central authority can print more and devalue your savings.'
    },
    {
      id: 'speed',
      title: 'Digital Age, Stone Age Money',
      setup: 'You can send a 4K video to Japan in 3 seconds. But sending $100 to Japan takes 3-5 business days...',
      question: "In the internet age, why does it take longer to send money than to send a video?",
      options: [
        'Money is more complex than videos',
        'Banking systems are old and slow',
        'International regulations cause delays',
        'Security requires more time'
      ],
      reality: 'Banks still use 1970s technology (SWIFT). Your money moves through 4-6 intermediaries, each taking 1-2 days.',
      bitcoinSolution: 'Bitcoin transactions settle globally in ~10 minutes, 24/7, without intermediaries.'
    }
  ];

  const currentScenario = scenarios[currentDemo];

  const handlePrediction = (choice) => {
    setUserPredictions(prev => ({
      ...prev,
      [currentScenario.id]: choice
    }));
    setShowReality(true);
  };

  const handleNext = () => {
    if (currentDemo < scenarios.length - 1) {
      setCurrentDemo(currentDemo + 1);
      setShowReality(false);
    }
  };

  return (
    <div className="step-content interactive-comparison">
      <div className="module-header-box">
        <h2>Interactive Bitcoin Comparison</h2>
        <p>Explore real-world scenarios to understand Bitcoin's advantages</p>
      </div>

      <div className="content-text">
        <div className="scenario-demo">
          <h3>{currentScenario.title}</h3>
          <p className="setup-text">{currentScenario.setup}</p>
          
          <div className="prediction-section">
            <h4>🤔 What do you think?</h4>
            <p>{currentScenario.question}</p>
            
            {!userPredictions[currentScenario.id] && (
              <div className="prediction-options">
                {currentScenario.options.map((option, index) => (
                  <button
                    key={index}
                    className="prediction-option"
                    onClick={() => handlePrediction(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>

          {showReality && (
            <div className="reality-reveal">
              <div className="user-choice">
                <h4>Your choice: "{userPredictions[currentScenario.id]}"</h4>
              </div>

              <div className="reality-section">
                <h4>📊 The Reality:</h4>
                <p>{currentScenario.reality}</p>
              </div>

              <div className="bitcoin-solution">
                <h4>🟠 Bitcoin's Solution:</h4>
                <p>{currentScenario.bitcoinSolution}</p>
              </div>

              {currentDemo < scenarios.length - 1 ? (
                <button className="next-scenario-button" onClick={handleNext}>
                  Next Scenario →
                </button>
              ) : (
                <ContinueButton>
                  Complete Comparison
                </ContinueButton>
              )}
            </div>
          )}
        </div>

        <div className="progress-dots">
          {scenarios.map((_, index) => (
            <div 
              key={index} 
              className={`progress-dot ${index === currentDemo ? 'active' : ''} ${index < currentDemo ? 'completed' : ''}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
