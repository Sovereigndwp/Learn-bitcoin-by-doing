import React, { useState } from 'react';
import { useProgress } from '../contexts/ProgressContext';
import { Bitcoin, CheckCircle, Trophy } from 'lucide-react';
import '../components/ModuleCommon.css';

const BitcoinBasicsModule = () => {
  const { completeModule } = useProgress();
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(new Set());

  const handleStepComplete = (index) => {
    setCompletedSteps(prev => new Set(prev).add(index));
    if (index === steps.length - 1) {
      completeModule('bitcoin-basics');
    }
    setCurrentStep(index + 1);
  };

  const steps = [
    {
      title: "Introduction",
      type: "intro",
      content: {
        title: "Welcome to Bitcoin Basics",
        text: "Before we dive into the technical details, let's understand what Bitcoin really is and why it matters.\n\nBitcoin is more than just digital money - it's a revolutionary technology that combines cryptography, computer science, and economics to create the world's first truly decentralized digital currency.\n\nIn this module, you'll discover:\n\n1. What problems Bitcoin solves\n2. How Bitcoin works at a high level\n3. Why Bitcoin is different from traditional money\n4. The key innovations that make Bitcoin possible"
      }
    },
    {
      title: "The Trust Problem",
      type: "interactive",
      content: {
        scenario: "Imagine you want to send $1000 to a friend in another country. Let's explore what actually happens:",
        steps: [
          "Your bank deducts $1000 from your account",
          "Money moves through 2-3 intermediary banks",
          "Each bank takes a fee",
          "Process takes 3-5 business days",
          "Your friend's bank might block it for 'security'"
        ],
        question: "What are the fundamental problems with this system?",
        options: [
          "Too many middlemen controlling your money",
          "High fees for a simple digital transfer",
          "Artificial delays and restrictions",
          "All of the above"
        ],
        correctAnswer: 3,
        explanation: "The traditional financial system is built on layers of trust and control. Each intermediary adds cost, delay, and potential points of failure. Bitcoin removes these intermediaries entirely."
      }
    },
    {
      title: "The Double-Spend Problem",
      type: "discovery",
      content: {
        scenario: "Digital Challenge: Copy & Paste Money?\n\nImagine you create a digital coin - just a computer file that says '1 coin'. What's stopping someone from:\n\n1. Copying the file multiple times?\n2. Sending the same coin to different people?\n3. Creating unlimited coins?\n\nThis is called the 'double-spend problem' - and before Bitcoin, it required banks to keep track of all money.",
        thoughtExperiment: "How would you solve this without using banks?",
        hints: [
          "What if everyone kept a copy of all transactions?",
          "What if we all agreed on the order of transactions?",
          "What if making fake transactions was extremely expensive?"
        ],
        revelation: "Bitcoin solves this through its blockchain - a public ledger that everyone can verify but no one can cheat. Mining makes it extremely expensive to try to cheat the system."
      }
    },
    {
      title: "Decentralization in Action",
      type: "interactive",
      content: {
        scenario: "The Power of Decentralization",
        simulation: {
          setup: "Let's simulate a network with different scenarios:",
          scenarios: [
            {
              title: "Scenario 1: Central Point of Failure",
              description: "Traditional bank system goes down for maintenance",
              outcome: "All transactions stop"
            },
            {
              title: "Scenario 2: Bitcoin Node Goes Down",
              description: "One or many Bitcoin nodes stop working",
              outcome: "Network continues normally"
            },
            {
              title: "Scenario 3: Attempted Censorship",
              description: "Someone tries to block certain transactions",
              outcome: "Transactions route around the censorship"
            }
          ]
        },
        question: "Why is decentralization crucial for a global money system?",
        discussion: "Decentralization isn't just a technical feature - it's fundamental to creating unstoppable money. No single point of failure means no single point of control."
      }
    },
    {
      title: "The Innovation of Digital Scarcity",
      type: "discovery",
      content: {
        scenario: "The Digital Copying Problem",
        challenge: "Before Bitcoin, everything digital could be copied infinitely:\n- Music files\n- Pictures\n- Documents\n\nBut money can't work if it can be copied freely. Bitcoin solved this through:\n\n1. A public ledger everyone can verify\n2. Proof-of-work mining that makes cheating expensive\n3. A fixed supply that can't be changed\n\nThis created the first truly scarce digital asset in history.",
        reflection: "How does this change what's possible with digital technology?",
        insights: [
          "Digital scarcity enables digital property rights",
          "Proof-of-work converts energy into digital security",
          "Fixed supply creates digital gold-like properties"
        ]
      }
    }
  ];

  const renderStep = (step, index) => {
    if (!step) return null;

    switch (step.type) {
      case 'intro':
        return (
          <div className="step-content intro-step">
            <div className="step-icon">
              <Bitcoin size={48} />
            </div>
            <h2>{step.content.title}</h2>
            <p className="intro-text">{step.content.text}</p>
            <button 
              className="continue-button"
              onClick={() => handleStepComplete(index)}
            >
              Start Learning
            </button>
          </div>
        );
      
      case 'interactive':
        return (
          <div className="step-content interactive-step">
            <h3>{step.content.scenario}</h3>
            {step.content.steps && (
              <ul className="scenario-steps">
                {step.content.steps.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            )}
            {step.content.simulation && (
              <div className="simulation-container">
                <p>{step.content.simulation.setup}</p>
                <div className="scenarios-grid">
                  {step.content.simulation.scenarios.map((scenario, i) => (
                    <div key={i} className="scenario-card">
                      <h4>{scenario.title}</h4>
                      <p>{scenario.description}</p>
                      <div className="outcome">Outcome: {scenario.outcome}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {step.content.question && (
              <div className="question-section">
                <h4>🤔 {step.content.question}</h4>
                {step.content.options && (
                  <div className="options-grid">
                    {step.content.options.map((option, i) => (
                      <button
                        key={i}
                        className="option-button"
                        onClick={() => {
                          if (i === step.content.correctAnswer) {
                            handleStepComplete(index);
                          }
                        }}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
                {step.content.explanation && (
                  <p className="explanation">{step.content.explanation}</p>
                )}
              </div>
            )}
          </div>
        );

      case 'discovery':
        return (
          <div className="step-content discovery-step">
            <div className="scenario-section">
              <h3>🔍 {step.content.scenario}</h3>
            </div>
            {step.content.thoughtExperiment && (
              <div className="thought-experiment">
                <h4>💭 {step.content.thoughtExperiment}</h4>
                <div className="hints-container">
                  {step.content.hints.map((hint, i) => (
                    <div key={i} className="hint-card">
                      <span className="hint-number">{i + 1}</span>
                      {hint}
                    </div>
                  ))}
                </div>
              </div>
            )}
            {step.content.challenge && (
              <div className="challenge-section">
                <p>{step.content.challenge}</p>
                <div className="reflection-prompt">
                  <h4>🤔 {step.content.reflection}</h4>
                  <div className="insights-grid">
                    {step.content.insights.map((insight, i) => (
                      <div key={i} className="insight-card">
                        <span className="insight-number">{i + 1}</span>
                        {insight}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            {step.content.revelation && (
              <div className="revelation-section">
                <h4>💡 Discovery</h4>
                <p>{step.content.revelation}</p>
              </div>
            )}
            <button 
              className="continue-button"
              onClick={() => handleStepComplete(index)}
            >
              I Understand
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="module-container">
      <div className="module-header">
        <h1 className="module-title">
          <Bitcoin className="module-icon" />
          Bitcoin Basics
        </h1>
        {completedSteps.size === steps.length && (
          <div className="completion-badge">
            <Trophy size={24} />
            Completed!
          </div>
        )}
      </div>

      <div className="module-progress">
        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ width: `${(completedSteps.size / steps.length) * 100}%` }}
          />
        </div>
        <span className="progress-text">
          {completedSteps.size} / {steps.length} steps completed
        </span>
      </div>

      <div className="module-content">
        {currentStep < steps.length ? (
          renderStep(steps[currentStep], currentStep)
        ) : (
          <div className="module-complete">
            <div className="complete-icon">
              <CheckCircle size={48} />
            </div>
            <h2>Module Complete!</h2>
            <p>You've completed the Bitcoin Basics module. Ready to dive deeper?</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BitcoinBasicsModule; 