import React from 'react';
import { ActionButton } from '../components/EnhancedButtons';

const DigitalScarcity = ({ onComplete }) => {
  return (
    <div className="module-container">
      <div className="section-card">
        <h1 className="heading-critical">Digital Scarcity</h1>
        <p>How Bitcoin solved the double-spend problem that makes digital money possible.</p>
      </div>

      <div className="card-feature">
        <div className="concept-explanation">
          <p>
            Copy–paste has always been the super-power of computers—which makes it
            impossible to keep a digital coin "rare." This is called the{' '}
            <strong>double-spend problem</strong>: the same file can be paid to two
            people at once.
          </p>

          <p>
            Bitcoin solved this in 2009 with <strong>Proof-of-Work</strong>. Miners
            burn energy to stamp each block with a hard-to-fake, easy-to-verify
            fingerprint. Every node can verify the stamp in milliseconds; any second
            copy of the coin is rejected automatically.
          </p>

          <blockquote className="concept-highlight">
            Proof-of-Work makes double-spending as futile as rewriting yesterday's
            newspaper—everyone can spot the forgery instantly.
          </blockquote>
        </div>

        <ActionButton onClick={() => onComplete(3)} variant="primary">
          Learn from History
        </ActionButton>
      </div>
    </div>
  );
};

export default DigitalScarcity;
