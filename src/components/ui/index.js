// Legacy components (kept for backward compatibility)
export { default as Card } from './Card';
export { default as Toggle } from './Toggle';
export { default as QuizChoice } from './QuizChoice';

// Optimized components
export { default as OptimizedButton } from './OptimizedButton';
export {
  PrimaryButton,
  ContinueButton,
  OptionButton,
  ProgressButton,
  IconButton
} from './OptimizedButton';

export { default as OptimizedCard } from './OptimizedCard';
export {
  ModuleCard,
  InsightCard,
  QuestionCard
} from './OptimizedCard';

export { default as OptimizedPopup } from './OptimizedPopup';
export {
  Tooltip,
  ConfirmDialog
} from './OptimizedPopup';

export { default as ProgressiveContent } from './ProgressiveContent';
export {
  StepByStepContent,
  ExpandableSection,
  KnowledgeGate
} from './ProgressiveContent';

// Convenient aliases
export { default as Button } from './OptimizedButton';
export { default as CardV2 } from './OptimizedCard';
export { default as Popup } from './OptimizedPopup';
