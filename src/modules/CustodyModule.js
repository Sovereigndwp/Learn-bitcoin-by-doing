import React, { useState, useEffect } from 'react';
import { useProgress } from '../contexts/ProgressContext';
import ModuleLayout from '../components/ModuleLayout';
import { 
  ContinueButton, 
  ActionButton, 
  OptionButton, 
  NavigationButton, 
  PopupButton 
} from '../components/EnhancedButtons';
import './CustodyModule.css';
import { 
  Shield, 
  Key, 
  Lock, 
  Unlock, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Zap, 
  Clock, 
  Users, 
  Eye, 
  EyeOff, 
  Building, 
  Home, 
  Smartphone, 
  HardDrive, 
  Wifi, 
  WifiOff, 
  DollarSign, 
  TrendingDown, 
  Crown, 
  Target, 
  Award,
  ArrowRight,
  ChevronRight,
  Cpu,
  Database,
  Server,
  Cloud,
  FileText,
  BarChart3,
  Globe,
  Layers,
  Coins
} from 'lucide-react';

const CustodyModule = () => {
  const { updateProgress } = useProgress();
  const [activeStep, setActiveStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(new Set());
  const [achievements, setAchievements] = useState([]);
  const [currentPhase, setCurrentPhase] = useState('crisis-detective');
  const [showAchievement, setShowAchievement] = useState(false);
  const [custodyScore, setCustodyScore] = useState(0);
  const [totalLosses, setTotalLosses] = useState(0);
  const [securityLevel, setSecurityLevel] = useState(1);
  const [walletSetups, setWalletSetups] = useState([]);
  const [emergencyScenarios, setEmergencyScenarios] = useState([]);
  const [sovereigntyProgress, setSovereigntyProgress] = useState(0);

  // Crisis scenarios and real-world data
  const crisisScenarios = [
    {
      id: 'mt-gox',
      title: 'Mt. Gox Exchange Collapse',
      year: '2014',
      loss: '850,000 BTC',
      dollarValue: '$450 million',
      currentValue: '$25+ billion',
      victims: '127,000+ users',
      description: 'World\'s largest Bitcoin exchange at the time lost 7% of all Bitcoin due to security breaches and mismanagement.',
      lessonType: 'exchange-custody',
      impact: 'Destroyed trust in centralized exchanges'
    },
    {
      id: 'quadrigacx',
      title: 'QuadrigaCX CEO Death',
      year: '2019',
      loss: '190,000+ BTC/ETH',
      dollarValue: '$190 million',
      currentValue: '$5+ billion',
      victims: '76,000+ users',
      description: 'CEO died with sole access to cold storage wallets. No backup plans or shared custody protocols.',
      lessonType: 'single-point-failure',
      impact: 'Highlighted single point of failure risks'
    },
    {
      id: 'james-howells',
      title: 'The $500M Hard Drive',
      year: '2013-present',
      loss: '7,500 BTC',
      dollarValue: '$500+ million',
      currentValue: '$300+ million',
      victims: '1 person',
      description: 'IT worker accidentally threw away hard drive containing Bitcoin wallet. Now searching landfill.',
      lessonType: 'backup-failure',
      impact: 'Physical storage vulnerability awareness'
    },
    {
      id: 'celsius-network',
      title: 'Celsius Network Bankruptcy',
      year: '2022',
      loss: '$1.19 billion',
      dollarValue: '$1.19 billion',
      currentValue: '$1.5+ billion',
      victims: '1.7 million users',
      description: 'Yield platform froze all user funds, filed for bankruptcy amid liquidity crisis.',
      lessonType: 'yield-custody-risk',
      impact: 'DeFi custody risks exposed'
    }
  ];

  const custodyMethods = [
    {
      id: 'hot-wallet',
      name: 'Hot Wallet (Exchange)',
      security: 1,
      convenience: 10,
      control: 1,
      risks: ['Exchange hack', 'Regulatory seizure', 'Exit scam', 'Technical failure'],
      description: 'Funds stored on exchange servers, always online'
    },
    {
      id: 'mobile-wallet',
      name: 'Mobile Wallet',
      security: 4,
      convenience: 9,
      control: 7,
      risks: ['Phone theft', 'Malware', 'App vulnerability', 'Cloud backup risk'],
      description: 'Smartphone app with private keys on device'
    },
    {
      id: 'desktop-wallet',
      name: 'Desktop Wallet',
      security: 6,
      convenience: 7,
      control: 8,
      risks: ['Computer hack', 'Malware', 'Hardware failure', 'Physical theft'],
      description: 'Software wallet on personal computer'
    },
    {
      id: 'hardware-wallet',
      name: 'Hardware Wallet',
      security: 9,
      convenience: 6,
      control: 9,
      risks: ['Device loss', 'Firmware attack', 'Supply chain attack', 'User error'],
      description: 'Dedicated device for key storage and signing'
    },
    {
      id: 'multisig',
      name: 'Multisig Setup',
      security: 10,
      convenience: 4,
      control: 10,
      risks: ['Key loss', 'Coordination failure', 'Setup complexity', 'Recovery difficulty'],
      description: 'Multiple signatures required for transactions'
    },
    {
      id: 'cold-storage',
      name: 'Air-Gapped Cold Storage',
      security: 10,
      convenience: 2,
      control: 10,
      risks: ['Physical damage', 'Key loss', 'Inheritance issues', 'Technical complexity'],
      description: 'Offline storage with no network connection'
    }
  ];

  const emergencyTypes = [
    { id: 'death', title: 'Sudden Death', urgency: 'critical' },
    { id: 'disability', title: 'Incapacitation', urgency: 'critical' },
    { id: 'arrest', title: 'Arrest/Detention', urgency: 'high' },
    { id: 'divorce', title: 'Divorce/Separation', urgency: 'medium' },
    { id: 'job-loss', title: 'Financial Crisis', urgency: 'medium' },
    { id: 'natural-disaster', title: 'Natural Disaster', urgency: 'high' },
    { id: 'home-invasion', title: 'Theft/Robbery', urgency: 'high' },
    { id: 'government', title: 'Asset Seizure', urgency: 'critical' }
  ];

  const steps = [
    {
      id: 'crisis-detective',
      title: 'Crisis Detective: The $50 Billion Investigation',
      subtitle: 'Investigate the Greatest Custody Failures in Bitcoin History',
      icon: AlertTriangle,
      color: '#dc2626',
      description: 'Examine real-world custody disasters that destroyed billions in Bitcoin and affected millions of people.',
      objective: 'Understand the catastrophic consequences of poor custody decisions.'
    },
    {
      id: 'risk-architect',
      title: 'Risk Architect: Design Your Fortress',
      subtitle: 'Engineer Multi-Layered Security Systems',
      icon: Shield,
      color: '#ea580c',
      description: 'Design sophisticated custody architectures that protect against every attack vector.',
      objective: 'Master the art of balancing security, convenience, and control.'
    },
    {
      id: 'sovereignty-engineer',
      title: 'Sovereignty Engineer: Break Free from Banks',
      subtitle: 'Build Self-Custody Infrastructure',
      icon: Crown,
      color: '#ca8a04',
      description: 'Engineer complete financial independence through advanced self-custody techniques.',
      objective: 'Achieve true financial sovereignty with bulletproof custody.'
    },
    {
      id: 'emergency-architect',
      title: 'Emergency Architect: Plan for Chaos',
      subtitle: 'Design Crisis-Proof Recovery Systems',
      icon: Zap,
      color: '#16a34a',
      description: 'Design comprehensive emergency plans for every possible custody crisis scenario.',
      objective: 'Create unbreakable inheritance and recovery systems.'
    },
    {
      id: 'scale-commander',
      title: 'Scale Commander: Institutional Mastery',
      subtitle: 'Command Enterprise-Grade Custody',
      icon: Building,
      color: '#2563eb',
      description: 'Master institutional-grade custody solutions for businesses and large holdings.',
      objective: 'Design custody systems that scale from personal to institutional level.'
    },
    {
      id: 'custody-sovereign',
      title: 'Custody Sovereign: Ultimate Control',
      subtitle: 'Achieve Complete Financial Sovereignty',
      icon: Target,
      color: '#7c3aed',
      description: 'Command the complete spectrum of Bitcoin custody from individual to global scale.',
      objective: 'Become a master of Bitcoin custody architecture and financial sovereignty.'
    }
  ];

  const addAchievement = (title, description, points = 100) => {
    const newAchievement = {
      id: Date.now(),
      title,
      description,
      points,
      timestamp: new Date().toISOString()
    };
    setAchievements(prev => [newAchievement, ...prev]);
    setCustodyScore(prev => prev + points);
    setShowAchievement(true);
    setTimeout(() => setShowAchievement(false), 6000); // Extended from 3000
  };

  const handleStepComplete = (stepIndex) => {
    const newCompleted = new Set(completedSteps);
    newCompleted.add(stepIndex);
    setCompletedSteps(newCompleted);
    
    const step = steps[stepIndex];
    addAchievement(
      `${step.title} Mastered!`,
      `Completed: ${step.subtitle}`,
      200
    );

    if (stepIndex === steps.length - 1) {
      addAchievement(
        'Custody Sovereign Achieved!',
        'Master of Bitcoin Custody Architecture',
        1000
      );
      updateProgress('custody', 100);
    } else {
      updateProgress('custody', ((stepIndex + 1) / steps.length) * 100);
    }
  };

  const handleContinue = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
      setCurrentPhase(steps[activeStep + 1].id);
    }
  };

  // Crisis Detective Phase
  const CrisisDetectivePhase = () => {
    const [selectedCrisis, setSelectedCrisis] = useState(null);
    const [investigationComplete, setInvestigationComplete] = useState(false);

    const handleCrisisSelect = (crisis) => {
      setSelectedCrisis(crisis);
      setTotalLosses(prev => prev + parseFloat(crisis.dollarValue.replace(/[$,\s]/g, '').split(' ')[0]));
      addAchievement(
        'Crisis Investigated',
        `Analyzed the ${crisis.title} disaster`,
        150
      );
    };

    const completeInvestigation = () => {
      setInvestigationComplete(true);
      addAchievement(
        'Crisis Detective Complete',
        'Investigated $50+ billion in custody failures',
        300
      );
      handleStepComplete(0);
    };
    
    return (
      <div className="crisis-detective-phase">
        <div className="phase-header">
          <h3>The $50 Billion Investigation</h3>
          <p>Each card represents a real custody disaster. Click to investigate the catastrophic details.</p>
          <div className="investigation-stats">
            <div className="stat">
              <span className="label">Total Losses Investigated:</span>
              <span className="value">${totalLosses.toLocaleString()}M+</span>
        </div>
            <div className="stat">
              <span className="label">Victims Affected:</span>
              <span className="value">2M+ people</span>
            </div>
          </div>
        </div>

        <div className="crisis-grid">
          {crisisScenarios.map((crisis, index) => (
            <div 
              key={crisis.id} 
              className={`crisis-card ${selectedCrisis?.id === crisis.id ? 'selected' : ''}`}
              onClick={() => handleCrisisSelect(crisis)}
            >
              <div className="crisis-header">
                <h4>{crisis.title}</h4>
                <span className="crisis-year">{crisis.year}</span>
                </div>
              <div className="crisis-impact">
                <div className="loss-amount">
                  <span className="crypto-loss">{crisis.loss}</span>
                  <span className="dollar-loss">{crisis.dollarValue}</span>
                  <span className="current-value">Worth today: {crisis.currentValue}</span>
              </div>
                <div className="victims">
                  <Users size={16} />
                  <span>{crisis.victims}</span>
                </div>
              </div>
              <div className="crisis-lesson">
                <span className="lesson-type">{crisis.lessonType.replace('-', ' ')}</span>
                </div>
              </div>
          ))}
              </div>

        {selectedCrisis && (
          <div className="crisis-detail">
            <h4>Investigation: {selectedCrisis.title}</h4>
            <p className="crisis-description">{selectedCrisis.description}</p>
            <div className="crisis-analysis">
              <div className="impact-detail">
                <strong>Long-term Impact:</strong> {selectedCrisis.impact}
              </div>
              <div className="lesson-learned">
                <strong>Key Lesson:</strong> This disaster demonstrates the critical importance of 
                {selectedCrisis.lessonType === 'exchange-custody' && ' never storing large amounts on exchanges'}
                {selectedCrisis.lessonType === 'single-point-failure' && ' distributed custody and backup plans'}
                {selectedCrisis.lessonType === 'backup-failure' && ' multiple secure backups'}
                {selectedCrisis.lessonType === 'yield-custody-risk' && ' understanding custody risks in yield products'}
              </div>
            </div>
          </div>
        )}

        {selectedCrisis && !investigationComplete && (
          <ActionButton 
            className="investigation-complete" 
            onClick={completeInvestigation}
            variant="primary"
            icon={<CheckCircle size={20} />}
            iconPosition="left"
          >
            Complete Investigation & Design Solutions
          </ActionButton>
        )}

        {investigationComplete && (
          <ContinueButton onClick={handleContinue}>
            <Shield size={20} />
            Begin Risk Architecture
          </ContinueButton>
        )}
      </div>
    );
  };

  // Risk Architect Phase
  const RiskArchitectPhase = () => {
    const [selectedMethod, setSelectedMethod] = useState(null);
    const [securityAnalysis, setSecurityAnalysis] = useState({});
    const [customSetup, setCustomSetup] = useState(null);

    const analyzeCustodyMethod = (method) => {
      setSelectedMethod(method);
      const analysis = {
        securityScore: method.security * 10,
        convenienceScore: method.convenience * 10,
        controlScore: method.control * 10,
        riskLevel: 10 - method.security,
        recommendation: method.security >= 8 ? 'Recommended for large holdings' : 
                      method.security >= 6 ? 'Good for medium amounts' : 
                      'Only for small, spending amounts'
      };
      setSecurityAnalysis(analysis);
      addAchievement(
        'Custody Method Analyzed',
        `Evaluated ${method.name} security architecture`,
        100
      );
    };

    const designCustomSetup = () => {
      const setup = {
        primary: custodyMethods[4], // multisig
        secondary: custodyMethods[5], // cold storage
        spending: custodyMethods[2], // desktop
        emergency: custodyMethods[3] // hardware
      };
      setCustomSetup(setup);
      setSecurityLevel(9);
      addAchievement(
        'Custom Custody Architecture',
        'Designed multi-layered security system',
        250
      );
  };

  return (
      <div className="risk-architect-phase">
        <div className="phase-header">
          <h3>Custody Method Analysis</h3>
          <p>Analyze different custody methods and design your optimal security architecture.</p>
        </div>

        <div className="custody-methods-grid">
          {custodyMethods.map((method, index) => (
            <div 
              key={method.id} 
              className={`custody-method-card ${selectedMethod?.id === method.id ? 'selected' : ''}`}
              onClick={() => analyzeCustodyMethod(method)}
            >
              <div className="method-header">
                <h4>{method.name}</h4>
                <div className="security-level">
                  <Shield size={16} style={{ color: method.security >= 8 ? '#16a34a' : method.security >= 6 ? '#ca8a04' : '#dc2626' }} />
                  <span>Security: {method.security}/10</span>
                </div>
              </div>
              
              <div className="method-scores">
                <div className="score-bar">
                  <span>Security</span>
                  <div className="bar">
                    <div className="fill" style={{ width: `${method.security * 10}%`, backgroundColor: '#16a34a' }}></div>
      </div>
                  <span>{method.security}/10</span>
          </div>
                <div className="score-bar">
                  <span>Convenience</span>
                  <div className="bar">
                    <div className="fill" style={{ width: `${method.convenience * 10}%`, backgroundColor: '#2563eb' }}></div>
      </div>
                  <span>{method.convenience}/10</span>
                </div>
                <div className="score-bar">
                  <span>Control</span>
                  <div className="bar">
                    <div className="fill" style={{ width: `${method.control * 10}%`, backgroundColor: '#7c3aed' }}></div>
                  </div>
                  <span>{method.control}/10</span>
                </div>
              </div>

              <p className="method-description">{method.description}</p>
              
              <div className="risk-factors">
                <h5>Risk Factors:</h5>
                <ul>
                  {method.risks.map((risk, idx) => (
                    <li key={idx}>
                      <AlertTriangle size={12} />
                      {risk}
                    </li>
                  ))}
                </ul>
        </div>
              </div>
          ))}
            </div>
            
        {selectedMethod && (
          <div className="security-analysis">
            <h4>Security Analysis: {selectedMethod.name}</h4>
            <div className="analysis-metrics">
              <div className="metric">
                <span className="metric-label">Overall Security Score:</span>
                <span className="metric-value">{securityAnalysis.securityScore}/100</span>
                      </div>
              <div className="metric">
                <span className="metric-label">Risk Level:</span>
                <span className={`metric-value ${securityAnalysis.riskLevel <= 2 ? 'low' : securityAnalysis.riskLevel <= 5 ? 'medium' : 'high'}`}>
                  {securityAnalysis.riskLevel <= 2 ? 'Low' : securityAnalysis.riskLevel <= 5 ? 'Medium' : 'High'}
                </span>
                    </div>
              <div className="metric">
                <span className="metric-label">Recommendation:</span>
                <span className="metric-value">{securityAnalysis.recommendation}</span>
                  </div>
                </div>
          </div>
        )}

        {selectedMethod && !customSetup && (
          <ActionButton 
            className="design-setup" 
            onClick={designCustomSetup}
            variant="primary"
            icon={<Target size={20} />}
            iconPosition="left"
          >
            Design Custom Multi-Layer Setup
          </ActionButton>
        )}

        {customSetup && (
          <div className="custom-setup">
            <h4>Your Custom Custody Architecture</h4>
            <div className="setup-layers">
              <div className="layer">
                <span className="layer-type">Large Holdings (80%):</span>
                <span className="layer-method">{customSetup.primary.name}</span>
              </div>
              <div className="layer">
                <span className="layer-type">Long-term Storage (15%):</span>
                <span className="layer-method">{customSetup.secondary.name}</span>
              </div>
              <div className="layer">
                <span className="layer-type">Daily Spending (4%):</span>
                <span className="layer-method">{customSetup.spending.name}</span>
              </div>
              <div className="layer">
                <span className="layer-type">Emergency Access (1%):</span>
                <span className="layer-method">{customSetup.emergency.name}</span>
              </div>
            </div>
            <ContinueButton onClick={handleContinue}>
              <Crown size={20} />
              Engineer Self-Custody
            </ContinueButton>
                </div>
              )}
            </div>
    );
  };

  // Sovereignty Engineer Phase
  const SovereigntyEngineerPhase = () => {
    const [sovereigntySteps, setSovereigntySteps] = useState([
      { id: 'keys', title: 'Generate Cryptographically Secure Keys', completed: false },
      { id: 'backup', title: 'Create Distributed Backup System', completed: false },
      { id: 'multisig', title: 'Deploy Multisig Architecture', completed: false },
      { id: 'inheritance', title: 'Design Inheritance Protocol', completed: false },
      { id: 'verification', title: 'Verify Complete Independence', completed: false }
    ]);

    const completeStep = (stepId) => {
      setSovereigntySteps(prev => prev.map(step => 
        step.id === stepId ? { ...step, completed: true } : step
      ));
      setSovereigntyProgress(prev => prev + 20);
      addAchievement(
        'Sovereignty Step Complete',
        `Completed: ${sovereigntySteps.find(s => s.id === stepId).title}`,
        200
      );
    };

    const allStepsComplete = sovereigntySteps.every(step => step.completed);

    return (
      <div className="sovereignty-engineer-phase">
        <div className="phase-header">
          <h3>Build Your Financial Independence</h3>
          <p>Engineer complete self-custody infrastructure that eliminates all third-party dependencies.</p>
          <div className="sovereignty-progress">
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${sovereigntyProgress}%` }}></div>
        </div>
            <span>{sovereigntyProgress}% Financial Independence</span>
            </div>
          </div>

        <div className="sovereignty-steps">
          {sovereigntySteps.map((step, index) => (
            <div key={step.id} className={`sovereignty-step ${step.completed ? 'completed' : ''}`}>
              <div className="step-indicator">
                {step.completed ? <CheckCircle size={24} /> : <span>{index + 1}</span>}
            </div>
              <div className="step-content">
                <h4>{step.title}</h4>
                {!step.completed && (
                  <ActionButton 
                    className="complete-step-btn"
                    onClick={() => completeStep(step.id)}
                    variant="secondary"
                    size="small"
                  >
                    Complete Step
                  </ActionButton>
                )}
              </div>
            </div>
          ))}
            </div>

        {allStepsComplete && (
          <div className="sovereignty-achievement">
            <h4>🎉 Financial Sovereignty Achieved!</h4>
            <p>You now have complete control over your Bitcoin with no third-party dependencies.</p>
            <ContinueButton onClick={handleContinue}>
              <Zap size={20} />
              Design Emergency Protocols
            </ContinueButton>
          </div>
        )}
      </div>
    );
  };

  // Emergency Architect Phase
  const EmergencyArchitectPhase = () => {
    const [selectedEmergency, setSelectedEmergency] = useState(null);
    const [emergencyPlans, setEmergencyPlans] = useState([]);

    const createEmergencyPlan = (emergencyType) => {
      const plan = {
        id: emergencyType.id,
        type: emergencyType,
        protocols: [
          'Immediate access protocol activated',
          'Trusted contacts notified automatically',
          'Backup systems engaged',
          'Recovery procedures initiated'
        ],
        timeframe: emergencyType.urgency === 'critical' ? '24 hours' : 
                  emergencyType.urgency === 'high' ? '72 hours' : '1 week'
      };
      setEmergencyPlans(prev => [...prev, plan]);
      addAchievement(
        'Emergency Plan Created',
        `Designed protocol for ${emergencyType.title}`,
        150
      );
    };

    return (
      <div className="emergency-architect-phase">
        <div className="phase-header">
          <h3>Crisis-Proof Recovery Systems</h3>
          <p>Design comprehensive emergency plans for every possible custody crisis scenario.</p>
        </div>

        <div className="emergency-scenarios">
          {emergencyTypes.map((emergency, index) => (
            <div 
              key={emergency.id} 
              className={`emergency-card ${emergency.urgency}`}
              onClick={() => setSelectedEmergency(emergency)}
            >
              <div className="emergency-header">
                <h4>{emergency.title}</h4>
                <span className={`urgency-badge ${emergency.urgency}`}>
                  {emergency.urgency.toUpperCase()}
                </span>
        </div>
              <div className="emergency-actions">
                {!emergencyPlans.find(p => p.id === emergency.id) ? (
                  <ActionButton 
                    className="create-plan-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      createEmergencyPlan(emergency);
                    }}
                    variant="crisis"
                    size="small"
                  >
                    Create Emergency Plan
                  </ActionButton>
                ) : (
                  <div className="plan-created">
                    <CheckCircle size={16} />
                    Plan Created
                      </div>
                    )}
                  </div>
                </div>
          ))}
        </div>

        {emergencyPlans.length === emergencyTypes.length && (
          <div className="emergency-mastery">
            <h4>🛡️ Emergency Architect Mastery!</h4>
            <p>You've created comprehensive emergency plans for all crisis scenarios.</p>
            <ContinueButton onClick={handleContinue}>
              <Building size={20} />
              Command Institutional Scale
              <ArrowRight size={20} />
            </ContinueButton>
          </div>
        )}
      </div>
    );
  };

  // Scale Commander Phase
  const ScaleCommanderPhase = () => {
    const [institutionalSetups, setInstitutionalSetups] = useState([]);
    const [complianceLevel, setComplianceLevel] = useState(0);

    const institutionalSolutions = [
      {
        id: 'corporate-treasury',
        title: 'Corporate Treasury Management',
        scale: '$10M - $1B+',
        requirements: ['Board approval workflows', 'Multi-department signing', 'Audit compliance', 'Insurance protocols']
      },
      {
        id: 'fund-management',
        title: 'Investment Fund Custody',
        scale: '$100M - $10B+',
        requirements: ['Investor reporting', 'Regulatory compliance', 'Performance tracking', 'Risk management']
      },
      {
        id: 'bank-integration',
        title: 'Banking Institution Setup',
        scale: '$1B - $100B+',
        requirements: ['Central bank compliance', 'Customer custody', 'Liquidity management', 'Stress testing']
      }
    ];

    const deployInstitutionalSetup = (solution) => {
      setInstitutionalSetups(prev => [...prev, solution]);
      setComplianceLevel(prev => prev + 33.33);
      addAchievement(
        'Institutional Setup Deployed',
        `Mastered ${solution.title}`,
        300
      );
    };

        return (
      <div className="scale-commander-phase">
        <div className="phase-header">
          <h3>Institutional-Grade Custody Mastery</h3>
          <p>Command enterprise-level custody solutions for businesses and institutions.</p>
          <div className="compliance-meter">
            <div className="meter-bar">
              <div className="meter-fill" style={{ width: `${complianceLevel}%` }}></div>
            </div>
            <span>Compliance Level: {Math.round(complianceLevel)}%</span>
          </div>
            </div>

        <div className="institutional-solutions">
          {institutionalSolutions.map((solution, index) => (
            <div key={solution.id} className="solution-card">
              <h4>{solution.title}</h4>
              <div className="solution-scale">{solution.scale}</div>
              <div className="requirements">
                <h5>Key Requirements:</h5>
                <ul>
                  {solution.requirements.map((req, idx) => (
                    <li key={idx}>{req}</li>
                  ))}
                </ul>
              </div>
              {!institutionalSetups.find(s => s.id === solution.id) ? (
                <ActionButton 
                  className="deploy-btn"
                  onClick={() => deployInstitutionalSetup(solution)}
                  variant="primary"
                  size="small"
                >
                  Deploy Solution
                </ActionButton>
              ) : (
                <div className="deployed">
                  <CheckCircle size={16} />
                  Deployed
                </div>
              )}
                </div>
              ))}
            </div>

        {institutionalSetups.length === institutionalSolutions.length && (
          <ContinueButton onClick={handleContinue}>
            <Target size={20} />
            Achieve Custody Sovereignty
            <ArrowRight size={20} />
          </ContinueButton>
        )}
          </div>
        );
  };

  // Custody Sovereign Phase
  const CustodySovereignPhase = () => {
    const globalImpactMetrics = {
      personalSecurity: 100,
      familyProtection: 100,
      businessSolutions: 100,
      institutionalMastery: 100,
      globalInfluence: custodyScore / 50
    };

        return (
      <div className="custody-sovereign-phase">
        <div className="phase-header">
          <h3>🏆 Custody Sovereignty Achieved</h3>
          <p>You now command the complete spectrum of Bitcoin custody architecture.</p>
        </div>

        <div className="mastery-dashboard">
          <div className="achievement-summary">
            <h4>Your Custody Mastery</h4>
            <div className="mastery-metrics">
              <div className="metric-card">
                <h5>Personal Security</h5>
                <div className="metric-value">{globalImpactMetrics.personalSecurity}%</div>
                <p>Complete self-custody mastery</p>
                    </div>
              <div className="metric-card">
                <h5>Family Protection</h5>
                <div className="metric-value">{globalImpactMetrics.familyProtection}%</div>
                <p>Emergency & inheritance systems</p>
                  </div>
              <div className="metric-card">
                <h5>Business Solutions</h5>
                <div className="metric-value">{globalImpactMetrics.businessSolutions}%</div>
                <p>Corporate custody architecture</p>
                </div>
              <div className="metric-card">
                <h5>Institutional Mastery</h5>
                <div className="metric-value">{globalImpactMetrics.institutionalMastery}%</div>
                <p>Enterprise-grade solutions</p>
              </div>
            </div>
            </div>

          <div className="sovereignty-declaration">
            <h4>🎯 Sovereignty Declaration</h4>
            <div className="declaration-text">
              <p>You have achieved complete mastery over Bitcoin custody architecture. You can:</p>
              <ul>
                <li>✅ Protect personal wealth with unbreakable security</li>
                <li>✅ Design family inheritance systems that last generations</li>
                <li>✅ Architect business custody solutions for any scale</li>
                <li>✅ Command institutional-grade security protocols</li>
                <li>✅ Lead the global transition to self-sovereign finance</li>
          </ul>
            </div>

            <div className="final-score">
              <h5>Total Custody Score: {custodyScore.toLocaleString()}</h5>
              <p>Rank: Custody Sovereign 👑</p>
            </div>
          </div>
        </div>
          </div>
        );
  };

  const renderCurrentPhase = () => {
    switch (currentPhase) {
      case 'crisis-detective':
        return <CrisisDetectivePhase />;
      case 'risk-architect':
        return <RiskArchitectPhase />;
      case 'sovereignty-engineer':
        return <SovereigntyEngineerPhase />;
      case 'emergency-architect':
        return <EmergencyArchitectPhase />;
      case 'scale-commander':
        return <ScaleCommanderPhase />;
      case 'custody-sovereign':
        return <CustodySovereignPhase />;
      default:
        return <CrisisDetectivePhase />;
    }
  };

  return (
    <ModuleLayout
      title="Custody Crisis Architect"
      subtitle="Master Bitcoin Self-Custody Through Crisis-Driven Discovery"
      description="Transform from custody victim to sovereignty architect by learning from $50+ billion in real custody failures and building unbreakable security systems."
    >
    <div className="custody-module">
        {/* Achievement Popup */}
        {showAchievement && achievements.length > 0 && (
          <div className="achievement-popup">
            <div className="achievement-content">
              <Award size={24} />
              <div>
                <h4>{achievements[0].title}</h4>
                <p>{achievements[0].description}</p>
                <span className="points">+{achievements[0].points} points</span>
        </div>
            </div>
          </div>
        )}

        {/* Progress Header */}
        <div className="module-progress">
          <div className="progress-stats">
            <div className="stat">
              <span className="label">Custody Score:</span>
              <span className="value">{custodyScore.toLocaleString()}</span>
            </div>
            <div className="stat">
              <span className="label">Security Level:</span>
              <span className="value">{securityLevel}/10</span>
            </div>
            <div className="stat">
              <span className="label">Achievements:</span>
              <span className="value">{achievements.length}</span>
            </div>
          </div>
        </div>

        {/* Step Navigation */}
        <div className="step-navigation">
          {steps.map((step, index) => {
            const StepIcon = step.icon;
            const isActive = index === activeStep;
            const isCompleted = completedSteps.has(index);
            
            return (
              <div 
                key={step.id} 
                className={`step-tab ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
                style={{ '--step-color': step.color }}
              >
                <div className="step-icon">
                  <StepIcon size={20} />
            </div>
                <div className="step-info">
                  <h4>{step.title}</h4>
                  <p>{step.subtitle}</p>
        </div>
                {isCompleted && (
                  <div className="completion-badge">
                    <CheckCircle size={16} />
        </div>
                )}
        </div>
            );
          })}
      </div>

        {/* Current Phase Content */}
        <div className="phase-content">
          {renderCurrentPhase()}
    </div>
      </div>
    </ModuleLayout>
  );
};

export default CustodyModule; 