import React from 'react';
import { FileText } from 'lucide-react';
import '../components/ModuleCommon.css';

const ScriptsModule = () => {
  return (
    <div className="module-container">
      <div className="module-header">
        <h1 className="module-title">
          <FileText className="module-icon" />
          Script Explorer
        </h1>
      </div>
      <div className="step-content-container">
        <div className="intro-step">
          <div className="step-icon">
            <FileText size={48} />
          </div>
          <h2>Script Explorer</h2>
          <p className="intro-text">
            Explore Bitcoin scripts that handle spending rules and conditions.
          </p>
          <p style={{ opacity: 0.7, fontStyle: 'italic' }}>
            Coming soon! This module is under development.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ScriptsModule; 