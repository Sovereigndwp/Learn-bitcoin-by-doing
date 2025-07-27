import React from 'react';
import './AnimatedIcons.css';

// Animated Search Icon
export const AnimatedSearchIcon = () => (
  <div className="animated-icon search-icon">
    <svg viewBox="0 0 100 100" className="search-svg">
      <circle 
        cx="35" cy="35" r="20" 
        fill="none" 
        stroke="#f7931a" 
        strokeWidth="3"
        className="search-circle"
      />
      <line 
        x1="55" y1="55" x2="75" y2="75" 
        stroke="#f7931a" 
        strokeWidth="3" 
        strokeLinecap="round"
        className="search-line"
      />
      <circle 
        cx="35" cy="35" r="8" 
        fill="#f7931a" 
        opacity="0.6"
        className="search-dot"
      />
    </svg>
  </div>
);

// Animated Brain Icon
export const AnimatedBrainIcon = () => (
  <div className="animated-icon brain-icon">
    <svg viewBox="0 0 100 100" className="brain-svg">
      <path 
        d="M30 25 Q35 15 45 20 Q55 15 65 20 Q70 25 68 35 Q75 40 70 50 Q72 60 65 65 Q55 70 45 65 Q35 70 25 65 Q20 60 22 50 Q15 40 20 35 Q18 25 30 25 Z" 
        fill="#3b82f6" 
        className="brain-shape"
      />
      <circle cx="40" cy="35" r="2" fill="#fafafa" className="synapse synapse-1" />
      <circle cx="55" cy="40" r="2" fill="#fafafa" className="synapse synapse-2" />
      <circle cx="45" cy="50" r="2" fill="#fafafa" className="synapse synapse-3" />
      <path 
        d="M38 35 Q45 30 52 40" 
        stroke="#fafafa" 
        strokeWidth="1" 
        fill="none" 
        className="neural-path neural-1"
      />
      <path 
        d="M42 50 Q50 45 58 42" 
        stroke="#fafafa" 
        strokeWidth="1" 
        fill="none" 
        className="neural-path neural-2"
      />
    </svg>
  </div>
);

// Animated Money Icon
export const AnimatedMoneyIcon = () => (
  <div className="animated-icon money-icon">
    <svg viewBox="0 0 100 100" className="money-svg">
      <circle 
        cx="50" cy="50" r="35" 
        fill="#ef4444" 
        stroke="#b91c1c" 
        strokeWidth="2"
        className="coin-base"
      />
      <text 
        x="50" y="58" 
        textAnchor="middle" 
        fontSize="24" 
        fontWeight="bold" 
        fill="#fafafa"
        className="dollar-sign"
      >
        $
      </text>
      <circle 
        cx="50" cy="50" r="35" 
        fill="none" 
        stroke="#fbbf24" 
        strokeWidth="2" 
        strokeDasharray="8 4"
        className="rotating-ring"
      />
      <circle cx="65" cy="35" r="3" fill="#fbbf24" className="spark spark-1" />
      <circle cx="35" cy="65" r="3" fill="#fbbf24" className="spark spark-2" />
    </svg>
  </div>
);

// Animated Scale/Balance Icon
export const AnimatedScaleIcon = () => (
  <div className="animated-icon scale-icon">
    <svg viewBox="0 0 100 100" className="scale-svg">
      <line 
        x1="50" y1="20" x2="50" y2="80" 
        stroke="#10b981" 
        strokeWidth="3"
        className="scale-post"
      />
      <line 
        x1="25" y1="40" x2="75" y2="40" 
        stroke="#10b981" 
        strokeWidth="2"
        className="scale-beam"
      />
      <circle cx="50" cy="40" r="4" fill="#10b981" className="scale-pivot" />
      
      {/* Left pan */}
      <path 
        d="M20 45 Q25 50 30 45 L30 50 Q25 55 20 50 Z" 
        fill="#10b981" 
        opacity="0.7"
        className="scale-pan left-pan"
      />
      <line x1="25" y1="40" x2="25" y2="45" stroke="#10b981" strokeWidth="1" />
      
      {/* Right pan */}
      <path 
        d="M70 45 Q75 50 80 45 L80 50 Q75 55 70 50 Z" 
        fill="#10b981" 
        opacity="0.7"
        className="scale-pan right-pan"
      />
      <line x1="75" y1="40" x2="75" y2="45" stroke="#10b981" strokeWidth="1" />
      
      {/* Weight indicators */}
      <circle cx="25" cy="48" r="2" fill="#fbbf24" className="weight weight-1" />
      <circle cx="75" cy="48" r="2" fill="#fbbf24" className="weight weight-2" />
    </svg>
  </div>
);

