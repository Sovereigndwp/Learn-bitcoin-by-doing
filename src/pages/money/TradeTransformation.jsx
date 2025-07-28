import React, { useState, useEffect } from 'react';
import { ActionButton, StepNavigation } from '../../components/EnhancedButtons';

const scenes = [
  // Barter failures
  {
    id: 1,
    icon: '☕️',
    title: '7:00 AM – Morning Coffee',
    text:
      `You offer the barista a logo for your latte. She doesn't need design—she needs her car fixed.`,
    problem: 'Hard to Match'
  },
  {
    id: 2,
    icon: '🔗',
    title: '8:30 AM – The Chain Reaction',
    text:
      'You juggle four trades—mechanic, developer, printer—just to get a single cup.',
    problem: 'Takes Too Long'
  },
  {
    id: 3,
    icon: '⚡',
    title: '12:00 PM – Lunch Delayed',
    text:
      `A pizza place *would* trade, but only after rush hour. You're hungry now, not at 4 PM.`,
    problem: 'Bad Timing'
  },
  {
    id: 4,
    icon: '📦',
    title: '1:00 PM – Spoiled Savings',
    text:
      `You trade a flyer design for fresh veggies. By dinner they're wilted—your "savings" are worthless.`,
    problem: 'No Storage'
  },
  {
    id: 5,
    icon: '⚖️',
    title: '7:00 PM – Fair Trade?',
    text:
      'Cleaning vs. cake vs. rice—for one logo. How do you compare the value of each?',
    problem: 'No Common Measure'
  },

  // Money functions
  {
    id: 6,
    icon: '💱',
    title: 'Medium of Exchange',
    text:
      'Hand over one coin → get coffee instantly. No chains to coordinate, no perfect timing needed.'
  },
  {
    id: 7,
    icon: '💰',
    title: 'Store of Value',
    text:
      `Sell veggies for money → keep it overnight → buy dinner tomorrow. Money doesn't spoil.`
  },
  {
    id: 8,
    icon: '📏',
    title: 'Unit of Account',
    text:
      'Cleaning = $40, Cake = $25, Rice = $5. A single measure makes comparing prices easy.'
  }
];

export default function TradeTransformation({ onComplete }) {
  const [scene, setScene] = useState(1);

  // Scroll new scene into view
  useEffect(() => {
    document
      .getElementById(`scene-${scene}`)
      ?.scrollIntoView({ behavior: 'smooth' });
  }, [scene]);

  const next = () => {
    if (scene < scenes.length) {
      setScene(s => s + 1);
    } else {
      onComplete(1);  // advance MoneyModule to step 2
    }
  };

  const prev = () => {
    if (scene > 1) setScene(s => s - 1);
  };

  return (
    <div className="module-container">
      <div className="section-card">
        <h1 className="heading-critical">Trade Transformation</h1>
        <p className="mb-4">
          Experience five failures of barter—and three game-changing functions of money.
        </p>
      </div>

      <div className="card-feature">
        {scenes.map(sc =>
          sc.id === scene ? (
            <div
              key={sc.id}
              id={`scene-${sc.id}`}
              className="step-card mb-6"
            >
              <div className="flex items-center mb-3">
                <span className="text-3xl mr-3">{sc.icon}</span>
                <h2 className="heading-high">{sc.title}</h2>
              </div>

              <p className="mb-4">{sc.text}</p>

              {/* highlight barter problems */}
              {sc.problem && (
                <div className="card-supporting mb-4">
                  <strong>Problem: </strong>
                  {sc.problem}
                </div>
              )}

              {/* Prev/Next buttons */}
              <div className="flex justify-between">
                <ActionButton
                  onClick={prev}
                  disabled={scene === 1}
                  variant="secondary"
                >
                  ← Back
                </ActionButton>

                {scene < scenes.length ? (
                  <ActionButton onClick={next} variant="primary">
                    Continue →
                  </ActionButton>
                ) : (
                  <StepNavigation
                    currentStep={scene - 1}
                    totalSteps={scenes.length}
                    onPrevious={prev}
                    onNext={next}
                    canGoBack={true}
                    nextLabel="Continue to Payments"
                  />
                )}
              </div>
            </div>
          ) : null
        )}
      </div>
    </div>
  );
}
