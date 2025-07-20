import React, { useRef, useCallback, useState, useEffect } from 'react';
import Lottie from 'lottie-react';

/**
 * LottieAnimation Component for Bitcoin Learning App
 * 
 * Provides smooth, performant animations to replace GIF placeholders
 * 
 * Features:
 * - Configurable playback controls
 * - Performance optimizations
 * - Accessibility compliance
 * - Responsive sizing
 * - Event callbacks
 * - Animation state management
 */

const LottieAnimation = ({
  animationData,
  loop = true,
  autoplay = true,
  speed = 1,
  className = '',
  style = {},
  width = 'auto',
  height = 'auto',
  onComplete = null,
  onLoopComplete = null,
  onSegmentStart = null,
  onAnimationLoaded = null,
  rendererSettings = {},
  segments = null,
  goTo = null,
  direction = 1,
  hover = false,
  click = false,
  interactivity = null,
  isPaused = false,
  isStopped = false,
  preload = true,
  preserveAspectRatio = 'xMidYMid meet',
  initialSegment = null,
  ...props
}) => {
  const lottieRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [animationState, setAnimationState] = useState('loading');

  // Animation control functions
  const play = useCallback(() => {
    lottieRef.current?.play();
    setAnimationState('playing');
  }, []);

  const pause = useCallback(() => {
    lottieRef.current?.pause();
    setAnimationState('paused');
  }, []);

  const stop = useCallback(() => {
    lottieRef.current?.stop();
    setAnimationState('stopped');
  }, []);

  const goToAndPlay = useCallback((value, isFrame = false) => {
    lottieRef.current?.goToAndPlay(value, isFrame);
    setAnimationState('playing');
  }, []);

  const goToAndStop = useCallback((value, isFrame = false) => {
    lottieRef.current?.goToAndStop(value, isFrame);
    setAnimationState('stopped');
  }, []);

  const setSpeed = useCallback((newSpeed) => {
    lottieRef.current?.setSpeed(newSpeed);
  }, []);

  const setDirection = useCallback((newDirection) => {
    lottieRef.current?.setDirection(newDirection);
  }, []);

  // Handle animation loaded event
  const handleAnimationLoaded = useCallback(() => {
    setIsLoaded(true);
    setAnimationState(autoplay ? 'playing' : 'loaded');
    onAnimationLoaded?.(lottieRef.current);
  }, [autoplay, onAnimationLoaded]);

  // Handle animation complete event
  const handleComplete = useCallback(() => {
    setAnimationState('complete');
    onComplete?.(lottieRef.current);
  }, [onComplete]);

  // Handle loop complete event
  const handleLoopComplete = useCallback(() => {
    onLoopComplete?.(lottieRef.current);
  }, [onLoopComplete]);

  // Handle segment start event
  const handleSegmentStart = useCallback(() => {
    onSegmentStart?.(lottieRef.current);
  }, [onSegmentStart]);

  // Handle hover interactions
  const handleMouseEnter = useCallback(() => {
    if (hover && lottieRef.current) {
      lottieRef.current.play();
      setAnimationState('playing');
    }
  }, [hover]);

  const handleMouseLeave = useCallback(() => {
    if (hover && lottieRef.current) {
      lottieRef.current.pause();
      setAnimationState('paused');
    }
  }, [hover]);

  // Handle click interactions
  const handleClick = useCallback(() => {
    if (click && lottieRef.current) {
      if (animationState === 'playing') {
        lottieRef.current.pause();
        setAnimationState('paused');
      } else {
        lottieRef.current.play();
        setAnimationState('playing');
      }
    }
  }, [click, animationState]);

  // Handle external control props
  useEffect(() => {
    if (!lottieRef.current) return;

    if (isPaused && animationState === 'playing') {
      pause();
    } else if (isStopped && animationState !== 'stopped') {
      stop();
    } else if (!isPaused && !isStopped && animationState !== 'playing' && autoplay) {
      play();
    }
  }, [isPaused, isStopped, animationState, autoplay, pause, stop, play]);

  // Handle speed changes
  useEffect(() => {
    if (lottieRef.current && speed !== 1) {
      setSpeed(speed);
    }
  }, [speed, setSpeed]);

  // Handle direction changes
  useEffect(() => {
    if (lottieRef.current && direction !== 1) {
      setDirection(direction);
    }
  }, [direction, setDirection]);

  // Handle goTo prop
  useEffect(() => {
    if (lottieRef.current && goTo !== null) {
      if (typeof goTo === 'object' && goTo.value !== undefined) {
        if (goTo.play) {
          goToAndPlay(goTo.value, goTo.isFrame);
        } else {
          goToAndStop(goTo.value, goTo.isFrame);
        }
      }
    }
  }, [goTo, goToAndPlay, goToAndStop]);

  // Default renderer settings for better performance
  const defaultRendererSettings = {
    preserveAspectRatio,
    clearCanvas: true,
    progressiveLoad: preload,
    hideOnTransparent: true,
    ...rendererSettings
  };

  // Lottie configuration
  const lottieConfig = {
    lottieRef,
    animationData,
    loop,
    autoplay,
    rendererSettings: defaultRendererSettings,
    onComplete: handleComplete,
    onLoopComplete: handleLoopComplete,
    onSegmentStart: handleSegmentStart,
    onDOMLoaded: handleAnimationLoaded,
    segments,
    interactivity,
    initialSegment,
    ...props
  };

  // Container style
  const containerStyle = {
    width,
    height,
    display: 'inline-block',
    overflow: 'hidden',
    ...style
  };

  return (
    <div
      className={`lottie-animation-container ${className}`}
      style={containerStyle}
      onMouseEnter={hover ? handleMouseEnter : undefined}
      onMouseLeave={hover ? handleMouseLeave : undefined}
      onClick={click ? handleClick : undefined}
      role={click ? 'button' : undefined}
      tabIndex={click ? 0 : undefined}
      onKeyDown={click ? (e) => e.key === 'Enter' && handleClick() : undefined}
      aria-label={props['aria-label'] || 'Animated illustration'}
    >
      {!isLoaded && (
        <div 
          className="lottie-loading-placeholder"
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f5f5f5',
            color: '#666',
            fontSize: '12px'
          }}
        >
          Loading animation...
        </div>
      )}
      
      <Lottie {...lottieConfig} />
      
      {/* Debug info (only in development) */}
      {process.env.NODE_ENV === 'development' && (
        <div style={{
          position: 'absolute',
          top: 0,
          right: 0,
          background: 'rgba(0,0,0,0.7)',
          color: 'white',
          padding: '2px 6px',
          fontSize: '10px',
          opacity: 0.5
        }}>
          {animationState}
        </div>
      )}
    </div>
  );
};

