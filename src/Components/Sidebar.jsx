import React, { useState } from 'react';
import './CSS/Sidebar.css';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div id="bar">
      <div id="sidebar" className={isOpen ? 'open' : 'closed'}>
        <button id="openBtn" onClick={toggleSidebar}>
            ☰ {isOpen ? 'Close' : 'Open'} Menu
        </button>

        <div className="panel">
            <a href="/add_client">➕ Create new client</a>
        </div>

        <div className="panel">
            <a href="/view_client_details">🔍 View client details</a>

        </div>

        <div className="panel">
            <a href="/add_job">➕ Create job card</a>
        </div>

        <div className="panel">
            <a href="/View_Jobs">🔍 View job cards</a>
        </div>

        <div className="panel">
            <a href="/View_Employees">🔍 View employees</a>
        </div>

        <button id="sidebarBtn">Log out</button>
      </div>
    </div>
  );
};

export default Sidebar;