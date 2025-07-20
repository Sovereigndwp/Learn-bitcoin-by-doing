import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Info, X } from 'lucide-react';
import './OptimizedCard.css';

/**
 * Optimized Card Component - Progressive disclosure, responsive, accessible
 * Features: Collapsible content, proper spacing, consistent styling
 */
const OptimizedCard = ({
  title,
  subtitle,
  children,
  variant = 'default', // default, elevated, outlined, glass
  size = 'standard', // compact, supporting, standard, content, feature, hero
  importance = 'standard', // critical, high, medium, standard, low, minimal
  collapsible = false,
  defaultExpanded = true,
  interactive = false,
  onClick,
  className = '',
  headerActions,
  footer,
  ...props
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const [isHovered, setIsHovered] = useState(false);

  const handleToggle = () => {
    if (collapsible) {
      setIsExpanded(!isExpanded);
    }
  };

  const handleCardClick = (e) => {
    if (onClick && !collapsible) {
      onClick(e);
    }
  };

  const baseClasses = [
    'opt-card',
    `opt-card--${variant}`,
    `opt-card--${size}`,
    `card-${size}`, // Use hierarchical card classes from hierarchicalSystem.css
    `heading-${importance}`, // Use hierarchical heading classes
    interactive && 'opt-card--interactive',
    collapsible && 'opt-card--collapsible',
    isHovered && 'opt-card--hovered',
    className
  ].filter(Boolean).join(' ');

  return (
    <div
      className={baseClasses}
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      {(title || subtitle || collapsible || headerActions) && (
        <div className="opt-card__header">
          <div className="opt-card__header-content">
            {title && <h3 className="opt-card__title">{title}</h3>}
            {subtitle && <p className="opt-card__subtitle">{subtitle}</p>}
          </div>
          <div className="opt-card__header-actions">
            {headerActions}
            {collapsible && (
              <button
                className="opt-card__toggle"
                onClick={handleToggle}
                aria-label={isExpanded ? 'Collapse' : 'Expand'}
              >
                {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
            )}
          </div>
        </div>
      )}
      
      {(!collapsible || isExpanded) && (
        <div className="opt-card__content">
          {children}
        </div>
      )}
      
      {footer && (
        <div className="opt-card__footer">
          {footer}
        </div>
      )}
    </div>
  );
};

// Specialized card variants
export const ModuleCard = ({ 
  title, 
  description, 
  progress, 
  completed, 
  locked, 
  onClick, 
  ...props 
}) => {
  const cardVariant = locked ? 'outlined' : completed ? 'elevated' : 'default';
  
  return (
    <OptimizedCard
      variant={cardVariant}
      interactive={!locked}
      onClick={locked ? undefined : onClick}
      className={`module-card ${locked ? 'locked' : ''} ${completed ? 'completed' : ''}`}
      {...props}
    >
      <div className="module-card__content">
        <h4 className="module-card__title">{title}</h4>
        <p className="module-card__description">{description}</p>
        {progress !== undefined && (
          <div className="module-card__progress">
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="progress-text">{progress}% complete</span>
          </div>
        )}
      </div>
    </OptimizedCard>
  );
};

export const InsightCard = ({ icon: Icon, title, children, variant = 'glass', ...props }) => (
  <OptimizedCard variant={variant} className="insight-card" {...props}>
    <div className="insight-card__content">
      {Icon && <Icon className="insight-card__icon" size={24} />}
      <div className="insight-card__text">
        {title && <h4 className="insight-card__title">{title}</h4>}
        <div className="insight-card__body">{children}</div>
      </div>
    </div>
  </OptimizedCard>
);

export const QuestionCard = ({ 
  question, 
  options, 
  selectedAnswer, 
  correctAnswer, 
  explanation, 
  onAnswerSelect,
  ...props 
}) => {
  const [showResult, setShowResult] = useState(false);

  const handleAnswerClick = (answer) => {
    if (onAnswerSelect) {
      onAnswerSelect(answer);
    }
    setShowResult(true);
  };

  return (
    <OptimizedCard variant="outlined" className="question-card" {...props}>
      <div className="question-card__question">
        <h4>{question}</h4>
      </div>
      
      {!showResult ? (
        <div className="question-card__options">
          {options.map((option, index) => (
            <button
              key={index}
              className="question-card__option"
              onClick={() => handleAnswerClick(option)}
            >
              {option}
            </button>
          ))}
        </div>
      ) : (
        <div className="question-card__result">
          <div className={`answer ${selectedAnswer === correctAnswer ? 'correct' : 'incorrect'}`}>
            <strong>Your answer:</strong> {selectedAnswer}
          </div>
          {correctAnswer && selectedAnswer !== correctAnswer && (
            <div className="correct-answer">
              <strong>Correct answer:</strong> {correctAnswer}
            </div>
          )}
          {explanation && (
            <div className="explanation">
              <strong>Explanation:</strong> {explanation}
            </div>
          )}
        </div>
      )}
    </OptimizedCard>
  );
};

export default OptimizedCard;
