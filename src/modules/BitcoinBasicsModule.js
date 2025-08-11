import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '../contexts/ProgressContext';
import { 
  ContinueButton, 
  ActionButton,
  OptionButton
} from '../components/ui';
import { ModuleCompletionButton, InteractiveIcon } from '../components/ui';
import '../components/ModuleCommon.css';

// Step 1: The Grocery Store Shock - No Jargon, Pure Experience
const GroceryStoreShock = ({ onComplete }) => {
  const [currentShock, setCurrentShock] = useState(0);
  const [userAnswer, setUserAnswer] = useState(null);
  const [showReality, setShowReality] = useState(false);

  const shockingTruths = [
    {
      id: 'groceries',
      title: '🛒 The Grocery Store Time Machine',
      hook: 'Quick question: What did milk cost when you were a kid?',
      personalSetup: 'Think back to your childhood. A gallon of milk was probably around $2-3. Today? $5-6. Your rent or mortgage? Probably double or triple what it was 10-15 years ago.',
      shockingReality: "But wait... didn't we all get raises? Didn't the economy grow? So why does everything feel more expensive?",
      question: "What's really happening here?",
      options: [
        { id: 'greedy', text: "Companies are just being greedy", isCorrect: false },
        { id: 'supply', text: "Supply chain problems caused temporary issues", isCorrect: false },
        { id: 'money', text: "Something is happening to the money itself", isCorrect: true },
        { id: 'normal', text: "This is just normal - prices always go up", isCorrect: false }
      ],
      reality: "Here's the uncomfortable truth: It's not that everything got more expensive... your money got weaker. The same dollar buys less food, less housing, less of everything.",
      impact: "You're not imagining it. Your paycheck goes less far because your money itself is losing power."
    },
    {
      id: 'paycheck',
      title: '💸 The Paycheck Puzzle',
      hook: 'Your paycheck numbers keep going up, but you feel poorer. What gives?',
      personalSetup: 'Your salary might be $60k when it was $40k five years ago. Sounds good, right? But that $40k used to cover rent, food, gas, and savings. Now $60k barely covers rent and food.',
      shockingReality: "A 50% pay raise, but you're struggling more than before. How is this possible?",
      question: "What's the missing piece of this puzzle?",
      options: [
        { id: 'lazy', text: "I'm just spending more frivolously than before", isCorrect: false },
        { id: 'lifestyle', text: "My lifestyle expectations have increased", isCorrect: false },
        { id: 'purchasing', text: "My money buys less stuff than it used to", isCorrect: true },
        { id: 'unlucky', text: "I'm just unlucky with timing", isCorrect: false }
      ],
      reality: "The purchasing power of your money is shrinking faster than your paychecks are growing. You're running up a down escalator.",
      impact: "This isn't your fault, and it's not temporary. This is what happens when money itself becomes less valuable over time."
    },
    {
      id: 'savings',
      title: '🏦 The Savings Account Scam',
      hook: 'Your savings account pays 0.5% interest. Sounds safe, right?',
      personalSetup: 'You put $10,000 in savings. The bank pays you $50 per year in interest. Meanwhile, your grocery bill went up $500 this year alone.',
      shockingReality: "Your 'safe' savings account is making you poorer every single day.",
      question: "What's really happening to your savings?",
      options: [
        { id: 'growing', text: "My savings are growing slowly but surely", isCorrect: false },
        { id: 'safe', text: "At least my money is completely safe", isCorrect: false },
        { id: 'shrinking', text: "My savings are losing buying power every day", isCorrect: true },
        { id: 'temporary', text: "This is temporary - rates will go back up", isCorrect: false }
      ],
      reality: "While your bank pays you $50, the real cost of living steals $800+ from the same money. Your 'safe' savings are guaranteed to lose purchasing power.",
      impact: "The traditional advice to 'save your money in the bank' is actually making you poorer. The system is rigged against savers."
    }
  ];

  const currentData = shockingTruths[currentShock];

  const handleAnswer = (option) => {
    setUserAnswer(option);
    setShowReality(true);
  };

  const handleNext = () => {
    if (currentShock < shockingTruths.length - 1) {
      setCurrentShock(currentShock + 1);
      setUserAnswer(null);
      setShowReality(false);
    } else {
      onComplete(0);
    }
  };

  return (
    <div className="step-content grocery-shock">
      <div className="module-header-box">
        <h2>💸 Your Money Problems Are Real</h2>
        <div className="intro-text">
          <p className="prime-text">You're not imagining it. Something is seriously wrong with money. Let's figure out what...</p>
        </div>
      </div>
      
      <div className="content-text">
        <div className="shock-revelation">
          <h3>{currentData.title}</h3>
          
          <div className="personal-hook">
            <p className="hook-text">{currentData.hook}</p>
          </div>
          
          <div className="personal-setup">
            <p>{currentData.personalSetup}</p>
          </div>
          
          <div className="shocking-reality">
            <p className="reality-highlight">🤯 {currentData.shockingReality}</p>
          </div>
          
          <div className="discovery-question">
            <h4>{currentData.question}</h4>
            
            {!userAnswer && (
              <div className="answer-options">
                {currentData.options.map((option) => (
                  <button
                    key={option.id}
                    className="option-button"
                    onClick={() => handleAnswer(option)}
                  >
                    {option.text}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {showReality && (
            <div className="reality-reveal">
              <div className="answer-feedback">
                <h4>You chose: "{userAnswer.text}"</h4>
                {userAnswer.isCorrect ? (
                  <p className="correct-feedback">✅ Exactly! You're seeing the pattern.</p>
                ) : (
                  <p className="incorrect-feedback">🤔 That's what most people think, but there's a deeper truth...</p>
                )}
              </div>
              
              <div className="truth-bomb">
                <h4>💡 The Reality:</h4>
                <p>{currentData.reality}</p>
              </div>
              
              <div className="personal-impact">
                <h4>💔 What This Means For You:</h4>
                <p>{currentData.impact}</p>
              </div>
              
              <ActionButton onClick={handleNext} className="continue-button">
                {currentShock < shockingTruths.length - 1 ? "😤 Show Me More Truth →" : "🔥 But Who's Responsible? →"}
              </ActionButton>
            </div>
          )}
        </div>
        
        <div className="shock-progress">
          <div className="progress-dots">
            {shockingTruths.map((_, index) => (
              <div 
                key={index} 
                className={`progress-dot ${index === currentShock ? 'active' : ''} ${index < currentShock ? 'completed' : ''}`}
              />
            ))}
          </div>
          <p>Reality Check {currentShock + 1} of {shockingTruths.length}</p>
        </div>
      </div>
    </div>
  );
};

// Step 2: The Control Question - Who Really Owns Your Money?
const TheControlQuestion = ({ onComplete }) => {
  const [stage, setStage] = useState(0); // 0: setup, 1: Canada story, 2: reflection
  const [userReflection, setUserReflection] = useState(null);

  if (stage === 0) {
    return (
      <div className="step-content control-setup">
        <div className="module-header-box">
          <h2>🤔 Quick Question About Your Money</h2>
          <div className="intro-text">
            <p className="prime-text">Before we continue, let's test something fundamental...</p>
          </div>
        </div>
        
        <div className="content-text">
          <div className="simple-question">
            <h3>Do you own the money in your bank account?</h3>
            
            <div className="ownership-options">
              <button 
                className="ownership-button confident"
                onClick={() => setStage(1)}
              >
                💪 Of course I do - it's MY money
              </button>
              
              <button 
                className="ownership-button unsure"
                onClick={() => setStage(1)}
              >
                🤷 I think so... right?
              </button>
              
              <button 
                className="ownership-button suspicious"
                onClick={() => setStage(1)}
              >
                🤨 Actually, I'm not sure anymore
              </button>
            </div>
          </div>
          
          <div className="question-context">
            <p>Let me tell you a story that might change how you think about this...</p>
          </div>
        </div>
      </div>
    );
  }

  if (stage === 1) {
    return (
      <div className="step-content canada-story">
        <div className="module-header-box">
          <h2>🚨 February 2022: The $7 Million Question</h2>
          <div className="story-badge">TRUE STORY</div>
        </div>
        
        <div className="content-text">
          <div className="canada-narrative">
            <div className="story-hook">
              <p className="dramatic-text">A government froze $7 million in bank accounts with the click of a button.</p>
            </div>
            
            <div className="story-details">
              <h4>What Happened:</h4>
              <p>Peaceful protesters in Canada (the Freedom Convoy) had their bank accounts frozen. No court orders. No trials. No warnings.</p>
              
              <div className="personal-story">
                <h5>💔 One woman's story:</h5>
                <p>She donated $50 to support the truckers. That's it - fifty dollars. When she woke up the next morning, her entire life savings was frozen. She couldn't buy groceries. She couldn't pay rent.</p>
              </div>
              
              <div className="scale-shock">
                <h5>📊 The Scale:</h5>
                <p>Over 200 bank accounts frozen. Some belonged to people who just had similar names to donors. Others were small business owners who served coffee to protesters.</p>
              </div>
            </div>
            
            <div className="uncomfortable-truth">
              <h4>The Uncomfortable Question:</h4>
              <p className="truth-highlight">If someone else can freeze your money instantly, without your permission, do you actually own it?</p>
            </div>
            
            <div className="reflection-prompt">
              <h4>🤔 Take a moment to think:</h4>
              <p>How does this story make you feel about the money in your bank account?</p>
              
              <div className="reflection-options">
                <button 
                  className="reflection-button"
                  onClick={() => {
                    setUserReflection('safe');
                    setStage(2);
                  }}
                >
                  🛡️ That's extreme - my money is safe
                </button>
                
                <button 
                  className="reflection-button"
                  onClick={() => {
                    setUserReflection('worried');
                    setStage(2);
                  }}
                >
                  😰 Now I'm worried about my own money
                </button>
                
                <button 
                  className="reflection-button"
                  onClick={() => {
                    setUserReflection('awakened');
                    setStage(2);
                  }}
                >
                  🤯 I never thought about ownership this way
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Final reflection stage
  return (
    <div className="step-content ownership-reality">
      <div className="module-header-box">
        <h2>💡 The Ownership Reality</h2>
      </div>
      
      <div className="content-text">
        <div className="user-reflection">
          <h4>Your reaction: "{userReflection === 'safe' ? "That's extreme - my money is safe" : userReflection === 'worried' ? "Now I'm worried about my own money" : "I never thought about ownership this way"}"</h4>
        </div>
        
        <div className="harsh-truth">
          <h4>💣 The Harsh Truth:</h4>
          <p>Your bank account isn't really "your money." It's an IOU from a bank that can be revoked. You have "access" to money, but that's not the same as "ownership."</p>
          
          <div className="technical-reality">
            <h5>The Legal Reality:</h5>
            <ul>
              <li>Your bank deposit is legally a "loan" to the bank</li>
              <li>Banks can freeze accounts for hundreds of reasons</li>
              <li>Governments can order freezes without court approval</li>
              <li>You're an "unsecured creditor" to your own bank</li>
            </ul>
          </div>
        </div>
        
        <div className="bigger-picture">
          <h4>🔍 The Bigger Picture:</h4>
          <p>If your money isn't really yours, and it's getting weaker every day, what does that mean for your financial future?</p>
        </div>
        
        <div className="cliffhanger">
          <h4>🚀 The Plot Twist:</h4>
          <p className="cliffhanger-text">What if there was a form of money that literally CANNOT be frozen, controlled, or weakened by anyone? Keep going to discover what that looks like...</p>
        </div>
        
        <ActionButton onClick={() => onComplete(1)} className="continue-epic">
          💪 Show Me Real Money →
        </ActionButton>
      </div>
    </div>
  );
};

// Step 3: Socratic Questions - Deep Thinking About Money
const SocraticQuestions = ({ onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [showInsight, setShowInsight] = useState(false);

  // The homepage questions that make them think deeply
  const socraticQuestions = [
    {
      id: 'what_is_money',
      title: 'What is money, really?',
      question: 'If you had to define money without using the word "money," what would you say it is?',
      options: [
        { id: 'paper', text: 'Pieces of paper and metal coins that stores give us', depth: 'surface' },
        { id: 'government', text: 'Whatever the government says has value', depth: 'shallow' },
        { id: 'agreement', text: 'Something everyone agrees represents value and can be traded', depth: 'deeper' },
        { id: 'energy', text: 'Stored human time and energy that can be transferred', depth: 'deep' }
      ],
      insight: "Money is essentially a tool for storing and transferring human time, energy, and value. It's not the physical object - it's the collective agreement that this thing represents work already done.",
      followUp: "Think about it: When you earn money, you're trading your time and energy. When you spend it, you're trading stored time and energy for someone else's work."
    },
    {
      id: 'why_accept',
      title: 'The Acceptance Mystery',
      question: 'Why do we all accept small pieces of paper or numbers on a screen in exchange for real things like food and shelter?',
      options: [
        { id: 'law', text: 'Because the law says we have to', depth: 'surface' },
        { id: 'valuable', text: 'Because the paper and numbers are inherently valuable', depth: 'wrong' },
        { id: 'trust', text: 'Because we trust others will also accept them', depth: 'deeper' },
        { id: 'network', text: 'Because money only works when everyone uses the same system', depth: 'deep' }
      ],
      insight: "Money is a network effect. It only works because we all agree to use the same system. The more people who accept it, the more useful it becomes. This is why new forms of money struggle to get started.",
      followUp: "But here's the uncomfortable question: What happens when people lose trust in the system? What if there was a better system that more people wanted to use?"
    },
    {
      id: 'who_decides',
      title: 'The Power Question',
      question: 'Who gets to decide what money is?',
      options: [
        { id: 'people', text: 'We all decide together democratically', depth: 'naive' },
        { id: 'market', text: 'The free market decides naturally', depth: 'partial' },
        { id: 'government', text: 'Governments and central banks decide', depth: 'shallow' },
        { id: 'power', text: 'Whoever has the most power decides', depth: 'deep' }
      ],
      insight: "Throughout history, those with power have controlled money. Governments, kings, central banks - they decide what counts as money and what doesn't. But power structures change, and sometimes the people choose differently.",
      followUp: "The real question is: Should a small group of powerful people control something as fundamental as money? What if the people could choose for themselves?"
    },
    {
      id: 'printing_money',
      title: 'The Printing Press Problem',
      question: 'If new money can be created at will, would you feel safe storing your savings in it?',
      options: [
        { id: 'safe', text: 'Yes - more money means more prosperity for everyone', depth: 'naive' },
        { id: 'experts', text: 'Yes - smart experts manage it responsibly', depth: 'trusting' },
        { id: 'worried', text: 'No - my savings would lose value as more is created', depth: 'deeper' },
        { id: 'broken', text: 'No - unlimited creation makes the whole system meaningless', depth: 'deep' }
      ],
      insight: "When money can be created endlessly, your savings become worth less over time. It's like owning shares of a company that keeps issuing new shares - your percentage of the total keeps shrinking.",
      followUp: "This is why gold was money for thousands of years - it was hard to create more. But what if there was digital money that was even more limited than gold?"
    },
    {
      id: 'fairness',
      title: 'The Fairness Test',
      question: 'Is our financial system fair—or just familiar?',
      options: [
        { id: 'fair', text: 'It\'s fair - everyone has equal opportunity', depth: 'naive' },
        { id: 'familiar', text: 'It\'s not fair, but it\'s what we\'re used to', depth: 'honest' },
        { id: 'rigged', text: 'It\'s rigged for those who control money creation', depth: 'deeper' },
        { id: 'changeable', text: 'Fairness doesn\'t matter - systems can be changed', depth: 'deep' }
      ],
      insight: "The current system benefits those closest to money creation (governments, banks, large corporations) at the expense of regular savers and workers. This isn't a conspiracy - it's just how the system works.",
      followUp: "The question isn't whether this is fair - it's whether we can build something better. And for the first time in history, we might actually have the technology to do it."
    }
  ];

  const currentData = socraticQuestions[currentQuestion];

  const handleAnswer = (option) => {
    setUserAnswers(prev => ({
      ...prev,
      [currentData.id]: option
    }));
    setShowInsight(true);
  };

  const handleNext = () => {
    if (currentQuestion < socraticQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowInsight(false);
    } else {
      onComplete(2);
    }
  };

  return (
    <div className="step-content socratic-questions">
      <div className="module-header-box">
        <h2>🤔 The Big Questions About Money</h2>
        <div className="intro-text">
          <p className="prime-text">Now that you've seen the problems, let's think deeper. These questions might make you uncomfortable - that's the point...</p>
        </div>
      </div>
      
      <div className="content-text">
        <div className="question-exploration">
          <h3>{currentData.title}</h3>
          
          <div className="socratic-question">
            <h4>{currentData.question}</h4>
          </div>
          
          {!userAnswers[currentData.id] && (
            <div className="thinking-options">
              <p className="think-prompt">Take your time. Think deeply. There's no "wrong" answer, but some answers reveal more than others...</p>
              
              <div className="answer-choices">
                {currentData.options.map((option) => (
                  <button
                    key={option.id}
                    className={`thinking-option depth-${option.depth}`}
                    onClick={() => handleAnswer(option)}
                  >
                    {option.text}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {showInsight && (
            <div className="socratic-insight">
              <div className="your-thinking">
                <h4>Your perspective: "{userAnswers[currentData.id].text}"</h4>
                <div className={`depth-indicator depth-${userAnswers[currentData.id].depth}`}>
                  {userAnswers[currentData.id].depth === 'deep' ? '🎯 Deep thinking!' : 
                   userAnswers[currentData.id].depth === 'deeper' ? '💭 Getting warmer...' : 
                   userAnswers[currentData.id].depth === 'shallow' ? '🤷 Surface level' : 
                   userAnswers[currentData.id].depth === 'partial' ? '⚖️ Partially there' :
                   userAnswers[currentData.id].depth === 'naive' ? '😇 Optimistic view' :
                   userAnswers[currentData.id].depth === 'honest' ? '💯 Brutally honest' :
                   userAnswers[currentData.id].depth === 'trusting' ? '🙏 Trusting the system' :
                   '❌ Missing the mark'
                  }
                </div>
              </div>
              
              <div className="deeper-insight">
                <h4>💡 A Deeper Perspective:</h4>
                <p>{currentData.insight}</p>
              </div>
              
              <div className="follow-up">
                <h4>🚀 The Plot Thickens:</h4>
                <p>{currentData.followUp}</p>
              </div>
              
              <ActionButton onClick={handleNext} className="continue-thinking">
                {currentQuestion < socraticQuestions.length - 1 ? "🧠 Next Deep Question →" : "💡 I'm Ready for Answers →"}
              </ActionButton>
            </div>
          )}
        </div>
        
        <div className="question-progress">
          <div className="progress-dots">
            {socraticQuestions.map((_, index) => (
              <div 
                key={index} 
                className={`progress-dot ${index === currentQuestion ? 'active' : ''} ${index < currentQuestion ? 'completed' : ''}`}
              />
            ))}
          </div>
          <p>Question {currentQuestion + 1} of {socraticQuestions.length}</p>
        </div>
      </div>
    </div>
  );
};

// Step 4: What Is Bitcoin? - Simple, Clear Answer
const WhatIsBitcoin = ({ onComplete }) => {
  const [revealed, setRevealed] = useState(0); // 0: intro, 1: what it is, 2: how it fixes problems

  if (revealed === 0) {
    return (
      <div className="step-content bitcoin-intro">
        <div className="module-header-box">
          <h2>🟠 So... What IS Bitcoin?</h2>
          <div className="intro-text">
            <p className="prime-text">After all those questions, you deserve a clear answer. Let's cut through the complexity...</p>
          </div>
        </div>
        
        <div className="content-text">
          <div className="simple-answer">
            <h3>Here's the simple truth:</h3>
            
            <div className="bitcoin-definition">
              <h4>Bitcoin is digital money that works like cash, but better.</h4>
              
              <div className="like-cash">
                <h5>👍 Like Cash:</h5>
                <ul>
                  <li>You actually own it (not just access to it)</li>
                  <li>No one can freeze or confiscate it</li>
                  <li>You can send it directly to anyone</li>
                  <li>No permission needed to use it</li>
                </ul>
              </div>
              
              <div className="better-than-cash">
                <h5>🚀 But Better:</h5>
                <ul>
                  <li>Works anywhere in the world instantly</li>
                  <li>Can't be counterfeited or faked</li>
                  <li>Every transaction is publicly recorded</li>
                  <li>Limited supply - only 21 million will ever exist</li>
                </ul>
              </div>
            </div>
            
            <div className="key-insight">
              <h4>💡 The Key Insight:</h4>
              <p>Bitcoin is the first form of money that combines the benefits of digital payments with the sovereignty of physical cash, while eliminating the problems of both.</p>
            </div>
            
            <ActionButton onClick={() => setRevealed(1)} className="reveal-more">
              🤔 But HOW Does It Do This? →
            </ActionButton>
          </div>
        </div>
      </div>
    );
  }

  if (revealed === 1) {
    return (
      <div className="step-content bitcoin-how">
        <div className="module-header-box">
          <h2>🔧 How Bitcoin Actually Works</h2>
          <div className="intro-text">
            <p className="prime-text">The genius is in its simplicity. Remember the vacation expense example?</p>
          </div>
        </div>
        
        <div className="content-text">
          <div className="bitcoin-mechanics">
            <div className="simple-explanation">
              <h3>Bitcoin = A Giant Shared Notebook</h3>
              
              <div className="notebook-analogy">
                <h4>🏖️ Remember Your Group Vacation?</h4>
                <p>You decided everyone should keep identical copies of all expenses so no one could cheat. Bitcoin does exactly this, but for money.</p>
                
                <div className="bitcoin-version">
                  <h5>🟠 Bitcoin's Version:</h5>
                  <ul>
                    <li><strong>The Notebook:</strong> A digital record of every Bitcoin transaction ever made</li>
                    <li><strong>Everyone Has a Copy:</strong> Thousands of computers around the world keep identical records</li>
                    <li><strong>Consensus Rules:</strong> Most computers must agree before any transaction is accepted</li>
                    <li><strong>No Central Authority:</strong> No single person or organization controls it</li>
                  </ul>
                </div>
              </div>
              
              <div className="security-layer">
                <h4>🔒 The Security Layer:</h4>
                <p>Instead of names like "John paid $50," Bitcoin uses cryptographic proof. You prove you own Bitcoin without revealing your identity, and no one can fake the proof.</p>
              </div>
              
              <div className="innovation-highlight">
                <h4>🚀 The Innovation:</h4>
                <p>For the first time in history, we can have digital money that doesn't need a bank, government, or company to work. It's purely peer-to-peer, like handing someone cash, but digital.</p>
              </div>
            </div>
            
            <ActionButton onClick={() => setRevealed(2)} className="see-solution">
              💡 Now Show Me How It Fixes Everything →
            </ActionButton>
          </div>
        </div>
      </div>
    );
  }

  // Final revelation - how Bitcoin solves the problems
  if (revealed === 2) {
    return (
      <div className="step-content bitcoin-solution">
        <div className="module-header-box">
          <h2>🎯 How Bitcoin Fixes Your Money Problems</h2>
        </div>
        
        <div className="content-text">
          <div className="problem-solutions">
            <h3>Remember Your Problems? Here Are the Solutions:</h3>
            
            <div className="solution-grid">
              <div className="solution-item">
                <div className="problem-reminder">
                  <h4>😤 Problem: Your money loses buying power</h4>
                  <p>Groceries cost more, paychecks buy less</p>
                </div>
                <div className="bitcoin-fix">
                  <h4>🟠 Bitcoin Solution: Fixed Supply</h4>
                  <p>Only 21 million Bitcoin will ever exist. Your share can't be diluted by printing more.</p>
                </div>
              </div>
              
              <div className="solution-item">
                <div className="problem-reminder">
                  <h4>🚨 Problem: Your money can be frozen</h4>
                  <p>Governments can block your bank account</p>
                </div>
                <div className="bitcoin-fix">
                  <h4>🟠 Bitcoin Solution: True Ownership</h4>
                  <p>If you control your Bitcoin keys, literally no one can freeze or confiscate it.</p>
                </div>
              </div>
              
              <div className="solution-item">
                <div className="problem-reminder">
                  <h4>🏦 Problem: Banks control your money</h4>
                  <p>You're just an unsecured creditor to your bank</p>
                </div>
                <div className="bitcoin-fix">
                  <h4>🟠 Bitcoin Solution: Be Your Own Bank</h4>
                  <p>No intermediaries. You hold your money directly, like digital cash.</p>
                </div>
              </div>
              
              <div className="solution-item">
                <div className="problem-reminder">
                  <h4>💔 Problem: System benefits the powerful</h4>
                  <p>Those closest to money creation get the advantages</p>
                </div>
                <div className="bitcoin-fix">
                  <h4>🟠 Bitcoin Solution: Level Playing Field</h4>
                  <p>Same rules for everyone. No special privileges based on power or connections.</p>
                </div>
              </div>
            </div>
            
            <div className="final-realization">
              <h3>🎊 The Final Realization</h3>
              <p>Bitcoin isn't just "digital money." It's the first form of money in human history that can't be controlled, manipulated, or diluted by governments, banks, or any central authority.</p>
              
              <div className="power-shift">
                <h4>⚡ The Power Shift:</h4>
                <p>For the first time, individuals can opt out of the traditional financial system entirely while still participating in the global economy. That's revolutionary.</p>
              </div>
            </div>
            
            <ActionButton onClick={() => setRevealed(3)} className="see-battle">
              🚀 I Get It! Now Show Me The Ultimate Test →
            </ActionButton>
          </div>
        </div>
      </div>
    );
  }

  // Final stage: The Ultimate Money Battle
  return (
    <div className="step-content money-battle-final">
      <div className="module-header-box">
        <h2>⚔️ The Ultimate Money Battle</h2>
        <div className="intro-text">
          <p className="prime-text">Now that you understand Bitcoin's solutions, let's test them against the competition. Three types of money enter... only one wins.</p>
        </div>
      </div>
      
      <div className="content-text">
        <div className="battle-preview">
          <div className="contenders">
            <div className="contender fiat-contender">
              <h3>💵 Team Fiat</h3>
              <p>Government-issued currency</p>
            </div>
            <div className="contender gold-contender">
              <h3>🥇 Team Gold</h3>
              <p>Traditional store of value</p>
            </div>
            <div className="contender bitcoin-contender">
              <h3>🟠 Team Bitcoin</h3>
              <p>Digital revolution</p>
            </div>
          </div>
        </div>
        
        <div className="battle-questions">
          <h3>The Four Critical Tests:</h3>
          <div className="test-preview">
            <div className="test-item">
              <h4>🏛️ Control Test</h4>
              <p>Can governments freeze, confiscate, or manipulate it?</p>
            </div>
            <div className="test-item">
              <h4>📊 Scarcity Test</h4>
              <p>Can more be created, diluting your holdings?</p>
            </div>
            <div className="test-item">
              <h4>✅ Verification Test</h4>
              <p>How easy is it to prove it's real?</p>
            </div>
            <div className="test-item">
              <h4>🌍 Transport Test</h4>
              <p>Can you easily move it anywhere in the world?</p>
            </div>
          </div>
        </div>
        
        <div className="battle-outcome">
          <h3>🏆 Spoiler Alert: Bitcoin Dominates</h3>
          <p>Bitcoin systematically outperforms both traditional money forms. It combines the best of both worlds while eliminating their weaknesses.</p>
          
          <div className="victory-message">
            <h4>🎉 Why Bitcoin Wins:</h4>
            <ul>
              <li><strong>Control:</strong> Only YOU control your Bitcoin (not governments)</li>
              <li><strong>Scarcity:</strong> Exactly 21 million forever (mathematically guaranteed)</li>
              <li><strong>Verification:</strong> Instantly verifiable by anyone with a computer</li>
              <li><strong>Transport:</strong> Send anywhere in ~10 minutes for minimal fees</li>
            </ul>
          </div>
        </div>
        
        <ActionButton onClick={() => onComplete(3)} className="complete-understanding">
          🚀 Bitcoin Is The Champion! Complete This Module →
        </ActionButton>
      </div>
    </div>
  );
};

// The Money Battle - Gamified Property Comparison
const PropertyCompare = ({ onComplete }) => {
  const [currentProperty, setCurrentProperty] = useState(0);
  const [selections, setSelections] = useState({});
  const [scores, setScores] = useState({ fiat: 0, gold: 0, bitcoin: 0 });
  const [showResults, setShowResults] = useState(false);
  const [battlePhase, setBattlePhase] = useState('intro'); // intro, battle, results

  const propertyBattles = [
    { 
      key: "Control", 
      title: "Who Controls It?", 
      question: "Can governments freeze, confiscate, or manipulate this money?",
      options: {
        fiat: { label: "💵 Fiat Money", answer: "Government controls everything", pass: false },
        gold: { label: "🥇 Gold", answer: "You control physical gold", pass: true },
        bitcoin: { label: "🟠 Bitcoin", answer: "Only you control your Bitcoin", pass: true }
      },
      winner: "bitcoin",
      insight: "Bitcoin wins because it's the ONLY money that can't be frozen or confiscated by anyone."
    },
    {
      key: "Scarcity", 
      title: "Is the Supply Fixed?", 
      question: "Can more of this money be created, diluting your holdings?",
      options: {
        fiat: { label: "💵 Fiat Money", answer: "Unlimited printing possible", pass: false },
        gold: { label: "🥇 Gold", answer: "More can be mined", pass: true },
        bitcoin: { label: "🟠 Bitcoin", answer: "Exactly 21 million forever", pass: true }
      },
      winner: "bitcoin",
      insight: "Bitcoin's 21 million limit is mathematically guaranteed - unlike gold mining or money printing."
    },
    {
      key: "Verification", 
      title: "Can You Verify It's Real?", 
      question: "How easy is it to prove this money isn't fake?",
      options: {
        fiat: { label: "💵 Fiat Money", answer: "Special equipment needed", pass: true },
        gold: { label: "🥇 Gold", answer: "Complex testing required", pass: false },
        bitcoin: { label: "🟠 Bitcoin", answer: "Instantly verifiable by anyone", pass: true }
      },
      winner: "bitcoin",
      insight: "Bitcoin transactions are cryptographically verifiable by anyone with a computer."
    },
    {
      key: "Transport", 
      title: "How Easy to Move?", 
      question: "Can you easily transport large amounts across borders?",
      options: {
        fiat: { label: "💵 Fiat Money", answer: "Banks, fees, restrictions", pass: true },
        gold: { label: "🥇 Gold", answer: "Heavy, expensive to move", pass: false },
        bitcoin: { label: "🟠 Bitcoin", answer: "Instant global transfer", pass: true }
      },
      winner: "bitcoin",
      insight: "Bitcoin can be sent anywhere in the world in ~10 minutes for minimal fees."
    }
  ];

  const currentBattle = propertyBattles[currentProperty];

  const handleChoice = (moneyType) => {
    // Prevent changing selection once made
    if (selections[currentProperty]) {
      return;
    }

    const newSelections = { ...selections, [currentProperty]: moneyType };
    setSelections(newSelections);
    
    // Award points
    const newScores = { ...scores };
    if (moneyType === currentBattle.winner) {
      newScores[moneyType] += 2; // Winner gets 2 points
    } else if (currentBattle.options[moneyType].pass) {
      newScores[moneyType] += 1; // Partial credit for passing
    }
    setScores(newScores);
  };

  const handleNextRound = () => {
    if (currentProperty < propertyBattles.length - 1) {
      setCurrentProperty(currentProperty + 1);
    } else {
      setBattlePhase('results');
    }
  };

  const getScoreColor = (score) => {
    if (score >= 6) return 'winner';
    if (score >= 3) return 'decent';
    return 'poor';
  };

  if (battlePhase === 'intro') {
    return (
      <div className="step-content battle-intro">
        <div className="module-header-box">
          <h2>⚔️ The Ultimate Money Battle</h2>
          <div className="intro-text">
            <p className="prime-text">Three types of money enter. Only one can be the champion. Let's see which money dominates in key areas...</p>
          </div>
        </div>
        <div className="content-text">
          <div className="battle-preview">
            <div className="contenders">
              <div className="contender fiat-contender">
                <h3>💵 Team Fiat</h3>
                <p>Government-issued currency</p>
              </div>
              <div className="contender gold-contender">
                <h3>🥇 Team Gold</h3>
                <p>Traditional store of value</p>
              </div>
              <div className="contender bitcoin-contender">
                <h3>🟠 Team Bitcoin</h3>
                <p>Digital revolution</p>
              </div>
            </div>
          </div>
          <ActionButton onClick={() => setBattlePhase('battle')} className="start-battle-button">
            🔥 Start the Battle!
          </ActionButton>
        </div>
      </div>
    );
  }

  if (battlePhase === 'results') {
    return (
      <div className="step-content battle-results">
        <div className="module-header-box">
          <h2>🏆 Battle Results</h2>
        </div>
        <div className="content-text">
          <div className="final-scores">
            <div className="scoreboard">
              <div className={`score-item ${getScoreColor(scores.bitcoin)}`}>
                <h3>🟠 Bitcoin</h3>
                <div className="score">{scores.bitcoin}</div>
                <div className="status">CHAMPION! 👑</div>
              </div>
              <div className={`score-item ${getScoreColor(scores.gold)}`}>
                <h3>🥇 Gold</h3>
                <div className="score">{scores.gold}</div>
                <div className="status">Runner-up</div>
              </div>
              <div className={`score-item ${getScoreColor(scores.fiat)}`}>
                <h3>💵 Fiat</h3>
                <div className="score">{scores.fiat}</div>
                <div className="status">Needs improvement</div>
              </div>
            </div>
          </div>
          <div className="victory-message">
            <h3>🎉 Bitcoin Domination Complete!</h3>
            <p>Bitcoin systematically outperforms both traditional money forms. It combines the best of both worlds while eliminating their weaknesses.</p>
          </div>
          <ContinueButton onClick={() => onComplete(1)} className="victory-button">
            🚀 Bitcoin Wins! Now See HOW It Works →
          </ContinueButton>
        </div>
      </div>
    );
  }

  // Battle phase
  return (
    <div className="step-content money-battle">
      <div className="module-header-box">
        <h2>⚔️ Round {currentProperty + 1}: {currentBattle.title}</h2>
        <div className="battle-progress">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${((currentProperty + 1) / propertyBattles.length) * 100}%` }}
            />
          </div>
          <p>Battle {currentProperty + 1} of {propertyBattles.length}</p>
        </div>
      </div>
      
      <div className="content-text">
        <div className="battle-question">
          <h3>{currentBattle.question}</h3>
        </div>
        
        <div className="battle-options">
          {Object.entries(currentBattle.options).map(([key, option]) => (
            <div 
              key={key}
              className={`battle-choice ${
                selections[currentProperty] === key ? 'selected' : ''
              } ${
                selections[currentProperty] ? 'disabled' : ''
              }`}
              onClick={() => handleChoice(key)}
            >
              <div className="choice-header">
                <h4>{option.label}</h4>
              </div>
              <div className="choice-answer">
                <p>{option.answer}</p>
              </div>
              <div className={`choice-result ${option.pass ? 'pass' : 'fail'}`}>
                {option.pass ? '✅ Strong' : '❌ Weak'}
              </div>
            </div>
          ))}
        </div>
        
        {selections[currentProperty] && (
          <div className="battle-insight">
            <div className="insight-box">
              <h4>🎯 Battle Insight:</h4>
              <p>{currentBattle.insight}</p>
            </div>
          </div>
        )}
        
        <div className="current-scores">
          <h4>Current Scores:</h4>
          <div className="score-display">
            <span>🟠 Bitcoin: {scores.bitcoin}</span>
            <span>🥇 Gold: {scores.gold}</span>
            <span>💵 Fiat: {scores.fiat}</span>
          </div>
        </div>

        {selections[currentProperty] && (
          <div className="next-round-section">
            <ActionButton 
              onClick={handleNextRound}
              className="next-round-button pulsing-button"
            >
              {currentProperty < propertyBattles.length - 1 ? 
                `⚔️ Next Round: ${propertyBattles[currentProperty + 1].title} →` : 
                "🏆 See Final Results →"
              }
            </ActionButton>
          </div>
        )}
      </div>
    </div>
  );
};



// The Scarcity Revolution - Compelling Value Examples
const WhyScarcityMatters = ({ onComplete }) => {
  const [currentExample, setCurrentExample] = useState(0);
  const [userPrediction, setUserPrediction] = useState(null);
  const [showReality, setShowReality] = useState(false);

  // Two powerful examples that make scarcity visceral and personal
  const scarcityExamples = [
    {
      id: 'taylor_swift',
      title: 'The Taylor Swift Phenomenon',
      hook: '🎤 Taylor Swift announces surprise concert: 50,000 seats, 2.4 million people want tickets',
      setup: "Within minutes, Ticketmaster crashes. Fans wait 8+ hours online. Face value: $49-449. Resale prices hit $22,700 per ticket.",
      shockingFact: "A $49 nosebleed seat is selling for more than most people's car.",
      question: "What turned a $49 ticket into a $20,000+ treasure?",
      options: [
        { id: 'popularity', text: "Taylor Swift is just really popular", prediction: "It's about fame" },
        { id: 'scarcity', text: "Fixed supply + massive demand = extreme value", prediction: "Economics in action" },
        { id: 'manipulation', text: "Ticketmaster is manipulating prices", prediction: "It's rigged" },
        { id: 'crazy_fans', text: "Some fans have too much money", prediction: "People are irrational" }
      ],
      reality: {
        truth: "Scarcity is the ultimate value creator. 50,000 seats can't become 51,000 no matter how much demand exists. The harder something is to get, the more valuable it becomes.",
        connection: "Bitcoin works exactly like concert tickets: FIXED supply (21 million), but GROWING demand worldwide. The difference? Bitcoin's 'concert' never ends."
      },
      mindBlown: "💡 Mind = Blown: Bitcoin is like having front-row seats to the greatest financial revolution in history... and the venue can NEVER add more seats."
    },
    {
      id: 'digital_land',
      title: 'Digital Manhattan vs Infinite Plains',
      hook: '🏝️ Imagine two islands: Manhattan (fixed 22 square miles) vs. Magic Island (can expand infinitely)',
      setup: "Both start empty. People begin moving in. Manhattan fills up - rent skyrockets. Magic Island keeps expanding - rent stays cheap.",
      shockingFact: "Manhattan real estate averages $1,500 per square foot. Infinite land? Nearly worthless.",
      question: "Which island would you rather own property on?",
      options: [
        { id: 'manhattan', text: "Manhattan - my land value can only go up", prediction: "Scarcity wins" },
        { id: 'magic_island', text: "Magic Island - always room to grow", prediction: "Flexibility wins" },
        { id: 'both', text: "Both seem equally good", prediction: "No difference" },
        { id: 'depends', text: "Depends on other factors", prediction: "It's complicated" }
      ],
      reality: {
        truth: "Manhattan's value comes from what CAN'T be done: you can't make more land. Every dollar printed makes dollars less scarce. Every bitcoin that can't be created makes bitcoin more scarce.",
        connection: "US Dollars = Magic Island (infinite supply, declining value per unit). Bitcoin = Digital Manhattan (fixed supply, increasing value per unit)."
      },
      mindBlown: "🚀 Plot Twist: Bitcoin isn't just digital gold... it's digital Manhattan in a world where every other currency is Magic Island!"
    }
  ];

  const currentExample_data = scarcityExamples[currentExample];

  const handlePrediction = (optionId) => {
    setUserPrediction(optionId);
    setShowReality(true);
  };

  const handleContinue = () => {
    if (currentExample < scarcityExamples.length - 1) {
      setCurrentExample(currentExample + 1);
      setUserPrediction(null);
      setShowReality(false);
    } else {
      onComplete(3);
    }
    };

    return (
    <div className="step-content scarcity-revolution">
      <div className="module-header-box">
        <h2>💎 The Scarcity Secret</h2>
        <div className="intro-text">
          <p className="prime-text">🤯 You've seen Bitcoin DOMINATE the competition. But WHY is Bitcoin valuable? The answer will blow your mind...</p>
          <div className="transition-hook">
            <p className="hook-subtext">💡 Hint: It's the same reason Taylor Swift tickets sell for $22,700</p>
          </div>
        </div>
        </div>

      <div className="content-text">
        <div className="scarcity-example">
          <h3>{currentExample_data.title}</h3>
          
          <div className="scarcity-hook">
            <p className="hook-text">{currentExample_data.hook}</p>
          </div>
          
          {currentExample_data.setup && (
            <div className="setup-section">
              <p>{currentExample_data.setup}</p>
              <div className="shocking-fact">
                <p className="fact-highlight">🔥 {currentExample_data.shockingFact}</p>
              </div>
            </div>
          )}
          
          
          {currentExample_data.comparison && (
            <div className="comparison-display">
              <div className="comparison-grid">
                <div className="comparison-item dollar-system">
                  <h4>{currentExample_data.comparison.dollar.title}</h4>
                  <div className="comparison-details">
                    <div><strong>Supply:</strong> {currentExample_data.comparison.dollar.supply}</div>
                    <div><strong>Recent:</strong> {currentExample_data.comparison.dollar.recent}</div>
                    <div className="impact"><strong>Impact:</strong> {currentExample_data.comparison.dollar.yourShare}</div>
                  </div>
                </div>
                <div className="comparison-item bitcoin-system">
                  <h4>{currentExample_data.comparison.bitcoin.title}</h4>
                  <div className="comparison-details">
                    <div><strong>Supply:</strong> {currentExample_data.comparison.bitcoin.supply}</div>
                    <div><strong>Recent:</strong> {currentExample_data.comparison.bitcoin.recent}</div>
                    <div className="impact"><strong>Impact:</strong> {currentExample_data.comparison.bitcoin.yourShare}</div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div className="question-section">
            <h4>{currentExample_data.question}</h4>
            
            {!userPrediction && (
              <div className="prediction-options">
                {currentExample_data.options.map(option => (
                  <button
                    key={option.id}
                    className="prediction-option"
                    onClick={() => handlePrediction(option.id)}
                  >
                    <div className="option-text">{option.text}</div>
                    <div className="option-prediction">→ {option.prediction}</div>
                  </button>
                ))}
          </div>
        )}
              </div>
              
          {showReality && (
            <div className="reality-section">
              <div className="reality-truth">
                <h4>💡 The Reality:</h4>
                <p>{currentExample_data.reality.truth}</p>
            </div>

              <div className="bitcoin-connection">
                <h4>🟠 Bitcoin Connection:</h4>
                <p>{currentExample_data.reality.connection}</p>
              </div>
              
              <div className="mind-blown">
                <p className="mind-blown-text">{currentExample_data.mindBlown}</p>
              </div>

              <button className="continue-example-button epic-button" onClick={handleContinue}>
                {currentExample < scarcityExamples.length - 1 ? '🤯 Mind = Blown! Next Example →' : '🎓 I Get It! Complete Bitcoin Mastery →'}
              </button>
          </div>
        )}
      </div>
        
        <div className="example-progress">
          <div className="progress-dots">
            {scarcityExamples.map((_, index) => (
              <div 
                key={index}
                className={`progress-dot ${index === currentExample ? 'active' : ''} ${index < currentExample ? 'completed' : ''}`}
              />
            ))}
        </div>
          <p>Example {currentExample + 1} of {scarcityExamples.length}</p>
            </div>
          </div>
      </div>
    );
  };

// Module Completion Component
const BitcoinCompletion = ({ onComplete }) => {
    return (
    <div className="step-content completion-step">
      <div className="module-header-box">
        <h2>🎉 Bitcoin Fundamentals: Complete!</h2>
        <div className="intro-text">
          <p className="prime-text celebration-text">🎊 INCREDIBLE! You've just completed a journey that most people never take. You now understand what makes Bitcoin the most important financial innovation in human history!</p>
          <div className="achievement-highlight">
            <p className="milestone-text">🏆 You've gone from Bitcoin curious to Bitcoin convinced</p>
          </div>
        </div>
        </div>

      <div className="completion-content">
        <div className="achievement-summary">
          <h3>🏆 Bitcoin Benefits You've Mastered</h3>
          <div className="accomplishments-grid">
            <div className="accomplishment-item">
              <div className="accomplishment-icon">🛡️</div>
              <h4>Government Interference Protection</h4>
              <p>Bitcoin cannot be frozen, confiscated, or controlled by any authority</p>
              </div>
            <div className="accomplishment-item">
              <div className="accomplishment-icon">💎</div>
              <h4>Store of Value Protection</h4>
              <p>Fixed 21 million supply protects against inflation and money printing</p>
              </div>
            <div className="accomplishment-item">
              <div className="accomplishment-icon">💰</div>
              <h4>Lower Transaction Costs</h4>
              <p>Peer-to-peer transfers eliminate expensive banking intermediaries</p>
            </div>
            <div className="accomplishment-item">
              <div className="accomplishment-icon">⚡</div>
              <h4>Faster International Transfers</h4>
              <p>Global settlement in ~10 minutes vs 3-5 days with traditional banking</p>
            </div>
            <div className="accomplishment-item">
              <div className="accomplishment-icon">🔒</div>
              <h4>Enhanced Privacy & Security</h4>
              <p>Pseudonymous transactions without complete financial surveillance</p>
            </div>
            </div>
          </div>

        <div className="key-insights">
          <h3>💡 Core Bitcoin Advantages</h3>
          <div className="insights-list">
            <div className="insight-item">
              <span className="insight-number">1</span>
              <div className="insight-content">
                <h4>Bitcoin Fixes Fiat Currency's Fatal Flaws</h4>
                <p>Every problem with traditional money - from inflation to censorship to high fees - has a Bitcoin solution.</p>
                      </div>
                  </div>
            <div className="insight-item">
              <span className="insight-number">2</span>
              <div className="insight-content">
                <h4>Mathematical Rules Trump Political Rules</h4>
                <p>Bitcoin's code-based system eliminates human corruption and political manipulation of money.</p>
                </div>
                </div>
            <div className="insight-item">
              <span className="insight-number">3</span>
              <div className="insight-content">
                <h4>True Financial Sovereignty is Possible</h4>
                <p>For the first time in history, individuals can have complete control over their money without relying on institutions.</p>
            </div>
                </div>
            </div>
          </div>

        <div className="next-journey">
          <h3>🔮 Your Technical Journey Ahead</h3>
          <div className="next-journey-content">
            <p className="next-adventure">🚀 Now that you understand <em>WHY</em> Bitcoin is revolutionary, are you ready to discover <em>HOW</em> this digital magic actually works? The technical journey ahead will transform you from Bitcoin believer into Bitcoin expert!</p>
            
            <div className="upcoming-modules">
              <h4>🧮 Technical Deep Dive:</h4>
              <ul>
                <li><strong>Number Systems</strong> - How computers represent Bitcoin data</li>
                <li><strong>Cryptographic Hashing</strong> - Bitcoin's security foundation</li>
                <li><strong>Digital Signatures</strong> - How ownership is cryptographically proven</li>
                <li><strong>Mining & Consensus</strong> - How the network stays honest and secure</li>
              </ul>
        </div>

            <div className="call-to-adventure">
              <p className="ready-question epic-question"><strong>🔥 Are you ready to unlock Bitcoin's technical secrets and join the revolution?</strong></p>
              <p className="adventure-subtitle">⚡ The next modules will blow your mind...</p>
            </div>
            </div>
          </div>

        <ModuleCompletionButton 
          moduleName="Bitcoin Basics"
          moduleId="bitcoin-basics"
          customMessage="🚀 Outstanding! You now understand what makes Bitcoin revolutionary and different from traditional money!"
        />
      </div>
      </div>
    );
  };

// How Bitcoin Works (No Technical Jargon) - Simplified
const HowBitcoinWorks = ({ onComplete }) => {
  const [currentConcept, setCurrentConcept] = useState(0);
  const [userAnswer, setUserAnswer] = useState(null);
    const [showExplanation, setShowExplanation] = useState(false);

  // Focus on just the 3 most intuitive concepts
  const concepts = [
    {
      id: 'record_keeping',
      title: 'Keeping Track of Money',
      scenario: "Imagine you and 9 friends are sharing expenses for a group vacation. You need to track who paid for what and who owes money to whom.",
      question: "What's the most trustworthy way to keep track of everyone's payments?",
      options: [
        { id: 'one_person', text: "One person keeps a notebook with all transactions", risk: 'high' },
        { id: 'everyone', text: "Everyone keeps their own identical copy of all transactions", risk: 'low' },
        { id: 'bank', text: "Use a bank to track everything", risk: 'medium' },
        { id: 'memory', text: "Just remember who paid what", risk: 'very_high' }
      ],
      explanation: {
        correct: 'everyone',
        why: "When everyone has the same records, no one can cheat or 'lose' the notebook. This is exactly how Bitcoin works - thousands of people keep identical records of all Bitcoin transactions.",
        bankingAnalogy: "Banks keep ONE record that only they control. Bitcoin keeps THOUSANDS of identical records that everyone can verify.",
        bitcoinConnection: "Bitcoin's network is just thousands of computers all keeping the same transaction records, making it impossible for anyone to lie about balances."
      }
    },
    {
      id: 'consensus',
      title: 'Agreeing on What\'s True',
      scenario: "Your group vacation notebook shows you paid $100 for dinner. But what if someone claims you only paid $50?",
      question: "How do you prove what really happened?",
      options: [
        { id: 'majority', text: "Ask everyone - whatever most people remember is true", risk: 'low' },
        { id: 'authority', text: "One person decides who's right", risk: 'high' },
        { id: 'original', text: "Check the original receipt", risk: 'medium' },
        { id: 'fight', text: "Argue until someone gives up", risk: 'very_high' }
      ],
      explanation: {
        correct: 'majority',
        why: "When most people agree on the same facts, it's extremely hard for one person to lie successfully. Bitcoin uses this same principle.",
        bankingAnalogy: "Banks: 'Trust us, our computer says you have $X.' Bitcoin: '51% of thousands of computers agree you have X bitcoin.'",
        bitcoinConnection: "This is what 'consensus' means - the majority of Bitcoin computers must agree before any transaction is accepted as real."
      }
    },
    {
      id: 'attack_resistance',
      title: 'Why Bitcoin Can\'t Be Hacked',
      scenario: "Someone in your friend group wants to change the records to show they paid more than they actually did.",
      question: "Which system is harder to cheat?",
      options: [
        { id: 'one_book', text: "One person controls the notebook - just convince them", risk: 'very_high' },
        { id: 'many_books', text: "Everyone has a copy - need to convince majority", risk: 'low' },
        { id: 'no_books', text: "No written records - just argue loudly", risk: 'very_high' },
        { id: 'locked_book', text: "Locked notebook that one person controls", risk: 'high' }
      ],
      explanation: {
        correct: 'many_books',
        why: "To cheat when everyone has copies, you'd need to convince more than half the group to lie for you. Much harder than bribing one person!",
        bankingAnalogy: "Hack one bank = control all accounts. Hack Bitcoin = need to control thousands of computers simultaneously worldwide.",
        bitcoinConnection: "This is why Bitcoin has never been successfully hacked in 15 years. You'd need to control more computers than Amazon, Google, and Microsoft combined."
      }
    }
  ];

  const currentConcept_data = concepts[currentConcept];

  const handleAnswer = (optionId) => {
    setUserAnswer(optionId);
      setShowExplanation(true);
    };

  const handleContinue = () => {
    if (currentConcept < concepts.length - 1) {
      setCurrentConcept(currentConcept + 1);
      setUserAnswer(null);
      setShowExplanation(false);
    } else {
      onComplete(2);
    }
    };

    return (
    <div className="module-container">
      <div className="content-section">
        <div className="subtopic-container">
          <div className="subtopic-header">
            <InteractiveIcon type="bitcoin" size={32} className="subtopic-icon" />
            <h2 className="subtopic-title">How Bitcoin Actually Works</h2>
          </div>
        <div className="subtopic-content">
            <p className="content-body transition-text">🔥 Bitcoin just crushed the competition! But HOW does this digital money actually work? Let's demystify it with simple examples...</p>
            <div className="anticipation-builder">
              <p className="sub-hook">💡 Spoiler: It's simpler than you think, yet more brilliant than you can imagine</p>
            </div>
          </div>
        </div>

        <div className="quiz-container">
          <div className="quiz-header">
            <h3 className="content-tier-2">{currentConcept_data.title}</h3>
            <div className="scenario-text">
              <p className="content-body">{currentConcept_data.scenario}</p>
            </div>
          </div>
          
          <div className="question-section">
            <h4>{currentConcept_data.question}</h4>
            
            {!userAnswer && (
              <div className="quiz-options two-column">
                {currentConcept_data.options.map((option, index) => (
                  <div
                    key={option.id}
                    className={`quiz-option risk-${option.risk}`}
                    onClick={() => handleAnswer(option.id)}
                  >
                    {option.text}
                    <div className="option-indicator">{index + 1}</div>
                  </div>
                ))}
              </div>
            )}
              </div>

              {showExplanation && (
            <div className={`quiz-feedback ${userAnswer === currentConcept_data.explanation.correct ? 'correct' : 'incorrect'}`}>
              <div className="feedback-text">
                <p><strong>You chose:</strong> "{currentConcept_data.options.find(opt => opt.id === userAnswer)?.text}"</p>
                {userAnswer === currentConcept_data.explanation.correct ? (
                  <p>✅ <strong>Excellent choice!</strong> You understand this concept well.</p>
                ) : (
                  <p>🤔 <strong>Let's explore this further.</strong> Here's why another option might work better:</p>
                )}
              </div>
              
              <div className="explanation-text">
                <div className="correct-answer">
                  <strong>💡 Why this matters:</strong> {currentConcept_data.explanation.why}
                </div>
                
                <div className="learning-point">
                  <strong>🏦 Banking vs Bitcoin:</strong> {currentConcept_data.explanation.bankingAnalogy}
                </div>
                
                <div className="bitcoin-connection">
                  <strong>🟠 Bitcoin Connection:</strong> {currentConcept_data.explanation.bitcoinConnection}
                </div>
              </div>

              <ActionButton className="continue-button mastery-button" onClick={handleContinue}>
                {currentConcept < concepts.length - 1 ? '🧠 Got It! Next Concept →' : '💎 Now I Need to Know WHY It\'s Valuable →'}
              </ActionButton>
          </div>
        )}
        </div>
        
        <div className="progress-indicator">
          <div className="progress-dots">
            {concepts.map((_, index) => (
              <div 
                key={index}
                className={`progress-dot ${index === currentConcept ? 'active' : ''} ${index < currentConcept ? 'completed' : ''}`}
              />
            ))}
          </div>
          <p>Concept {currentConcept + 1} of {concepts.length}</p>
        </div>
      </div>
          </div>
        );
  };

const BitcoinBasicsModule = () => {
  const { completeModule } = useProgress();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(() => {
    const saved = localStorage.getItem('bitcoinBasicsCompletedSteps');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  const handleStepComplete = (stepIndex) => {
    const newCompletedSteps = new Set(completedSteps).add(stepIndex);
    setCompletedSteps(newCompletedSteps);
    
    // Save to localStorage
    try {
      localStorage.setItem('bitcoinBasicsCompletedSteps', JSON.stringify(Array.from(newCompletedSteps)));
    } catch (error) {
      console.warn('Failed to save progress to localStorage:', error);
    }
    
    // Show achievements
    if (stepIndex === 1) {
      showAchievement("Bitcoin Basics", "You understand how Bitcoin compares to traditional banking!");
    } else if (stepIndex === 2) {
      showAchievement("Consensus Master", "You understand how Bitcoin reaches agreement!");
    } else if (stepIndex === 3) {
      showAchievement("Value Insights", "You understand why scarcity creates value!");
    }
    
    // Move to next step or complete module
    if (stepIndex < 4) {
      setCurrentStep(stepIndex + 1);
    } else {
      // Module completion is handled by ModuleCompletionButton
      setCurrentStep(stepIndex + 1);
    }
  };

  const showAchievement = (title, description) => {
    const achievement = document.createElement('div');
    achievement.className = 'achievement-popup';
    achievement.innerHTML = `
      <div class="achievement-content">
        <div class="achievement-icon">🏆</div>
        <div class="achievement-text">
          <h4>${title}</h4>
          <p>${description}</p>
        </div>
        <div class="achievement-controls">
          <button class="achievement-dismiss" onclick="this.closest('.achievement-popup').remove()">
              Continue
          </button>
          </div>
      </div>
      <div class="achievement-hint">Click to dismiss or wait 6 seconds...</div>
    `;
    document.body.appendChild(achievement);
    
    achievement.addEventListener('click', () => {
      achievement.style.opacity = '0';
      setTimeout(() => {
        if (document.body.contains(achievement)) {
          document.body.removeChild(achievement);
        }
      }, 300);
    });
    
    setTimeout(() => {
      if (document.body.contains(achievement)) {
        achievement.style.opacity = '0';
        setTimeout(() => {
          if (document.body.contains(achievement)) {
            document.body.removeChild(achievement);
          }
        }, 300);
      }
    }, 6000);
  };

// Steps used for tracking module progress
const steps = [
    { id: 0, title: "Money Problems", icon: "💸", completed: completedSteps.has(0) },
    { id: 1, title: "Who Controls Money?", icon: "🤔", completed: completedSteps.has(1) },
    { id: 2, title: "Big Questions", icon: "❓", completed: completedSteps.has(2) },
    { id: 3, title: "What Is Bitcoin?", icon: "🟠", completed: completedSteps.has(3) },
    { id: 4, title: "Complete", icon: "🎉", completed: completedSteps.has(4) }
  ];

  const handleTabClick = (stepIndex) => {
    setCurrentStep(stepIndex);
  };

  return (
    <div className="module-container">
      {/* HERO SECTION - World-class design principles */}
      <div className="module-header">
        <div className="module-title">
          <div className="module-icon">
            <InteractiveIcon type="bitcoin" size={48} className="module-icon-bitcoin" />
          </div>
Your Money is Broken
        </div>
        <div className="module-subtitle">
          Discover why traditional money doesn't work - and what does
        </div>
      </div>
      
      {/* TERTIARY: Navigation Steps - Medium Importance */}
      <div className="section-card">
        <h3 className="nav-section-title">Learning Path</h3>
        <div className="step-navigation-container">
          <div className="step-navigation-scroll">
          {["Money Problems", "Who Controls Money?", "Big Questions", "What Is Bitcoin?", "Complete"].map((step, index) => (
            <button
              key={index}
              className={`step-nav-button ${
                index === currentStep ? 'current' : ''
              } ${completedSteps.has(index) ? 'completed' : ''}`}
              onClick={() => handleTabClick(index)}
            >
              <span className="step-nav-number">
                {completedSteps.has(index) ? '✓' : index + 1}
              </span>
              <span className="step-nav-label">{step}</span>
            </button>
          ))}
          </div>
        </div>
      </div>
      
      <div className="module-content">
        {currentStep === 0 && <GroceryStoreShock onComplete={handleStepComplete} />}
        {currentStep === 1 && <TheControlQuestion onComplete={handleStepComplete} />}
        {currentStep === 2 && <SocraticQuestions onComplete={handleStepComplete} />}
        {currentStep === 3 && <WhatIsBitcoin onComplete={handleStepComplete} />}
        {currentStep === 4 && <BitcoinCompletion onComplete={handleStepComplete} />}
      </div>
    </div>
  );
};

export default BitcoinBasicsModule; 