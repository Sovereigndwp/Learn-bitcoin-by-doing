import React, { useState, useEffect } from 'react';
import { useProgress } from '../contexts/ProgressContext';
import { 
  Zap, Clock, DollarSign, TrendingUp, Globe, Trophy,
  AlertTriangle, CheckCircle, ArrowRight, Target,
  Users, Layers, Activity, BarChart3, PlayCircle,
  Settings, Calculator, Network, Wallet, Shield
} from 'lucide-react';
import { 
  ContinueButton, 
  ActionButton, 
  OptionButton, 
  NavigationButton, 
  PopupButton,
  Button 
} from '../components/EnhancedButtons';
import '../components/ModuleCommon.css';
import './LightningModule.css';
import ModuleLayout from '../components/ModuleLayout';

const LightningModule = () => {
  const { completeModule, isModuleCompleted } = useProgress();
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(new Set());
  const [userPredictions, setUserPredictions] = useState({});
  const [challengeMode, setChallengeMode] = useState({});
  const [interactionState, setInteractionState] = useState({});
  
  // Lightning Network State
  const [channelBalance, setChannelBalance] = useState({ alice: 50000, bob: 50000 });
  const [paymentQueue, setPaymentQueue] = useState([]);
  const [channelEfficiency, setChannelEfficiency] = useState(85);
  const [networkNodes, setNetworkNodes] = useState(15000);
  const [routingSuccess, setRoutingSuccess] = useState(95);
  const [networkLiquidity, setNetworkLiquidity] = useState(5000);
  const [feeOptimization, setFeeOptimization] = useState(78);
  const [liquidityProvision, setLiquidityProvision] = useState(82);
  const [profitability, setProfitability] = useState(65);
  const [commerceSolutions, setCommerceSolutions] = useState(0.3);
  const [globalAdoption, setGlobalAdoption] = useState(0.25);
  const [micropaymentVolume, setMicropaymentVolume] = useState(0.4);

  const learningSteps = [
    {
      id: 'lightning-introduction',
      title: 'Lightning Network Introduction',
      icon: <Zap className="step-icon" />,
      description: 'Discover why Bitcoin needs a payment layer and how Lightning solves real problems',
      learningObjectives: [
        'Understand Bitcoin base layer limitations',
        'Discover Lightning Network benefits',
        'Explore real-world payment scenarios'
      ]
    },
    {
      id: 'channel-mechanics',
      title: 'Payment Channel Mechanics',
      icon: <Network className="step-icon" />,
      description: 'Learn how payment channels work and enable instant Bitcoin transactions',
      learningObjectives: [
        'Understand channel creation and funding',
        'Explore bidirectional payments',
        'Master channel lifecycle management'
      ]
    },
    {
      id: 'routing-networks',
      title: 'Multi-hop Routing & Networks',
      icon: <Layers className="step-icon" />,
      description: 'Discover how payments route through the Lightning Network topology',
      learningObjectives: [
        'Understand network topology',
        'Learn routing algorithms',
        'Explore path finding mechanisms'
      ]
    },
    {
      id: 'lightning-economics',
      title: 'Lightning Economics & Fees',
      icon: <Calculator className="step-icon" />,
      description: 'Master Lightning fee structures, liquidity management, and node economics',
      learningObjectives: [
        'Understand fee calculation',
        'Learn liquidity management',
        'Explore node profitability'
      ]
    },
    {
      id: 'real-applications',
      title: 'Real-world Applications',
      icon: <Globe className="step-icon" />,
      description: 'Explore practical Lightning implementations in commerce and finance',
      learningObjectives: [
        'Discover e-commerce integration',
        'Understand micropayment systems',
        'Explore global remittances'
      ]
    },
    {
      id: 'lightning-mastery',
      title: 'Lightning Mastery',
      icon: <Trophy className="step-icon" />,
      description: 'Demonstrate comprehensive understanding of Lightning Network',
      learningObjectives: [
        'Complete mastery assessment',
        'Build Lightning solutions',
        'Understand future developments'
      ]
    }
  ];

  const handleStepComplete = (stepIndex) => {
    const newCompleted = new Set(completedSteps);
    newCompleted.add(stepIndex);
    setCompletedSteps(newCompleted);
    
    if (stepIndex === learningSteps.length - 1) {
      completeModule('lightning');
    } else {
      setTimeout(() => setCurrentStep(stepIndex + 1), 1000);
    }
  };

  const handlePrediction = (questionId, prediction) => {
    setUserPredictions(prev => ({ ...prev, [questionId]: prediction }));
    setChallengeMode(prev => ({ ...prev, [questionId]: false }));
  };

  const handleInteraction = (key, value) => {
    setInteractionState(prev => ({ ...prev, [key]: value }));
  };

  const renderStepContent = () => {
    const step = learningSteps[currentStep];
    
    switch (step.id) {
      case 'lightning-introduction':
        return renderLightningIntroduction();
      case 'channel-mechanics':
        return renderChannelMechanics();
      case 'routing-networks':
        return renderRoutingNetworks();
      case 'lightning-economics':
        return renderLightningEconomics();
      case 'real-applications':
        return renderRealApplications();
      case 'lightning-mastery':
        return renderLightningMastery();
      default:
        return null;
    }
  };

  const renderLightningIntroduction = () => {
    const predictions = userPredictions;
    const challenges = challengeMode;

    const bitcoinLimitations = [
      {
        id: 'speed',
        problem: 'Bitcoin Settlement Speed',
        question: 'How long does a Bitcoin transaction take to confirm?',
        options: ['Instant', '10 minutes', '1 hour', '24 hours'],
        reality: '10 minutes average (can be hours during congestion)',
        explanation: 'Bitcoin blocks are mined approximately every 10 minutes, but confirmation times vary with network congestion.',
        thinkingQuestion: 'Why would this speed limitation prevent Bitcoin from being used for daily purchases like coffee?'
      },
      {
        id: 'fees',
        problem: 'Transaction Fee Structure',
        question: 'What happens to Bitcoin fees during network congestion?',
        options: ['Stay constant', 'Decrease slightly', 'Increase significantly', 'Become free'],
        reality: 'Fees can spike from $1 to $50+ during high demand',
        explanation: 'Bitcoin fees are determined by supply and demand for block space. During congestion, users bid higher fees.',
        thinkingQuestion: 'Would you pay $20 in fees to buy a $5 coffee with Bitcoin?'
      },
      {
        id: 'throughput',
        problem: 'Network Throughput Capacity',
        question: 'How many transactions per second can Bitcoin handle?',
        options: ['1,000 TPS', '100 TPS', '7 TPS', 'Unlimited'],
        reality: 'Approximately 7 transactions per second maximum',
        explanation: 'Bitcoin\'s 1MB block size limit and 10-minute blocks restrict throughput to about 7 TPS.',
        thinkingQuestion: 'Visa processes 65,000 TPS. How could Bitcoin compete for global payments at 7 TPS?'
      }
    ];

    const lightningBenefits = [
      {
        id: 'instant',
        benefit: 'Instant Settlements',
        comparison: 'Bitcoin: 10+ minutes → Lightning: Milliseconds',
        impact: 'Enable real-time commerce and micropayments'
      },
      {
        id: 'cheap',
        benefit: 'Tiny Fees',
        comparison: 'Bitcoin: $1-50 → Lightning: Fractions of pennies',
        impact: 'Make micropayments economically viable'
      },
      {
        id: 'scalable',
        benefit: 'Massive Throughput',
        comparison: 'Bitcoin: 7 TPS → Lightning: Millions TPS',
        impact: 'Support global payment infrastructure'
      },
      {
        id: 'private',
        benefit: 'Enhanced Privacy',
        comparison: 'Bitcoin: Public ledger → Lightning: Private channels',
        impact: 'Protect payment details and spending patterns'
      }
    ];

    return (
      <div className="learning-step lightning-introduction">
        <div className="step-header">
          <Zap className="step-icon-large" />
          <div className="step-info">
            <h2>Lightning Network Introduction</h2>
            <p>Understanding why Bitcoin needs a payment layer</p>
          </div>
        </div>

        <div className="introduction-content">
          <div className="prediction-challenges">
            <h3>🤔 Challenge Your Understanding</h3>
            <p>Before we explore Lightning, let's understand Bitcoin's current limitations. Make your predictions:</p>
            
            {bitcoinLimitations.map(limitation => (
              <div key={limitation.id} className="prediction-challenge">
                <div className="challenge-question">
                  <h4>{limitation.problem}</h4>
                  <p>{limitation.question}</p>
                </div>
                
                {challenges[limitation.id] !== false ? (
                  <div className="prediction-options">
                    {limitation.options.map(option => (
                      <button
                        key={option}
                        className="prediction-option"
                        onClick={() => handlePrediction(limitation.id, option)}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="prediction-result">
                    <div className="user-prediction">
                      <strong>Your prediction:</strong> {predictions[limitation.id]}
                    </div>
                    <div className="reality-check">
                      <strong>Reality:</strong> {limitation.reality}
                    </div>
                    <div className="explanation">
                      {limitation.explanation}
                    </div>
                    <div className="thinking-question">
                      <strong>💭 Think about it:</strong> {limitation.thinkingQuestion}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="lightning-solution">
            <h3>⚡ Lightning Network Solution</h3>
            <p>Lightning Network is Bitcoin's "Layer 2" solution that enables instant, cheap payments while maintaining Bitcoin's security.</p>
            
            <div className="benefits-comparison">
              {lightningBenefits.map(benefit => (
                <div key={benefit.id} className="benefit-card">
                  <h4>{benefit.benefit}</h4>
                  <div className="comparison">{benefit.comparison}</div>
                  <div className="impact">{benefit.impact}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="interactive-demo">
            <h3>🎯 Interactive Payment Comparison</h3>
            <div className="payment-scenarios">
              <div className="scenario">
                <h4>☕ Coffee Shop Payment ($5)</h4>
                <div className="payment-methods">
                  <div className="method bitcoin-base">
                    <h5>Bitcoin Base Layer</h5>
                    <div className="method-stats">
                      <div className="stat">Time: 10-60 minutes</div>
                      <div className="stat">Fee: $2-15</div>
                      <div className="stat">Total Cost: $7-20</div>
                      <div className="viability poor">❌ Not viable</div>
                    </div>
                  </div>
                  
                  <div className="method lightning">
                    <h5>Lightning Network</h5>
                    <div className="method-stats">
                      <div className="stat">Time: &lt; 1 second</div>
                      <div className="stat">Fee: $0.001</div>
                      <div className="stat">Total Cost: $5.001</div>
                      <div className="viability excellent">✅ Perfect for commerce</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="scenario">
                <h4>📰 News Article ($0.10)</h4>
                <div className="payment-methods">
                  <div className="method bitcoin-base">
                    <h5>Bitcoin Base Layer</h5>
                    <div className="method-stats">
                      <div className="stat">Time: 10-60 minutes</div>
                      <div className="stat">Fee: $2-15</div>
                      <div className="stat">Total Cost: $2.10-15.10</div>
                      <div className="viability impossible">❌ Impossible</div>
                    </div>
                  </div>
                  
                  <div className="method lightning">
                    <h5>Lightning Network</h5>
                    <div className="method-stats">
                      <div className="stat">Time: &lt; 1 second</div>
                      <div className="stat">Fee: $0.0001</div>
                      <div className="stat">Total Cost: $0.1001</div>
                      <div className="viability excellent">✅ Enables micropayments</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="understanding-check">
            <h3>💡 Understanding Check</h3>
            <div className="check-questions">
              <div className="check-question">
                <p><strong>Why can't Bitcoin base layer handle everyday payments?</strong></p>
                <div className="answer-reveal">
                  <details>
                    <summary>Click to reveal answer</summary>
                    <p>Bitcoin's 10-minute block times and variable fees make it impractical for small, frequent payments. Lightning Network solves this by moving transactions off-chain while maintaining Bitcoin's security.</p>
                  </details>
                </div>
              </div>
              
              <div className="check-question">
                <p><strong>How does Lightning maintain Bitcoin's security guarantees?</strong></p>
                <div className="answer-reveal">
                  <details>
                    <summary>Click to reveal answer</summary>
                    <p>Lightning channels are secured by Bitcoin smart contracts. All funds remain on the Bitcoin blockchain, and users can always close channels to recover their Bitcoin.</p>
                  </details>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="step-completion">
          <Button
            onClick={() => handleStepComplete(0)}
            icon={ArrowRight}
            text="Learn Payment Channel Mechanics"
            className="continue-btn"
          />
        </div>
      </div>
    );
  };

  const simulatePayment = (amount, direction) => {
    if (direction === 'bob-to-alice' && channelBalance.bob >= amount) {
      setChannelBalance(prev => ({
        alice: prev.alice + amount,
        bob: prev.bob - amount
      }));
      setChannelEfficiency(prev => Math.min(prev + 2, 100));
    } else if (direction === 'alice-to-bob' && channelBalance.alice >= amount) {
      setChannelBalance(prev => ({
        alice: prev.alice - amount,
        bob: prev.bob + amount
      }));
      setChannelEfficiency(prev => Math.min(prev + 2, 100));
    }
    
    const payment = {
      id: Date.now(),
      amount,
      direction,
      status: 'settled',
      timestamp: new Date().toLocaleTimeString()
    };
    
    setPaymentQueue(prev => [payment, ...prev.slice(0, 4)]);
  };

  const renderChannelMechanics = () => (
    <div className="learning-step channel-mechanics">
      <div className="step-header">
        <Network className="step-icon-large" />
        <div className="step-info">
          <h2>Payment Channel Mechanics</h2>
          <p>Hands-on exploration of how Lightning channels work</p>
        </div>
      </div>

      <div className="channel-content">
        <div className="channel-explanation">
          <h3>🔗 What is a Payment Channel?</h3>
          <p>A payment channel is like a shared Bitcoin wallet between two parties that enables instant, private transactions.</p>
          
          <div className="channel-lifecycle">
            <div className="lifecycle-step">
              <div className="step-number">1</div>
              <div className="step-info">
                <h4>Channel Opening</h4>
                <p>Alice and Bob create a 2-of-2 multisig wallet and fund it with Bitcoin</p>
              </div>
            </div>
            
            <div className="lifecycle-step">
              <div className="step-number">2</div>
              <div className="step-info">
                <h4>Off-chain Payments</h4>
                <p>They exchange signed transactions updating the balance split</p>
              </div>
            </div>
            
            <div className="lifecycle-step">
              <div className="step-number">3</div>
              <div className="step-info">
                <h4>Channel Closing</h4>
                <p>Either party can broadcast the final state to the Bitcoin blockchain</p>
              </div>
            </div>
          </div>
        </div>

        <div className="interactive-channel">
          <h3>🎯 Interactive Channel Simulator</h3>
          <div className="channel-builder">
            <div className="channel-participants">
              <div className="participant alice">
                <div className="participant-avatar">👩</div>
                <div className="participant-info">
                  <div className="participant-name">Alice (Coffee Shop)</div>
                  <div className="participant-balance">{channelBalance.alice.toLocaleString()} sats</div>
                </div>
              </div>

              <div className="channel-visualization">
                <div className="channel-bar">
                  <div 
                    className="balance-alice" 
                    style={{ width: `${(channelBalance.alice / (channelBalance.alice + channelBalance.bob)) * 100}%` }}
                  />
                  <div 
                    className="balance-bob"
                    style={{ width: `${(channelBalance.bob / (channelBalance.alice + channelBalance.bob)) * 100}%` }}
                  />
                </div>
                <div className="channel-info">
                  <div className="channel-capacity">
                    Total Capacity: {(channelBalance.alice + channelBalance.bob).toLocaleString()} sats
                  </div>
                  <div className="channel-status">
                    <div className="status-indicator active"></div>
                    Channel Status: Active ⚡
                  </div>
                </div>
              </div>

              <div className="participant bob">
                <div className="participant-avatar">👨</div>
                <div className="participant-info">
                  <div className="participant-name">Bob (Customer)</div>
                  <div className="participant-balance">{channelBalance.bob.toLocaleString()} sats</div>
                </div>
              </div>
            </div>

            <div className="payment-simulator">
              <h4>Try Different Payment Scenarios</h4>
              <div className="payment-controls">
                <div className="payment-scenarios">
                  <ActionButton 
                    className="scenario-btn"
                    onClick={() => simulatePayment(5000, 'bob-to-alice')}
                    variant="demo"
                    size="small"
                  >
                    Buy Coffee (5,000 sats)
                  </ActionButton>
                  <ActionButton 
                    className="scenario-btn"
                    onClick={() => simulatePayment(2000, 'bob-to-alice')}
                    variant="demo"
                    size="small"
                  >
                    Buy Pastry (2,000 sats)
                  </ActionButton>
                  <ActionButton 
                    className="scenario-btn"
                    onClick={() => simulatePayment(15000, 'alice-to-bob')}
                    variant="demo"
                    size="small"
                  >
                    Refund Order (15,000 sats)
                  </ActionButton>
                </div>
              </div>

              {paymentQueue.length > 0 && (
                <div className="payment-history">
                  <h5>Recent Payments</h5>
                  {paymentQueue.map(payment => (
                    <div key={payment.id} className="payment-record">
                      <div className="payment-details">
                        <span className="payment-amount">{payment.amount.toLocaleString()} sats</span>
                        <span className="payment-direction">
                          {payment.direction === 'bob-to-alice' ? '👨 → 👩' : '👩 → 👨'}
                        </span>
                      </div>
                      <div className="payment-status">✅ Instant Settlement</div>
                      <div className="payment-time">{payment.timestamp}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="channel-benefits">
          <h3>🎉 Channel Benefits</h3>
          <div className="benefits-grid">
            <div className="benefit">
              <Zap className="benefit-icon" />
              <h4>Instant Settlement</h4>
              <p>Payments settle in milliseconds, not minutes</p>
            </div>
            <div className="benefit">
              <DollarSign className="benefit-icon" />
              <h4>Tiny Fees</h4>
              <p>No on-chain fees for channel payments</p>
            </div>
            <div className="benefit">
              <Shield className="benefit-icon" />
              <h4>Bitcoin Security</h4>
              <p>Backed by Bitcoin blockchain smart contracts</p>
            </div>
            <div className="benefit">
              <Users className="benefit-icon" />
              <h4>Privacy</h4>
              <p>Channel payments are private between participants</p>
            </div>
          </div>
        </div>

        <div className="hands-on-exercise">
          <h3>🛠️ Hands-on Exercise</h3>
          <div className="exercise-content">
            <p>You've just experienced how payment channels work! Notice how:</p>
            <ul>
              <li>Payments are <strong>instant</strong> - no waiting for blockchain confirmation</li>
              <li>The total channel capacity remains <strong>constant</strong> - only the balance distribution changes</li>
              <li>You can send payments in <strong>both directions</strong> as long as you have balance</li>
              <li>Every payment is <strong>secured</strong> by the underlying Bitcoin blockchain</li>
            </ul>
            
            <div className="exercise-question">
              <p><strong>💭 Think about it:</strong> What happens if Alice's balance reaches zero? Could she still receive payments?</p>
              <details>
                <summary>See answer</summary>
                <p>If Alice's balance reaches zero, she cannot send payments but can still receive them. Bob would need to send payments to Alice to rebalance the channel, or Alice could open additional channels with incoming liquidity.</p>
              </details>
            </div>
          </div>
        </div>
      </div>

      <div className="step-completion">
        <Button
          onClick={() => handleStepComplete(1)}
          icon={ArrowRight}
          text="Explore Multi-hop Routing"
          className="continue-btn"
        />
      </div>
    </div>
  );

  const renderRoutingNetworks = () => (
    <div className="learning-step routing-networks">
      <div className="step-header">
        <Layers className="step-icon-large" />
        <div className="step-info">
          <h2>Multi-hop Routing & Networks</h2>
          <p>Discover how payments route through the Lightning Network</p>
        </div>
      </div>

      <div className="routing-content">
        <div className="routing-explanation">
          <h3>🌐 Network Topology</h3>
          <p>Lightning Network is a graph of interconnected payment channels. Payments can route through multiple nodes to reach their destination.</p>
          
          <div className="routing-concepts">
            <div className="concept">
              <h4>🔗 Multi-hop Payments</h4>
              <p>When Alice and Bob don't have a direct channel, they can route payments through intermediate nodes</p>
            </div>
            <div className="concept">
              <h4>📍 Path Finding</h4>
              <p>Nodes discover optimal routes considering fees, liquidity, and reliability</p>
            </div>
            <div className="concept">
              <h4>⚡ Atomic Payments</h4>
              <p>Hash Time-Locked Contracts (HTLCs) ensure payments either complete fully or fail safely</p>
            </div>
          </div>
        </div>

        <div className="interactive-routing">
          <h3>🎯 Interactive Routing Simulator</h3>
          <div className="network-topology">
            <div className="network-stats">
              <div className="network-stat">
                <Users className="stat-icon" />
                <div className="stat-info">
                  <div className="stat-value">{networkNodes.toLocaleString()}</div>
                  <div className="stat-label">Lightning Nodes</div>
                </div>
              </div>
              <div className="network-stat">
                <Activity className="stat-icon" />
                <div className="stat-info">
                  <div className="stat-value">{Math.floor(networkNodes * 4.7).toLocaleString()}</div>
                  <div className="stat-label">Payment Channels</div>
                </div>
              </div>
              <div className="network-stat">
                <DollarSign className="stat-icon" />
                <div className="stat-info">
                  <div className="stat-value">{networkLiquidity.toLocaleString()} BTC</div>
                  <div className="stat-label">Network Capacity</div>
                </div>
              </div>
            </div>

            <div className="routing-demo">
              <h4>Payment Routing Example: New York to Tokyo</h4>
              <div className="routing-path">
                <div className="route-node source">
                  <div className="node-indicator">🏢</div>
                  <div className="node-label">New York<br/>Alice</div>
                </div>
                
                <div className="route-hop">
                  <div className="hop-connection active">
                    <div className="connection-line"></div>
                    <div className="connection-fee">Fee: 0.01%</div>
                  </div>
                  <div className="route-node intermediate">
                    <div className="node-indicator">🌉</div>
                    <div className="node-label">London<br/>Hub Node</div>
                  </div>
                </div>

                <div className="route-hop">
                  <div className="hop-connection active">
                    <div className="connection-line"></div>
                    <div className="connection-fee">Fee: 0.01%</div>
                  </div>
                  <div className="route-node intermediate">
                    <div className="node-indicator">🏔️</div>
                    <div className="node-label">Singapore<br/>Router</div>
                  </div>
                </div>

                <div className="route-hop">
                  <div className="hop-connection active">
                    <div className="connection-line"></div>
                    <div className="connection-fee">Fee: 0.01%</div>
                  </div>
                  <div className="route-node destination">
                    <div className="node-indicator">🗼</div>
                    <div className="node-label">Tokyo<br/>Bob</div>
                  </div>
                </div>
              </div>

              <div className="routing-metrics">
                <div className="routing-metric">
                  <div className="metric-label">Route Hops</div>
                  <div className="metric-value">3 hops</div>
                </div>
                <div className="routing-metric">
                  <div className="metric-label">Total Fees</div>
                  <div className="metric-value">0.03%</div>
                </div>
                <div className="routing-metric">
                  <div className="metric-label">Success Rate</div>
                  <div className="metric-value">{routingSuccess}%</div>
                </div>
                <div className="routing-metric">
                  <div className="metric-label">Settlement Time</div>
                  <div className="metric-value">&lt; 5 seconds</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="routing-challenges">
          <h3>🧩 Routing Challenges & Solutions</h3>
          <div className="challenges-grid">
            <div className="challenge">
              <h4>💧 Liquidity Management</h4>
              <p><strong>Challenge:</strong> Channels need sufficient liquidity in the right direction</p>
              <p><strong>Solution:</strong> Channel rebalancing and circular rebalancing techniques</p>
            </div>
            <div className="challenge">
              <h4>🔍 Privacy vs Efficiency</h4>
              <p><strong>Challenge:</strong> Optimal routing requires network knowledge but reduces privacy</p>
              <p><strong>Solution:</strong> Onion routing and source-based path finding</p>
            </div>
            <div className="challenge">
              <h4>⚖️ Fee Competition</h4>
              <p><strong>Challenge:</strong> Balancing competitive fees with profitability</p>
              <p><strong>Solution:</strong> Dynamic fee adjustment based on channel capacity</p>
            </div>
          </div>
        </div>

        <div className="hands-on-routing">
          <h3>🛠️ Hands-on: Optimize Network Routes</h3>
          <div className="optimization-tools">
            <button 
              className="optimization-tool"
              onClick={() => setRoutingSuccess(prev => Math.min(prev + 15, 99))}
            >
              <Target className="tool-icon" />
              <div className="tool-info">
                <div className="tool-name">Optimize Routing Algorithm</div>
                <div className="tool-description">Improve pathfinding efficiency</div>
              </div>
            </button>

            <button 
              className="optimization-tool"
              onClick={() => {
                setNetworkLiquidity(prev => prev + 100);
                setRoutingSuccess(prev => Math.min(prev + 10, 99));
              }}
            >
              <TrendingUp className="tool-icon" />
              <div className="tool-info">
                <div className="tool-name">Add Network Liquidity</div>
                <div className="tool-description">Increase channel capacities</div>
              </div>
            </button>

            <button 
              className="optimization-tool"
              onClick={() => {
                setNetworkNodes(prev => prev + 500);
                setRoutingSuccess(prev => Math.min(prev + 8, 99));
              }}
            >
              <Users className="tool-icon" />
              <div className="tool-info">
                <div className="tool-name">Expand Network</div>
                <div className="tool-description">Add more routing nodes</div>
              </div>
            </button>
          </div>

          <div className="network-progress">
            <div className="progress-metric">
              <div className="progress-label">Network Efficiency</div>
              <div className="progress-bar">
                <div 
                  className="progress-fill"
                  style={{ width: `${routingSuccess}%` }}
                ></div>
              </div>
              <div className="progress-value">{routingSuccess}%</div>
            </div>
          </div>
        </div>
      </div>

      <div className="step-completion">
        <Button
          onClick={() => handleStepComplete(2)}
          icon={ArrowRight}
          text="Learn Lightning Economics"
          className="continue-btn"
        />
      </div>
    </div>
  );

  const renderLightningEconomics = () => (
    <div className="learning-step lightning-economics">
      <div className="step-header">
        <Calculator className="step-icon-large" />
        <div className="step-info">
          <h2>Lightning Economics & Fees</h2>
          <p>Master Lightning fee structures and node economics</p>
        </div>
      </div>

      <div className="economics-content">
        <div className="fee-structure">
          <h3>💰 Lightning Fee Structure</h3>
          <p>Lightning fees consist of two components designed to make routing profitable while keeping costs low.</p>
          
          <div className="fee-components">
            <div className="fee-component">
              <h4>Base Fee</h4>
              <div className="fee-amount">1-10 satoshis</div>
              <p>Fixed fee per payment regardless of amount</p>
            </div>
            <div className="fee-component">
              <h4>Fee Rate</h4>
              <div className="fee-amount">0.01-0.1%</div>
              <p>Percentage of payment amount</p>
            </div>
          </div>
        </div>

        <div className="interactive-calculator">
          <h3>🧮 Interactive Fee Calculator</h3>
          <div className="calculator-content">
            <div className="fee-scenarios">
              <div className="scenario">
                <h4>☕ Coffee Purchase</h4>
                <div className="scenario-details">
                  <div className="amount">Payment: $5 (12,500 sats)</div>
                  <div className="fees">
                    <div className="fee">Base Fee: 1 sat</div>
                    <div className="fee">Rate Fee: 1.25 sats (0.01%)</div>
                    <div className="total-fee">Total Fee: 2.25 sats ($0.0009)</div>
                  </div>
                  <div className="comparison">Traditional card fee: $0.15-0.30</div>
                </div>
              </div>

              <div className="scenario">
                <h4>🍕 Restaurant Bill</h4>
                <div className="scenario-details">
                  <div className="amount">Payment: $50 (125,000 sats)</div>
                  <div className="fees">
                    <div className="fee">Base Fee: 1 sat</div>
                    <div className="fee">Rate Fee: 12.5 sats (0.01%)</div>
                    <div className="total-fee">Total Fee: 13.5 sats ($0.005)</div>
                  </div>
                  <div className="comparison">Traditional card fee: $1.50-3.00</div>
                </div>
              </div>

              <div className="scenario">
                <h4>🏠 Rent Payment</h4>
                <div className="scenario-details">
                  <div className="amount">Payment: $2,000 (5,000,000 sats)</div>
                  <div className="fees">
                    <div className="fee">Base Fee: 1 sat</div>
                    <div className="fee">Rate Fee: 500 sats (0.01%)</div>
                    <div className="total-fee">Total Fee: 501 sats ($0.20)</div>
                  </div>
                  <div className="comparison">Traditional wire fee: $15-50</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="node-economics">
          <h3>🏪 Lightning Node Economics</h3>
          <div className="economics-dashboard">
            <div className="economics-grid">
              <div className="economics-metric">
                <div className="metric-header">
                  <BarChart3 className="metric-icon" />
                  <h4>Fee Optimization</h4>
                </div>
                <div className="metric-display">
                  <div className="metric-value">{feeOptimization}%</div>
                  <div className="metric-label">Competitive</div>
                </div>
                <div className="metric-details">
                  <div className="detail">Base: 1 sat</div>
                  <div className="detail">Rate: 0.01%</div>
                  <div className="detail">Market Position: Good</div>
                </div>
              </div>

              <div className="economics-metric">
                <div className="metric-header">
                  <Activity className="metric-icon" />
                  <h4>Liquidity Management</h4>
                </div>
                <div className="metric-display">
                  <div className="metric-value">{liquidityProvision}%</div>
                  <div className="metric-label">Balanced</div>
                </div>
                <div className="metric-details">
                  <div className="detail">Inbound: 2.5 BTC</div>
                  <div className="detail">Outbound: 2.5 BTC</div>
                  <div className="detail">Utilization: 65%</div>
                </div>
              </div>

              <div className="economics-metric">
                <div className="metric-header">
                  <Target className="metric-icon" />
                  <h4>Profitability</h4>
                </div>
                <div className="metric-display">
                  <div className="metric-value">{profitability}%</div>
                  <div className="metric-label">ROI</div>
                </div>
                <div className="metric-details">
                  <div className="detail">Revenue: 0.05 BTC/month</div>
                  <div className="detail">Costs: 0.018 BTC/month</div>
                  <div className="detail">Profit: 0.032 BTC/month</div>
                </div>
              </div>
            </div>

            <div className="strategy-tools">
              <h4>Economic Strategy Tools</h4>
              <div className="tools-grid">
                <button 
                  className="strategy-btn"
                  onClick={() => {
                    setFeeOptimization(prev => Math.min(prev + 15, 100));
                    setProfitability(prev => Math.min(prev + 10, 100));
                  }}
                >
                  <BarChart3 className="strategy-icon" />
                  <div className="strategy-info">
                    <div className="strategy-name">Optimize Fee Structure</div>
                    <div className="strategy-description">Balance competitiveness with profit</div>
                  </div>
                </button>

                <button 
                  className="strategy-btn"
                  onClick={() => {
                    setLiquidityProvision(prev => Math.min(prev + 18, 100));
                    setProfitability(prev => Math.min(prev + 8, 100));
                  }}
                >
                  <Activity className="strategy-icon" />
                  <div className="strategy-info">
                    <div className="strategy-name">Rebalance Channels</div>
                    <div className="strategy-description">Maintain optimal liquidity flow</div>
                  </div>
                </button>

                <button 
                  className="strategy-btn"
                  onClick={() => {
                    setLiquidityProvision(prev => Math.min(prev + 12, 100));
                    setFeeOptimization(prev => Math.min(prev + 8, 100));
                    setProfitability(prev => Math.min(prev + 12, 100));
                  }}
                >
                  <TrendingUp className="strategy-icon" />
                  <div className="strategy-info">
                    <div className="strategy-name">Expand Operations</div>
                    <div className="strategy-description">Open new high-capacity channels</div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="economic-insights">
          <h3>💡 Economic Insights</h3>
          <div className="insights-grid">
            <div className="insight">
              <h4>🎯 Sweet Spot Pricing</h4>
              <p>Successful nodes balance competitive fees (attracting routing) with profitability (covering costs and generating returns).</p>
            </div>
            <div className="insight">
              <h4>📊 Liquidity as Inventory</h4>
              <p>Channel liquidity is like inventory - you need it in the right direction to serve payment demand profitably.</p>
            </div>
            <div className="insight">
              <h4>🌐 Network Effects</h4>
              <p>Well-connected nodes with good liquidity management become valuable routing infrastructure, earning consistent fees.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="step-completion">
        <Button
          onClick={() => handleStepComplete(3)}
          icon={ArrowRight}
          text="Explore Real-world Applications"
          className="continue-btn"
        />
      </div>
    </div>
  );

  const renderRealApplications = () => (
    <div className="learning-step real-applications">
      <div className="step-header">
        <Globe className="step-icon-large" />
        <div className="step-info">
          <h2>Real-world Applications</h2>
          <p>Explore Lightning implementations transforming commerce</p>
        </div>
      </div>

      <div className="applications-content">
        <div className="application-categories">
          <div className="application-category">
            <div className="category-header">
              <div className="category-icon">🛒</div>
              <h3>E-Commerce Integration</h3>
            </div>
            <div className="category-stats">
              <div className="stat">
                <span className="stat-label">Active Merchants:</span>
                <span className="stat-value">{Math.floor(commerceSolutions * 25000).toLocaleString()}</span>
              </div>
              <div className="stat">
                <span className="stat-label">Avg Transaction:</span>
                <span className="stat-value">$18.50</span>
              </div>
              <div className="stat">
                <span className="stat-label">Success Rate:</span>
                <span className="stat-value">99.7%</span>
              </div>
            </div>
            <div className="category-features">
              <div className="feature">✅ Instant checkout confirmation</div>
              <div className="feature">✅ No chargeback risk</div>
              <div className="feature">✅ Global reach without intermediaries</div>
              <div className="feature">✅ Lower fees than credit cards</div>
            </div>
          </div>

          <div className="application-category">
            <div className="category-header">
              <div className="category-icon">📱</div>
              <h3>Micropayments & Content</h3>
            </div>
            <div className="category-stats">
              <div className="stat">
                <span className="stat-label">Daily Micropayments:</span>
                <span className="stat-value">{Math.floor(micropaymentVolume * 150000).toLocaleString()}</span>
              </div>
              <div className="stat">
                <span className="stat-label">Avg Amount:</span>
                <span className="stat-value">$0.08</span>
              </div>
              <div className="stat">
                <span className="stat-label">Creator Revenue:</span>
                <span className="stat-value">$2.3M/month</span>
              </div>
            </div>
            <div className="category-features">
              <div className="feature">✅ Pay-per-article journalism</div>
              <div className="feature">✅ Streaming sats for content creators</div>
              <div className="feature">✅ API usage micro-billing</div>
              <div className="feature">✅ Gaming and virtual goods</div>
            </div>
          </div>

          <div className="application-category">
            <div className="category-header">
              <div className="category-icon">🌍</div>
              <h3>Global Remittances</h3>
            </div>
            <div className="category-stats">
              <div className="stat">
                <span className="stat-label">Daily Volume:</span>
                <span className="stat-value">${Math.floor(globalAdoption * 85000).toLocaleString()}</span>
              </div>
              <div className="stat">
                <span className="stat-label">Countries Served:</span>
                <span className="stat-value">180+</span>
              </div>
              <div className="stat">
                <span className="stat-label">Avg Fee:</span>
                <span className="stat-value">0.2%</span>
              </div>
            </div>
            <div className="category-features">
              <div className="feature">✅ Instant cross-border transfers</div>
              <div className="feature">✅ 24/7 availability</div>
              <div className="feature">✅ No banking intermediaries</div>
              <div className="feature">✅ Financial inclusion for unbanked</div>
            </div>
          </div>
        </div>

        <div className="real-world-examples">
          <h3>🌟 Success Stories</h3>
          <div className="examples-grid">
            <div className="example">
              <h4>☕ Coffee Shop Chain</h4>
              <p>A 50-location coffee chain integrated Lightning payments, reducing transaction fees from 3% to 0.1% and eliminating chargebacks completely.</p>
              <div className="example-metrics">
                <span>💰 Saved $180K annually in fees</span>
                <span>⚡ 2-second checkout experience</span>
                <span>🌍 Attracts global Bitcoin tourists</span>
              </div>
            </div>

            <div className="example">
              <h4>📰 Digital News Platform</h4>
              <p>A news website enabled 10¢ per article micropayments, creating a sustainable alternative to subscription and advertising models.</p>
              <div className="example-metrics">
                <span>📈 40% increase in reader engagement</span>
                <span>💡 New revenue stream unlocked</span>
                <span>🚫 No paywall friction</span>
              </div>
            </div>

            <div className="example">
              <h4>🏠 Remittance Service</h4>
              <p>A remittance service reduced transfer costs from 8% to 0.5% for families sending money across borders.</p>
              <div className="example-metrics">
                <span>💸 95% reduction in fees</span>
                <span>⏱️ Instant vs 3-day settlement</span>
                <span>🌐 Serving 50+ countries</span>
              </div>
            </div>
          </div>
        </div>

        <div className="implementation-tools">
          <h3>🛠️ Build Lightning Solutions</h3>
          <div className="tools-showcase">
            <button 
              className="implementation-tool"
              onClick={() => setCommerceSolutions(prev => Math.min(prev + 0.15, 1))}
            >
              <div className="tool-icon">🛍️</div>
              <div className="tool-info">
                <div className="tool-name">Deploy E-commerce Solution</div>
                <div className="tool-description">Add Lightning checkout to online stores</div>
              </div>
            </button>

            <button 
              className="implementation-tool"
              onClick={() => setMicropaymentVolume(prev => Math.min(prev + 0.2, 1))}
            >
              <div className="tool-icon">💰</div>
              <div className="tool-info">
                <div className="tool-name">Enable Micropayment System</div>
                <div className="tool-description">Monetize content with tiny payments</div>
              </div>
            </button>

            <button 
              className="implementation-tool"
              onClick={() => setGlobalAdoption(prev => Math.min(prev + 0.25, 1))}
            >
              <div className="tool-icon">🌐</div>
              <div className="tool-info">
                <div className="tool-name">Launch Remittance Service</div>
                <div className="tool-description">Connect families across borders</div>
              </div>
            </button>
          </div>
        </div>

        <div className="adoption-metrics">
          <h3>📊 Global Lightning Adoption</h3>
          <div className="metrics-dashboard">
            <div className="adoption-metric">
              <div className="metric-value">15,000+</div>
              <div className="metric-label">Public Lightning Nodes</div>
            </div>
            <div className="adoption-metric">
              <div className="metric-value">75,000+</div>
              <div className="metric-label">Payment Channels</div>
            </div>
            <div className="adoption-metric">
              <div className="metric-value">5,000 BTC</div>
              <div className="metric-label">Network Capacity</div>
            </div>
            <div className="adoption-metric">
              <div className="metric-value">180+</div>
              <div className="metric-label">Countries with Lightning</div>
            </div>
          </div>
        </div>
      </div>

      <div className="step-completion">
        <Button
          onClick={() => handleStepComplete(4)}
          icon={ArrowRight}
          text="Complete Lightning Mastery"
          className="continue-btn"
        />
      </div>
    </div>
  );

  const renderLightningMastery = () => (
    <div className="learning-step lightning-mastery">
      <div className="step-header">
        <Trophy className="step-icon-large" />
        <div className="step-info">
          <h2>Lightning Mastery Achievement</h2>
          <p>Demonstrate your comprehensive Lightning Network understanding</p>
        </div>
      </div>

      <div className="mastery-content">
        <div className="mastery-overview">
          <h3>⚡ Lightning Network Mastery</h3>
          <p>You've successfully learned how Lightning Network transforms Bitcoin into a global payment system capable of instant, cheap transactions at massive scale.</p>
          
          <div className="mastery-categories">
            <div className="mastery-category">
              <div className="category-header">
                <Zap className="category-icon" />
                <h4>Technical Understanding</h4>
              </div>
              <div className="mastery-level">Expert</div>
              <div className="category-skills">
                <div className="skill">✅ Payment channel mechanics</div>
                <div className="skill">✅ Multi-hop routing algorithms</div>
                <div className="skill">✅ HTLC smart contracts</div>
                <div className="skill">✅ Network topology optimization</div>
              </div>
            </div>

            <div className="mastery-category">
              <div className="category-header">
                <Calculator className="category-icon" />
                <h4>Economic Mastery</h4>
              </div>
              <div className="mastery-level">Expert</div>
              <div className="category-skills">
                <div className="skill">✅ Fee structure optimization</div>
                <div className="skill">✅ Liquidity management strategies</div>
                <div className="skill">✅ Node profitability analysis</div>
                <div className="skill">✅ Market positioning tactics</div>
              </div>
            </div>

            <div className="mastery-category">
              <div className="category-header">
                <Globe className="category-icon" />
                <h4>Real-world Applications</h4>
              </div>
              <div className="mastery-level">Expert</div>
              <div className="category-skills">
                <div className="skill">✅ E-commerce integration</div>
                <div className="skill">✅ Micropayment systems</div>
                <div className="skill">✅ Global remittance solutions</div>
                <div className="skill">✅ Content monetization</div>
              </div>
            </div>
          </div>
        </div>

        <div className="lightning-capabilities">
          <h3>🎯 Your Lightning Capabilities</h3>
          <div className="capabilities-grid">
            <div className="capability">
              <div className="capability-icon">⚡</div>
              <div className="capability-info">
                <h4>Instant Global Payments</h4>
                <p>Send any amount to anyone, anywhere, in seconds</p>
              </div>
            </div>
            <div className="capability">
              <div className="capability-icon">💰</div>
              <div className="capability-info">
                <h4>Micropenny Transaction Fees</h4>
                <p>Pay fractions of pennies regardless of amount</p>
              </div>
            </div>
            <div className="capability">
              <div className="capability-icon">🌍</div>
              <div className="capability-info">
                <h4>24/7 Global Infrastructure</h4>
                <p>Access worldwide payment network anytime</p>
              </div>
            </div>
            <div className="capability">
              <div className="capability-icon">🏗️</div>
              <div className="capability-info">
                <h4>Build Payment Solutions</h4>
                <p>Create Lightning applications and services</p>
              </div>
            </div>
            <div className="capability">
              <div className="capability-icon">🔒</div>
              <div className="capability-info">
                <h4>Enhanced Privacy</h4>
                <p>Make private payments without revealing spending patterns</p>
              </div>
            </div>
            <div className="capability">
              <div className="capability-icon">⚖️</div>
              <div className="capability-info">
                <h4>Economic Optimization</h4>
                <p>Balance fees, liquidity, and profitability</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mastery-impact">
          <h3>🌟 Your Learning Impact</h3>
          <div className="impact-summary">
            <div className="impact-metric">
              <div className="metric-value">6</div>
              <div className="metric-label">Learning Steps Completed</div>
            </div>
            <div className="impact-metric">
              <div className="metric-value">25+</div>
              <div className="metric-label">Interactive Demonstrations</div>
            </div>
            <div className="impact-metric">
              <div className="metric-value">100%</div>
              <div className="metric-label">Lightning Understanding</div>
            </div>
            <div className="impact-metric">
              <div className="metric-value">∞</div>
              <div className="metric-label">Payment Possibilities</div>
            </div>
          </div>

          <div className="mastery-message">
            <p>You now understand how Lightning Network solves Bitcoin's scalability challenges while maintaining its security and decentralization. You can explain payment channels, routing mechanisms, economics, and real-world applications. Most importantly, you understand how Lightning enables Bitcoin to become a global payment system.</p>
            
            <div className="final-achievement">
              <Trophy className="achievement-trophy" />
              <span>Lightning Network Mastery: ACHIEVED</span>
            </div>
          </div>
        </div>

        <div className="next-steps">
          <h3>🚀 What's Next?</h3>
          <div className="next-steps-grid">
            <div className="next-step">
              <h4>🔧 Build Lightning Apps</h4>
              <p>Use LND, CLN, or Eclair to create Lightning-powered applications</p>
            </div>
            <div className="next-step">
              <h4>🏪 Run a Lightning Node</h4>
              <p>Become part of the Lightning infrastructure and earn routing fees</p>
            </div>
            <div className="next-step">
              <h4>💡 Innovate Payment Solutions</h4>
              <p>Create new payment experiences using Lightning's capabilities</p>
            </div>
            <div className="next-step">
              <h4>🌐 Support Global Adoption</h4>
              <p>Help bring instant Bitcoin payments to more people worldwide</p>
            </div>
          </div>
        </div>
      </div>

      <div className="step-completion">
        <Button
          onClick={() => handleStepComplete(5)}
          icon={Trophy}
          text="Complete Lightning Module"
          className="mastery-complete-btn"
        />
      </div>
    </div>
  );

  return (
    <div className="module-container lightning-module">
      <div className="lightning-content">
        <div className="module-header">
          <div className="header-content">
            <div className="module-icon">⚡</div>
            <div className="header-text">
              <h1 className="module-title">Lightning Network</h1>
              <p className="module-subtitle">Master Bitcoin's instant payment layer</p>
              <div className="module-description">
                Learn how Lightning Network enables instant, cheap Bitcoin transactions worldwide
              </div>
            </div>
          </div>
          
          {isModuleCompleted('lightning') && (
            <div className="completion-badge">
              <Trophy className="completion-icon" />
              <span>Lightning Mastery Achieved!</span>
            </div>
          )}
        </div>

        <div className="module-navigation">
          {learningSteps.map((step, index) => (
            <div
              key={step.id}
              className={`module-tab ${currentStep === index ? 'active' : ''} ${completedSteps.has(index) ? 'completed' : ''}`}
              onClick={() => setCurrentStep(index)}
            >
              <div className="tab-icon">{step.icon}</div>
              <div className="tab-info">
                <div className="tab-title">{step.title}</div>
                <div className="tab-description">{step.description}</div>
              </div>
              {completedSteps.has(index) && (
                <div className="tab-completion">
                  <CheckCircle className="completion-check" />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="module-content">
          {renderStepContent()}
        </div>
      </div>
    </div>
  );
};

export default LightningModule; 