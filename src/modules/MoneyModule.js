import React, { useState, useEffect } from 'react';
import { useProgress } from '../contexts/ProgressContext';
import { Coins, Trophy, CheckCircle, Brain, History, Award, Clock, Lightbulb, Target, Zap } from 'lucide-react';
import AnimatedIcon from '../components/AnimatedIcon';
import '../components/ModuleLayout.css';
import '../components/ModuleCommon.css';
import '../components/MoneyModule.css';

// Component for the Introduction (transition from banking friction)
const Introduction = ({ onComplete }) => {
  return (
    <div className="step-content introduction">
      <div className="module-header-box">
        <h2>The Great Money Mystery: Why Does This Thing Even Exist?</h2>
        <div className="intro-text">
          <p className="prime-text">You just experienced how broken modern money feels. But what if I told you money wasn't supposed to be this complicated?</p>
        </div>
      </div>
      <div className="content-text">
        <p>
          Think about it: You carry around little pieces of paper and plastic rectangles, and somehow everyone agrees they're "valuable."
        </p>
        <p>
          You tap your phone on a machine, and invisible numbers move around the world.
        </p>
        <p>
          But behind all that complexity is a surprisingly simple story: <strong>Humans needed to solve the world's most annoying problem.</strong>
        </p>
        <div className="transition-hook">
          <h3>🚀 Ready to Experience the Problem?</h3>
          <p>Instead of telling you, let's travel back 10,000 years and let you experience the frustration firsthand.</p>
          <p><em>You're about to become a potato farmer who desperately needs shoes. Good luck finding someone to trade with!</em></p>
        </div>

        <button onClick={() => onComplete(0)} className="continue-button">
          Take Me Back in Time
        </button>
      </div>
    </div>
  );
};

