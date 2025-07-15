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
  // Learning state management
  const [currentPhase, setCurrentPhase] = useState('binary_fundamentals');
  const [learningProgress, setLearningProgress] = useState(0);
  const [conceptLevel, setConceptLevel] = useState(1);
  const [masteryPoints, setMasteryPoints] = useState(0);
  const [totalConceptsLearned, setTotalConceptsLearned] = useState(0);

  // Number system learning state
  const [binaryFoundation, setBinaryFoundation] = useState({ strength: 0, exercises: [] });
  const [hexadecimalMastery, setHexadecimalMastery] = useState({ level: 0, conversions: [] });
  const [endiannessControl, setEndiannessControl] = useState({ big: 0, little: 0, understanding: 0 });
  const [cryptographicPrecision, setCryptographicPrecision] = useState({ accuracy: 0, validations: [] });
  const [bitcoinNumberMastery, setBitcoinNumberMastery] = useState({ mastery: 0, achievements: [] });

  // Interactive challenge state
  const [activeChallenge, setActiveChallenge] = useState(null);
  const [challengeProgress, setChallengeProgress] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState('');
  const [showHint, setShowHint] = useState(false);

  // Learning scenarios and challenges
  const learningScenarios = {
    binary_fundamentals: {
      title: "Binary Number System",
      topic: "Understanding Binary Representation",
      description: "Learn how computers represent all data using only 0s and 1s, and why this matters for Bitcoin.",
      objective: "Master binary number conversion and representation",
      challenges: [
        {
          id: 'binary_basics',
          title: 'Binary Basics',
          description: 'Learn the fundamentals of binary numbers, including place values and bit manipulation.',
          type: 'concept_understanding',
          difficulty: 'beginner'
        },
        {
          id: 'decimal_to_binary',
          title: 'Decimal to Binary Conversion',
          description: 'Convert decimal numbers to binary and understand the process.',
          type: 'conversion_practice',
          difficulty: 'beginner'
        }
      ]
    },
    hexadecimal_system: {
      title: "Hexadecimal Number System",
      topic: "Hexadecimal Representation",
      description: "Learn how hexadecimal is used in Bitcoin for compact and readable number representation.",
      objective: "Master hexadecimal number conversion and its significance in Bitcoin.",
      challenges: [
        {
          id: 'hex_basics',
          title: 'Hexadecimal Basics',
          description: 'Learn the fundamentals of hexadecimal, including its base and its use in Bitcoin.',
          type: 'concept_understanding',
          difficulty: 'beginner'
        },
        {
          id: 'binary_to_hex',
          title: 'Binary to Hexadecimal Conversion',
          description: 'Convert binary numbers to hexadecimal and understand the process.',
          type: 'conversion_practice',
          difficulty: 'beginner'
        }
      ]
    },
    endianness_concept: {
      title: "Endianness",
      topic: "Byte Order",
      description: "Learn about how different systems interpret binary data, particularly in Bitcoin.",
      objective: "Understand the concept of endianness and its importance in Bitcoin.",
      challenges: [
        {
          id: 'endian_basics',
          title: 'Endianness Basics',
          description: 'Learn the fundamentals of endianness, including big-endian and little-endian.',
          type: 'concept_understanding',
          difficulty: 'beginner'
        },
        {
          id: 'endian_conversion',
          title: 'Endianness Conversion',
          description: 'Convert binary data between different endianness formats.',
          type: 'conversion_practice',
          difficulty: 'beginner'
        }
      ]
    },
    cryptographic_precision: {
      title: "Cryptographic Precision",
      topic: "Mathematical Precision",
      description: "Learn about the importance of mathematical precision in cryptographic operations and Bitcoin.",
      objective: "Achieve cryptographic precision mastery for Bitcoin security.",
      challenges: [
        {
          id: 'precision_basics',
          title: 'Cryptographic Precision Basics',
          description: 'Learn the fundamentals of cryptographic precision and its importance in Bitcoin.',
          type: 'concept_understanding',
          difficulty: 'beginner'
        },
        {
          id: 'precision_practice',
          title: 'Cryptographic Precision Practice',
          description: 'Practice cryptographic precision through various operations.',
          type: 'conversion_practice',
          difficulty: 'beginner'
        }
      ]
    },
    bitcoin_number_sovereignty: {
      title: "Bitcoin Number Sovereignty",
      topic: "Mathematical Sovereignty",
      description: "Learn about the mathematical sovereignty of Bitcoin and how to defend it.",
      objective: "Maintain eternal vigilance over Bitcoin's mathematical precision.",
      challenges: [
        {
          id: 'sovereignty_basics',
          title: 'Mathematical Sovereignty Basics',
          description: 'Learn the fundamentals of mathematical sovereignty and its importance in Bitcoin.',
          type: 'concept_understanding',
          difficulty: 'beginner'
        },
        {
          id: 'sovereignty_practice',
          title: 'Mathematical Sovereignty Practice',
          description: 'Practice defending Bitcoin\'s mathematical sovereignty.',
          type: 'conversion_practice',
          difficulty: 'beginner'
        }
      ]
    }
  };

  // Challenge implementations
  const challengeImplementations = {
    binary_basics: {
      question: "What is the binary representation of the number 10?",
      answer: "1010",
      hint: "10 in binary is 1010. This means 1*2³ + 0*2² + 1*2¹ + 0*2⁰ = 8 + 0 + 2 + 0 = 10.",
      validator: (input) => input.replace(/\s/g, '') === '1010',
      reward: 100
    },
    decimal_to_binary: {
      question: "Convert decimal 255 to binary:",
      answer: "11111111",
      hint: "255 = 128 + 64 + 32 + 16 + 8 + 4 + 2 + 1. Add these values to get 11111111.",
      validator: (input) => input.replace(/\s/g, '') === '11111111',
      reward: 150
    },
    hex_basics: {
      question: "What is the hexadecimal representation of the number 255?",
      answer: "FF",
      hint: "255 in hexadecimal is FF. This means 15*16¹ + 15*16⁰ = 240 + 15 = 255.",
      validator: (input) => input.toUpperCase().replace(/\s/g, '') === 'FF',
      reward: 200
    },
    binary_to_hex: {
      question: "Convert binary 10101010 to hexadecimal:",
      answer: "AA",
      hint: "Group binary into 4-bit chunks: 1010 1010 = A A",
      validator: (input) => input.toUpperCase().replace(/\s/g, '') === 'AA',
      reward: 250
    },
    endian_basics: {
      question: "What is the difference between big-endian and little-endian?",
      answer: "Big-endian stores the most significant byte first, while little-endian stores the least significant byte first.",
      hint: "Think of it like reading a book: big-endian reads from left to right, little-endian reads from right to left.",
      validator: (input) => input.toLowerCase().includes('big-endian') || input.toLowerCase().includes('little-endian'),
      reward: 300
    },
    endian_conversion: {
      question: "Convert 0x12345678 from big-endian to little-endian:",
      answer: "78563412",
      hint: "Reverse the byte order: 12 34 56 78 → 78 56 34 12",
      validator: (input) => input.toUpperCase().replace(/0X/g, '') === '78563412',
      reward: 350
    },
    precision_basics: {
      question: "What is cryptographic precision?",
      answer: "Cryptographic precision refers to the exactness and reliability of mathematical calculations used in cryptographic operations, ensuring secure and reliable encryption and decryption.",
      hint: "Think of it as the difference between a perfect circle and a slightly imperfect one. A more precise circle is more reliable for cryptographic operations.",
      validator: (input) => input.toLowerCase().includes('cryptographic precision'),
      reward: 400
    },
    precision_practice: {
      question: "In Bitcoin, how many satoshis equal 1 BTC? (numerical answer)",
      answer: "100000000",
      hint: "1 BTC = 100,000,000 satoshis (8 decimal places)",
      validator: (input) => parseInt(input) === 100000000,
      reward: 450
    },
    sovereignty_basics: {
      question: "What is mathematical sovereignty?",
      answer: "Mathematical sovereignty refers to the absolute control and mastery of mathematical operations and calculations, ensuring the integrity and security of a system, particularly in the case of Bitcoin, which relies on precise mathematical algorithms.",
      hint: "Think of it as the ultimate power to make decisions and ensure reliability.",
      validator: (input) => input.toLowerCase().includes('mathematical sovereignty'),
      reward: 500
    },
    sovereignty_practice: {
      question: "What's the maximum value of a 32-bit unsigned integer in hex?",
      answer: "FFFFFFFF",
      hint: "32 bits = 8 hex characters, all F's for maximum value",
      validator: (input) => input.toUpperCase().replace(/0X/g, '') === 'FFFFFFFF',
      reward: 550
    }
  };

  // Learning alert system
  const generateLearningAlert = useCallback(() => {
    const alerts = [
      "💡 New Concept: Understanding Binary Representation",
      "💡 New Challenge: Decimal to Binary Conversion",
      "💡 New Concept: Hexadecimal System",
      "💡 New Challenge: Binary to Hex Conversion",
      "💡 New Concept: Endianness",
      "💡 New Challenge: Endianness Conversion",
      "💡 New Concept: Cryptographic Precision",
      "💡 New Challenge: Cryptographic Precision Practice",
      "💡 New Concept: Mathematical Sovereignty",
      "💡 New Challenge: Mathematical Sovereignty Practice"
    ];
    
    const newAlert = {
      id: Date.now(),
      message: alerts[Math.floor(Math.random() * alerts.length)],
      timestamp: new Date().toLocaleTimeString(),
      intensity: Math.floor(Math.random() * 100) + 1
    };
    
    // This alert system is not directly tied to mastery points or crisis intensity
    // as it's for educational progress, but we can keep it for now.
    // setDigitalChaosAlerts(prev => [newAlert, ...prev.slice(0, 4)]);
    // setCrisisIntensity(prev => Math.min(prev + 10, 100));
  }, []);

  // Initialize learning alerts
  useEffect(() => {
    generateLearningAlert();
    const interval = setInterval(generateLearningAlert, 10000); // Generate alerts every 10 seconds
    return () => clearInterval(interval);
  }, [generateLearningAlert]);

  // Handle challenge completion
  const handleChallengeComplete = (challengeId, success) => {
    if (success) {
      const challenge = challengeImplementations[challengeId];
      setMasteryPoints(prev => prev + challenge.reward);
      setTotalConceptsLearned(prev => prev + 1);
      setConceptLevel(prev => Math.min(prev + 1, 5)); // Max level 5
      
      // Update specific mastery systems
      switch (currentPhase) {
        case 'binary_fundamentals':
          setBinaryFoundation(prev => ({ 
            ...prev, 
            strength: prev.strength + 20,
            exercises: [...prev.exercises, challengeId]
          }));
          break;
        case 'hexadecimal_system':
          setHexadecimalMastery(prev => ({
            ...prev,
            level: prev.level + 1,
            conversions: [...prev.conversions, challengeId]
          }));
          break;
        case 'endianness_concept':
          setEndiannessControl(prev => ({
            ...prev,
            big: challengeId.includes('big') ? prev.big + 1 : prev.big,
            little: challengeId.includes('little') ? prev.little + 1 : prev.little,
            understanding: prev.understanding + 1
          }));
          break;
        case 'cryptographic_precision':
          setCryptographicPrecision(prev => ({
            ...prev,
            accuracy: prev.accuracy + 10,
            validations: [...prev.validations, challengeId]
          }));
          break;
        case 'bitcoin_number_sovereignty':
          setBitcoinNumberMastery(prev => ({
            ...prev,
            mastery: prev.mastery + 15,
            achievements: [...prev.achievements, challengeId]
          }));
          break;
      }
      
      setFeedback(`🎯 MASTERY ACHIEVED! +${challenge.reward} points`);
      
      // Check for phase advancement
      if (masteryPoints + challenge.reward >= conceptLevel * 200) { // Adjusted threshold for educational mastery
        advancePhase();
      }
    } else {
      setFeedback("❌ Challenge failed - try again!");
      // setCrisisIntensity(prev => Math.min(prev + 5, 100)); // No crisis intensity for learning
    }
  };

  // Phase advancement system
  const advancePhase = () => {
    const phases = Object.keys(learningScenarios);
    const currentIndex = phases.indexOf(currentPhase);
    
    if (currentIndex < phases.length - 1) {
      setCurrentPhase(phases[currentIndex + 1]);
      setConceptLevel(prev => prev + 1);
      setFeedback(`🚀 PHASE ADVANCED! You are now a ${learningScenarios[phases[currentIndex + 1]].title}`);
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

  const currentScenario = learningScenarios[currentPhase];

  return (
    <div className="numbers-module">
      {/* Learning Command Center */}
      <div className="crisis-command-center">
        <div className="crisis-header">
          <h1 className="crisis-title">Number Systems Mastery</h1>
          <div className="crisis-status">
            <div className="architect-level">Level {conceptLevel} {currentScenario.title}</div>
            <div className="mastery-points">{masteryPoints} Mastery Points</div>
            <div className="crisis-meter">
              <div 
                className="crisis-intensity" 
                style={{ width: `${learningProgress}%` }}
              />
              <span>Learning Progress: {learningProgress}%</span>
            </div>
          </div>
      </div>

        {/* Learning Alerts */}
        <div className="crisis-alerts">
          <h3>💡 New Concepts & Challenges</h3>
          <div className="alerts-container">
            {/* This alert system is not directly tied to mastery points or crisis intensity
                as it's for educational progress, but we can keep it for now. */}
            {/* {digitalChaosAlerts.map(alert => (
              <div 
                key={alert.id} 
                className={`crisis-alert ${alert.resolved ? 'resolved' : ''}`}
              >
                <span className="alert-time">{alert.timestamp}</span>
                <span className="alert-message">{alert.message}</span>
                <span className="alert-intensity">{alert.intensity}%</span>
      </div>
          ))} */}
        </div>
        </div>
      </div>

      {/* Current Learning Scenario */}
      <div className="crisis-scenario">
        <div className="scenario-header">
          <h2>{currentScenario.title}</h2>
          <div className="crisis-badge">{currentScenario.topic}</div>
    </div>
        
        <div className="crisis-description">
          <h3>🔥 {currentScenario.description}</h3>
          <p>{currentScenario.objective}</p>
          <div className="objective">
            <strong>Mission:</strong> {currentScenario.objective}
              </div>
          <div className="threat">
            <strong>Threat:</strong> {currentScenario.description}
            </div>
          </div>
          
        {/* Learning Challenges */}
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
            <h4>🔍 Binary Foundation</h4>
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
                  style={{ width: `${Math.min(endiannessControl.understanding * 25, 100)}%` }}
                />
        </div>
              <span>{endiannessControl.understanding} Mastery Points</span>
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
                  style={{ width: `${Math.min(bitcoinNumberMastery.mastery, 100)}%` }}
                />
              </div>
              <span>{bitcoinNumberMastery.mastery}% Sovereignty</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Learning Statistics */}
      <div className="crisis-statistics">
        <h3>📊 Learning Statistics</h3>
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number">{totalConceptsLearned}</div>
            <div className="stat-label">Concepts Learned</div>
      </div>
          <div className="stat-card">
            <div className="stat-number">{masteryPoints}</div>
            <div className="stat-label">Mastery Points</div>
    </div>
          <div className="stat-card">
            <div className="stat-number">{conceptLevel}</div>
            <div className="stat-label">Concept Level</div>
      </div>
          <div className="stat-card">
            <div className="stat-number">{100 - learningProgress}%</div>
            <div className="stat-label">Learning Progress</div>
            </div>
        </div>
      </div>

      {/* Achievement System */}
      <div className="achievement-system">
        <h3>🏅 Achievement Unlocks</h3>
        <div className="achievements-grid">
          <div className={`achievement ${masteryPoints >= 500 ? 'unlocked' : 'locked'}`}>
            <div className="achievement-icon">🔍</div>
            <div className="achievement-name">Binary Basics</div>
            <div className="achievement-desc">Master binary number conversion</div>
    </div>
          <div className={`achievement ${masteryPoints >= 1000 ? 'unlocked' : 'locked'}`}>
            <div className="achievement-icon">🧪</div>
            <div className="achievement-name">Hex Alchemist</div>
            <div className="achievement-desc">Master hexadecimal transformations</div>
          </div>
          <div className={`achievement ${masteryPoints >= 1500 ? 'unlocked' : 'locked'}`}>
            <div className="achievement-icon">⚖️</div>
            <div className="achievement-name">Endianness Architect</div>
            <div className="achievement-desc">Achieve byte order mastery</div>
        </div>
          <div className={`achievement ${masteryPoints >= 2000 ? 'unlocked' : 'locked'}`}>
            <div className="achievement-icon">🎯</div>
            <div className="achievement-name">Precision Master</div>
            <div className="achievement-desc">Attain cryptographic precision</div>
          </div>
          <div className={`achievement ${masteryPoints >= 2500 ? 'unlocked' : 'locked'}`}>
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