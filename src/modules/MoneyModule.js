import React, { useState } from 'react';
import { useProgress } from '../contexts/ProgressContext';
import { Coins, Trophy, CheckCircle, Brain, History, Award, Clock } from 'lucide-react';
import '../components/ModuleCommon.css';
import '../components/MoneyModule.css';

// Component for the Barter World section
const BarterWorld = ({ onComplete }) => {
  const [reflection, setReflection] = useState('');

  return (
    <div className="step-content barter-world">
      <div className="step-icon">
        <Brain size={48} />
      </div>
      <h2>🧠 Imagine a World Without Money</h2>
      <div className="content-text">
        <p>
          You want shoes. Someone else wants bread. Another needs roof repair.
          Unless the right match exists, trade doesn't happen. This is barter hell.
        </p>
        <div className="key-points">
          <p>Without money:</p>
          <ul>
            <li>Trade breaks</li>
            <li>Saving is impossible</li>
            <li>Valuing things is confusing</li>
          </ul>
        </div>
        <div className="reflection-section">
          <h3>💬 Reflection</h3>
          <p>Try to trade 3 items around you without money.</p>
          <textarea
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
            placeholder="Type your reflection here..."
            rows={4}
          />
          <div className="button-group">
            <button onClick={() => onComplete(reflection)} className="primary-button">
              Submit
            </button>
            <button onClick={() => onComplete()} className="secondary-button">
              Skip
            </button>
          </div>
        </div>
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
      text: "On the Pacific Islands, rare seashells were used as money—until European traders arrived with boatloads from other shores.",
      question: "What went wrong?",
      options: [
        "Trade increased",
        "Shells lost their scarcity",
        "Islanders chose the wrong shell"
      ],
      answer: 1,
      takeaway: "Shells lost their scarcity, proving money must be hard to reproduce.",
      trait: "Scarcity"
    },
    // ... other questions from the spec
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
      <h2>💰 Money's Greatest Fails (Question {currentQuestion + 1} of {questions.length})</h2>
      
      <div className="quiz-content">
        <div className="history-snapshot">
          <h3>📜 History Snapshot:</h3>
          <p>{currentQ.text}</p>
        </div>

        <div className="question-section">
          <h3>❓ {currentQ.question}</h3>
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
            <p className="takeaway">✅ {currentQ.takeaway}</p>
            <p className="trait-unlock">🔓 Trait Unlocked: {currentQ.trait} ✔️</p>
            <button onClick={handleNext} className="next-button">
              {currentQuestion < questions.length - 1 ? 'Next Question →' : 'Complete Quiz'}
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
    { name: "Scarcity", description: "Hard to reproduce" },
    { name: "Durability", description: "Doesn't rot or degrade" },
    { name: "Portability", description: "Easy to carry/send" },
    { name: "Store of Value", description: "Keeps its worth" },
    { name: "Censorship Resistance", description: "Can't be frozen" },
    { name: "Honesty", description: "Can't be debased" }
  ];

  return (
    <div className="step-content scorecard-step">
      <div className="step-icon">
        <Award size={48} />
      </div>
      <h2>✅ The Traits That Matter</h2>
      
      <div className="traits-list">
        {allTraits.map(trait => (
          <div key={trait.name} className={`trait-item ${unlockedTraits.includes(trait.name) ? 'unlocked' : ''}`}>
            <span className="check-icon">{unlockedTraits.includes(trait.name) ? '✔️' : '◯'}</span>
            <span className="trait-name">{trait.name}</span>
            <span className="trait-description">— {trait.description}</span>
          </div>
        ))}
      </div>

      <div className="summary-section">
        <p className="summary">🟡 Summary: Bitcoin is the first money to meet all of these traits in one system.</p>
        <button onClick={onComplete} className="badge-button">
          🎉 Earn Badge: Sound Money Explorer
        </button>
      </div>
    </div>
  );
};

// Component for the Money Timeline
const MoneyTimeline = ({ onComplete }) => {
  const timelineEras = [
    { era: "Barter", year: "9000 BCE", description: "Direct trade of goods" },
    { era: "Commodity", year: "3000 BCE", description: "Shells, salt, cattle" },
    { era: "Coins", year: "600 BCE", description: "Reliable weight, hard to fake—but heavy" },
    { era: "Paper", year: "700 CE", description: "Lightweight but needs trust" },
    { era: "Banking", year: "1400 CE", description: "More efficient but centralized" },
    { era: "Digital", year: "1950s", description: "Fast but surveillance heavy" },
    { era: "Bitcoin", year: "2009", description: "Digital scarcity + no rulers" }
  ];

  return (
    <div className="step-content timeline-step">
      <div className="step-icon">
        <Clock size={48} />
      </div>
      <h2>📈 The Evolution of Money</h2>
      
      <div className="timeline-scroll">
        {timelineEras.map((era, index) => (
          <div key={index} className="timeline-item">
            <h3>{era.era}</h3>
            <p className="year">{era.year}</p>
            <p className="description">{era.description}</p>
          </div>
        ))}
      </div>

      <button onClick={onComplete} className="continue-button">
        Complete Module
      </button>
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
          {['Barter World', 'Money Quiz', 'Traits Scorecard', 'Timeline'].map((step, index) => (
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
          {currentStep === 3 && <MoneyTimeline onComplete={handleStepComplete} />}
        </div>
      </div>

      <BadgeModal isOpen={showBadgeModal} onClose={() => setShowBadgeModal(false)} />
    </div>
  );
};

export default MoneyModule; 