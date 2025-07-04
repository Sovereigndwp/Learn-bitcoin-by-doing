import React, { useState } from 'react';
import { useProgress } from '../contexts/ProgressContext';
import { 
  Trophy, CheckCircle, Hash, Key, Lock, Zap
} from 'lucide-react';
import '../components/ModuleCommon.css';
import './AdvancedTopicsModule.css';

const AdvancedTopicsModule = () => {
  const { completeModule, isModuleCompleted } = useProgress();
  const [currentTopic, setCurrentTopic] = useState(0);
  const [completedTopics, setCompletedTopics] = useState(new Set());
  const [demoOutput, setDemoOutput] = useState('');

  const topics = [
    {
      id: 'taproot',
      title: 'Taproot & Schnorr',
      icon: '🌳',
      description: 'Privacy-preserving smart contracts with signature aggregation',
      difficulty: 'Advanced'
    },
    {
      id: 'privacy',
      title: 'Privacy Techniques',
      icon: '🔒',
      description: 'CoinJoin, PayJoin, and advanced privacy methods',
      difficulty: 'Expert'
    },
    {
      id: 'layer2',
      title: 'Layer 2 Solutions',
      icon: '⚡',
      description: 'Sidechains, state channels, and scaling innovations',
      difficulty: 'Advanced'
    },
    {
      id: 'consensus',
      title: 'Consensus Mechanisms',
      icon: '🤝',
      description: 'Understanding Bitcoin\'s consensus rules and upgrades',
      difficulty: 'Expert'
    },
    {
      id: 'future',
      title: 'Future Developments',
      icon: '🚀',
      description: 'Upcoming Bitcoin innovations and research areas',
      difficulty: 'Research'
    },
    {
      id: 'mastery',
      title: 'Advanced Mastery',
      icon: '🏆',
      description: 'Complete understanding achievement',
      difficulty: 'Master'
    }
  ];

  const handleTopicComplete = (topicIndex) => {
    const newCompleted = new Set(completedTopics);
    newCompleted.add(topicIndex);
    setCompletedTopics(newCompleted);
    
    // Show achievements
    if (topicIndex === 0) {
      showAchievement("Taproot Pioneer", "You understand Bitcoin's privacy revolution!");
    } else if (topicIndex === 1) {
      showAchievement("Privacy Expert", "You've mastered advanced privacy techniques!");
    } else if (topicIndex === 2) {
      showAchievement("Layer 2 Architect", "You understand Bitcoin's scaling solutions!");
    } else if (topicIndex === 3) {
      showAchievement("Consensus Scholar", "You grasp Bitcoin's governance model!");
    } else if (topicIndex === 4) {
      showAchievement("Future Visionary", "You see Bitcoin's technological horizon!");
    } else if (topicIndex === 5) {
      showAchievement("Bitcoin Advanced Master", "Complete mastery of cutting-edge Bitcoin!");
      completeModule('advanced-topics');
    }
    
    if (topicIndex < topics.length - 1) {
      setTimeout(() => setCurrentTopic(topicIndex + 1), 1000);
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

  return (
    <div className="module-container advanced-module">
      <div className="advanced-content">
        <div className="advanced-header">
          <h1 className="advanced-title">Advanced Bitcoin Topics</h1>
          <p className="advanced-subtitle">Cutting-Edge Bitcoin Technology & Research</p>
          <div className="advanced-description">
            Explore the frontier of Bitcoin development: Taproot privacy, Schnorr signatures, Layer 2 scaling, and emerging innovations shaping Bitcoin's future.
          </div>
          {isModuleCompleted('advanced-topics') && (
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              gap: '0.5rem',
              marginTop: '1rem',
              color: '#8b5cf6',
              fontWeight: 'bold'
            }}>
              <Trophy size={24} />
              <span>Advanced Master Achieved!</span>
            </div>
          )}
        </div>

        <div className="topic-navigation">
          {topics.map((topic, index) => (
            <div
              key={topic.id}
              className={`topic-nav-card ${currentTopic === index ? 'active' : ''} ${completedTopics.has(index) ? 'completed' : ''}`}
              onClick={() => setCurrentTopic(index)}
            >
              <span className="topic-icon">{topic.icon}</span>
              <div className="topic-title">{topic.title}</div>
              <div className="topic-description">{topic.description}</div>
              <div style={{ 
                fontSize: '0.7rem', 
                color: '#6b7280', 
                marginTop: '0.5rem',
                fontWeight: 'bold'
              }}>
                {topic.difficulty}
              </div>
            </div>
          ))}
        </div>

        {renderCurrentTopic()}
      </div>
    </div>
  );

  function renderCurrentTopic() {
    const topic = topics[currentTopic];
    
    switch (topic.id) {
      case 'taproot':
        return renderTaprootTopic();
      case 'privacy':
        return renderPrivacyTopic();
      case 'layer2':
        return renderLayer2Topic();
      case 'consensus':
        return renderConsensusTopic();
      case 'future':
        return renderFutureTopic();
      case 'mastery':
        return renderMasteryTopic();
      default:
        return null;
    }
  }

  function renderTaprootTopic() {
    return (
      <div className="topic-container">
        <div className="topic-header">
          <div className="topic-header-icon">🌳</div>
          <div>
            <h2 className="topic-header-title">Taproot & Schnorr Signatures</h2>
            <p className="topic-header-subtitle">Bitcoin's privacy and efficiency revolution</p>
          </div>
        </div>

        <div className="advanced-description">
          💡 Taproot (activated November 2021) represents Bitcoin's most significant upgrade since SegWit, enabling complex smart contracts that look like simple payments.
        </div>

        <div className="signature-comparison">
          <div className="signature-type ecdsa">
            <div className="signature-header">
              <div className="signature-icon">📝</div>
              <div className="signature-title">ECDSA (Legacy)</div>
            </div>
            <ul className="signature-features">
              <li><span className="feature-icon good">✓</span> Battle-tested security</li>
              <li><span className="feature-icon good">✓</span> Widely supported</li>
              <li><span className="feature-icon">⚠</span> Larger signature size</li>
              <li><span className="feature-icon">⚠</span> No signature aggregation</li>
              <li><span className="feature-icon">⚠</span> Complex scripts are visible</li>
            </ul>
          </div>
          
          <div className="signature-type schnorr">
            <div className="signature-header">
              <div className="signature-icon">✨</div>
              <div className="signature-title">Schnorr (Taproot)</div>
            </div>
            <ul className="signature-features">
              <li><span className="feature-icon better">★</span> Smaller signatures</li>
              <li><span className="feature-icon better">★</span> Signature aggregation</li>
              <li><span className="feature-icon better">★</span> Perfect privacy</li>
              <li><span className="feature-icon better">★</span> Complex = Simple</li>
              <li><span className="feature-icon better">★</span> Lower fees</li>
            </ul>
          </div>
        </div>

        <div className="taproot-tree">
          <h3 style={{ textAlign: 'center', marginBottom: '2rem', color: '#f1f5f9' }}>
            Taproot Tree Structure
          </h3>
          <div className="tree-structure">
            <div className="tree-level">
              <div className="tree-node taproot-key">
                <div className="node-label">Taproot Output</div>
                <div className="node-content">32-byte key</div>
              </div>
            </div>
            <div className="tree-level">
              <div className="tree-node taproot-key">
                <div className="node-label">Key Path</div>
                <div className="node-content">Simple spend</div>
              </div>
              <div className="tree-node script-path">
                <div className="node-label">Script Path</div>
                <div className="node-content">Complex conditions</div>
              </div>
            </div>
            <div className="tree-level">
              <div className="tree-node script-path">
                <div className="node-label">Multisig 2-of-3</div>
                <div className="node-content">Script A</div>
              </div>
              <div className="tree-node script-path">
                <div className="node-label">Timelock + Key</div>
                <div className="node-content">Script B</div>
              </div>
              <div className="tree-node script-path">
                <div className="node-label">HTLCs</div>
                <div className="node-content">Script C</div>
              </div>
            </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: '2rem', color: '#cbd5e1' }}>
            <p><strong>Key Insight:</strong> Only the executed path is revealed on-chain. Unused scripts remain private forever.</p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', margin: '2rem 0' }}>
          <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '2rem', borderRadius: '12px' }}>
            <h4 style={{ color: '#10b981', marginBottom: '1rem' }}>🔒 Privacy Benefits</h4>
            <ul style={{ color: '#f1f5f9', lineHeight: '1.6' }}>
              <li>All spends look identical on-chain</li>
              <li>Complex scripts hidden until used</li>
              <li>Multisig indistinguishable from single-sig</li>
              <li>Lightning channels gain perfect privacy</li>
            </ul>
          </div>

          <div style={{ background: 'rgba(139, 92, 246, 0.1)', padding: '2rem', borderRadius: '12px' }}>
            <h4 style={{ color: '#8b5cf6', marginBottom: '1rem' }}>⚡ Efficiency Gains</h4>
            <ul style={{ color: '#f1f5f9', lineHeight: '1.6' }}>
              <li>~10-15% smaller transaction sizes</li>
              <li>Signature aggregation saves space</li>
              <li>Lower fees for complex scripts</li>
              <li>Batch verification speedup</li>
            </ul>
          </div>

          <div style={{ background: 'rgba(245, 158, 11, 0.1)', padding: '2rem', borderRadius: '12px' }}>
            <h4 style={{ color: '#f59e0b', marginBottom: '1rem' }}>🚀 Smart Contract Power</h4>
            <ul style={{ color: '#f1f5f9', lineHeight: '1.6' }}>
              <li>Complex conditions without revealing them</li>
              <li>Threshold signatures with privacy</li>
              <li>Time-locked inheritance planning</li>
              <li>Advanced Lightning Network features</li>
            </ul>
          </div>
        </div>

        <div className="demo-playground">
          <h4 style={{ color: '#f1f5f9', marginBottom: '1rem' }}>🧪 Taproot Demo</h4>
          <div className="demo-controls">
            <button 
              className="demo-button"
              onClick={() => setDemoOutput(`Taproot Address Generation:
bc1p5d7rjq7g6rdk2yhzks9smlaqtedr4dekq08ge8ztwac72sfr9rusxg3297

This address could hide:
• A simple single signature spend
• A 2-of-3 multisig requirement  
• A timelock + backup key
• Complex Lightning Network scripts

From the outside, they ALL look identical! 🎭`)}
            >
              <Key size={16} />
              Generate Taproot Address
            </button>
            <button 
              className="demo-button"
              onClick={() => setDemoOutput(`Schnorr Signature Aggregation Demo:

Individual signatures:
Alice: 64 bytes
Bob:   64 bytes  
Carol: 64 bytes
Total: 192 bytes

Aggregated signature:
Combined: 64 bytes
Savings: 67% smaller! ⚡

This is revolutionary for multisig and Lightning Network efficiency.`)}
            >
              <Zap size={16} />
              Signature Aggregation
            </button>
          </div>
          {demoOutput && (
            <div className="demo-output">{demoOutput}</div>
          )}
        </div>

        <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '2rem', borderRadius: '12px', margin: '2rem 0', textAlign: 'center' }}>
          <h4 style={{ color: '#10b981', marginBottom: '1rem' }}>🎯 Real-World Impact</h4>
          <p style={{ color: '#f1f5f9', lineHeight: '1.6' }}>
            Taproot enables privacy-preserving smart contracts that are indistinguishable from simple payments. 
            This is crucial for Bitcoin's future as a global settlement layer while protecting user privacy.
          </p>
        </div>

        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <button 
            onClick={() => handleTopicComplete(0)}
            style={{
              background: 'linear-gradient(135deg, #10b981, #059669)',
              color: '#fff',
              border: 'none',
              padding: '1rem 2rem',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <CheckCircle size={16} />
            Master Taproot & Schnorr
          </button>
        </div>
      </div>
    );
  }

  function renderPrivacyTopic() {
    return (
      <div className="topic-container">
        <div className="topic-header">
          <div className="topic-header-icon">🔒</div>
          <div>
            <h2 className="topic-header-title">Advanced Privacy Techniques</h2>
            <p className="topic-header-subtitle">Protecting your financial sovereignty</p>
          </div>
        </div>
        {/* Content will be added */}
      </div>
    );
  }

  function renderLayer2Topic() {
    return (
      <div className="topic-container">
        <div className="topic-header">
          <div className="topic-header-icon">⚡</div>
          <div>
            <h2 className="topic-header-title">Layer 2 Solutions</h2>
            <p className="topic-header-subtitle">Scaling Bitcoin beyond base layer</p>
          </div>
        </div>
        {/* Content will be added */}
      </div>
    );
  }

  function renderConsensusTopic() {
    return (
      <div className="topic-container">
        <div className="topic-header">
          <div className="topic-header-icon">🤝</div>
          <div>
            <h2 className="topic-header-title">Consensus Mechanisms</h2>
            <p className="topic-header-subtitle">How Bitcoin upgrades and evolves</p>
          </div>
        </div>
        {/* Content will be added */}
      </div>
    );
  }

  function renderFutureTopic() {
    return (
      <div className="topic-container">
        <div className="topic-header">
          <div className="topic-header-icon">🚀</div>
          <div>
            <h2 className="topic-header-title">Future Developments</h2>
            <p className="topic-header-subtitle">Bitcoin's technological horizon</p>
          </div>
        </div>
        {/* Content will be added */}
      </div>
    );
  }

  function renderMasteryTopic() {
    return (
      <div className="mastery-achievement">
        <div className="mastery-icon">🏆</div>
        <h2 className="mastery-title">Advanced Bitcoin Master</h2>
        <p className="mastery-description">
          You've mastered cutting-edge Bitcoin technology and understand the innovations shaping Bitcoin's future.
        </p>
        <button 
          className="mastery-button"
          onClick={() => handleTopicComplete(5)}
        >
          <Trophy size={20} />
          Complete Advanced Mastery
        </button>
      </div>
    );
  }
};

export default AdvancedTopicsModule; 