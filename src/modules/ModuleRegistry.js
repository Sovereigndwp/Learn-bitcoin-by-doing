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
    title: 'Who Holds the Keys to Your Kingdom?',
    description: 'Master the art of not losing Bitcoin through advanced custody strategies and real-world scenarios.',
    component: CustodyModule,
    order: 10,
    group: 'practical-mastery',
    prerequisites: ['keys', 'scripts']
  },
  lightning: {
    id: 'lightning',
    title: 'Lightning Network: Instant Bitcoin',
    description: 'Master Bitcoin\'s scaling solution: payment channels, routing, network topology, and real-world Lightning applications.',
    component: LightningModule,
    order: 11,
    group: 'practical-mastery',
    prerequisites: ['transactions', 'scripts']
  },
  'advanced-topics': {
    id: 'advanced-topics',
    title: 'Advanced Bitcoin Topics',
    description: 'Cutting-edge Bitcoin technology: Taproot, Schnorr signatures, Layer 2 solutions, consensus mechanisms, and future innovations.',
    component: AdvancedTopicsModule,
    order: 12,
    group: 'practical-mastery',
    prerequisites: ['lightning', 'scripts', 'merkle']
  },
  'bitcoin-toolkit': {
    id: 'bitcoin-toolkit',
    title: 'Bitcoin Developer Toolkit',
    description: 'Master Bitcoin through 19 professional tools: wallets, transactions, network analysis, and development utilities.',
    component: BitcoinToolkitModule,
    order: 13,
    group: 'practical-mastery',
    prerequisites: ['transactions', 'scripts']
  },
  myths: {
    id: 'myths',
    title: 'Bitcoin Myths: The Technical Truth',
    description: 'Expert-level myth busting with 12 comprehensive debunks, technical evidence, data comparisons, and credible sources.',
    component: MythsModule,
    order: 14,
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