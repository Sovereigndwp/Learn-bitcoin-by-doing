import React, { useState, useEffect } from 'react';
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

  const handleTabClick = (stepIndex) => {
    setCurrentStep(stepIndex);
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
        conclusion: "These questions led to one of the most important innovations of the 21st century. Let's explore what it is, how it works, and why it matters."
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
      type: "simulator",
      content: {
        scenario: "Experience the difference: sending $1,000 to a friend in another country.",
        instruction: "Click the buttons below to see how each system works:",
        question: "Which would you choose?",
        options: [
          "🏦 Stick with the bank. I like surprises and delays",
          "₿ Explore more about Bitcoin... this feels like real freedom"
        ],
        correctAnswer: 1,
        explanation: "This is why Bitcoin doesn't just tweak the system, it replaces it entirely."
      }
    },
    {
      title: "Carlos's Export: Traditional vs Bitcoin",
      type: "comparison",
      content: {
        title: "Carlos's Export: Traditional vs Bitcoin",
        intro: "Remember Carlos exporting roses from Colombia to Japan? Let's see how his experience changes with Bitcoin versus traditional banking.",
        comparison: {
          traditional: {
            title: "🏦 Traditional Banking Route",
            problems: [
              "USD to COP conversion at bank's rates",
              "2-5 business day transfer delays",
              "Multiple intermediary bank fees",
              "Currency volatility during transfer period",
              "Potential transaction blocks or freezes"
            ],
            outcome: "Carlos loses money to fees, delays, and volatility"
          },
          bitcoin: {
            title: "₿ Bitcoin Route", 
            benefits: [
              "Direct peer-to-peer transfer in ~10 minutes",
              "No currency conversion needed",
              "Minimal transaction fees (~$1-5)",
              "No intermediary banks taking cuts",
              "Unstoppable - no permission required"
            ],
            outcome: "Carlos receives full payment value quickly"
          }
        },
        question: "Which system would you choose for international business?",
        demoLink: "https://layer-d.my.canva.site/bitcoin-transaction-demo-bydalia"
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

  // Simulator Components
  const FiatColumn = () => {
    const [step, setStep] = useState(0);
    const [delayed, setDelayed] = useState(false);

    useEffect(() => {
      if ([1, 2, 3].includes(step)) {
        setDelayed(true);
        const timeout = setTimeout(() => setDelayed(false), 2000);
        return () => clearTimeout(timeout);
      }
    }, [step]);

    const steps = [
      "Click 'Send $1,000' to start.",
      "Your bank is verifying the request...",
      "Routing through intermediary bank #1... (Fee: $15)",
      "Routing through intermediary bank #2... (Fee: $22)",
      "Destination bank requires additional verification.",
      "Transfer delayed 2–3 business days...",
      "Funds pending. Your friend might receive: $930."
    ];

    return (
      <div className="simulator-column fiat-column">
        <h3>🏦 Traditional Bank</h3>
        <div className="simulator-content">
          <p className="simulator-step">{steps[step]}</p>
          <button
            onClick={() => setStep((prev) => Math.min(prev + 1, steps.length - 1))}
            disabled={delayed || step === steps.length - 1}
            className={`simulator-button ${delayed ? 'disabled' : ''}`}
          >
            {step === 0 ? "Send $1,000" : delayed ? "Processing..." : "Next"}
          </button>
          {step === steps.length - 1 && (
            <div className="final-result fiat-result">
              <p>❌ Total fees: $70 • Delays: 3-5 days</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  const BitcoinColumn = () => {
    const [step, setStep] = useState(0);

    const steps = [
      "Click 'Send $1,000' to start.",
      "Scan your friend's QR code.",
      "Transaction broadcast to the network.",
      "Waiting for confirmations...",
      "Success! Your friend received 100% of the $1,000."
    ];

    return (
      <div className="simulator-column bitcoin-column">
        <h3>₿ Bitcoin</h3>
        <div className="simulator-content">
          <p className="simulator-step">{steps[step]}</p>
          <button
            onClick={() => setStep((prev) => Math.min(prev + 1, steps.length - 1))}
            disabled={step === steps.length - 1}
            className="simulator-button bitcoin-button"
          >
            {step === 0 ? "Send $1,000" : "Next"}
          </button>
          {step === steps.length - 1 && (
            <div className="final-result bitcoin-result">
              <p>✅ Fee: ~$2 • Time: ~10 minutes</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderStep = (step, index) => {
    if (!step) return null;

    switch (step.type) {
      case 'simulator':
        return (
          <div className="step-content simulator-step">
            <div className="module-header-box">
              <h2>{step.title}</h2>
              <div className="intro-text">
                <p>{step.content.scenario}</p>
                <p>{step.content.instruction}</p>
              </div>
            </div>

            <div className="simulator-container">
              <div className="simulator-grid">
                <FiatColumn />
                <BitcoinColumn />
              </div>
            </div>

            <div className="quiz-content">
              <h3>🤔 {step.content.question}</h3>
              <div className="options">
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
              {step.content.explanation && (
                <div className="feedback-section correct">
                  <p className="feedback-result">✅ Correct!</p>
                  <p className="takeaway">{step.content.explanation}</p>
                </div>
              )}
            </div>
          </div>
        );

      case 'comparison':
        return (
          <div className="step-content comparison-step">
            <div className="module-header-box">
              <h2>{step.content.title}</h2>
              <div className="intro-text">
                <p>{step.content.intro}</p>
              </div>
              <div className="demo-section">
                <h3>🔍 See Bitcoin in Action</h3>
                <p>Experience how a Bitcoin transaction works compared to traditional banking:</p>
                <button
                  className="link-button"
                  onClick={() => window.open(step.content.demoLink, '_blank')}
                >
                  Try Bitcoin Transaction Demo
                </button>
              </div>
            </div>

            <div className="comparison-container">

              <div className="comparison-grid">
                <div className="traditional-side">
                  <h3>{step.content.comparison.traditional.title}</h3>
                  <div className="problems-list">
                    {step.content.comparison.traditional.problems.map((problem, i) => (
                      <div key={i} className="problem-item">
                        <span className="problem-icon">❌</span>
                        <span>{problem}</span>
                      </div>
                    ))}
                  </div>
                  <div className="outcome traditional-outcome">
                    <strong>Result:</strong> {step.content.comparison.traditional.outcome}
                  </div>
                </div>

                <div className="bitcoin-side">
                  <h3>{step.content.comparison.bitcoin.title}</h3>
                  <div className="benefits-list">
                    {step.content.comparison.bitcoin.benefits.map((benefit, i) => (
                      <div key={i} className="benefit-item">
                        <span className="benefit-icon">✅</span>
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                  <div className="outcome bitcoin-outcome">
                    <strong>Result:</strong> {step.content.comparison.bitcoin.outcome}
                  </div>
                </div>
              </div>

              <div className="reflection-question">
                <h3>🤔 {step.content.question}</h3>
                <button 
                  className="continue-button"
                  onClick={() => handleStepComplete(index)}
                >
                  I See the Difference
                </button>
              </div>
            </div>
          </div>
        );

      case 'reflection':
        return (
          <div className="step-content reflection-step">
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
                Continue
              </button>
            </div>
          </div>
        );

      case 'intro':
        return (
          <div className="step-content intro-step">
            <div className="module-header-box">
              <h2>{step.content.title}</h2>
            </div>
            <div className="content-text">
              <p className="intro-text">{step.content.text}</p>
              <button 
                className="continue-button"
                onClick={() => handleStepComplete(index)}
              >
                {index === 1 ? 'Continue Learning' : 'Start Learning'}
              </button>
            </div>
          </div>
        );
      
      case 'interactive':
        return (
          <div className="step-content interactive-step">
            <div className="module-header-box">
              <h2>{step.title}</h2>
              <div className="intro-text">
                <p>{step.content.scenario}</p>
              </div>
            </div>

            {step.content.steps && (
              <div className="scenario-section">
                <ul className="scenario-steps">
                  {step.content.steps.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>
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
              <div className="quiz-content">
                <h3>🤔 {step.content.question}</h3>
                {step.content.options && (
                  <div className="options">
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
                  <div className="feedback-section correct">
                    <p className="feedback-result">✅ Correct!</p>
                    <p className="takeaway">{step.content.explanation}</p>
                  </div>
                )}
              </div>
            )}

            {step.content.discussion && (
              <div className="key-points">
                <p>{step.content.discussion}</p>
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
            <div className="module-header-box">
              <h2>{step.title}</h2>
            </div>

            <div className="quiz-content">
              <div className="scenario-section">
                <h3>🔍 Scenario</h3>
                <p>{step.content.scenario}</p>
              </div>

              {step.content.thoughtExperiment && (
                <div className="thought-experiment">
                  <h3>💭 Think About It</h3>
                  <p>{step.content.thoughtExperiment}</p>
                  
                  <div className="hints-container">
                    <h4>Hints:</h4>
                    {step.content.hints.map((hint, i) => (
                      <div key={i} className="hint-card">
                        <span className="hint-number">{i + 1}</span>
                        <p>{hint}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {step.content.reflection && (
                <div className="challenge-section">
                  <h3>🤔 {step.content.reflection}</h3>
                  <div className="insights-grid">
                    {step.content.insights.map((insight, i) => (
                      <div key={i} className="insight-card">
                        <span className="insight-number">{i + 1}</span>
                        <p>{insight}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {step.content.revelation && (
                <div className="revelation-section">
                  <h3>💡 Discovery</h3>
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

      {/* Horizontal Tab Navigation */}
      <div className="top-navigation">
        {steps.map((step, index) => (
          <button
            key={index}
            className={`top-nav-button ${
              index === currentStep ? 'active' : ''
            } ${completedSteps.has(index) ? 'completed' : ''}`}
            onClick={() => handleTabClick(index)}
          >
            <span className="nav-text">
              {index + 1}. {step.title.length > 20 ? `${step.title.substring(0, 17)}...` : step.title}
            </span>
          </button>
        ))}
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