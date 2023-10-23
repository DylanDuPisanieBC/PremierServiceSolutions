import React, { useState } from 'react';
import Sidebar from './Sidebar';
import './AddJobs.css';

const AddJobs = ({ sidebarOpen }) => {
  const [notes, setNotes] = useState('');
  const [skill, setSkill] = useState('');
  const [priority, setPriority] = useState(1);

  const handleFormSubmit = (event) => {
    event.preventDefault();

    // Here, you can handle the form submission and send the job details to your server or perform any other necessary action.
  };

  return (
    <div className="add-jobs-container">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={() => {}} />
      <h2 className="add-jobs-header">Add Job</h2>
      <form className={sidebarOpen ? 'content-open' : 'content-closed'} onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label>Notes:</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Skill:</label>
          <select
            value={skill}
            onChange={(e) => setSkill(e.target.value)}
          >
            <option value="">--Select Skill--</option>
            <option value="Network">Network</option>
            <option value="Electrician">Electrician</option>
            <option value="Technician">Technician</option>
          </select>
        </div>
        <div className="form-group">
          <label>Priority Level:</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>
        <button className="submit" type="submit">Add Job</button>
      </form>
    </div>
  );
};

export default AddJobs;
