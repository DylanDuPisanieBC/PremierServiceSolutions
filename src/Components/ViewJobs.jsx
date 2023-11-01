import React, { useState } from 'react';
import Sidebar from './Sidebar';
import './CSS/ViewJobs.css'; 

const ViewJobs = ({ sidebarOpen }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [jobDetails, setJobDetails] = useState(null);

  
  const dummyData = [
    {
      id: 1,
      employeeId: 'E001',
      requiredSkills: 'React, Node.js',
      comments: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      hocNotes: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      priority: 'High',
      status: 'In Progress',
      jobId: 'J001',
    }
  ];

  const handleSearch = () => {
    // Search ...  :)
    setJobDetails(dummyData[0]);
  };

  const handleUpdate = () => {
    // Update Job details ...  :)
    console.log('Updating job details:', jobDetails);
  };

  const handleDelete = () => {
    // Delete job details ...  :)
    console.log('Deleting job:', jobDetails);
  };

  return (
    <div className="view-jobs-container">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={() => {}} />
      <h2 className="view-jobs-header">View Jobs</h2>
      <form className={sidebarOpen ? 'content-open' : 'content-closed'}>
        <div className="search-bar">
          <label htmlFor="searchQuery" className="label-input-group">
            Search Job:
          </label>
          <input
            type="text"
            id="searchQuery"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-field"
          />
          <button type="button" onClick={handleSearch} className="search-button">
            Search
          </button>
        </div>

        <div className="job-details">
          <table className="job-details-table">
            <thead>
              <tr>
                <th>Job Details</th>
                <th></th>
              </tr>
            </thead>
            <tbody className='Table-Body'>
              <tr>
                <td className="property">Employee ID:</td>
                <td className="property-value">{jobDetails?.employeeId}</td>
              </tr>
              <tr>
                <td className="property">Required Skills:</td>
                <td className="property-value">{jobDetails?.requiredSkills}</td>
              </tr>
              <tr>
                <td className="property">Comments:</td>
                <td className="property-value">{jobDetails?.comments}</td>
              </tr>
              <tr>
                <td className="property">Hoc Notes:</td>
                <td className="property-value">{jobDetails?.hocNotes}</td>
              </tr>
              <tr>
                <td className="property">Priority:</td>
                <td className="property-value">{jobDetails?.priority}</td>
              </tr>
              <tr>
                <td className="property">Status:</td>
                <td className="property-value">{jobDetails?.status}</td>
              </tr>
              <tr>
                <td className="property">Job ID:</td>
                <td className="property-value">{jobDetails?.jobId}</td>
              </tr>
            </tbody>
          </table>

          <div className="action-buttons">
            <button type="button" onClick={handleUpdate} className="update-button">
              Update Job
            </button>
            <button type="button" onClick={handleDelete} className="delete-button">
              Delete Job
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ViewJobs;
