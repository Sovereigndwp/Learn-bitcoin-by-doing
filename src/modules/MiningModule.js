import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '../contexts/ProgressContext';
import { Zap, Hammer, CheckCircle, Trophy, Target, Clock, Shield, Globe, TrendingUp, Power, Battery, Cpu, Network, DollarSign, Leaf, Users, BarChart3, Award, Lightbulb, ChevronLeft, ChevronRight, AlertTriangle, Eye, EyeOff, Flame, Bolt, Factory, Recycle, Banknote, Calculator, ArrowRight } from 'lucide-react';
import { 
  ContinueButton, 
  ActionButton, 
  Button, 
  OptionButton,
  NavigationButton 
} from '../components/EnhancedButtons';
import '../components/ModuleCommon.css';
import './MiningModule.css';

const MiningModule = () => {
  const { completeModule, isModuleCompleted } = useProgress();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(new Set());
  const [userInsights, setUserInsights] = useState({});

  // Energy Alchemist Journey Steps
  const alchemySteps = [
    {
      id: "energy_crisis_detective",
      title: "⚡ Energy Crisis Detective",
      subtitle: "Discover how traditional money wastes massive energy hiding corruption...",
      component: EnergyCrisisDetectiveStep
    },
    {
      id: "electricity_alchemy_lab", 
      title: "🧪 Electricity Alchemy Lab",
      subtitle: "Transform raw electrical power into unbreakable mathematical proof",
      component: ElectricityAlchemyLabStep
    },
    {
      id: "economic_attack_simulator",
      title: "💰 Economic Attack Simulator", 
      subtitle: "Try to attack Bitcoin and discover why it's financially impossible",
      component: EconomicAttackSimulatorStep
    },
    {
      id: "difficulty_master_control",
      title: "🎯 Difficulty Master Control",
      subtitle: "Command Bitcoin's self-adjusting security heartbeat mechanism", 
      component: DifficultyMasterControlStep
    },
    {
      id: "clean_energy_pioneer",
      title: "🌱 Clean Energy Pioneer",
      subtitle: "Lead the renewable energy revolution powered by Bitcoin mining",
      component: CleanEnergyPioneerStep
    },
    {
      id: "global_security_guardian",
      title: "🌍 Global Security Guardian", 
      subtitle: "Join the worldwide distributed network defending digital sovereignty",
      component: GlobalSecurityGuardianStep
    }
  ];

  const handleStepComplete = (stepIndex, insights = {}) => {
    setCompletedSteps(prev => {
      const newCompleted = new Set(prev);
      newCompleted.add(stepIndex);
      return newCompleted;
    });
    
    if (insights) {
      setUserInsights(prev => ({ ...prev, [stepIndex]: insights }));
    }
    
    // Alchemy progression achievements
    const achievements = [
      { title: "Energy Crisis Awakened", description: "You see through monetary energy waste!" },
      { title: "Electricity Alchemist", description: "You've mastered energy transformation!" },
      { title: "Attack Simulator Expert", description: "You understand Bitcoin's invincibility!" },
      { title: "Difficulty Master", description: "You control the heartbeat of security!" },
      { title: "Clean Energy Pioneer", description: "You're leading the energy revolution!" },
      { title: "Global Security Guardian", description: "You're protecting digital sovereignty!" }
    ];
    
    if (achievements[stepIndex]) {
      showAlchemyAchievement(achievements[stepIndex].title, achievements[stepIndex].description);
    }
    
    // Auto-advance after brief celebration
    if (stepIndex < alchemySteps.length - 1) {
      setTimeout(() => {
        setCurrentStep(stepIndex + 1);
      }, 1800);
    } else {
      // Module complete! Navigate to Keys Module
      completeModule('mining');
      setTimeout(() => {
        navigate('/module/keys');
      }, 3000);
    }
  };

  const showAlchemyAchievement = (title, description) => {
    const achievement = document.createElement('div');
    achievement.className = 'alchemy-achievement-popup';
    achievement.innerHTML = `
      <div class="alchemy-achievement-content">
        <div class="alchemy-achievement-icon">⚡</div>
        <div class="alchemy-achievement-text">
          <h4>${title}</h4>
          <p>${description}</p>
        </div>
      </div>
    `;
    document.body.appendChild(achievement);
    
    setTimeout(() => {
      achievement.style.opacity = '0';
      setTimeout(() => {
        document.body.removeChild(achievement);
      }, 400);
    }, 3200);
  };

  const currentStepData = alchemySteps[currentStep];
  const StepComponent = currentStepData.component;

  return (
    <div className="mining-module">
      <div className="module-header">
        <div className="alchemy-progress">
          <div className="progress-indicators">
            {alchemySteps.map((_, index) => (
              <div 
                key={index}
                className={`progress-flame ${currentStep === index ? 'active' : ''} ${completedSteps.has(index) ? 'completed' : ''}`}
              />
            ))}
          </div>
          <span className="progress-text">Alchemy Step {currentStep + 1} of {alchemySteps.length}</span>
        </div>
        
        <div className="step-header">
          <h1>{currentStepData.title}</h1>
          <p className="step-subtitle">{currentStepData.subtitle}</p>
        </div>
      </div>

      <div className="step-container">
        <StepComponent 
          onComplete={(insights) => handleStepComplete(currentStep, insights)}
          userInsights={userInsights}
          stepIndex={currentStep}
        />
      </div>

      {/* Alchemy Progress Summary */}
      <div className="alchemy-summary">
        <div className="mastery-count">
          {completedSteps.size} / {alchemySteps.length} energy transformations mastered
        </div>
        <div className="insight-indicator">
          {Object.keys(userInsights).length > 0 && (
            <span>🔥 Energy alchemy mastery building...</span>
          )}
        </div>
      </div>
    </div>
  );
};

