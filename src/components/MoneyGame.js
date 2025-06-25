import React, { useState, useEffect } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Scale, Zap, Clock, Globe, Lock, Shield, HelpCircle, CheckCircle } from 'lucide-react';
import './MoneyGame.css';

const moneyProperties = [
  {
    id: 'scarce',
    icon: Scale,
    title: 'Scarce / Hard to Create',
    description: 'Supply is limited and growth rate decreases over time.',
    isCorrect: true,
    hint: 'Think about gold vs. paper money - which one can be created endlessly?',
    feedback: 'Correct! Like gold, Bitcoin has a fixed supply (21 million) and becomes harder to create over time.'
  },
  {
    id: 'durable',
    icon: Clock,
    title: 'Durable & Unchangeable',
    description: 'Maintains its integrity over time without degrading.',
    isCorrect: true,
    hint: 'If money melts or rusts, it\'s a ticking time bomb.',
    feedback: 'Perfect! Bitcoin\'s blockchain is permanent and immutable - every transaction since 2009 remains intact.'
  },
  {
    id: 'portable',
    icon: Zap,
    title: 'Portable & Divisible',
    description: 'Easy to move and can be split into smaller units.',
    isCorrect: true,
    hint: 'Imagine trying to pay for coffee with gold bars vs. digital money.',
    feedback: 'Right! Bitcoin can be sent globally and divided into 100 million "satoshis" per coin.'
  },
  {
    id: 'verifiable',
    icon: Shield,
    title: 'Verifiable',
    description: 'Can be authenticated without trusting a third party.',
    isCorrect: true,
    hint: 'Trust is great... until someone breaks it.',
    feedback: 'Exactly! Bitcoin transactions can be verified by anyone, anywhere, without permission.'
  },
  {
    id: 'unconfiscatable',
    icon: Lock,
    title: 'Censorship-Resistant / Unconfiscatable',
    description: 'Your money remains yours no matter where you go.',
    isCorrect: true,
    hint: 'Sound money doesn\'t ask for permission.',
    feedback: 'Excellent! Bitcoin can\'t be frozen or seized if you control your private keys.'
  },
  {
    id: 'decentralized',
    icon: Globe,
    title: 'Decentralized',
    description: 'No single point of control or failure.',
    isCorrect: true,
    hint: 'What happens when your money stops working, but rent is due?',
    feedback: 'Perfect! Bitcoin\'s decentralized nature means no single entity can control or shut it down.'
  },
  {
    id: 'printable',
    icon: Scale,
    title: 'Can be printed to stimulate the economy',
    description: 'Central banks can create more when needed.',
    isCorrect: false,
    hint: 'If they can print more, is it even yours?',
    feedback: '🚫 That\'s how inflation sneaks in the back door.'
  },
  {
    id: 'government',
    icon: Shield,
    title: 'Government-backed',
    description: 'Requires official support to function.',
    isCorrect: false,
    hint: 'They said it was backed. Then they changed the rules.',
    feedback: '👎 Trust-based systems eventually break under pressure.'
  }
];

// Fisher-Yates shuffle algorithm
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const PropertyCard = ({ property, isInDropZone, onDrop }) => {
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
      onClick={() => onDrop && onDrop(property)}
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
        <p>{properties.filter(p => p.isCorrect).length} / 6 properties identified</p>
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
  const [properties, setProperties] = useState([]);
  const [droppedProperties, setDroppedProperties] = useState([]);
  const [feedback, setFeedback] = useState('');
  const [hintIndex, setHintIndex] = useState(0);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    setProperties(shuffleArray(moneyProperties));
  }, []);

  const handleDrop = (propertyId) => {
    const property = properties.find(p => p.id === propertyId);
    if (!droppedProperties.find(p => p.id === propertyId)) {
      setDroppedProperties([...droppedProperties, property]);
      setFeedback(property.feedback);
      
      if (property.isCorrect && droppedProperties.filter(p => p.isCorrect).length + 1 >= 6) {
        setTimeout(() => onComplete(), 2000);
      }
    }
  };

  const handleHint = () => {
    const availableProperties = properties.filter(
      prop => !droppedProperties.find(p => p.id === prop.id)
    );
    if (availableProperties.length > 0) {
      setShowHint(true);
      setHintIndex((hintIndex + 1) % availableProperties.length);
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="module-container">
        <h1 className="module-title">Build the Perfect Money</h1>
        <div className="module-description">
          <p>Most money starts strong and ends in disaster.</p>
          <p>Let's see if you can do better.</p>
          <p>Drag or click the traits you think make money work.</p>
          <p className="warning-text">If you're right, you'll know — and if you're wrong, history's already proven it.</p>
        </div>

        <div className="hint-box" onClick={handleHint}>
          <HelpCircle size={20} />
          {showHint && properties[hintIndex]?.hint}
        </div>

        <div className="game-area">
          <div className="properties-list">
            {properties
              .filter(prop => !droppedProperties.find(p => p.id === prop.id))
              .map(property => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  onDrop={() => handleDrop(property.id)}
                />
              ))}
          </div>

          <DropZone onDrop={handleDrop} properties={droppedProperties} />
        </div>

        {feedback && (
          <div className="feedback-text">{feedback}</div>
        )}

        {droppedProperties.filter(p => p.isCorrect).length >= 6 && (
          <div className="completion-box">
            <CheckCircle size={32} />
            <h2>You just built Bitcoin — without even knowing it.</h2>
            <p>Want to see how it works in real life?</p>
            <button className="continue-button" onClick={onComplete}>Continue</button>
          </div>
        )}
      </div>
    </DndProvider>
  );
};

export default MoneyGame; 