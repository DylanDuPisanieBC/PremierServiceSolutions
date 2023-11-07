import React, { useState } from 'react';
import './CSS/AddClient.css';
import { useEffect } from 'react';
import axios from 'axios';

const AddCall = ({setView, showMessage, setMessage, setMessageState}) => {
  const [call_start, setCallStart] = useState('');
  const [call_end, setCallEnd] = useState('');
  const [selectedClient, setSelectedClient] = useState(null);
  const [client_id, setSelectedclientID] = useState(1);
  const [clients, setClients] = useState([]);
  const [Error, setErrorMessage] = useState('');

  const callInfo = new FormData();
  callInfo.append('client_id', client_id);
  callInfo.append('call_start', call_start);
  callInfo.append('call_end', call_end);


  const handleFormSubmit = async () => {
    if(checkStart === true){
      if(checkEnd === true){
        if(compareTimes === true){
          try{
            const response = await addCall()
            if(response === 1){
              setMessage('Call Added Successfully');
              setMessageState('success');
              showMessage(true);
              setView('calls');
            }else{
              setMessage('Error Adding Call');
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
    
  };

  const addCall = async () => {

    const response = await axios.post('http://localhost:8080/api/v1/call/add', callInfo);

    return response.data;

  }

  const checkStart = () => {
    const start = new Date(call_start);
    if(isNaN(start)){
      setErrorMessage("Please enter a start date and time");
      return false;
    }else{
      setErrorMessage("");
      return true;
    }
  }

  const checkEnd = () => {
    const end = new Date(call_end);
    if(isNaN(end)){
      setErrorMessage("Please enter an end date and time");
      return false;
    }else{
      setErrorMessage("");
      return true;
    }
  }

  const compareTimes = () => {
    const start = new Date(call_start);
    const end = new Date(call_end);
    console.log(start.getTime());
    console.log(end.getTime());
    if(start > end){
      setErrorMessage("End date can't be before start!");
      return false;
    }else{
      setErrorMessage("");
      return true;
    }
  }

  useEffect(() => {
      axios.get('http://localhost:8080/api/v1/clients').then((res) => {
        console.log(res);
        setClients(res.data);
        setSelectedClient(res.data[0]);      
      }).catch((err) => {
        console.log(err);
      });
    }, []);

    var clientDetails = "";
    clientDetails = clients.map( (item) => {
      return (
        <option key={item.client_id} value={item.client_id}>Client ID: {item.client_id} - Client Name: {item.alias}</option>
      )
  });


  return (
    <div>
      <span className='icon' onClick={() => setView('calls')}>➜</span>
      <div className="add-client-container">
        <h2 className="add-client-header">Add Call</h2>
          <div className="form-group">
            <label htmlFor="contract">Client ID:</label>
            <select
              id="client_id"
              value={selectedClient ? selectedClient.client_id : ''}
              onChange={(e) => {
                const selectedClientId = parseInt(e.target.value, 10);
                const clientObject = clients.find((client) => client.client_id === selectedClientId);              
                setSelectedContract(clientObject);
                setSelectedContractID(clientObject.client_id);
              }}
              >
                {clientDetails}
            </select>                      
          </div>
          <div className="form-group">
            <label htmlFor="call_start">Call Start:</label>
            <input
              type="datetime-local"
              id="call_start"
              value={call_start}
              onChange={(e) => setCallStart(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="call_end">Call End:</label>
            <input
              type="datetime-local"
              id="call_end"
              value={call_end}
              onChange={(e) => setCallEnd(e.target.value)}
            />
          </div>

          {Error && (
            <div className='error-message'>{Error}</div>
          )}

          <button className="submit" onClick={handleFormSubmit}>Add Call</button>
          
      </div>
    </div>
  );
};

export default AddCall;
