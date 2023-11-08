package com.group3.serverside.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.group3.serverside.Entity.JobEntity;

import java.util.List;

@Repository
public interface JobRepo extends JpaRepository<JobEntity, Integer>{
    List<JobEntity> findAll();
}
