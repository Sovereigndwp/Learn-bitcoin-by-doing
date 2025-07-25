import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useProgress } from '../contexts/ProgressContext';
import { useNotifications } from './NotificationSystem';
import { moduleRegistry, moduleGroups, getNextModule } from '../modules/ModuleRegistry';
import { Trophy, Target, Zap, Users, Clock, Brain, Award, Star, CheckCircle, Play, ArrowRight, Map, Lightbulb, Shield, RotateCcw } from 'lucide-react';
import './Homepage.css';

const Homepage = () => {
  const { getModuleProgress, isModuleCompleted, completeModule, resetProgress } = useProgress();
  const { showNotification } = useNotifications();
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const [selectedValueProposition, setSelectedValueProposition] = useState(null);
  const [showJourneyMap, setShowJourneyMap] = useState(false);
  const [userStats, setUserStats] = useState({
    totalModules: 0,
    completedModules: 0,
    totalProgress: 0,
    achievements: []
  });

  const moduleIcons = {
    money: '💰',
    'money-designer': '⚡',
    'bitcoin-basics': '₿',
    numbers: '🔢',
    hashing: '🔐',
    mining: '⛏️',
    keys: '🔑',
    transactions: '🔄',
    scripts: '📜',
    merkle: '🌳',
    custody: '🛡️',
    lightning: '⚡',
    'advanced-topics': '🚀',
    myths: '🎭',
    'bitcoin-toolkit': '🛠️'
  };

  // Holistic Journey Narrative
  const journeySteps = [
    {
      id: "wake_up",
      title: "🎭 The Illusion Breaks",
      question: "What if everything you believed about money was carefully designed to benefit someone else?",
      revelation: "You discover that money isn't neutral—it's a tool that shapes society, and currently, it's working against most people.",
      modules: [],
      insight: "The first step to freedom is recognizing the cage."
    },
    {
      id: "understand_money",
      title: "💰 Money's True Story", 
      question: "How did we go from trading real value to trusting promises from institutions?",
      revelation: "You trace money's evolution from gold to government promises, understanding each step that led to today's crisis.",
      modules: ['money'],
      insight: "Money is either a tool of freedom or a weapon of control—there's no middle ground."
    },
    {
      id: "discover_solution",
      title: "₿ The Bitcoin Breakthrough",
      question: "What would money look like if it was designed for people, not institutions?",
      revelation: "You explore Bitcoin's revolutionary approach: a system that works without requiring trust in any authority.",
      modules: ['bitcoin-basics'],
      insight: "For the first time in history, we have money that serves people, not power."
    },
    {
      id: "learn_language",
      title: "🔢 The Digital Language",
      question: "How do computers create things that can't be copied or counterfeited?",
      revelation: "You master the mathematical foundations that make digital scarcity possible.",
      modules: ['numbers', 'hashing'],
      insight: "Code becomes law when mathematics enforces the rules."
    },
    {
      id: "own_sovereignty", 
      title: "🔑 True Ownership",
      question: "What does it mean to truly own something in the digital age?",
      revelation: "You learn to control your own wealth without asking permission from anyone.",
      modules: ['keys'],
      insight: "Your keys, your Bitcoin. No keys, no Bitcoin. No exceptions."
    },
    {
      id: "master_system",
      title: "⚙️ The Machine Works",
      question: "How does a leaderless network coordinate the actions of millions?",
      revelation: "You understand the elegant mechanics that turn individual incentives into collective security.",
      modules: ['transactions', 'scripts', 'merkle', 'mining'],
      insight: "Incentives aligned with mathematics create unstoppable systems."
    },
    {
      id: "practical_mastery",
      title: "🚀 Real-World Application", 
      question: "How do you actually live in a Bitcoin world?",
      revelation: "You master the practical skills needed to thrive in the new financial system.",
      modules: ['custody', 'lightning', 'advanced-topics', 'bitcoin-toolkit', 'myths'],
      insight: "Knowledge without application is just expensive entertainment."
    }
  ];

  // Personal Value Propositions
  const valuePropositions = [
    {
      id: "financial_freedom",
      title: "🎯 Financial Freedom",
      problem: "You're tired of banks controlling your money",
      solution: "Learn to be your own bank",
      outcome: "Complete financial sovereignty and independence",
      timeframe: "~3 months of focused learning"
    },
    {
      id: "inflation_protection", 
      title: "🛡️ Inflation Defense",
      problem: "Your savings lose value every year",
      solution: "Understand sound money principles",
      outcome: "Protect and grow your wealth over time", 
      timeframe: "~6 weeks to master the basics"
    },
    {
      id: "technology_mastery",
      title: "🔧 Technical Mastery",
      problem: "You want to understand Bitcoin deeply",
      solution: "Master the technical foundations",
      outcome: "Become a Bitcoin expert and educator",
      timeframe: "~4 months for complete mastery"
    },
    {
      id: "investment_wisdom",
      title: "📈 Investment Intelligence", 
      problem: "You're confused by conflicting financial advice",
      solution: "Learn to think from first principles",
      outcome: "Make informed decisions about your future",
      timeframe: "~2 months to build conviction"
    }
  ];

  // Calculate user statistics
  useEffect(() => {
    const modules = Object.values(moduleRegistry);
    const completed = modules.filter(module => isModuleCompleted(module.id));
    const totalProgress = modules.reduce((sum, module) => sum + getModuleProgress(module.id), 0);
    
    const achievements = [];
    if (isModuleCompleted('banking-intro')) achievements.push('Journey Begins');
    if (isModuleCompleted('money')) achievements.push('Money Master');
    if (isModuleCompleted('bitcoin-basics')) achievements.push('Bitcoin Explorer');
    if (isModuleCompleted('hashing')) achievements.push('Cryptography Student');
    if (isModuleCompleted('keys')) achievements.push('Digital Sovereign');
    if (isModuleCompleted('transactions')) achievements.push('Transaction Expert');
    if (isModuleCompleted('merkle')) achievements.push('Tree Architect');
    if (isModuleCompleted('mining')) achievements.push('Energy Pioneer');
    if (completed.length >= 3) achievements.push('Learning Streak');
    if (completed.length >= 6) achievements.push('Dedicated Student');
    if (completed.length === modules.length) achievements.push('Bitcoin Scholar');

    setUserStats({
      totalModules: modules.length,
      completedModules: completed.length,
      totalProgress: Math.round(totalProgress / modules.length),
      achievements
    });
  }, [getModuleProgress, isModuleCompleted]);

  // Check if banking experience is completed
  const bankingExperienceCompleted = isModuleCompleted('banking-intro');
  
  // Progressive unlocking logic
  const isModuleUnlocked = (module) => {
    if (module.id === 'money') {
      return bankingExperienceCompleted;
    }
    
    if (module.prerequisites.length === 0) {
      return bankingExperienceCompleted;
    }
    
    return module.prerequisites.every(prereq => isModuleCompleted(prereq));
  };

  const handleExperienceComplete = () => {
    completeModule('banking-intro');
    showNotification({
      type: 'achievement',
      title: 'Journey Begins! 🎯',
      message: "You've taken your first step toward financial understanding!"
    });
  };

  const handleResetProgress = () => {
    resetProgress();
    setShowResetConfirm(false);
    showNotification({
      type: 'insight',
      title: 'Fresh Start 🔄',
      message: "Your learning journey has been reset. Ready to begin again!"
    });
  };

  const getCurrentJourneyStep = () => {
    for (let i = journeySteps.length - 1; i >= 0; i--) {
      const step = journeySteps[i];
      if (step.modules.length === 0) continue; // Skip intro step
      if (step.modules.every(moduleId => isModuleCompleted(moduleId))) {
        return i + 1; // Next step
      }
    }
    return bankingExperienceCompleted ? 1 : 0; // Start with money if ready
  };

  const currentStep = getCurrentJourneyStep();
  const activeJourneyStep = journeySteps[currentStep];



  return (
    <div className="homepage">
      <header className="homepage-header">
        <div className="logo">
          <span className="bitcoin-symbol">₿</span>
          <div className="logo-content">
            <h1>Money's Mess & Bitcoin's Fix</h1>
            <p className="tagline">A logical journey from broken money to digital sovereignty</p>
          </div>
        </div>
        <div className="nav-buttons">
          <Link to="/about" className="nav-button">
            <Users size={16} />
            <span>By Dalia</span>
          </Link>
          <button 
            onClick={() => setShowJourneyMap(!showJourneyMap)} 
            className="nav-button"
          >
            <Map size={16} />
            <span>Journey Map</span>
          </button>
          {bankingExperienceCompleted && (
            <button 
              onClick={() => setShowResetConfirm(true)} 
              className="nav-button reset-button"
            >
              <RotateCcw size={16} />
              <span>Reset Journey</span>
            </button>
          )}
        </div>
      </header>

      {/* Reality Check Section */}
      {!bankingExperienceCompleted ? (
        <RealityCheckStep onComplete={handleExperienceComplete} />
      ) : (
        <>
          {/* Journey Map Overlay */}
          {showJourneyMap && (
            <JourneyMapView 
              journeySteps={journeySteps}
              currentStep={currentStep}
              userStats={userStats}
              onClose={() => setShowJourneyMap(false)}
            />
          )}

          {/* Current Journey Step */}
          <CurrentJourneyStep 
            step={activeJourneyStep}
            stepIndex={currentStep}
            totalSteps={journeySteps.length}
            userStats={userStats}
            moduleIcons={moduleIcons}
          />

          {/* Value Discovery */}
          {!selectedValueProposition && (
            <ValueDiscoveryStep 
              valuePropositions={valuePropositions}
              onSelect={setSelectedValueProposition}
            />
          )}

          {/* Continue Learning CTA */}
          {(() => {
            const completedModuleIds = Object.values(moduleRegistry)
              .filter(module => getModuleProgress(module.id) === 100)
              .map(module => module.id);
            const nextModule = getNextModule(completedModuleIds);
            return nextModule ? (
              <ContinueLearningSection 
                nextModule={nextModule}
                selectedPath={selectedValueProposition}
              />
            ) : null;
          })()}

          {/* Enhanced Module Groups */}
          <div className="enhanced-module-groups">
            {Object.entries(moduleGroups)
              .sort(([,a], [,b]) => a.order - b.order)
              .map(([groupKey, groupInfo]) => (
                <EnhancedGroupSection
                  key={groupKey}
                  groupKey={groupKey}
                  groupInfo={groupInfo}
                  modules={Object.values(moduleRegistry).filter(m => m.group === groupKey)}
                  isModuleUnlocked={isModuleUnlocked}
                  getModuleProgress={getModuleProgress}
                  moduleIcons={moduleIcons}
                  selectedPath={selectedValueProposition}
                />
              ))}
          </div>

          {/* Momentum Builder */}
          {userStats.completedModules >= 2 && (
            <MomentumBuilderSection userStats={userStats} />
          )}
        </>
      )}

      {/* Reset Confirmation Dialog */}
      {showResetConfirm && (
        <ResetConfirmationDialog 
          userStats={userStats}
          onConfirm={handleResetProgress}
          onCancel={() => setShowResetConfirm(false)}
        />
      )}
    </div>
  );
};

