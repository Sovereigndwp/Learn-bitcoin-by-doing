import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  Play, 
  Pause, 
  Check, 
  X, 
  Loader2, 
  ChevronRight,
  AlertCircle 
} from 'lucide-react';
import './UnifiedButton.css';

/**
 * UnifiedButton - Consolidates features from ModernButtons, EnhancedButtons, and OptimizedButton
 * 
 * Features:
 * - Consistent sizing and hierarchy
 * - Multiple variants and states
 * - Haptic and audio feedback options
 * - Progress indication
 * - Accessibility compliant
 * - Responsive design
 * - Loading and success states
 * - Icon positioning
 * - Ripple effects
 */
const UnifiedButton = ({
  children,
  onClick,
  variant = 'primary',           // primary, secondary, success, warning, danger, ghost, outline
  size = 'md',                   // xs, sm, md, lg, xl
  priority = 'medium',           // low, medium, high
  disabled = false,
  loading = false,
  success = false,
  error = false,
  icon,
  iconPosition = 'left',         // left, right
  fullWidth = false,
  className = '',
  ariaLabel,
  tooltip,
  badge,
  progress,                      // 0-100 for progress buttons
  feedback = 'default',          // default, haptic, audio, visual, none
  autoFocus = false,
  ripple = true,
  hapticFeedback = false,
  audioFeedback = false,
  style = {},
  onSuccess,
  onError,
  ...props
}) => {
  const [buttonState, setButtonState] = useState('default');
  const [isPressed, setIsPressed] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [feedbackActive, setFeedbackActive] = useState(false);
  
  const buttonRef = useRef(null);
  const timeoutRef = useRef(null);

  // Auto focus effect
  useEffect(() => {
    if (autoFocus && buttonRef.current) {
      buttonRef.current.focus();
    }
  }, [autoFocus]);

  // Cleanup timeouts
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Enhanced click handler with multiple feedback types
  const handleClick = useCallback(async (e) => {
    if (disabled || loading) return;

    // Immediate visual feedback
    setIsPressed(true);
    setButtonState('active');
    
    // Provide feedback based on settings
    if (feedback !== 'none') {
      provideFeedback();
    }

    try {
      let result;
      if (onClick) {
        result = await onClick(e);
      }

      // Handle success
      if (result !== false) {
        setButtonState('success');
        if (onSuccess) onSuccess();
        
        // Show success state briefly
        timeoutRef.current = setTimeout(() => {
          setButtonState('default');
          setIsPressed(false);
        }, 1200);
      } else {
        // Reset immediately if result is false
        setButtonState('default');
        setIsPressed(false);
      }
    } catch (error) {
      // Handle error
      setButtonState('error');
      if (onError) onError(error);
      
      // Reset after error animation
      timeoutRef.current = setTimeout(() => {
        setButtonState('default');
        setIsPressed(false);
      }, 600);
    }

    // Reset pressed state if not handled above
    if (!timeoutRef.current) {
      setTimeout(() => setIsPressed(false), 150);
    }
  }, [disabled, loading, onClick, feedback, onSuccess, onError]);

  // Feedback mechanisms
  const provideFeedback = () => {
    setFeedbackActive(true);
    
    // Visual feedback (ripple effect)
    if (ripple && (feedback === 'visual' || feedback === 'default')) {
      createRippleEffect();
    }
    
    // Haptic feedback
    if ((hapticFeedback || feedback === 'haptic') && navigator.vibrate) {
      navigator.vibrate(50);
    }
    
    // Audio feedback
    if (audioFeedback || feedback === 'audio') {
      playClickSound();
    }
    
    // Reset feedback state
    setTimeout(() => setFeedbackActive(false), 200);
  };

  const createRippleEffect = () => {
    const button = buttonRef.current;
    if (!button || !ripple) return;

    const rippleElement = document.createElement('span');
    rippleElement.className = 'unified-btn__ripple';
    
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    
    rippleElement.style.width = rippleElement.style.height = size + 'px';
    rippleElement.style.left = (rect.width / 2 - size / 2) + 'px';
    rippleElement.style.top = (rect.height / 2 - size / 2) + 'px';
    
    button.appendChild(rippleElement);
    
    setTimeout(() => {
      if (button.contains(rippleElement)) {
        button.removeChild(rippleElement);
      }
    }, 600);
  };

  const playClickSound = () => {
    // Create subtle audio feedback
    if (typeof AudioContext !== 'undefined' || typeof webkitAudioContext !== 'undefined') {
      try {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return;
  
  const context = new AudioContextClass();
        const oscillator = context.createOscillator();
        const gainNode = context.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(context.destination);
        
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(800, context.currentTime);
        gainNode.gain.setValueAtTime(0.1, context.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 0.1);
        
        oscillator.start(context.currentTime);
        oscillator.stop(context.currentTime + 0.1);
      } catch (error) {
        // Silently fail if audio context can't be created
      }
    }
  };

  // Keyboard event handlers
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick(e);
    }
  };

  // Style object for dynamic properties
  const buttonStyles = {
    width: fullWidth ? '100%' : 'auto',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
  };

  // Build class names
  const baseClasses = [
    'unified-btn',
    `unified-btn--${variant}`,
    `unified-btn--${size}`,
    `unified-btn--priority-${priority}`,
    `unified-btn--state-${buttonState}`,
    className
  ].filter(Boolean).join(' ');

  // Render icon with loading state
  const renderIcon = () => {
    if (loading) {
      return <Loader2 size={16} className="unified-btn__spinner" />;
    }
    if (success && buttonState === 'success') {
      return <Check size={16} className="unified-btn__success-icon" />;
    }
    if (error && buttonState === 'error') {
      return <X size={16} className="unified-btn__error-icon" />;
    }
    if (icon) {
      return <span className="unified-btn__icon">{icon}</span>;
    }
    return null;
  };

  return (
    <div 
      className="unified-btn-wrapper" 
      onMouseEnter={() => tooltip && setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <button
        ref={buttonRef}
        className={baseClasses}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        disabled={disabled || loading}
        aria-label={ariaLabel || (typeof children === 'string' ? children : undefined)}
        aria-pressed={buttonState === 'active'}
        aria-disabled={disabled || loading}
        tabIndex={disabled ? -1 : 0}
        data-variant={variant}
        data-size={size}
        data-priority={priority}
        style={{
          ...buttonStyles,
          transform: isPressed && !disabled ? 'scale(0.98)' : 'scale(1)',
          ...style
        }}
        {...props}
      >
        {iconPosition === 'left' && renderIcon()}
        
        <span className="unified-btn__content">
          {children}
        </span>
        
        {iconPosition === 'right' && renderIcon()}
        
        {badge && (
          <span className="unified-btn__badge">
            {badge}
          </span>
        )}
        
        {progress !== undefined && (
          <div 
            className="unified-btn__progress" 
            style={{ width: `${progress}%` }} 
          />
        )}
      </button>
      
      {tooltip && showTooltip && (
        <div className="unified-btn-tooltip" role="tooltip">
          {tooltip}
        </div>
      )}
    </div>
  );
};

