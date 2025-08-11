import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useProgress } from '../contexts/ProgressContext';
import { useNotifications } from './NotificationSystem';
import { moduleRegistry, moduleGroups, getNextModule } from '../modules/ModuleRegistry';
import { 
  Trophy, Target, Zap, Clock, Brain, Award, Star, 
  CheckCircle, Play, ArrowRight, Shield, 
  RotateCcw, BookOpen,
  DollarSign, Coins, Lock, BarChart3,
  Hammer, Key, RefreshCw, FileText, TreeDeciduous, Zap as Lightning,
  Rocket, Drama, Settings
} from 'lucide-react';
import { ConfirmDialog } from './ui';
import { 
  ActionButton, 
  NavigationButton,
  ContinueButton,
  IconButton
} from './ui/UnifiedButton';
import { 
  AnimatedSearchIcon, 
  AnimatedBrainIcon, 
  AnimatedMoneyIcon, 
  AnimatedScaleIcon, 
  AnimatedBitcoinIcon,
  AnimatedShieldIcon,
  AnimatedNetworkIcon,
  AnimatedStarIcon
} from './AnimatedIcons.jsx';
import './Homepage.css';

const Homepage = () => {
  const { getModuleProgress, isModuleCompleted, completeModule, resetProgress } = useProgress();
  const { showNotification } = useNotifications();
  const location = useLocation();
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [currentView, setCurrentView] = useState('welcome'); // welcome, learning, progress

  // Calculate user statistics
  const [userStats, setUserStats] = useState({
    totalModules: 0,
    completedModules: 0,
    totalProgress: 0,
    achievements: []
  });

  useEffect(() => {
    const modules = Object.values(moduleRegistry);
    const completed = modules.filter(module => isModuleCompleted(module.id));
    const totalProgress = modules.reduce((sum, module) => sum + getModuleProgress(module.id), 0);
    
    const achievements = [];
    if (isModuleCompleted('money')) achievements.push('Money Master');
    if (isModuleCompleted('bitcoin-basics')) achievements.push('Bitcoin Explorer');
    if (isModuleCompleted('hashing')) achievements.push('Cryptography Student');
    if (isModuleCompleted('keys')) achievements.push('Digital Sovereign');
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

  // Handle URL parameters for view selection
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const viewParam = searchParams.get('view');
    if (viewParam === 'learning') {
      setCurrentView('learning');
    } else if (viewParam === 'progress') {
      setCurrentView('progress');
    }
  }, [location.search]);

  // Check if user has started their journey
  const hasStarted = userStats.completedModules > 0;
  const bankingExperienceCompleted = isModuleCompleted('banking-intro');

  // Get next recommended module
  const getNextRecommendedModule = () => {
    const completedModuleIds = Object.values(moduleRegistry)
      .filter(module => getModuleProgress(module.id) === 100)
      .map(module => module.id);
    return getNextModule(completedModuleIds);
  };

  const nextModule = getNextRecommendedModule();

  const handleStartJourney = () => {
    completeModule('banking-intro');
    setCurrentView('learning');
    showNotification({
      type: 'achievement',
      title: 'Journey Begins! 🎯',
      message: "Let's start with understanding how money really works."
    });
  };

  const handleResetProgress = () => {
    resetProgress();
    setShowResetConfirm(false);
    setCurrentView('welcome');
    showNotification({
      type: 'insight',
      title: 'Fresh Start 🔄',
      message: "Your learning journey has been reset. Ready to begin again!"
    });
  };
  
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

  return (
    <div className="homepage-modern">
      {/* Streamlined Header */}
      <header className="modern-header">
        <div className="header-content">
          <div className="logo-section">
            <span className="bitcoin-symbol">₿</span>
            <div className="logo-text">
              <h1>Learn Bitcoin by Doing</h1>
              <p>Master money and Bitcoin through interactive exploration</p>
            </div>
          </div>
          <nav className="header-nav">
            {hasStarted && (
              <IconButton 
                onClick={() => setShowResetConfirm(true)} 
                icon={<RotateCcw size={16} />}
                tooltip="Reset Progress"
                size="sm"
                className="reset-btn-minimal"
              >
                Reset
              </IconButton>
            )}
          </nav>
        </div>
      </header>

      {/* Main Content Based on Current View */}
      <main className="main-content">
        {currentView === 'welcome' && (
          <WelcomeSection onStartJourney={handleStartJourney} hasStarted={hasStarted} />
        )}

        {(currentView === 'learning' || (hasStarted && currentView !== 'welcome' && currentView !== 'progress')) && (
          <LearningSection 
            userStats={userStats}
            nextModule={nextModule}
            isModuleUnlocked={isModuleUnlocked}
            getModuleProgress={getModuleProgress}
            isModuleCompleted={isModuleCompleted}
            setCurrentView={setCurrentView}
            hasStarted={hasStarted}
            currentView={currentView}
          />
        )}

        {currentView === 'progress' && (
          <ProgressSection userStats={userStats} hasStarted={hasStarted} setCurrentView={setCurrentView} />
        )}
      </main>

      {/* Reset Confirmation Dialog */}
      <ConfirmDialog
        isOpen={showResetConfirm}
        onClose={() => setShowResetConfirm(false)}
        onConfirm={handleResetProgress}
        title="Reset Progress"
        message="Are you sure you want to reset your progress? This action cannot be undone."
        variant="warning"
        confirmText="Reset"
        cancelText="Cancel"
      />
    </div>
  );
};

