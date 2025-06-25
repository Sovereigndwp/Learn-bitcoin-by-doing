import React, { useState } from 'react';
import { Shuffle, Eye, EyeOff, CheckCircle } from 'lucide-react';
import './SeedLab.css';

// Mock BIP39 wordlist (in production, use actual BIP39 library)
const mockWordlist = [
  "abandon", "ability", "able", "about", "above", "absent",
  "absorb", "abstract", "absurd", "abuse", "access", "accident",
  // ... more words would be here
];

const SeedLab = ({ onComplete }) => {
  const [seedPhrase, setSeedPhrase] = useState([]);
  const [revealedWords, setRevealedWords] = useState(new Set());
  const [showAllWords, setShowAllWords] = useState(false);
  const [shuffledWords, setShuffledWords] = useState([]);
  const [selectedWords, setSelectedWords] = useState([]);
  const [stage, setStage] = useState('generate'); // generate, reveal, verify

  const generateSeedPhrase = () => {
    // In production, use actual BIP39 library
    const words = Array(12).fill(null).map(() => 
      mockWordlist[Math.floor(Math.random() * mockWordlist.length)]
    );
    setSeedPhrase(words);
    setRevealedWords(new Set());
    setShowAllWords(false);
    setStage('reveal');
  };

  const revealWord = (index) => {
    setRevealedWords(prev => new Set([...prev, index]));
  };

  const toggleShowAll = () => {
    setShowAllWords(!showAllWords);
    if (!showAllWords) {
      setRevealedWords(new Set(Array(12).fill(null).map((_, i) => i)));
    }
  };

  const startVerification = () => {
    setShuffledWords([...seedPhrase].sort(() => Math.random() - 0.5));
    setSelectedWords([]);
    setStage('verify');
  };

  const handleWordSelect = (word) => {
    if (selectedWords.includes(word)) {
      setSelectedWords(prev => prev.filter(w => w !== word));
    } else if (selectedWords.length < 12) {
      setSelectedWords(prev => [...prev, word]);
    }
  };

  const checkVerification = () => {
    const isCorrect = selectedWords.every((word, i) => word === seedPhrase[i]);
    if (isCorrect) {
      onComplete();
    } else {
      setSelectedWords([]);
      // Show error feedback
    }
  };

  return (
    <div className="seed-lab-container">
      {stage === 'generate' && (
        <div className="generate-section">
          <h3>Create Your Seed Phrase</h3>
          <p>This 12-word phrase is the master key to your Bitcoin wallet. Never share it with anyone!</p>
          <button className="generate-button" onClick={generateSeedPhrase}>
            <Shuffle size={16} />
            Generate Seed Phrase
          </button>
        </div>
      )}

      {stage === 'reveal' && (
        <div className="reveal-section">
          <div className="seed-grid">
            {seedPhrase.map((word, index) => (
              <div 
                key={index} 
                className={`seed-word ${revealedWords.has(index) || showAllWords ? 'revealed' : ''}`}
                onClick={() => revealWord(index)}
              >
                <span className="word-number">{index + 1}</span>
                {revealedWords.has(index) || showAllWords ? word : '•••••'}
              </div>
            ))}
          </div>
          
          <div className="reveal-controls">
            <button className="toggle-reveal" onClick={toggleShowAll}>
              {showAllWords ? <EyeOff size={16} /> : <Eye size={16} />}
              {showAllWords ? 'Hide All Words' : 'Show All Words'}
            </button>
            
            {(revealedWords.size === 12 || showAllWords) && (
              <button className="verify-button" onClick={startVerification}>
                <CheckCircle size={16} />
                I've Written It Down
              </button>
            )}
          </div>
        </div>
      )}

      {stage === 'verify' && (
        <div className="verify-section">
          <h3>Verify Your Seed Phrase</h3>
          <p>Select the words in the correct order:</p>
          
          <div className="selected-words">
            {Array(12).fill(null).map((_, i) => (
              <div key={i} className="selected-word-slot">
                {selectedWords[i] || `Word ${i + 1}`}
              </div>
            ))}
          </div>

          <div className="word-pool">
            {shuffledWords.map((word, i) => (
              <button
                key={i}
                className={`pool-word ${selectedWords.includes(word) ? 'selected' : ''}`}
                onClick={() => handleWordSelect(word)}
                disabled={selectedWords.includes(word)}
              >
                {word}
              </button>
            ))}
          </div>

          <button 
            className="verify-complete"
            onClick={checkVerification}
            disabled={selectedWords.length !== 12}
          >
            Verify Seed Phrase
          </button>
        </div>
      )}
    </div>
  );
};

export default SeedLab; 