import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { ChevronLeft, Home, Globe, AlertCircle } from 'lucide-react';
import './ModuleLayout.css';

const ModuleLayout = ({ children }) => {
  const { toggleLanguage, language } = useLanguage();

  return (
    <div className="module-layout">
      {/* Header */}
      <header className="module-header">
        <div className="module-header-content">
          <div className="logo" style={{ marginLeft: '0', paddingLeft: '0' }}>
            <span className="bitcoin-symbol">₿</span>
            <div className="logo-container">
              <span className="logo-text">Bitcoin, Straight Up</span>
              <span className="author-text">@Dalia</span>
            </div>
          </div>
          <div className="nav-buttons">
            <Link to="/" className="nav-button">
              <Home size={20} />
              Home
            </Link>
            <Link to="/about" className="nav-button">
              <AlertCircle size={20} />
              About Dalia
            </Link>
            <button className="language-toggle" onClick={toggleLanguage}>
              <Globe size={20} />
              {language === 'en' ? 'ES' : 'EN'}
            </button>
          </div>
        </div>
      </header>

      {/* Module Content */}
      <main className="module-main">
        {children}
      </main>
    </div>
  );
};

export default ModuleLayout; 