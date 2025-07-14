import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '../contexts/ProgressContext';
import { sha256 } from '../utils/bitcoin';
import { CheckCircle, Trophy, AlertTriangle, Lightbulb, ArrowRight } from 'lucide-react';
import '../components/ModuleCommon.css';
import './HashingModule.css';

const HashingModule = () => {
  const { completeModule } = useProgress();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(new Set());
  const [userInsights, setUserInsights] = useState({});

  // Journey steps with strategic narrative
  const journeySteps = [
    {
      id: "trust_detective",
      title: "🔍 The Trust Detective",
      subtitle: "You need to verify something critical, but you can't trust anyone...",
      component: TrustDetectiveStep
    },
    {
      id: "fingerprint_lab", 
      title: "🎭 Digital Fingerprint Lab",
      subtitle: "Discover the impossible: unique fingerprints for any information",
      component: FingerprintLabStep
    },
    {
      id: "impossible_challenge",
      title: "⚡ The Impossible Challenge", 
      subtitle: "Try to break the unbreakable (spoiler: you can't)",
      component: ImpossibleChallengeStep
    },
    {
      id: "trust_machine",
      title: "🛡️ Bitcoin's Trust Machine",
      subtitle: "How Bitcoin eliminates human trust using mathematical proof",
      component: TrustMachineStep
    },
    {
      id: "chain_of_truth",
      title: "🔗 Chain of Truth", 
      subtitle: "Experience the unbreakable link that secures your Bitcoin",
      component: ChainOfTruthStep
    },
    {
      id: "digital_sovereignty",
      title: "👑 Your Digital Sovereignty",
      subtitle: "Understand how cryptographic proof protects your wealth",
      component: DigitalSovereigntyStep
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
    
    // Auto-advance after brief celebration
    if (stepIndex < journeySteps.length - 1) {
      setTimeout(() => {
        setCurrentStep(stepIndex + 1);
      }, 1500);
    } else {
      // Module complete!
      completeModule('hashing');
      setTimeout(() => {
        navigate('/module/mining');
      }, 3000);
    }
  };

  const currentStepData = journeySteps[currentStep];
  const StepComponent = currentStepData.component;

  return (
    <div className="hashing-module">
      <div className="module-header">
        <div className="journey-progress">
          <div className="progress-indicators">
            {journeySteps.map((_, index) => (
              <div 
                key={index}
                className={`progress-dot ${currentStep === index ? 'active' : ''} ${completedSteps.has(index) ? 'completed' : ''}`}
              />
            ))}
      </div>
          <span className="progress-text">Step {currentStep + 1} of {journeySteps.length}</span>
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

      {/* Progress Summary */}
      <div className="progress-summary">
        <div className="completed-count">
          {completedSteps.size} / {journeySteps.length} discoveries made
      </div>
        <div className="insight-indicator">
          {Object.keys(userInsights).length > 0 && (
            <span>💡 Building digital trust mastery...</span>
          )}
        </div>
      </div>
    </div>
  );
};

// Step 1: Trust Detective - Experience the trust problem
const TrustDetectiveStep = ({ onComplete }) => {
  const [scenario, setScenario] = useState('message');
  const [userChoice, setUserChoice] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const scenarios = {
    message: {
      title: "🔒 Secure Message Verification",
      problem: "You receive a critical message claiming to be from your bank. How do you verify it's really from them and hasn't been tampered with?",
      options: [
        { id: 'call', text: "Call the bank to confirm", trust: "Bank employee" },
        { id: 'email', text: "Check the email address", trust: "Email system" },
        { id: 'website', text: "Visit bank's website", trust: "Website authenticity" },
        { id: 'math', text: "Use mathematical proof", trust: "Mathematics only" }
      ]
    },
    transaction: {
      title: "💰 Bitcoin Transaction Verification",  
      problem: "Someone sends you Bitcoin. How do you verify they actually sent it and it's not fake?",
      options: [
        { id: 'bank', text: "Ask a bank to verify", trust: "Banking system" },
        { id: 'government', text: "Get government confirmation", trust: "Government" },
        { id: 'friend', text: "Have a friend check", trust: "Your friend" },
        { id: 'math', text: "Use mathematical proof", trust: "Mathematics only" }
      ]
    }
  };

  const handleChoice = (choice) => {
    setUserChoice(choice);
    setShowResult(true);
  };

  const handleContinue = () => {
    onComplete({
      scenario,
      choice: userChoice,
      insight: userChoice?.id === 'math' ? 'mathematics' : 'trust_required'
    });
  };

  const currentScenario = scenarios[scenario];

  return (
    <div className="trust-detective">
      <div className="detective-intro">
        <div className="scenario-selector">
          <h3>🎯 Choose Your Challenge:</h3>
          <div className="scenario-buttons">
            {Object.entries(scenarios).map(([key, s]) => (
            <button
                key={key}
                className={`scenario-button ${scenario === key ? 'active' : ''}`}
                onClick={() => setScenario(key)}
            >
                {s.title}
            </button>
          ))}
        </div>
      </div>

        <div className="scenario-content">
          <div className="problem-statement">
            <h3>The Challenge:</h3>
            <p>{currentScenario.problem}</p>
          </div>
          
          <div className="choice-grid">
            <h4>Your options:</h4>
            {currentScenario.options.map((option) => (
              <button
                key={option.id}
                className={`choice-button ${userChoice?.id === option.id ? 'selected' : ''}`}
                onClick={() => handleChoice(option)}
              >
                <span className="choice-text">{option.text}</span>
                <span className="trust-requirement">Requires trusting: {option.trust}</span>
              </button>
            ))}
          </div>
        </div>
          </div>

      {showResult && (
        <div className="result-revelation">
          <div className="result-content">
            {userChoice.id === 'math' ? (
              <div className="breakthrough-result">
                <h3>🎉 You've Discovered the Breakthrough!</h3>
              <p>
                  You chose <strong>mathematical proof</strong> - the only option that doesn't require trusting any person or institution!
                </p>
                <div className="insight-box">
                  <strong>💡 Key Insight:</strong> Bitcoin works because it replaces trust in people with trust in mathematics. 
                  And mathematics can't lie, can't be corrupted, and works the same for everyone.
                </div>
              </div>
            ) : (
              <div className="trust-reveal">
                <h3>🤔 The Trust Problem Revealed</h3>
                <p>
                  You chose to trust <strong>{userChoice.trust}</strong>. But what if they:
                </p>
                <ul>
                  <li>🎭 Are lying to you?</li>
                  <li>💸 Have been bribed?</li>
                  <li>🔫 Are being coerced?</li>
                  <li>🤖 Have been hacked?</li>
                </ul>
                <div className="insight-box">
                  <strong>💡 The Problem:</strong> Traditional verification always requires trusting someone. 
                  Bitcoin's breakthrough is using mathematical proof instead.
                </div>
            </div>
          )}
          </div>
          
          <button className="continue-button" onClick={handleContinue}>
            <Lightbulb size={20} />
            Discover How Mathematical Proof Works
          </button>
        </div>
      )}
    </div>
  );
};

// Step 2: Digital Fingerprint Lab - Interactive discovery
const FingerprintLabStep = ({ onComplete }) => {
  const [input, setInput] = useState('');
  const [hashResult, setHashResult] = useState('');
  const [experiments, setExperiments] = useState([]);
  const [currentExperiment, setCurrentExperiment] = useState(0);
  const [discoveries, setDiscoveries] = useState(new Set());

  const guidedExperiments = [
    {
      instruction: "Type your name:",
      purpose: "See what your unique digital fingerprint looks like",
      insight: "Every person has a unique digital fingerprint"
    },
    {
      instruction: "Now add just one character (like '!' at the end):",
      purpose: "Discover the avalanche effect",
      insight: "Tiny changes create completely different fingerprints"
    },
    {
      instruction: "Type your name again (exactly like the first time):",
      purpose: "Verify deterministic behavior", 
      insight: "Same input always gives same fingerprint"
    },
    {
      instruction: "Try typing something really long (a sentence):",
      purpose: "See that length doesn't matter",
      insight: "Any amount of data → same size fingerprint"
      }
  ];

  const handleInputChange = async (e) => {
    const newInput = e.target.value;
    setInput(newInput);
    
    if (newInput) {
      try {
        const hash = await sha256(newInput);
        setHashResult(hash);
        
        // Record experiment
        const newExperiment = { input: newInput, hash, timestamp: Date.now() };
        setExperiments(prev => [...prev, newExperiment]);
        
        // Check for discoveries
        checkForDiscoveries(newExperiment, experiments);
      } catch (error) {
        setHashResult('Error computing hash');
      }
    } else {
      setHashResult('');
    }
  };

  const checkForDiscoveries = (newExp, prevExps) => {
    const newDiscoveries = new Set(discoveries);
    
    // Discovery: Same input = same output
    if (prevExps.some(exp => exp.input === newExp.input && exp.hash === newExp.hash)) {
      newDiscoveries.add('deterministic');
            }
    
    // Discovery: Similar inputs = very different outputs
    const similarInput = prevExps.find(exp => 
      Math.abs(exp.input.length - newExp.input.length) === 1 && 
      exp.input.substring(0, exp.input.length - 1) === newExp.input.substring(0, newExp.input.length - 1)
    );
    if (similarInput && similarInput.hash !== newExp.hash) {
      newDiscoveries.add('avalanche');
    }
    
    // Discovery: Any length → same fingerprint length
    if (prevExps.length > 2 && prevExps.every(exp => exp.hash.length === newExp.hash.length)) {
      newDiscoveries.add('fixed_length');
    }
    
    setDiscoveries(newDiscoveries);
  };
    
  const handleExperimentComplete = () => {
    if (currentExperiment < guidedExperiments.length - 1) {
      setCurrentExperiment(currentExperiment + 1);
    } else {
      // All experiments done
      onComplete({
        discoveries: Array.from(discoveries),
        experiments: experiments.length,
        totalInputVariations: new Set(experiments.map(e => e.input)).size
      });
    }
  };

  const currentGuide = guidedExperiments[currentExperiment];

        return (
    <div className="fingerprint-lab">
      <div className="lab-introduction">
        <h3>🧪 Welcome to the Digital Fingerprint Lab</h3>
        <p>Every piece of information can be transformed into a unique "digital fingerprint" using SHA-256. 
           Let's discover how this impossible-seeming magic actually works!</p>
            </div>

      <div className="guided-experiment">
        <div className="experiment-guide">
          <div className="guide-header">
            <span className="experiment-number">Experiment {currentExperiment + 1} of {guidedExperiments.length}</span>
            <h4>{currentGuide.instruction}</h4>
            <p className="purpose">{currentGuide.purpose}</p>
              </div>
              </div>

        <div className="hash-interface">
          <div className="input-section">
            <label>Your Input:</label>
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              placeholder="Start typing..."
              className="hash-input"
            />
              </div>

          <div className="transformation-arrow">
            <ArrowRight size={24} />
            <span>SHA-256</span>
            </div>

          <div className="output-section">
            <label>Digital Fingerprint:</label>
            <div className="hash-output">
              {hashResult || 'Type something to see the magic...'}
            </div>
            <div className="hash-properties">
              {hashResult && (
                <>
                  <span>Length: {hashResult.length} characters</span>
                  <span>Always this long!</span>
                </>
              )}
          </div>
          </div>
        </div>

        {input && hashResult && (
          <div className="experiment-completion">
            <div className="insight-gained">
              <strong>💡 Discovery:</strong> {currentGuide.insight}
            </div>
            <button className="next-experiment-button" onClick={handleExperimentComplete}>
              {currentExperiment < guidedExperiments.length - 1 ? 'Next Experiment' : 'Complete Lab'}
              <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>

      <div className="experiment-history">
        <h4>🔬 Your Experiment Log:</h4>
        <div className="history-grid">
          {experiments.slice(-3).map((exp, idx) => (
            <div key={idx} className="history-item">
              <div className="input-preview">"{exp.input.substring(0, 20)}..."</div>
              <div className="hash-preview">{exp.hash.substring(0, 16)}...</div>
            </div>
          ))}
        </div>
      </div>

      <div className="discoveries-panel">
        <h4>🎯 Your Discoveries:</h4>
        <div className="discovery-badges">
          {discoveries.has('deterministic') && (
            <div className="discovery-badge">🔄 Same Input = Same Fingerprint</div>
          )}
          {discoveries.has('avalanche') && (
            <div className="discovery-badge">⚡ Tiny Change = Total Transformation</div>
          )}
          {discoveries.has('fixed_length') && (
            <div className="discovery-badge">📏 Any Input = Same Fingerprint Length</div>
          )}
        </div>
      </div>
    </div>
        );
};

// Step 3: Impossible Challenge - Try to break the unbreakable
const ImpossibleChallengeStep = ({ onComplete }) => {
  const [challenge, setChallenge] = useState('collision');
  const [attempts, setAttempts] = useState([]);
  const [currentAttempt, setCurrentAttempt] = useState('');
  const [targetHash] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [gaveUp, setGaveUp] = useState(false);

  const challenges = {
    collision: {
      title: "🎯 Hash Collision Challenge",
      description: "Find two different messages that create the same fingerprint",
      target: "Create any hash, then try to find different text that creates the same hash",
      impossibility: "This would take longer than the age of the universe with all computers on Earth"
    },
    preimage: {
      title: "🔍 Reverse Engineering Challenge", 
      description: "Given this fingerprint, figure out what the original message was",
      target: "64ac12d4c4d0a47e0f3b5b7d8f9e2a1c5b8f3d2e1a9c8b7d6f5e4a3b2c1d0e9f8",
      impossibility: "Mathematically impossible - like unshredding paper back to original words"
    }
  };

  const handleAttempt = async () => {
    if (!currentAttempt) return;
    
    try {
      const hash = await sha256(currentAttempt);
      const newAttempt = {
        input: currentAttempt,
        hash,
        timestamp: Date.now(),
        success: challenge === 'collision' ? attempts.some(a => a.hash === hash && a.input !== currentAttempt) : hash === targetHash
      };
      
      setAttempts(prev => [...prev, newAttempt]);
      setCurrentAttempt('');
      
      if (newAttempt.success) {
        // This won't happen, but just in case!
        alert("🤯 IMPOSSIBLE! You've broken SHA-256! Please contact us immediately!");
      }
    } catch (error) {
      console.error('Hashing failed:', error);
    }
  };

  const handleGiveUp = () => {
    setGaveUp(true);
    setTimeout(() => {
      onComplete({
        challenge,
        attempts: attempts.length,
        gaveUp: true,
        insight: 'Cryptographic security comes from mathematical impossibility'
      });
    }, 2000);
  };

  const currentChallenge = challenges[challenge];

  return (
    <div className="impossible-challenge">
      <div className="challenge-intro">
        <h3>⚡ The Impossible Challenge</h3>
        <p>
          SHA-256 is called "cryptographically secure" because certain things are mathematically impossible. 
          Let's test this! Try to break the unbreakable...
        </p>

        <div className="challenge-selector">
          {Object.entries(challenges).map(([key, ch]) => (
            <button
              key={key} 
              className={`challenge-button ${challenge === key ? 'active' : ''}`}
              onClick={() => setChallenge(key)}
            >
              {ch.title}
            </button>
          ))}
        </div>
        </div>

      <div className="challenge-arena">
        <div className="challenge-description">
          <h4>{currentChallenge.title}</h4>
          <p>{currentChallenge.description}</p>
          
          {challenge === 'preimage' && (
            <div className="target-display">
              <strong>Target Hash:</strong>
              <code>{currentChallenge.target}</code>
            </div>
          )}
            </div>
            
        <div className="attempt-interface">
          <div className="input-area">
            <input
              type="text"
              value={currentAttempt}
              onChange={(e) => setCurrentAttempt(e.target.value)}
              placeholder="Enter your attempt..."
              className="challenge-input"
            />
            <button onClick={handleAttempt} className="attempt-button">
              Try It!
            </button>
          </div>
        </div>

        <div className="attempts-log">
          <h4>Your Attempts ({attempts.length}):</h4>
          <div className="attempts-grid">
            {attempts.slice(-5).map((attempt, idx) => (
              <div key={idx} className="attempt-item">
                <div className="attempt-input">"{attempt.input}"</div>
                <div className="attempt-hash">{attempt.hash.substring(0, 20)}...</div>
                <div className="attempt-result">
                  {attempt.success ? '🎉 SUCCESS!' : '❌ No match'}
                </div>
              </div>
            ))}
          </div>
        </div>

        {attempts.length >= 5 && !showHint && (
          <button className="hint-button" onClick={() => setShowHint(true)}>
            💡 Need a hint?
          </button>
        )}

        {showHint && (
          <div className="impossibility-hint">
            <h4>🤔 Why This Is Impossible:</h4>
            <p>{currentChallenge.impossibility}</p>
            <div className="give-up-section">
              <p>
                <strong>Ready to learn why this impossibility makes Bitcoin secure?</strong>
              </p>
              <button className="give-up-button" onClick={handleGiveUp}>
                I Give Up - Show Me Why This Matters
              </button>
          </div>
        </div>
        )}
      </div>

      {gaveUp && (
        <div className="impossibility-revelation">
          <h3>🛡️ The Security Revelation</h3>
          <p>
            <strong>You just experienced Bitcoin's security foundation!</strong>
          </p>
          <div className="security-insights">
            <div className="insight-item">
              <strong>🔒 Collision Resistance:</strong> Can't create fake transactions with same ID
            </div>
            <div className="insight-item">
              <strong>🔍 Preimage Resistance:</strong> Can't reverse-engineer private keys from addresses  
            </div>
            <div className="insight-item">
              <strong>⚡ One-Way Function:</strong> Easy to compute forward, impossible backward
            </div>
          </div>
          <p>
            This mathematical impossibility is what lets Bitcoin work without trusting anyone!
          </p>
        </div>
      )}
    </div>
  );
};

// Step 4: Bitcoin's Trust Machine - How Bitcoin uses hashes
const TrustMachineStep = ({ onComplete }) => {
  const [activeDemo, setActiveDemo] = useState('transaction');
  const [simulationStep, setSimulationStep] = useState(0);
  const [userVerification, setUserVerification] = useState(null);

  const demos = {
    transaction: {
      title: "💸 Transaction Verification",
      description: "See how you verify a Bitcoin transaction without trusting anyone",
      steps: [
        {
          title: "1. Transaction Data",
          content: "Someone claims they sent you 1 Bitcoin",
          data: "Alice → Bob: 1 BTC"
        },
        {
          title: "2. Create Fingerprint", 
          content: "Hash the transaction data",
          data: "SHA-256(Alice → Bob: 1 BTC) = 9f86d0..."
        },
        {
          title: "3. Check Block",
          content: "Find this fingerprint in the blockchain",
          data: "Block 750,000 contains: 9f86d0..."
        },
        {
          title: "4. Verified!",
          content: "Mathematical proof - no trust required!",
          data: "✅ Transaction is real"
        }
      ]
    },
    block: {
      title: "🧱 Block Verification",
      description: "See how anyone can verify a Bitcoin block is valid",
      steps: [
        {
          title: "1. Block Contents",
          content: "Block contains many transactions",
          data: "1000 transactions in block"
        },
        {
          title: "2. Create Merkle Root",
          content: "Hash all transactions into one fingerprint", 
          data: "Merkle Root: a1b2c3..."
        },
        {
          title: "3. Block Header Hash",
          content: "Hash the block header with merkle root",
          data: "Block Hash: 00000abc... (starts with zeros!)"
        },
        {
          title: "4. Difficulty Check",
          content: "Verify hash meets difficulty requirement",
          data: "✅ Valid proof-of-work"
        }
      ]
    }
  };

  const handleVerification = (verified) => {
    setUserVerification(verified);
    setTimeout(() => {
      onComplete({
        demo: activeDemo,
        userUnderstanding: verified ? 'understood' : 'needs_review',
        completedSteps: simulationStep + 1
      });
    }, 1500);
  };

  const currentDemo = demos[activeDemo];
  const currentStep = currentDemo.steps[simulationStep];

  return (
    <div className="trust-machine">
      <div className="machine-intro">
        <h3>🛡️ Bitcoin's Trust Machine</h3>
        <p>
          Bitcoin replaces "trust me" with "verify this mathematical proof." 
          Let's see exactly how this works in practice!
        </p>
      </div>

      <div className="demo-selector">
        {Object.entries(demos).map(([key, demo]) => (
          <button
            key={key}
            className={`demo-button ${activeDemo === key ? 'active' : ''}`}
            onClick={() => {
              setActiveDemo(key);
              setSimulationStep(0);
              setUserVerification(null);
            }}
          >
            {demo.title}
          </button>
        ))}
      </div>

      <div className="verification-simulation">
        <div className="demo-header">
          <h4>{currentDemo.title}</h4>
          <p>{currentDemo.description}</p>
        </div>

        <div className="simulation-steps">
          <div className="step-progress">
            {currentDemo.steps.map((_, idx) => (
              <div 
                key={idx}
                className={`step-indicator ${idx <= simulationStep ? 'completed' : ''} ${idx === simulationStep ? 'active' : ''}`}
              />
            ))}
          </div>

          <div className="current-step">
            <div className="step-content">
              <h4>{currentStep.title}</h4>
              <p>{currentStep.content}</p>
              <div className="step-data">
                <code>{currentStep.data}</code>
              </div>
            </div>

            <div className="step-actions">
              {simulationStep < currentDemo.steps.length - 1 ? (
                <button 
                  className="next-step-button"
                  onClick={() => setSimulationStep(simulationStep + 1)}
                >
                  Next Step <ArrowRight size={16} />
                </button>
              ) : (
                <div className="verification-check">
                  <h4>🤔 Do you understand how this eliminates trust?</h4>
                  <div className="verification-buttons">
                    <button 
                      className="verify-button understand"
                      onClick={() => handleVerification(true)}
            >
                      <CheckCircle size={16} />
                      Yes! I can verify without trusting anyone
                    </button>
                    <button 
                      className="verify-button confused"
                      onClick={() => handleVerification(false)}
                    >
                      <AlertTriangle size={16} />
                      Still confused - need to review
                    </button>
                  </div>
        </div>
      )}
            </div>
          </div>
        </div>
      </div>

      <div className="trust-comparison">
        <h4>🔄 Traditional vs Bitcoin Verification</h4>
        <div className="comparison-grid">
          <div className="traditional-way">
            <h5>🏛️ Traditional Way</h5>
            <ul>
              <li>Ask bank "Is this real?"</li>
              <li>Trust bank's answer</li>
              <li>Hope bank isn't lying</li>
              <li>Hope bank wasn't hacked</li>
            </ul>
          </div>
          <div className="bitcoin-way">
            <h5>₿ Bitcoin Way</h5>
            <ul>
              <li>Check mathematical proof</li>
              <li>Verify hash matches data</li>
              <li>Mathematics can't lie</li>
              <li>No trust required!</li>
            </ul>
          </div>
        </div>
      </div>

      {userVerification && (
        <div className="verification-result">
          {userVerification ? (
            <div className="understanding-confirmed">
              <h4>🎉 You Get It!</h4>
              <p>
                You understand how Bitcoin uses mathematical proof to eliminate trust. 
                This is the breakthrough that makes peer-to-peer digital money possible!
              </p>
            </div>
          ) : (
            <div className="need-review">
              <h4>🤔 No Problem!</h4>
              <p>
                This concept is revolutionary - it's normal to need time to fully grasp it. 
                The key insight: mathematical proof replaces human trust.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Step 5: Chain of Truth - Interactive blockchain visualization
const ChainOfTruthStep = ({ onComplete }) => {
  const [blocks, setBlocks] = useState([
    { id: 0, data: "Genesis Block", hash: "000abc", prevHash: "000000" },
    { id: 1, data: "Alice → Bob: 1 BTC", hash: "000def", prevHash: "000abc" },
    { id: 2, data: "Bob → Carol: 0.5 BTC", hash: "000ghi", prevHash: "000def" }
  ]);
  const [selectedBlock, setSelectedBlock] = useState(null);
  const [tampering, setTampering] = useState(false);
  const [brokenChain, setBrokenChain] = useState(false);

  const handleTamperAttempt = async (blockId, newData) => {
    setTampering(true);
    
    // Simulate tampered hash calculation
    const newHash = await sha256(newData + blocks[blockId].prevHash);
    
    const tamperedBlocks = [...blocks];
    tamperedBlocks[blockId] = {
      ...tamperedBlocks[blockId],
      data: newData,
      hash: newHash
    };
    
    setBlocks(tamperedBlocks);
    setBrokenChain(true);
    
    // Show the chain is broken
    setTimeout(() => {
      setTampering(false);
    }, 2000);
  };

  const handleFixChain = () => {
    // Reset to original state
    setBlocks([
      { id: 0, data: "Genesis Block", hash: "000abc", prevHash: "000000" },
      { id: 1, data: "Alice → Bob: 1 BTC", hash: "000def", prevHash: "000abc" },
      { id: 2, data: "Bob → Carol: 0.5 BTC", hash: "000ghi", prevHash: "000def" }
    ]);
    setBrokenChain(false);
  };

  const isChainValid = () => {
    for (let i = 1; i < blocks.length; i++) {
      if (blocks[i].prevHash !== blocks[i - 1].hash) {
        return false;
      }
    }
    return true;
  };

  const handleComplete = () => {
    onComplete({
      experiencedTampering: brokenChain,
      understandsImmutability: true,
      blocksExplored: selectedBlock ? selectedBlock.id + 1 : blocks.length
    });
  };

  return (
    <div className="chain-of-truth">
      <div className="chain-intro">
        <h3>🔗 The Unbreakable Chain</h3>
        <p>
          Each block's fingerprint depends on the previous block's fingerprint. 
          This creates an unbreakable chain - try to break it!
        </p>
      </div>

      <div className="blockchain-visualization">
        <div className="chain-status">
          <div className={`status-indicator ${isChainValid() ? 'valid' : 'broken'}`}>
            {isChainValid() ? '✅ Chain Valid' : '❌ Chain Broken'}
          </div>
          {tampering && <div className="tampering-indicator">🔧 Tampering in progress...</div>}
      </div>
      
        <div className="blocks-container">
          {blocks.map((block, index) => (
            <div key={block.id} className="block-chain-item">
              <div 
                className={`block ${selectedBlock?.id === block.id ? 'selected' : ''} ${
                  index > 0 && blocks[index].prevHash !== blocks[index - 1].hash ? 'invalid' : ''
                }`}
                onClick={() => setSelectedBlock(block)}
              >
                <div className="block-header">
                  <span className="block-id">Block {block.id}</span>
                  <div className="block-hash">
                    <strong>Hash:</strong> {block.hash}
        </div>
        </div>
                <div className="block-content">
                  <div className="block-data">
                    <strong>Data:</strong> {block.data}
                  </div>
                  <div className="prev-hash">
                    <strong>Previous Hash:</strong> {block.prevHash}
                  </div>
        </div>
      </div>

              {index < blocks.length - 1 && (
                <div className={`chain-link ${
                  blocks[index + 1].prevHash === block.hash ? 'valid' : 'broken'
                }`}>
                  <ArrowRight size={24} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="tampering-experiment">
        <h4>🔧 Try to Tamper with the Chain</h4>
        <p>Change the data in any block and watch what happens to the chain:</p>
        
        <div className="tamper-controls">
          <button 
            className="tamper-button"
            onClick={() => handleTamperAttempt(1, "Alice → Mallory: 100 BTC")}
          >
            🎭 Change Block 1 Data
          </button>
          <button 
            className="tamper-button"
            onClick={() => handleTamperAttempt(2, "Bob → Mallory: 50 BTC")}
        >
            💰 Change Block 2 Data
          </button>
      </div>

        {brokenChain && (
          <div className="broken-chain-explanation">
            <h4>🔧 Chain Broken!</h4>
            <p>
              When you changed the block data, its hash changed. But the next block still 
              references the old hash! This breaks the chain and makes the tampering obvious.
            </p>
            <div className="fix-options">
              <button className="fix-button" onClick={handleFixChain}>
                🔧 Reset Chain
              </button>
              <div className="impossibility-note">
                <strong>In Bitcoin:</strong> To hide your tampering, you'd need to recalculate 
                ALL subsequent blocks faster than the entire network. This is computationally impossible!
            </div>
            </div>
        </div>
      )}
      </div>

      <div className="immutability-insight">
        <h4>🛡️ Why This Makes Bitcoin Immutable</h4>
        <div className="insight-points">
          <div className="insight-point">
            <strong>🔗 Chained Hashes:</strong> Every block depends on the previous block's fingerprint
          </div>
          <div className="insight-point">
            <strong>⚡ Proof of Work:</strong> Changing history requires redoing all the computational work
          </div>
          <div className="insight-point">
            <strong>🌐 Network Consensus:</strong> Majority of network must agree on the valid chain
          </div>
        </div>
        
        <button className="complete-step-button" onClick={handleComplete}>
          <Trophy size={20} />
          I Understand Bitcoin's Immutability
        </button>
      </div>
    </div>
  );
};

// Step 6: Digital Sovereignty - Personal stakes and reflection
const DigitalSovereigntyStep = ({ onComplete, userInsights }) => {
  const [personalReflection, setPersonalReflection] = useState('');
  const [selectedCommitment, setSelectedCommitment] = useState(null);
  const [showInsights, setShowInsights] = useState(false);

  const commitmentOptions = [
    {
      id: 'verify',
      title: "🔍 I commit to verifying, not trusting",
      description: "I'll learn to verify Bitcoin transactions myself instead of trusting others"
    },
    {
      id: 'understand',
      title: "🧠 I want to understand the math",
      description: "I'll dive deeper into the cryptography that secures my wealth"
    },
    {
      id: 'educate',
      title: "🎓 I'll educate others",
      description: "I'll help others understand why mathematical proof beats trust"
    },
    {
      id: 'apply',
      title: "⚡ I'll apply this knowledge",
      description: "I'll use this understanding to make better financial decisions"
    }
  ];

  const handleComplete = () => {
    onComplete({
      personalReflection,
      commitment: selectedCommitment,
      completedJourney: true,
      insights: userInsights
    });
  };

  return (
    <div className="digital-sovereignty">
      <div className="sovereignty-intro">
        <h3>👑 Your Digital Sovereignty</h3>
        <p>
          You've just learned how mathematical proof replaces human trust. 
          This knowledge gives you power - the power to verify truth yourself.
        </p>
      </div>

      <div className="journey-recap">
        <h4>🗺️ Your Journey Through Digital Trust</h4>
        <div className="recap-steps">
          <div className="recap-step">
            <span className="step-emoji">🔍</span>
            <span>Discovered the trust problem in traditional systems</span>
          </div>
          <div className="recap-step">
            <span className="step-emoji">🎭</span>
            <span>Experienced how digital fingerprints work</span>
          </div>
          <div className="recap-step">
            <span className="step-emoji">⚡</span>
            <span>Tried (and failed) to break cryptographic security</span>
          </div>
          <div className="recap-step">
            <span className="step-emoji">🛡️</span>
            <span>Saw how Bitcoin eliminates human trust</span>
          </div>
          <div className="recap-step">
            <span className="step-emoji">🔗</span>
            <span>Understood why blockchain history is immutable</span>
          </div>
        </div>
      </div>

      <div className="personal-stakes">
        <h4>💰 What This Means for Your Money</h4>
        <div className="stakes-grid">
          <div className="stake-item">
            <h5>🔒 Your Security</h5>
            <p>Your Bitcoin is secured by mathematical impossibility, not promises</p>
          </div>
          <div className="stake-item">
            <h5>🌍 Your Freedom</h5>
            <p>You can verify transactions globally without asking permission</p>
          </div>
          <div className="stake-item">
            <h5>⚡ Your Power</h5>
            <p>You don't need to trust banks, governments, or any authority</p>
          </div>
          <div className="stake-item">
            <h5>🛡️ Your Sovereignty</h5>
            <p>Mathematical proof works the same for everyone, everywhere</p>
          </div>
        </div>
      </div>

      <div className="reflection-section">
        <h4>🤔 Personal Reflection</h4>
        <p>How does understanding cryptographic hashing change your perspective on money and trust?</p>
      <textarea
          value={personalReflection}
          onChange={(e) => setPersonalReflection(e.target.value)}
          placeholder="Share your thoughts on how mathematical proof compares to trusting institutions..."
        className="reflection-textarea"
        />
      </div>
      
      <div className="commitment-section">
        <h4>⚡ Your Commitment to Digital Sovereignty</h4>
        <p>Choose how you'll apply this knowledge:</p>
        <div className="commitment-options">
          {commitmentOptions.map((option) => (
            <button
              key={option.id}
              className={`commitment-option ${selectedCommitment === option.id ? 'selected' : ''}`}
              onClick={() => setSelectedCommitment(option.id)}
            >
              <h5>{option.title}</h5>
              <p>{option.description}</p>
            </button>
          ))}
        </div>
      </div>
      
      <div className="next-steps">
        <h4>🚀 Next on Your Bitcoin Journey</h4>
        <p>
          Now that you understand how hashing creates digital trust, you're ready to learn 
          how <strong>mining</strong> uses this mathematical proof to secure the entire Bitcoin network.
        </p>
        
        <div className="bridge-to-mining">
          <div className="bridge-content">
            <h5>⛏️ Coming Up: Mining</h5>
            <p>
              Discover how miners use the hash impossibility you just experienced to 
              transform electrical energy into unbreakable network security.
            </p>
          </div>
        </div>
      </div>
        
      {personalReflection && selectedCommitment && (
        <button className="complete-module-button" onClick={handleComplete}>
          <Trophy size={20} />
          Complete Digital Fingerprints Mastery
        </button>
      )}

      {!showInsights && userInsights && Object.keys(userInsights).length > 0 && (
        <button 
          className="show-insights-button"
          onClick={() => setShowInsights(true)}
        >
          📊 View My Learning Insights
        </button>
      )}

      {showInsights && (
        <div className="learning-insights">
          <h4>📊 Your Learning Journey Data</h4>
          <div className="insights-grid">
            {Object.entries(userInsights).map(([step, data]) => (
              <div key={step} className="insight-item">
                <strong>Step {parseInt(step) + 1}:</strong>
                <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HashingModule; 