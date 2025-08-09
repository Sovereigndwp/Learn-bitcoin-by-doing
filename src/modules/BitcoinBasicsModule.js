import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '../contexts/ProgressContext';
import { 
  ContinueButton, 
  ActionButton,
  NavigationButton,
  OptionButton,
  PageLayout,
  ModuleCard
} from '../components/ui';
import { ModuleCompletionButton, InteractiveIcon } from '../components/ui';
import ProgressCounter, { 
  StepProgressCounter,
  CircularProgressCounter 
} from '../components/ui/ProgressCounter';
// ModuleCard already imported from ui index
import '../components/ModuleCommon.css';
// Using unified UI components for consistency

// Bitcoin Introduction - Curiosity-Driven with Strong Hooks
const BitcoinIntroduction = ({ onComplete }) => {
  const [currentDemo, setCurrentDemo] = useState(0);
  const [userPredictions, setUserPredictions] = useState({});
  const [challengeMode, setChallengeMode] = useState(true);

  // Two shocking revelations that build urgency for Bitcoin
  const problemDemos = [
    {
      id: 'control',
      title: 'The $7 Million Question',
      hook: '🚨 February 2022: A government froze $7 million in bank accounts with the click of a button.',
      setup: 'Peaceful protesters in Canada woke up to find their accounts frozen. No court orders. No warnings. They couldn\'t buy groceries for their families or pay rent.',
      shockingDetail: 'One woman had donated just $50 to the cause. Her entire life savings: frozen.',
      thinkingQuestion: "Here's the uncomfortable truth: If someone else can freeze your money, do you actually own it?",
      challengeOptions: [
        'Yes - it\'s still legally mine, just temporarily restricted',
        'No - true ownership means no one can take it away',
        'It depends on whether I agree with their reasons',
        'I never thought about ownership this way before'
      ],
      reality: 'The harsh reality: Having "access" to money is not the same as "owning" money. Your bank account is just an IOU from a bank that can be revoked.',
      bitcoinCliffhanger: 'But what if there was money that governments literally CANNOT freeze, no matter what? Keep reading...'
    },
    {
      id: 'inflation',
      title: 'The Great Wealth Transfer',
      hook: '💰 Your grandfather could buy a house for what you spend on a used car.',
      setup: '1970: Average salary $5,000, average house $23,000. Today: Average salary $50,000, average house $400,000. Wait... something doesn\'t add up here.',
      shockingDetail: 'Your wages went up 10x, but everything else went up 15-20x. You\'re working harder for less.',
      thinkingQuestion: "If you\'re earning 10 times more money than your grandfather, but can afford far less, what happened?",
      challengeOptions: [
        'We\'re definitely richer - look at all this technology!',
        'We\'re actually poorer - our money buys less stuff',
        'It\'s about the same - wages and prices balanced out',
        'This is confusing - I need to see more numbers'
      ],
      reality: 'The uncomfortable truth: Your purchasing power has been systematically stolen through money printing. Every new dollar printed makes your existing dollars worth less.',
      bitcoinCliffhanger: 'But what if money existed that CANNOT be printed? Where your slice of the pie can never shrink? That\'s exactly what Bitcoin solves...'
    }
  ];

  const currentProblem = problemDemos[currentDemo];

  const handleChallengeChoice = (choice) => {
    setUserPredictions(prev => ({
      ...prev,
      [currentProblem.id]: choice
    }));
    setChallengeMode(false);
  };

  const handleDemoClick = () => {
    // Move to next demo or complete
    if (currentDemo < problemDemos.length - 1) {
      setCurrentDemo(currentDemo + 1);
      setChallengeMode(true);
    } else {
      onComplete(0);
    }
  };

  return (
    <div className="step-content introduction">
      <div className="module-header-box">
        <h2>🔥 The Money System is Broken</h2>
        <div className="intro-text">
          <p className="prime-text">Most people don't realize their money isn't really theirs. Let's uncover some uncomfortable truths...</p>
        </div>
      </div>
      
      <div className="content-text">
        <div className="problem-exploration">
          <div className="problem-demo">
            <h3>{currentProblem.title}</h3>
            <div className="hook-text">
              <p className="shock-value">{currentProblem.hook}</p>
            </div>
            <p className="setup-text">{currentProblem.setup}</p>
            <div className="shocking-detail">
              <p className="detail-highlight">💡 {currentProblem.shockingDetail}</p>
            </div>
            
            {challengeMode ? (
              <div className="thinking-challenge">
                <div className="challenge-question">
                  <h4>🤔 Think First:</h4>
                  <p>{currentProblem.thinkingQuestion}</p>
        </div>

                <div className="challenge-options">
                  {currentProblem.challengeOptions.map((option, index) => (
                    <OptionButton
                      key={index}
                      className="challenge-option"
                      onClick={() => handleChallengeChoice(option)}
                    >
                      {option}
                    </OptionButton>
                  ))}
            </div>
              </div>
            ) : (
              <div className="reality-reveal">
                <div className="user-prediction">
                  <h4>Your intuition: "{userPredictions[currentProblem.id]}"</h4>
                </div>

                <div className="reality-check">
                  <h4>💡 The Reality:</h4>
                  <p>{currentProblem.reality}</p>
                </div>
                
                <div className="bitcoin-cliffhanger">
                  <h4>🟠 The Plot Twist:</h4>
                  <p className="cliffhanger-text">{currentProblem.bitcoinCliffhanger}</p>
                </div>
                
                <ActionButton 
                  onClick={handleDemoClick}
                  className="demo-next-button pulsing-button"
                >
                  {currentDemo < problemDemos.length - 1 ? "🔥 Another Shocking Truth →" : "🟠 Discover Bitcoin's Solution →"}
                </ActionButton>
              </div>
            )}
        </div>

          <div className="progress-dots">
            {problemDemos.map((_, index) => (
              <div 
                key={index} 
                className={`progress-dot ${index === currentDemo ? 'active' : ''} ${index < currentDemo ? 'completed' : ''}`}
              />
            ))}
        </div>
        </div>
      </div>
      </div>
    );
  };

