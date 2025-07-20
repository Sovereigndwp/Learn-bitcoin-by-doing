// Global UI Style Configuration

// Colors
export const COLORS = {
  primary: '#1DA1F2',
  secondary: '#14171A',
  success: '#28a745',
  danger: '#dc3545',
  warning: '#ffc107',
  info: '#17a2b8',
  light: '#f8f9fa',
  dark: '#343a40',
};

// Typography
export const TYPOGRAPHY = {
  fontFamily: '"Roboto", sans-serif',
  fontSizeBase: '16px',
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightBold: 700,
};

// Spacing
export const SPACING = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
};

// Border Radius
export const BORDER_RADIUS = {
  sm: '2px',
  md: '4px',
  lg: '8px',
  xl: '16px',
};

// Border
export const BORDER = {
  width: '1px',
  style: 'solid',
  color: COLORS.light,
};

// Shadows
export const SHADOWS = {
  sm: '0 1px 2px rgba(0,0,0,0.05)',
  md: '0 4px 6px rgba(0,0,0,0.1)',
  lg: '0 10px 15px rgba(0,0,0,0.15)',
  xl: '0 20px 25px rgba(0,0,0,0.2)',
};

// Transitions
export const TRANSITIONS = {
  duration: '0.3s',
  timingFunction: 'ease-in-out',
};

// Export all as default
const globalStyles = {
  COLORS,
  TYPOGRAPHY,
  SPACING,
  BORDER_RADIUS,
  BORDER,
  SHADOWS,
  TRANSITIONS,
};

export default globalStyles;
