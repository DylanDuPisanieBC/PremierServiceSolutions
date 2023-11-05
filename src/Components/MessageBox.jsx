import React, { useState, useEffect } from 'react';
import './CSS/MessageBox.css';

const MessageBox = ({ setMessageBoxState, messageBoxMessage, messageBoxState }) => {
  const [message, setMessage] = useState('');
  const [state, setState] = useState('');

  useEffect(() => {
    setState(messageBoxState);
    setMessage(messageBoxMessage);
  }, [messageBoxMessage, messageBoxState]);

  return (
    <div className='box'>
      {state === 'success' && (
        <div className="circle-green">
          <div className="checkmark"></div>
        </div>
      )}

      {state === 'error' && (
        <div className="circle-red">
          <div className="cross"></div>
        </div>
      )}

      {state === 'danger' && (
        <div className="circle-orange">
          <div className="exclamation">!</div>
        </div>
      )}

      <span>{message}</span>
      <button className='add-button' onClick={() => setMessageBoxState(false)}>close</button>
    </div>
  );
};

export default MessageBox;
