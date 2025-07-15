import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '../contexts/ProgressContext';
import { Coins } from 'lucide-react';
import AnimatedIcon from '../components/AnimatedIcon';
import { 
  ContinueButton, 
  ActionButton,
  Button, 
  OptionButton,
  NavigationButton
} from '../components/EnhancedButtons';
import '../components/ModuleLayout.css';
import '../components/ModuleCommon.css';
import '../components/MoneyModule.css';

// Reusable Visual Capitalist Section Component
// const VisualCapitalistSection = ({ icon, title, description, url, buttonText }) => (
//   <div className="explore-further-section">
//     <div className="explore-further-header">
//       <span className="explore-further-icon">{icon}</span>
//       <h4 className="explore-further-title">{title}</h4>
//     </div>
//     <p className="explore-further-description">{description}</p>
//     <a
//       href={url}
//       target="_blank"
//       rel="noopener noreferrer"
//       className="explore-further-button"
//     >
//       <span className="button-icon">🔍</span>
//       {buttonText}
//     </a>
//   </div>
// );

// Enhanced Introduction with better hook and progression
const Introduction = ({ onComplete }) => {
  const [currentDemo, setCurrentDemo] = useState(0);
  const [userReflection, setUserReflection] = useState('');
  const [showTimeTravel, setShowTimeTravel] = useState(false);

  const modernPaymentDemos = [
    {
      title: "💳 Tap to Pay",
      description: "You tap your card. Money zips across the globe instantly.",
      action: "Tap the Card",
      effect: "✨ $25 sent to merchant!",
      hidden: "Behind the scenes: 7 banks, 3 countries, 4 currencies, dozens of fees..."
    },
    {
      title: "📱 Send Money",
      description: "You Venmo your friend $20 for coffee.",
      action: "Send $20",
      effect: "💸 Money sent instantly!",
      hidden: "Hidden reality: Frozen accounts, transaction limits, surveillance, bank dependencies..."
    },
    {
      title: "🌍 International Transfer",
      description: "Send $500 to your family abroad.",
      action: "Send International",
      effect: "🚀 Transfer initiated!",
      hidden: "The truth: 3-5 days delay, $15-50 fees, exchange rate markup, compliance checks..."
    }
  ];

  const currentDemoData = modernPaymentDemos[currentDemo];

  const handleDemoAction = () => {
    // Show the hidden complexity after a brief delay
    setTimeout(() => {
      if (currentDemo < modernPaymentDemos.length - 1) {
        setCurrentDemo(currentDemo + 1);
      } else {
        setShowTimeTravel(true);
      }
    }, 2500);
  };

  const handleTimeTravel = () => {
    onComplete(0);
  };

  return (
    <div className="step-content introduction">
      <div className="module-header-box">
        <h2>The Great Money Illusion</h2>
        <div className="intro-text">
          <p className="prime-text">Modern payments feel like magic. But underneath the smooth surface lies a system more complex and fragile than most people realize.</p>
        </div>
      </div>
      
      <div className="content-text">
        <div className="payment-demo-section">
          <h3>Experience "Seamless" Modern Money</h3>
          <p>Try these everyday payment scenarios and discover what's really happening...</p>

          <div className="demo-container">
            <div className="payment-demo-card">
              <div className="demo-header">
                <h4>{currentDemoData.title}</h4>
                <p>{currentDemoData.description}</p>
              </div>
              
              <div className="demo-interaction">
                <ActionButton 
                  onClick={handleDemoAction}
                  className="demo-action-button"
                  variant="primary"
                  icon="💳"
                  iconPosition="left"
                >
                  {currentDemoData.action}
                </ActionButton>
              </div>
              
              <div className="demo-result">
                <p className="surface-result">{currentDemoData.effect}</p>
                <div className="hidden-complexity">
                  <p><strong>What you don't see:</strong></p>
                  <p className="complexity-text">{currentDemoData.hidden}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="progress-dots">
            {modernPaymentDemos.map((_, index) => (
              <div 
                key={index} 
                className={`demo-dot ${index <= currentDemo ? 'completed' : ''}`}
              />
            ))}
          </div>
        </div>

        {showTimeTravel && (
          <div className="time-travel-section">
            <div className="revelation-box">
              <h3>🎭 The Illusion Unveiled</h3>
              <p>Every "instant" payment involves dozens of intermediaries, hidden fees, and potential failure points. The system appears smooth but is incredibly complex and centralized.</p>
              
              <div className="reflection-prompt">
                <p><strong>Before we continue:</strong> What surprised you most about these payment realities?</p>
                <textarea 
                  value={userReflection}
                  onChange={(e) => setUserReflection(e.target.value)}
                  placeholder="Share your thoughts... (optional but encouraged)"
                  className="reflection-input"
                />
              </div>
              
              <div className="time-travel-hook">
                <p>Now, let's travel back 10,000 years to understand why humans invented money in the first place...</p>
                <p className="character-intro"><strong>🥔 Meet Paco the Potato Farmer:</strong> Your feet are freezing, you need shoes, but all you have are potatoes. What's your move?</p>
              </div>
              
              <ContinueButton 
                onClick={handleTimeTravel}
                className="time-travel-button"
                icon="⏰"
                iconPosition="left"
              >
                Enter the Stone Age
              </ContinueButton>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Enhanced BarterWorld with better progression and interactivity
const BarterWorld = ({ onComplete }) => {
  const [currentScenario, setCurrentScenario] = useState(0);
  const [playerChoice, setPlayerChoice] = useState(null);
  const [showOutcome, setShowOutcome] = useState(false);
  const [tradeAttempts, setTradeAttempts] = useState(0);
  const [discoveredProblems, setDiscoveredProblems] = useState(new Set());

  const tradeScenarios = [
    {
      id: 1,
      title: "🍞 The Baker's Dilemma",
      situation: "Your feet are freezing. You need shoes. You have a sack of potatoes.",
      trader: "The baker has bread, but says: 'I need bricks to fix my oven, not potatoes!'",
      choice: "What's your strategy?",
      options: [
        { 
          id: 'A', 
          text: 'Offer potatoes anyway - maybe convince him?', 
          result: 'reject',
          problem: 'coincidence'
        },
        { 
          id: 'B', 
          text: 'Ask who might have bricks', 
          result: 'chain',
          problem: 'complexity' 
        },
        { 
          id: 'C', 
          text: 'Look for someone who wants potatoes directly', 
          result: 'search',
          problem: 'time'
        }
      ]
    },
    {
      id: 2, 
      title: "🐟 The Fisher's Network",
      situation: "You learned the bricklayer wants fish. Now you need to find the fisher.",
      trader: "The fisher says: 'I'll trade fish for bread, but you only have potatoes.'",
      choice: "The trading chain is getting complex...",
      options: [
        { 
          id: 'A', 
          text: 'Try the potato-for-fish trade again', 
          result: 'reject',
          problem: 'coincidence'
        },
        { 
          id: 'B', 
          text: 'Map out the full chain: Potatoes → Bread → Fish → Bricks → Shoes', 
          result: 'insight',
          problem: 'complexity'
        },
        { 
          id: 'C', 
          text: 'Give up and go barefoot this winter', 
          result: 'quit',
          problem: 'failure'
        }
      ]
    },
    {
      id: 3,
      title: "🏗️ The Reality Check",
      situation: "You need 4 successful trades in sequence. That's assuming everyone still has what you need when you get there.",
      trader: "The bricklayer says: 'I just traded my last bricks to someone else. Come back next month.'",
      choice: "This system is fundamentally broken...",
      options: [
        { 
          id: 'A', 
          text: 'Start the whole chain over from scratch', 
          result: 'chaos',
          problem: 'timing'
        },
        { 
          id: 'B', 
          text: 'Realize there must be a better way', 
          result: 'epiphany',
          problem: 'system'
        },
        { 
          id: 'C', 
          text: 'Invent something everyone accepts', 
          result: 'genius',
          problem: 'solution'
        }
      ]
    }
  ];

  const problemTypes = {
    coincidence: "Double Coincidence of Wants",
    complexity: "Complex Trading Chains", 
    time: "Time and Search Costs",
    timing: "Timing and Coordination",
    failure: "System Failure Rate",
    system: "Systemic Inefficiency",
    solution: "Need for Universal Medium"
  };

  const handleChoice = (optionId) => {
    setPlayerChoice(optionId);
    setShowOutcome(true);
    setTradeAttempts(prev => prev + 1);
    
    const selectedOption = tradeScenarios[currentScenario].options.find(opt => opt.id === optionId);
    if (selectedOption?.problem) {
      setDiscoveredProblems(prev => new Set([...prev, selectedOption.problem]));
    }
    
    setTimeout(() => {
      if (currentScenario < tradeScenarios.length - 1) {
        setCurrentScenario(prev => prev + 1);
        setPlayerChoice(null);
        setShowOutcome(false);
      } else {
        onComplete(1);
      }
    }, 3000);
  };

  const getOutcomeText = (result) => {
    const outcomes = {
      reject: "❌ 'I don't want potatoes!' You're discovering the 'double coincidence of wants' problem.",
      chain: "🔍 You map out the trading chain. This is getting ridiculously complicated...",
      search: "🔍 After hours of searching, you find someone who wants potatoes... but they only have carrots.",
      quit: "😤 You walk away empty-handed. Your feet will freeze this winter.",
      insight: "💡 The chain needs perfect timing: Potatoes → Bread → Fish → Bricks → Shoes. What could go wrong?",
      chaos: "🌪️ Someone already traded away what you need. You're back to square one. Again.",
      epiphany: "⚡ This system wastes enormous amounts of time and often fails completely!",
      genius: "🧠 You just invented the concept of money! Something everyone accepts for anything."
    };
    return outcomes[result] || "Something happened...";
  };

  const currentScenarioData = tradeScenarios[currentScenario];
  
  return (
    <div className="step-content barter-world">
      <div className="module-header-box">
        <h2>Paco's Trading Adventure</h2>
        <div className="intro-text">
          <p className="prime-text">Experience the painful reality of barter economics. Every choice reveals why humans desperately needed to invent money.</p>
        </div>
      </div>
      
      <div className="content-text">
        {/* Progress tracking */}
        <div className="adventure-progress">
          <div className="scenario-tracker">
            <h3>Trading Progress</h3>
            <div className="progress-stats">
              <div className="stat-item">
                <span className="stat-label">Scenario:</span>
                <span className="stat-value">{currentScenario + 1} of {tradeScenarios.length}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Attempts:</span>
                <span className="stat-value">{tradeAttempts}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Problems Found:</span>
                <span className="stat-value">{discoveredProblems.size} of 7</span>
              </div>
            </div>
          </div>
        </div>

        {/* Current scenario */}
        <div className="scenario-card">
          <div className="scenario-header">
            <h3>{currentScenarioData.title}</h3>
            <div className="scenario-setup">
              <p className="situation"><strong>Situation:</strong> {currentScenarioData.situation}</p>
              <p className="trader-response"><strong>The Trader:</strong> {currentScenarioData.trader}</p>
            </div>
          </div>
          
          <div className="choice-section">
            <p className="choice-prompt"><strong>{currentScenarioData.choice}</strong></p>
            
            {!showOutcome ? (
              <div className="choice-options">
                {currentScenarioData.options.map(option => (
                  <OptionButton
                    key={option.id}
                    onClick={() => handleChoice(option.id)}
                    className="barter-choice-button"
                    variant="default"
                  >
                    <span className="option-letter">{option.id}.</span>
                    <span className="option-text">{option.text}</span>
                  </OptionButton>
                ))}
              </div>
            ) : (
              <div className="outcome-display">
                <div className="choice-result">
                  <p><strong>You chose:</strong> {currentScenarioData.options.find(o => o.id === playerChoice)?.text}</p>
                  <div className="outcome-box">
                    <p className="outcome-text">{getOutcomeText(currentScenarioData.options.find(o => o.id === playerChoice)?.result)}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Problems discovered tracker */}
        {discoveredProblems.size > 0 && (
          <div className="problems-discovered">
            <h3>🔍 Barter Problems You've Discovered:</h3>
            <div className="problems-grid">
              {Array.from(discoveredProblems).map(problem => (
                <div key={problem} className="problem-badge">
                  ✓ {problemTypes[problem]}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Final summary when adventure complete */}
        {currentScenario === tradeScenarios.length - 1 && showOutcome && (
          <div className="adventure-conclusion">
            <div className="conclusion-box">
              <h3>🎯 Mission Impossible: Complete</h3>
              <p>You just experienced firsthand why barter economies never lasted. The "double coincidence of wants" makes simple trades incredibly complex.</p>
              
              <div className="barter-failure-summary">
                <h4>Why Barter Failed Humanity:</h4>
                <ul>
                  <li><strong>Time Waste:</strong> Endless searching for the right trade partners</li>
                  <li><strong>Complexity:</strong> Multi-step chains that often break</li>
                  <li><strong>Timing Issues:</strong> What you need might be gone when you get there</li>
                  <li><strong>No Storage:</strong> Potatoes rot, you can't save wealth over time</li>
                  <li><strong>No Standards:</strong> How many potatoes equal one pair of shoes?</li>
                </ul>
              </div>

              <div className="money-breakthrough">
                <h4>💡 The Breakthrough Insight</h4>
                <p>Someone finally thought: <em>"What if we all agreed on ONE thing that everyone accepts for everything?"</em></p>
                <p><strong>Money was born.</strong> Not created by governments or banks—invented by frustrated humans tired of impossible trades.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Enhanced CarlosFlowerExport with better integration
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

  const getCarlosInsight = (choice) => {
    const insights = {
      fees: "Traditional payments nickle-and-dime everyone with hidden costs. Carlos loses money just for getting paid.",
      time: "When money moves slowly, businesses suffer. Carlos can't plan or reinvest quickly.", 
      control: "Banks sit between Carlos and his money, adding friction and extracting value.",
      system: "The entire system is designed to extract value from productive people like Carlos."
    };
    return insights[choice] || "Every aspect of this system makes life harder for productive people.";
  };

  return (
    <div className="step-content carlos-export-step">
      <div className="module-header-box">
        <h2>Real People, Real Problems</h2>
        <div className="intro-text">
          <p className="prime-text">You now understand money's three essential functions. But what happens when money systems fail to deliver them? Let's meet someone dealing with these failures every day.</p>
        </div>
      </div>

      <div className="content-text">
        <div className="carlos-introduction">
          <div className="character-spotlight">
            <div className="character-visual">
              <div className="character-icon">🌹</div>
              <h3>Carlos the Flower Exporter</h3>
            </div>
            <div className="character-story">
              <p>Carlos grows beautiful roses in Colombia and sells them to florists in Japan. It sounds like a simple international business...</p>
              <p><strong>But watch what happens when he tries to get paid.</strong></p>
            </div>
          </div>
          
          <div className="story-engagement">
            <p>Follow Carlos through a typical payment to see how modern money fails at its most basic functions:</p>
            
            <ActionButton 
              onClick={handleExploreStory} 
              className="explore-story-button"
              variant="primary"
              icon="🌹"
              iconPosition="left"
            >
              Follow Carlos's Payment Journey
            </ActionButton>
            
            {storyViewed && (
              <div className="viewing-instructions">
                <p className="instruction-text">📖 <em>Take your time exploring Carlos's story. When you're ready, return here to reflect...</em></p>
              </div>
            )}
          </div>
        </div>

        {showReflection && (
          <div className="reflection-section">
            <div className="reflection-prompt">
              <h3>🤔 What struck you most about Carlos's experience?</h3>
              <p>You've seen how money should work in theory. Now you've witnessed how it fails in practice. What bothered you most?</p>
            </div>
            
            <div className="choice-options">
              <OptionButton 
                onClick={() => handleChoice('fees')}
                className="carlos-choice-button"
                variant="outline"
              >
                💸 <strong>The Hidden Fees</strong><br/>
                <span className="choice-detail">Banks and processors eating into his hard-earned profits</span>
              </OptionButton>
              
              <OptionButton 
                onClick={() => handleChoice('time')}
                className="carlos-choice-button" 
                variant="outline"
              >
                ⏰ <strong>The Delays</strong><br/>
                <span className="choice-detail">Days of waiting while his business is put on hold</span>
              </OptionButton>
              
              <OptionButton 
                onClick={() => handleChoice('control')}
                className="carlos-choice-button"
                variant="outline"
              >
                🏦 <strong>The Control</strong><br/>
                <span className="choice-detail">Banks having power over every step of his payment</span>
              </OptionButton>
              
              <OptionButton 
                onClick={() => handleChoice('system')}
                className="carlos-choice-button"
                variant="outline"
              >
                🕸️ <strong>The Broken System</strong><br/>
                <span className="choice-detail">The entire system working against productive people</span>
              </OptionButton>
            </div>

            {playerChoice && (
              <div className="choice-response">
                <div className="insight-box">
                  <h4>💡 Exactly Right!</h4>
                  <p>{getCarlosInsight(playerChoice)}</p>
                  <p><strong>Now you understand why we need to reimagine what money should actually do.</strong></p>
                </div>
                
                <div className="transition-hook">
                  <p>Carlos's story shows how modern money fails real people every day. Ready to systematically analyze <em>why</em> these failures keep happening?</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// Component for the "What's Missing Here?" section
const WhatsWrong = ({ onComplete }) => {
  const [answers, setAnswers] = useState({});
  const [feedback, setFeedback] = useState({});
  const [currentScenario, setCurrentScenario] = useState(0);
  const [unlockedFunctions, setUnlockedFunctions] = useState([]);
  const [isLocked, setIsLocked] = useState(false);

  const scenarios = [
    {
      id: 'q1',
      title: "🍞 The Sandwich Stand-Off",
      description: "You're a hungry web designer. You offer the baker a free website in exchange for a sandwich. He says, 'I need a plumber, not a homepage.'",
      question: "What's stopping this trade from happening? What could solve it?",
      options: [
        { value: 'A', label: 'Money as a Medium of Exchange - Everyone accepts it, making trades smooth' },
        { value: 'B', label: 'Money as a Store of Value - Save your wealth over time' },
        { value: 'C', label: 'Money as a Unit of Account - Common way to measure value' }
      ],
      feedback: {
        A: "🎉 Correct! You need a smoother way to trade. Money lets you convert your skills into something everyone accepts.",
        B: "You're not trying to save food for later—you're just trying to make a trade now.",
        C: "You know the sandwich is valuable—you just can't exchange your skills for it."
      },
      correctAnswer: 'A',
      moneyFunction: 'Medium of Exchange',
      explanation: "Money solves the 'double coincidence of wants' by being universally accepted."
    },
    {
      id: 'q2',
      title: "🥔 The Rotten Paycheck",
      description: "You grew potatoes to pay your carpenter next month. But by then, they've all rotted or turned into weird sprouts.",
      question: "Why didn't your payment plan work? What could help preserve your effort over time?",
      options: [
        { value: 'A', label: 'Money as a Medium of Exchange - Everyone accepts it, making trades smooth' },
        { value: 'B', label: 'Money as a Store of Value - Save your wealth over time' },
        { value: 'C', label: 'Money as a Unit of Account - Common way to measure value' }
      ],
      feedback: {
        A: "You weren't trying to trade right away. The issue was storing value for later.",
        B: "🎉 Correct! Good money doesn't rot, rust, or spoil. It preserves your wealth over time.",
        C: "You knew what the potatoes were worth—they just didn't last."
      },
      correctAnswer: 'B',
      moneyFunction: 'Store of Value',
      explanation: "Money must hold its value over time, unlike perishable goods."
    },
    {
      id: 'q3',
      title: "🎩 The Bread-for-Hat Deal",
      description: "Someone offers five loaves of bread for your hat. Is that a fair deal? Too much? Not enough? Nobody knows.",
      question: "What's missing to help you both agree on whether this is a fair exchange?",
      options: [
        { value: 'A', label: 'Money as a Medium of Exchange - Everyone accepts it, making trades smooth' },
        { value: 'B', label: 'Money as a Store of Value - Save your wealth over time' },
        { value: 'C', label: 'Money as a Unit of Account - Common way to measure value' }
      ],
      feedback: {
        A: "You *can* trade—the issue is figuring out if it's a good trade.",
        B: "You're not trying to store anything—you just want to know what it's worth.",
        C: "🎉 Correct! Money gives us a standard ruler for measuring value, like inches for distance."
      },
      correctAnswer: 'C',
      moneyFunction: 'Unit of Account',
      explanation: "Money provides a common measuring stick for comparing the value of different things."
    }
  ];

  const handleAnswer = (questionId, value) => {
    if (isLocked) return;
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
      setIsLocked(true);
      setTimeout(() => {
        setIsLocked(false);
        if (currentScenario < scenarios.length - 1) {
          setCurrentScenario(currentScenario + 1);
        } else {
          setTimeout(() => onComplete(2), 1500);
        }
      }, 2000);
    } else {
      setIsLocked(false);
    }
  };

  const currentScenarioData = scenarios[currentScenario];
  
  return (
    <div className="step-content whats-wrong-step">
      <div className="module-header-box">
        <h2>Money's Three Jobs</h2>
      </div>

      <div className="content-text">
        <p>Each scenario reveals why money exists. Can you spot what job money needs to do?</p>

        <div className="scenario-progress">
          <div className="progress-dots">
            {scenarios.map((_, index) => (
              <div 
                key={index} 
                className={`dot ${index === currentScenario ? 'current' : ''} ${index < currentScenario ? 'completed' : ''}`}
              >
                {index < currentScenario ? '✅' : index + 1}
              </div>
            ))}
          </div>
        </div>

        <div className="current-scenario">
          <h3>{currentScenarioData.title}</h3>
          <p className="scenario-setup">{currentScenarioData.description}</p>
          <p className="scenario-question"><strong>{currentScenarioData.question}</strong></p>
          
          {!feedback[currentScenarioData.id] && (
            <div className="choice-options">
              {currentScenarioData.options.map(option => (
                <button
                  key={option.value}
                  className={`choice-button ${answers[currentScenarioData.id] === option.value ? 'selected' : ''}`}
                  onClick={() => handleAnswer(currentScenarioData.id, option.value)}
                  disabled={isLocked}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
          
          {feedback[currentScenarioData.id] && (
            <div className={`outcome-display ${feedback[currentScenarioData.id].includes('🎉') ? 'correct' : 'incorrect'}`}>
              <p>{feedback[currentScenarioData.id]}</p>
              {feedback[currentScenarioData.id].includes('🎉') && (
                <div className="function-unlocked">
                  <h4>💡 Function Unlocked: {currentScenarioData.moneyFunction}</h4>
                  <p>{currentScenarioData.explanation}</p>
                </div>
              )}
            </div>
          )}
        </div>

        {unlockedFunctions.length === 3 && (
          <div className="completion-message">
            <h3>🎉 You've Discovered All Three Functions!</h3>
            <p>Now you know why money was humanity's breakthrough invention.</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Component for the Money Quiz
const MoneyQuiz = ({ onComplete, onUnlockTrait }) => {
  const [showIntro, setShowIntro] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);

  // Helper function to explain why an incorrect answer is wrong
  const getIncorrectExplanation = (question, answerIndex) => {
    const explanations = {
      1: [
        "Caution doesn't explain why people couldn't access their own money.",
        "Exactly! If you can't control your money, you don't truly own it.",
        "The problem wasn't demand—it was that banks controlled access to people's funds."
      ],
      2: [
        "These patterns repeat across different economic systems throughout history.",
        "Money printing may seem necessary, but it always ends in wealth transfer from savers to money creators.",
        "Exactly! Those who control the money supply always eventually abuse that power."
      ],
      3: [
        "No amount of money printing could restore confidence once hyperinflation began.",
        "Exactly! True scarcity cannot be faked or manipulated by authorities.",
        "Money printing destroys wealth—it doesn't create it."
      ],
      4: [
        "Beauty isn't a monetary flaw—it's actually desirable for money.",
        "Exactly! Physical transportation and verification limits prevented gold from being ideal money.",
        "Scarcity is actually a strength, not a weakness of sound money."
      ],
      5: [
        "High value isn't a problem—money should be valuable.",
        "Exactly! Money that decays over time cannot reliably store value.",
        "Divisibility is actually good—you want to be able to make change."
      ],
      6: [
        "People adapted, but trust in the monetary system was fundamentally damaged.",
        "Exactly! When money units aren't identical, the whole system loses credibility.",
        "Making more debased coins would only make the problem worse."
      ],
      7: [
        "Physical possession isn't required if everyone agrees on ownership.",
        "Exactly! Social consensus about ownership is what made their money system work.",
        "Even lost stones retained value if the community remembered the ownership."
      ],
      8: [
        "Exactly! Centralized systems can freeze anyone's access at any time.",
        "The financial risk is that authorities can block your money for any reason.",
        "This shows banks will follow government orders even when it harms individuals."
      ],
      9: [
        "Travel freedom is related but not the core issue here.",
        "Exactly! Money should cross borders freely without government permission.",
        "The ability to save isn't being restricted—it's the ability to move value."
      ],
      10: [
        "The smell isn't the fundamental problem with cattle as money.",
        "Exactly! Money needs to be divisible for different transaction sizes.",
        "People needed money for trade, not food preferences."
      ]
    };
    return explanations[question.id]?.[answerIndex] || "This doesn't address the core issue.";
  };

  // Helper function to explain why the correct answer is right
  const getCorrectExplanation = (question) => {
    const explanations = {
      1: "When institutions can freeze your access to money, you're dependent on their permission. True ownership means complete control.",
      2: "Throughout history, those with the power to create money have always eventually abused it for short-term gain, devaluing everyone else's savings.",
      3: "Without genuine scarcity, money loses its ability to store value over time. Scarcity must be real and cannot be manipulated.",
      4: "Money must be easy to transport and verify, or it becomes impractical for daily commerce and trade.",
      5: "Money must survive the test of time and elements, or it becomes unreliable for storing wealth across seasons and years.",
      6: "Every unit of money must be identical and interchangeable. When they're not, people lose trust and start rejecting certain units.",
      7: "Money is ultimately about shared agreement on ownership. Physical possession is less important than community consensus.",
      8: "Centralized systems have the power to freeze or block anyone's access to money, which undermines financial freedom.",
      9: "Money should move freely across borders without requiring government permission or paying black market rates.",
      10: "Divisibility allows money to handle transactions of any size, from buying small items to making large investments."
    };
    return explanations[question.id] || "This addresses the fundamental issue correctly.";
  };

  const questions = [
    {
      id: 1,
      text: "In 2008, banks froze withdrawals during the financial crisis. People couldn't access their own money.",
      question: "What fundamental problem does this reveal about the banking system?",
      options: [
        "Banks were just being cautious",
        "Your money isn't really yours if others control it",
        "People wanted too much money"
      ],
      answer: 1,
      takeaway: "When you can't access your money, do you really own it? True ownership means complete control.",
      trait: "Self Custody"
    },
    {
      id: 2,
      text: "Throughout history, every government-issued currency has eventually lost most or all of its value through inflation.",
      question: "What does this pattern suggest about money controlled by authorities?",
      options: [
        "It's just economic cycles",
        "Printing money is necessary for growth",
        "Power to create money will always be abused"
      ],
      answer: 2,
      takeaway: "Those who control money supply inevitably abuse that power, devaluing everyone else's savings.",
      trait: "Fixed Supply"
    },
    {
      id: 3,
      text: "In Zimbabwe 2008, the government printed 100 trillion dollar bills, but bread still cost billions. Even printing more money couldn't solve the crisis.",
      question: "What does this reveal about scarcity in money?",
      options: [
        "They didn't print enough money",
        "True scarcity cannot be faked or manipulated",
        "Money printing creates wealth"
      ],
      answer: 1,
      takeaway: "Without genuine scarcity, money loses its ability to store value over time. Scarcity must be real and enforceable.",
      trait: "Scarcity"
    },
    {
      id: 4,
      text: "Gold was valued for centuries but was heavy, risky to transport, and difficult to verify purity.",
      question: "What was its biggest practical weakness?",
      options: [
        "Too beautiful and attracted thieves",
        "Hard to move and verify",
        "Too scarce for daily use"
      ],
      answer: 1,
      takeaway: "Money must be easy to transport and verify, or it becomes impractical for commerce.",
      trait: "Portability"
    },
    {
      id: 5,
      text: "In Bronze Age civilizations, grain and livestock were used as money, but they rotted, died, or were eaten by pests over time.",
      question: "What essential property was missing?",
      options: [
        "They were too valuable",
        "Money must last through time and elements",
        "They were too divisible"
      ],
      answer: 1,
      takeaway: "Money must survive the test of time—durability ensures it can preserve wealth across seasons and years.",
      trait: "Durability"
    },
    {
      id: 6,
      text: "In ancient Rome, coins were secretly mixed with cheaper metals or clipped around the edges, making them unequal in value.",
      question: "What happened to trust in the money system?",
      options: [
        "Nothing changed, people adapted",
        "People stopped trusting coins were equal",
        "They made more coins to compensate"
      ],
      answer: 1,
      takeaway: "When money units aren't identical and interchangeable, people lose trust. Every unit must be equal.",
      trait: "Fungibility"
    },
    {
      id: 7,
      text: "The Yap Islands used massive stone money that never physically moved. Ownership was tracked by community memory.",
      question: "What does this reveal about money?",
      options: [
        "Money must be physically possessed",
        "Shared agreement on ownership is what matters",
        "Lost money should still count"
      ],
      answer: 1,
      takeaway: "Money is ultimately about shared consensus on ownership—physical possession is less important than agreed records.",
      trait: "Ledger Consensus"
    },
    {
      id: 8,
      text: "In 2020, protesting Canadian truckers had their bank accounts frozen by government order.",
      question: "What does this reveal about centralized financial systems?",
      options: [
        "They can block anyone's access to money",
        "Protests are financially risky",
        "Banks follow all government orders"
      ],
      answer: 0,
      takeaway: "Centralized systems can freeze or block access to your money. Censorship resistance protects financial freedom.",
      trait: "Censorship Resistance"
    },
    {
      id: 9,
      text: "In Greece, Russia, Argentina, and China, governments have placed strict controls on moving money abroad. Families must resort to hiding gold or paying black market rates.",
      question: "What fundamental freedom is being restricted?",
      options: [
        "The freedom to travel",
        "The freedom to move value across borders",
        "The freedom to save money"
      ],
      answer: 1,
      takeaway: "Money should move freely across borders without government permission. True money knows no boundaries.",
      trait: "Borderless"
    },
    {
      id: 10,
      text: "When cattle was used as money, it worked for big trades—but you couldn't pay someone with half a cow for smaller purchases.",
      question: "What practical problem does this illustrate?",
      options: [
        "Cows were too smelly for shops",
        "Money must be divisible into smaller units",
        "People preferred vegetarian options"
      ],
      answer: 1,
      takeaway: "Money must be divisible to handle transactions of any size, from small purchases to large investments.",
      trait: "Divisibility"
    }
  ];

  const handleAnswer = (answerIndex) => {
    setSelectedAnswer(answerIndex);
    setShowFeedback(true);
    if (answerIndex === questions[currentQuestion].answer) {
      onUnlockTrait(questions[currentQuestion].trait);
      setScore(score + 1);
    }
  };

  const handleTryAgain = () => {
    setSelectedAnswer(null);
    setShowFeedback(false);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      onComplete(3);
    }
  };

  const currentQ = questions[currentQuestion];

  if (showIntro) {
    return (
      <div className="step-content quiz-step">
        <div className="module-header-box">
          <h2>Systematic Analysis</h2>
          <div className="intro-text">
            <p className="prime-text">Carlos's experience isn't unique—it reveals systematic flaws in how modern money works. Let's investigate the historical evidence to understand why these failures are inevitable.</p>
            <p>Through history's greatest money disasters, we'll discover what traits money must have to actually serve people.</p>
            <div className="quiz-preview">
              <h3>🔍 What You'll Uncover:</h3>
              <ul>
                <li>Why every government currency eventually fails</li>
                <li>How inflation silently steals your savings</li>
                <li>Why banks can freeze "your" money</li>
                <li>What traits make money truly sound</li>
              </ul>
            </div>
            <p><strong>Ready to become a money systems detective?</strong></p>
          </div>
        </div>
        <div className="quiz-content">
          <ContinueButton onClick={() => setShowIntro(false)}>
            Start Investigation ({questions.length} cases)
          </ContinueButton>
        </div>
      </div>
    );
  }

  return (
    <div className="step-content quiz-step">
      <div className="module-header-box">
        <div className="quiz-header-top">
          <h2>🔍 Case {currentQuestion + 1} of {questions.length}</h2>
          <div className="quiz-score">
            Score: {score}/{questions.length} • {Math.round((score / questions.length) * 100)}% Sound Money Analyst
          </div>
        </div>
        
        {/* Horizontal Question Navigation */}
        <div className="question-navigation">
          <div className="question-buttons">
            {questions.map((question, index) => (
              <NavigationButton
                key={index}
                className={`question-nav-button ${index === currentQuestion ? 'active' : ''} ${
                  // Check if this question has been answered correctly
                  index < currentQuestion || (index === currentQuestion && selectedAnswer === currentQ.answer && showFeedback) ? 'completed' : ''
                }`}
                onClick={() => {
                  if (index <= currentQuestion) { // Only allow navigation to current or previous questions
                    setCurrentQuestion(index);
                    setSelectedAnswer(null);
                    setShowFeedback(false);
                  }
                }}
                disabled={index > currentQuestion} // Disable future questions
              >
                {index + 1}
              </NavigationButton>
            ))}
          </div>
        </div>
      </div>
      
      <div className="quiz-content">
        <div className="history-snapshot">
          <h3>💰 Historical Evidence:</h3>
          <p>{currentQ.text}</p>
            </div>

        <div className="question-section">
          <h3>🤔 Your Analysis:</h3>
          <p className="question-text">{currentQ.question}</p>
          <div className="options">
            {currentQ.options.map((option, index) => (
            <OptionButton
                key={index}
                className={`option-button ${selectedAnswer === index ? 'selected' : ''}`}
                onClick={() => handleAnswer(index)}
                disabled={showFeedback}
              >
                {option}
              </OptionButton>
            ))}
          </div>
        </div>

        {showFeedback && (
          <div className={`feedback-section ${selectedAnswer === currentQ.answer ? 'correct' : 'incorrect'}`}>
            <p className="feedback-result">
              {selectedAnswer === currentQ.answer ? '🎯 Excellent Analysis!' : '🔍 Not quite right, but keep examining!'}
            </p>
            
            {selectedAnswer !== currentQ.answer && (
              <div className="incorrect-feedback">
                <div className="explanation-box">
                  <h4>🤔 Why this answer isn't quite right:</h4>
                  <p>"{currentQ.options[selectedAnswer]}" - {getIncorrectExplanation(currentQ, selectedAnswer)}</p>
                </div>
                <div className="correct-answer-box">
                  <h4>✅ The Better Answer:</h4>
                  <p><strong>"{currentQ.options[currentQ.answer]}"</strong></p>
                  <p className="explanation">{getCorrectExplanation(currentQ)}</p>
                </div>
                <div className="action-buttons">
                  <Button onClick={handleTryAgain} className="try-again-button">
                    🔄 Try Again
                  </Button>
                  <Button onClick={handleNext} className="continue-anyway-button">
                    Continue Anyway →
            </Button>
                </div>
          </div>
        )}

            {selectedAnswer === currentQ.answer && (
              <>
                <div className="takeaway-box">
                  <h4>💡 Key Insight:</h4>
                  <p>{currentQ.takeaway}</p>
        </div>
                <div className="trait-unlock-box">
                  <h4>🏆 Sound Money Trait Discovered:</h4>
                  <p><strong>{currentQ.trait}</strong></p>
                </div>
                
                <Button onClick={handleNext} className="next-button">
                  {currentQuestion < questions.length - 1 ? 'Next Case →' : 'Complete Investigation'}
                </Button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// Component for the Traits Scorecard
const TraitsScorecard = ({ unlockedTraits, onComplete }) => {
  const [currentView, setCurrentView] = useState('discover'); // 'discover', 'compare', 'blueprint', 'challenge'
  const [selectedTrait, setSelectedTrait] = useState(null);
  const [discoveryProgress, setDiscoveryProgress] = useState(0);
  const [showTraitDetail, setShowTraitDetail] = useState(false);
  const [interactionCount, setInteractionCount] = useState(0);
  const [soundMoneyScore, setSoundMoneyScore] = useState(null);
  const [challengeAnswers, setChallengeAnswers] = useState({});
  
  const allTraits = [
    { 
      name: "Scarcity", 
      icon: "💎", 
      description: "Limited supply that cannot be artificially increased", 
      modernFail: "Central banks print unlimited money, destroying scarcity",
      historicalExample: "Gold's scarcity made it valuable across cultures for 3,000+ years",
      importance: "Without scarcity, money loses its ability to store value over time"
    },
    { 
      name: "Durability", 
      icon: "🏛️", 
      description: "Doesn't rot, decay, or degrade over time", 
      modernFail: "Digital records can be deleted, corrupted, or hacked",
      historicalExample: "Roman coins survive today, but their paper money disappeared centuries ago",
      importance: "Money must outlast the things you want to buy with it"
    },
    { 
      name: "Portability", 
      icon: "✈️", 
      description: "Easy to move, transport, and verify", 
      modernFail: "International transfers take days, cost fees, and require verification",
      historicalExample: "Merchants preferred silver coins over cattle because they were easier to carry",
      importance: "Heavy or complex money limits trade and economic growth"
    },
    { 
      name: "Fungibility", 
      icon: "🔄", 
      description: "Each unit is identical and interchangeable", 
      modernFail: "Bills can be tracked, marked, blacklisted, or counterfeited",
      historicalExample: "When Roman coins were debased, people started rejecting certain coins",
      importance: "If money units aren't equal, trust in the system breaks down"
    },
    { 
      name: "Ledger Consensus", 
      icon: "📊", 
      description: "Shared, trusted agreement on ownership", 
      modernFail: "Banks control the ledger unilaterally and can alter records",
      historicalExample: "Yap Island stones worked because everyone agreed on ownership",
      importance: "Money is ultimately about shared trust in who owns what"
    },
    { 
      name: "Censorship Resistance", 
      icon: "🛡️", 
      description: "Cannot be frozen, blocked, or restricted", 
      modernFail: "Accounts can be frozen by authorities or payment processors",
      historicalExample: "Hidden gold saved families during wars when banks were closed",
      importance: "Money you can't use isn't really yours"
    },
    { 
      name: "Borderless", 
      icon: "🌍", 
      description: "Moves freely across political boundaries", 
      modernFail: "Capital controls and international restrictions limit movement",
      historicalExample: "Silk Road merchants used gold because it was accepted everywhere",
      importance: "Trade creates wealth, but only if value can move freely"
    },
    { 
      name: "Divisibility", 
      icon: "🔢", 
      description: "Can be split into smaller precise units", 
      modernFail: "Limited by smallest physical denomination or processing fees",
      historicalExample: "Spanish pieces of eight could be literally cut into pieces for smaller amounts",
      importance: "Money needs to handle both coffee purchases and house sales"
    }
  ];

  const challengeQuestions = [
    {
      question: "If you had to choose just ONE trait for money to have, which would create the most stable economy?",
      options: ["Scarcity", "Durability", "Censorship Resistance"],
      insight: "Scarcity is foundational - without it, all other traits become meaningless as value gets inflated away."
    },
    {
      question: "Which trait is most threatened by digital surveillance and control systems?",
      options: ["Fungibility", "Censorship Resistance", "Borderless"],
      insight: "Modern surveillance makes all money movements trackable, threatening financial privacy and freedom."
    },
    {
      question: "What happens to an economy when money lacks durability?",
      options: ["Short-term thinking dominates", "Trade becomes impossible", "Only the rich benefit"],
      insight: "When money doesn't last, people can't plan for the future, leading to short-term, destructive decisions."
    }
  ];

  // Flexible trait matching function
  const isTraitUnlocked = (scorecardTrait) => {
    return unlockedTraits.some(unlockedTrait => {
      if (unlockedTrait === scorecardTrait.name) return true;
      
      const traitMappings = {
        "Scarcity": ["Scarcity", "Fixed Supply"],
        "Durability": ["Durability"],
        "Portability": ["Portability"],
        "Fungibility": ["Fungibility"],
        "Ledger Consensus": ["Ledger Consensus"],
        "Censorship Resistance": ["Censorship Resistance", "Self Custody"],
        "Borderless": ["Borderless"],
        "Divisibility": ["Divisibility"]
      };
      
      const mappedTraits = traitMappings[scorecardTrait.name] || [scorecardTrait.name];
      return mappedTraits.some(mappedTrait => unlockedTrait.includes(mappedTrait));
    });
  };

  const unlockedCount = allTraits.filter(trait => isTraitUnlocked(trait)).length;
  const completionPercentage = Math.round((unlockedCount / allTraits.length) * 100);

  const handleTraitClick = (trait) => {
    if (isTraitUnlocked(trait)) {
      setSelectedTrait(trait);
      setShowTraitDetail(true);
      setInteractionCount(prev => prev + 1);
      
      // Auto-advance discovery progress
      if (discoveryProgress < 100) {
        setDiscoveryProgress(Math.min(100, discoveryProgress + (100 / unlockedCount)));
      }
    }
  };

  const calculateSoundMoneyScore = () => {
    const modernMoneyTraits = {
      "Scarcity": 1, // Fiat has no scarcity
      "Durability": 6, // Digital records are somewhat durable
      "Portability": 7, // Credit cards/digital payments are portable
      "Fungibility": 4, // Bills can be tracked and marked
      "Ledger Consensus": 2, // Banks control the ledger unilaterally
      "Censorship Resistance": 1, // Easily frozen/blocked
      "Borderless": 3, // Heavy restrictions and fees
      "Divisibility": 8 // Good divisibility with digital systems
    };

    const goldTraits = {
      "Scarcity": 9, // Very scarce and hard to mine
      "Durability": 10, // Lasts forever
      "Portability": 4, // Heavy and hard to verify
      "Fungibility": 8, // Pure gold is fungible
      "Ledger Consensus": 6, // Physical possession shows ownership
      "Censorship Resistance": 7, // Hard to confiscate if hidden
      "Borderless": 5, // Can cross borders but may be detected
      "Divisibility": 6 // Can be melted and divided
    };

    const modernScore = Object.values(modernMoneyTraits).reduce((a, b) => a + b, 0);
    const goldScore = Object.values(goldTraits).reduce((a, b) => a + b, 0);
    const maxScore = 80; // 8 traits × 10 points each

    return {
      modern: { score: modernScore, percentage: Math.round((modernScore / maxScore) * 100) },
      gold: { score: goldScore, percentage: Math.round((goldScore / maxScore) * 100) },
      perfect: { score: maxScore, percentage: 100 }
    };
  };

  const handleChallengeAnswer = (questionIndex, answer) => {
    setChallengeAnswers(prev => ({
      ...prev,
      [questionIndex]: answer
    }));
  };

  const renderDiscoveryView = () => (
    <div className="discovery-view">
      <div className="discovery-header">
        <h3>🔍 Explore Your Discovered Traits</h3>
        <p>Click on any trait you've unlocked to dive deeper into why it matters...</p>
        <div className="discovery-progress-bar">
          <div className="progress-fill" style={{ width: `${discoveryProgress}%` }} />
          <span className="progress-label">Discovery Progress: {Math.round(discoveryProgress)}%</span>
        </div>
      </div>
      
      <div className="traits-grid">
        {allTraits.map(trait => (
          <div 
            key={trait.name} 
            className={`trait-card ${isTraitUnlocked(trait) ? 'unlocked' : 'locked'} ${selectedTrait?.name === trait.name ? 'selected' : ''}`}
            onClick={() => handleTraitClick(trait)}
          >
            <div className="trait-icon">{isTraitUnlocked(trait) ? trait.icon : '🔒'}</div>
            <div className="trait-content">
              <h4 className="trait-name">{trait.name}</h4>
              {isTraitUnlocked(trait) ? (
                <>
                  <p className="trait-description">{trait.description}</p>
                  <div className="trait-status">✓ Discovered</div>
                </>
              ) : (
                <p className="trait-locked">Complete the quiz to unlock</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {showTraitDetail && selectedTrait && (
        <div className="trait-detail-modal">
          <div className="modal-content">
            <button className="close-button" onClick={() => setShowTraitDetail(false)}>×</button>
            <div className="trait-detail-header">
              <span className="trait-detail-icon">{selectedTrait.icon}</span>
              <h3>{selectedTrait.name}</h3>
            </div>
            <div className="trait-detail-body">
              <div className="detail-section">
                <h4>📚 What It Means:</h4>
                <p>{selectedTrait.description}</p>
              </div>
              <div className="detail-section">
                <h4>🏛️ Historical Example:</h4>
                <p>{selectedTrait.historicalExample}</p>
              </div>
              <div className="detail-section">
                <h4>💡 Why It's Critical:</h4>
                <p>{selectedTrait.importance}</p>
              </div>
              <div className="detail-section modern-failure">
                <h4>❌ How Modern Money Fails:</h4>
                <p>{selectedTrait.modernFail}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderComparisonView = () => {
    if (!soundMoneyScore) {
      setSoundMoneyScore(calculateSoundMoneyScore());
      return <div>Calculating scores...</div>;
    }

    return (
      <div className="comparison-view">
        <h3>📊 Sound Money Scorecard</h3>
        <p>How do different money systems score on the 8 essential traits?</p>
        
        <div className="money-comparison-grid">
          <div className="money-system">
            <h4>💵 Modern Fiat Money</h4>
            <div className="score-display">
              <div className="score-number">{soundMoneyScore.modern.percentage}%</div>
              <div className="score-bar">
                <div className="score-fill modern" style={{ width: `${soundMoneyScore.modern.percentage}%` }} />
              </div>
            </div>
            <p className="score-analysis">Fails at scarcity, censorship resistance, and ledger control</p>
          </div>

          <div className="money-system">
            <h4>🏅 Gold Standard</h4>
            <div className="score-display">
              <div className="score-number">{soundMoneyScore.gold.percentage}%</div>
              <div className="score-bar">
                <div className="score-fill gold" style={{ width: `${soundMoneyScore.gold.percentage}%` }} />
              </div>
            </div>
            <p className="score-analysis">Strong on scarcity and durability, weak on portability</p>
          </div>

          <div className="money-system">
            <h4>⭐ Ideal Sound Money</h4>
            <div className="score-display">
              <div className="score-number">100%</div>
              <div className="score-bar">
                <div className="score-fill perfect" style={{ width: '100%' }} />
              </div>
            </div>
            <p className="score-analysis">Combines ALL 8 traits - has this ever existed?</p>
          </div>
        </div>

        <div className="trait-breakdown">
          <h4>🔍 Detailed Breakdown:</h4>
          <div className="breakdown-grid">
            {allTraits.map(trait => (
              <div key={trait.name} className="breakdown-item">
                <span className="trait-label">{trait.icon} {trait.name}</span>
                <div className="breakdown-scores">
                  <span className="modern-score">Fiat: 🔴</span>
                  <span className="gold-score">Gold: 🟡</span>
                  <span className="perfect-score">Ideal: 🟢</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderChallengeView = () => (
    <div className="challenge-view">
      <h3>🤔 Critical Thinking Challenge</h3>
      <p>Test your understanding of how these traits interact in real-world scenarios...</p>
      
      <div className="challenge-questions">
        {challengeQuestions.map((q, index) => (
          <div key={index} className="challenge-question">
            <h4>Question {index + 1}:</h4>
            <p>{q.question}</p>
            <div className="challenge-options">
              {q.options.map(option => (
                <OptionButton
                  key={option}
                  onClick={() => handleChallengeAnswer(index, option)}
                  className={`challenge-option ${challengeAnswers[index] === option ? 'selected' : ''}`}
                >
                  {option}
                </OptionButton>
              ))}
            </div>
            {challengeAnswers[index] && (
              <div className="challenge-insight">
                <h5>💡 Insight:</h5>
                <p>{q.insight}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderBlueprintView = () => (
    <div className="blueprint-view">
      <h3>🏗️ Building the Perfect Money</h3>
      <p>If you were designing money from scratch, what would it look like?</p>
      
      <div className="blueprint-exercise">
        <div className="blueprint-header">
          <h4>Your Money System Design Challenge:</h4>
          <p>Rank these traits by importance for a global money system:</p>
        </div>
        
        <div className="blueprint-traits">
          {allTraits.filter(trait => isTraitUnlocked(trait)).map((trait, index) => (
            <div key={trait.name} className="blueprint-trait">
              <div className="trait-ranking">#{index + 1}</div>
              <div className="trait-info">
                <span className="trait-icon">{trait.icon}</span>
                <span className="trait-name">{trait.name}</span>
              </div>
              <div className="trait-impact">
                <p>{trait.importance}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="blueprint-conclusion">
          <h4>🎯 The Ultimate Question:</h4>
          <p>What if there was a technology that could deliver ALL {unlockedCount} traits simultaneously?</p>
          <p><strong>What would that be worth?</strong></p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="step-content scorecard-step">
      <div className="module-header-box">
        <h2>The Sound Money Blueprint</h2>
        <div className="intro-text">
          <p className="prime-text">You've discovered {unlockedCount}/8 traits that make money truly sound. Now let's explore how they work together.</p>
        </div>
      </div>
      
      <div className="scorecard-navigation">
        <div className="nav-buttons">
          <Button 
            className={`nav-button ${currentView === 'discover' ? 'active' : ''}`}
            onClick={() => setCurrentView('discover')}
          >
            🔍 Explore Traits
          </Button>
          <Button 
            className={`nav-button ${currentView === 'compare' ? 'active' : ''}`}
            onClick={() => setCurrentView('compare')}
          >
            📊 Compare Systems
          </Button>
          <Button 
            className={`nav-button ${currentView === 'blueprint' ? 'active' : ''}`}
            onClick={() => setCurrentView('blueprint')}
          >
            🏗️ Build Perfect Money
          </Button>
          <Button 
            className={`nav-button ${currentView === 'challenge' ? 'active' : ''}`}
            onClick={() => setCurrentView('challenge')}
          >
            🤔 Think Deeper
          </Button>
        </div>
        
        <div className="progress-stats">
          <span className="stats-item">Traits Discovered: {unlockedCount}/8</span>
          <span className="stats-item">Completion: {completionPercentage}%</span>
          <span className="stats-item">Interactions: {interactionCount}</span>
        </div>
      </div>

      <div className="scorecard-content">
        {currentView === 'discover' && renderDiscoveryView()}
        {currentView === 'compare' && renderComparisonView()}
        {currentView === 'blueprint' && renderBlueprintView()}
        {currentView === 'challenge' && renderChallengeView()}
      </div>

      <div className="scorecard-summary">
        <h3>🎯 You've Built the Blueprint</h3>
        <p>You now understand the 8 essential traits of sound money and why every historical money system has failed to achieve them all.</p>
        <p><strong>Ready to discover what comes next?</strong></p>
      </div>

      <Button 
        className="continue-button"
        onClick={() => onComplete(5)}
      >
        Continue to Completion
      </Button>
    </div>
  );
};

// Component for External Resource Link
const ExternalResource = ({ onComplete }) => {
  return (
    <div className="step-content external-resource-step">
      <div className="module-header-box">
        <h2>Explore the History of Money <AnimatedIcon type="history" /></h2>
      </div>
      <p className="external-resource-description">
        Dive deeper into the fascinating evolution of money through the ages. 
      </p>
      <div className="external-links">
        <a
          href="https://layer-d.my.canva.site/interactive-timeline-of-money-evolution-from-barter-to-bitcoin"
          target="_blank"
          rel="noopener noreferrer"
          className="external-resource-link timeline-link"
        >
          Evolution of Money: From Barter to Bitcoin
        </a>
      </div>
      <div className="button-group">
        <Button onClick={() => onComplete(6)} className="continue-button">
          Complete Module
        </Button>
      </div>
    </div>
  );
};

// Badge Modal Component
const BadgeModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>🎉 Congratulations!</h2>
        <p>You've earned the Sound Money Explorer badge!</p>
        <Button onClick={onClose}>Close</Button>
      </div>
          </div>
        );
};

// Component for Module Completion
const ModuleCompletion = ({ onComplete }) => {
  return (
    <div className="step-content completion-step">
      <div className="module-header-box">
        <h2>🎉 Congratulations!</h2>
        <div className="intro-text">
          <p className="prime-text">You've mastered the fundamentals of sound money and discovered why the current system is broken.</p>
        </div>
      </div>
      
      <div className="completion-content">
        <div className="achievement-summary">
          <h3>🏆 What You've Accomplished</h3>
          <div className="accomplishments-grid">
            <div className="accomplishment-item">
              <div className="accomplishment-icon">🥔</div>
              <h4>Trade Explorer</h4>
              <p>Experienced the painful reality of barter economics firsthand</p>
            </div>
            <div className="accomplishment-item">
              <div className="accomplishment-icon">⚖️</div>
              <h4>Money Functions Expert</h4>
              <p>Discovered the three essential jobs money must perform</p>
            </div>
            <div className="accomplishment-item">
              <div className="accomplishment-icon">🔍</div>
              <h4>System Analyst</h4>
              <p>Uncovered the hidden flaws in traditional money systems</p>
            </div>
            <div className="accomplishment-item">
              <div className="accomplishment-icon">🛡️</div>
              <h4>Sound Money Scholar</h4>
              <p>Learned the 8 traits that make money truly sound</p>
            </div>
          </div>
        </div>

        <div className="key-insights">
          <h3>💡 Key Insights You've Gained</h3>
          <div className="insights-list">
            <div className="insight-item">
              <span className="insight-number">1</span>
              <div className="insight-content">
                <h4>Modern Money is Broken by Design</h4>
                <p>Central banks can print unlimited money, banks can freeze your accounts, and governments can restrict money movement across borders.</p>
              </div>
            </div>
            <div className="insight-item">
              <span className="insight-number">2</span>
              <div className="insight-content">
                <h4>Sound Money Requires Specific Traits</h4>
                <p>True money must be scarce, durable, portable, fungible, censorship-resistant, borderless, divisible, and have consensus-based ownership.</p>
              </div>
            </div>
            <div className="insight-item">
              <span className="insight-number">3</span>
              <div className="insight-content">
                <h4>No Previous Money System Has Been Perfect</h4>
                <p>Gold was great for scarcity and durability but terrible for portability. Fiat money is portable but fails at scarcity and censorship resistance.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="optional-resource">
          <h3>📚 Optional: Dive Deeper</h3>
          <p>Want to explore the complete history of money? Check out our interactive timeline:</p>
          <a
            href="https://layer-d.my.canva.site/interactive-timeline-of-money-evolution-from-barter-to-bitcoin"
            target="_blank"
            rel="noopener noreferrer"
            className="resource-link"
          >
            🕰️ Evolution of Money: From Barter to Bitcoin
          </a>
        </div>

        <div className="next-journey">
          <h3>🔮 Your Next Journey</h3>
          <div className="next-journey-content">
            <p>Now that you understand what makes money truly sound, you're ready to explore the first technology in human history that combines <strong>ALL</strong> 8 traits in one global system.</p>
            
            <div className="bitcoin-preview">
              <h4>🟠 Coming Up: Bitcoin Fundamentals</h4>
              <ul>
                <li>How Bitcoin achieves perfect scarcity without central authority</li>
                <li>Why Bitcoin can't be censored, frozen, or inflated</li>
                <li>How a network of computers maintains consensus without banks</li>
                <li>Why this matters for your financial future</li>
              </ul>
            </div>
            
            <p className="ready-question"><strong>Ready to see how all these pieces fit together?</strong></p>
          </div>
        </div>

        <Button 
          className="complete-module-button"
          onClick={() => onComplete(6)}
        >
          Complete Money Module
        </Button>
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
  const [showBadgeModal, setShowBadgeModal] = useState(false);
  const [error, /* setError */] = useState(null);

  // Error boundary for the component
  if (error) {
    return (
      <div className="module-container">
        <div className="error-boundary">
          <h2>Something went wrong</h2>
          <p>Please refresh the page to try again.</p>
          <Button onClick={() => window.location.reload()}>Refresh Page</Button>
        </div>
      </div>
    );
  }

  const handleStepComplete = (stepIndex) => {
    const newCompletedSteps = new Set(completedSteps).add(stepIndex);
    setCompletedSteps(newCompletedSteps);
    
    // Save to localStorage - convert Set to array to avoid circular reference
    try {
      localStorage.setItem('moneyModuleCompletedSteps', JSON.stringify(Array.from(newCompletedSteps)));
    } catch (error) {
      console.warn('Failed to save progress to localStorage:', error);
    }
    
    // Show achievement for key milestones
    if (stepIndex === 1) {
      showAchievement("Trade Explorer", "You understand why humans needed to invent money!");
    } else if (stepIndex === 3) {
      showAchievement("Money Analyst", "You've uncovered the flaws in traditional money systems!");
    } else if (stepIndex === 5) {
      showAchievement("Sound Money Scholar", "You know what makes money truly sound!");
    }
    
    if (stepIndex === 6) {  // Final step - Complete after ModuleCompletion
      completeModule('money');
      setShowBadgeModal(true);
      showAchievement("Money Master", "You've mastered the fundamentals of sound money!");
      // Redirect to homepage after a longer delay to allow badge modal and achievement to show
      setTimeout(() => {
        navigate('/');
      }, 8000); // Extended from 3000
    } else {
      setCurrentStep(stepIndex + 1);
    }
  };

  const showAchievement = (title, description) => {
    // Achievement notification system
    const achievement = document.createElement('div');
    achievement.className = 'achievement-popup';
    achievement.innerHTML = `
      <div class="achievement-content">
        <div class="achievement-icon">🏆</div>
        <div class="achievement-text">
          <h4>${title}</h4>
          <p>${description}</p>
        </div>
        <div class="achievement-controls">
          <button class="achievement-dismiss" onclick="this.closest('.achievement-popup').remove()">
            Continue
          </button>
        </div>
      </div>
      <div class="achievement-hint">Click to dismiss or wait 8 seconds...</div>
    `;
    document.body.appendChild(achievement);
    
    // Click to dismiss
    achievement.addEventListener('click', () => {
      achievement.style.opacity = '0';
      setTimeout(() => {
        if (document.body.contains(achievement)) {
          document.body.removeChild(achievement);
        }
      }, 300);
    });
    
    // Auto dismiss after longer delay
    setTimeout(() => {
      if (document.body.contains(achievement)) {
        achievement.style.opacity = '0';
        setTimeout(() => {
          if (document.body.contains(achievement)) {
            document.body.removeChild(achievement);
          }
        }, 300);
      }
    }, 8000); // Extended from 3000
  };

  const handleTabClick = (stepIndex) => {
    setCurrentStep(stepIndex);
  };

  const handleUnlockTrait = (trait) => {
    if (!unlockedTraits.includes(trait)) {
      setUnlockedTraits([...unlockedTraits, trait]);
    }
  };

  // Reset progress handler
  const handleResetProgress = () => {
    localStorage.removeItem('moneyModuleCompletedSteps');
    setCompletedSteps(new Set());
    setCurrentStep(0);
  };

  return (
    <div className="module-container">
      {/* Override the default layout title for this module only */}
      <style>{`
        .module-layout .module-header .logo-text {
          display: none;
        }
        .module-layout .module-header .logo-container::after {
          content: "Money, Straight Up";
          font-size: 1.5rem;
          line-height: 1.2;
        }
        .error-boundary {
          text-align: center;
          padding: 2rem;
          background: #fff5f5;
          border: 1px solid #fed7d7;
          border-radius: 8px;
          margin: 2rem;
        }
        .error-boundary button {
          background: #e53e3e;
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 4px;
          cursor: pointer;
        }
        .reset-progress-button {
          background: #f7931a;
          color: white;
          border: none;
          padding: 0.5rem 1.2rem;
          border-radius: 6px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          margin: 1rem 0 1.5rem 0;
          transition: background 0.2s;
        }
        .reset-progress-button:hover {
          background: #ea580c;
        }
      `}</style>
      
      <div className="module-header">
        <h1 className="module-title">
          <Coins className="module-icon" />
          If You Don't Define It, It Will Define You
        </h1>
      </div>

      {/* Reset Progress Button */}
      <Button className="reset-progress-button" onClick={handleResetProgress}>
        Reset Progress
      </Button>

      <div className="module-progress">
        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ width: `${(completedSteps.size / 7) * 100}%` }}
          />
        </div>
        <span className="progress-text">
          {completedSteps.size} / 7 steps completed
        </span>
      </div>

      {/* Horizontal Tab Navigation */}
      <div className="top-navigation">
        {['The Money Mystery', 'The Stone Age Economy', 'Money\'s Core Functions', 'Real People, Real Problems', 'Systematic Analysis', 'The Sound Money Blueprint', 'Congratulations'].map((step, index) => (
          <Button
            key={index}
            className={`top-nav-button ${
              index === currentStep ? 'active' : ''
            } ${completedSteps.has(index) ? 'completed' : ''}`}
            onClick={() => handleTabClick(index)}
          >
            <span className="nav-text">
              {index + 1}. {step.length > 20 ? `${step.substring(0, 17)}...` : step}
            </span>
          </Button>
        ))}
      </div>

      <div className="module-content">
        {currentStep === 0 && <Introduction onComplete={handleStepComplete} />}
        {currentStep === 1 && <BarterWorld onComplete={handleStepComplete} />}
        {currentStep === 2 && <WhatsWrong onComplete={handleStepComplete} />}
        {currentStep === 3 && <CarlosFlowerExport onComplete={handleStepComplete} />}
        {currentStep === 4 && <MoneyQuiz onComplete={handleStepComplete} onUnlockTrait={handleUnlockTrait} />}
        {currentStep === 5 && <TraitsScorecard unlockedTraits={unlockedTraits} onComplete={handleStepComplete} />}
        {currentStep === 6 && <ModuleCompletion onComplete={handleStepComplete} />}
      </div>

      <BadgeModal isOpen={showBadgeModal} onClose={() => setShowBadgeModal(false)} />
    </div>
  );
};

export default MoneyModule; 