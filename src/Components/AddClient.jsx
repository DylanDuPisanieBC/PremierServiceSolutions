import React, { useState } from 'react';
import Sidebar from './Sidebar';
import './CSS/AddClient.css';

const AddClient = ({ sidebarOpen }) => {
  const [isIndividual, setIsIndividual] = useState(true);
  const [clientType, setClientType] = useState('individual');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [address, setAddress] = useState('');

  const handleClientTypeChange = (event) => {
    const type = event.target.value;
    setClientType(type);
    setIsIndividual(type === 'individual');
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    // Here, you can handle the form submission and send the data to your server or perform any other necessary action.
  };

  return (
    <div className="add-client-container">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={() => {}} />
      <h2 className="add-client-header">Add Client</h2>
      <form className='form' onSubmit={handleFormSubmit}>
        <div>
            <div className="form-group">
                <label>Client type:</label>
            </div>
          <label id="radio">
            <input
              type="radio"
              value="individual"
              checked={clientType === 'individual'}
              onChange={handleClientTypeChange}
            />
            Individual
          </label>
          <label id="radio">
            <input
              type="radio"
              value="business"
              checked={clientType === 'business'}
              onChange={handleClientTypeChange}
            />
            Business
          </label>
        </div>
        {isIndividual ? (
          <div>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="surname">Surname:</label>
              <input
                type="text"
                id="surname"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
              />
            </div>
          </div>
        ) : (
          <div className="form-group">
            <label htmlFor="businessName">Business Name:</label>
            <input
              type="text"
              id="businessName"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
            />
          </div>
        )}

        <div className="form-group">
          <label htmlFor="contactNumber">Contact Number:</label>
          <input
            type="text"
            id="contactNumber"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <textarea
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <button className="submit" type="submit">Add Client</button>
      </form>
    </div>
  );
};

export default AddClient;
