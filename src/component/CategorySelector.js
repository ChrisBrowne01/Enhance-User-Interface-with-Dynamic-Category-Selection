// ./src/component/CategorySelector.js
import React, { useState, useEffect } from 'react';
import { FormButton } from './FormButton'; // Re-using our generic button component
import './FormButton.css'; // Import button specific CSS

export function CategorySelector({ onCategorySelect, initialCategory }) {
  // Task 3: Create a state variable to keep track of the selected category.
  const [selectedCategory, setSelectedCategory] = useState(initialCategory || null);

  // Task 2: Create an object called categoryStyles that defines different background colors
  const categoryStyles = {
    'Read Emails': { backgroundColor: 'orange' }, // Keys match display values
    'Web Parsing': { backgroundColor: 'blue' },
    'Send Emails': { backgroundColor: 'yellow' },
    'default': { backgroundColor: 'var(--tag-bg-light)' } // Assuming --tag-bg-light is defined in your CSS
  };

  // Task 4 & 7 (part): Function to get the style based on selection
  const getCategoryStyle = (categoryValue) => {
    return selectedCategory === categoryValue ? categoryStyles[categoryValue] : categoryStyles.default;
  };

  // Task 6: Implement an onClick handler for each button that updates the selected category.
  // Task 8: Ensure that only one category can be selected at a time.
  const handleCategoryClick = (categoryValue) => {
    setSelectedCategory(categoryValue);
    // Communicate the selected category back to the parent (JobForm)
    if (onCategorySelect) {
      onCategorySelect(categoryValue);
    }
  };

  // Bonus 1: Add a "Reset" button that clears the selected category.
  const handleResetClick = () => {
    setSelectedCategory(null);
    if (onCategorySelect) {
      onCategorySelect(null); // Communicate reset to parent
    }
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
    <div className="category-selector-group"> {/* Added a wrapper div for styling */}
      {/* Task 5 & 7: Render buttons for each category and apply styles */}
      {categories.map((cat) => (
        <FormButton
          key={cat.value} // Unique key for list items
          value={cat.value}
          onClick={() => handleCategoryClick(cat.value)}
          style={getCategoryStyle(cat.value)} // Apply inline style
          className={`tag ${selectedCategory === cat.value ? 'selected-tag' : ''}`} // Add class for CSS transition
        />
      ))}

      {/* Bonus 1: Reset Button */}
      <button className="tag reset-button" onClick={handleResetClick}>
        Reset Categories
      </button>
    </div>
  );
}