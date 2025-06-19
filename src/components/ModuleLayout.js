import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { ArrowLeft, Home, Globe } from 'lucide-react';
import './ModuleLayout.css';

const ModuleLayout = ({ children }) => {
  const { toggleLanguage, language } = useLanguage();

  return (
    <div className="module-layout">
      {/* Header */}
      <header className="module-header">
        <div className="module-header-content">
          <div className="module-nav">
            <Link to="/" className="nav-button">
              <ArrowLeft size={20} />
              Back
            </Link>
            <Link to="/" className="home-button">
              <Home size={20} />
            </Link>
          </div>
          
          <div className="logo">
            <span className="bitcoin-symbol">₿</span>
            <div className="logo-container">
              <span className="logo-text">Bitcoin, Straight Up</span>
              <span className="author-text">@Dalia</span>
            </div>
          </div>
          
          <button className="language-toggle" onClick={toggleLanguage}>
            <Globe size={20} />
            {language === 'en' ? 'ES' : 'EN'}
          </button>
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