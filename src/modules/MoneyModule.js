import React, { useState, useCallback } from 'react';
import { useProgress } from '../contexts/ProgressContext';
import { TrendingUp, Coins, 
         CheckCircle, ArrowRight, Lightbulb, AlertTriangle } from 'lucide-react';
import '../components/MoneyModule.css';

const MoneyModule = () => {
  const { completeModule } = useProgress();
  
  // Core learning state management
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(new Set());
  const [learningProgress, setLearningProgress] = useState(0);
  const [unlockedPrinciples, setUnlockedPrinciples] = useState(new Set());
  
  // Interactive elements state
  const [selectedPrinciple, setSelectedPrinciple] = useState(null);
  const [quizResults, setQuizResults] = useState({});
  const [inflationAmount, setInflationAmount] = useState(1000);
  const [inflationYears, setInflationYears] = useState(10);
  
  // Knowledge tracking
  const [conceptsUnderstood, setConceptsUnderstood] = useState(new Set());
  const [practicalExamplesViewed, setPracticalExamplesViewed] = useState(new Set());

  // Learning Journey Steps
  const learningSteps = [
    {
      id: 'money_problems',
      title: 'Why Current Money Systems Fail',
      description: 'Understand the fundamental problems with fiat currency',
      icon: AlertTriangle,
      concepts: ['inflation', 'debasement', 'central_control']
    },
    {
      id: 'sound_money_principles',
      title: 'What Makes Money Sound',
      description: 'Explore the essential properties of reliable money',
      icon: Lightbulb,
      concepts: ['scarcity', 'durability', 'verifiability', 'portability']
    },
    {
      id: 'bitcoin_solution',
      title: 'Bitcoin as Sound Money',
      description: 'See how Bitcoin solves traditional money problems',
      icon: Coins,
      concepts: ['fixed_supply', 'decentralization', 'cryptographic_proof']
    },
    {
      id: 'personal_impact',
      title: 'Your Financial Future',
      description: 'Calculate how sound money affects your wealth',
      icon: TrendingUp,
      concepts: ['wealth_preservation', 'purchasing_power', 'financial_sovereignty']
    }
  ];

  // Sound Money Principles (now interactive)
  const soundMoneyPrinciples = [
    {
      id: 'scarcity',
      title: 'Scarcity',
      icon: '🔒',
      shortDesc: 'Limited supply preserves value over time',
      detailedExplanation: 'Scarcity means there\'s a limited amount that can never be increased arbitrarily. This protects against inflation and maintains purchasing power.',
      examples: {
        good: 'Bitcoin: Fixed at 21 million coins maximum',
        bad: 'US Dollar: Federal Reserve can print unlimited amounts'
      },
      realWorldImpact: 'A scarce money protects your savings from losing value through inflation',
      quiz: {
        question: 'Why is scarcity important for money?',
        options: [
          'It makes money more expensive',
          'It prevents inflation and maintains value',
          'It makes transactions faster',
          'It requires government backing'
        ],
        correct: 1,
        explanation: 'Scarcity prevents inflation because no one can create more money arbitrarily, which maintains the value of existing money.'
      }
    },
    {
      id: 'durability',
      title: 'Durability',
      icon: '💎',
      shortDesc: 'Withstands time and physical forces',
      detailedExplanation: 'Durable money doesn\'t deteriorate, break, or become unusable over time. It must survive for generations.',
      examples: {
        good: 'Bitcoin: Digital information that cannot be destroyed',
        bad: 'Paper money: Deteriorates, burns, gets wet, fades over time'
      },
      realWorldImpact: 'Durable money means your wealth storage method won\'t physically deteriorate',
      quiz: {
        question: 'What makes Bitcoin more durable than paper money?',
        options: [
          'It\'s backed by government',
          'It can\'t be physically destroyed',
          'It\'s worth more',
          'It\'s easier to use'
        ],
        correct: 1,
        explanation: 'Bitcoin exists as digital information that can be backed up and recovered, unlike physical money that can be destroyed.'
      }
    },
    {
      id: 'divisibility',
      title: 'Divisibility',
      icon: '📏',
      shortDesc: 'Can be divided into smaller units for precise transactions',
      detailedExplanation: 'Good money can be divided into smaller amounts for transactions of any size, from tiny purchases to large ones.',
      examples: {
        good: 'Bitcoin: Divisible to 8 decimal places (100 million satoshis per bitcoin)',
        bad: 'Gold bars: Difficult to divide for small purchases'
      },
      realWorldImpact: 'Divisible money lets you make transactions of any size with exact amounts',
      quiz: {
        question: 'How many satoshis are in one Bitcoin?',
        options: [
          '1 million',
          '10 million', 
          '100 million',
          '1 billion'
        ],
        correct: 2,
        explanation: 'One Bitcoin equals 100 million satoshis, allowing for very precise transactions.'
      }
    },
    {
      id: 'verifiability',
      title: 'Verifiability',
      icon: '✅',
      shortDesc: 'Authenticity can be independently proven',
      detailedExplanation: 'Anyone must be able to verify that the money is real and hasn\'t been counterfeited, without trusting a third party.',
      examples: {
        good: 'Bitcoin: Cryptographic proof verifiable by anyone',
        bad: 'Counterfeit cash: Requires expertise and tools to detect fakes'
      },
      realWorldImpact: 'Verifiable money means you never have to worry about receiving counterfeit money',
      quiz: {
        question: 'How can you verify Bitcoin is authentic?',
        options: [
          'Ask a bank to check it',
          'Use cryptographic verification on the blockchain',
          'Look for security features',
          'Trust the government'
        ],
        correct: 1,
        explanation: 'Bitcoin uses cryptographic proofs that anyone can verify independently using the blockchain.'
      }
    },
    {
      id: 'portability',
      title: 'Portability',
      icon: '🚀',
      shortDesc: 'Easy to transport and transfer anywhere',
      detailedExplanation: 'Good money should be easy to move from place to place, whether across the room or across the world.',
      examples: {
        good: 'Bitcoin: Instant global transfer with just an internet connection',
        bad: 'Gold: Heavy, requires physical transport and security'
      },
      realWorldImpact: 'Portable money gives you financial freedom to move and transact globally',
      quiz: {
        question: 'What makes Bitcoin highly portable?',
        options: [
          'It\'s lightweight',
          'It exists as digital information',
          'It\'s small in size',
          'It\'s government approved'
        ],
        correct: 1,
        explanation: 'Bitcoin exists as digital information that can be transmitted instantly anywhere with internet access.'
      }
    },
    {
      id: 'fungibility',
      title: 'Fungibility',
      icon: '🔄',
      shortDesc: 'Each unit is identical and interchangeable',
      detailedExplanation: 'Every unit of the money should be identical to every other unit. One unit should be worth exactly the same as any other unit.',
      examples: {
        good: 'Bitcoin: Every bitcoin is mathematically identical',
        bad: 'Collectible items: Each has different value based on condition/rarity'
      },
      realWorldImpact: 'Fungible money ensures fair transactions where all units have equal value',
      quiz: {
        question: 'Why is fungibility important for money?',
        options: [
          'It makes money more valuable',
          'It ensures all units have equal value',
          'It makes transactions faster',
          'It prevents theft'
        ],
        correct: 1,
        explanation: 'Fungibility ensures fair trade because every unit of money has exactly the same value as every other unit.'
      }
    }
  ];

  // Real-world money problems examples
  const moneyProblems = [
    {
      id: 'inflation',
      title: 'Inflation Destroys Savings',
      description: 'Central banks print money, reducing the value of your savings',
      example: 'A coffee that cost $1 in 1980 costs $3+ today',
      impact: 'Your purchasing power decreases every year',
      visual: { before: '$1 = 1 coffee', after: '$3 = 1 coffee' }
    },
    {
      id: 'debasement',
      title: 'Currency Debasement',
      description: 'Governments reduce the value of money by creating more',
      example: 'The US dollar has lost 96% of its value since 1913',
      impact: 'Long-term wealth storage becomes impossible',
      visual: { before: '$100 in 1913', after: '$4 buying power today' }
    },
    {
      id: 'control',
      title: 'Central Control',
      description: 'Banks and governments can freeze, seize, or block your money',
      example: 'Canadian truckers had bank accounts frozen in 2022',
      impact: 'Your money isn\'t truly yours if others control it',
      visual: { before: 'Your money', after: 'Frozen by authorities' }
    }
  ];

  // Calculate inflation impact
  const calculateInflationImpact = useCallback((amount, years, rate = 3) => {
    const futureValue = amount * Math.pow(1 + rate/100, years);
    const realValue = amount / Math.pow(1 + rate/100, years);
    const purchasing_power_lost = ((amount - realValue) / amount * 100).toFixed(1);
    
    return {
      futureValue: futureValue.toFixed(2),
      realValue: realValue.toFixed(2),
      purchasing_power_lost
    };
  }, []);

  // Handle principle selection
  const handlePrincipleSelect = (principleId) => {
    setSelectedPrinciple(principleId);
    setUnlockedPrinciples(prev => new Set([...prev, principleId]));
  };

  // Handle quiz completion
  const handleQuizComplete = (principleId, correct) => {
    setQuizResults(prev => ({
      ...prev,
      [principleId]: { correct, timestamp: Date.now() }
    }));
    
    if (correct) {
      setConceptsUnderstood(prev => new Set([...prev, principleId]));
      setLearningProgress(prev => Math.min(prev + 16.67, 100)); // 6 principles = 100%
    }
  };

  // Handle step completion
  const handleStepComplete = (stepIndex) => {
    setCompletedSteps(prev => new Set([...prev, stepIndex]));
    
    if (stepIndex === learningSteps.length - 1) {
      // Module completed
      completeModule('money');
    } else {
      setCurrentStep(stepIndex + 1);
    }
  };
    
    return (
    <div className="money-module light-theme">
      {/* Module Header */}
      <div className="module-header container-light-orange">
        <h1 className="hero-title">Understanding Money: From Problems to Solutions</h1>
        <p className="module-subtitle subtitle">
          Learn why current money systems fail and discover the principles of sound money
        </p>
        
        {/* Progress Indicator */}
        <div className="learning-progress">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${(completedSteps.size / learningSteps.length) * 100}%` }}
            />
          </div>
          <span>{completedSteps.size} of {learningSteps.length} steps completed</span>
          </div>
        </div>

      {/* Learning Steps Navigation */}
      <div className="learning-steps">
        {learningSteps.map((step, index) => {
          const StepIcon = step.icon;
          const isCompleted = completedSteps.has(index);
          const isCurrent = index === currentStep;
          const isAccessible = index <= currentStep;
          
          return (
            <div 
              key={step.id}
              className={`learning-step card-light ${isCompleted ? 'completed' : ''} ${isCurrent ? 'current' : ''} ${!isAccessible ? 'locked' : ''}`}
              onClick={() => isAccessible && setCurrentStep(index)}
            >
              <div className="step-icon">
                {isCompleted ? <CheckCircle size={24} /> : <StepIcon size={24} />}
                    </div>
              <div className="step-content">
                <h3>{step.title}</h3>
                <p>{step.description}</p>
                    </div>
              <div className="step-status">
                {isCompleted && <span className="status-completed">✓</span>}
                {isCurrent && <span className="status-current">→</span>}
                {!isAccessible && <span className="status-locked">🔒</span>}
      </div>
              </div>
          );
        })}
            </div>

      {/* Main Content Area */}
      <div className="main-content light-bg">
        {currentStep === 0 && (
          <MoneyProblemsStep 
            problems={moneyProblems}
            onViewExample={setPracticalExamplesViewed}
            onComplete={() => handleStepComplete(0)}
            viewedExamples={practicalExamplesViewed}
          />
        )}
        
        {currentStep === 1 && (
          <SoundMoneyPrinciplesStep 
            principles={soundMoneyPrinciples}
            selectedPrinciple={selectedPrinciple}
            onPrincipleSelect={handlePrincipleSelect}
            onQuizComplete={handleQuizComplete}
            quizResults={quizResults}
            unlockedPrinciples={unlockedPrinciples}
            onComplete={() => handleStepComplete(1)}
          />
        )}
        
        {currentStep === 2 && (
          <BitcoinSolutionStep 
            principles={soundMoneyPrinciples}
            onComplete={() => handleStepComplete(2)}
          />
        )}
        
        {currentStep === 3 && (
          <PersonalImpactStep 
            inflationAmount={inflationAmount}
            inflationYears={inflationYears}
            onAmountChange={setInflationAmount}
            onYearsChange={setInflationYears}
            calculateInflation={calculateInflationImpact}
            onComplete={() => handleStepComplete(3)}
          />
        )}
          </div>

      {/* Knowledge Summary */}
      <div className="knowledge-summary card-light">
        <h3>Your Learning Progress</h3>
        <div className="progress-metrics">
          <div className="metric">
            <span className="metric-value text-bitcoin">{conceptsUnderstood.size}</span>
            <span className="metric-label">Concepts Mastered</span>
                </div>
          <div className="metric">
            <span className="metric-value text-bitcoin">{practicalExamplesViewed.size}</span>
            <span className="metric-label">Examples Explored</span>
              </div>
          <div className="metric">
            <span className="metric-value text-bitcoin">{Object.keys(quizResults).filter(k => quizResults[k].correct).length}</span>
            <span className="metric-label">Quizzes Passed</span>
                </div>
          <div className="metric">
            <span className="metric-value text-bitcoin">{Math.round(learningProgress)}%</span>
            <span className="metric-label">Overall Progress</span>
              </div>
                </div>
              </div>
                </div>
  );
};

// Step 1: Money Problems Component
const MoneyProblemsStep = ({ problems, onViewExample, onComplete, viewedExamples }) => {
  const [selectedProblem, setSelectedProblem] = useState(null);

  const handleProblemSelect = (problemId) => {
    setSelectedProblem(problemId);
    onViewExample(prev => new Set([...prev, problemId]));
  };

  const canComplete = viewedExamples.size >= problems.length;

  return (
    <div className="money-problems-step light-bg">
      <div className="step-header card-light">
        <h2>Why Current Money Systems Fail</h2>
        <p>Before we explore solutions, let's understand the fundamental problems with today's money systems.</p>
              </div>
              
      <div className="problems-grid">
        {problems.map(problem => (
          <div 
            key={problem.id}
            className={`problem-card card-light ${selectedProblem === problem.id ? 'selected' : ''} ${viewedExamples.has(problem.id) ? 'viewed' : ''}`}
            onClick={() => handleProblemSelect(problem.id)}
          >
            <div className="problem-header">
              <h3>{problem.title}</h3>
              {viewedExamples.has(problem.id) && <CheckCircle className="viewed-icon text-success" size={20} />}
              </div>
            <p>{problem.description}</p>
            
            {selectedProblem === problem.id && (
              <div className="problem-details">
                <div className="example-section">
                  <h4>Real Example:</h4>
                  <p>{problem.example}</p>
                      </div>
                <div className="impact-section">
                  <h4>Impact on You:</h4>
                  <p>{problem.impact}</p>
                      </div>
                <div className="visual-comparison">
                  <div className="before">
                    <span className="label">Before:</span>
                    <span className="value">{problem.visual.before}</span>
                    </div>
                  <ArrowRight size={20} />
                  <div className="after">
                    <span className="label">After:</span>
                    <span className="value">{problem.visual.after}</span>
                        </div>
                </div>
                        </div>
                      )}
                  </div>
                ))}
              </div>

      {canComplete && (
        <div className="step-completion">
          <div className="completion-message">
            <CheckCircle size={24} />
            <span>You've explored all the major problems with current money systems!</span>
            </div>
          <button className="continue-button" onClick={onComplete}>
            Learn About Sound Money Solutions →
              </button>
            </div>
          )}
      </div>
    );
};

// Step 2: Sound Money Principles Component
const SoundMoneyPrinciplesStep = ({ principles, selectedPrinciple, onPrincipleSelect, onQuizComplete, quizResults, unlockedPrinciples, onComplete }) => {
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [quizAnswer, setQuizAnswer] = useState('');

  const handleQuizSubmit = (principleId, answerIndex) => {
    const principle = principles.find(p => p.id === principleId);
    const correct = answerIndex === principle.quiz.correct;
    onQuizComplete(principleId, correct);
    setActiveQuiz(null);
    setQuizAnswer('');
  };

  const correctQuizzes = Object.keys(quizResults).filter(k => quizResults[k].correct).length;
  const canComplete = correctQuizzes >= principles.length;

  return (
    <div className="sound-money-principles-step light-bg">
      <div className="step-header card-light">
        <h2>What Makes Money Sound</h2>
        <p>Explore the essential properties that make money reliable and trustworthy. Click each principle to learn more.</p>
      </div>

      <div className="principles-grid">
        {principles.map(principle => {
          const hasCorrectQuiz = quizResults[principle.id]?.correct;
          
          return (
            <div 
              key={principle.id}
              className={`principle-card card-light interactive ${selectedPrinciple === principle.id ? 'selected' : ''} ${hasCorrectQuiz ? 'mastered' : ''}`}
              onClick={() => onPrincipleSelect(principle.id)}
            >
              <div className="principle-header">
                <div className="principle-icon">{principle.icon}</div>
                <h3>{principle.title}</h3>
                {hasCorrectQuiz && <CheckCircle className="mastered-icon text-success" size={20} />}
      </div>
              
              <p>{principle.shortDesc}</p>
              
              {selectedPrinciple === principle.id && (
                <div className="principle-details">
                  <div className="detailed-explanation">
                    <h4>Why This Matters:</h4>
                    <p>{principle.detailedExplanation}</p>
      </div>

                  <div className="examples-comparison">
                    <div className="good-example">
                      <h5>✅ Good Example:</h5>
                      <p>{principle.examples.good}</p>
            </div>
                    <div className="bad-example">
                      <h5>❌ Poor Example:</h5>
                      <p>{principle.examples.bad}</p>
        </div>
      </div>

                  <div className="real-world-impact">
                    <h5>Impact on Your Life:</h5>
                    <p>{principle.realWorldImpact}</p>
            </div>
            
                  {!hasCorrectQuiz && (
                    <div className="quiz-section">
                      {activeQuiz !== principle.id ? (
                  <button
                          className="quiz-button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveQuiz(principle.id);
                          }}
                        >
                          Test Your Understanding
                        </button>
                      ) : (
                        <div className="quiz-content">
                          <h5>{principle.quiz.question}</h5>
                          <div className="quiz-options">
                            {principle.quiz.options.map((option, index) => (
                              <button
                                key={index}
                                className={`quiz-option ${quizAnswer === index.toString() ? 'selected' : ''}`}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setQuizAnswer(index.toString());
                                }}
                              >
                                {option}
                  </button>
              ))}
                          </div>
                          <button 
                            className="submit-quiz btn-primary"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleQuizSubmit(principle.id, parseInt(quizAnswer));
                            }}
                            disabled={quizAnswer === ''}
                          >
                            Submit Answer
                          </button>
            </div>
            )}
            
                      {quizResults[principle.id] && (
                        <div className={`quiz-result ${quizResults[principle.id].correct ? 'correct' : 'incorrect'}`}>
                          <p>{quizResults[principle.id].correct ? '✅ Correct!' : '❌ Incorrect'}</p>
                          <p>{principle.quiz.explanation}</p>
                  </div>
                )}
              </div>
            )}
              </div>
            )}
          </div>
          );
        })}
      </div>

      {canComplete && (
        <div className="step-completion">
          <div className="completion-message">
            <CheckCircle size={24} />
            <span>Excellent! You understand the principles of sound money!</span>
          </div>
          <button className="continue-button" onClick={onComplete}>
            Discover How Bitcoin Implements These Principles →
          </button>
        </div>
      )}
    </div>
  );
};

// Step 3: Bitcoin Solution Component
const BitcoinSolutionStep = ({ principles, onComplete }) => {
  const [selectedComparison, setSelectedComparison] = useState(null);

  const bitcoinComparisons = [
    {
      principle: 'scarcity',
      title: 'Fixed Supply vs Infinite Printing',
      fiat: 'Central banks can print unlimited money',
      bitcoin: '21 million Bitcoin maximum, coded into the protocol',
      advantage: 'Your Bitcoin can never be diluted by creating more'
    },
    {
      principle: 'durability',
      title: 'Digital vs Physical',
      fiat: 'Paper money deteriorates, gets lost, destroyed',
      bitcoin: 'Digital information, backed up across the globe',
      advantage: 'Your wealth storage method never deteriorates'
    },
    {
      principle: 'verifiability',
      title: 'Cryptographic Proof vs Trust',
      fiat: 'Must trust banks and governments to verify',
      bitcoin: 'Anyone can verify using mathematics',
      advantage: 'You never need to trust anyone to verify your money'
    }
  ];

    return (
    <div className="bitcoin-solution-step">
      <div className="step-header">
        <h2>Bitcoin as Sound Money</h2>
        <p>See how Bitcoin implements each sound money principle better than traditional currency.</p>
            </div>

      <div className="comparison-grid">
        {bitcoinComparisons.map((comparison, index) => (
          <div 
            key={comparison.principle}
            className={`comparison-card ${selectedComparison === index ? 'selected' : ''}`}
            onClick={() => setSelectedComparison(index)}
          >
            <h3>{comparison.title}</h3>
            
            <div className="comparison-content">
              <div className="fiat-side">
                <h4>💸 Traditional Money</h4>
                <p>{comparison.fiat}</p>
            </div>

              <div className="bitcoin-side">
                <h4>₿ Bitcoin</h4>
                <p>{comparison.bitcoin}</p>
          </div>
        </div>

            {selectedComparison === index && (
              <div className="advantage-section">
                <h4>🎯 Your Advantage:</h4>
                <p>{comparison.advantage}</p>
                </div>
            )}
                </div>
        ))}
                </div>

      <div className="bitcoin-summary">
        <div className="summary-card">
          <h3>🏆 The Bitcoin Advantage</h3>
          <p>
            Bitcoin is the first money in human history that combines all the properties of sound money 
            without requiring trust in any institution. It's designed to serve people, not power.
          </p>
          <ul>
            <li>✅ <strong>Scarce:</strong> 21 million maximum, impossible to change</li>
            <li>✅ <strong>Durable:</strong> Digital information that cannot be destroyed</li>
            <li>✅ <strong>Verifiable:</strong> Cryptographic proof, no trust required</li>
            <li>✅ <strong>Portable:</strong> Send anywhere instantly</li>
            <li>✅ <strong>Divisible:</strong> 100 million satoshis per Bitcoin</li>
            <li>✅ <strong>Fungible:</strong> Every Bitcoin is identical</li>
          </ul>
        </div>
                </div>
                
      <div className="step-completion">
        <button className="continue-button" onClick={onComplete}>
          Calculate Your Personal Impact →
        </button>
      </div>
    </div>
  );
};

// Step 4: Personal Impact Component
const PersonalImpactStep = ({ inflationAmount, inflationYears, onAmountChange, onYearsChange, calculateInflation, onComplete }) => {
  const inflationResult = calculateInflation(inflationAmount, inflationYears);

        return (
    <div className="personal-impact-step">
      <div className="step-header">
        <h2>Your Financial Future</h2>
        <p>Calculate how inflation affects your wealth and understand why sound money matters for your future.</p>
        </div>
      
      <div className="inflation-calculator">
        <div className="calculator-inputs">
          <h3>💰 Inflation Impact Calculator</h3>
          <div className="input-group">
            <label>Current Savings Amount:</label>
            <div className="input-with-symbol">
              <span>$</span>
              <input 
                type="number" 
                value={inflationAmount}
                onChange={(e) => onAmountChange(Number(e.target.value))}
                min="0"
                step="100"
              />
        </div>
      </div>
      
          <div className="input-group">
            <label>Time Period (years):</label>
            <input 
              type="range" 
              min="1" 
              max="30" 
              value={inflationYears}
              onChange={(e) => onYearsChange(Number(e.target.value))}
            />
            <span className="range-value">{inflationYears} years</span>
                </div>
      </div>

        <div className="calculator-results">
          <div className="result-card alarming">
            <h4>📉 With 3% Annual Inflation</h4>
            <div className="result-value">
              <span className="before">${inflationAmount.toLocaleString()}</span>
              <ArrowRight size={20} />
              <span className="after">${inflationResult.realValue}</span>
        </div>
            <p>Your ${inflationAmount.toLocaleString()} today will only buy ${inflationResult.realValue} worth of goods in {inflationYears} years</p>
            <div className="loss-highlight">
              <strong>{inflationResult.purchasing_power_lost}% purchasing power lost!</strong>
      </div>
    </div>
          
          <div className="result-card positive">
            <h4>📈 With Sound Money (Bitcoin)</h4>
            <div className="result-value">
              <span className="before">${inflationAmount.toLocaleString()}</span>
              <ArrowRight size={20} />
              <span className="after">${inflationAmount.toLocaleString()}+</span>
      </div>
            <p>Sound money maintains or increases purchasing power over time</p>
            <div className="gain-highlight">
              <strong>Purchasing power preserved!</strong>
      </div>
      </div>
    </div>
      </div>

      <div className="next-steps">
        <div className="next-steps-card">
          <h3>🚀 Your Journey Continues</h3>
          <p>
            Now you understand why money matters and how Bitcoin solves these problems. 
            Ready to dive deeper into Bitcoin's technology?
          </p>
          <div className="learning-path">
            <div className="next-module">
              <h4>Next: Bitcoin Basics</h4>
              <p>Learn how Bitcoin actually works under the hood</p>
        </div>
      </div>
        </div>
      </div>

      <div className="step-completion">
        <button className="continue-button" onClick={onComplete}>
          Complete Money Module & Continue to Bitcoin Basics →
        </button>
      </div>
    </div>
  );
};

export default MoneyModule; 