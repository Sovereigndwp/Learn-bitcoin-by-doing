import React, { useState } from 'react';
import { useProgress } from '../contexts/ProgressContext';
import { Coins, Trophy, CheckCircle } from 'lucide-react';
import '../components/ModuleCommon.css';
import MoneyGame from '../components/MoneyGame';
import brokenTrade from '../assets/images/broken-trade.svg';
import rottingSavings from '../assets/images/rotting-savings.svg';
import confusedValue from '../assets/images/confused-value.svg';

const MoneyModule = () => {
  const { completeModule, isModuleCompleted } = useProgress();
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(new Set());

  const steps = [
    {
      title: "Introduction",
      type: "intro",
      content: {
        title: "💸 What Happens Without Money?",
        text: 
`Before we fix the money, maybe ask: Why did we even invent this stuff in the first place?

💭 Imagine This:
You wake up in a world with no money. Not bad money. Zero. Zilch. Nada.
Welcome to the barter apocalypse.

🔄 Problem #1: Trade Stops
You're a fantastic baker. I'm a plumber. I want bread.
But guess what? Your pipes are working just fine.

Now you're hungry. I'm hungry.
We both just sit there, admiring your moldy sourdough and my shiny wrench.
Without money, trade becomes a Tinder date from hell: Sorry, no match.

🛑 Problem #2: You Can't Save
You finally win at life and grow more food than you can eat.
You try to save it.

Spoiler alert:
It rots. It molds. Rats throw a party in it.
You raise a goat instead? Congrats. It got sick and died.
Money solves this by letting you store your effort in something that doesn't decay, stink, or scream.

🎯 Problem #3: No Way to Compare Value
I offer you a chicken. You offer me... six apples?
Is that fair? Are the apples organic? Is the chicken passive-aggressive?
Also, I don't want apples. I need socks. And maybe a dentist.
Without money, everything's a confusing mess of 'meh.'
Money gives us a shared scoreboard.

😬 Bottom Line:
Without money, you lose:
• Trade (no one wants your goat)
• Savings (unless you're cool with rat loot)
• Value Comparison (is a potato worth a shoe?)

And with bad money, those same things die—just slower.
Trust fades. Prices lie. And the system quietly eats itself from the inside.

💡 Bonus Challenge:
Look around your room. Try to trade three things you own without using money as a reference. Watch your brain short-circuit!`
      }
    },
    {
      title: "Perfect... Until it Wasn't",
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
      title: "(Optional Deep Dive)",
      type: "external-resource",
      content: {
        title: "Interactive Timeline: Money's Evolution",
        description: "Explore an interactive timeline showing how money evolved from barter to Bitcoin, with key historical events and technological breakthroughs that shaped our understanding of value exchange.",
        link: "https://layer-d.my.canva.site/interactive-timeline-of-money-evolution-from-barter-to-bitcoin"
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
            <div className="content-text">
              <pre>{step.content.text}</pre>
            </div>
          </div>
        );

      case 'transition':
        return (
          <div className="step-content transition-step">
            <h2>{step.content.title}</h2>
            <div className="content-text">
              <pre>{step.content.text}</pre>
            </div>
            <button onClick={() => handleStepComplete(index)}>Continue</button>
          </div>
        );

      case 'money-game':
        return (
          <div className="step-content game-step">
            <h2>{step.content.title}</h2>
            <p>{step.content.description}</p>
            <MoneyGame onComplete={() => handleStepComplete(index)} />
          </div>
        );

      case 'interactive-quiz':
        return (
          <div className="step-content quiz-step">
            <MoneyQuiz
              title={step.content.title}
              description={step.content.description}
              questions={step.content.questions}
              onComplete={() => handleStepComplete(index)}
            />
          </div>
        );

      case 'external-resource':
        return (
          <div className="step-content resource-step">
            <h2>{step.content.title}</h2>
            <p>{step.content.description}</p>
            <a href={step.content.link} target="_blank" rel="noopener noreferrer">
              Visit Interactive Timeline
            </a>
            <button onClick={() => handleStepComplete(index)}>Continue</button>
          </div>
        );

      default:
        console.error('Unknown step type:', step.type);
        return null;
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
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswer = (answerIndex) => {
    setSelectedAnswer(answerIndex);
    if (answerIndex === questions[currentQuestion].correct) {
      setScore(score + 1);
    }
    setShowExplanation(true);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      onComplete(score);
    }
  };

  return (
    <div className="quiz-container">
      <h2>{title}</h2>
      <p>{description}</p>
      
      <div className="question-container">
        <h3>Question {currentQuestion + 1} of {questions.length}</h3>
        <p>{questions[currentQuestion].prompt}</p>
        
        <div className="choices">
          {questions[currentQuestion].choices.map((choice, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              disabled={showExplanation}
              className={`choice-button ${
                showExplanation
                  ? index === questions[currentQuestion].correct
                    ? 'correct'
                    : selectedAnswer === index
                    ? 'incorrect'
                    : ''
                  : ''
              }`}
            >
              {choice}
            </button>
          ))}
        </div>
        
        {showExplanation && (
          <div className="explanation">
            <p>{questions[currentQuestion].explanation}</p>
            <button onClick={handleNext}>
              {currentQuestion < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MoneyModule; 