import React, { useState } from 'react';
import { ActionButton } from './EnhancedButtons';
import './Introduction.css'; // Reuse the same styles
import MortgageQuiz from './MortgageQuiz';

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

const BankingReality = ({ onComplete }) => {
  const [phase, setPhase] = useState(0); // 0: intro, 1: ownership question, 2: mortgage question
  const [answer, setAnswer] = useState(null);
  const [stage, setStage] = useState(0); // for balance-sheet demo

  if (phase === 0) {
    return (
      <div className="intro-container">
        <h1 className="intro-headline">Banking Reality Check</h1>
        <p className="intro-tagline">
          Before we explore the payment system, let's understand some fundamental truths about how banks really work.
        </p>

        <div className="journey-preview">
          <h3>Two Eye-Opening Questions</h3>
          <p>We'll start with two simple questions that most people get wrong, but reveal the hidden reality of modern banking.</p>
          <p>These insights will completely change how you think about your money.</p>
        </div>

        <ActionButton onClick={() => setPhase(1)}>Start with Question 1 →</ActionButton>
      </div>
    );
  }

  if (phase === 1) {
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
                <ActionButton onClick={() => setPhase(2)}>
                  Got it — Question 2 →
                </ActionButton>
              </>
            )}
          </>
        )}
      </div>
    );
  }

  // Phase 2: Mortgage question
  return <MortgageQuiz onContinue={() => onComplete(6)} />;
};

export default BankingReality;
