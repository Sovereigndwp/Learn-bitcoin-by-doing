import React from 'react';

const Card = ({ title, className = '', children, ...props }) => {
  return (
    <div className={`card ${className}`} {...props}>
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
