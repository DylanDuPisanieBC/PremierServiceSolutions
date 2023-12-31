import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CSS/ViewDetails.css'; 

const ViewCalls = ({setLoading, setView}) => {
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

  // Delete call
  const deleteCall = (e, id) => {
    // prevent the page from refreshing
    e.preventDefault();

    // Change delete button text to deleting after click
    const thisClicked = e.currentTarget;
    thisClicked.innerText = "Deleting...";

    // API delete request
    axios.delete(`http://localhost:8080/api/v1/call/delete/${id}`)
        .then(() => {
          // Delete record and display message
          alert("Call deleted successfully");
          thisClicked.closest("tr").remove();
        }).catch(function (err) {
          // error catch and message display
          alert(`Error: ${err}`);
        })
  } 

  var callDetails = "";
  callDetails = calls.map( (item) => {
    return (
      // Display the stored array values in the table
      <tr key={item.call_id}>
        <td>{item.call_id}</td>
        <td>{item.client_id}</td>
        <td>{item.call_start}</td>
        <td>{item.call_end}</td>
        <td>
          <button type="button" onClick={(e) => deleteCall(e, item.call_id)} className="delete-button">Delete</button>
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
      <button className='add-button' onClick={() => setView('AddCall')} >Add Call</button>
    </div>
  );
};

export default ViewCalls;
