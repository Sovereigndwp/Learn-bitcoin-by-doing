import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Home, Trophy } from 'lucide-react';
import { getPrevNext, getNextModule } from '../utils/navigation';
import { useProgress } from '../contexts/ProgressContext';
import './PrevNext.css';

/**
 * Unified navigation component that appears at the bottom of every lesson view
 * Computes prev/next paths from course configuration
 */
export default function PrevNext() {
  const { moduleId, lessonId, viewId } = useParams();
  const navigate = useNavigate();
  const { completeModule, markLessonComplete } = useProgress();
  
  // Skip rendering if we're not in a lesson view
  if (!moduleId || !lessonId || !viewId) {
    return null;
  }

  const { prev, next, isModuleEnd, currentPosition } = getPrevNext(moduleId, lessonId, viewId);
  
  const handlePrevious = () => {
    if (prev?.path) {
      navigate(prev.path);
    }
  };

  const handleNext = () => {
    if (!next?.path) return;

    // Handle module completion
    if (isModuleEnd) {
      completeModule(moduleId);
      
      // Check if there's a next module to suggest
      const nextModule = getNextModule(moduleId);
      if (nextModule) {
        // Show completion celebration and suggest next module
        navigate(next.path, { 
          state: { 
            completed: true, 
            nextModule: nextModule 
          } 
        });
      } else {
        // All modules completed
        navigate(next.path, { 
          state: { 
            completed: true, 
            allCompleted: true 
          } 
        });
      }
    } else {
      // Mark current lesson view as complete for progress tracking
      markLessonComplete?.(moduleId, lessonId, viewId);
      navigate(next.path);
    }
  };

  return (
    <footer className="prev-next-footer">
      {/* Compact progress indicator */}
      <div className="progress-info">
        <div className="progress-text">
          {currentPosition.progress.lessonIndex}/{currentPosition.progress.totalLessons} • 
          {currentPosition.progress.viewIndex}/{currentPosition.progress.totalViews}
        </div>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ 
              width: `${(currentPosition.progress.viewIndex / currentPosition.progress.totalViews) * 100}%` 
            }}
          />
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="nav-buttons">
        <button
          onClick={handlePrevious}
          disabled={!prev?.path}
          className={`nav-btn prev-btn ${!prev?.path ? 'disabled' : ''}`}
          title={prev?.label || 'No previous step'}
        >
          <ChevronLeft size={16} />
          <span className="nav-text">
            {prev?.type === 'module' ? 'Back to Module' : 'Previous'}
          </span>
        </button>

        <button
          onClick={handleNext}
          disabled={!next?.path}
          className={`nav-btn next-btn ${!next?.path ? 'disabled' : ''} ${isModuleEnd ? 'complete' : ''}`}
          title={next?.label || 'No next step'}
        >
          <span className="nav-text">
            {isModuleEnd ? 'Complete Module' : 'Next'}
          </span>
          <ChevronRight size={16} />
        </button>
      </div>
    </footer>
  );
}

/**
 * Compact version for use in tight spaces
 */
export function CompactPrevNext() {
  const { moduleId, lessonId, viewId } = useParams();
  const navigate = useNavigate();
  
  if (!moduleId || !lessonId || !viewId) {
    return null;
  }

  const { prev, next } = getPrevNext(moduleId, lessonId, viewId);
  
  return (
    <div className="prev-next-compact">
      <button
        onClick={() => prev?.path && navigate(prev.path)}
        disabled={!prev?.path}
        className="compact-nav-button"
        title={prev?.label}
      >
        <ChevronLeft size={16} />
      </button>
      
      <button
        onClick={() => next?.path && navigate(next.path)}
        disabled={!next?.path}
        className="compact-nav-button"
        title={next?.label}
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
}
