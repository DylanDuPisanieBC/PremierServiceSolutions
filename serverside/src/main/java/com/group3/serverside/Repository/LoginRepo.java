package com.group3.serverside.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.group3.serverside.Entity.LoginEntity;

@Repository
public interface LoginRepo extends JpaRepository<LoginEntity, Integer>{
    
}
