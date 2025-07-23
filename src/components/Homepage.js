import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useProgress } from '../contexts/ProgressContext';
import { useNotifications } from './NotificationSystem';
import { moduleRegistry, moduleGroups, getNextModule } from '../modules/ModuleRegistry';
import { 
  Trophy, Target, Zap, Users, Clock, Brain, Award, Star, 
  CheckCircle, Play, ArrowRight, Map, Lightbulb, Shield, 
  RotateCcw, BookOpen, TrendingUp, Eye, ChevronRight,
  DollarSign, Coins, Lock, Unlock, MessageCircle, BarChart3
} from 'lucide-react';
import { PrimaryButton, ConfirmDialog } from './ui';
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
              <button onClick={() => setShowResetConfirm(true)} className="reset-btn-minimal">
                <RotateCcw size={16} /> Reset
              </button>
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
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      icon: "💰",
      title: "Money Shapes Everything",
      description: "Yet most of us were never taught how it actually works. This changes today.",
      highlight: "Start with the basics"
    },
    {
      icon: "🧠", 
      title: "Think Independently",
      description: "We'll show you the data, ask the right questions, and let you draw your own conclusions.",
      highlight: "Evidence-based learning"
    },
    {
      icon: "📊",
      title: "Warm-up: Money Foundations",
      description: "Before diving into Bitcoin, explore how traditional monetary systems work in this interactive presentation.",
      highlight: "Preparatory learning",
      isCanvaSlide: true
    },
    {
      icon: "₿",
      title: "Master Bitcoin",
      description: "Understand the technology that's changing money forever through hands-on exploration.",
      highlight: "Interactive education"
    }
  ];

  const handleSlideNavigation = (direction) => {
    if (direction === 'next' && currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else if (direction === 'prev' && currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  // Removed automatic slide transitions - now user-controlled

    return (
    <section className="welcome-section">
      <div className="welcome-hero">
        <div className="hero-content">
          <div className="slide-container">
            <div className="slide-icon">{slides[currentSlide].icon}</div>
            <h2 className="hero-title">{slides[currentSlide].title}</h2>
            <p className="hero-description">{slides[currentSlide].description}</p>
            <span className="hero-highlight">{slides[currentSlide].highlight}</span>
            
            {slides[currentSlide].isCanvaSlide && (
              <div className="canva-presentation-container">
                <div className="canva-intro-text">
                  <p>Explore this interactive presentation to understand how traditional money works, or skip to Bitcoin learning.</p>
          </div>
        
              <div style={{
                position: 'relative',
                width: '100%',
                  height: '0', 
                  paddingTop: '56.2225%',
                  paddingBottom: '0', 
                boxShadow: '0 2px 8px 0 rgba(63,69,81,0.16)',
                  margin: '1.5em 0', 
                overflow: 'hidden',
                  borderRadius: '12px', 
                willChange: 'transform'
              }}>
                <iframe 
                  title="Interactive Money Foundations Presentation"
                  loading="lazy" 
                  style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                      top: '0', 
                      left: '0', 
                    border: 'none',
                      padding: '0',
                      margin: '0'
                  }}
                    src="https://www.canva.com/design/DAGsxTuHAPQ/3wSLQVpMathQYC5B7dJwIA/view?embed" 
                  allowFullScreen="allowfullscreen"
                    allow="fullscreen">
                  </iframe>
              </div>
                
                <div className="presentation-attribution">
            <a
                    href="https://www.canva.com/design/DAGsxTuHAPQ/3wSLQVpMathQYC5B7dJwIA/view?utm_content=DAGsxTuHAPQ&utm_campaign=designshare&utm_medium=embeds&utm_source=link" 
              target="_blank"
              rel="noopener noreferrer"
                    className="presentation-link"
            >
                    📈 View Full Presentation in New Tab
                  </a>
                  <p className="attribution-text">Educational content by Dalia Platt</p>
                </div>
              </div>
            )}
        </div>

        {/* Manual Navigation Controls */}
        <div className="slide-navigation">
          <button 
            onClick={() => handleSlideNavigation('prev')}
            disabled={currentSlide === 0}
            className="slide-nav-button"
          >
            ⬅️ Previous
          </button>
          <button 
            onClick={() => handleSlideNavigation('next')}
            disabled={currentSlide === slides.length - 1}
            className="slide-nav-button"
          >
            Next ➡️
          </button>
        </div>

          <div className="slide-indicators">
            {slides.map((_, index) => (
              <button
                key={index}
                className={`slide-indicator ${index === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="learning-preview">
        <h3>What You'll Learn</h3>
        <div className="preview-grid">
          <div className="preview-card">
            <Coins className="preview-icon" />
            <h4>How Money Really Works</h4>
            <p>Trace money from gold to government promises to digital scarcity</p>
            </div>
          <div className="preview-card">
            <Shield className="preview-icon" />
            <h4>Bitcoin Fundamentals</h4>
            <p>Master the technology enabling trustless digital money</p>
              </div>
          <div className="preview-card">
            <Brain className="preview-icon" />
            <h4>Critical Thinking</h4>
            <p>Learn to evaluate claims and think from first principles</p>
          </div>
        </div>
      </div>

      <div className="cta-section">
        <button onClick={onStartJourney} className="start-journey-button">
          <Play size={20} />
          <span>Begin Your Journey</span>
          <ArrowRight size={16} />
        </button>
        <p className="cta-subtitle">~5 minutes to start • No signup required</p>
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
    money: '💰',
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

    return (
    <section className="learning-section">
      {/* Back to Welcome Button */}
      {hasStarted && (
        <div className="back-to-welcome">
          <button 
            onClick={() => {
              console.log('Back to welcome clicked, current view:', currentView);
              setCurrentView('welcome');
              console.log('View set to welcome');
            }}
            className="back-button"
          >
            ⬅️ Back to Welcome
          </button>
        </div>
      )}

      {/* Next Step CTA */}
      {nextModule && (
        <div className="next-step-cta">
          <div className="next-step-content">
            <h3>Continue Learning</h3>
            <p>Your next recommended module</p>
            <Link to={`/module/${nextModule.id}`} className="next-module-card">
              <div className="module-icon">{moduleIcons[nextModule.id]}</div>
              <div className="module-info">
                <h4>{nextModule.title}</h4>
                <p>{nextModule.description}</p>
              </div>
              <ChevronRight className="continue-arrow" />
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
        <h4>{groupInfo.title}</h4>
        <span className="group-progress">{completedCount}/{modules.length}</span>
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
        <Lock className="lock-icon" />
        <div className="module-content">
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
        {isCompleted && <CheckCircle className="completed-icon" />}
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
            <Brain size={48} />
            <h4>Your Journey Awaits</h4>
            <p>Complete modules to unlock achievements and track your Bitcoin mastery.</p>
            <button 
              className="start-learning-btn"
              onClick={() => setCurrentView('learning')}
            >
              <Play size={20} />
              Start Learning
            </button>
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