// Modern Welcome Section
const WelcomeSection = ({ onStartJourney }) => {
  const [activeQuestions, setActiveQuestions] = useState([]);

  // Reveal animation effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setActiveQuestions([0, 1, 2, 3]);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const scrollToQuestions = () => {
    const questionsElement = document.getElementById('questions-section');
    if (questionsElement) {
      questionsElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="welcome-section">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <div className="hero-icon">
            <div className="sound-money-circle">
              <div className="inner-circle"></div>
            </div>
          </div>
          
          <h1 className="hero-title">
            Discover <span className="gradient-text">Sound Money</span>
          </h1>
          
          <p className="hero-description">
            Journey through the most important financial discovery of our time.
          </p>
          
          <p className="hero-subtitle">
            <span className="highlight-text">Question everything you thought you knew about money.</span>
          </p>
          
          <ActionButton 
            onClick={scrollToQuestions} 
            variant="primary"
            size="lg"
            className="hero-cta-button"
            feedback="visual"
            ripple={true}
          >
            Begin Your Discovery
          </ActionButton>
        </div>
      </div>

      {/* Questions Section */}
      <div id="questions-section" className="questions-section">
        <div className="questions-header">
          <h2 className="questions-title">
            <span className="gradient-text">Question</span> Everything
          </h2>
          <div className="questions-subtitle">
            <p>Challenge your assumptions.</p>
            <p>Awaken your curiosity.</p>
            <p className="highlight-text">Don't trust. Verify.</p>
          </div>
        </div>

        <div className="questions-grid-2x2">
          {/* Question 1 */}
          <div className={`question-card ${activeQuestions.includes(0) ? 'active' : ''}`} style={{'--border-color': '#8b5cf6'}}>
            <div className="question-icon"><AnimatedSearchIcon /></div>
            <h3 className="question-title">What is money, really?</h3>
            <div className="question-content">
              <p>→ If you had to define money without using the word "money," what would you say it is?</p>
              <p>→ Why do we all accept small pieces of paper or numbers on a screen in exchange for real things like food and shelter?</p>
            </div>
          </div>

          {/* Question 2 */}
          <div className={`question-card ${activeQuestions.includes(1) ? 'active' : ''}`} style={{'--border-color': '#3b82f6'}}>
            <div className="question-icon"><AnimatedBrainIcon /></div>
            <h3 className="question-title">Who gets to decide what money is?</h3>
            <div className="question-content">
              <p>→ Did we, as a society, ever vote on what counts as money?</p>
              <p>→ What happens when that power is in the hands of just a few people?</p>
            </div>
          </div>

          {/* Question 3 */}
          <div className={`question-card ${activeQuestions.includes(2) ? 'active' : ''}`} style={{'--border-color': '#ef4444'}}>
            <div className="question-icon"><AnimatedMoneyIcon /></div>
            <h3 className="question-title">If new money can be created at will...</h3>
            <div className="question-content">
              <p>→ Would you feel safe storing your savings in something that can be printed endlessly?</p>
              <p>→ What would happen if gold were suddenly easy and cheap to find?</p>
            </div>
          </div>

          {/* Question 4 */}
          <div className={`question-card ${activeQuestions.includes(3) ? 'active' : ''}`} style={{'--border-color': '#10b981'}}>
            <div className="question-icon"><AnimatedScaleIcon /></div>
            <h3 className="question-title">Is our financial system fair—or just familiar?</h3>
            <div className="question-content">
              <p>→ Who benefits the most from the current system?</p>
              <p>→ Who gets left behind? And why?</p>
            </div>
          </div>
        </div>
      </div>

      {/* Discovery Section */}
      <div className="discovery-section">
        <h2 className="discovery-title">
          The <span className="gradient-text">Answer</span> Changes Everything
        </h2>
        
        <div className="bitcoin-discovery-card">
          <div className="discovery-icon"><AnimatedBitcoinIcon /></div>
          <h3 className="discovery-subtitle">Bitcoin: The Discovery of Sound Money</h3>
          <p className="discovery-description">
            For the first time in human history, we have money that is <span className="highlight-text">mathematically scarce</span>, 
            <span className="highlight-text"> globally accessible</span>, and 
            <span className="highlight-text"> controlled by no one</span>. 
            This isn't just another currency—it's a fundamental breakthrough in human coordination.
          </p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon secure">
              <AnimatedShieldIcon />
            </div>
            <h4 className="feature-title">Mathematically Secure</h4>
            <p className="feature-description">Protected by the strongest cryptography and the world's most powerful computer network</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon accessible">
              <AnimatedNetworkIcon />
            </div>
            <h4 className="feature-title">Globally Accessible</h4>
            <p className="feature-description">Available to anyone, anywhere, without permission from banks or governments</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon scarce">
              <AnimatedStarIcon />
            </div>
            <h4 className="feature-title">Truly Scarce</h4>
            <p className="feature-description">Only 21 million will ever exist—no exceptions, no inflation, no debasement</p>
          </div>
        </div>
      </div>

      {/* Final CTA Section */}
      <div className="final-cta-section">
        <h2 className="cta-title">
          Ready to <span className="gradient-text">Transform</span> Your Understanding?
        </h2>
        
        <p className="cta-description">
          Join thousands who have discovered why Bitcoin represents the most important monetary innovation in centuries.
        </p>
        
        <ContinueButton 
          onClick={onStartJourney} 
          size="xl"
          className="final-cta-button"
          feedback="visual"
          icon={<ArrowRight size={20} />}
          iconPosition="right"
        >
          Start Your Journey
        </ContinueButton>
        
        <div className="cta-benefits">
          <p>🎓 No prior knowledge required</p>
          <p>🚀 Transform your financial future</p>
        </div>
      </div>
    </section>
  );
};

