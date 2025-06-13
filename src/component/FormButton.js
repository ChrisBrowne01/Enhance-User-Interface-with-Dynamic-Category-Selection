import React from 'react';
import './FormButton.css'; // Your button specific styles (ensure this exists and has .tag and .selected-tag)

export const FormButton = ({ value, handleCategoryClick, isSelected }) => {
  return (
    <button 
    type="button" 
    onClick={() => handleCategoryClick(value)} 
    value={value} 
    name="category" 
    className={`tag ${isSelected ? 'sel0ected-tag' : ''}`}>{value}</button>
  );
};