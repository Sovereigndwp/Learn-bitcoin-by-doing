import React, { useState } from 'react';
import { ActionButton } from '../components/EnhancedButtons';

const DigitalScarcity = ({ onComplete }) => {
  // Traditional money demo state
  const [emailState, setEmailState] = useState({
    aliceBalance: 50,
    bobReceived: 0,
    charlieReceived: 0,
    hasAttemptedDoubleSpend: false
  });

  // Bitcoin demo state
  const [bitcoinState, setBitcoinState] = useState({
    aliceBalance: 1.0,
    bobReceived: 0,
    charlieReceived: 0,
    pendingTransactions: [],
    hasAttemptedDoubleSpend: false,
    networkMessage: 'Ready to process transactions'
  });

  const simulateEmailDoubleSpend = () => {
    setEmailState({
      aliceBalance: 50, // Balance doesn't change - she just copied!
      bobReceived: 50,
      charlieReceived: 50,
      hasAttemptedDoubleSpend: true
    });
  };

  const simulateBitcoinDoubleSpend = () => {
    setBitcoinState(prev => ({
      ...prev,
      pendingTransactions: [
        { to: 'Bob', amount: 0.5, status: 'pending' },
        { to: 'Charlie', amount: 0.5, status: 'pending' }
      ],
      hasAttemptedDoubleSpend: true,
      networkMessage: 'Double spend detected! Only one transaction can be confirmed.'
    }));
  };

  const mineBlock = () => {
    // Randomly choose which transaction gets confirmed (first one wins)
    const confirmedTx = bitcoinState.pendingTransactions[0];
    
    setBitcoinState(prev => ({
      ...prev,
      aliceBalance: prev.aliceBalance - confirmedTx.amount,
      bobReceived: confirmedTx.to === 'Bob' ? confirmedTx.amount : 0,
      charlieReceived: confirmedTx.to === 'Charlie' ? confirmedTx.amount : 0,
      pendingTransactions: [],
      networkMessage: `Transaction to ${confirmedTx.to} confirmed. Other transaction rejected as double spend.`
    }));
  };

  const resetEmailDemo = () => {
    setEmailState({
      aliceBalance: 50,
      bobReceived: 0,
      charlieReceived: 0,
      hasAttemptedDoubleSpend: false
    });
  };

  const resetBitcoinDemo = () => {
    setBitcoinState({
      aliceBalance: 1.0,
      bobReceived: 0,
      charlieReceived: 0,
      pendingTransactions: [],
      hasAttemptedDoubleSpend: false,
      networkMessage: 'Ready to process transactions'
    });
  };

  return (
    <div className="module-container">
      <div className="section-card">
        <h1 className="heading-critical">Digital Scarcity</h1>
        <p>How Bitcoin solved the double-spend problem that makes digital money possible.</p>
      </div>

      <div className="card-feature">
        <div className="concept-explanation">
          <p>
            Copy–paste has always been the super-power of computers—which makes it
            impossible to keep a digital coin "rare." This is called the{' '}
            <strong>double-spend problem</strong>: the same file can be paid to two
            people at once.
          </p>

          <div className="demo-container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', margin: '20px 0' }}>
            {/* Traditional Money Demo */}
            <div className="demo-frame" style={{ border: '2px solid #555', borderRadius: '10px', padding: '20px', backgroundColor: '#2c2c2c', color: 'white' }}>
              <h3 style={{ color: 'white', marginBottom: '15px' }}>📧 Traditional Digital Money</h3>
              
              <div className="actors">
                <div className="actor" style={{ margin: '10px 0', padding: '10px', backgroundColor: '#404040', borderRadius: '5px', color: 'white' }}>
                  <strong>👩‍💼 Alice:</strong> ${emailState.aliceBalance}
                  <div style={{ fontSize: '0.9em', color: '#ccc' }}>
                    {emailState.hasAttemptedDoubleSpend ? 'Sent same money to both! 😈' : 'Ready to send money'}
                  </div>
                </div>
                
                <div className="actor" style={{ margin: '10px 0', padding: '10px', backgroundColor: emailState.bobReceived > 0 ? '#4a5d4a' : '#404040', borderRadius: '5px', color: 'white' }}>
                  <strong>👨‍💻 Bob:</strong> ${emailState.bobReceived}
                  <div style={{ fontSize: '0.9em', color: '#ccc' }}>
                    {emailState.bobReceived > 0 ? 'Payment received! ✅' : 'Waiting for payment'}
                  </div>
                </div>
                
                <div className="actor" style={{ margin: '10px 0', padding: '10px', backgroundColor: emailState.charlieReceived > 0 ? '#4a5d4a' : '#404040', borderRadius: '5px', color: 'white' }}>
                  <strong>👨‍🔧 Charlie:</strong> ${emailState.charlieReceived}
                  <div style={{ fontSize: '0.9em', color: '#ccc' }}>
                    {emailState.charlieReceived > 0 ? 'Payment received! ✅' : 'Waiting for payment'}
                  </div>
                </div>
              </div>
              
              <div style={{ textAlign: 'center', marginTop: '15px' }}>
                <button 
                  onClick={simulateEmailDoubleSpend}
                  disabled={emailState.hasAttemptedDoubleSpend}
                  style={{ 
                    padding: '8px 16px', 
                    backgroundColor: '#e74c3c', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '5px', 
                    cursor: emailState.hasAttemptedDoubleSpend ? 'not-allowed' : 'pointer',
                    opacity: emailState.hasAttemptedDoubleSpend ? 0.5 : 1,
                    marginRight: '10px'
                  }}
                >
                  Send $50 to Both
                </button>
                <button 
                  onClick={resetEmailDemo}
                  style={{ 
                    padding: '8px 16px', 
                    backgroundColor: '#6c757d', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '5px', 
                    cursor: 'pointer'
                  }}
                >
                  Reset
                </button>
              </div>
              
              {emailState.hasAttemptedDoubleSpend && (
                <div style={{ 
                  marginTop: '15px', 
                  padding: '10px', 
                  backgroundColor: '#5a2d2d', 
                  borderRadius: '5px', 
                  border: '1px solid #8b4a4a',
                  fontSize: '0.9em',
                  color: 'white'
                }}>
                  🚨 <strong>Problem:</strong> Alice spent $100 but only had $50 - Double spend successful!
                </div>
              )}
            </div>

            {/* Bitcoin Demo */}
            <div className="demo-frame" style={{ border: '2px solid #666', borderRadius: '10px', padding: '20px', backgroundColor: '#3a3a3a', color: 'white' }}>
              <h3 style={{ color: 'white', marginBottom: '15px' }}>₿ Bitcoin Solution</h3>
              
              <div className="actors">
                <div className="actor" style={{ margin: '10px 0', padding: '10px', backgroundColor: '#4a4a4a', borderRadius: '5px', color: 'white' }}>
                  <strong>👩‍💼 Alice:</strong> ₿{bitcoinState.aliceBalance.toFixed(1)}
                  <div style={{ fontSize: '0.9em', color: '#ccc' }}>
                    {bitcoinState.hasAttemptedDoubleSpend ? 'Attempted double spend...' : 'Ready to send Bitcoin'}
                  </div>
                </div>
                
                <div className="actor" style={{ margin: '10px 0', padding: '10px', backgroundColor: bitcoinState.bobReceived > 0 ? '#4a5d4a' : '#4a4a4a', borderRadius: '5px', color: 'white' }}>
                  <strong>👨‍💻 Bob:</strong> ₿{bitcoinState.bobReceived.toFixed(1)}
                  <div style={{ fontSize: '0.9em', color: '#ccc' }}>
                    {bitcoinState.pendingTransactions.some(tx => tx.to === 'Bob') ? 'Transaction pending...' : 
                     bitcoinState.bobReceived > 0 ? 'Payment confirmed! ✅' : 'Waiting for payment'}
                  </div>
                </div>
                
                <div className="actor" style={{ margin: '10px 0', padding: '10px', backgroundColor: bitcoinState.charlieReceived > 0 ? '#4a5d4a' : '#4a4a4a', borderRadius: '5px', color: 'white' }}>
                  <strong>👨‍🔧 Charlie:</strong> ₿{bitcoinState.charlieReceived.toFixed(1)}
                  <div style={{ fontSize: '0.9em', color: '#ccc' }}>
                    {bitcoinState.pendingTransactions.some(tx => tx.to === 'Charlie') ? 'Transaction pending...' : 
                     bitcoinState.charlieReceived > 0 ? 'Payment confirmed! ✅' : 
                     bitcoinState.hasAttemptedDoubleSpend && bitcoinState.pendingTransactions.length === 0 ? 'Transaction rejected ❌' : 'Waiting for payment'}
                  </div>
                </div>
                
                <div className="actor" style={{ margin: '10px 0', padding: '10px', backgroundColor: '#555', borderRadius: '5px', color: 'white' }}>
                  <strong>🌐 Bitcoin Network</strong>
                  <div style={{ fontSize: '0.9em', color: '#ccc' }}>
                    Pending: {bitcoinState.pendingTransactions.length}
                  </div>
                  <div style={{ fontSize: '0.8em', color: '#ccc', fontStyle: 'italic' }}>
                    {bitcoinState.networkMessage}
                  </div>
                </div>
              </div>
              
              <div style={{ textAlign: 'center', marginTop: '15px' }}>
                <button 
                  onClick={simulateBitcoinDoubleSpend}
                  disabled={bitcoinState.hasAttemptedDoubleSpend}
                  style={{ 
                    padding: '8px 16px', 
                    backgroundColor: '#f39c12', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '5px', 
                    cursor: bitcoinState.hasAttemptedDoubleSpend ? 'not-allowed' : 'pointer',
                    opacity: bitcoinState.hasAttemptedDoubleSpend ? 0.5 : 1,
                    marginRight: '10px'
                  }}
                >
                  Send ₿0.5 to Both
                </button>
                
                {bitcoinState.pendingTransactions.length > 0 && (
                  <button 
                    onClick={mineBlock}
                    style={{ 
                      padding: '8px 16px', 
                      backgroundColor: '#28a745', 
                      color: 'white', 
                      border: 'none', 
                      borderRadius: '5px', 
                      cursor: 'pointer',
                      marginRight: '10px'
                    }}
                  >
                    Mine Block
                  </button>
                )}
                
                <button 
                  onClick={resetBitcoinDemo}
                  style={{ 
                    padding: '8px 16px', 
                    backgroundColor: '#6c757d', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '5px', 
                    cursor: 'pointer'
                  }}
                >
                  Reset
                </button>
              </div>
              
              {bitcoinState.hasAttemptedDoubleSpend && bitcoinState.pendingTransactions.length === 0 && (
                <div style={{ 
                  marginTop: '15px', 
                  padding: '10px', 
                  backgroundColor: '#2d4a3a', 
                  borderRadius: '5px', 
                  border: '1px solid #4a6b5a',
                  fontSize: '0.9em',
                  color: 'white'
                }}>
                  ✅ <strong>Success:</strong> Bitcoin network prevented double spend! Only one transaction confirmed.
                </div>
              )}
            </div>
          </div>

          <blockquote className="concept-highlight">
            Proof-of-Work makes double-spending as futile as rewriting yesterday's
            newspaper—everyone can spot the forgery instantly.
          </blockquote>
          
          <p>
            Think of a "block" as today's edition of that newspaper. Mining is the
            daily printing press: thousands of computers race to print the next
            edition, and the one that proves it spent real ink and paper
            (electricity and computation) gets its version accepted as the official
            record for that day.
          </p>
        </div>

        <ActionButton onClick={() => onComplete(6)} variant="primary">
          Continue to Apply Scorecard
        </ActionButton>
      </div>
    </div>
  );
};

export default DigitalScarcity;
