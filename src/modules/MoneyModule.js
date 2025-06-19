import React, { useState } from 'react';
import { useProgress } from '../contexts/ProgressContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Coins, CheckCircle, Trophy, Scale, Lock, Clock, Globe, Zap } from 'lucide-react';
import '../components/ModuleCommon.css';

const MoneyModule = () => {
  const { completeModule, isModuleCompleted } = useProgress();
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(new Set());

  const steps = [
    {
      title: "Introduction",
      type: "intro",
      content: {
        title: "Who made the Rules?",
        text: `Money is something we use every day, but have you ever wondered why we use certain things as money and not others? 💭 Imagine trying to buy coffee with mangoes, or pay rent with seashells! Some things work better as money than others.

But money isn't just for spending now — it's also how we store the value of our work. 💪 Imagine working all day and getting paid — you might want to buy something today, or save up for something bigger tomorrow. For that to work, money has to hold its value.

In this module, we'll:
    - Explore what qualities make good money
    - Test different things as money
    - Discover why some money lasts while others fail
    - See how Bitcoin fits into the story of money

Get ready to challenge your assumptions about what makes good money!`
      }
    },
    {
      title: "Money Quiz",
      type: "interactive-quiz",
      content: {
        title: "Judge These as Money",
        description: "Throughout history, societies have experimented with different forms of money. Let's explore what worked, what failed, and why.",
        questions: [
          {
            prompt: "In ancient Pacific islands, communities used seashells as money, with rare shells being more valuable. But when European traders arrived with ships full of shells from other oceans, what happened to the shell-money system?",
            choices: [
              "It got stronger because more shells meant more trade",
              "It collapsed because shells lost their scarcity",
              "It adapted by using only local shells"
            ],
            correct: 1,
            explanation: "When Europeans flooded the market with shells, the money system collapsed. This teaches us that money needs natural scarcity - if something can be easily found or copied, it can't maintain value as money."
          },
          {
            prompt: "The Yap islands used massive stone wheels called 'Rai stones' as money, some too heavy to move. They tracked ownership through oral history. What does this teach us about the physical nature of money?",
            choices: [
              "Money must be easy to carry",
              "The physical form doesn't matter if everyone agrees on ownership",
              "Heavier money is more valuable"
            ],
            correct: 1,
            explanation: "The Rai stones show that money is really about trusted record-keeping. The stones didn't move physically, but ownership changed through community consensus - similar to how Bitcoin's ledger works today."
          },
          {
            prompt: "Gold has been used as money for over 5,000 years across different civilizations that had no contact with each other. Why did such different cultures independently choose gold?",
            choices: [
              "Because it's naturally scarce, durable, and universal",
              "Because governments forced people to use it",
              "Because it was the prettiest metal available"
            ],
            correct: 0,
            explanation: "Gold emerged naturally as money across civilizations because it has properties that make it ideal: it's scarce (can't be easily mined), durable (doesn't rust), divisible (can be split), and universal (same everywhere). These are the same properties we need in modern money."
          },
          {
            prompt: "In 1923 Germany, people had to spend their money immediately because prices doubled every few days. Workers were paid twice a day and rushed to buy bread before prices rose again. What does this teach us about money's role as a store of value?",
            choices: [
              "Quick spending stimulates the economy",
              "Money fails when it can't hold value over time",
              "Prices should be flexible to help commerce"
            ],
            correct: 1,
            explanation: "The German hyperinflation shows that money must be a reliable store of value. When money loses value too quickly, it fails at its core purpose - helping people trade and save across time. This is why inflationary money eventually breaks society's trust."
          },
          {
            prompt: "In 2020, Canadian truckers protesting COVID policies had their bank accounts frozen. If they had used a decentralized currency like Bitcoin instead, what would have been different?",
            choices: [
              "Nothing - all money can be controlled",
              "Their money would have remained accessible",
              "The protest would have been illegal"
            ],
            correct: 1,
            explanation: "This recent event shows why decentralization matters. When money is controlled by central authorities, it can be used as a tool of control. True money should work regardless of whether someone approves of how you're using it."
          },
          {
            prompt: "The Roman Empire gradually debased their silver coins by mixing in cheaper metals, leading to economic collapse. What principle of sound money did they violate?",
            choices: [
              "Money should be easy to produce",
              "Money should be beautiful to look at",
              "Money should have consistent, unchangeable properties"
            ],
            correct: 2,
            explanation: "The Roman debasement shows that money must have unchangeable properties. When authorities can secretly alter money's fundamental properties (like its scarcity), they will eventually yield to the temptation, destroying the money's reliability."
          },
          {
            prompt: "Bitcoin is the first money in history that can be sent instantly worldwide while being impossible to counterfeit or confiscate. How does this change what's possible with money?",
            choices: [
              "It combines gold's scarcity with digital convenience",
              "It's just another payment app like PayPal",
              "It's only useful for small transactions"
            ],
            correct: 0,
            explanation: "Bitcoin represents a breakthrough in monetary technology - it combines the scarcity of gold with the convenience of digital transfer, while adding new properties like mathematical certainty and resistance to confiscation. This makes it uniquely suited for an interconnected digital world."
          }
        ]
      }
    },
    {
      title: "Properties of Sound Money",
      type: "interactive-summary",
      content: {
        title: "What Makes Money Sound?",
        description: "Click each property to learn more about what makes money reliable and useful.",
        properties: [
          {
            icon: Scale,
            title: "Scarce",
            description: "Can't be created on the fly",
            example: "Like gold or Bitcoin's fixed supply"
          },
          {
            icon: Clock,
            title: "Durable",
            description: "Doesn't perish or break",
            example: "Digital data and gold last forever"
          },
          {
            icon: Zap,
            title: "Portable & Divisible",
            description: "Works for small or big trades",
            example: "Bitcoin can be split into 100 million pieces"
          },
          {
            icon: CheckCircle,
            title: "Uniform",
            description: "Each unit is the same as any other",
            example: "Every bitcoin is identical"
          },
          {
            icon: Globe,
            title: "Decentralized & Secure",
            description: "No single party can change records",
            example: "Bitcoin's network is run by thousands"
          },
          {
            icon: Lock,
            title: "Unconfiscatable",
            description: "No one can take it without permission",
            example: "Only you control your Bitcoin keys"
          }
        ]
      }
    },
    {
      title: "Why Bitcoin?",
      type: "transition",
      content: {
        title: "Why Bitcoin?",
        text: "You've mapped out what makes money work. Now let's see how Bitcoin matches those qualities—and why it's built for the digital age."
      }
    }
  ];

  const handleStepComplete = (stepIndex) => {
    const newCompleted = new Set(completedSteps);
    newCompleted.add(stepIndex);
    setCompletedSteps(newCompleted);
    
    // Advance to the next step
    setCurrentStep(currentStep + 1);
    
    if (newCompleted.size === steps.length) {
      completeModule('money');
    }
  };

  const renderStep = (step, index) => {
    switch (step.type) {
      case 'intro':
        return (
          <div className="step-content intro-step">
            <div className="step-icon">
              <Coins size={48} />
            </div>
            <h2>{step.content.title}</h2>
            <p className="intro-text">{step.content.text}</p>
            <button 
              className="continue-button"
              onClick={() => {
                handleStepComplete(index);
                setCurrentStep(index + 1);
              }}
            >
              Start Learning
            </button>
          </div>
        );

      case 'interactive-quiz':
        return (
          <MoneyQuiz
            title={step.content.title}
            description={step.content.description}
            questions={step.content.questions}
            onComplete={() => handleStepComplete(index)}
          />
        );

      case 'interactive-summary':
        return (
          <PropertiesSummary
            title={step.content.title}
            description={step.content.description}
            properties={step.content.properties}
            onComplete={() => handleStepComplete(index)}
          />
        );

      case 'transition':
        return (
          <div className="step-content transition-step">
            <div className="step-icon">
              <Coins size={48} />
            </div>
            <h2>{step.content.title}</h2>
            <p className="transition-text">{step.content.text}</p>
            <button 
              className="continue-button"
              onClick={() => handleStepComplete(index)}
            >
              Continue to Next Module
            </button>
          </div>
        );

      default:
        return <div>Unknown step type</div>;
    }
  };

  return (
    <div className="module-container">
      <div className="module-header">
        <h1 className="module-title">
          <Coins className="module-icon" />
          Who made the Rules?
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
            style={{ width: `${(completedSteps.size / steps.length) * 100}%` }}
          />
        </div>
        <span className="progress-text">
          {completedSteps.size} / {steps.length} steps completed
        </span>
      </div>

      <div className="module-steps">
        <div className="steps-navigation">
          {steps.map((step, index) => (
            <button
              key={index}
              className={`step-nav-button ${currentStep === index ? 'active' : ''} ${completedSteps.has(index) ? 'completed' : ''}`}
              onClick={() => setCurrentStep(index)}
            >
              {completedSteps.has(index) && <CheckCircle size={16} />}
              {step.title}
            </button>
          ))}
        </div>

        <div className="step-content-container">
          {renderStep(steps[currentStep], currentStep)}
        </div>
      </div>
    </div>
  );
};

