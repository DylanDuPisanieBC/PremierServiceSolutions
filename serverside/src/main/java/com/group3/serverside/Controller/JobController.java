package com.group3.serverside.Controller;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.group3.serverside.Entity.JobEntity;
import com.group3.serverside.Repository.JobRepo;

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
        JobEntity job = jobRepo.findById(id).orElse(null);
        return ResponseEntity.ok(job);
    }

    // Add job
    @PostMapping("/addJob")
    public JobEntity createJob(@RequestBody JobEntity job) {
        return jobRepo.save(job);
    }

    // Update job
    @PutMapping("/job/update/{id}")
    public ResponseEntity<JobEntity> updateJob(@PathVariable Integer id, @RequestBody JobEntity jobDetails) {
        JobEntity job = jobRepo.findById(id).orElse(null);

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
        JobEntity job = jobRepo.findById(id).orElse(null);

        jobRepo.delete(job);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}
