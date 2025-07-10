import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '../contexts/ProgressContext';
import { Zap } from 'lucide-react';
import { 
  ContinueButton, 
  ActionButton, 
  Button, 
  OptionButton
} from '../components/EnhancedButtons';
import '../components/ModuleLayout.css';
import '../components/ModuleCommon.css';
import './BitcoinBasicsModule.css';

const BitcoinBasicsModule = () => {
  const { completeModule } = useProgress();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(new Set());
  
  const handleStepComplete = (index) => {
    const newCompletedSteps = new Set(completedSteps);
    newCompletedSteps.add(index);
    setCompletedSteps(newCompletedSteps);
    
    if (index === steps.length - 1) {
      completeModule('bitcoin-basics');
      setTimeout(() => navigate('/'), 2000);
    } else {
    setCurrentStep(index + 1);
    }
  };

  const handleStepChange = (index) => {
    // Allow navigation to any step for better UX
    setCurrentStep(index);
  };

  // Energy Hook Component
  const EnergyHook = ({ content, onComplete }) => {
    const [workInput, setWorkInput] = useState(0);

    // Constants representing each system
    const efficientEfficiency = 98;   // Ice – almost frictionless
    const inefficientEfficiency = 40; // Concrete – high friction

    // Box positions based on work applied
    const efficientPosition = workInput * 3.5;
    const inefficientPosition = workInput * 0.8;

    // Energy lost calculations
    const efficientLost = Math.floor(workInput * (1 - efficientEfficiency / 100));
    const inefficientLost = Math.floor(workInput * (1 - inefficientEfficiency / 100));

    // Percentage of work converted to wasted heat in inefficient system
    const inefficientHeatPercent = workInput > 0 ? (inefficientLost / workInput) * 100 : 0;

    const handleSliderChange = (e) => {
      setWorkInput(parseInt(e.target.value));
    };

    return (
      <div className="work-efficiency-lab">
        <div className="lab-header">
          <h2>Work Efficiency Experiment</h2>
          <p className="subtitle">Same work, different outcomes — watch side by side</p>
          <p className="context-text">When you apply equal effort to two systems, only the efficient one converts most of that effort into useful movement. The inefficient system bleeds energy as wasted heat. Slide the control below and observe.</p>
        </div>

        {/* Side-by-side box movement */}
        <div className="dual-surface-visual">
          {/* Efficient system (Ice) */}
          <div className="surface-visual efficient">
            <div
              className="moving-box"
              style={{ transform: `translateX(${efficientPosition}px)` }}
            >
              📦
            </div>
            <div className="surface-floor">{"❄️".repeat(8)}</div>
          </div>

          {/* Inefficient system (Concrete) */}
          <div className="surface-visual inefficient">
            <div
              className="moving-box"
              style={{ transform: `translateX(${inefficientPosition}px)` }}
            >
              📦
            </div>
            <div className="surface-floor">{"⬛".repeat(8)}</div>
            {/* Heat bar indicating wasted energy */}
            {workInput > 0 && (
              <div
                className="heat-bar"
                style={{ width: `${inefficientHeatPercent}%` }}
                title={`${inefficientLost} units lost to heat`}
              />
            )}
          </div>
        </div>

        {/* Metrics for both systems */}
        <div className="metrics-grid">
          <div className="system-metrics efficient">
            <div className="system-label">Efficient System</div>
            <div className="metric">Efficiency: <span className="metric-value efficient">{efficientEfficiency}%</span></div>
            <div className="metric">Energy Lost: <span className="metric-value heat-waste">{efficientLost} units</span></div>
          </div>
          <div className="system-metrics inefficient">
            <div className="system-label">Inefficient System</div>
            <div className="metric">Efficiency: <span className="metric-value inefficient">{inefficientEfficiency}%</span></div>
            <div className="metric">Energy Lost: <span className="metric-value heat-waste">{inefficientLost} units</span></div>
          </div>
        </div>

        {/* Socratic guidance */}
        <div className="socratic-section">
          <h4>Consider:</h4>
          <ul>
            <li>Why does the box on ice glide much farther than on concrete?</li>
            <li>Where does the “missing” energy go in the concrete system?</li>
            <li>Can you think of real-world systems where energy is wasted in a similar way?</li>
            <li>What kind of “surface” does the traditional financial system resemble?</li>
          </ul>
        </div>
        
        {/* Work input slider */}
        <div className="work-controls">
          <label className="slider-label">Apply Work</label>
          <input
            type="range"
            min="0"
            max="100"
            value={workInput}
            onChange={handleSliderChange}
            className="work-slider"
          />
        </div>

        <ContinueButton
          onClick={onComplete}
          completed={workInput >= 50}
          nextStep="Money From Nothing"
        >
          Continue to Money Creation →
        </ContinueButton>
      </div>
    );
  };

  // Fiat Creation Component
  const FiatCreation = ({ content, onComplete }) => {
    const [showLoanCreation, setShowLoanCreation] = useState(false);
    const [newMoney, setNewMoney] = useState(0);
    
    const createLoan = () => {
      setShowLoanCreation(true);
      let amount = 0;
      const interval = setInterval(() => {
        amount += 10000;
        setNewMoney(amount);
        if (amount >= 270000) {
          clearInterval(interval);
        }
      }, 100);
    };

    // Socratic questions always visible
        return (
      <div className="fiat-creation">
        <div className="creation-header">
          <h2>{content.title}</h2>
          <p className="subtitle">{content.subtitle}</p>
          <div className="prime-text">{content.primeText}</div>
          <p className="context-text">With a few keyboard strokes, a bank can create brand-new money by issuing debt. Let’s watch this process and ask what it means for everyone holding the old money.</p>
        </div>

        {/* Pre-action Socratic guidance */}
        <div className="socratic-section">
          <h4>Consider before you click:</h4>
          <ul>
            <li>How hard is it to create $270,000 compared to pushing a heavy box?</li>
            <li>Where does this brand-new money come from?</li>
            <li>Who ultimately pays the cost of this easy money creation?</li>
          </ul>
              </div>

        <div className="loan-demo">
          {/* Accounts Ledger */}
          <div className="accounts-ledger">
            {/* Sarah Account */}
            <div className="account-box sarah-box">
              <h3>Sarah's Wallet</h3>
              <div className="account-balance">
                <span className="balance-label">Balance:</span>
                <span className="balance-amount">${(content.loanDemo.initial.savings + newMoney).toLocaleString()}</span>
              </div>
              <div className="account-note">Initial savings: ${content.loanDemo.initial.savings.toLocaleString()}</div>
              {showLoanCreation && (
                <div className="account-note new-credit">+ Loan credit: ${newMoney.toLocaleString()}</div>
              )}
            </div>

            {/* Bank Ledger */}
            <div className="account-box bank-box">
              <h3>Bank Ledger</h3>
              <ul className="ledger-list">
                <li>Customer Deposits: ${content.loanDemo.initial.savings.toLocaleString()}</li>
                {showLoanCreation && (
                  <li className="new-loan-row">Loan to Sarah: ${newMoney.toLocaleString()}</li>
                )}
              </ul>
                  </div>
                </div>

          {/* Action + animation */}
          <div className="bank-action">
            <ActionButton
              variant="primary"
              context="demo"
              onClick={createLoan}
              disabled={showLoanCreation}
              className="create-loan-btn"
            >
              {content.loanDemo.bankAction}
            </ActionButton>

            {showLoanCreation && (
              <div className="money-creation-animation">
                <div className="creation-visual">
                  <div className="bank-icon">🏦</div>
                  <div className="creation-amount">
                    <span className="sparkles">✨</span>
                    ${newMoney.toLocaleString()}
                    <span className="sparkles">✨</span>
                  </div>
                </div>
                <p className="creation-caption">New money appears with a few keystrokes...</p>
              </div>
            )}
              </div>

           {showLoanCreation && newMoney >= 270000 && (
             <div className="reflection-questions">
               {content.loanDemo.questions.map((question, index) => (
                 <div key={index} className="question-box">
                   <span className="question-number">{index + 1}</span>
                   <p>{question}</p>
                 </div>
               ))}
             </div>
           )}


              </div>

        {showLoanCreation && newMoney >= 270000 && (
          <ContinueButton 
            onClick={onComplete}
            completed={true}
            nextStep="Three Ages of Money"
          >
            Continue to Money Evolution →
          </ContinueButton>
        )}
          </div>
        );
  };

  // Money Evolution Component - Redesigned
  const MoneyEvolution = ({ content, onComplete }) => {
    const [exploredVersions, setExploredVersions] = useState(new Set());
    const [showComparison, setShowComparison] = useState(false);
    const [showConclusion, setShowConclusion] = useState(false);

    const handleVersionExplore = (index) => {
      const newExplored = new Set(exploredVersions);
      newExplored.add(index);
      setExploredVersions(newExplored);
      
      // If all versions explored, show comparison
      if (newExplored.size === content.versions.length) {
        setShowComparison(true);
      }
    };

    const handleComparisonComplete = () => {
      setShowConclusion(true);
    };

    return (
      <div className="money-evolution">
        <div className="evolution-header">
          <h2>{content.title}</h2>
          <p className="subtitle">{content.subtitle}</p>
          <div className="progress-indicator">
            <span className="progress-text">
              Explored: {exploredVersions.size}/{content.versions.length} versions
            </span>
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ width: `${(exploredVersions.size / content.versions.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
            
        <div className="interactive-timeline">
          <div className="timeline-instruction">
            <p>👆 Click each version to explore how money evolved over time</p>
          </div>

          <div className="versions-grid">
            {content.versions.map((version, index) => (
              <div 
                key={index}
                className={`version-card ${exploredVersions.has(index) ? 'explored' : 'unexplored'}`}
                onClick={() => handleVersionExplore(index)}
              >
                <div className="version-header">
                  <span className="version-number">{version.version}</span>
                  <span className="version-icon">{version.icon}</span>
                  {exploredVersions.has(index) && (
                    <span className="explored-badge">✓</span>
                  )}
                </div>
                
                <div className="version-content">
                  <h3>{version.name}</h3>
                  
                  {exploredVersions.has(index) ? (
                    <>
                      <div className="version-properties">
                        {version.properties.map((property, propIndex) => (
                          <div key={propIndex} className="property revealed">
                            <span className="property-bullet">•</span>
                            {property}
                          </div>
                        ))}
                      </div>
                      <div className="version-period">{version.period}</div>
                      <div className="version-insights">
                        {index === 0 && <p className="insight">🏆 Trustworthy but heavy</p>}
                        {index === 1 && <p className="insight">⚡ Convenient but risky</p>}
                        {index === 2 && <p className="insight">🚀 Best of both worlds</p>}
                      </div>
                    </>
                  ) : (
                    <div className="version-mystery">
                      <p>Click to reveal...</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>


        </div>

        {/* Comparison Section - Shows when all versions explored */}
        {showComparison && (
          <div className="comparison-section">
            <h3>🔍 Now Compare: What's the Pattern?</h3>
            
            <div className="comparison-table">
              <div className="comparison-row header">
                <div className="comparison-cell">Version</div>
                <div className="comparison-cell">Trust Level</div>
                <div className="comparison-cell">Convenience</div>
                <div className="comparison-cell">Trade-off</div>
              </div>
              
              {content.versions.map((version, index) => (
                <div key={index} className="comparison-row">
                  <div className="comparison-cell">
                    {version.icon} {version.name}
                  </div>
                  <div className="comparison-cell">
                    {index === 0 && <span className="trust-high">High 🔒</span>}
                    {index === 1 && <span className="trust-low">Low ⚠️</span>}
                    {index === 2 && <span className="trust-high">High 🔒</span>}
                  </div>
                  <div className="comparison-cell">
                    {index === 0 && <span className="convenience-low">Low 🐌</span>}
                    {index === 1 && <span className="convenience-high">High ⚡</span>}
                    {index === 2 && <span className="convenience-high">High ⚡</span>}
                  </div>
                  <div className="comparison-cell">
                    {index === 0 && "Heavy but honest"}
                    {index === 1 && "Easy but risky"}
                    {index === 2 && "Perfect balance"}
                  </div>
                </div>
              ))}
            </div>

            <Button 
              variant="primary"
              onClick={handleComparisonComplete}
              className="comparison-btn"
            >
              I See the Pattern! →
            </Button>
          </div>
        )}

        {/* Conclusion Section - Shows after comparison */}
        {showConclusion && (
          <div className="conclusion-section">
            <h3>💡 The Money Evolution Insight</h3>
            <div className="insight-cards">
              <div className="insight-card problem">
                <h4>The Problem</h4>
                <p>Each "upgrade" made money easier to use...</p>
                <p>But harder to trust.</p>
              </div>
              <div className="insight-card solution">
                <h4>The Bitcoin Solution</h4>
                <p>For the first time in history:</p>
                <p><strong>Digital convenience + Physical trust</strong></p>
              </div>
            </div>
            
            <div className="key-question">
              <h4>🤔 {content.question}</h4>
              <p className="answer-hint">
                The answer lies in what happened next: 1971...
              </p>
            </div>
          </div>
        )}

        {/* Continue Button - Only shows after exploring everything */}
        {showConclusion && (
          <ContinueButton 
            onClick={onComplete}
            completed={true}
            nextStep="The 1971 Switch"
          >
            Continue to The 1971 Switch →
          </ContinueButton>
        )}
      </div>
    );
  };

  // Nixon Shock Component
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

        <ContinueButton 
          onClick={onComplete}
          completed={true}
          nextStep="The Cost of 'Free' Money"
        >
          Continue to Hidden Costs →
        </ContinueButton>
      </div>
    );
  };

  // Bank Waste Component
  const BankWaste = ({ content, onComplete }) => {
    const [showHeatWaste, setShowHeatWaste] = useState(false);
    const [selectedCost, setSelectedCost] = useState(null);

    return (
      <div className="bank-waste">
        <div className="waste-header">
          <h2>{content.title}</h2>
          <p className="subtitle">{content.subtitle}</p>
          <div className="prime-text">{content.primeText}</div>
        </div>

        <div className="costs-grid">
          {Object.entries(content.costs).map(([key, cost]) => (
            <div 
              key={key}
              className={`cost-card ${selectedCost === key ? 'active' : ''}`}
              onClick={() => setSelectedCost(key)}
            >
              <div className="cost-icon">{cost.icon}</div>
              <div className="cost-content">
                <h3>{cost.label}</h3>
                <div className="cost-amount">{cost.cost}</div>
                <div className="energy-waste">
                  <span className="waste-icon">🔌</span>
                  {cost.energy}
                </div>
              </div>
            </div>
                    ))}
                  </div>

        <Button 
          variant="secondary"
          onClick={() => setShowHeatWaste(true)}
          className="show-heat-btn"
        >
          Where Does All This Energy Go? →
        </Button>

        {showHeatWaste && (
          <div className="heat-waste-section">
            <h3>{content.heatWaste.title}</h3>
            <div className="waste-flow">
              <div className="flow-step">
                <span className="step-icon">⚡</span>
                <span className="step-label">Electricity</span>
              </div>
              <span className="flow-arrow">→</span>
              <div className="flow-step">
                <span className="step-icon">💻</span>
                <span className="step-label">Servers</span>
                  </div>
              <span className="flow-arrow">→</span>
              <div className="flow-step">
                <span className="step-icon">🌡️</span>
                <span className="step-label">Heat</span>
              </div>
              <span className="flow-arrow">→</span>
              <div className="flow-step">
                <span className="step-icon">💨</span>
                <span className="step-label">Atmosphere</span>
              </div>
            </div>
            <div className="waste-question">
              <h4>🤔 {content.heatWaste.question}</h4>
            </div>
              </div>
            )}

        {showHeatWaste && (
          <ContinueButton 
            onClick={onComplete}
            completed={true}
            nextStep="Energy to Value"
              >
            Continue to Energy Transformation →
          </ContinueButton>
            )}
          </div>
        );
  };

  // Energy Transformation Component
  const EnergyTransformation = ({ content, onComplete }) => {
    const [sliderValue, setSliderValue] = useState(0);

    const handleSliderChange = (e) => {
      setSliderValue(parseInt(e.target.value));
    };

        return (
      <div className="energy-transformation">
        <div className="transformation-header">
          <h2>{content.title}</h2>
          <p className="subtitle">{content.subtitle}</p>
          <div className="prime-text">{content.primeText}</div>
        </div>

        <div className="transformation-slider">
          <div className="slider-sides">
            <div 
              className="slider-side left"
              style={{ opacity: 1 - (sliderValue / 100) }}
            >
              <div className="side-icon">{content.slider.left.icon}</div>
              <div className="side-label">{content.slider.left.label}</div>
            </div>

            <div 
              className="slider-side right"
              style={{ opacity: sliderValue / 100 }}
            >
              <div className="side-icon">{content.slider.right.icon}</div>
              <div className="side-label">{content.slider.right.label}</div>
            </div>
          </div>

          <input
            type="range"
            min="0"
            max="100"
            value={sliderValue}
            onChange={handleSliderChange}
            className="transformation-range"
          />
        </div>

        {sliderValue > 80 && (
          <div className="insight-section">
            <div className="insight-box">
              <p>{content.insight}</p>
            </div>
          </div>
        )}

        {sliderValue > 80 && (
          <ContinueButton 
            onClick={onComplete}
            completed={true}
            nextStep="Try to Double-Spend"
          >
            Continue to Double-Spend Challenge →
          </ContinueButton>
        )}
      </div>
    );
  };

  // Double Spend Lab Component
  const DoubleSpendLab = ({ content, onComplete }) => {
    const [step, setStep] = useState('setup');
    const [energyUsed, setEnergyUsed] = useState(0);
    const [showInsight, setShowInsight] = useState(false);

    const mineBlockA = () => {
      setStep('mining');
      let energy = 0;
      const interval = setInterval(() => {
        energy += 100;
        setEnergyUsed(energy);
        if (energy >= 1000) {
          clearInterval(interval);
          setStep('mined');
        }
      }, 100);
    };

    const tryBlockB = () => {
      setStep('error');
      setTimeout(() => setShowInsight(true), 2000);
    };

    return (
      <div className="double-spend-lab">
        <div className="lab-header">
          <h2>{content.title}</h2>
          <p className="subtitle">{content.subtitle}</p>
          <div className="prime-text">{content.primeText}</div>
        </div>

        <div className="lab-setup">
          <div className="setup-info">
            <h3>Your Mining Setup</h3>
            <p>{content.challenge.setup}</p>
            <div className="energy-meter">
              <div className="energy-bar">
                <div 
                  className="energy-fill"
                  style={{ width: `${(1000 - energyUsed) / 10}%` }}
                />
              </div>
              <div className="energy-amount">
                {1000 - energyUsed} units remaining
              </div>
            </div>
          </div>

          <div className="mining-blocks">
            <div className="block block-a">
              <h4>Block A</h4>
              {step === 'setup' && (
                <ActionButton 
                  variant="primary"
                  context="demo"
                  onClick={mineBlockA}
                  className="mine-btn"
                >
                  Mine Block A (1000 units)
                </ActionButton>
              )}
              {step === 'mining' && (
                <div className="mining-progress">
                  <div className="progress-bar">
                    <div 
                      className="progress-fill"
                      style={{ width: `${energyUsed / 10}%` }}
                    />
                      </div>
                  <div className="progress-text">
                    Mining... {energyUsed}/1000 units used
                  </div>
                </div>
              )}
              {(step === 'mined' || step === 'error') && (
                <div className="block-mined">
                  <span className="success-icon">✅</span>
                  Mined with 1000 units
                </div>
              )}
            </div>

            <div className="block block-b">
              <h4>Block B</h4>
              {step === 'mined' && (
                <ActionButton 
                  variant="warning"
                  context="demo"
                  onClick={tryBlockB}
                  className="mine-btn"
                >
                  Try to Mine Block B with Same Energy
                </ActionButton>
              )}
              {step === 'error' && (
                <div className="block-error">
                  <span className="error-icon">❌</span>
                  ERROR: Energy already spent!
                </div>
              )}
            </div>
          </div>
        </div>

        {showInsight && (
          <div className="lab-insight">
            <h3>Why Did That Fail?</h3>
            <div className="insight-box">
              <p>{content.insight}</p>
            </div>
          </div>
        )}

        {showInsight && (
          <ContinueButton 
            onClick={onComplete}
            completed={true}
            nextStep="Final Reflection"
          >
            Continue to Final Thoughts →
          </ContinueButton>
        )}
      </div>
    );
  };

  // Reflection Component
  const Reflection = ({ content, onComplete }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});
    const [showExplanation, setShowExplanation] = useState(false);

    const handleAnswer = (answer) => {
      setAnswers({ ...answers, [currentQuestion]: answer });
      setShowExplanation(true);
    };

    const nextQuestion = () => {
      setShowExplanation(false);
      setCurrentQuestion(currentQuestion + 1);
    };

    return (
      <div className="final-reflection">
        <div className="reflection-header">
          <h2>{content.title}</h2>
          <p className="subtitle">{content.subtitle}</p>
        </div>

        {currentQuestion < content.questions.length ? (
          <div className="question-section">
            <div className="question-card">
              <h3>{content.questions[currentQuestion].question}</h3>
              <div className="answer-options">
                {content.questions[currentQuestion].options.map((option, index) => (
                  <OptionButton
                    key={index}
                    selected={answers[currentQuestion] === option}
                    onClick={() => handleAnswer(option)}
                    className="answer-btn"
                  >
                    {option}
                  </OptionButton>
                ))}
              </div>

              {showExplanation && (
                <div className="answer-explanation">
                  <div className="explanation-box">
                    <div className="result-icon">
                      {answers[currentQuestion] === content.questions[currentQuestion].correct ? '✅' : '❌'}
                    </div>
                    <p>{content.questions[currentQuestion].explanation}</p>
                  </div>
                  {currentQuestion < content.questions.length - 1 && (
                    <Button 
                      variant="primary"
                      onClick={nextQuestion}
                      className="next-question-btn"
                    >
                      Next Question →
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="completion-section">
            <div className="completion-message">
              <h3>{content.nextModule.title}</h3>
              <p>{content.nextModule.description}</p>
            </div>

            <ContinueButton 
              onClick={onComplete}
              completed={true}
              nextStep="Module Complete"
            >
              {content.nextModule.buttonText}
            </ContinueButton>
          </div>
        )}
          </div>
        );
  };

  const renderStep = (step, index) => {
    switch (step.type) {
      case 'energy-hook':
        return <EnergyHook content={step.content} onComplete={() => handleStepComplete(index)} />;
      
      case 'fiat-creation':
        return <FiatCreation content={step.content} onComplete={() => handleStepComplete(index)} />;
      
      case 'money-evolution':
        return <MoneyEvolution content={step.content} onComplete={() => handleStepComplete(index)} />;
      
      case 'fiat-definition':
        return <FiatDefinition content={step.content} onComplete={() => handleStepComplete(index)} />;
      
      case 'bank-waste':
        return <BankWaste content={step.content} onComplete={() => handleStepComplete(index)} />;
      
      case 'energy-transformation':
        return <EnergyTransformation content={step.content} onComplete={() => handleStepComplete(index)} />;
      
      case 'double-spend-lab':
        return <DoubleSpendLab content={step.content} onComplete={() => handleStepComplete(index)} />;
      
      case 'reflection':
        return <Reflection content={step.content} onComplete={() => handleStepComplete(index)} />;

      default:
        return (
          <div className="step-content">
            <h2>{step.title}</h2>
            <p>Step type "{step.type}" not implemented yet.</p>
            <ContinueButton onClick={() => handleStepComplete(index)}>
              Continue
            </ContinueButton>
          </div>
        );
    }
  };

  const steps = [
    {
      title: "Energy & Trust",
      type: "energy-hook",
      content: {
        title: "🏋️‍♂️ Feel the Difference Between Real Work and Magic",
        subtitle: "Some things should cost energy. Here's why.",
        primeText: "Try moving the box on two different surfaces:",
        surfaces: {
          ice: {
            name: "Ice Rink",
            description: "Frictionless surface - no energy cost",
            icon: "🧊"
          },
          concrete: {
            name: "Concrete Floor",
            description: "Real surface - requires energy",
            icon: "🏗️"
          }
        },
        questions: [
          "How many energy units did it take on each surface?",
          "Where did the extra energy go on the concrete?",
          "Which movement feels more trustworthy?"
        ]
      }
    },
    {
      title: "Money From Nothing",
      type: "fiat-creation",
      content: {
        title: "💸 Watch Money Appear From Thin Air",
        subtitle: "Meet Sarah. She needs $300,000 for a house but only has $30,000.",
        primeText: "Let's see what happens when she visits the bank...",
        loanDemo: {
          initial: {
            savings: 30000,
            needed: 300000
          },
          bankAction: "Create $270,000 with a few keystrokes",
          questions: [
            "How hard was that compared to moving the box?",
            "If new money is this easy to create, what happens to everyone's savings?"
          ]
        }
      }
    },
    {
      title: "Three Ages of Money",
      type: "money-evolution",
      content: {
        title: "🌀 The Money Timeline: 1.0 → 2.0 → 3.0",
        subtitle: "Each upgrade made money easier to use... but riskier to trust",
        versions: [
          {
            version: "1.0",
            name: "Gold",
            icon: "🥇",
            properties: ["Hard to make", "Heavy to move", "Can't be copied"],
            period: "Ancient times - 1971"
          },
          {
            version: "2.0",
            name: "Fiat",
            icon: "💵",
            properties: ["Easy to print", "Easy to move", "Trust required"],
            period: "1971 - Present"
          },
          {
            version: "3.0",
            name: "Bitcoin",
            icon: "₿",
            properties: ["Hard to make", "Easy to move", "Can't be copied"],
            period: "2009 - Future"
          }
        ],
        question: "Why did each upgrade feel easier but also riskier?"
      }
    },
    {
      title: "The 1971 Switch",
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
        }
      }
    },
    {
      title: "The Cost of 'Free' Money",
      type: "bank-waste",
      content: {
        title: "🏢 The Hidden Energy Cost of Digital IOUs",
        subtitle: "Traditional banking wastes more electricity than you think",
        primeText: "All this infrastructure just to secure numbers in a database:",
        costs: {
          buildings: {
            icon: "🏢",
            label: "Bank Buildings",
            cost: "$Billions/year",
            energy: "Massive AC & servers"
          },
          security: {
            icon: "👮",
            label: "Physical Security",
            cost: "$Millions/year",
            energy: "24/7 systems"
          },
          backups: {
            icon: "💾",
            label: "Data Centers",
            cost: "$Millions/year",
            energy: "Redundant power"
          }
        },
        heatWaste: {
          title: "All This Energy Becomes... Heat",
          description: "Electricity → Servers → Heat → Atmosphere",
          question: "Could we capture this waste and turn it into value?"
        }
      }
    },
    {
      title: "Energy to Value",
      type: "energy-transformation",
      content: {
        title: "Could we bottle that energy instead of wasting it?",
        subtitle: "Move the slider to transform wasted energy into Bitcoin value",
        primeText: "Bitcoin mining turns spare power into unbreakable digital money.",
        slider: {
          left: {
            icon: "🌡️💨",
            label: "Wasted Heat"
          },
          right: {
            icon: "₿₿₿",
            label: "Bitcoin Value"
          }
        },
        insight: "Instead of guards and passwords, Bitcoin locks your money with math puzzles that cost electricity to solve—and can't be faked."
      }
    },
    {
      title: "Try to Double-Spend",
      type: "double-spend-lab",
      content: {
        title: "⚡ Can You Spend the Same Energy Twice?",
        subtitle: "Try to cheat the laws of physics",
        primeText: "You have 1000 energy units. Try to use them to mine two blocks.",
        challenge: {
          setup: "You're a Bitcoin miner with 1000 units of electricity",
          task: "Try to use the same energy to mine two different blocks",
          realWorld: "This is like trying to use the same gallon of gas to drive two different cars"
        },
        insight: "Bitcoin is impossible to counterfeit because it's backed by real energy work that can't be faked or duplicated."
      }
    },
    {
      title: "Final Reflection",
      type: "reflection",
      content: {
        title: "🤔 Which System Makes More Sense?",
        subtitle: "Let's review what we've learned",
        questions: [
          {
            question: "Which system wasted the most energy?",
            options: ["Traditional Banking", "Bitcoin Mining"],
            correct: "Traditional Banking",
            explanation: "Banks waste energy on buildings, security, and servers that still get hacked."
          },
          {
            question: "Which system was easiest to copy?",
            options: ["Digital Bank Money", "Bitcoin"],
            correct: "Digital Bank Money",
            explanation: "Bank numbers can be changed; energy work can't be faked."
          },
          {
            question: "Which system treated energy cost as a feature?",
            options: ["Traditional Banking", "Bitcoin"],
            correct: "Bitcoin",
            explanation: "Bitcoin turns energy cost into unbreakable security."
          }
        ],
        nextModule: {
          title: "Ready to design the money of the future?",
          description: "Next up: Learn how Bitcoin's code keeps everyone honest",
          buttonText: "Start Next Module →"
        }
      }
    }
  ];

  return (
    <div className="module-container">
      <div className="module-header">
        <h1 className="module-title">
          <Zap className="module-icon" />
          Energy & Trust: The Bitcoin Basics
        </h1>
      </div>

      {/* Reset Progress Button */}
      <Button 
        className="reset-progress-button" 
        onClick={() => {
          setCompletedSteps(new Set());
          setCurrentStep(0);
        }}
      >
        Reset Progress
      </Button>

      <div className="module-progress">
        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ width: `${(completedSteps.size / steps.length) * 100}%` }}
          />
        </div>
        <span className="progress-text">
          {completedSteps.size} / {steps.length} steps completed
        </span>
      </div>

      <div className="top-navigation">
        {steps.map((step, index) => (
          <Button
            key={index}
            className={`top-nav-button ${
              index === currentStep ? 'active' : ''
            } ${completedSteps.has(index) ? 'completed' : ''}`}
            onClick={() => handleStepChange(index)}
          >
            <span className="nav-text">
              {index + 1}. {step.title}
            </span>
          </Button>
        ))}
      </div>

      <div className="module-content">
        {renderStep(steps[currentStep], currentStep)}
      </div>
    </div>
  );
};

export default BitcoinBasicsModule; 