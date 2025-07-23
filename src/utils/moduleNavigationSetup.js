/**
 * Global Module Navigation Setup
 * 
 * This utility provides a standardized way for all modules to expose navigation functions
 * that can be used by the Learning Support buttons in the contextual behavior system.
 */

import { useNavigate } from 'react-router-dom';

/**
 * Sets up global navigation functions for a module
 * @param {Object} config - Configuration object
 * @param {Function} config.goToPreviousSection - Function to navigate to previous section within the module
 * @param {Function} config.goToNextSection - Function to navigate to next section within the module
 * @param {Function} config.getCurrentSection - Function that returns current section info
 * @param {string} config.moduleId - The ID of the current module
 */
export const setupModuleNavigation = (config) => {
  const navigate = useNavigate();
  
  const handleReviewPrevious = () => {
    if (config.goToPreviousSection) {
      config.goToPreviousSection();
    }
  };

  const handleContinueLearning = () => {
    // Navigate to the continue learning page (homepage with learning view)
    navigate('/?view=learning');
  };

  // Make navigation functions globally available for the Learning Support buttons
  window.moduleNavigation = {
    reviewPrevious: handleReviewPrevious,
    continueLearning: handleContinueLearning,
    currentModule: config.moduleId,
    getCurrentSection: config.getCurrentSection
  };

  // Return cleanup function
  return () => {
    delete window.moduleNavigation;
  };
};

/**
 * React hook for setting up module navigation
 * @param {Object} config - Configuration object (same as setupModuleNavigation)
 * @param {Array} dependencies - React dependencies array for useEffect
 */
export const useModuleNavigation = (config, dependencies = []) => {
  const React = require('react');
  
  React.useEffect(() => {
    const cleanup = setupModuleNavigation(config);
    return cleanup;
  }, dependencies);
};

export default { setupModuleNavigation, useModuleNavigation };
