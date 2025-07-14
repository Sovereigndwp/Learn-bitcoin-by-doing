import React, { useState, useEffect } from 'react';
import { useProgress } from '../contexts/ProgressContext';
import { 
  AlertTriangle, 
  Coins, 
  Zap, 
  Shield, 
  Settings, 
  TrendingUp,
  Target,
  Clock,
  RefreshCw,
  ArrowDown,
  CheckCircle,
  Crown,
  Activity,
  Globe
} from 'lucide-react';
import { 
  ContinueButton, 
  ActionButton, 
  OptionButton 
} from '../components/EnhancedButtons';
import './TransactionsModule.css';

// Fee strategies shared across multiple components
const feeStrategies = [
  {
    id: 'budget',
    name: '🐌 Budget Warrior',
    feeRate: 2,
    cost: 0.00004,
    time: '2-6 hours',
    risk: 'May get stuck in low-priority queue',
    color: '#ef4444'
  },
  {
    id: 'balanced',
    name: '⚖️ Balanced Tactician', 
    feeRate: 10,
    cost: 0.0002,
    time: '10-30 minutes',
    risk: 'Moderate priority during congestion',
    color: '#f59e0b'
  },
  {
    id: 'premium',
    name: '🚀 Priority Commander',
    feeRate: 25,
    cost: 0.0005,
    time: '1-3 blocks (~15 min)',
    risk: 'Nearly guaranteed next block',
    color: '#10b981'
  }
];

