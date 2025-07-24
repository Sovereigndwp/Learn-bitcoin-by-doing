import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { isValidPath } from '../utils/navigation';
import LessonContentResolver from './LessonContentResolver';
import './LessonView.css';

/**
 * Unified lesson view that works with all modules consistently
 * Uses LessonContentResolver to map URLs to actual lesson content
 */
export default function LessonView() {
  const { moduleId, lessonId, viewId } = useParams();
  const navigate = useNavigate();

  if (!isValidPath(moduleId, lessonId, viewId)) {
    return (
      <div className="error-card">
        <h1>404 Error</h1>
        <p>Lesson view not found. Please check the URL and try again.</p>
        <button onClick={() => navigate('/')}>
          Back to Homepage
        </button>
      </div>
    );
  }

  return (
    <div className="lesson-view-wrapper">
      <LessonContentResolver 
        moduleId={moduleId} 
        lessonId={lessonId} 
        viewId={viewId} 
      />
    </div>
  );
}
