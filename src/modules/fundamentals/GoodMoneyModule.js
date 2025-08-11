import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '../../contexts/ProgressContext';
import { 
  ActionButton,
  StepNavigation
} from '../../components/EnhancedButtons';
import { ModuleCompletionButton } from '../../components/ui';
import { 
  Target, Shield, Truck, Scissors, Shuffle, Search, 
  Globe, Scale, Piggy Bank, ArrowLeftRight, Calculator,
  Check, X, Zap, Star, Award
} from 'lucide-react';
import '../ModuleCommon.css';

const GoodMoneyModule = ({ moduleId = 'good-money' }) => {
  const navigate = useNavigate();
  const { updateModuleProgress, completeModule } = useProgress();
  const [currentStep, setCurrentStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [scenarioResults, setScenarioResults] = useState({});

  const steps = [
    'Money Must Do Three Things',
    'Seven Properties of Good Money', 
    'Real-World Property Tests',
    'Functions vs Properties',
    'Money Scorecard',
    'Perfect Money Checklist'
  ];

  const handleStepComplete = (stepIndex) => {
    const nextStep = stepIndex + 1;
    setCurrentStep(nextStep);
    updateModuleProgress(moduleId, Math.round((nextStep / steps.length) * 100));
  };

  const handleModuleComplete = () => {
    completeModule(moduleId);
    navigate('/');
  };

  const addQuizAnswer = (questionId, answer) => {
    setQuizAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const addScenarioResult = (scenarioId, result) => {
    setScenarioResults(prev => ({ ...prev, [scenarioId]: result }));
  };

  return (
    <div className="module-container">
      <div className="module-header">
        <h1>⭐ What Makes Good Money</h1>
        <p>Learn the essential properties and functions that make money work for people</p>
        <StepNavigation 
          steps={steps} 
          currentStep={currentStep}
          onStepClick={setCurrentStep}
        />
      </div>

      <div className="module-content">
        {currentStep === 0 && (
          <MoneyFunctions onComplete={() => handleStepComplete(0)} />
        )}
        
        {currentStep === 1 && (
          <MoneyProperties onComplete={() => handleStepComplete(1)} />
        )}
        
        {currentStep === 2 && (
          <PropertyTests 
            onComplete={() => handleStepComplete(2)}
            onScenarioResult={addScenarioResult}
            scenarioResults={scenarioResults}
          />
        )}
        
        {currentStep === 3 && (
          <FunctionsVsProperties 
            onComplete={() => handleStepComplete(3)}
            onQuizAnswer={addQuizAnswer}
            quizAnswers={quizAnswers}
          />
        )}
        
        {currentStep === 4 && (
          <MoneyScorecard 
            onComplete={() => handleStepComplete(4)}
            scenarioResults={scenarioResults}
          />
        )}
        
        {currentStep === 5 && (
          <PerfectMoneyChecklist onComplete={handleModuleComplete} />
        )}
      </div>
    </div>
  );
};

// Component 1: Money Must Do Three Things
const MoneyFunctions = ({ onComplete }) => {
  const [selectedFunction, setSelectedFunction] = useState(null);
  const [allFunctionsExplored, setAllFunctionsExplored] = useState(false);
  const [exploredFunctions, setExploredFunctions] = useState(new Set());

  const moneyFunctions = [
    {
      id: 'store-of-value',
      name: 'Store of Value',
      emoji: '🏛️',
      analogy: 'Your Lunchbox for Time & Effort',
      description: 'Money should preserve your purchasing power over time',
      example: 'You work today, save money, and it should buy roughly the same amount of stuff next year',
      realWorld: 'If you save $100 today, it should still buy $100 worth of goods in the future',
      failure: 'Venezuelan bolívar lost 99.9% of its value - your "lunchbox" got a hole in it',
      visual: 'piggy-bank'
    },
    {
      id: 'medium-of-exchange', 
      name: 'Medium of Exchange',
      emoji: '🔄',
      analogy: 'The Common Language for Trade',
      description: 'Money should be widely accepted for buying and selling',
      example: 'Instead of bartering chickens for shoes, everyone agrees to use the same money',
      realWorld: 'You can use dollars to buy coffee, pay rent, or purchase anything else',
      failure: 'During hyperinflation, people stop accepting the money and return to barter',
      visual: 'handshake'
    },
    {
      id: 'unit-of-account',
      name: 'Unit of Account', 
      emoji: '📏',
      analogy: 'The Measuring Cup for Value',
      description: 'Money provides a standard way to measure and compare value',
      example: 'You can compare: "Is a $5 coffee more valuable than a $3 donut?"',
      realWorld: 'Prices are quoted in money units so you can easily compare different goods',
      failure: 'When money becomes unstable, people quote prices in more stable currencies',
      visual: 'scale'
    }
  ];

  const handleFunctionExplore = (functionData) => {
    setSelectedFunction(functionData);
    const newExplored = new Set([...exploredFunctions, functionData.id]);
    setExploredFunctions(newExplored);
    
    if (newExplored.size === moneyFunctions.length) {
      setAllFunctionsExplored(true);
    }
  };

  const getIconComponent = (visual) => {
    switch(visual) {
      case 'piggy-bank': return <Piggy Bank size={32} />;
      case 'handshake': return <ArrowLeftRight size={32} />;
      case 'scale': return <Scale size={32} />;
      default: return <Target size={32} />;
    }
  };

  return (
    <div className="section-card">
      <div className="functions-header">
        <Target size={48} className="section-icon" />
        <h2>Money Must Do Three Things</h2>
        <p>For something to be good money, it must fulfill these three essential functions</p>
      </div>

      <div className="functions-grid">
        {moneyFunctions.map((func) => (
          <div 
            key={func.id}
            className={`function-card ${selectedFunction?.id === func.id ? 'selected' : ''} ${exploredFunctions.has(func.id) ? 'explored' : ''}`}
            onClick={() => handleFunctionExplore(func)}
          >
            <div className="function-icon">
              {getIconComponent(func.visual)}
            </div>
            <div className="function-header">
              <h3>{func.name}</h3>
              <p className="function-analogy">{func.analogy}</p>
            </div>
            {exploredFunctions.has(func.id) && <Check size={20} className="explored-check" />}
          </div>
        ))}
      </div>

      {selectedFunction && (
        <div className="function-explanation">
          <div className="explanation-header">
            <span className="function-emoji">{selectedFunction.emoji}</span>
            <h3>{selectedFunction.name}</h3>
          </div>
          
          <div className="explanation-content">
            <div className="explanation-section">
              <h4>What It Means:</h4>
              <p>{selectedFunction.description}</p>
            </div>
            
            <div className="explanation-section">
              <h4>Simple Example:</h4>
              <p>{selectedFunction.example}</p>
            </div>
            
            <div className="explanation-section">
              <h4>In Practice:</h4>
              <p>{selectedFunction.realWorld}</p>
            </div>
            
            <div className="failure-example">
              <h4>⚠️ When This Fails:</h4>
              <p>{selectedFunction.failure}</p>
            </div>
          </div>
        </div>
      )}

      {allFunctionsExplored && (
        <div className="functions-complete">
          <div className="completion-message">
            <Award size={24} />
            <div>
              <h4>Great! You understand the three functions.</h4>
              <p>But <em>how</em> does money accomplish these functions? That depends on its properties...</p>
            </div>
          </div>
          
          <ActionButton onClick={onComplete} variant="success">
            Discover the 7 Properties →
          </ActionButton>
        </div>
      )}

      {!allFunctionsExplored && exploredFunctions.size > 0 && (
        <div className="progress-hint">
          <p>Explored {exploredFunctions.size} of {moneyFunctions.length} functions. Click the others to continue.</p>
        </div>
      )}
    </div>
  );
};

// Component 2: Seven Properties of Good Money
const MoneyProperties = ({ onComplete }) => {
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [currentAnalogy, setCurrentAnalogy] = useState(0);

  const properties = [
    {
      id: 'scarcity',
      name: 'Scarcity',
      emoji: '💎',
      description: 'Limited supply that cannot be easily increased',
      analogy: {
        simple: 'Taylor Swift Concert Tickets',
        explanation: 'Only 50,000 seats exist. Even if demand is millions, supply stays fixed. That scarcity creates value.',
        counterExample: 'Printing more tickets would make each one worthless'
      },
      realWorld: {
        good: 'Gold is hard to mine - supply increases slowly',
        bad: 'Governments can print unlimited fiat money',
        bitcoin: 'Bitcoin has exactly 21 million coins maximum, forever'
      },
      icon: Star
    },
    {
      id: 'durability', 
      name: 'Durability',
      emoji: '🛡️',
      description: 'Does not decay, rust, or deteriorate over time',
      analogy: {
        simple: 'Diamond vs Ice Cube',
        explanation: 'Diamonds last forever. Ice cubes melt. Which would you rather store your wealth in?',
        counterExample: 'Storing wealth in ice cubes means watching your savings disappear'
      },
      realWorld: {
        good: 'Gold doesn\'t rust or decay after thousands of years',
        bad: 'Cattle die, grain rots, paper burns',
        bitcoin: 'Digital information can be copied perfectly and stored indefinitely'
      },
      icon: Shield
    },
    {
      id: 'portability',
      name: 'Portability', 
      emoji: '🚚',
      description: 'Easy to transport and transfer',
      analogy: {
        simple: 'Backpack vs Piano',
        explanation: 'You can easily carry $10,000 in a backpack. Try carrying $10,000 worth of pianos.',
        counterExample: 'Using pianos as money would make buying coffee impossible'
      },
      realWorld: {
        good: 'Paper money and credit cards are lightweight',
        bad: 'Gold bars are heavy and bulky to transport',
        bitcoin: 'Send millions across the globe in minutes with just internet'
      },
      icon: Truck
    },
    {
      id: 'divisibility',
      name: 'Divisibility',
      emoji: '✂️', 
      description: 'Can be broken into smaller units for different sized purchases',
      analogy: {
        simple: 'Pizza vs Painting', 
        explanation: 'You can buy 1 slice of pizza or a whole pizza. Try buying 1/8th of the Mona Lisa.',
        counterExample: 'If money came only in $1000 units, buying coffee would be impossible'
      },
      realWorld: {
        good: 'Dollars divide into cents, gold can be melted into smaller pieces',
        bad: 'Cattle cannot be divided without killing them',
        bitcoin: 'Divisible down to 8 decimal places (100 millionth of a Bitcoin)'
      },
      icon: Scissors
    },
    {
      id: 'fungibility',
      name: 'Fungibility',
      emoji: '⚖️',
      description: 'Each unit is identical and interchangeable',
      analogy: {
        simple: 'Dollar Bills vs Snowflakes',
        explanation: 'Every $20 bill has the same value as every other $20 bill. But every snowflake is unique.',
        counterExample: 'If some $20 bills were "tainted" and worth less, commerce would break down'
      },
      realWorld: {
        good: 'Pure gold is identical regardless of source',
        bad: 'Clipped or impure gold coins were worth less',
        bitcoin: 'Every Bitcoin is mathematically identical to every other Bitcoin'
      },
      icon: Shuffle
    },
    {
      id: 'recognizability',
      name: 'Recognizability',
      emoji: '🔍',
      description: 'Easy to identify and verify as genuine',
      analogy: {
        simple: 'McDonald\'s Logo vs Random Scribble',
        explanation: 'You instantly recognize the golden arches. A random scribble could be anything.',
        counterExample: 'If anyone could draw fake McDonald\'s logos, the brand would be worthless'
      },
      realWorld: {
        good: 'Coins have distinctive designs and security features',
        bad: 'Counterfeit money that\'s hard to detect destroys trust',
        bitcoin: 'Every transaction is cryptographically verified on the blockchain'
      },
      icon: Search
    },
    {
      id: 'borderlessness',
      name: 'Borderlessness', 
      emoji: '🌍',
      description: 'Accepted across regions and cultures',
      analogy: {
        simple: 'Universal Language vs Local Dialect',
        explanation: 'English is understood globally. A village dialect only works in one place.',
        counterExample: 'Money that only works in your hometown isn\'t very useful for travel or trade'
      },
      realWorld: {
        good: 'Gold has been valued across all cultures for millennia',
        bad: 'Venezuelan bolívars are worthless outside Venezuela',
        bitcoin: 'Works the same everywhere there\'s internet - no borders or permissions needed'
      },
      icon: Globe
    }
  ];

  const handlePropertySelect = (property) => {
    setSelectedProperty(property);
    setCurrentAnalogy(0);
  };

  const nextAnalogy = () => {
    setCurrentAnalogy((prev) => (prev + 1) % 3);
  };

  return (
    <div className="section-card">
      <div className="properties-header">
        <Zap size={48} className="section-icon" />
        <h2>The 7 Properties of Good Money</h2>
        <p>These properties determine how well money can perform its three functions</p>
      </div>

      <div className="properties-grid">
        {properties.map((property) => {
          const IconComponent = property.icon;
          return (
            <div
              key={property.id}
              className={`property-card ${selectedProperty?.id === property.id ? 'selected' : ''}`}
              onClick={() => handlePropertySelect(property)}
            >
              <div className="property-icon">
                <IconComponent size={28} />
              </div>
              <h3>{property.name}</h3>
              <p>{property.emoji}</p>
            </div>
          );
        })}
      </div>

      {selectedProperty && (
        <div className="property-deep-dive">
          <div className="deep-dive-header">
            <selectedProperty.icon size={32} />
            <div>
              <h3>{selectedProperty.name}</h3>
              <p>{selectedProperty.description}</p>
            </div>
          </div>

          <div className="analogy-carousel">
            {currentAnalogy === 0 && (
              <div className="analogy-section">
                <h4>🎯 Real-World Analogy</h4>
                <div className="analogy-content">
                  <h5>{selectedProperty.analogy.simple}</h5>
                  <p>{selectedProperty.analogy.explanation}</p>
                  <div className="counter-example">
                    <strong>Why This Matters:</strong> {selectedProperty.analogy.counterExample}
                  </div>
                </div>
              </div>
            )}

            {currentAnalogy === 1 && (
              <div className="comparison-section">
                <h4>📊 How Different Money Types Score</h4>
                <div className="comparison-grid">
                  <div className="comparison-item good">
                    <h5>✅ Good Example</h5>
                    <p>{selectedProperty.realWorld.good}</p>
                  </div>
                  <div className="comparison-item bad">
                    <h5>❌ Poor Example</h5>
                    <p>{selectedProperty.realWorld.bad}</p>
                  </div>
                  <div className="comparison-item bitcoin">
                    <h5>₿ Bitcoin</h5>
                    <p>{selectedProperty.realWorld.bitcoin}</p>
                  </div>
                </div>
              </div>
            )}

            {currentAnalogy === 2 && (
              <div className="summary-section">
                <h4>🎯 Key Takeaway</h4>
                <p>
                  <strong>{selectedProperty.name}</strong> is crucial because without it, 
                  money fails at being a reliable {selectedProperty.id === 'scarcity' ? 'store of value' : 
                    selectedProperty.id === 'portability' || selectedProperty.id === 'divisibility' ? 'medium of exchange' :
                    'unit of account'}.
                </p>
                <div className="property-connection">
                  This property directly enables money to function properly in the real world.
                </div>
              </div>
            )}

            <div className="analogy-controls">
              <ActionButton onClick={nextAnalogy} variant="secondary">
                {currentAnalogy === 0 ? 'See Examples' : currentAnalogy === 1 ? 'Key Takeaway' : 'Back to Analogy'} →
              </ActionButton>
            </div>
          </div>
        </div>
      )}

      {selectedProperty && (
        <div className="properties-navigation">
          <div className="nav-hint">
            <p>Explore all 7 properties to see how they work together</p>
          </div>
          
          {properties.indexOf(selectedProperty) === properties.length - 1 && (
            <ActionButton onClick={onComplete} variant="success">
              Test These Properties in Action →
            </ActionButton>
          )}
        </div>
      )}
    </div>
  );
};

// Component 3: Real-World Property Tests  
const PropertyTests = ({ onComplete, onScenarioResult, scenarioResults }) => {
  const [currentTest, setCurrentTest] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const propertyTests = [
    {
      id: 'divisibility-test',
      property: 'Divisibility',
      scenario: 'You want to buy a $3.50 coffee',
      options: [
        {
          money: 'Cattle',
          action: 'Cut off a leg of your cow',
          result: 'fail',
          explanation: 'The cow dies, and you\'ve destroyed most of your wealth for a coffee. Terrible divisibility.'
        },
        {
          money: 'Gold Bar',  
          action: 'Chip off a small piece',
          result: 'partial',
          explanation: 'Possible but difficult. You need tools, scales, and expertise. Not practical for daily use.'
        },
        {
          money: 'Dollars',
          action: 'Pay with $5, get $1.50 change',
          result: 'success', 
          explanation: 'Perfect! Dollars divide cleanly into cents. Easy, precise, no waste.'
        }
      ]
    },
    {
      id: 'portability-test',
      property: 'Portability',
      scenario: 'You need to travel across the country with $10,000',
      options: [
        {
          money: 'Gold Coins',
          action: 'Carry 20 pounds of gold',
          result: 'partial',
          explanation: 'Possible but heavy and obvious. Risky to transport, requires security.'
        },
        {
          money: 'Cash',
          action: 'Carry a thin stack of bills',
          result: 'success',
          explanation: 'Lightweight and compact. Fits easily in a pocket or wallet.'
        },
        {
          money: 'Bitcoin',
          action: 'Memorize 12 words',
          result: 'perfect',
          explanation: 'Ultimate portability. $10,000 travels in your head, no physical weight at all.'
        }
      ]
    },
    {
      id: 'fungibility-test',
      property: 'Fungibility', 
      scenario: 'Someone offers you money that might be "tainted"',
      options: [
        {
          money: 'Clipped Gold Coin',
          action: 'Accept the lighter coin',
          result: 'fail',
          explanation: 'This coin has less gold, so it\'s worth less. Not fungible - each coin has different value.'
        },
        {
          money: 'Marked Bills',
          action: 'Accept bills from a bank robbery',
          result: 'fail', 
          explanation: 'These bills could be tracked and might get you in trouble. Not truly fungible.'
        },
        {
          money: 'Pure Gold',
          action: 'Accept the gold ingot',
          result: 'success',
          explanation: 'Gold is gold. One ounce of pure gold equals any other ounce, regardless of history.'
        }
      ]
    }
  ];

  const handleOptionSelect = (option) => {
    const test = propertyTests[currentTest];
    onScenarioResult(test.id, {
      property: test.property,
      choice: option.money,
      result: option.result,
      explanation: option.explanation
    });
    setShowResult(option);
  };

  const nextTest = () => {
    if (currentTest < propertyTests.length - 1) {
      setCurrentTest(currentTest + 1);
      setShowResult(false);
    } else {
      onComplete();
    }
  };

  const test = propertyTests[currentTest];

  return (
    <div className="section-card">
      <div className="test-header">
        <Target size={48} className="section-icon" />
        <h2>Property Test #{currentTest + 1}</h2>
        <p>Testing: <strong>{test.property}</strong></p>
      </div>

      <div className="test-scenario">
        <h3>Scenario:</h3>
        <div className="scenario-box">
          <p>{test.scenario}</p>
        </div>

        <h3>Your Options:</h3>
        <div className="test-options">
          {test.options.map((option, index) => (
            <button
              key={index}
              className={`test-option ${showResult?.money === option.money ? 'selected' : ''}`}
              onClick={() => handleOptionSelect(option)}
              disabled={showResult}
            >
              <div className="option-header">
                <strong>{option.money}</strong>
              </div>
              <div className="option-action">
                {option.action}
              </div>
            </button>
          ))}
        </div>

        {showResult && (
          <div className="test-result">
            <div className={`result-header ${showResult.result}`}>
              <div className="result-icon">
                {showResult.result === 'perfect' ? '🏆' : 
                 showResult.result === 'success' ? '✅' :
                 showResult.result === 'partial' ? '⚠️' : '❌'}
              </div>
              <h4>
                {showResult.result === 'perfect' ? 'Perfect!' :
                 showResult.result === 'success' ? 'Success!' :
                 showResult.result === 'partial' ? 'Partially Works' : 'Fails!'}
              </h4>
            </div>
            <p>{showResult.explanation}</p>
            
            <div className="test-navigation">
              <ActionButton onClick={nextTest} variant="primary">
                {currentTest < propertyTests.length - 1 ? 'Next Test →' : 'See the Big Picture →'}
              </ActionButton>
            </div>
          </div>
        )}
      </div>

      <div className="test-progress">
        <p>Test {currentTest + 1} of {propertyTests.length}</p>
        <div className="progress-dots">
          {propertyTests.map((_, index) => (
            <span 
              key={index} 
              className={`dot ${index <= currentTest ? 'active' : ''}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Component 4: Functions vs Properties
const FunctionsVsProperties = ({ onComplete, onQuizAnswer, quizAnswers }) => {
  const [showQuiz, setShowQuiz] = useState(false);

  const connectionMap = [
    {
      function: 'Store of Value',
      icon: '🏛️',
      requiredProperties: ['Scarcity', 'Durability'],
      explanation: 'To preserve wealth over time, money must be limited in supply (scarce) and not decay (durable)'
    },
    {
      function: 'Medium of Exchange', 
      icon: '🔄',
      requiredProperties: ['Portability', 'Divisibility', 'Fungibility', 'Recognizability'],
      explanation: 'For daily transactions, money must be easy to carry, divide for exact change, uniform, and quickly verified'
    },
    {
      function: 'Unit of Account',
      icon: '📏', 
      requiredProperties: ['Fungibility', 'Scarcity', 'Recognizability'],
      explanation: 'To measure value consistently, each unit must be identical, maintain stable value, and be easily identified'
    }
  ];

  const quizQuestions = [
    {
      id: 'q1',
      question: 'Why does money need to be SCARCE to store value?',
      options: [
        'So it looks pretty',
        'If anyone can create unlimited money, existing money becomes worthless',
        'To make it hard to find',
        'Because governments say so'
      ],
      correct: 1,
      explanation: 'Scarcity preserves value. If money supply increases rapidly, each unit becomes worth less (inflation).'
    },
    {
      id: 'q2', 
      question: 'Which property is MOST important for buying coffee daily?',
      options: [
        'Borderlessness - coffee is global',
        'Durability - coffee shops are permanent', 
        'Divisibility - you need exact change',
        'Scarcity - coffee is expensive'
      ],
      correct: 2,
      explanation: 'Divisibility lets you pay the exact amount. Without it, every purchase would require complex change-making.'
    }
  ];

  const handleQuizAnswer = (questionId, answerIndex) => {
    const question = quizQuestions.find(q => q.id === questionId);
    const isCorrect = answerIndex === question.correct;
    onQuizAnswer(questionId, { answerIndex, isCorrect, explanation: question.explanation });
  };

  return (
    <div className="section-card">
      <div className="connection-header">
        <Zap size={48} className="section-icon" />
        <h2>How Properties Enable Functions</h2>
        <p>Each function requires specific properties to work properly</p>
      </div>

      <div className="function-property-map">
        {connectionMap.map((connection, index) => (
          <div key={index} className="connection-card">
            <div className="function-side">
              <div className="function-icon">{connection.icon}</div>
              <h3>{connection.function}</h3>
            </div>
            
            <div className="connection-arrow">→</div>
            
            <div className="properties-side">
              <div className="required-properties">
                {connection.requiredProperties.map((prop, idx) => (
                  <span key={idx} className="property-tag">{prop}</span>
                ))}
              </div>
            </div>
            
            <div className="connection-explanation">
              <p>{connection.explanation}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="understanding-check">
        <h3>Quick Understanding Check</h3>
        
        {!showQuiz && (
          <ActionButton onClick={() => setShowQuiz(true)} variant="primary">
            Test My Understanding →
          </ActionButton>
        )}

        {showQuiz && (
          <div className="quiz-section">
            {quizQuestions.map((question) => (
              <div key={question.id} className="quiz-question">
                <h4>{question.question}</h4>
                <div className="quiz-options">
                  {question.options.map((option, index) => (
                    <button
                      key={index}
                      className={`quiz-option ${
                        quizAnswers[question.id]?.answerIndex === index ? 
                          (quizAnswers[question.id]?.isCorrect ? 'correct' : 'incorrect') : ''
                      }`}
                      onClick={() => handleQuizAnswer(question.id, index)}
                      disabled={quizAnswers[question.id]}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                
                {quizAnswers[question.id] && (
                  <div className={`quiz-feedback ${quizAnswers[question.id].isCorrect ? 'correct' : 'incorrect'}`}>
                    <p>{quizAnswers[question.id].explanation}</p>
                  </div>
                )}
              </div>
            ))}

            {Object.keys(quizAnswers).length === quizQuestions.length && (
              <ActionButton onClick={onComplete} variant="success">
                Ready for the Money Scorecard →
              </ActionButton>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// Component 5: Money Scorecard
const MoneyScorecard = ({ onComplete, scenarioResults }) => {
  const [showScorecard, setShowScorecard] = useState(false);

  const moneyTypes = [
    {
      name: 'Cattle',
      scores: {
        scarcity: 6, durability: 2, portability: 4, divisibility: 1,
        fungibility: 3, recognizability: 8, borderlessness: 5
      },
      total: 29,
      grade: 'D',
      note: 'Good value, terrible for daily use'
    },
    {
      name: 'Gold',
      scores: {
        scarcity: 8, durability: 9, portability: 5, divisibility: 6,
        fungibility: 7, recognizability: 9, borderlessness: 8
      },
      total: 52,
      grade: 'B+',
      note: 'Excellent properties, physical limitations'
    },
    {
      name: 'Fiat Money',
      scores: {
        scarcity: 2, durability: 6, portability: 8, divisibility: 9,
        fungibility: 7, recognizability: 8, borderlessness: 6
      },
      total: 46,
      grade: 'B-',
      note: 'Convenient but unlimited supply'
    },
    {
      name: 'Bitcoin',
      scores: {
        scarcity: 10, durability: 9, portability: 10, divisibility: 9,
        fungibility: 8, recognizability: 9, borderlessness: 10
      },
      total: 65,
      grade: 'A',
      note: 'First money to score high on all properties'
    }
  ];

  const properties = ['Scarcity', 'Durability', 'Portability', 'Divisibility', 'Fungibility', 'Recognizability', 'Borderlessness'];

  return (
    <div className="section-card">
      <div className="scorecard-header">
        <Award size={48} className="section-icon" />
        <h2>The Money Scorecard</h2>
        <p>How do different types of money score on the 7 properties?</p>
      </div>

      {!showScorecard && (
        <div className="scorecard-intro">
          <div className="intro-content">
            <h3>Based on your test results...</h3>
            <p>You've seen how properties affect real-world use. Now let's score different money types on all 7 properties.</p>
            <p>Each property is scored 1-10, where 10 is perfect.</p>
          </div>
          
          <ActionButton onClick={() => setShowScorecard(true)} variant="primary">
            Reveal the Scorecard →
          </ActionButton>
        </div>
      )}

      {showScorecard && (
        <div className="scorecard-table">
          <div className="scorecard-grid">
            <div className="property-header">Properties</div>
            {moneyTypes.map(money => (
              <div key={money.name} className={`money-header ${money.name.toLowerCase()}`}>
                {money.name}
              </div>
            ))}
            
            {properties.map((property, propIndex) => (
              <React.Fragment key={property}>
                <div className="property-name">{property}</div>
                {moneyTypes.map(money => (
                  <div key={`${money.name}-${property}`} className="score-cell">
                    <div className="score-bar">
                      <div 
                        className="score-fill" 
                        style={{ width: `${money.scores[property.toLowerCase()]}0%` }}
                      />
                      <span className="score-number">{money.scores[property.toLowerCase()]}</span>
                    </div>
                  </div>
                ))}
              </React.Fragment>
            ))}
            
            <div className="total-header">Total Score</div>
            {moneyTypes.map(money => (
              <div key={`${money.name}-total`} className={`total-score ${money.grade.toLowerCase().replace('+', '-plus').replace('-', '-minus')}`}>
                <div className="total-number">{money.total}/70</div>
                <div className="grade">{money.grade}</div>
              </div>
            ))}
          </div>

          <div className="scorecard-insights">
            <h3>Key Insights</h3>
            <div className="insights-grid">
              {moneyTypes.map(money => (
                <div key={money.name} className="insight-card">
                  <h4>{money.name}</h4>
                  <p>{money.note}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="scorecard-conclusion">
            <div className="conclusion-content">
              <h3>The Pattern is Clear</h3>
              <p>For the first time in history, we have money (Bitcoin) that scores high on ALL properties. This is why it's revolutionary.</p>
            </div>
            
            <ActionButton onClick={onComplete} variant="success">
              Create Your Perfect Money Checklist →
            </ActionButton>
          </div>
        </div>
      )}
    </div>
  );
};

// Component 6: Perfect Money Checklist
const PerfectMoneyChecklist = ({ onComplete }) => {
  const [checkedItems, setCheckedItems] = useState(new Set());

  const checklist = [
    { id: 'functions', text: 'Must serve as Store of Value, Medium of Exchange, and Unit of Account', category: 'Functions' },
    { id: 'scarce', text: 'Limited supply that cannot be inflated away', category: 'Scarcity' },
    { id: 'durable', text: 'Does not decay, rust, or deteriorate over time', category: 'Durability' },
    { id: 'portable', text: 'Easy to transport across any distance', category: 'Portability' },
    { id: 'divisible', text: 'Can be divided for purchases of any size', category: 'Divisibility' },
    { id: 'fungible', text: 'Each unit identical and interchangeable', category: 'Fungibility' },
    { id: 'verifiable', text: 'Easy to identify and verify as genuine', category: 'Recognizability' },
    { id: 'borderless', text: 'Works everywhere, no geographic limitations', category: 'Borderlessness' }
  ];

  const handleCheck = (itemId) => {
    const newChecked = new Set(checkedItems);
    if (newChecked.has(itemId)) {
      newChecked.delete(itemId);
    } else {
      newChecked.add(itemId);
    }
    setCheckedItems(newChecked);
  };

  const allChecked = checkedItems.size === checklist.length;

  return (
    <div className="section-card">
      <div className="checklist-header">
        <Star size={48} className="section-icon" />
        <h2>Your Perfect Money Checklist</h2>
        <p>Now you know what to look for in good money. Check off each requirement:</p>
      </div>

      <div className="checklist">
        {checklist.map((item) => (
          <div
            key={item.id}
            className={`checklist-item ${checkedItems.has(item.id) ? 'checked' : ''}`}
            onClick={() => handleCheck(item.id)}
          >
            <div className="checkbox">
              {checkedItems.has(item.id) ? <Check size={16} /> : <div className="checkbox-empty" />}
            </div>
            <div className="checklist-content">
              <span className="category-tag">{item.category}</span>
              <p>{item.text}</p>
            </div>
          </div>
        ))}
      </div>

      {allChecked && (
        <div className="checklist-complete">
          <div className="completion-message">
            <Award size={32} />
            <div>
              <h3>Perfect! You now understand what makes good money.</h3>
              <p>But what happens when money systems fail these requirements? Let's examine some real-world cases...</p>
            </div>
          </div>
          
          <ModuleCompletionButton onClick={onComplete}>
            Discover When Good Money Goes Bad →
          </ModuleCompletionButton>
        </div>
      )}

      <div className="progress-indicator">
        <p>{checkedItems.size} of {checklist.length} requirements checked</p>
      </div>
    </div>
  );
};

export default GoodMoneyModule;
