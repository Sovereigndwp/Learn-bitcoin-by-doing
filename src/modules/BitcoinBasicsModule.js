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
      title: "What If Hiroshi Tried to Be Sneaky?",
      type: "double-spend-game",
      content: {
        title: "🌸 What If Hiroshi Tried to Be Sneaky?",
        subtitle: "Remember our flower trader? Let's see what happens if he tries to cheat the system.",
        scenario: "Hiroshi's digital wallet has $430. He owes Carlos $430 for roses, but he also wants to keep that money for himself.",
        instruction: "What if Hiroshi opens his wallet app on his phone AND his computer at the same time? Click both buttons quickly:",
        buttons: ["📱 Phone: Send $430 to Carlos (for roses)", "💻 Computer: Send $430 to himself (to keep it)"],
        conflictMessage: "💥 Uh-oh: Hiroshi just tried to spend the same $430 twice! Both transactions are being processed...",
        insight: "Digital files are easy to copy — like photos, emails, or documents. With traditional digital money, what's stopping someone from 'copying' their payment and sending it twice?",
        question: "In a world without banks watching every transaction, what prevents people like Hiroshi from cheating?",
        options: [
          "The wallet app would catch it automatically",
          "Carlos would notice and complain", 
          "Hiroshi's phone and computer would sync",
          "There needs to be some way for everyone to agree on what really happened"
        ],
        correctAnswer: 3,
        explanation: "Exactly! Without a bank as the middleman, we need a different way to make sure everyone agrees on the truth. Let's see how that works."
      }
    },
    {
      title: "How Does Everyone Agree on the Truth?",
      type: "consensus-game",
      content: {
        title: "🤝 How Does Everyone Agree on the Truth?",
        scenario: "After Hiroshi's sneaky attempt, three different people saw different things happen. Carlos, Hiroshi's wife, and a flower shop witness all have different stories.",
        instruction: "Which version of events should everyone believe? Click on what you think is the truth:",
        ledgers: [
          { id: "Carlos", content: "I received $430 from Hiroshi for the roses ✅", valid: false },
          { id: "Wife", content: "Hiroshi sent me back the $430 he owed me ✅", valid: false },
          { id: "Witness", content: "Hiroshi tried to send the same money twice - FRAUD ⚠️", valid: true }
        ],
        questions: [
          "How do we figure out who's telling the truth when there's no bank to ask?",
          "What if thousands of people all saw different things happen?"
        ],
        solution: {
          title: "The Community Watchdogs",
          steps: [
            "📱 Everyone keeps a copy of all transactions on their phones",
            "👥 When someone tries to cheat, the community notices immediately",
            "🗳️ The majority decides what really happened", 
            "✅ Everyone updates their records to match the truth",
            "🏆 Honest record-keepers get rewarded for their work"
          ],
          insight: "In Bitcoin, thousands of people around the world keep identical copies of every transaction. When someone tries to cheat, the majority quickly spots it and rejects the fraud.",
          analogy: "It's like having thousands of security cameras all recording the same event. If one camera shows something different, you know that one is lying.",
          finalQuestion: "If thousands of people all agree on what happened, and liars get caught immediately, is that more trustworthy than just trusting one bank?"
        }
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

  // Double Spend Game Component
  const DoubleSpendGame = ({ content, onComplete }) => {
    const [aliceSent, setAliceSent] = useState(false);
    const [bobSent, setBobSent] = useState(false);
    const [showConflict, setShowConflict] = useState(false);
    const [showQuiz, setShowQuiz] = useState(false);

    useEffect(() => {
      if (aliceSent && bobSent) {
        setTimeout(() => setShowConflict(true), 1000);
        setTimeout(() => setShowQuiz(true), 3000);
      }
    }, [aliceSent, bobSent]);

         return (
       <div className="double-spend-game">
         <div className="wallet-display">
           <h3>💰 Hiroshi's Digital Wallet</h3>
           <div className="balance">Balance: $430</div>
           <div className="context">Payment needed: $430 for Carlos's roses 🌹</div>
         </div>

         <div className="device-scenario">
           <div className="scenario-text">
             <p>Hiroshi gets a sneaky idea: "What if I open my wallet on both devices and try to send the same money twice?"</p>
           </div>
         </div>

         <div className="transaction-buttons">
           <button
             className={`transaction-btn carlos-btn ${aliceSent ? 'sent' : ''}`}
             onClick={() => setAliceSent(true)}
             disabled={aliceSent}
           >
             {aliceSent ? "✅ Sent to Carlos" : content.buttons[0]}
           </button>
           <button
             className={`transaction-btn self-btn ${bobSent ? 'sent' : ''}`}
             onClick={() => setBobSent(true)}
             disabled={bobSent}
           >
             {bobSent ? "✅ Sent to Self" : content.buttons[1]}
           </button>
         </div>

        {(aliceSent || bobSent) && !showConflict && (
          <div className="processing">
            <p>⏳ Processing transaction...</p>
          </div>
        )}

        {showConflict && (
          <div className="conflict-message">
            <h3>{content.conflictMessage}</h3>
            <div className="insight-box">
              <p>💡 {content.insight}</p>
            </div>
          </div>
        )}

        {showQuiz && (
          <div className="quiz-section">
            <h3>🤔 {content.question}</h3>
            <div className="options">
              {content.options.map((option, i) => (
                <button
                  key={i}
                  className="option-button"
                  onClick={() => onComplete()}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  // Consensus Game Component
  const ConsensusGame = ({ content, onComplete }) => {
    const [selectedLedger, setSelectedLedger] = useState(null);
    const [showQuestions, setShowQuestions] = useState(false);
    const [showSolution, setShowSolution] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);

    const handleLedgerSelect = (ledger) => {
      setSelectedLedger(ledger);
      setTimeout(() => setShowQuestions(true), 1000);
    };

    const showNextStep = () => {
      if (currentStep < content.solution.steps.length) {
        setCurrentStep(currentStep + 1);
      } else {
        setShowSolution(true);
      }
    };

    return (
      <div className="consensus-game">
        <div className="scenario-setup">
          <p>{content.scenario}</p>
          <p><strong>{content.instruction}</strong></p>
        </div>

        <div className="ledger-options">
          {content.ledgers.map((ledger, i) => (
            <div
              key={ledger.id}
              className={`ledger-option ${selectedLedger?.id === ledger.id ? 'selected' : ''}`}
              onClick={() => handleLedgerSelect(ledger)}
            >
              <h4>Ledger {ledger.id}</h4>
              <p>{ledger.content}</p>
              {selectedLedger?.id === ledger.id && (
                <div className="selection-result">
                  {ledger.valid ? "✅ Correct choice!" : "❌ Not quite..."}
                </div>
              )}
            </div>
          ))}
        </div>

        {showQuestions && (
          <div className="reflection-questions">
            {content.questions.map((question, i) => (
              <div key={i} className="question-bubble">
                <p>❓ {question}</p>
              </div>
            ))}
            <button className="reveal-button" onClick={() => setShowSolution(true)}>
              Reveal the Answer
            </button>
          </div>
        )}

        {showSolution && (
          <div className="solution-reveal">
            <h3>{content.solution.title}</h3>
            
            <div className="consensus-steps">
              {content.solution.steps.map((step, i) => (
                <div key={i} className={`step-item ${i <= currentStep ? 'revealed' : ''}`}>
                  {step}
                </div>
              ))}
            </div>

            {currentStep < content.solution.steps.length ? (
              <button className="next-step-button" onClick={showNextStep}>
                Next Step
              </button>
            ) : (
              <div className="final-insights">
                <div className="insight-box">
                  <p>🧠 {content.solution.insight}</p>
                </div>
                <div className="analogy-box">
                  <p>🗨️ {content.solution.analogy}</p>
                </div>
                <div className="final-question">
                  <h3>🤔 {content.solution.finalQuestion}</h3>
                  <button className="continue-button" onClick={onComplete}>
                    Continue to Learn More
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

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
      case 'double-spend-game':
        return (
          <div className="step-content game-step">
            <div className="module-header-box">
              <h2>{step.content.title}</h2>
              <div className="intro-text">
                <p>{step.content.subtitle}</p>
                <p>{step.content.scenario}</p>
                <p><strong>{step.content.instruction}</strong></p>
              </div>
            </div>

            <DoubleSpendGame 
              content={step.content} 
              onComplete={() => handleStepComplete(index)} 
            />
          </div>
        );

      case 'consensus-game':
        return (
          <div className="step-content game-step">
            <div className="module-header-box">
              <h2>{step.content.title}</h2>
            </div>

            <ConsensusGame 
              content={step.content} 
              onComplete={() => handleStepComplete(index)} 
            />
          </div>
        );

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