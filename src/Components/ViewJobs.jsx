import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import './CSS/ViewJobs.css'; 

const ViewJobs = ({ sidebarOpen }) => {
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/v1/jobs').then((res) => {

      console.log(res);
      setJobs(res.data);
      setLoading(false);

    }).catch((err) => {
      console.log(err);
    });
  }, [])
  
  if(loading){
    return(
      <div>
        Loading...
      </div>
    )
  }

  

  var jDetails = "";
  jDetails = jobs.map( (item) => {
    const handleEditClick = () => {     
      console.log(item.job_id);
      };
    return (
      <tr key={item.job_id}>
        <td>{item.job_id}</td>
        <td>{item.status}</td>
        <td>{item.hoc_notes}</td>
        <td>{item.employee_id}</td>
        <td>{item.call_id}</td>
        <td>{item.required_skills}</td>
        <td>{item.comments}</td>
        <td>{item.priority}</td>
        <td>
          <button type="button" onClick={handleEditClick} className="update-button">Edit</button>
          <button type="button" className="delete-button">Delete</button>
        </td>
      </tr>
    )
  });


  return (
    <div className="view-jobs-container">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={() => {}} />
      <h2 className="view-jobs-header">View Jobs</h2>
      <form className={sidebarOpen ? 'content-open' : 'content-closed'}>
        <div className="job-details">
          <table className="job-details-table" id="example">
            <thead>
              <tr>
                <th>Job ID</th>
                <th>Status</th>
                <th>Hoc Notes</th>
                <th>Employee ID</th>
                <th>Call ID</th>
                <th>Required Skills</th>
                <th>Comments</th>
                <th>Priority</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className='Table-Body'>
              {jDetails}
            </tbody>
          </table>
        </div>
      </form>
    </div>
  );
};

export default ViewJobs;