const TransactionsModule = () => {
  const { completeModule, isModuleCompleted, updatePersonalInsights } = useProgress();
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(new Set());

  // Transaction Architect Journey State
  const [paymentAmount] = useState(0.847);
  const [availableUTXOs] = useState([
    { id: 1, amount: 0.234, age: 15, privacy: 'low' },
    { id: 2, amount: 0.089, age: 3, privacy: 'medium' },
    { id: 3, amount: 0.445, age: 28, privacy: 'high' },
    { id: 4, amount: 0.678, age: 7, privacy: 'low' },
    { id: 5, amount: 0.123, age: 45, privacy: 'high' }
  ]);
  const [selectedUTXOs, setSelectedUTXOs] = useState(new Set());
  const [userInsights, setUserInsights] = useState({
    crisisExperience: null,
    alchemyMastery: 0,
    feeStrategy: null,
    privacyAwareness: 0,
    scriptUnderstanding: 0,
    networkCommand: 0
  });
  const [feeRate, setFeeRate] = useState(10);
  const [networkCongestion] = useState(65);
  // const [privacyMode, setPrivacyMode] = useState(false);
  // const [scriptType, setScriptType] = useState('p2pkh');
  // const [mempoolPosition, setMempoolPosition] = useState(null);

  const strategicSteps = [
    {
      id: 'crisis-detective',
      title: '🚨 Payment Crisis Detective',
      subtitle: 'Your payment failed! Investigate why...',
      icon: <AlertTriangle className="w-6 h-6" />,
      component: PaymentCrisisDetective
    },
    {
      id: 'utxo-alchemist', 
      title: '🔨 UTXO Alchemist',
      subtitle: 'Transform scattered coins into precise payments',
      icon: <Coins className="w-6 h-6" />,
      component: UTXOAlchemist
    },
    {
      id: 'fee-strategist',
      title: '⚡ Fee Market Strategist', 
      subtitle: 'Command priority in the economic battlefield',
      icon: <Zap className="w-6 h-6" />,
      component: FeeMarketStrategist
    },
    {
      id: 'privacy-guardian',
      title: '🛡️ Privacy Guardian',
      subtitle: 'Protect your transactions from surveillance',
      icon: <Shield className="w-6 h-6" />,
      component: PrivacyGuardian
    },
    {
      id: 'script-architect',
      title: '⚙️ Script Architect',
      subtitle: 'Design programmable money conditions',
      icon: <Settings className="w-6 h-6" />,
      component: ScriptArchitect
    },
    {
      id: 'network-commander',
      title: '🌐 Network Commander',
      subtitle: 'Master global payment flows and Lightning',
      icon: <Globe className="w-6 h-6" />,
      component: NetworkCommander
    }
  ];

  useEffect(() => {
    if (currentStep === strategicSteps.length - 1 && !isModuleCompleted('transactions')) {
      completeModule('transactions');
      updatePersonalInsights('transactions', userInsights);
      showStrategicAchievement(
        'Transaction Architect Mastery',
        'You command the flow of digital money across the global Bitcoin network!',
        '👑'
      );
    }
  }, [currentStep, completeModule, isModuleCompleted, updatePersonalInsights, userInsights, strategicSteps.length]);

  const showStrategicAchievement = (title, description, emoji = '⚡') => {
    const achievement = document.createElement('div');
    achievement.className = 'strategic-achievement';
    achievement.innerHTML = `
      <div class="achievement-glow">
      <div class="achievement-content">
          <div class="achievement-emoji">${emoji}</div>
        <div class="achievement-text">
            <h3>${title}</h3>
          <p>${description}</p>
          </div>
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
      }, 500);
    }, 4000);
  };

  const handleStepComplete = (stepIndex) => {
    setCompletedSteps(prev => new Set([...prev, stepIndex]));
    
    const achievements = [
      { title: 'Crisis Detective', desc: 'You diagnosed payment failures like a forensic expert!', emoji: '🕵️' },
      { title: 'UTXO Alchemist', desc: 'You transform scattered coins into precise payments!', emoji: '🔨' },
      { title: 'Fee Strategist', desc: 'You command priority in the economic battlefield!', emoji: '⚡' },
      { title: 'Privacy Guardian', desc: 'Your transactions are invisible to surveillance!', emoji: '🛡️' },
      { title: 'Script Architect', desc: 'You design programmable money conditions!', emoji: '⚙️' },
      { title: 'Network Commander', desc: 'You master global Bitcoin payment flows!', emoji: '🌐' }
    ];

    showStrategicAchievement(
      achievements[stepIndex].title,
      achievements[stepIndex].desc,
      achievements[stepIndex].emoji
    );
  };

  const handleContinue = () => {
    if (currentStep < strategicSteps.length - 1) {
      handleStepComplete(currentStep);
      setCurrentStep(prev => prev + 1);
    }
  };

  const progressPercentage = ((currentStep + 1) / strategicSteps.length) * 100;

  // Strategic Step Components
  function PaymentCrisisDetective() {
    const [crisisStage, setCrisisStage] = useState('discovery');
    const [investigationResult, setInvestigationResult] = useState(null);

    const handleCrisisChoice = (choice) => {
      const insights = { ...userInsights };
      insights.crisisExperience = choice;
      setUserInsights(insights);
      
      if (choice === 'investigate') {
        setCrisisStage('investigation');
        setTimeout(() => {
          setInvestigationResult('insufficient_utxos');
          setCrisisStage('revelation');
        }, 2000);
      } else {
        setCrisisStage('panic');
      }
    };

    return (
      <div className="crisis-detective">
        <div className="crisis-header">
          <div className="crisis-icon">
            <AlertTriangle className="w-16 h-16 text-red-500" />
          </div>
          <h2>🚨 PAYMENT CRISIS ALERT!</h2>
          <p className="crisis-subtitle">Your urgent 0.847 BTC payment to secure that property deal just FAILED!</p>
        </div>

        {crisisStage === 'discovery' && (
          <div className="crisis-scenario">
            <div className="scenario-box crisis-active">
              <div className="scenario-emoji">💥</div>
              <h3>Transaction Rejected</h3>
              <div className="crisis-details">
                <p><strong>Payment Amount:</strong> 0.847 BTC ($27,200)</p>
                <p><strong>Recipient:</strong> Property Escrow Service</p>
                <p><strong>Status:</strong> <span className="status-failed">FAILED</span></p>
                <p><strong>Error:</strong> "Insufficient funds for transaction"</p>
              </div>
            </div>

            <div className="crisis-choices">
              <p className="choice-prompt">Your financial sovereignty is at stake. What's your move?</p>
              <div className="choice-buttons">
                <OptionButton 
                  onClick={() => handleCrisisChoice('panic')}
                  className="choice-panic"
                >
                  😰 Panic! Check bank account
                </OptionButton>
                <OptionButton 
                  onClick={() => handleCrisisChoice('investigate')}
                  className="choice-investigate"
                >
                  🕵️ Investigate like a detective
                </OptionButton>
              </div>
            </div>
          </div>
        )}

        {crisisStage === 'investigation' && (
          <div className="investigation-process">
            <div className="investigation-header">
              <h3>🔍 Forensic Investigation in Progress...</h3>
            </div>
            <div className="investigation-steps">
              <div className="inv-step completed">
                <CheckCircle className="w-5 h-5" />
                <span>Checking wallet balance: 1.234 BTC ✓</span>
              </div>
              <div className="inv-step completed">
                <CheckCircle className="w-5 h-5" />
                <span>Analyzing UTXO distribution... ✓</span>
              </div>
              <div className="inv-step active">
                <RefreshCw className="w-5 h-5 animate-spin" />
                <span>Diagnosing transaction structure...</span>
              </div>
            </div>
          </div>
        )}

        {crisisStage === 'revelation' && (
          <div className="revelation">
            <div className="revelation-box">
              <div className="revelation-icon">💡</div>
              <h3>Detective Work Reveals the Truth!</h3>
              <div className="revelation-content">
                <p><strong>The Crisis:</strong> Your bitcoin isn't stored as a single "balance" like a bank account!</p>
                <p><strong>The Reality:</strong> You have 5 separate UTXOs (digital coins) worth different amounts:</p>
                <div className="utxo-revelation">
                  {availableUTXOs.map(utxo => (
                    <div key={utxo.id} className="utxo-mini">
                      <Coins className="w-4 h-4" />
                      <span>{utxo.amount} BTC</span>
                    </div>
                  ))}
                </div>
                <p><strong>The Problem:</strong> None of your individual UTXOs are large enough for the 0.847 BTC payment!</p>
                <p><strong>The Solution:</strong> You must combine multiple UTXOs to create the payment amount.</p>
              </div>
            </div>

            <div className="detective-insight">
              <h4>🎯 Your Detective Insight</h4>
              <p>Bitcoin transactions work like combining physical coins from your pocket. You need to select and combine the right UTXOs to make your payment. Time to become a UTXO Alchemist!</p>
            </div>
          </div>
        )}

        {crisisStage === 'panic' && (
          <div className="panic-result">
            <div className="panic-box">
              <div className="panic-emoji">😰</div>
              <h3>Panic Mode Activated</h3>
              <p>You frantically check your traditional bank account, but that won't help with Bitcoin payments! Your financial sovereignty requires understanding how Bitcoin actually works.</p>
              <p><strong>Lesson learned:</strong> Bitcoin operates differently than traditional banking. Time to investigate properly!</p>
              <ActionButton onClick={() => setCrisisStage('discovery')}>
                🔄 Restart Investigation
              </ActionButton>
            </div>
          </div>
        )}

        {(crisisStage === 'revelation' || (crisisStage === 'panic' && investigationResult)) && (
          <div className="continue-section">
            <ContinueButton onClick={handleContinue}>
              🔨 Become a UTXO Alchemist
            </ContinueButton>
          </div>
        )}
      </div>
    );
  }

  function UTXOAlchemist() {
    // const [alchemyStage, setAlchemyStage] = useState('workshop');
    const [selectedAmount, setSelectedAmount] = useState(0);
    const [combinationAttempts, setCombinationAttempts] = useState(0);
    const [perfectCombination, setPerfectCombination] = useState(false);

    const handleUTXOSelection = (utxoId) => {
    const newSelected = new Set(selectedUTXOs);
    if (newSelected.has(utxoId)) {
      newSelected.delete(utxoId);
    } else {
      newSelected.add(utxoId);
    }
    setSelectedUTXOs(newSelected);

      const totalSelected = availableUTXOs
        .filter(utxo => newSelected.has(utxo.id))
      .reduce((sum, utxo) => sum + utxo.amount, 0);
      setSelectedAmount(totalSelected);
      
      setCombinationAttempts(prev => prev + 1);
      
      if (totalSelected >= paymentAmount && totalSelected < paymentAmount + 0.1) {
        setPerfectCombination(true);
        const insights = { ...userInsights };
        insights.alchemyMastery = Math.min(100, 20 + (5 - combinationAttempts) * 10);
        setUserInsights(insights);
      } else {
        setPerfectCombination(false);
      }
  };

    const isValidCombination = selectedAmount >= paymentAmount;
    const efficiency = perfectCombination ? 
      Math.round(((paymentAmount / selectedAmount) * 100)) : 
      selectedAmount > 0 ? Math.round(((Math.min(selectedAmount, paymentAmount) / Math.max(selectedAmount, paymentAmount)) * 100)) : 0;

    return (
      <div className="utxo-alchemist">
        <div className="alchemy-header">
          <div className="alchemy-icon">
            <Coins className="w-16 h-16 text-orange-500" />
        </div>
          <h2>🔨 UTXO Alchemy Workshop</h2>
          <p className="alchemy-subtitle">Transform scattered digital coins into precise payment amounts</p>
      </div>
      
        <div className="alchemy-mission">
          <div className="mission-box">
            <h3>🎯 Your Alchemy Mission</h3>
            <div className="mission-details">
              <div className="mission-target">
                <Target className="w-6 h-6" />
                <span>Target Payment: <strong>{paymentAmount} BTC</strong></span>
          </div>
              <div className="mission-status">
                <span>Selected: <strong className={selectedAmount >= paymentAmount ? 'text-green-400' : 'text-orange-400'}>{selectedAmount.toFixed(3)} BTC</strong></span>
                <span>Efficiency: <strong className={efficiency > 90 ? 'text-green-400' : efficiency > 70 ? 'text-orange-400' : 'text-red-400'}>{efficiency}%</strong></span>
          </div>
          </div>
          </div>
        </div>

        <div className="alchemy-workshop">
          <h3>⚗️ Available Digital Coins (UTXOs)</h3>
          <p className="workshop-hint">Click coins to combine them. Master alchemists find the most efficient combinations!</p>
          
          <div className="utxo-forge">
            {availableUTXOs.map(utxo => (
              <div 
                key={utxo.id}
                className={`utxo-coin ${selectedUTXOs.has(utxo.id) ? 'selected' : ''} ${utxo.privacy === 'high' ? 'privacy-high' : utxo.privacy === 'medium' ? 'privacy-medium' : 'privacy-low'}`}
                onClick={() => handleUTXOSelection(utxo.id)}
              >
                <div className="coin-top">
                  <Coins className="w-6 h-6" />
                  <span className="coin-amount">{utxo.amount} BTC</span>
                </div>
                <div className="coin-details">
                  <span className="coin-age">{utxo.age} blocks old</span>
                  <span className={`coin-privacy privacy-${utxo.privacy}`}>
                    {utxo.privacy === 'high' ? '🛡️' : utxo.privacy === 'medium' ? '👁️' : '🔍'} 
                    {utxo.privacy} privacy
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="alchemy-result">
            <div className={`combination-status ${isValidCombination ? 'valid' : 'invalid'}`}>
              {isValidCombination ? (
                perfectCombination ? (
                  <div className="perfect-alchemy">
                    <Crown className="w-8 h-8 text-yellow-400" />
                    <h4>🎉 Perfect Alchemy!</h4>
                    <p>You've mastered the art of UTXO combination with {efficiency}% efficiency!</p>
                  </div>
                ) : (
                  <div className="valid-alchemy">
                    <CheckCircle className="w-8 h-8 text-green-400" />
                    <h4>✅ Valid Combination!</h4>
                    <p>Your selection works! Efficiency: {efficiency}%</p>
                    <p className="efficiency-tip">
                      {efficiency < 80 && "💡 Tip: Try reducing excess to improve efficiency!"}
            </p>
          </div>
                )
              ) : (
                <div className="invalid-alchemy">
                  <AlertTriangle className="w-8 h-8 text-red-400" />
                  <h4>⚠️ Insufficient Amount</h4>
                  <p>Need {(paymentAmount - selectedAmount).toFixed(3)} BTC more. Keep combining!</p>
                </div>
              )}
        </div>
      </div>

          {selectedUTXOs.size > 0 && (
            <div className="transaction-preview">
              <h4>🔄 Transaction Preview</h4>
              <div className="tx-breakdown">
                <div className="tx-inputs">
                  <h5>Inputs ({selectedUTXOs.size} UTXOs):</h5>
                  {availableUTXOs
                    .filter(utxo => selectedUTXOs.has(utxo.id))
                    .map(utxo => (
                      <div key={utxo.id} className="tx-input">
                        <span>{utxo.amount} BTC</span>
      </div>
                    ))}
                  <div className="tx-total">Total: {selectedAmount.toFixed(3)} BTC</div>
                </div>
                <ArrowDown className="w-6 h-6 text-gray-400" />
                <div className="tx-outputs">
                  <h5>Outputs:</h5>
                  <div className="tx-output">Payment: {paymentAmount} BTC</div>
                  {selectedAmount > paymentAmount && (
                    <div className="tx-output change">
                      Change: {(selectedAmount - paymentAmount).toFixed(3)} BTC
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="alchemy-mastery">
          <h4>🏆 Alchemy Mastery Progress</h4>
          <div className="mastery-bar">
            <div className="mastery-fill" style={{width: `${userInsights.alchemyMastery}%`}}></div>
          </div>
          <p className="mastery-text">
            Attempts: {combinationAttempts} | Mastery: {userInsights.alchemyMastery}%
          </p>
        </div>

        {isValidCombination && (
          <div className="continue-section">
            <ContinueButton onClick={handleContinue}>
              ⚡ Master Fee Strategy
            </ContinueButton>
          </div>
        )}
    </div>
  );
  }

  function FeeMarketStrategist() {
    const [strategyStage] = useState('battlefield');
    const [selectedStrategy, setSelectedStrategy] = useState(null);
    const [battleResult, setBattleResult] = useState(null);
    const [mempoolBattle, setMempoolBattle] = useState(false);
    const [, setMempoolPosition] = useState(null);



    const handleStrategyChoice = (strategy) => {
      setSelectedStrategy(strategy);
      setFeeRate(strategy.feeRate);
      const insights = { ...userInsights };
      insights.feeStrategy = strategy.id;
      setUserInsights(insights);
      
      setTimeout(() => {
        setMempoolBattle(true);
        simulateMempoolBattle(strategy);
      }, 1500);
    };

    const simulateMempoolBattle = (strategy) => {
      const outcomes = {
        budget: {
          position: 2847,
          status: 'queued',
          message: 'Your transaction joins the back of the line. Patience required!',
          emoji: '🐌'
        },
        balanced: {
          position: 245,
          status: 'competitive',
          message: 'You\'re in the competition zone! Good balance of cost vs speed.',
          emoji: '⚖️'
        },
        premium: {
          position: 12,
          status: 'priority',
          message: 'Front of the line! Miners will prioritize your transaction.',
          emoji: '🚀'
        }
      };
      
      setBattleResult(outcomes[strategy.id]);
      setMempoolPosition(outcomes[strategy.id].position);
    };

    return (
      <div className="fee-strategist">
        <div className="strategy-header">
          <div className="strategy-icon">
            <Zap className="w-16 h-16 text-yellow-500" />
          </div>
          <h2>⚡ Fee Market Battlefield</h2>
          <p className="strategy-subtitle">Command priority in the economic warfare for block space</p>
        </div>

        {strategyStage === 'battlefield' && (
          <div className="battlefield-overview">
            <div className="battlefield-status">
              <h3>🔥 Current Network Conditions</h3>
              <div className="network-stats">
                <div className="stat">
                  <Activity className="w-6 h-6" />
                  <span>Congestion: <strong className="text-orange-400">{networkCongestion}%</strong></span>
                </div>
                <div className="stat">
                  <Clock className="w-6 h-6" />
                  <span>Mempool: <strong>47,382 transactions waiting</strong></span>
                </div>
                <div className="stat">
                  <TrendingUp className="w-6 h-6" />
                  <span>Fee Competition: <strong className="text-red-400">INTENSE</strong></span>
                </div>
              </div>
            </div>

            <div className="strategy-briefing">
              <h3>🎯 Strategic Mission</h3>
              <p>Your property deal payment needs confirmation within 1 hour. Choose your fee strategy wisely - underpay and risk delays, overpay and waste money. Master strategists find the optimal balance!</p>
            </div>

            <div className="strategy-selection">
              <h3>⚔️ Choose Your Battle Strategy</h3>
              <div className="strategy-grid">
                {feeStrategies.map(strategy => (
            <div 
                    key={strategy.id}
                    className={`strategy-card ${selectedStrategy?.id === strategy.id ? 'selected' : ''}`}
                    onClick={() => handleStrategyChoice(strategy)}
            >
                    <div className="strategy-header-card">
                      <span className="strategy-emoji">{strategy.name.split(' ')[0]}</span>
                      <h4>{strategy.name.substring(2)}</h4>
                    </div>
                    <div className="strategy-details">
                      <div className="strategy-stat">
                        <span>Fee Rate:</span>
                        <span className="stat-value" style={{color: strategy.color}}>
                          {strategy.feeRate} sat/vB
                        </span>
                      </div>
                      <div className="strategy-stat">
                        <span>Cost:</span>
                        <span className="stat-value">{strategy.cost} BTC</span>
                      </div>
                      <div className="strategy-stat">
                        <span>ETA:</span>
                        <span className="stat-value">{strategy.time}</span>
                      </div>
                      <div className="strategy-risk">
                        <span>Risk: {strategy.risk}</span>
                      </div>
              </div>
            </div>
          ))}
        </div>
        </div>
        </div>
        )}

        {mempoolBattle && battleResult && (
          <div className="mempool-battle">
            <div className="battle-header">
              <h3>⚔️ Mempool Battle Results</h3>
                  </div>
            
            <div className="battle-outcome">
              <div className={`outcome-box ${battleResult.status}`}>
                <div className="outcome-emoji">{battleResult.emoji}</div>
                <h4>Battle Position: #{battleResult.position}</h4>
                <p>{battleResult.message}</p>
                <div className="position-visual">
                  <div className="position-bar">
                    <div 
                      className="position-indicator"
                      style={{
                        left: `${Math.max(5, Math.min(95, (1 - battleResult.position / 3000) * 100))}%`,
                        backgroundColor: selectedStrategy.color
                      }}
                    ></div>
                </div>
                  <div className="position-labels">
                    <span>Back of Line</span>
                    <span>Front Priority</span>
                  </div>
                </div>
            </div>
          </div>
          
            <div className="strategic-insight">
              <h4>🧠 Strategic Insight</h4>
              <p>
                {selectedStrategy.id === 'budget' && "You've chosen patience over speed. In low-congestion periods, this saves money. During high congestion, you might wait hours or days!"}
                {selectedStrategy.id === 'balanced' && "You've mastered the art of balance! This strategy adapts well to most network conditions while managing costs."}
                {selectedStrategy.id === 'premium' && "You've chosen speed and certainty over cost optimization. Perfect for urgent payments or high-value transactions!"}
              </p>
            </div>

            <div className="fee-mastery">
              <h4>📈 Fee Strategy Mastery</h4>
              <div className="mastery-breakdown">
                <div className="mastery-stat">
                  <span>Cost Efficiency:</span>
                  <span className={selectedStrategy.id === 'budget' ? 'text-green-400' : selectedStrategy.id === 'balanced' ? 'text-orange-400' : 'text-red-400'}>
                    {selectedStrategy.id === 'budget' ? '95%' : selectedStrategy.id === 'balanced' ? '75%' : '45%'}
                  </span>
              </div>
                <div className="mastery-stat">
                  <span>Speed Mastery:</span>
                  <span className={selectedStrategy.id === 'premium' ? 'text-green-400' : selectedStrategy.id === 'balanced' ? 'text-orange-400' : 'text-red-400'}>
                    {selectedStrategy.id === 'premium' ? '95%' : selectedStrategy.id === 'balanced' ? '75%' : '25%'}
                  </span>
            </div>
                <div className="mastery-stat">
                  <span>Strategic Balance:</span>
                  <span className={selectedStrategy.id === 'balanced' ? 'text-green-400' : 'text-orange-400'}>
                    {selectedStrategy.id === 'balanced' ? '90%' : '60%'}
                  </span>
          </div>
        </div>
      </div>
        </div>
        )}

        {battleResult && (
          <div className="continue-section">
            <ContinueButton onClick={handleContinue}>
              🛡️ Master Privacy Protection
            </ContinueButton>
          </div>
        )}
    </div>
  );
  }

  function PrivacyGuardian() {
    // const [guardianStage] = useState('threat-assessment');
    const [privacyChoices, setPrivacyChoices] = useState({
      addressReuse: null,
      utxoSelection: null,
      coinJoin: null,
      timing: null
    });
    const [surveillanceScore, setSurveillanceScore] = useState(100);
    const [privacyLevel, setPrivacyLevel] = useState('exposed');

    const assessPrivacyThreat = (choice, value) => {
      const newChoices = { ...privacyChoices, [choice]: value };
      setPrivacyChoices(newChoices);
      
      let score = 100;
      if (newChoices.addressReuse === 'reuse') score -= 30;
      if (newChoices.utxoSelection === 'random') score -= 20;
      if (newChoices.coinJoin === 'skip') score -= 25;
      if (newChoices.timing === 'immediate') score -= 15;
      
      setSurveillanceScore(Math.max(0, score));
      
      if (score >= 80) setPrivacyLevel('sovereign');
      else if (score >= 60) setPrivacyLevel('protected');  
      else if (score >= 40) setPrivacyLevel('vulnerable');
      else setPrivacyLevel('exposed');

      const insights = { ...userInsights };
      insights.privacyAwareness = score;
      setUserInsights(insights);
    };

    const privacyLevels = {
      exposed: { emoji: '🚨', color: '#ef4444', title: 'Dangerously Exposed' },
      vulnerable: { emoji: '⚠️', color: '#f59e0b', title: 'Surveillance Vulnerable' },
      protected: { emoji: '🛡️', color: '#3b82f6', title: 'Well Protected' },
      sovereign: { emoji: '👑', color: '#10b981', title: 'Digital Sovereign' }
    };
    
    return (
      <div className="privacy-guardian">
        <div className="guardian-header">
          <div className="guardian-icon">
            <Shield className="w-16 h-16 text-blue-500" />
          </div>
          <h2>🛡️ Privacy Guardian Protocol</h2>
          <p className="guardian-subtitle">Protect your financial sovereignty from surveillance</p>
        </div>

        <div className="threat-matrix">
          <h3>🎯 Surveillance Threat Assessment</h3>
          <div className="threat-level">
            <div className={`threat-indicator ${privacyLevel}`}>
              <span className="threat-emoji">{privacyLevels[privacyLevel].emoji}</span>
              <span className="threat-title">{privacyLevels[privacyLevel].title}</span>
              <span className="threat-score">{surveillanceScore}% Privacy</span>
            </div>
          </div>
          </div>
          
        <div className="privacy-challenges">
          <h3>🔒 Privacy Defense Choices</h3>
          
          <div className="challenge">
            <h4>1. Address Strategy</h4>
            <p>Your previous transactions used address 1A2B3C... Should you reuse it?</p>
            <div className="choice-buttons">
              <OptionButton 
                onClick={() => assessPrivacyThreat('addressReuse', 'reuse')}
                className={privacyChoices.addressReuse === 'reuse' ? 'selected danger' : ''}
              >
                🔄 Reuse Address (Convenient)
              </OptionButton>
              <OptionButton 
                onClick={() => assessPrivacyThreat('addressReuse', 'new')}
                className={privacyChoices.addressReuse === 'new' ? 'selected safe' : ''}
              >
                🆕 Generate New Address (Private)
              </OptionButton>
              </div>
            {privacyChoices.addressReuse && (
              <div className={`choice-result ${privacyChoices.addressReuse === 'reuse' ? 'danger' : 'safe'}`}>
                {privacyChoices.addressReuse === 'reuse' ? 
                  '⚠️ Address reuse links all your transactions! Surveillance can track your entire financial history.' :
                  '✅ New addresses break transaction linkability! Each payment appears disconnected.'
                }
            </div>
            )}
          </div>

          <div className="challenge">
            <h4>2. UTXO Selection Strategy</h4>
            <p>Which UTXOs should you combine to make the payment?</p>
            <div className="choice-buttons">
              <OptionButton 
                onClick={() => assessPrivacyThreat('utxoSelection', 'random')}
                className={privacyChoices.utxoSelection === 'random' ? 'selected danger' : ''}
              >
                🎲 Random Selection
              </OptionButton>
              <OptionButton 
                onClick={() => assessPrivacyThreat('utxoSelection', 'strategic')}
                className={privacyChoices.utxoSelection === 'strategic' ? 'selected safe' : ''}
              >
                🎯 Strategic Privacy Selection
              </OptionButton>
            </div>
            {privacyChoices.utxoSelection && (
              <div className={`choice-result ${privacyChoices.utxoSelection === 'random' ? 'danger' : 'safe'}`}>
                {privacyChoices.utxoSelection === 'random' ? 
                  '⚠️ Random selection might combine UTXOs from different sources, revealing your activity patterns!' :
                  '✅ Strategic selection minimizes information leakage by grouping similar UTXOs!'
                }
              </div>
            )}
        </div>

          <div className="challenge">
            <h4>3. Advanced Privacy Enhancement</h4>
            <p>Do you want to use CoinJoin mixing before your payment?</p>
            <div className="choice-buttons">
              <OptionButton 
                onClick={() => assessPrivacyThreat('coinJoin', 'skip')}
                className={privacyChoices.coinJoin === 'skip' ? 'selected danger' : ''}
              >
                ⏭️ Skip (Faster & Cheaper)
              </OptionButton>
              <OptionButton 
                onClick={() => assessPrivacyThreat('coinJoin', 'use')}
                className={privacyChoices.coinJoin === 'use' ? 'selected safe' : ''}
              >
                🌀 Use CoinJoin (Maximum Privacy)
              </OptionButton>
                </div>
            {privacyChoices.coinJoin && (
              <div className={`choice-result ${privacyChoices.coinJoin === 'skip' ? 'danger' : 'safe'}`}>
                {privacyChoices.coinJoin === 'skip' ? 
                  '⚠️ Direct payment exposes the transaction flow between you and recipient!' :
                  '✅ CoinJoin mixes your coins with others, breaking transaction surveillance!'
                }
                </div>
            )}
              </div>

          <div className="challenge">
            <h4>4. Timing Strategy</h4>
            <p>When should you broadcast your transaction?</p>
            <div className="choice-buttons">
              <OptionButton 
                onClick={() => assessPrivacyThreat('timing', 'immediate')}
                className={privacyChoices.timing === 'immediate' ? 'selected danger' : ''}
              >
                ⚡ Broadcast Immediately
              </OptionButton>
              <OptionButton 
                onClick={() => assessPrivacyThreat('timing', 'delayed')}
                className={privacyChoices.timing === 'delayed' ? 'selected safe' : ''}
              >
                ⏰ Strategic Timing
              </OptionButton>
                </div>
            {privacyChoices.timing && (
              <div className={`choice-result ${privacyChoices.timing === 'immediate' ? 'danger' : 'safe'}`}>
                {privacyChoices.timing === 'immediate' ? 
                  '⚠️ Immediate broadcast can reveal your timezone and activity patterns!' :
                  '✅ Strategic timing obscures when and where you initiated the transaction!'
                }
                </div>
            )}
              </div>
                </div>

        <div className="privacy-mastery">
          <h4>🏆 Privacy Guardian Mastery</h4>
          <div className="mastery-visualization">
            <div className="privacy-shield">
              <div 
                className="shield-fill"
                style={{
                  height: `${surveillanceScore}%`,
                  backgroundColor: privacyLevels[privacyLevel].color
                }}
              ></div>
                </div>
            <div className="mastery-details">
              <p><strong>Surveillance Resistance:</strong> {surveillanceScore}%</p>
              <p><strong>Privacy Level:</strong> {privacyLevels[privacyLevel].title}</p>
              <p><strong>Guardian Status:</strong> {
                privacyLevel === 'sovereign' ? 'Master Guardian - Your transactions are invisible!' :
                privacyLevel === 'protected' ? 'Skilled Guardian - Well defended against surveillance!' :
                privacyLevel === 'vulnerable' ? 'Apprentice Guardian - Some protection but gaps remain!' :
                'Exposed Target - Urgent privacy upgrade needed!'
              }</p>
              </div>
            </div>
          </div>

        {Object.values(privacyChoices).every(choice => choice !== null) && (
          <div className="continue-section">
            <ContinueButton onClick={handleContinue}>
              ⚙️ Architect Programmable Scripts
            </ContinueButton>
        </div>
        )}
      </div>
    );
  }

  function ScriptArchitect() {
    // const [architectStage] = useState('blueprint');
    const [selectedScript, setSelectedScript] = useState(null);
    const [scriptChallenge, setScriptChallenge] = useState(null);
    const [, setBlueprintMastery] = useState(0);

    const scriptBlueprints = [
      {
        id: 'p2pkh',
        name: '🔑 Personal Vault',
        description: 'Single signature control - you alone command the funds',
        security: 'Basic',
        complexity: 'Simple',
        useCase: 'Personal savings, daily transactions',
        code: 'OP_DUP OP_HASH160 <pubKeyHash> OP_EQUALVERIFY OP_CHECKSIG',
        unlock: 'Your signature + public key'
      },
      {
        id: 'p2sh_multisig',
        name: '🏛️ Council Vault',
        description: '2-of-3 multisig - requires majority approval for spending',
        security: 'High',
        complexity: 'Advanced',
        useCase: 'Business accounts, family trusts, shared custody',
        code: 'OP_2 <pubKey1> <pubKey2> <pubKey3> OP_3 OP_CHECKMULTISIG',
        unlock: '2 of 3 signatures required'
      },
      {
        id: 'timelock',
        name: '⏰ Time Vault',
        description: 'Funds locked until specific block height or time',
        security: 'Medium',
        complexity: 'Intermediate',
        useCase: 'Inheritance planning, forced savings, vesting schedules',
        code: '<blockHeight> OP_CHECKLOCKTIMEVERIFY OP_DROP <pubKeyHash> OP_CHECKSIG',
        unlock: 'Your signature + time condition met'
      },
      {
        id: 'htlc',
        name: '🔗 Lightning Vault',
        description: 'Hash Time Locked Contract - conditional on secret knowledge',
        security: 'High',
        complexity: 'Expert',
        useCase: 'Lightning Network, atomic swaps, escrow',
        code: 'OP_IF OP_SHA256 <hash> OP_EQUALVERIFY <pubKey1> OP_ELSE <timelock> OP_CHECKLOCKTIMEVERIFY OP_DROP <pubKey2> OP_ENDIF OP_CHECKSIG',
        unlock: 'Secret preimage OR timeout + backup signature'
      }
    ];

    const handleScriptChoice = (script) => {
      setSelectedScript(script);
      setBlueprintMastery(prev => Math.min(100, prev + 25));
      
      const insights = { ...userInsights };
      insights.scriptUnderstanding = Math.min(100, insights.scriptUnderstanding + 20);
      setUserInsights(insights);

      // Create a challenge based on script type
      setTimeout(() => {
        createScriptChallenge(script);
      }, 1000);
    };

    const createScriptChallenge = (script) => {
      const challenges = {
        p2pkh: {
          scenario: 'Your personal vault needs to release funds for the property payment.',
          requirement: 'Provide your signature to unlock the funds',
          steps: ['Sign with private key', 'Provide public key', 'Execute script'],
          result: 'Funds released! Script validates your ownership.'
        },
        p2sh_multisig: {
          scenario: 'Your business vault (2-of-3 multisig) needs approval for large payment.',
          requirement: 'Coordinate with 2 of 3 key holders to approve transaction',
          steps: ['Alice signs (1/2)', 'Bob signs (2/2)', 'Execute multisig script'],
          result: 'Majority consensus achieved! Funds released securely.'
        },
        timelock: {
          scenario: 'Your inheritance vault is set to unlock after block 750,000.',
          requirement: 'Wait for the timelock condition and then sign',
          steps: ['Check current block: 750,001 ✓', 'Timelock condition met', 'Provide signature'],
          result: 'Time condition satisfied! Vault unlocked as programmed.'
        },
        htlc: {
          scenario: 'Lightning payment route requires revealing hash preimage.',
          requirement: 'Provide the secret that hashes to the specified value',
          steps: ['Provide preimage: "bitcoin_rocks"', 'Verify hash matches', 'Execute payment'],
          result: 'Secret revealed! Lightning route completed atomically.'
        }
      };
      
      setScriptChallenge(challenges[script.id]);
    };

    return (
      <div className="script-architect">
        <div className="architect-header">
          <div className="architect-icon">
            <Settings className="w-16 h-16 text-purple-500" />
        </div>
          <h2>⚙️ Script Architect Laboratory</h2>
          <p className="architect-subtitle">Design programmable money conditions that execute automatically</p>
      </div>

        <div className="architect-mission">
          <div className="mission-briefing">
            <h3>🎯 Architect Mission</h3>
            <p>Your property payment needs specific execution conditions. Choose the right script architecture to ensure secure, automated execution. Different blueprints offer different security models and capabilities.</p>
        </div>
        </div>

        <div className="blueprint-library">
          <h3>📐 Script Blueprint Library</h3>
          <div className="blueprint-grid">
            {scriptBlueprints.map(blueprint => (
              <div 
                key={blueprint.id}
                className={`blueprint-card ${selectedScript?.id === blueprint.id ? 'selected' : ''}`}
                onClick={() => handleScriptChoice(blueprint)}
              >
                <div className="blueprint-header">
                  <span className="blueprint-emoji">{blueprint.name.split(' ')[0]}</span>
                  <h4>{blueprint.name.substring(2)}</h4>
        </div>
                
                <div className="blueprint-details">
                  <p className="blueprint-description">{blueprint.description}</p>
                  
                  <div className="blueprint-specs">
                    <div className="spec">
                      <span>Security:</span>
                      <span className={`spec-value ${blueprint.security.toLowerCase()}`}>
                        {blueprint.security}
                      </span>
        </div>
                    <div className="spec">
                      <span>Complexity:</span>
                      <span className={`spec-value ${blueprint.complexity.toLowerCase()}`}>
                        {blueprint.complexity}
                      </span>
        </div>
        </div>
                  
                  <div className="blueprint-usecase">
                    <strong>Use Case:</strong> {blueprint.useCase}
      </div>

                  <div className="blueprint-unlock">
                    <strong>Unlock:</strong> {blueprint.unlock}
      </div>
    </div>
              </div>
            ))}
        </div>
      </div>

        {selectedScript && (
          <div className="script-workshop">
            <h3>🔧 Script Workshop</h3>
            <div className="workshop-details">
              <h4>Selected Blueprint: {selectedScript.name}</h4>
              <div className="script-code">
                <h5>📜 Script Code:</h5>
                <code className="code-block">{selectedScript.code}</code>
          </div>
              
              <div className="script-breakdown">
                <h5>🔍 How It Works:</h5>
                <div className="breakdown-steps">
                  {selectedScript.id === 'p2pkh' && (
                    <>
                      <div className="step">1. OP_DUP: Duplicate public key</div>
                      <div className="step">2. OP_HASH160: Hash the public key</div>
                      <div className="step">3. Compare with stored hash</div>
                      <div className="step">4. OP_CHECKSIG: Verify signature</div>
                    </>
                  )}
                  {selectedScript.id === 'p2sh_multisig' && (
                    <>
                      <div className="step">1. OP_2: Require 2 signatures</div>
                      <div className="step">2. Check against 3 public keys</div>
                      <div className="step">3. OP_CHECKMULTISIG: Verify signatures</div>
                      <div className="step">4. Release if 2+ valid signatures</div>
                    </>
                  )}
                  {selectedScript.id === 'timelock' && (
                    <>
                      <div className="step">1. Check current block height</div>
                      <div className="step">2. OP_CHECKLOCKTIMEVERIFY: Verify time</div>
                      <div className="step">3. If time met, check signature</div>
                      <div className="step">4. Release funds if both conditions met</div>
                    </>
                  )}
                  {selectedScript.id === 'htlc' && (
                    <>
                      <div className="step">1. OP_IF: Check if secret provided</div>
                      <div className="step">2. OP_SHA256: Hash the secret</div>
                      <div className="step">3. Compare with stored hash</div>
                      <div className="step">4. OR: Check timelock + backup signature</div>
                    </>
                  )}
          </div>
        </div>
          </div>
          </div>
        )}

        {scriptChallenge && (
          <div className="script-challenge">
            <h3>⚡ Script Execution Challenge</h3>
            <div className="challenge-scenario">
              <h4>Scenario:</h4>
              <p>{scriptChallenge.scenario}</p>
              
              <h4>Requirement:</h4>
              <p>{scriptChallenge.requirement}</p>
              
              <div className="execution-steps">
                <h4>🔄 Execution Steps:</h4>
                {scriptChallenge.steps.map((step, index) => (
                  <div key={index} className="execution-step">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span>{step}</span>
                  </div>
                ))}
        </div>
        
              <div className="challenge-result">
                <h4>✅ Result:</h4>
                <p>{scriptChallenge.result}</p>
          </div>
          </div>
        </div>
        )}
        
        <div className="architect-mastery">
          <h4>🏗️ Script Architect Mastery</h4>
          <div className="mastery-progress">
            <div className="mastery-bar">
              <div 
                className="mastery-fill"
                style={{width: `${userInsights.scriptUnderstanding}%`}}
              ></div>
          </div>
            <p>Blueprint Mastery: {userInsights.scriptUnderstanding}%</p>
            <p className="mastery-insight">
              {userInsights.scriptUnderstanding >= 80 && "🏆 Master Architect - You understand programmable money!"}
              {userInsights.scriptUnderstanding >= 60 && userInsights.scriptUnderstanding < 80 && "🔧 Skilled Architect - Good grasp of script mechanics!"}
              {userInsights.scriptUnderstanding >= 40 && userInsights.scriptUnderstanding < 60 && "📐 Apprentice Architect - Learning the fundamentals!"}
              {userInsights.scriptUnderstanding < 40 && "🎓 Script Student - Keep exploring to master the craft!"}
            </p>
        </div>
      </div>

        {selectedScript && scriptChallenge && (
          <div className="continue-section">
            <ContinueButton onClick={handleContinue}>
              🌐 Command the Global Network
            </ContinueButton>
      </div>
        )}
    </div>
  );
  }

  function NetworkCommander() {
    // const [commandStage] = useState('control-center');
    const [mempoolView, setMempoolView] = useState('layers');
    const [lightningDemo, setLightningDemo] = useState(false);
    const [, setCommandMastery] = useState(0);

    const mempoolLayers = [
      { id: 1, feeRange: '25+ sat/vB', count: 1247, color: '#10b981', priority: 'High Priority' },
      { id: 2, feeRange: '15-24 sat/vB', count: 3892, color: '#f59e0b', priority: 'Medium Priority' },
      { id: 3, feeRange: '5-14 sat/vB', count: 12567, color: '#ef4444', priority: 'Low Priority' },
      { id: 4, feeRange: '1-4 sat/vB', count: 29384, color: '#6b7280', priority: 'Very Low' }
    ];

    const handleCommandAction = (action) => {
      const insights = { ...userInsights };
      if (action === 'analyze-mempool') {
        setMempoolView('analysis');
        insights.networkCommand += 20;
      } else if (action === 'lightning-demo') {
        setLightningDemo(true);
        insights.networkCommand += 30;
      }
      setUserInsights(insights);
      setCommandMastery(prev => Math.min(100, prev + 25));
    };

    return (
      <div className="network-commander">
        <div className="commander-header">
          <div className="commander-icon">
            <Globe className="w-16 h-16 text-blue-400" />
        </div>
          <h2>🌐 Global Network Command Center</h2>
          <p className="commander-subtitle">Master the pulse of the global Bitcoin payment network</p>
      </div>

        <div className="command-dashboard">
          <h3>📊 Network Status Dashboard</h3>
          <div className="dashboard-grid">
            <div className="status-card">
              <Activity className="w-8 h-8" />
              <div className="status-info">
                <h4>Global Hash Rate</h4>
                <span className="status-value">387 EH/s</span>
                <span className="status-change positive">+2.3%</span>
              </div>
            </div>
            <div className="status-card">
              <Clock className="w-8 h-8" />
              <div className="status-info">
                <h4>Block Time</h4>
                <span className="status-value">9.8 min</span>
                <span className="status-change positive">Fast</span>
              </div>
            </div>
            <div className="status-card">
              <TrendingUp className="w-8 h-8" />
              <div className="status-info">
                <h4>Network Difficulty</h4>
                <span className="status-value">62.46 T</span>
                <span className="status-change">Next: +1.2%</span>
              </div>
            </div>
            <div className="status-card">
              <Zap className="w-8 h-8" />
              <div className="status-info">
                <h4>Lightning Capacity</h4>
                <span className="status-value">4,827 BTC</span>
                <span className="status-change positive">+15.7%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mempool-command">
          <h3>🌊 Mempool Command Interface</h3>
          <div className="command-controls">
            <ActionButton 
              onClick={() => handleCommandAction('analyze-mempool')}
              className={mempoolView === 'analysis' ? 'active' : ''}
            >
              📈 Analyze Market Dynamics
            </ActionButton>
            <ActionButton onClick={() => setMempoolView('layers')}>
              🏗️ View Priority Layers
            </ActionButton>
        </div>
        
          {mempoolView === 'layers' && (
            <div className="mempool-visualization">
          <div className="mempool-layers">
                {mempoolLayers.map(layer => (
                  <div key={layer.id} className="mempool-layer">
              <div className="layer-info">
                      <span className="layer-priority">{layer.priority}</span>
                      <span className="layer-fee">{layer.feeRange}</span>
                      <span className="layer-count">{layer.count.toLocaleString()} txs</span>
              </div>
                    <div className="layer-visualization">
                      <div 
                        className="layer-bar"
                        style={{
                          width: `${(layer.count / 30000) * 100}%`,
                          backgroundColor: layer.color
                        }}
                      ></div>
              </div>
            </div>
                ))}
              </div>
              <div className="mempool-insight">
                <h4>🎯 Commander Insight</h4>
                <p>The mempool reveals the economic heartbeat of Bitcoin. Higher fee layers get priority, creating a natural market for block space. Your transaction sits in the {selectedUTXOs.size > 0 ? feeStrategies.find(s => s.feeRate === feeRate)?.name || 'selected' : 'chosen'} layer!</p>
              </div>
            </div>
          )}

          {mempoolView === 'analysis' && (
            <div className="market-analysis">
              <h4>📊 Fee Market Analysis</h4>
              <div className="analysis-insights">
                <div className="insight-card">
                  <TrendingUp className="w-6 h-6" />
                  <div>
                    <h5>Market Trend</h5>
                    <p>Fees are trending upward due to increased DeFi activity and institutional adoption</p>
              </div>
              </div>
                <div className="insight-card">
                  <Clock className="w-6 h-6" />
                  <div>
                    <h5>Optimal Timing</h5>
                    <p>Weekend transactions typically see 20-30% lower fees due to reduced business activity</p>
            </div>
          </div>
                <div className="insight-card">
                  <Target className="w-6 h-6" />
                  <div>
                    <h5>Strategic Recommendation</h5>
                    <p>For your urgency level, {feeRate}+ sat/vB ensures next-block confirmation</p>
        </div>
      </div>
      </div>
    </div>
          )}
        </div>

        <div className="lightning-command">
          <h3>⚡ Lightning Network Command</h3>
          <div className="lightning-overview">
            <p>The Lightning Network enables instant, low-cost Bitcoin payments through payment channels. Perfect for micropayments and high-frequency transactions.</p>
            
            <ActionButton 
              onClick={() => handleCommandAction('lightning-demo')}
              className={lightningDemo ? 'active' : ''}
            >
              🚀 Demonstrate Lightning Speed
            </ActionButton>
        </div>

          {lightningDemo && (
            <div className="lightning-demonstration">
              <h4>⚡ Lightning vs Base Layer Comparison</h4>
              <div className="comparison-grid">
                <div className="comparison-item base-layer">
                  <h5>🐢 Base Layer Transaction</h5>
                  <div className="comparison-stats">
                    <div className="stat">
                      <span>Confirmation Time:</span>
                      <span>~10 minutes</span>
        </div>
                    <div className="stat">
                      <span>Fee Cost:</span>
                      <span>$3.50 - $15.00</span>
        </div>
                    <div className="stat">
                      <span>Finality:</span>
                      <span>6 confirmations (~1 hour)</span>
      </div>
                    <div className="stat">
                      <span>Best For:</span>
                      <span>Large amounts, settlements</span>
      </div>
    </div>
      </div>

                <div className="comparison-item lightning">
                  <h5>⚡ Lightning Payment</h5>
                  <div className="comparison-stats">
        <div className="stat">
                      <span>Confirmation Time:</span>
                      <span className="highlight">Instant!</span>
        </div>
        <div className="stat">
                      <span>Fee Cost:</span>
                      <span className="highlight">$0.001 - $0.01</span>
        </div>
        <div className="stat">
                      <span>Finality:</span>
                      <span className="highlight">Immediate</span>
                    </div>
                    <div className="stat">
                      <span>Best For:</span>
                      <span className="highlight">Daily payments, streaming</span>
                    </div>
                  </div>
        </div>
      </div>

              <div className="lightning-insight">
                <h4>🧠 Network Commander Insight</h4>
                <p>Lightning Network represents Bitcoin's evolution into a global payment system. By opening payment channels, you can send thousands of instant transactions for the cost of just two on-chain transactions (opening and closing the channel).</p>
              </div>
            </div>
          )}
        </div>

        <div className="commander-mastery">
          <h4>👑 Network Commander Mastery</h4>
          <div className="mastery-display">
            <div className="command-rank">
              <Crown className="w-12 h-12 text-yellow-400" />
              <div className="rank-info">
                <h5>Command Rank: {
                  userInsights.networkCommand >= 80 ? 'Grand Admiral' :
                  userInsights.networkCommand >= 60 ? 'Fleet Commander' :
                  userInsights.networkCommand >= 40 ? 'Squadron Leader' :
                  'Cadet'
                }</h5>
                <p>Network Mastery: {userInsights.networkCommand}%</p>
              </div>
            </div>
            <div className="command-achievements">
              <div className={`achievement ${mempoolView === 'analysis' ? 'unlocked' : 'locked'}`}>
                🎯 Market Analyst
              </div>
              <div className={`achievement ${lightningDemo ? 'unlocked' : 'locked'}`}>
                ⚡ Lightning Pioneer  
              </div>
              <div className={`achievement ${userInsights.networkCommand >= 50 ? 'unlocked' : 'locked'}`}>
                🌐 Global Commander
              </div>
            </div>
          </div>
        </div>

        <div className="transaction-architect-completion">
          <h3>🎉 Transaction Architect Mastery Complete!</h3>
          <div className="completion-summary">
            <p>You've transformed from a panicked user with a failed payment into a master Transaction Architect who commands the global Bitcoin network!</p>
            
            <div className="mastery-overview">
              <h4>Your Journey:</h4>
              <div className="journey-steps">
                <div className="journey-step completed">
                  🚨 Crisis Detective: Diagnosed payment failures
                </div>
                <div className="journey-step completed">
                  🔨 UTXO Alchemist: Mastered coin combination
                </div>
                <div className="journey-step completed">
                  ⚡ Fee Strategist: Commanded network priority
                </div>
                <div className="journey-step completed">
                  🛡️ Privacy Guardian: Protected financial sovereignty
                </div>
                <div className="journey-step completed">
                  ⚙️ Script Architect: Designed programmable money
                </div>
                <div className="journey-step completed">
                  🌐 Network Commander: Mastered global payment flows
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="continue-section">
          <ContinueButton onClick={handleContinue}>
            🎭 Master Bitcoin Scripts Next
          </ContinueButton>
      </div>
    </div>
  );
  }

  const renderCurrentStep = () => {
    const StepComponent = strategicSteps[currentStep].component;
    return <StepComponent />;
  };

  return (
    <div className="transactions-module">
      <div className="module-header">
        <h1 className="module-title">
          <div className="module-icon">
            <Coins className="w-12 h-12" />
          </div>
          Transaction Architect: Master Digital Money's Movement
        </h1>
        <p className="module-subtitle">Transform from payment crisis to commanding global Bitcoin flows</p>
        <div className="module-progress">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <span>{Math.round(progressPercentage)}% Complete</span>
        </div>
      </div>

      <div className="module-tabs">
        {strategicSteps.map((step, index) => (
          <div
            key={step.id}
            className={`tab ${index === currentStep ? 'active' : ''} ${completedSteps.has(index) ? 'completed' : ''}`}
            onClick={() => index <= currentStep && setCurrentStep(index)}
          >
            {step.icon}
            <div className="tab-content">
              <span className="tab-title">{step.title}</span>
              <span className="tab-subtitle">{step.subtitle}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="step-content-container">
        {renderCurrentStep()}
      </div>
    </div>
  );
};

export default TransactionsModule; 