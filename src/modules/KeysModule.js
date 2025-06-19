import React, { useState } from 'react';
import { useProgress } from '../contexts/ProgressContext';
import { useLanguage } from '../contexts/LanguageContext';
import CodeEditor from '../components/CodeEditor';
import { generatePrivateKey, privateKeyToPublicKey, publicKeyToAddress } from '../utils/bitcoin';
import { Key, CheckCircle, Trophy, Lock, Unlock, MapPin } from 'lucide-react';
import '../components/ModuleCommon.css';

const KeysModule = () => {
  const { completeModule, isModuleCompleted } = useProgress();
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(new Set());

  const steps = [
    {
      title: "Introduction",
      type: "intro",
      content: {
        title: "Bitcoin Keys and Addresses",
        text: "Bitcoin uses public-key cryptography to prove ownership. Your private key is like a secret password that lets you spend coins. Your public key and address are like your account number that others can send coins to. Never share your private key!"
      }
    },
    {
      title: "Warm-up: Key Concepts",
      type: "warmup",
      content: {
        question: "Which of these should you NEVER share with anyone?",
        options: [
          "Your Bitcoin address", 
          "Your public key", 
          "Your private key", 
          "Your transaction ID"
        ],
        correct: 2,
        explanation: "Your private key is the secret that controls your coins. Anyone with your private key can spend your Bitcoin. Addresses and public keys are safe to share - that's how people send you coins!"
      }
    },
    {
      title: "Code Lab: Key Generation",
      type: "codelab",
      content: {
        title: "Generate a Complete Key Pair",
        initialCode: `function generateKeyPair() {
  // Generate private key, derive public key, then create address
  // Use: generatePrivateKey(), privateKeyToPublicKey(), publicKeyToAddress()
  // Return an object with all three values
  
  // Your code here:
  
}`,
        testFunction: (userFunc) => {
          const result = userFunc();
          
          if (!result || typeof result !== 'object') {
            throw new Error("Function should return an object");
          }
          
          if (!result.privateKey || typeof result.privateKey !== 'string') {
            throw new Error("Result should have a 'privateKey' string property");
          }
          
          if (!result.publicKey || typeof result.publicKey !== 'string') {
            throw new Error("Result should have a 'publicKey' string property");
          }
          
          if (!result.address || typeof result.address !== 'string') {
            throw new Error("Result should have an 'address' string property");
          }
          
          // Verify the keys are related
          const expectedPubKey = privateKeyToPublicKey(result.privateKey);
          if (result.publicKey !== expectedPubKey) {
            throw new Error("Public key doesn't match private key");
          }
          
          const expectedAddress = publicKeyToAddress(result.publicKey);
          if (result.address !== expectedAddress) {
            throw new Error("Address doesn't match public key");
          }
          
          return `Perfect! Generated a complete key pair:\n• Private: ${result.privateKey.substring(0, 10)}...\n• Public: ${result.publicKey.substring(0, 10)}...\n• Address: ${result.address}`;
        }
      }
    },
    {
      title: "Challenge: Address Validation",
      type: "challenge",
      content: {
        title: "Create and Verify Addresses",
        description: "Generate multiple addresses and understand the relationship between private keys, public keys, and addresses. Practice with both mainnet and testnet formats.",
        data: {
          networks: [
            { name: 'Testnet', prefix: 'm', description: 'For testing - fake Bitcoin.' },
            { name: 'Mainnet', prefix: '1', description: 'Real Bitcoin network.' }
          ]
        }
      }
    },
    {
      title: "Reflection",
      type: "reflection",
      content: {
        question: "How do Bitcoin keys enable ownership without a central authority?",
        placeholder: "Think about how cryptography lets you prove you own coins without needing a bank or government to verify your identity..."
      }
    }
  ];

  const handleStepComplete = (stepIndex) => {
    const newCompleted = new Set(completedSteps);
    newCompleted.add(stepIndex);
    setCompletedSteps(newCompleted);
    
    if (newCompleted.size === steps.length) {
      completeModule('keys');
    }
  };

  const renderStep = (step, index) => {
    switch (step.type) {
      case 'intro':
        return (
          <div className="step-content intro-step">
            <div className="step-icon">
              <Key size={48} />
            </div>
            <h2>{step.content.title}</h2>
            <p className="intro-text">{step.content.text}</p>
            <div className="intro-highlights">
              <div className="highlight-item">
                <Lock size={20} />
                <span>Private Key (Secret)</span>
              </div>
              <div className="highlight-item">
                <Unlock size={20} />
                <span>Public Key (Shareable)</span>
              </div>
              <div className="highlight-item">
                <MapPin size={20} />
                <span>Address (Destination)</span>
              </div>
            </div>
            <button 
              className="continue-button"
              onClick={() => handleStepComplete(index)}
            >
              Learn Keys
            </button>
          </div>
        );

      case 'warmup':
        return (
          <WarmupQuiz 
            question={step.content.question}
            options={step.content.options}
            correct={step.content.correct}
            explanation={step.content.explanation}
            onComplete={() => handleStepComplete(index)}
          />
        );

      case 'codelab':
        return (
          <CodeEditor
            title={step.content.title}
            initialCode={step.content.initialCode}
            testFunction={step.content.testFunction}
            onSuccess={() => handleStepComplete(index)}
          />
        );

      case 'challenge':
        return (
          <KeysChallenge
            title={step.content.title}
            description={step.content.description}
            data={step.content.data}
            onComplete={() => handleStepComplete(index)}
          />
        );

      case 'reflection':
        return (
          <ReflectionStep
            question={step.content.question}
            placeholder={step.content.placeholder}
            onComplete={() => handleStepComplete(index)}
          />
        );

      default:
        return <div>Unknown step type</div>;
    }
  };

  return (
    <div className="module-container">
      <div className="module-header">
        <h1 className="module-title">
          <Key className="module-icon" />
          Key Generation
        </h1>
        {isModuleCompleted('keys') && (
          <div className="completion-badge">
            <Trophy size={24} />
            Completed!
          </div>
        )}
      </div>

      <div className="module-progress">
        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ width: `${(completedSteps.size / steps.length) * 100}%` }}
          />
        </div>
        <span className="progress-text">
          {completedSteps.size} / {steps.length} steps completed
        </span>
      </div>

      <div className="module-steps">
        <div className="steps-navigation">
          {steps.map((step, index) => (
            <button
              key={index}
              className={`step-nav-button ${currentStep === index ? 'active' : ''} ${completedSteps.has(index) ? 'completed' : ''}`}
              onClick={() => setCurrentStep(index)}
            >
              {completedSteps.has(index) && <CheckCircle size={16} />}
              {step.title}
            </button>
          ))}
        </div>

        <div className="step-content-container">
          {renderStep(steps[currentStep], currentStep)}
        </div>
      </div>
    </div>
  );
};

