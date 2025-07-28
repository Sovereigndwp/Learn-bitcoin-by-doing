import React, { useState, useEffect } from 'react';
import PrevNext from '../../../components/PrevNext';

// Combined data from BarterProblem and MoneyFunctions
const barterScenarios = [
  {
    id: 1,
    title: "🍞 The Baker's Problem",
    situation: "You're a baker. You need shoes, but the shoemaker doesn't want bread.",
    trader: "Shoemaker says: 'I already have bread. I need a haircut.'",
    choice: "What do you do?",
    options: [
      { 
        id: 1, 
        text: 'Give up and go home', 
        result: 'reject',
        problem: 'Hard to Match'
      },
      { 
        id: 2, 
        text: 'Find someone who wants bread AND can give the shoemaker a haircut', 
        result: 'chain',
        problem: 'Takes Too Long'
      },
      { 
        id: 3, 
        text: 'Search for other shoemakers', 
        result: 'search',
        problem: 'Bad Timing'
      }
    ]
  },
  {
    id: 2,
    title: "🏠 The House Builder's Challenge",
    situation: "You want to build a house. You need: bricks, wood, nails, and tools. But everyone wants different things from you.",
    trader: "Brick maker wants fish. Wood seller wants clothes. Nail maker wants meat. Tool maker wants grain.",
    choice: "This is getting complicated...",
    options: [
      { 
        id: 1, 
        text: 'Try to coordinate all these trades at once', 
        result: 'chaos',
        problem: 'Bad Timing'
      },
      { 
        id: 2, 
        text: 'Map out all the trades you need to make', 
        result: 'insight',
        problem: 'Takes Too Long'
      },
      { 
        id: 3, 
        text: 'Build a smaller house', 
        result: 'quit',
        problem: 'No Storage'
      }
    ]
  },
  {
    id: 3,
    title: "⏰ The Timing Problem",
    situation: "You need to make 4 trades in a row, but the timing has to be perfect.",
    trader: "The brick maker says: 'I already traded my bricks yesterday. Come back next month.'",
    choice: "Everything has to happen at exactly the right time...",
    options: [
      { 
        id: 1, 
        text: 'Start all over again', 
        result: 'chaos',
        problem: 'Bad Timing'
      },
      { 
        id: 2, 
        text: 'Realize this system has serious problems', 
        result: 'epiphany',
        problem: 'No Common Measure'
      },
      { 
        id: 3, 
        text: 'Think about what everyone would accept', 
        result: 'solution',
        problem: 'Need Better Solution'
      }
    ]
  }
];

const moneyScenarios = [
  {
    id: 1,
    title: "🛒 Shopping at the Market",
    description: "You want to buy apples. The seller wants $3 per pound.",
    question: "What job is money doing here?",
    options: [
      { value: 1, label: 'Helping you trade - making the exchange possible' },
      { value: 2, label: 'Storing your wealth for later' },
      { value: 3, label: 'Measuring value - telling you how much things cost' }
    ],
    correctAnswer: 1,
    moneyFunction: 'Medium of Exchange',
    explanation: "Money's first job is making trades possible. Everyone accepts it, so you don't need to find someone who wants exactly what you have."
  },
  {
    id: 2,
    title: "💰 Saving for a Vacation",
    description: "You put $200 in your savings account each month for a vacation next year.",
    question: "What job is money doing here?",
    options: [
      { value: 1, label: 'Helping you make trades right now' },
      { value: 2, label: 'Keeping your wealth safe until you need it' },
      { value: 3, label: 'Measuring how much things cost' }
    ],
    correctAnswer: 2,
    moneyFunction: 'Store of Value',
    explanation: "Money's second job is holding onto value over time. You can save it today and spend it later."
  },
  {
    id: 3,
    title: "🏠 Comparing House Prices",
    description: "You're looking at houses. One costs $300,000, another costs $450,000.",
    question: "What job is money doing here?",
    options: [
      { value: 1, label: 'Making the trade possible' },
      { value: 2, label: 'Storing value for you' },
      { value: 3, label: 'Giving you a way to compare prices' }
    ],
    correctAnswer: 3,
    moneyFunction: 'Unit of Account',
    explanation: "Money's third job is measuring value. It gives everyone the same ruler to compare prices."
  }
];

