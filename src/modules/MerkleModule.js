import React, { useState, useEffect } from 'react';
import { useProgress } from '../contexts/ProgressContext';
import { useNavigate } from 'react-router-dom';
import { 
  TreePine, 
  Search, 
  Hash,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Copy,
  Eye,
  EyeOff,
  Lightbulb,
  Target,
  Zap,
  Shield,
  Database,
  Cpu,
  BarChart3,
  Network,
  Globe,
  Key,
  FileText,
  Settings,
  Play
} from 'lucide-react';
import { 
  ContinueButton, 
  ActionButton, 
  OptionButton,
  NavigationButton 
} from '../components/EnhancedButtons';
import '../components/ModuleCommon.css';
import './MerkleModule.css';
import { sha256 } from '../utils/bitcoin';

const MerkleModule = () => {
  const { completeModule } = useProgress();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(new Set());

  // Interactive state management
  const [merkleBuilder, setMerkleBuilder] = useState({});
  const [proofVerification, setProofVerification] = useState({});
  const [scaleComparison, setScaleComparison] = useState({});
  const [userBuiltTrees, setUserBuiltTrees] = useState([]);
  const [insights, setInsights] = useState({});

  // Learning progression steps
  const merkleSteps = [
    {
      id: "merkle_introduction",
      title: "🌳 Introduction to Merkle Trees",
      subtitle: "Discover how trees of hashes solve massive data verification problems",
      component: MerkleIntroduction
    },
    {
      id: "tree_construction", 
      title: "🔨 Building Merkle Trees",
      subtitle: "Learn to construct trees step-by-step with hands-on building",
      component: TreeConstruction
    },
    {
      id: "proof_verification",
      title: "🔍 Merkle Proof Verification",
      subtitle: "Verify data integrity with minimal information using Merkle proofs",
      component: ProofVerification
    },
    {
      id: "bitcoin_integration",
      title: "₿ Bitcoin Block Verification",
      subtitle: "See how Bitcoin uses Merkle trees to verify millions of transactions",
      component: BitcoinIntegration
    },
    {
      id: "real_world_applications",
      title: "🌍 Real-World Applications",
      subtitle: "Explore how Merkle trees power Git, IPFS, and blockchain systems",
      component: RealWorldApplications
    },
    {
      id: "advanced_concepts",
      title: "🚀 Advanced Merkle Concepts",
      subtitle: "Master sparse trees, inclusion proofs, and optimization techniques",
      component: AdvancedConcepts
    }
  ];

  const handleStepComplete = (stepIndex) => {
    setCompletedSteps(prev => new Set([...prev, stepIndex]));
    if (stepIndex === merkleSteps.length - 1) {
      completeModule('merkle');
    }
  };

  const handleContinue = () => {
    if (currentStep < merkleSteps.length - 1) {
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

  const progressPercentage = ((currentStep + 1) / merkleSteps.length) * 100;
  const CurrentStepComponent = merkleSteps[currentStep]?.component;

  // Helper function for creating Merkle trees
  const createMerkleTree = (data) => {
    if (!data || data.length === 0) return null;
    
    // Start with leaf nodes (hash the data)
    let currentLevel = data.map(item => {
      const hash = sha256(typeof item === 'string' ? item : JSON.stringify(item));
      return {
        hash: hash.substring(0, 8) + '...', // Truncate for display
        data: item,
        type: 'leaf'
      };
    });

    const tree = [currentLevel];

    // Build tree bottom-up
    while (currentLevel.length > 1) {
      const nextLevel = [];
      
      for (let i = 0; i < currentLevel.length; i += 2) {
        const left = currentLevel[i];
        const right = currentLevel[i + 1] || left; // Duplicate if odd number
        
        const combinedHash = sha256(left.hash + right.hash);
        nextLevel.push({
          hash: combinedHash.substring(0, 8) + '...',
          left,
          right,
          type: 'internal'
        });
      }
      
      currentLevel = nextLevel;
      tree.push(currentLevel);
    }
    
    return {
      root: currentLevel[0],
      levels: tree.reverse(), // Root at top
      height: tree.length
    };
  };

  // Helper function for generating Merkle proofs
  const generateMerkleProof = (tree, targetIndex) => {
    const proof = [];
    let currentIndex = targetIndex;
    let currentLevel = tree.levels[tree.levels.length - 1]; // Start at leaf level

    for (let level = tree.levels.length - 1; level > 0; level--) {
      const siblingIndex = currentIndex % 2 === 0 ? currentIndex + 1 : currentIndex - 1;
      const sibling = currentLevel[siblingIndex];
      
      if (sibling) {
          proof.push({
          hash: sibling.hash,
          position: currentIndex % 2 === 0 ? 'right' : 'left',
          level
          });
        }
        
      currentIndex = Math.floor(currentIndex / 2);
      currentLevel = tree.levels[level - 1];
    }
    
    return proof;
  };

  // Merkle Introduction Component
  function MerkleIntroduction() {
    const [currentDemo, setCurrentDemo] = useState('concept');
    const [userPrediction, setUserPrediction] = useState('');
    const [showReality, setShowReality] = useState(false);
    const [selectedProblem, setSelectedProblem] = useState(null);

    const verificationProblems = [
      {
        id: 'download_verification',
        title: 'File Download Verification',
        problem: 'You download a 10GB file. How do you verify it wasn\'t corrupted?',
        badSolution: 'Re-download the entire file to compare',
        goodSolution: 'Use a Merkle tree to verify with just a few small hashes',
        scale: '10GB file verified with <1KB of proof data'
      },
      {
        id: 'database_sync',
        title: 'Database Synchronization',
        problem: 'Two databases with millions of records need to sync. How to find differences?',
        badSolution: 'Compare every single record one by one',
        goodSolution: 'Use Merkle trees to identify changed sections efficiently',
        scale: 'Million records verified with log(n) comparisons'
      },
      {
        id: 'blockchain_verification',
        title: 'Blockchain Transaction Verification',
        problem: 'A block contains 3000 transactions. How to verify one transaction?',
        badSolution: 'Download and verify all 3000 transactions',
        goodSolution: 'Use Merkle proof to verify with just ~12 hashes',
        scale: '1 transaction verified without downloading 2999 others'
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

    const handleProblemSelect = (problem) => {
      setSelectedProblem(problem);
      setCurrentDemo('problem_analysis');
    };

    return (
      <div className="merkle-introduction">
      <div className="intro-header">
          <TreePine className="intro-icon" size={48} />
          <h2>Merkle Trees: Efficient Data Verification</h2>
          <p>Learn how tree structures revolutionize large-scale data verification</p>
        </div>

        {currentDemo === 'concept' && (
          <div className="intro-content">
            <div className="concept-intro">
              <div className="thinking-challenge">
                <h3>🤔 Think about this challenge...</h3>
                <p>Imagine you have a database with 1 million records. Someone claims they've only changed one record. How would you efficiently verify this claim?</p>
                
                <div className="prediction-challenge">
                  <p><strong>Question:</strong> What approach would you take to verify the integrity of massive datasets without checking every single piece of data?</p>
                  <textarea
                    value={userPrediction}
                    onChange={(e) => setUserPrediction(e.target.value)}
                    placeholder="Share your approach to this verification challenge..."
                    className="prediction-input"
                    rows={3}
                  />
                  <ActionButton 
                    onClick={handlePredictionSubmit}
                    disabled={userPrediction.length < 10}
                  >
                    See the Elegant Solution
                  </ActionButton>
      </div>
      
                {showReality && (
                  <div className="reality-reveal">
                    <div className="insight-box">
                      <Lightbulb size={24} />
                      <div>
                        <h4>You're thinking like a computer scientist!</h4>
                        <p>Merkle trees solve exactly this problem. They organize data in a tree structure where you can verify any piece of data using just a logarithmic number of hashes - that's the magic of trees!</p>
            </div>
                    </div>
                  </div>
                )}
          </div>
          
              {showReality && (
                <div className="verification-problems">
                  <h3>🎯 Real Verification Challenges</h3>
                  <p>Here are three common problems Merkle trees solve elegantly:</p>
                  
                  <div className="problems-grid">
                    {verificationProblems.map(problem => (
                      <div 
                        key={problem.id} 
                        className="problem-card"
                        onClick={() => handleProblemSelect(problem)}
                      >
                        <h4>{problem.title}</h4>
                        <p>{problem.problem}</p>
                        <div className="efficiency-gain">
                          <strong>Merkle Solution:</strong> {problem.scale}
            </div>
          </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {currentDemo === 'problem_analysis' && selectedProblem && (
          <div className="problem-analysis">
            <div className="analysis-header">
              <h3>🔍 Analysis: {selectedProblem.title}</h3>
              <p>{selectedProblem.problem}</p>
            </div>

            <div className="solution-comparison">
              <div className="bad-solution">
                <h4>❌ Inefficient Approach</h4>
                <div className="solution-box bad">
                  {selectedProblem.badSolution}
                </div>
                <div className="complexity">
                  Complexity: O(n) - Linear with data size
            </div>
        </div>

              <div className="good-solution">
                <h4>✅ Merkle Tree Approach</h4>
                <div className="solution-box good">
                  {selectedProblem.goodSolution}
            </div>
                <div className="complexity">
                  Complexity: O(log n) - Logarithmic efficiency!
          </div>
        </div>
      </div>

            <div className="scale-visualization">
              <h4>📊 Scale Comparison</h4>
              <div className="scale-example">
                <div className="scale-metric">
                  <strong>For 1 Million Items:</strong>
                </div>
                <div className="scale-comparison">
                  <div className="inefficient">Linear: 1,000,000 operations</div>
                  <div className="efficient">Merkle: ~20 operations (log₂ 1M)</div>
                </div>
                <div className="improvement">
                  <strong>50,000x more efficient!</strong>
                </div>
              </div>
      </div>

            <div className="key-insight">
              <div className="insight-box">
                <Target size={24} />
                <div>
                  <h4>Key Insight: Tree Power</h4>
                  <p>Trees reduce verification complexity from linear O(n) to logarithmic O(log n). For large datasets, this difference is revolutionary!</p>
                </div>
              </div>
            </div>

            <div className="demo-controls">
              <ActionButton onClick={() => setCurrentDemo('concept')}>
                ← See Other Problems
              </ActionButton>
              <ContinueButton onClick={handleContinue}>
                Learn Tree Construction →
      </ContinueButton>
            </div>
          </div>
        )}
    </div>
  );
  }

  // Tree Construction Component
  function TreeConstruction() {
    const [currentPhase, setCurrentPhase] = useState('learning');
    const [userData, setUserData] = useState(['Alice', 'Bob', 'Carol', 'Dave']);
    const [builtTree, setBuiltTree] = useState(null);
    const [constructionStep, setConstructionStep] = useState(0);
    const [showStepByStep, setShowStepByStep] = useState(false);

    const constructTree = () => {
      const tree = createMerkleTree(userData);
      setBuiltTree(tree);
      setCurrentPhase('construction');
      setConstructionStep(0);
    };

    const startStepByStep = () => {
      setShowStepByStep(true);
      setConstructionStep(0);
      
      // Animate through construction steps
      const stepInterval = setInterval(() => {
        setConstructionStep(prev => {
          if (prev >= (builtTree?.levels?.length || 0) - 1) {
            clearInterval(stepInterval);
            return prev;
          }
          return prev + 1;
        });
      }, 2000);
    };

    const addDataItem = () => {
      const newItem = `User${userData.length + 1}`;
      setUserData(prev => [...prev, newItem]);
    };

    const removeDataItem = (index) => {
      setUserData(prev => prev.filter((_, i) => i !== index));
    };

    const TreeVisualization = ({ tree, highlightLevel = -1 }) => {
      if (!tree) return null;

      return (
        <div className="tree-visualization">
          {tree.levels.map((level, levelIndex) => (
            <div 
              key={levelIndex} 
              className={`tree-level ${levelIndex === highlightLevel ? 'highlighted' : ''}`}
            >
                <div className="level-label">
                {levelIndex === 0 ? 'Root' : levelIndex === tree.levels.length - 1 ? 'Leaves' : `Level ${levelIndex}`}
                </div>
                <div className="level-nodes">
                  {level.map((node, nodeIndex) => (
                  <div 
                    key={nodeIndex} 
                    className={`tree-node ${node.type}`}
                  >
                    <div className="node-hash">{node.hash}</div>
                    {node.data && (
                      <div className="node-data">{node.data}</div>
                    )}
                    </div>
                  ))}
                </div>
            </div>
          ))}
          </div>
      );
    };

    return (
      <div className="tree-construction">
        <div className="construction-header">
          <Hash className="construction-icon" size={48} />
          <h2>Building Merkle Trees</h2>
          <p>Learn to construct Merkle trees step-by-step from your own data</p>
        </div>

        {currentPhase === 'learning' && (
          <div className="construction-learning">
            <div className="learning-intro">
              <h3>🏗️ How Merkle Trees Are Built</h3>
              <p>Merkle trees are constructed bottom-up: start with data, hash it, then pair and hash again until you reach a single root.</p>
              
              <div className="construction-steps">
                <div className="step">
                  <div className="step-number">1</div>
                  <div className="step-description">
                    <strong>Hash the Data:</strong> Take each piece of data and create a cryptographic hash
                  </div>
                </div>
                <div className="step">
                  <div className="step-number">2</div>
                  <div className="step-description">
                    <strong>Pair and Hash:</strong> Combine adjacent hashes and hash the result
                  </div>
                </div>
                <div className="step">
                  <div className="step-number">3</div>
                  <div className="step-description">
                    <strong>Repeat:</strong> Continue pairing and hashing until only one hash remains
                  </div>
                </div>
                <div className="step">
                  <div className="step-number">4</div>
                  <div className="step-description">
                    <strong>Root Hash:</strong> The final hash is your Merkle root - it represents all data
                  </div>
                </div>
              </div>
        </div>

            <div className="data-builder">
              <h3>🎯 Build Your Own Tree</h3>
              <p>Customize your data and watch the tree construction:</p>
              
              <div className="data-editor">
                <h4>Your Data:</h4>
                <div className="data-items">
                  {userData.map((item, index) => (
                    <div key={index} className="data-item">
                      <span>{item}</span>
                      <button 
                        onClick={() => removeDataItem(index)}
                        className="remove-btn"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  <button onClick={addDataItem} className="add-btn">
                    + Add Item
                  </button>
                </div>
              </div>

              <div className="construction-controls">
                <ActionButton onClick={constructTree}>
                  🌳 Build Merkle Tree
                </ActionButton>
              </div>
            </div>
          </div>
        )}

        {currentPhase === 'construction' && builtTree && (
          <div className="tree-construction-result">
            <div className="construction-complete">
              <h3>🎉 Tree Construction Complete!</h3>
              <p>Your data has been organized into a Merkle tree with {builtTree.height} levels.</p>
            </div>

            <TreeVisualization 
              tree={builtTree} 
              highlightLevel={showStepByStep ? constructionStep : -1}
            />

            <div className="tree-info">
              <div className="info-grid">
                <div className="info-item">
                  <strong>Data Items:</strong> {userData.length}
                </div>
                <div className="info-item">
                  <strong>Tree Height:</strong> {builtTree.height}
                </div>
                <div className="info-item">
                  <strong>Root Hash:</strong> {builtTree.root.hash}
                </div>
                <div className="info-item">
                  <strong>Proof Size:</strong> ~{Math.ceil(Math.log2(userData.length))} hashes
                </div>
              </div>
            </div>

            {!showStepByStep && (
              <div className="visualization-controls">
                <ActionButton onClick={startStepByStep}>
                  🎬 Watch Step-by-Step Construction
                </ActionButton>
              </div>
            )}

            {showStepByStep && (
              <div className="step-explanation">
                <h4>Construction Step {constructionStep + 1}</h4>
                <p>
                  {constructionStep === builtTree.levels.length - 1 
                    ? "Starting with the leaf nodes (hashed data)"
                    : constructionStep === 0 
                      ? "Final root hash - represents entire dataset"
                      : `Combining and hashing pairs from level ${builtTree.levels.length - constructionStep}`
                  }
                </p>
              </div>
            )}

            <div className="construction-controls">
              <ActionButton onClick={() => {
                setCurrentPhase('learning');
                setShowStepByStep(false);
                setBuiltTree(null);
              }}>
                ← Build Another Tree
              </ActionButton>
              <ContinueButton onClick={handleContinue}>
                Learn Proof Verification →
        </ContinueButton>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Proof Verification Component
  function ProofVerification() {
    const [currentMode, setCurrentMode] = useState('concept');
    const [selectedLeaf, setSelectedLeaf] = useState(null);
    const [proof, setProof] = useState(null);
    const [verificationStep, setVerificationStep] = useState(0);
    const [verificationInProgress, setVerificationInProgress] = useState(false);

    const exampleData = ['Transaction A', 'Transaction B', 'Transaction C', 'Transaction D', 'Transaction E', 'Transaction F'];
    const exampleTree = createMerkleTree(exampleData);

    const generateProof = (leafIndex) => {
      const proofData = generateMerkleProof(exampleTree, leafIndex);
      setProof({
        targetData: exampleData[leafIndex],
        targetHash: exampleTree.levels[exampleTree.levels.length - 1][leafIndex].hash,
        proofPath: proofData,
        rootHash: exampleTree.root.hash
      });
      setSelectedLeaf(leafIndex);
      setCurrentMode('verification');
    };

    const startVerification = () => {
      setVerificationInProgress(true);
      setVerificationStep(0);
      
      // Animate through verification steps
      const stepInterval = setInterval(() => {
        setVerificationStep(prev => {
          if (prev >= proof.proofPath.length) {
            clearInterval(stepInterval);
            setVerificationInProgress(false);
            return prev;
          }
          return prev + 1;
        });
      }, 1500);
    };

    const VerificationVisualization = () => {
      if (!proof) return null;

    return (
        <div className="verification-visualization">
          <div className="verification-steps">
            <div className="step-header">
              <h4>Verification Process</h4>
              <p>Following the proof path from leaf to root</p>
        </div>

            <div className="current-step">
              <div className="step-info">
                <strong>Step {verificationStep + 1}:</strong>
                {verificationStep === 0 
                  ? `Start with target data: "${proof.targetData}"`
                  : verificationStep <= proof.proofPath.length
                    ? `Combine with sibling and hash`
                    : `Compare with root hash`
                }
          </div>
          
              {verificationStep <= proof.proofPath.length && (
                <div className="hash-combination">
                  <div className="hash-inputs">
                    <div className="hash-input current">
                      Current: {verificationStep === 0 ? proof.targetHash : 'Combined Hash'}
        </div>
                    {verificationStep > 0 && verificationStep <= proof.proofPath.length && (
                      <div className="hash-input sibling">
                        Sibling: {proof.proofPath[verificationStep - 1]?.hash}
                </div>
                    )}
                      </div>
                  {verificationStep > 0 && verificationStep <= proof.proofPath.length && (
                    <div className="hash-result">
                      Result: Combined Hash
                  </div>
                  )}
                </div>
              )}
        </div>

            <div className="verification-progress">
              <div className="progress-bar">
                <div 
                  className="progress-fill"
                  style={{ width: `${(verificationStep / (proof.proofPath.length + 1)) * 100}%` }}
                />
        </div>
              <span>Step {verificationStep} of {proof.proofPath.length + 1}</span>
            </div>
          </div>
      </div>
    );
  };
    
    return (
      <div className="proof-verification">
        <div className="verification-header">
          <Search className="verification-icon" size={48} />
          <h2>Merkle Proof Verification</h2>
          <p>Learn how to verify data integrity with minimal proof information</p>
        </div>

        {currentMode === 'concept' && (
          <div className="verification-concept">
            <div className="concept-explanation">
              <h3>🔍 What is a Merkle Proof?</h3>
              <p>A Merkle proof is a small set of hashes that allows you to verify that a specific piece of data is included in a larger dataset, without needing the entire dataset.</p>
              
              <div className="proof-benefits">
                <h4>🎯 Why Merkle Proofs Are Powerful</h4>
                <div className="benefit-grid">
                  <div className="benefit-item">
                    <Shield size={24} />
                    <div>
                      <strong>Efficient</strong>
                      <p>Verify with log(n) hashes instead of n items</p>
              </div>
            </div>
                  <div className="benefit-item">
                    <Zap size={24} />
                    <div>
                      <strong>Fast</strong>
                      <p>Instant verification without downloading</p>
                    </div>
                  </div>
                  <div className="benefit-item">
                    <CheckCircle size={24} />
                    <div>
                      <strong>Secure</strong>
                      <p>Cryptographically guaranteed accuracy</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="interactive-demo">
              <h3>🎯 Interactive Proof Generation</h3>
              <p>Click on any data item to generate its Merkle proof:</p>
              
              <div className="data-selection">
                {exampleData.map((item, index) => (
                  <div 
                    key={index}
                    className="selectable-data"
                    onClick={() => generateProof(index)}
                  >
                    <div className="data-content">{item}</div>
                    <div className="selection-hint">Click to generate proof</div>
              </div>
                ))}
            </div>
            
              <div className="proof-explanation">
                <h4>💡 How Proofs Work</h4>
                <p>To verify that "Transaction C" is in the tree, you only need:</p>
                <ul>
                  <li>The hash of "Transaction C"</li>
                  <li>The hash of its sibling</li>
                  <li>The hash of its parent's sibling</li>
                  <li>Continue up to the root</li>
                </ul>
                <p>Total: ~log₂(n) hashes instead of n hashes!</p>
              </div>
            </div>
          </div>
        )}

        {currentMode === 'verification' && proof && (
          <div className="proof-verification-demo">
            <div className="verification-info">
              <h3>🔍 Verifying: "{proof.targetData}"</h3>
              <p>Watch how we verify this data using only a small proof:</p>
          </div>

          <div className="proof-details">
              <div className="proof-summary">
                <h4>📋 Proof Information</h4>
                <div className="proof-data">
                  <div><strong>Target:</strong> {proof.targetData}</div>
                  <div><strong>Target Hash:</strong> {proof.targetHash}</div>
                  <div><strong>Proof Size:</strong> {proof.proofPath.length} hashes</div>
                  <div><strong>Root Hash:</strong> {proof.rootHash}</div>
                </div>
              </div>

              <div className="proof-path">
                <h4>🛤️ Proof Path</h4>
                <div className="path-hashes">
                  {proof.proofPath.map((pathItem, index) => (
                    <div key={index} className="path-item">
                      <span className="path-position">{pathItem.position}</span>
                      <span className="path-hash">{pathItem.hash}</span>
                </div>
              ))}
            </div>
            </div>
          </div>

            {!verificationInProgress && verificationStep === 0 && (
              <div className="verification-controls">
                <ActionButton onClick={startVerification}>
                  🚀 Start Verification Process
                </ActionButton>
        </div>
            )}

            {(verificationInProgress || verificationStep > 0) && (
              <VerificationVisualization />
            )}

            {verificationStep > proof.proofPath.length && (
              <div className="verification-complete">
                <div className="success-message">
                  <CheckCircle size={48} className="success-icon" />
                  <h4>✅ Verification Successful!</h4>
                  <p>The data "{proof.targetData}" is proven to be in the original dataset.</p>
        </div>

                <div className="efficiency-stats">
                  <h4>📊 Efficiency Achieved</h4>
                  <div className="stats-grid">
                    <div className="stat">
                      <span className="stat-value">{proof.proofPath.length}</span>
                      <span className="stat-label">Hashes used</span>
                    </div>
                    <div className="stat">
                      <span className="stat-value">{exampleData.length}</span>
                      <span className="stat-label">Total data items</span>
                    </div>
                    <div className="stat">
                      <span className="stat-value">{Math.round((1 - proof.proofPath.length / exampleData.length) * 100)}%</span>
                      <span className="stat-label">Efficiency gain</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="demo-controls">
              <ActionButton onClick={() => {
                setCurrentMode('concept');
                setProof(null);
                setSelectedLeaf(null);
                setVerificationStep(0);
                setVerificationInProgress(false);
              }}>
                ← Try Another Proof
              </ActionButton>
              
              {verificationStep > proof.proofPath.length && (
                <ContinueButton onClick={handleContinue}>
                  See Bitcoin Integration →
        </ContinueButton>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Bitcoin Integration Component
  function BitcoinIntegration() {
    const [currentView, setCurrentView] = useState('overview');
    const [blockSimulation, setBlockSimulation] = useState(null);
    const [selectedTransaction, setSelectedTransaction] = useState(null);

    const simulateBlock = () => {
      // Create a simulated Bitcoin block with transactions
      const transactions = Array.from({ length: 2048 }, (_, i) => ({
        id: `tx_${i + 1}`,
        from: `addr_${Math.floor(Math.random() * 1000)}`,
        to: `addr_${Math.floor(Math.random() * 1000)}`,
        amount: (Math.random() * 10).toFixed(4),
        fee: (Math.random() * 0.001).toFixed(6)
      }));

      const merkleTree = createMerkleTree(transactions.map(tx => tx.id));
      
      setBlockSimulation({
        blockNumber: 750000 + Math.floor(Math.random() * 1000),
        transactions,
        merkleRoot: merkleTree.root.hash,
        merkleTree,
        proofSize: Math.ceil(Math.log2(transactions.length))
      });
      setCurrentView('simulation');
    };

    const selectTransaction = (txIndex) => {
      if (!blockSimulation) return;
      
      const tx = blockSimulation.transactions[txIndex];
      const proof = generateMerkleProof(blockSimulation.merkleTree, txIndex);
      
      setSelectedTransaction({
        ...tx,
        index: txIndex,
        proof,
        proofSize: proof.length
      });
      setCurrentView('proof_demo');
    };

    return (
      <div className="bitcoin-integration">
        <div className="integration-header">
          <Database className="integration-icon" size={48} />
          <h2>Bitcoin Block Verification</h2>
          <p>See how Bitcoin uses Merkle trees to verify millions of transactions efficiently</p>
      </div>

        {currentView === 'overview' && (
          <div className="bitcoin-overview">
            <div className="overview-explanation">
              <h3>₿ How Bitcoin Uses Merkle Trees</h3>
              <p>Every Bitcoin block contains thousands of transactions organized in a Merkle tree. This allows anyone to verify a specific transaction without downloading the entire block.</p>
              
              <div className="bitcoin-benefits">
                <div className="benefit-card">
                  <h4>🔄 Simplified Payment Verification (SPV)</h4>
                  <p>Light clients can verify transactions with just block headers and Merkle proofs, requiring only a few KB instead of GB of data.</p>
                </div>
                <div className="benefit-card">
                  <h4>⚡ Fast Synchronization</h4>
                  <p>New nodes can verify block integrity using Merkle roots without processing every transaction.</p>
                </div>
                <div className="benefit-card">
                  <h4>📱 Mobile Wallets</h4>
                  <p>Smartphones can run Bitcoin wallets that verify payments without storing the entire blockchain.</p>
                </div>
              </div>
            </div>

            <div className="scale-demonstration">
              <h3>📊 Bitcoin Scale Requirements</h3>
              <div className="scale-stats">
                <div className="scale-stat">
                  <div className="stat-value">~3,000</div>
                  <div className="stat-label">Transactions per block</div>
                </div>
                <div className="scale-stat">
                  <div className="stat-value">~12</div>
                  <div className="stat-label">Hashes to verify any transaction</div>
                </div>
                <div className="scale-stat">
                  <div className="stat-value">99.6%</div>
                  <div className="stat-label">Data reduction achieved</div>
                </div>
              </div>
            </div>

            <div className="simulation-starter">
              <h3>🎯 Interactive Block Simulation</h3>
              <p>Experience how Bitcoin block verification works:</p>
              
              <ActionButton onClick={simulateBlock}>
                🧊 Generate Simulated Bitcoin Block
              </ActionButton>
            </div>
          </div>
        )}

        {currentView === 'simulation' && blockSimulation && (
          <div className="block-simulation">
          <div className="block-header">
              <h3>🧊 Bitcoin Block #{blockSimulation.blockNumber}</h3>
              <div className="block-info">
                <div><strong>Transactions:</strong> {blockSimulation.transactions.length}</div>
                <div><strong>Merkle Root:</strong> {blockSimulation.merkleRoot}</div>
                <div><strong>Proof Size:</strong> ~{blockSimulation.proofSize} hashes</div>
            </div>
            </div>

            <div className="transaction-selector">
              <h4>🔍 Select a Transaction to Verify</h4>
              <p>Click any transaction to see how it can be verified using a Merkle proof:</p>
              
              <div className="transaction-grid">
                {blockSimulation.transactions.slice(0, 20).map((tx, index) => (
                  <div 
                    key={tx.id}
                    className="transaction-item"
                    onClick={() => selectTransaction(index)}
                  >
                    <div className="tx-id">{tx.id}</div>
                    <div className="tx-amount">{tx.amount} BTC</div>
            </div>
                ))}
                <div className="more-transactions">
                  ... and {blockSimulation.transactions.length - 20} more transactions
            </div>
            </div>
            </div>

            <div className="verification-explanation">
              <h4>💡 What This Demonstrates</h4>
              <p>In a real Bitcoin block with {blockSimulation.transactions.length} transactions, you can verify any single transaction using only ~{blockSimulation.proofSize} hashes instead of downloading all {blockSimulation.transactions.length} transactions.</p>
          </div>
          </div>
        )}

        {currentView === 'proof_demo' && selectedTransaction && (
          <div className="transaction-proof-demo">
            <div className="proof-header">
              <h3>🔍 Verifying Transaction: {selectedTransaction.id}</h3>
              <p>See how this transaction is verified in the Bitcoin block</p>
            </div>

            <div className="transaction-details">
              <div className="tx-info">
                <h4>📋 Transaction Details</h4>
                <div className="tx-data">
                  <div><strong>From:</strong> {selectedTransaction.from}</div>
                  <div><strong>To:</strong> {selectedTransaction.to}</div>
                  <div><strong>Amount:</strong> {selectedTransaction.amount} BTC</div>
                  <div><strong>Fee:</strong> {selectedTransaction.fee} BTC</div>
                  <div><strong>Position:</strong> #{selectedTransaction.index + 1} of {blockSimulation.transactions.length}</div>
            </div>
          </div>

              <div className="proof-info">
                <h4>🛤️ Merkle Proof</h4>
                <div className="proof-stats">
                  <div><strong>Proof Size:</strong> {selectedTransaction.proofSize} hashes</div>
                  <div><strong>Data Saved:</strong> {((1 - selectedTransaction.proofSize / blockSimulation.transactions.length) * 100).toFixed(1)}%</div>
                  <div><strong>Verification:</strong> Instant</div>
          </div>
        </div>
      </div>

            <div className="real-world-impact">
              <h4>🌍 Real-World Impact</h4>
              <div className="impact-scenarios">
                <div className="scenario">
                  <strong>📱 Mobile Wallet:</strong> Can verify payments using only {selectedTransaction.proofSize} hashes instead of downloading {blockSimulation.transactions.length} transactions
                </div>
                <div className="scenario">
                  <strong>💼 Business:</strong> Can prove payment receipt to customers with minimal data transfer
                </div>
                <div className="scenario">
                  <strong>🏛️ Audit:</strong> Regulators can verify specific transactions without accessing entire blockchain
                </div>
              </div>
            </div>

            <div className="key-insight">
              <div className="insight-box">
                <Lightbulb size={24} />
                <div>
                  <h4>Key Insight: Bitcoin's Scalability</h4>
                  <p>Merkle trees make Bitcoin usable on mobile devices and enable the Lightning Network. Without them, only powerful computers could participate in the network.</p>
                </div>
              </div>
            </div>

            <div className="demo-controls">
              <ActionButton onClick={() => setCurrentView('simulation')}>
                ← Try Another Transaction
              </ActionButton>
              <ContinueButton onClick={handleContinue}>
                Explore Real-World Applications →
      </ContinueButton>
            </div>
          </div>
        )}
    </div>
  );
  }

  // Real World Applications Component
  function RealWorldApplications() {
    const [selectedApp, setSelectedApp] = useState(null);
    const [currentDemo, setCurrentDemo] = useState('overview');

    const applications = [
      {
        id: 'git',
        name: 'Git Version Control',
        icon: '🌿',
        description: 'Git uses Merkle trees to track file changes efficiently',
        useCase: 'Every Git commit is a Merkle tree of file changes',
        benefit: 'Compare entire projects with single hash comparisons',
        scale: 'Linux kernel: 28M files tracked efficiently',
        technical: 'Each Git object (blob, tree, commit) has a SHA-1 hash, forming a Merkle DAG'
      },
      {
        id: 'ipfs',
        name: 'IPFS (InterPlanetary File System)',
        icon: '🌌',
        description: 'IPFS uses Merkle DAGs for distributed file storage',
        useCase: 'Content addressing and deduplication across the network',
        benefit: 'Verify file integrity without trusting storage providers',
        scale: 'Petabytes of data with cryptographic guarantees',
        technical: 'Content-addressed using multihashes in a Merkle DAG structure'
      },
      {
        id: 'ethereum',
        name: 'Ethereum State Trees',
        icon: '💎',
        description: 'Ethereum uses multiple Merkle trees for state management',
        useCase: 'Track account balances, smart contract storage, and transactions',
        benefit: 'Light clients can verify state without full node data',
        scale: '100M+ accounts with logarithmic verification',
        technical: 'Patricia Merkle Trees for state, storage, and transaction receipts'
      },
      {
        id: 'bittorrent',
        name: 'BitTorrent Protocol',
        icon: '🌐',
        description: 'BitTorrent uses hash trees for piece verification',
        useCase: 'Verify file chunks during peer-to-peer downloads',
        benefit: 'Detect corrupted pieces without re-downloading entire files',
        scale: 'Billions of files shared with integrity guarantees',
        technical: 'Hash trees prevent malicious or corrupted piece distribution'
      },
      {
        id: 'certificate_transparency',
        name: 'Certificate Transparency',
        icon: '🔒',
        description: 'CT logs use Merkle trees for public audit trails',
        useCase: 'Publicly audit SSL certificate issuance',
        benefit: 'Detect mis-issued certificates and CA compromise',
        scale: 'Billions of certificates in append-only logs',
        technical: 'RFC 6962 specifies Merkle tree structures for CT logs'
      },
      {
        id: 'amazon_qldb',
        name: 'Amazon QLDB',
        icon: '📚',
        description: 'Quantum Ledger Database uses Merkle trees for immutability',
        useCase: 'Immutable database with cryptographic proof of changes',
        benefit: 'Verify data integrity and audit trail completeness',
        scale: 'Enterprise databases with cryptographic guarantees',
        technical: 'Journal blocks organized in Merkle trees with SHA-256'
      }
    ];

    const exploreApplication = (app) => {
      setSelectedApp(app);
      setCurrentDemo('detailed');
    };

    return (
      <div className="real-world-applications">
        <div className="applications-header">
          <Globe className="applications-icon" size={48} />
          <h2>Real-World Merkle Tree Applications</h2>
          <p>Discover how Merkle trees power systems you use every day</p>
      </div>

        {currentDemo === 'overview' && (
          <div className="applications-overview">
            <div className="overview-intro">
              <h3>🌍 Merkle Trees Everywhere</h3>
              <p>Merkle trees aren't just for Bitcoin - they're a fundamental building block of modern distributed systems. Here are some systems you might recognize:</p>
            </div>

            <div className="applications-grid">
              {applications.map(app => (
                <div 
                  key={app.id}
                  className="application-card"
                  onClick={() => exploreApplication(app)}
                >
                  <div className="app-icon">{app.icon}</div>
                  <h4>{app.name}</h4>
                  <p>{app.description}</p>
                  <div className="app-scale">
                    <strong>Scale:</strong> {app.scale}
            </div>
            </div>
              ))}
            </div>

            <div className="common-benefits">
              <h3>🎯 Common Benefits Across All Applications</h3>
              <div className="benefits-grid">
                <div className="benefit">
                  <Zap size={24} />
                  <div>
                    <strong>Efficient Verification</strong>
                    <p>O(log n) instead of O(n) operations</p>
          </div>
          </div>
                <div className="benefit">
                  <Shield size={24} />
                  <div>
                    <strong>Tamper Detection</strong>
                    <p>Any change cascades to root hash</p>
        </div>
                </div>
                <div className="benefit">
                  <Network size={24} />
                  <div>
                    <strong>Distributed Trust</strong>
                    <p>No single point of failure</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentDemo === 'detailed' && selectedApp && (
          <div className="application-detailed">
            <div className="detailed-header">
              <div className="app-icon-large">{selectedApp.icon}</div>
              <h3>{selectedApp.name}</h3>
              <p>{selectedApp.description}</p>
            </div>

            <div className="detailed-breakdown">
              <div className="use-case-section">
                <h4>🎯 Use Case</h4>
                <div className="use-case-box">
                  {selectedApp.useCase}
            </div>
            </div>

              <div className="benefit-section">
                <h4>✅ Key Benefit</h4>
                <div className="benefit-box">
                  {selectedApp.benefit}
            </div>
          </div>

              <div className="technical-section">
                <h4>⚙️ Technical Implementation</h4>
                <div className="technical-box">
                  {selectedApp.technical}
                </div>
              </div>

              <div className="scale-section">
                <h4>📊 Scale Achievement</h4>
                <div className="scale-box">
                  {selectedApp.scale}
          </div>
        </div>
      </div>

            {selectedApp.id === 'git' && (
              <div className="git-example">
                <h4>💡 Git Example</h4>
                <div className="example-explanation">
                  <p>When you run <code>git commit</code>, Git creates a tree object containing:</p>
                  <ul>
                    <li>Hashes of all files (blobs)</li>
                    <li>Hashes of subdirectories (trees)</li>
                    <li>A commit object pointing to the tree hash</li>
                  </ul>
                  <p>This allows Git to detect any change in your project with a single hash comparison!</p>
      </div>
              </div>
            )}

            {selectedApp.id === 'ipfs' && (
              <div className="ipfs-example">
                <h4>💡 IPFS Example</h4>
                <div className="example-explanation">
                  <p>When you add a file to IPFS:</p>
                  <ul>
                    <li>File is split into chunks</li>
                    <li>Each chunk gets a cryptographic hash</li>
                    <li>Chunks are organized in a Merkle DAG</li>
                    <li>File address is the root hash</li>
                  </ul>
                  <p>This enables deduplication, verification, and distributed storage!</p>
        </div>
      </div>
            )}

            <div className="key-insight">
              <div className="insight-box">
                <Target size={24} />
                <div>
                  <h4>Key Insight: Universal Pattern</h4>
                  <p>Notice how different systems use Merkle trees for the same core benefits: efficient verification, tamper detection, and scalable trust. It's a fundamental building block of distributed systems.</p>
                </div>
              </div>
            </div>

            <div className="detailed-controls">
              <ActionButton onClick={() => setCurrentDemo('overview')}>
                ← Explore Other Applications
              </ActionButton>
              <ContinueButton onClick={handleContinue}>
                Master Advanced Concepts →
                </ContinueButton>
            </div>
          </div>
        )}
              </div>
  );
  }

  // Advanced Concepts Component
  function AdvancedConcepts() {
    const [currentConcept, setCurrentConcept] = useState('overview');
    const [selectedAdvanced, setSelectedAdvanced] = useState(null);
    const [completedConcepts, setCompletedConcepts] = useState(new Set());

    const advancedConcepts = [
      {
        id: 'sparse_trees',
        name: 'Sparse Merkle Trees',
        difficulty: 'Advanced',
        description: 'Handle datasets with many empty positions efficiently',
        useCase: 'Ethereum account trees with 2^160 possible addresses',
        benefit: 'Constant proof size regardless of tree sparsity',
        explanation: 'Use default hash values for empty nodes, enabling proofs in very large, mostly empty trees'
      },
      {
        id: 'patricia_trees',
        name: 'Patricia Merkle Trees',
        difficulty: 'Expert',
        description: 'Combine tries and Merkle trees for key-value storage',
        useCase: 'Ethereum state storage and account management',
        benefit: 'Efficient insertion, deletion, and proof generation for key-value data',
        explanation: 'Radix tree structure with Merkle hashing for cryptographic proofs'
      },
      {
        id: 'inclusion_exclusion',
        name: 'Inclusion vs Exclusion Proofs',
        difficulty: 'Intermediate',
        description: 'Prove data is or isn\'t in a set',
        useCase: 'Proving account exists or doesn\'t exist in blockchain state',
        benefit: 'Mathematically prove absence of data, not just presence',
        explanation: 'Inclusion proves membership; exclusion proves non-membership using sorted trees'
      },
      {
        id: 'merkle_dag',
        name: 'Merkle DAGs',
        difficulty: 'Advanced',
        description: 'Directed Acyclic Graphs with Merkle properties',
        useCase: 'IPFS content addressing and Git version control',
        benefit: 'Handle complex relationships between data objects',
        explanation: 'Generalize Merkle trees to graphs, enabling deduplication and complex linking'
      },
      {
        id: 'authenticated_structures',
        name: 'Authenticated Data Structures',
        difficulty: 'Advanced',
        description: 'Data structures that can prove their contents are authentic',
        useCase: 'Verifiable databases and audit logs',
        benefit: 'Trust data without trusting the source',
        explanation: 'Like a tamper-evident seal on any type of data container'
      }
    ];

    const exploreConcept = (concept) => {
      setSelectedAdvanced(concept);
      setCurrentConcept('detailed');
    };

    const completeConcept = (conceptId) => {
      setCompletedConcepts(prev => new Set([...prev, conceptId]));
      if (completedConcepts.size + 1 >= 3) {
        setCurrentConcept('mastery');
      }
    };

    return (
      <div className="advanced-concepts">
        <div className="concepts-header">
          <Cpu className="concepts-icon" size={48} />
          <h2>Advanced Merkle Concepts</h2>
          <p>Explore sophisticated applications and variations of Merkle trees</p>
      </div>

        {currentConcept === 'overview' && (
          <div className="concepts-overview">
            <div className="overview-intro">
              <h3>🚀 Beyond Basic Merkle Trees</h3>
              <p>Basic Merkle trees are just the beginning. Advanced variants and techniques enable even more sophisticated applications in distributed systems and cryptography.</p>
              
              <div className="complexity-warning">
                <div className="warning-box">
                  <Lightbulb size={24} />
                  <div>
                    <h4>Advanced Territory</h4>
                    <p>These concepts are used by protocol designers and distributed systems engineers. Understanding them gives you insight into cutting-edge technology.</p>
          </div>
                </div>
          </div>
        </div>

            <div className="concepts-grid">
              {advancedConcepts.map(concept => (
                <div 
                  key={concept.id}
                  className={`concept-card ${completedConcepts.has(concept.id) ? 'completed' : ''}`}
                  onClick={() => exploreConcept(concept)}
                >
                  <div className="concept-header">
                    <h4>{concept.name}</h4>
                    <span className={`difficulty ${concept.difficulty.toLowerCase()}`}>
                      {concept.difficulty}
                    </span>
          </div>
                  
                  <p>{concept.description}</p>
                  
                  <div className="concept-details">
                    <div><strong>Use Case:</strong> {concept.useCase}</div>
                    <div><strong>Benefit:</strong> {concept.benefit}</div>
        </div>

                  {completedConcepts.has(concept.id) && (
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

        {currentConcept === 'detailed' && selectedAdvanced && (
          <div className="concept-detailed">
            <div className="detailed-header">
              <h3>🔍 Deep Dive: {selectedAdvanced.name}</h3>
              <span className={`difficulty-badge ${selectedAdvanced.difficulty.toLowerCase()}`}>
                {selectedAdvanced.difficulty}
              </span>
          </div>

            <div className="concept-breakdown">
              <div className="description-section">
                <h4>📋 What It Is</h4>
                <div className="description-box">
                  {selectedAdvanced.description}
          </div>
        </div>

              <div className="explanation-section">
                <h4>⚙️ How It Works</h4>
                <div className="explanation-box">
                  {selectedAdvanced.explanation}
          </div>
              </div>

              <div className="application-section">
                <h4>🎯 Real-World Application</h4>
                <div className="application-box">
                  {selectedAdvanced.useCase}
          </div>
        </div>

              <div className="benefit-section">
                <h4>✅ Key Advantage</h4>
                <div className="benefit-box">
                  {selectedAdvanced.benefit}
          </div>
          </div>
        </div>

            {selectedAdvanced.id === 'sparse_trees' && (
              <div className="sparse-example">
                <h4>💡 Sparse Tree Example</h4>
                <div className="example-explanation">
                  <p>Imagine Ethereum's account tree:</p>
                  <ul>
                    <li>2^160 possible addresses (more than atoms in the observable universe)</li>
                    <li>Only ~100 million addresses actually used</li>
                    <li>Sparse Merkle trees use default hashes for empty positions</li>
                    <li>Proof size stays constant (~160 hashes) regardless of sparsity</li>
                  </ul>
      </div>
              </div>
            )}

            {selectedAdvanced.id === 'merkle_dag' && (
              <div className="dag-example">
                <h4>💡 Merkle DAG Example</h4>
                <div className="example-explanation">
                  <p>IPFS uses Merkle DAGs to:</p>
                  <ul>
                    <li>Allow files to reference other files</li>
                    <li>Enable deduplication (same content, same hash)</li>
                    <li>Create web-like structures of linked content</li>
                    <li>Maintain all Merkle tree verification properties</li>
                  </ul>
      </div>
              </div>
            )}

            <div className="understanding-check">
              <h4>🤔 Understanding Check</h4>
              <p>What makes this concept more powerful than basic Merkle trees?</p>
              <div className="check-options">
                <div 
                  className="check-option"
                  onClick={() => completeConcept(selectedAdvanced.id)}
      >
                  It handles more complex data relationships and use cases
    </div>
                <div className="check-option">
                  It makes trees faster to build
                </div>
                <div className="check-option">
                  It reduces hash computation
                </div>
              </div>
            </div>

            <div className="detailed-controls">
              <ActionButton onClick={() => setCurrentConcept('overview')}>
                ← Explore Other Concepts
              </ActionButton>
      </div>
          </div>
        )}

        {currentConcept === 'mastery' && (
          <div className="concepts-mastery">
            <div className="mastery-celebration">
              <CheckCircle size={64} className="success-icon" />
              <h3>🎉 Advanced Merkle Mastery!</h3>
              <p>You've explored the cutting edge of Merkle tree technology and understand how they power modern distributed systems.</p>
        </div>

            <div className="mastery-insights">
              <h4>🧠 Advanced Insights Gained</h4>
              <div className="insight-grid">
                <div className="insight-item">
                  <TreePine size={32} />
                  <h5>Tree Variants</h5>
                  <p>Different tree structures solve different problems</p>
        </div>
                <div className="insight-item">
                  <Network size={32} />
                  <h5>Complex Systems</h5>
                  <p>Merkle principles scale to any data structure</p>
        </div>
                <div className="insight-item">
                  <Zap size={32} />
                  <h5>Optimization</h5>
                  <p>Advanced techniques optimize for specific use cases</p>
        </div>
      </div>
      </div>

            <div className="learning-journey">
              <h4>🎯 Your Merkle Tree Journey</h4>
              <div className="journey-summary">
                <div className="journey-step completed">
                  <CheckCircle size={20} />
                  <span>Basic tree construction</span>
                </div>
                <div className="journey-step completed">
                  <CheckCircle size={20} />
                  <span>Proof verification</span>
                </div>
                <div className="journey-step completed">
                  <CheckCircle size={20} />
                  <span>Bitcoin integration</span>
                </div>
                <div className="journey-step completed">
                  <CheckCircle size={20} />
                  <span>Real-world applications</span>
                </div>
                <div className="journey-step completed">
                  <CheckCircle size={20} />
                  <span>Advanced concepts</span>
                </div>
        </div>
      </div>

            <div className="next-steps">
              <h4>🚀 What's Next?</h4>
              <p>You now understand how Merkle trees enable efficient verification at scale. This knowledge applies to:</p>
              <ul>
                <li>Designing distributed systems</li>
                <li>Building blockchain applications</li>
                <li>Creating verifiable databases</li>
                <li>Optimizing data synchronization</li>
              </ul>
            </div>

            <ContinueButton onClick={handleContinue}>
              Complete Merkle Module →
      </ContinueButton>
          </div>
        )}
    </div>
  );
  }

  return (
    <div className="module-container merkle-module">
      <div className="module-header">
        <div className="header-content">
          <TreePine className="module-icon" size={48} />
          <div className="header-text">
            <h1>Merkle Trees</h1>
            <p>Learn how tree structures enable efficient verification of massive datasets</p>
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
            Step {currentStep + 1} of {merkleSteps.length}
          </span>
        </div>
      </div>

      <div className="module-navigation">
        {merkleSteps.map((step, index) => (
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
        
        {currentStep === merkleSteps.length - 1 && completedSteps.has(currentStep) && (
          <NavigationButton 
            onClick={() => navigate('/module/custody')}
            variant="primary"
          >
            Next Module: Custody
            <ArrowRight size={20} />
          </NavigationButton>
        )}
      </div>
    </div>
  );
};

export default MerkleModule; 