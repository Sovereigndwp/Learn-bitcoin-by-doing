import MoneyModule from '../modules/MoneyModule';
import NumbersModule from '../modules/NumbersModule';
import HashingModule from '../modules/HashingModule';

export const moduleRegistry = {
  money: {
    id: 'money',
    title: 'What Makes Good Money?',
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
  }
};

export const getModuleById = (id) => moduleRegistry[id];

export const getAllModules = () => {
  return Object.values(moduleRegistry).sort((a, b) => a.order - b.order);
}; 