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
        title: "What Makes Something Good to Pay With?",
        text: `Money is something we use every day, but have you ever wondered why we use certain things as money and not others? 💭 Imagine trying to buy coffee with mangoes, or pay rent with seashells! Some things work better as money than others.

But money isn't just for spending now — it's also how we store the value of our work. 💪 Imagine working all day and getting paid — you might want to buy something *today*, or save up for something bigger *tomorrow*. For that to work, money has to hold its value.

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
        description: "Let's test your understanding of what makes good money by examining different options.",
        questions: [
          {
            prompt: "Could seashells be money?",
            choices: [
              "Yes—people liked them",
              "No—they were too common",
              "Maybe—if everyone agreed"
            ],
            correct: 1,
            explanation: "Money needs scarcity. Seashells were too easy to collect."
          },
          {
            prompt: "Ice cream?",
            choices: [
              "Yes—everyone loves it",
              "No—it melts",
              "Maybe—with magic fridge"
            ],
            correct: 1,
            explanation: "Money must last—ice cream spoils."
          },
          {
            prompt: "Gold?",
            choices: [
              "Yes—scarce and durable",
              "No—just shiny",
              "Maybe—if governments approve"
            ],
            correct: 0,
            explanation: "Gold works because it's scarce, durable, divisible, and portable."
          },
          {
            prompt: "If your grandmother saved $100 under her mattress in 1990, how much would that buy today?",
            choices: [
              "Exactly the same — money is money",
              "Much less — prices have gone up",
              "Way more — things get cheaper over time"
            ],
            correct: 1,
            explanation: "Inflation makes money lose value over time. Even if the number doesn't change, what you can buy with it shrinks. This is why inflationary money quietly steals purchasing power."
          },
          {
            prompt: "Bank digital number (centralized records)?",
            choices: [
              "Yes—banks protect it",
              "No—can be changed by authorities",
              "Maybe—if locked with code"
            ],
            correct: 1,
            explanation: "Centralized money can be inflated or tracked arbitrarily."
          },
          {
            prompt: "If the government doesn't like your opinion, could they freeze your bank account?",
            choices: [
              "Yes—they've done it before in some countries",
              "No—banks are neutral",
              "Maybe—but only if you're very rich"
            ],
            correct: 0,
            explanation: "Money held in a bank can be frozen or taken. Good money should protect your freedom, not depend on approval."
          },
          {
            prompt: "A digital coin with fixed supply, owned by no one, with verifiable ledger?",
            choices: [
              "Yes—if truly decentralized and limited",
              "No—digital can be copied",
              "Maybe—if backed by government"
            ],
            correct: 0,
            explanation: "That's Bitcoin—scarcity + decentralization + verifiability + unconfiscatability."
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
              onClick={() => handleStepComplete(index)}
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
          What Makes Good Money?
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