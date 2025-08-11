import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '../../contexts/ProgressContext';
import { 
  ActionButton,
  StepNavigation
} from '../../components/EnhancedButtons';
import { ModuleCompletionButton } from '../../components/ui';
import { 
  Zap, Shield, Target, Globe, Users, Clock,
  CheckCircle, X, ArrowRight, Sparkles, Lock,
  Unlock, TrendingUp, DollarSign, Coins, Network,
  Server, Eye, EyeOff, Smartphone, Laptop
} from 'lucide-react';
import '../ModuleCommon.css';

const BitcoinBlueprintModule = ({ moduleId = 'bitcoin-blueprint' }) => {
  const navigate = useNavigate();
  const { updateModuleProgress, completeModule } = useProgress();
  const [currentStep, setCurrentStep] = useState(0);
  const [solvedProblems, setSolvedProblems] = useState({});
  const [comparisonStage, setComparisonStage] = useState(0);
  const [blueprintRevealed, setBlueprintRevealed] = useState({});

  const steps = [
    'The Bitcoin Blueprint Revealed',
    'Solving the Scarcity Problem',
    'Solving the Trust Problem',
    'Solving the Durability Problem',
    'The Complete Solution Comparison',
    'Your Bitcoin Future'
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

  const solveProblem = (problemId, solution) => {
    setSolvedProblems(prev => ({
      ...prev,
      [problemId]: solution
    }));
  };

  const revealBlueprint = (blueprintId) => {
    setBlueprintRevealed(prev => ({
      ...prev,
      [blueprintId]: true
    }));
  };

  return (
    <div className="module-container">
      <div className="module-header">
        <h1>⚡ Bitcoin: The Better Blueprint</h1>
        <p>Discover how Bitcoin elegantly solves every money failure through superior design</p>
        <StepNavigation 
          steps={steps} 
          currentStep={currentStep}
          onStepClick={setCurrentStep}
        />
      </div>

      <div className="module-content">
        {currentStep === 0 && (
          <BlueprintRevealed 
            onComplete={() => handleStepComplete(0)}
            onRevealBlueprint={revealBlueprint}
            blueprintRevealed={blueprintRevealed}
          />
        )}
        
        {currentStep === 1 && (
          <SolvingScarcity 
            onComplete={() => handleStepComplete(1)}
            onSolveProblem={solveProblem}
            solvedProblems={solvedProblems}
          />
        )}
        
        {currentStep === 2 && (
          <SolvingTrust 
            onComplete={() => handleStepComplete(2)}
            onSolveProblem={solveProblem}
            solvedProblems={solvedProblems}
          />
        )}
        
        {currentStep === 3 && (
          <SolvingDurability 
            onComplete={() => handleStepComplete(3)}
            onSolveProblem={solveProblem}
            solvedProblems={solvedProblems}
          />
        )}
        
        {currentStep === 4 && (
          <CompleteSolutionComparison 
            onComplete={() => handleStepComplete(4)}
            comparisonStage={comparisonStage}
            setComparisonStage={setComparisonStage}
          />
        )}
        
        {currentStep === 5 && (
          <BitcoinFuture onComplete={handleModuleComplete} />
        )}
      </div>
    </div>
  );
};

// Component 1: The Bitcoin Blueprint Revealed
const BlueprintRevealed = ({ onComplete, onRevealBlueprint, blueprintRevealed }) => {
  const [currentReveal, setCurrentReveal] = useState(0);

  const blueprintElements = [
    {
      id: 'digital-gold',
      title: '🏆 Digital Gold, But Better',
      teaser: 'All the benefits of gold, none of the limitations',
      revelation: 'Bitcoin has gold\'s scarcity (21 million max) but can be sent instantly worldwide'
    },
    {
      id: 'no-rulers',
      title: '🌐 No Rulers, Only Rules',
      teaser: 'Math and code replace human institutions',
      revelation: 'Bitcoin runs on unchangeable mathematical rules, not the whims of politicians or bankers'
    },
    {
      id: 'global-network',
      title: '⚡ Global Network, Always On',
      teaser: '24/7/365 global payment system',
      revelation: 'Bitcoin never closes, never has bank holidays, works the same everywhere on Earth'
    },
    {
      id: 'your-keys',
      title: '🔑 Your Keys, Your Bitcoin',
      teaser: 'True ownership without intermediaries',
      revelation: 'With your private keys, you have complete control - no bank can freeze or seize your Bitcoin'
    }
  ];

  const handleReveal = (elementId) => {
    onRevealBlueprint(elementId);
    if (currentReveal < blueprintElements.length - 1) {
      setCurrentReveal(currentReveal + 1);
    }
  };

  const allRevealed = Object.keys(blueprintRevealed).length === blueprintElements.length;

  return (
    <div className="section-card">
      <div className="blueprint-header">
        <Sparkles size={48} className="section-icon success" />
        <h2>The Bitcoin Blueprint Revealed</h2>
        <p>After studying every money failure, one question emerges: what would perfect money look like?</p>
      </div>

      <div className="blueprint-revelation">
        <div className="perfect-money-checklist">
          <h3>💭 The Perfect Money Checklist</h3>
          <div className="checklist-items">
            <div className="checklist-item">
              <CheckCircle size={20} />
              <span>Fixed supply that can't be inflated away</span>
            </div>
            <div className="checklist-item">
              <CheckCircle size={20} />
              <span>No single institution that can fail or be corrupted</span>
            </div>
            <div className="checklist-item">
              <CheckCircle size={20} />
              <span>Can't be confiscated by governments</span>
            </div>
            <div className="checklist-item">
              <CheckCircle size={20} />
              <span>Works the same everywhere, all the time</span>
            </div>
            <div className="checklist-item">
              <CheckCircle size={20} />
              <span>Truly portable and divisible</span>
            </div>
          </div>
          <div className="revelation-moment">
            <Zap size={24} />
            <p><strong>For the first time in history, such money exists...</strong></p>
          </div>
        </div>

        <div className="blueprint-elements">
          <h3>🎯 Bitcoin: The Complete Solution</h3>
          {blueprintElements.map((element, index) => (
            <div key={element.id} className={`blueprint-element ${index <= currentReveal ? 'active' : ''}`}>
              <div className="element-teaser">
                <div className="element-icon">{element.title.split(' ')[0]}</div>
                <div>
                  <h4>{element.title.slice(2)}</h4>
                  <p>{element.teaser}</p>
                </div>
              </div>

              {index === currentReveal && !blueprintRevealed[element.id] && (
                <ActionButton onClick={() => handleReveal(element.id)} variant="success">
                  Reveal How Bitcoin Solves This →
                </ActionButton>
              )}

              {blueprintRevealed[element.id] && (
                <div className="element-revelation">
                  <div className="revelation-content">
                    <CheckCircle size={20} />
                    <p><strong>{element.revelation}</strong></p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {allRevealed && (
          <div className="blueprint-complete">
            <div className="completion-insight">
              <Target size={32} />
              <div>
                <h3>The Blueprint is Complete</h3>
                <p>Bitcoin addresses every single money failure we studied. But how exactly does it work?</p>
                <p><strong>Let's examine each solution in detail...</strong></p>
              </div>
            </div>
            
            <ActionButton onClick={onComplete} variant="primary">
              Deep Dive: How Bitcoin Solves Each Problem →
            </ActionButton>
          </div>
        )}
      </div>
    </div>
  );
};

// Component 2: Solving the Scarcity Problem
const SolvingScarcity = ({ onComplete, onSolveProblem, solvedProblems }) => {
  const [currentSolution, setCurrentSolution] = useState(0);

  const scarcitySolutions = [
    {
      id: 'fixed-supply',
      problem: 'Governments always increase money supply',
      solution: '21 Million Bitcoin Maximum',
      explanation: 'Bitcoin\'s code mathematically limits supply to 21 million coins. This number cannot be changed without consensus from the entire network.',
      analogy: 'Like a pie cut into exactly 21 million slices - no matter what happens, there will never be slice #21,000,001'
    },
    {
      id: 'predictable-issuance',
      problem: 'Central banks print money unpredictably',
      solution: 'Predictable Issuance Schedule',
      explanation: 'New bitcoins are released on a fixed schedule that halves every 4 years. Everyone knows exactly how many exist and when new ones will be created.',
      analogy: 'Like a vending machine that dispenses exactly half as many snacks every 4 years - completely predictable, no surprises'
    },
    {
      id: 'no-central-control',
      problem: 'One institution controls money creation',
      solution: 'Decentralized Network Control',
      explanation: 'No single person or institution can create new bitcoins. The network of thousands of computers around the world enforces the rules.',
      analogy: 'Like a recipe that requires approval from thousands of chefs before anyone can change even one ingredient'
    }
  ];

  const handleSolveProblem = () => {
    const solution = scarcitySolutions[currentSolution];
    onSolveProblem(solution.id, {
      problem: solution.problem,
      solution: solution.solution,
      explanation: solution.explanation
    });
    
    if (currentSolution < scarcitySolutions.length - 1) {
      setCurrentSolution(currentSolution + 1);
    }
  };

  const solution = scarcitySolutions[currentSolution];
  const allSolved = Object.keys(solvedProblems).length === scarcitySolutions.length;

  return (
    <div className="section-card">
      <div className="solution-header">
        <Coins size={48} className="section-icon success" />
        <h2>Solving the Scarcity Problem</h2>
        <p>Remember how breaking the gold link enabled unlimited money printing? Bitcoin fixes this completely.</p>
      </div>

      <div className="problem-solution-flow">
        <div className="current-problem-solution">
          <div className="problem-side">
            <X size={32} className="problem-icon" />
            <h3>The Problem</h3>
            <p>{solution.problem}</p>
            <div className="problem-consequence">
              <span>Result: Currency debasement and inflation</span>
            </div>
          </div>

          <div className="solution-arrow">
            <ArrowRight size={48} />
            <span>Bitcoin's Solution</span>
          </div>

          <div className="solution-side">
            <CheckCircle size={32} className="solution-icon" />
            <h3>{solution.solution}</h3>
            <p>{solution.explanation}</p>
            
            <div className="solution-analogy">
              <div className="analogy-header">
                <Sparkles size={16} />
                <strong>Simple Analogy:</strong>
              </div>
              <p>{solution.analogy}</p>
            </div>

            {!solvedProblems[solution.id] && (
              <ActionButton onClick={handleSolveProblem} variant="success">
                ✅ Mark Problem Solved
              </ActionButton>
            )}

            {solvedProblems[solution.id] && (
              <div className="problem-solved">
                <CheckCircle size={20} />
                <span>Problem Solved!</span>
              </div>
            )}
          </div>
        </div>

        <div className="solution-progress">
          <p>Solution {currentSolution + 1} of {scarcitySolutions.length}</p>
          <div className="progress-dots">
            {scarcitySolutions.map((_, index) => (
              <span 
                key={index} 
                className={`dot ${solvedProblems[scarcitySolutions[index].id] ? 'complete' : currentSolution === index ? 'active' : ''}`}
              />
            ))}
          </div>
        </div>
      </div>

      {allSolved && (
        <div className="scarcity-solved">
          <div className="solution-complete">
            <Shield size={32} />
            <div>
              <h3>Scarcity Problem: SOLVED ✅</h3>
              <p>Bitcoin's mathematical scarcity makes it the hardest money ever created. But what about the trust problem?</p>
            </div>
          </div>
          
          <ActionButton onClick={onComplete} variant="primary">
            Next Challenge: Solving Trust →
          </ActionButton>
        </div>
      )}
    </div>
  );
};

// Component 3: Solving the Trust Problem
const SolvingTrust = ({ onComplete, onSolveProblem, solvedProblems }) => {
  const [currentSolution, setCurrentSolution] = useState(0);

  const trustSolutions = [
    {
      id: 'no-intermediaries',
      problem: 'Banks can freeze, seize, or lose your money',
      solution: 'Peer-to-Peer Transactions',
      explanation: 'Bitcoin transactions go directly from person to person without any bank or financial institution in between.',
      analogy: 'Like handing someone cash in person, but digitally - no middleman can interfere',
      demo: 'Send Bitcoin anywhere in the world in minutes, not days'
    },
    {
      id: 'cryptographic-proof',
      problem: 'Must trust institutions to be honest',
      solution: 'Mathematical Proof System',
      explanation: 'Bitcoin uses cryptographic mathematics to prove transactions are valid. No need to trust anyone - the math is verifiable by anyone.',
      analogy: 'Like a mathematical equation that proves 2+2=4 - you don\'t need to trust the teacher, you can verify it yourself',
      demo: 'Every transaction is mathematically provable'
    },
    {
      id: 'transparent-ledger',
      problem: 'Banks operate with hidden books',
      solution: 'Public Transaction Ledger',
      explanation: 'Every Bitcoin transaction is recorded on a public ledger that anyone can inspect. Complete transparency eliminates the need for trust.',
      analogy: 'Like a glass vault where everyone can see all the transactions, but identities remain private',
      demo: 'View any Bitcoin transaction ever made'
    }
  ];

  const handleSolveProblem = () => {
    const solution = trustSolutions[currentSolution];
    onSolveProblem(solution.id, {
      problem: solution.problem,
      solution: solution.solution,
      explanation: solution.explanation
    });
    
    if (currentSolution < trustSolutions.length - 1) {
      setCurrentSolution(currentSolution + 1);
    }
  };

  const solution = trustSolutions[currentSolution];
  const allSolved = Object.keys(solvedProblems).length === trustSolutions.length;

  return (
    <div className="section-card">
      <div className="solution-header">
        <Shield size={48} className="section-icon success" />
        <h2>Solving the Trust Problem</h2>
        <p>Remember Cyprus and 2008? When institutions fail, your money fails. Bitcoin eliminates this risk entirely.</p>
      </div>

      <div className="trust-comparison">
        <div className="traditional-trust">
          <h3>🏦 Traditional System</h3>
          <div className="trust-chain">
            <div className="trust-link">Trust the Bank</div>
            <div className="trust-arrow">↓</div>
            <div className="trust-link">Trust the Government</div>
            <div className="trust-arrow">↓</div>
            <div className="trust-link">Trust the Regulators</div>
            <div className="trust-arrow">↓</div>
            <div className="trust-link">Hope Nothing Goes Wrong</div>
          </div>
          <div className="trust-failure">
            <X size={16} />
            <span>Any link can break, losing your money</span>
          </div>
        </div>

        <div className="bitcoin-trust">
          <h3>⚡ Bitcoin System</h3>
          <div className="trustless-flow">
            <div className="trustless-element">
              <Lock size={24} />
              <span>Your Private Keys</span>
            </div>
            <div className="trustless-arrow">↓</div>
            <div className="trustless-element">
              <Network size={24} />
              <span>Mathematical Proof</span>
            </div>
            <div className="trustless-arrow">↓</div>
            <div className="trustless-element">
              <Globe size={24} />
              <span>Global Network</span>
            </div>
          </div>
          <div className="trust-success">
            <CheckCircle size={16} />
            <span>No single point of failure</span>
          </div>
        </div>
      </div>

      <div className="current-trust-solution">
        <div className="solution-card">
          <div className="solution-header-small">
            <h4>Current Solution: {solution.solution}</h4>
          </div>
          
          <div className="problem-solution-pair">
            <div className="problem-section">
              <strong>Problem:</strong> {solution.problem}
            </div>
            <div className="solution-section">
              <strong>Bitcoin's Solution:</strong> {solution.explanation}
            </div>
          </div>

          <div className="solution-analogy">
            <Sparkles size={16} />
            <p><strong>Analogy:</strong> {solution.analogy}</p>
          </div>

          <div className="solution-demo">
            <Eye size={16} />
            <p><strong>In Practice:</strong> {solution.demo}</p>
          </div>

          {!solvedProblems[solution.id] && (
            <ActionButton onClick={handleSolveProblem} variant="success">
              ✅ Understand This Solution
            </ActionButton>
          )}

          {solvedProblems[solution.id] && (
            <div className="solution-understood">
              <CheckCircle size={20} />
              <span>Solution Understood!</span>
            </div>
          )}
        </div>

        <div className="solution-progress">
          <p>Trust Solution {currentSolution + 1} of {trustSolutions.length}</p>
          <div className="progress-dots">
            {trustSolutions.map((_, index) => (
              <span 
                key={index} 
                className={`dot ${solvedProblems[trustSolutions[index].id] ? 'complete' : currentSolution === index ? 'active' : ''}`}
              />
            ))}
          </div>
        </div>
      </div>

      {allSolved && (
        <div className="trust-solved">
          <div className="solution-complete">
            <Unlock size={32} />
            <div>
              <h3>Trust Problem: SOLVED ✅</h3>
              <p>Bitcoin is "trustless" - you don't need to trust anyone. The system works through mathematics and incentives. But what about durability?</p>
            </div>
          </div>
          
          <ActionButton onClick={onComplete} variant="primary">
            Final Challenge: Solving Durability →
          </ActionButton>
        </div>
      )}
    </div>
  );
};

// Component 4: Solving the Durability Problem
const SolvingDurability = ({ onComplete, onSolveProblem, solvedProblems }) => {
  const [currentSolution, setCurrentSolution] = useState(0);

  const durabilitySolutions = [
    {
      id: 'distributed-network',
      problem: 'Banks can fail and close permanently',
      solution: 'Thousands of Network Nodes',
      explanation: 'Bitcoin runs on thousands of computers worldwide. Even if 99% went offline, Bitcoin would still work perfectly.',
      analogy: 'Like a song that exists in thousands of copies - even if most copies are destroyed, the song survives',
      strength: '15,000+ nodes globally'
    },
    {
      id: 'no-headquarters',
      problem: 'Institutions have addresses that can be shut down',
      solution: 'No Central Office or Headquarters',
      explanation: 'Bitcoin has no CEO, no headquarters, no board of directors. There\'s nothing to shut down or regulate out of existence.',
      analogy: 'Like the wind - it has no address, no office, no way to stop it',
      strength: 'Impossible to shut down'
    },
    {
      id: 'antifragile-design',
      problem: 'Traditional systems weaken under attack',
      solution: 'Gets Stronger Under Pressure',
      explanation: 'The more Bitcoin is attacked or regulated, the more people join the network to defend it. Bans and restrictions actually make it stronger.',
      analogy: 'Like a muscle that grows stronger the more you try to break it',
      strength: 'Survived every attack since 2009'
    }
  ];

  const handleSolveProblem = () => {
    const solution = durabilitySolutions[currentSolution];
    onSolveProblem(solution.id, {
      problem: solution.problem,
      solution: solution.solution,
      explanation: solution.explanation
    });
    
    if (currentSolution < durabilitySolutions.length - 1) {
      setCurrentSolution(currentSolution + 1);
    }
  };

  const solution = durabilitySolutions[currentSolution];
  const allSolved = Object.keys(solvedProblems).length === durabilitySolutions.length;

  return (
    <div className="section-card">
      <div className="solution-header">
        <Network size={48} className="section-icon success" />
        <h2>Solving the Durability Problem</h2>
        <p>Remember Lehman Brothers? 158 years, then gone overnight. Bitcoin is built to last forever.</p>
      </div>

      <div className="durability-comparison">
        <div className="fragile-system">
          <h3>🏦 Traditional Banking</h3>
          <div className="fragility-points">
            <div className="fragile-point">
              <X size={16} />
              <span>Single headquarters</span>
            </div>
            <div className="fragile-point">
              <X size={16} />
              <span>Centralized decision making</span>
            </div>
            <div className="fragile-point">
              <X size={16} />
              <span>Government regulation</span>
            </div>
            <div className="fragile-point">
              <X size={16} />
              <span>Can be shut down</span>
            </div>
          </div>
          <div className="fragility-result">
            <span>Result: Single points of failure everywhere</span>
          </div>
        </div>

        <div className="antifragile-system">
          <h3>⚡ Bitcoin Network</h3>
          <div className="strength-points">
            <div className="strength-point">
              <CheckCircle size={16} />
              <span>15,000+ global nodes</span>
            </div>
            <div className="strength-point">
              <CheckCircle size={16} />
              <span>No central authority</span>
            </div>
            <div className="strength-point">
              <CheckCircle size={16} />
              <span>Permissionless participation</span>
            </div>
            <div className="strength-point">
              <CheckCircle size={16} />
              <span>Gets stronger under attack</span>
            </div>
          </div>
          <div className="strength-result">
            <span>Result: No single points of failure</span>
          </div>
        </div>
      </div>

      <div className="current-durability-solution">
        <div className="solution-spotlight">
          <div className="solution-title">
            <Target size={24} />
            <h4>{solution.solution}</h4>
          </div>
          
          <div className="solution-details">
            <div className="problem-addressed">
              <strong>Problem Addressed:</strong>
              <p>{solution.problem}</p>
            </div>
            
            <div className="bitcoin-approach">
              <strong>Bitcoin's Approach:</strong>
              <p>{solution.explanation}</p>
            </div>
            
            <div className="solution-analogy">
              <Sparkles size={16} />
              <p><strong>Think of it like:</strong> {solution.analogy}</p>
            </div>
            
            <div className="solution-strength">
              <Shield size={16} />
              <p><strong>Strength Level:</strong> {solution.strength}</p>
            </div>
          </div>

          {!solvedProblems[solution.id] && (
            <ActionButton onClick={handleSolveProblem} variant="success">
              ✅ Grasp This Solution
            </ActionButton>
          )}

          {solvedProblems[solution.id] && (
            <div className="solution-grasped">
              <CheckCircle size={20} />
              <span>Solution Grasped!</span>
            </div>
          )}
        </div>

        <div className="solution-progress">
          <p>Durability Solution {currentSolution + 1} of {durabilitySolutions.length}</p>
          <div className="progress-dots">
            {durabilitySolutions.map((_, index) => (
              <span 
                key={index} 
                className={`dot ${solvedProblems[durabilitySolutions[index].id] ? 'complete' : currentSolution === index ? 'active' : ''}`}
              />
            ))}
          </div>
        </div>
      </div>

      {allSolved && (
        <div className="durability-solved">
          <div className="solution-complete">
            <TrendingUp size={32} />
            <div>
              <h3>Durability Problem: SOLVED ✅</h3>
              <p>Bitcoin is the most durable form of money ever created. It's designed to outlast governments, corporations, and even civilizations.</p>
            </div>
          </div>
          
          <ActionButton onClick={onComplete} variant="primary">
            See the Complete Solution →
          </ActionButton>
        </div>
      )}
    </div>
  );
};

// Component 5: Complete Solution Comparison
const CompleteSolutionComparison = ({ onComplete, comparisonStage, setComparisonStage }) => {
  const [revealedSolutions, setRevealedSolutions] = useState(0);

  const moneyComparison = {
    properties: [
      { name: 'Scarcity', description: 'Limited supply that can\'t be inflated' },
      { name: 'Durability', description: 'Survives over time and under attack' },
      { name: 'Portability', description: 'Easy to transport and transfer' },
      { name: 'Divisibility', description: 'Can be split into small amounts' },
      { name: 'Fungibility', description: 'Each unit is identical and interchangeable' },
      { name: 'Recognizability', description: 'Easy to verify authenticity' },
      { name: 'Borderlessness', description: 'Works everywhere without restrictions' }
    ],
    systems: {
      gold: {
        name: 'Gold Standard',
        scores: [9, 10, 4, 6, 8, 8, 3],
        total: 48,
        failures: ['Portability', 'Divisibility', 'Borderlessness']
      },
      fiat: {
        name: 'Fiat Money',
        scores: [1, 3, 8, 10, 9, 7, 6],
        total: 44,
        failures: ['Scarcity', 'Durability']
      },
      bitcoin: {
        name: 'Bitcoin',
        scores: [10, 10, 10, 10, 9, 9, 10],
        total: 68,
        failures: []
      }
    }
  };

  const revealNextSolution = () => {
    if (revealedSolutions < 3) {
      setRevealedSolutions(revealedSolutions + 1);
    } else {
      setComparisonStage(1);
    }
  };

  const proceedToNext = () => {
    setComparisonStage(comparisonStage + 1);
  };

  return (
    <div className="section-card">
      <div className="comparison-header">
        <Target size={48} className="section-icon success" />
        <h2>The Complete Solution Comparison</h2>
        <p>Let's see how Bitcoin stacks up against every money system in history</p>
      </div>

      {comparisonStage === 0 && (
        <div className="solution-reveal">
          <h3>✅ Problems Bitcoin Has Solved</h3>
          
          <div className="solved-problems">
            {revealedSolutions >= 1 && (
              <div className="solved-problem">
                <CheckCircle size={24} />
                <div>
                  <strong>Scarcity Problem</strong>
                  <p>21 million coin limit enforced by mathematics</p>
                </div>
              </div>
            )}
            
            {revealedSolutions >= 2 && (
              <div className="solved-problem">
                <CheckCircle size={24} />
                <div>
                  <strong>Trust Problem</strong>
                  <p>No intermediaries, no single points of failure</p>
                </div>
              </div>
            )}
            
            {revealedSolutions >= 3 && (
              <div className="solved-problem">
                <CheckCircle size={24} />
                <div>
                  <strong>Durability Problem</strong>
                  <p>Antifragile network that gets stronger under attack</p>
                </div>
              </div>
            )}
          </div>

          {revealedSolutions < 3 && (
            <ActionButton onClick={revealNextSolution} variant="success">
              Reveal Next Solved Problem →
            </ActionButton>
          )}

          {revealedSolutions === 3 && (
            <ActionButton onClick={revealNextSolution} variant="primary">
              Compare Against All Money Systems →
            </ActionButton>
          )}
        </div>
      )}

      {comparisonStage === 1 && (
        <div className="money-scorecard">
          <h3>🏆 The Ultimate Money Scorecard</h3>
          
          <div className="scorecard-table">
            <div className="scorecard-header">
              <div className="property-column">Property</div>
              <div className="system-column">Gold Standard</div>
              <div className="system-column">Fiat Money</div>
              <div className="system-column bitcoin-column">Bitcoin</div>
            </div>
            
            {moneyComparison.properties.map((property, index) => (
              <div key={index} className="scorecard-row">
                <div className="property-cell">
                  <strong>{property.name}</strong>
                  <small>{property.description}</small>
                </div>
                <div className={`score-cell ${moneyComparison.systems.gold.scores[index] <= 5 ? 'poor' : moneyComparison.systems.gold.scores[index] <= 7 ? 'fair' : 'good'}`}>
                  {moneyComparison.systems.gold.scores[index]}/10
                </div>
                <div className={`score-cell ${moneyComparison.systems.fiat.scores[index] <= 5 ? 'poor' : moneyComparison.systems.fiat.scores[index] <= 7 ? 'fair' : 'good'}`}>
                  {moneyComparison.systems.fiat.scores[index]}/10
                </div>
                <div className={`score-cell bitcoin-score ${moneyComparison.systems.bitcoin.scores[index] <= 5 ? 'poor' : moneyComparison.systems.bitcoin.scores[index] <= 7 ? 'fair' : 'excellent'}`}>
                  {moneyComparison.systems.bitcoin.scores[index]}/10
                </div>
              </div>
            ))}
            
            <div className="scorecard-totals">
              <div className="total-cell"><strong>Total Score:</strong></div>
              <div className="total-score fair">{moneyComparison.systems.gold.total}/70</div>
              <div className="total-score fair">{moneyComparison.systems.fiat.total}/70</div>
              <div className="total-score excellent">{moneyComparison.systems.bitcoin.total}/70</div>
            </div>
          </div>

          <ActionButton onClick={proceedToNext} variant="success">
            See What This Means →
          </ActionButton>
        </div>
      )}

      {comparisonStage === 2 && (
        <div className="comparison-insight">
          <div className="winner-announcement">
            <Sparkles size={48} />
            <h3>🥇 Bitcoin: The Clear Winner</h3>
            <p>For the first time in human history, we have money that scores near-perfect on every property.</p>
          </div>

          <div className="comparison-insights">
            <div className="insight-item">
              <TrendingUp size={24} />
              <div>
                <strong>Bitcoin: 68/70 (97%)</strong>
                <p>The highest scoring money system in history</p>
              </div>
            </div>
            
            <div className="insight-item">
              <Shield size={24} />
              <div>
                <strong>No Critical Failures</strong>
                <p>Unlike gold and fiat, Bitcoin has no major weaknesses</p>
              </div>
            </div>
            
            <div className="insight-item">
              <Network size={24} />
              <div>
                <strong>Built for the Digital Age</strong>
                <p>Designed from scratch for a global, connected world</p>
              </div>
            </div>
          </div>

          <ActionButton onClick={onComplete} variant="primary">
            Discover Your Bitcoin Future →
          </ActionButton>
        </div>
      )}
    </div>
  );
};

// Component 6: Your Bitcoin Future
const BitcoinFuture = ({ onComplete }) => {
  const [futureStep, setFutureStep] = useState(0);

  const futureSteps = [
    {
      title: '🎓 You Now Understand Money',
      content: 'You\'ve learned what most people never discover: why every previous money system failed, and how Bitcoin solves these fundamental problems.',
      insight: 'This knowledge puts you ahead of 99% of the world\'s population.'
    },
    {
      title: '🔮 You Can See the Future',
      content: 'While others debate Bitcoin\'s price, you understand its inevitability. The world needs sound money, and Bitcoin is the only solution that works.',
      insight: 'You\'re not speculating - you\'re recognizing an inevitable shift.'
    },
    {
      title: '🚀 Your Bitcoin Journey Begins',
      content: 'Now that you understand WHY Bitcoin exists, it\'s time to learn HOW to use it safely and effectively in the real world.',
      insight: 'The Fundamentals are complete. Your practical journey starts now.'
    }
  ];

  const nextFutureStep = () => {
    if (futureStep < futureSteps.length - 1) {
      setFutureStep(futureStep + 1);
    }
  };

  const currentStep = futureSteps[futureStep];
  const isLastStep = futureStep === futureSteps.length - 1;

  return (
    <div className="section-card">
      <div className="future-header">
        <Zap size={48} className="section-icon success" />
        <h2>Your Bitcoin Future</h2>
        <p>Congratulations! You've completed the most important education about money in human history.</p>
      </div>

      <div className="future-journey">
        <div className="future-step">
          <div className="step-icon">
            {currentStep.title.split(' ')[0]}
          </div>
          <div className="step-content">
            <h3>{currentStep.title.slice(2)}</h3>
            <p>{currentStep.content}</p>
            <div className="step-insight">
              <Sparkles size={16} />
              <strong>{currentStep.insight}</strong>
            </div>
          </div>
        </div>

        <div className="future-progress">
          <div className="progress-indicator">
            <span>Step {futureStep + 1} of {futureSteps.length}</span>
            <div className="progress-dots">
              {futureSteps.map((_, index) => (
                <span 
                  key={index} 
                  className={`dot ${index <= futureStep ? 'active' : ''}`}
                />
              ))}
            </div>
          </div>
        </div>

        {!isLastStep && (
          <ActionButton onClick={nextFutureStep} variant="primary">
            Continue Journey →
          </ActionButton>
        )}

        {isLastStep && (
          <div className="journey-complete">
            <div className="completion-celebration">
              <div className="celebration-content">
                <Target size={32} />
                <div>
                  <h3>🎯 Fundamentals: MASTERED</h3>
                  <p>You now have the foundation to navigate Bitcoin with confidence and clarity.</p>
                  <p><strong>Ready to put this knowledge into practice?</strong></p>
                </div>
              </div>
            </div>
            
            <div className="next-phase-preview">
              <h4>🛠️ Next: Practical Bitcoin Skills</h4>
              <ul>
                <li>✅ Set up your first Bitcoin wallet</li>
                <li>✅ Send and receive Bitcoin safely</li>
                <li>✅ Master private key security</li>
                <li>✅ Use Bitcoin in the real world</li>
              </ul>
            </div>
            
            <ModuleCompletionButton onClick={onComplete}>
              Begin Practical Bitcoin Skills →
            </ModuleCompletionButton>
          </div>
        )}
      </div>
    </div>
  );
};

export default BitcoinBlueprintModule;
