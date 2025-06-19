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
    title: 'Money Fundamentals: The Foundation of Bitcoin',
    description: 'Start your Bitcoin journey by understanding what money is, how it evolved, and why Bitcoin represents the next leap forward in monetary technology.',
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
    title: 'Bitcoin Scripts',
    description: 'Dive into Bitcoin\'s scripting language and how it enables smart contracts.',
    component: ScriptsModule,
    order: 7
  },
  merkle: {
    id: 'merkle',
    title: 'Merkle Trees',
    description: 'Learn how Bitcoin efficiently verifies transactions using Merkle trees.',
    component: MerkleModule,
    order: 8
  },
  custody: {
    id: 'custody',
    title: 'Bitcoin Custody',
    description: 'Master different ways to secure and manage Bitcoin.',
    component: CustodyModule,
    order: 9
  },
  myths: {
    id: 'myths',
    title: 'Myths & Misconceptions',
    description: 'Explore and debunk common Bitcoin myths and misconceptions.',
    component: MythsModule,
    order: 10
  }
}; 