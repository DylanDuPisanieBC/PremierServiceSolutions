package com.group3.serverside.Services.impl;


import com.group3.serverside.Entity.ClientEntity;
import com.group3.serverside.Entity.EmployeeEntity;
import com.group3.serverside.Entity.JobEntity;
import com.group3.serverside.Repository.ClientRepo;
import com.group3.serverside.Repository.EmployeeRepo;
import com.group3.serverside.Repository.JobRepo;
import com.group3.serverside.Services.EmailSenderService;
import com.group3.serverside.Services.JobsService;
import com.group3.serverside.Services.TwilioService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class JobsServiceimpl implements JobsService {

    private final JobRepo jobRepo;
    private final TwilioService twilioService;
    private final ClientRepo clientRepo;
    private final EmployeeRepo employeeRepo;
    private final EmailSenderService emailSenderService;

    @Override
    public JobEntity saveJob(JobEntity job){
      //  int callId = job.getCall_id();
       // Optional<ClientEntity> client = clientRepo.findById(callId);

        EmployeeEntity employee = job.getEmployee();
        if (employee != null) {
            EmployeeEntity savedEmployee = employeeRepo.findById(employee.getEmployee_id()).orElse(null);

            if (savedEmployee == null) {
                throw new RuntimeException("Employee not found for ID: " + employee.getEmployee_id());
            }

            job.setEmployee(savedEmployee);
        } else {
            throw new RuntimeException("Employee is required for job assignment.");
        }

        jobRepo.save(job);
        sendJobEmail(job);
        return job;
    }
    @Override
    public void sendJobNotification(JobEntity job) {

    }

    @Override
    public void sendJobEmail(JobEntity job){
        EmployeeEntity employee= job.getEmployee();

        if(employee !=null){
            String employeeEmail = employee.getEmail();
            String Subject = "You have been assigned a job: " + employee.getFull_name();
            String Text = "You have been assigned the job: " + job.getHoc_notes()+ ",with priority level " + job.getPriority();
            emailSenderService.sendEmail(employeeEmail,Subject,Text);
        }
    }
}