// Higher-order component for lazy loading animations
export const LazyLottieAnimation = ({ 
  animationPath, 
  fallback = null, 
  ...props 
}) => {
  const [animationData, setAnimationData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isCancelled = false;

    const loadAnimation = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(animationPath);
        
        if (!response.ok) {
          throw new Error(`Failed to load animation: ${response.statusText}`);
        }
        
        const data = await response.json();
        
        if (!isCancelled) {
          setAnimationData(data);
          setError(null);
        }
      } catch (err) {
        if (!isCancelled) {
          setError(err.message);
          console.error('Failed to load Lottie animation:', err);
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    };

    if (animationPath) {
      loadAnimation();
    }

    return () => {
      isCancelled = true;
    };
  }, [animationPath]);

  if (isLoading) {
    return fallback || (
      <div className="lottie-lazy-loading" style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        minHeight: props.height || '100px',
        color: '#666'
      }}>
        Loading...
      </div>
    );
  }

  if (error) {
    return fallback || (
      <div className="lottie-lazy-error" style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        minHeight: props.height || '100px',
        color: '#f44336'
      }}>
        Failed to load animation
      </div>
    );
  }

  return <LottieAnimation animationData={animationData} {...props} />;
};

// Preset configurations for common Bitcoin learning animations
export const BitcoinAnimationPresets = {
  // Transaction animation
  transaction: {
    loop: true,
    autoplay: true,
    speed: 1,
    hover: false,
    click: false,
    className: 'bitcoin-transaction-animation'
  },
  
  // Mining animation
  mining: {
    loop: true,
    autoplay: true,
    speed: 0.8,
    hover: false,
    click: false,
    className: 'bitcoin-mining-animation'
  },
  
  // Block creation animation
  blockCreation: {
    loop: false,
    autoplay: false,
    speed: 1,
    hover: true,
    click: false,
    className: 'bitcoin-block-creation-animation'
  },
  
  // Wallet animation
  wallet: {
    loop: true,
    autoplay: true,
    speed: 0.5,
    hover: false,
    click: true,
    className: 'bitcoin-wallet-animation'
  },
  
  // Success celebration
  success: {
    loop: false,
    autoplay: true,
    speed: 1.2,
    hover: false,
    click: false,
    className: 'bitcoin-success-animation'
  },
  
  // Loading/thinking
  loading: {
    loop: true,
    autoplay: true,
    speed: 1,
    hover: false,
    click: false,
    className: 'bitcoin-loading-animation'
  }
};

// Utility function to create preset animations
export const createPresetAnimation = (preset, animationData, customProps = {}) => {
  const presetConfig = BitcoinAnimationPresets[preset] || BitcoinAnimationPresets.transaction;
  
  return (
    <LottieAnimation 
      animationData={animationData}
      {...presetConfig}
      {...customProps}
    />
  );
};

export default LottieAnimation;
