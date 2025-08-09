import React, { useState } from 'react';
import { ActionButton } from '../components/EnhancedButtons';
import '../components/ModuleCommon.css';
import './ApplyScorecard.css';

const ApplyScorecard = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0); // 0: intro, 1-3: evaluate each money type, 4: comparison
  const [userPredictions, setUserPredictions] = useState({});
  const [showActualScores, setShowActualScores] = useState(false);
  const [currentPropertyIndex, setCurrentPropertyIndex] = useState(0);

  const moneyTypes = [
    {
      name: "Gold",
      emoji: "🥇",
      description: "Physical precious metal, store of value for millennia",
      color: "#FFD700",
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
      },
      insights: {
        strengths: ["Excellent scarcity", "Perfect durability", "Proven store of value"],
        weaknesses: ["Heavy and hard to transport", "Difficult to verify purity", "Poor divisibility"]
      }
    },
    {
      name: "Fiat Currency",
      emoji: "💵",
      description: "Government-issued money backed by trust in institutions",
      color: "#28a745",
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
      },
      insights: {
        strengths: ["Widely accepted", "Easy to divide", "Portable"],
        weaknesses: ["Can be printed infinitely", "Banks control access", "Centrally managed"]
      }
    },
    {
      name: "Bitcoin",
      emoji: "₿",
      description: "Digital currency with mathematical scarcity and no central authority",
      color: "#F7931A",
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
      },
      insights: {
        strengths: ["Perfect scarcity (21M cap)", "Full self-custody", "Globally portable", "Perfectly divisible"],
        weaknesses: ["Still gaining acceptance", "Learning curve for users"]
      }
    }
  ];

  const properties = [
    { name: "Self Custody", icon: "🔒", description: "Can you hold it directly without intermediaries?" },
    { name: "Decentralization", icon: "🌐", description: "Is control distributed, not centralized?" },
    { name: "Verifiability", icon: "🔍", description: "Can you easily verify it's genuine?" },
    { name: "Fixed Supply", icon: "📊", description: "Is the total supply predictable and limited?" },
    { name: "Genuine Scarcity", icon: "💎", description: "Is it truly scarce, not artificially limited?" },
    { name: "Fungibility", icon: "🔄", description: "Are all units identical and interchangeable?" },
    { name: "Portability", icon: "📱", description: "Can you easily transport and transfer it?" },
    { name: "Divisibility", icon: "➗", description: "Can you break it into smaller units?" },
    { name: "Durability", icon: "⏳", description: "Does it maintain value over time?" },
    { name: "Acceptability", icon: "🤝", description: "Will others accept it in exchange?" }
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

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
      setCurrentPropertyIndex(0);
    }
  };

  const skipToComparison = () => {
    setCurrentStep(4);
    setShowActualScores(true);
  };

  // Intro Step
  if (currentStep === 0) {
    return (
      <div className="module-container">
        <div className="section-card">
          <h1 className="heading-critical">🎯 Apply Your Scorecard</h1>
          <p>Time to put your 10-point framework to the test! Let's evaluate three different money systems step by step.</p>
        </div>
        
        <div className="card-feature">
          <div className="intro-content">
            <h2>The Evaluation Process</h2>
            <p>We'll examine each money system against your 10 essential properties:</p>
            
            <div className="money-types-preview">
              {moneyTypes.map((moneyType, index) => (
                <div key={moneyType.name} className="money-preview-card">
                  <span className="money-emoji-large">{moneyType.emoji}</span>
                  <h3>{moneyType.name}</h3>
                  <p>{moneyType.description}</p>
                </div>
              ))}
            </div>
            
            <div className="properties-preview">
              <h3>📋 Your 10-Point Framework</h3>
              <div className="properties-grid">
                {properties.map((prop, index) => (
                  <div key={prop.name} className="property-preview">
                    <span className="property-icon">{prop.icon}</span>
                    <span className="property-name">{prop.name}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="cta-section">
              <ActionButton onClick={nextStep} variant="primary">
                Start Evaluation
              </ActionButton>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Evaluation Steps (1-3)
  if (currentStep >= 1 && currentStep <= 3) {
    const moneyType = moneyTypes[currentStep - 1];
    const isLastProperty = currentPropertyIndex >= properties.length;
    
    if (isLastProperty) {
      // Show money type summary
      return (
        <div className="module-container">
          <div className="section-card">
            <h1 className="heading-critical">{moneyType.emoji} {moneyType.name} Summary</h1>
            <p>Here's how {moneyType.name} scored across all 10 properties:</p>
          </div>
          
          <div className="card-feature">
            <div className="money-summary">
              <div className="money-header" style={{ background: `linear-gradient(135deg, ${moneyType.color}20, ${moneyType.color}10)` }}>
                <span className="money-emoji-large">{moneyType.emoji}</span>
                <div className="money-info">
                  <h2>{moneyType.name}</h2>
                  <p>{moneyType.description}</p>
                  <div className="total-score-display">
                    Total Score: <strong>{calculateTotalScore(moneyType)}/100</strong>
                  </div>
                </div>
              </div>
              
              <div className="scores-breakdown">
                {properties.map((property, index) => (
                  <div key={property.name} className="score-row">
                    <div className="property-info">
                      <span className="property-icon">{property.icon}</span>
                      <span className="property-name">{property.name}</span>
                    </div>
                    <div className="score-bar">
                      <div 
                        className="score-fill"
                        style={{ 
                          width: `${moneyType.scores[property.name] * 10}%`,
                          backgroundColor: getScoreColor(moneyType.scores[property.name])
                        }}
                      />
                      <span className="score-number">{moneyType.scores[property.name]}/10</span>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="insights">
                <div className="strengths">
                  <h4>💪 Strengths</h4>
                  <ul>
                    {moneyType.insights.strengths.map((strength, index) => (
                      <li key={index}>{strength}</li>
                    ))}
                  </ul>
                </div>
                <div className="weaknesses">
                  <h4>⚠️ Weaknesses</h4>
                  <ul>
                    {moneyType.insights.weaknesses.map((weakness, index) => (
                      <li key={index}>{weakness}</li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="navigation-buttons">
                {currentStep < 3 ? (
                  <ActionButton onClick={nextStep} variant="primary">
                    Next Money System
                  </ActionButton>
                ) : (
                  <ActionButton onClick={nextStep} variant="primary">
                    Compare All Systems
                  </ActionButton>
                )}
                <ActionButton onClick={skipToComparison} variant="secondary">
                  Skip to Comparison
                </ActionButton>
              </div>
            </div>
          </div>
        </div>
      );
    }
    
    // Show individual property evaluation
    const property = properties[currentPropertyIndex];
    const nextProperty = () => {
      setCurrentPropertyIndex(currentPropertyIndex + 1);
    };
    
    return (
      <div className="module-container">
        <div className="section-card">
          <div className="progress-indicator">
            Step {currentStep} of 4: Evaluating {moneyType.name} • Property {currentPropertyIndex + 1} of {properties.length}
          </div>
          <h1 className="heading-critical">{property.icon} {property.name}</h1>
          <p>{property.description}</p>
        </div>
        
        <div className="card-feature">
          <div className="property-evaluation">
            <div className="money-context">
              <span className="money-emoji-large">{moneyType.emoji}</span>
              <h2>How does {moneyType.name} score on {property.name}?</h2>
              <p className="money-description">{moneyType.description}</p>
            </div>
            
            <div className="score-reveal">
              <h3>Expert Assessment:</h3>
              <div className="score-display">
                <div className="score-circle" style={{ borderColor: getScoreColor(moneyType.scores[property.name]) }}>
                  <span className="score-value">{moneyType.scores[property.name]}</span>
                  <span className="score-max">/10</span>
                </div>
                <div className="score-explanation">
                  <p>{getPropertyExplanation(moneyType.name, property.name, moneyType.scores[property.name])}</p>
                </div>
              </div>
            </div>
            
            <div className="navigation-buttons">
              <ActionButton onClick={nextProperty} variant="primary">
                {currentPropertyIndex < properties.length - 1 ? 'Next Property' : 'View Summary'}
              </ActionButton>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Comparison Step (4)
  if (currentStep === 4) {
    const sortedMoneyTypes = [...moneyTypes].sort((a, b) => 
      calculateTotalScore(b) - calculateTotalScore(a)
    );

    return (
      <div className="module-container">
        <div className="section-card">
          <h1 className="heading-critical">🏆 Final Scorecard Results</h1>
          <p>Here's how all three money systems compare across your 10-point framework:</p>
        </div>
        
        <div className="card-feature">
          <div className="comparison-table">
            <div className="table-header">
              <div className="property-column">Property</div>
              {moneyTypes.map(money => (
                <div key={money.name} className="money-column" style={{ borderTopColor: money.color }}>
                  <span className="money-emoji">{money.emoji}</span>
                  <span className="money-name">{money.name}</span>
                </div>
              ))}
            </div>
            
            {properties.map(property => (
              <div key={property.name} className="table-row">
                <div className="property-cell">
                  <span className="property-icon">{property.icon}</span>
                  <span className="property-name">{property.name}</span>
                </div>
                {moneyTypes.map(money => (
                  <div key={money.name} className="score-cell">
                    <div className="score-bar-mini">
                      <div 
                        className="score-fill-mini"
                        style={{ 
                          width: `${money.scores[property.name] * 10}%`,
                          backgroundColor: getScoreColor(money.scores[property.name])
                        }}
                      />
                    </div>
                    <span className="score-text">{money.scores[property.name]}/10</span>
                  </div>
                ))}
              </div>
            ))}
            
            <div className="table-footer">
              <div className="total-label">Total Score</div>
              {sortedMoneyTypes.map(money => (
                <div key={money.name} className="total-cell" style={{ backgroundColor: money.color }}>
                  <strong>{calculateTotalScore(money)}/100</strong>
                </div>
              ))}
            </div>
          </div>
          
          <div className="winner-section">
            <h2>🎯 The Winner: Bitcoin</h2>
            <p>Bitcoin achieves the highest score by excelling in the properties that matter most for sound money: perfect scarcity, true self-custody, complete verifiability, and unmatched portability.</p>
          </div>
          
          <div className="key-insights">
            <h3>🔍 Key Insights</h3>
            <div className="insights-grid">
              <div className="insight-card bitcoin">
                <h4>₿ Bitcoin's Dominance</h4>
                <ul>
                  <li>Perfect mathematical scarcity (21M cap)</li>
                  <li>True self-custody with private keys</li>
                  <li>Fully auditable and verifiable</li>
                  <li>Instant global transfers</li>
                </ul>
              </div>
              
              <div className="insight-card fiat">
                <h4>💵 Fiat's Trade-offs</h4>
                <ul>
                  <li>Excellent for daily transactions</li>
                  <li>Wide acceptance everywhere</li>
                  <li>But: infinite supply, no self-custody</li>
                  <li>Central control creates risks</li>
                </ul>
              </div>
              
              <div className="insight-card gold">
                <h4>🥇 Gold's Legacy</h4>
                <ul>
                  <li>Proven store of value for millennia</li>
                  <li>Excellent scarcity and durability</li>
                  <li>But: heavy, hard to verify, poor divisibility</li>
                  <li>Physical limitations in digital age</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="conclusion">
            <h3>💡 The Bottom Line</h3>
            <p>This scorecard reveals why Bitcoin was created: to combine gold's scarcity with fiat's portability, while adding unprecedented verifiability and self-custody. It's not just digital money—it's the first money designed to excel across all essential properties.</p>
          </div>
          
          <div className="cta-section">
            <ActionButton onClick={() => onComplete(6)} variant="primary">
              Complete Money Module 🚀
            </ActionButton>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

// Helper function for property explanations
function getPropertyExplanation(moneyType, property, score) {
  const explanations = {
    "Gold": {
      "Self Custody": "You can hold physical gold directly, though storage requires security measures.",
      "Decentralization": "No central authority controls gold, but mining is somewhat concentrated.",
      "Verifiability": "Testing purity requires specialized equipment and expertise.",
      "Fixed Supply": "Gold supply grows slowly, but new deposits are still discovered.",
      "Genuine Scarcity": "Truly scarce - difficult and expensive to mine new gold.",
      "Fungibility": "Gold is mostly fungible, though purity can vary slightly.",
      "Portability": "Heavy and bulky - difficult to transport large amounts.",
      "Divisibility": "Can be divided, but not easily into very small amounts.",
      "Durability": "Perfect durability - gold doesn't decay or degrade.",
      "Acceptability": "Widely accepted globally, but not for daily transactions."
    },
    "Fiat Currency": {
      "Self Custody": "Banks control your money - you can't truly self-custody large amounts.",
      "Decentralization": "Completely centralized - government and central banks control supply.",
      "Verifiability": "Easy to verify authentic bills, bank balances are digital records.",
      "Fixed Supply": "No fixed supply - can be printed infinitely by central banks.",
      "Genuine Scarcity": "No scarcity - supply increases whenever authorities decide.",
      "Fungibility": "Perfect fungibility - every dollar is identical to every other.",
      "Portability": "Digital transfers are instant, cash is reasonably portable.",
      "Divisibility": "Perfectly divisible to smallest currency units (cents).",
      "Durability": "Digital records are durable, but value erodes via inflation.",
      "Acceptability": "Universally accepted for all transactions and payments."
    },
    "Bitcoin": {
      "Self Custody": "Perfect self-custody with private keys - you are your own bank.",
      "Decentralization": "Thousands of nodes worldwide - no single point of control.",
      "Verifiability": "Completely verifiable - anyone can audit the entire blockchain.",
      "Fixed Supply": "Absolutely fixed - 21 million maximum, no exceptions.",
      "Genuine Scarcity": "True mathematical scarcity enforced by network consensus.",
      "Fungibility": "Mostly fungible, though some privacy improvements still developing.",
      "Portability": "Instantly portable worldwide - send any amount anywhere.",
      "Divisibility": "Divisible to 8 decimal places (100 million satoshis per bitcoin).",
      "Durability": "Network has run continuously since 2009 with 99.98% uptime.",
      "Acceptability": "Growing acceptance, but still developing compared to fiat."
    }
  };
  
  return explanations[moneyType]?.[property] || `${moneyType} scores ${score}/10 on ${property}.`;
}

export default ApplyScorecard;
