import React, { useState, useEffect } from 'react';
import { useProgress } from '../contexts/ProgressContext';
import { 
  Shield, 
  Key, 
  Lock, 
  CheckCircle, 
  AlertTriangle, 
  Users, 
  Building, 
  Home, 
  Smartphone, 
  HardDrive, 
  Target, 
  Trophy,
  EyeOff,
  BarChart3,
  Settings,
  FileText,
  Globe
} from 'lucide-react';
import { 
  ActionButton, 
  OptionButton,
  NavigationButton, 
  PopupButton,
  StepNavigation
} from '../components/EnhancedButtons';
import '../components/ModuleCommon.css';
import './CustodyModule.css';

const CustodyModule = () => {
  const { completeModule, isModuleCompleted } = useProgress();
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(new Set());
  const [userPredictions, setUserPredictions] = useState({});
  const [challengeMode, setChallengeMode] = useState({});
  const [interactionState, setInteractionState] = useState({});
  
  // Custody Learning State
  const [custodyScore, setCustodyScore] = useState(78);
  const [securityLevel, setSecurityLevel] = useState(7);
  const [walletSetups, setWalletSetups] = useState([]);
  const [emergencyPlans, setEmergencyPlans] = useState([]);
  const [custodyMethods, setCustodyMethods] = useState([]);
  const [threatAssessment, setThreatAssessment] = useState(0);
  const [backupSystems, setBackupSystems] = useState(0);
  const [inheritancePlanning, setInheritancePlanning] = useState(0);
  
  // Additional state for interactive components
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [customSetup, setCustomSetup] = useState(null);
  const [assessedThreats, setAssessedThreats] = useState([]);
  const [mitigationPlan, setMitigationPlan] = useState(null);
  const [implementedBackups, setImplementedBackups] = useState([]);
  const [recoveryTested, setRecoveryTested] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [inheritancePlan, setInheritancePlan] = useState(null);

  // Section-specific state that was incorrectly in render functions
  const [showPrinciples, setShowPrinciples] = useState(false);
  const [methodStep, setMethodStep] = useState(0);
  const [threatStep, setThreatStep] = useState(0);
  const [backupStep, setBackupStep] = useState(0);
  const [inheritanceStep, setInheritanceStep] = useState(0);

  const learningSteps = [
    {
      id: 'custody-introduction',
      title: 'Bitcoin Custody Introduction',
      icon: <Shield className="step-icon" />,
      description: 'Learn why custody matters and explore real-world security challenges',
      learningObjectives: [
        'Understand custody fundamentals',
        'Explore historical security lessons',
        'Learn risk vs convenience tradeoffs'
      ]
    },
    {
      id: 'custody-methods',
      title: 'Custody Methods & Security',
      icon: <Key className="step-icon" />,
      description: 'Compare different custody solutions and their security models',
      learningObjectives: [
        'Evaluate custody options',
        'Understand security tradeoffs',
        'Build custom security setups'
      ]
    },
    {
      id: 'threat-modeling',
      title: 'Threat Modeling & Risk Assessment',
      icon: <Target className="step-icon" />,
      description: 'Identify potential threats and design defense strategies',
      learningObjectives: [
        'Assess personal threat model',
        'Design defense strategies',
        'Implement security layers'
      ]
    },
    {
      id: 'backup-recovery',
      title: 'Backup & Recovery Systems',
      icon: <FileText className="step-icon" />,
      description: 'Create robust backup and recovery procedures',
      learningObjectives: [
        'Design backup strategies',
        'Test recovery procedures',
        'Plan for various scenarios'
      ]
    },
    {
      id: 'inheritance-planning',
      title: 'Inheritance & Emergency Planning',
      icon: <Users className="step-icon" />,
      description: 'Plan for Bitcoin inheritance and emergency access',
      learningObjectives: [
        'Design inheritance systems',
        'Create emergency procedures',
        'Ensure family access'
      ]
    },
    {
      id: 'custody-mastery',
      title: 'Custody Mastery',
      icon: <Trophy className="step-icon" />,
      description: 'Demonstrate comprehensive custody knowledge and best practices',
      learningObjectives: [
        'Complete custody assessment',
        'Implement best practices',
        'Achieve security mastery'
      ]
    }
  ];

  const handleStepComplete = (stepIndex) => {
    const newCompleted = new Set(completedSteps);
    newCompleted.add(stepIndex);
    setCompletedSteps(newCompleted);
    
    if (stepIndex === learningSteps.length - 1) {
      completeModule('custody');
    }
    // Removed automatic navigation - users now control progression
  };

  const handleStepNavigation = (stepIndex) => {
    setCurrentStep(stepIndex);
  };

  const handlePrediction = (questionId, prediction) => {
    setUserPredictions(prev => ({ ...prev, [questionId]: prediction }));
    setChallengeMode(prev => ({ ...prev, [questionId]: false }));
  };

  const handleInteraction = (key, value) => {
    setInteractionState(prev => ({ ...prev, [key]: value }));
  };

  const renderStepContent = () => {
    const step = learningSteps[currentStep];
    
    switch (step.id) {
      case 'custody-introduction':
        return renderCustodyIntroduction();
      case 'custody-methods':
        return renderCustodyMethods();
      case 'threat-modeling':
        return renderThreatModeling();
      case 'backup-recovery':
        return renderBackupRecovery();
      case 'inheritance-planning':
        return renderInheritancePlanning();
      case 'custody-mastery':
        return renderCustodyMastery();
      default:
        return null;
    }
  };

  const renderCustodyIntroduction = () => {
    const predictions = userPredictions;
    const challenges = challengeMode;

    const custodyLessons = [
      {
        id: 'mt-gox',
        event: 'Mt. Gox Exchange Collapse (2014)',
        question: 'What happened to 850,000 Bitcoin stored on Mt. Gox exchange?',
        options: ['Safely returned to users', 'Lost forever due to hack', 'Frozen by government', 'Converted to cash'],
        reality: 'Lost forever - 850,000 Bitcoin ($25+ billion today) disappeared',
        explanation: 'Mt. Gox was the world\'s largest Bitcoin exchange, handling 70% of all Bitcoin transactions. Poor security and possible insider fraud led to massive losses.',
        lesson: 'This disaster highlighted that if someone else holds your keys, you don\'t truly own your Bitcoin',
        thinkingQuestion: 'Had you owned Bitcoin stored in Mt. Gox, what might you have realized about true ownership?'
      }
      {
        id: 'quadriga',
        event: 'QuadrigaCX CEO Death (2019)',
        question: 'What happened when the CEO of QuadrigaCX passed away without sharing access to the cold storage?',
        options: ['Funds were recovered', 'Company hired experts', '$190M lost forever', 'Insurance covered losses'],
        reality: '$190 million in cryptocurrency was permanently inaccessible',
        explanation: 'The CEO held exclusive access to the exchange\'s cold storage. His sudden passing left 76,000 users unable to retrieve their funds.',
        lesson: 'Custody planning must involve multiple parties to avoid critical single points of failure',
        thinkingQuestion: 'What would you implement to ensure asset recovery when key holders are unavailable?'
      }
      {
        id: 'personal-loss',
        event: 'Personal Key Loss Stories',
        question: 'How much Bitcoin has been lost due to forgotten passwords and lost keys?',
          options: ['Very little', 'About 1 million BTC', '4-6 million BTC', 'Over 10 million BTC'],
          reality: 'Roughly 4-6 million Bitcoin (or 20% of the total supply) are lost',
          explanation: 'According to Chainalysis, around 20% of Bitcoin may reside in lost wallets, due to forgotten passwords, lost devices, or discarded storage.',
          lesson: 'Effective backup and recovery strategies are vital to protect your Bitcoin',
          thinkingQuestion: 'What measures can you implement to maximize your access to your Bitcoin?'
        }
    ];

    const custodyPrinciples = [
      {
        id: 'control',
        principle: 'Self-Custody Control',
        description: 'You hold your own private keys and control your Bitcoin directly',
        benefit: 'No third-party can freeze, seize, or lose your Bitcoin'
      },
      {
        id: 'responsibility',
        principle: 'Personal Responsibility',
        description: 'You are responsible for security, backups, and recovery',
        benefit: 'Complete ownership comes with complete responsibility'
      },
      {
        id: 'security',
        principle: 'Security First',
        description: 'Multiple layers of protection against various threats',
        benefit: 'Proper security protects against theft, loss, and accidents'
      },
      {
        id: 'redundancy',
        principle: 'Backup Redundancy',
        description: 'Multiple secure backups ensure recovery is always possible',
        benefit: 'Never lose access due to single point of failure'
      }
    ];

    const allAnswered = custodyLessons.every(lesson => challenges[lesson.id] === false);

    return (
      <div className="learning-step custody-introduction">
        <div className="step-header">
          <Shield className="step-icon-large" />
          <div className="step-info">
            <h2>Bitcoin Custody Introduction</h2>
            <p>Understanding why custody matters through real-world lessons</p>
          </div>
        </div>

        <div className="introduction-content">
          <div className="prediction-challenges">
            <h3>🤔 Challenge Your Understanding</h3>
            <p>Before we explore custody solutions, let's understand what can go wrong. Make your predictions:</p>
            
            {custodyLessons.map(lesson => (
              <div key={lesson.id} className="prediction-challenge">
                <div className="challenge-question">
                  <h4>{lesson.event}</h4>
                  <p>{lesson.question}</p>
                </div>
                
                {challenges[lesson.id] !== false ? (
                  <div className="prediction-options">
                    {lesson.options.map(option => (
                      <button
                        key={option}
                        className="prediction-option"
                        onClick={() => handlePrediction(lesson.id, option)}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="prediction-result">
                    <div className="user-prediction">
                      <strong>Your prediction:</strong> {predictions[lesson.id]}
                    </div>
                    <div className="reality-check">
                      <strong>What happened:</strong> {lesson.reality}
                    </div>
                    <div className="explanation">
                      {lesson.explanation}
                    </div>
                    <div className="lesson-learned">
                      <strong>💡 Key lesson:</strong> {lesson.lesson}
                    </div>
                    <div className="thinking-question">
                      <strong>💭 Think about it:</strong> {lesson.thinkingQuestion}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {allAnswered && !showPrinciples && (
            <button 
              className="show-principles-btn"
              onClick={() => setShowPrinciples(true)}
            >
              Learn Custody Principles
            </button>
          )}

          {showPrinciples && (
            <>
              <div className="custody-principles">
                <h3>🛡️ Custody Principles</h3>
                <p>These principles guide effective Bitcoin custody:</p>
                
                <div className="principles-grid">
                  {custodyPrinciples.map(principle => (
                    <div key={principle.id} className="principle-card">
                      <h4>{principle.principle}</h4>
                      <p className="description">{principle.description}</p>
                      <p className="benefit"><strong>Benefit:</strong> {principle.benefit}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="interactive-demo">
                <h3>🎯 Interactive: Custody vs Exchange</h3>
                <div className="custody-comparison">
                  <div className="comparison-scenario">
                    <h4>💰 Your Bitcoin Storage Decision</h4>
                    <p>You have 1 Bitcoin. Where should you store it?</p>
                    
                    <div className="storage-options">
                      <div className="storage-option exchange">
                        <h5>🏦 Leave on Exchange</h5>
                        <div className="option-stats">
                          <div className="stat convenience">Convenience: Very High</div>
                          <div className="stat security">Security: Exchange Dependent</div>
                          <div className="stat control">Control: None</div>
                          <div className="stat risk">Risk: High (counterparty)</div>
                        </div>
                        <div className="real-examples">
                          <p><strong>Real examples:</strong> Mt. Gox, QuadrigaCX, FTX</p>
                        </div>
                      </div>
                      
                      <div className="storage-option self-custody">
                        <h5>🔐 Self-Custody</h5>
                        <div className="option-stats">
                          <div className="stat convenience">Convenience: Moderate</div>
                          <div className="stat security">Security: Your Responsibility</div>
                          <div className="stat control">Control: Complete</div>
                          <div className="stat risk">Risk: User Error</div>
                        </div>
                        <div className="real-examples">
                          <p><strong>Protection:</strong> No counterparty risk</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="understanding-check">
                <h3>💡 Understanding Check</h3>
                <div className="check-questions">
                  <div className="check-question">
                    <p><strong>Why is "Not your keys, not your Bitcoin" important?</strong></p>
                    <div className="answer-reveal">
                      <details>
                        <summary>Click to reveal answer</summary>
                        <p>When someone else holds your private keys (like an exchange), they have complete control over your Bitcoin. You're trusting them to give it back when you ask. History shows this trust is often misplaced.</p>
                      </details>
                    </div>
                  </div>
                  
                  <div className="check-question">
                    <p><strong>What's the main tradeoff with self-custody?</strong></p>
                    <div className="answer-reveal">
                      <details>
                        <summary>Click to reveal answer</summary>
                        <p>Self-custody gives you complete control and eliminates counterparty risk, but transfers all responsibility to you. You must handle security, backups, and recovery properly.</p>
                      </details>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {showPrinciples && (
          <StepNavigation
            currentStep={0}
            totalSteps={learningSteps.length}
            onNext={() => handleStepNavigation(1)}
            canGoBack={false}
            nextLabel="Explore Custody Methods"
          />
        )}
      </div>
    );
  };

  const renderCustodyMethods = () => {
    const custodyOptions = [
      {
        id: 'mobile-wallet',
        name: 'Mobile Wallet',
        icon: <Smartphone className="method-icon" />,
        security: 6,
        convenience: 9,
        control: 8,
        cost: 'Free',
        bestFor: 'Daily spending ($100-1,000)',
        risks: ['Phone theft', 'Malware', 'App vulnerabilities', 'Device failure'],
        benefits: ['Easy to use', 'Quick payments', 'Backup options', 'Wide compatibility'],
        description: 'Smartphone app storing keys with backup phrase protection'
      },
      {
        id: 'hardware-wallet',
        name: 'Hardware Wallet',
        icon: <HardDrive className="method-icon" />,
        security: 9,
        convenience: 7,
        control: 9,
        cost: '$50-200',
        bestFor: 'Savings ($1,000-100,000)',
        risks: ['Device loss', 'Physical damage', 'Supply chain attacks', 'User error'],
        benefits: ['Offline storage', 'Strong security', 'PIN protection', 'Recovery phrases'],
        description: 'Dedicated device storing keys offline with secure chip protection'
      },
      {
        id: 'multisig',
        name: 'Multisig Setup',
        icon: <Users className="method-icon" />,
        security: 10,
        convenience: 5,
        control: 10,
        cost: '$150-500',
        bestFor: 'Large amounts ($10,000+)',
        risks: ['Key coordination', 'Complexity', 'Multiple device management', 'Recovery planning'],
        benefits: ['No single point of failure', 'Shared custody', 'Enhanced security', 'Theft resistance'],
        description: 'Multiple signatures required to spend Bitcoin (e.g., 2-of-3, 3-of-5)'
      },
      {
        id: 'paper-wallet',
        name: 'Paper/Metal Storage',
        icon: <FileText className="method-icon" />,
        security: 8,
        convenience: 3,
        control: 10,
        cost: '$10-100',
        bestFor: 'Long-term storage (HODLing)',
        risks: ['Physical damage', 'Fire/flood', 'Deterioration', 'Loss/theft'],
        benefits: ['Completely offline', 'No electronics', 'Permanent storage', 'Air-gapped'],
        description: 'Private keys written/engraved on physical materials'
      }
    ];

    const analyzeMethod = (method) => {
      setSelectedMethod(method);
      setCustodyScore(prev => Math.min(prev + 5, 100));
    };

    const buildCustomSetup = () => {
      const setup = {
        spending: custodyOptions.find(m => m.id === 'mobile-wallet'),
        savings: custodyOptions.find(m => m.id === 'hardware-wallet'),
        longTerm: custodyOptions.find(m => m.id === 'multisig'),
        backup: custodyOptions.find(m => m.id === 'paper-wallet')
      };
      setCustomSetup(setup);
      setSecurityLevel(9);
      setMethodStep(1); // Navigate to the next step
    };

    return (
      <div className="learning-step custody-methods">
        <div className="step-header">
          <Key className="step-icon-large" />
          <div className="step-info">
            <h2>Custody Methods & Security</h2>
            <p>Compare different custody solutions and build your setup</p>
          </div>
        </div>

        <div className="custody-content">
          <div className="methods-explanation">
            <h3>🔐 Custody Method Comparison</h3>
            <p>Each custody method has different security, convenience, and control tradeoffs. Choose the right method for your needs and amount.</p>
          </div>

          <div className="custody-methods-grid">
            {custodyOptions.map(method => (
              <div 
                key={method.id} 
                className={`custody-method-card ${selectedMethod?.id === method.id ? 'selected' : ''}`}
                onClick={() => analyzeMethod(method)}
              >
                <div className="method-header">
                  {method.icon}
                  <h4>{method.name}</h4>
                  <div className="method-cost">{method.cost}</div>
                </div>
                
                <div className="method-stats">
                  <div className="stat-row">
                    <span className="stat-label">Security:</span>
                    <div className="stat-bar">
                      <div className="stat-fill" style={{ width: `${method.security * 10}%` }}></div>
                    </div>
                    <span className="stat-value">{method.security}/10</span>
                  </div>
                  
                  <div className="stat-row">
                    <span className="stat-label">Convenience:</span>
                    <div className="stat-bar">
                      <div className="stat-fill" style={{ width: `${method.convenience * 10}%` }}></div>
                    </div>
                    <span className="stat-value">{method.convenience}/10</span>
                  </div>
                  
                  <div className="stat-row">
                    <span className="stat-label">Control:</span>
                    <div className="stat-bar">
                      <div className="stat-fill" style={{ width: `${method.control * 10}%` }}></div>
                    </div>
                    <span className="stat-value">{method.control}/10</span>
                  </div>
                </div>
                
                <div className="method-details">
                  <p className="method-description">{method.description}</p>
                  <div className="method-best-for">
                    <strong>Best for:</strong> {method.bestFor}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {selectedMethod && (
            <div className="method-analysis">
              <h3>📊 Analysis: {selectedMethod.name}</h3>
              <div className="analysis-content">
                <div className="analysis-section">
                  <h4>✅ Benefits</h4>
                  <ul>
                    {selectedMethod.benefits.map((benefit, index) => (
                      <li key={index}>{benefit}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="analysis-section">
                  <h4>⚠️ Risks</h4>
                  <ul>
                    {selectedMethod.risks.map((risk, index) => (
                      <li key={index}>{risk}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {selectedMethod && !customSetup && (
            <div className="build-setup">
              <button 
                className="build-setup-btn"
                onClick={buildCustomSetup}
              >
                <Settings className="btn-icon" />
                Build Multi-Layer Setup
              </button>
            </div>
          )}

          {methodStep > 0 && (
            <StepNavigation
              currentStep={1}
              totalSteps={learningSteps.length}
              onPrevious={() => handleStepNavigation(0)}
              onNext={() => handleStepNavigation(2)}
              canGoBack={true}
              nextLabel="Learn Threat Modeling"
              previousLabel="Back to Introduction"
            />
          )}
        </div>
      </div>
    );
  };

  const renderThreatModeling = () => {
    const threats = [
      {
        id: 'physical',
        name: 'Physical Threats',
        icon: <Home className="threat-icon" />,
        examples: ['Theft/burglary', 'Natural disasters', 'Fire/flood', 'Physical violence'],
        mitigations: ['Geographic distribution', 'Safe/vault storage', 'Insurance', 'Operational security'],
        riskLevel: 'Medium'
      },
      {
        id: 'digital',
        name: 'Digital Threats',
        icon: <Smartphone className="threat-icon" />,
        examples: ['Malware/viruses', 'Phishing attacks', 'Sim swapping', 'Software vulnerabilities'],
        mitigations: ['Air-gapped devices', 'Hardware wallets', '2FA authentication', 'Software updates'],
        riskLevel: 'High'
      },
      {
        id: 'human',
        name: 'Human Threats',
        icon: <Users className="threat-icon" />,
        examples: ['Social engineering', 'Insider threats', 'Coercion/extortion', 'Human error'],
        mitigations: ['Education/training', 'Compartmentalization', 'Multisig requirements', 'Operational security'],
        riskLevel: 'High'
      },
      {
        id: 'institutional',
        name: 'Institutional Threats',
        icon: <Building className="threat-icon" />,
        examples: ['Government seizure', 'Legal disputes', 'Regulatory changes', 'Banking restrictions'],
        mitigations: ['Geographic diversification', 'Legal compliance', 'Privacy techniques', 'Self-custody'],
        riskLevel: 'Medium'
      }
    ];

    const assessThreat = (threat) => {
      setAssessedThreats(prev => [...prev, threat]);
      setThreatAssessment(prev => Math.min(prev + 25, 100));
    };

    const createMitigationPlan = () => {
      const plan = {
        physical: ['Safe deposit box', 'Geographic distribution', 'Fire-proof storage'],
        digital: ['Hardware wallets', 'Air-gapped devices', 'Regular security updates'],
        human: ['Multisig setup', 'Operational security', 'Need-to-know basis'],
        institutional: ['Self-custody priority', 'Privacy techniques', 'Legal consultation']
      };
      setMitigationPlan(plan);
      setThreatStep(1); // Navigate to the next step
    };

    return (
      <div className="learning-step threat-modeling">
        <div className="step-header">
          <Target className="step-icon-large" />
          <div className="step-info">
            <h2>Threat Modeling & Risk Assessment</h2>
            <p>Identify threats and design defense strategies</p>
          </div>
        </div>

        <div className="threat-content">
          <div className="threat-explanation">
            <h3>🎯 What is Threat Modeling?</h3>
            <p>Threat modeling helps you identify what you're protecting against and design appropriate defenses. Different people face different threats based on their situation.</p>
          </div>

          <div className="threats-grid">
            {threats.map(threat => (
              <div 
                key={threat.id} 
                className={`threat-card ${assessedThreats.find(t => t.id === threat.id) ? 'assessed' : ''}`}
                onClick={() => assessThreat(threat)}
              >
                <div className="threat-header">
                  {threat.icon}
                  <h4>{threat.name}</h4>
                  <span className={`risk-badge ${threat.riskLevel.toLowerCase()}`}>
                    {threat.riskLevel} Risk
                  </span>
                </div>
                
                <div className="threat-details">
                  <div className="examples">
                    <h5>Examples:</h5>
                    <ul>
                      {threat.examples.map((example, index) => (
                        <li key={index}>{example}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mitigations">
                    <h5>Mitigations:</h5>
                    <ul>
                      {threat.mitigations.map((mitigation, index) => (
                        <li key={index}>{mitigation}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="threat-assessment">
            <h3>📊 Your Threat Assessment</h3>
            <div className="assessment-progress">
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${threatAssessment}%` }}></div>
              </div>
              <span>{threatAssessment}% Complete</span>
            </div>
          </div>

          {assessedThreats.length === threats.length && !mitigationPlan && (
            <div className="create-plan">
              <button 
                className="create-plan-btn"
                onClick={createMitigationPlan}
              >
                <Shield className="btn-icon" />
                Create Mitigation Plan
              </button>
            </div>
          )}

          {threatStep > 0 && (
            <StepNavigation
              currentStep={2}
              totalSteps={learningSteps.length}
              onPrevious={() => handleStepNavigation(1)}
              onNext={() => handleStepNavigation(3)}
              canGoBack={true}
              nextLabel="Design Backup Systems"
              previousLabel="Back to Custody Methods"
            />
          )}
        </div>
      </div>
    );
  };

  const renderBackupRecovery = () => {
    const backupStrategies = [
      {
        id: 'seed-phrase',
        name: 'Seed Phrase Backup',
        description: 'Write down your 12-24 word recovery phrase',
        implementation: 'Write clearly on paper, verify accuracy, store securely',
        pros: ['Universal standard', 'Easy to verify', 'Human readable'],
        cons: ['Physical vulnerability', 'Writing errors', 'Single point of failure']
      },
      {
        id: 'metal-backup',
        name: 'Metal Seed Storage',
        description: 'Engrave seed words on metal plates or tiles',
        implementation: 'Use steel plates, stamp words, verify legibility, fireproof storage',
        pros: ['Fire resistant', 'Water resistant', 'Long-term durability'],
        cons: ['Higher cost', 'More complex', 'Still physical medium']
      },
      {
        id: 'geographic-distribution',
        name: 'Geographic Distribution',
        description: 'Store backups in multiple physical locations',
        implementation: 'Safe deposit boxes, trusted locations, geographic separation',
        pros: ['Disaster protection', 'Multiple access points', 'Risk distribution'],
        cons: ['Access complexity', 'Multiple failure points', 'Coordination needed']
      },
      {
        id: 'shamir-secret',
        name: 'Shamir Secret Sharing',
        description: 'Split seed into multiple shares requiring threshold to recover',
        implementation: 'Generate shares mathematically, distribute separately, require M-of-N to reconstruct',
        pros: ['No single point of failure', 'Flexible threshold', 'Mathematical security'],
        cons: ['Complex setup', 'Share coordination', 'Recovery complexity']
      }
    ];

    const implementBackup = (strategy) => {
      setImplementedBackups(prev => [...prev, strategy]);
      setBackupSystems(prev => Math.min(prev + 25, 100));
    };

    const testRecovery = () => {
      setRecoveryTested(true);
      setBackupStep(1); // Navigate to the next step
    };

    return (
      <div className="learning-step backup-recovery">
        <div className="step-header">
          <FileText className="step-icon-large" />
          <div className="step-info">
            <h2>Backup & Recovery Systems</h2>
            <p>Create robust backup and recovery procedures</p>
          </div>
        </div>

        <div className="backup-content">
          <div className="backup-explanation">
            <h3>💾 Why Backup Strategies Matter</h3>
            <p>Your backup strategy determines whether you can recover your Bitcoin if something goes wrong. Different strategies offer different tradeoffs between security, convenience, and complexity.</p>
          </div>

          <div className="backup-strategies">
            <h3>🛡️ Backup Strategy Options</h3>
            <div className="strategies-grid">
              {backupStrategies.map(strategy => (
                <div 
                  key={strategy.id} 
                  className={`strategy-card ${implementedBackups.find(s => s.id === strategy.id) ? 'implemented' : ''}`}
                >
                  <div className="strategy-header">
                    <h4>{strategy.name}</h4>
                    {implementedBackups.find(s => s.id === strategy.id) && (
                      <CheckCircle className="implemented-icon" />
                    )}
                  </div>
                  
                  <p className="strategy-description">{strategy.description}</p>
                  
                  <div className="strategy-details">
                    <div className="implementation">
                      <h5>Implementation:</h5>
                      <p>{strategy.implementation}</p>
                    </div>
                    
                    <div className="pros-cons">
                      <div className="pros">
                        <h5>✅ Pros:</h5>
                        <ul>
                          {strategy.pros.map((pro, index) => (
                            <li key={index}>{pro}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="cons">
                        <h5>⚠️ Cons:</h5>
                        <ul>
                          {strategy.cons.map((con, index) => (
                            <li key={index}>{con}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  {!implementedBackups.find(s => s.id === strategy.id) && (
                    <button 
                      className="implement-btn"
                      onClick={() => implementBackup(strategy)}
                    >
                      Implement Strategy
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="backup-progress">
            <h3>📈 Backup Implementation Progress</h3>
            <div className="progress-display">
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${backupSystems}%` }}></div>
              </div>
              <span>{backupSystems}% Complete</span>
            </div>
          </div>

          {implementedBackups.length >= 2 && !recoveryTested && (
            <div className="recovery-test">
              <h3>🧪 Test Your Recovery</h3>
              <p>The final step is testing that your backups actually work. Practice recovering a test wallet.</p>
              <button 
                className="test-recovery-btn"
                onClick={testRecovery}
              >
                <Target className="btn-icon" />
                Test Recovery Process
              </button>
            </div>
          )}

          {backupStep > 0 && (
            <StepNavigation
              currentStep={3}
              totalSteps={learningSteps.length}
              onPrevious={() => handleStepNavigation(2)}
              onNext={() => handleStepNavigation(4)}
              canGoBack={true}
              nextLabel="Plan Inheritance"
              previousLabel="Back to Threat Modeling"
            />
          )}
        </div>
      </div>
    );
  };

  const renderInheritancePlanning = () => {
    const inheritanceOptions = [
      {
        id: 'trusted-person',
        name: 'Trusted Person Method',
        description: 'Give backup access to a trusted family member or friend',
        pros: ['Simple to implement', 'Quick access', 'Low cost'],
        cons: ['Single point of trust', 'Requires disclosure', 'Trust can change'],
        setup: ['Choose trusted person', 'Provide instructions', 'Secure backup delivery', 'Regular updates']
      },
      {
        id: 'multisig-inheritance',
        name: 'Multisig Inheritance',
        description: 'Create multisig wallet that family can access after your death',
        pros: ['No single point of failure', 'Flexible access', 'Secure'],
        cons: ['Complex setup', 'Requires coordination', 'Technical knowledge needed'],
        setup: ['Create multisig wallet', 'Distribute keys', 'Document process', 'Train beneficiaries']
      },
      {
        id: 'time-locked',
        name: 'Time-locked Inheritance',
        description: 'Use Bitcoin time locks that automatically transfer after period',
        pros: ['Automated process', 'No trust required', 'Programmable'],
        cons: ['Complex to set up', 'Inflexible timing', 'Requires planning'],
        setup: ['Create time-locked transaction', 'Set trigger conditions', 'Prepare documentation', 'Store safely']
      },
      {
        id: 'legal-inheritance',
        name: 'Legal Estate Planning',
        description: 'Work with lawyers to include Bitcoin in legal will/trust',
        pros: ['Legal framework', 'Professional guidance', 'Established process'],
        cons: ['Expensive', 'Disclosure required', 'Legal complexity'],
        setup: ['Consult estate lawyer', 'Draft documents', 'Update will/trust', 'Store instructions']
      }
    ];

    const selectOption = (option) => {
      setSelectedOptions(prev => [...prev, option]);
      setInheritancePlanning(prev => Math.min(prev + 25, 100));
    };

    const createInheritancePlan = () => {
      const plan = {
        immediate: 'Document Bitcoin holdings and access methods for family',
        intermediate: 'Set up multisig wallet with trusted family members',
        longTerm: 'Create comprehensive estate plan with legal counsel',
        backup: 'Establish dead man\'s switch or time-locked transactions'
      };
      setInheritancePlan(plan);
      setInheritanceStep(1); // Navigate to the next step
    };

    return (
      <div className="learning-step inheritance-planning">
        <div className="step-header">
          <Users className="step-icon-large" />
          <div className="step-info">
            <h2>Inheritance & Emergency Planning</h2>
            <p>Plan for Bitcoin inheritance and emergency access</p>
          </div>
        </div>

        <div className="inheritance-content">
          <div className="inheritance-explanation">
            <h3>👨‍👩‍👧‍👦 Why Inheritance Planning Matters</h3>
            <p>Bitcoin inheritance requires special planning because traditional estate processes don't automatically work with cryptocurrency. Without proper planning, your Bitcoin could be lost forever.</p>
          </div>

          <div className="inheritance-options">
            <h3>⚖️ Inheritance Methods</h3>
            <div className="options-grid">
              {inheritanceOptions.map(option => (
                <div 
                  key={option.id} 
                  className={`option-card ${selectedOptions.find(o => o.id === option.id) ? 'selected' : ''}`}
                  onClick={() => selectOption(option)}
                >
                  <h4>{option.name}</h4>
                  <p className="option-description">{option.description}</p>
                  
                  <div className="option-analysis">
                    <div className="pros">
                      <h5>✅ Pros:</h5>
                      <ul>
                        {option.pros.map((pro, index) => (
                          <li key={index}>{pro}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="cons">
                      <h5>⚠️ Cons:</h5>
                      <ul>
                        {option.cons.map((con, index) => (
                          <li key={index}>{con}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="setup-steps">
                    <h5>Setup Steps:</h5>
                    <ol>
                      {option.setup.map((step, index) => (
                        <li key={index}>{step}</li>
                      ))}
                    </ol>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="planning-progress">
            <h3>📈 Inheritance Planning Progress</h3>
            <div className="progress-display">
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${inheritancePlanning}%` }}></div>
              </div>
              <span>{inheritancePlanning}% Complete</span>
            </div>
          </div>

          {selectedOptions.length >= 2 && !inheritancePlan && (
            <div className="create-inheritance-plan">
              <button 
                className="create-plan-btn"
                onClick={createInheritancePlan}
              >
                <FileText className="btn-icon" />
                Create Inheritance Plan
              </button>
            </div>
          )}

          {inheritanceStep > 0 && (
            <StepNavigation
              currentStep={4}
              totalSteps={learningSteps.length}
              onPrevious={() => handleStepNavigation(3)}
              onNext={() => handleStepNavigation(5)}
              canGoBack={true}
              nextLabel="Complete Custody Mastery"
              previousLabel="Back to Backup Systems"
            />
          )}
        </div>
      </div>
    );
  };

  const renderCustodyMastery = () => (
    <div className="learning-step custody-mastery">
      <div className="step-header">
        <Trophy className="step-icon-large" />
        <div className="step-info">
          <h2>Custody Mastery Achievement</h2>
          <p>Demonstrate your comprehensive Bitcoin custody knowledge</p>
        </div>
      </div>

      <div className="mastery-content">
        <div className="mastery-overview">
          <h3>🛡️ Bitcoin Custody Mastery</h3>
          <p>You've successfully learned how to secure Bitcoin through proper custody practices, threat modeling, and inheritance planning.</p>
          
          <div className="mastery-categories">
            <div className="mastery-category">
              <div className="category-header">
                <Shield className="category-icon" />
                <h4>Security Knowledge</h4>
              </div>
              <div className="mastery-level">Expert</div>
              <div className="category-skills">
                <div className="skill">✅ Custody method evaluation</div>
                <div className="skill">✅ Security vs convenience tradeoffs</div>
                <div className="skill">✅ Multi-layer security design</div>
                <div className="skill">✅ Hardware wallet operation</div>
              </div>
            </div>

            <div className="mastery-category">
              <div className="category-header">
                <Target className="category-icon" />
                <h4>Risk Management</h4>
              </div>
              <div className="mastery-level">Expert</div>
              <div className="category-skills">
                <div className="skill">✅ Threat modeling process</div>
                <div className="skill">✅ Risk assessment techniques</div>
                <div className="skill">✅ Mitigation strategy design</div>
                <div className="skill">✅ Security layer implementation</div>
              </div>
            </div>

            <div className="mastery-category">
              <div className="category-header">
                <FileText className="category-icon" />
                <h4>Backup & Recovery</h4>
              </div>
              <div className="mastery-level">Expert</div>
              <div className="category-skills">
                <div className="skill">✅ Backup strategy design</div>
                <div className="skill">✅ Recovery process testing</div>
                <div className="skill">✅ Geographic distribution</div>
                <div className="skill">✅ Redundancy planning</div>
              </div>
            </div>

            <div className="mastery-category">
              <div className="category-header">
                <Users className="category-icon" />
                <h4>Inheritance Planning</h4>
              </div>
              <div className="mastery-level">Expert</div>
              <div className="category-skills">
                <div className="skill">✅ Inheritance method evaluation</div>
                <div className="skill">✅ Estate planning integration</div>
                <div className="skill">✅ Family access procedures</div>
                <div className="skill">✅ Emergency planning protocols</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mastery-impact">
          <h3>🌟 Your Learning Impact</h3>
          <div className="impact-summary">
            <div className="impact-metric">
              <div className="metric-value">6</div>
              <div className="metric-label">Learning Steps Completed</div>
            </div>
            <div className="impact-metric">
              <div className="metric-value">20+</div>
              <div className="metric-label">Security Techniques Learned</div>
            </div>
            <div className="impact-metric">
              <div className="metric-value">100%</div>
              <div className="metric-label">Custody Understanding</div>
            </div>
            <div className="impact-metric">
              <div className="metric-value">∞</div>
              <div className="metric-label">Security Improvement</div>
            </div>
          </div>

          <div className="mastery-message">
            <p>You now understand how to properly secure Bitcoin through self-custody. You can evaluate custody methods, model threats, create backups, and plan inheritance. Most importantly, you understand that security is a process, not a product.</p>
            
            <div className="final-achievement">
              <Trophy className="achievement-trophy" />
              <span>Bitcoin Custody Mastery: ACHIEVED</span>
            </div>
          </div>
        </div>

        <div className="next-steps">
          <h3>🚀 What's Next?</h3>
          <div className="next-steps-grid">
            <div className="next-step">
              <h4>🔐 Implement Your Setup</h4>
              <p>Start with a hardware wallet and build your multi-layer security system</p>
            </div>
            <div className="next-step">
              <h4>🧪 Practice Recovery</h4>
              <p>Regularly test your backup and recovery procedures</p>
            </div>
            <div className="next-step">
              <h4>📚 Stay Informed</h4>
              <p>Keep up with new security techniques and threats</p>
            </div>
            <div className="next-step">
              <h4>👥 Educate Others</h4>
              <p>Help family and friends improve their Bitcoin security</p>
            </div>
          </div>
        </div>
      </div>

      <StepNavigation
        currentStep={5}
        totalSteps={learningSteps.length}
        onPrevious={() => handleStepNavigation(4)}
        onNext={() => handleStepComplete(5)}
        canGoBack={true}
        nextLabel="Complete Custody Module"
        previousLabel="Back to Inheritance Planning"
      />
    </div>
  );

  return (
    <div className="module-container custody-module">
      <div className="custody-content">
        <div className="module-header">
          <div className="header-content">
            <div className="module-icon">🛡️</div>
            <div className="header-text">
              <h1 className="module-title">Bitcoin Custody & Security</h1>
              <p className="module-subtitle">Master secure Bitcoin storage and protection</p>
              <div className="module-description">
                Learn practical strategies for safely storing and managing your Bitcoin through real-world examples and hands-on security planning
              </div>
            </div>
          </div>
          
          {isModuleCompleted('custody') && (
            <div className="completion-badge">
              <Trophy className="completion-icon" />
              <span>Custody Mastery Achieved!</span>
            </div>
          )}
        </div>

        <div className="module-navigation">
          {learningSteps.map((step, index) => (
            <div
              key={step.id}
              className={`module-tab ${currentStep === index ? 'active' : ''} ${completedSteps.has(index) ? 'completed' : ''}`}
              onClick={() => setCurrentStep(index)}
            >
              <div className="tab-icon">{step.icon}</div>
              <div className="tab-info">
                <div className="tab-title">{step.title}</div>
                <div className="tab-description">{step.description}</div>
              </div>
              {completedSteps.has(index) && (
                <div className="tab-completion">
                  <CheckCircle className="completion-check" />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="module-content">
          {renderStepContent()}
        </div>
      </div>
    </div>
  );
};

export default CustodyModule; 