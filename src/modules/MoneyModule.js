import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '../contexts/ProgressContext';
import { 
  ContinueButton, 
  ActionButton,
  StepNavigation
} from '../components/EnhancedButtons';
import { ModuleCompletionButton } from '../components/ui';
import { 
  BitcoinIcon
} from '../components/ui/SVGIcons';
import module1 from './Module1Data';
import '../components/ModuleCommon.css';
import '../components/MoneyModule.css';

// Step labels based on Module 1 sections
const stepLabels = [
  'Introduction',
  'Barter World',
  'Money Fails Quiz',
  'Traits Scorecard',
  'Evolution Timeline'
];

// Introduction Component
const Introduction = ({ onComplete }) => {
  return (
    <div className="module-container">
      <div className="section-card">
        <h1 className="heading-critical">{module1.title}</h1>
        <p>Welcome to the Money module! You'll discover why money exists, how past forms failed, what makes good money, and how Bitcoin fits in.</p>
        
        <div className="card-feature">
          <h2 className="heading-high">What You'll Learn</h2>
          <ul>
            <li>Why money was invented (starting from barter world)</li>
            <li>10 historical money failures and what they teach us</li>
            <li>The essential traits that make money work</li>
            <li>How Bitcoin combines all these traits</li>
            <li>A framework for evaluating any money system</li>
          </ul>
          
          <ContinueButton onClick={() => onComplete(0)}>
            Begin Your Money Journey
          </ContinueButton>
        </div>
      </div>
    </div>
  );
};

// Barter World Component
const BarterWorld = ({ onComplete }) => {
  const barterSection = module1.sections.find(s => s.id === 'barter-world');
  const [showActivity, setShowActivity] = useState(false);
  const [reflection, setReflection] = useState('');

  return (
    <div className="module-container">
      <div className="section-card">
        <h1 className="heading-critical">{barterSection.title}</h1>
        
        <div className="card-feature">
          <div className="story-content">
            {barterSection.content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="mb-4">
                {paragraph.trim()}
              </p>
            ))}
          </div>
          
          {!showActivity ? (
            <ContinueButton onClick={() => setShowActivity(true)}>
              Try the Barter Challenge
            </ContinueButton>
          ) : (
            <div className="activity-section">
              <div className="card-supporting">
                <h3 className="heading-standard">🤔 Reflection Activity</h3>
                <p><strong>{barterSection.activity.prompt}</strong></p>
                
                <textarea
                  className="reflection-input"
                  placeholder="Describe what you discovered when trying to trade without money..."
                  value={reflection}
                  onChange={(e) => setReflection(e.target.value)}
                  rows={4}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    fontSize: '14px',
                    marginTop: '12px'
                  }}
                />
              </div>
              
              <div className="insight-box">
                <h4 className="heading-standard">💡 Key Insight</h4>
                <p>Without money, every trade requires finding someone who has exactly what you want AND wants exactly what you have. This "double coincidence of wants" makes trading frustrating and limits economic growth.</p>
              </div>
              
              <ContinueButton onClick={() => onComplete(1)}>
                Discover Money's Historical Failures
              </ContinueButton>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Money Fails Quiz Component
