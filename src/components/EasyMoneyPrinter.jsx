import React, { useState } from 'react';
import { ActionButton } from '../components/EnhancedButtons';
import './EasyMoneyPrinter.css';

const EasyMoneyPrinter = ({ onDone }) => {
  const [supply, setSupply] = useState(100);   // base money
  const [bread, setBread] = useState(1);     // price index
  const [clicks, setClicks] = useState(0);
  const [stage, setStage] = useState('intro'); // intro, printing, reflection, questions, complete
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);

  const print = amt => {
    setSupply(supply + amt);
    setBread(parseFloat((bread * (1 + amt / 100)).toFixed(2)));
    setClicks(clicks + 1);
    if (clicks === 0) setStage('printing');
    if (clicks >= 2) {
      setTimeout(() => setStage('reflection'), 1000);
    }
  };

  const questions = [
    {
      question: "Why did the bread price increase each time we printed money?",
      options: [
        "The bread became more valuable",
        "More money chasing the same goods = higher prices",
        "The printer is broken"
      ],
      correct: 1,
      explanation: "Exactly! This is inflation - when money supply increases faster than goods, prices rise. Each dollar becomes worth less."
    },
    {
      question: "If printing money was the solution to poverty, why don't all countries just print unlimited money?", 
      options: [
        "They're not smart enough",
        "It would destroy the currency's value (hyperinflation)", 
        "They don't have enough paper"
      ],
      correct: 1,
      explanation: "Correct! History shows us examples like Zimbabwe and Weimar Germany where excessive money printing led to economic collapse."
    },
    {
      question: "What would happen if anyone could easily create dollars at home?",
      options: [
        "Everyone would be rich",
        "Dollars would become worthless",
        "The economy would boom"
      ],
      correct: 1,
      explanation: "Yes! Money only has value because it's scarce and hard to create. Easy creation = no value."
    }
  ];

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
    <div className="card em-container">
      <h2>🖨️ The Fiat Money Experiment</h2>
      
      {stage === 'intro' && (
        <>
          <p className="em-intro">
            You're now a central banker with unlimited printing power. 
            Let's see what happens when money creation is "free"...
          </p>
          <div className="em-stats">
            <p>Money supply: <strong>${supply.toLocaleString()} B</strong></p>
            <p>Price of bread: <strong>${bread}</strong></p>
          </div>
          <p className="em-instruction">Try printing some money and watch what happens:</p>
          <div className="em-buttons">
            <ActionButton onClick={() => print(50)}>Print $50 B</ActionButton>
            <ActionButton onClick={() => print(200)}>Print $200 B</ActionButton>
          </div>
        </>
      )}

      {stage === 'printing' && (
        <>
          <div className="em-stats">
            <p>Money supply: <strong>${supply.toLocaleString()} B</strong></p>
            <p>Price of bread: <strong>${bread}</strong></p>
          </div>
          <p className="em-observation">
            🤔 Notice the bread price changed... Keep printing to see the pattern:
          </p>
          <div className="em-buttons">
            <ActionButton onClick={() => print(50)}>Print $50 B</ActionButton>
            <ActionButton onClick={() => print(200)}>Print $200 B</ActionButton>
          </div>
        </>
      )}

      {stage === 'reflection' && (
        <>
          <div className="em-stats">
            <p>Money supply: <strong>${supply.toLocaleString()} B</strong></p>
            <p>Price of bread: <strong>${bread}</strong></p>
          </div>
          <div className="em-warning">
            <p>⚠️ <strong>Pattern Detected:</strong></p>
            <p>Every time we printed money, bread became more expensive.</p>
            <p>We created {((supply - 100) / 100 * 100).toFixed(0)}% more money, but bread is now {((bread - 1) * 100).toFixed(0)}% more expensive!</p>
            <p className="em-insight">
              <em>"When creation is effortless, money bleeds value."</em>
            </p>
          </div>
          <ActionButton onClick={startQuestions}>Why does this happen? →</ActionButton>
        </>
      )}

      {stage === 'questions' && (
        <>
          <div className="em-question-container">
            <h3>Question {currentQuestion + 1} of {questions.length}</h3>
            <p className="em-question">{questions[currentQuestion].question}</p>
            
            {answers.length === currentQuestion ? (
              <div className="em-options">
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
              <div className="em-answer-feedback">
                <p className={answers[currentQuestion] === questions[currentQuestion].correct ? 'correct' : 'incorrect'}>
                  {answers[currentQuestion] === questions[currentQuestion].correct ? '✅ Correct!' : '❌ Not quite.'}
                </p>
                <p className="em-explanation">{questions[currentQuestion].explanation}</p>
              </div>
            )}
          </div>
        </>
      )}

      {stage === 'complete' && (
        <>
          <div className="em-completion">
            <h3>💡 Key Insight Unlocked</h3>
            <p className="em-insight">
              <strong>The Scarcity Principle:</strong> Money only holds value when it's genuinely scarce and costly to create.
            </p>
            <p>
              Fiat currencies can be printed endlessly, but this devalues everyone's savings. 
              Gold has been valuable for millennia because it's genuinely scarce - but what about digital scarcity?
            </p>
          </div>
          <ActionButton onClick={onDone}>Discover how gold gets its scarcity →</ActionButton>
        </>
      )}
    </div>
  );
};

export default EasyMoneyPrinter;
