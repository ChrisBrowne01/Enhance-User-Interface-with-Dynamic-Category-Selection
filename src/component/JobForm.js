// ./src/component/JobForm.js
import React, { useState } from 'react';
import { FilterForm } from './FilterForm';
import './AppForm.css';
import './FormButton.css'; // For the tag buttons (including .tag and .selected-tag)
import { CategorySelector } from './CategorySelector'; // Import the new component

export const JobForm = ({ addNewJob, newJob, setNewJob, search, setSearch, error, setError }) => {
  const [successMessage, setSuccessMessage] = useState('');

  const statuses = ['To Start', 'In Progress', 'Completed'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewJob(prevJob => ({ ...prevJob, [name]: value }));

    if (name === 'title' && value.trim().length >= 3) {
      setError(prevError => (prevError === 'Job title is required.' || prevError === 'Job title must be at least 3 characters long.') ? '' : prevError);
    } else if (name === 'status' && value !== '') {
      setError(prevError => prevError === 'Please select a status.' ? '' : prevError);
    }
  };

  // New handler to receive the selected category from CategorySelector
  const handleCategorySelection = (selectedCat) => {
    setNewJob(prevJob => ({ ...prevJob, category: selectedCat }));
    setError(prevError => prevError === 'Please select a category.' ? '' : prevError);
  };

  // Add a "Clear Categories" button
  const handleClearCategories = () => {
    setNewJob(prevJob => ({ ...prevJob, category: null }));
    setError(""); 
  };

  // Handler to rest the form data
  const resetForm = () => {
    setNewJob({
      title: '',
      category: null, // Reset category to null for single selection
      status: 'To Start'
    });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!newJob.title.trim()) {
      setError('Job title is required.');
      return;
    }
    if (newJob.title.trim().length < 3) {
      setError('Job title must be at least 3 characters long.');
      return;
    }
    // Check if newJob.category is null or empty string for single selection
    if (!newJob.category) { // Check if null or undefined
      setError('Please select a category.');
      return;
    }
    if (!newJob.status || newJob.status === '') {
      setError('Please select a status.');
      return;
    }

    console.log('Job Details Submitted:', newJob);

    addNewJob(newJob);

    setSuccessMessage('Job successfully added!');
    console.log('successMessage: ', successMessage);
    resetForm();

    setTimeout(() => {
      setSuccessMessage('');
    }, 5000);
  };

  return (
    <div className="form-header">
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="title"
            value={newJob.title}
            onChange={handleInputChange}
            className={`bot-input ${error && (newJob.title.trim().length < 3 || !newJob.title.trim()) ? 'input-error' : ''}`}
            placeholder="Enter the job"
            aria-describedby="title-error-message"
          />
          {error && (error === 'Job title is required.' || error === 'Job title must be at least 3 characters long.') && (
            <p id="title-error-message" className="error-message">{error}</p>
          )}
        </div>

        {/* Use the new CategorySelector component */}
        <div className="form-details">
          <div className="bottom-line">
            <CategorySelector
              onCategorySelect={handleCategorySelection} 
              initialCategory={newJob.category} // Pass current category for initial selection/reset
            />
          </div>
          {error === 'Please select a category.' && (
            <p className="error-message">{error}</p>
          )}

          {/* Display the list of selected categories */}
          {newJob.category > 0 && (
            <div className="selected-categories-display">
              <strong>Selected:</strong> {newJob.category.join(', ')}
            </div>
          )}

          {/* Clear Categories Button */}
          {newJob.category && (
            <button
              type="button" // Important: type="button" to prevent form submission
              onClick={handleClearCategories}
              className="clear-categories-button"
            >
              Clear Categories
            </button>
          )}
        </div>

        <div>
          <select
            className={`job-status ${error === 'Please select a status.' ? 'input-error' : ''}`}
            name="status"
            value={newJob.status}
            onChange={handleInputChange}
          >
            <option value="">Select status...</option>
            {statuses.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
          {error === 'Please select a status.' && (
            <p className="error-message">{error}</p>
          )}
        </div>

        <button type="submit" className="submit-data">
          Add Jobs
        </button>

      </form>

      {successMessage && (<div className="valid-tooltip">{successMessage}</div>)}

      <FilterForm
        search={search}
        setSearch={setSearch}
      />
    </div>
  );
};