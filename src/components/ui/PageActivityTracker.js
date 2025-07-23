import React, { useState, useEffect } from 'react';
import { useProgress } from '../../contexts/ProgressContext';
import { useNavigate } from 'react-router-dom';
import contextualBehavior from '../../utils/contextualBehavior';
import { ContinueButton, NavigationButton } from './UnifiedButton';
import { ArrowRight, ChevronUp, Home } from 'lucide-react';
import './PageActivityTracker.css';

/**
 * PageActivityTracker - Tracks completion of all activities on a page
 * and provides appropriate next steps (Next Module button or scroll to learning path)
 * 
 * Props:
 * - activities: Array of activity objects with completion status
 * - moduleId: Current module ID
 * - pageId: Current page ID
 * - autoScroll: Whether to auto-scroll to learning path when all activities complete
 * - showNextButton: Whether to show Next Module button when all activities complete
 */
const PageActivityTracker = ({
  activities = [],
  moduleId,
  pageId,
  autoScroll = true,
  showNextButton = true,
  className = ''
}) => {
  const navigate = useNavigate();
  const { getNextRecommendation } = useProgress();
  const [allActivitiesCompleted, setAllActivitiesCompleted] = useState(false);
  const [nextModule, setNextModule] = useState(null);

  // Track activity completion
  useEffect(() => {
    const completed = activities.every(activity => activity.completed);
    setAllActivitiesCompleted(completed);

    if (completed) {
      // Get next module recommendation
      const next = getNextRecommendation();
      setNextModule(next);

      // Trigger contextual behavior
      contextualBehavior.allPageActivitiesCompleted();

      // Auto-scroll if enabled
      if (autoScroll) {
        setTimeout(() => {
          contextualBehavior.scrollToLearningPath();
        }, 1000); // Small delay to let completion animations finish
      }
    }
  }, [activities, autoScroll, getNextRecommendation]);

  const handleNextModule = () => {
    if (nextModule) {
      navigate(`/module/${nextModule.id}`);
    } else {
      navigate('/');
    }
  };

  const handleScrollToTop = () => {
    contextualBehavior.scrollToLearningPath();
  };

  // Don't render anything if not all activities are completed
  if (!allActivitiesCompleted) {
    return null;
  }

  return (
    <div className={`page-activity-tracker ${className}`}>
      <div className="completion-notification">
        <div className="completion-content">
          <div className="completion-header">
            <span className="completion-icon">🎯</span>
            <h3>All Activities Completed!</h3>
          </div>
          
          <p className="completion-message">
            Great work! You've finished all activities on this page. 
            {nextModule 
              ? ` Ready to continue to "${nextModule.title}"?`
              : " You've completed all available modules!"
            }
          </p>

          <div className="completion-actions">
            {showNextButton && nextModule && (
              <ContinueButton
                onClick={handleNextModule}
                className="primary"
                size="lg"
              >
                <ArrowRight size={16} />
                Next: {nextModule.title}
              </ContinueButton>
            )}

            <NavigationButton
              direction="home"
              onClick={() => navigate('/')}
              className="secondary"
            >
              Learning Path
            </NavigationButton>

            <button
              onClick={handleScrollToTop}
              className="scroll-to-top-button"
              title="Scroll to top"
            >
              <ChevronUp size={16} />
              Back to Top
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Hook to track activities completion
 * Usage: const { addActivity, markCompleted, allCompleted } = useActivityTracker();
 */
export const useActivityTracker = () => {
  const [activities, setActivities] = useState([]);

  const addActivity = (activityId, activityType = 'general') => {
    setActivities(prev => {
      const exists = prev.find(a => a.id === activityId);
      if (!exists) {
        return [...prev, {
          id: activityId,
          type: activityType,
          completed: false,
          completedAt: null
        }];
      }
      return prev;
    });
  };

  const markCompleted = (activityId) => {
    setActivities(prev => 
      prev.map(activity =>
        activity.id === activityId
          ? { ...activity, completed: true, completedAt: Date.now() }
          : activity
      )
    );
  };

  const resetActivities = () => {
    setActivities([]);
  };

  const allCompleted = activities.length > 0 && activities.every(a => a.completed);
  const completionRate = activities.length > 0 
    ? activities.filter(a => a.completed).length / activities.length 
    : 0;

  return {
    activities,
    addActivity,
    markCompleted,
    resetActivities,
    allCompleted,
    completionRate
  };
};

/**
 * Higher-order component to wrap pages with activity tracking
 */
export const withActivityTracking = (WrappedComponent) => {
  return function ActivityTrackedPage(props) {
    const activityTracker = useActivityTracker();

    return (
      <div className="activity-tracked-page">
        <WrappedComponent {...props} activityTracker={activityTracker} />
        <PageActivityTracker
          activities={activityTracker.activities}
          moduleId={props.moduleId}
          pageId={props.pageId}
          autoScroll={props.autoScroll !== false}
          showNextButton={props.showNextButton !== false}
        />
      </div>
    );
  };
};

export default PageActivityTracker;
