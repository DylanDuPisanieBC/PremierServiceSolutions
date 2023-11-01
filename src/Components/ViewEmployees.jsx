import React, { useState } from 'react';
import Sidebar from './Sidebar';
import './CSS/ViewEmployees.css'; // Assuming you have a CSS file for styling

const ViewEmployees = ({ sidebarOpen }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [employeeDetails, setEmployeeDetails] = useState(null);

  // Dummy data 
  const dummyData = [
    {
      id: 1,
      fullName: 'John Doe',
      phoneNumber: '123-456-7890',
      branch: 'Main Branch',
      skills: 'React, JavaScript',
      type: 'Full-time',
    }
  ];

  const handleSearch = () => {
    // Search ...  :)
    setEmployeeDetails(dummyData[0]);
  };

  const handleUpdate = () => {
    // Update Emplyee details ...  :)
    console.log('Updating employee details:', employeeDetails);
  };

  const handleAddEmployee = () => {
    // Add Employee ...  :)
    console.log('Adding new employee');
  };

  return (
    <div className="view-employees-container">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={() => {}} />
      <h2 className="view-employees-header">View Employee Details</h2>
      <form className={sidebarOpen ? 'content-open' : 'content-closed'}>
        <div className="search-bar">
          <label htmlFor="searchQuery" className="label-input-group">
            Search Employee:
          </label>
          <input
            type="text"
            id="searchQuery"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-field"
          />
          <button type="button" onClick={handleSearch} className="search-button">
            Search
          </button>
        </div>

        <div className="employee-details">
          <table className="employee-details-table">
            <thead>
              <tr>
                <th>Employee Details</th>
                <th></th>
              </tr>
            </thead>
            <tbody className='Table-Body'>
              <tr>
                <td className="property">Full Name:</td>
                <td className="property-value">{employeeDetails?.fullName}</td>
              </tr>
              <tr>
                <td className="property">Phone Number:</td>
                <td className="property-value">{employeeDetails?.phoneNumber}</td>
              </tr>
              <tr>
                <td className="property">Branch:</td>
                <td className="property-value">{employeeDetails?.branch}</td>
              </tr>
              <tr>
                <td className="property">Skills:</td>
                <td className="property-value">{employeeDetails?.skills}</td>
              </tr>
              <tr>
                <td className="property">Type:</td>
                <td className="property-value">{employeeDetails?.type}</td>
              </tr>
            </tbody>
          </table>

          <div className="button-group">
            <button type="button" onClick={handleUpdate} className="update-button">
              Update Details
            </button>
            <button type="button" onClick={handleAddEmployee} className="add-employee-button">
              Add Employee
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ViewEmployees;
