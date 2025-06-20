import React from 'react';
import { Link } from 'react-router-dom';
import { useProgress } from '../contexts/ProgressContext';
import { useLanguage } from '../contexts/LanguageContext';
import { 
  Coins,
  Calculator, 
  Hash, 
  Key, 
  ArrowLeftRight, 
  FileText, 
  GitBranch, 
  Shield,
  Trophy,
  Flame,
  Star,
  Globe,
  AlertCircle,
  Hammer
} from 'lucide-react';
import { getAllModules } from './ModuleRegistry';
import './Homepage.css';

const Homepage = () => {
  const { getProgressPercentage, completedModules, earnedBadges, totalPoints, currentStreak } = useProgress();
  const { t, toggleLanguage, language } = useLanguage();

  const moduleData = [
    {
      id: 'money',
      icon: Coins,
      color: '#F7931A',
      path: '/module/money',
      isFoundational: true
    },
    {
      id: 'numbers',
      icon: Calculator,
      color: '#3B82F6',
      path: '/module/numbers'
    },
    {
      id: 'hashing', 
      icon: Hash,
      color: '#8B5CF6',
      path: '/module/hashing'
    },
    {
      id: 'mining',
      icon: Hammer,
      color: '#F59E0B',
      path: '/module/mining'
    },
    {
      id: 'keys',
      icon: Key,
      color: '#10B981',
      path: '/module/keys'
    },
    {
      id: 'transactions',
      icon: ArrowLeftRight,
      color: '#EF4444',
      path: '/module/transactions'
    },
    {
      id: 'scripts',
      icon: FileText,
      color: '#6366F1',
      path: '/module/scripts'
    },
    {
      id: 'merkle',
      icon: GitBranch,
      color: '#EC4899',
      path: '/module/merkle'
    },
    {
      id: 'custody',
      icon: Shield,
      color: '#F97316',
      path: '/module/custody'
    },
    {
      id: 'myths',
      icon: AlertCircle,
      color: '#0EA5E9',
      path: '/module/myths'
    }
  ];

  // Sort modules by their order
  const sortedModules = [...moduleData].sort((a, b) => {
    const moduleA = getAllModules().find(m => m.id === a.id) || { order: Infinity };
    const moduleB = getAllModules().find(m => m.id === b.id) || { order: Infinity };
    return moduleA.order - moduleB.order;
  });

  return (
    <div className="homepage">
      {/* Header */}
      <header className="homepage-header">
        <div className="header-content">
          <div className="logo">
            <span className="bitcoin-symbol">₿</span>
            <div className="logo-container">
              <span className="logo-text">Bitcoin, Straight Up</span>
              <span className="author-text">@Dalia</span>
            </div>
          </div>
          <div className="nav-buttons">
            <button className="language-toggle" onClick={toggleLanguage}>
              <Globe size={20} />
              {language === 'en' ? 'ES' : 'EN'}
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">{t('heroTitle')}</h1>
          <p className="hero-subtitle">{t('heroSubtitle')}</p>
          <div className="hero-stats">
            <div className="stat" title={`${totalPoints} points earned from completing modules and earning badges`}>
              <Trophy className="stat-icon" />
              <span className="stat-value">{totalPoints.toLocaleString()}</span>
              <span className="stat-label">{t('points')}</span>
            </div>
            <div className="stat" title={`${earnedBadges.length} badges earned from mastering different skills`}>
              <Star className="stat-icon" />
              <span className="stat-value">{earnedBadges.length}</span>
              <span className="stat-label">{t('badges')}</span>
            </div>
            <div className="stat" title={`${currentStreak} day learning streak`}>
              <Flame className="stat-icon" />
              <span className="stat-value">{currentStreak}</span>
              <span className="stat-label">{t('streak')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Progress Section */}
      <section className="progress-section">
        <div className="progress-content">
          <h2 className="progress-title">{t('progressTitle')}</h2>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${getProgressPercentage()}%` }}
            ></div>
          </div>
          <p className="progress-text">
            {completedModules.length} / {moduleData.length} {t('modulesCompleted')}
          </p>
        </div>
      </section>

      {/* Modules Grid */}
      <section className="modules-section">
        <div className="modules-grid">
          {sortedModules.map((module) => {
            const IconComponent = module.icon;
            const progress = getProgressPercentage(module.id);
            const isCompleted = completedModules.includes(module.id);
            const moduleInfo = getAllModules().find(m => m.id === module.id);
            
            return (
              <Link 
                key={module.id}
                to={module.path} 
                className={`module-card ${module.isFoundational ? 'foundational' : ''} ${isCompleted ? 'completed' : ''}`}
                style={{
                  '--module-color': module.color,
                  '--progress': `${progress}%`
                }}
              >
                <div className="module-icon">
                  <IconComponent size={24} />
                </div>
                <div className="module-info">
                  <h3>{moduleInfo?.title || t(`modules.${module.id}`)}</h3>
                  <p>{moduleInfo?.description || t(`moduleDescriptions.${module.id}`)}</p>
                </div>
                {isCompleted && (
                  <div className="completion-badge">
                    <Trophy size={16} />
                    Completed
                  </div>
                )}
                {module.isFoundational && (
                  <div className="foundational-badge">
                    <Star size={16} />
                    Start Here
                  </div>
                )}
              </Link>
            );
          })}
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to become a Bitcoin expert?</h2>
          <p>Join thousands of learners mastering Bitcoin through hands-on practice</p>
          <Link to="/module/money" className="cta-button">
            {t('getStarted')}
          </Link>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="homepage-footer">
        <div className="footer-content">
          <Link to="/about" className="about-link">
            About Dalia
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default Homepage; 