import MoneyModule from './MoneyModule';
import BitcoinBasicsModule from './BitcoinBasicsModule';
import WhyBitcoinMattersModule from './WhyBitcoinMattersModule';
import MoneyJourneyModule from './fundamentals/MoneyJourneyModule';
import GoodMoneyModule from './fundamentals/GoodMoneyModule';
import NumbersModule from './NumbersModule';
import HashingModule from './HashingModule';
import MiningModule from './MiningModule';
import KeysModule from './KeysModule';
import TransactionsModule from './TransactionsModule';
import ScriptsModule from './ScriptsModule';
import MerkleModule from './MerkleModule';
import CustodyModule from './CustodyModule';
import LightningModule from './LightningModule';
import AdvancedTopicsModule from './AdvancedTopicsModule';
import MythsModule from './MythsModule';
import BitcoinToolkitModule from './BitcoinToolkitModule';

export const moduleRegistry = {
  // Fundamentals: Complete Sequence from Problem to Solution
  'wake-up-call': {
    id: 'wake-up-call',
    title: 'Wake-Up Call: The Money Problem',
    description: 'Open your eyes with shocking, relatable examples of money system failures happening right now.',
    component: WhyBitcoinMattersModule,
    order: 1,
    group: 'fundamentals',
    prerequisites: []
  },
  'money-journey': {
    id: 'money-journey',
    title: 'The Journey of Money: From Rocks to Digital',
    description: 'Explore the evolution from barter to Bitcoin through relatable everyday examples.',
    component: MoneyJourneyModule,
    order: 2,
    group: 'fundamentals',
    prerequisites: ['wake-up-call']
  },
  'good-money': {
    id: 'good-money',
    title: 'What Makes Good Money',
    description: 'Learn the essential properties and functions that make money work for people.',
    component: GoodMoneyModule,
    order: 3,
    group: 'fundamentals',
    prerequisites: ['money-journey']
  },
  'money-goes-bad': {
    id: 'money-goes-bad',
    title: 'When Good Money Goes Bad',
    description: 'Case studies of money failures and the patterns that lead to financial crisis.',
    component: MythsModule,
    order: 4,
    group: 'fundamentals',
    prerequisites: ['good-money']
  },
  'bitcoin-blueprint': {
    id: 'bitcoin-blueprint',
    title: 'Bitcoin: The Better Blueprint',
    description: 'Discover how Bitcoin addresses every money failure through superior design.',
    component: CustodyModule,
    order: 5,
    group: 'fundamentals',
    prerequisites: ['money-goes-bad']
  },

  // Phase 2: Practical Mastery - Build on the foundation
  'bitcoin-toolkit': {
    id: 'bitcoin-toolkit',
    title: 'Bitcoin Tools & Practice',
    description: 'Hands-on experience with Bitcoin tools and real-world applications.',
    component: BitcoinToolkitModule,
    order: 6,
    group: 'practical-first',
    prerequisites: ['bitcoin-blueprint']
  },
  transactions: {
    id: 'transactions',
    title: 'Bitcoin Transactions',
    description: 'Understand how Bitcoin moves value through the transaction system.',
    component: TransactionsModule,
    order: 7,
    group: 'practical-first',
    prerequisites: ['bitcoin-toolkit']
  },
  keys: {
    id: 'keys',
    title: 'Private Keys & Addresses',
    description: 'Master Bitcoin ownership through cryptographic keys and address generation.',
    component: KeysModule,
    order: 8,
    group: 'practical-first',
    prerequisites: ['transactions']
  },

  // Phase 3: Technical Deep Dive - Now that users see the value, learn the details
  numbers: {
    id: 'numbers',
    title: 'Number Systems & Data',
    description: 'Gentle introduction to how computers represent data - foundation for technical concepts.',
    component: NumbersModule,
    order: 9,
    group: 'technical-deep-dive',
    prerequisites: ['keys']
  },
  hashing: {
    id: 'hashing',
    title: 'Cryptographic Hashing',
    description: 'Understand how Bitcoin uses mathematical functions to create secure digital fingerprints.',
    component: HashingModule,
    order: 10,
    group: 'technical-deep-dive',
    prerequisites: ['numbers']
  },
  mining: {
    id: 'mining',
    title: 'Bitcoin Mining',
    description: 'Learn how Bitcoin creates new coins and secures the network through proof-of-work.',
    component: MiningModule,
    order: 11,
    group: 'technical-deep-dive',
    prerequisites: ['hashing']
  },
  scripts: {
    id: 'scripts',
    title: 'Bitcoin Scripts',
    description: 'Learn how Bitcoin uses programmable conditions to control spending.',
    component: ScriptsModule,
    order: 12,
    group: 'technical-deep-dive',
    prerequisites: ['mining']
  },

  // Phase 4: Advanced Understanding - Complete the comprehensive picture
  merkle: {
    id: 'merkle',
    title: 'Merkle Trees',
    description: 'Discover how Bitcoin efficiently verifies large amounts of data using tree structures.',
    component: MerkleModule,
    order: 13,
    group: 'advanced-mastery',
    prerequisites: ['scripts']
  },
  lightning: {
    id: 'lightning',
    title: 'Lightning Network',
    description: 'Understand Bitcoin\'s second layer for fast, cheap payments.',
    component: LightningModule,
    order: 14,
    group: 'advanced-mastery',
    prerequisites: ['merkle']
  },
  'advanced-topics': {
    id: 'advanced-topics',
    title: 'Advanced Bitcoin Topics',
    description: 'Explore cutting-edge Bitcoin technology and future developments.',
    component: AdvancedTopicsModule,
    order: 15,
    group: 'advanced-mastery',
    prerequisites: ['lightning']
  }
};

