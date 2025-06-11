import React from 'react';
import { Key } from 'lucide-react';
import '../components/ModuleCommon.css';

const KeysModule = () => {
  return (
    <div className="module-container">
      <div className="module-header">
        <h1 className="module-title">
          <Key className="module-icon" />
          Key Generation
        </h1>
      </div>
      <div className="step-content-container">
        <div className="intro-step">
          <div className="step-icon">
            <Key size={48} />
          </div>
          <h2>Key Generation</h2>
          <p className="intro-text">
            Learn to generate private keys, public keys, and Bitcoin addresses.
          </p>
          <p style={{ opacity: 0.7, fontStyle: 'italic' }}>
            Coming soon! This module is under development.
          </p>
        </div>
      </div>
    </div>
  );
};

export default KeysModule; 