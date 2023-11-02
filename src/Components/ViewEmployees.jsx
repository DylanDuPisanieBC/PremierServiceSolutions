import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import './CSS/ViewEmployees.css';

const ViewEmployees = ({ sidebarOpen }) => {
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/v1/employees').then((res) => {

      console.log(res);
      setEmployees(res.data);
      setLoading(false);

    }).catch((err) => {
      console.log(err);
    });
  }, [])
  
  if(loading){
    return(
      <div>
        Loading...
      </div>
    )
  }

  

  var employeeDetails = "";
  employeeDetails = employees.map( (item) => {
    const handleEditClick = () => {     
      console.log(item.employee_id);
      };
    return (
      <tr key={item.employee_id}>
        <td>{item.employee_id}</td>
        <td>{item.full_name}</td>
        <td>{item.branch}</td>
        <td>{item.phone_number}</td>
        <td>{item.skills}</td>
        <td>{item.type}</td>
        <td>{item.email}</td>
        <td>
          <button type="button" onClick={handleEditClick} className="update-button">Edit</button>
          <button type="button" className="delete-button">Delete</button>
        </td>
      </tr>
    )
  });


  return (
    <div className="view-employees-container">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={() => {}} />
      <h2 className="view-employees-header">View Employee Details</h2>
      <form className={sidebarOpen ? 'content-open' : 'content-closed'}>

        <div className="employee-details">
          <table className="employee-details-table">
            <thead>
              <tr>
                <th>Employee ID</th>
                <th>Full_name</th>
                <th>Branch</th>
                <th>Phone Number</th>
                <th>Skills</th>
                <th>Type</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className='Table-Body'>
              {employeeDetails}
            </tbody>
          </table>
        </div>
      </form>
    </div>
  );
};

export default ViewEmployees;
