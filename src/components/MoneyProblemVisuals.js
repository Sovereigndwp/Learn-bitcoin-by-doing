import React from 'react';
import './MoneyProblemVisuals.css';

const MoneyProblemVisuals = () => {
  return (
    <div className="money-problems-grid">
      {/* Trade Problem */}
      <div className="problem-panels">
        <div className="panel">
          <h3 className="panel-title problem-title">Problem 1: Trade Stops</h3>
          <div className="panel-content">
            {/* Baker and Cobbler */}
            <div className="character">
              <svg className="w-24 h-24" viewBox="0 0 100 100">
                <circle cx="50" cy="20" r="10" fill="none" stroke="#000" strokeWidth="2"/>
                <line x1="50" y1="30" x2="50" y2="60" stroke="#000" strokeWidth="2"/>
                <line x1="50" y1="40" x2="30" y2="50" stroke="#000" strokeWidth="2"/>
                <line x1="50" y1="40" x2="70" y2="35" stroke="#000" strokeWidth="2"/>
                <line x1="50" y1="60" x2="40" y2="80" stroke="#000" strokeWidth="2"/>
                <line x1="50" y1="60" x2="60" y2="80" stroke="#000" strokeWidth="2"/>
                <circle cx="45" cy="17" r="2" fill="#000"/>
                <circle cx="55" cy="17" r="2" fill="#000"/>
                <path d="M45 25 Q50 28 55 25" stroke="#000" strokeWidth="1" fill="none"/>
                <path d="M40,10 L60,10 L60,15 Q50,20 40,15 Z" fill="none" stroke="#000" strokeWidth="1.5"/>
                <path d="M70,35 Q80,30 85,40 Q80,50 70,45 Z" fill="#D4A76A" stroke="#8B5A2B" strokeWidth="1.5"/>
              </svg>
              <p className="font-bold mt-1">Baker</p>
            </div>

            {/* No Trade Symbol */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <svg className="w-16 h-16" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="#FFEEEE" stroke="#FF0000" strokeWidth="5"/>
                <line x1="25" y1="25" x2="75" y2="75" stroke="#FF0000" strokeWidth="8"/>
                <line x1="75" y1="25" x2="25" y2="75" stroke="#FF0000" strokeWidth="8"/>
              </svg>
            </div>

            {/* Cobbler */}
            <div className="character">
              <svg className="w-24 h-24" viewBox="0 0 100 100">
                <circle cx="50" cy="20" r="10" fill="none" stroke="#000" strokeWidth="2"/>
                <line x1="50" y1="30" x2="50" y2="60" stroke="#000" strokeWidth="2"/>
                <line x1="50" y1="40" x2="30" y2="35" stroke="#000" strokeWidth="2"/>
                <line x1="50" y1="40" x2="70" y2="50" stroke="#000" strokeWidth="2"/>
                <line x1="50" y1="60" x2="40" y2="80" stroke="#000" strokeWidth="2"/>
                <line x1="50" y1="60" x2="60" y2="80" stroke="#000" strokeWidth="2"/>
                <circle cx="45" cy="17" r="2" fill="#000"/>
                <circle cx="55" cy="17" r="2" fill="#000"/>
                <path d="M45 25 Q50 28 55 25" stroke="#000" strokeWidth="1" fill="none"/>
                <path d="M30,35 Q25,40 30,45 Q40,50 45,40 Q40,35 30,35 Z" fill="#8B4513" stroke="#5D2906" strokeWidth="1.5"/>
              </svg>
              <p className="font-bold mt-1">Cobbler</p>
            </div>
          </div>
        </div>
      </div>

      {/* Storage Problem */}
      <div className="problem-panels">
        <div className="panel">
          <h3 className="panel-title problem-title">Problem 2: Can't Save</h3>
          <div className="panel-content">
            {/* Farmer */}
            <div className="character">
              <svg className="w-24 h-24" viewBox="0 0 100 100">
                <circle cx="50" cy="20" r="10" fill="none" stroke="#000" strokeWidth="2"/>
                <line x1="50" y1="30" x2="50" y2="60" stroke="#000" strokeWidth="2"/>
                <line x1="50" y1="40" x2="30" y2="50" stroke="#000" strokeWidth="2"/>
                <line x1="50" y1="40" x2="70" y2="35" stroke="#000" strokeWidth="2"/>
                <line x1="50" y1="60" x2="40" y2="80" stroke="#000" strokeWidth="2"/>
                <line x1="50" y1="60" x2="60" y2="80" stroke="#000" strokeWidth="2"/>
                <circle cx="45" cy="17" r="2" fill="#000"/>
                <circle cx="55" cy="17" r="2" fill="#000"/>
                <path d="M45 25 Q50 28 55 25" stroke="#000" strokeWidth="1" fill="none"/>
                <path d="M40,10 L60,10 L60,5 L40,5 Z" fill="none" stroke="#000" strokeWidth="1.5"/>
              </svg>
              <p className="font-bold mt-1">Farmer</p>
            </div>

            {/* Rotting Food */}
            <div className="relative">
              <svg className="w-32 h-32" viewBox="0 0 100 100">
                <path d="M30,30 Q50,10 70,30 Q90,50 70,70 Q50,90 30,70 Q10,50 30,30" fill="#A3A3A3"/>
                <ellipse cx="50" cy="50" rx="20" ry="15" fill="#6B7280"/>
                
                {/* Flies */}
                <g className="fly">
                  <circle cx="30" cy="30" r="3" fill="#000000"/>
                  <path d="M25,30 Q30,25 35,30" fill="none" stroke="#000000" strokeWidth="1"/>
                  <path d="M25,30 Q30,35 35,30" fill="none" stroke="#000000" strokeWidth="1"/>
                </g>
                
                {/* Mold */}
                <circle cx="40" cy="60" r="5" fill="#4ADE80" opacity="0.7"/>
                <circle cx="60" cy="55" r="4" fill="#4ADE80" opacity="0.7"/>
                <circle cx="50" cy="70" r="6" fill="#4ADE80" opacity="0.7"/>
              </svg>
              <p className="font-bold text-gray-700">Rotting Food</p>
            </div>

            {/* Calendar */}
            <div className="absolute top-4 right-4">
              <svg className="w-16 h-16" viewBox="0 0 100 100">
                <rect x="10" y="10" width="80" height="80" rx="5" fill="#FFFFFF" stroke="#000000" strokeWidth="3"/>
                <rect x="10" y="10" width="80" height="20" rx="5" fill="#FF0000"/>
                <line x1="30" y1="10" x2="30" y2="30" stroke="#FFFFFF" strokeWidth="2"/>
                <line x1="50" y1="10" x2="50" y2="30" stroke="#FFFFFF" strokeWidth="2"/>
                <line x1="70" y1="10" x2="70" y2="30" stroke="#FFFFFF" strokeWidth="2"/>
                <text x="50" y="65" textAnchor="middle" fontSize="30" fill="#000000">30</text>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Measurement Problem */}
      <div className="problem-panels">
        <div className="panel">
          <h3 className="panel-title problem-title">Problem 3: Can't Measure Value</h3>
          <div className="panel-content">
            {/* Chicken Owner */}
            <div className="character">
              <svg className="w-24 h-24" viewBox="0 0 100 100">
                <circle cx="50" cy="20" r="10" fill="none" stroke="#000" strokeWidth="2"/>
                <line x1="50" y1="30" x2="50" y2="60" stroke="#000" strokeWidth="2"/>
                <line x1="50" y1="40" x2="30" y2="50" stroke="#000" strokeWidth="2"/>
                <line x1="50" y1="40" x2="70" y2="35" stroke="#000" strokeWidth="2"/>
                <line x1="50" y1="60" x2="40" y2="80" stroke="#000" strokeWidth="2"/>
                <line x1="50" y1="60" x2="60" y2="80" stroke="#000" strokeWidth="2"/>
                <circle cx="45" cy="17" r="2" fill="#000"/>
                <circle cx="55" cy="17" r="2" fill="#000"/>
                <path d="M45 25 Q50 28 55 25" stroke="#000" strokeWidth="1" fill="none"/>
                
                {/* Chicken */}
                <ellipse cx="30" cy="50" rx="10" ry="7" fill="#F59E0B"/>
                <circle cx="22" cy="45" r="5" fill="#F59E0B"/>
                <path d="M18,45 L16,40" stroke="#F59E0B" strokeWidth="2"/>
                <path d="M26,45 L28,40" stroke="#F59E0B" strokeWidth="2"/>
                <circle cx="20" cy="43" r="1" fill="#000"/>
                <circle cx="24" cy="43" r="1" fill="#000"/>
                <path d="M20,47 L24,47" stroke="#FF0000" strokeWidth="1"/>
              </svg>
              <p className="font-bold mt-1">Chicken Owner</p>
            </div>

            {/* Question Mark */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <svg className="w-16 h-16 question-mark" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="3"/>
                <text x="50" y="70" textAnchor="middle" fontSize="60" fill="#F59E0B">?</text>
              </svg>
            </div>

            {/* Apple Owner */}
            <div className="character">
              <svg className="w-24 h-24" viewBox="0 0 100 100">
                <circle cx="50" cy="20" r="10" fill="none" stroke="#000" strokeWidth="2"/>
                <line x1="50" y1="30" x2="50" y2="60" stroke="#000" strokeWidth="2"/>
                <line x1="50" y1="40" x2="30" y2="35" stroke="#000" strokeWidth="2"/>
                <line x1="50" y1="40" x2="70" y2="50" stroke="#000" strokeWidth="2"/>
                <line x1="50" y1="60" x2="40" y2="80" stroke="#000" strokeWidth="2"/>
                <line x1="50" y1="60" x2="60" y2="80" stroke="#000" strokeWidth="2"/>
                <circle cx="45" cy="17" r="2" fill="#000"/>
                <circle cx="55" cy="17" r="2" fill="#000"/>
                <path d="M45 25 Q50 28 55 25" stroke="#000" strokeWidth="1" fill="none"/>
                
                {/* Apples */}
                <circle cx="70" cy="50" r="6" fill="#F87171"/>
                <path d="M70,44 L70,40" stroke="#15803D" strokeWidth="1"/>
                <path d="M70,40 L73,42" stroke="#15803D" strokeWidth="1"/>
              </svg>
              <p className="font-bold mt-1">Apple Owner</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoneyProblemVisuals; 