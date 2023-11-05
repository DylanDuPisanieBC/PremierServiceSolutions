package com.group3.serverside.Controller;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.group3.serverside.Entity.JobEntity;
import com.group3.serverside.Exception.ResourceNotFoundException;
import com.group3.serverside.Repository.JobRepo;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/v1/")
public class JobController {
    
    @Autowired
    private JobRepo jobRepo;

    // get all jobs
    @GetMapping("/jobs")
    public List<JobEntity> getAllJobs(){
        return jobRepo.findAll();
    }

    // Get by id
    @GetMapping("/job/{id}")
    public ResponseEntity<JobEntity> getJobById(@PathVariable Integer id){
        JobEntity job = jobRepo.findById(id)
                    .orElseThrow(() -> new ResourceNotFoundException("Job does not exist with id: " + id));
                    
        return ResponseEntity.ok(job);
    }

    // Add job
    @PostMapping("/addJob")
    public int createJob(@RequestParam String status, @RequestParam int employee_id, @RequestParam int call_id, @RequestParam String priority, @RequestParam String hoc_notes, @RequestParam String comments, @RequestParam String required_skills) {
        
        try{
            JobEntity job = new JobEntity();
            job.setStatus(status);
            job.setEmployee_id(employee_id);
            job.setCall_id(call_id);
            job.setPriority(priority);
            job.setRequired_skills(required_skills);
            job.setHoc_notes(hoc_notes);
            job.setComments(comments);
            jobRepo.save(job);   
            return 1; 
        }catch(Exception e){
            System.out.println(e.getMessage());
        }

        return 0;
    }

    // Update job
    @PutMapping("/job/update/{id}")
    public ResponseEntity<JobEntity> updateJob(@PathVariable Integer id, @RequestBody JobEntity jobDetails) {
        JobEntity job = jobRepo.findById(id)
                    .orElseThrow(() -> new ResourceNotFoundException("Job does not exist with id: " + id));

        job.setStatus(jobDetails.getStatus());
        job.setHoc_notes(jobDetails.getHoc_notes());
        job.setEmployee_id(jobDetails.getEmployee_id());
        job.setCall_id(jobDetails.getCall_id());
        job.setRequired_skills(jobDetails.getRequired_skills());
        job.setComments(jobDetails.getComments());       
        job.setPriority(jobDetails.getPriority());

        JobEntity updatedJob = jobRepo.save(job);
        return ResponseEntity.ok(updatedJob);
    }

    // Delete job
    @DeleteMapping("/job/delete/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteJob(@PathVariable Integer id) {
        JobEntity job = jobRepo.findById(id)
                    .orElseThrow(() -> new ResourceNotFoundException("Job does not exist with id: " + id));

        jobRepo.delete(job);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}
