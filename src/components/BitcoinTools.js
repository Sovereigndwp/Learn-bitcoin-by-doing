import React, { useState } from 'react';
import { Hash, Copy, CheckCircle, RefreshCw } from 'lucide-react';
import * as bitcoin from 'bitcoinjs-lib';
import * as ecc from 'tiny-secp256k1';
import { createHash } from 'crypto-browserify';
import './BitcoinTools.css';

bitcoin.initEccLib(ecc);

const BitcoinTools = () => {
  const [activeTab, setActiveTab] = useState('address');
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [copied, setCopied] = useState(false);
  const [walletType, setWalletType] = useState('modern');

  const generateNewWallet = () => {
    try {
      const network = bitcoin.networks.bitcoin;
      const keyPair = bitcoin.ECPair.makeRandom();
      const { address } = bitcoin.payments.p2wpkh({ 
        pubkey: keyPair.publicKey,
        network 
      });

      setResult(`
Your Bitcoin Wallet Details:

📬 Address: ${address}
(This is like your email address - share it to receive bitcoin)

🔑 Private Key: ${keyPair.toWIF()}
(This is like your password - keep it secret and safe!)

⚠️ Important: Write down your private key and keep it somewhere safe.
If you lose it, you'll lose access to your bitcoin forever!
      `);
    } catch (error) {
      setResult('Sorry, something went wrong. Please try again.');
    }
  };

  const verifyAddress = () => {
    try {
      let isValid = false;
      let type = '';

      if (input.startsWith('1')) {
        isValid = true;
        type = 'Legacy address (older type, starts with 1)';
      } else if (input.startsWith('3')) {
        isValid = true;
        type = 'SegWit address (newer type, starts with 3)';
      } else if (input.startsWith('bc1')) {
        isValid = true;
        type = 'Native SegWit address (newest type, starts with bc1)';
      }

      if (isValid) {
        setResult(`
✅ This looks like a valid Bitcoin address!

Type: ${type}

Tips:
• Always double-check addresses before sending bitcoin
• Different address types have different fees
• Newer address types (starting with bc1) usually have lower fees
        `);
      } else {
        setResult(`
❌ This doesn't look like a valid Bitcoin address.

A Bitcoin address should:
• Start with 1, 3, or bc1
• Be between 26-87 characters long
• Only contain letters and numbers

Try checking for typos!
        `);
      }
    } catch (error) {
      setResult('Sorry, something went wrong. Please try again.');
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bitcoin-tools">
      <div className="tool-tabs">
        <button 
          className={`tab ${activeTab === 'address' ? 'active' : ''}`}
          onClick={() => setActiveTab('address')}
        >
          Create Wallet
        </button>
        <button 
          className={`tab ${activeTab === 'verify' ? 'active' : ''}`}
          onClick={() => setActiveTab('verify')}
        >
          Check Address
        </button>
      </div>

      <div className="tool-content">
        {activeTab === 'address' ? (
          <div className="wallet-generator">
            <div className="wallet-type-selector">
              <label>Choose your wallet type:</label>
              <select value={walletType} onChange={(e) => setWalletType(e.target.value)}>
                <option value="modern">Modern Wallet (recommended)</option>
                <option value="legacy">Legacy Wallet (older type)</option>
              </select>
            </div>
            <button className="action-button" onClick={generateNewWallet}>
              <RefreshCw size={16} /> Create New Wallet
            </button>
          </div>
        ) : (
          <div className="address-verifier">
            <p className="helper-text">
              Paste a Bitcoin address to check if it's valid
            </p>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste Bitcoin address here..."
              className="input-field"
            />
            <button className="action-button" onClick={verifyAddress}>
              <Hash size={16} /> Check Address
            </button>
          </div>
        )}

        {result && (
          <div className="result-section">
            <div className="result-header">
              <button 
                className="copy-button"
                onClick={() => copyToClipboard(result)}
              >
                {copied ? <CheckCircle size={16} /> : <Copy size={16} />}
              </button>
            </div>
            <pre className="result-text">{result}</pre>
          </div>
        )}

        <div className="helpful-tips">
          <h3>💡 Quick Tips:</h3>
          <ul>
            <li>A Bitcoin wallet is like a digital piggy bank - it holds your bitcoin safely</li>
            <li>Your address is public (like your email) - share it to receive bitcoin</li>
            <li>Your private key is secret (like your password) - never share it!</li>
            <li>Write down your private key and keep it somewhere safe</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BitcoinTools; 