/**
 * Lottie Animation Configuration for Bitcoin Learning App
 * 
 * This file contains paths and settings for all Lottie animations
 * used throughout the learning modules.
 * 
 * To add new animations:
 * 1. Place JSON files in /public/animations/
 * 2. Add configuration here
 * 3. Import and use in components
 */

export const ANIMATION_PATHS = {
  // Money Module Animations
  moneyTransfer: '/animations/money-transfer.json',
  bitcoinMining: '/animations/bitcoin-mining.json',
  blockCreation: '/animations/block-creation.json',
  walletAnimation: '/animations/wallet-animation.json',
  
  // Transaction Animations
  transactionBroadcast: '/animations/transaction-broadcast.json',
  networkValidation: '/animations/network-validation.json',
  
  // Mining & Security Animations
  proofOfWork: '/animations/proof-of-work.json',
  hashingProcess: '/animations/hashing-process.json',
  difficultyAdjustment: '/animations/difficulty-adjustment.json',
  
  // Success & Feedback Animations
  successCelebration: '/animations/success-celebration.json',
  loadingSpinner: '/animations/loading-spinner.json',
  errorAlert: '/animations/error-alert.json',
  
  // Concept Illustrations
  decentralization: '/animations/decentralization.json',
  cryptographicSecurity: '/animations/cryptographic-security.json',
  economicIncentives: '/animations/economic-incentives.json'
};

export const ANIMATION_PRESETS = {
  // Quick preset configurations for common use cases
  moneyFlow: {
    path: ANIMATION_PATHS.moneyTransfer,
    loop: true,
    autoplay: true,
    speed: 1,
    width: 240,
    height: 180
  },
  
  miningProcess: {
    path: ANIMATION_PATHS.bitcoinMining,
    loop: true,
    autoplay: false, // Start on hover
    speed: 0.8,
    width: 320,
    height: 240,
    hover: true
  },
  
  successFeedback: {
    path: ANIMATION_PATHS.successCelebration,
    loop: false,
    autoplay: true,
    speed: 1.2,
    width: 80,
    height: 80
  },
  
  loadingState: {
    path: ANIMATION_PATHS.loadingSpinner,
    loop: true,
    autoplay: true,
    speed: 1,
    width: 40,
    height: 40
  }
};

/**
 * Placeholder animation data for development
 * Replace with actual Lottie JSON when available
 */
export const PLACEHOLDER_ANIMATIONS = {
  // Simple circle animation for development/testing
  simpleCircle: {
    v: "5.7.4",
    fr: 30,
    ip: 0,
    op: 60,
    w: 200,
    h: 200,
    nm: "SimpleCircle",
    ddd: 0,
    assets: [],
    layers: [
      {
        ddd: 0,
        ind: 1,
        ty: 4,
        nm: "Circle",
        sr: 1,
        ks: {
          o: { a: 0, k: 100 },
          r: { 
            a: 1, 
            k: [
              { i: { x: [0.833], y: [0.833] }, o: { x: [0.167], y: [0.167] }, t: 0, s: [0] },
              { t: 60, s: [360] }
            ] 
          },
          p: { a: 0, k: [100, 100, 0] },
          a: { a: 0, k: [0, 0, 0] },
          s: { a: 0, k: [100, 100, 100] }
        },
        ao: 0,
        shapes: [
          {
            ty: "gr",
            it: [
              {
                d: 1,
                ty: "el",
                s: { a: 0, k: [80, 80] },
                p: { a: 0, k: [0, 0] }
              },
              {
                ty: "st",
                c: { a: 0, k: [0.961, 0.576, 0.102, 1] }, // Bitcoin orange
                o: { a: 0, k: 100 },
                w: { a: 0, k: 4 }
              },
              {
                ty: "tr",
                p: { a: 0, k: [0, 0] },
                a: { a: 0, k: [0, 0] },
                s: { a: 0, k: [100, 100] },
                r: { a: 0, k: 0 },
                o: { a: 0, k: 100 }
              }
            ]
          }
        ],
        ip: 0,
        op: 60,
        st: 0
      }
    ],
    markers: []
  }
};

/**
 * Helper function to get animation configuration
 * @param {string} animationName - Name of the animation preset
 * @returns {object} Animation configuration object
 */
export const getAnimationConfig = (animationName) => {
  const preset = ANIMATION_PRESETS[animationName];
  if (!preset) {
    console.warn(`Animation preset "${animationName}" not found`);
    return null;
  }
  return preset;
};

/**
 * Helper function to check if an animation file exists
 * @param {string} path - Path to animation file
 * @returns {Promise<boolean>} True if file exists
 */
export const checkAnimationExists = async (path) => {
  try {
    const response = await fetch(path);
    return response.ok;
  } catch (error) {
    return false;
  }
};

export default {
  ANIMATION_PATHS,
  ANIMATION_PRESETS,
  PLACEHOLDER_ANIMATIONS,
  getAnimationConfig,
  checkAnimationExists
};
