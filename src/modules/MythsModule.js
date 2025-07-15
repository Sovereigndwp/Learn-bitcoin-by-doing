import React, { useState, useEffect } from 'react';
import { useProgress } from '../contexts/ProgressContext';
import { 
  Shield, AlertTriangle, Target, Zap, Crown, 
  Search, Database, Sword, Building, Network, CheckCircle,
  TrendingUp, Activity, Award, Star, Lock
} from 'lucide-react';
import '../components/ModuleCommon.css';
import './MythsModule.css';

const MythsModule = () => {
  const { completeModule } = useProgress();
  
  // Core State Management
  const [currentPhase, setCurrentPhase] = useState('detective');
  const [truthDefenderLevel, setTruthDefenderLevel] = useState(1);
  const [mythsBusted, setMythsBusted] = useState(new Set());
  const [evidenceCollected, setEvidenceCollected] = useState(new Set());
  const [crisisAlerts, setCrisisAlerts] = useState([]);
  const [truthNetworkStrength, setTruthNetworkStrength] = useState(0);
  const [selectedMyth, setSelectedMyth] = useState(null);
  const [misinformationLevel, setMisinformationLevel] = useState(85);
  const [truthImpactScore, setTruthImpactScore] = useState(0);

  // Crisis-Driven Phase System
  const phases = {
    detective: {
      title: 'Misinformation Crisis Detective',
      icon: Search,
      description: 'Discover how Bitcoin misinformation spreads and damages adoption',
      color: '#f7931a',
      unlocked: true,
      crisisContext: 'Bitcoin misinformation is spreading faster than truth. The future of financial freedom depends on your ability to detect and counter these myths.',
      tools: ['Misinformation Tracker', 'FUD Impact Analyzer', 'Source Credibility Scanner'],
      stakes: 'Every unchecked myth delays Bitcoin adoption by millions of people',
      empowerment: 'Master the patterns of misinformation warfare'
    },
    arsenal: {
      title: 'Evidence Arsenal Builder',
      icon: Database,
      description: 'Gather bulletproof evidence to counter each myth category',
      color: '#ff6b35',
      unlocked: false,
      crisisContext: 'Misinformation thrives in evidence vacuums. Build an unbreakable arsenal of verified facts.',
      tools: ['Evidence Verification Lab', 'Source Credibility Checker', 'Data Integrity Scanner'],
      stakes: 'Without solid evidence, truth defenders lose credibility in the information war',
      empowerment: 'Become an unstoppable force of factual accuracy'
    },
    warrior: {
      title: 'Technical Truth Warrior',
      icon: Sword,
      description: 'Engage in real-time myth-busting scenarios with escalating difficulty',
      color: '#e74c3c',
      unlocked: false,
      crisisContext: 'The misinformation war is escalating. Deploy your evidence arsenal in high-stakes truth battles.',
      tools: ['Myth Combat Simulator', 'Argument Effectiveness Meter', 'Truth Response Timer'],
      stakes: 'Each failed myth-bust strengthens the misinformation network',
      empowerment: 'Develop lightning-fast truth response capabilities'
    },
    architect: {
      title: 'Narrative Architect',
      icon: Building,
      description: 'Counter narrative warfare with compelling truth stories',
      color: '#9b59b6',
      unlocked: false,
      crisisContext: 'Misinformation spreads through compelling narratives. Counter with even more powerful truth stories.',
      tools: ['Story Impact Analyzer', 'Narrative Effectiveness Dashboard', 'Persuasion Optimizer'],
      stakes: 'Losing the narrative war means losing the information war',
      empowerment: 'Master the psychology of persuasive truth-telling'
    },
    commander: {
      title: 'Truth Network Commander',
      icon: Network,
      description: 'Coordinate global truth defense against coordinated misinformation',
      color: '#3498db',
      unlocked: false,
      crisisContext: 'Misinformation operates as a coordinated network. Build and command your own truth network.',
      tools: ['Global Truth Network', 'Influence Amplification System', 'Coordination Command Center'],
      stakes: 'Uncoordinated truth defenders are overwhelmed by organized misinformation',
      empowerment: 'Command a global network of truth defenders'
    },
    sovereign: {
      title: 'Bitcoin Truth Sovereign',
      icon: Crown,
      description: 'Achieve complete mastery over Bitcoin truth defense',
      color: '#f39c12',
      unlocked: false,
      crisisContext: 'You have transcended from defender to sovereign. The truth network bows to your authority.',
      tools: ['Truth Sovereignty Dashboard', 'Legacy Impact Tracker', 'Sovereign Authority Matrix'],
      stakes: 'The entire Bitcoin truth ecosystem depends on your sovereign leadership',
      empowerment: 'Become the ultimate authority on Bitcoin truth'
    }
  };

  // Crisis-Driven Myth Database
  const bitcoinMyths = [
    {
      id: 'energy-waste',
      category: 'energy',
      title: 'Bitcoin Wastes Energy',
      severity: 'Critical Crisis',
      icon: '⚡',
      crisisLevel: 95,
      misinformationSources: ['Mainstream Media', 'Environmental Groups', 'Central Banks'],
      myth: 'Bitcoin mining wastes enormous amounts of energy and is destroying the environment',
      truthWeapons: [
        'Bitcoin mining is 56% renewable energy powered',
        'Traditional banking uses 2.5x more energy than Bitcoin',
        'Bitcoin incentivizes renewable energy development',
        'Mining utilizes stranded energy that would be wasted',
        'Bitcoin mining stabilizes electrical grids'
      ],
      evidenceStrength: 98,
      counterNarratives: [
        'Bitcoin is the biggest driver of renewable energy development',
        'Bitcoin mining creates economic incentives for clean energy',
        'Bitcoin secures $800B+ with mathematical certainty'
      ],
      realWorldImpact: 'Energy myth delays institutional adoption by 2-3 years',
      truthDefenderResponse: 'Deploy renewable energy data and banking comparison statistics',
      difficultyLevel: 'Expert',
      stakesDescription: 'This myth single-handedly blocks major institutional adoption'
    },
    {
      id: 'bitcoin-hacked',
      category: 'security',
      title: 'Bitcoin Gets Hacked Constantly',
      severity: 'Extreme Crisis',
      icon: '🛡️',
      crisisLevel: 90,
      misinformationSources: ['Tech Media', 'Traditional Finance', 'Government Officials'],
      myth: 'Bitcoin is constantly being hacked and isn\'t secure',
      truthWeapons: [
        'Bitcoin network has never been hacked in 15+ years',
        'SHA-256 would take longer than age of universe to break',
        'Network secured by 450+ exahashes of power',
        'Exchange hacks ≠ Bitcoin protocol hacks',
        '99.98% uptime since 2009'
      ],
      evidenceStrength: 100,
      counterNarratives: [
        'Bitcoin is the most secure computer network ever created',
        'Exchange security failures are not Bitcoin failures',
        'Bitcoin\'s security increases with every block'
      ],
      realWorldImpact: 'Security myth prevents $100B+ in institutional investment',
      truthDefenderResponse: 'Distinguish between protocol security and exchange security',
      difficultyLevel: 'Advanced',
      stakesDescription: 'Security fears are the #1 barrier to mass adoption'
    },
    {
      id: 'no-intrinsic-value',
      category: 'economics',
      title: 'Bitcoin Has No Intrinsic Value',
      severity: 'Economic Crisis',
      icon: '💎',
      crisisLevel: 85,
      misinformationSources: ['Economists', 'Central Banks', 'Gold Bugs'],
      myth: 'Bitcoin has no intrinsic value because it\'s not backed by anything',
      truthWeapons: [
        'Bitcoin is backed by mathematics and energy',
        'Scarcity enforced by code, not politics',
        'Network effects create utility value',
        'Gold has no intrinsic value either',
        'Dollar has no backing since 1971'
      ],
      evidenceStrength: 92,
      counterNarratives: [
        'Bitcoin is the first money backed by physics',
        'Mathematical scarcity is superior to political promises',
        'Network effects create exponential value'
      ],
      realWorldImpact: 'Value myth prevents retail adoption and savings allocation',
      truthDefenderResponse: 'Explain mathematical backing vs. political backing',
      difficultyLevel: 'Intermediate',
      stakesDescription: 'Value confusion keeps billions in depreciating fiat'
    },
    {
      id: 'too-slow',
      category: 'technology',
      title: 'Bitcoin Is Too Slow',
      severity: 'Technical Crisis',
      icon: '⚙️',
      crisisLevel: 80,
      misinformationSources: ['Tech Companies', 'Altcoin Promoters', 'Payment Processors'],
      myth: 'Bitcoin is too slow for real payments and commerce',
      truthWeapons: [
        'Bitcoin processes $50B+ daily in final settlement',
        'Lightning Network enables instant payments',
        'Base layer optimized for security, not speed',
        'Traditional banking takes 3-5 days to settle',
        'Bitcoin settles globally in 10 minutes'
      ],
      evidenceStrength: 94,
      counterNarratives: [
        'Bitcoin is the fastest final settlement system ever created',
        'Lightning Network solves payment speed completely',
        'Security is more important than speed for money'
      ],
      realWorldImpact: 'Speed myth drives users to centralized altcoins',
      truthDefenderResponse: 'Distinguish between settlement and payment layers',
      difficultyLevel: 'Advanced',
      stakesDescription: 'Speed confusion diverts users to inferior alternatives'
    },
    {
      id: 'ponzi-scheme',
      category: 'economics',
      title: 'Bitcoin Is a Ponzi Scheme',
      severity: 'Extreme Crisis',
      icon: '🎪',
      crisisLevel: 88,
      misinformationSources: ['Regulators', 'Traditional Finance', 'Skeptical Media'],
      myth: 'Bitcoin is a Ponzi scheme where early adopters exploit later ones',
      truthWeapons: [
        'No central authority or promised returns',
        'All code is open-source and auditable',
        'No recruiting or pyramid structure',
        'Value from utility and scarcity, not new money',
        'Survived multiple bear markets'
      ],
      evidenceStrength: 96,
      counterNarratives: [
        'Bitcoin is transparent, Ponzis are opaque',
        'No one controls Bitcoin or promises returns',
        'Open-source code prevents hidden operations'
      ],
      realWorldImpact: 'Ponzi myth triggers regulatory crackdowns',
      truthDefenderResponse: 'Compare Bitcoin characteristics to actual Ponzi schemes',
      difficultyLevel: 'Expert',
      stakesDescription: 'Ponzi accusations fuel regulatory hostility'
    },
    {
      id: 'tulip-mania',
      category: 'economics',
      title: 'Bitcoin Is Like Tulip Mania',
      severity: 'Historical Crisis',
      icon: '🌷',
      crisisLevel: 75,
      misinformationSources: ['Financial Historians', 'Bubble Experts', 'Skeptical Investors'],
      myth: 'Bitcoin is a speculative bubble like tulip mania',
      truthWeapons: [
        'Bitcoin survived multiple 80%+ crashes',
        'Tulips could be grown infinitely, Bitcoin capped at 21M',
        'Global adoption vs. localized speculation',
        'Growing institutional adoption',
        'Network effects increase with each cycle'
      ],
      evidenceStrength: 89,
      counterNarratives: [
        'Bitcoin is technology adoption, not speculation',
        'Mathematical scarcity prevents tulip-like inflation',
        'Global utility vs. local speculation'
      ],
      realWorldImpact: 'Bubble myth prevents long-term investment',
      truthDefenderResponse: 'Compare technology adoption curves to speculation bubbles',
      difficultyLevel: 'Intermediate',
      stakesDescription: 'Bubble fears prevent strategic accumulation'
    },
    {
      id: 'government-shutdown',
      category: 'security',
      title: 'Governments Can Shut Down Bitcoin',
      severity: 'Political Crisis',
      icon: '🏛️',
      crisisLevel: 82,
      misinformationSources: ['Government Officials', 'Regulatory Bodies', 'Compliance Experts'],
      myth: 'Governments can ban Bitcoin and shut down the network',
      truthWeapons: [
        '15,000+ nodes across 100+ countries',
        'China mining ban failed to stop Bitcoin',
        'Banning Bitcoin is like banning mathematics',
        'Can ban exchanges, not the protocol',
        'Each ban increases adoption elsewhere'
      ],
      evidenceStrength: 91,
      counterNarratives: [
        'Bitcoin is unstoppable by design',
        'Decentralization makes shutdown impossible',
        'Bans create Streisand effect'
      ],
      realWorldImpact: 'Government fear prevents corporate adoption',
      truthDefenderResponse: 'Explain decentralization and historical ban failures',
      difficultyLevel: 'Advanced',
      stakesDescription: 'Government fear creates regulatory uncertainty'
    },
    {
      id: 'quantum-threat',
      category: 'security',
      title: 'Quantum Computers Will Break Bitcoin',
      severity: 'Future Crisis',
      icon: '🔬',
      crisisLevel: 70,
      misinformationSources: ['Quantum Researchers', 'Tech Media', 'Crypto Skeptics'],
      myth: 'Quantum computers will break Bitcoin\'s encryption',
      truthWeapons: [
        'Need 4,000+ logical qubits (current: ~100)',
        'Bitcoin can upgrade to quantum-resistant crypto',
        'All digital infrastructure faces same threat',
        'Quantum-resistant proposals already exist',
        'Upgrade timeline faster than quantum threat'
      ],
      evidenceStrength: 87,
      counterNarratives: [
        'Bitcoin will upgrade before quantum threat materializes',
        'Quantum threat is decades away',
        'Cryptographic community is prepared'
      ],
      realWorldImpact: 'Quantum fear prevents long-term planning',
      truthDefenderResponse: 'Explain upgrade capability and timeline reality',
      difficultyLevel: 'Expert',
      stakesDescription: 'Quantum fears create false urgency'
    },
    {
      id: 'environment-harm',
      category: 'energy',
      title: 'Bitcoin Harms the Environment',
      severity: 'Environmental Crisis',
      icon: '🌍',
      crisisLevel: 93,
      misinformationSources: ['Environmental Groups', 'Climate Activists', 'Green Politicians'],
      myth: 'Bitcoin mining creates massive environmental destruction',
      truthWeapons: [
        'Bitcoin mining emissions fell 30% from 2021-2023',
        '70% of operations plan carbon neutrality by 2030',
        'Enables remote renewable energy projects',
        'Proof-of-Stake has hidden environmental costs',
        'Incentivizes energy efficiency improvements'
      ],
      evidenceStrength: 95,
      counterNarratives: [
        'Bitcoin is an environmental solution, not problem',
        'Bitcoin monetizes renewable energy globally',
        'Environmental benefits outweigh costs'
      ],
      realWorldImpact: 'Environmental myth blocks ESG investment',
      truthDefenderResponse: 'Present renewable energy data and efficiency improvements',
      difficultyLevel: 'Expert',
      stakesDescription: 'Environmental concerns block sustainable investment'
    },
    {
      id: 'pos-better',
      category: 'energy',
      title: 'Proof-of-Stake Is Better',
      severity: 'Technical Crisis',
      icon: '🔋',
      crisisLevel: 78,
      misinformationSources: ['Altcoin Promoters', 'Ethereum Foundation', 'Efficiency Advocates'],
      myth: 'Proof-of-Stake is better for the environment than Bitcoin',
      truthWeapons: [
        'PoS has hidden cloud infrastructure costs',
        'PoS enables wealth concentration',
        'PoS lacks objective cost to create money',
        'Bitcoin energy secures $800B+ with certainty',
        'PoS lacks Bitcoin\'s security track record'
      ],
      evidenceStrength: 90,
      counterNarratives: [
        'Proof-of-Work anchors consensus to physical reality',
        'Energy use is a feature, not a bug',
        'Security requires energy expenditure'
      ],
      realWorldImpact: 'PoS myth drives investment to inferior alternatives',
      truthDefenderResponse: 'Explain security trade-offs and hidden costs',
      difficultyLevel: 'Advanced',
      stakesDescription: 'PoS confusion diverts capital to weaker systems'
    },
    {
      id: 'outdated-technology',
      category: 'technology',
      title: 'Bitcoin Uses Outdated Technology',
      severity: 'Innovation Crisis',
      icon: '📟',
      crisisLevel: 73,
      misinformationSources: ['Tech Companies', 'Blockchain Developers', 'Innovation Experts'],
      myth: 'Bitcoin is old technology that can\'t compete with newer chains',
      truthWeapons: [
        'Bitcoin has strongest network effects (Lindy Effect)',
        'Newer chains sacrifice decentralization for speed',
        'Bitcoin receives continuous upgrades',
        'Faster chains are centralized databases',
        'Security > speed for money'
      ],
      evidenceStrength: 88,
      counterNarratives: [
        'Bitcoin is mature technology, not obsolete',
        'First-mover advantage in decentralized money',
        'Continuous improvement without breaking changes'
      ],
      realWorldImpact: 'Technology myth drives users to centralized alternatives',
      truthDefenderResponse: 'Explain maturity vs. obsolescence and upgrade capability',
      difficultyLevel: 'Advanced',
      stakesDescription: 'Technology confusion leads to inferior choices'
    },
    {
      id: 'replace-dollar',
      category: 'technology',
      title: 'Bitcoin Will Replace the Dollar',
      severity: 'Maximalist Myth',
      icon: '🔄',
      crisisLevel: 65,
      misinformationSources: ['Bitcoin Maximalists', 'Crypto Enthusiasts', 'Libertarian Groups'],
      myth: 'Bitcoin will completely replace the US dollar',
      truthWeapons: [
        'Bitcoin better as store of value than medium of exchange',
        'Governments won\'t give up monetary control',
        'Bitcoin becoming digital gold',
        'CBDCs likely for retail transactions',
        'Multi-monetary system more probable'
      ],
      evidenceStrength: 85,
      counterNarratives: [
        'Bitcoin doesn\'t need to replace dollar to succeed',
        'Parallel monetary system more likely',
        'Different monies serve different functions'
      ],
      realWorldImpact: 'Replacement myth creates unrealistic expectations',
      truthDefenderResponse: 'Explain coexistence vs. replacement scenarios',
      difficultyLevel: 'Intermediate',
      stakesDescription: 'Unrealistic expectations lead to disappointment'
    }
  ];

  // Crisis Alert System
  useEffect(() => {
    const generateCrisisAlert = () => {
      const alerts = [
        { type: 'urgent', message: 'Major news outlet spreading energy waste myth', impact: 'high' },
        { type: 'critical', message: 'Government official claims Bitcoin can be shut down', impact: 'extreme' },
        { type: 'warning', message: 'Social media amplifying Ponzi scheme narrative', impact: 'medium' },
        { type: 'alert', message: 'Institutional investor citing security concerns', impact: 'high' }
      ];
      
      const randomAlert = alerts[Math.floor(Math.random() * alerts.length)];
      setCrisisAlerts(prev => [...prev.slice(-2), { ...randomAlert, id: Date.now() }]);
    };

    const interval = setInterval(generateCrisisAlert, 8000);
    return () => clearInterval(interval);
  }, []);

  // Phase Progression Logic
  const checkPhaseUnlock = () => {
    const bustedCount = mythsBusted.size;
    const evidenceCount = evidenceCollected.size;
    
    if (bustedCount >= 2 && !phases.arsenal.unlocked) {
      phases.arsenal.unlocked = true;
      showAchievement('Evidence Arsenal Unlocked', 'Your detective work has unlocked the Evidence Arsenal Builder phase!');
    }
    if (bustedCount >= 4 && evidenceCount >= 6 && !phases.warrior.unlocked) {
      phases.warrior.unlocked = true;
      showAchievement('Truth Warrior Unlocked', 'Your evidence arsenal has unlocked the Technical Truth Warrior phase!');
    }
    if (bustedCount >= 6 && !phases.architect.unlocked) {
      phases.architect.unlocked = true;
      showAchievement('Narrative Architect Unlocked', 'Your warrior skills have unlocked the Narrative Architect phase!');
    }
    if (bustedCount >= 8 && !phases.commander.unlocked) {
      phases.commander.unlocked = true;
      showAchievement('Network Commander Unlocked', 'Your narrative mastery has unlocked the Truth Network Commander phase!');
    }
    if (bustedCount >= 10 && !phases.sovereign.unlocked) {
      phases.sovereign.unlocked = true;
      showAchievement('Truth Sovereign Unlocked', 'Your command abilities have unlocked the Bitcoin Truth Sovereign phase!');
    }
    if (bustedCount >= 12) {
      completeModule('myths');
      showSovereigntyAchievement();
    }
  };

  // Achievement System
  const showAchievement = (title, description) => {
    const achievement = document.createElement('div');
    achievement.className = 'crisis-achievement-popup';
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
        if (document.body.contains(achievement)) {
        document.body.removeChild(achievement);
        }
      }, 300);
    }, 4000);
  };

  const showSovereigntyAchievement = () => {
    const sovereignty = document.createElement('div');
    sovereignty.className = 'sovereignty-celebration';
    sovereignty.innerHTML = `
      <div class="sovereignty-content">
        <div class="crown-glow">👑</div>
        <h2>BITCOIN TRUTH SOVEREIGN</h2>
        <p>You have achieved complete mastery over Bitcoin truth defense!</p>
        <div class="sovereignty-stats">
          <div>12/12 Myths Busted</div>
          <div>Truth Network: ${truthNetworkStrength}%</div>
          <div>Impact Score: ${truthImpactScore}</div>
        </div>
      </div>
    `;
    document.body.appendChild(sovereignty);
    
    setTimeout(() => {
      sovereignty.style.opacity = '0';
      setTimeout(() => {
        if (document.body.contains(sovereignty)) {
          document.body.removeChild(sovereignty);
        }
      }, 500);
    }, 6000);
  };

  // Crisis Response Actions
  const handleMythBust = (mythId) => {
    const newBusted = new Set(mythsBusted);
    newBusted.add(mythId);
    setMythsBusted(newBusted);
    
    // Update crisis metrics
    setMisinformationLevel(prev => Math.max(0, prev - 7));
    setTruthImpactScore(prev => prev + 150);
    setTruthNetworkStrength(prev => Math.min(100, prev + 8));
    
    // Level progression
    if (newBusted.size % 3 === 0) {
      setTruthDefenderLevel(prev => prev + 1);
    }
    
    checkPhaseUnlock();
  };

  const handleEvidenceCollection = (evidenceId) => {
    const newEvidence = new Set(evidenceCollected);
    newEvidence.add(evidenceId);
    setEvidenceCollected(newEvidence);
    
    setTruthImpactScore(prev => prev + 50);
    checkPhaseUnlock();
  };

  const handlePhaseTransition = (newPhase) => {
    if (phases[newPhase].unlocked) {
      setCurrentPhase(newPhase);
      setSelectedMyth(null);
    }
  };

  const renderCrisisHeader = () => (
    <div className="crisis-header">
      <div className="crisis-title-section">
        <h1 className="crisis-title">
          <Shield className="crisis-shield" />
          Bitcoin Truth Defense Network
        </h1>
        <div className="crisis-subtitle">
          Misinformation Crisis Response System
        </div>
      </div>
      
      <div className="crisis-metrics">
        <div className="metric-card crisis-level">
          <AlertTriangle className="metric-icon" />
          <div className="metric-content">
            <div className="metric-value">{misinformationLevel}%</div>
            <div className="metric-label">Misinformation Level</div>
          </div>
        </div>
        <div className="metric-card truth-impact">
          <TrendingUp className="metric-icon" />
          <div className="metric-content">
            <div className="metric-value">{truthImpactScore.toLocaleString()}</div>
            <div className="metric-label">Truth Impact Score</div>
          </div>
        </div>
        <div className="metric-card network-strength">
          <Network className="metric-icon" />
          <div className="metric-content">
            <div className="metric-value">{truthNetworkStrength}%</div>
            <div className="metric-label">Network Strength</div>
          </div>
        </div>
        <div className="metric-card defender-level">
          <Award className="metric-icon" />
          <div className="metric-content">
            <div className="metric-value">L{truthDefenderLevel}</div>
            <div className="metric-label">Defender Level</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCrisisAlerts = () => (
    <div className="crisis-alerts">
      <div className="alerts-header">
        <Activity className="alerts-icon" />
        <span>Live Crisis Alerts</span>
      </div>
      <div className="alerts-feed">
        {crisisAlerts.map(alert => (
          <div key={alert.id} className={`alert-item ${alert.type}`}>
            <div className="alert-indicator" />
            <div className="alert-content">
              <div className="alert-message">{alert.message}</div>
              <div className="alert-impact">Impact: {alert.impact}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPhaseNavigation = () => (
    <div className="phase-navigation">
      <div className="phase-header">
        <Target className="phase-icon" />
        <span>Truth Defense Phases</span>
      </div>
      <div className="phase-grid">
        {Object.entries(phases).map(([key, phase]) => {
          const IconComponent = phase.icon;
          return (
            <div 
              key={key}
              className={`phase-card ${currentPhase === key ? 'active' : ''} ${phase.unlocked ? 'unlocked' : 'locked'}`}
              onClick={() => handlePhaseTransition(key)}
            >
              <div className="phase-icon-container" style={{ color: phase.color }}>
                <IconComponent className="phase-card-icon" />
                {!phase.unlocked && <Lock className="lock-overlay" />}
              </div>
              <div className="phase-info">
                <div className="phase-title">{phase.title}</div>
                <div className="phase-description">{phase.description}</div>
              </div>
              {phase.unlocked && currentPhase === key && (
                <div className="phase-active-indicator" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderCurrentPhase = () => {
    const phase = phases[currentPhase];
    const IconComponent = phase.icon;
    
    return (
      <div className="current-phase">
        <div className="phase-context">
          <div className="phase-context-header">
            <IconComponent className="context-icon" style={{ color: phase.color }} />
            <div className="context-title">{phase.title}</div>
          </div>
          <div className="crisis-context">{phase.crisisContext}</div>
          <div className="phase-tools">
            <div className="tools-header">Available Tools:</div>
            <div className="tools-list">
              {phase.tools.map(tool => (
                <div key={tool} className="tool-item">
                  <Zap className="tool-icon" />
                  <span>{tool}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="phase-stakes">
            <div className="stakes-header">Stakes:</div>
            <div className="stakes-content">{phase.stakes}</div>
          </div>
          <div className="phase-empowerment">
            <div className="empowerment-header">Empowerment:</div>
            <div className="empowerment-content">{phase.empowerment}</div>
          </div>
        </div>
        
        {renderMythBattleground()}
      </div>
    );
  };

  const renderMythBattleground = () => (
    <div className="myth-battleground">
      <div className="battleground-header">
        <Sword className="battleground-icon" />
        <span>Active Myth Battleground</span>
        <div className="battleground-stats">
          <span>{mythsBusted.size}/12 Myths Busted</span>
          <span>{evidenceCollected.size}/36 Evidence Collected</span>
        </div>
      </div>
      
      <div className="myths-grid">
        {bitcoinMyths.map(myth => renderMythCard(myth))}
      </div>
    </div>
  );

  const renderMythCard = (myth) => {
    const isBusted = mythsBusted.has(myth.id);
    const isActive = selectedMyth === myth.id;

    return (
            <div 
              key={myth.id}
        className={`myth-card ${isActive ? 'active' : ''} ${isBusted ? 'busted' : ''}`}
        onClick={() => setSelectedMyth(isActive ? null : myth.id)}
            >
        <div className="myth-card-header">
          <div className="myth-icon">{myth.icon}</div>
          <div className="myth-info">
            <div className="myth-title">{myth.title}</div>
            <div className="myth-severity">{myth.severity}</div>
          </div>
          <div className="crisis-level">
            <div className="crisis-meter">
              <div 
                className="crisis-fill" 
                style={{ width: `${myth.crisisLevel}%` }}
              />
            </div>
            <div className="crisis-percentage">{myth.crisisLevel}%</div>
          </div>
              </div>
              
        {isActive && (
          <div className="myth-battle-interface">
                  <div className="myth-statement">
              <div className="statement-header">
                <AlertTriangle className="statement-icon" />
                <span>Misinformation Threat</span>
              </div>
              <div className="statement-content">{myth.myth}</div>
              <div className="misinformation-sources">
                <div className="sources-header">Spreading Sources:</div>
                <div className="sources-list">
                  {myth.misinformationSources.map(source => (
                    <span key={source} className="source-tag">{source}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="truth-weapons">
              <div className="weapons-header">
                <Database className="weapons-icon" />
                <span>Truth Weapons Arsenal</span>
                <div className="evidence-strength">
                  Strength: {myth.evidenceStrength}%
                </div>
              </div>
              <div className="weapons-list">
                {myth.truthWeapons.map((weapon, index) => (
                  <div 
                    key={index}
                    className={`weapon-item ${evidenceCollected.has(`${myth.id}-${index}`) ? 'collected' : ''}`}
                    onClick={() => handleEvidenceCollection(`${myth.id}-${index}`)}
                  >
                    <CheckCircle className="weapon-icon" />
                    <span>{weapon}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="counter-narratives">
              <div className="narratives-header">
                <Building className="narratives-icon" />
                <span>Counter-Narratives</span>
              </div>
              <div className="narratives-list">
                {myth.counterNarratives.map((narrative, index) => (
                  <div key={index} className="narrative-item">
                    <Star className="narrative-icon" />
                    <span>{narrative}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="real-world-impact">
              <div className="impact-header">Real-World Impact:</div>
              <div className="impact-content">{myth.realWorldImpact}</div>
            </div>
            
            <div className="truth-defender-response">
              <div className="response-header">Truth Defender Response:</div>
              <div className="response-content">{myth.truthDefenderResponse}</div>
                      </div>
                      
            <div className="stakes-description">
              <div className="stakes-header">Stakes:</div>
              <div className="stakes-content">{myth.stakesDescription}</div>
            </div>
            
            {!isBusted && (
              <div className="myth-actions">
                <button 
                  className="bust-myth-button"
                  onClick={() => handleMythBust(myth.id)}
                >
                  <Sword className="bust-icon" />
                  Deploy Truth Weapons - BUST THIS MYTH!
                </button>
                      </div>
            )}

            {isBusted && (
              <div className="myth-busted">
                <div className="busted-indicator">
                  <CheckCircle className="busted-icon" />
                  <span>MYTH BUSTED!</span>
                </div>
                <div className="busted-impact">
                  Truth impact: +150 points | Network strength: +8%
                </div>
                    </div>
                  )}
                </div>
              )}
      </div>
    );
  };

  return (
    <div className="module-container myths-module">
      <div className="myths-content">
        {renderCrisisHeader()}
        {renderCrisisAlerts()}
        {renderPhaseNavigation()}
        {renderCurrentPhase()}
      </div>
    </div>
  );
};

export default MythsModule; 