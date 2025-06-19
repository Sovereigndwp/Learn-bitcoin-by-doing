import MoneyModule from '../modules/MoneyModule';
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

export const moduleRegistry = {
  money: {
    id: 'money',
    title: 'Money Fundamentals: The Foundation of Bitcoin',
    description: 'Start your Bitcoin journey by understanding what money is, how it evolved, and why Bitcoin represents the next leap forward in monetary technology.',
    component: MoneyModule,
    order: 1,
    group: 'fundamentals'
  },
  'bitcoin-basics': {
    id: 'bitcoin-basics',
    title: 'Bitcoin Basics: Your First Steps',
    description: 'Learn how to get started with Bitcoin - from choosing a wallet to buying your first bitcoin.',
    component: BitcoinBasicsModule,
    order: 2,
    group: 'practical'
  },
  transactions: {
    id: 'transactions',
    title: 'Sending & Receiving Bitcoin',
    description: 'Learn how to send, receive, and track your bitcoin transactions safely.',
    component: TransactionsModule,
    order: 3,
    group: 'practical'
  },
  custody: {
    id: 'custody',
    title: 'Securing Your Bitcoin',
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
    title: 'Digital Fingerprints',
    description: 'Discover how Bitcoin uses hashing to create tamper-proof records.',
    component: HashingModule,
    order: 7,
    group: 'technical'
  },
  keys: {
    id: 'keys',
    title: 'Keys & Addresses',
    description: 'Understand the cryptography that powers Bitcoin security.',
    component: KeysModule,
    order: 8,
    group: 'technical'
  },
  mining: {
    id: 'mining',
    title: 'Mining & Network Security',
    description: 'Understand how Bitcoin mining secures the network through proof-of-work.',
    component: MiningModule,
    order: 9,
    group: 'advanced'
  },
  merkle: {
    id: 'merkle',
    title: 'Merkle Trees & Scaling',
    description: 'Learn how Bitcoin efficiently verifies transactions using Merkle trees.',
    component: MerkleModule,
    order: 10,
    group: 'advanced'
  },
  scripts: {
    id: 'scripts',
    title: 'Bitcoin Scripts & Smart Contracts',
    description: 'Explore how Bitcoin can be programmed for advanced use cases.',
    component: ScriptsModule,
    order: 11,
    group: 'advanced'
  }
};

export const getAllModules = () => {
  return Object.values(moduleRegistry).sort((a, b) => a.order - b.order);
}; 