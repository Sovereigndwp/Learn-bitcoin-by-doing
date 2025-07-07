import React, { useState, useEffect } from 'react';
import { useProgress } from '../contexts/ProgressContext';
import { Zap, Bitcoin, CheckCircle, Trophy, Clock, Target, BarChart, Globe, Shield, Coins, TrendingUp, Activity, Power } from 'lucide-react';
import AnimatedIcon from '../components/AnimatedIcon';
import '../components/ModuleLayout.css';
import '../components/ModuleCommon.css';
import './BitcoinBasicsModule.css';

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

const BitcoinBasicsModule = () => {
  const { completeModule } = useProgress();
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(new Set());
  
  const handleStepComplete = (index) => {
    setCompletedSteps(prev => new Set(prev).add(index));
    if (index === steps.length - 1) {
      completeModule('bitcoin-basics');
    }
    
    // Show achievement for key milestones
    if (index === 1) {
      showAchievement("Money Evolutionist", "You understand the progression from Gold to Bitcoin!");
    } else if (index === 3) {
      showAchievement("Energy Pioneer", "You grasp how Bitcoin transforms energy into digital truth!");
    } else if (index === 6) {
      showAchievement("Power Law Thinker", "You see beyond exponential to true power law growth!");
    } else if (index === 8) {
      showAchievement("Bitcoin Scholar", "You understand why Bitcoin conquers both space and time!");
    }
    
    setCurrentStep(index + 1);
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
      title: "The Great Money Evolution",
      type: "evolution-timeline",
      content: {
        title: "🌀 The Money Timeline: 1.0 → 2.0 → 3.0",
        subtitle: "Every few centuries, money evolves. We're living through the biggest change yet.",
        primeText: "If Gold was Money 1.0 and Fiat was 2.0, Bitcoin is 3.0—because now, money runs on energy.",
        versions: [
          {
            version: "1.0",
            name: "Gold",
            period: "~5000 years", 
            keyFeature: "Hard to make, durable",
            weakness: "Heavy, hard to send",
            energy: "Physical mining energy",
            trust: "Natural scarcity",
            icon: "🥇"
          },
          {
            version: "2.0", 
            name: "Fiat",
            period: "~50 years",
            keyFeature: "Easy to print, scalable", 
            weakness: "No real cost = abuse",
            energy: "Government promises",
            trust: "Trust in institutions",
            icon: "💵"
          },
          {
            version: "3.0",
            name: "Bitcoin", 
            period: "~15 years",
            keyFeature: "Runs on energy & code",
            weakness: "Still early",
            energy: "Computational proof-of-work",
            trust: "Mathematical certainty",
            icon: "₿"
          }
        ],
        question: "Why do we trust things more when they cost real effort?",
        socratics: [
          "What happens when money has no cost to produce?",
          "Why did gold work for thousands of years?", 
          "What if we could combine gold's hardness with the internet's speed?"
        ]
      }
    },

    {
      title: "Energy Becomes Money",
      type: "energy-transformation",
      content: {
        title: "🔌 Bitcoin: Energy → Digital Truth",
        subtitle: "Bitcoin doesn't borrow trust. It earns it, through work.",
        primeText: "Bitcoin takes real-world energy, passes it through cryptographic math, and produces digital truth.",
        analogy: {
          title: "Think of it like a toaster:",
          comparison: [
            "🍞 Toaster: Electricity → Heat → Toast",
            "₿ Bitcoin: Energy → Math → Verifiable Digital Money"
          ]
        },
        transformation: {
          input: "Electricity from the grid",
          process: "Specialized computers solve cryptographic puzzles", 
          output: "Tamper-proof digital records",
          result: "Money that can't be faked or duplicated"
        },
        costComparison: {
          gold: "Dig holes, move rocks, refine metal",
          fiat: "Print paper, update database",
          bitcoin: "Burn electricity, solve math, secure network"
        },
        question: "If something takes zero effort to create, should it have value?",
        insight: "Just like gold had to be mined, Bitcoin must be mined—only now, it's with computational power, not shovels."
      }
    },

    {
      title: "Not Exponential—POWER Law",
      type: "power-law-discovery",
      content: {
        title: "📈 Bitcoin Doesn't Grow Like Tech Stocks",
        subtitle: "Most people think Bitcoin grows exponentially. They're wrong.",
        primeText: "Bitcoin grows like a power law system. Think: earthquakes, lightning, Internet traffic, wealth distribution.",
        linearVsLog: {
          linear: {
            title: "📊 Linear Chart (What Most People See)",
            description: "Looks like crazy bubbles and crashes",
            perception: "Volatile, unpredictable, risky"
          },
          logLog: {
            title: "📈 Log-Log Chart (The Real Pattern)", 
            description: "Looks like a straight line trending up",
            perception: "Steady, predictable power law growth"
          }
        },
        systems: {
          exponential: {
            title: "Exponential Systems",
            examples: ["Population booms", "Viral spread", "Debt bubbles"],
            characteristic: "Fast growth that hits limits and crashes",
            lifespan: "Short bursts, then collapse"
          },
          powerLaw: {
            title: "Power Law Systems", 
            examples: ["Earthquakes", "Lightning", "Language use", "Bitcoin"],
            characteristic: "Starts fast, stabilizes, becomes deeply resilient",
            lifespan: "Slow, relentless growth over centuries"
          }
        },
        question: "Which would you rather have—fast growth that burns out, or slow, relentless growth that compounds over centuries?",
        insight: "Bitcoin has bubble behavior... but power law resilience."
      }
    },

    {
      title: "Interactive: Try to Double-Spend Energy",
      type: "energy-double-spend",
      content: {
        title: "⚡ Can You Spend the Same Energy Twice?",
        subtitle: "Let's see what happens when you try to cheat an energy-based system",
        primeText: "In the old system, digital money was just numbers in a database. But Bitcoin is different—it's backed by actual energy work.",
        scenario: {
          setup: "You're a Bitcoin miner with 1000 units of electricity",
          challenge: "Try to use the same energy to mine two different blocks",
          realWorld: "This is like trying to use the same gallon of gas to drive two different cars"
        },
        simulation: {
          step1: "Spend 1000 energy units on Block A",
          step2: "Try to spend the same 1000 units on Block B", 
          result: "ERROR: Energy already consumed",
          insight: "Physical laws prevent energy from being spent twice"
        },
        contrast: {
          traditional: "Copy-paste digital numbers",
          bitcoin: "Burn real energy that can't be recovered"
        },
        question: "What makes Bitcoin impossible to counterfeit?",
        answer: "It's backed by actual energy work that can't be faked or duplicated."
      }
    },

    {
      title: "Bitcoin Conquers Space AND Time",
      type: "space-time-conquest", 
      content: {
        title: "🌍 Why Aliens Would Accept Bitcoin",
        subtitle: "The first money that works across both space and time",
        primeText: "Bitcoin solves problems that gold and fiat couldn't even address.",
        propertyMatrix: {
          properties: ["Scarce", "Divisible", "Portable (space)", "Durable (time)", "Verifiable", "Global/Neutral", "Costs to Produce"],
          gold: [true, false, false, true, false, false, true],
          fiat: [false, true, true, false, false, false, false], 
          bitcoin: [true, true, true, true, true, true, true]
        },
        spaceConquest: {
          title: "Conquering Space (Instant Global Transfer)",
          gold: "❌ Can't send gold to space or across oceans quickly",
          fiat: "❌ Limited by banking hours, borders, permissions",
          bitcoin: "✅ Send to anyone, anywhere, anytime in ~10 minutes"
        },
        timeConquest: {
          title: "Conquering Time (Preserving Value)", 
          gold: "⚠️ Can be confiscated, hard to store securely",
          fiat: "❌ Loses value to inflation over time",
          bitcoin: "✅ Fixed supply, self-custody, inflation-proof"
        },
        alienTest: {
          question: "Which money would aliens accept if they landed tomorrow?",
          analysis: "They'd need something: globally recognized, mathematically verifiable, not controlled by any Earth government, based on universal principles (energy and math)."
        }
      }
    },

    {
      title: "Liquidity = Energy Flow",
      type: "energy-flow",
      content: {
        title: "🌊 Money as Energy Rivers",
        subtitle: "Liquidity is like water—it needs pipes. Bitcoin has the deepest pipes.",
        primeText: "Bitcoin transfers energy value at the speed of light through the deepest global pipes ever built.",
        riverAnalogy: {
          goldRiver: {
            title: "🥇 Gold River",
            flow: "Slow, blocked by dams (storage costs)",
            pipes: "Armored trucks, vaults, banks",
            speed: "Days to weeks for transfers"
          },
          fiatRiver: {
            title: "💵 Fiat River", 
            flow: "Controlled by gatekeepers (banks)",
            pipes: "SWIFT network, correspondent banks",
            speed: "Hours to days, limited by banking hours"
          },
          bitcoinRiver: {
            title: "₿ Bitcoin River",
            flow: "Unrestricted global flow", 
            pipes: "Internet infrastructure, global nodes",
            speed: "~10 minutes, 24/7/365"
          }
        },
        energyFlow: {
          concept: "When you send Bitcoin, you're transferring stored energy work",
          process: "Energy → Mining → Secured value → Transfer → Received energy value",
          advantage: "No energy is lost to middlemen taking cuts"
        },
        question: "What happens when more people and capital flow into a system that rewards effort and can't be inflated?",
        insight: "Network effects compound: more users = more security = more value = more users."
      }
    },

    {
      title: "The Staircase, Not the Elevator",
      type: "growth-pattern",
      content: {
        title: "📊 Bitcoin's Logarithmic Staircase",
        subtitle: "It's not a straight line up. It's a series of step-functions.",
        primeText: "Bitcoin grows through trial by fire—each crash cleanses, then the network gets stronger.",
        staircase: {
          pattern: "Up, plateau, up higher, plateau, up even higher...",
          phases: [
            {
              phase: "Discovery",
              description: "New use case discovered",
              example: "2010: Digital payments"
            },
            {
              phase: "Adoption",
              description: "Early adopters rush in", 
              example: "2011: First exchanges open"
            },
            {
              phase: "Bubble",
              description: "Speculation gets ahead of reality",
              example: "2017: Everyone's talking about Bitcoin"
            },
            {
              phase: "Correction", 
              description: "Weak hands exit, infrastructure improves",
              example: "2018: Building continues quietly"
            },
            {
              phase: "Stabilization",
              description: "New baseline established, stronger foundation",
              example: "2019: Institutions start watching"
            }
          ]
        },
        resilience: {
          title: "Each Cycle Builds Resilience",
          points: [
            "More diverse user base",
            "Better infrastructure", 
            "Stronger security (more miners)",
            "Clearer regulatory framework",
            "Deeper liquidity pools"
          ]
        },
        question: "Would you rather ride an elevator that might crash, or climb a staircase that gets stronger with each step?",
        insight: "Bitcoin's volatility isn't a bug—it's how the system builds strength and finds true price discovery."
      }
    },

    {
      title: "Why This Time IS Different",
      type: "uniqueness",
      content: {
        title: "🧬 Why Bitcoin Can't Be Copied",
        subtitle: "Every digital asset before Bitcoin could be copied infinitely. Not anymore.",
        primeText: "Bitcoin created the first digitally scarce asset. This isn't just innovation—it's a new law of physics for the digital world.",
        beforeBitcoin: {
          title: "Before Bitcoin: Everything Digital Could Be Copied",
          examples: ["Music files", "Photos", "PDFs", "Emails", "Software", "Even 'digital money'"],
          problem: "If money can be copied, it's not really money"
        },
        bitcoinSolution: {
          title: "Bitcoin's Three-Part Solution",
          parts: [
            {
              component: "Public Ledger",
              function: "Everyone can verify who owns what",
              analogy: "Like a transparent bank vault that everyone can audit"
            },
            {
              component: "Proof-of-Work", 
              function: "Makes cheating expensive (costs real energy)",
              analogy: "Like requiring actual physical work to create money"
            },
            {
              component: "Fixed Supply",
              function: "No one can change the rules (21 million cap)",
              analogy: "Like having natural laws that can't be repealed"
            }
          ]
        },
        impossibleToCopy: {
          title: "Why Copies Fail",
          network: "Bitcoin's network effect is its moat",
          security: "Security comes from energy invested over time",
          trust: "Trust is built through years of unstoppable operation"
        },
        finalQuestion: "If this is what Bitcoin is... what else can it fix?",
        possibilities: [
          "True digital property rights",
          "Censorship-resistant savings", 
          "Permissionless global commerce",
          "Energy → value conversion anywhere on Earth"
        ]
      }
    },

    {
      title: "Your Next Steps Into Money 3.0",
      type: "actionable-conclusion",
      content: {
        title: "🚀 You Now Understand Money 3.0",
        subtitle: "Most people still think in Money 2.0 terms. You see the bigger picture.",
        primeText: "You're not just learning about Bitcoin—you're developing the mental models for the future of money.",
        keyInsights: [
          "Money evolution: Scarcity → Convenience → Energy-backed",
          "Growth patterns: Not exponential bubbles, but power law resilience", 
          "Trust models: Not borrowed from institutions, but earned through work",
          "Network effects: Each user makes the system stronger for everyone"
        ],
        nextLevel: {
          title: "Ready to Go Deeper?",
          modules: [
            "Proof of Work: See how energy becomes security",
            "Digital Signatures: Understand true ownership without custodians", 
            "Network Effects: Why Bitcoin gets stronger over time",
            "Economic Incentives: How the system stays honest"
          ]
        },
        practicalSteps: {
          title: "Start Your Bitcoin Journey",
          steps: [
            "Download a wallet and secure your first $10 in Bitcoin",
            "Send a small transaction to experience the difference",
            "Learn about cold storage for larger amounts",
            "Understand the difference between trading and hodling"
          ]
        },
        finalReflection: "The question isn't whether Bitcoin will succeed. The question is: will you understand it before everyone else does?"
      }
    }
  ];

  // Evolution Timeline Component
  const EvolutionTimeline = ({ content, onComplete }) => {
    const [selectedVersion, setSelectedVersion] = useState(null);
    const [showComparison, setShowComparison] = useState(false);

    const handleVersionClick = (version) => {
      setSelectedVersion(version);
    };

    const showFullComparison = () => {
      setShowComparison(true);
    };

        return (
      <div className="evolution-timeline">
        <div className="timeline-header">
          <h2>{content.title}</h2>
          <p className="subtitle">{content.subtitle}</p>
          <div className="prime-text">{content.primeText}</div>
              </div>

        <div className="money-versions">
          {content.versions.map((version, index) => (
            <div 
              key={index}
              className={`version-card ${selectedVersion?.version === version.version ? 'selected' : ''}`}
              onClick={() => handleVersionClick(version)}
            >
              <div className="version-header">
                <span className="version-icon">{version.icon}</span>
                <div className="version-info">
                  <h3>Money {version.version}</h3>
                  <h4>{version.name}</h4>
                  <span className="version-period">{version.period}</span>
              </div>
            </div>

              <div className="version-details">
                <div className="version-row">
                  <strong>Key Feature:</strong> {version.keyFeature}
                </div>
                <div className="version-row">
                  <strong>Weakness:</strong> {version.weakness}
                </div>
                <div className="version-row">
                  <strong>Energy Source:</strong> {version.energy}
                </div>
                <div className="version-row">
                  <strong>Trust Model:</strong> {version.trust}
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedVersion && (
          <div className="version-spotlight">
            <h3>Deep Dive: {selectedVersion.name}</h3>
            <p>{selectedVersion.keyFeature}</p>
            <p><strong>Challenge:</strong> {selectedVersion.weakness}</p>
          </div>
        )}

        <div className="reflection-section">
          <h3>🤔 {content.question}</h3>
          <div className="socratic-questions">
            {content.socratics.map((question, index) => (
              <div key={index} className="socratic-item">
                <span className="question-bullet">💭</span>
                <span>{question}</span>
                      </div>
                    ))}
                  </div>
                  </div>

        <button className="continue-button" onClick={onComplete}>
          Understanding Money Evolution ✓
        </button>
                </div>
    );
  };

  // Energy Transformation Component
  const EnergyTransformation = ({ content, onComplete }) => {
    const [currentDemo, setCurrentDemo] = useState('toaster');
    
    return (
      <div className="energy-transformation">
        <div className="transformation-header">
          <h2>{content.title}</h2>
          <p className="subtitle">{content.subtitle}</p>
          <div className="prime-text">{content.primeText}</div>
        </div>

        <div className="analogy-section">
          <h3>{content.analogy.title}</h3>
          <div className="comparison-flow">
            {content.analogy.comparison.map((item, index) => (
              <div key={index} className="flow-item">
                {item}
                      </div>
                    ))}
                  </div>
        </div>

        <div className="transformation-demo">
          <h3>⚡ Bitcoin's Energy Transformation</h3>
          <div className="transformation-steps">
            <div className="step">
              <div className="step-icon">🔌</div>
              <div className="step-content">
                <h4>Input</h4>
                <p>{content.transformation.input}</p>
              </div>
            </div>
            <div className="arrow">→</div>
            <div className="step">
              <div className="step-icon">🖥️</div>
              <div className="step-content">
                <h4>Process</h4>
                <p>{content.transformation.process}</p>
              </div>
            </div>
            <div className="arrow">→</div>
            <div className="step">
              <div className="step-icon">🔐</div>
              <div className="step-content">
                <h4>Output</h4>
                <p>{content.transformation.output}</p>
              </div>
            </div>
            <div className="arrow">→</div>
            <div className="step">
              <div className="step-icon">₿</div>
              <div className="step-content">
                <h4>Result</h4>
                <p>{content.transformation.result}</p>
              </div>
                  </div>
                </div>
              </div>

        <div className="cost-comparison">
          <h3>💰 What Does It Cost to Create?</h3>
          <div className="cost-grid">
            <div className="cost-item gold">
              <h4>🥇 Gold</h4>
              <p>{content.costComparison.gold}</p>
            </div>
            <div className="cost-item fiat">
              <h4>💵 Fiat</h4>
              <p>{content.costComparison.fiat}</p>
            </div>
            <div className="cost-item bitcoin">
              <h4>₿ Bitcoin</h4>
              <p>{content.costComparison.bitcoin}</p>
            </div>
          </div>
        </div>

        <div className="reflection-section">
          <h3>🤔 {content.question}</h3>
          <div className="insight-box">
            <div className="insight-icon">💡</div>
            <p>{content.insight}</p>
          </div>
        </div>

        <button className="continue-button" onClick={onComplete}>
          Energy → Money ✓
        </button>
      </div>
    );
  };

  // Power Law Discovery Component  
  const PowerLawDiscovery = ({ content, onComplete }) => {
    const [viewMode, setViewMode] = useState('linear');
    const [selectedSystemType, setSelectedSystemType] = useState('exponential');

    // Simulated Bitcoin price data for demonstration
    const generateBitcoinData = (isLogScale = false) => {
      const years = [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023];
      const prices = [0.01, 0.1, 1, 10, 100, 400, 400, 600, 10000, 4000, 7000, 20000, 50000, 20000, 30000];
      
      return years.map((year, index) => ({
        year,
        price: isLogScale ? Math.log10(prices[index]) : prices[index]
      }));
    };

    return (
      <div className="power-law-discovery">
        <div className="discovery-header">
          <h2>{content.title}</h2>
          <p className="subtitle">{content.subtitle}</p>
          <div className="prime-text">{content.primeText}</div>
        </div>

        <div className="chart-comparison">
          <div className="chart-controls">
                <button 
              className={`chart-btn ${viewMode === 'linear' ? 'active' : ''}`}
              onClick={() => setViewMode('linear')}
            >
              📊 Linear View
            </button>
            <button 
              className={`chart-btn ${viewMode === 'loglog' ? 'active' : ''}`}
              onClick={() => setViewMode('loglog')}
                >
              📈 Log-Log View
                </button>
              </div>

          <div className="chart-display">
            <div className={`chart ${viewMode}`}>
              <h4>{viewMode === 'linear' ? content.linearVsLog.linear.title : content.linearVsLog.logLog.title}</h4>
              <div className="chart-visual">
                {viewMode === 'linear' ? (
                  <div className="volatile-line">📈📉📈📉📈📉📈</div>
                ) : (
                  <div className="steady-line">📈📈📈📈📈📈📈</div>
                )}
            </div>
              <p>{viewMode === 'linear' ? content.linearVsLog.linear.description : content.linearVsLog.logLog.description}</p>
              <div className="perception">
                <strong>Perception:</strong> {viewMode === 'linear' ? content.linearVsLog.linear.perception : content.linearVsLog.logLog.perception}
              </div>
            </div>
          </div>
        </div>

        <div className="systems-comparison">
          <h3>📊 Two Types of Growth Systems</h3>
          <div className="system-toggles">
            <button 
              className={`system-btn ${selectedSystemType === 'exponential' ? 'active' : ''}`}
              onClick={() => setSelectedSystemType('exponential')}
            >
              Exponential Systems
            </button>
            <button 
              className={`system-btn ${selectedSystemType === 'powerLaw' ? 'active' : ''}`}
              onClick={() => setSelectedSystemType('powerLaw')}
            >
              Power Law Systems
            </button>
          </div>

          <div className="system-details">
            {selectedSystemType === 'exponential' ? (
              <div className="system-info exponential">
                <h4>{content.systems.exponential.title}</h4>
                <div className="examples">
                  <strong>Examples:</strong> {content.systems.exponential.examples.join(', ')}
                </div>
                <div className="characteristic">
                  <strong>Pattern:</strong> {content.systems.exponential.characteristic}
                </div>
                <div className="lifespan">
                  <strong>Lifespan:</strong> {content.systems.exponential.lifespan}
                </div>
              </div>
            ) : (
              <div className="system-info power-law">
                <h4>{content.systems.powerLaw.title}</h4>
                <div className="examples">
                  <strong>Examples:</strong> {content.systems.powerLaw.examples.join(', ')}
                </div>
                <div className="characteristic">
                  <strong>Pattern:</strong> {content.systems.powerLaw.characteristic}
                </div>
                <div className="lifespan">
                  <strong>Lifespan:</strong> {content.systems.powerLaw.lifespan}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="reflection-section">
          <h3>🤔 {content.question}</h3>
          <div className="insight-box">
            <div className="insight-icon">💡</div>
            <p>{content.insight}</p>
          </div>
        </div>

        <VisualCapitalistSection
          icon="��"
          title="Explore Further: Bitcoin's Price Volatility Over Time"
          description="See how Bitcoin's price volatility has actually decreased over time as it matures. This visualization shows the power law adoption curve in action."
          url="https://www.visualcapitalist.com/bitcoin-price-volatility-over-time/"
          buttonText="View Price Volatility Analysis"
        />

        <button className="continue-button" onClick={onComplete}>
          Not Exponential—Power Law ✓
        </button>
          </div>
        );
  };

  // Energy Double Spend Game Component
  const EnergyDoubleSpend = ({ content, onComplete }) => {
    const [gameState, setGameState] = useState('setup');
    const [energyUsed, setEnergyUsed] = useState(0);
    const [attempted, setAttempted] = useState(false);

    const attemptDoubleSpend = () => {
      setAttempted(true);
      setEnergyUsed(1000);
      setTimeout(() => setGameState('result'), 2000);
    };

    const trySecondSpend = () => {
      setGameState('blocked');
    };

        return (
      <div className="energy-double-spend">
        <div className="game-header">
          <h2>{content.title}</h2>
          <p className="subtitle">{content.subtitle}</p>
          <div className="prime-text">{content.primeText}</div>
            </div>
            
        {gameState === 'setup' && (
          <div className="game-setup">
            <div className="scenario">
              <h3>⚡ Your Mining Operation</h3>
              <div className="energy-display">
                <div className="energy-meter">
                  <span className="energy-amount">1000</span>
                  <span className="energy-unit">Energy Units Available</span>
                </div>
              </div>
              
              <p>{content.scenario.setup}</p>
              <p><strong>Challenge:</strong> {content.scenario.challenge}</p>
              <p><em>Real world analogy:</em> {content.scenario.realWorld}</p>
              </div>
              
            <div className="mining-blocks">
              <div className="block-option">
                <h4>🧱 Block A</h4>
                <p>Mine this block first</p>
                <button className="mine-button" onClick={attemptDoubleSpend}>
                  Spend 1000 Energy Units
                </button>
                  </div>
              
              <div className="block-option">
                <h4>🧱 Block B</h4>
                <p>Try to mine with same energy</p>
                <button 
                  className="mine-button disabled"
                  disabled={!attempted}
                  onClick={trySecondSpend}
                >
                  Spend Same 1000 Units Again?
                </button>
              </div>
            </div>
          </div>
        )}

        {gameState === 'result' && (
          <div className="game-result">
            <div className="energy-consumed">
              <h3>⚡ Energy Consumed</h3>
              <div className="consumption-display">
                <div className="consumed">1000 units → Block A ✅</div>
                <div className="remaining">0 units remaining</div>
              </div>
            </div>
            
            <div className="next-attempt">
              <p>Now try to mine Block B with the same energy...</p>
              <button className="mine-button" onClick={trySecondSpend}>
                Attempt Block B
              </button>
            </div>
                </div>
              )}
              
        {gameState === 'blocked' && (
          <div className="game-blocked">
            <div className="error-message">
              <h3>🚫 ERROR: Energy Already Consumed</h3>
              <p>The same energy cannot be spent twice!</p>
            </div>

            <div className="physics-lesson">
              <h4>⚖️ Physical Laws Apply</h4>
              <div className="law-explanation">
                <p>Just like in the physical world:</p>
                <ul>
                  <li>You can't burn the same gallon of gas twice</li>
                  <li>You can't spend the same dollar bill twice</li>
                  <li>You can't use the same energy to mine two blocks</li>
                </ul>
              </div>
            </div>

            <div className="contrast-section">
              <h4>🔄 Traditional vs Bitcoin</h4>
              <div className="contrast-grid">
                <div className="traditional">
                  <h5>💾 Traditional Digital Money</h5>
                  <p>{content.contrast.traditional}</p>
                </div>
                <div className="bitcoin">
                  <h5>⚡ Bitcoin</h5>
                  <p>{content.contrast.bitcoin}</p>
                </div>
              </div>
            </div>

            <div className="final-question">
              <h3>🤔 {content.question}</h3>
              <div className="answer-box">
                <p><strong>Answer:</strong> {content.answer}</p>
              </div>
            </div>

            <button className="continue-button" onClick={onComplete}>
              Energy Physics ✓
              </button>
            </div>
        )}
          </div>
        );
  };

  // Space Time Conquest Component
  const SpaceTimeConquest = ({ content, onComplete }) => {
    const [selectedProperty, setSelectedProperty] = useState(null);
    const [showAlienTest, setShowAlienTest] = useState(false);

    const PropertyMatrix = () => (
      <div className="property-matrix">
        <div className="matrix-header">
          <div className="property-cell header">Property</div>
          <div className="property-cell header gold">🥇 Gold</div>
          <div className="property-cell header fiat">💵 Fiat</div>
          <div className="property-cell header bitcoin">₿ Bitcoin</div>
        </div>
        
        {content.propertyMatrix.properties.map((property, index) => (
          <div key={index} className="matrix-row">
            <div className="property-cell property-name">{property}</div>
            <div className={`property-cell ${content.propertyMatrix.gold[index] ? 'yes' : 'no'}`}>
              {content.propertyMatrix.gold[index] ? '✅' : '❌'}
            </div>
            <div className={`property-cell ${content.propertyMatrix.fiat[index] ? 'yes' : 'no'}`}>
              {content.propertyMatrix.fiat[index] ? '✅' : '❌'}
            </div>
            <div className={`property-cell ${content.propertyMatrix.bitcoin[index] ? 'yes' : 'no'}`}>
              {content.propertyMatrix.bitcoin[index] ? '✅' : '❌'}
            </div>
          </div>
        ))}
      </div>
    );

        return (
      <div className="space-time-conquest">
        <div className="conquest-header">
          <h2>{content.title}</h2>
          <p className="subtitle">{content.subtitle}</p>
          <div className="prime-text">{content.primeText}</div>
            </div>

        <PropertyMatrix />

        <div className="conquest-dimensions">
          <div className="dimension-card space">
            <h3>{content.spaceConquest.title}</h3>
            <div className="conquest-comparison">
              <div className="conquest-item gold">
                <strong>🥇 Gold:</strong> {content.spaceConquest.gold}
            </div>
              <div className="conquest-item fiat">
                <strong>💵 Fiat:</strong> {content.spaceConquest.fiat}
              </div>
              <div className="conquest-item bitcoin">
                <strong>₿ Bitcoin:</strong> {content.spaceConquest.bitcoin}
              </div>
            </div>
          </div>

          <div className="dimension-card time">
            <h3>{content.timeConquest.title}</h3>
            <div className="conquest-comparison">
              <div className="conquest-item gold">
                <strong>🥇 Gold:</strong> {content.timeConquest.gold}
              </div>
              <div className="conquest-item fiat">
                <strong>💵 Fiat:</strong> {content.timeConquest.fiat}
              </div>
              <div className="conquest-item bitcoin">
                <strong>₿ Bitcoin:</strong> {content.timeConquest.bitcoin}
              </div>
            </div>
          </div>
        </div>

        <div className="alien-test">
          <h3>👽 {content.alienTest.question}</h3>
          <div className="alien-analysis">
            <p>{content.alienTest.analysis}</p>
          </div>
          
          <div className="alien-choice">
            <div className="alien-thinking">
              <div className="alien-emoji">👽</div>
              <div className="thought-bubble">
                "We need money that works across galaxies, is mathematically verifiable, 
                and isn't controlled by any planetary government..."
              </div>
            </div>
            <div className="alien-conclusion">
              <strong>Alien Choice:</strong> Bitcoin ₿
            </div>
          </div>
        </div>

        <button className="continue-button" onClick={onComplete}>
          Space & Time Mastery ✓
        </button>
          </div>
        );
  };
      
  // Energy Flow Component
  const EnergyFlow = ({ content, onComplete }) => {
    const [selectedRiver, setSelectedRiver] = useState('bitcoin');

        return (
      <div className="energy-flow">
        <div className="flow-header">
          <h2>{content.title}</h2>
          <p className="subtitle">{content.subtitle}</p>
          <div className="prime-text">{content.primeText}</div>
              </div>

        <div className="river-comparison">
          <h3>🌊 Three Money Rivers</h3>
          <div className="river-selector">
            {Object.entries(content.riverAnalogy).map(([key, river]) => (
              <button
                key={key}
                className={`river-btn ${selectedRiver === key ? 'active' : ''}`}
                onClick={() => setSelectedRiver(key)}
              >
                {river.title}
              </button>
            ))}
            </div>

          <div className="river-details">
            {Object.entries(content.riverAnalogy).map(([key, river]) => (
              <div
                key={key}
                className={`river-card ${selectedRiver === key ? 'active' : ''}`}
              >
                <h4>{river.title}</h4>
                <div className="river-property">
                  <strong>Flow:</strong> {river.flow}
                </div>
                <div className="river-property">
                  <strong>Infrastructure:</strong> {river.pipes}
                </div>
                <div className="river-property">
                  <strong>Speed:</strong> {river.speed}
                </div>
              </div>
            ))}
              </div>
        </div>

        <div className="energy-transformation-flow">
          <h3>⚡ Bitcoin's Energy Flow Process</h3>
          <div className="flow-concept">
            <p>{content.energyFlow.concept}</p>
          </div>
          <div className="flow-process">
            <div className="process-steps">
              {content.energyFlow.process.split(' → ').map((step, index) => (
                <div key={index} className="process-step">
                  <span className="step-number">{index + 1}</span>
                  <span className="step-text">{step}</span>
                  {index < content.energyFlow.process.split(' → ').length - 1 && (
                    <div className="step-arrow">→</div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="flow-advantage">
            <div className="advantage-icon">💡</div>
            <p><strong>Key Advantage:</strong> {content.energyFlow.advantage}</p>
          </div>
        </div>

        <div className="reflection-section">
          <h3>🤔 {content.question}</h3>
          <div className="insight-box">
            <div className="insight-icon">🔄</div>
            <p>{content.insight}</p>
          </div>
        </div>

        <button className="continue-button" onClick={onComplete}>
          Energy Flow Mastery ✓
        </button>
      </div>
    );
  };

  // Growth Pattern Component
  const GrowthPattern = ({ content, onComplete }) => {
    const [selectedPhase, setSelectedPhase] = useState(0);
    const [showResilience, setShowResilience] = useState(false);

    return (
      <div className="growth-pattern">
        <div className="pattern-header">
          <h2>{content.title}</h2>
          <p className="subtitle">{content.subtitle}</p>
          <div className="prime-text">{content.primeText}</div>
        </div>

        <div className="staircase-visual">
          <h3>📊 The Bitcoin Staircase Pattern</h3>
          <div className="pattern-description">
            <p><strong>Pattern:</strong> {content.staircase.pattern}</p>
          </div>
          
          <div className="phases-timeline">
            {content.staircase.phases.map((phase, index) => (
              <div
                key={index}
                className={`phase-card ${selectedPhase === index ? 'active' : ''}`}
                onClick={() => setSelectedPhase(index)}
              >
                <div className="phase-number">{index + 1}</div>
                <div className="phase-content">
                  <h4>{phase.phase}</h4>
                  <p>{phase.description}</p>
                  <div className="phase-example">
                    <em>{phase.example}</em>
                  </div>
                </div>
                    </div>
                  ))}
                </div>

          {selectedPhase !== null && (
            <div className="phase-spotlight">
              <h4>Phase Deep Dive: {content.staircase.phases[selectedPhase].phase}</h4>
              <p>{content.staircase.phases[selectedPhase].description}</p>
              <p><strong>Historical Example:</strong> {content.staircase.phases[selectedPhase].example}</p>
              </div>
            )}
        </div>

        <div className="resilience-section">
          <h3>{content.resilience.title}</h3>
                      <button
            className="show-resilience-btn"
            onClick={() => setShowResilience(!showResilience)}
                      >
            {showResilience ? 'Hide Details' : 'Show How Each Cycle Builds Strength'}
                      </button>
          
          {showResilience && (
            <div className="resilience-points">
              {content.resilience.points.map((point, index) => (
                <div key={index} className="resilience-point">
                  <div className="point-icon">🏗️</div>
                  <span>{point}</span>
                </div>
                    ))}
                  </div>
                )}
                  </div>

        <div className="reflection-section">
          <h3>🤔 {content.question}</h3>
          <div className="insight-box">
            <div className="insight-icon">🪜</div>
            <p>{content.insight}</p>
              </div>
        </div>

        <button className="continue-button" onClick={onComplete}>
          Growth Pattern Understanding ✓
        </button>
              </div>
    );
  };

  // Uniqueness Component
  const Uniqueness = ({ content, onComplete }) => {
    const [selectedSolution, setSelectedSolution] = useState(0);
    const [showPossibilities, setShowPossibilities] = useState(false);

    return (
      <div className="uniqueness">
        <div className="uniqueness-header">
          <h2>{content.title}</h2>
          <p className="subtitle">{content.subtitle}</p>
          <div className="prime-text">{content.primeText}</div>
        </div>

        <div className="before-bitcoin">
          <h3>{content.beforeBitcoin.title}</h3>
          <div className="examples-grid">
            {content.beforeBitcoin.examples.map((example, index) => (
              <div key={index} className="example-item">
                <span className="copy-icon">📋</span>
                <span>{example}</span>
              </div>
            ))}
          </div>
          <div className="problem-statement">
            <div className="problem-icon">⚠️</div>
            <p><strong>The Problem:</strong> {content.beforeBitcoin.problem}</p>
          </div>
        </div>

        <div className="bitcoin-solution">
          <h3>{content.bitcoinSolution.title}</h3>
          <div className="solution-parts">
            {content.bitcoinSolution.parts.map((part, index) => (
              <div
                key={index}
                className={`solution-part ${selectedSolution === index ? 'active' : ''}`}
                onClick={() => setSelectedSolution(index)}
              >
                <div className="part-number">{index + 1}</div>
                <div className="part-content">
                  <h4>{part.component}</h4>
                  <p><strong>Function:</strong> {part.function}</p>
                  <p><em>Analogy:</em> {part.analogy}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="impossible-to-copy">
          <h3>{content.impossibleToCopy.title}</h3>
          <div className="copy-reasons">
            <div className="reason-item">
              <div className="reason-icon">🌐</div>
              <div className="reason-content">
                <strong>Network Effect:</strong> {content.impossibleToCopy.network}
              </div>
            </div>
            <div className="reason-item">
              <div className="reason-icon">🔒</div>
              <div className="reason-content">
                <strong>Security Model:</strong> {content.impossibleToCopy.security}
              </div>
            </div>
            <div className="reason-item">
              <div className="reason-icon">🤝</div>
              <div className="reason-content">
                <strong>Trust Foundation:</strong> {content.impossibleToCopy.trust}
              </div>
            </div>
          </div>
        </div>

        <div className="future-possibilities">
          <h3>🔮 {content.finalQuestion}</h3>
              <button 
            className="show-possibilities-btn"
            onClick={() => setShowPossibilities(!showPossibilities)}
              >
            {showPossibilities ? 'Hide Possibilities' : 'Explore What Bitcoin Enables'}
              </button>
          
          {showPossibilities && (
            <div className="possibilities-grid">
              {content.possibilities.map((possibility, index) => (
                <div key={index} className="possibility-item">
                  <div className="possibility-icon">🚀</div>
                  <span>{possibility}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <button className="continue-button" onClick={onComplete}>
          Uniqueness Understanding ✓
        </button>
          </div>
        );
  };

  // Actionable Conclusion Component
  const ActionableConclusion = ({ content, onComplete }) => {
    const [selectedTab, setSelectedTab] = useState('insights');

        return (
      <div className="actionable-conclusion">
        <div className="conclusion-header">
          <h2>{content.title}</h2>
          <p className="subtitle">{content.subtitle}</p>
          <div className="prime-text">{content.primeText}</div>
            </div>

        <div className="conclusion-tabs">
          <button
            className={`tab-btn ${selectedTab === 'insights' ? 'active' : ''}`}
            onClick={() => setSelectedTab('insights')}
          >
            🧠 Key Insights
          </button>
          <button
            className={`tab-btn ${selectedTab === 'modules' ? 'active' : ''}`}
            onClick={() => setSelectedTab('modules')}
          >
            📚 Next Level
          </button>
          <button
            className={`tab-btn ${selectedTab === 'practical' ? 'active' : ''}`}
            onClick={() => setSelectedTab('practical')}
          >
            🚀 Take Action
          </button>
              </div>

        <div className="tab-content">
          {selectedTab === 'insights' && (
            <div className="insights-section">
              <h3>🎯 What You've Mastered</h3>
              <div className="insights-grid">
                {content.keyInsights.map((insight, index) => (
                  <div key={index} className="insight-item">
                    <div className="insight-icon">💡</div>
                    <span>{insight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

          {selectedTab === 'modules' && (
            <div className="modules-section">
              <h3>{content.nextLevel.title}</h3>
              <div className="modules-grid">
                {content.nextLevel.modules.map((module, index) => (
                  <div key={index} className="module-preview">
                    <div className="module-icon">🔥</div>
                    <span>{module}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

          {selectedTab === 'practical' && (
            <div className="practical-section">
              <h3>{content.practicalSteps.title}</h3>
              <div className="steps-list">
                {content.practicalSteps.steps.map((step, index) => (
                  <div key={index} className="practical-step">
                    <div className="step-number">{index + 1}</div>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
                </div>
              )}
        </div>

        <div className="final-reflection">
          <div className="reflection-box">
            <div className="reflection-icon">🎯</div>
            <p><strong>Final Thought:</strong> {content.finalReflection}</p>
            </div>
        </div>

        <button className="continue-button" onClick={onComplete}>
          Ready for the Future ✓
        </button>
          </div>
        );
  };

  const renderStep = (step, index) => {
    switch (step.type) {
      case 'evolution-timeline':
        return <EvolutionTimeline content={step.content} onComplete={() => handleStepComplete(index)} />;
      
      case 'energy-transformation':
        return <EnergyTransformation content={step.content} onComplete={() => handleStepComplete(index)} />;
      
      case 'power-law-discovery':
        return <PowerLawDiscovery content={step.content} onComplete={() => handleStepComplete(index)} />;
      
      case 'energy-double-spend':
        return <EnergyDoubleSpend content={step.content} onComplete={() => handleStepComplete(index)} />;
      
      case 'space-time-conquest':
        return <SpaceTimeConquest content={step.content} onComplete={() => handleStepComplete(index)} />;
      
      case 'energy-flow':
        return <EnergyFlow content={step.content} onComplete={() => handleStepComplete(index)} />;
      
      case 'growth-pattern':
        return <GrowthPattern content={step.content} onComplete={() => handleStepComplete(index)} />;
      
      case 'uniqueness':
        return <Uniqueness content={step.content} onComplete={() => handleStepComplete(index)} />;
      
      case 'actionable-conclusion':
        return <ActionableConclusion content={step.content} onComplete={() => handleStepComplete(index)} />;

      default:
        return (
          <div className="step-content">
            <h2>{step.title}</h2>
            <p>Step type "{step.type}" not implemented yet.</p>
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
          <h1>🎉 Bitcoin 3.0 Mastery Complete!</h1>
          <p>You now understand why Bitcoin represents the next evolution of money—from energy to digital truth.</p>
          <div className="completion-stats">
            <div className="stat">
              <span className="stat-number">{steps.length}</span>
              <span className="stat-label">Concepts Mastered</span>
      </div>
            <div className="stat">
              <span className="stat-number">3.0</span>
              <span className="stat-label">Money Version</span>
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
          Bitcoin 3.0: Energy as Money
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

export default BitcoinBasicsModule; 