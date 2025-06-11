import React from 'react';
import { ArrowLeftRight } from 'lucide-react';
import '../components/ModuleCommon.css';

const TransactionsModule = () => {
  return (
    <div className="module-container">
      <div className="module-header">
        <h1 className="module-title">
          <ArrowLeftRight className="module-icon" />
          Building Transactions
        </h1>
      </div>
      <div className="step-content-container">
        <div className="intro-step">
          <div className="step-icon">
            <ArrowLeftRight size={48} />
          </div>
          <h2>Building Transactions</h2>
          <p className="intro-text">
            Build Bitcoin transactions that move coins between addresses.
          </p>
          <p style={{ opacity: 0.7, fontStyle: 'italic' }}>
            Coming soon! This module is under development.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TransactionsModule; 