// Animated Bitcoin Icon
export const AnimatedBitcoinIcon = () => (
  <div className="animated-icon bitcoin-icon">
    <svg viewBox="0 0 100 100" className="bitcoin-svg">
      <circle 
        cx="50" cy="50" r="40" 
        fill="#f7931a" 
        className="bitcoin-circle"
      />
      <text 
        x="50" y="62" 
        textAnchor="middle" 
        fontSize="32" 
        fontWeight="bold" 
        fill="#0a0a0a"
        className="bitcoin-symbol"
      >
        ₿
      </text>
      <circle 
        cx="50" cy="50" r="40" 
        fill="none" 
        stroke="#fbbf24" 
        strokeWidth="2" 
        strokeDasharray="12 8"
        className="bitcoin-orbit"
      />
      <circle cx="85" cy="50" r="4" fill="#fbbf24" className="orbit-dot" />
    </svg>
  </div>
);

// Animated Shield/Security Icon for features
export const AnimatedShieldIcon = () => (
  <div className="animated-icon shield-icon">
    <svg viewBox="0 0 100 100" className="shield-svg">
      <path 
        d="M50 10 L20 25 L20 55 Q20 75 50 90 Q80 75 80 55 L80 25 Z" 
        fill="#f7931a" 
        className="shield-body"
      />
      <path 
        d="M45 40 L35 50 L42 57 L55 44 L65 54 L72 47 L55 30 Z" 
        fill="#0a0a0a" 
        className="shield-check"
      />
      <circle cx="50" cy="25" r="3" fill="#fbbf24" className="shield-glow" />
    </svg>
  </div>
);

// Animated Network/Global Icon
export const AnimatedNetworkIcon = () => (
  <div className="animated-icon network-icon">
    <svg viewBox="0 0 100 100" className="network-svg">
      <circle 
        cx="50" cy="50" r="35" 
        fill="none" 
        stroke="#3b82f6" 
        strokeWidth="2" 
        strokeDasharray="5 3"
        className="network-globe"
      />
      <ellipse 
        cx="50" cy="50" rx="35" ry="20" 
        fill="none" 
        stroke="#3b82f6" 
        strokeWidth="1.5"
        className="network-line-1"
      />
      <ellipse 
        cx="50" cy="50" rx="20" ry="35" 
        fill="none" 
        stroke="#3b82f6" 
        strokeWidth="1.5"
        className="network-line-2"
      />
      <line 
        x1="15" y1="50" x2="85" y2="50" 
        stroke="#3b82f6" 
        strokeWidth="1.5"
        className="network-equator"
      />
      <circle cx="50" cy="50" r="4" fill="#fbbf24" className="network-center" />
      <circle cx="30" cy="35" r="2" fill="#fbbf24" className="network-node node-1" />
      <circle cx="70" cy="65" r="2" fill="#fbbf24" className="network-node node-2" />
      <circle cx="70" cy="35" r="2" fill="#fbbf24" className="network-node node-3" />
      <circle cx="30" cy="65" r="2" fill="#fbbf24" className="network-node node-4" />
    </svg>
  </div>
);

// Animated Star/Scarcity Icon
export const AnimatedStarIcon = () => (
  <div className="animated-icon star-icon">
    <svg viewBox="0 0 100 100" className="star-svg">
      <path 
        d="M50 15 L55 35 L75 35 L60 50 L65 70 L50 60 L35 70 L40 50 L25 35 L45 35 Z" 
        fill="#eab308" 
        className="star-body"
      />
      <circle cx="50" cy="45" r="8" fill="#fbbf24" opacity="0.8" className="star-center" />
      <circle cx="35" cy="25" r="2" fill="#fbbf24" className="twinkle twinkle-1" />
      <circle cx="65" cy="30" r="2" fill="#fbbf24" className="twinkle twinkle-2" />
      <circle cx="70" cy="60" r="2" fill="#fbbf24" className="twinkle twinkle-3" />
      <circle cx="30" cy="65" r="2" fill="#fbbf24" className="twinkle twinkle-4" />
    </svg>
  </div>
);
