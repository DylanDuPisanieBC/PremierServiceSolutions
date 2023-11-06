import React, { useState, useEffect } from 'react';
import './CSS/Dashboard.css';
import Sidebar from './Sidebar';
import DashboardComponent from './ViewDashboard';
import CallsComponent from './ViewCalls';
import ClientsComponent from './ViewClientDetails';
import AddClient from './AddClient';
import ContractsComponent from './ViewContracts';
import EmployeesComponent from './ViewEmployees';
import JobCardsComponent from './ViewJobs';
import AddJob from './AddJobs'
import LoadingComponent from './ViewLoading';
import MessageBoxComponent from './MessageBox'
import AddJobs from './AddJobs';
import AddEmployees from './AddEmployees';


const Dashboard = () => {

  const [view, setView] = useState('main');
  const [sidebarState, setSidebar] = useState(true);
  const [loading, setLoadingView] = useState(false);
  const [messageBox, setMessageBox] = useState(false);
  const [messageBoxMessage, setMessageBoxMessage] = useState('Enter the message box message you want to display');
  const [messageBoxState, setMessageBoxState] = useState('Success');

  const[pathID, setPathID] = useState(null);

  return (
    <div className='Main'>
      <Sidebar setView={setView} setSidebar={setSidebar}/>
      <div className={sidebarState ? 'view-container-open' : 'view-container-closed'}>    
        {loading === true && <LoadingComponent/>}
        {messageBox === true && <MessageBoxComponent setMessageBoxState={setMessageBox} messageBoxMessage={messageBoxMessage} messageBoxState={messageBoxState}/>}
        
        {view === 'calls' && <CallsComponent setLoading={setLoadingView}/>}
       
        {view === 'clients' && <ClientsComponent setLoading={setLoadingView} setView={setView} setID={setPathID}/>}
        {view === 'AddClient' && <AddClient setLoading={setLoadingView} setView={setView} showMessage={setMessageBox} setMessage={setMessageBoxMessage} setMessageState={setMessageBoxState} id={pathID}/>}

        {view === 'contracts' && <ContractsComponent setLoading={setLoadingView}/>}

        {view === 'employees' && <EmployeesComponent setLoading={setLoadingView} setView={setView} setID={setPathID}/>}
        {view === 'AddEmployee' && <AddEmployees setLoading={setLoadingView} setView={setView} showMessage={setMessageBox} setMessage={setMessageBoxMessage} setMessageState={setMessageBoxState} id={pathID}/>}

        {view === 'jobs' && <JobCardsComponent setLoading={setLoadingView} setView={setView} setID={setPathID}/>}
        {view === 'AddJobs' && <AddJobs setLoading={setLoadingView} setView={setView} showMessage={setMessageBox} setMessage={setMessageBoxMessage} setMessageState={setMessageBoxState} id={pathID}/>}

        {view === 'main' &&  <DashboardComponent setLoading={setLoadingView}/>}
      </div>
    </div>
  );
};

export default Dashboard;
