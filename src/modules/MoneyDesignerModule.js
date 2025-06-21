import React, { useState } from 'react';
import '../components/ModuleCommon.css';
import { Scale, Zap, Clock, Globe, Lock, Shield, Network } from 'lucide-react';

const moneyProperties = [
  {
    id: 'scarcity',
    icon: Scale,
    title: 'Scarcity = No Hidden Theft',
    description: 'Good money must be hard to create. If someone can easily make more, they\'re stealing your time without your permission.',
    challenge: {
      scenario: 'You\'re living in 1920s Germany. The government is printing money to pay war debts. Your savings could buy a house last year. This morning, it barely buys bread. What\'s really happening?',
      options: [
        { text: 'The market naturally decided your money is worth less', correct: false },
        { text: 'Someone is stealing your wealth through money creation', correct: true },
        { text: 'Prices are just temporarily high', correct: false }
      ],
      explanation: 'When money can be created easily, those who create it steal purchasing power from everyone else. This is why Bitcoin\'s fixed supply of 21 million is revolutionary - no one can inflate it away.',
      interactive: 'Try our inflation calculator: Enter a savings amount from 1920 Germany and watch its value evaporate as money printing accelerates.'
    }
  },
  {
    id: 'portability',
    icon: Zap,
    title: 'Portability = Global Power',
    description: 'If you can\'t carry your money across borders, or send it across oceans, your freedom is limited.',
    challenge: {
      scenario: 'You need to flee your country quickly with your life savings. You can choose: Gold bars, cash in a suitcase, or Bitcoin in your head (memorized seed phrase). Which is truly portable?',
      options: [
        { text: 'Gold - it\'s accepted worldwide', correct: false },
        { text: 'Cash - it\'s light and easy to carry', correct: false },
        { text: 'Bitcoin - it exists in your mind', correct: true }
      ],
      explanation: 'Bitcoin can cross any border in your mind through a memorized seed phrase. No physical weight, no metal detectors, no questions asked.',
      interactive: 'Interactive Map: Click different escape routes and see which forms of money can realistically make the journey.'
    }
  },
  {
    id: 'durability',
    icon: Clock,
    title: 'Durability = Trust Across Time',
    description: 'Your money shouldn\'t melt, rot, rust, or glitch. It must survive war, migration, even memory loss.',
    challenge: {
      scenario: 'The year is 2122. You discover three time capsules from 2022: A USB drive with Bitcoin, paper cash, and gold coins. What survived a century?',
      options: [
        { text: 'The USB might be dead, but Bitcoin lives on the network', correct: true },
        { text: 'The cash is still perfectly good', correct: false },
        { text: 'Only the gold coins survived', correct: false }
      ],
      explanation: 'Bitcoin isn\'t stored on any single device - it lives on a global network. Even if every computer died today, one copy of the blockchain would restore everything.',
      interactive: 'Timeline Explorer: Scroll through history and see which forms of money survived major disasters, wars, and technological changes.'
    }
  },
  {
    id: 'accessibility',
    icon: Globe,
    title: 'Accessibility = No More Gatekeepers',
    description: 'Money should work for anyone — no paperwork, bank accounts, or government approval required.',
    challenge: {
      scenario: 'Three people want to save money: A refugee without ID, a teenager in a rural village, and a small business owner whose bank just closed. Who can use Bitcoin?',
      options: [
        { text: 'Only the business owner with documentation', correct: false },
        { text: 'The business owner and teenager', correct: false },
        { text: 'All three - Bitcoin has no gatekeepers', correct: true }
      ],
      explanation: 'Bitcoin is the first truly accessible global money. No one can stop you from using it, regardless of age, nationality, or status.',
      interactive: 'Global Access Map: See real stories of people using Bitcoin where traditional banking failed them.'
    }
  },
  {
    id: 'unconfiscatable',
    icon: Lock,
    title: 'Unconfiscatability = True Ownership',
    description: 'If your wealth can be frozen, seized, or denied — it\'s not really yours.',
    challenge: {
      scenario: 'Your government announces a "bank holiday" - all accounts frozen. You have: Money in a bank, cash under your bed, and Bitcoin with your keys. What\'s truly yours?',
      options: [
        { text: 'The bank money - it\'s insured', correct: false },
        { text: 'The cash - it\'s in your possession', correct: false },
        { text: 'The Bitcoin - only you have the keys', correct: true }
      ],
      explanation: 'Recent history shows that bank accounts can be frozen, cash can be declared invalid, but Bitcoin with your keys stays yours.',
      interactive: 'Asset Seizure Simulator: Test different scenarios and see which assets remain under your control.'
    }
  },
  {
    id: 'rules',
    icon: Shield,
    title: 'Rules Without Rulers',
    description: 'Fair money follows rules that apply to everyone — with no one above the system.',
    challenge: {
      scenario: 'Central banks hold a secret meeting and change monetary policy. Which system remains unchanged: Government money, corporate payment apps, or Bitcoin?',
      options: [
        { text: 'Government money - it\'s officially regulated', correct: false },
        { text: 'Payment apps - they\'re private companies', correct: false },
        { text: 'Bitcoin - its rules are mathematical', correct: true }
      ],
      explanation: 'Bitcoin\'s rules are enforced by math and consensus, not by corruptible humans. No secret meetings can change them.',
      interactive: 'Policy Impact Calculator: Compare how policy changes affect different forms of money.'
    }
  },
  {
    id: 'decentralization',
    icon: Network,
    title: 'Decentralization = No Single Point of Failure',
    description: 'When money relies on a single vault or database, it becomes a target. Decentralization is survival.',
    challenge: {
      scenario: 'A major disaster takes down the internet in half the world. Which system keeps running: Traditional banking, mobile payment apps, or Bitcoin?',
      options: [
        { text: 'Traditional banking has better infrastructure', correct: false },
        { text: 'Mobile payment apps are more modern', correct: false },
        { text: 'Bitcoin - it runs everywhere, independently', correct: true }
      ],
      explanation: 'Bitcoin\'s network is like a hydra - cut off one head, others keep working. No single point of failure means unprecedented resilience.',
      interactive: 'Network Resilience Test: Simulate attacks on different financial networks and watch their recovery.'
    }
  }
];

