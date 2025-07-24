import React, { useState } from 'react';
import { ContinueButton } from '../../../../components/ui';
import '../../../../components/ModuleCommon.css';

export default function HowItWorksIntro() {
  const [currentConcept, setCurrentConcept] = useState(0);
  const [userAnswer, setUserAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const concepts = [
    {
      id: 'record_keeping',
      title: 'Keeping Track of Money',
      scenario: "Imagine you and 9 friends are sharing expenses for a group vacation. You need to track who paid for what and who owes money to whom.",
      question: "What's the most trustworthy way to keep track of everyone's payments?",
      options: [
        { id: 'one_person', text: "One person keeps a notebook with all transactions", risk: 'high' },
        { id: 'everyone', text: "Everyone keeps their own identical copy of all transactions", risk: 'low' },
        { id: 'bank', text: "Use a bank to track everything", risk: 'medium' },
        { id: 'memory', text: "Just remember who paid what", risk: 'very_high' }
      ],
      explanation: {
        correct: 'everyone',
        why: "When everyone has the same records, no one can cheat or 'lose' the notebook. This is exactly how Bitcoin works - thousands of people keep identical records of all Bitcoin transactions.",
        bankingAnalogy: "Banks keep ONE record that only they control. Bitcoin keeps THOUSANDS of identical records that everyone can verify.",
        bitcoinConnection: "Bitcoin's 'mathematical code' is just the rules for keeping these records consistent across thousands of computers."
      }
    },
    {
      id: 'consensus',
      title: 'Agreeing on What\'s True',
      scenario: "Your group vacation notebook shows you paid $100 for dinner. But what if someone claims you only paid $50?",
      question: "How do you prove what really happened?",
      options: [
        { id: 'majority', text: "Ask everyone - whatever most people remember is true", risk: 'low' },
        { id: 'authority', text: "One person decides who's right", risk: 'high' },
        { id: 'original', text: "Check the original receipt", risk: 'medium' },
        { id: 'fight', text: "Argue until someone gives up", risk: 'very_high' }
      ],
      explanation: {
        correct: 'majority',
        why: "When most people agree on the same facts, it's extremely hard for one person to lie successfully. Bitcoin uses this same principle.",
        bankingAnalogy: "Banks: 'Trust us, our computer says you have $X.' Bitcoin: '51% of thousands of computers agree you have X bitcoin.'",
        bitcoinConnection: "This is what 'consensus' means - the majority of computers must agree before any Bitcoin transaction is accepted as real."
      }
    }
  ];

  const currentConcept_data = concepts[currentConcept];

  const handleAnswer = (optionId) => {
    setUserAnswer(optionId);
    setShowExplanation(true);
  };

  const handleContinue = () => {
    if (currentConcept < concepts.length - 1) {
      setCurrentConcept(currentConcept + 1);
      setUserAnswer(null);
      setShowExplanation(false);
    }
  };

  return (
    <div className="step-content how-bitcoin-works">
      <div className="module-header-box">
        <h2>How Bitcoin Actually Works</h2>
        <p>Let's understand the core ideas through simple examples</p>
      </div>

      <div className="content-text">
        <div className="concept-demo">
          <h3>{currentConcept_data.title}</h3>
          <p className="scenario-text">{currentConcept_data.scenario}</p>
          
          <div className="question-section">
            <h4>{currentConcept_data.question}</h4>
            
            {!userAnswer && (
              <div className="concept-options">
                {currentConcept_data.options.map((option) => (
                  <button
                    key={option.id}
                    className={`concept-option risk-${option.risk}`}
                    onClick={() => handleAnswer(option.id)}
                  >
                    {option.text}
                  </button>
                ))}
              </div>
            )}
          </div>

          {showExplanation && (
            <div className={`concept-feedback ${userAnswer === currentConcept_data.explanation.correct ? 'correct' : 'incorrect'}`}>
              <div className="feedback-text">
                <p><strong>You chose:</strong> "{currentConcept_data.options.find(opt => opt.id === userAnswer)?.text}"</p>
                {userAnswer === currentConcept_data.explanation.correct ? (
                  <p>✅ <strong>Excellent choice!</strong> You understand this concept well.</p>
                ) : (
                  <p>🤔 <strong>Let's explore this further.</strong> Here's why another option might work better:</p>
                )}
              </div>
              
              <div className="explanation-text">
                <div className="correct-answer">
                  <strong>💡 Why this matters:</strong> {currentConcept_data.explanation.why}
                </div>
                
                <div className="learning-point">
                  <strong>🏦 Banking vs Bitcoin:</strong> {currentConcept_data.explanation.bankingAnalogy}
                </div>
                
                <div className="bitcoin-connection">
                  <strong>🟠 Bitcoin Connection:</strong> {currentConcept_data.explanation.bitcoinConnection}
                </div>
              </div>

              {currentConcept < concepts.length - 1 ? (
                <button className="continue-button" onClick={handleContinue}>
                  Next Concept →
                </button>
              ) : (
                <ContinueButton>
                  Learn About Proof of Work →
                </ContinueButton>
              )}
            </div>
          )}
        </div>
        
        <div className="progress-indicator">
          <div className="progress-dots">
            {concepts.map((_, index) => (
              <div 
                key={index}
                className={`progress-dot ${index === currentConcept ? 'active' : ''} ${index < currentConcept ? 'completed' : ''}`}
              />
            ))}
          </div>
          <p>Concept {currentConcept + 1} of {concepts.length}</p>
        </div>
      </div>
    </div>
  );
}
