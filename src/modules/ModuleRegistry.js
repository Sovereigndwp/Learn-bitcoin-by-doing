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
import MythsModule from './MythsModule';
import BitcoinToolkitModule from './BitcoinToolkitModule';

export const moduleRegistry = {
  // Core Foundations - Essential understanding before diving deeper
  money: {
    id: 'money',
    title: 'If you don\'t define money, it will define you',
    description: 'Discover why money exists, how it evolved, and why the current system is broken.',
    component: MoneyModule,
    order: 1,
    group: 'foundations',
    prerequisites: []
  },
  'bitcoin-basics': {
    id: 'bitcoin-basics',
    title: 'Bitcoin 101, But Actually Useful',
    description: 'Learn Bitcoin\'s revolutionary approach to money and why it matters for humanity.',
    component: BitcoinBasicsModule,
    order: 2,
    group: 'foundations',
    prerequisites: ['money']
  },

  // Technical Building Blocks - Core knowledge needed for everything else
  numbers: {
    id: 'numbers',
    title: 'Numbers & Encoding',
    description: 'Learn how computers represent and secure information using different number systems.',
    component: NumbersModule,
    order: 3,
    group: 'technical-blocks',
    prerequisites: ['bitcoin-basics']
  },
  hashing: {
    id: 'hashing',
    title: 'Digital Fingerprints (SHA-256)',
    description: 'Discover how Bitcoin uses cryptographic hashing to create tamper-proof digital fingerprints.',
    component: HashingModule,
    order: 4,
    group: 'technical-blocks',
    prerequisites: ['numbers']
  },
  keys: {
    id: 'keys',
    title: 'Digital Sovereignty: Your Keys, Your Bitcoin',
    description: 'Master cryptographic ownership—from entropy to addresses, HD wallets to self-custody.',
    component: KeysModule,
    order: 5,
    group: 'technical-blocks',
    prerequisites: ['hashing']
  },

  // Bitcoin Mechanics - How Bitcoin actually works
  transactions: {
    id: 'transactions',
    title: 'Bitcoin Transactions: Digital Money in Motion',
    description: 'Master UTXOs, transaction building, fee markets, and how Bitcoin moves around the world.',
    component: TransactionsModule,
    order: 6,
    group: 'bitcoin-mechanics',
    prerequisites: ['keys']
  },
  scripts: {
    id: 'scripts',
    title: 'Bitcoin Scripts: Programming Money',
    description: 'Master stack operations, multisig, timelocks, and smart contracts on Bitcoin.',
    component: ScriptsModule,
    order: 7,
    group: 'bitcoin-mechanics',
    prerequisites: ['transactions']
  },
  merkle: {
    id: 'merkle',
    title: 'Merkle Trees: Bitcoin\'s Efficient Data Structure',
    description: 'Understand how Bitcoin organizes millions of transactions with logarithmic efficiency.',
    component: MerkleModule,
    order: 8,
    group: 'bitcoin-mechanics',
    prerequisites: ['hashing', 'transactions']
  },
  mining: {
    id: 'mining',
    title: 'Energy → Security: How Bitcoin Transforms Physics into Trust',
    description: 'Discover how Bitcoin transforms electrical energy into unbreakable digital security.',
    component: MiningModule,
    order: 9,
    group: 'bitcoin-mechanics',
    prerequisites: ['merkle']
  },

  // Practical Mastery - Real-world application and advanced topics
  custody: {
    id: 'custody',
    title: 'Securing Your Future: Bitcoin Custody Mastery',
    description: 'Learn to securely store and manage your Bitcoin across all scenarios.',
    component: CustodyModule,
    order: 10,
    group: 'practical-mastery',
    prerequisites: ['keys', 'scripts']
  },
  'bitcoin-toolkit': {
    id: 'bitcoin-toolkit',
    title: 'Hands-On Bitcoin Toolkit',
    description: 'Get practical experience building wallets, creating transactions, and using Bitcoin tools.',
    component: BitcoinToolkitModule,
    order: 11,
    group: 'practical-mastery',
    prerequisites: ['custody']
  },
  myths: {
    id: 'myths',
    title: 'Myth Busters: Bitcoin Edition',
    description: 'Debunk common Bitcoin myths with deep technical and economic understanding.',
    component: MythsModule,
    order: 12,
    group: 'practical-mastery',
    prerequisites: ['mining']
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
export const getNextModule = (completedModules) => {
  const allModules = getAllModules();
  
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
export const getUnlockedModules = (completedModules) => {
  const allModules = getAllModules();
  
  return allModules.filter(module => {
    return module.prerequisites.every(prereq => 
      completedModules.includes(prereq)
    );
  });
}; 