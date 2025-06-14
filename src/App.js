// ./src/App.js
import React, { useState, useEffect } from "react";
import { DragDropContext } from '@hello-pangea/dnd';
import { Header } from "./component/Header";
import { Footer } from './component/Footer';
import { JobForm } from "./component/JobForm";
import { JobColumn } from "./component/JobColumn";
import toDoIcon from './images/to-do-icon.jpg';
import inProgressIcon from './images/in-progress-icon.png';
import doneIcon from './images/done-icon.png';
import './App.css';

// Initialize job list objects from localStorage or default values
const prevJobs = localStorage.getItem('jobs');

function App() {
  const initialJobState = prevJobs ? JSON.parse(prevJobs) : [];
  const [jobs, setJobs] = useState(initialJobState);

  // Persist jobs to localStorage whenever 'jobs' state changes
  useEffect(() => {
    localStorage.setItem('jobs', JSON.stringify(jobs));
  }, [jobs]);

  // State for search filter
  const [search, setSearch] = useState("");
  
  // State for new job form inputs
  const [newJob, setNewJob] = useState({ 
    title: '', 
    category: null, // Set category to null for single selection
    status: 'To Start' 
  }); 

  // States for edit functionality
  const [editingJob, setEditingJob] = useState(null);
  const [editForm, setEditForm] = useState({ 
    id: '', 
    title: '', 
    status: '', 
    category: null // Set category to null for single selection
  });
  // State for form-wide error messages (passed to JobForm)
  const [error, setError] = useState("");

  // Initialize dark mode state based on localStorage or default to false
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode === 'true';
  });

  // Effect to apply/remove dark mode class to body and save preference in localStorage
  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  // Function to toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  // OnClick handler to delete job based on ID
  const onDeleteJob = (id) => {
    setJobs(jobs.filter((job) => job.id !== id));
    // If the deleted job was being edited, clear the editing state
    if (editingJob === id) {
      setEditingJob(null);
      setEditForm({ id: '', title: '', status: '', category: null }); 
    }
  };

  // OnClick handler to upadate job staus based on condition and job ID (JobStatus component's "Start/In Progress/Complete" button)
  const updateJobStatus = (id) => {
    setJobs(
      jobs.map(job =>
        job.id === id ?
          { ...job, status: (job.status === "To Start") ? "In Progress" : job.status === "In Progress" ? "Completed" : "To Start" }
          : job
      )
    );
  };

  // Add new job listing (called by JobForm)
  const addNewJob = (jobDetails) => {
    // Basic validation is now handled in JobForm, but a final check here is good
    if (!jobDetails.title.trim() || jobDetails.title.trim().length < 3 || !jobDetails.category || !jobDetails.status) {
      setError("Please fill all fields correctly.");
      return;
    }

    // Since category is a single string now, we simplified check
    if (!jobDetails.category) {
      setError("Please select a job category.");
      return;
    }
    if (!jobDetails.status || jobDetails.status === 'Select status...') {
      setError("Please select a job status.");
      return;
    }

    // Generate unique ID
    const maxId = jobs.length > 0 ? Math.max(...jobs.map(job => job.id)) : 0;
    const newId = maxId + 1;

    const newJobListing = {
      id: newId,
      title: jobDetails.title.trim(),
      status: jobDetails.status.trim(),
      category: jobDetails.category // category is a string
    };

    setJobs(prevJobs => [...prevJobs, newJobListing]);
    setNewJob({ title: '', category: null, status: 'To Start' }); // Reset to null for single category 
    setError("");

    console.log("Submitting Job:", newJobListing);
    console.log("All Jobs:", [...jobs, newJobListing]);
  };

  // Edit Functions
  // OnClick handler to start editing a job
  const onEditJob = (jobId) => {
    const jobToEdit = jobs.find(job => job.id === jobId);
    if (jobToEdit) {
      setEditingJob(jobId);
      // Ensure category is not an array for editForm if it's a single select
      setEditForm({ ...jobToEdit, category: jobToEdit.category || null }); // Ensure single value
      setError("");
    }
  };

  // Handle changes in the edit form
  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prevEditForm => ({ ...prevEditForm, [name]: value }));
    setError("");
  };

  // Save changes from the edit form
  const saveEdit = (e) => {
    e.preventDefault();
    if (!editForm.title.trim()) {
      setError("Job Title cannot be empty.");
      return;
    }
    if (editForm.title.trim().length < 3) {
      setError("Job Title must be at least 3 characters.");
      return;
    }
    // Validation for single-select category in edit form 
    if (!editForm.category) { // Check if null or undefined
      setError("Please select a category for the edited job.");
      return;
    }
    if (!editForm.status || editForm.status === '') {
      setError("Please select a status for the edited job.");
      return;
    }

    setJobs(jobs.map(job =>
      job.id === editingJob ? { ...editForm } : job
    ));
    setEditingJob(null);
    setEditForm({ id: '', title: '', status: '', category: null }); // Reset to null
    setError("");
  };

  const cancelEdit = () => {
    setEditingJob(null);
    setEditForm({ id: '', title: '', status: '', category: null }); // Reset to null
    setError("");
  };

  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;

    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }

    const draggedJob = jobs.find(job => job.id === parseInt(draggableId));
    if (!draggedJob) {
      return;
    }

    const newJobs = jobs.map(job => {
      if (job.id === draggedJob.id) {
        return { ...job, status: destination.droppableId };
      }
      return job;
    });

    setJobs(newJobs);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <button className="dark-mode-toggle" onClick={toggleDarkMode}>
          {darkMode ? 'Light Mode ☀️' : 'Dark Mode 🌙'}
        </button>

        <Header />
        {/* Render JobForm directly in App.js and pass relevant props */}
        <JobForm
          addNewJob={addNewJob}
          newJob={newJob} setNewJob={setNewJob}
          search={search} setSearch={setSearch}
          error={error} setError={setError}
        />
        <main className="job-columns">
          {/* Render JobColumn for each status */}
          <JobColumn
            image={toDoIcon}
            alt="To-do icon"
            title="To Start"
            status="To Start"
            jobs={jobs}
            search={search}
            updateJobStatus={updateJobStatus}
            onDeleteJob={onDeleteJob}
            onEditJob={onEditJob}
            droppableId="To Start" // Droppable ID matches status name
            editingJob={editingJob}
            editForm={editForm}
            handleEditFormChange={handleEditFormChange}
            saveEdit={saveEdit}
            cancelEdit={cancelEdit}
            formError={error}
          />

          <JobColumn
            title="In Progress"
            image={inProgressIcon}
            alt="In-progress icon"
            jobs={jobs}
            search={search}
            status="In Progress"
            updateJobStatus={updateJobStatus}
            onDeleteJob={onDeleteJob}
            onEditJob={onEditJob}
            droppableId="In Progress"
            editingJob={editingJob}
            editForm={editForm}
            handleEditFormChange={handleEditFormChange}
            saveEdit={saveEdit}
            cancelEdit={cancelEdit}
            formError={error}
          />

          <JobColumn
            title="Completed"
            image={doneIcon}
            alt="Done icon"
            jobs={jobs}
            search={search}
            status="Completed"
            updateJobStatus={updateJobStatus}
            onDeleteJob={onDeleteJob}
            onEditJob={onEditJob}
            droppableId="Completed"
            editingJob={editingJob}
            editForm={editForm}
            handleEditFormChange={handleEditFormChange}
            saveEdit={saveEdit}
            cancelEdit={cancelEdit}
            formError={error}
          />

        </main>
        <Footer />
      </div>
    </DragDropContext>
  );
}

export default App;