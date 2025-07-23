import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '../contexts/ProgressContext';
import { Hash, Binary, Calculator, Zap, Eye, ArrowRight, ArrowLeft, CheckCircle, Lightbulb, RotateCcw, Target } from 'lucide-react';
import { 
  ContinueButton, 
  ActionButton, 
  NavigationButton,
  InteractiveIcon
} from '../components/ui';
import ModuleCompletionButton from '../components/ModuleCompletionButton';
import '../components/ModuleCommon.css';

const NumbersModule = () => {
  const { completeModule } = useProgress();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(new Set());

  // Interactive state management
  const [userInputs, setUserInputs] = useState({});
  const [conversions, setConversions] = useState({});
  const [challenges, setChallenges] = useState({});
  const [insights, setInsights] = useState({});

  const handleStepComplete = (stepIndex) => {
    const newCompleted = new Set(completedSteps);
    newCompleted.add(stepIndex || currentStep);
    setCompletedSteps(newCompleted);
    
    if ((stepIndex || currentStep) === numberSteps.length - 1) {
      completeModule('numbers');
    } else {
      setCurrentStep(prev => prev < numberSteps.length - 1 ? prev + 1 : prev);
    }
  };

  // Number System Learning Steps
  const numberSteps = [
    {
      id: "binary_basics",
      title: "🔢 Binary Number System",
      subtitle: "How computers think with only 0s and 1s",
      component: BinaryBasics
    },
    {
      id: "hexadecimal_power", 
      title: "🎯 Hexadecimal Power",
      subtitle: "The programmer's shortcut for working with binary",
      component: HexadecimalPower
    },
    {
      id: "big_little_endian",
      title: "🔄 Byte Order (Endianness)",
      subtitle: "How different systems store multi-byte numbers",
      component: ByteOrderMastery
    },
    {
      id: "hash_numbers",
      title: "🧮 Hash Functions and Large Numbers",
      subtitle: "Understanding Bitcoin's 256-bit numbers and hashes", 
      component: HashNumberMastery
    },
    {
      id: "bitcoin_precision",
      title: "⚡ Bitcoin Number Precision",
      subtitle: "Satoshis, precision, and why 21 million matters",
      component: BitcoinPrecision
    }
  ];

  // Step 1: Binary Basics
  function BinaryBasics({ onComplete }) {
    const [mode, setMode] = useState('learn');
    const [binaryInput, setBinaryInput] = useState('');
    const [decimalInput, setDecimalInput] = useState('');
    const [currentChallenge, setCurrentChallenge] = useState(0);
    const [challengeAnswers, setChallengeAnswers] = useState({});

    const binaryChallenges = [
      {
        question: "What is 1011 in decimal?",
        binary: "1011",
        answer: 11,
        explanation: "1×8 + 0×4 + 1×2 + 1×1 = 8 + 0 + 2 + 1 = 11"
      },
      {
        question: "What is 25 in binary?",
        decimal: 25,
        answer: "11001",
        explanation: "25 = 16 + 8 + 1 = 10000 + 1000 + 1 = 11001"
      },
      {
        question: "What is 11111111 in decimal?",
        binary: "11111111",
        answer: 255,
        explanation: "8 bits all set to 1 = 128+64+32+16+8+4+2+1 = 255 (maximum value for 8 bits)"
      }
    ];

    const convertBinaryToDecimal = (binary) => {
      if (!/^[01]+$/.test(binary)) return 'Invalid binary';
      return parseInt(binary, 2).toString();
    };

    const convertDecimalToBinary = (decimal) => {
      const num = parseInt(decimal);
      if (isNaN(num) || num < 0) return 'Invalid number';
      return num.toString(2);
    };

    const handleChallengeAnswer = (answer) => {
      const challenge = binaryChallenges[currentChallenge];
      const isCorrect = answer.toString() === challenge.answer.toString();
      
      setChallengeAnswers(prev => ({
        ...prev,
        [currentChallenge]: { answer, correct: isCorrect }
      }));
    };

        return (
      <div className="binary-basics">
        <div className="module-header">
          <h2>🔢 Binary: The Language of Computers</h2>
          <p>Everything in Bitcoin - from addresses to transactions - is built on binary numbers...</p>
            </div>

        <div className="learning-tabs">
            <button 
            className={`tab ${mode === 'learn' ? 'active' : ''}`}
            onClick={() => setMode('learn')}
          >
            Learn
          </button>
          <button 
            className={`tab ${mode === 'convert' ? 'active' : ''}`}
            onClick={() => setMode('convert')}
          >
            Convert
          </button>
          <button 
            className={`tab ${mode === 'challenge' ? 'active' : ''}`}
            onClick={() => setMode('challenge')}
          >
            Challenge
            </button>
          </div>

        {mode === 'learn' && (
          <div className="binary-explanation">
            <div className="concept-card">
              <h3>Why Binary Matters for Bitcoin</h3>
              <p>Bitcoin addresses, private keys, and transaction data are all stored as binary numbers. Understanding binary helps you understand how Bitcoin works at the deepest level.</p>
              
              <div className="binary-demo">
                <h4>Binary Place Values</h4>
                <div className="place-values">
                  <div className="place-value">
                    <div className="power">2³ = 8</div>
                    <div className="bit">1</div>
                  </div>
                  <div className="place-value">
                    <div className="power">2² = 4</div>
                    <div className="bit">0</div>
                  </div>
                  <div className="place-value">
                    <div className="power">2¹ = 2</div>
                    <div className="bit">1</div>
                  </div>
                  <div className="place-value">
                    <div className="power">2⁰ = 1</div>
                    <div className="bit">1</div>
                  </div>
                </div>
                <div className="calculation">
                  1×8 + 0×4 + 1×2 + 1×1 = <strong>11 in decimal</strong>
                </div>
              </div>
            </div>

            <div className="bitcoin-connection">
              <h4>🔗 Bitcoin Connection</h4>
              <ul>
                <li><strong>Private Keys:</strong> 256-bit binary numbers</li>
                <li><strong>Addresses:</strong> Derived from binary operations</li>
                <li><strong>Hashes:</strong> 256-bit binary outputs</li>
                <li><strong>Transactions:</strong> Binary data structures</li>
              </ul>
            </div>
          </div>
        )}

        {mode === 'convert' && (
          <div className="conversion-lab">
            <div className="converter-section">
              <h3>🔄 Binary ↔ Decimal Converter</h3>
              
              <div className="converter-row">
                <div className="converter-input">
                  <label>Binary (0s and 1s only):</label>
                  <input
                    type="text"
                    value={binaryInput}
                    onChange={(e) => setBinaryInput(e.target.value)}
                    placeholder="e.g., 1011"
                    pattern="[01]*"
                  />
                  <div className="conversion-result">
                    Decimal: <strong>{convertBinaryToDecimal(binaryInput)}</strong>
                  </div>
                </div>
                
                <div className="converter-input">
                  <label>Decimal:</label>
                  <input
                    type="number"
                    value={decimalInput}
                    onChange={(e) => setDecimalInput(e.target.value)}
                    placeholder="e.g., 11"
                    min="0"
                  />
                  <div className="conversion-result">
                    Binary: <strong>{convertDecimalToBinary(decimalInput)}</strong>
                  </div>
                </div>
              </div>
            </div>

            <div className="quick-reference">
              <h4>📚 Quick Reference</h4>
              <div className="reference-grid">
                <div className="ref-item">0 = 0</div>
                <div className="ref-item">1 = 1</div>
                <div className="ref-item">10 = 2</div>
                <div className="ref-item">11 = 3</div>
                <div className="ref-item">100 = 4</div>
                <div className="ref-item">101 = 5</div>
                <div className="ref-item">110 = 6</div>
                <div className="ref-item">111 = 7</div>
                <div className="ref-item">1000 = 8</div>
                <div className="ref-item">1111 = 15</div>
                <div className="ref-item">10000 = 16</div>
                <div className="ref-item">11111111 = 255</div>
              </div>
            </div>
          </div>
        )}

        {mode === 'challenge' && (
          <div className="binary-challenge">
            <div className="challenge-card">
              <h3>🎯 Binary Challenge {currentChallenge + 1} of {binaryChallenges.length}</h3>
              
              <div className="challenge-question">
                <p>{binaryChallenges[currentChallenge].question}</p>
                
                {binaryChallenges[currentChallenge].binary && (
                  <div className="binary-display">
                    <span className="binary-number">{binaryChallenges[currentChallenge].binary}</span>
                  </div>
                )}
                
                {binaryChallenges[currentChallenge].decimal && (
                  <div className="decimal-display">
                    <span className="decimal-number">{binaryChallenges[currentChallenge].decimal}</span>
          </div>
        )}
      </div>

              <input
                type="text"
                placeholder="Your answer..."
                onChange={(e) => handleChallengeAnswer(e.target.value)}
                className="challenge-input"
              />

              {challengeAnswers[currentChallenge] && (
                <div className={`challenge-feedback ${challengeAnswers[currentChallenge].correct ? 'correct' : 'incorrect'}`}>
                  {challengeAnswers[currentChallenge].correct ? (
                    <div>
                      <CheckCircle className="w-5 h-5" />
                      <span>Correct! {binaryChallenges[currentChallenge].explanation}</span>
        </div>
                  ) : (
                    <div>
                      <Target className="w-5 h-5" />
                      <span>Try again. Think about place values...</span>
      </div>
                  )}
        </div>
              )}

              {challengeAnswers[currentChallenge]?.correct && (
                <div className="challenge-navigation">
                  {currentChallenge > 0 && (
                    <ActionButton 
                      onClick={() => setCurrentChallenge(currentChallenge - 1)}
                      className="secondary"
                    >
                      <ArrowLeft className="w-4 h-4" /> Previous Challenge
                    </ActionButton>
                  )}
                  {currentChallenge < binaryChallenges.length - 1 ? (
                    <ActionButton 
                      onClick={() => setCurrentChallenge(currentChallenge + 1)}
                      className="primary"
                    >
                      Next Challenge <ArrowRight className="w-4 h-4" />
                    </ActionButton>
                  ) : (
                    <ContinueButton onClick={() => onComplete(0)}>
                      Complete Binary Basics <ArrowRight className="w-4 h-4" />
                    </ContinueButton>
                  )}
        </div>
              )}
      </div>
          </div>
        )}
    </div>
  );
  }

  // Step 2: Hexadecimal Power
  function HexadecimalPower({ onComplete }) {
  const [hexInput, setHexInput] = useState('');
    const [decimalInput, setDecimalInput] = useState('');
    const [binaryInput, setBinaryInput] = useState('');
    const [colorDemo, setColorDemo] = useState('#FF5733');

    const hexDigits = [
      { hex: '0', decimal: 0, binary: '0000' },
      { hex: '1', decimal: 1, binary: '0001' },
      { hex: '2', decimal: 2, binary: '0010' },
      { hex: '3', decimal: 3, binary: '0011' },
      { hex: '4', decimal: 4, binary: '0100' },
      { hex: '5', decimal: 5, binary: '0101' },
      { hex: '6', decimal: 6, binary: '0110' },
      { hex: '7', decimal: 7, binary: '0111' },
      { hex: '8', decimal: 8, binary: '1000' },
      { hex: '9', decimal: 9, binary: '1001' },
      { hex: 'A', decimal: 10, binary: '1010' },
      { hex: 'B', decimal: 11, binary: '1011' },
      { hex: 'C', decimal: 12, binary: '1100' },
      { hex: 'D', decimal: 13, binary: '1101' },
      { hex: 'E', decimal: 14, binary: '1110' },
      { hex: 'F', decimal: 15, binary: '1111' }
    ];

    const convertHexToDecimal = (hex) => {
      if (!/^[0-9A-Fa-f]+$/.test(hex)) return 'Invalid hex';
      return parseInt(hex, 16).toString();
    };

    const convertDecimalToHex = (decimal) => {
      const num = parseInt(decimal);
      if (isNaN(num) || num < 0) return 'Invalid number';
      return num.toString(16).toUpperCase();
    };

    const convertHexToBinary = (hex) => {
      if (!/^[0-9A-Fa-f]+$/.test(hex)) return 'Invalid hex';
      return parseInt(hex, 16).toString(2);
    };

    return (
      <div className="hexadecimal-power">
        <div className="module-header">
          <h2>🎯 Hexadecimal: The Programmer's Shortcut</h2>
          <p>Bitcoin uses hexadecimal everywhere - addresses, hashes, transaction IDs...</p>
              </div>

        <div className="hex-explanation">
          <div className="concept-card">
            <h3>Why Hexadecimal?</h3>
            <p>Hexadecimal (base-16) is perfect for representing binary data because each hex digit represents exactly 4 binary digits. This makes it much more compact and readable.</p>
            
            <div className="comparison-demo">
              <div className="number-representation">
                <div className="representation">
                  <span className="label">Binary:</span>
                  <span className="value">11111111</span>
              </div>
                <div className="representation">
                  <span className="label">Decimal:</span>
                  <span className="value">255</span>
            </div>
                <div className="representation">
                  <span className="label">Hexadecimal:</span>
                  <span className="value">FF</span>
          </div>
            </div>
              </div>
          </div>
          
          <div className="hex-digits-table">
            <h4>📋 Hexadecimal Digit Reference</h4>
            <div className="digits-grid">
              {hexDigits.map(digit => (
                <div key={digit.hex} className="digit-card">
                  <div className="hex-digit">{digit.hex}</div>
                  <div className="decimal-value">= {digit.decimal}</div>
                  <div className="binary-value">{digit.binary}</div>
        </div>
              ))}
              </div>
            </div>
          </div>

        <div className="hex-converter">
          <h3>🔄 Triple Converter: Hex ↔ Decimal ↔ Binary</h3>
          
          <div className="converter-grid">
            <div className="converter-input">
              <label>Hexadecimal (0-9, A-F):</label>
              <input
                type="text"
                value={hexInput}
                onChange={(e) => setHexInput(e.target.value.toUpperCase())}
                placeholder="e.g., FF"
                pattern="[0-9A-Fa-f]*"
              />
              <div className="conversion-results">
                <div>Decimal: <strong>{convertHexToDecimal(hexInput)}</strong></div>
                <div>Binary: <strong>{convertHexToBinary(hexInput)}</strong></div>
            </div>
          </div>
          
            <div className="converter-input">
              <label>Decimal:</label>
              <input
                type="number"
                value={decimalInput}
                onChange={(e) => setDecimalInput(e.target.value)}
                placeholder="e.g., 255"
                min="0"
              />
              <div className="conversion-results">
                <div>Hex: <strong>{convertDecimalToHex(decimalInput)}</strong></div>
                <div>Binary: <strong>{decimalInput ? parseInt(decimalInput).toString(2) : ''}</strong></div>
              </div>
            </div>
            
            <div className="converter-input">
              <label>Binary (0s and 1s):</label>
              <input
                type="text"
                value={binaryInput}
                onChange={(e) => setBinaryInput(e.target.value)}
                placeholder="e.g., 11111111"
                pattern="[01]*"
              />
              <div className="conversion-results">
                <div>Decimal: <strong>{binaryInput ? parseInt(binaryInput, 2) : ''}</strong></div>
                <div>Hex: <strong>{binaryInput ? parseInt(binaryInput, 2).toString(16).toUpperCase() : ''}</strong></div>
                </div>
            </div>
            </div>
          </div>
          
        <div className="practical-demo">
          <h3>🎨 Real-World Example: Colors</h3>
          <p>Web colors use hexadecimal! Try changing this color:</p>
          
          <div className="color-demo">
            <input
              type="text"
              value={colorDemo}
              onChange={(e) => setColorDemo(e.target.value)}
              placeholder="#FF5733"
              className="color-input"
            />
            <div 
              className="color-display"
              style={{ backgroundColor: colorDemo }}
            >
              {colorDemo}
        </div>
          </div>
          
          <div className="color-breakdown">
            <p>Breakdown of {colorDemo}:</p>
            <div className="color-components">
              <div className="component red">
                Red: {colorDemo.slice(1, 3)} = {parseInt(colorDemo.slice(1, 3), 16)}
              </div>
              <div className="component green">
                Green: {colorDemo.slice(3, 5)} = {parseInt(colorDemo.slice(3, 5), 16)}
              </div>
              <div className="component blue">
                Blue: {colorDemo.slice(5, 7)} = {parseInt(colorDemo.slice(5, 7), 16)}
              </div>
              </div>
            </div>
          </div>

        <div className="bitcoin-examples">
          <h3>₿ Bitcoin Hexadecimal Examples</h3>
          <div className="examples-grid">
            <div className="example-card">
              <h4>Bitcoin Address Hash</h4>
              <div className="hex-example">1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa</div>
              <p>Contains Base58-encoded data (which includes hex)</p>
              </div>
            <div className="example-card">
              <h4>Transaction ID</h4>
              <div className="hex-example">4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b</div>
              <p>Pure hexadecimal - 64 characters = 256 bits</p>
            </div>
            <div className="example-card">
              <h4>Private Key</h4>
              <div className="hex-example">E9873D79C6D87DC0FB6A5778633389F4453213303DA61F20BD67FC233AA33262</div>
              <p>256-bit number in hexadecimal format</p>
            </div>
            </div>
          </div>
          
        <ContinueButton onClick={() => onComplete()}>
          Learn Byte Order <ArrowRight className="w-4 h-4" />
        </ContinueButton>
            </div>
    );
  }

  // Step 3: Byte Order (Endianness)
  function ByteOrderMastery({ onComplete }) {
    const [selectedBytes, setSelectedBytes] = useState('12345678');
    const [endianDemo, setEndianDemo] = useState(null);

    const demonstrateEndianness = () => {
      const bytes = selectedBytes.match(/.{1,2}/g) || [];
      const bigEndian = bytes.join(' ');
      const littleEndian = bytes.reverse().join(' ');
      
      setEndianDemo({
        original: selectedBytes,
        bigEndian,
        littleEndian,
        decimal: parseInt(selectedBytes, 16)
      });
    };

    useEffect(() => {
      demonstrateEndianness();
    }, [selectedBytes, demonstrateEndianness]);

    return (
      <div className="byte-order-mastery">
        <div className="module-header">
          <h2>🔄 Byte Order (Endianness)</h2>
          <p>How different computer systems store multi-byte numbers...</p>
        </div>

        <div className="endianness-explanation">
          <div className="concept-card">
            <h3>What is Endianness?</h3>
            <p>When storing numbers that take multiple bytes, different systems store the bytes in different orders:</p>
            
            <div className="endian-comparison">
              <div className="endian-type">
                <h4>🔢 Big-Endian</h4>
                <p>"Most significant byte first"</p>
                <p>Used by: Network protocols, Bitcoin</p>
                <div className="byte-order">12 34 56 78</div>
              </div>
              
              <div className="endian-type">
                <h4>🔀 Little-Endian</h4>
                <p>"Least significant byte first"</p>
                <p>Used by: Intel x86 processors</p>
                <div className="byte-order">78 56 34 12</div>
              </div>
            </div>
          </div>
        </div>

        <div className="endian-demo">
          <h3>🧪 Endianness Demonstrator</h3>
          
          <div className="demo-input">
            <label>Enter 8 hex digits (4 bytes):</label>
              <input
                type="text"
              value={selectedBytes}
              onChange={(e) => setSelectedBytes(e.target.value.toUpperCase().slice(0, 8))}
              placeholder="12345678"
              pattern="[0-9A-Fa-f]{8}"
              maxLength="8"
            />
                </div>

          {endianDemo && (
            <div className="demo-results">
              <div className="demo-row">
                <span className="demo-label">Original hex:</span>
                <span className="demo-value">{endianDemo.original}</span>
            </div>
              <div className="demo-row">
                <span className="demo-label">Decimal value:</span>
                <span className="demo-value">{endianDemo.decimal.toLocaleString()}</span>
              </div>
              <div className="demo-row">
                <span className="demo-label">Big-Endian bytes:</span>
                <span className="demo-value big-endian">{endianDemo.bigEndian}</span>
              </div>
              <div className="demo-row">
                <span className="demo-label">Little-Endian bytes:</span>
                <span className="demo-value little-endian">{endianDemo.littleEndian}</span>
              </div>
            </div>
          )}
          </div>
          
        <div className="bitcoin-endianness">
          <h3>₿ Endianness in Bitcoin</h3>
          <div className="bitcoin-examples">
            <div className="example-card">
              <h4>🌐 Network Protocol</h4>
              <p>Bitcoin uses <strong>big-endian</strong> for network messages and most data structures.</p>
              <div className="example-code">
                Block height 500,000 = 0x0007A120<br/>
                Network bytes: 00 07 A1 20
        </div>
            </div>
            
            <div className="example-card">
              <h4>🔗 Block Headers</h4>
              <p>Some fields like target difficulty use <strong>little-endian</strong> representation.</p>
              <div className="example-code">
                Target: 1804ddb3ef<br/>
                Little-endian: ef b3 dd 04 18
              </div>
            </div>
            
            <div className="example-card">
              <h4>⚠️ Why This Matters</h4>
              <p>Incorrect byte order interpretation can lead to:</p>
              <ul>
                <li>Wrong hash calculations</li>
                <li>Invalid transaction parsing</li>
                <li>Difficulty target errors</li>
              </ul>
              </div>
            </div>
          </div>
          
        <div className="practical-exercise">
          <h3>🎯 Quick Exercise</h3>
          <p>Bitcoin block 1's hash (in big-endian) starts with:</p>
          <div className="exercise-code">
            00000000839a8e6886ab5951d76f411475428afc90947ee320161bbf18eb6048
              </div>
          <p>Notice how it starts with many zeros - this is why it's called "proof of work"!</p>
          </div>
          
        <ContinueButton onClick={() => onComplete()}>
          Master Hash Numbers <ArrowRight className="w-4 h-4" />
        </ContinueButton>
        </div>
    );
  }

  // Step 4: Hash Numbers
  function HashNumberMastery({ onComplete }) {
    const [inputText, setInputText] = useState('Hello Bitcoin!');
    const [hashResult, setHashResult] = useState('');
    const [hashAnalysis, setHashAnalysis] = useState(null);

    // Simple hash function for demo (not cryptographically secure)
    const simpleHash = (text) => {
      let hash = 0;
      for (let i = 0; i < text.length; i++) {
        const char = text.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32-bit integer
      }
      return Math.abs(hash).toString(16).padStart(8, '0').toUpperCase();
    };

    const analyzeHash = (hash) => {
      const binaryHash = parseInt(hash, 16).toString(2).padStart(32, '0');
      const leadingZeros = binaryHash.match(/^0*/)[0].length;
      const numberOfOnes = (binaryHash.match(/1/g) || []).length;
      
      return {
        binary: binaryHash,
        leadingZeros,
        numberOfOnes,
        difficulty: Math.pow(2, leadingZeros),
        hexLength: hash.length
      };
    };

    useEffect(() => {
      const hash = simpleHash(inputText);
      setHashResult(hash);
      setHashAnalysis(analyzeHash(hash));
    }, [inputText]);

    const sha256Examples = [
      {
        input: "Hello World",
        hash: "a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e"
      },
      {
        input: "Hello World!",
        hash: "7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069"
      },
      {
        input: "Genesis Block",
        hash: "000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f"
    }
  ];

  return (
      <div className="hash-number-mastery">
        <div className="module-header">
          <h2>🧮 Hash Functions and Large Numbers</h2>
          <p>Understanding Bitcoin's 256-bit numbers and cryptographic hashes...</p>
        </div>

        <div className="hash-explanation">
          <div className="concept-card">
            <h3>What are Hash Functions?</h3>
            <p>Hash functions take input of any size and produce a fixed-size output. Bitcoin uses SHA-256, which always produces 256-bit (64 hexadecimal character) outputs.</p>
            
            <div className="hash-properties">
              <div className="property">
                <h4>🔒 Deterministic</h4>
                <p>Same input always produces same output</p>
        </div>
              <div className="property">
                <h4>⚡ Fast</h4>
                <p>Quick to calculate in one direction</p>
              </div>
              <div className="property">
                <h4>🔄 Avalanche Effect</h4>
                <p>Tiny input change = completely different output</p>
              </div>
              <div className="property">
                <h4>🎯 Fixed Size</h4>
                <p>Always 256 bits, regardless of input size</p>
              </div>
            </div>
          </div>
      </div>
      
        <div className="hash-demo">
          <h3>🧪 Hash Function Demo</h3>
          <p>Try changing the input text and see how dramatically the hash changes:</p>
          
          <div className="hash-input">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type anything..."
              className="hash-text-input"
            />
      </div>
      
          <div className="hash-output">
            <div className="hash-result">
              <span className="hash-label">Hash:</span>
              <span className="hash-value">{hashResult}</span>
            </div>

            {hashAnalysis && (
              <div className="hash-analysis">
                <div className="analysis-row">
                  <span>Binary:</span>
                  <span className="binary-display">{hashAnalysis.binary}</span>
                </div>
                <div className="analysis-row">
                  <span>Leading zeros:</span>
                  <span>{hashAnalysis.leadingZeros}</span>
                </div>
                <div className="analysis-row">
                  <span>Mining difficulty:</span>
                  <span>1 in {hashAnalysis.difficulty.toLocaleString()}</span>
                </div>
              </div>
      )}
    </div>
        </div>

        <div className="sha256-examples">
          <h3>🔐 Real SHA-256 Examples</h3>
          <p>These are actual SHA-256 hashes used in Bitcoin:</p>
          
          <div className="examples-list">
            {sha256Examples.map((example, index) => (
              <div key={index} className="example-item">
                <div className="example-input">Input: "{example.input}"</div>
                <div className="example-hash">
                  SHA-256: <span className="hash-display">{example.hash}</span>
      </div>
                {example.hash.startsWith('00000') && (
                  <div className="mining-note">
                    ⛏️ This hash has many leading zeros - perfect for Bitcoin mining!
        </div>
      )}
    </div>
            ))}
          </div>
        </div>

        <div className="number-magnitude">
          <h3>📏 Understanding 256-bit Numbers</h3>
          <div className="magnitude-facts">
            <div className="fact-card">
              <h4>🌌 Universe Scale</h4>
              <p>2²⁵⁶ ≈ 10⁷⁷</p>
              <p>More possibilities than atoms in the observable universe!</p>
            </div>
            <div className="fact-card">
              <h4>⏱️ Time Scale</h4>
              <p>Even checking 1 billion hashes per second, it would take longer than the age of the universe to check all possibilities.</p>
            </div>
            <div className="fact-card">
              <h4>🔐 Security</h4>
              <p>This massive number space makes Bitcoin private keys virtually impossible to guess.</p>
            </div>
          </div>
        </div>

        <div className="bitcoin-hash-usage">
          <h3>₿ How Bitcoin Uses Hashes</h3>
          <div className="usage-grid">
            <div className="usage-card">
              <Hash className="w-6 h-6" />
              <h4>Block Hashes</h4>
              <p>Each block has a unique hash that must start with zeros</p>
            </div>
            <div className="usage-card">
              <Binary className="w-6 h-6" />
              <h4>Transaction IDs</h4>
              <p>Every transaction gets a unique 256-bit hash ID</p>
            </div>
            <div className="usage-card">
              <Calculator className="w-6 h-6" />
              <h4>Merkle Trees</h4>
              <p>Hash transactions together to create efficient verification</p>
            </div>
            <div className="usage-card">
              <Zap className="w-6 h-6" />
              <h4>Mining</h4>
              <p>Miners try billions of hashes to find one with enough zeros</p>
            </div>
          </div>
        </div>

        <ContinueButton onClick={() => onComplete()}>
          Master Bitcoin Precision <ArrowRight className="w-4 h-4" />
        </ContinueButton>
      </div>
    );
  }

  // Step 5: Bitcoin Precision
  function BitcoinPrecision({ onComplete }) {
    const [bitcoinAmount, setBitcoinAmount] = useState('1.0');
    const [satoshiAmount, setSatoshiAmount] = useState('100000000');
    const [precisionDemo, setPrecisionDemo] = useState(null);

    const convertBitcoinToSatoshi = (btc) => {
      const num = parseFloat(btc);
      if (isNaN(num)) return '0';
      return Math.round(num * 100000000).toString();
    };

    const convertSatoshiToBitcoin = (sat) => {
      const num = parseInt(sat);
      if (isNaN(num)) return '0';
      return (num / 100000000).toString();
    };

    const demonstratePrecision = () => {
      const examples = [
        { name: "Coffee", btc: "0.00012000", sats: "12,000" },
        { name: "Pizza", btc: "0.00080000", sats: "80,000" },
        { name: "Car", btc: "0.50000000", sats: "50,000,000" },
        { name: "House", btc: "2.00000000", sats: "200,000,000" },
        { name: "One Satoshi", btc: "0.00000001", sats: "1" }
      ];
      
      setPrecisionDemo(examples);
    };

    useEffect(() => {
      demonstratePrecision();
    }, []);

  return (
      <div className="bitcoin-precision">
        <div className="module-header">
          <h2>⚡ Bitcoin Number Precision</h2>
          <p>Understanding satoshis, precision, and why 21 million matters...</p>
      </div>

        <div className="precision-explanation">
          <div className="concept-card">
            <h3>The Smallest Unit: Satoshi</h3>
            <p>Bitcoin is divisible to 8 decimal places. The smallest unit is called a "satoshi" (sat) after Bitcoin's creator.</p>
            
            <div className="satoshi-breakdown">
              <div className="breakdown-row">
                <span>1 Bitcoin (BTC)</span>
                <span>=</span>
                <span>100,000,000 satoshis</span>
              </div>
              <div className="breakdown-row">
                <span>1 satoshi</span>
                <span>=</span>
                <span>0.00000001 BTC</span>
              </div>
            </div>
          </div>
        </div>

        <div className="precision-converter">
          <h3>🔄 Bitcoin ↔ Satoshi Converter</h3>
          
          <div className="converter-grid">
            <div className="converter-input">
              <label>Bitcoin (BTC):</label>
          <input
            type="number"
                value={bitcoinAmount}
                onChange={(e) => {
                  setBitcoinAmount(e.target.value);
                  setSatoshiAmount(convertBitcoinToSatoshi(e.target.value));
                }}
                step="0.00000001"
                min="0"
                placeholder="1.0"
              />
            </div>
            
            <div className="converter-arrow">⇄</div>
            
            <div className="converter-input">
              <label>Satoshis:</label>
              <input
                type="number"
                value={satoshiAmount}
                onChange={(e) => {
                  setSatoshiAmount(e.target.value);
                  setBitcoinAmount(convertSatoshiToBitcoin(e.target.value));
                }}
                step="1"
                min="0"
                placeholder="100000000"
              />
            </div>
          </div>
        </div>

        {precisionDemo && (
          <div className="precision-examples">
            <h3>💰 Real-World Value Examples</h3>
            <div className="examples-grid">
              {precisionDemo.map((example, index) => (
                <div key={index} className="example-card">
                  <h4>{example.name}</h4>
                  <div className="example-values">
                    <div className="btc-value">{example.btc} BTC</div>
                    <div className="sat-value">{example.sats} sats</div>
                  </div>
                </div>
              ))}
            </div>
            </div>
          )}

        <div className="twenty-one-million">
          <h3>🎯 Why 21 Million?</h3>
          <div className="twenty-one-facts">
            <div className="fact-card">
              <h4>📊 Mathematical Precision</h4>
              <p>Total supply: 20,999,999.9769 BTC</p>
              <p>In satoshis: 2,099,999,997,690,000</p>
            </div>
            <div className="fact-card">
              <h4>⏰ Issuance Schedule</h4>
              <p>Every 210,000 blocks, mining rewards halve</p>
              <p>This creates the 21 million limit mathematically</p>
            </div>
            <div className="fact-card">
              <h4>🌍 Global Scale</h4>
              <p>~2.6 million satoshis per person on Earth</p>
              <p>Enough precision for global adoption</p>
            </div>
        </div>
      </div>

        <div className="precision-importance">
          <h3>🔍 Why Precision Matters</h3>
          <div className="importance-grid">
            <div className="importance-card">
              <Calculator className="w-6 h-6" />
              <h4>Microtransactions</h4>
              <p>Can send as little as 1 satoshi (though fees may be higher)</p>
    </div>
            <div className="importance-card">
              <Binary className="w-6 h-6" />
              <h4>Programming</h4>
              <p>All Bitcoin software works in satoshis to avoid floating-point errors</p>
            </div>
            <div className="importance-card">
              <Hash className="w-6 h-6" />
              <h4>Exact Values</h4>
              <p>Every transaction amount is precisely defined, no rounding errors</p>
            </div>
          </div>
        </div>

        <div className="module-completion">
          <div className="completion-card">
            <CheckCircle className="w-8 h-8 text-green-500" />
            <h3>🎓 Number Systems Mastery Complete!</h3>
            <p>You now understand:</p>
            <ul>
              <li>✅ Binary number system and conversions</li>
              <li>✅ Hexadecimal shortcuts and applications</li>
              <li>✅ Byte order (endianness) in computing</li>
              <li>✅ Hash functions and 256-bit numbers</li>
              <li>✅ Bitcoin precision and satoshis</li>
            </ul>
            
            <ModuleCompletionButton 
              moduleName="Number Systems"
              moduleId="numbers"
              customMessage="🎉 Outstanding! You've mastered the number systems that power Bitcoin's mathematical precision!"
            />
          </div>
        </div>
      </div>
    );
  }

  // Main component render
  const currentStepData = numberSteps[currentStep];
  const StepComponent = currentStepData?.component;

    return (
    <div className="numbers-module">
      <div className="module-progress">
        <div className="progress-header">
          <h1>🔢 Number Systems Mastery</h1>
          <p>Master the mathematical foundations of Bitcoin</p>
        </div>
        
        <div className="steps-progress">
          {numberSteps.map((step, index) => (
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
        {StepComponent && <StepComponent onComplete={() => handleStepComplete(currentStep)} />}
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

export default NumbersModule; 