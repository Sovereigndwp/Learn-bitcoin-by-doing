import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '../../contexts/ProgressContext';
import { 
  ActionButton,
  StepNavigation
} from '../../components/EnhancedButtons';
import { ModuleCompletionButton } from '../../components/ui';
import { 
  ArrowRight, Clock, Coins, CreditCard, Globe, 
  DollarSign, Shuffle, Users, Target, ChevronRight
} from 'lucide-react';
import '../ModuleCommon.css';

// Timeline: barter → commodity money → gold coins → paper backed by gold → fiat → Bitcoin
const MoneyJourneyModule = ({ moduleId = 'money-journey' }) => {
  const navigate = useNavigate();
  const { updateModuleProgress, completeModule } = useProgress();
  const [currentStep, setCurrentStep] = useState(0);
  const [timelineOrder, setTimelineOrder] = useState([]);
  const [showQuiz, setShowQuiz] = useState(false);

  const steps = [
    'The Barter Problem',
    'Commodity Money Era', 
    'The Age of Gold',
    'Paper Promise Era',
    'Fiat Money Today',
    'Bitcoin: Digital Gold 3.0'
  ];

  const moneyEvolution = [
    {
      era: "Barter System",
      period: "Ancient Times",
      description: "Direct trade of goods and services",
      example: "A→B→C→D dead-end trade problem",
      visual: "🔄",
      problem: "Coincidence of wants - you have apples, need shoes, but shoemaker wants bread",
      solution: "Led to search for common medium of exchange"
    },
    {
      era: "Commodity Money", 
      period: "3000 BCE - 600 BCE",
      description: "Valuable goods used as money",
      example: "Salt, cattle, shells, grains",
      visual: "🐄",
      problem: "Cattle hard to divide, salt deteriorates, shells not portable",
      solution: "Needed something scarce, durable, divisible"
    },
    {
      era: "Gold Standard",
      period: "600 BCE - 1971 CE", 
      description: "Gold coins and gold-backed currency",
      example: "Gold coins → Gold certificates → Gold-backed dollars",
      visual: "🪙",
      problem: "Heavy to transport, difficult to verify purity",
      solution: "Banks issued paper receipts backed by gold"
    },
    {
      era: "Fiat Money",
      period: "1971 - Present",
      description: "Government-issued currency not backed by commodities",
      example: "US Dollar, Euro, Yen",
      visual: "💵", 
      problem: "Unlimited printing leads to inflation and debasement",
      solution: "Central banks promise 'stability' through monetary policy"
    },
    {
      era: "Bitcoin Era",
      period: "2009 - Future",
      description: "Decentralized digital money with fixed supply",
      example: "21 million Bitcoin maximum supply",
      visual: "₿",
      problem: "Solves scarcity, portability, divisibility, and verification",
      solution: "Combines best of gold (scarcity) with digital benefits"
    }
  ];

  const handleStepComplete = (stepIndex) => {
    const nextStep = stepIndex + 1;
    setCurrentStep(nextStep);
    updateModuleProgress(moduleId, Math.round((nextStep / steps.length) * 100));
  };

  const handleModuleComplete = () => {
    completeModule(moduleId);
    navigate('/');
  };

  const handleTimelineDrop = (era, position) => {
    const newOrder = [...timelineOrder];
    newOrder[position] = era;
    setTimelineOrder(newOrder);
    
    if (newOrder.length === moneyEvolution.length && !newOrder.includes(undefined)) {
      setShowQuiz(true);
    }
  };

  return (
    <div className="module-container">
      <div className="module-header">
        <h1>🚀 The Journey of Money: From Rocks to Digital</h1>
        <p>Explore how money evolved to solve human problems - and where it's heading next</p>
        <StepNavigation 
          steps={steps} 
          currentStep={currentStep}
          onStepClick={setCurrentStep}
        />
      </div>

      <div className="module-content">
        {currentStep === 0 && (
          <BarterProblem onComplete={() => handleStepComplete(0)} />
        )}
        
        {currentStep === 1 && (
          <CommodityMoney onComplete={() => handleStepComplete(1)} />
        )}
        
        {currentStep === 2 && (
          <GoldAge onComplete={() => handleStepComplete(2)} />
        )}
        
        {currentStep === 3 && (
          <PaperPromise onComplete={() => handleStepComplete(3)} />
        )}
        
        {currentStep === 4 && (
          <FiatToday onComplete={() => handleStepComplete(4)} />
        )}
        
        {currentStep === 5 && (
          <BitcoinEra 
            onComplete={handleModuleComplete}
            timelineOrder={timelineOrder}
            showQuiz={showQuiz}
            onTimelineDrop={handleTimelineDrop}
          />
        )}
      </div>
    </div>
  );
};

