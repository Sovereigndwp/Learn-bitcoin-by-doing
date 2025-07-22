import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '../contexts/ProgressContext';
import { Key, Lock, Shield, Eye, EyeOff, Copy, CheckCircle, AlertCircle, Lightbulb, ArrowRight, ArrowLeft, Dice6, Hash, FileKey, Crown } from 'lucide-react';
import { 
  ContinueButton, 
  ActionButton, 
  OptionButton,
  NavigationButton,
  InteractiveIcon
} from '../components/ui';
import { KnowledgeGate, ModuleCompletionButton } from '../components/ui';
import '../components/ModuleCommon.css';
// Using global CSS only - no module-specific overrides
import { generatePrivateKey, privateKeyToPublicKey, publicKeyToAddress } from '../utils/bitcoin';

const KeysModule = () => {
  const { completeModule } = useProgress();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(new Set());

  // Interactive state management
  const [userPredictions, setUserPredictions] = useState({});
  const [challengeMode, setChallengeMode] = useState({});
  const [personalInsights, setPersonalInsights] = useState({});
  const [realityChecks, setRealityChecks] = useState({});
  const [keyDemos, setKeyDemos] = useState({});
  const [scenarioChoices, setScenarioChoices] = useState({});

  // Cryptography Learning Steps
  const cryptoSteps = [
    {
      id: "ownership_fundamentals",
      title: "🔑 Digital Ownership Fundamentals",
      subtitle: "What does it really mean to 'own' digital money?",
      component: OwnershipFundamentals
    },
    {
      id: "randomness_security", 
      title: "🎲 Randomness and Security",
      subtitle: "How randomness creates unbreakable digital locks",
      component: RandomnessSecurity
    },
    {
      id: "private_key_power",
      title: "🔐 Private Key Power",
      subtitle: "Your private key is your digital identity - handle with care",
      component: PrivateKeyPower
    },
    {
      id: "address_generation",
      title: "🏠 Address Generation Lab",
      subtitle: "Watch Bitcoin addresses come to life from private keys", 
      component: AddressGenerationLab
    },
    {
      id: "custody_decisions",
      title: "🛡️ Custody Decision Framework",
      subtitle: "Self-custody vs third-party: making the right choice for you",
      component: CustodyDecisions
    }
  ];

  // Step 1: Ownership Fundamentals
  function OwnershipFundamentals() {
    const [thinkingLevel, setThinkingLevel] = useState('prediction');
    const [userChoices, setUserChoices] = useState({});
    const [personalStory, setPersonalStory] = useState('');

    const ownershipChallenges = [
      {
        id: 'bank_account',
        scenario: "You have $10,000 in your bank account",
        thinkingQuestion: "Who really controls this money?",
        challengeOptions: [
          { id: 'you', label: "You control it - it's your account", risk: 'low' },
          { id: 'bank', label: "The bank controls it - they hold it", risk: 'medium' },
          { id: 'government', label: "Government controls it - they regulate banks", risk: 'high' },
          { id: 'shared', label: "Shared control - multiple parties involved", risk: 'very-high' }
        ],
        reality: {
          truth: "The bank actually controls your money. They can freeze accounts, impose withdrawal limits, or even go bankrupt with your funds.",
          examples: [
            "2013: Cyprus banks froze accounts and took depositors' money",
            "2008: Banks failed worldwide, customers lost access to funds",
            "2022: Canadian truckers had accounts frozen for political protests"
          ]
        },
        deeperQuestion: "If someone else can prevent you from accessing your money, do you really own it?"
      },
      {
        id: 'digital_photos',
        scenario: "You store family photos on Google Photos",
        thinkingQuestion: "What would happen if Google decided to delete your account?",
        challengeOptions: [
          { id: 'keep_photos', label: "Photos stay safe - they're backed up", risk: 'low' },
          { id: 'lose_some', label: "Might lose some photos but most are safe", risk: 'medium' },
          { id: 'lose_all', label: "Could lose everything instantly", risk: 'high' },
          { id: 'legal_help', label: "Legal action would get them back", risk: 'very-high' }
        ],
        reality: {
          truth: "You could lose everything instantly. Google (or any platform) can delete accounts with little recourse for users.",
          examples: [
            "Users regularly lose Gmail accounts and all data forever",
            "YouTube creators lose years of work from algorithm changes",
            "Cloud storage companies have deleted accounts by mistake"
          ]
        },
        deeperQuestion: "Should your precious memories depend on a company's terms of service?"
      },
      {
        id: 'house_ownership',
        scenario: "You own a house with a clear title deed",
        thinkingQuestion: "Is this the closest thing to 'true ownership' we have?",
        challengeOptions: [
          { id: 'true_ownership', label: "Yes - property rights are absolute", risk: 'low' },
          { id: 'government_limits', label: "Mostly, but government has some control", risk: 'medium' },
          { id: 'many_restrictions', label: "Heavily restricted by laws and taxes", risk: 'high' },
          { id: 'illusion_ownership', label: "Ownership is largely an illusion", risk: 'very-high' }
        ],
        reality: {
          truth: "Even property ownership has significant limitations. Governments can seize property, impose unlimited taxes, or change zoning laws.",
          examples: [
            "Eminent domain allows government to take your property",
            "Property taxes mean you're essentially renting from the state",
            "Zoning changes can destroy property value overnight"
          ]
        },
        deeperQuestion: "If you must pay yearly taxes or lose your property, do you own it or rent it?"
      }
    ];

    const handlePrediction = (challengeId, choiceId) => {
      setUserChoices(prev => ({
        ...prev,
        [challengeId]: choiceId
      }));
    };

    const moveToReality = () => {
      setThinkingLevel('reality');
    };

    const moveToDeeper = () => {
      setThinkingLevel('deeper');
    };

    const getCurrentChallenge = () => {
      const completedChallenges = Object.keys(userChoices).length;
      return ownershipChallenges[completedChallenges] || ownershipChallenges[0];
    };

    const challenge = getCurrentChallenge();
    const userChoice = userChoices[challenge.id];
    const selectedOption = challenge.challengeOptions.find(opt => opt.id === userChoice);

  return (
      <div className="ownership-fundamentals">
      <div className="module-header">
          <h2>🔑 What Does Digital Ownership Really Mean?</h2>
          <p>Let's challenge some assumptions about ownership in the digital age...</p>
        </div>

        {thinkingLevel === 'prediction' && (
          <div className="prediction-mode">
            <div className="scenario-card">
              <h3>{challenge.scenario}</h3>
              <div className="thinking-prompt">
                <Lightbulb className="w-5 h-5" />
                <span>{challenge.thinkingQuestion}</span>
      </div>

              <div className="quiz-options">
                {challenge.challengeOptions.map((option, index) => (
                  <div
                    key={option.id}
                    onClick={() => handlePrediction(challenge.id, option.id)}
                    className={`quiz-option prediction-option risk-${option.risk} ${userChoice === option.id ? 'selected' : ''}`}
                  >
                    {option.label}
                    <div className="option-indicator">{index + 1}</div>
                  </div>
                ))}
              </div>

              {userChoice && (
                <div className="prediction-feedback">
                  <p>You predicted: <strong>{selectedOption.label}</strong></p>
                  <ActionButton onClick={moveToReality}>
                    See Reality <ArrowRight className="w-4 h-4" />
                  </ActionButton>
      </div>
              )}
    </div>
      </div>
        )}

        {thinkingLevel === 'reality' && (
          <div className="reality-mode">
            <div className="reality-card">
              <h3>💡 The Reality</h3>
              <p className="reality-truth">{challenge.reality.truth}</p>
              
              <h4>Real Examples:</h4>
              <ul className="reality-examples">
                {challenge.reality.examples.map((example, idx) => (
                  <li key={idx}>{example}</li>
                ))}
              </ul>

              <div className="prediction-comparison">
                <p>You thought: <span className="user-prediction">{selectedOption.label}</span></p>
                <p className="reality-note">Reality is often harsher than we expect...</p>
          </div>
          
              <ActionButton onClick={moveToDeeper} className="primary">
                Think Deeper <ArrowRight className="w-4 h-4" />
              </ActionButton>
            </div>
          </div>
        )}

        {thinkingLevel === 'deeper' && (
          <div className="deeper-mode">
            <div className="deeper-question-card">
              <h3>🤔 Go Deeper</h3>
              <p className="deeper-question">{challenge.deeperQuestion}</p>
              
              <textarea
                placeholder="What are your thoughts? How does this change your perspective on ownership?"
                value={personalStory}
                onChange={(e) => setPersonalStory(e.target.value)}
                className="personal-reflection"
              />

              <div className="ownership-insight">
                <h4>💎 Bitcoin's Revolutionary Answer</h4>
                <p>Bitcoin introduces <strong>cryptographic ownership</strong> - ownership that doesn't depend on institutions, governments, or platforms. Your private key is the only thing between you and your Bitcoin.</p>
                
                <div className="key-realization">
                  <AlertCircle className="w-5 h-5" />
                  <span>With Bitcoin, you can have true digital ownership for the first time in history.</span>
          </div>
          </div>

              {Object.keys(userChoices).length < ownershipChallenges.length ? (
                <ActionButton 
                  onClick={() => {
                    setThinkingLevel('prediction');
                    setPersonalStory('');
                  }}
                  className="primary"
                >
                  Next Challenge <ArrowRight className="w-4 h-4" />
                </ActionButton>
              ) : (
                <ContinueButton onClick={() => setCurrentStep(1)}>
                  Master Randomness & Security <ArrowRight className="w-4 h-4" />
                </ContinueButton>
              )}
        </div>
      </div>
        )}

        <div className="progress-tracker">
          <span>Challenge {Object.keys(userChoices).length + 1} of {ownershipChallenges.length}</span>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${(Object.keys(userChoices).length / ownershipChallenges.length) * 100}%` }}
            />
          </div>
        </div>
    </div>
  );
  }

  // Step 2: Randomness and Security
  function RandomnessSecurity() {
    const [demoMode, setDemoMode] = useState('prediction');
    const [userGuesses, setUserGuesses] = useState({});
    const [randomnessDemo, setRandomnessDemo] = useState(null);
    const [securityInsights, setSecurityInsights] = useState({});

    const randomnessChallenges = [
      {
        id: 'password_strength',
        question: "Which password would be harder for a computer to crack?",
        options: [
          { id: 'complex', text: "MyP@ssw0rd2024!", entropy: 'Medium', crackTime: '3 months' },
          { id: 'random', text: "horse battery staple correct", entropy: 'High', crackTime: '500 years' },
          { id: 'personal', text: "JohnSmith1985", entropy: 'Low', crackTime: '2 hours' },
          { id: 'random_chars', text: "Kx9#mP2@vL8$", entropy: 'Very High', crackTime: '10,000 years' }
        ],
        reality: "Randomness beats complexity. 'horse battery staple correct' is stronger than 'MyP@ssw0rd2024!' because it's more random and longer.",
        insight: "True randomness is the foundation of all digital security."
      },
      {
        id: 'key_generation',
        question: "How should Bitcoin generate your private key?",
        options: [
          { id: 'birthday', text: "Use your birthday + social security", entropy: 'None', crackTime: 'Instant' },
          { id: 'timestamp', text: "Use current timestamp", entropy: 'Low', crackTime: '1 day' },
          { id: 'pseudorandom', text: "Computer random number generator", entropy: 'Medium', crackTime: '1 year' },
          { id: 'true_random', text: "True random from cosmic radiation", entropy: 'Maximum', crackTime: '10^77 years' }
        ],
        reality: "Bitcoin uses cryptographically secure random number generation, similar to cosmic radiation randomness. Your private key has so many possibilities that the universe doesn't have enough atoms to store them all.",
        insight: "A Bitcoin private key has 2^256 possibilities - more than the number of atoms in the observable universe."
      }
    ];

    const generateRandomnessDemo = () => {
      // Simulate different levels of randomness
      const demos = {
        weak: {
          pattern: [1, 2, 3, 4, 5, 6, 7, 8],
          security: "Terrible - predictable pattern",
          color: "danger"
        },
        medium: {
          pattern: Array.from({length: 8}, () => Math.floor(Math.random() * 10)),
          security: "Better - but computer random",
          color: "warning"
        },
        strong: {
          pattern: Array.from({length: 8}, () => Math.floor(Math.random() * 16).toString(16)),
          security: "Excellent - cryptographically secure",
          color: "success"
        }
      };
      
      setRandomnessDemo(demos);
    };

    const handleGuess = (challengeId, optionId) => {
      setUserGuesses(prev => ({
        ...prev,
        [challengeId]: optionId
      }));
    };

    useEffect(() => {
      generateRandomnessDemo();
    }, []);

    const currentChallenge = randomnessChallenges[Object.keys(userGuesses).length] || randomnessChallenges[0];
    const userGuess = userGuesses[currentChallenge.id];
    const selectedOption = currentChallenge.options.find(opt => opt.id === userGuess);

  return (
      <div className="randomness-security">
        <div className="module-header">
          <h2>🎲 The Power of True Randomness</h2>
          <p>Random numbers are the foundation of all cryptographic security...</p>
      </div>

        {demoMode === 'prediction' && (
          <div className="randomness-challenge">
            <div className="challenge-card">
              <h3>{currentChallenge.question}</h3>
              
              <div className="options-grid">
                {currentChallenge.options.map(option => (
                  <div 
                    key={option.id}
                    className={`option-card ${userGuess === option.id ? 'selected' : ''}`}
                    onClick={() => handleGuess(currentChallenge.id, option.id)}
                  >
                    <div className="option-text">{option.text}</div>
                    <div className="option-meta">
                      Entropy: <span className={`entropy-${option.entropy.toLowerCase().replace(' ', '-')}`}>
                        {option.entropy}
                      </span>
                    </div>
            </div>
        ))}
        </div>

              {userGuess && (
                <div className="guess-feedback">
                  <p>You chose: <strong>{selectedOption.text}</strong></p>
                  <p>Crack time: <span className="crack-time">{selectedOption.crackTime}</span></p>
                  <ActionButton onClick={() => setDemoMode('reality')}>
                    See Why <ArrowRight className="w-4 h-4" />
                  </ActionButton>
      </div>
              )}
            </div>
          </div>
        )}

        {demoMode === 'reality' && (
          <div className="reality-explanation">
            <div className="reality-card">
              <h3>🔍 The Reality</h3>
              <p>{currentChallenge.reality}</p>
              
              <div className="security-insight">
                <Lightbulb className="w-5 h-5" />
                <span>{currentChallenge.insight}</span>
          </div>

              <div className="randomness-demo">
                <h4>Randomness Demo</h4>
                {randomnessDemo && (
                  <div className="demo-grid">
                    {Object.entries(randomnessDemo).map(([level, demo]) => (
                      <div key={level} className={`demo-card ${demo.color}`}>
                        <h5>{level.charAt(0).toUpperCase() + level.slice(1)} Randomness</h5>
                        <div className="pattern">{demo.pattern.join(' ')}</div>
                        <div className="security-note">{demo.security}</div>
                      </div>
                    ))}
                  </div>
                )}
        </div>

              {Object.keys(userGuesses).length < randomnessChallenges.length ? (
                <ActionButton 
                  onClick={() => setDemoMode('prediction')}
                  className="primary"
                >
                  Next Challenge <ArrowRight className="w-4 h-4" />
                </ActionButton>
              ) : (
                <ContinueButton onClick={() => setCurrentStep(2)}>
                  Explore Private Keys <ArrowRight className="w-4 h-4" />
                </ContinueButton>
              )}
        </div>
      </div>
        )}

        <div className="progress-tracker">
          <span>Randomness Challenge {Object.keys(userGuesses).length + 1} of {randomnessChallenges.length}</span>
        </div>
    </div>
  );
  }

  // Step 3: Private Key Power  
  function PrivateKeyPower() {
    const [demoKey, setDemoKey] = useState('');
    const [publicKey, setPublicKey] = useState('');
    const [address, setAddress] = useState('');
    const [showKey, setShowKey] = useState(false);
    const [keyGenerated, setKeyGenerated] = useState(false);
    const [signatureDemo, setSignatureDemo] = useState(null);

    const generateNewKey = () => {
      try {
        const newPrivateKey = generatePrivateKey();
        const newPublicKey = privateKeyToPublicKey(newPrivateKey);
        const newAddress = publicKeyToAddress(newPublicKey);
        
        setDemoKey(newPrivateKey);
        setPublicKey(newPublicKey);
        setAddress(newAddress);
        setKeyGenerated(true);
        setShowKey(false);
      } catch (error) {
        console.error('Key generation error:', error);
        // Fallback demo values
        setDemoKey('L1234567890abcdef...(this would be your actual private key)');
        setPublicKey('03234567890abcdef...(this would be your public key)');
        setAddress('1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa');
        setKeyGenerated(true);
      }
    };

    const simulateSignature = () => {
      setSignatureDemo({
        message: "Send 0.01 BTC to Alice",
        signature: "30440220...(digital signature proving you own this Bitcoin)",
        verified: true
      });
  };

  return (
      <div className="private-key-power">
        <div className="module-header">
          <h2>🔐 Your Private Key = Your Digital Identity</h2>
          <p>Understanding the most important piece of data in Bitcoin...</p>
      </div>

        <div className="key-generation-lab">
          <div className="lab-section">
            <h3>🎯 Generate Your Own Bitcoin Key</h3>
            <p>Let's create a real Bitcoin private key and see how it works:</p>
            
            <ActionButton onClick={generateNewKey} className="primary large">
              <Dice6 className="w-5 h-5" />
              Generate Random Private Key
            </ActionButton>

            {keyGenerated && (
              <div className="key-results">
                <div className="key-item">
                  <div className="key-header">
                    <span>🔑 Private Key (Keep Secret!)</span>
                    <button 
                      onClick={() => setShowKey(!showKey)}
                      className="toggle-visibility"
                    >
                      {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                </div>
                  <div className="key-value">
                    {showKey ? demoKey : '•'.repeat(64)}
              </div>
                  <div className="key-warning">
                    ⚠️ Anyone with this key controls the Bitcoin!
                </div>
              </div>

                <div className="key-item">
                  <div className="key-header">
                    <span>🔓 Public Key (Safe to Share)</span>
                </div>
                  <div className="key-value public">{publicKey}</div>
                  <div className="key-note">
                    ✅ Derived from private key - mathematically linked
              </div>
                </div>

                <div className="key-item">
                  <div className="key-header">
                    <span>🏠 Bitcoin Address (Your "Account Number")</span>
                </div>
                  <div className="key-value address">{address}</div>
                  <div className="key-note">
                    ✅ People send Bitcoin to this address
              </div>
            </div>
          </div>
        )}
      </div>

          {keyGenerated && (
            <div className="signature-demo">
              <h3>✍️ Digital Signature Demo</h3>
              <p>Your private key can "sign" transactions to prove ownership:</p>
              
              <ActionButton onClick={simulateSignature} className="secondary">
                <FileKey className="w-5 h-5" />
                Sign a Transaction
              </ActionButton>

              {signatureDemo && (
                <div className="signature-result">
                  <div className="signature-item">
                    <strong>Message:</strong> {signatureDemo.message}
            </div>
                  <div className="signature-item">
                    <strong>Digital Signature:</strong> 
                    <span className="signature-value">{signatureDemo.signature}</span>
          </div>
                  <div className="signature-verification">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Signature verified! This proves you own the Bitcoin.</span>
            </div>
                </div>
              )}
            </div>
          )}
          </div>

        <div className="key-insights">
          <h3>🧠 Key Insights</h3>
          <div className="insights-grid">
            <div className="insight-card">
              <Lock className="w-6 h-6" />
              <h4>Mathematical Magic</h4>
              <p>It's easy to go from private key → public key → address, but impossible to reverse.</p>
            </div>
            <div className="insight-card">
              <Shield className="w-6 h-6" />
              <h4>Cryptographic Proof</h4>
              <p>Your signature proves you own Bitcoin without revealing your private key.</p>
          </div>
            <div className="insight-card">
              <Key className="w-6 h-6" />
              <h4>Ultimate Responsibility</h4>
              <p>Lose your private key = lose your Bitcoin. No customer service can help.</p>
        </div>
        </div>
        </div>

        {/* Knowledge Check Section */}
        <div className="knowledge-check-section">
          <KnowledgeGate
            isUnlocked={true}
            title="Key Generation Mastery"
            description="Test your understanding of Bitcoin key generation"
          >
            <div className="knowledge-content">
              <p>You now understand how Bitcoin keys are generated and used. This knowledge is fundamental to Bitcoin security.</p>
            </div>
          </KnowledgeGate>
        </div>

        <div className="real-world-warning">
          <AlertCircle className="w-6 h-6" />
        <div>
            <h4>⚠️ Real World Warning</h4>
            <p>Never store large amounts on demo keys! This is for education only. Use proper wallet software for real Bitcoin.</p>
        </div>
      </div>

        <ContinueButton onClick={() => setCurrentStep(3)}>
          Learn Address Generation <ArrowRight className="w-4 h-4" />
        </ContinueButton>
    </div>
  );
  }

  // Step 4: Address Generation Lab
  function AddressGenerationLab() {
    const [addressTypes, setAddressTypes] = useState({});
    const [selectedType, setSelectedType] = useState('legacy');
    const [generationSteps, setGenerationSteps] = useState([]);
    const [currentStep, setCurrentDemoStep] = useState(0);

    const addressFormats = {
      legacy: {
        name: 'Legacy (P2PKH)',
        prefix: '1',
        example: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
        description: 'Original Bitcoin address format',
        pros: ['Universal compatibility', 'Widely supported'],
        cons: ['Higher transaction fees', 'Larger transaction size']
      },
      segwit: {
        name: 'SegWit (P2SH)',
        prefix: '3',
        example: '3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy',
        description: 'Wrapped SegWit for backward compatibility',
        pros: ['Lower fees than legacy', 'Good compatibility'],
        cons: ['Higher fees than native SegWit']
      },
      bech32: {
        name: 'Native SegWit (Bech32)',
        prefix: 'bc1',
        example: 'bc1qw508d6qejxtdg4y5r3zarvary0c5xw7kv8f3t4',
        description: 'Modern, efficient address format',
        pros: ['Lowest transaction fees', 'Error detection', 'Case insensitive'],
        cons: ['Some older wallets don\'t support it']
      }
    };

    const demonstrateGeneration = () => {
      const steps = [
        'Generate 256-bit random private key',
        'Apply elliptic curve cryptography (secp256k1)',
        'Generate public key from private key',
        'Apply SHA-256 hash to public key',
        'Apply RIPEMD-160 hash to result',
        'Add version byte and checksum',
        'Encode with Base58 (or Bech32 for native SegWit)',
        'Final Bitcoin address ready!'
      ];
      
      setGenerationSteps(steps);
      setCurrentDemoStep(0);
      
      // Animate through steps
      const interval = setInterval(() => {
        setCurrentDemoStep(prev => {
          if (prev >= steps.length - 1) {
            clearInterval(interval);
            return prev;
          }
          return prev + 1;
        });
      }, 1000);
    };

  return (
      <div className="address-generation-lab">
        <div className="module-header">
          <h2>🏠 Address Generation Laboratory</h2>
          <p>Watch Bitcoin addresses come to life from mathematical transformations...</p>
      </div>

        <div className="address-types-comparison">
          <h3>📋 Address Format Comparison</h3>
          <div className="address-types-grid">
            {Object.entries(addressFormats).map(([type, format]) => (
              <div 
                key={type}
                className={`address-type-card ${selectedType === type ? 'selected' : ''}`}
                onClick={() => setSelectedType(type)}
              >
                <h4>{format.name}</h4>
                <div className="address-example">
                  <span className="prefix">{format.prefix}</span>
                  <span className="address-text">{format.example}</span>
      </div>
                <p className="address-description">{format.description}</p>
                
                <div className="pros-cons">
                  <div className="pros">
                    <strong>Pros:</strong>
                    <ul>
                      {format.pros.map((pro, idx) => (
                        <li key={idx}>✅ {pro}</li>
                      ))}
                    </ul>
          </div>
                  <div className="cons">
                    <strong>Cons:</strong>
                    <ul>
                      {format.cons.map((con, idx) => (
                        <li key={idx}>⚠️ {con}</li>
                      ))}
                    </ul>
          </div>
          </div>
          </div>
            ))}
        </div>
      </div>

        <div className="generation-process">
          <h3>⚙️ Address Generation Process</h3>
          <p>See how a private key becomes a Bitcoin address through cryptographic transformations:</p>
          
          <ActionButton onClick={demonstrateGeneration} className="primary">
            <Hash className="w-5 h-5" />
            Demonstrate Generation Process
          </ActionButton>

          {generationSteps.length > 0 && (
            <div className="generation-steps">
              {generationSteps.map((step, index) => (
                <div 
                  key={index}
                  className={`generation-step ${index <= currentStep ? 'completed' : 'pending'}`}
                >
                  <div className="step-number">{index + 1}</div>
                  <div className="step-description">{step}</div>
                  {index <= currentStep && <CheckCircle className="w-5 h-5 text-green-500" />}
      </div>
              ))}
      </div>
          )}
          </div>

        <div className="practical-insights">
          <h3>💡 Practical Insights</h3>
          <div className="insights-grid">
            <div className="insight-card">
              <div className="insight-icon">🔒</div>
              <h4>One-Way Function</h4>
              <p>Easy to generate address from private key, impossible to reverse.</p>
          </div>
            <div className="insight-card">
              <div className="insight-icon">🎯</div>
              <h4>Perfect Accuracy</h4>
              <p>Checksums prevent typos - invalid addresses are rejected.</p>
        </div>
            <div className="insight-card">
              <div className="insight-icon">🔄</div>
              <h4>Multiple Addresses</h4>
              <p>One private key can generate multiple address types for different use cases.</p>
      </div>
        </div>
      </div>

        <ContinueButton onClick={() => setCurrentStep(4)}>
          Master Custody Decisions <ArrowRight className="w-4 h-4" />
        </ContinueButton>
    </div>
  );
  }

  // Step 5: Custody Decisions
  function CustodyDecisions() {
    const [scenarioActive, setScenarioActive] = useState(null);
    const [userDecisions, setUserDecisions] = useState({});
    const [custodyInsights, setCustodyInsights] = useState({});

    const custodyScenarios = [
      {
        id: 'tech_newbie',
        title: 'Tech Newbie Sarah',
        profile: 'Just bought her first $500 in Bitcoin, not comfortable with technology',
        question: 'How should Sarah store her Bitcoin?',
        options: [
          {
            id: 'exchange',
            label: 'Keep on Coinbase exchange',
            security: 'medium',
            convenience: 'high',
            risk: 'Exchange hack, account freeze',
            recommendation: 'Acceptable for small amounts while learning'
          },
          {
            id: 'mobile_wallet',
            label: 'Download a mobile wallet app',
            security: 'high',
            convenience: 'high',
            risk: 'Phone loss, malware',
            recommendation: 'Good balance for beginners'
          },
          {
            id: 'hardware_wallet',
            label: 'Buy a hardware wallet',
            security: 'very-high',
            convenience: 'medium',
            risk: 'Device loss, setup complexity',
            recommendation: 'Overkill for $500, but future-proof'
          },
          {
            id: 'paper_wallet',
            label: 'Create a paper wallet',
            security: 'high',
            convenience: 'low',
            risk: 'Paper damage, generation security',
            recommendation: 'Too complex for beginners'
          }
        ]
      },
      {
        id: 'crypto_veteran',
        title: 'Crypto Veteran Mike',
        profile: 'Has $50,000 in Bitcoin, very tech-savvy, values maximum security',
        question: 'What custody solution should Mike use?',
        options: [
          {
            id: 'exchange',
            label: 'Keep on exchange for easy trading',
            security: 'medium',
            convenience: 'very-high',
            risk: 'Major hack risk with large amounts',
            recommendation: 'Dangerous for $50k+'
          },
          {
            id: 'hardware_multisig',
            label: 'Hardware wallet with multisig',
            security: 'maximum',
            convenience: 'medium',
            risk: 'Setup complexity',
            recommendation: 'Ideal for large amounts'
          },
          {
            id: 'single_hardware',
            label: 'Single hardware wallet',
            security: 'high',
            convenience: 'high',
            risk: 'Single point of failure',
            recommendation: 'Good but not optimal for $50k'
          },
          {
            id: 'cold_storage',
            label: 'Air-gapped cold storage',
            security: 'maximum',
            convenience: 'low',
            risk: 'Complexity, human error',
            recommendation: 'Excellent security, high complexity'
          }
        ]
      },
      {
        id: 'business_owner',
        title: 'Business Owner Lisa',
        profile: 'Company holds $500,000 in Bitcoin, needs institutional-grade security',
        question: 'How should Lisa\'s company secure their Bitcoin?',
        options: [
          {
            id: 'exchange_custody',
            label: 'Institutional exchange custody',
            security: 'high',
            convenience: 'very-high',
            risk: 'Counterparty risk, regulations',
            recommendation: 'Good for active trading'
          },
          {
            id: 'multisig_vault',
            label: 'Multi-signature vault solution',
            security: 'maximum',
            convenience: 'medium',
            risk: 'Key management complexity',
            recommendation: 'Best for long-term storage'
          },
          {
            id: 'third_party_custody',
            label: 'Professional custody service',
            security: 'high',
            convenience: 'high',
            risk: 'Trust third party, regulations',
            recommendation: 'Good for compliance needs'
          },
          {
            id: 'self_custody',
            label: 'Full self-custody with procedures',
            security: 'maximum',
            convenience: 'low',
            risk: 'Operational complexity',
            recommendation: 'Ultimate control, high responsibility'
          }
        ]
      }
    ];

    const handleDecision = (scenarioId, optionId) => {
      setUserDecisions(prev => ({
        ...prev,
        [scenarioId]: optionId
      }));
    };

    const getPersonalizedAdvice = () => {
      const decisions = Object.values(userDecisions);
      let advice = [];

      if (decisions.includes('exchange')) {
        advice.push('You lean toward convenience - consider starting with reputable exchanges but plan to move to self-custody as amounts grow.');
      }
      if (decisions.includes('hardware_multisig') || decisions.includes('multisig_vault')) {
        advice.push('You value maximum security - multisig solutions are excellent for large amounts.');
      }
      if (decisions.includes('mobile_wallet')) {
        advice.push('You appreciate balance between security and usability - mobile wallets are great for everyday use.');
      }

      return advice;
    };

  return (
      <div className="custody-decisions">
        <div className="module-header">
          <h2>🛡️ Custody Decision Framework</h2>
          <p>Different situations require different custody approaches...</p>
      </div>

        <div className="custody-scenarios">
          {custodyScenarios.map(scenario => (
            <div key={scenario.id} className="scenario-card">
              <h3>{scenario.title}</h3>
              <p className="profile">{scenario.profile}</p>
              <p className="question">{scenario.question}</p>

              <div className="custody-options">
                {scenario.options.map(option => (
                  <div 
                    key={option.id}
                    className={`custody-option ${userDecisions[scenario.id] === option.id ? 'selected' : ''}`}
                    onClick={() => handleDecision(scenario.id, option.id)}
                  >
                    <div className="option-header">
                      <span className="option-label">{option.label}</span>
                      <div className="security-badges">
                        <span className={`security-badge ${option.security}`}>
                          Security: {option.security}
                        </span>
                        <span className={`convenience-badge ${option.convenience}`}>
                          Convenience: {option.convenience}
                        </span>
                    </div>
                    </div>
                    <div className="option-details">
                      <div className="risk">Risk: {option.risk}</div>
                      <div className="recommendation">{option.recommendation}</div>
                  </div>
                  </div>
                ))}
                  </div>
            </div>
          ))}
      </div>

        {Object.keys(userDecisions).length === custodyScenarios.length && (
          <div className="personalized-advice">
            <h3>🎯 Your Custody Profile</h3>
            <div className="advice-list">
              {getPersonalizedAdvice().map((advice, idx) => (
                <div key={idx} className="advice-item">
                  <Lightbulb className="w-5 h-5" />
                  <span>{advice}</span>
            </div>
          ))}
      </div>

            <div className="custody-principles">
              <h4>🏛️ Universal Custody Principles</h4>
              <ul>
                <li><strong>Start Small:</strong> Begin with small amounts while learning</li>
                <li><strong>Scale Security:</strong> Higher amounts need higher security</li>
                <li><strong>Never All In One Place:</strong> Diversify custody solutions</li>
                <li><strong>Test Everything:</strong> Practice recovery before you need it</li>
                <li><strong>Plan for Inheritance:</strong> Ensure others can access if needed</li>
              </ul>
          </div>
          </div>
        )}

        <div className="module-completion">
          <div className="completion-card">
            <CheckCircle className="w-8 h-8 text-green-500" />
            <h3>🎓 Keys & Custody Mastery Complete!</h3>
            <p>You now understand:</p>
            <ul>
              <li>✅ True digital ownership vs traditional ownership</li>
              <li>✅ How randomness creates cryptographic security</li>
              <li>✅ Private keys, public keys, and digital signatures</li>
              <li>✅ Bitcoin address generation and types</li>
              <li>✅ Custody decisions for different situations</li>
            </ul>
            
            <ModuleCompletionButton 
              moduleName="Keys & Cryptography"
              moduleId="keys"
              customMessage="🔐 Excellent! You've mastered the cryptographic foundations that make Bitcoin secure and trustless!"
            />
          </div>
          </div>
    </div>
  );
  }

  // Main component render
  const currentStepData = cryptoSteps[currentStep];
  const StepComponent = currentStepData?.component;

  return (
    <div className="module-container">
      {/* HERO SECTION - World-class design principles */}
      <div className="module-header">
        <div className="module-title">
          <div className="module-icon">
            <InteractiveIcon type="key" size={48} className="module-icon-keys" />
          </div>
          Keys & Ownership Mastery
        </div>
        <div className="module-subtitle">
          Master the fundamentals of Bitcoin ownership and security
        </div>
      </div>
      
      <div className="section-card">
      
        <div className="steps-progress">
          {cryptoSteps.map((step, index) => (
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

export default KeysModule; 