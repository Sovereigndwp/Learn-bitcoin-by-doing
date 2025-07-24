import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '../contexts/ProgressContext';
import { 
  ContinueButton, 
  ActionButton,
  NavigationButton,
  OptionButton,
  PageLayout,
  ModuleCard
} from '../components/ui';
import { ModuleCompletionButton, InteractiveIcon } from '../components/ui';
import ProgressCounter, { 
  StepProgressCounter,
  CircularProgressCounter 
} from '../components/ui/ProgressCounter';
// ModuleCard already imported from ui index
import '../components/ModuleCommon.css';
// Using unified UI components for consistency

// Bitcoin Introduction with Prediction Challenges
const BitcoinIntroduction = ({ onComplete }) => {
  const [currentDemo, setCurrentDemo] = useState(0);
  const [userPredictions, setUserPredictions] = useState({});
  const [challengeMode, setChallengeMode] = useState(true);
  const [personalStory, setPersonalStory] = useState('');
  const [thinkingLevel, setThinkingLevel] = useState(1);

  // Streamlined problem demonstrations - removed redundant content
  const problemDemos = [
    {
      id: 'control',
      title: 'Who Controls Your Money?',
      setup: 'In February 2022, the Canadian government froze bank accounts of peaceful protesters...',
      thinkingQuestion: "If your money can be frozen for political reasons, do you really own it?",
      challengeOptions: [
        'Yes, it\'s still mine even if temporarily frozen',
        'No, if it can be frozen, someone else controls it',
        'It depends on the reason for freezing',
        'I never thought about this before'
      ],
      reality: 'Over $7 million in accounts were frozen without court orders. Account holders couldn\'t buy groceries or pay bills.',
      deeperQuestion: "What's the difference between 'having access to money' and 'owning money'?"
    },
    {
      id: 'inflation',
      title: 'The Purchasing Power Problem',
      setup: 'Your grandfather earned $5,000/year in 1970. That same job pays $50,000 today...',
      thinkingQuestion: "If wages went up 10x but a house costs 20x more, are we getting richer or poorer?",
      challengeOptions: [
        'Richer - wages increased 10x',
        'Poorer - things cost more than wage increases',
        'Same - it all balances out',
        'Hard to tell without more data'
      ],
      reality: 'Average home: $23,000 (1970) → $400,000+ (2024). College: $400/year → $25,000/year. Your money buys less every year.',
      deeperQuestion: "Is inflation a natural force like gravity, or is it a policy choice?"
    },
    {
      id: 'speed',
      title: 'Digital Age, Stone Age Money',
      setup: 'You can send a 4K video to Japan in 3 seconds. But sending $100 to Japan takes 3-5 business days...',
      thinkingQuestion: "In the internet age, why does it take longer to send money than to send a video?",
      challengeOptions: [
        'Money is more complex than videos',
        'Banking systems are old and slow',
        'International regulations cause delays',
        'Security requires more time'
      ],
      reality: 'Banks still use 1970s technology (SWIFT). Your money moves through 4-6 intermediaries, each taking 1-2 days.',
      deeperQuestion: "Why do we accept that money moves slower than information?"
    }
  ];

  const currentProblem = problemDemos[currentDemo];

  const handleChallengeChoice = (choice) => {
    setUserPredictions(prev => ({
      ...prev,
      [currentProblem.id]: choice
    }));
    setChallengeMode(false);
    setThinkingLevel(1);
  };

  const handleDemoClick = () => {
    if (thinkingLevel === 1) {
      setThinkingLevel(2);
    } else {
      // Move to next demo or complete
      if (currentDemo < problemDemos.length - 1) {
        setCurrentDemo(currentDemo + 1);
        setChallengeMode(true);
        setThinkingLevel(1);
      } else {
        onComplete(0);
      }
    }
  };

  const handlePersonalStoryChange = (e) => {
    setPersonalStory(e.target.value);
  };

  return (
    <div className="step-content introduction">
      <div className="module-header-box">
        <h2>What Problems Does Bitcoin Solve?</h2>
        <div className="intro-text">
          <p className="prime-text">Before we explore Bitcoin, let's understand the problems with our current money system.</p>
        </div>
      </div>
      
      <div className="content-text">
        <div className="problem-exploration">
          <div className="problem-demo">
            <h3>{currentProblem.title}</h3>
            <p className="setup-text">{currentProblem.setup}</p>
            
            {challengeMode ? (
              <div className="thinking-challenge">
                <div className="challenge-question">
                  <h4>🤔 Think First:</h4>
                  <p>{currentProblem.thinkingQuestion}</p>
        </div>

                <div className="challenge-options">
                  {currentProblem.challengeOptions.map((option, index) => (
                    <OptionButton
                      key={index}
                      className="challenge-option"
                      onClick={() => handleChallengeChoice(option)}
                    >
                      {option}
                    </OptionButton>
                  ))}
            </div>
              </div>
            ) : (
              <div className="reality-reveal">
                <div className="user-prediction">
                  <h4>Your intuition: "{userPredictions[currentProblem.id]}"</h4>
          </div>

                <div className="reality-check">
                  <h4>📊 The Reality:</h4>
                  <p>{currentProblem.reality}</p>
            </div>
                
                {thinkingLevel === 2 && (
                  <div className="deeper-thinking">
                    <h4>🧠 Deeper Question:</h4>
                    <p>{currentProblem.deeperQuestion}</p>
                    
                    <div className="personal-reflection">
                      <h5>Your thoughts:</h5>
                      <textarea
                        value={personalStory}
                        onChange={handlePersonalStoryChange}
                        placeholder="How does this make you feel about money?"
                        className="reflection-input"
                      />
          </div>
        </div>
                )}
                
                <ActionButton 
                  onClick={handleDemoClick}
                  className="demo-next-button"
                >
                  {thinkingLevel === 1 ? "Reflect Deeper →" : 
                   currentDemo < problemDemos.length - 1 ? "Next Problem →" : "See Bitcoin's Solution →"}
                </ActionButton>
          </div>
            )}
        </div>

          <div className="progress-dots">
            {problemDemos.map((_, index) => (
              <div 
                key={index} 
                className={`progress-dot ${index === currentDemo ? 'active' : ''} ${index < currentDemo ? 'completed' : ''}`}
              />
            ))}
        </div>
        </div>
      </div>
      </div>
    );
  };

