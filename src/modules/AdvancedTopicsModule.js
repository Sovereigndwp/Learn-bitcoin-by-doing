import React, { useState } from 'react';
import { useProgress } from '../contexts/ProgressContext';
import { 
  Search, Shield, Zap, Cpu, Globe, Trophy, Target,
  Lightbulb
} from 'lucide-react';
import { 
  ContinueButton, 
  ActionButton 
} from '../components/EnhancedButtons';
// Using global CSS only - no module-specific overrides

const AdvancedTopicsModule = () => {
  const { completeModule } = useProgress();
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(new Set());
  const [userExplorations, setUserExplorations] = useState({});
  const [explorationProgress, setExplorationProgress] = useState({});

  // Additional state for render functions
  const [exploredUpgrades, setExploredUpgrades] = useState(new Set());
  const [exploredSectors, setExploredSectors] = useState(new Set());
  const [masteryScore, setMasteryScore] = useState(0);
  const [completedChallenges, setCompletedChallenges] = useState(new Set());

  // Learning Steps for Advanced Topics
  const learningSteps = [
    {
      id: 'innovation-analysis',
      title: 'Bitcoin Innovation Analysis',
      icon: <Search className="step-icon" />,
      description: 'Explore how Bitcoin drives financial technology innovation',
      learningObjectives: [
        'Compare Bitcoin vs traditional finance innovation',
        'Understand breakthrough technologies',
        'Analyze innovation adoption patterns'
      ]
    },
    {
      id: 'privacy-technologies',
      title: 'Privacy & Confidentiality',
      icon: <Shield className="step-icon" />,
      description: 'Learn practical Bitcoin privacy tools anyone can use',
      learningObjectives: [
        'Simple privacy techniques for everyday users',
        'Understanding transaction analysis',
        'Practical wallet privacy features'
      ]
    },
    {
      id: 'scaling-solutions',
      title: 'Scaling & Layer 2',
      icon: <Zap className="step-icon" />,
      description: 'Deep dive into Bitcoin scaling technologies',
      learningObjectives: [
        'Master Lightning Network architecture',
        'Explore sidechains and state channels',
        'Understand scaling trade-offs'
      ]
    },
    {
      id: 'protocol-development',
      title: 'Protocol Development',
      icon: <Cpu className="step-icon" />,
      description: 'Learn about Bitcoin protocol improvements and governance',
      learningObjectives: [
        'Understand soft fork activation',
        'Explore Taproot and future upgrades',
        'Learn consensus mechanisms'
      ]
    },
    {
      id: 'ecosystem-architecture',
      title: 'Ecosystem Architecture',
      icon: <Globe className="step-icon" />,
      description: 'Explore Bitcoin\'s role in the broader financial ecosystem',
      learningObjectives: [
        'Understand Bitcoin economic models',
        'Explore integration patterns',
        'Learn about infrastructure development'
      ]
    },
    {
      id: 'advanced-mastery',
      title: 'Advanced Technology Mastery',
      icon: <Trophy className="step-icon" />,
      description: 'Demonstrate comprehensive understanding of advanced concepts',
      learningObjectives: [
        'Synthesize complex concepts',
        'Apply knowledge to real scenarios',
        'Achieve advanced mastery'
      ]
    }
  ];

  // Innovation Analysis Data
  const innovationAreas = [
    {
      id: 'payment_innovation',
      title: 'Payment System Innovation',
      traditional: {
        technology: 'ACH/SWIFT networks from 1970s',
        speed: '3-5 days settlement',
        cost: '3% fees + $50 international',
        innovation: 'Minimal improvements in 50 years'
      },
      bitcoin: {
        technology: 'Lightning Network (2018)',
        speed: 'Instant settlement',
        cost: 'Sub-penny fees',
        innovation: 'Revolutionary payment channels'
      },
      breakthrough: 'Cryptographic payment channels enable instant global payments',
      impact: 'Eliminates $1.2T in annual payment processing fees'
    },
    {
      id: 'monetary_innovation',
      title: 'Monetary Technology',
      traditional: {
        technology: 'Fiat currency system (1971)',
        properties: 'Unlimited supply, political control',
        auditability: 'Opaque monetary policy',
        innovation: 'No technological advancement'
      },
      bitcoin: {
        technology: 'Programmable digital money (2009)',
        properties: 'Fixed supply, algorithmic control',
        auditability: 'Complete transparency',
        innovation: 'First programmable money'
      },
      breakthrough: 'Mathematical enforcement of monetary policy',
      impact: 'Protects against $15T wealth destruction via inflation'
    },
    {
      id: 'settlement_innovation',
      title: 'Settlement Technology',
      traditional: {
        technology: 'T+2 settlement (1990s)',
        finality: '2+ days for final settlement',
        risk: 'Counterparty risk throughout',
        innovation: 'Minimal efficiency improvements'
      },
      bitcoin: {
        technology: 'Blockchain settlement (2009)',
        finality: '10 minutes final settlement',
        risk: 'Cryptographic guarantee',
        innovation: 'Trustless settlement'
      },
      breakthrough: 'Cryptographic proof eliminates counterparty risk',
      impact: 'Removes $500B in annual settlement inefficiency'
    }
  ];

  // Privacy Technologies
  const privacyTechnologies = [
    {
      id: 'confidential_transactions',
      name: 'Confidential Transactions',
      type: 'Amount Privacy',
      description: 'Hide transaction amounts while maintaining verifiability using cryptographic commitments',
      implementation: 'Pedersen commitments + range proofs',
      privacy: 95,
      complexity: 'Advanced',
      status: 'Research/Sidechains',
      useCase: 'High-value transactions requiring amount privacy',
      tradeoffs: 'Larger transaction size vs complete amount privacy'
    },
    {
      id: 'coinjoin',
      name: 'CoinJoin',
      type: 'Transaction Privacy',
      description: 'Mix multiple transactions together to break link analysis',
      implementation: 'Coordinated multi-input transactions',
      privacy: 85,
      complexity: 'Intermediate',
      status: 'Available (Wasabi, Whirlpool)',
      useCase: 'Breaking transaction history links',
      tradeoffs: 'Coordination complexity vs privacy gains'
    },
    {
      id: 'payjoin',
      name: 'PayJoin (P2EP)',
      type: 'Transaction Privacy',
      description: 'Collaborative transactions that confuse chain analysis assumptions',
      implementation: 'Receiver contributes inputs to transaction',
      privacy: 75,
      complexity: 'Beginner',
      status: 'Available (BTCPay, BlueWallet)',
      useCase: 'Merchant payments with privacy',
      tradeoffs: 'Requires cooperation vs significant privacy'
    },
    {
      id: 'taproot',
      name: 'Taproot Privacy',
      type: 'Script Privacy',
      description: 'Hide complex spending conditions in simple-looking transactions',
      implementation: 'Schnorr signatures + MAST',
      privacy: 90,
      complexity: 'Advanced',
      status: 'Activated (2021)',
      useCase: 'Smart contracts indistinguishable from regular payments',
      tradeoffs: 'Adoption required vs universal privacy'
    }
  ];

  // Scaling Solutions
  const scalingSolutions = [
    {
      id: 'lightning_network',
      name: 'Lightning Network',
      type: 'Payment Channels',
      capacity: 'Millions of TPS',
      latency: 'Instant',
      description: 'Bidirectional payment channels enabling off-chain transactions',
      architecture: 'Layer 2 payment channel network',
      advantages: ['Instant payments', 'Minimal fees', 'Micropayments', 'Private routing'],
      limitations: ['Liquidity requirements', 'Channel management', 'Routing complexity'],
      maturity: 'Production',
      adoption: '5000+ nodes, 80,000+ channels'
    },
    {
      id: 'sidechains',
      name: 'Sidechains',
      type: 'Parallel Chains',
      capacity: 'Variable TPS',
      latency: 'Chain dependent',
      description: 'Independent blockchains pegged to Bitcoin',
      architecture: 'Two-way peg with Bitcoin mainchain',
      advantages: ['Specialized features', 'Isolated risk', 'Innovation space'],
      limitations: ['Additional security assumptions', 'Centralization risks'],
      maturity: 'Research/Early',
      adoption: 'Liquid Network, RSK'
    },
    {
      id: 'state_channels',
      name: 'State Channels',
      type: 'Off-chain Computation',
      capacity: 'Unlimited computation',
      latency: 'Instant',
      description: 'Off-chain state updates with on-chain dispute resolution',
      architecture: 'Smart contract-based state management',
      advantages: ['Instant finality', 'Complex interactions', 'Privacy'],
      limitations: ['Limited to participants', 'State management complexity'],
      maturity: 'Research',
      adoption: 'Experimental implementations'
    }
  ];

  const handleStepComplete = (stepIndex) => {
    setCompletedSteps(prev => new Set([...prev, stepIndex]));
    if (stepIndex < learningSteps.length - 1) {
      setCurrentStep(stepIndex + 1);
    } else {
      completeModule('advanced-topics');
    }
  };

  const exploreInnovation = (innovation) => {
    setUserExplorations(prev => ({
      ...prev,
      [innovation.id]: true
    }));
  };

  const testPrivacyTech = (tech) => {
    setExplorationProgress(prev => ({
      ...prev,
      [`privacy_${tech.id}`]: 100
    }));
  };

  const analyzeScaling = (solution) => {
    setExplorationProgress(prev => ({
      ...prev,
      [`scaling_${solution.id}`]: 100
    }));
  };

  const renderInnovationAnalysis = () => {
    return (
      <div className="innovation-analysis">
        <div className="analysis-header">
          <h2>Bitcoin Innovation Analysis</h2>
          <p>Explore how Bitcoin drives breakthrough financial technology innovation</p>
        </div>

        <div className="innovation-comparison">
          <h3>Innovation Comparison: Traditional Finance vs Bitcoin</h3>
          
          <div className="innovation-grid">
            {innovationAreas.map(area => (
              <div key={area.id} className="innovation-card">
                <div className="area-header">
                  <h4>{area.title}</h4>
                  <button
                    className="explore-button"
                    onClick={() => exploreInnovation(area)}
                  >
                    Explore Innovation
                  </button>
                </div>

                <div className="comparison-sections">
                  <div className="traditional-section">
                    <h5>Traditional System</h5>
                    <div className="tech-details">
                      <div><strong>Technology:</strong> {area.traditional.technology}</div>
                      <div><strong>Performance:</strong> {area.traditional.speed || area.traditional.properties}</div>
                      <div><strong>Cost:</strong> {area.traditional.cost || area.traditional.auditability}</div>
                      <div><strong>Innovation:</strong> {area.traditional.innovation}</div>
                    </div>
                  </div>

                  <div className="bitcoin-section">
                    <h5>Bitcoin System</h5>
                    <div className="tech-details">
                      <div><strong>Technology:</strong> {area.bitcoin.technology}</div>
                      <div><strong>Performance:</strong> {area.bitcoin.speed || area.bitcoin.properties}</div>
                      <div><strong>Cost:</strong> {area.bitcoin.cost || area.bitcoin.auditability}</div>
                      <div><strong>Innovation:</strong> {area.bitcoin.innovation}</div>
                    </div>
                  </div>
                </div>

                {userExplorations[area.id] && (
                  <div className="innovation-insight">
                    <div className="breakthrough">
                      <strong>Breakthrough:</strong> {area.breakthrough}
                    </div>
                    <div className="impact">
                      <strong>Economic Impact:</strong> {area.impact}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {Object.keys(userExplorations).length >= innovationAreas.length && (
          <div className="analysis-conclusion">
            <h3>Innovation Analysis Complete</h3>
            <div className="key-insight">
              <Lightbulb className="insight-icon" />
              <p>
                Bitcoin represents the greatest financial innovation breakthrough in centuries. 
                While traditional systems stagnate with 50-year-old technology, Bitcoin continuously 
                pioneers revolutionary solutions: programmable money, instant global payments, 
                cryptographic audits, and financial sovereignty.
              </p>
            </div>
            
            <ContinueButton 
              onClick={() => handleStepComplete(0)}
              className="analysis-complete"
            >
              Master Privacy Technologies
            </ContinueButton>
          </div>
        )}
      </div>
    );
  };

  const renderPrivacyTechnologies = () => {
  return (
      <div className="privacy-technologies">
        <div className="privacy-header">
          <h2>Bitcoin Privacy Technologies</h2>
          <p>Master advanced privacy and confidentiality techniques</p>
          </div>

        <div className="privacy-overview">
          <div className="privacy-insight">
            <Shield className="privacy-icon" />
            <div>
              <h4>Why Privacy Matters</h4>
              <p>
                Financial privacy is fundamental to human dignity and freedom. Bitcoin provides 
                the tools to restore financial confidentiality in an age of increasing surveillance.
              </p>
            </div>
          </div>
        </div>

        <div className="technologies-grid">
          {privacyTechnologies.map(tech => (
            <div key={tech.id} className="privacy-tech-card">
              <div className="tech-header">
                <div className="tech-info">
                  <h4>{tech.name}</h4>
                  <div className="tech-type">{tech.type}</div>
                </div>
                <div className="privacy-score">
                  <div className="score-circle">
                    <span>{tech.privacy}%</span>
                  </div>
                  <div className="score-label">Privacy</div>
                </div>
              </div>

              <div className="tech-description">
                <p>{tech.description}</p>
              </div>

              <div className="tech-details">
                <div className="detail-row">
                  <strong>Implementation:</strong> {tech.implementation}
                </div>
                <div className="detail-row">
                  <strong>Complexity:</strong> {tech.complexity}
                </div>
                <div className="detail-row">
                  <strong>Status:</strong> {tech.status}
                </div>
                <div className="detail-row">
                  <strong>Use Case:</strong> {tech.useCase}
                </div>
              </div>

              <div className="tradeoffs">
                <h5>Trade-offs:</h5>
                <p>{tech.tradeoffs}</p>
              </div>

              <ActionButton
                onClick={() => testPrivacyTech(tech)}
                className={explorationProgress[`privacy_${tech.id}`] ? 'explored' : ''}
              >
                {explorationProgress[`privacy_${tech.id}`] ? 'Mastered' : 'Explore Technology'}
              </ActionButton>
            </div>
          ))}
        </div>

        {Object.keys(explorationProgress).filter(k => k.startsWith('privacy_')).length >= privacyTechnologies.length && (
          <div className="privacy-mastery">
            <h3>Privacy Technology Mastery</h3>
            <div className="mastery-insight">
              <p>
                You've mastered Bitcoin's advanced privacy technologies. These cryptographic tools 
                provide mathematical guarantees of financial confidentiality that no traditional 
                system can match.
              </p>
            </div>
            
            <ContinueButton 
              onClick={() => handleStepComplete(1)}
              className="privacy-complete"
            >
              Master Scaling Solutions
            </ContinueButton>
      </div>
        )}
    </div>
  );
  };

  const renderScalingSolutions = () => {
    return (
      <div className="scaling-solutions">
        <div className="scaling-header">
          <h2>Bitcoin Scaling Solutions</h2>
          <p>Deep dive into Layer 2 and scaling technologies</p>
        </div>

        <div className="scaling-challenge">
          <div className="challenge-overview">
            <Target className="challenge-icon" />
            <div>
              <h4>The Scaling Challenge</h4>
              <p>
                Bitcoin's base layer processes 7 transactions per second while Visa processes 65,000 TPS. 
                However, this comparison misses the point: Bitcoin provides final settlement while Visa 
                is just a payment processor. Layer 2 solutions enable unlimited scaling while preserving 
                Bitcoin's security guarantees.
              </p>
            </div>
          </div>
        </div>

        <div className="solutions-grid">
          {scalingSolutions.map(solution => (
            <div key={solution.id} className="scaling-solution-card">
              <div className="solution-header">
                <h4>{solution.name}</h4>
                <div className="solution-type">{solution.type}</div>
              </div>

              <div className="solution-metrics">
                <div className="metric">
                  <div className="metric-value">{solution.capacity}</div>
                  <div className="metric-label">Capacity</div>
                </div>
                <div className="metric">
                  <div className="metric-value">{solution.latency}</div>
                  <div className="metric-label">Latency</div>
                </div>
                <div className="metric">
                  <div className="metric-value">{solution.maturity}</div>
                  <div className="metric-label">Maturity</div>
            </div>
              </div>

              <div className="solution-description">
                <p>{solution.description}</p>
                <div className="architecture">
                  <strong>Architecture:</strong> {solution.architecture}
                </div>
              </div>

              <div className="advantages-limitations">
                <div className="advantages">
                  <h5>Advantages:</h5>
                  <ul>
                    {solution.advantages.map((advantage, index) => (
                      <li key={index}>{advantage}</li>
                    ))}
                  </ul>
                </div>
                <div className="limitations">
                  <h5>Limitations:</h5>
                  <ul>
                    {solution.limitations.map((limitation, index) => (
                      <li key={index}>{limitation}</li>
                    ))}
                  </ul>
            </div>
              </div>

              <div className="adoption-status">
                <strong>Current Adoption:</strong> {solution.adoption}
              </div>

              <ActionButton
                onClick={() => analyzeScaling(solution)}
                className={explorationProgress[`scaling_${solution.id}`] ? 'explored' : ''}
              >
                {explorationProgress[`scaling_${solution.id}`] ? 'Analyzed' : 'Analyze Solution'}
              </ActionButton>
            </div>
          ))}
              </div>

        {Object.keys(explorationProgress).filter(k => k.startsWith('scaling_')).length >= scalingSolutions.length && (
          <div className="scaling-mastery">
            <h3>Scaling Solutions Mastery</h3>
            <div className="mastery-insight">
              <p>
                You've mastered Bitcoin's scaling architecture. Layer 2 solutions enable unlimited 
                scaling while preserving the security and decentralization of the base layer. 
                This multi-layered approach provides the best of both worlds: security and scalability.
              </p>
            </div>
            
            <ContinueButton 
              onClick={() => handleStepComplete(2)}
              className="scaling-complete"
            >
              Explore Protocol Development
            </ContinueButton>
          </div>
        )}
      </div>
    );
  };

  const renderProtocolDevelopment = () => {
    const protocolUpgrades = [
      {
        id: 'taproot',
        name: 'Taproot',
        status: 'Activated (2021)',
        type: 'Soft Fork',
        description: 'Privacy-preserving smart contracts with Schnorr signatures',
        benefits: [
          'Enhanced privacy for complex transactions',
          'More efficient multi-signature transactions',
          'Enables advanced smart contract features',
          'Improved scalability through signature aggregation'
        ],
        technicalDetails: {
          implementation: 'BIP 340, 341, 342',
          activation: 'Speedy Trial (90% miner signaling)',
          compatibility: 'Backward compatible soft fork'
        }
      },
      {
        id: 'covenants',
        name: 'Covenants',
        status: 'Research Phase',
        type: 'Future Upgrade',
        description: 'Advanced spending conditions and vault architectures',
        benefits: [
          'Enhanced security for large holdings',
          'Programmable spending conditions',
          'Improved custody solutions',
          'Advanced DeFi capabilities'
        ],
        technicalDetails: {
          implementation: 'Various proposals (CTV, ANYPREVOUT)',
          activation: 'Requires consensus building',
          compatibility: 'Designed as soft fork'
        }
      },
      {
        id: 'quantum_resistance',
        name: 'Quantum Resistance',
        status: 'Research Phase',
        type: 'Future Upgrade',
        description: 'Post-quantum cryptographic preparations',
        benefits: [
          'Protection against quantum computers',
          'Future-proof cryptographic security',
          'Gradual migration capability',
          'Maintained network security'
        ],
        technicalDetails: {
          implementation: 'Post-quantum signature schemes',
          activation: 'Timeline depends on quantum progress',
          compatibility: 'New address types'
        }
      }
    ];

    const exploreUpgrade = (upgrade) => {
      setExploredUpgrades(prev => new Set([...prev, upgrade.id]));
    };

    return (
      <div className="protocol-development">
        <div className="protocol-header">
          <h2>Bitcoin Protocol Development</h2>
          <p>Learn about Bitcoin protocol improvements and governance</p>
        </div>

        <div className="consensus-overview">
          <div className="consensus-insight">
            <Cpu className="consensus-icon" />
            <div>
              <h4>Consensus-Driven Development</h4>
              <p>
                Bitcoin protocol changes require broad consensus among users, developers, miners, 
                and economic nodes. This deliberate, conservative approach ensures Bitcoin remains 
                secure and stable while enabling careful innovation.
              </p>
            </div>
          </div>
        </div>

        <div className="upgrades-timeline">
          <h3>Protocol Upgrades & Development</h3>
          
          <div className="upgrades-grid">
            {protocolUpgrades.map(upgrade => (
              <div key={upgrade.id} className="upgrade-card">
                <div className="upgrade-header">
                  <h4>{upgrade.name}</h4>
                  <div className={`status-badge ${upgrade.status.toLowerCase().replace(/[^a-z]/g, '-')}`}>
                    {upgrade.status}
                  </div>
          </div>

                <div className="upgrade-type">{upgrade.type}</div>
                <div className="upgrade-description">{upgrade.description}</div>

                <div className="upgrade-benefits">
                  <h5>Key Benefits:</h5>
                  <ul>
                    {upgrade.benefits.map((benefit, index) => (
                      <li key={index}>{benefit}</li>
                    ))}
            </ul>
          </div>

                {exploredUpgrades.has(upgrade.id) && (
                  <div className="technical-details">
                    <h5>Technical Details:</h5>
                    <div className="detail-grid">
                      <div><strong>Implementation:</strong> {upgrade.technicalDetails.implementation}</div>
                      <div><strong>Activation:</strong> {upgrade.technicalDetails.activation}</div>
                      <div><strong>Compatibility:</strong> {upgrade.technicalDetails.compatibility}</div>
                    </div>
                  </div>
                )}

                <ActionButton
                  onClick={() => exploreUpgrade(upgrade)}
                  className={exploredUpgrades.has(upgrade.id) ? 'explored' : ''}
                >
                  {exploredUpgrades.has(upgrade.id) ? 'Explored' : 'Explore Upgrade'}
                </ActionButton>
              </div>
            ))}
          </div>
        </div>

        <div className="governance-model">
          <h3>Bitcoin Governance Model</h3>
          <div className="governance-grid">
            <div className="governance-actor">
              <h4>👩‍💻 Developers</h4>
              <p>Propose improvements through Bitcoin Improvement Proposals (BIPs)</p>
            </div>
            <div className="governance-actor">
              <h4>⛏️ Miners</h4>
              <p>Signal readiness for upgrades through version bits</p>
            </div>
            <div className="governance-actor">
              <h4>🏪 Economic Nodes</h4>
              <p>Enforce consensus rules and validate transactions</p>
            </div>
            <div className="governance-actor">
              <h4>👥 Users</h4>
              <p>Ultimately decide which software to run and which chain to value</p>
            </div>
          </div>
        </div>

        {exploredUpgrades.size >= protocolUpgrades.length && (
          <div className="protocol-mastery">
            <h3>Protocol Development Mastery</h3>
            <div className="mastery-insight">
              <p>
                You understand Bitcoin's careful approach to protocol development. This consensus-driven 
                model ensures stability while enabling innovation through soft forks that maintain 
                backward compatibility and network unity.
          </p>
        </div>

            <ContinueButton 
              onClick={() => handleStepComplete(3)}
              className="protocol-complete"
            >
              Explore Ecosystem Architecture
            </ContinueButton>
        </div>
        )}
      </div>
    );
  };

  const renderEcosystemArchitecture = () => {
    const ecosystemSectors = [
      {
        id: 'defi',
        name: 'Bitcoin DeFi',
        description: 'Decentralized finance applications built on Bitcoin',
        examples: ['Lightning DEX', 'Atomic swaps', 'RGB protocol', 'Liquid sidechains'],
        growth: 'Emerging ecosystem with billions in potential',
        innovation: 'Trustless financial services without intermediaries'
      },
      {
        id: 'institutions',
        name: 'Institutional Adoption',
        description: 'Corporate and institutional Bitcoin integration',
        examples: ['MicroStrategy', 'Tesla', 'El Salvador', 'Pension funds'],
        growth: '$100B+ in corporate treasuries',
        innovation: 'Bitcoin as institutional reserve asset'
      },
      {
        id: 'infrastructure',
        name: 'Infrastructure Development',
        description: 'Core infrastructure supporting Bitcoin ecosystem',
        examples: ['Mining operations', 'Node software', 'Wallet development', 'Payment processors'],
        growth: 'Rapid expansion in mining and infrastructure',
        innovation: 'Professional-grade Bitcoin infrastructure'
      }
    ];

    const exploreSector = (sector) => {
      setExploredSectors(prev => new Set([...prev, sector.id]));
    };

    return (
      <div className="ecosystem-architecture">
        <div className="ecosystem-header">
          <h2>Bitcoin Ecosystem Architecture</h2>
          <p>Explore Bitcoin's role in the broader financial ecosystem</p>
        </div>

        <div className="ecosystem-overview">
          <div className="ecosystem-insight">
            <Globe className="ecosystem-icon" />
          <div>
              <h4>Global Financial Architecture</h4>
              <p>
                Bitcoin is evolving from a digital currency to the foundation of a new 
                financial architecture. Understanding this ecosystem is crucial for 
                advanced Bitcoin knowledge.
              </p>
            </div>
          </div>
        </div>

        <div className="sectors-grid">
          {ecosystemSectors.map(sector => (
            <div key={sector.id} className="sector-card">
              <div className="sector-header">
                <h4>{sector.name}</h4>
              </div>

              <div className="sector-description">
                <p>{sector.description}</p>
              </div>

              <div className="sector-examples">
                <h5>Examples:</h5>
                <div className="examples-list">
                  {sector.examples.map((example, index) => (
                    <span key={index} className="example-tag">{example}</span>
                  ))}
                </div>
              </div>

              {exploredSectors.has(sector.id) && (
                <div className="sector-details">
                  <div className="growth-metric">
                    <strong>Growth:</strong> {sector.growth}
                  </div>
                  <div className="innovation-metric">
                    <strong>Innovation:</strong> {sector.innovation}
                  </div>
                </div>
              )}

              <ActionButton
                onClick={() => exploreSector(sector)}
                className={exploredSectors.has(sector.id) ? 'explored' : ''}
              >
                {exploredSectors.has(sector.id) ? 'Explored' : 'Explore Sector'}
              </ActionButton>
            </div>
          ))}
        </div>

        {exploredSectors.size >= ecosystemSectors.length && (
          <div className="ecosystem-mastery">
            <h3>Ecosystem Architecture Mastery</h3>
            <div className="mastery-insight">
              <p>
                You understand Bitcoin's expanding role in the global financial ecosystem. 
                Bitcoin is becoming the foundation for a new financial architecture that 
                spans DeFi, institutional adoption, and infrastructure development.
              </p>
            </div>
            
            <ContinueButton 
              onClick={() => handleStepComplete(4)}
              className="ecosystem-complete"
            >
              Complete Advanced Mastery
            </ContinueButton>
          </div>
        )}
      </div>
    );
  };

  const renderAdvancedMastery = () => {
    const masteryChallenges = [
      {
        id: 'innovation_synthesis',
        title: 'Innovation Synthesis',
        question: 'How do Bitcoin\'s innovations work together to create a superior financial system?',
        points: 25,
        type: 'conceptual'
      },
      {
        id: 'privacy_application',
        title: 'Privacy Application',
        question: 'Design a privacy strategy for a high-value Bitcoin user',
        points: 25,
        type: 'practical'
      },
      {
        id: 'scaling_architecture',
        title: 'Scaling Architecture',
        question: 'Architect a global payment system using Bitcoin scaling solutions',
        points: 25,
        type: 'design'
      },
      {
        id: 'protocol_future',
        title: 'Protocol Evolution',
        question: 'Analyze the implications of future Bitcoin protocol upgrades',
        points: 25,
        type: 'analytical'
      }
    ];

    const completeChallenge = (challenge) => {
      setCompletedChallenges(prev => new Set([...prev, challenge.id]));
      setMasteryScore(prev => prev + challenge.points);
    };

    const allChallengesComplete = completedChallenges.size === masteryChallenges.length;

    return (
      <div className="advanced-mastery">
        <div className="mastery-header">
          <h2>Advanced Technology Mastery</h2>
          <p>Demonstrate comprehensive understanding of advanced Bitcoin concepts</p>
        </div>

        <div className="mastery-progress">
          <div className="progress-metrics">
            <div className="metric">
              <div className="metric-value">{masteryScore}%</div>
              <div className="metric-label">Mastery Score</div>
            </div>
            <div className="metric">
              <div className="metric-value">{completedChallenges.size}/{masteryChallenges.length}</div>
              <div className="metric-label">Challenges Complete</div>
            </div>
          </div>
        </div>

        <div className="mastery-challenges">
          <h3>Mastery Challenges</h3>
          
          <div className="challenges-grid">
            {masteryChallenges.map(challenge => (
              <div key={challenge.id} className="challenge-card">
                <div className="challenge-header">
                  <h4>{challenge.title}</h4>
                  <div className="challenge-points">{challenge.points} points</div>
      </div>

                <div className="challenge-type">{challenge.type} challenge</div>
                <div className="challenge-question">{challenge.question}</div>

                <ActionButton
                  onClick={() => completeChallenge(challenge)}
                  disabled={completedChallenges.has(challenge.id)}
                  className={completedChallenges.has(challenge.id) ? 'completed' : ''}
                >
                  {completedChallenges.has(challenge.id) ? 'Completed ✓' : 'Complete Challenge'}
                </ActionButton>
              </div>
            ))}
          </div>
        </div>

        {allChallengesComplete && (
          <div className="mastery-achievement">
            <div className="achievement-celebration">
              <Trophy className="achievement-icon" />
              <h3>Advanced Bitcoin Mastery Achieved!</h3>
            </div>

            <div className="mastery-summary">
              <h4>Your Advanced Knowledge Spans:</h4>
              <div className="knowledge-areas">
                <div className="knowledge-area">🔍 Financial Innovation Analysis</div>
                <div className="knowledge-area">🛡️ Privacy Technology Mastery</div>
                <div className="knowledge-area">⚡ Scaling Solutions Architecture</div>
                <div className="knowledge-area">🏛️ Protocol Development Understanding</div>
                <div className="knowledge-area">🌍 Ecosystem Architecture Knowledge</div>
                <div className="knowledge-area">🏆 Advanced Technology Leadership</div>
              </div>
            </div>

            <div className="mastery-insight">
              <p>
                You have achieved advanced mastery of Bitcoin technology. You understand the 
                innovation breakthrough Bitcoin represents, can navigate privacy technologies, 
                architect scaling solutions, comprehend protocol development, and see Bitcoin's 
                role in the evolving financial ecosystem. You are now equipped to lead Bitcoin 
                technology adoption and innovation.
              </p>
            </div>

            <ContinueButton 
              onClick={() => {
                completeModule('advanced-topics');
                handleStepComplete(5);
              }}
              className="mastery-complete"
            >
              Complete Advanced Topics Module 🏆
            </ContinueButton>
          </div>
        )}
      </div>
    );
  };

  // Main render logic
  const renderCurrentStep = () => {
    const step = learningSteps[currentStep];

    switch (step.id) {
      case 'innovation-analysis':
        return renderInnovationAnalysis();
      
      case 'privacy-technologies':
        return renderPrivacyTechnologies();
      
      case 'scaling-solutions':
        return renderScalingSolutions();
      
      case 'protocol-development':
        return renderProtocolDevelopment();
      
      case 'ecosystem-architecture':
        return renderEcosystemArchitecture();
      
      case 'advanced-mastery':
        return renderAdvancedMastery();
      
      default:
        return <div>Step content for {step.id}</div>;
    }
  };

    return (
    <div className="module-container advanced-topics-module">
      {/* Progress Header */}
      <div className="module-header">
        <div className="module-title">
          <Search className="module-icon" />
          <div>
            <h1>Advanced Bitcoin Topics</h1>
            <p>Master cutting-edge Bitcoin technology and future developments</p>
          </div>
        </div>
        
        <div className="progress-indicators">
          <div className="progress-stat">
            <span className="stat-value">{completedSteps.size}</span>
            <span className="stat-label">Steps Complete</span>
          </div>
          <div className="progress-stat">
            <span className="stat-value">{Math.round(((currentStep + 1) / learningSteps.length) * 100)}%</span>
            <span className="stat-label">Progress</span>
          </div>
        </div>
      </div>

      {/* Learning Steps Navigation */}
      <div className="steps-navigation">
        {learningSteps.map((step, index) => (
          <div 
            key={step.id}
            className={`step-indicator ${index === currentStep ? 'active' : ''} ${completedSteps.has(index) ? 'completed' : ''}`}
          >
            {step.icon}
            <span>{step.title}</span>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="module-content">
        {renderCurrentStep()}
      </div>
      </div>
    );
};

export default AdvancedTopicsModule; 