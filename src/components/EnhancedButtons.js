import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ArrowLeft, ArrowRight, Play, Pause } from 'lucide-react';
import audioSystem from '../utils/audioSystem';
import contextualBehavior from '../utils/contextualBehavior';
import { generateButtonStyles, colors, spacing, borderRadius, transitions, typography } from '../styles/globalStyles';
import '../styles/modernInteractions.css';

// Enhanced Button Component with Visual Hierarchy, Feedback, and Accessibility
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
  feedback = 'default', // default, haptic, audio, visual
  successAnimation = false,
  errorAnimation = false,
  ariaLabel,
  ariaDescribedBy,
  id,
  onSuccess,
  onError,
  autoFocus = false,
  ...props
}) => {
  const [buttonState, setButtonState] = useState('default'); // default, hover, active, success, error
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

  // Generate styles using global configuration
  const buttonStyles = generateButtonStyles(variant, size);
  
  const baseClasses = [
    'button',
    'modern-card',
    'interactive-element',
    'spring-button',
    `button-priority-${priority}`,
    `button-state-${buttonState}`,
    fullWidth && 'button-full-width',
    disabled && 'button-state-disabled',
    loading && 'button-loading',
    feedbackActive && 'button-feedback-active',
    successAnimation && 'button-success-animation',
    errorAnimation && 'button-error-animation',
    className
  ].filter(Boolean).join(' ');

  // Enhanced click handler with feedback
  const handleClick = async (e) => {
    if (disabled || loading) return;

    // Provide immediate feedback
    provideFeedback();
    
    // Audio feedback
    audioSystem.onInteraction('click');
    
    // Contextual behavior tracking
    contextualBehavior.updateBehavior('clicking', true);
    
    try {
      setButtonState('active');
      
      if (onClick) {
        const result = await onClick(e);
        
        // Handle success
        if (result !== false) {
          setButtonState('success');
          audioSystem.onAchievement('normal');
          if (onSuccess) onSuccess();
          
          // Reset state after animation
          timeoutRef.current = setTimeout(() => {
            setButtonState('default');
          }, 1200); // Extended to 1.2 seconds for better visual feedback
        }
      }
    } catch (error) {
      // Handle error
      setButtonState('error');
      if (onError) onError(error);
      
      // Reset state after animation
      timeoutRef.current = setTimeout(() => {
        setButtonState('default');
      }, 600);
    }
  };

  // Feedback mechanisms
  const provideFeedback = () => {
    setFeedbackActive(true);
    
    // Visual feedback (ripple effect)
    if (feedback === 'visual' || feedback === 'default') {
      createRippleEffect();
    }
    
    // Haptic feedback simulation
    if (feedback === 'haptic' && navigator.vibrate) {
      navigator.vibrate(50);
    }
    
    // Audio feedback
    if (feedback === 'audio') {
      playClickSound();
    }
    
    // Reset feedback state
    setTimeout(() => setFeedbackActive(false), 200);
  };

  const createRippleEffect = () => {
    const button = buttonRef.current;
    if (!button) return;

    const ripple = document.createElement('span');
    ripple.className = 'button-ripple';
    
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = (rect.width / 2 - size / 2) + 'px';
    ripple.style.top = (rect.height / 2 - size / 2) + 'px';
    
    button.appendChild(ripple);
    
    setTimeout(() => {
      if (button.contains(ripple)) {
        button.removeChild(ripple);
      }
    }, 600);
  };

  const playClickSound = () => {
    // Create audio context for click sound
    // eslint-disable-next-line no-undef
    if (typeof AudioContext !== 'undefined' || typeof webkitAudioContext !== 'undefined') {
      // eslint-disable-next-line no-undef
      const audioContext = new (AudioContext || webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.1);
    }
  };

  // Keyboard event handlers
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick(e);
    }
  };

  const buttonContent = (
    <>
      {loading && <span className="button-loading-spinner" />}
      {icon && iconPosition === 'left' && (
        <span className="button-icon button-icon-left">{icon}</span>
      )}
      <span className="button-text">{children}</span>
      {icon && iconPosition === 'right' && (
        <span className="button-icon button-icon-right">{icon}</span>
      )}
    </>
  );

  return (
    <button
      ref={buttonRef}
      id={id}
      className={baseClasses}
      style={{ ...buttonStyles, ...props.style }}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => audioSystem.onInteraction('hover')}
      disabled={disabled || loading}
      aria-label={ariaLabel || (typeof children === 'string' ? children : undefined)}
      aria-describedby={ariaDescribedBy}
      aria-pressed={buttonState === 'active'}
      aria-disabled={disabled || loading}
      data-help={help}
      tabIndex={disabled ? -1 : 0}
      {...props}
    >
      {number && <span className="button-number" aria-hidden="true">{number}</span>}
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

