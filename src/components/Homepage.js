import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useProgress } from '../contexts/ProgressContext';
import { useNotifications } from './NotificationSystem';
import { moduleRegistry, moduleGroups, getNextModule } from '../modules/ModuleRegistry';
import { Trophy, Target, Zap, Users, Clock, Brain, Award, Star, CheckCircle, Lock, Play } from 'lucide-react';
import './Homepage.css';

const Homepage = () => {
  const { getModuleProgress, isModuleCompleted, completeModule, resetProgress } = useProgress();
  const { showNotification } = useNotifications();
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(true);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
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
    setShowWelcomeMessage(true);
    showNotification({
      type: 'insight',
      title: 'Fresh Start 🔄',
      message: "Your learning journey has been reset. Ready to begin again!"
    });
  };

  const handleResetBankingExperience = () => {
    // Reset just the banking experience
    localStorage.removeItem('completedModules');
    localStorage.removeItem('moduleProgress');
    localStorage.removeItem('earnedBadges');
    localStorage.removeItem('currentStreak');
    localStorage.removeItem('longestStreak');
    localStorage.removeItem('totalPoints');
    localStorage.removeItem('totalTimeSpent');
    localStorage.removeItem('sessionStartTime');
    localStorage.removeItem('lastActivityDate');
    localStorage.removeItem('achievements');
    
    // Force a page reload to reset all state
    window.location.reload();
  };

  const renderWelcomeSection = () => {
    if (!showWelcomeMessage || bankingExperienceCompleted) return null;

    return (
      <div className="welcome-section">
        <div className="welcome-content">
          <h2>🤔 Before We Start...</h2>
          <div className="prime-text">
            Most people think they understand money. They don't. And that ignorance costs them dearly.
          </div>
          <p>You're about to discover why your relationship with money is broken—and how to fix it.</p>
          <div className="welcome-stats">
            <div className="stat-card">
              <span className="stat-icon">💸</span>
              <span className="stat-value">$1.3M</span>
              <span className="stat-label">Average lifetime lost to inflation</span>
            </div>
            <div className="stat-card">
              <span className="stat-icon">🏦</span>
              <span className="stat-value">73%</span>
              <span className="stat-label">Of people can't access basic banking</span>
            </div>
            <div className="stat-card">
              <span className="stat-icon">⚡</span>
              <span className="stat-value">15 min</span>
              <span className="stat-label">To understand the solution</span>
            </div>
          </div>
          <button 
            className="dismiss-welcome"
            onClick={() => setShowWelcomeMessage(false)}
          >
            I'm Ready to Learn
          </button>
        </div>
      </div>
    );
  };

  const renderProgressDashboard = () => {
    if (!bankingExperienceCompleted) return null;

    return (
      <div className="progress-dashboard">
        <div className="dashboard-header">
          <h2>Your Learning Journey</h2>
          <div className="overall-progress">
            <div className="progress-circle">
              <svg viewBox="0 0 36 36" className="circular-chart">
                <path 
                  className="circle-bg"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path 
                  className="circle"
                  strokeDasharray={`${userStats.totalProgress}, 100`}
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="percentage">{userStats.totalProgress}%</div>
            </div>
            <div className="progress-details">
              <h3>Progress Overview</h3>
              <p>{userStats.completedModules} of {userStats.totalModules} modules completed</p>
              <div className="achievements-preview">
                <Trophy size={16} />
                <span>{userStats.achievements.length} achievements earned</span>
              </div>
            </div>
          </div>
        </div>
        
        {userStats.achievements.length > 0 && (
          <div className="achievements-section">
            <h3>🏆 Your Achievements</h3>
            <div className="achievements-grid">
              {userStats.achievements.map((achievement, index) => (
                <div key={index} className="achievement-badge">
                  <Award size={20} />
                  <span>{achievement}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {userStats.completedModules > 0 && (
          <div className="reset-section">
            <button 
              className="reset-button"
              onClick={() => setShowResetConfirm(true)}
            >
              🔄 Restart Learning Journey
            </button>
          </div>
        )}
      </div>
    );
  };

  const renderBankingExperienceCard = () => {
    return (
      <div key="banking-intro" className={`module-card experience-card ${bankingExperienceCompleted ? 'completed' : ''}`}>
        <div className="module-icon">🔍</div>
        <div className="card-content">
          <h3>A Reality Check</h3>
          <p>Uncover what they don't teach you about money through an interactive exploration of our monetary system's biggest secrets.</p>
          
          <div className="experience-insights">
            <div className="insight-item">
              <Clock size={16} />
              <span>Interactive exploration</span>
            </div>
            <div className="insight-item">
              <Target size={16} />
              <span>Hidden truths revealed</span>
            </div>
            <div className="insight-item">
              <Lock size={16} />
              <span>Foundation knowledge</span>
            </div>
          </div>
        
        <div className="banking-card-actions">
          {!bankingExperienceCompleted ? (
            <div className="canva-embed-container">
              <div style={{
                position: 'relative',
                width: '100%',
                height: 0,
                paddingTop: '56.2500%',
                paddingBottom: 0,
                boxShadow: '0 2px 8px 0 rgba(63,69,81,0.16)',
                marginTop: '1em',
                marginBottom: '0.5em',
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
                  src="https://www.canva.com/design/DAGsxZ7S7-s/M3o4RMoHJjS_HYRyc43STg/view?embed"
                  allowFullScreen="allowfullscreen"
                  allow="fullscreen"
                  title="A Reality Check"
                />
              </div>
              <div className="canva-attribution" style={{ fontSize: '0.8rem', color: '#666', marginBottom: '1rem' }}>
                <a 
                  href="https://www.canva.com/design/DAGsxZ7S7-s/M3o4RMoHJjS_HYRyc43STg/view?utm_content=DAGsxZ7S7-s&utm_campaign=designshare&utm_medium=embeds&utm_source=link"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="canva-link"
                  style={{ color: '#007bff', textDecoration: 'none' }}
                >
                  A Reality Check
                </a>
                <span> by Dalia Platt</span>
              </div>
            </div>
          ) : (
            <a
              href="https://www.canva.com/design/DAGsxZ7S7-s/M3o4RMoHJjS_HYRyc43STg/view?utm_content=DAGsxZ7S7-s&utm_campaign=designshare&utm_medium=embeds&utm_source=link"
              target="_blank"
              rel="noopener noreferrer"
              className="banking-demo-link"
            >
              <Play size={16} />
              Revisit Reality Check
            </a>
          )}
            
            {!bankingExperienceCompleted && (
              <>
                <button
            className="banking-demo-link"
            onClick={handleExperienceComplete}
                  style={{ marginTop: '0.5rem', border: 'none', cursor: 'pointer' }}
                >
                  <CheckCircle size={16} />
                  I Understand the Reality
                </button>
                <div className="experience-note">
                  <span>🎯 This will unlock the Money module</span>
                </div>
              </>
            )}
            
            {bankingExperienceCompleted && (
              <div className="completed-indicator">
                <CheckCircle size={16} />
                <span>Reality Check Complete</span>
              </div>
            )}
        </div>

        {bankingExperienceCompleted && (
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: '100%' }} />
          </div>
        )}
        </div>
      </div>
    );
  };

  const renderModuleCard = (module) => {
    const unlocked = isModuleUnlocked(module);
    const progress = getModuleProgress(module.id);
    const isCompleted = progress === 100;
    
    if (!unlocked) {
      return (
        <div key={module.id} className="module-card locked">
          <div className="module-icon">🔒</div>
          <div className="card-content">
          <h3>{module.title}</h3>
          <p>{module.description}</p>
          <div className="locked-message">
            {module.id === 'money' && !bankingExperienceCompleted ? 
                '🔍 Complete A Reality Check to unlock' :
                `📋 Prerequisites: ${module.prerequisites.map(prereq => {
                  const prereqModule = moduleRegistry[prereq];
                  return prereqModule ? prereqModule.title : prereq;
                }).join(', ')}`
            }
            </div>
            <div className="unlock-progress">
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '0%' }} />
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <Link 
        to={`/module/${module.id}`} 
        key={module.id}
        className={`module-card ${isCompleted ? 'completed' : ''} ${progress > 0 ? 'started' : ''}`}
      >
        <div className="module-icon">{moduleIcons[module.id]}</div>
        <div className="card-content">
        <h3>{module.title}</h3>
        <p>{module.description}</p>
          
        {progress > 0 && (
            <div className="module-stats">
              <div className="stat-item">
                <Brain size={14} />
                <span>{progress}% complete</span>
              </div>
              {isCompleted && (
                <div className="stat-item completed">
                  <Trophy size={14} />
                  <span>Mastered</span>
                </div>
              )}
            </div>
          )}

          <div className="progress-section">
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
            <span className="progress-text">{progress}%</span>
          </div>

        {module.prerequisites.length > 0 && (
          <div className="prerequisites">
              <span>Prerequisites: {module.prerequisites.map(prereq => {
                const prereqModule = moduleRegistry[prereq];
                return prereqModule ? prereqModule.title : prereq;
              }).join(', ')}</span>
            </div>
          )}

          {!isCompleted && progress === 0 && (
            <div className="start-hint">
              <Zap size={14} />
              <span>Click to start</span>
          </div>
        )}
        </div>
      </Link>
    );
  };

  const renderLearningPath = () => {
    const completedModuleIds = Object.values(moduleRegistry)
      .filter(module => getModuleProgress(module.id) === 100)
      .map(module => module.id);
    const nextModule = getNextModule(completedModuleIds);
    const totalModules = Object.values(moduleRegistry).filter(m => m.id !== 'banking-experience').length;
    const totalCompleted = Object.values(moduleRegistry).filter(m => m.id !== 'banking-experience' && getModuleProgress(m.id) === 100).length;

    return (
      <div className="learning-path">
        <div className="path-header">
          <h3>🎯 Your Optimal Learning Path</h3>
          {nextModule ? (
            <div className="next-module-spotlight">
              <div className="spotlight-content">
                <div className="module-preview">
                  <span className="preview-icon">{moduleIcons[nextModule.id]}</span>
                  <div className="preview-text">
                    <h4>{nextModule.title}</h4>
                    <p>{nextModule.description}</p>
                    <div style={{ fontSize: '0.9rem', color: '#888', marginTop: '0.5rem' }}>
                      📍 {moduleGroups[nextModule.group]?.title || nextModule.group}
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#666', marginTop: '0.5rem' }}>
                      📊 {totalCompleted} of {totalModules} modules completed ({Math.round((totalCompleted/totalModules)*100)}%)
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="completion-celebration">
              <Trophy size={24} />
              <h4>🎉 Congratulations!</h4>
              <p>You've completed all available modules. You're now ready to navigate the world of Bitcoin with confidence!</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderGroupSection = (groupKey, groupInfo) => {
    const modules = Object.values(moduleRegistry).filter(module => module.group === groupKey);
    const unlockedCount = modules.filter(m => isModuleUnlocked(m)).length;
    const completedCount = modules.filter(m => getModuleProgress(m.id) === 100).length;
    
    return (
      <div key={groupKey} className="group-section">
        <div className="group-header">
          <div>
            <h2>{groupInfo.title}</h2>
            <p className="group-description">{groupInfo.description}</p>
          </div>
          <div className="group-stats">
            <span className="group-progress">{completedCount}/{unlockedCount} completed</span>
            {completedCount === modules.length && modules.length > 0 && (
              <div className="group-mastery">
                <Star size={16} />
                <span>Mastered!</span>
              </div>
            )}
          </div>
        </div>
        <div className="modules-grid">
          {modules
            .sort((a, b) => a.order - b.order)
            .map(renderModuleCard)}
        </div>
      </div>
    );
  };

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
          <Link
            to="/about"
            className="nav-button"
          >
            <Users size={16} />
            <span>By Dalia</span>
          </Link>
        </div>
      </header>

      {renderWelcomeSection()}
      {renderProgressDashboard()}
      {renderLearningPath()}

      <div className="module-groups">
        {/* Banking Experience at the top */}
        <div className="group-section">
          <div className="group-header">
            <div>
              <h2>🔍 Begin Your Journey</h2>
              <p className="group-description">Discover the hidden mechanics behind our monetary system</p>
            </div>
            <div className="group-stats">
              <span className="group-progress">
                {bankingExperienceCompleted ? 1 : 0}/1 completed
              </span>
              {bankingExperienceCompleted && (
                <button 
                  onClick={handleResetBankingExperience}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#666',
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                    marginLeft: '1rem',
                    textDecoration: 'underline'
                  }}
                  title="Reset banking experience"
                >
                  🔄 Reset
                </button>
              )}
            </div>
          </div>
          <div className="modules-grid">
            {renderBankingExperienceCard()}
          </div>
          </div>
        </div>

      {/* Continue Learning Button - prominently placed in main journey container */}
      {(() => {
        const completedModuleIds = Object.values(moduleRegistry)
          .filter(module => getModuleProgress(module.id) === 100)
          .map(module => module.id);
        const nextModule = getNextModule(completedModuleIds);
        return nextModule ? (
          <div className="continue-learning-section">
            <Link to={`/module/${nextModule.id}`} className="continue-learning-button">
              <Play size={20} />
              <div className="continue-content">
                <span className="continue-text">Continue Learning</span>
                <span className="next-module-name">{nextModule.title}</span>
              </div>
            </Link>
          </div>
        ) : null;
      })()}

      <div className="module-groups">
        {/* Render all other groups in order */}
        {Object.entries(moduleGroups)
          .sort(([,a], [,b]) => a.order - b.order)
          .map(([groupKey, groupInfo]) => renderGroupSection(groupKey, groupInfo))}
        </div>

      {userStats.completedModules >= 2 && (
        <div className="encouragement-section">
          <div className="encouragement-content">
            <h3>🔥 You're Building Momentum!</h3>
            <div className="prime-text">
              Knowledge compounds. Each module builds on the previous ones, creating a complete understanding of sound money and Bitcoin's innovative approach.
            </div>
            <div className="next-milestone">
              {userStats.completedModules < 6 ? (
                <p>🎯 Complete {6 - userStats.completedModules} more modules to earn the "Dedicated Student" achievement!</p>
              ) : userStats.completedModules < userStats.totalModules ? (
                <p>🏆 You're so close to becoming a Bitcoin Scholar! Keep going!</p>
              ) : (
                <p>🎓 Congratulations! You've mastered the complete Bitcoin education journey!</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Reset Confirmation Dialog */}
      {showResetConfirm && (
        <div className="reset-overlay" onClick={() => setShowResetConfirm(false)}>
          <div className="reset-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="reset-dialog-header">
              <h3>🔄 Restart Learning Journey</h3>
            </div>
            <div className="reset-dialog-content">
              <div className="warning-message">
                <div className="warning-icon">⚠️</div>
                <div>
                  <h4>Are you sure you want to restart?</h4>
                  <p>This will permanently delete all your progress, including:</p>
                  <ul>
                    <li>✅ All completed modules ({userStats.completedModules})</li>
                    <li>🏆 All earned achievements ({userStats.achievements.length})</li>
                    <li>📊 Your overall progress ({userStats.totalProgress}%)</li>
                    <li>🔥 Your learning streak</li>
                  </ul>
                  <p><strong>This action cannot be undone.</strong></p>
                </div>
              </div>
            </div>
            <div className="reset-dialog-actions">
              <button 
                className="cancel-button"
                onClick={() => setShowResetConfirm(false)}
              >
                Cancel
              </button>
                              <button 
                  className="confirm-reset-button"
                  onClick={handleResetProgress}
                >
                  Yes, Restart Journey
                </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Homepage; 