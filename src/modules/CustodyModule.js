import React from 'react';
import { Shield } from 'lucide-react';
import '../components/ModuleCommon.css';

const CustodyModule = () => {
  return (
    <div className="module-container">
      <div className="module-header">
        <h1 className="module-title">
          <Shield className="module-icon" />
          Custody & Multisig
        </h1>
      </div>
      <div className="step-content-container">
        <div className="intro-step">
          <div className="step-icon">
            <Shield size={48} />
          </div>
          <h2>Custody & Multisig</h2>
          <p className="intro-text">
            Learn multisig wallets and how to split custody power across multiple keys.
          </p>
          <p style={{ opacity: 0.7, fontStyle: 'italic' }}>
            Coming soon! This module is under development.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CustodyModule; 