// Modern Learning Section
const LearningSection = ({ 
  userStats, 
  nextModule, 
  isModuleUnlocked, 
  getModuleProgress,
  isModuleCompleted,
  setCurrentView,
  hasStarted,
  currentView
}) => {
  const moduleIcons = {
    money: <DollarSign size={20} className="module-icon-svg" />,
    'bitcoin-basics': <Coins size={20} className="module-icon-svg" />,
    numbers: <BarChart3 size={20} className="module-icon-svg" />,
    hashing: <Shield size={20} className="module-icon-svg" />,
    mining: <Hammer size={20} className="module-icon-svg" />,
    keys: <Key size={20} className="module-icon-svg" />,
    transactions: <RefreshCw size={20} className="module-icon-svg" />,
    scripts: <FileText size={20} className="module-icon-svg" />,
    merkle: <TreeDeciduous size={20} className="module-icon-svg" />,
    custody: <Lock size={20} className="module-icon-svg" />,
    lightning: <Lightning size={20} className="module-icon-svg" />,
    'advanced-topics': <Rocket size={20} className="module-icon-svg" />,
    myths: <Drama size={20} className="module-icon-svg" />,
    'bitcoin-toolkit': <Settings size={20} className="module-icon-svg" />,
    'bitcoin-relevance': <Zap size={20} className="module-icon-svg" />
  };

    return (
    <section className="learning-section">
      {/* Back to Welcome Button */}
      {hasStarted && (
        <div className="back-to-welcome">
          <NavigationButton 
            direction="back"
            onClick={() => {
              console.log('Back to welcome clicked, current view:', currentView);
              setCurrentView('welcome');
              console.log('View set to welcome');
            }}
            className="back-button"
            size="sm"
          >
            Back to Welcome
          </NavigationButton>
        </div>
      )}

      {/* Next Step CTA */}
      {nextModule && (
        <div className="next-step-cta">
          <div className="next-step-content">
          <div className="continue-header">
            <Play size={16} className="continue-play-icon" />
            <h3>Continue Learning</h3>
          </div>
          <p>Your next recommended module</p>
          <Link to={`/module/${nextModule.id}`} className="next-module-card">
            <div className="module-icon">{moduleIcons[nextModule.id]}</div>
            <div className="module-info">
              <h4>{nextModule.title}</h4>
              <p>{nextModule.description}</p>
            </div>
            <div className="continue-arrow-container">
              <ArrowRight className="continue-arrow" size={20} />
            </div>
          </Link>
          </div>
          <div className="progress-summary">
            <div className="progress-ring">
              <svg width="60" height="60">
                <circle cx="30" cy="30" r="25" fill="none" stroke="#333" strokeWidth="4" />
                <circle 
                  cx="30" cy="30" r="25" fill="none" 
                  stroke="#f7931a" strokeWidth="4"
                  strokeDasharray={`${userStats.totalProgress * 1.57} 157`}
                  strokeDashoffset="39.25"
                />
              </svg>
              <span className="progress-text">{userStats.totalProgress}%</span>
            </div>
          </div>
        </div>
      )}

      {/* Learning Path */}
      <div className="learning-path">
        <h3>Your Learning Path</h3>
        <div className="modules-grid">
          {Object.entries(moduleGroups)
            .sort(([,a], [,b]) => a.order - b.order)
            .map(([groupKey, groupInfo]) => (
              <ModuleGroup
                key={groupKey}
                groupInfo={groupInfo}
                modules={Object.values(moduleRegistry).filter(m => m.group === groupKey)}
                isModuleUnlocked={isModuleUnlocked}
                getModuleProgress={getModuleProgress}
                isModuleCompleted={isModuleCompleted}
                moduleIcons={moduleIcons}
                groupKey={groupKey}
              />
            ))}
        </div>
      </div>
    </section>
    );
  };

