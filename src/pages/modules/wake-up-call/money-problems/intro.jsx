import React, { useState } from 'react';
import { ContinueButton } from '../../../../components/ui';
import '../../../../components/ModuleCommon.css';

export default function MoneyProblemsIntro() {
  const [currentProblem, setCurrentProblem] = useState(0);
  const [userReactions, setUserReactions] = useState({});

  const problems = [
    {
      id: 'frozen_accounts',
      title: '🚨 The $7 Million Freeze',
      hook: 'February 2022: A government froze $7 million in bank accounts with the click of a button.',
      setup: 'Peaceful protesters in Canada woke up to find their accounts frozen. No court orders. No warnings. They couldn\'t buy groceries for their families or pay rent.',
      shockingDetail: 'One woman had donated just $50 to the cause. Her entire life savings: frozen.',
      question: "Here's the uncomfortable truth: If someone else can freeze your money, do you actually own it?",
      options: [
        'Yes - it\'s still legally mine, just temporarily restricted',
        'No - true ownership means no one can take it away',
        'It depends on whether I agree with their reasons',
        'I never thought about ownership this way before'
      ],
      reality: 'The harsh reality: Having "access" to money is not the same as "owning" money. Your bank account is just an IOU from a bank that can be revoked.',
      impact: 'This affects everyone. If it can happen to them, it can happen to you.'
    },
    {
      id: 'inflation_theft',
      title: '💰 The Great Wealth Transfer',
      hook: 'Your grandfather could buy a house for what you spend on a used car.',
      setup: '1970: Average salary $5,000, average house $23,000. Today: Average salary $50,000, average house $400,000. Wait... something doesn\'t add up here.',
      shockingDetail: 'Your wages went up 10x, but everything else went up 15-20x. You\'re working harder for less.',
      question: "If you're earning 10 times more money than your grandfather, but can afford far less, what happened?",
      options: [
        'We\'re definitely richer - look at all this technology!',
        'We\'re actually poorer - our money buys less stuff',
        'It\'s about the same - wages and prices balanced out',
        'This is confusing - I need to see more numbers'
      ],
      reality: 'The uncomfortable truth: Your purchasing power has been systematically stolen through money printing. Every new dollar printed makes your existing dollars worth less.',
      impact: 'You\'re not imagining it. You ARE working harder for less, despite being more productive than any generation in history.'
    },
    {
      id: 'payment_friction',
      title: '🐌 Stone Age Money Systems',
      hook: 'You can send a 4K video to Japan in 3 seconds. But sending $100 to Japan takes 3-5 business days.',
      setup: 'We live in the internet age, yet our money systems run on 1970s technology. International transfers require 4-6 intermediaries, each taking a cut and adding delay.',
      shockingDetail: 'Banks make billions in fees from a system designed to be slow and expensive.',
      question: "In the internet age, why does it take longer to send money than to stream a movie?",
      options: [
        'Money is more complex than videos',
        'Banking systems are old and deliberately slow',
        'International regulations cause delays',
        'Security requires more time'
      ],
      reality: 'The truth: Banks benefit from the delays. Every day your money sits "in transit," they earn interest on it. Slow = profitable for them.',
      impact: 'You pay higher fees and wait longer so banks can profit from inefficiency.'
    }
  ];

  const currentProblemData = problems[currentProblem];

  const handleReaction = (choice) => {
    setUserReactions(prev => ({
      ...prev,
      [currentProblemData.id]: choice
    }));
  };

  const handleNext = () => {
    if (currentProblem < problems.length - 1) {
      setCurrentProblem(currentProblem + 1);
    }
  };

  return (
    <div className="step-content wake-up-call">
      <div className="module-header-box">
        <h2>🔥 The Money System is Broken</h2>
        <p>Most people don't realize their money isn't really theirs. Let's uncover some uncomfortable truths...</p>
      </div>

      <div className="content-text">
        <div className="problem-exploration">
          <div className="problem-demo">
            <h3>{currentProblemData.title}</h3>
            <div className="hook-text">
              <p className="shock-value">{currentProblemData.hook}</p>
            </div>
            <p className="setup-text">{currentProblemData.setup}</p>
            <div className="shocking-detail">
              <p className="detail-highlight">💡 {currentProblemData.shockingDetail}</p>
            </div>
            
            {!userReactions[currentProblemData.id] ? (
              <div className="thinking-challenge">
                <div className="challenge-question">
                  <h4>🤔 Think First:</h4>
                  <p>{currentProblemData.question}</p>
                </div>

                <div className="challenge-options">
                  {currentProblemData.options.map((option, index) => (
                    <button
                      key={index}
                      className="challenge-option"
                      onClick={() => handleReaction(option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="reality-reveal">
                <div className="user-prediction">
                  <h4>Your take: "{userReactions[currentProblemData.id]}"</h4>
                </div>

                <div className="reality-check">
                  <h4>💡 The Reality:</h4>
                  <p>{currentProblemData.reality}</p>
                </div>
                
                <div className="personal-impact">
                  <h4>🎯 What This Means for You:</h4>
                  <p className="impact-text">{currentProblemData.impact}</p>
                </div>
                
                {currentProblem < problems.length - 1 ? (
                  <button 
                    onClick={handleNext}
                    className="demo-next-button pulsing-button"
                  >
                    🔥 Another Shocking Truth →
                  </button>
                ) : (
                  <ContinueButton>
                    🟠 There Must Be a Better Way →
                  </ContinueButton>
                )}
              </div>
            )}
          </div>

          <div className="progress-dots">
            {problems.map((_, index) => (
              <div 
                key={index} 
                className={`progress-dot ${index === currentProblem ? 'active' : ''} ${index < currentProblem ? 'completed' : ''}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
