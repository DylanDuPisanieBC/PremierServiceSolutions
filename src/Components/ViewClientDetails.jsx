import React, { useState } from 'react';
import Sidebar from './Sidebar';
import './CSS/ViewClientDetails.css'; 

const ViewClientDetails = ({ sidebarOpen }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [clientDetails, setClientDetails] = useState(null);

  // Dummy data
  const dummyData = [
    {
      id: 1,
      name: 'John',
      surname: 'Doe',
      businessName: 'Doe Corp',
      contactNumber: '123-456-7890',
      address: '123 Main St, City',
    }
  ];

  const handleSearch = () => {
    // Search ...  :)
    setClientDetails(dummyData[0]);
    
  };

  const handleUpdate = () => {
    // Update Client details ...  :)
    console.log('Updating client details:', clientDetails);
  };

  return (
    <div className="view-client-details-container">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={() => {}} />
      <h2 className="view-client-details-header">View Client Details</h2>
      <form className={sidebarOpen ? 'content-open' : 'content-closed'}>
        <div className="search-bar">
          <label htmlFor="searchQuery" className="label-input-group">
            Search Client:
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

        <div className="client-details">
          <table className="client-details-table">
            <thead>
              <tr>
                <th>Client Details</th>
                <th></th>
              </tr>
            </thead>
            <tbody className='Table-Body'>
              <tr>
                <td className="property">Name:</td>
                <td className="property-value">{clientDetails?.name}</td>
              </tr>
              <tr>
                <td className="property">Surname:</td>
                <td className="property-value">{clientDetails?.surname}</td>
              </tr>
              <tr>
                <td className="property">Business Name:</td>
                <td className="property-value">{clientDetails?.businessName}</td>
              </tr>
              <tr>
                <td className="property">Contact Number:</td>
                <td className="property-value">{clientDetails?.contactNumber}</td>
              </tr>
              <tr>
                <td className="property">Address:</td>
                <td className="property-value">{clientDetails?.address}</td>
              </tr>
            </tbody>
          </table>

          <button type="button" onClick={handleUpdate} className="update-button">
            Update Details
          </button>
        </div>
      </form>
    </div>
  );
};

export default ViewClientDetails;
