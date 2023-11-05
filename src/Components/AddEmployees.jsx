import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import './CSS/AddJobs.css';
import axios from 'axios';

const AddEmployees = ({ setView }) => {
  const [full_name, setFullName] = useState('');
  const [branch, setBranch] = useState('');
  const [phone_number, setPhoneNumber] = useState('');
  const [skills, setSkills] = useState('');
  const [type, setType] = useState('');
  const [email, setEmail] = useState('');

  const handleFormSubmit = (event) => {
    event.preventDefault();

    // Here, you can handle the form submission and send the job details to your server or perform any other necessary action.
  };

  return (
    <div>
      <span className='icon' onClick={() => setView('employees')}>➜</span>
      <div className="add-client-container">
        <h2 className="add-client-header">Add Employee</h2>
          <div className="form-group">
            <label htmlFor="full_name">Full Name:</label>
            <input 
              id='full_name'
              value={full_name}
              onChange={(e) => setFullName(e.target.value)}
              />     
          </div>
          <div className="form-group">
            <label htmlFor="branch">Branch:</label>
            <input 
              id='branch'
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              />     
          </div>
          <div className="form-group">
            <label htmlFor="phone_number">Phone Number:</label>
            <input 
              id='phone_number'
              value={phone_number}
              onChange={(e) => setPhoneNumber(e.target.value)}
              />     
          </div>
          <div className="form-group">
            <label htmlFor="skills">Skills:</label>
            <input 
              id='skills'
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              />     
          </div>
          <div className="form-group">
            <label htmlFor="type">Type:</label>
            <select 
              id='type' 
              value={type}
              onChange={(e) => setType(e.target.value)
              }>
              <option value="Receptionist">Receptionist</option>
              <option value="Manager">Manager</option>
              <option value="Technician">Technician</option>
            </select>                      
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input 
              id='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              />     
          </div>
          <button className="submit" onClick={handleFormSubmit}>Add Employee</button>
      </div>
    </div>
  );
};

export default AddEmployees;
