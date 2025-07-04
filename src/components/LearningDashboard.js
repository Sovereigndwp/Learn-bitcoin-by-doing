import React, { useState, useEffect } from 'react';
import { useProgress } from '../contexts/ProgressContext';
import { 
  TrendingUp, 
  Target, 
  Award, 
  Calendar, 
  Clock, 
  BarChart3,
  Trophy,
  BookOpen,
  Zap,
  Star,
  ChevronRight,
  PlayCircle
} from 'lucide-react';
import './LearningDashboard.css';

const LearningDashboard = () => {
  const {
    completedModules,
    earnedBadges,
    currentStreak,
    longestStreak,
    totalPoints,
    totalTimeSpent,
    modules,
    badges,
    getLearningStats,
    getNextRecommendation
  } = useProgress();

  const [activeTab, setActiveTab] = useState('overview');
  const [animatedStats, setAnimatedStats] = useState({});
  
  const stats = getLearningStats();
  const nextModule = getNextRecommendation();

  // Animate numbers on load
  useEffect(() => {
    const animateNumber = (target, key) => {
      let current = 0;
      const increment = target / 50;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        setAnimatedStats(prev => ({ ...prev, [key]: Math.round(current) }));
      }, 20);
    };

    animateNumber(stats.completionPercentage, 'completion');
    animateNumber(totalPoints, 'points');
    animateNumber(currentStreak, 'streak');
    animateNumber(stats.averageScore, 'score');
  }, [stats.completionPercentage, totalPoints, currentStreak, stats.averageScore]);

  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const getStreakMessage = () => {
    if (currentStreak === 0) {
      return "Start your learning streak today!";
    } else if (currentStreak < 3) {
      return "Keep going! You're building momentum.";
    } else if (currentStreak < 7) {
      return "Great consistency! You're on fire! 🔥";
    } else if (currentStreak < 30) {
      return "Incredible dedication! You're unstoppable! 🚀";
    } else {
      return "Legendary streak! You're a Bitcoin master! 👑";
    }
  };

  const getProgressRingStyle = (percentage) => {
    const circumference = 2 * Math.PI * 45;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;
    
    return {
      strokeDasharray,
      strokeDashoffset,
      transition: 'stroke-dashoffset 1s ease-in-out'
    };
  };

  const getBadgesByRarity = () => {
    const userBadges = earnedBadges.map(badgeId => 
      badges.find(badge => badge.id === badgeId)
    ).filter(Boolean);

    return userBadges.reduce((acc, badge) => {
      acc[badge.rarity] = (acc[badge.rarity] || 0) + 1;
      return acc;
    }, {});
  };

  const getRecentAchievements = () => {
    return earnedBadges.slice(-3).map(badgeId => 
      badges.find(badge => badge.id === badgeId)
    ).filter(Boolean);
  };

  const getPerformanceInsight = () => {
    if (stats.averageScore >= 90) {
      return {
        type: 'excellent',
        message: "Outstanding performance! You're mastering Bitcoin concepts with excellence.",
        icon: '🎯'
      };
    } else if (stats.averageScore >= 75) {
      return {
        type: 'good',
        message: "Good progress! You're building solid Bitcoin knowledge.",
        icon: '📈'
      };
    } else if (stats.averageScore >= 60) {
      return {
        type: 'improving',
        message: "Keep practicing! Your understanding is growing steadily.",
        icon: '🌱'
      };
    } else {
      return {
        type: 'encourage',
        message: "Every expert was once a beginner. Keep learning!",
        icon: '💪'
      };
    }
  };

  const renderOverviewTab = () => (
    <div className="dashboard-grid">
      {/* Progress Ring */}
      <div className="dashboard-card progress-card">
        <div className="card-header">
          <h3>Overall Progress</h3>
          <TrendingUp className="card-icon" />
        </div>
        <div className="progress-ring-container">
          <svg className="progress-ring" width="120" height="120">
            <circle
              cx="60"
              cy="60"
              r="45"
              stroke="#333"
              strokeWidth="8"
              fill="transparent"
            />
            <circle
              cx="60"
              cy="60"
              r="45"
              stroke="#FF8C00"
              strokeWidth="8"
              fill="transparent"
              strokeLinecap="round"
              style={getProgressRingStyle(animatedStats.completion || 0)}
            />
          </svg>
          <div className="progress-text">
            <span className="progress-percentage">{animatedStats.completion || 0}%</span>
            <span className="progress-label">Complete</span>
          </div>
        </div>
        <div className="progress-details">
          <div className="progress-stat">
            <span className="stat-value">{stats.completedModules}</span>
            <span className="stat-label">of {stats.totalModules} modules</span>
          </div>
        </div>
      </div>

      {/* Learning Streak */}
      <div className="dashboard-card streak-card">
        <div className="card-header">
          <h3>Learning Streak</h3>
          <Zap className="card-icon" />
        </div>
        <div className="streak-display">
          <div className="streak-number">{animatedStats.streak || 0}</div>
          <div className="streak-label">days</div>
        </div>
        <div className="streak-info">
          <div className="streak-message">{getStreakMessage()}</div>
          <div className="streak-best">Best: {longestStreak} days</div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="dashboard-card performance-card">
        <div className="card-header">
          <h3>Performance</h3>
          <BarChart3 className="card-icon" />
        </div>
        <div className="performance-grid">
          <div className="metric">
            <div className="metric-value">{animatedStats.points || 0}</div>
            <div className="metric-label">Total Points</div>
          </div>
          <div className="metric">
            <div className="metric-value">{animatedStats.score || 0}%</div>
            <div className="metric-label">Avg Score</div>
          </div>
          <div className="metric">
            <div className="metric-value">{formatTime(totalTimeSpent)}</div>
            <div className="metric-label">Time Spent</div>
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="dashboard-card achievements-card">
        <div className="card-header">
          <h3>Achievements</h3>
          <Award className="card-icon" />
        </div>
        <div className="achievements-summary">
          <div className="badge-count">
            <span className="count-number">{earnedBadges.length}</span>
            <span className="count-label">badges earned</span>
          </div>
          <div className="recent-badges">
            {getRecentAchievements().map((badge, index) => (
              <div key={index} className="recent-badge" title={badge.title}>
                <span className="badge-emoji">{badge.icon}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="badge-distribution">
          {Object.entries(getBadgesByRarity()).map(([rarity, count]) => (
            <div key={rarity} className={`rarity-count rarity-${rarity}`}>
              <span className="rarity-number">{count}</span>
              <span className="rarity-name">{rarity}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Study Plan */}
      <div className="dashboard-card study-plan-card">
        <div className="card-header">
          <h3>Study Plan</h3>
          <Target className="card-icon" />
        </div>
        {nextModule ? (
          <div className="next-module">
            <div className="module-info">
              <h4>{nextModule.title}</h4>
              <div className="module-meta">
                <span className="module-time">
                  <Clock size={14} />
                  {nextModule.estimatedTime}
                </span>
                <span className={`module-difficulty difficulty-${nextModule.difficulty}`}>
                  {'★'.repeat(nextModule.difficulty)}
                </span>
              </div>
              <p className="module-description">{nextModule.description}</p>
            </div>
            <button className="continue-button">
              <PlayCircle size={16} />
              Continue Learning
            </button>
          </div>
        ) : (
          <div className="completion-celebration">
            <div className="celebration-icon">🎉</div>
            <h4>Congratulations!</h4>
            <p>You've completed all available modules!</p>
          </div>
        )}
      </div>

      {/* Learning Insights */}
      <div className="dashboard-card insights-card">
        <div className="card-header">
          <h3>Learning Insights</h3>
          <BookOpen className="card-icon" />
        </div>
        <div className="insights-content">
          <div className="performance-insight">
            <div className="insight-icon">{getPerformanceInsight().icon}</div>
            <div className="insight-message">{getPerformanceInsight().message}</div>
          </div>
          
          <div className="weekly-goal">
            <h4>Weekly Goal</h4>
            <div className="goal-progress">
              <div className="goal-bar">
                <div 
                  className="goal-fill" 
                  style={{ width: `${Math.min((completedModules.length * 20), 100)}%` }}
                />
              </div>
              <span className="goal-text">Complete 5 modules this week</span>
            </div>
          </div>

          <div className="quick-stats">
            <div className="quick-stat">
              <Star className="stat-icon" />
              <span>Learning velocity: {stats.completedModules > 0 ? 'Strong' : 'Getting started'}</span>
            </div>
            <div className="quick-stat">
              <Calendar className="stat-icon" />
              <span>Time remaining: ~{stats.estimatedTimeRemaining}min</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderBadgesTab = () => (
    <div className="badges-showcase">
      <div className="badges-header">
        <h2>Badge Collection</h2>
        <div className="badges-summary">
          <span className="earned-count">{earnedBadges.length}</span>
          <span className="total-count">/{badges.length} badges earned</span>
        </div>
      </div>
      
      <div className="badges-grid">
        {badges.map(badge => {
          const isEarned = earnedBadges.includes(badge.id);
          return (
            <div key={badge.id} className={`badge-card ${isEarned ? 'earned' : 'locked'}`}>
              <div className="badge-icon-large">
                {badge.icon}
              </div>
              <h3 className="badge-title">{badge.title}</h3>
              <p className="badge-description">{badge.description}</p>
              <div className="badge-footer">
                <span className={`badge-rarity rarity-${badge.rarity}`}>
                  {badge.rarity}
                </span>
                <span className="badge-points">{badge.points} pts</span>
              </div>
              {isEarned && (
                <div className="earned-indicator">
                  <Trophy size={16} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderStatsTab = () => (
    <div className="detailed-stats">
      <div className="stats-grid">
        <div className="stats-card">
          <h3>Learning Progress</h3>
          <div className="progress-breakdown">
            {modules.map(module => {
              const isCompleted = completedModules.includes(module.id);
              return (
                <div key={module.id} className={`module-progress ${isCompleted ? 'completed' : 'pending'}`}>
                  <div className="module-name">{module.title}</div>
                  <div className="module-status">
                    {isCompleted ? '✅' : '⏳'}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="stats-card">
          <h3>Time Analytics</h3>
          <div className="time-breakdown">
            <div className="time-stat">
              <span className="time-label">Total Study Time</span>
              <span className="time-value">{formatTime(totalTimeSpent)}</span>
            </div>
            <div className="time-stat">
              <span className="time-label">Average per Module</span>
              <span className="time-value">
                {stats.completedModules > 0 ? formatTime(Math.round(totalTimeSpent / stats.completedModules)) : '0m'}
              </span>
            </div>
            <div className="time-stat">
              <span className="time-label">Estimated Remaining</span>
              <span className="time-value">{formatTime(stats.estimatedTimeRemaining)}</span>
            </div>
          </div>
        </div>

        <div className="stats-card">
          <h3>Achievement Analytics</h3>
          <div className="achievement-breakdown">
            <div className="category-progress">
              {['core', 'achievement', 'streak', 'mastery'].map(category => {
                const categoryBadges = badges.filter(badge => badge.category === category);
                const earnedInCategory = earnedBadges.filter(badgeId => {
                  const badge = badges.find(b => b.id === badgeId);
                  return badge && badge.category === category;
                }).length;
                
                return (
                  <div key={category} className="category-stat">
                    <span className="category-name">{category}</span>
                    <div className="category-bar">
                      <div 
                        className="category-fill" 
                        style={{ width: `${(earnedInCategory / categoryBadges.length) * 100}%` }}
                      />
                    </div>
                    <span className="category-count">{earnedInCategory}/{categoryBadges.length}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="learning-dashboard">
      <div className="dashboard-header">
        <h1>Learning Dashboard</h1>
        <p className="dashboard-subtitle">Track your Bitcoin learning journey</p>
      </div>

      <div className="dashboard-tabs">
        <button 
          className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button 
          className={`tab-button ${activeTab === 'badges' ? 'active' : ''}`}
          onClick={() => setActiveTab('badges')}
        >
          Badges
        </button>
        <button 
          className={`tab-button ${activeTab === 'stats' ? 'active' : ''}`}
          onClick={() => setActiveTab('stats')}
        >
          Detailed Stats
        </button>
      </div>

      <div className="dashboard-content">
        {activeTab === 'overview' && renderOverviewTab()}
        {activeTab === 'badges' && renderBadgesTab()}
        {activeTab === 'stats' && renderStatsTab()}
      </div>
    </div>
  );
};

export default LearningDashboard; 