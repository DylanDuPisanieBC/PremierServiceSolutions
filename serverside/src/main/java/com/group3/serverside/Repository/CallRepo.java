package com.group3.serverside.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.group3.serverside.Entity.CallEntity;

@Repository
public interface CallRepo extends JpaRepository<CallEntity, Integer>{
    
}
