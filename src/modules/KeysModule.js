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
        title: "Your Digital Treasure Chest 🗝️",
        text: "Let's play pretend! 🎭\n\nImagine you have a magical treasure chest that works in a special way:\n\n1. The chest has TWO keys:\n   • A **blue key** that can only OPEN it (to receive treasure)\n   • A **red key** that can only EMPTY it (to send treasure)\n\n2. Here's the magic part:\n   • You can make copies of the **blue key**\n   • Give them to friends so they can send you treasure\n   • Keep the **red key** secret - it's your power to spend!\n\n🤔 Think about it:\n• What happens if you share your blue key?\n   **Nothing bad! People can only ADD treasure!**\n\n• What happens if you share your red key?\n   **Uh oh! Someone could take ALL your treasure!**\n\nIn Bitcoin:\n• Your 'blue key' is your **Bitcoin address**\n   (Share it with anyone who wants to send you Bitcoin!)\n\n• Your 'red key' is your **private key**\n   (Never, ever, ever share this with anyone!)\n\nLet's learn:\n   • How to create your own keys\n   • How to keep your red key safe\n   • Cool tricks you can do with these keys\n\nReady to make some magic happen? Let's go! ✨"
      }
    },
    {
      title: "Warm-up: Key Safety",
      type: "warmup",
      content: {
        question: "Your friend Alice wants to send you some Bitcoin. Which key should you share with her? 🤔",
        options: [
          "The red key (private key) - it's needed to receive Bitcoin", 
          "The blue key (Bitcoin address) - it's safe to share", 
          "Both keys - Alice needs them to send Bitcoin", 
          "Neither key - Alice can guess your address"
        ],
        correct: 1,
        explanation: "Perfect! Just like giving someone your mailbox number to receive mail, sharing your blue key (Bitcoin address) is completely safe. They can only send you Bitcoin, not take any! 📬"
      }
    },
    {
      title: "Practice: Key Master Game",
      type: "interactive",
      content: {
        title: "Let's Play with Keys! 🎮",
        description: "Help these Bitcoin users figure out what to do with their keys!",
        scenarios: [
          {
            title: "🎯 Scenario 1: The Coffee Shop",
            description: "You want to accept Bitcoin payments at your coffee shop. Which sign should you put on the counter?",
            options: [
              {
                text: "Our Private Key: 5KJ...",
                feedback: "Oh no! Never share the red key! Someone could steal all your Bitcoin! ❌"
              },
              {
                text: "Our Bitcoin Address: bc1q...",
                feedback: "Perfect! The blue key is safe to display. Customers can now send you Bitcoin! ✅"
              }
            ],
            correct: 1
          },
          {
            title: "🎯 Scenario 2: The Backup",
            description: "You want to back up your Bitcoin keys. Which one needs to be kept super safe?",
            options: [
              {
                text: "The blue key (Bitcoin address)",
                feedback: "The blue key is public anyway - no need for special protection! ❌"
              },
              {
                text: "The red key (private key)",
                feedback: "Yes! The red key must be kept super safe - maybe write it down and store it securely! ✅"
              }
            ],
            correct: 1
          },
          {
            title: "🎯 Scenario 3: The Website",
            description: "Your online store needs to receive Bitcoin. What should you put on the checkout page?",
            options: [
              {
                text: "A different blue key (address) for each customer",
                feedback: "Smart! Using different addresses helps keep track of payments! ✅"
              },
              {
                text: "The same red key (private key) for everyone",
                feedback: "Never put the red key on a website - it's like leaving your wallet open on the street! ❌"
              }
            ],
            correct: 0
          }
        ]
      }
    },
    {
      title: "The Big Picture",
      type: "reflection",
      content: {
        question: "Why is it so important to keep your red key (private key) secret? 🤔",
        mainPrompt: "Think about:\n- What could happen if someone found your red key?\n- Why is the blue key safe to share?\n- How is this different from a bank account?",
        subQuestions: [
          "How does having two different keys make Bitcoin special?",
          "Why is it good that everyone can see the blue key?",
          "What makes the red key so powerful?",
          "How would you explain Bitcoin keys to a friend?"
        ],
        placeholder: "Share your thoughts about how Bitcoin's two-key system keeps your money safe! 💭"
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

      case 'interactive':
        return (
          <InteractiveScenario
            title={step.content.title}
            description={step.content.description}
            scenarios={step.content.scenarios}
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

// Interactive Scenario Component
const InteractiveScenario = ({ title, description, scenarios, onComplete }) => {
  const [currentScenario, setCurrentScenario] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const scenario = scenarios[currentScenario];

  const handleSubmit = () => {
    setShowResult(true);
    if (selectedAnswer === scenario.correct) {
      setTimeout(() => {
        if (currentScenario < scenarios.length - 1) {
          setCurrentScenario(prev => prev + 1);
          setSelectedAnswer(null);
          setShowResult(false);
        } else {
          onComplete();
        }
      }, 2000);
    }
  };

  return (
    <div className="step-content interactive-step">
      <div className="step-icon">
        <Key size={48} />
      </div>
      <h2>{title}</h2>
      <p className="scenario-description">{description}</p>
      
      {currentScenario < scenarios.length && (
        <div className="scenario-content">
          <h3>{scenario.title}</h3>
          <p>{scenario.description}</p>
          
          <div className="scenario-options">
            {scenario.options.map((option, index) => (
              <button
                key={index}
                className={`scenario-option ${selectedAnswer === index ? 'selected' : ''} ${
                  showResult ? (index === scenario.correct ? 'correct' : selectedAnswer === index ? 'incorrect' : '') : ''
                }`}
                onClick={() => !showResult && setSelectedAnswer(index)}
                disabled={showResult}
              >
                {option.text}
              </button>
            ))}
          </div>

          {!showResult && selectedAnswer !== null && (
            <button 
              className="submit-button"
              onClick={handleSubmit}
            >
              Submit Answer
            </button>
          )}

          {showResult && (
            <div className={`scenario-result ${selectedAnswer === scenario.correct ? 'correct' : 'incorrect'}`}>
              <p>{selectedAnswer === scenario.correct ? '🔐 Correct!' : '❌ Not quite right.'}</p>
              <p className="explanation">{scenario.options[selectedAnswer].feedback}</p>
            </div>
          )}
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