// Warmup Quiz Component
const WarmupQuiz = ({ question, options, correct, explanation, onComplete }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const handleSubmit = () => {
    setShowResult(true);
    if (selectedAnswer === correct) {
      setTimeout(() => onComplete(), 2000);
    }
  };

  return (
    <div className="step-content warmup-step">
      <div className="step-icon">
        <Key size={48} />
      </div>
      <h2>Security Quiz</h2>
      <p className="quiz-question">{question}</p>
      
      <div className="quiz-options">
        {options.map((option, index) => (
          <button
            key={index}
            className={`quiz-option ${selectedAnswer === index ? 'selected' : ''} ${
              showResult ? (index === correct ? 'correct' : selectedAnswer === index ? 'incorrect' : '') : ''
            }`}
            onClick={() => !showResult && setSelectedAnswer(index)}
            disabled={showResult}
          >
            {option}
          </button>
        ))}
      </div>

      {showResult && (
        <div className={`quiz-result ${selectedAnswer === correct ? 'correct' : 'incorrect'}`}>
          <p>{selectedAnswer === correct ? '🔐 Correct!' : '❌ Not quite right.'}</p>
          <p className="explanation">{explanation}</p>
          {selectedAnswer !== correct && (
            <button className="try-again-button" onClick={() => {
              setShowResult(false);
              setSelectedAnswer(null);
            }}>
              Try Again
            </button>
          )}
        </div>
      )}

      {selectedAnswer !== null && !showResult && (
        <button className="submit-button" onClick={handleSubmit}>
          Submit Answer
        </button>
      )}
    </div>
  );
};

