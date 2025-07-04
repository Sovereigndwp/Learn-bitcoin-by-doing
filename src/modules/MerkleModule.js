import React, { useState, useEffect } from 'react';
import { useProgress } from '../contexts/ProgressContext';
import { TreePine, Hash, Search, CheckCircle, Trophy, Layers, Target, Zap, Code, FileTree, ArrowDown, Plus } from 'lucide-react';
import { hash256 } from '../utils/bitcoin';
import './MerkleModule.css';

const MerkleModule = () => {
  const { completeModule, isModuleCompleted } = useProgress();
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(new Set());
  const [customTransactions, setCustomTransactions] = useState([
    'Alice sends 1 BTC to Bob',
    'Charlie sends 0.5 BTC to David',
    'Eve sends 2 BTC to Frank',
    'Grace sends 0.3 BTC to Henry'
  ]);
  const [proofStep, setProofStep] = useState(0);
  const [selectedTransaction, setSelectedTransaction] = useState(0);

  const steps = [
    {
      id: 'merkle-intro',
      title: 'What Are Merkle Trees?',
      icon: <TreePine className="w-6 h-6" />,
      component: 'merkle-intro'
    },
    {
      id: 'tree-structure',
      title: 'Building Trees',
      icon: <Layers className="w-6 h-6" />,
      component: 'tree-structure'
    },
    {
      id: 'tree-builder',
      title: 'Interactive Tree Builder',
      icon: <Plus className="w-6 h-6" />,
      component: 'tree-builder'
    },
    {
      id: 'proof-verification',
      title: 'Proof Verification',
      icon: <Search className="w-6 h-6" />,
      component: 'proof-verification'
    },
    {
      id: 'bitcoin-blocks',
      title: 'Bitcoin Block Integration',
      icon: <Hash className="w-6 h-6" />,
      component: 'bitcoin-blocks'
    },
    {
      id: 'scalability',
      title: 'Scalability Benefits',
      icon: <Target className="w-6 h-6" />,
      component: 'scalability'
    },
    {
      id: 'real-world',
      title: 'Real-World Applications',
      icon: <Zap className="w-6 h-6" />,
      component: 'real-world'
    },
    {
      id: 'completion',
      title: 'Merkle Master',
      icon: <Trophy className="w-6 h-6" />,
      component: 'completion'
    }
  ];

  const handleStepComplete = (stepIndex) => {
    const newCompleted = new Set(completedSteps);
    newCompleted.add(stepIndex);
    setCompletedSteps(newCompleted);
    
    // Show achievement for key milestones
    if (stepIndex === 1) {
      showAchievement("Tree Architect", "You understand how data structures create efficiency!");
    } else if (stepIndex === 3) {
      showAchievement("Proof Master", "You can verify data without downloading everything!");
    } else if (stepIndex === 5) {
      showAchievement("Scalability Visionary", "You see how Bitcoin handles millions of transactions!");
    } else if (stepIndex === 7) {
      showAchievement("Merkle Master", "You've mastered Bitcoin's most elegant data structure!");
    }
    
    // Auto-advance to next step
    if (stepIndex < steps.length - 1) {
      setTimeout(() => {
        setCurrentStep(stepIndex + 1);
      }, 500);
    }
    
    if (newCompleted.size === steps.length) {
      completeModule('merkle');
    }
  };

  const showAchievement = (title, description) => {
    const achievement = document.createElement('div');
    achievement.className = 'achievement-popup';
    achievement.innerHTML = `
      <div class="achievement-content">
        <div class="achievement-icon">🏆</div>
        <div class="achievement-text">
          <h4>${title}</h4>
          <p>${description}</p>
        </div>
      </div>
    `;
    document.body.appendChild(achievement);
    
    setTimeout(() => {
      achievement.style.opacity = '0';
      setTimeout(() => {
        document.body.removeChild(achievement);
      }, 300);
    }, 3000);
  };

  const progressPercentage = ((currentStep + 1) / steps.length) * 100;

  // Merkle Tree Building Logic
  const buildMerkleTree = (transactions) => {
    if (transactions.length === 0) return [];
    
    const levels = [];
    let currentLevel = transactions.map(tx => hash256(tx).substring(0, 8) + '...');
    levels.push([...currentLevel]);
    
    while (currentLevel.length > 1) {
      const nextLevel = [];
      for (let i = 0; i < currentLevel.length; i += 2) {
        const left = currentLevel[i];
        const right = currentLevel[i + 1] || left; // Duplicate if odd number
        const combined = hash256(left + right).substring(0, 8) + '...';
        nextLevel.push(combined);
      }
      currentLevel = nextLevel;
      levels.push([...currentLevel]);
    }
    
    return levels;
  };

  const getMerkleProof = (transactions, targetIndex) => {
    const proof = [];
    let currentLevel = transactions.map(tx => hash256(tx));
    let currentIndex = targetIndex;
    
    while (currentLevel.length > 1) {
      const nextLevel = [];
      for (let i = 0; i < currentLevel.length; i += 2) {
        const left = currentLevel[i];
        const right = currentLevel[i + 1] || left;
        
        if (i === currentIndex || i + 1 === currentIndex) {
          const siblingIndex = (currentIndex % 2 === 0) ? currentIndex + 1 : currentIndex - 1;
          const sibling = currentLevel[siblingIndex] || left;
          proof.push({
            hash: sibling.substring(0, 8) + '...',
            position: currentIndex % 2 === 0 ? 'right' : 'left'
          });
        }
        
        nextLevel.push(hash256(left + right));
      }
      currentLevel = nextLevel;
      currentIndex = Math.floor(currentIndex / 2);
    }
    
    return proof;
  };

  const renderMerkleIntro = () => (
    <div className="merkle-intro">
      <div className="intro-header">
        <h2>🌳 Nature's Filing System in Digital Form</h2>
        <div className="subtitle">How Bitcoin organizes millions of transactions with mathematical elegance</div>
        <div className="prime-text">
          Imagine a tree where every branch helps you instantly verify any leaf exists, without checking all the other leaves. That's the power of Merkle trees.
        </div>
      </div>

      <div className="tree-concepts">
        <h3>Core Concepts</h3>
        <div className="concepts-grid">
          <div className="concept-card">
            <span className="concept-icon">🌿</span>
            <h3>Leaves (Transactions)</h3>
            <div className="concept-description">
              Each transaction is a leaf. In Bitcoin, a block can contain thousands of these transaction leaves.
            </div>
          </div>
          
          <div className="concept-card">
            <span className="concept-icon">🌿</span>
            <h3>Branches (Hash Pairs)</h3>
            <div className="concept-description">
              Every two leaves are combined and hashed to create a branch. This process continues up the tree.
            </div>
          </div>
          
          <div className="concept-card">
            <span className="concept-icon">🌳</span>
            <h3>Root (Single Hash)</h3>
            <div className="concept-description">
              All transactions eventually combine into one root hash that represents the entire set of data.
            </div>
          </div>
          
          <div className="concept-card">
            <span className="concept-icon">🔍</span>
            <h3>Proof (Efficient Verification)</h3>
            <div className="concept-description">
              You can prove a transaction exists by providing just a few hashes—not all transactions.
            </div>
          </div>
        </div>
      </div>

      <div className="prime-text">
        🚀 This elegant structure is why light clients can verify Bitcoin transactions without downloading the entire blockchain.
      </div>

      <button 
        className="continue-button"
        onClick={() => handleStepComplete(0)}
      >
        Build Your First Tree
      </button>
    </div>
  );

  const renderTreeStructure = () => {
    const transactions = ['TX1: Alice→Bob', 'TX2: Charlie→David', 'TX3: Eve→Frank', 'TX4: Grace→Henry'];
    const merkleTree = buildMerkleTree(transactions);
    
    return (
      <div className="tree-structure">
        <div className="intro-header">
          <h2>🏗️ From Transactions to Tree</h2>
          <div className="subtitle">Watch how individual transactions become an organized data structure</div>
        </div>

        <div className="tree-visualization">
          <div className="tree-container">
            {merkleTree.map((level, levelIndex) => (
              <div key={levelIndex} className="tree-level">
                <div className="level-label">
                  {levelIndex === 0 ? 'Transactions (Leaves)' : 
                   levelIndex === merkleTree.length - 1 ? 'Merkle Root' : 
                   `Level ${levelIndex}`}
                </div>
                <div className="level-nodes">
                  {level.map((node, nodeIndex) => (
                    <div key={nodeIndex} className="tree-node">
                      {levelIndex === 0 ? transactions[nodeIndex] : node}
                    </div>
                  ))}
                </div>
                {levelIndex < merkleTree.length - 1 && (
                  <div style={{ textAlign: 'center', margin: '1rem 0', color: '#10b981' }}>
                    <ArrowDown size={24} />
                    <div style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>Hash pairs together</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="tree-explanation">
          <h3>🔢 The Process</h3>
          <ol style={{ color: '#d1fae5', lineHeight: '1.8' }}>
            <li><strong>Hash each transaction</strong> - Every transaction gets a unique SHA-256 fingerprint</li>
            <li><strong>Pair and hash</strong> - Take pairs of hashes and combine them into new hashes</li>
            <li><strong>Continue upward</strong> - Keep pairing until you reach a single root hash</li>
            <li><strong>Store the root</strong> - This single hash represents all transactions in the block</li>
          </ol>
        </div>

        <button 
          className="continue-button"
          onClick={() => handleStepComplete(1)}
        >
          Try Building Your Own
        </button>
      </div>
    );
  };

  const renderTreeBuilder = () => {
    const merkleTree = buildMerkleTree(customTransactions);
    
    const addTransaction = () => {
      const newTx = `TX${customTransactions.length + 1}: User sends BTC`;
      setCustomTransactions([...customTransactions, newTx]);
    };

    const updateTransaction = (index, value) => {
      const updated = [...customTransactions];
      updated[index] = value;
      setCustomTransactions(updated);
    };

    return (
      <div className="tree-builder">
        <div className="intro-header">
          <h2>🛠️ Interactive Tree Builder</h2>
          <div className="subtitle">Create your own Merkle tree and see how changes propagate</div>
        </div>

        <div className="builder-container">
          <h3>Your Transactions</h3>
          <div className="transaction-input">
            {customTransactions.map((tx, index) => (
              <div key={index} className="input-group">
                <label className="input-label">Transaction {index + 1}</label>
                <input
                  type="text"
                  className="transaction-field"
                  value={tx}
                  onChange={(e) => updateTransaction(index, e.target.value)}
                  placeholder={`Transaction ${index + 1}`}
                />
              </div>
            ))}
          </div>
          
          <button className="add-transaction" onClick={addTransaction}>
            <Plus size={16} />
            Add Transaction
          </button>
        </div>

        <div className="tree-visualization">
          <h3>Your Merkle Tree</h3>
          <div className="tree-container">
            {merkleTree.map((level, levelIndex) => (
              <div key={levelIndex} className="tree-level">
                <div className="level-label">
                  {levelIndex === 0 ? `Transactions (${level.length})` : 
                   levelIndex === merkleTree.length - 1 ? 'Merkle Root' : 
                   `Level ${levelIndex}`}
                </div>
                <div className="level-nodes">
                  {level.map((node, nodeIndex) => (
                    <div key={nodeIndex} className="tree-node">
                      {levelIndex === 0 ? customTransactions[nodeIndex] : node}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="prime-text">
          💡 Try changing a transaction above and watch how the entire tree structure updates! This is why Bitcoin blocks are tamper-evident.
        </div>

        <button 
          className="continue-button"
          onClick={() => handleStepComplete(2)}
        >
          Learn About Proofs
        </button>
      </div>
    );
  };

  const renderProofVerification = () => {
    const proof = getMerkleProof(customTransactions, selectedTransaction);
    
    return (
      <div className="proof-verification">
        <div className="intro-header">
          <h2>🔍 Merkle Proof Magic</h2>
          <div className="subtitle">Verify any transaction without downloading the entire block</div>
        </div>

        <div className="verification-demo">
          <h3>Choose a Transaction to Verify</h3>
          <select 
            value={selectedTransaction}
            onChange={(e) => setSelectedTransaction(parseInt(e.target.value))}
            style={{
              background: 'rgba(0, 0, 0, 0.5)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              borderRadius: '6px',
              padding: '0.75rem',
              color: '#fff',
              marginBottom: '2rem'
            }}
          >
            {customTransactions.map((tx, index) => (
              <option key={index} value={index} style={{ background: '#1f2937' }}>
                {tx}
              </option>
            ))}
          </select>

          <h3>Merkle Proof Process</h3>
          <div className="verification-steps">
            <div className={`verification-step ${proofStep >= 0 ? 'active' : ''}`}>
              <div className="step-number">1</div>
              <div className="step-title">Start with Transaction</div>
              <div className="step-description">
                Begin with the transaction you want to prove: "{customTransactions[selectedTransaction]}"
              </div>
            </div>
            
            <div className={`verification-step ${proofStep >= 1 ? 'active' : ''}`}>
              <div className="step-number">2</div>
              <div className="step-title">Collect Sibling Hashes</div>
              <div className="step-description">
                Gather the minimal set of hashes needed to reconstruct the path to the root
              </div>
            </div>
            
            <div className={`verification-step ${proofStep >= 2 ? 'active' : ''}`}>
              <div className="step-number">3</div>
              <div className="step-title">Calculate Root</div>
              <div className="step-description">
                Use the proof hashes to recalculate what the Merkle root should be
              </div>
            </div>
            
            <div className={`verification-step ${proofStep >= 3 ? 'active' : ''}`}>
              <div className="step-number">4</div>
              <div className="step-title">Compare & Verify</div>
              <div className="step-description">
                If your calculated root matches the known root, the transaction is verified!
              </div>
            </div>
          </div>

          <div className="proof-details">
            <h4>Proof for "{customTransactions[selectedTransaction]}"</h4>
            <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '1rem', borderRadius: '8px', margin: '1rem 0' }}>
              <strong>Required Proof Hashes:</strong>
              {proof.map((item, index) => (
                <div key={index} style={{ margin: '0.5rem 0', fontFamily: 'monospace', fontSize: '0.9rem' }}>
                  {index + 1}. {item.hash} (position: {item.position})
                </div>
              ))}
            </div>
            <div style={{ color: '#10b981', fontWeight: 'bold' }}>
              Proof size: {proof.length} hashes vs {customTransactions.length} total transactions
            </div>
          </div>

          <button 
            className="demo-button"
            onClick={() => setProofStep(Math.min(proofStep + 1, 3))}
            disabled={proofStep >= 3}
          >
            {proofStep < 3 ? 'Next Step' : 'Proof Complete'}
          </button>
        </div>

        <div className="prime-text">
          🎯 This is how SPV (Simple Payment Verification) wallets work—they can verify transactions without storing the entire blockchain!
        </div>

        <button 
          className="continue-button"
          onClick={() => handleStepComplete(3)}
        >
          See Bitcoin Integration
        </button>
      </div>
    );
  };

  const renderBitcoinBlocks = () => (
    <div className="bitcoin-blocks">
      <div className="intro-header">
        <h2>⛓️ Bitcoin Block Integration</h2>
        <div className="subtitle">How Merkle trees fit into Bitcoin's block structure</div>
      </div>

      <div className="block-construction">
        <div className="block-builder">
          <h3>Bitcoin Block Structure</h3>
          <div className="block-header">
            <div className="header-field">
              <span className="field-label">Block Version</span>
              <span className="field-value">1</span>
            </div>
            <div className="header-field">
              <span className="field-label">Previous Block Hash</span>
              <span className="field-value">000000000019d6689c085ae165831e93...</span>
            </div>
            <div className="header-field">
              <span className="field-label">Merkle Root</span>
              <span className="field-value" style={{ background: 'rgba(16, 185, 129, 0.2)', padding: '0.25rem', borderRadius: '4px' }}>
                4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b
              </span>
            </div>
            <div className="header-field">
              <span className="field-label">Timestamp</span>
              <span className="field-value">1231006505</span>
            </div>
            <div className="header-field">
              <span className="field-label">Difficulty Target</span>
              <span className="field-value">1d00ffff</span>
            </div>
            <div className="header-field">
              <span className="field-label">Nonce</span>
              <span className="field-value">2083236893</span>
            </div>
          </div>

          <div style={{ textAlign: 'center', margin: '2rem 0' }}>
            <ArrowDown size={32} color="#10b981" />
            <div style={{ color: '#10b981', fontWeight: 'bold', marginTop: '0.5rem' }}>
              Block header gets hashed for mining
            </div>
          </div>

          <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '1.5rem', borderRadius: '8px', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
            <h4 style={{ color: '#10b981', marginBottom: '1rem' }}>Why Merkle Root in Header?</h4>
            <ul style={{ color: '#d1fae5', lineHeight: '1.8' }}>
              <li><strong>Integrity</strong> - Any change to transactions changes the root</li>
              <li><strong>Efficiency</strong> - Header is only 80 bytes vs potentially megabytes of transactions</li>
              <li><strong>SPV</strong> - Light clients can verify without full transaction data</li>
              <li><strong>Mining</strong> - Miners commit to all transactions with one hash</li>
            </ul>
          </div>
        </div>
      </div>

      <button 
        className="continue-button"
        onClick={() => handleStepComplete(4)}
      >
        Explore Scalability
      </button>
    </div>
  );

  const renderScalability = () => (
    <div className="scalability-demo">
      <div className="intro-header">
        <h2>📈 Scalability Superpowers</h2>
        <div className="subtitle">How Merkle trees make Bitcoin efficient at any scale</div>
      </div>

      <div className="comparison-grid">
        <div className="comparison-card">
          <div className="comparison-title">🐌 Linear Verification</div>
          <div className="comparison-stats">
            <div className="stat-item">
              <span className="stat-label">1,000 transactions</span>
              <span className="stat-value">1,000 checks</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">10,000 transactions</span>
              <span className="stat-value">10,000 checks</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">100,000 transactions</span>
              <span className="stat-value">100,000 checks</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">1,000,000 transactions</span>
              <span className="stat-value">1,000,000 checks</span>
            </div>
          </div>
          <div style={{ marginTop: '1rem', color: '#ef4444', fontWeight: 'bold' }}>
            O(n) - Gets slower with every transaction
          </div>
        </div>

        <div className="comparison-card">
          <div className="comparison-title">🚀 Merkle Tree Verification</div>
          <div className="comparison-stats">
            <div className="stat-item">
              <span className="stat-label">1,000 transactions</span>
              <span className="stat-value">10 hashes</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">10,000 transactions</span>
              <span className="stat-value">14 hashes</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">100,000 transactions</span>
              <span className="stat-value">17 hashes</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">1,000,000 transactions</span>
              <span className="stat-value">20 hashes</span>
            </div>
          </div>
          <div style={{ marginTop: '1rem', color: '#10b981', fontWeight: 'bold' }}>
            O(log n) - Barely increases with scale
          </div>
        </div>
      </div>

      <div className="prime-text">
        🎯 This logarithmic scaling is why Bitcoin can handle massive blocks while still allowing efficient verification. A block with 1 million transactions only needs ~20 hashes for proof!
      </div>

      <div style={{ background: 'rgba(0, 0, 0, 0.2)', padding: '2rem', borderRadius: '12px', margin: '2rem 0' }}>
        <h3 style={{ color: '#10b981', marginBottom: '1rem' }}>Real Bitcoin Block Example</h3>
        <div style={{ color: '#d1fae5', lineHeight: '1.8' }}>
          <strong>Block #700,000</strong> (September 2021)<br/>
          📊 Transactions: 2,875<br/>
          🌳 Merkle proof size: 12 hashes<br/>
          💾 Full block size: 1.3 MB<br/>
          ⚡ Proof size: 384 bytes (99.97% reduction!)
        </div>
      </div>

      <button 
        className="continue-button"
        onClick={() => handleStepComplete(5)}
      >
        See Real-World Uses
      </button>
    </div>
  );

  const renderRealWorld = () => (
    <div className="real-world-apps">
      <div className="intro-header">
        <h2>🌍 Beyond Bitcoin: Merkle Trees Everywhere</h2>
        <div className="subtitle">How this elegant data structure powers modern technology</div>
      </div>

      <div className="app-examples">
        <div className="app-card">
          <div className="app-title">📱 Bitcoin SPV Wallets</div>
          <div className="app-description">
            Mobile Bitcoin wallets use Merkle proofs to verify payments without downloading the entire blockchain.
          </div>
          <div className="app-benefits">
            ✅ Verify transactions in seconds<br/>
            ✅ Use minimal storage and bandwidth<br/>
            ✅ Maintain full security guarantees
          </div>
        </div>

        <div className="app-card">
          <div className="app-title">📦 Git Version Control</div>
          <div className="app-description">
            Git uses Merkle trees to efficiently track changes in code repositories and verify data integrity.
          </div>
          <div className="app-benefits">
            ✅ Detect any corruption instantly<br/>
            ✅ Efficient syncing between developers<br/>
            ✅ Immutable commit history
          </div>
        </div>

        <div className="app-card">
          <div className="app-title">🌐 IPFS & BitTorrent</div>
          <div className="app-description">
            Distributed file systems use Merkle trees to verify file chunks without downloading entire files.
          </div>
          <div className="app-benefits">
            ✅ Content-addressable storage<br/>
            ✅ Efficient deduplication<br/>
            ✅ Verifiable distributed downloads
          </div>
        </div>

        <div className="app-card">
          <div className="app-title">🔗 Ethereum & Smart Contracts</div>
          <div className="app-description">
            Ethereum uses Merkle trees for transaction receipts, enabling efficient light client verification.
          </div>
          <div className="app-benefits">
            ✅ Verify smart contract execution<br/>
            ✅ Light client compatibility<br/>
            ✅ Efficient state transitions
          </div>
        </div>

        <div className="app-card">
          <div className="app-title">☁️ Cloud Storage Verification</div>
          <div className="app-description">
            Cloud providers use Merkle trees to prove data integrity without revealing file contents.
          </div>
          <div className="app-benefits">
            ✅ Detect silent corruption<br/>
            ✅ Privacy-preserving proofs<br/>
            ✅ Efficient backup verification
          </div>
        </div>

        <div className="app-card">
          <div className="app-title">🔒 Certificate Transparency</div>
          <div className="app-description">
            Web security systems use Merkle trees to create tamper-evident logs of SSL certificates.
          </div>
          <div className="app-benefits">
            ✅ Detect malicious certificates<br/>
            ✅ Public auditability<br/>
            ✅ Efficient log verification
          </div>
        </div>
      </div>

      <div className="prime-text">
        🚀 Merkle trees are the unsung heroes of modern technology—enabling trust, efficiency, and scale in distributed systems worldwide.
      </div>

      <button 
        className="continue-button"
        onClick={() => handleStepComplete(6)}
      >
        Complete Your Mastery
      </button>
    </div>
  );

  const renderCompletion = () => (
    <div className="completion-screen">
      <div className="completion-icon">
        <Trophy size={80} />
      </div>
      <h1>🌳 Merkle Tree Master!</h1>
      <div className="subtitle">You've mastered Bitcoin's most elegant data structure</div>

      <div className="completion-stats">
        <div className="stat">
          <span className="stat-number">8</span>
          <span className="stat-label">Concepts Mastered</span>
        </div>
        <div className="stat">
          <span className="stat-number">O(log n)</span>
          <span className="stat-label">Scalability Understanding</span>
        </div>
        <div className="stat">
          <span className="stat-number">99.97%</span>
          <span className="stat-label">Efficiency Gained</span>
        </div>
        <div className="stat">
          <span className="stat-number">∞</span>
          <span className="stat-label">Real-World Applications</span>
        </div>
      </div>

      <div className="prime-text">
        You now understand how Bitcoin efficiently organizes millions of transactions, enables light clients, and maintains security at scale. You've grasped one of computer science's most powerful data structures!
      </div>

      <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '2rem', borderRadius: '12px', margin: '2rem 0', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
        <h3 style={{ color: '#10b981', marginBottom: '1rem' }}>🏆 Achievements Unlocked</h3>
        <div style={{ color: '#d1fae5', lineHeight: '1.8' }}>
          🌳 <strong>Tree Architect</strong> - Understand data structure design<br/>
          🔍 <strong>Proof Master</strong> - Master efficient verification<br/>
          📈 <strong>Scalability Visionary</strong> - See logarithmic scaling benefits<br/>
          🌍 <strong>Application Expert</strong> - Recognize real-world implementations<br/>
          🎓 <strong>Merkle Master</strong> - Complete understanding of Bitcoin's data layer
        </div>
      </div>

      <button 
        className="continue-button"
        onClick={() => handleStepComplete(7)}
      >
        🎉 Celebrate Completion
      </button>
    </div>
  );

  const renderStepContent = () => {
    switch(steps[currentStep]?.component) {
      case 'merkle-intro': return renderMerkleIntro();
      case 'tree-structure': return renderTreeStructure();
      case 'tree-builder': return renderTreeBuilder();
      case 'proof-verification': return renderProofVerification();
      case 'bitcoin-blocks': return renderBitcoinBlocks();
      case 'scalability': return renderScalability();
      case 'real-world': return renderRealWorld();
      case 'completion': return renderCompletion();
      default: return renderMerkleIntro();
    }
  };

  return (
    <div className="merkle-module">
      <div className="module-header">
        <h1 className="module-title">
          <TreePine className="module-icon" size={40} />
          Merkle Trees: Bitcoin's Efficient Data Structure
        </h1>
        <div className="module-progress">
          <div>Step {currentStep + 1} of {steps.length}</div>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>

      <div className="module-tabs">
        {steps.map((step, index) => (
          <div
            key={step.id}
            className={`tab ${currentStep === index ? 'active' : ''} ${completedSteps.has(index) ? 'completed' : ''}`}
            onClick={() => setCurrentStep(index)}
          >
            {step.icon}
            <span>{step.title}</span>
            {completedSteps.has(index) && <CheckCircle size={16} />}
          </div>
        ))}
      </div>

      <div className="step-content-container">
        {renderStepContent()}
      </div>
    </div>
  );
};

export default MerkleModule; 