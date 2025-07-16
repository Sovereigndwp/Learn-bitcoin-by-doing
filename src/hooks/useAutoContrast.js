import { useEffect, useRef } from 'react';
import { getOptimalTextColor, applyAutoContrast } from '../utils/colorSystem';

// Custom hook for automatic contrast detection and application
export const useAutoContrast = (backgroundColor, dependencies = []) => {
  const elementRef = useRef(null);

  useEffect(() => {
    if (!elementRef.current || !backgroundColor) return;

    const element = elementRef.current;
    applyAutoContrast(element, backgroundColor);
  }, [backgroundColor, ...dependencies]);

  return elementRef;
};

// Hook for getting optimal text color without DOM manipulation
export const useOptimalTextColor = (backgroundColor, options = {}) => {
  const textColor = backgroundColor ? getOptimalTextColor(backgroundColor, options) : '#ffffff';
  return textColor;
};

// Hook for dynamic card styling with automatic contrast
export const useCardStyles = (backgroundTheme = 'dark', variant = 'primary') => {
  const cardRef = useRef(null);

  const styles = {
    dark: {
      backgroundColor: 'var(--color-dark-bgCard)',
      border: '1px solid var(--color-dark-border)',
      color: '#ffffff',
    },
    light: {
      backgroundColor: 'var(--color-light-bgCard)', 
      border: '1px solid var(--color-light-border)',
      color: '#000000',
    },
    primary: {
      backgroundColor: 'var(--color-primary-500)',
      border: '1px solid var(--color-primary-600)',
      color: '#ffffff',
    },
    success: {
      backgroundColor: 'var(--color-success-light)',
      border: '1px solid var(--color-success-dark)', 
      color: '#ffffff',
    },
    warning: {
      backgroundColor: 'var(--color-warning-light)',
      border: '1px solid var(--color-warning-dark)',
      color: '#000000',
    },
    error: {
      backgroundColor: 'var(--color-error-light)',
      border: '1px solid var(--color-error-dark)',
      color: '#ffffff',
    }
  };

  const baseStyle = {
    borderRadius: 'var(--radius-lg)',
    padding: 'var(--spacing-lg)',
    transition: 'all var(--transition-normal)',
    boxShadow: 'var(--shadow-md)',
    ...styles[backgroundTheme]
  };

  const hoverStyle = {
    borderColor: 'var(--color-primary-500)',
    boxShadow: 'var(--shadow-primary)',
    transform: 'translateY(-2px)'
  };

  return {
    cardRef,
    style: baseStyle,
    hoverStyle,
    className: `card card--${backgroundTheme}`
  };
};

// Hook for managing theme transitions
export const useThemeTransition = (theme = 'dark') => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    container.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    
    if (theme === 'light') {
      container.classList.add('bg-light');
      container.classList.remove('bg-dark');
    } else {
      container.classList.add('bg-dark');
      container.classList.remove('bg-light');
    }
  }, [theme]);

  return containerRef;
};

export default {
  useAutoContrast,
  useOptimalTextColor,
  useCardStyles,
  useThemeTransition
}; 