const getOutcomeText = (result) => {
  const outcomes = {
    reject: "❌ Trade fails because you both don't want what the other has.",
    chain: "🔗 You realize you need to find multiple people and coordinate complex trades.",
    search: "🔍 You spend hours looking but most people don't want bread.",
    quit: "⏸️ You give up because it's too complicated.",
    insight: "💡 You see that coordinating multiple trades gets extremely difficult.",
    chaos: "🌪️ When one person isn't ready, the whole chain falls apart.",
    epiphany: "⚡ You realize the problem isn't the people - it's the system itself.",
    solution: "🧠 What if there was something everyone would accept? That's the idea behind money."
  };
  return outcomes[result] || "You tried something...";
};

export default function BarterToMoney() {
  const [currentSection, setCurrentSection] = useState('barter'); // 'barter' or 'money'
  const [barterScenario, setBarterScenario] = useState(0);
  const [moneyScenario, setMoneyScenario] = useState(0);
  const [playerChoice, setPlayerChoice] = useState(null);
  const [showOutcome, setShowOutcome] = useState(false);
  const [discoveredProblems, setDiscoveredProblems] = useState(new Set());
  const [answers, setAnswers] = useState({});
  const [feedback, setFeedback] = useState({});

  // Handle barter section choices
  const handleBarterChoice = (optionId) => {
    setPlayerChoice(optionId);
    setShowOutcome(true);
    
    const selectedOption = barterScenarios[barterScenario].options.find(opt => opt.id === optionId);
    if (selectedOption?.problem) {
      setDiscoveredProblems(prev => new Set([...prev, selectedOption.problem]));
    }
  };

  // Handle money section answers
  const handleMoneyAnswer = (questionId, value) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));

    const scenario = moneyScenarios.find(s => s.id === questionId);
    const isCorrect = value === scenario.correctAnswer;
    
    setFeedback(prev => ({
      ...prev,
      [questionId]: {
        isCorrect,
        explanation: scenario.explanation,
        moneyFunction: scenario.moneyFunction
      }
    }));

    // Auto-advance after showing feedback
    setTimeout(() => {
      if (moneyScenario < moneyScenarios.length - 1) {
        setMoneyScenario(moneyScenario + 1);
      }
    }, 3000);
  };

  const handleNext = () => {
    if (currentSection === 'barter') {
      if (barterScenario < barterScenarios.length - 1) {
        setBarterScenario(prev => prev + 1);
        setPlayerChoice(null);
        setShowOutcome(false);
      } else {
        // Move to money section
        setCurrentSection('money');
      }
    }
  };

  const handlePrevious = () => {
    if (currentSection === 'barter' && barterScenario > 0) {
      setBarterScenario(prev => prev - 1);
      setPlayerChoice(null);
      setShowOutcome(false);
    } else if (currentSection === 'money' && moneyScenario === 0) {
      // Go back to barter section
      setCurrentSection('barter');
      setBarterScenario(barterScenarios.length - 1);
    }
  };

  const currentBarterData = barterScenarios[barterScenario];
  const currentMoneyData = moneyScenarios[moneyScenario];
  const allMoneyAnswered = Object.keys(feedback).length === moneyScenarios.length;

  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      <div className="container mx-auto px-4 py-8 flex-grow">
        <h1 className="text-4xl font-bold mb-4 text-center">
          From Barter to Money
        </h1>
        <p className="text-lg text-orange-400 text-center mb-8">
          Discover the problems with barter trading—and how money solved them.
        </p>

        {currentSection === 'barter' && (
          <div className="story-section bg-white text-black rounded-xl p-8 shadow-lg mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-orange-600">
              Part 1: The Barter Problem
            </h2>
            <p className="mb-6">
              Before money existed, people had to trade directly. Let's see what problems this created...
            </p>

            <div className="flex items-center mb-4">
              <div className="text-4xl mr-4">
                {currentBarterData.title.split(' ')[0]}
              </div>
              <h3 className="text-xl font-semibold">{currentBarterData.title}</h3>
            </div>

            <div className="mb-4">
              <p><strong>Situation:</strong> {currentBarterData.situation}</p>
              <p><strong>What happens:</strong> {currentBarterData.trader}</p>
            </div>

            <p className="mb-4"><strong>{currentBarterData.choice}</strong></p>

            {!showOutcome ? (
              <div className="space-y-3 mb-6">
                {currentBarterData.options.map(option => (
                  <button
                    key={option.id}
                    onClick={() => handleBarterChoice(option.id)}
                    className="block w-full text-left p-3 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                  >
                    {option.text}
                  </button>
                ))}
              </div>
            ) : (
              <div className="mb-6">
                <div className="bg-orange-50 border-l-4 border-orange-500 p-4 mb-4">
                  <h4 className="font-semibold text-orange-800">
                    Problem Discovered: {barterScenarios[barterScenario].options.find(o => o.id === playerChoice)?.problem}
                  </h4>
                </div>
                <p className="mb-4">
                  <strong>You chose:</strong> {barterScenarios[barterScenario].options.find(o => o.id === playerChoice)?.text}
                </p>
                <div className="bg-gray-100 p-4 rounded">
                  <p>{getOutcomeText(barterScenarios[barterScenario].options.find(o => o.id === playerChoice)?.result)}</p>
                </div>
              </div>
            )}

            <div className="flex justify-between items-center">
              <button
                onClick={handlePrevious}
                disabled={barterScenario === 0}
                className="text-black bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 disabled:opacity-50"
              >
                ← Back
              </button>
              
              <div className="text-sm text-gray-600">
                Scenario {barterScenario + 1} of {barterScenarios.length} • Problems Found: {discoveredProblems.size}
              </div>

              {(showOutcome || barterScenario === barterScenarios.length - 1) && (
                <button
                  onClick={handleNext}
                  className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
                >
                  {barterScenario === barterScenarios.length - 1 ? 'See the Solution →' : 'Continue →'}
                </button>
              )}
            </div>
          </div>
        )}

        {currentSection === 'money' && (
          <div className="story-section bg-white text-black rounded-xl p-8 shadow-lg mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-orange-600">
              Part 2: Money's Three Jobs
            </h2>
            <p className="mb-6">
              Money solved the barter problems. Let's discover its three main functions...
            </p>

            {/* Coin animation */}
            <div className="flex justify-center mb-6">
              <img
                src="/assets/coin-spin.gif"
                alt="Spinning coin"
                className="w-16 h-16 animate-spin"
              />
            </div>

            <div className="flex items-center mb-4">
              <div className="text-4xl mr-4">
                {currentMoneyData.title.split(' ')[0]}
              </div>
              <h3 className="text-xl font-semibold">{currentMoneyData.title}</h3>
            </div>

            <p className="mb-4">{currentMoneyData.description}</p>
            <p className="mb-4"><strong>{currentMoneyData.question}</strong></p>

            {!feedback[currentMoneyData.id] && (
              <div className="space-y-3 mb-6">
                {currentMoneyData.options.map(option => (
                  <button
                    key={option.value}
                    onClick={() => handleMoneyAnswer(currentMoneyData.id, option.value)}
                    className="block w-full text-left p-3 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}

            {feedback[currentMoneyData.id] && (
              <div className={`p-4 rounded mb-6 ${feedback[currentMoneyData.id].isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                <p className="font-semibold mb-2">
                  {feedback[currentMoneyData.id].isCorrect ? '✅ Excellent!' : '❌ Not quite.'}
                </p>
                <div className="mb-2">
                  <strong>Money's Job:</strong> {feedback[currentMoneyData.id].moneyFunction}
                </div>
                <div>
                  <strong>💡 Key Learning:</strong> {feedback[currentMoneyData.id].explanation}
                </div>
              </div>
            )}

            <div className="flex justify-between items-center">
              <button
                onClick={handlePrevious}
                className="text-black bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
              >
                ← Back
              </button>
              
              <div className="text-sm text-gray-600">
                Function {moneyScenario + 1} of {moneyScenarios.length}
              </div>

              {allMoneyAnswered && (
                <div className="text-right">
                  <p className="text-green-600 font-semibold mb-2">✅ All Three Functions Discovered!</p>
                  <PrevNext />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
