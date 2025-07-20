import React from 'react';
import { generateCardStyles } from '../../styles/globalStyles';

const Card = ({ title, className = '', children, theme = 'light', ...props }) => {
  const styles = generateCardStyles('default', theme);

  return (
    <div className={`card ${className}`} style={styles} {...props}>
      {title && <div className="card-header">
        <h3 className="card-title">{title}</h3>
      </div>}
      <div className="card-content">
        {children}
      </div>
    </div>
  );
};

export default Card;
