import React, { useState, useEffect } from 'react';
import { useProgress } from '../contexts/ProgressContext';
import { Coins, Trophy, CheckCircle, Brain, History, Award, Clock, Lightbulb, Target, Zap } from 'lucide-react';
import AnimatedIcon from '../components/AnimatedIcon';
import '../components/ModuleLayout.css';
import '../components/ModuleCommon.css';
import '../components/MoneyModule.css';

// Component for the Introduction (transition from banking friction)
const Introduction = ({ onComplete }) => {
  return (
    <div className="step-content introduction">
      <div className="module-header-box">
        <h2>The Great Money Mystery: Why Does This Thing Even Exist?</h2>
        <div className="intro-text">
          <p className="prime-text">You just experienced how broken modern money feels. But what if I told you money wasn't supposed to be this complicated?</p>
        </div>
      </div>
      <div className="content-text">
        <p>
          Think about it: You carry around little pieces of paper and plastic rectangles, and somehow everyone agrees they're "valuable."
        </p>
        <p>
          You tap your phone on a machine, and invisible numbers move around the world.
        </p>
        <p>
          But behind all that complexity is a surprisingly simple story: <strong>Humans needed to solve the world's most annoying problem.</strong>
        </p>
        <div className="reflection-prompt">
          <h3>🤔 Before we reveal the answer...</h3>
          <p>What do you think was humanity's biggest trading problem before money existed?</p>
          <div className="thinking-space">
            <p><em>Take a moment to think about it. What would make trading really, really frustrating?</em></p>
          </div>
        </div>
        <p>
          Ready to find out? Let's travel back 10,000 years and watch humans struggle with the exact problem that forced them to invent this thing we call "money."
        </p>

        <button onClick={() => onComplete(0)} className="continue-button">
          Take Me Back in Time
        </button>
      </div>
    </div>
  );
};

