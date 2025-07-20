/**
 * Global Styles Configuration
 * 
 * Centralized styling system for consistent theming across all components.
 * Includes colors, typography, spacing, shadows, borders, and Bitcoin-specific themes.
 */

// Color System
export const colors = {
  // Bitcoin Brand Colors
  bitcoin: {
    primary: '#F7931A',      // Bitcoin Orange
    secondary: '#FFD700',    // Bitcoin Gold
    dark: '#2E1A00',         // Dark Bitcoin
    light: '#FFF3E0',        // Light Bitcoin
    accent: '#FF6B35',       // Bitcoin Accent
  },
  
  // Lightning Network Colors
  lightning: {
    primary: '#8A2BE2',      // Lightning Purple
    secondary: '#9370DB',    // Medium Purple
    accent: '#7B68EE',       // Slate Blue
  },
  
  // Neutral Colors
  neutral: {
    white: '#FFFFFF',
    gray50: '#FAFAFA',
    gray100: '#F5F5F5',
    gray200: '#EEEEEE',
    gray300: '#E0E0E0',
    gray400: '#BDBDBD',
    gray500: '#9E9E9E',
    gray600: '#757575',
    gray700: '#616161',
    gray800: '#424242',
    gray900: '#212121',
    black: '#000000',
  },
  
  // Semantic Colors
  semantic: {
    success: '#4CAF50',
    warning: '#FF9800',
    error: '#F44336',
    info: '#2196F3',
    
    // State Colors
    locked: '#757575',
    completed: '#4CAF50',
    inProgress: '#2196F3',
    disabled: '#BDBDBD',
  },
  
  // Background Colors
  background: {
    primary: '#FFFFFF',
    secondary: '#FAFAFA',
    tertiary: '#F5F5F5',
    overlay: 'rgba(0, 0, 0, 0.5)',
    card: '#FFFFFF',
    cardHover: '#FAFAFA',
  },
  
  // Text Colors
  text: {
    primary: '#212121',
    secondary: '#757575',
    disabled: '#BDBDBD',
    inverse: '#FFFFFF',
    link: '#2196F3',
    linkHover: '#1976D2',
  },
};

// Typography System
export const typography = {
  fontFamily: {
    primary: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    mono: "'JetBrains Mono', 'Fira Code', monospace",
    bitcoin: "'Bitcoin Script', monospace", // Custom Bitcoin font if available
  },
  
  fontSize: {
    xs: '0.75rem',     // 12px
    sm: '0.875rem',    // 14px
    base: '1rem',      // 16px
    lg: '1.125rem',    // 18px
    xl: '1.25rem',     // 20px
    '2xl': '1.5rem',   // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem',  // 36px
  },
  
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  
  lineHeight: {
    tight: '1.25',
    normal: '1.5',
    relaxed: '1.75',
  },
  
  letterSpacing: {
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
  },
};

// Spacing System (based on 8px grid)
export const spacing = {
  0: '0',
  1: '0.25rem',   // 4px
  2: '0.5rem',    // 8px
  3: '0.75rem',   // 12px
  4: '1rem',      // 16px
  5: '1.25rem',   // 20px
  6: '1.5rem',    // 24px
  8: '2rem',      // 32px
  10: '2.5rem',   // 40px
  12: '3rem',     // 48px
  16: '4rem',     // 64px
  20: '5rem',     // 80px
  24: '6rem',     // 96px
};

// Border Radius System
export const borderRadius = {
  none: '0',
  sm: '0.25rem',     // 4px
  base: '0.375rem',  // 6px
  md: '0.5rem',      // 8px
  lg: '0.75rem',     // 12px
  xl: '1rem',        // 16px
  '2xl': '1.5rem',   // 24px
  full: '50%',
  circle: '50%',
};

// Shadow System
export const shadows = {
  none: 'none',
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
  
  // Bitcoin-themed shadows
  bitcoin: '0 4px 20px rgba(247, 147, 26, 0.3)',
  lightning: '0 4px 20px rgba(138, 43, 226, 0.3)',
  
  // Card shadows
  card: '0 2px 8px rgba(0, 0, 0, 0.1)',
  cardHover: '0 8px 25px rgba(0, 0, 0, 0.15)',
  cardPressed: '0 1px 3px rgba(0, 0, 0, 0.15)',
};

// Transition System
export const transitions = {
  fast: '150ms ease-in-out',
  base: '200ms ease-in-out',
  slow: '300ms ease-in-out',
  
  // Specific transitions
  color: 'color 200ms ease-in-out',
  background: 'background-color 200ms ease-in-out',
  border: 'border 200ms ease-in-out',
  shadow: 'box-shadow 200ms ease-in-out',
  transform: 'transform 200ms ease-in-out',
  opacity: 'opacity 200ms ease-in-out',
  
  // Combined transitions
  all: 'all 200ms ease-in-out',
  interactive: 'background-color 200ms ease-in-out, box-shadow 200ms ease-in-out, transform 200ms ease-in-out',
};

