import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CSS/ViewDetails.css'; 

const ViewCalls = ({setLoading}) => {
  const [calls, setCalls] = useState([]);

  useEffect(() => {

    setLoading(true);

    setTimeout(() => {
      axios.get('http://localhost:8080/api/v1/calls').then((res) => {
        // Fetch call details from server API and store it call array
        console.log(res);
        setCalls(res.data);
        setLoading(false);

      }).catch((err) => {
        console.log(err);
      });
    }, 500);
  }, [])

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
    <div>
      <h2 className="view-header">View Call Details</h2>
      <form>
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
