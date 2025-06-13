import React from 'react';

export function CategorySelector({ value, handleCategoryClick, isSelected }) {
  const categoryStyles = {
    readEmails: { backgroundColor: 'orange' },
    sendEmails: { backgroundColor: 'yellow' },
    webParsing: { backgroundColor: 'blue' },
    default: { backgroundColor: 'white' }
  };



  return (
      <button
         type="button" 
         style={ isSelected ? categoryStyles[value]:value.default }
    onClick={() => handleCategoryClick(value)} 
    value={value} 
    name="category" 
    className={`tag ${isSelected ? 'selected-tag' : ''}`}>{value}</button>
  );
}
