import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '../../contexts/ProgressContext';
import { Trophy, ArrowRight, Home } from 'lucide-react';
import { ContinueButton } from './UnifiedButton';

export const ModuleCompletionButton = ({ 
  moduleName, 
  moduleId, 
  customMessage = null,
  delayNavigation = 2000,
  className = "",
  showHomeButton = true
}) => {
  const navigate = useNavigate();
  const { completeModule } = useProgress();
  const [isCompleting, setIsCompleting] = React.useState(false);

  const handleCompletion = () => {
    setIsCompleting(true);
    completeModule(moduleId);
    
    // Show completion message then navigate
    setTimeout(() => {
      navigate('/');
    }, delayNavigation);
  };

  const defaultMessage = `🎉 Congratulations! You are done with the ${moduleName} module and ready to unlock the next learning adventure!`;
  const displayMessage = customMessage || defaultMessage;

  if (isCompleting) {
    return (
      <div className="completion-success">
        <div className="completion-message">
          <Trophy size={48} className="completion-icon" />
          <h3>Module Complete!</h3>
          <p>{displayMessage}</p>
          <p className="redirect-info">Returning to homepage to unlock your next module...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`module-completion-section ${className}`}>
      <div className="completion-content">
        <div className="completion-header">
          <Trophy size={32} className="trophy-icon" />
          <h3>Ready to Complete {moduleName}?</h3>
        </div>
        
        <p className="completion-description">
          You've mastered the key concepts in this module. Complete it to unlock the next part of your Bitcoin learning journey!
        </p>

        <div className="completion-actions">
          <ContinueButton 
            onClick={handleCompletion}
            className="primary large completion-button"
          >
            <Trophy size={20} />
            You are done with "{moduleName}" module
            <ArrowRight size={20} />
          </ContinueButton>
          
          {showHomeButton && (
            <ContinueButton 
              onClick={() => navigate('/')}
              className="secondary"
            >
              <Home size={16} />
              Return to Homepage
            </ContinueButton>
          )}
        </div>
      </div>
    </div>
  );
}; 