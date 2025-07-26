import React, { useState } from 'react';
import { ActionButton } from '../components/EnhancedButtons';
import '../components/ModuleCommon.css';

const MoneyFunctions = ({ onComplete }) => {
  const [currentScenario, setCurrentScenario] = useState(0);
  const [answers, setAnswers] = useState({});
  const [feedback, setFeedback] = useState({});
  const [unlockedFunctions, setUnlockedFunctions] = useState([]);

  const scenarios = [
    {
      id: 1,
      title: "🛒 Shopping at the Market",
      description: "You want to buy apples. The seller wants $3 per pound.",
      question: "What job is money doing here?",
      options: [
        { value: 1, label: 'Helping you trade - making the exchange possible' },
        { value: 2, label: 'Storing your wealth for later' },
        { value: 3, label: 'Measuring value - telling you how much things cost' }
      ],
      feedback: {
        1: "✓ Right! Money makes trades easy because everyone accepts it.",
        2: "Not quite - you're using it now, not storing it.",
        3: "Close, but the main job here is making the exchange work."
      },
      correctAnswer: 1,
      moneyFunction: 'Medium of Exchange',
      explanation: "Money's first job is making trades possible. Everyone accepts it, so you don't need to find someone who wants exactly what you have."
    },
    {
      id: 2,
      title: "💰 Saving for a Vacation",
      description: "You put $200 in your savings account each month for a vacation next year.",
      question: "What job is money doing here?",
      options: [
        { value: 1, label: 'Helping you make trades right now' },
        { value: 2, label: 'Keeping your wealth safe until you need it' },
        { value: 3, label: 'Measuring how much things cost' }
      ],
      feedback: {
        1: "Not quite - you're not trading right now, you're saving.",
        2: "✓ Exactly! Money lets you save up value for later.",
        3: "That's another job of money, but not what's happening here."
      },
      correctAnswer: 2,
      moneyFunction: 'Store of Value',
      explanation: "Money's second job is holding onto value over time. You can save it today and spend it later."
    },
    {
      id: 3,
      title: "🏠 Comparing House Prices",
      description: "You're looking at houses. One costs $300,000, another costs $450,000.",
      question: "What job is money doing here?",
      options: [
        { value: 1, label: 'Making the trade possible' },
        { value: 2, label: 'Storing value for you' },
        { value: 3, label: 'Giving you a way to compare prices' }
      ],
      feedback: {
        1: "You're not trading yet - just comparing.",
        2: "You're not storing value - you're comparing prices.",
        3: "✓ Perfect! Money gives you a standard way to measure and compare value."
      },
      correctAnswer: 3,
      moneyFunction: 'Unit of Account',
      explanation: "Money's third job is measuring value. It gives everyone the same ruler to compare prices."
    }
  ];

  const handleAnswer = (questionId, value) => {
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
    }

    // Always progress after showing feedback, regardless of correctness
    setTimeout(() => {
      if (currentScenario < scenarios.length - 1) {
        setCurrentScenario(currentScenario + 1);
      }
    }, 2000);
  };

  const currentScenarioData = scenarios[currentScenario];
  
  return (
    <div className="module-container">
      <div className="section-card">
        <h1 className="heading-critical">Money Functions</h1>
        <p>Money has three main jobs. Let's look at some everyday examples to understand each one.</p>
      </div>
        
        <div className="scenario-progress">
          <div className="progress-indicators">
            {scenarios.map((_, index) => (
              <div 
                key={index} 
                className={`indicator ${index === currentScenario ? 'current' : ''} ${index < currentScenario ? 'completed' : ''}`}
              >
                {index < currentScenario ? '✅' : index + 1}
              </div>
            ))}
          </div>
        </div>

        <div className="current-scenario">
          <h3>{currentScenarioData.title}</h3>
          <p className="scenario-description">{currentScenarioData.description}</p>
          <p className="scenario-question"><strong>{currentScenarioData.question}</strong></p>
          
          {!feedback[currentScenarioData.id] && (
            <div className="quiz-options">
              {currentScenarioData.options.map(option => (
                <ActionButton
                  key={option.value}
                  onClick={() => handleAnswer(currentScenarioData.id, option.value)}
                  variant="outline"
                >
                  <span className="option-text">{option.label}</span>
                </ActionButton>
              ))}
            </div>
          )}
          
          {feedback[currentScenarioData.id] && (
            <div className={`quiz-feedback ${feedback[currentScenarioData.id].includes('✓') ? 'correct' : 'incorrect'}`}>
              {feedback[currentScenarioData.id].includes('✓') ? (
                <div className="feedback-text">
                  <p>✅ <strong>Excellent!</strong> You identified the correct function.</p>
                  <div className="correct-answer">
                    <strong>Money's Job:</strong> {currentScenarioData.moneyFunction}
                  </div>
                  <div className="trait-unlocked">
                    <p><strong>💡 Key Learning:</strong> {currentScenarioData.explanation}</p>
                  </div>
                </div>
              ) : (
                <div className="feedback-text">
                  <p>❌ <strong>Not quite.</strong></p>
                  <div className="incorrect-answer">
                    <strong>The correct function is:</strong> {currentScenarioData.moneyFunction}
                  </div>
                  <div className="correct-answer">
                    <strong>💡 Key Learning:</strong> {currentScenarioData.explanation}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {(unlockedFunctions.length === 3 || (currentScenario === scenarios.length - 1 && feedback[currentScenarioData.id])) && (
          <div className="analysis-complete">
            <h3>✅ All Three Jobs Found!</h3>
            <p>Great! Now you understand what money needs to do. Let's see how well current money does these jobs.</p>
            <ActionButton onClick={() => onComplete(1)} variant="primary">
              Next: Payment Infrastructure
            </ActionButton>
          </div>
        )}
    </div>
  );
};

export default MoneyFunctions; 