// Component for the Barter World section
const BarterWorld = ({ onComplete }) => {
  const [gameStep, setGameStep] = useState(0);
  const [selectedTrade, setSelectedTrade] = useState(null);
  const [tradeAttempts, setTradeAttempts] = useState(0);

  const tradeScenarios = [
    { id: 1, have: "🥔 Potatoes", want: "👟 Shoes", person: "Farmer", success: false },
    { id: 2, have: "🍞 Bread", want: "🧱 Bricks", person: "Baker", success: false },
    { id: 3, have: "👟 Shoes", want: "🥔 Potatoes", person: "Cobbler", success: true },
    { id: 4, have: "🐟 Fish", want: "🍞 Bread", person: "Fisher", success: false },
    { id: 5, have: "🧱 Bricks", want: "🐟 Fish", person: "Builder", success: false }
  ];

  const handleTradeAttempt = (scenario) => {
    setSelectedTrade(scenario);
    setTradeAttempts(prev => prev + 1);
    
    if (scenario.success) {
      setTimeout(() => setGameStep(1), 1500);
    }
  };

  const resetGame = () => {
    setGameStep(0);
    setSelectedTrade(null);
    setTradeAttempts(0);
  };

  if (gameStep === 0) {
    return (
      <div className="step-content barter-world">
        <div className="module-header-box">
          <h2>Welcome to the Stone Age Economy</h2>
          <div className="intro-text">
            <p className="prime-text">You're about to experience the most frustrating trading system ever invented: direct bartering.</p>
            <p>You're a potato farmer who desperately needs shoes. Find someone willing to trade!</p>
          </div>
        </div>

        <div className="barter-game">
          <div className="your-situation">
            <h3>Your Situation</h3>
            <p>🥔 You have: <strong>A bag of potatoes</strong></p>
            <p>👟 You need: <strong>Shoes for winter</strong></p>
            <p>Attempts: {tradeAttempts}/5</p>
          </div>

          <div className="trade-options">
            <h3>Available Traders in Your Village</h3>
            <div className="traders-grid">
              {tradeScenarios.map(scenario => (
                <div 
                  key={scenario.id} 
                  className={`trader-card ${selectedTrade?.id === scenario.id ? 'selected' : ''}`}
                  onClick={() => handleTradeAttempt(scenario)}
                >
                  <h4>{scenario.person}</h4>
                  <p>Has: {scenario.have}</p>
                  <p>Wants: {scenario.want}</p>
                  {selectedTrade?.id === scenario.id && (
                    <div className="trade-result">
                      {scenario.success ? 
                        "🎉 SUCCESS! They want your potatoes!" : 
                        "❌ No deal. They don't want potatoes."
                      }
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {selectedTrade?.success && (
            <div className="success-section">
              <h3>🎉 Finally! A Successful Trade!</h3>
              <p>After {tradeAttempts} attempts, you found someone who wants potatoes and has shoes.</p>
              <p>But imagine if this was your life every single day...</p>
              <button className="continue-button" onClick={() => setGameStep(1)}>
                See Why This System Failed
              </button>
            </div>
          )}

          {tradeAttempts >= 5 && !selectedTrade?.success && (
            <div className="failure-section">
              <h3>😤 You're Stuck!</h3>
              <p>No one in your village wants potatoes for what they have. You might have to:</p>
              <ul>
                <li>Walk to the next village (2 days journey)</li>
                <li>Try trading potatoes → bread → bricks → shoes (if you can find the chain)</li>
                <li>Wait until someone needs potatoes</li>
                <li>Go barefoot this winter</li>
              </ul>
              <button className="continue-button" onClick={() => setGameStep(1)}>
                This System is Broken!
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="step-content barter-world">
      <div className="module-header-box">
        <h2>The Problem That Broke Humanity's Patience</h2>
        <div className="intro-text">
          <p className="prime-text">What you just experienced is called "the double coincidence of wants" - basically, the universe's worst matchmaking system.</p>
        </div>
      </div>
      
      <div className="content-text">
        <div className="problem-breakdown">
          <h3>🤔 Why Bartering Was a Nightmare</h3>
          <div className="problems-grid">
            <div className="problem-card">
              <h4>⏰ Time Problem</h4>
              <p>Finding someone who wants what you have AND has what you want could take days, weeks, or never happen.</p>
            </div>
            <div className="problem-card">
              <h4>🗳️ Value Problem</h4>
              <p>Is a cow worth 3 goats? 5 chickens? Who decides? Arguments everywhere.</p>
            </div>
            <div className="problem-card">
              <h4>🍎 Storage Problem</h4>
              <p>Can't save potatoes for next year - they rot. Can't store your wealth over time.</p>
            </div>
            <div className="problem-card">
              <h4>📍 Location Problem</h4>
              <p>Your trading partner might be in the next village, 50 miles away. Good luck with that.</p>
            </div>
          </div>
        </div>

        <div className="solution-reveal">
          <h3>💡 The Breakthrough Moment</h3>
          <p>Some genius finally said: <em>"What if we all just agree on ONE thing that everyone will accept for everything else?"</em></p>
          <p>And poof... <strong>money was born</strong>.</p>
          <p>Not by governments. Not by banks. By frustrated humans who were tired of trading goats for shoes.</p>
        </div>

        <div className="transition-hook">
          <p className="prime-text">But here's what's fascinating: the problems money was invented to solve? They're back. In our modern banking system.</p>
          <p>Let's see exactly what money was supposed to fix...</p>
        </div>

        <button onClick={() => onComplete(1)} className="continue-button">
          Show Me What Money Fixes
        </button>
      </div>
    </div>
  );
};

// Component for Carlos's Flower Export
const CarlosFlowerExport = ({ onComplete }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex);
    if (answerIndex === 3) { // "All of the above" is correct
      setShowFeedback(true);
    }
  };

  return (
    <div className="step-content carlos-export-step">
      <div className="module-header-box">
        <h2>Carlos's Flower Export</h2>
        <div className="intro-text">
          <p>Carlos, exporting 1,000 roses to Japan, gets paid in USD but spends in Colombian pesos. Let's walk through what actually happens.</p>
          <button
            className="link-button"
            onClick={() => window.open('https://layer-d.my.canva.site/dagrpelgejq', '_blank')}
          >
            Open live Fiat Export Demo
          </button>
        </div>
      </div>

      <div className="content-grid">
        <div className="left-column">
          <h3>What Problems Do You Spot?</h3>
          <p>🤔 Looking at this fiat transaction, what issues do you notice?</p>
          <div className="options-list">
            {[
              "Currency volatility cut into his earnings",
              "Transfer delays risk cash flow problems", 
              "Bank fees decreased his net income",
              "All of the above"
            ].map((option, i) => (
              <button
                key={i}
                className={`option-button ${selectedAnswer === i ? 'selected' : ''}`}
                onClick={() => handleAnswerSelect(i)}
                disabled={showFeedback}
              >
                {option}
              </button>
            ))}
          </div>
          
          {showFeedback && (
            <div className="feedback-section correct">
              <p className="feedback-result">✅ Correct!</p>
              <p className="takeaway">Currency volatility, delays, and fees all chipped away at Carlos's payout before he even saw the money.</p>
              <button 
                className="continue-button"
                onClick={onComplete}
              >
                Continue
              </button>
            </div>
          )}
        </div>

        <div className="right-column">
          <h3>The Process</h3>
          <ul className="scenario-steps">
            <li>Carlos ships the roses and invoices his buyer in USD</li>
            <li>Bank A converts USD to COP at today's rate (~4,400 COP/USD)</li>
            <li>Transfer takes 2–5 business days to process</li>
            <li>By the time funds arrive, the peso has depreciated ~10%</li>
            <li>Bank fees are deducted during conversion and transfer</li>
          </ul>
        </div>
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
      
      // Move to next scenario after a delay
      setTimeout(() => {
        if (currentScenario < scenarios.length - 1) {
          setCurrentScenario(currentScenario + 1);
        } else {
          // All completed
          setTimeout(() => onComplete(2), 1500);
        }
      }, 2000);
    }
  };

  return (
    <div className="step-content whats-wrong-step">
      <div className="module-header-box">
        <h2>Money's Three Superpowers</h2>
        <div className="intro-text">
          <p className="prime-text">These scenarios reveal why money had to be invented. Each one shows a different superpower money gives us.</p>
          <p>Can you figure out which superpower each scenario needs?</p>
        </div>
      </div>

      <div className="functions-tracker">
        <h3>Money Functions Unlocked:</h3>
        <div className="functions-grid">
          {['Medium of Exchange', 'Store of Value', 'Unit of Account'].map(func => (
            <div key={func} className={`function-badge ${unlockedFunctions.includes(func) ? 'unlocked' : 'locked'}`}>
              {unlockedFunctions.includes(func) ? '✅' : '🔒'} {func}
            </div>
          ))}
        </div>
      </div>

      <div className="scenario-container">
        {scenarios.map((scenario, index) => (
          <div 
            key={scenario.id} 
            className={`scenario-item ${index === currentScenario ? 'active' : ''} ${index < currentScenario ? 'completed' : ''} ${index > currentScenario ? 'locked' : ''}`}
          >
            <div className="scenario-header">
              <h3>{scenario.title}</h3>
              <p className="scenario-description">{scenario.description}</p>
              <p className="scenario-question"><strong>{scenario.question}</strong></p>
            </div>
            
            {index === currentScenario && (
              <div className="options-grid">
                {scenario.options.map(option => (
                  <button
                    key={option.value}
                    className={`option-button ${answers[scenario.id] === option.value ? 'selected' : ''}`}
                    onClick={() => handleAnswer(scenario.id, option.value)}
                    disabled={!!feedback[scenario.id]}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
            
            {feedback[scenario.id] && (
              <div className={`feedback ${feedback[scenario.id].includes('🎉') ? 'correct' : 'incorrect'}`}>
                <p>{feedback[scenario.id]}</p>
                {feedback[scenario.id].includes('🎉') && (
                  <div className="function-explanation">
                    <h4>💡 Function Unlocked: {scenario.moneyFunction}</h4>
                    <p>{scenario.explanation}</p>
                  </div>
                )}
              </div>
            )}

            {index < currentScenario && (
              <div className="completed-indicator">
                <p>✅ Completed: {scenario.moneyFunction}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {unlockedFunctions.length === 3 && (
        <div className="completion-section">
          <h3>🎉 You've Discovered Money's Three Superpowers!</h3>
          <p>Now you understand why money was such a revolutionary invention. But wait until you see what happened next...</p>
        </div>
      )}
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

  const questions = [
    {
      id: 1,
      text: "In 2008, banks froze withdrawals during the financial crisis. People couldn't access their own money.",
      question: "What fundamental problem does this reveal about the banking system?",
      options: [
        "Banks were just being cautious",
        "Your money isn't really yours",
        "People wanted too much money"
      ],
      answer: 1,
      takeaway: "When you can't access your money, do you really own it? Bitcoin gives you true ownership.",
      trait: "Self Custody"
    },
    {
      id: 2,
      text: "Throughout history, every government-issued currency has eventually lost most or all of its value through inflation.",
      question: "What does this pattern suggest about money controlled by authorities?",
      options: [
        "It's just economic cycles",
        "Printing money is necessary",
        "Power to create money will always be abused"
      ],
      answer: 2,
      takeaway: "Bitcoin's fixed supply prevents anyone from devaluing your savings through inflation.",
      trait: "Fixed Supply"
    },
    {
      id: 3,
      text: "Gold was used for centuries but was heavy and risky to transport.",
      question: "What was its biggest weakness?",
      options: [
        "Too beautiful",
        "Hard to carry",
        "Too scarce"
      ],
      answer: 1,
      takeaway: "Money must be easy to move—portability matters.",
      trait: "Portability"
    },
    {
      id: 4,
      text: "Germany in 1923 saw prices doubling every few days. People rushed to spend their money before it lost value.",
      question: "What's the lesson?",
      options: [
        "Spending fast is good",
        "Money must store value",
        "Prices should be flexible"
      ],
      answer: 1,
      takeaway: "Money must hold value over time, or it fails.",
      trait: "Store of Value"
    },
    {
      id: 5,
      text: "In ancient Rome, coins were secretly mixed with cheaper metals or clipped around the edges, making them unequal in value.",
      question: "What happened to trust in money?",
      options: [
        "Nothing changed",
        "People stopped trusting coins",
        "They made more coins"
      ],
      answer: 1,
      takeaway: "When money isn't uniform, people lose trust. Fungibility is essential.",
      trait: "Fungibility"
    },
    {
      id: 6,
      text: "The Yap Islands used massive stone money that never moved. Ownership was remembered by the community.",
      question: "What does this reveal about money?",
      options: [
        "Must be physical",
        "Community agreement matters",
        "Lost money still counts"
      ],
      answer: 1,
      takeaway: "Money relies on shared knowledge of ownership—not physical form. Ledger consensus is what really matters.",
      trait: "Ledger Consensus"
    },
    {
      id: 7,
      text: "In 2020, protesting Canadian truckers had their bank accounts frozen.",
      question: "What would change with Bitcoin?",
      options: [
        "Nothing",
        "Funds stay accessible",
        "Authorities would allow the protest"
      ],
      answer: 1,
      takeaway: "Decentralized money can't be frozen—censorship resistance matters.",
      trait: "Censorship Resistance"
    },
    {
      id: 8,
      text: "In Greece, Russia, Argentina, and China, to name a few, governments have placed strict controls on how much money citizens can withdraw or move abroad. Some families trying to leave must carry gold, hide cash, or pay black market rates.",
      question: "How does Bitcoin challenge that system?",
      options: [
        "It doesn't",
        "It respects capital controls",
        "It allows borderless movement of value"
      ],
      answer: 2,
      takeaway: "Bitcoin moves freely across borders, helping people escape restrictions and protect savings.",
      trait: "Borderless"
    },
    {
      id: 9,
      text: "When cattle was used as money, it worked for big trades—but you couldn't pay someone with half a cow.",
      question: "What did this reveal about money?",
      options: [
        "Cows were too smelly",
        "Money must be divisible",
        "People wanted beef"
      ],
      answer: 1,
      takeaway: "Money must be divisible to handle both big and small transactions.",
      trait: "Divisibility"
    },
    {
      id: 10,
      text: "Bitcoin is the first money that is digital, scarce, portable, divisible, and cannot be confiscated or counterfeited.",
      question: "What makes Bitcoin different?",
      options: [
        "Just another app",
        "Digital gold with new powers",
        "Only for small payments"
      ],
      answer: 1,
      takeaway: "Bitcoin combines all traits of sound money with global digital reach—plus neutrality and decentralization.",
      trait: "All traits"
    },
    {
      id: 11,
      text: "When governments banned gold ownership in the past, they could physically seize it from citizens. But Bitcoin exists as information.",
      question: "How does this change the relationship between money and authority?",
      options: [
        "It doesn't change anything",
        "Authorities can still control it",
        "Information is harder to seize than physical assets"
      ],
      answer: 2,
      takeaway: "Bitcoin's digital nature and cryptography make it resistant to physical confiscation.",
      trait: "Digital Sovereignty"
    },
    {
      id: 12,
      text: "In Venezuela, as inflation destroyed the currency's value, the government restricted access to foreign currencies, trapping savings in a dying system.",
      question: "What fundamental right does this violate?",
      options: [
        "The right to stable currency",
        "The right to choose your money",
        "The right to government support"
      ],
      answer: 1,
      takeaway: "Bitcoin gives you the freedom to opt out of failing monetary systems.",
      trait: "Freedom of Choice"
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

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      onComplete();
    }
  };

  const currentQ = questions[currentQuestion];

  if (showIntro) {
    return (
      <div className="step-content quiz-step">
        <div className="module-header-box">
          <h2>When Good Money Goes Bad</h2>
          <div className="intro-text">
            <p className="prime-text">You now understand money's three superpowers. But here's the plot twist: modern money has lost most of these powers.</p>
            <p>So what happened? Let's examine the evidence through history's greatest money failures.</p>
            <div className="quiz-preview">
              <h3>🔍 What You'll Discover:</h3>
              <ul>
                <li>Why every government currency eventually fails</li>
                <li>How inflation silently steals your savings</li>
                <li>Why banks can freeze "your" money</li>
                <li>What traits make money truly sound</li>
              </ul>
            </div>
            <p><strong>Ready to become a money detective?</strong></p>
          </div>
        </div>
        <div className="quiz-content">
          <button onClick={() => setShowIntro(false)} className="continue-button">
            Start Investigation ({questions.length} cases)
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="step-content quiz-step">
      <div className="module-header-box">
        <h2>🔍 Case {currentQuestion + 1} of {questions.length}</h2>
        <div className="quiz-score">
          Score: {score}/{currentQuestion + (showFeedback ? 1 : 0)} • {Math.round((score / questions.length) * 100)}% Sound Money Detective
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
            <button 
                key={index}
                className={`option-button ${selectedAnswer === index ? 'selected' : ''}`}
                onClick={() => handleAnswer(index)}
                disabled={showFeedback}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {showFeedback && (
          <div className={`feedback-section ${selectedAnswer === currentQ.answer ? 'correct' : 'incorrect'}`}>
            <p className="feedback-result">
              {selectedAnswer === currentQ.answer ? '🎯 Excellent Detective Work!' : '🔍 Not quite right, but keep investigating!'}
            </p>
            <div className="takeaway-box">
              <h4>💡 Key Insight:</h4>
              <p>{currentQ.takeaway}</p>
            </div>
            {selectedAnswer === currentQ.answer && (
              <div className="trait-unlock-box">
                <h4>🏆 Sound Money Trait Discovered:</h4>
                <p><strong>{currentQ.trait}</strong></p>
              </div>
            )}
            {selectedAnswer !== currentQ.answer && (
              <div className="correct-answer-box">
                <h4>📚 The Answer:</h4>
                <p>"{currentQ.options[currentQ.answer]}"</p>
              </div>
            )}
            <button onClick={handleNext} className="next-button">
              {currentQuestion < questions.length - 1 ? 'Next Case →' : 'Complete Investigation'}
            </button>
          </div>
        )}

        <div className="progress-indicator">
          <div className="progress-dots">
            {questions.map((_, index) => (
              <span
                key={index}
                className={`dot ${index === currentQuestion ? 'active' : ''} ${index < currentQuestion ? 'completed' : ''}`}
              />
            ))}
          </div>
          <p className="progress-text">Case {currentQuestion + 1} of {questions.length}</p>
        </div>
      </div>
    </div>
  );
};

// Component for the Traits Scorecard
const TraitsScorecard = ({ unlockedTraits, onComplete }) => {
  const [showComparison, setShowComparison] = useState(false);
  
  const allTraits = [
    { name: "Scarcity", icon: "scarcity", description: "Hard to reproduce", modernFail: "Central banks print unlimited money" },
    { name: "Durability", icon: "durability", description: "Doesn't rot or degrade", modernFail: "Digital records can be deleted or hacked" },
    { name: "Portability", icon: "portability", description: "Easy to move and transfer", modernFail: "International transfers take days and cost fees" },
    { name: "Store of Value", icon: "storeOfValue", description: "Holds value over time", modernFail: "Inflation erodes purchasing power" },
    { name: "Fungibility", icon: "fungibility", description: "Each unit is equal and interchangeable", modernFail: "Bills can be tracked, marked, or blacklisted" },
    { name: "Ledger Consensus", icon: "consensus", description: "Shared agreement on ownership", modernFail: "Banks control the ledger unilaterally" },
    { name: "Censorship Resistance", icon: "censorshipResistance", description: "Can't be frozen or blocked", modernFail: "Accounts can be frozen by authorities" },
    { name: "Borderless", icon: "borderless", description: "Moves freely across borders", modernFail: "Capital controls restrict movement" },
    { name: "Divisibility", icon: "divisibility", description: "Can be split into smaller units", modernFail: "Limited by smallest denomination" }
  ];

  const unlockedCount = unlockedTraits.filter(trait => allTraits.some(t => t.name === trait)).length;
  const completionPercentage = Math.round((unlockedCount / allTraits.length) * 100);

  return (
    <div className="step-content scorecard-step">
      <div className="module-header-box">
        <h2>The Sound Money Blueprint</h2>
        <div className="intro-text">
          <p className="prime-text">Through your investigation, you've discovered the traits that make money truly sound. But here's the shocking truth: modern money fails at most of these.</p>
          <div className="scorecard-summary">
            <h3>Your Discovery Progress</h3>
            <div className="progress-circle">
              <span className="score">{unlockedCount}/{allTraits.length}</span>
              <span className="percentage">{completionPercentage}% Complete</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="traits-comparison">
        <div className="comparison-header">
          <button 
            className={`view-toggle ${!showComparison ? 'active' : ''}`}
            onClick={() => setShowComparison(false)}
          >
            Sound Money Traits
          </button>
          <button 
            className={`view-toggle ${showComparison ? 'active' : ''}`}
            onClick={() => setShowComparison(true)}
          >
            How Modern Money Fails
          </button>
        </div>

        <div className="traits-list">
          {allTraits.map(trait => (
            <div key={trait.name} className={`trait-item ${unlockedTraits.includes(trait.name) ? 'unlocked' : 'locked'}`}>
              <span className="check-icon">{unlockedTraits.includes(trait.name) ? '✅' : '🔒'}</span>
              <div className="trait-content">
                <div className="trait-header">
                  <span className="trait-name"><strong>{trait.name}</strong></span>
                  {unlockedTraits.includes(trait.name) && <span className="discovered-badge">Discovered!</span>}
                </div>
                <div className="trait-details">
                  {!showComparison ? (
                    <span className="trait-description">{trait.description}</span>
                  ) : (
                    <span className="trait-failure">❌ {trait.modernFail}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bitcoin-teaser">
          <h3>🔮 Coming Next...</h3>
          <p>Now that you understand what makes money truly sound, you're ready to learn about the first technology that combines ALL these traits in one global system.</p>
          <p><strong>Spoiler alert:</strong> It's called Bitcoin, and it's going to challenge everything you thought you knew about money.</p>
        </div>

        <button 
          className="continue-button"
          onClick={() => onComplete(5)}
        >
          Ready for the Solution
        </button>
      </div>
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
          href="https://www.visualcapitalist.com/currency-and-the-collapse-of-the-roman-empire/"
          target="_blank"
          rel="noopener noreferrer"
          className="external-resource-link"
        >
          Visit Visual History of Money
        </a>
        <a
          href="https://layer-d.my.canva.site/interactive-timeline-of-money-evolution-from-barter-to-bitcoin"
          target="_blank"
          rel="noopener noreferrer"
          className="external-resource-link timeline-link"
        >
          Interactive Timeline: Barter to Bitcoin
        </a>
      </div>
      <div className="button-group">
        <button onClick={onComplete} className="continue-button">
          Complete Module
        </button>
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
        <button onClick={onClose}>Close</button>
      </div>
          </div>
        );
};

// Main Module Component
const MoneyModule = () => {
  const { completeModule, isModuleCompleted } = useProgress();
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(new Set());
  const [unlockedTraits, setUnlockedTraits] = useState([]);
  const [showBadgeModal, setShowBadgeModal] = useState(false);

  const handleStepComplete = (stepIndex) => {
    setCompletedSteps(prev => new Set(prev).add(stepIndex));
    
    // Show achievement for key milestones
    if (stepIndex === 1) {
      showAchievement("Trade Explorer", "You understand why humans needed to invent money!");
    } else if (stepIndex === 3) {
      showAchievement("Money Detective", "You've uncovered the flaws in traditional money systems!");
    } else if (stepIndex === 5) {
      showAchievement("Sound Money Scholar", "You know what makes money truly sound!");
    }
    
    if (stepIndex === 6) {  // Final step
      completeModule('money');
      setShowBadgeModal(true);
      showAchievement("Money Master", "You've mastered the fundamentals of sound money!");
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
      </div>
    `;
    document.body.appendChild(achievement);
    
    setTimeout(() => {
      achievement.style.opacity = '0';
      setTimeout(() => {
        document.body.removeChild(achievement);
      }, 300);
    }, 3000);
  };

  const handleTabClick = (stepIndex) => {
    setCurrentStep(stepIndex);
  };

  const handleUnlockTrait = (trait) => {
    if (!unlockedTraits.includes(trait)) {
      setUnlockedTraits([...unlockedTraits, trait]);
    }
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
      `}</style>
      
      <div className="module-header">
        <h1 className="module-title">
          <Coins className="module-icon" />
          If You Don't Define It, It Will Define You
        </h1>
      </div>

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
        {['The Money Mystery', 'The Stone Age Economy', 'Money\'s Superpowers', 'When Money Goes Wrong', 'Real-World Impact', 'The Sound Money Blueprint', 'Your Next Steps'].map((step, index) => (
          <button
            key={index}
            className={`top-nav-button ${
              index === currentStep ? 'active' : ''
            } ${completedSteps.has(index) ? 'completed' : ''}`}
            onClick={() => handleTabClick(index)}
          >
            <span className="nav-text">
              {index + 1}. {step.length > 20 ? `${step.substring(0, 17)}...` : step}
            </span>
          </button>
        ))}
      </div>

      <div className="module-content">
        {currentStep === 0 && <Introduction onComplete={handleStepComplete} />}
        {currentStep === 1 && <BarterWorld onComplete={handleStepComplete} />}
        {currentStep === 2 && <WhatsWrong onComplete={handleStepComplete} />}
        {currentStep === 3 && <MoneyQuiz onComplete={handleStepComplete} onUnlockTrait={handleUnlockTrait} />}
        {currentStep === 4 && <CarlosFlowerExport onComplete={handleStepComplete} />}
        {currentStep === 5 && <TraitsScorecard unlockedTraits={unlockedTraits} onComplete={handleStepComplete} />}
        {currentStep === 6 && <ExternalResource onComplete={handleStepComplete} />}
      </div>

      <BadgeModal isOpen={showBadgeModal} onClose={() => setShowBadgeModal(false)} />
    </div>
  );
};

export default MoneyModule; 