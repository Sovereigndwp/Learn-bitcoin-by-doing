import React from 'react';
import { Link } from 'react-router-dom';
import { useProgress } from '../contexts/ProgressContext';
import { moduleRegistry } from '../modules/ModuleRegistry';
import './Homepage.css';

const Homepage = () => {
  const { getModuleProgress, isModuleCompleted, completeModule } = useProgress();
  const [hasExperienced, setHasExperienced] = React.useState(false);

  const moduleIcons = {
    money: '💰',
    'money-designer': '⚡',
    'bitcoin-basics': '₿',
    numbers: '🔢',
    hashing: '🔐',
    mining: '⛏️',
    keys: '🔑',
    transactions: '🔄',
    scripts: '📜',
    merkle: '🌳',
    custody: '🛡️',
    myths: '🎭',
    'bitcoin-toolkit': '🛠️'
  };

  // Check if banking experience is completed
  const bankingExperienceCompleted = isModuleCompleted('banking-intro');
  
  // Progressive unlocking logic
  const isModuleUnlocked = (module) => {
    // First module (money) is unlocked after banking experience
    if (module.id === 'money') {
      return bankingExperienceCompleted;
    }
    
    // All other modules require prerequisites to be completed
    if (module.prerequisites.length === 0) {
      return bankingExperienceCompleted;
    }
    
    return module.prerequisites.every(prereq => isModuleCompleted(prereq));
  };

  const handleExperienceComplete = () => {
    setHasExperienced(true);
    completeModule('banking-intro');
  };

  const renderBankingExperienceCard = () => {
    return (
      <div key="banking-intro" className={`module-card ${bankingExperienceCompleted ? 'completed' : ''}`}>
        <div className="module-icon">🏦</div>
        <h3>Before We Begin</h3>
        <p>Experience the friction of traditional banking that millions face daily.</p>
        
        <div className="banking-card-actions">
          <a
            href="https://layer-d.my.canva.site/traditionalbanking-decodedbydalia"
            target="_blank"
            rel="noopener noreferrer"
            className="banking-demo-link"
            onClick={handleExperienceComplete}
          >
            Launch Banking Reality Check
          </a>
        </div>

        {bankingExperienceCompleted && (
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: '100%' }} />
          </div>
        )}
      </div>
    );
  };

  const renderModuleCard = (module) => {
    const unlocked = isModuleUnlocked(module);
    const progress = getModuleProgress(module.id);
    
    if (!unlocked) {
      return (
        <div key={module.id} className="module-card locked">
          <div className="module-icon">🔒</div>
          <h3>{module.title}</h3>
          <p>{module.description}</p>
          <div className="locked-message">
            {module.id === 'money' && !bankingExperienceCompleted ? 
              'Complete the banking experience to unlock' :
              `Complete: ${module.prerequisites.join(', ')}`
            }
          </div>
        </div>
      );
    }

    return (
      <Link 
        to={`/module/${module.id}`} 
        key={module.id}
        className={`module-card ${progress === 100 ? 'completed' : ''}`}
      >
        <div className="module-icon">{moduleIcons[module.id]}</div>
        <h3>{module.title}</h3>
        <p>{module.description}</p>
        {progress > 0 && (
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
        {module.prerequisites.length > 0 && (
          <div className="prerequisites">
            Prerequisites: {module.prerequisites.join(', ')}
          </div>
        )}
      </Link>
    );
  };

  return (
    <div className="homepage">
      <header className="homepage-header">
        <div className="logo">
          <span className="bitcoin-symbol">₿</span>
          <h1>Money's Mess & Bitcoin's Fix</h1>
        </div>
        <p>An interactive hands-on journey that questions everything you thought you knew about money</p>
      </header>

      <div className="module-groups">
        <div className="group-section">
          <h2>🎓 Fundamentals</h2>
          <div className="modules-grid">
            {renderBankingExperienceCard()}
            {Object.values(moduleRegistry)
              .filter(module => module.group === 'fundamentals')
              .sort((a, b) => a.order - b.order)
              .map(renderModuleCard)}
          </div>
        </div>

        <div className="group-section">
          <h2>🔧 Practical</h2>
          <div className="modules-grid">
            {Object.values(moduleRegistry)
              .filter(module => module.group === 'practical')
              .sort((a, b) => a.order - b.order)
              .map(renderModuleCard)}
          </div>
        </div>

        <div className="group-section">
          <h2>⚙️ Technical</h2>
          <div className="modules-grid">
            {Object.values(moduleRegistry)
              .filter(module => module.group === 'technical')
              .sort((a, b) => a.order - b.order)
              .map(renderModuleCard)}
          </div>
        </div>

        <div className="group-section">
          <h2>🚀 Advanced</h2>
          <div className="modules-grid">
            {Object.values(moduleRegistry)
              .filter(module => module.group === 'advanced')
              .sort((a, b) => a.order - b.order)
              .map(renderModuleCard)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage; 