// Module Group Component
const ModuleGroup = ({ 
  groupInfo, 
  modules, 
  isModuleUnlocked, 
  getModuleProgress, 
  isModuleCompleted,
  moduleIcons,
  groupKey
}) => {
  const completedCount = modules.filter(m => isModuleCompleted(m.id)).length;
    const unlockedCount = modules.filter(m => isModuleUnlocked(m)).length;
    
    return (
    <div className="module-group" data-group={groupKey}>
        <div className="group-header">
        <div className="group-title-container">
          <BookOpen size={18} className="group-icon" />
          <h4>{groupInfo.title}</h4>
        </div>
        <div className="group-progress-container">
          <Target size={14} className="progress-icon" />
          <span className="group-progress">{completedCount}/{modules.length}</span>
        </div>
      </div>
            <p className="group-description">{groupInfo.description}</p>
      
      <div className="modules-list">
        {modules
          .sort((a, b) => a.order - b.order)
          .map(module => (
            <ModuleCard 
              key={module.id}
              module={module}
              isUnlocked={isModuleUnlocked(module)}
              progress={getModuleProgress(module.id)}
              isCompleted={isModuleCompleted(module.id)}
              icon={moduleIcons[module.id]}
            />
          ))}
          </div>
        </div>
  );
};

// Module Card Component
const ModuleCard = ({ module, isUnlocked, progress, isCompleted, icon }) => {
  if (!isUnlocked) {
    return (
    <div className="module-card locked">
      <div className="locked-overlay">
        <Lock className="lock-icon" size={24} />
        <span className="lock-text">Locked</span>
      </div>
      <div className="module-content">
        <div className="module-header">
          <span className="module-icon disabled">{icon}</span>
        </div>
        <h5>{module.title}</h5>
        <p className="unlock-requirement">Complete prerequisites first</p>
      </div>
    </div>
    );
  }

  return (
    <Link 
      to={`/module/${module.id}`}
      className={`module-card ${isCompleted ? 'completed' : ''} ${progress > 0 ? 'started' : ''}`}
    >
      <div className="module-header">
        <span className="module-icon">{icon}</span>
        <div className="module-status">
          {isCompleted && <CheckCircle className="completed-icon" size={18} />}
          {!isCompleted && progress > 0 && <Clock className="in-progress-icon" size={16} />}
        </div>
      </div>
      <div className="module-content">
        <h5>{module.title}</h5>
        <p>{module.description}</p>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <span className="progress-text">{progress}% complete</span>
      </div>
          </Link>
  );
};

