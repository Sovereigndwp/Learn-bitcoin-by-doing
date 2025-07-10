import React, { useState, useEffect } from 'react';
import { useProgress } from '../contexts/ProgressContext';
import { Coins, ArrowRight, DollarSign, Shield, Code, Zap, Trophy, CheckCircle } from 'lucide-react';
import { 
  ContinueButton, 
  ActionButton, 
  Button, 
  OptionButton,
  NavigationButton 
} from '../components/EnhancedButtons';
import './TransactionsModule.css';

const TransactionsModule = () => {
  const { completeModule, isModuleCompleted } = useProgress();
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(new Set());
  const [selectedUTXOs, setSelectedUTXOs] = useState(new Set());
  const [transactionAmount, setTransactionAmount] = useState(0.5);
  const [feeRate, setFeeRate] = useState(5);
  const [mempoolDemo, setMempoolDemo] = useState(false);

  const steps = [
    {
      id: 'utxo-intro',
      title: 'What Are UTXOs?',
      icon: <Coins className="w-6 h-6" />,
      component: 'utxo-intro'
    },
    {
      id: 'transaction-building',
      title: 'Building Transactions',
      icon: <ArrowRight className="w-6 h-6" />,
      component: 'transaction-building'
    },
    {
      id: 'fee-market',
      title: 'The Fee Market',
      icon: <DollarSign className="w-6 h-6" />,
      component: 'fee-market'
    },
    {
      id: 'privacy-concepts',
      title: 'Transaction Privacy',
      icon: <Shield className="w-6 h-6" />,
      component: 'privacy-concepts'
    },
    {
      id: 'script-types',
      title: 'Script Types',
      icon: <Code className="w-6 h-6" />,
      component: 'script-types'
    },
    {
      id: 'mempool-visualization',
      title: 'The Mempool',
      icon: <Zap className="w-6 h-6" />,
      component: 'mempool-visualization'
    },
    {
      id: 'lightning-preview',
      title: 'Lightning Network',
      icon: <Zap className="w-6 h-6" />,
      component: 'lightning-preview'
    },
    {
      id: 'completion',
      title: 'Transaction Mastery',
      icon: <Trophy className="w-6 h-6" />,
      component: 'completion'
    }
  ];

  const mockUTXOs = [
    { id: 1, amount: 0.5, confirmations: 6, source: 'Previous purchase' },
    { id: 2, amount: 0.3, confirmations: 12, source: 'Mining reward' },
    { id: 3, amount: 0.8, confirmations: 3, source: 'Friend payment' },
    { id: 4, amount: 0.1, confirmations: 20, source: 'Change output' },
    { id: 5, amount: 1.2, confirmations: 8, source: 'Exchange withdrawal' }
  ];

  useEffect(() => {
    if (currentStep === steps.length - 1 && !isModuleCompleted('transactions')) {
      completeModule('transactions');
      showAchievement('Transaction Master', 'You understand how Bitcoin moves around the world!');
    }
  }, [currentStep, completeModule, isModuleCompleted]);

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
        if (document.body.contains(achievement)) {
          document.body.removeChild(achievement);
        }
      }, 300);
    }, 3000);
  };

  const handleStepComplete = (stepIndex) => {
    setCompletedSteps(prev => new Set([...prev, stepIndex]));
    if (stepIndex === 0) showAchievement('UTXO Explorer', 'You understand the building blocks of Bitcoin!');
    if (stepIndex === 1) showAchievement('Transaction Builder', 'You can construct valid Bitcoin transactions!');
    if (stepIndex === 2) showAchievement('Fee Market Navigator', 'You understand transaction prioritization!');
    if (stepIndex === 3) showAchievement('Privacy Advocate', 'You know how to transact privately!');
    if (stepIndex === 4) showAchievement('Script Scholar', 'You understand programmable money!');
    if (stepIndex === 5) showAchievement('Mempool Master', 'You can read the network\'s pulse!');
    if (stepIndex === 6) showAchievement('Lightning Explorer', 'You see Bitcoin\'s future scaling!');
  };

  const handleContinue = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
      handleStepComplete(currentStep);
    }
  };

  const handleUTXOSelect = (utxoId) => {
    const newSelected = new Set(selectedUTXOs);
    if (newSelected.has(utxoId)) {
      newSelected.delete(utxoId);
    } else {
      newSelected.add(utxoId);
    }
    setSelectedUTXOs(newSelected);
  };

  const calculateTotalSelected = () => {
    return mockUTXOs
      .filter(utxo => selectedUTXOs.has(utxo.id))
      .reduce((sum, utxo) => sum + utxo.amount, 0);
  };

  const getFeeCategory = (rate) => {
    if (rate <= 2) return { category: 'low', time: '1-2 hours', color: '#ef4444' };
    if (rate <= 10) return { category: 'medium', time: '10-30 minutes', color: '#f59e0b' };
    return { category: 'high', time: '1-3 blocks', color: '#10b981' };
  };

  const progressPercentage = ((currentStep + 1) / steps.length) * 100;

  const renderUTXOIntro = () => (
    <div className="utxo-intro">
      <div className="intro-header">
        <h2>🪙 Meet UTXOs</h2>
        <p className="subtitle">Unspent Transaction Outputs - Bitcoin's Digital Cash</p>
        <div className="prime-text">
          💡 Unlike bank accounts, Bitcoin doesn't have balances. Instead, it tracks individual "coins" called UTXOs. Think of them as digital cash bills in your wallet.
        </div>
      </div>
      
      <div className="utxo-concepts">
        <h3>🔍 Key Concepts</h3>
        <div className="concepts-grid">
          <div className="concept-card">
            <span className="concept-icon">🎯</span>
            <h3>Unspent Outputs</h3>
            <p className="concept-description">
              Each UTXO is like a digital coin that can only be spent once. When you spend it, it's gone forever, but new UTXOs are created.
            </p>
          </div>
          <div className="concept-card">
            <span className="concept-icon">🔗</span>
            <h3>Transaction Chains</h3>
            <p className="concept-description">
              Every UTXO has a history. It was created by a previous transaction, linking all Bitcoin movements in an unbroken chain.
            </p>
          </div>
          <div className="concept-card">
            <span className="concept-icon">💰</span>
            <h3>Your Wallet Balance</h3>
            <p className="concept-description">
              Your wallet balance is the sum of all UTXOs you control. Each one requires your private key to spend.
            </p>
          </div>
          <div className="concept-card">
            <span className="concept-icon">⚡</span>
            <h3>Efficient Verification</h3>
            <p className="concept-description">
              UTXOs make Bitcoin fast to verify. Each transaction only needs to check that inputs exist and signatures are valid.
            </p>
          </div>
        </div>
      </div>

      <div className="prime-text">
        🎯 Ready to see how UTXOs work in practice? Let's build a transaction together!
      </div>
    </div>
  );

  const renderTransactionBuilding = () => (
    <div className="transaction-builder">
      <div className="intro-header">
        <h2>🔨 Building Transactions</h2>
        <p className="subtitle">Combine UTXOs to Create New Payments</p>
        </div>

      <div className="utxo-pool">
        <h3>Your Available UTXOs</h3>
        <div className="utxo-grid">
          {mockUTXOs.map(utxo => (
            <div 
              key={utxo.id}
              className={`utxo-box ${selectedUTXOs.has(utxo.id) ? 'selected' : ''}`}
              onClick={() => handleUTXOSelect(utxo.id)}
            >
              <div className="utxo-amount">{utxo.amount} BTC</div>
              <div className="utxo-confirmations">{utxo.confirmations} confirmations</div>
              <div style={{ fontSize: '0.8rem', color: '#bfdbfe', marginTop: '0.5rem' }}>
                {utxo.source}
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', margin: '1rem 0', color: '#3b82f6', fontWeight: 'bold' }}>
          Selected: {calculateTotalSelected().toFixed(8)} BTC
        </div>
        </div>

      <div className="transaction-flow">
        <h3>🔄 Transaction Flow</h3>
        <div className="flow-container">
          <div className="flow-section">
            <div className="flow-header">Inputs (UTXOs)</div>
            <div className="flow-content">
              {selectedUTXOs.size > 0 ? (
                <div>
                  <div>{selectedUTXOs.size} UTXOs selected</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#10b981' }}>
                    {calculateTotalSelected().toFixed(8)} BTC
                  </div>
                </div>
              ) : (
                <div style={{ color: '#6b7280' }}>Select UTXOs above</div>
              )}
            </div>
          </div>
          
          <div className="flow-arrow">→</div>
          
          <div className="flow-section">
            <div className="flow-header">Outputs</div>
            <div className="flow-content">
              <div>
                <div>Payment: {transactionAmount} BTC</div>
                <div>Change: {Math.max(0, calculateTotalSelected() - transactionAmount - 0.0001).toFixed(8)} BTC</div>
                <div style={{ fontSize: '0.9rem', color: '#f59e0b' }}>Fee: 0.0001 BTC</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="builder-controls">
        <h4>Adjust Payment Amount</h4>
        <div className="form-group">
          <label className="form-label">Amount to Send (BTC)</label>
          <input
            type="number"
            className="form-input"
            value={transactionAmount}
            onChange={(e) => setTransactionAmount(parseFloat(e.target.value) || 0)}
            min="0"
            max={calculateTotalSelected()}
            step="0.001"
          />
        </div>
        
        {calculateTotalSelected() >= transactionAmount + 0.0001 && selectedUTXOs.size > 0 && (
          <div style={{ 
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(5, 150, 105, 0.2) 100%)',
            border: '1px solid rgba(16, 185, 129, 0.4)',
            borderRadius: '8px',
            padding: '1rem',
            marginTop: '1rem',
            textAlign: 'center'
          }}>
            ✅ Valid transaction! Ready to broadcast to the network.
          </div>
        )}
      </div>
    </div>
  );

  const renderFeeMarket = () => {
    const feeInfo = getFeeCategory(feeRate);
    
    return (
      <div className="fee-market">
        <div className="intro-header">
          <h2>💸 The Fee Market</h2>
          <p className="subtitle">Priority Auction for Block Space</p>
          <div className="prime-text">
            💡 Bitcoin blocks have limited space. When demand is high, users bid with higher fees to get their transactions confirmed faster.
          </div>
        </div>

        <div className="fee-controls">
          <h3>Fee Rate Simulator</h3>
          <div className="fee-slider-container">
            <label className="form-label">Fee Rate: {feeRate} sats/byte</label>
            <input
              type="range"
              className="fee-slider"
              min="1"
              max="50"
              value={feeRate}
              onChange={(e) => setFeeRate(parseInt(e.target.value))}
            />
          </div>
          
          <div className="fee-display">
            <div className="fee-category">
              <div className="fee-label">Current Selection</div>
              <div className={`fee-value ${feeInfo.category}`} style={{ color: feeInfo.color }}>
                {feeRate} sats/byte
              </div>
              <div className="confirmation-time">{feeInfo.time}</div>
            </div>
          </div>
        </div>

        <div className="mempool-viz">
          <h3>📊 Current Mempool</h3>
          <div className="mempool-container">
            <div className="mempool-layers">
              <div className="mempool-layer">
                <div className="layer-info">
                  <div className="layer-fee">1-5 sats/byte</div>
                  <div className="layer-count">2,847 transactions</div>
                </div>
                <div className="layer-bar">
                  <div className="layer-fill low" style={{ width: '85%' }}></div>
                </div>
              </div>
              <div className="mempool-layer">
                <div className="layer-info">
                  <div className="layer-fee">6-15 sats/byte</div>
                  <div className="layer-count">1,263 transactions</div>
                </div>
                <div className="layer-bar">
                  <div className="layer-fill medium" style={{ width: '60%' }}></div>
                </div>
              </div>
              <div className="mempool-layer">
                <div className="layer-info">
                  <div className="layer-fee">16+ sats/byte</div>
                  <div className="layer-count">421 transactions</div>
                </div>
                <div className="layer-bar">
                  <div className="layer-fill high" style={{ width: '25%' }}></div>
                </div>
              </div>
            </div>
          </div>
          <p style={{ textAlign: 'center', color: '#bfdbfe', marginTop: '1rem' }}>
            Higher fee rates get priority when miners select transactions for the next block.
          </p>
        </div>
      </div>
    );
  };

  const renderPrivacyConcepts = () => (
    <div className="privacy-concepts">
      <div className="intro-header">
        <h2>🛡️ Transaction Privacy</h2>
        <p className="subtitle">Protecting Your Financial Sovereignty</p>
        <div className="prime-text">
          💡 Bitcoin is pseudonymous, not anonymous. Every transaction is public, but with the right practices, you can maintain strong privacy.
        </div>
      </div>

      <div className="privacy-grid">
        <div className="privacy-card">
          <div className="privacy-icon">🎭</div>
          <h4>Address Reuse</h4>
          <p>Never reuse Bitcoin addresses. Each transaction should use a fresh address to prevent linking your payments together.</p>
        </div>
        <div className="privacy-card">
          <div className="privacy-icon">🔗</div>
          <h4>UTXO Management</h4>
          <p>Be mindful of which UTXOs you combine. Spending multiple UTXOs together reveals they belong to the same wallet.</p>
        </div>
        <div className="privacy-card">
          <div className="privacy-icon">🌊</div>
          <h4>CoinJoin</h4>
          <p>Mix your coins with others in collaborative transactions that break the link between inputs and outputs.</p>
        </div>
        <div className="privacy-card">
          <div className="privacy-icon">🎯</div>
          <h4>Amount Correlation</h4>
          <p>Avoid distinctive amounts that could be used to identify your transactions across different addresses.</p>
        </div>
        <div className="privacy-card">
          <div className="privacy-icon">⚡</div>
          <h4>Lightning Network</h4>
          <p>Use Lightning for small payments. Off-chain transactions provide better privacy than on-chain ones.</p>
        </div>
        <div className="privacy-card">
          <div className="privacy-icon">🛡️</div>
          <h4>Network Privacy</h4>
          <p>Use Tor when broadcasting transactions to hide your IP address from network observers.</p>
        </div>
      </div>

      <div className="prime-text">
        🎯 Privacy is a practice, not a feature. The tools exist—you just need to use them consistently.
      </div>
    </div>
  );

  const renderScriptTypes = () => (
    <div className="script-types">
      <div className="intro-header">
        <h2>📜 Script Types</h2>
        <p className="subtitle">Bitcoin's Programmable Money</p>
        <div className="prime-text">
          💡 Every Bitcoin transaction includes a script—a small program that defines the conditions for spending the coins.
        </div>
      </div>

      <div className="script-grid">
        <div className="script-card">
          <div className="script-type">P2PKH (Legacy)</div>
          <div className="script-description">
            Pay to Public Key Hash. The original Bitcoin address format. Requires a signature matching the public key hash.
          </div>
          <div className="script-example">
            OP_DUP OP_HASH160 &lt;pubKeyHash&gt; OP_EQUALVERIFY OP_CHECKSIG
          </div>
        </div>
        
        <div className="script-card">
          <div className="script-type">P2SH (SegWit)</div>
          <div className="script-description">
            Pay to Script Hash. Allows complex spending conditions wrapped in a simple address format.
          </div>
          <div className="script-example">
            OP_HASH160 &lt;scriptHash&gt; OP_EQUAL
          </div>
        </div>
        
        <div className="script-card">
          <div className="script-type">P2WPKH (Native SegWit)</div>
          <div className="script-description">
            Pay to Witness Public Key Hash. Native SegWit format with lower fees and better scalability.
          </div>
          <div className="script-example">
            OP_0 &lt;pubKeyHash&gt;
          </div>
        </div>
        
        <div className="script-card">
          <div className="script-type">P2TR (Taproot)</div>
          <div className="script-description">
            Pay to Taproot. The newest format enabling privacy, efficiency, and complex smart contracts.
          </div>
          <div className="script-example">
            OP_1 &lt;taprootOutput&gt;
          </div>
        </div>
      </div>

      <div className="prime-text">
        🚀 Each evolution makes Bitcoin more efficient and private while maintaining backward compatibility.
      </div>
    </div>
  );

  const renderMempoolVisualization = () => (
    <div className="mempool-viz">
      <div className="intro-header">
        <h2>⚡ The Mempool</h2>
        <p className="subtitle">Bitcoin's Transaction Waiting Room</p>
        <div className="prime-text">
          💡 The mempool is where transactions wait to be included in a block. It's like a priority queue where higher fees get served first.
        </div>
      </div>

      <div className="interactive-demo">
        <h3>🎮 Mempool Simulator</h3>
        <div className="demo-controls">
              <button 
            className="demo-button"
            onClick={() => setMempoolDemo(!mempoolDemo)}
              >
            {mempoolDemo ? 'Stop' : 'Start'} Live Simulation
              </button>
        </div>
        
        <div className="mempool-container">
          <div className="mempool-layers">
            <div className="mempool-layer">
              <div className="layer-info">
                <div className="layer-fee">High Priority (20+ sats/byte)</div>
                <div className="layer-count">156 transactions</div>
              </div>
              <div className="layer-bar">
                <div className="layer-fill high" style={{ 
                  width: mempoolDemo ? '15%' : '25%',
                  transition: 'width 2s ease'
                }}></div>
              </div>
            </div>
            <div className="mempool-layer">
              <div className="layer-info">
                <div className="layer-fee">Medium Priority (10-19 sats/byte)</div>
                <div className="layer-count">892 transactions</div>
              </div>
              <div className="layer-bar">
                <div className="layer-fill medium" style={{ 
                  width: mempoolDemo ? '45%' : '60%',
                  transition: 'width 2s ease'
                }}></div>
              </div>
            </div>
            <div className="mempool-layer">
              <div className="layer-info">
                <div className="layer-fee">Low Priority (1-9 sats/byte)</div>
                <div className="layer-count">3,247 transactions</div>
              </div>
              <div className="layer-bar">
                <div className="layer-fill low" style={{ 
                  width: mempoolDemo ? '95%' : '85%',
                  transition: 'width 2s ease'
                }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="prime-text">
        ⏰ Block space is limited to ~1MB every 10 minutes. When demand exceeds supply, the fee market determines priority.
      </div>
    </div>
  );

  const renderLightningPreview = () => (
    <div className="lightning-integration">
      <div className="intro-header">
        <h2>⚡ Lightning Network Preview</h2>
        <p className="subtitle">Bitcoin's Scaling Solution</p>
        </div>

      <div className="lightning-comparison">
        <div className="comparison-item">
          <h4>🐢 On-Chain Transactions</h4>
          <ul className="comparison-stats">
            <li>7 transactions per second</li>
            <li>10-60 minute confirmations</li>
            <li>$1-50+ fees</li>
            <li>Global settlement</li>
            <li>Perfect for large amounts</li>
          </ul>
        </div>
        <div className="comparison-item">
          <h4>⚡ Lightning Transactions</h4>
          <ul className="comparison-stats">
            <li>Millions of transactions per second</li>
            <li>Instant confirmations</li>
            <li>Pennies in fees</li>
            <li>Instant settlement</li>
            <li>Perfect for small amounts</li>
          </ul>
        </div>
      </div>

      <div className="prime-text">
        🔗 Lightning uses the same UTXOs and signatures you just learned about—it's Bitcoin, just faster and cheaper for everyday payments.
      </div>
    </div>
  );

  const renderCompletion = () => (
    <div className="completion-screen">
      <div className="completion-icon">
        <Trophy size={80} />
      </div>
      <h1>🎉 Transaction Mastery Achieved!</h1>
      <p className="subtitle">You now understand how Bitcoin moves around the world</p>

      <div className="completion-stats">
        <div className="stat">
          <span className="stat-number">8</span>
          <span className="stat-label">Concepts Mastered</span>
        </div>
        <div className="stat">
          <span className="stat-number">5</span>
          <span className="stat-label">Interactive Demos</span>
        </div>
        <div className="stat">
          <span className="stat-number">100%</span>
          <span className="stat-label">Transaction Fluency</span>
        </div>
      </div>

      <div className="prime-text">
        🚀 You're now ready to confidently send, receive, and understand Bitcoin transactions. Next up: explore how scripts enable programmable money!
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch (steps[currentStep].component) {
      case 'utxo-intro': return renderUTXOIntro();
      case 'transaction-building': return renderTransactionBuilding();
      case 'fee-market': return renderFeeMarket();
      case 'privacy-concepts': return renderPrivacyConcepts();
      case 'script-types': return renderScriptTypes();
      case 'mempool-visualization': return renderMempoolVisualization();
      case 'lightning-preview': return renderLightningPreview();
      case 'completion': return renderCompletion();
      default: return renderUTXOIntro();
    }
  };

  return (
    <div className="transactions-module">
      <div className="module-header">
        <h1 className="module-title">
          <Coins className="module-icon" size={48} />
          Bitcoin Transactions: Digital Money in Motion
        </h1>
        <div className="module-progress">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <div>Step {currentStep + 1} of {steps.length}</div>
        </div>
      </div>

      <div className="module-tabs">
        {steps.map((step, index) => (
          <div
            key={step.id}
            className={`tab ${index === currentStep ? 'active' : ''} ${completedSteps.has(index) ? 'completed' : ''}`}
            onClick={() => setCurrentStep(index)}
          >
            {step.icon}
            <span>{step.title}</span>
            {completedSteps.has(index) && <CheckCircle size={16} />}
          </div>
        ))}
      </div>

      <div className="step-content-container">
        {renderCurrentStep()}
        
        {currentStep < steps.length - 1 && (
          <button className="continue-button" onClick={handleContinue}>
            Continue to {steps[currentStep + 1].title} →
          </button>
        )}
      </div>
    </div>
  );
};

export default TransactionsModule; 