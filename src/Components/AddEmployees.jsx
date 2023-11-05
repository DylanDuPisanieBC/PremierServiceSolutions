import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import './CSS/AddJobs.css';
import axios from 'axios';

const AddEmployees = ({ setView, showMessage, setMessage, setMessageState }) => {
  const [full_name, setFullName] = useState('');
  const [branch, setBranch] = useState('');
  const [phone_number, setPhoneNumber] = useState('');
  const [skills, setSkills] = useState('');
  const [type, setType] = useState('');
  const [email, setEmail] = useState('');
  const [Error, setErrorMessage] = useState('');

  const empInfo = new FormData();
  empInfo.append('full_name', full_name);
  empInfo.append('branch', branch);
  empInfo.append('phone_number', phone_number);
  empInfo.append('skills', skills);
  empInfo.append('type', type);
  empInfo.append('email', email);

  const addEmployee = async () => {
    const response = await axios.post('http://localhost:8080/api/v1/employee/add', empInfo);
    return response.data;
  }

  const handleFormSubmit = async () => {
    if(CheckFullName() === true){
      if(CheckBranch() === true){
        if(CheckPhoneNumber() === true){ 
          if(CheckSkills() === true){
            if(await CheckEmail() === true){
              try{
                const response = await addEmployee()
                if(response === 1){
                  setMessage('Employee Added Successfully');
                  setMessageState('success');
                  showMessage(true);
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
          }
        }
      }
    }
  };

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
    var intCheck = parseInt(phone_number);
    if(phone_number !== '' && phone_number.length === 10){
      if(!isNaN(intCheck) && phone_number === '' + intCheck){
        setErrorMessage("");
        return true;
      }else{
        setErrorMessage("enter a valid phone number");
      }
      
    }else{
      setErrorMessage("enter a phone number of length 10");
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

          <button className="submit" onClick={handleFormSubmit}>Add Employee</button>
      </div>
    </div>
  );
};

export default AddEmployees;
