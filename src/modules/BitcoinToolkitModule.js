import React, { useState, useEffect, useCallback } from 'react';
import { useProgress } from '../contexts/ProgressContext';
import { 
  Zap, Trophy, AlertTriangle, Target
} from 'lucide-react';
import { 
  ContinueButton, 
  ActionButton, 
  OptionButton
} from '../components/EnhancedButtons';
import '../components/ModuleCommon.css';
import './BitcoinToolkitModule.css';

const BitcoinToolkitModule = () => {
  const { completeModule } = useProgress();
  const [currentPhase, setCurrentPhase] = useState(0);
  const [completedPhases, setCompletedPhases] = useState(new Set());
  const [crisisAlerts, setCrisisAlerts] = useState([]);
  const [masteryPoints, setMasteryPoints] = useState(0);
  const [achievements, setAchievements] = useState([]);

  // Crisis Alert System
  useEffect(() => {
    const alerts = [
      "⚠️ MASTERY CRISIS: Bitcoin theory without practical skills leaves users vulnerable",
      "🔥 IMPLEMENTATION GAP: 90% of Bitcoin users lack hands-on technical experience",
      "⚡ SOVEREIGNTY THREAT: Practical mastery gap prevents true Bitcoin independence",
      "🛡️ MASTERY ALERT: Real Bitcoin sovereignty requires practical tool mastery"
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
    setAchievements(prev => {
      const exists = prev.find(a => a.id === id);
      if (!exists) {
        setMasteryPoints(current => current + 150);
        return [...prev, { id, title, description, timestamp: Date.now() }];
      }
      return prev;
    });
  }, []);

  // Tool Mastery Validation System
  const validateToolMastery = (skillData, requiredSkills) => {
    const masteredSkills = requiredSkills.filter(skill => skillData[skill]);
    const masteryLevel = masteredSkills.length / requiredSkills.length;
    
    if (masteryLevel >= 0.8) {
      setMasteryPoints(prev => prev + 100);
      return true;
    }
    
    return false;
  };

  // Phase definitions - moved up to be accessible
  const phases = [
    {
      id: 'practical_crisis_detective',
      title: 'Practical-Theoretical Crisis Detective',
      description: 'Identify practical-theoretical gaps'
    },
    {
      id: 'tools_engineer',
      title: 'Bitcoin Tools Engineer',
      description: 'Master essential Bitcoin tools'
    },
    {
      id: 'network_analyst',
      title: 'Network Mastery Analyst',
      description: 'Analyze network infrastructure'
    },
    {
      id: 'transaction_architect',
      title: 'Transaction Architecture Master',
      description: 'Master transaction construction'
    },
    {
      id: 'security_guardian',
      title: 'Security Implementation Guardian',
      description: 'Implement security practices'
    },
    {
      id: 'mastery_sovereign',
      title: 'Bitcoin Mastery Sovereign',
      description: 'Achieve complete mastery'
    }
  ];

  const handlePhaseComplete = useCallback((phaseIndex) => {
    const newCompletedPhases = new Set(completedPhases);
    newCompletedPhases.add(phaseIndex);
    setCompletedPhases(newCompletedPhases);
    
    if (phaseIndex === phases.length - 1) {
      completeModule('bitcoin-toolkit');
      unlockAchievement('bitcoin_mastery_sovereign', 'Bitcoin Mastery Sovereign', 'Achieved complete practical Bitcoin mastery');
    } else {
      setCurrentPhase(phaseIndex + 1);
    }
  }, [completedPhases, completeModule, unlockAchievement, phases.length]);

  // Phase 1: Practical-Theoretical Crisis Detective
  const PracticalTheoreticalCrisisDetective = ({ onComplete }) => {
    const [selectedScenario, setSelectedScenario] = useState(null);
    const [crisisAnalysis, setCrisisAnalysis] = useState({});
    const [detectionComplete, setDetectionComplete] = useState(false);

    const crisisScenarios = [
      {
        id: 'theory_only',
        title: "Theory-Only Bitcoin User",
        description: "Understands Bitcoin concepts but can't use tools",
        vulnerability: "Cannot verify transactions, generate addresses, or troubleshoot issues",
        riskLevel: "HIGH",
        realExample: "User loses funds due to inability to verify transaction details",
        icon: "📚"
      },
      {
        id: 'practical_gap',
        title: "Practical Skills Gap",
        description: "Knows Bitcoin exists but lacks implementation skills",
        vulnerability: "Dependent on third parties for all Bitcoin operations",
        riskLevel: "EXTREME",
        realExample: "Exchange failure leaves user unable to recover funds",
        icon: "🔧"
      },
      {
        id: 'security_blindness',
        title: "Security Implementation Blindness",
        description: "Uses Bitcoin tools without understanding security implications",
        vulnerability: "Vulnerable to technical attacks and operational failures",
        riskLevel: "CRITICAL",
        realExample: "Improper key management leads to permanent fund loss",
        icon: "🔒"
      }
    ];

    const analysisQuestions = [
      { 
        question: "What is the most dangerous aspect of the practical-theoretical gap?",
        options: [
          "Users can't explain Bitcoin to others",
          "Users remain dependent on third parties",
          "Users miss investment opportunities"
        ],
        correct: 1,
        explanation: "Third-party dependence is the antithesis of Bitcoin sovereignty"
      },
      {
        question: "How does practical mastery relate to Bitcoin sovereignty?",
        options: [
          "It's optional for most users",
          "It's essential for true independence",
          "It's only needed for developers"
        ],
        correct: 1,
        explanation: "Practical mastery is the foundation of Bitcoin sovereignty"
      }
    ];

    const handleScenarioAnalysis = (scenario) => {
      setSelectedScenario(scenario);
      setCrisisAnalysis(prev => ({
        ...prev,
        [scenario.id]: { analyzed: true, timestamp: Date.now() }
      }));
    };

    const handleAnalysisComplete = () => {
      setDetectionComplete(true);
      unlockAchievement('crisis_detective', 'Practical-Theoretical Crisis Detective', 'Identified the dangerous practical-theoretical gap');
    };

    const handleQuestionAnswer = (questionIndex, optionIndex, question) => {
      setCrisisAnalysis(prev => ({
        ...prev,
        [`q${questionIndex}`]: optionIndex
      }));
      
      if (optionIndex === question.correct) {
        setTimeout(() => {
          setCrisisAnalysis(prev => ({
            ...prev,
            [`q${questionIndex}_result`]: question.explanation
          }));
        }, 500);
      }
    };

      return (
      <div className="crisis-phase practical-crisis-detective">
        <div className="crisis-header">
          <div className="crisis-icon">🔍</div>
          <h2>Practical-Theoretical Crisis Detective</h2>
          <p className="crisis-subtitle">Identify the dangerous gap between Bitcoin theory and practical mastery</p>
              </div>

        <div className="crisis-dashboard">
          <div className="crisis-metric">
            <span className="metric-label">Mastery Gap Crisis Level</span>
            <span className="metric-value critical">EXTREME</span>
            </div>
          <div className="crisis-metric">
            <span className="metric-label">User Vulnerability</span>
            <span className="metric-value critical">CRITICAL</span>
          </div>
          <div className="crisis-metric">
            <span className="metric-label">Practical Mastery Solution</span>
            <span className="metric-value optimal">ESSENTIAL</span>
          </div>
            </div>

        <div className="crisis-scenarios">
          <h3>🚨 Critical Vulnerability Scenarios</h3>
          <p>Analyze these real-world scenarios where practical-theoretical gaps create dangerous vulnerabilities:</p>
          
          <div className="scenarios-grid">
            {crisisScenarios.map((scenario) => (
              <div 
                key={scenario.id}
                className={`scenario-card ${selectedScenario?.id === scenario.id ? 'selected' : ''}`}
                onClick={() => handleScenarioAnalysis(scenario)}
              >
                <div className="scenario-icon">{scenario.icon}</div>
                <h4>{scenario.title}</h4>
                <p>{scenario.description}</p>
                
                <div className="scenario-details">
                  <div className="vulnerability-info">
                    <strong>Vulnerability:</strong> {scenario.vulnerability}
          </div>
                  <div className={`risk-level ${scenario.riskLevel.toLowerCase()}`}>
                    Risk Level: {scenario.riskLevel}
            </div>
                  <div className="real-example">
                    <strong>Real Example:</strong> {scenario.realExample}
          </div>
        </div>

                {crisisAnalysis[scenario.id] && (
                  <div className="analysis-completed">
                    <div className="completion-icon">✅</div>
                    <span>Crisis Pattern Identified</span>
              </div>
                )}
            </div>
            ))}
            </div>
          </div>

        {Object.keys(crisisAnalysis).length === crisisScenarios.length && !detectionComplete && (
          <div className="crisis-analysis-section">
            <h3>💡 Crisis Pattern Analysis</h3>
            
            {analysisQuestions.map((question, index) => (
              <div key={index} className="analysis-question">
                <h4>{question.question}</h4>
                <div className="question-options">
                  {question.options.map((option, optionIndex) => (
                    <OptionButton
                      key={optionIndex}
                      selected={crisisAnalysis[`q${index}`] === optionIndex}
                      onClick={() => handleQuestionAnswer(index, optionIndex, question)}
                    >
                      {option}
                    </OptionButton>
                  ))}
            </div>
                
                {crisisAnalysis[`q${index}_result`] && (
                  <div className="analysis-result">
                    <div className="result-icon">🎯</div>
                    <p>{crisisAnalysis[`q${index}_result`]}</p>
          </div>
                )}
            </div>
            ))}

            {analysisQuestions.every((_, index) => crisisAnalysis[`q${index}_result`]) && (
              <ActionButton
                variant="primary"
                onClick={handleAnalysisComplete}
                className="complete-analysis-btn"
              >
                Complete Crisis Detection
              </ActionButton>
            )}
                </div>
        )}

        <ContinueButton
          onClick={onComplete}
          completed={detectionComplete}
          nextStep="Bitcoin Tools Engineer"
          aria-label={detectionComplete ? "Crisis detection completed. Advance to Bitcoin Tools Engineer phase" : "Complete crisis detection to advance"}
        >
          Advance to Tools Engineering →
        </ContinueButton>
          </div>
        );
};

  // Phase 2: Bitcoin Tools Engineer
  const BitcoinToolsEngineer = ({ onComplete }) => {
    const [toolProgress, setToolProgress] = useState({});
    const [engineeringComplete, setEngineeringComplete] = useState(false);

    const essentialTools = [
      {
        id: 'key_generation',
        title: "Bitcoin Key Generation",
        description: "Master private key generation and address derivation",
        skills: ['entropy_generation', 'key_formats', 'address_types', 'security_validation'],
        challenge: "Generate secure Bitcoin keys and addresses",
        icon: "🔑"
      },
      {
        id: 'transaction_construction',
        title: "Transaction Construction",
        description: "Build and sign Bitcoin transactions manually",
        skills: ['utxo_selection', 'input_construction', 'output_creation', 'fee_calculation'],
        challenge: "Construct a complete Bitcoin transaction",
        icon: "🏗️"
      },
      {
        id: 'script_analysis',
        title: "Script Analysis",
        description: "Analyze and create Bitcoin scripts",
        skills: ['script_opcodes', 'stack_execution', 'script_types', 'security_patterns'],
        challenge: "Analyze complex Bitcoin scripts",
        icon: "📝"
      },
      {
        id: 'network_interaction',
        title: "Network Interaction",
        description: "Interact with Bitcoin network infrastructure",
        skills: ['node_communication', 'mempool_analysis', 'block_exploration', 'network_monitoring'],
        challenge: "Monitor and analyze network activity",
        icon: "🌐"
      }
    ];

    const handleSkillToggle = (toolId, skill, checked) => {
      setToolProgress(prev => ({
        ...prev,
        [toolId]: {
          ...prev[toolId],
          skills: {
            ...prev[toolId]?.skills,
            [skill]: checked
          }
        }
      }));
    };

    const handleToolChallenge = (toolId) => {
      const tool = essentialTools.find(t => t.id === toolId);
      const skillData = toolProgress[toolId]?.skills || {};
      const isComplete = validateToolMastery(skillData, tool.skills);
      
      setToolProgress(prev => ({
        ...prev,
        [toolId]: { 
          ...prev[toolId],
          completed: isComplete
        }
      }));

      // Check if all tools are completed
      const completedCount = essentialTools.filter(tool => 
        toolProgress[tool.id]?.completed || (tool.id === toolId && isComplete)
      ).length;

      if (completedCount === essentialTools.length) {
        setEngineeringComplete(true);
        unlockAchievement('tools_engineer', 'Bitcoin Tools Engineer', 'Mastered essential Bitcoin tools');
      }
  };

  return (
      <div className="crisis-phase tools-engineer">
        <div className="crisis-header">
          <div className="crisis-icon">🔧</div>
          <h2>Bitcoin Tools Engineer</h2>
          <p className="crisis-subtitle">Master essential Bitcoin development and analysis tools</p>
      </div>

        <div className="engineering-dashboard">
          <div className="dashboard-metric">
            <span className="metric-label">Tools Mastered</span>
            <span className="metric-value">
              {essentialTools.filter(tool => toolProgress[tool.id]?.completed).length}/{essentialTools.length}
            </span>
        </div>
          <div className="dashboard-metric">
            <span className="metric-label">Engineering Progress</span>
            <span className="metric-value">
              {Math.round((essentialTools.filter(tool => toolProgress[tool.id]?.completed).length / essentialTools.length) * 100)}%
            </span>
        </div>
      </div>

        <div className="tools-mastery">
          <h3>🛠️ Essential Bitcoin Tools</h3>
          
          {essentialTools.map((tool) => (
            <div key={tool.id} className="tool-mastery-card">
              <div className="tool-header">
                <div className="tool-icon">{tool.icon}</div>
                <div className="tool-info">
                  <h4>{tool.title}</h4>
                  <p>{tool.description}</p>
        </div>
      </div>

              <div className="tool-challenge">
                <h5>🎯 Mastery Challenge: {tool.challenge}</h5>
                
                <div className="skills-checklist">
                  {tool.skills.map((skill) => (
                    <div key={skill} className="skill-item">
          <input 
                        type="checkbox"
                        id={`${tool.id}-${skill}`}
                        checked={toolProgress[tool.id]?.skills?.[skill] || false}
                        onChange={(e) => handleSkillToggle(tool.id, skill, e.target.checked)}
                        aria-describedby={`${tool.id}-${skill}-desc`}
                      />
                      <label htmlFor={`${tool.id}-${skill}`}>
                        {skill.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </label>
                      <span id={`${tool.id}-${skill}-desc`} className="sr-only">
                        {skill.replace(/_/g, ' ')} skill for {tool.title}
                      </span>
        </div>
                  ))}
      </div>

            <ActionButton 
                  variant="primary"
                  onClick={() => handleToolChallenge(tool.id)}
                  disabled={toolProgress[tool.id]?.completed}
                  className="master-tool-btn"
                >
                  {toolProgress[tool.id]?.completed ? 'Tool Mastered!' : 'Master Tool'}
                </ActionButton>

                {toolProgress[tool.id]?.completed && (
                  <div className="mastery-achieved">
                    <div className="achievement-icon">🏆</div>
                    <span>Tool Mastery Achieved!</span>
          </div>
                )}
          </div>
        </div>
          ))}
        </div>

        <ContinueButton
          onClick={onComplete}
          completed={engineeringComplete}
          nextStep="Network Mastery Analyst"
        >
          Advance to Network Analysis →
        </ContinueButton>
    </div>
  );
};

  // Phase 3: Network Mastery Analyst
  const NetworkMasteryAnalyst = ({ onComplete }) => {
    const [networkData, setNetworkData] = useState({});
    const [analysisComplete, setAnalysisComplete] = useState(false);

    const networkAnalysisTasks = [
      {
        id: 'mempool_analysis',
        title: "Mempool Analysis",
        description: "Analyze current mempool state and fee markets",
        metrics: ['pending_transactions', 'fee_distribution', 'confirmation_times', 'congestion_level'],
        challenge: "Interpret mempool data for optimal transaction timing"
      },
      {
        id: 'block_analysis',
        title: "Block Analysis",
        description: "Analyze recent blocks and mining patterns",
        metrics: ['block_size', 'transaction_count', 'mining_difficulty', 'hash_rate'],
        challenge: "Understand network security and capacity"
      },
      {
        id: 'network_health',
        title: "Network Health Monitoring",
        description: "Monitor overall Bitcoin network health",
        metrics: ['node_count', 'geographic_distribution', 'version_distribution', 'connectivity'],
        challenge: "Assess network decentralization and resilience"
      }
    ];

    const handleAnalysisTask = (taskId, completed) => {
      setNetworkData(prev => ({
        ...prev,
        [taskId]: { completed, timestamp: Date.now() }
      }));

      // Check if all tasks are completed
      const completedCount = networkAnalysisTasks.filter(task => 
        networkData[task.id]?.completed || (task.id === taskId && completed)
      ).length;

      if (completedCount === networkAnalysisTasks.length) {
        setAnalysisComplete(true);
        unlockAchievement('network_analyst', 'Network Mastery Analyst', 'Mastered Bitcoin network analysis');
      }
  };

        return (
      <div className="crisis-phase network-analyst">
        <div className="crisis-header">
          <div className="crisis-icon">📊</div>
          <h2>Network Mastery Analyst</h2>
          <p className="crisis-subtitle">Analyze and interact with Bitcoin network infrastructure</p>
      </div>

        <div className="analysis-dashboard">
          <div className="dashboard-metric">
            <span className="metric-label">Analysis Tasks</span>
            <span className="metric-value">
              {networkAnalysisTasks.filter(task => networkData[task.id]?.completed).length}/{networkAnalysisTasks.length}
            </span>
        </div>
          <div className="dashboard-metric">
            <span className="metric-label">Network Mastery</span>
            <span className="metric-value">
              {Math.round((networkAnalysisTasks.filter(task => networkData[task.id]?.completed).length / networkAnalysisTasks.length) * 100)}%
            </span>
      </div>
          </div>

        <div className="network-analysis">
          <h3>🌐 Network Analysis Tasks</h3>
          
          {networkAnalysisTasks.map((task) => (
            <div key={task.id} className="analysis-task-card">
              <div className="task-header">
                <h4>{task.title}</h4>
                <p>{task.description}</p>
              </div>

              <div className="task-challenge">
                <h5>🎯 Analysis Challenge: {task.challenge}</h5>
                
                <div className="metrics-grid">
                  {task.metrics.map((metric) => (
                    <div key={metric} className="metric-item">
                      <span className="metric-name">
                        {metric.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </span>
                      <div className="metric-value-placeholder">
                        {Math.floor(Math.random() * 1000)} {metric.includes('count') ? 'items' : 'units'}
        </div>
        </div>
                  ))}
      </div>

                <ActionButton
                  variant="primary"
                  onClick={() => handleAnalysisTask(task.id, true)}
                  disabled={networkData[task.id]?.completed}
                  className="complete-analysis-btn"
                >
                  {networkData[task.id]?.completed ? 'Analysis Complete' : 'Complete Analysis'}
                </ActionButton>

                {networkData[task.id]?.completed && (
                  <div className="analysis-completed">
                    <div className="completion-icon">✅</div>
                    <span>Analysis Completed!</span>
          </div>
                )}
            </div>
          </div>
          ))}
        </div>

        <ContinueButton
          onClick={onComplete}
          completed={analysisComplete}
          nextStep="Transaction Architecture Master"
        >
          Advance to Transaction Architecture →
        </ContinueButton>
    </div>
  );
};

  // Phase 4: Transaction Architecture Master
  const TransactionArchitectureMaster = ({ onComplete }) => {
    const [transactionMastery, setTransactionMastery] = useState({});
    const [masteryComplete, setMasteryComplete] = useState(false);

    const architectureSkills = [
      {
        id: 'input_construction',
        title: "Input Architecture",
        description: "Master transaction input construction and UTXO management",
        components: ['utxo_selection', 'input_scripting', 'signature_creation', 'witness_data'],
        challenge: "Construct optimized transaction inputs"
      },
      {
        id: 'output_design',
        title: "Output Design",
        description: "Design efficient and secure transaction outputs",
        components: ['output_scripting', 'amount_calculation', 'change_management', 'address_types'],
        challenge: "Create secure transaction outputs"
      },
      {
        id: 'fee_optimization',
        title: "Fee Optimization",
        description: "Optimize transaction fees for network conditions",
        components: ['fee_calculation', 'size_estimation', 'priority_assessment', 'rbf_implementation'],
        challenge: "Achieve optimal fee efficiency"
      }
    ];

    const handleArchitectureChallenge = (skillId) => {
      setTransactionMastery(prev => ({
        ...prev,
        [skillId]: { mastered: true, timestamp: Date.now() }
      }));

      // Check if all skills are mastered
      const completedCount = architectureSkills.filter(skill => 
        transactionMastery[skill.id]?.mastered || skill.id === skillId
      ).length;

      if (completedCount === architectureSkills.length) {
        setMasteryComplete(true);
        unlockAchievement('transaction_architect', 'Transaction Architecture Master', 'Mastered Bitcoin transaction architecture');
      }
  };

  return (
      <div className="crisis-phase transaction-architect">
        <div className="crisis-header">
          <div className="crisis-icon">🏗️</div>
          <h2>Transaction Architecture Master</h2>
          <p className="crisis-subtitle">Master Bitcoin transaction construction and optimization</p>
      </div>

        <div className="architecture-dashboard">
          <div className="dashboard-metric">
            <span className="metric-label">Architecture Skills</span>
            <span className="metric-value">
              {architectureSkills.filter(skill => transactionMastery[skill.id]?.mastered).length}/{architectureSkills.length}
            </span>
        </div>
          <div className="dashboard-metric">
            <span className="metric-label">Mastery Progress</span>
            <span className="metric-value">
              {Math.round((architectureSkills.filter(skill => transactionMastery[skill.id]?.mastered).length / architectureSkills.length) * 100)}%
            </span>
        </div>
      </div>

        <div className="architecture-mastery">
          <h3>⚡ Transaction Architecture Skills</h3>
          
          {architectureSkills.map((skill) => (
            <div key={skill.id} className="architecture-skill-card">
              <div className="skill-header">
                <h4>{skill.title}</h4>
                <p>{skill.description}</p>
          </div>

              <div className="skill-challenge">
                <h5>🎯 Architecture Challenge: {skill.challenge}</h5>
                
                <div className="components-grid">
                  {skill.components.map((component) => (
                    <div key={component} className="component-item">
                      <span className="component-name">
                        {component.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </span>
                      <div className="component-status">
                        {transactionMastery[skill.id]?.mastered ? '✅' : '⏳'}
              </div>
            </div>
                  ))}
              </div>

                <ActionButton
                  variant="primary"
                  onClick={() => handleArchitectureChallenge(skill.id)}
                  disabled={transactionMastery[skill.id]?.mastered}
                  className="master-skill-btn"
                >
                  {transactionMastery[skill.id]?.mastered ? 'Skill Mastered' : 'Master Skill'}
                </ActionButton>

                {transactionMastery[skill.id]?.mastered && (
                  <div className="skill-mastered">
                    <div className="mastery-icon">🏆</div>
                    <span>Architecture Skill Mastered!</span>
              </div>
            )}
          </div>
        </div>
          ))}
        </div>

        <ContinueButton
          onClick={onComplete}
          completed={masteryComplete}
          nextStep="Security Implementation Guardian"
        >
          Advance to Security Implementation →
        </ContinueButton>
          </div>
        );
};

  // Phase 5: Security Implementation Guardian
  const SecurityImplementationGuardian = ({ onComplete }) => {
    const [implementedSecurity, setImplementedSecurity] = useState({});
    const [guardianComplete, setGuardianComplete] = useState(false);

    const securityImplementations = [
      {
        id: 'key_security',
        title: "Key Security Implementation",
        description: "Implement robust private key security practices",
        practices: ['entropy_validation', 'secure_storage', 'key_rotation', 'backup_verification'],
        threat: "Private key compromise"
      },
      {
        id: 'transaction_security',
        title: "Transaction Security",
        description: "Secure transaction creation and validation",
        practices: ['input_validation', 'output_verification', 'fee_validation', 'replay_protection'],
        threat: "Transaction manipulation"
      },
      {
        id: 'operational_security',
        title: "Operational Security",
        description: "Implement secure Bitcoin operations",
        practices: ['environment_hardening', 'network_security', 'monitoring_implementation', 'incident_response'],
        threat: "Operational vulnerabilities"
      }
    ];

    const handleSecurityImplementation = (implementationId) => {
      setImplementedSecurity(prev => ({
        ...prev,
        [implementationId]: { completed: true, timestamp: Date.now() }
      }));

      // Check if all implementations are completed
      const completedCount = securityImplementations.filter(impl => 
        implementedSecurity[impl.id]?.completed || impl.id === implementationId
      ).length;

      if (completedCount === securityImplementations.length) {
        setGuardianComplete(true);
        unlockAchievement('security_guardian', 'Security Implementation Guardian', 'Implemented comprehensive Bitcoin security');
      }
  };

  return (
      <div className="crisis-phase security-guardian">
        <div className="crisis-header">
          <div className="crisis-icon">🛡️</div>
          <h2>Security Implementation Guardian</h2>
          <p className="crisis-subtitle">Implement robust Bitcoin security practices</p>
          </div>

        <div className="security-dashboard">
          <div className="dashboard-metric">
            <span className="metric-label">Security Implementations</span>
            <span className="metric-value">
              {securityImplementations.filter(impl => implementedSecurity[impl.id]?.completed).length}/{securityImplementations.length}
            </span>
        </div>
          <div className="dashboard-metric">
            <span className="metric-label">Security Level</span>
            <span className="metric-value">
              {Math.round((securityImplementations.filter(impl => implementedSecurity[impl.id]?.completed).length / securityImplementations.length) * 100)}%
            </span>
      </div>
        </div>

        <div className="security-implementations">
          <h3>🔒 Security Implementation Areas</h3>
          
          {securityImplementations.map((implementation) => (
            <div key={implementation.id} className="security-implementation-card">
              <div className="implementation-header">
                <h4>{implementation.title}</h4>
                <p>{implementation.description}</p>
                <div className="threat-warning">
                  <AlertTriangle size={16} />
                  <span>Protects against: {implementation.threat}</span>
            </div>
        </div>

              <div className="implementation-practices">
                <h5>🛡️ Security Practices:</h5>
                <div className="practices-grid">
                  {implementation.practices.map((practice) => (
                    <div key={practice} className="practice-item">
                      <span className="practice-name">
                        {practice.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </span>
                      <div className="practice-status">
                        {implementedSecurity[implementation.id]?.completed ? '✅' : '⚠️'}
          </div>
        </div>
                  ))}
      </div>

                <ActionButton
                  variant="primary"
                  onClick={() => handleSecurityImplementation(implementation.id)}
                  disabled={implementedSecurity[implementation.id]?.completed}
                  className="implement-security-btn"
                >
                  {implementedSecurity[implementation.id]?.completed ? 'Security Implemented' : 'Implement Security'}
                </ActionButton>

                {implementedSecurity[implementation.id]?.completed && (
                  <div className="security-implemented">
                    <div className="implementation-icon">🏆</div>
                    <span>Security Implementation Complete!</span>
          </div>
                )}
        </div>
      </div>
          ))}
                </div>

        <ContinueButton
          onClick={onComplete}
          completed={guardianComplete}
          nextStep="Bitcoin Mastery Sovereign"
        >
          Advance to Mastery Sovereignty →
        </ContinueButton>
    </div>
  );
};

  // Phase 6: Bitcoin Mastery Sovereign
  const BitcoinMasterySovereign = ({ onComplete }) => {
    const [sovereigntyLevel, setSovereigntyLevel] = useState(0);
    const [masteryAchieved, setMasteryAchieved] = useState(false);

    const masteryMilestones = [
      "✅ Identified practical-theoretical crisis gap",
      "✅ Mastered essential Bitcoin tools",
      "✅ Analyzed Bitcoin network infrastructure",
      "✅ Mastered transaction architecture",
      "✅ Implemented comprehensive security",
      "🎯 Achieved Bitcoin Mastery Sovereignty"
    ];

    const masteryCapabilities = [
      { capability: "Generate secure Bitcoin keys and addresses", icon: "🔑" },
      { capability: "Construct and analyze Bitcoin transactions", icon: "🏗️" },
      { capability: "Monitor and analyze network conditions", icon: "📊" },
      { capability: "Implement robust security practices", icon: "🛡️" },
      { capability: "Troubleshoot Bitcoin technical issues", icon: "🔧" },
      { capability: "Achieve true Bitcoin independence", icon: "👑" }
    ];

    useEffect(() => {
      const interval = setInterval(() => {
        setSovereigntyLevel(prev => {
          if (prev < masteryMilestones.length - 1) {
            return prev + 1;
          } else {
            setMasteryAchieved(true);
            return prev;
          }
        });
      }, 1000);

      return () => clearInterval(interval);
    }, [masteryMilestones.length]);

        return (
      <div className="crisis-phase mastery-sovereign">
        <div className="crisis-header">
          <div className="crisis-icon">👑</div>
          <h2>Bitcoin Mastery Sovereign</h2>
          <p className="crisis-subtitle">You have achieved complete practical Bitcoin mastery</p>
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
          <h3>🏆 Your Bitcoin Mastery Journey</h3>
          
          <div className="milestones-list">
            {masteryMilestones.map((milestone, index) => (
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

        <div className="mastery-capabilities">
          <h3>⚡ Your Bitcoin Mastery Capabilities</h3>
          <div className="capabilities-grid">
            {masteryCapabilities.map((item, index) => (
              <div key={index} className="capability-card">
                <div className="capability-icon">{item.icon}</div>
                <span className="capability-text">{item.capability}</span>
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
          <h3>⚡ Bitcoin Mastery Sovereignty Achieved</h3>
          <div className="declaration-content">
            <p>You have bridged the practical-theoretical gap and achieved true Bitcoin mastery:</p>
            <ul>
              <li>🔧 Master practical Bitcoin tools and implementation</li>
              <li>🌐 Analyze and interact with Bitcoin network infrastructure</li>
              <li>🏗️ Construct and optimize Bitcoin transactions</li>
              <li>🛡️ Implement comprehensive security practices</li>
              <li>👑 Achieve complete Bitcoin independence and sovereignty</li>
            </ul>
            </div>
        </div>

        <ContinueButton
          onClick={onComplete}
          completed={masteryAchieved}
          nextStep="Complete Module"
        >
          Complete Bitcoin Mastery Journey →
        </ContinueButton>
          </div>
        );
  };

  const renderPhase = (phase, index) => {
    const phaseComponents = {
      'practical_crisis_detective': PracticalTheoreticalCrisisDetective,
      'tools_engineer': BitcoinToolsEngineer,
      'network_analyst': NetworkMasteryAnalyst,
      'transaction_architect': TransactionArchitectureMaster,
      'security_guardian': SecurityImplementationGuardian,
      'mastery_sovereign': BitcoinMasterySovereign
    };

    const PhaseComponent = phaseComponents[phase.id];
    
    if (!PhaseComponent) {
      return <div>Phase component not found: {phase.id}</div>;
    }

    return (
      <PhaseComponent
        key={phase.id}
        onComplete={() => handlePhaseComplete(index)}
      />
    );
  };

  return (
    <div className="module-container bitcoin-toolkit-crisis">
      {/* Crisis Command Center Header */}
      <div className="crisis-command-center">
        <div className="command-header">
          <div className="crisis-badge">
            <AlertTriangle className="crisis-icon" />
            <span>BITCOIN MASTERY CRISIS ARCHITECT</span>
        </div>
          <h1 className="crisis-title">Practical-Theoretical Crisis vs. Bitcoin Mastery Sovereignty</h1>
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
      <nav className="phase-navigation" aria-label="Module phases navigation">
        {phases.map((phase, index) => (
          <div
            key={phase.id}
            className={`phase-nav-item ${
              index === currentPhase ? 'active' : ''
            } ${completedPhases.has(index) ? 'completed' : ''}`}
            role="button"
            tabIndex={0}
            aria-label={`Phase ${index + 1}: ${phase.title}. ${completedPhases.has(index) ? 'Completed' : index === currentPhase ? 'Current phase' : 'Not started'}`}
          >
            <div className="phase-number">{index + 1}</div>
            <div className="phase-info">
              <span className="phase-title">{phase.title}</span>
              <span className="phase-description">{phase.description}</span>
        </div>
            {completedPhases.has(index) && (
              <div className="phase-completed" aria-hidden="true">✅</div>
      )}
    </div>
        ))}
      </nav>

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

export default BitcoinToolkitModule; 