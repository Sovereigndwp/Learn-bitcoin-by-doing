import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '../contexts/ProgressContext';
import { 
  ContinueButton, 
  ActionButton,
  StepNavigation
} from '../components/EnhancedButtons';
import { ModuleCompletionButton } from '../components/ui';
import { 
  TrendingDown, AlertTriangle, Building2, Globe, Eye, Shield,
  DollarSign, Zap, Lock, Unlock, ArrowRight, CheckCircle,
  Clock, Users, Target, Star
} from 'lucide-react';
import '../components/ModuleCommon.css';

// Main Module Component
const WhyBitcoinMattersModule = ({ moduleId = 'bitcoin-relevance' }) => {
  const navigate = useNavigate();
  const { updateModuleProgress, completeModule } = useProgress();
  const [currentStep, setCurrentStep] = useState(0);
  const [userRealizations, setUserRealizations] = useState(new Set());
  const [scenarioChoices, setScenarioChoices] = useState({});

  // Steps in the urgent relevance journey
  const steps = [
    'Your Money Under Attack',
    'Government Overreach Reality', 
    'Banking System Fragility',
    'Global Financial Exclusion',
    'Privacy Surveillance Crisis',
    'The Bitcoin Solution'
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

  const addRealization = (realization) => {
    setUserRealizations(prev => new Set([...prev, realization]));
  };

  return (
    <div className="module-container">
      <div className="module-header">
        <h1>⚡ Why Bitcoin Matters TODAY</h1>
        <p>Real scenarios showing why Bitcoin isn't just interesting—it's urgently necessary</p>
        <StepNavigation 
          steps={steps} 
          currentStep={currentStep}
          onStepClick={setCurrentStep}
        />
      </div>

      <div className="module-content">
        {currentStep === 0 && (
          <MoneyUnderAttack 
            onComplete={() => handleStepComplete(0)}
            onRealization={addRealization}
            userChoices={scenarioChoices}
            setUserChoices={setScenarioChoices}
          />
        )}
        
        {currentStep === 1 && (
          <GovernmentOverreach 
            onComplete={() => handleStepComplete(1)}
            onRealization={addRealization}
            userChoices={scenarioChoices}
            setUserChoices={setScenarioChoices}
          />
        )}
        
        {currentStep === 2 && (
          <BankingFragility 
            onComplete={() => handleStepComplete(2)}
            onRealization={addRealization}
            userChoices={scenarioChoices}
            setUserChoices={setScenarioChoices}
          />
        )}
        
        {currentStep === 3 && (
          <GlobalExclusion 
            onComplete={() => handleStepComplete(3)}
            onRealization={addRealization}
            userChoices={scenarioChoices}
            setUserChoices={setScenarioChoices}
          />
        )}
        
        {currentStep === 4 && (
          <PrivacyCrisis 
            onComplete={() => handleStepComplete(4)}
            onRealization={addRealization}
            userChoices={scenarioChoices}
            setUserChoices={setScenarioChoices}
          />
        )}
        
        {currentStep === 5 && (
          <BitcoinSolution 
            onComplete={handleModuleComplete}
            userRealizations={userRealizations}
            userChoices={scenarioChoices}
          />
        )}
      </div>
    </div>
  );
};

// Component 1: Your Money Under Attack
const MoneyUnderAttack = ({ onComplete, onRealization, userChoices, setUserChoices }) => {
  const [currentScenario, setCurrentScenario] = useState(0);
  const [revealedFacts, setRevealedFacts] = useState([]);

  const scenarios = [
    {
      id: 'inflation-shock',
      title: '🛒 The Grocery Store Reality Check',
      hook: 'Remember when a gallon of milk cost $3? That was just 3 years ago.',
      setup: 'Today: $5.49. Your salary: still the same.',
      shockingDetail: 'That\'s not "inflation"—that\'s your purchasing power being destroyed in real-time.',
      question: 'What\'s really happening to your money?',
      options: [
        { id: 'supply', text: 'Supply chain issues will fix themselves', impact: 'temporary' },
        { id: 'monetary', text: 'Money printing is devaluing every dollar I own', impact: 'permanent', correct: true },
        { id: 'corporate', text: 'Corporations are just being greedy', impact: 'blame' }
      ],
      reality: '🚨 FACT: The money supply increased by 40% in 2020-2021. That\'s not inflation—that\'s monetary debasement. Your dollars are worth 30% less, and it\'s accelerating.',
      realization: 'money-debasement'
    },
    {
      id: 'savings-destruction',
      title: '🏦 The Savings Account Trap',
      hook: '$10,000 in savings earning 0.5% interest vs 8% "inflation"',
      setup: 'Your savings account: losing $750 in purchasing power this year.',
      shockingDetail: 'Banks pay you 0.5% while lending YOUR money at 7%. You\'re funding your own poverty.',
      question: 'What are traditional "safe" savings actually doing?',
      options: [
        { id: 'safety', text: 'Keeping my money safe from risk', impact: 'illusion' },
        { id: 'guaranteed', text: 'Guaranteeing I get poorer every year', impact: 'reality', correct: true },
        { id: 'building', text: 'Building wealth slowly but surely', impact: 'delusion' }
      ],
      reality: '💡 REVELATION: "Safe" savings accounts guarantee you lose money to inflation. The only "risk" is thinking there\'s no risk.',
      realization: 'savings-trap'
    },
    {
      id: 'retirement-crisis',
      title: '⏰ The Retirement Math Nightmare',
      hook: 'Your parents retired on $500K. You\'ll need $2.5M for the same lifestyle.',
      setup: 'Retirement calculators assume 3% inflation. Reality: 8%+ for essentials.',
      shockingDetail: 'At current inflation rates, your retirement fund will be worth 50% less by the time you retire.',
      question: 'What does this mean for your future?',
      options: [
        { id: 'work-longer', text: 'I\'ll just work longer', impact: 'delaying' },
        { id: 'broken-system', text: 'The entire retirement system is broken', impact: 'awakening', correct: true },
        { id: 'government', text: 'Government will figure it out', impact: 'dependency' }
      ],
      reality: '⚠️ TRUTH: Traditional retirement planning assumes a stable currency. With monetary debasement, those assumptions are fantasy.',
      realization: 'retirement-crisis'
    }
  ];

  const currentScene = scenarios[currentScenario];

  const handleChoice = (choice) => {
    setUserChoices(prev => ({
      ...prev,
      [`attack-${currentScene.id}`]: choice
    }));

    if (choice.correct) {
      onRealization(currentScene.realization);
    }

    setRevealedFacts(prev => [...prev, currentScene.reality]);

    setTimeout(() => {
      if (currentScenario < scenarios.length - 1) {
        setCurrentScenario(currentScenario + 1);
        setRevealedFacts([]);
      } else {
        onComplete();
      }
    }, 3000);
  };

  return (
    <div className="section-card">
      <div className="scenario-header">
        <TrendingDown className="scenario-icon danger" size={48} />
        <h2 className="heading-critical">{currentScene.title}</h2>
      </div>

      <div className="scenario-content">
        <div className="hook-section">
          <p className="shock-value">{currentScene.hook}</p>
          <p className="scenario-setup">{currentScene.setup}</p>
          <div className="shocking-detail">
            <AlertTriangle size={20} />
            <p>{currentScene.shockingDetail}</p>
          </div>
        </div>

        <div className="challenge-section">
          <h3>{currentScene.question}</h3>
          <div className="options-grid">
            {currentScene.options.map(option => (
              <button
                key={option.id}
                className={`option-button ${userChoices[`attack-${currentScene.id}`]?.id === option.id ? 'selected' : ''}`}
                onClick={() => handleChoice(option)}
                disabled={userChoices[`attack-${currentScene.id}`]}
              >
                {option.text}
              </button>
            ))}
          </div>
        </div>

        {revealedFacts.length > 0 && (
          <div className="reality-reveal">
            <div className="fact-explosion">
              <Zap size={24} />
              <h4>Reality Check</h4>
              <p>{revealedFacts[0]}</p>
            </div>
            <div className="scenario-progress">
              <p>Scenario {currentScenario + 1} of {scenarios.length}</p>
              <div className="progress-dots">
                {scenarios.map((_, index) => (
                  <span 
                    key={index} 
                    className={`dot ${index <= currentScenario ? 'active' : ''}`}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Component 2: Government Overreach Reality  
const GovernmentOverreach = ({ onComplete, onRealization, userChoices, setUserChoices }) => {
  const [currentCaseIndex, setCurrentCaseIndex] = useState(0);
  const [showRealityCheck, setShowRealityCheck] = useState(false);

  const realCases = [
    {
      id: 'canada-2022',
      title: '🇨🇦 Canada 2022: The Trucker Precedent',
      hook: 'February 15, 2022: Emergency Act invoked for the first time in Canadian history',
      situation: 'Peaceful protesters had their bank accounts frozen without court orders. Donors who gave $50 to support truckers lost access to their life savings.',
      shockingFact: 'Over 200 bank accounts frozen. Some belonged to people who just shared a name with donors.',
      question: 'If this can happen in Canada, what about everywhere else?',
      options: [
        { id: 'unique', text: 'Canada is unique, won\'t happen elsewhere', naive: true },
        { id: 'emergency', text: 'Only in emergencies, for good reasons', conditional: true },
        { id: 'precedent', text: 'This is the new normal - financial weapons are deployed', awakening: true, correct: true }
      ],
      reality: 'Financial weaponization is now standard government toolkit. What starts as "emergency powers" becomes permanent.',
      realization: 'financial-weapons'
    },
    {
      id: 'china-social-credit',
      title: '🇨🇳 China: Social Credit in Action',
      hook: '23 million Chinese citizens banned from buying plane tickets',
      situation: 'Low social credit scores prevent travel, banking, property purchases. Punishment: jaywalking, wrong political opinions, or associating with "undesirable" people.',
      shockingFact: 'Your money becomes useless if the state disapproves of your behavior.',
      question: 'Could digital currencies make this global?',
      options: [
        { id: 'china-only', text: 'Only possible in authoritarian countries', naive: true },
        { id: 'different', text: 'Western democracies would never do this', hopeful: true },
        { id: 'infrastructure', text: 'The infrastructure for this already exists everywhere', awakening: true, correct: true }
      ],
      reality: 'Central Bank Digital Currencies (CBDCs) give governments China-level financial control over citizens.',
      realization: 'digital-surveillance'
    },
    {
      id: 'cyprus-2013',
      title: '🇨🇾 Cyprus 2013: The Bank Bail-In',
      hook: 'Bank holiday: All banks closed indefinitely',
      situation: 'Government seized 47.5% of all bank deposits over €100,000 to save failing banks. Depositors became involuntary bank shareholders.',
      shockingFact: 'Your bank deposits aren\'t really yours—you\'re an unsecured creditor to the bank.',
      question: 'What does this reveal about "your" money in banks?',
      options: [
        { id: 'insured', text: 'FDIC insurance protects me', false_security: true },
        { id: 'extreme', text: 'Extreme situation, won\'t happen again', denial: true },
        { id: 'unsecured-creditor', text: 'I\'m just an unsecured creditor to the bank', awakening: true, correct: true }
      ],
      reality: 'Bank deposits are legally loans to the bank. In crisis, depositors get paid after bondholders and shareholders.',
      realization: 'banking-creditor'
    }
  ];

  const currentCase = realCases[currentCaseIndex];

  const handleChoice = (choice) => {
    setUserChoices(prev => ({
      ...prev,
      [`overreach-${currentCase.id}`]: choice
    }));

    if (choice.correct) {
      onRealization(currentCase.realization);
    }

    setShowRealityCheck(true);

    setTimeout(() => {
      if (currentCaseIndex < realCases.length - 1) {
        setCurrentCaseIndex(currentCaseIndex + 1);
        setShowRealityCheck(false);
      } else {
        onComplete();
      }
    }, 4000);
  };

  return (
    <div className="section-card">
      <div className="scenario-header">
        <Building2 className="scenario-icon warning" size={48} />
        <h2 className="heading-critical">{currentCase.title}</h2>
      </div>

      <div className="real-case-content">
        <div className="case-hook">
          <div className="date-stamp">REAL EVENT</div>
          <p className="shock-value">{currentCase.hook}</p>
        </div>

        <div className="situation-box">
          <h4>What Happened:</h4>
          <p>{currentCase.situation}</p>
          <div className="shocking-fact">
            <AlertTriangle size={18} />
            <span>{currentCase.shockingFact}</span>
          </div>
        </div>

        <div className="critical-question">
          <Lock size={24} />
          <h3>{currentCase.question}</h3>
          <div className="choice-buttons">
            {currentCase.options.map(option => (
              <button
                key={option.id}
                className={`choice-button ${userChoices[`overreach-${currentCase.id}`]?.id === option.id ? 'selected' : ''}`}
                onClick={() => handleChoice(option)}
                disabled={userChoices[`overreach-${currentCase.id}`]}
              >
                {option.text}
              </button>
            ))}
          </div>
        </div>

        {showRealityCheck && (
          <div className="reality-explosion">
            <div className="reality-header">
              <Unlock size={24} />
              <h4>The Uncomfortable Truth</h4>
            </div>
            <p>{currentCase.reality}</p>
            <div className="case-progress">
              <span>Case {currentCaseIndex + 1} of {realCases.length}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Component 3: Banking System Fragility
const BankingFragility = ({ onComplete, onRealization, userChoices, setUserChoices }) => {
  const [currentCrisisIndex, setCurrentCrisisIndex] = useState(0);
  const [revealPhase, setRevealPhase] = useState(0);

  const bankingCrises = [
    {
      id: 'svb-2023',
      title: '🏦 Silicon Valley Bank: 48 Hours to Collapse',
      hook: 'March 8: "We\'re fine." March 10: Largest bank failure since 2008.',
      timeline: [
        'Wednesday: Bank announces $1.8B loss on bond sales',
        'Thursday: Stock drops 60%, depositors panic',  
        'Friday: Bank run, regulators shut it down'
      ],
      shockingFact: 'In the digital age, banks can collapse in hours, not months.',
      question: 'What does this speed of collapse mean for your money?',
      options: [
        { id: 'fdic-safety', text: 'FDIC insurance makes me safe', false_security: true },
        { id: 'bank-choice', text: 'I just need to choose better banks', incomplete: true },
        { id: 'systemic-risk', text: 'The entire system is one panic away from collapse', awakening: true, correct: true }
      ],
      reality: 'Modern banking is built on confidence, not reserves. When confidence breaks, the system breaks instantly.',
      realization: 'systemic-fragility'
    },
    {
      id: 'credit-suisse-2023',
      title: '🇨🇭 Credit Suisse: 167 Years to Zero',
      hook: 'Founded 1856. Survived two world wars. Killed by social media in 5 days.',
      timeline: [
        'March 14: Saudi National Bank refuses more investment',
        'March 15: Credit Suisse stock crashes, CDS spreads spike',
        'March 19: Emergency sale to UBS for $3.2B (was worth $8B in 2022)'
      ],
      shockingFact: 'AT1 bondholders lost everything while shareholders got something. The hierarchy of claims was inverted.',
      question: 'If a 167-year-old bank can die in days, what\'s really safe?',
      options: [
        { id: 'too-big', text: 'My bank is too big to fail', dangerous: true },
        { id: 'diversify', text: 'I\'ll diversify across multiple banks', insufficient: true },
        { id: 'counter-party', text: 'All banks are counter-party risks to each other', awakening: true, correct: true }
      ],
      reality: 'In interconnected banking, there\'s no such thing as an isolated failure. Contagion is built into the system.',
      realization: 'contagion-risk'
    }
  ];

  const currentCrisis = bankingCrises[currentCrisisIndex];

  const handleChoice = (choice) => {
    setUserChoices(prev => ({
      ...prev,
      [`fragility-${currentCrisis.id}`]: choice
    }));

    if (choice.correct) {
      onRealization(currentCrisis.realization);
    }

    setRevealPhase(1);

    setTimeout(() => {
      if (currentCrisisIndex < bankingCrises.length - 1) {
        setCurrentCrisisIndex(currentCrisisIndex + 1);
        setRevealPhase(0);
      } else {
        onComplete();
      }
    }, 4000);
  };

  return (
    <div className="section-card">
      <div className="crisis-header">
        <Building2 className="scenario-icon danger" size={48} />
        <h2 className="heading-critical">{currentCrisis.title}</h2>
        <div className="crisis-badge">REAL EVENT - 2023</div>
      </div>

      <div className="crisis-timeline">
        <div className="hook-text">
          <Clock size={20} />
          <p className="shock-value">{currentCrisis.hook}</p>
        </div>

        <div className="timeline-events">
          <h4>The Collapse Timeline:</h4>
          {currentCrisis.timeline.map((event, index) => (
            <div key={index} className="timeline-event">
              <div className="event-marker">{index + 1}</div>
              <p>{event}</p>
            </div>
          ))}
        </div>

        <div className="shocking-revelation">
          <AlertTriangle size={20} />
          <p><strong>Shocking:</strong> {currentCrisis.shockingFact}</p>
        </div>
      </div>

      <div className="critical-assessment">
        <h3>{currentCrisis.question}</h3>
        <div className="assessment-options">
          {currentCrisis.options.map(option => (
            <button
              key={option.id}
              className={`assessment-button ${userChoices[`fragility-${currentCrisis.id}`]?.id === option.id ? 'selected' : ''}`}
              onClick={() => handleChoice(option)}
              disabled={userChoices[`fragility-${currentCrisis.id}`]}
            >
              {option.text}
            </button>
          ))}
        </div>
      </div>

      {revealPhase === 1 && (
        <div className="system-reality">
          <div className="reality-flash">
            <Shield size={24} />
            <h4>System Reality Check</h4>
            <p>{currentCrisis.reality}</p>
          </div>
        </div>
      )}
    </div>
  );
};

// Component 4: Global Financial Exclusion
const GlobalExclusion = ({ onComplete, onRealization, userChoices, setUserChoices }) => {
  const [perspective, setPerspective] = useState('privileged');
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);

  const exclusionStories = [
    {
      id: 'unbanked-entrepreneur',
      title: '🌍 The Unbanked Entrepreneur',
      location: 'Lagos, Nigeria',
      character: 'Amara, software developer',
      situation: 'Builds apps for global clients, but banks won\'t serve her because she lacks "proper" documentation and minimum balances.',
      impact: 'Cannot receive international payments, cannot save money safely, cannot access global economy.',
      currentSolution: 'Expensive money transfer services take 15% fees and 5-day delays.',
      question: 'What does financial exclusion really mean?',
      options: [
        { id: 'personal-choice', text: 'People choose not to use banks', privileged: true },
        { id: 'education', text: 'It\'s about financial education', incomplete: true },
        { id: 'systemic-exclusion', text: 'The system deliberately excludes billions of people', awakening: true, correct: true }
      ],
      reality: '1.7 billion adults globally are unbanked—not by choice, but by systemic exclusion.',
      realization: 'financial-apartheid'
    },
    {
      id: 'remittance-worker',
      title: '💸 The Remittance Trap',
      location: 'Dubai → Philippines', 
      character: 'Maria, domestic worker',
      situation: 'Sends $300/month to family. Western Union charges $25 + exchange rate markup + recipient fees.',
      impact: 'Loses $400+ per year to fees—money that could feed her children for months.',
      currentSolution: 'No alternatives. Banks require minimum balances she can\'t maintain.',
      question: 'Why do the poorest pay the highest fees?',
      options: [
        { id: 'business-model', text: 'It\'s just how businesses work', accepting: true },
        { id: 'convenience', text: 'Paying for convenience and service', privileged: true },
        { id: 'exploitation', text: 'Desperation is exploited by financial gatekeepers', awakening: true, correct: true }
      ],
      reality: 'Remittance fees average 7% globally—a $50B tax on the world\'s poorest families.',
      realization: 'poverty-tax'
    }
  ];

  const currentStory = exclusionStories[currentStoryIndex];

  const handleChoice = (choice) => {
    setUserChoices(prev => ({
      ...prev,
      [`exclusion-${currentStory.id}`]: choice
    }));

    if (choice.correct) {
      onRealization(currentStory.realization);
    }

    setTimeout(() => {
      if (currentStoryIndex < exclusionStories.length - 1) {
        setCurrentStoryIndex(currentStoryIndex + 1);
      } else {
        onComplete();
      }
    }, 3000);
  };

  return (
    <div className="section-card">
      <div className="story-header">
        <Globe className="scenario-icon info" size={48} />
        <h2 className="heading-critical">Global Financial Reality</h2>
        <p>Step outside the privileged Western banking bubble</p>
      </div>

      <div className="human-story">
        <div className="character-intro">
          <div className="location-badge">{currentStory.location}</div>
          <h3>{currentStory.title}</h3>
          <p className="character"><Users size={16} /> {currentStory.character}</p>
        </div>

        <div className="story-situation">
          <h4>The Situation:</h4>
          <p>{currentStory.situation}</p>
          
          <div className="impact-box">
            <AlertTriangle size={18} />
            <div>
              <h5>Real Impact:</h5>
              <p>{currentStory.impact}</p>
            </div>
          </div>

          <div className="broken-solution">
            <h5>Current "Solution":</h5>
            <p>{currentStory.currentSolution}</p>
          </div>
        </div>

        <div className="perspective-challenge">
          <h3>{currentStory.question}</h3>
          <div className="perspective-options">
            {currentStory.options.map(option => (
              <button
                key={option.id}
                className={`perspective-button ${option.privileged ? 'privileged' : option.awakening ? 'awakening' : 'incomplete'} ${userChoices[`exclusion-${currentStory.id}`]?.id === option.id ? 'selected' : ''}`}
                onClick={() => handleChoice(option)}
                disabled={userChoices[`exclusion-${currentStory.id}`]}
              >
                {option.text}
              </button>
            ))}
          </div>
        </div>

        {userChoices[`exclusion-${currentStory.id}`] && (
          <div className="global-reality">
            <div className="reality-check">
              <Target size={24} />
              <h4>Global Reality</h4>
              <p>{currentStory.reality}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Component 5: Privacy & Surveillance Crisis
const PrivacyCrisis = ({ onComplete, onRealization, userChoices, setUserChoices }) => {
  const [surveillanceLevel, setSurveillanceLevel] = useState(0);
  const [revealedData, setRevealedData] = useState([]);

  const surveillanceRealities = [
    {
      level: 'Basic',
      title: 'Every Transaction is Tracked',
      data: 'Banks record every purchase, location, time, merchant, amount',
      implication: 'Complete financial behavior profile built over years',
      shockingExample: 'Your bank knows your coffee habits better than your spouse does'
    },
    {
      level: 'Advanced', 
      title: 'Predictive Behavior Modeling',
      data: 'AI algorithms predict divorce, job loss, health issues, political views from spending',
      implication: 'Insurance, credit, employment decisions made before you apply',
      shockingExample: 'Buying certain foods flags you as diabetes risk, raising your insurance premiums'
    },
    {
      level: 'Total',
      title: 'Financial Social Credit',
      data: 'Spending patterns determine social credit scores, restrict access to services',
      implication: 'Wrong purchases = social punishment and economic exclusion',
      shockingExample: 'Buy too much alcohol? Banned from ride-sharing. Donate to wrong cause? Mortgage denied.'
    }
  ];

  const handleSurveillanceReveal = () => {
    const nextLevel = surveillanceLevel + 1;
    if (nextLevel < surveillanceRealities.length) {
      setSurveillanceLevel(nextLevel);
      setRevealedData(prev => [...prev, surveillanceRealities[nextLevel - 1]]);
    } else {
      // Final choice about privacy
      setRevealedData(surveillanceRealities);
    }
  };

  const handlePrivacyChoice = (choice) => {
    setUserChoices(prev => ({
      ...prev,
      'privacy-stance': choice
    }));

    if (choice.correct) {
      onRealization('financial-privacy');
    }

    onComplete();
  };

  return (
    <div className="section-card">
      <div className="surveillance-header">
        <Eye className="scenario-icon danger" size={48} />
        <h2 className="heading-critical">Your Financial Privacy is Gone</h2>
        <p>Every transaction tells your life story to corporations and governments</p>
      </div>

      <div className="surveillance-revelation">
        {revealedData.length === 0 && (
          <div className="privacy-question">
            <h3>Quick Question: What did you buy last Tuesday?</h3>
            <p>Don't remember? Your bank does. Every detail. Forever.</p>
            <ActionButton onClick={handleSurveillanceReveal} variant="warning">
              Show Me What They Know →
            </ActionButton>
          </div>
        )}

        {revealedData.map((level, index) => (
          <div key={index} className="surveillance-level">
            <div className="level-header">
              <div className="level-badge">{level.level} Surveillance</div>
              <h4>{level.title}</h4>
            </div>
            <div className="data-collection">
              <p><strong>Data Collected:</strong> {level.data}</p>
              <p><strong>Used For:</strong> {level.implication}</p>
              <div className="shocking-example">
                <AlertTriangle size={16} />
                <p><strong>Real Example:</strong> {level.shockingExample}</p>
              </div>
            </div>
          </div>
        ))}

        {revealedData.length > 0 && revealedData.length < surveillanceRealities.length && (
          <div className="reveal-more">
            <ActionButton onClick={handleSurveillanceReveal} variant="warning">
              It Gets Worse... →
            </ActionButton>
          </div>
        )}

        {revealedData.length === surveillanceRealities.length && (
          <div className="privacy-final-choice">
            <div className="choice-setup">
              <h3>Now You Know the Truth. What Matters More?</h3>
              <p>Every digital payment is permanent surveillance. Cash is disappearing. CBDCs make this worse.</p>
            </div>
            
            <div className="privacy-options">
              <button
                className="privacy-choice convenience"
                onClick={() => handlePrivacyChoice({ id: 'convenience', text: 'Convenience over privacy' })}
              >
                💳 Convenience Over Privacy
                <small>I'll accept surveillance for easier payments</small>
              </button>
              
              <button
                className="privacy-choice privacy-first"
                onClick={() => handlePrivacyChoice({ id: 'privacy', text: 'Financial privacy is a human right', correct: true })}
              >
                🔒 Privacy is a Human Right
                <small>My financial life should be private</small>
              </button>
            </div>

            <div className="privacy-reality">
              <Shield size={20} />
              <p><strong>Reality:</strong> Once privacy is lost, it's nearly impossible to get back. The infrastructure for total financial surveillance already exists.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Component 6: The Bitcoin Solution
const BitcoinSolution = ({ onComplete, userRealizations, userChoices }) => {
  const [solutionPhase, setSolutionPhase] = useState(0);
  const [finalChoice, setFinalChoice] = useState(null);

  const bitcoinSolutions = [
    {
      problem: 'Money Debasement',
      realization: 'money-debasement',
      solution: 'Fixed Supply',
      explanation: 'Bitcoin has a hard cap of 21 million coins. No government or central bank can print more.',
      impact: 'Your Bitcoin cannot be inflated away.'
    },
    {
      problem: 'Financial Weapons',
      realization: 'financial-weapons', 
      solution: 'Censorship Resistance',
      explanation: 'No government can freeze, seize, or stop Bitcoin transactions.',
      impact: 'Your money works everywhere, always.'
    },
    {
      problem: 'Banking Fragility',
      realization: 'systemic-fragility',
      solution: 'Self-Custody',
      explanation: 'Be your own bank. No counterparty risk, no bank failures affect you.',
      impact: 'Your money is truly yours.'
    },
    {
      problem: 'Financial Exclusion',
      realization: 'financial-apartheid',
      solution: 'Global Access',
      explanation: 'Anyone with internet can use Bitcoin. No permission, documentation, or minimum balance required.',
      impact: 'Banking for everyone, everywhere.'
    },
    {
      problem: 'Financial Surveillance',
      realization: 'financial-privacy',
      solution: 'Pseudonymous Transactions',
      explanation: 'Bitcoin transactions are recorded but not linked to your identity by default.',
      impact: 'Financial privacy by design.'
    }
  ];

  const userRealizationsList = Array.from(userRealizations);
  const relevantSolutions = bitcoinSolutions.filter(s => userRealizationsList.includes(s.realization));

  const handleFinalChoice = (choice) => {
    setFinalChoice(choice);
    setTimeout(() => onComplete(), 2000);
  };

  if (solutionPhase === 0) {
    return (
      <div className="section-card">
        <div className="solution-header">
          <div className="bitcoin-icon">₿</div>
          <h2 className="heading-critical">The Bitcoin Solution</h2>
          <p>For every problem you discovered, Bitcoin provides a direct solution</p>
        </div>

        <div className="problems-solutions">
          <h3>Your Realizations → Bitcoin Solutions</h3>
          {relevantSolutions.length === 0 && (
            <div className="no-realizations">
              <p>Go back through the scenarios and think critically about each situation.</p>
            </div>
          )}
          
          {relevantSolutions.map((solution, index) => (
            <div key={index} className="solution-pair">
              <div className="problem-side">
                <AlertTriangle size={20} />
                <div>
                  <h4>Problem: {solution.problem}</h4>
                  <p className="realization-check">✓ You realized this matters</p>
                </div>
              </div>
              <div className="arrow">→</div>
              <div className="solution-side">
                <CheckCircle size={20} />
                <div>
                  <h4>Bitcoin Solution: {solution.solution}</h4>
                  <p>{solution.explanation}</p>
                  <div className="impact">
                    <strong>Impact:</strong> {solution.impact}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="solution-advance">
          <ActionButton 
            onClick={() => setSolutionPhase(1)} 
            variant="primary"
            disabled={relevantSolutions.length === 0}
          >
            I See How Bitcoin Solves This →
          </ActionButton>
        </div>
      </div>
    );
  }

  if (solutionPhase === 1) {
    return (
      <div className="section-card">
        <div className="urgency-header">
          <Clock size={48} />
          <h2 className="heading-critical">Why This Matters RIGHT NOW</h2>
        </div>

        <div className="urgency-facts">
          <div className="urgent-fact">
            <TrendingDown size={24} />
            <div>
              <h4>Your Money is Being Debased Daily</h4>
              <p>Every day you wait, your savings lose purchasing power to money printing.</p>
            </div>
          </div>

          <div className="urgent-fact">
            <Lock size={24} />
            <div>
              <h4>Financial Controls Are Expanding</h4>
              <p>CBDCs and financial surveillance infrastructure are being deployed globally.</p>
            </div>
          </div>

          <div className="urgent-fact">
            <Building2 size={24} />
            <div>
              <h4>Banking System Instability Is Increasing</h4>
              <p>More bank failures in 2023 than any year since 2008. The next crisis is building.</p>
            </div>
          </div>

          <div className="urgent-fact">
            <Star size={24} />
            <div>
              <h4>Bitcoin Adoption Is Accelerating</h4>
              <p>Countries, institutions, and individuals are moving to Bitcoin. Early adoption advantages disappear with time.</p>
            </div>
          </div>
        </div>

        <div className="moment-of-truth">
          <h3>This Is Your Moment of Choice</h3>
          <p>You've seen the problems. You understand Bitcoin's solutions. What will you do?</p>

          <div className="final-choice-buttons">
            <button
              className="choice-button delay"
              onClick={() => handleFinalChoice('delay')}
            >
              🕐 I'll Think About It
              <small>Continue with the status quo</small>
            </button>

            <button
              className="choice-button action"
              onClick={() => handleFinalChoice('action')}
            >
              🚀 I Need to Learn Bitcoin
              <small>Take control of my financial future</small>
            </button>
          </div>
        </div>

        {finalChoice && (
          <div className="choice-result">
            {finalChoice === 'delay' && (
              <div className="delay-warning">
                <AlertTriangle size={24} />
                <p>Remember: Every day of delay is a day your money loses value and your privacy disappears. But the learning path will be here when you're ready.</p>
              </div>
            )}
            
            {finalChoice === 'action' && (
              <div className="action-celebration">
                <CheckCircle size={24} />
                <p><strong>Excellent choice!</strong> You're ready to learn how Bitcoin actually works. Next, we'll explore what money must do to serve you better.</p>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
};

export default WhyBitcoinMattersModule;
