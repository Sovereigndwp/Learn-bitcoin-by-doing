import React, { useState, useEffect } from 'react';
import { ActionButton } from './EnhancedButtons';
import './Introduction.css';            // add this new css file

const BalanceSheet = ({ stage }) => {
  // stage 0 = just deposited, stage 1 = loan created
  return (
    <div className="balance-sheet">
      <div className="sheet-column">
        <h4>👤 You</h4>
        <table>
          <tbody>
            <tr><td>Bank IOU</td><td>$1 000</td></tr>
            {stage === 1 && <tr><td style={{opacity:.5}}>Cash</td><td style={{opacity:.5}}>$0</td></tr>}
          </tbody>
        </table>
      </div>

      <div className="sheet-column">
        <h4>🏦 Bank</h4>
        <table>
          <tbody>
            <tr><td>Liability: IOU to you</td><td>$1 000</td></tr>
            {stage === 0 && <tr><td>Asset: Cash</td><td>$1 000</td></tr>}
            {stage === 1 && (
              <>
                <tr><td>Asset: Mortgage loan</td><td>$800</td></tr>
                <tr><td>Asset: Cash reserve</td><td>$200</td></tr>
              </>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Interactive Money Problem Demo Component
const MoneyProblemDemo = ({ onComplete }) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [bankRunTriggered, setBankRunTriggered] = useState(false);
  const [bailoutTriggered, setBailoutTriggered] = useState(false);
  const [showInflation, setShowInflation] = useState(false);
  const [bailoutStep, setBailoutStep] = useState(0); // Track bailout animation steps
  const [bankBalance, setBankBalance] = useState('-$2 billion');
  const [groceryPrice, setGroceryPrice] = useState(3.50);
  const [gasPrice, setGasPrice] = useState(3.20);
  const [rentPrice, setRentPrice] = useState(1200);
  const [showConsequences, setShowConsequences] = useState(false);
  const [showInflationStory, setShowInflationStory] = useState(false);
  const [flashDiv, setFlashDiv] = useState(false);
  const [bailoutButtonText, setBailoutButtonText] = useState('💰 GOVERNMENT BAILOUT');
  const [atmDisplaySuccess, setAtmDisplaySuccess] = useState(false);
  
  useEffect(() => {
    // Auto-reveal sections as user scrolls or interacts
    const handleScroll = () => {
      const scrollPercent = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      const sectionsToShow = Math.floor(scrollPercent * 6) + 1;
      
      if (sectionsToShow > currentSection) {
        setCurrentSection(sectionsToShow);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentSection]);
  
  const triggerBankRun = () => {
    if (bankRunTriggered) return;
    setBankRunTriggered(true);
    
    setTimeout(() => {
      setCurrentSection(Math.max(currentSection, 1));
    }, 3000);
  };
  
  const triggerBailout = () => {
    if (bailoutTriggered) return;
    setBailoutTriggered(true);
    setCurrentSection(Math.max(currentSection, 2));
    
    // Immediately change button text
    setBailoutButtonText('⏳ Creating Money...');
    
    // First timeout: Show flashing money creation (1.5 seconds)
    setTimeout(() => {
      setFlashDiv(true);
      
      // Second timeout: Update balance and show consequences (2 seconds)
      setTimeout(() => {
        setBankBalance('$0 billion');
        setFlashDiv(false);
        setShowConsequences(true);
        setBailoutButtonText('✅ Bank Saved');
        setAtmDisplaySuccess(true);
        
        // Start price animation
        let currentGrocery = 3.50;
        let currentGas = 3.20;
        let currentRent = 1200;
        
        const priceInterval = setInterval(() => {
          currentGrocery += 0.15;
          currentGas += 0.12;
          currentRent += 45;
          
          setGroceryPrice(currentGrocery);
          setGasPrice(currentGas);
          setRentPrice(currentRent);
          
          if (currentGrocery > 5.50) {
            clearInterval(priceInterval);
            setShowInflation(true);
            
            // Show inflation story section after 1 second
            setTimeout(() => {
              setShowInflationStory(true);
            }, 1000);
          }
        }, 400);
        
      }, 2000);
    }, 1500);
  };
  
  const showNextSection = () => {
    setCurrentSection(prev => prev + 1);
  };
  
  return (
    <div className="money-problem-container">
      <style>
        {`
          .money-problem-container {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            background: var(--color-dark-bg, #0D1117);
            color: var(--color-dark-text, #ffffff);
            min-height: 100vh;
            padding: 20px;
            overflow-x: hidden;
          }
          
          .money-problem-container * {
            box-sizing: border-box;
            color: var(--color-dark-text, #ffffff);
          }
          
          .problem-header {
            text-align: center;
            margin-bottom: 60px;
            padding: 50px 30px;
            background: linear-gradient(135deg, var(--color-primary-500, #f7931a) 0%, var(--color-primary-400, #fb923c) 50%, var(--color-primary-600, #e8750a) 100%);
            border-radius: 20px;
            box-shadow: 0 20px 40px rgba(247, 147, 26, 0.3);
          }
          
          .problem-header h1 {
            font-size: 3.5rem;
            font-weight: 800;
            color: var(--color-dark-bg, #000);
            margin-bottom: 15px;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
          }
          
          .problem-header .subtitle {
            font-size: 1.4rem;
            color: var(--color-neutral-800, #212529);
            font-weight: 600;
            margin-bottom: 20px;
          }
          
          .problem-section {
            margin-bottom: 50px;
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.8s ease;
          }
          
          .problem-section.visible {
            opacity: 1;
            transform: translateY(0);
          }
          
          .truth-bomb {
            background: linear-gradient(135deg, var(--color-dark-bgSecondary, #121212) 0%, var(--color-dark-bgTertiary, #1A1A1A) 100%);
            border-radius: 15px;
            padding: 40px;
            margin-bottom: 40px;
            border: 2px solid transparent;
            background-clip: padding-box;
            position: relative;
            box-shadow: 0 15px 35px rgba(0,0,0,0.6);
          }
          
          .truth-bomb::before {
            content: '';
            position: absolute;
            top: -2px;
            left: -2px;
            right: -2px;
            bottom: -2px;
            background: linear-gradient(135deg, var(--color-primary-500, #f7931a), var(--color-primary-400, #fb923c), var(--color-primary-600, #e8750a));
            border-radius: 17px;
            z-index: -1;
          }
          
          .truth-title {
            font-size: 2.2rem;
            font-weight: 700;
            margin-bottom: 25px;
            background: linear-gradient(135deg, var(--color-primary-500, #f7931a), var(--color-primary-400, #fb923c), var(--color-primary-600, #e8750a));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            text-align: center;
          }
          
          .bank-simulator {
            background: var(--color-neutral-950, #0d1117);
            border-radius: 12px;
            padding: 25px;
            margin: 20px 0;
            border: 1px solid var(--color-dark-border, rgba(255, 255, 255, 0.1));
          }
          
          .account-display {
            background: var(--color-dark-bgTertiary, #1A1A1A);
            padding: 20px;
            border-radius: 8px;
            margin: 15px 0;
            font-family: 'Courier New', monospace;
          }
          
          .balance {
            font-size: 2rem;
            font-weight: 700;
            color: var(--color-success-text, #4ade80);
            text-align: center;
            margin: 10px 0;
          }
          
          .balance.error {
            color: var(--color-error-text, #f87171);
            animation: shake 0.5s ease-in-out;
          }
          
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
          }
          
          .demo-btn {
            padding: 15px 25px;
            border: none;
            border-radius: 8px;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            margin: 10px;
            background: linear-gradient(135deg, var(--color-primary-500, #f7931a), var(--color-primary-400, #fb923c), var(--color-primary-600, #e8750a));
            color: var(--color-dark-bg, #000);
          }
          
          .demo-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(247, 147, 26, 0.4);
          }
          
          .demo-btn:disabled {
            opacity: 0.6;
            cursor: not-allowed;
          }
          
          .atm-screen {
            background: var(--color-dark-bgTertiary, #1A1A1A);
            border-radius: 10px;
            padding: 20px;
            text-align: center;
            border: 3px solid var(--color-dark-border, rgba(255, 255, 255, 0.1));
            position: relative;
          }
          
          .atm-display {
            background: var(--color-neutral-950, #0d1117);
            color: var(--color-success-text, #4ade80);
            padding: 20px;
            border-radius: 5px;
            font-family: 'Courier New', monospace;
          }
          
          .atm-display * {
            color: inherit;
          }
          
          .bailout-consequences {
            margin-top: 20px;
            padding: 20px;
            background: var(--color-neutral-950, #0a0a0a);
            border-radius: 10px;
          }
          
          .price-counter {
            background: var(--color-dark-bgTertiary, #1A1A1A);
            padding: 15px;
            border-radius: 8px;
            margin: 10px;
            text-align: center;
            min-width: 150px;
          }
          
          .price-amount {
            font-size: 1.5rem;
            color: var(--color-primary-400, #fb923c);
            font-weight: 700;
            transition: all 0.8s ease-in-out;
          }
          
          .price-amount.inflated {
            color: var(--color-error-text, #f87171);
            transform: scale(1.1);
            animation: priceAlert 2s ease-in-out;
          }
          
          @keyframes priceAlert {
            0% { transform: scale(1); }
            50% { transform: scale(1.15); color: var(--color-error-text, #f87171); }
            100% { transform: scale(1.1); }
          }
          
          .countdown-indicator {
            display: inline-block;
            margin-left: 10px;
            padding: 4px 8px;
            background: var(--color-dark-bgSecondary, #121212);
            border-radius: 12px;
            font-size: 0.8rem;
            color: var(--color-primary-300, #fdc574);
          }
          
          .flash-money {
            color: var(--color-success-text, #4ade80);
            font-size: 2rem;
            font-weight: 700;
            text-align: center;
            margin: 15px 0;
            animation: flash 1s ease-in-out infinite;
          }
          
          @keyframes flash {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.3; }
          }
          
          .atm-display.success {
            background: var(--color-success-bg, rgba(34, 197, 94, 0.1)) !important;
          }
          
          .balance-amount {
            font-size: 2.5rem;
            font-weight: 700;
            margin: 15px 0;
          }
          
          .balance-amount.success {
            color: var(--color-success-text, #4ade80);
          }
          
          .price-grid {
            display: flex;
            justify-content: space-around;
            flex-wrap: wrap;
            margin: 20px 0;
          }
          
          .revelation-section {
            background: linear-gradient(135deg, var(--color-primary-500, #f7931a) 0%, var(--color-primary-400, #fb923c) 50%, var(--color-primary-600, #e8750a) 100%);
            color: var(--color-dark-bg, #000);
            padding: 40px;
            border-radius: 20px;
            margin: 50px 0;
            text-align: center;
          }
          
          .revelation-section * {
            color: var(--color-dark-bg, #000);
          }
          
          .revelation-title {
            font-size: 2.5rem;
            font-weight: 800;
            margin-bottom: 20px;
          }
          
          .question-list {
            background: var(--color-neutral-950, #0a0a0a);
            padding: 30px;
            border-radius: 15px;
            margin: 30px 0;
          }
          
          .question-item {
            font-size: 1.2rem;
            margin: 15px 0;
            padding: 15px;
            background: var(--color-dark-bgTertiary, #1A1A1A);
            border-radius: 8px;
            border-left: 4px solid var(--color-primary-400, #fb923c);
            color: var(--color-dark-text, #ffffff);
          }
          
          .question-item * {
            color: var(--color-dark-text, #ffffff);
          }
          
          .final-cta {
            text-align: center;
            margin-top: 40px;
          }
        `}
      </style>
      
      <div className="problem-header">
        <h1>💰 The Money Problem</h1>
        <p className="subtitle">
          10 questions. 10 moments of truth. Your money will never look the same.
        </p>
        <div style={{ marginTop: '20px', padding: '15px', background: 'rgba(0,0,0,0.1)', borderRadius: '10px' }}>
          <p style={{ color: 'var(--color-neutral-800, #212529)', fontSize: '1rem' }}>🚨 Warning: This experience may cause financial awakening</p>
        </div>
      </div>

      {/* Section 1: Your Bank Account */}
      <div className={`problem-section ${currentSection >= 0 ? 'visible' : ''}`}>
        <div className="truth-bomb">
          <div className="truth-title">🏦 Your Bank Account</div>
          
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <p style={{ fontSize: '1.2rem', lineHeight: '1.6' }}>
              Let's start with something simple. Your money, sitting safely in the bank.<br/>
              <strong>Or is it?</strong>
            </p>
            
            <div className="bank-simulator">
              <div className="account-display">
                <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                  <h3>💳 Your Account Balance</h3>
                  <div className={`balance ${bankRunTriggered ? 'error' : ''}`}>
                    {bankRunTriggered ? 'ACCOUNT FROZEN' : '$5,247.83'}
                  </div>
                  <p style={{ color: 'var(--color-dark-textSecondary, #e2e8f0)' }}>Last updated: Just now</p>
                </div>
                
                <div style={{ textAlign: 'center' }}>
                  <button 
                    className="demo-btn" 
                    onClick={triggerBankRun}
                    disabled={bankRunTriggered}
                  >
                    {bankRunTriggered ? '🚨 INVESTIGATING...' : '🏃 Everyone Wants Their Money'}
                  </button>
                </div>
              </div>
              
              {bankRunTriggered && (
                <div style={{ marginTop: '20px', padding: '15px', background: 'var(--color-error-bg, rgba(220, 38, 38, 0.1))', borderRadius: '8px', border: '1px solid var(--color-error-light, #dc2626)' }}>
                  <div style={{ color: 'var(--color-error-text, #f87171)', fontWeight: '600', textAlign: 'center' }}>
                    🚨 "Due to unprecedented demand, we have temporarily suspended withdrawals for account security. 
                    We appreciate your patience during this time."
                  </div>
                  <div style={{ marginTop: '15px', textAlign: 'center', color: 'var(--color-warning-text, #fb923c)' }}>
                    💡 This has happened in real life. Lebanon 2019. Cyprus 2013. And others.
                  </div>
                </div>
              )}
            </div>
            
            <div style={{ marginTop: '30px', padding: '20px', background: 'var(--color-neutral-950, #0a0a0a)', borderRadius: '10px', borderLeft: '4px solid var(--color-primary-400, #fb923c)' }}>
              <p style={{ fontStyle: 'italic', color: 'var(--color-dark-textSecondary, #e2e8f0)', textAlign: 'center', marginBottom: '15px' }}>
                "The Times 03/Jan/2009 Chancellor on brink of second bailout for banks"
              </p>
              <p style={{ textAlign: 'center', color: 'var(--color-primary-400, #fb923c)', marginTop: '15px', fontWeight: '600' }}>
                That headline was embedded in the first Bitcoin block. Here's why...
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: The Crisis */}
      <div className={`problem-section ${currentSection >= 1 ? 'visible' : ''}`}>
        <div className="truth-bomb">
          <div className="truth-title">💰 The Day Everything Changed</div>
          
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <p style={{ fontSize: '1.2rem', lineHeight: '1.6' }}>
              2008. Your bank made bad bets. Really bad bets.<br/>
              Now they owe more money than they have. <strong>They're broke.</strong>
            </p>
            
            <div className="atm-screen">
              <div className={`atm-display ${atmDisplaySuccess ? 'success' : ''}`}>
                <div style={{ fontSize: '1.1rem', marginBottom: '10px' }}>🏦 MAJOR BANK BALANCE</div>
                <div style={{ color: 'var(--color-success-text, #4ade80)', fontSize: '1.1rem', margin: '10px 0' }}>Assets: $2 billion</div>
                <div style={{ color: 'var(--color-error-text, #f87171)', fontSize: '1.1rem', margin: '10px 0' }}>Owed to depositors: $4 billion</div>
                
                {/* Flash money creation effect */}
                {flashDiv && (
                  <div className="flash-money">+ $2 BILLION</div>
                )}
                
                <div className={`balance-amount ${atmDisplaySuccess ? 'success' : ''}`} style={{ color: atmDisplaySuccess ? 'var(--color-success-text, #4ade80)' : 'var(--color-error-text, #f87171)' }}>
                  {bankBalance}
                </div>
                <div style={{ margin: '15px 0', color: atmDisplaySuccess ? 'var(--color-success-text, #4ade80)' : 'var(--color-error-text, #f87171)', fontWeight: '600' }}>
                  {atmDisplaySuccess ? '✅ BANK SAVED' : '🚨 BANK INSOLVENT'}
                </div>
                <div style={{ margin: '10px 0', color: 'var(--color-dark-textSecondary, #e2e8f0)', fontSize: '0.9rem' }}>Your $5,247.83 is part of that $4 billion</div>
                <button 
                  className="demo-btn" 
                  onClick={triggerBailout}
                  disabled={bailoutTriggered}
                  style={{ 
                    background: atmDisplaySuccess ? 'var(--color-success-text, #4ade80)' : 'var(--color-primary-400, #fb923c)', 
                    color: 'var(--color-dark-bg, #000)' 
                  }}
                >
                  {bailoutButtonText}
                </button>
              </div>
            </div>
            
            <div style={{ marginTop: '20px', color: 'var(--color-primary-400, #fb923c)', fontSize: '1.3rem', fontWeight: '600' }}>
              <strong>Question: Where will that $2 billion come from?</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Section 3: The Magic Solution */}
      <div className={`problem-section ${currentSection >= 2 ? 'visible' : ''}`}>
        <div className="truth-bomb">
          <div className="truth-title">🖨️ The Magic Solution</div>
          
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <p style={{ fontSize: '1.2rem', lineHeight: '1.6', marginBottom: '20px' }}>
              The government steps in to "save" the bank.<br/>
              Overnight, $2 billion appears in the bank's account.<br/>
              <strong>No gold trucked in. No vaults filled. Just… new numbers.</strong>
            </p>
            
            {bailoutTriggered && (
              <div className="bailout-consequences">
                <div style={{ fontSize: '1.3rem', color: 'var(--color-primary-300, #fdc574)', marginBottom: '15px', fontWeight: '600' }}>
                  🖨️ The Money Printer Goes BRRR
                </div>
                <div style={{ color: 'var(--color-dark-textSecondary, #e2e8f0)', fontSize: '1.1rem', marginBottom: '20px' }}>
                  The Federal Reserve creates $2 billion with a few keystrokes. No vote. No approval from you.<br/>
                  <strong style={{ color: 'var(--color-primary-400, #fb923c)' }}>But now there's more money chasing the same goods...</strong>
                </div>
                
                <div className="price-grid">
                  <div className="price-counter">
                    <div style={{ fontSize: '1.5rem', marginBottom: '10px' }}>🏪</div>
                    <div style={{ color: 'var(--color-primary-400, #fb923c)', fontWeight: '600' }}>Grocery Prices</div>
                    <div className="price-amount">${groceryPrice.toFixed(2)}</div>
                  </div>
                  <div className="price-counter">
                    <div style={{ fontSize: '1.5rem', marginBottom: '10px' }}>⛽</div>
                    <div style={{ color: 'var(--color-primary-400, #fb923c)', fontWeight: '600' }}>Gas Prices</div>
                    <div className="price-amount">${gasPrice.toFixed(2)}</div>
                  </div>
                  <div className="price-counter">
                    <div style={{ fontSize: '1.5rem', marginBottom: '10px' }}>🏠</div>
                    <div style={{ color: 'var(--color-primary-400, #fb923c)', fontWeight: '600' }}>Rent</div>
                    <div className="price-amount">${rentPrice}</div>
                  </div>
                </div>
                
                {showInflation && (
                  <div style={{ marginTop: '20px', padding: '20px', background: 'var(--color-dark-bgSecondary, #121212)', borderRadius: '8px' }}>
                    <p style={{ fontSize: '1.2rem', textAlign: 'center', color: 'var(--color-primary-300, #fdc574)', fontWeight: '600' }}>
                      🖨️ They didn't "create" money. They diluted yours.
                    </p>
                    <p style={{ fontSize: '1rem', textAlign: 'center', color: 'var(--color-dark-textSecondary, #e2e8f0)', marginTop: '15px' }}>
                      The bank got saved. You got the bill. And you never voted on this.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Section 4: The Big Questions */}
      <div className={`problem-section ${(currentSection >= 3 || showInflation) ? 'visible' : ''}`}>
        <div className="revelation-section">
          <div className="revelation-title">🤔 The Questions You Should Be Asking</div>
          <p style={{ fontSize: '1.3rem', marginBottom: '30px' }}>
            If you're starting to feel uncomfortable, good. That means you're paying attention.
          </p>
        </div>

        <div className="question-list">
          <div className="question-item">
            <span style={{ fontSize: '1.5rem', marginRight: '10px' }}>🤔</span>
            <strong>Why do we accept small pieces of paper or numbers on a screen as money?</strong>
          </div>
          
          <div className="question-item">
            <span style={{ fontSize: '1.5rem', marginRight: '10px' }}>🔒</span>
            <strong>Who really owns the money in your bank account?</strong>
          </div>
          
          <div className="question-item">
            <span style={{ fontSize: '1.5rem', marginRight: '10px' }}>🖨️</span>
            <strong>What does it mean to "print money" and who decides when to do it?</strong>
          </div>
          
          <div className="question-item">
            <span style={{ fontSize: '1.5rem', marginRight: '10px' }}>🏃</span>
            <strong>What happens if everyone wants their money at the same time?</strong>
          </div>
          
          <div className="question-item">
            <span style={{ fontSize: '1.5rem', marginRight: '10px' }}>🗳️</span>
            <strong>Did we as a society ever vote on what counts as money?</strong>
          </div>
          
          <div className="question-item">
            <span style={{ fontSize: '1.5rem', marginRight: '10px' }}>⚖️</span>
            <strong>What happens when power over money is in the hands of just a few?</strong>
          </div>
        </div>

        <div className="revelation-section">
          <div className="revelation-title">💡 Welcome to Your Wake-Up Call</div>
          <p style={{ fontSize: '1.2rem', lineHeight: '1.6' }}>
            You've just experienced what most people never question. The system you trust with your life savings, 
            your future, your security... might not be as solid as you thought.
          </p>
          <p style={{ fontSize: '1.1rem', marginTop: '20px', fontWeight: '600' }}>
            Ready to learn what money really is and what alternatives exist?
          </p>
        </div>
      </div>

      <div className="final-cta">
        <ActionButton onClick={onComplete} variant="primary">
          Yes, Show Me What Money Really Is →
        </ActionButton>
      </div>
    </div>
  );
};

const Introduction = ({ onComplete }) => {
  const [page, setPage] = useState(0);
  const [answer, setAnswer] = useState(null);
  const [stage, setStage]  = useState(0);   // for balance-sheet demo

  /* ---------- PAGE 0 ---------- */
  if (page === 0) {
    return (
      <div className="intro-container">
        <h1 className="intro-headline">Your Money Isn't What You Think It Is</h1>
        <p className="intro-tagline">
          The biggest financial secrets are hiding in plain sight. <br/>
          <strong>What you're about to learn will change how you see money forever.</strong>
        </p>

        <div className="urgency-box">
          <h3>🔥 The Hard Truth</h3>
          <p>Most people spend decades working, saving, and planning... without understanding the most basic truth about money. <em>This affects every financial decision you'll ever make.</em></p>
        </div>

        <ul className="intro-roadmap">
          <li><strong>🚨 Wake up</strong> to how the system really works</li>
          <li><strong>🧠 Question</strong> everything you thought you knew</li>
          <li><strong>💡 Discover</strong> why Bitcoin changes everything</li>
          <li><strong>🎯 Decide</strong> your financial future</li>
        </ul>

        <ActionButton onClick={() => setPage(1)} className="pulsing-cta">Uncover the Truth →</ActionButton>
      </div>
    );
  }

  /* ---------- PAGE 1 - Interactive Money Problem Demo ---------- */
  return (
    <MoneyProblemDemo onComplete={() => onComplete(0)} />
  );
};

export default Introduction;
