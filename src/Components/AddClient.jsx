import React, { useState } from 'react';
import './CSS/AddClient.css';
import { useEffect } from 'react';
import axios from 'axios';

const AddClient = ({setView, showMessage, setMessage, setMessageState, id}) => {

  const [editing, setEditing] = useState(false);
  const [clientID, setClientID] = useState(0);
  const [isIndividual, setIsIndividual] = useState(true);
  const [clientType, setClientType] = useState('individual');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [selectedContract, setSelectedContract] = useState(null);
  const [contractID, setSelectedContractID] = useState(1);
  const [contracts, setContracts] = useState([]);
  const [Error, setErrorMessage] = useState('');
  const [client, setClient] = useState();

  const clientInfo = new FormData();
  clientInfo.append('clientType', isIndividual);
  clientInfo.append('name', name);
  clientInfo.append('surname', surname);
  clientInfo.append('businessName', businessName);
  clientInfo.append('contactNumber', contactNumber);
  clientInfo.append('address', address);
  clientInfo.append('email', email);
  clientInfo.append('contract_id', contractID);

  useEffect(() => {
    if (id !== undefined) {
      setClientID(id);
      setEditing(true);
    } else {
      setClientID(undefined);
      setEditing(false);
    }
  }, [id]);

  useEffect(() => {
    if (editing) {
      getClientInfo();      
    }

  }, [editing]);

  useEffect(() => {
    if (client !== undefined) {
      if(contracts !== undefined) {
        populateInputs();
      }else{
        console.log("contracts not received yet");
      }           
    }else{
      console.log("client object not received yet");
    }
  }, [client], [contracts]);

  // Define getClientInfo before using it
  const getClientInfo = async () => {
    const response = await axios.get("http://localhost:8080/api/v1/client/" + clientID);
    setClient(response.data);
    console.log(response.data);
  };

  const populateInputs = () => {

    if(client.client_type === "Individual"){
      handleClientTypeChangeManual('individual');
      const nameArray = client.alias.split(' ');
      const length = nameArray.length;
      const tempName = nameArray[0];
      const tempSurname = nameArray[length-1];
      setName(tempName);
      setSurname(tempSurname);
    }else{
      handleClientTypeChangeManual('business');
      setBusinessName(client.alias);
    }
   setAddress(client.address);
   setContactNumber(client.contact_number);
   setEmail(client.email);

    const contract = contracts.find((contract) => contract.contract_id === client.contract_id);
    console.log(contract.contract_id);
    setSelectedContract(contract);
  }

  const handleClientTypeChange = (event) => {
    const type = event.target.value;
    setClientType(type);
    setIsIndividual(type === 'individual');
  };

  const handleClientTypeChangeManual = (type) => {
    setClientType(type);
    setIsIndividual(type === 'individual');
  };

  const handleFormSubmit = async () => {
    clientInfo.append('contract_id', contract.contract_id);
    if(CheckAlias() === true){
      if(CheckContactNumber() === true){
        if(CheckAddress() === true){ 
          if(!editing){
            if(await CheckEmail() === true){              
              try{
                const response = await addClient()
                if(response === 1){
                  setMessage('Client Added Successfully');
                  setMessageState('success');
                  showMessage(true);
                  setView('clients');
                }else{
                  setMessage('Error Adding Client');
                  setMessageState('error');
                  showMessage(true);
                }
                
              }catch{
                setMessage('Cannot Contact Server');
                setMessageState('danger');
                showMessage(true);
              }
            }
          }else{
            try{
              const response = await editClient()
              if(response === 1){
                setMessage('Client Edited Successfully');
                setMessageState('success');
                showMessage(true);
                setView('clients');
              }else{
                setMessage('Error Editing Client');
                setMessageState('error');
                showMessage(true);
              }
              
            }catch{
              setMessage('Cannot Contact Server');
              setMessageState('danger');
              showMessage(true);
            }
          }
          
        }
      }
    }
  };

  const addClient = async () => {

    const response = await axios.post('http://localhost:8080/api/v1/client/add', clientInfo);

    return response.data;

  }

  const editClient = async () => {

    const response = await axios.put('http://localhost:8080/api/v1/client/update/' + clientID, clientInfo);

    return response.data;

  }

  const CheckAlias = () => {

    if(clientType === 'individual') {
      if(name !== '' && surname !== '') {
        setErrorMessage("");
        return true;
      }else if(name !== '' && surname === '') {
        setErrorMessage("enter a surname");
        return false;
      }else{
        setErrorMessage("enter a name");
      }
    }else{
      if(businessName !== ''){
        setErrorMessage("");
        return true;
      }
      setErrorMessage("enter businness name");
    }

  };

  const CheckContactNumber = () => {
    var regex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

    if(contactNumber !== '' && contactNumber.length === 10){
      if(regex.test(contactNumber)){
        setErrorMessage("");
        return true;
      }else{
        setErrorMessage("enter a valid phone number");
      }
    }else{
      setErrorMessage("enter a contact number of length 10");
    }
  };

  const CheckEmail = async () => {

    if(email !== ''){
      try {
        const response = await axios.post('http://localhost:8080/api/v1/client/check_email', clientInfo);
    
        if (response.data === true) {
          return true;
        } else if (response.data === false) {
          setErrorMessage('Email already in use.');
          return false;
        }
    
        setErrorMessage('Error connecting to server.');
        return false;
      } catch (error) {
        console.error('Error:', error);
        setErrorMessage('Error connecting to server.');
        return false;
      }
  }else{
    setErrorMessage('Enter a email address');
    return false;
  }

  };

  const CheckAddress = () => {
    if(address !== ''){
      setErrorMessage("");
      return true;
    }else{
      setErrorMessage("Enter a address");
      return false;
    }
  }


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
      <span className='icon' onClick={() => setView('clients')}>➜</span>
      <div className="add-client-container">
        {editing && (
          <h2 className="add-client-header">Edit Client</h2>
        )}
        {!editing && (
          <h2 className="add-client-header">Add Client</h2>
        )}
        
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
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

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
              value={selectedContract ? selectedContract.contract_id : ''}
              onChange={(e) => {
                const selectedContractId = parseInt(e.target.value, 10);
                const contractObject = contracts.find((contract) => contract.contract_id === selectedContractId);              
                setSelectedContract(contractObject);
                setSelectedContractID(contractObject.contract_id);
              }}
              >
                {contractDetails}
            </select>                      
          </div>

          <div className="form-group">

            <div className="side-to-side">
              <label htmlFor="hours">Maintenance Hours:</label>
              <span id="hours">{selectedContract ? selectedContract.hours_allocated : ''} hours per month</span>
            </div>

            <div className="side-to-side">
              <label htmlFor="chargerate">Charge Rate:</label>
              <span id="chargerate">R{selectedContract ? selectedContract.charge_rate : ''} per hour</span>
            </div>
            
            <div className="side-to-side">
              <label htmlFor="overtimerate">Overtime Charge Rate:</label>
              <span id="overtimerate">R{selectedContract ? selectedContract.overtime_rate : ''} per hour overtime</span>
            </div>
             
          </div>

          {Error && (
            <div className='error-message'>{Error}</div>
          )}

          {editing && (
            <button className="update-button" onClick={handleFormSubmit}>Edit Client</button>
          )}
          {!editing && (
            <button className="submit" onClick={handleFormSubmit}>Add Client</button>
          )}
          
      </div>
    </div>
  );
};

export default AddClient;
