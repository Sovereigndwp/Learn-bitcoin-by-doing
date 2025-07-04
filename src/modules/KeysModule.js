import React, { useState, useEffect } from 'react';
import { useProgress } from '../contexts/ProgressContext';
import { Key, CheckCircle, Trophy, Lock, Unlock, MapPin, Shield, Eye, EyeOff, Copy, Dice1, Zap, Globe, Crown, AlertTriangle, ArrowRight, RefreshCw, Info } from 'lucide-react';
import '../components/ModuleCommon.css';
import './KeysModule.css';

const KeysModule = () => {
  const { completeModule, isModuleCompleted } = useProgress();
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(new Set());

  const handleStepComplete = (stepIndex) => {
    const newCompleted = new Set(completedSteps);
    newCompleted.add(stepIndex);
    setCompletedSteps(newCompleted);
    
    // Show achievement for key milestones
    if (stepIndex === 1) {
      showAchievement("Entropy Master", "You understand how randomness creates unbreakable security!");
    } else if (stepIndex === 2) {
      showAchievement("Key Alchemist", "You can transform chaos into Bitcoin addresses!");
    } else if (stepIndex === 4) {
      showAchievement("Hierarchy Explorer", "You understand Bitcoin's family tree of keys!");
    } else if (stepIndex === 6) {
      showAchievement("Digital Sovereign", "You've mastered the art of self-custody!");
    }
    
    // Auto-advance to next step
    if (stepIndex < steps.length - 1) {
      setTimeout(() => {
        setCurrentStep(stepIndex + 1);
      }, 500);
    }
    
    if (newCompleted.size === steps.length) {
      completeModule('keys');
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

  const handleTabClick = (stepIndex) => {
    setCurrentStep(stepIndex);
  };

  const steps = [
    {
      title: "Digital Sovereignty",
      type: "digital-sovereignty-intro"
    },
    {
      title: "Entropy & Randomness",
      type: "entropy-lab"
    },
    {
      title: "Key Generation",
      type: "key-generation-playground"
    },
    {
      title: "Security Hierarchy",
      type: "hd-wallet-visualization"
    },
    {
      title: "Lightning Preview",
      type: "lightning-preview"
    },
    {
      title: "Traditional vs Bitcoin",
      type: "identity-comparison"
    },
    {
      title: "Your First Wallet",
      type: "wallet-setup-guide"
    },
    {
      title: "Next Steps",
      type: "completion-screen"
    }
  ];

  const renderStep = () => {
    const step = steps[currentStep];
    switch (step.type) {
      case 'digital-sovereignty-intro':
        return <DigitalSovereigntyIntro onComplete={() => handleStepComplete(currentStep)} />;
      case 'entropy-lab':
        return <EntropyLab onComplete={() => handleStepComplete(currentStep)} />;
      case 'key-generation-playground':
        return <KeyGenerationPlayground onComplete={() => handleStepComplete(currentStep)} />;
      case 'hd-wallet-visualization':
        return <HDWalletVisualization onComplete={() => handleStepComplete(currentStep)} />;
      case 'lightning-preview':
        return <LightningPreview onComplete={() => handleStepComplete(currentStep)} />;
      case 'identity-comparison':
        return <IdentityComparison onComplete={() => handleStepComplete(currentStep)} />;
      case 'wallet-setup-guide':
        return <WalletSetupGuide onComplete={() => handleStepComplete(currentStep)} />;
      case 'completion-screen':
        return <CompletionScreen onComplete={() => handleStepComplete(currentStep)} />;
      default:
        return <div>Unknown step type</div>;
    }
  };

  return (
    <div className="keys-module">
      <div className="module-header">
        <h1 className="module-title">
          <Key className="module-icon" />
          Digital Sovereignty: Your Keys, Your Bitcoin
        </h1>
      <div className="module-progress">
        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ width: `${(completedSteps.size / steps.length) * 100}%` }}
          />
        </div>
        <span className="progress-text">
            {completedSteps.size} / {steps.length} steps mastered
        </span>
        </div>
        {isModuleCompleted('keys') && (
          <div className="completion-badge">
            <Trophy size={24} />
            Digital Sovereign!
          </div>
        )}
      </div>

      <div className="module-tabs">
          {steps.map((step, index) => (
            <button
              key={index}
            className={`tab ${currentStep === index ? 'active' : ''} ${completedSteps.has(index) ? 'completed' : ''}`}
            onClick={() => handleTabClick(index)}
            >
              {completedSteps.has(index) && <CheckCircle size={16} />}
            <span className="tab-title">{step.title}</span>
            </button>
          ))}
        </div>

        <div className="step-content-container">
        {renderStep()}
      </div>
    </div>
  );
};

