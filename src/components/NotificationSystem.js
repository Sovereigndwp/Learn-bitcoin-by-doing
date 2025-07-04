import React, { useState, useEffect, createContext, useContext } from 'react';
import { Trophy, Award, Star, CheckCircle, TrendingUp, Brain, Flame } from 'lucide-react';
import './NotificationSystem.css';

const NotificationContext = createContext();

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

// Notification types and their visual styles
const NOTIFICATION_TYPES = {
  achievement: {
    icon: Trophy,
    color: '#FFD700',
    gradient: 'linear-gradient(135deg, #FFD700, #FFA500)',
    duration: 5000,
    sound: 'achievement'
  },
  badge: {
    icon: Award,
    color: '#10B981',
    gradient: 'linear-gradient(135deg, #10B981, #059669)',
    duration: 4000,
    sound: 'badge'
  },
  streak: {
    icon: Flame,
    color: '#EF4444',
    gradient: 'linear-gradient(135deg, #EF4444, #DC2626)',
    duration: 4000,
    sound: 'streak'
  },
  milestone: {
    icon: Star,
    color: '#8B5CF6',
    gradient: 'linear-gradient(135deg, #8B5CF6, #7C3AED)',
    duration: 5000,
    sound: 'milestone'
  },
  insight: {
    icon: Brain,
    color: '#06B6D4',
    gradient: 'linear-gradient(135deg, #06B6D4, #0891B2)',
    duration: 4000,
    sound: 'insight'
  },
  levelUp: {
    icon: TrendingUp,
    color: '#F59E0B',
    gradient: 'linear-gradient(135deg, #F59E0B, #D97706)',
    duration: 4000,
    sound: 'levelup'
  },
  completion: {
    icon: CheckCircle,
    color: '#10B981',
    gradient: 'linear-gradient(135deg, #10B981, #059669)',
    duration: 3000,
    sound: 'completion'
  }
};

// Sound effects for notifications
const SOUNDS = {
  achievement: () => playTone(523.25, 0.2, 'sine'), // C5
  badge: () => playChord([261.63, 329.63, 392.00], 0.3), // C Major
  streak: () => playRiseTone(220, 440, 0.4), // Rising A3 to A4
  milestone: () => playChord([261.63, 329.63, 392.00, 523.25], 0.4), // C Major 7
  insight: () => playTone(440, 0.2, 'triangle'), // A4
  levelup: () => playFanfare(),
  completion: () => playTone(523.25, 0.15, 'sine')
};

// Audio synthesis functions
const playTone = (frequency, duration, type = 'sine') => {
  if (!window.AudioContext && !window.webkitAudioContext) return;
  
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  oscillator.frequency.value = frequency;
  oscillator.type = type;
  
  gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
  
  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + duration);
};

const playChord = (frequencies, duration) => {
  frequencies.forEach((freq, index) => {
    setTimeout(() => playTone(freq, duration * 0.8), index * 50);
  });
};

const playRiseTone = (startFreq, endFreq, duration) => {
  if (!window.AudioContext && !window.webkitAudioContext) return;
  
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  oscillator.frequency.setValueAtTime(startFreq, audioContext.currentTime);
  oscillator.frequency.exponentialRampToValueAtTime(endFreq, audioContext.currentTime + duration);
  
  gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
  
  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + duration);
};

const playFanfare = () => {
  const notes = [261.63, 329.63, 392.00, 523.25, 659.25]; // C Major scale
  notes.forEach((freq, index) => {
    setTimeout(() => playTone(freq, 0.2), index * 100);
  });
};

// Notification component
const Notification = ({ notification, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);
  
  const config = NOTIFICATION_TYPES[notification.type] || NOTIFICATION_TYPES.achievement;
  const IconComponent = config.icon;

  useEffect(() => {
    // Entry animation
    setTimeout(() => setIsVisible(true), 50);
    
    // Play sound
    if (SOUNDS[notification.type]) {
      setTimeout(() => SOUNDS[notification.type](), 200);
    }
    
    // Auto dismiss
    const timer = setTimeout(() => {
      setIsLeaving(true);
      setTimeout(() => onClose(notification.id), 300);
    }, config.duration);

    return () => clearTimeout(timer);
  }, [notification, onClose, config.duration]);

  const handleClick = () => {
    setIsLeaving(true);
    setTimeout(() => onClose(notification.id), 300);
  };

  return (
    <div 
      className={`notification ${isVisible ? 'visible' : ''} ${isLeaving ? 'leaving' : ''}`}
      style={{ background: config.gradient }}
      onClick={handleClick}
    >
      <div className="notification-content">
        <div className="notification-icon" style={{ color: config.color }}>
          <IconComponent size={24} />
        </div>
        <div className="notification-text">
          <h4 className="notification-title">{notification.title}</h4>
          <p className="notification-message">{notification.message}</p>
          {notification.details && (
            <div className="notification-details">{notification.details}</div>
          )}
        </div>
        {notification.badge && (
          <div className="notification-badge">
            <span className="badge-icon">{notification.badge.icon}</span>
            <span className="badge-text">{notification.badge.text}</span>
          </div>
        )}
      </div>
      
      {notification.type === 'achievement' && (
        <div className="achievement-sparkles">
          {[...Array(8)].map((_, i) => (
            <div key={i} className={`sparkle sparkle-${i + 1}`}>✨</div>
          ))}
        </div>
      )}
      
      <div className="notification-progress">
        <div 
          className="progress-bar" 
          style={{ 
            animationDuration: `${config.duration}ms`,
            background: config.color
          }}
        />
      </div>
    </div>
  );
};

