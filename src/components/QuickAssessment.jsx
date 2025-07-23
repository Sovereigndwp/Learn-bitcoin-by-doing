// src/components/QuickAssessment.jsx
//
// Single-page assessment with inline sliders for all properties
// Rules implemented:
// 1. A learner's answer is marked "Right!" when it is within ±1 of the canonical score.
// 2. Show all properties on one page with inline sliders
// 3. If the answer is outside the ±1 window, show property-specific hint and actual score.
// 4. Single "Check Answers" button processes all properties at once.

import React, { useState } from 'react';

// ⚙️ Adjust tolerance here (1 = ±1 window).
const TOLERANCE = 1;

// 🔎 Property-specific hints for money properties
const HINTS = {
  'Self Custody': 'Who has ultimate control—can anyone freeze or seize it without your consent?',
  'Decentralization': 'Think about how many entities control this money system. Is it controlled by one group or distributed?',
  'Verifiability': 'How easy is it to verify that this money is authentic and not counterfeit?',
  'Fixed Supply': 'Can more of this money be created at will? What prevents unlimited creation?',
  'Genuine Scarcity': 'Think about how difficult it is to increase the total supply of this money.',
  'Fungibility': 'Are all units of this money identical and interchangeable with each other?',
  'Portability': 'Consider how easily this money can move across distance or borders.',
  'Divisibility': 'How easily can this money be divided into smaller units for different transaction sizes?',
  'Durability': 'Does this money maintain its properties over time without degrading?',
  'Acceptability': 'How widely is this money trusted and accepted by people?',
  default: 'Re-examine the key trait of this property, then try a slightly higher or lower score.',
};

// All properties that will be assessed
const PROPERTIES = [
  { key: 'Self Custody', icon: '🔒' },
  { key: 'Decentralization', icon: '🌐' },
  { key: 'Verifiability', icon: '🔍' },
  { key: 'Fixed Supply', icon: '📊' },
  { key: 'Genuine Scarcity', icon: '💎' },
  { key: 'Fungibility', icon: '🔄' },
  { key: 'Portability', icon: '📱' },
  { key: 'Divisibility', icon: '➗' },
  { key: 'Durability', icon: '⏳' },
  { key: 'Acceptability', icon: '🤝' }
];

export default function QuickAssessment({
  moneyType = '',     // e.g. 'Gold', 'Bitcoin', 'Fiat Currency'
  actualScores = {},  // Object with scores for each property
  onNext,            // callback when assessment is complete
}) {
  // Initialize inputs with default score of 5 for each property
  const [inputs, setInputs] = useState(() => {
    const initialInputs = {};
    PROPERTIES.forEach(p => {
      initialInputs[p.key] = 5;
    });
    return initialInputs;
  });
  
  const [showResults, setShowResults] = useState(false);

  const handleCheckAnswers = () => {
    setShowResults(true);
  };

  const getScoreColor = (score) => {
    if (score >= 8) return '#4CAF50'; // Green
    if (score >= 6) return '#FF9800'; // Orange
    if (score >= 4) return '#FFC107'; // Yellow
    return '#F44336'; // Red
  };

  const isCorrect = (propertyKey) => {
    const actualScore = actualScores[propertyKey];
    const userScore = inputs[propertyKey];
    return typeof actualScore === 'number' && 
           Math.abs(Number(userScore) - actualScore) <= TOLERANCE;
  };

  return (
    <div className="scoring-interface">
      <h3>Quick Assessment</h3>
      <p>Based on what you've learned, how do you think <strong>{moneyType}</strong> scores on each property? Use the sliders to make your predictions:</p>
      
      <div className="properties-grid">
        {PROPERTIES.map((property) => (
          <div key={property.key} className="property-row">
            <div className="property-info">
              <span className="property-icon">{property.icon}</span>
              <span className="property-name">{property.key}</span>
            </div>
            
            <div className="property-slider">
              <input
                type="range"
                min={1}
                max={10}
                value={inputs[property.key]}
                disabled={showResults}
                onChange={(e) =>
                  setInputs({ ...inputs, [property.key]: parseInt(e.target.value) })
                }
                className="slider-input"
                style={{
                  background: `linear-gradient(to right, 
                    #F44336 0%, #F44336 30%, 
                    #FF9800 30%, #FF9800 60%, 
                    #FFC107 60%, #FFC107 80%, 
                    #4CAF50 80%, #4CAF50 100%)`
                }}
              />
              <span className="score-display">{inputs[property.key]}/10</span>
            </div>
            
            {showResults && (
              <div className="property-feedback">
                {isCorrect(property.key) ? (
                  <div className="feedback-correct">
                    <span className="feedback-icon">✅</span>
                    <span className="feedback-text">Close! ({inputs[property.key]}/10)</span>
                  </div>
                ) : (
                  <div className="feedback-incorrect">
                    <span className="feedback-icon">🤔</span>
                    <div className="feedback-details">
                      <div className="score-comparison">
                        Your guess: {inputs[property.key]}/10 → Actual: <strong>{actualScores[property.key]}/10</strong>
                      </div>
                      <div className="hint-text">
                        💡 {HINTS[property.key] ?? HINTS.default}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {!showResults ? (
        <button onClick={handleCheckAnswers} className="btn--primary">
          Check All Answers
        </button>
      ) : (
        <div className="assessment-complete">
          <div className="completion-summary">
            <h4>Assessment Complete!</h4>
            <p>You've evaluated all 10 properties of {moneyType}. Understanding these differences will help you compare different money systems.</p>
          </div>
          <button onClick={onNext} className="btn--secondary">
            Continue to Next Money Type
          </button>
        </div>
      )}
    </div>
  );
}
