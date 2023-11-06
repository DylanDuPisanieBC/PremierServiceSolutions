import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import './CSS/AddJobs.css';
import axios from 'axios';

const AddEmployees = ({ setView, showMessage, setMessage, setMessageState, id }) => {
  const [editing, setEditing] = useState(false);
  const [employeeID, setEmployeeID] = useState(0);
  const [full_name, setFullName] = useState('');
  const [branch, setBranch] = useState('');
  const [phone_number, setPhoneNumber] = useState('');
  const [skills, setSkills] = useState('');
  const [type, setType] = useState('');
  const [email, setEmail] = useState('');
  const [Error, setErrorMessage] = useState('');
  const [employee, setEmployee] = useState();

  const empInfo = new FormData();
  empInfo.append('full_name', full_name);
  empInfo.append('branch', branch);
  empInfo.append('phone_number', phone_number);
  empInfo.append('skills', skills);
  empInfo.append('type', type);
  empInfo.append('email', email);

  useEffect(() => {
    if (id !== undefined) {
      setEmployeeID(id);
      setEditing(true);
    } else {
      setEmployeeID(undefined);
      setEditing(false);
    }
  }, [id]);

  useEffect(() => {
    if (editing) {
      getEmployeeInfo();      
    }

  }, [editing]);

  // Define getEmployeeInfo before using it
  const getEmployeeInfo = async () => {
    const response = await axios.get("http://localhost:8080/api/v1/employee/" + employeeID);
    setEmployee(response.data);
    console.log(response.data);
  };

  useEffect(() => {
    if (employee !== undefined) {
      populateInputs();      
    }else{
      console.log("Employee object not received yet");
    }
  }, [employee]);

  

  const populateInputs = () => {
    setFullName(employee.full_name);
    setBranch(employee.branch);
    setPhoneNumber(employee.phone_number);
    setSkills(employee.skills);
    setType(employee.type);
    setEmail(employee.email);
  }

  const handleFormSubmit = async () => {
    if(CheckFullName() === true){
      if(CheckBranch() === true){
        if(CheckPhoneNumber() === true){ 
          if(CheckSkills() === true){
            if(!editing){
              if(await CheckEmail() === true){
                try{
                  const response = await addEmployee()
                  if(response === 1){
                    setMessage('Employee Added Successfully');
                    setMessageState('success');
                    showMessage(true);
                    setView('employees');
                  }else{
                    setMessage('Error Adding Employee');
                    setMessageState('error');
                    showMessage(true);
                  }
                }catch{
                  setMessage('Cannot Contact Server');
                  setMessageState('danger');
                  showMessage(true);
                }
              }
            }else{
              try{
                const response = await editEmployee()
                if(response === 1){
                  setMessage('Employee Edited Successfully');
                  setMessageState('success');
                  showMessage(true);
                  setView('employees');
                }else{
                  setMessage('Error Editing Employee');
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
  };

  const addEmployee = async () => {
    const response = await axios.post('http://localhost:8080/api/v1/employee/add', empInfo);
    return response.data;
  }

  const editEmployee = async () => {
    const response = await axios.put('http://localhost:8080/api/v1/employee/update/' + employeeID, empInfo);
    return response.data;
  }

  const CheckFullName = () => {
    if(full_name !== ''){
      setErrorMessage("");
      return true;
    }else{
      setErrorMessage("Enter a name");
      return false;
    }
  }

  const CheckBranch = () => {
    if(branch !== ''){
      setErrorMessage("");
      return true;
    }else{
      setErrorMessage("Enter a branch");
      return false;
    }
  }

  const CheckPhoneNumber = () => {
    var regex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

    if(phone_number !== '' && phone_number.length === 10){
      if(regex.test(phone_number)){
        setErrorMessage("");
        return true;
      }else{
        setErrorMessage("enter a valid phone number");
      }
    }else{
      setErrorMessage("enter a contact number of length 10");
    }
    
    
  };

  const CheckSkills = () => {
    if(skills !== ''){
      setErrorMessage("");
      return true;
    }else{
      setErrorMessage("Enter a skill");
      return false;
    }
  }

  const CheckEmail = async () => {
    if(email !== ''){
      try {
        const response = await axios.post('http://localhost:8080/api/v1/employee/check_email', empInfo);
    
        if (response.data === true) {
          return true;
        } else if (response.data === false) {
          setErrorMessage('Email already in use.');
          return false;
        }
    
        setErrorMessage('Error connecting to server.');
        return false;
      } catch (error) {
        console.error('Error:', error);
        setErrorMessage('Error connecting to server.');
        return false;
      }
  }else{
    setErrorMessage('Enter a email address');
    return false;
  }
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

          {Error && (
            <div className='error-message'>{Error}</div>
          )}

          {editing && (
            <button className="update-button" onClick={handleFormSubmit}>Edit Employee</button>
          )}
          {!editing && (
            <button className="submit" onClick={handleFormSubmit}>Add Employee</button>
          )}
      </div>
    </div>
  );
};

export default AddEmployees;
