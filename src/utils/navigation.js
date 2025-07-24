import { course } from '../config/courseConfig';

// Helper functions for working with course structure
export function getModule(moduleId) {
  return course.find(m => m.id === moduleId);
}

export function getLesson(moduleId, lessonId) {
  const module = getModule(moduleId);
  return module?.lessons.find(l => l.id === lessonId);
}

/**
 * Get previous and next navigation paths for any lesson view
 * @param {string} moduleId - Current module ID
 * @param {string} lessonId - Current lesson ID
 * @param {string} viewId - Current view ID
 * @returns {Object} Navigation object with prev, next, and status flags
 */
export function getPrevNext(moduleId, lessonId, viewId) {
  const module = getModule(moduleId);
  if (!module) {
    return { prev: null, next: null, isModuleStart: true, isModuleEnd: true };
  }

  const lessonIndex = module.lessons.findIndex(l => l.id === lessonId);
  const lesson = module.lessons[lessonIndex];
  if (!lesson) {
    return { prev: null, next: null, isModuleStart: true, isModuleEnd: true };
  }

  const viewIndex = lesson.views.indexOf(viewId);
  if (viewIndex === -1) {
    return { prev: null, next: null, isModuleStart: true, isModuleEnd: true };
  }

  // PREVIOUS NAVIGATION
  let prev = null;
  let isModuleStart = false;

  if (viewIndex > 0) {
    // Previous view in same lesson
    const prevView = lesson.views[viewIndex - 1];
    prev = {
      path: `/module/${moduleId}/${lessonId}/${prevView}`,
      label: `Previous: ${formatViewName(prevView)}`,
      type: 'view'
    };
  } else if (lessonIndex > 0) {
    // Last view of previous lesson
    const prevLesson = module.lessons[lessonIndex - 1];
    const lastView = prevLesson.views[prevLesson.views.length - 1];
    prev = {
      path: `/module/${moduleId}/${prevLesson.id}/${lastView}`,
      label: `Previous: ${prevLesson.title}`,
      type: 'lesson'
    };
  } else {
    // Back to module overview
    prev = {
      path: module.overview,
      label: `Back to ${module.title}`,
      type: 'module'
    };
    isModuleStart = true;
  }

  // NEXT NAVIGATION
  let next = null;
  let isModuleEnd = false;

  if (viewIndex < lesson.views.length - 1) {
    // Next view in same lesson
    const nextView = lesson.views[viewIndex + 1];
    next = {
      path: `/module/${moduleId}/${lessonId}/${nextView}`,
      label: `Next: ${formatViewName(nextView)}`,
      type: 'view'
    };
  } else if (lessonIndex < module.lessons.length - 1) {
    // First view of next lesson
    const nextLesson = module.lessons[lessonIndex + 1];
    const firstView = nextLesson.views[0];
    next = {
      path: `/module/${moduleId}/${nextLesson.id}/${firstView}`,
      label: `Next: ${nextLesson.title}`,
      type: 'lesson'
    };
  } else {
    // Module completed - back to overview
    next = {
      path: module.overview,
      label: `Complete ${module.title}`,
      type: 'complete'
    };
    isModuleEnd = true;
  }

  return {
    prev,
    next,
    isModuleStart,
    isModuleEnd,
    currentPosition: {
      module: module.title,
      lesson: lesson.title,
      view: formatViewName(viewId),
      progress: {
        lessonIndex: lessonIndex + 1,
        totalLessons: module.lessons.length,
        viewIndex: viewIndex + 1,
        totalViews: lesson.views.length
      }
    }
  };
}

/**
 * Get the next module in the course sequence
 * @param {string} currentModuleId - Current module ID
 * @returns {Object|null} Next module or null if at end
 */
export function getNextModule(currentModuleId) {
  const currentIndex = course.findIndex(m => m.id === currentModuleId);
  if (currentIndex === -1 || currentIndex === course.length - 1) {
    return null;
  }
  return course[currentIndex + 1];
}

/**
 * Get the first lesson/view path for a module
 * @param {string} moduleId - Module ID
 * @returns {string|null} Path to first lesson view
 */
export function getModuleStartPath(moduleId) {
  const module = getModule(moduleId);
  if (!module || !module.lessons.length) {
    return null;
  }
  
  const firstLesson = module.lessons[0];
  const firstView = firstLesson.views[0];
  
  return `/module/${moduleId}/${firstLesson.id}/${firstView}`;
}

/**
 * Check if current position is at a significant milestone
 * @param {string} moduleId - Current module ID
 * @param {string} lessonId - Current lesson ID
 * @param {string} viewId - Current view ID
 * @returns {Object} Milestone information
 */
export function checkMilestones(moduleId, lessonId, viewId) {
  const { isModuleStart, isModuleEnd, currentPosition } = getPrevNext(moduleId, lessonId, viewId);
  
  return {
    isModuleStart,
    isModuleEnd,
    isLessonStart: currentPosition.progress.viewIndex === 1,
    isLessonEnd: currentPosition.progress.viewIndex === currentPosition.progress.totalViews,
    completionPercentage: {
      module: Math.round((currentPosition.progress.lessonIndex / currentPosition.progress.totalLessons) * 100),
      lesson: Math.round((currentPosition.progress.viewIndex / currentPosition.progress.totalViews) * 100)
    }
  };
}

/**
 * Format view names for display (convert camelCase/kebab-case to readable)
 * @param {string} viewId - View identifier
 * @returns {string} Formatted view name
 */
function formatViewName(viewId) {
  return viewId
    .replace(/-/g, ' ')
    .replace(/([A-Z])/g, ' $1')
    .replace(/^\w/, c => c.toUpperCase())
    .trim();
}

/**
 * Validate that a module/lesson/view combination exists
 * @param {string} moduleId - Module ID
 * @param {string} lessonId - Lesson ID
 * @param {string} viewId - View ID
 * @returns {boolean} Whether the combination is valid
 */
export function isValidPath(moduleId, lessonId, viewId) {
  const module = getModule(moduleId);
  if (!module) return false;
  
  const lesson = getLesson(moduleId, lessonId);
  if (!lesson) return false;
  
  return lesson.views.includes(viewId);
}

/**
 * Get breadcrumb navigation for current position
 * @param {string} moduleId - Current module ID
 * @param {string} lessonId - Current lesson ID
 * @param {string} viewId - Current view ID
 * @returns {Array} Breadcrumb items
 */
export function getBreadcrumbs(moduleId, lessonId, viewId) {
  const module = getModule(moduleId);
  const lesson = getLesson(moduleId, lessonId);
  
  if (!module || !lesson) return [];
  
  return [
    { label: 'Home', path: '/' },
    { label: module.title, path: module.overview },
    { label: lesson.title, path: `/module/${moduleId}/${lessonId}/${lesson.views[0]}` },
    { label: formatViewName(viewId), path: `/module/${moduleId}/${lessonId}/${viewId}`, current: true }
  ];
}
