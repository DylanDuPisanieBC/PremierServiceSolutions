import React from 'react';
import './CSS/Sidebar.css';
import { useState } from 'react';

const Sidebar = ({ setView, setSidebar }) => {

  const [sidebarState, setSidebarState] = useState(true);

  return (
    <div className={sidebarState ? 'bar-open' : 'bar-closed'}>
      <button className={sidebarState ? 'openBtn-open' : 'openBtn-closed'} onClick={() => { if(sidebarState === false){setSidebar(true);setSidebarState(true);}else{setSidebar(false);setSidebarState(false);}}}>☰ {sidebarState ? 'Close' : ''}</button>
      <div className={sidebarState ? 'sidebar-open' : 'sidebar-closed'}>
        <button className={sidebarState ? 'SidebarButton-open' : 'SidebarButton-closed'} onClick={() => { setView('main'); }}>🔍 Dashboard</button>
        <button className={sidebarState ? 'SidebarButton-open' : 'SidebarButton-closed'} onClick={() => { setView('calls'); }}>🔍 Calls</button>
        <button className={sidebarState ? 'SidebarButton-open' : 'SidebarButton-closed'} onClick={() => { setView('clients'); }}>🔍 Clients</button>
        <button className={sidebarState ? 'SidebarButton-open' : 'SidebarButton-closed'} onClick={() => { setView('contracts'); }}>🔍 Contracts</button>
        <button className={sidebarState ? 'SidebarButton-open' : 'SidebarButton-closed'} onClick={() => { setView('employees'); }}>🔍 Employees</button>
        <button className={sidebarState ? 'SidebarButton-open' : 'SidebarButton-closed'} onClick={() => { setView('jobs'); }}>🔍 Job Cards</button>
      </div>
      <button className={sidebarState ? 'LogOutButton-open' : 'LogOutButton-closed'}>Log out</button>
    </div>
  );
};

export default Sidebar;
