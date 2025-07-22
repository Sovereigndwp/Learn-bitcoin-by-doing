import React from 'react';
import InteractiveIcon from './InteractiveIcon';

const PageLayout = ({ 
  title, 
  subtitle, 
  children, 
  theme = 'bitcoin',
  icon,
  className = '' 
}) => {
  const themeConfig = {
    bitcoin: {
      borderColor: 'border-orange-400',
      titleColor: 'text-orange-400',
      subtitleColor: 'text-gray-300',
      accentGlow: 'shadow-orange-400/30'
    },
    lightning: {
      borderColor: 'border-blue-400',
      titleColor: 'text-blue-400',
      subtitleColor: 'text-gray-300',
      accentGlow: 'shadow-blue-400/30'
    },
    custody: {
      borderColor: 'border-green-400',
      titleColor: 'text-green-400',
      subtitleColor: 'text-gray-300',
      accentGlow: 'shadow-green-400/30'
    },
    history: {
      borderColor: 'border-yellow-400',
      titleColor: 'text-yellow-400',
      subtitleColor: 'text-gray-300',
      accentGlow: 'shadow-yellow-400/30'
    },
    advanced: {
      borderColor: 'border-purple-400',
      titleColor: 'text-purple-400',
      subtitleColor: 'text-gray-300',
      accentGlow: 'shadow-purple-400/30'
    }
  };

  const config = themeConfig[theme] || themeConfig.bitcoin;

  return (
    <div className={`mx-auto max-w-6xl px-4 py-8 ${className}`}>
      {/* Header Section */}
      <div className={`mb-8 p-6 rounded-2xl bg-gray-900/70 backdrop-blur-sm border-l-4 ${config.borderColor} shadow-lg ${config.accentGlow}`}>
        <div className="flex items-center gap-4 mb-4">
          {icon && (
            <InteractiveIcon 
              type={icon} 
              size={48} 
              theme={theme}
              animated={true}
            />
          )}
          <div>
            <h1 className={`text-4xl font-bold ${config.titleColor} mb-2`}>
              {title}
            </h1>
            {subtitle && (
              <p className={`text-lg ${config.subtitleColor} opacity-90`}>
                {subtitle}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="space-y-6">
        {children}
      </div>
    </div>
  );
};

export default PageLayout; 