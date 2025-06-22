import MoneyModule from '../modules/MoneyModule';
import MoneyDesignerModule from '../modules/MoneyDesignerModule';
import BitcoinBasicsModule from '../modules/BitcoinBasicsModule';
import TransactionsModule from '../modules/TransactionsModule';
import CustodyModule from '../modules/CustodyModule';
import MythsModule from '../modules/MythsModule';
import NumbersModule from '../modules/NumbersModule';
import HashingModule from '../modules/HashingModule';
import KeysModule from '../modules/KeysModule';
import MiningModule from '../modules/MiningModule';
import MerkleModule from '../modules/MerkleModule';
import ScriptsModule from '../modules/ScriptsModule';
import BitcoinToolkitModule from './BitcoinToolkitModule';

export const moduleRegistry = {
  money: {
    id: 'money',
    title: 'Understanding Money',
    description: 'Explore why money exists and how it shapes our world.',
    component: MoneyModule,
    order: 1,
    group: 'fundamentals',
    prerequisites: []
  },
  'money-designer': {
    id: 'money-designer',
    title: 'Design Perfect Money',
    description: 'Learn what makes money work or fail through interactive challenges.',
    component: MoneyDesignerModule,
    order: 1.5,
    group: 'fundamentals',
    prerequisites: ['money']
  },
  'bitcoin-basics': {
    id: 'bitcoin-basics',
    title: 'Bitcoin Basics',
    description: 'Learn the fundamental concepts of Bitcoin.',
    component: BitcoinBasicsModule,
    order: 2,
    group: 'practical',
    prerequisites: []
  },
  transactions: {
    id: 'transactions',
    title: 'Building Transactions',
    description: 'Learn how to send, receive, and track your bitcoin transactions safely.',
    component: TransactionsModule,
    order: 3,
    group: 'practical'
  },
  custody: {
    id: 'custody',
    title: 'Custody & Multisig',
    description: 'Essential security practices and different ways to protect your bitcoin investment.',
    component: CustodyModule,
    order: 4,
    group: 'practical'
  },
  myths: {
    id: 'myths',
    title: 'Bitcoin Myths & Facts',
    description: 'Separate fact from fiction - understand what Bitcoin really is and isn\'t.',
    component: MythsModule,
    order: 5,
    group: 'practical'
  },
  numbers: {
    id: 'numbers',
    title: 'Numbers & Encoding',
    description: 'Dive into how Bitcoin represents and secures information.',
    component: NumbersModule,
    order: 6,
    group: 'technical'
  },
  hashing: {
    id: 'hashing',
    title: 'Hashing',
    description: 'Discover how Bitcoin uses hashing to create tamper-proof records.',
    component: HashingModule,
    order: 7,
    group: 'technical'
  },
  keys: {
    id: 'keys',
    title: 'Key Generation',
    description: 'Understand the cryptography that powers Bitcoin security.',
    component: KeysModule,
    order: 8,
    group: 'technical'
  },
  mining: {
    id: 'mining',
    title: 'Mining Simulator',
    description: 'Understand how Bitcoin mining secures the network through proof-of-work.',
    component: MiningModule,
    order: 9,
    group: 'advanced'
  },
  merkle: {
    id: 'merkle',
    title: 'Merkle Trees',
    description: 'Learn how Bitcoin efficiently verifies transactions using Merkle trees.',
    component: MerkleModule,
    order: 10,
    group: 'advanced'
  },
  scripts: {
    id: 'scripts',
    title: 'Script Explorer',
    description: 'Explore how Bitcoin can be programmed for advanced use cases.',
    component: ScriptsModule,
    order: 11,
    group: 'advanced'
  },
  'bitcoin-toolkit': {
    id: 'bitcoin-toolkit',
    title: 'Hands-On Bitcoin Toolkit',
    description: 'Get practical experience with Bitcoin wallets, keys, and transactions.',
    component: BitcoinToolkitModule,
    prerequisites: ['money', 'bitcoin-basics']
  }
};

export const getAllModules = () => {
  return Object.values(moduleRegistry).sort((a, b) => a.order - b.order);
}; 