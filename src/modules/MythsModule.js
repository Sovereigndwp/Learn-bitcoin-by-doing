import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '../contexts/ProgressContext';
import { 
  ContinueButton, 
  ActionButton, 
  OptionButton, 
  NavigationButton, 
  PopupButton 
} from '../components/ui';
import { 
  Shield, AlertTriangle, Target, Zap, CheckCircle, Globe, 
  Search, Database, BarChart3, Building, Network, TrendingUp,
  Eye, Activity, Users, Award, Star, Lock, Brain, Lightbulb,
  ChevronDown, ChevronUp, ExternalLink, Play, Clock, DollarSign
} from 'lucide-react';
import '../components/ModuleCommon.css';

const MythsModule = () => {
  const { completeModule } = useProgress();
  const navigate = useNavigate();
  
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

  // Advanced Learning Steps - Building on Foundations
  const learningSteps = [
    {
      id: 'critical-framework',
      title: 'Advanced Critical Analysis Framework',
      icon: <Brain className="step-icon" />,
      description: 'Master systematic approaches to evaluate complex Bitcoin claims',
      learningObjectives: [
        'Apply sound money principles to evaluate claims',
        'Identify logical fallacies and cognitive biases',
        'Distinguish correlation from causation'
      ]
    },
    {
      id: 'energy-economics',
      title: 'Energy Economics & Incentives',
      icon: <Zap className="step-icon" />,
      description: 'Analyze energy claims through economic and environmental lens',
      learningObjectives: [
        'Understand energy market dynamics',
        'Evaluate environmental impact frameworks',
        'Assess renewable energy incentive structures'
      ]
    },
    {
      id: 'security-engineering',
      title: 'Security Engineering Analysis',
      icon: <Shield className="step-icon" />,
      description: 'Apply engineering principles to security claims',
      learningObjectives: [
        'Distinguish system vs application security',
        'Understand cryptographic security models',
        'Evaluate attack vectors and defense mechanisms'
      ]
    },
    {
      id: 'monetary-theory',
      title: 'Advanced Monetary Theory Applications',
      icon: <TrendingUp className="step-icon" />,
      description: 'Apply Austrian and Keynesian frameworks to value claims',
      learningObjectives: [
        'Evaluate intrinsic vs subjective value theories',
        'Apply time preference to adoption analysis',
        'Understand network effects and monetary premiums'
      ]
    },
    {
      id: 'regulatory-analysis',
      title: 'Regulatory & Political Economy',
      icon: <Building className="step-icon" />,
      description: 'Analyze government intervention claims through political economy',
      learningObjectives: [
        'Understand regulatory capture and incentives',
        'Evaluate decentralization vs control tradeoffs',
        'Apply public choice theory to Bitcoin policy'
      ]
    },
    {
      id: 'synthesis-mastery',
      title: 'Synthesis & Advanced Applications',
      icon: <Award className="step-icon" />,
      description: 'Synthesize all frameworks to analyze complex, multi-faceted claims',
      learningObjectives: [
        'Integrate multiple analytical frameworks',
        'Evaluate competing narratives',
        'Demonstrate mastery of nuanced analysis'
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

  const renderCriticalFramework = () => {
    const advancedFrameworks = [
      {
        id: 'sound-money-analysis',
        title: 'Sound Money Principle Application',
        description: 'Apply the 10 sound money properties you learned to evaluate claims',
        scenario: 'Claim: "Bitcoin fails as money because it\'s too volatile to be a unit of account"',
        framework: [
          'Which sound money property is being questioned?',
          'How does volatility in adoption phase compare to mature money?',
          'What evidence exists for decreasing volatility over time?',
          'How do other money properties compensate for current volatility?'
        ],
        application: {
          property: 'Unit of Account / Acceptability',
          context: 'Early adoption phases of all money show high volatility',
          evidence: 'Bitcoin volatility has decreased from 500%+ to ~80% annually',
          synthesis: 'Short-term volatility doesn\'t negate long-term monetary properties'
        }
      },
      {
        id: 'cognitive-bias-detection',
        title: 'Cognitive Bias Recognition',
        description: 'Identify and counteract common biases in Bitcoin analysis',
        scenario: 'Claim: "I know someone who lost money in Bitcoin, so it\'s a scam"',
        framework: [
          'What cognitive bias is present?',
          'How does anecdotal evidence compare to systematic data?',
          'What selection bias might be operating?',
          'How can we reframe using base rates and statistics?'
        ],
        application: {
          bias: 'Anecdotal Fallacy + Availability Heuristic',
          reframe: 'Individual losses don\'t invalidate the system\'s properties',
          evidence: 'Need systematic data on outcomes, not individual stories',
          synthesis: 'Personal anecdotes ≠ system evaluation'
        }
      },
      {
        id: 'systems-thinking',
        title: 'Systems Thinking Approach',
        description: 'Analyze Bitcoin claims through complex systems lens',
        scenario: 'Claim: "Bitcoin mining is wasteful because it doesn\'t process many transactions"',
        framework: [
          'What system boundaries are being assumed?',
          'What system functions are being measured vs ignored?',
          'How do different system layers interact?',
          'What are the second and third-order effects?'
        ],
        application: {
          boundary: 'Conflating base layer settlement with payment processing',
          function: 'Security, finality, and decentralization vs transaction throughput',
          layers: 'Base layer provides security foundation for higher layers',
          effects: 'Secure base layer enables innovation in upper layers'
        }
      }
    ];

    return (
      <div className="critical-framework">
        <div className="framework-header">
          <h2>Advanced Critical Analysis Framework</h2>
          <p>Building on your sound money knowledge, let's develop sophisticated analytical tools.</p>
        </div>

        <div className="foundation-connection">
          <h3>🔗 Building on Your Foundations</h3>
          <div className="foundation-links">
            <div className="foundation-link">
              <strong>Why Bitcoin Matters:</strong> Understanding systemic problems and Bitcoin's solutions
            </div>
            <div className="foundation-link">
              <strong>Money Module:</strong> The 10 properties framework for evaluating any monetary system
            </div>
            <div className="foundation-link">
              <strong>Now:</strong> Apply these frameworks to analyze complex, nuanced claims
            </div>
          </div>
        </div>

        <div className="frameworks-detailed">
          {advancedFrameworks.map((framework, index) => (
            <div key={framework.id} className="framework-deep-dive">
              <h3>{framework.title}</h3>
              <p>{framework.description}</p>
              
              <div className="framework-scenario">
                <h4>📋 Analysis Scenario:</h4>
                <div className="scenario-text">"{framework.scenario}"</div>
              </div>

              <div className="framework-steps">
                <h4>🧠 Analytical Framework:</h4>
                <ol>
                  {framework.framework.map((step, stepIndex) => (
                    <li key={stepIndex}>{step}</li>
                  ))}
                </ol>
              </div>

              <div className="framework-application">
                <h4>🎯 Applied Analysis:</h4>
                <div className="application-grid">
                  {Object.entries(framework.application).map(([key, value]) => (
                    <div key={key} className="application-item">
                      <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}
                    </div>
                  ))}
                </div>
              </div>

              <ActionButton
                onClick={() => setFrameworkMastery(prev => ({ ...prev, [framework.id]: true }))}
                className={frameworkMastery[framework.id] ? 'completed' : ''}
              >
                {frameworkMastery[framework.id] ? '✅ Mastered' : 'Master This Framework'}
              </ActionButton>
            </div>
          ))}
        </div>

        {Object.keys(frameworkMastery).length === advancedFrameworks.length && (
          <div className="framework-complete">
            <h3>🎓 Analytical Mastery Unlocked</h3>
            <p>You now have sophisticated tools to analyze any Bitcoin claim. Let's apply them to real-world examples.</p>
            <ContinueButton 
              onClick={() => handleStepComplete(0)}
              className="framework-complete"
            >
              Apply Advanced Analysis →
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

  const renderSynthesisMastery = () => {
    const masteryQuestions = [
      {
        id: 'systems-analysis',
        scenario: 'A central bank governor states: "Bitcoin threatens monetary policy effectiveness because it operates outside government control and wastes energy that could power cities, while providing no real economic value beyond speculation."',
        question: 'Apply your integrated analytical framework to evaluate this complex claim:',
        options: [
          'Focus only on factual accuracy of energy and value claims',
          'Consider the source\'s institutional incentives and apply sound money principles',  
          'Evaluate through systems thinking: monetary policy, energy economics, and value theory',
          'Integrate all frameworks: source analysis, sound money properties, systems thinking, and cognitive biases'
        ],
        bestAnswer: 3,
        explanation: 'Complex institutional claims require integrated analysis considering source incentives, sound money principles, systems effects, and multiple theoretical frameworks.'
      },
      {
        id: 'nuanced-synthesis',
        scenario: 'A tech journalist writes: "Bitcoin\'s proof-of-work is outdated technology that consumes enormous energy while newer cryptocurrencies achieve the same results more efficiently through proof-of-stake."',
        question: 'How do you synthesize your knowledge to address this technologically sophisticated claim?',
        options: [
          'Compare energy consumption numbers between PoW and PoS',
          'Apply security engineering analysis to compare consensus mechanisms',
          'Evaluate through Austrian economic principles of time preference and decentralization',
          'Synthesize security engineering, monetary theory, and energy economics to assess tradeoffs'
        ],
        bestAnswer: 3,
        explanation: 'Technical claims about consensus mechanisms require synthesis of security engineering, economic theory, and energy analysis to properly evaluate fundamental tradeoffs.'
      },
      {
        id: 'regulatory-complexity',
        scenario: 'A regulatory expert argues: "Bitcoin\'s anonymous nature facilitates money laundering and tax evasion, requiring strict KYC/AML compliance that undermines its decentralized promise - regulation will force centralization."',
        question: 'Apply advanced political economy analysis to this regulatory claim:',
        options: [
          'Focus on factual accuracy regarding Bitcoin\'s privacy features',
          'Apply public choice theory to understand regulatory capture incentives',
          'Evaluate the decentralization vs compliance tradeoff through first principles',
          'Integrate privacy analysis, regulatory incentives, decentralization theory, and implementation tradeoffs'
        ],
        bestAnswer: 3,
        explanation: 'Regulatory claims require integrated analysis of technical privacy features, political economy incentives, game theory of compliance, and practical implementation challenges.'
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
          <h2>Advanced Synthesis Assessment</h2>
          <p>Apply multiple analytical frameworks to complex, multi-faceted Bitcoin claims</p>
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

                    <div className="quiz-options">
                      {question.options.map((option, optIndex) => (
                        <div
                          key={optIndex}
                          className={`quiz-option ${responses[index] === optIndex ? 'selected' : ''}`}
                          onClick={() => setResponses(prev => ({
                            ...prev,
                            [index]: optIndex
                          }))}
                        >
                          {option}
                          <div className="option-indicator">{optIndex + 1}</div>
                        </div>
                      ))}
                    </div>

                    {responses[index] !== undefined && (
                      <div className="navigation-buttons">
                        {index > 0 && (
                          <ActionButton
                            onClick={() => setCurrentChallenge(index - 1)}
                            className="previous-question"
                          >
                            Previous Question
                          </ActionButton>
                        )}
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
      case 'critical-framework':
        return renderCriticalFramework();
      
      case 'energy-economics':
      case 'security-engineering': 
      case 'monetary-theory':
      case 'regulatory-analysis':
        const categoryKey = step.id.replace('-economics', '').replace('-engineering', '').replace('-theory', '').replace('-analysis', '');
        let categoryFilter = categoryKey;
        if (categoryKey === 'energy') categoryFilter = 'energy';
        if (categoryKey === 'security') categoryFilter = 'security';
        if (categoryKey === 'monetary') categoryFilter = 'economics';
        if (categoryKey === 'regulatory') categoryFilter = 'security'; // regulatory myths often overlap with security
        const categoryMyths = bitcoinMyths.filter(myth => myth.category === categoryFilter);
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
              <div className="popup-overlay" onClick={() => setSelectedMyth(null)}>
                <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                  <button 
                    className="popup-close"
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

      case 'synthesis-mastery':
        return renderSynthesisMastery();

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
      
      {/* Navigation Footer */}
      <div className="module-navigation">
        {currentStep > 0 && (
          <NavigationButton 
            onClick={() => setCurrentStep(currentStep - 1)}
            direction="prev"
          >
            Previous Step
          </NavigationButton>
        )}
        
        <NavigationButton 
          onClick={() => navigate('/')}
          className="home-button"
        >
          Return to Homepage
        </NavigationButton>
      </div>
    </div>
  );
};

export default MythsModule; 