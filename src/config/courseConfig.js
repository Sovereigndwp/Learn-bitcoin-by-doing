export const course = [
  {
    id: 'money',
    title: 'Understanding Money',
    overview: '/module/money',
    lessons: [
      { 
        id: 'barter', 
        title: 'Barter Problem',
        views: ['intro', 'scenario1', 'scenario2', 'summary'] 
      },
      { 
        id: 'properties', 
        title: 'Money Properties',
        views: ['intro', 'example1', 'example2', 'wrapUp'] 
      },
      { 
        id: 'infrastructure', 
        title: 'Payment Infrastructure',
        views: ['intro', 'step1', 'step2', 'analysis'] 
      },
      { 
        id: 'digital-scarcity', 
        title: 'Digital Scarcity',
        views: ['intro'] 
      },
      { 
        id: 'experiments', 
        title: 'Money Experiments',
        views: ['intro', 'q1', 'q2', 'q3', 'wrapUp'] 
      },
      { 
        id: 'scorecard', 
        title: 'Money Scorecard',
        views: ['intro', 'deepDive', 'ready'] 
      },
      { 
        id: 'apply-scorecard', 
        title: 'Apply Scorecard',
        views: ['compare', 'results'] 
      },
    ]
  },
  {
    id: 'bitcoin-basics',
    title: 'Bitcoin Basics',
    overview: '/module/bitcoin-basics',
    lessons: [
      { 
        id: 'promise', 
        title: 'Bitcoin Promise',
        views: ['intro'] 
      },
      { 
        id: 'what-is-bitcoin', 
        title: 'What is Bitcoin?',
        views: ['intro', 'key-features', 'simple-explanation'] 
      },
      { 
        id: 'how-it-works', 
        title: 'How Bitcoin Works',
        views: ['intro', 'pow', 'keys'] 
      },
      { 
        id: 'why-valuable', 
        title: 'Why Bitcoin is Valuable',
        views: ['intro', 'examples'] 
      },
      { 
        id: 'compare', 
        title: 'Compare Systems',
        views: ['intro', 'interactive'] 
      },
      { 
        id: 'complete', 
        title: 'Module Complete',
        views: ['summary'] 
      },
    ]
  },
  {
    id: 'numbers',
    title: 'Number Systems',
    overview: '/module/numbers',
    lessons: [
      { 
        id: 'binary', 
        title: 'Binary Systems',
        views: ['intro', 'conversion', 'practice'] 
      },
      { 
        id: 'hexadecimal', 
        title: 'Hexadecimal',
        views: ['intro', 'examples', 'applications'] 
      },
      { 
        id: 'encoding', 
        title: 'Data Encoding',
        views: ['intro', 'base58', 'applications'] 
      },
    ]
  },
  {
    id: 'hashing',
    title: 'Cryptographic Hashing',
    overview: '/module/hashing',
    lessons: [
      { 
        id: 'hash-properties', 
        title: 'Hash Properties',
        views: ['intro', 'properties', 'examples'] 
      },
      { 
        id: 'sha256', 
        title: 'SHA-256',
        views: ['intro', 'implementation', 'practice'] 
      },
      { 
        id: 'applications', 
        title: 'Bitcoin Applications',
        views: ['intro', 'proof-of-work', 'merkle-trees'] 
      },
    ]
  },
  {
    id: 'keys',
    title: 'Keys & Addresses',
    overview: '/module/keys',
    lessons: [
      { 
        id: 'private-keys', 
        title: 'Private Keys',
        views: ['intro', 'generation', 'security'] 
      },
      { 
        id: 'public-keys', 
        title: 'Public Keys',
        views: ['intro', 'derivation', 'elliptic-curves'] 
      },
      { 
        id: 'addresses', 
        title: 'Bitcoin Addresses',
        views: ['intro', 'types', 'generation'] 
      },
    ]
  },
  {
    id: 'transactions',
    title: 'Bitcoin Transactions',
    overview: '/module/transactions',
    lessons: [
      { 
        id: 'utxo', 
        title: 'UTXO Model',
        views: ['intro', 'examples', 'practice'] 
      },
      { 
        id: 'structure', 
        title: 'Transaction Structure',
        views: ['intro', 'inputs-outputs', 'scripts'] 
      },
      { 
        id: 'fees', 
        title: 'Transaction Fees',
        views: ['intro', 'calculator', 'optimization'] 
      },
    ]
  },
  {
    id: 'scripts',
    title: 'Bitcoin Scripts',
    overview: '/module/scripts',
    lessons: [
      { 
        id: 'script-language', 
        title: 'Script Language',
        views: ['intro', 'opcodes', 'stack'] 
      },
      { 
        id: 'standard-scripts', 
        title: 'Standard Scripts',
        views: ['p2pkh', 'p2sh', 'segwit'] 
      },
      { 
        id: 'advanced', 
        title: 'Advanced Scripts',
        views: ['multisig', 'timelocks', 'conditions'] 
      },
    ]
  },
  {
    id: 'merkle',
    title: 'Merkle Trees',
    overview: '/module/merkle',
    lessons: [
      { 
        id: 'concept', 
        title: 'Merkle Tree Concept',
        views: ['intro', 'structure', 'properties'] 
      },
      { 
        id: 'construction', 
        title: 'Building Merkle Trees',
        views: ['intro', 'hashing', 'practice'] 
      },
      { 
        id: 'proofs', 
        title: 'Merkle Proofs',
        views: ['intro', 'verification', 'spv'] 
      },
    ]
  },
  {
    id: 'mining',
    title: 'Bitcoin Mining',
    overview: '/module/mining',
    lessons: [
      { 
        id: 'proof-of-work', 
        title: 'Proof of Work',
        views: ['intro', 'difficulty', 'nonce'] 
      },
      { 
        id: 'mining-process', 
        title: 'Mining Process',
        views: ['intro', 'block-creation', 'rewards'] 
      },
      { 
        id: 'network', 
        title: 'Mining Network',
        views: ['intro', 'pools', 'economics'] 
      },
    ]
  },
  {
    id: 'custody',
    title: 'Bitcoin Custody',
    overview: '/module/custody',
    lessons: [
      { 
        id: 'wallet-types', 
        title: 'Wallet Types',
        views: ['intro', 'hot-cold', 'hardware'] 
      },
      { 
        id: 'security', 
        title: 'Security Practices',
        views: ['intro', 'backup', 'recovery'] 
      },
      { 
        id: 'multisig', 
        title: 'Multisig Setup',
        views: ['intro', 'configuration', 'best-practices'] 
      },
    ]
  },
  {
    id: 'lightning',
    title: 'Lightning Network',
    overview: '/module/lightning',
    lessons: [
      { 
        id: 'concepts', 
        title: 'Lightning Concepts',
        views: ['intro', 'channels', 'routing'] 
      },
      { 
        id: 'setup', 
        title: 'Setting Up Lightning',
        views: ['intro', 'node-setup', 'channels'] 
      },
      { 
        id: 'usage', 
        title: 'Using Lightning',
        views: ['intro', 'payments', 'invoices'] 
      },
    ]
  },
  {
    id: 'bitcoin-toolkit',
    title: 'Bitcoin Toolkit',
    overview: '/module/bitcoin-toolkit',
    lessons: [
      { 
        id: 'tools', 
        title: 'Essential Tools',
        views: ['intro', 'explorers', 'calculators'] 
      },
      { 
        id: 'development', 
        title: 'Development Tools',
        views: ['intro', 'libraries', 'testing'] 
      },
      { 
        id: 'resources', 
        title: 'Learning Resources',
        views: ['intro', 'documentation', 'community'] 
      },
    ]
  },
  {
    id: 'myths',
    title: 'Bitcoin Myths',
    overview: '/module/myths',
    lessons: [
      { 
        id: 'common-myths', 
        title: 'Common Myths',
        views: ['intro', 'energy', 'criminality'] 
      },
      { 
        id: 'misconceptions', 
        title: 'Technical Misconceptions',
        views: ['intro', 'scaling', 'quantum'] 
      },
      { 
        id: 'facts', 
        title: 'The Facts',
        views: ['intro', 'evidence', 'conclusion'] 
      },
    ]
  },
  {
    id: 'advanced-topics',
    title: 'Advanced Topics',
    overview: '/module/advanced-topics',
    lessons: [
      { 
        id: 'privacy', 
        title: 'Privacy Techniques',
        views: ['intro', 'coinjoin', 'steganography'] 
      },
      { 
        id: 'scaling', 
        title: 'Scaling Solutions',
        views: ['intro', 'layer2', 'sidechains'] 
      },
      { 
        id: 'future', 
        title: 'Future Developments',
        views: ['intro', 'taproot', 'research'] 
      },
    ]
  }
];

// Helper function to get all views (used by routing)
export function getAllViews() {
  return course.flatMap(module => 
    module.lessons.flatMap(lesson => 
      lesson.views.map(view => ({
        moduleId: module.id,
        lessonId: lesson.id,
        viewId: view,
        path: `/module/${module.id}/${lesson.id}/${view}`
      }))
    )
  );
}
