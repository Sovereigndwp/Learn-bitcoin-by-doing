import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '../contexts/ProgressContext';
import { Calculator, CheckCircle, Trophy } from 'lucide-react';
import '../components/ModuleCommon.css';
import './NumbersModule.css';

const NumbersModule = () => {
  const { completeModule, isModuleCompleted } = useProgress();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(new Set());

  const steps = [
    {
      title: "The Pizza That Changed Everything 🍕",
      type: "pizza_story",
      content: {
        title: "May 22, 2010: Computer History in the Making",
        story: "You're a programmer named Laszlo. You're hungry and want pizza, but you have an idea that will change digital money forever...",
        scenarios: [
          {
            id: "traditional_payment",
            title: "🏦 The Traditional Way",
            description: "You grab your credit card and order online",
            process: [
              "Your card number travels through 6 different companies",
              "Each company checks, validates, and records",
              "Everything happens in private databases",
              "You trust the banks got it right"
            ],
            insight: "Traditional payments require trusting many middlemen"
          },
          {
            id: "bitcoin_experiment", 
            title: "⚡ Laszlo's Experiment",
            description: "You post: 'I'll pay 10,000 Bitcoin for two pizzas'",
            process: [
              "Your transaction goes to thousands of computers",
              "Everyone can see and verify the payment",
              "No banks or middlemen needed",
              "The payment becomes permanent history"
            ],
            insight: "Bitcoin payments are transparent and verifiable by anyone"
          },
          {
            id: "future_shock",
            title: "💰 The Plot Twist",
            description: "Those 10,000 Bitcoin become worth $600+ million",
            process: [
              "The pizza cost: $40 in 2010",
              "The Bitcoin value: $600+ million today",
              "Laszlo proved digital money could work",
              "The first real-world Bitcoin purchase"
            ],
            insight: "This 'expensive pizza' proved Bitcoin's real-world value"
          }
        ]
      }
    },
    {
      title: "Computer Languages",
      type: "computer_language",
      content: {
        title: "How Computers Actually Talk",
        challenge: "You want to send a secret message that computers can read, but humans can also understand. How do you write it?",
        languages: [
          {
            id: "binary",
            name: "Binary (Computer Native)",
            example: "Hello",
            encoded: "01001000 01100101 01101100 01101100 01101111",
            pros: ["Only language computers understand", "Impossible to misinterpret"],
            cons: ["Very long", "Hard for humans to read"],
            usage: "Computer processors work entirely in binary"
          },
          {
            id: "decimal", 
            name: "Decimal (Human Friendly)",
            example: "10,000",
            encoded: "10,000",
            pros: ["Easy for humans", "What we use daily"],
            cons: ["Not how computers think", "Can be ambiguous"],
            usage: "Bitcoin amounts shown to users"
          },
          {
            id: "hexadecimal",
            name: "Hexadecimal (Best of Both)",
            example: "Hello",
            encoded: "48656C6C6F",
            pros: ["Much shorter than binary", "Computers can easily convert", "Clear and precise"],
            cons: ["Uses letters A-F", "Need to learn the system"],
            usage: "Bitcoin addresses and transaction IDs"
          }
        ]
      }
    },
    {
      title: "Hex Discovery Lab",
      type: "hex_discovery",
      content: {
        title: "Crack the Hex Code",
        mission: "You're investigating Bitcoin transactions. Each has a hex address like '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa'. Can you decode what the letters mean?",
        discoveries: [
          {
            phase: "basic_digits",
            title: "🔢 The Number Part",
            question: "In hex, what do the regular numbers 0-9 mean?",
            revelation: "They mean exactly the same as in regular numbers! 0=0, 1=1, 2=2... 9=9",
            examples: ["5 in hex = 5 in decimal", "7 in hex = 7 in decimal"]
          },
          {
            phase: "letter_code", 
            title: "🔤 The Letter Mystery",
            question: "But what about A, B, C, D, E, F?",
            revelation: "They're just more numbers! A=10, B=11, C=12, D=13, E=14, F=15",
            examples: ["A in hex = 10 in decimal", "F in hex = 15 in decimal"]
          },
          {
            phase: "position_power",
            title: "🚀 The Position Secret", 
            question: "Why is hex '10' different from decimal '10'?",
            revelation: "Position matters! Each spot is worth 16 times more than the one to its right",
            examples: ["Hex '10' = (1×16) + (0×1) = 16 decimal", "Hex 'FF' = (15×16) + (15×1) = 255 decimal"]
          }
        ]
      }
    },
    {
      title: "Bitcoin's Backward Trick",
      type: "endian_discovery",
      content: {
        title: "Why Bitcoin Sometimes Reads Backwards",
        scenario: "You're examining a Bitcoin transaction and notice something strange...",
        mystery: "The same number appears differently in different parts of Bitcoin's code. Sometimes '1234' becomes '3412'. Why?",
        explanation: {
          title: "Little-Endian: Reading in Reverse",
          reason: "Computers sometimes read numbers backwards in pairs to work more efficiently",
          examples: [
            {
              normal: "12",
              flipped: "21", 
              process: "Two digits: just flip them"
            },
            {
              normal: "1234",
              flipped: "3412",
              process: "Four digits: flip each pair, then reverse the pairs"
            },
            {
              normal: "ABCDEF",
              flipped: "EFCDAB", 
              process: "Six digits: flip each pair (AB→BA, CD→DC, EF→FE), then reverse"
            }
          ]
        },
        insight: "This 'backward reading' helps computers process large numbers faster, which is crucial for Bitcoin's security calculations."
      }
    },
    {
      title: "Security Through Numbers",
      type: "security_demo",
      content: {
        title: "How Numbers Create Unbreakable Security",
        challenge: "You need to prove you own Bitcoin without revealing your private key. How do math and encoding make this possible?",
        demonstrations: [
          {
            type: "consistency",
            title: "🎯 Always the Same",
            input: "Hello Bitcoin",
            process: "Put through security algorithm",
            output: "9595c9bca95d8ef8...",
            rule: "Same input → Same output, every time"
          },
          {
            type: "sensitivity", 
            title: "🦋 Butterfly Effect",
            input: "Hello bitcoin", 
            process: "Just changed one letter case",
            output: "completely different hash...",
            rule: "Tiny change → Completely different output"
          },
          {
            type: "one_way",
            title: "🔒 One-Way Street", 
            input: "9595c9bca95d8ef8...",
            process: "Try to reverse the algorithm",
            output: "Impossible to get back to 'Hello Bitcoin'",
            rule: "Can't reverse the process, no matter how hard you try"
          }
        ]
      }
    },
    {
      title: "Your Bitcoin Insights",
      type: "reflection",
      content: {
        question: "What's your biggest insight about how Bitcoin uses numbers and encoding?",
        insights: [
          {
            id: "encoding_bridge",
            title: "🌉 Encoding as Universal Language",
            description: "Hex and binary let humans and computers communicate about the same information"
          },
          {
            id: "transparency_power",
            title: "👁️ Transparency Creates Trust", 
            description: "When everyone can verify the math, we don't need to trust authorities"
          },
          {
            id: "efficiency_matters",
            title: "⚡ Efficiency Enables Scale",
            description: "Clever encoding tricks (like little-endian) help Bitcoin handle millions of transactions"
          }
        ],
        nextSteps: [
          {
            id: "explore_hashing",
            title: "🔐 Explore Cryptographic Hashing",
            description: "Dive deeper into how Bitcoin uses mathematical functions for security"
          },
          {
            id: "learn_keys",
            title: "🗝️ Understand Keys and Addresses", 
            description: "Learn how your Bitcoin address is created from your private key"
          },
          {
            id: "study_transactions",
            title: "💸 Study Transaction Structure",
            description: "See exactly how Bitcoin transactions are encoded and verified"
          }
        ]
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
      case 'pizza_story':
        return (
          <PizzaStoryStep
            title={step.content.title}
            story={step.content.story}
            scenarios={step.content.scenarios}
            onComplete={() => handleStepComplete(index)}
          />
        );

      case 'computer_language':
        return (
          <ComputerLanguageStep
            title={step.content.title}
            challenge={step.content.challenge}
            languages={step.content.languages}
            onComplete={() => handleStepComplete(index)}
          />
        );

      case 'hex_discovery':
        return (
          <HexDiscoveryStep
            title={step.content.title}
            mission={step.content.mission}
            discoveries={step.content.discoveries}
            onComplete={() => handleStepComplete(index)}
          />
        );

      case 'endian_discovery':
        return (
          <EndianDiscoveryStep
            title={step.content.title}
            scenario={step.content.scenario}
            mystery={step.content.mystery}
            explanation={step.content.explanation}
            insight={step.content.insight}
            onComplete={() => handleStepComplete(index)}
          />
        );

      case 'security_demo':
        return (
          <SecurityDemoStep
            title={step.content.title}
            challenge={step.content.challenge}
            demonstrations={step.content.demonstrations}
            onComplete={() => handleStepComplete(index)}
          />
        );

      case 'reflection':
                  return (
            <ReflectionStep
              question={step.content.question}
              insights={step.content.insights}
              nextSteps={step.content.nextSteps}
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
const PizzaStoryStep = ({ title, story, scenarios, onComplete }) => {
  const [currentScenario, setCurrentScenario] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const handleScenarioComplete = (scenarioIndex) => {
    setSelectedOption(null);
    setShowResult(false);
    setCurrentScenario(scenarioIndex + 1);
  };

  const currentScenarioData = scenarios[currentScenario];

  return (
    <div className="pizza-story-step">
      <h2>{title}</h2>
      <p>{story}</p>

      <div className="scenario-progress">
        <div className="scenario-indicators">
          {scenarios.map((_, index) => (
            <div 
              key={index}
              className={`scenario-dot ${currentScenario === index ? 'active' : ''}`}
            />
          ))}
        </div>
        <p className="scenario-title">{currentScenarioData.title}</p>
      </div>

      <div className="scenario-content">
        <p>{currentScenarioData.description}</p>
        <ul>
          {currentScenarioData.process.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ul>
        <p className="insight-text">{currentScenarioData.insight}</p>
      </div>

      {currentScenario < scenarios.length - 1 && (
        <button 
          className="continue-button"
          onClick={() => handleScenarioComplete(currentScenario)}
        >
          Next Scenario →
        </button>
      )}
      {currentScenario === scenarios.length - 1 && (
        <button 
          className="continue-button"
          onClick={onComplete}
        >
          I understand the story! →
        </button>
      )}
    </div>
  );
};

const ComputerLanguageStep = ({ title, challenge, languages, onComplete }) => {
  const [currentLanguage, setCurrentLanguage] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const handleLanguageComplete = (languageIndex) => {
    setSelectedOption(null);
    setShowResult(false);
    setCurrentLanguage(languageIndex + 1);
  };

  const currentLanguageData = languages[currentLanguage];

  return (
    <div className="computer-language-step">
      <h2>{title}</h2>
      <p>{challenge}</p>

      <div className="language-progress">
        <div className="language-indicators">
          {languages.map((_, index) => (
            <div 
              key={index}
              className={`language-dot ${currentLanguage === index ? 'active' : ''}`}
            />
          ))}
        </div>
        <p className="language-title">{currentLanguageData.name}</p>
      </div>

      <div className="language-content">
        <p>Example: {currentLanguageData.example}</p>
        <p>Encoded: {currentLanguageData.encoded}</p>
        <p>Pros: {currentLanguageData.pros.join(', ')}</p>
        <p>Cons: {currentLanguageData.cons.join(', ')}</p>
        <p>Usage: {currentLanguageData.usage}</p>
      </div>

      {currentLanguage < languages.length - 1 && (
        <button 
          className="continue-button"
          onClick={() => handleLanguageComplete(currentLanguage)}
        >
          Next Language →
        </button>
      )}
      {currentLanguage === languages.length - 1 && (
        <button 
          className="continue-button"
          onClick={onComplete}
        >
          I understand the languages! →
        </button>
      )}
    </div>
  );
};

const HexDiscoveryStep = ({ title, mission, discoveries, onComplete }) => {
  const [currentDiscovery, setCurrentDiscovery] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const handleDiscoveryComplete = (discoveryIndex) => {
    setSelectedOption(null);
    setShowResult(false);
    setCurrentDiscovery(discoveryIndex + 1);
  };

  const currentDiscoveryData = discoveries[currentDiscovery];

  return (
    <div className="hex-discovery-step">
      <h2>{title}</h2>
      <p>{mission}</p>

      <div className="discovery-progress">
        <div className="discovery-indicators">
          {discoveries.map((_, index) => (
            <div 
              key={index}
              className={`discovery-dot ${currentDiscovery === index ? 'active' : ''}`}
            />
          ))}
        </div>
        <p className="discovery-title">{currentDiscoveryData.title}</p>
      </div>

      <div className="discovery-content">
        <p>{currentDiscoveryData.question}</p>
        <p>Revelation: {currentDiscoveryData.revelation}</p>
        <p>Examples:</p>
        <ul>
          {currentDiscoveryData.examples.map((example, index) => (
            <li key={index}>{example}</li>
          ))}
        </ul>
      </div>

      {currentDiscovery < discoveries.length - 1 && (
        <button 
          className="continue-button"
          onClick={() => handleDiscoveryComplete(currentDiscovery)}
        >
          Next Discovery →
        </button>
      )}
      {currentDiscovery === discoveries.length - 1 && (
        <button 
          className="continue-button"
          onClick={onComplete}
        >
          I understand hex! →
        </button>
      )}
    </div>
  );
};

const EndianDiscoveryStep = ({ title, scenario, mystery, explanation, insight, onComplete }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const handleComplete = () => {
    setSelectedOption(null);
    setShowResult(false);
    onComplete();
  };

  return (
    <div className="endian-discovery-step">
      <h2>{title}</h2>
      <p>{scenario}</p>
      <p>{mystery}</p>

      <div className="explanation-content">
        <p>{explanation.title}</p>
        <p>{explanation.reason}</p>
        <p>Examples:</p>
        <ul>
          {explanation.examples.map((example, index) => (
            <li key={index}>
              Normal: {example.normal}, Flipped: {example.flipped}, Process: {example.process}
            </li>
          ))}
        </ul>
        <p className="insight-text">{insight}</p>
      </div>

      <button 
        className="continue-button"
        onClick={handleComplete}
      >
        I understand the trick! →
      </button>
    </div>
  );
};

const SecurityDemoStep = ({ title, challenge, demonstrations, onComplete }) => {
  const [currentDemo, setCurrentDemo] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const handleDemoComplete = (demoIndex) => {
    setSelectedOption(null);
    setShowResult(false);
    setCurrentDemo(demoIndex + 1);
  };

  const currentDemoData = demonstrations[currentDemo];

  return (
    <div className="security-demo-step">
      <h2>{title}</h2>
      <p>{challenge}</p>

      <div className="demo-progress">
        <div className="demo-indicators">
          {demonstrations.map((_, index) => (
            <div 
              key={index}
              className={`demo-dot ${currentDemo === index ? 'active' : ''}`}
            />
          ))}
        </div>
        <p className="demo-title">{currentDemoData.title}</p>
      </div>

      <div className="demo-content">
        <p>Input: {currentDemoData.input}</p>
        <p>Process: {currentDemoData.process}</p>
        <p>Output: {currentDemoData.output}</p>
        <p>Rule: {currentDemoData.rule}</p>
      </div>

      {currentDemo < demonstrations.length - 1 && (
        <button 
          className="continue-button"
          onClick={() => handleDemoComplete(currentDemo)}
        >
          Next Demo →
        </button>
      )}
      {currentDemo === demonstrations.length - 1 && (
        <button 
          className="continue-button"
          onClick={onComplete}
        >
          I understand security! →
        </button>
      )}
    </div>
  );
};

const ReflectionStep = ({ question, insights, nextSteps, onComplete, setCurrentStep, isLastStep }) => {
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
              {insights && insights.length > 0 && (
                <>
                  <p className="prompt-header">✨ Consider these insights:</p>
                  {insights.map((insight, index) => (
                    <div key={index} className="insight-item">
                      <p>• {insight.title}: {insight.description}</p>
                    </div>
                  ))}
                </>
              )}
              {nextSteps && nextSteps.length > 0 && (
                <>
                  <p className="prompt-header">🚀 Next Steps:</p>
                  {nextSteps.map((step, index) => (
                    <div key={index} className="next-step-item">
                      <p>• {step.title}: {step.description}</p>
                    </div>
                  ))}
                </>
              )}
              <p className="optional-note">(This reflection is optional - feel free to skip if you prefer to continue learning!)</p>
            </div>
          </div>

          <div className="reflection-input">
            <textarea
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
              placeholder={`Share your thoughts about how Bitcoin uses numbers and encoding. What's your biggest insight? What questions do you have?`}
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