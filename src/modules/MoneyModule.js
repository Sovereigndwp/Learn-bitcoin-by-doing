import React, { useState, useEffect, useCallback } from 'react';
import '../components/MoneyModule.css';

const MoneyModule = () => {
  // Core crisis state management
  const [crisisPhase, setCrisisPhase] = useState('monetary_collapse_detective');
  const [crisisIntensity, setCrisisIntensity] = useState(0);
  const [architectLevel, setArchitectLevel] = useState(1);
  const [masteryPoints, setMasteryPoints] = useState(0);
  const [totalCrisisDefended, setTotalCrisisDefended] = useState(0);

  // Monetary mastery state
  const [monetaryCollapseAlerts, setMonetaryCollapseAlerts] = useState([]);
  const [soundMoneyEngineering, setSoundMoneyEngineering] = useState({ systems: 0, efficiency: 0 });
  const [inflationDefense, setInflationDefense] = useState({ shields: 0, protection: 0 });
  const [economicSovereignty, setEconomicSovereignty] = useState({ independence: 0, resistance: 0 });
  const [wealthPreservation, setWealthPreservation] = useState({ preserved: 0, techniques: [] });
  const [soundMoneySovereignty, setSoundMoneySovereignty] = useState({ sovereignty: 0, mastery: 0 });

  // Interactive challenge state
  const [activeChallenge, setActiveChallenge] = useState(null);
  const [challengeProgress, setChallengeProgress] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState('');
  const [showHint, setShowHint] = useState(false);

  // Crisis scenarios and challenges
  const crisisScenarios = {
    monetary_collapse_detective: {
      title: "Monetary Collapse Detective",
      crisis: "Global Monetary System Collapse",
      description: "Currencies are failing worldwide, inflation is destroying savings, and economic chaos is spreading. As a Monetary Collapse Detective, you must investigate the root causes of monetary system failures and discover the principles of sound money.",
      objective: "Investigate monetary system failures and discover sound money principles",
      threat: "Complete economic collapse",
      urgency: "CRITICAL",
      challenges: [
        {
          id: 'fiat_failure_analysis',
          title: 'Fiat Currency Failure Analysis',
          description: 'Analyze why fiat currencies inevitably fail and destroy wealth',
          type: 'failure_analysis',
          difficulty: 'detective'
        },
        {
          id: 'sound_money_discovery',
          title: 'Sound Money Discovery',
          description: 'Discover the fundamental properties that make money sound',
          type: 'discovery',
          difficulty: 'detective'
        }
      ]
    },
    sound_money_engineer: {
      title: "Sound Money Engineer",
      crisis: "Monetary Engineering Crisis",
      description: "The world needs a new monetary system that can't be manipulated or debased. As a Sound Money Engineer, you must engineer the perfect monetary system using the principles of scarcity, durability, and verifiability.",
      objective: "Engineer sound monetary systems with unbreakable properties",
      threat: "Continued monetary manipulation",
      urgency: "HIGH",
      challenges: [
        {
          id: 'scarcity_engineering',
          title: 'Scarcity Engineering',
          description: 'Engineer absolute scarcity into monetary systems',
          type: 'scarcity_engineering',
          difficulty: 'engineer'
        },
        {
          id: 'durability_architecture',
          title: 'Durability Architecture',
          description: 'Architect systems that preserve value across time',
          type: 'durability_architecture',
          difficulty: 'engineer'
        }
      ]
    },
    inflation_defense_architect: {
      title: "Inflation Defense Architect",
      crisis: "Inflation Attack Emergency",
      description: "Inflation is attacking savings and destroying purchasing power worldwide. As an Inflation Defense Architect, you must architect impenetrable defenses against monetary debasement.",
      objective: "Architect defenses against inflation and monetary debasement",
      threat: "Wealth destruction through inflation",
      urgency: "HIGH",
      challenges: [
        {
          id: 'inflation_shield_design',
          title: 'Inflation Shield Design',
          description: 'Design shields that protect wealth from inflation attacks',
          type: 'shield_design',
          difficulty: 'architect'
        },
        {
          id: 'purchasing_power_preservation',
          title: 'Purchasing Power Preservation',
          description: 'Preserve purchasing power against monetary debasement',
          type: 'power_preservation',
          difficulty: 'architect'
        }
      ]
    },
    economic_sovereignty_guardian: {
      title: "Economic Sovereignty Guardian",
      crisis: "Economic Sovereignty Crisis",
      description: "Economic freedom is under attack from central planners and monetary manipulators. As an Economic Sovereignty Guardian, you must guard against all forms of economic control and manipulation.",
      objective: "Guard economic sovereignty against all forms of control",
      threat: "Loss of economic freedom",
      urgency: "CRITICAL",
      challenges: [
        {
          id: 'sovereignty_defense',
          title: 'Economic Sovereignty Defense',
          description: 'Defend economic sovereignty against central planning',
          type: 'sovereignty_defense',
          difficulty: 'guardian'
        },
        {
          id: 'manipulation_resistance',
          title: 'Manipulation Resistance',
          description: 'Build resistance against monetary manipulation',
          type: 'manipulation_resistance',
          difficulty: 'guardian'
        }
      ]
    },
    wealth_preservation_master: {
      title: "Wealth Preservation Master",
      crisis: "Wealth Destruction Crisis",
      description: "Traditional wealth preservation methods are failing as currencies collapse. As a Wealth Preservation Master, you must master advanced techniques for preserving wealth across generations.",
      objective: "Master wealth preservation techniques for generational wealth",
      threat: "Generational wealth destruction",
      urgency: "MAXIMUM",
      challenges: [
        {
          id: 'generational_preservation',
          title: 'Generational Wealth Preservation',
          description: 'Master techniques for preserving wealth across generations',
          type: 'generational_preservation',
          difficulty: 'master'
        },
        {
          id: 'store_of_value_mastery',
          title: 'Store of Value Mastery',
          description: 'Master the ultimate store of value properties',
          type: 'store_of_value',
          difficulty: 'master'
        }
      ]
    },
    sound_money_sovereign: {
      title: "Sound Money Sovereign",
      crisis: "Sound Money Sovereignty Defense",
      description: "You've achieved mastery over sound money principles. As a Sound Money Sovereign, you must defend sound money sovereignty against all fiat attacks.",
      objective: "Defend sound money sovereignty against all fiat systems",
      threat: "Sound money sovereignty erosion",
      urgency: "ETERNAL",
      challenges: [
        {
          id: 'sovereignty_mastery',
          title: 'Sound Money Sovereignty Mastery',
          description: 'Achieve complete mastery over sound money principles',
          type: 'sovereignty_mastery',
          difficulty: 'sovereign'
        },
        {
          id: 'monetary_legacy',
          title: 'Monetary Legacy Creation',
          description: 'Create lasting sound money systems for future generations',
          type: 'legacy_creation',
          difficulty: 'sovereign'
        }
      ]
    }
  };

  // Challenge implementations
  const challengeImplementations = {
    fiat_failure_analysis: {
      question: "What is the fundamental flaw in fiat currency systems?",
      options: [
        "They're too complicated",
        "They lack government backing",
        "They can be printed without limit",
        "They're not digital"
      ],
      correctAnswer: 2,
      explanation: "Fiat currencies can be printed without limit, leading to inflation and wealth destruction. This unlimited supply destroys the scarcity required for sound money.",
      reward: 100
    },
    sound_money_discovery: {
      question: "Which property is most essential for sound money?",
      options: [
        "Government approval",
        "Physical beauty",
        "Absolute scarcity",
        "Popular acceptance"
      ],
      correctAnswer: 2,
      explanation: "Absolute scarcity is the most essential property of sound money. Without scarcity, money loses its ability to store value over time.",
      reward: 150
    },
    scarcity_engineering: {
      question: "What makes Bitcoin's scarcity superior to gold's scarcity?",
      options: [
        "Bitcoin is shinier",
        "Bitcoin's supply is mathematically fixed",
        "Bitcoin is government-backed",
        "Bitcoin is easier to mine"
      ],
      correctAnswer: 1,
      explanation: "Bitcoin's supply is mathematically fixed at 21 million coins, making it absolutely scarce. Gold's supply can increase with new discoveries and mining technology.",
      reward: 200
    },
    durability_architecture: {
      question: "What makes digital money more durable than physical money?",
      options: [
        "It's newer technology",
        "It can't be physically destroyed",
        "It's backed by computers",
        "It's more popular"
      ],
      correctAnswer: 1,
      explanation: "Digital money can't be physically destroyed like paper or metal money. It exists as information that can be backed up and recovered.",
      reward: 250
    },
    inflation_shield_design: {
      question: "How does Bitcoin protect against inflation?",
      options: [
        "By increasing supply with demand",
        "By being backed by gold",
        "By having a fixed supply schedule",
        "By government regulation"
      ],
      correctAnswer: 2,
      explanation: "Bitcoin protects against inflation by having a fixed supply schedule that cannot be changed, unlike fiat currencies that can be printed endlessly.",
      reward: 300
    },
    purchasing_power_preservation: {
      question: "If $100 today buys what $20 bought in 1970, what happened to the dollar's purchasing power?",
      options: [
        "It increased 5x",
        "It decreased by 80%",
        "It stayed the same",
        "It became more valuable"
      ],
      correctAnswer: 1,
      explanation: "The dollar lost 80% of its purchasing power. This is the result of monetary inflation destroying the value of fiat currency over time.",
      reward: 350
    },
    sovereignty_defense: {
      question: "What gives you true economic sovereignty?",
      options: [
        "Having a bank account",
        "Owning government bonds",
        "Controlling your own money without permission",
        "Having a credit card"
      ],
      correctAnswer: 2,
      explanation: "True economic sovereignty comes from controlling your own money without needing permission from banks, governments, or other third parties.",
      reward: 400
    },
    manipulation_resistance: {
      question: "How does sound money resist manipulation?",
      options: [
        "Through government protection",
        "Through mathematical rules that can't be changed",
        "Through popular vote",
        "Through banking regulations"
      ],
      correctAnswer: 1,
      explanation: "Sound money resists manipulation through mathematical rules that cannot be changed by any authority, unlike fiat systems that can be manipulated at will.",
      reward: 450
    },
    generational_preservation: {
      question: "What's the best way to preserve wealth across generations?",
      options: [
        "Saving in fiat currency",
        "Buying government bonds",
        "Storing value in scarce, durable assets",
        "Keeping cash under the mattress"
      ],
      correctAnswer: 2,
      explanation: "Preserving wealth across generations requires storing value in scarce, durable assets that maintain purchasing power over long periods.",
      reward: 500
    },
    store_of_value_mastery: {
      question: "What makes the ultimate store of value?",
      options: [
        "Government backing",
        "Physical beauty",
        "Scarcity + durability + verifiability",
        "Popular opinion"
      ],
      correctAnswer: 2,
      explanation: "The ultimate store of value combines scarcity (limited supply), durability (lasts over time), and verifiability (can be proven authentic).",
      reward: 550
    },
    sovereignty_mastery: {
      question: "What does sound money sovereignty ultimately provide?",
      options: [
        "Higher investment returns",
        "Freedom from monetary manipulation",
        "Government approval",
        "Social status"
      ],
      correctAnswer: 1,
      explanation: "Sound money sovereignty provides freedom from monetary manipulation, allowing individuals to preserve and transfer value without interference.",
      reward: 600
    },
    monetary_legacy: {
      question: "What is the ultimate legacy of sound money?",
      type: 'open_ended',
      answer: "freedom",
      hint: "Think about what happens when money can't be manipulated",
      validator: (input) => input.toLowerCase().includes('freedom') || input.toLowerCase().includes('liberty') || input.toLowerCase().includes('prosperity'),
      reward: 700
    }
  };

  // Crisis alert system
  const generateMonetaryCollapseAlert = useCallback(() => {
    const alerts = [
      "🚨 BREAKING: Major currency devaluation detected - monetary system failing",
      "⚠️ CRITICAL: Hyperinflation spreading - purchasing power collapsing",
      "🔥 URGENT: Central bank printing money - wealth destruction accelerating",
      "💥 ALERT: Economic crisis deepening - sound money needed immediately",
      "⚡ CRISIS: Fiat system instability - monetary sovereignty required",
      "🛡️ DEFEND: Economic freedom under attack - sound money defense activated"
    ];
    
    const newAlert = {
      id: Date.now(),
      message: alerts[Math.floor(Math.random() * alerts.length)],
      timestamp: new Date().toLocaleTimeString(),
      intensity: Math.floor(Math.random() * 100) + 1
    };
    
    setMonetaryCollapseAlerts(prev => [newAlert, ...prev.slice(0, 4)]);
    setCrisisIntensity(prev => Math.min(prev + 10, 100));
  }, []);

  // Initialize crisis alerts
  useEffect(() => {
    generateMonetaryCollapseAlert();
    const interval = setInterval(generateMonetaryCollapseAlert, 6000);
    return () => clearInterval(interval);
  }, [generateMonetaryCollapseAlert]);

  // Handle challenge completion
  const handleChallengeComplete = (challengeId, success) => {
    if (success) {
      const challenge = challengeImplementations[challengeId];
      setMasteryPoints(prev => prev + challenge.reward);
      setTotalCrisisDefended(prev => prev + 1);
      setCrisisIntensity(prev => Math.max(prev - 15, 0));
      
      // Update specific mastery systems
      switch (crisisPhase) {
        case 'monetary_collapse_detective':
          setMonetaryCollapseAlerts(prev => prev.map(alert => ({ ...alert, resolved: true })));
          break;
        case 'sound_money_engineer':
          setSoundMoneyEngineering(prev => ({ 
            ...prev, 
            systems: prev.systems + 1,
            efficiency: prev.efficiency + 20
          }));
          break;
        case 'inflation_defense_architect':
          setInflationDefense(prev => ({
            ...prev,
            shields: prev.shields + 1,
            protection: prev.protection + 25
          }));
          break;
        case 'economic_sovereignty_guardian':
          setEconomicSovereignty(prev => ({
            ...prev,
            independence: prev.independence + 20,
            resistance: prev.resistance + 15
          }));
          break;
        case 'wealth_preservation_master':
          setWealthPreservation(prev => ({
            ...prev,
            preserved: prev.preserved + 25,
            techniques: [...prev.techniques, challengeId]
          }));
          break;
        case 'sound_money_sovereign':
          setSoundMoneySovereignty(prev => ({
            ...prev,
            sovereignty: prev.sovereignty + 30,
            mastery: prev.mastery + 25
          }));
          break;
      }
      
      setFeedback(`🎯 SOUND MONEY MASTERY ACHIEVED! +${challenge.reward} points`);
      
      // Check for phase advancement
      if (masteryPoints + challenge.reward >= architectLevel * 500) {
        advancePhase();
      }
    } else {
      setFeedback("❌ Monetary crisis continues - strengthen your sound money understanding");
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
      setFeedback("👑 ULTIMATE MASTERY ACHIEVED! You are the Sound Money Sovereign!");
    }
  };

  // Challenge submission handler
  const handleSubmit = () => {
    if (!activeChallenge) return;
    
    const challenge = challengeImplementations[activeChallenge.id];
    let isCorrect = false;
    
    if (challenge.type === 'open_ended') {
      isCorrect = challenge.validator(userInput);
    } else if (challenge.options) {
      isCorrect = parseInt(userInput) === challenge.correctAnswer;
    }
    
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
    <div className="money-module">
      {/* Crisis Command Center */}
      <div className="crisis-command-center">
        <div className="crisis-header">
          <h1 className="crisis-title">Monetary System Crisis Architect</h1>
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

        {/* Monetary Collapse Alerts */}
        <div className="crisis-alerts">
          <h3>🚨 Monetary Collapse Feed</h3>
          <div className="alerts-container">
            {monetaryCollapseAlerts.map(alert => (
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
                <button 
                  className="challenge-start-btn"
                  onClick={() => startChallenge(challenge)}
                >
                  Begin Challenge
                </button>
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
            <button 
              className="challenge-close"
              onClick={() => setActiveChallenge(null)}
            >
              ×
            </button>
          </div>
          
          <div className="challenge-content">
            <div className="challenge-question">
              {challengeImplementations[activeChallenge.id].question}
            </div>
            
            {challengeImplementations[activeChallenge.id].options ? (
              <div className="challenge-options">
                {challengeImplementations[activeChallenge.id].options.map((option, index) => (
                  <button
                    key={index}
                    className={`option-btn ${userInput === index.toString() ? 'selected' : ''}`}
                    onClick={() => setUserInput(index.toString())}
                  >
                    {option}
                  </button>
                ))}
              </div>
            ) : (
              <div className="challenge-input">
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="Enter your answer..."
                  onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                />
                <button onClick={handleSubmit}>Submit</button>
              </div>
            )}
            
            {showHint && challengeImplementations[activeChallenge.id].hint && (
              <div className="challenge-hint">
                💡 {challengeImplementations[activeChallenge.id].hint}
              </div>
            )}
            
            {challengeImplementations[activeChallenge.id].hint && (
              <button 
                className="hint-btn"
                onClick={() => setShowHint(!showHint)}
              >
                {showHint ? 'Hide Hint' : 'Show Hint'}
              </button>
            )}
            
            {feedback && (
              <div className={`challenge-feedback ${feedback.includes('ACHIEVED') ? 'success' : 'error'}`}>
                {feedback}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Sound Money Principles Dashboard */}
      <div className="sound-money-dashboard">
        <h3>💰 Sound Money Principles</h3>
        <div className="principles-grid">
          <div className="principle-card">
            <div className="principle-icon">🔒</div>
            <h4>Scarcity</h4>
            <p>Limited supply preserves value over time</p>
            <div className="principle-example">Bitcoin: 21 million max supply</div>
          </div>
          
          <div className="principle-card">
            <div className="principle-icon">💎</div>
            <h4>Durability</h4>
            <p>Withstands time and physical forces</p>
            <div className="principle-example">Digital: Cannot be destroyed</div>
          </div>
          
          <div className="principle-card">
            <div className="principle-icon">📏</div>
            <h4>Divisibility</h4>
            <p>Can be divided into smaller units</p>
            <div className="principle-example">Satoshis: 100 million per Bitcoin</div>
          </div>
          
          <div className="principle-card">
            <div className="principle-icon">✅</div>
            <h4>Verifiability</h4>
            <p>Authenticity can be proven</p>
            <div className="principle-example">Cryptographic proof</div>
          </div>
          
          <div className="principle-card">
            <div className="principle-icon">🚀</div>
            <h4>Portability</h4>
            <p>Easy to transport and transfer</p>
            <div className="principle-example">Digital: Instant global transfer</div>
          </div>
          
          <div className="principle-card">
            <div className="principle-icon">🔄</div>
            <h4>Fungibility</h4>
            <p>Each unit is interchangeable</p>
            <div className="principle-example">Every Bitcoin is identical</div>
          </div>
        </div>
      </div>

      {/* Mastery Dashboard */}
      <div className="mastery-dashboard">
        <h3>🏆 Monetary Mastery Systems</h3>
        <div className="mastery-grid">
          <div className="mastery-card">
            <h4>🔍 Collapse Detection</h4>
            <div className="mastery-progress">
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${Math.min(monetaryCollapseAlerts.filter(a => a.resolved).length * 25, 100)}%` }}
                />
              </div>
              <span>{monetaryCollapseAlerts.filter(a => a.resolved).length}/4 Alerts Resolved</span>
            </div>
          </div>

          <div className="mastery-card">
            <h4>🏗️ Sound Money Engineering</h4>
            <div className="mastery-progress">
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${Math.min(soundMoneyEngineering.efficiency, 100)}%` }}
                />
              </div>
              <span>{soundMoneyEngineering.systems} Systems Built</span>
            </div>
          </div>

          <div className="mastery-card">
            <h4>🛡️ Inflation Defense</h4>
            <div className="mastery-progress">
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${Math.min(inflationDefense.protection, 100)}%` }}
                />
              </div>
              <span>{inflationDefense.shields} Shields Active</span>
            </div>
          </div>

          <div className="mastery-card">
            <h4>👑 Economic Sovereignty</h4>
            <div className="mastery-progress">
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${Math.min(economicSovereignty.independence, 100)}%` }}
                />
              </div>
              <span>{economicSovereignty.independence}% Independence</span>
            </div>
          </div>

          <div className="mastery-card">
            <h4>💎 Wealth Preservation</h4>
            <div className="mastery-progress">
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${Math.min(wealthPreservation.preserved, 100)}%` }}
                />
              </div>
              <span>{wealthPreservation.preserved}% Preserved</span>
            </div>
          </div>

          <div className="mastery-card">
            <h4>🏅 Sound Money Sovereignty</h4>
            <div className="mastery-progress">
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${Math.min(soundMoneySovereignty.sovereignty, 100)}%` }}
                />
              </div>
              <span>{soundMoneySovereignty.sovereignty}% Sovereignty</span>
            </div>
          </div>
        </div>
      </div>

      {/* Crisis Statistics */}
      <div className="crisis-statistics">
        <h3>📊 Monetary Crisis Defense Statistics</h3>
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
        <h3>🏅 Sound Money Achievement Unlocks</h3>
        <div className="achievements-grid">
          <div className={`achievement ${masteryPoints >= 500 ? 'unlocked' : 'locked'}`}>
            <div className="achievement-icon">🔍</div>
            <div className="achievement-name">Monetary Collapse Detective</div>
            <div className="achievement-desc">Master monetary system failure analysis</div>
          </div>
          <div className={`achievement ${masteryPoints >= 1000 ? 'unlocked' : 'locked'}`}>
            <div className="achievement-icon">🏗️</div>
            <div className="achievement-name">Sound Money Engineer</div>
            <div className="achievement-desc">Engineer sound monetary systems</div>
          </div>
          <div className={`achievement ${masteryPoints >= 1500 ? 'unlocked' : 'locked'}`}>
            <div className="achievement-icon">🛡️</div>
            <div className="achievement-name">Inflation Defense Architect</div>
            <div className="achievement-desc">Architect defenses against inflation</div>
          </div>
          <div className={`achievement ${masteryPoints >= 2000 ? 'unlocked' : 'locked'}`}>
            <div className="achievement-icon">👑</div>
            <div className="achievement-name">Economic Sovereignty Guardian</div>
            <div className="achievement-desc">Guard economic sovereignty</div>
          </div>
          <div className={`achievement ${masteryPoints >= 2500 ? 'unlocked' : 'locked'}`}>
            <div className="achievement-icon">💎</div>
            <div className="achievement-name">Wealth Preservation Master</div>
            <div className="achievement-desc">Master wealth preservation techniques</div>
          </div>
          <div className={`achievement ${masteryPoints >= 3000 ? 'unlocked' : 'locked'}`}>
            <div className="achievement-icon">🏅</div>
            <div className="achievement-name">Sound Money Sovereign</div>
            <div className="achievement-desc">Achieve sound money sovereignty</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoneyModule; 