// Component 1: The Barter Problem
const BarterProblem = ({ onComplete }) => {
  const [showSolution, setShowSolution] = useState(false);

  return (
    <div className="section-card">
      <div className="era-header">
        <div className="era-visual">🔄</div>
        <h2>The Barter Problem</h2>
        <p className="era-period">The Beginning of Trade</p>
      </div>

      <div className="barter-scenario">
        <h3>Imagine you're a farmer in ancient times...</h3>
        
        <div className="trade-chain">
          <div className="trade-step">
            <Users size={32} />
            <p><strong>You:</strong> Have apples, need shoes</p>
          </div>
          
          <ArrowRight size={24} className="trade-arrow" />
          
          <div className="trade-step">
            <Users size={32} />
            <p><strong>Shoemaker:</strong> Has shoes, needs bread</p>
          </div>
          
          <ArrowRight size={24} className="trade-arrow" />
          
          <div className="trade-step">
            <Users size={32} />
            <p><strong>Baker:</strong> Has bread, needs cloth</p>
          </div>
          
          <ArrowRight size={24} className="trade-arrow" />
          
          <div className="trade-step">
            <Users size={32} />
            <p><strong>Weaver:</strong> Has cloth, needs... apples?</p>
          </div>
        </div>

        <div className="problem-highlight">
          <h4>The Dead-End Problem</h4>
          <p>What if the weaver doesn't want apples? Your trade chain breaks down. You can't get shoes, even though you have valuable apples.</p>
          <p><strong>This is the "Coincidence of Wants" problem.</strong></p>
        </div>

        {!showSolution && (
          <ActionButton onClick={() => setShowSolution(true)} variant="primary">
            What Did Ancient People Do? →
          </ActionButton>
        )}

        {showSolution && (
          <div className="solution-reveal">
            <div className="solution-box">
              <Target size={24} />
              <div>
                <h4>The Solution: Find Something Everyone Wants</h4>
                <p>Ancient people discovered they needed a <strong>common medium of exchange</strong> - something valuable that everyone would accept in trade.</p>
                <p>This was the birth of <strong>money</strong>.</p>
              </div>
            </div>
            
            <ActionButton onClick={onComplete} variant="success">
              See What They Chose →
            </ActionButton>
          </div>
        )}
      </div>
    </div>
  );
};

