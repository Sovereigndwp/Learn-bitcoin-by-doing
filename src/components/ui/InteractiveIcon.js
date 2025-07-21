import React, { useState } from 'react';
import { 
  Bitcoin, Coins, TrendingUp, Zap, Lock, Key, Shield, 
  Hash, Calculator, Users, Globe, Layers, ArrowRight,
  CheckCircle, AlertTriangle, Info, Lightbulb, Target,
  Brain, Trophy, Star, Heart, Diamond, Crown
} from 'lucide-react';

const InteractiveIcon = ({ 
  type, 
  size = 48, 
  animated = true, 
  interactive = true,
  theme = 'bitcoin',
  className = '',
  onClick,
  ...props 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const iconMap = {
    // Bitcoin & Money
    bitcoin: Bitcoin,
    coins: Coins,
    money: Coins,
    value: TrendingUp,
    
    // Technology
    lightning: Zap,
    security: Lock,
    keys: Key,
    shield: Shield,
    hash: Hash,
    calculator: Calculator,
    
    // Network & Community
    network: Users,
    globe: Globe,
    layers: Layers,
    connection: ArrowRight,
    
    // Status & Feedback
    success: CheckCircle,
    warning: AlertTriangle,
    info: Info,
    idea: Lightbulb,
    target: Target,
    brain: Brain,
    
    // Achievement
    trophy: Trophy,
    star: Star,
    heart: Heart,
    diamond: Diamond,
    crown: Crown
  };

  const IconComponent = iconMap[type] || Bitcoin;

  const handleClick = (e) => {
    if (!interactive) return;
    
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 200);
    
    if (onClick) onClick(e);
  };

  const iconStyles = {
    cursor: interactive ? 'pointer' : 'default',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    transformOrigin: 'center',
    filter: theme === 'bitcoin' ? 'drop-shadow(0 0 8px rgba(247, 147, 26, 0.3))' : 'none',
    
    // Hover effects
    transform: isHovered && interactive 
      ? 'scale(1.1) rotate(5deg)' 
      : isClicked 
        ? 'scale(0.95)' 
        : 'scale(1)',
    
    // Color theming
    color: theme === 'bitcoin' 
      ? (isHovered ? '#E8830A' : '#F7931A')
      : theme === 'success'
        ? '#4CAF50'
        : theme === 'warning'
          ? '#FF9800'
          : theme === 'info'
            ? '#2196F3'
            : '#F7931A',
    
    // Animation
    animation: animated 
      ? 'iconPulse 2s ease-in-out infinite, iconFloat 3s ease-in-out infinite'
      : 'none'
  };

  return (
    <div className={`interactive-icon-container ${className}`}>
      <IconComponent
        size={size}
        style={iconStyles}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleClick}
        {...props}
      />
      
      {/* Bitcoin-themed glow effect */}
      {theme === 'bitcoin' && animated && (
        <div 
          className="icon-glow"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: size * 1.5,
            height: size * 1.5,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(247, 147, 26, 0.2) 0%, transparent 70%)',
            animation: 'glowPulse 2s ease-in-out infinite',
            pointerEvents: 'none',
            zIndex: -1
          }}
        />
      )}
      
      <style jsx>{`
        .interactive-icon-container {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        
        @keyframes iconPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        
        @keyframes iconFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-4px); }
        }
        
        @keyframes glowPulse {
          0%, 100% { opacity: 0.3; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.6; transform: translate(-50%, -50%) scale(1.1); }
        }
        
        /* Responsive sizing */
        @media (max-width: 768px) {
          .interactive-icon-container {
            transform: scale(0.9);
          }
        }
      `}</style>
    </div>
  );
};

export default InteractiveIcon; 