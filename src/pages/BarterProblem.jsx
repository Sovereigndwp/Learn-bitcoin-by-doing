import React, { useState } from 'react';
import { ActionButton, StepNavigation } from '../components/EnhancedButtons';
import '../components/ModuleCommon.css';

const BarterProblem = ({ onComplete }) => {
  const [currentScenario, setCurrentScenario] = useState(0);
  const [playerChoice, setPlayerChoice] = useState(null);
  const [showOutcome, setShowOutcome] = useState(false);
  const [discoveredProblems, setDiscoveredProblems] = useState(new Set());

  const economicScenarios = [
    {
      id: 1,
      title: "🍞 The Baker's Problem",
      situation: "You're a baker. You need shoes, but the shoemaker doesn't want bread.",
      trader: "Shoemaker says: 'I already have bread. I need a haircut.'",
      choice: "What do you do?",
      options: [
        { 
          id: 1, 
          text: 'Give up and go home', 
          result: 'reject',
          problem: 'coincidence'
        },
        { 
          id: 2, 
          text: 'Find someone who wants bread AND can give the shoemaker a haircut', 
          result: 'chain',
          problem: 'complexity'
        },
        { 
          id: 3, 
          text: 'Search for other shoemakers', 
          result: 'search',
          problem: 'time'
        }
      ]
    },
    {
      id: 2,
      title: "🏠 The House Builder's Challenge",
      situation: "You want to build a house. You need: bricks, wood, nails, and tools. But everyone wants different things from you.",
      trader: "Brick maker wants fish. Wood seller wants clothes. Nail maker wants meat. Tool maker wants grain.",
      choice: "This is getting complicated...",
      options: [
        { 
          id: 1, 
          text: 'Try to coordinate all these trades at once', 
          result: 'chaos',
          problem: 'timing'
        },
        { 
          id: 2, 
          text: 'Map out all the trades you need to make', 
          result: 'insight',
          problem: 'complexity'
        },
        { 
          id: 3, 
          text: 'Build a smaller house', 
          result: 'quit',
          problem: 'failure'
        }
      ]
    },
    {
      id: 3,
      title: "⏰ The Timing Problem",
      situation: "You need to make 4 trades in a row, but the timing has to be perfect.",
      trader: "The brick maker says: 'I already traded my bricks yesterday. Come back next month.'",
      choice: "Everything has to happen at exactly the right time...",
      options: [
        { 
          id: 1, 
          text: 'Start all over again', 
          result: 'chaos',
          problem: 'timing'
        },
        { 
          id: 2, 
          text: 'Realize this system has serious problems', 
          result: 'epiphany',
          problem: 'system'
        },
        { 
          id: 3, 
          text: 'Think about what everyone would accept', 
          result: 'solution',
          problem: 'innovation'
        }
      ]
    }
  ];

  const problemTypes = {
    coincidence: "Both People Must Want What the Other Has",
    complexity: "Too Many Steps Required", 
    time: "Takes Too Long to Find Trading Partners",
    timing: "Everything Must Happen at the Same Time",
    failure: "System Doesn't Work",
    system: "The Whole Approach is Flawed",
    innovation: "Need a Better Solution"
  };

  const handleChoice = (optionId) => {
    setPlayerChoice(optionId);
    setShowOutcome(true);
    
    const selectedOption = economicScenarios[currentScenario].options.find(opt => opt.id === optionId);
    if (selectedOption?.problem) {
      setDiscoveredProblems(prev => new Set([...prev, selectedOption.problem]));
    }
  };

  const handleNext = () => {
    if (currentScenario < economicScenarios.length - 1) {
      setCurrentScenario(prev => prev + 1);
      setPlayerChoice(null);
      setShowOutcome(false);
    }
  };

  const handlePrevious = () => {
    if (currentScenario > 0) {
      setCurrentScenario(prev => prev - 1);
      setPlayerChoice(null);
      setShowOutcome(false);
    }
  };

  const getOutcomeText = (result) => {
    const outcomes = {
      reject: "❌ Trade fails because you both don't want what the other has.",
      chain: "🔗 You realize you need to find multiple people and coordinate complex trades.",
      search: "🔍 You spend hours looking but most people don't want bread.",
      quit: "⏸️ You give up because it's too complicated.",
      insight: "💡 You see that coordinating multiple trades gets extremely difficult.",
      chaos: "🌪️ When one person isn't ready, the whole chain falls apart.",
      epiphany: "⚡ You realize the problem isn't the people - it's the system itself.",
      solution: "🧠 What if there was something everyone would accept? That's the idea behind money."
    };
    return outcomes[result] || "You tried something...";
  };

  const currentScenarioData = economicScenarios[currentScenario];
  
  return (
    <div className="module-container">
      <div className="section-card">
        <h1 className="heading-critical">Barter Problem</h1>
        <p>Before money existed, people had to trade directly with each other. Let's see what problems this created.</p>
      </div>
        
      <div className="card-feature">
        <h2 className="heading-high">Trading Scenarios</h2>
        <p>Click through these everyday trading examples to see what really happens...</p>

        <div className="scenario-tracker">
          <div className="analysis-stats">
            <div className="stat-item">
              <span className="stat-label">Scenario:</span>
              <span className="stat-value">{currentScenario + 1} of {economicScenarios.length}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Problems Found:</span>
              <span className="stat-value">{discoveredProblems.size}</span>
            </div>
          </div>
        </div>

        <div className="card-content">
          <div className="scenario-header">
            <h3 className="heading-medium">{currentScenarioData.title}</h3>
            <div className="scenario-setup">
              <p><strong>Situation:</strong> {currentScenarioData.situation}</p>
              <p><strong>What happens:</strong> {currentScenarioData.trader}</p>
            </div>
          </div>
          
          <div className="choice-section">
            <p><strong>{currentScenarioData.choice}</strong></p>
            
            {!showOutcome ? (
              <div className="choice-options">
                {currentScenarioData.options.map(option => (
                  <ActionButton
                    key={option.id}
                    onClick={() => handleChoice(option.id)}
                    variant="outline"
                  >
                    {option.text}
                  </ActionButton>
                ))}
              </div>
            ) : (
              <div className="outcome-display">
                <div className="choice-result">
                  <p><strong>You chose:</strong> {economicScenarios[currentScenario].options.find(o => o.id === playerChoice)?.text}</p>
                  <div className="outcome-box">
                    <p className="outcome-text">{getOutcomeText(economicScenarios[currentScenario].options.find(o => o.id === playerChoice)?.result)}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {discoveredProblems.size > 0 && (
          <div className="card-supporting">
            <h3 className="heading-standard">📊 Problems We've Found:</h3>
            <div className="problems-grid">
              {Array.from(discoveredProblems).map(problem => (
                <div key={problem} className="problem-badge">
                  ✓ {problemTypes[problem]}
                </div>
              ))}
            </div>
          </div>
        )}

        {currentScenario === economicScenarios.length - 1 && showOutcome && (
          <div className="concept-card">
            <div className="conclusion-box">
              <h2 className="heading-high">📈 What We Learned</h2>
              <p>Trading without money is really hard! That's why every society eventually invented some form of money.</p>
              
              <div className="card-supporting">
                <h4 className="heading-standard">The Big Problems:</h4>
                <ul>
                  <li><strong>Hard to Match:</strong> Finding someone who has what you want AND wants what you have</li>
                  <li><strong>Takes Forever:</strong> Searching for the right trading partners</li>
                  <li><strong>Bad Timing:</strong> Everyone needs to be ready to trade at the same time</li>
                  <li><strong>Can't Save:</strong> Food spoils, so you can't store wealth</li>
                  <li><strong>Can't Compare:</strong> How many chickens equals one cow?</li>
                </ul>
              </div>

              <div className="tip-card">
                <h4 className="heading-standard">💡 The Big Idea</h4>
                <p>Money solved these problems by giving people something everyone would accept. This wasn't invented by governments—people created it because they needed it.</p>
              </div>
            </div>

            <ActionButton onClick={() => onComplete(0)} variant="primary">
              Next: Money Functions
            </ActionButton>
          </div>
        )}

        {showOutcome && currentScenario < economicScenarios.length - 1 && (
          <StepNavigation
            currentStep={currentScenario}
            totalSteps={economicScenarios.length}
            onPrevious={handlePrevious}
            onNext={handleNext}
            canGoBack={currentScenario > 0}
            nextLabel="Next Scenario"
          />
        )}
      </div>
    </div>
  );
};

export default BarterProblem; 