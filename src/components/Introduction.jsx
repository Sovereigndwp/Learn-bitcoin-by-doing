import React, { useState } from 'react';
import { ActionButton } from './EnhancedButtons';
import './Introduction.css';            // add this new css file

const BalanceSheet = ({ stage }) => {
  // stage 0 = just deposited, stage 1 = loan created
  return (
    <div className="balance-sheet">
      <div className="sheet-column">
        <h4>👤 You</h4>
        <table>
          <tbody>
            <tr><td>Bank IOU</td><td>$1 000</td></tr>
            {stage === 1 && <tr><td style={{opacity:.5}}>Cash</td><td style={{opacity:.5}}>$0</td></tr>}
          </tbody>
        </table>
      </div>

      <div className="sheet-column">
        <h4>🏦 Bank</h4>
        <table>
          <tbody>
            <tr><td>Liability: IOU to you</td><td>$1 000</td></tr>
            {stage === 0 && <tr><td>Asset: Cash</td><td>$1 000</td></tr>}
            {stage === 1 && (
              <>
                <tr><td>Asset: Mortgage loan</td><td>$800</td></tr>
                <tr><td>Asset: Cash reserve</td><td>$200</td></tr>
              </>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const Introduction = ({ onComplete }) => {
  const [page, setPage] = useState(0);
  const [answer, setAnswer] = useState(null);
  const [stage, setStage]  = useState(0);   // for balance-sheet demo

  /* ---------- PAGE 0 ---------- */
  if (page === 0) {
    return (
      <div className="intro-container">
        <h1 className="intro-headline">Money shapes everything</h1>
        <p className="intro-tagline">
          Yet almost no one taught us how it <em>really</em> works.<br/>Today that changes.
        </p>

        <ul className="intro-roadmap">
          <li><strong>Discover</strong> how money really works</li>
          <li><strong>Question</strong> every assumption</li>
          <li><strong>Decide</strong> for yourself</li>
        </ul>

        <ActionButton onClick={() => setPage(1)}>Start the journey →</ActionButton>
      </div>
    );
  }

  /* ---------- PAGE 1 ---------- */
  return (
    <div className="question-container">
      <h2 className="question-title">Who <u>owns</u> your $1 000 in the bank?</h2>

      {!answer && (
        <div className="option-grid">
          <ActionButton onClick={() => setAnswer('you')}  variant="outline">I do — it's my money</ActionButton>
          <ActionButton onClick={() => setAnswer('bank')} variant="outline">The bank does — they're holding it</ActionButton>
          <ActionButton onClick={() => setAnswer('both')} variant="outline">We both do — it's complicated</ActionButton>
        </div>
      )}

      {answer && (
        <>
          <p className="reveal-text">
            {answer === 'bank'
              ? '✅ Correct! A deposit is an unsecured loan. The bank is the legal owner.'
              : '❌ Not quite. Legally, the bank owns it — your deposit is just an IOU.'}
          </p>

          <BalanceSheet stage={stage} />

          {stage === 0 ? (
            <ActionButton onClick={() => setStage(1)} className="mt-4">
              See what the bank does with your money →
            </ActionButton>
          ) : (
            <>
              <p className="reveal-text small">
                The bank can lend, invest, or rehypothecate <em>your</em> $1 000 while you hold only a promise.  
                If the bank fails, you're just another creditor — that's why FDIC insurance exists.
              </p>
              <ActionButton onClick={() => onComplete(0)}>
                Got it — take me to the Barter Problem →
              </ActionButton>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Introduction;