// Breakpoints for Responsive Design
export const breakpoints = {
  xs: '320px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

// Component-specific configurations
export const components = {
  card: {
    padding: spacing[6],
    borderRadius: borderRadius.lg,
    shadow: shadows.card,
    hoverShadow: shadows.cardHover,
    backgroundColor: colors.background.card,
    borderColor: colors.neutral.gray200,
  },
  
  button: {
    borderRadius: borderRadius.md,
    padding: {
      sm: `${spacing[2]} ${spacing[4]}`,
      md: `${spacing[3]} ${spacing[6]}`,
      lg: `${spacing[4]} ${spacing[8]}`,
    },
    fontSize: {
      sm: typography.fontSize.sm,
      md: typography.fontSize.base,
      lg: typography.fontSize.lg,
    },
  },
  
  progress: {
    height: {
      sm: '4px',
      md: '8px',
      lg: '12px',
    },
    borderRadius: borderRadius.full,
    backgroundColor: colors.neutral.gray200,
    fillColor: colors.bitcoin.primary,
  },
};

// Theme configurations
export const themes = {
  light: {
    colors: {
      ...colors,
      background: {
        ...colors.background,
        primary: '#FFFFFF',
        secondary: '#FAFAFA',
        tertiary: '#F5F5F5',
      },
      text: {
        ...colors.text,
        primary: '#212121',
        secondary: '#757575',
      },
    },
  },
  
  dark: {
    colors: {
      ...colors,
      background: {
        primary: '#121212',
        secondary: '#1E1E1E',
        tertiary: '#2D2D2D',
        overlay: 'rgba(0, 0, 0, 0.8)',
        card: '#1E1E1E',
        cardHover: '#2D2D2D',
      },
      text: {
        primary: '#FFFFFF',
        secondary: '#BDBDBD',
        disabled: '#757575',
        inverse: '#212121',
        link: '#64B5F6',
        linkHover: '#42A5F5',
      },
      neutral: {
        ...colors.neutral,
        gray200: '#3D3D3D',
        gray300: '#4A4A4A',
        gray400: '#6A6A6A',
      },
    },
  },
  
  bitcoin: {
    colors: {
      ...colors,
      primary: colors.bitcoin.primary,
      secondary: colors.bitcoin.secondary,
      accent: colors.bitcoin.accent,
    },
  },
};

// Utility function to get theme-aware styles
export const getThemeStyles = (theme = 'light') => {
  return themes[theme] || themes.light;
};

// CSS-in-JS style generators
export const generateCardStyles = (variant = 'default', theme = 'light') => {
  const themeStyles = getThemeStyles(theme);
  
  return {
    padding: components.card.padding,
    borderRadius: components.card.borderRadius,
    boxShadow: components.card.shadow,
    backgroundColor: themeStyles.colors.background.card,
    border: `1px solid ${themeStyles.colors.neutral.gray200}`,
    transition: transitions.interactive,
    
    '&:hover': {
      boxShadow: components.card.hoverShadow,
      backgroundColor: themeStyles.colors.background.cardHover,
    },
  };
};

export const generateButtonStyles = (variant = 'primary', size = 'md', theme = 'light') => {
  const themeStyles = getThemeStyles(theme);
  
  const baseStyles = {
    padding: components.button.padding[size],
    borderRadius: components.button.borderRadius,
    fontSize: components.button.fontSize[size],
    fontWeight: typography.fontWeight.medium,
    transition: transitions.interactive,
    cursor: 'pointer',
    border: 'none',
    outline: 'none',
  };
  
  const variantStyles = {
    primary: {
      backgroundColor: colors.bitcoin.primary,
      color: colors.text.inverse,
      '&:hover': {
        backgroundColor: '#E8830A',
        boxShadow: shadows.bitcoin,
      },
    },
    secondary: {
      backgroundColor: 'transparent',
      color: themeStyles.colors.text.primary,
      border: `1px solid ${themeStyles.colors.neutral.gray300}`,
      '&:hover': {
        backgroundColor: themeStyles.colors.background.cardHover,
      },
    },
    ghost: {
      backgroundColor: 'transparent',
      color: themeStyles.colors.text.primary,
      '&:hover': {
        backgroundColor: themeStyles.colors.background.cardHover,
      },
    },
  };
  
  return {
    ...baseStyles,
    ...variantStyles[variant],
  };
};

export default {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  transitions,
  breakpoints,
  components,
  themes,
  getThemeStyles,
  generateCardStyles,
  generateButtonStyles,
};
