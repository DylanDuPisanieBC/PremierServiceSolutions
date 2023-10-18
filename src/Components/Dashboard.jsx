import React, { useState } from 'react';
import './Dashboard.css';
import Sidebar from './Sidebar';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div>
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      <div id="content" className={sidebarOpen ? 'content-open' : 'content-closed'}>
        <h2>Dashboard Content</h2>
        <p>This is where your dashboard content goes.</p>
      </div>
    </div>
  );
};

export default Dashboard;
