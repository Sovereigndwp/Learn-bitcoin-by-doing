import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '../contexts/ProgressContext';
import { Zap, Trophy, Cpu, ArrowRight, ArrowLeft, Battery, Globe, TrendingUp, Calculator, BarChart3, Lightbulb, CheckCircle, AlertCircle, Clock, DollarSign } from 'lucide-react';
import { 
  ContinueButton, 
  ActionButton, 
  NavigationButton,
  InteractiveIcon
} from '../components/ui';
import ModuleCompletionButton from '../components/ModuleCompletionButton';
import '../components/ModuleCommon.css';

const MiningModule = () => {
  const { completeModule } = useProgress();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(new Set());

  // Interactive state management
  const [miningSimulation, setMiningSimulation] = useState({});
  const [energyAnalysis, setEnergyAnalysis] = useState({});
  const [difficultyData, setDifficultyData] = useState({});
  const [economicsCalculator, setEconomicsCalculator] = useState({});

  // Bitcoin Mining Learning Steps
  const miningSteps = [
    {
      id: "energy_comparison",
      title: "⚡ Energy: Bitcoin vs Traditional Banking",
      subtitle: "Compare real energy consumption data",
      component: EnergyComparison
    },
    {
      id: "proof_of_work_mechanics", 
      title: "🔨 Proof of Work Mechanics",
      subtitle: "How mining converts electricity into security",
      component: ProofOfWorkMechanics
    },
    {
      id: "difficulty_adjustment",
      title: "📊 Difficulty Adjustment System",
      subtitle: "Bitcoin's automatic security calibration", 
      component: DifficultyAdjustment
    },
    {
      id: "mining_economics",
      title: "💰 Mining Economics",
      subtitle: "Calculate profitability and network security costs",
      component: MiningEconomics
    },
    {
      id: "network_security",
      title: "🛡️ Network Security Model",
      subtitle: "How distributed mining creates unbreakable security",
      component: NetworkSecurity
    },
    {
      id: "renewable_energy",
      title: "🌱 Renewable Energy Incentives",
      subtitle: "How Bitcoin drives clean energy adoption",
      component: RenewableEnergy
    }
  ];

  // Step 1: Energy Comparison
  function EnergyComparison() {
    const [selectedComparison, setSelectedComparison] = useState('overview');
    const [energyUnits, setEnergyUnits] = useState('TWh'); // TWh, kWh, etc.

    const energyData = {
      overview: {
        title: 'Annual Energy Consumption Comparison',
        data: [
          { name: 'Bitcoin Network', consumption: 150, color: '#f7931a', note: 'Includes all mining operations globally' },
          { name: 'Traditional Banking', consumption: 460, color: '#2563eb', note: 'Bank branches, ATMs, data centers, employees commuting' },
          { name: 'Gold Mining', consumption: 240, color: '#fbbf24', note: 'Extraction, refinement, transportation, storage' },
          { name: 'YouTube', consumption: 244, color: '#ef4444', note: 'Google\'s video platform alone' },
          { name: 'Netflix', consumption: 94, color: '#dc2626', note: 'Streaming and content delivery' }
        ],
        unit: 'TWh/year'
      },
      breakdown: {
        title: 'Bitcoin Energy Breakdown',
        data: [
          { component: 'ASIC Mining Hardware', percentage: 85, description: 'Specialized chips performing hash calculations' },
          { component: 'Cooling Systems', percentage: 8, description: 'Keeping mining equipment at optimal temperature' },
          { component: 'Infrastructure', percentage: 5, description: 'Buildings, networking, maintenance' },
          { component: 'Transportation & Setup', percentage: 2, description: 'Moving and installing equipment' }
        ]
      },
      banking: {
        title: 'Traditional Banking Energy Breakdown',
        data: [
          { component: 'Bank Branches', percentage: 35, description: '85,000+ branches worldwide with lighting, heating, computers' },
          { component: 'Data Centers', percentage: 25, description: 'Processing transactions, storing records, running systems' },
          { component: 'ATM Network', percentage: 15, description: '3+ million ATMs operating 24/7 globally' },
          { component: 'Employee Commuting', percentage: 12, description: 'Millions of bank employees traveling to work' },
          { component: 'Card Processing', percentage: 8, description: 'Visa, Mastercard, and payment processor infrastructure' },
          { component: 'Regulatory Compliance', percentage: 5, description: 'Government oversight and reporting systems' }
        ]
      }
    };

    const currentData = energyData[selectedComparison];

    const calculateRelativeUsage = (bitcoinTWh, comparisonTWh) => {
      if (bitcoinTWh > comparisonTWh) {
        return `${(bitcoinTWh / comparisonTWh).toFixed(1)}x more than ${comparisonTWh} TWh`;
      } else {
        return `${(comparisonTWh / bitcoinTWh).toFixed(1)}x less than ${comparisonTWh} TWh`;
      }
    };

        return (
      <div className="energy-comparison">
        <div className="module-header">
          <h2>⚡ Energy Reality Check: Bitcoin vs The World</h2>
          <p>Let's examine actual energy consumption data and see how Bitcoin compares...</p>
            </div>

        <div className="comparison-tabs">
          <button 
            className={`tab ${selectedComparison === 'overview' ? 'active' : ''}`}
            onClick={() => setSelectedComparison('overview')}
          >
            Global Comparison
          </button>
          <button 
            className={`tab ${selectedComparison === 'breakdown' ? 'active' : ''}`}
            onClick={() => setSelectedComparison('breakdown')}
          >
            Bitcoin Breakdown
          </button>
          <button 
            className={`tab ${selectedComparison === 'banking' ? 'active' : ''}`}
            onClick={() => setSelectedComparison('banking')}
          >
            Banking Breakdown
          </button>
              </div>

        <div className="energy-visualization">
          <h3>{currentData.title}</h3>
          
          {selectedComparison === 'overview' && (
            <div className="consumption-chart">
              {currentData.data.map((item, index) => (
                <div key={index} className="consumption-bar">
                  <div className="bar-info">
                    <span className="bar-name">{item.name}</span>
                    <span className="bar-value">{item.consumption} {currentData.unit}</span>
              </div>
                  <div className="bar-container">
                    <div 
                      className="bar-fill"
                      style={{ 
                        width: `${(item.consumption / 500) * 100}%`,
                        backgroundColor: item.color 
                      }}
                    />
              </div>
                  <div className="bar-note">{item.note}</div>
            </div>
              ))}
          </div>
          )}

          {(selectedComparison === 'breakdown' || selectedComparison === 'banking') && (
            <div className="breakdown-chart">
              {currentData.data.map((item, index) => (
                <div key={index} className="breakdown-item">
                  <div className="breakdown-header">
                    <span className="breakdown-component">{item.component}</span>
                    <span className="breakdown-percentage">{item.percentage}%</span>
              </div>
                  <div className="breakdown-bar">
                    <div 
                      className="breakdown-fill"
                      style={{ width: `${item.percentage}%` }}
                    />
              </div>
                  <div className="breakdown-description">{item.description}</div>
              </div>
              ))}
            </div>
          )}
          </div>

        <div className="energy-insights">
          <h3>💡 Key Energy Insights</h3>
          <div className="insights-grid">
            <div className="insight-card">
              <Battery className="w-6 h-6" />
              <h4>Bitcoin is More Efficient</h4>
              <p>Bitcoin uses ~3x less energy than traditional banking while serving as a global monetary system 24/7.</p>
          </div>
            <div className="insight-card">
              <Globe className="w-6 h-6" />
              <h4>Global Perspective</h4>
              <p>Bitcoin's energy use is comparable to a single streaming service but secures a $1+ trillion network.</p>
        </div>
            <div className="insight-card">
              <Zap className="w-6 h-6" />
              <div>
                <h4>Energy = Security</h4>
                <p>Unlike other energy uses, Bitcoin's energy directly converts to network security and monetary sovereignty.</p>
              </div>
              </div>
            </div>
            </div>

        <div className="energy-calculator">
          <h3>🧮 Personal Energy Calculator</h3>
          <p>How does your energy usage compare to Bitcoin?</p>
          
          <div className="calculator-examples">
            <div className="example-card">
              <h4>🏠 Average Home (US)</h4>
              <div className="example-stats">
                <span>10,500 kWh/year</span>
                <span>= 0.0000105 TWh/year</span>
              </div>
              <div className="comparison-note">
                Bitcoin network = 14.3 million homes
              </div>
              </div>
            
            <div className="example-card">
              <h4>✈️ Round-trip Flight (NYC-London)</h4>
              <div className="example-stats">
                <span>~3,000 kWh per passenger</span>
                <span>= 50 million flights/year</span>
              </div>
              <div className="comparison-note">
                Bitcoin's annual energy = 50M transatlantic flights
            </div>
            </div>
          </div>
        </div>

        <ContinueButton onClick={() => setCurrentStep(1)}>
          Learn Proof of Work <ArrowRight className="w-4 h-4" />
        </ContinueButton>
      </div>
    );
  }

  // Step 2: Proof of Work Mechanics
  function ProofOfWorkMechanics() {
    const [hashRate, setHashRate] = useState(100); // TH/s
    const [powerConsumption, setPowerConsumption] = useState(3250); // Watts
    const [electricityCost, setElectricityCost] = useState(0.05); // $/kWh
    const [calculationResults, setCalculationResults] = useState({});

    const calculateMiningMetrics = () => {
      // Calculate daily costs and revenue estimates
      const dailyPowerCost = (powerConsumption / 1000) * 24 * electricityCost;
      const hashesPerSecond = hashRate * 1e12; // Convert TH/s to H/s
      const hashesPerDay = hashesPerSecond * 86400;
      
      // Rough Bitcoin network stats (these would be dynamic in a real app)
      const networkHashRate = 400e18; // 400 EH/s
      const blockReward = 6.25; // BTC
      const bitcoinPrice = 43000; // USD (example)
      const blocksPerDay = 144;
      
      const shareOfNetwork = hashesPerSecond / networkHashRate;
      const expectedDailyBitcoin = shareOfNetwork * blocksPerDay * blockReward;
      const expectedDailyRevenue = expectedDailyBitcoin * bitcoinPrice;
      const dailyProfit = expectedDailyRevenue - dailyPowerCost;
      
      const efficiency = hashRate / (powerConsumption / 1000); // TH/s per kW
      
      setCalculationResults({
        dailyPowerCost,
        hashesPerDay,
        shareOfNetwork: shareOfNetwork * 100,
        expectedDailyBitcoin,
        expectedDailyRevenue,
        dailyProfit,
        efficiency,
        paybackPeriod: dailyProfit > 0 ? (10000 / dailyProfit) : Infinity // Assuming $10k hardware cost
      });
    };

    useEffect(() => {
      calculateMiningMetrics();
    }, [hashRate, powerConsumption, electricityCost, calculateMiningMetrics]);

    const securityConcepts = [
      {
        title: 'Work = Security',
        description: 'The computational work required to mine blocks makes the network secure',
        example: 'To attack Bitcoin, you\'d need to outcompete all honest miners combined'
      },
      {
        title: 'Energy Investment',
        description: 'Miners invest real-world energy that cannot be faked or undone',
        example: 'Each hash attempt costs real electricity - attacks become financially ruinous'
      },
      {
        title: 'Probabilistic Security',
        description: 'More computational work = exponentially higher security',
        example: '6 confirmations = 99.9999% certainty your transaction is permanent'
      }
    ];

        return (
      <div className="proof-of-work-mechanics">
        <div className="module-header">
          <h2>🔨 Proof of Work: Converting Electricity to Security</h2>
          <p>Understanding how physical energy creates digital security...</p>
          </div>

        <div className="mining-calculator">
          <h3>⚖️ Interactive Mining Calculator</h3>
          <p>Adjust the parameters to see how mining economics work:</p>
          
          <div className="calculator-inputs">
            <div className="input-group">
              <label>Hash Rate (TH/s):</label>
              <input
                type="number"
                value={hashRate}
                onChange={(e) => setHashRate(parseFloat(e.target.value) || 0)}
                min="0"
                step="10"
              />
              <span className="input-note">Higher = more mining power</span>
          </div>
            
            <div className="input-group">
              <label>Power Consumption (Watts):</label>
              <input
                type="number"
                value={powerConsumption}
                onChange={(e) => setPowerConsumption(parseFloat(e.target.value) || 0)}
                min="0"
                step="100"
              />
              <span className="input-note">Energy usage of mining equipment</span>
            </div>
            
            <div className="input-group">
              <label>Electricity Cost ($/kWh):</label>
              <input
                type="number"
                value={electricityCost}
                onChange={(e) => setElectricityCost(parseFloat(e.target.value) || 0)}
                min="0"
                step="0.01"
              />
              <span className="input-note">Cost of electricity in your area</span>
            </div>
          </div>

          <div className="calculation-results">
            <div className="result-card">
              <h4>💰 Daily Economics</h4>
              <div className="result-row">
                <span>Power Cost:</span>
                <span>${calculationResults.dailyPowerCost?.toFixed(2)}</span>
        </div>
              <div className="result-row">
                <span>Expected Revenue:</span>
                <span>${calculationResults.expectedDailyRevenue?.toFixed(2)}</span>
      </div>
              <div className="result-row">
                <span>Daily Profit:</span>
                <span className={calculationResults.dailyProfit > 0 ? 'profit' : 'loss'}>
                  ${calculationResults.dailyProfit?.toFixed(2)}
                </span>
              </div>
            </div>
            
            <div className="result-card">
              <h4>📊 Performance Metrics</h4>
              <div className="result-row">
                <span>Network Share:</span>
                <span>{calculationResults.shareOfNetwork?.toExponential(2)}%</span>
        </div>
              <div className="result-row">
                <span>Efficiency:</span>
                <span>{calculationResults.efficiency?.toFixed(2)} TH/s per kW</span>
              </div>
              <div className="result-row">
                <span>Hardware Payback:</span>
                <span>
                  {calculationResults.paybackPeriod === Infinity 
                    ? 'Never (unprofitable)' 
                    : `${calculationResults.paybackPeriod?.toFixed(0)} days`
                  }
                </span>
              </div>
            </div>
        </div>
      </div>

        <div className="security-concepts">
          <h3>🛡️ How Work Creates Security</h3>
          <div className="concepts-grid">
            {securityConcepts.map((concept, index) => (
              <div key={index} className="concept-card">
                <h4>{concept.title}</h4>
                <p>{concept.description}</p>
                <div className="concept-example">
                  <Lightbulb className="w-4 h-4" />
                  <span>{concept.example}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pow-visualization">
          <h3>🔍 Mining Process Visualization</h3>
          <div className="process-steps">
            <div className="process-step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h4>Collect Transactions</h4>
                <p>Gather pending transactions from the mempool</p>
      </div>
            </div>
            <div className="process-step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h4>Create Block Header</h4>
                <p>Include previous block hash, merkle root, timestamp</p>
              </div>
            </div>
            <div className="process-step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h4>Try Nonce Values</h4>
                <p>Increment nonce and hash until difficulty target is met</p>
              </div>
            </div>
            <div className="process-step">
              <div className="step-number">4</div>
              <div className="step-content">
                <h4>Broadcast Block</h4>
                <p>Share the valid block with the network for verification</p>
              </div>
            </div>
          </div>
        </div>

        <div className="energy-security-connection">
          <h3>⚡ The Energy-Security Connection</h3>
          <div className="connection-facts">
            <div className="fact-card">
              <Cpu className="w-6 h-6" />
              <div>
                <h4>Physical Constraints</h4>
                <p>Mining requires real electricity and hardware. You can't fake computational work.</p>
              </div>
            </div>
            <div className="fact-card">
              <DollarSign className="w-6 h-6" />
              <div>
                <h4>Economic Incentives</h4>
                <p>Honest mining is profitable; attacking the network would cost billions and destroy the value of the reward.</p>
              </div>
            </div>
            <div className="fact-card">
              <Clock className="w-6 h-6" />
              <div>
                <h4>Time and Effort</h4>
                <p>Past blocks become increasingly expensive to change as more work is built on top of them.</p>
              </div>
            </div>
          </div>
        </div>

        <ContinueButton onClick={() => setCurrentStep(2)}>
          Explore Difficulty Adjustment <ArrowRight className="w-4 h-4" />
        </ContinueButton>
    </div>
  );
  }

  // Step 3: Difficulty Adjustment
  function DifficultyAdjustment() {
    const [simulationData, setSimulationData] = useState({
      currentDifficulty: 50000000000000,
      targetTime: 600, // 10 minutes in seconds
      actualTime: 600,
      hashRate: 400000000, // TH/s
      blocks: []
    });

    const [adjustmentScenario, setAdjustmentScenario] = useState('stable');

    const scenarios = {
      stable: {
        name: 'Stable Network',
        description: 'Hash rate remains constant',
        hashRateChange: 0,
        expectedAdjustment: 0
      },
      influx: {
        name: 'Mining Influx',
        description: 'New miners join (+50% hash rate)',
        hashRateChange: 50,
        expectedAdjustment: 50
      },
      exodus: {
        name: 'Mining Exodus',
        description: 'Miners leave (-30% hash rate)',
        hashRateChange: -30,
        expectedAdjustment: -23
      },
      halvening: {
        name: 'Post-Halvening',
        description: 'Reward halves, some miners quit (-20%)',
        hashRateChange: -20,
        expectedAdjustment: -17
      }
    };

    const simulateAdjustment = () => {
      const scenario = scenarios[adjustmentScenario];
      const newHashRate = simulationData.hashRate * (1 + scenario.hashRateChange / 100);
      const newBlockTime = simulationData.targetTime * (simulationData.hashRate / newHashRate);
      
      // Calculate difficulty adjustment (every 2016 blocks)
      const timeRatio = newBlockTime / simulationData.targetTime;
      const adjustmentFactor = Math.max(0.25, Math.min(4, timeRatio)); // Clamped between 25% and 400%
      const newDifficulty = simulationData.currentDifficulty / adjustmentFactor;
      
      setSimulationData(prev => ({
        ...prev,
        actualTime: newBlockTime,
        hashRate: newHashRate,
        blocks: [
          ...prev.blocks.slice(-10), // Keep last 10 for visualization
          {
            id: prev.blocks.length + 1,
            time: newBlockTime,
            difficulty: newDifficulty,
            hashRate: newHashRate
          }
        ]
      }));
    };

    const formatHashRate = (hashRate) => {
      if (hashRate >= 1e6) {
        return `${(hashRate / 1e6).toFixed(1)} EH/s`;
      } else if (hashRate >= 1e3) {
        return `${(hashRate / 1e3).toFixed(1)} PH/s`;
      } else {
        return `${hashRate.toFixed(1)} TH/s`;
      }
    };

    const formatDifficulty = (difficulty) => {
      return (difficulty / 1e12).toFixed(2) + 'T';
  };

  return (
      <div className="difficulty-adjustment">
        <div className="module-header">
          <h2>📊 Difficulty Adjustment: Bitcoin's Thermostat</h2>
          <p>How Bitcoin automatically maintains 10-minute blocks...</p>
      </div>

        <div className="adjustment-explanation">
          <div className="concept-card">
            <h3>The Difficulty Adjustment Algorithm</h3>
            <p>Every 2,016 blocks (~2 weeks), Bitcoin measures the actual time it took to mine those blocks and adjusts the difficulty to maintain an average of 10 minutes per block.</p>
            
            <div className="algorithm-formula">
              <div className="formula">
                <span>New Difficulty = Current Difficulty × (14 days / Actual Time)</span>
          </div>
              <div className="formula-note">
                Clamped between 25% and 400% to prevent extreme adjustments
              </div>
            </div>
          </div>
        </div>

        <div className="difficulty-simulator">
          <h3>🎮 Difficulty Adjustment Simulator</h3>
          
          <div className="scenario-selector">
            <label>Choose a scenario:</label>
            <select 
              value={adjustmentScenario} 
              onChange={(e) => setAdjustmentScenario(e.target.value)}
            >
              {Object.entries(scenarios).map(([key, scenario]) => (
                <option key={key} value={key}>
                  {scenario.name} - {scenario.description}
                </option>
              ))}
            </select>
      </div>

          <div className="current-stats">
            <div className="stat-card">
              <h4>Current Network Hash Rate</h4>
              <div className="stat-value">{formatHashRate(simulationData.hashRate)}</div>
              </div>
            <div className="stat-card">
              <h4>Current Difficulty</h4>
              <div className="stat-value">{formatDifficulty(simulationData.currentDifficulty)}</div>
      </div>
            <div className="stat-card">
              <h4>Average Block Time</h4>
              <div className="stat-value">{(simulationData.actualTime / 60).toFixed(1)} min</div>
          </div>
        </div>

          <ActionButton onClick={simulateAdjustment} className="primary">
            <Calculator className="w-4 h-4" />
            Simulate Adjustment
          </ActionButton>

          {simulationData.blocks.length > 0 && (
            <div className="adjustment-results">
              <h4>📈 Adjustment History</h4>
              <div className="blocks-timeline">
                {simulationData.blocks.slice(-5).map((block, index) => (
                  <div key={block.id} className="block-card">
                    <div className="block-header">Block Period #{block.id}</div>
                    <div className="block-stats">
                      <div>Time: {(block.time / 60).toFixed(1)} min</div>
                      <div>Difficulty: {formatDifficulty(block.difficulty)}</div>
                      <div>Hash Rate: {formatHashRate(block.hashRate)}</div>
                    </div>
            </div>
          ))}
        </div>
      </div>
          )}
    </div>

        <div className="historical-adjustments">
          <h3>📚 Historical Difficulty Milestones</h3>
          <div className="milestones-grid">
            <div className="milestone-card">
              <h4>Genesis Block (2009)</h4>
              <div className="milestone-stats">
                <span>Difficulty: 1</span>
                <span>Hash Rate: ~7 MH/s</span>
              </div>
              <p>Satoshi mining alone on a CPU</p>
      </div>

            <div className="milestone-card">
              <h4>GPU Era (2010)</h4>
              <div className="milestone-stats">
                <span>Difficulty: ~1,000</span>
                <span>Hash Rate: ~100 MH/s</span>
        </div>
              <p>Graphics cards take over from CPUs</p>
      </div>

            <div className="milestone-card">
              <h4>ASIC Revolution (2013)</h4>
              <div className="milestone-stats">
                <span>Difficulty: ~10M</span>
                <span>Hash Rate: ~10 TH/s</span>
            </div>
              <p>Specialized mining hardware emerges</p>
        </div>

            <div className="milestone-card">
              <h4>Today (2024)</h4>
              <div className="milestone-stats">
                <span>Difficulty: ~50T</span>
                <span>Hash Rate: ~400 EH/s</span>
          </div>
              <p>Industrial-scale mining operations</p>
          </div>
        </div>
      </div>

        <div className="adjustment-importance">
          <h3>🎯 Why Difficulty Adjustment Matters</h3>
          <div className="importance-grid">
            <div className="importance-card">
              <Clock className="w-6 h-6" />
              <h4>Predictable Blocks</h4>
              <p>Ensures Bitcoin blocks arrive roughly every 10 minutes regardless of mining power changes</p>
            </div>
            <div className="importance-card">
              <BarChart3 className="w-6 h-6" />
              <h4>Supply Schedule</h4>
              <p>Maintains the predictable Bitcoin issuance rate that leads to the 21 million limit</p>
                </div>
            <div className="importance-card">
              <Zap className="w-6 h-6" />
              <h4>Network Stability</h4>
              <p>Prevents the network from becoming too fast or too slow as miners join or leave</p>
                </div>
              </div>
              </div>

        <ContinueButton onClick={() => setCurrentStep(3)}>
          Analyze Mining Economics <ArrowRight className="w-4 h-4" />
        </ContinueButton>
    </div>
  );
  }

  // Step 4: Mining Economics
  function MiningEconomics() {
    const [economicsInputs, setEconomicsInputs] = useState({
      hashRate: 100, // TH/s
      powerConsumption: 3250, // Watts
      electricityCost: 0.05, // $/kWh
      hardwareCost: 10000, // $
      bitcoinPrice: 43000, // $
      poolFee: 1 // %
    });

    const [analysisResults, setAnalysisResults] = useState({});
    const [profitabilityChart, setProfitabilityChart] = useState([]);

    const calculateEconomics = () => {
      const { hashRate, powerConsumption, electricityCost, hardwareCost, bitcoinPrice, poolFee } = economicsInputs;
      
      // Network assumptions (would be live data in production)
      const networkHashRate = 400e18; // 400 EH/s
      const blockReward = 6.25; // BTC
      const blocksPerDay = 144;
      const difficulty = 50e12;
      
      // Daily calculations
      const hashesPerSecond = hashRate * 1e12;
      const shareOfNetwork = hashesPerSecond / networkHashRate;
      const dailyBitcoinEarned = shareOfNetwork * blocksPerDay * blockReward;
      const dailyGrossRevenue = dailyBitcoinEarned * bitcoinPrice;
      const poolFeeCost = dailyGrossRevenue * (poolFee / 100);
      const dailyNetRevenue = dailyGrossRevenue - poolFeeCost;
      
      const dailyPowerCost = (powerConsumption / 1000) * 24 * electricityCost;
      const dailyProfit = dailyNetRevenue - dailyPowerCost;
      
      // Break-even calculations
      const breakEvenElectricityCost = dailyNetRevenue / ((powerConsumption / 1000) * 24);
      const breakEvenBitcoinPrice = (dailyPowerCost + poolFeeCost) / dailyBitcoinEarned;
      const paybackPeriod = hardwareCost / Math.max(dailyProfit, 0.01);
      
      // Efficiency metrics
      const efficiency = hashRate / (powerConsumption / 1000); // TH/s per kW
      const profitMargin = (dailyProfit / dailyGrossRevenue) * 100;
      
      setAnalysisResults({
        dailyBitcoinEarned,
        dailyGrossRevenue,
        poolFeeCost,
        dailyNetRevenue,
        dailyPowerCost,
        dailyProfit,
        breakEvenElectricityCost,
        breakEvenBitcoinPrice,
        paybackPeriod,
        efficiency,
        profitMargin,
        shareOfNetwork: shareOfNetwork * 100
      });
      
      // Generate profitability chart for different Bitcoin prices
      const priceRange = [];
      for (let price = 20000; price <= 80000; price += 5000) {
        const revenue = dailyBitcoinEarned * price * (1 - poolFee / 100);
        const profit = revenue - dailyPowerCost;
        priceRange.push({ price, profit, profitable: profit > 0 });
      }
      setProfitabilityChart(priceRange);
    };

    useEffect(() => {
      calculateEconomics();
    }, [economicsInputs, calculateEconomics]);

    const updateInput = (key, value) => {
      setEconomicsInputs(prev => ({
        ...prev,
        [key]: parseFloat(value) || 0
      }));
    };

  return (
      <div className="mining-economics">
        <div className="module-header">
          <h2>💰 Mining Economics: The Business of Security</h2>
          <p>Understanding the financial mechanics that secure Bitcoin...</p>
      </div>

        <div className="economics-calculator">
          <h3>📊 Mining Profitability Calculator</h3>
          
          <div className="inputs-grid">
            <div className="input-group">
              <label>Hash Rate (TH/s):</label>
              <input
                type="number"
                value={economicsInputs.hashRate}
                onChange={(e) => updateInput('hashRate', e.target.value)}
                step="10"
                min="0"
              />
          </div>

            <div className="input-group">
              <label>Power (Watts):</label>
              <input
                type="number"
                value={economicsInputs.powerConsumption}
                onChange={(e) => updateInput('powerConsumption', e.target.value)}
                step="100"
                min="0"
              />
          </div>
            
            <div className="input-group">
              <label>Electricity ($/kWh):</label>
              <input
                type="number"
                value={economicsInputs.electricityCost}
                onChange={(e) => updateInput('electricityCost', e.target.value)}
                step="0.01"
                min="0"
              />
          </div>
            
            <div className="input-group">
              <label>Hardware Cost ($):</label>
              <input
                type="number"
                value={economicsInputs.hardwareCost}
                onChange={(e) => updateInput('hardwareCost', e.target.value)}
                step="1000"
                min="0"
              />
          </div>
            
            <div className="input-group">
              <label>Bitcoin Price ($):</label>
              <input
                type="number"
                value={economicsInputs.bitcoinPrice}
                onChange={(e) => updateInput('bitcoinPrice', e.target.value)}
                step="1000"
                min="0"
              />
        </div>

            <div className="input-group">
              <label>Pool Fee (%):</label>
              <input
                type="number"
                value={economicsInputs.poolFee}
                onChange={(e) => updateInput('poolFee', e.target.value)}
                step="0.5"
                min="0"
                max="10"
              />
          </div>
          </div>
        </div>

        <div className="economics-results">
          <div className="results-grid">
            <div className="result-card">
              <h4>💰 Daily Economics</h4>
              <div className="result-row">
                <span>Bitcoin Earned:</span>
                <span>{analysisResults.dailyBitcoinEarned?.toFixed(8)} BTC</span>
        </div>
              <div className="result-row">
                <span>Gross Revenue:</span>
                <span>${analysisResults.dailyGrossRevenue?.toFixed(2)}</span>
      </div>
              <div className="result-row">
                <span>Pool Fee:</span>
                <span>-${analysisResults.poolFeeCost?.toFixed(2)}</span>
        </div>
              <div className="result-row">
                <span>Power Cost:</span>
                <span>-${analysisResults.dailyPowerCost?.toFixed(2)}</span>
              </div>
              <div className="result-row profit-loss">
                <span>Daily Profit:</span>
                <span className={analysisResults.dailyProfit > 0 ? 'profit' : 'loss'}>
                  ${analysisResults.dailyProfit?.toFixed(2)}
                </span>
              </div>
      </div>

            <div className="result-card">
              <h4>📈 Break-Even Analysis</h4>
              <div className="result-row">
                <span>Break-even Electricity:</span>
                <span>${analysisResults.breakEvenElectricityCost?.toFixed(3)}/kWh</span>
            </div>
              <div className="result-row">
                <span>Break-even BTC Price:</span>
                <span>${analysisResults.breakEvenBitcoinPrice?.toFixed(0)}</span>
              </div>
              <div className="result-row">
                <span>Hardware Payback:</span>
                <span>
                  {analysisResults.paybackPeriod > 365 
                    ? `${(analysisResults.paybackPeriod / 365).toFixed(1)} years`
                    : `${analysisResults.paybackPeriod?.toFixed(0)} days`
                  }
                </span>
              </div>
              <div className="result-row">
                <span>Profit Margin:</span>
                <span className={analysisResults.profitMargin > 0 ? 'profit' : 'loss'}>
                  {analysisResults.profitMargin?.toFixed(1)}%
                </span>
              </div>
            </div>
            
            <div className="result-card">
              <h4>⚡ Efficiency Metrics</h4>
              <div className="result-row">
                <span>Hash Rate Efficiency:</span>
                <span>{analysisResults.efficiency?.toFixed(2)} TH/s per kW</span>
            </div>
              <div className="result-row">
                <span>Network Share:</span>
                <span>{analysisResults.shareOfNetwork?.toExponential(2)}%</span>
          </div>
              <div className="result-row">
                <span>Revenue per TH/s:</span>
                <span>${(analysisResults.dailyNetRevenue / economicsInputs.hashRate)?.toFixed(4)}</span>
        </div>
            </div>
        </div>
      </div>

        {profitabilityChart.length > 0 && (
          <div className="profitability-chart">
            <h3>📊 Profitability vs Bitcoin Price</h3>
            <div className="chart-container">
              {profitabilityChart.map((point, index) => (
                <div key={index} className="chart-point">
                  <div className="price-label">${(point.price / 1000).toFixed(0)}k</div>
                  <div 
                    className={`profit-bar ${point.profitable ? 'profitable' : 'unprofitable'}`}
                    style={{ 
                      height: `${Math.max(Math.abs(point.profit) / 100, 5)}px`,
                      marginTop: point.profit < 0 ? '50px' : '0'
                    }}
                  />
                  <div className="profit-value">${point.profit.toFixed(0)}</div>
            </div>
          ))}
            </div>
                </div>
        )}

        <div className="economics-insights">
          <h3>💡 Economic Security Insights</h3>
          <div className="insights-grid">
            <div className="insight-card">
              <TrendingUp className="w-6 h-6" />
              <h4>Market-Driven Security</h4>
              <p>As Bitcoin price rises, more miners join, increasing network security. Price and security are linked.</p>
                </div>
            <div className="insight-card">
              <Zap className="w-6 h-6" />
              <h4>Efficiency Pressure</h4>
              <p>Miners constantly upgrade to more efficient hardware to stay competitive, driving technological innovation.</p>
            </div>
            <div className="insight-card">
              <DollarSign className="w-6 h-6" />
              <h4>Global Competition</h4>
              <p>Mining operates in a global market - the most efficient operations in the cheapest energy locations survive.</p>
            </div>
          </div>
        </div>

        <ContinueButton onClick={() => setCurrentStep(4)}>
          Learn Network Security <ArrowRight className="w-4 h-4" />
        </ContinueButton>
    </div>
  );
  }

  // Step 5: Network Security
  function NetworkSecurity() {
    const [attackScenario, setAttackScenario] = useState('51percent');
  const [networkStats] = useState({
      totalHashRate: 400, // EH/s
      totalMiners: 1000000,
      countries: 50,
      estimatedCost: 20000000000 // $20B
    });

    const attackScenarios = {
      '51percent': {
        name: '51% Attack',
        description: 'Attacker controls majority of network hash rate',
        requirements: {
          hashRate: '200+ EH/s',
          cost: '$10+ billion',
          hardware: '1 million ASIC miners',
          electricity: '75 TWh/year'
        },
        challenges: [
          'Need to outpace all honest miners combined',
          'Massive upfront hardware investment',
          'Ongoing electricity costs of small country',
          'Success would crash Bitcoin price, destroying investment',
          'Network would likely fork to exclude attacker'
        ],
        likelihood: 'Economically irrational'
      },
      'doublespend': {
        name: 'Double Spend Attack',
        description: 'Attacker tries to reverse a specific transaction',
        requirements: {
          hashRate: 'Variable (depends on confirmations)',
          cost: '$50M+ per attempt',
          hardware: 'Rent existing miners',
          electricity: 'Massive burst consumption'
        },
        challenges: [
          'Success probability decreases exponentially with confirmations',
          'Most valuable transactions require many confirmations',
          'Detection would trigger network response',
          'Only works for recent transactions',
          'Requires precise timing'
        ],
        likelihood: 'Possible but extremely expensive'
      },
      'poolattack': {
        name: 'Mining Pool Attack',
        description: 'Compromise large mining pools',
        requirements: {
          hashRate: 'Pool dependent',
          cost: 'Hacking/social engineering',
          hardware: 'Use existing pool hardware',
          electricity: 'Pool pays'
        },
        challenges: [
          'Pool operators can detect unusual behavior',
          'Miners can quickly switch pools',
          'Multiple pools would need coordination',
          'Temporary at best',
          'Reputation damage to pools'
        ],
        likelihood: 'Limited impact, easily mitigated'
      }
    };

    const currentScenario = attackScenarios[attackScenario];

    const calculateAttackCost = () => {
      const asicPrice = 10000; // Average ASIC cost
      const asicHashRate = 100; // TH/s per ASIC
      const targetHashRate = 200e6; // 200 EH/s for 51% attack
      
      const requiredAsics = targetHashRate / asicHashRate;
      const hardwareCost = requiredAsics * asicPrice;
      const powerConsumption = requiredAsics * 3.25; // kW per ASIC
      const dailyElectricityCost = powerConsumption * 24 * 0.05; // Assuming $0.05/kWh
      
      return {
        requiredAsics: requiredAsics.toLocaleString(),
        hardwareCost: `$${(hardwareCost / 1e9).toFixed(1)}B`,
        powerConsumption: `${(powerConsumption / 1e6).toFixed(1)} GW`,
        dailyElectricityCost: `$${(dailyElectricityCost / 1e6).toFixed(1)}M/day`
      };
    };

    const attackCosts = calculateAttackCost();

  return (
      <div className="network-security">
        <div className="module-header">
          <h2>🛡️ Network Security: Why Bitcoin is Unbreakable</h2>
          <p>Analyzing the economic and technical barriers to attacking Bitcoin...</p>
      </div>

        <div className="security-overview">
          <h3>🌐 Network Security Stats</h3>
          <div className="stats-grid">
            <div className="stat-card">
              <h4>Total Hash Rate</h4>
              <div className="stat-value">{networkStats.totalHashRate} EH/s</div>
              <div className="stat-note">400,000,000,000,000,000,000 hashes/second</div>
                </div>
            <div className="stat-card">
              <h4>Estimated Miners</h4>
              <div className="stat-value">{networkStats.totalMiners.toLocaleString()}</div>
              <div className="stat-note">Distributed globally</div>
                </div>
            <div className="stat-card">
              <h4>Countries</h4>
              <div className="stat-value">{networkStats.countries}+</div>
              <div className="stat-note">Mining operations worldwide</div>
                </div>
            <div className="stat-card">
              <h4>Attack Cost</h4>
              <div className="stat-value">$20B+</div>
              <div className="stat-note">To attempt 51% attack</div>
              </div>
          </div>
          </div>

        <div className="attack-scenarios">
          <h3>⚔️ Attack Scenario Analysis</h3>
          
          <div className="scenario-selector">
            <label>Choose attack type:</label>
            <select 
              value={attackScenario} 
              onChange={(e) => setAttackScenario(e.target.value)}
            >
              {Object.entries(attackScenarios).map(([key, scenario]) => (
                <option key={key} value={key}>
                  {scenario.name}
                </option>
              ))}
            </select>
                </div>

          <div className="scenario-analysis">
            <div className="scenario-card">
              <h4>{currentScenario.name}</h4>
              <p>{currentScenario.description}</p>
              
              <div className="requirements-section">
                <h5>📋 Requirements</h5>
                <div className="requirements-grid">
                  {Object.entries(currentScenario.requirements).map(([key, value]) => (
                    <div key={key} className="requirement-item">
                      <span className="requirement-label">{key.charAt(0).toUpperCase() + key.slice(1)}:</span>
                      <span className="requirement-value">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="challenges-section">
                <h5>🚧 Challenges</h5>
                <ul className="challenges-list">
                  {currentScenario.challenges.map((challenge, index) => (
                    <li key={index}>{challenge}</li>
                    ))}
                  </ul>
                </div>

              <div className="likelihood-section">
                <h5>🎯 Likelihood</h5>
                <div className={`likelihood ${currentScenario.likelihood.includes('impossible') || currentScenario.likelihood.includes('irrational') ? 'very-low' : 'low'}`}>
                  {currentScenario.likelihood}
                </div>
              </div>
          </div>
        </div>
      </div>

        <div className="attack-cost-breakdown">
          <h3>💰 51% Attack Cost Breakdown</h3>
          <div className="cost-grid">
            <div className="cost-card">
              <h4>Hardware Required</h4>
              <div className="cost-value">{attackCosts.requiredAsics} ASIC miners</div>
              <div className="cost-detail">Cost: {attackCosts.hardwareCost}</div>
            </div>
            <div className="cost-card">
              <h4>Power Consumption</h4>
              <div className="cost-value">{attackCosts.powerConsumption}</div>
              <div className="cost-detail">Same as Argentina's power grid</div>
            </div>
            <div className="cost-card">
              <h4>Daily Electricity</h4>
              <div className="cost-value">{attackCosts.dailyElectricityCost}</div>
              <div className="cost-detail">Ongoing operational cost</div>
            </div>
        </div>
      </div>

        <div className="security-features">
          <h3>🔒 Built-in Security Features</h3>
          <div className="features-grid">
            <div className="feature-card">
              <CheckCircle className="w-6 h-6" />
              <h4>Distributed Mining</h4>
              <p>No single entity controls majority of hash rate. Miners spread across globe.</p>
              </div>
            <div className="feature-card">
              <CheckCircle className="w-6 h-6" />
              <h4>Economic Incentives</h4>
              <p>Honest mining is profitable. Attacking destroys the value of your investment.</p>
          </div>
            <div className="feature-card">
              <CheckCircle className="w-6 h-6" />
              <h4>Transparent Operation</h4>
              <p>All mining activity is visible. Unusual behavior is quickly detected.</p>
        </div>
            <div className="feature-card">
              <CheckCircle className="w-6 h-6" />
              <h4>Confirmation Depth</h4>
              <p>Important transactions wait for multiple confirmations, making attacks exponentially harder.</p>
      </div>
            <div className="feature-card">
              <CheckCircle className="w-6 h-6" />
              <h4>Network Response</h4>
              <p>Community can fork the network to exclude attackers if needed.</p>
            </div>
            <div className="feature-card">
              <CheckCircle className="w-6 h-6" />
              <h4>Ever-Increasing Cost</h4>
              <p>As Bitcoin grows, attack costs increase while benefits of attacking decrease.</p>
            </div>
          </div>
        </div>

        <ContinueButton onClick={() => setCurrentStep(5)}>
          Explore Renewable Energy <ArrowRight className="w-4 h-4" />
        </ContinueButton>
    </div>
  );
  }

  // Step 6: Renewable Energy
  function RenewableEnergy() {
    const [energyMix] = useState({
      renewable: 52.2,
      fossil: 47.8
    });

    const renewableTypes = [
      { name: 'Hydroelectric', percentage: 24.1, description: 'Dams and water flow' },
      { name: 'Wind', percentage: 12.3, description: 'Wind turbines' },
      { name: 'Solar', percentage: 8.7, description: 'Solar panels and thermal' },
      { name: 'Geothermal', percentage: 4.2, description: 'Earth\'s heat' },
      { name: 'Nuclear', percentage: 2.9, description: 'Clean but not renewable' }
    ];

    const renewableIncentives = [
      {
        title: 'Stranded Energy Monetization',
        description: 'Bitcoin mining can monetize renewable energy that would otherwise be wasted',
        examples: [
          'Hydroelectric dams with excess capacity',
          'Wind farms during peak production',
          'Solar installations with grid limitations'
        ]
      },
      {
        title: 'Grid Stabilization',
        description: 'Miners can act as flexible load, helping stabilize renewable energy grids',
        examples: [
          'Reduce operations when grid demand is high',
          'Increase operations when renewable surplus exists',
          'Provide backup load for renewable projects'
        ]
      },
      {
        title: 'Remote Location Advantage',
        description: 'Renewable energy is often located far from population centers',
        examples: [
          'Desert solar farms away from cities',
          'Mountain hydroelectric facilities',
          'Offshore wind farms'
        ]
      }
    ];

  return (
      <div className="renewable-energy">
        <div className="module-header">
          <h2>🌱 Bitcoin and Renewable Energy</h2>
          <p>How Bitcoin mining incentivizes clean energy adoption...</p>
      </div>

        <div className="energy-mix-current">
          <h3>⚡ Current Bitcoin Mining Energy Mix</h3>
          <div className="energy-pie-chart">
            <div className="pie-segment renewable" style={{ '--percentage': energyMix.renewable }}>
              <div className="pie-label">
                <span className="pie-percentage">{energyMix.renewable}%</span>
                <span className="pie-type">Renewable</span>
              </div>
            </div>
            <div className="pie-segment fossil" style={{ '--percentage': energyMix.fossil }}>
              <div className="pie-label">
                <span className="pie-percentage">{energyMix.fossil}%</span>
                <span className="pie-type">Fossil Fuels</span>
              </div>
          </div>
        </div>

          <div className="energy-breakdown">
            <h4>🔋 Renewable Energy Breakdown</h4>
            <div className="breakdown-list">
              {renewableTypes.map((type, index) => (
                <div key={index} className="breakdown-item">
                  <span className="breakdown-name">{type.name}</span>
                  <span className="breakdown-bar">
                    <div 
                      className="breakdown-fill"
                      style={{ width: `${(type.percentage / 30) * 100}%` }}
                    />
        </span>
                  <span className="breakdown-percentage">{type.percentage}%</span>
                  <span className="breakdown-description">{type.description}</span>
          </div>
              ))}
            </div>
          </div>
        </div>

        <div className="renewable-incentives">
          <h3>🎯 How Bitcoin Incentivizes Renewable Energy</h3>
          <div className="incentives-grid">
            {renewableIncentives.map((incentive, index) => (
              <div key={index} className="incentive-card">
                <h4>{incentive.title}</h4>
                <p>{incentive.description}</p>
                <div className="incentive-examples">
                  <strong>Examples:</strong>
                  <ul>
                    {incentive.examples.map((example, idx) => (
                      <li key={idx}>{example}</li>
                ))}
              </ul>
            </div>
              </div>
            ))}
            </div>
          </div>

        <div className="case-studies">
          <h3>📚 Real-World Case Studies</h3>
          <div className="case-studies-grid">
            <div className="case-study-card">
              <h4>🌊 Iceland Hydroelectric Mining</h4>
              <div className="case-study-stats">
                <span>100% renewable energy</span>
                <span>Geothermal + Hydroelectric</span>
          </div>
              <p>Iceland's abundant renewable energy has attracted major Bitcoin mining operations, utilizing excess clean energy capacity.</p>
        </div>
            
            <div className="case-study-card">
              <h4>☀️ Texas Solar + Mining</h4>
              <div className="case-study-stats">
                <span>Solar + Battery storage</span>
                <span>Grid stabilization</span>
              </div>
              <p>Texas miners use solar energy during the day and provide grid services, helping stabilize renewable energy integration.</p>
      </div>

            <div className="case-study-card">
              <h4>💨 Norwegian Wind Mining</h4>
              <div className="case-study-stats">
                <span>Hydroelectric + Wind</span>
                <span>Surplus energy use</span>
            </div>
              <p>Norwegian miners utilize excess hydroelectric and wind energy that would otherwise be curtailed or wasted.</p>
        </div>
      </div>
    </div>

        <div className="energy-transition">
          <h3>🔄 The Great Energy Transition</h3>
          <div className="transition-timeline">
            <div className="timeline-item">
              <div className="timeline-year">2017-2019</div>
              <div className="timeline-content">
                <h4>Coal Era</h4>
                <p>Early mining concentrated in regions with cheap coal power</p>
                <div className="timeline-stat">~70% fossil fuels</div>
              </div>
      </div>

            <div className="timeline-item">
              <div className="timeline-year">2020-2022</div>
              <div className="timeline-content">
                <h4>Renewable Shift</h4>
                <p>Miners move to renewable-rich regions, ESG concerns drive change</p>
                <div className="timeline-stat">~50% renewable</div>
              </div>
      </div>

            <div className="timeline-item">
              <div className="timeline-year">2023-2024</div>
              <div className="timeline-content">
                <h4>Clean Mining Majority</h4>
                <p>Renewable energy becomes majority of Bitcoin mining power</p>
                <div className="timeline-stat">~52% renewable</div>
            </div>
            </div>
            
            <div className="timeline-item">
              <div className="timeline-year">2025+</div>
              <div className="timeline-content">
                <h4>Renewable Acceleration</h4>
                <p>Continued transition as renewable costs decrease and availability increases</p>
                <div className="timeline-stat">Target: 70%+ renewable</div>
          </div>
        </div>
        </div>
      </div>

        <div className="environmental-impact">
          <h3>🌍 Environmental Impact Analysis</h3>
          <div className="impact-comparison">
            <div className="impact-card positive">
              <h4>✅ Positive Impacts</h4>
              <ul>
                <li>Accelerates renewable energy development</li>
                <li>Monetizes stranded renewable energy</li>
                <li>Provides economic incentive for clean energy</li>
                <li>Creates demand for energy innovation</li>
                <li>Enables remote renewable projects</li>
              </ul>
            </div>
            
            <div className="impact-card challenges">
              <h4>⚠️ Ongoing Challenges</h4>
              <ul>
                <li>Still ~48% fossil fuel usage</li>
                <li>Regional concentration in some areas</li>
                <li>Need for continued transition</li>
                <li>Regulatory uncertainties</li>
                <li>Public perception issues</li>
              </ul>
            </div>
            </div>
                </div>

        <div className="module-completion">
          <div className="completion-card">
            <CheckCircle className="w-8 h-8 text-green-500" />
            <h3>🎓 Mining Mastery Complete!</h3>
            <p>You now understand:</p>
            <ul>
              <li>✅ Bitcoin vs traditional banking energy consumption</li>
              <li>✅ How proof of work converts electricity to security</li>
              <li>✅ Difficulty adjustment and network stability</li>
              <li>✅ Mining economics and profitability factors</li>
              <li>✅ Network security and attack economics</li>
              <li>✅ Renewable energy incentives and adoption</li>
            </ul>

      <div className="next-steps">
              <p><strong>Key Insight:</strong> Bitcoin mining is evolving into a renewable energy-driven industry that provides monetary security while incentivizing clean energy development.</p>
                </div>
            
            <ModuleCompletionButton 
              moduleName="Bitcoin Mining"
              moduleId="mining"
              customMessage="⛏️ Excellent! You now understand how Bitcoin mining secures the network and incentivizes renewable energy!"
            />
          </div>
        </div>
    </div>
  );
  }

  // Main component render
  const currentStepData = miningSteps[currentStep];
  const StepComponent = currentStepData?.component;

  return (
    <div className="mining-module">
      <div className="module-progress">
        <div className="progress-header">
          <h1>⛏️ Bitcoin Mining Mastery</h1>
          <p>Understand how energy becomes security in the Bitcoin network</p>
      </div>

        <div className="steps-progress">
          {miningSteps.map((step, index) => (
            <div 
              key={step.id}
              className={`step-indicator ${index === currentStep ? 'active' : ''} ${completedSteps.has(index) ? 'completed' : ''}`}
            >
              <div className="step-number">{index + 1}</div>
              <div className="step-info">
                <div className="step-title">{step.title}</div>
                <div className="step-subtitle">{step.subtitle}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="step-content">
        {StepComponent && <StepComponent />}
      </div>

      <div className="module-navigation">
        {currentStep > 0 && (
          <NavigationButton 
            onClick={() => setCurrentStep(currentStep - 1)}
            direction="prev"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous Step
          </NavigationButton>
        )}
        
        <NavigationButton 
          onClick={() => navigate('/')}
          className="home-button"
        >
          Return to Homepage
        </NavigationButton>
      </div>
    </div>
  );
};

export default MiningModule; 