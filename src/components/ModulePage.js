import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Play, BookOpen, CheckCircle } from 'lucide-react';
import { getModule, getModuleStartPath } from '../utils/navigation';
import { useProgress } from '../contexts/ProgressContext';
import './ModulePage.css';

/**
 * Module overview page that displays lessons and progress
 * Replaces individual module components for overview pages
 */
export default function ModulePage() {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const { getModuleProgress } = useProgress();
  
  const module = getModule(moduleId);
  
  if (!module) {
    return (
      <div className="module-page-container">
        <div className="error-card">
          <h1>Module Not Found</h1>
          <p>The module "{moduleId}" doesn't exist.</p>
          <button onClick={() => navigate('/')} className="primary-button">
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const moduleProgress = getModuleProgress(moduleId);
  // For now, we only track module completion, not individual lessons
  const completedLessons = moduleProgress === 100 ? module.lessons.length : 0;

  const handleStartModule = () => {
    const startPath = getModuleStartPath(moduleId);
    if (startPath) {
      navigate(startPath);
    }
  };

  const handleLessonClick = (lesson) => {
    const lessonPath = `/module/${moduleId}/${lesson.id}/${lesson.views[0]}`;
    navigate(lessonPath);
  };

  return (
    <div className="module-page-container">
      {/* Module Header */}
      <div className="module-hero">
        <div className="module-hero-content">
          <h1 className="module-title">{module.title}</h1>
          <div className="module-meta">
            <div className="progress-summary">
              <span className="progress-text">
                {completedLessons} of {module.lessons.length} lessons completed
              </span>
              <div className="progress-bar-container">
                <div 
                  className="progress-bar-fill"
                  style={{ 
                    width: `${(completedLessons / module.lessons.length) * 100}%` 
                  }}
                />
              </div>
            </div>
          </div>
          
          {completedLessons === 0 ? (
            <button 
              onClick={handleStartModule}
              className="start-module-button"
            >
              <Play size={20} />
              Start Learning
            </button>
          ) : completedLessons < module.lessons.length ? (
            <button 
              onClick={handleStartModule}
              className="continue-module-button"
            >
              <BookOpen size={20} />
              Continue Learning
            </button>
          ) : (
            <div className="module-completed">
              <CheckCircle size={20} />
              Module Completed!
            </div>
          )}
        </div>
      </div>

      {/* Lessons List */}
      <div className="lessons-container">
        <h2 className="lessons-title">Lessons</h2>
        <div className="lessons-grid">
          {module.lessons.map((lesson, index) => {
            // For now, all lessons are accessible since we only track module-level completion
            const isCompleted = moduleProgress === 100; // All lessons are "completed" if module is completed
            
            return (
              <div 
                key={lesson.id}
                className={`lesson-card ${isCompleted ? 'completed' : ''}`}
              >
                <div className="lesson-card-header">
                  <div className="lesson-number">
                    {isCompleted ? (
                      <CheckCircle size={20} className="completed-icon" />
                    ) : (
                      <span className="lesson-number-text">{index + 1}</span>
                    )}
                  </div>
                  <h3 className="lesson-title">{lesson.title}</h3>
                </div>
                
                <div className="lesson-card-content">
                  <div className="lesson-stats">
                    <span className="view-count">
                      {lesson.views.length} {lesson.views.length === 1 ? 'step' : 'steps'}
                    </span>
                  </div>
                  
                  <button
                    onClick={() => handleLessonClick(lesson)}
                    className="lesson-start-button"
                  >
                    {isCompleted ? 'Review' : 'Start'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Module Stats */}
      <div className="module-stats">
        <div className="stat-card">
          <div className="stat-number">{module.lessons.length}</div>
          <div className="stat-label">Total Lessons</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">
            {module.lessons.reduce((total, lesson) => total + lesson.views.length, 0)}
          </div>
          <div className="stat-label">Total Steps</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{completedLessons}</div>
          <div className="stat-label">Completed</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">
            {Math.round((completedLessons / module.lessons.length) * 100)}%
          </div>
          <div className="stat-label">Progress</div>
        </div>
      </div>
    </div>
  );
}
