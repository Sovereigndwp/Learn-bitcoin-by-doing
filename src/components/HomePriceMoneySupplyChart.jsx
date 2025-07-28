import React, { useState, useEffect } from 'react';
import { ContinueButton } from './EnhancedButtons';
import './HomePriceMoneySupplyChart.css';

const HomePriceMoneySupplyChart = ({ onContinue }) => {
  const [currentYear, setCurrentYear] = useState(0);
  const [showInsight, setShowInsight] = useState(false);

  const data = [
    { year: 2011, homePrice: 222900, moneySupply: 9.6 },
    { year: 2015, homePrice: 289200, moneySupply: 12.0 },
    { year: 2019, homePrice: 320000, moneySupply: 15.3 },
    { year: 2023, homePrice: 410800, moneySupply: 20.7 }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentYear(prev => {
        if (prev < data.length - 1) {
          return prev + 1;
        } else {
          setShowInsight(true);
          return prev;
        }
      });
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  const maxHomePrice = Math.max(...data.map(d => d.homePrice));
  const maxMoneySupply = Math.max(...data.map(d => d.moneySupply));

  const getHomeBarHeight = (price) => (price / maxHomePrice) * 300;
  const getMoneyBarHeight = (supply) => (supply / maxMoneySupply) * 300;

  return (
    <div className="chart-container">
      <div className="chart-header">
        <h2 className="chart-title">🏠 The Real Impact of Money Printing</h2>
        <p className="chart-subtitle">
          Watch what happened to home prices as the money supply increased...
        </p>
      </div>

      <div className="chart-content">
        <div className="chart-wrapper">
          <div className="chart-legend">
            <div className="legend-item">
              <div className="legend-color home-price"></div>
              <span>Median Home Price</span>
            </div>
            <div className="legend-item">
              <div className="legend-color money-supply"></div>
              <span>Money Supply (M2 in Trillions)</span>
            </div>
          </div>

          <div className="chart-graph">
            <div className="y-axis">
              <div className="y-label home-axis">$450k</div>
              <div className="y-label home-axis">$300k</div>
              <div className="y-label home-axis">$150k</div>
              <div className="y-label home-axis">$0</div>
            </div>

            <div className="chart-bars">
              {data.map((item, index) => (
                <div key={item.year} className="year-group">
                  <div className="bar-container">
                    <div 
                      className={`bar home-price-bar ${index <= currentYear ? 'animated' : ''}`}
                      style={{ 
                        height: index <= currentYear ? `${getHomeBarHeight(item.homePrice)}px` : '0px',
                        transitionDelay: index <= currentYear ? '0.5s' : '0s'
                      }}
                    >
                      {index <= currentYear && (
                        <div className="bar-value home-value">
                          ${(item.homePrice / 1000).toFixed(0)}k
                        </div>
                      )}
                    </div>
                    
                    <div 
                      className={`bar money-supply-bar ${index <= currentYear ? 'animated' : ''}`}
                      style={{ 
                        height: index <= currentYear ? `${getMoneyBarHeight(item.moneySupply)}px` : '0px',
                        transitionDelay: index <= currentYear ? '0.8s' : '0s'
                      }}
                    >
                      {index <= currentYear && (
                        <div className="bar-value money-value">
                          ${item.moneySupply}T
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="year-label">{item.year}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {showInsight && (
          <div className="chart-insight">
            <div className="insight-card">
              <h3>📈 Notice the Pattern?</h3>
              <div className="insight-stats">
                <div className="stat-item">
                  <span className="stat-label">Home Prices:</span>
                  <span className="stat-change">+84% increase</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Money Supply:</span>
                  <span className="stat-change">+116% increase</span>
                </div>
              </div>
              
              <div className="insight-explanation">
                <p><strong>Why does this happen?</strong></p>
                <p>When governments print more money, that money has to go somewhere. Much of it flows into assets like real estate, driving up prices faster than wages can keep up.</p>
                
                <p className="key-insight">
                  <strong>💡 Key Insight:</strong> This isn't just inflation - it's wealth transfer from people who hold cash to people who own assets.
                </p>
              </div>

              <div className="fiat-conclusion">
                <h4>🔗 Connecting Back to the Fiat Money Experiment</h4>
                <p>Remember Nixon's decision in 1971? This is the long-term consequence - when money can be printed without limits, it loses its ability to store value reliably.</p>
                
                <p><strong>The Store of Value function we learned about is broken.</strong></p>
              </div>

              <ContinueButton onClick={onContinue}>
                Continue to Digital Scarcity
              </ContinueButton>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePriceMoneySupplyChart;
