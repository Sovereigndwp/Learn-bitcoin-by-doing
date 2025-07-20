import React from 'react';
import { ActionButton, ContinueButton } from './ModernButtons';

/**
 * STANDARDIZED CONTENT COMPONENTS
 * These components ensure consistent styling and structure across all modules
 */

// Introduction/Hero Content Section
export const IntroSection = ({ 
  title, 
  description, 
  children, 
  theme = 'light' 
}) => (
  <div className={`card-hero ${theme === 'dark' ? 'dark-theme' : ''}`}>
    <h1 className="heading-critical">{title}</h1>
    <p>{description}</p>
    {children}
  </div>
);

// Main Learning Content Section
export const ContentSection = ({ 
  title, 
  description, 
  children, 
  theme = 'light' 
}) => (
  <div className={`card-feature ${theme === 'dark' ? 'dark-theme' : ''}`}>
    {title && <h2 className="heading-high">{title}</h2>}
    {description && <p>{description}</p>}
    {children}
  </div>
);

// Supporting Information Section
export const SupportingSection = ({ 
  title, 
  children, 
  theme = 'light' 
}) => (
  <div className={`card-content ${theme === 'dark' ? 'dark-theme' : ''}`}>
    {title && <h3 className="heading-medium">{title}</h3>}
    {children}
  </div>
);

// Compact Information Section
export const CompactSection = ({ 
  title, 
  children, 
  theme = 'light' 
}) => (
  <div className={`card-supporting ${theme === 'dark' ? 'dark-theme' : ''}`}>
    {title && <h4 className="heading-standard">{title}</h4>}
    {children}
  </div>
);

// Interactive Demo Section
export const InteractiveSection = ({ 
  title, 
  description, 
  children, 
  theme = 'light' 
}) => (
  <div className={`interactive-card ${theme === 'dark' ? 'dark-theme' : ''}`}>
    {title && <h3 className="heading-medium">{title}</h3>}
    {description && <p>{description}</p>}
    {children}
  </div>
);

// Quiz/Question Section
export const QuizSection = ({ 
  title, 
  question, 
  options, 
  selectedAnswer, 
  onAnswer, 
  feedback,
  correctAnswer,
  explanation,
  theme = 'light' 
}) => (
  <div className={`quiz-card ${theme === 'dark' ? 'dark-theme' : ''}`}>
    {title && <h3 className="heading-medium">{title}</h3>}
    <h4 className="heading-standard">{question}</h4>
    
    {!feedback && (
      <div className="quiz-options">
        {options.map((option, index) => (
          <ActionButton
            key={index}
            variant={selectedAnswer === index ? 'primary' : 'outline'}
            onClick={() => onAnswer(index)}
            fullWidth
          >
            {option}
          </ActionButton>
        ))}
      </div>
    )}
    
    {feedback && (
      <div className={`quiz-feedback ${feedback.correct ? 'correct' : 'incorrect'}`}>
        <p><strong>{feedback.correct ? '✅ Correct!' : '❌ Incorrect'}</strong></p>
        {!feedback.correct && correctAnswer && (
          <p><strong>Correct answer:</strong> {correctAnswer}</p>
        )}
        {explanation && (
          <div className="quiz-explanation">
            <p><strong>Explanation:</strong> {explanation}</p>
          </div>
        )}
      </div>
    )}
  </div>
);

// Progress Indicator Section
export const ProgressSection = ({ 
  currentStep, 
  totalSteps, 
  stepTitle,
  theme = 'light' 
}) => (
  <div className={`progress-indicator ${theme === 'dark' ? 'dark-theme' : ''}`}>
    <div className="progress-bar">
      <div 
        className="progress-fill"
        style={{ width: `${(currentStep / totalSteps) * 100}%` }}
      />
    </div>
    <div className="progress-text">
      <span>Step {currentStep} of {totalSteps}</span>
      {stepTitle && <span>: {stepTitle}</span>}
    </div>
  </div>
);

// Insight/Tip Box
export const InsightBox = ({ 
  title, 
  children, 
  type = 'info', // info, tip, warning, success
  theme = 'light' 
}) => (
  <div className={`insight-box insight-box--${type} ${theme === 'dark' ? 'dark-theme' : ''}`}>
    {title && <h5 className="heading-low">{title}</h5>}
    {children}
  </div>
);

