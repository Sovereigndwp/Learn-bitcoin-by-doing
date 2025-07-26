import React, { useState } from 'react';
import { ActionButton, StepNavigation } from '../components/EnhancedButtons';
import '../components/ModuleCommon.css';

const MoneyScorecard = ({ unlockedTraits, onComplete }) => {
  const [step, setStep] = useState(0);
  const [currentTrait, setCurrentTrait] = useState(0);

  const soundMoneyTraits = [
    { icon: "🔒", name: "Self Custody", description: "You control your money, not someone else", category: "Control" },
    { icon: "🌐", name: "Decentralization", description: "No single group can control or change it", category: "Control" },
    { icon: "🔍", name: "Verifiability", description: "Easy to verify that the money is real and not counterfeit", category: "Control" },
    { icon: "📊", name: "Fixed Supply", description: "No one can print more to benefit themselves", category: "Scarcity" },
    { icon: "💎", name: "Genuine Scarcity", description: "The limited supply is real and enforced", category: "Scarcity" },
    { icon: "🔄", name: "Fungibility", description: "Every unit is identical to every other unit", category: "Scarcity" },
    { icon: "📱", name: "Portability", description: "Easy to transport from one place to another — physically or digitally", category: "Usability" },
    { icon: "➗", name: "Divisibility", description: "Easy to divide into smaller units for transactions of any size", category: "Usability" },
    { icon: "⏳", name: "Durability", description: "Lasts over time without degrading", category: "Usability" },
    { icon: "🤝", name: "Acceptability", description: "Widely trusted and accepted through social consensus", category: "Usability" }
  ];

  const categories = {
    "Control": { traits: soundMoneyTraits.filter(t => t.category === "Control"), color: "#ff6b6b" },
    "Scarcity": { traits: soundMoneyTraits.filter(t => t.category === "Scarcity"), color: "#4ecdc4" },
    "Usability": { traits: soundMoneyTraits.filter(t => t.category === "Usability"), color: "#45b7d1" }
  };

  const frameworkSteps = [
    {
      title: "10-Point Money Scorecard",
      content: (
        <div className="scorecard-intro">
          <h3>Your Framework for Evaluating Any Money</h3>
          <p>Based on what you've learned from history, here are the 10 essential properties of sound money, organized into 3 categories:</p>
          
          <div className="categories-overview">
            {Object.entries(categories).map(([categoryName, categoryData]) => (
              <div key={categoryName} className="category-card" style={{ borderLeft: `4px solid ${categoryData.color}` }}>
                <h4>{categoryName}</h4>
                <div className="category-traits">
                  {categoryData.traits.map((trait, index) => (
                    <div key={index} className="trait-item">
                      <span className="trait-icon">{trait.icon}</span>
                      <span className="trait-name">{trait.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="scorecard-insight">
            <h4>💡 How to Use This Scorecard</h4>
            <p>For any form of money, ask: "How many of these 10 properties does it have?" The more it has, the better it functions as money.</p>
          </div>
        </div>
      )
    },
    {
      title: "Deep Dive: Each Property",
      content: (
        <div className="trait-deep-dive">
          <h3>Understanding Each Property</h3>
          <p>Let's examine each property in detail:</p>
          
          <div className="trait-progress">
            <p>Property {currentTrait + 1} of {soundMoneyTraits.length}</p>
          </div>

          <div className="current-trait-display">
            <div className="trait-card featured" style={{ borderColor: categories[soundMoneyTraits[currentTrait].category].color }}>
              <div className="trait-header">
                <span className="trait-icon-large">{soundMoneyTraits[currentTrait].icon}</span>
                <div className="trait-info">
                  <h5>{soundMoneyTraits[currentTrait].name}</h5>
                  <span className="trait-category">{soundMoneyTraits[currentTrait].category}</span>
                </div>
              </div>
              <p className="trait-description">{soundMoneyTraits[currentTrait].description}</p>
            </div>
          </div>

          <div className="trait-navigation">
            <ActionButton 
              onClick={() => setCurrentTrait(Math.max(0, currentTrait - 1))}
              disabled={currentTrait === 0}
              variant="secondary"
            >
              Previous Property
            </ActionButton>
            <ActionButton 
              onClick={() => setCurrentTrait(Math.min(soundMoneyTraits.length - 1, currentTrait + 1))}
              disabled={currentTrait === soundMoneyTraits.length - 1}
              variant="secondary"
            >
              Next Property
            </ActionButton>
          </div>

          <div className="trait-summary">
            <h4>All 10 Properties:</h4>
            <div className="traits-grid">
              {soundMoneyTraits.map((trait, index) => (
                <div 
                  key={index} 
                  className={`trait-grid-item ${index === currentTrait ? 'current' : ''}`}
                  onClick={() => setCurrentTrait(index)}
                  style={{ borderColor: categories[trait.category].color }}
                >
                  <span className="trait-icon">{trait.icon}</span>
                  <span className="trait-name">{trait.name}</span>
                  {index === currentTrait && <span className="current-indicator">←</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Ready to Test Your Framework",
      content: (
        <div className="framework-ready">
          <h3>Time to Apply What You've Learned</h3>
          <p>Now you have a complete framework for evaluating money. Let's test it by comparing different money systems.</p>
          
          <div className="preview-comparison">
            <h4>You'll Compare:</h4>
            <div className="comparison-preview">
              <div className="money-type">
                <h5>🥇 Gold</h5>
                <p>The historical standard</p>
              </div>
              <div className="money-type">
                <h5>💵 Fiat Currency</h5>
                <p>Modern government money</p>
              </div>
              <div className="money-type">
                <h5>₿ Bitcoin</h5>
                <p>Digital sound money</p>
              </div>
            </div>
          </div>
          
          <div className="excitement-builder">
            <h4>🎯 What You'll Discover:</h4>
            <ul>
              <li>Which money system scores highest on your 10-point framework</li>
              <li>Why Bitcoin was designed the way it was</li>
              <li>How different money systems trade off various properties</li>
              <li>Which system best preserves wealth over time</li>
            </ul>
          </div>
          
          <p><strong>Ready to see how Bitcoin stacks up?</strong></p>
        </div>
      )
    }
  ];

  const handleNext = () => {
    if (step < frameworkSteps.length - 1) {
      setStep(step + 1);
    }
  };

  const handlePrevious = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  return (
    <div className="module-container">
      <div className="section-card">
        <h1 className="heading-critical">{frameworkSteps[step].title}</h1>
        <p>Step {step + 1} of {frameworkSteps.length}</p>
      </div>
      
      <div className="card-feature">
        {frameworkSteps[step].content}
        
        {step === frameworkSteps.length - 1 ? (
          <ActionButton onClick={() => onComplete(5)} variant="primary">
            Next: Apply Scorecard
          </ActionButton>
        ) : (
          <StepNavigation
            currentStep={step}
            totalSteps={frameworkSteps.length}
            onPrevious={handlePrevious}
            onNext={handleNext}
            canGoBack={step > 0}
            nextLabel="Next"
          />
        )}
      </div>
    </div>
  );
};

export default MoneyScorecard; 