import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import './CSS/ViewDetails.css'; 

const ViewContracts = ({ sidebarOpen }) => {
  const [loading, setLoading] = useState(true);
  const [contracts, setContracts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/v1/contracts').then((res) => {
      // Fetch contracts details from server API and store it contracts array
      console.log(res);
      setContracts(res.data);
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

  var contractDetails = "";
  contractDetails = contracts.map( (item) => {
    // Send selected contracts id to next view
    const handleEditClick = () => {     
      console.log(item.contract_id);
      };

    return (
      // Display the stored array values in the table
      <tr key={item.contract_id}>
        <td>{item.contract_id}</td>
        <td>{item.type}</td>
        <td>{item.hours_allocated}</td>
        <td>{item.charge_rate}</td>
        <td>{item.overtime_rate}</td>
        <td>
          <button type="button" onClick={handleEditClick} className="update-button">Edit</button>
          <button type="button" className="delete-button">Delete</button>
        </td>
      </tr>
    )
  });

  return (
    <div className="view-container">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={() => {}} />
      <h2 className="view-header">View Contract Details</h2>
      <form className={sidebarOpen ? 'content-open' : 'content-closed'}>
        <div className="details">
          <table className="details-table">
            <thead>
              <tr>
                <th>Call ID</th>
                <th>Type</th>
                <th>Hours Allocated</th>
                <th>Charge Rate</th>
                <th>Overtime Rate</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className='Table-Body'>
              {contractDetails}
            </tbody>
          </table>
        </div>
      </form>
    </div>
  );
};

export default ViewContracts;
