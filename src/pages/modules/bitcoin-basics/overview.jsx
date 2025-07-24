import React from 'react';
import { useParams } from 'react-router-dom';

export default function BitcoinBasicsOverview() {
  const { moduleId } = useParams();

  return (
    <div className="module-overview">
      <div className="module-hero">
        <div className="module-hero-content">
          <h1 className="module-title">Bitcoin Basics</h1>
          <p className="module-description">
            Understand what Bitcoin is, why it matters, and how it solves fundamental problems with traditional money systems.
          </p>
          <div className="module-objectives">
            <h3>What you'll learn:</h3>
            <ul>
              <li>Problems with traditional money systems</li>
              <li>How Bitcoin compares to other forms of money</li>
              <li>Basic principles of how Bitcoin works</li>
              <li>Why Bitcoin has value and what makes it scarce</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
