import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useProgress } from '../contexts/ProgressContext';
import { useNotifications } from './NotificationSystem';
import { moduleRegistry, moduleGroups, getNextModule } from '../modules/ModuleRegistry';
import { Trophy, Target, Zap, Users, Clock, Brain, Award, Star, CheckCircle, Lock, Play } from 'lucide-react';
import HomepageIntro from './HomepageIntro';
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

      <HomepageIntro
        bankingExperienceCompleted={bankingExperienceCompleted}
        onExperienceComplete={handleExperienceComplete}
        showWelcomeMessage={showWelcomeMessage}
        onDismissWelcome={() => setShowWelcomeMessage(false)}
      />

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