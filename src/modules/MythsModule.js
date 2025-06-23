import React, { useState } from 'react';
import { AlertCircle, Check, X, Lightbulb, Zap, DollarSign, Lock, Globe } from 'lucide-react';
import '../components/ModuleCommon.css';

const MythsModule = () => {
  const [selectedMyth, setSelectedMyth] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [userGuess, setUserGuess] = useState(null);
  const [viewedMyths, setViewedMyths] = useState(new Set());

  const myths = [
    {
      id: 'energy',
      title: 'The Energy Myth',
      icon: <Zap size={24} />,
      myth: 'Bitcoin wastes energy and is bad for the environment',
      reality: 'Bitcoin incentivizes renewable energy and can utilize excess/stranded energy',
      explanation: {
        key_points: [
          'Bitcoin mining can be powered by renewable sources',
          'Miners seek the cheapest energy, often renewables',
          'Mining can capture flared gas and reduce emissions',
          'The traditional banking system uses more energy'
        ],
        real_world_example: 'In Texas, Bitcoin miners help stabilize the power grid by quickly shutting down during peak demand and running on excess energy during low demand.',
        common_confusion: 'People often compare individual transactions without considering the security and settlement system Bitcoin provides.'
      }
    },
    {
      id: 'intrinsic',
      title: 'The Value Myth',
      icon: <DollarSign size={24} />,
      myth: 'Bitcoin has no intrinsic value because it\'s not backed by anything',
      reality: 'Bitcoin\'s value comes from its properties as sound money and its network effects',
      explanation: {
        key_points: [
          'Bitcoin is backed by mathematics and energy',
          'Scarcity and immutability give it value',
          'Network effects increase utility',
          'Fiat currencies also have no intrinsic value'
        ],
        real_world_example: 'Like the internet\'s value comes from its network of users, Bitcoin\'s value grows with adoption and utility.',
        common_confusion: 'People often think money needs to be "backed" by physical assets, but value comes from utility and trust.'
      }
    },
    {
      id: 'security',
      title: 'The Security Myth',
      icon: <Lock size={24} />,
      myth: 'Bitcoin can be hacked or copied',
      reality: 'Bitcoin\'s network is the most secure computing network in history',
      explanation: {
        key_points: [
          'Bitcoin has never been hacked in 14+ years',
          'The network is secured by massive computing power',
          'Private keys, not Bitcoin itself, need protection',
          'Creating a copy (fork) doesn\'t copy the network effects'
        ],
        real_world_example: 'While exchanges might get hacked, the Bitcoin network itself has remained secure since its inception in 2009.',
        common_confusion: 'People often confuse exchange hacks with Bitcoin network security.'
      }
    },
    {
      id: 'global',
      title: 'The Accessibility Myth',
      icon: <Globe size={24} />,
      myth: 'Bitcoin is too complicated for regular people to use',
      reality: 'Bitcoin is becoming increasingly user-friendly and accessible',
      explanation: {
        key_points: [
          'Modern wallets are simple to use',
          'You don\'t need to understand the technology to use it',
          'Similar to how people use the internet without understanding TCP/IP',
          'Educational resources are widely available'
        ],
        real_world_example: 'Like email in the 1990s, Bitcoin interfaces are becoming more user-friendly every year.',
        common_confusion: 'People think they need to understand the technical details to use Bitcoin.'
      }
    }
  ];

  const handleMythClick = (mythId) => {
    setSelectedMyth(mythId);
    setViewedMyths(prev => new Set(prev).add(mythId));
  };

  const handleGuess = (isTrue) => {
    const myth = myths.find(m => m.id === selectedMyth);
    if (myth) {
    setUserGuess(isTrue);
    setShowExplanation(true);
      if (isTrue === myth.isTrue) {
        // Handle correct answer
        setViewedMyths(prev => new Set(prev).add(myth.id));
      }
    }
  };

  const allMythsViewed = myths.every(myth => viewedMyths.has(myth.id));

  return (
    <div className="module-container">
      <div className="module-header">
        <h1 className="module-title">
          <AlertCircle className="module-icon" />
          Bitcoin Myths & Facts
        </h1>
      </div>
      
      <div className="step-content-container">
        <div className="intro-step">
          <div className="step-icon">
            <Lightbulb size={48} />
          </div>
          <h2>Welcome to Myth Busters: Bitcoin Edition! 🔍</h2>
          <p className="intro-text">
            Let's explore and debunk common Bitcoin myths and misconceptions. 
            Understanding what's true and what's not will help you make better-informed 
            decisions about Bitcoin.
          </p>
        </div>

        <div className="myths-grid">
          {myths.map((myth) => (
            <div 
              key={myth.id}
              className={`myth-card ${selectedMyth === myth.id ? 'active' : ''}`}
              onClick={() => handleMythClick(myth.id)}
            >
              <div className="myth-header">
                {myth.icon}
                <h3>{myth.title}</h3>
              </div>
              
              {selectedMyth === myth.id && (
                <div className="myth-content">
                  <div className="myth-statement">
                    <h4>Common Belief:</h4>
                    <p>{myth.myth}</p>
                  </div>
                  
                  {!userGuess && (
                    <div className="myth-question">
                      <p>Do you think this statement is true?</p>
                      <div className="guess-buttons">
                        <button 
                          className="guess-button true"
                          onClick={() => handleGuess(true)}
                        >
                          <Check size={16} />
                          True
                        </button>
                        <button 
                          className="guess-button false"
                          onClick={() => handleGuess(false)}
                        >
                          <X size={16} />
                          False
                        </button>
                      </div>
                    </div>
                  )}

                  {showExplanation && (
                    <div className="myth-explanation">
                      <div className="reality-box">
                        <h4>Reality Check:</h4>
                        <p>{myth.reality}</p>
                      </div>
                      
                      <div className="key-points">
                        <h4>Key Points:</h4>
                        <ul>
                          {myth.explanation.key_points.map((point, index) => (
                            <li key={index}>{point}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="example-box">
                        <h4>Real World Example:</h4>
                        <p>{myth.explanation.real_world_example}</p>
                      </div>
                      
                      <div className="confusion-box">
                        <h4>Common Confusion:</h4>
                        <p>{myth.explanation.common_confusion}</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="learning-tips">
          <h3>💡 Remember</h3>
          <ul>
            <li>Always verify information from reliable sources</li>
            <li>Be skeptical of sensational headlines</li>
            <li>Understanding takes time - it's okay to learn gradually</li>
            <li>Focus on fundamentals before diving into complex topics</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MythsModule; 