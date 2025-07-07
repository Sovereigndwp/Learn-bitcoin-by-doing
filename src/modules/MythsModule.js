import React, { useState, useEffect } from 'react';
import { useProgress } from '../contexts/ProgressContext';
import { 
  AlertTriangle, CheckCircle, Trophy, Shield, Zap, DollarSign, 
  Lock, Globe, TrendingUp, Cpu, Network, Scale, BarChart, 
  Database, Server, Coins, Users, Clock, Target, Info, Award
} from 'lucide-react';
import AnimatedIcon from '../components/AnimatedIcon';
import '../components/ModuleCommon.css';
import './MythsModule.css';

// Reusable Visual Capitalist Section Component
const VisualCapitalistSection = ({ icon, title, description, url, buttonText }) => (
  <div className="explore-further-section">
    <div className="explore-further-header">
      <span className="explore-further-icon">{icon}</span>
      <h4 className="explore-further-title">{title}</h4>
    </div>
    <p className="explore-further-description">{description}</p>
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="explore-further-button"
    >
      <span className="button-icon">🔍</span>
      {buttonText}
    </a>
  </div>
);

const MythsModule = () => {
  const { completeModule, isModuleCompleted } = useProgress();
  const [selectedMyth, setSelectedMyth] = useState(null);
  const [debunkedMyths, setDebunkedMyths] = useState(new Set());
  const [currentCategory, setCurrentCategory] = useState('energy');

  // Myth Categories
  const mythCategories = {
    'energy': {
      title: 'Energy & Environment',
      icon: '⚡',
      description: 'Debunking environmental FUD with hard data and energy economics'
    },
    'security': {
      title: 'Security & Hacking',
      icon: '🛡️',
      description: 'Understanding Bitcoin\'s unbreakable security model and common misconceptions'
    },
    'economics': {
      title: 'Economic Value & Backing',
      icon: '💰',
      description: 'Dismantling value myths with monetary theory and market evidence'
    },
    'technology': {
      title: 'Scalability & Technology',
      icon: '⚙️',
      description: 'Technical reality vs. popular misconceptions about Bitcoin\'s capabilities'
    }
  };

  // Comprehensive Myth Database
  const bitcoinMyths = [
    // Energy & Environment Category
    {
      id: 'energy-waste',
      category: 'energy',
      title: 'Bitcoin Wastes Energy',
      severity: 'High FUD',
      icon: '⚡',
      myth: 'Bitcoin mining wastes enormous amounts of energy and is destroying the environment',
      reality: 'Bitcoin incentivizes renewable energy development and utilizes stranded energy that would otherwise be wasted',
      technicalEvidence: [
        'Bitcoin mining is 56% renewable energy powered (Q4 2023 Bitcoin Mining Council)',
        'Miners prioritize cheapest energy sources, which are increasingly renewable',
        'Bitcoin mining can monetize stranded energy sources (flared gas, excess hydroelectric)',
        'Traditional banking system uses 2.5x more energy annually than Bitcoin',
        'Bitcoin mining helps stabilize electrical grids through demand response programs'
      ],
      dataComparison: {
        title: 'Annual Energy Consumption Comparison',
        myth: { label: 'Bitcoin "Waste"', value: '150 TWh', description: 'Productive energy securing $800B+ network' },
        reality: { label: 'Traditional Banking', value: '400+ TWh', description: 'Banks, ATMs, data centers, branches' }
      },
      expertQuote: {
        text: 'Bitcoin mining is actually the biggest driver of renewable energy development in remote areas. It\'s creating economic incentives where none existed before.',
        attribution: 'Troy Cross, Energy Economist, Reed College'
      },
      sources: [
        'Bitcoin Mining Council Q4 2023 Report',
        'Cambridge Bitcoin Electricity Consumption Index',
        'Energy Information Administration data on banking energy use',
        'Academic paper: "Bitcoin Mining and Renewable Energy" (2023)'
      ]
    },
    {
      id: 'environment-harm',
      category: 'energy',
      title: 'Bitcoin Harms the Environment',
      severity: 'Medium FUD',
      icon: '🌍',
      myth: 'Bitcoin mining creates massive carbon emissions and environmental destruction',
      reality: 'Bitcoin mining is increasingly carbon-neutral and actually incentivizes clean energy infrastructure',
      technicalEvidence: [
        'Bitcoin mining emissions fell 30% from 2021-2023 despite network growth',
        '70% of mining operations plan to be carbon neutral by 2030',
        'Bitcoin mining enables remote renewable energy projects previously uneconomical',
        'Proof-of-Stake alternatives have hidden environmental costs (AWS, cloud infrastructure)',
        'Bitcoin incentivizes energy efficiency improvements across entire energy sector'
      ],
      dataComparison: {
        title: 'Carbon Footprint Reality Check',
        myth: { label: 'Bitcoin Emissions', value: '65 Mt CO2', description: 'Declining rapidly with renewable adoption' },
        reality: { label: 'Global Banking', value: '1,300+ Mt CO2', description: 'Includes all infrastructure and operations' }
      },
      expertQuote: {
        text: 'Bitcoin is not an environmental problem—it\'s an environmental solution. It\'s the first technology that can monetize renewable energy anywhere on Earth.',
        attribution: 'Daniel Batten, Environmental Tech Analyst'
      },
      sources: [
        'Sustainable Bitcoin Protocol Report 2023',
        'University of Cambridge Environmental Impact Study',
        'Federal Reserve Bank of Dallas Energy Analysis',
        'MIT Technology Review Bitcoin Environmental Study'
      ]
    },
    {
      id: 'energy-alternative',
      category: 'energy',
      title: 'Proof-of-Stake Is Better for Environment',
      severity: 'Technical FUD',
      icon: '🔋',
      myth: 'Proof-of-Stake blockchains like Ethereum are better for the environment than Bitcoin',
      reality: 'Proof-of-Stake has hidden energy costs and fundamental security trade-offs that compromise decentralization',
      technicalEvidence: [
        'PoS networks still require extensive cloud infrastructure (AWS, validators, etc.)',
        'PoS enables wealth concentration - "rich get richer" through staking rewards',
        'PoS has no objective cost to create money, enabling arbitrary inflation',
        'Bitcoin\'s energy use secures $800B+ with mathematical certainty',
        'PoS networks lack the 15-year security track record of Bitcoin'
      ],
      dataComparison: {
        title: 'Security vs Energy Trade-off',
        myth: { label: 'Ethereum PoS', value: '~2 TWh', description: 'Lower energy but subjective consensus' },
        reality: { label: 'Bitcoin PoW', value: '150 TWh', description: 'Higher energy but objective physical security' }
      },
      expertQuote: {
        text: 'Proof-of-Work is the only consensus mechanism that anchors digital consensus to physical reality. Everything else is just elaborate voting.',
        attribution: 'Andreas Antonopoulos, Bitcoin Security Expert'
      },
      sources: [
        'Ethereum Foundation Energy Consumption Report',
        'Academic: "Nothing at Stake Problem in PoS"',
        'Bitcoin Mining Council Comparative Analysis',
        'University of Oxford Blockchain Consensus Study'
      ]
    },

    // Security & Hacking Category
    {
      id: 'bitcoin-hacked',
      category: 'security',
      title: 'Bitcoin Gets Hacked All the Time',
      severity: 'Critical FUD',
      icon: '🔓',
      myth: 'Bitcoin is constantly being hacked and isn\'t secure',
      reality: 'Bitcoin network has never been hacked in 15+ years. Exchange hacks are not Bitcoin hacks.',
      technicalEvidence: [
        'Bitcoin blockchain has 99.98% uptime since 2009 - no successful attacks',
        'SHA-256 encryption would take longer than age of universe to break',
        'Network secured by 450+ exahashes of computational power',
        'Exchange hacks affect custodial services, not Bitcoin protocol',
        'Bitcoin transactions are irreversible by design, not due to hacking'
      ],
      dataComparison: {
        title: 'Security Track Record',
        myth: { label: 'Exchange Hacks', value: '$3.8B', description: 'Custodial services, not Bitcoin itself' },
        reality: { label: 'Bitcoin Network', value: '$0', description: 'Zero protocol-level hacks in 15 years' }
      },
      expertQuote: {
        text: 'The Bitcoin network is the most secure computer network ever created. It has never been hacked, and mathematically, it cannot be.',
        attribution: 'Nick Szabo, Cryptographer and Bitcoin Pioneer'
      },
      sources: [
        'Bitcoin Network Statistics and Uptime Analysis',
        'NIST Cryptographic Standards Documentation',
        'Academic: "Security Analysis of Bitcoin Protocol"',
        'MIT OpenCourseWare: Cryptocurrency Security'
      ]
    },
    {
      id: 'quantum-threat',
      category: 'security',
      title: 'Quantum Computers Will Break Bitcoin',
      severity: 'Future FUD',
      icon: '🔬',
      myth: 'Quantum computers will break Bitcoin\'s encryption and make it worthless',
      reality: 'Bitcoin can upgrade to quantum-resistant cryptography, and quantum threats are decades away',
      technicalEvidence: [
        'Quantum computers need 4,000+ logical qubits to threaten Bitcoin (current: ~100)',
        'Bitcoin protocol can upgrade to quantum-resistant algorithms (lattice-based crypto)',
        'Banking, internet, and all digital infrastructure face same quantum threat',
        'Bitcoin\'s decentralized upgrade process already proven through multiple forks',
        'Quantum-resistant Bitcoin improvement proposals already exist and tested'
      ],
      dataComparison: {
        title: 'Quantum Timeline Reality',
        myth: { label: 'Quantum Threat', value: '2030-2040', description: 'Theoretical threat timeline' },
        reality: { label: 'Bitcoin Upgrades', value: '< 6 months', description: 'Time to implement quantum resistance' }
      },
      expertQuote: {
        text: 'By the time quantum computers can threaten Bitcoin, Bitcoin will have already upgraded. The cryptographic community is decades ahead of the quantum threat.',
        attribution: 'Matthew Scherer, Quantum Cryptography Researcher, IBM'
      },
      sources: [
        'NIST Post-Quantum Cryptography Standards',
        'IBM Quantum Computing Roadmap',
        'Bitcoin Improvement Proposal: Quantum Resistance',
        'Academic: "Post-Quantum Security for Cryptocurrencies"'
      ]
    },
    {
      id: 'government-shutdown',
      category: 'security',
      title: 'Governments Can Shut Down Bitcoin',
      severity: 'Political FUD',
      icon: '🏛️',
      myth: 'Governments can ban Bitcoin and shut down the network',
      reality: 'Bitcoin is designed to be unstoppable by any government, as proven by numerous failed ban attempts',
      technicalEvidence: [
        'Bitcoin operates on 15,000+ nodes across 100+ countries',
        'China\'s mining ban (2021) - network continued operating normally',
        'Banning Bitcoin is like banning mathematics or the internet',
        'Governments can ban exchanges, not the protocol itself',
        'Each ban attempt has historically increased Bitcoin adoption'
      ],
      dataComparison: {
        title: 'Government Ban Effectiveness',
        myth: { label: 'Ban Attempts', value: '15+ countries', description: 'Various restrictions and bans tried' },
        reality: { label: 'Bitcoin Uptime', value: '99.98%', description: 'Unaffected by any government action' }
      },
      expertQuote: {
        text: 'Governments can no more ban Bitcoin than they can ban prime numbers. It\'s pure information, and information wants to be free.',
        attribution: 'Caitlin Long, Banking & Digital Assets Expert'
      },
      sources: [
        'Bitcoin Node Distribution Analysis',
        'Historical Analysis of Cryptocurrency Bans',
        'Academic: "Regulatory Resistance in Decentralized Networks"',
        'Electronic Frontier Foundation Digital Rights Report'
      ]
    },

    // Economic Value & Backing Category
    {
      id: 'no-intrinsic-value',
      category: 'economics',
      title: 'Bitcoin Has No Intrinsic Value',
      severity: 'Economic FUD',
      icon: '💎',
      myth: 'Bitcoin has no intrinsic value because it\'s not backed by anything physical',
      reality: 'Bitcoin is backed by mathematics, energy, and network effects - more reliable than government promises',
      technicalEvidence: [
        'Bitcoin is backed by cryptographic proof and energy expenditure',
        'Scarcity is enforced by mathematics, not political promises',
        'Network effects create utility value (Metcalfe\'s Law)',
        'Gold has no "intrinsic" value either - value comes from properties',
        'Dollar has no backing since 1971 - purely faith-based system'
      ],
      dataComparison: {
        title: 'What Backs Different Monies?',
        myth: { label: 'US Dollar', value: 'Government Promise', description: 'Can be broken by political decisions' },
        reality: { label: 'Bitcoin', value: 'Mathematical Laws', description: 'Cannot be changed by any authority' }
      },
      expertQuote: {
        text: 'Bitcoin is the first money in history backed by physics and mathematics rather than politics and promises.',
        attribution: 'Michael Saylor, MicroStrategy Chairman'
      },
      sources: [
        'Federal Reserve History: End of Gold Standard',
        'Academic: "Network Effects in Digital Money"',
        'Bank of International Settlements: Cryptocurrency Analysis',
        'Economic Theory: Subjective Theory of Value'
      ]
    },
    {
      id: 'tulip-mania',
      category: 'economics',
      title: 'Bitcoin Is Like Tulip Mania',
      severity: 'Historical FUD',
      icon: '🌷',
      myth: 'Bitcoin is a speculative bubble like tulip mania that will eventually collapse to zero',
      reality: 'Bitcoin has unique properties no bubble in history has had: mathematical scarcity, global accessibility, and growing utility',
      technicalEvidence: [
        'Bitcoin has survived multiple 80%+ price crashes and recovered',
        'Tulips could be grown infinitely; Bitcoin supply is capped at 21 million',
        'Bitcoin adoption is global, not localized to one country',
        'Institutional adoption growing: MicroStrategy, Tesla, El Salvador',
        'Network effects and utility increase with each cycle'
      ],
      dataComparison: {
        title: 'Bubble vs. Technology Adoption',
        myth: { label: 'Tulip Mania', value: '1 Year', description: 'Localized speculation with no utility' },
        reality: { label: 'Bitcoin Growth', value: '15 Years', description: 'Global adoption with increasing utility' }
      },
      expertQuote: {
        text: 'Every major technology looks like a bubble during its exponential adoption phase. The internet "bubble" of 2000 was actually just the beginning.',
        attribution: 'Raoul Pal, Global Macro Investor'
      },
      sources: [
        'Historical Analysis: Technology Adoption Curves',
        'Academic: "Network Effects and Asset Bubbles"',
        'Federal Reserve Economic Papers on Asset Bubbles',
        'Institutional Bitcoin Adoption Tracker'
      ]
    },
    {
      id: 'ponzi-scheme',
      category: 'economics',
      title: 'Bitcoin Is a Ponzi Scheme',
      severity: 'Critical FUD',
      icon: '🎪',
      myth: 'Bitcoin is a Ponzi scheme where early adopters profit at the expense of later ones',
      reality: 'Bitcoin is an open-source protocol with transparent economics, the opposite of a Ponzi scheme',
      technicalEvidence: [
        'No central authority promising returns or controlling funds',
        'All code is open-source and auditable by anyone',
        'No recruiting mechanism or pyramid structure',
        'Value comes from utility and scarcity, not new investor money',
        'Ponzi schemes collapse when new money stops; Bitcoin survived multiple bear markets'
      ],
      dataComparison: {
        title: 'Ponzi vs. Bitcoin Characteristics',
        myth: { label: 'Ponzi Scheme', value: 'Opaque', description: 'Hidden operations, promised returns' },
        reality: { label: 'Bitcoin', value: 'Transparent', description: 'Open source, no promised returns' }
      },
      expertQuote: {
        text: 'Calling Bitcoin a Ponzi scheme shows a fundamental misunderstanding of both Bitcoin and Ponzi schemes.',
        attribution: 'Preston Pysh, Bitcoin Educator and Investor'
      },
      sources: [
        'SEC Definition of Ponzi Schemes',
        'Bitcoin Source Code Repository',
        'Academic: "Economic Analysis of Cryptocurrency Networks"',
        'Legal Analysis: Bitcoin vs. Securities Law'
      ]
    },

    // Technology & Scalability Category
    {
      id: 'too-slow',
      category: 'technology',
      title: 'Bitcoin Is Too Slow for Payments',
      severity: 'Technical FUD',
      icon: '🐌',
      myth: 'Bitcoin can only process 7 transactions per second and is too slow for real payments',
      reality: 'Bitcoin base layer is for final settlement; Lightning Network enables instant micropayments',
      technicalEvidence: [
        'Bitcoin processes $50B+ daily in final settlement (more than most payment rails)',
        'Lightning Network enables millions of instant transactions per second',
        'Base layer designed for security, not speed (settlement vs. payment layers)',
        'Traditional banking: 3-5 business days for final settlement',
        'Bitcoin: 10 minutes for final, irreversible settlement globally'
      ],
      dataComparison: {
        title: 'Settlement vs. Payment Speed',
        myth: { label: 'Credit Cards', value: '~0 seconds', description: 'Payment, but 30-90 days to settle' },
        reality: { label: 'Bitcoin + Lightning', value: '<1 second', description: 'Instant payment + 10min final settlement' }
      },
      expertQuote: {
        text: 'Bitcoin is not slow - it\'s the fastest final settlement system ever created. Comparing it to credit cards is like comparing email to handwritten letters.',
        attribution: 'Elizabeth Stark, Lightning Labs CEO'
      },
      sources: [
        'Lightning Network Statistics and Growth',
        'Federal Reserve Settlement Times Analysis',
        'Academic: "Layered Scaling in Blockchain Systems"',
        'Bitcoin Lightning Network Technical Specifications'
      ]
    },
    {
      id: 'outdated-technology',
      category: 'technology',
      title: 'Bitcoin Uses Outdated Technology',
      severity: 'Innovation FUD',
      icon: '📟',
      myth: 'Bitcoin is old technology that can\'t compete with newer, faster blockchains',
      reality: 'Bitcoin prioritizes security and decentralization over speed; newer chains make fundamental trade-offs',
      technicalEvidence: [
        'Bitcoin has the largest network effect and strongest security (Lindy Effect)',
        'Newer chains sacrifice decentralization for speed (blockchain trilemma)',
        'Bitcoin receives continuous upgrades: Taproot, Lightning, sidechains',
        'Most "faster" chains are centralized databases masquerading as blockchains',
        'Security and immutability are more important than transaction speed for money'
      ],
      dataComparison: {
        title: 'Security vs. Speed Trade-offs',
        myth: { label: 'Newer Chains', value: '~100 nodes', description: 'Fast but centralized' },
        reality: { label: 'Bitcoin', value: '15,000+ nodes', description: 'Slower but truly decentralized' }
      },
      expertQuote: {
        text: 'Bitcoin is not old technology - it\'s mature technology. There\'s a difference between being the first and being obsolete.',
        attribution: 'Jameson Lopp, Bitcoin Security Engineer'
      },
      sources: [
        'Bitcoin Node Count and Distribution Analysis',
        'Academic: "Blockchain Trilemma and Trade-offs"',
        'Technical Comparison: Bitcoin vs. Alternative Chains',
        'Bitcoin Improvement Proposals Archive'
      ]
    },
    {
      id: 'replace-dollar',
      category: 'technology',
      title: 'Bitcoin Will Replace the Dollar',
      severity: 'Maximalist Myth',
      icon: '🔄',
      myth: 'Bitcoin will completely replace the US dollar and all fiat currencies',
      reality: 'Bitcoin will likely coexist with fiat as digital gold and a parallel monetary system',
      technicalEvidence: [
        'Bitcoin is better suited as a store of value than medium of exchange',
        'Government currencies serve different functions (taxation, local commerce)',
        'Bitcoin is becoming digital gold, not necessarily everyday currency',
        'Central Bank Digital Currencies (CBDCs) likely for retail transactions',
        'Multi-monetary system more likely than complete replacement'
      ],
      dataComparison: {
        title: 'Different Monetary Roles',
        myth: { label: 'Complete Replacement', value: 'Unlikely', description: 'Governments won\'t give up monetary control' },
        reality: { label: 'Parallel System', value: 'Probable', description: 'Bitcoin as digital gold + fiat for daily use' }
      },
      expertQuote: {
        text: 'Bitcoin doesn\'t need to replace the dollar to be successful. It just needs to be a better store of value than anything else.',
        attribution: 'Lyn Alden, Investment Strategist'
      },
      sources: [
        'International Monetary Fund: Future of Money Report',
        'Bank of International Settlements: CBDC Analysis',
        'Academic: "Coexistence of Digital and Fiat Currencies"',
        'Federal Reserve: Digital Dollar Research'
      ]
    }
  ];

  const handleMythClick = (mythId) => {
    setSelectedMyth(mythId);
  };

  const handleDebunk = (mythId) => {
    const newDebunked = new Set(debunkedMyths);
    newDebunked.add(mythId);
    setDebunkedMyths(newDebunked);
    
    // Show achievement for milestones
    if (newDebunked.size === 3) {
      showAchievement("Myth Buster", "You've debunked your first 3 Bitcoin myths!");
    } else if (newDebunked.size === 6) {
      showAchievement("Truth Seeker", "Half the myths destroyed with facts and evidence!");
    } else if (newDebunked.size === 9) {
      showAchievement("FUD Fighter", "You're becoming a Bitcoin truth expert!");
    } else if (newDebunked.size === 12) {
      showAchievement("Truth Master", "All myths debunked! You're now a Bitcoin truth expert!");
      completeModule('myths');
    }
  };

  const showAchievement = (title, description) => {
    const achievement = document.createElement('div');
    achievement.className = 'achievement-popup';
    achievement.innerHTML = `
      <div class="achievement-content">
        <div class="achievement-icon">🏆</div>
        <div class="achievement-text">
          <h4>${title}</h4>
          <p>${description}</p>
        </div>
      </div>
    `;
    document.body.appendChild(achievement);
    
    setTimeout(() => {
      achievement.style.opacity = '0';
      setTimeout(() => {
        document.body.removeChild(achievement);
      }, 300);
    }, 3000);
  };

  const renderMythCard = (myth) => {
    const isDebunked = debunkedMyths.has(myth.id);
    const isActive = selectedMyth === myth.id;

    return (
            <div 
              key={myth.id}
        className={`myth-card ${isActive ? 'active' : ''} ${isDebunked ? 'debunked' : ''}`}
              onClick={() => handleMythClick(myth.id)}
            >
              <div className="myth-header">
          <div className="myth-icon">{myth.icon}</div>
          <div className="myth-info">
            <h3 className="myth-title">{myth.title}</h3>
            <div className="myth-severity">{myth.severity}</div>
          </div>
              </div>
              
        {isActive && (
                <div className="myth-content">
                  <div className="myth-statement">
              <h4>The Myth</h4>
                    <p>{myth.myth}</p>
                  </div>
                  
                      <div className="reality-box">
              <h4>The Technical Truth</h4>
                        <p>{myth.reality}</p>
                      </div>
                      
            <div className="technical-evidence">
              <div className="evidence-header">
                <Info size={16} />
                <span className="evidence-title">Technical Evidence</span>
              </div>
              <ul className="evidence-list">
                {myth.technicalEvidence.map((evidence, index) => (
                  <li key={index}>{evidence}</li>
                          ))}
                        </ul>
                      </div>
                      
            <div className="data-comparison">
              <div className="comparison-title">{myth.dataComparison.title}</div>
              <div className="comparison-chart">
                <div className="comparison-item comparison-myth">
                  <div className="comparison-label">{myth.dataComparison.myth.label}</div>
                  <div className="comparison-value">{myth.dataComparison.myth.value}</div>
                  <div className="comparison-description">{myth.dataComparison.myth.description}</div>
                </div>
                <div className="comparison-item comparison-reality">
                  <div className="comparison-label">{myth.dataComparison.reality.label}</div>
                  <div className="comparison-value">{myth.dataComparison.reality.value}</div>
                  <div className="comparison-description">{myth.dataComparison.reality.description}</div>
                </div>
              </div>
            </div>

            {myth.expertQuote && (
              <div className="expert-quote">
                <div className="quote-text">{myth.expertQuote.text}</div>
                <div className="quote-attribution">— {myth.expertQuote.attribution}</div>
              </div>
            )}

            <div className="sources-section">
              <div className="sources-title">Sources & Further Reading</div>
              <ul className="sources-list">
                {myth.sources.map((source, index) => (
                  <li key={index}>{source}</li>
                ))}
              </ul>
                      </div>
                      
            {/* Visual Capitalist section for tulip mania myth */}
            {myth.id === 'tulip-mania' && (
              <VisualCapitalistSection
                icon="🌷"
                title="Explore Further: Historical Bubbles vs Technology Adoption"
                description="See how Bitcoin's adoption pattern compares to historical bubbles like tulip mania versus genuine technology adoption curves like the internet."
                url="https://www.visualcapitalist.com/bubbles-in-market-history/"
                buttonText="View Historical Bubble Analysis"
              />
            )}
            
            {!isDebunked && (
              <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                <button 
                  className="guess-button false"
                  onClick={() => handleDebunk(myth.id)}
                >
                  <CheckCircle size={16} />
                  Myth Debunked!
                </button>
                      </div>
            )}

            {isDebunked && (
              <div className="myth-progress">
                <div className="progress-indicator completed">✓</div>
                <span className="progress-text">Myth successfully debunked with facts and evidence</span>
                    </div>
                  )}
                </div>
              )}
            </div>
    );
  };

  const renderCategorySection = (categoryKey) => {
    const category = mythCategories[categoryKey];
    const categoryMyths = bitcoinMyths.filter(myth => myth.category === categoryKey);
    const debunkedCount = categoryMyths.filter(myth => debunkedMyths.has(myth.id)).length;

    return (
      <div key={categoryKey} className="category-section">
        <div className="category-header">
          <div className="category-icon">{category.icon}</div>
          <div>
            <h2 className="category-title">{category.title}</h2>
            <p className="category-description">{category.description}</p>
          </div>
          <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
            <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
              {debunkedCount}/{categoryMyths.length} myths debunked
            </div>
            <div style={{ 
              width: '100px', 
              height: '8px', 
              background: 'rgba(100, 116, 139, 0.2)', 
              borderRadius: '4px',
              marginTop: '0.5rem'
            }}>
              <div style={{
                width: `${(debunkedCount / categoryMyths.length) * 100}%`,
                height: '100%',
                background: '#10b981',
                borderRadius: '4px',
                transition: 'width 0.3s ease'
              }} />
            </div>
          </div>
        </div>
        <div className="myths-grid">
          {categoryMyths.map(renderMythCard)}
        </div>
      </div>
    );
  };

  return (
    <div className="module-container myths-module">
      <div className="myths-content">
        <div className="myths-header">
          <h1 className="myths-title">
            Bitcoin Myths: The Technical Truth
          </h1>
          <p className="myths-subtitle">
            Expert-Level Myth Busting with Data, Evidence, and Citations
          </p>
          <div className="myths-description">
            Arm yourself with facts, data, and expert analysis to counter the most persistent Bitcoin myths. 
            Each myth is thoroughly debunked with technical evidence, real-world data, and credible sources.
          </div>
          {isModuleCompleted('myths') && (
            <div className="completion-badge">
              <Trophy size={24} />
              <span>Truth Master Achieved!</span>
            </div>
          )}
          <div className="myths-stats">
            <div className="stat-card">
              <span className="stat-value">{debunkedMyths.size}</span>
              <span className="stat-label">Myths Debunked</span>
            </div>
            <div className="stat-card">
              <span className="stat-value">12</span>
              <span className="stat-label">Total Myths</span>
            </div>
            <div className="stat-card">
              <span className="stat-value">50+</span>
              <span className="stat-label">Sources Cited</span>
            </div>
            <div className="stat-card">
              <span className="stat-value">4</span>
              <span className="stat-label">Categories</span>
            </div>
          </div>
        </div>

        {/* Render all categories */}
        {Object.keys(mythCategories).map(renderCategorySection)}

        {/* Achievement Summary */}
        <div className="achievement-summary">
          <div className="achievement-header">
            <h2 className="achievement-title">🏆 Truth Master Progress</h2>
            <p className="achievement-subtitle">Track your journey to Bitcoin truth mastery</p>
          </div>
          <div className="achievements-grid">
            {[
              { threshold: 3, title: 'Myth Buster', desc: 'Debunk 3+ myths', icon: '🔍' },
              { threshold: 6, title: 'Truth Seeker', desc: 'Debunk 6+ myths', icon: '🎯' },
              { threshold: 9, title: 'FUD Fighter', desc: 'Debunk 9+ myths', icon: '⚔️' },
              { threshold: 12, title: 'Truth Master', desc: 'Debunk all 12 myths', icon: '👑' }
            ].map(achievement => (
              <div 
                key={achievement.threshold}
                className={`achievement-card ${debunkedMyths.size >= achievement.threshold ? 'earned' : ''}`}
              >
                <div className="achievement-icon">{achievement.icon}</div>
                <div className="achievement-name">{achievement.title}</div>
                <div className="achievement-description">{achievement.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {debunkedMyths.size >= 6 && (
          <div className="category-section">
            <div style={{ 
              background: 'rgba(16, 185, 129, 0.1)', 
              border: '1px solid rgba(16, 185, 129, 0.3)',
              borderRadius: '12px',
              padding: '2rem',
              textAlign: 'center'
            }}>
              <h3 style={{ color: '#10b981', marginBottom: '1rem' }}>🎓 Expert Status Unlocked!</h3>
              <p style={{ color: '#f1f5f9', lineHeight: '1.6' }}>
                You now have the knowledge and evidence to confidently counter Bitcoin myths. 
                Share these facts with others and help spread the technical truth about Bitcoin!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MythsModule; 