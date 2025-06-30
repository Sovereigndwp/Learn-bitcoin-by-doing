import React, { useState } from 'react';
import { useProgress } from '../contexts/ProgressContext';
import { Coins, Trophy, CheckCircle, Brain, History, Award, Clock } from 'lucide-react';
import AnimatedIcon from '../components/AnimatedIcon';
import '../components/ModuleLayout.css';
import '../components/ModuleCommon.css';
import '../components/MoneyModule.css';

// Component for the Barter World section
const BarterWorld = ({ onComplete }) => {
  return (
    <div className="step-content barter-world">
      <div className="step-icon">
        <Brain size={48} />
      </div>
      <div className="module-header-box">
        <h2>Imagine a World Without Money</h2>
      </div>
      <div className="content-text">
        <p>
          Imagine waking up in a world without money.<br/>
          Not the "I'm broke" kind...<br/>
          The "money doesn't exist at all" kind.
        </p>
        <p>
          You want 👟.<br/>
          Someone else wants 🥖.<br/>
          Another person needs their 💧🏠 fixed.
        </p>
        <p>
          Unless you magically find someone who wants what you have and has what you need, you're stuck staring at your pile of… whatever.
        </p>
        <p>
          This is called the double coincidence of wants... basically, the universe's least efficient matchmaking system.
        </p>
        <p>
          It's like a dating app, but for bartering:<br/>
          You have shoes.<br/>
          You need bread.<br/>
          You swipe through a sea of people until... boom! Someone finally wants shoes and has sourdough. Good luck with that.
        </p>
        <p>
          Without money:
        </p>
        <ul>
          <li>Trading is painfully slow</li>
          <li>Saving is a gamble (potatoes don't age well)</li>
          <li>And everyone argues over whether a cow is worth three goats or just a sincere thank-you note</li>
        </ul>
        <p>
          Eventually, humanity got tired of playing this awkward game of economic Tinder.
        </p>
        <p>
          Enter: <AnimatedIcon type="money" className="bounce" />
        </p>
        <p>
          Some brilliant (or just really frustrated) soul finally said,<br/>
          "What if we just agree on something we can all trade for everything else?"
        </p>
        <p>
          And poof... money was born.<br/>
          A tool to grease the wheels of trade,<br/>
          save value for later,<br/>
          and make deals without needing a PhD in goat valuation.
        </p>
        <p>
          Because deep down, humans are problem solvers...<br/>
          Even if most of our solutions just lead to new arguments.
        </p>
        <p>
          So what exactly did money fix?
        </p>
        <p>
          Let's go back to some of those barter disasters and find out.
        </p>

        <button onClick={onComplete} className="continue-button">
          Continue
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
      <div className="step-icon">
        <Brain size={48} />
      </div>
      <div className="module-header-box">
        <h2>Carlos's Flower Export</h2>
        <div className="intro-text">
          <p>Carlos, exporting 1,000 roses to Japan, gets paid in USD but spends in Colombian pesos. Let's walk through what actually happens.</p>
        </div>
      </div>

      <div className="scenario-section">
        <ul className="scenario-steps">
          <li>Carlos ships the roses and invoices his buyer in USD</li>
          <li>Bank A converts USD to COP at today's rate (~4,400 COP/USD)</li>
          <li>Transfer takes 2–5 business days to process</li>
          <li>By the time funds arrive, the peso has depreciated ~10%</li>
          <li>Bank fees are deducted during conversion and transfer</li>
        </ul>
      </div>

      <div className="demo-container">
        <p>🔍 Explore Carlos's live USD → COP exchange and fees:</p>
        <button
          className="link-button"
          onClick={() => window.open('https://layer-d.my.canva.site/dagrpelgejq', '_blank')}
        >
          Open live Fiat Export Demo
        </button>
        <p className="caption">
          Adjust rates and timing to see Carlos's real payout change in real time.
        </p>
        <p className="return-instructions">
          💡 <strong>Tip:</strong> The demo opens in a new tab. After exploring, simply close that tab or switch back to this tab to continue the lesson.
        </p>
      </div>

      <div className="quiz-content">
        <h3>🤔 What problems do you spot in this fiat transaction?</h3>
        <div className="options-grid">
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
    </div>
  );
};

// Component for the "What's Missing Here?" section
const WhatsWrong = ({ onComplete }) => {
  const [answers, setAnswers] = useState({});
  const [feedback, setFeedback] = useState({});

  const scenarios = [
    {
      id: 'q1',
      title: "The Sandwich Stand-Off",
      description: "You're a hungry web designer. You offer the baker a free website in exchange for a sandwich. He says, 'I need a plumber, not a homepage.'",
      question: "What's stopping this trade from happening? What could solve it?",
      options: [
        { value: 'A', label: 'Money gives people an easier way to trade what they have for what they want.' },
        { value: 'B', label: 'Money makes it possible to save your value for the future.' },
        { value: 'C', label: 'Money gives us a common way to measure how much things are worth.' }
      ],
      feedback: {
        A: "✅ Correct! You need a smoother way to trade, not a direct swap.",
        B: "You're not trying to save food for later—you're just trying to make a trade now.",
        C: "You know the sandwich is valuable—you just can't exchange your skills for it."
      },
      correctAnswer: 'A'
    },
    {
      id: 'q2',
      title: "The Rotten Paycheck",
      description: "You grew potatoes to pay your carpenter next month. But by then, they've all rotted or turned into weird sprouts.",
      question: "Why didn't your payment plan work? What could help preserve your effort over time?",
      options: [
        { value: 'A', label: 'Money gives people an easier way to trade what they have for what they want.' },
        { value: 'B', label: 'Money makes it possible to save your value for the future.' },
        { value: 'C', label: 'Money gives us a common way to measure how much things are worth.' }
      ],
      feedback: {
        A: "You weren't trying to trade right away. The issue was storing value for later.",
        B: "✅ Correct! The problem is that your savings (potatoes) didn't last.",
        C: "You knew what the potatoes were worth—they just didn't last."
      },
      correctAnswer: 'B'
    },
    {
      id: 'q3',
      title: "The Bread-for-Hat Deal",
      description: "Someone offers five loaves of bread for your hat. Is that a fair deal? Too much? Not enough? Nobody knows.",
      question: "What's missing to help you both agree on whether this is a fair exchange?",
      options: [
        { value: 'A', label: 'Money gives people an easier way to trade what they have for what they want.' },
        { value: 'B', label: 'Money makes it possible to save your value for the future.' },
        { value: 'C', label: 'Money gives us a common way to measure how much things are worth.' }
      ],
      feedback: {
        A: "You *can* trade—the issue is figuring out if it's a good trade.",
        B: "You're not trying to store anything—you just want to know what it's worth.",
        C: "✅ Correct! You need a clear way to measure value."
      },
      correctAnswer: 'C'
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

    const allAnswers = { ...answers, [questionId]: value };
    const allCorrect = scenarios.every(s => allAnswers[s.id] === s.correctAnswer);
    
    if (allCorrect) {
      setTimeout(() => {
        onComplete();
      }, 2000);
    }
  };

  return (
    <div className="step-content whats-wrong-step">
      <div className="step-icon">
        <Brain size={48} />
      </div>
      <div className="module-header-box">
        <h2>Fix this Trade</h2>
        <div className="intro-text">
          <p>
            Each of these scenarios shows how messy life was before money.<br/>
            Your challenge? Figure out what role money would've played to fix the problem.
          </p>
        </div>
      </div>

      <div className="scenarios-list">
        {scenarios.map(scenario => (
          <div key={scenario.id} className="scenario-item">
            <div className="scenario-header">
              <h3>{scenario.title}</h3>
              <p className="scenario-description">{scenario.description}</p>
                              <p className="scenario-question">{scenario.question}</p>
            </div>
            <div className="options-grid">
              {scenario.options.map(option => (
                <label key={option.value} className="option-label">
                  <input
                    type="radio"
                    name={scenario.id}
                    value={option.value}
                    checked={answers[scenario.id] === option.value}
                    onChange={() => handleAnswer(scenario.id, option.value)}
                  />
                  <span className="option-text">{option.label}</span>
                </label>
              ))}
            </div>
            {feedback[scenario.id] && (
              <p className={`feedback ${feedback[scenario.id].includes('✅') ? 'correct' : 'incorrect'}`}>
                {feedback[scenario.id]}
              </p>
            )}
          </div>
        ))}
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
      text: "In Turkey, Argentina, and China, governments have placed strict controls on how much money citizens can withdraw or move abroad. Some families trying to leave must carry gold, hide cash, or pay black market rates.",
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
        <div className="step-icon">
          <History size={48} />
        </div>
        <div className="module-header-box">
          <h2>The Perpetual Patch</h2>
          <div className="intro-text">
            <p>So now we know:</p>
            <p>🧩 Money makes trade easier.<br/>
            🧩 Money lets you save value over time.<br/>
            🧩 Money gives us a shared way to measure things.</p>
            <p>But…<br/>
            Does the money we use today actually do all that?</p>
            <p>Let's fast-forward to find out with a snapshot of money's greatest fails.</p>
          </div>
        </div>
        <div className="quiz-content">
          <button onClick={() => setShowIntro(false)} className="continue-button">
            Start Quiz ({questions.length} questions)
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="step-content quiz-step">
      <div className="step-icon">
        <History size={48} />
      </div>
      <div className="module-header-box">
        <h2>Question {currentQuestion + 1} of {questions.length}</h2>
      </div>
      
      <div className="quiz-content">
        <div className="history-snapshot">
          <h3>History Snapshot:</h3>
          <p>{currentQ.text}</p>
            </div>

        <div className="question-section">
          <h3>{currentQ.question}</h3>
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
              {selectedAnswer === currentQ.answer ? '✅ Correct!' : '❌ Not quite right.'}
            </p>
            <p className="takeaway">{currentQ.takeaway}</p>
            {selectedAnswer === currentQ.answer && (
              <p className="trait-unlock">Trait Unlocked: {currentQ.trait}</p>
            )}
            {selectedAnswer !== currentQ.answer && (
              <p className="try-again-hint">The correct answer was: "{currentQ.options[currentQ.answer]}"</p>
            )}
            <button onClick={handleNext} className="next-button">
              {currentQuestion < questions.length - 1 ? 'Next Question' : 'Complete Quiz'}
            </button>
          </div>
        )}

        <div className="progress-dots">
          {questions.map((_, index) => (
            <span
              key={index}
              className={`dot ${index === currentQuestion ? 'active' : ''} ${index < currentQuestion ? 'completed' : ''}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Component for the Traits Scorecard
const TraitsScorecard = ({ unlockedTraits, onComplete }) => {
  const allTraits = [
    { name: "Scarcity", icon: "scarcity", description: "Hard to reproduce" },
    { name: "Durability", icon: "durability", description: "Doesn't rot or degrade" },
    { name: "Portability", icon: "portability", description: "Easy to move and transfer" },
    { name: "Store of Value", icon: "storeOfValue", description: "Holds value over time" },
    { name: "Fungibility", icon: "fungibility", description: "Each unit is equal and interchangeable" },
    { name: "Ledger Consensus", icon: "consensus", description: "Shared agreement on ownership" },
    { name: "Censorship Resistance", icon: "censorshipResistance", description: "Can't be frozen or blocked" },
    { name: "Borderless", icon: "borderless", description: "Moves freely across borders" },
    { name: "Divisibility", icon: "divisibility", description: "Can be split into smaller units" }
  ];

        return (
    <div className="step-content scorecard-step">
      <div className="step-icon">
        <Award size={48} />
      </div>
      <div className="module-header-box">
        <h2>The Traits That Matter</h2>
      </div>
      
      <div className="traits-list">
        {allTraits.map(trait => (
          <div key={trait.name} className={`trait-item ${unlockedTraits.includes(trait.name) ? 'unlocked' : ''}`}>
            <span className="check-icon">{unlockedTraits.includes(trait.name) ? '✓' : '○'}</span>
            <AnimatedIcon type={trait.icon} className={unlockedTraits.includes(trait.name) ? 'unlocked' : ''} />
            <span className="trait-name"><strong>{trait.name}</strong></span>
            <span className="trait-description">{trait.description}</span>
          </div>
        ))}
      </div>

      <div className="summary-section">
        <p className="summary">Bitcoin is the first money to meet all of these traits in one system.</p>
        <button onClick={onComplete} className="badge-button">
          Earn Badge: Sound Money Explorer 🎓
        </button>
      </div>
    </div>
  );
};

// Component for External Resource Link
const ExternalResource = ({ onComplete }) => {
  return (
    <div className="step-content external-resource-step">
      <div className="step-icon">
        <Clock size={48} />
      </div>
      <div className="module-header-box">
        <h2>Explore the History of Money <AnimatedIcon type="history" /></h2>
      </div>
      <p className="external-resource-description">
        Dive deeper into the fascinating evolution of money through the ages. <AnimatedIcon type="explore" />
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
  const [unlockedTraits, setUnlockedTraits] = useState([]);
  const [showBadgeModal, setShowBadgeModal] = useState(false);

  const handleStepComplete = () => {
    if (currentStep === 5) {  // Updated to account for new step (now 6 total steps)
      completeModule('money');
      setShowBadgeModal(true);
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleUnlockTrait = (trait) => {
    if (!unlockedTraits.includes(trait)) {
      setUnlockedTraits([...unlockedTraits, trait]);
    }
  };

  return (
    <div className="module-container">
      <div className="module-header">
        <h1 className="module-title">
          <Coins className="module-icon" />
          If You Don't Define It, It Will Define You
        </h1>
        {isModuleCompleted('money') && (
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
            style={{ width: `${(currentStep / 6) * 100}%` }}
          />
        </div>
        <span className="progress-text">
          {currentStep} / 6 steps completed
        </span>
      </div>

      <div className="module-steps">
        <div className="steps-navigation">
          {['Barter World', 'Fix this Trade', 'Carlos\'s Flower Export', 'The Perpetual Patch', 'Traits Scorecard', 'An Optional Deeper Dive'].map((step, index) => (
            <button
              key={index}
              className={`step-nav-button ${currentStep === index ? 'active' : ''} ${index < currentStep ? 'completed' : ''}`}
              onClick={() => setCurrentStep(index)}
            >
              {index < currentStep && <CheckCircle size={16} />}
              {step}
            </button>
          ))}
        </div>

        <div className="step-content-container">
          {currentStep === 0 && <BarterWorld onComplete={handleStepComplete} />}
          {currentStep === 1 && <WhatsWrong onComplete={handleStepComplete} />}
          {currentStep === 2 && <CarlosFlowerExport onComplete={handleStepComplete} />}
          {currentStep === 3 && <MoneyQuiz onComplete={handleStepComplete} onUnlockTrait={handleUnlockTrait} />}
          {currentStep === 4 && <TraitsScorecard unlockedTraits={unlockedTraits} onComplete={handleStepComplete} />}
          {currentStep === 5 && <ExternalResource onComplete={handleStepComplete} />}
        </div>
      </div>

      <BadgeModal isOpen={showBadgeModal} onClose={() => setShowBadgeModal(false)} />
    </div>
  );
};

export default MoneyModule; 