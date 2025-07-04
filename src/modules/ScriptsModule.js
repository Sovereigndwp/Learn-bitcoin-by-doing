import React, { useState, useEffect } from 'react';
import { useProgress } from '../contexts/ProgressContext';
import { FileText, Code, Layers, Users, Clock, Zap, Trophy, CheckCircle, Play, Plus, Minus } from 'lucide-react';
import './ScriptsModule.css';

const ScriptsModule = () => {
  const { completeModule, isModuleCompleted } = useProgress();
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(new Set());
  const [scriptInput, setScriptInput] = useState('1 1 OP_ADD');
  const [stack, setStack] = useState([]);
  const [multisigSignatures, setMultisigSignatures] = useState(new Set());
  const [timelockEnabled, setTimelockEnabled] = useState(false);

  const steps = [
    {
      id: 'script-intro',
      title: 'What Are Scripts?',
      icon: <FileText className="w-6 h-6" />,
      component: 'script-intro'
    },
    {
      id: 'stack-operations',
      title: 'Stack Operations',
      icon: <Layers className="w-6 h-6" />,
      component: 'stack-operations'
    },
    {
      id: 'script-types',
      title: 'Script Types',
      icon: <Code className="w-6 h-6" />,
      component: 'script-types'
    },
    {
      id: 'multisig-explorer',
      title: 'Multisig Scripts',
      icon: <Users className="w-6 h-6" />,
      component: 'multisig-explorer'
    },
    {
      id: 'timelock-contracts',
      title: 'Timelock Contracts',
      icon: <Clock className="w-6 h-6" />,
      component: 'timelock-contracts'
    },
    {
      id: 'smart-contracts',
      title: 'Smart Contracts',
      icon: <Zap className="w-6 h-6" />,
      component: 'smart-contracts'
    },
    {
      id: 'real-world-apps',
      title: 'Real-World Applications',
      icon: <Play className="w-6 h-6" />,
      component: 'real-world-apps'
    },
    {
      id: 'completion',
      title: 'Script Mastery',
      icon: <Trophy className="w-6 h-6" />,
      component: 'completion'
    }
  ];

  useEffect(() => {
    if (currentStep === steps.length - 1 && !isModuleCompleted('scripts')) {
      completeModule('scripts');
      showAchievement('Script Master', 'You understand how to program money with Bitcoin scripts!');
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
    if (stepIndex === 0) showAchievement('Script Explorer', 'You understand Bitcoin\'s programming language!');
    if (stepIndex === 1) showAchievement('Stack Master', 'You can visualize script execution!');
    if (stepIndex === 2) showAchievement('Type Scholar', 'You know all Bitcoin script types!');
    if (stepIndex === 3) showAchievement('Multisig Expert', 'You can create multi-party contracts!');
    if (stepIndex === 4) showAchievement('Time Traveler', 'You understand temporal constraints!');
    if (stepIndex === 5) showAchievement('Contract Creator', 'You can build smart contracts!');
    if (stepIndex === 6) showAchievement('Real-World Builder', 'You see practical applications!');
  };

  const handleContinue = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
      handleStepComplete(currentStep);
    }
  };

  const executeScript = (script) => {
    const newStack = [];
    const operations = script.split(' ');
    
    try {
      operations.forEach(op => {
        if (op.startsWith('OP_')) {
          switch (op) {
            case 'OP_ADD':
              if (newStack.length >= 2) {
                const b = newStack.pop();
                const a = newStack.pop();
                newStack.push(a + b);
              }
              break;
            case 'OP_DUP':
              if (newStack.length >= 1) {
                newStack.push(newStack[newStack.length - 1]);
              }
              break;
            case 'OP_HASH160':
              if (newStack.length >= 1) {
                const value = newStack.pop();
                newStack.push(`hash160(${value})`);
              }
              break;
            case 'OP_EQUALVERIFY':
              if (newStack.length >= 2) {
                const b = newStack.pop();
                const a = newStack.pop();
                if (a === b) {
                  newStack.push('TRUE');
                } else {
                  throw new Error('EQUALVERIFY failed');
                }
              }
              break;
            case 'OP_CHECKSIG':
              newStack.push('SIG_VALID');
              break;
            default:
              newStack.push(op);
          }
        } else {
          newStack.push(isNaN(op) ? op : parseInt(op));
        }
      });
      setStack([...newStack]);
    } catch (error) {
      setStack(['ERROR: ' + error.message]);
    }
  };

  const handleMultisigSign = (signerId) => {
    const newSignatures = new Set(multisigSignatures);
    if (newSignatures.has(signerId)) {
      newSignatures.delete(signerId);
    } else {
      newSignatures.add(signerId);
    }
    setMultisigSignatures(newSignatures);
  };

  const progressPercentage = ((currentStep + 1) / steps.length) * 100;

  const renderScriptIntro = () => (
    <div className="script-intro">
      <div className="intro-header">
        <h2>📜 Bitcoin Scripts</h2>
        <p className="subtitle">The Programming Language of Money</p>
        <div className="prime-text">
          💡 Every Bitcoin transaction includes a script—a small program that defines exactly how the coins can be spent. Scripts make Bitcoin programmable money.
        </div>
      </div>
      
      <div className="script-concepts">
        <h3>🔍 Core Concepts</h3>
        <div className="concepts-grid">
          <div className="concept-card">
            <span className="concept-icon">🔒</span>
            <h3>Locking Scripts</h3>
            <p className="concept-description">
              Define the conditions that must be met to spend Bitcoin. Like a lock that requires the right key.
            </p>
          </div>
          <div className="concept-card">
            <span className="concept-icon">🔓</span>
            <h3>Unlocking Scripts</h3>
            <p className="concept-description">
              Provide the data needed to satisfy the locking script conditions. Like the key that opens the lock.
            </p>
          </div>
          <div className="concept-card">
            <span className="concept-icon">📚</span>
            <h3>Stack-Based</h3>
            <p className="concept-description">
              Scripts use a stack data structure. Operations push and pop data from the stack until validation is complete.
            </p>
          </div>
          <div className="concept-card">
            <span className="concept-icon">⚡</span>
            <h3>Deterministic</h3>
            <p className="concept-description">
              Scripts always produce the same result. No randomness, no network calls—pure mathematical certainty.
            </p>
          </div>
        </div>
      </div>

      <div className="prime-text">
        🎯 Think of scripts as conditional statements: "IF you provide a valid signature AND it matches this public key, THEN you can spend these coins."
      </div>
    </div>
  );

  const renderStackOperations = () => (
    <div className="stack-visualization">
      <div className="intro-header">
        <h2>📚 Stack Operations</h2>
        <p className="subtitle">See How Scripts Execute Step by Step</p>
        <div className="prime-text">
          💡 Bitcoin scripts work like a calculator that uses a stack. Numbers go on top, operations combine them, and the final result determines if the transaction is valid.
        </div>
        </div>

      <div className="script-playground">
        <h3>🎮 Interactive Script Playground</h3>
        <div className="playground-container">
          <div className="script-editor">
            <div className="editor-panel">
              <div className="panel-header">
                <Code size={20} />
                Script Input
              </div>
              <textarea
                className="script-input"
                value={scriptInput}
                onChange={(e) => setScriptInput(e.target.value)}
                placeholder="Try: 1 1 OP_ADD, or OP_DUP, or 5 3 OP_ADD"
              />
              <button 
                className="demo-button"
                onClick={() => executeScript(scriptInput)}
                style={{ marginTop: '1rem' }}
              >
                <Play size={16} />
                Execute Script
              </button>
            </div>
            
            <div className="editor-panel">
              <div className="panel-header">
                <Layers size={20} />
                Stack State
              </div>
              <div className="stack-container">
                <div className="stack-display">
                  {stack.map((item, index) => (
                    <div key={index} className="stack-item">
                      {item}
                    </div>
                  ))}
                  {stack.length === 0 && (
                    <div style={{ textAlign: 'center', color: '#6b7280', padding: '2rem' }}>
                      Stack is empty
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="demo-controls">
            <button className="demo-button" onClick={() => setScriptInput('1 1 OP_ADD')}>
              Simple Addition
            </button>
            <button className="demo-button" onClick={() => setScriptInput('5 OP_DUP')}>
              Duplicate Value
            </button>
                         <button className="demo-button" onClick={() => setScriptInput('<pubKeyHash> OP_DUP OP_HASH160 <pubKeyHash> OP_EQUALVERIFY OP_CHECKSIG')}>
               P2PKH Script
             </button>
            <button className="demo-button" onClick={() => { setScriptInput(''); setStack([]); }}>
              Clear All
            </button>
          </div>
        </div>
      </div>

      <div className="prime-text">
        🎯 Try modifying the script above! Most Bitcoin scripts are combinations of these basic operations.
      </div>
    </div>
  );

  const renderScriptTypes = () => (
    <div className="script-types">
      <div className="intro-header">
        <h2>🔧 Script Types Evolution</h2>
        <p className="subtitle">From Simple to Sophisticated</p>
        <div className="prime-text">
          💡 Bitcoin's script types have evolved to be more efficient, private, and flexible while maintaining backward compatibility.
        </div>
      </div>

      <div className="script-types-grid">
        <div className="script-type-card">
          <div className="script-type-header">
            <span className="script-type-icon">🏛️</span>
            <span className="script-type-name">P2PKH (Legacy)</span>
          </div>
          <div className="script-type-description">
            Pay to Public Key Hash. The original Bitcoin script type that requires a signature matching a specific public key hash.
          </div>
          <div className="script-code">
            OP_DUP OP_HASH160 &lt;pubKeyHash&gt; OP_EQUALVERIFY OP_CHECKSIG
          </div>
          <div className="script-features">
            <ul className="feature-list">
              <li>Simple and reliable</li>
              <li>Widely supported</li>
              <li>Higher transaction fees</li>
              <li>Addresses start with "1"</li>
            </ul>
          </div>
        </div>

        <div className="script-type-card">
          <div className="script-type-header">
            <span className="script-type-icon">📦</span>
            <span className="script-type-name">P2SH (Script Hash)</span>
          </div>
          <div className="script-type-description">
            Pay to Script Hash. Allows complex scripts to be wrapped in a simple format, enabling multisig and other advanced features.
          </div>
          <div className="script-code">
            OP_HASH160 &lt;scriptHash&gt; OP_EQUAL
          </div>
          <div className="script-features">
            <ul className="feature-list">
              <li>Enables complex conditions</li>
              <li>Multisig support</li>
              <li>Addresses start with "3"</li>
              <li>Shifts complexity to recipient</li>
            </ul>
          </div>
        </div>

        <div className="script-type-card">
          <div className="script-type-header">
            <span className="script-type-icon">⚡</span>
            <span className="script-type-name">P2WPKH (SegWit)</span>
          </div>
          <div className="script-type-description">
            Pay to Witness Public Key Hash. Native SegWit format that separates signature data for better efficiency and lower fees.
          </div>
          <div className="script-code">
            OP_0 &lt;pubKeyHash&gt;
          </div>
          <div className="script-features">
            <ul className="feature-list">
              <li>Lower transaction fees</li>
              <li>Malleability protection</li>
              <li>Addresses start with "bc1q"</li>
              <li>Better scalability</li>
            </ul>
          </div>
        </div>

        <div className="script-type-card">
          <div className="script-type-header">
            <span className="script-type-icon">🌳</span>
            <span className="script-type-name">P2TR (Taproot)</span>
          </div>
          <div className="script-type-description">
            Pay to Taproot. The newest format enabling complex smart contracts while looking like simple payments for enhanced privacy.
          </div>
          <div className="script-code">
            OP_1 &lt;taprootOutput&gt;
          </div>
          <div className="script-features">
            <ul className="feature-list">
              <li>Maximum privacy</li>
              <li>Complex script capabilities</li>
              <li>Addresses start with "bc1p"</li>
              <li>Schnorr signatures</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="prime-text">
        🚀 Each evolution maintains backward compatibility while adding new capabilities—just like software updates that don't break old programs.
      </div>
    </div>
  );

  const renderMultisigExplorer = () => {
    const signers = [
      { id: 'alice', name: 'Alice', role: 'CEO' },
      { id: 'bob', name: 'Bob', role: 'CTO' },
      { id: 'carol', name: 'Carol', role: 'CFO' }
    ];
    const requiredSigs = 2;
    const canExecute = multisigSignatures.size >= requiredSigs;

    return (
      <div className="multisig-simulator">
        <div className="intro-header">
          <h2>👥 Multisig Scripts</h2>
          <p className="subtitle">Multiple Keys, Shared Control</p>
          <div className="prime-text">
            💡 Multisig scripts require multiple signatures to spend funds. Perfect for businesses, families, or any situation requiring shared control.
                  </div>
                  </div>

        <div className="multisig-setup">
          <h3>🏢 Corporate Treasury: 2-of-3 Multisig</h3>
          <p style={{ textAlign: 'center', color: '#cbd5e1', marginBottom: '2rem' }}>
            Require {requiredSigs} signatures from {signers.length} executives to approve large payments
          </p>

          <div className="signature-grid">
            {signers.map(signer => (
              <div
                key={signer.id}
                className={`signature-slot ${multisigSignatures.has(signer.id) ? 'signed' : ''} ${
                  multisigSignatures.size < requiredSigs && !multisigSignatures.has(signer.id) ? 'required' : ''
                }`}
                onClick={() => handleMultisigSign(signer.id)}
              >
                <div className="signer-info">
                  <div className="signer-name">{signer.name}</div>
                  <div className="signer-status">{signer.role}</div>
                  <div style={{ marginTop: '0.5rem' }}>
                    {multisigSignatures.has(signer.id) ? (
                      <span style={{ color: '#10b981' }}>✓ Signed</span>
                    ) : (
                      <span style={{ color: '#6b7280' }}>Click to sign</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className={`signature-status ${canExecute ? 'status-complete' : 'status-pending'}`}>
            {canExecute ? (
              <span>✅ Transaction approved! {multisigSignatures.size}/{signers.length} signatures collected</span>
            ) : (
              <span>⏳ Pending approval: {multisigSignatures.size}/{requiredSigs} required signatures</span>
            )}
          </div>

          <div style={{ marginTop: '2rem' }}>
            <h4>🔧 Multisig Script Structure</h4>
            <div className="script-code">
              OP_2 &lt;pubkey1&gt; &lt;pubkey2&gt; &lt;pubkey3&gt; OP_3 OP_CHECKMULTISIG
            </div>
            <p style={{ color: '#cbd5e1', fontSize: '0.9rem', marginTop: '1rem' }}>
              This creates a 2-of-3 multisig: any 2 out of 3 keys can authorize spending.
            </p>
          </div>
        </div>

        <div className="prime-text">
          🎯 Multisig eliminates single points of failure. Even if one key is compromised, funds remain secure.
        </div>
      </div>
    );
  };

  const renderTimelockContracts = () => (
    <div className="timelock-contracts">
      <div className="intro-header">
        <h2>⏰ Timelock Contracts</h2>
        <p className="subtitle">Programming Time into Money</p>
        <div className="prime-text">
          💡 Timelock scripts let you program time constraints into Bitcoin. Create inheritance plans, vesting schedules, or escrow contracts.
        </div>
      </div>

      <div className="interactive-demo">
        <h3>🎮 Timelock Simulator</h3>
        <div className="demo-controls">
          <button 
            className={`demo-button ${timelockEnabled ? 'demo-button' : ''}`}
            onClick={() => setTimelockEnabled(!timelockEnabled)}
          >
            <Clock size={16} />
            {timelockEnabled ? 'Disable' : 'Enable'} Timelock
          </button>
        </div>

        <div className="playground-container">
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <h4>🏦 Trust Fund Contract</h4>
            <p style={{ color: '#cbd5e1', marginBottom: '2rem' }}>
              Funds locked until beneficiary turns 21 (January 1, 2030)
            </p>
            
            <div style={{ 
              background: timelockEnabled ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)',
              border: `1px solid ${timelockEnabled ? '#10b981' : '#ef4444'}`,
              borderRadius: '8px',
              padding: '2rem',
              margin: '2rem 0'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>
                {timelockEnabled ? '🔓' : '🔒'}
              </div>
              <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                Status: {timelockEnabled ? 'UNLOCKED' : 'LOCKED'}
              </div>
              <div style={{ fontSize: '0.9rem', color: '#cbd5e1', marginTop: '0.5rem' }}>
                Current time: {timelockEnabled ? 'After 2030' : 'Before 2030'}
              </div>
            </div>

            <div className="script-code">
              &lt;signature&gt; &lt;pubkey&gt; OP_CHECKSIG<br/>
              1893456000 OP_CHECKLOCKTIMEVERIFY OP_DROP
            </div>
            <p style={{ color: '#cbd5e1', fontSize: '0.9rem', marginTop: '1rem' }}>
              This script requires both a valid signature AND the current time to be after January 1, 2030.
            </p>
          </div>
        </div>
      </div>

      <div className="contract-examples">
        <div className="contract-card">
          <div className="contract-title">🎓 Gradual Release</div>
          <div className="contract-description">
            Release funds in stages over time, like a college fund that unlocks each semester.
          </div>
          <div className="contract-conditions">
            if (time > semester_1) unlock 25%<br/>
            if (time > semester_2) unlock 50%<br/>
            if (time > graduation) unlock 100%
          </div>
        </div>

        <div className="contract-card">
          <div className="contract-title">💍 Escrow Service</div>
          <div className="contract-description">
            Hold funds in escrow with automatic release if not disputed within 30 days.
          </div>
          <div className="contract-conditions">
            if (dispute_period_expired) unlock to buyer<br/>
            else require (buyer_sig AND seller_sig)
          </div>
        </div>

        <div className="contract-card">
          <div className="contract-title">🏦 Emergency Access</div>
          <div className="contract-description">
            Normal access requires your key, but emergency backup activates after 1 year of inactivity.
          </div>
          <div className="contract-conditions">
            if (primary_key) unlock immediately<br/>
            if (time > 1_year_inactive) allow backup_key
          </div>
        </div>
      </div>

      <div className="prime-text">
        ⏰ Time becomes a programmable element of money. No lawyers, no courts—just mathematical certainty.
      </div>
    </div>
  );

  const renderSmartContracts = () => (
    <div className="smart-contracts">
      <div className="intro-header">
        <h2>⚡ Smart Contracts on Bitcoin</h2>
        <p className="subtitle">Complex Logic, Simple Execution</p>
        <div className="prime-text">
          💡 While Bitcoin's scripting is simpler than Ethereum, it can still create powerful smart contracts that are secure, predictable, and efficient.
        </div>
      </div>

      <div className="contract-examples">
        <div className="contract-card">
          <div className="contract-title">⚖️ Atomic Swaps</div>
          <div className="contract-description">
            Exchange different cryptocurrencies without trusting a centralized exchange. Both parties get their coins or no one does.
          </div>
          <div className="contract-conditions">
            Alice locks Bitcoin with secret hash<br/>
            Bob locks Litecoin with same hash<br/>
            Alice reveals secret → gets Litecoin<br/>
            Bob uses secret → gets Bitcoin
          </div>
        </div>

        <div className="contract-card">
          <div className="contract-title">🎰 Provably Fair Betting</div>
          <div className="contract-description">
            Create gambling contracts where neither party can cheat. The outcome is determined by blockchain data.
          </div>
          <div className="contract-conditions">
            Use future block hash as randomness<br/>
            If hash % 2 == 0: Player A wins<br/>
            If hash % 2 == 1: Player B wins<br/>
            Winner gets all funds
          </div>
        </div>

        <div className="contract-card">
          <div className="contract-title">💰 Payment Channels</div>
          <div className="contract-description">
            Lock funds in a channel for instant, cheap payments. Foundation of the Lightning Network.
          </div>
          <div className="contract-conditions">
            Open: Both parties lock funds<br/>
            Transact: Update balances off-chain<br/>
            Close: Final state goes on-chain<br/>
            Dispute: Penalty for old states
          </div>
        </div>

        <div className="contract-card">
          <div className="contract-title">🏠 Decentralized Oracles</div>
          <div className="contract-description">
            Connect Bitcoin to real-world data through cryptographic commitments and economic incentives.
          </div>
          <div className="contract-conditions">
            Oracle commits to data with bond<br/>
            If correct: Oracle keeps bond + fee<br/>
            If incorrect: Bond slashed<br/>
            Multiple oracles for redundancy
          </div>
        </div>
      </div>

      <div className="prime-text">
        🔮 Bitcoin's conservative approach to smart contracts prioritizes security and predictability over complexity. Every operation is carefully considered.
      </div>
    </div>
  );

  const renderRealWorldApps = () => (
    <div className="real-world-apps">
      <div className="intro-header">
        <h2>🌍 Real-World Applications</h2>
        <p className="subtitle">Scripts in Action Today</p>
        <div className="prime-text">
          💡 Bitcoin scripts aren't just theory—they're being used right now for everything from Lightning payments to corporate treasury management.
        </div>
      </div>

      <div className="contract-examples">
        <div className="contract-card">
          <div className="contract-title">⚡ Lightning Network</div>
          <div className="contract-description">
            Millions of instant, cheap Bitcoin payments powered by sophisticated script contracts and payment channels.
          </div>
          <div className="contract-conditions">
            Active nodes: 15,000+<br/>
            Total capacity: 5,000+ BTC<br/>
            Used by: Strike, Cash App, Kraken<br/>
            Enables: Instant global payments
          </div>
        </div>

        <div className="contract-card">
          <div className="contract-title">🏢 Corporate Multisig</div>
          <div className="contract-description">
            Companies like MicroStrategy and Tesla use multisig scripts to secure billions in Bitcoin treasury holdings.
          </div>
          <div className="contract-conditions">
            Typical setup: 3-of-5 or 5-of-7<br/>
            Signers: Board members, executives<br/>
            Security: No single point of failure<br/>
            Compliance: Audit trail for all actions
          </div>
        </div>

        <div className="contract-card">
          <div className="contract-title">🌉 Cross-Chain Bridges</div>
          <div className="contract-description">
            Move Bitcoin value to other blockchains while keeping the underlying Bitcoin secure through script contracts.
          </div>
          <div className="contract-conditions">
            Lock Bitcoin in multisig<br/>
            Mint wrapped tokens on other chains<br/>
            Redeem: Burn tokens → unlock Bitcoin<br/>
            Security: Distributed key management
          </div>
        </div>

        <div className="contract-card">
          <div className="contract-title">👨‍👩‍👧‍👦 Estate Planning</div>
          <div className="contract-description">
            Families use timelock scripts for inheritance planning, ensuring funds transfer automatically when needed.
          </div>
          <div className="contract-conditions">
            Normal access: Primary owner key<br/>
            Emergency: Backup keys after timelock<br/>
            Inheritance: Automatic after time period<br/>
            Privacy: No probate court needed
          </div>
        </div>
      </div>

      <div className="prime-text">
        🚀 These aren't futuristic concepts—they're working today, securing billions of dollars worth of Bitcoin through the power of programmable money.
      </div>
    </div>
  );

  const renderCompletion = () => (
    <div className="completion-screen">
      <div className="completion-icon">
        <Trophy size={80} />
      </div>
      <h1>🎉 Script Mastery Achieved!</h1>
      <p className="subtitle">You now understand how to program money with Bitcoin</p>

      <div className="completion-stats">
        <div className="stat">
          <span className="stat-number">8</span>
          <span className="stat-label">Script Concepts Mastered</span>
        </div>
        <div className="stat">
          <span className="stat-number">6</span>
          <span className="stat-label">Interactive Demos</span>
        </div>
        <div className="stat">
          <span className="stat-number">100%</span>
          <span className="stat-label">Programming Fluency</span>
        </div>
      </div>

      <div className="prime-text">
        🎓 You now understand Bitcoin's scripting system from basic operations to complex smart contracts. You can see how code becomes money and money becomes programmable!
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch (steps[currentStep].component) {
      case 'script-intro': return renderScriptIntro();
      case 'stack-operations': return renderStackOperations();
      case 'script-types': return renderScriptTypes();
      case 'multisig-explorer': return renderMultisigExplorer();
      case 'timelock-contracts': return renderTimelockContracts();
      case 'smart-contracts': return renderSmartContracts();
      case 'real-world-apps': return renderRealWorldApps();
      case 'completion': return renderCompletion();
      default: return renderScriptIntro();
    }
  };

  return (
    <div className="scripts-module">
      <div className="module-header">
        <h1 className="module-title">
          <FileText className="module-icon" size={48} />
          Bitcoin Scripts: Programming Money
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

export default ScriptsModule; 