import React, { lazy, Suspense } from 'react';

// Loading component for Suspense fallback
const Loading = () => (
  <div className="lesson-loading">
    <div className="loading-spinner">Loading...</div>
  </div>
);

/**
 * Resolves lesson content based on moduleId, lessonId, and viewId
 * Uses dynamic imports to load individual lesson components
 */
export default function LessonContentResolver({ moduleId, lessonId, viewId }) {
  
  // Content resolver mapping
  const resolveContent = () => {
    switch (moduleId) {
      case 'money':
        // For Money module, we still use the full module for now
        // TODO: Extract individual lesson components from MoneyModule
        const MoneyModule = lazy(() => import('../modules/MoneyModule'));
        return (
          <div className="lesson-content-wrapper">
            <Suspense fallback={<Loading />}>
              <MoneyModule />
            </Suspense>
          </div>
        );
      
      case 'bitcoin-basics':
        // Use new individual lesson components
        try {
          const Component = lazy(() => 
            import(`../pages/modules/${moduleId}/${lessonId}/${viewId}.jsx`)
          );
          return (
            <div className="lesson-content-wrapper">
              <Suspense fallback={<Loading />}>
                <Component />
              </Suspense>
            </div>
          );
        } catch (error) {
          // Fallback to placeholder if component doesn't exist
          return (
            <div className="lesson-content-wrapper">
              <div className="lesson-content-placeholder">
                <h2>Bitcoin Basics - {lessonId}</h2>
                <p>Content for {viewId} coming soon...</p>
                <p><small>Expected: src/pages/modules/{moduleId}/{lessonId}/{viewId}.jsx</small></p>
              </div>
            </div>
          );
        }
      
      case 'numbers':
      case 'hashing':
      case 'keys':
      case 'transactions':
      case 'scripts':
      case 'merkle':
      case 'mining':
      case 'custody':
      case 'lightning':
      case 'bitcoin-toolkit':
      case 'myths':
      case 'advanced-topics':
        // Try to load individual lesson components, fallback to placeholder
        try {
          const Component = lazy(() => 
            import(`../pages/modules/${moduleId}/${lessonId}/${viewId}.jsx`)
          );
          return (
            <div className="lesson-content-wrapper">
              <Suspense fallback={<Loading />}>
                <Component />
              </Suspense>
            </div>
          );
        } catch (error) {
          // Fallback to placeholder if component doesn't exist
          return (
            <div className="lesson-content-wrapper">
              <div className="lesson-content-placeholder">
                <h2>{moduleId.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())} - {lessonId}</h2>
                <p>Content for {viewId} coming soon...</p>
                <p><small>Expected: src/pages/modules/{moduleId}/{lessonId}/{viewId}.jsx</small></p>
              </div>
            </div>
          );
        }
      
      default:
        return (
          <div className="lesson-content-wrapper">
            <div className="lesson-content-placeholder">
              <h2>Module Not Found</h2>
              <p>The module "{moduleId}" is not yet implemented.</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="lesson-content-resolver">
      {resolveContent()}
    </div>
  );
}
