import React, { useState, useEffect } from 'react';
import { useProgress } from '../contexts/ProgressContext';
import { 
  Wrench, CheckCircle, Trophy, Copy, Hash, Key, 
  Calculator, Search, Activity, Code, Zap, Shield,
  ArrowRight, Info, AlertTriangle, Clock, Settings,
  Layers, Network, Eye, Download, Upload, Target
} from 'lucide-react';
import '../components/ModuleCommon.css';
import './BitcoinToolkitModule.css';

const BitcoinToolkitModule = () => {
  const { completeModule, isModuleCompleted } = useProgress();
  const [currentTool, setCurrentTool] = useState(null);
  const [completedTools, setCompletedTools] = useState(new Set());

  // Tool Categories and Definitions
  const toolCategories = {
    'wallet-tools': {
      title: '🔑 Wallet & Key Tools',
      description: 'Essential tools for wallet creation, key management, and address generation'
    },
    'transaction-tools': {
      title: '💸 Transaction Tools',
      description: 'Build, analyze, and broadcast Bitcoin transactions'
    },
    'network-tools': {
      title: '🌐 Network Analysis',
      description: 'Explore the Bitcoin network, mempool, and blockchain data'
    },
    'dev-tools': {
      title: '⚙️ Developer Tools',
      description: 'Script playground, signature verification, and technical utilities'
    },
    'educational-tools': {
      title: '📚 Educational Simulators',
      description: 'Interactive simulations for learning Bitcoin concepts'
    }
  };

  const bitcoinTools = [
    // Wallet & Key Tools
    {
      id: 'mnemonic-generator',
      category: 'wallet-tools',
      title: 'Mnemonic Seed Generator',
      description: 'Generate and verify BIP39 mnemonic seed phrases with entropy visualization',
      icon: '🗝️',
      difficulty: 2,
      features: ['BIP39 Compliant', 'Entropy Source', 'Verification Test', 'Multiple Languages']
    },
    {
      id: 'hd-wallet-derivation',
      category: 'wallet-tools',
      title: 'HD Wallet Derivation',
      description: 'Derive keys and addresses from master seed using BIP32/44/49/84 standards',
      icon: '🔐',
      difficulty: 3,
      features: ['BIP32/44/49/84', 'Path Explorer', 'Key Visualization', 'Format Comparison']
    },
    {
      id: 'address-generator',
      category: 'wallet-tools',
      title: 'Address Generator',
      description: 'Generate all Bitcoin address types from Legacy to Taproot',
      icon: '📍',
      difficulty: 2,
      features: ['All Address Types', 'QR Codes', 'Format Validation', 'Segwit Support']
    },
    {
      id: 'private-key-tools',
      category: 'wallet-tools',
      title: 'Private Key Tools',
      description: 'Convert between key formats (WIF, hex, decimal) and verify key pairs',
      icon: '🔑',
      difficulty: 3,
      features: ['Format Conversion', 'Key Validation', 'Compressed/Uncompressed', 'Security Check']
    },
    
    // Transaction Tools
    {
      id: 'transaction-builder',
      category: 'transaction-tools',
      title: 'Transaction Builder',
      description: 'Build raw Bitcoin transactions with UTXO selection and fee calculation',
      icon: '🏗️',
      difficulty: 4,
      features: ['UTXO Selection', 'Fee Estimation', 'Raw TX Output', 'Multi-signature']
    },
    {
      id: 'transaction-decoder',
      category: 'transaction-tools',
      title: 'Transaction Decoder',
      description: 'Decode and analyze raw Bitcoin transactions with detailed breakdown',
      icon: '🔍',
      difficulty: 3,
      features: ['Raw TX Input', 'JSON Output', 'Input/Output Analysis', 'Script Decoding']
    },
    {
      id: 'fee-calculator',
      category: 'transaction-tools',
      title: 'Fee Calculator',
      description: 'Calculate optimal fees based on current network conditions and priority',
      icon: '💰',
      difficulty: 2,
      features: ['Real-time Rates', 'Priority Levels', 'Size Estimation', 'Cost Analysis']
    },
    {
      id: 'utxo-analyzer',
      category: 'transaction-tools',
      title: 'UTXO Analyzer',
      description: 'Analyze UTXO sets for optimal coin selection and privacy',
      icon: '🎯',
      difficulty: 3,
      features: ['UTXO Visualization', 'Selection Strategy', 'Privacy Score', 'Consolidation']
    },

    // Network Analysis Tools
    {
      id: 'mempool-explorer',
      category: 'network-tools',
      title: 'Mempool Explorer',
      description: 'Real-time mempool analysis with fee distribution and confirmation estimates',
      icon: '📊',
      difficulty: 2,
      features: ['Live Data', 'Fee Distribution', 'Confirmation Time', 'Network Status']
    },
    {
      id: 'block-explorer',
      category: 'network-tools',
      title: 'Block Explorer',
      description: 'Explore Bitcoin blocks, transactions, and network statistics',
      icon: '🔗',
      difficulty: 2,
      features: ['Block Details', 'TX Lookup', 'Address History', 'Network Stats']
    },
    {
      id: 'network-monitor',
      category: 'network-tools',
      title: 'Network Monitor',
      description: 'Monitor Bitcoin network health, node distribution, and mining stats',
      icon: '🌐',
      difficulty: 3,
      features: ['Node Map', 'Hash Rate', 'Difficulty', 'Lightning Stats']
    },
    {
      id: 'address-tracker',
      category: 'network-tools',
      title: 'Address Tracker',
      description: 'Track Bitcoin addresses with balance, transaction history, and analytics',
      icon: '📈',
      difficulty: 2,
      features: ['Balance Tracking', 'TX History', 'Label Support', 'Export Data']
    },

    // Developer Tools
    {
      id: 'script-playground',
      category: 'dev-tools',
      title: 'Script Playground',
      description: 'Interactive Bitcoin script editor with execution engine and debugger',
      icon: '📝',
      difficulty: 4,
      features: ['Script Editor', 'Stack Execution', 'Debugger', 'Common Scripts']
    },
    {
      id: 'signature-verifier',
      category: 'dev-tools',
      title: 'Signature Verifier',
      description: 'Verify Bitcoin message signatures and create signed messages',
      icon: '✍️',
      difficulty: 3,
      features: ['Message Signing', 'Signature Verification', 'Multiple Formats', 'Batch Process']
    },
    {
      id: 'hash-calculator',
      category: 'dev-tools',
      title: 'Hash Calculator',
      description: 'Calculate various hashes used in Bitcoin (SHA256, RIPEMD160, etc.)',
      icon: '#️⃣',
      difficulty: 2,
      features: ['Multiple Hash Types', 'Text/Hex Input', 'Chain Hashing', 'Merkle Trees']
    },
    {
      id: 'base58-encoder',
      category: 'dev-tools',
      title: 'Base58 Encoder/Decoder',
      description: 'Encode and decode Base58Check used in Bitcoin addresses and keys',
      icon: '🔤',
      difficulty: 2,
      features: ['Base58 Encode/Decode', 'Checksum Validation', 'Batch Processing', 'Error Detection']
    },

    // Educational Simulators
    {
      id: 'mining-simulator',
      category: 'educational-tools',
      title: 'Mining Simulator',
      description: 'Simulate Bitcoin mining with difficulty adjustment and reward calculation',
      icon: '⛏️',
      difficulty: 3,
      features: ['Hash Rate Simulation', 'Difficulty Adjustment', 'Reward Calculation', 'Pool vs Solo']
    },
    {
      id: 'lightning-simulator',
      category: 'educational-tools',
      title: 'Lightning Network Simulator',
      description: 'Simulate Lightning Network channels and payment routing',
      icon: '⚡',
      difficulty: 4,
      features: ['Channel Management', 'Payment Routing', 'Fee Calculation', 'Graph Visualization']
    },
    {
      id: 'privacy-analyzer',
      category: 'educational-tools',
      title: 'Privacy Analyzer',
      description: 'Analyze Bitcoin transactions for privacy leaks and improvement suggestions',
      icon: '🔒',
      difficulty: 3,
      features: ['Privacy Score', 'Leak Detection', 'Improvement Tips', 'CoinJoin Analysis']
    }
  ];

  const handleToolComplete = (toolId) => {
    const newCompletedTools = new Set(completedTools);
    newCompletedTools.add(toolId);
    setCompletedTools(newCompletedTools);

    // Complete module when 8+ tools are completed
    if (newCompletedTools.size >= 8) {
      completeModule('bitcoin-toolkit');
    }
  };

  const renderDifficultyIndicator = (difficulty) => {
    return (
      <div className="difficulty-indicator">
        <span>Difficulty:</span>
        <div className="difficulty-dots">
          {[1, 2, 3, 4, 5].map(level => (
            <div 
              key={level}
              className={`difficulty-dot ${level <= difficulty ? 'active' : ''}`}
            />
          ))}
        </div>
      </div>
    );
  };

  const renderToolCard = (tool) => {
    const isCompleted = completedTools.has(tool.id);
    const isActive = currentTool?.id === tool.id;

    return (
      <div 
        key={tool.id}
        className={`tool-card ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
        onClick={() => setCurrentTool(tool)}
      >
        <div className="tool-header">
          <div className="tool-icon">{tool.icon}</div>
          <div className="tool-info">
            <h3 className="tool-title">{tool.title}</h3>
            <div className="tool-category">{toolCategories[tool.category].title}</div>
          </div>
        </div>
        
        <p className="tool-description">{tool.description}</p>
        
        <div className="tool-features">
          {tool.features.map(feature => (
            <span key={feature} className="feature-tag">{feature}</span>
          ))}
        </div>
        
        <div className="tool-status">
          {renderDifficultyIndicator(tool.difficulty)}
          {isCompleted && (
            <div className="tool-progress">
              <CheckCircle size={16} />
              <span>Completed</span>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderToolInterface = () => {
    if (!currentTool) {
      return (
        <div className="tool-interface">
          <div className="tool-interface-header">
            <div className="tool-interface-title">
              <div className="tool-interface-title">
                <Wrench size={24} />
                <h2>Bitcoin Toolkit Workshop</h2>
              </div>
            </div>
          </div>
          <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
            <div style={{ fontSize: '4rem', marginBottom: '2rem' }}>🛠️</div>
            <h3>Select a Tool to Get Started</h3>
            <p style={{ color: '#94a3b8', maxWidth: '600px', margin: '0 auto' }}>
              Choose any tool from the categories above to start building, analyzing, and exploring Bitcoin.
              Each tool is designed to teach you practical skills while working with real Bitcoin data and concepts.
            </p>
          </div>
        </div>
      );
    }

    // Render specific tool interface based on tool ID
    return renderSpecificTool(currentTool);
  };

  const renderSpecificTool = (tool) => {
    // For this implementation, I'll create a few example tools and placeholder interfaces
    // In a full implementation, each tool would have its own complete interface
    
    switch (tool.id) {
      case 'mnemonic-generator':
        return <MnemonicGeneratorTool tool={tool} onComplete={() => handleToolComplete(tool.id)} />;
      case 'hash-calculator':
        return <HashCalculatorTool tool={tool} onComplete={() => handleToolComplete(tool.id)} />;
      case 'address-generator':
        return <AddressGeneratorTool tool={tool} onComplete={() => handleToolComplete(tool.id)} />;
      case 'transaction-decoder':
        return <TransactionDecoderTool tool={tool} onComplete={() => handleToolComplete(tool.id)} />;
      case 'fee-calculator':
        return <FeeCalculatorTool tool={tool} onComplete={() => handleToolComplete(tool.id)} />;
      default:
        return <PlaceholderTool tool={tool} onComplete={() => handleToolComplete(tool.id)} />;
    }
  };

  return (
    <div className="module-container toolkit-module">
      <div className="toolkit-content">
        <div className="toolkit-header">
          <h1 className="toolkit-title">
            Bitcoin Developer Toolkit
          </h1>
          <p className="toolkit-subtitle">
            Professional Tools for Bitcoin Development & Analysis
          </p>
          <div className="toolkit-description">
            Master Bitcoin through hands-on practice with professional-grade tools. 
            Build transactions, analyze scripts, explore the network, and develop real Bitcoin applications.
          </div>
          {isModuleCompleted('bitcoin-toolkit') && (
            <div className="completion-badge">
              <Trophy size={24} />
              <span>Toolkit Mastery Achieved!</span>
            </div>
          )}
          <div style={{ fontSize: '0.9rem', color: '#94a3b8', marginTop: '1rem' }}>
            Complete 8+ tools to master the Bitcoin Toolkit • {completedTools.size}/{bitcoinTools.length} tools completed
          </div>
        </div>

        {/* Tools by Category */}
        {Object.entries(toolCategories).map(([categoryKey, categoryInfo]) => (
          <div key={categoryKey} className="category-section">
            <div className="category-header">
              <div className="category-icon">{categoryInfo.title.split(' ')[0]}</div>
              <div>
                <h2 className="category-title">{categoryInfo.title.substring(2)}</h2>
                <p className="category-description">{categoryInfo.description}</p>
              </div>
            </div>
            <div className="tools-grid">
              {bitcoinTools
                .filter(tool => tool.category === categoryKey)
                .map(renderToolCard)}
            </div>
          </div>
        ))}

        {/* Tool Interface */}
        {renderToolInterface()}

        {/* Progress Summary */}
        <div className="category-section">
          <div className="category-header">
            <div className="category-icon">🏆</div>
            <div>
              <h2 className="category-title">Your Progress</h2>
              <p className="category-description">Track your journey to Bitcoin toolkit mastery</p>
            </div>
          </div>
          <div className="output-panel">
            <div className="output-header">
              <div className="output-title">Achievement Progress</div>
            </div>
            <div style={{ padding: '1rem' }}>
              <div style={{ marginBottom: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span>Tools Completed</span>
                  <span>{completedTools.size}/{bitcoinTools.length}</span>
                </div>
                <div style={{ background: 'rgba(100, 116, 139, 0.2)', borderRadius: '8px', height: '8px' }}>
                  <div 
                    style={{ 
                      background: '#10b981', 
                      height: '100%', 
                      borderRadius: '8px',
                      width: `${(completedTools.size / bitcoinTools.length) * 100}%`,
                      transition: 'width 0.3s ease'
                    }}
                  />
                </div>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                {[
                  { threshold: 3, title: 'Tool Explorer', desc: 'Complete 3+ tools' },
                  { threshold: 6, title: 'Bitcoin Builder', desc: 'Complete 6+ tools' },
                  { threshold: 8, title: 'Toolkit Master', desc: 'Complete 8+ tools' },
                  { threshold: 12, title: 'Bitcoin Developer', desc: 'Complete 12+ tools' }
                ].map(achievement => (
                  <div 
                    key={achievement.threshold}
                    className={`status-indicator ${completedTools.size >= achievement.threshold ? 'status-success' : 'status-info'}`}
                  >
                    {completedTools.size >= achievement.threshold ? <CheckCircle size={16} /> : <Target size={16} />}
                    <div>
                      <div style={{ fontWeight: '600' }}>{achievement.title}</div>
                      <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>{achievement.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Individual Tool Components
const MnemonicGeneratorTool = ({ tool, onComplete }) => {
  const [mnemonic, setMnemonic] = useState('');
  const [wordCount, setWordCount] = useState(12);
  const [showValidation, setShowValidation] = useState(false);

  const generateMnemonic = () => {
    // Mock BIP39 words for demonstration
    const mockWords = [
      'abandon', 'ability', 'able', 'about', 'above', 'absent', 'absorb', 'abstract',
      'absurd', 'abuse', 'access', 'accident', 'account', 'accuse', 'achieve', 'acid',
      'acoustic', 'acquire', 'across', 'act', 'action', 'actor', 'actress', 'actual'
    ];
    
    const generatedWords = Array(wordCount).fill(null).map(() => 
      mockWords[Math.floor(Math.random() * mockWords.length)]
    );
    
    setMnemonic(generatedWords.join(' '));
    setShowValidation(false);
  };

  const validateMnemonic = () => {
    setShowValidation(true);
    // In a real implementation, this would validate using BIP39
    setTimeout(() => onComplete(), 1000);
  };

  return (
    <div className="tool-interface">
      <div className="tool-interface-header">
        <div className="tool-interface-title">
          <span style={{ fontSize: '2rem' }}>{tool.icon}</span>
          <h2>{tool.title}</h2>
        </div>
        <div className="tool-controls">
          <button className="tool-button primary" onClick={generateMnemonic}>
            <Hash size={16} />
            Generate Seed
          </button>
        </div>
      </div>

      <div className="tool-form">
        <div className="form-group">
          <label className="form-label">Word Count</label>
          <select 
            className="form-select" 
            value={wordCount} 
            onChange={(e) => setWordCount(parseInt(e.target.value))}
          >
            <option value={12}>12 words</option>
            <option value={15}>15 words</option>
            <option value={18}>18 words</option>
            <option value={21}>21 words</option>
            <option value={24}>24 words</option>
          </select>
        </div>
      </div>

      {mnemonic && (
        <div className="output-panel">
          <div className="output-header">
            <div className="output-title">Generated Mnemonic Seed</div>
            <button className="copy-button" onClick={() => navigator.clipboard.writeText(mnemonic)}>
              <Copy size={14} />
              Copy
            </button>
          </div>
          <div className="output-content">
            {mnemonic.split(' ').map((word, index) => (
              <span key={index} style={{ 
                display: 'inline-block', 
                margin: '0.25rem',
                padding: '0.5rem 0.75rem',
                background: 'rgba(59, 130, 246, 0.1)',
                border: '1px solid rgba(59, 130, 246, 0.2)',
                borderRadius: '6px',
                color: '#3b82f6'
              }}>
                {index + 1}. {word}
              </span>
            ))}
          </div>
        </div>
      )}

      {mnemonic && (
        <div style={{ marginTop: '2rem' }}>
          <button className="tool-button success" onClick={validateMnemonic}>
            <CheckCircle size={16} />
            Validate & Complete
          </button>
          {showValidation && (
            <div className="status-indicator status-success" style={{ marginLeft: '1rem' }}>
              <CheckCircle size={16} />
              Valid BIP39 mnemonic generated!
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const HashCalculatorTool = ({ tool, onComplete }) => {
  const [input, setInput] = useState('');
  const [hashType, setHashType] = useState('sha256');
  const [result, setResult] = useState('');
  const [inputType, setInputType] = useState('text');

  const calculateHash = () => {
    // Mock hash calculation for demonstration
    const mockHash = '0123456789abcdef'.repeat(hashType === 'sha256' ? 4 : 2);
    setResult(mockHash);
    onComplete();
  };

  return (
    <div className="tool-interface">
      <div className="tool-interface-header">
        <div className="tool-interface-title">
          <span style={{ fontSize: '2rem' }}>{tool.icon}</span>
          <h2>{tool.title}</h2>
        </div>
        <div className="tool-controls">
          <button className="tool-button primary" onClick={calculateHash} disabled={!input}>
            <Hash size={16} />
            Calculate Hash
          </button>
        </div>
      </div>

      <div className="tool-form">
        <div className="form-group">
          <label className="form-label">Hash Function</label>
          <select className="form-select" value={hashType} onChange={(e) => setHashType(e.target.value)}>
            <option value="sha256">SHA-256</option>
            <option value="sha256d">SHA-256d (Double SHA-256)</option>
            <option value="ripemd160">RIPEMD-160</option>
            <option value="hash160">Hash160 (SHA-256 + RIPEMD-160)</option>
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Input Type</label>
          <select className="form-select" value={inputType} onChange={(e) => setInputType(e.target.value)}>
            <option value="text">Text</option>
            <option value="hex">Hexadecimal</option>
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Input Data</label>
          <textarea 
            className="form-input form-textarea"
            placeholder={inputType === 'text' ? 'Enter text to hash...' : 'Enter hex data (without 0x prefix)...'}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
      </div>

      {result && (
        <div className="output-panel">
          <div className="output-header">
            <div className="output-title">{hashType.toUpperCase()} Hash Result</div>
            <button className="copy-button" onClick={() => navigator.clipboard.writeText(result)}>
              <Copy size={14} />
              Copy
            </button>
          </div>
          <div className="output-content output-hash">
            {result}
          </div>
        </div>
      )}
    </div>
  );
};

const AddressGeneratorTool = ({ tool, onComplete }) => {
  const [addressType, setAddressType] = useState('p2pkh');
  const [publicKey, setPublicKey] = useState('');
  const [address, setAddress] = useState('');

  const generateAddress = () => {
    // Mock address generation
    const mockAddresses = {
      'p2pkh': '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
      'p2sh': '3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy',
      'p2wpkh': 'bc1qw508d6qejxtdg4y5r3zarvary0c5xw7kv8f3t4',
      'p2tr': 'bc1p5d7rjq7g6rdk2yhzks9smlaqtedr4dekq08ge8ztwac72sfr9rusxg3297'
    };
    setAddress(mockAddresses[addressType]);
    onComplete();
  };

  return (
    <div className="tool-interface">
      <div className="tool-interface-header">
        <div className="tool-interface-title">
          <span style={{ fontSize: '2rem' }}>{tool.icon}</span>
          <h2>{tool.title}</h2>
        </div>
        <div className="tool-controls">
          <button className="tool-button primary" onClick={generateAddress}>
            <Key size={16} />
            Generate Address
          </button>
        </div>
      </div>

      <div className="tool-form">
        <div className="form-group">
          <label className="form-label">Address Type</label>
          <select className="form-select" value={addressType} onChange={(e) => setAddressType(e.target.value)}>
            <option value="p2pkh">P2PKH (Legacy)</option>
            <option value="p2sh">P2SH (Script Hash)</option>
            <option value="p2wpkh">P2WPKH (Native SegWit)</option>
            <option value="p2tr">P2TR (Taproot)</option>
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Public Key (optional)</label>
          <input 
            className="form-input"
            placeholder="Enter public key or leave empty for random generation"
            value={publicKey}
            onChange={(e) => setPublicKey(e.target.value)}
          />
        </div>
      </div>

      {address && (
        <div className="output-panel">
          <div className="output-header">
            <div className="output-title">Generated Address</div>
            <button className="copy-button" onClick={() => navigator.clipboard.writeText(address)}>
              <Copy size={14} />
              Copy
            </button>
          </div>
          <div className="output-content output-address">
            {address}
          </div>
        </div>
      )}
    </div>
  );
};

const TransactionDecoderTool = ({ tool, onComplete }) => {
  const [rawTx, setRawTx] = useState('');
  const [decodedTx, setDecodedTx] = useState(null);

  const decodeTx = () => {
    // Mock transaction decoding
    const mockDecoded = {
      txid: 'f4184fc596403b9d638783cf57adfe4c75c605f6356fbc91338530e9831e9e16',
      version: 1,
      locktime: 0,
      size: 275,
      vsize: 275,
      inputs: [
        {
          txid: '0e3e2357e806b6cdb1f70b54c3a3a17b6714ee1f0e68bebb44a74b1efd512098',
          vout: 0,
          scriptSig: '304502...21025c...',
          sequence: 4294967295
        }
      ],
      outputs: [
        {
          value: 1000000000,
          scriptPubKey: '76a914...88ac',
          address: '1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2'
        }
      ]
    };
    setDecodedTx(mockDecoded);
    onComplete();
  };

  return (
    <div className="tool-interface">
      <div className="tool-interface-header">
        <div className="tool-interface-title">
          <span style={{ fontSize: '2rem' }}>{tool.icon}</span>
          <h2>{tool.title}</h2>
        </div>
        <div className="tool-controls">
          <button className="tool-button primary" onClick={decodeTx} disabled={!rawTx}>
            <Search size={16} />
            Decode Transaction
          </button>
        </div>
      </div>

      <div className="tool-form">
        <div className="form-group">
          <label className="form-label">Raw Transaction (Hex)</label>
          <textarea 
            className="form-input form-textarea"
            placeholder="Enter raw transaction hex..."
            value={rawTx}
            onChange={(e) => setRawTx(e.target.value)}
          />
        </div>
      </div>

      {decodedTx && (
        <div className="output-panel">
          <div className="output-header">
            <div className="output-title">Decoded Transaction</div>
            <button className="copy-button" onClick={() => navigator.clipboard.writeText(JSON.stringify(decodedTx, null, 2))}>
              <Copy size={14} />
              Copy JSON
            </button>
          </div>
          <div className="output-content output-json">
            {JSON.stringify(decodedTx, null, 2)}
          </div>
        </div>
      )}
    </div>
  );
};

const FeeCalculatorTool = ({ tool, onComplete }) => {
  const [txSize, setTxSize] = useState(250);
  const [priority, setPriority] = useState('medium');
  const [feeResult, setFeeResult] = useState(null);

  const calculateFee = () => {
    const feeRates = {
      low: 1,
      medium: 10,
      high: 20
    };
    
    const satoshisPerByte = feeRates[priority];
    const totalFee = txSize * satoshisPerByte;
    
    setFeeResult({
      satoshisPerByte,
      totalSatoshis: totalFee,
      totalBTC: totalFee / 100000000,
      priority
    });
    onComplete();
  };

  return (
    <div className="tool-interface">
      <div className="tool-interface-header">
        <div className="tool-interface-title">
          <span style={{ fontSize: '2rem' }}>{tool.icon}</span>
          <h2>{tool.title}</h2>
        </div>
        <div className="tool-controls">
          <button className="tool-button primary" onClick={calculateFee}>
            <Calculator size={16} />
            Calculate Fee
          </button>
        </div>
      </div>

      <div className="tool-form">
        <div className="form-group">
          <label className="form-label">Transaction Size (bytes)</label>
          <input 
            type="number"
            className="form-input"
            value={txSize}
            onChange={(e) => setTxSize(parseInt(e.target.value))}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Priority Level</label>
          <select className="form-select" value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option value="low">Low Priority (1 sat/byte)</option>
            <option value="medium">Medium Priority (10 sat/byte)</option>
            <option value="high">High Priority (20 sat/byte)</option>
          </select>
        </div>
      </div>

      {feeResult && (
        <div className="output-panel">
          <div className="output-header">
            <div className="output-title">Fee Calculation Result</div>
          </div>
          <div className="output-content">
            <div style={{ display: 'grid', gap: '1rem' }}>
              <div>Fee Rate: {feeResult.satoshisPerByte} sat/byte</div>
              <div>Total Fee: {feeResult.totalSatoshis} satoshis</div>
              <div>Total Fee: {feeResult.totalBTC.toFixed(8)} BTC</div>
              <div>Priority: {feeResult.priority}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const PlaceholderTool = ({ tool, onComplete }) => {
  return (
    <div className="tool-interface">
      <div className="tool-interface-header">
        <div className="tool-interface-title">
          <span style={{ fontSize: '2rem' }}>{tool.icon}</span>
          <h2>{tool.title}</h2>
        </div>
        <div className="tool-controls">
          <button className="tool-button primary" onClick={onComplete}>
            <CheckCircle size={16} />
            Mark Complete
          </button>
        </div>
      </div>

      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{tool.icon}</div>
        <h3>{tool.title}</h3>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>{tool.description}</p>
        
        <div className="tool-features" style={{ justifyContent: 'center', marginBottom: '2rem' }}>
          {tool.features.map(feature => (
            <span key={feature} className="feature-tag">{feature}</span>
          ))}
        </div>

        <div className="status-indicator status-info">
          <Info size={16} />
          This tool interface is under development. Full functionality coming soon!
        </div>
      </div>
    </div>
  );
};

export default BitcoinToolkitModule; 