// Digital Sovereignty Introduction Component
const DigitalSovereigntyIntro = ({ onComplete }) => {
  return (
    <div className="digital-sovereignty-intro">
      <div className="intro-header">
        <h2>🔑 Welcome to True Financial Independence</h2>
        <p className="subtitle">Through cryptographic ownership, not institutional permission</p>
      </div>

      <div className="prime-text">
        💡 "Not your keys, not your coins." This isn't just a slogan—it's the fundamental truth that separates Bitcoin from every other financial system in history.
      </div>

      <div className="sovereignty-chain">
        <h3>The Chain of Digital Sovereignty</h3>
        <div className="chain-steps">
          <div className="chain-step">
            <div className="step-icon">🎲</div>
            <div className="step-content">
              <h4>Pure Randomness</h4>
              <p>256 bits of perfect entropy</p>
              <div className="step-detail">More random than lottery numbers, coin flips, or chaos itself</div>
            </div>
          </div>
          
          <div className="chain-step">
            <div className="step-icon">🔐</div>
            <div className="step-content">
              <h4>Private Key</h4>
              <p>Your secret mathematical identity</p>
              <div className="step-detail">One-way mathematical transformation creates your digital signature</div>
            </div>
          </div>
          
          <div className="chain-step">
            <div className="step-icon">🌍</div>
            <div className="step-content">
              <h4>Public Key</h4>
              <p>Your verifiable proof system</p>
              <div className="step-detail">Anyone can verify, no one can forge</div>
            </div>
          </div>
          
          <div className="chain-step">
            <div className="step-icon">📮</div>
            <div className="step-content">
              <h4>Bitcoin Address</h4>
              <p>Your digital mailbox</p>
              <div className="step-detail">Receive Bitcoin from anywhere in the world</div>
            </div>
          </div>
        </div>
      </div>

      <div className="prime-text">
        💡 You're not just learning about keys—you're becoming your own bank, your own vault, your own financial sovereign.
      </div>

      <div className="comparison-section">
        <h3>🏛️ The Revolution: From Permission to Proof</h3>
        <div className="comparison-grid">
          <div className="comparison-item traditional">
            <h4>🏦 Traditional System</h4>
            <p>Trust institutions to hold your wealth and grant you access</p>
          </div>
          <div className="comparison-item bitcoin">
            <h4>₿ Bitcoin System</h4>
            <p>Possess cryptographic proof that cannot be taken, frozen, or denied</p>
          </div>
        </div>
      </div>

      <button className="continue-button" onClick={onComplete}>
        Begin Your Sovereignty Journey →
      </button>
    </div>
  );
};

