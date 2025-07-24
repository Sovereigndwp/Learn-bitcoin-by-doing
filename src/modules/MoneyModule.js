import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '../contexts/ProgressContext';
import { 
  ContinueButton, 
  ActionButton
} from '../components/EnhancedButtons';
import { ModuleCompletionButton } from '../components/ui';
// Import new visual system components
import { 
  BitcoinIcon
} from '../components/ui/SVGIcons';
import MoneyPredictionChart from '../components/MoneyPredictionChart';
import DigitalScarcity from '../pages/DigitalScarcity';
// Using InteractiveIcon for all visual elements - no more GIFs or Lottie
import '../components/ModuleCommon.css';
// Using global CSS only - no module-specific overrides

// Simplified Introduction 
const Introduction = ({ onComplete }) => {
  const [currentDemo, setCurrentDemo] = useState(0);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [demoResults, setDemoResults] = useState({});

  const modernPaymentDemos = [
    {
      title: "💳 Card Payment",
      description: "You tap your card. Money moves instantly.",
      action: "See What Happens",
      effect: "✨ $25 sent successfully!",
      hidden: "What actually happens: 7 companies process this, across 3 countries, with multiple fees and delays..."
    },
    {
      title: "📱 Send Money to Friend",
      description: "You send $20 through your phone app.",
      action: "Look Behind the Scenes", 
      effect: "💸 Money sent instantly!",
      hidden: "Hidden steps: ID checks, spending limits, tracking systems, bank connections, possible account freezing..."
    },
    {
      title: "🌍 Send Money Overseas",
      description: "Send $500 to family in another country.",
      action: "Follow the Money",
      effect: "🚀 Transfer started!",
      hidden: "Reality: Takes 3-5 days, costs $15-50, poor exchange rates, lots of paperwork..."
    }
  ];

  const currentDemoData = modernPaymentDemos[currentDemo];

  const handleDemoAction = () => {
    setDemoResults(prev => ({ ...prev, [currentDemo]: true }));  // Track completion
    
    setTimeout(() => {
      if (currentDemo < modernPaymentDemos.length - 1) {
        setCurrentDemo(currentDemo + 1);
      } else {
        setShowAnalysis(true);
      }
    }, 2500);
  };

  const handleContinue = () => {
    onComplete(0);
  };

  return (
    <div className="module-container">
      <div className="section-card">
        <h1 className="heading-critical">What's Really Happening When You Pay?</h1>
        <p>Modern payments look simple, but there's a lot happening behind the scenes. Let's see what's really going on.</p>
      </div>
      
      <div className="card-feature">
        <h2 className="heading-high">Let's Look at Common Payments</h2>
        <p>Click through these everyday payment examples to see what really happens...</p>

        <div className="card-content">
          <div className="payment-demo-card">
            <h4>{currentDemoData.title}</h4>
            <p>{currentDemoData.description}</p>
            
            <div className="demo-interaction">
              <ActionButton 
                onClick={handleDemoAction}
                variant="primary"
              >
                {currentDemoData.action}
              </ActionButton>
            </div>
            
            {demoResults[currentDemo] && (
              <div className="demo-result">
                <div className="demo-effect">{currentDemoData.effect}</div>
                <div className="demo-hidden">
                  <strong>What Really Happens:</strong><br />
                  {currentDemoData.hidden}
                </div>
              </div>
            )}
          </div>

          <div className="demo-navigation">
            <div className="demo-counter">
              Demo {currentDemo + 1} of {modernPaymentDemos.length}
            </div>
            <div className="demo-buttons">
              <ActionButton 
                onClick={() => setCurrentDemo(Math.max(0, currentDemo - 1))}
                disabled={currentDemo === 0}
                variant="secondary"
              >
                Previous
              </ActionButton>
              <ActionButton 
                onClick={() => setCurrentDemo(Math.min(modernPaymentDemos.length - 1, currentDemo + 1))}
                disabled={currentDemo === modernPaymentDemos.length - 1}
                variant="secondary"
              >
                Next
              </ActionButton>
            </div>
          </div>
        </div>

        {showAnalysis && (
          <div className="card-content">
            <h3 className="heading-medium">The Hidden Complexity</h3>
            <p>Every "simple" payment involves multiple companies, systems, and potential points of failure. This complexity is invisible to users but creates:</p>
            <ul>
              <li>Higher costs (fees hidden in exchange rates and processing)</li>
              <li>Slower settlement (your money doesn't move instantly)</li>
              <li>Privacy concerns (every transaction is tracked)</li>
              <li>Control points (accounts can be frozen or restricted)</li>
            </ul>
            
            <div className="concept-card">
              <h4 className="heading-standard">💡 Key Insight</h4>
              What if money could work more like the internet - direct, open, and without requiring permission from intermediaries?
            </div>

            <ActionButton onClick={handleContinue} variant="primary">
              Continue Learning
            </ActionButton>
          </div>
        )}
      </div>
    </div>
  );
};

// Renamed: BarterWorld -> BarterProblem
const BarterProblem = ({ onComplete }) => {
  const [currentScenario, setCurrentScenario] = useState(0);
  const [playerChoice, setPlayerChoice] = useState(null);
  const [showOutcome, setShowOutcome] = useState(false);
  const [discoveredProblems, setDiscoveredProblems] = useState(new Set());

  const economicScenarios = [
    {
      id: 1,
      title: "🍞 The Baker's Problem",
      situation: "You're a baker. You need shoes, but the shoemaker doesn't want bread.",
      trader: "Shoemaker says: 'I already have bread. I need a haircut.'",
      choice: "What do you do?",
      options: [
        { 
          id: 1, 
          text: 'Give up and go home', 
          result: 'reject',
          problem: 'coincidence'
        },
        { 
          id: 2, 
          text: 'Find someone who wants bread AND can give the shoemaker a haircut', 
          result: 'chain',
          problem: 'complexity'
        },
        { 
          id: 3, 
          text: 'Search for other shoemakers', 
          result: 'search',
          problem: 'time'
        }
      ]
    },
    {
      id: 2,
      title: "🏠 The House Builder's Challenge",
      situation: "You want to build a house. You need: bricks, wood, nails, and tools. But everyone wants different things from you.",
      trader: "Brick maker wants fish. Wood seller wants clothes. Nail maker wants meat. Tool maker wants grain.",
      choice: "This is getting complicated...",
      options: [
        { 
          id: 1, 
          text: 'Try to coordinate all these trades at once', 
          result: 'chaos',
          problem: 'timing'
        },
        { 
          id: 2, 
          text: 'Map out all the trades you need to make', 
          result: 'insight',
          problem: 'complexity'
        },
        { 
          id: 3, 
          text: 'Build a smaller house', 
          result: 'quit',
          problem: 'failure'
        }
      ]
    },
    {
      id: 3,
      title: "⏰ The Timing Problem",
      situation: "You need to make 4 trades in a row, but the timing has to be perfect.",
      trader: "The brick maker says: 'I already traded my bricks yesterday. Come back next month.'",
      choice: "Everything has to happen at exactly the right time...",
      options: [
        { 
          id: 1, 
          text: 'Start all over again', 
          result: 'chaos',
          problem: 'timing'
        },
        { 
          id: 2, 
          text: 'Realize this system has serious problems', 
          result: 'epiphany',
          problem: 'system'
        },
        { 
          id: 3, 
          text: 'Think about what everyone would accept', 
          result: 'solution',
          problem: 'innovation'
        }
      ]
    }
  ];

  const problemTypes = {
    coincidence: "Both People Must Want What the Other Has",
    complexity: "Too Many Steps Required", 
    time: "Takes Too Long to Find Trading Partners",
    timing: "Everything Must Happen at the Same Time",
    failure: "System Doesn't Work",
    system: "The Whole Approach is Flawed",
    innovation: "Need a Better Solution"
  };

  const handleChoice = (optionId) => {
    setPlayerChoice(optionId);
    setShowOutcome(true);
    
    const selectedOption = economicScenarios[currentScenario].options.find(opt => opt.id === optionId);
    if (selectedOption?.problem) {
      setDiscoveredProblems(prev => new Set([...prev, selectedOption.problem]));
    }
  };

  const handleNext = () => {
    if (currentScenario < economicScenarios.length - 1) {
      setCurrentScenario(prev => prev + 1);
      setPlayerChoice(null);
      setShowOutcome(false);
    } else {
      onComplete(1);
    }
  };

  const handlePrevious = () => {
    if (currentScenario > 0) {
      setCurrentScenario(prev => prev - 1);
      setPlayerChoice(null);
      setShowOutcome(false);
    }
  };

  const getOutcomeText = (result) => {
    const outcomes = {
      reject: "❌ Trade fails because you both don't want what the other has.",
      chain: "🔗 You realize you need to find multiple people and coordinate complex trades.",
      search: "🔍 You spend hours looking but most people don't want bread.",
      quit: "⏸️ You give up because it's too complicated.",
      insight: "💡 You see that coordinating multiple trades gets extremely difficult.",
      chaos: "🌪️ When one person isn't ready, the whole chain falls apart.",
      epiphany: "⚡ You realize the problem isn't the people - it's the system itself.",
      solution: "🧠 What if there was something everyone would accept? That's the idea behind money."
    };
    return outcomes[result] || "You tried something...";
  };

  const currentScenarioData = economicScenarios[currentScenario];
  
  return (
    <div className="module-container">
      <div className="section-card">
        <h1 className="heading-critical">Barter Problem</h1>
        <p>Before money existed, people had to trade directly with each other. Let's see what problems this created.</p>
      </div>
        
      <div className="card-feature">
        <h2 className="heading-high">Trading Scenarios</h2>
        <p>Click through these everyday trading examples to see what really happens...</p>

        <div className="scenario-tracker">
          <div className="analysis-stats">
            <div className="stat-item">
              <span className="stat-label">Scenario:</span>
              <span className="stat-value">{currentScenario + 1} of {economicScenarios.length}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Problems Found:</span>
              <span className="stat-value">{discoveredProblems.size}</span>
            </div>
          </div>
        </div>

        <div className="card-content">
          <div className="scenario-header">
            <h3 className="heading-medium">{currentScenarioData.title}</h3>
            <div className="scenario-setup">
              <p><strong>Situation:</strong> {currentScenarioData.situation}</p>
              <p><strong>What happens:</strong> {currentScenarioData.trader}</p>
            </div>
          </div>
          
          <div className="choice-section">
            <p><strong>{currentScenarioData.choice}</strong></p>
            
            {!showOutcome ? (
              <div className="choice-options">
                {currentScenarioData.options.map(option => (
                  <ActionButton
                    key={option.id}
                    onClick={() => handleChoice(option.id)}
                    variant="outline"
                  >
                    {option.text}
                  </ActionButton>
                ))}
              </div>
            ) : (
              <div className="outcome-display">
                <div className="choice-result">
                  <p><strong>You chose:</strong> {economicScenarios[currentScenario].options.find(o => o.id === playerChoice)?.text}</p>
                  <div className="outcome-box">
                    <p className="outcome-text">{getOutcomeText(economicScenarios[currentScenario].options.find(o => o.id === playerChoice)?.result)}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {discoveredProblems.size > 0 && (
          <div className="card-supporting">
            <h3 className="heading-standard">📊 Problems We've Found:</h3>
            <div className="problems-grid">
              {Array.from(discoveredProblems).map(problem => (
                <div key={problem} className="problem-badge">
                  ✓ {problemTypes[problem]}
                </div>
              ))}
            </div>
          </div>
        )}

        {currentScenario === economicScenarios.length - 1 && showOutcome && (
          <div className="concept-card">
            <div className="conclusion-box">
              <h2 className="heading-high">📈 What We Learned</h2>
              <p>Trading without money is really hard! That's why every society eventually invented some form of money.</p>
              
              <div className="card-supporting">
                <h4 className="heading-standard">The Big Problems:</h4>
                <ul>
                  <li><strong>Hard to Match:</strong> Finding someone who has what you want AND wants what you have</li>
                  <li><strong>Takes Forever:</strong> Searching for the right trading partners</li>
                  <li><strong>Bad Timing:</strong> Everyone needs to be ready to trade at the same time</li>
                  <li><strong>Can't Save:</strong> Food spoils, so you can't store wealth</li>
                  <li><strong>Can't Compare:</strong> How many chickens equals one cow?</li>
                </ul>
              </div>

              <div className="tip-card">
                <h4 className="heading-standard">💡 The Big Idea</h4>
                <p>Money solved these problems by giving people something everyone would accept. This wasn't invented by governments—people created it because they needed it.</p>
              </div>
            </div>
          </div>
        )}

        {showOutcome && (
          <div className="scenario-navigation">
            <ActionButton 
              onClick={handlePrevious}
              disabled={currentScenario === 0}
              variant="secondary"
            >
              Previous Scenario
            </ActionButton>
            <ActionButton 
              onClick={handleNext}
              variant="primary"
            >
              {currentScenario === economicScenarios.length - 1 ? "Learn About Money Properties" : "Next Scenario"}
            </ActionButton>
          </div>
        )}
      </div>
    </div>
  );
};


// Renamed: MoneySuperpowers -> MoneyProperties  
const MoneyProperties = ({ onComplete }) => {
  const [currentScenario, setCurrentScenario] = useState(0);
  const [answers, setAnswers] = useState({});
  const [feedback, setFeedback] = useState({});
  const [unlockedFunctions, setUnlockedFunctions] = useState([]);

  const scenarios = [
    {
      id: 1,
      title: "🛒 Shopping at the Market",
      description: "You want to buy apples. The seller wants $3 per pound.",
      question: "What property is money demonstrating here?",
      options: [
        { value: 1, label: 'Helping you trade - making the exchange possible' },
        { value: 2, label: 'Storing your wealth for later' },
        { value: 3, label: 'Measuring value - telling you how much things cost' }
      ],
      feedback: {
        1: "✓ Right! Money makes trades easy because everyone accepts it.",
        2: "Not quite - you're using it now, not storing it.",
        3: "Close, but the main job here is making the exchange work."
      },
      correctAnswer: 1,
      moneyFunction: 'Medium of Exchange',
      explanation: "Money's first job is making trades possible. Everyone accepts it, so you don't need to find someone who wants exactly what you have."
    },
    {
      id: 2,
      title: "💰 Saving for a Vacation",
      description: "You put $200 in your savings account each month for a vacation next year.",
      question: "What property is money demonstrating here?",
      options: [
        { value: 1, label: 'Helping you make trades right now' },
        { value: 2, label: 'Keeping your wealth safe until you need it' },
        { value: 3, label: 'Measuring how much things cost' }
      ],
      feedback: {
        1: "Not quite - you're not trading right now, you're saving.",
        2: "✓ Exactly! Money lets you save up value for later.",
        3: "That's another job of money, but not what's happening here."
      },
      correctAnswer: 2,
      moneyFunction: 'Store of Value',
      explanation: "Money's second job is holding onto value over time. You can save it today and spend it later."
    },
    {
      id: 3,
      title: "🏠 Comparing House Prices",
      description: "You're looking at houses. One costs $300,000, another costs $450,000.",
      question: "What property is money demonstrating here?",
      options: [
        { value: 1, label: 'Making the trade possible' },
        { value: 2, label: 'Storing value for you' },
        { value: 3, label: 'Giving you a way to compare prices' }
      ],
      feedback: {
        1: "You're not trading yet - just comparing.",
        2: "You're not storing value - you're comparing prices.",
        3: "✓ Perfect! Money gives you a standard way to measure and compare value."
      },
      correctAnswer: 3,
      moneyFunction: 'Unit of Account',
      explanation: "Money's third job is measuring value. It gives everyone the same ruler to compare prices."
    }
  ];

  const handleAnswer = (questionId, value) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));

    const scenario = scenarios.find(s => s.id === questionId);
    setFeedback(prev => ({
      ...prev,
      [questionId]: scenario.feedback[value]
    }));

    if (value === scenario.correctAnswer) {
      setUnlockedFunctions(prev => [...prev, scenario.moneyFunction]);
    }

    // Always progress after showing feedback, regardless of correctness
    setTimeout(() => {
      if (currentScenario < scenarios.length - 1) {
        setCurrentScenario(currentScenario + 1);
      } else {
        setTimeout(() => onComplete(2), 3000);
      }
    }, 2000);
  };

  const currentScenarioData = scenarios[currentScenario];
  
  return (
    <div className="module-container">
      <div className="section-card">
        <h1 className="heading-critical">Money Properties</h1>
        <p>Money has three main properties. Let's look at some everyday examples to understand each one.</p>
      </div>
        
        <div className="scenario-progress">
          <div className="progress-indicators">
            {scenarios.map((_, index) => (
              <div 
                key={index} 
                className={`indicator ${index === currentScenario ? 'current' : ''} ${index < currentScenario ? 'completed' : ''}`}
              >
                {index < currentScenario ? '✅' : index + 1}
              </div>
            ))}
          </div>
        </div>

        <div className="current-scenario">
          <h3>{currentScenarioData.title}</h3>
          <p className="scenario-description">{currentScenarioData.description}</p>
          <p className="scenario-question"><strong>{currentScenarioData.question}</strong></p>
          
          {!feedback[currentScenarioData.id] && (
            <div className="quiz-options">
              {currentScenarioData.options.map(option => (
                <ActionButton
                  key={option.value}
                  onClick={() => handleAnswer(currentScenarioData.id, option.value)}
                  variant="outline"
                >
                  <span className="option-text">{option.label}</span>
                </ActionButton>
              ))}
            </div>
          )}
          
          {feedback[currentScenarioData.id] && (
            <div className={`quiz-feedback ${feedback[currentScenarioData.id].includes('✓') ? 'correct' : 'incorrect'}`}>
              {feedback[currentScenarioData.id].includes('✓') ? (
                <div className="feedback-text">
                  <p>✅ <strong>Excellent!</strong> You identified the correct property.</p>
                  <div className="correct-answer">
                    <strong>Money's Property:</strong> {currentScenarioData.moneyFunction}
                  </div>
                  <div className="trait-unlocked">
                    <p><strong>💡 Key Learning:</strong> {currentScenarioData.explanation}</p>
                  </div>
                </div>
              ) : (
                <div className="feedback-text">
                  <p>❌ <strong>Not quite.</strong></p>
                  <div className="incorrect-answer">
                    <strong>The correct property is:</strong> {currentScenarioData.moneyFunction}
                  </div>
                  <div className="correct-answer">
                    <strong>💡 Key Learning:</strong> {currentScenarioData.explanation}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {unlockedFunctions.length === 3 && (
          <div className="analysis-complete">
            <h3>✅ All Three Properties Found!</h3>
            <p>Great! Now you understand what money needs to do. Let's see how well current money demonstrates these properties.</p>
          </div>
        )}
    </div>
  );
};

// Renamed: PaymentPlumbing -> PaymentInfrastructure
const PaymentInfrastructure = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showAnimation, setShowAnimation] = useState(false);

  const paymentSteps = [
    {
      title: "📱 You Swipe Your Card",
      description: "Seems instant, right?",
      detail: "You tap your card at the coffee shop. The screen says 'Approved!' in 2 seconds.",
      hidden: "But 6 different companies just processed this transaction across 3 different countries..."
    },
    {
      title: "🏪 Coffee Shop → Acquirer",
      description: "First stop: Payment processor",
      detail: "Your transaction data goes to the shop's payment processor (like Square or Stripe).",
      hidden: "Fee #1: Processing fee (2.9% + $0.30 per transaction)"
    },
    {
      title: "🏦 Acquirer → Card Network",
      description: "Second stop: Visa/Mastercard",
      detail: "The processor sends your transaction to Visa/Mastercard for authorization.",
      hidden: "Fee #2: Network fee (0.1-0.2% of transaction)"
    },
    {
      title: "🏛️ Card Network → Your Bank",
      description: "Third stop: Authorization",
      detail: "Visa asks your bank: 'Does this person have $5 and are they allowed to spend it?'",
      hidden: "Your bank checks: Account balance, spending limits, fraud patterns, geographic location..."
    },
    {
      title: "✅ Your Bank → Back Through the Chain",
      description: "Fourth stop: Approval flows back",
      detail: "Your bank says 'Yes' and the approval flows back through all the middlemen.",
      hidden: "This whole authorization took 1-2 seconds, but no money has actually moved yet."
    },
    {
      title: "💸 Settlement (The Real Money Movement)",
      description: "Final stop: Money actually moves (later)",
      detail: "The coffee shop gets their money in 1-3 business days through a separate settlement process.",
      hidden: "Fee #3: Settlement fee, currency conversion fees, chargebacks... Total fees can be 3-5% of transaction."
    }
  ];

  const handleNext = () => {
    if (currentStep < paymentSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(3);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const currentStepData = paymentSteps[currentStep];

  return (
    <div className="module-container">
      <div className="section-card">
        <h1 className="heading-critical">Payment Infrastructure</h1>
        <p>Every "simple" payment actually involves 6 stops and 3 middlemen. Let's trace your money's journey.</p>
      </div>
      
      <div className="card-feature">
        <h2 className="heading-high">Payment Journey</h2>
        <p>Step {currentStep + 1} of {paymentSteps.length}</p>

        <div className="payment-step-display">
          <div className="step-card">
            <h3 className="heading-medium">{currentStepData.title}</h3>
            <h4 className="step-subtitle">{currentStepData.description}</h4>
            <p className="step-detail">{currentStepData.detail}</p>
            
            <div className="hidden-info">
              <h5>🔍 What's Really Happening:</h5>
              <p className="hidden-detail">{currentStepData.hidden}</p>
            </div>
          </div>
        </div>

        <div className="progress-visualization">
          <div className="progress-dots">
            {paymentSteps.map((_, index) => (
              <div 
                key={index} 
                className={`progress-dot ${
                  index === currentStep ? 'current' : ''
                } ${index < currentStep ? 'completed' : ''}`}
              >
                {index < currentStep ? '✅' : index + 1}
              </div>
            ))}
          </div>
        </div>

        {currentStep === paymentSteps.length - 1 && (
          <div className="concept-card">
            <h3 className="heading-standard">💡 Key Insight</h3>
            <p>Notice the 6 stops & 3 middlemen? That's "friction."</p>
            <p><strong>Link back:</strong> Friction weakens <strong>Money Properties</strong> we learned about earlier - specifically the Medium of Exchange and Unit of Account jobs.</p>
            
            <div className="friction-analysis">
              <h4>What This Friction Creates:</h4>
              <ul>
                <li><strong>Cost:</strong> 3-5% in fees (hidden from you)</li>
                <li><strong>Delay:</strong> Settlement takes 1-3 days</li>
                <li><strong>Control:</strong> Any middleman can block or reverse transactions</li>
                <li><strong>Privacy:</strong> Every transaction is tracked and stored</li>
                <li><strong>Complexity:</strong> Requires 6 different companies to work together</li>
              </ul>
            </div>
          </div>
        )}

        <div className="step-navigation">
          <ActionButton 
            onClick={handlePrevious}
            disabled={currentStep === 0}
            variant="secondary"
          >
            Previous Step
          </ActionButton>
          <ActionButton 
            onClick={handleNext}
            variant="primary"
          >
            {currentStep === paymentSteps.length - 1 ? "Learn from History" : "Next Step"}
          </ActionButton>
        </div>
      </div>
    </div>
  );
};

// Renamed: HistoryWinsAndWipeouts -> MoneyExperiments
const MoneyExperiments = ({ onComplete, onUnlockTrait }) => {
  const [showIntro, setShowIntro] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  const questions = [
    {
      id: 1,
      context: "In 2008, when banks were in trouble, they wouldn't let people take money out of their accounts.",
      question: "What's wrong with this picture?",
      options: [
        "Banks needed to protect themselves",
        "If it's your money, you should always be able to get it",
        "Sometimes restrictions are needed"
      ],
      answer: 1,
      insight: "If someone else can stop you from using your money, do you really own it?",
      wrongExplanation: "Bank protection and restrictions don't address the fundamental issue of who controls your money.",
      trait: "Self Custody"
    },
    {
      id: 2,
      context: "In 1971, U.S. President Richard Nixon announced — on national television — that the dollar would no longer be backed by gold. No vote. No debate. Just one decision. Overnight, the entire world was placed on a fiat money system.",
      question: "What does this show us about money?",
      options: [
        "The president should be able to act fast",
        "One leader can change the rules for everyone",
        "If one person can control the money system, they can change it to benefit themselves — and hurt everyone else"
      ],
      answer: 2,
      insight: "When control over money is concentrated, it can be abused without consent from the people who use it. To protect everyone's interests, money should be decentralized — no one should have absolute control.",
      wrongExplanation: "Fast leadership decisions and centralized control actually make the system more vulnerable to abuse and manipulation.",
      trait: "Decentralization"
    },
    {
      id: 3,
      context: "After Nixon removed the gold standard, the U.S. could print as much money as it wanted — and it did. The money supply (M2) skyrocketed. The price of everyday things — like a Big Mac — rose steadily as dollars lost value.",
      question: "What does this show us about money?",
      options: [
        "More money means more prosperity",
        "Printing money always helps the economy",
        "Without limits, governments always print too much"
      ],
      answer: 2,
      insight: "Good money needs hard rules. If you can print infinite amounts, it stops being trustworthy.",
      wrongExplanation: "More money printing actually dilutes value and creates inflation, harming everyone who holds that money.",
      trait: "Fixed Supply"
    },
    {
      id: 4,
      context: "Zimbabwe printed so much money that prices doubled every day. A loaf of bread cost billions of dollars.",
      question: "What does this show us about money?",
      options: [
        "People should use different money",
        "The limited supply must be real and enforced",
        "Inflation is normal"
      ],
      answer: 1,
      insight: "Scarcity must be mathematically provable and impossible to circumvent, creating reliable store of value.",
      wrongExplanation: "Using different money or accepting inflation doesn't solve the fundamental problem of unlimited money creation.",
      trait: "Genuine Scarcity"
    },
    {
      id: 5,
      context: "Gold was great money for thousands of years, but it was heavy to carry and difficult to verify quickly.",
      question: "What problem did gold have?",
      options: [
        "It was too valuable",
        "It was hard to transport from one place to another",
        "People didn't like it"
      ],
      answer: 1,
      insight: "Good money should be easy to transport from one place to another — physically or digitally. You should be able to carry it in your pocket or send it across the world.",
      wrongExplanation: "Value and popularity don't matter if the money is too heavy or difficult to move when you need to use it.",
      trait: "Portability"
    },
    {
      id: 6,
      context: "Some Roman emperors secretly mixed cheap metals into gold coins to trick the people. They looked real — but weren't worth the same.",
      question: "What does this teach us?",
      options: [
        "Gold is always valuable",
        "Coins don't need to be real as long as they look good",
        "Good money must be easy to check for authenticity"
      ],
      answer: 2,
      insight: "If you can't tell if money is real, it's easy to be fooled. Verifiable money protects people from fraud.",
      wrongExplanation: "Assuming gold is always valuable or accepting fake money as long as it looks good leads to fraud and economic collapse.",
      trait: "Verifiability"
    },
    {
      id: 7,
      context: "On Yap Island, they used huge stone discs as money. But you couldn't exactly break off a piece to pay for lunch.",
      question: "What's the issue here?",
      options: [
        "Stones are cool",
        "You can't use money you can't divide",
        "Everyone should use stones again"
      ],
      answer: 1,
      insight: "Money must be divisible to work for both big and small purchases. Good money should work at any scale — whether you're buying a house or a coffee.",
      wrongExplanation: "Personal preferences about stones don't address the practical limitation that indivisible money can't function for small transactions.",
      trait: "Divisibility"
    },
    {
      id: 8,
      context: "Sheep were used as money in ancient times, but they would die or get sick, making the money worthless.",
      question: "What went wrong?",
      options: [
        "Sheep are cute",
        "Money needs to last over time without degrading",
        "People should have used cows instead"
      ],
      answer: 1,
      insight: "Money must maintain its physical and economic properties across long periods without deterioration.",
      wrongExplanation: "Cuteness or using different animals doesn't solve the fundamental problem that living things deteriorate and die.",
      trait: "Durability"
    },
    {
      id: 9,
      context: "Roman coins became unreliable because some had more silver than others. People started rejecting certain coins.",
      question: "What happened to trust in the money?",
      options: [
        "People got used to it",
        "When coins weren't the same, people lost trust",
        "Extra coins made up for it"
      ],
            answer: 1,
      insight: "Each unit of money must be interchangeable with any other unit, ensuring consistent acceptance.",
      wrongExplanation: "People adapting to bad money or hoping extra coins compensate doesn't solve the trust problem when money units aren't identical.",
      trait: "Fungibility"
    },
    {
      id: 10,
      context: "In medieval Europe, people used many different things as money: gold coins, silver pieces, shells, and even cattle. But only gold was accepted everywhere for major trades.",
      question: "What made gold different?",
      options: [
        "Gold was the most beautiful",
        "Everyone trusted and accepted gold as valuable",
        "Gold was the heaviest metal"
      ],
      answer: 1,
      insight: "Money works because people agree it has value. Without widespread acceptance, even valuable things won't function as money.",
      wrongExplanation: "Physical beauty or weight don't determine monetary acceptance - it's about social consensus and trust in value.",
      trait: "Acceptability"
    }
  ];

  const handleAnswer = (answerIndex) => {
    setSelectedAnswer(answerIndex);
    setShowFeedback(true);
    
    if (answerIndex === questions[currentQuestion].answer) {
      setCorrectAnswers(prev => prev + 1);
      onUnlockTrait(questions[currentQuestion].trait);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      onComplete(4);
    }
  };

  const handleShowIntro = () => {
    setShowIntro(false);
  };

  if (showIntro) {
    return (
    <div className="module-container">
      <div className="section-card">
        <h1 className="heading-critical">Money Experiments</h1>
        <p>Let's look at real examples from history to understand what makes money work well.</p>
          
          <h3>Why Look at History?</h3>
          <p>People have been trying different forms of money for thousands of years. Some worked well, others failed spectacularly.</p>
          <p>By understanding what went wrong (and right) in the past, we can figure out what makes good money.</p>
          
          <div className="what-we-learn">
            <h4>What We'll Discover:</h4>
            <ul>
              <li>Why some money systems failed</li>
              <li>What properties good money needs</li>
              <li>Lessons that apply to money today</li>
            </ul>
          </div>

          <ContinueButton onClick={handleShowIntro}>
            Start Learning from History
          </ContinueButton>
        </div>
      </div>
    );
  }

  const currentQuestionData = questions[currentQuestion];
  
  return (
    <div className="module-container">
      <div className="section-card">
        <h1 className="heading-critical">Money Experiments</h1>
        <p>Question {currentQuestion + 1} of {questions.length}</p>
        
        <div className="question-progress">
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            />
          </div>
          <span className="progress-text">
            {currentQuestion + 1} / {questions.length} questions
          </span>
        </div>

        <div className="historical-question">
          <div className="context-box">
            <h3>Historical Example</h3>
            <p>{currentQuestionData.context}</p>
          </div>
          
          <div className="question-box">
            <h4>{currentQuestionData.question}</h4>
            
            {!showFeedback && (
              <div className="quiz-options">
                {currentQuestionData.options.map((option, index) => (
                  <ActionButton
                    key={index}
                    onClick={() => handleAnswer(index)}
                    variant="outline"
                  >
                    <span className="option-text">{option}</span>
                  </ActionButton>
                ))}
              </div>
            )}
            
            {showFeedback && (
              <div className={`quiz-feedback ${selectedAnswer === currentQuestionData.answer ? 'correct' : 'incorrect'}`}>
                {selectedAnswer === currentQuestionData.answer ? (
                  <div className="feedback-text">
                    <p>✅ <strong>Correct!</strong></p>
                    <div className="correct-answer">
                      <strong>💡 What This Teaches Us:</strong> {currentQuestionData.insight}
                    </div>
                    <div className="trait-unlocked">
                      <p><strong>🔓 Property Unlocked:</strong> {currentQuestionData.trait}</p>
                    </div>
                  </div>
                ) : (
                  <div className="feedback-text">
                    <p>❌ <strong>Not quite.</strong></p>
                    <div className="incorrect-explanation">
                      <strong>Why this is wrong:</strong> {currentQuestionData.wrongExplanation || "This choice doesn't address the core lesson about sound money properties."}
                    </div>
                    <div className="correct-answer">
                      <strong>✅ Correct answer:</strong> {currentQuestionData.options[currentQuestionData.answer]}
                    </div>
                    <div className="insight-explanation">
                      <strong>💡 What This Teaches Us:</strong> {currentQuestionData.insight}
                    </div>
                    <div className="trait-unlocked">
                      <p><strong>🔓 Property Unlocked:</strong> {currentQuestionData.trait}</p>
                    </div>
                  </div>
                )}
                
                <ContinueButton onClick={handleNext}>
                  {currentQuestion === questions.length - 1 ? 'Build Your Framework' : 'Next Example'}
                </ContinueButton>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Already correctly named as MoneyScorecard
const MoneyScorecard = ({ unlockedTraits, onComplete }) => {
  const [step, setStep] = useState(0);
  const [currentTrait, setCurrentTrait] = useState(0);

  const soundMoneyTraits = [
    { icon: "🔒", name: "Self Custody", description: "You control your money, not someone else", category: "Control" },
    { icon: "🌐", name: "Decentralization", description: "No single group can control or change it", category: "Control" },
    { icon: "🔍", name: "Verifiability", description: "Easy to verify that the money is real and not counterfeit", category: "Control" },
    { icon: "📊", name: "Fixed Supply", description: "No one can print more to benefit themselves", category: "Scarcity" },
    { icon: "💎", name: "Genuine Scarcity", description: "The limited supply is real and enforced", category: "Scarcity" },
    { icon: "🔄", name: "Fungibility", description: "Every unit is identical to every other unit", category: "Scarcity" },
    { icon: "📱", name: "Portability", description: "Easy to transport from one place to another — physically or digitally", category: "Usability" },
    { icon: "➗", name: "Divisibility", description: "Easy to divide into smaller units for transactions of any size", category: "Usability" },
    { icon: "⏳", name: "Durability", description: "Lasts over time without degrading", category: "Usability" },
    { icon: "🤝", name: "Acceptability", description: "Widely trusted and accepted through social consensus", category: "Usability" }
  ];

  const categories = {
    "Control": { traits: soundMoneyTraits.filter(t => t.category === "Control"), color: "#ff6b6b" },
    "Scarcity": { traits: soundMoneyTraits.filter(t => t.category === "Scarcity"), color: "#4ecdc4" },
    "Usability": { traits: soundMoneyTraits.filter(t => t.category === "Usability"), color: "#45b7d1" }
  };

  const frameworkSteps = [
    {
      title: "10-Point Money Scorecard",
      content: (
        <div className="scorecard-intro">
          <h3>Your Framework for Evaluating Any Money</h3>
          <p>Based on what you've learned from history, here are the 10 essential properties of sound money, organized into 3 categories:</p>
          
          <div className="categories-overview">
            {Object.entries(categories).map(([categoryName, categoryData]) => (
              <div key={categoryName} className="category-card" style={{ borderLeft: `4px solid ${categoryData.color}` }}>
                <h4>{categoryName}</h4>
                <div className="category-traits">
                  {categoryData.traits.map((trait, index) => (
                    <div key={index} className="trait-item">
                      <span className="trait-icon">{trait.icon}</span>
                      <span className="trait-name">{trait.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="scorecard-insight">
            <h4>💡 How to Use This Scorecard</h4>
            <p>For any form of money, ask: "How many of these 10 properties does it have?" The more it has, the better it functions as money.</p>
          </div>
        </div>
      )
    },
    {
      title: "Deep Dive: Each Property",
      content: (
        <div className="trait-deep-dive">
          <h3>Understanding Each Property</h3>
          <p>Let's examine each property in detail:</p>
          
          <div className="trait-progress">
            <p>Property {currentTrait + 1} of {soundMoneyTraits.length}</p>
          </div>

          <div className="current-trait-display">
            <div className="trait-card featured" style={{ borderColor: categories[soundMoneyTraits[currentTrait].category].color }}>
              <div className="trait-header">
                <span className="trait-icon-large">{soundMoneyTraits[currentTrait].icon}</span>
                <div className="trait-info">
                  <h5>{soundMoneyTraits[currentTrait].name}</h5>
                  <span className="trait-category">{soundMoneyTraits[currentTrait].category}</span>
                </div>
              </div>
              <p className="trait-description">{soundMoneyTraits[currentTrait].description}</p>
            </div>
          </div>

          <div className="trait-navigation">
            <ActionButton 
              onClick={() => setCurrentTrait(Math.max(0, currentTrait - 1))}
              disabled={currentTrait === 0}
              variant="secondary"
            >
              Previous Property
            </ActionButton>
            <ActionButton 
              onClick={() => setCurrentTrait(Math.min(soundMoneyTraits.length - 1, currentTrait + 1))}
              disabled={currentTrait === soundMoneyTraits.length - 1}
              variant="secondary"
            >
              Next Property
            </ActionButton>
          </div>

          <div className="trait-summary">
            <h4>All 10 Properties:</h4>
            <div className="traits-grid">
              {soundMoneyTraits.map((trait, index) => (
                <div 
                  key={index} 
                  className={`trait-grid-item ${index === currentTrait ? 'current' : ''}`}
                  onClick={() => setCurrentTrait(index)}
                  style={{ borderColor: categories[trait.category].color }}
                >
                  <span className="trait-icon">{trait.icon}</span>
                  <span className="trait-name">{trait.name}</span>
                  {index === currentTrait && <span className="current-indicator">←</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Ready to Test Your Framework",
      content: (
        <div className="framework-ready">
          <h3>Time to Apply What You've Learned</h3>
          <p>Now you have a complete framework for evaluating money. Let's test it by comparing different money systems.</p>
          
          <div className="preview-comparison">
            <h4>You'll Compare:</h4>
            <div className="comparison-preview">
              <div className="money-type">
                <h5>🥇 Gold</h5>
                <p>The historical standard</p>
              </div>
              <div className="money-type">
                <h5>💵 Fiat Currency</h5>
                <p>Modern government money</p>
              </div>
              <div className="money-type">
                <h5>₿ Bitcoin</h5>
                <p>Digital sound money</p>
              </div>
            </div>
          </div>
          
          <div className="excitement-builder">
            <h4>🎯 What You'll Discover:</h4>
            <ul>
              <li>Which money system scores highest on your 10-point framework</li>
              <li>Why Bitcoin was designed the way it was</li>
              <li>How different money systems trade off various properties</li>
              <li>Which system best preserves wealth over time</li>
            </ul>
          </div>
          
          <p><strong>Ready to see how Bitcoin stacks up?</strong></p>
        </div>
      )
    }
  ];

  const handleNext = () => {
    if (step < frameworkSteps.length - 1) {
      setStep(step + 1);
    } else {
      onComplete(4);
    }
  };

  const handlePrevious = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  return (
    <div className="module-container">
      <div className="section-card">
        <h1 className="heading-critical">{frameworkSteps[step].title}</h1>
        <p>Step {step + 1} of {frameworkSteps.length}</p>
      </div>
      
      <div className="card-feature">
        {frameworkSteps[step].content}
        
        <div className="step-navigation">
          <ActionButton 
            onClick={handlePrevious}
            disabled={step === 0}
            variant="secondary"
          >
            Previous
          </ActionButton>
          <ActionButton 
            onClick={handleNext}
            variant="primary"
          >
            {step === frameworkSteps.length - 1 ? "Apply the Scorecard" : "Next"}
          </ActionButton>
        </div>
      </div>
    </div>
  );
};

// Already correctly named as ApplyScorecard
const ApplyScorecard = ({ onComplete }) => {
  const [currentComparison, setCurrentComparison] = useState(0);
  const [currentProperty, setCurrentProperty] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const moneyTypes = [
    {
      name: "Gold",
      emoji: "🥇",
      description: "Physical precious metal, used as money for thousands of years",
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
      },
      hints: {
        "Self Custody": "You can hold physical gold directly, but storage and security are challenging.",
        "Decentralization": "No central authority controls gold, but mining and refining can be concentrated.",
        "Verifiability": "Testing gold purity requires special equipment and expertise.",
        "Fixed Supply": "Gold mining is limited by geology, making new supply predictable and slow.",
        "Genuine Scarcity": "Gold is genuinely scarce due to its physical properties and mining difficulty.",
        "Fungibility": "Pure gold is fungible, but purity and form can vary.",
        "Portability": "Gold is heavy and difficult to transport, especially in large amounts.",
        "Divisibility": "Gold can be divided, but precision division is difficult and costly.",
        "Durability": "Gold doesn't corrode or degrade - it lasts forever.",
        "Acceptability": "Gold has been accepted as valuable across cultures for millennia."
      }
    },
    {
      name: "Fiat Currency",
      emoji: "💵",
      description: "Government-issued currency (like USD, EUR) backed by trust in government",
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
      },
      hints: {
        "Self Custody": "Banks and governments can freeze accounts and control access to your money.",
        "Decentralization": "Central banks and governments have complete control over the monetary system.",
        "Verifiability": "Modern security features make counterfeiting difficult to detect.",
        "Fixed Supply": "Governments can print unlimited amounts whenever they choose.",
        "Genuine Scarcity": "No mathematical or physical limits prevent unlimited money creation.",
        "Fungibility": "All units of the same denomination are identical and interchangeable.",
        "Portability": "Cash is light and digital transfers are instant within the banking system.",
        "Divisibility": "Fiat can be divided to very small units (cents, satoshis equivalent).",
        "Durability": "Physical cash wears out, but digital records are maintained by banks.",
        "Acceptability": "Fiat is universally accepted within its jurisdiction due to legal tender laws."
      }
    },
    {
      name: "Bitcoin",
      emoji: "₿",
      description: "Digital currency with mathematical scarcity and no central authority",
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
      },
      hints: {
        "Self Custody": "With private keys, you have complete control over your bitcoin.",
        "Decentralization": "No single entity controls Bitcoin - it's maintained by thousands of nodes worldwide.",
        "Verifiability": "Anyone can verify transactions and the total supply using the blockchain.",
        "Fixed Supply": "The 21 million bitcoin limit is enforced by mathematics and consensus rules.",
        "Genuine Scarcity": "Bitcoin's scarcity is provable and cannot be circumvented.",
        "Fungibility": "Most bitcoin is fungible, though transaction history can sometimes be traced.",
        "Portability": "Bitcoin can be sent anywhere in the world in minutes, regardless of amount.",
        "Divisibility": "Bitcoin can be divided to 8 decimal places (100 million satoshis per bitcoin).",
        "Durability": "Bitcoin exists as information on a distributed network - nearly indestructible.",
        "Acceptability": "Growing acceptance, but still limited compared to traditional money systems."
      }
    }
  ];

  const properties = [
    "Self Custody", "Decentralization", "Verifiability", "Fixed Supply", 
    "Genuine Scarcity", "Fungibility", "Portability", "Divisibility", 
    "Durability", "Acceptability"
  ];

  const handleNextMoneyType = () => {
    if (currentComparison < moneyTypes.length - 1) {
      setCurrentComparison(currentComparison + 1);
    } else {
      setShowResults(true);
    }
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

  const currentMoney = moneyTypes[currentComparison];
  const currentProp = properties[currentProperty];

  if (showResults) {
    const sortedMoneyTypes = [...moneyTypes].sort((a, b) => 
      calculateTotalScore(b) - calculateTotalScore(a)
    );

    return (
      <div className="module-container">
        <div className="section-card">
          <h1 className="heading-critical">🏆 Scorecard Results</h1>
          <p>Here's how each money system scored on your 10-point framework:</p>
        </div>
        
        <div className="card-feature">
          <div className="results-comparison">
            {sortedMoneyTypes.map((moneyType, index) => (
              <div key={moneyType.name} className="money-result-card">
                <div className="result-header">
                  <span className="rank">#{index + 1}</span>
                  <span className="money-emoji">{moneyType.emoji}</span>
                  <h3>{moneyType.name}</h3>
                  <div className="total-score">
                    {calculateTotalScore(moneyType)}/100
                  </div>
                </div>
                
                <div className="scores-breakdown">
                  {properties.map(property => (
                    <div key={property} className="score-row">
                      <span className="property-name">{property}</span>
                      <div className="score-bar">
                        <div 
                          className="score-fill"
                          style={{ 
                            width: `${moneyType.scores[property] * 10}%`,
                            backgroundColor: getScoreColor(moneyType.scores[property])
                          }}
                        />
                        <span className="score-number">{moneyType.scores[property]}/10</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="insights-section">
            <h3>🔍 Key Insights</h3>
            <div className="insight-cards">
              <div className="insight-card">
                <h4>🥇 Why Bitcoin Scored Highest</h4>
                <ul>
                  <li><strong>Perfect Scarcity:</strong> Only 21 million will ever exist</li>
                  <li><strong>True Self-Custody:</strong> You can hold your own keys</li>
                  <li><strong>Fully Verifiable:</strong> Anyone can audit the entire system</li>
                  <li><strong>Digital Portability:</strong> Send anywhere in minutes</li>
                </ul>
              </div>
              
              <div className="insight-card">
                <h4>💵 Fiat's Main Weakness</h4>
                <ul>
                  <li><strong>No Scarcity:</strong> Can be printed infinitely</li>
                  <li><strong>No Self-Custody:</strong> Banks control your money</li>
                  <li><strong>Centralized:</strong> Government controls the system</li>
                </ul>
              </div>
              
              <div className="insight-card">
                <h4>🥇 Gold's Trade-offs</h4>
                <ul>
                  <li><strong>Great Scarcity:</strong> Hard to find and mine</li>
                  <li><strong>Poor Portability:</strong> Heavy and hard to transport</li>
                  <li><strong>Verification Issues:</strong> Hard to test purity quickly</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="next-steps-preview">
            <h3>🚀 What's Next?</h3>
            <p>Now you understand <em>why</em> Bitcoin was created and how it solves money's biggest problems. Ready to dive deeper into how Bitcoin actually works?</p>
            
            <p className="mt-6 font-semibold">
              With these ten tests in mind, let's meet the first digital money designed to pass them all.
            </p>
            
            <div className="cta-section">
              <ActionButton onClick={() => onComplete(5)} variant="primary">
                Complete Money Module
              </ActionButton>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="module-container">
      <div className="section-card">
        <h1 className="heading-critical">Apply Scorecard</h1>
        <p>Let's test your framework by scoring different money systems. You'll see patterns emerge...</p>
      </div>
      
      <div className="card-feature">
        <div className="comparison-header">
          <h2>Evaluating: {currentMoney.emoji} {currentMoney.name}</h2>
          <p>{currentMoney.description}</p>
          <div className="progress-indicator">
            Step {currentComparison + 1} of {moneyTypes.length}
          </div>
        </div>

        <MoneyPredictionChart
          onNext={handleNextMoneyType}
        />
      </div>
    </div>
  );
};

// Sound Money Framework - Simplified (keeping for backward compatibility)
const SoundMoneyFramework = ({ unlockedTraits, onComplete }) => {
  const [step, setStep] = useState(0);
  const [currentTrait, setCurrentTrait] = useState(0);

  const soundMoneyTraits = [
    { icon: "🔒", name: "Self Custody", description: "You control your money, not someone else" },
    { icon: "🌐", name: "Decentralization", description: "No single group can control or change it" },
    { icon: "📊", name: "Fixed Supply", description: "No one can print more to benefit themselves" },
    { icon: "💎", name: "Genuine Scarcity", description: "The limited supply is real and enforced" },
    { icon: "📱", name: "Portability", description: "Easy to transport from one place to another — physically or digitally" },
    { icon: "🔍", name: "Verifiability", description: "Easy to verify that the money is real and not counterfeit" },
    { icon: "➗", name: "Divisibility", description: "Easy to divide into smaller units for transactions of any size" },
    { icon: "⏳", name: "Durability", description: "Lasts over time without degrading" },
    { icon: "🔄", name: "Fungibility", description: "Every unit is identical to every other unit" },
    { icon: "🤝", name: "Acceptability", description: "Widely trusted and accepted through social consensus" }
  ];

  const frameworkSteps = [
    {
      title: "Your Money Framework",
      content: (
        <div className="framework-intro">
          <h3>What Makes Good Money?</h3>
          <p>Based on what you've learned from history, here's your framework for evaluating any form of money:</p>
          
          {/* Individual trait display */}
          <div className="trait-progress">
            <p>Property {currentTrait + 1} of {soundMoneyTraits.length}</p>
          </div>

          <div className="current-trait-display">
            <div className="trait-card featured">
              <h5>{soundMoneyTraits[currentTrait].icon} {soundMoneyTraits[currentTrait].name}</h5>
              <p>{soundMoneyTraits[currentTrait].description}</p>
            </div>
          </div>

          <div className="trait-navigation">
            <ActionButton 
              onClick={() => setCurrentTrait(Math.max(0, currentTrait - 1))}
              disabled={currentTrait === 0}
              variant="secondary"
            >
              Previous Property
            </ActionButton>
            <ActionButton 
              onClick={() => setCurrentTrait(Math.min(soundMoneyTraits.length - 1, currentTrait + 1))}
              disabled={currentTrait === soundMoneyTraits.length - 1}
              variant="secondary"
            >
              Next Property
            </ActionButton>
          </div>

          <div className="trait-summary">
            <h4>All {soundMoneyTraits.length} Essential Properties:</h4>
            <div className="traits-list">
              {soundMoneyTraits.map((trait, index) => (
                <div 
                  key={index} 
                  className={`trait-list-item ${index === currentTrait ? 'current' : ''}`}
                  onClick={() => setCurrentTrait(index)}
                >
                  <span className="trait-icon">{trait.icon}</span>
                  <span className="trait-name">{trait.name}</span>
                  {index === currentTrait && <span className="current-indicator">←</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      title: "How to Use This Framework",
      content: (
        <div className="framework-application">
          <h3>Evaluating Money Systems</h3>
          <p>You can now use this framework to evaluate any money system by asking:</p>
          
          <div className="evaluation-questions">
            <div className="question-category">
              <h4>🔒 Control Questions</h4>
              <ul>
                <li>Who controls this money?</li>
                <li>Can they freeze or confiscate it?</li>
                <li>Can they create more of it?</li>
              </ul>
            </div>
            
            <div className="question-category">
              <h4>📊 Supply Questions</h4>
              <ul>
                <li>How much exists?</li>
                <li>Who decides how much to create?</li>
                <li>What prevents unlimited creation?</li>
              </ul>
            </div>
            
            <div className="question-category">
              <h4>🔧 Practical Questions</h4>
              <ul>
                <li>How easy is it to use?</li>
                <li>Will it last over time?</li>
                <li>Can you verify it's real?</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Ready for Bitcoin",
      content: (
        <div className="next-steps">
          <h3>What's Next?</h3>
          <p>Now you have the tools to understand and evaluate Bitcoin:</p>
          
          <div className="bitcoin-preview">
            <h4>You'll be able to understand:</h4>
            <ul>
              <li>How Bitcoin achieves these money properties</li>
              <li>Why it was designed the way it was</li>
              <li>How it compares to traditional money</li>
              <li>What makes it different from other digital money</li>
            </ul>
          </div>
          
          <p>Ready to see how Bitcoin implements your framework?</p>
        </div>
      )
    }
  ];

  const handleNext = () => {
    if (step < frameworkSteps.length - 1) {
      setStep(step + 1);
    } else {
      onComplete(5);
    }
  };

  const handlePrevious = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  return (
    <div className="module-container">
      <div className="section-card">
        <h1 className="heading-critical">{frameworkSteps[step].title}</h1>
        <p>Step {step + 1} of {frameworkSteps.length}</p>
      </div>
      
      <div className="card-feature">
        {frameworkSteps[step].content}
        
        <div className="step-navigation">
          <ActionButton 
            onClick={handlePrevious}
            disabled={step === 0}
            variant="secondary"
          >
            Previous
          </ActionButton>
          <ActionButton 
            onClick={handleNext}
            variant="primary"
          >
            {step === frameworkSteps.length - 1 ? "Complete Money Module" : "Next"}
          </ActionButton>
        </div>
      </div>
    </div>
  );
};

// Module Completion - Simplified
const ModuleCompletion = ({ onComplete }) => {
  return (
    <div className="module-container">
      <div className="section-card">
        <h2>🎉 Congratulations!</h2>
        <p>You've built a solid foundation for understanding money and Bitcoin.</p>
        
        <div className="optional-resources">
          <h3>📚 Want to Learn More?</h3>
          <p>For a deeper look at money throughout history:</p>
          <a
            href="https://layer-d.my.canva.site/interactive-timeline-of-money-evolution-from-barter-to-bitcoin"
            target="_blank"
            rel="noopener noreferrer"
            className="resource-link"
          >
            🕰️ Interactive Timeline: The Evolution of Money
          </a>
        </div>

        <ModuleCompletionButton 
          moduleName="Money"
          moduleId="money"
          customMessage="🎉 Congratulations! You now understand the fundamentals of money and are ready to explore Bitcoin's revolutionary approach to sound money!"
        />
      </div>
    </div>
  );
};

// Main Module Component
const MoneyModule = () => {
  const { completeModule } = useProgress();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(() => {
    const saved = localStorage.getItem('moneyModuleCompletedSteps');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });
  const [unlockedTraits, setUnlockedTraits] = useState([]);

  // Navigation functions for Learning Support buttons
  const handleReviewPrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleContinueLearning = () => {
    navigate('/?view=learning');
  };

  const getCurrentSection = () => {
    const sectionNames = ['Barter Problem', 'Money Properties', 'Payment Infrastructure', 'Digital Scarcity', 'Money Experiments', 'Money Scorecard', 'Apply Scorecard'];
    return {
      index: currentStep,
      name: sectionNames[currentStep],
      total: sectionNames.length
    };
  };

  // Make navigation functions globally available for the Learning Support buttons
  useEffect(() => {
    window.moduleNavigation = {
      reviewPrevious: handleReviewPrevious,
      continueLearning: handleContinueLearning,
      currentModule: 'money',
      getCurrentSection
    };
    
    return () => {
      delete window.moduleNavigation;
    };
  }, [currentStep]);

  const handleStepComplete = (stepIndex) => {
    const newCompletedSteps = new Set(completedSteps).add(stepIndex);
    setCompletedSteps(newCompletedSteps);
    
    try {
      localStorage.setItem('moneyModuleCompletedSteps', JSON.stringify(Array.from(newCompletedSteps)));
    } catch (error) {
      console.warn('Failed to save progress to localStorage:', error);
    }
    
    if (stepIndex === 6) {
      // Module completion is handled by ModuleCompletionButton
      setCurrentStep(stepIndex + 1);
    } else {
      setCurrentStep(stepIndex + 1);
    }
  };

  const handleTabClick = (stepIndex) => {
    setCurrentStep(stepIndex);
  };

  const handleUnlockTrait = (trait) => {
    if (!unlockedTraits.includes(trait)) {
      setUnlockedTraits([...unlockedTraits, trait]);
    }
  };

  const handleResetProgress = () => {
    localStorage.removeItem('moneyModuleCompletedSteps');
    setCompletedSteps(new Set());
    setCurrentStep(0);
  };

  return (
    <div className="module-container">
      {/* HERO SECTION - World-class design principles */}
      <div className="module-header">
        <div className="module-title">
          <div className="module-icon">
            <BitcoinIcon size={48} animated />
          </div>
          Understanding Money
        </div>
        <div className="module-subtitle">
          Discover how money really works and why Bitcoin matters
        </div>
      </div>

      {/* TERTIARY: Navigation Steps - Medium Importance */}
      <div className="section-card">
        <h3 className="nav-section-title">Learning Path</h3>
        <div className="step-navigation-container">
          <div className="step-navigation-scroll">
          {['Barter Problem', 'Money Properties', 'Payment Infrastructure', 'Digital Scarcity', 'Money Experiments', 'Money Scorecard', 'Apply Scorecard'].map((step, index) => (
            <button
              key={index}
              className={`step-nav-button ${
                index === currentStep ? 'current' : ''
              } ${completedSteps.has(index) ? 'completed' : ''}`}
              onClick={() => handleTabClick(index)}
            >
              <span className="step-nav-number">
                {completedSteps.has(index) ? '✓' : index + 1}
              </span>
              <span className="step-nav-label">{step}</span>
            </button>
          ))}
          </div>
        </div>
      </div>


      <div className="module-content">
        {currentStep === 0 && <BarterProblem onComplete={handleStepComplete} />}
        {currentStep === 1 && <MoneyProperties onComplete={handleStepComplete} />}
        {currentStep === 2 && <PaymentInfrastructure onComplete={handleStepComplete} />}
        {currentStep === 3 && <DigitalScarcity onComplete={handleStepComplete} />}
        {currentStep === 4 && <MoneyExperiments onComplete={handleStepComplete} onUnlockTrait={handleUnlockTrait} />}
        {currentStep === 5 && <MoneyScorecard unlockedTraits={unlockedTraits} onComplete={handleStepComplete} />}
        {currentStep === 6 && <ApplyScorecard onComplete={handleStepComplete} />}
      </div>
    </div>
  );
};

export default MoneyModule;