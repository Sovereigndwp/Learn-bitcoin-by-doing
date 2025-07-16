// ========================================
// PROFESSIONAL UNIFIED COLOR SYSTEM
// ========================================
// Modern, sophisticated Bitcoin Orange theme with enhanced visual hierarchy
// Professional color psychology with optimal accessibility and visual appeal

// ENHANCED COLOR PALETTE - Professional Bitcoin Orange Theme
export const COLORS = {
  // Primary Bitcoin Orange - Enhanced with better tonal range
  primary: {
    50: '#fff8f1',   // Softer, warmer light tone
    100: '#ffecdb',  // Refined cream-orange
    200: '#fed7aa',  // Kept for consistency
    300: '#fdc574',  // More sophisticated mid-tone
    400: '#fb923c',  // Kept for consistency  
    500: '#f7931a',  // Main Bitcoin Orange (unchanged)
    600: '#e8750a',  // Slightly warmer dark orange
    700: '#d1620a',  // More refined dark orange
    800: '#b8520a',  // Professional deep orange
    900: '#8b3d0a'   // Sophisticated very dark orange
  },
  
  // Professional Neutral Grays - Enhanced for modern appeal
  neutral: {
    50: '#fdfdfd',   // Pure, clean white alternative
    100: '#f8f9fa',  // Softer light gray
    200: '#e9ecef',  // More refined light gray
    300: '#ced4da',  // Better mid-light gray
    400: '#adb5bd',  // Professional mid-gray
    500: '#6c757d',  // Balanced neutral
    600: '#495057',  // Professional dark gray
    700: '#343a40',  // Sophisticated darker gray
    800: '#212529',  // Modern dark gray
    900: '#1a1d21',  // Professional very dark
    950: '#0d1117'   // GitHub-inspired darkest
  },
  
  // Enhanced Dark Theme - Modern and professional
  dark: {
    bg: '#0d1117',           // GitHub-inspired professional dark
    bgSecondary: '#161b22',  // Warmer secondary dark
    bgTertiary: '#21262d',   // Sophisticated tertiary
    bgCard: '#1c2128',       // Professional card background
    bgElevated: '#262c36',   // Elevated surfaces
    bgOverlay: 'rgba(13, 17, 23, 0.85)', // Modern overlay
    border: '#30363d',       // Softer border
    borderLight: '#484f58',  // Refined light border
    borderAccent: '#f7931a40' // Orange-tinted border
  },
  
  // Enhanced Light Theme - Clean and inviting
  light: {
    bg: '#ffffff',
    bgSecondary: '#f8f9fa',
    bgTertiary: '#f1f3f4',
    bgCard: '#ffffff',
    bgElevated: '#f8f9fa',
    bgOverlay: 'rgba(255, 255, 255, 0.92)',
    border: '#dadce0',
    borderLight: '#e8eaed',
    borderAccent: '#f7931a20'
  },
  
  // Professional Secondary Colors - Complementary to Bitcoin Orange
  secondary: {
    // Light Gray - Professional neutral
    lightGray: {
      50: '#fafafa',
      100: '#f4f4f5', 
      200: '#e4e4e7',
      300: '#d4d4d8',
      400: '#a1a1aa',
      500: '#71717a',  // Professional light gray
      600: '#52525b',
      700: '#3f3f46',
      800: '#27272a',
      900: '#18181b'
    },
    
    // Sophisticated Teal - Modern accent
    teal: {
      50: '#f0fdfa',
      100: '#ccfbf1',
      200: '#99f6e4',
      300: '#5eead4',
      400: '#2dd4bf',
      500: '#14b8a6',  // Professional teal
      600: '#0d9488',
      700: '#0f766e',
      800: '#115e59',
      900: '#134e4a'
    },
    
    // Bright Orange - Vibrant accent
    brightOrange: {
      50: '#fff7ed',
      100: '#ffedd5',
      200: '#fed7aa',
      300: '#fdba74',
      400: '#fb923c',
      500: '#f97316',  // Bright orange
      600: '#ea580c',
      700: '#dc2626',
      800: '#c2410c',
      900: '#9a3412'
    }
  },
  
  // Enhanced Semantic Colors - Professional and accessible
  semantic: {
    success: {
      light: '#16a34a',    // Professional green (not too bright)
      dark: '#15803d',
      bg: '#f0fdf4',
      text: '#14532d',
      border: '#bbf7d0'
    },
    warning: {
      light: '#d97706',    // Warmer, more professional orange-yellow
      dark: '#b45309',
      bg: '#fffbeb',
      text: '#92400e',
      border: '#fed7aa'
    },
    error: {
      light: '#dc2626',    // Refined red
      dark: '#b91c1c',
      bg: '#fef2f2',
      text: '#991b1b',
      border: '#fecaca'
    },
    info: {
      light: '#2563eb',    // Professional blue
      dark: '#1d4ed8',
      bg: '#eff6ff',
      text: '#1e40af',
      border: '#bfdbfe'
    }
  },
  
  // Professional Text Colors
  text: {
    dark: {
      primary: '#f0f6fc',     // High contrast white
      secondary: '#c9d1d9',   // Professional light gray
      tertiary: '#8b949e',    // Muted gray
      quaternary: '#6e7681',  // Subtle gray
      disabled: '#484f58',    // Professional disabled
      inverse: '#24292f'      // Dark text for light backgrounds
    },
    light: {
      primary: '#24292f',     // Professional dark
      secondary: '#656d76',   // Sophisticated gray
      tertiary: '#8c959f',    // Muted gray
      quaternary: '#afb8c1',  // Light gray
      disabled: '#d0d7de',    // Professional disabled  
      inverse: '#f0f6fc'      // Light text for dark backgrounds
    }
  }
};