// Enhanced Continue Button with Progress Feedback
const ContinueButton = ({
  children,
  onClick,
  completed = false,
  nextStep = null,
  progress = null,
  className = '',
  showProgress = false,
  onProgress,
  ...props
}) => {
  const [isProgressing, setIsProgressing] = useState(false);
  const [progressValue, setProgressValue] = useState(0);

  const handleClick = async (e) => {
    if (showProgress && !completed) {
      setIsProgressing(true);
      setProgressValue(0);
      
      // Simulate progress if no onProgress provided
      if (!onProgress) {
        const interval = setInterval(() => {
          setProgressValue(prev => {
            if (prev >= 100) {
              clearInterval(interval);
              setIsProgressing(false);
              if (onClick) onClick(e);
              return 100;
            }
            return prev + 10;
          });
        }, 100);
      } else {
        try {
          await onProgress((value) => setProgressValue(value));
          setIsProgressing(false);
          if (onClick) onClick(e);
        } catch (error) {
          setIsProgressing(false);
          throw error;
        }
      }
    } else {
      if (onClick) onClick(e);
    }
  };

  const buttonClasses = [
    'continue-button',
    completed && 'button-success',
    nextStep && 'button-with-progress',
    isProgressing && 'button-progressing',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className="continue-button-container">
      <Button
        variant={completed ? "success" : "primary"}
        size="lg"
        priority="high"
        onClick={handleClick}
        className={buttonClasses}
        loading={isProgressing}
        successAnimation={completed}
        feedback="visual"
        ariaLabel={`Continue: ${children}`}
        {...props}
      >
        {children}
        {nextStep && <span className="button-icon button-icon-right">→</span>}
      </Button>
      
      {showProgress && isProgressing && (
        <div className="continue-progress-bar">
          <div 
            className="continue-progress-fill"
            style={{ width: `${progressValue}%` }}
          />
        </div>
      )}
      
      {progress !== null && (
        <div className="continue-progress-indicator">
          <span className="progress-text">{Math.round(progress)}% complete</span>
        </div>
      )}
    </div>
  );
};

// Enhanced Option Button with Selection Feedback
const OptionButton = ({
  children,
  selected = false,
  onClick,
  disabled = false,
  className = '',
  multiSelect = false,
  correctAnswer = false,
  incorrectAnswer = false,
  explanation,
  showFeedback = false,
  onSelect,
  onDeselect,
  value,
  ...props
}) => {
  const [isSelected, setIsSelected] = useState(selected);
  const [showExplanation, setShowExplanation] = useState(false);

  useEffect(() => {
    setIsSelected(selected);
  }, [selected]);

  const handleClick = (e) => {
    if (disabled) return;

    const newSelected = multiSelect ? !isSelected : true;
    setIsSelected(newSelected);

    if (newSelected && onSelect) {
      onSelect(value || children);
    } else if (!newSelected && onDeselect) {
      onDeselect(value || children);
    }

    if (onClick) {
      onClick(e, newSelected);
    }

    // Show explanation if feedback is enabled
    if (showFeedback && explanation) {
      setShowExplanation(true);
      // Much longer timeout to prevent disappearing too quickly
      setTimeout(() => setShowExplanation(false), 12000); // Extended to 12 seconds
    }
  };

  const optionClasses = [
    'option-button',
    isSelected && 'selected',
    disabled && 'disabled',
    correctAnswer && 'correct',
    incorrectAnswer && 'incorrect',
    showExplanation && 'explaining',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className="option-button-container">
      <button
        className={optionClasses}
        onClick={handleClick}
        disabled={disabled}
        aria-pressed={isSelected}
        aria-describedby={explanation ? `${props.id}-explanation` : undefined}
        role={multiSelect ? 'checkbox' : 'radio'}
        {...props}
      >
        <div className="option-content">
          {multiSelect && (
            <div className="option-checkbox" aria-hidden="true">
              {isSelected ? '✓' : '☐'}
            </div>
          )}
          <div className="option-text">{children}</div>
          {correctAnswer && <div className="option-indicator correct" aria-hidden="true">✓</div>}
          {incorrectAnswer && <div className="option-indicator incorrect" aria-hidden="true">✗</div>}
        </div>
      </button>
      
      {showExplanation && explanation && (
        <div 
          id={`${props.id}-explanation`}
          className="option-explanation"
          role="tooltip"
          aria-live="polite"
        >
          {explanation}
        </div>
      )}
    </div>
  );
};

