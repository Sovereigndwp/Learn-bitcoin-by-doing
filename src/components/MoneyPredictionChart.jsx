// src/components/MoneyPredictionChart.jsx
//
// Single-screen chart showing comparative scores for all money types
// across all properties in one visual display

import React, { useState } from 'react';

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

const MONEY_TYPES = [
  {
    name: "Gold",
    emoji: "🥇",
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
    }
  },
  {
    name: "Fiat Currency",
    emoji: "💵",
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
    }
  },
  {
    name: "Bitcoin",
    emoji: "₿",
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
    }
  }
];

export default function MoneyPredictionChart({ onNext }) {
  const [showScores, setShowScores] = useState(false);

  const handleRevealScores = () => {
    setShowScores(true);
  };

  const calculateTotalScore = (moneyType) => {
    return Object.values(moneyType.scores).reduce((sum, score) => sum + score, 0);
  };

  const getScoreColor = (score) => {
    if (score >= 8) return '#4CAF50'; // Green
    if (score >= 6) return '#FF9800'; // Orange
    if (score >= 4) return '#FFC107'; // Yellow
    return '#F44336'; // Red
  };

  return (
    <div className="money-prediction-chart">
      <div className="chart-header">
        <h3>The Complete Money Scorecard</h3>
        <p>How do the three major money systems compare across all 10 essential properties?</p>
      </div>

      <div className="chart-container">
        <div className="properties-column">
          <div className="property-header">Properties</div>
          {PROPERTIES.map((property, index) => (
            <div key={property.key} className="property-row">
              <span className="property-icon">{property.icon}</span>
              <span className="property-name">{property.key}</span>
            </div>
          ))}
          <div className="total-row">
            <span className="total-label">Total Score</span>
          </div>
        </div>

        {MONEY_TYPES.map((moneyType) => (
          <div key={moneyType.name} className="money-column" style={{ borderColor: moneyType.color }}>
            <div className="money-header" style={{ backgroundColor: moneyType.color }}>
              <span className="money-emoji">{moneyType.emoji}</span>
              <span className="money-name">{moneyType.name}</span>
            </div>
            
            {PROPERTIES.map((property) => (
              <div key={property.key} className="score-cell">
                {showScores ? (
                  <div 
                    className="score-value"
                    style={{ color: getScoreColor(moneyType.scores[property.key]) }}
                  >
                    {moneyType.scores[property.key]}/10
                  </div>
                ) : (
                  <div className="score-hidden">?</div>
                )}
              </div>
            ))}
            
            <div className="total-cell">
              {showScores ? (
                <div className="total-score" style={{ backgroundColor: moneyType.color }}>
                  {calculateTotalScore(moneyType)}/100
                </div>
              ) : (
                <div className="total-hidden">?</div>
              )}
            </div>
          </div>
        ))}
      </div>

      {!showScores ? (
        <div className="reveal-section">
          <p><strong>Ready to see how each money system scores?</strong></p>
          <button onClick={handleRevealScores} className="btn--primary">
            Reveal All Scores
          </button>
        </div>
      ) : (
        <div className="results-section">
          <div className="chart-insights">
            <h4>🎯 Key Insights:</h4>
            <div className="insights-grid">
              <div className="insight-item">
                <strong>🥇 Gold:</strong> Strong store of value, but poor for daily transactions
              </div>
              <div className="insight-item">
                <strong>💵 Fiat:</strong> Great for transactions, terrible for long-term savings
              </div>
              <div className="insight-item">
                <strong>₿ Bitcoin:</strong> Combines the best of both with digital advantages
              </div>
            </div>
          </div>

          <div className="winner-announcement">
            <h4>🏆 The Winner: Bitcoin with {calculateTotalScore(MONEY_TYPES[2])}/100</h4>
            <p>Bitcoin achieves the highest overall score by excelling in the properties that matter most for sound money: self custody, decentralization, fixed supply, and verifiability.</p>
          </div>

          <div className="next-steps">
            <p>Now you understand why Bitcoin was created and how it solves money's biggest problems.</p>
            <button onClick={onNext} className="btn--secondary">
              Complete Money Assessment
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        .money-prediction-chart {
          max-width: 1000px;
          margin: 0 auto;
          padding: 20px;
        }

        .chart-header {
          text-align: center;
          margin-bottom: 30px;
        }

        .chart-header h3 {
          font-size: 1.5rem;
          margin-bottom: 10px;
          color: #333;
        }

        .chart-container {
          display: flex;
          gap: 2px;
          overflow-x: auto;
          background: #f8f9fa;
          border-radius: 8px;
          padding: 20px;
          margin-bottom: 30px;
        }

        .properties-column {
          min-width: 180px;
          background: white;
          border-radius: 6px;
          overflow: hidden;
        }

        .property-header, .money-header {
          padding: 12px;
          font-weight: bold;
          text-align: center;
          background: #6c757d;
          color: white;
        }

        .property-row, .score-cell, .total-cell {
          padding: 10px;
          border-bottom: 1px solid #dee2e6;
          display: flex;
          align-items: center;
          min-height: 45px;
        }

        .property-row {
          gap: 8px;
        }

        .property-icon {
          font-size: 1.1rem;
        }

        .property-name {
          font-size: 0.9rem;
          font-weight: 500;
        }

        .money-column {
          min-width: 120px;
          background: white;
          border-radius: 6px;
          overflow: hidden;
          border: 2px solid transparent;
        }

        .money-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
        }

        .money-emoji {
          font-size: 1.2rem;
        }

        .money-name {
          font-size: 0.9rem;
          font-weight: bold;
        }

        .score-cell, .total-cell {
          justify-content: center;
          background: white;
        }

        .score-value {
          font-weight: bold;
          font-size: 1rem;
        }

        .score-hidden, .total-hidden {
          font-size: 1.2rem;
          color: #6c757d;
          font-weight: bold;
        }

        .total-row {
          padding: 12px;
          font-weight: bold;
          text-align: center;
          background: #495057;
          color: white;
        }

        .total-score {
          color: white;
          font-weight: bold;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 1rem;
        }

        .reveal-section, .results-section {
          text-align: center;
        }

        .btn--primary, .btn--secondary {
          padding: 12px 24px;
          border: none;
          border-radius: 6px;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn--primary {
          background: #007bff;
          color: white;
        }

        .btn--primary:hover {
          background: #0056b3;
        }

        .btn--secondary {
          background: #28a745;
          color: white;
        }

        .btn--secondary:hover {
          background: #1e7e34;
        }

        .chart-insights {
          margin: 20px 0;
          padding: 20px;
          background: #f8f9fa;
          border-radius: 8px;
        }

        .insights-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 15px;
          margin-top: 15px;
        }

        .insight-item {
          padding: 15px;
          background: white;
          border-radius: 6px;
          border-left: 4px solid #007bff;
        }

        .winner-announcement {
          margin: 20px 0;
          padding: 20px;
          background: linear-gradient(135deg, #F7931A, #FF6B35);
          color: white;
          border-radius: 8px;
        }

        .winner-announcement h4 {
          margin-top: 0;
          font-size: 1.3rem;
        }

        .next-steps {
          margin-top: 20px;
        }

        @media (max-width: 768px) {
          .chart-container {
            padding: 10px;
          }
          
          .properties-column, .money-column {
            min-width: 140px;
          }
          
          .insights-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
