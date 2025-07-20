import React, { useState, useRef, useEffect } from 'react';
import { ChevronRight, Lock, CheckCircle, Clock, Star, TrendingUp } from 'lucide-react';
import './ModuleCard.css';

/**
 * ModuleCard - Unified card component for consistent module presentation
 * 
 * Features:
 * - Consistent design language across all modules
 * - Interactive hover effects
 * - Progress indicators
 * - Accessibility compliant
 * - Responsive design
 * - Theme-aware styling
 * - Badge support
 * - Loading states
 */
const ModuleCard = ({
  title,
  subtitle,
  description,
  icon,
  variant = 'default',        // default, featured, compact, interactive
  theme = 'auto',             // auto, light, dark, bitcoin, lightning, etc.
  size = 'md',                // sm, md, lg, xl
  disabled = false,
  completed = false,
  locked = false,
  progress = 0,               // 0-100
  badge,
  estimatedTime,
  difficulty,                 // 1-5
  onClick,
  onHover,
  className = '',
  style = {},
  children,
  // Module-specific props
  moduleId,
  category,                   // foundational, technical, advanced, practical
  prerequisites = [],
  points,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const cardRef = useRef(null);

  // Handle click interactions
  const handleClick = (e) => {
    if (disabled || locked) return;
    
    setIsPressed(true);
    setTimeout(() => setIsPressed(false), 150);
    
    if (onClick) {
      onClick(e, { moduleId, title, category });
    }
  };

  // Handle hover effects
  const handleMouseEnter = () => {
    if (disabled || locked) return;
    
    setIsHovered(true);
    if (onHover) {
      onHover(true, { moduleId, title });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (onHover) {
      onHover(false, { moduleId, title });
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick(e);
    }
  };

  // Build class names
  const cardClasses = [
    'module-card',
    `module-card--${variant}`,
    `module-card--${size}`,
    theme !== 'auto' && `module-card--theme-${theme}`,
    category && `module-card--category-${category}`,
    disabled && 'module-card--disabled',
    completed && 'module-card--completed',
    locked && 'module-card--locked',
    isHovered && 'module-card--hovered',
    isPressed && 'module-card--pressed',
    onClick && 'module-card--clickable',
    badge && 'module-card--with-badge',
    className
  ].filter(Boolean).join(' ');

  // Render progress indicator
  const renderProgress = () => {
    if (progress <= 0 && !completed) return null;

    const progressValue = completed ? 100 : progress;
    
    return (
      <div className="module-card__progress">
        <div className="module-card__progress-track">
          <div 
            className="module-card__progress-fill"
            style={{ width: `${progressValue}%` }}
          />
        </div>
        <span className="module-card__progress-text">
          {completed ? 'Completed' : `${Math.round(progressValue)}%`}
        </span>
      </div>
    );
  };

  // Render difficulty indicator
  const renderDifficulty = () => {
    if (!difficulty) return null;

    return (
      <div className="module-card__difficulty" aria-label={`Difficulty: ${difficulty} out of 5`}>
        {Array.from({ length: 5 }, (_, i) => (
          <div
            key={i}
            className={`module-card__difficulty-dot ${
              i < difficulty ? 'active' : ''
            }`}
          />
        ))}
      </div>
    );
  };

  // Render metadata (time, points, etc.)
  const renderMetadata = () => {
    if (!estimatedTime && !points && !difficulty) return null;

    return (
      <div className="module-card__metadata">
        {estimatedTime && (
          <div className="module-card__meta-item">
            <Clock size={14} />
            <span>{estimatedTime}</span>
          </div>
        )}
        {points && (
          <div className="module-card__meta-item">
            <Star size={14} />
            <span>{points}pts</span>
          </div>
        )}
        {difficulty && (
          <div className="module-card__meta-item">
            <TrendingUp size={14} />
            {renderDifficulty()}
          </div>
        )}
      </div>
    );
  };

  // Render status indicator
  const renderStatus = () => {
    if (locked) {
      return (
        <div className="module-card__status module-card__status--locked">
          <Lock size={16} />
        </div>
      );
    }
    
    if (completed) {
      return (
        <div className="module-card__status module-card__status--completed">
          <CheckCircle size={16} />
        </div>
      );
    }

    return null;
  };

  // Render module icon
  const renderIcon = () => {
    if (!icon) return null;

    return (
      <div className="module-card__icon">
        {typeof icon === 'string' ? (
          <span className="module-card__emoji">{icon}</span>
        ) : (
          icon
        )}
      </div>
    );
  };

  return (
    <div
      ref={cardRef}
      className={cardClasses}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onKeyDown={handleKeyDown}
      tabIndex={onClick && !disabled && !locked ? 0 : -1}
      role={onClick ? 'button' : undefined}
      aria-disabled={disabled || locked}
      style={style}
      {...props}
    >
      {/* Background Pattern */}
      <div className="module-card__background" />
      
      {/* Badge */}
      {badge && (
        <div className="module-card__badge">
          {badge}
        </div>
      )}

      {/* Status Indicator */}
      {renderStatus()}

      {/* Header */}
      <div className="module-card__header">
        {renderIcon()}
        
        <div className="module-card__header-content">
          {subtitle && (
            <div className="module-card__subtitle">
              {subtitle}
            </div>
          )}
          
          <h3 className="module-card__title">
            {title}
          </h3>
        </div>
      </div>

      {/* Content */}
      <div className="module-card__content">
        {description && (
          <p className="module-card__description">
            {description}
          </p>
        )}
        
        {children}
      </div>

      {/* Footer */}
      <div className="module-card__footer">
        {renderMetadata()}
        {renderProgress()}
        
        {onClick && !disabled && !locked && (
          <div className="module-card__action">
            <ChevronRight 
              size={16} 
              className="module-card__chevron"
            />
          </div>
        )}
      </div>

      {/* Prerequisites indicator */}
      {prerequisites.length > 0 && (
        <div className="module-card__prerequisites">
          <span className="module-card__prereq-label">Requires:</span>
          <span className="module-card__prereq-list">
            {prerequisites.join(', ')}
          </span>
        </div>
      )}

      {/* Interaction effects */}
      <div className="module-card__glow" />
    </div>
  );
};

// Specialized card variants
export const FeaturedModuleCard = (props) => (
  <ModuleCard variant="featured" size="lg" {...props} />
);

export const CompactModuleCard = (props) => (
  <ModuleCard variant="compact" size="sm" {...props} />
);

export const InteractiveModuleCard = (props) => (
  <ModuleCard variant="interactive" {...props} />
);

// Card container for grid layouts
export const ModuleCardGrid = ({ 
  children, 
  columns = 'auto',        // auto, 1, 2, 3, 4
  gap = 'md',              // sm, md, lg
  className = '',
  ...props 
}) => {
  const gridClasses = [
    'module-card-grid',
    `module-card-grid--columns-${columns}`,
    `module-card-grid--gap-${gap}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={gridClasses} {...props}>
      {children}
    </div>
  );
};

// Card section for organizing multiple cards
export const ModuleCardSection = ({
  title,
  description,
  children,
  className = '',
  ...props
}) => {
  return (
    <section className={`module-card-section ${className}`} {...props}>
      {title && (
        <div className="module-card-section__header">
          <h2 className="module-card-section__title">{title}</h2>
          {description && (
            <p className="module-card-section__description">{description}</p>
          )}
        </div>
      )}
      <div className="module-card-section__content">
        {children}
      </div>
    </section>
  );
};

export default ModuleCard;
