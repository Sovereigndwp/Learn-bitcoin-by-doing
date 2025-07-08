import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { Home, Globe, ArrowLeft, Menu, X } from 'lucide-react';
import './ModuleLayout.css';
import './ModuleCommon.css';
import './QuizStyles.css';

const ModuleLayout = ({ children }) => {
  const { toggleLanguage, language } = useLanguage();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const isHomepage = location.pathname === '/';

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
          
          {/* Desktop Navigation */}
          <div className="nav-buttons desktop-nav">
            {!isHomepage && (
              <Link 
                to="/" 
                className="nav-button back-button"
                style={{ zIndex: 1000, position: 'relative' }}
                title="Go back to homepage"
              >
                <ArrowLeft size={18} className="button-icon button-icon-left" />
                Back
              </Link>
            )}
            <Link 
              to="/" 
              className="nav-button home-button"
              style={{ zIndex: 1000, position: 'relative' }}
              title="Return to homepage"
            >
              <Home size={20} className="button-icon button-icon-left" />
              Home
            </Link>
            <button 
              className="nav-button language-toggle" 
              onClick={toggleLanguage}
              title={`Switch to ${language === 'en' ? 'Spanish' : 'English'}`}
            >
              <Globe size={20} className="button-icon button-icon-left" />
              {language === 'en' ? 'ES' : 'EN'}
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="mobile-nav">
            <button 
              className="nav-button mobile-menu-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              title="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="mobile-nav-menu">
            {!isHomepage && (
              <Link 
                to="/" 
                className="nav-button back-button mobile-nav-item"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <ArrowLeft size={18} className="button-icon button-icon-left" />
                Back to Homepage
              </Link>
            )}
            <Link 
              to="/" 
              className="nav-button home-button mobile-nav-item"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Home size={20} className="button-icon button-icon-left" />
              Homepage
            </Link>
            <button 
              className="nav-button language-toggle mobile-nav-item"
              onClick={() => {
                toggleLanguage();
                setIsMobileMenuOpen(false);
              }}
            >
              <Globe size={20} className="button-icon button-icon-left" />
              Switch to {language === 'en' ? 'Spanish' : 'English'}
            </button>
          </div>
        )}
      </header>

      {/* Module Content */}
      <main className="module-main">
        {children}
      </main>
    </div>
  );
};

export default ModuleLayout; 