// ⚡ Step 1: Energy Crisis Detective
const EnergyCrisisDetectiveStep = ({ onComplete, userInsights, stepIndex }) => {
  const [selectedCrisis, setSelectedCrisis] = useState(null);
  const [showRevelation, setShowRevelation] = useState(false);

  const energyCrises = [
    {
      id: 'bank_infrastructure',
      title: '🏛️ Banking Infrastructure Energy Waste',
      problem: 'Global banking system consumes 270 TWh annually',
      details: 'Bank branches, ATMs, data centers, payment processors, regulatory compliance systems',
      hiddenCost: 'Energy spent maintaining trust through institutions and surveillance',
      revelation: 'This massive energy expense still allows corruption, inflation, and control'
    },
    {
      id: 'currency_printing',
      title: '💸 Currency Printing & Distribution',
      problem: 'Physical cash production, transport, security, destruction cycles',
      details: 'Printing facilities, armored trucks, vaults, currency replacement every few years',
      hiddenCost: 'Energy wasted on money that loses value through inflation',
      revelation: 'All this energy spent on money that can be printed into worthlessness'
    },
    {
      id: 'financial_surveillance',
      title: '👁️ Financial Surveillance Systems',
      problem: 'Government monitoring of every financial transaction',
      details: 'NSA data centers, compliance systems, Know Your Customer infrastructure',
      hiddenCost: 'Energy spent violating privacy while enabling monetary control',
      revelation: 'Massive energy consumption to monitor and control your money'
    }
  ];

  const handleCrisisInvestigation = (crisis) => {
    setSelectedCrisis(crisis);
    setTimeout(() => setShowRevelation(true), 2000);
  };

  const handleDiscoveryComplete = () => {
    const insights = {
      investigatedCrisis: selectedCrisis?.id,
      realizationLevel: showRevelation ? 'full' : 'partial'
    };
    onComplete(insights);
  };

  return (
    <div className="energy-crisis-detective">
      <div className="detective-briefing">
        <h2>🕵️ Your Mission: Investigate Global Energy Waste</h2>
        <div className="mission-context">
          <p className="urgency-text">
            The current monetary system burns enormous amounts of energy maintaining corruption and control. 
            Your investigation will reveal the hidden truth about where this energy really goes...
          </p>
        </div>
        
        <div className="stakes-reminder">
          <strong>Personal Stakes:</strong> Understanding this energy waste helps you see why Bitcoin's energy use 
          creates incorruptible money that protects your wealth from inflation and control.
        </div>
      </div>

      <div className="crisis-investigation-grid">
        <h3>🔍 Choose Your Investigation Target:</h3>
        {energyCrises.map((crisis) => (
          <div 
            key={crisis.id}
            className={`crisis-card ${selectedCrisis?.id === crisis.id ? 'investigating' : ''}`}
            onClick={() => handleCrisisInvestigation(crisis)}
          >
            <div className="crisis-header">
              <h4>{crisis.title}</h4>
              {selectedCrisis?.id === crisis.id && <div className="investigating-badge">🔍 INVESTIGATING</div>}
            </div>
            <div className="crisis-problem">{crisis.problem}</div>
            
            {selectedCrisis?.id === crisis.id && (
              <div className="investigation-details">
                <div className="evidence-section">
                  <strong>Evidence Found:</strong>
                  <p>{crisis.details}</p>
                </div>
                <div className="hidden-cost">
                  <strong>Hidden Energy Cost:</strong>
                  <p>{crisis.hiddenCost}</p>
                </div>
                
                {showRevelation && (
                  <div className="shocking-revelation">
                    <strong>🚨 Shocking Discovery:</strong>
                    <p className="revelation-text">{crisis.revelation}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {showRevelation && (
        <div className="detective-conclusion">
          <div className="conclusion-header">
            <h3>🎯 Investigation Complete: The Energy Scandal Exposed</h3>
          </div>
          
          <div className="scandal-summary">
            <p>
              The traditional monetary system wastes <strong>hundreds of terawatt-hours annually</strong> maintaining 
              institutions that still allow corruption, inflation, and financial surveillance.
            </p>
            
            <div className="bitcoin-contrast">
              <strong>Bitcoin's Revolutionary Approach:</strong>
              <p>
                Transform this same energy into <strong>mathematical proof</strong> that eliminates 
                human trust, prevents corruption, and protects your wealth automatically.
              </p>
            </div>
          </div>

          <ActionButton
            variant="primary"
            onClick={handleDiscoveryComplete}
            className="discovery-complete-button"
          >
            Discover Energy Alchemy Solution ⚡
          </ActionButton>
        </div>
      )}
    </div>
  );
};

// 🧪 Step 2: Electricity Alchemy Lab  
const ElectricityAlchemyLabStep = ({ onComplete, userInsights, stepIndex }) => {
  const [selectedExperiment, setSelectedExperiment] = useState(null);
  const [alchemyState, setAlchemyState] = useState('selecting'); // selecting, transforming, proof_created
  const [energyInput, setEnergyInput] = useState(100);
  const [computationWork, setComputationWork] = useState(0);
  const [mathematicalProof, setMathematicalProof] = useState(null);

  const alchemyExperiments = [
    {
      id: 'beginner_alchemy',
      title: '🔰 Beginner Energy Alchemy',
      energyRequired: 100,
      difficulty: '0000',
      description: 'Transform 100 kWh into mathematical proof with 4 zeros',
      securityLevel: 'Local Security',
      realWorldEquivalent: 'Securing a small payment'
    },
    {
      id: 'advanced_alchemy',
      title: '⚡ Advanced Energy Alchemy', 
      energyRequired: 1000,
      difficulty: '00000',
      description: 'Transform 1,000 kWh into stronger proof with 5 zeros',
      securityLevel: 'Regional Security',
      realWorldEquivalent: 'Securing significant transactions'
    },
    {
      id: 'master_alchemy',
      title: '🔥 Master Energy Alchemy',
      energyRequired: 10000,
      difficulty: '000000', 
      description: 'Transform 10,000 kWh into maximum proof with 6 zeros',
      securityLevel: 'Global Security',
      realWorldEquivalent: 'Securing institutional-level value'
    }
  ];

  const startAlchemyExperiment = (experiment) => {
    setSelectedExperiment(experiment);
    setEnergyInput(experiment.energyRequired);
    setAlchemyState('transforming');
    setComputationWork(0);
    setMathematicalProof(null);

    // Simulate the energy → proof transformation
    performEnergyAlchemy(experiment);
  };

  const performEnergyAlchemy = (experiment) => {
    const interval = setInterval(() => {
      setComputationWork(prev => {
        const increment = Math.floor(Math.random() * 1000000);
        const newWork = prev + increment;
        
        // Check if transformation is complete (based on difficulty)
        const targetWork = experiment.energyRequired * 1000000;
        if (newWork >= targetWork) {
          clearInterval(interval);
          
          // Create mathematical proof
          const proof = {
            hash: '0'.repeat(experiment.difficulty.length) + Math.random().toString(36).substring(7),
            energyTransformed: experiment.energyRequired,
            computationPerformed: newWork,
            securityCreated: `${experiment.securityLevel} - ${experiment.realWorldEquivalent}`,
            proofStrength: experiment.difficulty.length
          };
          
          setMathematicalProof(proof);
          setAlchemyState('proof_created');
          
          return newWork;
        }
        
        return newWork;
      });
    }, 150);
  };

  const handleAlchemyMastery = () => {
    const insights = {
      experimentCompleted: selectedExperiment?.id,
      energyTransformed: energyInput,
      proofCreated: mathematicalProof?.hash,
      alchemyLevel: selectedExperiment?.title
    };
    onComplete(insights);
  };

  return (
    <div className="electricity-alchemy-lab">
      <div className="lab-introduction">
        <h2>🧪 Welcome to the Energy Alchemy Laboratory</h2>
        <div className="alchemy-concept">
          <p className="concept-text">
            You're about to perform real alchemy: transforming raw electrical energy into 
            unbreakable mathematical proof that secures digital money without requiring human trust.
          </p>
          
          <div className="transformation-formula">
            <span className="formula-element">Electrical Energy</span>
            <span className="formula-arrow">→</span>
            <span className="formula-element">Computational Work</span>
            <span className="formula-arrow">→</span>
            <span className="formula-element">Mathematical Proof</span>
            <span className="formula-arrow">→</span>
            <span className="formula-element">Digital Security</span>
          </div>
        </div>
      </div>

      {alchemyState === 'selecting' && (
        <div className="experiment-selection">
          <h3>⚗️ Choose Your Alchemy Experiment:</h3>
          <div className="experiment-grid">
            {alchemyExperiments.map((experiment) => (
              <div key={experiment.id} className="experiment-card">
                <div className="experiment-header">
                  <h4>{experiment.title}</h4>
                  <div className="energy-requirement">⚡ {experiment.energyRequired} kWh</div>
                </div>
                
                <div className="experiment-details">
                  <div className="description">{experiment.description}</div>
                  <div className="difficulty-display">
                    Target Hash: <code>{experiment.difficulty}...</code>
                  </div>
                  <div className="security-level">{experiment.securityLevel}</div>
                  <div className="real-world">{experiment.realWorldEquivalent}</div>
                </div>
                
                <ActionButton
                  variant="primary"
                  onClick={() => startAlchemyExperiment(experiment)}
                  className="start-alchemy-button"
                >
                  Begin Transformation ⚡
                </ActionButton>
              </div>
            ))}
          </div>
        </div>
      )}

      {alchemyState === 'transforming' && selectedExperiment && (
        <div className="alchemy-in-progress">
          <h3>🔥 Energy Transformation in Progress</h3>
          
          <div className="transformation-visualization">
            <div className="energy-input-display">
              <Zap className="energy-icon" />
              <div className="energy-stats">
                <div className="stat-label">Energy Input</div>
                <div className="stat-value">{energyInput} kWh</div>
              </div>
            </div>
            
            <div className="transformation-arrows">
              <div className="arrow-with-work">
                <ArrowRight className="transformation-arrow" />
                <div className="work-display">Computing...</div>
              </div>
            </div>
            
            <div className="computation-display">
              <Cpu className="computation-icon" />
              <div className="computation-stats">
                <div className="stat-label">Computation Work</div>
                <div className="stat-value">{computationWork.toLocaleString()} hashes</div>
              </div>
            </div>
          </div>
          
          <div className="alchemy-status">
            <div className="status-text">Transforming electrical energy into mathematical proof...</div>
            <div className="target-info">
              Searching for hash starting with: <code>{selectedExperiment.difficulty}</code>
            </div>
          </div>
        </div>
      )}

      {alchemyState === 'proof_created' && mathematicalProof && (
        <div className="proof-creation-success">
          <h3>🎉 Energy Alchemy Successful!</h3>
          
          <div className="proof-display">
            <div className="proof-header">
              <Trophy className="proof-icon" />
              <h4>Mathematical Proof Created</h4>
            </div>
            
            <div className="proof-details">
              <div className="proof-hash">
                <strong>Proof Hash:</strong>
                <code className="hash-display">{mathematicalProof.hash}</code>
              </div>
              
              <div className="transformation-summary">
                <div className="summary-stat">
                  <span className="stat-label">Energy Transformed:</span>
                  <span className="stat-value">{mathematicalProof.energyTransformed} kWh</span>
                </div>
                <div className="summary-stat">
                  <span className="stat-label">Computation Performed:</span>
                  <span className="stat-value">{mathematicalProof.computationPerformed.toLocaleString()} hashes</span>
                </div>
                <div className="summary-stat">
                  <span className="stat-label">Security Created:</span>
                  <span className="stat-value">{mathematicalProof.securityCreated}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="alchemy-revelation">
            <h4>🧠 Alchemical Revelation:</h4>
            <p>
              You've just performed the same process that secures Bitcoin! This mathematical proof 
              is <strong>unforgeable</strong> - anyone can verify it required real energy to create, 
              but no one can fake it without doing the work.
            </p>
            
            <div className="bitcoin-connection">
              <strong>In Bitcoin:</strong> Miners worldwide perform this exact transformation 24/7, 
              turning electricity into mathematical proofs that secure your digital wealth.
            </div>
          </div>

          <ActionButton
            variant="success"
            onClick={handleAlchemyMastery}
            className="mastery-complete-button"
          >
            Master the Attack Simulator 💰
          </ActionButton>
        </div>
      )}
    </div>
  );
};

// 💰 Step 3: Economic Attack Simulator
const EconomicAttackSimulatorStep = ({ onComplete, userInsights, stepIndex }) => {
  const [selectedAttack, setSelectedAttack] = useState(null);
  const [attackPhase, setAttackPhase] = useState('planning'); // planning, calculating, failed
  const [attackCalculations, setAttackCalculations] = useState(null);
  const [realizationLevel, setRealizationLevel] = useState(0);

  const attackScenarios = [
    {
      id: '51_percent_attack',
      title: '⚔️ 51% Attack on Bitcoin',
      description: 'Attempt to control majority of mining power to rewrite transactions',
      requirements: {
        hashratePortion: '51% of global network',
        hardwareNeeded: '2.3 million ASIC miners',
        electricityCost: '$75 million per day',
        hardwareCost: '$23 billion', 
        timeToAcquire: '2+ years (supply constraints)',
        additionalChallenges: 'Must remain undetected while acquiring hardware'
      },
      economicReality: {
        profitability: 'Massive losses - hardware becomes worthless if attack succeeds',
        detection: 'Network would detect and respond immediately',
        countermeasures: 'Users would switch to different chain, making hardware worthless',
        opportunity_cost: 'Same resources could earn $40+ million daily mining honestly'
      }
    },
    {
      id: 'banking_attack',
      title: '🏛️ Attack Traditional Bank',
      description: 'Compare: How much does it cost to compromise a major bank?',
      requirements: {
        approach: 'Cyber attack, insider threat, or physical breach',
        cost: '$1-10 million (estimated)',
        time: 'Weeks to months',
        detection: 'Often undetected for months',
        success_rate: 'Thousands successful per year'
      },
      economicReality: {
        profitability: 'Highly profitable - billions stolen annually',
        consequences: 'Bank insurance covers losses, taxpayers pay',
        accountability: 'Executives rarely prosecuted',
        systemic_risk: 'Can trigger financial crises affecting millions'
      }
    },
    {
      id: 'gold_vault_attack',
      title: '🏴‍☠️ Attack Gold Vault',
      description: 'Physical theft from Fort Knox or major gold repository',
      requirements: {
        approach: 'Complex heist requiring inside knowledge',
        cost: '$50-100 million (estimated)',
        time: 'Years of planning',
        success_examples: 'Multiple successful gold heists in history',
        physical_challenges: 'Security guards, alarms, but still possible'
      },
      economicReality: {
        profitability: 'Potentially very profitable',
        precedent: 'Many successful gold thefts throughout history',
        resale: 'Gold can be melted down and sold globally',
        investigation: 'Physical evidence makes investigation possible'
      }
    }
  ];

  const calculateAttackEconomics = (attack) => {
    setSelectedAttack(attack);
    setAttackPhase('calculating');
    
    // Simulate calculation process
    setTimeout(() => {
      const calculations = {
        scenario: attack.id,
        totalCost: attack.id === '51_percent_attack' ? 23075000000 : // $23.075 billion
                   attack.id === 'banking_attack' ? 5500000 : // $5.5 million average
                   75000000, // $75 million for gold vault
        dailyOperatingCost: attack.id === '51_percent_attack' ? 75000000 : 0,
        successProbability: attack.id === '51_percent_attack' ? 0.001 : // 0.1%
                           attack.id === 'banking_attack' ? 0.15 : // 15%
                           0.05, // 5%
        expectedLoss: 0, // Will calculate
        timeToExecution: attack.id === '51_percent_attack' ? 730 : // 2 years
                        attack.id === 'banking_attack' ? 120 : // 4 months  
                        365 // 1 year
      };
      
      // Calculate expected loss (negative expected value)
      calculations.expectedLoss = calculations.totalCost * (1 - calculations.successProbability);
      
      setAttackCalculations(calculations);
      setAttackPhase('failed');
      
      // Progressive realization
      let realization = 0;
      const realizationInterval = setInterval(() => {
        realization += 20;
        setRealizationLevel(realization);
        if (realization >= 100) {
          clearInterval(realizationInterval);
        }
      }, 800);
      
    }, 3000);
  };

  const handleAttackRealization = () => {
    const insights = {
      attackAttempted: selectedAttack?.id,
      economicRealization: realizationLevel,
      calculatedLoss: attackCalculations?.expectedLoss,
      securityAppreciation: 'bitcoin_invincibility_understood'
    };
    onComplete(insights);
  };

  return (
    <div className="economic-attack-simulator">
      <div className="simulator-briefing">
        <h2>💰 Economic Attack Simulator</h2>
        <div className="challenge-setup">
          <p className="challenge-text">
            You're now an attacker with unlimited resources. Your goal: break the security 
            of different monetary systems to steal value. Let's calculate the real economics...
          </p>
          
          <div className="personal-stakes">
            <strong>Why This Matters:</strong> Understanding attack economics helps you choose 
            the most secure system to protect your wealth from theft and manipulation.
          </div>
        </div>
      </div>

      {attackPhase === 'planning' && (
        <div className="attack-planning">
          <h3>🎯 Choose Your Attack Target:</h3>
          <div className="attack-scenarios">
            {attackScenarios.map((attack) => (
              <div 
                key={attack.id} 
                className="attack-card"
                onClick={() => calculateAttackEconomics(attack)}
              >
                <div className="attack-header">
                  <h4>{attack.title}</h4>
                </div>
                
                <div className="attack-description">
                  {attack.description}
                </div>
                
                <div className="requirements-preview">
                  <strong>Initial Assessment:</strong>
                  <ul>
                    <li>Cost: {attack.requirements.cost || attack.requirements.hardwareCost}</li>
                    <li>Time: {attack.requirements.time || attack.requirements.timeToAcquire}</li>
                    <li>Complexity: {attack.id === '51_percent_attack' ? 'Extreme' : attack.id === 'banking_attack' ? 'Medium' : 'High'}</li>
                  </ul>
                </div>
                
                <ActionButton
                  variant="danger"
                  className="plan-attack-button"
                >
                  Calculate Attack Economics 📊
                </ActionButton>
              </div>
            ))}
          </div>
        </div>
      )}

      {attackPhase === 'calculating' && (
        <div className="attack-calculation">
          <h3>📊 Running Economic Attack Analysis...</h3>
          
          <div className="calculation-visualization">
            <div className="calculation-steps">
              <div className="calc-step">💰 Calculating total investment required...</div>
              <div className="calc-step">⚡ Computing ongoing operational costs...</div>
              <div className="calc-step">🎯 Assessing success probability...</div>
              <div className="calc-step">📈 Analyzing expected return...</div>
              <div className="calc-step">⚠️ Factoring in counter-measures...</div>
            </div>
            
            <div className="calculation-progress">
              <div className="progress-bar">
                <div className="progress-fill calculating"></div>
              </div>
              <div className="progress-text">Economic analysis in progress...</div>
            </div>
          </div>
        </div>
      )}

      {attackPhase === 'failed' && attackCalculations && (
        <div className="attack-results">
          <h3>📊 Attack Economics Analysis Complete</h3>
          
          <div className="attack-summary">
            <div className="attack-target">
              <h4>{selectedAttack.title}</h4>
              <div className="target-description">{selectedAttack.description}</div>
            </div>
            
            <div className="economic-breakdown">
              <div className="cost-analysis">
                <h5>💸 Financial Requirements</h5>
                <div className="cost-details">
                  <div className="cost-item">
                    <span className="cost-label">Total Investment:</span>
                    <span className="cost-value">${attackCalculations.totalCost.toLocaleString()}</span>
                  </div>
                  {attackCalculations.dailyOperatingCost > 0 && (
                    <div className="cost-item">
                      <span className="cost-label">Daily Operating Cost:</span>
                      <span className="cost-value">${attackCalculations.dailyOperatingCost.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="cost-item">
                    <span className="cost-label">Time to Execute:</span>
                    <span className="cost-value">{attackCalculations.timeToExecution} days</span>
                  </div>
                  <div className="cost-item">
                    <span className="cost-label">Success Probability:</span>
                    <span className="cost-value">{(attackCalculations.successProbability * 100).toFixed(1)}%</span>
                  </div>
                </div>
              </div>
              
              <div className="expected-outcome">
                <h5>📈 Expected Outcome</h5>
                <div className="outcome-result">
                  <div className="expected-loss">
                    <strong>Expected Loss:</strong>
                    <span className="loss-amount">${attackCalculations.expectedLoss.toLocaleString()}</span>
                  </div>
                  
                  {realizationLevel >= 20 && (
                    <div className="realization-1">
                      <strong>Realization #1:</strong> This attack would lose massive amounts of money
                    </div>
                  )}
                  
                  {realizationLevel >= 40 && (
                    <div className="realization-2">
                      <strong>Realization #2:</strong> {selectedAttack.id === '51_percent_attack' ? 
                        'Even if successful, the attack makes Bitcoin worthless - destroying your investment' :
                        'Traditional systems are much easier and cheaper to attack'}
                    </div>
                  )}
                  
                  {realizationLevel >= 60 && (
                    <div className="realization-3">
                      <strong>Realization #3:</strong> {selectedAttack.id === '51_percent_attack' ? 
                        'Same resources could earn $40+ million daily mining honestly' :
                        'These attacks happen regularly with actual success'}
                    </div>
                  )}
                  
                  {realizationLevel >= 80 && (
                    <div className="realization-4">
                      <strong>Realization #4:</strong> {selectedAttack.id === '51_percent_attack' ? 
                        'Bitcoin\'s security gets stronger as more energy is invested' :
                        'Physical and institutional systems have fundamental vulnerabilities'}
                    </div>
                  )}
                  
                  {realizationLevel >= 100 && (
                    <div className="final-realization">
                      <h5>🧠 Ultimate Realization:</h5>
                      <div className="ultimate-insight">
                        {selectedAttack.id === '51_percent_attack' ? (
                          <p>
                            <strong>Bitcoin is economically invincible.</strong> The same incentive structure that 
                            makes attacks impossibly expensive also rewards honest participation massively. 
                            It's cheaper and more profitable to secure the network than attack it.
                          </p>
                        ) : (
                          <p>
                            <strong>Traditional systems remain vulnerable.</strong> Banks get hacked regularly, 
                            gold vaults can be robbed, but Bitcoin has never been successfully attacked 
                            despite billions in bounties for finding vulnerabilities.
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {realizationLevel >= 100 && (
            <div className="security-conclusion">
              <h4>🛡️ Security Economics Lesson Complete</h4>
              <div className="lesson-summary">
                <p>
                  You've discovered the economic foundation of security: Bitcoin's design makes 
                  honest participation always more profitable than attacking the network. 
                  This creates a self-reinforcing security system that gets stronger over time.
                </p>
              </div>

              <ActionButton
                variant="success"
                onClick={handleAttackRealization}
                className="realization-complete-button"
              >
                Master Difficulty Control 🎯
              </ActionButton>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// 🎯 Step 4: Difficulty Master Control
const DifficultyMasterControlStep = ({ onComplete, userInsights, stepIndex }) => {
  const [controlPhase, setControlPhase] = useState('learning'); // learning, simulation, mastery
  const [networkState, setNetworkState] = useState({
    currentHashrate: 450, // EH/s
    targetBlockTime: 600, // 10 minutes in seconds
    actualBlockTime: 600,
    difficulty: 62460000000000,
    blocksUntilAdjustment: 2016,
    adjustmentDirection: 'stable'
  });
  const [simulationResults, setSimulationResults] = useState([]);
  const [userUnderstanding, setUserUnderstanding] = useState(0);

  const difficultyScenarios = [
    {
      id: 'hashrate_surge',
      title: '📈 Massive Hashrate Surge',
      description: 'Simulate China adding 50% more mining power overnight',
      hashrateChange: 1.5, // 50% increase
      expectedEffect: 'Blocks come faster temporarily, then difficulty adjusts up'
    },
    {
      id: 'hashrate_crash',
      title: '📉 Mining Exodus Event', 
      description: 'Simulate 40% of miners suddenly going offline',
      hashrateChange: 0.6, // 40% decrease
      expectedEffect: 'Blocks slow down temporarily, then difficulty adjusts down'
    },
    {
      id: 'gradual_growth',
      title: '📊 Steady Network Growth',
      description: 'Simulate gradual 20% hashrate increase over time',
      hashrateChange: 1.2, // 20% increase
      expectedEffect: 'Slight block time reduction, smooth difficulty adjustment'
    }
  ];

  const runDifficultySimulation = (scenario) => {
    setControlPhase('simulation');
    
    // Simulate the difficulty adjustment process
    const newHashrate = networkState.currentHashrate * scenario.hashrateChange;
    const newBlockTime = networkState.targetBlockTime / scenario.hashrateChange;
    
    // Simulate blocks being mined with new hashrate
    const simulationSteps = [];
    let currentDifficulty = networkState.difficulty;
    let currentBlockTime = newBlockTime;
    let blocksRemaining = 2016;
    
    for (let week = 1; week <= 4; week++) {
      if (week === 3) {
        // Difficulty adjustment happens
        const timeRatio = currentBlockTime / networkState.targetBlockTime;
        currentDifficulty = currentDifficulty / timeRatio;
        currentBlockTime = networkState.targetBlockTime; // Back to 10 minutes
        blocksRemaining = 2016; // Reset counter
      }
      
      simulationSteps.push({
        week,
        hashrate: newHashrate,
        blockTime: currentBlockTime,
        difficulty: currentDifficulty,
        status: week < 3 ? 'Accumulating data...' : 'Difficulty adjusted!'
      });
    }
    
    setSimulationResults(simulationSteps);
    
    // Simulate understanding progression
    let understanding = 0;
    const understandingInterval = setInterval(() => {
      understanding += 25;
      setUserUnderstanding(understanding);
      if (understanding >= 100) {
        clearInterval(understandingInterval);
        setControlPhase('mastery');
      }
    }, 1500);
  };

  const handleDifficultyMastery = () => {
    const insights = {
      scenarioTested: simulationResults[0]?.status,
      understandingLevel: userUnderstanding,
      difficultyGrasped: 'automatic_security_adjustment',
      heartbeatControl: 'mastered'
    };
    onComplete(insights);
  };

  return (
    <div className="difficulty-master-control">
      <div className="control-introduction">
        <h2>🎯 Difficulty Master Control Center</h2>
        <div className="master-concept">
          <p className="concept-text">
            You're now in control of Bitcoin's "heartbeat" - the difficulty adjustment that 
            keeps blocks coming every 10 minutes no matter how many miners join or leave the network.
          </p>
          
          <div className="heartbeat-visual">
            <div className="heartbeat-rhythm">
              <span className="beat">💗</span>
              <span className="beat-time">10 min</span>
              <span className="beat">💗</span>
              <span className="beat-time">10 min</span>
              <span className="beat">💗</span>
              <span className="beat-time">10 min</span>
            </div>
            <div className="rhythm-description">Bitcoin's Perfect 10-Minute Heartbeat</div>
          </div>
        </div>
      </div>

      {controlPhase === 'learning' && (
        <div className="difficulty-education">
          <h3>📚 Master the Difficulty Control Mechanism</h3>
          
          <div className="mechanism-explanation">
            <div className="adjustment-process">
              <h4>🔄 How Automatic Adjustment Works:</h4>
              <div className="process-steps">
                <div className="process-step">
                  <div className="step-number">1</div>
                  <div className="step-content">
                    <strong>Monitoring:</strong> Network tracks actual time for last 2,016 blocks
                  </div>
                </div>
                <div className="process-step">
                  <div className="step-number">2</div>
                  <div className="step-content">
                    <strong>Calculation:</strong> Compares actual time vs target (20,160 minutes)
                  </div>
                </div>
                <div className="process-step">
                  <div className="step-number">3</div>
                  <div className="step-content">
                    <strong>Adjustment:</strong> Increases difficulty if blocks too fast, decreases if too slow
                  </div>
                </div>
                <div className="process-step">
                  <div className="step-number">4</div>
                  <div className="step-content">
                    <strong>Result:</strong> Block time returns to ~10 minutes automatically
                  </div>
                </div>
              </div>
            </div>
            
            <div className="current-network-stats">
              <h4>📊 Current Network State:</h4>
              <div className="stats-grid">
                <div className="stat-item">
                  <span className="stat-label">Global Hashrate:</span>
                  <span className="stat-value">{networkState.currentHashrate} EH/s</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Current Difficulty:</span>
                  <span className="stat-value">{(networkState.difficulty / 1000000000000).toFixed(1)}T</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Target Block Time:</span>
                  <span className="stat-value">10 minutes</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Blocks Until Adjustment:</span>
                  <span className="stat-value">{networkState.blocksUntilAdjustment}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="simulation-challenge">
            <h4>🎮 Ready to Test Your Control?</h4>
            <p>Choose a scenario to simulate and watch how Bitcoin automatically maintains its heartbeat:</p>
            
            <div className="scenario-grid">
              {difficultyScenarios.map((scenario) => (
                <div key={scenario.id} className="scenario-card">
                  <div className="scenario-header">
                    <h5>{scenario.title}</h5>
                  </div>
                  
                  <div className="scenario-description">
                    {scenario.description}
                  </div>
                  
                  <div className="expected-effect">
                    <strong>Expected:</strong> {scenario.expectedEffect}
                  </div>
                  
                  <ActionButton
                    variant="primary"
                    onClick={() => runDifficultySimulation(scenario)}
                    className="simulate-button"
                  >
                    Run Simulation 🚀
                  </ActionButton>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {controlPhase === 'simulation' && (
        <div className="difficulty-simulation">
          <h3>⚡ Difficulty Adjustment Simulation in Progress</h3>
          
          <div className="simulation-timeline">
            {simulationResults.map((step, index) => (
              <div key={index} className={`timeline-step ${userUnderstanding >= (index + 1) * 25 ? 'revealed' : ''}`}>
                <div className="step-week">Week {step.week}</div>
                <div className="step-metrics">
                  <div className="metric">
                    <span className="metric-label">Hashrate:</span>
                    <span className="metric-value">{step.hashrate.toFixed(0)} EH/s</span>
                  </div>
                  <div className="metric">
                    <span className="metric-label">Block Time:</span>
                    <span className="metric-value">{(step.blockTime / 60).toFixed(1)} min</span>
                  </div>
                  <div className="metric">
                    <span className="metric-label">Difficulty:</span>
                    <span className="metric-value">{(step.difficulty / 1000000000000).toFixed(1)}T</span>
                  </div>
                </div>
                <div className="step-status">{step.status}</div>
              </div>
            ))}
          </div>
          
          <div className="understanding-progress">
            <div className="progress-label">Understanding Difficulty Control:</div>
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ width: `${userUnderstanding}%` }}
              ></div>
            </div>
            <div className="progress-percentage">{userUnderstanding}%</div>
          </div>
        </div>
      )}

      {controlPhase === 'mastery' && (
        <div className="difficulty-mastery">
          <h3>🏆 Difficulty Master Achievement Unlocked!</h3>
          
          <div className="mastery-celebration">
            <div className="achievement-icon">🎯</div>
            <div className="achievement-text">
              <h4>You now control Bitcoin's heartbeat!</h4>
              <p>You understand how the network automatically maintains security regardless of mining changes.</p>
            </div>
          </div>
          
          <div className="mastery-insights">
            <h4>🧠 Master-Level Insights Gained:</h4>
            <div className="insight-list">
              <div className="insight-item">
                <strong>Self-Regulation:</strong> Bitcoin adjusts difficulty automatically without human intervention
              </div>
              <div className="insight-item">
                <strong>Predictable Issuance:</strong> Consistent 10-minute blocks ensure predictable Bitcoin supply
              </div>
              <div className="insight-item">
                <strong>Security Scaling:</strong> More miners = higher difficulty = stronger security
              </div>
              <div className="insight-item">
                <strong>Attack Resistance:</strong> Even massive hashrate changes can't break the system
              </div>
            </div>
          </div>
          
          <div className="personal-impact">
            <h4>💰 What This Means for Your Wealth:</h4>
            <p>
              Bitcoin's difficulty adjustment ensures your digital wealth is protected by a security 
              system that automatically strengthens itself over time. No central authority needed - 
              just pure mathematics and economic incentives.
            </p>
          </div>

          <ActionButton
            variant="success"
            onClick={handleDifficultyMastery}
            className="mastery-complete-button"
          >
            Pioneer Clean Energy Revolution 🌱
          </ActionButton>
        </div>
      )}
    </div>
  );
};

// 🌱 Step 5: Clean Energy Pioneer
const CleanEnergyPioneerStep = ({ onComplete, userInsights, stepIndex }) => {
  const [pioneerPhase, setPioneerPhase] = useState('awakening'); // awakening, building, leading
  const [selectedProject, setSelectedProject] = useState(null);
  const [projectProgress, setProjectProgress] = useState(0);
  const [energyRevolution, setEnergyRevolution] = useState({
    renewablePercentage: 58, // Current Bitcoin renewable energy usage
    co2Reduction: 0,
    gridStabilization: 0,
    ruralDevelopment: 0
  });

  const energyProjects = [
    {
      id: 'solar_mining_farm',
      title: '☀️ Solar-Powered Bitcoin Mining Farm',
      description: 'Build mining operation using stranded solar energy',
      location: 'Texas Solar Field',
      energySource: 'Solar panels generating excess midday power',
      innovation: 'Monetize solar energy that would otherwise be wasted',
      impact: {
        renewable: '+15% clean Bitcoin energy',
        economic: '$2M annual revenue for solar farm',
        environmental: '-50,000 tons CO2 annually',
        community: '200 local jobs created'
      }
    },
    {
      id: 'hydro_mining_station',
      title: '💧 Hydroelectric Mining Station',
      description: 'Utilize excess hydroelectric capacity for Bitcoin mining',
      location: 'Iceland Geothermal Plant',
      energySource: 'Geothermal and hydroelectric excess capacity',
      innovation: 'Convert stranded renewable energy into global value',
      impact: {
        renewable: '+25% clean Bitcoin energy',
        economic: '$5M additional revenue for power plant',
        environmental: '100% renewable energy mining',
        community: 'Energy independence for remote community'
      }
    },
    {
      id: 'wind_stabilization',
      title: '💨 Wind Grid Stabilization Network',
      description: 'Use Bitcoin mining to balance wind energy intermittency',
      location: 'North Dakota Wind Farms',
      energySource: 'Variable wind power requiring grid balancing',
      innovation: 'Provide demand flexibility for renewable grid integration',
      impact: {
        renewable: '+30% grid renewable capacity',
        economic: '$10M grid stabilization revenue',
        environmental: 'Enable 200MW additional wind capacity',
        community: 'Stabilize rural electric grid'
      }
    }
  ];

  const buildEnergyProject = (project) => {
    setSelectedProject(project);
    setPioneerPhase('building');
    setProjectProgress(0);

    // Simulate project construction and impact
    const buildingInterval = setInterval(() => {
      setProjectProgress(prev => {
        const newProgress = prev + 20;
        
        // Update energy revolution metrics as project builds
        if (newProgress >= 40) {
          setEnergyRevolution(prevRev => ({
            ...prevRev,
            renewablePercentage: Math.min(prevRev.renewablePercentage + 2, 100),
            co2Reduction: prevRev.co2Reduction + 10000
          }));
        }
        
        if (newProgress >= 80) {
          setEnergyRevolution(prevRev => ({
            ...prevRev,
            gridStabilization: prevRev.gridStabilization + 25,
            ruralDevelopment: prevRev.ruralDevelopment + 1
          }));
        }
        
        if (newProgress >= 100) {
          clearInterval(buildingInterval);
          setPioneerPhase('leading');
        }
        
        return newProgress;
      });
    }, 1200);
  };

  const handleEnergyRevolutionComplete = () => {
    const insights = {
      projectBuilt: selectedProject?.id,
      revolutionLed: energyRevolution,
      climateImpact: 'renewable_energy_leadership',
      communityBenefit: selectedProject?.impact.community
    };
    onComplete(insights);
  };

  return (
    <div className="clean-energy-pioneer">
      <div className="pioneer-awakening">
        <h2>🌱 Clean Energy Pioneer Mission</h2>
        <div className="mission-context">
          <p className="mission-text">
            You're about to lead the renewable energy revolution. Bitcoin mining creates a 
            new economic model that makes stranded renewable energy profitable, accelerating 
            the global transition to clean power.
          </p>
          
          <div className="current-energy-state">
            <h3>🌍 Current Bitcoin Energy Profile:</h3>
            <div className="energy-stats">
              <div className="stat-item">
                <span className="stat-label">Renewable Energy Usage:</span>
                <span className="stat-value">{energyRevolution.renewablePercentage}%</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">CO2 Reduction Potential:</span>
                <span className="stat-value">{energyRevolution.co2Reduction.toLocaleString()} tons/year</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Grid Stabilization:</span>
                <span className="stat-value">{energyRevolution.gridStabilization}%</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Rural Projects:</span>
                <span className="stat-value">{energyRevolution.ruralDevelopment} communities</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {pioneerPhase === 'awakening' && (
        <div className="energy-project-selection">
          <h3>🚀 Choose Your Energy Revolution Project:</h3>
          
          <div className="project-grid">
            {energyProjects.map((project) => (
              <div key={project.id} className="project-card">
                <div className="project-header">
                  <h4>{project.title}</h4>
                  <div className="project-location">📍 {project.location}</div>
                </div>
                
                <div className="project-details">
                  <div className="project-description">{project.description}</div>
                  
                  <div className="energy-source">
                    <strong>Energy Source:</strong> {project.energySource}
                  </div>
                  
                  <div className="innovation">
                    <strong>Innovation:</strong> {project.innovation}
                  </div>
                  
                  <div className="impact-preview">
                    <strong>Expected Impact:</strong>
                    <ul>
                      <li>🌱 {project.impact.renewable}</li>
                      <li>💰 {project.impact.economic}</li>
                      <li>🌍 {project.impact.environmental}</li>
                      <li>👥 {project.impact.community}</li>
                    </ul>
                  </div>
                </div>
                
                <ActionButton
                  variant="success"
                  onClick={() => buildEnergyProject(project)}
                  className="build-project-button"
                >
                  Build This Project 🔨
                </ActionButton>
              </div>
            ))}
          </div>
        </div>
      )}

      {pioneerPhase === 'building' && selectedProject && (
        <div className="project-construction">
          <h3>🔨 Building {selectedProject.title}</h3>
          
          <div className="construction-visualization">
            <div className="project-site">
              <h4>📍 {selectedProject.location}</h4>
              <div className="construction-progress">
                <div className="progress-label">Construction Progress:</div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill"
                    style={{ width: `${projectProgress}%` }}
                  ></div>
                </div>
                <div className="progress-percentage">{projectProgress}%</div>
              </div>
            </div>
            
            <div className="impact-tracking">
              <h4>🌍 Real-Time Impact:</h4>
              <div className="impact-metrics">
                <div className="metric">
                  <span className="metric-icon">🌱</span>
                  <span className="metric-label">Renewable %:</span>
                  <span className="metric-value">{energyRevolution.renewablePercentage}%</span>
                </div>
                <div className="metric">
                  <span className="metric-icon">🌍</span>
                  <span className="metric-label">CO2 Reduced:</span>
                  <span className="metric-value">{energyRevolution.co2Reduction.toLocaleString()} tons</span>
                </div>
                <div className="metric">
                  <span className="metric-icon">⚡</span>
                  <span className="metric-label">Grid Stability:</span>
                  <span className="metric-value">{energyRevolution.gridStabilization}%</span>
                </div>
                <div className="metric">
                  <span className="metric-icon">👥</span>
                  <span className="metric-label">Communities:</span>
                  <span className="metric-value">{energyRevolution.ruralDevelopment}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="construction-phases">
            <div className={`phase ${projectProgress >= 20 ? 'completed' : 'current'}`}>
              Phase 1: Site Preparation & Permits
            </div>
            <div className={`phase ${projectProgress >= 40 ? 'completed' : projectProgress >= 20 ? 'current' : ''}`}>
              Phase 2: Renewable Energy Integration
            </div>
            <div className={`phase ${projectProgress >= 60 ? 'completed' : projectProgress >= 40 ? 'current' : ''}`}>
              Phase 3: Mining Infrastructure Installation
            </div>
            <div className={`phase ${projectProgress >= 80 ? 'completed' : projectProgress >= 60 ? 'current' : ''}`}>
              Phase 4: Grid Stabilization Systems
            </div>
            <div className={`phase ${projectProgress >= 100 ? 'completed' : projectProgress >= 80 ? 'current' : ''}`}>
              Phase 5: Community Benefit Programs
            </div>
          </div>
        </div>
      )}

      {pioneerPhase === 'leading' && (
        <div className="energy-revolution-complete">
          <h3>🏆 Clean Energy Revolution Leader!</h3>
          
          <div className="revolution-celebration">
            <div className="achievement-icon">🌱</div>
            <div className="achievement-text">
              <h4>You've successfully pioneered clean Bitcoin mining!</h4>
              <p>Your project demonstrates how Bitcoin incentivizes renewable energy development.</p>
            </div>
          </div>
          
          <div className="project-impact-summary">
            <h4>📊 Your Project's Impact:</h4>
            <div className="impact-grid">
              <div className="impact-card">
                <div className="impact-icon">🌱</div>
                <div className="impact-title">Renewable Energy</div>
                <div className="impact-value">{selectedProject.impact.renewable}</div>
                <div className="impact-description">Increased clean Bitcoin mining</div>
              </div>
              <div className="impact-card">
                <div className="impact-icon">💰</div>
                <div className="impact-title">Economic Benefit</div>
                <div className="impact-value">{selectedProject.impact.economic}</div>
                <div className="impact-description">Annual revenue generation</div>
              </div>
              <div className="impact-card">
                <div className="impact-icon">🌍</div>
                <div className="impact-title">Environmental</div>
                <div className="impact-value">{selectedProject.impact.environmental}</div>
                <div className="impact-description">Climate impact reduction</div>
              </div>
              <div className="impact-card">
                <div className="impact-icon">👥</div>
                <div className="impact-title">Community</div>
                <div className="impact-value">{selectedProject.impact.community}</div>
                <div className="impact-description">Local economic development</div>
              </div>
            </div>
          </div>
          
          <div className="global-revolution-insight">
            <h4>🌍 Global Energy Revolution Insight:</h4>
            <p>
              Your project is part of a global movement where Bitcoin mining is driving the largest 
              renewable energy buildout in history. By making stranded renewable energy profitable, 
              Bitcoin accelerates the transition to clean power worldwide.
            </p>
            
            <div className="future-vision">
              <strong>Future Vision:</strong> Within a decade, Bitcoin mining will be predominantly 
              renewable, providing economic incentives for clean energy projects globally while 
              securing the most robust monetary network ever created.
            </div>
          </div>

          <ActionButton
            variant="success"
            onClick={handleEnergyRevolutionComplete}
            className="revolution-complete-button"
          >
            Join Global Security Network 🌍
          </ActionButton>
        </div>
      )}
    </div>
  );
};

// 🌍 Step 6: Global Security Guardian
const GlobalSecurityGuardianStep = ({ onComplete, userInsights, stepIndex }) => {
  const [guardianPhase, setGuardianPhase] = useState('recruitment'); // recruitment, training, deployed
  const [securityRole, setSecurityRole] = useState(null);
  const [networkContribution, setNetworkContribution] = useState({
    nodesValidated: 0,
    attacksRepelled: 0,
    globalConnections: 0,
    sovereigntyDefended: 0
  });
  const [deploymentProgress, setDeploymentProgress] = useState(0);

  const securityRoles = [
    {
      id: 'node_operator',
      title: '🛡️ Bitcoin Node Guardian',
      description: 'Run a Bitcoin node to validate transactions and maintain network rules',
      requirements: ['Computer/Raspberry Pi', 'Internet connection', '~500GB storage'],
      contribution: 'Validate every transaction, reject invalid blocks, maintain consensus rules',
      impact: {
        decentralization: 'Increases network censorship resistance',
        sovereignty: 'Validates your own transactions without trusting third parties',
        security: 'Helps enforce Bitcoin protocol rules globally',
        community: 'Strengthens the distributed network foundation'
      },
      globalEffect: 'Every node makes the network more resilient to attacks and censorship'
    },
    {
      id: 'lightning_guardian',
      title: '⚡ Lightning Network Guardian', 
      description: 'Operate Lightning channels to enable instant Bitcoin payments',
      requirements: ['Bitcoin node', 'Lightning software', 'Bitcoin liquidity'],
      contribution: 'Provide payment routing, maintain channels, enable instant transactions',
      impact: {
        scalability: 'Enable millions of transactions per second',
        accessibility: 'Make Bitcoin payments instant and low-cost',
        innovation: 'Support Bitcoin as everyday currency',
        economy: 'Earn fees while improving Bitcoin usability'
      },
      globalEffect: 'Lightning guardians enable Bitcoin to scale to global payment system'
    },
    {
      id: 'education_guardian',
      title: '🧠 Bitcoin Education Guardian',
      description: 'Educate others about Bitcoin and monetary sovereignty',
      requirements: ['Bitcoin knowledge', 'Communication skills', 'Passion for freedom'],
      contribution: 'Teach Bitcoin principles, counter misinformation, onboard new users',
      impact: {
        adoption: 'Accelerate global Bitcoin understanding',
        resistance: 'Counter anti-Bitcoin propaganda and FUD',
        empowerment: 'Help others achieve financial sovereignty',
        culture: 'Build Bitcoin-native communities and values'
      },
      globalEffect: 'Education guardians ensure Bitcoin knowledge spreads and persists'
    }
  ];

  const deploySecurityRole = (role) => {
    setSecurityRole(role);
    setGuardianPhase('training');
    setDeploymentProgress(0);

    // Simulate guardian training and deployment
    const trainingInterval = setInterval(() => {
      setDeploymentProgress(prev => {
        const newProgress = prev + 25;
        
        // Update network contribution as training progresses
        if (newProgress >= 25) {
          setNetworkContribution(prevContrib => ({
            ...prevContrib,
            nodesValidated: prevContrib.nodesValidated + 1000,
            globalConnections: prevContrib.globalConnections + 50
          }));
        }
        
        if (newProgress >= 50) {
          setNetworkContribution(prevContrib => ({
            ...prevContrib,
            attacksRepelled: prevContrib.attacksRepelled + 1,
            sovereigntyDefended: prevContrib.sovereigntyDefended + 100
          }));
        }
        
        if (newProgress >= 100) {
          clearInterval(trainingInterval);
          setGuardianPhase('deployed');
        }
        
        return newProgress;
      });
    }, 2000);
  };

  const handleGuardianDeployment = () => {
    const insights = {
      guardianRole: securityRole?.id,
      networkContribution: networkContribution,
      globalImpact: securityRole?.globalEffect,
      sovereigntyAchieved: 'full_digital_sovereignty'
    };
    onComplete(insights);
  };

  return (
    <div className="global-security-guardian">
      <div className="guardian-recruitment">
        <h2>🌍 Global Security Guardian Recruitment</h2>
        <div className="recruitment-briefing">
          <p className="briefing-text">
            You've mastered energy alchemy and pioneered clean energy. Now join the global 
            network of guardians protecting digital sovereignty for billions of people worldwide.
          </p>
          
          <div className="global-network-stats">
            <h3>🌐 Current Global Guardian Network:</h3>
            <div className="network-stats">
              <div className="stat-item">
                <span className="stat-label">Active Bitcoin Nodes:</span>
                <span className="stat-value">15,000+ worldwide</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Lightning Channels:</span>
                <span className="stat-value">5,000+ active guardians</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Countries Protected:</span>
                <span className="stat-value">100+ nations</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">People Served:</span>
                <span className="stat-value">100M+ Bitcoin users</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {guardianPhase === 'recruitment' && (
        <div className="guardian-role-selection">
          <h3>🛡️ Choose Your Guardian Specialization:</h3>
          
          <div className="role-grid">
            {securityRoles.map((role) => (
              <div key={role.id} className="guardian-role-card">
                <div className="role-header">
                  <h4>{role.title}</h4>
                </div>
                
                <div className="role-description">
                  {role.description}
                </div>
                
                <div className="role-requirements">
                  <strong>Requirements:</strong>
                  <ul>
                    {role.requirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="role-contribution">
                  <strong>Your Contribution:</strong>
                  <p>{role.contribution}</p>
                </div>
                
                <div className="role-impact">
                  <strong>Impact Areas:</strong>
                  <div className="impact-list">
                    {Object.entries(role.impact).map(([key, value]) => (
                      <div key={key} className="impact-item">
                        <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="global-effect">
                  <strong>Global Effect:</strong> {role.globalEffect}
                </div>
                
                <ActionButton
                  variant="primary"
                  onClick={() => deploySecurityRole(role)}
                  className="deploy-guardian-button"
                >
                  Deploy as Guardian 🚀
                </ActionButton>
              </div>
            ))}
          </div>
        </div>
      )}

      {guardianPhase === 'training' && securityRole && (
        <div className="guardian-training">
          <h3>🎯 Guardian Training: {securityRole.title}</h3>
          
          <div className="training-progress">
            <div className="training-header">
              <h4>Guardian Deployment Progress:</h4>
              <div className="progress-bar">
                <div 
                  className="progress-fill"
                  style={{ width: `${deploymentProgress}%` }}
                ></div>
              </div>
              <div className="progress-percentage">{deploymentProgress}%</div>
            </div>
            
            <div className="training-phases">
              <div className={`training-phase ${deploymentProgress >= 25 ? 'completed' : 'current'}`}>
                🎓 Guardian Knowledge Training
              </div>
              <div className={`training-phase ${deploymentProgress >= 50 ? 'completed' : deploymentProgress >= 25 ? 'current' : ''}`}>
                🔧 Technical Setup & Configuration
              </div>
              <div className={`training-phase ${deploymentProgress >= 75 ? 'completed' : deploymentProgress >= 50 ? 'current' : ''}`}>
                🌐 Network Integration & Testing
              </div>
              <div className={`training-phase ${deploymentProgress >= 100 ? 'completed' : deploymentProgress >= 75 ? 'current' : ''}`}>
                🛡️ Full Guardian Deployment
              </div>
            </div>
          </div>
          
          <div className="network-contribution-tracking">
            <h4>📊 Your Network Contribution:</h4>
            <div className="contribution-metrics">
              <div className="contribution-metric">
                <span className="metric-icon">✅</span>
                <span className="metric-label">Transactions Validated:</span>
                <span className="metric-value">{networkContribution.nodesValidated.toLocaleString()}</span>
              </div>
              <div className="contribution-metric">
                <span className="metric-icon">🛡️</span>
                <span className="metric-label">Attacks Repelled:</span>
                <span className="metric-value">{networkContribution.attacksRepelled}</span>
              </div>
              <div className="contribution-metric">
                <span className="metric-icon">🌐</span>
                <span className="metric-label">Global Connections:</span>
                <span className="metric-value">{networkContribution.globalConnections}</span>
              </div>
              <div className="contribution-metric">
                <span className="metric-icon">👑</span>
                <span className="metric-label">Sovereignty Defended:</span>
                <span className="metric-value">{networkContribution.sovereigntyDefended}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {guardianPhase === 'deployed' && (
        <div className="guardian-deployed">
          <h3>🏆 Global Security Guardian Deployed!</h3>
          
          <div className="deployment-celebration">
            <div className="achievement-icon">🌍</div>
            <div className="achievement-text">
              <h4>Welcome to the Global Guardian Network!</h4>
              <p>You are now protecting digital sovereignty for people worldwide.</p>
            </div>
          </div>
          
          <div className="guardian-impact-summary">
            <h4>🌟 Your Guardian Impact:</h4>
            <div className="final-impact-grid">
              <div className="impact-stat">
                <div className="stat-icon">⚡</div>
                <div className="stat-title">Energy Alchemy Mastered</div>
                <div className="stat-description">Transform electricity into mathematical security</div>
              </div>
              <div className="impact-stat">
                <div className="stat-icon">🌱</div>
                <div className="stat-title">Clean Energy Pioneer</div>
                <div className="stat-description">Lead renewable energy revolution with Bitcoin</div>
              </div>
              <div className="impact-stat">
                <div className="stat-icon">🛡️</div>
                <div className="stat-title">Security Guardian</div>
                <div className="stat-description">Protect global digital sovereignty network</div>
              </div>
              <div className="impact-stat">
                <div className="stat-icon">👑</div>
                <div className="stat-title">Digital Sovereign</div>
                <div className="stat-description">Full control over your digital wealth</div>
              </div>
            </div>
          </div>
          
          <div className="global-mission-complete">
            <h4>🌍 Global Mission Accomplished:</h4>
            <div className="mission-summary">
              <p>
                You've completed the energy alchemy journey from crisis detective to global guardian. 
                You now understand how Bitcoin transforms raw electrical energy into the most secure 
                monetary system ever created, while driving clean energy adoption worldwide.
              </p>
              
              <div className="sovereignty-achievement">
                <strong>🎯 Digital Sovereignty Achieved:</strong> You have the knowledge and tools to 
                protect your wealth using mathematical proof instead of trusting institutions.
              </div>
            </div>
            
            <div className="next-journey">
              <h4>🚀 Your Next Adventure:</h4>
              <p>
                Ready to dive deeper? The Keys Module will teach you how to generate and manage 
                the cryptographic keys that give you complete control over your Bitcoin.
              </p>
            </div>
          </div>

          <ActionButton
            variant="success"
            onClick={handleGuardianDeployment}
            className="journey-complete-button"
          >
            Continue to Keys Module 🔐
          </ActionButton>
        </div>
      )}
    </div>
  );
};

export default MiningModule; 