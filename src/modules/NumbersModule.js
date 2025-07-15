import React, { useState, useEffect, useCallback } from 'react';
import { 
  ContinueButton, 
  ActionButton, 
  OptionButton, 
  NavigationButton, 
  PopupButton 
} from '../components/EnhancedButtons';
import './NumbersModule.css';

const NumbersModule = () => {
  // Core crisis state management
  const [crisisPhase, setCrisisPhase] = useState('digital_chaos_detective');
  const [crisisIntensity, setCrisisIntensity] = useState(0);
  const [architectLevel, setArchitectLevel] = useState(1);
  const [masteryPoints, setMasteryPoints] = useState(0);
  const [totalCrisisDefended, setTotalCrisisDefended] = useState(0);

  // Digital representation mastery state
  const [digitalChaosAlerts, setDigitalChaosAlerts] = useState([]);
  const [binaryFoundation, setBinaryFoundation] = useState({ strength: 0, defenses: [] });
  const [hexadecimalMastery, setHexadecimalMastery] = useState({ level: 0, transformations: [] });
  const [endiannessControl, setEndiannessControl] = useState({ big: 0, little: 0, mastery: 0 });
  const [cryptographicPrecision, setCryptographicPrecision] = useState({ accuracy: 0, validations: [] });
  const [bitcoinNumberSovereignty, setBitcoinNumberSovereignty] = useState({ sovereignty: 0, achievements: [] });

  // Interactive challenge state
  const [activeChallenge, setActiveChallenge] = useState(null);
  const [challengeProgress, setChallengeProgress] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState('');
  const [showHint, setShowHint] = useState(false);

  // Crisis scenarios and challenges
  const crisisScenarios = {
    digital_chaos_detective: {
      title: "Digital Chaos Detective",
      crisis: "Digital Miscommunication Crisis",
      description: "Bitcoin transactions are failing worldwide due to number representation errors. As a Digital Chaos Detective, you must identify the root cause of these digital representation failures.",
      objective: "Investigate digital chaos patterns and build crisis detection systems",
      threat: "Global Bitcoin network instability",
      urgency: "CRITICAL",
      challenges: [
        {
          id: 'chaos_detection',
          title: 'Digital Chaos Pattern Recognition',
          description: 'Analyze failing Bitcoin transactions to identify number representation errors',
          type: 'pattern_analysis',
          difficulty: 'detective'
        },
        {
          id: 'crisis_mapping',
          title: 'Crisis Impact Mapping',
          description: 'Map the global impact of digital representation failures',
          type: 'impact_analysis',
          difficulty: 'detective'
        }
      ]
    },
    binary_foundation_engineer: {
      title: "Binary Foundation Engineer",
      crisis: "Binary Communication Breakdown",
      description: "Bitcoin's binary foundation is cracking under representation pressure. As a Binary Foundation Engineer, you must rebuild the binary infrastructure that powers Bitcoin's precision.",
      objective: "Master binary systems and engineer unbreakable foundations",
      threat: "Bitcoin's mathematical foundation collapse",
      urgency: "HIGH",
      challenges: [
        {
          id: 'binary_mastery',
          title: 'Binary System Mastery',
          description: 'Convert between decimal and binary with perfect precision',
          type: 'conversion_mastery',
          difficulty: 'engineer'
        },
        {
          id: 'foundation_building',
          title: 'Binary Foundation Construction',
          description: 'Build robust binary foundations for Bitcoin operations',
          type: 'foundation_building',
          difficulty: 'engineer'
        }
      ]
    },
    hexadecimal_alchemist: {
      title: "Hexadecimal Alchemist",
      crisis: "Hex Transformation Crisis",
      description: "Bitcoin's hexadecimal representations are becoming corrupted, threatening transaction integrity. As a Hexadecimal Alchemist, you must master the ancient art of hex transformation.",
      objective: "Transform between number systems with alchemical precision",
      threat: "Transaction integrity corruption",
      urgency: "HIGH",
      challenges: [
        {
          id: 'hex_alchemy',
          title: 'Hexadecimal Alchemy Mastery',
          description: 'Master the transformation between decimal, binary, and hexadecimal',
          type: 'transformation_mastery',
          difficulty: 'alchemist'
        },
        {
          id: 'corruption_healing',
          title: 'Hex Corruption Healing',
          description: 'Heal corrupted hexadecimal representations in Bitcoin data',
          type: 'corruption_healing',
          difficulty: 'alchemist'
        }
      ]
    },
    endianness_architect: {
      title: "Endianness Architect",
      crisis: "Byte Order Chaos",
      description: "Bitcoin's byte ordering is causing catastrophic miscommunication between systems. As an Endianness Architect, you must design perfect byte order harmony.",
      objective: "Architect flawless endianness systems for Bitcoin precision",
      threat: "Inter-system communication breakdown",
      urgency: "CRITICAL",
      challenges: [
        {
          id: 'endian_mastery',
          title: 'Endianness Mastery',
          description: 'Master big-endian and little-endian byte ordering',
          type: 'endian_mastery',
          difficulty: 'architect'
        },
        {
          id: 'harmony_design',
          title: 'Byte Order Harmony Design',
          description: 'Design systems that handle both endianness formats flawlessly',
          type: 'harmony_design',
          difficulty: 'architect'
        }
      ]
    },
    cryptographic_precision_master: {
      title: "Cryptographic Precision Master",
      crisis: "Precision Degradation Emergency",
      description: "Bitcoin's cryptographic operations are losing precision, threatening security. As a Cryptographic Precision Master, you must restore mathematical perfection.",
      objective: "Achieve cryptographic precision mastery for Bitcoin security",
      threat: "Bitcoin security compromise",
      urgency: "MAXIMUM",
      challenges: [
        {
          id: 'precision_mastery',
          title: 'Cryptographic Precision Mastery',
          description: 'Master precise number representations in cryptographic operations',
          type: 'precision_mastery',
          difficulty: 'master'
        },
        {
          id: 'security_restoration',
          title: 'Security Precision Restoration',
          description: 'Restore perfect precision to Bitcoin\'s cryptographic operations',
          type: 'security_restoration',
          difficulty: 'master'
        }
      ]
    },
    bitcoin_number_sovereign: {
      title: "Bitcoin Number Sovereign",
      crisis: "Mathematical Sovereignty Defense",
      description: "You've achieved mastery over Bitcoin's number systems. As a Bitcoin Number Sovereign, you must defend mathematical sovereignty against all threats.",
      objective: "Maintain eternal vigilance over Bitcoin's mathematical precision",
      threat: "Mathematical sovereignty erosion",
      urgency: "ETERNAL",
        challenges: [
          {
          id: 'sovereignty_defense',
          title: 'Mathematical Sovereignty Defense',
          description: 'Defend Bitcoin\'s mathematical precision against all threats',
          type: 'sovereignty_defense',
          difficulty: 'sovereign'
        },
        {
          id: 'precision_legacy',
          title: 'Precision Legacy Creation',
          description: 'Create lasting systems that preserve Bitcoin\'s mathematical precision',
          type: 'legacy_creation',
          difficulty: 'sovereign'
        }
      ]
    }
  };

  // Challenge implementations
  const challengeImplementations = {
    chaos_detection: {
      question: "A Bitcoin transaction shows value 0x1A2B in hex. What's the decimal value?",
      answer: "6699",
      hint: "Remember: 1A2B in hex = 1×16³ + 10×16² + 2×16¹ + 11×16⁰",
      validator: (input) => parseInt(input) === 6699,
      reward: 100
    },
    crisis_mapping: {
      question: "If a system expects little-endian but receives big-endian 0x12345678, what value does it interpret?",
      answer: "2018915346",
      hint: "Little-endian reverses byte order: 0x78563412",
      validator: (input) => parseInt(input) === 2018915346,
      reward: 150
    },
    binary_mastery: {
      question: "Convert decimal 255 to binary:",
      answer: "11111111",
      hint: "255 = 128 + 64 + 32 + 16 + 8 + 4 + 2 + 1",
      validator: (input) => input.replace(/\s/g, '') === '11111111',
      reward: 200
    },
    foundation_building: {
      question: "What's the binary representation of the maximum value in a single byte?",
      answer: "11111111",
      hint: "A byte has 8 bits, maximum value is when all bits are 1",
      validator: (input) => input.replace(/\s/g, '') === '11111111',
      reward: 250
    },
    hex_alchemy: {
      question: "Convert binary 10101010 to hexadecimal:",
      answer: "AA",
      hint: "Group binary into 4-bit chunks: 1010 1010 = A A",
      validator: (input) => input.toUpperCase().replace(/\s/g, '') === 'AA',
      reward: 300
    },
    corruption_healing: {
      question: "A corrupted hex value shows 0xG7F3. What should the first digit be? (0-F)",
      answer: "7",
      hint: "G is not a valid hex digit. Look at the pattern: ?7F3",
      validator: (input) => input.toUpperCase() === '7',
      reward: 350
    },
    endian_mastery: {
      question: "Convert 0x12345678 from big-endian to little-endian:",
      answer: "78563412",
      hint: "Reverse the byte order: 12 34 56 78 → 78 56 34 12",
      validator: (input) => input.toUpperCase().replace(/0X/g, '') === '78563412',
      reward: 400
    },
    harmony_design: {
      question: "What's the decimal value of little-endian 0x00000001?",
      answer: "16777216",
      hint: "In little-endian, bytes are reversed: 01 00 00 00 = 0x01000000",
      validator: (input) => parseInt(input) === 16777216,
      reward: 450
    },
    precision_mastery: {
      question: "In Bitcoin, how many satoshis equal 1 BTC? (numerical answer)",
      answer: "100000000",
      hint: "1 BTC = 100,000,000 satoshis (8 decimal places)",
      validator: (input) => parseInt(input) === 100000000,
      reward: 500
    },
    security_restoration: {
      question: "A Bitcoin private key is 256 bits. How many hex characters represent it?",
      answer: "64",
      hint: "Each hex character represents 4 bits: 256 ÷ 4 = 64",
      validator: (input) => parseInt(input) === 64,
      reward: 550
    },
    sovereignty_defense: {
      question: "What's the maximum value of a 32-bit unsigned integer in hex?",
      answer: "FFFFFFFF",
      hint: "32 bits = 8 hex characters, all F's for maximum value",
      validator: (input) => input.toUpperCase().replace(/0X/g, '') === 'FFFFFFFF',
      reward: 600
    },
    precision_legacy: {
      question: "Bitcoin's difficulty target is a 256-bit number. In hex, how many leading zeros indicate high difficulty?",
      answer: "Many",
      hint: "More leading zeros = smaller target = higher difficulty",
      validator: (input) => input.toLowerCase().includes('many') || input.toLowerCase().includes('more'),
      reward: 700
    }
  };

  // Crisis alert system
  const generateCrisisAlert = useCallback(() => {
    const alerts = [
      "🚨 CRITICAL: Bitcoin transaction 0x7a2b failed - number representation error detected",
      "⚠️ WARNING: Endianness mismatch causing network communication breakdown",
      "🔥 URGENT: Hexadecimal corruption spreading through transaction pool",
      "💥 ALERT: Binary foundation instability detected in block validation",
      "⚡ CRISIS: Precision degradation threatening cryptographic security",
      "🛡️ DEFEND: Mathematical sovereignty under attack - respond immediately"
    ];
    
    const newAlert = {
      id: Date.now(),
      message: alerts[Math.floor(Math.random() * alerts.length)],
      timestamp: new Date().toLocaleTimeString(),
      intensity: Math.floor(Math.random() * 100) + 1
    };
    
    setDigitalChaosAlerts(prev => [newAlert, ...prev.slice(0, 4)]);
    setCrisisIntensity(prev => Math.min(prev + 10, 100));
  }, []);

  // Initialize crisis alerts
  useEffect(() => {
    generateCrisisAlert();
    const interval = setInterval(generateCrisisAlert, 8000);
    return () => clearInterval(interval);
  }, [generateCrisisAlert]);

  // Handle challenge completion
  const handleChallengeComplete = (challengeId, success) => {
    if (success) {
      const challenge = challengeImplementations[challengeId];
      setMasteryPoints(prev => prev + challenge.reward);
      setTotalCrisisDefended(prev => prev + 1);
      setCrisisIntensity(prev => Math.max(prev - 15, 0));
      
      // Update specific mastery systems
      switch (crisisPhase) {
        case 'digital_chaos_detective':
          setDigitalChaosAlerts(prev => prev.map(alert => ({ ...alert, resolved: true })));
          break;
        case 'binary_foundation_engineer':
          setBinaryFoundation(prev => ({ 
            ...prev, 
            strength: prev.strength + 20,
            defenses: [...prev.defenses, challengeId]
          }));
          break;
        case 'hexadecimal_alchemist':
          setHexadecimalMastery(prev => ({
            ...prev,
            level: prev.level + 1,
            transformations: [...prev.transformations, challengeId]
          }));
          break;
        case 'endianness_architect':
          setEndiannessControl(prev => ({
            ...prev,
            big: challengeId.includes('big') ? prev.big + 1 : prev.big,
            little: challengeId.includes('little') ? prev.little + 1 : prev.little,
            mastery: prev.mastery + 1
          }));
          break;
        case 'cryptographic_precision_master':
          setCryptographicPrecision(prev => ({
            ...prev,
            accuracy: prev.accuracy + 10,
            validations: [...prev.validations, challengeId]
          }));
          break;
        case 'bitcoin_number_sovereign':
          setBitcoinNumberSovereignty(prev => ({
            ...prev,
            sovereignty: prev.sovereignty + 15,
            achievements: [...prev.achievements, challengeId]
          }));
          break;
      }
      
      setFeedback(`🎯 MASTERY ACHIEVED! +${challenge.reward} points`);
      
      // Check for phase advancement
      if (masteryPoints + challenge.reward >= architectLevel * 500) {
        advancePhase();
      }
    } else {
      setFeedback("❌ Crisis continues - refine your approach");
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
      setFeedback("👑 ULTIMATE MASTERY ACHIEVED! You are the Bitcoin Number Sovereign!");
    }
  };

  // Challenge submission handler
  const handleSubmit = () => {
    if (!activeChallenge) return;
    
    const challenge = challengeImplementations[activeChallenge.id];
    const isCorrect = challenge.validator(userInput);
    
    handleChallengeComplete(activeChallenge.id, isCorrect);
    
    if (isCorrect) {
      setActiveChallenge(null);
      setUserInput('');
      setShowHint(false);
    }
  };

  // Start challenge
  const startChallenge = (challenge) => {
    setActiveChallenge(challenge);
    setUserInput('');
    setFeedback('');
    setShowHint(false);
  };

  const currentScenario = crisisScenarios[crisisPhase];

  return (
    <div className="numbers-module">
      {/* Crisis Command Center */}
      <div className="crisis-command-center">
        <div className="crisis-header">
          <h1 className="crisis-title">Digital Representation Crisis Architect</h1>
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

        {/* Crisis Alerts */}
        <div className="crisis-alerts">
          <h3>🚨 Live Crisis Feed</h3>
          <div className="alerts-container">
            {digitalChaosAlerts.map(alert => (
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
            
            <div className="challenge-input">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
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
            
            {showHint && (
              <div className="challenge-hint">
                💡 {challengeImplementations[activeChallenge.id].hint}
          </div>
            )}
          
          <PopupButton 
              className="hint-btn"
              onClick={() => setShowHint(!showHint)}
              variant="secondary"
              size="small"
            >
              {showHint ? 'Hide Hint' : 'Show Hint'}
            </PopupButton>
            
            {feedback && (
              <div className={`challenge-feedback ${feedback.includes('ACHIEVED') ? 'success' : 'error'}`}>
                {feedback}
              </div>
            )}
              </div>
              </div>
      )}

      {/* Mastery Dashboard */}
      <div className="mastery-dashboard">
        <h3>🏆 Mastery Systems</h3>
        <div className="mastery-grid">
          <div className="mastery-card">
            <h4>🔍 Chaos Detection</h4>
            <div className="mastery-progress">
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${Math.min(digitalChaosAlerts.filter(a => a.resolved).length * 25, 100)}%` }}
                />
              </div>
              <span>{digitalChaosAlerts.filter(a => a.resolved).length}/4 Alerts Resolved</span>
            </div>
          </div>

          <div className="mastery-card">
            <h4>🏗️ Binary Foundation</h4>
            <div className="mastery-progress">
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${Math.min(binaryFoundation.strength, 100)}%` }}
                />
              </div>
              <span>{binaryFoundation.strength}% Foundation Strength</span>
            </div>
          </div>
          
          <div className="mastery-card">
            <h4>🧪 Hex Alchemy</h4>
            <div className="mastery-progress">
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${Math.min(hexadecimalMastery.level * 20, 100)}%` }}
                />
                </div>
              <span>Level {hexadecimalMastery.level} Alchemist</span>
            </div>
          </div>
          
          <div className="mastery-card">
            <h4>⚖️ Endianness Control</h4>
            <div className="mastery-progress">
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${Math.min(endiannessControl.mastery * 25, 100)}%` }}
                />
        </div>
              <span>{endiannessControl.mastery} Mastery Points</span>
              </div>
            </div>
            
          <div className="mastery-card">
            <h4>🎯 Cryptographic Precision</h4>
            <div className="mastery-progress">
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${Math.min(cryptographicPrecision.accuracy, 100)}%` }}
                />
              </div>
              <span>{cryptographicPrecision.accuracy}% Accuracy</span>
            </div>
          </div>
          
          <div className="mastery-card">
            <h4>👑 Bitcoin Sovereignty</h4>
            <div className="mastery-progress">
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${Math.min(bitcoinNumberSovereignty.sovereignty, 100)}%` }}
                />
              </div>
              <span>{bitcoinNumberSovereignty.sovereignty}% Sovereignty</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Crisis Statistics */}
      <div className="crisis-statistics">
        <h3>📊 Crisis Defense Statistics</h3>
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number">{totalCrisisDefended}</div>
            <div className="stat-label">Crises Defended</div>
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
        <h3>🏅 Achievement Unlocks</h3>
        <div className="achievements-grid">
          <div className={`achievement ${masteryPoints >= 500 ? 'unlocked' : 'locked'}`}>
            <div className="achievement-icon">🔍</div>
            <div className="achievement-name">Chaos Detective</div>
            <div className="achievement-desc">Master digital chaos detection</div>
    </div>
          <div className={`achievement ${masteryPoints >= 1000 ? 'unlocked' : 'locked'}`}>
            <div className="achievement-icon">🏗️</div>
            <div className="achievement-name">Foundation Engineer</div>
            <div className="achievement-desc">Build unbreakable binary foundations</div>
          </div>
          <div className={`achievement ${masteryPoints >= 1500 ? 'unlocked' : 'locked'}`}>
            <div className="achievement-icon">🧪</div>
            <div className="achievement-name">Hex Alchemist</div>
            <div className="achievement-desc">Master hexadecimal transformations</div>
        </div>
          <div className={`achievement ${masteryPoints >= 2000 ? 'unlocked' : 'locked'}`}>
            <div className="achievement-icon">⚖️</div>
            <div className="achievement-name">Endianness Architect</div>
            <div className="achievement-desc">Achieve byte order mastery</div>
          </div>
          <div className={`achievement ${masteryPoints >= 2500 ? 'unlocked' : 'locked'}`}>
            <div className="achievement-icon">🎯</div>
            <div className="achievement-name">Precision Master</div>
            <div className="achievement-desc">Attain cryptographic precision</div>
          </div>
          <div className={`achievement ${masteryPoints >= 3000 ? 'unlocked' : 'locked'}`}>
            <div className="achievement-icon">👑</div>
            <div className="achievement-name">Number Sovereign</div>
            <div className="achievement-desc">Achieve Bitcoin number sovereignty</div>
                </div>
              </div>
            </div>
    </div>
  );
};

export default NumbersModule; 