// New Interactive Components

const RealityCheckStep = ({ onComplete }) => {
  const [showDataExploration, setShowDataExploration] = useState(false);

  const thoughtProvokingQuestions = [
    {
      id: "money_definition",
      question: "What exactly is money?",
      insight: "Is it physical bills and coins? Numbers in your bank account? Something else entirely?"
    },
    {
      id: "value_storage", 
      question: "Should money store value over time?",
      insight: "If you save $1000 today, what should it buy in 10 years? More, less, or the same?"
    },
    {
      id: "money_creation",
      question: "Who should have the power to create money?",
      insight: "Should it be governments, banks, algorithms, or something else? What are the trade-offs?"
    },
    {
      id: "economic_changes",
      question: "What economic changes have you noticed in your lifetime?",
      insight: "How do costs today compare to what you remember from earlier periods? What patterns do you see?"
    }
  ];

  return (
    <div className="inquiry-based-introduction">
      {/* Trust & Verify Notice */}
      <div className="trust-verify-notice">
        <div className="notice-header">
          <span className="verify-icon">🔍</span>
          <h3>Don't Trust, Verify!</h3>
        </div>
        <div className="notice-content">
          <p><strong>Before we begin:</strong> This is not a brainwashing course. This is an educational journey built on questions, evidence, and critical thinking.</p>
          <div className="notice-principles">
            <div className="principle">
              <span className="principle-icon">🧠</span>
              <div className="principle-text">
                <strong>Question Everything:</strong> Challenge every claim presented, including ours.
              </div>
            </div>
            <div className="principle">
              <span className="principle-icon">🔬</span>
              <div className="principle-text">
                <strong>Verify Claims:</strong> All data and arguments should be independently verifiable.
              </div>
            </div>
            <div className="principle">
              <span className="principle-icon">🎯</span>
              <div className="principle-text">
                <strong>Form Your Own Conclusions:</strong> Use this as a starting point for your own research journey.
              </div>
            </div>
          </div>
          <div className="notice-commitment">
            <p><em>"The goal isn't to convince you of anything—it's to give you the tools to think clearly about money and make your own informed decisions."</em></p>
          </div>
        </div>
      </div>

      {/* Course Introduction */}
      <div className="course-introduction">
        <h2>Why This Course Exists</h2>
        <p className="introduction-context">
          Money affects every aspect of our lives, yet most of us were never taught how it actually works. 
          This course explores money systems—both traditional and emerging—through data, history, and practical examples.
        </p>
        <div className="course-approach">
          <h3>Our Approach</h3>
          <div className="approach-principles">
            <div className="approach-item">
              <span className="approach-icon">❓</span>
              <div className="approach-text">
                <strong>Start with Questions:</strong> Before presenting answers, we'll explore what questions are worth asking.
              </div>
            </div>
            <div className="approach-item">
              <span className="approach-icon">📊</span>
              <div className="approach-text">
                <strong>Examine Evidence:</strong> Look at historical data, real-world examples, and verifiable information.
              </div>
            </div>
            <div className="approach-item">
              <span className="approach-icon">🧩</span>
              <div className="approach-text">
                <strong>Build Understanding:</strong> Connect concepts logically from first principles to complex systems.
              </div>
            </div>
          </div>
        </div>
      </div>

      {!showDataExploration ? (
        <div className="thoughtful-inquiry">
          <div className="inquiry-header">
            <h3>Key Questions to Consider</h3>
            <p>Before diving into content, here are some fundamental questions about money and economics to keep in mind as you explore.</p>
          </div>

          <div className="questions-grid">
            {thoughtProvokingQuestions.map((question, index) => (
              <div key={question.id} className="question-card">
                <div className="question-number">{index + 1}</div>
                <h4 className="question-title">{question.question}</h4>
                <p className="question-insight">{question.insight}</p>
              </div>
            ))}
          </div>

          <div className="inquiry-actions">
            <button 
              onClick={() => setShowDataExploration(true)}
              className="explore-data-button"
            >
              <span className="explore-icon">📊</span>
              Explore the Data
              <span className="explore-subtext">See what the numbers reveal</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="data-exploration">
          <div className="exploration-header">
            <h3>Now Let's Look at Some Data</h3>
            <p>With those questions in mind, let's examine some historical and economic data together and see what patterns emerge.</p>
          </div>

          <div className="data-invitation">
            <div className="canva-embed-container">
              <div style={{
                position: 'relative',
                width: '100%',
                height: 0,
                paddingTop: '56.2225%',
                paddingBottom: 0,
                boxShadow: '0 2px 8px 0 rgba(63,69,81,0.16)',
                marginTop: '1.6em',
                marginBottom: '0.9em',
                overflow: 'hidden',
                borderRadius: '8px',
                willChange: 'transform'
              }}>
                <iframe 
                  loading="lazy"
                  style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    top: 0,
                    left: 0,
                    border: 'none',
                    padding: 0,
                    margin: 0
                  }}
                  src="https://www.canva.com/design/DAGsxTuHAPQ/3wSLQVpMathQYC5B7dJwIA/view?embed"
                  allowFullScreen="allowfullscreen"
                  allow="fullscreen"
                  title="Economic Data Exploration"
                />
              </div>
              <div className="canva-attribution">
                <a 
                  href="https://www.canva.com/design/DAGsxTuHAPQ/3wSLQVpMathQYC5B7dJwIA/view?utm_content=DAGsxTuHAPQ&utm_campaign=designshare&utm_medium=embeds&utm_source=link"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="canva-link"
                >
                  Economic Data & Money Systems Exploration
                </a>
                <span> by Dalia Platt</span>
              </div>
            </div>
          </div>

          <div className="next-steps">
            <h4>After Exploring the Data</h4>
            <p>
              Take time with the interactive content above. When you're ready, we'll begin our systematic 
              exploration of money systems, starting with how money evolved and why different systems emerge.
            </p>
            <div className="transition-context">
              <p>
                <strong>What you'll explore:</strong> The evolution of money, characteristics of different 
                monetary systems, economic trends and patterns, and emerging alternatives including Bitcoin.
              </p>
              <p>
                <strong>How we'll explore it:</strong> Through historical analysis, data examination, 
                hands-on examples, and practical exercises that help you form your own conclusions.
              </p>
            </div>
            
            <button 
              onClick={onComplete}
              className="begin-journey-button"
            >
              <span className="journey-icon">🚀</span>
              Begin Systematic Exploration
              <span className="journey-subtext">Start with: How Money Works</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// New Interactive Components

const CurrentJourneyStep = ({ step, stepIndex, totalSteps, userStats, moduleIcons }) => {
  return (
    <div className="current-journey-step">
      <div className="journey-header">
        <h2>{step.title}</h2>
        <div className="journey-progress">
          <span>{stepIndex + 1} of {totalSteps}</span>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${((stepIndex + 1) / totalSteps) * 100}%` }}
            />
          </div>
        </div>
      </div>
      
      <div className="journey-content">
        <p className="journey-question">{step.question}</p>
        <p className="journey-revelation">{step.revelation}</p>
        <blockquote className="journey-insight">
          💡 {step.insight}
        </blockquote>
      </div>

      {step.modules.length > 0 && (
        <div className="journey-modules">
          <h4>Complete these modules to continue:</h4>
          <div className="journey-module-list">
            {step.modules.map(moduleId => {
              const module = moduleRegistry[moduleId];
              if (!module) return null;
              return (
                <Link 
                  key={moduleId}
                  to={`/module/${moduleId}`}
                  className="journey-module-link"
                >
                  <span className="module-emoji">{moduleIcons[moduleId]}</span>
                  <span className="module-title">{module.title}</span>
                  <ArrowRight size={16} />
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

const ValueDiscoveryStep = ({ valuePropositions, onSelect }) => {
  const [selectedId, setSelectedId] = useState(null);

  return (
    <div className="value-discovery-step">
      <h2>🎯 Why Are You Here?</h2>
      <p>Choose your primary motivation to get personalized guidance:</p>
      
      <div className="value-propositions-grid">
        {valuePropositions.map(vp => (
          <div 
            key={vp.id}
            className={`value-proposition-card ${selectedId === vp.id ? 'selected' : ''}`}
            onClick={() => setSelectedId(vp.id)}
          >
            <h3>{vp.title}</h3>
            <div className="vp-problem">
              <strong>Problem:</strong> {vp.problem}
            </div>
            <div className="vp-solution">
              <strong>Solution:</strong> {vp.solution}
            </div>
            <div className="vp-outcome">
              <strong>Outcome:</strong> {vp.outcome}
            </div>
            <div className="vp-timeframe">
              <Clock size={14} />
              {vp.timeframe}
            </div>
          </div>
        ))}
      </div>
      
      {selectedId && (
        <button 
          onClick={() => onSelect(valuePropositions.find(vp => vp.id === selectedId)?.title)}
          className="select-path-button"
        >
          <Target size={16} />
          Start This Journey
        </button>
      )}
    </div>
  );
};

const ContinueLearningSection = ({ nextModule, selectedPath }) => {
  return (
    <div className="continue-learning-section">
      <div className="continue-content">
        <h3>🔥 Continue Your Journey</h3>
        {selectedPath && (
          <p className="path-context">
            On your path to <strong>{selectedPath}</strong>
          </p>
        )}
        <Link to={`/module/${nextModule.id}`} className="continue-learning-button">
          <Play size={20} />
          <div className="continue-details">
            <span className="continue-text">Continue Learning</span>
            <span className="next-module-name">{nextModule.title}</span>
          </div>
          <ArrowRight size={20} />
        </Link>
      </div>
    </div>
  );
};

const EnhancedGroupSection = ({ 
  groupKey, 
  groupInfo, 
  modules, 
  isModuleUnlocked, 
  getModuleProgress, 
  moduleIcons,
  selectedPath 
}) => {
  const unlockedCount = modules.filter(m => isModuleUnlocked(m)).length;
  const completedCount = modules.filter(m => getModuleProgress(m.id) === 100).length;
  
  return (
    <div className="enhanced-group-section">
      <div className="group-header">
        <div className="group-title-section">
          <h2>{groupInfo.title}</h2>
          <p className="group-description">{groupInfo.description}</p>
        </div>
        <div className="group-stats">
          <div className="completion-stats">
            <span>{completedCount}/{unlockedCount} completed</span>
            <div className="group-progress-bar">
              <div 
                className="group-progress-fill"
                style={{ width: `${unlockedCount > 0 ? (completedCount / unlockedCount) * 100 : 0}%` }}
              />
            </div>
          </div>
          {completedCount === modules.length && modules.length > 0 && (
            <div className="group-mastery">
              <Star size={16} />
              <span>Mastered!</span>
            </div>
          )}
        </div>
      </div>
      
      <div className="enhanced-modules-grid">
        {modules
          .sort((a, b) => a.order - b.order)
          .map(module => (
            <EnhancedModuleCard 
              key={module.id}
              module={module}
              isUnlocked={isModuleUnlocked(module)}
              progress={getModuleProgress(module.id)}
              icon={moduleIcons[module.id]}
              selectedPath={selectedPath}
            />
          ))}
      </div>
    </div>
  );
};

const EnhancedModuleCard = ({ module, isUnlocked, progress, icon, selectedPath }) => {
  const isCompleted = progress === 100;
  
  if (!isUnlocked) {
    return (
      <div className="enhanced-module-card locked">
        <div className="module-icon">🔒</div>
        <div className="card-content">
          <h3>{module.title}</h3>
          <p>{module.description}</p>
          <div className="locked-message">
            📋 Complete: {module.prerequisites.map(prereq => {
              const prereqModule = moduleRegistry[prereq];
              return prereqModule ? prereqModule.title : prereq;
            }).join(', ')}
          </div>
        </div>
      </div>
    );
  }

  return (
    <Link 
      to={`/module/${module.id}`}
      className={`enhanced-module-card ${isCompleted ? 'completed' : ''} ${progress > 0 ? 'started' : ''}`}
    >
      <div className="module-icon">{icon}</div>
      <div className="card-content">
        <h3>{module.title}</h3>
        <p>{module.description}</p>
        
        {selectedPath && (
          <div className="path-relevance">
            <Shield size={14} />
            <span>High relevance to {selectedPath}</span>
          </div>
        )}
        
        <div className="module-progress-section">
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="progress-text">{progress}%</span>
        </div>

        <div className="module-status">
          {isCompleted ? (
            <div className="status-completed">
              <Trophy size={14} />
              <span>Mastered</span>
            </div>
          ) : progress > 0 ? (
            <div className="status-in-progress">
              <Brain size={14} />
              <span>In Progress</span>
            </div>
          ) : (
            <div className="status-start">
              <Zap size={14} />
              <span>Ready to Start</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

const MomentumBuilderSection = ({ userStats }) => {
  return (
    <div className="momentum-builder-section">
      <div className="momentum-content">
        <h3>🔥 You're Building Unstoppable Momentum!</h3>
        <div className="momentum-stats">
          <div className="stat-item">
            <Trophy size={20} />
            <span>{userStats.completedModules} modules mastered</span>
          </div>
          <div className="stat-item">
            <Target size={20} />
            <span>{userStats.totalProgress}% journey complete</span>
          </div>
          <div className="stat-item">
            <Award size={20} />
            <span>{userStats.achievements.length} achievements earned</span>
          </div>
        </div>
        
        <div className="momentum-insight">
          💡 Knowledge compounds. Each module builds on the previous ones, creating complete understanding of sound money and Bitcoin's revolutionary approach.
        </div>
        
        <div className="next-milestone">
          {userStats.completedModules < 6 ? (
            <p>🎯 Complete {6 - userStats.completedModules} more modules to earn "Dedicated Student"!</p>
          ) : userStats.completedModules < userStats.totalModules ? (
            <p>🏆 You're close to becoming a Bitcoin Scholar! Keep going!</p>
          ) : (
            <p>🎓 Congratulations! You've mastered the complete Bitcoin education journey!</p>
          )}
        </div>
      </div>
    </div>
  );
};

const JourneyMapView = ({ journeySteps, currentStep, userStats, onClose }) => {
  return (
    <div className="journey-map-overlay" onClick={onClose}>
      <div className="journey-map-content" onClick={(e) => e.stopPropagation()}>
        <div className="journey-map-header">
          <h3>🗺️ Your Learning Journey</h3>
          <button onClick={onClose} className="close-button">×</button>
        </div>
        
        <div className="journey-steps-visualization">
          {journeySteps.map((step, index) => (
            <div 
              key={step.id}
              className={`journey-step-visual ${index === currentStep ? 'current' : ''} ${index < currentStep ? 'completed' : ''}`}
            >
              <div className="step-number">{index + 1}</div>
              <div className="step-content">
                <h4>{step.title}</h4>
                <p>{step.insight}</p>
                {step.modules.length > 0 && (
                  <div className="step-modules">
                    {step.modules.map(moduleId => (
                      <span key={moduleId} className="module-tag">
                        {moduleRegistry[moduleId]?.title}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        
        <div className="journey-map-stats">
          <div className="map-stat">
            <strong>{userStats.completedModules}</strong> modules completed
          </div>
          <div className="map-stat">
            <strong>{userStats.totalProgress}%</strong> journey complete
          </div>
          <div className="map-stat">
            <strong>{userStats.achievements.length}</strong> achievements earned
          </div>
        </div>
      </div>
    </div>
  );
};

const ResetConfirmationDialog = ({ userStats, onConfirm, onCancel }) => {
  return (
    <div className="reset-overlay" onClick={onCancel}>
      <div className="reset-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="reset-dialog-header">
          <h3>🔄 Reset to Financial Awakening</h3>
        </div>
        <div className="reset-dialog-content">
          <div className="warning-message">
            <div className="warning-icon">⚠️</div>
            <div>
              <h4>Return to the beginning of your journey?</h4>
              <p>This will reset your progress and return you to the <strong>Financial Awakening</strong> section, permanently deleting:</p>
              <ul>
                <li>✅ All completed modules ({userStats.completedModules})</li>
                <li>🏆 All earned achievements ({userStats.achievements.length})</li>
                <li>📊 Your overall progress ({userStats.totalProgress}%)</li>
                <li>🔥 Your learning streak</li>
              </ul>
              <p><strong>This action cannot be undone.</strong></p>
              <div className="reset-benefit">
                <h5>💡 Why reset?</h5>
                <p>Experience the complete awakening journey again or share it with someone new to Bitcoin.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="reset-dialog-actions">
          <button className="cancel-button" onClick={onCancel}>
            Cancel
          </button>
          <button className="confirm-reset-button" onClick={onConfirm}>
            <RotateCcw size={16} />
            Yes, Reset to Beginning
          </button>
        </div>
      </div>
    </div>
  );
};

export default Homepage; 