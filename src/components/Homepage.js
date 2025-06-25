import React from 'react';
import { Link } from 'react-router-dom';
import { useProgress } from '../contexts/ProgressContext';
import { Coins, Star, Trophy } from 'lucide-react';
import { moduleRegistry } from '../modules/ModuleRegistry';
import './Homepage.css';

const Homepage = () => {
  const { getModuleProgress } = useProgress();

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

  return (
    <div className="homepage">
      <header className="homepage-header">
        <div className="logo">
          <span className="bitcoin-symbol">₿</span>
          <h1>Learn Bitcoin by Doing</h1>
        </div>
        <p>Interactive lessons to understand Bitcoin from the ground up</p>
      </header>

      <div className="module-groups">
        <div className="group-section">
          <h2>🎓 Fundamentals</h2>
          <div className="modules-grid">
            {Object.values(moduleRegistry)
              .filter(module => module.group === 'fundamentals')
              .sort((a, b) => a.order - b.order)
              .map(module => (
                <Link 
                  to={`/module/${module.id}`} 
                  key={module.id}
                  className={`module-card ${getModuleProgress(module.id) === 100 ? 'completed' : ''}`}
                >
                  <div className="module-icon">{moduleIcons[module.id]}</div>
                  <h3>{module.title}</h3>
                  <p>{module.description}</p>
                  {getModuleProgress(module.id) > 0 && (
                    <div className="progress-bar">
                      <div 
                        className="progress-fill"
                        style={{ width: `${getModuleProgress(module.id)}%` }}
                      />
                    </div>
                  )}
                  {module.prerequisites.length > 0 && (
                    <div className="prerequisites">
                      Prerequisites: {module.prerequisites.join(', ')}
                    </div>
                  )}
                </Link>
              ))}
          </div>
        </div>

        <div className="group-section">
          <h2>🔧 Practical</h2>
          <div className="modules-grid">
            {Object.values(moduleRegistry)
              .filter(module => module.group === 'practical')
              .sort((a, b) => a.order - b.order)
              .map(module => (
                <Link 
                  to={`/module/${module.id}`} 
                  key={module.id}
                  className={`module-card ${getModuleProgress(module.id) === 100 ? 'completed' : ''}`}
                >
                  <div className="module-icon">{moduleIcons[module.id]}</div>
                  <h3>{module.title}</h3>
                  <p>{module.description}</p>
                  {getModuleProgress(module.id) > 0 && (
                    <div className="progress-bar">
                      <div 
                        className="progress-fill"
                        style={{ width: `${getModuleProgress(module.id)}%` }}
                      />
                    </div>
                  )}
                  {module.prerequisites.length > 0 && (
                    <div className="prerequisites">
                      Prerequisites: {module.prerequisites.join(', ')}
                    </div>
                  )}
                </Link>
              ))}
          </div>
        </div>

        <div className="group-section">
          <h2>⚙️ Technical</h2>
          <div className="modules-grid">
            {Object.values(moduleRegistry)
              .filter(module => module.group === 'technical')
              .sort((a, b) => a.order - b.order)
              .map(module => (
                <Link 
                  to={`/module/${module.id}`} 
                  key={module.id}
                  className={`module-card ${getModuleProgress(module.id) === 100 ? 'completed' : ''}`}
                >
                  <div className="module-icon">{moduleIcons[module.id]}</div>
                  <h3>{module.title}</h3>
                  <p>{module.description}</p>
                  {getModuleProgress(module.id) > 0 && (
                    <div className="progress-bar">
                      <div 
                        className="progress-fill"
                        style={{ width: `${getModuleProgress(module.id)}%` }}
                      />
                    </div>
                  )}
                  {module.prerequisites.length > 0 && (
                    <div className="prerequisites">
                      Prerequisites: {module.prerequisites.join(', ')}
                    </div>
                  )}
                </Link>
              ))}
          </div>
        </div>

        <div className="group-section">
          <h2>🚀 Advanced</h2>
          <div className="modules-grid">
            {Object.values(moduleRegistry)
              .filter(module => module.group === 'advanced')
              .sort((a, b) => a.order - b.order)
              .map(module => (
                <Link 
                  to={`/module/${module.id}`} 
                  key={module.id}
                  className={`module-card ${getModuleProgress(module.id) === 100 ? 'completed' : ''}`}
                >
                  <div className="module-icon">{moduleIcons[module.id]}</div>
                  <h3>{module.title}</h3>
                  <p>{module.description}</p>
                  {getModuleProgress(module.id) > 0 && (
                    <div className="progress-bar">
                      <div 
                        className="progress-fill"
                        style={{ width: `${getModuleProgress(module.id)}%` }}
                      />
                    </div>
                  )}
                  {module.prerequisites.length > 0 && (
                    <div className="prerequisites">
                      Prerequisites: {module.prerequisites.join(', ')}
                    </div>
                  )}
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage; 