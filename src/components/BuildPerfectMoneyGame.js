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

const BuildPerfectMoneyGame = ({ onComplete }) => {
  const [selected, setSelected] = useState([]);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');

  const handleDrop = (prop) => {
    if (selected.includes(prop.text)) return;
    setSelected([...selected, prop.text]);
    if (prop.isCorrect) {
      const newScore = score + 1;
      setScore(newScore);
      const messages = [
        '✅ That one passes the test of time.',
        '🧠 Smart. The Romans wish they had this.',
        '📈 Strong choice. That\'s money muscle.',
        '🔒 A trait worth locking in.',
        '🎯 Nailed it. History agrees with you.',
        '💥 One step closer to bulletproof money.'
      ];
      setFeedback(messages[Math.floor(Math.random() * messages.length)]);
      if (newScore >= 6) {
        onComplete && onComplete();
      }
    } else {
      const wrongMsgs = [
        '🚫 Looks good on paper... until it isn\'t.',
        '👎 That\'s how inflation sneaks in the back door.',
        '🧯 This one has burned more economies than fire.',
        '💸 And that\'s how they quietly stole your savings.',
        '🤥 Trust-based systems? Cute.',
        '📉 Bad call. This breaks under pressure.'
      ];
      setFeedback(wrongMsgs[Math.floor(Math.random() * wrongMsgs.length)]);
    }
  };

  const hintList = [
    '💬 Design the wrong money, and the whole game falls apart. No pressure.',
    '💬 If they can print more, is it even yours?',
    '💬 What happens when your money stops working, but rent is due?',
    '💬 Trust is great... until someone breaks it.',
    '💬 Sound money doesn\'t ask for permission.',
    '💬 If money melts or rusts, it\'s a ticking time bomb.',
    '💬 They said it was backed. Then they changed the rules.'
  ];

  const [hintIndex, setHintIndex] = useState(0);

  const handleHint = () => {
    setHintIndex((hintIndex + 1) % hintList.length);
  };

  return (
    <div className="module-container">
      <h1 className="module-title">Build the Perfect Money</h1>
      <div className="module-description">
        <p>Most money starts strong and ends in disaster.</p>
        <p>Let's see if you can do better.</p>
        <p>Choose the traits you think make money work.</p>
        <p className="warning-text">If you're right, you'll know — and if you're wrong, history's already proven it.</p>
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
            <p>{score} / 6 properties identified</p>
          </div>
          <div className="feedback-text">{feedback}</div>
        </div>
      </div>

      {score >= 6 && (
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