// Specialized button variants
export const PrimaryButton = (props) => (
  <UnifiedButton variant="primary" priority="high" {...props} />
);

export const SecondaryButton = (props) => (
  <UnifiedButton variant="secondary" priority="medium" {...props} />
);

export const ContinueButton = ({ 
  children = 'Continue', 
  nextStep,
  showProgress = false,
  onProgress,
  ...props 
}) => {
  const [isProgressing, setIsProgressing] = useState(false);
  const [progressValue, setProgressValue] = useState(0);

  const handleClick = async (e) => {
    if (showProgress && !props.success) {
      setIsProgressing(true);
      setProgressValue(0);
      
      if (onProgress) {
        try {
          await onProgress((value) => setProgressValue(value));
          setIsProgressing(false);
          if (props.onClick) props.onClick(e);
        } catch (error) {
          setIsProgressing(false);
          throw error;
        }
      }
    } else {
      if (props.onClick) props.onClick(e);
    }
  };

  return (
    <UnifiedButton
      variant={props.success ? 'success' : 'primary'}
      size="lg"
      priority="high"
      icon={<ChevronRight size={16} />}
      iconPosition="right"
      loading={isProgressing}
      progress={showProgress ? progressValue : undefined}
      feedback="visual"
      {...props}
      onClick={handleClick}
    >
      {children}
      {nextStep && <span className="unified-btn__next-step">→ {nextStep}</span>}
    </UnifiedButton>
  );
};

export const OptionButton = ({ 
  selected = false, 
  correct, 
  incorrect, 
  explanation,
  showFeedback = false,
  multiSelect = false,
  onSelect,
  onDeselect,
  value,
  children, 
  ...props 
}) => {
  const [isSelected, setIsSelected] = useState(selected);
  const [showExplanation, setShowExplanation] = useState(false);

  useEffect(() => {
    setIsSelected(selected);
  }, [selected]);

  let variant = 'outline';
  let icon = null;
  let buttonSuccess = false;
  let buttonError = false;
  
  if (isSelected && correct) {
    variant = 'success';
    icon = <Check size={16} />;
    buttonSuccess = true;
  } else if (isSelected && incorrect) {
    variant = 'danger';
    icon = <X size={16} />;
    buttonError = true;
  } else if (isSelected) {
    variant = 'primary';
  }

  const handleClick = (e) => {
    if (props.disabled) return;

    const newSelected = multiSelect ? !isSelected : true;
    setIsSelected(newSelected);

    if (newSelected && onSelect) {
      onSelect(value || children);
    } else if (!newSelected && onDeselect) {
      onDeselect(value || children);
    }

    if (showFeedback && explanation) {
      setShowExplanation(true);
      setTimeout(() => setShowExplanation(false), 8000);
    }

    if (props.onClick) {
      props.onClick(e, newSelected);
    }
  };

  return (
    <div className="option-button-container">
      <UnifiedButton
        variant={variant}
        icon={icon}
        fullWidth
        success={buttonSuccess}
        error={buttonError}
        className={`option-button ${isSelected ? 'selected' : ''}`}
        feedback="visual"
        role={multiSelect ? 'checkbox' : 'radio'}
        aria-pressed={isSelected}
        {...props}
        onClick={handleClick}
      >
        {multiSelect && (
          <span className="option-checkbox" aria-hidden="true">
            {isSelected ? '✓' : '☐'}
          </span>
        )}
        {children}
      </UnifiedButton>
      
      {showExplanation && explanation && (
        <div className="option-explanation" role="tooltip" aria-live="polite">
          {explanation}
        </div>
      )}
    </div>
  );
};

