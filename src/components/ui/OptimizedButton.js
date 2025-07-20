import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronRight, Loader2, Check, X, AlertCircle } from 'lucide-react';
import './OptimizedButton.css';

/**
 * Optimized Button Component - Unified system for all button types
 * Features: Consistent sizing, progressive disclosure, accessible, responsive
 */
const OptimizedButton = ({
  children,
  onClick,
  variant = 'primary', // primary, secondary, success, warning, danger, ghost, outline
  size = 'md', // xs, sm, md, lg, xl
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  className = '',
  ariaLabel,
  tooltip,
  badge,
  progress, // 0-100 for progress buttons
  autoFocus = false,
  ...props
}) => {
  const [isPressed, setIsPressed] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const buttonRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (autoFocus && buttonRef.current) {
      buttonRef.current.focus();
    }
  }, [autoFocus]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleClick = useCallback((e) => {
    if (disabled || loading) return;
    
    setIsPressed(true);
    timeoutRef.current = setTimeout(() => setIsPressed(false), 150);
    
    if (onClick) {
      onClick(e);
    }
  }, [disabled, loading, onClick]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick(e);
    }
  };

  const baseClasses = [
    'opt-btn',
    `opt-btn--${variant}`,
    `opt-btn--${size}`,
    fullWidth && 'opt-btn--full',
    disabled && 'opt-btn--disabled',
    loading && 'opt-btn--loading',
    isPressed && 'opt-btn--pressed',
    badge && 'opt-btn--with-badge',
    progress !== undefined && 'opt-btn--progress',
    className
  ].filter(Boolean).join(' ');

  const renderIcon = () => {
    if (loading) return <Loader2 size={16} className="opt-btn__spinner" />;
    if (icon) return <span className="opt-btn__icon">{icon}</span>;
    return null;
  };

  return (
    <div className="opt-btn-wrapper" onMouseEnter={() => tooltip && setShowTooltip(true)} onMouseLeave={() => setShowTooltip(false)}>
      <button
        ref={buttonRef}
        className={baseClasses}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        disabled={disabled || loading}
        aria-label={ariaLabel || (typeof children === 'string' ? children : undefined)}
        {...props}
      >
        {iconPosition === 'left' && renderIcon()}
        <span className="opt-btn__content">{children}</span>
        {iconPosition === 'right' && renderIcon()}
        {badge && <span className="opt-btn__badge">{badge}</span>}
        {progress !== undefined && (
          <div className="opt-btn__progress" style={{ width: `${progress}%` }} />
        )}
      </button>
      {tooltip && showTooltip && (
        <div className="opt-btn-tooltip">{tooltip}</div>
      )}
    </div>
  );
};

// Specialized button variants
export const PrimaryButton = (props) => (
  <OptimizedButton variant="primary" {...props} />
);

export const ContinueButton = ({ children = 'Continue', ...props }) => (
  <OptimizedButton 
    variant="primary" 
    icon={<ChevronRight size={16} />} 
    iconPosition="right"
    {...props}
  >
    {children}
  </OptimizedButton>
);

export const OptionButton = ({ 
  selected = false, 
  correct, 
  incorrect, 
  children, 
  ...props 
}) => {
  let variant = 'outline';
  let icon = null;
  
  if (selected && correct) {
    variant = 'success';
    icon = <Check size={16} />;
  } else if (selected && incorrect) {
    variant = 'danger';
    icon = <X size={16} />;
  } else if (selected) {
    variant = 'primary';
  }
  
  return (
    <OptimizedButton 
      variant={variant}
      icon={icon}
      fullWidth
      className={selected ? 'selected' : ''}
      {...props}
    >
      {children}
    </OptimizedButton>
  );
};

export const ProgressButton = ({ progress, children, ...props }) => (
  <OptimizedButton progress={progress} {...props}>
    {children}
  </OptimizedButton>
);

export const IconButton = ({ icon, tooltip, size = 'sm', ...props }) => (
  <OptimizedButton 
    variant="ghost" 
    size={size}
    icon={icon}
    tooltip={tooltip}
    ariaLabel={tooltip}
    {...props}
  />
);

export default OptimizedButton;
