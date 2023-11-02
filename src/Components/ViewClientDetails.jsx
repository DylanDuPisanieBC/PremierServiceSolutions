import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import './CSS/ViewDetails.css'; 

const ViewClientDetails = ({ sidebarOpen }) => {
  const [loading, setLoading] = useState(true);
  const [clients, setClients] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/v1/clients').then((res) => {
      // Fetch client details from server API and store it clients array
      console.log(res);
      setClients(res.data);
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

  var clientDetails = "";
  clientDetails = clients.map( (item) => {
    // Send selected client id to next view
    const handleEditClick = () => {     
      console.log(item.client_id);
      };

    return (
      // Display the stored array values in the table
      <tr key={item.client_id}>
        <td>{item.client_id}</td>
        <td>{item.alias}</td>
        <td>{item.contract_id}</td>
        <td>{item.contact_number}</td>
        <td>{item.client_type}</td>
        <td>{item.address}</td>
        <td>{item.email}</td>
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
      <h2 className="view-header">View Client Details</h2>
      <form className={sidebarOpen ? 'content-open' : 'content-closed'}>
        <div className="details">
          <table className="details-table">
            <thead>
              <tr>
                <th>Client ID</th>
                <th>Alias</th>
                <th>Contract ID</th>
                <th>Contact Number</th>
                <th>Client Type</th>
                <th>Address</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className='Table-Body'>
              {clientDetails}
            </tbody>
          </table>
        </div>
      </form>
    </div>
  );
};

export default ViewClientDetails;
