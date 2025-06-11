import React from 'react';
import { Hash } from 'lucide-react';
import '../components/ModuleCommon.css';

const HashingModule = () => {
  return (
    <div className="module-container">
      <div className="module-header">
        <h1 className="module-title">
          <Hash className="module-icon" />
          Hashing Module
        </h1>
      </div>
      <div className="step-content-container">
        <div className="intro-step">
          <div className="step-icon">
            <Hash size={48} />
          </div>
          <h2>Hashing Module</h2>
          <p className="intro-text">
            This module will teach you about Bitcoin's hashing mechanisms, including SHA-256 and double-SHA256.
          </p>
          <p style={{ opacity: 0.7, fontStyle: 'italic' }}>
            Coming soon! This module is under development.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HashingModule; 