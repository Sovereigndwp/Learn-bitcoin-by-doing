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
        text: "Bitcoin works with numbers in a special way! Instead of regular numbers (0-9), it often uses hex numbers (0-9 and A-F) which are like a shorthand for bigger numbers. Bitcoin also flips the order of number pairs around - think of it like reading backwards. Don't worry if this sounds confusing - we'll practice together and it'll make sense!"
      }
    },
    {
      title: "Examples: Hex & Little Endian",
      type: "examples",
      content: {
        title: "Quick Examples Before the Quiz",
        sections: [
          {
            title: "Hex Numbers",
            description: "Hex uses 0-9 and A-F. Just like counting, but with 16 symbols instead of 10.",
            examples: [
              { hex: "A", decimal: 10, explanation: "A means 10" },
              { hex: "F", decimal: 15, explanation: "F means 15" },
              { hex: "10", decimal: 16, explanation: "10 means 16 (like going from 9 to 10 in normal counting)" }
            ]
          },
          {
            title: "Little Endian",
            description: "Bitcoin reverses the order of bytes. Think of it like reading backwards.",
            examples: [
              { 
                normal: "12", 
                reversed: "21", 
                explanation: "Normal: 12 → Little endian: 21" 
              },
              { 
                normal: "1234", 
                reversed: "3412", 
                explanation: "Normal: 1234 → Little endian: 3412 (pairs are flipped)" 
              }
            ]
          }
        ]
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
      title: "Practice: Hex Calculator",
      type: "practice",
      content: {
        title: "Your Turn: Convert These Numbers!",
        description: "Let's practice converting some real Bitcoin numbers. Try these challenges:",
        challenges: [
          {
            title: "🎯 Challenge 1: Block Version",
            description: "Bitcoin blocks have a version number. Convert this hex version number:",
            hex: "01",
            hint: "Remember: 01 is just like regular number 1",
            expected: 1
          },
          {
            title: "🎯 Challenge 2: Transaction Fee",
            description: "This transaction paid this fee (in hex):",
            hex: "2A",
            hint: "2A = (2 × 16) + (A=10)",
            expected: 42
          },
          {
            title: "🎯 Challenge 3: Block Reward",
            description: "Early Bitcoin blocks had this reward (in hex):",
            hex: "FF",
            hint: "FF = (F=15 × 16) + (F=15)",
            expected: 255
          }
        ]
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
              onClick={() => {
                handleStepComplete(index);
                setCurrentStep(index + 1);
              }}
            >
              Continue
            </button>
          </div>
        );

      case 'examples':
        return (
          <ExamplesStep
            title={step.content.title}
            sections={step.content.sections}
            onComplete={() => {
              handleStepComplete(index);
              setCurrentStep(index + 1);
            }}
          />
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

      case 'practice':
        return (
          <PracticeStep
            title={step.content.title}
            description={step.content.description}
            challenges={step.content.challenges}
            onComplete={() => {
              handleStepComplete(index);
              setCurrentStep(index + 1);
            }}
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
const ExamplesStep = ({ title, sections, onComplete }) => {
  const [currentSubStep, setCurrentSubStep] = useState(0);
  const [hexInput, setHexInput] = useState('');
  const [endianInput, setEndianInput] = useState('');
  const [completedSubSteps, setCompletedSubSteps] = useState(new Set());

  // Convert hex to decimal
  const hexToDecimal = (hex) => {
    if (!hex) return '';
    const cleaned = hex.replace(/[^0-9A-Fa-f]/g, '');
    if (!cleaned) return '';
    return parseInt(cleaned, 16).toString();
  };

  // Convert normal to little endian (reverse pairs of characters)
  const normalToLittleEndian = (input) => {
    if (!input) return '';
    const cleaned = input.replace(/[^0-9A-Fa-f]/g, '');
    if (cleaned.length % 2 !== 0) return cleaned; // Need even number of chars
    
    let result = '';
    for (let i = cleaned.length - 2; i >= 0; i -= 2) {
      result += cleaned.substr(i, 2);
    }
    return result;
  };

  const tryHexExample = (hex) => {
    setHexInput(hex);
  };

  const tryEndianExample = (normal) => {
    setEndianInput(normal);
  };

  const markSubStepComplete = (stepIndex) => {
    const newCompleted = new Set(completedSubSteps);
    newCompleted.add(stepIndex);
    setCompletedSubSteps(newCompleted);
  };

  const subSteps = [
    {
      title: "🔤 What is Hex?",
      content: (
        <div className="substep-content">
          <h3>Let's Start Simple: What is Hex?</h3>
          <p>Normal counting uses 10 symbols: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9</p>
          <p>Hex counting uses 16 symbols: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, A, B, C, D, E, F</p>
          
          <div className="hex-basics">
            <h4>The Extra Letters Mean:</h4>
            <div className="hex-mapping">
              A = 10,&nbsp;&nbsp;&nbsp;B = 11,&nbsp;&nbsp;&nbsp;C = 12,&nbsp;&nbsp;&nbsp;D = 13,&nbsp;&nbsp;&nbsp;E = 14,&nbsp;&nbsp;&nbsp;F = 15
            </div>
          </div>
          
          <p><strong>That's it!</strong> A is just another way to write 10, F is another way to write 15.</p>
          
          <button 
            className="substep-continue"
            onClick={() => {
              markSubStepComplete(0);
              setCurrentSubStep(1);
            }}
          >
            Got it! Next →
          </button>
        </div>
      )
    },
    {
      title: "🎯  Try Single Hex Digits",
      content: (
        <div className="substep-content">
          <h3>Practice: Single Hex Digits</h3>
          <p>Click these buttons to see what each hex digit means in normal numbers:</p>
          
          <div className="single-digit-practice">
            <div className="digit-grid">
              {['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F'].map(digit => (
                <button 
                  key={digit}
                  className="digit-button"
                  onClick={() => setHexInput(digit)}
                >
                  {digit}
                </button>
              ))}
            </div>
            
            <div className="practice-result">
              {hexInput && (
                <div className="conversion-display">
                  <span className="hex-value">{hexInput}</span>
                  <span className="equals">=</span>
                  <span className="decimal-value">{hexToDecimal(hexInput)}</span>
                </div>
              )}
            </div>
          </div>
          
          <p className="encouragement">Click different letters and numbers to see the pattern!</p>
          
          <button 
            className="substep-continue"
            onClick={() => {
              markSubStepComplete(1);
              setCurrentSubStep(2);
            }}
          >
            I understand single digits! →
          </button>
        </div>
      )
    },
    {
      title: "🔢 Two Hex Digits",
      content: (
        <div className="substep-content">
          <h3>Now: Two Hex Digits Together</h3>
          <p>When you put two hex digits together, it works like this:</p>
          
          <div className="two-digit-explanation">
            <div className="example-breakdown">
              <h4>Example: 1A</h4>
              <p>First digit (1) × 16 = 16</p>
              <p>Second digit (A=10) × 1 = 10</p>
              <p>Total: 16 + 10 = 26</p>
            </div>
          </div>
          
          <div className="calculator-section">
            <p>Try typing two-digit hex numbers:</p>
            <div className="calculator-row">
              <input
                type="text"
                value={hexInput}
                onChange={(e) => setHexInput(e.target.value.toUpperCase().slice(0,2))}
                placeholder="Like 1A or FF"
                className="calc-input"
                maxLength="2"
              />
              <span className="equals">=</span>
              <div className="calc-result">
                {hexToDecimal(hexInput) || '?'}
              </div>
            </div>
            
            <div className="quick-try-buttons">
              <span>Try these:</span>
              <button onClick={() => setHexInput('1A')}>1A</button>
              <button onClick={() => setHexInput('2B')}>2B</button>
              <button onClick={() => setHexInput('FF')}>FF</button>
            </div>
          </div>
          
          <button 
            className="substep-continue"
            onClick={() => {
              markSubStepComplete(2);
              setCurrentSubStep(3);
            }}
          >
            I get two digits! →
          </button>
        </div>
      )
    },
    {
      title: "🧮 Bigger Hex Numbers",
      content: (
        <div className="substep-content">
          <h3>Now Let's Try 3 and 4 Digits!</h3>
          <p>The pattern continues - each position is worth 16 times more than the one to its right:</p>
          
          <div className="big-number-examples">
            <div className="example-card">
              <h4>3-Digit Example: 1AB</h4>
              <div className="calculation-steps">
                <div className="step">Position 3 (1) × 16² = 1 × 256 = 256</div>
                <div className="step">Position 2 (A=10) × 16¹ = 10 × 16 = 160</div>
                <div className="step">Position 1 (B=11) × 16⁰ = 11 × 1 = 11</div>
                <div className="total">Total: 256 + 160 + 11 = <strong>427</strong></div>
              </div>
            </div>
            
            <div className="example-card">
              <h4>4-Digit Example: 1ABC</h4>
              <div className="calculation-steps">
                <div className="step">Position 4 (1) × 16³ = 1 × 4096 = 4096</div>
                <div className="step">Position 3 (A=10) × 16² = 10 × 256 = 2560</div>
                <div className="step">Position 2 (B=11) × 16¹ = 11 × 16 = 176</div>
                <div className="step">Position 1 (C=12) × 16⁰ = 12 × 1 = 12</div>
                <div className="total">Total: 4096 + 2560 + 176 + 12 = <strong>6844</strong></div>
              </div>
            </div>
          </div>
          
          <div className="pattern-explanation">
            <h4>🔍 See the Pattern?</h4>
            <p>Each position is a power of 16:</p>
            <div className="power-chart">
              <span>16⁰ = 1</span>
              <span>16¹ = 16</span>
              <span>16² = 256</span>
              <span>16³ = 4096</span>
            </div>
          </div>
          
          <div className="calculator-section">
            <p>Try these bigger hex numbers in your head or with a calculator:</p>
            <div className="try-buttons">
              <button onClick={() => setHexInput('ABC')}>ABC = ?</button>
              <button onClick={() => setHexInput('DEF')}>DEF = ?</button>
              <button onClick={() => setHexInput('1000')}>1000 = ?</button>
            </div>
            
            {hexInput && (
              <div className="big-result">
                <span className="hex-display">{hexInput}</span>
                <span className="equals"> = </span>
                <span className="decimal-display">{hexToDecimal(hexInput)}</span>
              </div>
            )}
          </div>
          
          <button 
            className="substep-continue"
            onClick={() => {
              markSubStepComplete(3);
              setCurrentSubStep(4);
            }}
          >
            I understand bigger numbers! →
          </button>
        </div>
      )
    },
    {
      title: "🎲 What is Little Endian?",
      content: (
        <div className="substep-content">
          <h3>Little Endian = Reading Backwards</h3>
          <p>Bitcoin sometimes flips pairs of hex numbers around. Think of it like reading backwards, but only in pairs.</p>
          
          <div className="endian-explanation">
            <h4>Simple Example:</h4>
            <div className="endian-demo">
              <div className="normal">Normal: <span className="highlight">12</span></div>
              <div className="arrow">↓ flip it ↓</div>
              <div className="flipped">Little Endian: <span className="highlight">21</span></div>
            </div>
            
            <h4>Longer Example:</h4>
            <div className="endian-demo">
              <div className="normal">Normal: <span className="pair">12</span><span className="pair">34</span></div>
              <div className="arrow">↓ flip each pair ↓</div>
              <div className="flipped">Little Endian: <span className="pair">34</span><span className="pair">12</span></div>
            </div>
          </div>
          
          <p><strong>Why?</strong> It's just how Bitcoin likes to store its numbers. Like a secret code!</p>
          
          <button 
            className="substep-continue"
            onClick={() => {
              markSubStepComplete(4);
              setCurrentSubStep(5);
            }}
          >
            Got it! →
          </button>
        </div>
      )
    },
    {
      title: "🔄 Practice Little Endian",
      content: (
        <div className="substep-content">
          <h3>Practice: Flip the Pairs</h3>
          <p>Type some hex numbers and watch them get flipped:</p>
          
          <div className="calculator-section">
            <div className="calculator-row">
              <input
                type="text"
                value={endianInput}
                onChange={(e) => setEndianInput(e.target.value.toUpperCase())}
                placeholder="Like 1234 or ABCD"
                className="calc-input"
              />
              <span className="arrow">→ flip →</span>
              <div className="calc-result">
                {normalToLittleEndian(endianInput) || '?'}
              </div>
            </div>
            
            <div className="quick-try-buttons">
              <span>Try these:</span>
              <button onClick={() => setEndianInput('12')}>12</button>
              <button onClick={() => setEndianInput('1234')}>1234</button>
              <button onClick={() => setEndianInput('ABCD')}>ABCD</button>
              <button onClick={() => setEndianInput('123456')}>123456</button>
            </div>
            
            <div className="tip">
              💡 <strong>Tip:</strong> Each pair (like 12 or AB) flips around, then the whole thing reads backwards!
            </div>
          </div>
          
          <button 
            className="substep-continue"
            onClick={() => {
              markSubStepComplete(5);
              onComplete();
            }}
          >
            I'm ready for the quiz! →
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="step-content examples-step">
      <div className="step-icon">
        <Calculator size={48} />
      </div>
      <h2>Let's Learn Step by Step</h2>
      
      <div className="substep-progress">
        <div className="substep-indicators">
          {subSteps.map((_, index) => (
            <div 
              key={index}
              className={`substep-dot ${currentSubStep === index ? 'active' : ''} ${completedSubSteps.has(index) ? 'completed' : ''}`}
            />
          ))}
        </div>
        <p className="substep-title">{subSteps[currentSubStep].title}</p>
      </div>
      
      <div className="substep-container">
        {subSteps[currentSubStep].content}
      </div>
      
      {currentSubStep > 0 && (
        <button 
          className="back-button"
          onClick={() => setCurrentSubStep(currentSubStep - 1)}
        >
          ← Back
        </button>
      )}
    </div>
  );
};

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

const PracticeStep = ({ title, description, challenges, onComplete }) => {
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [showHints, setShowHints] = useState({});
  const [feedback, setFeedback] = useState({});

  const handleAnswerSubmit = (challengeIndex, answer) => {
    const numAnswer = parseInt(answer);
    const isCorrect = !isNaN(numAnswer) && numAnswer === challenges[challengeIndex].expected;
    
    setFeedback({
      ...feedback,
      [challengeIndex]: {
        isCorrect,
        message: isCorrect ? "🎉 Correct!" : "Try again! Use the hint if you need help."
      }
    });

    if (isCorrect) {
      setUserAnswers({
        ...userAnswers,
        [challengeIndex]: answer
      });

      // If all challenges are completed correctly
      if (Object.keys(userAnswers).length === challenges.length - 1) {
        setTimeout(() => onComplete(), 1000);
      } else {
        // Move to next challenge after a short delay
        setTimeout(() => setCurrentChallenge(challengeIndex + 1), 1000);
      }
    }
  };

  const toggleHint = (challengeIndex) => {
    setShowHints({
      ...showHints,
      [challengeIndex]: !showHints[challengeIndex]
    });
  };

  const challenge = challenges[currentChallenge];

  return (
    <div className="practice-step">
      <h2>{title}</h2>
      <p className="description">{description}</p>

      <div className="challenge-progress">
        {challenges.map((_, index) => (
          <div 
            key={index}
            className={`progress-dot ${currentChallenge === index ? 'active' : ''} ${userAnswers[index] ? 'completed' : ''}`}
          />
        ))}
      </div>

      <div className="challenge-card">
        <h3>{challenge.title}</h3>
        <p>{challenge.description}</p>
        
        <div className="hex-display">
          <span className="hex-label">Hex:</span>
          <span className="hex-value">{challenge.hex}</span>
        </div>

        <div className="answer-section">
          <input
            type="number"
            placeholder="Enter decimal number"
            onChange={(e) => handleAnswerSubmit(currentChallenge, e.target.value)}
            className="answer-input"
          />
          
          <button 
            className="hint-button"
            onClick={() => toggleHint(currentChallenge)}
          >
            Need a hint? 💡
          </button>
          
          {showHints[currentChallenge] && (
            <div className="hint-box">
              {challenge.hint}
            </div>
          )}
          
          {feedback[currentChallenge] && (
            <div className={`feedback ${feedback[currentChallenge].isCorrect ? 'correct' : 'incorrect'}`}>
              {feedback[currentChallenge].message}
            </div>
          )}
        </div>
      </div>

      {currentChallenge > 0 && (
        <button 
          className="back-button"
          onClick={() => setCurrentChallenge(currentChallenge - 1)}
        >
          ← Previous Challenge
        </button>
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