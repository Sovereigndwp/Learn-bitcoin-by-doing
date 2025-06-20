import React, { createContext, useContext, useState, useEffect } from 'react';

const ProgressContext = createContext();

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};

// Define available modules
const MODULES = [
  {
    id: 'money',
    title: 'If you don\'t define money, it will define you',
    description: 'Start your Bitcoin journey by understanding what money is, how it evolved, and why Bitcoin represents the next leap forward in monetary technology.'
  },
  {
    id: 'bitcoin-basics',
    title: 'Bitcoin Basics: Your First Steps',
    description: 'Learn how to get started with Bitcoin - from choosing a wallet to making your first transaction, with practical security tips.'
  },
  {
    id: 'numbers',
    title: 'Numbers & Encoding',
    description: 'Learn how computers represent and secure information using different number systems.'
  },
  {
    id: 'hashing',
    title: 'Digital Fingerprints',
    description: 'Discover how Bitcoin uses SHA-256 hashing to create tamper-proof digital fingerprints.'
  },
  {
    id: 'mining',
    title: 'Mining & Consensus',
    description: 'Understand how Bitcoin mining works and why it\'s essential for network security.'
  },
  {
    id: 'keys',
    title: 'Keys & Addresses',
    description: 'Learn about public key cryptography and how Bitcoin addresses work.'
  },
  {
    id: 'transactions',
    title: 'Transactions',
    description: 'Explore how Bitcoin transactions are created, signed, and verified.'
  },
  {
    id: 'scripts',
    title: 'Bitcoin Scripts',
    description: 'Dive into Bitcoin\'s scripting language and how it enables smart contracts.'
  },
  {
    id: 'merkle',
    title: 'Merkle Trees',
    description: 'Learn how Bitcoin efficiently verifies transactions using Merkle trees.'
  },
  {
    id: 'custody',
    title: 'Bitcoin Custody',
    description: 'Master different ways to secure and manage Bitcoin.'
  },
  {
    id: 'myths',
    title: 'Myths & Misconceptions',
    description: 'Explore and debunk common Bitcoin myths and misconceptions.'
  }
];

// Define available badges
const BADGES = [
  {
    id: 'money-master',
    title: 'Money Master',
    description: 'Mastered the fundamentals of what makes good money'
  },
  {
    id: 'hash-hero',
    title: 'Hash Hero',
    description: 'Mastered digital fingerprints and hashing'
  },
  {
    id: 'key-master',
    title: 'Key Master',
    description: 'Mastered public key cryptography'
  },
  {
    id: 'tx-builder',
    title: 'Transaction Builder',
    description: 'Mastered Bitcoin transactions'
  },
  {
    id: 'mining-master',
    title: 'Mining Master',
    description: 'Mastered Bitcoin mining and consensus'
  },
  {
    id: 'script-decoder',
    title: 'Script Decoder',
    description: 'Mastered Bitcoin scripting'
  },
  {
    id: 'merkle-maven',
    title: 'Merkle Maven',
    description: 'Mastered Merkle trees'
  },
  {
    id: 'custody-captain',
    title: 'Custody Captain',
    description: 'Mastered Bitcoin custody'
  },
  {
    id: 'bitcoin-graduate',
    title: 'Bitcoin Graduate',
    description: 'Completed all modules and earned the Bitcoin Graduate badge!'
  }
];

export const ProgressProvider = ({ children }) => {
  const [completedModules, setCompletedModules] = useState(() => {
    const saved = localStorage.getItem('completedModules');
    return saved ? JSON.parse(saved) : [];
  });

  const [earnedBadges, setEarnedBadges] = useState(() => {
    const saved = localStorage.getItem('earnedBadges');
    return saved ? JSON.parse(saved) : [];
  });

  const [currentStreak, setCurrentStreak] = useState(() => {
    const saved = localStorage.getItem('currentStreak');
    return saved ? parseInt(saved) : 0;
  });

  const [totalPoints, setTotalPoints] = useState(() => {
    const saved = localStorage.getItem('totalPoints');
    return saved ? parseInt(saved) : 0;
  });

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('completedModules', JSON.stringify(completedModules));
    localStorage.setItem('earnedBadges', JSON.stringify(earnedBadges));
    localStorage.setItem('currentStreak', currentStreak.toString());
    localStorage.setItem('totalPoints', totalPoints.toString());
  }, [completedModules, earnedBadges, currentStreak, totalPoints]);

  const completeModule = (moduleId) => {
    if (!completedModules.includes(moduleId)) {
      // Update completed modules first
      const updatedModules = [...completedModules, moduleId];
      setCompletedModules(updatedModules);
      
      // Award points
      setTotalPoints(prev => prev + 100);
      
      // Update streak
      const lastActive = localStorage.getItem('lastActiveDate');
      const today = new Date().toDateString();
      
      if (lastActive === today) {
        // Already active today, no streak update needed
      } else if (lastActive === new Date(Date.now() - 86400000).toDateString()) {
        // Yesterday - increment streak
        setCurrentStreak(prev => prev + 1);
      } else {
        // Not consecutive - reset streak to 1
        setCurrentStreak(1);
      }
      localStorage.setItem('lastActiveDate', today);
      
      // Award module-specific badges
      const badgeMap = {
        'money': 'money-master',
        'hashing': 'hash-hero',
        'keys': 'key-master',
        'transactions': 'tx-builder',
        'mining': 'mining-master',
        'scripts': 'script-decoder',
        'merkle': 'merkle-maven',
        'custody': 'custody-captain'
      };
      
      if (badgeMap[moduleId]) {
        earnBadge(badgeMap[moduleId]);
      }
      
      // Check if all modules completed for graduate badge
      if (updatedModules.length === MODULES.length) {
        earnBadge('bitcoin-graduate');
      }
    }
  };

  const earnBadge = (badgeId) => {
    if (!earnedBadges.includes(badgeId)) {
      setEarnedBadges(prev => [...prev, badgeId]);
      setTotalPoints(prev => prev + 50);
    }
  };

  const getProgressPercentage = () => {
    return (completedModules.length / MODULES.length) * 100;
  };

  const isModuleCompleted = (moduleId) => {
    return completedModules.includes(moduleId);
  };

  const getBadgeDetails = (badgeId) => {
    return BADGES.find(badge => badge.id === badgeId);
  };

  const value = {
    completedModules,
    earnedBadges,
    currentStreak,
    totalPoints,
    completeModule,
    earnBadge,
    getProgressPercentage,
    isModuleCompleted,
    getBadgeDetails,
    modules: MODULES,
    badges: BADGES
  };

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
}; 