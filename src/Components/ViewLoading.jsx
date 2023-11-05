import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CSS/LoadingView.css'; 

const ViewCalls = () => {

  return (
    <div>
      <div className="ring">
        Loading
        <span className='span'></span>
      </div>
    </div>
    
  );
};

export default ViewCalls;
