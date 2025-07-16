import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '../contexts/ProgressContext';
import { Coins } from 'lucide-react';
import { 
  ContinueButton, 
  ActionButton,
  StepNavigation
} from '../components/ModernButtons';
import '../components/ModuleLayout.css';
import '../components/ModuleCommon.css';
import '../components/MoneyModule.css';

// Simplified Introduction 
const Introduction = ({ onComplete }) => {
  const [currentDemo, setCurrentDemo] = useState(0);
  const [showAnalysis, setShowAnalysis] = useState(false);

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
    <div className="module-container dark-theme">
      <div className="payment-demo-section">
        <h2>What's Really Happening When You Pay?</h2>
        <p>Modern payments look simple, but there's a lot happening behind the scenes. Let's see what's really going on.</p>
        
        <h3>Let's Look at Common Payments</h3>
        <p>Click through these everyday payment examples to see what really happens...</p>

        <div className="demo-container">
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
            
            <div className="demo-result">
              <div className="demo-effect">{currentDemoData.effect}</div>
              <div className="demo-hidden">
                <strong>What Really Happens:</strong><br />
                {currentDemoData.hidden}
              </div>
            </div>
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
          <div className="analysis-section">
            <h4>The Hidden Complexity</h4>
            <p>Every "simple" payment involves multiple companies, systems, and potential points of failure. This complexity is invisible to users but creates:</p>
            <ul>
              <li>Higher costs (fees hidden in exchange rates and processing)</li>
              <li>Slower settlement (your money doesn't move instantly)</li>
              <li>Privacy concerns (every transaction is tracked)</li>
              <li>Control points (accounts can be frozen or restricted)</li>
            </ul>
            
            <div className="insight-box">
              <h5>Key Insight</h5>
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

// Simplified Barter World
const BarterWorld = ({ onComplete }) => {
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
          id: 'A', 
          text: 'Give up and go home', 
          result: 'reject',
          problem: 'coincidence'
        },
        { 
          id: 'B', 
          text: 'Find someone who wants bread AND can give the shoemaker a haircut', 
          result: 'chain',
          problem: 'complexity'
        },
        { 
          id: 'C', 
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
          id: 'A', 
          text: 'Try to coordinate all these trades at once', 
          result: 'chaos',
          problem: 'timing'
        },
        { 
          id: 'B', 
          text: 'Map out all the trades you need to make', 
          result: 'insight',
          problem: 'complexity'
        },
        { 
          id: 'C', 
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
          id: 'A', 
          text: 'Start all over again', 
          result: 'chaos',
          problem: 'timing'
        },
        { 
          id: 'B', 
          text: 'Realize this system has serious problems', 
          result: 'epiphany',
          problem: 'system'
        },
        { 
          id: 'C', 
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
    <div className="module-container dark-theme">
      <div className="barter-world-section">
        <h2>Life Without Money</h2>
        <p>Before money existed, people had to trade directly with each other. Let's see what problems this created.</p>
        
        <h3>Trading Scenarios</h3>
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

        <div className="scenario-card">
          <div className="scenario-header">
            <h3>{currentScenarioData.title}</h3>
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
                    <span className="option-letter">{option.id}.</span>
                    <span className="option-text">{option.text}</span>
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
          <div className="problems-identified">
            <h3>📊 Problems We've Found:</h3>
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
          <div className="analysis-conclusion">
            <div className="conclusion-box">
              <h3>📈 What We Learned</h3>
              <p>Trading without money is really hard! That's why every society eventually invented some form of money.</p>
              
              <div className="economic-insights">
                <h4>The Big Problems:</h4>
                <ul>
                  <li><strong>Hard to Match:</strong> Finding someone who has what you want AND wants what you have</li>
                  <li><strong>Takes Forever:</strong> Searching for the right trading partners</li>
                  <li><strong>Bad Timing:</strong> Everyone needs to be ready to trade at the same time</li>
                  <li><strong>Can't Save:</strong> Food spoils, so you can't store wealth</li>
                  <li><strong>Can't Compare:</strong> How many chickens equals one cow?</li>
                </ul>
              </div>

              <div className="innovation-insight">
                <h4>💡 The Big Idea</h4>
                <p>Money solved these problems by giving people something everyone would accept. This wasn't invented by governments—people created it because they needed it.</p>
              </div>
            </div>
          </div>
        )}

        {showOutcome && (
          <StepNavigation
            currentStep={currentScenario}
            totalSteps={economicScenarios.length}
            onPrevious={handlePrevious}
            onNext={handleNext}
            canGoBack={currentScenario > 0}
            nextLabel={currentScenario === economicScenarios.length - 1 ? "Learn About Money's Jobs" : "Next Scenario"}
          />
        )}
      </div>
    </div>
  );
};

