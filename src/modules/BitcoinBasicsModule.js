import React, { useState } from 'react';
import { useProgress } from '../contexts/ProgressContext';
import { Bitcoin, CheckCircle, Trophy } from 'lucide-react';
import '../components/ModuleLayout.css';
import '../components/ModuleCommon.css';
import './BitcoinBasicsModule.css';

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
      title: "What Would Better Money Look Like?",
      type: "reflection",
      content: {
        title: "What Would Better Money Look Like?",
        intro: "If money today can be frozen, inflated, or blocked...",
        questions: [
          "Then maybe the problem isn't money itself—it's who controls it."
        ],
        mainQuestion: "So ask yourself:",
        socratics: [
          "What if no one could stop you from using your money?",
          "What if no one could secretly create more of it?",
          "What if you didn't need permission to spend, save, or send it?",
          "What if money could work equally for anyone, anywhere?"
        ],
        conclusion: "These questions led to one of the most important innovations of the 21st century. Let's explore what it is—and why it matters."
      }
    },
    {
      title: "So, What Is Bitcoin?",
      type: "intro",
      content: {
        title: "So, What Is Bitcoin?",
        text: "Bitcoin isn't just digital money.\n\nIt's a radical redesign of money itself—built to solve the very problems traditional money can't.\n\nIt removes the need to trust banks or governments.\nIt can't be inflated, blocked, or seized.\nIt works globally, 24/7, without permission.\n\nHow? It combines cryptography, computer science, and game theory into something entirely new: a decentralized digital currency that runs on rules, not rulers."
      }
    },
    {
      title: "Sending Money Across Borders",
      type: "interactive",
      content: {
        scenario: "Imagine you want to send $1,000 to a friend in another country.",
        steps: [
          "Your bank deducts the money from your account",
          "It passes through 2–3 intermediary banks",
          "Each one takes a cut",
          "It takes 3–5 business days",
          "Your friend's bank might even block it"
        ],
        question: "What's the real problem here?",
        options: [
          "Too many middlemen",
          "High fees and unnecessary delays",
          "Your money isn't truly yours",
          "All of the above"
        ],
        correctAnswer: 3,
        explanation: "This is why Bitcoin doesn't just tweak the system—it replaces it."
      }
    },
    {
      title: "The Double-Spend Problem",
      type: "discovery",
      content: {
        scenario: "Imagine you create a digital coin—a simple computer file that says '1 Coin.'\n\nWhat's stopping someone from:\n\n• Copying it infinitely?\n\n• Sending the same coin to multiple people?\n\n• Creating new coins out of thin air?\n\nThis is the 'double-spend' problem. Before Bitcoin, the only solution was to trust banks to keep track of everything.",
        thoughtExperiment: "Can you think of a way to solve this without a bank?",
        hints: [
          "What if everyone kept a copy of all transactions?",
          "What if we agreed on the order of those transactions?",
          "What if cheating the system was incredibly expensive?"
        ],
        revelation: "That's exactly how Bitcoin works. It uses a shared public ledger (blockchain) and mining to secure the system without trust."
      }
    },
    {
      title: "The Power of Decentralization",
      type: "interactive",
      content: {
        scenario: "What happens when one central authority controls the money system?",
        simulation: {
          setup: "Let's simulate a few scenarios:",
          scenarios: [
            {
              title: "Scenario 1: Central Point of Failure",
              description: "A traditional bank goes down for maintenance",
              outcome: "No one can send or receive money"
            },
            {
              title: "Scenario 2: Bitcoin Node Goes Down",
              description: "One or many Bitcoin nodes stop working",
              outcome: "The network keeps running like nothing happened"
            },
            {
              title: "Scenario 3: Attempted Censorship",
              description: "Someone tries to block certain transactions",
              outcome: "Bitcoin routes around the censorship"
            }
          ]
        },
        question: "Why is this kind of decentralization essential for global money?",
        discussion: "Decentralization isn't just a technical feature—it's fundamental to creating unstoppable money. No single point of failure means no single point of control."
      }
    },
    {
      title: "Digital Scarcity",
      type: "discovery",
      content: {
        scenario: "Before Bitcoin, anything digital could be copied endlessly—music, photos, PDFs, you name it.\n\nBut money doesn't work if everyone can make their own version.\n\nBitcoin solved this by creating the first digitally scarce asset:\n\nA public ledger anyone can verify\nProof-of-work that makes cheating expensive\nA fixed supply that no one can change",
        reflection: "How does this change what's possible with digital technology?",
        insights: [
          "Now, we can have true digital property rights",
          "Now, we can convert energy into security and trust",
          "Now, we have digital gold that anyone can hold"
        ]
      }
    }
  ];

  const renderStep = (step, index) => {
    if (!step) return null;

    switch (step.type) {
      case 'reflection':
        return (
          <div className="step-content reflection-step">
            <div className="step-icon">
              <Bitcoin size={48} />
            </div>
            <div className="module-header-box">
              <h2>{step.content.title}</h2>
            </div>
            
            <div className="reflection-content">
              <h3>{step.content.intro}</h3>
              <div className="problem-questions">
                {step.content.questions.map((question, i) => (
                  <p key={i} className="problem-question">{question}</p>
                ))}
              </div>
              
              <div className="main-question">
                <h3>{step.content.mainQuestion}</h3>
              </div>
              
              <div className="socratic-questions">
                {step.content.socratics.map((question, i) => (
                  <div key={i} className="socratic-question">
                    <span className="question-mark">🤔</span>
                    <p>{question}</p>
                  </div>
                ))}
              </div>
              
              {step.content.conclusion && (
                <div className="conclusion-section">
                  <p>{step.content.conclusion}</p>
                </div>
              )}
              
              <button 
                className="continue-button"
                onClick={() => handleStepComplete(index)}
              >
                I've Thought About It
              </button>
            </div>
          </div>
        );

      case 'intro':
        return (
          <div className="step-content intro-step">
            <div className="step-icon">
              <Bitcoin size={48} />
            </div>
            <div className="module-header-box">
              <h2>{step.content.title}</h2>
            </div>
            <p className="intro-text">{step.content.text}</p>
            <button 
              className="continue-button"
              onClick={() => handleStepComplete(index)}
            >
              {index === 1 ? 'Continue Learning' : 'Start Learning'}
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
                {step.content.discussion && (
                  <p className="discussion">{step.content.discussion}</p>
                )}
              </div>
            )}
            {step.content.question && !step.content.options && (
              <button 
                className="continue-button"
                onClick={() => handleStepComplete(index)}
              >
                Continue
              </button>
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