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
      
      <div className="journey-preview">
        <h3>What You'll Learn</h3>
        <p>We'll start with the most fundamental question: Why does money exist at all? Then we'll explore how it evolved, what makes it work, and why the current system has problems.</p>
        <p>By the end, you'll have your own framework for evaluating any form of money.</p>
      </div>

      <ActionButton onClick={() => onComplete(0)}>Begin the Journey →</ActionButton>
    </div>
  );
};

export default Introduction;
