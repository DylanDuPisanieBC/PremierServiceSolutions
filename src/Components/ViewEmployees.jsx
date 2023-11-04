import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CSS/ViewDetails.css';

const ViewEmployees = ({setLoading}) => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {

    setLoading(true);

    setTimeout(() => {
      axios.get('http://localhost:8080/api/v1/employees').then((res) => {
        // Fetch employee details from server API and store it employees array
        console.log(res);
        setEmployees(res.data);
        setLoading(false);

      }).catch((err) => {
        console.log(err);
      });
    }, 500);
  }, [])
  

  var employeeDetails = "";
  employeeDetails = employees.map( (item) => {
    // Send selected employee id to next view
    const handleEditClick = () => {     
      console.log(item.employee_id);
      };

    return (
      // Display the stored array values in the table
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
    <div>
      <h2 className="view-header">View Employee Details</h2>
      <form>
        <div className="details">
          <table className="details-table">
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
