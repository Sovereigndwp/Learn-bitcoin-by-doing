import React from 'react';
import { useAutoContrast, useOptimalTextColor, useCardStyles } from '../hooks/useAutoContrast';

// AutoContrast Card Component - Automatically adjusts text color based on background
const AutoContrastCard = ({ 
  children, 
  backgroundColor, 
  theme = 'dark', 
  variant = 'primary',
  className = '',
  style = {},
  ...props 
}) => {
  const { cardRef, style: cardStyle, className: cardClassName } = useCardStyles(theme, variant);
  const autoContrastRef = useAutoContrast(backgroundColor);
  
  // Merge refs if both are needed
  const mergedRef = (element) => {
    if (cardRef) cardRef.current = element;
    if (autoContrastRef) autoContrastRef.current = element;
  };

  const combinedStyle = {
    ...cardStyle,
    ...(backgroundColor && { backgroundColor }),
    ...style
  };

  const combinedClassName = `${cardClassName} ${className}`.trim();

  return (
    <div
      ref={mergedRef}
      className={combinedClassName}
      style={combinedStyle}
      {...props}
    >
      {children}
    </div>
  );
};

// Text Component with automatic contrast
const AutoContrastText = ({ 
  children, 
  backgroundColor, 
  tag: Tag = 'p',
  className = '',
  style = {},
  ...props 
}) => {
  const optimalColor = useOptimalTextColor(backgroundColor);
  
  const textStyle = {
    color: optimalColor,
    ...style
  };

  return (
    <Tag
      className={className}
      style={textStyle}
      {...props}
    >
      {children}
    </Tag>
  );
};

// Button with automatic contrast and modern styling
const AutoContrastButton = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
  style = {},
  ...props
}) => {
  const sizeClasses = {
    sm: 'btn--sm',
    md: 'btn--md', 
    lg: 'btn--lg'
  };

  const variantClasses = {
    primary: 'btn--primary',
    secondary: 'btn--secondary',
    success: 'btn--success',
    warning: 'btn--warning',
    error: 'btn--error',
    outline: 'btn--outline'
  };

  const combinedClassName = `btn ${variantClasses[variant]} ${sizeClasses[size]} ${className}`.trim();

  return (
    <button
      className={combinedClassName}
      style={style}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

// Grid component with modern styling
const ModernGrid = ({
  children,
  columns = 'auto-fit',
  gap = 'lg',
  className = '',
  ...props
}) => {
  const gridClasses = {
    1: 'grid--1',
    2: 'grid--2', 
    3: 'grid--3',
    4: 'grid--4',
    'auto-fit': 'grid--auto-fit',
    'auto-fill': 'grid--auto-fill'
  };

  const combinedClassName = `grid ${gridClasses[columns]} ${className}`.trim();

  return (
    <div className={combinedClassName} {...props}>
      {children}
    </div>
  );
};

// Section component with automatic theming
const ModernSection = ({
  children,
  title,
  subtitle,
  theme = 'dark',
  className = '',
  style = {},
  ...props
}) => {
  const themeClass = theme === 'light' ? 'bg-light' : 'bg-dark';
  const combinedClassName = `${themeClass} ${className}`.trim();

  return (
    <section 
      className={combinedClassName}
      style={{
        padding: 'var(--spacing-xl)',
        borderRadius: 'var(--radius-xl)',
        ...style
      }}
      {...props}
    >
      {title && <h2 className="text-3xl font-bold mb-md">{title}</h2>}
      {subtitle && <p className="text-lg text-neutral-400 mb-lg">{subtitle}</p>}
      {children}
    </section>
  );
};

export {
  AutoContrastCard,
  AutoContrastText,
  AutoContrastButton,
  ModernGrid,
  ModernSection
};

export default AutoContrastCard; 