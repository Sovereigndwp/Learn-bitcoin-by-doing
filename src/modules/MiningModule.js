import React from 'react';
import { Pickaxe } from 'lucide-react';
import '../components/ModuleCommon.css';

const MiningModule = () => {
  return (
    <div className="module-container">
      <div className="module-header">
        <h1 className="module-title">
          <Pickaxe className="module-icon" />
          Mining Simulator
        </h1>
      </div>
      <div className="step-content-container">
        <div className="intro-step">
          <div className="step-icon">
            <Pickaxe size={48} />
          </div>
          <h2>Mining Simulator</h2>
          <p className="intro-text">
            Experience Bitcoin mining by finding valid hashes under a target difficulty.
          </p>
          <p style={{ opacity: 0.7, fontStyle: 'italic' }}>
            Coming soon! This module is under development.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MiningModule; 