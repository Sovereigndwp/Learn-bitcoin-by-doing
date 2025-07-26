import React, { useState } from 'react';
import { ActionButton } from '../components/EnhancedButtons';
import { Play, Square } from 'lucide-react';
import './ProofOfWorkDemo.css';

// Simple hash function for demo purposes
const simpleHash = (data) => {
  let hash = 0;
  for (let i = 0; i < data.length; i++) {
    const char = data.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash).toString(16).padStart(8, '0');
};

const ProofOfWorkDemo = ({ onFinish }) => {
  const [miningData, setMiningData] = useState('Bitcoin Block #1');
  const [targetZeros, setTargetZeros] = useState(3);
  const [nonce, setNonce] = useState(0);
  const [currentHash, setCurrentHash] = useState('');
  const [isMining, setIsMining] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [found, setFound] = useState(false);

  const mineBlock = async () => {
    setIsMining(true);
    setAttempts(0);
    setFound(false);
    let currentNonce = 0;
    let hash = '';
    const target = '0'.repeat(targetZeros);

    while (currentNonce < 100000) { // Safety limit for demo
      const data = `${miningData}${currentNonce}`;
      hash = simpleHash(data);
      
      setCurrentHash(hash);
      setNonce(currentNonce);
      setAttempts(prev => prev + 1);

      if (hash.startsWith(target)) {
        setIsMining(false);
        setFound(true);
        break;
      }

      currentNonce++;
      
      // Add delay to visualize the process
      if (currentNonce % 50 === 0) {
        await new Promise(resolve => setTimeout(resolve, 10));
      }
    }

    if (currentNonce >= 100000) {
      setIsMining(false);
    }
  };

  const stopMining = () => {
    setIsMining(false);
  };

  const reset = () => {
    setNonce(0);
    setCurrentHash('');
    setAttempts(0);
    setFound(false);
    setIsMining(false);
  };

  return (
    <div className="card pow-container">
      <h2>⛏️ Proof-of-Work: Digital Mining</h2>
      <p>Find a number that makes the hash start with {targetZeros} zeros</p>

      <div className="mining-controls">
        <div className="control-group">
          <label>Block Data:</label>
          <input
            type="text"
            value={miningData}
            onChange={(e) => setMiningData(e.target.value)}
            disabled={isMining}
            className="mining-input"
          />
        </div>
        
        <div className="control-group">
          <label>Difficulty (zeros):</label>
          <input
            type="number"
            value={targetZeros}
            onChange={(e) => setTargetZeros(Math.max(1, Math.min(6, parseInt(e.target.value) || 1)))}
            disabled={isMining}
            min="1"
            max="6"
            className="difficulty-input"
          />
        </div>
      </div>

      <div className="mining-display">
        <div className="mining-info">
          <p><strong>Current Data:</strong> {miningData}{nonce}</p>
          <p><strong>Current Hash:</strong> <code>{currentHash || 'Not calculated yet'}</code></p>
          <p><strong>Nonce:</strong> {nonce.toLocaleString()}</p>
          <p><strong>Attempts:</strong> {attempts.toLocaleString()}</p>
        </div>

        {found && (
          <div className="success-message">
            ✅ Block mined! Hash starts with {targetZeros} zeros.
            <br />
            <em>This required {attempts.toLocaleString()} attempts and real energy!</em>
          </div>
        )}
      </div>

      <div className="mining-actions">
        {!isMining && !found && (
          <ActionButton onClick={mineBlock}>
            <Play className="w-4 h-4" /> Start Mining
          </ActionButton>
        )}

        {isMining && (
          <ActionButton onClick={stopMining} variant="secondary">
            <Square className="w-4 h-4" /> Stop Mining
          </ActionButton>
        )}

        {found && (
          <>
            <ActionButton onClick={reset} variant="secondary">
              Mine Another Block
            </ActionButton>
            <ActionButton onClick={onFinish}>
              Continue: Apply Scorecard →
            </ActionButton>
          </>
        )}
      </div>

      {!found && (
        <div className="pow-explanation">
          <p className="pow-insight">
            Notice: Each attempt requires computation (energy).<br/>
            Bitcoin's security comes from this energy cost - no shortcuts exist!
          </p>
        </div>
      )}
    </div>
  );
};

export default ProofOfWorkDemo;