// Simplified Property Comparison - no redundant stories
const PropertyCompare = ({ onComplete }) => {
  const propertyList = [
    { key: "Self Custody", label: "Self Custody", fiatPass: false, goldPass: true },
    { key: "Decentralization", label: "Decentralization", fiatPass: false, goldPass: true },
    { key: "Verifiability", label: "Verifiability", fiatPass: true, goldPass: false },
    { key: "Fixed Supply", label: "Fixed Supply", fiatPass: false, goldPass: true },
    { key: "Genuine Scarcity", label: "Genuine Scarcity", fiatPass: false, goldPass: true },
    { key: "Fungibility", label: "Fungibility", fiatPass: true, goldPass: false },
    { key: "Portability", label: "Portability", fiatPass: true, goldPass: false },
    { key: "Divisibility", label: "Divisibility", fiatPass: true, goldPass: false },
    { key: "Durability", label: "Durability", fiatPass: false, goldPass: true },
    { key: "Acceptability", label: "Acceptability", fiatPass: true, goldPass: true }
  ];

  const [selections, setSelections] = useState(
    Object.fromEntries(propertyList.map((p) => [p.key, '']))
  );

  const verdict = (prop, choice) => {
    if (!choice) return '';
    if (choice === 'bitcoin') return '✔';
    if (choice === 'gold') return prop.goldPass ? '✔' : '✖';
    return prop.fiatPass ? '✔' : '✖';
  };

  return (
    <div className="step-content comparison">
      <div className="module-header-box">
        <h2>Bitcoin vs Other Money</h2>
        <p>Select a money type for each property. Green means it passes.</p>
      </div>

      <div className="content-text">
        <table className="w-full text-sm">
          <thead>
            <tr>
              <th className="text-left">Property</th>
              <th>Choose</th>
              <th>Result</th>
            </tr>
          </thead>
          <tbody>
            {propertyList.map((prop) => (
              <tr key={prop.key}>
                <td>{prop.label}</td>
                <td>
                  <select
                    value={selections[prop.key]}
                    onChange={(e) =>
                      setSelections({ ...selections, [prop.key]: e.target.value })
                    }
                  >
                    <option value="">—</option>
                    <option value="fiat">Fiat</option>
                    <option value="gold">Gold</option>
                    <option value="bitcoin">Bitcoin</option>
                  </select>
                </td>
                <td className="text-center">
                  {verdict(prop, selections[prop.key])}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        <ContinueButton onClick={() => onComplete(1)}>
          See How Bitcoin Works
        </ContinueButton>
      </div>
    </div>
  );
  };

// Blockchain Demonstration
const BlockchainDemo = ({ onComplete }) => {
  // Can be displayed in the learning module if planned
  return null;
  const [currentBlock, setCurrentBlock] = useState(0);
  const [userTransactions, setUserTransactions] = useState([]);
  const [blockStatus, setBlockStatus] = useState('building');
  const [networkConsensus, setNetworkConsensus] = useState(0);

  const blockChain = [
    {
      id: 0,
      hash: "000000abc123...",
      previousHash: "000000000000...",
      transactions: ["Genesis Block", "First Bitcoin transaction"],
      miner: "Satoshi Nakamoto",
      timestamp: "2009-01-03"
    },
    {
      id: 1,
      hash: "000000def456...",
      previousHash: "000000abc123...",
      transactions: [],
      miner: "Network Node #1847",
      timestamp: "Now",
      isUserBlock: true
    }
  ];

  const handleAddTransaction = (from, to, amount) => {
    const newTx = {
      id: Date.now(),
      from,
      to,
      amount,
      status: 'pending'
    };
    setUserTransactions([...userTransactions, newTx]);
  };

  const handleMineBlock = () => {
    setBlockStatus('mining');
    // Simulate mining process
    let consensus = 0;
    const miningInterval = setInterval(() => {
      consensus += 20;
      setNetworkConsensus(consensus);
      if (consensus >= 100) {
        setBlockStatus('confirmed');
        clearInterval(miningInterval);
        setTimeout(() => {
          if (currentBlock === 0) {
            setCurrentBlock(1);
            setUserTransactions([]);
            setNetworkConsensus(0);
            setBlockStatus('building');
          }
        }, 2000);
      }
    }, 200);
    };

    return (
    <div className="step-content blockchain-demo">
      <div className="module-header-box">
        <h2>How Bitcoin's Blockchain Works</h2>
        <div className="intro-text">
          <p className="prime-text">Bitcoin uses a "blockchain" - a chain of transaction blocks that everyone can verify. Let's build one together!</p>
          </div>
        </div>
            
      <div className="content-text">
        <div className="blockchain-visualization">
          <h3>📦 Live Blockchain</h3>
          <div className="block-chain">
            {blockChain.slice(0, currentBlock + 1).map((block, index) => (
              <div key={block.id} className={`block ${block.isUserBlock ? 'user-block' : 'genesis-block'} ${blockStatus === 'confirmed' && block.isUserBlock ? 'confirmed' : ''}`}>
                <div className="block-header">
                  <h4>Block #{block.id}</h4>
                  <div className="block-hash">Hash: {block.hash}</div>
                  <div className="previous-hash">Previous: {block.previousHash}</div>
          </div>
                <div className="block-body">
                  <div className="transactions-list">
                    <h5>Transactions:</h5>
                    {block.isUserBlock ? (
                      userTransactions.length > 0 ? (
                        userTransactions.map(tx => (
                          <div key={tx.id} className="transaction-item">
                            {tx.from} → {tx.to}: {tx.amount} BTC
                </div>
                        ))
                      ) : (
                        <div className="empty-block">No transactions yet - add some below!</div>
                      )
                    ) : (
                      block.transactions.map((tx, i) => (
                        <div key={i} className="transaction-item">{tx}</div>
                      ))
                  )}
                </div>
                  <div className="block-info">
                    <div>Miner: {block.miner}</div>
                    <div>Time: {block.timestamp}</div>
              </div>
                  </div>
                </div>
              ))}
          </div>
            </div>

        {currentBlock === 0 && (
          <div className="transaction-builder">
            <h3>💰 Add Bitcoin Transactions</h3>
            <p>Create some transactions to include in the next block:</p>
            
            <div className="quick-transactions">
            <ActionButton 
                onClick={() => handleAddTransaction('Alice', 'Bob', '0.5')}
                className="quick-tx-button"
              >
                Alice → Bob: 0.5 BTC
              </ActionButton>
              <ActionButton 
                onClick={() => handleAddTransaction('Charlie', 'Diana', '1.2')}
                className="quick-tx-button"
              >
                Charlie → Diana: 1.2 BTC
              </ActionButton>
              <ActionButton 
                onClick={() => handleAddTransaction('Eve', 'Frank', '0.8')}
                className="quick-tx-button"
              >
                Eve → Frank: 0.8 BTC
            </ActionButton>
          </div>

            {userTransactions.length >= 2 && (
              <div className="mining-section">
                <h4>⛏️ Mine the Block</h4>
                <p>You've added {userTransactions.length} transactions. Ready to mine this block?</p>
                <ActionButton 
                  onClick={handleMineBlock}
                  disabled={blockStatus !== 'building'}
                  className="mine-button"
                >
                  {blockStatus === 'building' ? 'Start Mining' : 
                   blockStatus === 'mining' ? 'Mining in Progress...' : 'Block Confirmed!'}
                </ActionButton>
                
                {blockStatus === 'mining' && (
                  <div className="mining-progress">
                    <div className="consensus-meter">
                      <div className="consensus-label">Network Consensus: {networkConsensus}%</div>
                      <div className="consensus-bar">
                        <div 
                          className="consensus-fill" 
                          style={{ width: `${networkConsensus}%` }}
                        />
              </div>
              </div>
                    <p className="mining-explanation">
                      Thousands of computers worldwide are verifying your block...
              </p>
            </div>
                )}
              </div>
            )}
          </div>
        )}

        {currentBlock === 1 && blockStatus === 'confirmed' && (
          <div className="blockchain-complete">
            <h3>🎉 Congratulations!</h3>
            <p>You've successfully added a block to the blockchain! Here's what just happened:</p>
            <ul>
              <li>✅ <strong>Transactions verified</strong> - Each transaction was cryptographically validated</li>
              <li>✅ <strong>Block mined</strong> - Computers solved a mathematical puzzle to secure the block</li>
              <li>✅ <strong>Network consensus</strong> - Thousands of nodes agreed this block is valid</li>
              <li>✅ <strong>Permanently recorded</strong> - This block can never be changed or deleted</li>
            </ul>
            
            <div className="key-insight">
              <h4>🔑 Key Insight</h4>
              <p>No single person or institution controls this process. It's secured by mathematics, energy, and global consensus.</p>
            </div>

            <ContinueButton onClick={() => onComplete(2)}>
              Explore Bitcoin's Network
          </ContinueButton>
          </div>
        )}
      </div>
      </div>
    );
  };

// Network Consensus Demonstration
const NetworkConsensus = ({ onComplete }) => {
  // Can be displayed in the learning module if planned
  return null;
  const [attackScenario, setAttackScenario] = useState(null);
  const [networkSize] = useState(10000);
  const [attackerNodes, setAttackerNodes] = useState(1000);
  const [simulationRunning, setSimulationRunning] = useState(false);
  const [attackResult, setAttackResult] = useState(null);

  const scenarios = [
    {
      id: 'single_node',
      title: 'Single Bad Actor',
      description: 'One person tries to cheat the system',
      attackerCount: 1,
      successChance: 0
    },
    {
      id: 'small_group',
      title: 'Small Criminal Group',
      description: '100 coordinated attackers',
      attackerCount: 100,
      successChance: 0
    },
    {
      id: 'large_corporation',
      title: 'Large Corporation',
      description: 'Massive company with 1000s of computers',
      attackerCount: 1000,
      successChance: 5
    },
    {
      id: 'nation_state',
      title: 'Nation State Attack',
      description: 'Government with unlimited resources',
      attackerCount: 5000,
      successChance: 45
    }
  ];

  const handleScenarioSelect = (scenario) => {
    setAttackScenario(scenario);
    setAttackerNodes(scenario.attackerCount);
  };

  const runSimulation = () => {
    setSimulationRunning(true);
    setAttackResult(null);
    
    // Simulate attack
    setTimeout(() => {
      const honestNodes = networkSize - attackerNodes;
      const attackerPercentage = (attackerNodes / networkSize) * 100;
      
      let result;
      if (attackerPercentage < 51) {
        result = {
          success: false,
          reason: `Attack failed! Honest nodes (${honestNodes.toLocaleString()}) outnumber attackers (${attackerNodes.toLocaleString()}). Network remains secure.`,
          impact: 'None - Bitcoin continues operating normally'
        };
      } else {
        result = {
          success: true,
          reason: `Attack succeeded! Attackers control ${attackerPercentage.toFixed(1)}% of network.`,
          impact: 'Attackers could potentially double-spend or halt transactions'
        };
      }
      
      setAttackResult(result);
      setSimulationRunning(false);
    }, 2000);
  };

  const attackerPercentage = (attackerNodes / networkSize) * 100;

  return (
    <div className="step-content network-consensus">
      <div className="module-header-box">
        <h2>Bitcoin's Decentralized Security</h2>
        <div className="intro-text">
          <p className="prime-text">Bitcoin's security comes from decentralization. Let's test how hard it is to attack the network.</p>
                      </div>
                      </div>
      
      <div className="content-text">
        <div className="network-visualization">
          <h3>🌐 Bitcoin Network: {networkSize.toLocaleString()} Nodes Worldwide</h3>
          <div className="network-stats">
            <div className="stat-item">
              <div className="stat-value">{(networkSize - attackerNodes).toLocaleString()}</div>
              <div className="stat-label">Honest Nodes</div>
                        </div>
            <div className="stat-item">
              <div className="stat-value">{attackerNodes.toLocaleString()}</div>
              <div className="stat-label">Attacker Nodes</div>
                        </div>
            <div className="stat-item">
              <div className="stat-value">{attackerPercentage.toFixed(1)}%</div>
              <div className="stat-label">Attack Control</div>
                      </div>
                    </div>
          
          <div className="network-visual">
            <div className="network-pie">
              <div 
                className="honest-nodes" 
                style={{ 
                  background: `conic-gradient(#28a745 0deg ${(100 - attackerPercentage) * 3.6}deg, #dc3545 ${(100 - attackerPercentage) * 3.6}deg 360deg)` 
                }}
              >
                <div className="pie-center">
                  <div className="security-status">
                    {attackerPercentage < 51 ? '🛡️ SECURE' : '⚠️ COMPROMISED'}
                      </div>
                      </div>
                    </div>
            </div>
          </div>
                </div>

        <div className="attack-scenarios">
          <h3>🎯 Test Attack Scenarios</h3>
          <p>Choose an attacker and see if they can compromise Bitcoin:</p>
          
          <div className="scenario-grid">
            {scenarios.map(scenario => (
              <div 
                key={scenario.id}
                className={`scenario-card ${attackScenario?.id === scenario.id ? 'selected' : ''}`}
                onClick={() => handleScenarioSelect(scenario)}
              >
                <h4>{scenario.title}</h4>
                <p>{scenario.description}</p>
                <div className="scenario-stats">
                  <div>Attackers: {scenario.attackerCount.toLocaleString()}</div>
                  <div>Control: {((scenario.attackerCount / networkSize) * 100).toFixed(1)}%</div>
                  </div>
                  </div>
            ))}
                </div>
        </div>

        {attackScenario && (
          <div className="simulation-controls">
            <h4>🧪 Run Attack Simulation</h4>
            <p>Test if {attackScenario.title} can compromise the Bitcoin network:</p>
            
            <ActionButton 
              onClick={runSimulation}
              disabled={simulationRunning}
              className="simulation-button"
            >
              {simulationRunning ? 'Running Simulation...' : 'Launch Attack'}
            </ActionButton>

            {simulationRunning && (
              <div className="simulation-progress">
                <div className="progress-animation">⚡ Simulating network attack...</div>
                  </div>
                )}

            {attackResult && (
              <div className={`attack-result ${attackResult.success ? 'attack-success' : 'attack-failed'}`}>
                <h5>{attackResult.success ? '💥 Attack Succeeded' : '🛡️ Attack Failed'}</h5>
                <p><strong>Result:</strong> {attackResult.reason}</p>
                <p><strong>Impact:</strong> {attackResult.impact}</p>
                
                {!attackResult.success && (
                  <div className="security-insight">
                    <h6>🔒 Why Bitcoin Remained Secure:</h6>
                    <ul>
                      <li>Majority of nodes remained honest</li>
                      <li>Decentralized consensus rejected fraudulent transactions</li>
                      <li>Network automatically maintained integrity</li>
                    </ul>
              </div>
            )}
          </div>
            )}
        </div>
        )}

        <div className="consensus-explanation">
          <h3>🤝 How Consensus Works</h3>
          <div className="consensus-rules">
            <div className="rule-item">
              <div className="rule-icon">🗳️</div>
              <div className="rule-content">
                <h4>Majority Rule</h4>
                <p>The longest valid blockchain wins. Honest majority = honest blockchain.</p>
                    </div>
                  </div>
            <div className="rule-item">
              <div className="rule-icon">⚡</div>
              <div className="rule-content">
                <h4>Proof of Work</h4>
                <p>Miners spend real energy to add blocks. Cheating costs more than honesty.</p>
              </div>
            </div>
            <div className="rule-item">
              <div className="rule-icon">🌍</div>
              <div className="rule-content">
                <h4>Global Verification</h4>
                <p>Every node verifies every transaction. Impossible to fake consensus.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="continue-section">
          <h3>🎯 Key Takeaway</h3>
          <p>Bitcoin's security comes from decentralization. The more honest participants, the more secure the network becomes.</p>
          <ContinueButton onClick={() => onComplete(3)}>
            Discover Bitcoin's Fixed Supply
        </ContinueButton>
        </div>
      </div>
      </div>
    );
  };

// Why Scarcity Creates Value
const WhyScarcityMatters = ({ onComplete }) => {
  const [currentExample, setCurrentExample] = useState(0);
  const [userPrediction, setUserPrediction] = useState(null);
  const [showReality, setShowReality] = useState(false);

  const scarcityExamples = [
    {
      id: 'concert_tickets',
      title: 'Concert Tickets',
      setup: "Your favorite artist announces a concert. There are 50,000 seats available. Which scenario makes tickets more valuable?",
      question: "What happens to ticket prices?",
      options: [
        { id: 'high_demand', text: "100,000 people want tickets (2x demand vs supply)", prediction: "Prices go up" },
        { id: 'low_demand', text: "25,000 people want tickets (half demand vs supply)", prediction: "Prices go down" },
        { id: 'unlimited', text: "Unlimited seats available", prediction: "Prices stay low" }
      ],
      reality: {
        truth: "When demand exceeds supply, prices rise. When supply exceeds demand, prices fall. This is basic economics.",
        connection: "Bitcoin has FIXED supply (like limited concert seats) but GROWING demand (more people want it)."
      }
    },
    {
      id: 'money_printing',
      title: 'What Happens When You Print More Money?',
      setup: "Here are real numbers from the US money supply:",
      statistics: {
        money_2000: "$4.9 trillion",
        money_2024: "$21.7 trillion",
        increase: "4.3x more dollars",
        debt_2000: "$5.6 trillion",
        debt_2024: "$34.2 trillion",
        debt_increase: "6x more debt"
      },
      question: "If there are 4x more dollars today than in 2000, what happened to the value of each dollar?",
      options: [
        { id: 'same_value', text: "Each dollar is worth the same", prediction: "No change" },
        { id: 'more_value', text: "Each dollar is worth more", prediction: "Deflation" },
        { id: 'less_value', text: "Each dollar is worth less", prediction: "Inflation" }
      ],
      reality: {
        truth: "Your $100 from 2000 only buys $69 worth of stuff today. More money = each unit worth less.",
        connection: "Bitcoin can never be printed. Only 21 million will ever exist. Your share can't be diluted."
      }
    },
    {
      id: 'bitcoin_scarcity',
      title: 'Bitcoin vs Dollar Creation',
      setup: "Let's compare how new money is created:",
      comparison: {
        dollar: {
          title: "US Dollars",
          creation: "Federal Reserve can create unlimited amounts",
          recent: "Created $4 trillion in 2020-2021 alone",
          future: "Will continue creating more forever",
          your_share: "Gets smaller every year"
        },
        bitcoin: {
          title: "Bitcoin",
          creation: "21 million maximum, written in code",
          recent: "~900 new bitcoins created per day (decreasing)",
          future: "Will stop at exactly 21 million around 2140",
          your_share: "Can never be diluted"
        }
      },
      question: "Which system protects the value of your savings better?",
      options: [
        { id: 'unlimited', text: "Unlimited supply (can always create more)", prediction: "Value stays stable" },
        { id: 'limited', text: "Limited supply (no more can be created)", prediction: "Value protected from dilution" }
      ],
      reality: {
        truth: "Historically, limited supply items (gold, art, real estate in good locations) hold value better than unlimited supply items.",
        connection: "Bitcoin is the first digital asset with truly limited supply. It's like digital gold, but even scarcer."
      }
    }
  ];

  const currentExample_data = scarcityExamples[currentExample];

  const handlePrediction = (optionId) => {
    setUserPrediction(optionId);
    setShowReality(true);
  };

  const handleContinue = () => {
    if (currentExample < scarcityExamples.length - 1) {
      setCurrentExample(currentExample + 1);
      setUserPrediction(null);
      setShowReality(false);
    } else {
      onComplete(3);
    }
    };

    return (
    <div className="step-content scarcity-value">
      <div className="module-header-box">
        <h2>Why Bitcoin Has Value</h2>
        <div className="intro-text">
          <p className="prime-text">Understanding scarcity through examples you already know:</p>
        </div>
        </div>

      <div className="content-text">
        <div className="scarcity-example">
          <h3>{currentExample_data.title}</h3>
          
          {currentExample_data.setup && (
            <div className="setup-section">
              <p>{currentExample_data.setup}</p>
                      </div>
                    )}
          
          {currentExample_data.statistics && (
            <div className="statistics-display">
              <h4>📊 Real US Government Data:</h4>
              <div className="stats-grid">
                <div className="stat-item">
                  <div className="stat-label">Money Supply 2000:</div>
                  <div className="stat-value">{currentExample_data.statistics.money_2000}</div>
                </div>
                <div className="stat-item">
                  <div className="stat-label">Money Supply 2024:</div>
                  <div className="stat-value">{currentExample_data.statistics.money_2024}</div>
                </div>
                <div className="stat-item highlight">
                  <div className="stat-label">Increase:</div>
                  <div className="stat-value">{currentExample_data.statistics.increase}</div>
                </div>
                <div className="stat-item">
                  <div className="stat-label">National Debt 2000:</div>
                  <div className="stat-value">{currentExample_data.statistics.debt_2000}</div>
                </div>
                <div className="stat-item">
                  <div className="stat-label">National Debt 2024:</div>
                  <div className="stat-value">{currentExample_data.statistics.debt_2024}</div>
              </div>
                <div className="stat-item highlight">
                  <div className="stat-label">Debt Increase:</div>
                  <div className="stat-value">{currentExample_data.statistics.debt_increase}</div>
              </div>
            </div>
            </div>
          )}
          
          {currentExample_data.comparison && (
            <div className="comparison-display">
              <div className="comparison-grid">
                <div className="comparison-item dollar-system">
                  <h4>🏦 {currentExample_data.comparison.dollar.title}</h4>
                  <div className="comparison-details">
                    <div>Creation: {currentExample_data.comparison.dollar.creation}</div>
                    <div>Recent: {currentExample_data.comparison.dollar.recent}</div>
                    <div>Future: {currentExample_data.comparison.dollar.future}</div>
                    <div className="impact">Your share: {currentExample_data.comparison.dollar.your_share}</div>
                  </div>
                </div>
                <div className="comparison-item bitcoin-system">
                  <h4>🟠 {currentExample_data.comparison.bitcoin.title}</h4>
                  <div className="comparison-details">
                    <div>Creation: {currentExample_data.comparison.bitcoin.creation}</div>
                    <div>Recent: {currentExample_data.comparison.bitcoin.recent}</div>
                    <div>Future: {currentExample_data.comparison.bitcoin.future}</div>
                    <div className="impact">Your share: {currentExample_data.comparison.bitcoin.your_share}</div>
                      </div>
                  </div>
                </div>
              </div>
          )}
          
          <div className="question-section">
            <h4>{currentExample_data.question}</h4>
            
            {!userPrediction && (
              <div className="prediction-options">
                {currentExample_data.options.map(option => (
                  <button
                    key={option.id}
                    className="prediction-option"
                    onClick={() => handlePrediction(option.id)}
                  >
                    <div className="option-text">{option.text}</div>
                    <div className="option-prediction">→ {option.prediction}</div>
                  </button>
                ))}
          </div>
        )}
              </div>
              
          {showReality && (
            <div className="reality-section">
              <div className="reality-truth">
                <h4>💡 The Reality:</h4>
                <p>{currentExample_data.reality.truth}</p>
            </div>

              <div className="bitcoin-connection">
                <h4>🟠 Bitcoin Connection:</h4>
                <p>{currentExample_data.reality.connection}</p>
            </div>

              <button className="continue-example-button" onClick={handleContinue}>
                {currentExample < scarcityExamples.length - 1 ? 'Next Example →' : 'Complete Bitcoin Basics →'}
              </button>
          </div>
        )}
      </div>
        
        <div className="example-progress">
          <div className="progress-dots">
            {scarcityExamples.map((_, index) => (
              <div 
                key={index}
                className={`progress-dot ${index === currentExample ? 'active' : ''} ${index < currentExample ? 'completed' : ''}`}
              />
            ))}
        </div>
          <p>Example {currentExample + 1} of {scarcityExamples.length}</p>
            </div>
          </div>
      </div>
    );
  };

// Module Completion Component
const BitcoinCompletion = ({ onComplete }) => {
    return (
    <div className="step-content completion-step">
      <div className="module-header-box">
        <h2>🎉 Bitcoin Fundamentals: Complete!</h2>
        <div className="intro-text">
          <p className="prime-text">You now understand how Bitcoin systematically solves every major fiat currency problem. You're ready for the technical deep dive.</p>
        </div>
        </div>

      <div className="completion-content">
        <div className="achievement-summary">
          <h3>🏆 Bitcoin Benefits You've Mastered</h3>
          <div className="accomplishments-grid">
            <div className="accomplishment-item">
              <div className="accomplishment-icon">🛡️</div>
              <h4>Government Interference Protection</h4>
              <p>Bitcoin cannot be frozen, confiscated, or controlled by any authority</p>
              </div>
            <div className="accomplishment-item">
              <div className="accomplishment-icon">💎</div>
              <h4>Store of Value Protection</h4>
              <p>Fixed 21 million supply protects against inflation and money printing</p>
              </div>
            <div className="accomplishment-item">
              <div className="accomplishment-icon">💰</div>
              <h4>Lower Transaction Costs</h4>
              <p>Peer-to-peer transfers eliminate expensive banking intermediaries</p>
            </div>
            <div className="accomplishment-item">
              <div className="accomplishment-icon">⚡</div>
              <h4>Faster International Transfers</h4>
              <p>Global settlement in ~10 minutes vs 3-5 days with traditional banking</p>
            </div>
            <div className="accomplishment-item">
              <div className="accomplishment-icon">🔒</div>
              <h4>Enhanced Privacy & Security</h4>
              <p>Pseudonymous transactions without complete financial surveillance</p>
            </div>
            </div>
          </div>

        <div className="key-insights">
          <h3>💡 Core Bitcoin Advantages</h3>
          <div className="insights-list">
            <div className="insight-item">
              <span className="insight-number">1</span>
              <div className="insight-content">
                <h4>Bitcoin Fixes Fiat Currency's Fatal Flaws</h4>
                <p>Every problem with traditional money - from inflation to censorship to high fees - has a Bitcoin solution.</p>
                      </div>
                  </div>
            <div className="insight-item">
              <span className="insight-number">2</span>
              <div className="insight-content">
                <h4>Mathematical Rules Trump Political Rules</h4>
                <p>Bitcoin's code-based system eliminates human corruption and political manipulation of money.</p>
                </div>
                </div>
            <div className="insight-item">
              <span className="insight-number">3</span>
              <div className="insight-content">
                <h4>True Financial Sovereignty is Possible</h4>
                <p>For the first time in history, individuals can have complete control over their money without relying on institutions.</p>
            </div>
                </div>
            </div>
          </div>

        <div className="next-journey">
          <h3>🔮 Your Technical Journey Ahead</h3>
          <div className="next-journey-content">
            <p>Now that you understand <em>why</em> Bitcoin matters, you're ready to learn <em>how</em> it works under the hood.</p>
            
            <div className="upcoming-modules">
              <h4>🧮 Technical Deep Dive:</h4>
              <ul>
                <li><strong>Number Systems</strong> - How computers represent Bitcoin data</li>
                <li><strong>Cryptographic Hashing</strong> - Bitcoin's security foundation</li>
                <li><strong>Digital Signatures</strong> - How ownership is cryptographically proven</li>
                <li><strong>Mining & Consensus</strong> - How the network stays honest and secure</li>
              </ul>
        </div>

            <p className="ready-question"><strong>Ready to understand Bitcoin's technical brilliance?</strong></p>
            </div>
          </div>

        <ModuleCompletionButton 
          moduleName="Bitcoin Basics"
          moduleId="bitcoin-basics"
          customMessage="🚀 Outstanding! You now understand what makes Bitcoin revolutionary and different from traditional money!"
        />
      </div>
      </div>
    );
  };

// How Bitcoin Works (No Technical Jargon)
const HowBitcoinWorks = ({ onComplete }) => {
  const [currentConcept, setCurrentConcept] = useState(0);
  const [userAnswer, setUserAnswer] = useState(null);
    const [showExplanation, setShowExplanation] = useState(false);

  const concepts = [
    {
      id: 'record_keeping',
      title: 'Keeping Track of Money',
      scenario: "Imagine you and 9 friends are sharing expenses for a group vacation. You need to track who paid for what and who owes money to whom.",
      question: "What's the most trustworthy way to keep track of everyone's payments?",
      options: [
        { id: 'one_person', text: "One person keeps a notebook with all transactions", risk: 'high' },
        { id: 'everyone', text: "Everyone keeps their own identical copy of all transactions", risk: 'low' },
        { id: 'bank', text: "Use a bank to track everything", risk: 'medium' },
        { id: 'memory', text: "Just remember who paid what", risk: 'very_high' }
      ],
      explanation: {
        correct: 'everyone',
        why: "When everyone has the same records, no one can cheat or 'lose' the notebook. This is exactly how Bitcoin works - thousands of people keep identical records of all Bitcoin transactions.",
        bankingAnalogy: "Banks keep ONE record that only they control. Bitcoin keeps THOUSANDS of identical records that everyone can verify.",
        bitcoinConnection: "Bitcoin's 'mathematical code' is just the rules for keeping these records consistent across thousands of computers."
      }
    },
    {
      id: 'consensus',
      title: 'Agreeing on What\'s True',
      scenario: "Your group vacation notebook shows you paid $100 for dinner. But what if someone claims you only paid $50?",
      question: "How do you prove what really happened?",
      options: [
        { id: 'majority', text: "Ask everyone - whatever most people remember is true", risk: 'low' },
        { id: 'authority', text: "One person decides who's right", risk: 'high' },
        { id: 'original', text: "Check the original receipt", risk: 'medium' },
        { id: 'fight', text: "Argue until someone gives up", risk: 'very_high' }
      ],
      explanation: {
        correct: 'majority',
        why: "When most people agree on the same facts, it's extremely hard for one person to lie successfully. Bitcoin uses this same principle.",
        bankingAnalogy: "Banks: 'Trust us, our computer says you have $X.' Bitcoin: '51% of thousands of computers agree you have X bitcoin.'",
        bitcoinConnection: "This is what 'consensus' means - the majority of computers must agree before any Bitcoin transaction is accepted as real."
      }
    },
    {
      id: 'attack_resistance',
      title: 'What If Someone Tries to Cheat?',
      scenario: "Someone in your friend group wants to change the records to show they paid more than they actually did.",
      question: "Which system is harder to cheat?",
      options: [
        { id: 'one_book', text: "One person controls the notebook - just convince them", risk: 'very_high' },
        { id: 'many_books', text: "Everyone has a copy - need to convince majority", risk: 'low' },
        { id: 'no_books', text: "No written records - just argue loudly", risk: 'very_high' },
        { id: 'locked_book', text: "Locked notebook that one person controls", risk: 'high' }
      ],
      explanation: {
        correct: 'many_books',
        why: "To cheat when everyone has copies, you'd need to convince more than half the group to lie for you. Much harder than bribing one person!",
        bankingAnalogy: "Hack one bank = control all accounts. Hack Bitcoin = need to control thousands of computers simultaneously.",
        bitcoinConnection: "This is why Bitcoin is more secure than banks. Attackers would need to control thousands of computers instead of just one bank's server."
      }
    },
    {
      id: 'proof_of_work',
      title: 'Preventing Double-Spending',
      scenario: "Imagine trying to spend the same $20 bill at two different stores simultaneously. In the physical world, this is impossible - you can't be in two places at once.",
      question: "How does Bitcoin prevent someone from spending the same digital money twice?",
      options: [
        { id: 'trust_people', text: "Trust that people won't try to cheat", risk: 'very_high' },
        { id: 'central_authority', text: "Have a bank check every transaction", risk: 'high' },
        { id: 'energy_cost', text: "Make it expensive to create false records", risk: 'low' },
        { id: 'complex_passwords', text: "Use really complicated passwords", risk: 'medium' }
      ],
      explanation: {
        correct: 'energy_cost',
        why: "Bitcoin uses 'Proof-of-Work' - miners must spend real electricity to add transactions to the record. This makes creating fake records extremely expensive.",
        bankingAnalogy: "Banks prevent double-spending by being the single authority. Bitcoin prevents it by making cheating cost more than the reward.",
        bitcoinConnection: "Proof-of-Work makes double-spending as futile as rewriting yesterday's newspaper - technically possible, but economically irrational."
      }
    }
  ];

  const currentConcept_data = concepts[currentConcept];

  const handleAnswer = (optionId) => {
    setUserAnswer(optionId);
      setShowExplanation(true);
    };

  const handleContinue = () => {
    if (currentConcept < concepts.length - 1) {
      setCurrentConcept(currentConcept + 1);
      setUserAnswer(null);
      setShowExplanation(false);
    } else {
      onComplete(2);
    }
    };

    return (
    <div className="module-container">
      <div className="content-section">
        <div className="subtopic-container">
          <div className="subtopic-header">
            <InteractiveIcon type="bitcoin" size={32} className="subtopic-icon" />
            <h2 className="subtopic-title">How Bitcoin Actually Works</h2>
          </div>
          <div className="subtopic-content">
            <p className="content-body">Let's understand the core ideas through simple examples:</p>
          </div>
        </div>

        <div className="quiz-container">
          <div className="quiz-header">
            <h3 className="content-tier-2">{currentConcept_data.title}</h3>
            <div className="scenario-text">
              <p className="content-body">{currentConcept_data.scenario}</p>
            </div>
          </div>
          
          <div className="question-section">
            <h4>{currentConcept_data.question}</h4>
            
            {!userAnswer && (
              <div className="quiz-options two-column">
                {currentConcept_data.options.map((option, index) => (
                  <div
                    key={option.id}
                    className={`quiz-option risk-${option.risk}`}
                    onClick={() => handleAnswer(option.id)}
                  >
                    {option.text}
                    <div className="option-indicator">{index + 1}</div>
                  </div>
                ))}
              </div>
            )}
              </div>

              {showExplanation && (
            <div className={`quiz-feedback ${userAnswer === currentConcept_data.explanation.correct ? 'correct' : 'incorrect'}`}>
              <div className="feedback-text">
                <p><strong>You chose:</strong> "{currentConcept_data.options.find(opt => opt.id === userAnswer)?.text}"</p>
                {userAnswer === currentConcept_data.explanation.correct ? (
                  <p>✅ <strong>Excellent choice!</strong> You understand this concept well.</p>
                ) : (
                  <p>🤔 <strong>Let's explore this further.</strong> Here's why another option might work better:</p>
                )}
              </div>
              
              <div className="explanation-text">
                <div className="correct-answer">
                  <strong>💡 Why this matters:</strong> {currentConcept_data.explanation.why}
                </div>
                
                <div className="learning-point">
                  <strong>🏦 Banking vs Bitcoin:</strong> {currentConcept_data.explanation.bankingAnalogy}
                </div>
                
                <div className="bitcoin-connection">
                  <strong>🟠 Bitcoin Connection:</strong> {currentConcept_data.explanation.bitcoinConnection}
                </div>
              </div>

              <ActionButton className="continue-button" onClick={handleContinue}>
                {currentConcept < concepts.length - 1 ? 'Next Concept →' : 'Understand Bitcoin\'s Value →'}
              </ActionButton>
          </div>
        )}
        </div>
        
        <div className="progress-indicator">
          <div className="progress-dots">
            {concepts.map((_, index) => (
              <div 
                key={index}
                className={`progress-dot ${index === currentConcept ? 'active' : ''} ${index < currentConcept ? 'completed' : ''}`}
              />
            ))}
          </div>
          <p>Concept {currentConcept + 1} of {concepts.length}</p>
        </div>
      </div>
          </div>
        );
  };

const BitcoinBasicsModule = () => {
  const { completeModule } = useProgress();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(() => {
    const saved = localStorage.getItem('bitcoinBasicsCompletedSteps');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  const handleStepComplete = (stepIndex) => {
    const newCompletedSteps = new Set(completedSteps).add(stepIndex);
    setCompletedSteps(newCompletedSteps);
    
    // Save to localStorage
    try {
      localStorage.setItem('bitcoinBasicsCompletedSteps', JSON.stringify(Array.from(newCompletedSteps)));
    } catch (error) {
      console.warn('Failed to save progress to localStorage:', error);
    }
    
    // Show achievements
    if (stepIndex === 1) {
      showAchievement("Bitcoin Basics", "You understand how Bitcoin compares to traditional banking!");
    } else if (stepIndex === 2) {
      showAchievement("Consensus Master", "You understand how Bitcoin reaches agreement!");
    } else if (stepIndex === 3) {
      showAchievement("Value Insights", "You understand why scarcity creates value!");
    }
    
    // Move to next step or complete module
    if (stepIndex < 4) {
      setCurrentStep(stepIndex + 1);
    } else {
      // Module completion is handled by ModuleCompletionButton
      setCurrentStep(stepIndex + 1);
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
        <div class="achievement-controls">
          <button class="achievement-dismiss" onclick="this.closest('.achievement-popup').remove()">
              Continue
          </button>
          </div>
      </div>
      <div class="achievement-hint">Click to dismiss or wait 6 seconds...</div>
    `;
    document.body.appendChild(achievement);
    
    achievement.addEventListener('click', () => {
      achievement.style.opacity = '0';
      setTimeout(() => {
        if (document.body.contains(achievement)) {
          document.body.removeChild(achievement);
        }
      }, 300);
    });
    
    setTimeout(() => {
      if (document.body.contains(achievement)) {
        achievement.style.opacity = '0';
        setTimeout(() => {
          if (document.body.contains(achievement)) {
            document.body.removeChild(achievement);
          }
        }, 300);
      }
    }, 6000);
  };

// Steps used for tracking module progress
const steps = [
    { id: 0, title: "Bitcoin's Promise", icon: "🎯", completed: completedSteps.has(0) },
    { id: 1, title: "Compare Systems", icon: "⚖️", completed: completedSteps.has(1) },
    { id: 2, title: "How It Works", icon: "🔧", completed: completedSteps.has(2) },
    { id: 3, title: "Why It's Valuable", icon: "💎", completed: completedSteps.has(3) },
    { id: 4, title: "Complete", icon: "🎉", completed: completedSteps.has(4) }
  ];

  const handleTabClick = (stepIndex) => {
    setCurrentStep(stepIndex);
  };

  return (
    <div className="module-container">
      {/* HERO SECTION - World-class design principles */}
      <div className="module-header">
        <div className="module-title">
          <div className="module-icon">
            <InteractiveIcon type="bitcoin" size={48} className="module-icon-bitcoin" />
          </div>
          Bitcoin Fundamentals
        </div>
        <div className="module-subtitle">
          Understand what Bitcoin is and why it matters
        </div>
      </div>
      
      {/* TERTIARY: Navigation Steps - Medium Importance */}
      <div className="section-card">
        <h3 className="nav-section-title">Learning Path</h3>
        <div className="step-navigation-container">
          <div className="step-navigation-scroll">
          {["Bitcoin's Promise", "Compare Systems", "How It Works", "Why It's Valuable", "Complete"].map((step, index) => (
            <button
              key={index}
              className={`step-nav-button ${
                index === currentStep ? 'current' : ''
              } ${completedSteps.has(index) ? 'completed' : ''}`}
              onClick={() => handleTabClick(index)}
            >
              <span className="step-nav-number">
                {completedSteps.has(index) ? '✓' : index + 1}
              </span>
              <span className="step-nav-label">{step}</span>
            </button>
          ))}
          </div>
        </div>
      </div>
      
      <div className="module-content">
        {currentStep === 0 && <BitcoinIntroduction onComplete={handleStepComplete} />}
        {currentStep === 1 && <PropertyCompare onComplete={handleStepComplete} />}
        {currentStep === 2 && <HowBitcoinWorks onComplete={handleStepComplete} />}
        {currentStep === 3 && <WhyScarcityMatters onComplete={handleStepComplete} />}
        {currentStep === 4 && <BitcoinCompletion onComplete={handleStepComplete} />}
      </div>
    </div>
  );
};

export default BitcoinBasicsModule; 