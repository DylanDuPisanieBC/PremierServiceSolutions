import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import './CSS/ViewDetails.css'; 

const ViewCalls = ({ sidebarOpen }) => {
  const [loading, setLoading] = useState(true);
  const [calls, setCalls] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/v1/calls').then((res) => {
      // Fetch call details from server API and store it call array
      console.log(res);
      setCalls(res.data);
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

  var callDetails = "";
  callDetails = calls.map( (item) => {
    // Send selected call id to next view
    const handleEditClick = () => {     
      console.log(item.call_id);
      };

    return (
      // Display the stored array values in the table
      <tr key={item.call_id}>
        <td>{item.call_id}</td>
        <td>{item.client_id}</td>
        <td>{item.call_start}</td>
        <td>{item.call_end}</td>
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
      <h2 className="view-header">View Call Details</h2>
      <form className={sidebarOpen ? 'content-open' : 'content-closed'}>
        <div className="details">
          <table className="details-table">
            <thead>
              <tr>
                <th>Call ID</th>
                <th>Client ID</th>
                <th>Call Start</th>
                <th>Call End</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className='Table-Body'>
              {callDetails}
            </tbody>
          </table>
        </div>
      </form>
    </div>
  );
};

export default ViewCalls;
