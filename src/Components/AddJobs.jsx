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

  const [calls, setCalls] = useState([]);
  const [employees, setEmployees] = useState([]);

  const handleFormSubmit = (event) => {
    event.preventDefault();

    // Here, you can handle the form submission and send the job details to your server or perform any other necessary action.
  };

  const getCalls = async () => {
    axios.get('http://localhost:8080/api/v1/calls').then((res) => {
        console.log(res);
        setCalls(res.data);  
      }).catch((err) => {
        console.log(err);
      });
  }

  const getEmployees = async () => {
    axios.get('http://localhost:8080/api/v1/employees').then((res) => {
        console.log(res);
        setEmployees(res.data);     
      }).catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getCalls();
    getEmployees();
  }, []);

  var callDetails = "";
  callDetails = calls.map( (item) => {
    return (
      <option key={item.call_id} value={item.call_id}>Call ID: {item.call_id} - Client ID: {item.client_id}</option>
    )
});

var employeeDetails = "";
employeeDetails = employees.map( (item) => {
  return (
    <option key={item.employee_id} value={item.employee_id}>{item.full_name} - {item.skills}</option>
  )
});

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
            <label htmlFor="emplopyee_id">Employee:</label>
            <select 
              id='emplopyee_id' 
              value={employee_id}
              onChange={(e) => setEmployeeID(e.target.value)
              }>
              <option value="">---Select Employee---</option>
              {employeeDetails}
            </select>    
          </div>
          <div className="form-group">
            <label htmlFor="call_id">Call:</label>
            <select 
              id='call_id' 
              value={call_id}
              onChange={(e) => setCallID(e.target.value)
              }>
              <option value="">---Select Call---</option>
              {callDetails}
            </select>    
          </div>
          <div className="form-group">
            <label htmlFor="priority">Priority:</label>
            <select 
              id='status' 
              value={status}
              onChange={(e) => setStatus(e.target.value)
              }>
              <option value="L">Low</option>
              <option value="N">Normal</option>
              <option value="H">High</option>
            </select>    
          </div>
          <div className="form-group">
            <label htmlFor="skills">Required Skills:</label>
            <select 
              id='skills' 
              value={required_skills}
              onChange={(e) => setRequiredSkills(e.target.value)
              }>
              <option value="Technical Skills 1">Technical Skills 1</option>
              <option value="Technical Skills 2">Technical Skills 2</option>
              <option value="Technical Skills 3">Technical Skills 3</option>
              <option value="Technical Skills 4">Technical Skills 4</option>
              <option value="Technical Skills 5">Technical Skills 5</option>
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