// Simplified CarlosFlowerExport with professional framing
const CarlosFlowerExport = ({ onComplete }) => {
  const [storyViewed, setStoryViewed] = useState(false);
  const [playerChoice, setPlayerChoice] = useState(null);
  const [showReflection, setShowReflection] = useState(false);

  const handleExploreStory = () => {
    window.open('https://layer-d.my.canva.site/inefficiencies-of-traditional-payments-by-dalia', '_blank');
    setStoryViewed(true);
    setTimeout(() => setShowReflection(true), 3000);
  };

  const handleChoice = (choice) => {
    setPlayerChoice(choice);
    setTimeout(() => onComplete(4), 2000);
  };

  const getSystemAnalysis = (choice) => {
    const analyses = {
      fees: "Traditional payment systems extract value through multiple layers of fees, reducing efficiency for productive participants.",
      time: "Settlement delays create cash flow problems and business planning challenges for international commerce.", 
      control: "Centralized intermediaries introduce systemic dependencies and single points of failure.",
      system: "The entire infrastructure prioritizes intermediary extraction over participant efficiency."
    };
    return analyses[choice] || "Modern payment systems create systematic inefficiencies for productive economic actors.";
  };

  return (
    <div className="module-container dark-theme">
      <div className="carlos-export-section">
        <h2>Real-World Payment System Analysis</h2>
        <p>Having established money's theoretical functions, let's examine how current systems perform in practice through a real international commerce case study.</p>
        
        <h3>International Commerce Case Study</h3>
        <p>Carlos operates a flower export business between Colombia and Japan. This represents a typical international commercial transaction involving cross-border payments.</p>
        <p><strong>Analysis Focus:</strong> How effectively do modern payment systems serve legitimate international commerce?</p>

        <div className="case-study-introduction">
          <div className="case-study-frame">
            <div className="case-visual">
              <div className="case-icon">🌹</div>
              <h3>International Commerce Case Study</h3>
            </div>
            <div className="case-context">
              <p>Carlos operates a flower export business between Colombia and Japan. This represents a typical international commercial transaction involving cross-border payments.</p>
              <p><strong>Analysis Focus:</strong> How effectively do modern payment systems serve legitimate international commerce?</p>
            </div>
          </div>
          
          <div className="case-study-engagement">
            <p>Follow this payment process to analyze system performance across money's core functions:</p>
            
            <ActionButton 
              onClick={handleExploreStory} 
              variant="primary"
            >
              Analyze Payment Process
            </ActionButton>
            
            {storyViewed && (
              <div className="analysis-instructions">
                <p><em>Review the payment process carefully. Focus on system efficiency, cost structure, and reliability...</em></p>
              </div>
            )}
          </div>
        </div>

        {showReflection && (
          <div className="analysis-section">
            <div className="analysis-prompt">
              <h3>🔍 System Performance Analysis</h3>
              <p>Based on your review of the payment process, which aspect represents the most significant system inefficiency?</p>
            </div>
            
            <div className="analysis-options">
              <ActionButton 
                onClick={() => handleChoice('fees')}
                variant="outline"
              >
                💸 <strong>Fee Structure</strong><br/>
                <span className="analysis-detail">Multiple intermediaries extracting value at each step</span>
              </ActionButton>
              
              <ActionButton 
                onClick={() => handleChoice('time')}
                variant="outline"
              >
                ⏰ <strong>Settlement Time</strong><br/>
                <span className="analysis-detail">Multi-day processing creating cash flow inefficiencies</span>
              </ActionButton>
              
              <ActionButton 
                onClick={() => handleChoice('control')}
                variant="outline"
              >
                🏦 <strong>Centralized Dependencies</strong><br/>
                <span className="analysis-detail">Multiple single points of failure and control</span>
              </ActionButton>
              
              <ActionButton 
                onClick={() => handleChoice('system')}
                variant="outline"
              >
                🕸️ <strong>Structural Inefficiency</strong><br/>
                <span className="analysis-detail">System designed for intermediary benefit, not user efficiency</span>
              </ActionButton>
            </div>

            {playerChoice && (
              <div className="analysis-response">
                <div className="insight-box">
                  <h4>📊 Analysis Result</h4>
                  <p>{getSystemAnalysis(playerChoice)}</p>
                  <p><strong>This analysis reveals systematic performance gaps in current monetary infrastructure.</strong></p>
                </div>
                
                <div className="next-phase">
                  <p>This case study demonstrates that current systems fail to deliver money's core functions efficiently. Let's systematically examine why these failures persist across different monetary systems.</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// Simplified Money Functions Analysis
const MoneyFunctionsAnalysis = ({ onComplete }) => {
  const [currentScenario, setCurrentScenario] = useState(0);
  const [answers, setAnswers] = useState({});
  const [feedback, setFeedback] = useState({});
  const [unlockedFunctions, setUnlockedFunctions] = useState([]);

  const scenarios = [
    {
      id: 1,
      title: "🛒 Shopping at the Market",
      description: "You want to buy apples. The seller wants $3 per pound.",
      question: "What job is money doing here?",
      options: [
        { value: 'A', label: 'Helping you trade - making the exchange possible' },
        { value: 'B', label: 'Storing your wealth for later' },
        { value: 'C', label: 'Measuring value - telling you how much things cost' }
      ],
      feedback: {
        A: "✓ Right! Money makes trades easy because everyone accepts it.",
        B: "Not quite - you're using it now, not storing it.",
        C: "Close, but the main job here is making the exchange work."
      },
      correctAnswer: 'A',
      moneyFunction: 'Medium of Exchange',
      explanation: "Money's first job is making trades possible. Everyone accepts it, so you don't need to find someone who wants exactly what you have."
    },
    {
      id: 2,
      title: "💰 Saving for a Vacation",
      description: "You put $200 in your savings account each month for a vacation next year.",
      question: "What job is money doing here?",
      options: [
        { value: 'A', label: 'Helping you make trades right now' },
        { value: 'B', label: 'Keeping your wealth safe until you need it' },
        { value: 'C', label: 'Measuring how much things cost' }
      ],
      feedback: {
        A: "Not quite - you're not trading right now, you're saving.",
        B: "✓ Exactly! Money lets you save up value for later.",
        C: "That's another job of money, but not what's happening here."
      },
      correctAnswer: 'B',
      moneyFunction: 'Store of Value',
      explanation: "Money's second job is holding onto value over time. You can save it today and spend it later."
    },
    {
      id: 3,
      title: "🏠 Comparing House Prices",
      description: "You're looking at houses. One costs $300,000, another costs $450,000.",
      question: "What job is money doing here?",
      options: [
        { value: 'A', label: 'Making the trade possible' },
        { value: 'B', label: 'Storing value for you' },
        { value: 'C', label: 'Giving you a way to compare prices' }
      ],
      feedback: {
        A: "You're not trading yet - just comparing.",
        B: "You're not storing value - you're comparing prices.",
        C: "✓ Perfect! Money gives you a standard way to measure and compare value."
      },
      correctAnswer: 'C',
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
      setTimeout(() => {
        if (currentScenario < scenarios.length - 1) {
          setCurrentScenario(currentScenario + 1);
        } else {
          setTimeout(() => onComplete(2), 1500);
        }
      }, 2000);
    }
  };

  const currentScenarioData = scenarios[currentScenario];
  
  return (
    <div className="module-container dark-theme">
      <div className="functions-analysis-section">
        <h2>What Jobs Does Money Do?</h2>
        <p>Money has three main jobs. Let's look at some everyday examples to understand each one.</p>
        
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
            <div className="analysis-options">
              {currentScenarioData.options.map(option => (
                <ActionButton
                  key={option.value}
                  variant={answers[currentScenarioData.id] === option.value ? 'primary' : 'outline'}
                  onClick={() => handleAnswer(currentScenarioData.id, option.value)}
                >
                  {option.label}
                </ActionButton>
              ))}
            </div>
          )}
          
          {feedback[currentScenarioData.id] && (
            <div className={`result-display ${feedback[currentScenarioData.id].includes('✓') ? 'correct' : 'incorrect'}`}>
              <p>{feedback[currentScenarioData.id]}</p>
              {feedback[currentScenarioData.id].includes('✓') && (
                <div className="function-identified">
                  <h4>Money's Job: {currentScenarioData.moneyFunction}</h4>
                  <p>{currentScenarioData.explanation}</p>
                </div>
              )}
            </div>
          )}
        </div>

        {unlockedFunctions.length === 3 && (
          <div className="analysis-complete">
            <h3>✅ All Three Jobs Found!</h3>
            <p>Great! Now you understand what money needs to do. Let's see how well current money does these jobs.</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Component for the Historical Analysis - Simplified
const HistoricalAnalysis = ({ onComplete, onUnlockTrait }) => {
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
      trait: "Self Custody"
    },
    {
      id: 2,
      context: "Throughout history, every government that could print money eventually printed too much, making it worth less and less.",
      question: "What does this tell us?",
      options: [
        "This is just how economies work",
        "Governments need to print money sometimes", 
        "When one group controls money printing, they always print too much"
      ],
      answer: 2,
      insight: "History shows that when governments can print money, they eventually print too much and destroy its value.",
      trait: "Fixed Supply"
    },
    {
      id: 3,
      context: "Zimbabwe printed so much money that prices doubled every day. A loaf of bread cost billions of dollars.",
      question: "What does this show us about money?",
      options: [
        "They should have printed even more money",
        "Money only works if there's a limited amount of it",
        "This was just a temporary problem"
      ],
      answer: 1,
      insight: "If you can create unlimited money, it becomes worthless. Scarcity is what gives money value.",
      trait: "Genuine Scarcity"
    },
    {
      id: 4,
      context: "Gold was great money for thousands of years, but it was heavy to carry and hard to verify if it was real.",
      question: "What problem did gold have?",
      options: [
        "It wasn't pretty enough",
        "It was hard to transport and check",
        "There wasn't enough of it"
      ],
      answer: 1,
      insight: "Good money needs to be easy to carry around and verify quickly.",
      trait: "Portability"
    },
    {
      id: 5,
      context: "Ancient people used things like grain and cows as money, but these would rot or die over time.",
      question: "What was the problem?",
      options: [
        "They were too valuable",
        "They didn't last long enough",
        "They were too easy to divide"
      ],
      answer: 1,
      insight: "Money needs to last a long time so you can save it without it going bad.",
      trait: "Durability"
    },
    {
      id: 6,
      context: "Roman coins became unreliable because some had more silver than others. People started rejecting certain coins.",
      question: "What happened to trust in the money?",
      options: [
        "People got used to it",
        "When coins weren't the same, people lost trust",
        "Extra coins made up for it"
      ],
      answer: 1,
      insight: "Good money means every unit is exactly the same as every other unit.",
      trait: "Fungibility"
    },
    {
      id: 7,
      context: "On Yap Island, they used giant stone wheels as money. The stones never moved - people just remembered who owned them.",
      question: "What does this teach us?",
      options: [
        "You have to physically hold your money",
        "Keeping track of ownership can work without moving things around",
        "Stone money was a bad idea"
      ],
      answer: 1,
      insight: "Money can work as a record of who owns what, even without physical exchange.",
      trait: "Consensus Ledger"
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
      <div className="module-container dark-theme">
        <div className="historical-intro-section">
          <h2>Learning from History</h2>
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
    <div className="module-container dark-theme">
      <div className="historical-analysis-section">
        <h2>Historical Examples</h2>
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
              <div className="answer-options">
                {currentQuestionData.options.map((option, index) => (
                  <ActionButton
                    key={index}
                    onClick={() => handleAnswer(index)}
                  >
                    {option}
                  </ActionButton>
                ))}
              </div>
            )}
            
            {showFeedback && (
              <div className="feedback-section">
                <div className={`selected-answer ${selectedAnswer === currentQuestionData.answer ? 'correct' : 'incorrect'}`}>
                  <p><strong>You selected:</strong> {currentQuestionData.options[selectedAnswer]}</p>
                </div>
                
                <div className="correct-answer">
                  <p><strong>The key insight:</strong> {currentQuestionData.options[currentQuestionData.answer]}</p>
                </div>
                
                <div className="insight-box">
                  <h4>💡 What This Teaches Us</h4>
                  <p>{currentQuestionData.insight}</p>
                  {selectedAnswer === currentQuestionData.answer && (
                    <div className="trait-unlocked">
                      <p><strong>Property Unlocked:</strong> {currentQuestionData.trait}</p>
                    </div>
                  )}
                </div>
                
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

// Sound Money Framework - Simplified
const SoundMoneyFramework = ({ unlockedTraits, onComplete }) => {
  const [step, setStep] = useState(0);

  const frameworkSteps = [
    {
      title: "Your Money Framework",
      content: (
        <div className="framework-intro">
          <h3>What Makes Good Money?</h3>
          <p>Based on what you've learned from history, here's your framework for evaluating any form of money:</p>
          
          <div className="trait-summary">
            <h4>Essential Properties:</h4>
            <div className="traits-grid">
              <div className="trait-card">
                <h5>🔒 Self Custody</h5>
                <p>You control your money, not someone else</p>
              </div>
              <div className="trait-card">
                <h5>📊 Fixed Supply</h5>
                <p>No one can print more to benefit themselves</p>
              </div>
              <div className="trait-card">
                <h5>💎 Genuine Scarcity</h5>
                <p>The limited supply is real and enforced</p>
              </div>
              <div className="trait-card">
                <h5>📱 Portability</h5>
                <p>Easy to transport and verify</p>
              </div>
              <div className="trait-card">
                <h5>⏳ Durability</h5>
                <p>Lasts over time without degrading</p>
              </div>
              <div className="trait-card">
                <h5>🔄 Fungibility</h5>
                <p>Every unit is identical to every other unit</p>
              </div>
              <div className="trait-card">
                <h5>📋 Consensus Ledger</h5>
                <p>Everyone agrees on who owns what</p>
              </div>
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
    <div className="module-container dark-theme">
      <div className="sound-money-framework-section">
        <h2>{frameworkSteps[step].title}</h2>
        <p>Step {step + 1} of {frameworkSteps.length}</p>
        
        {frameworkSteps[step].content}
        
        <StepNavigation
          currentStep={step}
          totalSteps={frameworkSteps.length}
          onPrevious={handlePrevious}
          onNext={handleNext}
          canGoBack={step > 0}
          nextLabel={step === frameworkSteps.length - 1 ? "Complete Money Module" : "Next"}
        />
      </div>
    </div>
  );
};

// Module Completion - Simplified
const ModuleCompletion = ({ onComplete }) => {
  return (
    <div className="module-container dark-theme">
      <div className="module-completion-section">
        <h2>🎉 Congratulations!</h2>
        <p>You've built a solid foundation for understanding money and Bitcoin.</p>
        
        <h3>What You've Learned</h3>
        <div className="learning-outcomes">
          <div className="outcome-item">
            <span className="outcome-number">1</span>
            <div className="outcome-content">
              <h4>Why Money Exists</h4>
              <p>You understand the problems money solves and why every society needs it.</p>
            </div>
          </div>
          
          <div className="outcome-item">
            <span className="outcome-number">2</span>
            <div className="outcome-content">
              <h4>How Money Works</h4>
              <p>You know the three jobs money does and how to recognize when it's working well.</p>
            </div>
          </div>
          
          <div className="outcome-item">
            <span className="outcome-number">3</span>
            <div className="outcome-content">
              <h4>Lessons from History</h4>
              <p>You've learned from past successes and failures to understand what makes good money.</p>
            </div>
          </div>
        </div>

        <div className="next-analysis">
          <h3>🟠 Ready for Bitcoin</h3>
          <p>Now you can apply your knowledge to understand:</p>
          <ul>
            <li>How Bitcoin implements your money framework</li>
            <li>Why it was designed with these specific features</li>
            <li>How it compares to traditional money systems</li>
            <li>What makes it unique among digital currencies</li>
          </ul>
        </div>

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

        <ContinueButton onClick={() => onComplete(6)}>
          Complete Money Module
        </ContinueButton>
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

  const handleStepComplete = (stepIndex) => {
    const newCompletedSteps = new Set(completedSteps).add(stepIndex);
    setCompletedSteps(newCompletedSteps);
    
    try {
      localStorage.setItem('moneyModuleCompletedSteps', JSON.stringify(Array.from(newCompletedSteps)));
    } catch (error) {
      console.warn('Failed to save progress to localStorage:', error);
    }
    
    if (stepIndex === 6) {
      completeModule('money');
      setTimeout(() => {
        navigate('/');
      }, 2000);
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
      <div className="module-header">
        <h1 className="module-title">
          <Coins className="module-icon" />
          Understanding Money
        </h1>
      </div>

      <ContinueButton className="reset-progress-button" onClick={handleResetProgress}>
        Reset Progress
      </ContinueButton>

      <div className="module-progress">
        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ width: `${(completedSteps.size / 7) * 100}%` }}
          />
        </div>
        <span className="progress-text">
          {completedSteps.size} / 7 sections completed
        </span>
      </div>

      <div className="top-navigation">
        {['How Payments Work', 'Life Without Money', 'What Money Does', 'Real World Example', 'Learning from History', 'Your Money Framework', 'Complete'].map((step, index) => (
          <ContinueButton
            key={index}
            className={`top-nav-button ${
              index === currentStep ? 'active' : ''
            } ${completedSteps.has(index) ? 'completed' : ''}`}
            onClick={() => handleTabClick(index)}
          >
            <span className="nav-text">
              {index + 1}. {step}
            </span>
          </ContinueButton>
        ))}
      </div>

      <div className="module-content">
        {currentStep === 0 && <Introduction onComplete={handleStepComplete} />}
        {currentStep === 1 && <BarterWorld onComplete={handleStepComplete} />}
        {currentStep === 2 && <MoneyFunctionsAnalysis onComplete={handleStepComplete} />}
        {currentStep === 3 && <CarlosFlowerExport onComplete={handleStepComplete} />}
        {currentStep === 4 && <HistoricalAnalysis onComplete={handleStepComplete} onUnlockTrait={handleUnlockTrait} />}
        {currentStep === 5 && <SoundMoneyFramework unlockedTraits={unlockedTraits} onComplete={handleStepComplete} />}
        {currentStep === 6 && <ModuleCompletion onComplete={handleStepComplete} />}
      </div>
    </div>
  );
};

export default MoneyModule;