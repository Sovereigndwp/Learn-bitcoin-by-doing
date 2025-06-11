import React, { useState } from 'react';
import { useProgress } from '../contexts/ProgressContext';
import { useLanguage } from '../contexts/LanguageContext';
import CodeEditor from '../components/CodeEditor';
import { hexToDec, decToHex, hexToLittleEndian } from '../utils/bitcoin';
import { Calculator, CheckCircle, Trophy } from 'lucide-react';
import '../components/ModuleCommon.css';

const NumbersModule = () => {
  const { completeModule, isModuleCompleted } = useProgress();
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(new Set());

  const steps = [
    {
      title: "Introduction",
      type: "intro",
      content: {
        title: "Numbers and Encoding in Bitcoin",
        text: "Bitcoin uses hexadecimal (hex) numbers and little-endian byte ordering to efficiently pack data. Understanding these concepts is crucial for working with Bitcoin transactions, block headers, and cryptographic operations."
      }
    },
    {
      title: "Warm-up: Hex Quiz",
      type: "warmup",
      content: {
        question: "What is the decimal value of hex 'FF'?",
        options: ["255", "256", "15", "16"],
        correct: 0,
        explanation: "FF in hex = (15 × 16¹) + (15 × 16⁰) = 240 + 15 = 255"
      }
    },
    {
      title: "Code Lab: Hex Conversion",
      type: "codelab",
      content: {
        title: "Convert Hex to Decimal",
        initialCode: `function hexToDec(hex) {
  // Your code here
  // Convert hex string to decimal number
  // Example: "1a" should return 26
  
}`,
        testFunction: (userFunc) => {
          const testCases = [
            { input: "1a", expected: 26 },
            { input: "ff", expected: 255 },
            { input: "100", expected: 256 }
          ];
          
          for (const test of testCases) {
            const result = userFunc(test.input);
            if (result !== test.expected) {
              throw new Error(`Expected ${test.expected} for input "${test.input}", got ${result}`);
            }
          }
          return "All tests passed!";
        }
      }
    },
    {
      title: "Challenge: Block Data",
      type: "challenge",
      content: {
        title: "Decode Block Version and Timestamp",
        description: "A Bitcoin block header contains a version number (4 bytes) and timestamp (4 bytes) in little-endian format. Decode these values:",
        data: {
          version: "01000000", // Version 1 in little endian
          timestamp: "398b1d4f" // Unix timestamp in little endian
        }
      }
    },
    {
      title: "Reflection",
      type: "reflection",
      content: {
        question: "What did you learn about how Bitcoin uses numbers?",
        placeholder: "Write about how hex and little-endian encoding help Bitcoin pack data efficiently..."
      }
    }
  ];

  const handleStepComplete = (stepIndex) => {
    const newCompleted = new Set(completedSteps);
    newCompleted.add(stepIndex);
    setCompletedSteps(newCompleted);
    
    if (newCompleted.size === steps.length) {
      completeModule('numbers');
    }
  };

  const renderStep = (step, index) => {
    switch (step.type) {
      case 'intro':
        return (
          <div className="step-content intro-step">
            <div className="step-icon">
              <Calculator size={48} />
            </div>
            <h2>{step.content.title}</h2>
            <p className="intro-text">{step.content.text}</p>
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
          <Calculator className="module-icon" />
          Numbers & Encoding
        </h1>
        {isModuleCompleted('numbers') && (
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

        <div className="step-navigation">
          <button
            className="nav-button prev-button"
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
          >
            Previous
          </button>
          <button
            className="nav-button next-button"
            onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
            disabled={currentStep === steps.length - 1}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

// Helper Components
const WarmupQuiz = ({ question, options, correct, explanation, onComplete }) => {
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const handleSubmit = () => {
    setShowResult(true);
    if (selected === correct) {
      setTimeout(() => onComplete(), 2000);
    }
  };

  return (
    <div className="warmup-quiz">
      <h3>{question}</h3>
      <div className="quiz-options">
        {options.map((option, index) => (
          <button
            key={index}
            className={`quiz-option ${selected === index ? 'selected' : ''} ${showResult ? (index === correct ? 'correct' : selected === index ? 'incorrect' : '') : ''}`}
            onClick={() => !showResult && setSelected(index)}
            disabled={showResult}
          >
            {option}
          </button>
        ))}
      </div>
      {!showResult && (
        <button 
          className="submit-button"
          onClick={handleSubmit}
          disabled={selected === null}
        >
          Submit Answer
        </button>
      )}
      {showResult && (
        <div className={`result ${selected === correct ? 'correct' : 'incorrect'}`}>
          <p>{selected === correct ? '🎉 Correct!' : '❌ Incorrect'}</p>
          <p className="explanation">{explanation}</p>
        </div>
      )}
    </div>
  );
};

const ChallengeStep = ({ title, description, data, onComplete }) => {
  const [answers, setAnswers] = useState({ version: '', timestamp: '' });
  const [showResults, setShowResults] = useState(false);

  const handleSubmit = () => {
    setShowResults(true);
    // Check answers
    const versionCorrect = parseInt(hexToLittleEndian(data.version), 16) === parseInt(answers.version);
    const timestampCorrect = parseInt(hexToLittleEndian(data.timestamp), 16) === parseInt(answers.timestamp);
    
    if (versionCorrect && timestampCorrect) {
      setTimeout(() => onComplete(), 2000);
    }
  };

  return (
    <div className="challenge-step">
      <h3>{title}</h3>
      <p>{description}</p>
      <div className="challenge-data">
        <div className="data-field">
          <label>Version (little-endian): {data.version}</label>
          <input
            type="number"
            placeholder="Enter decimal value"
            value={answers.version}
            onChange={(e) => setAnswers({...answers, version: e.target.value})}
            disabled={showResults}
          />
        </div>
        <div className="data-field">
          <label>Timestamp (little-endian): {data.timestamp}</label>
          <input
            type="number"
            placeholder="Enter decimal value"
            value={answers.timestamp}
            onChange={(e) => setAnswers({...answers, timestamp: e.target.value})}
            disabled={showResults}
          />
        </div>
      </div>
      {!showResults && (
        <button className="submit-button" onClick={handleSubmit}>
          Submit Answers
        </button>
      )}
      {showResults && (
        <div className="challenge-results">
          <p>Version: {parseInt(hexToLittleEndian(data.version), 16)} (Your answer: {answers.version})</p>
          <p>Timestamp: {parseInt(hexToLittleEndian(data.timestamp), 16)} (Your answer: {answers.timestamp})</p>
        </div>
      )}
    </div>
  );
};

const ReflectionStep = ({ question, placeholder, onComplete }) => {
  const [reflection, setReflection] = useState('');

  const handleSubmit = () => {
    if (reflection.trim().length > 20) {
      onComplete();
    }
  };

  return (
    <div className="reflection-step">
      <h3>{question}</h3>
      <textarea
        value={reflection}
        onChange={(e) => setReflection(e.target.value)}
        placeholder={placeholder}
        rows={6}
        className="reflection-textarea"
      />
      <button 
        className="submit-button"
        onClick={handleSubmit}
        disabled={reflection.trim().length < 20}
      >
        Submit Reflection
      </button>
      <p className="word-count">{reflection.length} characters</p>
    </div>
  );
};

export default NumbersModule; 