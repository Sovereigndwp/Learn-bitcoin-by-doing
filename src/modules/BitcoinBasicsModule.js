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

  // Energy Hook Component - Streamlined with micro-choices
  const EnergyHook = ({ content, onComplete }) => {
    const [selectedScenario, setSelectedScenario] = useState(null);
    const [reflectionChoice, setReflectionChoice] = useState(null);

    const scenarios = [
      {
        id: 'ice',
        title: "The Ice Rink Challenge",
        description: "You're pushing a heavy box across a frictionless ice rink",
        action: "Push the Box",
        result: "The box glides effortlessly across the ice with minimal energy",
        insight: "Almost no energy lost - but anyone could push it",
        energy: 5,
        difficulty: "Easy",
        security: "None"
      },
      {
        id: 'concrete',
        title: "The Concrete Floor Test", 
        description: "You're pushing the same box across rough concrete",
        action: "Push the Box",
        result: "The box moves slowly, creating heat from friction",
        insight: "Lots of energy required - but proves real work was done",
        energy: 95,
        difficulty: "Hard",
        security: "High"
      },
      {
        id: 'quicksand',
        title: "The Quicksand Trap",
        description: "You're trying to push the box through thick quicksand",
        action: "Push the Box",
        result: "Massive effort needed, but box barely moves",
        insight: "Maximum energy cost - but maximum proof of work",
        energy: 150,
        difficulty: "Extreme",
        security: "Unbreakable"
      }
    ];

    const reflectionQuestions = [
      {
        question: "Which surface would you trust more for securing valuable things?",
        choices: ["Ice (Easy)", "Concrete (Hard)", "Quicksand (Extreme)"],
        correct: 2,
        explanation: "The harder something is to do, the more you can trust it really happened!"
      }
    ];

    return (
      <div className="energy-hook-streamlined">
        <div className="hook-header">
          <h2>🏋️‍♂️ Feel the Power of Proof-of-Work</h2>
          <p className="subtitle">You're about to discover why energy cost equals security</p>
        </div>

        <div className="scenario-grid">
          {scenarios.map((scenario) => (
            <div 
              key={scenario.id}
              className={`scenario-card ${selectedScenario === scenario.id ? 'active' : ''}`}
            >
              <h3>{scenario.title}</h3>
              <p className="scenario-description">{scenario.description}</p>
              
              <ActionButton
                variant="primary"
                onClick={() => setSelectedScenario(scenario.id)}
                disabled={selectedScenario && selectedScenario !== scenario.id}
              >
                {scenario.action}
              </ActionButton>

              {selectedScenario === scenario.id && (
                <div className="scenario-result">
                  <div className="result-visual">
                    <div className="energy-meter">
                      <div className="energy-bar">
                        <div 
                          className="energy-fill"
                          style={{ width: `${Math.min(scenario.energy, 100)}%` }}
                        />
                      </div>
                      <span className="energy-amount">{scenario.energy} units</span>
                    </div>
                  </div>
                  
                  <div className="result-details">
                    <p className="result-text">{scenario.result}</p>
                    <div className="result-stats">
                      <div className="stat">
                        <span className="stat-label">Difficulty:</span>
                        <span className={`stat-value ${scenario.difficulty.toLowerCase()}`}>
                          {scenario.difficulty}
                        </span>
                      </div>
                      <div className="stat">
                        <span className="stat-label">Security:</span>
                        <span className={`stat-value ${scenario.security.toLowerCase()}`}>
                          {scenario.security}
                        </span>
                      </div>
                    </div>
                    <p className="insight">{scenario.insight}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {selectedScenario && (
          <div className="reflection-section">
            <h3>🤔 What strikes you most?</h3>
            <div className="reflection-choices">
              {reflectionQuestions[0].choices.map((choice, index) => (
                <OptionButton
                  key={index}
                  selected={reflectionChoice === index}
                  onClick={() => setReflectionChoice(index)}
                >
                  {choice}
                </OptionButton>
              ))}
            </div>

            {reflectionChoice !== null && (
              <div className="reflection-result">
                <div className={`result-indicator ${reflectionChoice === reflectionQuestions[0].correct ? 'correct' : 'partial'}`}>
                  {reflectionChoice === reflectionQuestions[0].correct ? '🎯' : '💭'}
                </div>
                <p>{reflectionQuestions[0].explanation}</p>
              </div>
            )}
          </div>
        )}

        <ContinueButton
          onClick={onComplete}
          completed={selectedScenario && reflectionChoice !== null}
          nextStep="Money From Nothing"
        >
          Continue to Money Creation →
        </ContinueButton>
      </div>
    );
  };

  // Fiat Creation Component - Streamlined with direct engagement
  const FiatCreation = ({ content, onComplete }) => {
    const [currentPhase, setCurrentPhase] = useState('setup');
    const [newMoney, setNewMoney] = useState(0);
    const [userReaction, setUserReaction] = useState(null);
    
    const createLoan = () => {
      setCurrentPhase('creating');
      let amount = 0;
      const interval = setInterval(() => {
        amount += 15000;
        setNewMoney(amount);
        if (amount >= 270000) {
          clearInterval(interval);
          setCurrentPhase('complete');
        }
      }, 80);
    };

    const reactions = [
      { text: "That was surprisingly easy...", value: "easy" },
      { text: "Where did that money come from?", value: "confused" },
      { text: "What about everyone else's savings?", value: "concerned" }
    ];

    return (
      <div className="fiat-creation-streamlined">
        <div className="creation-header">
          <h2>💸 Meet Sarah's $270,000 Problem</h2>
          <p className="subtitle">She has $30,000. She needs $300,000 for a house.</p>
        </div>

        <div className="sarah-story">
          <div className="character-intro">
            <div className="character-avatar">👩‍💼</div>
            <div className="character-details">
              <h3>Sarah</h3>
              <p>Software engineer, saved for 5 years</p>
              <div className="savings-amount">Has: $30,000</div>
              <div className="need-amount">Needs: $300,000</div>
            </div>
          </div>

          {currentPhase === 'setup' && (
            <div className="bank-visit">
              <h3>🏦 Sarah walks into a bank...</h3>
              <p>Watch what happens when she asks for a loan:</p>
              
              <ActionButton
                variant="primary"
                onClick={createLoan}
                className="bank-action-btn"
              >
                Banker: "Sure, let me create that money for you"
              </ActionButton>
            </div>
          )}

          {currentPhase === 'creating' && (
            <div className="money-creation">
              <h3>⌨️ Banker types on keyboard...</h3>
              <div className="creation-animation">
                <div className="typing-effect">💻 tap tap tap...</div>
                <div className="money-counter">
                  <span className="sparkles">✨</span>
                  ${newMoney.toLocaleString()}
                  <span className="sparkles">✨</span>
                </div>
                <div className="creation-caption">New money appearing...</div>
              </div>
            </div>
          )}

          {currentPhase === 'complete' && (
            <div className="creation-complete">
              <h3>✅ Done! Sarah now has $300,000</h3>
              
              <div className="balance-display">
                <div className="before-after">
                  <div className="before">
                    <span className="label">Before:</span>
                    <span className="amount">$30,000</span>
                  </div>
                  <div className="arrow">→</div>
                  <div className="after">
                    <span className="label">After:</span>
                    <span className="amount">$300,000</span>
                  </div>
                </div>
              </div>

              <div className="reaction-prompt">
                <h4>What's your reaction?</h4>
                <div className="reaction-buttons">
                  {reactions.map((reaction) => (
                    <OptionButton
                      key={reaction.value}
                      selected={userReaction === reaction.value}
                      onClick={() => setUserReaction(reaction.value)}
                    >
                      {reaction.text}
                    </OptionButton>
                  ))}
                </div>

                {userReaction && (
                  <div className="reaction-result">
                    <div className="result-icon">🎯</div>
                    <p>
                      {userReaction === 'easy' && "Exactly! Compare this to pushing a box through quicksand..."}
                      {userReaction === 'confused' && "Great question! It came from... nowhere. Just computer entries."}
                      {userReaction === 'concerned' && "You're thinking like an economist! More money = everyone's money worth less."}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <ContinueButton
          onClick={onComplete}
          completed={currentPhase === 'complete' && userReaction}
          nextStep="Three Ages of Money"
        >
          Continue to Money Evolution →
        </ContinueButton>
      </div>
    );
  };

  // Money Evolution Component - Streamlined with focused progression
  const MoneyEvolution = ({ content, onComplete }) => {
    const [currentVersion, setCurrentVersion] = useState(0);
    const [userInsight, setUserInsight] = useState(null);

    const versions = [
      {
        id: 'gold',
        name: "Money v1.0: Gold",
        icon: "🥇",
        story: "You're a merchant in ancient Rome carrying gold coins",
        challenge: "These coins are heavy but everyone trusts them",
        tradeoff: "Trust ↑ Convenience ↓",
        properties: ["Impossible to fake", "Heavy to carry", "Limited supply"],
        verdict: "Trustworthy but clunky"
      },
      {
        id: 'fiat',
        name: "Money v2.0: Paper",
        icon: "💵",
        story: "You're holding a paper bill promising gold backing",
        challenge: "Light and easy but requires trusting the government",
        tradeoff: "Trust ↓ Convenience ↑",
        properties: ["Easy to transport", "Requires trust", "Can be printed"],
        verdict: "Convenient but risky"
      },
      {
        id: 'bitcoin',
        name: "Money v3.0: Bitcoin",
        icon: "₿",
        story: "You're sending digital money secured by energy",
        challenge: "Digital convenience with physical security",
        tradeoff: "Trust ↑ Convenience ↑",
        properties: ["Digital transfer", "Energy-secured", "Fixed supply"],
        verdict: "Best of both worlds"
      }
    ];

    const insights = [
      { text: "Each upgrade traded security for convenience", value: "tradeoff" },
      { text: "Bitcoin breaks the old trade-off pattern", value: "breakthrough" },
      { text: "Energy cost creates digital scarcity", value: "energy" }
    ];

    const nextVersion = () => {
      if (currentVersion < versions.length - 1) {
        setCurrentVersion(currentVersion + 1);
      }
    };

    return (
      <div className="money-evolution-streamlined">
        <div className="evolution-header">
          <h2>🌀 The Great Money Trade-off</h2>
          <p className="subtitle">Each "upgrade" came with a hidden cost</p>
        </div>

        <div className="version-journey">
          <div className="progress-dots">
            {versions.map((_, index) => (
              <div 
                key={index}
                className={`progress-dot ${index <= currentVersion ? 'active' : ''}`}
              />
            ))}
          </div>

          <div className="current-version">
            <div className="version-card-large">
              <div className="version-header">
                <span className="version-icon">{versions[currentVersion].icon}</span>
                <h3>{versions[currentVersion].name}</h3>
              </div>

              <div className="version-story">
                <p className="story-text">{versions[currentVersion].story}</p>
                <div className="challenge-box">
                  <strong>The Challenge:</strong> {versions[currentVersion].challenge}
                </div>
              </div>

              <div className="version-analysis">
                <div className="tradeoff-visual">
                  <span className="tradeoff-label">Trade-off:</span>
                  <span className={`tradeoff-value ${versions[currentVersion].id}`}>
                    {versions[currentVersion].tradeoff}
                  </span>
                </div>

                <div className="properties-list">
                  {versions[currentVersion].properties.map((property, index) => (
                    <div key={index} className="property-item">
                      <span className="property-bullet">•</span>
                      {property}
                    </div>
                  ))}
                </div>

                <div className="verdict">
                  <strong>Verdict:</strong> {versions[currentVersion].verdict}
                </div>
              </div>

              {currentVersion < versions.length - 1 && (
                <ActionButton
                  variant="primary"
                  onClick={nextVersion}
                  className="next-version-btn"
                >
                  See Next Evolution →
                </ActionButton>
              )}
            </div>
          </div>
        </div>

        {currentVersion === versions.length - 1 && (
          <div className="evolution-insight">
            <h3>💡 What's the breakthrough?</h3>
            <div className="insight-choices">
              {insights.map((insight) => (
                <OptionButton
                  key={insight.value}
                  selected={userInsight === insight.value}
                  onClick={() => setUserInsight(insight.value)}
                >
                  {insight.text}
                </OptionButton>
              ))}
            </div>

            {userInsight && (
              <div className="insight-result">
                <div className="result-icon">
                  {userInsight === 'breakthrough' ? '🎯' : '💭'}
                </div>
                <p>
                  {userInsight === 'tradeoff' && "True! For centuries, money makers had to choose: secure OR convenient."}
                  {userInsight === 'breakthrough' && "Exactly! Bitcoin is the first money that's both secure AND convenient."}
                  {userInsight === 'energy' && "You're getting it! Energy cost makes digital bits as scarce as physical gold."}
                </p>
              </div>
            )}
          </div>
        )}

        <ContinueButton
          onClick={onComplete}
          completed={currentVersion === versions.length - 1 && userInsight}
          nextStep="The 1971 Switch"
        >
          Continue to The 1971 Switch →
        </ContinueButton>
      </div>
    );
  };

  // Fiat Definition Component - Streamlined with focused narrative
  const FiatDefinition = ({ content, onComplete }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [userRealization, setUserRealization] = useState(null);

    const nixonStory = [
      {
        title: "August 15, 1971 - Sunday Evening",
        scene: "President Nixon appears on TV",
        dialogue: "\"We're temporarily suspending the conversion of dollars into gold...\"",
        impact: "The promise that backed all money was broken",
        visual: "📺🎭"
      },
      {
        title: "Monday Morning, August 16",
        scene: "People wake up to a new world",
        dialogue: "\"Wait... our dollars aren't backed by anything anymore?\"",
        impact: "Money became pure government promise",
        visual: "😳💸"
      },
      {
        title: "52 Years Later - Today",
        scene: "The consequences are clear",
        dialogue: "\"Why does everything cost so much more than it used to?\"",
        impact: "Unlimited money printing = inflated prices",
        visual: "📈💰"
      }
    ];

    const realizations = [
      { text: "Money isn't backed by anything real anymore", value: "unbacked" },
      { text: "Governments can create money without limits", value: "unlimited" },
      { text: "This explains why prices keep rising", value: "inflation" }
    ];

    const nextStep = () => {
      if (currentStep < nixonStory.length - 1) {
        setCurrentStep(currentStep + 1);
      }
    };

    return (
      <div className="fiat-definition-streamlined">
        <div className="definition-header">
          <h2>📺 The Day Money Changed Forever</h2>
          <p className="subtitle">One Sunday evening in 1971, everything changed</p>
        </div>

        <div className="nixon-story">
          <div className="story-progress">
            {nixonStory.map((_, index) => (
              <div 
                key={index}
                className={`story-dot ${index <= currentStep ? 'active' : ''}`}
              />
            ))}
          </div>

          <div className="story-scene">
            <div className="scene-visual">
              <span className="scene-icon">{nixonStory[currentStep].visual}</span>
            </div>
            
            <div className="scene-content">
              <h3>{nixonStory[currentStep].title}</h3>
              <div className="scene-description">
                <p>{nixonStory[currentStep].scene}</p>
              </div>
              
              <div className="dialogue-box">
                <p>"{nixonStory[currentStep].dialogue}"</p>
              </div>
              
              <div className="impact-reveal">
                <strong>The Impact:</strong> {nixonStory[currentStep].impact}
              </div>
            </div>
          </div>

          {currentStep < nixonStory.length - 1 && (
            <ActionButton
              variant="primary"
              onClick={nextStep}
              className="next-scene-btn"
            >
              What Happened Next? →
            </ActionButton>
          )}
        </div>

        {currentStep === nixonStory.length - 1 && (
          <div className="realization-section">
            <h3>💡 What's your biggest realization?</h3>
            <div className="realization-choices">
              {realizations.map((realization) => (
                <OptionButton
                  key={realization.value}
                  selected={userRealization === realization.value}
                  onClick={() => setUserRealization(realization.value)}
                >
                  {realization.text}
                </OptionButton>
              ))}
            </div>

            {userRealization && (
              <div className="realization-result">
                <div className="result-icon">🎯</div>
                <p>
                  {userRealization === 'unbacked' && "Exactly! From that day forward, money became pure trust in government."}
                  {userRealization === 'unlimited' && "Right! No gold limit means no printing limit. Sarah's $270,000 was just the beginning."}
                  {userRealization === 'inflation' && "You've connected the dots! More money chasing the same goods = higher prices."}
                </p>
              </div>
            )}
          </div>
        )}

        <ContinueButton
          onClick={onComplete}
          completed={currentStep === nixonStory.length - 1 && userRealization}
          nextStep="Energy: Waste vs. Security"
        >
          Continue to Energy Analysis →
        </ContinueButton>
      </div>
    );
  };

  // Bank Waste Component - Streamlined with direct comparison
  const BankWaste = ({ content, onComplete }) => {
    const [selectedSystem, setSelectedSystem] = useState(null);
    const [userInsight, setUserInsight] = useState(null);

    const systems = [
      {
        id: 'banking',
        name: "Traditional Banking",
        icon: "🏦",
        energyUse: "Massive office buildings, 24/7 data centers, security systems",
        outcome: "Heat escapes into atmosphere",
        efficiency: "~15%",
        security: "Still gets hacked",
        waste: "85% of energy becomes waste heat",
        visual: "🌡️💨"
      },
      {
        id: 'bitcoin',
        name: "Bitcoin Mining",
        icon: "₿",
        energyUse: "Computers solving math puzzles",
        outcome: "Unbreakable digital security",
        efficiency: "~95%",
        security: "Never been hacked",
        waste: "5% waste, 95% becomes security",
        visual: "🔒⚡"
      }
    ];

    const insights = [
      { text: "Bitcoin transforms energy into security", value: "transformation" },
      { text: "Banks waste more energy than Bitcoin", value: "comparison" },
      { text: "Energy cost makes Bitcoin impossible to fake", value: "unfakeable" }
    ];

    return (
      <div className="bank-waste-streamlined">
        <div className="waste-header">
          <h2>🌡️ The Great Energy Waste Mystery</h2>
          <p className="subtitle">Which system actually wastes more energy?</p>
        </div>

        <div className="systems-comparison">
          {systems.map((system) => (
            <div 
              key={system.id}
              className={`system-card ${selectedSystem === system.id ? 'selected' : ''}`}
              onClick={() => setSelectedSystem(system.id)}
            >
              <div className="system-header">
                <span className="system-icon">{system.icon}</span>
                <h3>{system.name}</h3>
              </div>

              <div className="energy-flow">
                <div className="flow-item">
                  <span className="flow-label">Energy Input:</span>
                  <p>{system.energyUse}</p>
                </div>
                <div className="flow-arrow">↓</div>
                <div className="flow-item">
                  <span className="flow-label">Outcome:</span>
                  <p>{system.outcome}</p>
                </div>
              </div>

              {selectedSystem === system.id && (
                <div className="system-details">
                  <div className="detail-stats">
                    <div className="stat">
                      <span className="stat-label">Efficiency:</span>
                      <span className={`stat-value ${system.id}`}>{system.efficiency}</span>
                    </div>
                    <div className="stat">
                      <span className="stat-label">Security:</span>
                      <span className={`stat-value ${system.id}`}>{system.security}</span>
                    </div>
                  </div>
                  
                  <div className="waste-analysis">
                    <div className="waste-visual">{system.visual}</div>
                    <p className="waste-description">{system.waste}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {selectedSystem && (
          <div className="insight-section">
            <h3>💡 What's the key insight?</h3>
            <div className="insight-choices">
              {insights.map((insight) => (
                <OptionButton
                  key={insight.value}
                  selected={userInsight === insight.value}
                  onClick={() => setUserInsight(insight.value)}
                >
                  {insight.text}
                </OptionButton>
              ))}
            </div>

            {userInsight && (
              <div className="insight-result">
                <div className="result-icon">
                  {userInsight === 'transformation' ? '🎯' : '💭'}
                </div>
                <p>
                  {userInsight === 'transformation' && "Exactly! Bitcoin turns energy into mathematical proof that can't be faked."}
                  {userInsight === 'comparison' && "True! Banks waste energy on buildings and still get hacked. Bitcoin's energy creates actual security."}
                  {userInsight === 'unfakeable' && "You've got it! The energy cost is what makes Bitcoin impossible to counterfeit."}
                </p>
              </div>
            )}
          </div>
        )}

        <ContinueButton
          onClick={onComplete}
          completed={selectedSystem && userInsight}
          nextStep="The Double-Spend Challenge"
        >
          Continue to Double-Spend Challenge →
        </ContinueButton>
      </div>
    );
  };

  // Double Spend Lab Component - Streamlined with direct experimentation
  const DoubleSpendLab = ({ content, onComplete }) => {
    const [userChoice, setUserChoice] = useState(null);
    const [attemptResult, setAttemptResult] = useState(null);
    const [userRealization, setUserRealization] = useState(null);

    const scenarios = [
      {
        id: 'physical',
        title: "Physical World: Your Energy",
        description: "You just spent 1000 calories pushing that heavy box through quicksand",
        question: "Can you use those same 1000 calories to push another box?",
        action: "Try to Use Same Energy Again",
        result: "❌ IMPOSSIBLE! You're exhausted - energy is spent"
      },
      {
        id: 'digital',
        title: "Digital World: Bank Balance",
        description: "You just spent $1000 from your bank account",
        question: "Can you spend that same $1000 again?",
        action: "Try to Double-Spend",
        result: "🤔 MAYBE... if you hack the system or bank messes up"
      },
      {
        id: 'bitcoin',
        title: "Bitcoin World: Energy-Backed Bits",
        description: "You just spent 1000 energy units to create a Bitcoin transaction",
        question: "Can you use those same energy units again?",
        action: "Try to Double-Spend Bitcoin",
        result: "❌ IMPOSSIBLE! Energy is physically spent, transaction is locked"
      }
    ];

    const realizations = [
      { text: "Bitcoin is like physical energy - can't be spent twice", value: "physical" },
      { text: "Bank money is just numbers - easier to manipulate", value: "digital" },
      { text: "Energy cost makes Bitcoin unfakeable", value: "energy" }
    ];

    const handleScenarioClick = (scenarioId) => {
      setUserChoice(scenarioId);
      setAttemptResult(scenarios.find(s => s.id === scenarioId));
    };

    return (
      <div className="double-spend-lab-streamlined">
        <div className="lab-header">
          <h2>⚡ The Double-Spend Challenge</h2>
          <p className="subtitle">Try to spend the same thing twice</p>
        </div>

        <div className="scenarios-grid">
          {scenarios.map((scenario) => (
            <div 
              key={scenario.id}
              className={`scenario-card ${userChoice === scenario.id ? 'selected' : ''}`}
            >
              <h3>{scenario.title}</h3>
              <p className="scenario-description">{scenario.description}</p>
              
              <div className="scenario-challenge">
                <strong>{scenario.question}</strong>
              </div>

              <ActionButton
                variant={scenario.id === 'digital' ? 'warning' : 'primary'}
                onClick={() => handleScenarioClick(scenario.id)}
                disabled={userChoice && userChoice !== scenario.id}
                className="scenario-btn"
              >
                {scenario.action}
              </ActionButton>

              {userChoice === scenario.id && (
                <div className="scenario-result">
                  <div className="result-box">
                    <p className="result-text">{scenario.result}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {attemptResult && (
          <div className="realization-section">
            <h3>💡 What's the pattern you notice?</h3>
            <div className="realization-choices">
              {realizations.map((realization) => (
                <OptionButton
                  key={realization.value}
                  selected={userRealization === realization.value}
                  onClick={() => setUserRealization(realization.value)}
                >
                  {realization.text}
                </OptionButton>
              ))}
            </div>

            {userRealization && (
              <div className="realization-result">
                <div className="result-icon">
                  {userRealization === 'physical' ? '🎯' : '💭'}
                </div>
                <p>
                  {userRealization === 'physical' && "Exactly! Bitcoin brings physical scarcity to the digital world."}
                  {userRealization === 'digital' && "True! Traditional digital money is just database entries that can be changed."}
                  {userRealization === 'energy' && "Perfect! The energy spent to secure Bitcoin can't be spent again - just like calories."}
                </p>
              </div>
            )}
          </div>
        )}

        <ContinueButton
          onClick={onComplete}
          completed={attemptResult && userRealization}
          nextStep="Your Bitcoin Journey"
        >
          Continue to Final Thoughts →
        </ContinueButton>
      </div>
    );
  };

  // Reflection Component - Streamlined with key insights
  const Reflection = ({ content, onComplete }) => {
    const [selectedInsight, setSelectedInsight] = useState(null);
    const [finalChoice, setFinalChoice] = useState(null);

    const keyInsights = [
      {
        id: 'energy',
        title: "Energy = Security",
        description: "Bitcoin uses energy cost to make digital money unfakeable",
        icon: "⚡🔒"
      },
      {
        id: 'physics',
        title: "Digital Physics",
        description: "Bitcoin brings physical scarcity to the digital world",
        icon: "🌐🏋️‍♂️"
      },
      {
        id: 'trust',
        title: "Trust in Math, Not People",
        description: "No need to trust banks when math does the work",
        icon: "🧮💯"
      }
    ];

    const finalChoices = [
      { text: "I want to learn more about how Bitcoin actually works", value: "continue" },
      { text: "I need to think about this before going deeper", value: "pause" },
      { text: "I'm ready to explore Bitcoin's code and design", value: "advanced" }
    ];

    return (
      <div className="final-reflection-streamlined">
        <div className="reflection-header">
          <h2>🎯 The Bitcoin Breakthrough</h2>
          <p className="subtitle">You've discovered why Bitcoin is different</p>
        </div>

        <div className="insights-summary">
          <h3>💡 Which insight resonates most with you?</h3>
          <div className="insights-grid">
            {keyInsights.map((insight) => (
              <div 
                key={insight.id}
                className={`insight-card ${selectedInsight === insight.id ? 'selected' : ''}`}
                onClick={() => setSelectedInsight(insight.id)}
              >
                <div className="insight-icon">{insight.icon}</div>
                <h4>{insight.title}</h4>
                <p>{insight.description}</p>
              </div>
            ))}
          </div>
        </div>

        {selectedInsight && (
          <div className="journey-continuation">
            <h3>🚀 What's next on your Bitcoin journey?</h3>
            <div className="final-choices">
              {finalChoices.map((choice) => (
                <OptionButton
                  key={choice.value}
                  selected={finalChoice === choice.value}
                  onClick={() => setFinalChoice(choice.value)}
                  className="journey-choice"
                >
                  {choice.text}
                </OptionButton>
              ))}
            </div>

            {finalChoice && (
              <div className="journey-result">
                <div className="result-icon">🎯</div>
                <p>
                  {finalChoice === 'continue' && "Perfect! The next modules will dive deeper into Bitcoin's design and how it all fits together."}
                  {finalChoice === 'pause' && "Smart approach! Take time to let these concepts sink in. Bitcoin will be here when you're ready."}
                  {finalChoice === 'advanced' && "Excellent! You're ready to explore the technical magic that makes Bitcoin work."}
                </p>
              </div>
            )}
          </div>
        )}

        <ContinueButton
          onClick={onComplete}
          completed={selectedInsight && finalChoice}
          nextStep="Module Complete"
        >
          Complete Bitcoin Basics →
        </ContinueButton>
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
        title: "🏋️‍♂️ Feel the Power of Proof-of-Work",
        subtitle: "You're about to discover why energy cost equals security",
        primeText: "Try moving the box across two different surfaces:",
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
        title: "💸 Meet Sarah's $270,000 Problem",
        subtitle: "She has $30,000. She needs $300,000 for a house.",
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
      title: "Energy: Waste vs. Security",
      type: "bank-waste",
      content: {
        title: "🌡️ The Great Energy Waste Mystery",
        subtitle: "Which system actually wastes more energy?",
        primeText: "Time to compare how different systems use energy:"
      }
    },
    {
      title: "The Double-Spend Challenge",
      type: "double-spend-lab",
      content: {
        title: "⚡ The Double-Spend Challenge",
        subtitle: "Try to spend the same thing twice"
      }
    },
    {
      title: "Your Bitcoin Journey",
      type: "reflection",
      content: {
        title: "🎯 The Bitcoin Breakthrough",
        subtitle: "You've discovered why Bitcoin is different"
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