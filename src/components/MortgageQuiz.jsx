import React, { useState } from 'react';
import { ActionButton } from './EnhancedButtons';
import './MortgageQuiz.css';

const Sheet = ({ stage }) => (
  <div className="mortgage-sheet">
    <div className="col">
      <h4>👤 Home-buyer</h4>
      <table><tbody>
        <tr><td>House</td><td>$200 000</td></tr>
        <tr><td>Mortgage debt</td><td>- $200 000</td></tr>
      </tbody></table>
    </div>
    <div className="col">
      <h4>🏦 Bank</h4>
      <table><tbody>
        {stage === 0 && (
          <>
            <tr><td>Assets</td><td>–</td></tr>
            <tr><td>Liabilities</td><td>–</td></tr>
          </>
        )}
        {stage === 1 && (
          <>
            <tr><td>Asset: Your IOU</td><td>$200 000</td></tr>
            <tr><td>Liability: Deposit</td><td>$200 000</td></tr>
          </>
        )}
      </tbody></table>
    </div>
  </div>
);

const MortgageQuiz = ({ onContinue }) => {
  const [answer, setAnswer] = useState(null);
  const [stage,  setStage]  = useState(0);

  return (
    <div className="mortgage-container">
      <h2 className="quiz-title">The $200 000 Mortgage Mystery</h2>
      <p>You're approved for a $200 000 home loan.  
         Where does the bank get that money?</p>

      {!answer && (
        <div className="option-grid">
          <ActionButton onClick={() => setAnswer('deposits')} variant="outline">
            From other customers' deposits
          </ActionButton>
          <ActionButton onClick={() => setAnswer('reserves')} variant="outline">
            From its cash reserves
          </ActionButton>
          <ActionButton onClick={() => setAnswer('thin-air')} variant="outline">
            ✨ They create it out of thin air
          </ActionButton>
          <ActionButton onClick={() => setAnswer('gov')} variant="outline">
            Borrow it from the government
          </ActionButton>
        </div>
      )}

      {answer && (
        <>
          <p className="reveal-text">
            {answer === 'thin-air'
              ? '✅ Correct! Commercial banks create brand-new deposits when they issue loans.'
              : '❌ Not quite. The bank simply types a new deposit into existence.'}
          </p>

          <Sheet stage={stage} />

          {stage === 0 ? (
            <ActionButton onClick={() => setStage(1)}>
              Watch the balance-sheet update →
            </ActionButton>
          ) : (
            <>
              <p className="reveal-text small">
                97% of the money supply is born this way—no vault, no transfer, just keystrokes.<br/>
                <strong>Key link:</strong> if creating money is this cheap, how can it be a reliable <em>Store of Value</em>?
              </p>
              <ActionButton onClick={onContinue}>
                Got it — next lesson →
              </ActionButton>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default MortgageQuiz;
