import React, { useState, useEffect } from 'react';
import { useProgress } from '../contexts/ProgressContext';
import { useNavigate } from 'react-router-dom';
import { 
  Code2, 
  Play, 
  Eye, 
  EyeOff,
  Copy,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Lightbulb,
  Target,
  Users,
  Clock,
  Shield,
  Zap,
  Hash,
  Key,
  Calculator,
  Layers,
  FileText,
  Brain,
  Settings,
  Globe,
  X
} from 'lucide-react';
import { 
  ContinueButton, 
  ActionButton,
  OptionButton,
  NavigationButton,
  PageLayout,
  ModuleCard
} from '../components/ui';
import '../components/ModuleCommon.css';

const ScriptsModule = () => {
  const { completeModule } = useProgress();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(new Set());

  // Interactive state management
  const [scriptPlayground, setScriptPlayground] = useState({});
  const [executionVisualization, setExecutionVisualization] = useState({});
  const [userScripts, setUserScripts] = useState([]);
  const [challenges, setChallenges] = useState({});
  const [insights, setInsights] = useState({});

  // Learning progression steps
  const scriptSteps = [
    {
      id: "script_introduction",
      title: "🎯 Bitcoin Script Playground",
      subtitle: "Discover how Bitcoin programs money with simple, powerful scripts",
      component: ScriptIntroduction
    },
    {
      id: "stack_operations", 
      title: "📚 Stack-Based Programming",
      subtitle: "Learn the stack machine that executes every Bitcoin transaction",
      component: StackOperations
    },
    {
      id: "signature_verification",
      title: "🔐 Digital Signature Verification",
      subtitle: "Build scripts that verify ownership through cryptographic proofs",
      component: SignatureVerification
    },
    {
      id: "multisig_contracts",
      title: "👥 Multi-Signature Contracts",
      subtitle: "Create collaborative spending conditions requiring multiple parties",
      component: MultisigContracts
    },
    {
      id: "timelock_conditions",
      title: "⏰ Time-Locked Transactions",
      subtitle: "Program money that can only be spent at specific times",
      component: TimelockConditions
    },
    {
      id: "advanced_patterns",
      title: "🚀 Advanced Script Patterns",
      subtitle: "Explore complex conditions and modern Bitcoin script techniques",
      component: AdvancedPatterns
    }
  ];

  const handleStepComplete = (stepIndex) => {
    setCompletedSteps(prev => new Set([...prev, stepIndex]));
    if (stepIndex === scriptSteps.length - 1) {
      completeModule('scripts');
    }
  };

  const handleContinue = () => {
    if (currentStep < scriptSteps.length - 1) {
      handleStepComplete(currentStep);
      setCurrentStep(prev => prev + 1);
    } else {
      handleStepComplete(currentStep);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const progressPercentage = ((currentStep + 1) / scriptSteps.length) * 100;
  const CurrentStepComponent = scriptSteps[currentStep]?.component;

  // Script Introduction Component
  function ScriptIntroduction() {
    const [currentDemo, setCurrentDemo] = useState('overview');
    const [userPrediction, setUserPrediction] = useState('');
    const [showReality, setShowReality] = useState(false);
    const [selectedScript, setSelectedScript] = useState(null);

    const scriptDemos = [
      {
        id: 'simple_payment',
        name: 'Simple Payment',
        description: 'Basic "pay to public key hash" - the most common Bitcoin transaction',
        humanLogic: 'If you can prove you own this address, you can spend the money',
        script: 'OP_DUP OP_HASH160 <pubKeyHash> OP_EQUALVERIFY OP_CHECKSIG',
        realWorld: 'Like a digital check that only you can cash with your signature'
      },
      {
        id: 'multisig',
        name: 'Multi-Signature',
        description: 'Requires multiple people to agree before money can be spent',
        humanLogic: 'If 2 out of 3 board members sign, approve the payment',
        script: 'OP_2 <pubKey1> <pubKey2> <pubKey3> OP_3 OP_CHECKMULTISIG',
        realWorld: 'Like a business account requiring multiple signatures on large checks'
      },
      {
        id: 'timelock',
        name: 'Time Lock',
        description: 'Money that can only be spent after a certain time',
        humanLogic: 'If it\'s after January 2025 AND you have the key, spend the money',
        script: '1735689600 OP_CHECKLOCKTIMEVERIFY OP_DROP OP_DUP OP_HASH160 <pubKeyHash> OP_EQUALVERIFY OP_CHECKSIG',
        realWorld: 'Like a trust fund that unlocks on your 18th birthday'
      }
    ];

    const handlePredictionSubmit = () => {
      setShowReality(true);
      setInsights(prev => ({
        ...prev,
        introduction: {
          ...prev.introduction,
          userPrediction,
          thoughtful: userPrediction.length > 50
        }
      }));
    };

    const handleScriptSelect = (script) => {
      setSelectedScript(script);
      setCurrentDemo('execution');
    };

    return (
      <div className="script-introduction">
        <div className="intro-header">
          <Code2 className="intro-icon" size={48} />
          <h2>Bitcoin Scripts: Programming Money</h2>
          <p>Learn how Bitcoin uses simple programs to control when and how money can be spent</p>
        </div>

        <>
        {currentDemo === 'overview' && (
          <div className="intro-content">
            <div className="concept-intro">
      <div className="thinking-challenge">
        <h3>🤔 Think of money like a smart contract</h3>
        <p>Imagine if cash could be programmed with rules. For example, a $20 bill that can only be spent at grocery stores, or a check that becomes valid only after a certain date.</p>
        
        <div className="prediction-challenge">
          <p><strong>Real-world analogy:</strong> This is like writing conditions on a check - "Pay to John Smith only after January 1st" or "Valid only with two signatures."</p>
                    <p><strong>Your turn:</strong> If you could program money with custom rules, what would you want to control?</p>
                  <textarea
                    value={userPrediction}
                    onChange={(e) => setUserPrediction(e.target.value)}
                    placeholder="Share your ideas about programmable money..."
                    className="prediction-input"
                    rows={3}
                  />
                  <ActionButton 
                    onClick={handlePredictionSubmit}
                    disabled={userPrediction.length < 10}
                  >
                    See What's Actually Possible
                  </ActionButton>
                </div>

                {showReality && (
                  <div className="reality-reveal">
                    <div className="insight-box">
                      <Lightbulb size={24} />
                      <div>
                        <h4>Your instincts are spot-on!</h4>
                        <p>Bitcoin scripts can do exactly what you imagined and more. Every Bitcoin transaction contains a small program that must be successfully executed for the money to be spent.</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {showReality && (
                <div className="script-examples">
                  <h3>🎯 Real Bitcoin Script Examples</h3>
                  <p>Here are three common types of Bitcoin scripts. Click one to see how it works:</p>
                  
                  <div className="script-grid">
                    {scriptDemos.map(demo => (
                      <div 
                        key={demo.id} 
                        className="script-card"
                        onClick={() => handleScriptSelect(demo)}
                      >
                        <h4>{demo.name}</h4>
                        <p>{demo.description}</p>
                        <div className="script-logic">
                          <strong>Logic:</strong> {demo.humanLogic}
                        </div>
                        <div className="real-world">
                          <strong>Real World:</strong> {demo.realWorld}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {currentDemo === 'execution' && selectedScript && (
          <div className="script-execution-demo">
            <div className="execution-header">
              <h3>🔍 How "{selectedScript.name}" Works</h3>
              <p>{selectedScript.description}</p>
            </div>

            <div className="script-breakdown">
              <div className="human-logic-section">
                <h4>🧠 Human Logic</h4>
                <div className="logic-box">
                  {selectedScript.humanLogic}
                </div>
              </div>

              <div className="script-code-section">
                <h4>💻 Bitcoin Script Code</h4>
                <div className="script-code">
                  {selectedScript.script}
                </div>
              </div>

              <div className="real-world-section">
                <h4>🌍 Real World Analogy</h4>
                <div className="analogy-box">
                  {selectedScript.realWorld}
                </div>
              </div>
            </div>

            <div className="key-insight">
              <div className="insight-box">
                <Target size={24} />
                <div>
                  <h4>Key Insight: Unstoppable Execution</h4>
                  <p>Unlike traditional contracts that require human interpretation, Bitcoin scripts execute exactly as programmed. No one can override, change, or reinterpret them once they're in the blockchain.</p>
                </div>
              </div>
            </div>

            <div className="demo-controls">
              <ActionButton onClick={() => setCurrentDemo('overview')}>
                ← See Other Examples
              </ActionButton>
              <ContinueButton onClick={handleContinue}>
                Learn Stack Operations →
              </ContinueButton>
            </div>
          </div>
        )}
        </>
      </div>
    );
  }

  // Stack Operations Component
  function StackOperations() {
    const [currentExercise, setCurrentExercise] = useState('concept');
    const [stack, setStack] = useState([]);
    const [executionStep, setExecutionStep] = useState(0);
    const [userAnswer, setUserAnswer] = useState('');
    const [showStackVisualization, setShowStackVisualization] = useState(false);

    const stackExercises = [
      {
        id: 'basic_push',
        name: 'Basic Push Operations',
        operations: ['PUSH 5', 'PUSH 3', 'PUSH 8'],
        description: 'Add numbers to the stack',
        question: 'What will be on top of the stack?',
        answer: '8'
      },
      {
        id: 'dup_operation',
        name: 'Duplicate Operation',
        operations: ['PUSH 5', 'PUSH 3', 'OP_DUP'],
        description: 'Duplicate the top stack item',
        question: 'How many items will be on the stack?',
        answer: '3'
      },
      {
        id: 'add_operation',
        name: 'Addition Operation',
        operations: ['PUSH 5', 'PUSH 3', 'OP_ADD'],
        description: 'Add the top two stack items',
        question: 'What will be the result?',
        answer: '8'
      }
    ];

    const executeOperation = (operation) => {
      const newStack = [...stack];
      
      if (operation.startsWith('PUSH ')) {
        const value = operation.split(' ')[1];
        newStack.push(value);
      } else if (operation === 'OP_DUP') {
        if (newStack.length > 0) {
          newStack.push(newStack[newStack.length - 1]);
        }
      } else if (operation === 'OP_ADD') {
        if (newStack.length >= 2) {
          const b = parseInt(newStack.pop());
          const a = parseInt(newStack.pop());
          newStack.push((a + b).toString());
        }
      }
      
      setStack(newStack);
    };

    const runExercise = (exercise) => {
      setStack([]);
      setExecutionStep(0);
      setShowStackVisualization(true);
      setCurrentExercise(exercise);
      
      // Animate through each operation
      exercise.operations.forEach((operation, index) => {
        setTimeout(() => {
          executeOperation(operation);
          setExecutionStep(index + 1);
        }, (index + 1) * 1000);
      });
    };

    return (
      <div className="stack-operations">
        <div className="stack-header">
          <Layers className="stack-icon" size={48} />
          <h2>The Bitcoin Stack Machine</h2>
          <p>Bitcoin scripts execute on a simple stack-based computer. Let's learn how it works!</p>
        </div>

        {currentExercise === 'concept' && (
          <div className="stack-concept">
            <div className="concept-explanation">
            <h3>🥞 What is a Stack? (Like a Stack of Plates)</h3>
            <p>Imagine you're washing dishes and stacking clean plates. You always put the newest clean plate on top of the stack, and when you need a plate, you take the top one first. This "Last In, First Out" system is exactly how Bitcoin processes script operations.</p>
            <div className="real-world-example">
              <p><strong>Real world:</strong> Email - newest messages appear at the top</p>
              <p><strong>Bitcoin:</strong> Newest data goes on top of the stack</p>
            </div>
              
              <div className="stack-analogy">
                <div className="analogy-visual">
                  <div className="plate">Plate 3 (Top)</div>
                  <div className="plate">Plate 2</div>
                  <div className="plate">Plate 1 (Bottom)</div>
                </div>
                <div className="analogy-explanation">
                  <p>When you ADD a plate → it goes on top</p>
                  <p>When you REMOVE a plate → it comes from the top</p>
                  <p>You can never reach plates in the middle!</p>
                </div>
              </div>
            </div>

            <div className="exercise-intro">
              <h3>🎯 Interactive Stack Exercises</h3>
              <p>Try these exercises to see how Bitcoin's stack machine works:</p>
              
              <div className="exercise-grid">
                {stackExercises.map(exercise => (
                  <div 
                    key={exercise.id}
                    className="exercise-card"
                    onClick={() => runExercise(exercise)}
                  >
                    <h4>{exercise.name}</h4>
                    <p>{exercise.description}</p>
                    <div className="exercise-operations">
                      Operations: {exercise.operations.join(' → ')}
                    </div>
                    <ActionButton>Run Exercise</ActionButton>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {showStackVisualization && currentExercise !== 'concept' && (
          <div className="stack-visualization">
            <div className="visualization-header">
              <h3>🔍 Executing: {currentExercise.name}</h3>
              <p>Step {executionStep} of {currentExercise.operations.length}</p>
            </div>

            <div className="stack-display">
              <div className="stack-visual">
                <h4>Current Stack:</h4>
                <div className="stack-items">
                  {stack.map((item, index) => (
                    <div 
                      key={index} 
                      className={`stack-item ${index === stack.length - 1 ? 'top' : ''}`}
                    >
                      {item} {index === stack.length - 1 && <span>(top)</span>}
                    </div>
                  )).reverse()}
                  {stack.length === 0 && (
                    <div className="empty-stack">Empty Stack</div>
                  )}
                </div>
              </div>

              <div className="operations-display">
                <h4>Operations:</h4>
                <div className="operations-list">
                  {currentExercise.operations.map((operation, index) => (
                    <div 
                      key={index}
                      className={`operation-item ${index < executionStep ? 'completed' : index === executionStep ? 'current' : 'pending'}`}
                    >
                      {operation}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {executionStep === currentExercise.operations.length && (
              <div className="exercise-complete">
                <div className="quiz-question">
                  <h4>🤔 {currentExercise.question}</h4>
                  <input
                    type="text"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    placeholder="Your answer..."
                    className="answer-input"
                  />
                  <ActionButton 
                    onClick={() => {
                      if (userAnswer === currentExercise.answer) {
                        alert('Correct! Great understanding of stack operations.');
                      } else {
                        alert(`Not quite. The correct answer is ${currentExercise.answer}. Try again!`);
                      }
                    }}
                  >
                    Check Answer
                  </ActionButton>
                </div>
              </div>
            )}

            <div className="visualization-controls">
              <ActionButton onClick={() => {
                setShowStackVisualization(false);
                setCurrentExercise('concept');
                setStack([]);
                setExecutionStep(0);
              }}>
                ← Try Another Exercise
              </ActionButton>
              
              {executionStep === currentExercise.operations.length && userAnswer === currentExercise.answer && (
                <ContinueButton onClick={handleContinue}>
                  Master Signature Verification →
                </ContinueButton>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Signature Verification Component
  function SignatureVerification() {
    const [currentPhase, setCurrentPhase] = useState('concept');
    const [selectedChallenge, setSelectedChallenge] = useState(null);
    const [scriptExecution, setScriptExecution] = useState([]);
    const [userBuiltScript, setUserBuiltScript] = useState([]);

    const signatureScripts = [
      {
        id: 'p2pkh',
        name: 'Pay to Public Key Hash (P2PKH)',
        description: 'The most common Bitcoin transaction type',
        unlockingScript: '<signature> <publicKey>',
        lockingScript: 'OP_DUP OP_HASH160 <pubKeyHash> OP_EQUALVERIFY OP_CHECKSIG',
        steps: [
          'Push signature and public key to stack',
          'Duplicate public key',
          'Hash the public key',
          'Compare hash with stored hash',
          'Verify signature matches public key'
        ],
        security: 'Proves ownership without revealing private key'
      },
      {
        id: 'p2pk',
        name: 'Pay to Public Key (P2PK)',
        description: 'Direct public key payment (less common)',
        unlockingScript: '<signature>',
        lockingScript: '<publicKey> OP_CHECKSIG',
        steps: [
          'Push signature to stack',
          'Push public key to stack',
          'Verify signature matches public key'
        ],
        security: 'Simpler but exposes public key in locking script'
      }
    ];

    const buildScriptChallenge = () => {
      return (
        <div className="script-builder">
          <h3>🔨 Build Your Own Signature Script</h3>
          <p>Drag the operations in the correct order to verify a signature:</p>
          
          <div className="available-operations">
            <h4>Available Operations:</h4>
            <div className="operation-blocks">
              {['OP_DUP', 'OP_HASH160', '<pubKeyHash>', 'OP_EQUALVERIFY', 'OP_CHECKSIG'].map(op => (
                <div 
                  key={op}
                  className="operation-block"
                  draggable
                  onDragStart={(e) => e.dataTransfer.setData('text/plain', op)}
                >
                  {op}
                </div>
              ))}
            </div>
          </div>

          <div 
            className="script-builder-area"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              const operation = e.dataTransfer.getData('text/plain');
              setUserBuiltScript(prev => [...prev, operation]);
            }}
          >
            <h4>Your Script:</h4>
            <div className="built-script">
              {userBuiltScript.map((op, index) => (
                <span key={index} className="script-operation">{op}</span>
              ))}
              {userBuiltScript.length === 0 && (
                <span className="placeholder">Drag operations here...</span>
              )}
            </div>
          </div>

          <div className="builder-controls">
            <ActionButton onClick={() => setUserBuiltScript([])}>
              Clear Script
            </ActionButton>
            <ActionButton 
              onClick={() => {
                const correctScript = ['OP_DUP', 'OP_HASH160', '<pubKeyHash>', 'OP_EQUALVERIFY', 'OP_CHECKSIG'];
                if (JSON.stringify(userBuiltScript) === JSON.stringify(correctScript)) {
                  alert('Perfect! You\'ve built a correct P2PKH script.');
                  setCurrentPhase('mastery');
                } else {
                  alert('Not quite right. Check the order of operations.');
                }
              }}
            >
              Check Script
            </ActionButton>
          </div>
        </div>
      );
    };

    return (
      <div className="signature-verification">
        <div className="signature-header">
          <Key className="signature-icon" size={48} />
          <h2>Digital Signature Verification</h2>
          <p>Learn how Bitcoin proves ownership without revealing private keys</p>
        </div>

        {currentPhase === 'concept' && (
          <div className="signature-concept">
            <div className="concept-intro">
              <h3>🔐 The Signature Challenge</h3>
              <p>How do you prove you own something without showing your secret? Digital signatures solve this puzzle using mathematics.</p>
              
              <div className="signature-analogy">
                <div className="analogy-box">
                  <h4>🖋️ Real World Analogy</h4>
                  <p>Your handwritten signature proves documents came from you, but someone could forge it if they practice enough.</p>
                  <p><strong>Digital signatures</strong> are mathematically impossible to forge, even with unlimited practice!</p>
                </div>
              </div>
            </div>

            <div className="signature-examples">
              <h3>🎯 Common Signature Scripts</h3>
              <div className="script-examples">
                {signatureScripts.map(script => (
                  <div 
                    key={script.id}
                    className="script-example"
                    onClick={() => setSelectedChallenge(script)}
                  >
                    <h4>{script.name}</h4>
                    <p>{script.description}</p>
                    <div className="script-preview">
                      <div><strong>Unlocking:</strong> {script.unlockingScript}</div>
                      <div><strong>Locking:</strong> {script.lockingScript}</div>
                    </div>
                    <div className="security-note">
                      🛡️ {script.security}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="concept-challenge">
              <ActionButton onClick={() => setCurrentPhase('builder')}>
                Build Your Own Script →
              </ActionButton>
            </div>
          </div>
        )}

        {currentPhase === 'builder' && buildScriptChallenge()}

        {currentPhase === 'mastery' && (
          <div className="signature-mastery">
            <div className="mastery-celebration">
              <CheckCircle size={64} className="success-icon" />
              <h3>🎉 Signature Script Mastery!</h3>
              <p>You understand how Bitcoin uses cryptographic proofs to verify ownership without revealing secrets.</p>
            </div>

            <div className="key-insights">
              <div className="insight-grid">
                <div className="insight-item">
                  <Shield size={32} />
                  <h4>Security</h4>
                  <p>Private keys never leave your device</p>
                </div>
                <div className="insight-item">
                  <Zap size={32} />
                  <h4>Efficiency</h4>
                  <p>Verification is fast and cheap</p>
                </div>
                <div className="insight-item">
                  <Globe size={32} />
                  <h4>Global</h4>
                  <p>Works anywhere, no central authority</p>
                </div>
              </div>
            </div>

            <ContinueButton onClick={handleContinue}>
              Learn Multi-Signature Contracts →
            </ContinueButton>
          </div>
        )}
      </div>
    );
  }

  // Multisig Contracts Component  
  function MultisigContracts() {
    const [currentDemo, setCurrentDemo] = useState('intro');
    const [selectedScenario, setSelectedScenario] = useState(null);
    const [multisigSetup, setMultisigSetup] = useState({ m: 2, n: 3 });
    const [signatures, setSignatures] = useState([]);

    const multisigScenarios = [
      {
        id: 'business',
        name: 'Business Treasury',
        description: '2-of-3 multisig for company funds',
        participants: ['CEO', 'CFO', 'CTO'],
        requirement: 'Any 2 executives must approve large payments',
        script: 'OP_2 <pubKey_CEO> <pubKey_CFO> <pubKey_CTO> OP_3 OP_CHECKMULTISIG',
        benefit: 'Prevents single point of failure'
      },
      {
        id: 'inheritance',
        name: 'Family Inheritance',
        description: '2-of-3 multisig for family trust',
        participants: ['Parent', 'Child', 'Lawyer'],
        requirement: 'Parent + child OR parent + lawyer can access funds',
        script: 'OP_2 <pubKey_Parent> <pubKey_Child> <pubKey_Lawyer> OP_3 OP_CHECKMULTISIG',
        benefit: 'Secure inheritance planning'
      },
      {
        id: 'escrow',
        name: 'Escrow Service',
        description: '2-of-3 multisig for secure trading',
        participants: ['Buyer', 'Seller', 'Escrow_Agent'],
        requirement: 'Buyer + seller (happy) OR buyer/seller + escrow (dispute)',
        script: 'OP_2 <pubKey_Buyer> <pubKey_Seller> <pubKey_Escrow> OP_3 OP_CHECKMULTISIG',
        benefit: 'Trustless trading with dispute resolution'
      }
    ];

    const simulateMultisigTransaction = (scenario) => {
      setSelectedScenario(scenario);
      setCurrentDemo('simulation');
      setSignatures([]);
    };

    const addSignature = (participant) => {
      if (!signatures.includes(participant)) {
        const newSignatures = [...signatures, participant];
        setSignatures(newSignatures);
        
        if (newSignatures.length >= 2) {
          setTimeout(() => {
            alert(`Transaction approved! ${newSignatures.join(' and ')} have signed.`);
            setCurrentDemo('success');
          }, 1000);
        }
      }
    };

    return (
      <div className="multisig-contracts">
        <div className="multisig-header">
          <Users className="multisig-icon" size={48} />
          <h2>Multi-Signature Contracts</h2>
          <p>Learn how Bitcoin enables collaborative control over funds</p>
        </div>

        {currentDemo === 'intro' && (
          <div className="multisig-intro">
            <div className="concept-explanation">
              <h3>👥 What is Multi-Signature?</h3>
              <p>Multi-signature (multisig) requires multiple people to approve a transaction before it can be executed. It's like requiring multiple keys to open a safe.</p>
              
              <div className="multisig-benefits">
                <h4>🎯 Why Use Multisig?</h4>
                <div className="benefit-grid">
                  <div className="benefit-item">
                    <Shield size={24} />
                    <div>
                      <strong>Enhanced Security</strong>
                      <p>No single point of failure</p>
                    </div>
                  </div>
                  <div className="benefit-item">
                    <Users size={24} />
                    <div>
                      <strong>Shared Control</strong>
                      <p>Democratic decision making</p>
                    </div>
                  </div>
                  <div className="benefit-item">
                    <CheckCircle size={24} />
                    <div>
                      <strong>Backup Protection</strong>
                      <p>Lost keys don't mean lost funds</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="multisig-scenarios">
              <h3>🎯 Real-World Multisig Scenarios</h3>
              <p>Click a scenario to see how multisig solves real problems:</p>
              
              <div className="scenario-grid">
                {multisigScenarios.map(scenario => (
                  <div 
                    key={scenario.id}
                    className="scenario-card"
                    onClick={() => simulateMultisigTransaction(scenario)}
                  >
                    <h4>{scenario.name}</h4>
                    <p>{scenario.description}</p>
                    <div className="participants">
                      <strong>Participants:</strong> {scenario.participants.join(', ')}
                    </div>
                    <div className="requirement">
                      <strong>Rule:</strong> {scenario.requirement}
                    </div>
                    <div className="benefit">
                      ✅ {scenario.benefit}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {currentDemo === 'simulation' && selectedScenario && (
          <div className="multisig-simulation">
            <div className="simulation-header">
              <h3>🎬 Simulating: {selectedScenario.name}</h3>
              <p>{selectedScenario.description}</p>
            </div>

            <div className="script-display">
              <h4>📜 Multisig Script</h4>
              <div className="script-code">
                {selectedScenario.script}
              </div>
              <p className="script-explanation">
                This script requires 2 signatures from the 3 possible participants
              </p>
            </div>

            <div className="signing-simulation">
              <h4>🖋️ Sign the Transaction</h4>
              <p>Click on participants to add their signatures (need 2 of 3):</p>
              
              <div className="participants-grid">
                {selectedScenario.participants.map(participant => (
                  <div 
                    key={participant}
                    className={`participant-card ${signatures.includes(participant) ? 'signed' : ''}`}
                    onClick={() => addSignature(participant)}
                  >
                    <div className="participant-name">{participant}</div>
                    <div className="signing-status">
                      {signatures.includes(participant) ? (
                        <><CheckCircle size={20} /> Signed</>
                      ) : (
                        <><Key size={20} /> Click to Sign</>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="signature-progress">
                <p>Signatures: {signatures.length} of 2 required</p>
                <div className="progress-bar">
                  <div 
                    className="progress-fill"
                    style={{ width: `${(signatures.length / 2) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {currentDemo === 'success' && (
          <div className="multisig-success">
            <div className="success-celebration">
              <CheckCircle size={64} className="success-icon" />
              <h3>🎉 Transaction Approved!</h3>
              <p>The multisig contract has been successfully executed with {signatures.length} signatures.</p>
            </div>

            <div className="success-details">
              <h4>What Just Happened:</h4>
              <ul>
                <li>✅ {signatures.join(' and ')} provided valid signatures</li>
                <li>✅ Bitcoin script verified all signatures mathematically</li>
                <li>✅ Transaction was approved and funds can be spent</li>
                <li>✅ No central authority was needed for verification</li>
              </ul>
            </div>

            <div className="key-insight">
              <div className="insight-box">
                <Lightbulb size={24} />
                <div>
                  <h4>Key Insight: Trustless Cooperation</h4>
                  <p>Multisig enables groups to control funds together without trusting any single member or central authority. The mathematics ensures fairness.</p>
                </div>
              </div>
            </div>

            <div className="success-controls">
              <ActionButton onClick={() => {
                setCurrentDemo('intro');
                setSelectedScenario(null);
                setSignatures([]);
              }}>
                Try Another Scenario
              </ActionButton>
              <ContinueButton onClick={handleContinue}>
                Learn Time-Locked Transactions →
              </ContinueButton>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Timelock Conditions Component
  function TimelockConditions() {
    const [currentMode, setCurrentMode] = useState('concept');
    const [selectedTimelock, setSelectedTimelock] = useState(null);
    const [currentTime, setCurrentTime] = useState(Date.now());
    const [timelockDemo, setTimelockDemo] = useState(null);

    const timelockTypes = [
      {
        id: 'absolute_time',
        name: 'Absolute Time Lock',
        description: 'Funds can only be spent after a specific date/time',
        script: '<timestamp> OP_CHECKLOCKTIMEVERIFY OP_DROP OP_DUP OP_HASH160 <pubKeyHash> OP_EQUALVERIFY OP_CHECKSIG',
        example: 'Trust fund that unlocks on 18th birthday',
        timeCondition: 'January 1, 2025 at 00:00 UTC',
        timestamp: 1735689600
      },
      {
        id: 'relative_time',
        name: 'Relative Time Lock',
        description: 'Funds can only be spent after a certain time has passed',
        script: '<blocks> OP_CHECKSEQUENCEVERIFY OP_DROP OP_DUP OP_HASH160 <pubKeyHash> OP_EQUALVERIFY OP_CHECKSIG',
        example: 'Inheritance that requires 6 months waiting period',
        timeCondition: '144 blocks (~24 hours) after transaction confirmed',
        blocks: 144
      }
    ];

    const timelockScenarios = [
      {
        id: 'inheritance',
        name: 'Family Inheritance',
        description: 'Parents set up inheritance for children',
        setup: 'Funds locked until child turns 21',
        unlockDate: new Date('2025-06-15').getTime(),
        amount: '5.0 BTC',
        benefit: 'Ensures responsible access to inheritance'
      },
      {
        id: 'savings',
        name: 'Savings Plan',
        description: 'Personal savings with commitment device',
        setup: 'Cannot touch savings for 1 year',
        unlockDate: new Date('2024-12-31').getTime(),
        amount: '2.5 BTC',
        benefit: 'Prevents impulsive spending'
      },
      {
        id: 'business',
        name: 'Business Milestone',
        description: 'Contractor payment upon project completion',
        setup: 'Payment released 30 days after delivery',
        unlockDate: currentTime + (30 * 24 * 60 * 60 * 1000),
        amount: '1.0 BTC',
        benefit: 'Automatic milestone payments'
      }
    ];

    const simulateTimelock = (scenario) => {
      setTimelockDemo(scenario);
      setCurrentMode('simulation');
    };

    const checkTimelockStatus = (unlockTime) => {
      const now = currentTime;
      const isUnlocked = now >= unlockTime;
      const timeRemaining = unlockTime - now;
      
      return { isUnlocked, timeRemaining };
    };

    return (
      <div className="timelock-conditions">
        <div className="timelock-header">
          <Clock className="timelock-icon" size={48} />
          <h2>Time-Locked Transactions</h2>
          <p>Program money that can only be spent at specific times</p>
        </div>

        {currentMode === 'concept' && (
          <div className="timelock-concept">
            <div className="concept-intro">
              <h3>⏰ What are Time Locks?</h3>
              <p>Time locks prevent Bitcoin from being spent until a certain time or block height is reached. It's like programming money with a timer.</p>
              
              <div className="timelock-analogy">
                <div className="analogy-box">
                  <h4>🏦 Real World Analogy</h4>
                  <p>Like a time-locked bank vault that can only be opened on a specific date, or a CD (Certificate of Deposit) that matures after a fixed period.</p>
                  <p><strong>Bitcoin time locks</strong> are enforced by mathematics and the entire network, not just a single bank.</p>
                </div>
              </div>
            </div>

            <div className="timelock-types">
              <h3>🎯 Types of Time Locks</h3>
              <div className="types-grid">
                {timelockTypes.map(type => (
                  <div key={type.id} className="type-card">
                    <h4>{type.name}</h4>
                    <p>{type.description}</p>
                    <div className="type-example">
                      <strong>Example:</strong> {type.example}
                    </div>
                    <div className="type-condition">
                      <strong>Condition:</strong> {type.timeCondition}
                    </div>
                    <div className="script-preview">
                      <details>
                        <summary>View Script</summary>
                        <code>{type.script}</code>
                      </details>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="timelock-scenarios">
              <h3>🎯 Real-World Timelock Scenarios</h3>
              <p>Click a scenario to simulate time-locked Bitcoin:</p>
              
              <div className="scenario-grid">
                {timelockScenarios.map(scenario => (
                  <div 
                    key={scenario.id}
                    className="scenario-card"
                    onClick={() => simulateTimelock(scenario)}
                  >
                    <h4>{scenario.name}</h4>
                    <p>{scenario.description}</p>
                    <div className="scenario-details">
                      <div><strong>Setup:</strong> {scenario.setup}</div>
                      <div><strong>Amount:</strong> {scenario.amount}</div>
                      <div><strong>Benefit:</strong> {scenario.benefit}</div>
                    </div>
                    <div className="unlock-status">
                      {checkTimelockStatus(scenario.unlockDate).isUnlocked ? (
                        <span className="unlocked">🔓 Unlocked</span>
                      ) : (
                        <span className="locked">🔒 Locked</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {currentMode === 'simulation' && timelockDemo && (
          <div className="timelock-simulation">
            <div className="simulation-header">
              <h3>🎬 Simulating: {timelockDemo.name}</h3>
              <p>{timelockDemo.description}</p>
            </div>

            <div className="timelock-status">
              <div className="status-display">
                <h4>⏰ Time Lock Status</h4>
                <div className="time-info">
                  <div className="current-time">
                    <strong>Current Time:</strong> {new Date(currentTime).toLocaleString()}
                  </div>
                  <div className="unlock-time">
                    <strong>Unlock Time:</strong> {new Date(timelockDemo.unlockDate).toLocaleString()}
                  </div>
                </div>
                
                {(() => {
                  const status = checkTimelockStatus(timelockDemo.unlockDate);
                  return (
                    <div className={`lock-status ${status.isUnlocked ? 'unlocked' : 'locked'}`}>
                      {status.isUnlocked ? (
                        <div className="unlocked-message">
                          <CheckCircle size={24} />
                          <span>🔓 Funds are UNLOCKED and can be spent!</span>
                        </div>
                      ) : (
                        <div className="locked-message">
                          <Clock size={24} />
                          <span>🔒 Funds are LOCKED</span>
                          <div className="time-remaining">
                            Time remaining: {Math.ceil(status.timeRemaining / (24 * 60 * 60 * 1000))} days
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })()}
              </div>

              <div className="timelock-script">
                <h4>📜 Timelock Script</h4>
                <div className="script-code">
                  {Math.floor(timelockDemo.unlockDate / 1000)} OP_CHECKLOCKTIMEVERIFY OP_DROP OP_DUP OP_HASH160 &lt;pubKeyHash&gt; OP_EQUALVERIFY OP_CHECKSIG
                </div>
                <p className="script-explanation">
                  This script checks if the current time is after the unlock timestamp before allowing the signature verification
                </p>
              </div>
            </div>

            <div className="time-controls">
              <h4>🎮 Time Travel Simulation</h4>
              <p>Fast-forward time to see the timelock in action:</p>
              
              <div className="time-buttons">
                <ActionButton onClick={() => setCurrentTime(prev => prev + (7 * 24 * 60 * 60 * 1000))}>
                  +1 Week
                </ActionButton>
                <ActionButton onClick={() => setCurrentTime(prev => prev + (30 * 24 * 60 * 60 * 1000))}>
                  +1 Month
                </ActionButton>
                <ActionButton onClick={() => setCurrentTime(timelockDemo.unlockDate + 1000)}>
                  Jump to Unlock
                </ActionButton>
                <ActionButton onClick={() => setCurrentTime(Date.now())}>
                  Reset to Now
                </ActionButton>
              </div>
            </div>

            <div className="simulation-controls">
              <ActionButton onClick={() => {
                setCurrentMode('concept');
                setTimelockDemo(null);
                setCurrentTime(Date.now());
              }}>
                ← Try Another Scenario
              </ActionButton>
              <ContinueButton onClick={handleContinue}>
                Explore Advanced Patterns →
              </ContinueButton>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Advanced Patterns Component
  function AdvancedPatterns() {
    const [currentPattern, setCurrentPattern] = useState('overview');
    const [selectedAdvanced, setSelectedAdvanced] = useState(null);
    const [completedPatterns, setCompletedPatterns] = useState(new Set());
    const [quizAnswer, setQuizAnswer] = useState(null);
    const [showQuizFeedback, setShowQuizFeedback] = useState(false);

    const advancedPatterns = [
      {
        id: 'htlc',
        name: 'Hash Time Locked Contracts (HTLC)',
        description: 'Conditional payments that require a secret to unlock',
        useCase: 'Lightning Network payment channels',
        script: 'OP_IF OP_SHA256 <hash> OP_EQUALVERIFY OP_DUP OP_HASH160 <pubKeyHash> OP_ELSE <timelock> OP_CHECKLOCKTIMEVERIFY OP_DROP OP_DUP OP_HASH160 <refundPubKeyHash> OP_ENDIF OP_EQUALVERIFY OP_CHECKSIG',
        explanation: 'Allows instant payments with cryptographic proof, with automatic refund if secret not revealed',
        difficulty: 'Advanced'
      },
      {
        id: 'atomic_swap',
        name: 'Atomic Swaps',
        description: 'Trustless exchange between different cryptocurrencies',
        useCase: 'Cross-chain trading without exchanges',
        script: 'Similar to HTLC but coordinated across two blockchains',
        explanation: 'Either both parties get what they want, or both get refunded - no middle state possible',
        difficulty: 'Expert'
      },
      {
        id: 'commitment',
        name: 'Commitment Schemes',
        description: 'Reveal secrets in stages without changing them',
        useCase: 'Fair auctions and games',
        script: 'OP_SHA256 <commitment> OP_EQUALVERIFY OP_SHA256 <reveal> OP_EQUALVERIFY',
        explanation: 'Commit to a value without revealing it, then prove later you didn\'t cheat',
        difficulty: 'Advanced'
      }
    ];

    const explorePattern = (pattern) => {
      setSelectedAdvanced(pattern);
      setCurrentPattern('exploration');
    };

    const completePattern = (patternId) => {
      setCompletedPatterns(prev => new Set([...prev, patternId]));
      if (completedPatterns.size + 1 >= 2) {
        setCurrentPattern('mastery');
      }
    };

    const handleQuizAnswer = (answerIndex) => {
      setQuizAnswer(answerIndex);
      setShowQuizFeedback(true);
      
      // Always allow progression after showing feedback, regardless of correctness
      setTimeout(() => {
        completePattern(selectedAdvanced.id);
      }, 4000);
    };

    return (
      <div className="advanced-patterns">
        <div className="advanced-header">
          <Brain className="advanced-icon" size={48} />
          <h2>Advanced Script Patterns</h2>
          <p>Explore cutting-edge Bitcoin script techniques used in real applications</p>
        </div>

        {currentPattern === 'overview' && (
          <div className="patterns-overview">
            <div className="overview-intro">
              <h3>🚀 Advanced Bitcoin Scripting</h3>
              <p>These patterns combine basic operations to create sophisticated financial contracts that power next-generation Bitcoin applications.</p>
              
              <div className="complexity-note">
                <div className="note-box">
                  <Lightbulb size={24} />
                  <div>
                    <h4>Note on Complexity</h4>
                    <p>These patterns are used by advanced developers building Bitcoin infrastructure. Understanding them gives you insight into Bitcoin's true capabilities.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="patterns-grid">
              {advancedPatterns.map(pattern => (
                <div 
                  key={pattern.id}
                  className={`pattern-card ${completedPatterns.has(pattern.id) ? 'completed' : ''}`}
                  onClick={() => explorePattern(pattern)}
                >
                  <div className="pattern-header">
                    <h4>{pattern.name}</h4>
                    <span className={`difficulty ${pattern.difficulty.toLowerCase()}`}>
                      {pattern.difficulty}
                    </span>
                  </div>
                  
                  <p>{pattern.description}</p>
                  
                  <div className="pattern-details">
                    <div><strong>Use Case:</strong> {pattern.useCase}</div>
                    <div><strong>Key Feature:</strong> {pattern.explanation}</div>
                  </div>

                  {completedPatterns.has(pattern.id) && (
                    <div className="completion-badge">
                      <CheckCircle size={20} />
                      <span>Explored</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {currentPattern === 'exploration' && selectedAdvanced && (
          <div className="pattern-exploration">
            <div className="exploration-header">
              <h3>🔍 Exploring: {selectedAdvanced.name}</h3>
              <p>{selectedAdvanced.description}</p>
            </div>

            <div className="pattern-breakdown">
              <div className="use-case-section">
                <h4>🎯 Real-World Use Case</h4>
                <div className="use-case-box">
                  {selectedAdvanced.useCase}
                </div>
              </div>

              <div className="script-section">
                <h4>📜 Script Pattern</h4>
                <div className="script-code">
                  {selectedAdvanced.script}
                </div>
              </div>

              <div className="explanation-section">
                <h4>💡 How It Works</h4>
                <div className="explanation-box">
                  {selectedAdvanced.explanation}
                </div>
              </div>

              {selectedAdvanced.id === 'htlc' && (
                <div className="detailed-example">
                  <h4>🌐 Lightning Network Example</h4>
                  <div className="example-steps">
                    <div className="step">
                      <strong>1. Setup:</strong> Alice wants to pay Charlie through Bob
                    </div>
                    <div className="step">
                      <strong>2. Secret:</strong> Charlie creates a secret and shares its hash
                    </div>
                    <div className="step">
                      <strong>3. Chain:</strong> Alice → Bob → Charlie, each requiring the secret
                    </div>
                    <div className="step">
                      <strong>4. Reveal:</strong> Charlie reveals secret to claim payment
                    </div>
                    <div className="step">
                      <strong>5. Propagate:</strong> Secret propagates back, completing all payments
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="exploration-quiz">
              <h4>🤔 Understanding Check</h4>
              <p>What makes this pattern special compared to simple payments?</p>
              <div className="quiz-options">
                <div className="quiz-option" onClick={() => handleQuizAnswer(0)}>
                  It adds conditional logic that creates new possibilities
                </div>
                <div className="quiz-option" onClick={() => handleQuizAnswer(1)}>
                  It makes transactions faster
                </div>
                <div className="quiz-option" onClick={() => handleQuizAnswer(2)}>
                  It reduces fees
                </div>
              </div>
              {showQuizFeedback && (
                <div className="quiz-feedback">
                  {quizAnswer === 0 && (
                    <div className="correct-feedback">
                      <CheckCircle size={24} />
                      <p>Correct! This pattern adds conditional logic, enabling new possibilities for Bitcoin applications.</p>
                    </div>
                  )}
                  {quizAnswer === 1 && (
                    <div className="incorrect-feedback">
                      <X size={24} />
                      <p>Not quite. While it might make transactions faster, the key feature is the conditional logic.</p>
                    </div>
                  )}
                  {quizAnswer === 2 && (
                    <div className="incorrect-feedback">
                      <X size={24} />
                      <p>Not quite. While it might reduce fees, the primary benefit is the conditional logic.</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="exploration-controls">
              <ActionButton onClick={() => setCurrentPattern('overview')}>
                ← Explore Other Patterns
              </ActionButton>
            </div>
          </div>
        )}

        {currentPattern === 'mastery' && (
          <div className="advanced-mastery">
            <div className="mastery-celebration">
              <CheckCircle size={64} className="success-icon" />
              <h3>🎉 Advanced Script Mastery!</h3>
              <p>You've explored the cutting edge of Bitcoin's programmable money capabilities.</p>
            </div>

            <div className="mastery-insights">
              <h4>🧠 Key Insights Gained</h4>
              <div className="insight-grid">
                <div className="insight-item">
                  <Code2 size={32} />
                  <h5>Conditional Logic</h5>
                  <p>Bitcoin scripts can implement complex conditional behaviors</p>
                </div>
                <div className="insight-item">
                  <Zap size={32} />
                  <h5>Layer 2 Scaling</h5>
                  <p>Advanced patterns enable instant payments and complex applications</p>
                </div>
                <div className="insight-item">
                  <Shield size={32} />
                  <h5>Trustless Contracts</h5>
                  <p>Mathematics replaces trust in sophisticated financial agreements</p>
                </div>
              </div>
            </div>

            <div className="learning-journey">
              <h4>🎯 Your Bitcoin Script Journey</h4>
              <div className="journey-summary">
                <div className="journey-step completed">
                  <CheckCircle size={20} />
                  <span>Basic stack operations</span>
                </div>
                <div className="journey-step completed">
                  <CheckCircle size={20} />
                  <span>Signature verification</span>
                </div>
                <div className="journey-step completed">
                  <CheckCircle size={20} />
                  <span>Multi-signature contracts</span>
                </div>
                <div className="journey-step completed">
                  <CheckCircle size={20} />
                  <span>Time-locked transactions</span>
                </div>
                <div className="journey-step completed">
                  <CheckCircle size={20} />
                  <span>Advanced patterns</span>
                </div>
              </div>
            </div>

            <div className="next-steps">
              <h4>🚀 What's Next?</h4>
              <p>You now understand how Bitcoin's scripting system enables programmable money. This knowledge opens doors to:</p>
              <ul>
                <li>Building Bitcoin applications</li>
                <li>Understanding Lightning Network</li>
                <li>Creating custom smart contracts</li>
                <li>Contributing to Bitcoin development</li>
              </ul>
            </div>

            <ContinueButton onClick={handleContinue}>
              Complete Scripts Module →
            </ContinueButton>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="module-container scripts-module">
      <div className="module-header">
        <div className="header-content">
          <Code2 className="module-icon" size={48} />
          <div className="header-text">
            <h1>Bitcoin Scripts</h1>
            <p>Learn how Bitcoin uses simple programs to control when and how money can be spent</p>
          </div>
        </div>
        
        <div className="progress-section">
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <span className="progress-text">
            Step {currentStep + 1} of {scriptSteps.length}
          </span>
        </div>
      </div>

      <div className="module-navigation">
        {scriptSteps.map((step, index) => (
          <div 
            key={step.id}
            className={`nav-step ${index === currentStep ? 'active' : ''} ${completedSteps.has(index) ? 'completed' : ''}`}
          >
            <div className="step-number">{index + 1}</div>
            <div className="step-title">{step.title}</div>
          </div>
        ))}
      </div>

      <div className="module-content">
        {CurrentStepComponent && <CurrentStepComponent />}
      </div>

      <div className="module-controls">
        {currentStep > 0 && (
          <NavigationButton onClick={handleBack} variant="secondary">
            <ArrowLeft size={20} />
            Previous
          </NavigationButton>
        )}
        
        <div className="control-spacer" />
        
        {currentStep === scriptSteps.length - 1 && completedSteps.has(currentStep) && (
          <NavigationButton 
            onClick={() => navigate('/module/merkle')}
            variant="primary"
          >
            Next Module: Merkle Trees
            <ArrowRight size={20} />
          </NavigationButton>
        )}
      </div>
    </div>
  );
};

export default ScriptsModule; 