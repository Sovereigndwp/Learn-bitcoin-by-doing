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
      <style>
        {`
          /* Force dark theme for What is Bitcoin page */
          .step-content.what-is-bitcoin {
            background: var(--color-dark-bg, #0D1117) !important;
            color: var(--color-dark-text, #ffffff) !important;
            min-height: 100vh;
            padding: 2rem !important;
          }
          
          .what-is-bitcoin * {
            color: var(--color-dark-text, #ffffff) !important;
          }
          
          .what-is-bitcoin .module-header-box {
            background: var(--color-dark-bgCard, #1c2128) !important;
            border: 1px solid var(--color-dark-border, rgba(255, 255, 255, 0.1)) !important;
            border-radius: 12px;
            padding: 2rem !important;
            margin-bottom: 2rem !important;
          }
          
          .what-is-bitcoin .module-header-box h2 {
            color: var(--color-primary-400, #f7931a) !important;
            font-size: 2rem !important;
            margin-bottom: 1rem !important;
          }
          
          .what-is-bitcoin .module-header-box p {
            color: var(--color-dark-textSecondary, #e6edf3) !important;
            font-size: 1.1rem !important;
          }
          
          .what-is-bitcoin .content-text {
            background: var(--color-dark-bgCard, #1c2128) !important;
            border: 1px solid var(--color-dark-border, rgba(255, 255, 255, 0.1)) !important;
            border-radius: 12px;
            padding: 2rem !important;
          }
          
          .what-is-bitcoin .concept-explanation h3 {
            color: var(--color-primary-400, #f7931a) !important;
            font-size: 1.5rem !important;
            margin-bottom: 1.5rem !important;
          }
          
          .what-is-bitcoin .analogy-box {
            background: var(--color-dark-bgSecondary, #161b22) !important;
            border: 1px solid var(--color-primary-alpha-30, rgba(247, 147, 26, 0.3)) !important;
            border-radius: 8px;
            padding: 1.5rem !important;
            margin: 1.5rem 0 !important;
          }
          
          .what-is-bitcoin .analogy-box h4 {
            color: var(--color-primary-300, #fdc574) !important;
            margin-bottom: 0.75rem !important;
          }
          
          .what-is-bitcoin .analogy-text {
            color: var(--color-dark-text, #ffffff) !important;
            font-style: italic;
            font-size: 1.1rem !important;
            line-height: 1.6 !important;
          }
          
          .what-is-bitcoin .main-explanation p {
            color: var(--color-dark-text, #ffffff) !important;
            font-size: 1.1rem !important;
            line-height: 1.6 !important;
            margin: 1rem 0 !important;
          }
          
          .what-is-bitcoin .key-points {
            background: var(--color-dark-bgSecondary, #161b22) !important;
            border-radius: 8px;
            padding: 1.5rem !important;
            margin: 1.5rem 0 !important;
          }
          
          .what-is-bitcoin .key-points h4 {
            color: var(--color-primary-400, #f7931a) !important;
            margin-bottom: 1rem !important;
          }
          
          .what-is-bitcoin .key-points ul {
            list-style: none;
            padding: 0 !important;
          }
          
          .what-is-bitcoin .key-points li {
            color: var(--color-dark-text, #ffffff) !important;
            padding: 0.5rem 0 !important;
            border-bottom: 1px solid var(--color-dark-border, rgba(255, 255, 255, 0.1));
          }
          
          .what-is-bitcoin .key-points li::before {
            content: '✓ ';
            color: var(--color-success-text, #4ade80) !important;
            font-weight: bold;
            margin-right: 0.5rem;
          }
          
          .what-is-bitcoin .comparison-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1.5rem;
            margin: 2rem 0 !important;
          }
          
          .what-is-bitcoin .comparison-side {
            background: var(--color-dark-bgSecondary, #161b22) !important;
            border-radius: 8px;
            padding: 1.5rem !important;
          }
          
          .what-is-bitcoin .comparison-side.traditional {
            border-left: 4px solid var(--color-error-light, #dc2626) !important;
          }
          
          .what-is-bitcoin .comparison-side.bitcoin {
            border-left: 4px solid var(--color-success-light, #16a34a) !important;
          }
          
          .what-is-bitcoin .comparison-side h4 {
            color: var(--color-primary-400, #f7931a) !important;
            margin-bottom: 1rem !important;
          }
          
          .what-is-bitcoin .comparison-side ul {
            list-style: none;
            padding: 0 !important;
          }
          
          .what-is-bitcoin .comparison-side li {
            color: var(--color-dark-text, #ffffff) !important;
            padding: 0.5rem 0 !important;
            line-height: 1.5 !important;
          }
          
          .what-is-bitcoin .context-box {
            background: var(--color-dark-bgSecondary, #161b22) !important;
            border: 1px solid var(--color-warning-alpha-30, rgba(251, 146, 60, 0.3)) !important;
            border-radius: 8px;
            padding: 1.5rem !important;
            margin: 1.5rem 0 !important;
          }
          
          .what-is-bitcoin .context-box h4 {
            color: var(--color-warning-text, #fb923c) !important;
            margin-bottom: 1rem !important;
          }
          
          .what-is-bitcoin .context-box ul {
            list-style: none;
            padding: 0 !important;
          }
          
          .what-is-bitcoin .context-box li {
            color: var(--color-dark-text, #ffffff) !important;
            padding: 0.5rem 0 !important;
          }
          
          .what-is-bitcoin .solution-highlight {
            background: var(--color-success-bg, rgba(34, 197, 94, 0.1)) !important;
            border: 1px solid var(--color-success-light, #16a34a) !important;
            border-radius: 6px;
            padding: 1rem !important;
            margin-top: 1rem !important;
          }
          
          .what-is-bitcoin .solution-highlight h5 {
            color: var(--color-success-text, #4ade80) !important;
            margin-bottom: 0.5rem !important;
          }
          
          .what-is-bitcoin .solution-highlight p {
            color: var(--color-dark-text, #ffffff) !important;
          }
          
          .what-is-bitcoin .reflection-section {
            background: var(--color-dark-bgSecondary, #161b22) !important;
            border: 2px solid var(--color-primary-alpha-30, rgba(247, 147, 26, 0.3)) !important;
            border-radius: 12px;
            padding: 2rem !important;
            margin-top: 2rem !important;
          }
          
          .what-is-bitcoin .reflection-section h4 {
            color: var(--color-primary-400, #f7931a) !important;
            margin-bottom: 1rem !important;
          }
          
          .what-is-bitcoin .reflection-section p {
            color: var(--color-dark-text, #ffffff) !important;
            font-size: 1.1rem !important;
            margin-bottom: 1.5rem !important;
          }
          
          .what-is-bitcoin .reflection-options {
            display: grid;
            gap: 1rem;
          }
          
          .what-is-bitcoin .reflection-option {
            background: var(--color-dark-bgCard, #1c2128) !important;
            color: var(--color-dark-text, #ffffff) !important;
            border: 2px solid var(--color-dark-border, rgba(255, 255, 255, 0.1)) !important;
            border-radius: 8px;
            padding: 1rem 1.5rem !important;
            font-size: 1rem !important;
            cursor: pointer;
            transition: all 0.3s ease !important;
            text-align: left !important;
          }
          
          .what-is-bitcoin .reflection-option:hover {
            background: var(--color-primary-bg, rgba(247, 147, 26, 0.1)) !important;
            border-color: var(--color-primary-400, #f7931a) !important;
            transform: translateY(-2px);
          }
          
          .what-is-bitcoin .reflection-response {
            background: var(--color-success-bg, rgba(34, 197, 94, 0.1)) !important;
            border: 1px solid var(--color-success-light, #16a34a) !important;
            border-radius: 8px;
            padding: 1.5rem !important;
            margin-top: 1rem !important;
          }
          
          .what-is-bitcoin .reflection-response p {
            color: var(--color-dark-text, #ffffff) !important;
            margin-bottom: 1rem !important;
          }
          
          .what-is-bitcoin .reflection-response strong {
            color: var(--color-success-text, #4ade80) !important;
          }
          
          .what-is-bitcoin .next-concept-button {
            background: var(--color-primary-500, #f7931a) !important;
            color: var(--color-dark-bg, #000) !important;
            border: none !important;
            border-radius: 8px;
            padding: 1rem 2rem !important;
            font-size: 1rem !important;
            font-weight: 600 !important;
            cursor: pointer;
            transition: all 0.3s ease !important;
          }
          
          .what-is-bitcoin .next-concept-button:hover {
            background: var(--color-primary-600, #e8750a) !important;
            transform: translateY(-2px);
          }
          
          .what-is-bitcoin .completion-section {
            background: var(--color-success-bg, rgba(34, 197, 94, 0.1)) !important;
            border: 2px solid var(--color-success-light, #16a34a) !important;
            border-radius: 12px;
            padding: 2rem !important;
            text-align: center;
          }
          
          .what-is-bitcoin .understanding-summary h4 {
            color: var(--color-success-text, #4ade80) !important;
            margin-bottom: 1rem !important;
          }
          
          .what-is-bitcoin .understanding-summary ul {
            list-style: none;
            padding: 0 !important;
            margin: 1rem 0 !important;
          }
          
          .what-is-bitcoin .understanding-summary li {
            color: var(--color-dark-text, #ffffff) !important;
            padding: 0.5rem 0 !important;
            font-size: 1.1rem !important;
          }
          
          .what-is-bitcoin .progress-indicator {
            background: var(--color-dark-bgCard, #1c2128) !important;
            border: 1px solid var(--color-dark-border, rgba(255, 255, 255, 0.1)) !important;
            border-radius: 8px;
            padding: 1rem !important;
            margin-top: 2rem !important;
            text-align: center;
          }
          
          .what-is-bitcoin .progress-dots {
            display: flex;
            justify-content: center;
            gap: 0.5rem;
            margin-bottom: 1rem;
          }
          
          .what-is-bitcoin .progress-dot {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: var(--color-dark-border, rgba(255, 255, 255, 0.2));
            transition: all 0.3s ease;
          }
          
          .what-is-bitcoin .progress-dot.active {
            background: var(--color-primary-400, #f7931a) !important;
            transform: scale(1.2);
          }
          
          .what-is-bitcoin .progress-dot.completed {
            background: var(--color-success-text, #4ade80) !important;
          }
          
          .what-is-bitcoin .progress-indicator p {
            color: var(--color-dark-textSecondary, #e6edf3) !important;
            font-size: 0.9rem !important;
            margin: 0 !important;
          }
          
          @media (max-width: 768px) {
            .what-is-bitcoin .comparison-grid {
              grid-template-columns: 1fr !important;
            }
          }
        `}
      </style>
      
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
