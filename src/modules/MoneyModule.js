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
        text: "Money is something we use every day, but have you ever wondered why we use certain things as money and not others? 💭\n\nImagine trying to buy coffee with mangoes, or pay rent with seashells! Some things work better as money than others.\n\nIn this module, we'll:\n- Explore what qualities make good money\n- Test different things as money\n- Discover why some money lasts while other forms fail\n- See how Bitcoin fits into the story of money\n\nGet ready to challenge your assumptions about what makes good money! 🎯"
      }
    },
    {
      title: "Money Quiz",
      type: "interactive-quiz",
      content: {
        title: "Test Your Money Knowledge",
        description: "Let's examine different things people have used as money. For each one, think about whether it would work well as money and why.",
        questions: [
          {
            prompt: "Could seashells work as money today?",
            choices: [
              "Yes—people find them beautiful",
              "No—they're too easy to find",
              "Maybe—if everyone agreed to use them"
            ],
            correct: 1,
            explanation: "Money needs to be scarce. Seashells might have worked in the past, but they're too easy to find. Good money can't be created easily—otherwise, its value would constantly decrease as more is found or made."
          },
          {
            prompt: "Would ice cream make good money?",
            choices: [
              "Yes—everyone loves it",
              "No—it melts and spoils",
              "Maybe—if we had special storage"
            ],
            correct: 1,
            explanation: "Money needs to be durable. Ice cream melts and spoils, making it impossible to save or transport. Good money must last through time and maintain its properties."
          },
          {
            prompt: "Why did gold work as money for thousands of years?",
            choices: [
              "Because it's scarce and doesn't degrade",
              "Because it's just pretty and shiny",
              "Because governments chose it"
            ],
            correct: 0,
            explanation: "Gold became money naturally because it's: scarce (hard to mine), durable (doesn't rust), divisible (can be split), portable (high value in small size), and uniform (pure gold is the same everywhere)."
          },
          {
            prompt: "If your grandmother saved $100 in 1990, what would it buy today?",
            choices: [
              "The same amount—money is money",
              "Much less—prices have increased",
              "More—things get cheaper over time"
            ],
            correct: 1,
            explanation: "This is inflation in action. The $100 bill is the same paper, but it buys much less today. Why? Because central banks can create more dollars anytime, making each existing dollar worth less. Good money should hold its value over time."
          },
          {
            prompt: "Are digital bank balances good money?",
            choices: [
              "Yes—banks keep them safe",
              "No—they can be frozen or changed",
              "Maybe—if protected by good passwords"
            ],
            correct: 1,
            explanation: "Digital bank balances can be: frozen by authorities, changed by bank errors, lost in bank failures, or devalued by inflation. Good money should be under your control, not someone else's."
          },
          {
            prompt: "Could a government freeze your bank account if they disagree with your views?",
            choices: [
              "Yes—it's happened in several countries",
              "No—banks are independent",
              "Only if you break laws"
            ],
            correct: 0,
            explanation: "Recent history shows governments can and do freeze accounts for political reasons. In 2022, peaceful protesters had accounts frozen in Canada. Good money should work without requiring anyone's permission."
          },
          {
            prompt: "What about a digital coin that no one controls, with a fixed supply?",
            choices: [
              "Perfect money—if truly decentralized",
              "Bad money—digital things can be copied",
              "Maybe—if governments approve it"
            ],
            correct: 0,
            explanation: "This describes Bitcoin: it combines the scarcity of gold with digital convenience. No one can create more than planned, freeze accounts, or change the rules without everyone agreeing. It's the first money that's both digital and truly under your control."
          }
        ]
      }
    },
    {
      title: "Properties of Sound Money",
      type: "interactive-summary",
      content: {
        title: "What Makes Money 'Sound'?",
        description: "Let's explore the key properties that make money reliable and useful. Click each property to learn more.",
        properties: [
          {
            icon: Scale,
            title: "Scarce",
            description: "Cannot be created easily or arbitrarily. The supply is limited and predictable.",
            example: "Like gold—hard to mine, unlike paper money which can be printed endlessly."
          },
          {
            icon: Clock,
            title: "Durable",
            description: "Maintains its properties over time without degrading.",
            example: "Gold doesn't rust, while paper money wears out and food spoils."
          },
          {
            icon: Zap,
            title: "Portable & Divisible",
            description: "Easy to transport and can be split into smaller units.",
            example: "Digital bitcoin can be sent globally and divided into 100 million pieces."
          },
          {
            icon: CheckCircle,
            title: "Uniform",
            description: "Every unit is identical in quality and properties.",
            example: "One bitcoin is exactly the same as another, like pure gold."
          },
          {
            icon: Globe,
            title: "Decentralized",
            description: "No single entity controls or can manipulate it.",
            example: "Bitcoin's rules are enforced by thousands of independent computers."
          },
          {
            icon: Lock,
            title: "Unconfiscatable",
            description: "Cannot be taken without the owner's permission.",
            example: "Bitcoin requires your private key—like a password only you know."
          }
        ]
      }
    },
    {
      title: "Why Bitcoin?",
      type: "transition",
      content: {
        title: "The Evolution of Money",
        text: "We've seen what makes good money. Now, let's explore how Bitcoin takes these ancient principles and adapts them for the digital age. 🚀\n\nBitcoin combines:\n- The scarcity of gold\n- The convenience of digital payments\n- The security of mathematics\n- The freedom of cash\n\nIn the next modules, we'll discover exactly how Bitcoin achieves this through clever use of numbers, codes, and network rules. Ready to dive in? 💡"
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