// Navigation Controls
export const NavigationControls = ({ 
  onPrevious, 
  onNext, 
  canGoPrevious = true, 
  canGoNext = true,
  nextLabel = 'Continue',
  previousLabel = 'Previous'
}) => (
  <div className="navigation-controls">
    {canGoPrevious && (
      <ActionButton 
        variant="secondary" 
        onClick={onPrevious}
      >
        {previousLabel}
      </ActionButton>
    )}
    <div className="navigation-spacer" />
    {canGoNext && (
      <ContinueButton onClick={onNext}>
        {nextLabel}
      </ContinueButton>
    )}
  </div>
);

// Completion Section
export const CompletionSection = ({ 
  title, 
  message, 
  achievements = [], 
  onContinue,
  theme = 'light' 
}) => (
  <div className={`completion-section ${theme === 'dark' ? 'dark-theme' : ''}`}>
    <div className="completion-content">
      <h2 className="heading-high">{title}</h2>
      <p>{message}</p>
      
      {achievements.length > 0 && (
        <div className="achievements">
          <h3 className="heading-medium">🎉 What You've Learned</h3>
          <div className="achievements-list">
            {achievements.map((achievement, index) => (
              <div key={index} className="achievement-item">
                <span className="achievement-number">{index + 1}</span>
                <div className="achievement-content">
                  <h4 className="heading-standard">{achievement.title}</h4>
                  <p>{achievement.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {onContinue && (
        <ContinueButton onClick={onContinue}>
          Complete Module
        </ContinueButton>
      )}
    </div>
  </div>
);

// Demo/Interactive Playground
export const DemoSection = ({ 
  title, 
  description, 
  children,
  actions,
  theme = 'light' 
}) => (
  <div className={`demo-section ${theme === 'dark' ? 'dark-theme' : ''}`}>
    <div className="demo-header">
      {title && <h3 className="heading-medium">{title}</h3>}
      {description && <p>{description}</p>}
    </div>
    
    <div className="demo-content">
      {children}
    </div>
    
    {actions && (
      <div className="demo-actions">
        {actions}
      </div>
    )}
  </div>
);

// Case Study Section
export const CaseStudySection = ({ 
  title, 
  context, 
  challenge, 
  children,
  theme = 'light' 
}) => (
  <div className={`case-study-section ${theme === 'dark' ? 'dark-theme' : ''}`}>
    <div className="case-study-header">
      <h3 className="heading-medium">{title}</h3>
      {context && (
        <div className="case-study-context">
          <h4 className="heading-standard">📋 Context</h4>
          <p>{context}</p>
        </div>
      )}
      {challenge && (
        <div className="case-study-challenge">
          <h4 className="heading-standard">🎯 Challenge</h4>
          <p>{challenge}</p>
        </div>
      )}
    </div>
    
    <div className="case-study-content">
      {children}
    </div>
  </div>
);

// Visual Element Container (for GIFs, images, etc.)
export const VisualElement = ({ 
  src, 
  alt, 
  caption, 
  type = 'image', // image, gif, video
  theme = 'light' 
}) => (
  <div className={`visual-element visual-element--${type} ${theme === 'dark' ? 'dark-theme' : ''}`}>
    {type === 'image' || type === 'gif' ? (
      <img src={src} alt={alt} />
    ) : type === 'video' ? (
      <video src={src} alt={alt} controls />
    ) : null}
    {caption && (
      <div className="visual-caption">
        <p>{caption}</p>
      </div>
    )}
  </div>
);

// Data Display Section
export const DataSection = ({ 
  title, 
  data, 
  format = 'list', // list, grid, table
  theme = 'light' 
}) => (
  <div className={`data-section data-section--${format} ${theme === 'dark' ? 'dark-theme' : ''}`}>
    {title && <h4 className="heading-standard">{title}</h4>}
    
    {format === 'list' && (
      <ul className="data-list">
        {data.map((item, index) => (
          <li key={index}>
            <strong>{item.label}:</strong> {item.value}
          </li>
        ))}
      </ul>
    )}
    
    {format === 'grid' && (
      <div className="data-grid">
        {data.map((item, index) => (
          <div key={index} className="data-item">
            <div className="data-label">{item.label}</div>
            <div className="data-value">{item.value}</div>
          </div>
        ))}
      </div>
    )}
    
    {format === 'table' && (
      <div className="data-table">
        <table>
          <thead>
            <tr>
              {data.headers?.map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.rows?.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </div>
);

export default {
  IntroSection,
  ContentSection,
  SupportingSection,
  CompactSection,
  InteractiveSection,
  QuizSection,
  ProgressSection,
  InsightBox,
  NavigationControls,
  CompletionSection,
  DemoSection,
  CaseStudySection,
  VisualElement,
  DataSection
};
