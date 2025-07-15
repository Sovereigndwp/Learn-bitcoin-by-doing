import React, { useState, useEffect } from 'react';
import { useProgress } from '../contexts/ProgressContext';
import { 
  ContinueButton, 
  ActionButton, 
  OptionButton 
} from './EnhancedButtons';
import { ArrowRight, Lightbulb, Link2, CheckCircle, Brain, Target } from 'lucide-react';
import './ConnectionMoments.css';

const ConnectionMoments = ({ 
  currentModuleId, 
  onComplete, 
  onSkip,
  className = '' 
}) => {
  const { 
    completedModules, 
    getConnectionOpportunities, 
    recordConceptualInsight,
    connectionMap 
  } = useProgress();

  const [currentConnectionIndex, setCurrentConnectionIndex] = useState(0);
  const [userResponses, setUserResponses] = useState({});
  const [showInsight, setShowInsight] = useState(false);
  const [connectionStrength, setConnectionStrength] = useState(0);
  const [thinkingStrategy, setThinkingStrategy] = useState('');

  // Get available connections for this module
  const connectionOpportunities = getConnectionOpportunities(
    currentModuleId, 
    completedModules.filter(id => id !== currentModuleId)
  );

  // If no connections available, skip this component
  if (connectionOpportunities.length === 0) {
    useEffect(() => {
      onComplete({});
    }, [onComplete]);
    return null;
  }

  const currentConnection = connectionOpportunities[currentConnectionIndex];

  const handleConnectionResponse = (response, confidence = 'medium') => {
    const connectionId = `${currentConnection.fromModule}_to_${currentConnection.toModule}`;
    const newResponse = {
      response,
      confidence,
      strategy: thinkingStrategy,
      timestamp: Date.now()
    };

    setUserResponses(prev => ({
      ...prev,
      [connectionId]: newResponse
    }));

    // Calculate connection strength based on response quality and confidence
    let strength = 0;
    if (response.length > 50) strength += 20; // Detailed response
    if (confidence === 'high') strength += 30;
    else if (confidence === 'medium') strength += 20;
    else strength += 10;
    if (thinkingStrategy) strength += 10; // Metacognitive awareness

    setConnectionStrength(strength);
    setShowInsight(true);

    // Record the insight
    recordConceptualInsight(currentModuleId, 'connection', {
      fromModule: currentConnection.fromModule,
      concept: currentConnection.concept,
      userResponse: response,
      connectionStrength: strength
    });

    // Move to next connection or complete
    setTimeout(() => {
      if (currentConnectionIndex < connectionOpportunities.length - 1) {
        setCurrentConnectionIndex(currentConnectionIndex + 1);
        setShowInsight(false);
        setThinkingStrategy('');
        setConnectionStrength(0);
      } else {
        // Complete all connections
        onComplete(userResponses);
      }
    }, 3000);
  };

  const handleSkipConnection = () => {
    if (currentConnectionIndex < connectionOpportunities.length - 1) {
      setCurrentConnectionIndex(currentConnectionIndex + 1);
    } else {
      onComplete(userResponses);
    }
  };

  const handleSkipAll = () => {
    onSkip();
  };

  const getModuleName = (moduleId) => {
    const moduleNames = {
      'money': 'Money Fundamentals',
      'bitcoin-basics': 'Bitcoin Basics',
      'numbers': 'Number Systems',
      'hashing': 'Cryptographic Hashing',
      'mining': 'Bitcoin Mining',
      'keys': 'Keys & Addresses',
      'transactions': 'Transactions',
      'scripts': 'Bitcoin Scripts',
      'merkle': 'Merkle Trees',
      'custody': 'Custody & Security',
      'lightning': 'Lightning Network',
      'advanced-topics': 'Advanced Topics',
      'myths': 'Bitcoin Myths',
      'bitcoin-toolkit': 'Bitcoin Toolkit'
    };
    return moduleNames[moduleId] || moduleId;
  };

  return (
    <div className={`connection-moments ${className}`}>
      <div className="connection-header">
        <div className="connection-icon">
          <Link2 size={24} />
        </div>
        <h2>🧠 Connection Moment</h2>
        <p className="connection-subtitle">
          Let's connect what you just learned to your previous knowledge
        </p>
        
        {/* Progress indicator */}
        <div className="connection-progress">
          <span className="progress-text">
            Connection {currentConnectionIndex + 1} of {connectionOpportunities.length}
          </span>
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ 
                width: `${((currentConnectionIndex + 1) / connectionOpportunities.length) * 100}%` 
              }}
            />
          </div>
        </div>
      </div>

      <div className="connection-content">
        {/* Module connection visualization */}
        <div className="module-connection-visual">
          <div className="module-badge from">
            <span className="module-name">
              {getModuleName(currentConnection.fromModule)}
            </span>
          </div>
          <div className="connection-arrow">
            <ArrowRight size={20} />
          </div>
          <div className="module-badge to current">
            <span className="module-name">
              {getModuleName(currentConnection.toModule)}
            </span>
          </div>
        </div>

        {/* Connection question */}
        <div className="connection-question">
          <h3>
            <Brain size={20} />
            {currentConnection.question}
          </h3>
          
          {/* Metacognitive prompt */}
          <div className="thinking-strategy-prompt">
            <label htmlFor="thinking-strategy">
              <Target size={16} />
              What thinking approach will you use?
            </label>
            <select 
              id="thinking-strategy"
              value={thinkingStrategy}
              onChange={(e) => setThinkingStrategy(e.target.value)}
              className="strategy-selector"
            >
              <option value="">Choose your strategy...</option>
              <option value="analogy">Look for similarities/analogies</option>
              <option value="cause-effect">Trace cause and effect relationships</option>
              <option value="compare-contrast">Compare and contrast concepts</option>
              <option value="first-principles">Break down to fundamentals</option>
              <option value="system-thinking">See how parts work together</option>
            </select>
          </div>

          {/* Response area */}
          <div className="connection-response">
            <textarea
              placeholder="Share your thoughts on how these concepts connect..."
              className="connection-input"
              rows={4}
              onChange={(e) => {
                // Auto-save draft
                setUserResponses(prev => ({
                  ...prev,
                  [`${currentConnection.fromModule}_to_${currentConnection.toModule}_draft`]: e.target.value
                }));
              }}
            />
            
            {/* Confidence level */}
            <div className="confidence-level">
              <span className="confidence-label">How confident are you in this connection?</span>
              <div className="confidence-options">
                <OptionButton
                  onClick={() => handleConnectionResponse(
                    userResponses[`${currentConnection.fromModule}_to_${currentConnection.toModule}_draft`] || '',
                    'low'
                  )}
                  variant="secondary"
                  size="small"
                >
                  🤔 Still figuring it out
                </OptionButton>
                <OptionButton
                  onClick={() => handleConnectionResponse(
                    userResponses[`${currentConnection.fromModule}_to_${currentConnection.toModule}_draft`] || '',
                    'medium'
                  )}
                  variant="primary"
                  size="small"
                >
                  💡 I see the connection
                </OptionButton>
                <OptionButton
                  onClick={() => handleConnectionResponse(
                    userResponses[`${currentConnection.fromModule}_to_${currentConnection.toModule}_draft`] || '',
                    'high'
                  )}
                  variant="success"
                  size="small"
                >
                  🎯 Crystal clear!
                </OptionButton>
              </div>
            </div>
          </div>
        </div>

        {/* Expert insight reveal */}
        {showInsight && (
          <div className="expert-insight">
            <div className="insight-header">
              <Lightbulb size={20} />
              <h4>Expert Insight</h4>
              <div className="connection-strength">
                <span>Connection Strength: {connectionStrength}%</span>
                <div className="strength-bar">
                  <div 
                    className="strength-fill"
                    style={{ width: `${connectionStrength}%` }}
                  />
                </div>
              </div>
            </div>
            <div className="insight-content">
              <p><strong>Concept:</strong> {currentConnection.concept}</p>
              <p><strong>Key Insight:</strong> {currentConnection.insight}</p>
              
              {connectionStrength >= 60 && (
                <div className="mastery-note">
                  <CheckCircle size={16} />
                  <span>Strong conceptual connection! This kind of thinking builds deep understanding.</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Action buttons */}
        <div className="connection-actions">
          {!showInsight && (
            <>
              <ActionButton
                onClick={handleSkipConnection}
                variant="secondary"
                size="small"
              >
                Skip This Connection
              </ActionButton>
              
              <ActionButton
                onClick={handleSkipAll}
                variant="outline"
                size="small"
              >
                Skip All Connections
              </ActionButton>
            </>
          )}
          
          {showInsight && (
            <div className="next-indication">
              <span>Moving to next connection...</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConnectionMoments; 