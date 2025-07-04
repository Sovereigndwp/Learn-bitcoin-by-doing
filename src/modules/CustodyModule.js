import React, { useState, useEffect } from 'react';
import { useProgress } from '../contexts/ProgressContext';
import { Crown, Shield, Key, Users, AlertTriangle, CheckCircle, Trophy, Clock, Target, Zap, ArrowRight, Lock, Unlock, Timer, RefreshCw } from 'lucide-react';
import './CustodyModule.css';

const CustodyModule = () => {
  const { completeModule, isModuleCompleted } = useProgress();
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(new Set());
  const [selectedCustodyModel, setSelectedCustodyModel] = useState('single');
  
  // Adventure scenario state
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [showOutcome, setShowOutcome] = useState(false);
  
  // Stress test state
  const [currentTest, setCurrentTest] = useState(0);
  const [stressResults, setStressResults] = useState({});
  
  // Backup builder state
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [backupAnswers, setBackupAnswers] = useState([]);
  const [backupRecommendation, setBackupRecommendation] = useState(null);
  
  // Legacy simulator state
  const [isSimPlaying, setIsSimPlaying] = useState(false);
  const [simCurrentYear, setSimCurrentYear] = useState(0);

  const handleStepComplete = (stepIndex) => {
    const newCompleted = new Set(completedSteps);
    newCompleted.add(stepIndex);
    setCompletedSteps(newCompleted);
    
    // Show achievements for key milestones
    if (stepIndex === 1) {
      showAchievement("Custody Explorer", "You understand the tradeoffs between different custody models!");
    } else if (stepIndex === 3) {
      showAchievement("Security Tester", "You've stress-tested your custody setup like a pro!");
    } else if (stepIndex === 5) {
      showAchievement("Legacy Planner", "You've thought 20 years ahead - true sovereignty!");
    } else if (stepIndex === 7) {
      showAchievement("Custody Master", "You now know how to secure your Bitcoin kingdom!");
    }
    
    // Auto-advance to next step
    if (stepIndex < steps.length - 1) {
      setTimeout(() => {
        setCurrentStep(stepIndex + 1);
      }, 500);
    }
    
    if (newCompleted.size === steps.length) {
      completeModule('custody');
    }
  };

  const showAchievement = (title, description) => {
    // Achievement animation logic
    const achievement = document.createElement('div');
    achievement.className = 'achievement-popup';
    achievement.innerHTML = `
      <div class="achievement-content">
        <div class="achievement-icon">🏆</div>
        <div class="achievement-text">
          <h4>${title}</h4>
          <p>${description}</p>
        </div>
      </div>
    `;
    document.body.appendChild(achievement);
    
    setTimeout(() => {
      achievement.style.opacity = '0';
      setTimeout(() => {
        document.body.removeChild(achievement);
      }, 300);
    }, 3000);
  };

  const steps = [
    {
      title: "Welcome to Your Kingdom",
      type: "intro",
      content: {
        title: "👑 Who Holds the Keys to Your Kingdom?",
        subtitle: "Master the art of not losing Bitcoin",
        primeText: "Every day, people lose access to millions of dollars worth of Bitcoin. Not from hacks or theft, but from poor custody decisions. You're about to learn why 'not your keys, not your coins' is the most important phrase in Bitcoin.",
        keyPoints: [
          "🏰 Your Bitcoin is your digital kingdom",
          "🗝️ Private keys are the only proof of ownership",
          "⚔️ Exchanges can vanish, governments can seize, but math is eternal",
          "👑 True sovereignty requires understanding custody tradeoffs"
        ]
      }
    },
    
    {
      title: "Custody Models: The Great Tradeoff",
      type: "interactive-slider",
      content: {
        title: "🎚️ Where Do You Put Your Trust?",
        subtitle: "Slide between custody models and see the tradeoffs in real-time",
        primeText: "There's no perfect custody solution—only tradeoffs. The key is understanding them and choosing what fits your situation.",
        models: [
          {
            id: 'exchange',
            icon: '🏦',
            title: 'Exchange Custody',
            description: 'Let Coinbase hold it',
            security: 20,
            convenience: 95,
            sovereignty: 5,
            explanation: 'Fast and easy, but you own an IOU, not Bitcoin. Exchanges can freeze accounts, get hacked, or disappear.',
            risks: ['Account freezing', 'Exchange bankruptcy', 'Regulatory seizure', 'Hacking'],
            benefits: ['Super convenient', 'Easy recovery', 'Quick trading']
          },
          {
            id: 'single',
            icon: '🔑',
            title: 'Single Key Custody',
            description: 'You hold it. All of it.',
            security: 60,
            convenience: 40,
            sovereignty: 95,
            explanation: 'Ultimate control and privacy, but total responsibility. Lose your key, lose your coins.',
            risks: ['Single point of failure', 'No recovery if lost', 'Inheritance complexity'],
            benefits: ['Complete control', 'Maximum privacy', 'True ownership']
          },
          {
            id: 'collaborative',
            icon: '🤝',
            title: 'Collaborative Custody',
            description: 'Share responsibility without giving up control',
            security: 85,
            convenience: 70,
            sovereignty: 80,
            explanation: 'Multisig with trusted parties. Harder to lose, harder to seize, easier to inherit.',
            risks: ['Coordination needed', 'More complex setup', 'Trust required'],
            benefits: ['Fault tolerant', 'Inheritance ready', 'Seizure resistant']
          }
        ]
      }
    },

    {
      title: "The Family Emergency",
      type: "choose-adventure",
      content: {
        title: "👨‍👩‍👧‍👦 Choose Your Adventure: Family Bitcoin",
        subtitle: "Your daughter needs to access the family Bitcoin after you pass away...",
        scenario: {
          character: '👨‍💼',
          situation: "You're 45, have 2.5 Bitcoin, and want to ensure your daughter can access it if something happens to you. But you don't want your ex-wife or the government to get it.",
          choices: [
            {
              id: 'exchange-will',
              icon: '📝',
              title: 'Leave exchange login in will',
              description: 'Simple - just write down your Coinbase credentials',
              outcome: {
                result: 'disaster',
                icon: '💥',
                title: 'Disaster!',
                description: 'The exchange froze the account due to inheritance complications. Your ex-wife contested the will. Legal fees ate most of the Bitcoin value. Your daughter got nothing.',
                lesson: 'Exchanges complicate inheritance and create single points of failure.'
              }
            },
            {
              id: 'single-seed',
              icon: '🗝️',
              title: 'Give daughter the seed phrase',
              description: 'Teach her about self-custody and give her the recovery words',
              outcome: {
                result: 'risky',
                icon: '⚠️',
                title: 'Risky Success',
                description: 'She got the Bitcoin, but she lost half of it in a boating accident because she panicked and tried to move it all at once. Single points of failure are dangerous.',
                lesson: 'Single key custody puts enormous pressure on one person.'
              }
            },
            {
              id: 'multisig-family',
              icon: '👥',
              title: 'Set up 2-of-3 multisig',
              description: 'You, your daughter, and a trusted family friend each hold a key',
              outcome: {
                result: 'success',
                icon: '🎉',
                title: 'Perfect!',
                description: 'Your daughter and the family friend worked together to access the Bitcoin safely. The inheritance was smooth, private, and secure. Your ex-wife had no claim.',
                lesson: 'Collaborative custody provides security, recoverability, and inheritance planning.'
              }
            }
          ]
        }
      }
    },

    {
      title: "Security Stress Test",
      type: "stress-test",
      content: {
        title: "⚡ How Secure is Your Setup?",
        subtitle: "Test your custody model against real-world attacks",
        primeText: "Security isn't theoretical. Let's see how your custody choice handles actual threats that Bitcoin holders face every day.",
        scenarios: [
          {
            id: 'wrench-attack',
            icon: '🔧',
            title: '$5 Wrench Attack',
            description: 'Someone threatens you physically to hand over your Bitcoin',
            tests: {
              exchange: { passed: false, reason: 'They force you to log in and send everything' },
              single: { passed: false, reason: 'You have to give them everything immediately' },
              collaborative: { passed: true, reason: 'You can honestly say you need others to move large amounts' }
            }
          },
          {
            id: 'house-fire',
            icon: '🔥',
            title: 'House Fire',
            description: 'Your home burns down with all your backups inside',
            tests: {
              exchange: { passed: true, reason: 'Account still accessible from anywhere' },
              single: { passed: false, reason: 'If backup was at home, Bitcoin is gone forever' },
              collaborative: { passed: true, reason: 'Other keyholders have their backups elsewhere' }
            }
          },
          {
            id: 'government-seizure',
            icon: '🏛️',
            title: 'Government Seizure',
            description: 'Authorities demand access to your Bitcoin',
            tests: {
              exchange: { passed: false, reason: 'They contact exchange directly, account frozen' },
              single: { passed: true, reason: 'Need physical access to your private keys' },
              collaborative: { passed: true, reason: 'Cannot seize without cooperation from multiple parties' }
            }
          },
          {
            id: 'inheritance',
            icon: '⚰️',
            title: 'Sudden Death',
            description: 'You die unexpectedly - can your family access the Bitcoin?',
            tests: {
              exchange: { passed: false, reason: 'Complex legal process, possible account freeze' },
              single: { passed: false, reason: 'Without backup plan, Bitcoin likely lost forever' },
              collaborative: { passed: true, reason: 'Family members can access with inheritance plan' }
            }
          }
        ]
      }
    },

    {
      title: "Backup Strategy Builder",
      type: "backup-builder",
      content: {
        title: "🛡️ Build Your Backup Strategy",
        subtitle: "Answer 5 questions to get a personalized backup plan",
        primeText: "Your backup strategy should match your lifestyle, technical ability, and security needs. Let's build one that actually works for you.",
        questions: [
          {
            id: 'travel',
            question: 'Do you travel frequently?',
            options: [
              { id: 'never', text: 'Rarely - I mostly stay home', weight: { geographic: 1 } },
              { id: 'sometimes', text: 'Few times per year', weight: { geographic: 2 } },
              { id: 'often', text: 'Monthly or more', weight: { geographic: 3 } }
            ]
          },
          {
            id: 'technical',
            question: 'How technical are you?',
            options: [
              { id: 'basic', text: 'I can use apps but avoid complex tech', weight: { complexity: 1 } },
              { id: 'intermediate', text: 'Comfortable with most technology', weight: { complexity: 2 } },
              { id: 'advanced', text: 'I write code or manage IT systems', weight: { complexity: 3 } }
            ]
    },
    {
      id: 'family',
            question: 'Do you have family who should inherit your Bitcoin?',
      options: [
              { id: 'none', text: 'No close family', weight: { inheritance: 1 } },
              { id: 'some', text: 'Yes, but they\'re not tech-savvy', weight: { inheritance: 2 } },
              { id: 'tech-family', text: 'Yes, and they understand Bitcoin', weight: { inheritance: 3 } }
            ]
          },
          {
            id: 'amount',
            question: 'How much Bitcoin are you securing?',
            options: [
              { id: 'small', text: 'Less than $10,000', weight: { value: 1 } },
              { id: 'medium', text: '$10,000 - $100,000', weight: { value: 2 } },
              { id: 'large', text: 'More than $100,000', weight: { value: 3 } }
            ]
          },
          {
            id: 'trust',
            question: 'Do you have people you trust completely?',
            options: [
              { id: 'nobody', text: 'I prefer to handle everything myself', weight: { trust: 1 } },
              { id: 'one-person', text: 'One or two people', weight: { trust: 2 } },
              { id: 'several', text: 'Several trusted family/friends', weight: { trust: 3 } }
            ]
          }
        ]
      }
    },

    {
      title: "Legacy Planning Simulator",
      type: "legacy-simulator",
      content: {
        title: "⏰ 20-Year Time Machine",
        subtitle: "See how different custody models perform over time",
        primeText: "Bitcoin is designed to last generations. Your custody setup should be too. Let's fast-forward and see what happens to different approaches over 20 years.",
        events: [
          { year: 2024, title: 'Today', description: 'You set up your custody model' },
          { year: 2026, title: 'Marriage/Divorce', description: 'Major life change affects access' },
          { year: 2028, title: 'New Regulations', description: 'Government changes Bitcoin rules' },
          { year: 2030, title: 'Exchange Hack', description: 'Major custody provider compromised' },
          { year: 2032, title: 'Technology Shift', description: 'Quantum computers threaten old crypto' },
          { year: 2035, title: 'Family Growth', description: 'Children need access to inheritance' },
          { year: 2038, title: 'Health Issues', description: 'You become unable to manage keys' },
          { year: 2040, title: 'Global Crisis', description: 'Economic collapse, currency controls' },
          { year: 2042, title: 'Next Generation', description: 'Grandchildren inherit Bitcoin' },
          { year: 2044, title: 'Final Test', description: 'Ultimate resilience test' }
        ]
      }
    },

    {
      title: "Real-World Action Plan",
      type: "action-plan",
      content: {
        title: "🎯 Your Next Steps",
        subtitle: "Turn knowledge into action with concrete steps",
        primeText: "Understanding custody is just the beginning. Here's how to actually implement what you've learned, starting today.",
        plans: {
          beginner: {
            title: "🌱 Getting Started (Under $1,000)",
            steps: [
              "Start with a reputable mobile wallet like BlueWallet or Muun",
              "Practice sending small amounts between wallets",
              "Buy a hardware wallet when you reach $500+",
              "Write down seed phrase and store in safe place",
              "Test recovery process with small amount"
            ]
          },
          intermediate: {
            title: "🏗️ Building Security ($1,000 - $50,000)",
            steps: [
              "Set up hardware wallet with proper backup",
              "Consider 2-of-3 multisig with family member",
              "Create inheritance plan with clear instructions",
              "Store backups in multiple geographic locations",
              "Test full recovery process annually"
            ]
          },
          advanced: {
            title: "🏰 Maximum Security ($50,000+)",
            steps: [
              "Implement 2-of-3 or 3-of-5 multisig setup",
              "Use hardware security modules for key storage",
              "Create detailed inheritance documentation",
              "Consider professional custody consultation",
              "Regular security audits and practice scenarios"
            ]
          }
        }
      }
    },

    {
      title: "Custody Mastery Achievement",
      type: "completion",
      content: {
        title: "👑 Congratulations, Custody Master!",
        subtitle: "You now understand how to secure your Bitcoin kingdom",
        primeText: "Most people never think beyond 'password security.' You now understand the nuanced art of sovereign Bitcoin custody. Your future self will thank you.",
        achievements: [
          { icon: '🎚️', title: 'Custody Slider', description: 'Understood all custody model tradeoffs' },
          { icon: '👨‍👩‍👧‍👦', title: 'Family Planner', description: 'Navigated complex inheritance scenarios' },
          { icon: '⚡', title: 'Security Tester', description: 'Stress-tested custody against real threats' },
          { icon: '🛡️', title: 'Backup Builder', description: 'Created personalized backup strategy' },
          { icon: '⏰', title: 'Legacy Visionary', description: 'Planned for 20+ year time horizons' },
          { icon: '🎯', title: 'Action Oriented', description: 'Ready to implement real-world solutions' },
          { icon: '👑', title: 'Custody Master', description: 'Complete understanding of Bitcoin security' }
        ],
        nextSteps: [
          "Implement your chosen custody model with small amounts first",
          "Document everything clearly for inheritance planning", 
          "Practice recovery scenarios regularly",
          "Stay updated on custody best practices and new tools"
        ]
      }
    }
  ];

  // Interactive component renders
  const renderCustodySlider = (content) => {
    const selectedModel = content.models.find(m => m.id === selectedCustodyModel);
    
    return (
      <div className="custody-slider-container">
        <div className="slider-header">
          <h2>{content.title}</h2>
          <p>{content.subtitle}</p>
          <div className="prime-text">{content.primeText}</div>
        </div>

        <div className="slider-track">
          {content.models.map((model) => (
            <div
              key={model.id}
              className={`slider-option ${selectedCustodyModel === model.id ? 'active' : ''}`}
              onClick={() => setSelectedCustodyModel(model.id)}
            >
              {model.icon}
            </div>
          ))}
        </div>

        {selectedModel && (
          <div className="tradeoff-display">
            <div className="tradeoff-card">
              <h3>{selectedModel.title}</h3>
              <p>{selectedModel.explanation}</p>
              
              <div className="tradeoff-metric">
                <span>Security</span>
                <div className="metric-bar">
                  <div 
                    className="metric-fill security" 
                    style={{ width: `${selectedModel.security}%` }}
                  />
                </div>
                <span>{selectedModel.security}%</span>
              </div>

              <div className="tradeoff-metric">
                <span>Convenience</span>
                <div className="metric-bar">
                  <div 
                    className="metric-fill convenience" 
                    style={{ width: `${selectedModel.convenience}%` }}
                  />
                </div>
                <span>{selectedModel.convenience}%</span>
              </div>

              <div className="tradeoff-metric">
                <span>Sovereignty</span>
                <div className="metric-bar">
                  <div 
                    className="metric-fill security" 
                    style={{ width: `${selectedModel.sovereignty}%` }}
                  />
                </div>
                <span>{selectedModel.sovereignty}%</span>
              </div>

              <div style={{ marginTop: '1.5rem' }}>
                <h4 style={{ color: '#ef4444', marginBottom: '0.5rem' }}>⚠️ Risks:</h4>
                <ul style={{ color: '#cbd5e1', fontSize: '0.9rem' }}>
                  {selectedModel.risks.map((risk, i) => (
                    <li key={i}>{risk}</li>
                  ))}
                </ul>
              </div>

              <div style={{ marginTop: '1rem' }}>
                <h4 style={{ color: '#22c55e', marginBottom: '0.5rem' }}>✅ Benefits:</h4>
                <ul style={{ color: '#cbd5e1', fontSize: '0.9rem' }}>
                  {selectedModel.benefits.map((benefit, i) => (
                    <li key={i}>{benefit}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        <button 
          className="continue-button"
          onClick={() => handleStepComplete(currentStep)}
        >
          Continue <ArrowRight size={16} />
        </button>
      </div>
    );
  };

  const renderChooseAdventure = (content) => {
    const handleChoiceSelect = (choice) => {
      setSelectedChoice(choice);
      setShowOutcome(true);
  };

  return (
      <div className="adventure-container">
        <div className="scenario-intro">
          <div className="scenario-character">{content.scenario.character}</div>
          <h2>{content.title}</h2>
          <p>{content.subtitle}</p>
          <div className="prime-text">{content.scenario.situation}</div>
        </div>

        {!showOutcome && (
          <div className="scenario-choices">
            {content.scenario.choices.map((choice) => (
              <div
                key={choice.id}
                className="choice-option"
                onClick={() => handleChoiceSelect(choice)}
              >
                <div className="choice-icon">{choice.icon}</div>
                <div className="choice-content">
                  <div className="choice-title">{choice.title}</div>
                  <div className="choice-description">{choice.description}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {showOutcome && selectedChoice && (
          <div className="scenario-outcome">
            <div className="outcome-icon">{selectedChoice.outcome.icon}</div>
            <h3>{selectedChoice.outcome.title}</h3>
            <p>{selectedChoice.outcome.description}</p>
            <div style={{ 
              background: 'rgba(251, 191, 36, 0.1)', 
              border: '1px solid #fbbf24',
              borderRadius: '8px',
              padding: '1rem',
              marginTop: '1rem'
            }}>
              <strong>💡 Lesson:</strong> {selectedChoice.outcome.lesson}
      </div>
      
            <button 
              className="continue-button"
              onClick={() => handleStepComplete(currentStep)}
              style={{ marginTop: '1.5rem' }}
            >
              Continue <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>
    );
  };

  const renderStressTest = (content) => {
    const runTest = (scenarioId) => {
      const scenario = content.scenarios[currentTest];
      const testResult = scenario.tests[selectedCustodyModel];
      
      setStressResults(prev => ({
        ...prev,
        [scenarioId]: testResult
      }));

      if (currentTest < content.scenarios.length - 1) {
        setCurrentTest(currentTest + 1);
      }
    };

    const scenario = content.scenarios[currentTest];
    const isTestComplete = Object.keys(stressResults).length === content.scenarios.length;
    const passedTests = Object.values(stressResults).filter(r => r?.passed).length;
    const score = isTestComplete ? Math.round((passedTests / content.scenarios.length) * 100) : 0;

    return (
      <div className="stress-test-container">
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2>{content.title}</h2>
          <p>{content.subtitle}</p>
          <div className="prime-text">{content.primeText}</div>
          <p style={{ color: '#fbbf24', fontWeight: 'bold' }}>
            Testing: {selectedCustodyModel.charAt(0).toUpperCase() + selectedCustodyModel.slice(1)} Custody
          </p>
        </div>

        {!isTestComplete && scenario && (
          <div className="test-scenario">
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <span style={{ fontSize: '2rem' }}>{scenario.icon}</span>
              <div>
                <h3>{scenario.title}</h3>
                <p style={{ color: '#cbd5e1' }}>{scenario.description}</p>
              </div>
            </div>
            
            <button 
              className="continue-button"
              onClick={() => runTest(scenario.id)}
            >
              Run Test <Zap size={16} />
            </button>
                      </div>
        )}

        {Object.keys(stressResults).length > 0 && (
          <div style={{ marginTop: '2rem' }}>
            <h3>Test Results:</h3>
            {Object.entries(stressResults).map(([testId, result]) => {
              const testScenario = content.scenarios.find(s => s.id === testId);
              return (
                <div 
                  key={testId}
                  className={`test-scenario ${result.passed ? 'passed' : 'failed'}`}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span style={{ fontSize: '1.5rem' }}>{testScenario.icon}</span>
                    <div style={{ flex: 1 }}>
                      <h4>{testScenario.title}</h4>
                      <p style={{ color: result.passed ? '#22c55e' : '#ef4444' }}>
                        {result.passed ? '✅ PASSED' : '❌ FAILED'}: {result.reason}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {isTestComplete && (
          <div className="stress-score">
            <h3>Your Security Score</h3>
            <div 
              className="score-circle" 
              style={{ '--score': score }}
            >
              <div className="score-value">{score}%</div>
            </div>
            <p style={{ color: '#cbd5e1', marginBottom: '2rem' }}>
              {score >= 80 ? 'Excellent! Your custody model is highly resilient.' :
               score >= 60 ? 'Good! Some areas for improvement.' :
               'Concerning. Consider upgrading your custody approach.'}
            </p>
                  
                  <button 
              className="continue-button"
              onClick={() => handleStepComplete(currentStep)}
                  >
              Continue <ArrowRight size={16} />
                  </button>
                </div>
              )}
            </div>
    );
  };

  const renderBackupBuilder = (content) => {
    const handleAnswer = (optionId, weights) => {
      const newAnswers = [...backupAnswers, { questionId: content.questions[currentQuestion].id, answer: optionId, weights }];
      setBackupAnswers(newAnswers);

      if (currentQuestion < content.questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        // Calculate recommendation based on answers
        const totalWeights = newAnswers.reduce((acc, answer) => {
          Object.entries(answer.weights).forEach(([key, value]) => {
            acc[key] = (acc[key] || 0) + value;
          });
          return acc;
        }, {});

        // Generate recommendation based on weights
        let recommendedStrategy;
        if (totalWeights.trust >= 8 && totalWeights.value >= 2) {
          recommendedStrategy = {
            title: "👥 Collaborative Custody (2-of-3 Multisig)",
            description: "Perfect for your situation. Set up a 2-of-3 multisig with trusted family/friends.",
            steps: [
              "Choose 2 trusted people who understand Bitcoin basics",
              "Set up hardware wallets for all 3 participants", 
              "Create clear documentation for inheritance",
              "Store backup seeds in different geographic locations",
              "Practice recovery scenarios annually"
            ],
            whyPerfect: "You have people you trust, significant value to protect, and need inheritance planning."
          };
        } else if (totalWeights.complexity >= 6 && totalWeights.value >= 2) {
          recommendedStrategy = {
            title: "🔑 Advanced Single Key Setup",
            description: "You're technical enough for sophisticated single-key custody.",
            steps: [
              "Use hardware wallet with secure element",
              "Implement Shamir's Secret Sharing for seed backup",
              "Store backup pieces in bank safe deposit boxes",
              "Create detailed recovery instructions",
              "Consider timelock inheritance setup"
            ],
            whyPerfect: "Your technical skills allow for complex single-key setups with advanced backup strategies."
          };
        } else {
          recommendedStrategy = {
            title: "🛡️ Simple & Secure Setup",
            description: "A straightforward approach that balances security and simplicity.",
            steps: [
              "Start with reputable hardware wallet",
              "Write seed phrase on metal backup",
              "Store backup in bank safe deposit box",
              "Create simple inheritance instructions",
              "Gradually increase complexity as you learn"
            ],
            whyPerfect: "This approach matches your current technical level and provides solid security."
          };
        }

        setBackupRecommendation(recommendedStrategy);
      }
    };

    const question = content.questions[currentQuestion];

    return (
      <div className="backup-builder">
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2>{content.title}</h2>
          <p>{content.subtitle}</p>
          <div className="prime-text">{content.primeText}</div>
        </div>

        {!backupRecommendation && question && (
          <div className="question-card">
            <h3>Question {currentQuestion + 1} of {content.questions.length}</h3>
            <h4>{question.question}</h4>
            
            <div className="answer-options">
              {question.options.map((option) => (
                <div
                  key={option.id}
                  className="answer-option"
                  onClick={() => handleAnswer(option.id, option.weight)}
                >
                  <div style={{ fontSize: '1.2rem' }}>📋</div>
                  <span>{option.text}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {backupRecommendation && (
          <div className="recommendation-card">
            <h3>{backupRecommendation.title}</h3>
            <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem' }}>{backupRecommendation.description}</p>
            
            <div style={{ marginBottom: '2rem' }}>
              <h4>🎯 Why this works for you:</h4>
              <p style={{ color: '#cbd5e1' }}>{backupRecommendation.whyPerfect}</p>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <h4>📋 Your Action Plan:</h4>
              <ol style={{ color: '#cbd5e1', paddingLeft: '1.5rem' }}>
                {backupRecommendation.steps.map((step, i) => (
                  <li key={i} style={{ marginBottom: '0.5rem' }}>{step}</li>
                ))}
              </ol>
            </div>

            <button 
              className="continue-button"
              onClick={() => handleStepComplete(currentStep)}
            >
              Perfect! Continue <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>
    );
  };

  const renderLegacySimulator = (content) => {
    const playSimulation = () => {
      setIsSimPlaying(true);
      let year = 0;
      const interval = setInterval(() => {
        setSimCurrentYear(year);
        year++;
        if (year >= content.events.length) {
          clearInterval(interval);
          setIsSimPlaying(false);
        }
      }, 800);
    };

    const getCustodyStatus = (eventIndex, custodyModel) => {
      const event = content.events[eventIndex];
      
      if (event.title === 'Exchange Hack' && custodyModel === 'exchange') {
        return { status: 'vulnerable', text: 'Funds at risk' };
      } else if (event.title === 'House Fire' && custodyModel === 'single') {
        return { status: 'vulnerable', text: 'Backup destroyed' };
      } else if (event.title === 'Government Seizure' && custodyModel === 'exchange') {
        return { status: 'vulnerable', text: 'Account frozen' };
      } else if (event.title === 'Family Growth' && custodyModel === 'collaborative') {
        return { status: 'secure', text: 'Smooth transfer' };
      } else {
        return { status: 'secure', text: 'Protected' };
      }
    };

    return (
      <div className="legacy-simulator">
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2>{content.title}</h2>
          <p>{content.subtitle}</p>
          <div className="prime-text">{content.primeText}</div>
        </div>

        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <button 
            className="continue-button"
            onClick={playSimulation}
            disabled={isSimPlaying}
          >
            {isSimPlaying ? <RefreshCw size={16} /> : <Timer size={16} />}
            {isSimPlaying ? 'Running Simulation...' : 'Start 20-Year Simulation'}
          </button>
        </div>

        <div className="timeline-container">
          <div className="timeline">
            {content.events.map((event, index) => {
              const status = getCustodyStatus(index, selectedCustodyModel);
              const isActive = index <= simCurrentYear;
              
              return (
                <div key={index} className="timeline-event" style={{ opacity: isActive ? 1 : 0.3 }}>
                  <div className="timeline-marker">
                    <span style={{ fontSize: '1rem' }}>{index === simCurrentYear ? '⚡' : '📅'}</span>
                  </div>
                  <div className="timeline-content">
                    <div className="timeline-year">{event.year}</div>
                    <h4>{event.title}</h4>
                    <p style={{ color: '#cbd5e1', marginBottom: '1rem' }}>{event.description}</p>
                    
                    {isActive && (
                      <div className={`custody-status ${status.status}`}>
                        {status.status === 'secure' ? '🛡️' : status.status === 'vulnerable' ? '⚠️' : '🔧'}
                        {status.text}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {simCurrentYear >= content.events.length - 1 && (
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <button 
              className="continue-button"
              onClick={() => handleStepComplete(currentStep)}
            >
              Continue to Action Plan <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>
    );
  };

  const renderStep = () => {
    const step = steps[currentStep];
    
    switch (step.type) {
      case 'intro':
        return (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <h1>{step.content.title}</h1>
            <h3 style={{ color: '#cbd5e1', marginBottom: '2rem' }}>{step.content.subtitle}</h3>
            <div className="prime-text">{step.content.primeText}</div>
            
            <div style={{ margin: '2rem 0' }}>
              {step.content.keyPoints.map((point, i) => (
                <div key={i} style={{ 
                  background: 'rgba(30, 41, 59, 0.6)',
                  border: '1px solid rgba(100, 116, 139, 0.3)',
                  borderRadius: '8px',
                  padding: '1rem',
                  margin: '1rem 0',
                  textAlign: 'left'
                }}>
                  {point}
                </div>
              ))}
            </div>

            <button 
              className="continue-button"
              onClick={() => handleStepComplete(currentStep)}
            >
              Begin Your Journey <Crown size={16} />
            </button>
          </div>
        );
        
      case 'interactive-slider':
        return renderCustodySlider(step.content);
        
      case 'choose-adventure':
        return renderChooseAdventure(step.content);
        
      case 'stress-test':
        return renderStressTest(step.content);
        
      case 'backup-builder':
        return renderBackupBuilder(step.content);
        
      case 'legacy-simulator':
        return renderLegacySimulator(step.content);
        
      case 'action-plan':
        return (
          <div style={{ padding: '2rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <h2>{step.content.title}</h2>
              <p>{step.content.subtitle}</p>
              <div className="prime-text">{step.content.primeText}</div>
            </div>

            <div style={{ display: 'grid', gap: '2rem', marginTop: '2rem' }}>
              {Object.entries(step.content.plans).map(([key, plan]) => (
                <div key={key} style={{
                  background: 'rgba(30, 41, 59, 0.6)',
                  border: '1px solid rgba(100, 116, 139, 0.3)',
                  borderRadius: '12px',
                  padding: '2rem'
                }}>
                  <h3 style={{ marginBottom: '1rem' }}>{plan.title}</h3>
                  <ol style={{ color: '#cbd5e1', paddingLeft: '1.5rem' }}>
                    {plan.steps.map((step, i) => (
                      <li key={i} style={{ marginBottom: '0.75rem' }}>{step}</li>
                    ))}
                  </ol>
                </div>
              ))}
            </div>

            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <button 
                className="continue-button"
                onClick={() => handleStepComplete(currentStep)}
              >
                Ready to Implement <Target size={16} />
              </button>
            </div>
          </div>
        );
        
      case 'completion':
        return (
          <div className="custody-completion">
            <div className="completion-crown">👑</div>
            <h1 className="completion-title">{step.content.title}</h1>
            <p style={{ fontSize: '1.2rem', color: '#cbd5e1', marginBottom: '1.5rem' }}>
              {step.content.subtitle}
            </p>
            <div className="prime-text">{step.content.primeText}</div>

            <div className="achievement-grid">
              {step.content.achievements.map((achievement, i) => (
                <div key={i} className="achievement-item">
                  <div className="achievement-icon">{achievement.icon}</div>
                  <div>
                    <div style={{ fontWeight: 'bold' }}>{achievement.title}</div>
                    <div style={{ fontSize: '0.9rem', color: '#cbd5e1' }}>
                      {achievement.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '2rem' }}>
              <h3>🚀 Your Next Actions:</h3>
              <ul style={{ color: '#cbd5e1', textAlign: 'left', maxWidth: '600px', margin: '1rem auto' }}>
                {step.content.nextSteps.map((step, i) => (
                  <li key={i} style={{ marginBottom: '0.5rem' }}>{step}</li>
                ))}
          </ul>
            </div>

            <button 
              className="continue-button"
              onClick={() => handleStepComplete(currentStep)}
              style={{ marginTop: '2rem' }}
            >
              Complete Module <Trophy size={16} />
            </button>
          </div>
        );
        
      default:
        return <div>Step type not implemented</div>;
    }
  };

  return (
    <div className="custody-module">
      <div className="custody-content">
        <div className="custody-header">
          <h1 className="custody-title">
            <Crown style={{ marginRight: '0.5rem' }} />
            Who Holds the Keys to Your Kingdom?
          </h1>
          <p className="custody-subtitle">Master the art of not losing Bitcoin</p>
        </div>

        <div className="step-navigation">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`step-nav-item ${
                index === currentStep ? 'active' : 
                completedSteps.has(index) ? 'completed' : ''
              }`}
              onClick={() => setCurrentStep(index)}
            >
              {completedSteps.has(index) ? <CheckCircle size={16} /> : 
               index === currentStep ? <Target size={16} /> : <Lock size={16} />}
              <span>{step.title}</span>
            </div>
          ))}
        </div>

        <div className="progress-indicator">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`progress-dot ${
                index === currentStep ? 'active' : 
                completedSteps.has(index) ? 'completed' : ''
              }`}
            />
          ))}
        </div>

        <div style={{ minHeight: '500px' }}>
          {renderStep()}
        </div>
      </div>
    </div>
  );
};

export default CustodyModule; 