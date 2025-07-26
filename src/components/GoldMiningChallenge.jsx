import React, { useState } from 'react';
import { ActionButton } from '../components/EnhancedButtons';
import './GoldMiningChallenge.css';

const GoldMiningChallenge = ({ onDone }) => {
  const [grams, setGrams] = useState(0);
  const [stage, setStage] = useState('intro'); // intro, mining, reflection, questions, complete
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);

  const questions = [
    {
      question: "What makes gold valuable throughout history?",
      options: [
        "It's shiny and pretty",
        "It's scarce and requires real energy/work to extract",
        "Governments decided it should be valuable"
      ],
      correct: 1,
      explanation: "Exactly! Gold's scarcity and the energy cost to mine it gives it intrinsic value. No one can easily create more gold."
    },
    {
      question: "What would happen to gold's value if we discovered a way to create unlimited gold instantly?",
      options: [
        "Gold would become even more valuable",
        "Gold's value would collapse to near zero",
        "Nothing would change"
      ],
      correct: 1,
      explanation: "Correct! If anyone could create gold for free, it would lose its scarcity and become worthless - just like printing money."
    },
    {
      question: "The key difference between gold and fiat money is:",
      options: [
        "Gold is digital, fiat is physical",
        "Gold requires energy to create, fiat can be printed at will",
        "Gold is controlled by governments"
      ],
      correct: 1,
      explanation: "Yes! This energy requirement is what creates REAL scarcity. But can we achieve this digitally?"
    }
  ];

  const dig = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setGrams(prev => {
        const newGrams = prev + 0.1;
        if (newGrams >= 1.0 && stage === 'intro') {
          setTimeout(() => setStage('mining'), 500);
        }
        if (newGrams >= 2.0 && stage === 'mining') {
          setTimeout(() => setStage('reflection'), 1000);
        }
        return newGrams;
      });
      setIsAnimating(false);
    }, 800);
  };

  const handleAnswer = (selectedIndex) => {
    const newAnswers = [...answers, selectedIndex];
    setAnswers(newAnswers);
    
    if (currentQuestion < questions.length - 1) {
      setTimeout(() => setCurrentQuestion(currentQuestion + 1), 2000);
    } else {
      setTimeout(() => setStage('complete'), 2000);
    }
  };

  const startQuestions = () => {
    setStage('questions');
    setCurrentQuestion(0);
    setAnswers([]);
  };

  return (
    <div className="card gm-container">
      <h2>⛏️ The Gold Standard: Energy = Scarcity</h2>
      
      {stage === 'intro' && (
        <>
          <p className="gm-intro">
            Gold has been valuable for thousands of years. Let's discover why by actually mining some...
          </p>
          <div className="gm-stats">
            <p>Gold mined: <strong>{grams.toFixed(1)} grams</strong></p>
            <p>Energy spent: <strong>{Math.round(grams * 10)} kWh</strong></p>
          </div>
          <p className="gm-instruction">Each swing of your pickaxe costs energy and time:</p>
          <ActionButton 
            onClick={dig} 
            disabled={isAnimating}
            className={isAnimating ? 'mining-animation' : ''}
          >
            {isAnimating ? '⚡ Mining...' : '⛏️ Swing Pickaxe (costs energy)'}
          </ActionButton>
        </>
      )}

      {stage === 'mining' && (
        <>
          <div className="gm-stats">
            <p>Gold mined: <strong>{grams.toFixed(1)} grams</strong></p>
            <p>Energy spent: <strong>{Math.round(grams * 10)} kWh</strong></p>
          </div>
          <p className="gm-observation">
            💪 Notice: Each gram requires genuine work. No shortcuts exist.
            Keep mining to reach 2 grams:
          </p>
          <ActionButton 
            onClick={dig} 
            disabled={isAnimating}
            className={isAnimating ? 'mining-animation' : ''}
          >
            {isAnimating ? '⚡ Mining...' : '⛏️ Swing Pickaxe (costs energy)'}
          </ActionButton>
        </>
      )}

      {stage === 'reflection' && (
        <>
          <div className="gm-stats">
            <p>Gold mined: <strong>{grams.toFixed(1)} grams</strong></p>
            <p>Energy spent: <strong>{Math.round(grams * 10)} kWh</strong></p>
          </div>
          <div className="gm-insight">
            <p>🔍 <strong>Key Observation:</strong></p>
            <p>You spent {Math.round(grams * 10)} kWh of energy to mine {grams.toFixed(1)} grams of gold.</p>
            <p>This energy cost is what makes gold genuinely scarce - nobody can create it for free!</p>
            <p className="gm-thought">
              <em>"Real scarcity requires real energy expenditure."</em>
            </p>
          </div>
          <ActionButton onClick={startQuestions}>But what if we found infinite gold? 🤔</ActionButton>
        </>
      )}

      {stage === 'questions' && (
        <>
          <div className="gm-question-container">
            <h3>Question {currentQuestion + 1} of {questions.length}</h3>
            <p className="gm-question">{questions[currentQuestion].question}</p>
            
            {answers.length === currentQuestion ? (
              <div className="gm-options">
                {questions[currentQuestion].options.map((option, index) => (
                  <ActionButton 
                    key={index} 
                    onClick={() => handleAnswer(index)}
                    variant={index === questions[currentQuestion].correct ? 'primary' : 'secondary'}
                  >
                    {option}
                  </ActionButton>
                ))}
              </div>
            ) : (
              <div className="gm-answer-feedback">
                <p className={answers[currentQuestion] === questions[currentQuestion].correct ? 'correct' : 'incorrect'}>
                  {answers[currentQuestion] === questions[currentQuestion].correct ? '✅ Correct!' : '❌ Not quite.'}
                </p>
                <p className="gm-explanation">{questions[currentQuestion].explanation}</p>
              </div>
            )}
          </div>
        </>
      )}

      {stage === 'complete' && (
        <>
          <div className="gm-completion">
            <h3>💡 The Scarcity Connection</h3>
            <p className="gm-insight">
              <strong>Physical Scarcity (Gold):</strong> Requires energy + time to extract from the earth
            </p>
            <p className="gm-challenge">
              <strong>Digital Challenge:</strong> How do you create scarcity in a world of infinite copying?
            </p>
            <p className="gm-bridge">
              In the physical world, energy creates scarcity. But online, anyone can copy anything instantly.
              What if we could require energy for digital creation too?
            </p>
          </div>
          <ActionButton onClick={onDone}>Discover: Proof-of-Work Digital Mining →</ActionButton>
        </>
      )}
    </div>
  );
};

export default GoldMiningChallenge;
