package com.group3.serverside.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.group3.serverside.Entity.EmployeeEntity;

@Repository
public interface EmployeeRepo extends JpaRepository<EmployeeEntity, Integer>{
    EmployeeEntity findByUsernameAndPassword(String username, String password);
    EmployeeEntity findByEmail(String email);
    EmployeeEntity findByUsername(String username);
}
