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
      title: "The $600M Pizza 🍕",
      type: "intro",
      content: {
        title: "The Most Expensive Pizza Ever!",
        text: "Imagine you're hungry and order a pizza online. You pay with your credit card, and 30 minutes later, your pizza arrives. Simple, right? 🍕\n\nBut in 2010, something amazing happened. A programmer named Laszlo was hungry too, but he tried something different:\n\n\"I'll pay 10,000 Bitcoin for two pizzas\" he posted online.\n\nSomeone took his offer:\n- Ordered two regular pizzas ($40).\n- Delivered them to Laszlo.\n- Got 10,000 Bitcoin in return.\n\nHere's the mind-blowing part: those Bitcoin would be worth hundreds of millions today! 🤯\n\nBut wait... let's think about something:\n\n🤔 Your Pizza Order:\n- You: \"Here's my credit card number\"\n- Bank: \"Checking if you have $40...\"\n- Bank: \"Yes, sending money to pizza place\"\n- Only the banks see this happening\n\n🤔 Laszlo's Bitcoin Pizza:\n- Laszlo: \"Here's my Bitcoin payment\"\n- Everyone: \"We can all see and verify this payment!\"\n- No banks needed\n- Can't be changed or hidden\n\nThis brings us to an interesting question:\nHow do thousands of computers around the world agree on who sent what to whom, without any banks in the middle? 🌍\n\nTo understand this, we first need to learn how computers talk to each other. Ready to find out? 💫"
      }
    },
    {
      title: "Computer Language",
      type: "intro",
      content: {
        title: "How Do Computers Talk to Each Other?",
        text: "Let's play a game! 🎮\n\nImagine you and your friend want to pass notes in class, but you want to make sure:\n   • Nobody can change the message\n   • Everyone gets the exact same message\n   • No mistakes allowed!\n\nYou might think computers just use regular numbers like we do (0-9). But they actually use **three different ways** to write numbers. Why? Let's find out!\n\n1. Computer's Native Language (**Binary**)\n   • Think of it like this: Computers can only use **0 and 1**\n   • Just like how a light switch can only be **ON** or **OFF**\n   • It's simple but takes lots of space!\n\n2. Human-Friendly Format (**Decimal**)\n   • This is how **we** write numbers (0-9)\n   • Easy for humans to read\n   • Bitcoin shows amounts this way\n\n3. Space-Saving Format (**Hexadecimal**)\n   • Uses numbers 0-9 and letters **A-F**\n   • Perfect middle ground\n   • Bitcoin uses this for addresses\n\n🤔 Why Three Different Ways?\n   • Computers **need** binary (it's the only thing they understand)\n   • Humans like regular numbers (easier for us!)\n   • Shorthand makes long computer numbers easier to read\n\nLet's see this in action:\nWhen Laszlo sent his 10,000 Bitcoin:\n   • You and I see: **10,000**\n   • Computers see: **0000000000002710**\n   • Shorthand writes it as: **2710**\n\nReady to learn how to read and write these different number systems? It's like learning a secret code! 🔍"
      }
    },
    {
      title: "Examples: Hex & Little Endian",
      type: "examples",
      content: {
        title: "Let's Practice Different Number Systems",
        sections: [
          {
            title: "Hex Numbers",
            description: "Hex (short for hexadecimal) is like a secret code that uses 16 different symbols: the numbers 0-9 and letters A-F. It's a shorter way to write the long numbers that computers use.",
            examples: [
              { hex: "A", decimal: 10, explanation: "When you see 'A' in hex, it means '10' in regular numbers." },
              { hex: "F", decimal: 15, explanation: "The letter 'F' is the highest digit in hex, meaning '15'." },
              { hex: "10", decimal: 16, explanation: "Just like we write '10' when we run out of single digits, hex uses '10' to mean '16'." }
            ]
          },
          {
            title: "Little Endian",
            description: "Sometimes computers read numbers backwards in pairs - like reading 'desserts' as 'stressed'. It might seem strange, but it helps computers work faster with these numbers.",
            examples: [
              { 
                normal: "12", 
                reversed: "21", 
                explanation: "Think of it like flipping a two-digit number: 12 becomes 21." 
              },
              { 
                normal: "1234", 
                reversed: "3412", 
                explanation: "With more digits, we flip them in pairs: '12 34' becomes '34 12'." 
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
        explanation: "FF in hex = (15 × 16¹) + (15 × 16⁰) = 240 + 15 = 255."
      }
    },
    {
      title: "Practice: Hex Calculator",
      type: "practice",
      content: {
        title: "Your Turn: Convert These Numbers!",
        description: "Let's practice converting real Bitcoin numbers:",
        challenges: [
          {
            title: "🎯 Challenge 1: Block Version",
            description: "Convert this block version number from hex:",
            hex: "01",
            hint: "Remember: 01 in hex equals 1 in decimal.",
            expected: 1
          },
          {
            title: "🎯 Challenge 2: Transaction Fee",
            description: "Convert this transaction fee from hex:",
            hex: "2A",
            hint: "2A = (2 × 16) + (10).",
            expected: 42
          },
          {
            title: "🎯 Challenge 3: Block Reward",
            description: "Convert this early block reward from hex:",
            hex: "FF",
            hint: "FF = (15 × 16) + 15.",
            expected: 255
          }
        ]
      }
    },
    {
      title: "Digital Security",
      type: "intro",
      content: {
        title: "How Computers Protect Information",
        text: "Let's explore how computers secure information 🔒\n\nComputers write data in different formats:\n\n1. Binary (native language):\n   'Hi' → 01001000 01101001\n\n2. Hexadecimal (compact format):\n   01001000 01101001 → 4869\n\nUsing these formats, computers create secure patterns that can't be reversed:\n\n'Hello Bitcoin'\n→ Binary: 01001000 01100101 01101100...\n→ Secure Pattern: 9595c9bca95d...\n\nThis process has three key features:\n\n1. Consistency:\n   Same input = Same pattern, always.\n\n2. Sensitivity:\n   Tiny change = Completely different pattern.\n\n3. One-Way:\n   Can't reverse the pattern back to the original.\n\nReal-World Uses:\n- Password security\n- Digital signatures\n- Bitcoin transactions\n\nNext, we'll practice working with these number systems! 💫"
      }
    },
    {
      title: "Reflection: Bitcoin's Time-Stamped History Book",
      type: "reflection",
      content: {
        question: "How would you organize a giant digital history book so computers can quickly find any past transaction? 📚",
        mainPrompt: "Bitcoin works like a time-stamped ledger where each page has a unique hex number label (like '000000000003ba27...'). Sometimes these numbers are stored backwards for efficiency! 🔄",
        subQuestions: [
          "What's unusual about this numbering system?",
          "What makes it clever?",
          "What aspects still puzzle you?",
          "How would you explain this system to a friend?"
        ],
        placeholder: "Share your thoughts about Bitcoin's unique way of organizing its transaction history. Does it remind you of other systems you know? What questions do you have about how it works?"
      }
    }
  ];

  const handleStepComplete = (stepIndex) => {
    try {
      if (typeof stepIndex !== 'number' || stepIndex < 0 || stepIndex >= steps.length) {
        console.error('Invalid step index:', stepIndex);
        return;
      }

      const newCompleted = new Set(completedSteps);
      newCompleted.add(stepIndex);
      setCompletedSteps(newCompleted);
      
      if (newCompleted.size === steps.length && typeof completeModule === 'function') {
        completeModule('numbers');
      }
    } catch (error) {
      console.error('Error in handleStepComplete:', error);
    }
  };

  const renderStep = (step, index) => {
    if (!step || !step.type) {
      console.error('Invalid step data:', step);
      return null;
    }

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

      case 'reflection':
                  return (
            <ReflectionStep
              question={step.content.question}
              placeholder={step.content.placeholder}
              content={step.content}
              onComplete={() => handleStepComplete(index)}
              setCurrentStep={setCurrentStep}
              isLastStep={index === steps.length - 1}
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

const ChallengeStep = ({ title, description, content, onComplete }) => {
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [completed, setCompleted] = useState(new Set());

  const validateAnswer = (answer) => {
    if (!answer) return false;
    
    switch (currentChallengeData.inputType) {
      case 'number':
        return !isNaN(answer) && answer.toString() === currentChallengeData.answer;
      case 'sequence':
        const userSeq = answer.split(',').map(n => n.trim());
        const correctSeq = currentChallengeData.answer.split(',');
        return userSeq.length === correctSeq.length && 
               userSeq.every((n, i) => n === correctSeq[i]);
      case 'code':
        return answer.replace(/\s+/g, '') === currentChallengeData.answer;
      default:
        return false;
    }
  };

  const handleInputChange = (value) => {
    setUserAnswer(value);
    setShowError(false);
  };

  const checkAnswer = () => {
    if (!userAnswer) {
      setShowError(true);
      return;
    }

    const isCorrect = validateAnswer(userAnswer);
    
    if (isCorrect) {
      setShowSuccess(true);
      setShowError(false);
      setShowHint(false);
    } else {
      setShowError(true);
      setTimeout(() => setShowError(false), 2000);
    }
  };

  // Validate props and provide defaults
  const challenges = content?.challenges || [];
  const currentChallengeData = challenges[currentChallenge] || {
    title: '',
    description: '',
    hint: '',
    answer: ''
  };

  const handleNext = () => {
    if (currentChallenge < challenges.length - 1) {
      setCurrentChallenge(currentChallenge + 1);
      resetState();
    } else if (completed.size === challenges.length) {
      onComplete?.();
    }
  };

  const resetState = () => {
    setShowHint(false);
    setShowSuccess(false);
    setShowError(false);
    setUserAnswer('');
  };

  const markCompleted = () => {
    const newCompleted = new Set(completed);
    newCompleted.add(currentChallenge);
    setCompleted(newCompleted);
    
    // Show success message briefly before moving on
    setTimeout(handleNext, 1500);
  };

  // If no challenges are available, show an error message
  if (challenges.length === 0) {
    return (
      <div className="challenge-step error">
        <h2>Oops!</h2>
        <p>No challenges available at the moment. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="challenge-step">
      <h2>{content.title}</h2>
      <p className="description">{content.description}</p>

      <div className="challenge-progress">
        {challenges.map((_, index) => (
          <div 
            key={index}
            className={`progress-dot ${currentChallenge === index ? 'active' : ''} ${completed.has(index) ? 'completed' : ''}`}
          />
        ))}
      </div>

      <div className="challenge-card">
        <div className="game-header">
          <span className="game-emoji">{currentChallengeData.gameImage}</span>
          <h3>{currentChallengeData.title}</h3>
        </div>

        <p className="game-description">{currentChallengeData.description}</p>

        <div className="answer-input-section">
          {currentChallengeData.inputType === 'number' && (
            <div className="number-input">
              <input
                type="number"
                placeholder={`Enter ${currentChallengeData.context}`}
                onChange={(e) => handleInputChange(e.target.value)}
                value={userAnswer}
                className="game-input"
              />
              <span className="context-label">{currentChallengeData.context}</span>
            </div>
          )}

          {currentChallengeData.inputType === 'sequence' && (
            <div className="sequence-input">
              <input
                type="text"
                placeholder="Enter numbers separated by commas"
                onChange={(e) => handleInputChange(e.target.value)}
                value={userAnswer}
                className="game-input"
              />
              <span className="context-label">{currentChallengeData.context}</span>
            </div>
          )}

          {currentChallengeData.inputType === 'code' && (
            <div className="code-input">
              <input
                type="text"
                placeholder="Enter the flipped code"
                onChange={(e) => handleInputChange(e.target.value)}
                value={userAnswer}
                className="game-input code-style"
              />
              <span className="context-label">{currentChallengeData.context}</span>
            </div>
          )}

          <button 
            className="submit-answer"
            onClick={checkAnswer}
          >
            Submit Answer! 🎮
          </button>
        </div>

        <div className="game-controls">
          {!showHint && (
            <button 
              className="hint-button"
              onClick={() => setShowHint(true)}
            >
              Need a Hint? 💡
            </button>
          )}
        </div>

        {showHint && (
          <div className="hint-box">
            <p>💡 {currentChallengeData.hint}</p>
          </div>
        )}

        {showSuccess && (
          <div className="success-box">
            <p className="success-message">{currentChallengeData.successMessage}</p>
            <button 
              className="next-challenge"
              onClick={() => {
                markCompleted();
                setShowSuccess(false);
              }}
            >
              Next Challenge! →
            </button>
          </div>
        )}

        {showError && (
          <div className="error-box">
            <p>Not quite! Try again or use the hint! 🎮</p>
          </div>
        )}
      </div>

      {currentChallenge > 0 && (
                  <button 
            className="back-button"
            onClick={() => {
              setCurrentChallenge(currentChallenge - 1);
              resetState();
            }}
          >
            ← Previous Challenge
          </button>
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
    if (!answer) return;

    const numAnswer = parseInt(answer);
    if (isNaN(numAnswer)) {
      setFeedback({
        ...feedback,
        [challengeIndex]: {
          isCorrect: false,
          message: "Please enter a valid number"
        }
      });
      return;
    }

    const isCorrect = numAnswer === challenges[challengeIndex].expected;
    
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

const ReflectionStep = ({ question, placeholder, onComplete, content, setCurrentStep, isLastStep }) => {
  const [reflection, setReflection] = useState('');
  const [isSkipped, setIsSkipped] = useState(false);
  const minLength = 100; // Requiring more thoughtful responses

  // Ensure we have the required props
  if (!onComplete || typeof onComplete !== 'function') {
    console.error('ReflectionStep: onComplete prop is required and must be a function');
    return null;
  }

  const handleSubmit = () => {
    if (reflection.trim().length >= minLength) {
      handleStepComplete();
    }
  };

  const handleStepComplete = () => {
    try {
      onComplete();
      if (isLastStep) {
        setIsSkipped(true);
      } else if (setCurrentStep && typeof setCurrentStep === 'function') {
        setCurrentStep(prev => prev + 1);
      }
    } catch (error) {
      console.error('Error in handleStepComplete:', error);
    }
  };

  const handleSkip = () => {
    handleStepComplete();
  };

  const handleBackToHome = () => {
    window.location.href = '/';
  };

    return (
    <div className="reflection-step">
      {isSkipped ? (
        <div className="completion-view">
          <h3>🎉 Module Complete!</h3>
          <p>You've completed the Numbers & Encoding module.</p>
          <div className="completion-buttons">
            <button 
              className="home-button"
              onClick={handleBackToHome}
            >
              ← Back to Home
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="reflection-intro">
            <h3>🤔 Think About This...</h3>
            <div className="reflection-header">
              <p className="main-question">{question || 'Time to reflect on what you learned!'}</p>
              {content?.mainPrompt && <p className="main-prompt">{content.mainPrompt}</p>}
              <p className="optional-note">(This reflection is optional - feel free to skip if you prefer to continue learning!)</p>
            </div>
          </div>

          <div className="sub-questions">
            {content?.subQuestions?.length > 0 && (
              <>
                <p className="prompt-header">✨ Consider these points:</p>
                {content.subQuestions.map((subQ, index) => (
                  <div key={index} className="sub-question">
                    <p>• {subQ || `Question ${index + 1}`}</p>
                  </div>
                ))}
              </>
            )}
          </div>

          <div className="reflection-input">
            <textarea
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
              placeholder={placeholder}
              rows={10}
              className="reflection-textarea"
            />
            <div className="reflection-footer">
              <div className="reflection-controls">
                <p className="word-count">
                  {reflection.length} / {minLength} characters
                  {reflection.length < minLength && " (need more thoughts!)"}
                </p>
                <div className="button-group">
                  <button 
                    className="skip-button"
                    onClick={handleSkip}
                  >
                    Skip Reflection →
                  </button>
                  <button 
                    className="submit-button"
                    onClick={handleSubmit}
                    disabled={reflection.trim().length < minLength}
                  >
                    Share Your Insights
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NumbersModule; 