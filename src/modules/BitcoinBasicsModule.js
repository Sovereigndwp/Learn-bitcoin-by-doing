import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '../contexts/ProgressContext';
import { Zap, Clock, DollarSign, Users, ArrowRight, Play, TrendingUp } from 'lucide-react';
import { 
  ContinueButton, 
  ActionButton, 
  Button, 
  OptionButton,
  PopupButton
} from '../components/EnhancedButtons';
import '../components/ModuleLayout.css';
import '../components/ModuleCommon.css';
import './BitcoinBasicsModule.css';

const BitcoinBasicsModule = () => {
  const { completeModule } = useProgress();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(new Set());
  const [userInteractions, setUserInteractions] = useState({});
  const [pollResponse, setPollResponse] = useState(null);
  const [paymentTally, setPaymentTally] = useState(0);
  const [showBarterChoice, setShowBarterChoice] = useState(false);
  
  // Real-time payment counter for engagement
  useEffect(() => {
    const interval = setInterval(() => {
      setPaymentTally(prev => prev + Math.floor(Math.random() * 50000) + 30000);
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  
  const handleStepComplete = (index, insights = {}) => {
    const newCompletedSteps = new Set(completedSteps);
    newCompletedSteps.add(index);
    setCompletedSteps(newCompletedSteps);
    
    if (insights) {
      setUserInteractions(prev => ({ ...prev, [index]: insights }));
    }
    
    if (index === microSteps.length - 1) {
      completeModule('bitcoin-basics');
      setTimeout(() => navigate('/'), 2000);
    } else {
      setCurrentStep(index + 1);
    }
  };

  const handleStepChange = (index) => {
    if (index <= Math.max(currentStep, Math.max(...completedSteps) + 1)) {
      setCurrentStep(index);
    }
  };

  // Streamlined Micro-Steps with UX Elements
  const microSteps = [
    {
      id: 'spark-curiosity',
      title: 'The Great Money Mystery',
      uxElement: 'h2 headline',
      engagementHook: 'Micro-poll',
      content: {
        headline: "The Great Money Mystery",
        subtitle: "Ever wonder why we trust tiny bits of paper and plastic?",
        microPoll: {
          question: "When was the last time you used cash?",
          options: [
            "Today", "This week", "This month", "Can't remember", "I'm cash-only"
          ]
        },
        insight: "💡 You're about to discover why most money today isn't actually... money"
      },
      component: SparkCuriosityStep
    },
    {
      id: 'instant-contrast',
      title: 'The Speed Revolution',
      uxElement: 'Interactive tap card',
      engagementHook: 'Real-time payment counter',
      content: {
        tapDemo: {
          message: "Tap to pay. See instant value move.",
          countDisplay: "Payments happening worldwide right now:"
        },
        insight: "Every tap you see represents someone, somewhere, moving value instantly"
      },
      component: InstantContrastStep
    },
    {
      id: 'key-insight',
      title: 'The Prehistoric Problem',
      uxElement: 'Text block with tooltip',
      engagementHook: 'Emoji tooltip reveal',
      content: {
        mainText: "All this speed solves a single prehistoric headache: exchanging what you have for what you need.",
        tooltip: {
          trigger: "💱",
          reveal: "Money = universal swap token"
        },
        deeperInsight: "But what happens when the 'universal swap token' can be created from nothing?"
      },
      component: KeyInsightStep
    },
    {
      id: 'time-travel-invite',
      title: 'Journey to the Beginning',
      uxElement: 'Big CTA button',
      engagementHook: 'Button animation after 3s',
      content: {
        invitation: "Ready to see where it all began?",
        ctaButton: {
          text: "Travel 10,000 years back",
          animation: "shakes after 3s if untouched"
        },
        preview: "You're about to experience the original money problem..."
      },
      component: TimeTravelInviteStep
    },
    {
      id: 'role-play-intro',
      title: 'Meet Paco the Potato Farmer',
      uxElement: 'Story card with choices',
      engagementHook: 'Quick-choice quiz leading to barter frustration',
      content: {
        scenario: "You are Paco the Potato Farmer. Feet frozen. Zero shoes. No one wants potatoes today.",
        quickChoice: {
          question: "What do you try first?",
          options: [
            { id: 'trade', text: 'Try to trade potatoes', outcome: 'barter_frustration' },
            { id: 'make', text: 'Try to make shoes yourself', outcome: 'barter_frustration' },
            { id: 'give-up', text: 'Give up and stay cold', outcome: 'barter_frustration' }
          ],
          allRouteToFrustration: true
        }
      },
      component: RolePlayIntroStep
    },
    {
      id: 'barter-friction',
      title: 'Feel the Friction',
      uxElement: 'Interactive friction demo',
      engagementHook: 'Drag and drop difficulty simulation',
      content: {
        frictionDemo: {
          scenario: "Try to make these trades work:",
          trades: [
            { have: "🥔 Potatoes", want: "👟 Shoes", difficulty: "Shoemaker wants fish" },
            { have: "🥔 Potatoes", want: "🐟 Fish", difficulty: "Fisherman wants meat" },
            { have: "🥔 Potatoes", want: "🥩 Meat", difficulty: "Butcher wants gold" }
          ]
        },
        insight: "Each failed trade makes you colder and hungrier..."
      },
      component: BarterFrictionStep
    },
    {
      id: 'modern-magic',
      title: 'The Modern Magic',
      uxElement: 'Before/after comparison',
      engagementHook: 'Smooth transition animation',
      content: {
        comparison: {
          before: {
            title: "10,000 years ago",
            scenario: "Finding someone who wants exactly what you have, and has exactly what you want",
            difficulty: "Nearly impossible"
          },
          after: {
            title: "Today",
            scenario: "Tap phone. Value moves instantly anywhere in the world.",
            difficulty: "Effortless"
          }
        },
        revelation: "But how did we get from impossible to effortless?"
      },
      component: ModernMagicStep
    },
    {
      id: 'trust-question',
      title: 'The Trust Question',
      uxElement: 'Interactive trust meter',
      engagementHook: 'Trust level adjustment slider',
      content: {
        centralQuestion: "That modern magic depends on one thing: TRUST",
        trustMeter: {
          entities: [
            { name: "Your Bank", trustLevel: 70 },
            { name: "Payment Processor", trustLevel: 65 },
            { name: "Government", trustLevel: 45 },
            { name: "Internet Infrastructure", trustLevel: 80 }
          ]
        },
        revelation: "What if there was a way to not need trust at all?"
      },
      component: TrustQuestionStep
    },
    {
      id: 'energy-trust',
      title: 'Energy = Trust',
      uxElement: 'Physical simulation',
      engagementHook: 'Drag box across surfaces',
      content: {
        physicsDemo: {
          instruction: "Try moving the box across two different surfaces:",
          surfaces: {
            ice: { name: "Ice (No Energy)", resistance: 0, trust: "Low" },
            concrete: { name: "Concrete (High Energy)", resistance: 100, trust: "High" }
          }
        },
        insight: "Energy spent = Trust earned. No energy = No trust."
      },
      component: EnergyTrustStep
    },
    {
      id: 'bitcoin-breakthrough',
      title: 'The Bitcoin Breakthrough',
      uxElement: 'Revelation animation',
      engagementHook: 'Progressive disclosure',
      content: {
        breakthrough: {
          problem: "Money that requires trusting humans",
          solution: "Money secured by energy (not promises)",
          mechanism: "Proof-of-Work: Energy spent proves transactions are real"
        },
        connections: [
          "Paco's barter problem → Solved by universal medium of exchange",
          "Modern trust problem → Solved by mathematical proof",
          "Energy requirement → Creates real security (like concrete vs ice)"
        ]
      },
      component: BitcoinBreakthroughStep
    }
  ];

  const renderCurrentStep = () => {
    const step = microSteps[currentStep];
    const StepComponent = step.component;
    return (
      <StepComponent
        content={step.content}
        onComplete={(insights) => handleStepComplete(currentStep, insights)}
        userInteractions={userInteractions}
        pollResponse={pollResponse}
        setPollResponse={setPollResponse}
        paymentTally={paymentTally}
        showBarterChoice={showBarterChoice}
        setShowBarterChoice={setShowBarterChoice}
      />
    );
  };

  return (
    <div className="module-container bitcoin-basics-enhanced">
      <div className="module-header">
        <h1 className="module-title">
          <Zap className="module-icon" />
          Bitcoin Basics: From Barter to Digital Gold
        </h1>
        <p className="module-subtitle">
          Discover why Bitcoin solves humanity's oldest problem
        </p>
      </div>

      {/* Micro-Step Progress */}
      <div className="micro-progress">
        <div className="progress-header">
          <span>Understanding Bitcoin</span>
          <span>{completedSteps.size} / {microSteps.length} insights</span>
        </div>
        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ width: `${(completedSteps.size / microSteps.length) * 100}%` }}
          />
        </div>
        <div className="micro-steps-nav">
          {microSteps.map((step, index) => (
            <div
              key={step.id}
              className={`micro-step ${index === currentStep ? 'active' : ''} ${completedSteps.has(index) ? 'completed' : ''} ${index <= Math.max(currentStep, Math.max(...completedSteps) + 1) ? 'available' : 'locked'}`}
              onClick={() => handleStepChange(index)}
            >
              <div className="step-number">{index + 1}</div>
              <div className="step-title">{step.title}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Current Step Content */}
      <div className="step-content">
        {renderCurrentStep()}
      </div>
    </div>
  );
};

// Micro-Step Components with Enhanced Interactions
const SparkCuriosityStep = ({ content, onComplete, pollResponse, setPollResponse }) => {
  const [showInsight, setShowInsight] = useState(false);

  const handlePollResponse = (response) => {
    setPollResponse(response);
    setShowInsight(true);
    setTimeout(() => onComplete({ pollResponse: response }), 2000);
  };

  return (
    <div className="spark-curiosity-step">
      <div className="curiosity-header">
        <h2>{content.headline}</h2>
        <p className="subtitle">{content.subtitle}</p>
      </div>

      <div className="micro-poll">
        <h3>{content.microPoll.question}</h3>
        <div className="poll-options">
          {content.microPoll.options.map((option, index) => (
            <OptionButton
              key={index}
              selected={pollResponse === option}
              onClick={() => handlePollResponse(option)}
              disabled={pollResponse !== null}
              className="poll-option"
              feedback="haptic"
              ariaLabel={`Poll option: ${option}`}
              id={`poll-option-${index}`}
            >
              {option}
            </OptionButton>
          ))}
        </div>
      </div>

      {showInsight && (
        <div className="insight-reveal">
          <div className="insight-text">{content.insight}</div>
        </div>
      )}
    </div>
  );
};

const InstantContrastStep = ({ content, onComplete, paymentTally }) => {
  const [taps, setTaps] = useState(0);
  const [showContinue, setShowContinue] = useState(false);

  const handleTap = () => {
    setTaps(prev => prev + 1);
    if (taps + 1 >= 5) {
      setShowContinue(true);
    }
  };

  return (
    <div className="instant-contrast-step">
      <div className="tap-demo">
        <ActionButton 
          className="tap-card"
          onClick={handleTap}
          context="demo"
          feedback="haptic"
          ariaLabel={`Tap to simulate payment. Tapped ${taps} times`}
          success={taps >= 5}
        >
          <div className="tap-instruction">{content.tapDemo.message}</div>
          <div className="tap-counter">You've tapped: {taps} times</div>
        </ActionButton>
      </div>

      <div className="payment-counter">
        <h3>{content.tapDemo.countDisplay}</h3>
        <div className="tally-display">
          <span className="tally-number">{paymentTally.toLocaleString()}</span>
          <span className="tally-label">payments in last second</span>
        </div>
      </div>

      <div className="insight-box">
        <p>{content.insight}</p>
      </div>

      {showContinue && (
        <ContinueButton 
          onClick={() => onComplete({ tapsCompleted: taps })}
          showProgress={true}
          feedback="visual"
          ariaLabel="Continue to next step after completing tap demonstration"
        >
          Amazing! Show me why this matters
        </ContinueButton>
      )}
    </div>
  );
};

const KeyInsightStep = ({ content, onComplete }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="key-insight-step">
      <div className="insight-content">
        <p className="main-text">
          {content.mainText}
        </p>
        
        <PopupButton
          className="tooltip-trigger"
          popupContent={content.tooltip.reveal}
          popupTitle="Money Definition"
          triggerOn="hover"
          position="top"
          onOpen={() => setShowTooltip(true)}
          ariaLabel="Show money definition tooltip"
        >
          {content.tooltip.trigger}
        </PopupButton>
        
        {showTooltip && (
          <div className="deeper-insight">
            <p>{content.deeperInsight}</p>
          </div>
        )}
      </div>

      <ContinueButton 
        onClick={() => onComplete({ tooltipRevealed: showTooltip })}
        feedback="visual"
        ariaLabel="Continue after understanding the key insight"
      >
        This changes everything...
      </ContinueButton>
    </div>
  );
};

const TimeTravelInviteStep = ({ content, onComplete }) => {
  const [buttonShaking, setButtonShaking] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setButtonShaking(true);
      setTimeout(() => setButtonShaking(false), 1000);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="time-travel-step">
      <div className="invitation">
        <h3>{content.invitation}</h3>
        <p>{content.preview}</p>
      </div>

      <ActionButton
        className={`time-travel-button ${buttonShaking ? 'shaking' : ''}`}
        onClick={() => onComplete({ timeTravelAccepted: true })}
        context="demo"
        action="primary"
        feedback="haptic"
        icon={<Clock className="button-icon" />}
        iconPosition="left"
        size="lg"
        ariaLabel="Travel back in time to understand money's origins"
        autoFocus={buttonShaking}
      >
        {content.ctaButton.text}
      </ActionButton>
    </div>
  );
};

const RolePlayIntroStep = ({ content, onComplete, showBarterChoice, setShowBarterChoice }) => {
  const [selectedChoice, setSelectedChoice] = useState(null);

  const handleChoice = (choice) => {
    setSelectedChoice(choice);
    setShowBarterChoice(true);
    setTimeout(() => {
      onComplete({ 
        selectedChoice: choice.id,
        discoveredFrustration: true 
      });
    }, 2000);
  };

  return (
    <div className="role-play-step">
      <div className="scenario-card">
        <h3>🥔 Your Story Begins</h3>
        <p className="scenario-text">{content.scenario}</p>
      </div>

      <div className="quick-choice">
        <h4>{content.quickChoice.question}</h4>
        <div className="choice-options">
          {content.quickChoice.options.map((option) => (
            <button
              key={option.id}
              className={`choice-button ${selectedChoice?.id === option.id ? 'selected' : ''}`}
              onClick={() => handleChoice(option)}
              disabled={selectedChoice !== null}
            >
              {option.text}
            </button>
          ))}
        </div>
      </div>

      {showBarterChoice && selectedChoice && (
        <div className="choice-outcome">
          <p>💭 <em>This is harder than it looks... Let me feel the real friction</em></p>
        </div>
      )}
    </div>
  );
};

const BarterFrictionStep = ({ content, onComplete }) => {
  const [attempts, setAttempts] = useState(0);
  const [currentTrade, setCurrentTrade] = useState(0);
  const [frustration, setFrustration] = useState(0);

  const handleTradeAttempt = () => {
    setAttempts(prev => prev + 1);
    setFrustration(prev => prev + 25);
    
    if (currentTrade < content.frictionDemo.trades.length - 1) {
      setCurrentTrade(prev => prev + 1);
    } else {
      setTimeout(() => onComplete({ 
        totalAttempts: attempts + 1,
        frustrationLevel: frustration + 25 
      }), 1500);
    }
  };

  const trade = content.frictionDemo.trades[currentTrade];

  return (
    <div className="barter-friction-step">
      <div className="friction-demo">
        <h3>{content.frictionDemo.scenario}</h3>
        
        <div className="trade-attempt">
          <div className="trade-items">
            <div className="have-item">
              <span>You have: {trade.have}</span>
            </div>
            <div className="arrow">→</div>
            <div className="want-item">
              <span>You want: {trade.want}</span>
            </div>
          </div>
          
          <div className="trade-difficulty">
            <p>❌ {trade.difficulty}</p>
          </div>

          <button 
            className="attempt-button"
            onClick={handleTradeAttempt}
          >
            Try this trade
          </button>
        </div>

        <div className="frustration-meter">
          <div className="meter-label">Frustration Level:</div>
          <div className="meter-bar">
            <div 
              className="meter-fill"
              style={{ width: `${frustration}%` }}
            />
          </div>
          <div className="meter-text">{frustration}% frustrated</div>
        </div>
      </div>

      <div className="insight-text">
        <p>{content.insight}</p>
      </div>
    </div>
  );
};

const ModernMagicStep = ({ content, onComplete }) => {
  const [showAfter, setShowAfter] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAfter(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="modern-magic-step">
      <div className="comparison-container">
        <div className="before-section">
          <h3>{content.comparison.before.title}</h3>
          <p>{content.comparison.before.scenario}</p>
          <div className="difficulty before">{content.comparison.before.difficulty}</div>
        </div>

        {showAfter && (
          <div className="after-section animate-in">
            <h3>{content.comparison.after.title}</h3>
            <p>{content.comparison.after.scenario}</p>
            <div className="difficulty after">{content.comparison.after.difficulty}</div>
          </div>
        )}
      </div>

      {showAfter && (
        <div className="revelation">
          <p>{content.revelation}</p>
          <ContinueButton onClick={() => onComplete({ comparisonViewed: true })}>
            Show me how we got here
          </ContinueButton>
        </div>
      )}
    </div>
  );
};

const TrustQuestionStep = ({ content, onComplete }) => {
  const [trustLevels, setTrustLevels] = useState(
    content.trustMeter.entities.reduce((acc, entity) => {
      acc[entity.name] = entity.trustLevel;
      return acc;
    }, {})
  );
  const [allAdjusted, setAllAdjusted] = useState(false);

  const handleTrustAdjustment = (entityName, newLevel) => {
    setTrustLevels(prev => {
      const updated = { ...prev, [entityName]: newLevel };
      const adjusted = Object.values(updated).every(level => level !== content.trustMeter.entities.find(e => e.name === entityName)?.trustLevel);
      if (adjusted && Object.keys(updated).length === content.trustMeter.entities.length) {
        setAllAdjusted(true);
      }
      return updated;
    });
  };

  return (
    <div className="trust-question-step">
      <div className="central-question">
        <h3>{content.centralQuestion}</h3>
      </div>

      <div className="trust-meters">
        {content.trustMeter.entities.map((entity) => (
          <div key={entity.name} className="trust-entity">
            <label>{entity.name}</label>
            <input
              type="range"
              min="0"
              max="100"
              value={trustLevels[entity.name]}
              onChange={(e) => handleTrustAdjustment(entity.name, parseInt(e.target.value))}
              className="trust-slider"
            />
            <span>{trustLevels[entity.name]}% trust</span>
          </div>
        ))}
      </div>

      {allAdjusted && (
        <div className="revelation">
          <p>{content.revelation}</p>
          <ContinueButton onClick={() => onComplete({ trustLevels })}>
            No trust needed? How is that possible?
          </ContinueButton>
        </div>
      )}
    </div>
  );
};

const EnergyTrustStep = ({ content, onComplete }) => {
  const [dragPosition, setDragPosition] = useState({ ice: 0, concrete: 0 });
  const [energySpent, setEnergySpent] = useState({ ice: 0, concrete: 0 });
  const [bothTested, setBothTested] = useState(false);

  const handleDrag = (surface, position) => {
    setDragPosition(prev => ({ ...prev, [surface]: position }));
    
    const resistance = content.physicsDemo.surfaces[surface].resistance;
    const energy = Math.floor(position * resistance / 100);
    setEnergySpent(prev => {
      const updated = { ...prev, [surface]: energy };
      if (updated.ice > 0 && updated.concrete > 0) {
        setBothTested(true);
      }
      return updated;
    });
  };

  return (
    <div className="energy-trust-step">
      <div className="physics-demo">
        <h3>{content.physicsDemo.instruction}</h3>
        
        {Object.entries(content.physicsDemo.surfaces).map(([surfaceKey, surface]) => (
          <div key={surfaceKey} className="surface-test">
            <div className="surface-info">
              <h4>{surface.name}</h4>
              <p>Trust Level: {surface.trust}</p>
            </div>
            
            <div className="drag-area">
              <input
                type="range"
                min="0"
                max="100"
                value={dragPosition[surfaceKey]}
                onChange={(e) => handleDrag(surfaceKey, parseInt(e.target.value))}
                className={`drag-slider ${surfaceKey}`}
              />
              <div className="energy-display">
                Energy spent: {energySpent[surfaceKey]} units
              </div>
            </div>
          </div>
        ))}
      </div>

      {bothTested && (
        <div className="insight-reveal">
          <p>{content.insight}</p>
          <ContinueButton onClick={() => onComplete({ 
            energySpent,
            understoodEnergyTrustConnection: true 
          })}>
            Now I get it! Show me Bitcoin
          </ContinueButton>
        </div>
      )}
    </div>
  );
};

const BitcoinBreakthroughStep = ({ content, onComplete }) => {
  const [connectionsRevealed, setConnectionsRevealed] = useState(0);

  const revealConnection = () => {
    if (connectionsRevealed < content.connections.length) {
      setConnectionsRevealed(prev => prev + 1);
    }
  };

  return (
    <div className="bitcoin-breakthrough-step">
      <div className="breakthrough-revelation">
        <h3>🚀 {content.breakthrough.problem}</h3>
        <div className="solution-arrow">↓</div>
        <h3>⚡ {content.breakthrough.solution}</h3>
        <div className="mechanism">
          <p><strong>How:</strong> {content.breakthrough.mechanism}</p>
        </div>
      </div>

      <div className="connections">
        <h4>Connect the dots:</h4>
        {content.connections.slice(0, connectionsRevealed).map((connection, index) => (
          <div key={index} className="connection-item animate-in">
            {connection}
          </div>
        ))}
        
        {connectionsRevealed < content.connections.length && (
          <ActionButton 
            className="reveal-button" 
            onClick={revealConnection}
            variant="demo"
            size="small"
          >
            Show next connection
          </ActionButton>
        )}
      </div>

      {connectionsRevealed === content.connections.length && (
        <div className="completion">
          <h4>🎯 You've discovered Bitcoin's breakthrough!</h4>
          <ContinueButton onClick={() => onComplete({ 
            allConnectionsUnderstood: true,
            readyForTechnicalDetails: true 
          })}>
            I'm ready to learn more about Bitcoin
          </ContinueButton>
        </div>
      )}
    </div>
  );
};

export default BitcoinBasicsModule; 