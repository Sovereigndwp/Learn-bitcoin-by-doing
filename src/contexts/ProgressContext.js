import React, { createContext, useContext, useState, useEffect } from 'react';

const ProgressContext = createContext();

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};

// Note: useNotifications will be accessed through props or context when needed
// This avoids circular dependency issues

// Enhanced module definitions with comprehensive metadata
const MODULES = [
  {
    id: 'money',
    title: 'If you don\'t define money, it will define you',
    description: 'Start your Bitcoin journey by understanding what money is, how it evolved, and why Bitcoin represents the next leap forward in monetary technology.',
    estimatedTime: '45 min',
    difficulty: 2,
    category: 'foundational',
    prerequisites: []
  },
  {
    id: 'myths',
    title: 'Bitcoin Myths & Facts',
    description: 'Explore and debunk common Bitcoin myths and misconceptions before diving deeper into the technology.',
    estimatedTime: '40 min',
    difficulty: 2,
    category: 'foundational',
    prerequisites: ['money']
  },
  {
    id: 'bitcoin-basics',
    title: 'Bitcoin Basics: Your First Steps',
    description: 'Learn how to get started with Bitcoin - from choosing a wallet to making your first transaction, with practical security tips.',
    estimatedTime: '35 min',
    difficulty: 1,
    category: 'foundational',
    prerequisites: ['myths']
  },
  {
    id: 'numbers',
    title: 'Numbers & Encoding',
    description: 'Learn how computers represent and secure information using different number systems.',
    estimatedTime: '40 min',
    difficulty: 3,
    category: 'technical',
    prerequisites: ['bitcoin-basics']
  },
  {
    id: 'hashing',
    title: 'Hashing',
    description: 'Discover how Bitcoin uses SHA-256 hashing to create tamper-proof digital fingerprints.',
    estimatedTime: '50 min',
    difficulty: 3,
    category: 'technical',
    prerequisites: ['numbers']
  },
  {
    id: 'mining',
    title: 'Mining Simulator',
    description: 'Understand how Bitcoin mining works and why it\'s essential for network security.',
    estimatedTime: '60 min',
    difficulty: 4,
    category: 'technical',
    prerequisites: ['hashing']
  },
  {
    id: 'keys',
    title: 'Key Generation',
    description: 'Learn about public key cryptography and how Bitcoin addresses work.',
    estimatedTime: '55 min',
    difficulty: 4,
    category: 'technical',
    prerequisites: ['hashing']
  },
  {
    id: 'transactions',
    title: 'Building Transactions',
    description: 'Explore how Bitcoin transactions are created, signed, and verified.',
    estimatedTime: '50 min',
    difficulty: 4,
    category: 'technical',
    prerequisites: ['keys']
  },
  {
    id: 'scripts',
    title: 'Script Explorer',
    description: 'Dive into Bitcoin\'s scripting language and how it enables smart contracts.',
    estimatedTime: '65 min',
    difficulty: 5,
    category: 'advanced',
    prerequisites: ['transactions']
  },
  {
    id: 'merkle',
    title: 'Merkle Trees',
    description: 'Learn how Bitcoin efficiently verifies transactions using Merkle trees.',
    estimatedTime: '45 min',
    difficulty: 3,
    category: 'technical',
    prerequisites: ['hashing']
  },
  {
    id: 'custody',
    title: 'Custody & Multisig',
    description: 'Master different ways to secure and manage Bitcoin.',
    estimatedTime: '55 min',
    difficulty: 4,
    category: 'practical',
    prerequisites: ['keys']
  },
  {
    id: 'lightning',
    title: 'Lightning Network',
    description: 'Understand Bitcoin\'s Layer 2 scaling solution.',
    estimatedTime: '50 min',
    difficulty: 4,
    category: 'advanced',
    prerequisites: ['transactions']
  },
  {
    id: 'advanced-topics',
    title: 'Advanced Bitcoin Topics',
    description: 'Explore cutting-edge Bitcoin development and research.',
    estimatedTime: '70 min',
    difficulty: 5,
    category: 'advanced',
    prerequisites: ['scripts', 'lightning']
  },
  {
    id: 'myths',
    title: 'Bitcoin Myths & Facts',
    description: 'Explore and debunk common Bitcoin myths and misconceptions.',
    estimatedTime: '40 min',
    difficulty: 2,
    category: 'foundational',
    prerequisites: ['bitcoin-basics']
  },
  {
    id: 'bitcoin-toolkit',
    title: 'Bitcoin Toolkit',
    description: 'Hands-on tools for working with Bitcoin.',
    estimatedTime: '90 min',
    difficulty: 5,
    category: 'practical',
    prerequisites: ['transactions', 'scripts']
  }
];

