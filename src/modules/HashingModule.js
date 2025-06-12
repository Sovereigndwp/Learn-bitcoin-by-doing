import React, { useState } from 'react';
import { useProgress } from '../contexts/ProgressContext';
import { useLanguage } from '../contexts/LanguageContext';
import CodeEditor from '../components/CodeEditor';
import { sha256, hash256, simpleHash } from '../utils/bitcoin';
import { Hash, CheckCircle, Trophy, Shield, Zap } from 'lucide-react';
import '../components/ModuleCommon.css';

const HashingModule = () => {
  const { completeModule, isModuleCompleted } = useProgress();
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(new Set());

  const steps = [
    {
      title: "Introduction",
      type: "intro",
      content: {
        title: "Hashing in Bitcoin",
        text: "Bitcoin uses cryptographic hashing (specifically SHA-256) everywhere: to secure blocks, create addresses, and verify transactions. A hash function takes any input and produces a fixed-size, unpredictable output. Even tiny input changes create completely different hashes, making tampering detectable."
      }
    },
    {
      title: "Warm-up: Hash Properties",
      type: "warmup",
      content: {
        question: "What happens when you change just one character in a message before hashing it?",
        options: [
          "The hash changes slightly", 
          "The hash changes completely", 
          "The hash stays the same", 
          "Only numbers change in the hash"
        ],
        correct: 1,
        explanation: "This is called the avalanche effect - even the smallest input change produces a completely different hash, making tampering easily detectable."
      }
    },
    {
      title: "Code Lab: SHA-256 Hashing",
      type: "codelab",
      content: {
        title: "Implement Double-SHA256",
        initialCode: `function hash256(message) {
  // Bitcoin uses double-SHA256 for extra security
  // First hash the message, then hash the result again
  // Use the provided sha256() function
  
  // Your code here:
  
}`,
        testFunction: (userFunc) => {
          const testCases = [
            { input: "Hello Bitcoin", expected: hash256("Hello Bitcoin") },
            { input: "Block Header", expected: hash256("Block Header") },
            { input: "", expected: hash256("") }
          ];
          
          for (const test of testCases) {
            const result = userFunc(test.input);
            if (result !== test.expected) {
              throw new Error(`Expected hash256("${test.input}") to equal ${test.expected}, got ${result}`);
            }
          }
          return "Perfect! You've implemented Bitcoin's double-SHA256 hashing!";
        }
      }
    },
    {
      title: "Challenge: Block Header Hash",
      type: "challenge",
      content: {
        title: "Verify a Bitcoin Block Hash",
        description: "Real Bitcoin block #100,000 had this data. Compute its hash and verify it meets the difficulty target (starts with enough zeros):",
        data: {
          blockHeader: "0100000050120119172a610421a6c3011dd330d9df07b63616c2cc1f1cd00200000000006657a9252aacd5c0b2940996ecff952228c3067cc38d4885efb5a4ac4247e9f337221b4d4c86041b0f2b5710",
          expectedHash: "000000000003ba27aa200b1cecaad478d2b00432346c3f1f3986da1afd33e506",
          target: "0000000000000000001bc16d674ec80000000000000000000000000000000000"
        }
      }
    },
    {
      title: "Reflection",
      type: "reflection",
      content: {
        question: "How does hashing make Bitcoin secure and trustworthy?",
        placeholder: "Think about how hashing prevents tampering, creates unpredictable outputs, and helps miners prove their work..."
      }
    }
  ];

  const handleStepComplete = (stepIndex) => {
    const newCompleted = new Set(completedSteps);
    newCompleted.add(stepIndex);
    setCompletedSteps(newCompleted);
    
    if (newCompleted.size === steps.length) {
      completeModule('hashing');
    }
  };

  const renderStep = (step, index) => {
    switch (step.type) {
      case 'intro':
        return (
          <div className="step-content intro-step">
            <div className="step-icon">
              <Hash size={48} />
            </div>
            <h2>{step.content.title}</h2>
            <p className="intro-text">{step.content.text}</p>
            <div className="intro-highlights">
              <div className="highlight-item">
                <Shield size={20} />
                <span>Tamper Detection</span>
              </div>
              <div className="highlight-item">
                <Zap size={20} />
                <span>Fast Verification</span>
              </div>
              <div className="highlight-item">
                <Hash size={20} />
                <span>Fixed Output Size</span>
              </div>
            </div>
            <button 
              className="continue-button"
              onClick={() => handleStepComplete(index)}
            >
              Continue
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
          <ChallengeStep
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
          <Hash className="module-icon" />
          Hashing
        </h1>
        {isModuleCompleted('hashing') && (
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
        <Hash size={48} />
      </div>
      <h2>Quick Quiz</h2>
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
          <p>{selectedAnswer === correct ? '✅ Correct!' : '❌ Not quite right.'}</p>
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

// Challenge Step Component
const ChallengeStep = ({ title, description, data, onComplete }) => {
  const [userHash, setUserHash] = useState('');
  const [result, setResult] = useState(null);

  const handleSubmit = () => {
    try {
      // Compute the actual hash of the block header
      const computedHash = hash256(data.blockHeader);
      
      if (userHash.toLowerCase() === data.expectedHash.toLowerCase()) {
        setResult({
          success: true,
          message: "Perfect! You've successfully computed the block hash. Notice how it starts with many zeros - this proves the miner did the computational work required."
        });
        setTimeout(() => onComplete(), 3000);
      } else if (userHash.toLowerCase() === computedHash.toLowerCase()) {
        setResult({
          success: true,
          message: "Great job computing the hash! This matches our educational implementation."
        });
        setTimeout(() => onComplete(), 3000);
      } else {
        setResult({
          success: false,
          message: `Not quite right. Try using hash256() on the block header. Expected: ${data.expectedHash}`
        });
      }
    } catch (error) {
      setResult({
        success: false,
        message: "Error computing hash. Make sure you're using the hash256 function correctly."
      });
    }
  };

  const handleDemo = () => {
    const computedHash = hash256(data.blockHeader);
    setUserHash(computedHash);
  };

  return (
    <div className="step-content challenge-step">
      <div className="step-icon">
        <Hash size={48} />
      </div>
      <h2>{title}</h2>
      <p className="challenge-description">{description}</p>
      
      <div className="challenge-data">
        <div className="data-item">
          <strong>Block Header (hex):</strong>
          <code className="data-value">{data.blockHeader}</code>
        </div>
        <div className="data-item">
          <strong>Expected Hash:</strong>
          <code className="data-value">{data.expectedHash}</code>
        </div>
        <div className="data-item">
          <strong>Target (difficulty):</strong>
          <code className="data-value">{data.target}</code>
        </div>
      </div>

      <div className="challenge-input">
        <label>
          <strong>Your computed hash:</strong>
          <input
            type="text"
            value={userHash}
            onChange={(e) => setUserHash(e.target.value)}
            placeholder="Enter the hash256 result..."
            className="hash-input"
          />
        </label>
      </div>

      <div className="challenge-actions">
        <button className="demo-button" onClick={handleDemo}>
          Compute Hash
        </button>
        <button 
          className="submit-button" 
          onClick={handleSubmit}
          disabled={!userHash.trim()}
        >
          Verify Hash
        </button>
      </div>

      {result && (
        <div className={`challenge-result ${result.success ? 'success' : 'error'}`}>
          <p>{result.message}</p>
        </div>
      )}
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
        <Hash size={48} />
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

export default HashingModule; 