package com.group3.serverside.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.group3.serverside.Entity.JobEntity;

@Repository
public interface JobRepo extends JpaRepository<JobEntity, Integer>{
    
}
