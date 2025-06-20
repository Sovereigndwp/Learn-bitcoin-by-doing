import MoneyModule from '../modules/MoneyModule';
import NumbersModule from '../modules/NumbersModule';
import HashingModule from '../modules/HashingModule';
import MiningModule from '../modules/MiningModule';
import KeysModule from '../modules/KeysModule';
import TransactionsModule from '../modules/TransactionsModule';
import ScriptsModule from '../modules/ScriptsModule';
import MerkleModule from '../modules/MerkleModule';
import CustodyModule from '../modules/CustodyModule';
import MythsModule from '../modules/MythsModule';

export const moduleRegistry = {
  money: {
    id: 'money',
    title: 'If you don\'t define money, it will define you',
    description: 'Explore the essential properties of money and discover why Bitcoin is uniquely suited to be the money of the digital age.',
    component: MoneyModule,
    order: 1
  },
  numbers: {
    id: 'numbers',
    title: 'Numbers & Encoding',
    description: 'Learn how computers represent and secure information using different number systems.',
    component: NumbersModule,
    order: 2
  },
  hashing: {
    id: 'hashing',
    title: 'Digital Fingerprints',
    description: 'Discover how Bitcoin uses SHA-256 hashing to create tamper-proof digital fingerprints.',
    component: HashingModule,
    order: 3
  },
  mining: {
    id: 'mining',
    title: 'The World\'s Most Expensive Puzzle Game',
    description: 'Understand how Bitcoin mining secures the network through proof-of-work.',
    component: MiningModule,
    order: 4
  },
  keys: {
    id: 'keys',
    title: 'Keys to the Kingdom',
    description: 'Learn about public key cryptography and how Bitcoin uses digital signatures.',
    component: KeysModule,
    order: 5
  },
  transactions: {
    id: 'transactions',
    title: 'Building Blocks',
    description: 'Explore how Bitcoin transactions work and how they\'re structured.',
    component: TransactionsModule,
    order: 6
  },
  scripts: {
    id: 'scripts',
    title: 'Digital Spells',
    description: 'Learn how Bitcoin scripts enable programmable money.',
    component: ScriptsModule,
    order: 7
  },
  merkle: {
    id: 'merkle',
    title: 'The Family Tree of Transactions',
    description: 'Discover how Merkle trees make Bitcoin scalable and verifiable.',
    component: MerkleModule,
    order: 8
  },
  custody: {
    id: 'custody',
    title: 'Securing Your Future',
    description: 'Learn about different ways to secure and manage your Bitcoin.',
    component: CustodyModule,
    order: 9
  },
  myths: {
    id: 'myths',
    title: 'Myth Busters: Bitcoin Edition',
    description: 'Explore and debunk common Bitcoin myths and misconceptions.',
    component: MythsModule,
    order: 10
  }
};

export const getModuleById = (id) => moduleRegistry[id];

export const getAllModules = () => {
  return Object.values(moduleRegistry).sort((a, b) => a.order - b.order);
}; 