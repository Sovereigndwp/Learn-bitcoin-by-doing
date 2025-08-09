import React, { useState } from 'react';
import { ActionButton, ContinueButton } from './EnhancedButtons';
import './MoneyEvolutionTimeline.css';

const MoneyEvolutionTimeline = ({ onComplete }) => {
  const [currentEra, setCurrentEra] = useState(0);
  const [showFullTimeline, setShowFullTimeline] = useState(false);

  const moneyEras = [
    {
      id: 'barter',
      period: '10,000 BCE - 3,000 BCE',
      title: 'Barter System',
      emoji: '🔄',
      soundness: 2,
      description: 'Direct exchange of goods and services',
      problems: [
        'Double coincidence of wants required',
        'No store of value',
        'Difficult to measure relative value',
        'Limited by geography and timing'
      ],
      insight: 'Trade was possible but extremely inefficient. People needed exactly what the other had.',
      example: 'A baker needs shoes but the shoemaker wants meat, not bread. The baker must find someone who wants bread AND has meat that the shoemaker wants.',
      whyItEvolved: 'Too much friction in daily trade. People needed something everyone would accept.'
    },
    {
      id: 'commodity',
      period: '3,000 BCE - 700 BCE',
      title: 'Commodity Money',
      emoji: '🌾',
      soundness: 6,
      description: 'Valuable goods used as money (grain, cattle, shells)',
      problems: [
        'Perishable (grain spoils)',
        'Hard to transport (cattle)',
        'Difficult to divide (can\'t split a cow)',
        'Not uniform (some cattle bigger than others)'
      ],
      improvements: [
        'Widely accepted within communities',
        'Had intrinsic value',
        'Better store of value than barter'
      ],
      insight: 'First real money! Things with inherent value that everyone wanted.',
      example: 'Cattle were used as money in ancient Rome. The word "salary" comes from "sal" (salt), another commodity money.',
      whyItEvolved: 'Need for something more durable, portable, and divisible.'
    },
    {
      id: 'precious-metals',
      period: '700 BCE - 1,400 CE',
      title: 'Precious Metals',
      emoji: '🥇',
      soundness: 9,
      description: 'Gold, silver, and copper coins',
      problems: [
        'Heavy to carry in large amounts',
        'Difficult to verify purity quickly',
        'Could be clipped or debased by rulers'
      ],
      improvements: [
        'Durable - lasts forever',
        'Naturally scarce',
        'Divisible into smaller pieces',
        'Widely accepted across cultures',
        'Easy to verify with proper tools'
      ],
      insight: 'The golden age of sound money! Gold had almost all the properties of perfect money.',
      example: 'Roman gold coins were accepted from Britain to India. Everyone knew their value.',
      whyItEvolved: 'Inconvenience of carrying heavy metals for large transactions.'
    },
    {
      id: 'representative',
      period: '1,400 - 1,971',
      title: 'Representative Money',
      emoji: '📜',
      soundness: 7,
      description: 'Paper backed by gold or silver ("redeemable for gold")',
      problems: [
        'Required trust in the issuing institution',
        'Temptation to print more than gold reserves',
        'Vulnerable to bank runs',
        'Could be suspended during crises'
      ],
      improvements: [
        'Much more portable than metal',
        'Easy to transport large amounts',
        'Still backed by real value (gold)',
        'Enabled larger-scale commerce'
      ],
      insight: 'Smart solution to gold\'s portability problem, but introduced counterparty risk.',
      example: 'US dollars were backed by gold. You could exchange $35 for 1 ounce of gold.',
      whyItEvolved: 'Governments wanted flexibility to print money without gold constraints.'
    },
    {
      id: 'fiat',
      period: '1971 - Present',
      title: 'Fiat Currency',
      emoji: '💵',
      soundness: 3,
      description: 'Government money with no backing ("trust us")',
      problems: [
        'No scarcity - can be printed infinitely',
        'Controlled by central authorities',
        'Prone to inflation and debasement',
        'Value depends entirely on government trust',
        'Can be frozen, seized, or cancelled'
      ],
      improvements: [
        'Very portable (digital)',
        'Highly divisible',
        'Universally accepted (by law)',
        'Enables complex financial systems'
      ],
      insight: 'Maximum convenience but minimum soundness. We traded sound money for easy money.',
      example: 'Nixon ended gold backing in 1971. Since then, purchasing power of dollars has declined 85%.',
      whyItEvolved: 'People realized the fiat system was failing and searched for digital sound money.'
    },
    {
      id: 'bitcoin',
      period: '2009 - Present',
      title: 'Bitcoin',
      emoji: '₿',
      soundness: 10,
      description: 'Digital sound money with mathematical scarcity',
      problems: [
        'Still growing acceptance',
        'Price volatility during adoption',
        'Technical complexity for some users'
      ],
      improvements: [
        'Fixed supply (21 million maximum)',
        'Completely decentralized',
        'Instantly verifiable',
        'Globally portable',
        'Censorship resistant',
        'No counterparty risk',
        'Programmable money'
      ],
      insight: 'Combines the soundness of gold with the convenience of digital money. The return to sound money!',
      example: 'You can send Bitcoin anywhere in the world in minutes, and no government can stop it or print more.',
      whyItEvolved: 'The digital age required digital sound money that couldn\'t be controlled or debased.'
    }
  ];

  const getSoundnessColor = (soundness) => {
    if (soundness >= 8) return '#4CAF50'; // Green
    if (soundness >= 6) return '#FF9800'; // Orange  
    if (soundness >= 4) return '#FFC107'; // Yellow
    return '#F44336'; // Red
  };

  const getCurrentEra = () => moneyEras[currentEra];

  const handleNext = () => {
    if (currentEra < moneyEras.length - 1) {
      setCurrentEra(currentEra + 1);
    } else if (!showFullTimeline) {
      setShowFullTimeline(true);
    } else {
      onComplete?.();
    }
  };

  const handlePrevious = () => {
    if (currentEra > 0) {
      setCurrentEra(currentEra - 1);
    }
  };

  const handleJumpToEra = (index) => {
    setCurrentEra(index);
  };

  if (showFullTimeline) {
    return (
      <div className="timeline-container">
        <div className="section-card">
          <h1 className="heading-critical">The Complete Journey</h1>
          <p>From barter to Bitcoin: humanity's search for better money</p>
        </div>

        <div className="full-timeline">
          <div className="timeline-track">
            {moneyEras.map((era, index) => (
              <div key={era.id} className="timeline-era-full">
                <div className="timeline-connector">
                  {index < moneyEras.length - 1 && <div className="timeline-arrow">→</div>}
                </div>
                
                <div className="era-card-full">
                  <div className="era-header">
                    <span className="era-emoji">{era.emoji}</span>
                    <h3>{era.title}</h3>
                    <span className="era-period">{era.period}</span>
                  </div>
                  
                  <div className="soundness-indicator">
                    <span className="soundness-label">Sound Money Score:</span>
                    <div className="soundness-bar">
                      <div 
                        className="soundness-fill"
                        style={{ 
                          width: `${era.soundness * 10}%`,
                          backgroundColor: getSoundnessColor(era.soundness)
                        }}
                      />
                      <span className="soundness-score">{era.soundness}/10</span>
                    </div>
                  </div>

                  <p className="era-description">{era.description}</p>
                  
                  <div className="era-details">
                    {era.improvements && (
                      <div className="improvements">
                        <h4>✅ Improvements:</h4>
                        <ul>
                          {era.improvements.map((improvement, i) => (
                            <li key={i}>{improvement}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    <div className="problems">
                      <h4>❌ Problems:</h4>
                      <ul>
                        {era.problems.map((problem, i) => (
                          <li key={i}>{problem}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="timeline-insights">
            <h3>🔍 Key Patterns</h3>
            <div className="insight-cards">
              <div className="insight-card">
                <h4>📈 The Sound Money Cycle</h4>
                <p>We started with sound principles (commodity money), moved away for convenience (fiat), and came back with Bitcoin combining both soundness AND convenience.</p>
              </div>
              
              <div className="insight-card">
                <h4>⚖️ The Trade-off</h4>
                <p>Each evolution traded some properties for others. Bitcoin is the first money that doesn't require major trade-offs.</p>
              </div>
              
              <div className="insight-card">
                <h4>🎯 Why Bitcoin Won</h4>
                <p>Bitcoin solves the problems of every previous money system while keeping their benefits.</p>
              </div>
            </div>
          </div>

          <div className="timeline-conclusion">
            <h3>💡 The Big Picture</h3>
            <p>Money evolution follows a clear pattern: people innovate to solve problems, but often create new ones. Bitcoin represents the first time we've achieved both perfect soundness AND perfect convenience.</p>
            
            <p><strong>This is why Bitcoin matters:</strong> It's not just another currency - it's the culmination of humanity's 12,000-year search for perfect money.</p>
          </div>

          <ContinueButton onClick={() => onComplete?.()}>
            Continue Learning
          </ContinueButton>
        </div>
      </div>
    );
  }

  const currentEraData = getCurrentEra();

  return (
    <div className="timeline-container">
      <div className="section-card">
        <h1 className="heading-critical">Money Evolution Timeline</h1>
        <p>Follow humanity's 12,000-year journey to sound money</p>
      </div>

      <div className="timeline-progress">
        <div className="progress-indicators">
          {moneyEras.map((era, index) => (
            <button
              key={era.id}
              className={`era-indicator ${index === currentEra ? 'current' : ''} ${index < currentEra ? 'completed' : ''}`}
              onClick={() => handleJumpToEra(index)}
              style={{ 
                backgroundColor: index <= currentEra ? getSoundnessColor(era.soundness) : '#e0e0e0'
              }}
            >
              <span className="era-emoji-small">{era.emoji}</span>
              <span className="era-name-small">{era.title}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="current-era-display">
        <div className="era-card">
          <div className="era-header-large">
            <span className="era-emoji-large">{currentEraData.emoji}</span>
            <div className="era-info">
              <h2>{currentEraData.title}</h2>
              <span className="era-period-large">{currentEraData.period}</span>
            </div>
            <div className="soundness-display">
              <span className="soundness-label">Sound Money Score</span>
              <div 
                className="soundness-circle"
                style={{ borderColor: getSoundnessColor(currentEraData.soundness) }}
              >
                <span style={{ color: getSoundnessColor(currentEraData.soundness) }}>
                  {currentEraData.soundness}/10
                </span>
              </div>
            </div>
          </div>

          <div className="era-content">
            <p className="era-description-large">{currentEraData.description}</p>
            
            <div className="era-example">
              <h4>📖 Real Example:</h4>
              <p>{currentEraData.example}</p>
            </div>

            <div className="era-analysis">
              {currentEraData.improvements && (
                <div className="improvements-section">
                  <h4>✅ What Improved:</h4>
                  <ul>
                    {currentEraData.improvements.map((improvement, i) => (
                      <li key={i}>{improvement}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="problems-section">
                <h4>❌ What Problems Remained:</h4>
                <ul>
                  {currentEraData.problems.map((problem, i) => (
                    <li key={i}>{problem}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="era-insight">
              <h4>💡 Key Insight:</h4>
              <p>{currentEraData.insight}</p>
            </div>

            {currentEraData.whyItEvolved && (
              <div className="evolution-reason">
                <h4>🔄 Why It Evolved:</h4>
                <p>{currentEraData.whyItEvolved}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="timeline-navigation">
        <ActionButton 
          onClick={handlePrevious}
          disabled={currentEra === 0}
          variant="secondary"
        >
          Previous Era
        </ActionButton>

        <ActionButton onClick={handleNext} variant="primary">
          {currentEra === moneyEras.length - 1 
            ? "See Full Timeline" 
            : "Next Era"
          }
        </ActionButton>
      </div>

      {currentEra === moneyEras.length - 1 && (
        <div className="bitcoin-revelation">
          <h3>🎯 The Revelation</h3>
          <p>After 12,000 years of trade-offs, Bitcoin finally gives us sound money that's also convenient. This is why it's revolutionary - not because it's digital, but because it's the first money that doesn't compromise.</p>
        </div>
      )}
    </div>
  );
};

export default MoneyEvolutionTimeline;