const MoneyDesignerModule = () => {
  const [currentProperty, setCurrentProperty] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [progress, setProgress] = useState(0);

  const handlePropertyClick = (property) => {
    setCurrentProperty(property);
    setShowExplanation(false);
  };

  const handleAnswerSelect = (propertyId, answerIndex) => {
    if (userAnswers[propertyId] !== undefined) return; // Prevent changing answer

    const property = moneyProperties.find(p => p.id === propertyId);
    const isCorrect = property.challenge.options[answerIndex].correct;
    
    setUserAnswers({
      ...userAnswers,
      [propertyId]: { selected: answerIndex, correct: isCorrect }
    });
    
    setShowExplanation(true);
    
    if (isCorrect) {
      setProgress(prev => prev + (100 / moneyProperties.length));
    }
  };

  const getProgressColor = () => {
    if (progress >= 80) return '#4CAF50';
    if (progress >= 60) return '#FFC107';
    if (progress >= 40) return '#FF9800';
    return '#f7931a';
  };

  return (
    <div className="module-container">
      <h1 className="module-title">
        <Scale className="module-icon" />
        Unbreakable Money: A Journey Through Time
      </h1>
      
      <div className="progress-bar" style={{ 
        width: '100%',
        height: '8px',
        backgroundColor: '#2c2c2c',
        borderRadius: '4px',
        marginBottom: '2rem'
      }}>
        <div style={{
          width: `${progress}%`,
          height: '100%',
          backgroundColor: getProgressColor(),
          borderRadius: '4px',
          transition: 'width 0.5s ease-in-out'
        }} />
      </div>

      <div className="properties-grid">
        {moneyProperties.map(property => {
          const Icon = property.icon;
          const answered = userAnswers[property.id];
          
          return (
            <div 
              key={property.id}
              className={`property-card ${currentProperty?.id === property.id ? 'active' : ''} ${answered ? (answered.correct ? 'correct' : 'incorrect') : ''}`}
              onClick={() => handlePropertyClick(property)}
            >
              <Icon className="property-icon" />
              <h3>{property.title}</h3>
              <p>{property.description}</p>
            </div>
          );
        })}
      </div>

      {currentProperty && (
        <div className="challenge-container">
          <h2>Time Travel Challenge</h2>
          <p className="scenario">{currentProperty.challenge.scenario}</p>
          
          <div className="options-container">
            {currentProperty.challenge.options.map((option, index) => {
              const answered = userAnswers[currentProperty.id];
              const isSelected = answered && answered.selected === index;
              const showCorrect = answered && option.correct;
              
              return (
                <button
                  key={index}
                  className={`option-button ${isSelected ? 'selected' : ''} ${showCorrect ? 'correct' : ''}`}
                  onClick={() => handleAnswerSelect(currentProperty.id, index)}
                  disabled={answered !== undefined}
                >
                  {option.text}
                </button>
              );
            })}
          </div>

          {showExplanation && (
            <div className="explanation-container">
              <p>{currentProperty.challenge.explanation}</p>
              <div className="interactive-element">
                {currentProperty.challenge.interactive}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MoneyDesignerModule; 