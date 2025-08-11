import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '../../contexts/ProgressContext';
import { 
  ActionButton,
  StepNavigation
} from '../../components/EnhancedButtons';
import { ModuleCompletionButton } from '../../components/ui';
import { 
  AlertTriangle, TrendingDown, Building2, Users, Eye,
  DollarSign, Clock, Target, Zap, ArrowDown, X,
  ChevronRight, Home, Baby, Briefcase, Heart
} from 'lucide-react';
import '../ModuleCommon.css';

const MoneyGoesBadModule = ({ moduleId = 'money-goes-bad' }) => {
  const navigate = useNavigate();
  const { updateModuleProgress, completeModule } = useProgress();
  const [currentStep, setCurrentStep] = useState(0);
  const [revealedConsequences, setRevealedConsequences] = useState({});
  const [mappedFailures, setMappedFailures] = useState({});

  const steps = [
    'The Pattern of Money Failure',
    'Case Study: The Gold Standard Breaks',
    'Case Study: The 2008 Banking Crisis', 
    'Case Study: Cyprus Bail-In',
    'Mapping Failures to Properties',
    'The Inevitability of Failure'
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

  const revealConsequence = (caseId, consequenceId) => {
    setRevealedConsequences(prev => ({
      ...prev,
      [`${caseId}-${consequenceId}`]: true
    }));
  };

  const mapFailure = (failureId, mappingData) => {
    setMappedFailures(prev => ({
      ...prev,
      [failureId]: mappingData
    }));
  };

  return (
    <div className="module-container">
      <div className="module-header">
        <h1>💥 When Good Money Goes Bad</h1>
        <p>Case studies of money failures and the devastating patterns that lead to financial crisis</p>
        <StepNavigation 
          steps={steps} 
          currentStep={currentStep}
          onStepClick={setCurrentStep}
        />
      </div>

      <div className="module-content">
        {currentStep === 0 && (
          <FailurePattern onComplete={() => handleStepComplete(0)} />
        )}
        
        {currentStep === 1 && (
          <GoldStandardBreaks 
            onComplete={() => handleStepComplete(1)}
            onRevealConsequence={revealConsequence}
            revealedConsequences={revealedConsequences}
          />
        )}
        
        {currentStep === 2 && (
          <BankingCrisis2008 
            onComplete={() => handleStepComplete(2)}
            onRevealConsequence={revealConsequence}
            revealedConsequences={revealedConsequences}
          />
        )}
        
        {currentStep === 3 && (
          <CyprusBailIn 
            onComplete={() => handleStepComplete(3)}
            onRevealConsequence={revealConsequence}
            revealedConsequences={revealedConsequences}
          />
        )}
        
        {currentStep === 4 && (
          <FailureMapping 
            onComplete={() => handleStepComplete(4)}
            onMapFailure={mapFailure}
            mappedFailures={mappedFailures}
          />
        )}
        
        {currentStep === 5 && (
          <InevitabilityOfFailure onComplete={handleModuleComplete} />
        )}
      </div>
    </div>
  );
};

// Component 1: The Pattern of Money Failure
const FailurePattern = ({ onComplete }) => {
  const [currentPattern, setCurrentPattern] = useState(0);

  const failurePatterns = [
    {
      title: "The Temptation Pattern",
      description: "Those who control money supply face irresistible pressure to increase it",
      examples: [
        "🏛️ Governments need funding for wars, welfare, infrastructure",
        "🏦 Banks profit from lending money that doesn't exist", 
        "📊 Politicians promise benefits without raising taxes"
      ],
      consequence: "Every fiat currency in history has eventually failed"
    },
    {
      title: "The Gradual Then Sudden Pattern", 
      description: "Money degradation happens slowly, then all at once",
      examples: [
        "📈 Small inflation seems manageable (2-3% per year)",
        "🔥 Crisis accelerates the printing (20-50% per year)",
        "💥 Hyperinflation destroys the currency (1000%+ per year)"
      ],
      consequence: "By the time people notice, it's too late to escape"
    },
    {
      title: "The Trust Erosion Pattern",
      description: "Once trust is broken, it's nearly impossible to restore",
      examples: [
        "🤝 People initially trust the 'temporary' measures",
        "😕 Doubt creeps in as promises are repeatedly broken",
        "🏃‍♂️ Mass exodus to alternative stores of value"
      ],
      consequence: "Currency collapse becomes self-fulfilling prophecy"
    }
  ];

  const nextPattern = () => {
    if (currentPattern < failurePatterns.length - 1) {
      setCurrentPattern(currentPattern + 1);
    } else {
      setCurrentPattern(0);
    }
  };

  const pattern = failurePatterns[currentPattern];

  return (
    <div className="section-card">
      <div className="pattern-header">
        <AlertTriangle size={48} className="section-icon danger" />
        <h2>The Universal Patterns of Money Failure</h2>
        <p>Throughout history, the same patterns repeat across different cultures and time periods</p>
      </div>

      <div className="pattern-showcase">
        <div className="pattern-card">
          <div className="pattern-title">
            <Target size={24} />
            <h3>{pattern.title}</h3>
          </div>
          
          <div className="pattern-description">
            <p>{pattern.description}</p>
          </div>

          <div className="pattern-examples">
            <h4>How It Manifests:</h4>
            {pattern.examples.map((example, index) => (
              <div key={index} className="example-item">
                {example}
              </div>
            ))}
          </div>

          <div className="pattern-consequence">
            <div className="consequence-header">
              <X size={20} />
              <strong>Inevitable Result:</strong>
            </div>
            <p>{pattern.consequence}</p>
          </div>
        </div>

        <div className="pattern-navigation">
          <ActionButton onClick={nextPattern} variant="secondary">
            {currentPattern < failurePatterns.length - 1 ? 'Next Pattern' : 'Back to Start'} →
          </ActionButton>
          
          {currentPattern === failurePatterns.length - 1 && (
            <ActionButton onClick={onComplete} variant="danger">
              See These Patterns in Action →
            </ActionButton>
          )}
        </div>

        <div className="pattern-indicator">
          <p>Pattern {currentPattern + 1} of {failurePatterns.length}</p>
          <div className="pattern-dots">
            {failurePatterns.map((_, index) => (
              <span 
                key={index} 
                className={`dot ${index === currentPattern ? 'active' : ''}`}
                onClick={() => setCurrentPattern(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Component 2: Gold Standard Breaks
const GoldStandardBreaks = ({ onComplete, onRevealConsequence, revealedConsequences }) => {
  const [currentPhase, setCurrentPhase] = useState(0);

  const goldStandardBreakdown = [
    {
      phase: "The Setup (1792-1933)",
      title: "Gold Standard Works",
      description: "US Dollar backed by gold at $20.67 per ounce",
      details: "People trust paper dollars because they can be redeemed for gold",
      stability: "Prices remain relatively stable for 140+ years"
    },
    {
      phase: "The Crack (1933)",
      title: "Emergency Gold Confiscation", 
      description: "FDR bans private gold ownership, devalues dollar 40%",
      details: "Executive Order 6102 makes owning gold illegal for Americans",
      stability: "First major breach of trust - government seizes gold, pays in devalued paper"
    },
    {
      phase: "The Patch (1944-1971)",
      title: "Bretton Woods System",
      description: "Only foreign governments can redeem dollars for gold",
      details: "US promises other countries $35 per ounce while printing more dollars",
      stability: "Hidden inflation as dollars in circulation exceed gold reserves"
    },
    {
      phase: "The Break (1971)",
      title: "Nixon Closes Gold Window",
      description: '"Temporarily" suspends gold convertibility',
      details: "France demands gold for dollars, exposing the bankruptcy",
      stability: "50+ years later, 'temporary' measure still in effect"
    }
  ];

  const consequences = [
    {
      id: 'families',
      icon: <Home size={24} />,
      title: 'American Families',
      immediate: 'Forced to turn in gold or face 10 years in prison',
      longTerm: '$100 in 1971 needs $600+ today to buy the same goods',
      revelation: 'Lifetime savings eroded by 84% through "hidden taxation"'
    },
    {
      id: 'savers',
      icon: <Briefcase size={24} />,
      title: 'Retirement Savers', 
      immediate: 'Pension funds measured in dollars, not purchasing power',
      longTerm: 'Fixed incomes decimated by decades of inflation',
      revelation: '"Safe" government bonds guaranteed to lose money'
    },
    {
      id: 'global',
      icon: <Target size={24} />,
      title: 'Global Economy',
      immediate: 'World forced onto pure fiat system overnight',
      longTerm: 'Boom-bust cycles, financial crises every decade',
      revelation: 'All currencies now race to the bottom together'
    }
  ];

  const handleRevealConsequence = (consequenceId) => {
    onRevealConsequence('gold-standard', consequenceId);
  };

  return (
    <div className="section-card">
      <div className="case-header">
        <TrendingDown size={48} className="section-icon danger" />
        <h2>Case Study: The Gold Standard Breaks (1933-1971)</h2>
        <p>How the world's most successful money system was gradually dismantled</p>
      </div>

      <div className="timeline-breakdown">
        <h3>The 4-Phase Breakdown</h3>
        <div className="breakdown-timeline">
          {goldStandardBreakdown.map((item, index) => (
            <div 
              key={index}
              className={`timeline-item ${currentPhase === index ? 'active' : ''}`}
              onClick={() => setCurrentPhase(index)}
            >
              <div className="phase-marker">{index + 1}</div>
              <div className="phase-content">
                <div className="phase-label">{item.phase}</div>
                <h4>{item.title}</h4>
                <p>{item.description}</p>
                {currentPhase === index && (
                  <div className="phase-details">
                    <div className="detail">{item.details}</div>
                    <div className="stability-impact">
                      <strong>Impact:</strong> {item.stability}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="consequence-section">
        <h3>💔 The Human Consequences</h3>
        <p>Click to reveal the devastating impact on real people:</p>
        
        <div className="consequences-grid">
          {consequences.map((consequence) => (
            <div key={consequence.id} className="consequence-card">
              <div className="consequence-header">
                {consequence.icon}
                <h4>{consequence.title}</h4>
              </div>
              
              <div className="consequence-immediate">
                <strong>1933-1971:</strong> {consequence.immediate}
              </div>

              {!revealedConsequences[`gold-standard-${consequence.id}`] && (
                <ActionButton 
                  onClick={() => handleRevealConsequence(consequence.id)}
                  variant="warning"
                >
                  Show Long-term Damage →
                </ActionButton>
              )}

              {revealedConsequences[`gold-standard-${consequence.id}`] && (
                <div className="consequence-reveal">
                  <div className="long-term-damage">
                    <strong>1971-Today:</strong> {consequence.longTerm}
                  </div>
                  <div className="revelation">
                    <AlertTriangle size={16} />
                    <span><strong>Revelation:</strong> {consequence.revelation}</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="property-broken">
        <h4>💎 Which Property Was Broken?</h4>
        <div className="broken-property">
          <X size={24} />
          <div>
            <strong>SCARCITY</strong>
            <p>Gold's scarcity was the foundation of its value. When governments broke the gold link, they removed scarcity constraints and enabled unlimited money printing.</p>
          </div>
        </div>
      </div>

      <ActionButton onClick={onComplete} variant="primary">
        Next Crisis: Banking System Failure →
      </ActionButton>
    </div>
  );
};

// Component 3: 2008 Banking Crisis
const BankingCrisis2008 = ({ onComplete, onRevealConsequence, revealedConsequences }) => {
  const [currentMoment, setCurrentMoment] = useState(0);

  const crisisMoments = [
    {
      date: "September 15, 2008",
      event: "Lehman Brothers Collapses",
      detail: "158-year-old investment bank files for bankruptcy overnight",
      shock: "If Lehman can fail, any bank can fail"
    },
    {
      date: "September 16, 2008", 
      event: "AIG Bailout",
      detail: "$85 billion emergency loan to prevent insurance giant collapse",
      shock: "Too big to fail becomes official government policy"
    },
    {
      date: "September 17, 2008",
      event: "Money Market Funds Break the Buck",
      detail: "Reserve Primary Fund falls below $1 per share",
      shock: "'Safest' investments outside banks suddenly become risky"
    },
    {
      date: "September 18, 2008",
      event: "Credit Markets Freeze",
      detail: "Banks stop lending to each other completely",
      shock: "Financial system comes within hours of total collapse"
    }
  ];

  const consequences = [
    {
      id: 'homeowners',
      icon: <Home size={24} />,
      title: 'American Homeowners',
      immediate: '3.7 million foreclosure filings in 2008 alone',
      longTerm: '$7.4 trillion in stock market value evaporated',
      revelation: 'Homes bought with "safe" mortgages became worthless overnight'
    },
    {
      id: 'retirees',
      icon: <Users size={24} />,
      title: 'Retirement Savers',
      immediate: '401(k) accounts lost $2.4 trillion in 15 months',
      longTerm: 'Many forced to delay retirement by 5-10 years',
      revelation: '"Diversified" portfolios all crashed together'
    },
    {
      id: 'taxpayers',
      icon: <DollarSign size={24} />,
      title: 'Taxpayers',
      immediate: '$700 billion bank bailout bill passed in panic',
      longTerm: 'Fed printed $3.7 trillion in "quantitative easing"',
      revelation: 'Banks socialized losses while keeping private profits'
    }
  ];

  const handleRevealConsequence = (consequenceId) => {
    onRevealConsequence('banking-crisis', consequenceId);
  };

  return (
    <div className="section-card">
      <div className="case-header">
        <Building2 size={48} className="section-icon danger" />
        <h2>Case Study: 2008 Banking Crisis</h2>
        <p>How the "safest" financial system in the world nearly collapsed in 4 days</p>
      </div>

      <div className="crisis-timeline">
        <h3>4 Days That Shook the World</h3>
        <div className="moment-selector">
          {crisisMoments.map((moment, index) => (
            <button
              key={index}
              className={`moment-button ${currentMoment === index ? 'active' : ''}`}
              onClick={() => setCurrentMoment(index)}
            >
              {moment.date}
            </button>
          ))}
        </div>

        <div className="moment-detail">
          <div className="moment-card">
            <Clock size={24} />
            <div>
              <h4>{crisisMoments[currentMoment].event}</h4>
              <p>{crisisMoments[currentMoment].detail}</p>
              <div className="shock-realization">
                <AlertTriangle size={16} />
                <strong>Shock:</strong> {crisisMoments[currentMoment].shock}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="consequence-section">
        <h3>💔 The Human Toll</h3>
        <p>While banks got bailouts, real people paid the price:</p>
        
        <div className="consequences-grid">
          {consequences.map((consequence) => (
            <div key={consequence.id} className="consequence-card">
              <div className="consequence-header">
                {consequence.icon}
                <h4>{consequence.title}</h4>
              </div>
              
              <div className="consequence-immediate">
                <strong>Immediate Impact:</strong> {consequence.immediate}
              </div>

              {!revealedConsequences[`banking-crisis-${consequence.id}`] && (
                <ActionButton 
                  onClick={() => handleRevealConsequence(consequence.id)}
                  variant="warning"
                >
                  Show the Aftermath →
                </ActionButton>
              )}

              {revealedConsequences[`banking-crisis-${consequence.id}`] && (
                <div className="consequence-reveal">
                  <div className="long-term-damage">
                    <strong>Long-term Damage:</strong> {consequence.longTerm}
                  </div>
                  <div className="revelation">
                    <AlertTriangle size={16} />
                    <span><strong>Revelation:</strong> {consequence.revelation}</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="property-broken">
        <h4>🔒 Which Properties Were Broken?</h4>
        <div className="broken-properties">
          <div className="broken-property">
            <X size={20} />
            <div>
              <strong>DURABILITY</strong>
              <p>Banks that seemed permanent for 150+ years collapsed overnight</p>
            </div>
          </div>
          <div className="broken-property">
            <X size={20} />
            <div>
              <strong>RECOGNIZABILITY</strong> 
              <p>"AAA-rated" securities turned out to be worthless junk</p>
            </div>
          </div>
        </div>
      </div>

      <ActionButton onClick={onComplete} variant="primary">
        Next Crisis: Government Seizure →
      </ActionButton>
    </div>
  );
};

// Component 4: Cyprus Bail-In
const CyprusBailIn = ({ onComplete, onRevealConsequence, revealedConsequences }) => {
  const [timelineStep, setTimelineStep] = useState(0);

  const bailInTimeline = [
    {
      date: "March 15, 2013",
      event: "Banks Closed 'For Holiday'",
      detail: "All Cypriot banks suddenly shut down on Friday",
      publicTold: "Just a bank holiday weekend, nothing to worry about"
    },
    {
      date: "March 16, 2013",
      event: "Bail-In Announced",
      detail: "Government reveals plan to seize 6.75% of all small deposits, 9.9% of large deposits",
      publicTold: "Necessary to save the banking system"
    },
    {
      date: "March 17-25, 2013",
      event: "Banks Remain Closed",
      detail: "ATMs run out of cash, people can't access their money for 9 days",
      publicTold: "Capital controls are temporary"
    },
    {
      date: "March 25, 2013",
      event: "Final Seizure",
      detail: "47.5% of all deposits over €100,000 simply confiscated",
      publicTold: "You are now shareholders in the bank (worthless shares)"
    }
  ];

  const consequences = [
    {
      id: 'small-savers',
      icon: <Baby size={24} />,
      title: 'Small Savers',
      immediate: 'Woke up to find their life savings partially stolen',
      longTerm: 'Many never got their full deposits back',
      revelation: '"Your" money in banks is actually just an IOU'
    },
    {
      id: 'businesses',
      icon: <Briefcase size={24} />,
      title: 'Business Owners',
      immediate: 'Payroll accounts seized, unable to pay employees',
      longTerm: 'Many small businesses went bankrupt during closure',
      revelation: 'Bank deposits are legally unsecured loans to the bank'
    },
    {
      id: 'trust',
      icon: <Heart size={24} />,
      title: 'European Trust',
      immediate: 'Bank runs spread to other European countries',
      longTerm: 'Precedent set for future "bail-ins" across Europe',
      revelation: 'Government promises of deposit protection are worthless'
    }
  ];

  const handleRevealConsequence = (consequenceId) => {
    onRevealConsequence('cyprus', consequenceId);
  };

  const nextTimelineStep = () => {
    if (timelineStep < bailInTimeline.length - 1) {
      setTimelineStep(timelineStep + 1);
    }
  };

  return (
    <div className="section-card">
      <div className="case-header">
        <Eye size={48} className="section-icon danger" />
        <h2>Case Study: Cyprus Bail-In (2013)</h2>
        <p>The day depositors learned they were actually unsecured creditors</p>
      </div>

      <div className="bailin-timeline">
        <h3>10 Days That Changed Banking Forever</h3>
        
        <div className="timeline-progress">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${((timelineStep + 1) / bailInTimeline.length) * 100}%` }}
            />
          </div>
          <p>Day {timelineStep + 1} of {bailInTimeline.length}</p>
        </div>

        <div className="timeline-step">
          <div className="step-card">
            <div className="step-header">
              <Clock size={24} />
              <div>
                <h4>{bailInTimeline[timelineStep].date}</h4>
                <h3>{bailInTimeline[timelineStep].event}</h3>
              </div>
            </div>
            
            <div className="step-content">
              <div className="what-happened">
                <strong>What Happened:</strong> {bailInTimeline[timelineStep].detail}
              </div>
              
              <div className="public-told">
                <strong>Public Told:</strong> {bailInTimeline[timelineStep].publicTold}
              </div>
            </div>

            {timelineStep < bailInTimeline.length - 1 && (
              <ActionButton onClick={nextTimelineStep} variant="primary">
                Next Day →
              </ActionButton>
            )}
          </div>
        </div>
      </div>

      {timelineStep === bailInTimeline.length - 1 && (
        <div className="consequence-section">
          <h3>💔 The Victims</h3>
          <p>Real people paid the price for banking system failures:</p>
          
          <div className="consequences-grid">
            {consequences.map((consequence) => (
              <div key={consequence.id} className="consequence-card">
                <div className="consequence-header">
                  {consequence.icon}
                  <h4>{consequence.title}</h4>
                </div>
                
                <div className="consequence-immediate">
                  <strong>Immediate:</strong> {consequence.immediate}
                </div>

                {!revealedConsequences[`cyprus-${consequence.id}`] && (
                  <ActionButton 
                    onClick={() => handleRevealConsequence(consequence.id)}
                    variant="warning"
                  >
                    Show Long-term Impact →
                  </ActionButton>
                )}

                {revealedConsequences[`cyprus-${consequence.id}`] && (
                  <div className="consequence-reveal">
                    <div className="long-term-damage">
                      <strong>Long-term:</strong> {consequence.longTerm}
                    </div>
                    <div className="revelation">
                      <AlertTriangle size={16} />
                      <span><strong>Revelation:</strong> {consequence.revelation}</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="property-broken">
            <h4>🚫 Which Properties Were Broken?</h4>
            <div className="broken-properties">
              <div className="broken-property">
                <X size={20} />
                <div>
                  <strong>FUNGIBILITY</strong>
                  <p>Some euros were frozen while others were spendable - not all money was equal</p>
                </div>
              </div>
              <div className="broken-property">
                <X size={20} />
                <div>
                  <strong>PORTABILITY</strong>
                  <p>Money became impossible to move or access for weeks</p>
                </div>
              </div>
            </div>
          </div>

          <ActionButton onClick={onComplete} variant="primary">
            Map All the Failures →
          </ActionButton>
        </div>
      )}
    </div>
  );
};

// Component 5: Failure Mapping
const FailureMapping = ({ onComplete, onMapFailure, mappedFailures }) => {
  const [currentMapping, setCurrentMapping] = useState(0);

  const failures = [
    {
      id: 'gold-standard',
      crisis: 'Gold Standard Break',
      primaryFailure: 'Scarcity',
      description: 'Government broke the gold link to enable unlimited money printing',
      cascade: ['Store of Value', 'Unit of Account'],
      lesson: 'When scarcity is removed, money loses its fundamental value proposition'
    },
    {
      id: 'banking-crisis',
      crisis: '2008 Banking Crisis',
      primaryFailure: 'Durability',
      description: 'Institutions that seemed permanent collapsed overnight',
      cascade: ['Recognizability', 'Medium of Exchange'],
      lesson: 'When trust in durability breaks, the entire system becomes suspect'
    },
    {
      id: 'cyprus-bailin',
      crisis: 'Cyprus Bail-In',
      primaryFailure: 'Fungibility',
      description: 'Some money became frozen while other money remained spendable',
      cascade: ['Portability', 'Medium of Exchange'],
      lesson: 'When money isn\'t fungible, it stops working as a reliable medium of exchange'
    }
  ];

  const handleMapFailure = () => {
    const failure = failures[currentMapping];
    onMapFailure(failure.id, {
      crisis: failure.crisis,
      primaryFailure: failure.primaryFailure,
      cascade: failure.cascade,
      lesson: failure.lesson
    });
    
    if (currentMapping < failures.length - 1) {
      setCurrentMapping(currentMapping + 1);
    }
  };

  const failure = failures[currentMapping];
  const allMapped = Object.keys(mappedFailures).length === failures.length;

  return (
    <div className="section-card">
      <div className="mapping-header">
        <Target size={48} className="section-icon" />
        <h2>Mapping Failures to Properties</h2>
        <p>Each crisis broke specific money properties, causing cascading failures</p>
      </div>

      <div className="failure-mapping">
        <div className="current-failure">
          <h3>{failure.crisis}</h3>
          <div className="failure-analysis">
            <div className="primary-break">
              <h4>Primary Property Broken:</h4>
              <div className="broken-property-major">
                <X size={24} />
                <strong>{failure.primaryFailure}</strong>
              </div>
              <p>{failure.description}</p>
            </div>

            {!mappedFailures[failure.id] && (
              <ActionButton onClick={handleMapFailure} variant="danger">
                Map the Cascade Effects →
              </ActionButton>
            )}

            {mappedFailures[failure.id] && (
              <div className="cascade-effects">
                <h4>Cascade Effects:</h4>
                <div className="cascade-chain">
                  {failure.cascade.map((effect, index) => (
                    <div key={index} className="cascade-item">
                      <ArrowDown size={16} />
                      <span>{effect} Also Failed</span>
                    </div>
                  ))}
                </div>
                
                <div className="failure-lesson">
                  <div className="lesson-header">
                    <Zap size={20} />
                    <strong>Key Lesson:</strong>
                  </div>
                  <p>{failure.lesson}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mapping-progress">
          <p>Crisis {currentMapping + 1} of {failures.length} analyzed</p>
          <div className="progress-dots">
            {failures.map((_, index) => (
              <span 
                key={index} 
                className={`dot ${mappedFailures[failures[index].id] ? 'complete' : currentMapping === index ? 'active' : ''}`}
              />
            ))}
          </div>
        </div>
      </div>

      {allMapped && (
        <div className="mapping-complete">
          <div className="completion-insight">
            <AlertTriangle size={32} />
            <div>
              <h3>The Pattern is Clear</h3>
              <p>Every major financial crisis broke fundamental money properties. When one property fails, others follow in a cascade.</p>
              <p><strong>The question is: can we design money that's immune to these failures?</strong></p>
            </div>
          </div>
          
          <ActionButton onClick={onComplete} variant="success">
            Discover Why Failure is Inevitable →
          </ActionButton>
        </div>
      )}
    </div>
  );
};

// Component 6: The Inevitability of Failure
const InevitabilityOfFailure = ({ onComplete }) => {
  const [revealLevel, setRevealLevel] = useState(0);

  const revelations = [
    {
      title: "Human Nature Problem",
      insight: "Those who control money supply always face pressure to increase it",
      examples: [
        "Politicians promise benefits without raising taxes",
        "Banks profit by lending money they don't have", 
        "Central bankers believe they can 'manage' the economy"
      ]
    },
    {
      title: "Trust Dependency Problem",
      insight: "All traditional money systems require trusting institutions",
      examples: [
        "Gold standard: trust government won't break gold link",
        "Fiat money: trust central banks won't print too much",
        "Banking: trust banks to remain solvent and liquid"
      ]
    },
    {
      title: "Single Point of Failure Problem", 
      insight: "Centralized systems can be captured, corrupted, or destroyed",
      examples: [
        "One institution (central bank) controls entire money supply",
        "One decision (Nixon 1971) can change global monetary system",
        "One crisis (2008) can freeze the entire financial system"
      ]
    },
    {
      title: "Historical Inevitability",
      insight: "Every fiat currency in history has eventually failed",
      examples: [
        "Roman denarius: debased from silver to copper",
        "Weimar mark: hyperinflation destroyed savings",
        "Today: all currencies losing value against real assets"
      ]
    }
  ];

  const nextRevelation = () => {
    if (revealLevel < revelations.length - 1) {
      setRevealLevel(revealLevel + 1);
    }
  };

  const allRevealed = revealLevel === revelations.length - 1;

  return (
    <div className="section-card">
      <div className="inevitability-header">
        <Clock size={48} className="section-icon danger" />
        <h2>The Inevitability of Failure</h2>
        <p>Why traditional money systems are doomed to repeat these patterns</p>
      </div>

      <div className="revelation-sequence">
        {revelations.slice(0, revealLevel + 1).map((revelation, index) => (
          <div key={index} className="revelation-card">
            <div className="revelation-header">
              <AlertTriangle size={24} />
              <h3>{revelation.title}</h3>
            </div>
            
            <div className="revelation-insight">
              <p><strong>{revelation.insight}</strong></p>
            </div>
            
            <div className="revelation-examples">
              <h4>Evidence:</h4>
              <ul>
                {revelation.examples.map((example, idx) => (
                  <li key={idx}>{example}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}

        {!allRevealed && (
          <ActionButton onClick={nextRevelation} variant="danger">
            Reveal Deeper Problem →
          </ActionButton>
        )}
      </div>

      {allRevealed && (
        <div className="final-realization">
          <div className="realization-box">
            <div className="realization-header">
              <Zap size={32} />
              <h3>The Fundamental Question</h3>
            </div>
            
            <div className="realization-content">
              <p>Every money system we've examined has the same fatal flaw: <strong>it requires trusting fallible humans and institutions.</strong></p>
              
              <p>But what if there was a form of money that:</p>
              <ul>
                <li>✅ Had a fixed supply no one could change</li>
                <li>✅ Required no trust in any institution</li>  
                <li>✅ Had no single point of failure</li>
                <li>✅ Couldn't be confiscated or frozen</li>
                <li>✅ Worked the same everywhere</li>
              </ul>
              
              <p><strong>For the first time in history, we have such money...</strong></p>
            </div>
          </div>
          
          <ModuleCompletionButton onClick={onComplete}>
            Discover Bitcoin: The Better Blueprint →
          </ModuleCompletionButton>
        </div>
      )}
    </div>
  );
};

export default MoneyGoesBadModule;
