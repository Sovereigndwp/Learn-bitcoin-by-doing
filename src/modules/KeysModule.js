import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '../contexts/ProgressContext';
import { Crown, Shield, Dice1, Lock, Globe, Eye, Flame, Castle, Swords, ChevronRight, ChevronLeft, Lightbulb } from 'lucide-react';
import { 
  ContinueButton, 
  ActionButton, 
  OptionButton,
  NavigationButton 
} from '../components/EnhancedButtons';
import '../components/ModuleCommon.css';
import './KeysModule.css';

const KeysModule = () => {
  const { completeModule } = useProgress();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(new Set());
  const [userInsights, setUserInsights] = useState({});

  // Sovereignty Architect Journey Steps
  const sovereigntySteps = [
    {
      id: "kingdom_under_siege",
      title: "🏰 Kingdom Under Siege",
      subtitle: "Experience losing access to your wealth through others' control...",
      component: KingdomUnderSiegeStep
    },
    {
      id: "chaos_alchemist", 
      title: "🎲 Chaos Alchemist",
      subtitle: "Transform pure randomness into unbreakable mathematical power",
      component: ChaosAlchemistStep
    },
    {
      id: "secret_guardian",
      title: "🔐 Secret Guardian",
      subtitle: "Forge your cryptographic identity that no one can steal or fake",
      component: SecretGuardianStep
    },
    {
      id: "sovereign_constructor",
      title: "👑 Sovereign Constructor",
      subtitle: "Build your hierarchy of keys and addresses from master seed", 
      component: SovereignConstructorStep
    },
    {
      id: "independence_warrior",
      title: "⚔️ Independence Warrior",
      subtitle: "Battle dependency by comparing self-custody vs institutional control",
      component: IndependenceWarriorStep
    },
    {
      id: "digital_sovereign",
      title: "🌍 Digital Sovereign", 
      subtitle: "Establish complete financial independence and sovereignty mastery",
      component: DigitalSovereignStep
    }
  ];

  // Handle step completion with achievements
  const handleStepComplete = (stepIndex, userChoice = null) => {
    const newCompleted = new Set(completedSteps);
    newCompleted.add(stepIndex);
    setCompletedSteps(newCompleted);
    
    // Store user insights for personalized completion
    if (userChoice) {
      setUserInsights(prev => ({
        ...prev,
        [sovereigntySteps[stepIndex].id]: userChoice
      }));
    }
    
    // Strategic achievement system with sovereignty theme
    const achievements = {
      0: { title: "Siege Survivor", desc: "You understand why control equals vulnerability!" },
      1: { title: "Chaos Master", desc: "You've mastered the art of transforming randomness into power!" },
      2: { title: "Secret Guardian", desc: "You can forge unbreakable cryptographic identity!" },
      3: { title: "Sovereign Constructor", desc: "You've built your digital kingdom from a single seed!" },
      4: { title: "Independence Warrior", desc: "You've chosen self-custody over institutional dependency!" },
      5: { title: "Digital Sovereign", desc: "You've achieved complete financial independence!" }
    };
    
    if (achievements[stepIndex]) {
      setTimeout(() => showAchievement(achievements[stepIndex].title, achievements[stepIndex].desc), 500);
    }
    
    // Auto-advance to next step
    if (stepIndex < sovereigntySteps.length - 1) {
      setTimeout(() => setCurrentStep(stepIndex + 1), 1000);
    } else {
      // Complete module with personalized insights
      setTimeout(() => {
        completeModule('keys');
        navigate('/dashboard');
      }, 2000);
    }
  };

  // Achievement notification system
  const showAchievement = (title, description) => {
    const achievement = document.createElement('div');
    achievement.className = 'achievement-popup sovereignty-achievement';
    achievement.innerHTML = `
      <div class="achievement-content">
        <div class="achievement-icon sovereignty-icon">👑</div>
        <div class="achievement-text">
          <h4>${title}</h4>
          <p>${description}</p>
        </div>
      </div>
    `;
    document.body.appendChild(achievement);
    
    setTimeout(() => {
      achievement.style.opacity = '0';
      setTimeout(() => document.body.removeChild(achievement), 300);
    }, 3000);
  };

  // Progress tracking
  // Progress tracking for visual feedback
  // const progressPercentage = (completedSteps.size / sovereigntySteps.length) * 100;

  return (
    <div className="sovereignty-module">
      {/* Header with sovereignty theme */}
      <div className="module-header sovereignty-header">
        <div className="header-content">
          <Crown className="sovereignty-crown" />
          <div className="header-text">
            <h1>Sovereignty Architect</h1>
            <p>Build Your Unbreakable Digital Kingdom</p>
          </div>
        </div>
        
        {/* Progress flame indicators */}
        <div className="sovereignty-progress">
          <div className="progress-flames">
            {sovereigntySteps.map((step, index) => (
              <div 
                key={step.id}
                className={`progress-flame ${
                  completedSteps.has(index) ? 'completed' : ''
                } ${index === currentStep ? 'active' : ''}`}
              >
                <Flame className="flame-icon" />
                <span className="flame-label">{step.title.split(' ')[1]}</span>
              </div>
            ))}
          </div>
          <div className="progress-text">
            Building your sovereignty: {completedSteps.size} / {sovereigntySteps.length} steps mastered
          </div>
        </div>
      </div>

      {/* Step navigation */}
      <div className="sovereignty-navigation">
        <NavigationButton
          onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
          disabled={currentStep === 0}
          variant="secondary"
        >
          <ChevronLeft /> Previous
        </NavigationButton>
        
        <div className="step-indicator">
          <span className="current-step">{sovereigntySteps[currentStep].title}</span>
          <span className="step-subtitle">{sovereigntySteps[currentStep].subtitle}</span>
        </div>
        
        <NavigationButton
          onClick={() => setCurrentStep(Math.min(sovereigntySteps.length - 1, currentStep + 1))}
          disabled={currentStep === sovereigntySteps.length - 1}
          variant="secondary"
        >
          Next <ChevronRight />
        </NavigationButton>
      </div>

      {/* Main content area */}
      <div className="sovereignty-content">
        {React.createElement(sovereigntySteps[currentStep].component, {
          onComplete: (userChoice) => handleStepComplete(currentStep, userChoice),
          userInsights: userInsights,
          isCompleted: completedSteps.has(currentStep)
        })}
      </div>
    </div>
  );
};

