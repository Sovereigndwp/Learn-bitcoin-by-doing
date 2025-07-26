import React, { useState } from 'react';
import { ActionButton } from '../components/EnhancedButtons';
import MoneyPredictionChart from '../components/MoneyPredictionChart';
import '../components/ModuleCommon.css';

const ApplyScorecard = ({ onComplete }) => {
  const [showResults, setShowResults] = useState(false);

  const moneyTypes = [
    {
      name: "Gold",
      emoji: "🥇",
      description: "Physical precious metal, used as money for thousands of years",
      scores: {
        "Self Custody": 9,
        "Decentralization": 8,
        "Verifiability": 6,
        "Fixed Supply": 9,
        "Genuine Scarcity": 9,
        "Fungibility": 7,
        "Portability": 4,
        "Divisibility": 5,
        "Durability": 10,
        "Acceptability": 8
      }
    },
    {
      name: "Fiat Currency",
      emoji: "💵",
      description: "Government-issued currency (like USD, EUR) backed by trust in government",
      scores: {
        "Self Custody": 3,
        "Decentralization": 1,
        "Verifiability": 8,
        "Fixed Supply": 1,
        "Genuine Scarcity": 1,
        "Fungibility": 9,
        "Portability": 8,
        "Divisibility": 10,
        "Durability": 6,
        "Acceptability": 10
      }
    },
    {
      name: "Bitcoin",
      emoji: "₿",
      description: "Digital currency with mathematical scarcity and no central authority",
      scores: {
        "Self Custody": 10,
        "Decentralization": 9,
        "Verifiability": 10,
        "Fixed Supply": 10,
        "Genuine Scarcity": 10,
        "Fungibility": 8,
        "Portability": 10,
        "Divisibility": 10,
        "Durability": 9,
        "Acceptability": 6
      }
    }
  ];

  const properties = [
    "Self Custody", "Decentralization", "Verifiability", "Fixed Supply", 
    "Genuine Scarcity", "Fungibility", "Portability", "Divisibility", 
    "Durability", "Acceptability"
  ];

  const calculateTotalScore = (moneyType) => {
    return Object.values(moneyType.scores).reduce((sum, score) => sum + score, 0);
  };

  const getScoreColor = (score) => {
    if (score >= 8) return '#4CAF50'; // Green
    if (score >= 6) return '#FF9800'; // Orange
    if (score >= 4) return '#FFC107'; // Yellow
    return '#F44336'; // Red
  };

  const handleShowResults = () => {
    setShowResults(true);
  };

  if (showResults) {
    const sortedMoneyTypes = [...moneyTypes].sort((a, b) => 
      calculateTotalScore(b) - calculateTotalScore(a)
    );

    return (
      <div className="module-container">
        <div className="section-card">
          <h1 className="heading-critical">🏆 Scorecard Results</h1>
          <p>Here's how each money system scored on your 10-point framework:</p>
        </div>
        
        <div className="card-feature">
          <div className="results-comparison">
            {sortedMoneyTypes.map((moneyType, index) => (
              <div key={moneyType.name} className="money-result-card">
                <div className="result-header">
                  <span className="rank">#{index + 1}</span>
                  <span className="money-emoji">{moneyType.emoji}</span>
                  <h3>{moneyType.name}</h3>
                  <div className="total-score">
                    {calculateTotalScore(moneyType)}/100
                  </div>
                </div>
                
                <div className="scores-breakdown">
                  {properties.map(property => (
                    <div key={property} className="score-row">
                      <span className="property-name">{property}</span>
                      <div className="score-bar">
                        <div 
                          className="score-fill"
                          style={{ 
                            width: `${moneyType.scores[property] * 10}%`,
                            backgroundColor: getScoreColor(moneyType.scores[property])
                          }}
                        />
                        <span className="score-number">{moneyType.scores[property]}/10</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="insights-section">
            <h3>🔍 Key Insights</h3>
            <div className="insight-cards">
              <div className="insight-card">
                <h4>🥇 Why Bitcoin Scored Highest</h4>
                <ul>
                  <li><strong>Perfect Scarcity:</strong> Only 21 million will ever exist</li>
                  <li><strong>True Self-Custody:</strong> You can hold your own keys</li>
                  <li><strong>Fully Verifiable:</strong> Anyone can audit the entire system</li>
                  <li><strong>Digital Portability:</strong> Send anywhere in minutes</li>
                </ul>
              </div>
              
              <div className="insight-card">
                <h4>💵 Fiat's Main Weakness</h4>
                <ul>
                  <li><strong>No Scarcity:</strong> Can be printed infinitely</li>
                  <li><strong>No Self-Custody:</strong> Banks control your money</li>
                  <li><strong>Centralized:</strong> Government controls the system</li>
                </ul>
              </div>
              
              <div className="insight-card">
                <h4>🥇 Gold's Trade-offs</h4>
                <ul>
                  <li><strong>Great Scarcity:</strong> Hard to find and mine</li>
                  <li><strong>Poor Portability:</strong> Heavy and hard to transport</li>
                  <li><strong>Verification Issues:</strong> Hard to test purity quickly</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="next-steps-preview">
            <h3>🚀 What's Next?</h3>
            <p>Now you understand <em>why</em> Bitcoin was created and how it solves money's biggest problems. Ready to dive deeper into how Bitcoin actually works?</p>
            
            <p className="mt-6 font-semibold">
              With these ten tests in mind, let's meet the first digital money designed to pass them all.
            </p>
            
            <div className="cta-section">
              <ActionButton onClick={() => onComplete(6)} variant="primary">
                Complete Money Module
              </ActionButton>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="module-container">
      <div className="section-card">
        <h1 className="heading-critical">Apply Scorecard</h1>
        <p>Let's test your framework by scoring different money systems. You'll see patterns emerge...</p>
      </div>
      
      <div className="card-feature">
        <div className="comparison-header">
          <h2>Evaluating Money Systems</h2>
          <p>Use your 10-point framework to score Gold, Fiat Currency, and Bitcoin</p>
        </div>

        <MoneyPredictionChart onNext={handleShowResults} />
        
        <div className="evaluation-help">
          <ActionButton onClick={handleShowResults} variant="primary">
            Show Results
          </ActionButton>
        </div>
      </div>
    </div>
  );
};

export default ApplyScorecard; 