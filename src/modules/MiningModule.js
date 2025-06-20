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
        title: "The World's Most Expensive Puzzle Game 🎮",
        text: "Let's play a fun guessing game! 🎲\n\nImagine you and thousands of other players around the world are trying to guess a special number. Here's how it works:\n\n1. Everyone gets the same puzzle:\n   • Find a number that makes this ➡️ 2947163... start with three zeros\n\n2. Players start guessing:\n   • Player 1: \"Is it 12?\" ❌\n   • Player 2: \"Maybe 839?\" ❌\n   • Player 3: \"Let me try 4721...\" ❌\n\n3. Finally, someone shouts:\n   • \"I found it! It's 5829!\" ✨\n   • When everyone checks: 5829 + 2947163... = 000748291...\n   • They won this round!\n\n🤔 But here's what makes it interesting...\n\nIn Bitcoin:\n• These puzzles happen every 10 minutes\n• Winners get brand new Bitcoin as a reward\n• The more players join, the harder the puzzle gets\n• You need special puzzle-solving computers to compete\n\nWant to know the best part?\nThis 'game' is what keeps Bitcoin safe! 🛡️\n\nLet's discover:\n• Why making it hard to win is actually good\n• How the puzzle difficulty changes automatically\n• What happens when someone wins\n\nReady to try solving some puzzles yourself? Let's play! 🚀"
      }
    },
    {
      title: "Warm-up: The Puzzle Game",
      type: "warmup",
      content: {
        question: "You're playing the Bitcoin puzzle game! Which number would win this round? 🎯\n\nPuzzle: \"Find a number that makes 1234... start with two zeros\"\n\nHint: Try these numbers with 1234...\n- 5678 + 1234... = 6912...\n- 9012 + 1234... = 10246...\n- 8766 + 1234... = 009999...",
        options: [
          "5678 (because it's smaller)", 
          "9012 (because it's bigger)", 
          "8766 (because it makes it start with 00)", 
          "1234 (because it matches)"
        ],
        correct: 2,
        explanation: "Yes! 8766 wins because when added to 1234..., it creates a number starting with '00'. In Bitcoin mining, we're looking for numbers that create patterns starting with zeros - the more zeros needed, the harder the puzzle! 🎮"
      }
    },
    {
      title: "Practice: Be a Bitcoin Miner!",
      type: "interactive",
      content: {
        title: "Your First Mining Adventure 🚀",
        description: "Let's try mining! You'll compete with other miners to solve puzzles and win Bitcoin. Each puzzle gets harder as more miners join.",
        challenges: [
          {
            title: "🎯 Round 1: Easy Mode",
            description: "Find a number that makes this start with one zero:\nBase: 7777...",
            hint: "Try adding different numbers until you see a result starting with 0",
            target: "0",
            baseNumber: "7777",
            successMessage: "You found a winning number! In real Bitcoin mining, you'd win 6.25 BTC for this! 🎉"
          },
          {
            title: "🎯 Round 2: Medium Mode",
            description: "Now find a number for two zeros:\nBase: 8888...",
            hint: "This will take more tries - the more zeros needed, the harder it gets!",
            target: "00",
            baseNumber: "8888",
            successMessage: "Amazing! You're getting the hang of mining! 🌟"
          },
          {
            title: "🎯 Round 3: Hard Mode",
            description: "Final challenge - three zeros:\nBase: 9999...",
            hint: "This is really tough - just like real Bitcoin mining!",
            target: "000",
            baseNumber: "9999",
            successMessage: "Incredible! You've experienced how Bitcoin mining works! 🏆"
          }
        ]
      }
    },
    {
      title: "The Big Picture",
      type: "reflection",
      content: {
        question: "Why do you think Bitcoin makes these puzzles so hard to solve? 🤔",
        mainPrompt: "Think about what would happen if:\n- The puzzles were too easy?\n- Too many people were winning?\n- Someone tried to cheat?",
        subQuestions: [
          "How does making the puzzle hard protect Bitcoin?",
          "Why give rewards to puzzle solvers?",
          "What happens when more players join the game?",
          "How would you explain this to a friend?"
        ],
        placeholder: "Share your thoughts about why Bitcoin's 'expensive puzzle game' is actually a brilliant security system! 💭"
      }
    }
  ];

  const handleStepComplete = (stepIndex) => {
    const newCompleted = new Set(completedSteps);
    newCompleted.add(stepIndex);
    setCompletedSteps(newCompleted);
    
    // Auto-advance to next step if not the last step
    if (stepIndex < steps.length - 1) {
      setTimeout(() => {
        setCurrentStep(stepIndex + 1);
      }, 500);
    }
    
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

      case 'interactive':
        return (
          <InteractiveChallenge
            title={step.content.title}
            description={step.content.description}
            challenges={step.content.challenges}
            onComplete={() => handleStepComplete(index)}
          />
        );

      case 'reflection':
        return (
          <ReflectionStep
            question={step.content.question}
            mainPrompt={step.content.mainPrompt}
            subQuestions={step.content.subQuestions}
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

// Interactive Challenge Component
const InteractiveChallenge = ({ title, description, challenges, onComplete }) => {
  const [selectedChallenge, setSelectedChallenge] = useState(0);
  const [miningState, setMiningState] = useState('idle'); // idle, mining, success, failed
  const [miningResults, setMiningResults] = useState(null);
  const [attempts, setAttempts] = useState(0);
  const [startTime, setStartTime] = useState(null);

  const challenge = challenges[selectedChallenge];

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
    const maxAttempts = 1000;
                      
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
      const successRate = 0.1;
      
      if (Math.random() < successRate) {
        // Found a valid nonce!
        const nonce = currentAttempts;
        const blockWithNonce = challenge.baseNumber + nonce.toString(16).padStart(8, '0');
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
        if (selectedChallenge >= 1) {
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
          <h3>Choose Challenge:</h3>
          <div className="difficulty-buttons">
            {challenges.map((challenge, index) => (
              <button
                key={index}
                className={`difficulty-button ${selectedChallenge === index ? 'selected' : ''}`}
                onClick={() => setSelectedChallenge(index)}
                disabled={miningState === 'mining'}
              >
                <div className="difficulty-name">{challenge.title}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="mining-info">
          <div className="info-item">
            <strong>Base Number:</strong>
            <code>{challenge.baseNumber}</code>
          </div>
          <div className="info-item">
            <strong>Target:</strong>
            <code>{challenge.target}</code>
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
              ? `Notice how the hash starts with ${challenge.target.length} zero${challenge.target.length > 1 ? 's' : ''} - this proves you did the computational work!`
              : `Mining is probabilistic. Higher difficulty means exponentially more attempts needed. Try an easier challenge or try again!`
            }
          </p>
        </div>
      )}
    </div>
  );
};

// Reflection Step Component
const ReflectionStep = ({ question, mainPrompt, subQuestions, placeholder, onComplete }) => {
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