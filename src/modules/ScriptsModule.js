import React, { useState, useEffect } from 'react';
import { useProgress } from '../contexts/ProgressContext';
import { 
  AlertTriangle, 
  Code, 
  Shield, 
  Zap, 
  TrendingUp,
  Crown,
  CheckCircle,
  Play
} from 'lucide-react';
import { 
  ContinueButton, 
  ActionButton
} from '../components/EnhancedButtons';
import './ScriptsModule.css';

const ScriptsModule = () => {
  const { completeModule, updatePersonalInsights } = useProgress();
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(new Set());

  // Script Architect Journey State (initial state for future features)
  const [userInsights, setUserInsights] = useState({
    crisisAwareness: 0,
    codeCreativity: 0,
    securityDesign: 0,
    liquidityEngineering: 0,
    protocolMastery: 0,
    economicSovereignty: 0
  });

  const architectSteps = [
    {
      id: 'contract-crisis',
      title: '🚨 Contract Crisis Detective',
      subtitle: 'Billion-dollar failures expose the fatal flaw in traditional contracts...',
      icon: <AlertTriangle className="w-6 h-6" />,
      component: ContractCrisisDetective
    },
    {
      id: 'code-alchemist',
      title: '⚡ Code Alchemist', 
      subtitle: 'Transform human logic into unstoppable mathematical law',
      icon: <Code className="w-6 h-6" />,
      component: CodeAlchemist
    },
    {
      id: 'security-architect',
      title: '🛡️ Security Architect',
      subtitle: 'Design bulletproof contracts that no single party can break',
      icon: <Shield className="w-6 h-6" />,
      component: SecurityArchitect
    },
    {
      id: 'liquidity-engineer',
      title: '🌊 Liquidity Engineer',
      subtitle: 'Build payment channels and instant global money flows',
      icon: <Zap className="w-6 h-6" />,
      component: LiquidityEngineer
    },
    {
      id: 'protocol-designer',
      title: '🏛️ Protocol Designer',
      subtitle: 'Master privacy-preserving scripts and next-generation protocols',
      icon: <TrendingUp className="w-6 h-6" />,
      component: ProtocolDesigner
    },
    {
      id: 'economic-sovereign',
      title: '💰 Economic Sovereign',
      subtitle: 'Command global financial infrastructure through programmable money',
      icon: <Crown className="w-6 h-6" />,
      component: EconomicSovereign
    }
  ];

  useEffect(() => {
    if (currentStep === architectSteps.length - 1) {
      completeModule('scripts');
      updatePersonalInsights('scripts', userInsights);
      showStrategicAchievement(
        'Script Architect Mastery',
        'You can now program unstoppable money contracts that reshape global finance!',
        '👑'
      );
    }
  }, [currentStep, completeModule, updatePersonalInsights, userInsights, architectSteps.length]);

  const showStrategicAchievement = (title, description, emoji = '⚡') => {
    const achievement = document.createElement('div');
    achievement.className = 'strategic-achievement';
    achievement.innerHTML = `
      <div class="achievement-glow">
      <div class="achievement-content">
          <div class="achievement-emoji">${emoji}</div>
        <div class="achievement-text">
            <h3>${title}</h3>
          <p>${description}</p>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(achievement);
    
    setTimeout(() => {
      achievement.style.opacity = '0';
      setTimeout(() => {
        if (document.body.contains(achievement)) {
          document.body.removeChild(achievement);
        }
      }, 500);
    }, 4000);
  };

  const handleStepComplete = (stepIndex) => {
    setCompletedSteps(prev => new Set([...prev, stepIndex]));
    
    const achievements = [
      { title: 'Crisis Detective', desc: 'You exposed the trillion-dollar flaw in traditional contracts!', emoji: '🕵️' },
      { title: 'Code Alchemist', desc: 'You transform human logic into mathematical law!', emoji: '⚡' },
      { title: 'Security Architect', desc: 'You design unbreakable multi-party contracts!', emoji: '🛡️' },
      { title: 'Liquidity Engineer', desc: 'You build the infrastructure for instant global payments!', emoji: '🌊' },
      { title: 'Protocol Designer', desc: 'You master privacy-preserving financial protocols!', emoji: '🏛️' },
      { title: 'Economic Sovereign', desc: 'You command global money flows through code!', emoji: '💰' }
    ];

    showStrategicAchievement(
      achievements[stepIndex].title,
      achievements[stepIndex].desc,
      achievements[stepIndex].emoji
    );
  };

  const handleContinue = () => {
    if (currentStep < architectSteps.length - 1) {
      handleStepComplete(currentStep);
      setCurrentStep(prev => prev + 1);
    }
  };

  const progressPercentage = ((currentStep + 1) / architectSteps.length) * 100;

  // Strategic Step Components
  function ContractCrisisDetective() {
    const [crisisPhase, setCrisisPhase] = useState('discovery');
    const [selectedCrisis, setSelectedCrisis] = useState(null);
    const [investigationResult, setInvestigationResult] = useState(null);

    const contractCrises = [
      {
        id: 'equifax',
        title: '💳 Equifax Data Breach Settlement',
        problem: 'Your personal data was exposed. The settlement contract promised $125 cash to millions.',
        crisis: 'Only $31 million was allocated. Actual payouts: $6.75 per person maximum.',
        insight: 'Traditional contracts can change terms when inconvenient',
        cost: '$31M insufficient for 147M affected people',
        lesson: 'Contract terms were dependent on human discretion'
      },
      {
        id: 'insurance',
        title: '🏠 Hurricane Insurance Denial',
        problem: 'Your home was destroyed. Insurance contract clearly covers storm damage.',
        crisis: 'Company classified it as "flood damage" (not covered) despite wind destruction.',
        insight: 'Humans interpret contracts to benefit themselves',
        cost: '$2.7T in denied claims annually',
        lesson: 'Contract interpretation is subjective and biased'
      },
      {
        id: 'bank_freeze',
        title: '🏦 Bank Account Freeze',
        problem: 'You need emergency funds for medical bills. Money is yours, account is active.',
        crisis: 'Bank flags "suspicious activity" and freezes account for 30+ days.',
        insight: 'Contracts give institutions power to override your rights',
        cost: '$40B in frozen legitimate funds yearly',
        lesson: 'Contract enforcement depends on centralized authority'
      }
    ];

    const handleCrisisChoice = (crisis) => {
      setSelectedCrisis(crisis);
      setCrisisPhase('investigation');
      
      setTimeout(() => {
        setInvestigationResult({
          rootCause: 'Human Interpretation Problem',
          solution: 'Mathematical Contract Execution',
          impact: 'Removes human discretion and bias'
        });
        setCrisisPhase('revelation');
        
        // Update user insights
        const insights = { ...userInsights };
        insights.crisisAwareness = Math.min(insights.crisisAwareness + 25, 100);
        setUserInsights(insights);
      }, 2000);
    };

    return (
      <div className="crisis-detective">
        <div className="crisis-header">
          <div className="crisis-icon">
            <AlertTriangle className="w-16 h-16 text-red-500" />
          </div>
          <h2>🚨 THE CONTRACT CRISIS EPIDEMIC</h2>
          <p className="crisis-subtitle">Billions lost to broken promises and human interpretation...</p>
        </div>

        {crisisPhase === 'discovery' && (
          <div className="crisis-scenarios">
            <div className="crisis-explanation">
              <div className="prime-text">
                💰 Every year, trillions of dollars are lost to contract failures. Not because the contracts 
                were unclear, but because humans get to decide what they mean.
              </div>
            </div>

            <h3>Choose a contract crisis to investigate:</h3>
            <div className="crisis-grid">
              {contractCrises.map(crisis => (
                <div 
                  key={crisis.id}
                  className="crisis-card"
                  onClick={() => handleCrisisChoice(crisis)}
                >
                  <div className="crisis-title">{crisis.title}</div>
                  <div className="crisis-problem">{crisis.problem}</div>
                  <div className="crisis-cost">{crisis.cost}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {crisisPhase === 'investigation' && selectedCrisis && (
          <div className="crisis-investigation">
            <div className="investigation-header">
              <h3>🔍 Investigating: {selectedCrisis.title}</h3>
            </div>
            
            <div className="investigation-details">
              <div className="investigation-step">
                <h4>📋 The Contract Promise</h4>
                <p>{selectedCrisis.problem}</p>
              </div>
              
              <div className="investigation-step">
                <h4>💥 What Actually Happened</h4>
                <p>{selectedCrisis.crisis}</p>
              </div>

              <div className="investigation-loading">
                <div className="loading-spinner"></div>
                <p>Analyzing root cause...</p>
              </div>
            </div>
          </div>
        )}

        {crisisPhase === 'revelation' && selectedCrisis && investigationResult && (
          <div className="crisis-revelation">
            <div className="revelation-header">
              <h3>⚡ REVELATION: The Fatal Flaw Exposed</h3>
            </div>

            <div className="revelation-analysis">
              <div className="flaw-identified">
                <h4>🎯 Root Cause Identified</h4>
                <div className="flaw-box">
                  <strong>{investigationResult.rootCause}</strong>
                  <p>{selectedCrisis.lesson}</p>
                </div>
              </div>

              <div className="solution-preview">
                <h4>💡 The Bitcoin Script Solution</h4>
                <div className="solution-box">
                  <strong>Mathematical Contract Execution</strong>
                  <p>Code that executes exactly as written, with no human interpretation</p>
                  <ul>
                    <li>✅ No subjective interpretation</li>
                    <li>✅ No centralized control</li>
                    <li>✅ No ability to change terms</li>
                    <li>✅ Mathematically guaranteed execution</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="revelation-impact">
              <div className="prime-text">
                🔥 What if contracts could execute automatically, exactly as agreed, with no human 
                able to override or reinterpret them? That's what Bitcoin scripts make possible.
              </div>
            </div>

            <ContinueButton onClick={() => handleContinue()}>
              Transform Crisis Into Code →
            </ContinueButton>
          </div>
        )}
      </div>
    );
  }

  function CodeAlchemist() {
    const [alchemyPhase, setAlchemyPhase] = useState('learning');
    const [currentScript, setCurrentScript] = useState('');
    const [executionSteps, setExecutionSteps] = useState([]);
    const [completedTransformations, setCompletedTransformations] = useState(new Set());

    const logicTransformations = [
      {
        id: 'simple_payment',
        title: '💰 Simple Payment',
        humanLogic: 'If Alice provides a valid signature proving she owns this key, then she can spend the money.',
        scriptCode: 'OP_DUP OP_HASH160 <pubKeyHash> OP_EQUALVERIFY OP_CHECKSIG',
        explanation: 'Duplicate signature, hash it, compare to stored hash, verify signature',
        difficulty: 'Beginner'
      },
      {
        id: 'multisig',
        title: '👥 Corporate Approval',
        humanLogic: 'If any 2 out of 3 executives provide valid signatures, then approve the payment.',
        scriptCode: 'OP_2 <pubKey1> <pubKey2> <pubKey3> OP_3 OP_CHECKMULTISIG',
        explanation: 'Require 2 signatures from 3 possible public keys',
        difficulty: 'Intermediate'
      },
      {
        id: 'timelock',
        title: '⏰ Time Release',
        humanLogic: 'If the current time is after January 1, 2025, AND Alice provides a valid signature, then release the funds.',
        scriptCode: '1735689600 OP_CHECKLOCKTIMEVERIFY OP_DROP OP_DUP OP_HASH160 <pubKeyHash> OP_EQUALVERIFY OP_CHECKSIG',
        explanation: 'Check timestamp, then verify signature if time requirement met',
        difficulty: 'Advanced'
      }
    ];

    const executeScriptStep = (script) => {
      const steps = [];
      const stack = [];
    const operations = script.split(' ');
    
      operations.forEach((op, index) => {
        if (op.startsWith('OP_')) {
          switch (op) {
            case 'OP_DUP':
              if (stack.length > 0) {
                const top = stack[stack.length - 1];
                stack.push(top);
                steps.push({ step: index + 1, operation: op, action: `Duplicate top item: ${top}`, stack: [...stack] });
              }
              break;
            case 'OP_HASH160':
              if (stack.length > 0) {
                const value = stack.pop();
                const hashed = `hash160(${value})`;
                stack.push(hashed);
                steps.push({ step: index + 1, operation: op, action: `Hash ${value} → ${hashed}`, stack: [...stack] });
              }
              break;
            case 'OP_EQUALVERIFY':
              if (stack.length >= 2) {
                const b = stack.pop();
                const a = stack.pop();
                steps.push({ step: index + 1, operation: op, action: `Verify ${a} equals ${b}`, stack: [...stack] });
              }
              break;
            case 'OP_CHECKSIG':
              steps.push({ step: index + 1, operation: op, action: 'Verify signature is valid', stack: [...stack] });
              break;
            default:
              steps.push({ step: index + 1, operation: op, action: `Execute ${op}`, stack: [...stack] });
          }
        } else if (!op.startsWith('<')) {
          stack.push(op);
          steps.push({ step: index + 1, operation: 'PUSH', action: `Push ${op} to stack`, stack: [...stack] });
    }
      });
      
      return steps;
  };

    const handleTransformLogic = (transformation) => {
      setCurrentScript(transformation.scriptCode);
      const steps = executeScriptStep(transformation.scriptCode);
      setExecutionSteps(steps);
      setAlchemyPhase('demonstration');
      
      // Mark transformation as completed
      setCompletedTransformations(prev => new Set([...prev, transformation.id]));
      
      // Update user insights
      const insights = { ...userInsights };
      insights.codeCreativity = Math.min(insights.codeCreativity + 30, 100);
      setUserInsights(insights);
    };

    return (
      <div className="code-alchemist">
        <div className="alchemist-header">
          <div className="alchemist-icon">
            <Code className="w-16 h-16 text-blue-500" />
          </div>
          <h2>⚡ TRANSFORM LOGIC INTO LAW</h2>
          <p className="alchemist-subtitle">Watch human intentions become unstoppable mathematical operations...</p>
        </div>

        {alchemyPhase === 'learning' && (
          <div className="alchemy-workshop">
            <div className="workshop-explanation">
        <div className="prime-text">
                🧪 Every Bitcoin script starts as human logic: "If this, then that." 
                Your job as a Code Alchemist is to transform fuzzy human intentions into 
                precise mathematical operations that execute exactly as specified.
        </div>
      </div>
      
            <h3>Choose a logic transformation to master:</h3>
            <div className="transformations-grid">
              {logicTransformations.map(transformation => (
                <div 
                  key={transformation.id}
                  className={`transformation-card ${completedTransformations.has(transformation.id) ? 'completed' : ''}`}
                  onClick={() => handleTransformLogic(transformation)}
                >
                  <div className="transformation-header">
                    <span className="transformation-title">{transformation.title}</span>
                    <span className="transformation-difficulty">{transformation.difficulty}</span>
          </div>
                  
                  <div className="human-logic">
                    <h4>🧠 Human Logic</h4>
                    <p>{transformation.humanLogic}</p>
          </div>
                  
                  {completedTransformations.has(transformation.id) && (
                    <div className="transformation-status">
                      <CheckCircle className="w-5 h-5" />
                      <span>Transformation Complete</span>
          </div>
                  )}
          </div>
              ))}
        </div>
      </div>
        )}

        {alchemyPhase === 'demonstration' && (
          <div className="alchemy-demonstration">
            <div className="demonstration-header">
              <h3>⚡ Transformation in Progress</h3>
              <p>Watch logic become mathematical law...</p>
      </div>

            <div className="script-execution">
              <div className="script-display">
                <h4>📜 Generated Script</h4>
                <div className="script-code">
                  {currentScript}
        </div>
        </div>

              <div className="execution-visualization">
                <h4>🔥 Step-by-Step Execution</h4>
                <div className="execution-steps">
                  {executionSteps.map((step, index) => (
                    <div key={index} className="execution-step">
                      <div className="step-number">{step.step}</div>
                      <div className="step-details">
                        <div className="step-operation">{step.operation}</div>
                        <div className="step-action">{step.action}</div>
                        <div className="step-stack">
                          Stack: [{step.stack.join(', ')}]
              </div>
            </div>
                    </div>
                  ))}
                    </div>
                </div>
              </div>

            <div className="transformation-insight">
              <div className="prime-text">
                🎯 The transformation is complete! Human logic is now mathematical law. 
                No court, no judge, no interpretation—just pure, unstoppable execution.
            </div>
          </div>

            <div className="demonstration-controls">
              <ActionButton onClick={() => setAlchemyPhase('learning')}>
                Transform More Logic
              </ActionButton>
              
              {completedTransformations.size >= 2 && (
                <ContinueButton onClick={() => handleContinue()}>
                  Master Security Architecture →
                </ContinueButton>
              )}
          </div>
        </div>
        )}
      </div>
    );
  }

  function SecurityArchitect() {
    const [architectPhase, setArchitectPhase] = useState('challenge');
    const [securityScenario, setSecurityScenario] = useState(null);
    const [contractDesign, setContractDesign] = useState(null);
    const [simulationActive, setSimulationActive] = useState(false);

    const securityChallenges = [
      {
        id: 'corporate_treasury',
        title: '🏢 Corporate Treasury Protection',
        problem: 'Your company holds $50M in Bitcoin. Single signature = single point of failure.',
        threat: 'CEO could go rogue, key could be compromised, or executive could be coerced.',
        solution: '2-of-3 multisig',
        participants: ['CEO', 'CFO', 'Board Chair'],
        requirement: 'Any 2 executives must approve large transactions',
        script: 'OP_2 <CEO_key> <CFO_key> <Chair_key> OP_3 OP_CHECKMULTISIG'
      },
      {
        id: 'inheritance_planning',
        title: '👨‍👩‍👧‍👦 Inheritance Time Lock',
        problem: 'You want to pass Bitcoin to your children, but not until they mature.',
        threat: 'Kids could access funds too early, or you could lose access due to accident.',
        solution: 'Time-locked inheritance',
        participants: ['Parent', 'Child (after 21)', 'Emergency Backup'],
        requirement: 'Child can access after 21st birthday, parent has emergency override',
        script: '2025-01-01 OP_CHECKLOCKTIMEVERIFY OP_DROP <child_key> OP_CHECKSIG'
      },
      {
        id: 'escrow_protection',
        title: '🤝 High-Stakes Escrow',
        problem: 'Buying a $2M property with Bitcoin. Neither party should be able to steal.',
        threat: 'Seller could disappear, buyer could reverse payment, or dispute could arise.',
        solution: '2-of-3 escrow with timelock',
        participants: ['Buyer', 'Seller', 'Escrow Agent'],
        requirement: 'Any 2 parties can release, or automatic release after 90 days',
        script: 'OP_IF OP_2 <buyer> <seller> <agent> OP_3 OP_CHECKMULTISIG OP_ELSE 90 OP_CHECKLOCKTIMEVERIFY OP_DROP <buyer> OP_CHECKSIG OP_ENDIF'
      }
    ];

    const handleSecurityChallenge = (challenge) => {
      setSecurityScenario(challenge);
      setArchitectPhase('design');
      
      // Update user insights
      const insights = { ...userInsights };
      insights.securityDesign = Math.min(insights.securityDesign + 25, 100);
      setUserInsights(insights);
    };

    const handleContractTest = () => {
      setSimulationActive(true);
      
      // Simulate contract testing
      setTimeout(() => {
        setContractDesign({
          security_rating: 'MAXIMUM',
          attack_vectors: 0,
          single_points_failure: 0,
          trust_requirements: 'MINIMIZED'
        });
        setSimulationActive(false);
        setArchitectPhase('validation');
      }, 3000);
    };

    return (
      <div className="security-architect">
        <div className="architect-header">
          <div className="architect-icon">
            <Shield className="w-16 h-16 text-green-500" />
      </div>
          <h2>🛡️ BULLETPROOF CONTRACTS</h2>
          <p className="architect-subtitle">Design security that no single party can break...</p>
    </div>

        {architectPhase === 'challenge' && (
          <div className="security-challenges">
            <div className="challenge-explanation">
        <div className="prime-text">
                🎯 Single signatures are security disasters waiting to happen. Your mission: 
                architect contracts so secure that even coordinated attacks fail.
        </div>
      </div>

            <h3>Choose a security challenge to solve:</h3>
            <div className="challenges-grid">
              {securityChallenges.map(challenge => (
                <div 
                  key={challenge.id}
                  className="challenge-card"
                  onClick={() => handleSecurityChallenge(challenge)}
                >
                  <div className="challenge-title">{challenge.title}</div>
                  <div className="challenge-problem">{challenge.problem}</div>
                  <div className="challenge-threat">
                    <strong>Threat:</strong> {challenge.threat}
          </div>
                  <div className="challenge-solution">
                    <strong>Solution:</strong> {challenge.solution}
          </div>
          </div>
              ))}
          </div>
        </div>
        )}

        {architectPhase === 'design' && securityScenario && (
          <div className="contract-design">
            <div className="design-header">
              <h3>🏗️ Designing: {securityScenario.title}</h3>
          </div>

            <div className="design-requirements">
              <div className="requirement-analysis">
                <h4>📋 Security Requirements</h4>
                <ul>
                  <li><strong>Participants:</strong> {securityScenario.participants.join(', ')}</li>
                  <li><strong>Requirement:</strong> {securityScenario.requirement}</li>
                  <li><strong>Solution Type:</strong> {securityScenario.solution}</li>
                </ul>
          </div>

              <div className="script-blueprint">
                <h4>⚡ Security Script</h4>
          <div className="script-code">
                  {securityScenario.script}
          </div>
          </div>
        </div>

            <div className="security-analysis">
              <h4>🔒 Security Properties</h4>
              <div className="security-properties">
                <div className="property">
                  <span className="property-icon">✅</span>
                  <span>No single point of failure</span>
          </div>
                <div className="property">
                  <span className="property-icon">✅</span>
                  <span>Resistance to coercion</span>
          </div>
                <div className="property">
                  <span className="property-icon">✅</span>
                  <span>Transparent verification</span>
          </div>
                <div className="property">
                  <span className="property-icon">✅</span>
                  <span>Immutable execution</span>
                </div>
          </div>
        </div>

            <ActionButton onClick={handleContractTest}>
              <Play className="w-4 h-4" />
              Test Contract Security
            </ActionButton>
          </div>
        )}

        {architectPhase === 'validation' && contractDesign && (
          <div className="security-validation">
            <div className="validation-header">
              <h3>🎯 Security Validation Complete</h3>
          </div>

            <div className="security-metrics">
              <div className="metric">
                <span className="metric-label">Security Rating:</span>
                <span className="metric-value">{contractDesign.security_rating}</span>
          </div>
              <div className="metric">
                <span className="metric-label">Attack Vectors:</span>
                <span className="metric-value">{contractDesign.attack_vectors}</span>
          </div>
              <div className="metric">
                <span className="metric-label">Single Points of Failure:</span>
                <span className="metric-value">{contractDesign.single_points_failure}</span>
              </div>
              <div className="metric">
                <span className="metric-label">Trust Requirements:</span>
                <span className="metric-value">{contractDesign.trust_requirements}</span>
        </div>
      </div>

            <div className="validation-insight">
      <div className="prime-text">
                🛡️ Contract security achieved! You've eliminated single points of failure 
                and created a system where no individual can compromise the funds.
      </div>
            </div>

            <ContinueButton onClick={() => handleContinue()}>
              Engineer Global Liquidity →
            </ContinueButton>
          </div>
        )}

        {simulationActive && (
          <div className="security-simulation">
            <div className="simulation-status">
              <div className="loading-spinner"></div>
              <p>Testing contract against attack vectors...</p>
            </div>
          </div>
        )}
    </div>
  );
  }

  function LiquidityEngineer() {
    const [engineerPhase, setEngineerPhase] = useState('discovery');
    const [channelDemo, setChannelDemo] = useState({ alice: 5, bob: 5, payments: [] });
    const [lightningMetrics, setLightningMetrics] = useState(null);

    const handleChannelPayment = (amount, direction) => {
      const newChannel = { ...channelDemo };
      const payment = {
        id: Date.now(),
        amount,
        direction,
        timestamp: new Date().toLocaleTimeString()
      };

      if (direction === 'alice_to_bob') {
        newChannel.alice -= amount;
        newChannel.bob += amount;
      } else {
        newChannel.bob -= amount;
        newChannel.alice += amount;
      }

      newChannel.payments = [...newChannel.payments, payment];
      setChannelDemo(newChannel);

      // Update user insights
      const insights = { ...userInsights };
      insights.liquidityEngineering = Math.min(insights.liquidityEngineering + 10, 100);
      setUserInsights(insights);
    };

    const handleLightningReveal = () => {
      setLightningMetrics({
        total_nodes: '15,000+',
        total_capacity: '5,000+ BTC',
        daily_payments: '1M+',
        avg_fee: '0.001%',
        settlement_time: '<1 second'
      });
      setEngineerPhase('mastery');
    };

    return (
      <div className="liquidity-engineer">
        <div className="engineer-header">
          <div className="engineer-icon">
            <Zap className="w-16 h-16 text-yellow-500" />
                  </div>
          <h2>🌊 GLOBAL LIQUIDITY INFRASTRUCTURE</h2>
          <p className="engineer-subtitle">Build the pipes that carry instant money worldwide...</p>
                  </div>

        {engineerPhase === 'discovery' && (
          <div className="liquidity-discovery">
            <div className="discovery-problem">
              <h3>💸 The Liquidity Problem</h3>
              <div className="problem-stats">
                <div className="stat">
                  <span className="stat-value">$40</span>
                  <span className="stat-label">Average Bitcoin transaction fee during congestion</span>
                  </div>
                <div className="stat">
                  <span className="stat-value">10-60 min</span>
                  <span className="stat-label">Transaction confirmation time</span>
                </div>
                <div className="stat">
                  <span className="stat-value">7 TPS</span>
                  <span className="stat-label">Bitcoin's base layer transaction limit</span>
              </div>
          </div>

              <div className="prime-text">
                🚫 These limitations make Bitcoin unusable for daily payments. But what if we could 
                build a second layer that enables millions of instant, cheap transactions?
              </div>
          </div>

            <div className="channel-introduction">
              <h3>⚡ Payment Channel Solution</h3>
              <p>Create a shared account that enables instant payments without touching the blockchain:</p>
              
              <div className="channel-demo">
                <div className="channel-participants">
                  <div className="participant">
                    <div className="participant-name">Alice</div>
                    <div className="participant-balance">{channelDemo.alice} BTC</div>
        </div>

                  <div className="channel-connection">
                    <div className="channel-capacity">
                      Total: {channelDemo.alice + channelDemo.bob} BTC
        </div>
      </div>
                  
                  <div className="participant">
                    <div className="participant-name">Bob</div>
                    <div className="participant-balance">{channelDemo.bob} BTC</div>
        </div>
      </div>

                <div className="payment-controls">
                  <ActionButton 
                    onClick={() => handleChannelPayment(1, 'alice_to_bob')}
                    disabled={channelDemo.alice < 1}
                  >
                    Alice → Bob (1 BTC)
                  </ActionButton>
                  <ActionButton 
                    onClick={() => handleChannelPayment(1, 'bob_to_alice')}
                    disabled={channelDemo.bob < 1}
                  >
                    Bob → Alice (1 BTC)
                  </ActionButton>
        </div>

                {channelDemo.payments.length > 0 && (
                  <div className="payment-history">
                    <h4>Payment History</h4>
                    {channelDemo.payments.slice(-3).map(payment => (
                      <div key={payment.id} className="payment-record">
                        {payment.direction === 'alice_to_bob' ? 'Alice → Bob' : 'Bob → Alice'}: 
                        {payment.amount} BTC at {payment.timestamp}
              </div>
                    ))}
              </div>
                )}
              </div>
            </div>

            {channelDemo.payments.length >= 2 && (
              <div className="discovery-insight">
                <div className="prime-text">
                  🎯 Notice: Instant payments, zero fees, no blockchain congestion! 
                  Now imagine connecting millions of these channels...
            </div>
                
                <ActionButton onClick={handleLightningReveal}>
                  Reveal the Lightning Network →
                </ActionButton>
          </div>
            )}
        </div>
        )}

        {engineerPhase === 'mastery' && lightningMetrics && (
          <div className="lightning-mastery">
            <div className="mastery-header">
              <h3>⚡ Lightning Network: Global Payment Infrastructure</h3>
      </div>

            <div className="lightning-stats">
              <div className="stat-grid">
                <div className="network-stat">
                  <span className="stat-icon">🌐</span>
                  <span className="stat-value">{lightningMetrics.total_nodes}</span>
                  <span className="stat-label">Active Nodes</span>
          </div>
                <div className="network-stat">
                  <span className="stat-icon">💰</span>
                  <span className="stat-value">{lightningMetrics.total_capacity}</span>
                  <span className="stat-label">Total Capacity</span>
          </div>
                <div className="network-stat">
                  <span className="stat-icon">⚡</span>
                  <span className="stat-value">{lightningMetrics.daily_payments}</span>
                  <span className="stat-label">Daily Payments</span>
        </div>
                <div className="network-stat">
                  <span className="stat-icon">💸</span>
                  <span className="stat-value">{lightningMetrics.avg_fee}</span>
                  <span className="stat-label">Average Fee</span>
          </div>
          </div>
        </div>

            <div className="engineering-achievements">
              <h4>🏗️ Your Engineering Impact</h4>
              <div className="achievements-grid">
                <div className="achievement">
                  <span className="achievement-icon">🚀</span>
                  <span>Enabled instant global payments</span>
          </div>
                <div className="achievement">
                  <span className="achievement-icon">💰</span>
                  <span>Reduced fees by 99.9%</span>
          </div>
                <div className="achievement">
                  <span className="achievement-icon">🌍</span>
                  <span>Connected global liquidity pools</span>
                </div>
                <div className="achievement">
                  <span className="achievement-icon">⚡</span>
                  <span>Powered millions of micropayments</span>
                </div>
        </div>
      </div>

            <div className="mastery-insight">
      <div className="prime-text">
                🌊 You've engineered the infrastructure for global instant payments! 
                Payment channels and routing create a parallel financial system that 
                settles instantly and scales infinitely.
      </div>
            </div>

            <ContinueButton onClick={() => handleContinue()}>
              Design Advanced Protocols →
            </ContinueButton>
          </div>
        )}
    </div>
  );
  }

  function ProtocolDesigner() {
    const [designPhase, setDesignPhase] = useState('evolution');
    const [selectedProtocol, setSelectedProtocol] = useState(null);
    const [privacyComparison, setPrivacyComparison] = useState(null);

    const protocolEvolution = [
      {
        id: 'p2pkh',
        name: 'P2PKH (Legacy)',
        era: '2009-2012',
        privacy: 'Low',
        efficiency: 'Basic',
        features: ['Simple payments', 'Single signature'],
        address: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
        description: 'The original Bitcoin script type'
      },
      {
        id: 'p2sh',
        name: 'P2SH (Script Hash)',
        era: '2012-2017',
        privacy: 'Medium',
        efficiency: 'Better',
        features: ['Multisig support', 'Complex conditions', 'Smaller transactions'],
        address: '3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy',
        description: 'Enabled complex scripts with simpler addresses'
      },
      {
        id: 'segwit',
        name: 'SegWit (Witness)',
        era: '2017-2021',
        privacy: 'Medium',
        efficiency: 'Much Better',
        features: ['Lower fees', 'Malleability fix', 'Lightning ready'],
        address: 'bc1qw508d6qejxtdg4y5r3zarvary0c5xw7kv8f3t4',
        description: 'Separated signatures for better scaling'
      },
      {
        id: 'taproot',
        name: 'Taproot (Privacy)',
        era: '2021-Present',
        privacy: 'Maximum',
        efficiency: 'Optimal',
        features: ['Schnorr signatures', 'Script privacy', 'Smart contract hiding'],
        address: 'bc1p5d7rjq7g6rdk2yhzks9smlaqtedr4dekq08ge8ztwac72sfr9rusxg3297',
        description: 'Complex scripts look like simple payments'
      }
    ];

    const handleProtocolSelect = (protocol) => {
      setSelectedProtocol(protocol);
      setDesignPhase('analysis');
      
      // Generate privacy comparison
      setPrivacyComparison({
        public_visibility: protocol.id === 'taproot' ? 'Simple payment only' : 'Script structure visible',
        key_aggregation: protocol.id === 'taproot' ? 'Multiple keys → Single key' : 'Individual keys visible',
        smart_contracts: protocol.id === 'taproot' ? 'Hidden until used' : 'Always visible',
        analysis_resistance: protocol.id === 'taproot' ? 'Maximum' : 'Limited'
      });

      // Update user insights
      const insights = { ...userInsights };
      insights.protocolMastery = Math.min(insights.protocolMastery + 20, 100);
      setUserInsights(insights);
    };

    return (
      <div className="protocol-designer">
        <div className="designer-header">
          <div className="designer-icon">
            <TrendingUp className="w-16 h-16 text-purple-500" />
        </div>
          <h2>🏛️ PROTOCOL EVOLUTION MASTERY</h2>
          <p className="designer-subtitle">Design privacy-preserving protocols that scale to global adoption...</p>
      </div>

        {designPhase === 'evolution' && (
          <div className="protocol-evolution">
            <div className="evolution-explanation">
              <div className="prime-text">
                🚀 Bitcoin scripts have evolved from simple payments to sophisticated privacy-preserving 
                protocols. Each generation solves new problems while maintaining backward compatibility.
          </div>
          </div>

            <h3>Explore the protocol evolution:</h3>
            <div className="evolution-timeline">
              {protocolEvolution.map((protocol, index) => (
                <div 
                  key={protocol.id}
                  className="protocol-era"
                  onClick={() => handleProtocolSelect(protocol)}
                >
                  <div className="era-header">
                    <span className="era-name">{protocol.name}</span>
                    <span className="era-period">{protocol.era}</span>
        </div>

                  <div className="era-metrics">
                    <div className="metric">
                      <span className="metric-label">Privacy:</span>
                      <span className={`metric-value ${protocol.privacy.toLowerCase()}`}>
                        {protocol.privacy}
                      </span>
          </div>
                    <div className="metric">
                      <span className="metric-label">Efficiency:</span>
                      <span className="metric-value">{protocol.efficiency}</span>
          </div>
        </div>

                  <div className="era-features">
                    {protocol.features.map(feature => (
                      <span key={feature} className="feature-tag">{feature}</span>
                    ))}
          </div>

                  <div className="era-address">
                    <code>{protocol.address}</code>
          </div>

                  <div className="era-description">
                    {protocol.description}
        </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {designPhase === 'analysis' && selectedProtocol && privacyComparison && (
          <div className="protocol-analysis">
            <div className="analysis-header">
              <h3>🔬 Deep Dive: {selectedProtocol.name}</h3>
          </div>

            <div className="privacy-analysis">
              <h4>🔒 Privacy Analysis</h4>
              <div className="privacy-metrics">
                <div className="privacy-metric">
                  <span className="metric-label">Public Visibility:</span>
                  <span className="metric-value">{privacyComparison.public_visibility}</span>
          </div>
                <div className="privacy-metric">
                  <span className="metric-label">Key Aggregation:</span>
                  <span className="metric-value">{privacyComparison.key_aggregation}</span>
                </div>
                <div className="privacy-metric">
                  <span className="metric-label">Smart Contracts:</span>
                  <span className="metric-value">{privacyComparison.smart_contracts}</span>
                </div>
                <div className="privacy-metric">
                  <span className="metric-label">Analysis Resistance:</span>
                  <span className="metric-value">{privacyComparison.analysis_resistance}</span>
                </div>
        </div>
      </div>

            {selectedProtocol.id === 'taproot' && (
              <div className="taproot-innovation">
                <h4>🌳 Taproot Innovation Breakthrough</h4>
                <div className="innovation-grid">
                  <div className="innovation-item">
                    <span className="innovation-icon">🎭</span>
                    <div className="innovation-text">
                      <strong>Script Privacy</strong>
                      <p>Complex smart contracts look identical to simple payments</p>
      </div>
    </div>
                  <div className="innovation-item">
                    <span className="innovation-icon">🔑</span>
                    <div className="innovation-text">
                      <strong>Key Aggregation</strong>
                      <p>Multiple signers appear as a single signature</p>
                    </div>
                  </div>
                  <div className="innovation-item">
                    <span className="innovation-icon">⚡</span>
                    <div className="innovation-text">
                      <strong>Schnorr Signatures</strong>
                      <p>Smaller, faster, more private signatures</p>
                    </div>
                  </div>
                  <div className="innovation-item">
                    <span className="innovation-icon">🌿</span>
                    <div className="innovation-text">
                      <strong>Script Trees</strong>
                      <p>Reveal only the execution path used</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="design-insight">
        <div className="prime-text">
                🎯 {selectedProtocol.id === 'taproot' 
                  ? 'You\'ve mastered the pinnacle of Bitcoin script evolution! Taproot enables maximum privacy while maintaining unlimited functionality.'
                  : `This protocol was a crucial step in Bitcoin's evolution, enabling ${selectedProtocol.features.join(', ').toLowerCase()}.`
                }
        </div>
      </div>

            <div className="analysis-controls">
              <ActionButton onClick={() => setDesignPhase('evolution')}>
                Explore More Protocols
              </ActionButton>
              
              {userInsights.protocolMastery >= 60 && (
                <ContinueButton onClick={() => handleContinue()}>
                  Achieve Economic Sovereignty →
                </ContinueButton>
              )}
          </div>
          </div>
        )}
        </div>
    );
  }

  function EconomicSovereign() {
    const [sovereignPhase] = useState('revelation');
    const [impactMetrics, setImpactMetrics] = useState(null);
    const [sovereigntyLevel, setSovereigntyLevel] = useState(0);

    useEffect(() => {
      if (sovereignPhase === 'revelation') {
        // Calculate impact based on user journey
        const totalInsights = Object.values(userInsights).reduce((sum, val) => sum + val, 0);
        setImpactMetrics({
          scripts_mastered: completedSteps.size,
          contracts_designed: Math.floor(totalInsights / 50),
          security_level: 'MAXIMUM',
          global_impact: 'TRANSFORMATIONAL'
        });
        
        setSovereigntyLevel(Math.min(totalInsights / 4, 100));
      }
    }, [sovereignPhase]);

    const globalApplications = [
      {
        icon: '⚡',
        title: 'Lightning Network',
        impact: '$5B+ in payment capacity',
        description: 'Your script knowledge powers instant global payments'
      },
      {
        icon: '🏢',
        title: 'Corporate Treasury',
        impact: '$100B+ in multisig protection',
        description: 'Companies secure billions using scripts you now understand'
      },
      {
        icon: '🌉',
        title: 'Cross-Chain Bridges',
        impact: '$50B+ in locked value',
        description: 'Script contracts enable value transfer between blockchains'
      },
      {
        icon: '🏦',
        title: 'DeFi Protocols',
        impact: '$200B+ total value locked',
        description: 'Smart contracts built on script foundations you\'ve mastered'
      }
    ];

    return (
      <div className="economic-sovereign">
        <div className="sovereign-header">
          <div className="sovereign-icon">
            <Crown className="w-20 h-20 text-yellow-500" />
          </div>
          <h2>💰 ECONOMIC SOVEREIGNTY ACHIEVED</h2>
          <p className="sovereign-subtitle">You command the global financial infrastructure through code...</p>
        </div>

        {sovereignPhase === 'revelation' && impactMetrics && (
          <div className="sovereignty-revelation">
            <div className="achievement-metrics">
              <h3>📊 Your Script Architect Impact</h3>
              <div className="metrics-grid">
                <div className="impact-metric">
                  <span className="metric-icon">📜</span>
                  <span className="metric-value">{impactMetrics.scripts_mastered}</span>
                  <span className="metric-label">Script Types Mastered</span>
          </div>
                <div className="impact-metric">
                  <span className="metric-icon">🏗️</span>
                  <span className="metric-value">{impactMetrics.contracts_designed}</span>
                  <span className="metric-label">Contracts Designed</span>
                </div>
                <div className="impact-metric">
                  <span className="metric-icon">🛡️</span>
                  <span className="metric-value">{impactMetrics.security_level}</span>
                  <span className="metric-label">Security Level</span>
                </div>
                <div className="impact-metric">
                  <span className="metric-icon">🌍</span>
                  <span className="metric-value">{sovereigntyLevel.toFixed(0)}%</span>
                  <span className="metric-label">Sovereignty Mastery</span>
                </div>
          </div>
        </div>

            <div className="global-impact">
              <h3>🌎 Your Knowledge Powers Global Finance</h3>
              <div className="applications-grid">
                {globalApplications.map((app, index) => (
                  <div key={index} className="application-card">
                    <span className="app-icon">{app.icon}</span>
                    <div className="app-content">
                      <h4>{app.title}</h4>
                      <div className="app-impact">{app.impact}</div>
                      <p>{app.description}</p>
          </div>
          </div>
                ))}
        </div>
      </div>

            <div className="sovereignty-powers">
              <h3>👑 Your Script Architect Powers</h3>
              <div className="powers-grid">
                <div className="power-item">
                  <CheckCircle className="power-icon" />
                  <span>Design unbreakable multisig contracts</span>
      </div>
                <div className="power-item">
                  <CheckCircle className="power-icon" />
                  <span>Program time-locked inheritance plans</span>
    </div>
                <div className="power-item">
                  <CheckCircle className="power-icon" />
                  <span>Build instant payment channels</span>
      </div>
                <div className="power-item">
                  <CheckCircle className="power-icon" />
                  <span>Create atomic swap contracts</span>
        </div>
                <div className="power-item">
                  <CheckCircle className="power-icon" />
                  <span>Implement privacy-preserving protocols</span>
        </div>
                <div className="power-item">
                  <CheckCircle className="power-icon" />
                  <span>Engineer global financial infrastructure</span>
                </div>
        </div>
      </div>

            <div className="final-insight">
      <div className="prime-text">
                🎓 You are now a Script Architect! You understand how code becomes law, 
                how logic becomes money, and how programmable contracts reshape global finance. 
                The power to design unstoppable financial systems is in your hands.
      </div>
            </div>

            <div className="sovereignty-navigation">
              <ContinueButton onClick={() => handleContinue()}>
                Command Global Financial Networks →
              </ContinueButton>
            </div>
          </div>
        )}
    </div>
  );
  }

  const renderCurrentStep = () => {
    const StepComponent = architectSteps[currentStep].component;
    return <StepComponent />;
  };

  return (
    <div className="scripts-module">
      <div className="module-header">
        <h1 className="module-title">
          <div className="module-icon">
            <Code className="w-12 h-12" />
          </div>
          Bitcoin Scripts
        </h1>
        <p className="module-subtitle">Learn how Bitcoin uses programmable conditions to control spending</p>
        <div className="module-progress">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <span>{Math.round(progressPercentage)}% Complete</span>
        </div>
      </div>

      <div className="module-tabs">
        {architectSteps.map((step, index) => (
          <div
            key={step.id}
            className={`tab ${index === currentStep ? 'active' : ''} ${completedSteps.has(index) ? 'completed' : ''}`}
            onClick={() => index <= currentStep && setCurrentStep(index)}
          >
            {step.icon}
            <div className="tab-content">
              <span className="tab-title">{step.title}</span>
              <span className="tab-subtitle">{step.subtitle}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="step-content-container">
        {renderCurrentStep()}
      </div>
    </div>
  );
};

export default ScriptsModule; 