// Component for the Barter World section
const BarterWorld = ({ onComplete }) => {
  const [gameStep, setGameStep] = useState(0);
  const [currentTrader, setCurrentTrader] = useState(0);
  const [tradeAttempts, setTradeAttempts] = useState(0);
  const [tradeHistory, setTradeHistory] = useState([]);
  const [inventory, setInventory] = useState("🥔 Potatoes");
  const [visitedTraders, setVisitedTraders] = useState(new Set());
  const [frustrationLevel, setFrustrationLevel] = useState(0);

  // Helper function for achievements (placeholder for now)
  const showAchievement = (title, description) => {
    console.log(`Achievement: ${title} - ${description}`);
    // This will be replaced by the proper notification system later
  };

  const tradeRoute = [
    { 
      id: 1, 
      person: "Baker", 
      location: "Village Square", 
      have: "🍞 Bread", 
      want: "🧱 Bricks", 
      dialogue: "I need bricks to build a new oven. Do you have any?"
    },
    { 
      id: 2, 
      person: "Fisher", 
      location: "River Bank", 
      have: "🐟 Fish", 
      want: "🍞 Bread", 
      dialogue: "I'm hungry and need bread. Got any to trade?"
    },
    { 
      id: 3, 
      person: "Builder", 
      location: "Construction Site", 
      have: "🧱 Bricks", 
      want: "🐟 Fish", 
      dialogue: "I need fish to feed my workers. Can you help?"
    },
    { 
      id: 4, 
      person: "Cobbler", 
      location: "Market Street", 
      have: "👟 Shoes", 
      want: "🥔 Potatoes", 
      dialogue: "Perfect! I love potatoes and I have shoes to trade!"
    }
  ];

  const handleTradeAttempt = (trader) => {
    if (!trader) return;
    
    setTradeAttempts(prev => prev + 1);
    setVisitedTraders(prev => new Set(prev).add(currentTrader));
    
    // Check if this trader wants what we have
    const canTrade = trader.want === inventory;
    
    if (canTrade) {
      // Successful trade - update inventory
      const newInventory = trader.have;
      setInventory(newInventory);
      setTradeHistory(prev => [...prev, {
        from: trader.person,
        traded: inventory,
        received: newInventory,
        location: trader.location,
        success: true
      }]);
      
      // If this was the cobbler, we're done!
      if (currentTrader === tradeRoute.length - 1) {
        setTimeout(() => setGameStep(1), 1500);
      } else {
        // Move to next trader after successful trade
        setTimeout(() => setCurrentTrader(prev => prev + 1), 1500);
      }
    } else {
      // Failed trade - record it and move to next trader
      setTradeHistory(prev => [...prev, {
        from: trader.person,
        traded: "Nothing",
        received: "Nothing",
        location: trader.location,
        failed: true,
        reason: `"I don't want potatoes, I need ${trader.want}"`
      }]);
      setFrustrationLevel(prev => prev + 1);
      
      // Always move to next trader after failed attempt
      if (currentTrader < tradeRoute.length - 1) {
        setTimeout(() => setCurrentTrader(prev => prev + 1), 1500);
      } else {
        // We've tried everyone and failed
        setTimeout(() => setGameStep(1), 1500);
      }
    }
  };

  const resetGame = () => {
    setGameStep(0);
    setCurrentTrader(0);
    setTradeAttempts(0);
    setTradeHistory([]);
    setInventory("🥔 Potatoes");
    setVisitedTraders(new Set());
    setFrustrationLevel(0);
  };

    if (gameStep === 0) {
    const currentTraderData = tradeRoute[currentTrader];
    
    // Guard against undefined trader data
    if (!currentTraderData) {
      return (
        <div className="step-content barter-world">
          <div className="module-header-box">
            <h2>Error Loading Trading Game</h2>
            <p>Please refresh the page to try again.</p>
          </div>
        </div>
      );
    }
    
    return (
      <div className="step-content barter-world">
        <div className="module-header-box">
          <h2>Your Trading Journey Through the Village</h2>
          <div className="intro-text">
            <p className="prime-text">You're a potato farmer who needs shoes for winter. You'll visit each trader in the village, offering your potatoes in exchange for what you need.</p>
            <p>Watch how each trader rejects your potatoes because they want something else entirely!</p>
          </div>
        </div>

        <div className="barter-game">
          <div className="journey-progress">
            <h3>🗺️ Your Journey Through the Village</h3>
            <div className="route-progress">
              <div className="journey-path">
                {tradeRoute.map((trader, index) => (
                  <div 
                    key={trader.id} 
                    className={`journey-stop ${index === currentTrader ? 'current' : ''} ${index < currentTrader ? 'completed' : ''} ${index > currentTrader ? 'upcoming' : ''}`}
                    onClick={() => index <= currentTrader && setCurrentTrader(index)}
                  >
                    <div className="stop-marker">
                      <span className="stop-number">{index + 1}</span>
                      {index < currentTrader && <span className="checkmark">✅</span>}
                      {index === currentTrader && <span className="current-indicator">📍</span>}
                    </div>
                    <div className="stop-info">
                      <div className="stop-location">{trader.location}</div>
                      <div className="stop-person">{trader.person}</div>
                    </div>
                    {index < tradeRoute.length - 1 && (
                      <div className="path-arrow">→</div>
                    )}
                    <button 
                      className="visit-trader-btn"
                      onClick={() => setCurrentTrader(index)}
                      disabled={index > currentTrader}
                      title={index > currentTrader ? "You haven't reached this trader yet" : `Visit ${trader.person} at ${trader.location}`}
                    >
                      {index <= currentTrader ? "Visit" : "Locked"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="your-situation">
            <h3>🎯 Your Current Situation</h3>
            <div className="situation-grid">
              <div className="situation-item">
                <span className="situation-icon">🎒</span>
                <div className="situation-content">
                  <span className="situation-label">You have:</span>
                  <span className="situation-value">{inventory}</span>
                </div>
              </div>
              <div className="situation-item">
                <span className="situation-icon">👟</span>
                <div className="situation-content">
                  <span className="situation-label">You need:</span>
                  <span className="situation-value">Shoes for winter</span>
                </div>
              </div>
              <div className="situation-item">
                <span className="situation-icon">📍</span>
                <div className="situation-content">
                  <span className="situation-label">Current location:</span>
                  <span className="situation-value">{currentTraderData.location}</span>
                </div>
              </div>
              <div className="situation-item">
                <span className="situation-icon">🔄</span>
                <div className="situation-content">
                  <span className="situation-label">Trade attempts:</span>
                  <span className="situation-value">{tradeAttempts}</span>
                </div>
              </div>
              <div className="situation-item">
                <span className="situation-icon">😤</span>
                <div className="situation-content">
                  <span className="situation-label">Frustration level:</span>
                  <span className="situation-value">{frustrationLevel}/10</span>
                </div>
              </div>
            </div>
          </div>

          <div className="current-trader">
            <h3>🤝 Meeting: {currentTraderData.person || 'Unknown'}</h3>
            <div className="trader-card current">
              <div className="trader-header">
                <div className="trader-location">
                  <span className="location-icon">📍</span>
                  <span className="location-text">{currentTraderData.location || 'Unknown'}</span>
                </div>
                <div className="trader-name">
                  <span className="name-icon">👤</span>
                  <span className="name-text">{currentTraderData.person || 'Unknown'}</span>
                </div>
              </div>
              
              <div className="trader-details">
                <div className="trade-info">
                  <div className="trade-item">
                    <span className="trade-label">Has:</span>
                    <span className="trade-value">{currentTraderData.have || 'Nothing'}</span>
                  </div>
                  <div className="trade-item">
                    <span className="trade-label">Wants:</span>
                    <span className="trade-value">{currentTraderData.want || 'Nothing'}</span>
                  </div>
                </div>
                
                <div className="trader-dialogue-box">
                  <span className="dialogue-icon">💬</span>
                  <p className="trader-dialogue">"{currentTraderData.dialogue || 'Hello there!'}"</p>
                </div>
              </div>
              
              <div className="trade-options">
                <button 
                  className="trade-button primary"
                  onClick={() => handleTradeAttempt(currentTraderData)}
                >
                  <span className="button-icon">🥔</span>
                  <span className="button-text">Offer Potatoes for {currentTraderData.have}</span>
                </button>
              </div>
            </div>
          </div>

          {tradeHistory.length > 0 && (
            <div className="trade-history">
              <h3>📜 Your Trading History</h3>
              <div className="history-list">
                {tradeHistory.map((trade, index) => (
                  <div key={index} className={`history-item ${trade.failed ? 'failed' : 'success'}`}>
                    <div className="history-header">
                      <div className="history-location">
                        <span className="location-icon">📍</span>
                        <span className="location-text">{trade.location || 'Unknown'}</span>
                      </div>
                      <div className="history-trader">
                        <span className="trader-icon">👤</span>
                        <span className="trader-text">{trade.from || 'Unknown'}</span>
                      </div>
                    </div>
                    <div className="history-result">
                      {trade.failed ? (
                        <div className="failed-trade">
                          <span className="result-icon">❌</span>
                          <span className="result-text">No deal - they don't want {inventory}</span>
                        </div>
                      ) : (
                        <div className="successful-trade">
                          <span className="result-icon">✅</span>
                          <span className="result-text">
                            Traded <strong>{trade.traded || 'Nothing'}</strong> for <strong>{trade.received || 'Nothing'}</strong>
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentTrader === tradeRoute.length - 1 && inventory === "🥔 Potatoes" && (
            <div className="success-section">
              <h3>🎉 Success! You Found the Cobbler!</h3>
              <p>After visiting {tradeAttempts} traders and trying {frustrationLevel} frustrating attempts, you finally found someone who wants potatoes and has shoes!</p>
              <p>But imagine if this was your life every single day...</p>
              <button className="continue-button" onClick={() => setGameStep(1)}>
                See Why This System Failed
              </button>
            </div>
          )}

          {frustrationLevel >= 8 && (
            <div className="failure-section">
              <h3>😤 You're Getting Frustrated!</h3>
              <p>You've tried {tradeAttempts} times and visited {visitedTraders.size} different traders. The trading chain is getting complicated!</p>
              <p>You might have to:</p>
              <ul>
                <li>Walk to the next village (2 days journey)</li>
                <li>Try a different trading route</li>
                <li>Wait until someone needs what you have</li>
                <li>Go barefoot this winter</li>
              </ul>
              <button className="continue-button" onClick={() => setGameStep(1)}>
                This System is Broken!
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="step-content barter-world">
      <div className="module-header-box">
        <h2>The Problem That Broke Humanity's Patience</h2>
        <div className="intro-text">
          <p className="prime-text">What you just experienced is called "the double coincidence of wants" - basically, the universe's worst matchmaking system.</p>
        </div>
      </div>
      
      <div className="content-text">
        <div className="problem-breakdown">
          <h3>🤔 Why Bartering Was a Nightmare</h3>
          <div className="problems-grid">
            <div className="problem-card">
              <h4>⏰ Time Problem</h4>
              <p>Finding someone who wants what you have AND has what you want could take days, weeks, or never happen.</p>
            </div>
            <div className="problem-card">
              <h4>🗳️ Value Problem</h4>
              <p>Is a cow worth 3 goats? 5 chickens? Who decides? Arguments everywhere.</p>
            </div>
            <div className="problem-card">
              <h4>🍎 Storage Problem</h4>
              <p>Can't save potatoes for next year - they rot. Can't store your wealth over time.</p>
            </div>
            <div className="problem-card">
              <h4>📍 Location Problem</h4>
              <p>Your trading partner might be in the next village, 50 miles away. Good luck with that.</p>
            </div>
          </div>
        </div>

        <div className="solution-reveal">
          <h3>💡 The Key Insight</h3>
          <p>Someone finally realized: <em>"What if we all just agree on ONE thing that everyone will accept for everything else?"</em></p>
          <p>And thus... <strong>money was born</strong>.</p>
          <p>Not by governments. Not by banks. By frustrated humans who were tired of trading goats for shoes.</p>
        </div>

        <button onClick={() => onComplete(1)} className="continue-button">
          Let's See Exactly What Money Was Supposed to Fix
        </button>
      </div>
    </div>
  );
};

// Component for Carlos's Flower Export
const CarlosFlowerExport = ({ onComplete }) => {

  return (
    <div className="step-content carlos-export-step">
      <div className="module-header-box">
        <h2>Real-World Impact</h2>
        <div className="intro-text">
          <p className="prime-text">Now let's see how these money problems play out in the real world. You've learned about the flaws in traditional money systems—here's what that actually means for people trying to do business.</p>
          <p>Meet Carlos, a flower exporter in Colombia. His story shows exactly how modern money fails at its core functions.</p>
        </div>
      </div>

      <div className="transitional-explanation">
        <h3>Carlos's Flower Export</h3>
        <p>
          Carlos exports 1,000 roses to Japan. He gets paid in USD but spends in Colombian pesos. 
          <button
            className="inline-link-button"
            onClick={() => window.open('https://layer-d.my.canva.site/inefficiencies-of-traditional-payments-by-dalia', '_blank')}
          >
            Let's walk through what actually happens when money's core functions break down.
          </button>
        </p>
      </div>

      <div className="content-text">
        <p>After exploring Carlos's story, you can see how traditional payment systems create unnecessary friction, delays, and costs that eat into people's earnings and limit economic opportunity.</p>
        <button onClick={onComplete} className="continue-button">
          Continue to the Sound Money Blueprint
        </button>
      </div>
    </div>
  );
};

// Component for the "What's Missing Here?" section
const WhatsWrong = ({ onComplete }) => {
  const [answers, setAnswers] = useState({});
  const [feedback, setFeedback] = useState({});
  const [currentScenario, setCurrentScenario] = useState(0);
  const [unlockedFunctions, setUnlockedFunctions] = useState([]);
  const [isLocked, setIsLocked] = useState(false);

  const scenarios = [
    {
      id: 'q1',
      title: "🍞 The Sandwich Stand-Off",
      description: "You're a hungry web designer. You offer the baker a free website in exchange for a sandwich. He says, 'I need a plumber, not a homepage.'",
      question: "What's stopping this trade from happening? What could solve it?",
      options: [
        { value: 'A', label: 'Money as a Medium of Exchange - Everyone accepts it, making trades smooth' },
        { value: 'B', label: 'Money as a Store of Value - Save your wealth over time' },
        { value: 'C', label: 'Money as a Unit of Account - Common way to measure value' }
      ],
      feedback: {
        A: "🎉 Correct! You need a smoother way to trade. Money lets you convert your skills into something everyone accepts.",
        B: "You're not trying to save food for later—you're just trying to make a trade now.",
        C: "You know the sandwich is valuable—you just can't exchange your skills for it."
      },
      correctAnswer: 'A',
      moneyFunction: 'Medium of Exchange',
      explanation: "Money solves the 'double coincidence of wants' by being universally accepted."
    },
    {
      id: 'q2',
      title: "🥔 The Rotten Paycheck",
      description: "You grew potatoes to pay your carpenter next month. But by then, they've all rotted or turned into weird sprouts.",
      question: "Why didn't your payment plan work? What could help preserve your effort over time?",
      options: [
        { value: 'A', label: 'Money as a Medium of Exchange - Everyone accepts it, making trades smooth' },
        { value: 'B', label: 'Money as a Store of Value - Save your wealth over time' },
        { value: 'C', label: 'Money as a Unit of Account - Common way to measure value' }
      ],
      feedback: {
        A: "You weren't trying to trade right away. The issue was storing value for later.",
        B: "🎉 Correct! Good money doesn't rot, rust, or spoil. It preserves your wealth over time.",
        C: "You knew what the potatoes were worth—they just didn't last."
      },
      correctAnswer: 'B',
      moneyFunction: 'Store of Value',
      explanation: "Money must hold its value over time, unlike perishable goods."
    },
    {
      id: 'q3',
      title: "🎩 The Bread-for-Hat Deal",
      description: "Someone offers five loaves of bread for your hat. Is that a fair deal? Too much? Not enough? Nobody knows.",
      question: "What's missing to help you both agree on whether this is a fair exchange?",
      options: [
        { value: 'A', label: 'Money as a Medium of Exchange - Everyone accepts it, making trades smooth' },
        { value: 'B', label: 'Money as a Store of Value - Save your wealth over time' },
        { value: 'C', label: 'Money as a Unit of Account - Common way to measure value' }
      ],
      feedback: {
        A: "You *can* trade—the issue is figuring out if it's a good trade.",
        B: "You're not trying to store anything—you just want to know what it's worth.",
        C: "🎉 Correct! Money gives us a standard ruler for measuring value, like inches for distance."
      },
      correctAnswer: 'C',
      moneyFunction: 'Unit of Account',
      explanation: "Money provides a common measuring stick for comparing the value of different things."
    }
  ];

  const handleAnswer = (questionId, value) => {
    if (isLocked) return;
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));

    const scenario = scenarios.find(s => s.id === questionId);
    setFeedback(prev => ({
      ...prev,
      [questionId]: scenario.feedback[value]
    }));

    if (value === scenario.correctAnswer) {
      setUnlockedFunctions(prev => [...prev, scenario.moneyFunction]);
      setIsLocked(true);
      setTimeout(() => {
        setIsLocked(false);
        if (currentScenario < scenarios.length - 1) {
          setCurrentScenario(currentScenario + 1);
        } else {
          setTimeout(() => onComplete(2), 1500);
        }
      }, 2000);
    } else {
      setIsLocked(false);
    }
  };

  return (
    <div className="step-content whats-wrong-step">
      <div className="module-header-box">
        <h2>The Job of Money</h2>
        <div className="intro-text">
          <p className="prime-text">These scenarios reveal why money had to be invented. Each one shows a reason we bother with money... when it works.</p>
          <p>What problem is money solving in each case?</p>
        </div>
      </div>

      <div className="functions-tracker">
        <h3>Money Functions Unlocked:</h3>
        <div className="functions-grid">
          {['Medium of Exchange', 'Store of Value', 'Unit of Account'].map(func => (
            <div key={func} className={`function-badge ${unlockedFunctions.includes(func) ? 'unlocked' : 'locked'}`}>
              {unlockedFunctions.includes(func) ? '✅' : '🔒'} {func}
            </div>
          ))}
        </div>
      </div>

      <div className="scenario-container">
        {scenarios.map((scenario, index) => (
          <div 
            key={scenario.id} 
            className={`scenario-item ${index === currentScenario ? 'active' : ''} ${index < currentScenario ? 'completed' : ''} ${index > currentScenario ? 'locked' : ''}`}
          >
            <div className="scenario-header">
              <h3>{scenario.title}</h3>
              <p className="scenario-description">{scenario.description}</p>
              <p className="scenario-question"><strong>{scenario.question}</strong></p>
            </div>
            
            {index === currentScenario && (
              <div className="options-grid">
                {scenario.options.map(option => (
                  <button
                    key={option.value}
                    className={`option-button ${answers[scenario.id] === option.value ? 'selected' : ''}`}
                    onClick={() => handleAnswer(scenario.id, option.value)}
                    disabled={isLocked}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
            
            {feedback[scenario.id] && (
              <div className={`feedback ${feedback[scenario.id].includes('🎉') ? 'correct' : 'incorrect'}`}>
                <p>{feedback[scenario.id]}</p>
                {feedback[scenario.id].includes('🎉') && (
                  <div className="function-explanation">
                    <h4>💡 Function Unlocked: {scenario.moneyFunction}</h4>
                    <p>{scenario.explanation}</p>
                  </div>
                )}
              </div>
            )}

            {index < currentScenario && (
              <div className="completed-indicator">
                <p>✅ Completed: {scenario.moneyFunction}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {unlockedFunctions.length === 3 && (
        <div className="completion-section">
          <h3>🎉 You've Discovered Money's Three Core Functions!</h3>
          <p>Now you understand why money was such a transformative invention. But wait until you see what happened next...</p>
        </div>
      )}
    </div>
  );
};

// Component for the Money Quiz
const MoneyQuiz = ({ onComplete, onUnlockTrait }) => {
  const [showIntro, setShowIntro] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);

  // Helper function to explain why an incorrect answer is wrong
  const getIncorrectExplanation = (question, answerIndex) => {
    const explanations = {
      1: [
        "Being cautious doesn't explain why people can't access their own deposits.",
        "This is the key insight - when banks control access, do you really own your money?",
        "The problem isn't demand, it's the banking system's structure."
      ],
      2: [
        "If it were just cycles, we'd see currencies recover their value - but they don't.",
        "Necessity doesn't explain why ALL government currencies eventually fail.",
        "Exactly! History shows power over money always gets abused."
      ],
      3: [
        "Beauty isn't a practical concern for money.",
        "Correct! Physical limitations made gold impractical for everyday use.",
        "Scarcity was actually gold's strength, not its weakness."
      ],
      4: [
        "Fast spending shows the money was failing, not succeeding.",
        "Exactly! Money must preserve value or people lose trust.",
        "Flexible prices are good, but hyperinflation destroys the economy."
      ],
      5: [
        "Trust is essential for money to function.",
        "Exactly! When money units aren't equal, the system breaks down.",
        "Making more debased coins would make the problem worse."
      ],
      6: [
        "The stones never moved, showing money doesn't need to be physical.",
        "Exactly! Shared agreement about ownership is what makes money work.",
        "Even lost stones retained value if the community remembered ownership."
      ],
      7: [
        "Bitcoin's design specifically prevents this kind of control.",
        "Exactly! Decentralized money can't be frozen by authorities.",
        "Bitcoin doesn't change political situations, but it protects financial freedom."
      ],
      8: [
        "Bitcoin was specifically designed to move freely across borders.",
        "Bitcoin operates beyond traditional financial controls.",
        "Exactly! Bitcoin enables borderless movement of value."
      ],
      9: [
        "The smell isn't the fundamental problem with cattle as money.",
        "Exactly! Money needs to be divisible for different transaction sizes.",
        "People needed money for trade, not food."
      ],
      10: [
        "Bitcoin is much more than just another digital payment app.",
        "Exactly! Bitcoin combines the best properties of gold with digital advantages.",
        "Bitcoin handles both small and large payments effectively."
      ],
      11: [
        "Bitcoin's digital nature fundamentally changes the game.",
        "Governments can try to regulate Bitcoin, but can't easily seize it like physical assets.",
        "Exactly! Information and cryptography are much harder to confiscate."
      ],
      12: [
        "No currency can guarantee stability, but choice provides protection.",
        "Exactly! The right to choose your money is fundamental to economic freedom.",
        "Government support often comes with strings attached to control."
      ]
    };
    return explanations[question.id]?.[answerIndex] || "This doesn't address the core issue.";
  };

  // Helper function to explain why the correct answer is right
  const getCorrectExplanation = (question) => {
    const explanations = {
      1: "When institutions can freeze your access to money, you're dependent on their permission. True ownership means complete control.",
      2: "Throughout history, those with the power to create money have always eventually abused it for short-term gain, devaluing everyone else's savings.",
      3: "Money must be easy to transport and transfer, or it becomes impractical for daily commerce and trade.",
      4: "The primary function of money is to store value over time. If it fails at this, people lose trust and the economy breaks down.",
      5: "Every unit of money must be identical and interchangeable. When they're not, people lose trust and start rejecting certain units.",
      6: "Money is ultimately about shared agreement on ownership. Physical possession is less important than community consensus.",
      7: "Decentralized systems have no central authority that can freeze or block transactions, providing true financial sovereignty.",
      8: "Bitcoin operates on a global network that doesn't recognize political borders, enabling true financial freedom.",
      9: "Divisibility allows money to handle transactions of any size, from buying a coffee to purchasing a house.",
      10: "Bitcoin uniquely combines all the properties of sound money with digital efficiency and global accessibility.",
      11: "Bitcoin exists as cryptographic information that can be memorized or hidden, making it much harder to confiscate than physical assets.",
      12: "Freedom includes the right to opt out of failing systems and choose better alternatives for storing and transferring value."
    };
    return explanations[question.id] || "This addresses the fundamental issue correctly.";
  };

  const questions = [
    {
      id: 1,
      text: "In 2008, banks froze withdrawals during the financial crisis. People couldn't access their own money.",
      question: "What fundamental problem does this reveal about the banking system?",
      options: [
        "Banks were just being cautious",
        "Your money isn't really yours",
        "People wanted too much money"
      ],
      answer: 1,
      takeaway: "When you can't access your money, do you really own it? Bitcoin gives you true ownership.",
      trait: "Self Custody"
    },
    {
      id: 2,
      text: "Throughout history, every government-issued currency has eventually lost most or all of its value through inflation.",
      question: "What does this pattern suggest about money controlled by authorities?",
      options: [
        "It's just economic cycles",
        "Printing money is necessary",
        "Power to create money will always be abused"
      ],
      answer: 2,
      takeaway: "Bitcoin's fixed supply prevents anyone from devaluing your savings through inflation.",
      trait: "Fixed Supply"
    },
    {
      id: 3,
      text: "Gold was used for centuries but was heavy and risky to transport.",
      question: "What was its biggest weakness?",
      options: [
        "Too beautiful",
        "Hard to carry",
        "Too scarce"
      ],
      answer: 1,
      takeaway: "Money must be easy to move—portability matters.",
      trait: "Portability"
    },
    {
      id: 4,
      text: "Germany in 1923 saw prices doubling every few days. People rushed to spend their money before it lost value.",
      question: "What's the lesson?",
      options: [
        "Spending fast is good",
        "Money must store value",
        "Prices should be flexible"
      ],
      answer: 1,
      takeaway: "Money must hold value over time, or it fails.",
      trait: "Store of Value"
    },
    {
      id: 5,
      text: "In ancient Rome, coins were secretly mixed with cheaper metals or clipped around the edges, making them unequal in value.",
      question: "What happened to trust in money?",
      options: [
        "Nothing changed",
        "People stopped trusting coins",
        "They made more coins"
      ],
      answer: 1,
      takeaway: "When money isn't uniform, people lose trust. Fungibility is essential.",
      trait: "Fungibility"
    },
    {
      id: 6,
      text: "The Yap Islands used massive stone money that never moved. Ownership was remembered by the community.",
      question: "What does this reveal about money?",
      options: [
        "Must be physical",
        "Community agreement matters",
        "Lost money still counts"
      ],
      answer: 1,
      takeaway: "Money relies on shared knowledge of ownership—not physical form. Ledger consensus is what really matters.",
      trait: "Ledger Consensus"
    },
    {
      id: 7,
      text: "In 2020, protesting Canadian truckers had their bank accounts frozen.",
      question: "What would change with Bitcoin?",
      options: [
        "Nothing",
        "Funds stay accessible",
        "Authorities would allow the protest"
      ],
      answer: 1,
      takeaway: "Decentralized money can't be frozen—censorship resistance matters.",
      trait: "Censorship Resistance"
    },
    {
      id: 8,
      text: "In Greece, Russia, Argentina, and China, to name a few, governments have placed strict controls on how much money citizens can withdraw or move abroad. Some families trying to leave must carry gold, hide cash, or pay black market rates.",
      question: "How does Bitcoin challenge that system?",
      options: [
        "It doesn't",
        "It respects capital controls",
        "It allows borderless movement of value"
      ],
      answer: 2,
      takeaway: "Bitcoin moves freely across borders, helping people escape restrictions and protect savings.",
      trait: "Borderless"
    },
    {
      id: 9,
      text: "When cattle was used as money, it worked for big trades—but you couldn't pay someone with half a cow.",
      question: "What did this reveal about money?",
      options: [
        "Cows were too smelly",
        "Money must be divisible",
        "People wanted beef"
      ],
      answer: 1,
      takeaway: "Money must be divisible to handle both big and small transactions.",
      trait: "Divisibility"
    },
    {
      id: 10,
      text: "Bitcoin is the first money that is digital, scarce, portable, divisible, and cannot be confiscated or counterfeited.",
      question: "What makes Bitcoin different?",
      options: [
        "Just another app",
        "Digital gold with new powers",
        "Only for small payments"
      ],
      answer: 1,
      takeaway: "Bitcoin combines all traits of sound money with global digital reach—plus neutrality and decentralization.",
      trait: "All traits"
    },
    {
      id: 11,
      text: "When governments banned gold ownership in the past, they could physically seize it from citizens. But Bitcoin exists as information.",
      question: "How does this change the relationship between money and authority?",
      options: [
        "It doesn't change anything",
        "Authorities can still control it",
        "Information is harder to seize than physical assets"
      ],
      answer: 2,
      takeaway: "Bitcoin's digital nature and cryptography make it resistant to physical confiscation.",
      trait: "Digital Sovereignty"
    },
    {
      id: 12,
      text: "In Venezuela, as inflation destroyed the currency's value, the government restricted access to foreign currencies, trapping savings in a dying system.",
      question: "What fundamental right does this violate?",
      options: [
        "The right to stable currency",
        "The right to choose your money",
        "The right to government support"
      ],
      answer: 1,
      takeaway: "Bitcoin gives you the freedom to opt out of failing monetary systems.",
      trait: "Freedom of Choice"
    }
  ];

  const handleAnswer = (answerIndex) => {
    setSelectedAnswer(answerIndex);
    setShowFeedback(true);
    if (answerIndex === questions[currentQuestion].answer) {
      onUnlockTrait(questions[currentQuestion].trait);
      setScore(score + 1);
    }
  };

  const handleTryAgain = () => {
    setSelectedAnswer(null);
    setShowFeedback(false);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      onComplete(3);
    }
  };

  const currentQ = questions[currentQuestion];

  if (showIntro) {
    return (
      <div className="step-content quiz-step">
        <div className="module-header-box">
          <h2>When Good Money Goes Bad</h2>
          <div className="intro-text">
            <p className="prime-text">You now understand money's three core functions. Modern money has lost most of these capabilities.</p>
            <p>Let's examine the evidence through history's greatest money failures.</p>
            <div className="quiz-preview">
              <h3>🔍 What You'll Discover:</h3>
              <ul>
                <li>Why every government currency eventually fails</li>
                <li>How inflation silently steals your savings</li>
                <li>Why banks can freeze "your" money</li>
                <li>What traits make money truly sound</li>
              </ul>
            </div>
            <p><strong>Ready to analyze money systems?</strong></p>
          </div>
        </div>
        <div className="quiz-content">
          <button onClick={() => setShowIntro(false)} className="continue-button">
            Start Investigation ({questions.length} cases)
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="step-content quiz-step">
      <div className="module-header-box">
        <h2>🔍 Case {currentQuestion + 1} of {questions.length}</h2>
        <div className="quiz-score">
          Score: {score}/{currentQuestion + (showFeedback ? 1 : 0)} • {Math.round((score / questions.length) * 100)}% Sound Money Analyst
        </div>
      </div>
      
      <div className="quiz-content">
        <div className="history-snapshot">
          <h3>💰 Historical Evidence:</h3>
          <p>{currentQ.text}</p>
        </div>

        <div className="question-section">
          <h3>🤔 Your Analysis:</h3>
          <p className="question-text">{currentQ.question}</p>
          <div className="options">
            {currentQ.options.map((option, index) => (
            <button 
                key={index}
                className={`option-button ${selectedAnswer === index ? 'selected' : ''}`}
                onClick={() => handleAnswer(index)}
                disabled={showFeedback}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {showFeedback && (
          <div className={`feedback-section ${selectedAnswer === currentQ.answer ? 'correct' : 'incorrect'}`}>
            <p className="feedback-result">
              {selectedAnswer === currentQ.answer ? '🎯 Excellent Analysis!' : '🔍 Not quite right, but keep examining!'}
            </p>
            
            {selectedAnswer !== currentQ.answer && (
              <div className="incorrect-feedback">
                <div className="explanation-box">
                  <h4>🤔 Why this answer isn't quite right:</h4>
                  <p>"{currentQ.options[selectedAnswer]}" - {getIncorrectExplanation(currentQ, selectedAnswer)}</p>
                </div>
                <div className="correct-answer-box">
                  <h4>✅ The Better Answer:</h4>
                  <p><strong>"{currentQ.options[currentQ.answer]}"</strong></p>
                  <p className="explanation">{getCorrectExplanation(currentQ)}</p>
                </div>
                <div className="action-buttons">
                  <button onClick={handleTryAgain} className="try-again-button">
                    🔄 Try Again
                  </button>
                  <button onClick={handleNext} className="continue-anyway-button">
                    Continue Anyway →
                  </button>
                </div>
              </div>
            )}

            {selectedAnswer === currentQ.answer && (
              <>
                <div className="takeaway-box">
                  <h4>💡 Key Insight:</h4>
                  <p>{currentQ.takeaway}</p>
                </div>
                <div className="trait-unlock-box">
                  <h4>🏆 Sound Money Trait Discovered:</h4>
                  <p><strong>{currentQ.trait}</strong></p>
                </div>
                <button onClick={handleNext} className="next-button">
                  {currentQuestion < questions.length - 1 ? 'Next Case →' : 'Complete Investigation'}
                </button>
              </>
            )}
          </div>
        )}

        <div className="progress-indicator">
          <div className="progress-dots">
            {questions.map((_, index) => (
              <span
                key={index}
                className={`dot ${index === currentQuestion ? 'active' : ''} ${index < currentQuestion ? 'completed' : ''}`}
              />
            ))}
          </div>
          <p className="progress-text">Case {currentQuestion + 1} of {questions.length}</p>
        </div>
      </div>
    </div>
  );
};

// Component for the Traits Scorecard
const TraitsScorecard = ({ unlockedTraits, onComplete }) => {
  const [showComparison, setShowComparison] = useState(false);
  
  const allTraits = [
    { name: "Scarcity", icon: "scarcity", description: "Hard to reproduce", modernFail: "Central banks print unlimited money" },
    { name: "Durability", icon: "durability", description: "Doesn't rot or degrade", modernFail: "Digital records can be deleted or hacked" },
    { name: "Portability", icon: "portability", description: "Easy to move and transfer", modernFail: "International transfers take days and cost fees" },
    { name: "Store of Value", icon: "storeOfValue", description: "Holds value over time", modernFail: "Inflation erodes purchasing power" },
    { name: "Fungibility", icon: "fungibility", description: "Each unit is equal and interchangeable", modernFail: "Bills can be tracked, marked, or blacklisted" },
    { name: "Ledger Consensus", icon: "consensus", description: "Shared agreement on ownership", modernFail: "Banks control the ledger unilaterally" },
    { name: "Censorship Resistance", icon: "censorshipResistance", description: "Can't be frozen or blocked", modernFail: "Accounts can be frozen by authorities" },
    { name: "Borderless", icon: "borderless", description: "Moves freely across borders", modernFail: "Capital controls restrict movement" },
    { name: "Divisibility", icon: "divisibility", description: "Can be split into smaller units", modernFail: "Limited by smallest denomination" }
  ];

  const unlockedCount = unlockedTraits.filter(trait => allTraits.some(t => t.name === trait)).length;
  const completionPercentage = Math.round((unlockedCount / allTraits.length) * 100);

  return (
    <div className="step-content scorecard-step">
              <div className="module-header-box">
          <h2>The Sound Money Blueprint</h2>
          <div className="intro-text">
            <p className="prime-text">Through your investigation, you've discovered the traits that make money truly sound. Modern money fails at most of these.</p>
          </div>
        </div>
      
      <div className="traits-comparison">
        <div className="comparison-header">
          <div className="header-left">
            <button 
              className={`view-toggle ${!showComparison ? 'active' : ''}`}
              onClick={() => setShowComparison(false)}
            >
              Sound Money Traits
            </button>
            <button 
              className={`view-toggle ${showComparison ? 'active' : ''}`}
              onClick={() => setShowComparison(true)}
            >
              How Modern Money Fails
            </button>
          </div>
          <div className="progress-indicator">
            <span className="progress-text">{unlockedCount}/{allTraits.length} discovered</span>
          </div>
        </div>

        <div className="traits-list">
          {allTraits.map(trait => (
            <div key={trait.name} className={`trait-item ${unlockedTraits.includes(trait.name) ? 'unlocked' : 'locked'}`}>
              <span className="check-icon">{unlockedTraits.includes(trait.name) ? '✅' : '🔒'}</span>
              <div className="trait-content">
                <div className="trait-header">
                  <span className="trait-name"><strong>{trait.name}</strong></span>
                  {unlockedTraits.includes(trait.name) && <span className="discovered-badge">Discovered!</span>}
                </div>
                <div className="trait-details">
                  {!showComparison ? (
                    <span className="trait-description">{trait.description}</span>
                  ) : (
                    <span className="trait-failure">❌ {trait.modernFail}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bitcoin-teaser">
          <h3>🔮 Coming Next...</h3>
          <p>Now that you understand what makes money truly sound, you're ready to learn about the first technology that combines ALL these traits in one global system.</p>
          <p><strong>Spoiler alert:</strong> It's called Bitcoin, and it's going to challenge everything you thought you knew about money.</p>
        </div>

        <button 
          className="continue-button"
          onClick={() => onComplete(5)}
        >
          Ready for the Solution
        </button>
      </div>
    </div>
  );
};

// Component for External Resource Link
const ExternalResource = ({ onComplete }) => {
  return (
    <div className="step-content external-resource-step">
      <div className="module-header-box">
        <h2>Explore the History of Money <AnimatedIcon type="history" /></h2>
      </div>
      <p className="external-resource-description">
        Dive deeper into the fascinating evolution of money through the ages. 
      </p>
      <div className="external-links">
        <a
          href="https://www.investopedia.com/articles/07/currency_history.asp"
          target="_blank"
          rel="noopener noreferrer"
          className="external-resource-link"
        >
          History of Money and Currency
        </a>
        <a
          href="https://www.federalreserve.gov/faqs/currency_12771.htm"
          target="_blank"
          rel="noopener noreferrer"
          className="external-resource-link timeline-link"
        >
          Evolution of Money: From Barter to Digital
        </a>
      </div>
      <div className="button-group">
        <button onClick={() => onComplete(6)} className="continue-button">
          Complete Module
        </button>
      </div>
    </div>
  );
};

// Badge Modal Component
const BadgeModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>🎉 Congratulations!</h2>
        <p>You've earned the Sound Money Explorer badge!</p>
        <button onClick={onClose}>Close</button>
      </div>
          </div>
        );
};

// Main Module Component
const MoneyModule = () => {
  const { completeModule, isModuleCompleted } = useProgress();
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(() => {
    const saved = localStorage.getItem('moneyModuleCompletedSteps');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });
  const [unlockedTraits, setUnlockedTraits] = useState([]);
  const [showBadgeModal, setShowBadgeModal] = useState(false);
  const [error, setError] = useState(null);

  // Error boundary for the component
  if (error) {
    return (
      <div className="module-container">
        <div className="error-boundary">
          <h2>Something went wrong</h2>
          <p>Please refresh the page to try again.</p>
          <button onClick={() => window.location.reload()}>Refresh Page</button>
        </div>
      </div>
    );
  }

  const handleStepComplete = (stepIndex) => {
    const newCompletedSteps = new Set(completedSteps).add(stepIndex);
    setCompletedSteps(newCompletedSteps);
    
    // Save to localStorage - convert Set to array to avoid circular reference
    try {
      localStorage.setItem('moneyModuleCompletedSteps', JSON.stringify(Array.from(newCompletedSteps)));
    } catch (error) {
      console.warn('Failed to save progress to localStorage:', error);
    }
    
    // Show achievement for key milestones
    if (stepIndex === 1) {
      showAchievement("Trade Explorer", "You understand why humans needed to invent money!");
    } else if (stepIndex === 3) {
      showAchievement("Money Analyst", "You've uncovered the flaws in traditional money systems!");
    } else if (stepIndex === 5) {
      showAchievement("Sound Money Scholar", "You know what makes money truly sound!");
    }
    
    if (stepIndex === 6) {  // Final step
      completeModule('money');
      setShowBadgeModal(true);
      showAchievement("Money Master", "You've mastered the fundamentals of sound money!");
    } else {
      setCurrentStep(stepIndex + 1);
    }
  };

  const showAchievement = (title, description) => {
    // Achievement notification system
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
      setTimeout(() => {
        document.body.removeChild(achievement);
      }, 300);
    }, 3000);
  };

  const handleTabClick = (stepIndex) => {
    setCurrentStep(stepIndex);
  };

  const handleUnlockTrait = (trait) => {
    if (!unlockedTraits.includes(trait)) {
      setUnlockedTraits([...unlockedTraits, trait]);
    }
  };

  return (
    <div className="module-container">
      {/* Override the default layout title for this module only */}
      <style>{`
        .module-layout .module-header .logo-text {
          display: none;
        }
        .module-layout .module-header .logo-container::after {
          content: "Money, Straight Up";
          font-size: 1.5rem;
          line-height: 1.2;
        }
        .error-boundary {
          text-align: center;
          padding: 2rem;
          background: #fff5f5;
          border: 1px solid #fed7d7;
          border-radius: 8px;
          margin: 2rem;
        }
        .error-boundary button {
          background: #e53e3e;
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 4px;
          cursor: pointer;
        }
      `}</style>
      
      <div className="module-header">
        <h1 className="module-title">
          <Coins className="module-icon" />
          If You Don't Define It, It Will Define You
        </h1>
      </div>

      <div className="module-progress">
        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ width: `${(completedSteps.size / 7) * 100}%` }}
          />
        </div>
        <span className="progress-text">
          {completedSteps.size} / 7 steps completed
        </span>
      </div>

      {/* Horizontal Tab Navigation */}
      <div className="top-navigation">
        {['The Money Mystery', 'The Stone Age Economy', 'Money\'s Core Functions', 'When Money Goes Wrong', 'Real-World Impact', 'The Sound Money Blueprint', 'Your Next Steps'].map((step, index) => (
          <button
            key={index}
            className={`top-nav-button ${
              index === currentStep ? 'active' : ''
            } ${completedSteps.has(index) ? 'completed' : ''}`}
            onClick={() => handleTabClick(index)}
          >
            <span className="nav-text">
              {index + 1}. {step.length > 20 ? `${step.substring(0, 17)}...` : step}
            </span>
          </button>
        ))}
      </div>

      <div className="module-content">
        {currentStep === 0 && <Introduction onComplete={handleStepComplete} />}
        {currentStep === 1 && <BarterWorld onComplete={handleStepComplete} />}
        {currentStep === 2 && <WhatsWrong onComplete={handleStepComplete} />}
        {currentStep === 3 && <MoneyQuiz onComplete={handleStepComplete} onUnlockTrait={handleUnlockTrait} />}
        {currentStep === 4 && <CarlosFlowerExport onComplete={handleStepComplete} />}
        {currentStep === 5 && <TraitsScorecard unlockedTraits={unlockedTraits} onComplete={handleStepComplete} />}
        {currentStep === 6 && <ExternalResource onComplete={handleStepComplete} />}
      </div>

      <BadgeModal isOpen={showBadgeModal} onClose={() => setShowBadgeModal(false)} />
    </div>
  );
};

export default MoneyModule;