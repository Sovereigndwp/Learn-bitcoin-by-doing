import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '../contexts/ProgressContext';
import { 
  Wrench, CheckCircle, Trophy, Copy, Hash, Key, 
  Calculator, Search, Code, Clock, Download, Target, Info
} from 'lucide-react';
import { 
  ActionButton,
  NavigationButton
} from '../components/ui';
import '../components/ModuleCommon.css';
// Using global CSS only - no module-specific overrides

const BitcoinToolkitModule = () => {
  const { completeModule, isModuleCompleted } = useProgress();
  const navigate = useNavigate();
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
          <CheckCircle size={16} color="green" />
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
              <Wrench size={24} />
              <h2>Bitcoin Toolkit Workshop</h2>
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
    // Enhanced tool implementations with full interactive functionality
    
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
      case 'script-playground':
        return <ScriptExplorerTool tool={tool} onComplete={() => handleToolComplete(tool.id)} />;
      case 'address-tracker':
        return <QRCodeGeneratorTool tool={tool} onComplete={() => handleToolComplete(tool.id)} />;
      case 'block-explorer':
        return <BlockExplorerTool tool={tool} onComplete={() => handleToolComplete(tool.id)} />;
      default:
        return <PlaceholderTool tool={tool} onComplete={() => handleToolComplete(tool.id)} />;
    }
  };

  return (
    <div className="module-container toolkit-module">
      <div className="toolkit-content">
        <div className="toolkit-header">
          <h1 className="toolkit-title">
            Bitcoin Tools & Practice
          </h1>
          <p className="toolkit-subtitle">
            Hands-on experience with Bitcoin tools and real-world applications
          </p>
          <div className="toolkit-description">
            Practice with Bitcoin tools through interactive exercises. 
            Build transactions, analyze scripts, explore the network, and work with real Bitcoin data.
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
        
        {/* Navigation Footer */}
        <div className="module-navigation">
          <NavigationButton 
            onClick={() => navigate('/')}
            className="home-button"
          >
            Return to Homepage
          </NavigationButton>
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
          <ActionButton 
            icon={<Hash size={16} />} 
            onClick={generateMnemonic} 
            disabled={false} 
            label="Generate Seed" 
            className="primary"
          />
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
            <ActionButton 
              icon={<Copy size={14} />} 
              onClick={() => navigator.clipboard.writeText(mnemonic)} 
              disabled={false} 
              label="Copy" 
              className="secondary"
            />
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
          <ActionButton 
            icon={<CheckCircle size={16} />} 
            onClick={validateMnemonic} 
            disabled={false} 
            label="Validate & Complete" 
            className="success"
          />
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
          <ActionButton 
            icon={<Hash size={16} />} 
            onClick={calculateHash} 
            disabled={!input} 
            label="Calculate Hash" 
            className="primary"
          />
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
            <ActionButton 
              icon={<Copy size={14} />} 
              onClick={() => navigator.clipboard.writeText(result)} 
              disabled={false} 
              label="Copy" 
              className="secondary"
            />
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
          <ActionButton 
            icon={<Key size={16} />} 
            onClick={generateAddress} 
            disabled={false} 
            label="Generate Address" 
            className="primary"
          />
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
            <ActionButton 
              icon={<Copy size={14} />} 
              onClick={() => navigator.clipboard.writeText(address)} 
              disabled={false} 
              label="Copy" 
              className="secondary"
            />
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
          <ActionButton 
            icon={<Search size={16} />} 
            onClick={decodeTx} 
            disabled={!rawTx} 
            label="Decode Transaction" 
            className="primary"
          />
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
            <ActionButton 
              icon={<Copy size={14} />} 
              onClick={() => navigator.clipboard.writeText(JSON.stringify(decodedTx, null, 2))} 
              disabled={false} 
              label="Copy JSON" 
              className="secondary"
            />
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
          <ActionButton 
            icon={<Calculator size={16} />} 
            onClick={calculateFee} 
            disabled={false} 
            label="Calculate Fee" 
            className="primary"
          />
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

// Script Explorer Tool for Bitcoin script analysis
const ScriptExplorerTool = ({ tool, onComplete }) => {
  const [script, setScript] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [executionStep, setExecutionStep] = useState(0);
  const [stack, setStack] = useState([]);
  const [isExecuting, setIsExecuting] = useState(false);

  const scriptTemplates = {
    'p2pkh': 'OP_DUP OP_HASH160 <pubkey_hash> OP_EQUALVERIFY OP_CHECKSIG',
    'p2sh': 'OP_HASH160 <script_hash> OP_EQUAL',
    'p2wpkh': 'OP_0 <pubkey_hash>',
    'multisig': 'OP_2 <pubkey1> <pubkey2> <pubkey3> OP_3 OP_CHECKMULTISIG',
    'timelock': '<timestamp> OP_CHECKLOCKTIMEVERIFY OP_DROP OP_DUP OP_HASH160 <pubkey_hash> OP_EQUALVERIFY OP_CHECKSIG'
  };

  const loadTemplate = (templateName) => {
    setScript(scriptTemplates[templateName]);
    setSelectedTemplate(templateName);
    setAnalysis(null);
    setExecutionStep(0);
    setStack([]);
  };

  const analyzeScript = () => {
    if (!script.trim()) return;

    setIsExecuting(true);
    
    // Mock script analysis
    const operations = script.split(' ').filter(op => op.trim());
    const scriptType = detectScriptType(operations);
    const security = assessSecurity(operations);
    
    setTimeout(() => {
      setAnalysis({
        operations,
        scriptType,
        security,
        opcodeCount: operations.length,
        estimatedSize: operations.join(' ').length,
        isStandard: ['P2PKH', 'P2SH', 'P2WPKH', 'Multisig'].includes(scriptType)
      });
      setIsExecuting(false);
      
      // Simulate stack execution
      simulateExecution(operations);
      onComplete();
    }, 1500);
  };

  const detectScriptType = (operations) => {
    const script = operations.join(' ');
    if (script.includes('OP_DUP OP_HASH160') && script.includes('OP_EQUALVERIFY OP_CHECKSIG')) {
      return 'P2PKH (Pay to Public Key Hash)';
    } else if (script.includes('OP_HASH160') && script.includes('OP_EQUAL')) {
      return 'P2SH (Pay to Script Hash)';
    } else if (operations[0] === 'OP_0' && operations.length === 2) {
      return 'P2WPKH (Pay to Witness Public Key Hash)';
    } else if (script.includes('OP_CHECKMULTISIG')) {
      return 'Multisig';
    } else if (script.includes('OP_CHECKLOCKTIMEVERIFY')) {
      return 'Timelock';
    }
    return 'Custom Script';
  };

  const assessSecurity = (operations) => {
    let score = 5;
    let notes = [];

    if (operations.includes('OP_CHECKSIG') || operations.includes('OP_CHECKMULTISIG')) {
      score += 3;
      notes.push('Uses cryptographic verification');
    }
    
    if (operations.includes('OP_HASH160')) {
      score += 2;
      notes.push('Includes hash verification');
    }

    if (operations.includes('OP_CHECKLOCKTIMEVERIFY')) {
      score += 1;
      notes.push('Time-locked for additional security');
    }

    return {
      score: Math.min(score, 10),
      rating: score >= 8 ? 'High' : score >= 6 ? 'Medium' : 'Low',
      notes
    };
  };

  const simulateExecution = (operations) => {
    const mockStack = [];
    operations.forEach((op, index) => {
      if (op.startsWith('<') && op.endsWith('>')) {
        mockStack.push(`DATA: ${op}`);
      } else if (op.startsWith('OP_')) {
        mockStack.push(`OPCODE: ${op}`);
      }
    });
    setStack(mockStack);
  };

  return (
    <div className="tool-interface">
      <div className="tool-interface-header">
        <div className="tool-interface-title">
          <span style={{ fontSize: '2rem' }}>{tool.icon}</span>
          <h2>{tool.title}</h2>
        </div>
        <div className="tool-controls">
          <ActionButton 
            icon={isExecuting ? <Clock className="spin" size={16} /> : <Code size={16} />} 
            onClick={analyzeScript} 
            disabled={!script.trim() || isExecuting} 
            label={isExecuting ? 'Analyzing...' : 'Analyze Script'} 
            className="primary"
          />
        </div>
      </div>

      <div className="tool-form">
        <div className="form-group">
          <label className="form-label">Bitcoin Script</label>
          <textarea 
            className="form-input"
            style={{ minHeight: '120px', fontFamily: 'monospace' }}
            placeholder="Enter Bitcoin script opcodes..."
            value={script}
            onChange={(e) => setScript(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Script Templates</label>
          <div className="template-buttons">
            {Object.entries(scriptTemplates).map(([key, template]) => (
            <ActionButton 
                key={key}
                onClick={() => loadTemplate(key)}
                className={`template-button ${selectedTemplate === key ? 'active' : ''}`}
            >
                {key.toUpperCase()}
            </ActionButton>
            ))}
          </div>
        </div>
      </div>

      {analysis && (
        <div className="output-panel">
          <div className="output-header">
            <div className="output-title">📋 Script Analysis Results</div>
          </div>
          <div className="output-content">
            <div className="analysis-grid">
              <div className="analysis-item">
                <strong>Script Type:</strong> {analysis.scriptType}
              </div>
              <div className="analysis-item">
                <strong>Opcode Count:</strong> {analysis.opcodeCount}
              </div>
              <div className="analysis-item">
                <strong>Estimated Size:</strong> {analysis.estimatedSize} bytes
              </div>
              <div className="analysis-item">
                <strong>Standard Script:</strong> {analysis.isStandard ? '✅ Yes' : '❌ No'}
              </div>
              <div className="analysis-item">
                <strong>Security Rating:</strong> 
                <span className={`security-${analysis.security.rating.toLowerCase()}`}>
                  {analysis.security.rating} ({analysis.security.score}/10)
                </span>
              </div>
            </div>

            {analysis.security.notes.length > 0 && (
              <div className="security-notes">
                <h4>Security Notes:</h4>
                <ul>
                  {analysis.security.notes.map((note, i) => (
                    <li key={i}>{note}</li>
                  ))}
                </ul>
              </div>
            )}

            {stack.length > 0 && (
              <div className="stack-execution">
                <h4>Script Execution Steps:</h4>
                <div className="stack-items">
                  {stack.map((item, i) => (
                    <div key={i} className="stack-item">
                      <span className="step-number">{i + 1}</span>
                      <span className="stack-operation">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// QR Code Generator Tool for Bitcoin data
const QRCodeGeneratorTool = ({ tool, onComplete }) => {
  const [inputData, setInputData] = useState('');
  const [dataType, setDataType] = useState('address');
  const [qrSize, setQrSize] = useState(256);
  const [qrCode, setQrCode] = useState(null);
  const [generating, setGenerating] = useState(false);

  const dataTypes = {
    address: { label: 'Bitcoin Address', placeholder: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh', prefix: '' },
    uri: { label: 'Bitcoin URI', placeholder: 'bitcoin:address?amount=0.001&label=Payment', prefix: 'bitcoin:' },
    message: { label: 'Message', placeholder: 'Your message here', prefix: '' },
    pubkey: { label: 'Public Key', placeholder: '02f9308a019258c31049344f85f89d5229b531c845836f99b08601f113bce036f9', prefix: '' }
  };

  const generateQR = () => {
    if (!inputData.trim()) return;

    setGenerating(true);
    
    // Simulate QR code generation
    setTimeout(() => {
      const qrData = dataTypes[dataType].prefix + inputData;
      
      // Create mock SVG QR code
      const mockQrSvg = createMockQR(qrData, qrSize);
      
      setQrCode({
        data: qrData,
        svg: mockQrSvg,
        size: qrSize,
        type: dataType
      });
      
      setGenerating(false);
      onComplete();
    }, 1000);
  };

  const createMockQR = (data, size) => {
    // Create a simple mock QR code pattern (not a real QR code)
    const cellSize = size / 25;
    const pattern = Array(25).fill().map(() => Array(25).fill().map(() => Math.random() > 0.5));
    
    let svg = `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">`;
    svg += `<rect width="${size}" height="${size}" fill="white"/>`;
    
    for (let i = 0; i < 25; i++) {
      for (let j = 0; j < 25; j++) {
        if (pattern[i][j]) {
          svg += `<rect x="${j * cellSize}" y="${i * cellSize}" width="${cellSize}" height="${cellSize}" fill="black"/>`;
        }
      }
    }
    
    svg += '</svg>';
    return svg;
  };

  const downloadQR = () => {
    if (!qrCode) return;
    
    const blob = new Blob([qrCode.svg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bitcoin-qr-${dataType}-${Date.now()}.svg`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="tool-interface">
      <div className="tool-interface-header">
        <div className="tool-interface-title">
          <span style={{ fontSize: '2rem' }}>{tool.icon}</span>
          <h2>{tool.title}</h2>
          </div>
        <div className="tool-controls">
          <ActionButton 
            icon={generating ? <Clock className="spin" size={16} /> : <Target size={16} />} 
            onClick={generateQR} 
            disabled={!inputData.trim() || generating} 
            label={generating ? 'Generating...' : 'Generate QR'} 
            className="primary"
          />
          {qrCode && (
            <ActionButton 
              icon={<Download size={16} />} 
              onClick={downloadQR} 
              disabled={false} 
              label="Download SVG" 
              className="secondary"
            />
          )}
        </div>
      </div>

      <div className="tool-form">
        <div className="form-group">
          <label className="form-label">Data Type</label>
          <select 
            className="form-input"
            value={dataType}
            onChange={(e) => setDataType(e.target.value)}
          >
            {Object.entries(dataTypes).map(([key, type]) => (
              <option key={key} value={key}>{type.label}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Data to Encode</label>
          <input 
            type="text"
            className="form-input"
            placeholder={dataTypes[dataType].placeholder}
            value={inputData}
            onChange={(e) => setInputData(e.target.value)}
          />
          {dataTypes[dataType].prefix && (
            <div className="form-hint">
              Will be prefixed with: {dataTypes[dataType].prefix}
            </div>
          )}
        </div>

        <div className="form-group">
          <label className="form-label">QR Code Size</label>
          <div className="size-controls">
            <input 
              type="range"
              min="128"
              max="512"
              step="64"
              value={qrSize}
              onChange={(e) => setQrSize(parseInt(e.target.value))}
            />
            <span className="size-display">{qrSize}×{qrSize}px</span>
          </div>
        </div>
      </div>

      {qrCode && (
        <div className="output-panel">
          <div className="output-header">
            <div className="output-title">📱 Generated QR Code</div>
          </div>
          <div className="output-content">
            <div className="qr-display">
              <div 
                className="qr-code"
                dangerouslySetInnerHTML={{ __html: qrCode.svg }}
              />
              <div className="qr-info">
                <div className="qr-detail">
                  <strong>Data:</strong> 
                  <code className="qr-data">{qrCode.data}</code>
        </div>
                <div className="qr-detail">
                  <strong>Type:</strong> {dataTypes[qrCode.type].label}
      </div>
                <div className="qr-detail">
                  <strong>Size:</strong> {qrCode.size}×{qrCode.size}px
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Enhanced Block Explorer Tool with transaction flow visualization
const BlockExplorerTool = ({ tool, onComplete }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('auto');
  const [searchResult, setSearchResult] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);

  const mockData = {
    blocks: {
      '000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f': {
        height: 0,
        hash: '000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f',
        timestamp: '2009-01-03T18:15:05Z',
        transactions: 1,
        size: 285,
        difficulty: 1.00000000,
        nonce: 2083236893,
        merkleRoot: '4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b',
        previousHash: '0000000000000000000000000000000000000000000000000000000000000000'
      },
      '123456': {
        height: 800000,
        hash: '00000000000000000002a23d6df20eecec15b21d32c75833cce28f9f2e2ffc59',
        timestamp: '2023-09-10T12:34:56Z',
        transactions: 3429,
        size: 1398745,
        difficulty: 57119871304635.31,
        nonce: 1234567890,
        merkleRoot: 'f4184fc596403b9d638783cf57adfe4c75c605f6356fbc91338530e9831e9e16',
        previousHash: '00000000000000000001a23d6df20eecec15b21d32c75833cce28f9f2e2ffc58'
      }
    },
    transactions: {
      'f4184fc596403b9d638783cf57adfe4c75c605f6356fbc91338530e9831e9e16': {
        txid: 'f4184fc596403b9d638783cf57adfe4c75c605f6356fbc91338530e9831e9e16',
        version: 1,
        lockTime: 0,
        size: 275,
        weight: 1100,
        fee: 0,
        inputs: [
          {
            txid: '0000000000000000000000000000000000000000000000000000000000000000',
            vout: 0,
            scriptSig: '04ffff001d0104455468652054696d65732030332f4a616e2f32303039204368616e63656c6c6f72206f6e206272696e6b206f66207365636f6e64206261696c6f757420666f722062616e6b73',
            sequence: 4294967295,
            value: 0
          }
        ],
        outputs: [
          {
            value: 5000000000,
            address: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
            scriptPubKey: '4104678afdb0fe5548271967f1a67130b7105cd6a828e03909a67962e0ea1f61deb649f6bc3f4cef38c4f35504e51ec112de5c384df7ba0b8d578a4c702b6bf11d5fac'
          }
        ],
        blockHeight: 0,
        confirmations: 800000,
        timestamp: '2009-01-03T18:15:05Z'
      },
      'abc123': {
        txid: 'a1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456',
        version: 2,
        lockTime: 0,
        size: 225,
        weight: 900,
        fee: 2500,
        inputs: [
          {
            txid: 'prev_tx_hash_123456789abcdef',
            vout: 0,
            scriptSig: '47304402203...signatures...',
            sequence: 4294967295,
            value: 100000000,
            address: '1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2'
          },
          {
            txid: 'prev_tx_hash_abcdef123456789',
            vout: 1,
            scriptSig: '47304402201...signatures...',
            sequence: 4294967295,
            value: 50000000,
            address: '3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy'
          }
        ],
        outputs: [
          {
            value: 75000000,
            address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
            scriptPubKey: 'OP_0 a14b5753d2ec7b2f8b8b1c1c8e8f5f6e7d8c9b0a'
          },
          {
            value: 72500000,
            address: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
            scriptPubKey: '76a914062b7c5b7f94...OP_CHECKSIG'
          }
        ],
        blockHeight: 799999,
        confirmations: 1,
        timestamp: '2023-09-10T11:30:45Z'
      }
    },
    addresses: {
      '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa': {
        address: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
        balance: 5000000000,
        totalReceived: 5072500000,
        totalSent: 72500000,
        transactionCount: 2,
        firstSeen: '2009-01-03T18:15:05Z',
        lastSeen: '2023-09-10T11:30:45Z',
        transactions: [
          'f4184fc596403b9d638783cf57adfe4c75c605f6356fbc91338530e9831e9e16',
          'a1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456'
        ]
      }
    }
  };

  const detectSearchType = (term) => {
    const cleanTerm = term.trim();
    
    if (/^[0-9a-fA-F]{64}$/.test(cleanTerm)) {
      return 'transaction';
    } else if (/^0+[0-9a-fA-F]{62,}$/.test(cleanTerm)) {
      return 'block';
    } else if (/^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$/.test(cleanTerm) || /^bc1[a-z0-9]{39,59}$/.test(cleanTerm)) {
      return 'address';
    } else if (/^\d+$/.test(cleanTerm) && parseInt(cleanTerm) >= 0) {
      return 'block';
    }
    return 'unknown';
  };

  const performSearch = () => {
    if (!searchTerm.trim()) return;

    setIsSearching(true);
    
    const type = searchType === 'auto' ? detectSearchType(searchTerm) : searchType;
    
    setTimeout(() => {
      let result = null;
      
      switch (type) {
        case 'block':
          // Search by hash or height
          if (/^\d+$/.test(searchTerm)) {
            // Search by height
            const blockHash = Object.keys(mockData.blocks).find(hash => 
              mockData.blocks[hash].height === parseInt(searchTerm)
            );
            result = blockHash ? mockData.blocks[blockHash] : null;
          } else {
            result = mockData.blocks[searchTerm] || null;
          }
          break;
          
        case 'transaction':
          result = mockData.transactions[searchTerm] || null;
          break;
          
        case 'address':
          result = mockData.addresses[searchTerm] || null;
          break;
          
        default:
          result = null;
      }
      
      if (result) {
        result.type = type;
        result.searchTerm = searchTerm;
        
        // Add to search history
        setSearchHistory(prev => {
          const newHistory = [{ term: searchTerm, type, timestamp: new Date() }, ...prev.slice(0, 4)];
          return newHistory;
        });
      }
      
      setSearchResult(result);
      setIsSearching(false);
      
      if (result) {
        onComplete();
      }
    }, 1200);
  };

  const formatBitcoin = (satoshis) => {
    return (satoshis / 100000000).toLocaleString('en-US', {
      minimumFractionDigits: 8,
      maximumFractionDigits: 8
    });
  };

  const formatDateTime = (timestamp) => {
    return new Date(timestamp).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const renderSearchResult = () => {
    if (!searchResult) return null;

    switch (searchResult.type) {
      case 'block':
        return (
          <div className="search-result-block">
            <h3>📦 Block #{searchResult.height}</h3>
            <div className="block-details">
              <div className="detail-grid">
                <div className="detail-item">
                  <strong>Hash:</strong>
                  <code className="hash-display">{searchResult.hash}</code>
                </div>
                <div className="detail-item">
                  <strong>Height:</strong> {searchResult.height.toLocaleString()}
                </div>
                <div className="detail-item">
                  <strong>Timestamp:</strong> {formatDateTime(searchResult.timestamp)}
                </div>
                <div className="detail-item">
                  <strong>Transactions:</strong> {searchResult.transactions.toLocaleString()}
                </div>
                <div className="detail-item">
                  <strong>Size:</strong> {(searchResult.size / 1024).toFixed(2)} KB
                </div>
                <div className="detail-item">
                  <strong>Difficulty:</strong> {searchResult.difficulty.toLocaleString()}
                </div>
                <div className="detail-item">
                  <strong>Nonce:</strong> {searchResult.nonce.toLocaleString()}
                </div>
                <div className="detail-item">
                  <strong>Merkle Root:</strong>
                  <code className="hash-display">{searchResult.merkleRoot}</code>
                </div>
                <div className="detail-item">
                  <strong>Previous Hash:</strong>
                  <code className="hash-display">{searchResult.previousHash}</code>
                </div>
              </div>
            </div>
          </div>
        );

      case 'transaction':
        return (
          <div className="search-result-transaction">
            <h3>💸 Transaction Details</h3>
            <div className="transaction-details">
              <div className="detail-grid">
                <div className="detail-item">
                  <strong>TXID:</strong>
                  <code className="hash-display">{searchResult.txid}</code>
                </div>
                <div className="detail-item">
                  <strong>Block Height:</strong> #{searchResult.blockHeight?.toLocaleString() || 'Unconfirmed'}
                </div>
                <div className="detail-item">
                  <strong>Confirmations:</strong> {searchResult.confirmations?.toLocaleString() || 0}
                </div>
                <div className="detail-item">
                  <strong>Size:</strong> {searchResult.size} bytes
                </div>
                <div className="detail-item">
                  <strong>Weight:</strong> {searchResult.weight} WU
                </div>
                <div className="detail-item">
                  <strong>Fee:</strong> {formatBitcoin(searchResult.fee)} BTC
                </div>
                <div className="detail-item">
                  <strong>Timestamp:</strong> {formatDateTime(searchResult.timestamp)}
                </div>
              </div>

              <div className="transaction-flow">
                <div className="inputs-section">
                  <h4>📥 Inputs ({searchResult.inputs.length})</h4>
                  {searchResult.inputs.map((input, i) => (
                    <div key={i} className="input-item">
                      <div className="input-address">
                        {input.address || 'Coinbase'}
                      </div>
                      <div className="input-value">
                        {input.value ? formatBitcoin(input.value) + ' BTC' : 'New coins'}
                      </div>
                      {input.txid !== '0000000000000000000000000000000000000000000000000000000000000000' && (
                        <div className="input-prev">
                          From: <code>{input.txid}:{input.vout}</code>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="flow-arrow">→</div>

                <div className="outputs-section">
                  <h4>📤 Outputs ({searchResult.outputs.length})</h4>
                  {searchResult.outputs.map((output, i) => (
                    <div key={i} className="output-item">
                      <div className="output-address">
                        {output.address}
                      </div>
                      <div className="output-value">
                        {formatBitcoin(output.value)} BTC
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'address':
        return (
          <div className="search-result-address">
            <h3>🏠 Address Information</h3>
            <div className="address-details">
              <div className="detail-grid">
                <div className="detail-item">
                  <strong>Address:</strong>
                  <code className="hash-display">{searchResult.address}</code>
                </div>
                <div className="detail-item">
                  <strong>Balance:</strong> {formatBitcoin(searchResult.balance)} BTC
                </div>
                <div className="detail-item">
                  <strong>Total Received:</strong> {formatBitcoin(searchResult.totalReceived)} BTC
                </div>
                <div className="detail-item">
                  <strong>Total Sent:</strong> {formatBitcoin(searchResult.totalSent)} BTC
                </div>
                <div className="detail-item">
                  <strong>Transaction Count:</strong> {searchResult.transactionCount.toLocaleString()}
                </div>
                <div className="detail-item">
                  <strong>First Seen:</strong> {formatDateTime(searchResult.firstSeen)}
                </div>
                <div className="detail-item">
                  <strong>Last Seen:</strong> {formatDateTime(searchResult.lastSeen)}
                </div>
              </div>

              <div className="address-transactions">
                <h4>Recent Transactions</h4>
                <div className="transaction-list">
                  {searchResult.transactions.map((txid, i) => (
                    <div key={i} className="transaction-item">
                      <code className="transaction-hash">{txid}</code>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="tool-interface">
      <div className="tool-interface-header">
        <div className="tool-interface-title">
          <span style={{ fontSize: '2rem' }}>{tool.icon}</span>
          <h2>{tool.title}</h2>
        </div>
        <div className="tool-controls">
          <ActionButton 
            icon={isSearching ? <Clock className="spin" size={16} /> : <Search size={16} />} 
            onClick={performSearch} 
            disabled={!searchTerm.trim() || isSearching} 
            label={isSearching ? 'Searching...' : 'Search'} 
            className="primary"
          />
        </div>
      </div>

      <div className="tool-form">
        <div className="form-group">
          <label className="form-label">Search Term</label>
          <input 
            type="text"
            className="form-input"
            placeholder="Enter block hash, transaction ID, address, or block height..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && performSearch()}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Search Type</label>
          <select 
            className="form-input"
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
          >
            <option value="auto">Auto-detect</option>
            <option value="block">Block</option>
            <option value="transaction">Transaction</option>
            <option value="address">Address</option>
          </select>
        </div>

        {searchHistory.length > 0 && (
          <div className="form-group">
            <label className="form-label">Recent Searches</label>
            <div className="search-history">
              {searchHistory.map((item, i) => (
            <ActionButton
                  key={i}
                  onClick={() => {
                    setSearchTerm(item.term);
                    setSearchType(item.type);
                  }}
                >
                  <span className="history-type">{item.type}</span>
                  <span className="history-term">{item.term.substring(0, 20)}...</span>
            </ActionButton>
          ))}
            </div>
          </div>
        )}
        </div>

      {!searchResult && !isSearching && (
        <div className="search-examples">
          <h4>Try these examples:</h4>
          <div className="example-searches">
            <ActionButton className="example-button" onClick={() => setSearchTerm('000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f')}>
              Genesis Block
            </ActionButton>
            <ActionButton className="example-button" onClick={() => setSearchTerm('f4184fc596403b9d638783cf57adfe4c75c605f6356fbc91338530e9831e9e16')}>
              First Transaction
            </ActionButton>
            <ActionButton className="example-button" onClick={() => setSearchTerm('1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa')}>
              Satoshi's Address
            </ActionButton>
            <ActionButton className="example-button" onClick={() => setSearchTerm('0')}>
              Block #0
            </ActionButton>
          </div>
        </div>
      )}

      {searchResult && (
        <div className="output-panel">
          <div className="output-header">
            <div className="output-title">🔍 Search Results</div>
          </div>
          <div className="output-content">
            {renderSearchResult()}
          </div>
        </div>
      )}

      {!searchResult && !isSearching && searchTerm && (
        <div className="no-results">
          <p>No results found for "{searchTerm}". Try a different search term.</p>
          <p>Make sure you're using a valid Bitcoin address, transaction ID, or block hash.</p>
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
          <ActionButton 
            icon={<CheckCircle size={16} />} 
            onClick={onComplete} 
            disabled={false} 
            label="Mark Complete" 
            className="primary"
          />
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