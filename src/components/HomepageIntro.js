import React from 'react';
import { Link } from 'react-router-dom';
import { useProgress } from '../contexts/ProgressContext';
import { moduleRegistry, getNextModule } from '../modules/ModuleRegistry';
import { Play, CheckCircle, Clock, Target, Lock, Trophy } from 'lucide-react';
import './HomepageIntro.css';

const HomepageIntro = ({ 
  bankingExperienceCompleted, 
  onExperienceComplete, 
  showWelcomeMessage, 
  onDismissWelcome 
}) => {
  const { getModuleProgress, isModuleCompleted } = useProgress();
  const [showRealityCheckEmbed, setShowRealityCheckEmbed] = React.useState(false);
  
  // Calculate progress stats
  const totalModules = Object.values(moduleRegistry).length;
  const completedModules = Object.values(moduleRegistry).filter(module => 
    isModuleCompleted(module.id)
  ).length;
  const completionPercentage = Math.round((completedModules / totalModules) * 100);
  
  // Get next module
  const completedModuleIds = Object.values(moduleRegistry)
    .filter(module => getModuleProgress(module.id) === 100)
    .map(module => module.id);
  const nextModule = getNextModule(completedModuleIds);

  return (
    <section className="homepage-intro">
      <div className="intro-container">
        <h2 className="intro-title">
          🧠 Rethink What You Thought You Knew About Money
        </h2>
        <p className="intro-description">
          The money system shapes nearly everything in your life—yet most of us
          were never taught how it really works.
        </p>

        {/* Progress indicator for all users */}
        {bankingExperienceCompleted && (
          <div className="progress-indicator">
            <div className="progress-stats">
              <div className="stat-item">
                <Trophy size={16} />
                <span>{completedModules} of {totalModules} modules completed</span>
              </div>
              <div className="completion-percentage">{completionPercentage}%</div>
            </div>
            {nextModule && completedModules > 0 && (
              <div className="next-module-hint">
                <span>Next: {nextModule.title}</span>
              </div>
            )}
          </div>
        )}

        {/* Key statistics */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">💸</div>
            <div className="stat-value">$1.3M</div>
            <p className="stat-label">
              Estimated lifetime loss from inflation and hidden fees
            </p>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🏦</div>
            <div className="stat-value">73%</div>
            <p className="stat-label">
              Live without full access to basic financial tools
            </p>
          </div>
          <div className="stat-card">
            <div className="stat-icon">⚡</div>
            <div className="stat-value">15 Minutes</div>
            <p className="stat-label">
              To start seeing money—and its alternatives—differently
            </p>
          </div>
        </div>

        {/* Reality Check Section */}
        <div className="reality-check-section">
          <h3 className="reality-check-title">
            🔍 Start Here: A Reality Check
          </h3>
          <p className="reality-check-description">
            What if everything you believe about money is wrong? This interactive experience reveals the uncomfortable truths behind our financial system that banks and governments prefer you never discover.
          </p>
          
          <div className="reality-check-insights">
            <div className="insight-item">
              <Clock size={16} />
              <span>Interactive exploration</span>
            </div>
            <div className="insight-item">
              <Target size={16} />
              <span>Hidden truths revealed</span>
            </div>
            <div className="insight-item">
              <Lock size={16} />
              <span>Foundation knowledge</span>
            </div>
          </div>

          {!bankingExperienceCompleted ? (
            <div className="reality-check-actions">
              <div className="canva-embed-container">
                <div style={{
                  position: 'relative',
                  width: '100%',
                  height: 0,
                  paddingTop: '56.2225%',
                  paddingBottom: 0,
                  boxShadow: '0 2px 8px 0 rgba(63,69,81,0.16)',
                  marginTop: '1.6em',
                  marginBottom: '0.9em',
                  overflow: 'hidden',
                  borderRadius: '8px',
                  willChange: 'transform'
                }}>
                  <iframe 
                    loading="lazy"
                    style={{
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      top: 0,
                      left: 0,
                      border: 'none',
                      padding: 0,
                      margin: 0
                    }}
                    src="https://www.canva.com/design/DAGsxTuHAPQ/3wSLQVpMathQYC5B7dJwIA/view?embed"
                    allowFullScreen="allowfullscreen"
                    allow="fullscreen"
                    title="The Magic of Modern Money Simulation"
                  />
                </div>
                <div className="canva-attribution">
                  <a 
                    href="https://www.canva.com/design/DAGsxTuHAPQ/3wSLQVpMathQYC5B7dJwIA/view?utm_content=DAGsxTuHAPQ&utm_campaign=designshare&utm_medium=embeds&utm_source=link"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="canva-link"
                  >
                    The Magic of Modern Money Simulation (Website)
                  </a>
                  <span> by Dalia Platt</span>
                </div>
              </div>
              
              <button
                className="reality-check-button"
                onClick={onExperienceComplete}
              >
                <CheckCircle size={16} />
                I Understand the Reality
              </button>
              
              <div className="experience-note">
                <span>🎯 This will unlock the Money module</span>
              </div>
            </div>
          ) : (
            <div className="reality-check-completed">
              <div className="completed-actions">
                <div className="completed-indicator">
                  <CheckCircle size={16} />
                  <span>Reality Check Complete</span>
                </div>
                <button
                  className="revisit-button"
                  onClick={() => setShowRealityCheckEmbed(!showRealityCheckEmbed)}
                >
                  <Play size={16} />
                  {showRealityCheckEmbed ? 'Hide' : 'Revisit'} Reality Check
                </button>
              </div>
              
              {showRealityCheckEmbed && (
                <div className="canva-embed-container">
                  <div style={{
                    position: 'relative',
                    width: '100%',
                    height: 0,
                    paddingTop: '56.2225%',
                    paddingBottom: 0,
                    boxShadow: '0 2px 8px 0 rgba(63,69,81,0.16)',
                    marginTop: '1.6em',
                    marginBottom: '0.9em',
                    overflow: 'hidden',
                    borderRadius: '8px',
                    willChange: 'transform'
                  }}>
                    <iframe 
                      loading="lazy"
                      style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        top: 0,
                        left: 0,
                        border: 'none',
                        padding: 0,
                        margin: 0
                      }}
                      src="https://www.canva.com/design/DAGsxTuHAPQ/3wSLQVpMathQYC5B7dJwIA/view?embed"
                      allowFullScreen="allowfullscreen"
                      allow="fullscreen"
                      title="The Magic of Modern Money Simulation"
                    />
                  </div>
                  <div className="canva-attribution">
                    <a 
                      href="https://www.canva.com/design/DAGsxTuHAPQ/3wSLQVpMathQYC5B7dJwIA/view?utm_content=DAGsxTuHAPQ&utm_campaign=designshare&utm_medium=embeds&utm_source=link"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="canva-link"
                    >
                      The Magic of Modern Money Simulation (Website)
                    </a>
                    <span> by Dalia Platt</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <blockquote className="intro-quote">
          "Ready to explore? Begin with an interactive journey into how money came to be, how it broke, and what's finally being done to fix it."
        </blockquote>
      </div>
    </section>
  );
};

export default HomepageIntro; 