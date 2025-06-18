import React, { useState, useEffect } from 'react';
import { useProgress } from '../contexts/ProgressContext';
import { useLanguage } from '../contexts/LanguageContext';
import CodeEditor from '../components/CodeEditor';
import { sha256, hash256, simpleHash } from '../utils/bitcoin';
import { Hash, CheckCircle, Trophy, Shield, Zap } from 'lucide-react';
import '../components/ModuleCommon.css';

// Hash Explorer Component
const HashExplorer = ({ onComplete }) => {
  const [input, setInput] = useState('');
  const [hashResult, setHashResult] = useState('');
  const [hasCompletedExamples, setHasCompletedExamples] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswer, setQuizAnswer] = useState(null);
  const [showQuizResult, setShowQuizResult] = useState(false);
  const [isHashing, setIsHashing] = useState(false);

  const examples = [
    { text: 'hello', hash: '' },
    { text: 'hello!', hash: '' },
    { text: 'Hello', hash: '' },
    { text: 'hello Dalia', hash: '' }
  ];

  const [completedExamples, setCompletedExamples] = useState(new Set());

  // Pre-compute hashes for examples
  useEffect(() => {
    const computeExampleHashes = async () => {
      for (const example of examples) {
        example.hash = await sha256(example.text);
      }
    };
    computeExampleHashes();
  }, []);

  const handleInputChange = async (e) => {
    const newInput = e.target.value;
    setInput(newInput);
    setIsHashing(true);
    try {
      const hash = await sha256(newInput);
      setHashResult(hash);
    } catch (error) {
      console.error('Hashing failed:', error);
      setHashResult('Error computing hash');
    }
    setIsHashing(false);
  };

  const handleExampleClick = async (example) => {
    setInput(example.text);
    setIsHashing(true);
    try {
      const hash = await sha256(example.text);
      setHashResult(hash);
      const newCompleted = new Set(completedExamples);
      newCompleted.add(example.text);
      setCompletedExamples(newCompleted);
      
      if (newCompleted.size === examples.length && !hasCompletedExamples) {
        setHasCompletedExamples(true);
        setTimeout(() => setShowQuiz(true), 1000);
      }
    } catch (error) {
      console.error('Example hashing failed:', error);
      setHashResult('Error computing hash');
    }
    setIsHashing(false);
  };

  const handleQuizSubmit = () => {
    setShowQuizResult(true);
    if (quizAnswer === 1) { // Correct answer index
      setTimeout(() => onComplete(), 2000);
    }
  };

  return (
    <div className="step-content hash-explorer">
      <div className="step-icon">
        <Hash size={48} />
      </div>
      <h2>SHA-256 Hash Explorer</h2>
      
      <div className="explorer-section">
        <h3>Try it yourself! 🔍</h3>
        <p>Type any text below to see its SHA-256 hash instantly:</p>
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Type anything..."
          className="hash-input"
        />
        <div className="hash-output">
          <strong>Hash:</strong> {isHashing ? 'Computing...' : (hashResult || '(empty)')}
        </div>
      </div>

      <div className="examples-section">
        <h3>Try these examples:</h3>
        <div className="example-buttons">
          {examples.map((example) => (
            <button
              key={example.text}
              onClick={() => handleExampleClick(example)}
              className={`example-button ${completedExamples.has(example.text) ? 'completed' : ''}`}
              disabled={isHashing}
            >
              Try "{example.text}"
              {completedExamples.has(example.text) && <CheckCircle size={16} />}
            </button>
          ))}
        </div>
      </div>

      {showQuiz && (
        <div className="quiz-section">
          <h3>Quick Question! 🤔</h3>
          <p>Looking at the hashes above, what do you notice about small changes in the input?</p>
          
          <div className="quiz-options">
            {[
              "The hash only changes a little bit",
              "The hash changes completely",
              "The hash stays mostly the same",
              "Only the first few characters change"
            ].map((option, index) => (
              <button
                key={index}
                onClick={() => setQuizAnswer(index)}
                className={`quiz-option ${quizAnswer === index ? 'selected' : ''} ${
                  showQuizResult ? (index === 1 ? 'correct' : quizAnswer === index ? 'incorrect' : '') : ''
                }`}
                disabled={showQuizResult}
              >
                {option}
              </button>
            ))}
          </div>

          {quizAnswer !== null && !showQuizResult && (
            <button className="submit-button" onClick={handleQuizSubmit}>
              Submit Answer
            </button>
          )}

          {showQuizResult && (
            <div className={`quiz-result ${quizAnswer === 1 ? 'correct' : 'incorrect'}`}>
              <p>
                {quizAnswer === 1 
                  ? "✅ Correct! This is called the 'avalanche effect' - even a tiny change in input creates a completely different hash. This is crucial for Bitcoin's security!"
                  : "❌ Not quite. Look at how different the hashes are, even when we just changed one character from 'hello' to 'hello!' or 'Hello'"}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

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
        title: "Understanding Digital Fingerprints",
        text: "Remember how we talked about one-way functions being like a paper shredder? In Bitcoin, this special one-way transformation is called SHA-256! 🔒\n\nJust like how a paper shredder:\n- Takes any document and turns it into a unique pattern of shreds\n- Makes it impossible to reconstruct the original document\n- Creates completely different patterns even if you change just one word\n\nSHA-256 does the same thing with digital information:\n- Takes any digital data and creates a unique 'fingerprint' (always 64 characters long)\n- Makes it mathematically impossible to reverse the process\n- Creates totally different fingerprints even if you change just one character\n\nThis is crucial for Bitcoin because:\n- Every transaction gets its own unique fingerprint\n- Every block of transactions gets its own fingerprint\n- Any attempt to tamper with the data is instantly detectable\n\nLet's explore how this works and why it's essential for Bitcoin's security! 🔍"
      }
    },
    {
      title: "SHA-256 Explorer",
      type: "explorer",
      content: {
        component: HashExplorer
      }
    },
    {
      title: "Understanding Changes",
      type: "warmup",
      content: {
        question: "What happens when you change just one character in a message before creating its fingerprint?",
        options: [
          "The fingerprint changes slightly", 
          "The fingerprint changes completely", 
          "The fingerprint stays the same", 
          "Only some parts change"
        ],
        correct: 1,
        explanation: "Even a tiny change creates a completely different fingerprint! This is crucial for Bitcoin's security - it means you can't make even the smallest change without everyone noticing."
      }
    },
    {
      title: "Building Blocks",
      type: "intro",
      content: {
        title: "From Messages to Blocks",
        text: "In Bitcoin, SHA-256 is used to create unique fingerprints of blocks of information. Each block contains:\n\n- Transaction details (who sent what to whom)\n- A link to the previous block's fingerprint\n- Some special numbers the miners use\n\nAll this information gets blended together to create the block's unique fingerprint. Let's see how it works! 🧱"
      }
    },
    {
      title: "Block Explorer",
      type: "challenge",
      content: {
        title: "Create Your Own Block Fingerprint",
        description: "This is real data from Bitcoin block #100,000. See how all the block information gets transformed into a unique fingerprint that starts with lots of zeros (that's what makes it special!):",
        data: {
          blockHeader: "0100000050120119172a610421a6c3011dd330d9df07b63616c2cc1f1cd00200000000006657a9252aacd5c0b2940996ecff952228c3067cc38d4885efb5a4ac4247e9f337221b4d4c86041b0f2b5710",
          expectedHash: "000000000003ba27aa200b1cecaad478d2b00432346c3f1f3986da1afd33e506",
          target: "0000000000000000001bc16d674ec80000000000000000000000000000000000"
        }
      }
    },
    {
      title: "Practice: Double Hashing",
      type: "codelab",
      content: {
        title: "Extra Security with Double-SHA256",
        initialCode: `function hash256(message) {
  // Bitcoin uses SHA-256 twice for extra security!
  // First create a fingerprint, then create a fingerprint of that fingerprint
  // Use the provided sha256() function
  //
  // Examples in Bitcoin:
  // - Transaction IDs
  // - Block IDs
  // - Mining calculations
  
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
      title: "Reflection",
      type: "reflection",
      content: {
        question: "How do digital fingerprints (hashes) make Bitcoin secure?",
        placeholder: "Think about how these unique fingerprints protect information, make changes obvious, and help miners prove their work. How would Bitcoin be different without them? What makes them so special for security?"
      }
    }
  ];

  // Use useEffect to handle module completion when completedSteps changes
  useEffect(() => {
    if (completedSteps.size === steps.length) {
      completeModule('hashing');
    }
  }, [completedSteps, steps.length, completeModule]);

  const handleStepComplete = (stepIndex) => {
    // Use functional update to avoid race conditions
    setCompletedSteps(prevCompletedSteps => {
      const newCompleted = new Set(prevCompletedSteps);
      newCompleted.add(stepIndex);
      return newCompleted;
    });
    
    // Auto-advance to next step after a short delay to show completion
    setTimeout(() => {
      if (stepIndex < steps.length - 1) {
        setCurrentStep(stepIndex + 1);
      }
    }, 800);
    
    // Add visual feedback for button click
    const button = document.querySelector('.continue-button, .submit-button');
    if (button) {
      button.classList.add('button-clicked');
      setTimeout(() => button.classList.remove('button-clicked'), 400);
    }
  };
  
  const handleSkipStep = (stepIndex) => {
    // Mark step as viewed but not completed
    setCurrentStep(stepIndex + 1);
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
            <div className="step-action-hint">
              <p className="action-hint">Read through the introduction and click Continue when ready</p>
            </div>
            <button 
              className="continue-button"
              onClick={() => handleStepComplete(index)}
              aria-label="Continue to next step"
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

      case 'explorer':
        return React.createElement(step.content.component, {
          onComplete: () => handleStepComplete(index)
        });

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
          
          <div className="step-navigation">
            <div className="step-navigation-breadcrumb">
              {steps.map((step, idx) => (
                <div 
                  key={idx} 
                  className={`breadcrumb-indicator ${idx === currentStep ? 'active' : ''} ${completedSteps.has(idx) ? 'completed' : ''}`}
                  title={step.title}
                />
              ))}
            </div>
            
            <button 
              className="nav-button prev-button"
              onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
              disabled={currentStep === 0}
              aria-label="Go to previous step"
            >
              ← Previous
            </button>
            
            <span className="step-label">
              Step {currentStep + 1} of {steps.length}: {steps[currentStep].title}
            </span>
            
            {!completedSteps.has(currentStep) && currentStep < steps.length - 1 && (
              <button 
                className="nav-button skip-button"
                onClick={() => handleSkipStep(currentStep)}
                aria-label="Skip this step"
              >
                Skip this step
              </button>
            )}
            
            <button 
              className="nav-button next-button"
              onClick={() => setCurrentStep(prev => Math.min(steps.length - 1, prev + 1))}
              disabled={currentStep === steps.length - 1 || (!completedSteps.has(currentStep) && currentStep < steps.length - 1)}
              aria-label="Go to next step"
            >
              Next →
            </button>
          </div>
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
      // Don't use setTimeout to prevent race conditions with component unmounting
      onComplete();
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

// Success Notification Component
const SuccessNotification = ({ message }) => {
  return (
    <div className="completion-indicator">
      <CheckCircle size={18} />
      <span>{message}</span>
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
          message: "Perfect! You've successfully computed the block hash. Notice how it starts with many zeros - this proves the miner did the computational work required. This is known as Proof-of-Work, the consensus mechanism that secures the Bitcoin network."
        });
        onComplete(); // Don't use setTimeout to prevent race conditions
      } else if (userHash.toLowerCase() === computedHash.toLowerCase()) {
        setResult({
          success: true,
          message: "Great job computing the hash! This matches our educational implementation. In real Bitcoin nodes, this hash would be compared against the current difficulty target to validate the block."
        });
        onComplete(); // Don't use setTimeout to prevent race conditions
      } else {
        // Provide more helpful error feedback
        let hint = "";
        if (userHash.toLowerCase().startsWith("0x")) {
          hint = " Note: Your hash starts with '0x', which is a common prefix for hex values, but Bitcoin hashes don't use this prefix.";
        } else if (userHash.length !== data.expectedHash.length) {
          hint = ` The hash should be exactly ${data.expectedHash.length} characters long.`;
        }
        
        setResult({
          success: false,
          message: `Not quite right. Try using hash256() on the block header. Expected: ${data.expectedHash}${hint}`
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
      <div className="educational-note">
        <h3>Understanding Block Headers</h3>
        <p>A Bitcoin block header (160 bytes) contains:</p>
        <ul>
          <li><strong>Version</strong>: Protocol version (4 bytes)</li>
          <li><strong>Previous Block Hash</strong>: Hash of the previous block (32 bytes)</li>
          <li><strong>Merkle Root</strong>: Hash representing all transactions in the block (32 bytes)</li>
          <li><strong>Timestamp</strong>: Block creation time (4 bytes)</li>
          <li><strong>Difficulty Target</strong>: Mining difficulty representation (4 bytes)</li>
          <li><strong>Nonce</strong>: Value changed by miners to find valid hash (4 bytes)</li>
        </ul>
        <p>Miners hash this data repeatedly with different nonce values until they find a hash below the target (with enough leading zeros).</p>
      </div>
      
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
          {result.success && (
            <div className="step-action-hint" style={{ marginTop: '1rem' }}>
              <p className="action-hint">You've successfully completed this challenge! Click the Continue button to proceed.</p>
            </div>
          )}
          {result.success && (
            <button 
              className="continue-button"
              onClick={() => onComplete()}
              style={{ marginTop: '1rem' }}
            >
              Continue to Next Step
            </button>
          )}
        </div>
      )}
    </div>
  );
};

// Reflection Step Component
const ReflectionStep = ({ question, placeholder, onComplete }) => {
  const [reflection, setReflection] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [wordCount, setWordCount] = useState(0);

  useEffect(() => {
    const words = reflection.trim().split(/\s+/).filter(word => word.length > 0);
    setWordCount(words.length);
  }, [reflection]);

  const handleSubmit = () => {
    if (wordCount >= 10) {
      setSubmitted(true);
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
      
      <div className="step-action-hint" style={{ marginTop: '1rem', textAlign: 'left' }}>
        <p className="action-hint">Reflect on the question above. Write at least 10 words to complete this exercise.</p>
      </div>
      
      <div className="reflection-footer">
        <span className="word-count">
          {wordCount} words {wordCount < 10 ? `(${10 - wordCount} more needed)` : '✓'}
        </span>
        
        {!submitted ? (
          <button 
            className="submit-button"
            onClick={handleSubmit}
            disabled={wordCount < 10}
          >
            Complete Reflection
          </button>
        ) : (
          <SuccessNotification message="Reflection saved! You can continue to the next module." />
        )}
      </div>
    </div>
  );
};

export default HashingModule; 