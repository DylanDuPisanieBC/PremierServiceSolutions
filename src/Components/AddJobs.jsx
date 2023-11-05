import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import './CSS/AddJobs.css';
import axios from 'axios';

const AddJobs = ({setView, showMessage, setMessage, setMessageState, id}) => {
  const [status, setStatus] = useState('');
  const [employee_id, setEmployeeID] = useState('');
  const [call_id, setCallID] = useState('');
  const [priority, setPriority] = useState('');
  const [required_skills, setRequiredSkills] = useState('');
  const [hoc_notes, setHocNotes] = useState('');
  const [comments, setComments] = useState('');

  const [Error, setErrorMessage] = useState('');

  const [calls, setCalls] = useState([]);
  const [employees, setEmployees] = useState([]);

  const jobInfo = new FormData();
  jobInfo.append('status', status);
  jobInfo.append('employee_id', employee_id);
  jobInfo.append('call_id', call_id);
  jobInfo.append('priority', priority);
  jobInfo.append('required_skills', required_skills);
  jobInfo.append('hoc_notes', hoc_notes);
  jobInfo.append('comments', comments);

  const handleFormSubmit = async () => {

    if(CheckStatus()){
      if(CheckEmployee()){
        if(CheckCall()){
          if(CheckPriority()){
            if(CheckSkills()){

              if(hoc_notes === '' || hoc_notes === undefined){ setHocNotes("None");}
              if(comments === '' || comments === undefined){ setComments("None");}

              if(await addJob() === 1){
                setMessage('Job Created Successfully');
                setMessageState('success');
                showMessage(true);
              }else{
                setMessage('Error CreatingJob Created');
                setMessageState('danger');
                showMessage(true);
              }

            }
          }
        }
      }
    }
    
  };

  const addJob = async () => {

    const response = await axios.post('http://localhost:8080/api/v1/addJob', jobInfo);

    return response.data;

  }

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

  const CheckStatus = () => {

    console.log(status);
    if(status !== '' && status !== undefined){
      setErrorMessage("");
      return true;
    }else{
      setErrorMessage("select the status of the job");
      return false;
    }

  }

  const CheckEmployee = () => {
    if(employee_id !== '' && employee_id !== undefined){
      setErrorMessage("");
      return true;
    }else{
      setErrorMessage("select the employee for the job");
      return false;
    }
  }

  const CheckCall = () => {
    if(call_id !== '' && call_id !== undefined){
      setErrorMessage("");
      return true;
    }else{
      setErrorMessage("select the call linked to the job");
      return false;
    }
  }

  const CheckPriority = () => {
    if(priority !== '' && priority !== undefined){
      setErrorMessage("");
      return true;
    }else{
      setErrorMessage("select the job priority");
      return false;
    }
  }

  const CheckSkills = () => {
    if(required_skills !== '' && required_skills !== undefined){
      setErrorMessage("");
      return true;
    }else{
      setErrorMessage("select the skills required for the job");
      return false;
    }
  }

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
              <option value="">---Select Status---</option>
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
              value={priority}
              onChange={(e) => setPriority(e.target.value)
              }>
              <option value="">---Select Priority---</option>
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
              <option value="">---Select Skills---</option>
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
              value={comments}
              onChange={(e) => setComments(e.target.value)}
            />
          </div>
          {Error && (
            <div className='error-message'>{Error}</div>
          )}
          <button className="submit" onClick={handleFormSubmit}>Add Job</button>
      </div>
    </div>
  );
};

export default AddJobs;