// Quiz Component
const MoneyQuiz = ({ title, description, questions, onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showExplanation, setShowExplanation] = useState(false);

  const handleAnswer = (answer) => {
    setAnswers({ ...answers, [currentQuestion]: answer });
    setShowExplanation(true);
  };

  const handleNext = () => {
    setShowExplanation(false);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      onComplete();
    }
  };

  const question = questions[currentQuestion];

  return (
    <div className="quiz-container">
      <h2>{title}</h2>
      <p className="quiz-description">{description}</p>

      <div className="question-card">
        <h3 className="question-prompt">{question.prompt}</h3>
        <div className="choices-container">
          {question.choices.map((choice, index) => (
            <button
              key={index}
              className={`choice-button ${
                answers[currentQuestion] === index
                  ? index === question.correct
                    ? 'correct'
                    : 'incorrect'
                  : ''
              }`}
              onClick={() => handleAnswer(index)}
              disabled={showExplanation}
            >
              {choice}
            </button>
          ))}
        </div>

        {showExplanation && (
          <div className="explanation-card">
            <p className="explanation-text">{question.explanation}</p>
            <button className="next-button" onClick={handleNext}>
              {currentQuestion < questions.length - 1 ? 'Next Question' : 'Complete Quiz'}
            </button>
          </div>
        )}

        <div className="quiz-progress">
          Question {currentQuestion + 1} of {questions.length}
        </div>
      </div>
    </div>
  );
};

// Properties Summary Component
const PropertiesSummary = ({ title, description, properties, onComplete }) => {
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [viewedProperties, setViewedProperties] = useState(new Set());

  const handlePropertyClick = (index) => {
    setSelectedProperty(index);
    setViewedProperties(prev => new Set(prev).add(index));
  };

  const allPropertiesViewed = viewedProperties.size === properties.length;

  return (
    <div className="properties-summary">
      <h2>{title}</h2>
      <p className="summary-description">{description}</p>

      <div className="properties-grid">
        {properties.map((prop, index) => {
          const IconComponent = prop.icon;
          return (
            <div
              key={index}
              className={`property-card ${selectedProperty === index ? 'selected' : ''} ${
                viewedProperties.has(index) ? 'viewed' : ''
              }`}
              onClick={() => handlePropertyClick(index)}
            >
              <IconComponent size={24} />
              <h3>{prop.title}</h3>
              {selectedProperty === index && (
                <div className="property-details">
                  <p>{prop.description}</p>
                  <p className="property-example">{prop.example}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {allPropertiesViewed && (
        <button className="continue-button" onClick={onComplete}>
          Continue
        </button>
      )}
    </div>
  );
};

export default MoneyModule; 