import MoneyModule from './MoneyModule';
import BitcoinBasicsModule from './BitcoinBasicsModule';
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
  // Core Foundations - Essential understanding before diving deeper
  money: {
    id: 'money',
    title: 'Understanding Money',
    description: 'Explore what money is, how it evolved, and why our current system has structural problems.',
    component: MoneyModule,
    order: 1,
    group: 'foundations',
    prerequisites: []
  },
  'bitcoin-basics': {
    id: 'bitcoin-basics',
    title: 'Bitcoin Fundamentals',
    description: 'Learn what Bitcoin is, how it works, and why it represents a different approach to money.',
    component: BitcoinBasicsModule,
    order: 2,
    group: 'foundations',
    prerequisites: ['money']
  },

  // Technical Building Blocks - Core knowledge needed for everything else
  numbers: {
    id: 'numbers',
    title: 'Number Systems & Data Representation',
    description: 'Learn how computers represent numbers and data - essential for understanding Bitcoin.',
    component: NumbersModule,
    order: 3,
    group: 'technical-blocks',
    prerequisites: ['bitcoin-basics']
  },
  hashing: {
    id: 'hashing',
    title: 'Cryptographic Hashing',
    description: 'Understand how Bitcoin uses mathematical functions to create secure digital fingerprints.',
    component: HashingModule,
    order: 4,
    group: 'technical-blocks',
    prerequisites: ['numbers']
  },
  mining: {
    id: 'mining',
    title: 'Bitcoin Mining',
    description: 'Learn how Bitcoin creates new coins and secures the network through proof-of-work.',
    component: MiningModule,
    order: 5,
    group: 'technical-blocks',
    prerequisites: ['hashing']
  },

  // Bitcoin Mechanics - How Bitcoin actually works under the hood
  keys: {
    id: 'keys',
    title: 'Private Keys & Addresses',
    description: 'Master Bitcoin ownership through cryptographic keys and address generation.',
    component: KeysModule,
    order: 6,
    group: 'bitcoin-mechanics',
    prerequisites: ['mining']
  },
  transactions: {
    id: 'transactions',
    title: 'Bitcoin Transactions',
    description: 'Understand how Bitcoin moves value through the transaction system.',
    component: TransactionsModule,
    order: 7,
    group: 'bitcoin-mechanics',
    prerequisites: ['keys']
  },
  scripts: {
    id: 'scripts',
    title: 'Bitcoin Scripts',
    description: 'Learn how Bitcoin uses programmable conditions to control spending.',
    component: ScriptsModule,
    order: 8,
    group: 'bitcoin-mechanics',
    prerequisites: ['transactions']
  },
  merkle: {
    id: 'merkle',
    title: 'Merkle Trees',
    description: 'Discover how Bitcoin efficiently verifies large amounts of data using tree structures.',
    component: MerkleModule,
    order: 9,
    group: 'bitcoin-mechanics',
    prerequisites: ['scripts']
  },

  // Practical Mastery - Real-world application and advanced topics
  custody: {
    id: 'custody',
    title: 'Self-Custody & Security',
    description: 'Learn practical strategies for safely storing and managing your Bitcoin.',
    component: CustodyModule,
    order: 10,
    group: 'practical-mastery',
    prerequisites: ['merkle']
  },
  lightning: {
    id: 'lightning',
    title: 'Lightning Network',
    description: 'Understand Bitcoin\'s second layer for fast, cheap payments.',
    component: LightningModule,
    order: 11,
    group: 'practical-mastery',
    prerequisites: ['custody']
  },
  'advanced-topics': {
    id: 'advanced-topics',
    title: 'Advanced Bitcoin Topics',
    description: 'Explore cutting-edge Bitcoin technology and future developments.',
    component: AdvancedTopicsModule,
    order: 12,
    group: 'practical-mastery',
    prerequisites: ['lightning']
  },
  myths: {
    id: 'myths',
    title: 'Bitcoin Myths & Facts',
    description: 'Examine common misconceptions about Bitcoin with evidence and data.',
    component: MythsModule,
    order: 13,
    group: 'practical-mastery',
    prerequisites: ['advanced-topics']
  },
  'bitcoin-toolkit': {
    id: 'bitcoin-toolkit',
    title: 'Bitcoin Tools & Practice',
    description: 'Hands-on experience with Bitcoin tools and real-world applications.',
    component: BitcoinToolkitModule,
    order: 14,
    group: 'practical-mastery',
    prerequisites: ['myths']
  }
};

// Group definitions with emojis and descriptions
export const moduleGroups = {
  'foundations': {
    title: '🎯 Core Foundations',
    description: 'Essential understanding before diving deeper',
    emoji: '🎯',
    order: 1
  },
  'technical-blocks': {
    title: '🔧 Technical Building Blocks',
    description: 'Core knowledge needed for everything else',
    emoji: '🔧',
    order: 2
  },
  'bitcoin-mechanics': {
    title: '⚙️ Bitcoin Mechanics',
    description: 'How Bitcoin actually works under the hood',
    emoji: '⚙️',
    order: 3
  },
  'practical-mastery': {
    title: '🚀 Practical Mastery',
    description: 'Real-world application and advanced topics',
    emoji: '🚀',
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