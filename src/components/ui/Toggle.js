import React from 'react';

const Toggle = ({ label, checked, onChange, className = '', ...props }) => {
  return (
    <div className={`toggle-wrapper ${className}`}>
      <label className="toggle-label">
        <input
          type="checkbox"
          role="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="toggle-input"
          {...props}
        />
        <span className="toggle-slider"></span>
        <span className="toggle-text">{label}</span>
      </label>
    </div>
  );
};

export default Toggle;
