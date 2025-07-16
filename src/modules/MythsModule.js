import React, { useState, useEffect } from 'react';
import { useProgress } from '../contexts/ProgressContext';
import { 
  ContinueButton, 
  ActionButton, 
  OptionButton, 
  NavigationButton, 
  PopupButton 
} from '../components/EnhancedButtons';
import { 
  Shield, AlertTriangle, Target, Zap, CheckCircle, Globe, 
  Search, Database, BarChart3, Building, Network, TrendingUp,
  Eye, Activity, Users, Award, Star, Lock, Brain, Lightbulb,
  ChevronDown, ChevronUp, ExternalLink, Play, Clock, DollarSign
} from 'lucide-react';
import '../components/ModuleCommon.css';
import './MythsModule.css';

const MythsModule = () => {
  const { completeModule } = useProgress();
  
  // Core State Management
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(new Set());
  const [userPredictions, setUserPredictions] = useState({});
  const [mythAnalysis, setMythAnalysis] = useState({});
  const [evidenceReviewed, setEvidenceReviewed] = useState(new Set());
  const [selectedMyth, setSelectedMyth] = useState(null);
  const [thinkingLevel, setThinkingLevel] = useState('beginner');
  const [mythsBusted, setMythsBusted] = useState(new Set());
  const [learningInsights, setLearningInsights] = useState({});

  // Additional state for render functions
  const [predictionsMade, setPredictionsMade] = useState(false);
  const [showReality, setShowReality] = useState(false);
  const [activeTab, setActiveTab] = useState('evidence');
  const [userAnalysis, setUserAnalysis] = useState({
    evidenceConsidered: false,
    nuanceUnderstood: false,
    contextConsidered: false,
    conclusion: ''
  });
  const [frameworkMastery, setFrameworkMastery] = useState({});
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [responses, setResponses] = useState({});
  const [showResults, setShowResults] = useState(false);

  // Learning Steps
  const learningSteps = [
    {
      id: 'myth-introduction',
      title: 'Bitcoin Myth Analysis',
      icon: <Search className="step-icon" />,
      description: 'Learn to identify and analyze common Bitcoin misconceptions',
      learningObjectives: [
        'Understand how misinformation spreads',
        'Develop critical thinking skills',
        'Learn to evaluate evidence'
      ]
    },
    {
      id: 'energy-myths',
      title: 'Energy & Environment',
      icon: <Zap className="step-icon" />,
      description: 'Examine energy consumption claims with real data',
      learningObjectives: [
        'Compare Bitcoin energy use to other systems',
        'Understand renewable energy incentives',
        'Analyze environmental impact data'
      ]
    },
    {
      id: 'security-myths',
      title: 'Security & Technology',
      icon: <Shield className="step-icon" />,
      description: 'Evaluate claims about Bitcoin security and hacking',
      learningObjectives: [
        'Distinguish protocol vs exchange security',
        'Understand cryptographic strength',
        'Learn about network resilience'
      ]
    },
    {
      id: 'economic-myths',
      title: 'Economics & Value',
      icon: <TrendingUp className="step-icon" />,
      description: 'Analyze economic misconceptions about Bitcoin',
      learningObjectives: [
        'Understand different types of value',
        'Compare to traditional assets',
        'Evaluate bubble vs adoption claims'
      ]
    },
    {
      id: 'critical-thinking',
      title: 'Critical Thinking Framework',
      icon: <Brain className="step-icon" />,
      description: 'Develop skills to evaluate any Bitcoin claim',
      learningObjectives: [
        'Build evaluation frameworks',
        'Identify reliable sources',
        'Practice evidence-based reasoning'
      ]
    },
    {
      id: 'mastery-assessment',
      title: 'Myth-Busting Mastery',
      icon: <Award className="step-icon" />,
      description: 'Test your ability to analyze complex claims',
      learningObjectives: [
        'Apply critical thinking skills',
        'Evaluate mixed claims',
        'Demonstrate mastery'
      ]
    }
  ];

  // Enhanced Myth Database with Educational Focus
  const bitcoinMyths = [
    {
      id: 'energy-waste',
      category: 'energy',
      title: 'Bitcoin Wastes Energy',
      difficulty: 'advanced',
      icon: '⚡',
      claim: 'Bitcoin mining wastes enormous amounts of energy and is destroying the environment',
      evidence: {
        supporting: [
          'Bitcoin consumes ~150 TWh annually',
          'Some mining operations use fossil fuels',
          'Energy usage has grown with adoption'
        ],
        countering: [
          '56% of mining uses renewable energy (2023)',
          'Traditional banking uses 263 TWh annually', 
          'Bitcoin incentivizes renewable energy development',
          'Mining utilizes stranded/wasted energy',
          'Energy secures $800B+ in value'
        ]
      },
      dataPoints: {
        bitcoinEnergy: 150,
        bankingEnergy: 263,
        renewablePercent: 56,
        energyPerTransaction: 700, // kWh
        traditionalPaymentEnergy: 1.49 // kWh per transaction
      },
      nuance: 'Energy consumption isn\'t inherently wasteful - it depends on the value created and energy sources used.',
      realWorldContext: 'Bitcoin mining is increasingly driving renewable energy projects globally',
      thinkingQuestions: [
        'How do you define "waste" when energy secures $800B in value?',
        'Should we compare Bitcoin to banking systems or payment processors?',
        'What role does Bitcoin play in renewable energy economics?'
      ]
    },
    {
      id: 'bitcoin-hacked',
      category: 'security',
      title: 'Bitcoin Gets Hacked Constantly',
      difficulty: 'intermediate',
      icon: '🛡️',
      claim: 'Bitcoin is constantly being hacked and isn\'t secure',
      evidence: {
        supporting: [
          'Exchange hacks reported regularly',
          'Mt. Gox, Bitfinex, QuadrigaCX incidents',
          'Wallet thefts and scams occur'
        ],
        countering: [
          'Bitcoin protocol never been hacked (15+ years)',
          'Exchange hacks ≠ Bitcoin protocol hacks',
          '99.98% network uptime since 2009',
          'SHA-256 would take universe lifetime to break',
          'Network secured by 450+ exahashes'
        ]
      },
      dataPoints: {
        protocolHacks: 0,
        networkUptime: 99.98,
        securityBudget: 15000000000, // Daily mining cost in USD
        hashRate: 450, // Exahashes
        successfulAttacks: 0
      },
      nuance: 'Important to distinguish between Bitcoin protocol security and third-party service security.',
      realWorldContext: 'Bitcoin network itself has never been compromised despite massive financial incentives',
      thinkingQuestions: [
        'What\'s the difference between Bitcoin and Bitcoin businesses?',
        'How does network security scale with value?',
        'Why haven\'t attackers succeeded despite huge incentives?'
      ]
    },
    {
      id: 'no-intrinsic-value',
      category: 'economics',
      title: 'Bitcoin Has No Intrinsic Value',
      difficulty: 'advanced',
      icon: '💎',
      claim: 'Bitcoin has no intrinsic value because it\'s not backed by anything',
      evidence: {
        supporting: [
          'Not backed by government or commodity',
          'No physical form or industrial use',
          'Price based on speculation'
        ],
        countering: [
          'Backed by mathematical certainty and energy',
          'Network effects create utility value',
          'Scarcity enforced by code, not politics',
          'Gold has limited intrinsic value too',
          'Fiat has no backing since 1971'
        ]
      },
      dataPoints: {
        networkValue: 800000000000, // Market cap
        dailyVolume: 15000000000,
        addressCount: 48000000,
        transactionCount: 900000000, // Lifetime
        energyBacking: 15000000000 // Daily energy cost
      },
      nuance: 'Value comes from utility, scarcity, and network effects - not just physical backing.',
      realWorldContext: 'Most valuable things (companies, brands, networks) have no physical backing',
      thinkingQuestions: [
        'What gives modern money its value?',
        'How is mathematical scarcity different from physical scarcity?',
        'What creates value in network effects?'
      ]
    },
    {
      id: 'too-slow',
      category: 'technology',
      title: 'Bitcoin Is Too Slow',
      difficulty: 'intermediate',
      icon: '⚙️',
      claim: 'Bitcoin is too slow for real payments and commerce',
      evidence: {
        supporting: [
          'Only 7 transactions per second',
          '10-minute confirmation time',
          'High fees during congestion'
        ],
        countering: [
          'Processes $50B+ daily in final settlement',
          'Lightning Network enables instant payments',
          'Base layer optimized for security, not speed',
          'Traditional settlement takes 3-5 days',
          'Speed vs security tradeoff is intentional'
        ]
      },
      dataPoints: {
        baseLayerTps: 7,
        lightningTps: 1000000, // Theoretical
        dailyVolume: 50000000000,
        confirmationTime: 10, // minutes
        traditionalSettlement: 4320 // minutes (3 days)
      },
      nuance: 'Different layers serve different purposes - base layer for settlement, Lightning for payments.',
      realWorldContext: 'Bitcoin processes more value daily than most payment networks',
      thinkingQuestions: [
        'What\'s the difference between settlement and payments?',
        'How do you balance speed vs security?',
        'Why might slower settlement be better for large values?'
      ]
    },
    {
      id: 'ponzi-scheme',
      category: 'economics',
      title: 'Bitcoin Is a Ponzi Scheme',
      difficulty: 'advanced',
      icon: '🎪',
      claim: 'Bitcoin is a Ponzi scheme where early adopters exploit later ones',
      evidence: {
        supporting: [
          'Early adopters benefit from price increases',
          'Requires new buyers for growth',
          'Promoted by existing holders'
        ],
        countering: [
          'No central authority or promised returns',
          'All code is open-source and auditable',
          'No recruiting or pyramid structure',
          'Value from utility and scarcity',
          'Survived multiple 80%+ crashes'
        ]
      },
      dataPoints: {
        centralAuthority: 0,
        promisedReturns: 0,
        openSource: 100, // Percentage
        survivedCrashes: 4, // Major bear markets
        activeNodes: 15000
      },
      nuance: 'Ponzi schemes require centralized control and promised returns - Bitcoin has neither.',
      realWorldContext: 'Open-source nature allows anyone to verify operations',
      thinkingQuestions: [
        'What defines a Ponzi scheme legally and technically?',
        'How does transparency prevent Ponzi-like behavior?',
        'Why would a Ponzi scheme make its code public?'
      ]
    },
    {
      id: 'government-shutdown',
      category: 'security',
      title: 'Governments Can Shut Down Bitcoin',
      difficulty: 'intermediate',
      icon: '🏛️',
      claim: 'Governments can ban Bitcoin and shut down the network',
      evidence: {
        supporting: [
          'China banned Bitcoin mining',
          'Governments can ban exchanges',
          'Regulatory pressure affects price'
        ],
        countering: [
          '15,000+ nodes across 100+ countries',
          'China ban failed to stop network',
          'Can ban businesses, not protocol',
          'Decentralization prevents shutdown',
          'Each ban increases adoption elsewhere'
        ]
      },
      dataPoints: {
        nodeCount: 15000,
        countries: 100,
        chinaHashrateRecovery: 6, // months
        networkDowntime: 0, // hours due to bans
        adoptionGrowth: 113 // % annual
      },
      nuance: 'Governments can regulate businesses but cannot shut down a decentralized protocol.',
      realWorldContext: 'Internet protocols like Bitcoin are extremely difficult to ban effectively',
      thinkingQuestions: [
        'What\'s the difference between banning a business and a protocol?',
        'How does decentralization affect government control?',
        'Why did China\'s ban fail to stop Bitcoin?'
      ]
    }
  ];

  // Interactive myth analysis function
  const analyzeMyth = (mythId, analysis) => {
    setMythAnalysis(prev => ({
      ...prev,
      [mythId]: analysis
    }));
    
    // Track learning progress
    const analysisQuality = calculateAnalysisQuality(analysis);
    if (analysisQuality > 0.7) {
      setMythsBusted(prev => new Set([...prev, mythId]));
    }
  };

  const calculateAnalysisQuality = (analysis) => {
    let score = 0;
    if (analysis.evidenceConsidered) score += 0.3;
    if (analysis.nuanceUnerstood) score += 0.3;
    if (analysis.contextConsidered) score += 0.4;
    return score;
  };

  const handleStepComplete = (stepIndex) => {
    setCompletedSteps(prev => new Set([...prev, stepIndex]));
    if (stepIndex < learningSteps.length - 1) {
      setCurrentStep(stepIndex + 1);
    } else {
      completeModule('myths');
    }
  };

  const renderMythIntroduction = () => {
    const mythScenarios = [
      {
        id: 'news-headline',
        headline: '"Bitcoin Mining Consumes More Energy Than Argentina"',
        question: 'What\'s your first reaction to this headline?',
        options: [
          'This proves Bitcoin is wasteful',
          'I need more context to judge',
          'Headlines often lack nuance',
          'Argentina comparison seems arbitrary'
        ],
        insights: {
          0: 'Headlines can be misleading without context about value created',
          1: 'Good instinct! Context about energy sources and value matters',
          2: 'Excellent critical thinking - headlines often oversimplify',
          3: 'Smart observation - why Argentina specifically?'
        }
      },
      {
        id: 'expert-claim',
        claim: 'A Nobel Prize economist says "Bitcoin is a bubble"',
        question: 'How should you evaluate this claim?',
        options: [
          'Nobel Prize = automatically correct',
          'Even experts can be wrong about new technology', 
          'Check their reasoning and evidence',
          'Consider their potential biases'
        ],
        insights: {
          0: 'Expertise in one area doesn\'t guarantee expertise in another',
          1: 'Wise perspective - new technologies often challenge expert assumptions',
          2: 'Perfect approach - focus on reasoning, not just authority',
          3: 'Excellent point - everyone has biases and incentives'
        }
      }
    ];

    return (
      <div className="myth-introduction">
        <div className="intro-header">
          <h2>How Do You Evaluate Bitcoin Claims?</h2>
          <p>Before diving into specific myths, let's test your analytical instincts.</p>
        </div>

        <div className="prediction-challenges">
          {mythScenarios.map((scenario, index) => (
            <div key={scenario.id} className="prediction-card">
              <div className="scenario-content">
                {scenario.headline && (
                  <div className="news-headline">
                    📰 {scenario.headline}
                  </div>
                )}
                {scenario.claim && (
                  <div className="expert-claim">
                    🎓 {scenario.claim}
                  </div>
                )}
                <div className="scenario-question">{scenario.question}</div>
              </div>

              <div className="prediction-options">
                {scenario.options.map((option, optIndex) => (
                  <button
                    key={optIndex}
                    className={`prediction-option ${userPredictions[scenario.id] === optIndex ? 'selected' : ''}`}
                    onClick={() => {
                      setUserPredictions(prev => ({
                        ...prev,
                        [scenario.id]: optIndex
                      }));
                    }}
                  >
                    {option}
                  </button>
                ))}
              </div>

              {userPredictions[scenario.id] !== undefined && (
                <div className="prediction-insight">
                  💡 <strong>Your insight:</strong> {scenario.insights[userPredictions[scenario.id]]}
                </div>
              )}
            </div>
          ))}
        </div>

        {Object.keys(userPredictions).length === mythScenarios.length && (
          <div className="analysis-framework">
            <h3>Critical Thinking Framework</h3>
            <div className="framework-steps">
              <div className="framework-step">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h4>Question Everything</h4>
                  <p>Who benefits from this claim? What's the source's expertise and potential bias?</p>
                </div>
              </div>
              <div className="framework-step">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h4>Seek Evidence</h4>
                  <p>What data supports or contradicts the claim? Are sources reliable and recent?</p>
                </div>
              </div>
              <div className="framework-step">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h4>Consider Context</h4>
                  <p>What's the bigger picture? Are there important details being omitted?</p>
                </div>
              </div>
              <div className="framework-step">
                <div className="step-number">4</div>
                <div className="step-content">
                  <h4>Embrace Nuance</h4>
                  <p>Most claims have elements of truth and falsehood. What's the nuanced reality?</p>
                </div>
              </div>
            </div>

            <ContinueButton 
              onClick={() => handleStepComplete(0)}
              className="intro-complete"
            >
              Apply This Framework to Bitcoin Myths
            </ContinueButton>
          </div>
        )}
      </div>
    );
  };

  // Component for deep myth analysis
  const renderMythAnalysis = (myth) => {
    const tabs = [
      { id: 'evidence', label: 'Evidence', icon: <Database size={16} /> },
      { id: 'data', label: 'Data', icon: <BarChart3 size={16} /> },
      { id: 'context', label: 'Context', icon: <Globe size={16} /> },
      { id: 'analysis', label: 'Your Analysis', icon: <Brain size={16} /> }
    ];

    return (
      <div className="myth-analysis">
        <div className="myth-header">
          <div className="myth-icon">{myth.icon}</div>
          <div className="myth-info">
            <h3>{myth.title}</h3>
            <div className="myth-claim">"{myth.claim}"</div>
            <div className="myth-difficulty">Difficulty: {myth.difficulty}</div>
          </div>
        </div>

        <div className="analysis-tabs">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`analysis-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        <div className="tab-content">
          {activeTab === 'evidence' && (
            <div className="evidence-section">
              <div className="evidence-category">
                <h4>Evidence Supporting the Claim:</h4>
                <ul>
                  {myth.evidence.supporting.map((point, index) => (
                    <li key={index} className="evidence-point supporting">
                      <CheckCircle size={16} />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="evidence-category">
                <h4>Evidence Countering the Claim:</h4>
                <ul>
                  {myth.evidence.countering.map((point, index) => (
                    <li key={index} className="evidence-point countering">
                      <AlertTriangle size={16} />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'data' && (
            <div className="data-section">
              <h4>Key Data Points:</h4>
              <div className="data-grid">
                {Object.entries(myth.dataPoints).map(([key, value]) => (
                  <div key={key} className="data-point">
                    <div className="data-label">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                    <div className="data-value">
                      {typeof value === 'number' && value > 1000000 
                        ? `${(value / 1000000000).toFixed(1)}B`
                        : value.toLocaleString()
                      }
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'context' && (
            <div className="context-section">
              <div className="nuance-box">
                <h4>Nuanced Perspective:</h4>
                <p>{myth.nuance}</p>
              </div>
              
              <div className="context-box">
                <h4>Real-World Context:</h4>
                <p>{myth.realWorldContext}</p>
              </div>

              <div className="thinking-questions">
                <h4>Questions to Consider:</h4>
                <ul>
                  {myth.thinkingQuestions.map((question, index) => (
                    <li key={index} className="thinking-question">
                      <Lightbulb size={16} />
                      {question}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'analysis' && (
            <div className="analysis-section">
              <h4>Your Analysis:</h4>
              
              <div className="analysis-checklist">
                <label className="analysis-item">
                  <input
                    type="checkbox"
                    checked={userAnalysis.evidenceConsidered}
                    onChange={(e) => setUserAnalysis(prev => ({
                      ...prev,
                      evidenceConsidered: e.target.checked
                    }))}
                  />
                  I've considered evidence from both sides
                </label>
                
                <label className="analysis-item">
                  <input
                    type="checkbox"
                    checked={userAnalysis.nuanceUnderstood}
                    onChange={(e) => setUserAnalysis(prev => ({
                      ...prev,
                      nuanceUnderstood: e.target.checked
                    }))}
                  />
                  I understand the nuanced reality beyond simple true/false
                </label>
                
                <label className="analysis-item">
                  <input
                    type="checkbox"
                    checked={userAnalysis.contextConsidered}
                    onChange={(e) => setUserAnalysis(prev => ({
                      ...prev,
                      contextConsidered: e.target.checked
                    }))}
                  />
                  I've considered the broader context and implications
                </label>
              </div>

              <textarea
                placeholder="Write your nuanced analysis of this claim..."
                value={userAnalysis.conclusion}
                onChange={(e) => setUserAnalysis(prev => ({
                  ...prev,
                  conclusion: e.target.value
                }))}
                className="analysis-textarea"
              />

              <ActionButton
                onClick={() => analyzeMyth(myth.id, userAnalysis)}
                disabled={!userAnalysis.evidenceConsidered || !userAnalysis.conclusion}
                className="submit-analysis"
              >
                Submit Analysis
              </ActionButton>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderCriticalThinking = () => {
    const evaluationFrameworks = [
      {
        id: 'source-credibility',
        title: 'Source Credibility Assessment',
        description: 'Learn to evaluate the reliability and expertise of information sources',
        criteria: [
          'Author expertise in the specific domain',
          'Potential conflicts of interest',
          'Track record of accuracy',
          'Transparency about limitations'
        ],
        exercise: {
          scenario: 'A bank CEO says Bitcoin is too risky for institutions',
          questions: [
            'What expertise does this person have?',
            'What are their potential biases?',
            'What might they be overlooking?'
          ]
        }
      },
      {
        id: 'evidence-quality',
        title: 'Evidence Quality Framework',
        description: 'Assess the strength and reliability of supporting evidence',
        criteria: [
          'Data source reliability',
          'Sample size and methodology',
          'Recency and relevance',
          'Peer review and verification'
        ],
        exercise: {
          scenario: 'Study claims Bitcoin uses more energy than small countries',
          questions: [
            'What data sources were used?',
            'How was energy consumption measured?',
            'What comparisons are being made?'
          ]
        }
      }
    ];

    return (
      <div className="critical-thinking">
        <div className="framework-header">
          <h2>Critical Thinking Framework</h2>
          <p>Master systematic approaches to evaluate any Bitcoin claim</p>
        </div>

        <div className="frameworks-grid">
          {evaluationFrameworks.map(framework => (
            <div key={framework.id} className="framework-card">
              <h3>{framework.title}</h3>
              <p>{framework.description}</p>
              
              <div className="framework-criteria">
                <h4>Key Criteria:</h4>
                <ul>
                  {framework.criteria.map((criterion, index) => (
                    <li key={index}>{criterion}</li>
                  ))}
                </ul>
              </div>

              <div className="framework-exercise">
                <h4>Practice Exercise:</h4>
                <div className="exercise-scenario">
                  <strong>Scenario:</strong> {framework.exercise.scenario}
                </div>
                <div className="exercise-questions">
                  {framework.exercise.questions.map((question, index) => (
                    <div key={index} className="exercise-question">
                      <Lightbulb size={16} />
                      {question}
                    </div>
                  ))}
                </div>
              </div>

              <ActionButton
                onClick={() => setFrameworkMastery(prev => ({
                  ...prev,
                  [framework.id]: true
                }))}
                className={frameworkMastery[framework.id] ? 'completed' : ''}
              >
                {frameworkMastery[framework.id] ? 'Mastered' : 'Practice Framework'}
              </ActionButton>
            </div>
          ))}
        </div>

        {Object.keys(frameworkMastery).length === evaluationFrameworks.length && (
          <ContinueButton 
            onClick={() => handleStepComplete(currentStep)}
            className="framework-complete"
          >
            Test Your Mastery
          </ContinueButton>
        )}
      </div>
    );
  };

  const renderMasteryAssessment = () => {
    const masteryQuestions = [
      {
        id: 'complex-claim',
        scenario: 'A famous economist tweets: "Bitcoin wastes energy, gets hacked constantly, and has no backing - it\'s a speculative bubble that governments will ban."',
        question: 'How would you approach analyzing this multi-part claim?',
        options: [
          'Dismiss it because it contains multiple myths',
          'Address each component claim separately',  
          'Look for the partial truths in each part',
          'Both B and C - break it down and find nuance'
        ],
        bestAnswer: 3,
        explanation: 'Complex claims require breaking down into components and finding nuanced truths rather than simple dismissal.'
      },
      {
        id: 'new-myth',
        scenario: 'A new claim emerges: "Bitcoin mining is causing semiconductor shortages and hurting gaming."',
        question: 'What\'s your systematic approach to evaluate this unfamiliar claim?',
        options: [
          'Dismiss it as obvious FUD',
          'Research semiconductor supply chains and mining hardware',
          'Check if the timing correlation implies causation',
          'Both B and C - investigate thoroughly before concluding'
        ],
        bestAnswer: 3,
        explanation: 'New claims require thorough investigation of underlying facts and careful analysis of correlation vs causation.'
      }
    ];

    const calculateMasteryScore = () => {
      let correct = 0;
      masteryQuestions.forEach((q, index) => {
        if (responses[index] === q.bestAnswer) correct++;
      });
      return (correct / masteryQuestions.length) * 100;
    };

    return (
      <div className="mastery-assessment">
        <div className="assessment-header">
          <h2>Myth-Busting Mastery Assessment</h2>
          <p>Apply your critical thinking skills to complex scenarios</p>
        </div>

        {!showResults ? (
          <div className="assessment-questions">
            {masteryQuestions.map((question, index) => (
              <div key={question.id} className={`question-card ${index === currentChallenge ? 'active' : 'inactive'}`}>
                {index === currentChallenge && (
                  <>
                    <div className="question-scenario">
                      <h3>Scenario {index + 1}:</h3>
                      <p>{question.scenario}</p>
                    </div>

                    <div className="question-prompt">
                      <h4>{question.question}</h4>
                    </div>

                    <div className="question-options">
                      {question.options.map((option, optIndex) => (
                        <button
                          key={optIndex}
                          className={`option-button ${responses[index] === optIndex ? 'selected' : ''}`}
                          onClick={() => setResponses(prev => ({
                            ...prev,
                            [index]: optIndex
                          }))}
                        >
                          {option}
                        </button>
                      ))}
                    </div>

                    {responses[index] !== undefined && (
                      <div className="navigation-buttons">
                        {index < masteryQuestions.length - 1 ? (
                          <ActionButton
                            onClick={() => setCurrentChallenge(index + 1)}
                            className="next-question"
                          >
                            Next Question
                          </ActionButton>
                        ) : (
                          <ActionButton
                            onClick={() => setShowResults(true)}
                            className="show-results"
                          >
                            Show Results
                          </ActionButton>
                        )}
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="assessment-results">
            <div className="score-display">
              <h3>Your Mastery Score: {calculateMasteryScore()}%</h3>
            </div>

            <div className="detailed-feedback">
              {masteryQuestions.map((question, index) => (
                <div key={question.id} className="question-feedback">
                  <div className="question-summary">
                    <strong>Question {index + 1}:</strong> {question.question}
                  </div>
                  <div className="your-answer">
                    Your answer: {question.options[responses[index]]}
                    {responses[index] === question.bestAnswer ? ' ✅' : ' ❌'}
                  </div>
                  <div className="explanation">
                    <strong>Explanation:</strong> {question.explanation}
                  </div>
                </div>
              ))}
            </div>

            <ContinueButton 
              onClick={() => {
                completeModule('myths');
                handleStepComplete(currentStep);
              }}
              className="assessment-complete"
            >
              Complete Myths Module
            </ContinueButton>
          </div>
        )}
      </div>
    );
  };

  // Updated main render logic to include new components
  const renderCurrentStep = () => {
    const step = learningSteps[currentStep];

    switch (step.id) {
      case 'myth-introduction':
        return renderMythIntroduction();
      
      case 'energy-myths':
      case 'security-myths':
      case 'economic-myths':
        const categoryMyths = bitcoinMyths.filter(myth => myth.category === step.id.replace('-myths', ''));
        return (
          <div className="category-analysis">
            <div className="category-header">
              <h2>{step.title}</h2>
              <p>{step.description}</p>
            </div>
            
            <div className="myths-grid">
              {categoryMyths.map(myth => (
                <div key={myth.id} className="myth-card">
                  <div className="myth-preview">
                    <div className="myth-icon">{myth.icon}</div>
                    <h4>{myth.title}</h4>
                    <p className="myth-claim">"{myth.claim}"</p>
                  </div>
                  
                  <ActionButton
                    onClick={() => setSelectedMyth(myth.id)}
                    className="analyze-button"
                  >
                    Analyze This Myth
                  </ActionButton>
                </div>
              ))}
            </div>

            {selectedMyth && (
              <div className="myth-analysis-modal">
                <div className="modal-backdrop" onClick={() => setSelectedMyth(null)} />
                <div className="modal-content">
                  <button 
                    className="modal-close"
                    onClick={() => setSelectedMyth(null)}
                  >
                    ×
                  </button>
                  {renderMythAnalysis(bitcoinMyths.find(m => m.id === selectedMyth))}
                </div>
              </div>
            )}

            {mythsBusted.size >= categoryMyths.length && (
              <ContinueButton 
                onClick={() => handleStepComplete(currentStep)}
                className="category-complete"
              >
                Continue to Next Category
              </ContinueButton>
            )}
          </div>
        );

      case 'critical-thinking':
        return renderCriticalThinking();

      case 'mastery-assessment':
        return renderMasteryAssessment();

      default:
        return <div>Step content for {step.id}</div>;
    }
  };

  return (
    <div className="module-container myths-module">
      {/* Progress Header */}
      <div className="module-header">
        <div className="module-title">
          <Shield className="module-icon" />
          <div>
            <h1>Bitcoin Myths & Facts</h1>
            <p>Develop critical thinking skills to evaluate Bitcoin claims</p>
          </div>
        </div>
        
        <div className="progress-indicators">
          <div className="progress-stat">
            <span className="stat-value">{mythsBusted.size}</span>
            <span className="stat-label">Myths Analyzed</span>
          </div>
          <div className="progress-stat">
            <span className="stat-value">{completedSteps.size}</span>
            <span className="stat-label">Steps Complete</span>
          </div>
        </div>
      </div>

      {/* Learning Steps Navigation */}
      <div className="steps-navigation">
        {learningSteps.map((step, index) => (
          <div 
            key={step.id}
            className={`step-indicator ${index === currentStep ? 'active' : ''} ${completedSteps.has(index) ? 'completed' : ''}`}
          >
            {step.icon}
            <span>{step.title}</span>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="module-content">
        {renderCurrentStep()}
      </div>
    </div>
  );
};

export default MythsModule; 