import React, { useState, useEffect } from 'react';
import { Hash, Copy, CheckCircle, ArrowDown } from 'lucide-react';
import './AddressCreationLab.css';

const AddressCreationLab = ({ onComplete }) => {
  const [publicKey, setPublicKey] = useState('');
  const [addresses, setAddresses] = useState({
    p2pkh: '',
    bech32: ''
  });
  const [showingSteps, setShowingSteps] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState(null);
  const [selectedFormat, setSelectedFormat] = useState('p2pkh');

  // Mock address generation (replace with actual bitcoinjs-lib in production)
  const generateAddresses = (pubKey) => {
    // Simulate address generation with realistic prefixes
    const mockP2PKH = '1' + Array(33).fill(0)
      .map(() => '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'[
        Math.floor(Math.random() * 58)
      ]).join('');
    
    const mockBech32 = 'bc1' + Array(39).fill(0)
      .map(() => '023456789acdefghjklmnpqrstuvwxyz'[
        Math.floor(Math.random() * 29)
      ]).join('');

    setAddresses({
      p2pkh: mockP2PKH,
      bech32: mockBech32
    });
  };

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopiedAddress(type);
    setTimeout(() => setCopiedAddress(null), 2000);
  };

  // Mock public key generation
  const generateNewPublicKey = () => {
    const mockPubKey = '02' + Array(64).fill(0)
      .map(() => Math.floor(Math.random() * 16).toString(16))
      .join('');
    setPublicKey(mockPubKey);
    setShowingSteps(true);
    setTimeout(() => generateAddresses(mockPubKey), 1000);
  };

  return (
    <div className="address-creation-lab">
      <div className="pubkey-input-section">
        <button 
          className="generate-button"
          onClick={generateNewPublicKey}
        >
          Generate New Public Key
        </button>
        
        <div className="pubkey-display">
          <h3>Public Key:</h3>
          <code>{publicKey || 'Click generate to start'}</code>
        </div>
      </div>

      <div className="address-format-selector">
        <button 
          className={`format-button ${selectedFormat === 'p2pkh' ? 'active' : ''}`}
          onClick={() => setSelectedFormat('p2pkh')}
        >
          Legacy Address (P2PKH)
        </button>
        <button 
          className={`format-button ${selectedFormat === 'bech32' ? 'active' : ''}`}
          onClick={() => setSelectedFormat('bech32')}
        >
          Native SegWit (Bech32)
        </button>
      </div>

      {showingSteps && (
        <div className="conversion-steps">
          {selectedFormat === 'p2pkh' ? (
            <>
              <div className="step">
                <h4>Step 1: SHA-256 Hash</h4>
                <div className="step-content">
                  <Hash size={16} />
                  <code>SHA-256(Public Key)</code>
                </div>
              </div>
              <ArrowDown size={20} className="step-arrow" />
              <div className="step">
                <h4>Step 2: RIPEMD160 Hash</h4>
                <div className="step-content">
                  <Hash size={16} />
                  <code>RIPEMD160(Previous Hash)</code>
                </div>
              </div>
              <ArrowDown size={20} className="step-arrow" />
              <div className="step">
                <h4>Step 3: Add Version Byte</h4>
                <div className="step-content">
                  <code>0x00 + Hash</code>
                </div>
              </div>
              <ArrowDown size={20} className="step-arrow" />
              <div className="step">
                <h4>Step 4: Double SHA-256 Checksum</h4>
                <div className="step-content">
                  <code>First 4 bytes of SHA-256(SHA-256())</code>
                </div>
              </div>
              <ArrowDown size={20} className="step-arrow" />
              <div className="step">
                <h4>Final Step: Base58 Encode</h4>
                <div className="step-content">
                  <code>Base58Check(Version + Hash + Checksum)</code>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="step">
                <h4>Step 1: SHA-256 + RIPEMD160</h4>
                <div className="step-content">
                  <Hash size={16} />
                  <code>RIPEMD160(SHA-256(Public Key))</code>
                </div>
              </div>
              <ArrowDown size={20} className="step-arrow" />
              <div className="step">
                <h4>Step 2: Add Witness Version</h4>
                <div className="step-content">
                  <code>0x00 + 20-byte Hash</code>
                </div>
              </div>
              <ArrowDown size={20} className="step-arrow" />
              <div className="step">
                <h4>Step 3: Bech32 Encode</h4>
                <div className="step-content">
                  <code>bech32('bc', Witness Program)</code>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      <div className="result-section">
        <div className="address-box">
          <div className="address-header">
            <h3>{selectedFormat === 'p2pkh' ? 'Legacy Address' : 'Native SegWit Address'}</h3>
            {addresses[selectedFormat] && (
              <button 
                className="copy-button"
                onClick={() => copyToClipboard(addresses[selectedFormat], selectedFormat)}
              >
                {copiedAddress === selectedFormat ? <CheckCircle size={16} /> : <Copy size={16} />}
              </button>
            )}
          </div>
          <div className="address-content">
            <code>{addresses[selectedFormat] || 'Address will appear here'}</code>
          </div>
          <div className="address-info">
            <p>
              {selectedFormat === 'p2pkh' 
                ? 'Legacy addresses start with "1" and are compatible with all wallets.' 
                : 'Native SegWit addresses start with "bc1" and offer lower fees.'}
            </p>
          </div>
        </div>
      </div>

      <div className="address-facts">
        <h3>📝 Address Facts:</h3>
        <ul>
          <li>Bitcoin addresses are not accounts - they are one-time payment destinations</li>
          <li>Addresses are hashed public keys with error detection built in</li>
          <li>Different address formats offer different features and fee structures</li>
          <li>You can generate unlimited addresses from one public key</li>
        </ul>
      </div>

      <div className="verification-section">
        <button 
          className="verify-button"
          onClick={() => {
            if (addresses.p2pkh && addresses.bech32) {
              onComplete();
            }
          }}
          disabled={!addresses.p2pkh || !addresses.bech32}
        >
          I Understand Address Creation
        </button>
      </div>
    </div>
  );
};

export default AddressCreationLab; 