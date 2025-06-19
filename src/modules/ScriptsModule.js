import React, { useState } from 'react';
import { FileText, Lock, Key, Clock, Users } from 'lucide-react';
import '../components/ModuleCommon.css';

const ScriptsModule = () => {
  const [activeExample, setActiveExample] = useState(null);

  const scriptExamples = [
    {
      id: 'simple',
      title: 'The Magic Vault',
      icon: <Lock size={24} />,
      description: 'Imagine a magical vault that only opens with the right spell (signature). This is like the most common Bitcoin script!',
      interactive: {
        setup: 'You have a vault that needs your digital signature to open',
        challenge: 'Try signing with your key to unlock the funds',
        success: 'Congratulations! You\'ve unlocked the basic Bitcoin script that secures most transactions.'
      }
    },
    {
      id: 'timelock',
      title: 'Time-Traveling Treasury',
      icon: <Clock size={24} />,
      description: 'What if your vault had a timer? Learn about time-locked scripts that only unlock after a certain time.',
      interactive: {
        setup: 'Your treasure is locked until next week',
        challenge: 'Watch how the timelock counts down',
        success: 'You\'ve discovered how Bitcoin can lock funds until a specific time!'
      }
    },
    {
      id: 'multisig',
      title: 'The Council Chamber',
      icon: <Users size={24} />,
      description: 'Like a council that needs multiple members to agree, multi-signature scripts require multiple approvals.',
      interactive: {
        setup: 'Create a vault that needs 2 out of 3 council members to approve',
        challenge: 'Collect the required signatures to unlock the vault',
        success: 'You\'ve mastered multi-signature scripts!'
      }
    }
  ];

  return (
    <div className="module-container">
      <div className="module-header">
        <h1 className="module-title">
          <FileText className="module-icon" />
          Bitcoin Scripts: Your Digital Spell Book
        </h1>
      </div>
      
      <div className="step-content-container">
        <div className="intro-step">
          <div className="step-icon">
            <Key size={48} />
          </div>
          <h2>Welcome to Your Digital Spell Book!</h2>
          <p className="intro-text">
            Imagine Bitcoin scripts as magical spells that protect your digital treasure. 
            Just like a spell book contains different incantations for different purposes, 
            Bitcoin has various scripts for different ways of protecting and spending your coins.
          </p>
        </div>

        <div className="examples-grid">
          {scriptExamples.map((example) => (
            <div 
              key={example.id} 
              className={`example-card ${activeExample === example.id ? 'active' : ''}`}
              onClick={() => setActiveExample(example.id)}
            >
              <div className="example-header">
                {example.icon}
                <h3>{example.title}</h3>
              </div>
              <p>{example.description}</p>
              
              {activeExample === example.id && (
                <div className="interactive-content">
                  <div className="setup-box">
                    <h4>Setup</h4>
                    <p>{example.interactive.setup}</p>
                  </div>
                  <div className="challenge-box">
                    <h4>Your Challenge</h4>
                    <p>{example.interactive.challenge}</p>
                  </div>
                  <div className="success-box">
                    <h4>Achievement</h4>
                    <p>{example.interactive.success}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="learning-tips">
          <h3>🌟 Key Takeaways</h3>
          <ul>
            <li>Scripts are like digital rules that protect your Bitcoin</li>
            <li>Different scripts serve different purposes (like different spells)</li>
            <li>You can combine scripts to create powerful protection mechanisms</li>
            <li>Scripts are what make Bitcoin programmable money!</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ScriptsModule; 