// Comprehensive badge system with categories and rarity levels
const BADGES = [
  // Core Learning Badges
  {
    id: 'money-master',
    title: 'Money Master',
    description: 'Mastered the fundamentals of what makes good money',
    category: 'core',
    icon: '💰',
    rarity: 'common',
    points: 100
  },
  {
    id: 'hash-hero',
    title: 'Hash Hero',
    description: 'Mastered digital fingerprints and hashing',
    category: 'core',
    icon: '🔐',
    rarity: 'common',
    points: 100
  },
  {
    id: 'key-master',
    title: 'Key Master',
    description: 'Mastered public key cryptography',
    category: 'core',
    icon: '🔑',
    rarity: 'uncommon',
    points: 150
  },
  {
    id: 'tx-builder',
    title: 'Transaction Builder',
    description: 'Mastered Bitcoin transactions',
    category: 'core',
    icon: '🔄',
    rarity: 'uncommon',
    points: 150
  },
  {
    id: 'mining-master',
    title: 'Mining Master',
    description: 'Mastered Bitcoin mining and consensus',
    category: 'core',
    icon: '⛏️',
    rarity: 'uncommon',
    points: 150
  },
  {
    id: 'script-decoder',
    title: 'Script Decoder',
    description: 'Mastered Bitcoin scripting',
    category: 'core',
    icon: '📜',
    rarity: 'rare',
    points: 200
  },
  {
    id: 'merkle-maven',
    title: 'Merkle Maven',
    description: 'Mastered Merkle trees',
    category: 'core',
    icon: '🌳',
    rarity: 'uncommon',
    points: 150
  },
  {
    id: 'custody-captain',
    title: 'Custody Captain',
    description: 'Mastered Bitcoin custody',
    category: 'core',
    icon: '🛡️',
    rarity: 'uncommon',
    points: 150
  },
  {
    id: 'lightning-lord',
    title: 'Lightning Lord',
    description: 'Mastered Lightning Network',
    category: 'core',
    icon: '⚡',
    rarity: 'rare',
    points: 200
  },
  {
    id: 'myth-buster',
    title: 'Myth Buster',
    description: 'Debunked Bitcoin myths with facts',
    category: 'core',
    icon: '🎭',
    rarity: 'common',
    points: 100
  },
  {
    id: 'toolkit-master',
    title: 'Toolkit Master',
    description: 'Mastered practical Bitcoin tools',
    category: 'core',
    icon: '🛠️',
    rarity: 'rare',
    points: 250
  },
  
  // Achievement Badges
  {
    id: 'quick-learner',
    title: 'Quick Learner',
    description: 'Completed a module in under 30 minutes',
    category: 'achievement',
    icon: '🚀',
    rarity: 'uncommon',
    points: 125
  },
  {
    id: 'perfectionist',
    title: 'Perfectionist',
    description: 'Completed 5 modules with perfect scores',
    category: 'achievement',
    icon: '💎',
    rarity: 'rare',
    points: 300
  },
  {
    id: 'night-owl',
    title: 'Night Owl',
    description: 'Completed learning sessions past midnight',
    category: 'achievement',
    icon: '🦉',
    rarity: 'uncommon',
    points: 125
  },
  {
    id: 'weekend-warrior',
    title: 'Weekend Warrior',
    description: 'Completed modules on weekends',
    category: 'achievement',
    icon: '⚔️',
    rarity: 'uncommon',
    points: 125
  },
  
  // Streak Badges
  {
    id: 'streak-starter',
    title: 'Streak Starter',
    description: 'Maintained a 3-day learning streak',
    category: 'streak',
    icon: '🔥',
    rarity: 'common',
    points: 75
  },
  {
    id: 'consistency-king',
    title: 'Consistency King',
    description: 'Maintained a 7-day learning streak',
    category: 'streak',
    icon: '👑',
    rarity: 'uncommon',
    points: 150
  },
  {
    id: 'dedication-deity',
    title: 'Dedication Deity',
    description: 'Maintained a 30-day learning streak',
    category: 'streak',
    icon: '🏔️',
    rarity: 'legendary',
    points: 500
  },
  
  // Mastery Badges
  {
    id: 'bitcoin-apprentice',
    title: 'Bitcoin Apprentice',
    description: 'Completed 5+ modules',
    category: 'mastery',
    icon: '🎓',
    rarity: 'uncommon',
    points: 200
  },
  {
    id: 'bitcoin-scholar',
    title: 'Bitcoin Scholar',
    description: 'Completed 10+ modules',
    category: 'mastery',
    icon: '📚',
    rarity: 'rare',
    points: 400
  },
  {
    id: 'bitcoin-expert',
    title: 'Bitcoin Expert',
    description: 'Completed all modules',
    category: 'mastery',
    icon: '🏆',
    rarity: 'legendary',
    points: 1000
  }
];

