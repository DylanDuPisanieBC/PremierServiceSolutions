import React, { useState } from 'react';
import './Sidebar.css';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div id="sidebar">
      

      <div id="sidebar" className={isOpen ? 'open' : 'closed'}>
        <button id="openBtn" onClick={toggleSidebar}>
            ☰ {isOpen ? 'Close' : 'Open'} Menu
        </button>

        <div className="panel">
            <a href="#">+ Create new client</a>
        </div>

        <div className="panel">
            <a href="#">🔍 View client details</a>
        </div>

        <div className="panel">
            <a href="#">+ Create job card</a>
        </div>

        <div className="panel">
            <a href="#">🔍 View job cards</a>
        </div>

        <div className="panel">
            <a href="#">🔍 View employees</a>
        </div>

        <button id="sidebarBtn">Log out</button>
      </div>
    </div>
  );
};

export default Sidebar;