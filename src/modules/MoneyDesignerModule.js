import React, { useState } from 'react';
import '../components/ModuleCommon.css';
import { Coins, Flame, XOctagon, CheckCircle, Trophy } from 'lucide-react';

const properties = [
  {
    id: 'divisibility',
    title: 'Divisibility',
    options: [
      { label: 'Perfectly divisible (like Bitcoin: 100M satoshis)', score: 2 },
      { label: 'Limited divisions (like dollars: 100 cents)', score: 1 },
      { label: 'Cannot be divided (like artwork)', score: -2 }
    ]
  },
  {
    id: 'fungibility',
    title: 'Fungibility',
    options: [
      { label: 'Each unit identical & interchangeable', score: 2 },
      { label: 'Some units worth more than others', score: -1 },
      { label: 'Each unit unique (like NFTs)', score: -2 }
    ]
  },
  {
    id: 'scarcity',
    title: 'Scarcity',
    options: [
      { label: 'Mathematically guaranteed cap (Bitcoin)', score: 2 },
      { label: 'Natural scarcity (Gold, Land)', score: 1 },
      { label: 'Can be created at will (Fiat)', score: -2 }
    ]
  },
  {
    id: 'durability',
    title: 'Durability',
    options: [
      { label: 'Information cannot degrade (Bitcoin)', score: 2 },
      { label: 'Physically durable (Gold)', score: 1 },
      { label: 'Degrades over time (Food)', score: -2 }
    ]
  },
  {
    id: 'portability',
    title: 'Portability',
    options: [
      { label: 'Instant global transfer (Bitcoin)', score: 2 },
      { label: 'Physical transport required (Gold)', score: -1 },
      { label: 'Location-bound (Real Estate)', score: -2 }
    ]
  },
  {
    id: 'verifiability',
    title: 'Verifiability',
    options: [
      { label: 'Mathematical proof (Bitcoin)', score: 2 },
      { label: 'Requires special equipment (Gold)', score: 0 },
      { label: 'Easy to counterfeit (Cash)', score: -2 }
    ]
  },
  {
    id: 'privacy',
    title: 'Privacy',
    options: [
      { label: 'Optional privacy with public verification', score: 2 },
      { label: 'Full transparency only (Bank transfers)', score: -1 },
      { label: 'No privacy (CBDC)', score: -2 }
    ]
  },
  {
    id: 'sovereignty',
    title: 'Sovereignty',
    options: [
      { label: 'Self-custodial with your own keys', score: 2 },
      { label: 'Physical possession required', score: 1 },
      { label: 'Controlled by third party', score: -2 }
    ]
  }
];

const MoneyDesignerModule = () => {
  const [choices, setChoices] = useState({});
  const [complete, setComplete] = useState(false);

  const handleSelect = (propertyId, optionIndex) => {
    setChoices({ ...choices, [propertyId]: optionIndex });
  };

  const getTotalScore = () => {
    return properties.reduce((score, prop) => {
      const option = choices[prop.id];
      return score + (option !== undefined ? prop.options[option].score : 0);
    }, 0);
  };

  const getMaxScore = () => {
    return properties.length * 2; // Each property has a max score of 2
  };

  const handleSubmit = () => {
    if (Object.keys(choices).length < properties.length) {
      alert("Please make selections for all properties first!");
      return;
    }
    setComplete(true);
  };

  const getFeedback = () => {
    const score = getTotalScore();
    const maxScore = getMaxScore();
    const percentage = (score / maxScore) * 100;

    if (percentage >= 90) {
      return {
        icon: <Trophy className="result-icon success" />,
        message: "Outstanding! You've designed something very close to perfect money. Your design shares many properties with Bitcoin!",
        class: "success"
      };
    } else if (percentage >= 70) {
      return {
        icon: <CheckCircle className="result-icon good" />,
        message: "Good design! Your money would work, but has some areas for improvement.",
        class: "good"
      };
    } else if (percentage >= 50) {
      return {
        icon: <Flame className="result-icon warning" />,
        message: "Your money design might work short-term, but has significant weaknesses.",
        class: "warning"
      };
    } else {
      return {
        icon: <XOctagon className="result-icon danger" />,
        message: "This money design would likely fail. Consider what properties make money reliable and trustworthy.",
        class: "danger"
      };
    }
  };

  return (
    <div className="module-container">
      <h1 className="module-title">
        <Coins className="module-icon" />
        Design Your Perfect Money
      </h1>
      <p className="module-description">
        What makes money truly valuable? Select one option for each property below to design your ideal monetary system.
        Think carefully about how each choice affects the money's usefulness and reliability.
      </p>

      {!complete && (
        <div className="designer-grid">
          {properties.map((prop) => (
            <div key={prop.id} className="property-block">
              <h3>{prop.title}</h3>
              {prop.options.map((option, index) => (
                <button
                  key={index}
                  className={`choice-button ${choices[prop.id] === index ? 'selected' : ''}`}
                  onClick={() => handleSelect(prop.id, index)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          ))}
          <button 
            className="submit-button"
            onClick={handleSubmit}
            disabled={Object.keys(choices).length < properties.length}
          >
            Analyze My Money Design
          </button>
        </div>
      )}

      {complete && (
        <div className="result-screen">
          <h2>Design Analysis</h2>
          <div className={`score-display ${getFeedback().class}`}>
            {getFeedback().icon}
            <div className="score-details">
              <h3>Score: {getTotalScore()} / {getMaxScore()}</h3>
              <p>{getFeedback().message}</p>
            </div>
          </div>
          <button 
            className="retry-button"
            onClick={() => {
              setChoices({});
              setComplete(false);
            }}
          >
            Design Again
          </button>
        </div>
      )}
    </div>
  );
};

export default MoneyDesignerModule; 