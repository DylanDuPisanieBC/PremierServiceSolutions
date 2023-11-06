import React, { useState, useEffect } from 'react';
import './CSS/AddJobs.css';
import axios from 'axios';

const AddJobs = ({setView, showMessage, setMessage, setMessageState, id}) => {
  const [editing, setEditing] = useState(false);
  const [jobID, setJobID] = useState(0);
  const [status, setStatus] = useState('');
  const [employee_id, setEmployeeID] = useState('');
  const [call_id, setCallID] = useState('');
  const [priority, setPriority] = useState('');
  const [required_skills, setRequiredSkills] = useState('');
  const [hoc_notes, setHocNotes] = useState('');
  const [comments, setComments] = useState('');
  const [Error, setErrorMessage] = useState('');
  const [selectedCall, setSelectedCall] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [calls, setCalls] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [job, setJob] = useState();

  const jobInfo = new FormData();
  jobInfo.append('status', status);
  jobInfo.append('employee_id', employee_id);
  jobInfo.append('call_id', call_id);
  jobInfo.append('priority', priority);
  jobInfo.append('required_skills', required_skills);
  jobInfo.append('hoc_notes', hoc_notes);
  jobInfo.append('comments', comments);

  useEffect(() => {
    if (id !== undefined) {
      setJobID(id);
      setEditing(true);
    } else {
      setJobID(undefined);
      setEditing(false);
    }
  }, [id]);

  useEffect(() => {
    if (editing) {
      getJobInfo();      
    }

  }, [editing]);

  useEffect(() => {
    if (job !== undefined) {
      if(calls !== undefined) {
        if(employees !== undefined){
          populateInputs();
        }else{
          console.log("Employees not received yet");
        }
      }else{
        console.log("calls not received yet");
      }           
    }else{
      console.log("job object not received yet");
    }
  }, [job], [calls], [employees]);

  // Define getJobInfo before using it
  const getJobInfo = async () => {
    const response = await axios.get("http://localhost:8080/api/v1/job/" + jobID);
    setJob(response.data);
    console.log(response.data);
  };

  const populateInputs = () => {
    
    setStatus(job.status);
    setPriority(job.priority);
    setRequiredSkills(job.required_skills);
    setHocNotes(job.hoc_notes);
    setComments(job.comments);

    const call = calls.find((call) => call.call_id === job.call_id);
    console.log(call.call_id);
    setSelectedCall(call);

    const employee = employees.find((employee) => employee.employee_id === job.employee_id);
    console.log(employee.employee_id);
    setSelectedEmployee(employee);
  }

  const handleFormSubmit = async () => {

    if(CheckStatus()){
      if(CheckEmployee()){
        if(CheckCall()){
          if(CheckPriority()){
            if(CheckSkills()){
              if(hoc_notes === '' || hoc_notes === undefined){ setHocNotes("None");}
              if(comments === '' || comments === undefined){ setComments("None");}
              if(!editing){
                try{
                  if(await addJob() === 1){
                    setMessage('Job Created Successfully');
                    setMessageState('success');
                    showMessage(true);
                    setView('jobs');
                  }else{
                    setMessage('Error Creating Job Created');
                    setMessageState('danger');
                    showMessage(true);
                  }
                }catch{
                  setMessage('Cannot Contact Server');
                  setMessageState('danger');
                  showMessage(true);
                }
              }else{
                try{
                  if(await editJob() === 1){
                    setMessage('Job Edited Successfully');
                    setMessageState('success');
                    showMessage(true);
                    setView('jobs');
                  }else{
                    setMessage('Error Editing Job');
                    setMessageState('error');
                    showMessage(true);
                  }
                }catch{
                  setMessage('Cannot Contact Server');
                  setMessageState('danger');
                  showMessage(true);
                }
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

  const editJob = async () => {
    const response = await axios.put('http://localhost:8080/api/v1/job/update/' + jobID, jobInfo);
    return response.data;
  }

  const getCalls = async () => {
    axios.get('http://localhost:8080/api/v1/calls').then((res) => {
        console.log(res);
        setCalls(res.data);
        setSelectedCall(res.data[0])  ;
      }).catch((err) => {
        console.log(err);
      });
  }

  const getEmployees = async () => {
    axios.get('http://localhost:8080/api/v1/employees').then((res) => {
        console.log(res);
        setEmployees(res.data);
        setSelectedEmployee(res.data[0])     
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
        {editing && (
          <h2 className="add-client-header">Edit Job</h2>
        )}
        {!editing && (
          <h2 className="add-client-header">Add Job</h2>
        )}
        
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
              value={selectedEmployee ? selectedEmployee.employee_id : ''}
              onChange={(e) => {
                const selectedEmpID = parseInt(e.target.value, 10);
                const empObject = employees.find((emp) => emp.employee_id === selectedEmpID);              
                setSelectedEmployee(empObject);
                setEmployeeID(empObject.employee_id);
                }}
                >
              <option value="">---Select Employee---</option>
              {employeeDetails}
            </select>    
          </div>
          <div className="form-group">
            <label htmlFor="call_id">Call:</label>
            <select 
              id='call_id' 
              value={selectedCall ? selectedCall.call_id : ''}
              onChange={(e) => {
                const selectedCallID = parseInt(e.target.value, 10);
                const callObject = calls.find((call) => call.call_id === selectedCallID);              
                setSelectedCall(callObject);
                setCallID(callObject.call_id);
              }}
              >
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

          {editing && (
            <button className="update-button" onClick={handleFormSubmit}>Edit Job</button>
          )}
          {!editing && (
            <button className="submit" onClick={handleFormSubmit}>Add Job</button>
          )}
      </div>
    </div>
  );
};

export default AddJobs;
