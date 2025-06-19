import React, { useState } from 'react';
import { Shield, Key, Users, Lock, AlertTriangle, CheckCircle } from 'lucide-react';
import '../components/ModuleCommon.css';

const CustodyModule = () => {
  const [selectedScenario, setSelectedScenario] = useState(null);
  const [showSetupGuide, setShowSetupGuide] = useState(false);

  const custodyScenarios = [
    {
      id: 'personal',
      title: 'Personal Vault',
      icon: <Key size={24} />,
      description: 'Secure your own Bitcoin with different levels of protection',
      options: [
        {
          name: 'Hot Wallet',
          security: 'Basic',
          useCase: 'Daily spending, small amounts',
          risk: 'Connected to internet, more vulnerable'
        },
        {
          name: 'Cold Storage',
          security: 'High',
          useCase: 'Long-term savings, large amounts',
          risk: 'Requires careful backup management'
        },
        {
          name: '2-of-3 Multisig',
          security: 'Very High',
          useCase: 'Best of both worlds',
          risk: 'More complex setup required'
        }
      ]
    },
    {
      id: 'business',
      title: 'Business Treasury',
      icon: <Users size={24} />,
      description: 'Protect company funds with multiple stakeholders',
      options: [
        {
          name: '3-of-5 Board Members',
          security: 'Very High',
          useCase: 'Corporate treasury',
          risk: 'Coordination needed for spending'
        },
        {
          name: '2-of-3 Officers',
          security: 'High',
          useCase: 'Operational funds',
          risk: 'Balance between security and usability'
        },
        {
          name: 'Tiered Access',
          security: 'Custom',
          useCase: 'Different spending limits',
          risk: 'Complex policy management'
        }
      ]
    },
    {
      id: 'family',
      title: 'Family Security',
      icon: <Shield size={24} />,
      description: 'Protect family wealth across generations',
      options: [
        {
          name: 'Parent-Child Setup',
          security: 'High',
          useCase: 'Inheritance planning',
          risk: 'Requires trust and education'
        },
        {
          name: '3-of-4 Family Members',
          security: 'Very High',
          useCase: 'Shared family funds',
          risk: 'Need family coordination'
        },
        {
          name: 'Emergency Access',
          security: 'Balanced',
          useCase: 'Crisis situations',
          risk: 'Must define clear conditions'
        }
      ]
    }
  ];

  const setupSteps = {
    personal: [
      'Choose your preferred hardware wallet',
      'Generate keys in a secure environment',
      'Create backup of seed phrases',
      'Test recovery process',
      'Start with small amounts'
    ],
    business: [
      'Define access policies',
      'Select trusted key holders',
      'Setup hardware security modules',
      'Document emergency procedures',
      'Regular security audits'
    ],
    family: [
      'Family meeting to explain system',
      'Create clear access rules',
      'Setup secure key storage',
      'Practice emergency scenarios',
      'Regular system testing'
    ]
  };

  const handleScenarioSelect = (scenarioId) => {
    setSelectedScenario(scenarioId);
    setShowSetupGuide(false);
  };

  return (
    <div className="module-container">
      <div className="module-header">
        <h1 className="module-title">
          <Shield className="module-icon" />
          Protecting Your Bitcoin: A Guide to Custody
        </h1>
      </div>
      
      <div className="step-content-container">
        <div className="intro-step">
          <div className="step-icon">
            <Lock size={48} />
          </div>
          <h2>Welcome to Your Security Workshop!</h2>
          <p className="intro-text">
            Discover how to protect your Bitcoin using different security models. 
            Whether you're securing personal savings, business funds, or family wealth, 
            we'll help you find the right balance of security and accessibility.
          </p>
        </div>

        <div className="scenario-grid">
          {custodyScenarios.map((scenario) => (
            <div 
              key={scenario.id}
              className={`scenario-card ${selectedScenario === scenario.id ? 'active' : ''}`}
              onClick={() => handleScenarioSelect(scenario.id)}
            >
              <div className="scenario-header">
                {scenario.icon}
                <h3>{scenario.title}</h3>
              </div>
              <p>{scenario.description}</p>
              
              {selectedScenario === scenario.id && (
                <div className="security-options">
                  {scenario.options.map((option, index) => (
                    <div key={index} className="security-option">
                      <h4>{option.name}</h4>
                      <div className="option-details">
                        <span className="security-level">
                          <Shield size={16} />
                          Security: {option.security}
                        </span>
                        <span className="use-case">
                          <CheckCircle size={16} />
                          Best for: {option.useCase}
                        </span>
                        <span className="risk-level">
                          <AlertTriangle size={16} />
                          Consider: {option.risk}
                        </span>
                      </div>
                    </div>
                  ))}
                  
                  <button 
                    className="setup-guide-button"
                    onClick={() => setShowSetupGuide(true)}
                  >
                    Show Setup Guide
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {showSetupGuide && selectedScenario && (
          <div className="setup-guide">
            <h3>Setup Guide: {custodyScenarios.find(s => s.id === selectedScenario).title}</h3>
            <div className="setup-steps">
              {setupSteps[selectedScenario].map((step, index) => (
                <div key={index} className="setup-step">
                  <span className="step-number">{index + 1}</span>
                  <span className="step-text">{step}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="learning-tips">
          <h3>🔐 Security Best Practices</h3>
          <ul>
            <li>Never store your seed phrase digitally</li>
            <li>Test your backup and recovery process regularly</li>
            <li>Consider physical security as important as digital</li>
            <li>Don't share key details with anyone you don't trust</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CustodyModule; 