const MoneyFailsQuiz = ({ onComplete, onUnlockTrait }) => {
  const quizSection = module1.sections.find(s => s.id === 'money-fails-quiz');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [unlockedTraits, setUnlockedTraits] = useState(new Set());

  const question = quizSection.questions[currentQuestion];

  const handleAnswer = (answerIndex) => {
    setSelectedAnswer(answerIndex);
    setShowFeedback(true);
    
    if (answerIndex === question.answer) {
      const newTrait = question.unlock;
      setUnlockedTraits(prev => new Set([...prev, newTrait]));
      onUnlockTrait(newTrait);
    }
  };

  const handleNext = () => {
    if (currentQuestion < quizSection.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      onComplete(2);
    }
  };

  return (
    <div className="module-container">
      <div className="section-card">
        <h1 className="heading-critical">{quizSection.title}</h1>
        <p>Learn from history's money failures. Each question unlocks a key trait of sound money.</p>
        
        <div className="progress-indicator">
          <div className="progress-text">
            Question {currentQuestion + 1} of {quizSection.questions.length}
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: `${((currentQuestion + 1) / quizSection.questions.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="traits-unlocked">
          <strong>Traits Unlocked: </strong>{unlockedTraits.size} / {quizSection.questions.length}
        </div>
      </div>

      <div className="card-feature">
        <div className="historical-question">
          <div className="context-box">
            <h3>Historical Example</h3>
            <p>{question.text}</p>
          </div>
          
          <div className="question-box">
            <h4>{question.question}</h4>
            
            {!showFeedback && (
              <div className="quiz-options">
                {question.options.map((option, index) => (
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
              <div className={`quiz-feedback ${selectedAnswer === question.answer ? 'correct' : 'incorrect'}`}>
                {selectedAnswer === question.answer ? (
                  <div className="feedback-text">
                    <p>✅ <strong>Correct!</strong></p>
                    <div className="correct-answer">
                      <strong>💡 Key Takeaway:</strong> {question.takeaway}
                    </div>
                    <div className="trait-unlocked">
                      <p><strong>🔓 Trait Unlocked:</strong> {question.unlock}</p>
                    </div>
                  </div>
                ) : (
                  <div className="feedback-text">
                    <p>❌ <strong>Not quite.</strong></p>
                    <div className="correct-answer">
                      <strong>✅ Correct answer:</strong> {question.options[question.answer]}
                    </div>
                    <div className="insight-explanation">
                      <strong>💡 Key Takeaway:</strong> {question.takeaway}
                    </div>
                    <div className="trait-unlocked">
                      <p><strong>🔓 Trait Unlocked:</strong> {question.unlock}</p>
                    </div>
                  </div>
                )}
                
                <ContinueButton onClick={handleNext}>
                  {currentQuestion === quizSection.questions.length - 1 ? 'See Your Scorecard' : 'Next Historical Example'}
                </ContinueButton>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Traits Scorecard Component
const TraitsScorecard = ({ unlockedTraits, onComplete }) => {
  const scorecardSection = module1.sections.find(s => s.id === 'traits-scorecard');
  const [currentTrait, setCurrentTrait] = useState(0);

  return (
    <div className="module-container">
      <div className="section-card">
        <h1 className="heading-critical">{scorecardSection.title}</h1>
        <p>{scorecardSection.content}</p>
      </div>

      <div className="card-feature">
        <h2 className="heading-high">Sound Money Traits</h2>
        <p>You've unlocked {unlockedTraits.length} out of {scorecardSection.traits.length} essential traits:</p>
        
        <div className="traits-grid">
          {scorecardSection.traits.map((trait, index) => (
            <div 
              key={index} 
              className={`trait-card ${unlockedTraits.includes(trait) ? 'unlocked' : 'locked'}`}
              onClick={() => setCurrentTrait(index)}
            >
              <div className="trait-header">
                <span className="trait-status">
                  {unlockedTraits.includes(trait) ? '✅' : '🔒'}
                </span>
                <span className="trait-name">{trait}</span>
              </div>
              {index === currentTrait && (
                <div className="trait-details">
                  <p>Essential for sound money systems</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="scorecard-summary">
          <h3 className="heading-standard">🎯 Summary</h3>
          <p>{scorecardSection.summary}</p>
        </div>

        <div className="bitcoin-preview">
          <h4 className="heading-standard">🚀 What's Next?</h4>
          <p>Now you have a framework for evaluating money. Let's see how different money systems throughout history compare using these traits.</p>
        </div>

        <ContinueButton onClick={() => onComplete(3)}>
          Explore Money's Evolution
        </ContinueButton>
      </div>
    </div>
  );
};

// Evolution Timeline Component
const EvolutionTimeline = ({ onComplete }) => {
  const timelineSection = module1.sections.find(s => s.id === 'timeline');
  const [selectedEra, setSelectedEra] = useState(0);

  const eraDetails = {
    0: { 
      title: "Barter (9000 BCE)", 
      description: "Direct exchange of goods - limited by double coincidence of wants",
      example: "Trading grain for pottery, but only if both parties want what the other has"
    },
    1: { 
      title: "Commodity Money (3000 BCE)", 
      description: "Using valuable commodities like salt, shells, cattle as medium of exchange",
      example: "Salt was so valuable it was used to pay Roman soldiers (hence 'salary')"
    },
    2: { 
      title: "Metal Coins (600 BCE)", 
      description: "Standardized metal pieces with guaranteed weight and purity",
      example: "Gold and silver coins allowed for precise value measurement"
    },
    3: { 
      title: "Paper Money (700 CE)", 
      description: "Promissory notes representing claims on precious metals",
      example: "Chinese Tang Dynasty issued the first government-backed paper money"
    },
    4: { 
      title: "Banking Systems (1400 CE)", 
      description: "Complex financial institutions managing money supply and credit",
      example: "Italian merchant banks enabled international trade and credit"
    },
    5: { 
      title: "Digital Banking (1950s)", 
      description: "Electronic systems for managing and transferring money",
      example: "Credit cards and electronic transfers made payments instant but centralized"
    },
    6: { 
      title: "Bitcoin (2009)", 
      description: "Decentralized digital money with mathematical scarcity",
      example: "First money system to combine digital efficiency with sound money properties"
    }
  };

  return (
    <div className="module-container">
      <div className="section-card">
        <h1 className="heading-critical">{timelineSection.title}</h1>
        <p>See how money evolved over thousands of years, leading to Bitcoin.</p>
        {timelineSection.note && (
          <p className="note"><em>{timelineSection.note}</em></p>
        )}
      </div>

      <div className="card-feature">
        <div className="timeline-container">
          <div className="timeline-navigation">
            {timelineSection.eras.map((era, index) => (
              <button
                key={index}
                className={`timeline-button ${index === selectedEra ? 'active' : ''}`}
                onClick={() => setSelectedEra(index)}
              >
                <span className="era-number">{index + 1}</span>
                <span className="era-name">{era}</span>
              </button>
            ))}
          </div>

          <div className="timeline-content">
            <div className="era-card">
              <h3 className="heading-medium">{eraDetails[selectedEra].title}</h3>
              <p className="era-description">{eraDetails[selectedEra].description}</p>
              <div className="era-example">
                <strong>Example:</strong> {eraDetails[selectedEra].example}
              </div>
            </div>
          </div>
        </div>

        <div className="timeline-insight">
          <h4 className="heading-standard">🎯 Key Insight</h4>
          <p>Each evolution solved previous problems but created new ones. Bitcoin represents the first money designed to solve <em>all</em> historical money problems simultaneously.</p>
        </div>

        <ModuleCompletionButton 
          moduleName="Money"
          moduleId="money"
          customMessage="🎉 Congratulations! You now understand why money exists, how it evolved, and what makes Bitcoin revolutionary!"
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
    const saved = localStorage.getItem('smdMoneyModuleCompletedSteps');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });
  const [unlockedTraits, setUnlockedTraits] = useState([]);

  // Navigation functions
  const handleReviewPrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleContinueLearning = () => {
    navigate('/?view=learning');
  };

  const getCurrentSection = () => {
    return {
      index: currentStep,
      name: stepLabels[currentStep],
      total: stepLabels.length
    };
  };

  // Make navigation functions globally available
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
      localStorage.setItem('smdMoneyModuleCompletedSteps', JSON.stringify(Array.from(newCompletedSteps)));
    } catch (error) {
      console.warn('Failed to save progress to localStorage:', error);
    }
    
    setCurrentStep(stepIndex + 1);
  };

  const handleTabClick = (stepIndex) => {
    console.log(`Navigating to step ${stepIndex}: ${stepLabels[stepIndex]}`);
    setCurrentStep(stepIndex);
  };

  const handleUnlockTrait = (trait) => {
    if (!unlockedTraits.includes(trait)) {
      setUnlockedTraits([...unlockedTraits, trait]);
    }
  };

  return (
    <div className="module-container">
      {/* Module Header */}
      <div className="module-header">
        <div className="module-title">
          <div className="module-icon">
            <BitcoinIcon size={48} animated />
          </div>
          {module1.title}
        </div>
        <div className="module-subtitle">
          Discover why money exists, how it evolved, and what makes Bitcoin revolutionary
        </div>
      </div>

      {/* Navigation Steps */}
      <div className="section-card">
        <h3 className="nav-section-title">Learning Path</h3>
        <div className="step-navigation-container">
          <div className="step-navigation-scroll">
          {stepLabels.map((step, index) => (
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

      {/* Module Content */}
      <div className="module-content">
        {currentStep === 0 && <Introduction onComplete={handleStepComplete} />}
        {currentStep === 1 && <BarterWorld onComplete={handleStepComplete} />}
        {currentStep === 2 && <MoneyFailsQuiz onComplete={handleStepComplete} onUnlockTrait={handleUnlockTrait} />}
        {currentStep === 3 && <TraitsScorecard unlockedTraits={unlockedTraits} onComplete={handleStepComplete} />}
        {currentStep === 4 && <EvolutionTimeline onComplete={handleStepComplete} />}
      </div>
    </div>
  );
};

export default MoneyModule;
