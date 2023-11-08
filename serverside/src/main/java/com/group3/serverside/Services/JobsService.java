package com.group3.serverside.Services;

import com.group3.serverside.Entity.JobEntity;

public interface JobsService {
    JobEntity saveJob(JobEntity job);
    void sendJobNotification(JobEntity job);

    void sendJobEmail(JobEntity job);
}
