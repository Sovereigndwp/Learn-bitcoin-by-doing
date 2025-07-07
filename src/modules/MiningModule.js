import React, { useState, useEffect } from 'react';
import { useProgress } from '../contexts/ProgressContext';
import { hash256, mineBlock } from '../utils/bitcoin';
import { Zap, Hammer, CheckCircle, Trophy, Target, Clock, Shield, Globe, TrendingUp, Power, Battery, Cpu, Network, DollarSign, Leaf, Users, BarChart3, Award, Lightbulb, ChevronLeft, ChevronRight } from 'lucide-react';
import '../components/ModuleCommon.css';
import './MiningModule.css';
import AnimatedIcon from '../components/AnimatedIcon';

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

const MiningModule = () => {
  const { completeModule, isModuleCompleted } = useProgress();
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(new Set());

  const handleStepComplete = (stepIndex) => {
    const newCompleted = new Set(completedSteps);
    newCompleted.add(stepIndex);
    setCompletedSteps(newCompleted);
    
    // Show achievement for key milestones
    if (stepIndex === 1) {
      showAchievement("Energy Pioneer", "You understand how electricity becomes digital security!");
    } else if (stepIndex === 3) {
      showAchievement("Security Economist", "You grasp Bitcoin's innovative security model!");
    } else if (stepIndex === 5) {
      showAchievement("Energy Innovator", "You see how Bitcoin drives clean energy adoption!");
    } else if (stepIndex === 7) {
      showAchievement("Network Guardian", "You understand global distributed security!");
    }
    
    // Auto-advance to next step
    if (stepIndex < steps.length - 1) {
      setTimeout(() => {
        setCurrentStep(stepIndex + 1);
      }, 500);
    }
    
    if (newCompleted.size === steps.length) {
      completeModule('mining');
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

  const handleTabClick = (stepIndex) => {
    setCurrentStep(stepIndex);
  };

  const steps = [
    {
      title: "Energy → Security Transformation",
      type: "energy-security-intro",
      content: {
        title: "⚡ How Bitcoin Transforms Physics into Trust",
        subtitle: "The most sophisticated security system ever created runs on pure energy",
        primeText: "Bitcoin doesn't just use energy—it transforms electrical energy into mathematical proof that creates unbreakable digital trust.",
        transformationChain: {
          step1: {
            icon: "🔌",
            title: "Raw Energy",
            description: "Electricity from power grids worldwide",
            detail: "Coal, solar, wind, hydro, nuclear → electrical energy"
          },
          step2: {
            icon: "🖥️",
            title: "Computational Work",
            description: "ASIC miners solve cryptographic puzzles",
            detail: "Trillions of hash calculations per second"
          },
          step3: {
            icon: "🔐",
            title: "Mathematical Proof",
            description: "Valid proof-of-work hash is found",
            detail: "Hash starting with required number of zeros"
          },
          step4: {
            icon: "🛡️",
            title: "Network Security",
            description: "Energy investment protects all Bitcoin",
            detail: "Higher energy cost = stronger security guarantee"
          }
        },
        keyInsight: "This isn't energy 'waste'—it's energy transformation into the most secure monetary system in human history.",
        comparison: {
          traditional: "Trust banks & governments (can be corrupted)",
          bitcoin: "Trust physics & mathematics (cannot be corrupted)"
        }
      }
    },

    {
      title: "Interactive Mining Lab",
      type: "mining-simulation",
      content: {
        title: "🎮 Experience Mining: Transform Energy into Security",
        subtitle: "See how electrical energy becomes digital security through computational work",
        primeText: "You're about to become a Bitcoin miner. Watch how energy investment creates mathematical proof that secures the network.",
        miningLevels: [
          {
            level: 1,
            title: "Beginner Miner",
            difficulty: "0000",
            energyCost: 100,
            description: "Find a hash starting with 4 zeros",
            blockReward: 6.25,
            networkHashrate: "100 TH/s"
          },
          {
            level: 2,
            title: "Professional Miner", 
            difficulty: "00000",
            energyCost: 1000,
            description: "Find a hash starting with 5 zeros",
            blockReward: 6.25,
            networkHashrate: "300 TH/s"
          },
          {
            level: 3,
            title: "Industrial Miner",
            difficulty: "000000",
            energyCost: 10000,
            description: "Find a hash starting with 6 zeros",
            blockReward: 6.25,
            networkHashrate: "500 TH/s"
          }
        ],
        realWorldStats: {
          currentDifficulty: "62.46 T",
          globalHashrate: "450 EH/s",
          energyConsumption: "150 TWh/year",
          countriesCompared: "Similar to Argentina's energy usage"
        }
      }
    },

    {
              title: "How Difficulty Adjusts",
      type: "difficulty-demonstration",
      content: {
        title: "🎯 Self-Adjusting Security: The 10-Minute Heartbeat",
        subtitle: "Watch Bitcoin automatically maintain perfect timing as miners join and leave",
        primeText: "Bitcoin has a built-in mechanism that keeps blocks coming every 10 minutes, no matter how many miners join the network.",
        scenario: {
          setup: "Bitcoin targets 1 block every 10 minutes. But what happens when more miners join?",
          demonstration: "Let's simulate what happens to block times when network hashrate changes"
        },
        adjustmentMechanism: {
          frequency: "Every 2,016 blocks (~2 weeks)",
          calculation: "If blocks came too fast → increase difficulty\nIf blocks came too slow → decrease difficulty",
          result: "Block time returns to ~10 minutes average"
        },
        whyItMatters: [
          "Predictable Bitcoin issuance schedule (21 million cap)",
          "Consistent transaction confirmation times",
          "Security scales automatically with network growth",
          "No central authority needed to adjust the system"
        ]
      }
    },

    {
      title: "Security Economics Game",
      type: "attack-cost-calculator",
      content: {
        title: "💰 The Economics of Attacking Bitcoin",
        subtitle: "Discover why Bitcoin becomes more secure as it grows",
        primeText: "Let's calculate: How much would it cost to attack Bitcoin? The answer will shock you.",
        attackScenarios: [
          {
            scenario: "51% Attack on Bitcoin",
            description: "Control majority of mining power to rewrite history",
            requirements: {
              hashrate: "51% of network (230 EH/s)",
              hardware: "2.3 million ASIC miners",
              electricityCost: "$75 million per day",
              hardwareCost: "$23 billion",
              timeToAcquire: "2+ years (supply constraints)"
            },
            likelihood: "Practically impossible",
            comparison: "Cost more than most countries' GDP"
          },
          {
            scenario: "Attack Traditional Banking",
            description: "Compromise major bank's security systems",
            requirements: {
              approach: "Cyber attack, insider threat, or physical breach",
              cost: "$1-10 million (estimated)",
              time: "Weeks to months",
              detection: "High chance of detection"
            },
            likelihood: "Regularly attempted",
            comparison: "Happens thousands of times per year"
          },
          {
            scenario: "Attack Gold Vault",
            description: "Steal from Fort Knox or major gold repository",
            requirements: {
              approach: "Physical breach of vault security",
              cost: "$50-100 million (estimated)",
              time: "Months of planning",
              transportation: "How do you move tons of gold?"
            },
            likelihood: "Extremely difficult but possible",
            comparison: "Physical security can be overwhelmed"
          }
        ],
        economicIncentives: {
          honestMining: "Earn 6.25 BTC + fees every 10 minutes",
          maliciousAttack: "Destroy Bitcoin's value (your investment)",
          conclusion: "It's more profitable to secure than attack"
        }
      }
    },

    {
      title: "Energy Innovation Catalyst",
      type: "energy-innovation",
      content: {
        title: "🌱 Bitcoin: The Clean Energy Accelerator",
        subtitle: "How Bitcoin mining drives renewable energy innovation worldwide",
        primeText: "Bitcoin mining doesn't compete with energy usage—it enables energy innovation by monetizing stranded and renewable sources.",
        innovationDrivers: [
          {
            category: "Stranded Energy Monetization",
            icon: "🏔️",
            examples: [
              "Remote hydroelectric dams with no transmission lines",
              "Natural gas flaring that would otherwise be wasted",
              "Geothermal sources in remote locations",
              "Solar farms during peak production hours"
            ],
            impact: "Bitcoin mining makes previously unusable energy profitable"
          },
          {
            category: "Renewable Energy Incentives", 
            icon: "☀️",
            examples: [
              "Solar + battery + mining operations",
              "Wind farm revenue optimization",
              "Hydroelectric seasonal optimization",
              "Geothermal expansion projects"
            ],
            impact: "Mining revenue helps fund renewable infrastructure"
          },
          {
            category: "Grid Stabilization",
            icon: "⚡",
            examples: [
              "Demand response during peak hours",
              "Load balancing for renewable intermittency",
              "Grid frequency regulation services",
              "Emergency demand reduction"
            ],
            impact: "Miners can instantly reduce consumption when needed"
          }
        ],
        realWorldExamples: {
          texas: "Texas miners help stabilize renewable-heavy grid",
          iceland: "Geothermal mining operations",
          elsalvador: "Volcano-powered Bitcoin mining",
          china: "Hydro-powered mining during flood seasons"
        },
        futureVision: "Bitcoin mining incentivizes humanity's transition to abundant clean energy"
      }
    },

    {
      title: "Global Security Network",
      type: "network-visualization",
      content: {
        title: "🌍 The Most Distributed Security System Ever Built",
        subtitle: "Explore Bitcoin's global mining network protecting $1+ trillion in value",
        primeText: "Bitcoin's security comes from thousands of miners across every continent, creating unprecedented decentralization.",
        globalDistribution: {
          regions: [
            {
              region: "North America",
              percentage: 35,
              hashrate: "157.5 EH/s",
              countries: ["USA", "Canada"],
              advantages: ["Regulatory clarity", "Cheap energy", "Infrastructure"]
            },
            {
              region: "Asia Pacific",
              percentage: 30,
              hashrate: "135 EH/s", 
              countries: ["Kazakhstan", "Russia", "Malaysia"],
              advantages: ["Low energy costs", "Mining infrastructure", "Government support"]
            },
            {
              region: "Europe",
              percentage: 20,
              hashrate: "90 EH/s",
              countries: ["Norway", "Iceland", "Georgia"],
              advantages: ["Renewable energy", "Stable regulation", "Cool climate"]
            },
            {
              region: "Other",
              percentage: 15,
              hashrate: "67.5 EH/s",
              countries: ["Various"],
              advantages: ["Emerging markets", "Stranded energy", "Innovation"]
            }
          ]
        },
        decentralizationBenefits: [
          "No single point of failure",
          "Resistant to government control",
          "Geographic redundancy", 
          "Cultural and political diversity",
          "24/7/365 global operation"
        ],
        comparisonToOther: {
          internetServers: "More distributed than major websites",
          bankingSystem: "No central clearing houses",
          goldStorage: "No Fort Knox equivalent",
          militaryDefense: "More distributed than any defense system"
        }
      }
    },

    {
      title: "Mining Pool Dynamics",
      type: "pool-simulation",
      content: {
        title: "🤝 Strength in Numbers: How Mining Pools Work",
        subtitle: "Understand how small miners combine forces while maintaining decentralization",
        primeText: "Individual miners join pools to share rewards, but the network remains decentralized because pools compete with each other.",
        poolConcepts: {
          soloMining: {
            pros: ["Keep all rewards", "Complete independence", "No pool fees"],
            cons: ["Irregular payouts", "Need massive hashrate", "High variance"],
            analogy: "Like playing lottery alone—big wins but very rare"
          },
          poolMining: {
            pros: ["Regular payouts", "Predictable income", "Lower barrier to entry"],
            cons: ["Share rewards", "Pool fees", "Trust pool operator"],
            analogy: "Like group lottery tickets—smaller but regular wins"
          }
        },
        poolMechanics: {
          shareSubmission: "Miners submit partial solutions as 'shares'",
          rewardDistribution: "Pool splits block rewards based on contributed shares",
          difficultyAdjustment: "Pool sets easier targets for individual miners",
          poolSwitching: "Miners can change pools if unhappy"
        },
        decentralizationMaintenance: [
          "Multiple competing pools prevent centralization",
          "Miners can switch pools instantly",
          "Pool operators don't control miners' hardware",
          "Economic incentives align with network health"
        ]
      }
    },

    {
      title: "Proof of Work vs Alternatives",
      type: "consensus-comparison",
      content: {
        title: "⚖️ Why Energy-Based Security Wins",
        subtitle: "Compare Bitcoin's Proof of Work to other consensus mechanisms",
        primeText: "Proof of Work is the only consensus mechanism that transforms real-world energy into digital security without creating new attack vectors.",
        consensusMechanisms: [
          {
            name: "Proof of Work (Bitcoin)",
            energyRequirement: "High",
            securityModel: "Energy investment",
            tradeoffs: {
              pros: [
                "Objective consensus (physics-based)",
                "No wealth concentration from staking",
                "Proven track record (15+ years)",
                "Incentivizes energy innovation"
              ],
              cons: [
                "High energy consumption",
                "Environmental concerns from some",
                "Hardware requirements",
                "Hash rate centralization risks"
              ]
            },
            realWorldAnalogy: "Like hiring security guards—costs money but provides real protection"
          },
          {
            name: "Proof of Stake",
            energyRequirement: "Low",
            securityModel: "Economic stake",
            tradeoffs: {
              pros: [
                "Lower energy consumption",
                "Faster transaction finality",
                "No mining hardware needed",
                "Built-in governance mechanisms"
              ],
              cons: [
                "Wealth concentration (rich get richer)",
                "Nothing at stake problem",
                "Long-range attack vulnerability",
                "Subjective consensus (social layer)"
              ]
            },
            realWorldAnalogy: "Like judges who are also shareholders—conflicts of interest"
          }
        ],
        whyPowMatter: [
          "Energy creates objective, unforgeable cost",
          "No alternative has Bitcoin's security track record",
          "PoW naturally decentralizes over time",
          "Energy investment aligns with long-term network health"
        ]
      }
    },

    {
      title: "Your Role in the Network",
      type: "actionable-mining",
      content: {
        title: "🚀 How You Can Participate in Bitcoin's Security",
        subtitle: "From running a node to understanding mining, here's how to contribute",
        primeText: "You don't need to be a big miner to participate in and support Bitcoin's security network.",
        participationLevels: [
          {
            level: "Bitcoin Node Operator",
            description: "Run Bitcoin Core to validate transactions and blocks",
            requirements: ["Computer", "Internet connection", "~500GB storage"],
            contribution: "Helps maintain network decentralization and censorship resistance",
            gettingStarted: "Download Bitcoin Core, sync blockchain, keep online"
          },
          {
            level: "Home Miner",
            description: "Small-scale mining for education and supporting decentralization",
            requirements: ["ASIC miner (~$500-2000)", "Electricity", "Internet"],
            contribution: "Adds to network security, learns mining process",
            gettingStarted: "Start with USB miners, join mining pools, understand electricity costs"
          },
          {
            level: "Mining Pool Participant",
            description: "Contribute hashrate to pools for regular rewards",
            requirements: ["Mining hardware", "Pool account", "Mining software"],
            contribution: "Consistent network security contribution with predictable returns",
            gettingStarted: "Choose reputable pool, configure miner, monitor performance"
          },
          {
            level: "Energy Innovator",
            description: "Use Bitcoin mining to monetize renewable energy projects",
            requirements: ["Renewable energy source", "Significant capital", "Technical expertise"],
            contribution: "Drives clean energy adoption while securing Bitcoin",
            gettingStarted: "Partner with energy developers, understand grid regulations"
          }
        ],
        keyLearnings: [
          "Mining is the process that transforms energy into security",
          "Higher energy investment = stronger Bitcoin security",
          "Decentralized mining protects against centralized control",
          "Mining incentivizes energy innovation and efficiency",
          "Anyone can participate at various levels"
        ],
        nextSteps: {
          immediate: "Run a Bitcoin node to support the network",
          intermediate: "Learn about mining economics and energy markets",
          advanced: "Explore renewable energy + mining opportunities"
        }
      }
    }
  ];

  // Interactive Mining Simulation Component
  const MiningSimulation = ({ content, onComplete }) => {
    const [selectedLevel, setSelectedLevel] = useState(0);
    const [miningState, setMiningState] = useState('idle'); // idle, mining, success
    const [miningResults, setMiningResults] = useState(null);
    const [energySpent, setEnergySpent] = useState(0);
    const [hashesComputed, setHashesComputed] = useState(0);

    const currentLevel = content.miningLevels[selectedLevel];

    const startMining = () => {
      setMiningState('mining');
      setMiningResults(null);
      setEnergySpent(0);
      setHashesComputed(0);

      // Simulate mining process
      simulateMining();
    };

    const simulateMining = () => {
      const interval = setInterval(() => {
        setEnergySpent(prev => prev + 10);
        setHashesComputed(prev => prev + Math.floor(Math.random() * 1000000));

        // Simulate finding solution based on difficulty
        const successProbability = 0.002 + (selectedLevel * 0.001);
        if (Math.random() < successProbability) {
          clearInterval(interval);
          setMiningState('success');
          
          const blockHash = '0'.repeat(currentLevel.difficulty.length) + 
                           Math.random().toString(36).substring(7);
          
          setMiningResults({
            blockHash,
            energyUsed: energySpent + 10,
            hashesComputed: hashesComputed + Math.floor(Math.random() * 1000000),
            blockReward: currentLevel.blockReward,
            securityContribution: `Added ${energySpent + 10} units of security to the network`
          });

          // Complete on first successful mine
          setTimeout(() => onComplete(), 2000);
        }
      }, 100);

      // Prevent infinite mining
      setTimeout(() => {
        if (miningState === 'mining') {
          clearInterval(interval);
          setMiningState('idle');
        }
      }, 10000);
    };

        return (
      <div className="mining-simulation">
        <div className="simulation-header">
          <h2>{content.title}</h2>
          <p className="subtitle">{content.subtitle}</p>
          <div className="prime-text">{content.primeText}</div>
            </div>

        <div className="energy-transformation-visual">
          <h3>⚡ Energy → Security Transformation</h3>
          <div className="transformation-steps">
            {content.miningLevels[0] && Object.entries(content.title === '🎮 Experience Mining: Transform Energy into Security' ? {
              electricity: { icon: '🔌', label: 'Electricity', value: `${energySpent} kWh` },
              computation: { icon: '🖥️', label: 'Hash Power', value: `${hashesComputed.toLocaleString()} H/s` },
              security: { icon: '🛡️', label: 'Network Security', value: miningState === 'success' ? 'Block Secured!' : 'Mining...' }
            } : {}).map(([key, step]) => (
              <div key={key} className="transformation-step">
                <div className="step-icon">{step.icon}</div>
                <div className="step-content">
                  <div className="step-label">{step.label}</div>
                  <div className="step-value">{step.value}</div>
              </div>
              </div>
            ))}
              </div>
            </div>

        <div className="mining-controls">
          <div className="level-selector">
            <h3>Choose Mining Level:</h3>
            <div className="level-buttons">
              {content.miningLevels.map((level, index) => (
            <button 
                  key={index}
                  className={`level-button ${selectedLevel === index ? 'selected' : ''}`}
                  onClick={() => setSelectedLevel(index)}
                  disabled={miningState === 'mining'}
                >
                  <div className="level-title">{level.title}</div>
                  <div className="level-difficulty">Difficulty: {level.difficulty}</div>
                  <div className="level-cost">Energy: {level.energyCost} kWh</div>
            </button>
              ))}
          </div>
          </div>

          <div className="mining-stats">
            <h3>Network Statistics:</h3>
            <div className="stats-grid">
              <div className="stat-item">
                <strong>Current Difficulty:</strong>
                <span>{content.realWorldStats.currentDifficulty}</span>
              </div>
              <div className="stat-item">
                <strong>Global Hashrate:</strong>
                <span>{content.realWorldStats.globalHashrate}</span>
              </div>
              <div className="stat-item">
                <strong>Energy Usage:</strong>
                <span>{content.realWorldStats.energyConsumption}</span>
              </div>
            </div>
          </div>

          <div className="mining-action">
            <button
              className={`mine-button ${miningState}`}
              onClick={startMining}
              disabled={miningState === 'mining'}
            >
              {miningState === 'idle' && <>⚡ Start Mining</>}
              {miningState === 'mining' && <>⛏️ Mining in Progress...</>}
              {miningState === 'success' && <>🎉 Block Mined!</>}
            </button>
          </div>
        </div>

        {miningState === 'mining' && (
          <div className="mining-progress">
            <div className="progress-stats">
              <div className="stat">
                <span className="stat-label">Energy Spent:</span>
                <span className="stat-value">{energySpent} kWh</span>
              </div>
              <div className="stat">
                <span className="stat-label">Hashes Computed:</span>
                <span className="stat-value">{hashesComputed.toLocaleString()}</span>
              </div>
            </div>
            <div className="mining-animation">
              <div className="mining-visual">⛏️ Computing hashes... 🔥</div>
            </div>
          </div>
        )}

        {miningResults && (
          <div className="mining-results success">
            <h3>🎉 Successful Mining!</h3>
            <div className="results-grid">
              <div className="result-item">
                <strong>Block Hash:</strong>
                <code>{miningResults.blockHash}</code>
              </div>
              <div className="result-item">
                <strong>Energy Invested:</strong>
                <span>{miningResults.energyUsed} kWh</span>
              </div>
              <div className="result-item">
                <strong>Hashes Computed:</strong>
                <span>{miningResults.hashesComputed.toLocaleString()}</span>
              </div>
              <div className="result-item">
                <strong>Block Reward:</strong>
                <span>{miningResults.blockReward} BTC</span>
              </div>
            </div>
            <div className="security-contribution">
              <div className="contribution-icon">🛡️</div>
              <p><strong>Security Contribution:</strong> {miningResults.securityContribution}</p>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderStep = (step, index) => {
    switch (step.type) {
      case 'energy-security-intro':
        return <EnergySecurityIntro content={step.content} onComplete={() => handleStepComplete(index)} />;
      
      case 'mining-simulation':
        return <MiningSimulation content={step.content} onComplete={() => handleStepComplete(index)} />;
      
      case 'difficulty-demonstration':
        return <DifficultyDemonstration content={step.content} onComplete={() => handleStepComplete(index)} />;
      
      case 'attack-cost-calculator':
        return <AttackCostCalculator content={step.content} onComplete={() => handleStepComplete(index)} />;
      
      case 'energy-innovation':
        return <EnergyInnovation content={step.content} onComplete={() => handleStepComplete(index)} />;
      
      case 'network-visualization':
        return <NetworkVisualization content={step.content} onComplete={() => handleStepComplete(index)} />;
      
      case 'pool-simulation':
        return <PoolSimulation content={step.content} onComplete={() => handleStepComplete(index)} />;
      
      case 'consensus-comparison':
        return <ConsensusComparison content={step.content} onComplete={() => handleStepComplete(index)} />;
      
      case 'actionable-mining':
        return <ActionableMining content={step.content} onComplete={() => handleStepComplete(index)} />;
      
      default:
        return (
          <div className="step-content">
            <h2>{step.title}</h2>
            <p>Step type "{step.type}" implementation in progress...</p>
            <button className="continue-button" onClick={() => handleStepComplete(index)}>
              Continue
            </button>
          </div>
        );
    }
  };

  if (currentStep >= steps.length) {
        return (
      <div className="module-container">
        <div className="completion-screen">
          <div className="completion-icon">
            <Trophy size={64} />
          </div>
          <h1>⚡ Energy → Security Mastery Complete!</h1>
          <p>You now understand how Bitcoin transforms electrical energy into the most secure monetary network in human history.</p>
          <div className="completion-stats">
            <div className="stat">
              <span className="stat-number">{steps.length}</span>
              <span className="stat-label">Security Concepts Mastered</span>
            </div>
            <div className="stat">
              <span className="stat-number">450 EH/s</span>
              <span className="stat-label">Global Network You Understand</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="module-container">
      <div className="module-header">
        <h1 className="module-title">
          <Zap className="module-icon" />
          Energy → Security: How Bitcoin Transforms Physics into Trust
        </h1>
      <div className="module-progress">
          <span>Step {currentStep + 1} of {steps.length}</span>
        <div className="progress-bar">
          <div 
            className="progress-fill"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>
        </div>
      </div>

      <div className="module-tabs">
          {steps.map((step, index) => (
            <button
              key={index}
            className={`tab ${index === currentStep ? 'active' : ''} ${completedSteps.has(index) ? 'completed' : ''}`}
            onClick={() => handleTabClick(index)}
            disabled={index > currentStep}
            >
              {completedSteps.has(index) && <CheckCircle size={16} />}
            <span className="tab-title">{step.title}</span>
            </button>
          ))}
        </div>

        <div className="step-content-container">
          {renderStep(steps[currentStep], currentStep)}
      </div>
    </div>
  );
};

// Difficulty Demonstration Component
const DifficultyDemonstration = ({ content, onComplete }) => {
  const [simulationState, setSimulationState] = useState('idle');
  const [networkHashrate, setNetworkHashrate] = useState(100);
  const [blockTimes, setBlockTimes] = useState([]);
  const [currentDifficulty, setCurrentDifficulty] = useState(1000);

  const runSimulation = () => {
    setSimulationState('running');
    setBlockTimes([]);
    
    // Simulate block times with current hashrate
    const times = [];
    for (let i = 0; i < 10; i++) {
      const expectedTime = 10; // 10 minutes target
      const actualTime = (expectedTime * 1000) / networkHashrate; // Simulate inverse relationship
      times.push(Math.max(0.5, Math.min(20, actualTime + (Math.random() - 0.5) * 2)));
    }
    
    setBlockTimes(times);
    
    // Calculate new difficulty
    const avgTime = times.reduce((a, b) => a + b, 0) / times.length;
    const newDifficulty = Math.round(currentDifficulty * (avgTime / 10));
    
    setTimeout(() => {
      setCurrentDifficulty(newDifficulty);
      setSimulationState('adjusted');
      setTimeout(() => onComplete(), 2000);
    }, 3000);
  };

  return (
    <div className="difficulty-demonstration">
      <div className="demo-header">
        <h2>{content.title}</h2>
        <p className="subtitle">{content.subtitle}</p>
        <div className="prime-text">{content.primeText}</div>
      </div>

      <div className="simulation-controls">
        <h3>Network Hashrate Simulator</h3>
        <div className="hashrate-control">
          <label>Network Hashrate: {networkHashrate} TH/s</label>
          <input
            type="range"
            min="50"
            max="500"
            value={networkHashrate}
            onChange={(e) => setNetworkHashrate(Number(e.target.value))}
            disabled={simulationState === 'running'}
          />
        </div>

        <div className="difficulty-display">
          <div className="metric">
            <span className="metric-label">Current Difficulty:</span>
            <span className="metric-value">{currentDifficulty.toLocaleString()}</span>
          </div>
          <div className="metric">
            <span className="metric-label">Target Block Time:</span>
            <span className="metric-value">10 minutes</span>
          </div>
        </div>

          <button
          className="simulate-button"
          onClick={runSimulation}
          disabled={simulationState === 'running'}
        >
          {simulationState === 'idle' && '⚡ Run Simulation'}
          {simulationState === 'running' && '⏱️ Mining Blocks...'}
          {simulationState === 'adjusted' && '✅ Difficulty Adjusted!'}
          </button>
      </div>

      {blockTimes.length > 0 && (
        <div className="block-times-chart">
          <h3>Block Times (Last 10 Blocks)</h3>
          <div className="chart-container">
            {blockTimes.map((time, index) => (
              <div key={index} className="time-bar-container">
                <div 
                  className={`time-bar ${time > 10 ? 'slow' : time < 10 ? 'fast' : 'target'}`}
                  style={{ height: `${(time / 20) * 100}%` }}
                />
                <span className="time-label">{time.toFixed(1)}m</span>
              </div>
        ))}
      </div>
          <div className="chart-legend">
            <span className="legend-item fast">🟢 Fast (&lt;10m)</span>
            <span className="legend-item target">🟡 Target (~10m)</span>
            <span className="legend-item slow">🔴 Slow (&gt;10m)</span>
          </div>
        </div>
      )}

      <div className="why-it-matters">
        <h3>Why This Matters</h3>
        <div className="benefits-grid">
          {content.whyItMatters.map((benefit, index) => (
            <div key={index} className="benefit-item">
              <CheckCircle size={20} />
              <span>{benefit}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Attack Cost Calculator Component
const AttackCostCalculator = ({ content, onComplete }) => {
  const [selectedScenario, setSelectedScenario] = useState(0);
  const [showCalculation, setShowCalculation] = useState(false);

  const scenario = content.attackScenarios[selectedScenario];

  const handleCalculate = () => {
    setShowCalculation(true);
    setTimeout(() => onComplete(), 3000);
  };

  return (
    <div className="attack-cost-calculator">
      <div className="calculator-header">
        <h2>{content.title}</h2>
        <p className="subtitle">{content.subtitle}</p>
        <div className="prime-text">{content.primeText}</div>
      </div>

      <div className="scenario-selector">
        <h3>Choose Attack Scenario:</h3>
        <div className="scenario-buttons">
          {content.attackScenarios.map((scenario, index) => (
            <button
              key={index}
              className={`scenario-button ${selectedScenario === index ? 'selected' : ''}`}
              onClick={() => setSelectedScenario(index)}
            >
              <h4>{scenario.scenario}</h4>
              <p>{scenario.description}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="attack-analysis">
        <h3>Attack Requirements: {scenario.scenario}</h3>
        <div className="requirements-grid">
          {Object.entries(scenario.requirements).map(([key, value]) => (
            <div key={key} className="requirement-item">
              <strong>{key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}:</strong>
              <span>{value}</span>
            </div>
          ))}
        </div>

        <div className="likelihood-assessment">
          <div className="assessment-item">
            <strong>Likelihood:</strong>
            <span className={`likelihood ${scenario.likelihood.toLowerCase().includes('impossible') ? 'impossible' : scenario.likelihood.toLowerCase().includes('extremely') ? 'very-low' : 'possible'}`}>
              {scenario.likelihood}
            </span>
          </div>
          <div className="assessment-item">
            <strong>Comparison:</strong>
            <span>{scenario.comparison}</span>
          </div>
        </div>

        <button className="calculate-button" onClick={handleCalculate}>
          💰 Calculate Total Cost
        </button>
      </div>

      {showCalculation && (
        <div className="cost-breakdown">
          <h3>💸 Economic Reality Check</h3>
          <div className="cost-analysis">
            <div className="cost-item total">
              <span className="cost-label">Total Attack Cost:</span>
              <span className="cost-value">
                {selectedScenario === 0 ? '$23+ Billion' : selectedScenario === 1 ? '$1-10 Million' : '$50-100 Million'}
              </span>
            </div>
            <div className="economic-incentive">
              <h4>Economic Incentives</h4>
              <div className="incentive-comparison">
                <div className="incentive-item honest">
                  <strong>Honest Mining:</strong>
                  <span>{content.economicIncentives.honestMining}</span>
                </div>
                <div className="incentive-item malicious">
                  <strong>Malicious Attack:</strong>
                  <span>{content.economicIncentives.maliciousAttack}</span>
                </div>
              </div>
              <div className="conclusion">
                <strong>Conclusion:</strong> {content.economicIncentives.conclusion}
              </div>
            </div>
          </div>
        </div>
      )}

      <VisualCapitalistSection
        icon="⚡"
        title="Explore Further: Energy Consumption Context"
        description="See how Bitcoin's energy consumption compares to other industries like banking, gold mining, and data centers. This puts Bitcoin's energy use in global perspective."
        url="https://www.visualcapitalist.com/bitcoin-energy-consumption-by-country/"
        buttonText="View Energy Comparison"
      />
    </div>
  );
};

// Energy Innovation Component
const EnergyInnovation = ({ content, onComplete }) => {
  const [selectedCategory, setSelectedCategory] = useState(0);

  return (
    <div className="energy-innovation">
      <div className="innovation-header">
        <h2>{content.title}</h2>
        <p className="subtitle">{content.subtitle}</p>
        <div className="prime-text">{content.primeText}</div>
      </div>

      <div className="innovation-drivers">
        <h3>🌱 How Bitcoin Drives Energy Innovation</h3>
        <div className="driver-tabs">
          {content.innovationDrivers.map((driver, index) => (
              <button
                key={index}
              className={`driver-tab ${selectedCategory === index ? 'active' : ''}`}
              onClick={() => setSelectedCategory(index)}
              >
              <span className="tab-icon">{driver.icon}</span>
              <span className="tab-title">{driver.category}</span>
              </button>
            ))}
          </div>

        <div className="driver-content">
          <div className="driver-examples">
            <h4>Examples:</h4>
            <ul>
              {content.innovationDrivers[selectedCategory].examples.map((example, index) => (
                <li key={index}>{example}</li>
              ))}
            </ul>
          </div>
          <div className="driver-impact">
            <strong>Impact:</strong> {content.innovationDrivers[selectedCategory].impact}
          </div>
        </div>
        </div>

      <div className="real-world-examples">
        <h3>🌍 Real-World Examples</h3>
        <div className="examples-grid">
          {Object.entries(content.realWorldExamples).map(([location, description]) => (
            <div key={location} className="example-card">
              <h4>{location.charAt(0).toUpperCase() + location.slice(1)}</h4>
              <p>{description}</p>
          </div>
          ))}
          </div>
        </div>

      <div className="future-vision">
        <div className="vision-content">
          <Leaf size={48} />
          <h3>Future Vision</h3>
          <p>{content.futureVision}</p>
        </div>
      </div>

      <button className="continue-button" onClick={onComplete}>
        Explore Global Network 🌍
          </button>
        </div>
  );
};

// Network Visualization Component
const NetworkVisualization = ({ content, onComplete }) => {
  const [selectedRegion, setSelectedRegion] = useState(null);

  return (
    <div className="network-visualization">
      <div className="visualization-header">
        <h2>{content.title}</h2>
        <p className="subtitle">{content.subtitle}</p>
        <div className="prime-text">{content.primeText}</div>
      </div>

      <div className="global-map">
        <h3>🌍 Global Mining Distribution</h3>
        <div className="regions-grid">
          {content.globalDistribution.regions.map((region, index) => (
            <div
              key={index}
              className={`region-card ${selectedRegion === index ? 'selected' : ''}`}
              onClick={() => setSelectedRegion(selectedRegion === index ? null : index)}
            >
              <div className="region-header">
                <h4>{region.region}</h4>
                <span className="percentage">{region.percentage}%</span>
            </div>
              <div className="hashrate">{region.hashrate}</div>
              
              {selectedRegion === index && (
                <div className="region-details">
                  <div className="countries">
                    <strong>Key Countries:</strong> {region.countries.join(', ')}
            </div>
                  <div className="advantages">
                    <strong>Advantages:</strong>
                    <ul>
                      {region.advantages.map((advantage, i) => (
                        <li key={i}>{advantage}</li>
                      ))}
                    </ul>
          </div>
        </div>
      )}
            </div>
          ))}
        </div>
      </div>

      <div className="decentralization-benefits">
        <h3>🛡️ Decentralization Benefits</h3>
        <div className="benefits-grid">
          {content.decentralizationBenefits.map((benefit, index) => (
            <div key={index} className="benefit-card">
              <Shield size={24} />
              <span>{benefit}</span>
            </div>
          ))}
            </div>
                </div>

      <div className="comparison-section">
        <h3>⚖️ Comparison to Other Systems</h3>
        <div className="comparison-cards">
          {Object.entries(content.comparisonToOther).map(([system, description]) => (
            <div key={system} className="comparison-card">
              <h4>{system.replace(/([A-Z])/g, ' $1').trim()}</h4>
              <p>{description}</p>
                </div>
          ))}
          </div>
        </div>

      <button className="continue-button" onClick={onComplete}>
        Learn About Mining Pools 🤝
      </button>
    </div>
  );
};

// Pool Simulation Component
const PoolSimulation = ({ content, onComplete }) => {
  const [miningMode, setMiningMode] = useState('solo');
  const [poolResults, setPoolResults] = useState(null);

  const simulatePoolMining = () => {
    const results = {
      solo: {
        timeToBlock: '45 days',
        variance: 'Very High',
        reward: '6.25 BTC',
        frequency: 'Once every 1-2 months',
        reliability: 'Low'
      },
      pool: {
        timeToBlock: 'N/A (share rewards)',
        variance: 'Low',
        reward: '0.01 BTC daily',
        frequency: 'Daily payouts',
        reliability: 'High'
      }
    };
    
    setPoolResults(results[miningMode]);
    setTimeout(() => onComplete(), 2000);
  };

  return (
    <div className="pool-simulation">
      <div className="simulation-header">
        <h2>{content.title}</h2>
        <p className="subtitle">{content.subtitle}</p>
        <div className="prime-text">{content.primeText}</div>
      </div>

      <div className="mining-mode-selector">
        <h3>Choose Your Mining Strategy:</h3>
        <div className="mode-options">
          <div className={`mode-option ${miningMode === 'solo' ? 'selected' : ''}`}>
            <button onClick={() => setMiningMode('solo')}>
              <h4>Solo Mining</h4>
              <div className="mode-details">
                <div className="pros">
                  <strong>Pros:</strong>
                  <ul>
                    {content.poolConcepts.soloMining.pros.map((pro, i) => (
                      <li key={i}>{pro}</li>
                    ))}
                  </ul>
                </div>
                <div className="cons">
                  <strong>Cons:</strong>
                  <ul>
                    {content.poolConcepts.soloMining.cons.map((con, i) => (
                      <li key={i}>{con}</li>
                    ))}
                  </ul>
                </div>
                <div className="analogy">
                  <em>{content.poolConcepts.soloMining.analogy}</em>
                </div>
              </div>
            </button>
          </div>

          <div className={`mode-option ${miningMode === 'pool' ? 'selected' : ''}`}>
            <button onClick={() => setMiningMode('pool')}>
              <h4>Pool Mining</h4>
              <div className="mode-details">
                <div className="pros">
                  <strong>Pros:</strong>
                  <ul>
                    {content.poolConcepts.poolMining.pros.map((pro, i) => (
                      <li key={i}>{pro}</li>
                    ))}
                  </ul>
                </div>
                <div className="cons">
                  <strong>Cons:</strong>
                  <ul>
                    {content.poolConcepts.poolMining.cons.map((con, i) => (
                      <li key={i}>{con}</li>
                    ))}
                  </ul>
                </div>
                <div className="analogy">
                  <em>{content.poolConcepts.poolMining.analogy}</em>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>

      <div className="pool-mechanics">
        <h3>🔧 How Pool Mining Works</h3>
        <div className="mechanics-steps">
          {Object.entries(content.poolMechanics).map(([step, description]) => (
            <div key={step} className="mechanic-step">
              <h4>{step.replace(/([A-Z])/g, ' $1').trim()}</h4>
              <p>{description}</p>
            </div>
          ))}
        </div>
      </div>

      <button className="simulate-button" onClick={simulatePoolMining}>
        🎮 Simulate {miningMode === 'solo' ? 'Solo' : 'Pool'} Mining
      </button>

      {poolResults && (
        <div className="simulation-results">
          <h3>Simulation Results: {miningMode === 'solo' ? 'Solo' : 'Pool'} Mining</h3>
          <div className="results-grid">
            {Object.entries(poolResults).map(([metric, value]) => (
              <div key={metric} className="result-metric">
                <strong>{metric.replace(/([A-Z])/g, ' $1').trim()}:</strong>
                <span>{value}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="decentralization-note">
        <h3>🌐 Maintaining Decentralization</h3>
        <ul>
          {content.decentralizationMaintenance.map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// Consensus Comparison Component  
const ConsensusComparison = ({ content, onComplete }) => {
  const [selectedMechanism, setSelectedMechanism] = useState(0);

  return (
    <div className="consensus-comparison">
      <div className="comparison-header">
        <h2>{content.title}</h2>
        <p className="subtitle">{content.subtitle}</p>
        <div className="prime-text">{content.primeText}</div>
      </div>

      <div className="mechanism-selector">
        <div className="mechanism-tabs">
          {content.consensusMechanisms.map((mechanism, index) => (
              <button
                key={index}
              className={`mechanism-tab ${selectedMechanism === index ? 'active' : ''}`}
              onClick={() => setSelectedMechanism(index)}
              >
              {mechanism.name}
              </button>
            ))}
          </div>
        </div>

      <div className="mechanism-details">
        <div className="mechanism-overview">
          <h3>{content.consensusMechanisms[selectedMechanism].name}</h3>
          <div className="overview-metrics">
            <div className="metric">
              <strong>Energy Requirement:</strong>
              <span className={`energy-level ${content.consensusMechanisms[selectedMechanism].energyRequirement.toLowerCase()}`}>
                {content.consensusMechanisms[selectedMechanism].energyRequirement}
        </span>
          </div>
            <div className="metric">
              <strong>Security Model:</strong>
              <span>{content.consensusMechanisms[selectedMechanism].securityModel}</span>
            </div>
          </div>
        </div>

        <div className="tradeoffs-analysis">
          <div className="pros-cons">
            <div className="pros">
              <h4>✅ Advantages</h4>
              <ul>
                {content.consensusMechanisms[selectedMechanism].tradeoffs.pros.map((pro, i) => (
                  <li key={i}>{pro}</li>
                ))}
              </ul>
            </div>
            <div className="cons">
              <h4>❌ Disadvantages</h4>
              <ul>
                {content.consensusMechanisms[selectedMechanism].tradeoffs.cons.map((con, i) => (
                  <li key={i}>{con}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="real-world-analogy">
            <strong>Real-world analogy:</strong>
            <em>{content.consensusMechanisms[selectedMechanism].realWorldAnalogy}</em>
          </div>
        </div>
      </div>

      <div className="why-pow-matters">
        <h3>⚡ Why Proof of Work Matters</h3>
        <div className="pow-benefits">
          {content.whyPowMatter.map((benefit, index) => (
            <div key={index} className="benefit-point">
              <Zap size={20} />
              <span>{benefit}</span>
            </div>
          ))}
        </div>
      </div>

      <button className="continue-button" onClick={onComplete}>
        Discover Your Role 🚀
      </button>
    </div>
  );
};

// Actionable Mining Component
const ActionableMining = ({ content, onComplete }) => {
  const [selectedLevel, setSelectedLevel] = useState(0);

  return (
    <div className="actionable-mining">
      <div className="actionable-header">
        <h2>{content.title}</h2>
        <p className="subtitle">{content.subtitle}</p>
        <div className="prime-text">{content.primeText}</div>
      </div>

      <div className="participation-levels">
        <h3>🎯 Choose Your Participation Level</h3>
        <div className="level-selector">
          {content.participationLevels.map((level, index) => (
        <button 
              key={index}
              className={`participation-level ${selectedLevel === index ? 'selected' : ''}`}
              onClick={() => setSelectedLevel(index)}
            >
              <h4>{level.level}</h4>
              <p>{level.description}</p>
        </button>
          ))}
      </div>

        <div className="level-details">
          <div className="level-info">
            <h4>{content.participationLevels[selectedLevel].level}</h4>
            <div className="requirements">
              <strong>Requirements:</strong>
              <ul>
                {content.participationLevels[selectedLevel].requirements.map((req, i) => (
                  <li key={i}>{req}</li>
                ))}
              </ul>
            </div>
            <div className="contribution">
              <strong>Your Contribution:</strong>
              <p>{content.participationLevels[selectedLevel].contribution}</p>
            </div>
            <div className="getting-started">
              <strong>Getting Started:</strong>
              <p>{content.participationLevels[selectedLevel].gettingStarted}</p>
          </div>
        </div>
        </div>
      </div>

      <div className="key-learnings">
        <h3>🧠 Key Learnings</h3>
        <div className="learnings-grid">
          {content.keyLearnings.map((learning, index) => (
            <div key={index} className="learning-item">
              <CheckCircle size={20} />
              <span>{learning}</span>
            </div>
          ))}
            </div>
                </div>

      <div className="next-steps">
        <h3>🚀 Your Next Steps</h3>
        <div className="steps-timeline">
          <div className="step immediate">
            <h4>Immediate</h4>
            <p>{content.nextSteps.immediate}</p>
                </div>
          <div className="step intermediate">
            <h4>Intermediate</h4>
            <p>{content.nextSteps.intermediate}</p>
          </div>
          <div className="step advanced">
            <h4>Advanced</h4>
            <p>{content.nextSteps.advanced}</p>
        </div>
        </div>
      </div>

      <button className="complete-button" onClick={onComplete}>
        🎓 Complete Mining Mastery
      </button>
    </div>
  );
};

// Energy Security Intro Component  
const EnergySecurityIntro = ({ content, onComplete }) => {
  return (
    <div className="energy-security-intro">
      <div className="intro-header">
        <h2>{content.title}</h2>
        <p className="subtitle">{content.subtitle}</p>
        <div className="prime-text">{content.primeText}</div>
      </div>

      <div className="transformation-chain">
        <h3>⚡ The Energy → Security Transformation</h3>
        <div className="chain-steps">
          {Object.entries(content.transformationChain).map(([key, step]) => (
            <div key={key} className="chain-step">
              <div className="step-icon">{step.icon}</div>
              <div className="step-content">
                <h4>{step.title}</h4>
                <p>{step.description}</p>
                <div className="step-detail">{step.detail}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="key-insight">
        <div className="insight-icon">💡</div>
        <div className="insight-content">
          <h3>Key Insight</h3>
          <p>{content.keyInsight}</p>
      </div>
      </div>

      <div className="trust-comparison">
        <h3>🤔 Two Models of Trust</h3>
        <div className="comparison-grid">
          <div className="comparison-item traditional">
            <h4>🏛️ Traditional System</h4>
            <p>{content.comparison.traditional}</p>
          </div>
          <div className="comparison-item bitcoin">
            <h4>₿ Bitcoin System</h4>
            <p>{content.comparison.bitcoin}</p>
          </div>
        </div>
      </div>

      <button className="continue-button" onClick={onComplete}>
        Explore Mining Simulation ⚡
        </button>
    </div>
  );
};

export default MiningModule; 