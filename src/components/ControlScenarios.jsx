import React, { useState } from 'react';
import { ActionButton } from './EnhancedButtons';
import './ControlScenarios.css';

const scenarios = [
  {
    id: 'withdraw',
    title: '💵  Withdraw $10 000 cash',
    bankResponse: `📝 "We must file a Currency Transaction Report.\n
    Why do you need that much cash?"`
  },
  {
    id: 'bitcoin',
    title: '₿  Buy Bitcoin on Coinbase',
    bankResponse: `🚫 "For your protection we block crypto purchases.\n
    Try again with a different merchant."`
  },
  {
    id: 'iran',
    title: '🌍  Send $500 to family in Iran',
    bankResponse: `🛑 "Transfer rejected: OFAC-sanctioned destination."`
  },
  {
    id: 'freeze',
    title: '❄️  Account suddenly frozen',
    bankResponse: `🔒 "Your account is under review.\n
    Access suspended until investigation completes."`
  }
];

const ControlScenarios = ({ onFinish }) => {
  const [revealed, setRevealed] = useState({});

  const allDone = Object.keys(revealed).length === scenarios.length;

  return (
    <div className="control-container">
      <h2>Who really controls your money?</h2>
      <p>Click each scenario to see what happens when you try to use "your" funds.</p>

      <div className="card-grid">
        {scenarios.map(sc => (
          <div key={sc.id} className="scenario-card">
            <ActionButton
              variant="outline"
              onClick={() => setRevealed({ ...revealed, [sc.id]: true })}
            >
              {sc.title}
            </ActionButton>

            {revealed[sc.id] && (
              <div className="bank-response">
                {sc.bankResponse.split('\n').map((line, i) => <p key={i}>{line}</p>)}
              </div>
            )}
          </div>
        ))}
      </div>

      {allDone && (
        <>
          <p className="wrap-up">
            Every transaction goes through gatekeepers who can say "no."  
            Ownership is permissioned, not absolute.
          </p>
          <ActionButton onClick={onFinish}>Next: Money Experiments →</ActionButton>
        </>
      )}
    </div>
  );
};

export default ControlScenarios;
