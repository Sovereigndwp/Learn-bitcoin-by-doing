import React from 'react';

const AnimatedIcon = ({ type, className = '' }) => {
  const icons = {
    // Barter section
    chicken: '🐔',
    spear: '🗡️',
    handshake: '🤝',
    
    // Money section
    shoes: '👟',
    bread: '🥖',
    money: '💰',
    coins: '🪙🪙🪙',
    sheep: '🐑',
    apples: '🍎',
    pricetag: '🏷️',
    exchange: '💱',
    couch: '🛋️',
    magic: '✨',

    // Quiz section
    shell: '🐚',
    trader: '🚢',
    emperor: '👑',
    salt: '🧂',
    gold: '🏆',
    bank: '🏦',
    digital: '💳',
    cattle: '🐄',
    stone: '🗿',
    protest: '🚫',
    border: '🌐',
    
    // Traits section
    scarcity: '💎',
    durability: '🛡️',
    portability: '✈️',
    storeOfValue: '🏺',
    fungibility: '⚖️',
    consensus: '🤝',
    censorshipResistance: '🔓',
    borderless: '🌍',
    divisibility: '✂️',
    
    // External resource
    history: '📚',
    learn: '🎓',
    explore: '🔍'
  };

  // For now, we'll use emojis as fallback until we add actual GIFs
  return <span className={`animated-icon ${className}`}>{icons[type] || '❓'}</span>;
};

export default AnimatedIcon; 