// ./src/component/JobStatus.js
import React from 'react';
import deleteIcon from '../images/delete.png';
import editIcon from '../images/edit.png';
import './JobStatus.css';
import './FormButton.css'; // For the tag styles

export const JobStatus = ({ job, updateJobStatus, onDeleteJob, onEditJob }) => {
  const statusClass = job.status.toLowerCase().replace(/\s/g, '-');

  // Define category styles to apply the correct background color
  const categoryStyles = {
    'Read Emails': { backgroundColor: 'orange' },
    'Web Parsing': { backgroundColor: 'blue' },
    'Send Emails': { backgroundColor: 'yellow' },
    'default': { backgroundColor: 'var(--tag-bg-light)' }
  };

  return (
    <div className={`ticket-item status-${statusClass}`}>
      <div className="card-body">
        <h5 className="card-title">
          {job.title}
        </h5>
        <div className="card-actions"> {/* Renamed from card-category for clarity */}
          <button onClick={() => updateJobStatus(job.id)} className="job-action-button" >
            {job.status === "To Start" ? "Start Job" :
             job.status === "In Progress" ? "Complete" :
             job.status === "Completed" ? "Re-open" :
             "Start Job"
            }
          </button>
          <div className="edit-button" onClick={() => onEditJob(job.id)}>
            <img src={editIcon} className='editImg' alt="Edit" />
          </div>
          <div className='jobDelete' onClick={() => onDeleteJob(job.id)}>
            <img src={deleteIcon} className='deletingImg' alt="Delete" />
          </div>
        </div>

        {/* Display the single category */}
        <div className="card-footer">
          {job.category && ( // Only render if a category is selected
            <button
              className="job-category-button tag"
              type="button"
              style={categoryStyles[job.category] || categoryStyles.default} // Apply style dynamically
            >
              {job.category}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};