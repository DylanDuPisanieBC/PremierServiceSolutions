package com.group3.serverside.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.group3.serverside.Entity.ClientEntity;


@Repository
public interface ClientRepo extends JpaRepository<ClientEntity, Integer>{
    ClientEntity findByEmail(String email);
}
