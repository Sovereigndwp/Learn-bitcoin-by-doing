import React, { useState, useEffect, useCallback } from 'react';
import { sha256 } from '../utils/bitcoin';
import { 
  ContinueButton, 
  ActionButton, 
  OptionButton, 
  NavigationButton, 
  PopupButton 
} from '../components/EnhancedButtons';
import './HashingModule.css';

const HashingModule = () => {
  // Core crisis state management
  const [crisisPhase, setCrisisPhase] = useState('trust_collapse_detective');
  const [crisisIntensity, setCrisisIntensity] = useState(0);
  const [architectLevel, setArchitectLevel] = useState(1);
  const [masteryPoints, setMasteryPoints] = useState(0);
  const [totalTrustEliminated, setTotalTrustEliminated] = useState(0);

  // Cryptographic mastery state
  const [trustCollapseAlerts, setTrustCollapseAlerts] = useState([]);
  const [cryptographicProofs, setCryptographicProofs] = useState({ verified: 0, mastery: 0 });
  const [impossibilityMastery, setImpossibilityMastery] = useState({ attempts: 0, understanding: 0 });
  const [trustMachineArchitecture, setTrustMachineArchitecture] = useState({ systems: [], efficiency: 0 });
  const [chainIntegrity, setChainIntegrity] = useState({ blocks: 0, security: 0 });
  const [digitalSovereignty, setDigitalSovereignty] = useState({ sovereignty: 0, independence: 0 });

  // Interactive challenge state
  const [activeChallenge, setActiveChallenge] = useState(null);
  const [challengeProgress, setChallengeProgress] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [hashResult, setHashResult] = useState('');
  const [feedback, setFeedback] = useState('');
  const [showHint, setShowHint] = useState(false);

  // Crisis scenarios and challenges
  const crisisScenarios = {
    trust_collapse_detective: {
      title: "Trust Collapse Detective",
      crisis: "Global Trust System Collapse",
      description: "Banks are failing, governments are lying, and institutions are corrupt. As a Trust Collapse Detective, you must investigate why human trust systems are fundamentally broken and find the mathematical alternative.",
      objective: "Investigate trust system failures and discover cryptographic proof solutions",
      threat: "Complete societal trust breakdown",
      urgency: "CRITICAL",
      challenges: [
        {
          id: 'trust_failure_analysis',
          title: 'Trust Failure Pattern Analysis',
          description: 'Analyze why human trust systems inevitably fail',
          type: 'trust_analysis',
          difficulty: 'detective'
        },
        {
          id: 'proof_discovery',
          title: 'Mathematical Proof Discovery',
          description: 'Discover how mathematics can replace human trust',
          type: 'proof_discovery',
          difficulty: 'detective'
        }
      ]
    },
    cryptographic_proof_engineer: {
      title: "Cryptographic Proof Engineer",
      crisis: "Verification Crisis Emergency",
      description: "Without trust, how do you verify anything? As a Cryptographic Proof Engineer, you must engineer unbreakable mathematical proofs using hash functions to create absolute verification.",
      objective: "Engineer cryptographic proof systems using hash functions",
      threat: "Inability to verify any information",
      urgency: "HIGH",
      challenges: [
        {
          id: 'hash_engineering',
          title: 'Hash Function Engineering',
          description: 'Engineer perfect hash functions for digital fingerprinting',
          type: 'hash_engineering',
          difficulty: 'engineer'
        },
        {
          id: 'proof_construction',
          title: 'Cryptographic Proof Construction',
          description: 'Construct mathematical proofs that eliminate human trust',
          type: 'proof_construction',
          difficulty: 'engineer'
        }
      ]
    },
    impossibility_proof_master: {
      title: "Impossibility Proof Master",
      crisis: "Mathematical Impossibility Challenge",
      description: "Critics claim cryptographic hashing can be broken. As an Impossibility Proof Master, you must prove the mathematical impossibility of breaking properly designed hash functions.",
      objective: "Master the art of proving mathematical impossibility",
      threat: "Doubt in cryptographic security",
      urgency: "HIGH",
      challenges: [
        {
          id: 'impossibility_proof',
          title: 'Hash Impossibility Proof',
          description: 'Prove the mathematical impossibility of reversing hash functions',
          type: 'impossibility_proof',
          difficulty: 'master'
        },
        {
          id: 'collision_resistance',
          title: 'Collision Resistance Mastery',
          description: 'Master the impossibility of finding hash collisions',
          type: 'collision_resistance',
          difficulty: 'master'
        }
      ]
    },
    trust_machine_architect: {
      title: "Trust Machine Architect",
      crisis: "Trust Machine Construction Crisis",
      description: "Bitcoin needs a trust machine that never fails. As a Trust Machine Architect, you must architect the perfect trustless verification system using cryptographic proofs.",
      objective: "Architect flawless trustless verification systems",
      threat: "Trust machine failure",
      urgency: "CRITICAL",
      challenges: [
        {
          id: 'trustless_architecture',
          title: 'Trustless System Architecture',
          description: 'Architect systems that require zero human trust',
          type: 'trustless_architecture',
          difficulty: 'architect'
        },
        {
          id: 'verification_perfection',
          title: 'Verification Perfection',
          description: 'Create perfect verification systems using hash functions',
          type: 'verification_perfection',
          difficulty: 'architect'
        }
      ]
    },
    chain_integrity_guardian: {
      title: "Chain Integrity Guardian",
      crisis: "Blockchain Integrity Crisis",
      description: "The Bitcoin blockchain must be unbreakable. As a Chain Integrity Guardian, you must secure the blockchain foundation using cryptographic hash chains.",
      objective: "Guard blockchain integrity using cryptographic hash chains",
      threat: "Blockchain corruption",
      urgency: "MAXIMUM",
      challenges: [
        {
          id: 'chain_security',
          title: 'Hash Chain Security Mastery',
          description: 'Master the art of securing blockchain with hash chains',
          type: 'chain_security',
          difficulty: 'guardian'
        },
        {
          id: 'integrity_protection',
          title: 'Integrity Protection Systems',
          description: 'Protect blockchain integrity against all attacks',
          type: 'integrity_protection',
          difficulty: 'guardian'
        }
      ]
    },
    digital_sovereignty_defender: {
      title: "Digital Sovereignty Defender",
      crisis: "Digital Sovereignty Defense",
      description: "You've achieved mastery over cryptographic proof. As a Digital Sovereignty Defender, you must defend mathematical sovereignty against all trust-based attacks.",
      objective: "Defend digital sovereignty using cryptographic mastery",
      threat: "Sovereignty erosion",
      urgency: "ETERNAL",
      challenges: [
        {
          id: 'sovereignty_defense',
          title: 'Digital Sovereignty Defense',
          description: 'Defend digital sovereignty against trust-based attacks',
          type: 'sovereignty_defense',
          difficulty: 'sovereign'
        },
        {
          id: 'proof_legacy',
          title: 'Cryptographic Proof Legacy',
          description: 'Create lasting cryptographic proof systems',
          type: 'proof_legacy',
          difficulty: 'sovereign'
        }
      ]
    }
  };

  // Challenge implementations
  const challengeImplementations = {
    trust_failure_analysis: {
      question: "Why do human trust systems inevitably fail? Choose the fundamental reason:",
      options: [
        "Humans are inherently evil",
        "Humans have conflicting incentives",
        "Systems become too complex",
        "Trust requires verification, but verification requires trust"
      ],
      correctAnswer: 3,
      explanation: "The fundamental problem is circular: trust requires verification, but verification requires trust. This creates an infinite regress that can only be solved by mathematics.",
      reward: 100
    },
    proof_discovery: {
      question: "What makes mathematical proof superior to human trust?",
      options: [
        "Mathematics is faster",
        "Mathematics is cheaper",
        "Mathematics is deterministic and verifiable",
        "Mathematics is more popular"
      ],
      correctAnswer: 2,
      explanation: "Mathematical proof is superior because it's deterministic (same input always produces same output) and independently verifiable by anyone.",
      reward: 150
    },
    hash_engineering: {
      question: "Hash the word 'Bitcoin' and find the first character of the result:",
      type: 'hash_input',
      answer: "b",
      hint: "Use SHA-256 to hash 'Bitcoin' and look at the first character",
      validator: (input) => {
        const hash = sha256('Bitcoin');
        return input.toLowerCase() === hash.charAt(0).toLowerCase();
      },
      reward: 200
    },
    proof_construction: {
      question: "If you change 'Bitcoin' to 'bitcoin' (lowercase), how many characters change in the hash?",
      type: 'hash_comparison',
      answer: "most",
      hint: "Hash both 'Bitcoin' and 'bitcoin' and compare the results",
      validator: (input) => {
        const hash1 = sha256('Bitcoin');
        const hash2 = sha256('bitcoin');
        let differences = 0;
        for (let i = 0; i < hash1.length; i++) {
          if (hash1[i] !== hash2[i]) differences++;
        }
        return input.toLowerCase().includes('most') || input.toLowerCase().includes('many') || differences > 30;
      },
      reward: 250
    },
    impossibility_proof: {
      question: "Try to find the original input that produced this hash: 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3'",
      type: 'reverse_hash',
      answer: "impossible",
      hint: "This demonstrates the one-way nature of hash functions",
      validator: (input) => input.toLowerCase().includes('impossible') || input.toLowerCase().includes('cannot'),
      reward: 300
    },
    collision_resistance: {
      question: "How many attempts would it take on average to find two inputs that produce the same SHA-256 hash?",
      options: [
        "1,000 attempts",
        "1,000,000 attempts", 
        "2^128 attempts",
        "2^256 attempts"
      ],
      correctAnswer: 2,
      explanation: "Due to the birthday paradox, finding a collision in SHA-256 requires approximately 2^128 attempts, which is computationally infeasible.",
      reward: 350
    },
    trustless_architecture: {
      question: "In a trustless system, what replaces human trust?",
      options: [
        "Government regulation",
        "Mathematical proof",
        "Social consensus",
        "Economic incentives"
      ],
      correctAnswer: 1,
      explanation: "Mathematical proof replaces human trust because it's verifiable, deterministic, and doesn't require trusting any person or institution.",
      reward: 400
    },
    verification_perfection: {
      question: "What property of hash functions makes them perfect for verification?",
      options: [
        "They're fast to compute",
        "They're deterministic and one-way",
        "They're easy to understand",
        "They're widely adopted"
      ],
      correctAnswer: 1,
      explanation: "Hash functions are perfect for verification because they're deterministic (same input = same output) and one-way (can't reverse the process).",
      reward: 450
    },
    chain_security: {
      question: "How does changing one character in a block affect the entire blockchain?",
      options: [
        "Only that block changes",
        "That block and the next block change",
        "All subsequent blocks become invalid",
        "Nothing changes"
      ],
      correctAnswer: 2,
      explanation: "Changing one character changes the block's hash, which breaks the chain reference in the next block, invalidating all subsequent blocks.",
      reward: 500
    },
    integrity_protection: {
      question: "What makes blockchain integrity tamper-evident?",
      options: [
        "Government oversight",
        "Cryptographic hash chains",
        "Social consensus",
        "Economic incentives"
      ],
      correctAnswer: 1,
      explanation: "Cryptographic hash chains make any tampering immediately detectable because changing any data breaks the mathematical chain of proof.",
      reward: 550
    },
    sovereignty_defense: {
      question: "How does cryptographic proof enable digital sovereignty?",
      options: [
        "By making transactions faster",
        "By reducing costs",
        "By eliminating the need to trust authorities",
        "By increasing privacy"
      ],
      correctAnswer: 2,
      explanation: "Cryptographic proof enables digital sovereignty by eliminating the need to trust any authority - you can verify everything yourself mathematically.",
      reward: 600
    },
    proof_legacy: {
      question: "What is the ultimate legacy of cryptographic proof?",
      type: 'open_ended',
      answer: "freedom",
      hint: "Think about what happens when you don't need to trust anyone",
      validator: (input) => input.toLowerCase().includes('freedom') || input.toLowerCase().includes('sovereignty') || input.toLowerCase().includes('independence'),
      reward: 700
    }
  };

  // Crisis alert system
  const generateTrustCollapseAlert = useCallback(() => {
    const alerts = [
      "🚨 BREAKING: Major bank declares bankruptcy - trust system failing",
      "⚠️ CRITICAL: Government currency manipulation detected - trust eroding",
      "🔥 URGENT: Financial institution fraud exposed - trust crisis deepening",
      "💥 ALERT: Trust-based verification system compromised - immediate action required",
      "⚡ CRISIS: Human trust networks collapsing worldwide - mathematical proof needed",
      "🛡️ DEFEND: Digital sovereignty under attack - cryptographic proof required"
    ];
    
    const newAlert = {
      id: Date.now(),
      message: alerts[Math.floor(Math.random() * alerts.length)],
      timestamp: new Date().toLocaleTimeString(),
      intensity: Math.floor(Math.random() * 100) + 1
    };
    
    setTrustCollapseAlerts(prev => [newAlert, ...prev.slice(0, 4)]);
    setCrisisIntensity(prev => Math.min(prev + 10, 100));
  }, []);

  // Initialize crisis alerts
  useEffect(() => {
    generateTrustCollapseAlert();
    const interval = setInterval(generateTrustCollapseAlert, 7000);
    return () => clearInterval(interval);
  }, [generateTrustCollapseAlert]);

  // Handle challenge completion
  const handleChallengeComplete = (challengeId, success) => {
    if (success) {
      const challenge = challengeImplementations[challengeId];
      setMasteryPoints(prev => prev + challenge.reward);
      setTotalTrustEliminated(prev => prev + 1);
      setCrisisIntensity(prev => Math.max(prev - 15, 0));
      
      // Update specific mastery systems
      switch (crisisPhase) {
        case 'trust_collapse_detective':
          setTrustCollapseAlerts(prev => prev.map(alert => ({ ...alert, resolved: true })));
          break;
        case 'cryptographic_proof_engineer':
          setCryptographicProofs(prev => ({ 
            ...prev, 
            verified: prev.verified + 1,
            mastery: prev.mastery + 20
          }));
          break;
        case 'impossibility_proof_master':
          setImpossibilityMastery(prev => ({
            ...prev,
            attempts: prev.attempts + 1,
            understanding: prev.understanding + 25
          }));
          break;
        case 'trust_machine_architect':
          setTrustMachineArchitecture(prev => ({
            ...prev,
            systems: [...prev.systems, challengeId],
            efficiency: prev.efficiency + 15
          }));
          break;
        case 'chain_integrity_guardian':
          setChainIntegrity(prev => ({
            ...prev,
            blocks: prev.blocks + 1,
            security: prev.security + 20
          }));
          break;
        case 'digital_sovereignty_defender':
          setDigitalSovereignty(prev => ({
            ...prev,
            sovereignty: prev.sovereignty + 25,
            independence: prev.independence + 20
          }));
          break;
      }
      
      setFeedback(`🎯 PROOF MASTERY ACHIEVED! +${challenge.reward} points`);
      
      // Check for phase advancement
      if (masteryPoints + challenge.reward >= architectLevel * 500) {
        advancePhase();
      }
    } else {
      setFeedback("❌ Trust crisis continues - strengthen your cryptographic proof");
      setCrisisIntensity(prev => Math.min(prev + 5, 100));
    }
  };

  // Phase advancement system
  const advancePhase = () => {
    const phases = Object.keys(crisisScenarios);
    const currentIndex = phases.indexOf(crisisPhase);
    
    if (currentIndex < phases.length - 1) {
      setCrisisPhase(phases[currentIndex + 1]);
      setArchitectLevel(prev => prev + 1);
      setFeedback(`🚀 PHASE ADVANCED! You are now a ${crisisScenarios[phases[currentIndex + 1]].title}`);
    } else {
      setFeedback("👑 ULTIMATE MASTERY ACHIEVED! You are the Digital Sovereignty Defender!");
    }
  };

  // Challenge submission handler
  const handleSubmit = () => {
    if (!activeChallenge) return;
    
    const challenge = challengeImplementations[activeChallenge.id];
    let isCorrect = false;
    
    if (challenge.type === 'hash_input' || challenge.type === 'hash_comparison' || challenge.type === 'reverse_hash' || challenge.type === 'open_ended') {
      isCorrect = challenge.validator(userInput);
      if (challenge.type === 'hash_input' && userInput.toLowerCase() === 'bitcoin') {
        setHashResult(sha256('Bitcoin'));
      }
    } else if (challenge.options) {
      isCorrect = parseInt(userInput) === challenge.correctAnswer;
    }
    
    handleChallengeComplete(activeChallenge.id, isCorrect);
    
    if (isCorrect) {
      setActiveChallenge(null);
      setUserInput('');
      setHashResult('');
      setShowHint(false);
    }
  };

  // Start challenge
  const startChallenge = (challenge) => {
    setActiveChallenge(challenge);
    setUserInput('');
    setHashResult('');
    setFeedback('');
    setShowHint(false);
  };

  // Hash demonstration
  const demonstrateHash = (input) => {
    if (input) {
      setHashResult(sha256(input));
    } else {
      setHashResult('');
    }
  };

  const currentScenario = crisisScenarios[crisisPhase];

        return (
    <div className="hashing-module">
      {/* Crisis Command Center */}
      <div className="crisis-command-center">
        <div className="crisis-header">
          <h1 className="crisis-title">Cryptographic Proof Crisis Architect</h1>
          <div className="crisis-status">
            <div className="architect-level">Level {architectLevel} {currentScenario.title}</div>
            <div className="mastery-points">{masteryPoints} Mastery Points</div>
            <div className="crisis-meter">
              <div 
                className="crisis-intensity" 
                style={{ width: `${crisisIntensity}%` }}
              />
              <span>Crisis: {crisisIntensity}%</span>
            </div>
          </div>
        </div>

        {/* Trust Collapse Alerts */}
        <div className="crisis-alerts">
          <h3>🚨 Trust Collapse Feed</h3>
          <div className="alerts-container">
            {trustCollapseAlerts.map(alert => (
              <div 
                key={alert.id} 
                className={`crisis-alert ${alert.resolved ? 'resolved' : ''}`}
              >
                <span className="alert-time">{alert.timestamp}</span>
                <span className="alert-message">{alert.message}</span>
                <span className="alert-intensity">{alert.intensity}%</span>
              </div>
            ))}
              </div>
              </div>
            </div>

      {/* Current Crisis Scenario */}
      <div className="crisis-scenario">
        <div className="scenario-header">
          <h2>{currentScenario.title}</h2>
          <div className="crisis-badge">{currentScenario.urgency}</div>
            </div>
        
        <div className="crisis-description">
          <h3>🔥 {currentScenario.crisis}</h3>
          <p>{currentScenario.description}</p>
          <div className="objective">
            <strong>Mission:</strong> {currentScenario.objective}
          </div>
          <div className="threat">
            <strong>Threat:</strong> {currentScenario.threat}
          </div>
      </div>

        {/* Crisis Challenges */}
        <div className="crisis-challenges">
          <h3>⚡ Active Challenges</h3>
          <div className="challenges-grid">
            {currentScenario.challenges.map(challenge => (
              <div key={challenge.id} className="challenge-card">
                <h4>{challenge.title}</h4>
                <p>{challenge.description}</p>
                <div className="challenge-meta">
                  <span className="challenge-type">{challenge.type}</span>
                  <span className="challenge-difficulty">{challenge.difficulty}</span>
                </div>
                <ActionButton 
                  className="challenge-start-btn"
                  onClick={() => startChallenge(challenge)}
                  variant="crisis"
                  size="small"
                >
                  Begin Challenge
                </ActionButton>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Active Challenge Interface */}
      {activeChallenge && (
        <div className="active-challenge">
          <div className="challenge-header">
            <h3>🎯 {activeChallenge.title}</h3>
            <NavigationButton
              className="challenge-close"
              onClick={() => setActiveChallenge(null)}
              variant="close"
              size="small"
            >
              ×
            </NavigationButton>
        </div>
          
          <div className="challenge-content">
            <div className="challenge-question">
              {challengeImplementations[activeChallenge.id].question}
            </div>
            
            {challengeImplementations[activeChallenge.id].options ? (
              <div className="challenge-options">
                {challengeImplementations[activeChallenge.id].options.map((option, index) => (
                  <OptionButton
                    key={index}
                    className={`option-btn ${userInput === index.toString() ? 'selected' : ''}`}
                    onClick={() => setUserInput(index.toString())}
                    selected={userInput === index.toString()}
                    variant="quiz"
                  >
                    {option}
                  </OptionButton>
                ))}
              </div>
            ) : (
              <div className="challenge-input">
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => {
                    setUserInput(e.target.value);
                    if (challengeImplementations[activeChallenge.id].type === 'hash_input') {
                      demonstrateHash(e.target.value);
                    }
                  }}
                  placeholder="Enter your answer..."
                  onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                />
                <ActionButton 
                  onClick={handleSubmit}
                  variant="primary"
                  size="small"
                >
                  Submit
                </ActionButton>
              </div>
            )}
            
            {hashResult && (
              <div className="hash-result">
                <h4>Hash Result:</h4>
                <div className="hash-display">{hashResult}</div>
              </div>
            )}
            
            {showHint && challengeImplementations[activeChallenge.id].hint && (
              <div className="challenge-hint">
                💡 {challengeImplementations[activeChallenge.id].hint}
              </div>
            )}
            
            {challengeImplementations[activeChallenge.id].hint && (
              <PopupButton 
                className="hint-btn"
                onClick={() => setShowHint(!showHint)}
                variant="secondary"
                size="small"
              >
                {showHint ? 'Hide Hint' : 'Show Hint'}
              </PopupButton>
            )}
            
            {feedback && (
              <div className={`challenge-feedback ${feedback.includes('ACHIEVED') ? 'success' : 'error'}`}>
                {feedback}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Hash Demonstration Lab */}
      <div className="hash-lab">
        <h3>🧪 Cryptographic Hash Laboratory</h3>
        <div className="hash-demo">
          <div className="hash-input-section">
            <label>Input any text to see its SHA-256 hash:</label>
            <input
              type="text"
              placeholder="Type anything here..."
              onChange={(e) => demonstrateHash(e.target.value)}
              className="hash-input"
            />
          </div>
          {hashResult && (
            <div className="hash-output">
              <label>SHA-256 Hash:</label>
              <div className="hash-display">{hashResult}</div>
              <div className="hash-properties">
                <div className="property">Length: {hashResult.length} characters</div>
                <div className="property">Hexadecimal: 0-9, A-F</div>
                <div className="property">One-way: Cannot be reversed</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mastery Dashboard */}
      <div className="mastery-dashboard">
        <h3>🏆 Cryptographic Mastery Systems</h3>
        <div className="mastery-grid">
          <div className="mastery-card">
            <h4>🔍 Trust Collapse Analysis</h4>
            <div className="mastery-progress">
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${Math.min(trustCollapseAlerts.filter(a => a.resolved).length * 25, 100)}%` }}
                />
    </div>
              <span>{trustCollapseAlerts.filter(a => a.resolved).length}/4 Alerts Resolved</span>
      </div>
      </div>

          <div className="mastery-card">
            <h4>🔐 Cryptographic Proofs</h4>
            <div className="mastery-progress">
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${Math.min(cryptographicProofs.mastery, 100)}%` }}
                />
        </div>
              <span>{cryptographicProofs.verified} Proofs Verified</span>
    </div>
    </div>

          <div className="mastery-card">
            <h4>⚡ Impossibility Mastery</h4>
            <div className="mastery-progress">
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${Math.min(impossibilityMastery.understanding, 100)}%` }}
                />
              </div>
              <span>{impossibilityMastery.understanding}% Understanding</span>
      </div>
      </div>
      
          <div className="mastery-card">
            <h4>🏗️ Trust Machine Architecture</h4>
            <div className="mastery-progress">
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${Math.min(trustMachineArchitecture.efficiency, 100)}%` }}
                />
        </div>
              <span>{trustMachineArchitecture.systems.length} Systems Built</span>
        </div>
      </div>

          <div className="mastery-card">
            <h4>⛓️ Chain Integrity</h4>
            <div className="mastery-progress">
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${Math.min(chainIntegrity.security, 100)}%` }}
                />
              </div>
              <span>{chainIntegrity.blocks} Blocks Secured</span>
            </div>
      </div>

          <div className="mastery-card">
            <h4>👑 Digital Sovereignty</h4>
            <div className="mastery-progress">
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${Math.min(digitalSovereignty.sovereignty, 100)}%` }}
                />
      </div>
              <span>{digitalSovereignty.sovereignty}% Sovereignty</span>
            </div>
          </div>
        </div>
      </div>

      {/* Crisis Statistics */}
      <div className="crisis-statistics">
        <h3>📊 Trust Elimination Statistics</h3>
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number">{totalTrustEliminated}</div>
            <div className="stat-label">Trust Points Eliminated</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{masteryPoints}</div>
            <div className="stat-label">Mastery Points</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{architectLevel}</div>
            <div className="stat-label">Architect Level</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{100 - crisisIntensity}%</div>
            <div className="stat-label">Crisis Controlled</div>
          </div>
        </div>
      </div>
      
      {/* Achievement System */}
      <div className="achievement-system">
        <h3>🏅 Cryptographic Achievement Unlocks</h3>
        <div className="achievements-grid">
          <div className={`achievement ${masteryPoints >= 500 ? 'unlocked' : 'locked'}`}>
            <div className="achievement-icon">🔍</div>
            <div className="achievement-name">Trust Collapse Detective</div>
            <div className="achievement-desc">Master trust system failure analysis</div>
          </div>
          <div className={`achievement ${masteryPoints >= 1000 ? 'unlocked' : 'locked'}`}>
            <div className="achievement-icon">🔐</div>
            <div className="achievement-name">Cryptographic Proof Engineer</div>
            <div className="achievement-desc">Engineer mathematical proof systems</div>
          </div>
          <div className={`achievement ${masteryPoints >= 1500 ? 'unlocked' : 'locked'}`}>
            <div className="achievement-icon">⚡</div>
            <div className="achievement-name">Impossibility Proof Master</div>
            <div className="achievement-desc">Prove mathematical impossibility</div>
          </div>
          <div className={`achievement ${masteryPoints >= 2000 ? 'unlocked' : 'locked'}`}>
            <div className="achievement-icon">🏗️</div>
            <div className="achievement-name">Trust Machine Architect</div>
            <div className="achievement-desc">Architect trustless systems</div>
          </div>
          <div className={`achievement ${masteryPoints >= 2500 ? 'unlocked' : 'locked'}`}>
            <div className="achievement-icon">⛓️</div>
            <div className="achievement-name">Chain Integrity Guardian</div>
            <div className="achievement-desc">Secure blockchain foundations</div>
          </div>
          <div className={`achievement ${masteryPoints >= 3000 ? 'unlocked' : 'locked'}`}>
            <div className="achievement-icon">👑</div>
            <div className="achievement-name">Digital Sovereignty Defender</div>
            <div className="achievement-desc">Achieve cryptographic sovereignty</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HashingModule; 