// The Money Battle - Gamified Property Comparison
const PropertyCompare = ({ onComplete }) => {
  const [currentProperty, setCurrentProperty] = useState(0);
  const [selections, setSelections] = useState({});
  const [scores, setScores] = useState({ fiat: 0, gold: 0, bitcoin: 0 });
  const [showResults, setShowResults] = useState(false);
  const [battlePhase, setBattlePhase] = useState('intro'); // intro, battle, results

  const propertyBattles = [
    { 
      key: "Control", 
      title: "Who Controls It?", 
      question: "Can governments freeze, confiscate, or manipulate this money?",
      options: {
        fiat: { label: "💵 Fiat Money", answer: "Government controls everything", pass: false },
        gold: { label: "🥇 Gold", answer: "You control physical gold", pass: true },
        bitcoin: { label: "🟠 Bitcoin", answer: "Only you control your Bitcoin", pass: true }
      },
      winner: "bitcoin",
      insight: "Bitcoin wins because it's the ONLY money that can't be frozen or confiscated by anyone."
    },
    {
      key: "Scarcity", 
      title: "Is the Supply Fixed?", 
      question: "Can more of this money be created, diluting your holdings?",
      options: {
        fiat: { label: "💵 Fiat Money", answer: "Unlimited printing possible", pass: false },
        gold: { label: "🥇 Gold", answer: "More can be mined", pass: true },
        bitcoin: { label: "🟠 Bitcoin", answer: "Exactly 21 million forever", pass: true }
      },
      winner: "bitcoin",
      insight: "Bitcoin's 21 million limit is mathematically guaranteed - unlike gold mining or money printing."
    },
    {
      key: "Verification", 
      title: "Can You Verify It's Real?", 
      question: "How easy is it to prove this money isn't fake?",
      options: {
        fiat: { label: "💵 Fiat Money", answer: "Special equipment needed", pass: true },
        gold: { label: "🥇 Gold", answer: "Complex testing required", pass: false },
        bitcoin: { label: "🟠 Bitcoin", answer: "Instantly verifiable by anyone", pass: true }
      },
      winner: "bitcoin",
      insight: "Bitcoin transactions are cryptographically verifiable by anyone with a computer."
    },
    {
      key: "Transport", 
      title: "How Easy to Move?", 
      question: "Can you easily transport large amounts across borders?",
      options: {
        fiat: { label: "💵 Fiat Money", answer: "Banks, fees, restrictions", pass: true },
        gold: { label: "🥇 Gold", answer: "Heavy, expensive to move", pass: false },
        bitcoin: { label: "🟠 Bitcoin", answer: "Instant global transfer", pass: true }
      },
      winner: "bitcoin",
      insight: "Bitcoin can be sent anywhere in the world in ~10 minutes for minimal fees."
    }
  ];

  const currentBattle = propertyBattles[currentProperty];

  const handleChoice = (moneyType) => {
    const newSelections = { ...selections, [currentProperty]: moneyType };
    setSelections(newSelections);
    
    // Award points
    const newScores = { ...scores };
    if (moneyType === currentBattle.winner) {
      newScores[moneyType] += 2; // Winner gets 2 points
    } else if (currentBattle.options[moneyType].pass) {
      newScores[moneyType] += 1; // Partial credit for passing
    }
    setScores(newScores);
    
    // Move to next battle or show results
    setTimeout(() => {
      if (currentProperty < propertyBattles.length - 1) {
        setCurrentProperty(currentProperty + 1);
      } else {
        setBattlePhase('results');
      }
    }, 2000);
  };

  const getScoreColor = (score) => {
    if (score >= 6) return 'winner';
    if (score >= 3) return 'decent';
    return 'poor';
  };

  if (battlePhase === 'intro') {
    return (
      <div className="step-content battle-intro">
        <div className="module-header-box">
          <h2>⚔️ The Ultimate Money Battle</h2>
          <div className="intro-text">
            <p className="prime-text">Three types of money enter. Only one can be the champion. Let's see which money dominates in key areas...</p>
          </div>
        </div>
        <div className="content-text">
          <div className="battle-preview">
            <div className="contenders">
              <div className="contender fiat-contender">
                <h3>💵 Team Fiat</h3>
                <p>Government-issued currency</p>
              </div>
              <div className="contender gold-contender">
                <h3>🥇 Team Gold</h3>
                <p>Traditional store of value</p>
              </div>
              <div className="contender bitcoin-contender">
                <h3>🟠 Team Bitcoin</h3>
                <p>Digital revolution</p>
              </div>
            </div>
          </div>
          <ActionButton onClick={() => setBattlePhase('battle')} className="start-battle-button">
            🔥 Start the Battle!
          </ActionButton>
        </div>
      </div>
    );
  }

  if (battlePhase === 'results') {
    return (
      <div className="step-content battle-results">
        <div className="module-header-box">
          <h2>🏆 Battle Results</h2>
        </div>
        <div className="content-text">
          <div className="final-scores">
            <div className="scoreboard">
              <div className={`score-item ${getScoreColor(scores.bitcoin)}`}>
                <h3>🟠 Bitcoin</h3>
                <div className="score">{scores.bitcoin}</div>
                <div className="status">CHAMPION! 👑</div>
              </div>
              <div className={`score-item ${getScoreColor(scores.gold)}`}>
                <h3>🥇 Gold</h3>
                <div className="score">{scores.gold}</div>
                <div className="status">Runner-up</div>
              </div>
              <div className={`score-item ${getScoreColor(scores.fiat)}`}>
                <h3>💵 Fiat</h3>
                <div className="score">{scores.fiat}</div>
                <div className="status">Needs improvement</div>
              </div>
            </div>
          </div>
          <div className="victory-message">
            <h3>🎉 Bitcoin Domination Complete!</h3>
            <p>Bitcoin systematically outperforms both traditional money forms. It combines the best of both worlds while eliminating their weaknesses.</p>
          </div>
          <ContinueButton onClick={() => onComplete(1)} className="victory-button">
            🚀 Bitcoin Wins! Now See HOW It Works →
          </ContinueButton>
        </div>
      </div>
    );
  }

  // Battle phase
  return (
    <div className="step-content money-battle">
      <div className="module-header-box">
        <h2>⚔️ Round {currentProperty + 1}: {currentBattle.title}</h2>
        <div className="battle-progress">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${((currentProperty + 1) / propertyBattles.length) * 100}%` }}
            />
          </div>
          <p>Battle {currentProperty + 1} of {propertyBattles.length}</p>
        </div>
      </div>
      
      <div className="content-text">
        <div className="battle-question">
          <h3>{currentBattle.question}</h3>
        </div>
        
        <div className="battle-options">
          {Object.entries(currentBattle.options).map(([key, option]) => (
            <div 
              key={key}
              className="battle-choice"
              onClick={() => handleChoice(key)}
            >
              <div className="choice-header">
                <h4>{option.label}</h4>
              </div>
              <div className="choice-answer">
                <p>{option.answer}</p>
              </div>
              <div className={`choice-result ${option.pass ? 'pass' : 'fail'}`}>
                {option.pass ? '✅ Strong' : '❌ Weak'}
              </div>
            </div>
          ))}
        </div>
        
        {selections[currentProperty] && (
          <div className="battle-insight">
            <div className="insight-box">
              <h4>🎯 Battle Insight:</h4>
              <p>{currentBattle.insight}</p>
            </div>
          </div>
        )}
        
        <div className="current-scores">
          <h4>Current Scores:</h4>
          <div className="score-display">
            <span>🟠 Bitcoin: {scores.bitcoin}</span>
            <span>🥇 Gold: {scores.gold}</span>
            <span>💵 Fiat: {scores.fiat}</span>
          </div>
        </div>
      </div>
    </div>
  );
};



// The Scarcity Revolution - Compelling Value Examples
const WhyScarcityMatters = ({ onComplete }) => {
  const [currentExample, setCurrentExample] = useState(0);
  const [userPrediction, setUserPrediction] = useState(null);
  const [showReality, setShowReality] = useState(false);

  // Two powerful examples that make scarcity visceral and personal
  const scarcityExamples = [
    {
      id: 'taylor_swift',
      title: 'The Taylor Swift Phenomenon',
      hook: '🎤 Taylor Swift announces surprise concert: 50,000 seats, 2.4 million people want tickets',
      setup: "Within minutes, Ticketmaster crashes. Fans wait 8+ hours online. Face value: $49-449. Resale prices hit $22,700 per ticket.",
      shockingFact: "A $49 nosebleed seat is selling for more than most people's car.",
      question: "What turned a $49 ticket into a $20,000+ treasure?",
      options: [
        { id: 'popularity', text: "Taylor Swift is just really popular", prediction: "It's about fame" },
        { id: 'scarcity', text: "Fixed supply + massive demand = extreme value", prediction: "Economics in action" },
        { id: 'manipulation', text: "Ticketmaster is manipulating prices", prediction: "It's rigged" },
        { id: 'crazy_fans', text: "Some fans have too much money", prediction: "People are irrational" }
      ],
      reality: {
        truth: "Scarcity is the ultimate value creator. 50,000 seats can't become 51,000 no matter how much demand exists. The harder something is to get, the more valuable it becomes.",
        connection: "Bitcoin works exactly like concert tickets: FIXED supply (21 million), but GROWING demand worldwide. The difference? Bitcoin's 'concert' never ends."
      },
      mindBlown: "💡 Mind = Blown: Bitcoin is like having front-row seats to the greatest financial revolution in history... and the venue can NEVER add more seats."
    },
    {
      id: 'digital_land',
      title: 'Digital Manhattan vs Infinite Plains',
      hook: '🏝️ Imagine two islands: Manhattan (fixed 22 square miles) vs. Magic Island (can expand infinitely)',
      setup: "Both start empty. People begin moving in. Manhattan fills up - rent skyrockets. Magic Island keeps expanding - rent stays cheap.",
      shockingFact: "Manhattan real estate averages $1,500 per square foot. Infinite land? Nearly worthless.",
      question: "Which island would you rather own property on?",
      options: [
        { id: 'manhattan', text: "Manhattan - my land value can only go up", prediction: "Scarcity wins" },
        { id: 'magic_island', text: "Magic Island - always room to grow", prediction: "Flexibility wins" },
        { id: 'both', text: "Both seem equally good", prediction: "No difference" },
        { id: 'depends', text: "Depends on other factors", prediction: "It's complicated" }
      ],
      reality: {
        truth: "Manhattan's value comes from what CAN'T be done: you can't make more land. Every dollar printed makes dollars less scarce. Every bitcoin that can't be created makes bitcoin more scarce.",
        connection: "US Dollars = Magic Island (infinite supply, declining value per unit). Bitcoin = Digital Manhattan (fixed supply, increasing value per unit)."
      },
      mindBlown: "🚀 Plot Twist: Bitcoin isn't just digital gold... it's digital Manhattan in a world where every other currency is Magic Island!"
    }
  ];

  const currentExample_data = scarcityExamples[currentExample];

  const handlePrediction = (optionId) => {
    setUserPrediction(optionId);
    setShowReality(true);
  };

  const handleContinue = () => {
    if (currentExample < scarcityExamples.length - 1) {
      setCurrentExample(currentExample + 1);
      setUserPrediction(null);
      setShowReality(false);
    } else {
      onComplete(3);
    }
    };

    return (
    <div className="step-content scarcity-revolution">
      <div className="module-header-box">
        <h2>💎 The Scarcity Secret</h2>
        <div className="intro-text">
          <p className="prime-text">🤯 You've seen Bitcoin DOMINATE the competition. But WHY is Bitcoin valuable? The answer will blow your mind...</p>
          <div className="transition-hook">
            <p className="hook-subtext">💡 Hint: It's the same reason Taylor Swift tickets sell for $22,700</p>
          </div>
        </div>
        </div>

      <div className="content-text">
        <div className="scarcity-example">
          <h3>{currentExample_data.title}</h3>
          
          <div className="scarcity-hook">
            <p className="hook-text">{currentExample_data.hook}</p>
          </div>
          
          {currentExample_data.setup && (
            <div className="setup-section">
              <p>{currentExample_data.setup}</p>
              <div className="shocking-fact">
                <p className="fact-highlight">🔥 {currentExample_data.shockingFact}</p>
              </div>
            </div>
          )}
          
          
          {currentExample_data.comparison && (
            <div className="comparison-display">
              <div className="comparison-grid">
                <div className="comparison-item dollar-system">
                  <h4>{currentExample_data.comparison.dollar.title}</h4>
                  <div className="comparison-details">
                    <div><strong>Supply:</strong> {currentExample_data.comparison.dollar.supply}</div>
                    <div><strong>Recent:</strong> {currentExample_data.comparison.dollar.recent}</div>
                    <div className="impact"><strong>Impact:</strong> {currentExample_data.comparison.dollar.yourShare}</div>
                  </div>
                </div>
                <div className="comparison-item bitcoin-system">
                  <h4>{currentExample_data.comparison.bitcoin.title}</h4>
                  <div className="comparison-details">
                    <div><strong>Supply:</strong> {currentExample_data.comparison.bitcoin.supply}</div>
                    <div><strong>Recent:</strong> {currentExample_data.comparison.bitcoin.recent}</div>
                    <div className="impact"><strong>Impact:</strong> {currentExample_data.comparison.bitcoin.yourShare}</div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div className="question-section">
            <h4>{currentExample_data.question}</h4>
            
            {!userPrediction && (
              <div className="prediction-options">
                {currentExample_data.options.map(option => (
                  <button
                    key={option.id}
                    className="prediction-option"
                    onClick={() => handlePrediction(option.id)}
                  >
                    <div className="option-text">{option.text}</div>
                    <div className="option-prediction">→ {option.prediction}</div>
                  </button>
                ))}
          </div>
        )}
              </div>
              
          {showReality && (
            <div className="reality-section">
              <div className="reality-truth">
                <h4>💡 The Reality:</h4>
                <p>{currentExample_data.reality.truth}</p>
            </div>

              <div className="bitcoin-connection">
                <h4>🟠 Bitcoin Connection:</h4>
                <p>{currentExample_data.reality.connection}</p>
              </div>
              
              <div className="mind-blown">
                <p className="mind-blown-text">{currentExample_data.mindBlown}</p>
              </div>

              <button className="continue-example-button epic-button" onClick={handleContinue}>
                {currentExample < scarcityExamples.length - 1 ? '🤯 Mind = Blown! Next Example →' : '🎓 I Get It! Complete Bitcoin Mastery →'}
              </button>
          </div>
        )}
      </div>
        
        <div className="example-progress">
          <div className="progress-dots">
            {scarcityExamples.map((_, index) => (
              <div 
                key={index}
                className={`progress-dot ${index === currentExample ? 'active' : ''} ${index < currentExample ? 'completed' : ''}`}
              />
            ))}
        </div>
          <p>Example {currentExample + 1} of {scarcityExamples.length}</p>
            </div>
          </div>
      </div>
    );
  };

// Module Completion Component
const BitcoinCompletion = ({ onComplete }) => {
    return (
    <div className="step-content completion-step">
      <div className="module-header-box">
        <h2>🎉 Bitcoin Fundamentals: Complete!</h2>
        <div className="intro-text">
          <p className="prime-text celebration-text">🎊 INCREDIBLE! You've just completed a journey that most people never take. You now understand what makes Bitcoin the most important financial innovation in human history!</p>
          <div className="achievement-highlight">
            <p className="milestone-text">🏆 You've gone from Bitcoin curious to Bitcoin convinced</p>
          </div>
        </div>
        </div>

      <div className="completion-content">
        <div className="achievement-summary">
          <h3>🏆 Bitcoin Benefits You've Mastered</h3>
          <div className="accomplishments-grid">
            <div className="accomplishment-item">
              <div className="accomplishment-icon">🛡️</div>
              <h4>Government Interference Protection</h4>
              <p>Bitcoin cannot be frozen, confiscated, or controlled by any authority</p>
              </div>
            <div className="accomplishment-item">
              <div className="accomplishment-icon">💎</div>
              <h4>Store of Value Protection</h4>
              <p>Fixed 21 million supply protects against inflation and money printing</p>
              </div>
            <div className="accomplishment-item">
              <div className="accomplishment-icon">💰</div>
              <h4>Lower Transaction Costs</h4>
              <p>Peer-to-peer transfers eliminate expensive banking intermediaries</p>
            </div>
            <div className="accomplishment-item">
              <div className="accomplishment-icon">⚡</div>
              <h4>Faster International Transfers</h4>
              <p>Global settlement in ~10 minutes vs 3-5 days with traditional banking</p>
            </div>
            <div className="accomplishment-item">
              <div className="accomplishment-icon">🔒</div>
              <h4>Enhanced Privacy & Security</h4>
              <p>Pseudonymous transactions without complete financial surveillance</p>
            </div>
            </div>
          </div>

        <div className="key-insights">
          <h3>💡 Core Bitcoin Advantages</h3>
          <div className="insights-list">
            <div className="insight-item">
              <span className="insight-number">1</span>
              <div className="insight-content">
                <h4>Bitcoin Fixes Fiat Currency's Fatal Flaws</h4>
                <p>Every problem with traditional money - from inflation to censorship to high fees - has a Bitcoin solution.</p>
                      </div>
                  </div>
            <div className="insight-item">
              <span className="insight-number">2</span>
              <div className="insight-content">
                <h4>Mathematical Rules Trump Political Rules</h4>
                <p>Bitcoin's code-based system eliminates human corruption and political manipulation of money.</p>
                </div>
                </div>
            <div className="insight-item">
              <span className="insight-number">3</span>
              <div className="insight-content">
                <h4>True Financial Sovereignty is Possible</h4>
                <p>For the first time in history, individuals can have complete control over their money without relying on institutions.</p>
            </div>
                </div>
            </div>
          </div>

        <div className="next-journey">
          <h3>🔮 Your Technical Journey Ahead</h3>
          <div className="next-journey-content">
            <p className="next-adventure">🚀 Now that you understand <em>WHY</em> Bitcoin is revolutionary, are you ready to discover <em>HOW</em> this digital magic actually works? The technical journey ahead will transform you from Bitcoin believer into Bitcoin expert!</p>
            
            <div className="upcoming-modules">
              <h4>🧮 Technical Deep Dive:</h4>
              <ul>
                <li><strong>Number Systems</strong> - How computers represent Bitcoin data</li>
                <li><strong>Cryptographic Hashing</strong> - Bitcoin's security foundation</li>
                <li><strong>Digital Signatures</strong> - How ownership is cryptographically proven</li>
                <li><strong>Mining & Consensus</strong> - How the network stays honest and secure</li>
              </ul>
        </div>

            <div className="call-to-adventure">
              <p className="ready-question epic-question"><strong>🔥 Are you ready to unlock Bitcoin's technical secrets and join the revolution?</strong></p>
              <p className="adventure-subtitle">⚡ The next modules will blow your mind...</p>
            </div>
            </div>
          </div>

        <ModuleCompletionButton 
          moduleName="Bitcoin Basics"
          moduleId="bitcoin-basics"
          customMessage="🚀 Outstanding! You now understand what makes Bitcoin revolutionary and different from traditional money!"
        />
      </div>
      </div>
    );
  };

// How Bitcoin Works (No Technical Jargon) - Simplified
const HowBitcoinWorks = ({ onComplete }) => {
  const [currentConcept, setCurrentConcept] = useState(0);
  const [userAnswer, setUserAnswer] = useState(null);
    const [showExplanation, setShowExplanation] = useState(false);

  // Focus on just the 3 most intuitive concepts
  const concepts = [
    {
      id: 'record_keeping',
      title: 'Keeping Track of Money',
      scenario: "Imagine you and 9 friends are sharing expenses for a group vacation. You need to track who paid for what and who owes money to whom.",
      question: "What's the most trustworthy way to keep track of everyone's payments?",
      options: [
        { id: 'one_person', text: "One person keeps a notebook with all transactions", risk: 'high' },
        { id: 'everyone', text: "Everyone keeps their own identical copy of all transactions", risk: 'low' },
        { id: 'bank', text: "Use a bank to track everything", risk: 'medium' },
        { id: 'memory', text: "Just remember who paid what", risk: 'very_high' }
      ],
      explanation: {
        correct: 'everyone',
        why: "When everyone has the same records, no one can cheat or 'lose' the notebook. This is exactly how Bitcoin works - thousands of people keep identical records of all Bitcoin transactions.",
        bankingAnalogy: "Banks keep ONE record that only they control. Bitcoin keeps THOUSANDS of identical records that everyone can verify.",
        bitcoinConnection: "Bitcoin's network is just thousands of computers all keeping the same transaction records, making it impossible for anyone to lie about balances."
      }
    },
    {
      id: 'consensus',
      title: 'Agreeing on What\'s True',
      scenario: "Your group vacation notebook shows you paid $100 for dinner. But what if someone claims you only paid $50?",
      question: "How do you prove what really happened?",
      options: [
        { id: 'majority', text: "Ask everyone - whatever most people remember is true", risk: 'low' },
        { id: 'authority', text: "One person decides who's right", risk: 'high' },
        { id: 'original', text: "Check the original receipt", risk: 'medium' },
        { id: 'fight', text: "Argue until someone gives up", risk: 'very_high' }
      ],
      explanation: {
        correct: 'majority',
        why: "When most people agree on the same facts, it's extremely hard for one person to lie successfully. Bitcoin uses this same principle.",
        bankingAnalogy: "Banks: 'Trust us, our computer says you have $X.' Bitcoin: '51% of thousands of computers agree you have X bitcoin.'",
        bitcoinConnection: "This is what 'consensus' means - the majority of Bitcoin computers must agree before any transaction is accepted as real."
      }
    },
    {
      id: 'attack_resistance',
      title: 'Why Bitcoin Can\'t Be Hacked',
      scenario: "Someone in your friend group wants to change the records to show they paid more than they actually did.",
      question: "Which system is harder to cheat?",
      options: [
        { id: 'one_book', text: "One person controls the notebook - just convince them", risk: 'very_high' },
        { id: 'many_books', text: "Everyone has a copy - need to convince majority", risk: 'low' },
        { id: 'no_books', text: "No written records - just argue loudly", risk: 'very_high' },
        { id: 'locked_book', text: "Locked notebook that one person controls", risk: 'high' }
      ],
      explanation: {
        correct: 'many_books',
        why: "To cheat when everyone has copies, you'd need to convince more than half the group to lie for you. Much harder than bribing one person!",
        bankingAnalogy: "Hack one bank = control all accounts. Hack Bitcoin = need to control thousands of computers simultaneously worldwide.",
        bitcoinConnection: "This is why Bitcoin has never been successfully hacked in 15 years. You'd need to control more computers than Amazon, Google, and Microsoft combined."
      }
    }
  ];

  const currentConcept_data = concepts[currentConcept];

  const handleAnswer = (optionId) => {
    setUserAnswer(optionId);
      setShowExplanation(true);
    };

  const handleContinue = () => {
    if (currentConcept < concepts.length - 1) {
      setCurrentConcept(currentConcept + 1);
      setUserAnswer(null);
      setShowExplanation(false);
    } else {
      onComplete(2);
    }
    };

    return (
    <div className="module-container">
      <div className="content-section">
        <div className="subtopic-container">
          <div className="subtopic-header">
            <InteractiveIcon type="bitcoin" size={32} className="subtopic-icon" />
            <h2 className="subtopic-title">How Bitcoin Actually Works</h2>
          </div>
        <div className="subtopic-content">
            <p className="content-body transition-text">🔥 Bitcoin just crushed the competition! But HOW does this digital money actually work? Let's demystify it with simple examples...</p>
            <div className="anticipation-builder">
              <p className="sub-hook">💡 Spoiler: It's simpler than you think, yet more brilliant than you can imagine</p>
            </div>
          </div>
        </div>

        <div className="quiz-container">
          <div className="quiz-header">
            <h3 className="content-tier-2">{currentConcept_data.title}</h3>
            <div className="scenario-text">
              <p className="content-body">{currentConcept_data.scenario}</p>
            </div>
          </div>
          
          <div className="question-section">
            <h4>{currentConcept_data.question}</h4>
            
            {!userAnswer && (
              <div className="quiz-options two-column">
                {currentConcept_data.options.map((option, index) => (
                  <div
                    key={option.id}
                    className={`quiz-option risk-${option.risk}`}
                    onClick={() => handleAnswer(option.id)}
                  >
                    {option.text}
                    <div className="option-indicator">{index + 1}</div>
                  </div>
                ))}
              </div>
            )}
              </div>

              {showExplanation && (
            <div className={`quiz-feedback ${userAnswer === currentConcept_data.explanation.correct ? 'correct' : 'incorrect'}`}>
              <div className="feedback-text">
                <p><strong>You chose:</strong> "{currentConcept_data.options.find(opt => opt.id === userAnswer)?.text}"</p>
                {userAnswer === currentConcept_data.explanation.correct ? (
                  <p>✅ <strong>Excellent choice!</strong> You understand this concept well.</p>
                ) : (
                  <p>🤔 <strong>Let's explore this further.</strong> Here's why another option might work better:</p>
                )}
              </div>
              
              <div className="explanation-text">
                <div className="correct-answer">
                  <strong>💡 Why this matters:</strong> {currentConcept_data.explanation.why}
                </div>
                
                <div className="learning-point">
                  <strong>🏦 Banking vs Bitcoin:</strong> {currentConcept_data.explanation.bankingAnalogy}
                </div>
                
                <div className="bitcoin-connection">
                  <strong>🟠 Bitcoin Connection:</strong> {currentConcept_data.explanation.bitcoinConnection}
                </div>
              </div>

              <ActionButton className="continue-button mastery-button" onClick={handleContinue}>
                {currentConcept < concepts.length - 1 ? '🧠 Got It! Next Concept →' : '💎 Now I Need to Know WHY It\'s Valuable →'}
              </ActionButton>
          </div>
        )}
        </div>
        
        <div className="progress-indicator">
          <div className="progress-dots">
            {concepts.map((_, index) => (
              <div 
                key={index}
                className={`progress-dot ${index === currentConcept ? 'active' : ''} ${index < currentConcept ? 'completed' : ''}`}
              />
            ))}
          </div>
          <p>Concept {currentConcept + 1} of {concepts.length}</p>
        </div>
      </div>
          </div>
        );
  };

const BitcoinBasicsModule = () => {
  const { completeModule } = useProgress();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(() => {
    const saved = localStorage.getItem('bitcoinBasicsCompletedSteps');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  const handleStepComplete = (stepIndex) => {
    const newCompletedSteps = new Set(completedSteps).add(stepIndex);
    setCompletedSteps(newCompletedSteps);
    
    // Save to localStorage
    try {
      localStorage.setItem('bitcoinBasicsCompletedSteps', JSON.stringify(Array.from(newCompletedSteps)));
    } catch (error) {
      console.warn('Failed to save progress to localStorage:', error);
    }
    
    // Show achievements
    if (stepIndex === 1) {
      showAchievement("Bitcoin Basics", "You understand how Bitcoin compares to traditional banking!");
    } else if (stepIndex === 2) {
      showAchievement("Consensus Master", "You understand how Bitcoin reaches agreement!");
    } else if (stepIndex === 3) {
      showAchievement("Value Insights", "You understand why scarcity creates value!");
    }
    
    // Move to next step or complete module
    if (stepIndex < 4) {
      setCurrentStep(stepIndex + 1);
    } else {
      // Module completion is handled by ModuleCompletionButton
      setCurrentStep(stepIndex + 1);
    }
  };

  const showAchievement = (title, description) => {
    const achievement = document.createElement('div');
    achievement.className = 'achievement-popup';
    achievement.innerHTML = `
      <div class="achievement-content">
        <div class="achievement-icon">🏆</div>
        <div class="achievement-text">
          <h4>${title}</h4>
          <p>${description}</p>
        </div>
        <div class="achievement-controls">
          <button class="achievement-dismiss" onclick="this.closest('.achievement-popup').remove()">
              Continue
          </button>
          </div>
      </div>
      <div class="achievement-hint">Click to dismiss or wait 6 seconds...</div>
    `;
    document.body.appendChild(achievement);
    
    achievement.addEventListener('click', () => {
      achievement.style.opacity = '0';
      setTimeout(() => {
        if (document.body.contains(achievement)) {
          document.body.removeChild(achievement);
        }
      }, 300);
    });
    
    setTimeout(() => {
      if (document.body.contains(achievement)) {
        achievement.style.opacity = '0';
        setTimeout(() => {
          if (document.body.contains(achievement)) {
            document.body.removeChild(achievement);
          }
        }, 300);
      }
    }, 6000);
  };

// Steps used for tracking module progress
const steps = [
    { id: 0, title: "Bitcoin's Promise", icon: "🎯", completed: completedSteps.has(0) },
    { id: 1, title: "Compare Systems", icon: "⚖️", completed: completedSteps.has(1) },
    { id: 2, title: "How It Works", icon: "🔧", completed: completedSteps.has(2) },
    { id: 3, title: "Why It's Valuable", icon: "💎", completed: completedSteps.has(3) },
    { id: 4, title: "Complete", icon: "🎉", completed: completedSteps.has(4) }
  ];

  const handleTabClick = (stepIndex) => {
    setCurrentStep(stepIndex);
  };

  return (
    <div className="module-container">
      {/* HERO SECTION - World-class design principles */}
      <div className="module-header">
        <div className="module-title">
          <div className="module-icon">
            <InteractiveIcon type="bitcoin" size={48} className="module-icon-bitcoin" />
          </div>
          Bitcoin Fundamentals
        </div>
        <div className="module-subtitle">
          Understand what Bitcoin is and why it matters
        </div>
      </div>
      
      {/* TERTIARY: Navigation Steps - Medium Importance */}
      <div className="section-card">
        <h3 className="nav-section-title">Learning Path</h3>
        <div className="step-navigation-container">
          <div className="step-navigation-scroll">
          {["Bitcoin's Promise", "Compare Systems", "How It Works", "Why It's Valuable", "Complete"].map((step, index) => (
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
        {currentStep === 0 && <BitcoinIntroduction onComplete={handleStepComplete} />}
        {currentStep === 1 && <PropertyCompare onComplete={handleStepComplete} />}
        {currentStep === 2 && <HowBitcoinWorks onComplete={handleStepComplete} />}
        {currentStep === 3 && <WhyScarcityMatters onComplete={handleStepComplete} />}
        {currentStep === 4 && <BitcoinCompletion onComplete={handleStepComplete} />}
      </div>
    </div>
  );
};

export default BitcoinBasicsModule; 