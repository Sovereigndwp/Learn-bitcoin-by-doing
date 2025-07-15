import React, { useState, useEffect } from 'react';
import { useProgress } from '../contexts/ProgressContext';
import { 
  Zap, Clock, DollarSign, TrendingUp, Globe, Trophy,
  AlertTriangle, CheckCircle, ArrowRight, Target,
  Users, Layers, Activity, BarChart3
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
  const [currentPhase, setCurrentPhase] = useState(0);
  const [completedPhases, setCompletedPhases] = useState(new Set());
  const [achievements, setAchievements] = useState([]);
  
  // Crisis Investigation State
  const [investigationProgress, setInvestigationProgress] = useState(0);
  const [crisisData, setCrisisData] = useState({
    paymentFailures: 0,
    costAnalysis: 0,
    speedComparison: 0
  });
  
  // Channel Architecture State
  const [channelBalance, setChannelBalance] = useState({ alice: 50000, bob: 50000 });
  const [paymentQueue, setPaymentQueue] = useState([]);
  const [channelEfficiency, setChannelEfficiency] = useState(0);
  
  // Network Engineering State
  const [networkNodes, setNetworkNodes] = useState(8);
  const [routingSuccess, setRoutingSuccess] = useState(0);
  const [networkLiquidity, setNetworkLiquidity] = useState(500000);
  
  // Economics Mastery State
  const [feeOptimization, setFeeOptimization] = useState(0);
  const [liquidityProvision, setLiquidityProvision] = useState(0);
  const [profitability, setProfitability] = useState(0);
  
  // Commerce Implementation State
  const [commerceSolutions, setCommerceSolutions] = useState(0);
  const [globalAdoption, setGlobalAdoption] = useState(0);
  const [micropaymentVolume, setMicropaymentVolume] = useState(0);
  
  // Sovereignty Achievement State
  const [masteryLevel, setMasteryLevel] = useState(0);
  const [sovereigntyScore, setSovereigntyScore] = useState(0);

  const architectPhases = [
    {
      id: 'crisis-detective',
      title: 'Payment Crisis Detective',
      icon: <AlertTriangle className="phase-icon" />,
      crisis: 'Payment Speed & Cost Nightmare',
      description: 'Investigate the $50B+ payment processing crisis destroying financial opportunities',
      challenge: 'Analyze real payment failures and discover Lightning solutions',
      skills: ['Crisis Analysis', 'Payment System Investigation', 'Solution Discovery'],
      tools: ['Payment Failure Database', 'Cost Analysis Engine', 'Speed Comparison Matrix']
    },
    {
      id: 'speed-alchemist',
      title: 'Speed Alchemist',
      icon: <Zap className="phase-icon" />,
      crisis: 'Time-Critical Payment Construction',
      description: 'Build instant payment channels under extreme time pressure',
      challenge: 'Architect payment channels that enable millisecond transactions',
      skills: ['Channel Architecture', 'Instant Settlements', 'Time Optimization'],
      tools: ['Channel Builder', 'Speed Simulator', 'Performance Monitor']
    },
    {
      id: 'network-architect',
      title: 'Network Architect',
      icon: <Layers className="phase-icon" />,
      crisis: 'Routing Through Network Chaos',
      description: 'Design optimal payment paths through complex network topology',
      challenge: 'Engineer routing solutions for multi-hop payment success',
      skills: ['Network Topology', 'Routing Algorithms', 'Path Optimization'],
      tools: ['Network Designer', 'Route Optimizer', 'Topology Analyzer']
    },
    {
      id: 'liquidity-engineer',
      title: 'Liquidity Engineer',
      icon: <TrendingUp className="phase-icon" />,
      crisis: 'Economic Viability Crisis',
      description: 'Master Lightning economics and fee optimization strategies',
      challenge: 'Balance liquidity provision with profitable operations',
      skills: ['Fee Strategy', 'Liquidity Management', 'Economic Modeling'],
      tools: ['Fee Calculator', 'Liquidity Optimizer', 'Profit Analyzer']
    },
    {
      id: 'commerce-pioneer',
      title: 'Commerce Pioneer',
      icon: <Globe className="phase-icon" />,
      crisis: 'Global Payment Revolution',
      description: 'Build Lightning commerce solutions for worldwide adoption',
      challenge: 'Enable micropayments and instant global commerce',
      skills: ['Commerce Integration', 'Global Scaling', 'Micropayment Systems'],
      tools: ['Payment Gateway', 'Commerce Builder', 'Adoption Tracker']
    },
    {
      id: 'lightning-sovereign',
      title: 'Lightning Sovereign',
      icon: <Trophy className="phase-icon" />,
      crisis: 'Complete Financial Sovereignty',
      description: 'Achieve mastery of instant, global Bitcoin payments',
      challenge: 'Demonstrate complete Lightning Network command',
      skills: ['Complete Mastery', 'Financial Sovereignty', 'Global Impact'],
      tools: ['Mastery Dashboard', 'Sovereignty Metrics', 'Impact Calculator']
    }
  ];

  useEffect(() => {
    // Simulate real-time crisis data updates
    const interval = setInterval(() => {
      if (currentPhase === 0) {
        setCrisisData(prev => ({
          paymentFailures: Math.min(prev.paymentFailures + Math.random() * 1000, 50000),
          costAnalysis: Math.min(prev.costAnalysis + Math.random() * 100, 10000),
          speedComparison: Math.min(prev.speedComparison + Math.random() * 10, 100)
        }));
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [currentPhase]);

  const handlePhaseComplete = (phaseIndex) => {
    const newCompleted = new Set(completedPhases);
    newCompleted.add(phaseIndex);
    setCompletedPhases(newCompleted);
    
    // Award achievements based on phase completion
    const phase = architectPhases[phaseIndex];
    const achievement = {
      id: `phase-${phaseIndex}`,
      title: `${phase.title} Mastered`,
      description: `You've mastered ${phase.skills.join(', ')}`,
      icon: phase.icon,
      timestamp: Date.now()
    };
    
    setAchievements(prev => [...prev, achievement]);
    showAchievementPopup(achievement);
    
    // Update mastery progression
    setMasteryLevel(prev => prev + (100 / architectPhases.length));
    
    if (phaseIndex === architectPhases.length - 1) {
      setSovereigntyScore(100);
      completeModule('lightning');
      showSovereigntyAchievement();
    } else {
      setTimeout(() => setCurrentPhase(phaseIndex + 1), 2000);
    }
  };

  const showAchievementPopup = (achievement) => {
    const popup = document.createElement('div');
    popup.className = 'achievement-popup lightning-achievement';
    popup.innerHTML = `
      <div class="achievement-content">
        <div class="achievement-icon">${achievement.icon?.type?.name || '🏆'}</div>
        <div class="achievement-text">
          <h4>${achievement.title}</h4>
          <p>${achievement.description}</p>
        </div>
        <div class="achievement-lightning">⚡</div>
      </div>
    `;
    document.body.appendChild(popup);
    
    setTimeout(() => {
      popup.style.opacity = '0';
      setTimeout(() => document.body.removeChild(popup), 500);
    }, 4000);
  };

  const showSovereigntyAchievement = () => {
    const popup = document.createElement('div');
    popup.className = 'sovereignty-popup';
    popup.innerHTML = `
      <div class="sovereignty-content">
        <div class="sovereignty-crown">👑</div>
        <h3>Lightning Sovereign Achieved!</h3>
        <p>You now command instant, global Bitcoin payments</p>
        <div class="sovereignty-stats">
          <div>⚡ Instant Settlements</div>
          <div>🌍 Global Reach</div>
          <div>💰 Micropenny Fees</div>
        </div>
      </div>
    `;
    document.body.appendChild(popup);
    
    setTimeout(() => {
      popup.style.opacity = '0';
      setTimeout(() => document.body.removeChild(popup), 500);
    }, 6000);
  };

  const renderPhaseContent = () => {
    const phase = architectPhases[currentPhase];
    
    switch (phase.id) {
      case 'crisis-detective':
        return renderCrisisDetective();
      case 'speed-alchemist':
        return renderSpeedAlchemist();
      case 'network-architect':
        return renderNetworkArchitect();
      case 'liquidity-engineer':
        return renderLiquidityEngineer();
      case 'commerce-pioneer':
        return renderCommercePioneer();
      case 'lightning-sovereign':
        return renderLightningSovereign();
      default:
        return null;
    }
  };

  const renderCrisisDetective = () => (
    <div className="architect-phase crisis-detective">
      <div className="crisis-alert">
        <AlertTriangle className="crisis-icon pulsing" />
        <div className="crisis-content">
          <h3>PAYMENT CRISIS DETECTED</h3>
          <p>Traditional payment systems are failing billions of people worldwide. Investigate the crisis and discover Lightning solutions.</p>
        </div>
      </div>

      <div className="crisis-investigation">
        <div className="investigation-grid">
          <div className="crisis-metric">
            <div className="metric-header">
              <Clock className="metric-icon" />
              <h4>Payment Failures</h4>
      </div>
            <div className="metric-value">
              ${Math.floor(crisisData.paymentFailures).toLocaleString()}M
        </div>
            <div className="metric-description">
              Daily losses from slow payment settlements
          </div>
            <div className="crisis-examples">
              <div className="crisis-example">
                <strong>Real Case:</strong> Small business loses $2,400 monthly due to 3-day payment delays
          </div>
              <div className="crisis-example">
                <strong>Global Impact:</strong> $1.2T locked in slow payment systems daily
          </div>
        </div>
      </div>

          <div className="crisis-metric">
            <div className="metric-header">
              <DollarSign className="metric-icon" />
              <h4>Processing Costs</h4>
        </div>
            <div className="metric-value">
              ${Math.floor(crisisData.costAnalysis).toLocaleString()}B
        </div>
            <div className="metric-description">
              Annual fees paid to payment processors
            </div>
            <div className="crisis-examples">
              <div className="crisis-example">
                <strong>Credit Cards:</strong> 2.9% + $0.30 per transaction
              </div>
              <div className="crisis-example">
                <strong>Wire Transfers:</strong> $15-50 + 1-3% international fees
              </div>
        </div>
      </div>

          <div className="crisis-metric">
            <div className="metric-header">
              <Target className="metric-icon" />
              <h4>Speed Comparison</h4>
      </div>
            <div className="metric-value">
              {Math.floor(crisisData.speedComparison)}%
    </div>
            <div className="metric-description">
              Payments that could be Lightning-fast
            </div>
            <div className="crisis-examples">
              <div className="crisis-example">
                <strong>Traditional:</strong> 3-5 business days settlement
              </div>
              <div className="crisis-example">
                <strong>Lightning:</strong> Millisecond settlement ⚡
              </div>
            </div>
          </div>
        </div>

        <div className="lightning-solution">
          <h3>🌩️ Lightning Network Solution Discovery</h3>
          <div className="solution-comparison">
            <div className="solution-side traditional">
              <h4>Traditional Payments</h4>
              <div className="solution-metrics">
                <div className="metric">Speed: 3-5 days</div>
                <div className="metric">Cost: 2-3% + fees</div>
                <div className="metric">Reach: Limited hours</div>
                <div className="metric">Size: $1+ minimums</div>
        </div>
      </div>

            <div className="solution-arrow">
              <ArrowRight className="solution-icon" />
              <span>Lightning Revolution</span>
      </div>

            <div className="solution-side lightning">
              <h4>Lightning Network</h4>
              <div className="solution-metrics">
                <div className="metric lightning-advantage">Speed: Milliseconds ⚡</div>
                <div className="metric lightning-advantage">Cost: Fractions of pennies</div>
                <div className="metric lightning-advantage">Reach: 24/7 global</div>
                <div className="metric lightning-advantage">Size: Any amount</div>
            </div>
          </div>
            </div>
          </div>

        <div className="investigation-results">
          <div className="result-header">
            <CheckCircle className="result-icon" />
            <h4>Crisis Investigation Complete</h4>
            </div>
          <p>You've uncovered the massive payment crisis affecting billions. Lightning Network emerges as the revolutionary solution enabling instant, cheap, global Bitcoin payments.</p>
          
          <div className="detective-skills">
            <h5>Detective Skills Acquired:</h5>
            <div className="skills-grid">
              <div className="skill">🔍 Payment Crisis Analysis</div>
              <div className="skill">📊 Cost-Benefit Evaluation</div>
              <div className="skill">⚡ Lightning Solution Recognition</div>
          </div>
        </div>
      </div>
      </div>

      <div className="phase-completion">
        <Button
          onClick={() => handlePhaseComplete(0)}
          icon={ArrowRight}
          text="Become Speed Alchemist"
          className="crisis-continue-btn"
        />
      </div>
    </div>
  );

  const renderSpeedAlchemist = () => (
    <div className="architect-phase speed-alchemist">
      <div className="phase-header">
        <Zap className="phase-icon-large pulsing" />
        <div className="phase-info">
          <h2>Speed Alchemist</h2>
          <p>Transform slow payments into lightning-fast channels under extreme time pressure</p>
        </div>
      </div>

      <div className="speed-challenge">
        <div className="challenge-alert">
          <h3>⏰ TIME-CRITICAL MISSION</h3>
          <p>A business needs instant payments operational in 60 seconds. Build payment channels that enable millisecond transactions!</p>
        </div>

        <div className="channel-construction">
          <h4>Payment Channel Architecture</h4>
          <div className="channel-builder">
        <div className="channel-participants">
              <div className="participant alice">
            <div className="participant-avatar">A</div>
                <div className="participant-info">
                  <div className="participant-name">Alice (Merchant)</div>
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
                <div className="channel-capacity">
                  Total Capacity: {(channelBalance.alice + channelBalance.bob).toLocaleString()} sats
                </div>
                <div className="channel-status">
                  <div className="status-indicator active"></div>
                  Channel Status: Active & Lightning Fast ⚡
            </div>
          </div>

              <div className="participant bob">
            <div className="participant-avatar">B</div>
                <div className="participant-info">
                  <div className="participant-name">Bob (Customer)</div>
                  <div className="participant-balance">{channelBalance.bob.toLocaleString()} sats</div>
                </div>
          </div>
        </div>

            <div className="payment-simulator">
              <h5>Lightning Payment Simulator</h5>
        <div className="payment-controls">
                <div className="payment-scenarios">
                  <ActionButton 
                    className="scenario-btn"
                    onClick={() => simulatePayment(1000, 'bob-to-alice')}
                    variant="demo"
                    size="small"
                  >
                    Coffee Purchase (1,000 sats)
                  </ActionButton>
                  <ActionButton 
                    className="scenario-btn"
                    onClick={() => simulatePayment(5000, 'bob-to-alice')}
                    variant="demo"
                    size="small"
                  >
                    Lunch Bill (5,000 sats)
                  </ActionButton>
                  <ActionButton 
                    className="scenario-btn"
                    onClick={() => simulatePayment(25000, 'alice-to-bob')}
                    variant="demo"
                    size="small"
                  >
                    Book Purchase (25,000 sats)
                  </ActionButton>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="speed-metrics">
          <div className="speed-comparison-grid">
            <div className="speed-metric">
              <Activity className="speed-icon" />
              <h5>Settlement Speed</h5>
              <div className="speed-value">
                <span className="speed-number">&lt; 100ms</span>
                <span className="speed-label">Lightning</span>
        </div>
              <div className="vs-traditional">vs 3-5 days traditional</div>
      </div>

            <div className="speed-metric">
              <BarChart3 className="speed-icon" />
              <h5>Channel Efficiency</h5>
              <div className="speed-value">
                <span className="speed-number">{channelEfficiency}%</span>
                <span className="speed-label">Optimized</span>
              </div>
              <div className="vs-traditional">Instant bidirectional flow</div>
            </div>

            <div className="speed-metric">
              <Zap className="speed-icon" />
              <h5>Transaction Throughput</h5>
              <div className="speed-value">
                <span className="speed-number">1M+</span>
                <span className="speed-label">TPS</span>
              </div>
              <div className="vs-traditional">vs 7 TPS Bitcoin base layer</div>
            </div>
          </div>
        </div>

        <div className="alchemist-achievement">
          <h4>⚡ Speed Alchemy Mastered</h4>
          <p>You've successfully transformed slow payment systems into lightning-fast channels. Your channel architecture enables instant settlements with perfect efficiency.</p>
          
          <div className="alchemist-skills">
            <div className="skill-acquired">
              <CheckCircle className="skill-icon" />
              <span>Instant Channel Architecture</span>
            </div>
            <div className="skill-acquired">
              <CheckCircle className="skill-icon" />
              <span>Millisecond Settlement Mastery</span>
            </div>
            <div className="skill-acquired">
              <CheckCircle className="skill-icon" />
              <span>Payment Speed Optimization</span>
            </div>
          </div>
        </div>
      </div>

      <div className="phase-completion">
        <Button
          onClick={() => handlePhaseComplete(1)}
          icon={ArrowRight}
          text="Advance to Network Architect"
          className="alchemist-continue-btn"
        />
      </div>
    </div>
  );

  const simulatePayment = (amount, direction) => {
    if (direction === 'bob-to-alice' && channelBalance.bob >= amount) {
      setChannelBalance(prev => ({
        alice: prev.alice + amount,
        bob: prev.bob - amount
      }));
      setChannelEfficiency(prev => Math.min(prev + 5, 100));
    } else if (direction === 'alice-to-bob' && channelBalance.alice >= amount) {
      setChannelBalance(prev => ({
        alice: prev.alice - amount,
        bob: prev.bob + amount
      }));
      setChannelEfficiency(prev => Math.min(prev + 5, 100));
    }
    
    // Add payment to queue with instant settlement
    const payment = {
      id: Date.now(),
      amount,
      direction,
      status: 'settled',
      timestamp: new Date().toLocaleTimeString()
    };
    
    setPaymentQueue(prev => [payment, ...prev.slice(0, 4)]);
  };

  const renderNetworkArchitect = () => (
    <div className="architect-phase network-architect">
      <div className="phase-header">
        <Layers className="phase-icon-large pulsing" />
        <div className="phase-info">
          <h2>Network Architect</h2>
          <p>Design optimal routing paths through complex Lightning Network topology</p>
        </div>
      </div>

      <div className="network-challenge">
        <div className="challenge-alert">
          <h3>🌐 NETWORK ROUTING CRISIS</h3>
          <p>Payment needs to route from Alaska to Argentina through network congestion. Design the optimal path!</p>
      </div>

        <div className="network-topology">
          <h4>Lightning Network Topology</h4>
          <div className="network-grid">
            <div className="network-stats">
              <div className="network-stat">
                <Users className="stat-icon" />
                <div className="stat-info">
                  <div className="stat-value">{networkNodes.toLocaleString()}</div>
                  <div className="stat-label">Active Nodes</div>
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

            <div className="routing-simulator">
              <h5>Multi-Hop Routing Simulation</h5>
              <div className="routing-path">
                <div className="route-node source">
                  <div className="node-indicator">A</div>
                  <div className="node-label">Alaska</div>
        </div>
        
                <div className="route-hop">
                  <div className="hop-connection active">
                    <div className="connection-line"></div>
                    <div className="connection-fee">0.01%</div>
                  </div>
                  <div className="route-node intermediate">
                    <div className="node-indicator">B</div>
                    <div className="node-label">Seattle Hub</div>
        </div>
      </div>

                <div className="route-hop">
                  <div className="hop-connection active">
                    <div className="connection-line"></div>
                    <div className="connection-fee">0.01%</div>
        </div>
                  <div className="route-node intermediate">
                    <div className="node-indicator">C</div>
                    <div className="node-label">Miami Router</div>
        </div>
                </div>

                <div className="route-hop">
                  <div className="hop-connection active">
                    <div className="connection-line"></div>
                    <div className="connection-fee">0.01%</div>
                  </div>
                  <div className="route-node destination">
                    <div className="node-indicator">D</div>
                    <div className="node-label">Argentina</div>
                  </div>
        </div>
      </div>

              <div className="routing-metrics">
                <div className="routing-metric">
                  <div className="metric-label">Route Length</div>
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
              </div>
            </div>
          </div>
        </div>

        <div className="network-optimization">
          <h4>Network Optimization Tools</h4>
          <div className="optimization-grid">
            <button 
              className="optimization-tool"
              onClick={() => optimizeRouting()}
            >
              <Target className="tool-icon" />
              <div className="tool-info">
                <div className="tool-name">Optimize Routing</div>
                <div className="tool-description">Find best path through network</div>
              </div>
        </button>

            <button 
              className="optimization-tool"
              onClick={() => addNetworkCapacity()}
            >
              <TrendingUp className="tool-icon" />
              <div className="tool-info">
                <div className="tool-name">Add Capacity</div>
                <div className="tool-description">Increase network liquidity</div>
              </div>
            </button>

            <button 
              className="optimization-tool"
              onClick={() => expandNetwork()}
            >
              <Users className="tool-icon" />
              <div className="tool-info">
                <div className="tool-name">Expand Network</div>
                <div className="tool-description">Add more routing nodes</div>
              </div>
            </button>
          </div>
        </div>

        <div className="architect-achievement">
          <h4>🌐 Network Architecture Mastered</h4>
          <p>You've successfully designed optimal routing paths through the Lightning Network. Your network architecture ensures reliable, efficient global payments.</p>
          
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

      <div className="phase-completion">
        <Button
          onClick={() => handlePhaseComplete(2)}
          icon={ArrowRight}
          text="Advance to Liquidity Engineer"
          className="architect-continue-btn"
        />
      </div>
    </div>
  );

  const optimizeRouting = () => {
    setRoutingSuccess(prev => Math.min(prev + 15, 99));
  };

  const addNetworkCapacity = () => {
    setNetworkLiquidity(prev => prev + 100);
    setRoutingSuccess(prev => Math.min(prev + 10, 99));
  };

  const expandNetwork = () => {
    setNetworkNodes(prev => prev + 2);
    setRoutingSuccess(prev => Math.min(prev + 8, 99));
  };

  const renderLiquidityEngineer = () => (
    <div className="architect-phase liquidity-engineer">
      <div className="phase-header">
        <TrendingUp className="phase-icon-large pulsing" />
        <div className="phase-info">
          <h2>Liquidity Engineer</h2>
          <p>Master Lightning economics and build profitable routing operations</p>
        </div>
      </div>

      <div className="liquidity-challenge">
        <div className="challenge-alert">
          <h3>💰 ECONOMIC VIABILITY CRISIS</h3>
          <p>Your Lightning node needs to become profitable while maintaining competitive fees. Engineer the perfect economic balance!</p>
        </div>

        <div className="economics-dashboard">
          <div className="economics-grid">
            <div className="economics-metric">
              <div className="metric-header">
                <DollarSign className="metric-icon" />
                <h5>Fee Optimization</h5>
          </div>
              <div className="metric-display">
                <div className="metric-value">{feeOptimization}%</div>
                <div className="metric-label">Optimized</div>
          </div>
              <div className="metric-details">
                <div className="detail">Base Fee: 1 sat</div>
                <div className="detail">Rate: 0.01%</div>
                <div className="detail">Competitive: ✓</div>
          </div>
            </div>

            <div className="economics-metric">
              <div className="metric-header">
                <Activity className="metric-icon" />
                <h5>Liquidity Provision</h5>
              </div>
              <div className="metric-display">
                <div className="metric-value">{liquidityProvision}%</div>
                <div className="metric-label">Efficient</div>
              </div>
              <div className="metric-details">
                <div className="detail">Inbound: 2.5 BTC</div>
                <div className="detail">Outbound: 2.5 BTC</div>
                <div className="detail">Balanced: ✓</div>
        </div>
      </div>

            <div className="economics-metric">
              <div className="metric-header">
                <Target className="metric-icon" />
                <h5>Node Profitability</h5>
          </div>
              <div className="metric-display">
                <div className="metric-value">{profitability}%</div>
                <div className="metric-label">ROI</div>
          </div>
              <div className="metric-details">
                <div className="detail">Revenue: 0.05 BTC/month</div>
                <div className="detail">Costs: 0.01 BTC/month</div>
                <div className="detail">Profit: 0.04 BTC/month</div>
          </div>
          </div>
        </div>

          <div className="liquidity-strategy">
            <h4>Liquidity Management Strategy</h4>
            <div className="strategy-tools">
              <button 
                className="strategy-btn"
                onClick={() => optimizeFees()}
              >
                <BarChart3 className="strategy-icon" />
                <div className="strategy-info">
                  <div className="strategy-name">Optimize Fee Structure</div>
                  <div className="strategy-description">Balance competitiveness with profitability</div>
      </div>
              </button>

              <button 
                className="strategy-btn"
                onClick={() => rebalanceChannels()}
              >
                <Activity className="strategy-icon" />
                <div className="strategy-info">
                  <div className="strategy-name">Rebalance Channels</div>
                  <div className="strategy-description">Maintain optimal liquidity distribution</div>
                </div>
        </button>

              <button 
                className="strategy-btn"
                onClick={() => expandLiquidity()}
              >
                <TrendingUp className="strategy-icon" />
                <div className="strategy-info">
                  <div className="strategy-name">Expand Liquidity</div>
                  <div className="strategy-description">Open new high-capacity channels</div>
                </div>
              </button>
            </div>
          </div>

          <div className="revenue-projection">
            <h4>Revenue Projection</h4>
            <div className="projection-chart">
              <div className="chart-bars">
                {[20, 35, 55, 75, 90].map((height, index) => (
                  <div key={index} className="revenue-bar">
                    <div 
                      className="bar-fill"
                      style={{ height: `${height}%` }}
                    ></div>
                    <div className="bar-label">Month {index + 1}</div>
                  </div>
                ))}
              </div>
              <div className="projection-details">
                <div className="projection-metric">
                  <span className="metric-label">Projected Annual Revenue:</span>
                  <span className="metric-value">0.6 BTC</span>
                </div>
                <div className="projection-metric">
                  <span className="metric-label">ROI Timeline:</span>
                  <span className="metric-value">8-12 months</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="engineer-achievement">
          <h4>⚖️ Liquidity Engineering Mastered</h4>
          <p>You've mastered Lightning economics, balancing competitive fees with profitable operations. Your node is now a key piece of Lightning infrastructure.</p>
          
          <div className="engineering-skills">
            <div className="skill-category">
              <h5>Economic Mastery</h5>
              <div className="skills-list">
                <div className="skill-item">✓ Fee Optimization Strategies</div>
                <div className="skill-item">✓ Liquidity Management</div>
                <div className="skill-item">✓ Profitability Analysis</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="phase-completion">
        <Button
          onClick={() => handlePhaseComplete(3)}
          icon={ArrowRight}
          text="Advance to Commerce Pioneer"
          className="engineer-continue-btn"
        />
      </div>
    </div>
  );

  const optimizeFees = () => {
    setFeeOptimization(prev => Math.min(prev + 20, 100));
    setProfitability(prev => Math.min(prev + 15, 100));
  };

  const rebalanceChannels = () => {
    setLiquidityProvision(prev => Math.min(prev + 25, 100));
    setProfitability(prev => Math.min(prev + 10, 100));
  };

  const expandLiquidity = () => {
    setLiquidityProvision(prev => Math.min(prev + 15, 100));
    setFeeOptimization(prev => Math.min(prev + 10, 100));
    setProfitability(prev => Math.min(prev + 12, 100));
  };

  const renderCommercePioneer = () => (
    <div className="architect-phase commerce-pioneer">
      <div className="phase-header">
        <Globe className="phase-icon-large pulsing" />
        <div className="phase-info">
          <h2>Commerce Pioneer</h2>
          <p>Build Lightning commerce solutions for global micropayment revolution</p>
        </div>
      </div>

      <div className="commerce-challenge">
        <div className="challenge-alert">
          <h3>🚀 GLOBAL PAYMENT REVOLUTION</h3>
          <p>Launch Lightning commerce solutions that enable micropayments and instant global transactions for millions of users!</p>
        </div>

        <div className="commerce-solutions">
          <div className="solution-grid">
            <div className="commerce-solution">
              <div className="solution-header">
                <div className="solution-icon">🛒</div>
                <h4>E-Commerce Integration</h4>
          </div>
              <div className="solution-metrics">
                <div className="metric">
                  <span className="metric-label">Merchants:</span>
                  <span className="metric-value">{Math.floor(commerceSolutions * 100).toLocaleString()}</span>
          </div>
                <div className="metric">
                  <span className="metric-label">Avg Transaction:</span>
                  <span className="metric-value">$12.50</span>
          </div>
                <div className="metric">
                  <span className="metric-label">Success Rate:</span>
                  <span className="metric-value">99.8%</span>
                </div>
              </div>
              <div className="solution-features">
                <div className="feature">✓ Instant checkout</div>
                <div className="feature">✓ No chargebacks</div>
                <div className="feature">✓ Global reach</div>
        </div>
      </div>

            <div className="commerce-solution">
              <div className="solution-header">
                <div className="solution-icon">📱</div>
                <h4>Micropayment Platform</h4>
              </div>
              <div className="solution-metrics">
                <div className="metric">
                  <span className="metric-label">Micro-transactions:</span>
                  <span className="metric-value">{Math.floor(micropaymentVolume * 10000).toLocaleString()}/day</span>
                </div>
                <div className="metric">
                  <span className="metric-label">Avg Amount:</span>
                  <span className="metric-value">$0.05</span>
                </div>
                <div className="metric">
                  <span className="metric-label">Content Views:</span>
                  <span className="metric-value">2.3M/day</span>
                </div>
              </div>
              <div className="solution-features">
                <div className="feature">✓ Pay-per-article</div>
                <div className="feature">✓ Streaming payments</div>
                <div className="feature">✓ Creator monetization</div>
              </div>
        </div>

            <div className="commerce-solution">
              <div className="solution-header">
                <div className="solution-icon">🌍</div>
                <h4>Global Remittances</h4>
              </div>
              <div className="solution-metrics">
                <div className="metric">
                  <span className="metric-label">Daily Volume:</span>
                  <span className="metric-value">${Math.floor(globalAdoption * 50000).toLocaleString()}</span>
                </div>
                <div className="metric">
                  <span className="metric-label">Countries:</span>
                  <span className="metric-value">150+</span>
                </div>
                <div className="metric">
                  <span className="metric-label">Avg Fee:</span>
                  <span className="metric-value">0.1%</span>
                </div>
              </div>
              <div className="solution-features">
                <div className="feature">✓ Instant transfers</div>
                <div className="feature">✓ 24/7 availability</div>
                <div className="feature">✓ No intermediaries</div>
              </div>
        </div>
      </div>

          <div className="commerce-tools">
            <h4>Commerce Development Tools</h4>
            <div className="tools-grid">
              <button 
                className="commerce-tool"
                onClick={() => buildEcommerce()}
              >
                <div className="tool-icon">🛍️</div>
                <div className="tool-info">
                  <div className="tool-name">Build E-Commerce Solution</div>
                  <div className="tool-description">Enable instant checkout for online stores</div>
                </div>
        </button>

              <button 
                className="commerce-tool"
                onClick={() => deployMicropayments()}
              >
                <div className="tool-icon">💰</div>
                <div className="tool-info">
                  <div className="tool-name">Deploy Micropayment System</div>
                  <div className="tool-description">Enable content monetization with tiny payments</div>
      </div>
              </button>

              <button 
                className="commerce-tool"
                onClick={() => expandGlobally()}
              >
                <div className="tool-icon">🌐</div>
                <div className="tool-info">
                  <div className="tool-name">Expand Global Reach</div>
                  <div className="tool-description">Connect more countries to Lightning network</div>
    </div>
              </button>
            </div>
          </div>

          <div className="global-impact">
            <h4>Global Lightning Impact</h4>
            <div className="impact-metrics">
              <div className="impact-stat">
                <div className="stat-value">2.3M+</div>
                <div className="stat-label">Daily Active Users</div>
              </div>
              <div className="impact-stat">
                <div className="stat-value">$50M+</div>
                <div className="stat-label">Monthly Volume</div>
              </div>
              <div className="impact-stat">
                <div className="stat-value">150+</div>
                <div className="stat-label">Countries Connected</div>
              </div>
              <div className="impact-stat">
                <div className="stat-value">99.8%</div>
                <div className="stat-label">Success Rate</div>
              </div>
            </div>
        </div>
      </div>

        <div className="pioneer-achievement">
          <h4>🌟 Commerce Pioneer Achievement</h4>
          <p>You've successfully built Lightning commerce solutions that enable global micropayments and instant transactions. Your innovations are driving Lightning adoption worldwide.</p>
        </div>
        </div>

      <div className="phase-completion">
        <Button
          onClick={() => handlePhaseComplete(4)}
          icon={ArrowRight}
          text="Achieve Lightning Sovereignty"
          className="pioneer-continue-btn"
        />
      </div>
    </div>
  );

  const buildEcommerce = () => {
    setCommerceSolutions(prev => Math.min(prev + 0.2, 1));
    setGlobalAdoption(prev => Math.min(prev + 0.15, 1));
  };

  const deployMicropayments = () => {
    setMicropaymentVolume(prev => Math.min(prev + 0.25, 1));
    setCommerceSolutions(prev => Math.min(prev + 0.1, 1));
  };

  const expandGlobally = () => {
    setGlobalAdoption(prev => Math.min(prev + 0.3, 1));
    setMicropaymentVolume(prev => Math.min(prev + 0.1, 1));
  };

  const renderLightningSovereign = () => (
    <div className="architect-phase lightning-sovereign">
      <div className="sovereignty-header">
        <Trophy className="sovereignty-crown pulsing" />
        <div className="sovereignty-info">
          <h2>Lightning Sovereign</h2>
          <p>Master of instant, global Bitcoin payments</p>
        </div>
        </div>

      <div className="sovereignty-display">
        <div className="mastery-dashboard">
          <h3>⚡ Lightning Mastery Achieved</h3>
          <div className="mastery-grid">
            <div className="mastery-category">
              <div className="category-header">
                <AlertTriangle className="category-icon" />
                <h4>Crisis Analysis</h4>
              </div>
              <div className="mastery-level">Master</div>
              <div className="category-skills">
                <div className="skill">Payment System Investigation</div>
                <div className="skill">Cost-Benefit Analysis</div>
                <div className="skill">Solution Recognition</div>
        </div>
      </div>

            <div className="mastery-category">
              <div className="category-header">
                <Zap className="category-icon" />
                <h4>Speed Engineering</h4>
              </div>
              <div className="mastery-level">Master</div>
              <div className="category-skills">
                <div className="skill">Channel Architecture</div>
                <div className="skill">Instant Settlements</div>
                <div className="skill">Performance Optimization</div>
              </div>
      </div>

            <div className="mastery-category">
              <div className="category-header">
                <Layers className="category-icon" />
                <h4>Network Design</h4>
              </div>
              <div className="mastery-level">Master</div>
              <div className="category-skills">
                <div className="skill">Topology Optimization</div>
                <div className="skill">Routing Algorithms</div>
                <div className="skill">Path Finding</div>
              </div>
            </div>

            <div className="mastery-category">
              <div className="category-header">
                <TrendingUp className="category-icon" />
                <h4>Economic Mastery</h4>
      </div>
              <div className="mastery-level">Master</div>
              <div className="category-skills">
                <div className="skill">Fee Optimization</div>
                <div className="skill">Liquidity Management</div>
                <div className="skill">Profitability Analysis</div>
    </div>
            </div>

            <div className="mastery-category">
              <div className="category-header">
                <Globe className="category-icon" />
                <h4>Global Impact</h4>
              </div>
              <div className="mastery-level">Master</div>
              <div className="category-skills">
                <div className="skill">Commerce Solutions</div>
                <div className="skill">Micropayment Systems</div>
                <div className="skill">Global Adoption</div>
        </div>
      </div>

            <div className="mastery-category sovereignty-special">
              <div className="category-header">
                <Trophy className="category-icon" />
                <h4>Lightning Sovereignty</h4>
              </div>
              <div className="mastery-level">Achieved</div>
              <div className="category-skills">
                <div className="skill">Complete Lightning Mastery</div>
                <div className="skill">Financial Sovereignty</div>
                <div className="skill">Global Payment Freedom</div>
              </div>
            </div>
          </div>
        </div>

        <div className="sovereignty-powers">
          <h3>👑 Sovereign Powers Unlocked</h3>
          <div className="powers-grid">
            <div className="sovereign-power">
              <div className="power-icon">⚡</div>
              <div className="power-info">
                <h4>Instant Settlements</h4>
                <p>Send any amount globally in milliseconds</p>
          </div>
          </div>
            <div className="sovereign-power">
              <div className="power-icon">💰</div>
              <div className="power-info">
                <h4>Micropenny Fees</h4>
                <p>Pay fractions of pennies for any transaction</p>
          </div>
            </div>
            <div className="sovereign-power">
              <div className="power-icon">🌍</div>
              <div className="power-info">
                <h4>Global Reach</h4>
                <p>Connect to anyone, anywhere, anytime</p>
              </div>
            </div>
            <div className="sovereign-power">
              <div className="power-icon">🏗️</div>
              <div className="power-info">
                <h4>Infrastructure Builder</h4>
                <p>Deploy Lightning solutions at scale</p>
              </div>
            </div>
          </div>
        </div>

        <div className="sovereignty-impact">
          <h3>🌟 Your Lightning Impact</h3>
          <div className="impact-summary">
            <div className="impact-metric">
              <div className="metric-value">100%</div>
              <div className="metric-label">Mastery Level</div>
            </div>
            <div className="impact-metric">
              <div className="metric-value">6</div>
              <div className="metric-label">Phases Completed</div>
            </div>
            <div className="impact-metric">
              <div className="metric-value">∞</div>
              <div className="metric-label">Payment Speed</div>
            </div>
            <div className="impact-metric">
              <div className="metric-value">0.001%</div>
              <div className="metric-label">Transaction Fees</div>
            </div>
        </div>

          <div className="sovereignty-message">
            <p>You have achieved complete mastery of the Lightning Network. You understand how to solve the global payments crisis through instant, cheap Bitcoin transactions. You can build Lightning infrastructure, optimize economic models, and deploy solutions that connect the world through instant value transfer.</p>
            
            <div className="final-achievement">
              <Trophy className="achievement-trophy" />
              <span>Lightning Sovereign Status: ACHIEVED</span>
            </div>
          </div>
        </div>
      </div>

      <div className="phase-completion sovereignty-completion">
        <Button
          onClick={() => handlePhaseComplete(5)}
          icon={Trophy}
          text="Complete Lightning Sovereignty"
          className="sovereignty-complete-btn"
        />
      </div>
    </div>
  );

  return (
    <div className="module-container lightning-crisis-module">
      <div className="lightning-content">
        <div className="module-header">
          <div className="header-content">
            <div className="module-icon">⚡</div>
            <div className="header-text">
              <h1 className="module-title">Lightning Crisis Architect</h1>
              <p className="module-subtitle">Master instant Bitcoin payments through crisis-driven discovery</p>
              <div className="crisis-tagline">
                Transform the global payment nightmare into Lightning-fast solutions
          </div>
            </div>
          </div>
          
          {isModuleCompleted('lightning') && (
            <div className="completion-badge">
              <Trophy className="completion-icon" />
              <span>Lightning Sovereign Achieved!</span>
            </div>
          )}
        </div>

        <div className="architect-navigation">
          {architectPhases.map((phase, index) => (
            <div
              key={phase.id}
              className={`architect-tab ${currentPhase === index ? 'active' : ''} ${completedPhases.has(index) ? 'completed' : ''}`}
              onClick={() => setCurrentPhase(index)}
            >
              <div className="tab-icon">{phase.icon}</div>
              <div className="tab-info">
                <div className="tab-title">{phase.title}</div>
                <div className="tab-crisis">{phase.crisis}</div>
              </div>
              {completedPhases.has(index) && (
                <div className="tab-completion">
                  <CheckCircle className="completion-check" />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mastery-progress">
          <div className="progress-header">
            <span>Lightning Mastery Progress</span>
            <span>{Math.floor(masteryLevel)}%</span>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: `${masteryLevel}%` }}
            ></div>
          </div>
        </div>

        <div className="architect-content">
          {renderPhaseContent()}
        </div>

        {achievements.length > 0 && (
          <div className="achievements-display">
            <h3>🏆 Achievements Unlocked</h3>
            <div className="achievements-grid">
              {achievements.slice(-3).map((achievement) => (
                <div key={achievement.id} className="achievement-card">
                  <div className="achievement-icon">{achievement.icon}</div>
                  <div className="achievement-info">
                    <div className="achievement-title">{achievement.title}</div>
                    <div className="achievement-description">{achievement.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LightningModule; 