import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '../contexts/ProgressContext';
import { 
  ContinueButton, 
  ActionButton,
  OptionButton
} from '../components/ui';
import { ModuleCompletionButton, InteractiveIcon } from '../components/ui';
import '../components/ModuleCommon.css';

// Step 1: Money's Evolution - From Barter to Bitcoin
const MoneyEvolutionStory = ({ onComplete }) => {
  const [currentEra, setCurrentEra] = useState(0);
  const [userInsights, setUserInsights] = useState({});
  const [showTransition, setShowTransition] = useState(false);

  const evolutionEras = [
    {
      id: 'barter_problems',
      title: 'The Barter Dilemma',
      period: 'Pre-Money Societies',
      hook: 'Why did every civilization eventually abandon barter for money?',
      scenario: 'You\'re a blacksmith who needs grain. The farmer wants shoes, but you don\'t make shoes. The shoemaker wants tools, but you need your tools. The tool-maker wants grain...',
      challenge: 'The circular dependency trap: everyone needs what someone else has, but no one has what you need.',
      question: 'What fundamental problem does this reveal about direct exchange?',
      options: [
        { id: 'complexity', text: 'Too many people involved in every trade', insight: 'surface' },
        { id: 'timing', text: 'Everyone must want to trade at the exact same moment', insight: 'deeper' },
        { id: 'coincidence', text: 'Double coincidence of wants is mathematically unlikely', insight: 'core' },
        { id: 'trust', text: 'People don\'t trust each other enough', insight: 'secondary' }
      ],
      revelation: 'Barter requires perfect alignment of needs, timing, and value assessment - an impossible standard for complex societies.',
      impact: 'This is why barter societies remained small and simple. Complex civilization required a better solution.',
      transition: 'The breakthrough came when people discovered certain objects everyone would accept...'
    },
    {
      id: 'commodity_money',
      title: 'The Commodity Money Solution',
      period: '3000 BC - 1971 AD',
      hook: 'For 5,000 years, successful money was always backed by something real and scarce.',
      scenario: 'Civilizations tried shells, cattle, salt, silver, and gold. Through trial and error, they discovered what made good money: scarcity, durability, divisibility, portability, and verifiability.',
      challenge: 'Gold emerged as the ultimate commodity money because it perfectly balanced all the necessary properties.',
      question: 'Why did gold become the global standard across disconnected civilizations?',
      options: [
        { id: 'cultural', text: 'Similar cultures developed similar preferences', insight: 'naive' },
        { id: 'government', text: 'Governments coordinated to choose gold', insight: 'backwards' },
        { id: 'properties', text: 'Gold had objectively superior monetary properties', insight: 'core' },
        { id: 'availability', text: 'Gold was available everywhere', insight: 'incorrect' }
      ],
      revelation: 'Gold wasn\'t chosen because it was pretty - it became valuable because it solved the money problem better than anything else.',
      impact: 'The gold standard enabled the Industrial Revolution, global trade, and economic prosperity because people could save and plan for the future.',
      transition: 'But governments found gold\'s constraints limiting their spending desires...'
    },
    {
      id: 'fiat_experiment',
      title: 'The Great Monetary Experiment',
      period: '1971 - Present',
      hook: 'In 1971, humanity began the largest economic experiment in history.',
      scenario: 'President Nixon "temporarily" ended gold backing for the dollar. For the first time in 5,000 years, money was no longer constrained by physical scarcity.',
      challenge: 'This unleashed unlimited money creation, but also unlimited monetary expansion.',
      question: 'What was the inevitable result of removing scarcity constraints from money?',
      options: [
        { id: 'prosperity', text: 'Greater prosperity as money supply could grow with the economy', insight: 'naive' },
        { id: 'flexibility', text: 'More flexibility to respond to economic crises', insight: 'partial' },
        { id: 'debasement', text: 'Systematic debasement of savings through inflation', insight: 'core' },
        { id: 'stability', text: 'More stable and predictable monetary system', insight: 'contrary' }
      ],
      revelation: 'Without scarcity constraints, governments consistently expanded money supply faster than economic growth, transferring wealth from savers to debtors.',
      impact: 'Your purchasing power decline isn\'t a bug - it\'s a feature of unlimited money printing.',
      transition: 'This set the stage for the next evolutionary leap in money...'
    },
    {
      id: 'digital_revolution',
      title: 'The Digital Money Revolution',
      period: '2009 - Present', 
      hook: 'Bitcoin represents the fourth major evolution in money - combining the best of commodity money with digital efficiency.',
      scenario: 'For the first time, we have digital money with absolute scarcity - only 21 million Bitcoin will ever exist, enforced by mathematics rather than political promises.',
      challenge: 'Bitcoin solved the "double spend problem" that had prevented digital scarcity for decades.',
      question: 'What makes Bitcoin fundamentally different from previous digital money attempts?',
      options: [
        { id: 'encryption', text: 'Better encryption and security technology', insight: 'partial' },
        { id: 'decentralized', text: 'No central authority can manipulate the supply', insight: 'core' },
        { id: 'internet', text: 'Built for the internet age', insight: 'surface' },
        { id: 'popular', text: 'More popular than previous attempts', insight: 'circular' }
      ],
      revelation: 'Bitcoin recreates gold\'s scarcity properties in digital form while eliminating gold\'s physical limitations.',
      impact: 'This enables the benefits of sound money (savings protection, economic calculation) in a digital world.',
      transition: 'We\'re witnessing the emergence of the first truly sound digital money in human history.'
    }
  ];

  const currentEra_data = evolutionEras[currentEra];

  const handleInsight = (optionId) => {
    const option = currentEra_data.options.find(opt => opt.id === optionId);
    setUserInsights(prev => ({ ...prev, [currentEra_data.id]: { option, insight: option.insight } }));
    setShowTransition(true);
  };

  const handleNext = () => {
    if (currentEra < evolutionEras.length - 1) {
      setCurrentEra(currentEra + 1);
      setShowTransition(false);
    } else {
      onComplete(0);
    }
  };

  return (
    <div className="step-content evolution-story">
      <div className="module-header-box">
        <h2>📈 The Evolution of Money</h2>
        <div className="intro-text">
          <p className="prime-text">Money has evolved through four distinct eras. Understanding this progression reveals why Bitcoin represents a revolutionary advancement, not just another digital payment system.</p>
        </div>
      </div>
      
      <div className="content-text">
        <div className="evolution-era">
          <div className="era-header">
            <h3>{currentEra_data.title}</h3>
            <div className="era-period">{currentEra_data.period}</div>
          </div>
          
          <div className="era-hook">
            <p className="hook-text">{currentEra_data.hook}</p>
          </div>
          
          <div className="era-scenario">
            <h4>The Situation:</h4>
            <p>{currentEra_data.scenario}</p>
            
            <div className="era-challenge">
              <h5>Core Challenge:</h5>
              <p>{currentEra_data.challenge}</p>
            </div>
          </div>
          
          <div className="era-analysis">
            <h4>{currentEra_data.question}</h4>
            
            {!userInsights[currentEra_data.id] && (
              <div className="evolution-options">
                {currentEra_data.options.map(option => (
                  <button
                    key={option.id}
                    className={`evolution-option insight-${option.insight}`}
                    onClick={() => handleInsight(option.id)}
                  >
                    {option.text}
                  </button>
                ))}
              </div>
            )}
            
            {userInsights[currentEra_data.id] && (
              <div className="era-insight">
                <div className="user-choice">
                  <h4>Your Analysis: "{userInsights[currentEra_data.id].option.text}"</h4>
                  <div className={`insight-level insight-${userInsights[currentEra_data.id].insight}`}>
                    {userInsights[currentEra_data.id].insight === 'core' ? '🎯 Core insight!' :
                     userInsights[currentEra_data.id].insight === 'deeper' ? '💭 Deeper understanding' :
                     userInsights[currentEra_data.id].insight === 'partial' ? '⚖️ Partially correct' :
                     '🤷 Surface level'
                    }
                  </div>
                </div>
                
                <div className="era-revelation">
                  <h4>💡 The Reality:</h4>
                  <p>{currentEra_data.revelation}</p>
                </div>
                
                <div className="era-impact">
                  <h4>📊 Impact:</h4>
                  <p>{currentEra_data.impact}</p>
                </div>
                
                {showTransition && (
                  <div className="era-transition">
                    <h4>🔮 What This Led To:</h4>
                    <p>{currentEra_data.transition}</p>
                  </div>
                )}
                
                <ActionButton onClick={handleNext} className="continue-evolution">
                  {currentEra < evolutionEras.length - 1 ? 
                    `Next Era: ${evolutionEras[currentEra + 1].title} →` : 
                    'Understand Modern Challenges →'
                  }
                </ActionButton>
              </div>
            )}
          </div>
        </div>
        
        <div className="evolution-progress">
          <div className="progress-timeline">
            {evolutionEras.map((era, index) => (
              <div 
                key={era.id}
                className={`timeline-point ${
                  index === currentEra ? 'current' : 
                  index < currentEra ? 'completed' : 'upcoming'
                }`}
              >
                <div className="timeline-marker">{index + 1}</div>
                <div className="timeline-label">{era.title}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Step 2: Current System Problems - No Redundancy with BitcoinBasics
const CurrentSystemProblems = ({ onComplete }) => {
  const [currentProblem, setCurrentProblem] = useState(0);
  const [userRealization, setUserRealization] = useState(null);
  const [showSolution, setShowSolution] = useState(false);

  const systemProblems = [
    {
      id: 'wealth_transfer',
      title: 'The Hidden Wealth Transfer',
      hook: 'Every time new money is created, wealth is transferred from you to others - without your consent.',
      mechanism: 'When central banks create new money, they give it to governments and banks first. These first recipients can spend at current prices. By the time new money reaches you, prices have already risen.',
      example: 'Government creates $1 trillion. Banks get it first and buy assets at old prices. When your paycheck increases 6 months later, asset prices have already jumped 20%.',
      question: 'Who benefits most from new money creation?',
      options: [
        { id: 'everyone', text: 'Everyone benefits equally from economic growth', naive: true },
        { id: 'first_receivers', text: 'Those closest to money creation benefit first and most', correct: true },
        { id: 'workers', text: 'Workers benefit through higher wages', delayed: true },
        { id: 'savers', text: 'Savers benefit from more available capital', backwards: true }
      ],
      reality: 'This is called the "Cantillon Effect" - those closest to new money creation gain purchasing power at the expense of those furthest away.',
      impact: 'Your savings lose value not through market forces, but through systematic monetary expansion that benefits others first.'
    },
    {
      id: 'financial_surveillance',
      title: 'The End of Financial Privacy',
      hook: 'Every digital transaction creates a permanent record of your financial behavior.',
      mechanism: 'Banks, payment processors, and governments track every purchase, creating detailed profiles of your preferences, habits, and associations.',
      example: 'Your transaction data reveals when you wake up (coffee purchase), where you work (lunch locations), your health issues (pharmacy visits), your political views (donations), and your relationships (shared expenses).',
      question: 'Why does financial privacy matter?',
      options: [
        { id: 'nothing_to_hide', text: 'If you have nothing to hide, privacy doesn\'t matter', naive: true },
        { id: 'convenience', text: 'Privacy is less important than convenience', shortsighted: true },
        { id: 'freedom', text: 'Financial privacy is essential for personal freedom', correct: true },
        { id: 'criminals', text: 'Only criminals need financial privacy', authoritarian: true }
      ],
      reality: 'Financial surveillance enables social control, political persecution, and economic manipulation. Once privacy is lost, it\'s nearly impossible to regain.',
      impact: 'Central Bank Digital Currencies (CBDCs) will make current surveillance look primitive by comparison.'
    },
    {
      id: 'systemic_fragility',
      title: 'System-Wide Fragility',
      hook: 'The global financial system is more interconnected and fragile than ever before.',
      mechanism: 'Banks lend to each other, own each other\'s debt, and use similar risk models. When one major institution fails, it can trigger cascading failures throughout the system.',
      example: 'In 2023, Silicon Valley Bank collapsed in 48 hours. This triggered runs on other regional banks and required massive government intervention to prevent systemic collapse.',
      question: 'What makes the modern banking system particularly fragile?',
      options: [
        { id: 'bad_management', text: 'Poor management at individual banks', superficial: true },
        { id: 'interconnected', text: 'Extreme interconnectedness amplifies individual failures', correct: true },
        { id: 'complex', text: 'Systems are too complex to understand', partial: true },
        { id: 'regulated', text: 'Not enough regulation and oversight', misguided: true }
      ],
      reality: 'Interconnectedness that was supposed to distribute risk actually concentrates it. In the digital age, confidence can evaporate in hours, not days.',
      impact: 'Each crisis requires larger bailouts, more money printing, and greater moral hazard - making the next crisis even more severe.'
    }
  ];

  const currentProblem_data = systemProblems[currentProblem];

  const handleRealization = (optionId) => {
    const option = currentProblem_data.options.find(opt => opt.id === optionId);
    setUserRealization(option);
    setShowSolution(true);
  };

  const handleNext = () => {
    if (currentProblem < systemProblems.length - 1) {
      setCurrentProblem(currentProblem + 1);
      setUserRealization(null);
      setShowSolution(false);
    } else {
      onComplete(1);
    }
  };

  return (
    <div className="step-content system-problems">
      <div className="module-header-box">
        <h2>⚠️ Systemic Financial Problems</h2>
        <div className="intro-text">
          <p className="prime-text">The current financial system has fundamental structural problems that affect everyone. These aren't bugs - they're features of how the system operates.</p>
        </div>
      </div>
      
      <div className="content-text">
        <div className="problem-analysis">
          <h3>{currentProblem_data.title}</h3>
          
          <div className="problem-hook">
            <p className="hook-text">{currentProblem_data.hook}</p>
          </div>
          
          <div className="problem-mechanism">
            <h4>How It Works:</h4>
            <p>{currentProblem_data.mechanism}</p>
          </div>
          
          <div className="problem-example">
            <h4>Real Example:</h4>
            <p>{currentProblem_data.example}</p>
          </div>
          
          <div className="problem-question">
            <h4>{currentProblem_data.question}</h4>
            
            {!userRealization && (
              <div className="problem-options">
                {currentProblem_data.options.map(option => (
                  <button
                    key={option.id}
                    className={`problem-option ${
                      option.correct ? 'insightful' :
                      option.naive ? 'naive' :
                      option.partial ? 'partial' : 'misguided'
                    }`}
                    onClick={() => handleRealization(option.id)}
                  >
                    {option.text}
                  </button>
                ))}
              </div>
            )}
            
            {userRealization && showSolution && (
              <div className="problem-insight">
                <div className="user-realization">
                  <h4>Your Analysis: "{userRealization.text}"</h4>
                  <div className={`realization-feedback ${
                    userRealization.correct ? 'correct' :
                    userRealization.naive ? 'naive' :
                    userRealization.partial ? 'partial' : 'misguided'
                  }`}>
                    {userRealization.correct ? '✅ You understand the core issue' :
                     userRealization.partial ? '⚖️ Partially correct' :
                     userRealization.naive ? '🤔 This perspective misses the systemic nature' :
                     '❌ This misunderstands how the system operates'
                    }
                  </div>
                </div>
                
                <div className="problem-reality">
                  <h4>💡 The Systemic Reality:</h4>
                  <p>{currentProblem_data.reality}</p>
                </div>
                
                <div className="problem-impact">
                  <h4>📈 Long-term Impact:</h4>
                  <p>{currentProblem_data.impact}</p>
                </div>
                
                <ActionButton onClick={handleNext} className="continue-problems">
                  {currentProblem < systemProblems.length - 1 ? 
                    'Next Systemic Problem →' : 
                    'Explore Bitcoin\'s Solutions →'
                  }
                </ActionButton>
              </div>
            )}
          </div>
        </div>
        
        <div className="problems-progress">
          <div className="progress-dots">
            {systemProblems.map((_, index) => (
              <div 
                key={index}
                className={`progress-dot ${
                  index === currentProblem ? 'active' : 
                  index < currentProblem ? 'completed' : 'upcoming'
                }`}
              />
            ))}
          </div>
          <p>Problem {currentProblem + 1} of {systemProblems.length}</p>
        </div>
      </div>
    </div>
  );
};

// Step 3: Bitcoin's Systematic Solutions
const BitcoinSystemicSolutions = ({ onComplete }) => {
  const [currentSolution, setCurrentSolution] = useState(0);
  const [understandingSolution, setUnderstandingSolution] = useState(false);
  const [showComparison, setShowComparison] = useState(false);

  const bitcoinSolutions = [
    {
      id: 'fixed_supply',
      problem: 'Hidden Wealth Transfer via Money Printing',
      title: 'Mathematical Scarcity',
      explanation: 'Bitcoin has a hard cap of 21 million coins, enforced by mathematics and consensus, not political promises.',
      mechanism: 'New Bitcoin creation follows a predictable schedule that halves every four years, eventually reaching zero. No government, corporation, or individual can create more.',
      advantage: 'Your Bitcoin cannot be diluted by monetary expansion. If you own 1% of all Bitcoin, you will always own 1% of all Bitcoin.',
      comparison: {
        traditional: 'Money supply can expand infinitely based on political decisions',
        bitcoin: 'Money supply is mathematically fixed and auditable by anyone'
      },
      question: 'What does this mean for your long-term wealth preservation?',
      options: [
        { id: 'no_difference', text: 'No significant difference - inflation affects everything equally' },
        { id: 'protection', text: 'Bitcoin protects against monetary debasement by design' },
        { id: 'risky', text: 'Fixed supply makes Bitcoin too risky' },
        { id: 'deflationary', text: 'Deflationary money discourages spending' }
      ],
      insight: 'Bitcoin separates money from state, preventing the systematic wealth transfer that occurs through fiat monetary expansion.'
    },
    {
      id: 'financial_privacy',
      problem: 'Complete Financial Surveillance',
      title: 'Pseudonymous Transactions',
      explanation: 'Bitcoin transactions are recorded on a public ledger but are not directly linked to your identity.',
      mechanism: 'Bitcoin addresses are pseudonymous - like numbered bank accounts without names attached. With proper practices, you can maintain financial privacy.',
      advantage: 'You can transact without revealing your identity, location, or transaction history to third parties.',
      comparison: {
        traditional: 'Every transaction linked to your identity and stored indefinitely',
        bitcoin: 'Transactions are pseudonymous and can be made private with effort'
      },
      question: 'Why might financial privacy become more important over time?',
      options: [
        { id: 'unnecessary', text: 'Privacy is unnecessary if you\'re not doing anything wrong' },
        { id: 'essential', text: 'Financial privacy is essential for personal freedom and security' },
        { id: 'criminals', text: 'Only criminals need financial privacy' },
        { id: 'convenience', text: 'Convenience is more important than privacy' }
      ],
      insight: 'As governments expand surveillance and control, financial privacy becomes a human right, not a criminal tool.'
    },
    {
      id: 'decentralized_resilience',
      problem: 'System-Wide Fragility and Interconnectedness',
      title: 'Distributed Network Resilience',
      explanation: 'Bitcoin operates on a distributed network of thousands of independent nodes with no single point of failure.',
      mechanism: 'Bitcoin\'s network is designed to continue operating even if 90% of nodes go offline. No single entity can shut it down or manipulate it.',
      advantage: 'Your Bitcoin remains accessible and valuable even if banks fail, governments collapse, or payment networks break down.',
      comparison: {
        traditional: 'Centralized systems with single points of failure and cascading risk',
        bitcoin: 'Distributed system that becomes stronger as it grows'
      },
      question: 'What makes Bitcoin resilient compared to traditional financial systems?',
      options: [
        { id: 'technology', text: 'Better technology and encryption' },
        { id: 'decentralization', text: 'Decentralization eliminates single points of failure' },
        { id: 'popularity', text: 'More popular so more people will maintain it' },
        { id: 'government', text: 'Government backing makes it more secure' }
      ],
      insight: 'Bitcoin\'s antifragility comes from decentralization - it gets stronger from stresses that break centralized systems.'
    }
  ];

  const currentSolution_data = bitcoinSolutions[currentSolution];

  const handleUnderstanding = (optionId) => {
    setUnderstandingSolution(optionId);
    setShowComparison(true);
  };

  const handleNext = () => {
    if (currentSolution < bitcoinSolutions.length - 1) {
      setCurrentSolution(currentSolution + 1);
      setUnderstandingSolution(false);
      setShowComparison(false);
    } else {
      onComplete(2);
    }
  };

  return (
    <div className="step-content bitcoin-solutions">
      <div className="module-header-box">
        <h2>🟠 Bitcoin's Systematic Solutions</h2>
        <div className="intro-text">
          <p className="prime-text">Bitcoin doesn't just offer improvements - it provides systematic solutions to the fundamental problems of centralized monetary systems.</p>
        </div>
      </div>
      
      <div className="content-text">
        <div className="solution-analysis">
          <div className="problem-context">
            <h3>Problem: {currentSolution_data.problem}</h3>
          </div>
          
          <div className="solution-overview">
            <h3>Bitcoin Solution: {currentSolution_data.title}</h3>
            
            <div className="solution-explanation">
              <p>{currentSolution_data.explanation}</p>
            </div>
            
            <div className="solution-mechanism">
              <h4>How It Works:</h4>
              <p>{currentSolution_data.mechanism}</p>
            </div>
            
            <div className="solution-advantage">
              <h4>Your Advantage:</h4>
              <p>{currentSolution_data.advantage}</p>
            </div>
          </div>
          
          {!understandingSolution && (
            <div className="solution-question">
              <h4>{currentSolution_data.question}</h4>
              
              <div className="solution-options">
                {currentSolution_data.options.map(option => (
                  <button
                    key={option.id}
                    className="solution-option"
                    onClick={() => handleUnderstanding(option.id)}
                  >
                    {option.text}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {showComparison && (
            <div className="solution-comparison">
              <h4>🔍 System Comparison</h4>
              
              <div className="comparison-grid">
                <div className="traditional-system">
                  <h5>🏦 Traditional System</h5>
                  <p>{currentSolution_data.comparison.traditional}</p>
                </div>
                
                <div className="bitcoin-system">
                  <h5>🟠 Bitcoin System</h5>
                  <p>{currentSolution_data.comparison.bitcoin}</p>
                </div>
              </div>
              
              <div className="solution-insight">
                <h4>💡 Key Insight:</h4>
                <p>{currentSolution_data.insight}</p>
              </div>
              
              <ActionButton onClick={handleNext} className="continue-solutions">
                {currentSolution < bitcoinSolutions.length - 1 ? 
                  'Next Systematic Solution →' : 
                  'Complete Understanding →'
                }
              </ActionButton>
            </div>
          )}
        </div>
        
        <div className="solutions-progress">
          <div className="progress-dots">
            {bitcoinSolutions.map((_, index) => (
              <div 
                key={index}
                className={`progress-dot ${
                  index === currentSolution ? 'active' : 
                  index < currentSolution ? 'completed' : 'upcoming'
                }`}
              />
            ))}
          </div>
          <p>Solution {currentSolution + 1} of {bitcoinSolutions.length}</p>
        </div>
      </div>
    </div>
  );
};

// Module Completion Component
const RelevanceCompletion = ({ onComplete }) => {
  return (
    <div className="step-content completion-step">
      <div className="module-header-box">
        <h2>🎯 Bitcoin Relevance: Complete</h2>
        <div className="intro-text">
          <p className="prime-text">You now understand why Bitcoin isn't just another digital payment system - it's a systematic solution to fundamental monetary problems.</p>
        </div>
      </div>
      
      <div className="completion-content">
        <div className="key-understanding">
          <h3>🔑 Key Understanding Achieved</h3>
          
          <div className="understanding-points">
            <div className="understanding-item">
              <h4>📈 Money Evolution Context</h4>
              <p>Bitcoin represents the natural next step in money's evolution - combining commodity money's scarcity with digital efficiency.</p>
            </div>
            
            <div className="understanding-item">
              <h4>⚠️ Systemic Problem Awareness</h4>
              <p>Current monetary systems have structural problems that systematically transfer wealth and erode financial privacy.</p>
            </div>
            
            <div className="understanding-item">
              <h4>🛡️ Bitcoin's Systematic Solutions</h4>
              <p>Bitcoin addresses these problems through mathematical scarcity, pseudonymous transactions, and decentralized resilience.</p>
            </div>
          </div>
        </div>
        
        <div className="next-journey">
          <h3>📚 Your Learning Path Forward</h3>
          <p>Now that you understand Bitcoin's relevance, you're ready to address common misconceptions and deepen your technical understanding.</p>
          
          <div className="upcoming-modules">
            <div className="upcoming-module">
              <h4>🔍 Next: Bitcoin Myths & Facts</h4>
              <p>Develop critical thinking skills to evaluate Bitcoin claims and separate fact from fiction.</p>
            </div>
            
            <div className="upcoming-module">
              <h4>💰 Then: Understanding Money</h4>
              <p>Deep dive into monetary theory and economic principles that make Bitcoin significant.</p>
            </div>
          </div>
        </div>
        
        <ModuleCompletionButton 
          moduleName="Bitcoin Relevance"
          moduleId="bitcoin-relevance"
          customMessage="🚀 Excellent! You understand why Bitcoin matters in today's financial landscape!"
        />
      </div>
    </div>
  );
};

const WhyBitcoinMattersModule = () => {
  const { completeModule } = useProgress();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(() => {
    const saved = localStorage.getItem('whyBitcoinMattersCompletedSteps');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  const handleStepComplete = (stepIndex) => {
    const newCompletedSteps = new Set(completedSteps).add(stepIndex);
    setCompletedSteps(newCompletedSteps);
    
    // Save to localStorage
    try {
      localStorage.setItem('whyBitcoinMattersCompletedSteps', JSON.stringify(Array.from(newCompletedSteps)));
    } catch (error) {
      console.warn('Failed to save progress to localStorage:', error);
    }
    
    // Move to next step or complete module
    if (stepIndex < 3) {
      setCurrentStep(stepIndex + 1);
    } else {
      setCurrentStep(stepIndex + 1);
    }
  };

  const handleTabClick = (stepIndex) => {
    setCurrentStep(stepIndex);
  };

  return (
    <div className="module-container">
      {/* HERO SECTION */}
      <div className="module-header">
        <div className="module-title">
          <div className="module-icon">
            <InteractiveIcon type="bitcoin" size={48} className="module-icon-bitcoin" />
          </div>
          Why Bitcoin Matters Today
        </div>
        <div className="module-subtitle">
          Understand Bitcoin's role in monetary evolution and systematic solutions to financial problems
        </div>
      </div>
      
      {/* NAVIGATION STEPS */}
      <div className="section-card">
        <h3 className="nav-section-title">Learning Path</h3>
        <div className="step-navigation-container">
          <div className="step-navigation-scroll">
            {["Money Evolution", "System Problems", "Bitcoin Solutions", "Complete"].map((step, index) => (
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
      
      <div className="module-content">
        {currentStep === 0 && <MoneyEvolutionStory onComplete={handleStepComplete} />}
        {currentStep === 1 && <CurrentSystemProblems onComplete={handleStepComplete} />}
        {currentStep === 2 && <BitcoinSystemicSolutions onComplete={handleStepComplete} />}
        {currentStep === 3 && <RelevanceCompletion onComplete={handleStepComplete} />}
      </div>
    </div>
  );
};

export default WhyBitcoinMattersModule;
