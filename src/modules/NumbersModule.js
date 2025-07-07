import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '../contexts/ProgressContext';
import { Calculator, CheckCircle, Trophy } from 'lucide-react';
import '../components/ModuleCommon.css';

const NumbersModule = () => {
  const { completeModule, isModuleCompleted } = useProgress();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(new Set());

  const steps = [
    {
      title: "The $600M Pizza 🍕",
      type: "intro",
      content: {
        title: "The Most Expensive Pizza Ever!",
        text: "Imagine you're hungry and order a pizza online. You pay with your credit card, and 30 minutes later, your pizza arrives. Simple, right? 🍕\n\nBut in 2010, something significant happened. A programmer named Laszlo was hungry too, but he tried something different:\n\n\"I'll pay 10,000 Bitcoin for two pizzas\" he posted online.\n\nSomeone took his offer:\n* Ordered two regular pizzas ($40).\n* Delivered them to Laszlo.\n* Got 10,000 Bitcoin in return.\n\nHere's the remarkable part: those Bitcoin would be 'hundreds of millions' today! 🤯\n\nBut wait... let's think about something:\n\n🤔 Your Pizza Order:\n* You: \"Here's my credit card number\"\n* Payment Terminal: \"Encrypting and sending card data...\"\n* Payment Processor: \"Validating card details...\"\n* Your Bank: \"Checking if you have $40...\"\n* Card Network: \"Routing payment between banks...\"\n* Pizza Place's Bank: \"Accepting the payment...\"\n* Payment Processor: \"Confirming transaction...\"\n* Pizza Place: \"Got the payment, making pizza!\"\n* Only the banks and processors see this happening\n* Everything is stored in 'one big bank database' (fingers crossed it doesn't get hacked! 🤞)\n* You just have to 'trust' that the numbers in their database are 'really' correct\n\n🤔 Laszlo's Bitcoin Pizza:\n* Laszlo: \"Here's my Bitcoin payment\"\n* Everyone: \"We can all see and verify this payment!\"\n* No banks needed\n* Can't be changed or hidden\n\nHow do thousands of computers around the world agree on who sent what to whom, without any banks in the middle? 🌍\n\nTo understand this, we first need to learn how computers talk to each other. Ready to find out? 💫\n\n---\n\n_Special thanks to Jack Mallers for the 'aha moment' during his Miami 2021 presentation that inspired this explanation! 🙏_"
      }
    },
    {
      title: "Computer Language",
      type: "intro",
      content: {
        title: "How Do Computers Talk to Each Other?",
        text: "Consider this example: 🎮\n\nImagine you and your friend want to pass notes in class, but you want to make sure:\n   • Nobody can change the message\n   • Everyone gets the exact same message\n   • No mistakes allowed!\n\nYou might think computers just use regular numbers like we do (0-9). But they actually use 'three different ways' to write numbers. And here's something interesting: computers sometimes write numbers 'backwards' (right to left, like Hebrew!) because it helps them work more efficiently.\n\nLet's look at the three ways computers handle numbers:\n\n1. Computer's Native Language ('Binary')\n   • Think of it like this: Computers can only use '0 and 1'\n   • Just like how a light switch can only be 'ON' or 'OFF'\n   • It's simple but takes lots of space!\n\n2. Human-Friendly Format ('Decimal')\n   • This is how 'we' write numbers (0-9)\n   • Easy for humans to read\n   • Bitcoin shows amounts this way\n\n3. Space-Saving Format ('Hexadecimal')\n   • Uses numbers 0-9 and letters 'A-F'\n   • Perfect middle ground\n   • Bitcoin uses this for addresses\n\n🤔 Why Three Different Ways?\n   • Computers 'need' binary (it's the only thing they understand)\n   • Humans like regular numbers (easier for us!)\n   • Shorthand makes long computer numbers easier to read\n\nLet's see this in action:\nWhen Laszlo sent his 10,000 Bitcoin:\n   • You and I see: '10,000'\n   • Computers see: '10011100010000'\n   • Shorthand writes it as: '2710'\n   • And sometimes backwards as: '1027' (for efficiency!)\n\nReady to learn how to read and write these different number systems? It's like learning a new language! 🔍"
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

  const handleStepComplete = (index) => {
    setCompletedSteps(prev => new Set(prev).add(index));
    if (index === steps.length - 1) {
      completeModule('numbers');
      setTimeout(() => {
        navigate('/');
      }, 2000);
    }
    setCurrentStep(index + 1);
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
              onClick={() => handleStepComplete(index)}
            >
              Start Learning
            </button>
          </div>
        );

      case 'examples':
        return (
          <ExamplesStep
            title={step.content.title}
            sections={step.content.sections}
            onComplete={() => handleStepComplete(index)}
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
            onComplete={() => handleStepComplete(index)}
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

  const markSubStepComplete = (stepIndex) => {
    const newCompleted = new Set(completedSubSteps);
    newCompleted.add(stepIndex);
    setCompletedSubSteps(newCompleted);
  };

  const subSteps = [
    {
      title: "🔤 Single Hex Digits",
      content: (
        <div className="substep-content">
          <h3>Let's Start Simple: One Digit at a Time</h3>
          <p>In hex, we use 16 different symbols:</p>
          <div className="hex-basics">
            <div className="hex-mapping">
              <div className="hex-row">
                <span className="hex-label">Numbers (0-9):</span>
                <span className="hex-value">0, 1, 2, 3, 4, 5, 6, 7, 8, 9</span>
              </div>
              <div className="hex-row">
                <span className="hex-label">Letters (A-F):</span>
                <span className="hex-value">A = 10, B = 11, C = 12, D = 13, E = 14, F = 15</span>
              </div>
            </div>
          </div>
          
          <div className="interactive-section">
            <p>👉 Click any symbol to see its decimal value:</p>
            <div className="hex-grid">
              {['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F'].map(digit => (
                <button 
                  key={digit}
                  className="hex-button"
                  onClick={() => setHexInput(digit)}
                >
                  {digit}
                </button>
              ))}
            </div>
            
            {hexInput && (
              <div className="conversion-display">
                <span className="hex-display">Hex: {hexInput}</span>
                <span className="equals">→</span>
                <span className="decimal-display">Decimal: {hexToDecimal(hexInput)}</span>
              </div>
            )}
          </div>
          
          <button 
            className="substep-continue"
            onClick={() => {
              markSubStepComplete(0);
              setCurrentSubStep(1);
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
          <h3>Now: Two Digits Together</h3>
          <p>When you put two hex digits together, each position has a different value:</p>
          
          <div className="position-explanation">
            <div className="position-grid">
              <div className="position">
                <span className="pos-label">Left digit</span>
                <span className="pos-value">× 16</span>
              </div>
              <div className="position">
                <span className="pos-label">Right digit</span>
                <span className="pos-value">× 1</span>
              </div>
            </div>
          </div>

          <div className="example-breakdown">
            <h4>Example: 2A</h4>
            <div className="calculation">
              <div className="step">Left (2): 2 × 16 = 32</div>
              <div className="step">Right (A=10): 10 × 1 = 10</div>
              <div className="total">Total: 32 + 10 = 42</div>
            </div>
          </div>
          
          <div className="interactive-section">
            <p>👉 Try these common two-digit hex numbers:</p>
            <div className="example-buttons">
              <button onClick={() => setHexInput('1A')}>1A</button>
              <button onClick={() => setHexInput('2B')}>2B</button>
              <button onClick={() => setHexInput('FF')}>FF</button>
            </div>
            
            <div className="calculator">
              <p>Or type your own two-digit hex number:</p>
              <input
                type="text"
                value={hexInput}
                onChange={(e) => setHexInput(e.target.value.toUpperCase().slice(0,2))}
                placeholder="Example: 2A"
                maxLength="2"
              />
              {hexInput && (
                <div className="conversion-display">
                  <span className="hex-display">Hex: {hexInput}</span>
                  <span className="equals">→</span>
                  <span className="decimal-display">Decimal: {hexToDecimal(hexInput)}</span>
                </div>
              )}
            </div>
          </div>
          
          <button 
            className="substep-continue"
            onClick={() => {
              markSubStepComplete(1);
              setCurrentSubStep(2);
            }}
          >
            I get two digits! →
          </button>
        </div>
      )
    },
    {
      title: "📊 Bigger Numbers",
      content: (
        <div className="substep-content">
          <h3>Three and Four Digit Numbers</h3>
          <p>The pattern continues - each position is worth 16 times more than the one to its right:</p>
          
          <div className="position-values">
            <div className="value-grid">
              <div className="position">
                <span className="pos-label">4th digit</span>
                <span className="pos-value">× 4096 (16³)</span>
              </div>
              <div className="position">
                <span className="pos-label">3rd digit</span>
                <span className="pos-value">× 256 (16²)</span>
              </div>
              <div className="position">
                <span className="pos-label">2nd digit</span>
                <span className="pos-value">× 16 (16¹)</span>
              </div>
              <div className="position">
                <span className="pos-label">1st digit</span>
                <span className="pos-value">× 1 (16⁰)</span>
              </div>
            </div>
          </div>

          <div className="examples-section">
            <div className="example-card">
              <h4>Example: ABC (3 digits)</h4>
              <div className="calculation">
                <div className="step">A (10) × 256 = 2,560</div>
                <div className="step">B (11) × 16 = 176</div>
                <div className="step">C (12) × 1 = 12</div>
                <div className="total">Total: 2,560 + 176 + 12 = 2,748</div>
              </div>
            </div>
          </div>
          
          <div className="interactive-section">
            <p>👉 Try these bigger numbers:</p>
            <div className="example-buttons">
              <button onClick={() => setHexInput('ABC')}>ABC</button>
              <button onClick={() => setHexInput('BEEF')}>BEEF</button>
              <button onClick={() => setHexInput('1000')}>1000</button>
            </div>
            
            <div className="calculator">
              <p>Or type your own hex number:</p>
              <input
                type="text"
                value={hexInput}
                onChange={(e) => setHexInput(e.target.value.toUpperCase())}
                placeholder="Try ABC or 1000"
              />
              {hexInput && (
                <div className="conversion-display">
                  <span className="hex-display">Hex: {hexInput}</span>
                  <span className="equals">→</span>
                  <span className="decimal-display">Decimal: {hexToDecimal(hexInput)}</span>
                </div>
              )}
            </div>
          </div>
          
          <button 
            className="substep-continue"
            onClick={() => {
              markSubStepComplete(2);
              setCurrentSubStep(3);
            }}
          >
            I understand bigger numbers! →
          </button>
        </div>
      )
    },
    {
      title: "🔄 Little Endian",
      content: (
        <div className="substep-content">
          <h3>Reading Numbers Backwards</h3>
          <p>Sometimes computers store numbers backwards in pairs. This is called "little-endian" format.</p>
          
          <div className="endian-examples">
            <div className="example-card">
              <h4>Two Digits: 12</h4>
              <div className="conversion">
                <span className="normal">Normal: 12</span>
                <span className="arrow">↓</span>
                <span className="flipped">Little-endian: 21</span>
              </div>
            </div>
            
            <div className="example-card">
              <h4>Four Digits: 1234</h4>
              <div className="conversion">
                <span className="normal">Normal: <span className="pair">12</span><span className="pair">34</span></span>
                <span className="arrow">↓</span>
                <span className="flipped">Little-endian: <span className="pair">34</span><span className="pair">12</span></span>
              </div>
            </div>
          </div>
          
          <div className="interactive-section">
            <p>👉 Try converting to little-endian:</p>
            <input
              type="text"
              value={endianInput}
              onChange={(e) => setEndianInput(e.target.value.toUpperCase())}
              placeholder="Type an even number of digits"
            />
            {endianInput && (
              <div className="conversion-display">
                <span className="normal-display">Normal: {endianInput}</span>
                <span className="equals">→</span>
                <span className="endian-display">Little-endian: {normalToLittleEndian(endianInput)}</span>
              </div>
            )}
            
            <div className="quick-examples">
              <p>Try these:</p>
              <button onClick={() => setEndianInput('1234')}>1234</button>
              <button onClick={() => setEndianInput('ABCD')}>ABCD</button>
              <button onClick={() => setEndianInput('2710')}>2710</button>
            </div>
          </div>
          
          <button 
            className="substep-continue"
            onClick={() => {
              markSubStepComplete(3);
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