// Enhanced Action Button with Context-Aware Styling
const ActionButton = ({
  children,
  action = 'primary',
  context = 'default',
  onClick,
  className = '',
  icon,
  loading = false,
  success = false,
  error = false,
  hapticFeedback = false,
  ...props
}) => {
  const contextClasses = {
    navigation: 'nav-button',
    form: 'form-button',
    tool: 'tool-button',
    demo: 'demo-button',
    crisis: 'crisis-button',
    completion: 'completion-button'
  };

  const baseClasses = [
    contextClasses[context] || 'button',
    `button-context-${action}`,
    loading && 'button-loading',
    success && 'button-success',
    error && 'button-error',
    className
  ].filter(Boolean).join(' ');

  return (
    <Button
      className={baseClasses}
      onClick={onClick}
      loading={loading}
      successAnimation={success}
      errorAnimation={error}
      feedback={hapticFeedback ? 'haptic' : 'visual'}
      icon={icon}
      {...props}
    >
      {children}
    </Button>
  );
};

// Enhanced Navigation Button with Direction Awareness
const NavigationButton = ({
  children,
  onClick,
  direction = 'forward', // forward, back, home
  className = '',
  showKeyboardShortcut = false,
  keyboardShortcut,
  ...props
}) => {
  const directionIcons = {
    forward: '→',
    back: '←',
    home: '🏠'
  };

  const directionLabels = {
    forward: 'Next',
    back: 'Previous', 
    home: 'Home'
  };

  useEffect(() => {
    if (showKeyboardShortcut && keyboardShortcut) {
      const handleKeyPress = (e) => {
        if (e.key === keyboardShortcut && (e.ctrlKey || e.metaKey)) {
          e.preventDefault();
          onClick(e);
        }
      };
      
      document.addEventListener('keydown', handleKeyPress);
      return () => document.removeEventListener('keydown', handleKeyPress);
    }
  }, [showKeyboardShortcut, keyboardShortcut, onClick]);

  return (
    <Button
      variant="secondary"
      size="md"
      priority="low"
      onClick={onClick}
      icon={directionIcons[direction]}
      iconPosition={direction === 'back' ? 'left' : 'right'}
      className={`nav-button nav-${direction} ${className}`}
      ariaLabel={`${directionLabels[direction]}: ${children}`}
      {...props}
    >
      {children}
      {showKeyboardShortcut && keyboardShortcut && (
        <span className="keyboard-shortcut" aria-hidden="true">
          {keyboardShortcut}
        </span>
      )}
    </Button>
  );
};

