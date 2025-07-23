import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '../contexts/ProgressContext';
import { CheckCircle } from 'lucide-react';
import { ActionButton } from './ui';

const ModuleCompletionButton = ({ 
  moduleName, 
  moduleId, 
  customMessage = "🎉 Congratulations! You've completed this module!" 
}) => {
  const navigate = useNavigate();
  const { completeModule } = useProgress();

  const handleComplete = () => {
    // Mark module as completed
    completeModule(moduleId);
    
    // Navigate back to homepage
    navigate('/');
  };

  return (
    <ActionButton onClick={handleComplete} className="primary large">
      <CheckCircle className="w-5 h-5" />
      Complete {moduleName} Module
    </ActionButton>
  );
};

export default ModuleCompletionButton;
