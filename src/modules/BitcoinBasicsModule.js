import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '../contexts/ProgressContext';
import { Zap, AlertTriangle, Target, Trophy } from 'lucide-react';
import { 
  ContinueButton, 
  ActionButton, 
  OptionButton
} from '../components/EnhancedButtons';
import '../components/ModuleLayout.css';
import '../components/ModuleCommon.css';
import './BitcoinBasicsModule.css';

const BitcoinBasicsModule = () => {
  const { completeModule } = useProgress();
  const navigate = useNavigate();
  const [currentPhase, setCurrentPhase] = useState(0);
  const [completedPhases, setCompletedPhases] = useState(new Set());
  const [crisisAlerts, setCrisisAlerts] = useState([]);
  const [masteryPoints, setMasteryPoints] = useState(0);
  const [achievements, setAchievements] = useState([]);

  // Crisis Alert System
  useEffect(() => {
    const alerts = [
      "⚠️ ENERGY-TRUST CRISIS: Fiat money requires infinite trust but zero energy",
      "🔥 FOUNDATION FAILURE: Traditional money systems built on trust dependencies",
      "⚡ BITCOIN BREAKTHROUGH: Energy-backed digital scarcity eliminates trust requirements",
      "🛡️ SOVEREIGNTY ALERT: Master Bitcoin's energy-trust breakthrough for financial freedom"
    ];
    
    let alertIndex = 0;
    const interval = setInterval(() => {
      setCrisisAlerts(prev => [...prev.slice(-2), alerts[alertIndex % alerts.length]]);
      alertIndex++;
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Achievement System
  const unlockAchievement = useCallback((id, title, description) => {
    if (!achievements.find(a => a.id === id)) {
      setAchievements(prev => [...prev, { id, title, description, timestamp: Date.now() }]);
      setMasteryPoints(prev => prev + 100);
    }
  }, [achievements]);

  // Challenge Validation System
  const validateChallenge = (challengeId, answer, correctAnswer, points = 50) => {
    const isCorrect = answer === correctAnswer;
    
    if (isCorrect) {
      setMasteryPoints(prev => prev + points);
    }
    
    return isCorrect;
  };

  const handlePhaseComplete = (phaseIndex) => {
    const newCompletedPhases = new Set(completedPhases);
    newCompletedPhases.add(phaseIndex);
    setCompletedPhases(newCompletedPhases);
    
    if (phaseIndex === phases.length - 1) {
      completeModule('bitcoin-basics');
      unlockAchievement('bitcoin_foundation_sovereign', 'Bitcoin Foundation Sovereign', 'Mastered Bitcoin\'s energy-trust breakthrough');
      setTimeout(() => navigate('/'), 2000);
    } else {
      setCurrentPhase(phaseIndex + 1);
    }
  };

  // Phase 1: Energy-Trust Crisis Detective
  const EnergyTrustCrisisDetective = ({ onComplete }) => {
    const [selectedScenario, setSelectedScenario] = useState(null);
    const [analysisComplete, setAnalysisComplete] = useState(false);
    const [crisisInsight, setCrisisInsight] = useState(null);

    const scenarios = [
      {
        id: 'ice_rink',
        title: "Ice Rink Energy Test",
        description: "Push heavy box across frictionless ice",
        energyCost: 5,
        trustRequired: "None",
        result: "Easy push, no energy wasted",
        crisis: "Low energy = Low security",
        icon: "🧊"
      },
      {
        id: 'concrete',
        title: "Concrete Floor Energy Test", 
        description: "Push same box across rough concrete",
        energyCost: 95,
        trustRequired: "None",
        result: "Hard push, friction creates heat",
        crisis: "High energy = High security",
        icon: "🏗️"
      },
      {
        id: 'fiat_creation',
        title: "Fiat Money Creation",
        description: "Bank creates $270,000 with keystrokes",
        energyCost: 0.1,
        trustRequired: "Infinite",
        result: "Instant money creation",
        crisis: "Zero energy = Zero security",
        icon: "💸"
      }
    ];

    const insights = [
      { text: "Energy cost creates security", value: "energy_security" },
      { text: "Fiat money has no energy backing", value: "fiat_weakness" },
      { text: "Trust requirements are vulnerabilities", value: "trust_vulnerability" }
    ];

    const handleScenarioAnalysis = (scenario) => {
      setSelectedScenario(scenario);
      setAnalysisComplete(true);
      
      if (scenario.id === 'fiat_creation') {
        unlockAchievement('crisis_detective', 'Energy-Trust Crisis Detective', 'Identified the energy-trust crisis in fiat systems');
      }
    };

    return (
      <div className="crisis-phase energy-trust-detective">
        <div className="crisis-header">
          <div className="crisis-icon">🔍</div>
          <h2>Energy-Trust Crisis Detective</h2>
          <p className="crisis-subtitle">Investigate the fundamental energy-trust contradictions in money systems</p>
        </div>

        <div className="crisis-dashboard">
          <div className="crisis-metric">
            <span className="metric-label">Energy-Trust Crisis Level</span>
            <span className="metric-value critical">CRITICAL</span>
            </div>
          <div className="crisis-metric">
            <span className="metric-label">Fiat Vulnerability</span>
            <span className="metric-value extreme">EXTREME</span>
          </div>
          <div className="crisis-metric">
            <span className="metric-label">Bitcoin Solution</span>
            <span className="metric-value optimal">OPTIMAL</span>
          </div>
          </div>

        <div className="investigation-lab">
          <h3>🧪 Energy-Trust Investigation Lab</h3>
          <p>Test different systems to discover the energy-trust relationship:</p>
          
          <div className="scenarios-grid">
            {scenarios.map((scenario) => (
              <div 
                key={scenario.id}
                className={`scenario-card ${selectedScenario?.id === scenario.id ? 'selected' : ''}`}
                onClick={() => handleScenarioAnalysis(scenario)}
              >
                <div className="scenario-icon">{scenario.icon}</div>
                <h4>{scenario.title}</h4>
                <p>{scenario.description}</p>
                
                <div className="scenario-metrics">
                  <div className="metric">
                    <span className="metric-label">Energy Cost:</span>
                    <span className="metric-value">{scenario.energyCost} units</span>
            </div>
                  <div className="metric">
                    <span className="metric-label">Trust Required:</span>
                    <span className="metric-value">{scenario.trustRequired}</span>
          </div>
        </div>

                {selectedScenario?.id === scenario.id && (
                  <div className="scenario-analysis">
                    <div className="analysis-result">
                      <p><strong>Result:</strong> {scenario.result}</p>
                      <p><strong>Crisis Insight:</strong> {scenario.crisis}</p>
          </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {analysisComplete && (
          <div className="crisis-insight-section">
            <h3>💡 Crisis Pattern Recognition</h3>
            <p>What crisis pattern do you detect across these systems?</p>
            
            <div className="insight-options">
              {insights.map((insight) => (
                <OptionButton
                  key={insight.value}
                  selected={crisisInsight === insight.value}
                  onClick={() => setCrisisInsight(insight.value)}
                >
                  {insight.text}
                </OptionButton>
              ))}
        </div>
        
            {crisisInsight && (
              <div className="insight-result">
                <div className="result-icon">🎯</div>
                <p>
                  {crisisInsight === 'energy_security' && "BREAKTHROUGH! Energy cost creates unfakeable security. This is Bitcoin's foundation."}
                  {crisisInsight === 'fiat_weakness' && "CRITICAL INSIGHT! Fiat money costs no energy to create, making it infinitely fakeable."}
                  {crisisInsight === 'trust_vulnerability' && "CRISIS IDENTIFIED! Every trust requirement is a vulnerability that can be exploited."}
                </p>
        </div>
            )}
          </div>
        )}

        <ContinueButton
          onClick={onComplete}
          completed={analysisComplete && crisisInsight}
          nextStep="Bitcoin Foundation Engineer"
        >
          Advance to Foundation Engineering →
        </ContinueButton>
      </div>
    );
  };

  // Phase 2: Bitcoin Foundation Engineer
  const BitcoinFoundationEngineer = ({ onComplete }) => {
    const [foundationPrinciples, setFoundationPrinciples] = useState({});
    const [engineeringComplete, setEngineeringComplete] = useState(false);

    const principles = [
      {
        id: 'energy_backing',
        title: "Energy-Backed Digital Scarcity",
        description: "Bitcoin uses real energy to create digital scarcity",
        challenge: "How does energy create digital scarcity?",
        options: [
          "Energy cost makes Bitcoin expensive to create",
          "Energy spent cannot be recovered or reused", 
          "Energy creates mathematical proof of work"
        ],
        correct: 1,
        explanation: "Energy spent mining Bitcoin is permanently consumed - it cannot be spent twice, creating true digital scarcity."
      },
      {
        id: 'trust_elimination',
        title: "Trust Elimination Architecture",
        description: "Bitcoin replaces trust with mathematical proof",
        challenge: "What eliminates the need for trust in Bitcoin?",
        options: [
          "Government guarantees Bitcoin's value",
          "Banks verify all Bitcoin transactions",
          "Mathematical proof replaces human trust"
        ],
        correct: 2,
        explanation: "Bitcoin uses cryptographic proof instead of trust - no humans or institutions needed to verify transactions."
      },
      {
        id: 'double_spend_prevention',
        title: "Double-Spend Prevention System",
        description: "Bitcoin prevents spending the same money twice",
        challenge: "How does Bitcoin prevent double-spending?",
        options: [
          "Banks monitor all transactions",
          "Energy cost makes it impossible to fake history",
          "Government regulations prevent double-spending"
        ],
        correct: 1,
        explanation: "The energy cost of mining makes it impossible to rewrite Bitcoin's transaction history."
      }
    ];

    const handlePrincipleChallenge = (principleId, answer) => {
      const principle = principles.find(p => p.id === principleId);
      const isCorrect = validateChallenge(principleId, answer, principle.correct);
      
      setFoundationPrinciples(prev => ({
        ...prev,
        [principleId]: { answer, correct: isCorrect, completed: true }
      }));

      if (isCorrect && Object.keys(foundationPrinciples).length === principles.length - 1) {
        setEngineeringComplete(true);
        unlockAchievement('foundation_engineer', 'Bitcoin Foundation Engineer', 'Mastered Bitcoin\'s foundational principles');
      }
    };

        return (
      <div className="crisis-phase foundation-engineer">
        <div className="crisis-header">
          <div className="crisis-icon">⚡</div>
          <h2>Bitcoin Foundation Engineer</h2>
          <p className="crisis-subtitle">Master Bitcoin's energy-trust breakthrough principles</p>
        </div>

        <div className="engineering-dashboard">
          <div className="dashboard-metric">
            <span className="metric-label">Foundation Principles</span>
            <span className="metric-value">{Object.keys(foundationPrinciples).length}/{principles.length}</span>
              </div>
          <div className="dashboard-metric">
            <span className="metric-label">Engineering Progress</span>
            <span className="metric-value">{Math.round((Object.keys(foundationPrinciples).length / principles.length) * 100)}%</span>
              </div>
            </div>

        <div className="foundation-principles">
          <h3>🏗️ Bitcoin Foundation Principles</h3>
          
          {principles.map((principle, index) => (
            <div key={principle.id} className="principle-card">
              <div className="principle-header">
                <div className="principle-number">{index + 1}</div>
                <div className="principle-info">
                  <h4>{principle.title}</h4>
                  <p>{principle.description}</p>
                  </div>
                </div>

              <div className="principle-challenge">
                <h5>🎯 Engineering Challenge:</h5>
                <p>{principle.challenge}</p>
                
                <div className="challenge-options">
                  {principle.options.map((option, optionIndex) => (
                    <OptionButton
                      key={optionIndex}
                      selected={foundationPrinciples[principle.id]?.answer === optionIndex}
                      onClick={() => handlePrincipleChallenge(principle.id, optionIndex)}
                      disabled={foundationPrinciples[principle.id]?.completed}
            >
                      {option}
                    </OptionButton>
                  ))}
                </div>

                {foundationPrinciples[principle.id]?.completed && (
                  <div className="challenge-result">
                    <div className={`result-icon ${foundationPrinciples[principle.id].correct ? 'correct' : 'incorrect'}`}>
                      {foundationPrinciples[principle.id].correct ? '✅' : '❌'}
                  </div>
                    <p>{principle.explanation}</p>
              </div>
            )}
              </div>
                 </div>
               ))}
             </div>

          <ContinueButton 
            onClick={onComplete}
          completed={engineeringComplete}
          nextStep="Fiat Vulnerability Analyst"
          >
          Advance to Vulnerability Analysis →
          </ContinueButton>
          </div>
        );
  };

  // Phase 3: Fiat Vulnerability Analyst
  const FiatVulnerabilityAnalyst = ({ onComplete }) => {
    const [vulnerabilities, setVulnerabilities] = useState({});
    const [analysisComplete, setAnalysisComplete] = useState(false);

    const fiatVulnerabilities = [
      {
        id: 'infinite_printing',
        title: "Infinite Money Printing Vulnerability",
        description: "Governments can create unlimited money with no energy cost",
        scenario: "Sarah needs $270,000 for a house. Bank creates it with keystrokes.",
        impact: "Everyone's savings lose value through inflation",
        severity: "CRITICAL",
        bitcoinSolution: "Fixed 21 million supply - no inflation possible"
      },
      {
        id: 'trust_dependency',
        title: "Trust Dependency Vulnerability", 
        description: "Fiat money only works if people trust institutions",
        scenario: "Venezuela's currency collapsed when people lost trust in government",
        impact: "Money becomes worthless overnight",
        severity: "EXTREME",
        bitcoinSolution: "No trust required - mathematical proof only"
      },
      {
        id: 'permission_control',
        title: "Permission Control Vulnerability",
        description: "Banks and governments can freeze or block transactions",
        scenario: "Canadian truckers had bank accounts frozen during protests",
        impact: "Your money can be taken away at any time",
        severity: "HIGH",
        bitcoinSolution: "Permissionless - no one can stop Bitcoin transactions"
      }
    ];

    const handleVulnerabilityAnalysis = (vulnerabilityId, understood) => {
      setVulnerabilities(prev => ({
        ...prev,
        [vulnerabilityId]: { understood, timestamp: Date.now() }
      }));

      if (understood && Object.keys(vulnerabilities).length === fiatVulnerabilities.length - 1) {
        setAnalysisComplete(true);
        unlockAchievement('vulnerability_analyst', 'Fiat Vulnerability Analyst', 'Identified critical fiat system vulnerabilities');
      }
    };

    return (
      <div className="crisis-phase vulnerability-analyst">
        <div className="crisis-header">
          <div className="crisis-icon">🔍</div>
          <h2>Fiat Vulnerability Analyst</h2>
          <p className="crisis-subtitle">Analyze fiat system's trust dependencies and critical failures</p>
        </div>
            
        <div className="vulnerability-dashboard">
          <div className="dashboard-alert">
            <AlertTriangle className="alert-icon" />
            <span>VULNERABILITY SCAN: {fiatVulnerabilities.length} Critical Flaws Detected</span>
          </div>
                </div>
                
        <div className="vulnerability-analysis">
          <h3>🚨 Fiat System Vulnerability Report</h3>
          
          {fiatVulnerabilities.map((vulnerability) => (
            <div key={vulnerability.id} className="vulnerability-card">
              <div className="vulnerability-header">
                <div className={`severity-badge ${vulnerability.severity.toLowerCase()}`}>
                  {vulnerability.severity}
                          </div>
                <h4>{vulnerability.title}</h4>
          </div>

              <div className="vulnerability-details">
                <p><strong>Description:</strong> {vulnerability.description}</p>
                <p><strong>Real-World Example:</strong> {vulnerability.scenario}</p>
                <p><strong>Impact:</strong> {vulnerability.impact}</p>
                <p><strong>Bitcoin Solution:</strong> {vulnerability.bitcoinSolution}</p>
        </div>

              <div className="vulnerability-question">
                <p>Do you understand how this vulnerability threatens financial sovereignty?</p>
                <div className="question-options">
                  <ActionButton
              variant="primary"
                    onClick={() => handleVulnerabilityAnalysis(vulnerability.id, true)}
                    disabled={vulnerabilities[vulnerability.id]?.understood}
                  >
                    Yes, I understand the threat
                  </ActionButton>
                  <ActionButton
                    variant="secondary"
                    onClick={() => handleVulnerabilityAnalysis(vulnerability.id, false)}
                    disabled={vulnerabilities[vulnerability.id]?.understood}
                  >
                    Need more explanation
                  </ActionButton>
          </div>

                {vulnerabilities[vulnerability.id]?.understood && (
                  <div className="analysis-confirmed">
                    <div className="confirmation-icon">✅</div>
                    <p>Vulnerability analysis complete. Bitcoin eliminates this attack vector.</p>
              </div>
                )}
              </div>
            </div>
          ))}
            </div>

          <ContinueButton 
            onClick={onComplete}
          completed={analysisComplete}
          nextStep="Digital Scarcity Architect"
          >
          Advance to Scarcity Architecture →
          </ContinueButton>
      </div>
    );
  };

  // Phase 4: Digital Scarcity Architect
  const DigitalScarcityArchitect = ({ onComplete }) => {
    const [scarcityDesign, setScarcityDesign] = useState({});
    const [architectureComplete, setArchitectureComplete] = useState(false);

    const scarcityComponents = [
      {
        id: 'energy_cost',
        title: "Energy Cost Mechanism",
        description: "Design energy requirements for digital scarcity",
        challenge: "How much energy should creating new Bitcoin require?",
        options: [
          "Minimal energy - make it cheap and easy",
          "Massive energy - make it expensive and secure",
          "Variable energy - adjust based on demand"
        ],
        correct: 1,
        explanation: "Massive energy cost makes Bitcoin impossible to counterfeit - security through energy expenditure."
      },
      {
        id: 'supply_limit',
        title: "Supply Limitation System",
        description: "Design maximum supply constraints",
        challenge: "What should be Bitcoin's maximum supply?",
        options: [
          "Unlimited supply - create as needed",
          "Fixed supply - never exceed 21 million",
          "Elastic supply - adjust with economy"
        ],
        correct: 1,
        explanation: "Fixed supply of 21 million ensures Bitcoin cannot be inflated away like fiat currencies."
      },
      {
        id: 'difficulty_adjustment',
        title: "Difficulty Adjustment Algorithm",
        description: "Design automatic difficulty adjustments",
        challenge: "How should Bitcoin maintain consistent block times?",
        options: [
          "Manual adjustment by developers",
          "Automatic adjustment every 2016 blocks",
          "Market-driven adjustment by miners"
        ],
        correct: 1,
        explanation: "Automatic difficulty adjustment every 2016 blocks maintains 10-minute block times regardless of mining power."
      }
    ];

    const handleArchitectureChallenge = (componentId, answer) => {
      const component = scarcityComponents.find(c => c.id === componentId);
      const isCorrect = validateChallenge(componentId, answer, component.correct);
      
      setScarcityDesign(prev => ({
        ...prev,
        [componentId]: { answer, correct: isCorrect, completed: true }
      }));

      if (isCorrect && Object.keys(scarcityDesign).length === scarcityComponents.length - 1) {
        setArchitectureComplete(true);
        unlockAchievement('scarcity_architect', 'Digital Scarcity Architect', 'Designed energy-backed digital scarcity systems');
      }
    };

    return (
      <div className="crisis-phase scarcity-architect">
        <div className="crisis-header">
          <div className="crisis-icon">🏗️</div>
          <h2>Digital Scarcity Architect</h2>
          <p className="crisis-subtitle">Design energy-backed digital scarcity systems</p>
                      </div>

        <div className="architecture-dashboard">
          <div className="dashboard-metric">
            <span className="metric-label">Architecture Components</span>
            <span className="metric-value">{Object.keys(scarcityDesign).length}/{scarcityComponents.length}</span>
                        </div>
          <div className="dashboard-metric">
            <span className="metric-label">Design Progress</span>
            <span className="metric-value">{Math.round((Object.keys(scarcityDesign).length / scarcityComponents.length) * 100)}%</span>
                        </div>
                      </div>

        <div className="scarcity-architecture">
          <h3>⚡ Digital Scarcity Architecture</h3>
          <p>Design the components that create true digital scarcity:</p>
          
          {scarcityComponents.map((component, index) => (
            <div key={component.id} className="component-card">
              <div className="component-header">
                <div className="component-number">{index + 1}</div>
                <div className="component-info">
                  <h4>{component.title}</h4>
                  <p>{component.description}</p>
                      </div>
                      </div>

              <div className="component-challenge">
                <h5>🎯 Architecture Challenge:</h5>
                <p>{component.challenge}</p>
                
                <div className="challenge-options">
                  {component.options.map((option, optionIndex) => (
                    <OptionButton
                      key={optionIndex}
                      selected={scarcityDesign[component.id]?.answer === optionIndex}
                      onClick={() => handleArchitectureChallenge(component.id, optionIndex)}
                      disabled={scarcityDesign[component.id]?.completed}
                    >
                      {option}
                    </OptionButton>
                  ))}
                </div>

                {scarcityDesign[component.id]?.completed && (
                  <div className="challenge-result">
                    <div className={`result-icon ${scarcityDesign[component.id].correct ? 'correct' : 'incorrect'}`}>
                      {scarcityDesign[component.id].correct ? '✅' : '❌'}
                  </div>
                    <p>{component.explanation}</p>
                  </div>
                )}
                    </div>
                  </div>
                ))}
        </div>

        <ContinueButton 
          onClick={onComplete}
          completed={architectureComplete}
          nextStep="Double-Spend Defense Master"
        >
          Advance to Double-Spend Defense →
        </ContinueButton>
      </div>
    );
  };

  // Phase 5: Double-Spend Defense Master
  const DoubleSpendDefenseMaster = ({ onComplete }) => {
    const [testResults, setTestResults] = useState({});
    const [masteryComplete, setMasteryComplete] = useState(false);

    const defenseTests = [
      {
        id: 'physical_energy',
        title: "Physical Energy Test",
        description: "You burned 1000 calories pushing a box through quicksand",
        question: "Can you use those same 1000 calories to push another box?",
        options: ["Yes, energy can be reused", "No, energy is permanently spent"],
        correct: 1,
        result: "❌ IMPOSSIBLE! Energy is permanently consumed and cannot be double-spent.",
        principle: "Physical energy cannot be spent twice"
      },
      {
        id: 'digital_fiat',
        title: "Digital Fiat Test",
        description: "You have $1000 in your bank account",
        question: "Can you spend that same $1000 twice through system manipulation?",
        options: ["No, impossible to double-spend", "Yes, if you hack the system"],
        correct: 1,
        result: "🚨 POSSIBLE! Digital fiat can be double-spent through system vulnerabilities.",
        principle: "Digital fiat lacks physical constraints"
      },
      {
        id: 'bitcoin_energy',
        title: "Bitcoin Energy Test",
        description: "Miners spent 1000 energy units to secure your Bitcoin transaction",
        question: "Can that same energy be used to create a conflicting transaction?",
        options: ["Yes, energy can be reused", "No, energy is permanently spent"],
        correct: 1,
        result: "❌ IMPOSSIBLE! Energy spent mining Bitcoin cannot be recovered or reused.",
        principle: "Bitcoin inherits physical energy constraints"
      }
    ];

    const handleDefenseTest = (testId, answer) => {
      const test = defenseTests.find(t => t.id === testId);
      const isCorrect = validateChallenge(testId, answer, test.correct);
      
      setTestResults(prev => ({
        ...prev,
        [testId]: { answer, correct: isCorrect, completed: true }
      }));

      if (Object.keys(testResults).length === defenseTests.length - 1) {
        setMasteryComplete(true);
        unlockAchievement('double_spend_master', 'Double-Spend Defense Master', 'Mastered Bitcoin\'s double-spend prevention');
      }
    };

    return (
      <div className="crisis-phase double-spend-master">
        <div className="crisis-header">
          <div className="crisis-icon">🛡️</div>
          <h2>Double-Spend Defense Master</h2>
          <p className="crisis-subtitle">Master Bitcoin's double-spend prevention mechanisms</p>
        </div>

        <div className="defense-dashboard">
          <div className="dashboard-metric">
            <span className="metric-label">Defense Tests</span>
            <span className="metric-value">{Object.keys(testResults).length}/{defenseTests.length}</span>
                      </div>
          <div className="dashboard-metric">
            <span className="metric-label">Mastery Level</span>
            <span className="metric-value">{Math.round((Object.keys(testResults).length / defenseTests.length) * 100)}%</span>
              </div>
            </div>

        <div className="defense-testing">
          <h3>⚔️ Double-Spend Defense Testing</h3>
          <p>Test different systems to understand double-spend prevention:</p>
          
          {defenseTests.map((test) => (
            <div key={test.id} className="defense-test-card">
              <div className="test-header">
                <h4>{test.title}</h4>
                <p>{test.description}</p>
            </div>

              <div className="test-challenge">
                <h5>🎯 Defense Challenge:</h5>
                <p>{test.question}</p>
                
                <div className="challenge-options">
                  {test.options.map((option, optionIndex) => (
                    <OptionButton
                      key={optionIndex}
                      selected={testResults[test.id]?.answer === optionIndex}
                      onClick={() => handleDefenseTest(test.id, optionIndex)}
                      disabled={testResults[test.id]?.completed}
                    >
                      {option}
                    </OptionButton>
                    ))}
              </div>

                {testResults[test.id]?.completed && (
                  <div className="test-result">
                    <div className="result-display">
                      <p><strong>Result:</strong> {test.result}</p>
                      <p><strong>Principle:</strong> {test.principle}</p>
                  </div>
                </div>
                )}
              </div>
                      </div>
                    ))}
            </div>

            <ContinueButton 
              onClick={onComplete}
          completed={masteryComplete}
          nextStep="Bitcoin Foundation Sovereign"
            >
          Advance to Foundation Sovereignty →
            </ContinueButton>
      </div>
    );
  };

  // Phase 6: Bitcoin Foundation Sovereign
  const BitcoinFoundationSovereign = ({ onComplete }) => {
    const [sovereigntyLevel, setSovereigntyLevel] = useState(0);
    const [masteryAchieved, setMasteryAchieved] = useState(false);

    const sovereigntyMilestones = [
      "✅ Identified energy-trust crisis in fiat systems",
      "✅ Mastered Bitcoin's foundational principles", 
      "✅ Analyzed fiat system vulnerabilities",
      "✅ Designed digital scarcity architecture",
      "✅ Mastered double-spend prevention",
      "🎯 Achieved Bitcoin Foundation Sovereignty"
    ];

    useEffect(() => {
      const interval = setInterval(() => {
        setSovereigntyLevel(prev => {
          if (prev < sovereigntyMilestones.length - 1) {
            return prev + 1;
          } else {
            setMasteryAchieved(true);
            return prev;
          }
        });
      }, 1000);

      return () => clearInterval(interval);
    }, [sovereigntyMilestones.length]);

    return (
      <div className="crisis-phase foundation-sovereign">
        <div className="crisis-header">
          <div className="crisis-icon">👑</div>
          <h2>Bitcoin Foundation Sovereign</h2>
          <p className="crisis-subtitle">You have achieved complete Bitcoin foundation mastery</p>
        </div>

        <div className="sovereignty-dashboard">
          <div className="dashboard-metric">
            <span className="metric-label">Mastery Points</span>
            <span className="metric-value">{masteryPoints}</span>
              </div>
          <div className="dashboard-metric">
            <span className="metric-label">Achievements</span>
            <span className="metric-value">{achievements.length}</span>
            </div>
          </div>

        <div className="sovereignty-journey">
          <h3>🏆 Your Bitcoin Foundation Journey</h3>
          
          <div className="milestones-list">
            {sovereigntyMilestones.map((milestone, index) => (
              <div 
                key={index}
                className={`milestone ${index <= sovereigntyLevel ? 'completed' : 'pending'}`}
              >
                <div className="milestone-icon">
                  {index <= sovereigntyLevel ? '✅' : '⏳'}
                      </div>
                <span className="milestone-text">{milestone}</span>
                  </div>
            ))}
                </div>
            </div>

        <div className="achievements-showcase">
          <h3>🎖️ Achievements Unlocked</h3>
          <div className="achievements-grid">
            {achievements.map((achievement) => (
              <div key={achievement.id} className="achievement-card">
                <div className="achievement-icon">🏆</div>
                <h4>{achievement.title}</h4>
                <p>{achievement.description}</p>
                </div>
            ))}
          </div>
        </div>

        <div className="sovereignty-declaration">
          <h3>⚡ Bitcoin Foundation Sovereignty Achieved</h3>
          <div className="declaration-content">
            <p>You have mastered Bitcoin's energy-trust breakthrough and understand:</p>
            <ul>
              <li>🔥 How energy cost creates digital scarcity</li>
              <li>🛡️ How mathematical proof eliminates trust</li>
              <li>⚡ How Bitcoin solves the double-spend problem</li>
              <li>🏗️ How to architect sound digital money</li>
              <li>👑 How to achieve financial sovereignty</li>
            </ul>
            </div>
          </div>

          <ContinueButton 
            onClick={onComplete}
          completed={masteryAchieved}
          nextStep="Complete Module"
          >
          Complete Bitcoin Foundation Mastery →
          </ContinueButton>
      </div>
    );
  };

  // Phase definitions
  const phases = [
    {
      id: 'energy_trust_detective',
      title: 'Energy-Trust Crisis Detective',
      component: EnergyTrustCrisisDetective,
      description: 'Investigate energy-trust contradictions'
    },
    {
      id: 'foundation_engineer',
      title: 'Bitcoin Foundation Engineer',
      component: BitcoinFoundationEngineer,
      description: 'Master Bitcoin breakthrough principles'
    },
    {
      id: 'vulnerability_analyst',
      title: 'Fiat Vulnerability Analyst',
      component: FiatVulnerabilityAnalyst,
      description: 'Analyze fiat system failures'
    },
    {
      id: 'scarcity_architect',
      title: 'Digital Scarcity Architect',
      component: DigitalScarcityArchitect,
      description: 'Design energy-backed scarcity'
    },
    {
      id: 'double_spend_master',
      title: 'Double-Spend Defense Master',
      component: DoubleSpendDefenseMaster,
      description: 'Master prevention mechanisms'
    },
    {
      id: 'foundation_sovereign',
      title: 'Bitcoin Foundation Sovereign',
      component: BitcoinFoundationSovereign,
      description: 'Achieve complete mastery'
    }
  ];

  const renderPhase = (phase, index) => {
    const PhaseComponent = phase.component;
    return (
      <PhaseComponent
        key={phase.id}
        onComplete={() => handlePhaseComplete(index)}
      />
    );
    };

    return (
    <div className="module-container bitcoin-basics-crisis">
      {/* Crisis Command Center Header */}
      <div className="crisis-command-center">
        <div className="command-header">
          <div className="crisis-badge">
            <AlertTriangle className="crisis-icon" />
            <span>BITCOIN FOUNDATION CRISIS ARCHITECT</span>
          </div>
          <h1 className="crisis-title">Energy-Trust Crisis vs. Bitcoin Foundation Sovereignty</h1>
        </div>

        {/* Live Crisis Alerts */}
        <div className="crisis-alerts">
          {crisisAlerts.slice(-1).map((alert, index) => (
            <div key={index} className="crisis-alert">
              <div className="alert-pulse"></div>
              <span>{alert}</span>
            </div>
                ))}
              </div>

        {/* Crisis Metrics Dashboard */}
        <div className="crisis-metrics">
          <div className="metric-card">
            <Zap className="metric-icon" />
            <div className="metric-content">
              <span className="metric-label">Mastery Points</span>
              <span className="metric-value">{masteryPoints}</span>
                    </div>
                  </div>
          <div className="metric-card">
            <Trophy className="metric-icon" />
            <div className="metric-content">
              <span className="metric-label">Achievements</span>
              <span className="metric-value">{achievements.length}</span>
                </div>
            </div>
          <div className="metric-card">
            <Target className="metric-icon" />
            <div className="metric-content">
              <span className="metric-label">Phase Progress</span>
              <span className="metric-value">{completedPhases.size}/{phases.length}</span>
          </div>
          </div>
        </div>
            </div>

      {/* Phase Navigation */}
      <div className="phase-navigation">
        {phases.map((phase, index) => (
          <div
            key={phase.id}
            className={`phase-nav-item ${
              index === currentPhase ? 'active' : ''
            } ${completedPhases.has(index) ? 'completed' : ''}`}
          >
            <div className="phase-number">{index + 1}</div>
            <div className="phase-info">
              <span className="phase-title">{phase.title}</span>
              <span className="phase-description">{phase.description}</span>
          </div>
            {completedPhases.has(index) && (
              <div className="phase-completed">✅</div>
        )}
          </div>
        ))}
          </div>

      {/* Current Phase Content */}
      <div className="phase-content">
        {renderPhase(phases[currentPhase], currentPhase)}
      </div>

      {/* Progress Tracking */}
      <div className="progress-footer">
        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ width: `${(completedPhases.size / phases.length) * 100}%` }}
          />
        </div>
        <span className="progress-text">
          Phase {currentPhase + 1} of {phases.length} • {completedPhases.size} completed
        </span>
      </div>
    </div>
  );
};

export default BitcoinBasicsModule; 