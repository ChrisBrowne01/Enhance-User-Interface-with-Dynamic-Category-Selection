// ./src/component/CategorySelector.js
import React, { useState, useEffect } from 'react';
import { FormButton } from './FormButton';
import './FormButton.css'; 

export function CategorySelector({ onCategorySelect, initialCategory }) {
  // State variable to keep track of the selected category
  const [selectedCategory, setSelectedCategory] = useState(initialCategory || null);

  // Defines different background colors
  const categoryStyles = {
    'Read Emails': { backgroundColor: 'orange' }, 
    'Web Parsing': { backgroundColor: 'blue' },
    'Send Emails': { backgroundColor: 'yellow' },
    'default': { backgroundColor: 'var(--tag-bg-light)' } 
  };

  // Function to get the style based on selection
  const getCategoryStyle = (categoryValue) => {
    return selectedCategory === categoryValue ? categoryStyles[categoryValue] : categoryStyles.default;
  };

  // OnClick handler for each button to update and ensure only one category selection at a time
  const handleCategoryClick = (categoryValue) => {
    setSelectedCategory(categoryValue);
    if (onCategorySelect) onCategorySelect(categoryValue);
  };

  // Synchronize internal state with external prop (initialCategory)
  useEffect(() => {
    setSelectedCategory(initialCategory);
  }, [initialCategory]);

  // Define the categories to render
  const categories = [
    { value: 'Read Emails', label: 'Read Emails' },
    { value: 'Web Parsing', label: 'Web Parsing' },
    { value: 'Send Emails', label: 'Send Emails' },
  ];

  return (
    <div className="category-selector-group"> 
      {/* Render buttons for each category and apply styles */}
      {categories.map((cat) => (
        <FormButton
          key={cat.value}
          value={cat.value}
          onClick={() => handleCategoryClick(cat.value)}
          className={`tag ${selectedCategory === cat.value ? 'selected-tag' : ''}`}
          style={getCategoryStyle(cat.value)}
        />
      ))}
    </div>
  );
}