// Group definitions with emojis and descriptions - RESTRUCTURED FOR ENGAGEMENT
export const moduleGroups = {
  'fundamentals': {
    title: '🎯 Fundamentals',
    description: 'High-impact journey from money problems to Bitcoin solutions',
    emoji: '🎯',
    order: 1
  },
  'practical-first': {
    title: '🛠️ Practical Skills First',
    description: 'Immediate value - secure and use Bitcoin today',
    emoji: '🛠️',
    order: 2
  },
  'technical-deep-dive': {
    title: '🔬 Technical Deep Dive',
    description: 'How Bitcoin actually works under the hood',
    emoji: '🔬',
    order: 3
  },
  'advanced-mastery': {
    title: '🎓 Advanced Mastery',
    description: 'Complete your Bitcoin understanding',
    emoji: '🎓',
    order: 4
  }
};

export const getModuleById = (id) => moduleRegistry[id];

export const getAllModules = () => {
  return Object.values(moduleRegistry).sort((a, b) => a.order - b.order);
};

export const getModulesByGroup = (group) => {
  return Object.values(moduleRegistry)
    .filter(module => module.group === group)
    .sort((a, b) => a.order - b.order);
};

export const getPrerequisites = (moduleId) => {
  const module = moduleRegistry[moduleId];
  return module ? module.prerequisites : [];
};

// Get the logical next module for a user
export const getNextModule = (completedModules = []) => {
  const allModules = getAllModules();
  
  // Ensure completedModules is an array
  if (!Array.isArray(completedModules)) {
    completedModules = [];
  }
  
  for (const module of allModules) {
    // Check if module is not completed
    if (!completedModules.includes(module.id)) {
      // Check if all prerequisites are completed
      const prerequisitesMet = module.prerequisites.every(prereq => 
        completedModules.includes(prereq)
      );
      
      if (prerequisitesMet) {
        return module;
      }
    }
  }
  
  return null; // All modules completed
};

// Get modules that are currently unlocked for a user
export const getUnlockedModules = (completedModules = []) => {
  const allModules = getAllModules();
  
  // Ensure completedModules is an array
  if (!Array.isArray(completedModules)) {
    completedModules = [];
  }
  
  return allModules.filter(module => {
    return module.prerequisites.every(prereq => 
      completedModules.includes(prereq)
    );
  });
}; 