// CONTRAST CALCULATION UTILITIES
export const getContrastRatio = (color1, color2) => {
  const getLuminance = (color) => {
    const rgb = hexToRgb(color);
    if (!rgb) return 0;
    
    const [r, g, b] = [rgb.r, rgb.g, rgb.b].map(c => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };
  
  const lum1 = getLuminance(color1);
  const lum2 = getLuminance(color2);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  
  return (brightest + 0.05) / (darkest + 0.05);
};

export const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
};

export const rgbToHex = (r, g, b) => {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
};

// AUTOMATIC CONTRAST DETECTION
export const getOptimalTextColor = (backgroundColor, options = {}) => {
  const { 
    preferredLight = '#ffffff',
    preferredDark = '#000000',
    fallbackLight = '#f5f5f5', 
    fallbackDark = '#0a0a0a',
    minContrastRatio = 4.5 // WCAG AA standard
  } = options;
  
  // Clean background color
  const bgColor = backgroundColor.replace(/[^#0-9a-fA-F]/g, '').substring(0, 7);
  if (bgColor.length < 7) return preferredDark;
  
  const lightContrast = getContrastRatio(bgColor, preferredLight);
  const darkContrast = getContrastRatio(bgColor, preferredDark);
  
  // Check if preferred colors meet contrast requirements
  if (lightContrast >= minContrastRatio && lightContrast > darkContrast) {
    return preferredLight;
  }
  if (darkContrast >= minContrastRatio) {
    return preferredDark;
  }
  
  // Fall back to higher contrast option
  return lightContrast > darkContrast ? fallbackLight : fallbackDark;
};

// THEME DETECTION
export const detectCardTheme = (backgroundColor) => {
  const rgb = hexToRgb(backgroundColor);
  if (!rgb) return 'dark';
  
  const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
  return brightness > 128 ? 'light' : 'dark';
};

// DYNAMIC COLOR GENERATION
export const generateColorVariants = (baseColor, steps = 9) => {
  const rgb = hexToRgb(baseColor);
  if (!rgb) return [];
  
  const variants = [];
  for (let i = 0; i < steps; i++) {
    const factor = i / (steps - 1);
    const lightness = factor < 0.5 ? 
      1 - (factor * 0.8) : // Lighter variants
      0.2 + ((factor - 0.5) * 1.6); // Darker variants
      
    const r = Math.round(rgb.r * lightness);
    const g = Math.round(rgb.g * lightness);
    const b = Math.round(rgb.b * lightness);
    
    variants.push(rgbToHex(
      Math.min(255, Math.max(0, r)),
      Math.min(255, Math.max(0, g)), 
      Math.min(255, Math.max(0, b))
    ));
  }
  
  return variants;
};

// CSS CUSTOM PROPERTIES GENERATOR
export const generateCSSVariables = () => {
  const cssVars = [];
  
  // Primary colors
  Object.entries(COLORS.primary).forEach(([key, value]) => {
    cssVars.push(`--color-primary-${key}: ${value};`);
  });
  
  // Neutral colors
  Object.entries(COLORS.neutral).forEach(([key, value]) => {
    cssVars.push(`--color-neutral-${key}: ${value};`);
  });
  
  // Dark theme
  Object.entries(COLORS.dark).forEach(([key, value]) => {
    cssVars.push(`--color-dark-${key}: ${value};`);
  });
  
  // Light theme
  Object.entries(COLORS.light).forEach(([key, value]) => {
    cssVars.push(`--color-light-${key}: ${value};`);
  });
  
  // Semantic colors
  Object.entries(COLORS.semantic).forEach(([category, colors]) => {
    Object.entries(colors).forEach(([key, value]) => {
      cssVars.push(`--color-${category}-${key}: ${value};`);
    });
  });
  
  return cssVars.join('\n  ');
};

// UTILITY FUNCTIONS FOR COMPONENTS
export const cardStyles = {
  getBackgroundStyle: (theme = 'dark', variant = 'primary') => {
    if (theme === 'light') {
      return {
        backgroundColor: COLORS.light.bgCard,
        border: `1px solid ${COLORS.light.border}`,
        color: getOptimalTextColor(COLORS.light.bgCard)
      };
    }
    
    return {
      backgroundColor: COLORS.dark.bgCard,
      border: `1px solid ${COLORS.dark.border}`,
      color: getOptimalTextColor(COLORS.dark.bgCard)
    };
  },
  
  getHoverStyle: (theme = 'dark') => {
    return {
      borderColor: COLORS.primary[500],
      boxShadow: `0 4px 12px ${COLORS.primary[500]}25`,
      transform: 'translateY(-2px)'
    };
  }
};

// AUTO-APPLY CONTRAST FUNCTION FOR DOM ELEMENTS
export const applyAutoContrast = (element, backgroundColor) => {
  const optimalColor = getOptimalTextColor(backgroundColor);
  element.style.color = optimalColor;
  
  // Apply to child text elements
  const textElements = element.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, div');
  textElements.forEach(el => {
    if (!el.style.color || el.style.color === 'inherit') {
      el.style.color = optimalColor;
    }
  });
};

// DESIGN SYSTEM CONSTANTS
export const DESIGN_TOKENS = {
  spacing: {
    xs: '0.5rem',
    sm: '0.75rem', 
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem'
  },
  
  borderRadius: {
    sm: '6px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    '2xl': '20px',
    full: '9999px'
  },
  
  shadows: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px rgba(0, 0, 0, 0.1)',
    glow: `0 0 20px ${COLORS.primary[500]}40`
  },
  
  typography: {
    fontSizes: {
      xs: '0.75rem',
      sm: '0.875rem',
      md: '1rem', 
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem'
    },
    
    fontWeights: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800'
    }
  }
};

export default {
  COLORS,
  getOptimalTextColor,
  detectCardTheme,
  generateColorVariants,
  generateCSSVariables,
  cardStyles,
  applyAutoContrast,
  DESIGN_TOKENS,
  getContrastRatio
}; 