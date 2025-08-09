import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '../contexts/ProgressContext';
import { 
  ContinueButton, 
  ActionButton,
  StepNavigation
} from '../components/EnhancedButtons';
import { ModuleCompletionButton } from '../components/ui';
// Import new visual system components
import { 
  BitcoinIcon
} from '../components/ui/SVGIcons';
import MoneyPredictionChart from '../components/MoneyPredictionChart';
import Introduction from '../components/Introduction';
import MortgageQuiz from '../components/MortgageQuiz';
import ControlScenarios from '../components/ControlScenarios';
import MoneyEvolutionTimeline from '../components/MoneyEvolutionTimeline';
// Import page components for state-based flow
// All components are defined locally
// import MoneyFunctions from '../pages/MoneyFunctions';
// import PaymentInfrastructure from '../pages/PaymentInfrastructure';
import DigitalScarcity from '../pages/DigitalScarcity';
// import MoneyExperiments from '../pages/MoneyExperiments';
// import MoneyScorecard from '../pages/MoneyScorecard';
// import ApplyScorecard from '../pages/ApplyScorecard';
// Using InteractiveIcon for all visual elements - no more GIFs or Lottie
import '../components/ModuleCommon.css';
// Using global CSS only - no module-specific overrides

// Step labels for consistent navigation
const stepLabels = [
  'Introduction',
  'Why Money?',
  'What Money Must Do',
  'Time vs Money',
  'How Modern Money Works', 
  'Sound Money Framework',
  'Apply Your Framework'
];


// Local components removed - now using imported page components