export const NavigationButton = ({ 
  direction = 'next',
  children,
  showKeyboardShortcut = false,
  keyboardShortcut,
  ...props 
}) => {
  const isNext = direction === 'next' || direction === 'forward';
  const isBack = direction === 'previous' || direction === 'back';
  const isHome = direction === 'home';
  
  let icon;
  let defaultLabel;
  
  if (isNext) {
    icon = <ArrowRight size={16} />;
    defaultLabel = 'Next';
  } else if (isBack) {
    icon = <ArrowLeft size={16} />;
    defaultLabel = 'Previous';
  } else if (isHome) {
    icon = '🏠';
    defaultLabel = 'Home';
  }

  useEffect(() => {
    if (showKeyboardShortcut && keyboardShortcut) {
      const handleKeyPress = (e) => {
        if (e.key === keyboardShortcut && (e.ctrlKey || e.metaKey)) {
          e.preventDefault();
          if (props.onClick) props.onClick(e);
        }
      };
      
      document.addEventListener('keydown', handleKeyPress);
      return () => document.removeEventListener('keydown', handleKeyPress);
    }
  }, [showKeyboardShortcut, keyboardShortcut, props.onClick]);

  return (
    <UnifiedButton
      variant="secondary"
      size="md"
      priority="medium"
      icon={icon}
      iconPosition={isBack ? 'left' : 'right'}
      className={`nav-button nav-${direction}`}
      ariaLabel={`${defaultLabel}: ${children || defaultLabel}`}
      {...props}
    >
      {children || defaultLabel}
      {showKeyboardShortcut && keyboardShortcut && (
        <span className="keyboard-shortcut" aria-hidden="true">
          {keyboardShortcut}
        </span>
      )}
    </UnifiedButton>
  );
};

export const IconButton = ({ 
  icon, 
  tooltip, 
  size = 'sm', 
  ...props 
}) => (
  <UnifiedButton
    variant="ghost"
    size={size}
    icon={icon}
    tooltip={tooltip}
    ariaLabel={tooltip}
    className="icon-button"
    {...props}
  />
);

export const ActionButton = ({
  action = 'primary',
  context = 'default',
  ...props
}) => {
  const contextVariants = {
    navigation: 'secondary',
    form: 'primary',
    tool: 'outline',
    demo: 'success',
    crisis: 'danger',
    completion: 'success'
  };

  return (
    <UnifiedButton
      variant={contextVariants[context] || action}
      className={`action-button action-button--${context}`}
      {...props}
    />
  );
};

// Button Group Component
export const ButtonGroup = ({ 
  children, 
  orientation = 'horizontal',
  alignment = 'center',
  spacing = 'md',
  className = '',
  ...props 
}) => {
  const groupClasses = [
    'unified-btn-group',
    `unified-btn-group--${orientation}`,
    `unified-btn-group--${alignment}`,
    `unified-btn-group--spacing-${spacing}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={groupClasses} {...props}>
      {children}
    </div>
  );
};

// Export main component and variants
export {
  UnifiedButton as default,
  UnifiedButton
};

// Popup Button - for modal and popup actions
export const PopupButton = ({
  children,
  onOpen,
  popupContent,
  position = 'bottom',
  className = '',
  ...props
}) => (
  <UnifiedButton 
    variant="outline"
    size="sm"
    onClick={onOpen}
    className={`popup-trigger ${className}`}
    {...props}
  >
    {children}
  </UnifiedButton>
);

// Progress Button - shows progress state
export const ProgressButton = ({
  progress = 0,
  children,
  showPercentage = false,
  ...props
}) => (
  <UnifiedButton
    progress={progress}
    className={progress > 0 ? 'progress-active' : ''}
    {...props}
  >
    {showPercentage ? `${children} (${Math.round(progress)}%)` : children}
  </UnifiedButton>
);

// Step Navigation Button - for multi-step flows
export const StepNavigation = ({
  direction = 'next',
  children,
  ...props
}) => (
  <UnifiedButton
    variant={direction === 'next' ? 'primary' : 'secondary'}
    icon={direction === 'next' ? ArrowRight : ArrowLeft}
    iconPosition={direction === 'next' ? 'right' : 'left'}
    {...props}
  >
    {children}
  </UnifiedButton>
);

// Backward compatibility aliases
export const Button = UnifiedButton;
export const ModernButton = UnifiedButton;
