import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Play, Pause, Check, X, Loader2 } from 'lucide-react';
import { useOptimalTextColor } from '../hooks/useAutoContrast';

// Modern Button Component with Unified Color System
const ModernButton = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  className = '',
  icon,
  iconPosition = 'left',
  fullWidth = false,
  autoFocus = false,
  style = {},
  ...props
}) => {
  const [isPressed, setIsPressed] = useState(false);
  const buttonRef = useRef(null);

  const sizeClasses = {
    xs: 'btn btn--xs',
    sm: 'btn btn--sm', 
    md: 'btn btn--md',
    lg: 'btn btn--lg',
    xl: 'btn btn--xl'
  };

  const variantClasses = {
    primary: 'btn--primary',
    secondary: 'btn--secondary',
    success: 'btn--success',
    warning: 'btn--warning',
    error: 'btn--error',
    outline: 'btn--outline',
    ghost: 'btn--ghost'
  };

  const baseClassName = `btn ${sizeClasses[size]} ${variantClasses[variant]} ${fullWidth ? 'btn--full' : ''} ${className}`.trim();

  const handleMouseDown = () => setIsPressed(true);
  const handleMouseUp = () => setIsPressed(false);
  const handleMouseLeave = () => setIsPressed(false);

  useEffect(() => {
    if (autoFocus && buttonRef.current) {
      buttonRef.current.focus();
    }
  }, [autoFocus]);

  const renderIcon = () => {
    if (loading) return <Loader2 className="animate-spin" size={16} />;
    if (icon) return icon;
    return null;
  };

  return (
    <button
      ref={buttonRef}
      className={baseClassName}
      onClick={onClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      disabled={disabled || loading}
      style={{
        transform: isPressed && !disabled ? 'scale(0.98)' : 'scale(1)',
        ...style
      }}
      {...props}
    >
      {iconPosition === 'left' && renderIcon()}
      {children}
      {iconPosition === 'right' && renderIcon()}
    </button>
  );
};

// Enhanced Action Button for primary actions
const ActionButton = ({ children, ...props }) => (
  <ModernButton variant="primary" size="lg" {...props}>
    {children}
  </ModernButton>
);

// Continue Button with forward icon
const ContinueButton = ({ children, loading, ...props }) => (
  <ModernButton 
    variant="primary" 
    icon={loading ? <Loader2 className="animate-spin" size={16} /> : <ArrowRight size={16} />}
    iconPosition="right" 
    {...props}
  >
    {children || 'Continue'}
  </ModernButton>
);

// Option Button for quiz/choice selections
const OptionButton = ({ 
  children, 
  selected = false, 
  correct, 
  incorrect,
  className = '',
  ...props 
}) => {
  let variant = 'outline';
  let additionalClass = '';
  
  if (selected && correct) {
    variant = 'success';
    additionalClass = 'quiz-option--correct';
  } else if (selected && incorrect) {
    variant = 'error'; 
    additionalClass = 'quiz-option--incorrect';
  } else if (selected) {
    variant = 'primary';
    additionalClass = 'quiz-option--selected';
  }

  return (
    <ModernButton 
      variant={variant}
      className={`quiz-option ${additionalClass} ${className}`.trim()}
      fullWidth
      {...props}
    >
      {children}
    </ModernButton>
  );
};

// Navigation Button for step navigation
const NavigationButton = ({ 
  direction = 'next',
  children,
  disabled,
  ...props 
}) => {
  const isNext = direction === 'next';
  const icon = isNext ? <ArrowRight size={16} /> : <ArrowLeft size={16} />;
  
  return (
    <ModernButton
      variant="secondary"
      icon={icon}
      iconPosition={isNext ? 'right' : 'left'}
      disabled={disabled}
      {...props}
    >
      {children || (isNext ? 'Next' : 'Previous')}
    </ModernButton>
  );
};

// Step Navigation Component
const StepNavigation = ({
  currentStep,
  totalSteps,
  onPrevious,
  onNext,
  canGoPrevious = true,
  canGoNext = true,
  showStepCounter = true,
  className = '',
  ...props
}) => {
  return (
    <div className={`step-navigation ${className}`.trim()} {...props}>
      {showStepCounter && (
        <div className="step-counter">
          <span className="text-sm text-neutral-400">
            Step {currentStep} of {totalSteps}
          </span>
        </div>
      )}
      
      <div className="step-navigation__buttons">
        <NavigationButton
          direction="previous"
          onClick={onPrevious}
          disabled={!canGoPrevious || currentStep <= 1}
        />
        
        <NavigationButton
          direction="next" 
          onClick={onNext}
          disabled={!canGoNext || currentStep >= totalSteps}
        />
      </div>
    </div>
  );
};

// Popup Button for overlay/modal triggers
const PopupButton = ({ children, ...props }) => (
  <ModernButton variant="ghost" size="sm" {...props}>
    {children}
  </ModernButton>
);

// Complete Button for task completion
const CompleteButton = ({ children, completed = false, ...props }) => (
  <ModernButton 
    variant={completed ? "success" : "primary"}
    icon={completed ? <Check size={16} /> : undefined}
    {...props}
  >
    {children || (completed ? 'Completed' : 'Complete')}
  </ModernButton>
);

// Button Group for related actions
const ButtonGroup = ({ 
  children, 
  orientation = 'horizontal',
  className = '',
  ...props 
}) => {
  const orientationClass = orientation === 'vertical' ? 'btn-group--vertical' : 'btn-group--horizontal';
  
  return (
    <div 
      className={`btn-group ${orientationClass} ${className}`.trim()}
      {...props}
    >
      {children}
    </div>
  );
};

// Smart Card Component with automatic contrast
const SmartCard = ({
  children,
  title,
  subtitle,
  backgroundColor,
  theme = 'auto',
  hover = true,
  className = '',
  style = {},
  ...props
}) => {
  const optimalTextColor = useOptimalTextColor(backgroundColor || '#ffffff');
  
  const cardStyle = {
    ...(backgroundColor && { 
      backgroundColor, 
      color: optimalTextColor 
    }),
    ...style
  };

  const cardClass = `smart-card ${theme !== 'auto' ? `smart-card--${theme}` : ''} ${hover ? 'smart-card--hover' : ''} ${className}`.trim();

  return (
    <div className={cardClass} style={cardStyle} {...props}>
      {(title || subtitle) && (
        <div className="smart-card__header">
          {title && <h3 className="smart-card__title">{title}</h3>}
          {subtitle && <p className="smart-card__subtitle">{subtitle}</p>}
        </div>
      )}
      <div className="smart-card__content">
        {children}
      </div>
    </div>
  );
};

// Export all components
export {
  ModernButton,
  ActionButton,
  ContinueButton,
  OptionButton,
  NavigationButton,
  StepNavigation,
  PopupButton,
  CompleteButton,
  ButtonGroup,
  SmartCard
};

// Export original names for backward compatibility
export const Button = ModernButton;

const ModernButtonsExport = {
  ModernButton,
  ActionButton,
  ContinueButton,
  OptionButton,
  NavigationButton,
  StepNavigation,
  PopupButton,
  CompleteButton,
  ButtonGroup,
  SmartCard,
  // Backward compatibility
  Button: ModernButton
};

export default ModernButtonsExport;
