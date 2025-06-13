// ./src/component/FormButton.js
import React from 'react';
import './FormButton.css'; // Your button specific styles

// Removed isSelected and handleCategoryClick specific props
// Now takes a generic onClick, style, and className
export const FormButton = ({ value, onClick, style, className }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      value={value} // Pass value for consistency, though not strictly needed here for the button text
      className={className} // Apply any classes passed from parent
      style={style} // Apply any inline styles passed from parent
    >
      {value}
    </button>
  );
};