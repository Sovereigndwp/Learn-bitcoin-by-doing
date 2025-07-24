import React, { useState } from 'react';
import { OptionButton, ActionButton } from '../../../../components/ui';
import '../../../../components/ModuleCommon.css';

export default function PromiseIntro() {
  const [currentDemo, setCurrentDemo] = useState(0);
  const [userPredictions, setUserPredictions] = useState({});
  const [challengeMode, setChallengeMode] = useState(true);
  const [personalStory, setPersonalStory] = useState('');
  const [thinkingLevel, setThinkingLevel] = useState(1);

  // Streamlined problem demonstrations
  const problemDemos = [
    {
      id: 'control',
      title: 'Who Controls Your Money?',
      setup: 'In February 2022, the Canadian government froze bank accounts of peaceful protesters...',
      thinkingQuestion: "If your money can be frozen for political reasons, do you really own it?",
      challengeOptions: [
        'Yes, it\'s still mine even if temporarily frozen',
        'No, if it can be frozen, someone else controls it',
        'It depends on the reason for freezing',
        'I never thought about this before'
      ],
      reality: 'Over $7 million in accounts were frozen without court orders. Account holders couldn\'t buy groceries or pay bills.',
      deeperQuestion: "What's the difference between 'having access to money' and 'owning money'?"
    },
    {
      id: 'inflation',
      title: 'The Purchasing Power Problem',
      setup: 'Your grandfather earned $5,000/year in 1970. That same job pays $50,000 today...',
      thinkingQuestion: "If wages went up 10x but a house costs 20x more, are we getting richer or poorer?",
      challengeOptions: [
        'Richer - wages increased 10x',
        'Poorer - things cost more than wage increases',
        'Same - it all balances out',
        'Hard to tell without more data'
      ],
      reality: 'Average home: $23,000 (1970) → $400,000+ (2024). College: $400/year → $25,000/year. Your money buys less every year.',
      deeperQuestion: "Is inflation a natural force like gravity, or is it a policy choice?"
    },
    {
      id: 'speed',
      title: 'Digital Age, Stone Age Money',
      setup: 'You can send a 4K video to Japan in 3 seconds. But sending $100 to Japan takes 3-5 business days...',
      thinkingQuestion: "In the internet age, why does it take longer to send money than to send a video?",
      challengeOptions: [
        'Money is more complex than videos',
        'Banking systems are old and slow',
        'International regulations cause delays',
        'Security requires more time'
      ],
      reality: 'Banks still use 1970s technology (SWIFT). Your money moves through 4-6 intermediaries, each taking 1-2 days.',
      deeperQuestion: "Why do we accept that money moves slower than information?"
    }
  ];

  const currentProblem = problemDemos[currentDemo];

  const handleChallengeChoice = (choice) => {
    setUserPredictions(prev => ({
      ...prev,
      [currentProblem.id]: choice
    }));
    setChallengeMode(false);
    setThinkingLevel(1);
  };

  const handleDemoClick = () => {
    if (thinkingLevel === 1) {
      setThinkingLevel(2);
    } else {
      // Move to next demo or complete
      if (currentDemo < problemDemos.length - 1) {
        setCurrentDemo(currentDemo + 1);
        setChallengeMode(true);
        setThinkingLevel(1);
      }
    }
  };

  const handlePersonalStoryChange = (e) => {
    setPersonalStory(e.target.value);
  };

  return (
    <div className="step-content introduction">
      <div className="module-header-box">
        <h2>What Problems Does Bitcoin Solve?</h2>
        <div className="intro-text">
          <p className="prime-text">Before we explore Bitcoin, let's understand the problems with our current money system.</p>
        </div>
      </div>
      
      <div className="content-text">
        <div className="problem-exploration">
          <div className="problem-demo">
            <h3>{currentProblem.title}</h3>
            <p className="setup-text">{currentProblem.setup}</p>
            
            {challengeMode ? (
              <div className="thinking-challenge">
                <div className="challenge-question">
                  <h4>🤔 Think First:</h4>
                  <p>{currentProblem.thinkingQuestion}</p>
                </div>

                <div className="challenge-options">
                  {currentProblem.challengeOptions.map((option, index) => (
                    <OptionButton
                      key={index}
                      className="challenge-option"
                      onClick={() => handleChallengeChoice(option)}
                    >
                      {option}
                    </OptionButton>
                  ))}
                </div>
              </div>
            ) : (
              <div className="reality-reveal">
                <div className="user-prediction">
                  <h4>Your intuition: "{userPredictions[currentProblem.id]}"</h4>
                </div>

                <div className="reality-check">
                  <h4>📊 The Reality:</h4>
                  <p>{currentProblem.reality}</p>
                </div>
                
                {thinkingLevel === 2 && (
                  <div className="deeper-thinking">
                    <h4>🧠 Deeper Question:</h4>
                    <p>{currentProblem.deeperQuestion}</p>
                    
                    <div className="personal-reflection">
                      <h5>Your thoughts:</h5>
                      <textarea
                        value={personalStory}
                        onChange={handlePersonalStoryChange}
                        placeholder="How does this make you feel about money?"
                        className="reflection-input"
                      />
                    </div>
                  </div>
                )}
                
                <ActionButton 
                  onClick={handleDemoClick}
                  className="demo-next-button"
                >
                  {thinkingLevel === 1 ? "Reflect Deeper →" : 
                   currentDemo < problemDemos.length - 1 ? "Next Problem →" : "See Bitcoin's Solution →"}
                </ActionButton>
              </div>
            )}
          </div>

          <div className="progress-dots">
            {problemDemos.map((_, index) => (
              <div 
                key={index} 
                className={`progress-dot ${index === currentDemo ? 'active' : ''} ${index < currentDemo ? 'completed' : ''}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
