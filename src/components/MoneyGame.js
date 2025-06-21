import React, { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Scale, Zap, Clock, Globe, Lock } from 'lucide-react';
import './MoneyGame.css';

const moneyProperties = [
  {
    id: 'scarce',
    icon: Scale,
    title: 'Scarce & Disinflationary',
    description: 'Supply is limited and growth rate decreases over time.',
    hint: 'Think about gold vs. paper money - which one can be created endlessly?',
    correctFeedback: 'Correct! Like gold, Bitcoin has a fixed supply (21 million) and becomes harder to create over time.',
    category: 'value'
  },
  {
    id: 'portable',
    icon: Zap,
    title: 'Portable & Divisible',
    description: 'Easy to move and can be split into smaller units.',
    hint: 'Imagine trying to pay for coffee with gold bars vs. digital money.',
    correctFeedback: 'Right! Bitcoin can be sent globally and divided into 100 million "satoshis" per coin.',
    category: 'utility'
  },
  {
    id: 'durable',
    icon: Clock,
    title: 'Durable & Unchangeable',
    description: 'Maintains its integrity over time without degrading.',
    hint: 'Paper money wears out, digital records can be altered - what never changes?',
    correctFeedback: 'Exactly! Bitcoin\'s blockchain is permanent and immutable - every transaction since 2009 remains intact.',
    category: 'integrity'
  },
  {
    id: 'accessible',
    icon: Globe,
    title: 'Open & Accessible',
    description: 'Anyone can use it without permission or approval.',
    hint: 'Think about who controls access to bank accounts vs. open systems.',
    correctFeedback: 'Perfect! Bitcoin treats everyone equally - no bank approvals, no discrimination.',
    category: 'freedom'
  },
  {
    id: 'unconfiscatable',
    icon: Lock,
    title: 'Unconfiscatable & Borderless',
    description: 'Your money remains yours no matter where you go.',
    hint: 'Can your current money be frozen or seized by others?',
    correctFeedback: 'Excellent! Bitcoin can\'t be frozen or seized if you control your private keys.',
    category: 'sovereignty'
  }
];

const PropertyCard = ({ property, isInDropZone }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'property',
    item: { id: property.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  }));

  const Icon = property.icon;

  return (
    <div
      ref={drag}
      className={`property-card ${isDragging ? 'dragging' : ''} ${isInDropZone ? 'in-dropzone' : ''}`}
    >
      <div className="property-icon">
        <Icon size={24} />
      </div>
      <div className="property-content">
        <h3>{property.title}</h3>
        <p>{property.description}</p>
      </div>
    </div>
  );
};

const DropZone = ({ onDrop, properties }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'property',
    drop: (item) => onDrop(item.id),
    collect: (monitor) => ({
      isOver: monitor.isOver()
    })
  }));

  return (
    <div ref={drop} className={`dropzone ${isOver ? 'over' : ''}`}>
      <div className="bitcoin-circle">
        <span className="bitcoin-symbol">₿</span>
      </div>
      <div className="dropped-properties">
        {properties.map(prop => (
          <PropertyCard key={prop.id} property={prop} isInDropZone={true} />
        ))}
      </div>
    </div>
  );
};

const MoneyGame = ({ onComplete }) => {
  const [droppedProperties, setDroppedProperties] = useState([]);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  const handleDrop = (propertyId) => {
    const property = moneyProperties.find(p => p.id === propertyId);
    if (!droppedProperties.find(p => p.id === propertyId)) {
      setDroppedProperties([...droppedProperties, property]);
      setFeedback(property.correctFeedback);
      
      if (droppedProperties.length + 1 === moneyProperties.length) {
        setIsComplete(true);
        setTimeout(() => onComplete(), 2000);
      }
    }
  };

  const showPropertyHint = (propertyId) => {
    const property = moneyProperties.find(p => p.id === propertyId);
    setCurrentHint(property.hint);
    setShowHint(true);
  };

  const availableProperties = moneyProperties.filter(
    prop => !droppedProperties.find(p => p.id === prop.id)
  );

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="money-game">
        <h2>Build the Perfect Money</h2>
        <p className="game-description">
          Drag the properties that you think make money valuable and useful into the Bitcoin circle.
          Try to identify all the essential characteristics of sound money.
        </p>

        <div className="game-container">
          <div className="properties-list">
            {availableProperties.map(property => (
              <div key={property.id} className="property-wrapper">
                <PropertyCard property={property} />
                <button 
                  className="hint-button"
                  onClick={() => showPropertyHint(property.id)}
                >
                  Need a hint? 💡
                </button>
              </div>
            ))}
          </div>

          <DropZone onDrop={handleDrop} properties={droppedProperties} />
        </div>

        {showHint && (
          <div className="hint-box">
            <p>{currentHint}</p>
            <button onClick={() => setShowHint(false)}>Got it!</button>
          </div>
        )}

        {feedback && (
          <div className={`feedback-box ${isComplete ? 'complete' : ''}`}>
            <p>{feedback}</p>
            {isComplete && (
              <p className="completion-message">
                🎉 Congratulations! You've identified all the properties that make Bitcoin the perfect form of money!
              </p>
            )}
          </div>
        )}

        <div className="progress-indicator">
          {droppedProperties.length} / {moneyProperties.length} properties identified
        </div>
      </div>
    </DndProvider>
  );
};

export default MoneyGame; 