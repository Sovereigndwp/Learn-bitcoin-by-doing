import React, { useState, useEffect } from 'react';
import { useProgress } from '../contexts/ProgressContext';
import { useLanguage } from '../contexts/LanguageContext';
import CodeEditor from '../components/CodeEditor';
import { hash256, mineBlock, isValidHash } from '../utils/bitcoin';
import { Pickaxe, CheckCircle, Trophy, Zap, Target, Clock } from 'lucide-react';
import '../components/ModuleCommon.css';

const MiningModule = () => {
  const { completeModule, isModuleCompleted } = useProgress();
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(new Set());

  const steps = [
    {
      title: "Introduction",
      type: "intro",
      content: {
        title: "Bitcoin Mining & Proof of Work",
        text: "Mining is how Bitcoin secures its network. Miners compete to find a special number (nonce) that makes a block's hash start with enough zeros. This requires computational work, making it expensive to attack the network but easy to verify valid blocks."
      }
    },
    {
      title: "Warm-up: Mining Basics",
      type: "warmup",
      content: {
        question: "What makes a Bitcoin block hash 'valid' for mining?",
        options: [
          "It contains the word 'bitcoin'", 
          "It starts with enough zeros (below difficulty target)", 
          "It's exactly 64 characters long", 
          "It ends with the miner's signature"
        ],
        correct: 1,
        explanation: "A valid hash must be below the difficulty target, which is represented by a hash starting with a certain number of zeros. The more zeros required, the harder it is to find."
      }
    },
    {
      title: "Code Lab: Mining Simulator",
      type: "codelab",
      content: {
        title: "Find a Valid Nonce",
        initialCode: `function findValidNonce(blockHeader, target) {
  // Try different nonce values until hash is below target
  // Return {nonce, hash, attempts} when successful
  // Use hash256() and isValidHash() functions
  
  for (let nonce = 0; nonce < 1000000; nonce++) {
    // Your code here:
    // 1. Append nonce to blockHeader (as hex)
    // 2. Hash the result with hash256()
    // 3. Check if hash is valid with isValidHash()
    // 4. Return result if valid
    
  }
  
  return { success: false, attempts: 1000000 };
}`,
        testFunction: (userFunc) => {
          const testHeader = "test_block_header_";
          const testTarget = "0000ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff";
          
          const result = userFunc(testHeader, testTarget);
          
          if (!result.success) {
            throw new Error("Function should find a valid nonce within the attempts limit");
          }
          
          if (typeof result.nonce !== 'number' || typeof result.hash !== 'string') {
            throw new Error("Return object should have 'nonce' (number) and 'hash' (string) properties");
          }
          
          // Verify the result
          const blockWithNonce = testHeader + result.nonce.toString(16).padStart(8, '0');
          const verifyHash = hash256(blockWithNonce);
          
          if (verifyHash !== result.hash) {
            throw new Error("Returned hash doesn't match computed hash");
          }
          
          if (!isValidHash(result.hash, testTarget)) {
            throw new Error("Returned hash is not valid (not below target)");
          }
          
          return `Excellent! Found valid nonce ${result.nonce} in ${result.attempts} attempts. Hash: ${result.hash}`;
        }
      }
    },
    {
      title: "Challenge: Interactive Mining",
      type: "challenge",
      content: {
        title: "Mine Your Own Block",
        description: "Try mining with different difficulty levels. Higher difficulty (more zeros) takes exponentially more work!",
        data: {
          blockHeader: "00000001deadbeefcafebabe",
          difficulties: [
            { name: "Easy", target: "0fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff", zeros: 1 },
            { name: "Medium", target: "00ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff", zeros: 2 },
            { name: "Hard", target: "000fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff", zeros: 3 },
            { name: "Very Hard", target: "0000ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff", zeros: 4 }
          ]
        }
      }
    },
    {
      title: "Reflection",
      type: "reflection",
      content: {
        question: "Why does Bitcoin use proof-of-work mining instead of simpler methods?",
        placeholder: "Consider how mining creates security, prevents double-spending, and makes the network trustworthy without central authority..."
      }
    }
  ];

  const handleStepComplete = (stepIndex) => {
    const newCompleted = new Set(completedSteps);
    newCompleted.add(stepIndex);
    setCompletedSteps(newCompleted);
    
    if (newCompleted.size === steps.length) {
      completeModule('mining');
    }
  };

  const renderStep = (step, index) => {
    switch (step.type) {
      case 'intro':
        return (
          <div className="step-content intro-step">
            <div className="step-icon">
              <Pickaxe size={48} />
            </div>
            <h2>{step.content.title}</h2>
            <p className="intro-text">{step.content.text}</p>
            <div className="intro-highlights">
              <div className="highlight-item">
                <Target size={20} />
                <span>Difficulty Target</span>
              </div>
              <div className="highlight-item">
                <Zap size={20} />
                <span>Computational Work</span>
              </div>
              <div className="highlight-item">
                <CheckCircle size={20} />
                <span>Easy Verification</span>
              </div>
            </div>
            <button 
              className="continue-button"
              onClick={() => handleStepComplete(index)}
            >
              Start Mining
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
          <MiningChallenge
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
          <Pickaxe className="module-icon" />
          Mining Simulator
        </h1>
        {isModuleCompleted('mining') && (
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
        <Pickaxe size={48} />
      </div>
      <h2>Mining Quiz</h2>
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
          <p>{selectedAnswer === correct ? '⛏️ Correct!' : '❌ Not quite right.'}</p>
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

// Mining Challenge Component
const MiningChallenge = ({ title, description, data, onComplete }) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState(0);
  const [miningState, setMiningState] = useState('idle'); // idle, mining, success, failed
  const [miningResults, setMiningResults] = useState(null);
  const [attempts, setAttempts] = useState(0);
  const [startTime, setStartTime] = useState(null);

  const difficulty = data.difficulties[selectedDifficulty];

  const startMining = () => {
    setMiningState('mining');
    setMiningResults(null);
    setAttempts(0);
    setStartTime(Date.now());
    
    // Simulate mining with visual feedback
    simulateMining();
  };

  const simulateMining = () => {
    let currentAttempts = 0;
    const maxAttempts = difficulty.zeros === 1 ? 100 : 
                      difficulty.zeros === 2 ? 1000 : 
                      difficulty.zeros === 3 ? 10000 : 50000;
                      
    const mineStep = () => {
      if (currentAttempts >= maxAttempts) {
        setMiningState('failed');
        setMiningResults({
          success: false,
          attempts: currentAttempts,
          duration: Date.now() - startTime
        });
        return;
      }
      
      currentAttempts += Math.floor(Math.random() * 10) + 1;
      setAttempts(currentAttempts);
      
      // Check for success based on difficulty
      const successRate = difficulty.zeros === 1 ? 0.1 : 
                         difficulty.zeros === 2 ? 0.01 : 
                         difficulty.zeros === 3 ? 0.001 : 0.0001;
      
      if (Math.random() < successRate) {
        // Found a valid nonce!
        const nonce = currentAttempts;
        const blockWithNonce = data.blockHeader + nonce.toString(16).padStart(8, '0');
        const hash = hash256(blockWithNonce);
        
        setMiningState('success');
        setMiningResults({
          success: true,
          nonce,
          hash,
          attempts: currentAttempts,
          duration: Date.now() - startTime
        });
        
        // Complete after first successful mine
        if (selectedDifficulty >= 1) {
          setTimeout(() => onComplete(), 3000);
        }
        return;
      }
      
      // Continue mining
      setTimeout(mineStep, 50); // Animate the process
    };
    
    mineStep();
  };

  return (
    <div className="step-content challenge-step">
      <div className="step-icon">
        <Pickaxe size={48} />
      </div>
      <h2>{title}</h2>
      <p className="challenge-description">{description}</p>
      
      <div className="mining-controls">
        <div className="difficulty-selector">
          <h3>Choose Difficulty:</h3>
          <div className="difficulty-buttons">
            {data.difficulties.map((diff, index) => (
              <button
                key={index}
                className={`difficulty-button ${selectedDifficulty === index ? 'selected' : ''}`}
                onClick={() => setSelectedDifficulty(index)}
                disabled={miningState === 'mining'}
              >
                <div className="difficulty-name">{diff.name}</div>
                <div className="difficulty-zeros">{diff.zeros} zeros</div>
              </button>
            ))}
          </div>
        </div>

        <div className="mining-info">
          <div className="info-item">
            <strong>Block Header:</strong>
            <code>{data.blockHeader}</code>
          </div>
          <div className="info-item">
            <strong>Target:</strong>
            <code>{difficulty.target}</code>
          </div>
        </div>

        <div className="mining-action">
          <button 
            className={`mine-button ${miningState}`}
            onClick={startMining}
            disabled={miningState === 'mining'}
          >
            {miningState === 'idle' && <><Pickaxe size={20} /> Start Mining</>}
            {miningState === 'mining' && <><Clock size={20} /> Mining...</>}
            {miningState === 'success' && <><CheckCircle size={20} /> Success!</>}
            {miningState === 'failed' && <>❌ Try Again</>}
          </button>
        </div>
      </div>

      {miningState === 'mining' && (
        <div className="mining-progress">
          <div className="progress-stats">
            <div className="stat">
              <span className="stat-label">Attempts:</span>
              <span className="stat-value">{attempts.toLocaleString()}</span>
            </div>
            <div className="stat">
              <span className="stat-label">Time:</span>
              <span className="stat-value">{((Date.now() - startTime) / 1000).toFixed(1)}s</span>
            </div>
          </div>
          <div className="mining-animation">⛏️ Mining in progress...</div>
        </div>
      )}

      {miningResults && (
        <div className={`mining-results ${miningResults.success ? 'success' : 'failed'}`}>
          <h3>{miningResults.success ? '🎉 Block Mined!' : '😞 Mining Failed'}</h3>
          <div className="results-stats">
            <div className="stat">
              <span className="stat-label">Attempts:</span>
              <span className="stat-value">{miningResults.attempts.toLocaleString()}</span>
            </div>
            <div className="stat">
              <span className="stat-label">Duration:</span>
              <span className="stat-value">{(miningResults.duration / 1000).toFixed(1)}s</span>
            </div>
            {miningResults.success && (
              <>
                <div className="stat">
                  <span className="stat-label">Winning Nonce:</span>
                  <span className="stat-value">{miningResults.nonce}</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Block Hash:</span>
                  <code className="hash-display">{miningResults.hash}</code>
                </div>
              </>
            )}
          </div>
          <p className="results-explanation">
            {miningResults.success 
              ? `Notice how the hash starts with ${difficulty.zeros} zero${difficulty.zeros > 1 ? 's' : ''} - this proves you did the computational work!`
              : `Mining is probabilistic. Higher difficulty means exponentially more attempts needed. Try an easier difficulty or try again!`
            }
          </p>
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
        <Pickaxe size={48} />
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

export default MiningModule; 