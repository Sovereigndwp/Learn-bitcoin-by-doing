import React from 'react';
import { GitBranch } from 'lucide-react';
import '../components/ModuleCommon.css';

const MerkleModule = () => {
  return (
    <div className="module-container">
      <div className="module-header">
        <h1 className="module-title">
          <GitBranch className="module-icon" />
          Merkle Trees
        </h1>
      </div>
      <div className="step-content-container">
        <div className="intro-step">
          <div className="step-icon">
            <GitBranch size={48} />
          </div>
          <h2>Merkle Trees</h2>
          <p className="intro-text">
            Understand merkle trees and how they enable efficient transaction verification.
          </p>
          <p style={{ opacity: 0.7, fontStyle: 'italic' }}>
            Coming soon! This module is under development.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MerkleModule; 