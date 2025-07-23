import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '../contexts/ProgressContext';
import { Hash, Shield, Zap, Eye, EyeOff, Copy, CheckCircle, AlertCircle, ArrowRight, ArrowLeft, RotateCcw, Lightbulb, Target } from 'lucide-react';
import { sha256 } from '../utils/bitcoin';
import { 
  ContinueButton, 
  ActionButton, 
  OptionButton,
  NavigationButton,
  InteractiveIcon
} from '../components/ui';
import '../components/ModuleCommon.css';

const HashingModule = () => {
  const { completeModule } = useProgress();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(new Set());

  // Interactive state management
  const [hashInputs, setHashInputs] = useState({});
  const [hashResults, setHashResults] = useState({});
  const [hashComparisons, setHashComparisons] = useState({});
  const [proofOfWorkDemo, setProofOfWorkDemo] = useState({});

  // Network data functions
  const getBitcoinPrice = async () => {
    try {
      // Updated to use CoinGecko API which is more reliable and modern
      const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');
      const data = await response.json();
      return Math.round(data.bitcoin.usd);
    } catch (error) {
      console.log('Failed to fetch Bitcoin price, using fallback');
      return null;
    }
  };

  const getNetworkHashRate = async () => {
    try {
      // Using BlockCypher API for more reliable network statistics
      const response = await fetch('https://api.blockcypher.com/v1/btc/main');
      const data = await response.json();
      return data.hash_rate || null;
    } catch (error) {
      console.log('Failed to fetch network hash rate, using fallback');
      return null;
    }
  };

  // Hashing Learning Steps
  const hashingSteps = [
    {
      id: "hash_fundamentals",
      title: "🔐 Hash Function Fundamentals",
      subtitle: "What are hash functions and why they're essential for Bitcoin",
      component: HashFundamentals
    },
    {
      id: "avalanche_effect", 
      title: "🌊 The Avalanche Effect",
      subtitle: "How tiny changes create completely different hashes",
      component: AvalancheEffect
    },
    {
      id: "one_way_functions",
      title: "🚪 One-Way Functions",
      subtitle: "Easy to calculate forward, impossible to reverse",
      component: OneWayFunctions
    },
    {
      id: "proof_of_work",
      title: "⛏️ Proof of Work Mining",
      subtitle: "How Bitcoin uses hash difficulty for security", 
      component: ProofOfWorkDemo
    },
    {
      id: "hash_applications",
      title: "🛠️ Hash Applications in Bitcoin",
      subtitle: "Every way Bitcoin uses cryptographic hashing",
      component: HashApplications
    }
  ];

  // Step 1: Hash Fundamentals
  function HashFundamentals() {
    const [inputText, setInputText] = useState('Hello Bitcoin!');
  const [hashResult, setHashResult] = useState('');
  const [isHashing, setIsHashing] = useState(false);
    const [hashHistory, setHashHistory] = useState([]);

    const performHash = async (text) => {
    setIsHashing(true);
      
      // Simulate processing time for educational effect
      await new Promise(resolve => setTimeout(resolve, 500));
      
      try {
        const hash = await sha256(text);
      setHashResult(hash);
        
        // Add to history
        setHashHistory(prev => [
          { input: text, hash, timestamp: new Date() },
          ...prev.slice(0, 4) // Keep last 5 entries
        ]);
    } catch (error) {
        // Fallback simple hash for demo
        const simpleHash = text.split('').reduce((hash, char) => {
          const charCode = char.charCodeAt(0);
          hash = ((hash << 5) - hash) + charCode;
          return Math.abs(hash).toString(16).padStart(64, '0').slice(0, 64);
        }, 0);
        setHashResult(simpleHash);
      }
      
    setIsHashing(false);
  };

    useEffect(() => {
      performHash(inputText);
    }, [inputText]);

    const hashProperties = [
      {
        title: "🎯 Deterministic",
        description: "Same input always produces the same hash",
        example: "\"Hello\" always hashes to the same value"
      },
      {
        title: "⚡ Fast Computation",
        description: "Quick to calculate in one direction",
        example: "Can hash gigabytes of data in seconds"
      },
      {
        title: "🔒 Fixed Output Size",
        description: "Always produces 256-bit (64 character) output",
        example: "Whether input is 1 byte or 1 GB, output is always 64 hex chars"
      },
      {
        title: "🌊 Avalanche Effect",
        description: "Tiny input change = completely different output",
        example: "\"Hello\" vs \"hello\" produce totally different hashes"
      },
      {
        title: "🚪 One-Way",
        description: "Impossible to reverse engineer the input",
        example: "Given a hash, can't determine what created it"
      }
    ];

  return (
      <div className="hash-fundamentals">
        <div className="module-header">
          <h2>🔐 Hash Functions: The Foundation of Bitcoin Security</h2>
          <p>Discover how mathematical functions create unbreakable digital fingerprints...</p>
      </div>

        <div className="interactive-hasher">
          <h3>🧪 Interactive Hash Generator</h3>
          <p>Type anything and watch it transform into a unique digital fingerprint:</p>
          
          <div className="hash-input-section">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type your message here..."
          className="hash-input"
        />
            <ActionButton 
              onClick={() => performHash(inputText)}
              disabled={isHashing}
              className="primary"
            >
              {isHashing ? (
                <>
                  <RotateCcw className="w-4 h-4 animate-spin" />
                  Hashing...
                </>
              ) : (
                <>
                  <Hash className="w-4 h-4" />
                  Generate Hash
                </>
              )}
            </ActionButton>
      </div>

          <div className="hash-output">
            <div className="hash-result-card">
              <div className="hash-label">SHA-256 Hash:</div>
              <div className="hash-value">
                {hashResult}
            <button
                  onClick={() => navigator.clipboard.writeText(hashResult)}
                  className="copy-button"
                  title="Copy hash"
                >
                  <Copy className="w-4 h-4" />
            </button>
              </div>
              <div className="hash-info">
                Length: {hashResult.length} characters | 256 bits | 32 bytes
              </div>
            </div>
        </div>
      </div>

        <div className="hash-properties">
          <h3>🏗️ Hash Function Properties</h3>
          <div className="properties-grid">
            {hashProperties.map((property, index) => (
              <div key={index} className="property-card">
                <h4>{property.title}</h4>
                <p>{property.description}</p>
                <div className="property-example">
                  Example: {property.example}
                </div>
              </div>
            ))}
          </div>
          </div>

        {hashHistory.length > 0 && (
          <div className="hash-history">
            <h3>📜 Hash History</h3>
            <div className="history-list">
              {hashHistory.map((entry, index) => (
                <div key={index} className="history-entry">
                  <div className="history-input">"{entry.input}"</div>
                  <div className="history-arrow">→</div>
                  <div className="history-hash">{entry.hash.slice(0, 16)}...</div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="bitcoin-connection">
          <h3>₿ Why Bitcoin Needs Hash Functions</h3>
          <div className="connection-points">
            <div className="connection-point">
              <Shield className="w-6 h-6" />
              <div>
                <h4>Data Integrity</h4>
                <p>Verify that transaction data hasn't been tampered with</p>
            </div>
        </div>
            <div className="connection-point">
              <Zap className="w-6 h-6" />
              <div>
                <h4>Proof of Work</h4>
                <p>Mining requires finding hashes with specific properties</p>
              </div>
            </div>
            <div className="connection-point">
              <Hash className="w-6 h-6" />
              <div>
                <h4>Unique Identifiers</h4>
                <p>Every block and transaction gets a unique hash ID</p>
              </div>
            </div>
          </div>
        </div>

        <ContinueButton onClick={() => setCurrentStep(1)}>
          Explore Avalanche Effect <ArrowRight className="w-4 h-4" />
        </ContinueButton>
    </div>
  );
  }

  // Step 2: Avalanche Effect
  function AvalancheEffect() {
    const [originalText, setOriginalText] = useState('The quick brown fox');
    const [modifiedText, setModifiedText] = useState('The quick brown fox');
    const [originalHash, setOriginalHash] = useState('');
    const [modifiedHash, setModifiedHash] = useState('');
    const [differences, setDifferences] = useState(0);
    const [avalancheDemo, setAvalancheDemo] = useState(null);

    const calculateHashes = async () => {
      try {
        const hash1 = await sha256(originalText);
        const hash2 = await sha256(modifiedText);
        
        setOriginalHash(hash1);
        setModifiedHash(hash2);
        
        // Calculate differences
        let diffs = 0;
        for (let i = 0; i < hash1.length; i++) {
          if (hash1[i] !== hash2[i]) diffs++;
        }
        setDifferences(diffs);
      } catch (error) {
        // Fallback for demo
        setOriginalHash('a'.repeat(64));
        setModifiedHash('b'.repeat(64));
        setDifferences(64);
      }
    };

    useEffect(() => {
      calculateHashes();
    }, [originalText, modifiedText, calculateHashes]);

    const demonstrateAvalanche = () => {
      const examples = [
        { 
          original: 'Bitcoin', 
          modified: 'bitcoin',
          change: 'Changed "B" to "b"'
        },
        {
          original: 'Hello World',
          modified: 'Hello World!',
          change: 'Added exclamation mark'
        },
        {
          original: '1234567890',
          modified: '1234567891',
          change: 'Changed last digit'
        }
      ];
      
      setAvalancheDemo(examples);
    };

    const highlightDifferences = (hash1, hash2) => {
      return hash1.split('').map((char, index) => (
        <span 
          key={index}
          className={char !== hash2[index] ? 'hash-diff' : 'hash-same'}
        >
          {char}
        </span>
      ));
    };

    return (
      <div className="avalanche-effect">
        <div className="module-header">
          <h2>🌊 The Avalanche Effect</h2>
          <p>See how the tiniest change creates a completely different hash...</p>
        </div>

        <div className="avalanche-demo">
          <h3>🔬 Live Avalanche Demonstration</h3>
          <p>Make tiny changes to the text and watch how dramatically the hash changes:</p>
          
          <div className="comparison-inputs">
            <div className="input-group">
              <label>Original Text:</label>
              <input
                type="text"
                value={originalText}
                onChange={(e) => setOriginalText(e.target.value)}
                className="comparison-input"
              />
              <div className="hash-display">
                {originalHash && highlightDifferences(originalHash, modifiedHash)}
              </div>
            </div>

            <div className="input-group">
              <label>Modified Text:</label>
              <input
                type="text"
                value={modifiedText}
                onChange={(e) => setModifiedText(e.target.value)}
                className="comparison-input"
              />
              <div className="hash-display">
                {modifiedHash && highlightDifferences(modifiedHash, originalHash)}
              </div>
            </div>
          </div>

          <div className="avalanche-stats">
            <div className="stat-card">
              <h4>Characters Different</h4>
              <div className="stat-value">{differences} / 64</div>
              <div className="stat-percentage">
                {((differences / 64) * 100).toFixed(1)}% different
              </div>
            </div>
            
            <div className="stat-card">
              <h4>Input Difference</h4>
              <div className="stat-value">
                {Math.abs(originalText.length - modifiedText.length) + 
                 originalText.split('').filter((char, i) => char !== modifiedText[i]).length}
              </div>
              <div className="stat-note">character(s) changed</div>
            </div>
          </div>
        </div>

        <div className="avalanche-examples">
          <h3>📋 Classic Avalanche Examples</h3>
          <ActionButton onClick={demonstrateAvalanche} className="secondary">
            <Target className="w-4 h-4" />
            Show Examples
          </ActionButton>

          {avalancheDemo && (
            <div className="examples-grid">
              {avalancheDemo.map((example, index) => (
                <div key={index} className="example-card">
                  <h4>{example.change}</h4>
                  <div className="example-texts">
                    <div className="original">"{example.original}"</div>
                    <div className="modified">"{example.modified}"</div>
                  </div>
                  <div className="example-note">
                    Result: Completely different 256-bit hashes
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="security-implications">
          <h3>🛡️ Security Implications</h3>
          <div className="implications-grid">
            <div className="implication-card">
              <AlertCircle className="w-6 h-6" />
              <h4>Tamper Detection</h4>
              <p>Any change to Bitcoin transaction data produces a completely different hash, making tampering immediately obvious.</p>
            </div>
            <div className="implication-card">
              <CheckCircle className="w-6 h-6" />
              <h4>Data Integrity</h4>
              <p>You can verify that data hasn't changed by comparing hash values.</p>
              </div>
            <div className="implication-card">
              <Zap className="w-6 h-6" />
              <h4>Mining Security</h4>
              <p>Miners can't predict which small changes will produce valid block hashes.</p>
              </div>
              </div>
            </div>

        <div className="practical-exercise">
          <h3>🎯 Try This Exercise</h3>
          <div className="exercise-card">
            <p><strong>Challenge:</strong> Try to make the smallest possible change that keeps the hash as similar as possible.</p>
            <p><strong>Reality:</strong> You'll find it's impossible! Even changing one bit flips about half the output bits.</p>
            <p><strong>Bitcoin Insight:</strong> This is why Bitcoin is secure - attackers can't make "small" malicious changes that go unnoticed.</p>
            </div>
          </div>

        <ContinueButton onClick={() => setCurrentStep(2)}>
          Understand One-Way Functions <ArrowRight className="w-4 h-4" />
        </ContinueButton>
      </div>
    );
  }

  // Step 3: One-Way Functions
  function OneWayFunctions() {
    const [crackingAttempt, setCrackingAttempt] = useState('');
    const [targetHash, setTargetHash] = useState('');
    const [attempts, setAttempts] = useState(0);
    const [timeEstimate, setTimeEstimate] = useState('');
    const [bruteForcDemo, setBruteForcDemo] = useState(false);

    const targetHashes = [
      {
        hash: 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3',
        hint: '5-letter common greeting',
        answer: 'hello'
      },
      {
        hash: '2c26b46b68ffc68ff99b453c1d30413413422d706483bfa0f98a5e886266e7ae',
        hint: '5-letter common greeting',
        answer: 'world'
      }
    ];

    const [currentTarget, setCurrentTarget] = useState(targetHashes[0]);

    const attemptCrack = async () => {
      setAttempts(prev => prev + 1);
      
      try {
        const hash = await sha256(crackingAttempt);
        if (hash === currentTarget.hash) {
          alert('🎉 Congratulations! You found it! But notice this only worked because you knew it was a common word...');
        } else {
          alert('❌ Wrong! The hash doesn\'t match. Try again or see the hint.');
        }
      } catch (error) {
        alert('Error calculating hash');
      }
    };

    const demonstrateBruteForce = () => {
      setBruteForcDemo(true);
      
      // Calculate time estimates for different password lengths
      const estimates = [
        { length: 4, chars: 'lowercase', time: '0.02 seconds', combinations: '456,976' },
        { length: 8, chars: 'lowercase', time: '5.4 hours', combinations: '208 billion' },
        { length: 12, chars: 'mixed case + numbers', time: '2 million years', combinations: '8.9 × 10²¹' },
        { length: 16, chars: 'mixed + symbols', time: '2 × 10²⁰ years', combinations: '7.2 × 10³¹' }
      ];
      
      setTimeEstimate(estimates);
    };

  return (
      <div className="one-way-functions">
      <div className="module-header">
          <h2>🚪 One-Way Functions: Easy Forward, Impossible Backward</h2>
          <p>Understanding why hash functions are cryptographically secure...</p>
      </div>

        <div className="one-way-explanation">
          <div className="concept-card">
            <h3>What Makes a Function "One-Way"?</h3>
            <div className="direction-demo">
              <div className="forward-direction">
                <span className="direction-label">Forward (Easy):</span>
                <div className="process">
                  Input → <span className="function">Hash Function</span> → Output
        </div>
                <div className="time-estimate">⚡ Milliseconds</div>
      </div>

              <div className="backward-direction">
                <span className="direction-label">Backward (Impossible):</span>
                <div className="process">
                  Output → <span className="function">??? Reverse ???</span> → Input
                </div>
                <div className="time-estimate">🕰️ Longer than age of universe</div>
              </div>
            </div>
          </div>
        </div>

        <div className="hash-cracking-challenge">
          <h3>🎯 Hash Cracking Challenge</h3>
          <p>Can you find the input that creates this hash?</p>
          
          <div className="challenge-setup">
            <div className="target-hash-display">
              <strong>Target Hash:</strong>
              <div className="hash-value">{currentTarget.hash}</div>
              <div className="hint">Hint: {currentTarget.hint}</div>
            </div>
            
            <div className="cracking-interface">
              <input
                type="text"
                value={crackingAttempt}
                onChange={(e) => setCrackingAttempt(e.target.value)}
                placeholder="Enter your guess..."
                className="crack-input"
              />
              <ActionButton onClick={attemptCrack} className="primary">
                <Target className="w-4 h-4" />
                Try This Input
              </ActionButton>
            </div>

            <div className="attempt-counter">
              Attempts: {attempts}
            </div>
          </div>
        </div>

        <div className="brute-force-analysis">
          <h3>💻 Brute Force Reality Check</h3>
          <p>What if an attacker tried every possible combination?</p>
          
          <ActionButton onClick={demonstrateBruteForce} className="secondary">
            <Zap className="w-4 h-4" />
            Calculate Brute Force Times
          </ActionButton>

          {bruteForcDemo && timeEstimate && (
            <div className="brute-force-table">
              <div className="table-header">
                <span>Password Length</span>
                <span>Character Set</span>
                <span>Combinations</span>
                <span>Time to Crack</span>
              </div>
              {timeEstimate.map((estimate, index) => (
                <div key={index} className="table-row">
                  <span>{estimate.length} characters</span>
                  <span>{estimate.chars}</span>
                  <span>{estimate.combinations}</span>
                  <span className={index > 1 ? 'secure-time' : 'insecure-time'}>
                    {estimate.time}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bitcoin-implications">
          <h3>₿ Bitcoin Security Implications</h3>
          <div className="security-points">
            <div className="security-point">
              <Shield className="w-6 h-6" />
              <div>
                <h4>Private Key Security</h4>
                <p>Your Bitcoin private key creates a public key through one-way functions. Even if someone knows your public key, they can't reverse-engineer your private key.</p>
          </div>
        </div>
            
            <div className="security-point">
              <Hash className="w-6 h-6" />
              <div>
                <h4>Block Mining</h4>
                <p>Miners must try billions of different values to find a hash that starts with zeros. They can't work backward from the target.</p>
      </div>
            </div>
            
            <div className="security-point">
              <AlertCircle className="w-6 h-6" />
              <div>
                <h4>Data Protection</h4>
                <p>Transaction data is protected by hashes. Attackers can't figure out how to modify data to produce a specific hash.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mathematical-insight">
          <h3>🧮 The Mathematics</h3>
          <div className="math-explanation">
            <p>SHA-256 has 2²⁵⁶ possible outputs. That's approximately:</p>
            <div className="big-number">
              115,792,089,237,316,195,423,570,985,008,687,907,853,269,984,665,640,564,039,457,584,007,913,129,639,936
            </div>
            <p>To put this in perspective: there are only about 10⁸⁰ atoms in the observable universe!</p>
          </div>
        </div>

        <ContinueButton onClick={() => setCurrentStep(3)}>
          Learn Proof of Work <ArrowRight className="w-4 h-4" />
        </ContinueButton>
    </div>
  );
  }

  // Step 4: Proof of Work Demo
  function ProofOfWorkDemo() {
    const [miningData, setMiningData] = useState('Bitcoin Block #1');
    const [targetZeros, setTargetZeros] = useState(4);
    const [nonce, setNonce] = useState(0);
    const [currentHash, setCurrentHash] = useState('');
    const [isMining, setIsMining] = useState(false);
    const [attempts, setAttempts] = useState(0);
    const [miningSpeed, setMiningSpeed] = useState(1000); // hashes per second

    const mineBlock = async () => {
      setIsMining(true);
      setAttempts(0);
      let currentNonce = 0;
      let hash = '';
      const target = '0'.repeat(targetZeros);

      while (true) {
        const data = `${miningData}${currentNonce}`;
        try {
          hash = await sha256(data);
        } catch (error) {
          // Fallback hash for demo
          hash = data.split('').reduce((hash, char) => {
            const charCode = char.charCodeAt(0);
            hash = ((hash << 5) - hash) + charCode;
            return Math.abs(hash).toString(16).padStart(64, '0').slice(0, 64);
          }, 0);
        }

        setCurrentHash(hash);
        setNonce(currentNonce);
        setAttempts(prev => prev + 1);

        if (hash.startsWith(target)) {
          setIsMining(false);
          break;
        }

        currentNonce++;
        
        // Simulate realistic mining speed
        if (currentNonce % 100 === 0) {
          await new Promise(resolve => setTimeout(resolve, 10));
        }

        // Safety break to prevent infinite loops in demo
        if (currentNonce > 1000000) {
          setIsMining(false);
          break;
        }
      }
    };

    const stopMining = () => {
      setIsMining(false);
    };

    const calculateDifficulty = () => {
      return Math.pow(16, targetZeros);
    };

    const estimateTime = () => {
      const difficulty = calculateDifficulty();
      const estimatedAttempts = difficulty / 2; // Average case
      const timeInSeconds = estimatedAttempts / miningSpeed;
      
      if (timeInSeconds < 60) {
        return `~${timeInSeconds.toFixed(1)} seconds`;
      } else if (timeInSeconds < 3600) {
        return `~${(timeInSeconds / 60).toFixed(1)} minutes`;
      } else if (timeInSeconds < 86400) {
        return `~${(timeInSeconds / 3600).toFixed(1)} hours`;
      } else {
        return `~${(timeInSeconds / 86400).toFixed(1)} days`;
    }
  };

  return (
      <div className="proof-of-work-demo">
        <div className="module-header">
          <h2>⛏️ Proof of Work: Digital Mining Simulation</h2>
          <p>Experience how Bitcoin mining actually works...</p>
      </div>

        <div className="mining-explanation">
          <div className="concept-card">
            <h3>How Bitcoin Mining Works</h3>
            <p>Miners compete to find a special number (called a "nonce") that, when combined with transaction data, produces a hash starting with a certain number of zeros.</p>
            
            <div className="mining-process">
              <div className="process-step">
                <span className="step-number">1</span>
                <span>Take block data + nonce number</span>
              </div>
              <div className="process-step">
                <span className="step-number">2</span>
                <span>Calculate SHA-256 hash</span>
              </div>
              <div className="process-step">
                <span className="step-number">3</span>
                <span>Check if hash starts with enough zeros</span>
              </div>
              <div className="process-step">
                <span className="step-number">4</span>
                <span>If not, increment nonce and try again</span>
              </div>
            </div>
          </div>
      </div>

        <div className="mining-simulator">
          <h3>🎮 Mining Simulator</h3>
          
          <div className="mining-controls">
            <div className="control-group">
              <label>Block Data:</label>
              <input
                type="text"
                value={miningData}
                onChange={(e) => setMiningData(e.target.value)}
                disabled={isMining}
                className="mining-input"
              />
            </div>
            
            <div className="control-group">
              <label>Difficulty (zeros required):</label>
              <input
                type="number"
                value={targetZeros}
                onChange={(e) => setTargetZeros(Math.max(1, Math.min(8, parseInt(e.target.value) || 1)))}
                disabled={isMining}
                min="1"
                max="8"
                className="difficulty-input"
              />
            </div>
          </div>

          <div className="mining-status">
            <div className="status-row">
              <span>Current Nonce:</span>
              <span className="status-value">{nonce.toLocaleString()}</span>
            </div>
            <div className="status-row">
              <span>Attempts:</span>
              <span className="status-value">{attempts.toLocaleString()}</span>
            </div>
            <div className="status-row">
              <span>Current Hash:</span>
              <span className="hash-display">
                <span className="leading-zeros">
                  {currentHash.slice(0, targetZeros)}
                </span>
                <span className="rest-of-hash">
                  {currentHash.slice(targetZeros)}
                </span>
              </span>
            </div>
          </div>

          <div className="mining-actions">
            {!isMining ? (
              <ActionButton onClick={mineBlock} className="primary large">
                <Zap className="w-5 h-5" />
                Start Mining
              </ActionButton>
            ) : (
              <ActionButton onClick={stopMining} className="danger">
                Stop Mining
            </ActionButton>
          )}
        </div>

          {currentHash.startsWith('0'.repeat(targetZeros)) && !isMining && (
            <div className="mining-success">
              <CheckCircle className="w-6 h-6" />
              <div>
                <h4>🎉 Block Mined Successfully!</h4>
                <p>Found nonce {nonce} after {attempts} attempts!</p>
                <p>Hash: {currentHash}</p>
              </div>
            </div>
      )}
    </div>

        <div className="difficulty-analysis">
          <h3>📊 Difficulty Analysis</h3>
          <div className="analysis-grid">
            <div className="analysis-card">
              <h4>Target Difficulty</h4>
              <div className="analysis-value">{targetZeros} leading zeros</div>
              <div className="analysis-note">1 in {calculateDifficulty().toLocaleString()} chance</div>
    </div>
            
            <div className="analysis-card">
              <h4>Estimated Time</h4>
              <div className="analysis-value">{estimateTime()}</div>
              <div className="analysis-note">At {miningSpeed.toLocaleString()} hashes/sec</div>
            </div>
            
            <div className="analysis-card">
              <h4>Real Bitcoin</h4>
              <div className="analysis-value">~19 leading zeros</div>
              <div className="analysis-note">Quadrillions of attempts needed</div>
            </div>
          </div>
        </div>

        <div className="real-mining-comparison">
          <h3>⚡ Real Bitcoin Mining</h3>
          <div className="comparison-facts">
            <div className="fact-card">
              <h4>🏭 Mining Hardware</h4>
              <p>ASIC miners perform 100+ terahashes per second</p>
              <p>(100,000,000,000,000 hashes/second)</p>
            </div>
            
            <div className="fact-card">
              <h4>🌍 Global Network</h4>
              <p>Total network: ~400 exahashes per second</p>
              <p>That's 400,000,000,000,000,000,000 hashes/second!</p>
            </div>
            
            <div className="fact-card">
              <h4>⚡ Energy & Security</h4>
              <p>All this computing power secures the network</p>
              <p>Makes attacking Bitcoin extremely expensive</p>
            </div>
          </div>
        </div>

        <ContinueButton onClick={() => setCurrentStep(4)}>
          Explore Hash Applications <ArrowRight className="w-4 h-4" />
        </ContinueButton>
      </div>
    );
  }

  // Step 5: Hash Applications
  function HashApplications() {
    const [selectedApplication, setSelectedApplication] = useState('blocks');

    const hashApplications = {
      blocks: {
        title: 'Block Hashing',
        description: 'Every block gets a unique hash that must meet difficulty requirements',
        example: {
          input: 'Block Header (Previous Hash + Merkle Root + Timestamp + Nonce)',
          output: '00000000839a8e6886ab5951d76f411475428afc90947ee320161bbf18eb6048',
          note: 'Notice the leading zeros - this required massive computational effort!'
        },
        useCases: [
          'Unique block identification',
          'Proof of work verification',
          'Blockchain linking (each block references previous block\'s hash)'
        ]
      },
      transactions: {
        title: 'Transaction IDs',
        description: 'Every transaction gets a unique identifier through double SHA-256',
        example: {
          input: 'Transaction Data (inputs + outputs + amounts + signatures)',
          output: 'f4184fc596403b9d638783cf57adfe4c75c605f6356fbc91338530e9831e9e16',
          note: 'This is the hash of the first Bitcoin transaction!'
        },
        useCases: [
          'Unique transaction identification',
          'Transaction verification',
          'Building Merkle trees for blocks'
        ]
      },
      merkle: {
        title: 'Merkle Trees',
        description: 'Hash transactions together to create efficient verification structures',
        example: {
          input: 'Hash(Hash(TxA + TxB) + Hash(TxC + TxD))',
          output: 'Single root hash representing all transactions',
          note: 'Allows verification of any transaction without downloading the entire block'
        },
        useCases: [
          'Efficient transaction verification',
          'Reduced storage requirements',
          'Light client support (SPV)'
        ]
      },
      addresses: {
        title: 'Address Generation',
        description: 'Bitcoin addresses are created using multiple hash functions',
        example: {
          input: 'Public Key → SHA-256 → RIPEMD-160 → Base58Check',
          output: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
          note: 'Multiple hash functions provide layered security'
        },
        useCases: [
          'Privacy (public key not revealed until spending)',
          'Shorter addresses (160 bits vs 256 bits)',
          'Additional security layer'
        ]
      },
      scripts: {
        title: 'Script Hashing',
        description: 'Complex spending conditions are hashed for efficiency',
        example: {
          input: 'Complex Script (multisig, timelocks, etc.)',
          output: 'Script Hash (used in P2SH addresses)',
          note: 'Allows complex conditions without revealing them until spending'
        },
        useCases: [
          'Multisignature wallets',
          'Time-locked transactions',
          'Complex smart contracts'
        ]
      }
    };

    const application = hashApplications[selectedApplication];

  return (
      <div className="hash-applications">
        <div className="module-header">
          <h2>🛠️ Hash Applications in Bitcoin</h2>
          <p>Discover every way Bitcoin uses cryptographic hashing...</p>
      </div>

        <div className="application-selector">
          <div className="selector-buttons">
            {Object.entries(hashApplications).map(([key, app]) => (
              <button
                key={key}
                className={`selector-button ${selectedApplication === key ? 'active' : ''}`}
                onClick={() => setSelectedApplication(key)}
              >
                {app.title}
              </button>
            ))}
          </div>
        </div>

        <div className="application-details">
          <div className="application-card">
            <h3>{application.title}</h3>
            <p>{application.description}</p>
            
            <div className="example-section">
              <h4>📝 Example</h4>
              <div className="example-flow">
                <div className="example-input">
                  <strong>Input:</strong> {application.example.input}
                </div>
                <div className="arrow">↓</div>
                <div className="example-output">
                  <strong>Output:</strong> 
                  <div className="hash-example">{application.example.output}</div>
                </div>
                <div className="example-note">
                  💡 {application.example.note}
                </div>
              </div>
            </div>

            <div className="use-cases">
              <h4>🎯 Use Cases</h4>
              <ul>
                {application.useCases.map((useCase, index) => (
                  <li key={index}>{useCase}</li>
                ))}
        </ul>
      </div>
        </div>
        </div>

        <div className="hash-security-summary">
          <h3>🛡️ Hash Security in Bitcoin</h3>
          <div className="security-grid">
            <div className="security-point">
              <CheckCircle className="w-6 h-6" />
              <div>
                <h4>Immutability</h4>
                <p>Changing any transaction would change its hash, breaking the chain</p>
        </div>
      </div>

            <div className="security-point">
              <Shield className="w-6 h-6" />
              <div>
                <h4>Integrity</h4>
                <p>Hash verification ensures data hasn't been corrupted or tampered with</p>
              </div>
      </div>

            <div className="security-point">
              <Zap className="w-6 h-6" />
              <div>
                <h4>Efficiency</h4>
                <p>Hash comparisons are much faster than comparing entire data structures</p>
              </div>
      </div>

            <div className="security-point">
              <Eye className="w-6 h-6" />
              <div>
                <h4>Privacy</h4>
                <p>Hashes hide original data while still allowing verification</p>
            </div>
        </div>
    </div>
        </div>

        <div className="module-completion">
          <div className="completion-card">
            <CheckCircle className="w-8 h-8 text-green-500" />
            <h3>🎓 Hash Mastery Complete!</h3>
            <p>You now understand:</p>
            <ul>
              <li>✅ Hash function properties and security</li>
              <li>✅ The avalanche effect and tamper detection</li>
              <li>✅ One-way functions and cryptographic security</li>
              <li>✅ Proof of work mining mechanics</li>
              <li>✅ Every Bitcoin application of cryptographic hashing</li>
            </ul>
            
            <div className="next-steps">
              <p><strong>Next:</strong> Now that you understand hashing, you're ready to explore how Bitcoin uses these concepts in mining, transactions, and the blockchain structure.</p>
            </div>
            
            <ModuleCompletionButton 
              moduleName="Cryptographic Hashing"
              moduleId="hashing"
              customMessage="🎉 Excellent! You've mastered the cryptographic foundation that makes Bitcoin secure and tamper-proof!"
            />
          </div>
        </div>
      </div>
    );
  }

  // Main component render
  const currentStepData = hashingSteps[currentStep];
  const StepComponent = currentStepData?.component;

  return (
    <div className="module-container">
      {/* HERO SECTION - World-class design principles */}
      <div className="module-header">
        <div className="module-title">
          <div className="module-icon">
            <InteractiveIcon type="hash" size={48} className="module-icon-hashing" />
          </div>
          Cryptographic Hashing Mastery
        </div>
        <div className="module-subtitle">
          Master the mathematical foundation of Bitcoin security
        </div>
      </div>
      
      <div className="section-card">
        
        <div className="steps-progress">
          {hashingSteps.map((step, index) => (
            <div 
              key={step.id}
              className={`step-indicator ${index === currentStep ? 'active' : ''} ${completedSteps.has(index) ? 'completed' : ''}`}
            >
              <div className="step-number">{index + 1}</div>
              <div className="step-info">
                <div className="step-title">{step.title}</div>
                <div className="step-subtitle">{step.subtitle}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="step-content">
        {StepComponent && <StepComponent />}
      </div>
      
      <div className="module-navigation">
        {currentStep > 0 && (
          <NavigationButton 
            onClick={() => setCurrentStep(currentStep - 1)}
            direction="prev"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous Step
          </NavigationButton>
        )}
        
        <NavigationButton 
          onClick={() => navigate('/')}
          className="home-button"
        >
          Return to Homepage
        </NavigationButton>
      </div>
    </div>
  );
};

export default HashingModule; 