// Progress Section
const ProgressSection = ({ userStats, hasStarted, setCurrentView }) => {
  if (!hasStarted) {
    return (
      <section className="progress-section">
        <div className="progress-header">
          <h3>Ready to Start Learning?</h3>
          <p>Your learning journey hasn't begun yet. Track your progress here as you explore Bitcoin!</p>
        </div>
        
        <div className="getting-started">
        <div className="start-info">
          <div className="start-icon-container">
            <Brain size={48} className="brain-icon" />
            <Zap size={20} className="energy-icon" />
          </div>
          <h4>Your Journey Awaits</h4>
          <p>Complete modules to unlock achievements and track your Bitcoin mastery.</p>
          <ContinueButton 
            onClick={() => setCurrentView('learning')}
            className="start-learning-btn"
            size="lg"
            icon={<Play size={20} />}
            iconPosition="left"
            feedback="visual"
          >
            Start Learning
          </ContinueButton>
        </div>
        </div>
      </section>
    );
  }

  return (
    <section className="progress-section">
      <div className="progress-header">
        <h3>Your Learning Progress</h3>
        <div className="overall-stats">
          <div className="stat-card">
            <Trophy size={24} />
            <div className="stat-info">
              <span className="stat-number">{userStats.completedModules}</span>
              <span className="stat-label">Modules Completed</span>
            </div>
          </div>
          <div className="stat-card">
            <Target size={24} />
            <div className="stat-info">
              <span className="stat-number">{userStats.totalProgress}%</span>
              <span className="stat-label">Overall Progress</span>
            </div>
          </div>
          <div className="stat-card">
            <Award size={24} />
            <div className="stat-info">
              <span className="stat-number">{userStats.achievements.length}</span>
              <span className="stat-label">Achievements</span>
          </div>
          </div>
        </div>
        </div>

      <div className="achievements-section">
        <h4>Your Achievements</h4>
        <div className="achievements-grid">
          {userStats.achievements.length > 0 ? (
            userStats.achievements.map((achievement, index) => (
              <div key={index} className="achievement-card">
                <Star className="achievement-icon" />
                <span className="achievement-name">{achievement}</span>
              </div>
            ))
          ) : (
            <div className="no-achievements">
              <Award size={32} />
              <p>Complete modules to earn achievements!</p>
            </div>
          )}
            </div>
          </div>
    </section>
  );
};

// Reset Confirmation Dialog
const ResetConfirmationDialog = ({ userStats, onConfirm, onCancel }) => {
  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="reset-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="dialog-header">
          <h3>Reset Learning Progress?</h3>
        </div>
        <div className="dialog-content">
          <p>This will permanently delete:</p>
                  <ul>
            <li>{userStats.completedModules} completed modules</li>
            <li>{userStats.achievements.length} earned achievements</li>
            <li>All progress data</li>
                  </ul>
                  <p><strong>This action cannot be undone.</strong></p>
                </div>
        <div className="dialog-actions">
          <button className="cancel-button" onClick={onCancel}>
                Cancel
              </button>
          <button className="confirm-button" onClick={onConfirm}>
            <RotateCcw size={16} />
            Reset Progress
                </button>
            </div>
          </div>
    </div>
  );
};

export default Homepage; 