import React from 'react';

/**
 * SVG Icon System for Bitcoin Learning App
 * Provides scalable, themed icons to replace emoji fallbacks
 * 
 * Features:
 * - Consistent stroke width and styling
 * - Theme-aware colors
 * - Accessibility compliant
 * - Scalable vector graphics
 * - Animation-ready
 */

const defaultProps = {
  size: 24,
  stroke: 'currentColor',
  strokeWidth: 2,
  fill: 'none',
  className: ''
};

// Bitcoin and Cryptocurrency Icons
export const BitcoinIcon = ({ size = 24, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    className={`bitcoin-icon ${className}`}
    {...props}
  >
    <path
      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"
      fill="#F7931A"
      stroke="#F7931A"
    />
    <path
      d="M8.5 8.5V7.5h1v-1h2v1h1v1h-1v8h1v1h-2v-1h-1v-1h1V8.5h-1z"
      fill="white"
    />
    <path
      d="M9.5 9.5h2.5c1 0 1.8.8 1.8 1.8s-.8 1.7-1.8 1.7h-2.5v-3.5z"
      fill="#F7931A"
      stroke="white"
      strokeWidth="0.5"
    />
    <path
      d="M9.5 13h3c1 0 1.8.8 1.8 1.8s-.8 1.7-1.8 1.7h-3V13z"
      fill="#F7931A"
      stroke="white"
      strokeWidth="0.5"
    />
  </svg>
);

export const HashIcon = ({ size = 24, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    className={`hash-icon ${className}`}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    {...props}
  >
    <path d="M4 9h16"/>
    <path d="M4 15h16"/>
    <path d="M10 3L8 21"/>
    <path d="M16 3l-2 18"/>
    <circle cx="12" cy="12" r="8" opacity="0.2" fill="currentColor"/>
  </svg>
);

export const BlockIcon = ({ size = 24, className = '', animated = false, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    className={`block-icon ${className} ${animated ? 'animated' : ''}`}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    {...props}
  >
    <rect x="3" y="3" width="7" height="7" rx="1"/>
    <rect x="14" y="3" width="7" height="7" rx="1"/>
    <rect x="3" y="14" width="7" height="7" rx="1"/>
    <rect x="14" y="14" width="7" height="7" rx="1"/>
    <path d="M7 7l3 3"/>
    <path d="M17 7l-3 3"/>
    <path d="M7 17l3-3"/>
    <path d="M17 17l-3-3"/>
    {animated && (
      <style>
        {`
          .block-icon.animated rect {
            animation: blockPulse 2s ease-in-out infinite;
          }
          .block-icon.animated rect:nth-child(2) { animation-delay: 0.2s; }
          .block-icon.animated rect:nth-child(3) { animation-delay: 0.4s; }
          .block-icon.animated rect:nth-child(4) { animation-delay: 0.6s; }
          @keyframes blockPulse {
            0%, 100% { opacity: 0.6; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.05); }
          }
        `}
      </style>
    )}
  </svg>
);

export const MiningIcon = ({ size = 24, className = '', animated = false, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    className={`mining-icon ${className} ${animated ? 'animated' : ''}`}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    {...props}
  >
    <path d="M6 2L3 6v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6l-3-4H6z"/>
    <line x1="3" y1="6" x2="21" y2="6"/>
    <path d="M16 10a4 4 0 0 1-8 0"/>
    <circle cx="12" cy="14" r="2"/>
    {animated && (
      <>
        <path d="M10 14h4" stroke="#FFD700" strokeWidth="3" opacity="0">
          <animate attributeName="opacity" values="0;1;0" dur="1.5s" repeatCount="indefinite"/>
        </path>
        <style>
          {`
            .mining-icon.animated circle {
              animation: miningGlow 1.5s ease-in-out infinite;
            }
            @keyframes miningGlow {
              0%, 100% { fill: none; }
              50% { fill: #FFD700; opacity: 0.7; }
            }
          `}
        </style>
      </>
    )}
  </svg>
);

export const KeyIcon = ({ size = 24, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    className={`key-icon ${className}`}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    {...props}
  >
    <circle cx="8" cy="8" r="6"/>
    <path d="M14.31 8L20 13.69a4.18 4.18 0 0 1 0 5.9l-.4.4a4.18 4.18 0 0 1-5.9 0L8 14.31"/>
    <path d="M5.5 8h5"/>
    <circle cx="8" cy="8" r="2" fill="currentColor" opacity="0.3"/>
  </svg>
);

export const TransactionIcon = ({ size = 24, className = '', animated = false, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    className={`transaction-icon ${className} ${animated ? 'animated' : ''}`}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    {...props}
  >
    <circle cx="12" cy="12" r="10"/>
    <path d="M16 12l-4-4-4 4"/>
    <path d="M12 16V9"/>
    {animated && (
      <>
        <circle cx="12" cy="8" r="2" fill="currentColor" opacity="0">
          <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite"/>
          <animateTransform 
            attributeName="transform" 
            type="translate" 
            values="0,0; 0,8; 0,0" 
            dur="2s" 
            repeatCount="indefinite"
          />
        </circle>
        <style>
          {`
            .transaction-icon.animated circle:first-child {
              animation: transactionPulse 2s ease-in-out infinite;
            }
            @keyframes transactionPulse {
              0%, 100% { stroke-width: 2; opacity: 1; }
              50% { stroke-width: 3; opacity: 0.7; }
            }
          `}
        </style>
      </>
    )}
  </svg>
);

export const WalletIcon = ({ size = 24, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    className={`wallet-icon ${className}`}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    {...props}
  >
    <path d="M21 12V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5"/>
    <path d="M16 6V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v2"/>
    <circle cx="16" cy="14" r="2"/>
  </svg>
);

export const SecurityIcon = ({ size = 24, className = '', animated = false, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    className={`security-icon ${className} ${animated ? 'animated' : ''}`}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    {...props}
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    <path d="M9 12l2 2 4-4"/>
    {animated && (
      <style>
        {`
          .security-icon.animated path:first-child {
            animation: securityGlow 3s ease-in-out infinite;
          }
          @keyframes securityGlow {
            0%, 100% { fill: none; }
            50% { fill: currentColor; opacity: 0.2; }
          }
        `}
      </style>
    )}
  </svg>
);

export const NetworkIcon = ({ size = 24, className = '', animated = false, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    className={`network-icon ${className} ${animated ? 'animated' : ''}`}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    {...props}
  >
    <circle cx="12" cy="12" r="3"/>
    <circle cx="12" cy="5" r="2"/>
    <circle cx="5" cy="19" r="2"/>
    <circle cx="19" cy="19" r="2"/>
    <path d="M10.5 10L7 17"/>
    <path d="M13.5 10L17 17"/>
    <path d="M12 9V7"/>
    {animated && (
      <>
        <circle cx="12" cy="12" r="1" fill="currentColor" opacity="0">
          <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite"/>
          <animate attributeName="r" values="1;6;1" dur="2s" repeatCount="indefinite"/>
        </circle>
        <style>
          {`
            .network-icon.animated circle {
              animation: networkPulse 2s ease-in-out infinite;
            }
            .network-icon.animated circle:nth-child(2) { animation-delay: 0.3s; }
            .network-icon.animated circle:nth-child(3) { animation-delay: 0.6s; }
            .network-icon.animated circle:nth-child(4) { animation-delay: 0.9s; }
            @keyframes networkPulse {
              0%, 100% { transform: scale(1); opacity: 1; }
              50% { transform: scale(1.2); opacity: 0.7; }
            }
          `}
        </style>
      </>
    )}
  </svg>
);

export const LightningIcon = ({ size = 24, className = '', animated = false, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    className={`lightning-icon ${className} ${animated ? 'animated' : ''}`}
    fill="currentColor"
    stroke="none"
    {...props}
  >
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="#FFD700"/>
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="none" stroke="currentColor" strokeWidth="1"/>
    {animated && (
      <style>
        {`
          .lightning-icon.animated {
            animation: lightningFlash 1s ease-in-out infinite;
          }
          @keyframes lightningFlash {
            0%, 50%, 100% { opacity: 1; }
            25%, 75% { opacity: 0.3; }
          }
        `}
      </style>
    )}
  </svg>
);

export const ProgressIcon = ({ size = 24, className = '', progress = 0, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    className={`progress-icon ${className}`}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    {...props}
  >
    <circle cx="12" cy="12" r="10" opacity="0.2"/>
    <path
      d="M22 12c0-5.52-4.48-10-10-10"
      strokeDasharray={`${progress * 0.628} 62.8`}
      strokeLinecap="round"
      transform="rotate(-90 12 12)"
      stroke="#4CAF50"
      strokeWidth="3"
    />
    <circle cx="12" cy="12" r="6" opacity="0.1" fill="currentColor"/>
    <text x="12" y="16" textAnchor="middle" fontSize="8" fill="currentColor">
      {Math.round(progress)}%
    </text>
  </svg>
);

// Educational Icons
export const LearnIcon = ({ size = 24, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    className={`learn-icon ${className}`}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    {...props}
  >
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
    <path d="M12 7v10"/>
    <circle cx="12" cy="7" r="2" fill="currentColor" opacity="0.3"/>
  </svg>
);

export const QuizIcon = ({ size = 24, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    className={`quiz-icon ${className}`}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    {...props}
  >
    <circle cx="12" cy="12" r="10"/>
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
    <point x="12" y="17"/>
    <circle cx="12" cy="17" r="1" fill="currentColor"/>
  </svg>
);

export const AchievementIcon = ({ size = 24, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    className={`achievement-icon ${className}`}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    {...props}
  >
    <circle cx="12" cy="8" r="7"/>
    <path d="M8.21 13.89L7 23l5-3 5 3-1.21-9.12"/>
    <circle cx="12" cy="8" r="3" fill="#FFD700" stroke="#FFD700"/>
    <path d="M10.5 8L12 9.5L13.5 8" stroke="white" strokeWidth="1.5"/>
  </svg>
);

// Status and Feedback Icons
export const SuccessIcon = ({ size = 24, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    className={`success-icon ${className}`}
    fill="none"
    {...props}
  >
    <circle cx="12" cy="12" r="10" fill="#4CAF50"/>
    <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export const ErrorIcon = ({ size = 24, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    className={`error-icon ${className}`}
    fill="none"
    {...props}
  >
    <circle cx="12" cy="12" r="10" fill="#F44336"/>
    <path d="M15 9l-6 6" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    <path d="M9 9l6 6" stroke="white" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export const WarningIcon = ({ size = 24, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    className={`warning-icon ${className}`}
    fill="none"
    {...props}
  >
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" fill="#FF9800"/>
    <line x1="12" y1="9" x2="12" y2="13" stroke="white" strokeWidth="2"/>
    <circle cx="12" cy="17" r="1" fill="white"/>
  </svg>
);

export const InfoIcon = ({ size = 24, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    className={`info-icon ${className}`}
    fill="none"
    {...props}
  >
    <circle cx="12" cy="12" r="10" fill="#2196F3"/>
    <line x1="12" y1="16" x2="12" y2="12" stroke="white" strokeWidth="2"/>
    <circle cx="12" cy="8" r="1" fill="white"/>
  </svg>
);

// Utility function to get icon by name
export const getIcon = (name, props = {}) => {
  const iconMap = {
    bitcoin: BitcoinIcon,
    hash: HashIcon,
    block: BlockIcon,
    mining: MiningIcon,
    key: KeyIcon,
    transaction: TransactionIcon,
    wallet: WalletIcon,
    security: SecurityIcon,
    network: NetworkIcon,
    lightning: LightningIcon,
    progress: ProgressIcon,
    learn: LearnIcon,
    quiz: QuizIcon,
    achievement: AchievementIcon,
    success: SuccessIcon,
    error: ErrorIcon,
    warning: WarningIcon,
    info: InfoIcon
  };
  
  const IconComponent = iconMap[name];
  return IconComponent ? <IconComponent {...props} /> : null;
};

// Icon wrapper component for consistent styling
export const IconWrapper = ({ 
  children, 
  size = 'md',
  variant = 'default',
  className = '',
  ...props 
}) => {
  const sizeMap = {
    xs: 16,
    sm: 20,
    md: 24,
    lg: 32,
    xl: 48
  };
  
  const variantClasses = {
    default: '',
    primary: 'text-blue-600',
    success: 'text-green-600',
    warning: 'text-yellow-600',
    error: 'text-red-600',
    muted: 'text-gray-500'
  };
  
  return (
    <span 
      className={`icon-wrapper ${variantClasses[variant]} ${className}`}
      style={{ fontSize: `${sizeMap[size]}px` }}
      {...props}
    >
      {children}
    </span>
  );
};

export default {
  BitcoinIcon,
  HashIcon,
  BlockIcon,
  MiningIcon,
  KeyIcon,
  TransactionIcon,
  WalletIcon,
  SecurityIcon,
  NetworkIcon,
  LightningIcon,
  ProgressIcon,
  LearnIcon,
  QuizIcon,
  AchievementIcon,
  SuccessIcon,
  ErrorIcon,
  WarningIcon,
  InfoIcon,
  getIcon,
  IconWrapper
};