// Keys Challenge Component
const KeysChallenge = ({ title, description, data, onComplete }) => {
  const [selectedNetwork, setSelectedNetwork] = useState(0);
  const [generatedKeys, setGeneratedKeys] = useState([]);
  const [showPrivateKeys, setShowPrivateKeys] = useState(false);

  const network = data.networks[selectedNetwork];

  const generateNewKey = () => {
    const privateKey = generatePrivateKey();
    const publicKey = privateKeyToPublicKey(privateKey);
    const address = publicKeyToAddress(publicKey, network.name.toLowerCase());
    
    const newKey = {
      id: Date.now(),
      privateKey,
      publicKey,
      address,
      network: network.name
    };
    
    setGeneratedKeys(prev => [newKey, ...prev.slice(0, 4)]); // Keep last 5
  };

  const handleComplete = () => {
    if (generatedKeys.length >= 2) {
      onComplete();
    }
  };

  return (
    <div className="step-content challenge-step">
      <div className="step-icon">
        <Key size={48} />
      </div>
      <h2>{title}</h2>
      <p className="challenge-description">{description}</p>
      
      <div className="keys-controls">
        <div className="network-selector">
          <h3>Choose Network:</h3>
          <div className="network-buttons">
            {data.networks.map((net, index) => (
              <button
                key={index}
                className={`network-button ${selectedNetwork === index ? 'selected' : ''}`}
                onClick={() => setSelectedNetwork(index)}
              >
                <div className="network-name">{net.name}</div>
                <div className="network-prefix">Addresses start with "{net.prefix}"</div>
                <div className="network-desc">{net.description}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="generation-controls">
          <button className="generate-button" onClick={generateNewKey}>
            <Key size={20} />
            Generate New Key Pair
          </button>
          <label className="privacy-toggle">
            <input
              type="checkbox"
              checked={showPrivateKeys}
              onChange={(e) => setShowPrivateKeys(e.target.checked)}
            />
            Show private keys (⚠️ Never do this in real life!)
          </label>
        </div>
      </div>

      {generatedKeys.length > 0 && (
        <div className="generated-keys">
          <h3>Generated Key Pairs:</h3>
          <div className="keys-list">
            {generatedKeys.map((keyPair, index) => (
              <div key={keyPair.id} className="key-pair">
                <div className="key-pair-header">
                  <span className="key-index">#{index + 1}</span>
                  <span className="key-network">{keyPair.network}</span>
                </div>
                
                <div className="key-item">
                  <strong>Address (Safe to share):</strong>
                  <code className="address-display">{keyPair.address}</code>
                </div>
                
                <div className="key-item">
                  <strong>Public Key (Safe to share):</strong>
                  <code className="pubkey-display">
                    {keyPair.publicKey.substring(0, 20)}...{keyPair.publicKey.substring(-10)}
                  </code>
                </div>
                
                <div className="key-item private-key">
                  <strong>Private Key (🔴 NEVER SHARE!):</strong>
                  <code className="privkey-display">
                    {showPrivateKeys 
                      ? keyPair.privateKey 
                      : '••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••'
                    }
                  </code>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="challenge-info">
        <div className="info-box">
          <h4>🔐 Key Security Tips:</h4>
          <ul>
            <li>Private keys control your Bitcoin - never share them</li>
            <li>Addresses are like account numbers - safe to share</li>
            <li>Each key pair is unique and mathematically related</li>
            <li>Testnet coins have no value - perfect for learning</li>
          </ul>
        </div>
      </div>

      <div className="challenge-actions">
        <button 
          className="complete-button"
          onClick={handleComplete}
          disabled={generatedKeys.length < 2}
        >
          Complete Challenge
          {generatedKeys.length < 2 && (
            <span className="requirement"> (Generate at least 2 key pairs)</span>
          )}
        </button>
      </div>
    </div>
  );
};

// Reflection Step Component
const ReflectionStep = ({ question, placeholder, onComplete }) => {
  const [reflection, setReflection] = useState('');

  const handleSubmit = () => {
    if (reflection.trim().length > 10) {
      onComplete();
    }
  };

  return (
    <div className="step-content reflection-step">
      <div className="step-icon">
        <Key size={48} />
      </div>
      <h2>Reflection</h2>
      <p className="reflection-question">{question}</p>
      
      <textarea
        value={reflection}
        onChange={(e) => setReflection(e.target.value)}
        placeholder={placeholder}
        className="reflection-textarea"
        rows={6}
      />
      
      <div className="reflection-footer">
        <span className="word-count">
          {reflection.trim().split(/\s+/).filter(word => word.length > 0).length} words
        </span>
        <button 
          className="submit-button"
          onClick={handleSubmit}
          disabled={reflection.trim().length < 10}
        >
          Complete Reflection
        </button>
      </div>
    </div>
  );
};

export default KeysModule; 