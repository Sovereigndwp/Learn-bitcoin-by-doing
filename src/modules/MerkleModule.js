import React, { useState } from 'react';
import { GitBranch, Hash, Search, CheckCircle, Tree } from 'lucide-react';
import '../components/ModuleCommon.css';

const MerkleModule = () => {
  const [activeSection, setActiveSection] = useState('intro');
  const [showVerification, setShowVerification] = useState(false);

  const sections = {
    intro: {
      title: "The Family Tree of Transactions",
      icon: <Tree size={24} />,
      content: `Imagine organizing your family photos into a special tree where each branch 
                helps you quickly find any photo. That's similar to how Bitcoin organizes 
                transactions in a Merkle tree!`
    },
    structure: {
      title: "Building the Tree",
      icon: <GitBranch size={24} />,
      content: `Just like a real tree grows from leaves to branches to a single trunk, 
                a Merkle tree combines transaction hashes until it reaches one root hash.`
    },
    hashing: {
      title: "The Magic of Hashing",
      icon: <Hash size={24} />,
      content: `Each pair of transactions gets combined and hashed together, like mixing 
                two colors to create a new one. This process continues until we have just 
                one color (the Merkle root).`
    },
    verification: {
      title: "Finding Your Transaction",
      icon: <Search size={24} />,
      content: `With a Merkle tree, you can prove a transaction exists by checking just a 
                few branches instead of the whole tree - like finding a photo by following 
                specific branches rather than checking every photo!`
    }
  };

  const merkleExample = {
    transactions: [
      "Alice sends 1 BTC to Bob",
      "Charlie sends 0.5 BTC to David",
      "Eve sends 2 BTC to Frank",
      "Grace sends 0.3 BTC to Henry"
    ],
    levels: [
      {
        name: "Transactions",
        nodes: ["TX1", "TX2", "TX3", "TX4"]
      },
      {
        name: "Hash Pairs",
        nodes: ["Hash(TX1+TX2)", "Hash(TX3+TX4)"]
      },
      {
        name: "Merkle Root",
        nodes: ["Root Hash"]
      }
    ]
  };

  const handleVerification = () => {
    setShowVerification(true);
    // Simulate verification process
    setTimeout(() => {
      setShowVerification(false);
    }, 3000);
  };

  return (
    <div className="module-container">
      <div className="module-header">
        <h1 className="module-title">
          <GitBranch className="module-icon" />
          Merkle Trees: Nature's Way of Organizing Data
        </h1>
      </div>
      
      <div className="step-content-container">
        <div className="intro-step">
          <div className="step-icon">
            <GitBranch size={48} />
          </div>
          <h2>Welcome to the Merkle Forest! 🌳</h2>
          <p className="intro-text">
            Discover how Bitcoin uses tree-like structures to efficiently organize and 
            verify thousands of transactions. It's like having a magical filing system 
            that can instantly prove if a document exists!
          </p>
        </div>

        <div className="merkle-navigation">
          {Object.entries(sections).map(([key, section]) => (
            <div
              key={key}
              className={`nav-item ${activeSection === key ? 'active' : ''}`}
              onClick={() => setActiveSection(key)}
            >
              {section.icon}
              <span>{section.title}</span>
            </div>
          ))}
        </div>

        <div className="merkle-content">
          <div className="section-header">
            {sections[activeSection].icon}
            <h3>{sections[activeSection].title}</h3>
          </div>
          <p className="section-description">
            {sections[activeSection].content}
          </p>

          <div className="merkle-visualization">
            <div className="tree-container">
              {merkleExample.levels.map((level, levelIndex) => (
                <div key={levelIndex} className="tree-level">
                  <div className="level-label">{level.name}</div>
                  <div className="level-nodes">
                    {level.nodes.map((node, nodeIndex) => (
                      <div key={nodeIndex} className="tree-node">
                        {node}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {activeSection === 'verification' && (
              <div className="verification-demo">
                <h4>Try It Yourself!</h4>
                <p>Verify if a transaction is included in the Merkle tree:</p>
                <select className="transaction-select">
                  {merkleExample.transactions.map((tx, index) => (
                    <option key={index} value={index}>
                      {tx}
                    </option>
                  ))}
                </select>
                <button 
                  className="verify-button"
                  onClick={handleVerification}
                  disabled={showVerification}
                >
                  {showVerification ? (
                    <>
                      <span className="spinner"></span>
                      Verifying...
                    </>
                  ) : (
                    <>
                      <CheckCircle size={16} />
                      Verify Transaction
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="learning-tips">
          <h3>🌟 Key Takeaways</h3>
          <ul>
            <li>Merkle trees make it efficient to verify transactions</li>
            <li>Each level combines and hashes pairs of items</li>
            <li>The Merkle root is a single hash representing all transactions</li>
            <li>You only need a few hashes to verify a transaction</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MerkleModule; 