// Entropy Lab Component
const EntropyLab = ({ onComplete }) => {
  const [selectedSource, setSelectedSource] = useState(null);
  const [entropyText, setEntropyText] = useState('');
  const [strengthLevel, setStrengthLevel] = useState('weak');

  const entropySources = [
    {
      name: "Quantum Fluctuations",
      icon: "⚛️",
      description: "Fundamental randomness from quantum mechanics",
      strength: "Maximum entropy",
      example: "Radioactive decay timing"
    },
    {
      name: "Hardware Random",
      icon: "🖥️",
      description: "Specialized chips generating true randomness",
      strength: "High entropy",
      example: "Intel RdRand instruction"
    },
    {
      name: "Environmental Noise",
      icon: "🌪️",
      description: "Mouse movements, keystroke timing, temperature",
      strength: "Medium entropy",
      example: "User input patterns"
    },
    {
      name: "Pseudo-Random",
      icon: "🔄",
      description: "Deterministic algorithms (NOT recommended for Bitcoin)",
      strength: "Low entropy",
      example: "Software random() functions"
    }
  ];

  const calculateStrength = (text) => {
    const length = text.length;
    if (length < 10) return 'weak';
    if (length < 30) return 'fair';
    if (length < 50) return 'good';
    return 'strong';
  };

  const handleEntropyChange = (e) => {
    const text = e.target.value;
    setEntropyText(text);
    setStrengthLevel(calculateStrength(text));
  };

  return (
    <div className="entropy-lab">
      <div className="intro-header">
        <h2>🎲 The Chaos That Creates Order</h2>
        <p className="subtitle">Discover how perfect randomness becomes unbreakable security</p>
      </div>

      <div className="prime-text">
        💡 True security begins with true randomness. Every private key starts as 256 bits of pure entropy—so random that the universe itself cannot predict it.
      </div>

      <div className="entropy-visual">
        <h3>Sources of Randomness</h3>
        <div className="entropy-source">
          {entropySources.map((source, index) => (
            <div 
            key={index}
              className={`source-card ${selectedSource === index ? 'active' : ''}`}
              onClick={() => setSelectedSource(index)}
            >
              <div className="source-icon">{source.icon}</div>
              <h4>{source.name}</h4>
              <p>{source.description}</p>
              <div className="source-strength">{source.strength}</div>
              <div className="source-example">Example: {source.example}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="generation-controls">
        <h3>🧪 Entropy Experiment</h3>
        <p>Type random characters to see how entropy strength changes:</p>
        <input
          type="text"
          className="entropy-input"
          value={entropyText}
          onChange={handleEntropyChange}
          placeholder="Start typing random characters... asdfkj2934ksdf..."
        />
        
        <div className="entropy-strength">
          <div className="strength-meter">
            <div className={`strength-fill strength-${strengthLevel}`} />
          </div>
          <p>Strength: {strengthLevel.charAt(0).toUpperCase() + strengthLevel.slice(1)}</p>
        </div>

        <div className="security-levels">
          <h4>Security Levels:</h4>
          <ul>
            <li>2^64 - Broken by supercomputers</li>
            <li>2^128 - Would take millions of years</li>
            <li>2^192 - Longer than the age of the universe</li>
            <li><strong>2^256 (Bitcoin) - More atoms than in the observable universe</strong></li>
          </ul>
        </div>
      </div>

      <button className="continue-button" onClick={onComplete}>
        Master the Chaos →
        </button>
    </div>
  );
};

// Key Generation Playground Component
const KeyGenerationPlayground = ({ onComplete }) => {
  const [generatedKeys, setGeneratedKeys] = useState({
    entropy: '',
    privateKey: '',
    publicKey: '',
    address: ''
  });
  const [showKeys, setShowKeys] = useState(false);
  const [copiedKey, setCopiedKey] = useState(null);

  const generateKeys = () => {
    // Educational mock generation
    const entropy = Array(64).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('');
    const privateKey = entropy;
    const publicKey = '02' + Array(64).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('');
    const address = 'bc1q' + Array(32).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('').substring(0, 39);
    
    setGeneratedKeys({ entropy, privateKey, publicKey, address });
    setShowKeys(true);
  };

  const copyToClipboard = (text, keyType) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(keyType);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="key-generation-playground">
      <div className="intro-header">
        <h2>🎨 From Chaos to Bitcoin Address</h2>
        <p className="subtitle">Watch randomness transform into your digital identity</p>
      </div>

      <div className="prime-text">
        💡 You're about to witness mathematical magic: How 256 random bits become a Bitcoin address through pure cryptography.
      </div>

      <div className="generation-controls">
        <button className="generate-button" onClick={generateKeys}>
          <Dice1 size={20} />
          Generate New Keys
        </button>
        
        {showKeys && (
          <div className="transformation-steps">
            <h3>🔬 The Transformation Process</h3>
            
            <div className="step-flow">
              <div className="flow-step">
                <div className="step-number">1</div>
                <div className="step-info">
                  <h4>Entropy Generation</h4>
                  <p>Create 256 bits of randomness</p>
                </div>
              </div>
              <ArrowRight size={20} />
              
              <div className="flow-step">
                <div className="step-number">2</div>
                <div className="step-info">
                  <h4>Private Key Creation</h4>
                  <p>Format entropy as private key</p>
                </div>
              </div>
              <ArrowRight size={20} />
              
              <div className="flow-step">
                <div className="step-number">3</div>
                <div className="step-info">
                  <h4>Public Key Derivation</h4>
                  <p>Elliptic curve multiplication</p>
                </div>
              </div>
              <ArrowRight size={20} />
              
              <div className="flow-step">
                <div className="step-number">4</div>
                <div className="step-info">
                  <h4>Address Generation</h4>
                  <p>Hash public key for address</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {showKeys && (
        <div className="key-displays">
          <div className="key-display private">
            <div className="key-label">
              <Lock size={16} />
              Private Key (NEVER SHARE)
              <button
                className={`copy-button ${copiedKey === 'private' ? 'copied' : ''}`}
                onClick={() => copyToClipboard(generatedKeys.privateKey, 'private')}
              >
                <Copy size={16} />
              </button>
            </div>
            <div className="key-value">{generatedKeys.privateKey}</div>
          </div>

          <div className="key-display public">
            <div className="key-label">
              <Unlock size={16} />
              Public Key (Safe to Share)
            <button 
                className={`copy-button ${copiedKey === 'public' ? 'copied' : ''}`}
                onClick={() => copyToClipboard(generatedKeys.publicKey, 'public')}
            >
                <Copy size={16} />
            </button>
            </div>
            <div className="key-value">{generatedKeys.publicKey}</div>
          </div>

          <div className="key-display address">
            <div className="key-label">
              <MapPin size={16} />
              Bitcoin Address (Your Digital Mailbox)
              <button 
                className={`copy-button ${copiedKey === 'address' ? 'copied' : ''}`}
                onClick={() => copyToClipboard(generatedKeys.address, 'address')}
              >
                <Copy size={16} />
              </button>
            </div>
            <div className="key-value">{generatedKeys.address}</div>
          </div>
        </div>
      )}

      <div className="security-warning">
        <AlertTriangle size={20} />
        <div>
          <strong>Educational Only:</strong> These are mock keys for learning. Never use keys generated in a browser for real Bitcoin!
        </div>
      </div>

      <div className="real-world-example">
        <h3>🔍 Real-World Analogy</h3>
        <p>Think of it like this: Your private key is like the master blueprint for a unique fingerprint. From that blueprint, you can create the fingerprint (public key) and a mailing address derived from it (Bitcoin address). But given just the fingerprint or address, it's impossible to reverse-engineer the blueprint.</p>
      </div>

      <button className="continue-button" onClick={onComplete}>
        Understand the Magic →
      </button>
    </div>
  );
};

// HD Wallet Visualization Component
const HDWalletVisualization = ({ onComplete }) => {
  const [selectedNode, setSelectedNode] = useState(null);

  const hierarchyNodes = [
    {
      level: "Master Seed",
      path: "Seed Phrase",
      description: "12-24 words that generate everything",
      icon: "👑",
      security: "Guard with your life",
      type: "master"
    },
    {
      level: "Master Private Key",
      path: "m/",
      description: "Root of all keys",
      icon: "🗝️",
      security: "Never expose directly",
      type: "master"
    },
    {
      level: "Purpose",
      path: "m/44'/",
      description: "BIP44 standard for wallet structure",
      icon: "🎯",
      security: "Defines how keys are organized",
      type: "account"
    },
    {
      level: "Coin Type",
      path: "m/44'/0'/",
      description: "Bitcoin = 0, Testnet = 1",
      icon: "₿",
      security: "Separates different cryptocurrencies",
      type: "account"
    },
    {
      level: "Account",
      path: "m/44'/0'/0'/",
      description: "Separate accounts within same wallet",
      icon: "👤",
      security: "Organizational separation",
      type: "account"
    },
    {
      level: "Change",
      path: "m/44'/0'/0'/0/",
      description: "External (0) or Change (1) addresses",
      icon: "🔄",
      security: "Privacy and organization",
      type: "address"
    },
    {
      level: "Address",
      path: "m/44'/0'/0'/0/0",
      description: "Final Bitcoin address",
      icon: "📮",
      security: "Safe to share publicly",
      type: "address"
    }
  ];

  return (
    <div className="hd-wallet-visualization">
      <div className="intro-header">
        <h2>🌳 Hierarchical Deterministic Wallets</h2>
        <p className="subtitle">One seed phrase, infinite addresses—the family tree of Bitcoin keys</p>
      </div>

      <div className="prime-text">
        💡 HD wallets solve a crucial problem: How do you manage thousands of addresses without losing track? The answer: Generate them all from a single seed.
      </div>

      <div className="key-hierarchy">
        <div className="hierarchy-tree">
          {hierarchyNodes.map((node, index) => (
            <div key={index} className="hierarchy-level">
              <div 
                className={`key-node ${node.type} ${selectedNode === index ? 'active' : ''}`}
                onClick={() => setSelectedNode(selectedNode === index ? null : index)}
              >
                <div className="derivation-path">{node.path}</div>
                <div className="node-icon">{node.icon}</div>
                <h4>{node.level}</h4>
                <p>{node.description}</p>
                {selectedNode === index && (
                  <div className="node-details">
                    <div className="security-note">{node.security}</div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="benefits-section">
        <h3>🎯 HD Wallet Benefits</h3>
        <div className="benefits-grid">
          <div className="benefit-item">
            <Shield size={24} />
            <h4>One Backup Secures All</h4>
            <p>Single seed phrase backs up infinite addresses</p>
          </div>
          <div className="benefit-item">
            <RefreshCw size={24} />
            <h4>Deterministic</h4>
            <p>Same seed always generates same addresses</p>
          </div>
          <div className="benefit-item">
            <Globe size={24} />
            <h4>Universal Standard</h4>
            <p>Works across all modern Bitcoin wallets</p>
          </div>
          <div className="benefit-item">
            <Eye size={24} />
            <h4>Privacy Through Separation</h4>
            <p>Each transaction gets a unique address</p>
          </div>
        </div>
      </div>

      <button className="continue-button" onClick={onComplete}>
        Master the Hierarchy →
      </button>
    </div>
  );
};

// Lightning Preview Component
const LightningPreview = ({ onComplete }) => {
  return (
    <div className="lightning-preview">
      <div className="intro-header">
        <h2>⚡ Keys Enable Lightning Speed</h2>
        <p className="subtitle">How your Bitcoin keys unlock instant payments</p>
      </div>

      <div className="prime-text">
        💡 Lightning Network uses the same keys you just learned about, but in a clever way: Instead of every payment going to the blockchain, you and others create 'payment channels' secured by your keys.
      </div>

      <div className="lightning-concepts">
        <div className="concept-grid">
          <div className="concept-item">
            <div className="concept-icon">🔐</div>
            <h4>Channel Creation</h4>
            <p>Two parties lock Bitcoin using their keys</p>
            <div className="benefit">Creates a 'payment highway' between them</div>
            <div className="key-role">Your private key signs the locking transaction</div>
          </div>

          <div className="concept-item">
            <div className="concept-icon">⚡</div>
            <h4>Off-Chain Payments</h4>
            <p>Update channel balance with signatures</p>
            <div className="benefit">Instant, nearly free transactions</div>
            <div className="key-role">Each update signed with your private key</div>
          </div>

          <div className="concept-item">
            <div className="concept-icon">🌐</div>
            <h4>Multi-Hop Routing</h4>
            <p>Pay anyone through connected channels</p>
            <div className="benefit">Global reach without direct channels</div>
            <div className="key-role">Your key authorizes payments through the network</div>
          </div>

          <div className="concept-item">
            <div className="concept-icon">📝</div>
            <h4>Channel Closing</h4>
            <p>Final state recorded on blockchain</p>
            <div className="benefit">All Lightning payments become Bitcoin history</div>
            <div className="key-role">Your key signs the final settlement</div>
          </div>
        </div>
      </div>

      <div className="security-tip">
        <Shield size={20} />
        <div>
          <strong>Key Security:</strong> Lightning Network inherits Bitcoin's security: Your keys, your money. No one can steal from a Lightning channel without your private key signature.
        </div>
      </div>

      <button className="continue-button" onClick={onComplete}>
        Lightning Understanding →
      </button>
    </div>
  );
};

// Identity Comparison Component
const IdentityComparison = ({ onComplete }) => {
  return (
    <div className="identity-comparison">
      <div className="intro-header">
        <h2>🏛️ Accounts vs Mathematics</h2>
        <p className="subtitle">The revolution from permission-based to proof-based money</p>
      </div>

      <div className="prime-text">
        💡 Traditional finance asks "Who are you?" Bitcoin asks "Can you prove ownership?" This shift from identity to cryptography changes everything.
      </div>

      <div className="comparison-section">
        <div className="comparison-grid">
          <div className="comparison-item traditional">
            <h4>🏦 Traditional Banking</h4>
            <ul className="comparison-features">
              <li>Personal information + documents</li>
              <li>Username, password, 2FA</li>
              <li>Bank controls your account</li>
              <li>Bank knows every transaction</li>
              <li>Bank can freeze, limit, or close</li>
              <li>Limited by location and regulations</li>
              <li>Fees, currency conversion, intermediaries</li>
              <li>Hours to days for settlement</li>
              <li>Business hours affect service</li>
            </ul>
          </div>

          <div className="comparison-item bitcoin">
            <h4>₿ Bitcoin Cryptography</h4>
            <ul className="comparison-features">
              <li>Mathematical proof only</li>
              <li>Private key signature</li>
              <li>You control your keys</li>
              <li>Pseudonymous addresses</li>
              <li>No one can stop you</li>
              <li>Global, borderless</li>
              <li>Network fees only, no intermediaries</li>
              <li>~10 minutes for settlement</li>
              <li>24/7/365 global operation</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="implications-section">
        <h3>🌍 Real-World Implications</h3>
        <div className="implications-grid">
          <div className="implication-item">
            <div className="implication-icon">🆔</div>
            <p>No ID required—just math</p>
          </div>
          <div className="implication-item">
            <div className="implication-icon">🚫</div>
            <p>Censorship resistance built-in</p>
          </div>
          <div className="implication-item">
            <div className="implication-icon">🥷</div>
            <p>True financial privacy possible</p>
          </div>
          <div className="implication-item">
            <div className="implication-icon">👑</div>
            <p>Self-sovereignty over your wealth</p>
          </div>
          <div className="implication-item">
            <div className="implication-icon">🌐</div>
            <p>Global access regardless of location</p>
          </div>
          <div className="implication-item">
            <div className="implication-icon">🤖</div>
            <p>Programmable money with smart contracts</p>
          </div>
        </div>
      </div>

      <button className="continue-button" onClick={onComplete}>
        Embrace the Revolution →
      </button>
    </div>
  );
};

// Wallet Setup Guide Component
const WalletSetupGuide = ({ onComplete }) => {
  const [selectedWallet, setSelectedWallet] = useState(null);

  const walletTypes = [
    {
      type: "Hardware Wallet",
      icon: "🔐",
      security: "Maximum Security",
      description: "Physical device that stores keys offline",
      pros: ["Keys never touch internet", "Tamper-resistant", "Industry standard"],
      cons: ["Costs $50-200", "Can be lost/damaged", "Learning curve"],
      recommended: "For serious Bitcoin holders",
      examples: ["Ledger", "Trezor", "ColdCard"]
    },
    {
      type: "Mobile Wallet",
      icon: "📱",
      security: "Good Security",
      description: "App on your phone with key storage",
      pros: ["Convenient", "Easy to use", "Good for spending"],
      cons: ["Phone can be hacked", "Apps can have bugs", "Limited storage"],
      recommended: "For daily spending amounts",
      examples: ["BlueWallet", "Phoenix", "Muun"]
    },
    {
      type: "Desktop Wallet",
      icon: "💻",
      security: "Medium Security",
      description: "Software wallet on your computer",
      pros: ["Full control", "Rich features", "Privacy options"],
      cons: ["Computer vulnerabilities", "Malware risk", "Backup complexity"],
      recommended: "For technical users",
      examples: ["Electrum", "Bitcoin Core", "Wasabi"]
    },
    {
      type: "Paper Wallet",
      icon: "📄",
      security: "High Security (if done right)",
      description: "Keys printed on paper, stored offline",
      pros: ["Completely offline", "Cheap", "Durable if stored well"],
      cons: ["Easy to lose", "Hard to spend from", "Generation risk"],
      recommended: "For long-term storage only",
      examples: ["BitAddress", "Bitcoin Paper Wallet"]
    }
  ];

  const setupSteps = [
    {
      step: 1,
      title: "Choose Your Wallet",
      description: "Pick based on your security needs and technical comfort",
      action: "Research and purchase/download"
    },
    {
      step: 2,
      title: "Generate Seed Phrase",
      description: "Your wallet will create 12-24 random words",
      action: "Write them down on paper, never digital"
    },
    {
      step: 3,
      title: "Verify Seed Phrase",
      description: "Most wallets make you re-enter the words",
      action: "Double-check you wrote them correctly"
    },
    {
      step: 4,
      title: "Secure Backup",
      description: "Store seed phrase in safe, secure location",
      action: "Fireproof safe, bank deposit box, or metal backup"
    },
    {
      step: 5,
      title: "Test Small Amount",
      description: "Send a tiny amount first to verify everything works",
      action: "Practice sending/receiving before large amounts"
    }
  ];

  return (
    <div className="wallet-setup">
      <div className="intro-header">
        <h2>🛡️ Setting Up Your Digital Sovereignty</h2>
        <p className="subtitle">Time to put theory into practice with real Bitcoin security</p>
      </div>

      <div className="prime-text">
        💡 You're ready to become your own bank. This isn't just about software—it's about taking true ownership of your financial future.
      </div>

      <div className="wallet-types">
        <h3>🏆 Choose Your Wallet Type</h3>
        <div className="wallet-grid">
          {walletTypes.map((wallet, index) => (
            <div 
              key={index}
              className={`wallet-card ${selectedWallet === index ? 'active' : ''}`}
              onClick={() => setSelectedWallet(selectedWallet === index ? null : index)}
            >
              <div className="wallet-icon">{wallet.icon}</div>
              <h4>{wallet.type}</h4>
              <div className="wallet-security">{wallet.security}</div>
              <p>{wallet.description}</p>
              
              {selectedWallet === index && (
                <div className="wallet-details">
                  <div className="pros-cons">
                    <div className="pros">
                      <h5>✅ Pros</h5>
                      <ul>
                        {wallet.pros.map((pro, i) => <li key={i}>{pro}</li>)}
                      </ul>
                    </div>
                    <div className="cons">
                      <h5>❌ Cons</h5>
                      <ul>
                        {wallet.cons.map((con, i) => <li key={i}>{con}</li>)}
                      </ul>
                    </div>
                  </div>
                  <div className="wallet-examples">
                    <strong>Examples:</strong> {wallet.examples.join(', ')}
                  </div>
                  <div className="wallet-recommended">
                    <strong>Best for:</strong> {wallet.recommended}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="setup-process">
        <h3>🚀 Wallet Setup Process</h3>
        <div className="setup-steps">
          {setupSteps.map((step, index) => (
            <div key={index} className="setup-step">
              <div className="step-number">{step.step}</div>
              <h4>{step.title}</h4>
              <p>{step.description}</p>
              <div className="step-action">{step.action}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="security-tips-section">
        <h3>🔒 Essential Security Tips</h3>
        <div className="security-tips">
          <div className="security-tip">
            <span>🔥</span>
            <div>Never store seed phrase digitally (no photos, no cloud, no text files)</div>
          </div>
          <div className="security-tip">
            <span>🏠</span>
            <div>Keep backups in multiple secure locations</div>
          </div>
          <div className="security-tip">
            <span>👥</span>
            <div>Tell trusted family member about backup location</div>
          </div>
          <div className="security-tip">
            <span>🧪</span>
            <div>Always test with small amounts first</div>
          </div>
          <div className="security-tip">
            <span>🔄</span>
            <div>Consider multi-signature for large amounts</div>
          </div>
          <div className="security-tip">
            <span>📚</span>
            <div>Education is your best security—keep learning</div>
          </div>
        </div>
      </div>

      <button className="continue-button" onClick={onComplete}>
        Ready for Digital Sovereignty →
        </button>
    </div>
  );
};

// Completion Screen Component
const CompletionScreen = ({ onComplete }) => {
  return (
    <div className="completion-screen">
      <div className="completion-icon">
        <Crown size={72} />
      </div>
      
      <h1>🎉 Congratulations, Digital Sovereign!</h1>
      <p className="subtitle">You've mastered the foundations of Bitcoin key management</p>

      <div className="prime-text">
        💡 You now understand what most of the world doesn't: True ownership isn't about possession—it's about cryptographic proof. You hold the keys to your financial sovereignty.
      </div>

      <div className="completion-stats">
        <div className="stat">
          <span className="stat-number">7</span>
          <span className="stat-label">Core Concepts Mastered</span>
        </div>
        <div className="stat">
          <span className="stat-number">2^256</span>
          <span className="stat-label">Possible Private Keys</span>
        </div>
        <div className="stat">
          <span className="stat-number">∞</span>
          <span className="stat-label">Bitcoin Addresses From One Seed</span>
        </div>
        <div className="stat">
          <span className="stat-number">100%</span>
          <span className="stat-label">Self-Custody Mastery</span>
        </div>
      </div>

      <div className="next-steps">
        <h3>🚀 Your Next Steps</h3>
        <div className="next-actions">
          <div className="action-item">
            <div className="action-icon">🛡️</div>
            <h4>Set Up Your First Real Wallet</h4>
            <p>Apply what you've learned with a hardware or mobile wallet</p>
          </div>
          <div className="action-item">
            <div className="action-icon">🔄</div>
            <h4>Learn About Transactions</h4>
            <p>Discover how to spend your Bitcoin securely</p>
          </div>
          <div className="action-item">
            <div className="action-icon">⚡</div>
            <h4>Explore Lightning Network</h4>
            <p>Enable instant Bitcoin payments</p>
          </div>
          <div className="action-item">
            <div className="action-icon">📚</div>
            <h4>Continue Learning</h4>
            <p>Dive deeper into Bitcoin's technical foundations</p>
          </div>
        </div>
      </div>

      <div className="sovereignty-reminder">
        <h3>🔑 Remember</h3>
        <p><strong>Not your keys, not your coins.</strong> You now have the knowledge to be truly sovereign over your wealth. Use it wisely.</p>
      </div>

      <button className="continue-button" onClick={onComplete}>
        Complete Digital Sovereignty Training ✨
      </button>
    </div>
  );
};

export default KeysModule; 