// Step 1: Kingdom Under Siege - Experience losing access through others' control
const KingdomUnderSiegeStep = ({ onComplete }) => {
  const [scenario, setScenario] = useState('bank_freeze');
  const [userReaction, setUserReaction] = useState(null);
  const [showSolution, setShowSolution] = useState(false);

  const siegeScenarios = {
    bank_freeze: {
      title: "🏦 Your Bank Account Gets Frozen",
      story: "Tuesday morning: You wake up to find your bank account frozen due to 'suspicious activity.' Your rent payment bounced. Your cards don't work. The bank says it'll take 7-10 business days to resolve.",
      impact: "Your wealth exists, but you can't access it",
      emotion: "Helpless anger at being locked out of your own money"
    },
    exchange_hack: {
      title: "🔓 Your Exchange Gets Hacked", 
      story: "Breaking news: The exchange where you kept your crypto was hacked overnight. 400,000 users affected. Your Bitcoin balance shows zero. The exchange promises to 'investigate' but offers no timeline for recovery.",
      impact: "Your digital wealth vanished in someone else's failure",
      emotion: "Sick realization that you trusted strangers with your future"
    },
    government_seizure: {
      title: "🏛️ Government Asset Seizure",
      story: "A new financial regulation classifies your assets as 'reportable.' Banks freeze accounts pending compliance. You have 30 days to prove the source of every transaction from the past 5 years, or lose access permanently.",
      impact: "Political winds changed, your wealth became a target",
      emotion: "Betrayal by the system you thought protected you"
    }
  };

  const reactions = [
    { id: 'panic', text: "Panic and stress about losing everything", emotion: "😰" },
    { id: 'accept', text: "Accept it as just how the system works", emotion: "😞" },
    { id: 'fight', text: "Get angry and want to fight the system", emotion: "😡" },
    { id: 'seek', text: "Seek alternatives where this can't happen", emotion: "🔍" }
  ];

  const handleReaction = (reaction) => {
    setUserReaction(reaction);
    setShowSolution(true);
  };

  const currentScenario = siegeScenarios[scenario];

  return (
    <div className="siege-step">
      <div className="siege-header">
        <Castle className="siege-icon" />
        <div>
          <h2>Your Financial Kingdom Is Under Attack</h2>
          <p>Experience what happens when others control your wealth...</p>
        </div>
      </div>

      {/* Scenario selection */}
      <div className="scenario-selection">
        <h3>Choose your siege scenario:</h3>
        <div className="scenario-options">
          {Object.entries(siegeScenarios).map(([key, scen]) => (
            <OptionButton
              key={key}
              onClick={() => setScenario(key)}
              className={scenario === key ? 'selected' : ''}
            >
              {scen.title}
            </OptionButton>
          ))}
        </div>
      </div>

      {/* Current scenario display */}
      <div className="siege-scenario">
        <div className="scenario-story">
          <h3>{currentScenario.title}</h3>
          <div className="story-text">{currentScenario.story}</div>
          <div className="impact-box">
            <strong>Impact:</strong> {currentScenario.impact}
          </div>
          <div className="emotion-box">
            <strong>Feeling:</strong> {currentScenario.emotion}
          </div>
        </div>

        {!userReaction && (
          <div className="reaction-prompt">
            <h4>How does this make you feel?</h4>
            <div className="reaction-options">
              {reactions.map(reaction => (
                <OptionButton
                  key={reaction.id}
                  onClick={() => handleReaction(reaction)}
                >
                  {reaction.emotion} {reaction.text}
                </OptionButton>
              ))}
            </div>
          </div>
        )}

        {showSolution && (
          <div className="sovereignty-solution">
            <div className="solution-reveal">
              <Shield className="solution-icon" />
              <h3>The Sovereignty Solution</h3>
              <div className="solution-text">
                What if no bank, exchange, or government could EVER lock you out of your wealth? 
                What if your money was protected by unbreakable mathematics instead of breakable institutions?
              </div>
            </div>

            <div className="bitcoin-promise">
              <h4>🗝️ Bitcoin's Cryptographic Promise:</h4>
              <ul>
                <li><strong>Your keys = Your absolute control</strong> - No one can freeze, seize, or deny access</li>
                <li><strong>Mathematical ownership</strong> - Protected by cryptography, not institutions</li>
                <li><strong>Global accessibility</strong> - Access your wealth from anywhere, anytime</li>
                <li><strong>Sovereign immunity</strong> - No third party can betray your trust</li>
              </ul>
            </div>

            <ContinueButton onClick={() => onComplete({ scenario, reaction: userReaction })}>
              Learn How to Build True Sovereignty →
            </ContinueButton>
          </div>
        )}
      </div>
    </div>
  );
};

