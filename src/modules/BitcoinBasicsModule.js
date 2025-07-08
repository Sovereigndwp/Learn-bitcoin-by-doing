import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '../contexts/ProgressContext';
import { Zap, Bitcoin, CheckCircle, Trophy, Clock, Target, BarChart, Globe, Shield, Coins, TrendingUp, Activity, Power } from 'lucide-react';
import AnimatedIcon from '../components/AnimatedIcon';
import { ContinueButton, ButtonGroup, ButtonFlow, ActionButton } from '../components/EnhancedButtons';
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
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(new Set());
  
  const handleStepComplete = (index) => {
    setCompletedSteps(prev => new Set(prev).add(index));
    if (index === steps.length - 1) {
      completeModule('bitcoin-basics');
      setTimeout(() => {
        navigate('/');
      }, 2000);
    }
    
    // Show achievement for key milestones
    if (index === 0) {
      showAchievement("Money Evolutionist", "You understand the progression from Gold to Bitcoin!");
    } else if (index === 2) {
      showAchievement("Energy Pioneer", "You grasp how energy becomes digital truth!");
    } else if (index === 3) {
      showAchievement("Work Explorer", "You experienced how energy turns into work!");
    } else if (index === 4) {
      showAchievement("Double-Spend Defender", "You understand why Bitcoin can't be counterfeited!");
    } else if (index === 5) {
      showAchievement("Blockchain Explorer", "You see how the digital ledger works!");
    } else if (index === 7) {
      showAchievement("Power Law Thinker", "You see beyond exponential to true power law growth!");
    } else if (index === 9) {
      showAchievement("Bitcoin Scholar", "You understand the complete Bitcoin ecosystem!");
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

  const handleBackButton = () => {
    if (currentStep === 0) {
      navigate('/');
    } else {
      setCurrentStep(currentStep - 1);
    }
  };

  // Reset progress handler
  const handleResetProgress = () => {
    setCompletedSteps(new Set());
    setCurrentStep(0);
  };

  const steps = [
    {
      title: "The Great Money Evolution",
      type: "evolution-timeline",
      content: {
        title: "🌀 The Money Timeline: 1.0 → 2.0 → 3.0",
        subtitle: "Every few centuries, money evolves. We're living through the biggest change yet.",
        primeText: "If Gold was Money 1.0 and Fiat was 2.0, Bitcoin is 3.0. Now, money runs on energy.",
        simpleComparison: {
          title: "🔄 The Three Ages of Money",
          gold: "1.0: Gold - Hard to make, heavy to move",
          fiat: "2.0: Fiat - Easy to print, controlled by governments", 
          bitcoin: "3.0: Bitcoin - Hard to make, easy to move, no controllers"
        },
        question: "Why do we trust things more when they cost real effort?",
        socratics: [
          "What happens when money has no cost to produce?",
          "Why did gold work for thousands of years?", 
          "What if we could combine gold's hardness with the internet's speed?"
        ]
      }
    },

    {
      title: "What Is Fiat Money?",
      type: "fiat-definition",
      content: {
        title: "💵 The Government Takeover of Money",
        subtitle: "How we went from Money 1.0 (Gold) to Money 2.0 (Fiat)",
        primeText: "In 1971, governments broke the promise that backed their money with gold. Now it's just trust.",
        timeline: {
          before1971: {
            title: "Before 1971: Money Backed by Gold",
            description: "Your dollar was a promise: 'We'll give you gold for this paper'",
            backing: "Gold reserves",
            trust: "Physical commodity"
          },
          august1971: {
            title: "August 15, 1971: The Nixon Shock",
            description: "President Nixon: 'We're not giving you gold anymore'",
            backing: "Government promise",
            trust: "Faith in authority"
          },
          after1971: {
            title: "After 1971: Pure Fiat",
            description: "Your dollar is now just a piece of paper with government backing",
            backing: "Nothing physical",
            trust: "Government credibility"
          }
        },
        consequences: {
          title: "Remember Carlos, Our Flower Exporter? What Did It Mean for Him?",
          points: [
            {
              problem: "Inflation Explosion",
              description: "Without gold limits, governments could print unlimited money",
              impact: "Carlos's savings lose value every year"
            },
            {
              problem: "Permission Required", 
              description: "Banks became gatekeepers - they decide who can transact",
              impact: "Carlos needs approval to send money internationally"
            },
            {
              problem: "Trust Dependency",
              description: "Money's value depends entirely on trusting institutions",
              impact: "If Carlos loses faith in his government, his money becomes worthless"
            }
                      ]
          },
        moneyCreation: {
          title: "How Fiat Money Gets Created",
          subtitle: "Watch what happens when someone takes out a loan",
          scenarios: [
            {
              title: "Sarah Wants to Buy a House",
              description: "She needs $300,000 but only has $30,000 saved",
              action: "Goes to the bank for a mortgage"
            }
          ]
        }
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
          gold: "Human miners use fuel and heavy machinery to dig holes, move and crush rocks, and refine metal",
          fiat: "Central banks and data operators use ink, paper, electricity and servers to print paper and update centralized databases",
          bitcoin: "People use powerful computers to help update a public record of transactions that everyone can see but no one can change. In return, they earn new bitcoins as a reward"
        },
        question: "If something takes zero effort to create, should it have value?",
        insight: "Just like gold had to be mined, Bitcoin must be mined, only now, it's with computational power, not shovels."
      }
    },

    // Interactive Energy Work Lab now follows Energy Becomes Money
    {
      title: "Interactive: Energy Work Lab",
      type: "energy-work-lab",
      content: {
        title: "🏋️‍♂️ Moving the Box: Understanding Work",
        subtitle: "Use energy to make something happen. This is work.",
        primeText: "Drag the slider to apply energy (work) and see the box move.",
        instructions: "The more energy you apply, the farther the box moves.",
        question: "In traditional finance, you trust people, buildings and back-office computers to keep your money safe. Bitcoin replaces all of that with one open protocol: miners burn real electricity to secure every transaction and mint new coins."
      }
    },

    {
      title: "Interactive: Try to Double-Spend Energy",
      type: "energy-double-spend",
      content: {
        title: "⚡ Can You Spend the Same Energy Twice?",
        subtitle: "Let's see what happens when you try to cheat an energy-based system",
        primeText: "In the current financial system, digital money is just numbers in a database. But Bitcoin is different. It's backed by actual energy work.",
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
      title: "How Bitcoin Actually Works",
      type: "blockchain-discovery",
      content: {
        title: "🔗 The Digital Ledger That Never Lies",
        subtitle: "Think of it like a shared Google Doc that everyone can see but no one can edit alone",
        primeText: "Bitcoin is just a list of transactions. But it's the most secure list ever created.",
        ledgerAnalogy: {
          title: "Like a Bank Ledger, But Better",
          traditional: "One bank controls the ledger, you trust them",
          bitcoin: "Everyone has a copy, math keeps it honest",
          comparison: "It's like having 10,000 bank branches, all with the same records"
        },
        consensus: {
          title: "How Everyone Agrees",
          problem: "What if someone tries to cheat?",
          solution: "Majority rules - if 51% say it's valid, it's valid",
          analogy: "Like a family vote on where to eat - majority wins"
        },
        blocks: {
          title: "Transactions Come in Blocks",
          description: "Every 10 minutes, new transactions are grouped together",
          analogy: "Like pages in a book - each page (block) contains many transactions",
          timing: "Why 10 minutes? Gives everyone time to agree"
        },
        question: "What happens if someone tries to change an old transaction?",
        insight: "They'd need to change every block after it too - like rewriting an entire book from page 5 onwards."
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
      title: "The Staircase, Not the Elevator",
      type: "growth-pattern",
      content: {
        title: "📊 Bitcoin's Logarithmic Staircase",
        subtitle: "It's not a straight line up. It's a series of step-functions.",
        primeText: "Bitcoin grows through fire and failure. Every crash clears out flaws and leaves the network stronger.",
        staircase: {
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
            },
            {
              phase: "Legal Tender",
              description: "Nations adopt Bitcoin as official currency",
              example: "2021: El Salvador makes Bitcoin legal tender"
            },
            {
              phase: "Institutional",
              description: "Traditional finance embraces Bitcoin",
              example: "2024: Spot ETFs approved, BlackRock enters"
            },
            {
              phase: "Financial Infrastructure",
              description: "Bitcoin becomes accepted collateral and insurance",
              example: "2025: Bitcoin accepted in loans, retirement accounts, life insurance"
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

        <div className="simple-money-comparison">
          <h3>{content.simpleComparison.title}</h3>
          <div className="simple-comparison-grid">
            <div className="simple-money-version gold">
              <div className="version-icon">🥇</div>
              <p>{content.simpleComparison.gold}</p>
            </div>
            <div className="simple-money-version fiat">
              <div className="version-icon">💵</div>
              <p>{content.simpleComparison.fiat}</p>
            </div>
            <div className="simple-money-version bitcoin">
              <div className="version-icon">₿</div>
              <p>{content.simpleComparison.bitcoin}</p>
            </div>
          </div>
        </div>

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



        <ContinueButton 
          onClick={onComplete}
          completed={true}
          nextStep="Energy Transformation"
        >
          Understanding Money Evolution ✓
        </ContinueButton>
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

        <ContinueButton 
          onClick={onComplete}
          completed={true}
          nextStep="Double-Spend Prevention"
        >
          Energy → Money ✓
        </ContinueButton>
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
          icon="📈"
          title="Explore Further: Bitcoin's Price Volatility Over Time"
          description="See how Bitcoin's price volatility has actually decreased over time as it matures. This visualization shows the power law adoption curve in action."
          url="https://bitbo.io/volatility/"
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

  // Energy Work Lab Component
  const EnergyWorkLab = ({ content, onComplete }) => {
    const [energy, setEnergy] = useState(10);
    const maxEnergy = 100;
    const distance = (energy / maxEnergy) * 300; // pixels to move box

    return (
      <div className="energy-work-lab">
        <div className="lab-header">
          <h2>{content.title}</h2>
          <p className="subtitle">{content.subtitle}</p>
          <div className="prime-text">{content.primeText}</div>
        </div>

        <div className="lab-interactive">
          <input
            type="range"
            min="0"
            max={maxEnergy}
            value={energy}
            onChange={(e) => setEnergy(parseInt(e.target.value, 10))}
          />
          <div className="energy-display">{energy} energy units</div>
          <div className="lab-floor">
            <div
              className="lab-box"
              style={{ transform: `translateX(${distance}px)` }}
            >
              📦
            </div>
          </div>
          <p className="instructions">{content.instructions}</p>
        </div>

        <div className="reflection-section">
          <h3>🤔 {content.question}</h3>
        </div>

        <button className="continue-button" onClick={onComplete}>
          Energy Work ✓
        </button>
      </div>
    );
  };

  // Money Creation Interactive Component
  const MoneyCreationDemo = ({ moneyCreation }) => {
    const [step, setStep] = useState(0);
    const [bankBalance, setBankBalance] = useState(1000000);
    const [sarahSavings, setSarahSavings] = useState(30000);
    const [newMoneyCreated, setNewMoneyCreated] = useState(0);
    const [loanAmount, setLoanAmount] = useState(0);

    const steps = [
      {
        title: "🏠 Sarah Needs a House",
        description: "Sarah has $30,000 saved but needs $300,000 for a house",
        action: "Let's see what happens when she goes to the bank..."
      },
      {
        title: "🏦 Bank's Magic Trick",
        description: "Bank doesn't lend existing money - they CREATE new money by issuing a debt certificate",
        action: "Watch the money supply increase..."
      },
      {
        title: "💰 Money Created From Nothing",
        description: "Bank types $270,000 into Sarah's account. This money didn't exist before!",
        action: "New money = New debt certificate"
      },
      {
        title: "🔄 The Multiplier Effect",
        description: "Sarah spends this newly created money, it gets deposited elsewhere, and the cycle repeats",
        action: "This is how most money in circulation gets created"
      }
    ];

    const handleNextStep = () => {
      if (step === 1) {
        setLoanAmount(270000);
        setNewMoneyCreated(270000);
      }
      if (step < steps.length - 1) {
        setStep(step + 1);
      }
    };

    const resetDemo = () => {
      setStep(0);
      setLoanAmount(0);
      setNewMoneyCreated(0);
    };

    return (
      <div className="money-creation-demo">
        <h3>{moneyCreation.title}</h3>
        <p className="demo-subtitle">{moneyCreation.subtitle}</p>
        
        <div className="demo-stage">
          <div className="demo-header">
            <h4>{steps[step].title}</h4>
            <p>{steps[step].description}</p>
          </div>

          <div className="demo-visual">
            <div className="demo-actors">
              <div className="actor sarah">
                <div className="actor-icon">👩‍💼</div>
                <div className="actor-name">Sarah</div>
                <div className="actor-balance">
                  Savings: ${sarahSavings.toLocaleString()}
                  {step >= 2 && (
                    <div className="new-loan">
                      + Loan: ${loanAmount.toLocaleString()}
                      <span className="magic-sparkle">✨</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="transfer-arrow">
                {step >= 1 && <span className="arrow-text">Creates Debt Certificate</span>}
                →
              </div>

              <div className="actor bank">
                <div className="actor-icon">🏦</div>
                <div className="actor-name">Bank</div>
                <div className="actor-balance">
                  Deposits: ${bankBalance.toLocaleString()}
                  {step >= 2 && (
                    <div className="debt-certificate">
                      Debt Certificate: ${loanAmount.toLocaleString()}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {step >= 2 && (
              <div className="money-creation-visualization">
                <div className="creation-box">
                  <h4>💫 Money Created Out of Thin Air</h4>
                  <div className="created-amount">
                    ${newMoneyCreated.toLocaleString()}
                  </div>
                  <div className="creation-explanation">
                    This money didn't exist before the loan was signed!
                  </div>
                </div>
              </div>
            )}

            {step >= 3 && (
              <div className="multiplier-effect">
                <h4>🔄 The Debt-Money System</h4>
                <div className="effect-chain">
                  <div className="effect-step">Sarah spends → Money circulates</div>
                  <div className="effect-step">Recipients deposit → Banks can lend more</div>
                  <div className="effect-step">More loans = More new money created</div>
                  <div className="effect-step">Most money in circulation = Debt</div>
                </div>
              </div>
            )}
          </div>

          <div className="demo-controls">
            {step < steps.length - 1 ? (
              <button className="demo-btn next" onClick={handleNextStep}>
                {steps[step].action}
              </button>
            ) : (
              <button className="demo-btn reset" onClick={resetDemo}>
                Try Again
              </button>
            )}
          </div>
        </div>

        <div className="key-insight">
          <div className="insight-icon">💡</div>
          <div className="insight-text">
            <strong>Key Point:</strong> Banks don't lend existing money - they create new money by issuing debt certificates. 
            This is why most money in circulation is actually debt, not savings.
          </div>
        </div>
      </div>
    );
  };

  // Fiat Definition Component
  const FiatDefinition = ({ content, onComplete }) => {
    const [selectedTimelineStep, setSelectedTimelineStep] = useState('before1971');
    const [showConsequences, setShowConsequences] = useState(false);

    return (
      <div className="fiat-definition">
        <div className="definition-header">
          <h2>{content.title}</h2>
          <p className="subtitle">{content.subtitle}</p>
          <div className="prime-text">{content.primeText}</div>
        </div>

        <div className="timeline-visualization">
          <h3>📅 The Great Monetary Shift</h3>
          <div className="timeline-controls">
            {Object.entries(content.timeline).map(([key, period]) => (
              <button
                key={key}
                className={`timeline-btn ${selectedTimelineStep === key ? 'active' : ''}`}
                onClick={() => setSelectedTimelineStep(key)}
              >
                {period.title}
              </button>
            ))}
          </div>
          
          <div className="timeline-content">
            {selectedTimelineStep && (
              <div className="timeline-period">
                <h4>{content.timeline[selectedTimelineStep].title}</h4>
                <p className="period-description">
                  {content.timeline[selectedTimelineStep].description}
                </p>
                
                <div className="visual-story">
                  {selectedTimelineStep === 'before1971' && (
                    <div className="gold-paper-story before">
                      <div className="story-row">
                        <div className="gold-bar">🟨</div>
                        <span className="equals">=</span>
                        <div className="paper-bill">💵</div>
                      </div>
                      <div className="story-explanation">1 gold bar = 1 piece of paper</div>
                      <div className="story-row">
                        <div className="gold-bars">🟨🟨🟨🟨🟨</div>
                        <span className="equals">=</span>
                        <div className="paper-bills">💵💵💵💵💵</div>
                      </div>
                      <div className="story-explanation">5 gold bars = 5 pieces of paper</div>
                    </div>
                  )}
                  
                  {selectedTimelineStep === 'august1971' && (
                    <div className="gold-paper-story transition">
                      <div className="breaking-point">
                        <div className="before-break">
                          <div className="gold-bar">🟨</div>
                          <span className="equals">=</span>
                          <div className="paper-bill">💵</div>
                        </div>
                        <div className="break-symbol">⚡💥⚡</div>
                        <div className="after-break">
                          <div className="gold-bar">🟨</div>
                          <span className="not-equals">≠</span>
                          <div className="paper-bills">💵💵💵</div>
                        </div>
                      </div>
                      <div className="story-explanation">The promise is broken!</div>
                    </div>
                  )}
                  
                  {selectedTimelineStep === 'after1971' && (
                    <div className="gold-paper-story after">
                      <div className="story-row">
                        <div className="gold-bar">🟨</div>
                        <span className="equals">=</span>
                        <div className="paper-bills many">💵💵💵💵💵💵💵💵💵</div>
                      </div>
                      <div className="story-explanation">1 gold bar = Many pieces of paper</div>
                      <div className="story-row">
                        <div className="gold-bars">🟨🟨🟨🟨🟨</div>
                        <span className="equals">=</span>
                        <div className="paper-bills infinite">💵💵💵💵💵💵💵💵💵💵💵💵💵💵💵</div>
                      </div>
                      <div className="story-explanation sarcastic">5 gold bars = As many as the government says 🤷‍♂️</div>
                    </div>
                  )}
                </div>

                <div className="money-properties">
                  <div className="property">
                    <strong>Backing:</strong> {content.timeline[selectedTimelineStep].backing}
                  </div>
                  <div className="property">
                    <strong>Trust:</strong> {content.timeline[selectedTimelineStep].trust}
                  </div>
                </div>
                {selectedTimelineStep === 'august1971' && (
                  <div className="nixon-shock">
                    <div className="shock-icon">⚡</div>
                    <p><em>This moment changed money forever...</em></p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {selectedTimelineStep === 'august1971' && (
          <div className="consequences-section">
            <button 
              className="show-consequences-btn"
              onClick={() => setShowConsequences(!showConsequences)}
            >
              {showConsequences ? 'Hide Impact' : 'Show What This Meant for People'}
            </button>
            
            {showConsequences && (
              <div className="consequences-content">
                <h3>👤 {content.consequences.title}</h3>
                <div className="consequences-grid">
                  {content.consequences.points.map((consequence, index) => (
                    <div key={index} className="consequence-card">
                      <h4>⚠️ {consequence.problem}</h4>
                      <p className="consequence-description">{consequence.description}</p>
                      <div className="consequence-impact">
                        <strong>Impact:</strong> {consequence.impact}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {selectedTimelineStep === 'after1971' && (
          <MoneyCreationDemo moneyCreation={content.moneyCreation} />
        )}

        {selectedTimelineStep === 'after1971' && (
          <button className="continue-button" onClick={onComplete}>
            Understanding Fiat ✓
          </button>
        )}
      </div>
    );
  };

  // Blockchain Discovery Component
  const BlockchainDiscovery = ({ content, onComplete }) => {
    const [currentSection, setCurrentSection] = useState('ledger');
    const [showConsensus, setShowConsensus] = useState(false);
    const [showBlocks, setShowBlocks] = useState(false);

    return (
      <div className="blockchain-discovery">
        <div className="discovery-header">
          <h2>{content.title}</h2>
          <p className="subtitle">{content.subtitle}</p>
          <div className="prime-text">{content.primeText}</div>
        </div>

        <div className="ledger-comparison">
          <h3>📋 {content.ledgerAnalogy.title}</h3>
          <div className="comparison-cards">
            <div className="comparison-card traditional">
              <div className="card-icon">🏦</div>
              <h4>Traditional Banking</h4>
              <p>{content.ledgerAnalogy.traditional}</p>
              <div className="trust-model">
                <span className="trust-label">Trust Model:</span>
                <span className="trust-value">Trust the Bank</span>
              </div>
            </div>
            
            <div className="comparison-card bitcoin">
              <div className="card-icon">₿</div>
              <h4>Bitcoin Network</h4>
              <p>{content.ledgerAnalogy.bitcoin}</p>
              <div className="trust-model">
                <span className="trust-label">Trust Model:</span>
                <span className="trust-value">Trust Math</span>
              </div>
            </div>
          </div>
          
          <div className="analogy-explanation">
            <div className="analogy-icon">💡</div>
            <p><strong>Simple Analogy:</strong> {content.ledgerAnalogy.comparison}</p>
          </div>
        </div>

        <div className="consensus-section">
          <h3>🤝 {content.consensus.title}</h3>
          <div className="consensus-problem">
            <div className="problem-icon">❓</div>
            <p><strong>Problem:</strong> {content.consensus.problem}</p>
          </div>
          
          <button 
            className="show-consensus-btn"
            onClick={() => setShowConsensus(!showConsensus)}
          >
            {showConsensus ? 'Hide Solution' : 'Show How Bitcoin Solves This'}
          </button>
          
          {showConsensus && (
            <div className="consensus-solution">
              <div className="solution-card">
                <h4>Majority Rules</h4>
                <p>{content.consensus.solution}</p>
                <div className="family-vote">
                  <div className="vote-icon">👨‍👩‍👧‍👦</div>
                  <p><em>Analogy:</em> {content.consensus.analogy}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="blocks-section">
          <h3>📚 {content.blocks.title}</h3>
          <div className="blocks-explanation">
            <p>{content.blocks.description}</p>
            <div className="book-analogy">
              <div className="book-icon">📖</div>
              <p><em>Analogy:</em> {content.blocks.analogy}</p>
            </div>
            <div className="timing-explanation">
              <div className="clock-icon">⏰</div>
              <p><strong>Why 10 minutes?</strong> {content.blocks.timing}</p>
            </div>
          </div>
          
          <button 
            className="show-blocks-btn"
            onClick={() => setShowBlocks(!showBlocks)}
          >
            {showBlocks ? 'Hide Example' : 'See How Blocks Work'}
          </button>
          
          {showBlocks && (
            <div className="blocks-example">
              <div className="block-chain">
                <div className="block">
                  <div className="block-number">Block 1</div>
                  <div className="block-content">
                    <div className="transaction">Alice → Bob: 5 BTC</div>
                    <div className="transaction">Charlie → Dave: 2 BTC</div>
                    <div className="transaction">Eve → Frank: 1 BTC</div>
                  </div>
                </div>
                <div className="block-arrow">→</div>
                <div className="block">
                  <div className="block-number">Block 2</div>
                  <div className="block-content">
                    <div className="transaction">Bob → Grace: 3 BTC</div>
                    <div className="transaction">Frank → Alice: 0.5 BTC</div>
                  </div>
                </div>
                <div className="block-arrow">→</div>
                <div className="block">
                  <div className="block-number">Block 3</div>
                  <div className="block-content">
                    <div className="transaction">Grace → Henry: 1 BTC</div>
                    <div className="transaction">Dave → Alice: 1.5 BTC</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="security-question">
          <h3>🔒 {content.question}</h3>
          <div className="security-explanation">
            <div className="security-icon">🛡️</div>
            <p>{content.insight}</p>
          </div>
        </div>

        <button className="continue-button" onClick={onComplete}>
          Blockchain Basics ✓
        </button>
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
      
      case 'fiat-definition':
        return <FiatDefinition content={step.content} onComplete={() => handleStepComplete(index)} />;
      
      case 'energy-transformation':
        return <EnergyTransformation content={step.content} onComplete={() => handleStepComplete(index)} />;
      
      case 'energy-double-spend':
        return <EnergyDoubleSpend content={step.content} onComplete={() => handleStepComplete(index)} />;
      
      case 'energy-work-lab':
        return <EnergyWorkLab content={step.content} onComplete={() => handleStepComplete(index)} />;

      case 'blockchain-discovery':
        return <BlockchainDiscovery content={step.content} onComplete={() => handleStepComplete(index)} />;
      
      case 'space-time-conquest':
        return <SpaceTimeConquest content={step.content} onComplete={() => handleStepComplete(index)} />;
      
      case 'power-law-discovery':
        return <PowerLawDiscovery content={step.content} onComplete={() => handleStepComplete(index)} />;
      
      case 'growth-pattern':
        return <GrowthPattern content={step.content} onComplete={() => handleStepComplete(index)} />;
      
      case 'energy-flow':
        return <EnergyFlow content={step.content} onComplete={() => handleStepComplete(index)} />;
      
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
        <div className="header-top">
          <button className="back-button" onClick={handleBackButton}>
            ← Back
          </button>
          <h1 className="module-title">
            <Zap className="module-icon" />
            Bitcoin 3.0: Energy as Money
          </h1>
        </div>
        <div className="module-progress">
          <span>Step {currentStep + 1} of {steps.length}</span>
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Reset Progress Button */}
        <button className="reset-progress-button" onClick={handleResetProgress}>
          Reset Progress
        </button>
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