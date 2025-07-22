import React, { useState } from 'react';

export const ModuleCard = ({ 
  theme = 'bitcoin', 
  interactive = false, 
  children, 
  className = '',
  onClick,
  variant = 'default', // default, feature, quiz, demo
  size = 'medium' // small, medium, large
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const themeConfig = {
    bitcoin: {
      border: 'border-orange-400/30',
      hoverBorder: 'hover:border-orange-400',
      shadow: 'shadow-orange-400/20',
      hoverShadow: 'hover:shadow-orange-400/40',
      glow: 'hover:shadow-[0_0_20px_rgba(251,146,60,0.3)]'
    },
    lightning: {
      border: 'border-blue-400/30',
      hoverBorder: 'hover:border-blue-400',
      shadow: 'shadow-blue-400/20',
      hoverShadow: 'hover:shadow-blue-400/40',
      glow: 'hover:shadow-[0_0_20px_rgba(96,165,250,0.3)]'
    },
    custody: {
      border: 'border-green-400/30',
      hoverBorder: 'hover:border-green-400',
      shadow: 'shadow-green-400/20',
      hoverShadow: 'hover:shadow-green-400/40',
      glow: 'hover:shadow-[0_0_20px_rgba(74,222,128,0.3)]'
    },
    history: {
      border: 'border-yellow-400/30',
      hoverBorder: 'hover:border-yellow-400',
      shadow: 'shadow-yellow-400/20',
      hoverShadow: 'hover:shadow-yellow-400/40',
      glow: 'hover:shadow-[0_0_20px_rgba(250,204,21,0.3)]'
    },
    advanced: {
      border: 'border-purple-400/30',
      hoverBorder: 'hover:border-purple-400',
      shadow: 'shadow-purple-400/20',
      hoverShadow: 'hover:shadow-purple-400/40',
      glow: 'hover:shadow-[0_0_20px_rgba(168,85,247,0.3)]'
    }
  };

  const sizeConfig = {
    small: 'p-4 rounded-lg',
    medium: 'p-6 rounded-xl',
    large: 'p-8 rounded-2xl'
  };

  const variantConfig = {
    default: 'bg-gray-900/70',
    feature: 'bg-gradient-to-br from-gray-900/80 to-gray-800/60',
    quiz: 'bg-gray-900/60 border-2',
    demo: 'bg-gradient-to-r from-gray-900/90 to-gray-800/70'
  };

  const config = themeConfig[theme] || themeConfig.bitcoin;
  const sizeClasses = sizeConfig[size] || sizeConfig.medium;
  const variantClasses = variantConfig[variant] || variantConfig.default;

  const baseClasses = `
    ${variantClasses}
    ${sizeClasses}
    backdrop-blur-sm
    border
    ${config.border}
    ${interactive ? config.hoverBorder : ''}
    shadow-lg
    ${config.shadow}
    ${interactive ? config.hoverShadow : ''}
    ${interactive ? config.glow : ''}
    transition-all
    duration-300
    ease-out
    ${interactive ? 'cursor-pointer transform hover:scale-[1.02] hover:-translate-y-1' : ''}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  const handleClick = (e) => {
    if (interactive && onClick) {
      onClick(e);
    }
  };

  return (
    <div
      className={baseClasses}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      onKeyDown={interactive ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick(e);
        }
      } : undefined}
    >
      {children}
    </div>
  );
};

export default ModuleCard;
