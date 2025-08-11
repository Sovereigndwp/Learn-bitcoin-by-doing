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
import BankingReality from '../components/BankingReality';
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

// Step labels for consistent navigation - Interactive Sound Money Discovery
const stepLabels = [
  'Feel Bitcoin First',
  'Why Money Matters NOW', 
  'Build Your Money Scorecard',
  'Score Bitcoin vs Fiat',
  'Your Action Plan'
];


// Local components removed - now using imported page components

// Priority 1: Feel Bitcoin First - Emotional Investment Component
const FeelBitcoinFirst = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [emotionalResponse, setEmotionalResponse] = useState('');

  const bitcoinExperience = [
    {
      title: "📱 A Real-World Crisis",
      setup: "Meet Sarah, an investigative journalist in Canada. She's been reporting on government corruption, and her bank account was just frozen under the Emergency Act.",
      crisis: "Sarah can't access her money to buy food, pay rent, or even get gas. Her cards are blocked. Her life savings are trapped.",
      question: "Traditional banking has failed Sarah. What can you do to help her right now?"
    },
    {
      title: "⚡ Bitcoin to the Rescue", 
      setup: "You decide to send Sarah $200 worth of Bitcoin to help her survive.",
      action: "You open your phone, scan her Bitcoin address QR code, and send the transaction.",
      magic: "Within seconds, Sarah receives the Bitcoin. No bank. No permission. No freezing. Just direct, person-to-person value transfer.",
      question: "How does this make you feel?"
    }
  ];

  const currentExperience = bitcoinExperience[currentStep];

  const handleResponse = (response) => {
    setEmotionalResponse(response);
    setShowResult(true);
  };

  const handleNext = () => {
    if (currentStep < bitcoinExperience.length - 1) {
      setCurrentStep(currentStep + 1);
      setShowResult(false);
      setEmotionalResponse('');
    } else {
      onComplete(0);
    }
  };

  return (
    <div className="module-container">
      <div className="section-card">
        <h1 className="heading-critical">⚡ Feel Bitcoin First</h1>
        <p>Before we dive into theory, let's experience what makes Bitcoin different.</p>
      </div>
      
      <div className="card-feature">
        <h2 className="heading-high">{currentExperience.title}</h2>
        
        <div className="experience-story">
          <div className="story-section">
            <h3>The Story</h3>
            <p>{currentExperience.setup}</p>
            {currentExperience.crisis && (
              <div className="crisis-box">
                <strong>💔 The Crisis:</strong> {currentExperience.crisis}
              </div>
            )}
            {currentExperience.action && (
              <div className="action-box">
                <strong>🎯 Your Action:</strong> {currentExperience.action}
              </div>
            )}
            {currentExperience.magic && (
              <div className="magic-moment">
                <strong>✨ What Happens:</strong> {currentExperience.magic}
              </div>
            )}
          </div>

          {!showResult && (
            <div className="emotional-prompt">
              <h4>{currentExperience.question}</h4>
              {currentStep === 0 ? (
                <div className="response-options">
                  <ActionButton onClick={() => handleResponse('frustrated')} variant="outline">
                    😤 This is incredibly frustrating - banks shouldn't have this power
                  </ActionButton>
                  <ActionButton onClick={() => handleResponse('concerned')} variant="outline">
                    😰 This is scary - what if this happened to me?
                  </ActionButton>
                  <ActionButton onClick={() => handleResponse('curious')} variant="outline">
                    🤔 I want to understand how Bitcoin could help
                  </ActionButton>
                </div>
              ) : (
                <div className="response-options">
                  <ActionButton onClick={() => handleResponse('powerful')} variant="outline">
                    🚀 This feels incredibly powerful - direct human-to-human help
                  </ActionButton>
                  <ActionButton onClick={() => handleResponse('amazed')} variant="outline">
                    🤯 I'm amazed this is even possible
                  </ActionButton>
                  <ActionButton onClick={() => handleResponse('hopeful')} variant="outline">
                    ✨ This gives me hope for financial freedom
                  </ActionButton>
                </div>
              )}
            </div>
          )}

          {showResult && (
            <div className="emotional-insight">
              <div className="your-feeling">
                <h4>Your Response: {emotionalResponse}</h4>
                <div className="insight-box">
                  {currentStep === 0 ? (
                    <p><strong>💡 This is exactly why Bitcoin was created.</strong> Traditional money systems can be controlled, frozen, or blocked by authorities. Bitcoin gives people an alternative that works even when traditional systems fail.</p>
                  ) : (
                    <p><strong>💡 You just experienced Bitcoin's superpower:</strong> Permissionless, peer-to-peer value transfer. No bank, government, or institution can stop you from helping another human being. This is financial sovereignty in action.</p>
                  )}
                </div>
              </div>
              
              <ActionButton onClick={handleNext} variant="primary">
                {currentStep < bitcoinExperience.length - 1 ? 'Continue the Experience →' : 'Now Let\'s Understand WHY This Matters →'}
              </ActionButton>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Priority 3: Why Money Matters NOW - Current Events Urgency
const WhyMoneyMattersNow = ({ onComplete }) => {
  const [currentHeadline, setCurrentHeadline] = useState(0);
  const [userReaction, setUserReaction] = useState('');
  const [showInsight, setShowInsight] = useState(false);

  const currentEvents = [
    {
      headline: "🇨🇦 Canadian Government Freezes Bank Accounts of Truckers and Donors (2022)",
      details: "During the Freedom Convoy protests, the government used emergency powers to freeze bank accounts of protesters and anyone who donated as little as $25. No court order required.",
      impact: "Over 200 accounts frozen instantly. People couldn't buy groceries, pay rent, or access their life savings.",
      question: "What does this tell you about who really controls your money?",
      property: "Self Custody"
    },
    {
      headline: "🇺🇸 Inflation Hits 40-Year High - Your Savings Lose 8.5% Purchasing Power (2022)",
      details: "While the government printed trillions of new dollars, everyday items became dramatically more expensive. A gallon of gas went from $2.40 to $5.00.",
      impact: "If you had $10,000 in savings, it could only buy $9,150 worth of goods by year-end. Your work from previous years became worth less.",
      question: "Why does your saved money lose value when the government prints more?",
      property: "Fixed Supply"
    },
    {
      headline: "🏦 Silicon Valley Bank Collapses - $175 Billion in Deposits at Risk (2023)",
      details: "The 16th largest bank in America failed overnight. Customers couldn't access their money. FDIC insurance only covers $250,000 per account.",
      impact: "Billions in deposits were locked up. Businesses couldn't make payroll. People couldn't pay mortgages.",
      question: "If your bank fails tomorrow, how confident are you that you'll get your money back?",
      property: "Counterparty Risk"
    },
    {
      headline: "🌍 Nigeria, Turkey, Argentina Face Currency Collapse - Citizens Turn to Bitcoin (2023-2024)",
      details: "Local currencies lost 50-70% of their value in one year. Governments imposed currency controls, limiting how much people could exchange or move abroad.",
      impact: "Life savings evaporated. People couldn't afford basic necessities. Many turned to Bitcoin to preserve their wealth.",
      question: "What happens when your entire country's money system fails?",
      property: "Decentralization"
    }
  ];

  const currentEvent = currentEvents[currentHeadline];

  const handleReaction = (reaction) => {
    setUserReaction(reaction);
    setShowInsight(true);
  };

  const handleNext = () => {
    if (currentHeadline < currentEvents.length - 1) {
      setCurrentHeadline(currentHeadline + 1);
      setShowInsight(false);
      setUserReaction('');
    } else {
      onComplete(1);
    }
  };

  return (
    <div className="module-container">
      <div className="section-card">
        <h1 className="heading-critical">🚨 Why Money Matters NOW</h1>
        <p>These aren't historical examples - this is happening right now, to real people.</p>
        <div className="urgency-indicator">
          Breaking News {currentHeadline + 1} of {currentEvents.length}
        </div>
      </div>
      
      <div className="card-feature">
        <div className="breaking-news">
          <div className="news-header">
            <span className="breaking-tag">🔴 BREAKING</span>
            <h2>{currentEvent.headline}</h2>
          </div>
          
          <div className="news-content">
            <div className="story-details">
              <h3>What Happened</h3>
              <p>{currentEvent.details}</p>
            </div>
            
            <div className="human-impact">
              <h3>💔 Impact on Real People</h3>
              <p>{currentEvent.impact}</p>
            </div>
          </div>

          {!showInsight && (
            <div className="reaction-prompt">
              <h4>{currentEvent.question}</h4>
              <div className="reaction-options">
                <ActionButton onClick={() => handleReaction('worried')} variant="outline">
                  😰 This worries me - could this happen to me?
                </ActionButton>
                <ActionButton onClick={() => handleReaction('angry')} variant="outline">
                  😤 This makes me angry - people deserve better
                </ActionButton>
                <ActionButton onClick={() => handleReaction('curious')} variant="outline">
                  🤔 I want to understand how to protect myself
                </ActionButton>
              </div>
            </div>
          )}

          {showInsight && (
            <div className="urgency-insight">
              <div className="property-connection">
                <h3>💡 This is about: {currentEvent.property}</h3>
                <div className="insight-box">
                  {currentEvent.property === 'Self Custody' && 
                    <p><strong>Your takeaway:</strong> If someone else controls your money, they can take it away. True ownership means you hold the keys, not a bank or government.</p>
                  }
                  {currentEvent.property === 'Fixed Supply' && 
                    <p><strong>Your takeaway:</strong> When governments can print unlimited money, your savings get diluted. Limited supply money (like Bitcoin) can't be inflated away.</p>
                  }
                  {currentEvent.property === 'Counterparty Risk' && 
                    <p><strong>Your takeaway:</strong> Traditional banking means trusting others with your money. With Bitcoin, you don't need to trust banks, governments, or institutions.</p>
                  }
                  {currentEvent.property === 'Decentralization' && 
                    <p><strong>Your takeaway:</strong> When money is controlled by one country or institution, they can destroy its value. Decentralized money works globally and can't be controlled by any single entity.</p>
                  }
                </div>
              </div>
              
              <ActionButton onClick={handleNext} variant="primary">
                {currentHeadline < currentEvents.length - 1 ? 'Next Breaking Story →' : 'Build Your Protection Framework →'}
              </ActionButton>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Interactive Money Properties Discovery - Socratic Method
const MoneyPropertiesDiscovery = ({ onComplete }) => {
  const [currentScenario, setCurrentScenario] = useState(0);
  const [discoveredProperties, setDiscoveredProperties] = useState(new Set());
  const [userAnswers, setUserAnswers] = useState({});
  const [showInsight, setShowInsight] = useState(false);

  const discoveryScenarios = [
    {
      id: 'portability_test',
      title: '🏋️ The Portability Test',
      situation: 'You need to travel 200 miles to buy a horse. You have $2000 worth of value to trade.',
      challenge: 'How do you carry your wealth?',
      options: [
        { id: 'gold_coins', text: 'Carry 4 pounds of gold coins', practical: false, reason: 'Heavy and risky to transport' },
        { id: 'livestock', text: 'Drive 10 cows to trade', practical: false, reason: 'Slow, expensive, and cows might die' },
        { id: 'paper_money', text: 'Carry $2000 in paper bills', practical: true, reason: 'Light, portable, widely accepted' },
        { id: 'digital', text: 'Transfer Bitcoin on your phone', practical: true, reason: 'Instant, borderless, weightless' }
      ],
      property: 'Portability',
      insight: 'Good money must be easy to transport. Physical limitations constrain trade.',
      question: 'What did this scenario teach you about money?'
    },
    {
      id: 'divisibility_test',
      title: '🍕 The Pizza Problem',
      situation: 'You want to buy a $12 pizza. You only have one thing to trade.',
      challenge: 'Which form of money works best?',
      options: [
        { id: 'gold_bar', text: 'One 1-ounce gold bar ($2000)', practical: false, reason: "Can't break a gold bar for pizza" },
        { id: 'diamond', text: 'One perfect diamond ($2000)', practical: false, reason: "Can't split a diamond" },
        { id: 'cash', text: 'Paper bills and coins', practical: true, reason: 'Perfect denominations available' },
        { id: 'bitcoin', text: 'Bitcoin (divisible to 8 decimals)', practical: true, reason: 'Can send exactly $12.00' }
      ],
      property: 'Divisibility',
      insight: 'Money must break into smaller units for transactions of any size.',
      question: 'Why is divisibility crucial for daily use?'
    },
    {
      id: 'durability_test', 
      title: '⏳ The Time Test',
      situation: 'You work hard and save money for 20 years for retirement.',
      challenge: 'Which savings will still be valuable in 20 years?',
      options: [
        { id: 'food', text: 'Stored food and vegetables', practical: false, reason: 'Will rot within months' },
        { id: 'paper_money', text: 'Cash under your mattress', practical: false, reason: 'Inflation will reduce purchasing power' },
        { id: 'gold', text: 'Gold coins', practical: true, reason: 'Gold lasts forever, holds value' },
        { id: 'bitcoin', text: 'Bitcoin in secure wallet', practical: true, reason: 'Digital durability + limited supply' }
      ],
      property: 'Durability',
      insight: 'Money must preserve value over time, both physically and economically.',
      question: 'What makes money durable across decades?'
    },
    {
      id: 'verifiability_test',
      title: '🔍 The Fake Test',
      situation: 'A stranger offers to trade with you, but you\'re worried about counterfeits.',
      challenge: 'Which money can you verify is real?',
      options: [
        { id: 'complex_cash', text: 'Modern bills with security features', practical: true, reason: 'Can check watermarks, security strips' },
        { id: 'gold', text: 'Gold coins', practical: false, reason: 'Hard to verify purity without equipment' },
        { id: 'crypto', text: 'Random cryptocurrency', practical: false, reason: 'Could be fake token or scam' },
        { id: 'bitcoin', text: 'Bitcoin on blockchain', practical: true, reason: 'Mathematically verifiable, impossible to fake' }
      ],
      property: 'Verifiability',
      insight: 'You must be able to quickly verify money is authentic.',
      question: 'Why is easy verification essential?'
    }
  ];

  const currentScenario_data = discoveryScenarios[currentScenario];

  const handleAnswer = (optionId) => {
    const option = currentScenario_data.options.find(opt => opt.id === optionId);
    setUserAnswers(prev => ({ ...prev, [currentScenario_data.id]: option }));
    setDiscoveredProperties(prev => new Set([...prev, currentScenario_data.property]));
    setShowInsight(true);
  };

  const handleNext = () => {
    if (currentScenario < discoveryScenarios.length - 1) {
      setCurrentScenario(currentScenario + 1);
      setShowInsight(false);
    } else {
      onComplete(0);
    }
  };

  return (
    <div className="module-container">
      <div className="section-card">
        <h1 className="heading-critical">🔍 Discover Money Properties</h1>
        <p>Through real scenarios, discover what makes good money work.</p>
        <div className="progress-indicator">
          Scenario {currentScenario + 1} of {discoveryScenarios.length} • 
          Properties discovered: {discoveredProperties.size}/10
        </div>
      </div>
      
      <div className="card-feature">
        <h2 className="heading-high">{currentScenario_data.title}</h2>
        
        <div className="scenario-setup">
          <div className="situation-box">
            <h3>The Situation</h3>
            <p>{currentScenario_data.situation}</p>
          </div>
          
          <div className="challenge-box">
            <h3>Your Challenge</h3>
            <p>{currentScenario_data.challenge}</p>
          </div>
        </div>

        {!showInsight && (
          <div className="interactive-choices">
            <h4>What's your choice?</h4>
            <div className="choice-grid">
              {currentScenario_data.options.map(option => (
                <button
                  key={option.id}
                  className="choice-button"
                  onClick={() => handleAnswer(option.id)}
                >
                  {option.text}
                </button>
              ))}
            </div>
          </div>
        )}

        {showInsight && userAnswers[currentScenario_data.id] && (
          <div className="scenario-result">
            <div className="your-choice">
              <h4>Your Choice: {userAnswers[currentScenario_data.id].text}</h4>
              <div className={`choice-feedback ${userAnswers[currentScenario_data.id].practical ? 'practical' : 'impractical'}`}>
                {userAnswers[currentScenario_data.id].practical ? '✅ Practical choice!' : '❌ This would be difficult!'}
                <p>{userAnswers[currentScenario_data.id].reason}</p>
              </div>
            </div>
            
            <div className="property-discovered">
              <h3>🎯 Property Discovered: {currentScenario_data.property}</h3>
              <p className="insight-text">{currentScenario_data.insight}</p>
            </div>
            
            <div className="socratic-question">
              <h4>💭 Think About It:</h4>
              <p>{currentScenario_data.question}</p>
            </div>
            
            <ActionButton onClick={handleNext} variant="primary">
              {currentScenario < discoveryScenarios.length - 1 ? 'Next Property Test →' : 'Build Complete Framework →'}
            </ActionButton>
          </div>
        )}
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

// The Golden Age - Why Gold Was Peak Sound Money
const TheGoldenAge = ({ onComplete }) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [userChoices, setUserChoices] = useState({});
  const [showInsights, setShowInsights] = useState(false);

  const goldenAgeSections = [
    {
      id: 'discovery',
      title: '🏛️ The Discovery',
      hook: 'Around 600 BC, something remarkable happened in the ancient world...',
      setup: 'People in different civilizations - Greeks, Romans, Egyptians, Chinese - all independently started using the same thing as money: Gold.',
      question: 'Why did completely separate cultures all choose gold?',
      options: [
        { id: 'valuable', text: 'Gold was the most valuable metal they could find', insight: 'close' },
        { id: 'properties', text: 'Gold had the perfect combination of properties for money', insight: 'correct' },
        { id: 'pretty', text: 'Gold was beautiful and impressive to look at', insight: 'surface' },
        { id: 'rare', text: 'Gold was extremely rare, making it special', insight: 'partial' }
      ],
      reality: 'Gold wasn\'t chosen because it was pretty or valuable - it became valuable BECAUSE it was perfect money. Ancient peoples discovered that gold had a unique combination of properties that made it ideal for storing and transferring value.',
      transition: 'But what exactly made gold so special? Let\'s examine what they discovered...'
    },
    {
      id: 'properties',
      title: '⚖️ The Perfect Properties',
      hook: 'Ancient peoples were essentially running a 2,000-year experiment in money...',
      setup: 'They tried everything: shells, cattle, silver, bronze, iron. But gold consistently won. Here\'s what they discovered gold had that other materials lacked:',
      propertyDemo: [
        { property: 'Scarcity', gold: 'Limited supply, hard to find', other: 'Shells: too common, Silver: too abundant' },
        { property: 'Durability', gold: 'Never rusts, tarnishes, or decays', other: 'Iron: rusts, Wood: rots' },
        { property: 'Divisibility', gold: 'Can be melted and formed into any size', other: 'Cattle: can\'t split a cow' },
        { property: 'Portability', gold: 'High value in small amounts', other: 'Stone: too heavy' },
        { property: 'Verifiability', gold: 'Distinctive color, weight, and properties', other: 'Other metals: easily faked' },
        { property: 'Fungibility', gold: 'Pure gold is identical everywhere', other: 'Cattle: each animal different' }
      ],
      question: 'What does this tell us about money?',
      options: [
        { id: 'accident', text: 'Gold became money by historical accident', insight: 'wrong' },
        { id: 'science', text: 'Good money properties can be objectively identified', insight: 'correct' },
        { id: 'culture', text: 'Money is purely a cultural choice', insight: 'incomplete' },
        { id: 'government', text: 'Governments decide what becomes money', insight: 'backwards' }
      ],
      reality: 'Gold became money through a natural selection process. Any civilization that used inferior money was at a disadvantage in trade, savings, and economic development. Gold won because it was scientifically superior.',
      transition: 'This led to something unprecedented in human history...'
    },
    {
      id: 'golden_age',
      title: '🌟 The Golden Age (1800s-1914)',
      hook: 'For over 100 years, the world experienced unprecedented prosperity...',
      setup: 'From 1800 to 1914, most of the world operated on a gold standard. Countries\' currencies were backed by gold, and people could exchange their money for actual gold. This period saw:',
      achievements: [
        '🏭 Industrial Revolution accelerated globally',
        '🚂 Transcontinental railroads built',
        '🏙️ Modern cities constructed',
        '📈 Living standards rose dramatically',
        '🌍 Global trade flourished',
        '💰 Stable prices for decades',
        '🏦 People could save for retirement with confidence'
      ],
      question: 'Why did this period see such incredible progress?',
      options: [
        { id: 'technology', text: 'New technologies made everything possible', insight: 'incomplete' },
        { id: 'sound_money', text: 'Sound money enabled long-term planning and investment', insight: 'correct' },
        { id: 'smart_people', text: 'People were just smarter and worked harder', insight: 'surface' },
        { id: 'luck', text: 'It was a lucky period in history', insight: 'wrong' }
      ],
      reality: 'Sound money was the foundation that enabled everything else. When people could save gold and trust it would hold value, they could plan for the future, invest in long-term projects, and build generational wealth. Technology and human ingenuity flourished because the monetary system was stable.',
      transition: 'But if gold was so perfect, why did we abandon it?'
    }
  ];

  const currentData = goldenAgeSections[currentSection];

  const handleChoice = (optionId) => {
    setUserChoices(prev => ({ ...prev, [currentData.id]: optionId }));
    setShowInsights(true);
  };

  const handleNext = () => {
    if (currentSection < goldenAgeSections.length - 1) {
      setCurrentSection(currentSection + 1);
      setShowInsights(false);
    } else {
      onComplete(3);
    }
  };

  return (
    <div className="module-container">
      <div className="section-card">
        <h1 className="heading-critical">The Golden Age</h1>
        <p>Understanding why gold became the world's money - and why it worked so well.</p>
        
        <div className="scenario-progress">
          <p>Section {currentSection + 1} of {goldenAgeSections.length}</p>
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: `${((currentSection + 1) / goldenAgeSections.length) * 100}%` }}
            />
          </div>
        </div>
      </div>
      
      <div className="card-feature">
        <h2 className="heading-high">{currentData.title}</h2>
        
        <div className="golden-age-content">
          <div className="hook-section">
            <p className="hook-text">{currentData.hook}</p>
          </div>
          
          <div className="setup-section">
            <p>{currentData.setup}</p>
          </div>
          
          {currentData.propertyDemo && (
            <div className="property-demonstration">
              <h3>📊 The Money Properties Test</h3>
              <div className="property-grid">
                {currentData.propertyDemo.map((item, index) => (
                  <div key={index} className="property-comparison">
                    <h4>{item.property}</h4>
                    <div className="gold-advantage">
                      <strong>🥇 Gold:</strong> {item.gold}
                    </div>
                    <div className="others-disadvantage">
                      <strong>❌ Others:</strong> {item.other}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {currentData.achievements && (
            <div className="achievements-showcase">
              <h3>🏆 What The Golden Age Achieved</h3>
              <div className="achievements-grid">
                {currentData.achievements.map((achievement, index) => (
                  <div key={index} className="achievement-item">
                    {achievement}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {!showInsights && (
            <>
              <h4>{currentData.question}</h4>
              <div className="quiz-options">
                {currentData.options.map(option => (
                  <ActionButton
                    key={option.id}
                    onClick={() => handleChoice(option.id)}
                    variant="outline"
                  >
                    {option.text}
                  </ActionButton>
                ))}
              </div>
            </>
          )}
          
          {showInsights && (
            <div className="quiz-feedback correct">
              <div className="feedback-text">
                <h4>Your choice: "{currentData.options.find(opt => opt.id === userChoices[currentData.id])?.text}"</h4>
                
                <div className="insight-box">
                  <strong>💡 The Reality:</strong> {currentData.reality}
                </div>
                
                <div className="transition-hint">
                  <strong>🔮 Next:</strong> {currentData.transition}
                </div>
              </div>
              
              <ActionButton onClick={handleNext} variant="primary">
                {currentSection < goldenAgeSections.length - 1 ? 'Continue The Story →' : 'Discover What Went Wrong →'}
              </ActionButton>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// The Great Betrayal - 1971 Nixon Shock Detailed Story
const TheGreatBetrayal = ({ onComplete }) => {
  const [currentChapter, setCurrentChapter] = useState(0);
  const [userPredictions, setUserPredictions] = useState({});
  const [showReality, setShowReality] = useState(false);

  const betrayalChapters = [
    {
      id: 'setup',
      title: '⚠️ The Setup (1960s)',
      hook: 'By the 1960s, cracks were showing in the golden system...',
      situation: 'The US government was spending massive amounts on the Vietnam War and social programs. But there was a problem: they were spending more money than they had gold to back it up.',
      tension: 'Other countries started to notice. They began asking: "If we give you our goods and you give us dollars, can we actually exchange those dollars for gold like you promised?"',
      question: 'What do you think the US government should have done?',
      options: [
        { id: 'reduce_spending', text: 'Cut spending to match their gold reserves', consequence: 'responsible' },
        { id: 'get_more_gold', text: 'Acquire more gold to back their spending', consequence: 'difficult' },
        { id: 'change_rules', text: 'Change the rules to avoid the gold constraint', consequence: 'deceptive' },
        { id: 'ignore_problem', text: 'Ignore the problem and hope it goes away', consequence: 'dangerous' }
      ],
      foreshadowing: 'The US government chose option 3. They decided to change the rules rather than their spending habits.'
    },
    {
      id: 'crisis',
      title: '💥 The Crisis Weekend (August 1971)',
      hook: 'Friday, August 13th, 1971. President Nixon had a secret...',
      situation: 'Nixon gathered his economic advisors at Camp David for a secret weekend meeting. Other countries were demanding gold for their dollars faster than ever. The US was running out of gold.',
      tension: 'Nixon faced a choice: Either cut government spending dramatically, or break the promise to exchange dollars for gold. The spending cuts would be politically devastating.',
      question: 'What do you predict Nixon chose?',
      options: [
        { id: 'honor_promise', text: 'Honor the gold promise and cut spending', prediction: 'noble' },
        { id: 'temporary_suspension', text: 'Temporarily suspend gold backing', prediction: 'pragmatic' },
        { id: 'permanent_break', text: 'Permanently end gold backing', prediction: 'radical' },
        { id: 'partial_default', text: 'Reduce the gold exchange rate', prediction: 'compromise' }
      ],
      reality: 'Nixon chose to "temporarily" suspend gold backing. He claimed it was just until the economic situation stabilized. That was over 50 years ago.',
      shock: 'Sunday evening, August 15th, 1971: Nixon went on national television and announced that the US would no longer exchange dollars for gold. No vote. No debate. One man changed the global monetary system overnight.'
    },
    {
      id: 'immediate_aftermath',
      title: '🌍 The Immediate Aftermath (1971-1973)',
      hook: 'The world woke up Monday morning to a completely different monetary system...',
      situation: 'Countries that had been saving US dollars suddenly realized their savings were no longer backed by gold. It was just paper with promises.',
      chaos: [
        'Currency markets went wild - no one knew what anything was worth',
        'Countries scrambled to figure out what to do with their dollar reserves',  
        'Gold prices soared as people fled to real money',
        'International trade deals became much more complex',
        'Inflation began accelerating in most countries'
      ],
      question: 'Why do you think Nixon called this "temporary"?',
      options: [
        { id: 'believed_temporary', text: 'He genuinely believed it would be temporary', insight: 'naive' },
        { id: 'political_cover', text: 'Saying "temporary" made it politically acceptable', insight: 'shrewd' },
        { id: 'buy_time', text: 'He needed time to figure out what to do next', insight: 'stalling' },
        { id: 'permanent_plan', text: 'He always planned it to be permanent but couldn\'t say so', insight: 'deceptive' }
      ],
      reality: 'Most historians believe Nixon used "temporary" as political cover. Ending the gold standard permanently would have been too shocking to announce directly. By calling it temporary, he could implement it and let time normalize the new system.',
      consequence: 'What Nixon presented as a temporary emergency measure became the permanent foundation of our monetary system.'
    },
    {
      id: 'money_printing_mechanics',
      title: '🖨️ How Money Printing Actually Works',
      hook: 'With gold gone, governments discovered they could create money out of thin air...',
      situation: 'Think of government money printing like a credit card with no limit and no bill that ever comes due. When governments need money, they don\'t have to tax more or borrow from real savers—they just create new money digitally.',
      personalAnalogy: {
        title: '💳 It\'s Like Having a Magic Credit Card',
        yourCredit: 'When YOU use a credit card, you must pay it back with real work and real money. There are limits, interest charges, and consequences for overspending.',
        governmentCredit: 'When GOVERNMENTS "spend" new money, they just type numbers into a computer. No work required. No real assets needed. No limit on the amount.',
        theKicker: 'But here\'s the kicker: While your credit card debt makes you poorer, government money printing makes EVERYONE poorer through inflation—except the government gets to spend the new money first.'
      },
      mechanicsBreakdown: [
        {
          step: '1. Government Wants to Spend',
          detail: 'Congress approves $1 trillion in spending they don\'t have',
          analogy: 'Like deciding to buy a $50,000 car when you only have $10,000'
        },
        {
          step: '2. Treasury Issues Bonds', 
          detail: 'Government creates IOUs (bonds) for the money they need',
          analogy: 'Like writing yourself an IOU instead of getting a real loan'
        },
        {
          step: '3. Federal Reserve Buys Bonds',
          detail: 'The Fed buys government IOUs with newly created digital money',
          analogy: 'Like your friend paying for your car with counterfeit money'
        },
        {
          step: '4. Money Enters Economy',
          detail: 'New money flows into banks and eventually reaches people and businesses',
          analogy: 'The counterfeit money spreads through the economy, making all money worth less'
        }
      ],
      question: 'What\'s the fundamental difference between your debt and government debt?',
      options: [
        { id: 'both_same', text: 'Both types of debt work the same way', insight: 'misunderstanding' },
        { id: 'gov_more_responsible', text: 'Government debt is more responsible because it\'s for public good', insight: 'naive' },
        { id: 'you_work_gov_prints', text: 'You must work to pay debt, government can just print money', insight: 'correct' },
        { id: 'gov_has_assets', text: 'Government has more assets to back their debt', insight: 'confused' }
      ],
      reality: 'You\'re exactly right. This is the core insight that changes everything: When you go into debt, YOU have to work harder to pay it back. When government goes into debt, EVERYONE\'S money becomes worth less to pay it back.',
      consequence: 'This is why inflation is often called "the cruelest tax" - it taxes your savings without you even knowing it happened.'
    },
    {
      id: 'long_term_consequences',
      title: '📈 The Long-Term Consequences (1971-Today)',
      hook: 'Nixon\'s "temporary" measure unleashed forces that are still reshaping the world...',
      situation: 'With gold no longer constraining government spending, something unprecedented began happening: governments could spend unlimited amounts by simply creating new money.',
      consequences: [
        {
          category: 'Inflation',
          impact: 'Prices that had been stable for decades began rising consistently',
          example: '1971: Average house $25,000. 2024: Average house $400,000+'
        },
        {
          category: 'Government Debt', 
          impact: 'Without gold backing, governments could borrow unlimited amounts',
          example: '1971: US debt $400 billion. 2024: US debt $33+ trillion'
        },
        {
          category: 'Boom-Bust Cycles',
          impact: 'Economic bubbles became more frequent and severe',
          example: '1970s stagflation, 1980s S&L crisis, 2000 dot-com, 2008 housing, 2020 everything bubble'
        },
        {
          category: 'Wealth Inequality',
          impact: 'Those closest to money creation benefited most',
          example: 'Asset owners got rich while savers got poor'
        }
      ],
      question: 'Looking at 50+ years of results, was Nixon\'s decision good for ordinary people?',
      options: [
        { id: 'good_decision', text: 'Yes - it gave governments flexibility to manage the economy', perspective: 'government' },
        { id: 'bad_decision', text: 'No - it allowed unlimited money printing that hurt savers', perspective: 'people' },
        { id: 'mixed_results', text: 'Mixed - some benefits but also serious problems', perspective: 'nuanced' },
        { id: 'too_complex', text: 'Too complex to judge - many factors involved', perspective: 'uncertain' }
      ],
      reality: 'The evidence suggests ordinary people have paid the price. While governments gained spending flexibility, working people saw their purchasing power decline, their savings lose value, and wealth concentration increase dramatically.',
      betrayal: 'The "temporary" suspension became a permanent betrayal of sound money principles. We went from money you could trust to money you had to trust.'
    }
  ];

  const currentChapter_data = betrayalChapters[currentChapter];

  const handlePrediction = (optionId) => {
    setUserPredictions(prev => ({ ...prev, [currentChapter_data.id]: optionId }));
    setShowReality(true);
  };

  const handleNext = () => {
    if (currentChapter < betrayalChapters.length - 1) {
      setCurrentChapter(currentChapter + 1);
      setShowReality(false);
    } else {
      onComplete(4);
    }
  };

  return (
    <div className="module-container">
      <div className="section-card">
        <h1 className="heading-critical">The Great Betrayal</h1>
        <p>How the world lost sound money in a single weekend - and what it cost us.</p>
        
        <div className="chapter-progress">
          <p>Chapter {currentChapter + 1} of {betrayalChapters.length}</p>
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: `${((currentChapter + 1) / betrayalChapters.length) * 100}%` }}
            />
          </div>
        </div>
      </div>
      
      <div className="card-feature">
        <h2 className="heading-high">{currentChapter_data.title}</h2>
        
        <div className="betrayal-content">
          <div className="hook-section">
            <p className="hook-text">{currentChapter_data.hook}</p>
          </div>
          
          <div className="situation-section">
            <p>{currentChapter_data.situation}</p>
            {currentChapter_data.tension && (
              <div className="tension-box">
                <p><strong>⚡ The Tension:</strong> {currentChapter_data.tension}</p>
              </div>
            )}
          </div>
          
          {currentChapter_data.chaos && (
            <div className="chaos-section">
              <h3>🌪️ The Chaos That Followed</h3>
              <ul>
                {currentChapter_data.chaos.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          )}
          
          {currentChapter_data.personalAnalogy && (
            <div className="personal-analogy-section">
              <div className="analogy-card">
                <h3>{currentChapter_data.personalAnalogy.title}</h3>
                
                <div className="analogy-comparison">
                  <div className="analogy-your-credit">
                    <h4>💳 Your Credit Card</h4>
                    <p>{currentChapter_data.personalAnalogy.yourCredit}</p>
                  </div>
                  
                  <div className="analogy-government-credit">
                    <h4>🏛️ Government "Credit"</h4>
                    <p>{currentChapter_data.personalAnalogy.governmentCredit}</p>
                  </div>
                </div>
                
                <div className="analogy-kicker">
                  <strong>🎯 The Kicker:</strong> {currentChapter_data.personalAnalogy.theKicker}
                </div>
              </div>
            </div>
          )}
          
          {currentChapter_data.mechanicsBreakdown && (
            <div className="mechanics-breakdown-section">
              <h3>🔧 How It Actually Works</h3>
              <div className="mechanics-steps">
                {currentChapter_data.mechanicsBreakdown.map((step, index) => (
                  <div key={index} className="mechanics-step-card">
                    <div className="step-header">
                      <span className="step-number">{step.step}</span>
                    </div>
                    <div className="step-content">
                      <p><strong>Government:</strong> {step.detail}</p>
                      <p><strong>Your Analogy:</strong> {step.analogy}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {currentChapter_data.consequences && (
            <div className="consequences-section">
              <h3>⚖️ The Price We're Still Paying</h3>
              <div className="consequences-grid">
                {currentChapter_data.consequences.map((consequence, index) => (
                  <div key={index} className="consequence-card">
                    <h4>{consequence.category}</h4>
                    <p><strong>Impact:</strong> {consequence.impact}</p>
                    <p><strong>Example:</strong> {consequence.example}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {!showReality && (
            <>
              <h4>{currentChapter_data.question}</h4>
              <div className="quiz-options">
                {currentChapter_data.options.map(option => (
                  <ActionButton
                    key={option.id}
                    onClick={() => handlePrediction(option.id)}
                    variant="outline"
                  >
                    {option.text}
                  </ActionButton>
                ))}
              </div>
            </>
          )}
          
          {showReality && (
            <div className="quiz-feedback correct">
              <div className="feedback-text">
                <h4>Your prediction: "{currentChapter_data.options.find(opt => opt.id === userPredictions[currentChapter_data.id])?.text}"</h4>
                
                {currentChapter_data.reality && (
                  <div className="reality-box">
                    <strong>📜 What Actually Happened:</strong> {currentChapter_data.reality}
                  </div>
                )}
                
                {currentChapter_data.shock && (
                  <div className="shock-box">
                    <strong>💥 The Shock:</strong> {currentChapter_data.shock}
                  </div>
                )}
                
                {currentChapter_data.consequence && (
                  <div className="consequence-box">
                    <strong>⚡ The Consequence:</strong> {currentChapter_data.consequence}
                  </div>
                )}
                
                {currentChapter_data.betrayal && (
                  <div className="betrayal-box">
                    <strong>💔 The Betrayal:</strong> {currentChapter_data.betrayal}
                  </div>
                )}
                
                {currentChapter_data.foreshadowing && (
                  <div className="foreshadowing-box">
                    <strong>🔮 Foreshadowing:</strong> {currentChapter_data.foreshadowing}
                  </div>
                )}
              </div>
              
              <ActionButton onClick={handleNext} variant="primary">
                {currentChapter < betrayalChapters.length - 1 ? 'Continue The Story →' : 'Understand The Impact →'}
              </ActionButton>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


// Renamed: MoneySuperpowers -> MoneyFunctions
const MoneyFunctions = ({ onComplete }) => {
  const [currentScenario, setCurrentScenario] = useState(0);
  const [answers, setAnswers] = useState({});
  const [feedback, setFeedback] = useState({});
  const [unlockedFunctions, setUnlockedFunctions] = useState([]);

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
        // All scenarios complete - finish the component
        setTimeout(() => onComplete(2), 2000);
      }
    }, 2000);
  };

  const currentScenarioData = scenarios[currentScenario];
  
  return (
    <div className="module-container">
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

// Interactive Money Systems Testing - Step 2
const InteractiveMoneySystemsTest = ({ onComplete }) => {
  const [currentTest, setCurrentTest] = useState(0);
  const [testResults, setTestResults] = useState({});
  const [showAnalysis, setShowAnalysis] = useState(false);

  const moneySystemTests = [
    {
      id: 'gold_stress_test',
      title: '🥇 Gold Under Pressure',
      scenario: 'It\'s 1914. World War I just started. Countries need massive amounts of money for weapons, soldiers, and supplies.',
      challenge: 'You\'re the finance minister. The war costs $1 million per day, but you only have $100,000 worth of gold backing your currency.',
      question: 'With gold-backed money, what are your options?',
      options: [
        { 
          id: 'print_anyway', 
          text: 'Print more money anyway - who will check?', 
          result: 'impossible',
          explanation: 'Gold standard makes this impossible. People could exchange paper for gold and discover the fraud.'
        },
        { 
          id: 'borrow_gold', 
          text: 'Borrow gold from other countries', 
          result: 'limited',
          explanation: 'Other countries are also at war and need their gold. Limited solution.'
        },
        { 
          id: 'abandon_gold', 
          text: 'Temporarily abandon the gold standard', 
          result: 'historical',
          explanation: 'This is exactly what most countries did! Gold constrains government spending.'
        }
      ],
      insight: 'Gold\'s constraint on money printing is a feature, not a bug - it prevents governments from funding wars through inflation.',
      property_revealed: 'Fixed Supply Constraint'
    },
    {
      id: 'fiat_stress_test', 
      title: '💵 Fiat Money Under Pressure',
      scenario: 'It\'s 2008. Banks are failing, people are panicking, and the economy is crashing.',
      challenge: 'You\'re the central bank chair. Banks need $700 billion immediately or the financial system collapses.',
      question: 'With fiat money, what can you do?',
      options: [
        {
          id: 'print_instantly',
          text: 'Create $700 billion digitally and send it to banks',
          result: 'possible',
          explanation: 'This is exactly what happened! Fiat money allows unlimited money creation in emergencies.'
        },
        {
          id: 'wait_for_approval',
          text: 'Wait for Congress to approve new taxes to raise the money',
          result: 'too_slow',
          explanation: 'This would take months while banks collapse daily. Fiat allows instant action.'
        },
        {
          id: 'let_them_fail',
          text: 'Let the banks fail - market forces will sort it out',
          result: 'economic_collapse',
          explanation: 'This could cause a complete economic collapse. Fiat gives flexibility to prevent this.'
        }
      ],
      insight: 'Fiat money provides flexibility in emergencies but removes constraints on money printing.',
      property_revealed: 'Emergency Flexibility vs Sound Money'
    },
    {
      id: 'bitcoin_stress_test',
      title: '🟠 Bitcoin Under Pressure', 
      scenario: 'It\'s 2022. Inflation is spiking globally. Russia invades Ukraine. Supply chains are breaking.',
      challenge: 'You hold Bitcoin during this crisis. Traditional assets are crashing, currencies are inflating.',
      question: 'How does Bitcoin respond to this global stress?',
      options: [
        {
          id: 'bitcoin_breaks',
          text: 'Bitcoin breaks down under pressure like other systems',
          result: 'contrary_evidence',
          explanation: 'Actually, Bitcoin kept operating normally. No downtime, no emergency changes.'
        },
        {
          id: 'bitcoin_adapts',
          text: 'Bitcoin changes its rules to adapt to the crisis',
          result: 'impossible',
          explanation: 'Bitcoin\'s rules cannot be changed by any government, bank, or authority. This is by design.'
        },
        {
          id: 'bitcoin_continues',
          text: 'Bitcoin continues operating normally, unchanged',
          result: 'historical',
          explanation: 'Exactly! Bitcoin operated normally through the entire crisis. Rules never changed.'
        }
      ],
      insight: 'Bitcoin maintains its properties even during global crises - it\'s designed to be unchangeable.',
      property_revealed: 'Crisis-Resistant Immutability'
    }
  ];

  const currentTest_data = moneySystemTests[currentTest];

  const handleTestAnswer = (optionId) => {
    const option = currentTest_data.options.find(opt => opt.id === optionId);
    setTestResults(prev => ({ ...prev, [currentTest_data.id]: option }));
    setShowAnalysis(true);
  };

  const handleNext = () => {
    if (currentTest < moneySystemTests.length - 1) {
      setCurrentTest(currentTest + 1);
      setShowAnalysis(false);
    } else {
      onComplete(1);
    }
  };

  return (
    <div className="module-container">
      <div className="section-card">
        <h1 className="heading-critical">🧪 Test Real Money Systems</h1>
        <p>Put different money systems under extreme pressure to see how they really work.</p>
        <div className="test-progress">
          Stress Test {currentTest + 1} of {moneySystemTests.length}
        </div>
      </div>
      
      <div className="card-feature">
        <h2 className="heading-high">{currentTest_data.title}</h2>
        
        <div className="stress-test-scenario">
          <div className="scenario-context">
            <h3>📅 The Scenario</h3>
            <p>{currentTest_data.scenario}</p>
          </div>
          
          <div className="stress-challenge">
            <h3>⚡ The Challenge</h3>
            <p>{currentTest_data.challenge}</p>
          </div>
        </div>

        {!showAnalysis && (
          <div className="stress-test-question">
            <h4>{currentTest_data.question}</h4>
            <div className="test-options">
              {currentTest_data.options.map(option => (
                <button
                  key={option.id}
                  className="test-option-button"
                  onClick={() => handleTestAnswer(option.id)}
                >
                  {option.text}
                </button>
              ))}
            </div>
          </div>
        )}

        {showAnalysis && testResults[currentTest_data.id] && (
          <div className="test-analysis">
            <div className="your-answer">
              <h4>Your Choice: {testResults[currentTest_data.id].text}</h4>
              <div className={`result-feedback result-${testResults[currentTest_data.id].result}`}>
                {testResults[currentTest_data.id].result === 'historical' ? '✅ This is exactly what happened!' :
                 testResults[currentTest_data.id].result === 'possible' ? '🟡 This was possible with this money system' :
                 testResults[currentTest_data.id].result === 'impossible' ? '❌ This money system prevents this' :
                 '⚠️ This would have had major consequences'}
                <p>{testResults[currentTest_data.id].explanation}</p>
              </div>
            </div>
            
            <div className="property-revelation">
              <h3>🔍 Property Revealed: {currentTest_data.property_revealed}</h3>
              <p className="insight-text">{currentTest_data.insight}</p>
            </div>
            
            <ActionButton onClick={handleNext} variant="primary">
              {currentTest < moneySystemTests.length - 1 ? 'Next Stress Test →' : 'Build Your Scorecard →'}
            </ActionButton>
          </div>
        )}
      </div>
    </div>
  );
};

// Hands-On Scorecard Builder - Step 3
const HandsOnScorecardBuilder = ({ onComplete, onUnlockTrait }) => {
  const [buildingPhase, setBuildingPhase] = useState(0);
  const [scorecardProperties, setScorecardProperties] = useState([]);
  const [userDefinitions, setUserDefinitions] = useState({});
  
  const propertyBuildingSteps = [
    {
      id: 'discovery_recap',
      title: 'Your Discoveries So Far',
      content: 'You\'ve discovered key properties through real scenarios. Let\'s organize them into a systematic framework.'
    },
    {
      id: 'define_properties',
      title: 'Define Each Property',
      content: 'In your own words, define what each property means and why it matters.'
    },
    {
      id: 'create_scorecard',
      title: 'Create Your Scorecard',
      content: 'Build a practical tool you can use to evaluate any money system.'
    }
  ];

  // This would continue with interactive property definition...
  // For brevity, moving to the key comparison component

  return (
    <div className="module-container">
      <div className="section-card">
        <h1 className="heading-critical">🔨 Build Your Money Scorecard</h1>
        <p>Turn your discoveries into a practical framework for evaluating any money.</p>
      </div>
      
      <div className="card-feature">
        {/* Interactive scorecard building would go here */}
        <ActionButton onClick={() => onComplete(2)} variant="primary">
          Apply Your Scorecard →
        </ActionButton>
      </div>
    </div>
  );
};

// Interactive Money Comparison - Step 4  
const InteractiveMoneyComparison = ({ onComplete }) => {
  const [comparisonMode, setComparisonMode] = useState('interactive'); // interactive, results
  const [userScores, setUserScores] = useState({});
  const [currentProperty, setCurrentProperty] = useState(0);
  
  const properties = [
    'Self Custody', 'Decentralization', 'Verifiability', 'Fixed Supply',
    'Genuine Scarcity', 'Fungibility', 'Portability', 'Divisibility', 
    'Durability', 'Acceptability'
  ];
  
  const moneyTypes = ['Gold', 'Fiat Currency', 'Bitcoin'];

  return (
    <div className="module-container">
      <div className="section-card">
        <h1 className="heading-critical">⚖️ Apply & Compare Everything</h1>
        <p>Use your scorecard to compare gold, fiat currency, and Bitcoin.</p>
      </div>
      
      <div className="card-feature">
        {/* Interactive comparison interface would go here */}
        <ActionButton onClick={() => onComplete(3)} variant="primary">
          Master Sound Money Analysis →
        </ActionButton>
      </div>
    </div>
  );
};

// Priority 2: Score Bitcoin vs Fiat - Practical Comparison
const ScoreBitcoinVsFiat = ({ onComplete }) => {
  const [currentComparison, setCurrentComparison] = useState(0);
  const [userScores, setUserScores] = useState({});
  const [showResults, setShowResults] = useState(false);

  const comparisons = [
    {
      property: 'Self Custody',
      question: 'Who controls your money?',
      fiat: {
        reality: 'Banks and governments control your access. They can freeze, seize, or block your money at any time.',
        example: 'Canadian truckers had accounts frozen for donating $25 to protests.',
        score: 2
      },
      bitcoin: {
        reality: 'You hold the private keys. No one can freeze, seize, or block your Bitcoin without your permission.',
        example: 'Your Bitcoin wallet works 24/7 regardless of government or bank policies.',
        score: 10
      }
    },
    {
      property: 'Fixed Supply',
      question: 'Can more money be created?',
      fiat: {
        reality: 'Governments can print unlimited amounts. No mathematical or physical constraint exists.',
        example: 'US printed $4 trillion in 2020-2021, increasing money supply by 40%.',
        score: 1
      },
      bitcoin: {
        reality: 'Maximum 21 million Bitcoin will ever exist. This is mathematically enforced by the code.',
        example: 'No government, bank, or authority can create more Bitcoin beyond the limit.',
        score: 10
      }
    },
    {
      property: 'Decentralization',
      question: 'Who can change the rules?',
      fiat: {
        reality: 'Central banks and governments control all monetary policy. They can change rules unilaterally.',
        example: 'Nixon ended gold backing in 1971 with no vote or public consultation.',
        score: 1
      },
      bitcoin: {
        reality: 'No single entity controls Bitcoin. Changes require consensus from thousands of participants worldwide.',
        example: 'Multiple attempts to change Bitcoin rules have failed due to decentralized resistance.',
        score: 9
      }
    }
  ];

  const currentComp = comparisons[currentComparison];

  const handleNext = () => {
    if (currentComparison < comparisons.length - 1) {
      setCurrentComparison(currentComparison + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleComplete = () => {
    onComplete(3);
  };

  if (showResults) {
    const totalFiat = comparisons.reduce((sum, comp) => sum + comp.fiat.score, 0);
    const totalBitcoin = comparisons.reduce((sum, comp) => sum + comp.bitcoin.score, 0);
    const maxScore = comparisons.length * 10;

    return (
      <div className="module-container">
        <div className="section-card">
          <h1 className="heading-critical">🏆 The Scorecard Results</h1>
          <p>Here's how Bitcoin and fiat currency scored on the key sound money properties:</p>
        </div>
        
        <div className="card-feature">
          <div className="score-comparison">
            <div className="score-card bitcoin-score">
              <h2>🟠 Bitcoin</h2>
              <div className="total-score">{totalBitcoin}/{maxScore}</div>
              <div className="score-percentage">{Math.round((totalBitcoin/maxScore) * 100)}% Sound Money</div>
            </div>
            
            <div className="vs-divider">VS</div>
            
            <div className="score-card fiat-score">
              <h2>💵 Fiat Currency</h2>
              <div className="total-score">{totalFiat}/{maxScore}</div>
              <div className="score-percentage">{Math.round((totalFiat/maxScore) * 100)}% Sound Money</div>
            </div>
          </div>

          <div className="detailed-breakdown">
            <h3>Property Breakdown</h3>
            {comparisons.map((comp, index) => (
              <div key={index} className="property-breakdown">
                <h4>{comp.property}</h4>
                <div className="property-scores">
                  <div className="property-score">
                    <span className="money-type">Bitcoin:</span>
                    <div className="score-bar">
                      <div className="score-fill bitcoin-fill" style={{width: `${comp.bitcoin.score * 10}%`}}></div>
                      <span className="score-number">{comp.bitcoin.score}/10</span>
                    </div>
                  </div>
                  <div className="property-score">
                    <span className="money-type">Fiat:</span>
                    <div className="score-bar">
                      <div className="score-fill fiat-fill" style={{width: `${comp.fiat.score * 10}%`}}></div>
                      <span className="score-number">{comp.fiat.score}/10</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="final-insight">
            <h3>💡 The Bottom Line</h3>
            <p>Bitcoin scores <strong>{Math.round((totalBitcoin/maxScore) * 100)}%</strong> as sound money while fiat currency scores only <strong>{Math.round((totalFiat/maxScore) * 100)}%</strong>.</p>
            <p>This isn't opinion—it's an objective comparison based on the properties of sound money that you've learned.</p>
          </div>

          <ActionButton onClick={handleComplete} variant="primary">
            Ready for Your Action Plan →
          </ActionButton>
        </div>
      </div>
    );
  }

  return (
    <div className="module-container">
      <div className="section-card">
        <h1 className="heading-critical">⚖️ Score Bitcoin vs Fiat</h1>
        <p>Use your framework to directly compare Bitcoin and fiat currency.</p>
        <div className="comparison-progress">
          Property {currentComparison + 1} of {comparisons.length}
        </div>
      </div>
      
      <div className="card-feature">
        <h2 className="heading-high">{currentComp.property}</h2>
        <h3>{currentComp.question}</h3>
        
        <div className="side-by-side-comparison">
          <div className="comparison-card fiat-card">
            <h4>💵 Fiat Currency</h4>
            <div className="reality-section">
              <h5>Reality:</h5>
              <p>{currentComp.fiat.reality}</p>
            </div>
            <div className="example-section">
              <h5>Real Example:</h5>
              <p>{currentComp.fiat.example}</p>
            </div>
            <div className="score-section">
              <span className="score-label">Sound Money Score:</span>
              <span className="score-value fiat-score-value">{currentComp.fiat.score}/10</span>
            </div>
          </div>

          <div className="comparison-card bitcoin-card">
            <h4>🟠 Bitcoin</h4>
            <div className="reality-section">
              <h5>Reality:</h5>
              <p>{currentComp.bitcoin.reality}</p>
            </div>
            <div className="example-section">
              <h5>Real Example:</h5>
              <p>{currentComp.bitcoin.example}</p>
            </div>
            <div className="score-section">
              <span className="score-label">Sound Money Score:</span>
              <span className="score-value bitcoin-score-value">{currentComp.bitcoin.score}/10</span>
            </div>
          </div>
        </div>

        <ActionButton onClick={handleNext} variant="primary">
          {currentComparison < comparisons.length - 1 ? 'Next Property →' : 'See Final Results →'}
        </ActionButton>
      </div>
    </div>
  );
};

// Priority 4: Your Action Plan - Bridge to Action
const YourActionPlan = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedActions, setSelectedActions] = useState(new Set());

  const actionSteps = [
    {
      title: '🎯 Your Learning Achievement',
      content: 'You now understand what makes money sound and why Bitcoin scores higher than fiat currency on objective measures.',
      key_insight: 'You have the knowledge framework to evaluate any money system—Bitcoin, CBDCs, new cryptocurrencies, or future innovations.'
    },
    {
      title: '🚀 Ready to Take Action?',
      content: 'Knowledge without action remains just knowledge. Here are concrete steps you can take:',
      actions: [
        {
          id: 'learn_more',
          title: '📚 Continue Learning',
          description: 'Complete the next module to understand HOW Bitcoin actually works',
          difficulty: 'Easy',
          timeframe: '30 minutes'
        },
        {
          id: 'get_wallet',
          title: '📱 Get a Bitcoin Wallet',
          description: 'Download a reputable wallet app to experience Bitcoin firsthand',
          difficulty: 'Easy', 
          timeframe: '10 minutes'
        },
        {
          id: 'buy_small_amount',
          title: '🪙 Buy a Small Amount',
          description: 'Purchase $10-50 worth of Bitcoin to understand the process',
          difficulty: 'Medium',
          timeframe: '20 minutes'
        },
        {
          id: 'share_knowledge',
          title: '🗣️ Share What You Learned',
          description: 'Teach someone else about sound money properties',
          difficulty: 'Medium',
          timeframe: '1 hour'
        }
      ]
    }
  ];

  const currentStepData = actionSteps[currentStep];

  const handleActionSelect = (actionId) => {
    setSelectedActions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(actionId)) {
        newSet.delete(actionId);
      } else {
        newSet.add(actionId);
      }
      return newSet;
    });
  };

  const handleNext = () => {
    if (currentStep < actionSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete the module
      onComplete(4);
    }
  };

  return (
    <div className="module-container">
      <div className="section-card">
        <h1 className="heading-critical">🎯 Your Action Plan</h1>
        <p>Turn your knowledge into practical action.</p>
      </div>
      
      <div className="card-feature">
        <h2 className="heading-high">{currentStepData.title}</h2>
        
        {currentStep === 0 && (
          <div className="achievement-summary">
            <div className="knowledge-gained">
              <h3>What You Now Understand:</h3>
              <ul>
                <li>✅ The 10 properties of sound money</li>
                <li>✅ Why fiat currency is fundamentally unsound</li> 
                <li>✅ How Bitcoin solves the problems of traditional money</li>
                <li>✅ How to evaluate any money system objectively</li>
              </ul>
            </div>
            
            <div className="insight-box">
              <strong>Key Insight:</strong> {currentStepData.key_insight}
            </div>

            <ActionButton onClick={handleNext} variant="primary">
              What Can I Do With This Knowledge? →
            </ActionButton>
          </div>
        )}

        {currentStep === 1 && (
          <div className="action-selection">
            <p>{currentStepData.content}</p>
            
            <div className="action-options">
              {currentStepData.actions.map(action => (
                <div 
                  key={action.id} 
                  className={`action-card ${selectedActions.has(action.id) ? 'selected' : ''}`}
                  onClick={() => handleActionSelect(action.id)}
                >
                  <div className="action-header">
                    <h4>{action.title}</h4>
                    <div className="action-meta">
                      <span className="difficulty">{action.difficulty}</span>
                      <span className="timeframe">{action.timeframe}</span>
                    </div>
                  </div>
                  <p>{action.description}</p>
                  <div className="selection-indicator">
                    {selectedActions.has(action.id) ? '✅ Selected' : 'Click to select'}
                  </div>
                </div>
              ))}
            </div>

            <div className="commitment-section">
              <h3>💪 Your Commitment</h3>
              {selectedActions.size === 0 ? (
                <p>Select the actions you commit to taking in the next week.</p>
              ) : (
                <div>
                  <p>You've selected <strong>{selectedActions.size}</strong> action{selectedActions.size !== 1 ? 's' : ''} to take:</p>
                  <ul>
                    {Array.from(selectedActions).map(actionId => {
                      const action = currentStepData.actions.find(a => a.id === actionId);
                      return <li key={actionId}>✅ {action.title}</li>;
                    })}
                  </ul>
                </div>
              )}
            </div>

            <ActionButton 
              onClick={handleNext} 
              variant="primary"
              disabled={selectedActions.size === 0}
            >
              {selectedActions.size === 0 ? 'Select at least one action' : 'Complete Money Module →'}
            </ActionButton>
          </div>
        )}
      </div>
    </div>
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
    
    if (stepIndex === 4) {
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
        {currentStep === 0 && <FeelBitcoinFirst onComplete={handleStepComplete} />}
        {currentStep === 1 && <WhyMoneyMattersNow onComplete={handleStepComplete} />}
        {currentStep === 2 && <HandsOnScorecardBuilder onComplete={handleStepComplete} onUnlockTrait={handleUnlockTrait} />}
        {currentStep === 3 && <ScoreBitcoinVsFiat onComplete={handleStepComplete} />}
        {currentStep === 4 && <YourActionPlan onComplete={handleStepComplete} />}
      </div>
    </div>
  );
};

export default MoneyModule;