import React, { useState } from 'react';
import { useProgress } from '../contexts/ProgressContext';
import { Coins, Trophy, CheckCircle, Brain, History, Award, Clock } from 'lucide-react';
import AnimatedIcon from '../components/AnimatedIcon';
import '../components/ModuleCommon.css';
import '../components/MoneyModule.css';

// Component for the Barter World section
const BarterWorld = ({ onComplete }) => {
  return (
    <div className="step-content barter-world">
      <div className="step-icon">
        <Brain size={48} />
      </div>
      <h2>Imagine a World Without Money</h2>
      <div className="content-text">
        <p>
          Imagine waking up in a world with no money.<br/>
          Not the "I'm broke" kind of no money—the "money doesn't even exist" kind.<br/>
          You want 👟.<br/>
          Someone else wants 🥖.<br/>
          Another person needs their 💧🏠 fixed.<br/>
          Unless you miraculously find someone who wants exactly what you have and has exactly what you need, you're stuck staring at your pile of… whatever it is you have.<br/>
          This is called the double coincidence of wants—and it's basically the universe's way of testing your patience.
        </p>
        <p>
          But wait! Even if you do manage to barter, your extra food spoils before you can trade it, and nobody can agree if a 🐔 is worth a 🪑 or just a really nice 🎩.<br/>
          So without money, trade is slow, saving is risky, and everyone ends up arguing over whether a 🐄 is worth three 🐐 or a heartfelt "handshake." 
        </p>
        <p>
          Welcome to the Stone Age of economics, where value is in the eye of the beholder, and the barter system is the original dating app for stuff.<br/>
          (And just like dating, it's complicated, often messy, and rarely ends well for anyone involved.)
        </p>

        <h4>Then Along Came Money (Because Barter Was Driving Everyone Nuts)</h4>
        <p>
          So, after centuries of awkward bartering—think "Sorry, I don't need your <AnimatedIcon type="chicken" />, but do you want to trade for this slightly used <AnimatedIcon type="spear" />?"—people got creative.<br/>
          They realized that if everyone agreed on something as a "medium of <AnimatedIcon type="exchange" />," life could be a whole lot easier.<br/>
          Enter: <AnimatedIcon type="money" className="bounce" />.
        </p>
        <p>
          And just like that <AnimatedIcon type="magic" />, money transformed the way people traded, saved, and valued things:
        </p>
        <ol>
          <li>No more double coincidence of wants: Now you can sell your <AnimatedIcon type="shoes" /> to anyone and buy <AnimatedIcon type="bread" /> from anyone else.</li>
          <li>Saving is suddenly possible: Extra food spoils, but <AnimatedIcon type="coins" />? They last forever (or at least until you lose them in the <AnimatedIcon type="couch" />).</li>
          <li>Everyone agrees (sort of) on value: Instead of arguing if a <AnimatedIcon type="sheep" /> is worth a basket of <AnimatedIcon type="apples" /> or a night out, you just slap a <AnimatedIcon type="pricetag" /> on it.</li>
        </ol>

        <button onClick={onComplete} className="continue-button">
          Continue
        </button>
      </div>
    </div>
  );
};

// Component for the Money Quiz
const MoneyQuiz = ({ onComplete, onUnlockTrait }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const questions = [
    {
      id: 1,
      text: "Rare shells were used as money on Pacific Islands—until traders arrived with boatloads from elsewhere.",
      question: "What went wrong?",
      options: [
        "Trade increased",
        "Shells lost their scarcity",
        "Islanders chose the wrong shell"
      ],
      answer: 1,
      takeaway: "Shells lost scarcity. Good money must be hard to reproduce.",
      trait: "Scarcity"
    },
    {
      id: 2,
      text: "Salt was used as money, but it dissolved in rain and rotted in humidity.",
      question: "Why was this a problem?",
      options: [
        "Too common",
        "Not divisible",
        "Wouldn't last"
      ],
      answer: 2,
      takeaway: "Money must be durable to hold value.",
      trait: "Durability"
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

        return (
    <div className="step-content quiz-step">
            <div className="step-icon">
        <History size={48} />
      </div>
      <h2>Money's Greatest Fails (<span className="question-icon">❓</span> {currentQuestion + 1} of {questions.length})</h2>
      
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
          <div className="feedback-section">
            <p className="takeaway">{currentQ.takeaway}</p>
            <p className="trait-unlock">Trait Unlocked: {currentQ.trait}</p>
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
      <h2>The Traits That Matter</h2>
      
      <div className="traits-list">
        {allTraits.map(trait => (
          <div key={trait.name} className={`trait-item ${unlockedTraits.includes(trait.name) ? 'unlocked' : ''}`}>
            <span className="check-icon">{unlockedTraits.includes(trait.name) ? '✓' : '○'}</span>
            <AnimatedIcon type={trait.icon} className={unlockedTraits.includes(trait.name) ? 'unlocked' : ''} />
            <span className="trait-name">{trait.name}</span>
            <span className="trait-description">— {trait.description}</span>
          </div>
        ))}
      </div>

      <div className="summary-section">
        <p className="summary">Summary: Bitcoin is the first money to meet all of these traits in one system.</p>
        <button onClick={onComplete} className="badge-button">
          Earn Badge: Sound Money Explorer <AnimatedIcon type="learn" />
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
      <h2>Explore the History of Money <AnimatedIcon type="history" /></h2>
      <p className="external-resource-description">
        Dive deeper into the fascinating evolution of money through the ages. <AnimatedIcon type="explore" />
      </p>
      <a
        href="https://www.visualcapitalist.com/currency-and-the-collapse-of-the-roman-empire/"
        target="_blank"
        rel="noopener noreferrer"
        className="external-resource-link"
      >
        Visit Visual History of Money
      </a>
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
    if (currentStep === 3) {
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
            style={{ width: `${(currentStep / 4) * 100}%` }}
          />
        </div>
        <span className="progress-text">
          {currentStep} / 4 steps completed
        </span>
      </div>

      <div className="module-steps">
        <div className="steps-navigation">
          {['Barter World', 'Money Quiz', 'Traits Scorecard', 'Learn More'].map((step, index) => (
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
          {currentStep === 1 && <MoneyQuiz onComplete={handleStepComplete} onUnlockTrait={handleUnlockTrait} />}
          {currentStep === 2 && <TraitsScorecard unlockedTraits={unlockedTraits} onComplete={handleStepComplete} />}
          {currentStep === 3 && <ExternalResource onComplete={handleStepComplete} />}
        </div>
      </div>

      <BadgeModal isOpen={showBadgeModal} onClose={() => setShowBadgeModal(false)} />
    </div>
  );
};

export default MoneyModule; 