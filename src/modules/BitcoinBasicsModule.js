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
      title: "Is it really that simple?",
      type: "simulator",
      content: {
        scenario: "Experience the difference: sending $10 to a sister in Colombia.",
        instruction: "Click the buttons below to see how each system works:",
        question: "Which would you choose?",
        options: [
          "Stick with the bank. I like surprises and delays",
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
            title: " Traditional Banking Route",
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
        title: "How Does Everyone Agree on the Truth?",
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
    const [gameStep, setGameStep] = useState(0); // 0: setup, 1: voting, 2: results
    const [votedFor, setVotedFor] = useState(Array(9).fill(null));
    const [bribeUsed, setBribeUsed] = useState(false);
    const [showFinalQuestion, setShowFinalQuestion] = useState(false);

    const voters = ['🧑‍💼', '🧑‍🌾', '🧕', '🧔‍♂️', '👩‍⚕️', '🧑‍🏫', '🧓', '🧑‍🎨', '👨‍🔬'];

    const attemptDoubleSpend = () => {
      setTimeout(() => setGameStep(1), 1500);
    };

    const castVotes = (withBribe = false) => {
      setBribeUsed(withBribe);
      const newVotes = voters.map((_, idx) => {
        if (withBribe && idx < 3) return 'Daughter'; // Bribe worked on first 3
        return Math.random() > 0.5 ? 'Carlos' : 'Daughter';
      });
      setVotedFor(newVotes);
      setTimeout(() => setGameStep(2), 2000);
    };

    const countVotes = () => {
      const carlosVotes = votedFor.filter((v) => v === 'Carlos').length;
      const daughterVotes = votedFor.filter((v) => v === 'Daughter').length;
      return carlosVotes > daughterVotes ? 'Carlos' : 'Daughter';
    };

    const winner = gameStep === 2 ? countVotes() : null;

    if (gameStep === 0) {
      return (
        <div className="double-spend-game">
          <div className="wallet-display">
            <h3>💰 Hiroshi's Digital Wallet</h3>
            <div className="balance">Balance: $430</div>
            <div className="context">He needs to pay Carlos $430 for roses 🌹</div>
          </div>

          <div className="device-scenario">
            <div className="scenario-text">
              <p>Hiroshi gets sneaky: "What if I try to spend this money twice? Once to pay Carlos for the roses, and once as a graduation gift to my daughter?"</p>
            </div>
          </div>

          <div className="transaction-preview">
            <div className="transaction-box carlos-transaction">
              <h4>📱 Transaction A</h4>
              <p>Send $430 to Carlos (for roses)</p>
            </div>
            <div className="transaction-box daughter-transaction">
              <h4>💻 Transaction B</h4>
              <p>Send $430 to Daughter (graduation gift)</p>
            </div>
          </div>

          <div className="attempt-section">
            <button className="double-spend-btn" onClick={attemptDoubleSpend}>
              🎯 Try to Send Both Transactions!
            </button>
            <p className="hint">Click to see what happens when Hiroshi tries to cheat...</p>
          </div>
        </div>
      );
    }

    if (gameStep === 1) {
      return (
        <div className="double-spend-game">
          <div className="conflict-detected">
            <h3>🚨 Network Detects Conflict!</h3>
            <p>Two transactions trying to spend the same $430! The network must decide which one is valid.</p>
          </div>

          <div className="voter-section">
            <h4>🗳️ 9 Network Participants Are Voting:</h4>
            <div className="voters">
              {voters.map((voter, idx) => (
                <div key={idx} className="voter">
                  <span className="voter-emoji">{voter}</span>
                  <div className="voter-status">Deciding...</div>
                </div>
              ))}
            </div>
          </div>

          <div className="voting-options">
            <button className="vote-btn honest" onClick={() => castVotes(false)}>
              Let Them Vote Honestly
            </button>
            <button className="vote-btn bribe" onClick={() => castVotes(true)}>
              💰 Try to Bribe 3 Voters (Risky!)
            </button>
          </div>
        </div>
      );
    }

    if (gameStep === 2) {
      return (
        <div className="double-spend-game">
          <div className="voting-results">
            <h3>🗳️ Votes Are In!</h3>
            <div className="voters">
              {votedFor.map((vote, idx) => (
                <div key={idx} className={`voter voted ${vote.toLowerCase()}`}>
                  <span className="voter-emoji">{voters[idx]}</span>
                  <div className="vote-choice">Voted: {vote}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="final-result">
            <div className={`winner-announcement ${winner?.toLowerCase()}`}>
              <h3>🏆 Network Decision: {winner} Wins!</h3>
              <p>
                {winner === 'Carlos' 
                  ? "The transaction to Carlos (for roses) was accepted. Hiroshi's daughter got nothing."
                  : "The transaction to Hiroshi's daughter was accepted. Carlos didn't get paid!"}
              </p>
            </div>

            {bribeUsed && winner === 'Daughter' && (
              <div className="bribe-success">
                <p>💰 Your bribe worked! But now everyone knows the system can be corrupted...</p>
              </div>
            )}

            {bribeUsed && winner === 'Carlos' && (
              <div className="bribe-failed">
                <p>💸 Your bribe failed! Not enough corrupt voters, and you lost your bribe money too.</p>
              </div>
            )}
          </div>

          <div className="ledger-update">
            <h4>📒 Everyone's Ledger Now Shows:</h4>
            <div className="ledger-entry">
              Hiroshi → {winner}: $430 {winner === 'Carlos' ? '(roses payment)' : '(graduation gift)'}
            </div>
          </div>

          {!showFinalQuestion && (
            <button 
              className="continue-button"
              onClick={() => setShowFinalQuestion(true)}
            >
              What's the Problem Here?
            </button>
          )}

          {showFinalQuestion && (
            <div className="final-question-section">
              <h3>🤔 What did you learn?</h3>
              <div className="lesson-options">
                <button className="lesson-btn" onClick={onComplete}>
                  Only ONE transaction wins, but it's still not fair to the loser
                </button>
                <button className="lesson-btn" onClick={onComplete}>
                  The network can be corrupted if enough people are dishonest
                </button>
                <button className="lesson-btn" onClick={onComplete}>
                  We need a better way to prevent double spending attempts
                </button>
              </div>
            </div>
          )}
        </div>
      );
    }
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
      if ([1, 2, 3, 4, 5, 6, 7, 8].includes(step)) {
        setDelayed(true);
        // Longer delays for more realistic feel
        const delayTime = step <= 3 ? 2500 : 3000;
        const timeout = setTimeout(() => setDelayed(false), delayTime);
        return () => clearTimeout(timeout);
      }
    }, [step]);

    const steps = [
      "Click 'Send $10' to start.",
      "Your US bank is verifying your identity...",
      "Checking for fraud and compliance (AML/KYC)...",
      "Converting USD to Colombian Pesos (Fee: $1.50)...",
      "Routing through correspondent bank in New York...",
      "Routing through correspondent bank in Miami...", 
      "Connecting to Colombian partner bank...",
      "Your sister's Colombian bank is processing...",
      "Additional verification for international transfer...",
      "Transfer delayed 3-5 business days...",
      "Complete! Your sister received: $6.50 worth in Colombian Pesos."
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
            {step === 0 ? "Send $10" : delayed ? "Processing..." : "Next"}
          </button>
          {step === steps.length - 1 && (
            <div className="final-result fiat-result">
              <p>❌ Total fees: $3.50 • Delays: 3-5 days</p>
              <p className="conversion-loss">Exchange rate loss + processing fees</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  const BitcoinColumn = () => {
    const [step, setStep] = useState(0);
    const [btcPrice, setBtcPrice] = useState(null);
    const [btcAmount, setBtcAmount] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchBitcoinPrice = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');
        const data = await response.json();
        const price = data.bitcoin.usd;
        setBtcPrice(price);
        setBtcAmount((10 / price).toFixed(8)); // Convert $10 to BTC
      } catch (error) {
        console.error('Error fetching Bitcoin price:', error);
        setBtcPrice(50000); // Fallback price
        setBtcAmount((10 / 50000).toFixed(8));
      }
      setLoading(false);
    };

    useEffect(() => {
      fetchBitcoinPrice();
    }, []);

    const getStepText = () => {
      switch(step) {
        case 0:
          return "Click 'Send $10' to start.";
        case 1:
          return loading ? "Getting current Bitcoin price..." : 
                 btcPrice ? `Converting $10 → ${btcAmount} BTC (@ $${btcPrice.toLocaleString()})` : 
                 "Converting $10 to Bitcoin...";
        case 2:
          return "Sending Bitcoin directly to your sister in Colombia...";
        case 3:
          return "Recording transaction on the global Bitcoin ledger...";
        case 4:
          return `Success! Your sister received ${btcAmount} BTC (worth $10 USD)`;
        default:
          return "";
      }
    };

    return (
      <div className="simulator-column bitcoin-column">
        <h3>₿ Bitcoin</h3>
        <div className="simulator-content">
          <p className="simulator-step">{getStepText()}</p>
          <button
            onClick={() => setStep((prev) => Math.min(prev + 1, 4))}
            disabled={step === 4 || loading}
            className="simulator-button bitcoin-button"
          >
            {step === 0 ? "Send $10" : loading ? "Loading..." : "Next"}
          </button>
          {step === 4 && (
            <div className="final-result bitcoin-result">
              <p>✅ Fee: ~$0.50 • Time: ~10 minutes</p>
              <p className="btc-conversion">
                Sent: {btcAmount} BTC
              </p>
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