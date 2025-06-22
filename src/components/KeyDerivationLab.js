import React, { useState } from 'react';
import { Key, Lock, ArrowRight, RefreshCw, Copy, CheckCircle } from 'lucide-react';
import './KeyDerivationLab.css';

const KeyDerivationLab = ({ onComplete }) => {
  const [privateKey, setPrivateKey] = useState('');
  const [publicKey, setPublicKey] = useState('');
  const [isCompressed, setIsCompressed] = useState(true);
  const [showingAnimation, setShowingAnimation] = useState(false);
  const [copiedKey, setCopiedKey] = useState(null);

  // Mock key generation (replace with actual bitcoinjs-lib in production)
  const generateKeyPair = () => {
    setShowingAnimation(true);
    // Simulate key generation delay
    setTimeout(() => {
      const mockPrivateKey = Array(64).fill(0)
        .map(() => Math.floor(Math.random() * 16).toString(16))
        .join('');
      
      const mockPublicKey = isCompressed
        ? '02' + Array(64).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('')
        : '04' + Array(128).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('');
      
      setPrivateKey(mockPrivateKey);
      setPublicKey(mockPublicKey);
      setShowingAnimation(false);
    }, 1500);
  };

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(type);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleCompressionToggle = () => {
    setIsCompressed(!isCompressed);
    if (privateKey) {
      // Recalculate public key with new compression setting
      const mockPublicKey = !isCompressed
        ? '02' + Array(64).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('')
        : '04' + Array(128).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('');
      setPublicKey(mockPublicKey);
    }
  };

  return (
    <div className="key-derivation-lab">
      <div className="key-generation-section">
        <button 
          className="generate-button"
          onClick={generateKeyPair}
          disabled={showingAnimation}
        >
          <RefreshCw className={showingAnimation ? 'spinning' : ''} size={16} />
          Generate New Key Pair
        </button>

        <div className="compression-toggle">
          <label className="toggle-label">
            <input
              type="checkbox"
              checked={isCompressed}
              onChange={handleCompressionToggle}
              disabled={!privateKey}
            />
            Use Compressed Public Key
          </label>
          <div className="compression-info">
            <p>Compressed keys save blockchain space while providing the same security.</p>
          </div>
        </div>
      </div>

      <div className="key-visualization">
        <div className="key-box private-key">
          <div className="key-header">
            <Key size={20} />
            <h3>Private Key</h3>
            {privateKey && (
              <button 
                className="copy-button"
                onClick={() => copyToClipboard(privateKey, 'private')}
              >
                {copiedKey === 'private' ? <CheckCircle size={16} /> : <Copy size={16} />}
              </button>
            )}
          </div>
          <div className="key-content">
            {privateKey ? (
              <code className="key-text">{privateKey}</code>
            ) : (
              <p className="placeholder-text">Generate a key pair to see your private key</p>
            )}
          </div>
          <div className="key-info">
            <p>256-bit random number that must be kept secret</p>
          </div>
        </div>

        <div className="derivation-arrow">
          <ArrowRight size={24} />
          <p>One-way function</p>
        </div>

        <div className="key-box public-key">
          <div className="key-header">
            <Lock size={20} />
            <h3>Public Key</h3>
            {publicKey && (
              <button 
                className="copy-button"
                onClick={() => copyToClipboard(publicKey, 'public')}
              >
                {copiedKey === 'public' ? <CheckCircle size={16} /> : <Copy size={16} />}
              </button>
            )}
          </div>
          <div className="key-content">
            {publicKey ? (
              <code className="key-text">{publicKey}</code>
            ) : (
              <p className="placeholder-text">Your public key will appear here</p>
            )}
          </div>
          <div className="key-info">
            <p>{isCompressed ? '33-byte compressed' : '65-byte uncompressed'} public key</p>
          </div>
        </div>
      </div>

      <div className="key-facts">
        <h3>🔑 Key Facts:</h3>
        <ul>
          <li>Private keys are random 256-bit numbers (shown as 64 hex characters)</li>
          <li>Public keys are derived using elliptic curve multiplication (secp256k1)</li>
          <li>The derivation process is one-way - you can't reverse it to find the private key</li>
          <li>Compressed public keys start with 02 or 03, uncompressed with 04</li>
        </ul>
      </div>

      <div className="verification-quiz">
        <h3>Quick Check:</h3>
        <div className="quiz-question">
          <p>Can you derive a private key from a public key?</p>
          <div className="quiz-options">
            <button 
              className="quiz-option"
              onClick={() => alert("Incorrect! The derivation process is one-way. It's mathematically impossible to derive the private key from the public key.")}
            >
              Yes
            </button>
            <button 
              className="quiz-option correct"
              onClick={() => {
                alert("Correct! This one-way property is crucial for Bitcoin's security.");
                onComplete();
              }}
            >
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KeyDerivationLab; 