// Main Module Component
// WhyMoney component - Combined comprehensive lesson
const WhyMoney = ({ onComplete }) => {
  const [stage, setStage] = useState(0); // 0: intro, 1: comprehensive scenario, 2: conclusion
  const [playerChoices, setPlayerChoices] = useState([]);
  const [allProblems, setAllProblems] = useState(new Set());

  const handleAnswer = (problemType, isCorrect) => {
    if (isCorrect) {
      setAllProblems(prev => new Set([...prev, problemType]));
    }
    setPlayerChoices(prev => [...prev, { problemType, isCorrect }]);
  };

  const handleNextStage = () => {
    setStage(prev => prev + 1);
  };

  if (stage === 0) {
    return (
      <div className="module-container">
        <div className="section-card">
          <h1 className="heading-critical">Why Money?</h1>
          <p>Before we explore how money works today, let's understand why it exists at all.</p>
          <p>Imagine a world without money. How would you get the things you need?</p>
        </div>
        
        <div className="card-feature">
          <h2 className="heading-high">The Challenge</h2>
          <p>You're a skilled baker in a village without money. You make amazing bread, but you need shoes for winter. The shoemaker needs a roof repair, the carpenter needs medicine, and the herbalist needs... bread.</p>
          
          <div className="scenario-setup">
            <h3>Your Mission</h3>
            <p>Trade your bread for shoes. Sounds simple? Let's see what actually happens in a barter world.</p>
          </div>
          
          <ActionButton onClick={handleNextStage} variant="primary">
            Start Trading →
          </ActionButton>
        </div>
      </div>
    );
  }

  if (stage === 1) {
    return (
      <ComprehensiveBarterScenario 
        onAnswer={handleAnswer}
        onComplete={handleNextStage}
        discoveredProblems={allProblems}
      />  
    );
  }

  // Conclusion stage
  return (
    <div className="module-container">
      <div className="section-card">
        <h1 className="heading-critical">💡 The Big Realization</h1>
        <p>You've discovered why every civilization eventually invented money!</p>
      </div>
      
      <div className="card-feature">
        <h2 className="heading-high">The Problems You Found</h2>
        <div className="problems-discovered">
          {Array.from(allProblems).map(problem => (
            <div key={problem} className="problem-insight">
              <span className="problem-icon">✓</span>
              <div className="problem-details">
                <h4>{problemLabels[problem]}</h4>
                <p>{problemExplanations[problem]}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="concept-card">
          <h3>🚀 The Solution: Money</h3>
          <p>Money solved all these problems by creating something everyone would accept in trade. This wasn't invented by governments—people created it because they desperately needed it.</p>
          
          <div className="key-insight">
            <h4>Key Insight</h4>
            <p>Money isn't just convenient—it's essential for complex civilization. Without it, we'd still be living in small villages, limited by what we could trade directly.</p>
          </div>
        </div>
        
        <ActionButton onClick={() => onComplete(1)} variant="primary">
          Now Let's See What Money Must Do →
        </ActionButton>
      </div>
    </div>
  );
};

// Comprehensive barter scenario combining all problems into one experience
const ComprehensiveBarterScenario = ({ onAnswer, onComplete, discoveredProblems }) => {
  const [step, setStep] = useState(0);
  const [choices, setChoices] = useState([]);
  
  const scenarioSteps = [
    {
      title: "🍞 First Attempt: Direct Trade",
      situation: "You approach the shoemaker with your fresh bread.",
      dialogue: "'Nice bread,' says the shoemaker, 'but I already have plenty. I need my roof fixed.'",
      question: "What's the core problem?",
      options: [
        { text: "The shoemaker doesn't appreciate good bread", correct: false },
        { text: "You need to find someone who wants bread AND has shoes", correct: false },
        { text: "Both people must want what the other has, at the same time", correct: true, problem: "coincidence" }
      ],
      insight: "This is called the 'double coincidence of wants' problem—the foundation of why barter is so difficult."
    },
    {
      title: "🔗 Second Attempt: Chain Trading",  
      situation: "You decide to create a trade chain: bread → roof repair → shoes.",
      dialogue: "You find a carpenter who wants bread and can fix roofs. But when you both go to the shoemaker, he says: 'I need medicine, not roof repair.'",
      question: "What makes this even harder?", 
      options: [
        { text: "You need too many different people", correct: false },
        { text: "Coordinating multiple people creates fragile chains", correct: true, problem: "complexity" },
        { text: "Everyone is being unreasonable", correct: false }
      ],
      insight: "Trade chains are fragile—if any link breaks, the entire sequence fails. More people = more failure points."
    },
    {
      title: "⏰ Third Attempt: Timing Issues",
      situation: "You finally arrange a 4-person trade chain, but...",
      dialogue: "By the time you coordinate everyone, the herbalist has already traded her medicine. 'Come back next month,' she says.",
      question: "What does this reveal?",
      options: [
        { text: "You should have moved faster", correct: false },
        { text: "Everyone must be ready to trade at exactly the same moment", correct: true, problem: "timing" },
        { text: "People can't be trusted", correct: false }
      ],
      insight: "Barter requires impossible synchronization. Everyone must want to trade at the exact same moment—nearly impossible to coordinate."
    },
    {
      title: "💔 The Fundamental Problem",
      situation: "After weeks of trying, you realize the deeper issue.",
      dialogue: "Even when trades work, you can't save extra bread (it spoils), can't easily compare values (is 1 shoe = 3 loaves or 5?), and every transaction requires finding exact matches.",
      question: "What does this tell us about trade without money?",
      options: [
        { text: "It works fine with patience", correct: false },
        { text: "The whole system is fundamentally flawed for complex societies", correct: true, problem: "system" },
        { text: "People just need to be more flexible", correct: false }
      ],
      insight: "Barter can't support complex civilization. It limits communities to small, simple economies where everyone knows everyone."
    }
  ];
  
  const currentStep = scenarioSteps[step];
  
  return (
    <div className="module-container">
      <div className="section-card">
        <h1 className="heading-critical">The Great Barter Experiment</h1>
        <p>Step {step + 1} of {scenarioSteps.length}: Let's see what happens when you try to trade...</p>
      </div>
      
      <div className="card-feature">
        <h2 className="heading-high">{currentStep.title}</h2>
        
        <div className="scenario-content">
          <div className="situation-box">
            <h3>What's Happening</h3>
            <p>{currentStep.situation}</p>
          </div>
          
          <div className="dialogue-box">
            <p><em>{currentStep.dialogue}</em></p>
          </div>
          
          <div className="question-section">
            <h4>{currentStep.question}</h4>
            
            {!choices[step] && (
              <div className="quiz-options">
                {currentStep.options.map((option, index) => (
                  <ActionButton
                    key={index}
                    onClick={() => {
                      const newChoices = [...choices];
                      newChoices[step] = option;
                      setChoices(newChoices);
                      onAnswer(option.problem, option.correct);
                    }}
                    variant="outline"
                  >
                    {option.text}
                  </ActionButton>
                ))}
              </div>
            )}
            
            {choices[step] && (
              <div className={`quiz-feedback ${choices[step].correct ? 'correct' : 'incorrect'}`}>
                <div className="feedback-text">
                  <p>{choices[step].correct ? '✅ Exactly right!' : '❌ Not quite.'}</p>
                  <div className="insight-box">
                    <strong>💡 Key Learning:</strong> {currentStep.insight}
                  </div>
                </div>
                
                <ActionButton 
                  onClick={() => {
                    if (step < scenarioSteps.length - 1) {
                      setStep(step + 1);
                    } else {
                      onComplete();
                    }
                  }}
                  variant="primary"
                >
                  {step < scenarioSteps.length - 1 ? 'Continue the Experiment →' : 'See What You Discovered →'}
                </ActionButton>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const problemLabels = {
  "coincidence": "Double Coincidence of Wants",
  "complexity": "Coordination Complexity", 
  "timing": "Perfect Timing Required",
  "system": "Systematic Failure"
};

const problemExplanations = {
  "coincidence": "Both parties must want exactly what the other has, at the same time. This is mathematically unlikely.",
  "complexity": "Multiple-party trades create fragile chains where any single failure breaks the entire sequence.",
  "timing": "Everyone involved must be ready to trade at the exact same moment, which is nearly impossible to coordinate.",
  "system": "The fundamental limitations make barter unsuitable for anything beyond simple, small-scale economies."
};


// Renamed: MoneySuperpowers -> MoneyFunctions
const MoneyFunctions = ({ onComplete }) => {
  const [currentScenario, setCurrentScenario] = useState(0);
  const [answers, setAnswers] = useState({});
  const [feedback, setFeedback] = useState({});
  const [unlockedFunctions, setUnlockedFunctions] = useState([]);
  const [showMortgageQuiz, setShowMortgageQuiz] = useState(false);

  const scenarios = [
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
      feedback: {
        1: "✓ Right! Money makes trades easy because everyone accepts it.",
        2: "Not quite - you're using it now, not storing it.",
        3: "Close, but the main job here is making the exchange work."
      },
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
      feedback: {
        1: "Not quite - you're not trading right now, you're saving.",
        2: "✓ Exactly! Money lets you save up value for later.",
        3: "That's another job of money, but not what's happening here."
      },
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
      feedback: {
        1: "You're not trading yet - just comparing.",
        2: "You're not storing value - you're comparing prices.",
        3: "✓ Perfect! Money gives you a standard way to measure and compare value."
      },
      correctAnswer: 3,
      moneyFunction: 'Unit of Account',
      explanation: "Money's third job is measuring value. It gives everyone the same ruler to compare prices."
    }
  ];

  const handleAnswer = (questionId, value) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));

    const scenario = scenarios.find(s => s.id === questionId);
    setFeedback(prev => ({
      ...prev,
      [questionId]: scenario.feedback[value]
    }));

    if (value === scenario.correctAnswer) {
      setUnlockedFunctions(prev => [...prev, scenario.moneyFunction]);
    }

    // Always progress after showing feedback, regardless of correctness
    setTimeout(() => {
      if (currentScenario < scenarios.length - 1) {
        setCurrentScenario(currentScenario + 1);
      } else {
        setTimeout(() => setShowMortgageQuiz(true), 3000); // Show MortgageQuiz
      }
    }, 2000);
  };

  const currentScenarioData = scenarios[currentScenario];
  
  return (
    <div className="module-container">
      {showMortgageQuiz ? (
        <MortgageQuiz onContinue={() => onComplete(2)} />
      ) : (
        <>
          <div className="section-card">
            <h1 className="heading-critical">Money Functions</h1>
            <p>Money has three main jobs. Let's look at some everyday examples to understand each one.</p>
          </div>

          <div className="scenario-progress">
            <div className="progress-indicators">
              {scenarios.map((_, index) => (
                <div 
                  key={index} 
                  className={`indicator ${index === currentScenario ? 'current' : ''} ${index < currentScenario ? 'completed' : ''}`}
                >
                  {index < currentScenario ? '✅' : index + 1}
                </div>
              ))}
            </div>
          </div>

          <div className="current-scenario">
            <h3>{currentScenarioData.title}</h3>
            <p className="scenario-description">{currentScenarioData.description}</p>
            <p className="scenario-question"><strong>{currentScenarioData.question}</strong></p>
            
            {!feedback[currentScenarioData.id] && (
              <div className="quiz-options">
                {currentScenarioData.options.map(option => (
                  <ActionButton
                    key={option.value}
                    onClick={() => handleAnswer(currentScenarioData.id, option.value)}
                    variant="outline"
                  >
                    <span className="option-text">{option.label}</span>
                  </ActionButton>
                ))}
              </div>
            )}

            {feedback[currentScenarioData.id] && (
              <div className={`quiz-feedback ${feedback[currentScenarioData.id].includes('✓') ? 'correct' : 'incorrect'}`}>
              {feedback[currentScenarioData.id].includes('✓') ? (
                <div className="feedback-text">
                  <p>✅ <strong>Excellent!</strong> You identified the correct function.</p>
                  <div className="correct-answer">
                    <strong>Money's Job:</strong> {currentScenarioData.moneyFunction}
                  </div>
                  <div className="trait-unlocked">
                    <p><strong>💡 Key Learning:</strong> {currentScenarioData.explanation}</p>
                  </div>
                </div>
              ) : (
                <div className="feedback-text">
                  <p>❌ <strong>Not quite.</strong></p>
                  <div className="incorrect-answer">
                    <strong>The correct function is:</strong> {currentScenarioData.moneyFunction}
                  </div>
                  <div className="correct-answer">
                    <strong>💡 Key Learning:</strong> {currentScenarioData.explanation}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {unlockedFunctions.length === 3 && (
          <div className="analysis-complete">
            <h3>✅ All Three Jobs Found!</h3>
            <p>Great! Now you understand what money needs to do. Let's see how well current money does these jobs.</p>
          </div>
        )}
        </>
      )}
    </div>
  );
};

// Time Preference and Opportunity Cost Interactive Lesson
const TimeAndMoneyLesson = ({ onComplete }) => {
  const [currentScenario, setCurrentScenario] = useState(() => {
    const saved = localStorage.getItem('timeAndMoneyLesson_currentScenario');
    return saved ? parseInt(saved) : 0;
  });
  const [playerChoices, setPlayerChoices] = useState(() => {
    const saved = localStorage.getItem('timeAndMoneyLesson_playerChoices');
    return saved ? JSON.parse(saved) : {};
  });
  const [showInsights, setShowInsights] = useState(false);
  const [completedScenarios, setCompletedScenarios] = useState(() => {
    const saved = localStorage.getItem('timeAndMoneyLesson_completedScenarios');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });
  
  const scenarios = [
    {
      id: 1,
      title: "🎯 The Weekend Choice",
      situation: "It's Friday evening. You just got paid $400 for a week of hard work at your part-time job.",
      context: "Your friends are planning an expensive weekend trip that costs $300. It would be amazing fun, and you'd create great memories. But you've also been saving for a new laptop that costs $800 - you'd need it for school and potential freelance work.",
      question: "What do you choose?",
      options: [
        { 
          id: 'immediate', 
          text: "Take the trip now - life is short and you deserve fun after working hard!", 
          timePreference: "high",
          consequence: "You have an amazing weekend but are back to $100 savings. The laptop dream is pushed back months."
        },
        { 
          id: 'delayed', 
          text: "Skip the trip, save the money - you're halfway to your laptop goal!", 
          timePreference: "low",
          consequence: "You miss out on the trip but now have $500 saved. Just 3 more paychecks until your laptop!"
        }
      ],
      insight: "This choice reveals your **time preference** - how much you value immediate pleasure vs. future benefits. Neither choice is 'wrong', but they lead to very different outcomes.",
      moneyInsight: "Money lets you store your work (time) and move it to the future. Without money, your 40 hours of work this week would be gone forever."
    },
    {
      id: 2,
      title: "⚖️ The Opportunity Trade-off",
      situation: "You have $1,000 saved up from months of work. Three opportunities appear at once:",
      context: "Option A: A course that teaches valuable skills ($800) - could help you earn more later\nOption B: A reliable used car ($900) - would save you 2 hours of commuting daily\nOption C: Keep saving for a down payment on an apartment ($1000+) - would mean independence",
      question: "You can only choose one. What matters most?",
      options: [
        { 
          id: 'skills', 
          text: "Invest in the course - skills pay dividends forever", 
          opportunity: "Better earnings potential, but still dealing with long commutes and living at home",
          consequence: "You gain valuable skills and earn 20% more within 6 months, but still have transportation and housing challenges."
        },
        { 
          id: 'transport', 
          text: "Buy the car - time is money, and 2 hours daily is huge", 
          opportunity: "More time and freedom, but delayed skill development and apartment goals",
          consequence: "You save 14 hours per week (728 hours/year!) and can take jobs farther away, but other goals are delayed."
        },
        { 
          id: 'housing', 
          text: "Keep saving for the apartment - independence is priceless", 
          opportunity: "Future independence, but continued transportation costs and current skill level",
          consequence: "You're 6 months closer to having your own place, but still dealing with commute time and current income level."
        }
      ],
      insight: "This is **opportunity cost** - every choice means giving up other opportunities. There's no 'free' choice - everything has a trade-off.",
      moneyInsight: "Money represents stored work and time. When you spend it on one thing, you're choosing NOT to spend that time/work on something else."
    },
    {
      id: 3,
      title: "💰 The Value Storage Challenge",
      situation: "You've been working part-time for a year and saved $2,000. Your grandmother gives you advice:",
      context: "Grandma: 'When I was your age, $2,000 could buy a decent used car. Now it barely covers a semester of textbooks. Money doesn't hold its value like it used to.'\n\nYou start thinking: If money loses value over time, what's the point of saving?",
      question: "What's really happening here?",
      options: [
        { 
          id: 'prices', 
          text: "Everything just costs more now - that's normal", 
          understanding: "surface",
          consequence: "You accept that 'things cost more' but don't understand why your savings lose buying power."
        },
        { 
          id: 'money_printing', 
          text: "Someone is creating more money, making each dollar worth less", 
          understanding: "deeper",
          consequence: "You realize that when more money is created, your saved money can buy less. Your work is being diluted."
        },
        { 
          id: 'just_save_more', 
          text: "I need to work harder and save faster than prices rise", 
          understanding: "reactive",
          consequence: "You're in a race against inflation, working harder just to maintain the same purchasing power."
        }
      ],
      insight: "When money is created faster than goods and services, each unit becomes less valuable. Your stored work (savings) buys less over time.",
      moneyInsight: "Good money should preserve the value of your work over time. If it doesn't, you're forced to spend immediately or find other ways to store value."
    },
    {
      id: 4,
      title: "🔄 The Time-Money Connection",
      situation: "After thinking about your grandmother's advice, you have a realization:",
      context: "You work 20 hours per week at $15/hour = $300 per week\nThat's 20 hours of your life, your energy, your time\nWhen you save that $300, you're essentially storing those 20 hours\nWhen prices rise but your savings don't, those 20 hours become worth less",
      question: "What is money really?",
      options: [
        { 
          id: 'paper', 
          text: "Money is paper/digital numbers that represents value", 
          depth: "surface",
          consequence: "You see money as an abstract concept, missing its deeper connection to human effort."
        },
        { 
          id: 'stored_time', 
          text: "Money is stored time and work - it represents hours of my life", 
          depth: "profound",
          consequence: "You understand that money = your life energy. When money loses value, your time is being stolen."
        },
        { 
          id: 'tool', 
          text: "Money is a useful tool for buying things I want or need", 
          depth: "practical",
          consequence: "You see money's utility but miss the deeper truth about what it represents."
        }
      ],
      insight: "Money is crystallized time and work. When you earn $300, you're trading 20 hours of your life for that money. When money loses value, your life energy loses value.",
      moneyInsight: "This is why **good money matters**. It's not just about economics - it's about preserving the value of human time and effort. Bad money steals your life energy."
    }
  ];
  
  const currentScenarioData = scenarios[currentScenario];
  
  // Save progress automatically
  useEffect(() => {
    localStorage.setItem('timeAndMoneyLesson_currentScenario', currentScenario.toString());
  }, [currentScenario]);
  
  useEffect(() => {
    localStorage.setItem('timeAndMoneyLesson_playerChoices', JSON.stringify(playerChoices));
  }, [playerChoices]);
  
  useEffect(() => {
    localStorage.setItem('timeAndMoneyLesson_completedScenarios', JSON.stringify(Array.from(completedScenarios)));
  }, [completedScenarios]);
  
  const handleChoice = (optionId) => {
    const option = currentScenarioData.options.find(opt => opt.id === optionId);
    setPlayerChoices(prev => ({
      ...prev,
      [currentScenarioData.id]: option
    }));
    setCompletedScenarios(prev => new Set([...prev, currentScenarioData.id]));
    setShowInsights(true);
  };
  
  const handleNext = () => {
    if (currentScenario < scenarios.length - 1) {
      setCurrentScenario(currentScenario + 1);
      setShowInsights(false);
    } else {
      // All scenarios completed - move to final summary
      setCurrentScenario(scenarios.length);
      setShowInsights(false);
    }
  };
  
  const handleComplete = () => {
    onComplete(3); // Move to step 4 (How Modern Money Works)
  };
  
  if (currentScenario >= scenarios.length) {
    // Final summary
    return (
      <div className="module-container">
        <div className="section-card">
          <h1 className="heading-critical">💡 The Big Picture</h1>
          <p>You've discovered the fundamental connection between time, work, and money.</p>
        </div>
        
        <div className="card-feature">
          <h2 className="heading-high">What You've Learned</h2>
          
          <div className="concept-card">
            <h3>🕐 Money = Time</h3>
            <p>Every dollar you earn represents hours of your life. When you work 8 hours at $20/hour, you're trading 8 hours of your existence for $160.</p>
          </div>
          
          <div className="concept-card">
            <h3>⚖️ Every Choice Has a Cost</h3>
            <p>When you spend money, you're not just spending dollars - you're spending the time you worked to earn those dollars. That $100 dinner is 5 hours of work.</p>
          </div>
          
          <div className="concept-card">
            <h3>⏳ Time Preference Shapes Your Future</h3>
            <p>Choosing immediate pleasure vs. future benefit determines your life path. Both are valid, but they lead to very different outcomes.</p>
          </div>
          
          <div className="concept-card">
            <h3>🔒 Good Money Preserves Your Work</h3>
            <p>Money should store the value of your work over time. When money loses value, your past work becomes worth less - your time is being stolen.</p>
          </div>
          
          <div className="insight-box">
            <strong>💡 Key Insight:</strong> Now you understand why the quality of money matters. It's not just about economics - it's about preserving the value of your life energy and work.
          </div>
          
          <ActionButton onClick={handleComplete} variant="primary">
            Now Let's See How Modern Money Measures Up →
          </ActionButton>
        </div>
      </div>
    );
  }
  
  return (
    <div className="module-container">
      <div className="section-card">
        <h1 className="heading-critical">Time vs Money</h1>
        <p>Before we explore how modern money works, let's understand what money really represents.</p>
        
        <div className="scenario-progress">
          <p>Scenario {currentScenario + 1} of {scenarios.length}</p>
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: `${((currentScenario + 1) / scenarios.length) * 100}%` }}
            />
          </div>
        </div>
      </div>
      
      <div className="card-feature">
        <h2 className="heading-high">{currentScenarioData.title}</h2>
        
        <div className="scenario-content">
          <div className="situation-box">
            <h3>The Situation</h3>
            <p>{currentScenarioData.situation}</p>
            <div className="context-details">
              <p>{currentScenarioData.context}</p>
            </div>
          </div>
          
          {!showInsights && (
            <>
              <h4>{currentScenarioData.question}</h4>
              <div className="quiz-options">
                {currentScenarioData.options.map(option => (
                  <ActionButton
                    key={option.id}
                    onClick={() => handleChoice(option.id)}
                    variant="outline"
                    className="scenario-option"
                  >
                    {option.text}
                  </ActionButton>
                ))}
              </div>
            </>
          )}
          
          {showInsights && playerChoices[currentScenarioData.id] && (
            <div className="quiz-feedback correct">
              <div className="feedback-text">
                <h4>Your Choice:</h4>
                <p><strong>{playerChoices[currentScenarioData.id].text}</strong></p>
                
                <h4>What Happens:</h4>
                <p>{playerChoices[currentScenarioData.id].consequence}</p>
                
                <div className="insight-box">
                  <strong>💡 Key Learning:</strong> {currentScenarioData.insight}
                </div>
                
                <div className="insight-box">
                  <strong>🏦 Money Connection:</strong> {currentScenarioData.moneyInsight}
                </div>
              </div>
              
              <ActionButton onClick={handleNext} variant="primary">
                {currentScenario < scenarios.length - 1 ? 'Next Scenario →' : 'See the Big Picture →'}
              </ActionButton>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Renamed: PaymentPlumbing -> PaymentInfrastructure
const PaymentInfrastructure = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showAnimation, setShowAnimation] = useState(false);
  const [showControl, setShowControl] = useState(false);
  const [showFinalInsight, setShowFinalInsight] = useState(false);

  const paymentSteps = [
    {
      title: "📱 You Swipe Your Card",
      description: "Seems instant, right?",
      detail: "You tap your card at the coffee shop. The screen says 'Approved!' in 2 seconds.",
      hidden: "But 6 different companies just processed this transaction across 3 different countries..."
    },
    {
      title: "🏪 Coffee Shop → Acquirer",
      description: "First stop: Payment processor",
      detail: "Your transaction data goes to the shop's payment processor (like Square or Stripe).",
      hidden: "Fee #1: Processing fee (2.9% + $0.30 per transaction)"
    },
    {
      title: "🏦 Acquirer → Card Network",
      description: "Second stop: Visa/Mastercard",
      detail: "The processor sends your transaction to Visa/Mastercard for authorization.",
      hidden: "Fee #2: Network fee (0.1-0.2% of transaction)"
    },
    {
      title: "🏛️ Card Network → Your Bank",
      description: "Third stop: Authorization",
      detail: "Visa asks your bank: 'Does this person have $5 and are they allowed to spend it?'",
      hidden: "Your bank checks: Account balance, spending limits, fraud patterns, geographic location..."
    },
    {
      title: "✅ Your Bank → Back Through the Chain",
      description: "Fourth stop: Approval flows back",
      detail: "Your bank says 'Yes' and the approval flows back through all the middlemen.",
      hidden: "This whole authorization took 1-2 seconds, but no money has actually moved yet."
    },
    {
      title: "💸 Settlement (The Real Money Movement)",
      description: "Final stop: Money actually moves (later)",
      detail: "The coffee shop gets their money in 1-3 business days through a separate settlement process.",
      hidden: "Fee #3: Settlement fee, currency conversion fees, chargebacks... Total fees can be 3-5% of transaction."
    }
  ];

  const handleNext = () => {
    if (currentStep < paymentSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else if (!showFinalInsight) {
      setShowFinalInsight(true);
      // Automatically launch ControlScenarios after 3 seconds
      setTimeout(() => {
        setShowControl(true);
      }, 3000);
    } else if (!showControl) {
      setShowControl(true);        // manual launch mini-lab (fallback)
    } else {
      onComplete(3);               // finished; move to MoneyExperiments
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const currentStepData = paymentSteps[currentStep];

  return showControl ? (
    <ControlScenarios onFinish={handleNext} />
  ) : (
    <div className="module-container">
      <div className="section-card">
        <h1 className="heading-critical">Payment Infrastructure</h1>
        <p>Every "simple" payment actually involves 6 stops and 3 middlemen. Let's trace your money's journey.</p>
      </div>
      
      <div className="card-feature">
        <h2 className="heading-high">Payment Journey</h2>
        <p>Step {currentStep + 1} of {paymentSteps.length}</p>

        <div className="payment-step-display">
          <div className="step-card">
            <h3 className="heading-medium">{currentStepData.title}</h3>
            <h4 className="step-subtitle">{currentStepData.description}</h4>
            <p className="step-detail">{currentStepData.detail}</p>
            
            <div className="hidden-info">
              <h5>🔍 What's Really Happening:</h5>
              <p className="hidden-detail">{currentStepData.hidden}</p>
            </div>
          </div>
        </div>

        <div className="progress-visualization">
          <div className="progress-dots">
            {paymentSteps.map((_, index) => (
              <div 
                key={index} 
                className={`progress-dot ${
                  index === currentStep ? 'current' : ''
                } ${index < currentStep ? 'completed' : ''}`}
              >
                {index < currentStep ? '✅' : index + 1}
              </div>
            ))}
          </div>
        </div>

        {currentStep === paymentSteps.length - 1 && (
          <div className="concept-card">
            <h3 className="heading-standard">💡 Key Insight</h3>
            <p>Notice the 6 stops & 3 middlemen? That's "friction."</p>
            <p><strong>Link back:</strong> Friction weakens <strong>Money Functions</strong> we learned about earlier - specifically the Medium of Exchange and Unit of Account jobs.</p>
            
            <div className="friction-analysis">
              <h4>What This Friction Creates:</h4>
              <ul>
                <li><strong>Cost:</strong> 3-5% in fees (hidden from you)</li>
                <li><strong>Delay:</strong> Settlement takes 1-3 days</li>
                <li><strong>Control:</strong> Any middleman can block or reverse transactions</li>
                <li><strong>Privacy:</strong> Every transaction is tracked and stored</li>
                <li><strong>Complexity:</strong> Requires 6 different companies to work together</li>
              </ul>
            </div>
            
            {showFinalInsight && (
              <div className="auto-transition-message">
                <p><strong>🚀 But here's the real question...</strong></p>
                <p>If these middlemen can block or reverse your transactions, who really controls your money?</p>
                <p className="transition-notice">Let's find out... (launching in 3 seconds)</p>
              </div>
            )}
          </div>
        )}

        {!showControl && (
          <StepNavigation
            currentStep={currentStep}
            totalSteps={paymentSteps.length + 1}  // Add 1 to prevent auto-disable on final step
            onPrevious={handlePrevious}
            onNext={handleNext}
            canGoBack={currentStep > 0 && !showFinalInsight}
            canGoNext={true}
            nextLabel={currentStep === paymentSteps.length - 1 ? 
              (showFinalInsight ? "Launch Control Test" : "Complete Payment Journey") : 
              "Next Step"
            }
          />
        )}
      </div>
    </div>
  );
};

// Renamed: HistoryWinsAndWipeouts -> MoneyExperiments
const MoneyExperiments = ({ onComplete, onUnlockTrait }) => {
  const [showIntro, setShowIntro] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  const questions = [
    {
      id: 1,
      context: "In 2008, when banks were in trouble, they wouldn't let people take money out of their accounts.",
      question: "What's wrong with this picture?",
      options: [
        "Banks needed to protect themselves",
        "If it's your money, you should always be able to get it",
        "Sometimes restrictions are needed"
      ],
      answer: 1,
      insight: "If someone else can stop you from using your money, do you really own it?",
      wrongExplanation: "Bank protection and restrictions don't address the fundamental issue of who controls your money.",
      trait: "Self Custody"
    },
    {
      id: 2,
      context: "In 1971, U.S. President Richard Nixon announced — on national television — that the dollar would no longer be backed by gold. No vote. No debate. Just one decision. Overnight, the entire world was placed on a fiat money system.",
      question: "What does this show us about money?",
      options: [
        "The president should be able to act fast",
        "One leader can change the rules for everyone",
        "If one person can control the money system, they can change it to benefit themselves — and hurt everyone else"
      ],
      answer: 2,
      insight: "When control over money is concentrated, it can be abused without consent from the people who use it. To protect everyone's interests, money should be decentralized — no one should have absolute control.",
      wrongExplanation: "Fast leadership decisions and centralized control actually make the system more vulnerable to abuse and manipulation.",
      trait: "Decentralization"
    },
    {
      id: 3,
      context: "After Nixon removed the gold standard, the U.S. could print as much money as it wanted — and it did. The money supply (M2) skyrocketed. The price of everyday things — like a Big Mac — rose steadily as dollars lost value.",
      question: "What does this show us about money?",
      options: [
        "More money means more prosperity",
        "Printing money always helps the economy",
        "Without limits, governments always print too much"
      ],
      answer: 2,
      insight: "Good money needs hard rules. If you can print infinite amounts, it stops being trustworthy.",
      wrongExplanation: "More money printing actually dilutes value and creates inflation, harming everyone who holds that money.",
      trait: "Fixed Supply"
    },
    {
      id: 4,
      context: "Zimbabwe printed so much money that prices doubled every day. A loaf of bread cost billions of dollars.",
      question: "What does this show us about money?",
      options: [
        "People should use different money",
        "The limited supply must be real and enforced",
        "Inflation is normal"
      ],
      answer: 1,
      insight: "Scarcity must be mathematically provable and impossible to circumvent, creating reliable store of value.",
      wrongExplanation: "Using different money or accepting inflation doesn't solve the fundamental problem of unlimited money creation.",
      trait: "Genuine Scarcity"
    },
    {
      id: 5,
      context: "Gold was great money for thousands of years, but it was heavy to carry and difficult to verify quickly.",
      question: "What problem did gold have?",
      options: [
        "It was too valuable",
        "It was hard to transport from one place to another",
        "People didn't like it"
      ],
      answer: 1,
      insight: "Good money should be easy to transport from one place to another — physically or digitally. You should be able to carry it in your pocket or send it across the world.",
      wrongExplanation: "Value and popularity don't matter if the money is too heavy or difficult to move when you need to use it.",
      trait: "Portability"
    },
    {
      id: 6,
      context: "Some Roman emperors secretly mixed cheap metals into gold coins to trick the people. They looked real — but weren't worth the same.",
      question: "What does this teach us?",
      options: [
        "Gold is always valuable",
        "Coins don't need to be real as long as they look good",
        "Good money must be easy to check for authenticity"
      ],
      answer: 2,
      insight: "If you can't tell if money is real, it's easy to be fooled. Verifiable money protects people from fraud.",
      wrongExplanation: "Assuming gold is always valuable or accepting fake money as long as it looks good leads to fraud and economic collapse.",
      trait: "Verifiability"
    },
    {
      id: 7,
      context: "On Yap Island, they used huge stone discs as money. But you couldn't exactly break off a piece to pay for lunch.",
      question: "What's the issue here?",
      options: [
        "Stones are cool",
        "You can't use money you can't divide",
        "Everyone should use stones again"
      ],
      answer: 1,
      insight: "Money must be divisible to work for both big and small purchases. Good money should work at any scale — whether you're buying a house or a coffee.",
      wrongExplanation: "Personal preferences about stones don't address the practical limitation that indivisible money can't function for small transactions.",
      trait: "Divisibility"
    },
    {
      id: 8,
      context: "Sheep were used as money in ancient times, but they would die or get sick, making the money worthless.",
      question: "What went wrong?",
      options: [
        "Sheep are cute",
        "Money needs to last over time without degrading",
        "People should have used cows instead"
      ],
      answer: 1,
      insight: "Money must maintain its physical and economic properties across long periods without deterioration.",
      wrongExplanation: "Cuteness or using different animals doesn't solve the fundamental problem that living things deteriorate and die.",
      trait: "Durability"
    },
    {
      id: 9,
      context: "Roman coins became unreliable because some had more silver than others. People started rejecting certain coins.",
      question: "What happened to trust in the money?",
      options: [
        "People got used to it",
        "When coins weren't the same, people lost trust",
        "Extra coins made up for it"
      ],
            answer: 1,
      insight: "Each unit of money must be interchangeable with any other unit, ensuring consistent acceptance.",
      wrongExplanation: "People adapting to bad money or hoping extra coins compensate doesn't solve the trust problem when money units aren't identical.",
      trait: "Fungibility"
    },
    {
      id: 10,
      context: "In medieval Europe, people used many different things as money: gold coins, silver pieces, shells, and even cattle. But only gold was accepted everywhere for major trades.",
      question: "What made gold different?",
      options: [
        "Gold was the most beautiful",
        "Everyone trusted and accepted gold as valuable",
        "Gold was the heaviest metal"
      ],
      answer: 1,
      insight: "Money works because people agree it has value. Without widespread acceptance, even valuable things won't function as money.",
      wrongExplanation: "Physical beauty or weight don't determine monetary acceptance - it's about social consensus and trust in value.",
      trait: "Acceptability"
    }
  ];

  const handleAnswer = (answerIndex) => {
    setSelectedAnswer(answerIndex);
    setShowFeedback(true);
    
    if (answerIndex === questions[currentQuestion].answer) {
      setCorrectAnswers(prev => prev + 1);
      onUnlockTrait(questions[currentQuestion].trait);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      onComplete(4);
    }
  };

  const handleShowIntro = () => {
    setShowIntro(false);
  };

  if (showIntro) {
    return (
    <div className="module-container">
      <div className="section-card">
        <h1 className="heading-critical">Money Experiments</h1>
        <p>Let's look at real examples from history to understand what makes money work well.</p>
          
          <h3>Why Look at History?</h3>
          <p>People have been trying different forms of money for thousands of years. Some worked well, others failed spectacularly.</p>
          <p>By understanding what went wrong (and right) in the past, we can figure out what makes good money.</p>
          
          <div className="what-we-learn">
            <h4>What We'll Discover:</h4>
            <ul>
              <li>Why some money systems failed</li>
              <li>What properties good money needs</li>
              <li>Lessons that apply to money today</li>
            </ul>
          </div>

          <ContinueButton onClick={handleShowIntro}>
            Start Learning from History
          </ContinueButton>
        </div>
      </div>
    );
  }

  const currentQuestionData = questions[currentQuestion];
  
  return (
    <div className="module-container">
      <div className="section-card">
        <h1 className="heading-critical">Money Experiments</h1>
        <p>Question {currentQuestion + 1} of {questions.length}</p>
        
        <div className="question-progress">
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            />
          </div>
          <span className="progress-text">
            {currentQuestion + 1} / {questions.length} questions
          </span>
        </div>

        <div className="historical-question">
          <div className="context-box">
            <h3>Historical Example</h3>
            <p>{currentQuestionData.context}</p>
          </div>
          
          <div className="question-box">
            <h4>{currentQuestionData.question}</h4>
            
            {!showFeedback && (
              <div className="quiz-options">
                {currentQuestionData.options.map((option, index) => (
                  <ActionButton
                    key={index}
                    onClick={() => handleAnswer(index)}
                    variant="outline"
                  >
                    <span className="option-text">{option}</span>
                  </ActionButton>
                ))}
              </div>
            )}
            
            {showFeedback && (
              <div className={`quiz-feedback ${selectedAnswer === currentQuestionData.answer ? 'correct' : 'incorrect'}`}>
                {selectedAnswer === currentQuestionData.answer ? (
                  <div className="feedback-text">
                    <p>✅ <strong>Correct!</strong></p>
                    <div className="correct-answer">
                      <strong>💡 What This Teaches Us:</strong> {currentQuestionData.insight}
                    </div>
                    <div className="trait-unlocked">
                      <p><strong>🔓 Property Unlocked:</strong> {currentQuestionData.trait}</p>
                    </div>
                  </div>
                ) : (
                  <div className="feedback-text">
                    <p>❌ <strong>Not quite.</strong></p>
                    <div className="incorrect-explanation">
                      <strong>Why this is wrong:</strong> {currentQuestionData.wrongExplanation || "This choice doesn't address the core lesson about sound money properties."}
                    </div>
                    <div className="correct-answer">
                      <strong>✅ Correct answer:</strong> {currentQuestionData.options[currentQuestionData.answer]}
                    </div>
                    <div className="insight-explanation">
                      <strong>💡 What This Teaches Us:</strong> {currentQuestionData.insight}
                    </div>
                    <div className="trait-unlocked">
                      <p><strong>🔓 Property Unlocked:</strong> {currentQuestionData.trait}</p>
                    </div>
                  </div>
                )}
                
                <ContinueButton onClick={handleNext}>
                  {currentQuestion === questions.length - 1 ? 'Build Your Framework' : 'Next Example'}
                </ContinueButton>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Already correctly named as MoneyScorecard
const MoneyScorecard = ({ unlockedTraits, onComplete }) => {
  const [step, setStep] = useState(0);
  const [currentTrait, setCurrentTrait] = useState(0);

  const soundMoneyTraits = [
    { icon: "🔒", name: "Self Custody", description: "You control your money, not someone else", category: "Control" },
    { icon: "🌐", name: "Decentralization", description: "No single group can control or change it", category: "Control" },
    { icon: "🔍", name: "Verifiability", description: "Easy to verify that the money is real and not counterfeit", category: "Control" },
    { icon: "📊", name: "Fixed Supply", description: "No one can print more to benefit themselves", category: "Scarcity" },
    { icon: "💎", name: "Genuine Scarcity", description: "The limited supply is real and enforced", category: "Scarcity" },
    { icon: "🔄", name: "Fungibility", description: "Every unit is identical to every other unit", category: "Scarcity" },
    { icon: "📱", name: "Portability", description: "Easy to transport from one place to another — physically or digitally", category: "Usability" },
    { icon: "➗", name: "Divisibility", description: "Easy to divide into smaller units for transactions of any size", category: "Usability" },
    { icon: "⏳", name: "Durability", description: "Lasts over time without degrading", category: "Usability" },
    { icon: "🤝", name: "Acceptability", description: "Widely trusted and accepted through social consensus", category: "Usability" }
  ];

  const categories = {
    "Control": { traits: soundMoneyTraits.filter(t => t.category === "Control"), color: "var(--color-error-light)" },
    "Scarcity": { traits: soundMoneyTraits.filter(t => t.category === "Scarcity"), color: "var(--color-technical)" },
    "Usability": { traits: soundMoneyTraits.filter(t => t.category === "Usability"), color: "var(--color-info-light)" }
  };

  const frameworkSteps = [
    {
      title: "10-Point Money Scorecard",
      content: (
        <div className="scorecard-intro">
          <h3>Your Framework for Evaluating Any Money</h3>
          <p>Based on what you've learned from history, here are the 10 essential properties of sound money, organized into 3 categories:</p>
          
          <div className="categories-overview">
            {Object.entries(categories).map(([categoryName, categoryData]) => (
              <div key={categoryName} className="category-card" style={{ borderLeft: `4px solid ${categoryData.color}` }}>
                <h4>{categoryName}</h4>
                <div className="category-traits">
                  {categoryData.traits.map((trait, index) => (
                    <div key={index} className="trait-item">
                      <span className="trait-icon">{trait.icon}</span>
                      <span className="trait-name">{trait.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="scorecard-insight">
            <h4>💡 How to Use This Scorecard</h4>
            <p>For any form of money, ask: "How many of these 10 properties does it have?" The more it has, the better it functions as money.</p>
          </div>
        </div>
      )
    },
    {
      title: "Deep Dive: Each Property",
      content: (
        <div className="trait-deep-dive">
          <h3>Understanding Each Property</h3>
          <p>Let's examine each property in detail:</p>
          
          <div className="trait-progress">
            <p>Property {currentTrait + 1} of {soundMoneyTraits.length}</p>
          </div>

          <div className="current-trait-display">
            <div className="trait-card featured" style={{ borderColor: categories[soundMoneyTraits[currentTrait].category].color }}>
              <div className="trait-header">
                <span className="trait-icon-large">{soundMoneyTraits[currentTrait].icon}</span>
                <div className="trait-info">
                  <h5>{soundMoneyTraits[currentTrait].name}</h5>
                  <span className="trait-category">{soundMoneyTraits[currentTrait].category}</span>
                </div>
              </div>
              <p className="trait-description">{soundMoneyTraits[currentTrait].description}</p>
            </div>
          </div>

          <div className="trait-navigation">
            <ActionButton 
              onClick={() => setCurrentTrait(Math.max(0, currentTrait - 1))}
              disabled={currentTrait === 0}
              variant="secondary"
            >
              Previous Property
            </ActionButton>
            <ActionButton 
              onClick={() => setCurrentTrait(Math.min(soundMoneyTraits.length - 1, currentTrait + 1))}
              disabled={currentTrait === soundMoneyTraits.length - 1}
              variant="secondary"
            >
              Next Property
            </ActionButton>
          </div>

          <div className="trait-summary">
            <h4>All 10 Properties:</h4>
            <div className="traits-grid">
              {soundMoneyTraits.map((trait, index) => (
                <div 
                  key={index} 
                  className={`trait-grid-item ${index === currentTrait ? 'current' : ''}`}
                  onClick={() => setCurrentTrait(index)}
                  style={{ borderColor: categories[trait.category].color }}
                >
                  <span className="trait-icon">{trait.icon}</span>
                  <span className="trait-name">{trait.name}</span>
                  {index === currentTrait && <span className="current-indicator">←</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Ready to Test Your Framework",
      content: (
        <div className="framework-ready">
          <h3>Time to Apply What You've Learned</h3>
          <p>Now you have a complete framework for evaluating money. Let's test it by comparing different money systems.</p>
          
          <div className="preview-comparison">
            <h4>You'll Compare:</h4>
            <div className="comparison-preview">
              <div className="money-type">
                <h5>🥇 Gold</h5>
                <p>Sound money of the past</p>
              </div>
              <div className="money-type">
                <h5>💵 Fiat Currency</h5>
                <p>Unsound money of today</p>
              </div>
            </div>
          </div>
          
          <div className="excitement-builder">
            <h4>🎯 What You'll Discover:</h4>
            <ul>
              <li>How sound money (gold) compares to unsound money (fiat)</li>
              <li>Why humanity moved from gold to fiat currency</li>
              <li>What we gained and lost in this transition</li>
              <li>Whether it's possible to return to sound money</li>
            </ul>
          </div>
          
          <p><strong>Ready to see how Bitcoin stacks up?</strong></p>
        </div>
      )
    }
  ];

  const handleNext = () => {
    if (step < frameworkSteps.length - 1) {
      setStep(step + 1);
    } else {
      onComplete(5);
    }
  };

  const handlePrevious = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  return (
    <div className="module-container">
      <div className="section-card">
        <h1 className="heading-critical">{frameworkSteps[step].title}</h1>
        <p>Step {step + 1} of {frameworkSteps.length}</p>
      </div>
      
      <div className="card-feature">
        {frameworkSteps[step].content}
        
        <StepNavigation
          currentStep={step}
          totalSteps={frameworkSteps.length}
          onPrevious={handlePrevious}
          onNext={handleNext}
          canGoBack={step > 0}
          nextLabel={step === frameworkSteps.length - 1 ? "Apply the Scorecard" : "Next"}
        />
      </div>
    </div>
  );
};

// Apply Scorecard - Comparing Sound vs Unsound Money
const ApplyScorecard = ({ onComplete }) => {
  const [showResults, setShowResults] = useState(false);

  const moneyTypes = [
    {
      name: "Gold",
      emoji: "🥇",
      description: "Sound money: Physical precious metal, used for thousands of years",
      era: "Pre-1971 (Sound Money Era)",
      scores: {
        "Self Custody": 9,
        "Decentralization": 8,
        "Verifiability": 6,
        "Fixed Supply": 9,
        "Genuine Scarcity": 9,
        "Fungibility": 7,
        "Portability": 4,
        "Divisibility": 5,
        "Durability": 10,
        "Acceptability": 8
      },
      strengths: ["Naturally scarce", "Durable forever", "Self-custodial", "Decentralized"],
      weaknesses: ["Heavy to transport", "Hard to verify purity", "Difficult to divide precisely"]
    },
    {
      name: "Fiat Currency",
      emoji: "💵",
      description: "Unsound money: Government-issued currency backed only by trust",
      era: "Post-1971 (Unsound Money Era)",
      scores: {
        "Self Custody": 3,
        "Decentralization": 1,
        "Verifiability": 8,
        "Fixed Supply": 1,
        "Genuine Scarcity": 1,
        "Fungibility": 9,
        "Portability": 8,
        "Divisibility": 10,
        "Durability": 6,
        "Acceptability": 10
      },
      strengths: ["Widely accepted", "Easy to use", "Highly divisible", "Portable"],
      weaknesses: ["Banks control access", "No supply limit", "Centralized control", "Loses value over time"]
    }
  ];

  const properties = [
    "Self Custody", "Decentralization", "Verifiability", "Fixed Supply", 
    "Genuine Scarcity", "Fungibility", "Portability", "Divisibility", 
    "Durability", "Acceptability"
  ];

  const calculateTotalScore = (moneyType) => {
    return Object.values(moneyType.scores).reduce((sum, score) => sum + score, 0);
  };

  const getScoreColor = (score) => {
    if (score >= 8) return 'var(--color-success-light)';
    if (score >= 6) return 'var(--color-warning-light)';
    if (score >= 4) return 'var(--color-mechanics)';
    return 'var(--color-error-light)';
  };

  if (showResults) {
    const sortedMoneyTypes = [...moneyTypes].sort((a, b) => 
      calculateTotalScore(b) - calculateTotalScore(a)
    );

    return (
      <div className="module-container">
        <div className="section-card">
          <h1 className="heading-critical">🏆 Scorecard Results</h1>
          <p>Here's how each money system scored on your 10-point framework:</p>
        </div>
        
        <div className="card-feature">
          <div className="results-comparison">
            {sortedMoneyTypes.map((moneyType, index) => (
              <div key={moneyType.name} className="money-result-card">
                <div className="result-header">
                  <span className="rank">#{index + 1}</span>
                  <span className="money-emoji">{moneyType.emoji}</span>
                  <h3>{moneyType.name}</h3>
                  <div className="total-score">
                    {calculateTotalScore(moneyType)}/100
                  </div>
                </div>
                
                <div className="scores-breakdown">
                  {properties.map(property => (
                    <div key={property} className="score-row">
                      <span className="property-name">{property}</span>
                      <div className="score-bar">
                        <div 
                          className="score-fill"
                          style={{ 
                            width: `${moneyType.scores[property] * 10}%`,
                            backgroundColor: getScoreColor(moneyType.scores[property])
                          }}
                        />
                        <span className="score-number">{moneyType.scores[property]}/10</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="strengths-weaknesses">
                  <div className="strengths">
                    <h4>✅ Strengths</h4>
                    <ul>
                      {moneyType.strengths.map((strength, idx) => (
                        <li key={idx}>{strength}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="weaknesses">
                    <h4>❌ Weaknesses</h4>
                    <ul>
                      {moneyType.weaknesses.map((weakness, idx) => (
                        <li key={idx}>{weakness}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="key-insights">
            <h2 className="heading-high">🔍 Key Insights</h2>
            
            <div className="insight-box">
              <h3>💡 What This Reveals</h3>
              <p><strong>Gold scored highest (75/100)</strong> as the better sound money, while fiat currency scored much lower (66/100) as unsound money:</p>
              
              <div className="comparison-highlights">
                <div className="highlight-item">
                  <span className="highlight-icon">🥇</span>
                  <div>
                    <h4>Sound Money Era (Pre-1971)</h4>
                    <p>Gold provided genuine scarcity, self-custody, and preserved wealth over centuries. People could save for the future with confidence.</p>
                  </div>
                </div>
                
                <div className="highlight-item">
                  <span className="highlight-icon">💵</span>
                  <div>
                    <h4>Unsound Money Era (Post-1971)</h4>
                    <p>Fiat currency is convenient to use but fails on control, scarcity, and value preservation. Your savings lose purchasing power over time.</p>
                  </div>
                </div>
                
                <div className="highlight-item">
                  <span className="highlight-icon">📉</span>
                  <div>
                    <h4>The Great Regression</h4>
                    <p>Humanity went from sound money (gold) to unsound money (fiat). We traded long-term wealth preservation for short-term convenience.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="insight-box">
              <h3>🎯 The Pattern</h3>
              <p>Gold was great for its time but had physical limitations. Fiat solved the usability problems but destroyed the monetary properties. <em>What if we could get the best of both?</em></p>
            </div>
          </div>

          <div className="conclusion">
            <h2 className="heading-high">🚀 The Dream: Return to Sound Money</h2>
            <p>Imagine a form of money that scores higher than gold on <em>all</em> 10 properties. Money that has:</p>
            
            <div className="dream-money-features">
              <ul>
                <li>✨ Gold's scarcity and durability</li>
                <li>✨ Digital portability and divisibility</li>
                <li>✨ Complete self-custody and verification</li>
                <li>✨ No central authority to manipulate it</li>
              </ul>
            </div>
            
            <div className="cliffhanger-box">
              <h3>🤔 But is this even possible?</h3>
              <p>Could someone create money that combines the best properties of gold with the convenience of digital systems, while eliminating the control problems of fiat?</p>
              <p><strong>What would that look like? And does it already exist?</strong></p>
            </div>
            
            <ActionButton onClick={() => onComplete(6)} variant="primary">
              Complete Money Module →
            </ActionButton>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="module-container">
      <div className="section-card">
        <h1 className="heading-critical">Apply Your Scorecard</h1>
        <p>Time to test your framework! Let's see how different money systems score on the 10 properties you learned.</p>
      </div>
      
      <div className="card-feature">
        <h2 className="heading-high">The Ultimate Money Test</h2>
        
        <div className="scorecard-preview">
          <p>We'll compare three very different approaches to money:</p>
          
          <div className="money-types-preview">
            {moneyTypes.map((moneyType, index) => (
              <div key={index} className="money-preview-card">
                <span className="money-emoji-large">{moneyType.emoji}</span>
                <h3>{moneyType.name}</h3>
                <p>{moneyType.description}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="expectation-setting">
          <h3>🎯 What Will You Discover?</h3>
          <ul>
            <li>How sound money (gold) compares to unsound money (fiat)</li>
            <li>Why humanity moved from gold to fiat currency</li>
            <li>What we gained and lost in this transition</li>
            <li>Whether it's possible to return to sound money</li>
          </ul>
        </div>
        
        <ActionButton onClick={() => setShowResults(true)} variant="primary">
          Run the Scorecard Test →
        </ActionButton>
      </div>
    </div>
  );
};

// Sound Money Framework - Simplified (keeping for backward compatibility)
const SoundMoneyFramework = ({ unlockedTraits, onComplete }) => {
  const [step, setStep] = useState(0);
  const [currentTrait, setCurrentTrait] = useState(0);

  const soundMoneyTraits = [
    { icon: "🔒", name: "Self Custody", description: "You control your money, not someone else" },
    { icon: "🌐", name: "Decentralization", description: "No single group can control or change it" },
    { icon: "📊", name: "Fixed Supply", description: "No one can print more to benefit themselves" },
    { icon: "💎", name: "Genuine Scarcity", description: "The limited supply is real and enforced" },
    { icon: "📱", name: "Portability", description: "Easy to transport from one place to another — physically or digitally" },
    { icon: "🔍", name: "Verifiability", description: "Easy to verify that the money is real and not counterfeit" },
    { icon: "➗", name: "Divisibility", description: "Easy to divide into smaller units for transactions of any size" },
    { icon: "⏳", name: "Durability", description: "Lasts over time without degrading" },
    { icon: "🔄", name: "Fungibility", description: "Every unit is identical to every other unit" },
    { icon: "🤝", name: "Acceptability", description: "Widely trusted and accepted through social consensus" }
  ];

  const frameworkSteps = [
    {
      title: "Your Money Framework",
      content: (
        <div className="framework-intro">
          <h3>What Makes Good Money?</h3>
          <p>Based on what you've learned from history, here's your framework for evaluating any form of money:</p>
          
          {/* Individual trait display */}
          <div className="trait-progress">
            <p>Property {currentTrait + 1} of {soundMoneyTraits.length}</p>
          </div>

          <div className="current-trait-display">
            <div className="trait-card featured">
              <h5>{soundMoneyTraits[currentTrait].icon} {soundMoneyTraits[currentTrait].name}</h5>
              <p>{soundMoneyTraits[currentTrait].description}</p>
            </div>
          </div>

          <div className="trait-navigation">
            <ActionButton 
              onClick={() => setCurrentTrait(Math.max(0, currentTrait - 1))}
              disabled={currentTrait === 0}
              variant="secondary"
            >
              Previous Property
            </ActionButton>
            <ActionButton 
              onClick={() => setCurrentTrait(Math.min(soundMoneyTraits.length - 1, currentTrait + 1))}
              disabled={currentTrait === soundMoneyTraits.length - 1}
              variant="secondary"
            >
              Next Property
            </ActionButton>
          </div>

          <div className="trait-summary">
            <h4>All {soundMoneyTraits.length} Essential Properties:</h4>
            <div className="traits-list">
              {soundMoneyTraits.map((trait, index) => (
                <div 
                  key={index} 
                  className={`trait-list-item ${index === currentTrait ? 'current' : ''}`}
                  onClick={() => setCurrentTrait(index)}
                >
                  <span className="trait-icon">{trait.icon}</span>
                  <span className="trait-name">{trait.name}</span>
                  {index === currentTrait && <span className="current-indicator">←</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      title: "How to Use This Framework",
      content: (
        <div className="framework-application">
          <h3>Evaluating Money Systems</h3>
          <p>You can now use this framework to evaluate any money system by asking:</p>
          
          <div className="evaluation-questions">
            <div className="question-category">
              <h4>🔒 Control Questions</h4>
              <ul>
                <li>Who controls this money?</li>
                <li>Can they freeze or confiscate it?</li>
                <li>Can they create more of it?</li>
              </ul>
            </div>
            
            <div className="question-category">
              <h4>📊 Supply Questions</h4>
              <ul>
                <li>How much exists?</li>
                <li>Who decides how much to create?</li>
                <li>What prevents unlimited creation?</li>
              </ul>
            </div>
            
            <div className="question-category">
              <h4>🔧 Practical Questions</h4>
              <ul>
                <li>How easy is it to use?</li>
                <li>Will it last over time?</li>
                <li>Can you verify it's real?</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Ready for Bitcoin",
      content: (
        <div className="next-steps">
          <h3>What's Next?</h3>
          <p>Now you have the tools to understand and evaluate Bitcoin:</p>
          
          <div className="bitcoin-preview">
            <h4>You'll be able to understand:</h4>
            <ul>
              <li>How Bitcoin achieves these money properties</li>
              <li>Why it was designed the way it was</li>
              <li>How it compares to traditional money</li>
              <li>What makes it different from other digital money</li>
            </ul>
          </div>
          
          <p>Ready to see how Bitcoin implements your framework?</p>
        </div>
      )
    }
  ];

  const handleNext = () => {
    if (step < frameworkSteps.length - 1) {
      setStep(step + 1);
    } else {
      onComplete(5);
    }
  };

  const handlePrevious = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  return (
    <div className="module-container">
      <div className="section-card">
        <h1 className="heading-critical">{frameworkSteps[step].title}</h1>
        <p>Step {step + 1} of {frameworkSteps.length}</p>
      </div>
      
      <div className="card-feature">
        {frameworkSteps[step].content}
        
        <StepNavigation
          currentStep={step}
          totalSteps={frameworkSteps.length}
          onPrevious={handlePrevious}
          onNext={handleNext}
          canGoBack={step > 0}
          nextLabel={step === frameworkSteps.length - 1 ? "Complete Money Module" : "Next"}
        />
      </div>
    </div>
  );
};

// Module Completion - Simplified
const ModuleCompletion = ({ onComplete }) => {
  return (
    <div className="module-container">
      <div className="section-card">
        <h2>🎉 Congratulations!</h2>
        <p>You've built a solid foundation for understanding money and Bitcoin.</p>
        
        <div className="optional-resources">
          <h3>📚 Want to Learn More?</h3>
          <p>For a deeper look at money throughout history:</p>
          <a
            href="https://layer-d.my.canva.site/interactive-timeline-of-money-evolution-from-barter-to-bitcoin"
            target="_blank"
            rel="noopener noreferrer"
            className="resource-link"
          >
            🕰️ Interactive Timeline: The Evolution of Money
          </a>
        </div>

        <ModuleCompletionButton 
          moduleName="Money"
          moduleId="money"
          customMessage="🎉 Congratulations! You now understand the fundamentals of money and are ready to explore Bitcoin's revolutionary approach to sound money!"
        />
      </div>
    </div>
  );
};

// Combined Modern Money lesson (Payment Infrastructure + Control)
const CombinedModernMoney = ({ onComplete }) => {
  const [phase, setPhase] = useState(0); // 0: intro, 1: payment journey, 2: control scenarios
  
  if (phase === 0) {
    return (
      <div className="module-container">
        <div className="section-card">
          <h1 className="heading-critical">How Modern Money Really Works</h1>
          <p>You understand what money should do. Now let's see how well today's money actually does those jobs.</p>
          <p>We'll trace a simple $5 coffee purchase to reveal the hidden complexity behind every "simple" payment.</p>
        </div>
        
        <div className="card-feature">
          <h2 className="heading-high">The $5 Coffee Challenge</h2>
          <p>You tap your card. Screen says "Approved!" in 2 seconds. Simple, right?</p>
          
          <div className="challenge-setup">
            <h3>Let's Find Out What Really Happened</h3>
            <p>We'll follow your $5 through the entire payment system, then discover who really controls your money.</p>
          </div>
          
          <ActionButton onClick={() => setPhase(1)} variant="primary">
            Trace My $5 Coffee →
          </ActionButton>
        </div>
      </div>
    );
  }
  
  if (phase === 1) {
    return <PaymentInfrastructure onComplete={() => setPhase(2)} />;
  }
  
  // Control scenarios phase
  return (
    <div className="module-container">
      <div className="section-card">
        <h1 className="heading-critical">💡 The Real Question</h1>
        <p>You've seen the complexity. Now let's discover who really controls your money.</p>
      </div>
      
      <ControlScenarios onFinish={() => onComplete(3)} />
    </div>
  );
};

// Combined Sound Money Framework lesson (History + Framework Building)
const CombinedSoundMoneyFramework = ({ onComplete, onUnlockTrait }) => {
  const [phase, setPhase] = useState(0); // 0: intro, 1: history, 2: framework
  const [unlockedTraits, setUnlockedTraits] = useState([]);
  
  const handleUnlockTrait = (trait) => {
    if (!unlockedTraits.includes(trait)) {
      setUnlockedTraits(prev => [...prev, trait]);
      onUnlockTrait(trait);
    }
  };
  
  if (phase === 0) {
    return (
      <div className="module-container">
        <div className="section-card">
          <h1 className="heading-critical">Sound Money Framework</h1>
          <p>Modern money has problems. But what would good money look like?</p>
          <p>Let's learn from history's successes and failures to build a framework for evaluating any money.</p>
        </div>
        
        <div className="card-feature">
          <h2 className="heading-high">Learning from History</h2>
          <p>For thousands of years, people tried different forms of money. Some worked well, others failed spectacularly.</p>
          
          <div className="history-preview">
            <h3>We'll Explore:</h3>
            <ul>
              <li>🏛️ What made Roman coins fail</li>
              <li>🏺 Why stone money couldn't scale</li> 
              <li>📈 How governments broke the gold standard</li>
              <li>💸 What hyperinflation teaches us</li>
              <li>⚖️ The properties that matter most</li>
            </ul>
          </div>
          
          <ActionButton onClick={() => setPhase(1)} variant="primary">
            Learn from History →
          </ActionButton>
        </div>
      </div>
    );
  }
  
  if (phase === 1) {
    return (
      <MoneyExperiments 
        onComplete={() => setPhase(2)} 
        onUnlockTrait={handleUnlockTrait} 
      />
    );
  }
  
  // Framework building phase
  return (
    <MoneyScorecard 
      unlockedTraits={unlockedTraits}
      onComplete={() => onComplete(4)} 
    />
  );
};

// Main Module Component
const MoneyModule = () => {
  const { completeModule } = useProgress();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(() => {
    const saved = localStorage.getItem('moneyModuleCompletedSteps');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });
  const [unlockedTraits, setUnlockedTraits] = useState([]);

  // Navigation functions for Learning Support buttons
  const handleReviewPrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleContinueLearning = () => {
    navigate('/?view=learning');
  };

  const getCurrentSection = () => {
    return {
      index: currentStep,
      name: stepLabels[currentStep],
      total: stepLabels.length
    };
  };

  // Make navigation functions globally available for the Learning Support buttons
  useEffect(() => {
    window.moduleNavigation = {
      reviewPrevious: handleReviewPrevious,
      continueLearning: handleContinueLearning,
      currentModule: 'money',
      getCurrentSection
    };
    
    return () => {
      delete window.moduleNavigation;
    };
  }, [currentStep]);

  const handleStepComplete = (stepIndex) => {
    const newCompletedSteps = new Set(completedSteps).add(stepIndex);
    setCompletedSteps(newCompletedSteps);
    
    try {
      localStorage.setItem('moneyModuleCompletedSteps', JSON.stringify(Array.from(newCompletedSteps)));
    } catch (error) {
      console.warn('Failed to save progress to localStorage:', error);
    }
    
    if (stepIndex === 6) {
      // Module completion is handled by ModuleCompletionButton
      setCurrentStep(stepIndex + 1);
    } else {
      setCurrentStep(stepIndex + 1);
    }
  };

  const handleTabClick = (stepIndex) => {
    // Allow navigation to any step (including going back)
    setCurrentStep(stepIndex);
  };

  const handleUnlockTrait = (trait) => {
    if (!unlockedTraits.includes(trait)) {
      setUnlockedTraits([...unlockedTraits, trait]);
    }
  };

  const handleResetProgress = () => {
    localStorage.removeItem('moneyModuleCompletedSteps');
    setCompletedSteps(new Set());
    setCurrentStep(0);
  };

  return (
    <div className="module-container">
      {/* HERO SECTION - World-class design principles */}
      <div className="module-header">
        <div className="module-title">
          <div className="module-icon">
            <BitcoinIcon size={48} animated />
          </div>
          Understanding Money
        </div>
        <div className="module-subtitle">
          Discover how money really works and why Bitcoin matters
        </div>
      </div>

      {/* TERTIARY: Navigation Steps - Medium Importance */}
      <div className="section-card">
        <h3 className="nav-section-title">Learning Path</h3>
        <div className="step-navigation-container">
          <div className="step-navigation-scroll">
          {stepLabels.map((step, index) => (
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
        {currentStep === 0 && <Introduction onComplete={handleStepComplete} />}
        {currentStep === 1 && <WhyMoney onComplete={handleStepComplete} />}
        {currentStep === 2 && <MoneyFunctions onComplete={handleStepComplete} />}
        {currentStep === 3 && <TimeAndMoneyLesson onComplete={handleStepComplete} />}
        {currentStep === 4 && <CombinedModernMoney onComplete={handleStepComplete} />}
        {currentStep === 5 && <CombinedSoundMoneyFramework onComplete={handleStepComplete} onUnlockTrait={handleUnlockTrait} />}
        {currentStep === 6 && <ApplyScorecard onComplete={handleStepComplete} />}
        {currentStep === 7 && <ModuleCompletion />}
      </div>
    </div>
  );
};

export default MoneyModule;