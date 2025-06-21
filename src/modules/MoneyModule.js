import React, { useState } from 'react';
import { useProgress } from '../contexts/ProgressContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Coins, CheckCircle, Trophy } from 'lucide-react';
import '../components/ModuleCommon.css';
import MoneyGame from '../components/MoneyGame';

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
        title: "This Is Where The Rabbit Hole Actually Starts",
        text: "Before diving into Bitcoin, you've got to understand the tool it's trying to fix.\n\nImagine a world without money. You'd quickly run into three major problems:\n\n1. Trade Becomes a Nightmare\n\n• You're a web designer, but you're hungry.\n• The baker has bread, but he doesn't need a website.\n• Without a common exchange tool, trade grinds to a halt unless you magically find someone who wants exactly what you offer.\n\n2. Saving Is Unsafe and Unreliable\n\n• You want to save for next year's harvest—or your kid's school.\n• But how do you store value? Grain rots. Livestock gets sick. Tools rust.\n• Without durable, reliable money, your future is at risk.\n\n3. Value Becomes a Guessing Game\n\n• Is one chicken worth ten apples or twenty?\n• What if the apples are bruised? Or the chicken is old?\n• Without a shared unit of value, every trade is a confusing negotiation.\n\nLike all technologies, it's evolved—each form solving some problems while creating others:\n\n🐚 Shells & beads\n   • Easy to carry\n   • Easy to cheat\n\n💎 Gold\n   • Hard to fake\n   • Hard to move\n\n📜 Paper money\n   • Convenient\n   • Easy to print into worthlessness\n\n💻 Digital banking\n   • Fast transfers\n   • Full of middlemen\n\n₿ Bitcoin\n   • The first upgrade that fixes the flaws at the root\n   • No middlemen, can't be printed away, easy to move\n\n• Your Journey\n\nIn this module, you'll break down:\n\n1. What makes money trustworthy\n2. Why every past form had trade-offs\n3. How Bitcoin fixes the flaws built into the system\n4. And why this matters for your freedom\n\nLet's fix your money map. 🚀"
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
              "Trade increased because there was more money.",
              "The money system failed because shells lost their natural scarcity.",
              "The islanders should have used different shells."
            ],
            correct: 1,
            explanation: "When Europeans could easily collect shells from other places, they essentially got 'free money' to buy valuable island goods. This shows why money needs natural scarcity - if someone can easily create more of it, they can take real value from others without giving value in return."
          },
          {
            prompt: "The Yap islands used massive stone wheels called 'Rai stones' as money. Even when a stone was lost at sea, everyone kept track of who owned it through community memory. What key lesson about money does this reveal?",
            choices: [
              "Money needs to be physically present to work.",
              "Money is really about community agreement on ownership.",
              "Lost money should still count as money."
            ],
            correct: 1,
            explanation: "The Rai stones show that money is really about trusted record-keeping. The stones didn't move physically, but ownership changed through community consensus - similar to how Bitcoin's ledger works today."
          },
          {
            prompt: "Gold has been used as money for over 5,000 years across different civilizations that had no contact with each other. Why did such different cultures independently choose gold?",
            choices: [
              "Because it's naturally scarce, durable, and universal.",
              "Because governments forced people to use it.",
              "Because it was the prettiest metal available."
            ],
            correct: 0,
            explanation: "Gold emerged naturally as money across civilizations because it has properties that make it ideal: it's scarce (can't be easily mined), durable (doesn't rust), divisible (can be split), and universal (same everywhere). These are the same properties we need in modern money."
          },
          {
            prompt: "In 1923 Germany, people had to spend their money immediately because prices doubled every few days. Workers were paid twice a day and rushed to buy bread before prices rose again. What does this teach us about money's role as a store of value?",
            choices: [
              "Quick spending stimulates the economy.",
              "Money fails when it can't hold value over time.",
              "Prices should be flexible to help commerce."
            ],
            correct: 1,
            explanation: "The German hyperinflation shows that money must be a reliable store of value. When money loses value too quickly, it fails at its core purpose - helping people trade and save across time. This is why inflationary money eventually breaks society's trust."
          },
          {
            prompt: "In 2020, Canadian truckers protesting COVID policies had their bank accounts frozen. If they had used a decentralized currency like Bitcoin instead, what would have been different?",
            choices: [
              "Nothing - all money can be controlled.",
              "Their money would have remained accessible.",
              "The protest would have been illegal."
            ],
            correct: 1,
            explanation: "This recent event shows why decentralization matters. When money is controlled by central authorities, it can be used as a tool of control. True money should work regardless of whether someone approves of how you're using it."
          },
          {
            prompt: "The Roman Empire gradually made their coins worse by mixing cheap metals into the silver, and people even shaved off the edges of gold coins to make more coins. How did this affect people's trust in the money?",
            choices: [
              "People didn't notice because the coins looked similar.",
              "It helped create more money for trade.",
              "People lost trust because the money was being secretly weakened."
            ],
            correct: 2,
            explanation: "When authorities secretly reduce money's quality (like mixing cheap metals into silver or shaving gold), it's a form of theft. People eventually realize their money is being weakened, and they lose trust in the entire system. Good money needs to be consistent and honest."
          },
          {
            prompt: "Bitcoin is the first money in history that can be sent instantly worldwide while being impossible to counterfeit or confiscate. How does this change what's possible with money?",
            choices: [
              "It combines gold's scarcity with digital convenience.",
              "It's just another payment app like PayPal.",
              "It's only useful for small transactions."
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
        text: "Throughout history, humans have constantly searched for better forms of money. Each new form seemed perfect at first, but eventually showed its flaws:\n\n- Seashells were great until more were found in other oceans.\n- Gold was sound but too heavy to move and easy to confiscate.\n- Paper money started as gold receipts but became unlimited printing.\n- Digital banking brought convenience but with surveillance and control.\n\nEvery form of money had its moment, but each had weaknesses that led people to seek something better. We've seen how money that was once considered 'perfect' failed because it was either:\n- Too easy to produce more (seashells, fiat).\n- Too hard to move (gold, large stones).\n- Too easy to control (digital banking).\n- Too easy to confiscate (gold, cash).\n\nNow let's explore the properties that make truly sound money, and see how Bitcoin finally combines all these qualities in one system."
      }
    },
    {
      title: "Properties of Sound Money",
      type: "money-game",
      content: {
        title: "What Makes Money Sound?",
        description: "Bitcoin is the best form of money humans have ever created because it combines all the essential properties of sound money in one system. Let's explore how Bitcoin perfects these qualities in ways that were impossible before."
      }
    }
  ];

  const handleStepComplete = (index) => {
    setCompletedSteps(prev => new Set(prev).add(index));
    if (index === steps.length - 1) {
      completeModule('money');
    }
    setCurrentStep(index + 1);
  };

  const renderStep = (step, index) => {
    if (!step || !step.type) {
      console.error('Invalid step data:', step);
      return null;
    }

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

      case 'money-game':
        return (
          <MoneyGame
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
        console.error('Unknown step type:', step.type);
        return <div>Unknown step type</div>;
    }
  };

  return (
    <div className="module-container">
      <div className="module-header">
        <h1 className="module-title">
          <Coins className="module-icon" />
          If You Don't Define Money, It Will Define You
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
    if (showExplanation) return; // Prevent multiple answers
    setAnswers({ ...answers, [currentQuestion]: answer });
    setShowExplanation(true);
  };

  const handleNext = () => {
    setShowExplanation(false);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Only complete if all questions have been answered
      if (Object.keys(answers).length === questions.length) {
        onComplete();
      }
    }
  };

  const question = questions[currentQuestion];
  if (!question) return null;

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
                answers[currentQuestion] === index ? 'selected' : ''
              } ${
                showExplanation
                  ? index === question.correct
                    ? 'correct'
                    : answers[currentQuestion] === index
                    ? 'incorrect'
                    : ''
                  : ''
              }`}
              onClick={() => handleAnswer(index)}
              disabled={showExplanation}
            >
              {choice}
              {showExplanation && index === answers[currentQuestion] && (
                <span className="answer-indicator">
                  {index === question.correct ? ' ✅' : ' ❌'}
                </span>
              )}
            </button>
          ))}
        </div>

        {showExplanation && (
          <div className={`explanation-card ${answers[currentQuestion] === question.correct ? 'correct' : 'incorrect'}`}>
            <p className="feedback-text">
              {answers[currentQuestion] === question.correct 
                ? '✅ Correct! Well done!' 
                : '❌ Not quite right. Here\'s why:'}
            </p>
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

export default MoneyModule; 