// Enhanced Modal/Popup Button for Interactive Cards
const PopupButton = ({
  children,
  popupContent,
  popupTitle,
  className = '',
  triggerOn = 'click', // click, hover
  position = 'top', // top, bottom, left, right
  closeOnOutsideClick = true,
  showCloseButton = true,
  onOpen,
  onClose,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
  const buttonRef = useRef(null);
  const popupRef = useRef(null);

  const openPopup = () => {
    setIsOpen(true);
    calculatePosition();
    if (onOpen) onOpen();
  };

  const closePopup = useCallback(() => {
    setIsOpen(false);
    if (onClose) onClose();
  }, [onClose]);

  const calculatePosition = () => {
    if (!buttonRef.current) return;
    
    const rect = buttonRef.current.getBoundingClientRect();
    const popup = { width: 300, height: 200 }; // Default popup size
    
    let top, left;
    
    switch (position) {
      case 'top':
        top = rect.top - popup.height - 10;
        left = rect.left + rect.width / 2 - popup.width / 2;
        break;
      case 'bottom':
        top = rect.bottom + 10;
        left = rect.left + rect.width / 2 - popup.width / 2;
        break;
      case 'left':
        top = rect.top + rect.height / 2 - popup.height / 2;
        left = rect.left - popup.width - 10;
        break;
      case 'right':
        top = rect.top + rect.height / 2 - popup.height / 2;
        left = rect.right + 10;
        break;
      default:
        top = rect.bottom + 10;
        left = rect.left;
    }
    
    setPopupPosition({ top, left });
  };

  useEffect(() => {
    if (closeOnOutsideClick && isOpen) {
      const handleClickOutside = (e) => {
        if (popupRef.current && !popupRef.current.contains(e.target) && 
            buttonRef.current && !buttonRef.current.contains(e.target)) {
          closePopup();
        }
      };
      
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen, closeOnOutsideClick, closePopup]);

  const handleTrigger = () => {
    if (triggerOn === 'click') {
      isOpen ? closePopup() : openPopup();
    }
  };

  return (
    <>
      <Button
        ref={buttonRef}
        className={`popup-button ${className}`}
        onClick={handleTrigger}
        onMouseEnter={triggerOn === 'hover' ? openPopup : undefined}
        onMouseLeave={triggerOn === 'hover' ? closePopup : undefined}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
      {...props}
    >
      {children}
      </Button>
      
      {isOpen && (
        <div 
          ref={popupRef}
          className={`button-popup popup-${position}`}
          style={{
            position: 'fixed',
            top: popupPosition.top,
            left: popupPosition.left,
            zIndex: 1000
          }}
          role="dialog"
          aria-labelledby={popupTitle ? "popup-title" : undefined}
        >
          <div className="popup-content">
            {popupTitle && (
              <div className="popup-header">
                <h3 id="popup-title">{popupTitle}</h3>
                {showCloseButton && (
                  <button 
                    className="popup-close"
                    onClick={closePopup}
                    aria-label="Close popup"
                  >
                    ×
    </button>
                )}
              </div>
            )}
            <div className="popup-body">
              {typeof popupContent === 'function' ? popupContent({ close: closePopup }) : popupContent}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// Step Navigation Controls for Multi-Step Modules
export const StepNavigation = ({ 
  currentStep, 
  totalSteps, 
  onPrevious, 
  onNext, 
  onPause,
  onResume,
  isPaused = false,
  canGoNext = true,
  canGoPrevious = true,
  autoAdvance = false,
  autoAdvanceDelay = 3000,
  className = "",
  nextLabel = "Next",
  previousLabel = "Previous"
}) => {
  return (
    <div className={`step-navigation ${className}`}>
      <div className="nav-controls">
        <button 
          onClick={onPrevious}
          disabled={!canGoPrevious || currentStep === 0}
          className="nav-button nav-previous"
        >
          <ArrowLeft size={16} />
          {previousLabel}
        </button>
        
        {autoAdvance && (
          <button 
            onClick={isPaused ? onResume : onPause}
            className={`nav-button nav-pause ${isPaused ? 'paused' : 'playing'}`}
          >
            {isPaused ? <Play size={16} /> : <Pause size={16} />}
            {isPaused ? 'Resume' : 'Pause'}
          </button>
        )}
        
        <div className="step-counter">
          {currentStep + 1} of {totalSteps}
        </div>
        
        <button 
          onClick={onNext}
          disabled={!canGoNext || currentStep >= totalSteps - 1}
          className="nav-button nav-next"
        >
          {nextLabel}
          <ArrowRight size={16} />
        </button>
      </div>
      
      <div className="progress-dots">
        {Array.from({ length: totalSteps }, (_, index) => (
          <div 
            key={index}
            className={`progress-dot ${index === currentStep ? 'current' : ''} ${index < currentStep ? 'completed' : ''}`}
          />
        ))}
      </div>
    </div>
  );
};

// Auto-advance control hook for modules
export const useAutoAdvance = (
  currentStep, 
  totalSteps, 
  onAdvance, 
  delay = 8000, // Increased default delay
  autoStart = false
) => {
  const [isPaused, setIsPaused] = useState(!autoStart);
  const [timeRemaining, setTimeRemaining] = useState(delay);
  
  useEffect(() => {
    if (isPaused || currentStep >= totalSteps - 1) return;
    
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 100) {
          onAdvance();
          return delay;
        }
        return prev - 100;
      });
    }, 100);
    
    return () => clearInterval(timer);
  }, [isPaused, currentStep, totalSteps, onAdvance, delay]);
  
  const pause = () => setIsPaused(true);
  const resume = () => setIsPaused(false);
  const reset = () => {
    setTimeRemaining(delay);
    setIsPaused(!autoStart);
  };
  
  return {
    isPaused,
    timeRemaining,
    pause,
    resume,
    reset,
    progress: ((delay - timeRemaining) / delay) * 100
  };
};

export {
  Button,
  ButtonGroup,
  ButtonFlow,
  ProgressButton,
  ActionButton,
  ContinueButton,
  NavigationButton,
  OptionButton,
  PopupButton
};

export default Button; 