// Celebration overlay for major achievements
const CelebrationOverlay = ({ celebration, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    playFanfare();
    
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 500);
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  if (!celebration) return null;

  return (
    <div className={`celebration-overlay ${isVisible ? 'visible' : ''}`}>
      <div className="celebration-content">
        <div className="celebration-icon">
          {celebration.icon}
        </div>
        <h2 className="celebration-title">{celebration.title}</h2>
        <p className="celebration-message">{celebration.message}</p>
        {celebration.badge && (
          <div className="celebration-badge">
            <div className="badge-showcase">
              <span className="badge-icon">{celebration.badge.icon}</span>
              <span className="badge-name">{celebration.badge.name}</span>
              <span className="badge-rarity">{celebration.badge.rarity}</span>
            </div>
          </div>
        )}
      </div>
      
      <div className="celebration-particles">
        {[...Array(20)].map((_, i) => (
          <div key={i} className={`particle particle-${i + 1}`}>
            {i % 4 === 0 ? '🎉' : i % 4 === 1 ? '✨' : i % 4 === 2 ? '🎊' : '⭐'}
          </div>
        ))}
      </div>
    </div>
  );
};

// Main notification provider
export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [celebration, setCelebration] = useState(null);
  const [soundEnabled, setSoundEnabled] = useState(() => {
    const saved = localStorage.getItem('notificationSounds');
    return saved ? JSON.parse(saved) : true;
  });

  // Persist sound preference
  useEffect(() => {
    localStorage.setItem('notificationSounds', JSON.stringify(soundEnabled));
  }, [soundEnabled]);

  const showNotification = (config) => {
    const notification = {
      id: Date.now() + Math.random(),
      timestamp: new Date(),
      ...config
    };
    
    setNotifications(prev => [...prev, notification]);
    
    // Limit to 3 notifications max
    setTimeout(() => {
      setNotifications(prev => prev.slice(-3));
    }, 100);
  };

  const showCelebration = (config) => {
    setCelebration({
      id: Date.now(),
      ...config
    });
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const closeCelebration = () => {
    setCelebration(null);
  };

  // Predefined notification helpers
  const showAchievement = (title, message, details = '') => {
    showNotification({
      type: 'achievement',
      title,
      message,
      details
    });
  };

  const showBadgeEarned = (badge) => {
    showNotification({
      type: 'badge',
      title: 'Badge Earned!',
      message: badge.title,
      details: badge.description,
      badge: {
        icon: badge.icon,
        text: badge.rarity
      }
    });
    
    // Show celebration for rare badges
    if (['rare', 'legendary'].includes(badge.rarity)) {
      showCelebration({
        title: 'Rare Badge Unlocked!',
        message: `You've earned the ${badge.title} badge`,
        icon: '🏆',
        badge: {
          icon: badge.icon,
          name: badge.title,
          rarity: badge.rarity
        }
      });
    }
  };

  const showStreak = (days) => {
    showNotification({
      type: 'streak',
      title: `${days} Day Streak!`,
      message: 'You\'re on fire! Keep the momentum going.',
      details: `Consistency is key to mastering Bitcoin`
    });
  };

  const showMilestone = (milestone) => {
    showNotification({
      type: 'milestone',
      title: 'Milestone Reached!',
      message: milestone.title,
      details: milestone.description
    });
  };

  const showInsight = (insight) => {
    showNotification({
      type: 'insight',
      title: 'Learning Insight',
      message: insight.title,
      details: insight.description
    });
  };

  const showLevelUp = (level, points) => {
    showNotification({
      type: 'levelUp',
      title: `Level ${level} Reached!`,
      message: `You've earned ${points} total points`,
      details: 'Your Bitcoin knowledge is growing stronger'
    });
  };

  const showModuleComplete = (module, score) => {
    showNotification({
      type: 'completion',
      title: 'Module Complete!',
      message: module.title,
      details: `Score: ${score}% • ${module.estimatedTime} well spent`
    });
  };

  const value = {
    // State
    notifications,
    celebration,
    soundEnabled,
    
    // Actions
    showNotification,
    showCelebration,
    removeNotification,
    setSoundEnabled,
    
    // Helper methods
    showAchievement,
    showBadgeEarned,
    showStreak,
    showMilestone,
    showInsight,
    showLevelUp,
    showModuleComplete
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
      
      <div className="notification-container">
        {notifications.map(notification => (
          <Notification
            key={notification.id}
            notification={notification}
            onClose={removeNotification}
          />
        ))}
      </div>
      
      {celebration && (
        <CelebrationOverlay
          celebration={celebration}
          onClose={closeCelebration}
        />
      )}
    </NotificationContext.Provider>
  );
}; 