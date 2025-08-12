import React, { useState } from 'react';
import { ContinueButton } from '../../../../components/ui';
import '../../../../components/ModuleCommon.css';

export default function WhatIsBitcoinIntro() {
  const [currentConcept, setCurrentConcept] = useState(0);
  const [userQuestions, setUserQuestions] = useState({});

  const concepts = [
    {
      id: 'simple_definition',
      title: '💡 What is Bitcoin? (Simple Version)',
      analogy: 'Think of Bitcoin like digital gold that you can send over the internet.',
      explanation: 'Bitcoin is digital money that works without banks, governments, or any central authority controlling it.',
      keyPoints: [
        'It exists only as computer code',
        'No single person or organization controls it',
        'You can send it anywhere in the world in minutes',
        'There will only ever be 21 million bitcoins'
      ],
      question: 'What\'s the most important thing about Bitcoin to you?',
      options: [
        'No government can control it',
        'I can send money anywhere instantly',
        'It can\'t be printed like regular money',
        'I own it completely - no bank needed'
      ]
    },
    {
      id: 'how_different',
      title: '🆚 How is Bitcoin Different?',
      analogy: 'Traditional money is like an IOU from your bank. Bitcoin is like having actual gold in your pocket, but digital.',
      explanation: 'Every other form of digital money requires someone else (banks, PayPal, etc.) to keep track of balances. Bitcoin doesn\'t.',
      comparison: {
        traditional: {
          title: 'Traditional Digital Money',
          items: ['Bank keeps your balance', 'Can be frozen or restricted', 'Requires permission to send', 'Central point of failure']
        },
        bitcoin: {
          title: 'Bitcoin',
          items: ['You control your balance', 'Cannot be frozen by anyone', 'Send to anyone, anytime', 'No central point of failure']
        }
      },
      question: 'Which difference surprises you most?',
      options: [
        'Bitcoin can never be frozen',
        'No bank needed to hold Bitcoin',
        'I can send it without permission',
        'No one can print more Bitcoin'
      ]
    },
    {
      id: 'how_it_works_simple',
      title: '⚙️ How Does Bitcoin Work? (No Technical Jargon)',
      analogy: 'Imagine a giant spreadsheet that thousands of computers around the world all keep identical copies of.',
      explanation: 'Instead of one bank keeping track of balances, thousands of computers worldwide keep identical records of every Bitcoin transaction ever made.',
      keyPoints: [
        'Every 10 minutes, all the computers agree on new transactions',
        'If someone tries to cheat, the majority of computers reject it',
        'Your Bitcoin wallet gives you access to your portion of the spreadsheet',
        'The system is designed so no single party can cheat or control it'
      ],
      question: 'What makes this system trustworthy to you?',
      options: [
        'Thousands of computers all checking each other',
        'Everything is transparent and verifiable',
        'No single point of control or failure',
        'The math makes cheating impossible'
      ]
    },
    {
      id: 'why_now',
      title: '⏰ Why Bitcoin, Why Now?',
      analogy: 'Bitcoin is to money what email was to postal mail - a fundamental upgrade for the digital age.',
      explanation: 'For the first time in history, we can have money that works like the internet: global, instant, and controlled by no one.',
      context: [
        'Money hasn\'t been upgraded for the internet age',
        'Governments are printing money at unprecedented rates',
        'Digital surveillance is increasing',
        'Financial censorship is becoming common'
      ],
      solution: 'Bitcoin offers an escape hatch - money that works for the internet age and can\'t be controlled, censored, or debased.',
      question: 'What problem does Bitcoin solve for you personally?',
      options: [
        'Protection from inflation',
        'Financial privacy and freedom',
        'True ownership of my money',
        'Global access without restrictions'
      ]
    }
  ];

  const currentConceptData = concepts[currentConcept];

  const handleAnswer = (choice) => {
    setUserQuestions(prev => ({
      ...prev,
      [currentConceptData.id]: choice
    }));
  };

  const handleNext = () => {
    if (currentConcept < concepts.length - 1) {
      setCurrentConcept(currentConcept + 1);
    }
  };

  return (
    <div className="step-content what-is-bitcoin">
      <div className="module-header-box">
        <h2>🟠 What is Bitcoin?</h2>
        <p>Let's break down Bitcoin in simple terms, without the technical jargon.</p>
      </div>

      <div className="content-text">
        <div className="concept-explanation">
          <h3>{currentConceptData.title}</h3>
          
          <div className="analogy-box">
            <h4>🎯 Think of it this way:</h4>
            <p className="analogy-text">{currentConceptData.analogy}</p>
          </div>

          <div className="main-explanation">
            <p>{currentConceptData.explanation}</p>
          </div>

          {currentConceptData.keyPoints && (
            <div className="key-points">
              <h4>Key Points:</h4>
              <ul>
                {currentConceptData.keyPoints.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            </div>
          )}

          {currentConceptData.comparison && (
            <div className="comparison-grid">
              <div className="comparison-side traditional">
                <h4>{currentConceptData.comparison.traditional.title}</h4>
                <ul>
                  {currentConceptData.comparison.traditional.items.map((item, index) => (
                    <li key={index}>❌ {item}</li>
                  ))}
                </ul>
              </div>
              <div className="comparison-side bitcoin">
                <h4>{currentConceptData.comparison.bitcoin.title}</h4>
                <ul>
                  {currentConceptData.comparison.bitcoin.items.map((item, index) => (
                    <li key={index}>✅ {item}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {currentConceptData.context && (
            <div className="context-box">
              <h4>The Context:</h4>
              <ul>
                {currentConceptData.context.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
              <div className="solution-highlight">
                <h5>Bitcoin's Solution:</h5>
                <p>{currentConceptData.solution}</p>
              </div>
            </div>
          )}

          <div className="reflection-section">
            <h4>🤔 Personal Reflection:</h4>
            <p>{currentConceptData.question}</p>
            
            {!userQuestions[currentConceptData.id] ? (
              <div className="reflection-options">
                {currentConceptData.options.map((option, index) => (
                  <button
                    key={index}
                    className="reflection-option"
                    onClick={() => handleAnswer(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            ) : (
              <div className="reflection-response">
                <p><strong>Your perspective:</strong> "{userQuestions[currentConceptData.id]}"</p>
                
                {currentConcept < concepts.length - 1 ? (
                  <button 
                    onClick={handleNext}
                    className="next-concept-button"
                  >
                    Next Concept →
                  </button>
                ) : (
                  <div className="completion-section">
                    <div className="understanding-summary">
                      <h4>🎉 Great! You now understand:</h4>
                      <ul>
                        <li>✅ What Bitcoin is in simple terms</li>
                        <li>✅ How Bitcoin differs from traditional money</li>
                        <li>✅ Why Bitcoin exists and why it matters now</li>
                        <li>✅ How Bitcoin works at a basic level</li>
                      </ul>
                    </div>
                    <ContinueButton>
                      Ready to Learn How Bitcoin Works →
                    </ContinueButton>
                  </div>
                )}
              </div>
            )}
          </div>
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
