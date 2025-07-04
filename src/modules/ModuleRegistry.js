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
  money: {
    id: 'money',
    title: 'If you don\'t define money, it will define you',
    description: 'Explore why money exists and how it shapes our world.',
    component: MoneyModule,
    order: 1,
    group: 'fundamentals',
    prerequisites: []
  },
  'bitcoin-basics': {
    id: 'bitcoin-basics',
    title: 'Bitcoin 101, But Actually Useful',
    description: 'Learn the fundamental concepts of Bitcoin.',
    component: BitcoinBasicsModule,
    order: 2,
    group: 'practical',
    prerequisites: []
  },
  numbers: {
    id: 'numbers',
    title: 'Numbers & Encoding',
    description: 'Learn how computers represent and secure information using different number systems.',
    component: NumbersModule,
    order: 3,
    group: 'technical',
    prerequisites: []
  },
  hashing: {
    id: 'hashing',
    title: 'Digital Fingerprints',
    description: 'Discover how Bitcoin uses SHA-256 hashing to create tamper-proof digital fingerprints.',
    component: HashingModule,
    order: 4,
    group: 'technical',
    prerequisites: ['numbers']
  },
  mining: {
    id: 'mining',
    title: 'Energy → Security: How Bitcoin Transforms Physics into Trust',
    description: 'Discover how Bitcoin transforms electrical energy into mathematical proof that creates unbreakable digital security.',
    component: MiningModule,
    order: 5,
    group: 'advanced',
    prerequisites: ['hashing']
  },
  keys: {
    id: 'keys',
    title: 'Digital Sovereignty: Your Keys, Your Bitcoin',
    description: 'Master the cryptographic foundations of true financial independence—from entropy to addresses, HD wallets to Lightning Network.',
    component: KeysModule,
    order: 6,
    group: 'technical',
    prerequisites: ['numbers']
  },
  transactions: {
    id: 'transactions',
    title: 'Bitcoin Transactions: Digital Money in Motion',
    description: 'Master UTXOs, transaction building, fee markets, privacy techniques, and how Bitcoin moves around the world.',
    component: TransactionsModule,
    order: 7,
    group: 'practical',
    prerequisites: ['keys']
  },
  scripts: {
    id: 'scripts',
    title: 'Digital Spells',
    description: 'Learn how Bitcoin scripts enable programmable money.',
    component: ScriptsModule,
    order: 8,
    group: 'advanced',
    prerequisites: ['transactions']
  },
  merkle: {
    id: 'merkle',
    title: 'The Family Tree of Transactions',
    description: 'Discover how Merkle trees make Bitcoin scalable and verifiable.',
    component: MerkleModule,
    order: 9,
    group: 'advanced',
    prerequisites: ['hashing', 'transactions']
  },
  custody: {
    id: 'custody',
    title: 'Securing Your Future',
    description: 'Learn about different ways to secure and manage your Bitcoin.',
    component: CustodyModule,
    order: 10,
    group: 'practical',
    prerequisites: ['keys']
  },
  myths: {
    id: 'myths',
    title: 'Myth Busters: Bitcoin Edition',
    description: 'Explore and debunk common Bitcoin myths and misconceptions.',
    component: MythsModule,
    order: 11,
    group: 'practical',
    prerequisites: []
  },
  'bitcoin-toolkit': {
    id: 'bitcoin-toolkit',
    title: 'Hands-On Bitcoin Toolkit',
    description: 'Get practical experience with Bitcoin wallets, keys, and transactions.',
    component: BitcoinToolkitModule,
    order: 12,
    group: 'practical',
    prerequisites: ['money', 'bitcoin-basics']
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