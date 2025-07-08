import React from 'react';

// Enhanced Button Component with Visual Hierarchy
const Button = ({
  children,
  onClick,
  variant = 'primary', // primary, secondary, success, warning, danger
  size = 'md', // xs, sm, md, lg, xl
  priority = 'medium', // low, medium, high
  disabled = false,
  loading = false,
  className = '',
  icon,
  iconPosition = 'left', // left, right
  number,
  help,
  fullWidth = false,
  ...props
}) => {
  const baseClasses = [
    'button',
    `button-${variant}`,
    `button-${size}`,
    `button-priority-${priority}`,
    fullWidth && 'button-full-width',
    disabled && 'button-state-disabled',
    loading && 'button-loading',
    className
  ].filter(Boolean).join(' ');

  const buttonContent = (
    <>
      {loading && <span className="button-loading-spinner" />}
      {icon && iconPosition === 'left' && (
        <span className="button-icon button-icon-left">{icon}</span>
      )}
      {children}
      {icon && iconPosition === 'right' && (
        <span className="button-icon button-icon-right">{icon}</span>
      )}
    </>
  );

  return (
    <button
      className={baseClasses}
      onClick={onClick}
      disabled={disabled || loading}
      data-help={help}
      {...props}
    >
      {number && <span className="button-number">{number}</span>}
      {buttonContent}
    </button>
  );
};

// Button Group Component
const ButtonGroup = ({
  children,
  layout = 'horizontal', // horizontal, vertical, grid
  alignment = 'center', // start, center, end
  className = '',
  ...props
}) => {
  const groupClasses = [
    'button-group',
    `button-group-${layout}`,
    `button-group-${alignment}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={groupClasses} {...props}>
      {children}
    </div>
  );
};

// Button Flow Component for Multi-step Actions
const ButtonFlow = ({
  steps,
  currentStep = 0,
  onStepClick,
  className = '',
  ...props
}) => {
  return (
    <div className={`button-flow ${className}`} {...props}>
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          {index > 0 && <span className="flow-arrow">→</span>}
          <Button
            variant={index === currentStep ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => onStepClick?.(index)}
            disabled={index > currentStep}
            number={index + 1}
            className={index === currentStep ? 'button-pulse' : ''}
          >
            {step}
          </Button>
        </React.Fragment>
      ))}
    </div>
  );
};

// Progress Button Component
const ProgressButton = ({
  children,
  progress = 0, // 0-100
  onClick,
  variant = 'primary',
  className = '',
  ...props
}) => {
  return (
    <div className={`button-progress-container ${className}`}>
      <Button
        variant={variant}
        onClick={onClick}
        {...props}
      >
        {children}
      </Button>
      <div 
        className="button-progress-bar"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

// Action Button Component with Context
const ActionButton = ({
  children,
  action = 'primary', // primary, secondary, success, warning, danger
  context = 'default', // default, navigation, form, tool, demo
  onClick,
  className = '',
  ...props
}) => {
  const contextClasses = {
    navigation: 'nav-button',
    form: 'form-button',
    tool: 'tool-button',
    demo: 'demo-button'
  };

  const baseClasses = [
    contextClasses[context] || 'button',
    `button-context-${action}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      className={baseClasses}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

// Continue Button Component (Most Common Use Case)
const ContinueButton = ({
  children,
  onClick,
  completed = false,
  nextStep = null,
  className = '',
  ...props
}) => {
  const buttonClasses = [
    'continue-button',
    completed && 'button-success',
    nextStep && 'button-with-progress',
    className
  ].filter(Boolean).join(' ');

  return (
    <Button
      variant="primary"
      size="lg"
      priority="high"
      onClick={onClick}
      className={buttonClasses}
      {...props}
    >
      {children}
      {nextStep && <span className="button-icon button-icon-right">→</span>}
    </Button>
  );
};

// Navigation Button Component
const NavigationButton = ({
  children,
  onClick,
  direction = 'forward', // forward, back, home
  className = '',
  ...props
}) => {
  const directionIcons = {
    forward: '→',
    back: '←',
    home: '🏠'
  };

  return (
    <Button
      variant="secondary"
      size="md"
      priority="low"
      onClick={onClick}
      icon={directionIcons[direction]}
      iconPosition={direction === 'back' ? 'left' : 'right'}
      className={`nav-button ${className}`}
      {...props}
    >
      {children}
    </Button>
  );
};

// Option Button Component for Choices
const OptionButton = ({
  children,
  selected = false,
  onClick,
  disabled = false,
  className = '',
  ...props
}) => {
  const optionClasses = [
    'option-button',
    selected && 'selected',
    disabled && 'disabled',
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      className={optionClasses}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export {
  Button,
  ButtonGroup,
  ButtonFlow,
  ProgressButton,
  ActionButton,
  ContinueButton,
  NavigationButton,
  OptionButton
};

export default Button; 