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
            prompt: "In ancient Pacific islands, communities used rare seashells as money. When European traders arrived with ships full of shells from other oceans, they were able to buy most of the islands' valuable goods with what felt like 'monopoly money' to them. What does this teach us about money?",
            choices: [
              "Trade increased because there was more money",
              "The money system failed because shells lost their natural scarcity",
              "The islanders should have used different shells"
            ],
            correct: 1,
            explanation: "When Europeans could easily collect shells from other places, they essentially got 'free money' to buy valuable island goods. This shows why money needs natural scarcity - if someone can easily create more of it, they can take real value from others without giving value in return."
          },
          {
            prompt: "The Yap islands used massive stone wheels called 'Rai stones' as money. Even when a stone was lost at sea, everyone kept track of who owned it through community memory. What key lesson about money does this reveal?",
            choices: [
              "Money needs to be physically present to work",
              "Money is really about community agreement on ownership",
              "Lost money should still count as money"
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
            prompt: "The Roman Empire gradually made their coins worse by mixing cheap metals into the silver, and people even shaved off the edges of gold coins to make more coins. How did this affect people's trust in the money?",
            choices: [
              "People didn't notice because the coins looked similar",
              "It helped create more money for trade",
              "People lost trust because the money was being secretly weakened"
            ],
            correct: 2,
            explanation: "When authorities secretly reduce money's quality (like mixing cheap metals into silver or shaving gold), it's a form of theft. People eventually realize their money is being weakened, and they lose trust in the entire system. Good money needs to be consistent and honest."
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
      title: "Why Bitcoin?",
      type: "transition",
      content: {
        title: "The Evolution of Money",
        text: "Throughout history, humans have constantly searched for better forms of money. Each new form seemed perfect at first, but eventually showed its flaws:\n\n- Seashells were great until more were found in other oceans\n- Gold was sound but too heavy to move and easy to confiscate\n- Paper money started as gold receipts but became unlimited printing\n- Digital banking brought convenience but with surveillance and control\n\nEvery form of money had its moment, but each had weaknesses that led people to seek something better. We've seen how money that was once considered 'perfect' failed because it was either:\n- Too easy to produce more (seashells, fiat)\n- Too hard to move (gold, large stones)\n- Too easy to control (digital banking)\n- Too easy to confiscate (gold, cash)\n\nNow let's explore the properties that make truly sound money, and see how Bitcoin finally combines all these qualities in one system."
      }
    },
    {
      title: "Properties of Sound Money",
      type: "interactive-summary",
      content: {
        title: "What Makes Money Sound?",
        description: "Bitcoin is the best form of money humans have ever created because it combines all the essential properties of sound money in one system. Click each property to learn how Bitcoin perfects these qualities in ways that were impossible before.",
        properties: [
          {
            icon: Scale,
            title: "Scarce & Disinflationary",
            description: "Supply is limited and growth rate decreases over time",
            example: "Bitcoin's supply becomes harder to create every 4 years, unlike fiat money which increases unpredictably"
          },
          {
            icon: Zap,
            title: "Portable, Divisible & Uniform",
            description: "Easy to move, split into smaller units, and each piece is identical",
            example: "Bitcoin can be split into 100 million pieces called 'sats' (short for satoshis). Just like every dollar is worth the same as any other dollar, every sat is identical. You can send any amount, from 1 sat (0.00000001 BTC) to millions of bitcoin, anywhere in the world"
          },
          {
            icon: Clock,
            title: "Durable",
            description: "Maintains its integrity over time without degrading or corrupting",
            example: "Unlike physical money that wears out, Bitcoin's digital records are permanent and can be verified by anyone. Every transaction since 2009 is still perfectly intact and readable today"
          },
          {
            icon: Globe,
            title: "Open & Accessible",
            description: "Anyone can use it without permission or approval - rich or poor have equal rights",
            example: "Bitcoin treats everyone equally - no bank approvals, no minimum balances, no discrimination. A farmer in Africa has the same rights as a banker in New York"
          },
          {
            icon: Lock,
            title: "Unconfiscatable & Borderless",
            description: "Your money remains yours no matter where you go",
            example: "Cross any border, travel anywhere in the world, and your bitcoin stays with you - no government or bank can freeze or seize it. Access your money from any country, anytime"
          },
          {
            icon: Scale,
            title: "Rules, Not Rulers",
            description: "Governed by transparent code, not human decisions",
            example: "Bitcoin's rules are fixed and equal for everyone - no special privileges"
          },
          {
            icon: Globe,
            title: "Decentralized & Secure",
            description: "Information about who owns what is stored on thousands of computers, not just one bank's database",
            example: "Traditional banks keep everyone's money info in one place - one mistake or hack can affect millions. Bitcoin is different: imagine a global notebook with thousands of exact copies - no single point of failure, no accidental deletions, no central computer to hack"
          }
        ]
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