// Learning milestones for progressive achievement
const MILESTONES = [
  {
    id: 'first-steps',
    title: 'First Steps',
    description: 'You\'ve started your Bitcoin journey',
    requirement: { type: 'modules_completed', value: 1 },
    reward: { type: 'insight', value: 'Every expert was once a beginner. Welcome to Bitcoin!' }
  },
  {
    id: 'building-momentum',
    title: 'Building Momentum',
    description: 'Knowledge is starting to compound',
    requirement: { type: 'modules_completed', value: 3 },
    reward: { type: 'achievement', value: 'momentum-builder-badge' }
  },
  {
    id: 'technical-foundation',
    title: 'Technical Foundation',
    description: 'You understand Bitcoin\'s technical core',
    requirement: { type: 'categories_completed', value: ['hashing', 'keys', 'transactions'] },
    reward: { type: 'insight', value: 'You now understand how Bitcoin achieves trustlessness through cryptography!' }
  },
  {
    id: 'practical-mastery',
    title: 'Practical Mastery',
    description: 'You can confidently use Bitcoin',
    requirement: { type: 'modules_completed', value: 8 },
    reward: { type: 'achievement', value: 'practical-mastery-badge' }
  }
];

export const ProgressProvider = ({ children }) => {
  
  // Enhanced state management with lesson tracking
  const [completedModules, setCompletedModules] = useState(() => {
    const saved = localStorage.getItem('completedModules');
    return saved ? JSON.parse(saved) : [];
  });

  const [moduleScores, setModuleScores] = useState(() => {
    const saved = localStorage.getItem('moduleScores');
    return saved ? JSON.parse(saved) : {};
  });

  // Track lesson progress within modules
  const [lessonProgress, setLessonProgress] = useState(() => {
    const saved = localStorage.getItem('lessonProgress');
    return saved ? JSON.parse(saved) : {};
  });

  // Track current position in each module
  const [moduleProgress, setModuleProgress] = useState(() => {
    const saved = localStorage.getItem('moduleProgress');
    return saved ? JSON.parse(saved) : {};
  });

  const [earnedBadges, setEarnedBadges] = useState(() => {
    const saved = localStorage.getItem('earnedBadges');
    return saved ? JSON.parse(saved) : [];
  });

  const [currentStreak, setCurrentStreak] = useState(() => {
    const saved = localStorage.getItem('currentStreak');
    return saved ? parseInt(saved) : 0;
  });

  const [longestStreak, setLongestStreak] = useState(() => {
    const saved = localStorage.getItem('longestStreak');
    return saved ? parseInt(saved) : 0;
  });

  const [totalPoints, setTotalPoints] = useState(() => {
    const saved = localStorage.getItem('totalPoints');
    return saved ? parseInt(saved) : 0;
  });

  const [totalTimeSpent, setTotalTimeSpent] = useState(() => {
    const saved = localStorage.getItem('totalTimeSpent');
    return saved ? parseInt(saved) : 0; // in minutes
  });

  const [learningPath, setLearningPath] = useState(() => {
    const saved = localStorage.getItem('learningPath');
    return saved ? JSON.parse(saved) : [];
  });

  const [achievements, setAchievements] = useState(() => {
    const saved = localStorage.getItem('achievements');
    return saved ? JSON.parse(saved) : [];
  });

  // Connection tracking for cross-module learning
  const [connectionMap, setConnectionMap] = useState(() => {
    const saved = localStorage.getItem('connectionMap');
    return saved ? JSON.parse(saved) : {};
  });

  const [conceptualInsights, setConceptualInsights] = useState(() => {
    const saved = localStorage.getItem('conceptualInsights');
    return saved ? JSON.parse(saved) : {};
  });

  const [sessionStartTime, setSessionStartTime] = useState(null);

  // Enhanced state persistence
  useEffect(() => {
    const stateToSave = {
      completedModules,
      moduleScores,
      lessonProgress,
      moduleProgress,
      earnedBadges,
      currentStreak,
      longestStreak,
      totalPoints,
      totalTimeSpent,
      learningPath,
      achievements,
      connectionMap,
      conceptualInsights
    };

    Object.entries(stateToSave).forEach(([key, value]) => {
      localStorage.setItem(key, JSON.stringify(value));
    });
  }, [completedModules, moduleScores, lessonProgress, moduleProgress, earnedBadges, currentStreak, longestStreak, totalPoints, totalTimeSpent, learningPath, achievements, connectionMap, conceptualInsights]);

  // Session tracking
  const startSession = () => {
    setSessionStartTime(Date.now());
  };

  const endSession = () => {
    if (sessionStartTime) {
      const sessionDuration = Math.round((Date.now() - sessionStartTime) / 60000); // Convert to minutes
      setTotalTimeSpent(prev => prev + sessionDuration);
      setSessionStartTime(null);
    }
  };

  // Enhanced module completion with scoring and connection tracking
  const completeModule = (moduleId, score = 100, connectionInsights = {}) => {
    if (!completedModules.includes(moduleId)) {
      const updatedModules = [...completedModules, moduleId];
      setCompletedModules(updatedModules);
      
      // Record score
      setModuleScores(prev => ({
        ...prev,
        [moduleId]: score
      }));

      // Track connection insights for cross-module learning
      if (Object.keys(connectionInsights).length > 0) {
        setConnectionMap(prev => ({
          ...prev,
          [moduleId]: {
            ...prev[moduleId],
            ...connectionInsights,
            completedAt: Date.now()
          }
        }));
      }
      
      // Award points based on difficulty and score
      const module = MODULES.find(m => m.id === moduleId);
      const basePoints = 100;
      const difficultyMultiplier = module?.difficulty || 1;
      const scoreMultiplier = score / 100;
      const connectionBonus = Object.keys(connectionInsights).length * 10; // Bonus for making connections
      const points = Math.round(basePoints * difficultyMultiplier * scoreMultiplier) + connectionBonus;
      
      setTotalPoints(prev => prev + points);
      
      // Update streak
      updateStreak();
      
      // Award module-specific badges
      const badgeMap = {
        'money': 'money-master',
        'hashing': 'hash-hero',
        'keys': 'key-master',
        'transactions': 'tx-builder',
        'mining': 'mining-master',
        'scripts': 'script-decoder',
        'merkle': 'merkle-maven',
        'custody': 'custody-captain',
        'lightning': 'lightning-lord',
        'myths': 'myth-buster',
        'bitcoin-toolkit': 'toolkit-master'
      };
      
      if (badgeMap[moduleId]) {
        earnBadge(badgeMap[moduleId]);
      }
      
      // Check for achievement badges
      checkAchievementBadges(updatedModules, score);
      
      // Check mastery badges
      checkMasteryBadges(updatedModules.length);

      // Check for connection mastery badges
      checkConnectionMasteryBadges(connectionInsights);
      
      // End session tracking
      endSession();
      
      // Completion notification will be handled by the consuming component
    }
  };

  const updateStreak = () => {
    const lastActive = localStorage.getItem('lastActiveDate');
    const today = new Date().toDateString();
    
    if (lastActive === today) {
      // Already active today, no streak update needed
    } else if (lastActive === new Date(Date.now() - 86400000).toDateString()) {
      // Yesterday - increment streak
      const newStreak = currentStreak + 1;
      setCurrentStreak(newStreak);
      
      // Update longest streak
      if (newStreak > longestStreak) {
        setLongestStreak(newStreak);
      }
      
      // Check streak badges
      checkStreakBadges(newStreak);
      
      // Streak notification will be handled by the consuming component
    } else {
      // Not consecutive - reset streak to 1
      setCurrentStreak(1);
    }
    
    localStorage.setItem('lastActiveDate', today);
  };

  const checkAchievementBadges = (completedModulesList, score) => {
    // Quick learner badge (logic could be expanded here in the future)
    
    // Perfectionist badge
    const perfectScores = Object.values(moduleScores).filter(s => s === 100).length;
    if (perfectScores >= 5 && !earnedBadges.includes('perfectionist')) {
      earnBadge('perfectionist');
    }
    
    // Time-based badges
    const currentHour = new Date().getHours();
    if (currentHour >= 22 || currentHour <= 5) {
      earnBadge('night-owl');
    }
    
    const currentDay = new Date().getDay();
    if (currentDay === 0 || currentDay === 6) { // Sunday or Saturday
      earnBadge('weekend-warrior');
    }
  };

  const checkStreakBadges = (streak) => {
    if (streak >= 3 && !earnedBadges.includes('streak-starter')) {
      earnBadge('streak-starter');
    }
    if (streak >= 7 && !earnedBadges.includes('consistency-king')) {
      earnBadge('consistency-king');
    }
    if (streak >= 30 && !earnedBadges.includes('dedication-deity')) {
      earnBadge('dedication-deity');
    }
  };

  const checkMasteryBadges = (moduleCount) => {
    if (moduleCount >= 5 && !earnedBadges.includes('knowledge-seeker')) {
      earnBadge('knowledge-seeker');
    }
    if (moduleCount >= 10 && !earnedBadges.includes('bitcoin-scholar')) {
      earnBadge('bitcoin-scholar');
      }
    if (moduleCount >= MODULES.length && !earnedBadges.includes('master-student')) {
      earnBadge('master-student');
    }
  };

  // Check for connection mastery badges
  const checkConnectionMasteryBadges = (connectionInsights) => {
    const connectionCount = Object.keys(connectionInsights).length;
    
    if (connectionCount >= 3 && !earnedBadges.includes('concept-connector')) {
      earnBadge('concept-connector');
    }
    
    // Check for deep conceptual understanding across modules
    const totalConnections = Object.values(connectionMap).reduce((total, moduleConnections) => {
      return total + Object.keys(moduleConnections).length;
    }, 0);
    
    if (totalConnections >= 10 && !earnedBadges.includes('pattern-master')) {
      earnBadge('pattern-master');
    }
    
    if (totalConnections >= 20 && !earnedBadges.includes('systems-thinker')) {
      earnBadge('systems-thinker');
    }
  };

  // Helper function to get connection opportunities between modules
  const getConnectionOpportunities = (currentModuleId, previousModuleIds) => {
    const connectionTemplates = {
      'hashing': {
        'numbers': {
          question: "How does what you learned about number systems connect to hashing?",
          concept: "Hexadecimal representation of hash outputs",
          insight: "Hash functions output numbers in hexadecimal format - the number systems you learned help you read Bitcoin's digital fingerprints."
        }
      },
      'mining': {
        'hashing': {
          question: "How does hashing enable the mining process you just learned about?",
          concept: "Proof-of-work uses repeated hashing",
          insight: "Mining is essentially a race to find hash inputs that produce outputs meeting specific requirements - millions of SHA-256 operations per second."
        },
        'numbers': {
          question: "Why do miners care about targets expressed in hexadecimal?",
          concept: "Difficulty targets as large numbers",
          insight: "Mining targets are 256-bit numbers in hex - your number systems knowledge helps you understand how 'difficulty' is actually measured."
        }
      },
      'keys': {
        'hashing': {
          question: "How does hashing protect your private keys and create addresses?",
          concept: "Key derivation and address generation",
          insight: "Your private key gets hashed multiple times to create your public address - hashing provides both security and privacy."
        }
      },
      'transactions': {
        'keys': {
          question: "How do the keys you learned about enable transaction signing?",
          concept: "Digital signatures prove ownership",
          insight: "Every transaction uses your private key to create a unique signature - proving you own the coins without revealing your key."
        },
        'hashing': {
          question: "Where does hashing appear in the transaction verification process?",
          concept: "Transaction IDs and signature hashing",
          insight: "Each transaction gets a unique hash ID, and signature verification relies on hashing the transaction data."
        }
      }
    };

    const opportunities = [];
    
    if (connectionTemplates[currentModuleId]) {
      previousModuleIds.forEach(prevModuleId => {
        if (connectionTemplates[currentModuleId][prevModuleId]) {
          opportunities.push({
            fromModule: prevModuleId,
            toModule: currentModuleId,
            ...connectionTemplates[currentModuleId][prevModuleId]
          });
    }
      });
    }

    return opportunities;
  };

  // Record a conceptual insight
  const recordConceptualInsight = (moduleId, insightType, insight) => {
    setConceptualInsights(prev => ({
      ...prev,
      [moduleId]: {
        ...prev[moduleId],
        [insightType]: {
          insight,
          timestamp: Date.now()
        }
      }
    }));
  };

  const earnBadge = (badgeId) => {
    if (!earnedBadges.includes(badgeId)) {
      setEarnedBadges(prev => [...prev, badgeId]);
      const badge = BADGES.find(b => b.id === badgeId);
      if (badge) {
        setTotalPoints(prev => prev + badge.points);
        
        // Add to achievements log
        setAchievements(prev => [...prev, {
          id: Date.now(),
          type: 'badge',
          badgeId,
          timestamp: new Date().toISOString(),
          title: badge.title
        }]);
        
        // Badge notification will be handled by the consuming component
      }
    }
  };

  // Enhanced progress analytics
  const getModuleProgress = (moduleId) => {
    return completedModules.includes(moduleId) ? 100 : 0;
  };

  const isModuleCompleted = (moduleId) => {
    return completedModules.includes(moduleId);
  };

  const getBadgeDetails = (badgeId) => {
    return BADGES.find(badge => badge.id === badgeId);
  };

  const getLearningStats = () => {
    const totalModules = MODULES.length;
    const completedCount = completedModules.length;
    const averageScore = Object.keys(moduleScores).length > 0 
      ? Object.values(moduleScores).reduce((a, b) => a + b, 0) / Object.keys(moduleScores).length 
      : 0;
    
    const badgesByCategory = earnedBadges.reduce((acc, badgeId) => {
      const badge = getBadgeDetails(badgeId);
      if (badge) {
        acc[badge.category] = (acc[badge.category] || 0) + 1;
      }
      return acc;
    }, {});

    const estimatedTimeRemaining = MODULES
      .filter(m => !completedModules.includes(m.id))
      .reduce((total, module) => {
        const time = parseInt(module.estimatedTime.split(' ')[0]);
        return total + time;
      }, 0);

    return {
      totalModules,
      completedModules: completedCount,
      completionPercentage: Math.round((completedCount / totalModules) * 100),
      averageScore: Math.round(averageScore),
      totalPoints,
      totalTimeSpent,
      currentStreak,
      longestStreak,
      earnedBadges: earnedBadges.length,
      badgesByCategory,
      estimatedTimeRemaining,
      achievements: achievements.slice(-5) // Last 5 achievements
    };
  };

  const getNextRecommendation = () => {
    // Simple recommendation algorithm
    const uncompletedModules = MODULES.filter(m => !completedModules.includes(m.id));
    
    if (uncompletedModules.length === 0) {
      return null;
    }
    
    // Sort by difficulty and prerequisites
    const recommended = uncompletedModules.sort((a, b) => {
      // Prefer easier modules first
      return a.difficulty - b.difficulty;
    })[0];
    
    return recommended;
  };

  // Lesson progress tracking functions
  const updateLessonProgress = (moduleId, lessonId, viewId, completed = false) => {
    setLessonProgress(prev => ({
      ...prev,
      [moduleId]: {
        ...prev[moduleId],
        [lessonId]: {
          ...prev[moduleId]?.[lessonId],
          [viewId]: {
            completed,
            timestamp: Date.now()
          }
        }
      }
    }));
    
    // Update module position
    setModuleProgress(prev => ({
      ...prev,
      [moduleId]: {
        currentLesson: lessonId,
        currentView: viewId,
        lastAccessed: Date.now()
      }
    }));
  };

  // Update module progress (for intermediate progress tracking)
  const updateModuleProgress = (moduleId, progressPercentage) => {
    // For modules that want to track intermediate progress
    // This doesn't affect completion status, just tracks progress within module
    setModuleProgress(prev => ({
      ...prev,
      [moduleId]: {
        ...prev[moduleId],
        progressPercentage: Math.min(100, Math.max(0, progressPercentage)),
        lastAccessed: Date.now()
      }
    }));
  };

  const getLessonProgress = (moduleId, lessonId, viewId) => {
    return lessonProgress[moduleId]?.[lessonId]?.[viewId]?.completed || false;
  };

  const getModulePosition = (moduleId) => {
    return moduleProgress[moduleId] || null;
  };

  const resetModuleProgress = (moduleId) => {
    // Remove module from completed list if present
    setCompletedModules(prev => prev.filter(id => id !== moduleId));
    
    // Clear module score
    setModuleScores(prev => {
      const updated = { ...prev };
      delete updated[moduleId];
      return updated;
    });
    
    // Clear lesson progress for this module
    setLessonProgress(prev => {
      const updated = { ...prev };
      delete updated[moduleId];
      return updated;
    });
    
    // Clear module position
    setModuleProgress(prev => {
      const updated = { ...prev };
      delete updated[moduleId];
      return updated;
    });
    
    // Clear connection insights for this module
    setConnectionMap(prev => {
      const updated = { ...prev };
      delete updated[moduleId];
      return updated;
    });
    
    // Clear conceptual insights for this module
    setConceptualInsights(prev => {
      const updated = { ...prev };
      delete updated[moduleId];
      return updated;
    });
  };

  const resetProgress = () => {
    // Clear all state
    setCompletedModules([]);
    setModuleScores({});
    setLessonProgress({});
    setModuleProgress({});
    setEarnedBadges([]);
    setCurrentStreak(0);
    setLongestStreak(0);
    setTotalPoints(0);
    setTotalTimeSpent(0);
    setLearningPath([]);
    setAchievements([]);
    setConnectionMap({});
    setConceptualInsights({});
    
    // Clear localStorage
    const keysToRemove = [
      'completedModules', 'moduleScores', 'lessonProgress', 'moduleProgress',
      'earnedBadges', 'currentStreak', 'longestStreak', 'totalPoints', 
      'totalTimeSpent', 'learningPath', 'achievements', 'lastActiveDate', 
      'connectionMap', 'conceptualInsights'
    ];
    
    keysToRemove.forEach(key => localStorage.removeItem(key));
  };

  const value = {
    // State
    completedModules,
    earnedBadges,
    currentStreak,
    longestStreak,
    totalPoints,
    totalTimeSpent,
    moduleScores,
    achievements,
    connectionMap,
    conceptualInsights,
    lessonProgress,
    moduleProgress,
    
    // Module data
    modules: MODULES,
    badges: BADGES,
    milestones: MILESTONES,
    
    // Actions
    completeModule,
    startSession,
    endSession,
    earnBadge,
    resetProgress,
    resetModuleProgress,
    recordConceptualInsight,
    updateLessonProgress,
    updateModuleProgress,
    
    // Helpers
    getModuleProgress,
    isModuleCompleted,
    getBadgeDetails,
    getLearningStats,
    getNextRecommendation,
    getConnectionOpportunities,
    getLessonProgress,
    getModulePosition
  };

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
}; 