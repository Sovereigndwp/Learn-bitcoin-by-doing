import React from 'react';

const QuizChoice = ({ text, isSelected, isCorrect, onSelect, disabled = false, className = '' }) => {
  const getStateClass = () => {
    if (isCorrect === true) return 'correct';
    if (isCorrect === false) return 'incorrect';
    if (isSelected) return 'selected';
    return '';
  };

  return (
    <button
      className={`quiz-choice ${getStateClass()} ${className}`}
      onClick={onSelect}
      disabled={disabled}
      type="button"
    >
      {text}
    </button>
  );
};

export default QuizChoice;
