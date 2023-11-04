import React, { useState, useEffect } from 'react';
import './CSS/Dashboard.css';
import Sidebar from './Sidebar';
import DashboardComponent from './ViewDashboard';
import CallsComponent from './ViewCalls';
import ClientsComponent from './ViewClientDetails';
import ContractsComponent from './ViewContracts';
import EmployeesComponent from './ViewEmployees';
import JobCardsComponent from './ViewJobs';
import LoadingComponent from './ViewLoading';


const Dashboard = () => {

  const [view, setView] = useState('main');
  const [sidebarState, setSidebar] = useState(true);
  const [loading, setLoadingView] = useState(true);

  return (
    <div className='Main'>
      <Sidebar setView={setView} setSidebar={setSidebar}/>
      <div className={sidebarState ? 'view-container-open' : 'view-container-closed'}>    
        {loading === true && <LoadingComponent/>}
        {view === 'calls' && <CallsComponent setLoading={setLoadingView} />}
        {view === 'clients' && <ClientsComponent setLoading={setLoadingView} />}
        {view === 'contracts' && <ContractsComponent setLoading={setLoadingView} />}
        {view === 'employees' && <EmployeesComponent setLoading={setLoadingView} />}
        {view === 'jobs' && <JobCardsComponent setLoading={setLoadingView} />}
        {view === 'main' &&  <DashboardComponent setLoading={setLoadingView} />}
      </div>
    </div>
  );
};

export default Dashboard;
