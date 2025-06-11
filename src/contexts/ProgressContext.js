import React, { createContext, useContext, useState, useEffect } from 'react';

const ProgressContext = createContext();

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};

const MODULES = [
  'numbers',
  'hashing', 
  'mining',
  'keys',
  'transactions',
  'scripts',
  'merkle',
  'custody'
];

const BADGES = [
  { id: 'hash-hero', name: 'Hash Hero', description: 'Completed hashing module' },
  { id: 'key-master', name: 'Key Master', description: 'Generated keys and addresses' },
  { id: 'tx-builder', name: 'Tx Builder', description: 'Built a transaction' },
  { id: 'mining-master', name: 'Mining Master', description: 'Found a valid hash' },
  { id: 'script-decoder', name: 'Script Decoder', description: 'Decoded Bitcoin scripts' },
  { id: 'merkle-maven', name: 'Merkle Maven', description: 'Computed merkle roots' },
  { id: 'custody-captain', name: 'Custody Captain', description: 'Mastered multisig' },
  { id: 'bitcoin-graduate', name: 'Bitcoin Graduate', description: 'Completed all modules' }
];

export const ProgressProvider = ({ children }) => {
  const [completedModules, setCompletedModules] = useState([]);
  const [earnedBadges, setEarnedBadges] = useState([]);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);

  // Load progress from localStorage on mount
  useEffect(() => {
    const savedProgress = localStorage.getItem('bitcoinLearningProgress');
    if (savedProgress) {
      const progress = JSON.parse(savedProgress);
      setCompletedModules(progress.completedModules || []);
      setEarnedBadges(progress.earnedBadges || []);
      setCurrentStreak(progress.currentStreak || 0);
      setTotalPoints(progress.totalPoints || 0);
    }
  }, []);

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    const progress = {
      completedModules,
      earnedBadges,
      currentStreak,
      totalPoints
    };
    localStorage.setItem('bitcoinLearningProgress', JSON.stringify(progress));
  }, [completedModules, earnedBadges, currentStreak, totalPoints]);

  const completeModule = (moduleId) => {
    if (!completedModules.includes(moduleId)) {
      setCompletedModules(prev => [...prev, moduleId]);
      setTotalPoints(prev => prev + 100);
      setCurrentStreak(prev => prev + 1);
      
      // Award module-specific badges
      const badgeMap = {
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
      if (completedModules.length + 1 === MODULES.length) {
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