// Step 2: Chaos Alchemist - Transform randomness into cryptographic power
const ChaosAlchemistStep = ({ onComplete }) => {
  const [entropyMethod, setEntropyMethod] = useState('dice');
  const [entropyData, setEntropyData] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showTransformation, setShowTransformation] = useState(false);

  const entropyMethods = {
    dice: {
      title: "🎲 Dice Rolling Chaos",
      description: "Roll physical dice to generate pure randomness",
      strength: "High - True physical randomness",
      method: "Roll 6-sided dice 50 times"
    },
    coin: {
      title: "🪙 Coin Flip Entropy", 
      description: "Flip coins to create binary randomness",
      strength: "High - Physical quantum uncertainty",
      method: "Flip coin 256 times (heads=1, tails=0)"
    },
    quantum: {
      title: "⚛️ Quantum Fluctuations",
      description: "Use quantum mechanics for ultimate randomness",
      strength: "Maximum - Fundamental universe randomness",
      method: "Quantum random number generator"
    },
    environment: {
      title: "🌪️ Environmental Chaos",
      description: "Mouse movements, typing patterns, ambient noise",
      strength: "Medium - Human-generated entropy",
      method: "Combine multiple environmental sources"
    }
  };

  const generateEntropy = () => {
    setIsGenerating(true);
    
    // Simulate entropy generation process
    let fakeEntropy = '';
    const chars = '0123456789abcdef';
    
    const interval = setInterval(() => {
      if (fakeEntropy.length < 64) {
        fakeEntropy += chars[Math.floor(Math.random() * chars.length)];
        setEntropyData(fakeEntropy);
      } else {
        clearInterval(interval);
        setIsGenerating(false);
        setShowTransformation(true);
      }
    }, 100);
  };

  const currentMethod = entropyMethods[entropyMethod];

  return (
    <div className="chaos-alchemist-step">
      <div className="alchemist-header">
        <Dice1 className="chaos-icon" />
        <div>
          <h2>Transform Chaos Into Cryptographic Power</h2>
          <p>You're about to become an entropy alchemist...</p>
        </div>
      </div>

      <div className="chaos-explanation">
        <div className="prime-text">
          💡 Your Bitcoin security begins with chaos. The more random, the more unbreakable. 
          You're about to transform pure randomness into mathematical sovereignty.
        </div>
      </div>

      {/* Entropy method selection */}
      <div className="entropy-methods">
        <h3>Choose your chaos source:</h3>
        <div className="method-grid">
          {Object.entries(entropyMethods).map(([key, method]) => (
            <div 
              key={key}
              className={`entropy-method ${entropyMethod === key ? 'selected' : ''}`}
              onClick={() => setEntropyMethod(key)}
            >
              <div className="method-header">
                <span className="method-title">{method.title}</span>
                <span className="method-strength">{method.strength}</span>
              </div>
              <div className="method-description">{method.description}</div>
              <div className="method-process">{method.method}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Entropy generation process */}
      <div className="entropy-generation">
        <div className="generation-display">
          <h4>🧪 Entropy Alchemy in Progress</h4>
          <div className="entropy-output">
            <div className="entropy-label">Raw Entropy (256 bits):</div>
            <div className={`entropy-hex ${isGenerating ? 'generating' : ''}`}>
              {entropyData || 'Click "Generate Chaos" to begin...'}
            </div>
          </div>
          
          {!isGenerating && !showTransformation && (
            <ActionButton onClick={generateEntropy}>
              🎲 Generate Chaos from {currentMethod.title}
            </ActionButton>
          )}
          
          {isGenerating && (
            <div className="generating-status">
              <div className="loading-spinner"></div>
              Extracting randomness from {currentMethod.title.toLowerCase()}...
            </div>
          )}
        </div>

        {showTransformation && (
          <div className="transformation-reveal">
            <div className="transformation-steps">
              <h4>⚗️ The Alchemical Transformation</h4>
              
              <div className="transformation-step">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h5>Raw Chaos → Private Key</h5>
                  <div className="transformation-visual">
                    <div className="input">{entropyData}</div>
                    <div className="arrow">→</div>
                    <div className="output">Your Secret Mathematical Identity</div>
                  </div>
                </div>
              </div>
              
              <div className="transformation-step">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h5>Private Key → Public Key</h5>
                  <div className="transformation-visual">
                    <div className="input">Secret Identity</div>
                    <div className="arrow">→</div>
                    <div className="output">Verifiable Proof System</div>
                  </div>
                </div>
              </div>
              
              <div className="transformation-step">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h5>Public Key → Bitcoin Address</h5>
                  <div className="transformation-visual">
                    <div className="input">Proof System</div>
                    <div className="arrow">→</div>
                    <div className="output">Your Digital Sovereign Territory</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="alchemy-insight">
              <Lightbulb className="insight-icon" />
              <div className="insight-text">
                <strong>The Alchemical Truth:</strong> You just transformed pure chaos into unbreakable 
                mathematical ownership. This randomness becomes the foundation of your digital sovereignty—
                impossible to guess, impossible to replicate, impossible to steal.
              </div>
            </div>

            <ContinueButton onClick={() => onComplete({ method: entropyMethod, entropy: entropyData })}>
              Master the Art of Cryptographic Identity →
            </ContinueButton>
          </div>
        )}
      </div>
    </div>
  );
};

// Step 3: Secret Guardian - Forge cryptographic identity
const SecretGuardianStep = ({ onComplete }) => {
  const [demoKeys, setDemoKeys] = useState(null);
  const [showSigning, setShowSigning] = useState(false);
  const [message, setMessage] = useState('I am the sovereign ruler of my digital kingdom');
  const [signature, setSignature] = useState('');
  const [verificationResult, setVerificationResult] = useState(null);

  const generateDemoKeys = () => {
    // Demo key generation (simplified for educational purposes)
    const demoKeyPair = {
      privateKey: '5KJvsngHeMpm884wtkJNzQGaCErckhHJBGFsvd3VyK5qMZXj3hS',
      publicKey: '027de80cebd39ce408a7dd25ac33e18fa48c1bd9ad8cc1a3f9b25a15eddfd4f',
      address: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
      wif: 'L4rK1yDtCWekvXuE6oXD9jCYfFNV2cWRpVuPLBcCU2z8TrisoyY1'
    };
    setDemoKeys(demoKeyPair);
  };

  const signMessage = () => {
    setShowSigning(true);
    // Simulate signing process
    setTimeout(() => {
      setSignature('H5x8+vZ5x8/zxL6x8wZ5x8/zxL6w8Z5x8/zxL6w8Z5x8/zxL6x8wZ5x8==');
      setVerificationResult('valid');
    }, 1500);
  };

  const guardianPowers = [
    {
      power: "🔐 Sign Transactions",
      description: "Prove you own Bitcoin without revealing your private key",
      example: "Move your Bitcoin anywhere in the world"
    },
    {
      power: "🛡️ Verify Identity", 
      description: "Prove your identity cryptographically",
      example: "Login without passwords or personal information"
    },
    {
      power: "📜 Create Contracts",
      description: "Enter agreements enforced by mathematics",
      example: "Multisig contracts, time locks, conditional payments"
    },
    {
      power: "🌍 Global Access",
      description: "Access your wealth from anywhere",
      example: "Your sovereignty travels with you across borders"
    }
  ];

  return (
    <div className="secret-guardian-step">
      <div className="guardian-header">
        <Lock className="guardian-icon" />
        <div>
          <h2>Forge Your Cryptographic Identity</h2>
          <p>Become the guardian of unbreakable mathematical secrets...</p>
        </div>
      </div>

      <div className="guardian-explanation">
        <div className="prime-text">
          💡 Your private key is your cryptographic DNA. It can sign messages and transactions that 
          prove you are you—without revealing your secret. This is the power of guardianship.
        </div>
      </div>

      {/* Key generation demo */}
      <div className="key-forge">
        <h3>🔥 The Cryptographic Forge</h3>
        
        {!demoKeys ? (
          <div className="forge-start">
            <div className="forge-description">
              You're about to create a cryptographic identity that is:
              <ul>
                <li><strong>Unique</strong> - No one else in the universe has these keys</li>
                <li><strong>Unbreakable</strong> - Protected by 256-bit mathematics</li>
                <li><strong>Yours Forever</strong> - No authority can revoke or change them</li>
              </ul>
            </div>
            <ActionButton onClick={generateDemoKeys}>
              🔨 Forge My Cryptographic Identity
            </ActionButton>
          </div>
        ) : (
          <div className="keys-display">
            <div className="key-item">
              <h4>🔐 Private Key (Your Secret)</h4>
              <div className="key-value secret">
                <Eye className="key-icon" />
                {demoKeys.privateKey}
              </div>
              <div className="key-description">
                Guard this with your life. Anyone with this controls your Bitcoin.
              </div>
            </div>
            
            <div className="key-item">
              <h4>🌍 Public Key (Your Proof)</h4>
              <div className="key-value public">
                <Globe className="key-icon" />
                {demoKeys.publicKey}
              </div>
              <div className="key-description">
                Share this freely. It proves signatures came from your private key.
              </div>
            </div>
            
            <div className="key-item">
              <h4>📮 Bitcoin Address (Your Kingdom)</h4>
              <div className="key-value address">
                <Crown className="key-icon" />
                {demoKeys.address}
              </div>
              <div className="key-description">
                Your digital territory where Bitcoin can be sent and stored.
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Signing demonstration */}
      {demoKeys && (
        <div className="signing-demo">
          <h3>✍️ Demonstrate Your Guardian Powers</h3>
          
          <div className="message-signing">
            <div className="signing-input">
              <label>Message to sign:</label>
              <input 
                type="text" 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="message-input"
              />
            </div>
            
            {!showSigning ? (
              <ActionButton onClick={signMessage}>
                ✍️ Sign with My Private Key
              </ActionButton>
            ) : (
              <div className="signing-process">
                <div className="signing-steps">
                  <div className="signing-step">
                    <div className="step-icon">📝</div>
                    <div>Message: "{message}"</div>
                  </div>
                  <div className="signing-step">
                    <div className="step-icon">🔐</div>
                    <div>Signing with private key...</div>
                  </div>
                  {signature && (
                    <>
                      <div className="signing-step">
                        <div className="step-icon">📋</div>
                        <div>Signature: {signature}</div>
                      </div>
                      <div className="signing-step">
                        <div className="step-icon">✅</div>
                        <div>Verification: Valid! This message was signed by your private key.</div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Guardian powers */}
      {verificationResult && (
        <div className="guardian-powers">
          <h3>👑 Your Guardian Powers Unlocked</h3>
          <div className="powers-grid">
            {guardianPowers.map((power, index) => (
              <div key={index} className="power-card">
                <div className="power-header">
                  <span className="power-icon">{power.power.split(' ')[0]}</span>
                  <span className="power-name">{power.power.split(' ').slice(1).join(' ')}</span>
                </div>
                <div className="power-description">{power.description}</div>
                <div className="power-example">{power.example}</div>
              </div>
            ))}
          </div>

          <div className="guardian-truth">
            <Shield className="truth-icon" />
            <div className="truth-text">
              <strong>The Guardian's Truth:</strong> You now possess mathematical proof of identity 
              that no government can issue, no authority can revoke, and no institution can control. 
              You are your own digital sovereign.
            </div>
          </div>

          <ContinueButton onClick={() => onComplete({ keys: demoKeys, message, signature })}>
            Build Your Digital Kingdom's Architecture →
          </ContinueButton>
        </div>
      )}
    </div>
  );
};

// Step 4: Sovereign Constructor - Build hierarchy from master seed
const SovereignConstructorStep = ({ onComplete }) => {
  const [, setSeedPhrase] = useState('');
  const [generatedSeed, setGeneratedSeed] = useState(null);
  // Derivation path for advanced users
  // const [derivationPath, setDerivationPath] = useState("m/44'/0'/0'/0/0");
  const [hierarchyLevel, setHierarchyLevel] = useState(0);
  const [showConstruction, setShowConstruction] = useState(false);

  const generateSeedPhrase = () => {
    // Demo 12-word seed phrase
    const words = [
      'abandon', 'ability', 'able', 'about', 'above', 'absent',
      'absorb', 'abstract', 'absurd', 'abuse', 'access', 'accident'
    ];
    const phrase = words.join(' ');
    setSeedPhrase(phrase);
    setGeneratedSeed({
      phrase: phrase,
      masterKey: 'xprv9s21ZrQH143K3QTDL4LXw2F7HEK3wJUD2nW2nRk4stbPy6cq3jPPqjiChkVvvNKmPGJxWUtg6LnF5kejMRNNU3TGtRBeJgk33yuGBxrMPHi',
      masterChainCode: '873dff81c02f525623fd1fe5167eac3a55a049de3d314bb42ee227ffed37d508'
    });
    setShowConstruction(true);
  };

  const hierarchyLevels = [
    {
      level: 0,
      path: "m",
      title: "👑 Master Seed",
      description: "Your royal bloodline - the source of all power",
      example: "12 or 24 word seed phrase"
    },
    {
      level: 1,
      path: "m/44'",
      title: "🏰 Purpose (44 = BIP44)",
      description: "The kingdom's constitution - defines the rules",
      example: "Bitcoin's standard account structure"
    },
    {
      level: 2,
      path: "m/44'/0'",
      title: "⚔️ Coin Type (0 = Bitcoin)",
      description: "Your kingdom's currency - Bitcoin realm",
      example: "0 for Bitcoin, 1 for Testnet, 2 for Litecoin"
    },
    {
      level: 3,
      path: "m/44'/0'/0'",
      title: "🏛️ Account (0 = First account)",
      description: "Your royal treasury - separate wealth pools",
      example: "Different accounts for different purposes"
    },
    {
      level: 4,
      path: "m/44'/0'/0'/0",
      title: "🚪 Chain (0 = External)",
      description: "Kingdom gates - external vs internal addresses",
      example: "0 for receiving, 1 for change addresses"
    },
    {
      level: 5,
      path: "m/44'/0'/0'/0/0",
      title: "📮 Address Index (0 = First)",
      description: "Individual address in your kingdom",
      example: "Unique address for each transaction"
    }
  ];

  const constructionInsights = [
    "🌳 One seed creates infinite addresses - your digital family tree",
    "🔐 Each path produces different keys - infinite expansion from one source",
    "🛡️ Lose the seed, lose everything - guard it like your kingdom's crown",
    "⚡ Deterministic generation - same seed always produces same addresses",
    "🌍 Universal standard - your seed works in any compatible wallet"
  ];

  return (
    <div className="sovereign-constructor-step">
      <div className="constructor-header">
        <Crown className="constructor-icon" />
        <div>
          <h2>Build Your Digital Kingdom's Architecture</h2>
          <p>From one seed, construct infinite sovereign territories...</p>
        </div>
      </div>

      <div className="constructor-explanation">
        <div className="prime-text">
          💡 Your seed phrase is the master blueprint for your entire digital kingdom. 
          From these 12-24 words, you can generate millions of addresses, each one 
          a sovereign territory under your mathematical rule.
        </div>
      </div>

      {/* Seed generation */}
      <div className="seed-generation">
        <h3>🌱 Create Your Master Seed</h3>
        
        {!generatedSeed ? (
          <div className="seed-start">
            <div className="seed-importance">
              Your seed phrase is:
              <ul>
                <li><strong>The Master Key</strong> - Controls your entire digital kingdom</li>
                <li><strong>Portable Sovereignty</strong> - 12-24 words contain infinite wealth</li>
                <li><strong>Universal Recovery</strong> - Works in any compatible wallet</li>
                <li><strong>Your Responsibility</strong> - No one can recover it if lost</li>
              </ul>
            </div>
            <ActionButton onClick={generateSeedPhrase}>
              🌱 Generate My Master Seed
            </ActionButton>
          </div>
        ) : (
          <div className="seed-display">
            <div className="seed-phrase">
              <h4>🔐 Your Master Seed Phrase</h4>
              <div className="phrase-grid">
                {generatedSeed.phrase.split(' ').map((word, index) => (
                  <div key={index} className="seed-word">
                    <span className="word-number">{index + 1}</span>
                    <span className="word-text">{word}</span>
                  </div>
                ))}
              </div>
              <div className="seed-warning">
                ⚠️ In reality, never store your seed digitally. Write it on paper/metal and guard it with your life.
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Hierarchical construction */}
      {showConstruction && (
        <div className="hierarchy-construction">
          <h3>🏗️ Kingdom Architecture Construction</h3>
          
          <div className="hierarchy-builder">
            <div className="hierarchy-controls">
              <label>Construction Level:</label>
              <input 
                type="range" 
                min="0" 
                max="5" 
                value={hierarchyLevel}
                onChange={(e) => setHierarchyLevel(parseInt(e.target.value))}
                className="hierarchy-slider"
              />
              <span className="level-display">Level {hierarchyLevel}: {hierarchyLevels[hierarchyLevel].title}</span>
            </div>

            <div className="hierarchy-visualization">
              {hierarchyLevels.slice(0, hierarchyLevel + 1).map((level, index) => (
                <div key={index} className={`hierarchy-level ${index === hierarchyLevel ? 'active' : ''}`}>
                  <div className="level-header">
                    <span className="level-icon">{level.title.split(' ')[0]}</span>
                    <span className="level-title">{level.title.split(' ').slice(1).join(' ')}</span>
                  </div>
                  <div className="level-path">{level.path}</div>
                  <div className="level-description">{level.description}</div>
                  <div className="level-example">{level.example}</div>
                  {index < hierarchyLevel && <div className="hierarchy-arrow">↓</div>}
                </div>
              ))}
            </div>

            {hierarchyLevel === 5 && (
              <div className="final-address">
                <div className="address-generation">
                  <h4>🎯 Final Generated Address</h4>
                  <div className="generated-address">
                    <div className="address-type">Bitcoin Address:</div>
                    <div className="address-value">bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh</div>
                  </div>
                  <div className="address-power">
                    This address is mathematically derived from your seed. 
                    You can regenerate it anytime with the same seed + path.
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="construction-insights">
            <h4>🧠 Constructor's Wisdom</h4>
            <div className="insights-list">
              {constructionInsights.map((insight, index) => (
                <div key={index} className="insight-item">
                  <div className="insight-text">{insight}</div>
                </div>
              ))}
            </div>
          </div>

          <ContinueButton onClick={() => onComplete({ seed: generatedSeed, finalLevel: hierarchyLevel })}>
            Lead the Battle for Financial Independence →
          </ContinueButton>
        </div>
      )}
    </div>
  );
};

// Step 5: Independence Warrior - Battle dependency vs self-custody
const IndependenceWarriorStep = ({ onComplete }) => {
  const [battleChoice, setBattleChoice] = useState(null);
  const [showConsequences, setShowConsequences] = useState(false);
  const [userCommitment, setUserCommitment] = useState('');

  const battleOptions = [
    {
      id: 'institutional',
      title: "🏦 Institutional Dependency",
      subtitle: "Let trusted third parties manage your Bitcoin",
      appeal: "Convenience, insurance, professional management",
      weapon: "Trust in institutions"
    },
    {
      id: 'self_custody',
      title: "⚔️ Self-Custody Sovereignty", 
      subtitle: "Be your own bank with complete control",
      appeal: "Total control, unconfiscatable, true ownership",
      weapon: "Mathematical proof and personal responsibility"
    },
    {
      id: 'hybrid',
      title: "🛡️ Hybrid Strategy",
      subtitle: "Split between institutional and self-custody",
      appeal: "Balance of convenience and sovereignty",
      weapon: "Diversified risk and gradual independence"
    }
  ];

  const consequences = {
    institutional: {
      pros: [
        "✅ Easy to use, familiar interface",
        "✅ Customer support when things go wrong", 
        "✅ Professional security teams",
        "✅ Insurance coverage (limited)"
      ],
      cons: [
        "❌ Can freeze/seize your Bitcoin",
        "❌ Single point of failure (exchange hacks)",
        "❌ Requires KYC/AML compliance",
        "❌ Not your keys, not your Bitcoin",
        "❌ Vulnerable to regulatory changes"
      ],
      outcome: "You remain dependent on others for your financial sovereignty"
    },
    self_custody: {
      pros: [
        "✅ Complete control and ownership",
        "✅ Unconfiscatable by any authority",
        "✅ Access anywhere, anytime", 
        "✅ True financial sovereignty",
        "✅ Immune to exchange hacks/closures"
      ],
      cons: [
        "❌ You're responsible for security",
        "❌ No customer support if you mess up",
        "❌ Need to learn proper backup procedures",
        "❌ Inheritance planning complexity"
      ],
      outcome: "You achieve true financial independence and sovereignty"
    },
    hybrid: {
      pros: [
        "✅ Risk diversification",
        "✅ Learning curve management",
        "✅ Liquidity flexibility",
        "✅ Gradual sovereignty building"
      ],
      cons: [
        "❌ Partial exposure to institutional risks",
        "❌ More complex management",
        "❌ Still some dependency",
        "❌ Potentially higher fees"
      ],
      outcome: "You balance convenience with gradual independence building"
    }
  };

  const handleBattleChoice = (choice) => {
    setBattleChoice(choice);
    setShowConsequences(true);
  };

  const warriorCommitments = [
    "I commit to learning proper backup and recovery procedures",
    "I will start with small amounts while building confidence",
    "I accept responsibility for my own financial security",
    "I will educate myself on hardware wallets and best practices",
    "I choose sovereignty over convenience"
  ];

  return (
    <div className="independence-warrior-step">
      <div className="warrior-header">
        <Swords className="warrior-icon" />
        <div>
          <h2>The Battle for Financial Independence</h2>
          <p>Choose your weapon in the war against financial dependency...</p>
        </div>
      </div>

      <div className="battle-setup">
        <div className="battle-description">
          <div className="prime-text">
            💡 This is the moment of truth. You understand Bitcoin's technology. 
            Now you must choose: Will you be your own bank, or remain dependent 
            on others to hold your wealth?
          </div>
        </div>

        <div className="battle-scenario">
          <h3>⚔️ The Independence Battleground</h3>
          <div className="scenario-text">
            You now own Bitcoin. The question is: who controls the keys? 
            This choice determines whether you're truly sovereign or still dependent 
            on the old system.
          </div>
        </div>
      </div>

      {/* Battle choice selection */}
      <div className="battle-choices">
        <h3>Choose your battle strategy:</h3>
        <div className="choice-grid">
          {battleOptions.map(option => (
            <div 
              key={option.id}
              className={`battle-option ${battleChoice === option.id ? 'selected' : ''}`}
              onClick={() => handleBattleChoice(option.id)}
            >
              <div className="option-header">
                <span className="option-icon">{option.title.split(' ')[0]}</span>
                <span className="option-title">{option.title.split(' ').slice(1).join(' ')}</span>
              </div>
              <div className="option-subtitle">{option.subtitle}</div>
              <div className="option-appeal">
                <strong>Appeal:</strong> {option.appeal}
              </div>
              <div className="option-weapon">
                <strong>Weapon:</strong> {option.weapon}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Battle consequences */}
      {showConsequences && battleChoice && (
        <div className="battle-consequences">
          <h3>⚖️ Battle Consequences: {battleOptions.find(o => o.id === battleChoice).title}</h3>
          
          <div className="consequences-analysis">
            <div className="pros-cons">
              <div className="pros-section">
                <h4>💪 Strategic Advantages</h4>
                <div className="pros-list">
                  {consequences[battleChoice].pros.map((pro, index) => (
                    <div key={index} className="consequence-item">{pro}</div>
                  ))}
                </div>
              </div>
              
              <div className="cons-section">
                <h4>⚠️ Strategic Risks</h4>
                <div className="cons-list">
                  {consequences[battleChoice].cons.map((con, index) => (
                    <div key={index} className="consequence-item">{con}</div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="outcome-section">
              <h4>🎯 Ultimate Outcome</h4>
              <div className="outcome-text">{consequences[battleChoice].outcome}</div>
            </div>
          </div>

          {battleChoice === 'self_custody' && (
            <div className="warrior-commitment">
              <h4>⚔️ Warrior's Oath</h4>
              <div className="commitment-text">
                Self-custody is power, but power requires responsibility. 
                Make your commitment to true financial sovereignty:
              </div>
              <div className="commitment-options">
                {warriorCommitments.map((commitment, index) => (
                  <label key={index} className="commitment-item">
                    <input 
                      type="checkbox" 
                      onChange={(e) => {
                        if (e.target.checked) {
                          setUserCommitment(prev => prev + commitment + '; ');
                        }
                      }}
                    />
                    <span>{commitment}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          <div className="battle-wisdom">
            <Lightbulb className="wisdom-icon" />
            <div className="wisdom-text">
              <strong>Warrior's Wisdom:</strong> There's no "right" choice for everyone. 
              The key is making an informed decision that aligns with your values, 
              risk tolerance, and sovereignty goals. You can always evolve your strategy.
            </div>
          </div>

          <ContinueButton onClick={() => onComplete({ choice: battleChoice, commitment: userCommitment })}>
            Establish Your Digital Sovereignty →
          </ContinueButton>
        </div>
      )}
    </div>
  );
};

// Step 6: Digital Sovereign - Complete sovereignty establishment
const DigitalSovereignStep = ({ onComplete, userInsights }) => {
  const [sovereigntyLevel, setSovereigntyLevel] = useState(0);
  const [showManifesto, setShowManifesto] = useState(false);
  const [, setReadyForTransactions] = useState(false);

  useEffect(() => {
    // Auto-advance sovereignty level
    const interval = setInterval(() => {
      setSovereigntyLevel(prev => {
        if (prev < 100) {
          return prev + 2;
        } else {
          setShowManifesto(true);
          clearInterval(interval);
          return 100;
        }
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const sovereigntyMilestones = [
    { level: 20, achievement: "🏰 Kingdom Foundations Established" },
    { level: 40, achievement: "🎲 Entropy Mastery Achieved" },
    { level: 60, achievement: "🔐 Cryptographic Identity Forged" },
    { level: 80, achievement: "👑 Digital Architecture Built" },
    { level: 100, achievement: "⚔️ Independence War Won" }
  ];

  const sovereigntyManifesto = [
    "I understand that Bitcoin keys grant mathematical ownership",
    "I know that entropy creates unbreakable cryptographic power",
    "I can generate and verify digital signatures",
    "I comprehend hierarchical deterministic key derivation",
    "I choose my level of custody based on informed decision-making",
    "I am ready to take responsibility for my financial sovereignty"
  ];

  const nextSteps = [
    {
      title: "🎯 Master Bitcoin Transactions",
      description: "Learn how your sovereign keys control UTXOs and move Bitcoin globally",
      action: "Continue to Transaction Module"
    },
    {
      title: "📜 Explore Bitcoin Scripts", 
      description: "Discover how to program money with smart contracts and conditions",
      action: "Advanced custody strategies"
    },
    {
      title: "🌐 Practice with Small Amounts",
      description: "Start your sovereignty journey with small amounts while building confidence",
      action: "Real-world application"
    }
  ];

  return (
    <div className="digital-sovereign-step">
      <div className="sovereign-header">
        <Crown className="sovereign-icon" />
        <div>
          <h2>Your Digital Sovereignty Is Complete</h2>
          <p>You have built an unbreakable digital kingdom...</p>
        </div>
      </div>

      {/* Sovereignty building animation */}
      <div className="sovereignty-building">
        <h3>🏗️ Sovereignty Construction Progress</h3>
        <div className="sovereignty-meter">
          <div className="meter-background">
            <div 
              className="meter-fill" 
              style={{ width: `${sovereigntyLevel}%` }}
            />
            <div className="meter-text">{sovereigntyLevel}% Digital Sovereign</div>
          </div>
        </div>

        <div className="milestones">
          {sovereigntyMilestones.map((milestone, index) => (
            <div 
              key={index}
              className={`milestone ${sovereigntyLevel >= milestone.level ? 'achieved' : ''}`}
            >
              <div className="milestone-marker" />
              <div className="milestone-text">{milestone.achievement}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Sovereignty manifesto */}
      {showManifesto && (
        <div className="sovereignty-manifesto">
          <h3>👑 Digital Sovereignty Manifesto</h3>
          <div className="manifesto-intro">
            You have completed the transformation from financial dependent to digital sovereign. 
            Here's what you've mastered:
          </div>
          
          <div className="manifesto-items">
            {sovereigntyManifesto.map((item, index) => (
              <div key={index} className="manifesto-item">
                <div className="manifesto-check">✅</div>
                <div className="manifesto-text">{item}</div>
              </div>
            ))}
          </div>

          <div className="user-journey-summary">
            <h4>🎯 Your Sovereignty Journey</h4>
            <div className="journey-insights">
              {userInsights.kingdom_under_siege && (
                <div className="insight-item">
                  <strong>Siege Awareness:</strong> You experienced {userInsights.kingdom_under_siege.scenario} 
                  and felt {userInsights.kingdom_under_siege.reaction.text}
                </div>
              )}
              {userInsights.chaos_alchemist && (
                <div className="insight-item">
                  <strong>Entropy Method:</strong> You chose {userInsights.chaos_alchemist.method} 
                  to generate cryptographic randomness
                </div>
              )}
              {userInsights.independence_warrior && (
                <div className="insight-item">
                  <strong>Custody Strategy:</strong> You selected {userInsights.independence_warrior.choice} 
                  as your sovereignty approach
                </div>
              )}
            </div>
          </div>

          <div className="sovereignty-power">
            <Shield className="power-icon" />
            <div className="power-text">
              <strong>Your Sovereign Powers:</strong> You now possess the knowledge to be your own bank, 
              control your wealth mathematically, and access your Bitcoin from anywhere in the world 
              without permission from any authority.
            </div>
          </div>

          <div className="next-steps-section">
            <h4>🚀 Continue Your Sovereignty Mastery</h4>
            <div className="next-steps">
              {nextSteps.map((step, index) => (
                <div key={index} className="next-step">
                  <div className="step-header">
                    <span className="step-icon">{step.title.split(' ')[0]}</span>
                    <span className="step-title">{step.title.split(' ').slice(1).join(' ')}</span>
                  </div>
                  <div className="step-description">{step.description}</div>
                  <div className="step-action">{step.action}</div>
                </div>
              ))}
            </div>
          </div>

          <ContinueButton 
            onClick={() => {
              setReadyForTransactions(true);
              onComplete({ 
                sovereigntyLevel: 100, 
                manifesto: sovereigntyManifesto,
                nextAction: 'transactions'
              });
            }}
          >
            Master Bitcoin Transactions with Your Sovereign Keys →
          </ContinueButton>
        </div>
      )}
    </div>
  );
};

export default KeysModule; 