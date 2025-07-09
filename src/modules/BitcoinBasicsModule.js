import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '../contexts/ProgressContext';
import { Zap, Bitcoin, CheckCircle, Trophy } from 'lucide-react';
import AnimatedIcon from '../components/AnimatedIcon';
import { ContinueButton } from '../components/EnhancedButtons';
import '../components/ModuleLayout.css';
import '../components/ModuleCommon.css';
import './BitcoinBasicsModule.css';

const BitcoinBasicsModule = () => {
  const { completeModule } = useProgress();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(new Set());
  
  const handleStepComplete = (index) => {
    if (process.env.NODE_ENV === 'development') {
      console.log('[StepComplete] index:', index);
    }
    const newCompletedSteps = new Set(completedSteps);
    newCompletedSteps.add(index);
    setCompletedSteps(newCompletedSteps);
    if (process.env.NODE_ENV === 'development') {
      console.log('CompletedSteps after update:', Array.from(newCompletedSteps));
    }
    
    if (index === steps.length - 1) {
      completeModule('bitcoin-basics');
      setTimeout(() => navigate('/'), 2000);
    } else {
      setCurrentStep(index + 1);
    }
  };

  const handleStepChange = (index) => {
    if (process.env.NODE_ENV === 'development') {
      console.log('[StepChange attempt] target index:', index, 'current completed:', Array.from(completedSteps));
    }
    // Only allow navigation to completed steps or the next uncompleted step
    const maxCompleted = Math.max(...Array.from(completedSteps), -1);
    if (completedSteps.has(index) || index === 0 || index <= maxCompleted + 1) {
      setCurrentStep(index);
    }
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
    const [step, setStep] = useState(0);
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
            <button
              className="create-loan-btn"
              onClick={createLoan}
              disabled={showLoanCreation}
            >
              {content.loanDemo.bankAction}
            </button>

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

          {showLoanCreation && newMoney >= 270000 && (
            <ContinueButton 
              onClick={onComplete}
            >
              Continue to Money Evolution →
            </ContinueButton>
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

  // Money Evolution Component
  const MoneyEvolution = ({ content, onComplete }) => {
    const [selectedVersion, setSelectedVersion] = useState(null);
    const [showQuestion, setShowQuestion] = useState(false);

    // Automatically reveal the reflection question (and Continue button)
    // as soon as the learner picks a money version. This removes the extra
    // “Think About It” click that was preventing some users from progressing.
    useEffect(() => {
      if (selectedVersion !== null) {
        setShowQuestion(true);
      }
    }, [selectedVersion]);
 
        // Build timeline with arrows
        const timelineElements = [];
        content.versions.forEach((version, index) => {
          timelineElements.push(
            <div
              key={`card-${index}`}
              className={`version-card ${selectedVersion === index ? 'active' : ''}`}
              onClick={() => setSelectedVersion(index)}
            >
              <div className="version-header">
                <span className="version-number">{version.version}</span>
                <span className="version-icon">{version.icon}</span>
              </div>
              <div className="version-content">
                <h3>{version.name}</h3>
                <div className="version-properties">
                  {version.properties.map((property, propIndex) => (
                    <div key={propIndex} className="property">
                      <span className="property-bullet">•</span>
                      {property}
                    </div>
                  ))}
                </div>
                <div className="version-period">{version.period}</div>
              </div>
            </div>
          );
          if (index < content.versions.length - 1) {
            timelineElements.push(
              <div key={`arrow-${index}`} className="timeline-arrow-el">→</div>
            );
          }
        });

        return (
      <div className="money-evolution">
        <div className="evolution-header">
          <h2>{content.title}</h2>
          <p className="subtitle">Each upgrade made money easier to use—but also introduced new trust trade-offs. Select a version below to explore.</p>
            </div>
            
        <div className="versions-timeline">
          {timelineElements}
        </div>
              

        {/* The manual “Think About It” button is no longer needed because we
            auto-reveal the reflection once a card is chosen. Retain it only
            if you want the extra interaction step. */}
        {/*
        {selectedVersion !== null && !showQuestion && (
          <button
            className="reflection-btn large-action"
            onClick={() => setShowQuestion(true)}
          >
            Think About It
          </button>
        )}
        */}

        {showQuestion && (
          <div className="reflection-section">
            <h3>🤔 {content.question}</h3>
            <div className="insight-box">
              <p>Each upgrade made money more convenient...</p>
              <p>But convenience came at the cost of trust.</p>
              <p>Until Bitcoin combined gold's trust with digital convenience.</p>
            </div>
          </div>
        )}

        {showQuestion && (
          <ContinueButton 
            onClick={onComplete}
            completed={true}
            nextStep="The 1971 Switch"
          >
            Continue to 1971 Story →
          </ContinueButton>
        )}
          </div>
        );
  };

  // Nixon Shock Component
  const NixonShock = ({ content, onComplete }) => {
    const [showImpact, setShowImpact] = useState(false);
    const [showCarlos, setShowCarlos] = useState(false);

        return (
      <div className="nixon-shock">
        <div className="shock-header">
          <h2>{content.title}</h2>
          <p className="subtitle">{content.subtitle}</p>
          <div className="prime-text">{content.primeText}</div>
        </div>

        <div className="before-after">
          <div className="timeline-period before">
            <h3>{content.impact.before.title}</h3>
            <div className="backing-visual">
              <div className="gold-bars">🟨🟨🟨</div>
              <span className="equals">=</span>
              <div className="dollar-bills">💵💵💵</div>
            </div>
            <div className="backing-details">
              <p><strong>Backing:</strong> {content.impact.before.backing}</p>
              <p><strong>Trust:</strong> {content.impact.before.trust}</p>
            </div>
          </div>

          <div className="timeline-arrow">
            <div className="arrow-date">August 15, 1971</div>
            <div className="arrow-icon">⚡</div>
          </div>

          <div className="timeline-period after">
            <h3>{content.impact.after.title}</h3>
            <div className="backing-visual">
              <div className="promise-icon">🤝</div>
              <span className="equals">=</span>
              <div className="dollar-bills">💵💵💵💵💵💵</div>
              </div>
            <div className="backing-details">
              <p><strong>Backing:</strong> {content.impact.after.backing}</p>
              <p><strong>Trust:</strong> {content.impact.after.trust}</p>
            </div>
          </div>
        </div>

        <button 
          className="impact-btn"
          onClick={() => setShowCarlos(true)}
        >
          Meet Carlos →
        </button>

        {showCarlos && (
          <div className="carlos-story">
            <div className="carlos-profile">
              <div className="profile-icon">👨‍🌾</div>
              <h3>{content.carlosExample.title}</h3>
              </div>

            <div className="impacts-grid">
              {content.carlosExample.impacts.map((impact, index) => (
                <div key={index} className="impact-card">
                  <div className="impact-icon">{impact.emoji}</div>
                  <h4>{impact.title}</h4>
                  <p className="impact-loss">{impact.loss}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

        {showCarlos && (
          <div className="reflection-section">
            <h3>🤔 {content.question}</h3>
            <div className="insight-box">
              <p>When money isn't backed by anything physical...</p>
              <p>The only limit is trust in authority.</p>
            </div>
          </div>
        )}

        {showCarlos && (
          <ContinueButton 
            onClick={onComplete}
            completed={true}
            nextStep="The Cost of 'Free' Money"
          >
            Continue to Hidden Costs →
          </ContinueButton>
        )}
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

        <button 
          className="show-heat-btn"
          onClick={() => setShowHeatWaste(true)}
        >
          Where Does All This Energy Go? →
        </button>

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
                <button 
                  className="mine-btn"
                  onClick={mineBlockA}
                >
                  Mine Block A (1000 units)
                </button>
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
                <button 
                  className="mine-btn"
                  onClick={tryBlockB}
                >
                  Try to Mine Block B with Same Energy
                </button>
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
                  <button
                    key={index}
                    className={`answer-btn ${answers[currentQuestion] === option ? 'selected' : ''}`}
                    onClick={() => handleAnswer(option)}
                  >
                    {option}
                  </button>
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
              <button 
                      className="next-question-btn"
                      onClick={nextQuestion}
              >
                      Next Question →
              </button>
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
      
      case 'nixon-shock':
        return <NixonShock content={step.content} onComplete={() => handleStepComplete(index)} />;
      
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
            <button className="continue-button" onClick={() => handleStepComplete(index)}>
              Continue
            </button>
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
      type: "nixon-shock",
      content: {
        title: "📅 August 15, 1971: The Day Money Changed Forever",
        subtitle: "When governments broke their golden promise",
        primeText: "Watch what happened when the US stopped backing dollars with gold",
        impact: {
          before: {
            title: "Before 1971",
            backing: "Every dollar = fixed amount of gold",
            trust: "Physical gold in vaults"
          },
          after: {
            title: "After 1971",
            backing: "Every dollar = government promise",
            trust: "Trust in authority"
          }
        },
        carlosExample: {
          title: "Meet Carlos, Our Flower Exporter",
          impacts: [
            {
              title: "Savings Melt Away",
              emoji: "💸",
              loss: "Value drops 2% each year"
            },
            {
              title: "Bank Permission Needed",
              emoji: "🏦",
              loss: "Can't freely send money"
            },
            {
              title: "Government Control",
              emoji: "👮",
              loss: "Money frozen without warning"
            }
          ]
        },
        question: "If gold kept governments honest, what keeps them honest now?"
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
        <div className="header-top">
          <button className="back-button" onClick={() => navigate('/')}>
            ← Back
          </button>
          <h1 className="module-title">
            <Zap className="module-icon" />
            Energy & Trust: The Bitcoin Basics
          </h1>
        </div>
      </div>

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
          <button
            key={index}
            className={`top-nav-button ${
              index === currentStep ? 'active' : ''
            } ${completedSteps.has(index) ? 'completed' : ''}`}
            onClick={() => handleStepChange(index)}
            disabled={!completedSteps.has(index) && index > Math.max(...Array.from(completedSteps), -1) + 1}
          >
            <span className="nav-text">
              {index + 1}. {step.title}
            </span>
          </button>
        ))}
      </div>

      <div className="module-content">
        {renderStep(steps[currentStep], currentStep)}
      </div>
    </div>
  );
};

export default BitcoinBasicsModule; 