// Component 2: Commodity Money
const CommodityMoney = ({ onComplete }) => {
  const [selectedCommodity, setSelectedCommodity] = useState(null);
  
  const commodities = [
    { 
      name: "Cattle", 
      visual: "🐄", 
      pros: ["Valuable", "Self-reproducing", "Mobile"],
      cons: ["Hard to divide", "Dies", "Requires feeding"],
      verdict: "Good value, terrible divisibility"
    },
    {
      name: "Salt",
      visual: "🧂",
      pros: ["Universally desired", "Preserves food", "Divisible"],
      cons: ["Dissolves in rain", "Heavy", "Can be contaminated"], 
      verdict: "Useful but not durable"
    },
    {
      name: "Shells",
      visual: "🐚", 
      pros: ["Portable", "Durable", "Easy to count"],
      cons: ["Not rare enough", "Only near oceans", "Fragile"],
      verdict: "Portable but lacks scarcity"
    },
    {
      name: "Gold",
      visual: "🪙",
      pros: ["Rare", "Doesn't corrode", "Divisible", "Universally valued"],
      cons: ["Heavy", "Hard to verify purity", "Difficult to transport"],
      verdict: "Nearly perfect - just physical limitations"
    }
  ];

  return (
    <div className="section-card">
      <div className="era-header">
        <div className="era-visual">🐄</div>
        <h2>Commodity Money Era</h2>
        <p className="era-period">3000 BCE - 600 BCE</p>
      </div>

      <div className="commodity-selection">
        <h3>What Made Good Commodity Money?</h3>
        <p>Different civilizations tried different valuable goods. Click to examine each:</p>
        
        <div className="commodity-grid">
          {commodities.map((commodity, index) => (
            <div 
              key={index}
              className={`commodity-card ${selectedCommodity === index ? 'selected' : ''}`}
              onClick={() => setSelectedCommodity(index)}
            >
              <div className="commodity-visual">{commodity.visual}</div>
              <h4>{commodity.name}</h4>
            </div>
          ))}
        </div>

        {selectedCommodity !== null && (
          <div className="commodity-analysis">
            <div className="analysis-header">
              <span className="commodity-visual">{commodities[selectedCommodity].visual}</span>
              <h4>{commodities[selectedCommodity].name} Analysis</h4>
            </div>
            
            <div className="pros-cons">
              <div className="pros">
                <h5>✅ Advantages:</h5>
                <ul>
                  {commodities[selectedCommodity].pros.map((pro, idx) => (
                    <li key={idx}>{pro}</li>
                  ))}
                </ul>
              </div>
              
              <div className="cons">
                <h5>❌ Problems:</h5>
                <ul>
                  {commodities[selectedCommodity].cons.map((con, idx) => (
                    <li key={idx}>{con}</li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="verdict">
              <strong>Verdict:</strong> {commodities[selectedCommodity].verdict}
            </div>
          </div>
        )}

        {selectedCommodity === 3 && (
          <div className="transition-hint">
            <Coins size={24} />
            <div>
              <h4>Gold Emerged as the Winner</h4>
              <p>Gold came closest to being perfect money. It just had one problem - the physical world limitations.</p>
            </div>
            <ActionButton onClick={onComplete} variant="primary">
              Enter the Age of Gold →
            </ActionButton>
          </div>
        )}
      </div>
    </div>
  );
};

// Component 3: Gold Age
const GoldAge = ({ onComplete }) => {
  return (
    <div className="section-card">
      <div className="era-header">
        <div className="era-visual">🪙</div>
        <h2>The Age of Gold</h2>
        <p className="era-period">600 BCE - 1971 CE (2,500+ years!)</p>
      </div>

      <div className="gold-timeline">
        <h3>Gold's Long Reign</h3>
        
        <div className="timeline-events">
          <div className="timeline-event">
            <div className="event-year">600 BCE</div>
            <div className="event-content">
              <h4>First Gold Coins</h4>
              <p>Lydians mint first standardized gold coins - no more weighing!</p>
            </div>
          </div>
          
          <div className="timeline-event">
            <div className="event-year">1792</div>
            <div className="event-content">
              <h4>US Gold Standard</h4>
              <p>$1 = 1/20 ounce of gold. Paper dollars backed by gold.</p>
            </div>
          </div>
          
          <div className="timeline-event">
            <div className="event-year">1933</div>
            <div className="event-content">
              <h4>Gold Confiscation</h4>
              <p>FDR bans private gold ownership, devalues dollar by 40%.</p>
            </div>
          </div>
          
          <div className="timeline-event">
            <div className="event-year">1971</div>
            <div className="event-content">
              <h4>Nixon Shock</h4>
              <p>"Temporarily" closes gold window. 50+ years later, still closed.</p>
            </div>
          </div>
        </div>

        <div className="gold-legacy">
          <h4>Why Gold Worked for 2,500 Years</h4>
          <div className="gold-properties">
            <div className="property">✅ <strong>Scarce:</strong> Hard to find and mine</div>
            <div className="property">✅ <strong>Durable:</strong> Doesn't rust or decay</div>
            <div className="property">✅ <strong>Divisible:</strong> Can be melted and reformed</div>
            <div className="property">✅ <strong>Fungible:</strong> One ounce = one ounce</div>
            <div className="property">⚠️ <strong>Portable:</strong> Heavy and bulky</div>
            <div className="property">⚠️ <strong>Verifiable:</strong> Requires expertise to test purity</div>
          </div>
        </div>

        <ActionButton onClick={onComplete} variant="primary">
          What Happened After Gold? →
        </ActionButton>
      </div>
    </div>
  );
};

// Component 4: Paper Promise Era  
const PaperPromise = ({ onComplete }) => {
  return (
    <div className="section-card">
      <div className="era-header">
        <div className="era-visual">📜</div>
        <h2>Paper Promise Era</h2>
        <p className="era-period">1600s - 1971</p>
      </div>

      <div className="paper-evolution">
        <h3>The Convenience Revolution</h3>
        
        <div className="paper-story">
          <div className="story-step">
            <div className="step-icon">🏦</div>
            <div className="step-content">
              <h4>Banks Store Your Gold</h4>
              <p>Instead of carrying heavy gold, you deposit it with goldsmiths (early banks). They give you a paper receipt.</p>
            </div>
          </div>
          
          <ChevronRight size={24} className="step-arrow" />
          
          <div className="story-step">
            <div className="step-icon">📄</div>
            <div className="step-content">
              <h4>Paper Receipts Circulate</h4>
              <p>People start trading the paper receipts instead of gold. Much easier! The receipts are "as good as gold."</p>
            </div>
          </div>
          
          <ChevronRight size={24} className="step-arrow" />
          
          <div className="story-step">
            <div className="step-icon">🏛️</div>
            <div className="step-content">
              <h4>Governments Take Over</h4>
              <p>Governments create central banks to issue "official" paper money, still backed by gold.</p>
            </div>
          </div>
          
          <ChevronRight size={24} className="step-arrow" />
          
          <div className="story-step">
            <div className="step-icon">💸</div>
            <div className="step-content">
              <h4>The Temptation</h4>
              <p>Governments realize they can print more paper than they have gold. "Just a little more, for emergencies..."</p>
            </div>
          </div>
        </div>

        <div className="temptation-box">
          <h4>🎭 The Fatal Temptation</h4>
          <p>Paper money worked perfectly - until governments realized they could print more paper receipts than they had gold to back them.</p>
          <p><strong>What could go wrong?</strong></p>
        </div>

        <ActionButton onClick={onComplete} variant="warning">
          Find Out What Happened →
        </ActionButton>
      </div>
    </div>
  );
};

// Component 5: Fiat Today
const FiatToday = ({ onComplete }) => {
  return (
    <div className="section-card">
      <div className="era-header">
        <div className="era-visual">💵</div>
        <h2>Fiat Money Today</h2>
        <p className="era-period">1971 - Present</p>
      </div>

      <div className="fiat-reality">
        <h3>The Great Experiment</h3>
        
        <div className="nixon-moment">
          <div className="historical-quote">
            <Clock size={20} />
            <div>
              <p><strong>August 15, 1971</strong></p>
              <p><em>"I have directed Secretary Connally to suspend temporarily the convertibility of the dollar into gold."</em></p>
              <p>- President Nixon</p>
            </div>
          </div>
          
          <div className="temporary-note">
            <p><strong>"Temporarily"</strong> - 50+ years and counting...</p>
          </div>
        </div>

        <div className="fiat-characteristics">
          <h4>What is Fiat Money?</h4>
          <div className="characteristic">
            <strong>Fiat:</strong> Latin for "let it be done" - money by government decree
          </div>
          <div className="characteristic">
            <strong>Not backed by:</strong> Gold, silver, or any physical commodity
          </div>
          <div className="characteristic">
            <strong>Backed by:</strong> Government promise and "full faith and credit"
          </div>
          <div className="characteristic">
            <strong>Supply:</strong> Whatever the central bank decides to print
          </div>
        </div>

        <div className="fiat-stats">
          <h4>The Fiat Track Record</h4>
          <div className="stat-grid">
            <div className="stat-card">
              <div className="stat-number">$100</div>
              <div className="stat-label">in 1971</div>
              <div className="stat-comparison">= $600+ today</div>
              <div className="stat-note">84% loss of purchasing power</div>
            </div>
            
            <div className="stat-card">
              <div className="stat-number">0%</div>
              <div className="stat-label">Fiat currencies</div>
              <div className="stat-comparison">survived long-term</div>
              <div className="stat-note">All eventually fail</div>
            </div>
          </div>
        </div>

        <div className="digital-transition">
          <Globe size={24} />
          <div>
            <h4>Enter the Digital Age</h4>
            <p>Today, 95%+ of money is digital numbers in bank computers. Physical cash is disappearing. What happens when money is purely digital?</p>
          </div>
        </div>

        <ActionButton onClick={onComplete} variant="primary">
          Discover Bitcoin: Digital Gold 3.0 →
        </ActionButton>
      </div>
    </div>
  );
};

// Component 6: Bitcoin Era
const BitcoinEra = ({ onComplete, timelineOrder, showQuiz, onTimelineDrop }) => {
  return (
    <div className="section-card">
      <div className="era-header">
        <div className="era-visual">₿</div>
        <h2>Bitcoin: Digital Gold 3.0</h2>
        <p className="era-period">2009 - Future</p>
      </div>

      <div className="bitcoin-evolution">
        <h3>Three Ages of Money</h3>
        
        <div className="ages-comparison">
          <div className="age-card">
            <div className="age-header">
              <span className="age-visual">🪙</span>
              <h4>Gold 1.0</h4>
              <p>Physical Scarcity</p>
            </div>
            <div className="age-pros">
              ✅ Scarce<br/>
              ✅ Durable<br/>
              ❌ Hard to transport<br/>
              ❌ Hard to verify
            </div>
          </div>
          
          <div className="age-card">
            <div className="age-header">
              <span className="age-visual">💵</span>
              <h4>Fiat 2.0</h4>
              <p>Digital Convenience</p>
            </div>
            <div className="age-pros">
              ✅ Easy to transport<br/>
              ✅ Digital payments<br/>
              ❌ Unlimited printing<br/>
              ❌ Government control
            </div>
          </div>
          
          <div className="age-card bitcoin-card">
            <div className="age-header">
              <span className="age-visual">₿</span>
              <h4>Bitcoin 3.0</h4>
              <p>Digital Scarcity</p>
            </div>
            <div className="age-pros">
              ✅ Scarce (21M limit)<br/>
              ✅ Digital transport<br/>
              ✅ Instant verification<br/>
              ✅ No central control
            </div>
          </div>
        </div>

        <div className="bitcoin-breakthrough">
          <h4>The Breakthrough: Digital Scarcity</h4>
          <p>For the first time in history, we can have digital money that is:</p>
          <div className="breakthrough-features">
            <div className="feature">🔒 <strong>Impossible to counterfeit</strong> - cryptographically secure</div>
            <div className="feature">📏 <strong>Precisely limited</strong> - 21 million maximum, forever</div>
            <div className="feature">🌍 <strong>Instantly verifiable</strong> - anyone can check the blockchain</div>
            <div className="feature">⚡ <strong>Globally transferable</strong> - send anywhere in minutes</div>
          </div>
        </div>

        <div className="analogy-box">
          <h4>Simple Analogy: Digital Gold with a Jetpack</h4>
          <p>Bitcoin combines the scarcity of gold with the convenience of digital payments. It's like gold that you can email.</p>
        </div>

        <ModuleCompletionButton onClick={onComplete}>
          Complete Journey: What Makes Good Money →
        </ModuleCompletionButton>
      </div>
    </div>
  );
};

export default MoneyJourneyModule;
