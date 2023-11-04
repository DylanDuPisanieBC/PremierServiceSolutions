import React, { useState } from 'react';
import './CSS/Sidebar.css';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div id="bar">
      <div id="sidebar" className={isOpen ? 'open' : 'closed'}>
        <button id="openBtn">
            ☰ Main Menu
        </button>

        <div className="panel">
            <a href="/View_Calls">🔍 Calls</a>
        </div>

        <div className="panel">
            <a href="/view_client_details">🔍 Clients</a>
        </div>

        <div className="panel">
            <a href="/View_Contracts">🔍 Contracts</a>
        </div>

        <div className="panel">
            <a href="/View_Employees">🔍 Employees</a>
        </div>

        <div className="panel">
            <a href="/View_Jobs">🔍 Job Cards</a>
        </div>

        <button id="sidebarBtn">Log out</button>
      </div>
    </div>
  );
};

export default Sidebar;