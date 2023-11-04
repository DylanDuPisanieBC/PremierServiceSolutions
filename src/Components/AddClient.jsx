import React, { useState } from 'react';
import Sidebar from './Sidebar';
import './CSS/AddClient.css';
import { useEffect } from 'react';
import axios from 'axios';

const AddClient = ({setView}) => {
  const [isIndividual, setIsIndividual] = useState(true);
  const [clientType, setClientType] = useState('individual');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [address, setAddress] = useState('');
  const [selectedContract, setSelectedContract] = useState(null);

  const [contracts, setContracts] = useState([]);

  const handleClientTypeChange = (event) => {
    const type = event.target.value;
    setClientType(type);
    setIsIndividual(type === 'individual');
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();


  };

  useEffect(() => {
      axios.get('http://localhost:8080/api/v1/contracts').then((res) => {
        console.log(res);
        setContracts(res.data);
        setSelectedContract(res.data[0]);      
      }).catch((err) => {
        console.log(err);
      });
    }, []);

    var contractDetails = "";
    contractDetails = contracts.map( (item) => {
      return (
        <option key={item.contract_id} value={item.contract_id}>{item.type}</option>
      )
  });


  return (
    <div>
      <span className='icon' onClick={()=> setView('clients')}>➜</span>
      <div className="add-client-container">
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

          <div className="form-group">
            <label htmlFor="contract">Contract:</label>
            <select
              id="contract"
              onChange={(e) => {
                const selectedContractId = parseInt(e.target.value, 10);
                const contractObject = contracts.find((contract) => contract.contract_id === selectedContractId);
                setSelectedContract(contractObject);
                console.log(contractObject);
              }}
              >
                {contractDetails}
            </select>                      
          </div>

          <div className="form-group">

            <div className="side-to-side">
              <label htmlFor="hours">Maintenance Hours:</label>
              <span id="hours">{selectedContract ? selectedContract.hours_allocated : ''} per month</span>
            </div>

            <div className="side-to-side">
              <label htmlFor="chargerate">Charge Rate:</label>
              <span id="chargerate">R{selectedContract ? selectedContract.charge_rate : ''} per hour</span>
            </div>
            
            <div className="side-to-side">
              <label htmlFor="overtimerate">Overtime Charge Rate:</label>
              <span id="overtimerate">{selectedContract ? selectedContract.overtime_rate : ''} per hour overtime</span>
            </div>
             
          </div>

          <button className="submit" type="submit">Add Client</button>
        </form>
      </div>
    </div>
  );
};

export default AddClient;
