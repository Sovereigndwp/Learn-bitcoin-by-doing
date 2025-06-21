import React, { useState } from 'react';
import '../components/ModuleCommon.css';
import './BuildPerfectMoneyGame.css';
import { CheckCircle, XOctagon, HelpCircle } from 'lucide-react';

const allProperties = [
  { text: 'Scarce / Hard to Create', isCorrect: true },
  { text: 'Durable', isCorrect: true },
  { text: 'Divisible & Uniform', isCorrect: true },
  { text: 'Portable', isCorrect: true },
  { text: 'Verifiable', isCorrect: true },
  { text: 'Censorship-Resistant / Unconfiscatable', isCorrect: true },
  { text: 'Decentralized', isCorrect: true },
  { text: 'Can be printed to stimulate the economy', isCorrect: false },
  { text: 'Government-backed', isCorrect: false },
  { text: 'Used by central banks', isCorrect: false },
  { text: 'Requires ID and permission to use', isCorrect: false },
  { text: 'Inflation encourages spending', isCorrect: false }
];

const getFeedbackMessage = (score) => {
  switch(score) {
    case 1:
      return "Nice one.";
    case 2:
      return "That's 2 of 5.";
    case 3:
      return "That's 3 of 5.";
    case 4:
      return "Getting closer...";
    case 5:
      return "All 5 locked in? Let's see what you just invented.";
    default:
      return "🪙 0 / 5 properties identified";
  }
};

const BuildPerfectMoneyGame = ({ onComplete }) => {
  const [selected, setSelected] = useState([]);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState(getFeedbackMessage(0));

  const handleDrop = (prop) => {
    if (selected.includes(prop.text)) return;
    setSelected([...selected, prop.text]);
    if (prop.isCorrect) {
      const newScore = score + 1;
      setScore(newScore);
      setFeedback(getFeedbackMessage(newScore));
      if (newScore >= 5) {
        onComplete && onComplete();
      }
    } else {
      setFeedback('Think again… does that make your money safer or more dangerous?');
    }
  };

  const hintList = [
    '💡 What happens when money loses value every year?',
    '💡 Who should decide if you get to use money?',
    '💡 Can money survive war or theft?',
    '💡 Should money rely on trust… or math?',
    '💡 Can anyone stop you from using your money?' 
  ];

  const [hintIndex, setHintIndex] = useState(0);

  const handleHint = () => {
    setHintIndex((hintIndex + 1) % hintList.length);
  };

  return (
    <div className="module-container">
      <h1 className="module-title">Build the Perfect Money</h1>
      <div className="module-description">
        <p>You've seen what breaks money. Now try building one that actually works.</p>
        <p>Drag the properties you believe are essential into the circle.</p>
        <p>What would make a money system strong, fair, and unstoppable?</p>
        <p className="warning-text">Choose wisely. Some traits may sound helpful… but break things over time.</p>
      </div>

      <div className="hint-box" onClick={handleHint}>
        <HelpCircle size={20} /> {hintList[hintIndex]}
      </div>

      <div className="game-area">
        <div className="property-list">
          {allProperties.map((prop, i) => (
            <div
              key={i}
              className={`property-card ${selected.includes(prop.text) ? 'disabled' : ''}`}
              onClick={() => handleDrop(prop)}
            >
              {prop.text}
            </div>
          ))}
        </div>

        <div className="drop-zone">
          <div className="drop-circle">
            🪙
            <p>{score} / 5 properties identified</p>
          </div>
          <div className="feedback-text">{feedback}</div>
        </div>
      </div>

      {score >= 5 && (
        <div className="completion-box">
          <CheckCircle size={32} />
          <h2>You just built Bitcoin — without even knowing it.</h2>
          <p>Want to see how it works in real life?</p>
          <button className="continue-button" onClick={onComplete}>Continue</button>
        </div>
      )}
    </div>
  );
};

export default BuildPerfectMoneyGame; 