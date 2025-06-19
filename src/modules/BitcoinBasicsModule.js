import React, { useState } from 'react';
import { useProgress } from '../contexts/ProgressContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Bitcoin, Network, Lock, Coins, CheckCircle, Trophy, Wallet, Send } from 'lucide-react';
import '../components/ModuleCommon.css';

const BitcoinBasicsModule = () => {
  const { completeModule, isModuleCompleted } = useProgress();
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(new Set());

  const steps = [
    {
      title: "Introduction",
      type: "intro",
      content: {
        title: "Bitcoin: Digital Money Without Banks",
        text: "Welcome to Bitcoin Basics! 👋\n\nYou've learned about money's history and properties. Now let's see how Bitcoin works in practice.\n\nImagine sending an email:\n📧 You write a message\n📨 Click send\n📬 It arrives instantly anywhere in the world\n\nBitcoin does the same thing with money:\n💰 You specify an amount\n📲 Click send\n✨ Money moves instantly, anywhere\n\nBut wait... if it's that simple, why do we need all this technical stuff?\n\nBecause moving money has three big challenges email doesn't:\n1. How do we prevent copying? (You can't copy-paste money!)\n2. How do we track ownership? (Like a bank, but without the bank)\n3. How do we keep it secure? (No password resets in Bitcoin!)\n\nIn this module, you'll learn:\n- How to get your first bitcoin\n- How to send and receive payments\n- How to keep your bitcoin safe\n- What makes Bitcoin different from PayPal/Venmo\n\nNo complex math or coding required - just practical knowledge to start using Bitcoin! 🚀"
      }
    },
    {
      title: "Your First Bitcoin",
      type: "interactive-guide",
      content: {
        title: "Getting Started with Bitcoin",
        sections: [
          {
            title: "Choose Your Wallet",
            icon: Wallet,
            description: "A Bitcoin wallet is like an email app - it helps you send, receive, and manage your bitcoin.",
            options: [
              {
                name: "Mobile Wallet",
                recommended: true,
                description: "Perfect for beginners. Like having a spending wallet in your pocket.",
                examples: ["BlueWallet", "Muun", "Phoenix"]
              },
              {
                name: "Hardware Wallet",
                recommended: false,
                description: "For larger amounts. Like a super-secure savings account.",
                examples: ["Ledger", "Trezor", "ColdCard"]
              }
            ]
          },
          {
            title: "Buy Your First Bitcoin",
            icon: Coins,
            description: "You can start with any amount - even $20 worth of bitcoin!",
            methods: [
              {
                name: "Bitcoin Exchange",
                pros: ["Easy to use", "Many payment options"],
                cons: ["Requires ID verification", "Not private"],
                examples: ["Strike", "Cash App", "Coinbase"]
              },
              {
                name: "Bitcoin ATM",
                pros: ["More private", "Instant bitcoin"],
                cons: ["Higher fees", "Limited locations"],
                examples: ["Find ATMs at Coinatmradar.com"]
              },
              {
                name: "Peer-to-Peer",
                pros: ["Most private", "No corporate involvement"],
                cons: ["Takes more effort", "Be careful with strangers"],
                examples: ["Bisq", "HodlHodl", "Local meetups"]
              }
            ]
          }
        ]
      }
    },
    {
      title: "Sending & Receiving",
      type: "interactive-demo",
      content: {
        title: "Making Your First Transaction",
        description: "Let's practice sending and receiving bitcoin!",
        exercises: [
          {
            title: "Receiving Bitcoin",
            steps: [
              "Open your wallet app",
              "Click 'Receive' or 'Get Bitcoin'",
              "You'll see your Bitcoin address",
              "Share this address with the sender"
            ],
            tips: [
              "Each address looks like: bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
              "You can create new addresses anytime - it's good privacy!",
              "Never reuse addresses if possible"
            ]
          },
          {
            title: "Sending Bitcoin",
            steps: [
              "Click 'Send' or 'Pay'",
              "Enter/scan the recipient's address",
              "Enter the amount (in bitcoin or your local currency)",
              "Choose your fee (based on how fast you need it)",
              "Double-check everything!",
              "Confirm and send"
            ],
            tips: [
              "Triple-check the address - transactions can't be reversed!",
              "Start with small test amounts",
              "Higher fees = faster confirmation"
            ]
          }
        ]
      }
    },
    {
      title: "Security Essentials",
      type: "interactive-checklist",
      content: {
        title: "Keeping Your Bitcoin Safe",
        description: "Unlike a bank account, you are fully responsible for your bitcoin's security. Let's learn the essentials!",
        checklist: [
          {
            title: "Backup Your Seed Phrase",
            description: "Your seed phrase is like the master key to your bitcoin. Usually 12 or 24 words.",
            tasks: [
              "Write it down on paper (never digital!)",
              "Make multiple copies",
              "Store copies in different safe places",
              "Never share it with anyone"
            ]
          },
          {
            title: "Protect Your Wallet",
            description: "Your wallet is like your email app - keep it secure!",
            tasks: [
              "Use a strong PIN/password",
              "Enable biometric security if available",
              "Keep your wallet app updated",
              "Only download from official sources"
            ]
          },
          {
            title: "Safe Practices",
            description: "Good habits keep your bitcoin safe:",
            tasks: [
              "Start with small amounts",
              "Use new addresses for each transaction",
              "Double-check addresses before sending",
              "Don't tell others how much you own"
            ]
          }
        ]
      }
    },
    {
      title: "Bitcoin vs Traditional Money",
      type: "comparison",
      content: {
        title: "What Makes Bitcoin Different?",
        description: "Let's compare Bitcoin with other forms of digital money:",
        comparisons: [
          {
            aspect: "Control",
            traditional: {
              title: "Banks & Payment Apps",
              points: [
                "Can freeze your account",
                "Need permission to open account",
                "Can reverse transactions",
                "Track all your payments"
              ]
            },
            bitcoin: {
              title: "Bitcoin",
              points: [
                "Only you control your money",
                "Anyone can participate",
                "Transactions are permanent",
                "More privacy possible"
              ]
            }
          },
          {
            aspect: "Technical Differences",
            traditional: {
              title: "Traditional Banking",
              points: [
                "Centralized databases",
                "Bank hours & holidays",
                "Country-specific systems",
                "Can create unlimited money"
              ]
            },
            bitcoin: {
              title: "Bitcoin Network",
              points: [
                "Distributed ledger",
                "24/7/365 operation",
                "Global, borderless system",
                "Fixed supply (21M)"
              ]
            }
          },
          {
            aspect: "Practical Impact",
            traditional: {
              title: "Old Money",
              points: [
                "Need bank permission",
                "High fees for global transfers",
                "Days to settle transactions",
                "Can be censored/blocked"
              ]
            },
            bitcoin: {
              title: "New Money",
              points: [
                "Self-sovereign money",
                "Low fees globally",
                "Settles in ~10 minutes",
                "Censorship resistant"
              ]
            }
          }
        ]
      }
    }
  ];

  const handleStepComplete = (stepIndex) => {
    try {
      const newCompleted = new Set(completedSteps);
      newCompleted.add(stepIndex);
      setCompletedSteps(newCompleted);
      
      if (stepIndex < steps.length - 1) {
        setCurrentStep(stepIndex + 1);
      }
      
      if (newCompleted.size === steps.length) {
        completeModule('bitcoin-basics');
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
              <Bitcoin size={48} />
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

      case 'interactive-guide':
        return (
          <GuideSection
            title={step.content.title}
            sections={step.content.sections}
            onComplete={() => handleStepComplete(index)}
          />
        );

      case 'interactive-demo':
        return (
          <DemoSection
            title={step.content.title}
            description={step.content.description}
            exercises={step.content.exercises}
            onComplete={() => handleStepComplete(index)}
          />
        );

      case 'interactive-checklist':
        return (
          <ChecklistSection
            title={step.content.title}
            description={step.content.description}
            checklist={step.content.checklist}
            onComplete={() => handleStepComplete(index)}
          />
        );

      case 'comparison':
        return (
          <ComparisonSection
            title={step.content.title}
            description={step.content.description}
            comparisons={step.content.comparisons}
            onComplete={() => handleStepComplete(index)}
          />
        );

      default:
        console.error('Unknown step type:', step.type);
        return <div>Unknown step type</div>;
    }
  };

  return (
    <div className="module-container">
      <div className="module-header">
        <h1 className="module-title">
          <Bitcoin className="module-icon" />
          Bitcoin Basics: Your First Steps
        </h1>
        {isModuleCompleted('bitcoin-basics') && (
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

// Helper Components
const GuideSection = ({ title, sections, onComplete }) => {
  const [viewedSections, setViewedSections] = useState(new Set());

  const handleSectionView = (index) => {
    const newViewed = new Set(viewedSections).add(index);
    setViewedSections(newViewed);
    
    if (newViewed.size === sections.length) {
      onComplete();
    }
  };

  return (
    <div className="guide-section">
      <h2>{title}</h2>
      <div className="sections-grid">
        {sections.map((section, index) => {
          const IconComponent = section.icon;
          return (
            <div 
              key={index}
              className={`section-card ${viewedSections.has(index) ? 'viewed' : ''}`}
              onClick={() => handleSectionView(index)}
            >
              <div className="section-header">
                <IconComponent size={24} />
                <h3>{section.title}</h3>
              </div>
              <p>{section.description}</p>
              {section.options && (
                <div className="options-list">
                  {section.options.map((option, i) => (
                    <div key={i} className={`option ${option.recommended ? 'recommended' : ''}`}>
                      <h4>{option.name}</h4>
                      <p>{option.description}</p>
                      <div className="examples">
                        Examples: {option.examples.join(", ")}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {section.methods && (
                <div className="methods-list">
                  {section.methods.map((method, i) => (
                    <div key={i} className="method">
                      <h4>{method.name}</h4>
                      <div className="pros-cons">
                        <div className="pros">
                          <h5>Pros:</h5>
                          <ul>
                            {method.pros.map((pro, j) => (
                              <li key={j}>{pro}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="cons">
                          <h5>Cons:</h5>
                          <ul>
                            {method.cons.map((con, j) => (
                              <li key={j}>{con}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="examples">
                        Examples: {method.examples}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const DemoSection = ({ title, description, exercises, onComplete }) => {
  const [completedExercises, setCompletedExercises] = useState(new Set());

  const handleExerciseComplete = (index) => {
    const newCompleted = new Set(completedExercises).add(index);
    setCompletedExercises(newCompleted);
    
    if (newCompleted.size === exercises.length) {
      onComplete();
    }
  };

  return (
    <div className="demo-section">
      <h2>{title}</h2>
      <p className="description">{description}</p>
      <div className="exercises-container">
        {exercises.map((exercise, index) => (
          <div 
            key={index}
            className={`exercise-card ${completedExercises.has(index) ? 'completed' : ''}`}
          >
            <h3>{exercise.title}</h3>
            <div className="steps-list">
              {exercise.steps.map((step, i) => (
                <div key={i} className="step-item">
                  <span className="step-number">{i + 1}</span>
                  <span className="step-text">{step}</span>
                </div>
              ))}
            </div>
            <div className="tips-section">
              <h4>💡 Tips:</h4>
              <ul>
                {exercise.tips.map((tip, i) => (
                  <li key={i}>{tip}</li>
                ))}
              </ul>
            </div>
            <button 
              className="complete-button"
              onClick={() => handleExerciseComplete(index)}
            >
              Mark as Complete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const ChecklistSection = ({ title, description, checklist, onComplete }) => {
  const [completedItems, setCompletedItems] = useState(new Set());

  const handleItemComplete = (sectionIndex, taskIndex) => {
    const itemKey = `${sectionIndex}-${taskIndex}`;
    const newCompleted = new Set(completedItems).add(itemKey);
    setCompletedItems(newCompleted);
    
    const totalTasks = checklist.reduce((sum, section) => sum + section.tasks.length, 0);
    if (newCompleted.size === totalTasks) {
      onComplete();
    }
  };

  return (
    <div className="checklist-section">
      <h2>{title}</h2>
      <p className="description">{description}</p>
      <div className="checklist-container">
        {checklist.map((section, sectionIndex) => (
          <div key={sectionIndex} className="checklist-card">
            <h3>{section.title}</h3>
            <p>{section.description}</p>
            <div className="tasks-list">
              {section.tasks.map((task, taskIndex) => {
                const itemKey = `${sectionIndex}-${taskIndex}`;
                return (
                  <div 
                    key={taskIndex}
                    className={`task-item ${completedItems.has(itemKey) ? 'completed' : ''}`}
                    onClick={() => handleItemComplete(sectionIndex, taskIndex)}
                  >
                    <CheckCircle size={20} />
                    <span>{task}</span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ComparisonSection = ({ title, description, comparisons, onComplete }) => {
  const [viewedComparisons, setViewedComparisons] = useState(new Set());

  const handleComparisonView = (index) => {
    const newViewed = new Set(viewedComparisons).add(index);
    setViewedComparisons(newViewed);
    
    if (newViewed.size === comparisons.length) {
      onComplete();
    }
  };

  return (
    <div className="comparison-section">
      <h2>{title}</h2>
      <p className="description">{description}</p>
      <div className="comparisons-container">
        {comparisons.map((comparison, index) => (
          <div 
            key={index}
            className={`comparison-card ${viewedComparisons.has(index) ? 'viewed' : ''}`}
            onClick={() => handleComparisonView(index)}
          >
            <h3>{comparison.aspect}</h3>
            <div className="comparison-grid">
              <div className="traditional-side">
                <h4>{comparison.traditional.title}</h4>
                <ul>
                  {comparison.traditional.points.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </div>
              <div className="bitcoin-side">
                <h4>{comparison.bitcoin.title}</h4>
                <ul>
                  {comparison.bitcoin.points.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BitcoinBasicsModule; 