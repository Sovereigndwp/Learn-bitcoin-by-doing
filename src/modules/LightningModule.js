import React, { useState, useEffect } from 'react';
import { useProgress } from '../contexts/ProgressContext';
import { 
  Zap, Users, ArrowRight, Network, Clock, DollarSign,
  Trophy, CheckCircle, Target, Globe, Shield, Code
} from 'lucide-react';
import '../components/ModuleCommon.css';
import './LightningModule.css';

const LightningModule = () => {
  const { completeModule, isModuleCompleted } = useProgress();
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(new Set());
  
  // Payment Channel State
  const [aliceBalance, setAliceBalance] = useState(0.7);
  const [bobBalance, setBobBalance] = useState(0.3);
  const [paymentAmount, setPaymentAmount] = useState(0.1);
  const [paymentDirection, setPaymentDirection] = useState('alice-to-bob');
  
  // Network State
  const [selectedRoute, setSelectedRoute] = useState([]);
  const [networkDemo, setNetworkDemo] = useState(false);

  const steps = [
    {
      id: 'intro',
      title: 'Lightning Basics',
      icon: '⚡',
      description: 'What is Lightning Network and why it matters'
    },
    {
      id: 'payment-channels',
      title: 'Payment Channels',
      icon: '🔗',
      description: 'Understanding the foundation of Lightning'
    },
    {
      id: 'channel-simulator',
      title: 'Channel Simulator', 
      icon: '🎮',
      description: 'Interactive payment channel experience'
    },
    {
      id: 'multi-hop-routing',
      title: 'Multi-Hop Routing',
      icon: '🌐',
      description: 'How payments find their way through the network'
    },
    {
      id: 'network-topology',
      title: 'Network Topology',
      icon: '🕸️',
      description: 'Lightning Network graph and visualization'
    },
    {
      id: 'economics',
      title: 'Lightning Economics',
      icon: '💰',
      description: 'Fees, liquidity, and economic incentives'
    },
    {
      id: 'real-world',
      title: 'Real-World Usage',
      icon: '🌍',
      description: 'Lightning in action today'
    },
    {
      id: 'mastery',
      title: 'Lightning Mastery',
      icon: '🏆',
      description: 'Complete understanding achievement'
    }
  ];

  const handleStepComplete = (stepIndex) => {
    const newCompleted = new Set(completedSteps);
    newCompleted.add(stepIndex);
    setCompletedSteps(newCompleted);
    
    // Show achievements
    if (stepIndex === 1) {
      showAchievement("Channel Pioneer", "You understand Bitcoin payment channels!");
    } else if (stepIndex === 3) {
      showAchievement("Network Navigator", "You've mastered Lightning routing!");
    } else if (stepIndex === 5) {
      showAchievement("Lightning Economist", "You understand Lightning economics!");
    } else if (stepIndex === 7) {
      showAchievement("Lightning Master", "Complete Lightning Network mastery achieved!");
      completeModule('lightning');
    }
    
    if (stepIndex < steps.length - 1) {
      setTimeout(() => setCurrentStep(stepIndex + 1), 1000);
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
      setTimeout(() => document.body.removeChild(achievement), 300);
    }, 3000);
  };

  const makePayment = () => {
    const amount = parseFloat(paymentAmount);
    if (paymentDirection === 'alice-to-bob' && aliceBalance >= amount) {
      setAliceBalance(prev => prev - amount);
      setBobBalance(prev => prev + amount);
    } else if (paymentDirection === 'bob-to-alice' && bobBalance >= amount) {
      setBobBalance(prev => prev - amount);
      setAliceBalance(prev => prev + amount);
    }
  };

  const renderStep = () => {
    const step = steps[currentStep];
    
    switch (step.id) {
      case 'intro':
        return renderIntroStep();
      case 'payment-channels':
        return renderPaymentChannelsStep();
      case 'channel-simulator':
        return renderChannelSimulator();
      case 'multi-hop-routing':
        return renderMultiHopRouting();
      case 'network-topology':
        return renderNetworkTopology();
      case 'economics':
        return renderEconomics();
      case 'real-world':
        return renderRealWorld();
      case 'mastery':
        return renderMastery();
      default:
        return null;
    }
  };

  const renderIntroStep = () => (
    <div className="step-container">
      <div className="step-header">
        <div className="step-icon">⚡</div>
        <div>
          <h2 className="step-title">Lightning Network Basics</h2>
          <p className="step-subtitle">Instant Bitcoin payments at the speed of light</p>
        </div>
      </div>

      <div className="lightning-description">
        💡 Lightning Network is Bitcoin's scaling solution that enables instant, cheap payments by creating "payment channels" between users.
      </div>

      <div className="comparison-table">
        <div className="comparison-header">
          <h3 className="comparison-title">Bitcoin vs Lightning Network</h3>
        </div>
        <div className="comparison-grid">
          <div className="comparison-item">
            <div className="comparison-label">Bitcoin Base Layer</div>
            <div className="comparison-value onchain">~7 TPS</div>
            <div className="comparison-description">10-60 minute confirmations, $1-50+ fees</div>
          </div>
          <div className="comparison-item">
            <div className="comparison-label">Lightning Network</div>
            <div className="comparison-value lightning">Millions TPS</div>
            <div className="comparison-description">Instant confirmations, pennies in fees</div>
          </div>
          <div className="comparison-item">
            <div className="comparison-label">Traditional Banking</div>
            <div className="comparison-value traditional">~1,700 TPS</div>
            <div className="comparison-description">3-5 business days, 2-3% fees</div>
          </div>
        </div>
      </div>

      <div className="feature-showcase">
        <div className="feature-card">
          <div className="feature-icon">⚡</div>
          <div className="feature-title">Instant Payments</div>
          <div className="feature-description">Payments settle in milliseconds, not minutes</div>
        </div>
        <div className="feature-card">
          <div className="feature-icon">💰</div>
          <div className="feature-title">Micro Fees</div>
          <div className="feature-description">Send any amount for fractions of a penny</div>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🔒</div>
          <div className="feature-title">Bitcoin Security</div>
          <div className="feature-description">Inherits all of Bitcoin's security guarantees</div>
        </div>
      </div>

      <div className="step-completion">
        <div className="completion-icon">✓</div>
        <div className="completion-title">Lightning Fundamentals</div>
        <div className="completion-message">You understand the basic concept of Lightning Network!</div>
        <button className="continue-button" onClick={() => handleStepComplete(0)}>
          Continue to Payment Channels <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );

  const renderPaymentChannelsStep = () => (
    <div className="step-container">
      <div className="step-header">
        <div className="step-icon">🔗</div>
        <div>
          <h2 className="step-title">Payment Channels</h2>
          <p className="step-subtitle">The building blocks of Lightning Network</p>
        </div>
      </div>

      <div className="lightning-description">
        💡 A payment channel is like a shared Bitcoin wallet between two people that they can update instantly without broadcasting every transaction to the blockchain.
      </div>

      <div className="channel-visualization">
        <h3 style={{ textAlign: 'center', marginBottom: '2rem' }}>How Payment Channels Work</h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          <div style={{ background: 'rgba(252, 211, 77, 0.1)', padding: '1.5rem', borderRadius: '12px' }}>
            <h4 style={{ color: '#fcd34d', marginBottom: '1rem' }}>1. Channel Opening</h4>
            <p>Alice and Bob each lock 0.5 BTC in a 2-of-2 multisig address on the Bitcoin blockchain.</p>
            <div style={{ margin: '1rem 0', padding: '1rem', background: 'rgba(0,0,0,0.2)', borderRadius: '8px', fontFamily: 'monospace' }}>
              Alice: 0.5 BTC → Channel<br/>
              Bob: 0.5 BTC → Channel<br/>
              Total: 1.0 BTC locked
            </div>
          </div>

          <div style={{ background: 'rgba(96, 165, 250, 0.1)', padding: '1.5rem', borderRadius: '12px' }}>
            <h4 style={{ color: '#60a5fa', marginBottom: '1rem' }}>2. Off-Chain Payments</h4>
            <p>They can now send Bitcoin back and forth instantly by updating the channel balance.</p>
            <div style={{ margin: '1rem 0', padding: '1rem', background: 'rgba(0,0,0,0.2)', borderRadius: '8px', fontFamily: 'monospace' }}>
              Alice sends 0.2 BTC to Bob<br/>
              New balance:<br/>
              Alice: 0.3 BTC | Bob: 0.7 BTC
            </div>
          </div>

          <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '1.5rem', borderRadius: '12px' }}>
            <h4 style={{ color: '#10b981', marginBottom: '1rem' }}>3. Channel Closing</h4>
            <p>When finished, they broadcast the final state to the blockchain and withdraw their funds.</p>
            <div style={{ margin: '1rem 0', padding: '1rem', background: 'rgba(0,0,0,0.2)', borderRadius: '8px', fontFamily: 'monospace' }}>
              Final settlement:<br/>
              Alice receives: 0.3 BTC<br/>
              Bob receives: 0.7 BTC
            </div>
          </div>
        </div>
      </div>

      <div style={{ background: 'rgba(239, 68, 68, 0.1)', padding: '1.5rem', borderRadius: '12px', margin: '2rem 0' }}>
        <h4 style={{ color: '#ef4444', marginBottom: '1rem' }}>🔒 Security Features</h4>
        <ul style={{ color: '#f1f5f9', lineHeight: '1.6' }}>
          <li><strong>Commitment Transactions:</strong> Each party holds a transaction that can close the channel with the current balance</li>
          <li><strong>Revocation Keys:</strong> Old channel states are revoked to prevent cheating</li>
          <li><strong>Time Locks:</strong> Disputes have a window for the other party to prove fraud</li>
          <li><strong>Hash Locks:</strong> Payments are cryptographically guaranteed to be atomic</li>
        </ul>
      </div>

      <div className="step-completion">
        <div className="completion-icon">✓</div>
        <div className="completion-title">Channel Mastery</div>
        <div className="completion-message">You understand how payment channels enable instant Bitcoin transactions!</div>
        <button className="continue-button" onClick={() => handleStepComplete(1)}>
          Try the Channel Simulator <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );

  const renderChannelSimulator = () => (
    <div className="step-container">
      <div className="step-header">
        <div className="step-icon">🎮</div>
        <div>
          <h2 className="step-title">Channel Simulator</h2>
          <p className="step-subtitle">Experience Lightning payments hands-on</p>
        </div>
      </div>

      <div className="channel-visualization">
        <h3 style={{ textAlign: 'center', marginBottom: '2rem' }}>Alice ↔ Bob Payment Channel</h3>
        
        <div className="channel-participants">
          <div className="participant">
            <div className="participant-avatar">A</div>
            <div className="participant-name">Alice</div>
            <div className="participant-balance">{aliceBalance.toFixed(2)} BTC</div>
          </div>

          <div className="channel-bar">
            <div className="channel-balance">
              <div 
                className="balance-alice" 
                style={{ width: `${(aliceBalance / (aliceBalance + bobBalance)) * 100}%` }}
              />
              <div 
                className="balance-bob"
                style={{ width: `${(bobBalance / (aliceBalance + bobBalance)) * 100}%` }}
              />
            </div>
            <div className="channel-amount">
              Total: {(aliceBalance + bobBalance).toFixed(1)} BTC
            </div>
          </div>

          <div className="participant">
            <div className="participant-avatar">B</div>
            <div className="participant-name">Bob</div>
            <div className="participant-balance">{bobBalance.toFixed(2)} BTC</div>
          </div>
        </div>

        <div className="payment-controls">
          <div className="payment-form">
            <div className="payment-input">
              <label>Amount (BTC)</label>
              <input 
                type="number" 
                step="0.01" 
                min="0.01" 
                max="1" 
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(e.target.value)}
              />
            </div>
            <div className="payment-input">
              <label>Direction</label>
              <select 
                value={paymentDirection}
                onChange={(e) => setPaymentDirection(e.target.value)}
              >
                <option value="alice-to-bob">Alice → Bob</option>
                <option value="bob-to-alice">Bob → Alice</option>
              </select>
            </div>
            <button className="payment-button" onClick={makePayment}>
              <Zap size={16} />
              Send Payment
            </button>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '2rem', padding: '1rem', background: 'rgba(252, 211, 77, 0.1)', borderRadius: '8px' }}>
          <p style={{ color: '#f1f5f9', marginBottom: '0.5rem' }}>
            ⚡ <strong>Instant Settlement:</strong> Payments update the channel balance immediately
          </p>
          <p style={{ color: '#cbd5e1', fontSize: '0.9rem' }}>
            No blockchain fees, no waiting for confirmations. Just instant value transfer!
          </p>
        </div>
      </div>

      <div className="step-completion">
        <div className="completion-icon">✓</div>
        <div className="completion-title">Hands-On Experience</div>
        <div className="completion-message">You've experienced Lightning payments firsthand!</div>
        <button className="continue-button" onClick={() => handleStepComplete(2)}>
          Learn Multi-Hop Routing <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );

  const renderMultiHopRouting = () => (
    <div className="step-container">
      <div className="step-header">
        <div className="step-icon">🌐</div>
        <div>
          <h2 className="step-title">Multi-Hop Routing</h2>
          <p className="step-subtitle">Payments through the Lightning Network</p>
        </div>
      </div>

      <div className="lightning-description">
        💡 You don't need a direct channel with everyone. Lightning Network routes payments through multiple hops, connecting the entire network.
      </div>

      <div className="network-graph">
        <h3 style={{ textAlign: 'center', marginBottom: '2rem' }}>Network Routing Example</h3>
        <div className="graph-canvas">
          {/* Simplified network visualization */}
          <div className="network-node source" style={{ top: '50%', left: '10%' }}>A</div>
          <div className="network-node" style={{ top: '20%', left: '35%' }}>B</div>
          <div className="network-node" style={{ top: '80%', left: '35%' }}>C</div>
          <div className="network-node" style={{ top: '50%', left: '65%' }}>D</div>
          <div className="network-node destination" style={{ top: '50%', left: '90%' }}>E</div>
          
          {/* Connections */}
          <div className="network-connection" style={{ 
            top: '50%', left: '15%', width: '20%', 
            transform: 'rotate(-15deg) translateY(-50%)'
          }} />
          <div className="network-connection" style={{ 
            top: '50%', left: '15%', width: '20%', 
            transform: 'rotate(15deg) translateY(-50%)'
          }} />
          <div className="network-connection active" style={{ 
            top: '35%', left: '40%', width: '20%', 
            transform: 'rotate(15deg) translateY(-50%)'
          }} />
          <div className="network-connection active" style={{ 
            top: '50%', left: '70%', width: '20%'
          }} />
        </div>
        
        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <p style={{ color: '#f1f5f9', marginBottom: '1rem' }}>
            <strong>Route:</strong> Alice → Bob → David → Eve
          </p>
          <p style={{ color: '#cbd5e1', fontSize: '0.9rem' }}>
            Payment finds the best path through available channels with sufficient liquidity
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', margin: '2rem 0' }}>
        <div style={{ background: 'rgba(96, 165, 250, 0.1)', padding: '1.5rem', borderRadius: '12px' }}>
          <h4 style={{ color: '#60a5fa', marginBottom: '1rem' }}>🔍 Path Finding</h4>
          <p>Lightning nodes automatically find the best route based on fees, liquidity, and reliability.</p>
        </div>
        <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '1.5rem', borderRadius: '12px' }}>
          <h4 style={{ color: '#10b981', marginBottom: '1rem' }}>🔐 Atomic Payments</h4>
          <p>Hash Time-Locked Contracts ensure payments either succeed completely or fail completely.</p>
        </div>
        <div style={{ background: 'rgba(252, 211, 77, 0.1)', padding: '1.5rem', borderRadius: '12px' }}>
          <h4 style={{ color: '#fcd34d', marginBottom: '1rem' }}>🕵️ Privacy</h4>
          <p>Intermediate nodes can't see payment details - only that they're forwarding encrypted data.</p>
        </div>
      </div>

      <div className="step-completion">
        <div className="completion-icon">✓</div>
        <div className="completion-title">Routing Master</div>
        <div className="completion-message">You understand how Lightning connects the world!</div>
        <button className="continue-button" onClick={() => handleStepComplete(3)}>
          Explore Network Topology <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );

  const renderNetworkTopology = () => (
    <div className="step-container">
      <div className="step-header">
        <div className="step-icon">🕸️</div>
        <div>
          <h2 className="step-title">Network Topology</h2>
          <p className="step-subtitle">The structure of Lightning Network</p>
        </div>
      </div>

      <div className="comparison-table">
        <div className="comparison-header">
          <h3 className="comparison-title">Lightning Network Stats (Current)</h3>
        </div>
        <div className="comparison-grid">
          <div className="comparison-item">
            <div className="comparison-label">Total Nodes</div>
            <div className="comparison-value lightning">15,000+</div>
            <div className="comparison-description">Distributed globally</div>
          </div>
          <div className="comparison-item">
            <div className="comparison-label">Payment Channels</div>
            <div className="comparison-value lightning">75,000+</div>
            <div className="comparison-description">Active connections</div>
          </div>
          <div className="comparison-item">
            <div className="comparison-label">Network Capacity</div>
            <div className="comparison-value lightning">5,000+ BTC</div>
            <div className="comparison-description">~$200M+ in channels</div>
          </div>
        </div>
      </div>

      <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '2rem', borderRadius: '12px', margin: '2rem 0' }}>
        <h3 style={{ color: '#f1f5f9', marginBottom: '1.5rem' }}>🌐 Network Properties</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <div>
            <strong style={{ color: '#fcd34d' }}>Small World Network:</strong>
            <p style={{ color: '#cbd5e1', fontSize: '0.9rem' }}>Most nodes connected within 2-3 hops</p>
          </div>
          <div>
            <strong style={{ color: '#fcd34d' }}>Hub Architecture:</strong>
            <p style={{ color: '#cbd5e1', fontSize: '0.9rem' }}>Large routing nodes provide connectivity</p>
          </div>
          <div>
            <strong style={{ color: '#fcd34d' }}>Redundant Paths:</strong>
            <p style={{ color: '#cbd5e1', fontSize: '0.9rem' }}>Multiple routes ensure reliability</p>
          </div>
          <div>
            <strong style={{ color: '#fcd34d' }}>Growing Network:</strong>
            <p style={{ color: '#cbd5e1', fontSize: '0.9rem' }}>Adding nodes increases connectivity exponentially</p>
          </div>
        </div>
      </div>

      <div className="step-completion">
        <div className="completion-icon">✓</div>
        <div className="completion-title">Network Understanding</div>
        <div className="completion-message">You grasp Lightning's global network structure!</div>
        <button className="continue-button" onClick={() => handleStepComplete(4)}>
          Learn Lightning Economics <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );

  const renderEconomics = () => (
    <div className="step-container">
      <div className="step-header">
        <div className="step-icon">💰</div>
        <div>
          <h2 className="step-title">Lightning Economics</h2>
          <p className="step-subtitle">Fees, liquidity, and economic incentives</p>
        </div>
      </div>

      <div className="comparison-table">
        <div className="comparison-header">
          <h3 className="comparison-title">Fee Comparison</h3>
        </div>
        <div className="comparison-grid">
          <div className="comparison-item">
            <div className="comparison-label">Bitcoin On-Chain</div>
            <div className="comparison-value onchain">$1-50+</div>
            <div className="comparison-description">Depends on network congestion</div>
          </div>
          <div className="comparison-item">
            <div className="comparison-label">Lightning Network</div>
            <div className="comparison-value lightning">$0.001-0.01</div>
            <div className="comparison-description">Fractions of pennies</div>
          </div>
          <div className="comparison-item">
            <div className="comparison-label">Traditional Banking</div>
            <div className="comparison-value traditional">2-3%</div>
            <div className="comparison-description">Plus fixed fees</div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', margin: '2rem 0' }}>
        <div style={{ background: 'rgba(252, 211, 77, 0.1)', padding: '1.5rem', borderRadius: '12px' }}>
          <h4 style={{ color: '#fcd34d', marginBottom: '1rem' }}>💧 Liquidity Management</h4>
          <ul style={{ color: '#f1f5f9', lineHeight: '1.6' }}>
            <li>Channels need adequate balance on both sides</li>
            <li>Routing nodes earn fees for providing liquidity</li>
            <li>Liquidity can be rebalanced through circular payments</li>
            <li>Submarine swaps connect on-chain and Lightning liquidity</li>
          </ul>
        </div>

        <div style={{ background: 'rgba(96, 165, 250, 0.1)', padding: '1.5rem', borderRadius: '12px' }}>
          <h4 style={{ color: '#60a5fa', marginBottom: '1rem' }}>🏪 Business Models</h4>
          <ul style={{ color: '#f1f5f9', lineHeight: '1.6' }}>
            <li><strong>Routing Fees:</strong> Earn by forwarding payments</li>
            <li><strong>Liquidity Services:</strong> Provide channel capacity</li>
            <li><strong>Lightning Service Providers:</strong> Managed node services</li>
            <li><strong>Payment Processors:</strong> Lightning-enabled commerce</li>
          </ul>
        </div>
      </div>

      <div className="step-completion">
        <div className="completion-icon">✓</div>
        <div className="completion-title">Economic Mastery</div>
        <div className="completion-message">You understand Lightning's economic incentives!</div>
        <button className="continue-button" onClick={() => handleStepComplete(5)}>
          See Real-World Usage <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );

  const renderRealWorld = () => (
    <div className="step-container">
      <div className="step-header">
        <div className="step-icon">🌍</div>
        <div>
          <h2 className="step-title">Lightning in the Real World</h2>
          <p className="step-subtitle">How Lightning is being used today</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem', margin: '2rem 0' }}>
        <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '2rem', borderRadius: '12px' }}>
          <h4 style={{ color: '#10b981', marginBottom: '1rem' }}>🏪 E-Commerce</h4>
          <ul style={{ color: '#f1f5f9', lineHeight: '1.6' }}>
            <li><strong>Bitrefill:</strong> Buy gift cards with Lightning</li>
            <li><strong>BTCPayServer:</strong> Lightning merchant payments</li>
            <li><strong>OpenNode:</strong> E-commerce payment processing</li>
            <li><strong>Shopify Apps:</strong> Lightning plugins for stores</li>
          </ul>
        </div>

        <div style={{ background: 'rgba(252, 211, 77, 0.1)', padding: '2rem', borderRadius: '12px' }}>
          <h4 style={{ color: '#fcd34d', marginBottom: '1rem' }}>📱 Mobile Apps</h4>
          <ul style={{ color: '#f1f5f9', lineHeight: '1.6' }}>
            <li><strong>Strike:</strong> Lightning-native payments</li>
            <li><strong>Cash App:</strong> Lightning integration</li>
            <li><strong>Phoenix:</strong> Non-custodial Lightning wallet</li>
            <li><strong>Breez:</strong> Lightning point-of-sale</li>
          </ul>
        </div>

        <div style={{ background: 'rgba(139, 92, 246, 0.1)', padding: '2rem', borderRadius: '12px' }}>
          <h4 style={{ color: '#8b5cf6', marginBottom: '1rem' }}>🎮 Gaming & Content</h4>
          <ul style={{ color: '#f1f5f9', lineHeight: '1.6' }}>
            <li><strong>Fountain:</strong> Lightning-powered podcasts</li>
            <li><strong>Stacker News:</strong> Lightning social media</li>
            <li><strong>THNDR Games:</strong> Lightning gaming rewards</li>
            <li><strong>Streaming Sats:</strong> Real-time micropayments</li>
          </ul>
        </div>

        <div style={{ background: 'rgba(236, 72, 153, 0.1)', padding: '2rem', borderRadius: '12px' }}>
          <h4 style={{ color: '#ec4899', marginBottom: '1rem' }}>🌍 Global Impact</h4>
          <ul style={{ color: '#f1f5f9', lineHeight: '1.6' }}>
            <li><strong>El Salvador:</strong> National Lightning adoption</li>
            <li><strong>Remittances:</strong> Instant global transfers</li>
            <li><strong>Financial Inclusion:</strong> Banking the unbanked</li>
            <li><strong>Micropayments:</strong> Enabling new business models</li>
          </ul>
        </div>
      </div>

      <div style={{ background: 'rgba(239, 68, 68, 0.1)', padding: '2rem', borderRadius: '12px', margin: '2rem 0' }}>
        <h4 style={{ color: '#ef4444', marginBottom: '1rem' }}>🚀 Growing Ecosystem</h4>
        <p style={{ color: '#f1f5f9', lineHeight: '1.6', marginBottom: '1rem' }}>
          Lightning Network is rapidly expanding with new applications launching monthly. From micropayments for content creators to instant cross-border remittances, Lightning is enabling use cases that were impossible with traditional Bitcoin or legacy payment systems.
        </p>
        <p style={{ color: '#cbd5e1', fontSize: '0.9rem' }}>
          The network effect is accelerating: more users → more liquidity → better routing → lower fees → more users.
        </p>
      </div>

      <div className="step-completion">
        <div className="completion-icon">✓</div>
        <div className="completion-title">Real-World Expert</div>
        <div className="completion-message">You know how Lightning is transforming payments today!</div>
        <button className="continue-button" onClick={() => handleStepComplete(6)}>
          Achieve Lightning Mastery <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );

  const renderMastery = () => (
    <div className="step-container">
      <div className="step-header">
        <div className="step-icon">🏆</div>
        <div>
          <h2 className="step-title">Lightning Network Mastery</h2>
          <p className="step-subtitle">Complete understanding achieved!</p>
        </div>
      </div>

      <div style={{ textAlign: 'center', padding: '3rem 2rem' }}>
        <div style={{ fontSize: '4rem', marginBottom: '2rem' }}>⚡</div>
        <h3 style={{ color: '#fcd34d', fontSize: '2rem', marginBottom: '1rem' }}>
          Lightning Master Achieved!
        </h3>
        <p style={{ color: '#f1f5f9', fontSize: '1.2rem', lineHeight: '1.6', marginBottom: '2rem' }}>
          You now understand Bitcoin's scaling solution that enables instant, cheap payments worldwide.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', margin: '2rem 0' }}>
          <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '1rem', borderRadius: '8px' }}>
            <div style={{ color: '#10b981', fontWeight: 'bold' }}>8 Concepts</div>
            <div style={{ color: '#cbd5e1', fontSize: '0.9rem' }}>Mastered</div>
          </div>
          <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '1rem', borderRadius: '8px' }}>
            <div style={{ color: '#10b981', fontWeight: 'bold' }}>Payment Channels</div>
            <div style={{ color: '#cbd5e1', fontSize: '0.9rem' }}>Understood</div>
          </div>
          <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '1rem', borderRadius: '8px' }}>
            <div style={{ color: '#10b981', fontWeight: 'bold' }}>Network Routing</div>
            <div style={{ color: '#cbd5e1', fontSize: '0.9rem' }}>Expert Level</div>
          </div>
          <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '1rem', borderRadius: '8px' }}>
            <div style={{ color: '#10b981', fontWeight: 'bold' }}>Real-World Apps</div>
            <div style={{ color: '#cbd5e1', fontSize: '0.9rem' }}>Ready to Use</div>
          </div>
        </div>

        <div style={{ background: 'rgba(252, 211, 77, 0.1)', padding: '2rem', borderRadius: '12px', margin: '2rem 0' }}>
          <h4 style={{ color: '#fcd34d', marginBottom: '1rem' }}>🎯 What You've Learned</h4>
          <ul style={{ color: '#f1f5f9', textAlign: 'left', lineHeight: '1.6' }}>
            <li>How payment channels enable instant Bitcoin transfers</li>
            <li>Multi-hop routing through the Lightning Network</li>
            <li>Network topology and economic incentives</li>
            <li>Real-world applications and growing ecosystem</li>
            <li>The technical security model of Lightning</li>
            <li>How Lightning scales Bitcoin globally</li>
          </ul>
        </div>

        <button 
          className="continue-button"
          onClick={() => handleStepComplete(7)}
          style={{ fontSize: '1.1rem', padding: '1rem 3rem' }}
        >
          <Trophy size={20} />
          Complete Lightning Mastery
        </button>
      </div>
    </div>
  );

  return (
    <div className="module-container lightning-module">
      <div className="lightning-content">
        <div className="lightning-header">
          <h1 className="lightning-title">Lightning Network</h1>
          <p className="lightning-subtitle">Instant Bitcoin Payments at the Speed of Light</p>
          <div className="lightning-description">
            Master Bitcoin's scaling solution that enables millions of transactions per second with instant confirmations and micropenny fees.
          </div>
          {isModuleCompleted('lightning') && (
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              gap: '0.5rem',
              marginTop: '1rem',
              color: '#10b981',
              fontWeight: 'bold'
            }}>
              <Trophy size={24} />
              <span>Lightning Master Achieved!</span>
            </div>
          )}
        </div>

        <div className="step-navigation">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`step-nav-item ${currentStep === index ? 'active' : ''} ${completedSteps.has(index) ? 'completed' : ''}`}
              onClick={() => setCurrentStep(index)}
            >
              <span>{step.icon}</span>
              <span>{step.title}</span>
            </div>
          ))}
        </div>

        {renderStep()}
      </div>
    </div>
  );
};

export default LightningModule; 