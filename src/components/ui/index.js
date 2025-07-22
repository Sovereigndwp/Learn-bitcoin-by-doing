// Core UI Components
export { default as Toggle } from './Toggle';
export { default as QuizChoice } from './QuizChoice';
export { ModuleCompletionButton } from './ModuleCompletionButton';
export { default as InteractiveIcon } from './InteractiveIcon';
export { default as PageLayout } from './PageLayout';
export { default as ModuleCard } from './ModuleCard';

// Unified Button System - Primary export (replaces all legacy button systems)
export { 
  default as UnifiedButton,
  Button,
  ModernButton,
  PrimaryButton,
  SecondaryButton,
  ContinueButton,
  OptionButton,
  NavigationButton,
  IconButton,
  ActionButton,
  PopupButton,
  ProgressButton,
  StepNavigation,
  ButtonGroup
} from './UnifiedButton';

// Progressive Content Components (simplified)
export { KnowledgeGate } from './ProgressiveContent';

// Popup Components
export { default as OptimizedPopup } from './OptimizedPopup';
export { ConfirmDialog, Tooltip } from './OptimizedPopup';
