import React, { useState, useEffect } from 'react';
import { useProgress } from '../contexts/ProgressContext';
import { 
  AlertTriangle, 
  TreePine, 
  Search, 
  Zap, 
  Rocket,
  Crown,
  CheckCircle,
  Play
} from 'lucide-react';
import { 
  ContinueButton, 
  ActionButton
} from '../components/EnhancedButtons';
import './MerkleModule.css';
import { hash256 } from '../utils/bitcoin';

const MerkleModule = () => {
  const { completeModule, updatePersonalInsights } = useProgress();
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(new Set());

  // Data Crisis Architect Journey State
  const [userInsights, setUserInsights] = useState({
    crisisAwareness: 0,
    treeCreativity: 0,
    proofDesign: 0,
    scaleEngineering: 0,
    innovationMastery: 0,
    efficiencySovereignty: 0
  });

  const architectSteps = [
    {
      id: 'data-overload-detective',
      title: '🚨 Data Overload Detective',
      subtitle: 'Billion-dollar data verification disasters expose the scalability crisis...',
      icon: <AlertTriangle className="w-6 h-6" />,
      component: DataOverloadDetective
    },
    {
      id: 'tree-alchemist',
      title: '🌳 Tree Alchemist', 
      subtitle: 'Transform inefficient linear verification into logarithmic tree magic',
      icon: <TreePine className="w-6 h-6" />,
      component: TreeAlchemist
    },
    {
      id: 'proof-architect',
      title: '🔍 Proof Architect',
      subtitle: 'Design minimal proofs that verify massive datasets with just a few hashes',
      icon: <Search className="w-6 h-6" />,
      component: ProofArchitect
    },
    {
      id: 'scale-engineer',
      title: '⚡ Scale Engineer',
      subtitle: 'Experience how Merkle trees enable Bitcoin\'s massive transaction processing',
      icon: <Zap className="w-6 h-6" />,
      component: ScaleEngineer
    },
    {
      id: 'innovation-pioneer',
      title: '🚀 Innovation Pioneer',
      subtitle: 'Master real-world applications from Git to IPFS to global blockchain systems',
      icon: <Rocket className="w-6 h-6" />,
      component: InnovationPioneer
    },
    {
      id: 'efficiency-sovereign',
      title: '👑 Efficiency Sovereign',
      subtitle: 'Command ultimate data structure mastery for global-scale systems',
      icon: <Crown className="w-6 h-6" />,
      component: EfficiencySovereign
    }
  ];

  useEffect(() => {
    if (currentStep === architectSteps.length - 1) {
      completeModule('merkle');
      updatePersonalInsights('merkle', userInsights);
      showStrategicAchievement(
        'Data Crisis Architect Mastery',
        'You can now design efficient verification systems that scale to billions of records!',
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
      { title: 'Data Overload Detective', desc: 'You exposed the billion-dollar verification crisis!', emoji: '🕵️' },
      { title: 'Tree Alchemist', desc: 'You transform linear inefficiency into logarithmic magic!', emoji: '🌳' },
      { title: 'Proof Architect', desc: 'You design minimal proofs for massive datasets!', emoji: '🔍' },
      { title: 'Scale Engineer', desc: 'You engineer systems that handle millions of transactions!', emoji: '⚡' },
      { title: 'Innovation Pioneer', desc: 'You master global data structure applications!', emoji: '🚀' },
      { title: 'Efficiency Sovereign', desc: 'You command optimal data systems for any scale!', emoji: '👑' }
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
  function DataOverloadDetective() {
    const [crisisPhase, setCrisisPhase] = useState('discovery');
    const [selectedCrisis, setSelectedCrisis] = useState(null);
    const [investigationResult, setInvestigationResult] = useState(null);

    const dataCrises = [
      {
        id: 'healthcare_breach',
        title: '🏥 Healthcare Records Verification Crisis',
        problem: 'Hospital needs to verify patient records across 50 databases instantly during emergency surgery.',
        crisis: 'Linear verification of 2.3M records takes 45 minutes. Patient dies waiting.',
        insight: 'Linear verification doesn\'t scale when lives depend on speed',
        cost: '$4.8B in healthcare data breach losses annually',
        lesson: 'Critical systems need logarithmic verification, not linear scanning'
      },
      {
        id: 'financial_audit',
        title: '💰 Financial Audit Catastrophe',
        problem: 'Bank must verify 10 million transactions for regulatory audit within 24 hours.',
        crisis: 'Traditional verification requires checking every single transaction. Takes 3 weeks.',
        insight: 'Regulatory compliance fails when verification doesn\'t scale',
        cost: '$12B in audit and compliance costs that could be eliminated',
        lesson: 'Efficient verification enables real-time compliance monitoring'
      },
      {
        id: 'supply_chain_fraud',
        title: '📦 Supply Chain Fraud Detection',
        problem: 'Food contamination traced through global supply chain with millions of shipments.',
        crisis: 'Can\'t verify authentic products fast enough. Contaminated food stays on shelves.',
        insight: 'Consumer safety requires instant verification of massive datasets',
        cost: '$52B in supply chain fraud losses could be prevented',
        lesson: 'Tree structures enable instant fraud detection at global scale'
      }
    ];

    const handleCrisisChoice = (crisis) => {
      setSelectedCrisis(crisis);
      setCrisisPhase('investigation');
      
      setTimeout(() => {
        setInvestigationResult({
          rootCause: 'Linear Verification Scalability Failure',
          solution: 'Logarithmic Tree Verification',
          impact: 'Scales from millions to billions with minimal growth in verification time'
        });
        setCrisisPhase('revelation');
        
        // Update user insights
        const insights = { ...userInsights };
        insights.crisisAwareness = Math.min(insights.crisisAwareness + 25, 100);
        setUserInsights(insights);
      }, 2000);
    };

    return (
      <div className="data-overload-detective">
        <div className="crisis-header">
          <div className="crisis-icon">
            <AlertTriangle className="w-16 h-16 text-red-500" />
        </div>
          <h2>🚨 THE DATA VERIFICATION CRISIS</h2>
          <p className="crisis-subtitle">Billions lost because we can't verify data fast enough when it matters...</p>
      </div>
      
        {crisisPhase === 'discovery' && (
          <div className="crisis-scenarios">
            <div className="crisis-explanation">
              <div className="prime-text">
                📊 Every day, critical systems fail because they can't verify massive datasets quickly enough. 
                The cost isn't just money—it's lives, security, and trust in digital systems.
            </div>
          </div>
          
            <h3>Choose a data verification crisis to investigate:</h3>
            <div className="crisis-grid">
              {dataCrises.map(crisis => (
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
                <h4>📋 The System Requirement</h4>
                <p>{selectedCrisis.problem}</p>
        </div>

              <div className="investigation-step">
                <h4>💥 The Verification Failure</h4>
                <p>{selectedCrisis.crisis}</p>
            </div>

              <div className="investigation-loading">
                <div className="loading-spinner"></div>
                <p>Analyzing scalability bottleneck...</p>
          </div>
        </div>
      </div>
        )}

        {crisisPhase === 'revelation' && selectedCrisis && investigationResult && (
          <div className="crisis-revelation">
            <div className="revelation-header">
              <h3>⚡ REVELATION: The Scalability Bottleneck Exposed</h3>
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
                <h4>💡 The Merkle Tree Solution</h4>
                <div className="solution-box">
                  <strong>Logarithmic Tree Verification</strong>
                  <p>Verify any record in massive datasets with just log₂(n) operations</p>
                  <ul>
                    <li>✅ 1 million records = 20 verification steps</li>
                    <li>✅ 1 billion records = 30 verification steps</li>
                    <li>✅ Instant verification regardless of dataset size</li>
                    <li>✅ Mathematically guaranteed integrity</li>
                  </ul>
                </div>
                    </div>
                </div>

            <div className="revelation-impact">
              <div className="prime-text">
                🔥 What if you could verify any piece of data in a billion-record database 
                with just 30 mathematical operations? That's what Merkle trees make possible.
          </div>
        </div>

            <ContinueButton onClick={() => handleContinue()}>
              Transform Linear Into Logarithmic →
        </ContinueButton>
          </div>
        )}
      </div>
    );
  }

  function TreeAlchemist() {
    const [alchemyPhase, setAlchemyPhase] = useState('learning');
    const [currentTree, setCurrentTree] = useState(null);
    const [treeVisualization, setTreeVisualization] = useState([]);
    const [completedTransformations, setCompletedTransformations] = useState(new Set());

    const transformationScenarios = [
      {
        id: 'simple_verification',
        title: '📄 Simple Document Verification',
        linearProcess: 'Check each document individually: O(n) operations',
        dataSet: ['Doc1: Contract', 'Doc2: Invoice', 'Doc3: Receipt', 'Doc4: Agreement'],
        treeProcess: 'Build tree once, verify any document: O(log n) operations',
        efficiency: 'From 4 checks to 2 checks'
      },
      {
        id: 'transaction_batch',
        title: '💰 Transaction Batch Verification',
        linearProcess: 'Verify each of 1,000 transactions individually',
        dataSet: Array.from({length: 1000}, (_, i) => `TX${i+1}: User→User`),
        treeProcess: 'Build Merkle tree, verify any transaction with 10 hashes',
        efficiency: 'From 1,000 checks to 10 checks'
      },
      {
        id: 'blockchain_block',
        title: '⛓️ Blockchain Block Verification',
        linearProcess: 'Check all 2,875 transactions in Bitcoin block',
        dataSet: Array.from({length: 2875}, (_, i) => `Transaction ${i+1}`),
        treeProcess: 'Use Merkle root to verify any transaction instantly',
        efficiency: 'From 2,875 checks to 12 checks'
      }
    ];

    const buildMerkleTree = async (transactions) => {
      const levels = [];
      let currentLevel = [...transactions];
      levels.push([...currentLevel]);

      while (currentLevel.length > 1) {
        const nextLevel = [];
        
        for (let i = 0; i < currentLevel.length; i += 2) {
          const left = currentLevel[i];
          const right = currentLevel[i + 1] || currentLevel[i]; // Duplicate if odd number
          
          const combined = left + right;
          const hash = await hash256(combined);
          nextLevel.push(hash.substring(0, 8) + '...');
        }
        
        currentLevel = nextLevel;
        levels.push([...currentLevel]);
      }
      
      return levels;
    };

    const handleTransformScenario = async (scenario) => {
      setCurrentTree(scenario);
      setAlchemyPhase('demonstration');
      
      // Build tree visualization
      const tree = await buildMerkleTree(scenario.dataSet.slice(0, 8)); // Limit for visualization
      setTreeVisualization(tree);
      
      // Mark transformation as completed
      setCompletedTransformations(prev => new Set([...prev, scenario.id]));
      
      // Update user insights
      const insights = { ...userInsights };
      insights.treeCreativity = Math.min(insights.treeCreativity + 30, 100);
      setUserInsights(insights);
    };

    return (
      <div className="tree-alchemist">
        <div className="alchemist-header">
          <div className="alchemist-icon">
            <TreePine className="w-16 h-16 text-green-500" />
          </div>
          <h2>🌳 TRANSFORM LINEAR INTO LOGARITHMIC</h2>
          <p className="alchemist-subtitle">Watch inefficient verification become elegant tree magic...</p>
        </div>

        {alchemyPhase === 'learning' && (
          <div className="alchemy-workshop">
            <div className="workshop-explanation">
              <div className="prime-text">
                🧪 Every inefficient linear system can be transformed into an elegant tree structure. 
                Your job as a Tree Alchemist is to transform O(n) verification into O(log n) magic.
              </div>
            </div>

            <h3>Choose a transformation scenario to master:</h3>
            <div className="transformations-grid">
              {transformationScenarios.map(transformation => (
                <div 
                  key={transformation.id}
                  className={`transformation-card ${completedTransformations.has(transformation.id) ? 'completed' : ''}`}
                  onClick={() => handleTransformScenario(transformation)}
                >
                  <div className="transformation-header">
                    <span className="transformation-title">{transformation.title}</span>
                    <span className="transformation-efficiency">{transformation.efficiency}</span>
                  </div>
                  
                  <div className="linear-process">
                    <h4>🐌 Linear Process</h4>
                    <p>{transformation.linearProcess}</p>
                  </div>
                  
                  <div className="tree-process">
                    <h4>🚀 Tree Process</h4>
                    <p>{transformation.treeProcess}</p>
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

        {alchemyPhase === 'demonstration' && currentTree && (
          <div className="alchemy-demonstration">
            <div className="demonstration-header">
              <h3>🌳 Tree Transformation in Progress</h3>
              <p>Watch linear verification become logarithmic magic...</p>
        </div>

            <div className="tree-building">
              <div className="tree-display">
                <h4>📊 Data to Tree Structure</h4>
        <div className="tree-visualization">
                  {treeVisualization.map((level, levelIndex) => (
                <div key={levelIndex} className="tree-level">
                <div className="level-label">
                        {levelIndex === 0 ? 'Original Data' : 
                         levelIndex === treeVisualization.length - 1 ? 'Merkle Root' : 
                   `Level ${levelIndex}`}
                </div>
                  <div className="level-nodes">
                  {level.map((node, nodeIndex) => (
                      <div key={nodeIndex} className="tree-node">
                            {levelIndex === 0 && nodeIndex < 4 ? 
                              currentTree.dataSet[nodeIndex] : node}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
        </div>

              <div className="efficiency-comparison">
                <h4>⚡ Efficiency Transformation</h4>
                <div className="comparison-metrics">
                  <div className="metric">
                    <span className="metric-label">Linear Verification:</span>
                    <span className="metric-value old">{currentTree.dataSet.length} operations</span>
                  </div>
                  <div className="metric">
                    <span className="metric-label">Tree Verification:</span>
                    <span className="metric-value new">{Math.ceil(Math.log2(currentTree.dataSet.length))} operations</span>
                  </div>
                  <div className="metric">
                    <span className="metric-label">Efficiency Gain:</span>
                    <span className="metric-value improvement">
                      {Math.round((currentTree.dataSet.length / Math.ceil(Math.log2(currentTree.dataSet.length))) * 10) / 10}x faster
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="transformation-insight">
        <div className="prime-text">
                🎯 The transformation is complete! Linear verification is now logarithmic magic. 
                As datasets grow larger, the efficiency advantage becomes astronomical.
              </div>
        </div>

            <div className="demonstration-controls">
              <ActionButton onClick={() => setAlchemyPhase('learning')}>
                Transform More Scenarios
              </ActionButton>
              
              {completedTransformations.size >= 2 && (
                <ContinueButton onClick={() => handleContinue()}>
                  Architect Minimal Proofs →
        </ContinueButton>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  function ProofArchitect() {
    const [architectPhase, setArchitectPhase] = useState('challenge');
    const [proofScenario, setProofScenario] = useState(null);
    const [proofPath, setProofPath] = useState([]);
    const [verificationActive, setVerificationActive] = useState(false);

    const proofChallenges = [
      {
        id: 'bitcoin_transaction',
        title: '₿ Bitcoin Transaction Proof',
        problem: 'Prove a specific transaction exists in a block with 2,000 transactions',
        dataset: 'Block #750,000 with 2,000 transactions',
        challenge: 'Linear approach: Download and check all 2,000 transactions',
        solution: 'Merkle proof: Just 11 hashes prove transaction exists',
        proofSize: '11 hashes (352 bytes)',
        dataReduction: '99.95% reduction in verification data'
      },
      {
        id: 'git_commit',
        title: '📁 Git Repository Verification',
        problem: 'Prove a file exists in a repository with 10,000 files without downloading repo',
        dataset: 'Large codebase repository',
        challenge: 'Traditional: Clone entire 500MB repository',
        solution: 'Merkle proof: 14 hashes prove file integrity',
        proofSize: '14 hashes (448 bytes)',
        dataReduction: '99.9999% reduction in download size'
      },
      {
        id: 'supply_chain',
        title: '📦 Supply Chain Verification',
        problem: 'Prove product authenticity in global supply chain with 1M+ products',
        dataset: 'Global supply chain database',
        challenge: 'Download and verify entire supply chain database',
        solution: 'Merkle proof: 20 hashes prove product authenticity',
        proofSize: '20 hashes (640 bytes)',
        dataReduction: '99.999% reduction in verification data'
      }
    ];

    const generateMerkleProof = async (scenario) => {
      // Simulate proof path generation
      const proofSteps = [];
      const depth = Math.ceil(Math.log2(parseInt(scenario.dataset.match(/\d+/)[0]) || 2000));
      
      for (let i = 0; i < depth; i++) {
        const step = {
          level: i + 1,
          hash: `${Math.random().toString(16).substring(2, 10)}...`,
          position: Math.random() > 0.5 ? 'left' : 'right',
          description: i === 0 ? 'Target transaction hash' : 
                      i === depth - 1 ? 'Merkle root hash' : 
                      `Level ${i} sibling hash`
        };
        proofSteps.push(step);
      }
      
      return proofSteps;
    };

    const handleProofChallenge = async (challenge) => {
      setProofScenario(challenge);
      setArchitectPhase('design');
      
      // Generate proof path
      const proof = await generateMerkleProof(challenge);
      setProofPath(proof);
      
      // Update user insights
      const insights = { ...userInsights };
      insights.proofDesign = Math.min(insights.proofDesign + 25, 100);
      setUserInsights(insights);
    };

    const handleProofVerification = () => {
      setVerificationActive(true);
      
      // Simulate verification process
      setTimeout(() => {
        setVerificationActive(false);
        setArchitectPhase('validation');
      }, 3000);
    };
    
    return (
      <div className="proof-architect">
        <div className="architect-header">
          <div className="architect-icon">
            <Search className="w-16 h-16 text-blue-500" />
          </div>
          <h2>🔍 MINIMAL PROOF ARCHITECTURE</h2>
          <p className="architect-subtitle">Design proofs that verify massive datasets with minimal data...</p>
        </div>

        {architectPhase === 'challenge' && (
          <div className="proof-challenges">
            <div className="challenge-explanation">
              <div className="prime-text">
                🎯 The ultimate verification challenge: prove something exists in a massive dataset 
                without downloading the entire dataset. This is the magic of Merkle proofs.
              </div>
            </div>

            <h3>Choose a proof architecture challenge:</h3>
            <div className="challenges-grid">
              {proofChallenges.map(challenge => (
                <div 
                  key={challenge.id}
                  className="challenge-card"
                  onClick={() => handleProofChallenge(challenge)}
                >
                  <div className="challenge-title">{challenge.title}</div>
                  <div className="challenge-problem">{challenge.problem}</div>
                  <div className="challenge-solution">
                    <strong>Proof Size:</strong> {challenge.proofSize}
                  </div>
                  <div className="challenge-reduction">
                    <strong>Data Reduction:</strong> {challenge.dataReduction}
                  </div>
                </div>
              ))}
              </div>
            </div>
        )}

        {architectPhase === 'design' && proofScenario && (
          <div className="proof-design">
            <div className="design-header">
              <h3>🏗️ Designing: {proofScenario.title}</h3>
            </div>
            
            <div className="proof-construction">
              <div className="proof-challenge">
                <h4>⚡ The Challenge</h4>
                <div className="challenge-details">
                  <p><strong>Problem:</strong> {proofScenario.problem}</p>
                  <p><strong>Traditional approach:</strong> {proofScenario.challenge}</p>
                  <p><strong>Merkle solution:</strong> {proofScenario.solution}</p>
              </div>
            </div>
            
              <div className="proof-path">
                <h4>🛤️ Merkle Proof Path</h4>
                <div className="proof-steps">
                  {proofPath.map((step, index) => (
                    <div key={index} className="proof-step">
                      <div className="step-number">{step.level}</div>
                      <div className="step-details">
                        <div className="step-hash">{step.hash}</div>
                        <div className="step-description">{step.description}</div>
                        <div className="step-position">Position: {step.position}</div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>

            <div className="proof-efficiency">
              <h4>📊 Efficiency Analysis</h4>
              <div className="efficiency-metrics">
                <div className="metric">
                  <span className="metric-label">Proof Size:</span>
                  <span className="metric-value">{proofScenario.proofSize}</span>
                </div>
                <div className="metric">
                  <span className="metric-label">Data Reduction:</span>
                  <span className="metric-value">{proofScenario.dataReduction}</span>
            </div>
                <div className="metric">
                  <span className="metric-label">Verification Steps:</span>
                  <span className="metric-value">{proofPath.length} hashes</span>
                </div>
            </div>
          </div>

            <ActionButton onClick={handleProofVerification}>
              <Play className="w-4 h-4" />
              Verify Proof Validity
            </ActionButton>
        </div>
        )}

        {architectPhase === 'validation' && (
          <div className="proof-validation">
            <div className="validation-header">
              <h3>✅ Proof Verification Complete</h3>
            </div>

            <div className="validation-results">
              <div className="result-item">
                <CheckCircle className="w-6 h-6 text-green-500" />
                <span>Proof mathematically valid</span>
              </div>
              <div className="result-item">
                <CheckCircle className="w-6 h-6 text-green-500" />
                <span>Data integrity confirmed</span>
              </div>
              <div className="result-item">
                <CheckCircle className="w-6 h-6 text-green-500" />
                <span>Minimal verification data used</span>
              </div>
              <div className="result-item">
                <CheckCircle className="w-6 h-6 text-green-500" />
                <span>Logarithmic efficiency achieved</span>
              </div>
            </div>

            <div className="validation-insight">
        <div className="prime-text">
                🔍 Proof architecture mastered! You've designed a verification system that 
                proves data integrity with minimal information transfer—the foundation of 
                efficient distributed systems.
              </div>
        </div>

            <ContinueButton onClick={() => handleContinue()}>
              Engineer Global Scale →
        </ContinueButton>
          </div>
        )}

        {verificationActive && (
          <div className="proof-verification">
            <div className="verification-status">
              <div className="loading-spinner"></div>
              <p>Verifying proof against Merkle root...</p>
            </div>
          </div>
        )}
      </div>
    );
  }

  function ScaleEngineer() {
    const [engineerPhase, setEngineerPhase] = useState('discovery');
    const [scaleDemo, setScaleDemo] = useState({ size: 1000, verificationTime: 10 });
    const [bitcoinMetrics, setBitcoinMetrics] = useState(null);

    const handleScaleTest = (newSize) => {
      const linearTime = newSize; // O(n)
      const merkleTime = Math.ceil(Math.log2(newSize)); // O(log n)
      
      setScaleDemo({
        size: newSize,
        linearTime,
        merkleTime,
        efficiency: Math.round((linearTime / merkleTime) * 10) / 10
      });

      // Update user insights
      const insights = { ...userInsights };
      insights.scaleEngineering = Math.min(insights.scaleEngineering + 10, 100);
      setUserInsights(insights);
    };

    const handleBitcoinReveal = () => {
      setBitcoinMetrics({
        total_transactions: '850M+',
        daily_transactions: '300K+',
        block_verification: '<1 second',
        full_node_sync: '~15 minutes',
        spv_verification: '<5 seconds'
      });
      setEngineerPhase('mastery');
    };

    const scaleTests = [
      { size: 1000, label: '1K transactions', scenario: 'Small business daily volume' },
      { size: 10000, label: '10K transactions', scenario: 'Medium exchange hourly volume' },
      { size: 100000, label: '100K transactions', scenario: 'Large bank daily volume' },
      { size: 1000000, label: '1M transactions', scenario: 'Visa daily volume' },
      { size: 10000000, label: '10M transactions', scenario: 'Global payment network' }
    ];

    return (
      <div className="scale-engineer">
        <div className="engineer-header">
          <div className="engineer-icon">
            <Zap className="w-16 h-16 text-yellow-500" />
          </div>
          <h2>⚡ GLOBAL SCALE ENGINEERING</h2>
          <p className="engineer-subtitle">Engineer systems that handle millions of records instantly...</p>
      </div>

        {engineerPhase === 'discovery' && (
          <div className="scale-discovery">
            <div className="discovery-problem">
              <h3>📈 The Scale Challenge</h3>
              <div className="problem-stats">
                <div className="stat">
                  <span className="stat-value">Linear O(n)</span>
                  <span className="stat-label">Traditional verification grows with every record</span>
            </div>
                <div className="stat">
                  <span className="stat-value">Logarithmic O(log n)</span>
                  <span className="stat-label">Merkle verification barely grows at all</span>
            </div>
                <div className="stat">
                  <span className="stat-value">Billions</span>
                  <span className="stat-label">Records that need instant verification</span>
            </div>
            </div>
              
              <div className="prime-text">
                🚀 Test how Merkle trees maintain blazing speed even as datasets grow to massive scales. 
                Experience the logarithmic magic that powers global systems.
            </div>
            </div>

            <div className="scale-testing">
              <h3>⚡ Scale Testing Lab</h3>
              
              <div className="scale-controls">
                {scaleTests.map(test => (
                  <ActionButton 
                    key={test.size}
                    onClick={() => handleScaleTest(test.size)}
                  >
                    {test.label}
                  </ActionButton>
                ))}
          </div>

              {scaleDemo && (
                <div className="scale-results">
                  <div className="scale-scenario">
                    <h4>📊 Testing: {scaleDemo.size.toLocaleString()} Records</h4>
                    <p>{scaleTests.find(t => t.size === scaleDemo.size)?.scenario}</p>
          </div>

                  <div className="performance-comparison">
                    <div className="performance-metric">
                      <span className="metric-label">Linear Verification:</span>
                      <span className="metric-value bad">{scaleDemo.linearTime?.toLocaleString()} operations</span>
          </div>
                    <div className="performance-metric">
                      <span className="metric-label">Merkle Verification:</span>
                      <span className="metric-value good">{scaleDemo.merkleTime} operations</span>
        </div>
                    <div className="performance-metric">
                      <span className="metric-label">Efficiency Gain:</span>
                      <span className="metric-value amazing">{scaleDemo.efficiency}x faster</span>
                    </div>
                  </div>
                </div>
              )}
      </div>

            {scaleDemo?.size >= 1000000 && (
              <div className="discovery-insight">
                <div className="prime-text">
                  🎯 Notice: Even with a million records, Merkle verification takes just 20 operations! 
                  This is how Bitcoin handles massive transaction volumes...
    </div>
                
                <ActionButton onClick={handleBitcoinReveal}>
                  Reveal Bitcoin's Scale Engineering →
                </ActionButton>
      </div>
            )}
          </div>
        )}

        {engineerPhase === 'mastery' && bitcoinMetrics && (
          <div className="scale-mastery">
            <div className="mastery-header">
              <h3>₿ Bitcoin: Scale Engineering in Action</h3>
            </div>

            <div className="bitcoin-stats">
              <div className="stat-grid">
                <div className="network-stat">
                  <span className="stat-icon">📊</span>
                  <span className="stat-value">{bitcoinMetrics.total_transactions}</span>
                  <span className="stat-label">Total Transactions Processed</span>
            </div>
                <div className="network-stat">
                  <span className="stat-icon">⚡</span>
                  <span className="stat-value">{bitcoinMetrics.daily_transactions}</span>
                  <span className="stat-label">Daily Transactions</span>
            </div>
                <div className="network-stat">
                  <span className="stat-icon">🔍</span>
                  <span className="stat-value">{bitcoinMetrics.block_verification}</span>
                  <span className="stat-label">Block Verification Time</span>
            </div>
                <div className="network-stat">
                  <span className="stat-icon">📱</span>
                  <span className="stat-value">{bitcoinMetrics.spv_verification}</span>
                  <span className="stat-label">Mobile Wallet Verification</span>
          </div>
          </div>
        </div>

            <div className="engineering-applications">
              <h4>🏗️ Scale Engineering Applications</h4>
              <div className="applications-grid">
                <div className="application">
                  <span className="app-icon">📱</span>
                  <div className="app-details">
                    <strong>SPV Wallets</strong>
                    <p>Mobile wallets verify payments instantly without downloading blockchain</p>
            </div>
            </div>
                <div className="application">
                  <span className="app-icon">⚡</span>
                  <div className="app-details">
                    <strong>Block Validation</strong>
                    <p>Nodes verify blocks with thousands of transactions in seconds</p>
            </div>
            </div>
                <div className="application">
                  <span className="app-icon">🌐</span>
                  <div className="app-details">
                    <strong>Global Network</strong>
                    <p>15,000+ nodes maintain consensus on 850M+ transactions</p>
          </div>
                </div>
                <div className="application">
                  <span className="app-icon">🔒</span>
                  <div className="app-details">
                    <strong>Fraud Prevention</strong>
                    <p>Detect tampered transactions instantly across the entire network</p>
                  </div>
          </div>
        </div>
      </div>

            <div className="mastery-insight">
      <div className="prime-text">
                ⚡ You've engineered scalable verification systems! Merkle trees enable Bitcoin 
                to process hundreds of thousands of transactions daily while allowing instant 
                verification on mobile devices worldwide.
        </div>
      </div>

            <ContinueButton onClick={() => handleContinue()}>
              Pioneer Global Innovations →
                </ContinueButton>
          </div>
        )}
              </div>
  );
  }

  function InnovationPioneer() {
    const [pioneerPhase, setPioneerPhase] = useState('exploration');
    const [selectedInnovation, setSelectedInnovation] = useState(null);
    const [implementationDemo, setImplementationDemo] = useState(null);

    const globalInnovations = [
      {
        id: 'git_version_control',
        name: 'Git Version Control',
        icon: '📁',
        description: 'Every software project uses Merkle trees for version tracking',
        application: 'Track code changes across millions of files',
        impact: '100M+ developers rely on Git daily',
        merkleUse: 'Commit hashes form Merkle DAG for efficient change tracking',
        features: ['Instant change detection', 'Efficient branching', 'Distributed collaboration']
      },
      {
        id: 'ipfs_storage',
        name: 'IPFS Distributed Storage',
        icon: '🌐',
        description: 'Content-addressable storage using Merkle trees',
        application: 'Distribute and verify files across global network',
        impact: '1B+ files stored on IPFS network',
        merkleUse: 'File chunks organized in Merkle DAG for deduplication',
        features: ['Content verification', 'Automatic deduplication', 'Censorship resistance']
      },
      {
        id: 'blockchain_systems',
        name: 'Blockchain Ecosystems',
        icon: '⛓️',
        description: 'All major blockchains use Merkle trees for transaction organization',
        application: 'Organize and verify millions of transactions efficiently',
        impact: '$2.3T+ in blockchain market value',
        merkleUse: 'Transaction Merkle trees enable light clients and fast sync',
        features: ['Light client support', 'Fast synchronization', 'Fraud proofs']
      },
      {
        id: 'certificate_transparency',
        name: 'Certificate Transparency',
        icon: '🔒',
        description: 'Google\'s system to detect fraudulent SSL certificates',
        application: 'Monitor all SSL certificates issued globally',
        impact: 'Protects billions of HTTPS connections',
        merkleUse: 'Certificate logs organized as Merkle trees for auditing',
        features: ['Fraud detection', 'Public auditing', 'Real-time monitoring']
      }
    ];

    const handleInnovationExplore = (innovation) => {
      setSelectedInnovation(innovation);
      setPioneerPhase('analysis');
      
      // Generate implementation demo
      setImplementationDemo({
        efficiency: Math.floor(Math.random() * 90) + 10,
        scalability: Math.floor(Math.random() * 95) + 5,
        security: Math.floor(Math.random() * 98) + 2,
        adoption: `${Math.floor(Math.random() * 900) + 100}M+ users`
      });

      // Update user insights
      const insights = { ...userInsights };
      insights.innovationMastery = Math.min(insights.innovationMastery + 20, 100);
      setUserInsights(insights);
    };

    return (
      <div className="innovation-pioneer">
        <div className="pioneer-header">
          <div className="pioneer-icon">
            <Rocket className="w-16 h-16 text-purple-500" />
          </div>
          <h2>🚀 GLOBAL INNOVATION MASTERY</h2>
          <p className="pioneer-subtitle">Master how Merkle trees power global-scale innovations...</p>
      </div>

        {pioneerPhase === 'exploration' && (
          <div className="innovation-exploration">
            <div className="exploration-explanation">
              <div className="prime-text">
                🌍 Merkle trees aren't just theory—they power the most critical systems in our 
                digital world. From the code you write to the websites you visit, Merkle magic 
                is working behind the scenes.
          </div>
          </div>

            <h3>Explore global Merkle tree innovations:</h3>
            <div className="innovations-grid">
              {globalInnovations.map(innovation => (
                <div 
                  key={innovation.id}
                  className="innovation-card"
                  onClick={() => handleInnovationExplore(innovation)}
                >
                  <div className="innovation-header">
                    <span className="innovation-icon">{innovation.icon}</span>
                    <span className="innovation-name">{innovation.name}</span>
        </div>

                  <div className="innovation-description">
                    {innovation.description}
          </div>
                  
                  <div className="innovation-impact">
                    <strong>Global Impact:</strong> {innovation.impact}
        </div>

                  <div className="innovation-features">
                    {innovation.features.map(feature => (
                      <span key={feature} className="feature-tag">{feature}</span>
                    ))}
          </div>
          </div>
              ))}
        </div>
          </div>
        )}

        {pioneerPhase === 'analysis' && selectedInnovation && implementationDemo && (
          <div className="innovation-analysis">
            <div className="analysis-header">
              <h3>🔬 Deep Dive: {selectedInnovation.name}</h3>
          </div>

            <div className="innovation-implementation">
              <div className="implementation-details">
                <h4>⚙️ Merkle Implementation</h4>
                <div className="detail-item">
                  <strong>Application:</strong> {selectedInnovation.application}
                </div>
                <div className="detail-item">
                  <strong>Merkle Use:</strong> {selectedInnovation.merkleUse}
                </div>
                <div className="detail-item">
                  <strong>Global Impact:</strong> {selectedInnovation.impact}
          </div>
        </div>

              <div className="performance-metrics">
                <h4>📊 Performance Metrics</h4>
                <div className="metric-item">
                  <span className="metric-label">Efficiency:</span>
                  <div className="metric-bar">
                    <div 
                      className="metric-fill" 
                      style={{ width: `${implementationDemo.efficiency}%` }}
                    ></div>
          </div>
                  <span className="metric-value">{implementationDemo.efficiency}%</span>
          </div>
                <div className="metric-item">
                  <span className="metric-label">Scalability:</span>
                  <div className="metric-bar">
                    <div 
                      className="metric-fill" 
                      style={{ width: `${implementationDemo.scalability}%` }}
                    ></div>
        </div>
                  <span className="metric-value">{implementationDemo.scalability}%</span>
          </div>
                <div className="metric-item">
                  <span className="metric-label">Security:</span>
                  <div className="metric-bar">
                    <div 
                      className="metric-fill" 
                      style={{ width: `${implementationDemo.security}%` }}
                    ></div>
                  </div>
                  <span className="metric-value">{implementationDemo.security}%</span>
          </div>
        </div>
      </div>

            <div className="innovation-features-detail">
              <h4>✨ Key Features Enabled by Merkle Trees</h4>
              <div className="features-detailed">
                {selectedInnovation.features.map((feature, index) => (
                  <div key={index} className="feature-detail">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="analysis-insight">
      <div className="prime-text">
                🚀 {selectedInnovation.name} demonstrates how Merkle trees enable global-scale 
                systems to maintain efficiency, security, and verifiability. This is innovation 
                powered by elegant data structures.
              </div>
      </div>

            <div className="analysis-controls">
              <ActionButton onClick={() => setPioneerPhase('exploration')}>
                Explore More Innovations
              </ActionButton>
              
              {userInsights.innovationMastery >= 60 && (
                <ContinueButton onClick={() => handleContinue()}>
                  Achieve Efficiency Sovereignty →
      </ContinueButton>
              )}
            </div>
          </div>
        )}
    </div>
  );
  }

  function EfficiencySovereign() {
    const [sovereignPhase] = useState('revelation');
    const [impactMetrics, setImpactMetrics] = useState(null);
    const [sovereigntyLevel, setSovereigntyLevel] = useState(0);

    useEffect(() => {
      if (sovereignPhase === 'revelation') {
        // Calculate impact based on user journey
        const totalInsights = Object.values(userInsights).reduce((sum, val) => sum + val, 0);
        setImpactMetrics({
          trees_mastered: completedSteps.size,
          systems_designed: Math.floor(totalInsights / 50),
          efficiency_level: 'LOGARITHMIC',
          global_impact: 'TRANSFORMATIONAL'
        });
        
        setSovereigntyLevel(Math.min(totalInsights / 4, 100));
      }
    }, [sovereignPhase]);

    const globalDataSystems = [
      {
        icon: '₿',
        title: 'Bitcoin Network',
        impact: '850M+ transactions verified',
        description: 'Your Merkle knowledge powers the world\'s most secure payment network'
      },
      {
        icon: '📁',
        title: 'Git Repositories',
        impact: '100M+ developers rely on Git',
        description: 'Version control systems use Merkle trees you now understand'
      },
      {
        icon: '🌐',
        title: 'Distributed Systems',
        impact: '$1T+ in distributed infrastructure',
        description: 'Cloud systems use Merkle verification for data integrity'
      },
      {
        icon: '🔒',
        title: 'Security Systems',
        impact: 'Billions of certificates monitored',
        description: 'Certificate transparency logs use Merkle trees for fraud detection'
      }
    ];

    return (
      <div className="efficiency-sovereign">
        <div className="sovereign-header">
          <div className="sovereign-icon">
            <Crown className="w-20 h-20 text-yellow-500" />
      </div>
          <h2>👑 EFFICIENCY SOVEREIGNTY ACHIEVED</h2>
          <p className="sovereign-subtitle">You command optimal data structures for global-scale systems...</p>
        </div>

        {sovereignPhase === 'revelation' && impactMetrics && (
          <div className="sovereignty-revelation">
            <div className="achievement-metrics">
              <h3>📊 Your Data Crisis Architect Impact</h3>
              <div className="metrics-grid">
                <div className="impact-metric">
                  <span className="metric-icon">🌳</span>
                  <span className="metric-value">{impactMetrics.trees_mastered}</span>
                  <span className="metric-label">Tree Architectures Mastered</span>
        </div>
                <div className="impact-metric">
                  <span className="metric-icon">🏗️</span>
                  <span className="metric-value">{impactMetrics.systems_designed}</span>
                  <span className="metric-label">Efficient Systems Designed</span>
        </div>
                <div className="impact-metric">
                  <span className="metric-icon">⚡</span>
                  <span className="metric-value">{impactMetrics.efficiency_level}</span>
                  <span className="metric-label">Efficiency Level</span>
        </div>
                <div className="impact-metric">
                  <span className="metric-icon">🌍</span>
                  <span className="metric-value">{sovereigntyLevel.toFixed(0)}%</span>
                  <span className="metric-label">Data Structure Mastery</span>
                </div>
        </div>
      </div>

            <div className="global-impact">
              <h3>🌎 Your Knowledge Powers Global Data Systems</h3>
              <div className="systems-grid">
                {globalDataSystems.map((system, index) => (
                  <div key={index} className="system-card">
                    <span className="system-icon">{system.icon}</span>
                    <div className="system-content">
                      <h4>{system.title}</h4>
                      <div className="system-impact">{system.impact}</div>
                      <p>{system.description}</p>
                    </div>
                  </div>
                ))}
              </div>
      </div>

            <div className="sovereignty-powers">
              <h3>👑 Your Data Crisis Architect Powers</h3>
              <div className="powers-grid">
                <div className="power-item">
                  <CheckCircle className="power-icon" />
                  <span>Transform O(n) verification into O(log n) efficiency</span>
                </div>
                <div className="power-item">
                  <CheckCircle className="power-icon" />
                  <span>Design minimal proofs for massive datasets</span>
                </div>
                <div className="power-item">
                  <CheckCircle className="power-icon" />
                  <span>Engineer systems that scale to billions of records</span>
                </div>
                <div className="power-item">
                  <CheckCircle className="power-icon" />
                  <span>Architect fraud-proof verification systems</span>
                </div>
                <div className="power-item">
                  <CheckCircle className="power-icon" />
                  <span>Optimize global distributed system efficiency</span>
                </div>
                <div className="power-item">
                  <CheckCircle className="power-icon" />
                  <span>Command logarithmic data structures for any application</span>
                </div>
        </div>
      </div>

            <div className="final-insight">
              <div className="prime-text">
                🎓 You are now a Data Crisis Architect! You understand how to transform 
                inefficient linear systems into elegant logarithmic solutions. The power 
                to design globally scalable verification systems is in your hands.
              </div>
            </div>

            <div className="sovereignty-navigation">
              <ContinueButton onClick={() => handleContinue()}>
                Command Global Data Infrastructure →
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
    <div className="merkle-module">
      <div className="module-header">
        <h1 className="module-title">
          <div className="module-icon">
            <TreePine className="w-12 h-12" />
          </div>
          Data Crisis Architect: Engineer Logarithmic Efficiency
        </h1>
        <p className="module-subtitle">Transform data verification crises into elegant tree solutions that scale globally</p>
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

export default MerkleModule; 