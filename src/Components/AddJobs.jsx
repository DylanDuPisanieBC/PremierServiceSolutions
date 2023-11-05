import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import './CSS/AddJobs.css';
import axios from 'axios';

const AddJobs = ({ setView }) => {
  const [status, setStatus] = useState('');
  const [employee_id, setEmployeeID] = useState('');
  const [call_id, setCallID] = useState('');
  const [priority, setPriority] = useState('');
  const [required_skills, setRequiredSkills] = useState('');
  const [hoc_notes, setHocNotes] = useState('');
  const [commnets, setComments] = useState('');

  const handleFormSubmit = (event) => {
    event.preventDefault();

    // Here, you can handle the form submission and send the job details to your server or perform any other necessary action.
  };

  return (
    <div>
      <span className='icon' onClick={() => setView('jobs')}>➜</span>
      <div className="add-client-container">
        <h2 className="add-client-header">Add Job</h2>
          <div className="form-group">
            <label htmlFor="status">Status:</label>
            <select 
              id='status' 
              value={status}
              onChange={(e) => setStatus(e.target.value)
              }>
              <option value="Assigned">Assigned</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </select>                      
          </div>
          <div className="form-group">
            <label htmlFor="emplopyee_id">Employee ID:</label>
            <input 
              id='emplopyee_id'
              value={employee_id}
              onChange={(e) => setEmployeeID(e.target.value)}
              />     
          </div>
          <div className="form-group">
            <label htmlFor="call_id">Call ID:</label>
            <input 
              id='call_id'
              value={call_id}
              onChange={(e) => setCallID(e.target.value)}
              />     
          </div>
          <div className="form-group">
            <label htmlFor="priority">Priority:</label>
            <input 
              id='priority'
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              />     
          </div>
          <div className="form-group">
            <label htmlFor="skills">Required Skills:</label>
            <select 
              id='skills' 
              value={required_skills}
              onChange={(e) => setRequiredSkills(e.target.value)
              }>
              <option value="Technical Skills 1">Technical Skills 1</option>
              <option value="Technical Skills 1">Technical Skills 2</option>
              <option value="Technical Skills 1">Technical Skills 3</option>
              <option value="Technical Skills 1">Technical Skills 4</option>
              <option value="Technical Skills 1">Technical Skills 5</option>
            </select>                      
          </div>
          <div className="form-group">
            <label htmlFor="hoc_notes">Hoc Notes:</label>
            <textarea
              id="hoc_notes"
              value={hoc_notes}
              onChange={(e) => setHocNotes(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="comments">Comments:</label>
            <textarea
              id="comments"
              value={commnets}
              onChange={(e) => setComments(e.target.value)}
            />
          </div>
          <button className="submit" onClick={handleFormSubmit}>Add Job</button>
      </div>
    </div>
  );
};

export default AddJobs;
