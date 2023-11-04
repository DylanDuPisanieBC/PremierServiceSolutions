import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CSS/ViewDetails.css'; 

const ViewJobs = ({setLoading}) => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {

    setLoading(true);

    setTimeout(() => {
      axios.get('http://localhost:8080/api/v1/jobs').then((res) => {
        // Fetch job details from server API and store it jobs array
        console.log(res);
        setJobs(res.data);
        setLoading(false);

      }).catch((err) => {
        console.log(err);
      });
    }, 500);
    
    }).catch((err) => {
      console.log(err);
      alert(`Error: ${err}`);
    });
  }, [])

  // Delete job
  const deleteJob = (e, id) => {
    // prevent the page from refreshing
    e.preventDefault();

    // Change delete button text to deleting after click
    const thisClicked = e.currentTarget;
    thisClicked.innerText = "Deleting...";

    // API delete request
    axios.delete(`http://localhost:8080/api/v1/job/delete/${id}`)
        .then(() => {
          // Delete record and display message
          alert("Job deleted successfully");
          thisClicked.closest("tr").remove();
        }).catch(function (err) {
          // error catch and message display
          alert(`Error: ${err}`);
        })
  }
  

  var jDetails = "";
  jDetails = jobs.map( (item) => {
    // Send selected job id to next view
    const handleEditClick = () => {     
      console.log(item.job_id);
      };

    return (
      // Display the stored array values in the table
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
          <button type="button" onClick={(e) => deleteJob(e, item.job_id)} className="delete-button">Delete</button>
        </td>
      </tr>
    )
  });


  return (
    <div>
      <h2 className="view-header">View Jobs</h2>
      <form>
        <div className="details">
          <table className="details-table" id="example">
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
